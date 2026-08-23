---
title: "2290. Minimum Obstacle Removal to Reach Corner"
slug: "lc-2290-minimum-obstacle-removal-to-re"
summary: "Advanced Graph • Level 4 • Hard — Minimum Obstacle Removal (LeetCode 2290)"
tags: ["leetcode", "advanced-graph", "hard", "level-4"]
topic_tags: ["array", "breadth-first-search", "graph", "heap-priority-queue", "matrix", "shortest-path", "0-1-bfs", "dijkstra"]
difficulty: "Hard"
pattern: "Advanced Graph"
level: 4
leetcode_id: 2290
url: "https://leetcode.com/problems/minimum-obstacle-removal-to-reach-corner/"
---

# 2290. Minimum Obstacle Removal to Reach Corner

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-hard">Hard</span> <span class="lc-pill lc-pill-pattern">Advanced Graph</span> <span class="lc-pill lc-pill-level">Level 4</span> <a href="https://leetcode.com/problems/minimum-obstacle-removal-to-reach-corner/" target="_blank">LeetCode 2290 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho lưới <code>m x n</code> với <code>0</code> là ô trống và <code>1</code> là chướng ngại, hãy tìm số chướng ngại ít nhất cần loại bỏ để đi từ <code>(0,0)</code> tới <code>(m-1,n-1)</code>.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2022/04/06/example1drawio-1.png" style="width: 605px; height: 246px;" />
<pre>
<strong>Đầu vào:</strong> grid = [[0,1,1],[1,1,0],[1,1,0]]
<strong>Đầu ra:</strong> 2
<strong>Giải thích:</strong> We can remove the obstacles at (0, 1) and (0, 2) to create a path from (0, 0) to (2, 2).
It can be shown that we need to remove at least 2 obstacles, so we return 2.
Note that there may be other ways to remove 2 obstacles to create a path.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2022/04/06/example1drawio.png" style="width: 405px; height: 246px;" />
<pre>
<strong>Đầu vào:</strong> grid = [[0,1,0,0,0],[0,1,0,1,0],[0,0,0,1,0]]
<strong>Đầu ra:</strong> 0
<strong>Giải thích:</strong> We can move from (0, 0) to (2, 4) without removing any obstacles, so we return 0.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>m == grid.length</code></li>
	<li><code>n == grid[i].length</code></li>
	<li><code>1 &lt;= m, n &lt;= 10<sup>5</sup></code></li>
	<li><code>2 &lt;= m * n &lt;= 10<sup>5</sup></code></li>
	<li><code>grid[i][j]</code> is either <code>0</code> <strong>or</strong> <code>1</code>.</li>
	<li><code>grid[0][0] == grid[m - 1][n - 1] == 0</code></li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Advanced Graph**.

## 💻 Code 5 ngôn ngữ

```cpp
// Minimum Obstacle Removal - C++
class Solution {}
```

```java
// Minimum Obstacle Removal - Java
class Solution {}
```

```kotlin
// Minimum Obstacle Removal - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Minimum Obstacle Removal - Swift
func solve() -> Int { return 0 }
```

```dart
// Minimum Obstacle Removal - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
