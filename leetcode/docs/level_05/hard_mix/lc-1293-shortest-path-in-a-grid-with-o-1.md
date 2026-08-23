---
title: "1293. Shortest Path in a Grid with Obstacles Elimination"
slug: "lc-1293-shortest-path-in-a-grid-with-o-1"
summary: "Hard Mix • Level 5 • Hard — Shortest Path in a Grid with Obstacles Elimination (LeetCode 1293)"
tags: ["leetcode", "hard-mix", "hard", "level-5"]
topic_tags: ["array", "breadth-first-search", "matrix"]
difficulty: "Hard"
pattern: "Hard Mix"
level: 5
leetcode_id: 1293
url: "https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/"
---

# 1293. Shortest Path in a Grid with Obstacles Elimination

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-hard">Hard</span> <span class="lc-pill lc-pill-pattern">Hard Mix</span> <span class="lc-pill lc-pill-level">Level 5</span> <a href="https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/" target="_blank">LeetCode 1293 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho lưới với chướng ngại và <code>k</code> lần loại bỏ, hãy tìm đường đi ngắn nhất (bản Hard Mix).</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/09/30/short1-grid.jpg" style="width: 244px; height: 405px;" />
<pre>
<strong>Đầu vào:</strong> grid = [[0,0,0],[1,1,0],[0,0,0],[0,1,1],[0,0,0]], k = 1
<strong>Đầu ra:</strong> 6
<strong>Giải thích:</strong> 
The shortest path without eliminating any obstacle is 10.
The shortest path with one obstacle elimination at position (3,2) is 6. Such path is (0,0) -&gt; (0,1) -&gt; (0,2) -&gt; (1,2) -&gt; (2,2) -&gt; <strong>(3,2)</strong> -&gt; (4,2).
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/09/30/short2-grid.jpg" style="width: 244px; height: 245px;" />
<pre>
<strong>Đầu vào:</strong> grid = [[0,1,1],[1,1,1],[1,0,0]], k = 1
<strong>Đầu ra:</strong> -1
<strong>Giải thích:</strong> We need to eliminate at least two obstacles to find such a walk.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>m == grid.length</code></li>
	<li><code>n == grid[i].length</code></li>
	<li><code>1 &lt;= m, n &lt;= 40</code></li>
	<li><code>1 &lt;= k &lt;= m * n</code></li>
	<li><code>grid[i][j]</code> is either <code>0</code> <strong>or</strong> <code>1</code>.</li>
	<li><code>grid[0][0] == grid[m - 1][n - 1] == 0</code></li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Hard Mix**.

## 💻 Code 5 ngôn ngữ

```cpp
// Shortest Path in Grid with Obstacles - C++
class Solution {}
```

```java
// Shortest Path in Grid with Obstacles - Java
class Solution {}
```

```kotlin
// Shortest Path in Grid with Obstacles - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Shortest Path in Grid with Obstacles - Swift
func solve() -> Int { return 0 }
```

```dart
// Shortest Path in Grid with Obstacles - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
