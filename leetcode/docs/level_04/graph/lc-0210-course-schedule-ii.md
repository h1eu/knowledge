---
title: "210. Course Schedule II"
slug: "lc-0210-course-schedule-ii"
summary: "Graph • Level 4 • Medium — Course Schedule II (LeetCode 210)"
tags: ["leetcode", "graph", "medium", "level-4"]
topic_tags: ["depth-first-search", "breadth-first-search", "graph", "topological-sort"]
difficulty: "Medium"
pattern: "Graph"
level: 4
leetcode_id: 210
url: "https://leetcode.com/problems/course-schedule-ii/"
---

# 210. Course Schedule II

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Graph</span> <span class="lc-pill lc-pill-level">Level 4</span> <a href="https://leetcode.com/problems/course-schedule-ii/" target="_blank">LeetCode 210 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho <code>numCourses</code> và <code>prerequisites</code>, hãy trả về thứ tự học, nếu không thể trả về rỗng.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> numCourses = 2, prerequisites = [[1,0]]
<strong>Đầu ra:</strong> [0,1]
<strong>Giải thích:</strong> There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1].
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
<strong>Đầu ra:</strong> [0,2,1,3]
<strong>Giải thích:</strong> There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0.
So one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3].
</pre>

<p><strong class="example">Ví dụ 3:</strong></p>

<pre>
<strong>Đầu vào:</strong> numCourses = 1, prerequisites = []
<strong>Đầu ra:</strong> [0]
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= numCourses &lt;= 2000</code></li>
	<li><code>0 &lt;= prerequisites.length &lt;= numCourses * (numCourses - 1)</code></li>
	<li><code>prerequisites[i].length == 2</code></li>
	<li><code>0 &lt;= a<sub>i</sub>, b<sub>i</sub> &lt; numCourses</code></li>
	<li><code>a<sub>i</sub> != b<sub>i</sub></code></li>
	<li>All the pairs <code>[a<sub>i</sub>, b<sub>i</sub>]</code> are <strong>distinct</strong>.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Graph**.

## 💻 Code 5 ngôn ngữ

```cpp
// Course Schedule II - C++
class Solution {}
```

```java
// Course Schedule II - Java
class Solution {}
```

```kotlin
// Course Schedule II - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Course Schedule II - Swift
func solve() -> Int { return 0 }
```

```dart
// Course Schedule II - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
