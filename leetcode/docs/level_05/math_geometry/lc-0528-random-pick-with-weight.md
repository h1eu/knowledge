---
title: "528. Random Pick with Weight"
slug: "lc-0528-random-pick-with-weight"
summary: "Math & Geometry • Level 5 • Medium — Random Pick with Weight (LeetCode 528)"
tags: ["leetcode", "math-geometry", "medium", "level-5"]
topic_tags: ["array", "math", "binary-search", "prefix-sum", "randomized"]
difficulty: "Medium"
pattern: "Math & Geometry"
level: 5
leetcode_id: 528
url: "https://leetcode.com/problems/random-pick-with-weight/"
---

# 528. Random Pick with Weight

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Math & Geometry</span> <span class="lc-pill lc-pill-level">Level 5</span> <a href="https://leetcode.com/problems/random-pick-with-weight/" target="_blank">LeetCode 528 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho mảng trọng số <code>w</code>, hãy thiết kế <code>pickIndex()</code> chọn chỉ số với xác suất tỉ lệ với trọng số.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào</strong>
[&quot;Solution&quot;,&quot;pickIndex&quot;]
[[[1]],[]]
<strong>Đầu ra</strong>
[null,0]

<strong>Giải thích</strong>
Solution solution = new Solution([1]);
solution.pickIndex(); // return 0. The only option is to return 0 since there is only one element in w.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào</strong>
[&quot;Solution&quot;,&quot;pickIndex&quot;,&quot;pickIndex&quot;,&quot;pickIndex&quot;,&quot;pickIndex&quot;,&quot;pickIndex&quot;]
[[[1,3]],[],[],[],[],[]]
<strong>Đầu ra</strong>
[null,1,1,1,1,0]

<strong>Giải thích</strong>
Solution solution = new Solution([1, 3]);
solution.pickIndex(); // return 1. It is returning the second element (index = 1) that has a probability of 3/4.
solution.pickIndex(); // return 1
solution.pickIndex(); // return 1
solution.pickIndex(); // return 1
solution.pickIndex(); // return 0. It is returning the first element (index = 0) that has a probability of 1/4.

Since this is a randomization problem, multiple answers are allowed.
All of the following outputs can be considered correct:
[null,1,1,1,1,0]
[null,1,1,1,1,1]
[null,1,1,1,0,0]
[null,1,1,1,0,1]
[null,1,0,1,0,0]
......
and so on.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= w.length &lt;= 10<sup>4</sup></code></li>
	<li><code>1 &lt;= w[i] &lt;= 10<sup>5</sup></code></li>
	<li><code>pickIndex</code> will be called at most <code>10<sup>4</sup></code> times.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Math & Geometry**.

## 💻 Code 5 ngôn ngữ

```cpp
// Random Pick with Weight - C++
class Solution {}
```

```java
// Random Pick with Weight - Java
class Solution {}
```

```kotlin
// Random Pick with Weight - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Random Pick with Weight - Swift
func solve() -> Int { return 0 }
```

```dart
// Random Pick with Weight - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
