---
title: "289. Game of Life"
slug: "lc-0289-game-of-life"
summary: "Array & Hashing • Level 1 • Medium — Game of Life (LeetCode 289)"
tags: ["leetcode", "array-hashing", "medium", "level-1"]
topic_tags: ["array", "matrix", "simulation"]
difficulty: "Medium"
pattern: "Array & Hashing"
level: 1
leetcode_id: 289
url: "https://leetcode.com/problems/game-of-life/"
---

# 289. Game of Life

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Array & Hashing</span> <span class="lc-pill lc-pill-level">Level 1</span> <a href="https://leetcode.com/problems/game-of-life/" target="_blank">LeetCode 289 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho bảng <code>m x n</code> <code>board</code> là trạng thái hiện tại của <strong>Game of Life</strong>, hãy tính trạng thái kế tiếp. Quy tắc:</p>
<ul>
	<li>Sống có &lt;2 hàng xóm sống → chết (cô lập).</li>
	<li>Sống có 2-3 hàng xóm sống → tiếp tục sống.</li>
	<li>Sống có &gt;3 hàng xóm sống → chết (quá tải).</li>
	<li>Chết có đúng 3 hàng xóm sống → sống lại.</li>
</ul>

<p>Yêu cầu cập nhật in-place.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/12/26/grid1.jpg" style="width: 562px; height: 322px;" />
<pre>
<strong>Đầu vào:</strong> board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]
<strong>Đầu ra:</strong> [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/12/26/grid2.jpg" style="width: 402px; height: 162px;" />
<pre>
<strong>Đầu vào:</strong> board = [[1,1],[1,0]]
<strong>Đầu ra:</strong> [[1,1],[1,1]]
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>m == board.length</code></li>
	<li><code>n == board[i].length</code></li>
	<li><code>1 &lt;= m, n &lt;= 25</code></li>
	<li><code>board[i][j]</code> is <code>0</code> or <code>1</code>.</li>
</ul>

<p>&nbsp;</p>
<p><strong>Yêu cầu mở rộng:</strong></p>

<ul>
	<li>Could you solve it in-place? Remember that the board needs to be updated simultaneously: You cannot update some cells first and then use their updated values to update other cells.</li>
	<li>In this question, we represent the board using a 2D array. In principle, the board is infinite, which would cause problems when the active area encroaches upon the border of the array (i.e., live cells reach the border). How would you address these problems?</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Array & Hashing**.

## 💻 Code 5 ngôn ngữ

```cpp
// Game of Life - C++
class Solution {}
```

```java
// Game of Life - Java
class Solution {}
```

```kotlin
// Game of Life - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Game of Life - Swift
func solve() -> Int { return 0 }
```

```dart
// Game of Life - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
