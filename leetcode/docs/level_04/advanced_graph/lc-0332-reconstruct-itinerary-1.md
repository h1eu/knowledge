---
title: "332. Reconstruct Itinerary"
slug: "lc-0332-reconstruct-itinerary-1"
summary: "Advanced Graph • Level 4 • Hard — Reconstruct Itinerary (LeetCode 332)"
tags: ["leetcode", "advanced-graph", "hard", "level-4"]
topic_tags: ["array", "string", "depth-first-search", "graph", "sorting", "heap-priority-queue", "eulerian-circuit", "eulerian-path", "semi-eulerian-graph"]
difficulty: "Hard"
pattern: "Advanced Graph"
level: 4
leetcode_id: 332
url: "https://leetcode.com/problems/reconstruct-itinerary/"
---

# 332. Reconstruct Itinerary

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-hard">Hard</span> <span class="lc-pill lc-pill-pattern">Advanced Graph</span> <span class="lc-pill lc-pill-level">Level 4</span> <a href="https://leetcode.com/problems/reconstruct-itinerary/" target="_blank">LeetCode 332 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho danh sách vé máy bay <code>tickets</code> với <code>[from, to]</code>, hãy xây dựng hành trình bắt đầu từ <code>"JFK"</code>, dùng hết vé đúng một lần, nếu có nhiều hành trình thì chọn thứ tự từ điển nhỏ nhất.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/14/itinerary1-graph.jpg" style="width: 382px; height: 222px;" />
<pre>
<strong>Đầu vào:</strong> tickets = [[&quot;MUC&quot;,&quot;LHR&quot;],[&quot;JFK&quot;,&quot;MUC&quot;],[&quot;SFO&quot;,&quot;SJC&quot;],[&quot;LHR&quot;,&quot;SFO&quot;]]
<strong>Đầu ra:</strong> [&quot;JFK&quot;,&quot;MUC&quot;,&quot;LHR&quot;,&quot;SFO&quot;,&quot;SJC&quot;]
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/14/itinerary2-graph.jpg" style="width: 222px; height: 230px;" />
<pre>
<strong>Đầu vào:</strong> tickets = [[&quot;JFK&quot;,&quot;SFO&quot;],[&quot;JFK&quot;,&quot;ATL&quot;],[&quot;SFO&quot;,&quot;ATL&quot;],[&quot;ATL&quot;,&quot;JFK&quot;],[&quot;ATL&quot;,&quot;SFO&quot;]]
<strong>Đầu ra:</strong> [&quot;JFK&quot;,&quot;ATL&quot;,&quot;JFK&quot;,&quot;SFO&quot;,&quot;ATL&quot;,&quot;SFO&quot;]
<strong>Giải thích:</strong> Another possible reconstruction is [&quot;JFK&quot;,&quot;SFO&quot;,&quot;ATL&quot;,&quot;JFK&quot;,&quot;ATL&quot;,&quot;SFO&quot;] but it is larger in lexical order.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= tickets.length &lt;= 300</code></li>
	<li><code>tickets[i].length == 2</code></li>
	<li><code>from<sub>i</sub>.length == 3</code></li>
	<li><code>to<sub>i</sub>.length == 3</code></li>
	<li><code>from<sub>i</sub></code> and <code>to<sub>i</sub></code> consist of uppercase English letters.</li>
	<li><code>from<sub>i</sub> != to<sub>i</sub></code></li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Advanced Graph**.

## 💻 Code 5 ngôn ngữ

```cpp
// Reconstruct Itinerary - C++
class Solution {}
```

```java
// Reconstruct Itinerary - Java
class Solution {}
```

```kotlin
// Reconstruct Itinerary - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Reconstruct Itinerary - Swift
func solve() -> Int { return 0 }
```

```dart
// Reconstruct Itinerary - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
