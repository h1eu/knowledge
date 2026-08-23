---
title: "523. Continuous Subarray Sum"
slug: "lc-0523-continuous-subarray-sum"
summary: "Array & Hashing • Level 1 • Medium — Continuous Subarray Sum (LeetCode 523)"
tags: ["leetcode", "array-hashing", "medium", "level-1"]
topic_tags: ["array", "hash-table", "math", "prefix-sum", "pigeonhole-principle"]
difficulty: "Medium"
pattern: "Array & Hashing"
level: 1
leetcode_id: 523
url: "https://leetcode.com/problems/continuous-subarray-sum/"
---

# 523. Continuous Subarray Sum

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Array & Hashing</span> <span class="lc-pill lc-pill-level">Level 1</span> <a href="https://leetcode.com/problems/continuous-subarray-sum/" target="_blank">LeetCode 523 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho mảng số nguyên <code>nums</code> và số nguyên <code>k</code>, hãy kiểm tra có tồn tại mảng con liên tiếp độ dài ít nhất <code>2</code> có tổng là bội của <code>k</code> hay không.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> nums = [23,<u>2,4</u>,6,7], k = 6
<strong>Đầu ra:</strong> true
<strong>Giải thích:</strong> [2, 4] is a continuous subarray of size 2 whose elements sum up to 6.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> nums = [<u>23,2,6,4,7</u>], k = 6
<strong>Đầu ra:</strong> true
<strong>Giải thích:</strong> [23, 2, 6, 4, 7] is an continuous subarray of size 5 whose elements sum up to 42.
42 is a multiple of 6 because 42 = 7 * 6 and 7 is an integer.
</pre>

<p><strong class="example">Ví dụ 3:</strong></p>

<pre>
<strong>Đầu vào:</strong> nums = [23,2,6,4,7], k = 13
<strong>Đầu ra:</strong> false
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>0 &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
	<li><code>0 &lt;= sum(nums[i]) &lt;= 2<sup>31</sup> - 1</code></li>
	<li><code>1 &lt;= k &lt;= 2<sup>31</sup> - 1</code></li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Array & Hashing**.

## 💻 Code 5 ngôn ngữ

```cpp
// Continuous Subarray Sum - C++
class Solution {}
```

```java
// Continuous Subarray Sum - Java
class Solution {}
```

```kotlin
// Continuous Subarray Sum - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Continuous Subarray Sum - Swift
func solve() -> Int { return 0 }
```

```dart
// Continuous Subarray Sum - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
