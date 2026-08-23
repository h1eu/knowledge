---
title: "802. Find Eventual Safe States"
slug: "lc-0802-find-eventual-safe-states"
summary: "Graph • Level 4 • Medium — Find Eventual Safe States (LeetCode 802)"
tags: ["leetcode", "graph", "medium", "level-4"]
topic_tags: ["depth-first-search", "breadth-first-search", "graph", "topological-sort", "kosarajus-algorithm", "tarjans-scc-algorithm"]
difficulty: "Medium"
pattern: "Graph"
level: 4
leetcode_id: 802
url: "https://leetcode.com/problems/find-eventual-safe-states/"
---

# 802. Find Eventual Safe States

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Graph</span> <span class="lc-pill lc-pill-level">Level 4</span> <a href="https://leetcode.com/problems/find-eventual-safe-states/" target="_blank">LeetCode 802 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho đồ thị có hướng, một node là an toàn nếu mọi đường đi từ nó đều tới node kết thúc (không có chu trình). Hãy trả về tất cả các node an toàn.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>
<img alt="Illustration of graph" src="https://s3-lc-upload.s3.amazonaws.com/uploads/2018/03/17/picture1.png" style="height: 171px; width: 600px;" />
<pre>
<strong>Đầu vào:</strong> graph = [[1,2],[2,3],[5],[0],[5],[],[]]
<strong>Đầu ra:</strong> [2,4,5,6]
<strong>Giải thích:</strong> The given graph is shown above.
Nodes 5 and 6 are terminal nodes as there are no outgoing edges from either of them.
Every path starting at nodes 2, 4, 5, and 6 all lead to either node 5 or 6.</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> graph = [[1,2,3,4],[1,2],[3,4],[0,4],[]]
<strong>Đầu ra:</strong> [4]
<strong>Giải thích:</strong>
Only node 4 is a terminal node, and every path starting at node 4 leads to node 4.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>n == graph.length</code></li>
	<li><code>1 &lt;= n &lt;= 10<sup>4</sup></code></li>
	<li><code>0 &lt;= graph[i].length &lt;= n</code></li>
	<li><code>0 &lt;= graph[i][j] &lt;= n - 1</code></li>
	<li><code>graph[i]</code> is sorted in a strictly increasing order.</li>
	<li>The graph may contain self-loops.</li>
	<li>The number of edges in the graph will be in the range <code>[1, 4 * 10<sup>4</sup>]</code>.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Graph**.

## 💻 Code 5 ngôn ngữ

```cpp
// Find Eventual Safe States - C++
class Solution {}
```

```java
// Find Eventual Safe States - Java
class Solution {}
```

```kotlin
// Find Eventual Safe States - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Find Eventual Safe States - Swift
func solve() -> Int { return 0 }
```

```dart
// Find Eventual Safe States - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
