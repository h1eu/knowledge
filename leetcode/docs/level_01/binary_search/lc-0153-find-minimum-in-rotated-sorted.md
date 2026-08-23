---
title: "153. Find Minimum in Rotated Sorted Array"
slug: "lc-0153-find-minimum-in-rotated-sorted"
summary: "Binary Search • Level 1 • Medium — Find Minimum in Rotated Sorted Array (LeetCode 153)"
tags: ["leetcode", "binary-search", "medium", "level-1"]
topic_tags: ["array", "binary-search"]
difficulty: "Medium"
pattern: "Binary Search"
level: 1
leetcode_id: 153
url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/"
---

# 153. Find Minimum in Rotated Sorted Array

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Binary Search</span> <span class="lc-pill lc-pill-level">Level 1</span> <a href="https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" target="_blank">LeetCode 153 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Giả sử mảng độ dài <code>n</code> đã sắp xếp tăng dần bị <strong>xoay</strong> từ <code>1</code> đến <code>n</code> lần. Ví dụ, mảng <code>nums = [0,1,2,4,5,6,7]</code> có thể trở thành:</p>

<ul>
	<li><code>[4,5,6,7,0,1,2]</code> nếu xoay <code>4</code> lần.</li>
	<li><code>[0,1,2,4,5,6,7]</code> nếu xoay <code>7</code> lần.</li>
</ul>

<p>Lưu ý rằng xoay mảng <code>[a[0], a[1], a[2], ..., a[n-1]]</code> một lần sẽ cho mảng <code>[a[n-1], a[0], a[1], a[2], ..., a[n-2]]</code>.</p>

<p>Cho mảng đã xoay <code>nums</code> gồm các phần tử <strong>khác nhau</strong>, hãy trả về <em>phần tử nhỏ nhất của mảng này</em>.</p>

<p>Bạn phải viết thuật toán có độ phức tạp <code>O(log n)</code>.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> nums = [3,4,5,1,2]
<strong>Đầu ra:</strong> 1
<strong>Giải thích:</strong> The original array was [1,2,3,4,5] rotated 3 times.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> nums = [4,5,6,7,0,1,2]
<strong>Đầu ra:</strong> 0
<strong>Giải thích:</strong> The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.
</pre>

<p><strong class="example">Ví dụ 3:</strong></p>

<pre>
<strong>Đầu vào:</strong> nums = [11,13,15,17]
<strong>Đầu ra:</strong> 11
<strong>Giải thích:</strong> The original array was [11,13,15,17] and it was rotated 4 times. 
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>n == nums.length</code></li>
	<li><code>1 &lt;= n &lt;= 5000</code></li>
	<li><code>-5000 &lt;= nums[i] &lt;= 5000</code></li>
	<li>All the integers of <code>nums</code> are <strong>unique</strong>.</li>
	<li><code>nums</code> is sorted and rotated between <code>1</code> and <code>n</code> times.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Binary Search**.

## 💻 Code 5 ngôn ngữ

```cpp
// Find Minimum in Rotated Sorted Array - C++
class Solution {}
```

```java
// Find Minimum in Rotated Sorted Array - Java
class Solution {}
```

```kotlin
// Find Minimum in Rotated Sorted Array - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Find Minimum in Rotated Sorted Array - Swift
func solve() -> Int { return 0 }
```

```dart
// Find Minimum in Rotated Sorted Array - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
