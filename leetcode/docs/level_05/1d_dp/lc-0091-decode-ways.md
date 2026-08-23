---
title: "91. Decode Ways"
slug: "lc-0091-decode-ways"
summary: "1D DP • Level 5 • Medium — Decode Ways (LeetCode 91)"
tags: ["leetcode", "1d-dp", "medium", "level-5"]
topic_tags: ["string", "dynamic-programming"]
difficulty: "Medium"
pattern: "1D DP"
level: 5
leetcode_id: 91
url: "https://leetcode.com/problems/decode-ways/"
---

# 91. Decode Ways

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">1D DP</span> <span class="lc-pill lc-pill-level">Level 5</span> <a href="https://leetcode.com/problems/decode-ways/" target="_blank">LeetCode 91 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho chuỗi chỉ chứa chữ số <code>s</code>, mỗi số <code>1-26</code> ánh xạ tới <code>A-Z</code>. Hãy đếm số cách giải mã <code>s</code>.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<div class="example-block">
<p><strong>Đầu vào:</strong> <span class="example-io">s = &quot;12&quot;</span></p>

<p><strong>Đầu ra:</strong> <span class="example-io">2</span></p>

<p><strong>Giải thích:</strong></p>

<p>&quot;12&quot; could be decoded as &quot;AB&quot; (1 2) or &quot;L&quot; (12).</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = &quot;226&quot;</span></p>

<p><strong>Output:</strong> <span class="example-io">3</span></p>

<p><strong>Explanation:</strong></p>

<p>&quot;226&quot; could be decoded as &quot;BZ&quot; (2 26), &quot;VF&quot; (22 6), or &quot;BBF&quot; (2 2 6).</p>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = &quot;06&quot;</span></p>

<p><strong>Output:</strong> <span class="example-io">0</span></p>

<p><strong>Explanation:</strong></p>

<p>&quot;06&quot; cannot be mapped to &quot;F&quot; because of the leading zero (&quot;6&quot; is different from &quot;06&quot;). In this case, the string is not a valid encoding, so return 0.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 100</code></li>
	<li><code>s</code> contains only digits and may contain leading zero(s).</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **1D DP**.

## 💻 Code 5 ngôn ngữ

```cpp
// Decode Ways - C++
class Solution {}
```

```java
// Decode Ways - Java
class Solution {}
```

```kotlin
// Decode Ways - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Decode Ways - Swift
func solve() -> Int { return 0 }
```

```dart
// Decode Ways - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
