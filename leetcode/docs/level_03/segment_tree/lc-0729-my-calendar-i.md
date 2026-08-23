---
title: "729. My Calendar I"
slug: "lc-0729-my-calendar-i"
summary: "Segment Tree • Level 3 • Medium — My Calendar I (LeetCode 729)"
tags: ["leetcode", "segment-tree", "medium", "level-3"]
topic_tags: ["array", "binary-search", "design", "segment-tree", "ordered-set"]
difficulty: "Medium"
pattern: "Segment Tree"
level: 3
leetcode_id: 729
url: "https://leetcode.com/problems/my-calendar-i/"
---

# 729. My Calendar I

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Segment Tree</span> <span class="lc-pill lc-pill-level">Level 3</span> <a href="https://leetcode.com/problems/my-calendar-i/" target="_blank">LeetCode 729 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Hiện thực lớp <code>MyCalendar</code> với <code>book(start, end)</code> đặt lịch cho khoảng nửa mở <code>[start, end)</code>, trả về <code>true</code> nếu không trùng lịch đã đặt, ngược lại <code>false</code>.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào</strong>
[&quot;MyCalendar&quot;, &quot;book&quot;, &quot;book&quot;, &quot;book&quot;]
[[], [10, 20], [15, 25], [20, 30]]
<strong>Đầu ra</strong>
[null, true, false, true]

<strong>Giải thích</strong>
MyCalendar myCalendar = new MyCalendar();
myCalendar.book(10, 20); // return True
myCalendar.book(15, 25); // return False, It can not be booked because time 15 is already booked by another event.
myCalendar.book(20, 30); // return True, The event can be booked, as the first event takes every time less than 20, but not including 20.</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>0 &lt;= start &lt; end &lt;= 10<sup>9</sup></code></li>
	<li>At most <code>1000</code> calls will be made to <code>book</code>.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Segment Tree**.

## 💻 Code 5 ngôn ngữ

```cpp
// My Calendar I - C++
class Solution {}
```

```java
// My Calendar I - Java
class Solution {}
```

```kotlin
// My Calendar I - Kotlin
fun solve(): Int { return 0 }
```

```swift
// My Calendar I - Swift
func solve() -> Int { return 0 }
```

```dart
// My Calendar I - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
