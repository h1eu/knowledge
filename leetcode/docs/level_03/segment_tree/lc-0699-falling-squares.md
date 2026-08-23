---
title: "699. Falling Squares"
slug: "lc-0699-falling-squares"
summary: "Segment Tree • Level 3 • Hard — Falling Squares (LeetCode 699)"
tags: ["leetcode", "segment-tree", "hard", "level-3"]
topic_tags: ["array", "segment-tree", "ordered-set"]
difficulty: "Hard"
pattern: "Segment Tree"
level: 3
leetcode_id: 699
url: "https://leetcode.com/problems/falling-squares/"
---

# 699. Falling Squares

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-hard">Hard</span> <span class="lc-pill lc-pill-pattern">Segment Tree</span> <span class="lc-pill lc-pill-level">Level 3</span> <a href="https://leetcode.com/problems/falling-squares/" target="_blank">LeetCode 699 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Trên trục vô hạn, các hình vuông rơi lần lượt với <code>positions[i] = [left, sideLength]</code>. Mỗi hình vuông rơi từ trên xuống, đáy chạm vào đỉnh cao nhất trong khoảng của nó. Hãy trả về chiều cao tối đa sau mỗi lần rơi.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/04/28/fallingsq1-plane.jpg" style="width: 500px; height: 505px;" />
<pre>
<strong>Đầu vào:</strong> positions = [[1,2],[2,3],[6,1]]
<strong>Đầu ra:</strong> [2,5,5]
<strong>Giải thích:</strong>
After the first drop, the tallest stack is square 1 with a height of 2.
After the second drop, the tallest stack is squares 1 and 2 with a height of 5.
After the third drop, the tallest stack is still squares 1 and 2 with a height of 5.
Thus, we return an answer of [2, 5, 5].
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> positions = [[100,100],[200,100]]
<strong>Đầu ra:</strong> [100,100]
<strong>Giải thích:</strong>
After the first drop, the tallest stack is square 1 with a height of 100.
After the second drop, the tallest stack is either square 1 or square 2, both with heights of 100.
Thus, we return an answer of [100, 100].
Note that square 2 only brushes the right side of square 1, which does not count as landing on it.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= positions.length &lt;= 1000</code></li>
	<li><code>1 &lt;= left<sub>i</sub> &lt;= 10<sup>8</sup></code></li>
	<li><code>1 &lt;= sideLength<sub>i</sub> &lt;= 10<sup>6</sup></code></li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Segment Tree**.

## 💻 Code 5 ngôn ngữ

```cpp
// Falling Squares - C++
class Solution {}
```

```java
// Falling Squares - Java
class Solution {}
```

```kotlin
// Falling Squares - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Falling Squares - Swift
func solve() -> Int { return 0 }
```

```dart
// Falling Squares - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
