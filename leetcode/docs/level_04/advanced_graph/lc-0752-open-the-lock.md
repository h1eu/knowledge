---
title: "752. Open the Lock"
slug: "lc-0752-open-the-lock"
summary: "Advanced Graph • Level 4 • Medium — Open the Lock (LeetCode 752)"
tags: ["leetcode", "advanced-graph", "medium", "level-4"]
topic_tags: ["array", "hash-table", "string", "breadth-first-search", "bidirectional-search"]
difficulty: "Medium"
pattern: "Advanced Graph"
level: 4
leetcode_id: 752
url: "https://leetcode.com/problems/open-the-lock/"
---

# 752. Open the Lock

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Advanced Graph</span> <span class="lc-pill lc-pill-level">Level 4</span> <a href="https://leetcode.com/problems/open-the-lock/" target="_blank">LeetCode 752 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Khóa có 4 bánh xe, mỗi bánh <code>0-9</code>, bắt đầu ở <code>"0000"</code>, mỗi lần quay một bánh một nấc. Cho danh sách <code>deadends</code> (các trạng thái chết) và <code>target</code>, hãy tìm số lần quay ít nhất để tới <code>target</code>, nếu không thể trả về <code>-1</code>.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> deadends = [&quot;0201&quot;,&quot;0101&quot;,&quot;0102&quot;,&quot;1212&quot;,&quot;2002&quot;], target = &quot;0202&quot;
<strong>Đầu ra:</strong> 6
<strong>Giải thích:</strong> 
A sequence of valid moves would be &quot;0000&quot; -&gt; &quot;1000&quot; -&gt; &quot;1100&quot; -&gt; &quot;1200&quot; -&gt; &quot;1201&quot; -&gt; &quot;1202&quot; -&gt; &quot;0202&quot;.
Note that a sequence like &quot;0000&quot; -&gt; &quot;0001&quot; -&gt; &quot;0002&quot; -&gt; &quot;0102&quot; -&gt; &quot;0202&quot; would be invalid,
because the wheels of the lock become stuck after the display becomes the dead end &quot;0102&quot;.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> deadends = [&quot;8888&quot;], target = &quot;0009&quot;
<strong>Đầu ra:</strong> 1
<strong>Giải thích:</strong> We can turn the last wheel in reverse to move from &quot;0000&quot; -&gt; &quot;0009&quot;.
</pre>

<p><strong class="example">Ví dụ 3:</strong></p>

<pre>
<strong>Đầu vào:</strong> deadends = [&quot;8887&quot;,&quot;8889&quot;,&quot;8878&quot;,&quot;8898&quot;,&quot;8788&quot;,&quot;8988&quot;,&quot;7888&quot;,&quot;9888&quot;], target = &quot;8888&quot;
<strong>Đầu ra:</strong> -1
<strong>Giải thích:</strong> We cannot reach the target without getting stuck.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= deadends.length &lt;= 500</code></li>
	<li><code>deadends[i].length == 4</code></li>
	<li><code>target.length == 4</code></li>
	<li>target <strong>will not be</strong> in the list <code>deadends</code>.</li>
	<li><code>target</code> and <code>deadends[i]</code> consist of digits only.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Advanced Graph**.

## 💻 Code 5 ngôn ngữ

```cpp
// Open the Lock - C++
class Solution {}
```

```java
// Open the Lock - Java
class Solution {}
```

```kotlin
// Open the Lock - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Open the Lock - Swift
func solve() -> Int { return 0 }
```

```dart
// Open the Lock - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
