---
title: "380. Insert Delete GetRandom O(1)"
slug: "lc-0380-insert-delete-getrandom-o1"
summary: "Array & Hashing • Level 1 • Medium — Insert Delete GetRandom O(1) (LeetCode 380)"
tags: ["leetcode", "array-hashing", "medium", "level-1"]
topic_tags: ["array", "hash-table", "math", "design", "randomized"]
difficulty: "Medium"
pattern: "Array & Hashing"
level: 1
leetcode_id: 380
url: "https://leetcode.com/problems/insert-delete-getrandom-o1/"
---

# 380. Insert Delete GetRandom O(1)

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Array & Hashing</span> <span class="lc-pill lc-pill-level">Level 1</span> <a href="https://leetcode.com/problems/insert-delete-getrandom-o1/" target="_blank">LeetCode 380 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Thiết kế cấu trúc dữ liệu hỗ trợ các thao tác trung bình <code>O(1)</code>:</p>
<ul>
	<li><code>bool insert(int val)</code> chèn <code>val</code> nếu chưa tồn tại.</li>
	<li><code>bool remove(int val)</code> xóa <code>val</code> nếu tồn tại.</li>
	<li><code>int getRandom()</code> trả về một phần tử ngẫu nhiên với xác suất đều.</li>
</ul>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào</strong>
[&quot;RandomizedSet&quot;, &quot;insert&quot;, &quot;remove&quot;, &quot;insert&quot;, &quot;getRandom&quot;, &quot;remove&quot;, &quot;insert&quot;, &quot;getRandom&quot;]
[[], [1], [2], [2], [], [1], [2], []]
<strong>Đầu ra</strong>
[null, true, false, true, 2, true, false, 2]

<strong>Giải thích</strong>
RandomizedSet randomizedSet = new RandomizedSet();
randomizedSet.insert(1); // Inserts 1 to the set. Returns true as 1 was inserted successfully.
randomizedSet.remove(2); // Returns false as 2 does not exist in the set.
randomizedSet.insert(2); // Inserts 2 to the set, returns true. Set now contains [1,2].
randomizedSet.getRandom(); // getRandom() should return either 1 or 2 randomly.
randomizedSet.remove(1); // Removes 1 from the set, returns true. Set now contains [2].
randomizedSet.insert(2); // 2 was already in the set, so return false.
randomizedSet.getRandom(); // Since 2 is the only number in the set, getRandom() will always return 2.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>-2<sup>31</sup> &lt;= val &lt;= 2<sup>31</sup> - 1</code></li>
	<li>At most <code>2 *&nbsp;</code><code>10<sup>5</sup></code> calls will be made to <code>insert</code>, <code>remove</code>, and <code>getRandom</code>.</li>
	<li>There will be <strong>at least one</strong> element in the data structure when <code>getRandom</code> is called.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Array & Hashing**.

## 💻 Code 5 ngôn ngữ

```cpp
// Insert Delete GetRandom O(1) - C++
class Solution {}
```

```java
// Insert Delete GetRandom O(1) - Java
class Solution {}
```

```kotlin
// Insert Delete GetRandom O(1) - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Insert Delete GetRandom O(1) - Swift
func solve() -> Int { return 0 }
```

```dart
// Insert Delete GetRandom O(1) - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
