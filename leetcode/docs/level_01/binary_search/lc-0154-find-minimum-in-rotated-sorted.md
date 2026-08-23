---
title: "154. Find Minimum in Rotated Sorted Array II"
slug: "lc-0154-find-minimum-in-rotated-sorted"
summary: "Binary Search • Level 1 • Hard — Find Minimum in Rotated Sorted Array II (LeetCode 154)"
tags: ["leetcode", "binary-search", "hard", "level-1"]
topic_tags: ["array", "binary-search"]
difficulty: "Hard"
pattern: "Binary Search"
level: 1
leetcode_id: 154
url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/"
---

# 154. Find Minimum in Rotated Sorted Array II

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-hard">Hard</span> <span class="lc-pill lc-pill-pattern">Binary Search</span> <span class="lc-pill lc-pill-level">Level 1</span> <a href="https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/" target="_blank">LeetCode 154 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Giả sử mảng độ dài <code>n</code> đã sắp xếp tăng dần bị <strong>xoay</strong> từ <code>1</code> đến <code>n</code> lần. Ví dụ, mảng <code>nums = [0,1,4,4,5,6,7]</code> có thể trở thành:</p>

<ul>
	<li><code>[4,5,6,7,0,1,4]</code> nếu xoay <code>4</code> lần.</li>
	<li><code>[0,1,4,4,5,6,7]</code> nếu xoay <code>7</code> lần.</li>
</ul>

<p>Lưu ý rằng xoay mảng <code>[a[0], a[1], a[2], ..., a[n-1]]</code> một lần sẽ cho <code>[a[n-1], a[0], a[1], a[2], ..., a[n-2]]</code>.</p>

<p>Cho mảng đã xoay <code>nums</code> có thể chứa <strong>trùng lặp</strong>, hãy trả về <em>phần tử nhỏ nhất</em>. </p>

<p><em>Lưu ý:</em> Trường hợp có trùng làm bài này khó hơn bản I.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>
<pre><strong>Đầu vào:</strong> nums = [1,3,5]
<strong>Đầu ra:</strong> 1
</pre><p><strong class="example">Ví dụ 2:</strong></p>
<pre><strong>Đầu vào:</strong> nums = [2,2,2,0,1]
<strong>Đầu ra:</strong> 0
</pre>
<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>n == nums.length</code></li>
	<li><code>1 &lt;= n &lt;= 5000</code></li>
	<li><code>-5000 &lt;= nums[i] &lt;= 5000</code></li>
	<li><code>nums</code> is sorted and rotated between <code>1</code> and <code>n</code> times.</li>
</ul>

<p>&nbsp;</p>
<p><strong>Yêu cầu mở rộng:</strong> This problem is similar to&nbsp;<a href="https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/description/" target="_blank">Find Minimum in Rotated Sorted Array</a>, but&nbsp;<code>nums</code> may contain <strong>duplicates</strong>. Would this affect the runtime complexity? How and why?</p>

<p>&nbsp;</p>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Binary Search**.

## 💻 Code 5 ngôn ngữ

```cpp
// Find Minimum in Rotated Sorted Array II - C++
class Solution {}
```

```java
// Find Minimum in Rotated Sorted Array II - Java
class Solution {}
```

```kotlin
// Find Minimum in Rotated Sorted Array II - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Find Minimum in Rotated Sorted Array II - Swift
func solve() -> Int { return 0 }
```

```dart
// Find Minimum in Rotated Sorted Array II - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
