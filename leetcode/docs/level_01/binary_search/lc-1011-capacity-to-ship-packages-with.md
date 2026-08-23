---
title: "1011. Capacity To Ship Packages Within D Days"
slug: "lc-1011-capacity-to-ship-packages-with"
summary: "Binary Search • Level 1 • Medium — Capacity To Ship Packages Within D Days (LeetCode 1011)"
tags: ["leetcode", "binary-search", "medium", "level-1"]
topic_tags: ["array", "binary-search"]
difficulty: "Medium"
pattern: "Binary Search"
level: 1
leetcode_id: 1011
url: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/"
---

# 1011. Capacity To Ship Packages Within D Days

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Binary Search</span> <span class="lc-pill lc-pill-level">Level 1</span> <a href="https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/" target="_blank">LeetCode 1011 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Băng chuyền có các kiện hàng cần được vận chuyển từ cảng này sang cảng khác trong <code>days</code> ngày.</p>

<p>Kiện hàng thứ <code>i</code> trên băng chuyền có trọng lượng <code>weights[i]</code>. Mỗi ngày, chúng ta chất hàng lên tàu theo đúng thứ tự <code>weights</code>, không được vượt quá tải trọng tối đa của tàu.</p>

<p>Hãy trả về tải trọng nhỏ nhất của tàu để có thể vận chuyển hết hàng trong <code>days</code> ngày.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> weights = [1,2,3,4,5,6,7,8,9,10], days = 5
<strong>Đầu ra:</strong> 15
<strong>Giải thích:</strong> A ship capacity of 15 is the minimum to ship all the packages in 5 days like this:
1st day: 1, 2, 3, 4, 5
2nd day: 6, 7
3rd day: 8
4th day: 9
5th day: 10

Note that the cargo must be shipped in the order given, so using a ship of capacity 14 and splitting the packages into parts like (2, 3, 4, 5), (1, 6, 7), (8), (9), (10) is not allowed.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> weights = [3,2,2,4,1,4], days = 3
<strong>Đầu ra:</strong> 6
<strong>Giải thích:</strong> A ship capacity of 6 is the minimum to ship all the packages in 3 days like this:
1st day: 3, 2
2nd day: 2, 4
3rd day: 1, 4
</pre>

<p><strong class="example">Ví dụ 3:</strong></p>

<pre>
<strong>Đầu vào:</strong> weights = [1,2,3,1,1], days = 4
<strong>Đầu ra:</strong> 3
<strong>Giải thích:</strong>
1st day: 1
2nd day: 2
3rd day: 3
4th day: 1, 1
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= days &lt;= weights.length &lt;= 5 * 10<sup>4</sup></code></li>
	<li><code>1 &lt;= weights[i] &lt;= 500</code></li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Binary Search**.

## 💻 Code 5 ngôn ngữ

```cpp
// Capacity To Ship Packages - C++
class Solution {}
```

```java
// Capacity To Ship Packages - Java
class Solution {}
```

```kotlin
// Capacity To Ship Packages - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Capacity To Ship Packages - Swift
func solve() -> Int { return 0 }
```

```dart
// Capacity To Ship Packages - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
