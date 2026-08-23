---
title: "547. Number of Provinces"
slug: "lc-0547-number-of-provinces"
summary: "Graph • Level 4 • Medium — Number of Provinces (LeetCode 547)"
tags: ["leetcode", "graph", "medium", "level-4"]
topic_tags: ["depth-first-search", "breadth-first-search", "union-find", "graph"]
difficulty: "Medium"
pattern: "Graph"
level: 4
leetcode_id: 547
url: "https://leetcode.com/problems/number-of-provinces/"
---

# 547. Number of Provinces

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Graph</span> <span class="lc-pill lc-pill-level">Level 4</span> <a href="https://leetcode.com/problems/number-of-provinces/" target="_blank">LeetCode 547 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho ma trận <code>isConnected</code> với <code>isConnected[i][j]=1</code> nghĩa là thành phố <code>i</code> và <code>j</code> nối trực tiếp, hãy trả về số tỉnh (thành phần liên thông).</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/12/24/graph1.jpg" style="width: 222px; height: 142px;" />
<pre>
<strong>Đầu vào:</strong> isConnected = [[1,1,0],[1,1,0],[0,0,1]]
<strong>Đầu ra:</strong> 2
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/12/24/graph2.jpg" style="width: 222px; height: 142px;" />
<pre>
<strong>Đầu vào:</strong> isConnected = [[1,0,0],[0,1,0],[0,0,1]]
<strong>Đầu ra:</strong> 3
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 200</code></li>
	<li><code>n == isConnected.length</code></li>
	<li><code>n == isConnected[i].length</code></li>
	<li><code>isConnected[i][j]</code> is <code>1</code> or <code>0</code>.</li>
	<li><code>isConnected[i][i] == 1</code></li>
	<li><code>isConnected[i][j] == isConnected[j][i]</code></li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Graph**.

## 💻 Code 5 ngôn ngữ

```cpp
// Number of Provinces - C++
class Solution {}
```

```java
// Number of Provinces - Java
class Solution {}
```

```kotlin
// Number of Provinces - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Number of Provinces - Swift
func solve() -> Int { return 0 }
```

```dart
// Number of Provinces - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
