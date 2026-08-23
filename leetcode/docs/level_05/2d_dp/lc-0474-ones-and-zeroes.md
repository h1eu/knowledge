---
title: "474. Ones and Zeroes"
slug: "lc-0474-ones-and-zeroes"
summary: "2D DP • Level 5 • Medium — Ones and Zeroes (LeetCode 474)"
tags: ["leetcode", "2d-dp", "medium", "level-5"]
topic_tags: ["array", "string", "dynamic-programming", "knapsack-problem", "0-1-knapsack"]
difficulty: "Medium"
pattern: "2D DP"
level: 5
leetcode_id: 474
url: "https://leetcode.com/problems/ones-and-zeroes/"
---

# 474. Ones and Zeroes

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">2D DP</span> <span class="lc-pill lc-pill-level">Level 5</span> <a href="https://leetcode.com/problems/ones-and-zeroes/" target="_blank">LeetCode 474 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho mảng chuỗi nhị phân <code>strs</code> và hai số nguyên <code>m,n</code>, hãy tìm số chuỗi tối đa có thể tạo với tối đa <code>m</code> số <code>0</code> và <code>n</code> số <code>1</code>.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> strs = [&quot;10&quot;,&quot;0001&quot;,&quot;111001&quot;,&quot;1&quot;,&quot;0&quot;], m = 5, n = 3
<strong>Đầu ra:</strong> 4
<strong>Giải thích:</strong> The largest subset with at most 5 0&#39;s and 3 1&#39;s is {&quot;10&quot;, &quot;0001&quot;, &quot;1&quot;, &quot;0&quot;}, so the answer is 4.
Other valid but smaller subsets include {&quot;0001&quot;, &quot;1&quot;} and {&quot;10&quot;, &quot;1&quot;, &quot;0&quot;}.
{&quot;111001&quot;} is an invalid subset because it contains 4 1&#39;s, greater than the maximum of 3.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> strs = [&quot;10&quot;,&quot;0&quot;,&quot;1&quot;], m = 1, n = 1
<strong>Đầu ra:</strong> 2
<b>Explanation:</b> The largest subset is {&quot;0&quot;, &quot;1&quot;}, so the answer is 2.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= strs.length &lt;= 600</code></li>
	<li><code>1 &lt;= strs[i].length &lt;= 100</code></li>
	<li><code>strs[i]</code> consists only of digits <code>&#39;0&#39;</code> and <code>&#39;1&#39;</code>.</li>
	<li><code>1 &lt;= m, n &lt;= 100</code></li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **2D DP**.

## 💻 Code 5 ngôn ngữ

```cpp
// Ones and Zeroes - C++
class Solution {}
```

```java
// Ones and Zeroes - Java
class Solution {}
```

```kotlin
// Ones and Zeroes - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Ones and Zeroes - Swift
func solve() -> Int { return 0 }
```

```dart
// Ones and Zeroes - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
