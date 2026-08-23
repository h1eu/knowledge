---
title: "1319. Number of Operations to Make Network Connected"
slug: "lc-1319-number-of-operations-to-make-n"
summary: "Graph • Level 4 • Medium — Number of Operations to Make Network Connected (LeetCode 1319)"
tags: ["leetcode", "graph", "medium", "level-4"]
topic_tags: ["depth-first-search", "breadth-first-search", "union-find", "graph"]
difficulty: "Medium"
pattern: "Graph"
level: 4
leetcode_id: 1319
url: "https://leetcode.com/problems/number-of-operations-to-make-network-connected/"
---

# 1319. Number of Operations to Make Network Connected

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Graph</span> <span class="lc-pill lc-pill-level">Level 4</span> <a href="https://leetcode.com/problems/number-of-operations-to-make-network-connected/" target="_blank">LeetCode 1319 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho mạng với <code>n</code> máy tính và danh sách cáp <code>connections</code>, hãy trả về số lần đổi cáp ít nhất để nối tất cả máy tính, nếu không thể trả về <code>-1</code>.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/01/02/sample_1_1677.png" style="width: 500px; height: 148px;" />
<pre>
<strong>Đầu vào:</strong> n = 4, connections = [[0,1],[0,2],[1,2]]
<strong>Đầu ra:</strong> 1
<strong>Giải thích:</strong> Remove cable between computer 1 and 2 and place between computers 1 and 3.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/01/02/sample_2_1677.png" style="width: 500px; height: 129px;" />
<pre>
<strong>Đầu vào:</strong> n = 6, connections = [[0,1],[0,2],[0,3],[1,2],[1,3]]
<strong>Đầu ra:</strong> 2
</pre>

<p><strong class="example">Ví dụ 3:</strong></p>

<pre>
<strong>Đầu vào:</strong> n = 6, connections = [[0,1],[0,2],[0,3],[1,2]]
<strong>Đầu ra:</strong> -1
<strong>Giải thích:</strong> There are not enough cables.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= connections.length &lt;= min(n * (n - 1) / 2, 10<sup>5</sup>)</code></li>
	<li><code>connections[i].length == 2</code></li>
	<li><code>0 &lt;= a<sub>i</sub>, b<sub>i</sub> &lt; n</code></li>
	<li><code>a<sub>i</sub> != b<sub>i</sub></code></li>
	<li>There are no repeated connections.</li>
	<li>No two computers are connected by more than one cable.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Graph**.

## 💻 Code 5 ngôn ngữ

```cpp
// Number of Operations to Make Network Connected - C++
class Solution {}
```

```java
// Number of Operations to Make Network Connected - Java
class Solution {}
```

```kotlin
// Number of Operations to Make Network Connected - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Number of Operations to Make Network Connected - Swift
func solve() -> Int { return 0 }
```

```dart
// Number of Operations to Make Network Connected - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
