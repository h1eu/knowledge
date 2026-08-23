---
title: "130. Surrounded Regions"
slug: "lc-0130-surrounded-regions"
summary: "Graph • Level 4 • Medium — Surrounded Regions (LeetCode 130)"
tags: ["leetcode", "graph", "medium", "level-4"]
topic_tags: ["array", "depth-first-search", "breadth-first-search", "union-find", "matrix"]
difficulty: "Medium"
pattern: "Graph"
level: 4
leetcode_id: 130
url: "https://leetcode.com/problems/surrounded-regions/"
---

# 130. Surrounded Regions

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Graph</span> <span class="lc-pill lc-pill-level">Level 4</span> <a href="https://leetcode.com/problems/surrounded-regions/" target="_blank">LeetCode 130 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho ma trận <code>m x n</code> <code>board</code> chứa <code>'X'</code> và <code>'O'</code>, hãy lật mọi vùng <code>'O'</code> bị bao quanh bởi <code>'X'</code> thành <code>'X'</code> (vùng nối với biên không bị lật).</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<div class="example-block">
<p><strong>Đầu vào:</strong> <span class="example-io">board = [[&quot;X&quot;,&quot;X&quot;,&quot;X&quot;,&quot;X&quot;],[&quot;X&quot;,&quot;O&quot;,&quot;O&quot;,&quot;X&quot;],[&quot;X&quot;,&quot;X&quot;,&quot;O&quot;,&quot;X&quot;],[&quot;X&quot;,&quot;O&quot;,&quot;X&quot;,&quot;X&quot;]]</span></p>

<p><strong>Đầu ra:</strong> <span class="example-io">[[&quot;X&quot;,&quot;X&quot;,&quot;X&quot;,&quot;X&quot;],[&quot;X&quot;,&quot;X&quot;,&quot;X&quot;,&quot;X&quot;],[&quot;X&quot;,&quot;X&quot;,&quot;X&quot;,&quot;X&quot;],[&quot;X&quot;,&quot;O&quot;,&quot;X&quot;,&quot;X&quot;]]</span></p>

<p><strong>Giải thích:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/02/19/xogrid.jpg" style="width: 367px; height: 158px;" />
<p>In the above diagram, the bottom region is not captured because it is on the edge of the board and cannot be surrounded.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">board = [[&quot;X&quot;]]</span></p>

<p><strong>Output:</strong> <span class="example-io">[[&quot;X&quot;]]</span></p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>m == board.length</code></li>
	<li><code>n == board[i].length</code></li>
	<li><code>1 &lt;= m, n &lt;= 200</code></li>
	<li><code>board[i][j]</code> is <code>&#39;X&#39;</code> or <code>&#39;O&#39;</code>.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Graph**.

## 💻 Code 5 ngôn ngữ

```cpp
// Surrounded Regions - C++
class Solution {}
```

```java
// Surrounded Regions - Java
class Solution {}
```

```kotlin
// Surrounded Regions - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Surrounded Regions - Swift
func solve() -> Int { return 0 }
```

```dart
// Surrounded Regions - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
