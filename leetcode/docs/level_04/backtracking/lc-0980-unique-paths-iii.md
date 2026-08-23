---
title: "980. Unique Paths III"
slug: "lc-0980-unique-paths-iii"
summary: "Backtracking • Level 4 • Hard — Unique Paths III (LeetCode 980)"
tags: ["leetcode", "backtracking", "hard", "level-4"]
topic_tags: ["array", "backtracking", "bit-manipulation", "matrix", "hamiltonian-path"]
difficulty: "Hard"
pattern: "Backtracking"
level: 4
leetcode_id: 980
url: "https://leetcode.com/problems/unique-paths-iii/"
---

# 980. Unique Paths III

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-hard">Hard</span> <span class="lc-pill lc-pill-pattern">Backtracking</span> <span class="lc-pill lc-pill-level">Level 4</span> <a href="https://leetcode.com/problems/unique-paths-iii/" target="_blank">LeetCode 980 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho lưới <code>grid</code> với <code>1</code> là điểm bắt đầu, <code>2</code> là điểm kết thúc, <code>0</code> là ô đi được và <code>-1</code> là chướng ngại, hãy đếm số đường đi từ <code>1</code> tới <code>2</code> đi qua tất cả ô <code>0</code> đúng một lần.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/08/02/lc-unique1.jpg" style="width: 324px; height: 245px;" />
<pre>
<strong>Đầu vào:</strong> grid = [[1,0,0,0],[0,0,0,0],[0,0,2,-1]]
<strong>Đầu ra:</strong> 2
<strong>Giải thích:</strong> We have the following two paths: 
1. (0,0),(0,1),(0,2),(0,3),(1,3),(1,2),(1,1),(1,0),(2,0),(2,1),(2,2)
2. (0,0),(1,0),(2,0),(2,1),(1,1),(0,1),(0,2),(0,3),(1,3),(1,2),(2,2)
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/08/02/lc-unique2.jpg" style="width: 324px; height: 245px;" />
<pre>
<strong>Đầu vào:</strong> grid = [[1,0,0,0],[0,0,0,0],[0,0,0,2]]
<strong>Đầu ra:</strong> 4
<strong>Giải thích:</strong> We have the following four paths: 
1. (0,0),(0,1),(0,2),(0,3),(1,3),(1,2),(1,1),(1,0),(2,0),(2,1),(2,2),(2,3)
2. (0,0),(0,1),(1,1),(1,0),(2,0),(2,1),(2,2),(1,2),(0,2),(0,3),(1,3),(2,3)
3. (0,0),(1,0),(2,0),(2,1),(2,2),(1,2),(1,1),(0,1),(0,2),(0,3),(1,3),(2,3)
4. (0,0),(1,0),(2,0),(2,1),(1,1),(0,1),(0,2),(0,3),(1,3),(1,2),(2,2),(2,3)
</pre>

<p><strong class="example">Ví dụ 3:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/08/02/lc-unique3-.jpg" style="width: 164px; height: 165px;" />
<pre>
<strong>Đầu vào:</strong> grid = [[0,1],[2,0]]
<strong>Đầu ra:</strong> 0
<strong>Giải thích:</strong> There is no path that walks over every empty square exactly once.
Note that the starting and ending square can be anywhere in the grid.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>m == grid.length</code></li>
	<li><code>n == grid[i].length</code></li>
	<li><code>1 &lt;= m, n &lt;= 20</code></li>
	<li><code>1 &lt;= m * n &lt;= 20</code></li>
	<li><code>-1 &lt;= grid[i][j] &lt;= 2</code></li>
	<li>There is exactly one starting cell and one ending cell.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Backtracking**.

## 💻 Code 5 ngôn ngữ

```cpp
// Unique Paths III - C++
class Solution {}
```

```java
// Unique Paths III - Java
class Solution {}
```

```kotlin
// Unique Paths III - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Unique Paths III - Swift
func solve() -> Int { return 0 }
```

```dart
// Unique Paths III - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
