---
title: "79. Word Search"
slug: "lc-0079-word-search-1"
summary: "Backtracking • Level 4 • Medium — Word Search (LeetCode 79)"
tags: ["leetcode", "backtracking", "medium", "level-4"]
topic_tags: ["array", "string", "backtracking", "depth-first-search", "matrix"]
difficulty: "Medium"
pattern: "Backtracking"
level: 4
leetcode_id: 79
url: "https://leetcode.com/problems/word-search/"
---

# 79. Word Search

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Backtracking</span> <span class="lc-pill lc-pill-level">Level 4</span> <a href="https://leetcode.com/problems/word-search/" target="_blank">LeetCode 79 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho bảng <code>board</code> và chuỗi <code>word</code>, hãy kiểm tra <code>word</code> có tồn tại trên bảng bằng cách nối các ô kề nhau (mỗi ô dùng một lần) không.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/11/04/word2.jpg" style="width: 322px; height: 242px;" />
<pre>
<strong>Đầu vào:</strong> board = [[&quot;A&quot;,&quot;B&quot;,&quot;C&quot;,&quot;E&quot;],[&quot;S&quot;,&quot;F&quot;,&quot;C&quot;,&quot;S&quot;],[&quot;A&quot;,&quot;D&quot;,&quot;E&quot;,&quot;E&quot;]], word = &quot;ABCCED&quot;
<strong>Đầu ra:</strong> true
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/11/04/word-1.jpg" style="width: 322px; height: 242px;" />
<pre>
<strong>Đầu vào:</strong> board = [[&quot;A&quot;,&quot;B&quot;,&quot;C&quot;,&quot;E&quot;],[&quot;S&quot;,&quot;F&quot;,&quot;C&quot;,&quot;S&quot;],[&quot;A&quot;,&quot;D&quot;,&quot;E&quot;,&quot;E&quot;]], word = &quot;SEE&quot;
<strong>Đầu ra:</strong> true
</pre>

<p><strong class="example">Ví dụ 3:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/10/15/word3.jpg" style="width: 322px; height: 242px;" />
<pre>
<strong>Đầu vào:</strong> board = [[&quot;A&quot;,&quot;B&quot;,&quot;C&quot;,&quot;E&quot;],[&quot;S&quot;,&quot;F&quot;,&quot;C&quot;,&quot;S&quot;],[&quot;A&quot;,&quot;D&quot;,&quot;E&quot;,&quot;E&quot;]], word = &quot;ABCB&quot;
<strong>Đầu ra:</strong> false
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>m == board.length</code></li>
	<li><code>n = board[i].length</code></li>
	<li><code>1 &lt;= m, n &lt;= 6</code></li>
	<li><code>1 &lt;= word.length &lt;= 15</code></li>
	<li><code>board</code> and <code>word</code> consists of only lowercase and uppercase English letters.</li>
</ul>

<p>&nbsp;</p>
<p><strong>Yêu cầu mở rộng:</strong> Could you use search pruning to make your solution faster with a larger <code>board</code>?</p>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Backtracking**.

## 💻 Code 5 ngôn ngữ

```cpp
// Word Search - C++
class Solution {}
```

```java
// Word Search - Java
class Solution {}
```

```kotlin
// Word Search - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Word Search - Swift
func solve() -> Int { return 0 }
```

```dart
// Word Search - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
