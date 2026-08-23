---
title: "1514. Path with Maximum Probability"
slug: "lc-1514-path-with-maximum-probability"
summary: "Advanced Graph • Level 4 • Medium — Path with Maximum Probability (LeetCode 1514)"
tags: ["leetcode", "advanced-graph", "medium", "level-4"]
topic_tags: ["array", "graph", "heap-priority-queue", "shortest-path", "dijkstra"]
difficulty: "Medium"
pattern: "Advanced Graph"
level: 4
leetcode_id: 1514
url: "https://leetcode.com/problems/path-with-maximum-probability/"
---

# 1514. Path with Maximum Probability

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Advanced Graph</span> <span class="lc-pill lc-pill-level">Level 4</span> <a href="https://leetcode.com/problems/path-with-maximum-probability/" target="_blank">LeetCode 1514 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho đồ thị vô hướng có trọng số với <code>n</code> node, các cạnh <code>edges</code> và xác suất thành công <code>succProb</code> cho mỗi cạnh, hãy tìm đường đi từ <code>start</code> tới <code>end</code> có xác suất thành công lớn nhất.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<p><strong><img alt="" src="https://assets.leetcode.com/uploads/2019/09/20/1558_ex1.png" style="width: 187px; height: 186px;" /></strong></p>

<pre>
<strong>Đầu vào:</strong> n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.2], start = 0, end = 2
<strong>Đầu ra:</strong> 0.25000
<strong>Giải thích:</strong>&nbsp;There are two paths from start to end, one having a probability of success = 0.2 and the other has 0.5 * 0.5 = 0.25.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<p><strong><img alt="" src="https://assets.leetcode.com/uploads/2019/09/20/1558_ex2.png" style="width: 189px; height: 186px;" /></strong></p>

<pre>
<strong>Đầu vào:</strong> n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.3], start = 0, end = 2
<strong>Đầu ra:</strong> 0.30000
</pre>

<p><strong class="example">Ví dụ 3:</strong></p>

<p><strong><img alt="" src="https://assets.leetcode.com/uploads/2019/09/20/1558_ex3.png" style="width: 215px; height: 191px;" /></strong></p>

<pre>
<strong>Đầu vào:</strong> n = 3, edges = [[0,1]], succProb = [0.5], start = 0, end = 2
<strong>Đầu ra:</strong> 0.00000
<strong>Giải thích:</strong>&nbsp;There is no path between 0 and 2.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>2 &lt;= n &lt;= 10^4</code></li>
	<li><code>0 &lt;= start, end &lt; n</code></li>
	<li><code>start != end</code></li>
	<li><code>0 &lt;= a, b &lt; n</code></li>
	<li><code>a != b</code></li>
	<li><code>0 &lt;= succProb.length == edges.length &lt;= 2*10^4</code></li>
	<li><code>0 &lt;= succProb[i] &lt;= 1</code></li>
	<li>There is at most one edge between every two nodes.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Advanced Graph**.

## 💻 Code 5 ngôn ngữ

```cpp
// Probability of a Path - C++
class Solution {}
```

```java
// Probability of a Path - Java
class Solution {}
```

```kotlin
// Probability of a Path - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Probability of a Path - Swift
func solve() -> Int { return 0 }
```

```dart
// Probability of a Path - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
