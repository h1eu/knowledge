---
title: "72. Edit Distance"
slug: "lc-0072-edit-distance"
summary: "2D DP • Level 5 • Hard — Edit Distance (LeetCode 72)"
tags: ["leetcode", "2d-dp", "hard", "level-5"]
topic_tags: ["string", "dynamic-programming"]
difficulty: "Hard"
pattern: "2D DP"
level: 5
leetcode_id: 72
url: "https://leetcode.com/problems/edit-distance/"
---

# 72. Edit Distance

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-hard">Hard</span> <span class="lc-pill lc-pill-pattern">2D DP</span> <span class="lc-pill lc-pill-level">Level 5</span> <a href="https://leetcode.com/problems/edit-distance/" target="_blank">LeetCode 72 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho hai chuỗi <code>word1</code> và <code>word2</code>, hãy tìm số thao tác ít nhất để biến <code>word1</code> thành <code>word2</code> (chèn, xóa, thay thế).</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> word1 = &quot;horse&quot;, word2 = &quot;ros&quot;
<strong>Đầu ra:</strong> 3
<strong>Giải thích:</strong> 
horse -&gt; rorse (replace &#39;h&#39; with &#39;r&#39;)
rorse -&gt; rose (remove &#39;r&#39;)
rose -&gt; ros (remove &#39;e&#39;)
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> word1 = &quot;intention&quot;, word2 = &quot;execution&quot;
<strong>Đầu ra:</strong> 5
<strong>Giải thích:</strong> 
intention -&gt; inention (remove &#39;t&#39;)
inention -&gt; enention (replace &#39;i&#39; with &#39;e&#39;)
enention -&gt; exention (replace &#39;n&#39; with &#39;x&#39;)
exention -&gt; exection (replace &#39;n&#39; with &#39;c&#39;)
exection -&gt; execution (insert &#39;u&#39;)
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>0 &lt;= word1.length, word2.length &lt;= 500</code></li>
	<li><code>word1</code> and <code>word2</code> consist of lowercase English letters.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **2D DP**.

## 💻 Code 5 ngôn ngữ

```cpp
// Edit Distance - C++
class Solution {}
```

```java
// Edit Distance - Java
class Solution {}
```

```kotlin
// Edit Distance - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Edit Distance - Swift
func solve() -> Int { return 0 }
```

```dart
// Edit Distance - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
