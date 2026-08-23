---
title: "731. My Calendar II"
slug: "lc-0731-my-calendar-ii"
summary: "Segment Tree • Level 3 • Medium — My Calendar II (LeetCode 731)"
tags: ["leetcode", "segment-tree", "medium", "level-3"]
topic_tags: ["array", "binary-search", "design", "segment-tree", "prefix-sum", "ordered-set"]
difficulty: "Medium"
pattern: "Segment Tree"
level: 3
leetcode_id: 731
url: "https://leetcode.com/problems/my-calendar-ii/"
---

# 731. My Calendar II

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Segment Tree</span> <span class="lc-pill lc-pill-level">Level 3</span> <a href="https://leetcode.com/problems/my-calendar-ii/" target="_blank">LeetCode 731 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Hiện thực <code>MyCalendarTwo</code> cho phép đặt lịch với tối đa <strong>đặt đôi (double booking)</strong> nhưng không cho phép đặt ba lần (triple booking). <code>book(start,end)</code> trả về <code>true</code> nếu đặt được.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào</strong>
[&quot;MyCalendarTwo&quot;, &quot;book&quot;, &quot;book&quot;, &quot;book&quot;, &quot;book&quot;, &quot;book&quot;, &quot;book&quot;]
[[], [10, 20], [50, 60], [10, 40], [5, 15], [5, 10], [25, 55]]
<strong>Đầu ra</strong>
[null, true, true, true, false, true, true]

<strong>Giải thích</strong>
MyCalendarTwo myCalendarTwo = new MyCalendarTwo();
myCalendarTwo.book(10, 20); // return True, The event can be booked. 
myCalendarTwo.book(50, 60); // return True, The event can be booked. 
myCalendarTwo.book(10, 40); // return True, The event can be double booked. 
myCalendarTwo.book(5, 15);  // return False, The event cannot be booked, because it would result in a triple booking.
myCalendarTwo.book(5, 10); // return True, The event can be booked, as it does not use time 10 which is already double booked.
myCalendarTwo.book(25, 55); // return True, The event can be booked, as the time in [25, 40) will be double booked with the third event, the time [40, 50) will be single booked, and the time [50, 55) will be double booked with the second event.
</pre>

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
// My Calendar II - C++
class Solution {}
```

```java
// My Calendar II - Java
class Solution {}
```

```kotlin
// My Calendar II - Kotlin
fun solve(): Int { return 0 }
```

```swift
// My Calendar II - Swift
func solve() -> Int { return 0 }
```

```dart
// My Calendar II - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
