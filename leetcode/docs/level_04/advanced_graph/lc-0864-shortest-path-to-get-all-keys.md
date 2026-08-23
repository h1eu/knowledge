---
title: "864. Shortest Path to Get All Keys"
slug: "lc-0864-shortest-path-to-get-all-keys"
summary: "Advanced Graph • Level 4 • Hard — Shortest Path to Get All Keys (LeetCode 864)"
tags: ["leetcode", "advanced-graph", "hard", "level-4"]
topic_tags: ["array", "bit-manipulation", "breadth-first-search", "matrix"]
difficulty: "Hard"
pattern: "Advanced Graph"
level: 4
leetcode_id: 864
url: "https://leetcode.com/problems/shortest-path-to-get-all-keys/"
---

# 864. Shortest Path to Get All Keys

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-hard">Hard</span> <span class="lc-pill lc-pill-pattern">Advanced Graph</span> <span class="lc-pill lc-pill-level">Level 4</span> <a href="https://leetcode.com/problems/shortest-path-to-get-all-keys/" target="_blank">LeetCode 864 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho lưới <code>grid</code> với <code>'@'</code> là điểm bắt đầu, <code>'.'</code> là ô trống, <code>'#'</code> là tường, <code>'a'-'f'</code> là khóa và <code>'A'-'F'</code> là ổ khóa, hãy tìm số bước ít nhất để nhặt hết khóa.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/07/23/lc-keys2.jpg" style="width: 404px; height: 245px;" />
<pre>
<strong>Đầu vào:</strong> grid = [&quot;@.a..&quot;,&quot;###.#&quot;,&quot;b.A.B&quot;]
<strong>Đầu ra:</strong> 8
<strong>Giải thích:</strong> Note that the goal is to obtain all the keys not to open all the locks.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/07/23/lc-key2.jpg" style="width: 404px; height: 245px;" />
<pre>
<strong>Đầu vào:</strong> grid = [&quot;@..aA&quot;,&quot;..B#.&quot;,&quot;....b&quot;]
<strong>Đầu ra:</strong> 6
</pre>

<p><strong class="example">Ví dụ 3:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/07/23/lc-keys3.jpg" style="width: 244px; height: 85px;" />
<pre>
<strong>Đầu vào:</strong> grid = [&quot;@Aa&quot;]
<strong>Đầu ra:</strong> -1
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>m == grid.length</code></li>
	<li><code>n == grid[i].length</code></li>
	<li><code>1 &lt;= m, n &lt;= 30</code></li>
	<li><code>grid[i][j]</code> is either an English letter, <code>&#39;.&#39;</code>, <code>&#39;#&#39;</code>, or <code>&#39;@&#39;</code>.&nbsp;</li>
	<li>There is exactly one&nbsp;<code>&#39;@&#39;</code>&nbsp;in the grid.</li>
	<li>The number of keys in the grid is in the range <code>[1, 6]</code>.</li>
	<li>Each key in the grid is <strong>unique</strong>.</li>
	<li>Each key in the grid has a matching lock.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Advanced Graph**.

## 💻 Code 5 ngôn ngữ

```cpp
// Shortest Path to Get All Keys - C++
class Solution {}
```

```java
// Shortest Path to Get All Keys - Java
class Solution {}
```

```kotlin
// Shortest Path to Get All Keys - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Shortest Path to Get All Keys - Swift
func solve() -> Int { return 0 }
```

```dart
// Shortest Path to Get All Keys - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
