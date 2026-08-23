---
title: "682. Baseball Game"
slug: "lc-0682-baseball-game"
summary: "Stack • Level 1 • Easy — Baseball Game (LeetCode 682)"
tags: ["leetcode", "stack", "easy", "level-1"]
topic_tags: ["array", "stack", "simulation"]
difficulty: "Easy"
pattern: "Stack"
level: 1
leetcode_id: 682
url: "https://leetcode.com/problems/baseball-game/"
---

# 682. Baseball Game

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-easy">Easy</span> <span class="lc-pill lc-pill-pattern">Stack</span> <span class="lc-pill lc-pill-level">Level 1</span> <a href="https://leetcode.com/problems/baseball-game/" target="_blank">LeetCode 682 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Bạn ghi điểm cho trận bóng chày với các thao tác:</p>
<ul>
	<li>Số nguyên <code>x</code>: ghi điểm mới <code>x</code>.</li>
	<li><code>"+"</code>: ghi điểm mới bằng tổng hai điểm trước.</li>
	<li><code>"D"</code>: ghi điểm mới bằng gấp đôi điểm trước.</li>
	<li><code>"C"</code>: hủy điểm trước.</li>
</ul>

<p>Cho danh sách thao tác <code>ops</code>, hãy trả về tổng điểm sau khi thực hiện hết.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> ops = [&quot;5&quot;,&quot;2&quot;,&quot;C&quot;,&quot;D&quot;,&quot;+&quot;]
<strong>Đầu ra:</strong> 30
<strong>Giải thích:</strong>
&quot;5&quot; - Add 5 to the record, record is now [5].
&quot;2&quot; - Add 2 to the record, record is now [5, 2].
&quot;C&quot; - Invalidate and remove the previous score, record is now [5].
&quot;D&quot; - Add 2 * 5 = 10 to the record, record is now [5, 10].
&quot;+&quot; - Add 5 + 10 = 15 to the record, record is now [5, 10, 15].
The total sum is 5 + 10 + 15 = 30.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> ops = [&quot;5&quot;,&quot;-2&quot;,&quot;4&quot;,&quot;C&quot;,&quot;D&quot;,&quot;9&quot;,&quot;+&quot;,&quot;+&quot;]
<strong>Đầu ra:</strong> 27
<strong>Giải thích:</strong>
&quot;5&quot; - Add 5 to the record, record is now [5].
&quot;-2&quot; - Add -2 to the record, record is now [5, -2].
&quot;4&quot; - Add 4 to the record, record is now [5, -2, 4].
&quot;C&quot; - Invalidate and remove the previous score, record is now [5, -2].
&quot;D&quot; - Add 2 * -2 = -4 to the record, record is now [5, -2, -4].
&quot;9&quot; - Add 9 to the record, record is now [5, -2, -4, 9].
&quot;+&quot; - Add -4 + 9 = 5 to the record, record is now [5, -2, -4, 9, 5].
&quot;+&quot; - Add 9 + 5 = 14 to the record, record is now [5, -2, -4, 9, 5, 14].
The total sum is 5 + -2 + -4 + 9 + 5 + 14 = 27.
</pre>

<p><strong class="example">Ví dụ 3:</strong></p>

<pre>
<strong>Đầu vào:</strong> ops = [&quot;1&quot;,&quot;C&quot;]
<strong>Đầu ra:</strong> 0
<strong>Giải thích:</strong>
&quot;1&quot; - Add 1 to the record, record is now [1].
&quot;C&quot; - Invalidate and remove the previous score, record is now [].
Since the record is empty, the total sum is 0.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= operations.length &lt;= 1000</code></li>
	<li><code>operations[i]</code> is <code>&quot;C&quot;</code>, <code>&quot;D&quot;</code>, <code>&quot;+&quot;</code>, or a string representing an integer in the range <code>[-3 * 10<sup>4</sup>, 3 * 10<sup>4</sup>]</code>.</li>
	<li>For operation <code>&quot;+&quot;</code>, there will always be at least two previous scores on the record.</li>
	<li>For operations <code>&quot;C&quot;</code> and <code>&quot;D&quot;</code>, there will always be at least one previous score on the record.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Stack**.

## 💻 Code 5 ngôn ngữ

```cpp
// Baseball Game - C++
class Solution {}
```

```java
// Baseball Game - Java
class Solution {}
```

```kotlin
// Baseball Game - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Baseball Game - Swift
func solve() -> Int { return 0 }
```

```dart
// Baseball Game - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
