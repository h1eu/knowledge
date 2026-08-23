---
title: "88. Merge Sorted Array"
slug: "lc-0088-merge-sorted-array"
summary: "Two Pointers • Level 1 • Easy — Merge Sorted Array (LeetCode 88)"
tags: ["leetcode", "two-pointers", "easy", "level-1"]
topic_tags: ["array", "two-pointers", "sorting"]
difficulty: "Easy"
pattern: "Two Pointers"
level: 1
leetcode_id: 88
url: "https://leetcode.com/problems/merge-sorted-array/"
---

# 88. Merge Sorted Array

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-easy">Easy</span> <span class="lc-pill lc-pill-pattern">Two Pointers</span> <span class="lc-pill lc-pill-level">Level 1</span> <a href="https://leetcode.com/problems/merge-sorted-array/" target="_blank">LeetCode 88 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho hai mảng đã sắp xếp <code>nums1</code> (kích thước <code>m+n</code>, <code>m</code> phần tử đầu là dữ liệu, <code>n</code> phần tử cuối là 0) và <code>nums2</code> (kích thước <code>n</code>). Hãy trộn <code>nums2</code> vào <code>nums1</code> thành một mảng đã sắp xếp, thao tác ngay trên <code>nums1</code>.</p>

<p>Không trả về gì, chỉ sửa <code>nums1</code>.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
<strong>Đầu ra:</strong> [1,2,2,3,5,6]
<strong>Giải thích:</strong> The arrays we are merging are [1,2,3] and [2,5,6].
The result of the merge is [<u>1</u>,<u>2</u>,2,<u>3</u>,5,6] with the underlined elements coming from nums1.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> nums1 = [1], m = 1, nums2 = [], n = 0
<strong>Đầu ra:</strong> [1]
<strong>Giải thích:</strong> The arrays we are merging are [1] and [].
The result of the merge is [1].
</pre>

<p><strong class="example">Ví dụ 3:</strong></p>

<pre>
<strong>Đầu vào:</strong> nums1 = [0], m = 0, nums2 = [1], n = 1
<strong>Đầu ra:</strong> [1]
<strong>Giải thích:</strong> The arrays we are merging are [] and [1].
The result of the merge is [1].
Note that because m = 0, there are no elements in nums1. The 0 is only there to ensure the merge result can fit in nums1.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>nums1.length == m + n</code></li>
	<li><code>nums2.length == n</code></li>
	<li><code>0 &lt;= m, n &lt;= 200</code></li>
	<li><code>1 &lt;= m + n &lt;= 200</code></li>
	<li><code>-10<sup>9</sup> &lt;= nums1[i], nums2[j] &lt;= 10<sup>9</sup></code></li>
</ul>

<p>&nbsp;</p>
<p><strong>Yêu cầu mở rộng: </strong>Can you come up with an algorithm that runs in <code>O(m + n)</code> time?</p>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Two Pointers**.

## 💻 Code 5 ngôn ngữ

```cpp
// Merge Sorted Array - C++
class Solution {}
```

```java
// Merge Sorted Array - Java
class Solution {}
```

```kotlin
// Merge Sorted Array - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Merge Sorted Array - Swift
func solve() -> Int { return 0 }
```

```dart
// Merge Sorted Array - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
