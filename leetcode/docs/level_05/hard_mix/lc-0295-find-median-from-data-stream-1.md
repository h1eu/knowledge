---
title: "295. Find Median from Data Stream"
slug: "lc-0295-find-median-from-data-stream-1"
summary: "Hard Mix • Level 5 • Hard — Find Median from Data Stream (LeetCode 295)"
tags: ["leetcode", "hard-mix", "hard", "level-5"]
topic_tags: ["two-pointers", "design", "sorting", "heap-priority-queue", "data-stream"]
difficulty: "Hard"
pattern: "Hard Mix"
level: 5
leetcode_id: 295
url: "https://leetcode.com/problems/find-median-from-data-stream/"
---

# 295. Find Median from Data Stream

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-hard">Hard</span> <span class="lc-pill lc-pill-pattern">Hard Mix</span> <span class="lc-pill lc-pill-level">Level 5</span> <a href="https://leetcode.com/problems/find-median-from-data-stream/" target="_blank">LeetCode 295 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Thiết kế <code>MedianFinder</code> với <code>addNum</code> và <code>findMedian</code> (bản Hard Mix).</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào</strong>
[&quot;MedianFinder&quot;, &quot;addNum&quot;, &quot;addNum&quot;, &quot;findMedian&quot;, &quot;addNum&quot;, &quot;findMedian&quot;]
[[], [1], [2], [], [3], []]
<strong>Đầu ra</strong>
[null, null, null, 1.5, null, 2.0]

<strong>Giải thích</strong>
MedianFinder medianFinder = new MedianFinder();
medianFinder.addNum(1);    // arr = [1]
medianFinder.addNum(2);    // arr = [1, 2]
medianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)
medianFinder.addNum(3);    // arr[1, 2, 3]
medianFinder.findMedian(); // return 2.0
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>-10<sup>5</sup> &lt;= num &lt;= 10<sup>5</sup></code></li>
	<li>There will be at least one element in the data structure before calling <code>findMedian</code>.</li>
	<li>At most <code>5 * 10<sup>4</sup></code> calls will be made to <code>addNum</code> and <code>findMedian</code>.</li>
</ul>

<p>&nbsp;</p>
<p><strong>Yêu cầu mở rộng:</strong></p>

<ul>
	<li>If all integer numbers from the stream are in the range <code>[0, 100]</code>, how would you optimize your solution?</li>
	<li>If <code>99%</code> of all integer numbers from the stream are in the range <code>[0, 100]</code>, how would you optimize your solution?</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Hard Mix**.

## 💻 Code 5 ngôn ngữ

```cpp
// Find Median from Data Stream - C++
class Solution {}
```

```java
// Find Median from Data Stream - Java
class Solution {}
```

```kotlin
// Find Median from Data Stream - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Find Median from Data Stream - Swift
func solve() -> Int { return 0 }
```

```dart
// Find Median from Data Stream - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
