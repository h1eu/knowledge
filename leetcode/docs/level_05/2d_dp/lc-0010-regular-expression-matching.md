---
title: "10. Regular Expression Matching"
slug: "lc-0010-regular-expression-matching"
summary: "2D DP • Level 5 • Hard — Regular Expression Matching (LeetCode 10)"
tags: ["leetcode", "2d-dp", "hard", "level-5"]
topic_tags: ["string", "dynamic-programming", "recursion"]
difficulty: "Hard"
pattern: "2D DP"
level: 5
leetcode_id: 10
url: "https://leetcode.com/problems/regular-expression-matching/"
---

# 10. Regular Expression Matching

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-hard">Hard</span> <span class="lc-pill lc-pill-pattern">2D DP</span> <span class="lc-pill lc-pill-level">Level 5</span> <a href="https://leetcode.com/problems/regular-expression-matching/" target="_blank">LeetCode 10 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho chuỗi <code>s</code> và mẫu <code>p</code> với <code>'.'</code> khớp bất kỳ ký tự đơn và <code>'*'</code> khớp 0 hoặc nhiều ký tự trước, hãy xác định <code>p</code> có khớp toàn bộ <code>s</code> không.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> s = &quot;aa&quot;, p = &quot;a&quot;
<strong>Đầu ra:</strong> false
<strong>Giải thích:</strong> &quot;a&quot; does not match the entire string &quot;aa&quot;.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> s = &quot;aa&quot;, p = &quot;a*&quot;
<strong>Đầu ra:</strong> true
<strong>Giải thích:</strong> &#39;*&#39; means zero or more of the preceding element, &#39;a&#39;. Therefore, by repeating &#39;a&#39; once, it becomes &quot;aa&quot;.
</pre>

<p><strong class="example">Ví dụ 3:</strong></p>

<pre>
<strong>Đầu vào:</strong> s = &quot;ab&quot;, p = &quot;.*&quot;
<strong>Đầu ra:</strong> true
<strong>Giải thích:</strong> &quot;.*&quot; means &quot;zero or more (*) of any character (.)&quot;.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= s.length&nbsp;&lt;= 20</code></li>
	<li><code>1 &lt;= p.length&nbsp;&lt;= 20</code></li>
	<li><code>s</code> contains only lowercase English letters.</li>
	<li><code>p</code> contains only lowercase English letters, <code>&#39;.&#39;</code>, and&nbsp;<code>&#39;*&#39;</code>.</li>
	<li>It is guaranteed for each appearance of the character <code>&#39;*&#39;</code>, there will be a previous valid character to match.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **2D DP**.

## 💻 Code 5 ngôn ngữ

```cpp
// Regular Expression Matching - C++
class Solution {}
```

```java
// Regular Expression Matching - Java
class Solution {}
```

```kotlin
// Regular Expression Matching - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Regular Expression Matching - Swift
func solve() -> Int { return 0 }
```

```dart
// Regular Expression Matching - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
