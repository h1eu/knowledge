---
title: "417. Pacific Atlantic Water Flow"
slug: "lc-0417-pacific-atlantic-water-flow"
summary: "Graph • Level 4 • Medium — Pacific Atlantic Water Flow (LeetCode 417)"
tags: ["leetcode", "graph", "medium", "level-4"]
topic_tags: ["array", "depth-first-search", "breadth-first-search", "matrix"]
difficulty: "Medium"
pattern: "Graph"
level: 4
leetcode_id: 417
url: "https://leetcode.com/problems/pacific-atlantic-water-flow/"
---

# 417. Pacific Atlantic Water Flow

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Graph</span> <span class="lc-pill lc-pill-level">Level 4</span> <a href="https://leetcode.com/problems/pacific-atlantic-water-flow/" target="_blank">LeetCode 417 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho ma trận <code>heights</code> với độ cao mỗi ô, nước chảy từ ô cao xuống ô thấp hơn hoặc bằng ở 4 hướng. Hãy tìm tất cả ô mà nước có thể chảy tới cả Thái Bình Dương (biên trái/trên) và Đại Tây Dương (biên phải/dưới).</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/06/08/waterflow-grid.jpg" style="width: 400px; height: 400px;" />
<pre>
<strong>Đầu vào:</strong> heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
<strong>Đầu ra:</strong> [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
<strong>Giải thích:</strong> The following cells can flow to the Pacific and Atlantic oceans, as shown below:
[0,4]: [0,4] -&gt; Pacific Ocean 
&nbsp;      [0,4] -&gt; Atlantic Ocean
[1,3]: [1,3] -&gt; [0,3] -&gt; Pacific Ocean 
&nbsp;      [1,3] -&gt; [1,4] -&gt; Atlantic Ocean
[1,4]: [1,4] -&gt; [1,3] -&gt; [0,3] -&gt; Pacific Ocean 
&nbsp;      [1,4] -&gt; Atlantic Ocean
[2,2]: [2,2] -&gt; [1,2] -&gt; [0,2] -&gt; Pacific Ocean 
&nbsp;      [2,2] -&gt; [2,3] -&gt; [2,4] -&gt; Atlantic Ocean
[3,0]: [3,0] -&gt; Pacific Ocean 
&nbsp;      [3,0] -&gt; [4,0] -&gt; Atlantic Ocean
[3,1]: [3,1] -&gt; [3,0] -&gt; Pacific Ocean 
&nbsp;      [3,1] -&gt; [4,1] -&gt; Atlantic Ocean
[4,0]: [4,0] -&gt; Pacific Ocean 
       [4,0] -&gt; Atlantic Ocean
Note that there are other possible paths for these cells to flow to the Pacific and Atlantic oceans.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> heights = [[1]]
<strong>Đầu ra:</strong> [[0,0]]
<strong>Giải thích:</strong> The water can flow from the only cell to the Pacific and Atlantic oceans.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>m == heights.length</code></li>
	<li><code>n == heights[r].length</code></li>
	<li><code>1 &lt;= m, n &lt;= 200</code></li>
	<li><code>0 &lt;= heights[r][c] &lt;= 10<sup>5</sup></code></li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Graph**.

## 💻 Code 5 ngôn ngữ

```cpp
// Pacific Atlantic Water Flow - C++
class Solution {}
```

```java
// Pacific Atlantic Water Flow - Java
class Solution {}
```

```kotlin
// Pacific Atlantic Water Flow - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Pacific Atlantic Water Flow - Swift
func solve() -> Int { return 0 }
```

```dart
// Pacific Atlantic Water Flow - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
