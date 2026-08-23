---
title: "871. Minimum Number of Refueling Stops"
slug: "lc-0871-minimum-number-of-refueling-st"
summary: "Greedy • Level 5 • Hard — Minimum Number of Refueling Stops (LeetCode 871)"
tags: ["leetcode", "greedy", "hard", "level-5"]
topic_tags: ["array", "dynamic-programming", "greedy", "heap-priority-queue"]
difficulty: "Hard"
pattern: "Greedy"
level: 5
leetcode_id: 871
url: "https://leetcode.com/problems/minimum-number-of-refueling-stops/"
---

# 871. Minimum Number of Refueling Stops

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-hard">Hard</span> <span class="lc-pill lc-pill-pattern">Greedy</span> <span class="lc-pill lc-pill-level">Level 5</span> <a href="https://leetcode.com/problems/minimum-number-of-refueling-stops/" target="_blank">LeetCode 871 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Xe cần đi quãng đường <code>target</code> với xăng ban đầu <code>startFuel</code>, có các trạm <code>stations[i]=[position, fuel]</code>. Hãy tìm số lần đổ xăng ít nhất để tới đích.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> target = 1, startFuel = 1, stations = []
<strong>Đầu ra:</strong> 0
<strong>Giải thích:</strong> We can reach the target without refueling.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> target = 100, startFuel = 1, stations = [[10,100]]
<strong>Đầu ra:</strong> -1
<strong>Giải thích:</strong> We can not reach the target (or even the first gas station).
</pre>

<p><strong class="example">Ví dụ 3:</strong></p>

<pre>
<strong>Đầu vào:</strong> target = 100, startFuel = 10, stations = [[10,60],[20,30],[30,30],[60,40]]
<strong>Đầu ra:</strong> 2
<strong>Giải thích:</strong> We start with 10 liters of fuel.
We drive to position 10, expending 10 liters of fuel.  We refuel from 0 liters to 60 liters of gas.
Then, we drive from position 10 to position 60 (expending 50 liters of fuel),
and refuel from 10 liters to 50 liters of gas.  We then drive to and reach the target.
We made 2 refueling stops along the way, so we return 2.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= target, startFuel &lt;= 10<sup>9</sup></code></li>
	<li><code>0 &lt;= stations.length &lt;= 500</code></li>
	<li><code>1 &lt;= position<sub>i</sub> &lt; position<sub>i+1</sub> &lt; target</code></li>
	<li><code>1 &lt;= fuel<sub>i</sub> &lt; 10<sup>9</sup></code></li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Greedy**.

## 💻 Code 5 ngôn ngữ

```cpp
// Minimum Number of Refueling Stops - C++
class Solution {}
```

```java
// Minimum Number of Refueling Stops - Java
class Solution {}
```

```kotlin
// Minimum Number of Refueling Stops - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Minimum Number of Refueling Stops - Swift
func solve() -> Int { return 0 }
```

```dart
// Minimum Number of Refueling Stops - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
