---
title: "659. Split Array into Consecutive Subsequences"
slug: "lc-0659-split-array-into-consecutive-s"
summary: "Heap • Level 3 • Medium — Split Array into Consecutive Subsequences (LeetCode 659)"
tags: ["leetcode", "heap", "medium", "level-3"]
topic_tags: ["array", "hash-table", "greedy", "heap-priority-queue"]
difficulty: "Medium"
pattern: "Heap"
level: 3
leetcode_id: 659
url: "https://leetcode.com/problems/split-array-into-consecutive-subsequences/"
---

# 659. Split Array into Consecutive Subsequences

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Heap</span> <span class="lc-pill lc-pill-level">Level 3</span> <a href="https://leetcode.com/problems/split-array-into-consecutive-subsequences/" target="_blank">LeetCode 659 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho mảng <code>nums</code> đã sắp xếp, hãy kiểm tra có thể chia mảng thành một hoặc nhiều dãy con liên tiếp mà mỗi dãy có độ dài ≥ <code>3</code> hay không.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> nums = [1,2,3,3,4,5]
<strong>Đầu ra:</strong> true
<strong>Giải thích:</strong> nums can be split into the following subsequences:
[<strong><u>1</u></strong>,<strong><u>2</u></strong>,<strong><u>3</u></strong>,3,4,5] --&gt; 1, 2, 3
[1,2,3,<strong><u>3</u></strong>,<strong><u>4</u></strong>,<strong><u>5</u></strong>] --&gt; 3, 4, 5
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> nums = [1,2,3,3,4,4,5,5]
<strong>Đầu ra:</strong> true
<strong>Giải thích:</strong> nums can be split into the following subsequences:
[<strong><u>1</u></strong>,<strong><u>2</u></strong>,<strong><u>3</u></strong>,3,<strong><u>4</u></strong>,4,<strong><u>5</u></strong>,5] --&gt; 1, 2, 3, 4, 5
[1,2,3,<strong><u>3</u></strong>,4,<strong><u>4</u></strong>,5,<strong><u>5</u></strong>] --&gt; 3, 4, 5
</pre>

<p><strong class="example">Ví dụ 3:</strong></p>

<pre>
<strong>Đầu vào:</strong> nums = [1,2,3,4,4,5]
<strong>Đầu ra:</strong> false
<strong>Giải thích:</strong> It is impossible to split nums into consecutive increasing subsequences of length 3 or more.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>
	<li><code>-1000 &lt;= nums[i] &lt;= 1000</code></li>
	<li><code>nums</code> is sorted in <strong>non-decreasing</strong> order.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Heap**.

## 💻 Code 5 ngôn ngữ

```cpp
// Split Array into Consecutive Subsequences - C++
class Solution {}
```

```java
// Split Array into Consecutive Subsequences - Java
class Solution {}
```

```kotlin
// Split Array into Consecutive Subsequences - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Split Array into Consecutive Subsequences - Swift
func solve() -> Int { return 0 }
```

```dart
// Split Array into Consecutive Subsequences - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
