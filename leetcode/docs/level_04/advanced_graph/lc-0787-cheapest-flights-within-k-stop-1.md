---
title: "787. Cheapest Flights Within K Stops"
slug: "lc-0787-cheapest-flights-within-k-stop-1"
summary: "Advanced Graph • Level 4 • Medium — Cheapest Flights Within K Stops (LeetCode 787)"
tags: ["leetcode", "advanced-graph", "medium", "level-4"]
topic_tags: ["dynamic-programming", "depth-first-search", "breadth-first-search", "graph", "heap-priority-queue", "shortest-path"]
difficulty: "Medium"
pattern: "Advanced Graph"
level: 4
leetcode_id: 787
url: "https://leetcode.com/problems/cheapest-flights-within-k-stops/"
---

# 787. Cheapest Flights Within K Stops

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Advanced Graph</span> <span class="lc-pill lc-pill-level">Level 4</span> <a href="https://leetcode.com/problems/cheapest-flights-within-k-stops/" target="_blank">LeetCode 787 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho <code>n</code> thành phố, các chuyến bay <code>flights</code> với <code>[from, to, price]</code> và số điểm dừng tối đa <code>k</code>, hãy tìm giá rẻ nhất từ <code>src</code> tới <code>dst</code> với tối đa <code>k</code> điểm dừng.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2022/03/18/cheapest-flights-within-k-stops-3drawio.png" style="width: 332px; height: 392px;" />
<pre>
<strong>Đầu vào:</strong> n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1
<strong>Đầu ra:</strong> 700
<strong>Giải thích:</strong>
The graph is shown above.
The optimal path with at most 1 stop from city 0 to 3 is marked in red and has cost 100 + 600 = 700.
Note that the path through cities [0,1,2,3] is cheaper but is invalid because it uses 2 stops.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2022/03/18/cheapest-flights-within-k-stops-1drawio.png" style="width: 332px; height: 242px;" />
<pre>
<strong>Đầu vào:</strong> n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1
<strong>Đầu ra:</strong> 200
<strong>Giải thích:</strong>
The graph is shown above.
The optimal path with at most 1 stop from city 0 to 2 is marked in red and has cost 100 + 100 = 200.
</pre>

<p><strong class="example">Ví dụ 3:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2022/03/18/cheapest-flights-within-k-stops-2drawio.png" style="width: 332px; height: 242px;" />
<pre>
<strong>Đầu vào:</strong> n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 0
<strong>Đầu ra:</strong> 500
<strong>Giải thích:</strong>
The graph is shown above.
The optimal path with no stops from city 0 to 2 is marked in red and has cost 500.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>2 &lt;= n &lt;= 100</code></li>
	<li><code>0 &lt;= flights.length &lt;= (n * (n - 1) / 2)</code></li>
	<li><code>flights[i].length == 3</code></li>
	<li><code>0 &lt;= from<sub>i</sub>, to<sub>i</sub> &lt; n</code></li>
	<li><code>from<sub>i</sub> != to<sub>i</sub></code></li>
	<li><code>1 &lt;= price<sub>i</sub> &lt;= 10<sup>4</sup></code></li>
	<li>There will not be any multiple flights between two cities.</li>
	<li><code>0 &lt;= src, dst, k &lt; n</code></li>
	<li><code>src != dst</code></li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Advanced Graph**.

## 💻 Code 5 ngôn ngữ

```cpp
// Cheapest Flights Within K Stops - C++
class Solution {}
```

```java
// Cheapest Flights Within K Stops - Java
class Solution {}
```

```kotlin
// Cheapest Flights Within K Stops - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Cheapest Flights Within K Stops - Swift
func solve() -> Int { return 0 }
```

```dart
// Cheapest Flights Within K Stops - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
