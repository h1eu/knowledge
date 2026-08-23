---
title: "886. Possible Bipartition"
slug: "lc-0886-possible-bipartition"
summary: "Graph • Level 4 • Medium — Possible Bipartition (LeetCode 886)"
tags: ["leetcode", "graph", "medium", "level-4"]
topic_tags: ["depth-first-search", "breadth-first-search", "union-find", "graph", "graph-coloring", "bipartite-graph"]
difficulty: "Medium"
pattern: "Graph"
level: 4
leetcode_id: 886
url: "https://leetcode.com/problems/possible-bipartition/"
---

# 886. Possible Bipartition

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Graph</span> <span class="lc-pill lc-pill-level">Level 4</span> <a href="https://leetcode.com/problems/possible-bipartition/" target="_blank">LeetCode 886 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho <code>n</code> người và danh sách <code>dislikes</code> với <code>[a,b]</code> nghĩa là <code>a</code> và <code>b</code> không thể cùng nhóm, hãy xác định có thể chia thành hai nhóm thỏa mãn không.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> n = 4, dislikes = [[1,2],[1,3],[2,4]]
<strong>Đầu ra:</strong> true
<strong>Giải thích:</strong> The first group has [1,4], and the second group has [2,3].
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> n = 3, dislikes = [[1,2],[1,3],[2,3]]
<strong>Đầu ra:</strong> false
<strong>Giải thích:</strong> We need at least 3 groups to divide them. We cannot put them in two groups.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 2000</code></li>
	<li><code>0 &lt;= dislikes.length &lt;= 10<sup>4</sup></code></li>
	<li><code>dislikes[i].length == 2</code></li>
	<li><code>1 &lt;= a<sub>i</sub> &lt; b<sub>i</sub> &lt;= n</code></li>
	<li>All the pairs of <code>dislikes</code> are <strong>unique</strong>.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Graph**.

## 💻 Code 5 ngôn ngữ

```cpp
// Possible Bipartition - C++
class Solution {}
```

```java
// Possible Bipartition - Java
class Solution {}
```

```kotlin
// Possible Bipartition - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Possible Bipartition - Swift
func solve() -> Int { return 0 }
```

```dart
// Possible Bipartition - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
