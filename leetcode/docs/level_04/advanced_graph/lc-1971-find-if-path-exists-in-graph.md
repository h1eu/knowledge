---
title: "1971. Find if Path Exists in Graph"
slug: "lc-1971-find-if-path-exists-in-graph"
summary: "Advanced Graph • Level 4 • Easy — Find if Path Exists in Graph (LeetCode 1971)"
tags: ["leetcode", "advanced-graph", "easy", "level-4"]
topic_tags: ["depth-first-search", "breadth-first-search", "union-find", "graph"]
difficulty: "Easy"
pattern: "Advanced Graph"
level: 4
leetcode_id: 1971
url: "https://leetcode.com/problems/find-if-path-exists-in-graph/"
---

# 1971. Find if Path Exists in Graph

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-easy">Easy</span> <span class="lc-pill lc-pill-pattern">Advanced Graph</span> <span class="lc-pill lc-pill-level">Level 4</span> <a href="https://leetcode.com/problems/find-if-path-exists-in-graph/" target="_blank">LeetCode 1971 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho đồ thị vô hướng với <code>n</code> node và danh sách cạnh <code>edges</code>, hãy xác định có đường đi từ <code>source</code> tới <code>destination</code> không.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/08/14/validpath-ex1.png" style="width: 141px; height: 121px;" />
<pre>
<strong>Đầu vào:</strong> n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2
<strong>Đầu ra:</strong> true
<strong>Giải thích:</strong> There are two paths from vertex 0 to vertex 2:
- 0 &rarr; 1 &rarr; 2
- 0 &rarr; 2
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/08/14/validpath-ex2.png" style="width: 281px; height: 141px;" />
<pre>
<strong>Đầu vào:</strong> n = 6, edges = [[0,1],[0,2],[3,5],[5,4],[4,3]], source = 0, destination = 5
<strong>Đầu ra:</strong> false
<strong>Giải thích:</strong> There is no path from vertex 0 to vertex 5.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 2 * 10<sup>5</sup></code></li>
	<li><code>0 &lt;= edges.length &lt;= 2 * 10<sup>5</sup></code></li>
	<li><code>edges[i].length == 2</code></li>
	<li><code>0 &lt;= u<sub>i</sub>, v<sub>i</sub> &lt;= n - 1</code></li>
	<li><code>u<sub>i</sub> != v<sub>i</sub></code></li>
	<li><code>0 &lt;= source, destination &lt;= n - 1</code></li>
	<li>There are no duplicate edges.</li>
	<li>There are no self edges.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Advanced Graph**.

## 💻 Code 5 ngôn ngữ

```cpp
// Find if Path Exists in Graph - C++
class Solution {}
```

```java
// Find if Path Exists in Graph - Java
class Solution {}
```

```kotlin
// Find if Path Exists in Graph - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Find if Path Exists in Graph - Swift
func solve() -> Int { return 0 }
```

```dart
// Find if Path Exists in Graph - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
