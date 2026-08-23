---
title: "211. Design Add and Search Words Data Structure"
slug: "lc-0211-design-add-and-search-words-da"
summary: "Trie • Level 3 • Medium — Design Add and Search Words Data Structure (LeetCode 211)"
tags: ["leetcode", "trie", "medium", "level-3"]
topic_tags: ["string", "depth-first-search", "design", "trie"]
difficulty: "Medium"
pattern: "Trie"
level: 3
leetcode_id: 211
url: "https://leetcode.com/problems/design-add-and-search-words-data-structure/"
---

# 211. Design Add and Search Words Data Structure

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Trie</span> <span class="lc-pill lc-pill-level">Level 3</span> <a href="https://leetcode.com/problems/design-add-and-search-words-data-structure/" target="_blank">LeetCode 211 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Thiết kế cấu trúc hỗ trợ thêm từ và tìm kiếm với ký tự đại diện <code>'.'</code> (khớp bất kỳ chữ cái nào). Hiện thực <code>WordDictionary</code> với <code>addWord</code> và <code>search</code>.</p>

<p>&nbsp;</p><p><strong class="example">Example:</strong></p>

<pre>
<strong>Đầu vào</strong>
[&quot;WordDictionary&quot;,&quot;addWord&quot;,&quot;addWord&quot;,&quot;addWord&quot;,&quot;search&quot;,&quot;search&quot;,&quot;search&quot;,&quot;search&quot;]
[[],[&quot;bad&quot;],[&quot;dad&quot;],[&quot;mad&quot;],[&quot;pad&quot;],[&quot;bad&quot;],[&quot;.ad&quot;],[&quot;b..&quot;]]
<strong>Đầu ra</strong>
[null,null,null,null,false,true,true,true]

<strong>Giải thích</strong>
WordDictionary wordDictionary = new WordDictionary();
wordDictionary.addWord(&quot;bad&quot;);
wordDictionary.addWord(&quot;dad&quot;);
wordDictionary.addWord(&quot;mad&quot;);
wordDictionary.search(&quot;pad&quot;); // return False
wordDictionary.search(&quot;bad&quot;); // return True
wordDictionary.search(&quot;.ad&quot;); // return True
wordDictionary.search(&quot;b..&quot;); // return True
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= word.length &lt;= 25</code></li>
	<li><code>word</code> in <code>addWord</code> consists of lowercase English letters.</li>
	<li><code>word</code> in <code>search</code> consist of <code>&#39;.&#39;</code> or lowercase English letters.</li>
	<li>There will be at most <code>2</code> dots in <code>word</code> for <code>search</code> queries.</li>
	<li>At most <code>10<sup>4</sup></code> calls will be made to <code>addWord</code> and <code>search</code>.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Trie**.

## 💻 Code 5 ngôn ngữ

```cpp
// Design Add and Search Words - C++
class Solution {}
```

```java
// Design Add and Search Words - Java
class Solution {}
```

```kotlin
// Design Add and Search Words - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Design Add and Search Words - Swift
func solve() -> Int { return 0 }
```

```dart
// Design Add and Search Words - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
