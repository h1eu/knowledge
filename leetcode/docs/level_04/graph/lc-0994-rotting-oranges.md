---
title: "994. Rotting Oranges"
slug: "lc-0994-rotting-oranges"
summary: "Graph • Level 4 • Medium — Rotting Oranges (LeetCode 994)"
tags: ["leetcode", "graph", "medium", "level-4"]
topic_tags: ["array", "breadth-first-search", "matrix"]
difficulty: "Medium"
pattern: "Graph"
level: 4
leetcode_id: 994
url: "https://leetcode.com/problems/rotting-oranges/"
---

# 994. Rotting Oranges

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Graph</span> <span class="lc-pill lc-pill-level">Level 4</span> <a href="https://leetcode.com/problems/rotting-oranges/" target="_blank">LeetCode 994 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho lưới <code>grid</code> với <code>0</code> là ô trống, <code>1</code> là cam tươi, <code>2</code> là cam thối, mỗi phút cam thối làm thối 4 ô kề. Hãy tính số phút ít nhất để không còn cam tươi, nếu không thể trả về <code>-1</code>.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2019/02/16/oranges.png" style="width: 650px; height: 137px;" />
<pre>
<strong>Đầu vào:</strong> grid = [[2,1,1],[1,1,0],[0,1,1]]
<strong>Đầu ra:</strong> 4
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> grid = [[2,1,1],[0,1,1],[1,0,1]]
<strong>Đầu ra:</strong> -1
<strong>Giải thích:</strong> The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.
</pre>

<p><strong class="example">Ví dụ 3:</strong></p>

<pre>
<strong>Đầu vào:</strong> grid = [[0,2]]
<strong>Đầu ra:</strong> 0
<strong>Giải thích:</strong> Since there are already no fresh oranges at minute 0, the answer is just 0.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>m == grid.length</code></li>
	<li><code>n == grid[i].length</code></li>
	<li><code>1 &lt;= m, n &lt;= 10</code></li>
	<li><code>grid[i][j]</code> is <code>0</code>, <code>1</code>, or <code>2</code>.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Graph**.

## 💻 Code 5 ngôn ngữ

```cpp
// Rotting Oranges - C++
class Solution {}
```

```java
// Rotting Oranges - Java
class Solution {}
```

```kotlin
// Rotting Oranges - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Rotting Oranges - Swift
func solve() -> Int { return 0 }
```

```dart
// Rotting Oranges - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
