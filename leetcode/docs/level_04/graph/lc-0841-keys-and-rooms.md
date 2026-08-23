---
title: "841. Keys and Rooms"
slug: "lc-0841-keys-and-rooms"
summary: "Graph • Level 4 • Medium — Keys and Rooms (LeetCode 841)"
tags: ["leetcode", "graph", "medium", "level-4"]
topic_tags: ["depth-first-search", "breadth-first-search", "graph"]
difficulty: "Medium"
pattern: "Graph"
level: 4
leetcode_id: 841
url: "https://leetcode.com/problems/keys-and-rooms/"
---

# 841. Keys and Rooms

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Graph</span> <span class="lc-pill lc-pill-level">Level 4</span> <a href="https://leetcode.com/problems/keys-and-rooms/" target="_blank">LeetCode 841 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho <code>n</code> phòng với <code>rooms[i]</code> chứa các khóa tới phòng khác, bắt đầu từ phòng <code>0</code>, hãy xác định có thể thăm hết phòng không.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> rooms = [[1],[2],[3],[]]
<strong>Đầu ra:</strong> true
<strong>Giải thích:</strong> 
We visit room 0 and pick up key 1.
We then visit room 1 and pick up key 2.
We then visit room 2 and pick up key 3.
We then visit room 3.
Since we were able to visit every room, we return true.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> rooms = [[1,3],[3,0,1],[2],[0]]
<strong>Đầu ra:</strong> false
<strong>Giải thích:</strong> We can not enter room number 2 since the only key that unlocks it is in that room.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>n == rooms.length</code></li>
	<li><code>2 &lt;= n &lt;= 1000</code></li>
	<li><code>0 &lt;= rooms[i].length &lt;= 1000</code></li>
	<li><code>1 &lt;= sum(rooms[i].length) &lt;= 3000</code></li>
	<li><code>0 &lt;= rooms[i][j] &lt; n</code></li>
	<li>All the values of <code>rooms[i]</code> are <strong>unique</strong>.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Graph**.

## 💻 Code 5 ngôn ngữ

```cpp
// Keys and Rooms - C++
class Solution {}
```

```java
// Keys and Rooms - Java
class Solution {}
```

```kotlin
// Keys and Rooms - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Keys and Rooms - Swift
func solve() -> Int { return 0 }
```

```dart
// Keys and Rooms - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
