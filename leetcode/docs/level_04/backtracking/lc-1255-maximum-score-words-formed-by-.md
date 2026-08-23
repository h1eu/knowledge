---
title: "1255. Maximum Score Words Formed by Letters"
slug: "lc-1255-maximum-score-words-formed-by-"
summary: "Backtracking • Level 4 • Hard — Maximum Score Words Formed by Letters (LeetCode 1255)"
tags: ["leetcode", "backtracking", "hard", "level-4"]
topic_tags: ["array", "hash-table", "string", "dynamic-programming", "backtracking", "bit-manipulation", "counting", "bitmask"]
difficulty: "Hard"
pattern: "Backtracking"
level: 4
leetcode_id: 1255
url: "https://leetcode.com/problems/maximum-score-words-formed-by-letters/"
---

# 1255. Maximum Score Words Formed by Letters

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-hard">Hard</span> <span class="lc-pill lc-pill-pattern">Backtracking</span> <span class="lc-pill lc-pill-level">Level 4</span> <a href="https://leetcode.com/problems/maximum-score-words-formed-by-letters/" target="_blank">LeetCode 1255 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho danh sách từ <code>words</code>, bảng chữ cái <code>letters</code> và điểm mỗi chữ <code>score</code>, hãy tìm điểm lớn nhất có thể tạo bằng cách chọn một số từ sao cho không dùng quá số lượng chữ cái có trong <code>letters</code>.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> words = [&quot;dog&quot;,&quot;cat&quot;,&quot;dad&quot;,&quot;good&quot;], letters = [&quot;a&quot;,&quot;a&quot;,&quot;c&quot;,&quot;d&quot;,&quot;d&quot;,&quot;d&quot;,&quot;g&quot;,&quot;o&quot;,&quot;o&quot;], score = [1,0,9,5,0,0,3,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0]
<strong>Đầu ra:</strong> 23
<strong>Giải thích:</strong>
Score  a=1, c=9, d=5, g=3, o=2
Given letters, we can form the words &quot;dad&quot; (5+1+5) and &quot;good&quot; (3+2+2+5) with a score of 23.
Words &quot;dad&quot; and &quot;dog&quot; only get a score of 21.</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> words = [&quot;xxxz&quot;,&quot;ax&quot;,&quot;bx&quot;,&quot;cx&quot;], letters = [&quot;z&quot;,&quot;a&quot;,&quot;b&quot;,&quot;c&quot;,&quot;x&quot;,&quot;x&quot;,&quot;x&quot;], score = [4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,10]
<strong>Đầu ra:</strong> 27
<strong>Giải thích:</strong>
Score  a=4, b=4, c=4, x=5, z=10
Given letters, we can form the words &quot;ax&quot; (4+5), &quot;bx&quot; (4+5) and &quot;cx&quot; (4+5) with a score of 27.
Word &quot;xxxz&quot; only get a score of 25.</pre>

<p><strong class="example">Ví dụ 3:</strong></p>

<pre>
<strong>Đầu vào:</strong> words = [&quot;leetcode&quot;], letters = [&quot;l&quot;,&quot;e&quot;,&quot;t&quot;,&quot;c&quot;,&quot;o&quot;,&quot;d&quot;], score = [0,0,1,1,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0]
<strong>Đầu ra:</strong> 0
<strong>Giải thích:</strong>
Letter &quot;e&quot; can only be used once.</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= words.length &lt;= 14</code></li>
	<li><code>1 &lt;= words[i].length &lt;= 15</code></li>
	<li><code>1 &lt;= letters.length &lt;= 100</code></li>
	<li><code>letters[i].length == 1</code></li>
	<li><code>score.length ==&nbsp;26</code></li>
	<li><code>0 &lt;= score[i] &lt;= 10</code></li>
	<li><code>words[i]</code>, <code>letters[i]</code>&nbsp;contains only lower case English letters.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Backtracking**.

## 💻 Code 5 ngôn ngữ

```cpp
// Maximum Score Words Formed by Letters - C++
class Solution {}
```

```java
// Maximum Score Words Formed by Letters - Java
class Solution {}
```

```kotlin
// Maximum Score Words Formed by Letters - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Maximum Score Words Formed by Letters - Swift
func solve() -> Int { return 0 }
```

```dart
// Maximum Score Words Formed by Letters - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
