---
title: "973. K Closest Points to Origin"
slug: "lc-0973-k-closest-points-to-origin-1"
summary: "Heap • Level 3 • Medium — K Closest Points to Origin (LeetCode 973)"
tags: ["leetcode", "heap", "medium", "level-3"]
topic_tags: ["array", "math", "divide-and-conquer", "geometry", "sorting", "heap-priority-queue", "quickselect", "k-d-tree"]
difficulty: "Medium"
pattern: "Heap"
level: 3
leetcode_id: 973
url: "https://leetcode.com/problems/k-closest-points-to-origin/"
---

# 973. K Closest Points to Origin

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Heap</span> <span class="lc-pill lc-pill-level">Level 3</span> <a href="https://leetcode.com/problems/k-closest-points-to-origin/" target="_blank">LeetCode 973 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho mảng điểm <code>points</code>, hãy trả về <code>k</code> điểm gần gốc <code>(0,0)</code> nhất (bản Heap).</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/03/closestplane1.jpg" style="width: 400px; height: 400px;" />
<pre>
<strong>Đầu vào:</strong> points = [[1,3],[-2,2]], k = 1
<strong>Đầu ra:</strong> [[-2,2]]
<strong>Giải thích:</strong>
The distance between (1, 3) and the origin is sqrt(10).
The distance between (-2, 2) and the origin is sqrt(8).
Since sqrt(8) &lt; sqrt(10), (-2, 2) is closer to the origin.
We only want the closest k = 1 points from the origin, so the answer is just [[-2,2]].
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> points = [[3,3],[5,-1],[-2,4]], k = 2
<strong>Đầu ra:</strong> [[3,3],[-2,4]]
<strong>Giải thích:</strong> The answer [[-2,4],[3,3]] would also be accepted.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= k &lt;= points.length &lt;= 10<sup>4</sup></code></li>
	<li><code>-10<sup>4</sup> &lt;= x<sub>i</sub>, y<sub>i</sub> &lt;= 10<sup>4</sup></code></li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Heap**.

## 💻 Code 5 ngôn ngữ

```cpp
// K Closest Points to Origin - C++
class Solution {}
```

```java
// K Closest Points to Origin - Java
class Solution {}
```

```kotlin
// K Closest Points to Origin - Kotlin
fun solve(): Int { return 0 }
```

```swift
// K Closest Points to Origin - Swift
func solve() -> Int { return 0 }
```

```dart
// K Closest Points to Origin - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
