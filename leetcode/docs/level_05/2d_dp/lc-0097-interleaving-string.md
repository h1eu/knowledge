---
title: "97. Interleaving String"
slug: "lc-0097-interleaving-string"
summary: "2D DP • Level 5 • Medium — Interleaving String (LeetCode 97)"
tags: ["leetcode", "2d-dp", "medium", "level-5"]
topic_tags: ["string", "dynamic-programming"]
difficulty: "Medium"
pattern: "2D DP"
level: 5
leetcode_id: 97
url: "https://leetcode.com/problems/interleaving-string/"
---

# 97. Interleaving String

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">2D DP</span> <span class="lc-pill lc-pill-level">Level 5</span> <a href="https://leetcode.com/problems/interleaving-string/" target="_blank">LeetCode 97 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho ba chuỗi <code>s1, s2, s3</code>, hãy xác định <code>s3</code> có được tạo bằng cách xen kẽ <code>s1</code> và <code>s2</code> không (giữ nguyên thứ tự trong mỗi chuỗi).</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/09/02/interleave.jpg" style="width: 561px; height: 203px;" />
<pre>
<strong>Đầu vào:</strong> s1 = &quot;aabcc&quot;, s2 = &quot;dbbca&quot;, s3 = &quot;aadbbcbcac&quot;
<strong>Đầu ra:</strong> true
<strong>Giải thích:</strong> One way to obtain s3 is:
Split s1 into s1 = &quot;aa&quot; + &quot;bc&quot; + &quot;c&quot;, and s2 into s2 = &quot;dbbc&quot; + &quot;a&quot;.
Interleaving the two splits, we get &quot;aa&quot; + &quot;dbbc&quot; + &quot;bc&quot; + &quot;a&quot; + &quot;c&quot; = &quot;aadbbcbcac&quot;.
Since s3 can be obtained by interleaving s1 and s2, we return true.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> s1 = &quot;aabcc&quot;, s2 = &quot;dbbca&quot;, s3 = &quot;aadbbbaccc&quot;
<strong>Đầu ra:</strong> false
<strong>Giải thích:</strong> Notice how it is impossible to interleave s2 with any other string to obtain s3.
</pre>

<p><strong class="example">Ví dụ 3:</strong></p>

<pre>
<strong>Đầu vào:</strong> s1 = &quot;&quot;, s2 = &quot;&quot;, s3 = &quot;&quot;
<strong>Đầu ra:</strong> true
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>0 &lt;= s1.length, s2.length &lt;= 100</code></li>
	<li><code>0 &lt;= s3.length &lt;= 200</code></li>
	<li><code>s1</code>, <code>s2</code>, and <code>s3</code> consist of lowercase English letters.</li>
</ul>

<p>&nbsp;</p>
<p><strong>Yêu cầu mở rộng:</strong> Could you solve it using only <code>O(s2.length)</code> additional memory space?</p>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **2D DP**.

## 💻 Code 5 ngôn ngữ

```cpp
// Interleaving String - C++
class Solution {}
```

```java
// Interleaving String - Java
class Solution {}
```

```kotlin
// Interleaving String - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Interleaving String - Swift
func solve() -> Int { return 0 }
```

```dart
// Interleaving String - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
