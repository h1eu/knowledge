---
title: "134. Gas Station"
slug: "lc-0134-gas-station"
summary: "Greedy • Level 5 • Medium — Gas Station (LeetCode 134)"
tags: ["leetcode", "greedy", "medium", "level-5"]
topic_tags: ["array", "greedy"]
difficulty: "Medium"
pattern: "Greedy"
level: 5
leetcode_id: 134
url: "https://leetcode.com/problems/gas-station/"
---

# 134. Gas Station

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Greedy</span> <span class="lc-pill lc-pill-level">Level 5</span> <a href="https://leetcode.com/problems/gas-station/" target="_blank">LeetCode 134 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho hai mảng <code>gas</code> và <code>cost</code> với <code>gas[i]</code> là xăng nhận tại trạm <code>i</code> và <code>cost[i]</code> là xăng cần để đi tới trạm <code>i+1</code>, hãy tìm chỉ số trạm bắt đầu để đi vòng hết, nếu không thể trả về <code>-1</code>.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> gas = [1,2,3,4,5], cost = [3,4,5,1,2]
<strong>Đầu ra:</strong> 3
<strong>Giải thích:</strong>
Start at station 3 (index 3) and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
Travel to station 4. Your tank = 4 - 1 + 5 = 8
Travel to station 0. Your tank = 8 - 2 + 1 = 7
Travel to station 1. Your tank = 7 - 3 + 2 = 6
Travel to station 2. Your tank = 6 - 4 + 3 = 5
Travel to station 3. The cost is 5. Your gas is just enough to travel back to station 3.
Therefore, return 3 as the starting index.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> gas = [2,3,4], cost = [3,4,3]
<strong>Đầu ra:</strong> -1
<strong>Giải thích:</strong>
You can&#39;t start at station 0 or 1, as there is not enough gas to travel to the next station.
Let&#39;s start at station 2 and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
Travel to station 0. Your tank = 4 - 3 + 2 = 3
Travel to station 1. Your tank = 3 - 3 + 3 = 3
You cannot travel back to station 2, as it requires 4 unit of gas but you only have 3.
Therefore, you can&#39;t travel around the circuit once no matter where you start.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>n == gas.length == cost.length</code></li>
	<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>
	<li><code>0 &lt;= gas[i], cost[i] &lt;= 10<sup>4</sup></code></li>
	<li>The input is generated such that the answer is unique.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Greedy**.

## 💻 Code 5 ngôn ngữ

```cpp
// Gas Station - C++
class Solution {}
```

```java
// Gas Station - Java
class Solution {}
```

```kotlin
// Gas Station - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Gas Station - Swift
func solve() -> Int { return 0 }
```

```dart
// Gas Station - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
