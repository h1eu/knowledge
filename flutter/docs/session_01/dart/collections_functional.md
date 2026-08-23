---
title: Collections và Functional APIs trong Dart
slug: collections-and-functional-apis
summary: Ba collection cốt lõi List/Set/Map - mutability spectrum từ mutable đến const, spread và collection-if/for, chuỗi functional operations (map/filter/fold), lazy evaluation của Iterable, generators sync*, và package:collection.
tags: [dart, flutter, collections, functional-programming, iterable]
domain: Flutter
module: Language
topic: Collections and Functional APIs
status: published
difficulty: beginner
estimated_reading_time: 30 phút
prerequisites:
  - flutter.language.dart.functions_operators
related:
  - flutter.language.dart.control_flow_patterns
  - flutter.language.async.streams
learning_outcomes:
  - Chọn đúng List/Set/Map và kiểm soát mutability theo ý muốn.
  - Dùng spread và collection-if/for để dựng collection động - kỹ thuật lõi của widget tree.
  - Xử lý dữ liệu bằng chuỗi functional operations hiểu rõ lazy evaluation.
  - Biết khi nào cần package:collection và generators sync*.
---

# Collections và Functional APIs trong Dart

## Vấn đề cần giải quyết

Ứng dụng Flutter về bản chất là **biến đổi dữ liệu thành giao diện**: một `List<Product>` trở thành danh sách card, một `Map<String, Theme>` quyết định màu sắc. Ba câu hỏi phải trả lời trước khi code: dùng loại collection nào, ai được sửa nó, và biến đổi dữ liệu xảy ra **lúc nào** (ngay lập tức hay trì hoãn). Hiểu sai câu cuối là nguồn bug kinh điển của người mới.

---

## 1. Ba collection cốt lõi

```dart
final numbers = <int>[3, 1, 2];            // List - có thứ tự, trùng lặp OK
final tags = <String>{'dart', 'flutter'};   // Set - không trùng lặp
final ages = <String, int>{'alice': 30};    // Map - key -> value

// Truy cập
numbers[0];             // 3
ages['alice'];          // 30 - nhưng kiểu trả về int? (key có thể không tồn tại!)
ages['bob'] ?? 0;       // fallback an toàn
tags.contains('dart');  // O(1)
```

> `map[key]` luôn trả nullable dù value non-nullable - vì key có thể vắng mặt. Đây là chỗ hay bị `!` lạm dụng nhất.

---

## 2. Mutability Spectrum - ai được sửa?

| Cách tạo | Sửa nội dung được? | Gán lại biến được? | Phạm vi |
|---|---|---|---|
| `var list = [...]` | ✅ | ✅ | hoàn toàn động |
| `final list = [...]` | ✅ (add/remove OK!) | ❌ | khóa reference thôi |
| `List.unmodifiable(src)` | ❌ (runtime) | ❌ | immutable bản sao |
| `const list = [...]` | ❌ | ❌ | compile-time, canonicalized |

```dart
final mutable = [1, 2];
mutable.add(3);                    // ✅ vẫn chạy - bẫy số 1 của Kotlin Dev

const frozen = [1, 2];
// frozen.add(3);                  // ❌ compile error

final snapshot = List.unmodifiable(fetchedData); // chặn mutation lúc runtime
```

> Trong widget: truyền `const` list vào constructor giúp Flutter bỏ qua rebuild chi nhánh đó.

---

## 3. Spread và Collection Elements

Kỹ thuật đặc trưng của Dart (Java/Kotlin không có) - xây collection có điều kiện ngay trong literal:

```dart
final menu = [
  'Home',
  if (isLoggedIn) 'Profile',           // collection-if
  if (hasNotifications) ...?badges,    // null-aware spread
  for (final category in categories)   // collection-for
    category.label,
  ...extraItems,                       // spread list khác
];
```

Đây chính là cách bạn dựng **động danh sách widget**:

```dart
Column(
  children: [
    const Header(),
    if (isLoading) const CircularProgressIndicator(),
    for (final product in products) ProductCard(product),
  ],
)
```

---

## 4. Functional Operations

Chuỗi biến đổi dữ liệu theo phong cách declarative:

