---
title: "312. Burst Balloons"
slug: "lc-0312-burst-balloons"
summary: "2D DP • Level 5 • Hard — Burst Balloons (LeetCode 312)"
tags: ["leetcode", "2d-dp", "hard", "level-5"]
topic_tags: ["array", "dynamic-programming"]
difficulty: "Hard"
pattern: "2D DP"
level: 5
leetcode_id: 312
url: "https://leetcode.com/problems/burst-balloons/"
---

# 312. Burst Balloons

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-hard">Hard</span> <span class="lc-pill lc-pill-pattern">2D DP</span> <span class="lc-pill lc-pill-level">Level 5</span> <a href="https://leetcode.com/problems/burst-balloons/" target="_blank">LeetCode 312 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho mảng <code>nums</code> là số trên mỗi bóng bay, khi làm nổ bóng <code>i</code> bạn nhận <code>nums[left]*nums[i]*nums[right]</code> với <code>left/right</code> là bóng kề còn lại. Hãy tìm số xu tối đa.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> nums = [3,1,5,8]
<strong>Đầu ra:</strong> 167
<strong>Giải thích:</strong>
nums = [3,1,5,8] --&gt; [3,5,8] --&gt; [3,8] --&gt; [8] --&gt; []
coins =  3*1*5    +   3*5*8   +  1*3*8  + 1*8*1 = 167</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> nums = [1,5]
<strong>Đầu ra:</strong> 10
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>n == nums.length</code></li>
	<li><code>1 &lt;= n &lt;= 300</code></li>
	<li><code>0 &lt;= nums[i] &lt;= 100</code></li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **2D DP**.

## 💻 Code 5 ngôn ngữ

```cpp
// Burst Balloons - C++
class Solution {}
```

```java
// Burst Balloons - Java
class Solution {}
```

```kotlin
// Burst Balloons - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Burst Balloons - Swift
func solve() -> Int { return 0 }
```

```dart
// Burst Balloons - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
