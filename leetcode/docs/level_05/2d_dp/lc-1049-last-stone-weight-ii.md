---
title: "1049. Last Stone Weight II"
slug: "lc-1049-last-stone-weight-ii"
summary: "2D DP • Level 5 • Medium — Last Stone Weight II (LeetCode 1049)"
tags: ["leetcode", "2d-dp", "medium", "level-5"]
topic_tags: ["array", "dynamic-programming", "knapsack-problem", "0-1-knapsack"]
difficulty: "Medium"
pattern: "2D DP"
level: 5
leetcode_id: 1049
url: "https://leetcode.com/problems/last-stone-weight-ii/"
---

# 1049. Last Stone Weight II

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">2D DP</span> <span class="lc-pill lc-pill-level">Level 5</span> <a href="https://leetcode.com/problems/last-stone-weight-ii/" target="_blank">LeetCode 1049 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho mảng đá <code>stones</code> với trọng lượng mỗi viên, mỗi lần đập hai viên, nếu bằng nhau thì cả hai vỡ, nếu khác thì viên nhỏ vỡ và viên lớn còn lại hiệu trọng lượng. Hãy tìm trọng lượng nhỏ nhất có thể còn lại.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> stones = [2,7,4,1,8,1]
<strong>Đầu ra:</strong> 1
<strong>Giải thích:</strong>
We can combine 2 and 4 to get 2, so the array converts to [2,7,1,8,1] then,
we can combine 7 and 8 to get 1, so the array converts to [2,1,1,1] then,
we can combine 2 and 1 to get 1, so the array converts to [1,1,1] then,
we can combine 1 and 1 to get 0, so the array converts to [1], then that&#39;s the optimal value.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> stones = [31,26,33,21,40]
<strong>Đầu ra:</strong> 5
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= stones.length &lt;= 30</code></li>
	<li><code>1 &lt;= stones[i] &lt;= 100</code></li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **2D DP**.

## 💻 Code 5 ngôn ngữ

```cpp
// Last Stone Weight II - C++
class Solution {}
```

```java
// Last Stone Weight II - Java
class Solution {}
```

```kotlin
// Last Stone Weight II - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Last Stone Weight II - Swift
func solve() -> Int { return 0 }
```

```dart
// Last Stone Weight II - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
