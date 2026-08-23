---
title: "735. Asteroid Collision"
slug: "lc-0735-asteroid-collision"
summary: "Stack • Level 1 • Medium — Asteroid Collision (LeetCode 735)"
tags: ["leetcode", "stack", "medium", "level-1"]
topic_tags: ["array", "stack", "simulation"]
difficulty: "Medium"
pattern: "Stack"
level: 1
leetcode_id: 735
url: "https://leetcode.com/problems/asteroid-collision/"
---

# 735. Asteroid Collision

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Stack</span> <span class="lc-pill lc-pill-level">Level 1</span> <a href="https://leetcode.com/problems/asteroid-collision/" target="_blank">LeetCode 735 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho mảng <code>asteroids</code> với giá trị tuyệt đối là kích thước, dấu là hướng (dương sang phải, âm sang trái). Các tiểu hành tinh di chuyển cùng tốc độ.</p>

<p>Nếu hai tiểu hành tinh gặp nhau, tiểu hành tinh nhỏ hơn sẽ nổ; nếu bằng nhau thì cả hai nổ. Tiểu hành tinh cùng hướng không gặp nhau.</p>

<p>Hãy trả về trạng thái sau mọi va chạm.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> asteroids = [5,10,-5]
<strong>Đầu ra:</strong> [5,10]
<strong>Giải thích:</strong> The 10 and -5 collide resulting in 10. The 5 and 10 never collide.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> asteroids = [8,-8]
<strong>Đầu ra:</strong> []
<strong>Giải thích:</strong> The 8 and -8 collide exploding each other.
</pre>

<p><strong class="example">Ví dụ 3:</strong></p>

<pre>
<strong>Đầu vào:</strong> asteroids = [10,2,-5]
<strong>Đầu ra:</strong> [10]
<strong>Giải thích:</strong> The 2 and -5 collide resulting in -5. The 10 and -5 collide resulting in 10.
</pre>

<p><strong class="example">Ví dụ 4:</strong></p>

<pre>
<strong>Đầu vào:</strong> asteroids = [3,5,-6,2,-1,4]​​​​​​​
<strong>Đầu ra:</strong> [-6,2,4]
<strong>Giải thích:</strong> The asteroid -6 makes the asteroid 3 and 5 explode, and then continues going left. On the other side, the asteroid 2 destroys -1. Since 2 and 4 are both moving right, they never collide.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>2 &lt;= asteroids.length &lt;= 10<sup>4</sup></code></li>
	<li><code>-1000 &lt;= asteroids[i] &lt;= 1000</code></li>
	<li><code>asteroids[i] != 0</code></li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Stack**.

## 💻 Code 5 ngôn ngữ

```cpp
// Asteroid Collision - C++
class Solution {}
```

```java
// Asteroid Collision - Java
class Solution {}
```

```kotlin
// Asteroid Collision - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Asteroid Collision - Swift
func solve() -> Int { return 0 }
```

```dart
// Asteroid Collision - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
