---
title: "546. Remove Boxes"
slug: "lc-0546-remove-boxes"
summary: "2D DP • Level 5 • Hard — Remove Boxes (LeetCode 546)"
tags: ["leetcode", "2d-dp", "hard", "level-5"]
topic_tags: ["array", "dynamic-programming", "memoization"]
difficulty: "Hard"
pattern: "2D DP"
level: 5
leetcode_id: 546
url: "https://leetcode.com/problems/remove-boxes/"
---

# 546. Remove Boxes

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-hard">Hard</span> <span class="lc-pill lc-pill-pattern">2D DP</span> <span class="lc-pill lc-pill-level">Level 5</span> <a href="https://leetcode.com/problems/remove-boxes/" target="_blank">LeetCode 546 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho mảng hộp <code>boxes</code> với màu mỗi hộp, khi xóa một nhóm <code>k</code> hộp liên tiếp cùng màu bạn nhận <code>k*k</code> điểm. Hãy tìm điểm tối đa.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> boxes = [1,3,2,2,2,3,4,3,1]
<strong>Đầu ra:</strong> 23
<strong>Giải thích:</strong>
[1, 3, 2, 2, 2, 3, 4, 3, 1] 
----&gt; [1, 3, 3, 4, 3, 1] (3*3=9 points) 
----&gt; [1, 3, 3, 3, 1] (1*1=1 points) 
----&gt; [1, 1] (3*3=9 points) 
----&gt; [] (2*2=4 points)
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> boxes = [1,1,1]
<strong>Đầu ra:</strong> 9
</pre>

<p><strong class="example">Ví dụ 3:</strong></p>

<pre>
<strong>Đầu vào:</strong> boxes = [1]
<strong>Đầu ra:</strong> 1
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= boxes.length &lt;= 100</code></li>
	<li><code>1 &lt;= boxes[i]&nbsp;&lt;= 100</code></li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **2D DP**.

## 💻 Code 5 ngôn ngữ

```cpp
// Remove Boxes - C++
class Solution {}
```

```java
// Remove Boxes - Java
class Solution {}
```

```kotlin
// Remove Boxes - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Remove Boxes - Swift
func solve() -> Int { return 0 }
```

```dart
// Remove Boxes - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
