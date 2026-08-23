---
title: "879. Profitable Schemes"
slug: "lc-0879-profitable-schemes"
summary: "2D DP • Level 5 • Hard — Profitable Schemes (LeetCode 879)"
tags: ["leetcode", "2d-dp", "hard", "level-5"]
topic_tags: ["array", "dynamic-programming", "knapsack-problem", "0-1-knapsack"]
difficulty: "Hard"
pattern: "2D DP"
level: 5
leetcode_id: 879
url: "https://leetcode.com/problems/profitable-schemes/"
---

# 879. Profitable Schemes

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-hard">Hard</span> <span class="lc-pill lc-pill-pattern">2D DP</span> <span class="lc-pill lc-pill-level">Level 5</span> <a href="https://leetcode.com/problems/profitable-schemes/" target="_blank">LeetCode 879 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho <code>n</code> thành viên, mỗi dự án cần <code>group[i]</code> người và cho lợi nhuận <code>profit[i]</code>, hãy đếm số kế hoạch có lợi nhuận ít nhất <code>minProfit</code> (tối đa <code>n</code> người).</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> n = 5, minProfit = 3, group = [2,2], profit = [2,3]
<strong>Đầu ra:</strong> 2
<strong>Giải thích:</strong> To make a profit of at least 3, the group could either commit crimes 0 and 1, or just crime 1.
In total, there are 2 schemes.</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> n = 10, minProfit = 5, group = [2,3,5], profit = [6,7,8]
<strong>Đầu ra:</strong> 7
<strong>Giải thích:</strong> To make a profit of at least 5, the group could commit any crimes, as long as they commit one.
There are 7 possible schemes: (0), (1), (2), (0,1), (0,2), (1,2), and (0,1,2).</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 100</code></li>
	<li><code>0 &lt;= minProfit &lt;= 100</code></li>
	<li><code>1 &lt;= group.length &lt;= 100</code></li>
	<li><code>1 &lt;= group[i] &lt;= 100</code></li>
	<li><code>profit.length == group.length</code></li>
	<li><code>0 &lt;= profit[i] &lt;= 100</code></li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **2D DP**.

## 💻 Code 5 ngôn ngữ

```cpp
// Profitable Schemes - C++
class Solution {}
```

```java
// Profitable Schemes - Java
class Solution {}
```

```kotlin
// Profitable Schemes - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Profitable Schemes - Swift
func solve() -> Int { return 0 }
```

```dart
// Profitable Schemes - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
