---
title: "502. IPO"
slug: "lc-0502-ipo"
summary: "Heap • Level 3 • Hard — IPO (LeetCode 502)"
tags: ["leetcode", "heap", "hard", "level-3"]
topic_tags: ["array", "greedy", "sorting", "heap-priority-queue"]
difficulty: "Hard"
pattern: "Heap"
level: 3
leetcode_id: 502
url: "https://leetcode.com/problems/ipo/"
---

# 502. IPO

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-hard">Hard</span> <span class="lc-pill lc-pill-pattern">Heap</span> <span class="lc-pill lc-pill-level">Level 3</span> <a href="https://leetcode.com/problems/ipo/" target="_blank">LeetCode 502 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho số dự án <code>n</code> với vốn yêu cầu <code>capital[i]</code> và lợi nhuận <code>profits[i]</code>, vốn ban đầu <code>w</code> và tối đa <code>k</code> dự án có thể làm. Mỗi lần chọn dự án có vốn ≤ vốn hiện tại, sau khi làm vốn tăng thêm lợi nhuận. Hãy tối đa hoá vốn cuối cùng (dùng hai heap).</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> k = 2, w = 0, profits = [1,2,3], capital = [0,1,1]
<strong>Đầu ra:</strong> 4
<strong>Giải thích:</strong> Since your initial capital is 0, you can only start the project indexed 0.
After finishing it you will obtain profit 1 and your capital becomes 1.
With capital 1, you can either start the project indexed 1 or the project indexed 2.
Since you can choose at most 2 projects, you need to finish the project indexed 2 to get the maximum capital.
Therefore, output the final maximized capital, which is 0 + 1 + 3 = 4.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> k = 3, w = 0, profits = [1,2,3], capital = [0,1,2]
<strong>Đầu ra:</strong> 6
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= k &lt;= 10<sup>5</sup></code></li>
	<li><code>0 &lt;= w &lt;= 10<sup>9</sup></code></li>
	<li><code>n == profits.length</code></li>
	<li><code>n == capital.length</code></li>
	<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>
	<li><code>0 &lt;= profits[i] &lt;= 10<sup>4</sup></code></li>
	<li><code>0 &lt;= capital[i] &lt;= 10<sup>9</sup></code></li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Heap**.

## 💻 Code 5 ngôn ngữ

```cpp
// IPO - C++
class Solution {}
```

```java
// IPO - Java
class Solution {}
```

```kotlin
// IPO - Kotlin
fun solve(): Int { return 0 }
```

```swift
// IPO - Swift
func solve() -> Int { return 0 }
```

```dart
// IPO - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
