---
title: "561. Array Partition"
slug: "lc-0561-array-partition"
summary: "Array & Hashing • Level 1 • Easy — Array Partition (LeetCode 561)"
tags: ["leetcode", "array-hashing", "easy", "level-1"]
topic_tags: ["array", "greedy", "sorting", "counting-sort"]
difficulty: "Easy"
pattern: "Array & Hashing"
level: 1
leetcode_id: 561
url: "https://leetcode.com/problems/array-partition/"
---

# 561. Array Partition

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-easy">Easy</span> <span class="lc-pill lc-pill-pattern">Array & Hashing</span> <span class="lc-pill lc-pill-level">Level 1</span> <a href="https://leetcode.com/problems/array-partition/" target="_blank">LeetCode 561 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho mảng số nguyên độ dài <code>2n</code>, hãy chia thành <code>n</code> cặp <code>(a1,b1),...,(an,bn)</code> sao cho tổng <code>min(ai, bi)</code> trên các cặp là lớn nhất. Trả về tổng lớn nhất đó.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> nums = [1,4,3,2]
<strong>Đầu ra:</strong> 4
<strong>Giải thích:</strong> All possible pairings (ignoring the ordering of elements) are:
1. (1, 4), (2, 3) -&gt; min(1, 4) + min(2, 3) = 1 + 2 = 3
2. (1, 3), (2, 4) -&gt; min(1, 3) + min(2, 4) = 1 + 2 = 3
3. (1, 2), (3, 4) -&gt; min(1, 2) + min(3, 4) = 1 + 3 = 4
So the maximum possible sum is 4.</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> nums = [6,2,6,5,1,2]
<strong>Đầu ra:</strong> 9
<strong>Giải thích:</strong> The optimal pairing is (2, 1), (2, 5), (6, 6). min(2, 1) + min(2, 5) + min(6, 6) = 1 + 2 + 6 = 9.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 10<sup>4</sup></code></li>
	<li><code>nums.length == 2 * n</code></li>
	<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Array & Hashing**.

## 💻 Code 5 ngôn ngữ

```cpp
// Array Partition - C++
class Solution {}
```

```java
// Array Partition - Java
class Solution {}
```

```kotlin
// Array Partition - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Array Partition - Swift
func solve() -> Int { return 0 }
```

```dart
// Array Partition - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
