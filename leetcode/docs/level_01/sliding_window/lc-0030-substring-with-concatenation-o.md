---
title: "30. Substring with Concatenation of All Words"
slug: "lc-0030-substring-with-concatenation-o"
summary: "Sliding Window • Level 1 • Hard — Substring with Concatenation of All Words (LeetCode 30)"
tags: ["leetcode", "sliding-window", "hard", "level-1"]
topic_tags: ["hash-table", "string", "sliding-window"]
difficulty: "Hard"
pattern: "Sliding Window"
level: 1
leetcode_id: 30
url: "https://leetcode.com/problems/substring-with-concatenation-of-all-words/"
---

# 30. Substring with Concatenation of All Words

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-hard">Hard</span> <span class="lc-pill lc-pill-pattern">Sliding Window</span> <span class="lc-pill lc-pill-level">Level 1</span> <a href="https://leetcode.com/problems/substring-with-concatenation-of-all-words/" target="_blank">LeetCode 30 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho chuỗi <code>s</code> và mảng chuỗi <code>words</code> (các từ có độ dài bằng nhau). Hãy tìm tất cả chỉ số bắt đầu của chuỗi con trong <code>s</code> mà là sự nối (concatenation) của mỗi từ trong <code>words</code> đúng một lần, theo bất kỳ thứ tự nào và không có ký tự xen giữa.</p>

<p>Trả về các chỉ số theo bất kỳ thứ tự nào.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<div class="example-block">
<p><strong>Đầu vào:</strong> <span class="example-io">s = &quot;barfoothefoobarman&quot;, words = [&quot;foo&quot;,&quot;bar&quot;]</span></p>

<p><strong>Đầu ra:</strong> <span class="example-io">[0,9]</span></p>

<p><strong>Giải thích:</strong></p>

<p>The substring starting at 0 is <code>&quot;barfoo&quot;</code>. It is the concatenation of <code>[&quot;bar&quot;,&quot;foo&quot;]</code> which is a permutation of <code>words</code>.<br />
The substring starting at 9 is <code>&quot;foobar&quot;</code>. It is the concatenation of <code>[&quot;foo&quot;,&quot;bar&quot;]</code> which is a permutation of <code>words</code>.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = &quot;wordgoodgoodgoodbestword&quot;, words = [&quot;word&quot;,&quot;good&quot;,&quot;best&quot;,&quot;word&quot;]</span></p>

<p><strong>Output:</strong> <span class="example-io">[]</span></p>

<p><strong>Explanation:</strong></p>

<p>There is no concatenated substring.</p>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = &quot;barfoofoobarthefoobarman&quot;, words = [&quot;bar&quot;,&quot;foo&quot;,&quot;the&quot;]</span></p>

<p><strong>Output:</strong> <span class="example-io">[6,9,12]</span></p>

<p><strong>Explanation:</strong></p>

<p>The substring starting at 6 is <code>&quot;foobarthe&quot;</code>. It is the concatenation of <code>[&quot;foo&quot;,&quot;bar&quot;,&quot;the&quot;]</code>.<br />
The substring starting at 9 is <code>&quot;barthefoo&quot;</code>. It is the concatenation of <code>[&quot;bar&quot;,&quot;the&quot;,&quot;foo&quot;]</code>.<br />
The substring starting at 12 is <code>&quot;thefoobar&quot;</code>. It is the concatenation of <code>[&quot;the&quot;,&quot;foo&quot;,&quot;bar&quot;]</code>.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 10<sup>4</sup></code></li>
	<li><code>1 &lt;= words.length &lt;= 5000</code></li>
	<li><code>1 &lt;= words[i].length &lt;= 30</code></li>
	<li><code>s</code> and <code>words[i]</code> consist of lowercase English letters.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Sliding Window**.

## 💻 Code 5 ngôn ngữ

```cpp
// Substring with Concatenation - C++
class Solution {}
```

```java
// Substring with Concatenation - Java
class Solution {}
```

```kotlin
// Substring with Concatenation - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Substring with Concatenation - Swift
func solve() -> Int { return 0 }
```

```dart
// Substring with Concatenation - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
