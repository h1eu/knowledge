---
title: "150. Evaluate Reverse Polish Notation"
slug: "lc-0150-evaluate-reverse-polish-notati"
summary: "Stack • Level 1 • Medium — Evaluate Reverse Polish Notation (LeetCode 150)"
tags: ["leetcode", "stack", "medium", "level-1"]
topic_tags: ["array", "math", "stack"]
difficulty: "Medium"
pattern: "Stack"
level: 1
leetcode_id: 150
url: "https://leetcode.com/problems/evaluate-reverse-polish-notation/"
---

# 150. Evaluate Reverse Polish Notation

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Stack</span> <span class="lc-pill lc-pill-level">Level 1</span> <a href="https://leetcode.com/problems/evaluate-reverse-polish-notation/" target="_blank">LeetCode 150 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho mảng chuỗi <code>tokens</code> biểu diễn biểu thức toán học ở ký pháp Ba Lan ngược (Reverse Polish Notation). Hãy tính giá trị biểu thức.</p>

<p><em>Lưu ý:</em> Phép chia giữa hai số nguyên sẽ làm tròn về 0, các toán tử hợp lệ là <code>+ - * /</code>, mỗi toán hạng là số nguyên.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> tokens = [&quot;2&quot;,&quot;1&quot;,&quot;+&quot;,&quot;3&quot;,&quot;*&quot;]
<strong>Đầu ra:</strong> 9
<strong>Giải thích:</strong> ((2 + 1) * 3) = 9
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> tokens = [&quot;4&quot;,&quot;13&quot;,&quot;5&quot;,&quot;/&quot;,&quot;+&quot;]
<strong>Đầu ra:</strong> 6
<strong>Giải thích:</strong> (4 + (13 / 5)) = 6
</pre>

<p><strong class="example">Ví dụ 3:</strong></p>

<pre>
<strong>Đầu vào:</strong> tokens = [&quot;10&quot;,&quot;6&quot;,&quot;9&quot;,&quot;3&quot;,&quot;+&quot;,&quot;-11&quot;,&quot;*&quot;,&quot;/&quot;,&quot;*&quot;,&quot;17&quot;,&quot;+&quot;,&quot;5&quot;,&quot;+&quot;]
<strong>Đầu ra:</strong> 22
<strong>Giải thích:</strong> ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
= ((10 * (6 / (12 * -11))) + 17) + 5
= ((10 * (6 / -132)) + 17) + 5
= ((10 * 0) + 17) + 5
= (0 + 17) + 5
= 17 + 5
= 22
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= tokens.length &lt;= 10<sup>4</sup></code></li>
	<li><code>tokens[i]</code> is either an operator: <code>&quot;+&quot;</code>, <code>&quot;-&quot;</code>, <code>&quot;*&quot;</code>, or <code>&quot;/&quot;</code>, or an integer in the range <code>[-200, 200]</code>.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Stack**.

## 💻 Code 5 ngôn ngữ

```cpp
// Evaluate Reverse Polish Notation - C++
class Solution {}
```

```java
// Evaluate Reverse Polish Notation - Java
class Solution {}
```

```kotlin
// Evaluate Reverse Polish Notation - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Evaluate Reverse Polish Notation - Swift
func solve() -> Int { return 0 }
```

```dart
// Evaluate Reverse Polish Notation - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
