---
title: "1032. Stream of Characters"
slug: "lc-1032-stream-of-characters"
summary: "Trie • Level 3 • Hard — Stream of Characters (LeetCode 1032)"
tags: ["leetcode", "trie", "hard", "level-3"]
topic_tags: ["array", "string", "design", "trie", "data-stream", "aho-corasick-algorithm"]
difficulty: "Hard"
pattern: "Trie"
level: 3
leetcode_id: 1032
url: "https://leetcode.com/problems/stream-of-characters/"
---

# 1032. Stream of Characters

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-hard">Hard</span> <span class="lc-pill lc-pill-pattern">Trie</span> <span class="lc-pill lc-pill-level">Level 3</span> <a href="https://leetcode.com/problems/stream-of-characters/" target="_blank">LeetCode 1032 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Thiết kế cấu trúc kiểm tra luồng ký tự: cho danh sách từ <code>words</code>, với mỗi ký tự mới <code>query(letter)</code> được thêm vào cuối luồng, hãy trả về <code>true</code> nếu bất kỳ từ nào trong <code>words</code> là hậu tố của luồng.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào</strong>
[&quot;StreamChecker&quot;, &quot;query&quot;, &quot;query&quot;, &quot;query&quot;, &quot;query&quot;, &quot;query&quot;, &quot;query&quot;, &quot;query&quot;, &quot;query&quot;, &quot;query&quot;, &quot;query&quot;, &quot;query&quot;, &quot;query&quot;]
[[[&quot;cd&quot;, &quot;f&quot;, &quot;kl&quot;]], [&quot;a&quot;], [&quot;b&quot;], [&quot;c&quot;], [&quot;d&quot;], [&quot;e&quot;], [&quot;f&quot;], [&quot;g&quot;], [&quot;h&quot;], [&quot;i&quot;], [&quot;j&quot;], [&quot;k&quot;], [&quot;l&quot;]]
<strong>Đầu ra</strong>
[null, false, false, false, true, false, true, false, false, false, false, false, true]

<strong>Giải thích</strong>
StreamChecker streamChecker = new StreamChecker([&quot;cd&quot;, &quot;f&quot;, &quot;kl&quot;]);
streamChecker.query(&quot;a&quot;); // return False
streamChecker.query(&quot;b&quot;); // return False
streamChecker.query(&quot;c&quot;); // return False
streamChecker.query(&quot;d&quot;); // return True, because &#39;cd&#39; is in the wordlist
streamChecker.query(&quot;e&quot;); // return False
streamChecker.query(&quot;f&quot;); // return True, because &#39;f&#39; is in the wordlist
streamChecker.query(&quot;g&quot;); // return False
streamChecker.query(&quot;h&quot;); // return False
streamChecker.query(&quot;i&quot;); // return False
streamChecker.query(&quot;j&quot;); // return False
streamChecker.query(&quot;k&quot;); // return False
streamChecker.query(&quot;l&quot;); // return True, because &#39;kl&#39; is in the wordlist
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= words.length &lt;= 2000</code></li>
	<li><code>1 &lt;= words[i].length &lt;= 200</code></li>
	<li><code>words[i]</code> consists of lowercase English letters.</li>
	<li><code>letter</code> is a lowercase English letter.</li>
	<li>At most <code>4 * 10<sup>4</sup></code> calls will be made to query.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Trie**.

## 💻 Code 5 ngôn ngữ

```cpp
// Stream of Characters - C++
class Solution {}
```

```java
// Stream of Characters - Java
class Solution {}
```

```kotlin
// Stream of Characters - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Stream of Characters - Swift
func solve() -> Int { return 0 }
```

```dart
// Stream of Characters - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
