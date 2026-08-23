---
title: "207. Course Schedule"
slug: "lc-0207-course-schedule-1"
summary: "Graph • Level 4 • Medium — Course Schedule (LeetCode 207)"
tags: ["leetcode", "graph", "medium", "level-4"]
topic_tags: ["depth-first-search", "breadth-first-search", "graph", "topological-sort", "directed-acyclic-graph"]
difficulty: "Medium"
pattern: "Graph"
level: 4
leetcode_id: 207
url: "https://leetcode.com/problems/course-schedule/"
---

# 207. Course Schedule

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Graph</span> <span class="lc-pill lc-pill-level">Level 4</span> <a href="https://leetcode.com/problems/course-schedule/" target="_blank">LeetCode 207 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho <code>numCourses</code> và <code>prerequisites</code>, hãy kiểm tra có thể hoàn thành tất cả môn không (bản Graph).</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> numCourses = 2, prerequisites = [[1,0]]
<strong>Đầu ra:</strong> true
<strong>Giải thích:</strong> There are a total of 2 courses to take. 
To take course 1 you should have finished course 0. So it is possible.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> numCourses = 2, prerequisites = [[1,0],[0,1]]
<strong>Đầu ra:</strong> false
<strong>Giải thích:</strong> There are a total of 2 courses to take. 
To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= numCourses &lt;= 2000</code></li>
	<li><code>0 &lt;= prerequisites.length &lt;= 5000</code></li>
	<li><code>prerequisites[i].length == 2</code></li>
	<li><code>0 &lt;= a<sub>i</sub>, b<sub>i</sub> &lt; numCourses</code></li>
	<li>All the pairs prerequisites[i] are <strong>unique</strong>.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Graph**.

## 💻 Code 5 ngôn ngữ

```cpp
// Course Schedule - C++
class Solution {}
```

```java
// Course Schedule - Java
class Solution {}
```

```kotlin
// Course Schedule - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Course Schedule - Swift
func solve() -> Int { return 0 }
```

```dart
// Course Schedule - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
