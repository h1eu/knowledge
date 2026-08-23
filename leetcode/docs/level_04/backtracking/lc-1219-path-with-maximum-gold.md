---
title: "1219. Path with Maximum Gold"
slug: "lc-1219-path-with-maximum-gold"
summary: "Backtracking • Level 4 • Medium — Path with Maximum Gold (LeetCode 1219)"
tags: ["leetcode", "backtracking", "medium", "level-4"]
topic_tags: ["array", "backtracking", "matrix"]
difficulty: "Medium"
pattern: "Backtracking"
level: 4
leetcode_id: 1219
url: "https://leetcode.com/problems/path-with-maximum-gold/"
---

# 1219. Path with Maximum Gold

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Backtracking</span> <span class="lc-pill lc-pill-level">Level 4</span> <a href="https://leetcode.com/problems/path-with-maximum-gold/" target="_blank">LeetCode 1219 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho lưới <code>grid</code> với mỗi ô chứa số vàng (0 là không có), bạn có thể bắt đầu từ bất kỳ ô có vàng nào, di chuyển 4 hướng, mỗi ô chỉ đi một lần. Hãy tìm lượng vàng tối đa có thể thu thập.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> grid = [[0,6,0],[5,8,7],[0,9,0]]
<strong>Đầu ra:</strong> 24
<strong>Giải thích:</strong>
[[0,6,0],
 [5,8,7],
 [0,9,0]]
Path to get the maximum gold, 9 -&gt; 8 -&gt; 7.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> grid = [[1,0,7],[2,0,6],[3,4,5],[0,3,0],[9,0,20]]
<strong>Đầu ra:</strong> 28
<strong>Giải thích:</strong>
[[1,0,7],
 [2,0,6],
 [3,4,5],
 [0,3,0],
 [9,0,20]]
Path to get the maximum gold, 1 -&gt; 2 -&gt; 3 -&gt; 4 -&gt; 5 -&gt; 6 -&gt; 7.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>m == grid.length</code></li>
	<li><code>n == grid[i].length</code></li>
	<li><code>1 &lt;= m, n &lt;= 15</code></li>
	<li><code>0 &lt;= grid[i][j] &lt;= 100</code></li>
	<li>There are at most <strong>25 </strong>cells containing gold.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Backtracking**.

## 💻 Code 5 ngôn ngữ

```cpp
// Path with Maximum Gold - C++
class Solution {}
```

```java
// Path with Maximum Gold - Java
class Solution {}
```

```kotlin
// Path with Maximum Gold - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Path with Maximum Gold - Swift
func solve() -> Int { return 0 }
```

```dart
// Path with Maximum Gold - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
