---
title: "378. Kth Smallest Element in a Sorted Matrix"
slug: "lc-0378-kth-smallest-element-in-a-sort"
summary: "Binary Search • Level 1 • Medium — Kth Smallest Element in a Sorted Matrix (LeetCode 378)"
tags: ["leetcode", "binary-search", "medium", "level-1"]
topic_tags: ["array", "binary-search", "sorting", "heap-priority-queue", "matrix"]
difficulty: "Medium"
pattern: "Binary Search"
level: 1
leetcode_id: 378
url: "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/"
---

# 378. Kth Smallest Element in a Sorted Matrix

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Binary Search</span> <span class="lc-pill lc-pill-level">Level 1</span> <a href="https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/" target="_blank">LeetCode 378 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho ma trận <code>n x n</code> trong đó mỗi hàng và mỗi cột đều được sắp xếp tăng dần, hãy trả về phần tử nhỏ thứ <code>k</code> trong ma trận.</p>

<p>Lưu ý đây là phần tử nhỏ thứ <code>k</code> theo thứ tự sắp xếp, không phải phần tử khác biệt thứ <code>k</code>.</p>

<p>Bạn phải tìm lời giải có độ phức tạp tốt hơn <code>O(n<sup>2</sup>)</code>.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8
<strong>Đầu ra:</strong> 13
<strong>Giải thích:</strong> The elements in the matrix are [1,5,9,10,11,12,13,<u><strong>13</strong></u>,15], and the 8<sup>th</sup> smallest number is 13
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> matrix = [[-5]], k = 1
<strong>Đầu ra:</strong> -5
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>n == matrix.length == matrix[i].length</code></li>
	<li><code>1 &lt;= n &lt;= 300</code></li>
	<li><code>-10<sup>9</sup> &lt;= matrix[i][j] &lt;= 10<sup>9</sup></code></li>
	<li>All the rows and columns of <code>matrix</code> are <strong>guaranteed</strong> to be sorted in <strong>non-decreasing order</strong>.</li>
	<li><code>1 &lt;= k &lt;= n<sup>2</sup></code></li>
</ul>

<p>&nbsp;</p>
<p><strong>Yêu cầu mở rộng:</strong></p>

<ul>
	<li>Could you solve the problem with a constant memory (i.e., <code>O(1)</code> memory complexity)?</li>
	<li>Could you solve the problem in <code>O(n)</code> time complexity? The solution may be too advanced for an interview but you may find reading <a href="http://www.cse.yorku.ca/~andy/pubs/X+Y.pdf" target="_blank">this paper</a> fun.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Binary Search**.

## 💻 Code 5 ngôn ngữ

```cpp
// Kth Smallest in Sorted Matrix - C++
class Solution {}
```

```java
// Kth Smallest in Sorted Matrix - Java
class Solution {}
```

```kotlin
// Kth Smallest in Sorted Matrix - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Kth Smallest in Sorted Matrix - Swift
func solve() -> Int { return 0 }
```

```dart
// Kth Smallest in Sorted Matrix - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
