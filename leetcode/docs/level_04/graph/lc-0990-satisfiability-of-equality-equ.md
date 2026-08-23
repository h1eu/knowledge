---
title: "990. Satisfiability of Equality Equations"
slug: "lc-0990-satisfiability-of-equality-equ"
summary: "Graph • Level 4 • Medium — Satisfiability of Equality Equations (LeetCode 990)"
tags: ["leetcode", "graph", "medium", "level-4"]
topic_tags: ["array", "string", "union-find", "graph"]
difficulty: "Medium"
pattern: "Graph"
level: 4
leetcode_id: 990
url: "https://leetcode.com/problems/satisfiability-of-equality-equations/"
---

# 990. Satisfiability of Equality Equations

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Graph</span> <span class="lc-pill lc-pill-level">Level 4</span> <a href="https://leetcode.com/problems/satisfiability-of-equality-equations/" target="_blank">LeetCode 990 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho mảng phương trình <code>equations</code> dạng <code>a==b</code> hoặc <code>a!=b</code> với biến là chữ thường, hãy xác định có thể gán giá trị cho biến để thỏa mãn tất cả không.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> equations = [&quot;a==b&quot;,&quot;b!=a&quot;]
<strong>Đầu ra:</strong> false
<strong>Giải thích:</strong> If we assign say, a = 1 and b = 1, then the first equation is satisfied, but not the second.
There is no way to assign the variables to satisfy both equations.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> equations = [&quot;b==a&quot;,&quot;a==b&quot;]
<strong>Đầu ra:</strong> true
<strong>Giải thích:</strong> We could assign a = 1 and b = 1 to satisfy both equations.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= equations.length &lt;= 500</code></li>
	<li><code>equations[i].length == 4</code></li>
	<li><code>equations[i][0]</code> is a lowercase letter.</li>
	<li><code>equations[i][1]</code> is either <code>&#39;=&#39;</code> or <code>&#39;!&#39;</code>.</li>
	<li><code>equations[i][2]</code> is <code>&#39;=&#39;</code>.</li>
	<li><code>equations[i][3]</code> is a lowercase letter.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Graph**.

## 💻 Code 5 ngôn ngữ

```cpp
// Satisfiability of Equality Equations - C++
class Solution {}
```

```java
// Satisfiability of Equality Equations - Java
class Solution {}
```

```kotlin
// Satisfiability of Equality Equations - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Satisfiability of Equality Equations - Swift
func solve() -> Int { return 0 }
```

```dart
// Satisfiability of Equality Equations - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
