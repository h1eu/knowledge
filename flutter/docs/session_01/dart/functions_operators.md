---
title: Functions and Operators trong Dart
slug: functions-and-operators
summary: Hàm trong Dart - tham số positional, named với required, optional positional; hàm là first-class citizen (function types, closures, tear-offs); và hệ thống toán tử bao gồm null-aware operators và cascade.
tags: [dart, flutter, functions, closures, operators]
domain: Flutter
module: Language
topic: Functions and Operators
status: published
difficulty: beginner
estimated_reading_time: 25 phút
prerequisites:
  - flutter.language.dart.variables_types
related:
  - flutter.language.dart.control_flow_patterns
  - flutter.language.dart.classes_mixins_sealed
learning_outcomes:
  - Khai báo hàm với đủ ba dạng tham số và hiểu quy tắc gọi tương ứng.
  - Truyền hàm như tham số bằng function types và tear-offs.
  - Hiểu closure capture và tránh bẫy biến trong vòng lặp.
  - Dùng thành thạo null-aware operators và cascade operator.
---

# Functions and Operators trong Dart

## Vấn đề cần giải quyết

Flutter gần như **không có cú pháp markup riêng** - toàn bộ UI là các lời gọi hàm lồng nhau. Hiểu đúng hệ thống tham số và function types của Dart là điều kiện để đọc viết widget tree, truyền callbacks (`onPressed:`) và viết API sạch. Thêm nữa, Dart sở hữu vài toán tử mà nếu không nắm (`..`, `??=`, `?.`) bạn sẽ không hiểu nổi code Flutter điển hình.

---

## 1. Khai báo hàm

Kiểu trả về đứng trước tên hàm (giống Kotlin, khác JS):

```dart
// Full form
String greet(String name) {
  return 'Xin chào $name';
}

// Expression body với arrow => (giống Kotlin)
String greet(String name) => 'Xin chào $name';

// Return type có thể bỏ qua ở một số ngữ cảnh (closure), 
// nhưng LUÔN khai báo ở hàm top-level/method
```

---

## 2. Hệ thống tham số - phần quan trọng nhất

Dart có **ba dạng tham số**, quy tắc gọi mỗi dạng khác nhau:

| Dạng | Khai báo | Khi gọi |
|---|---|---|
| Positional bắt buộc | `(int a, String b)` | truyền đủ, theo thứ tự, **không kèm tên** |
| Optional positional | `([int a = 0])` | có thể bỏ, vẫn không kèm tên |
| Named | `({int a, required String b})` | **bắt buộc kèm tên**, có thể bỏ nếu không `required` |

```dart
void createUser(
  String tenantId,                 // positional bắt buộc
  {                                // nhóm named
    required String username,      // bắt buộc phải truyền
    int age = 18,                  // có default - được phép bỏ
    String? bio,                   // nullable - được phép bỏ
  }
) {}

createUser('acme', username: 'hazu', age: 25);
createUser('acme', username: 'hazu'); // bio bị bỏ qua - không lỗi!
```

> **Quy tắc vàng:** named parameter nào *bắt buộc* phải có mặt khi gọi thì đánh dấu `required`. Thiếu `required`, caller có thể bỏ qua mà compiler không cảnh báo - bug im lặng kinh điển (đã phân tích trong [Dart for Kotlin Developers](dart_for_kotlin_devs.md)).

---

## 3. Hàm là First-Class Citizen

Hàm là object - gán được vào biến, truyền qua tham số, trả về từ hàm khác. Đây là nền móng của mọi callback trong Flutter (`onPressed`, `builder`...).

### Function Types

```dart
// Kiểu hàm viết dạng: ReturnType Function(Params)
void runTask(void Function() task) {}
int apply(int Function(int, int) op, int a, int b) => op(a, b);

final add = (int a, int b) => a + b;   // anonymous function (lambda)
apply(add, 2, 3);                       // 5
apply((a, b) => a * b, 2, 3);          // inline lambda
```

Đặt tên kiểu bằng `typedef` để tái sử dụng:

```dart
typedef IntPredicate = bool Function(int value);

bool anyMatch(List<int> list, IntPredicate test) =>
    list.any(test);
```

### Closures - lexical scope

Closure "nhớ" các biến tại nơi nó được định nghĩa, không phải nơi nó được gọi:

```dart
Function makeCounter() {
  var count = 0;               // sống sót sau khi makeCounter return
  return () => ++count;
}

final next = makeCounter();
next(); // 1
next(); // 2
```

### Tear-off - lấy chính hàm làm giá trị

```dart
final names = ['carol', 'alice', 'bob'];

names.map((s) => s.toUpperCase()); // viết tay lambda
names.map(String.toUpperCase);     // tear-off: trỏ thẳng method

// Rất phổ biến với widget constructors:
children: data.map(Text.new).toList(),
```

---

## 4. Toán tử cốt lõi

### Số học - chú ý `~/`

```dart
print(7 / 2);   // 3.5  - chia thực, trả double
print(7 ~/ 2);  // 3    - chia nguyên
print(7 % 2);   // 1
```

### Equality: `==` vs `identical()`

```dart
final a = const [1, 2];
final b = const [1, 2];

identical(a, b); // true  - cùng 1 instance (canonicalization của const)
a == b;          // true  - List override == theo nội dung

class User { final String name; User(this.name); }
User('x') == User('x'); // FALSE - class thường so identity!
                         // Phải override == hoặc dùng record/Freezed
```

### Type check & cast: `is`, `is!`, `as`

```dart
if (value is String) print(value.length); // promotion sau is
final text = value as String;             // cast - throw nếu sai
```

### Null-aware operators

| Toán tử | Ý nghĩa | Ví dụ |
|---|---|---|
| `?.` | safe call - null thì trả null | `user?.name?.length` |
| `??` | fallback khi null | `name ?? 'Guest'` |
| `??=` | gán nếu đang null | `cache ??= fetchData()` |
| `?..` | cascade nhưng bỏ qua nếu receiver null | `user?..save()..log()` |
| `...?` | spread chấp nhận null | `[...?maybeList]` |

### Cascade `..` - nối chuỗi thao tác trên cùng object

```dart
final buffer = StringBuffer()
  ..write('Hello')
  ..write(' World')
  ..toString();
// Mỗi bước trả về chính buffer - khác pipeline thông thường
```

### Conditional expression

```dart
final label = isLoggedIn ? 'Profile' : 'Login'; // ternary quen thuộc
```

---

## Sai lầm thường gặp

1. **Gọi named parameter không kèm tên** - `createUser('a', 'hazu')` lỗi compile; `{}` params luôn cần tên.
2. **Nhờ `==` so giá trị trên class thường** - mặc định so identity; override hoặc dùng Freezed/record.
3. **Nhầm `/` với `~/`** - quên `~/` nhận về `double` gây lỗi type ở chỗ mong `int`.
4. **Lạm dụng `!`** thay vì xử lý nullable đúng cách - crash chờ sẵn.
5. **Quên `.toList()` sau `map`** - nhận về lazy `Iterable`, hành vi bất ngờ khi tái sử dụng (chi tiết ở [Collections](collections_functional.md)).
6. **Capture biến vòng lặp trong closure** - dùng biến chạy `for (var i...)` trong callback bất đồng bộ, giá trị đã đổi lúc callback chạy.

---

## Liên kết trong hệ thống

- Nền tảng kiểu dữ liệu: [Variables and Types](variables_and_types.md)
- Điều khiển luồng & pattern matching: [Control Flow and Patterns](control_flow_patterns.md)
- Class và cách override toán tử: [Classes, Mixins and Sealed Types](classes_mixins_sealed.md)