```dart
final orders = [Order(120, true), Order(45, false), Order(300, true)];

final totalPaid = orders
    .where((o) => o.paid)          // filter
    .map((o) => o.amount)          // transform
    .fold(0, (sum, amount) => sum + amount);

orders.any((o) => o.amount > 200);       // có ít nhất một?
orders.every((o) => o.paid);             // tất cả?
orders.expand((o) => o.items).length;    // flatMap
orders.reduce((a, b) => a.amount > b.amount ? a : b); // không cần init
```

### Tra cứu

```dart
users.firstWhere((u) => u.id == id, orElse: () => null); // trả null nếu không thấy
users.indexWhere((u) => u.email == email);                // -1 nếu không thấy
users.take(10);        // 10 phần tử đầu
users.skip(10);        // bỏ 10 phần tử đầu
```

### Lazy Evaluation - biến đổi diễn ra khi nào?

`map`/`where` **không chạy ngay** - chúng trả về `Iterable` lazy, chỉ tính khi được duyệt:

```dart
final doubled = [1, 2, 3].map((x) {
  print('transform $x'); // CHƯA in gì cả!
  return x * 2;
});

print(doubled.first); // giờ mới in "transform 1"
doubled.length;       // duyệt lần nữa -> transform chạy LẦM NỮA
final cached = doubled.toList(); // "chốt" kết quả, duyệt thêm không tính lại
```

Hệ quả thực chiến:

- Chain dài trên tập lớn -> lazy tiết kiệm bộ nhớ (không tạo list trung gian).
- Dùng kết quả nhiều lần -> gọi `.toList()` một lần.
- Truyền `Iterable` lazy qua lại các hàm -> hành vi khó đoán; API public nên nhận/trả `List`.

---

## 5. Sort - cẩn thận mutate tại chỗ

```dart
final scores = [3, 1, 2];
scores.sort();                 // ❗ MUTATE scores tại chỗ, trả về void
scores.sort((a, b) => b.compareTo(a)); // giảm dần

// Muốn bản sao đã sort, giữ nguyên gốc:
final sortedDesc = [...scores]..sort((a, b) => b.compareTo(a));
```

Không có `sortedBy { it.field }` trong stdlib - dùng package `collection`:

```dart
import 'package:collection/collection.dart';

users.sortedBy((u) => u.age);         // trả list mới
users.groupListsBy((u) => u.city);    // Map<String, List<User>>
maxBy(users, (u) => u.score);
```

> `package:collection` là dependency gần như mặc định của mọi project Flutter nghiêm túc - bổ sung những tiện ích stdlib Kotlin có mà Dart còn thiếu.

---

## 6. Generators - tạo collection on-demand

`sync*` sinh phần tử lười biếng, hữu ích cho chuỗi vô hạn hoặc sinh tuần tự:

```dart
Iterable<int> naturals() sync* {
  var i = 0;
  while (true) yield i++; // vô hạn - nhưng chỉ tính khi được hỏi
}

naturals().take(5); // [0, 1, 2, 3, 4] - không treo máy
```

Bản chất tương tự `sequence {}` của Kotlin. Phiên bản bất đồng bộ `async*` chính là nền tảng của Stream - xem [Streams](../async/streams.md).

---

## Sai lầm thường gặp

1. **Mutate collection đang được duyệt:** `list.removeWhere` trong vòng `for-in` trên chính nó -> `ConcurrentModificationError`. Dùng `removeWhere`/`retainWhere` hoặc duyệt bản sao.
2. **Quên `.toList()` sau `map`** rồi tái sử dụng Iterable nhiều lần - tính lại hoặc lỗi "already listened" ở ngữ cảnh khác.
3. **`sort()` tưởng trả list mới** - nó void và mutate; gốc dữ liệu bị đổi ngầm.
4. **Dùng `List` cho dữ liệu unique** rồi tự kiểm tra trùng - đó là việc của `Set`.
5. **So sánh Map bằng `==`** - không so nội dung sâu; dùng `MapEquality` của package:collection.
6. **Truyền collection mutable xuống widget con** - widget khác sửa ngầm gây UI lệch state; mặc định truyền bất biến (`const`, unmodifiable, record).

---

## Liên kết trong hệ thống

- Toán tử spread `...` và closure: [Functions and Operators](functions_operators.md)
- Stream - phiên bản bất đồng bộ của Iterable: [Futures and Async/Await](../async/futures_async_await.md)
- Dựng widget tree bằng collection elements: Session 03 - Widgets & UI
