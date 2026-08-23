---
title: "133. Clone Graph"
slug: "lc-0133-clone-graph"
summary: "Graph • Level 4 • Medium — Clone Graph (LeetCode 133)"
tags: ["leetcode", "graph", "medium", "level-4"]
topic_tags: ["hash-table", "depth-first-search", "breadth-first-search", "graph"]
difficulty: "Medium"
pattern: "Graph"
level: 4
leetcode_id: 133
url: "https://leetcode.com/problems/clone-graph/"
---

# 133. Clone Graph

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Graph</span> <span class="lc-pill lc-pill-level">Level 4</span> <a href="https://leetcode.com/problems/clone-graph/" target="_blank">LeetCode 133 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho tham chiếu tới một node trong đồ thị vô hướng liên thông, hãy trả về bản sao sâu của đồ thị.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2019/11/04/133_clone_graph_question.png" style="width: 454px; height: 500px;" />
<pre>
<strong>Đầu vào:</strong> adjList = [[2,4],[1,3],[2,4],[1,3]]
<strong>Đầu ra:</strong> [[2,4],[1,3],[2,4],[1,3]]
<strong>Giải thích:</strong> There are 4 nodes in the graph.
1st node (val = 1)&#39;s neighbors are 2nd node (val = 2) and 4th node (val = 4).
2nd node (val = 2)&#39;s neighbors are 1st node (val = 1) and 3rd node (val = 3).
3rd node (val = 3)&#39;s neighbors are 2nd node (val = 2) and 4th node (val = 4).
4th node (val = 4)&#39;s neighbors are 1st node (val = 1) and 3rd node (val = 3).
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/01/07/graph.png" style="width: 163px; height: 148px;" />
<pre>
<strong>Đầu vào:</strong> adjList = [[]]
<strong>Đầu ra:</strong> [[]]
<strong>Giải thích:</strong> Note that the input contains one empty list. The graph consists of only one node with val = 1 and it does not have any neighbors.
</pre>

<p><strong class="example">Ví dụ 3:</strong></p>

<pre>
<strong>Đầu vào:</strong> adjList = []
<strong>Đầu ra:</strong> []
<strong>Giải thích:</strong> This an empty graph, it does not have any nodes.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li>The number of nodes in the graph is in the range <code>[0, 100]</code>.</li>
	<li><code>1 &lt;= Node.val &lt;= 100</code></li>
	<li><code>Node.val</code> is unique for each node.</li>
	<li>There are no repeated edges and no self-loops in the graph.</li>
	<li>The Graph is connected and all nodes can be visited starting from the given node.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Graph**.

## 💻 Code 5 ngôn ngữ

```cpp
// Clone Graph - C++
class Solution {}
```

```java
// Clone Graph - Java
class Solution {}
```

```kotlin
// Clone Graph - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Clone Graph - Swift
func solve() -> Int { return 0 }
```

```dart
// Clone Graph - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
