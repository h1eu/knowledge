---
title: "692. Top K Frequent Words"
slug: "lc-0692-top-k-frequent-words"
summary: "Heap • Level 3 • Medium — Top K Frequent Words (LeetCode 692)"
tags: ["leetcode", "heap", "medium", "level-3"]
topic_tags: ["array", "hash-table", "string", "trie", "sorting", "heap-priority-queue", "bucket-sort", "counting"]
difficulty: "Medium"
pattern: "Heap"
level: 3
leetcode_id: 692
url: "https://leetcode.com/problems/top-k-frequent-words/"
---

# 692. Top K Frequent Words

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Heap</span> <span class="lc-pill lc-pill-level">Level 3</span> <a href="https://leetcode.com/problems/top-k-frequent-words/" target="_blank">LeetCode 692 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho mảng chuỗi <code>words</code>, hãy trả về <code>k</code> từ xuất hiện nhiều nhất, sắp xếp theo tần suất giảm dần, nếu bằng nhau thì theo thứ tự từ điển tăng dần.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> words = [&quot;i&quot;,&quot;love&quot;,&quot;leetcode&quot;,&quot;i&quot;,&quot;love&quot;,&quot;coding&quot;], k = 2
<strong>Đầu ra:</strong> [&quot;i&quot;,&quot;love&quot;]
<strong>Giải thích:</strong> &quot;i&quot; and &quot;love&quot; are the two most frequent words.
Note that &quot;i&quot; comes before &quot;love&quot; due to a lower alphabetical order.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> words = [&quot;the&quot;,&quot;day&quot;,&quot;is&quot;,&quot;sunny&quot;,&quot;the&quot;,&quot;the&quot;,&quot;the&quot;,&quot;sunny&quot;,&quot;is&quot;,&quot;is&quot;], k = 4
<strong>Đầu ra:</strong> [&quot;the&quot;,&quot;is&quot;,&quot;sunny&quot;,&quot;day&quot;]
<strong>Giải thích:</strong> &quot;the&quot;, &quot;is&quot;, &quot;sunny&quot; and &quot;day&quot; are the four most frequent words, with the number of occurrence being 4, 3, 2 and 1 respectively.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= words.length &lt;= 500</code></li>
	<li><code>1 &lt;= words[i].length &lt;= 10</code></li>
	<li><code>words[i]</code> consists of lowercase English letters.</li>
	<li><code>k</code> is in the range <code>[1, The number of <strong>unique</strong> words[i]]</code></li>
</ul>

<p>&nbsp;</p>
<p><strong>Yêu cầu mở rộng:</strong> Could you solve it in <code>O(n log(k))</code> time and <code>O(n)</code> extra space?</p>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Heap**.

## 💻 Code 5 ngôn ngữ

```cpp
// Top K Frequent Words - C++
class Solution {}
```

```java
// Top K Frequent Words - Java
class Solution {}
```

```kotlin
// Top K Frequent Words - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Top K Frequent Words - Swift
func solve() -> Int { return 0 }
```

```dart
// Top K Frequent Words - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
