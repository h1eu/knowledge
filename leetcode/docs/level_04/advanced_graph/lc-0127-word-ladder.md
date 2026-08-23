---
title: "127. Word Ladder"
slug: "lc-0127-word-ladder"
summary: "Advanced Graph • Level 4 • Hard — Word Ladder (LeetCode 127)"
tags: ["leetcode", "advanced-graph", "hard", "level-4"]
topic_tags: ["hash-table", "string", "breadth-first-search", "bidirectional-search"]
difficulty: "Hard"
pattern: "Advanced Graph"
level: 4
leetcode_id: 127
url: "https://leetcode.com/problems/word-ladder/"
---

# 127. Word Ladder

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-hard">Hard</span> <span class="lc-pill lc-pill-pattern">Advanced Graph</span> <span class="lc-pill lc-pill-level">Level 4</span> <a href="https://leetcode.com/problems/word-ladder/" target="_blank">LeetCode 127 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho hai từ <code>beginWord</code>, <code>endWord</code> và từ điển <code>wordList</code>, hãy trả về độ dài dãy biến đổi ngắn nhất từ <code>beginWord</code> tới <code>endWord</code> (mỗi bước đổi một ký tự, từ trung gian phải trong <code>wordList</code>). Nếu không thể, trả về <code>0</code>.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> beginWord = &quot;hit&quot;, endWord = &quot;cog&quot;, wordList = [&quot;hot&quot;,&quot;dot&quot;,&quot;dog&quot;,&quot;lot&quot;,&quot;log&quot;,&quot;cog&quot;]
<strong>Đầu ra:</strong> 5
<strong>Giải thích:</strong> One shortest transformation sequence is &quot;hit&quot; -&gt; &quot;hot&quot; -&gt; &quot;dot&quot; -&gt; &quot;dog&quot; -&gt; cog&quot;, which is 5 words long.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> beginWord = &quot;hit&quot;, endWord = &quot;cog&quot;, wordList = [&quot;hot&quot;,&quot;dot&quot;,&quot;dog&quot;,&quot;lot&quot;,&quot;log&quot;]
<strong>Đầu ra:</strong> 0
<strong>Giải thích:</strong> The endWord &quot;cog&quot; is not in wordList, therefore there is no valid transformation sequence.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= beginWord.length &lt;= 10</code></li>
	<li><code>endWord.length == beginWord.length</code></li>
	<li><code>1 &lt;= wordList.length &lt;= 5000</code></li>
	<li><code>wordList[i].length == beginWord.length</code></li>
	<li><code>beginWord</code>, <code>endWord</code>, and <code>wordList[i]</code> consist of lowercase English letters.</li>
	<li><code>beginWord != endWord</code></li>
	<li>All the words in <code>wordList</code> are <strong>unique</strong>.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Advanced Graph**.

## 💻 Code 5 ngôn ngữ

```cpp
// Word Ladder - C++
class Solution {}
```

```java
// Word Ladder - Java
class Solution {}
```

```kotlin
// Word Ladder - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Word Ladder - Swift
func solve() -> Int { return 0 }
```

```dart
// Word Ladder - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
