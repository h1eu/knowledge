---
title: "452. Minimum Number of Arrows to Burst Balloons"
slug: "lc-0452-minimum-number-of-arrows-to-bu-1"
summary: "Intervals • Level 2 • Medium — Minimum Number of Arrows to Burst Balloons (LeetCode 452)"
tags: ["leetcode", "intervals", "medium", "level-2"]
topic_tags: ["array", "greedy", "sorting"]
difficulty: "Medium"
pattern: "Intervals"
level: 2
leetcode_id: 452
url: "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/"
---

# 452. Minimum Number of Arrows to Burst Balloons

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Intervals</span> <span class="lc-pill lc-pill-level">Level 2</span> <a href="https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/" target="_blank">LeetCode 452 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Có các bóng bay với <code>points[i] = [xstart, xend]</code>. Một mũi tên bắn tại <code>x</code> làm nổ mọi bóng có <code>xstart ≤ x ≤ xend</code>. Hãy tìm số mũi tên ít nhất để nổ hết bóng (bản Intervals).</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> points = [[10,16],[2,8],[1,6],[7,12]]
<strong>Đầu ra:</strong> 2
<strong>Giải thích:</strong> The balloons can be burst by 2 arrows:
- Shoot an arrow at x = 6, bursting the balloons [2,8] and [1,6].
- Shoot an arrow at x = 11, bursting the balloons [10,16] and [7,12].
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> points = [[1,2],[3,4],[5,6],[7,8]]
<strong>Đầu ra:</strong> 4
<strong>Giải thích:</strong> One arrow needs to be shot for each balloon for a total of 4 arrows.
</pre>

<p><strong class="example">Ví dụ 3:</strong></p>

<pre>
<strong>Đầu vào:</strong> points = [[1,2],[2,3],[3,4],[4,5]]
<strong>Đầu ra:</strong> 2
<strong>Giải thích:</strong> The balloons can be burst by 2 arrows:
- Shoot an arrow at x = 2, bursting the balloons [1,2] and [2,3].
- Shoot an arrow at x = 4, bursting the balloons [3,4] and [4,5].
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= points.length &lt;= 10<sup>5</sup></code></li>
	<li><code>points[i].length == 2</code></li>
	<li><code>-2<sup>31</sup> &lt;= x<sub>start</sub> &lt; x<sub>end</sub> &lt;= 2<sup>31</sup> - 1</code></li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Intervals**.

## 💻 Code 5 ngôn ngữ

```cpp
// Minimum Arrows to Burst Balloons - C++
class Solution {}
```

```java
// Minimum Arrows to Burst Balloons - Java
class Solution {}
```

```kotlin
// Minimum Arrows to Burst Balloons - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Minimum Arrows to Burst Balloons - Swift
func solve() -> Int { return 0 }
```

```dart
// Minimum Arrows to Burst Balloons - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
