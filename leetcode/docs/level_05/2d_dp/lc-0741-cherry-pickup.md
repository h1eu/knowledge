---
title: "741. Cherry Pickup"
slug: "lc-0741-cherry-pickup"
summary: "2D DP • Level 5 • Hard — Cherry Pickup (LeetCode 741)"
tags: ["leetcode", "2d-dp", "hard", "level-5"]
topic_tags: ["array", "dynamic-programming", "matrix"]
difficulty: "Hard"
pattern: "2D DP"
level: 5
leetcode_id: 741
url: "https://leetcode.com/problems/cherry-pickup/"
---

# 741. Cherry Pickup

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-hard">Hard</span> <span class="lc-pill lc-pill-pattern">2D DP</span> <span class="lc-pill lc-pill-level">Level 5</span> <a href="https://leetcode.com/problems/cherry-pickup/" target="_blank">LeetCode 741 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho lưới <code>grid</code> với <code>1</code> là cherry, <code>-1</code> là gai, hai người cùng đi từ <code>(0,0)</code> tới <code>(n-1,n-1)</code> chỉ đi xuống/phải, hãy tìm số cherry tối đa thu thập.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/12/14/grid.jpg" style="width: 242px; height: 242px;" />
<pre>
<strong>Đầu vào:</strong> grid = [[0,1,-1],[1,0,-1],[1,1,1]]
<strong>Đầu ra:</strong> 5
<strong>Giải thích:</strong> The player started at (0, 0) and went down, down, right right to reach (2, 2).
4 cherries were picked up during this single trip, and the matrix becomes [[0,1,-1],[0,0,-1],[0,0,0]].
Then, the player went left, up, up, left to return home, picking up one more cherry.
The total number of cherries picked up is 5, and this is the maximum possible.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> grid = [[1,1,-1],[1,-1,1],[-1,1,1]]
<strong>Đầu ra:</strong> 0
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>n == grid.length</code></li>
	<li><code>n == grid[i].length</code></li>
	<li><code>1 &lt;= n &lt;= 50</code></li>
	<li><code>grid[i][j]</code> is <code>-1</code>, <code>0</code>, or <code>1</code>.</li>
	<li><code>grid[0][0] != -1</code></li>
	<li><code>grid[n - 1][n - 1] != -1</code></li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **2D DP**.

## 💻 Code 5 ngôn ngữ

```cpp
// Cherry Pickup - C++
class Solution {}
```

```java
// Cherry Pickup - Java
class Solution {}
```

```kotlin
// Cherry Pickup - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Cherry Pickup - Swift
func solve() -> Int { return 0 }
```

```dart
// Cherry Pickup - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
