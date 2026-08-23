---
title: "480. Sliding Window Median"
slug: "lc-0480-sliding-window-median"
summary: "Heap • Level 3 • Hard — Sliding Window Median (LeetCode 480)"
tags: ["leetcode", "heap", "hard", "level-3"]
topic_tags: ["array", "hash-table", "sliding-window", "heap-priority-queue", "treap"]
difficulty: "Hard"
pattern: "Heap"
level: 3
leetcode_id: 480
url: "https://leetcode.com/problems/sliding-window-median/"
---

# 480. Sliding Window Median

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-hard">Hard</span> <span class="lc-pill lc-pill-pattern">Heap</span> <span class="lc-pill lc-pill-level">Level 3</span> <a href="https://leetcode.com/problems/sliding-window-median/" target="_blank">LeetCode 480 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho mảng <code>nums</code> và cửa sổ kích thước <code>k</code> trượt từ trái sang phải, hãy trả về trung vị của mỗi cửa sổ. Trung vị là giá trị giữa sau khi sắp xếp, nếu chẵn thì trung bình hai giá trị giữa.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> nums = [1,3,-1,-3,5,3,6,7], k = 3
<strong>Đầu ra:</strong> [1.00000,-1.00000,-1.00000,3.00000,5.00000,6.00000]
<strong>Giải thích:</strong> 
Window position                Median
---------------                -----
[<strong>1  3  -1</strong>] -3  5  3  6  7        1
 1 [<strong>3  -1  -3</strong>] 5  3  6  7       -1
 1  3 [<strong>-1  -3  5</strong>] 3  6  7       -1
 1  3  -1 [<strong>-3  5  3</strong>] 6  7        3
 1  3  -1  -3 [<strong>5  3  6</strong>] 7        5
 1  3  -1  -3  5 [<strong>3  6  7</strong>]       6
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> nums = [1,2,3,4,2,3,1,4,2], k = 3
<strong>Đầu ra:</strong> [2.00000,3.00000,3.00000,3.00000,2.00000,3.00000,2.00000]
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= k &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>-2<sup>31</sup> &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Heap**.

## 💻 Code 5 ngôn ngữ

```cpp
// Sliding Window Median - C++
class Solution {}
```

```java
// Sliding Window Median - Java
class Solution {}
```

```kotlin
// Sliding Window Median - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Sliding Window Median - Swift
func solve() -> Int { return 0 }
```

```dart
// Sliding Window Median - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
