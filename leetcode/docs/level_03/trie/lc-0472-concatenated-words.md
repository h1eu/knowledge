---
title: "472. Concatenated Words"
slug: "lc-0472-concatenated-words"
summary: "Trie • Level 3 • Hard — Concatenated Words (LeetCode 472)"
tags: ["leetcode", "trie", "hard", "level-3"]
topic_tags: ["array", "string", "dynamic-programming", "depth-first-search", "trie", "sorting"]
difficulty: "Hard"
pattern: "Trie"
level: 3
leetcode_id: 472
url: "https://leetcode.com/problems/concatenated-words/"
---

# 472. Concatenated Words

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-hard">Hard</span> <span class="lc-pill lc-pill-pattern">Trie</span> <span class="lc-pill lc-pill-level">Level 3</span> <a href="https://leetcode.com/problems/concatenated-words/" target="_blank">LeetCode 472 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho mảng chuỗi <code>words</code> không trùng, hãy trả về tất cả từ ghép (concatenated) — từ được tạo bằng cách nối ít nhất hai từ ngắn hơn khác trong mảng.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> words = [&quot;cat&quot;,&quot;cats&quot;,&quot;catsdogcats&quot;,&quot;dog&quot;,&quot;dogcatsdog&quot;,&quot;hippopotamuses&quot;,&quot;rat&quot;,&quot;ratcatdogcat&quot;]
<strong>Đầu ra:</strong> [&quot;catsdogcats&quot;,&quot;dogcatsdog&quot;,&quot;ratcatdogcat&quot;]
<strong>Giải thích:</strong> &quot;catsdogcats&quot; can be concatenated by &quot;cats&quot;, &quot;dog&quot; and &quot;cats&quot;; 
&quot;dogcatsdog&quot; can be concatenated by &quot;dog&quot;, &quot;cats&quot; and &quot;dog&quot;; 
&quot;ratcatdogcat&quot; can be concatenated by &quot;rat&quot;, &quot;cat&quot;, &quot;dog&quot; and &quot;cat&quot;.</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> words = [&quot;cat&quot;,&quot;dog&quot;,&quot;catdog&quot;]
<strong>Đầu ra:</strong> [&quot;catdog&quot;]
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= words.length &lt;= 10<sup>4</sup></code></li>
	<li><code>1 &lt;= words[i].length &lt;= 30</code></li>
	<li><code>words[i]</code> consists of only lowercase English letters.</li>
	<li>All the strings of <code>words</code> are <strong>unique</strong>.</li>
	<li><code>1 &lt;= sum(words[i].length) &lt;= 10<sup>5</sup></code></li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Trie**.

## 💻 Code 5 ngôn ngữ

```cpp
// Concatenated Words - C++
class Solution {}
```

```java
// Concatenated Words - Java
class Solution {}
```

```kotlin
// Concatenated Words - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Concatenated Words - Swift
func solve() -> Int { return 0 }
```

```dart
// Concatenated Words - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
