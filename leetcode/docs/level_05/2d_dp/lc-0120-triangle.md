---
title: "120. Triangle"
slug: "lc-0120-triangle"
summary: "2D DP • Level 5 • Medium — Triangle (LeetCode 120)"
tags: ["leetcode", "2d-dp", "medium", "level-5"]
topic_tags: ["array", "dynamic-programming"]
difficulty: "Medium"
pattern: "2D DP"
level: 5
leetcode_id: 120
url: "https://leetcode.com/problems/triangle/"
---

# 120. Triangle

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">2D DP</span> <span class="lc-pill lc-pill-level">Level 5</span> <a href="https://leetcode.com/problems/triangle/" target="_blank">LeetCode 120 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho tam giác <code>triangle</code> với mỗi hàng chứa số, hãy tìm tổng nhỏ nhất của đường đi từ đỉnh xuống đáy, mỗi bước xuống hàng dưới kề.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
<strong>Đầu ra:</strong> 11
<strong>Giải thích:</strong> The triangle looks like:
   <u>2</u>
  <u>3</u> 4
 6 <u>5</u> 7
4 <u>1</u> 8 3
The minimum path sum from top to bottom is 2 + 3 + 5 + 1 = 11 (underlined above).
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> triangle = [[-10]]
<strong>Đầu ra:</strong> -10
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= triangle.length &lt;= 200</code></li>
	<li><code>triangle[0].length == 1</code></li>
	<li><code>triangle[i].length == triangle[i - 1].length + 1</code></li>
	<li><code>-10<sup>4</sup> &lt;= triangle[i][j] &lt;= 10<sup>4</sup></code></li>
</ul>

<p>&nbsp;</p>
<strong>Yêu cầu mở rộng:</strong> Could you&nbsp;do this using only <code>O(n)</code> extra space, where <code>n</code> is the total number of rows in the triangle?
</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **2D DP**.

## 💻 Code 5 ngôn ngữ

```cpp
// Triangle - C++
class Solution {}
```

```java
// Triangle - Java
class Solution {}
```

```kotlin
// Triangle - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Triangle - Swift
func solve() -> Int { return 0 }
```

```dart
// Triangle - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
