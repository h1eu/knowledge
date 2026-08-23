---
title: "126. Word Ladder II"
slug: "lc-0126-word-ladder-ii"
summary: "Advanced Graph • Level 4 • Hard — Word Ladder II (LeetCode 126)"
tags: ["leetcode", "advanced-graph", "hard", "level-4"]
topic_tags: ["hash-table", "string", "backtracking", "breadth-first-search", "bidirectional-search"]
difficulty: "Hard"
pattern: "Advanced Graph"
level: 4
leetcode_id: 126
url: "https://leetcode.com/problems/word-ladder-ii/"
---

# 126. Word Ladder II

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-hard">Hard</span> <span class="lc-pill lc-pill-pattern">Advanced Graph</span> <span class="lc-pill lc-pill-level">Level 4</span> <a href="https://leetcode.com/problems/word-ladder-ii/" target="_blank">LeetCode 126 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho hai từ <code>beginWord</code> và <code>endWord</code> và từ điển <code>wordList</code>, hãy tìm <strong>tất cả</strong> các dãy biến đổi ngắn nhất từ <code>beginWord</code> tới <code>endWord</code>, mỗi bước chỉ đổi một ký tự và mỗi từ trung gian phải nằm trong <code>wordList</code>.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> beginWord = &quot;hit&quot;, endWord = &quot;cog&quot;, wordList = [&quot;hot&quot;,&quot;dot&quot;,&quot;dog&quot;,&quot;lot&quot;,&quot;log&quot;,&quot;cog&quot;]
<strong>Đầu ra:</strong> [[&quot;hit&quot;,&quot;hot&quot;,&quot;dot&quot;,&quot;dog&quot;,&quot;cog&quot;],[&quot;hit&quot;,&quot;hot&quot;,&quot;lot&quot;,&quot;log&quot;,&quot;cog&quot;]]
<strong>Giải thích:</strong>&nbsp;There are 2 shortest transformation sequences:
&quot;hit&quot; -&gt; &quot;hot&quot; -&gt; &quot;dot&quot; -&gt; &quot;dog&quot; -&gt; &quot;cog&quot;
&quot;hit&quot; -&gt; &quot;hot&quot; -&gt; &quot;lot&quot; -&gt; &quot;log&quot; -&gt; &quot;cog&quot;
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> beginWord = &quot;hit&quot;, endWord = &quot;cog&quot;, wordList = [&quot;hot&quot;,&quot;dot&quot;,&quot;dog&quot;,&quot;lot&quot;,&quot;log&quot;]
<strong>Đầu ra:</strong> []
<strong>Giải thích:</strong> The endWord &quot;cog&quot; is not in wordList, therefore there is no valid transformation sequence.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= beginWord.length &lt;= 5</code></li>
	<li><code>endWord.length == beginWord.length</code></li>
	<li><code>1 &lt;= wordList.length &lt;= 500</code></li>
	<li><code>wordList[i].length == beginWord.length</code></li>
	<li><code>beginWord</code>, <code>endWord</code>, and <code>wordList[i]</code> consist of lowercase English letters.</li>
	<li><code>beginWord != endWord</code></li>
	<li>All the words in <code>wordList</code> are <strong>unique</strong>.</li>
	<li>The <strong>sum</strong> of all shortest transformation sequences does not exceed <code>10<sup>5</sup></code>.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Advanced Graph**.

## 💻 Code 5 ngôn ngữ

```cpp
// Word Ladder II - C++
class Solution {}
```

```java
// Word Ladder II - Java
class Solution {}
```

```kotlin
// Word Ladder II - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Word Ladder II - Swift
func solve() -> Int { return 0 }
```

```dart
// Word Ladder II - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
