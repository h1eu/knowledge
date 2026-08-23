---
title: "684. Redundant Connection"
slug: "lc-0684-redundant-connection-1"
summary: "Advanced Graph • Level 4 • Medium — Redundant Connection (LeetCode 684)"
tags: ["leetcode", "advanced-graph", "medium", "level-4"]
topic_tags: ["depth-first-search", "breadth-first-search", "union-find", "graph"]
difficulty: "Medium"
pattern: "Advanced Graph"
level: 4
leetcode_id: 684
url: "https://leetcode.com/problems/redundant-connection/"
---

# 684. Redundant Connection

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Advanced Graph</span> <span class="lc-pill lc-pill-level">Level 4</span> <a href="https://leetcode.com/problems/redundant-connection/" target="_blank">LeetCode 684 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho đồ thị ban đầu là cây có <code>n</code> node (1-indexed) với <code>n</code> cạnh, trong đó một cạnh thừa tạo thành chu trình. Hãy tìm cạnh có thể xóa để đồ thị lại thành cây, nếu nhiều thì trả về cạnh xuất hiện cuối.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/05/02/reduntant1-1-graph.jpg" style="width: 222px; height: 222px;" />
<pre>
<strong>Đầu vào:</strong> edges = [[1,2],[1,3],[2,3]]
<strong>Đầu ra:</strong> [2,3]
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/05/02/reduntant1-2-graph.jpg" style="width: 382px; height: 222px;" />
<pre>
<strong>Đầu vào:</strong> edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]
<strong>Đầu ra:</strong> [1,4]
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>n == edges.length</code></li>
	<li><code>3 &lt;= n &lt;= 1000</code></li>
	<li><code>edges[i].length == 2</code></li>
	<li><code>1 &lt;= a<sub>i</sub> &lt; b<sub>i</sub> &lt;= edges.length</code></li>
	<li><code>a<sub>i</sub> != b<sub>i</sub></code></li>
	<li>There are no repeated edges.</li>
	<li>The given graph is connected.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Advanced Graph**.

## 💻 Code 5 ngôn ngữ

```cpp
// Redundant Connection - C++
class Solution {}
```

```java
// Redundant Connection - Java
class Solution {}
```

```kotlin
// Redundant Connection - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Redundant Connection - Swift
func solve() -> Int { return 0 }
```

```dart
// Redundant Connection - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
