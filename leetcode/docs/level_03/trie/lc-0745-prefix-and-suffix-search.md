---
title: "745. Prefix and Suffix Search"
slug: "lc-0745-prefix-and-suffix-search"
summary: "Trie • Level 3 • Hard — Prefix and Suffix Search (LeetCode 745)"
tags: ["leetcode", "trie", "hard", "level-3"]
topic_tags: ["array", "hash-table", "string", "design", "trie"]
difficulty: "Hard"
pattern: "Trie"
level: 3
leetcode_id: 745
url: "https://leetcode.com/problems/prefix-and-suffix-search/"
---

# 745. Prefix and Suffix Search

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-hard">Hard</span> <span class="lc-pill lc-pill-pattern">Trie</span> <span class="lc-pill lc-pill-level">Level 3</span> <a href="https://leetcode.com/problems/prefix-and-suffix-search/" target="_blank">LeetCode 745 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Thiết kế <code>WordFilter</code> với <code>WordFilter(words)</code> và <code>f(prefix, suffix)</code> trả về chỉ số lớn nhất của từ có tiền tố <code>prefix</code> và hậu tố <code>suffix</code>, nếu không có thì <code>-1</code>.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào</strong>
[&quot;WordFilter&quot;, &quot;f&quot;]
[[[&quot;apple&quot;]], [&quot;a&quot;, &quot;e&quot;]]
<strong>Đầu ra</strong>
[null, 0]
<strong>Giải thích</strong>
WordFilter wordFilter = new WordFilter([&quot;apple&quot;]);
wordFilter.f(&quot;a&quot;, &quot;e&quot;); // return 0, because the word at index 0 has prefix = &quot;a&quot; and suffix = &quot;e&quot;.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= words.length &lt;= 10<sup>4</sup></code></li>
	<li><code>1 &lt;= words[i].length &lt;= 7</code></li>
	<li><code>1 &lt;= pref.length, suff.length &lt;= 7</code></li>
	<li><code>words[i]</code>, <code>pref</code> and <code>suff</code> consist of lowercase English letters only.</li>
	<li>At most <code>10<sup>4</sup></code> calls will be made to the function <code>f</code>.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Trie**.

## 💻 Code 5 ngôn ngữ

```cpp
// Prefix and Suffix Search - C++
class Solution {}
```

```java
// Prefix and Suffix Search - Java
class Solution {}
```

```kotlin
// Prefix and Suffix Search - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Prefix and Suffix Search - Swift
func solve() -> Int { return 0 }
```

```dart
// Prefix and Suffix Search - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
