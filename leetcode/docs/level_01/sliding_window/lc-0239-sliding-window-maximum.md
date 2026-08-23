---
title: "239. Sliding Window Maximum"
slug: "lc-0239-sliding-window-maximum"
summary: "Sliding Window • Level 1 • Hard — Sliding Window Maximum (LeetCode 239)"
tags: ["leetcode", "sliding-window", "hard", "level-1"]
topic_tags: ["array", "queue", "sliding-window", "heap-priority-queue", "monotonic-queue", "range-minimum-maximum-query"]
difficulty: "Hard"
pattern: "Sliding Window"
level: 1
leetcode_id: 239
url: "https://leetcode.com/problems/sliding-window-maximum/"
---

# 239. Sliding Window Maximum

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-hard">Hard</span> <span class="lc-pill lc-pill-pattern">Sliding Window</span> <span class="lc-pill lc-pill-level">Level 1</span> <a href="https://leetcode.com/problems/sliding-window-maximum/" target="_blank">LeetCode 239 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho mảng số nguyên <code>nums</code> và cửa sổ trượt kích thước <code>k</code> di chuyển từ trái sang phải, mỗi lần một vị trí. Mỗi vị trí cửa sổ chỉ thấy <code>k</code> số. Hãy trả về <em>max của mỗi cửa sổ</em>.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> nums = [1,3,-1,-3,5,3,6,7], k = 3
<strong>Đầu ra:</strong> [3,3,5,5,6,7]
<strong>Giải thích:</strong> 
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       <strong>3</strong>
 1 [3  -1  -3] 5  3  6  7       <strong>3</strong>
 1  3 [-1  -3  5] 3  6  7      <strong> 5</strong>
 1  3  -1 [-3  5  3] 6  7       <strong>5</strong>
 1  3  -1  -3 [5  3  6] 7       <strong>6</strong>
 1  3  -1  -3  5 [3  6  7]      <strong>7</strong>
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> nums = [1], k = 1
<strong>Đầu ra:</strong> [1]
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>
	<li><code>1 &lt;= k &lt;= nums.length</code></li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Sliding Window**.

## 💻 Code 5 ngôn ngữ

```cpp
// Sliding Window Maximum - C++
class Solution {}
```

```java
// Sliding Window Maximum - Java
class Solution {}
```

```kotlin
// Sliding Window Maximum - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Sliding Window Maximum - Swift
func solve() -> Int { return 0 }
```

```dart
// Sliding Window Maximum - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
