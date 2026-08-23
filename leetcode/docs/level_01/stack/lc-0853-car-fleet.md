---
title: "853. Car Fleet"
slug: "lc-0853-car-fleet"
summary: "Stack • Level 1 • Medium — Car Fleet (LeetCode 853)"
tags: ["leetcode", "stack", "medium", "level-1"]
topic_tags: ["array", "stack", "sorting", "monotonic-stack"]
difficulty: "Medium"
pattern: "Stack"
level: 1
leetcode_id: 853
url: "https://leetcode.com/problems/car-fleet/"
---

# 853. Car Fleet

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Stack</span> <span class="lc-pill lc-pill-level">Level 1</span> <a href="https://leetcode.com/problems/car-fleet/" target="_blank">LeetCode 853 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Có <code>n</code> xe tại các vị trí <code>position[i]</code> với tốc độ <code>speed[i]</code>, cùng hướng tới đích <code>target</code>. Xe không thể vượt nhau; nếu xe sau đuổi kịp xe trước thì thành đoàn (fleet) di chuyển cùng tốc độ chậm hơn.</p>

<p>Hãy trả về số đoàn xe tới đích.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<div class="example-block">
<p><strong>Đầu vào:</strong> <span class="example-io">target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]</span></p>

<p><strong>Đầu ra:</strong> <span class="example-io">3</span></p>

<p><strong>Giải thích:</strong></p>

<ul>
	<li>The cars starting at 10 (speed 2) and 8 (speed 4) become a fleet, meeting each other at 12. The fleet forms at <code>target</code>.</li>
	<li>The car starting at 0 (speed 1) does not catch up to any other car, so it is a fleet by itself.</li>
	<li>The cars starting at 5 (speed 1) and 3 (speed 3) become a fleet, meeting each other at 6. The fleet moves at speed 1 until it reaches <code>target</code>.</li>
</ul>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">target = 10, position = [3], speed = [3]</span></p>

<p><strong>Output:</strong> <span class="example-io">1</span></p>

<p><strong>Explanation:</strong></p>
There is only one car, hence there is only one fleet.</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">target = 100, position = [0,2,4], speed = [4,2,1]</span></p>

<p><strong>Output:</strong> <span class="example-io">1</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li>The cars starting at 0 (speed 4) and 2 (speed 2) become a fleet, meeting each other at 4. The car starting at 4 (speed 1) travels to 5.</li>
	<li>Then, the fleet at 4 (speed 2) and the car at position 5 (speed 1) become one fleet, meeting each other at 6. The fleet moves at speed 1 until it reaches <code>target</code>.</li>
</ul>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>n == position.length == speed.length</code></li>
	<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>
	<li><code>0 &lt; target &lt;= 10<sup>6</sup></code></li>
	<li><code>0 &lt;= position[i] &lt; target</code></li>
	<li>All the values of <code>position</code> are <strong>unique</strong>.</li>
	<li><code>0 &lt; speed[i] &lt;= 10<sup>6</sup></code></li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Stack**.

## 💻 Code 5 ngôn ngữ

```cpp
// Car Fleet - C++
class Solution {}
```

```java
// Car Fleet - Java
class Solution {}
```

```kotlin
// Car Fleet - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Car Fleet - Swift
func solve() -> Int { return 0 }
```

```dart
// Car Fleet - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
