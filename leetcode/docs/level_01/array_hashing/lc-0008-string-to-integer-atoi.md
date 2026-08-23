---
title: "8. String to Integer (atoi)"
slug: "lc-0008-string-to-integer-atoi"
summary: "Array & Hashing • Level 1 • Medium — String to Integer (atoi) (LeetCode 8)"
tags: ["leetcode", "array-hashing", "medium", "level-1"]
topic_tags: ["string"]
difficulty: "Medium"
pattern: "Array & Hashing"
level: 1
leetcode_id: 8
url: "https://leetcode.com/problems/string-to-integer-atoi/"
---

# 8. String to Integer (atoi)

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Array & Hashing</span> <span class="lc-pill lc-pill-level">Level 1</span> <a href="https://leetcode.com/problems/string-to-integer-atoi/" target="_blank">LeetCode 8 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Hiện thực hàm <code>myAtoi(string s)</code> chuyển chuỗi thành số nguyên 32-bit có dấu.</p>

<p>Thuật toán:</p>
<ol>
	<li>Bỏ qua khoảng trắng đầu.</li>
	<li>Xác định dấu bằng ký tự <code>'-'</code> hoặc <code>'+'</code> (mặc định dương nếu không có).</li>
	<li>Đọc số nguyên bằng cách bỏ qua số 0 đầu cho tới khi gặp ký tự không phải chữ số; chuyển các chữ số này thành số nguyên.</li>
	<li>Nếu vượt ngoài <code>[-2<sup>31</sup>, 2<sup>31</sup>-1]</code> thì kẹp (clamp) trong khoảng.</li>
</ol>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<div class="example-block">
<p><strong>Đầu vào:</strong> <span class="example-io">s = &quot;42&quot;</span></p>

<p><strong>Đầu ra:</strong> <span class="example-io">42</span></p>

<p><strong>Giải thích:</strong></p>

<pre>
The underlined characters are what is read in and the caret is the current reader position.
Step 1: &quot;42&quot; (no characters read because there is no leading whitespace)
         ^
Step 2: &quot;42&quot; (no characters read because there is neither a &#39;-&#39; nor &#39;+&#39;)
         ^
Step 3: &quot;<u>42</u>&quot; (&quot;42&quot; is read in)
           ^
</pre>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = &quot; -042&quot;</span></p>

<p><strong>Output:</strong> <span class="example-io">-42</span></p>

<p><strong>Explanation:</strong></p>

<pre>
Step 1: &quot;<u>   </u>-042&quot; (leading whitespace is read and ignored)
            ^
Step 2: &quot;   <u>-</u>042&quot; (&#39;-&#39; is read, so the result should be negative)
             ^
Step 3: &quot;   -<u>042</u>&quot; (&quot;042&quot; is read in, leading zeros ignored in the result)
               ^
</pre>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = &quot;1337c0d3&quot;</span></p>

<p><strong>Output:</strong> <span class="example-io">1337</span></p>

<p><strong>Explanation:</strong></p>

<pre>
Step 1: &quot;1337c0d3&quot; (no characters read because there is no leading whitespace)
         ^
Step 2: &quot;1337c0d3&quot; (no characters read because there is neither a &#39;-&#39; nor &#39;+&#39;)
         ^
Step 3: &quot;<u>1337</u>c0d3&quot; (&quot;1337&quot; is read in; reading stops because the next character is a non-digit)
             ^
</pre>
</div>

<p><strong class="example">Example 4:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = &quot;0-1&quot;</span></p>

<p><strong>Output:</strong> <span class="example-io">0</span></p>

<p><strong>Explanation:</strong></p>

<pre>
Step 1: &quot;0-1&quot; (no characters read because there is no leading whitespace)
         ^
Step 2: &quot;0-1&quot; (no characters read because there is neither a &#39;-&#39; nor &#39;+&#39;)
         ^
Step 3: &quot;<u>0</u>-1&quot; (&quot;0&quot; is read in; reading stops because the next character is a non-digit)
          ^
</pre>
</div>

<p><strong class="example">Example 5:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = &quot;words and 987&quot;</span></p>

<p><strong>Output:</strong> <span class="example-io">0</span></p>

<p><strong>Explanation:</strong></p>

<p>Reading stops at the first non-digit character &#39;w&#39;.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>0 &lt;= s.length &lt;= 200</code></li>
	<li><code>s</code> consists of English letters (lower-case and upper-case), digits (<code>0-9</code>), <code>&#39; &#39;</code>, <code>&#39;+&#39;</code>, <code>&#39;-&#39;</code>, and <code>&#39;.&#39;</code>.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Array & Hashing**.

## 💻 Code 5 ngôn ngữ

```cpp
// String to Integer (atoi) - C++
class Solution {}
```

```java
// String to Integer (atoi) - Java
class Solution {}
```

```kotlin
// String to Integer (atoi) - Kotlin
fun solve(): Int { return 0 }
```

```swift
// String to Integer (atoi) - Swift
func solve() -> Int { return 0 }
```

```dart
// String to Integer (atoi) - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
