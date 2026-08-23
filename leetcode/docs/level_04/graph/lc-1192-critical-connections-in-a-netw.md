---
title: "1192. Critical Connections in a Network"
slug: "lc-1192-critical-connections-in-a-netw"
summary: "Graph • Level 4 • Hard — Critical Connections in a Network (LeetCode 1192)"
tags: ["leetcode", "graph", "hard", "level-4"]
topic_tags: ["depth-first-search", "graph", "biconnected-component", "bridge-graph"]
difficulty: "Hard"
pattern: "Graph"
level: 4
leetcode_id: 1192
url: "https://leetcode.com/problems/critical-connections-in-a-network/"
---

# 1192. Critical Connections in a Network

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-hard">Hard</span> <span class="lc-pill lc-pill-pattern">Graph</span> <span class="lc-pill lc-pill-level">Level 4</span> <a href="https://leetcode.com/problems/critical-connections-in-a-network/" target="_blank">LeetCode 1192 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho mạng với <code>n</code> server và danh sách kết nối <code>connections</code>, hãy tìm tất cả các cầu (critical connections) — cạnh mà nếu xóa sẽ làm mạng mất liên thông.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2019/09/03/1537_ex1_2.png" style="width: 198px; height: 248px;" />
<pre>
<strong>Đầu vào:</strong> n = 4, connections = [[0,1],[1,2],[2,0],[1,3]]
<strong>Đầu ra:</strong> [[1,3]]
<strong>Giải thích:</strong> [[3,1]] is also accepted.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> n = 2, connections = [[0,1]]
<strong>Đầu ra:</strong> [[0,1]]
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>2 &lt;= n &lt;= 10<sup>5</sup></code></li>
	<li><code>n - 1 &lt;= connections.length &lt;= 10<sup>5</sup></code></li>
	<li><code>0 &lt;= a<sub>i</sub>, b<sub>i</sub> &lt;= n - 1</code></li>
	<li><code>a<sub>i</sub> != b<sub>i</sub></code></li>
	<li>There are no repeated connections.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Graph**.

## 💻 Code 5 ngôn ngữ

```cpp
// Critical Connections in Network - C++
class Solution {}
```

```java
// Critical Connections in Network - Java
class Solution {}
```

```kotlin
// Critical Connections in Network - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Critical Connections in Network - Swift
func solve() -> Int { return 0 }
```

```dart
// Critical Connections in Network - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
