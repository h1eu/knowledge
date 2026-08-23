---
title: "139. Word Break"
slug: "lc-0139-word-break"
summary: "1D DP • Level 5 • Medium — Word Break (LeetCode 139)"
tags: ["leetcode", "1d-dp", "medium", "level-5"]
topic_tags: ["array", "hash-table", "string", "dynamic-programming", "trie", "memoization", "brute-force-search"]
difficulty: "Medium"
pattern: "1D DP"
level: 5
leetcode_id: 139
url: "https://leetcode.com/problems/word-break/"
---

# 139. Word Break

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">1D DP</span> <span class="lc-pill lc-pill-level">Level 5</span> <a href="https://leetcode.com/problems/word-break/" target="_blank">LeetCode 139 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho chuỗi <code>s</code> và từ điển <code>wordDict</code>, hãy xác định <code>s</code> có thể tách thành các từ trong từ điển không (có thể tái sử dụng từ).</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> s = &quot;leetcode&quot;, wordDict = [&quot;leet&quot;,&quot;code&quot;]
<strong>Đầu ra:</strong> true
<strong>Giải thích:</strong> Return true because &quot;leetcode&quot; can be segmented as &quot;leet code&quot;.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> s = &quot;applepenapple&quot;, wordDict = [&quot;apple&quot;,&quot;pen&quot;]
<strong>Đầu ra:</strong> true
<strong>Giải thích:</strong> Return true because &quot;applepenapple&quot; can be segmented as &quot;apple pen apple&quot;.
Note that you are allowed to reuse a dictionary word.
</pre>

<p><strong class="example">Ví dụ 3:</strong></p>

<pre>
<strong>Đầu vào:</strong> s = &quot;catsandog&quot;, wordDict = [&quot;cats&quot;,&quot;dog&quot;,&quot;sand&quot;,&quot;and&quot;,&quot;cat&quot;]
<strong>Đầu ra:</strong> false
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 300</code></li>
	<li><code>1 &lt;= wordDict.length &lt;= 1000</code></li>
	<li><code>1 &lt;= wordDict[i].length &lt;= 20</code></li>
	<li><code>s</code> and <code>wordDict[i]</code> consist of only lowercase English letters.</li>
	<li>All the strings of <code>wordDict</code> are <strong>unique</strong>.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **1D DP**.

## 💻 Code 5 ngôn ngữ

```cpp
// Word Break - C++
class Solution {}
```

```java
// Word Break - Java
class Solution {}
```

```kotlin
// Word Break - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Word Break - Swift
func solve() -> Int { return 0 }
```

```dart
// Word Break - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
