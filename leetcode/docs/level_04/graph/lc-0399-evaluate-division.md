---
title: "399. Evaluate Division"
slug: "lc-0399-evaluate-division"
summary: "Graph • Level 4 • Medium — Evaluate Division (LeetCode 399)"
tags: ["leetcode", "graph", "medium", "level-4"]
topic_tags: ["array", "string", "depth-first-search", "breadth-first-search", "union-find", "graph", "shortest-path", "bellman-ford-algorithm", "floyd-warshall-algorithm"]
difficulty: "Medium"
pattern: "Graph"
level: 4
leetcode_id: 399
url: "https://leetcode.com/problems/evaluate-division/"
---

# 399. Evaluate Division

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Graph</span> <span class="lc-pill lc-pill-level">Level 4</span> <a href="https://leetcode.com/problems/evaluate-division/" target="_blank">LeetCode 399 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho các phương trình <code>equations</code> dạng <code>a / b = value</code> và các truy vấn <code>queries</code> dạng <code>c / d</code>, hãy trả về kết quả mỗi truy vấn, nếu không xác định thì <code>-1.0</code>.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> equations = [[&quot;a&quot;,&quot;b&quot;],[&quot;b&quot;,&quot;c&quot;]], values = [2.0,3.0], queries = [[&quot;a&quot;,&quot;c&quot;],[&quot;b&quot;,&quot;a&quot;],[&quot;a&quot;,&quot;e&quot;],[&quot;a&quot;,&quot;a&quot;],[&quot;x&quot;,&quot;x&quot;]]
<strong>Đầu ra:</strong> [6.00000,0.50000,-1.00000,1.00000,-1.00000]
<strong>Giải thích:</strong> 
Given: <em>a / b = 2.0</em>, <em>b / c = 3.0</em>
queries are: <em>a / c = ?</em>, <em>b / a = ?</em>, <em>a / e = ?</em>, <em>a / a = ?</em>, <em>x / x = ? </em>
return: [6.0, 0.5, -1.0, 1.0, -1.0 ]
note: x is undefined =&gt; -1.0</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> equations = [[&quot;a&quot;,&quot;b&quot;],[&quot;b&quot;,&quot;c&quot;],[&quot;bc&quot;,&quot;cd&quot;]], values = [1.5,2.5,5.0], queries = [[&quot;a&quot;,&quot;c&quot;],[&quot;c&quot;,&quot;b&quot;],[&quot;bc&quot;,&quot;cd&quot;],[&quot;cd&quot;,&quot;bc&quot;]]
<strong>Đầu ra:</strong> [3.75000,0.40000,5.00000,0.20000]
</pre>

<p><strong class="example">Ví dụ 3:</strong></p>

<pre>
<strong>Đầu vào:</strong> equations = [[&quot;a&quot;,&quot;b&quot;]], values = [0.5], queries = [[&quot;a&quot;,&quot;b&quot;],[&quot;b&quot;,&quot;a&quot;],[&quot;a&quot;,&quot;c&quot;],[&quot;x&quot;,&quot;y&quot;]]
<strong>Đầu ra:</strong> [0.50000,2.00000,-1.00000,-1.00000]
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= equations.length &lt;= 20</code></li>
	<li><code>equations[i].length == 2</code></li>
	<li><code>1 &lt;= A<sub>i</sub>.length, B<sub>i</sub>.length &lt;= 5</code></li>
	<li><code>values.length == equations.length</code></li>
	<li><code>0.0 &lt; values[i] &lt;= 20.0</code></li>
	<li><code>1 &lt;= queries.length &lt;= 20</code></li>
	<li><code>queries[i].length == 2</code></li>
	<li><code>1 &lt;= C<sub>j</sub>.length, D<sub>j</sub>.length &lt;= 5</code></li>
	<li><code>A<sub>i</sub>, B<sub>i</sub>, C<sub>j</sub>, D<sub>j</sub></code> consist of lower case English letters and digits.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Graph**.

## 💻 Code 5 ngôn ngữ

```cpp
// Evaluate Division - C++
class Solution {}
```

```java
// Evaluate Division - Java
class Solution {}
```

```kotlin
// Evaluate Division - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Evaluate Division - Swift
func solve() -> Int { return 0 }
```

```dart
// Evaluate Division - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
