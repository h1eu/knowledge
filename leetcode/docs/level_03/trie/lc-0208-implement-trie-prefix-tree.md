---
title: "208. Implement Trie (Prefix Tree)"
slug: "lc-0208-implement-trie-prefix-tree"
summary: "Trie • Level 3 • Medium — Implement Trie (Prefix Tree) (LeetCode 208)"
tags: ["leetcode", "trie", "medium", "level-3"]
topic_tags: ["hash-table", "string", "design", "trie"]
difficulty: "Medium"
pattern: "Trie"
level: 3
leetcode_id: 208
url: "https://leetcode.com/problems/implement-trie-prefix-tree/"
---

# 208. Implement Trie (Prefix Tree)

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Trie</span> <span class="lc-pill lc-pill-level">Level 3</span> <a href="https://leetcode.com/problems/implement-trie-prefix-tree/" target="_blank">LeetCode 208 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Hiện thực Trie (cây tiền tố) với các thao tác <code>insert(word)</code>, <code>search(word)</code>, <code>startsWith(prefix)</code>.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào</strong>
[&quot;Trie&quot;, &quot;insert&quot;, &quot;search&quot;, &quot;search&quot;, &quot;startsWith&quot;, &quot;insert&quot;, &quot;search&quot;]
[[], [&quot;apple&quot;], [&quot;apple&quot;], [&quot;app&quot;], [&quot;app&quot;], [&quot;app&quot;], [&quot;app&quot;]]
<strong>Đầu ra</strong>
[null, null, true, false, true, null, true]

<strong>Giải thích</strong>
Trie trie = new Trie();
trie.insert(&quot;apple&quot;);
trie.search(&quot;apple&quot;);   // return True
trie.search(&quot;app&quot;);     // return False
trie.startsWith(&quot;app&quot;); // return True
trie.insert(&quot;app&quot;);
trie.search(&quot;app&quot;);     // return True
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= word.length, prefix.length &lt;= 2000</code></li>
	<li><code>word</code> and <code>prefix</code> consist only of lowercase English letters.</li>
	<li>At most <code>3 * 10<sup>4</sup></code> calls <strong>in total</strong> will be made to <code>insert</code>, <code>search</code>, and <code>startsWith</code>.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Trie**.

## 💻 Code 5 ngôn ngữ

```cpp
// Implement Trie - C++
class Solution {}
```

```java
// Implement Trie - Java
class Solution {}
```

```kotlin
// Implement Trie - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Implement Trie - Swift
func solve() -> Int { return 0 }
```

```dart
// Implement Trie - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
