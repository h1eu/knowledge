---
title: "850. Rectangle Area II"
slug: "lc-0850-rectangle-area-ii"
summary: "Segment Tree • Level 3 • Hard — Rectangle Area II (LeetCode 850)"
tags: ["leetcode", "segment-tree", "hard", "level-3"]
topic_tags: ["array", "segment-tree", "sweep-line", "ordered-set"]
difficulty: "Hard"
pattern: "Segment Tree"
level: 3
leetcode_id: 850
url: "https://leetcode.com/problems/rectangle-area-ii/"
---

# 850. Rectangle Area II

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-hard">Hard</span> <span class="lc-pill lc-pill-pattern">Segment Tree</span> <span class="lc-pill lc-pill-level">Level 3</span> <a href="https://leetcode.com/problems/rectangle-area-ii/" target="_blank">LeetCode 850 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho danh sách hình chữ nhật song song trục <code>rectangles</code> với <code>[x1,y1,x2,y2]</code>, hãy tính tổng diện tích được phủ bởi các hình chữ nhật (phần giao chỉ tính một lần), trả về modulo <code>10<sup>9</sup>+7</code>.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>
<img alt="" src="https://s3-lc-upload.s3.amazonaws.com/uploads/2018/06/06/rectangle_area_ii_pic.png" style="width: 600px; height: 450px;" />
<pre>
<strong>Đầu vào:</strong> rectangles = [[0,0,2,2],[1,0,2,3],[1,0,3,1]]
<strong>Đầu ra:</strong> 6
<strong>Giải thích:</strong> A total area of 6 is covered by all three rectangles, as illustrated in the picture.
From (1,1) to (2,2), the green and red rectangles overlap.
From (1,0) to (2,3), all three rectangles overlap.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> rectangles = [[0,0,1000000000,1000000000]]
<strong>Đầu ra:</strong> 49
<strong>Giải thích:</strong> The answer is 10<sup>18</sup> modulo (10<sup>9</sup> + 7), which is 49.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= rectangles.length &lt;= 200</code></li>
	<li><code>rectanges[i].length == 4</code></li>
	<li><code>0 &lt;= x<sub>i1</sub>, y<sub>i1</sub>, x<sub>i2</sub>, y<sub>i2</sub> &lt;= 10<sup>9</sup></code></li>
	<li><code>x<sub>i1 &lt;= </sub>x<sub>i2</sub></code></li>
	<li><code>y<sub>i1 &lt;=</sub> y<sub>i2</sub></code></li>
	<li>All rectangles have non zero area.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Segment Tree**.

## 💻 Code 5 ngôn ngữ

```cpp
// Rectangle Area II - C++
class Solution {}
```

```java
// Rectangle Area II - Java
class Solution {}
```

```kotlin
// Rectangle Area II - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Rectangle Area II - Swift
func solve() -> Int { return 0 }
```

```dart
// Rectangle Area II - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
