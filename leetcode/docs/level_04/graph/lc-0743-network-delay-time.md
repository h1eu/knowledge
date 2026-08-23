---
title: "743. Network Delay Time"
slug: "lc-0743-network-delay-time"
summary: "Graph • Level 4 • Medium — Network Delay Time (LeetCode 743)"
tags: ["leetcode", "graph", "medium", "level-4"]
topic_tags: ["depth-first-search", "breadth-first-search", "graph", "heap-priority-queue", "shortest-path", "dijkstra"]
difficulty: "Medium"
pattern: "Graph"
level: 4
leetcode_id: 743
url: "https://leetcode.com/problems/network-delay-time/"
---

# 743. Network Delay Time

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Graph</span> <span class="lc-pill lc-pill-level">Level 4</span> <a href="https://leetcode.com/problems/network-delay-time/" target="_blank">LeetCode 743 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho mạng <code>times</code> <code>[u,v,w]</code> và node bắt đầu <code>k</code>, hãy tính thời gian để tất cả node nhận tín hiệu, nếu không thể trả về <code>-1</code>.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2019/05/23/931_example_1.png" style="width: 217px; height: 239px;" />
<pre>
<strong>Đầu vào:</strong> times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
<strong>Đầu ra:</strong> 2
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> times = [[1,2,1]], n = 2, k = 1
<strong>Đầu ra:</strong> 1
</pre>

<p><strong class="example">Ví dụ 3:</strong></p>

<pre>
<strong>Đầu vào:</strong> times = [[1,2,1]], n = 2, k = 2
<strong>Đầu ra:</strong> -1
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= k &lt;= n &lt;= 100</code></li>
	<li><code>1 &lt;= times.length &lt;= 6000</code></li>
	<li><code>times[i].length == 3</code></li>
	<li><code>1 &lt;= u<sub>i</sub>, v<sub>i</sub> &lt;= n</code></li>
	<li><code>u<sub>i</sub> != v<sub>i</sub></code></li>
	<li><code>0 &lt;= w<sub>i</sub> &lt;= 100</code></li>
	<li>All the pairs <code>(u<sub>i</sub>, v<sub>i</sub>)</code> are <strong>unique</strong>. (i.e., no multiple edges.)</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Graph**.

## 💻 Code 5 ngôn ngữ

```cpp
// Network Delay Time - C++
class Solution {}
```

```java
// Network Delay Time - Java
class Solution {}
```

```kotlin
// Network Delay Time - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Network Delay Time - Swift
func solve() -> Int { return 0 }
```

```dart
// Network Delay Time - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
