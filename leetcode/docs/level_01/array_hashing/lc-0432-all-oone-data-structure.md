---
title: "432. All O`one Data Structure"
slug: "lc-0432-all-oone-data-structure"
summary: "Array & Hashing • Level 1 • Hard — All O`one Data Structure (LeetCode 432)"
tags: ["leetcode", "array-hashing", "hard", "level-1"]
topic_tags: ["hash-table", "linked-list", "design", "doubly-linked-list"]
difficulty: "Hard"
pattern: "Array & Hashing"
level: 1
leetcode_id: 432
url: "https://leetcode.com/problems/all-oone-data-structure/"
---

# 432. All O`one Data Structure

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-hard">Hard</span> <span class="lc-pill lc-pill-pattern">Array & Hashing</span> <span class="lc-pill lc-pill-level">Level 1</span> <a href="https://leetcode.com/problems/all-oone-data-structure/" target="_blank">LeetCode 432 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Thiết kế cấu trúc lưu trữ đếm chuỗi với khả năng:</p>
<ul>
	<li><code>inc(String key)</code> tăng đếm của <code>key</code> lên 1.</li>
	<li><code>dec(String key)</code> giảm đếm của <code>key</code> đi 1.</li>
	<li><code>getMaxKey()</code> lấy key có đếm lớn nhất.</li>
	<li><code>getMinKey()</code> lấy key có đếm nhỏ nhất.</li>
</ul>

<p>Tất cả thao tác phải <code>O(1)</code> trung bình.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào</strong>
[&quot;AllOne&quot;, &quot;inc&quot;, &quot;inc&quot;, &quot;getMaxKey&quot;, &quot;getMinKey&quot;, &quot;inc&quot;, &quot;getMaxKey&quot;, &quot;getMinKey&quot;]
[[], [&quot;hello&quot;], [&quot;hello&quot;], [], [], [&quot;leet&quot;], [], []]
<strong>Đầu ra</strong>
[null, null, null, &quot;hello&quot;, &quot;hello&quot;, null, &quot;hello&quot;, &quot;leet&quot;]

<strong>Giải thích</strong>
AllOne allOne = new AllOne();
allOne.inc(&quot;hello&quot;);
allOne.inc(&quot;hello&quot;);
allOne.getMaxKey(); // return &quot;hello&quot;
allOne.getMinKey(); // return &quot;hello&quot;
allOne.inc(&quot;leet&quot;);
allOne.getMaxKey(); // return &quot;hello&quot;
allOne.getMinKey(); // return &quot;leet&quot;
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= key.length &lt;= 10</code></li>
	<li><code>key</code> consists of lowercase English letters.</li>
	<li>It is guaranteed that for each call to <code>dec</code>, <code>key</code> is existing in the data structure.</li>
	<li>At most <code>5 * 10<sup>4</sup></code>&nbsp;calls will be made to <code>inc</code>, <code>dec</code>, <code>getMaxKey</code>, and <code>getMinKey</code>.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Array & Hashing**.

## 💻 Code 5 ngôn ngữ

```cpp
// All O`one Data Structure - C++
class Solution {}
```

```java
// All O`one Data Structure - Java
class Solution {}
```

```kotlin
// All O`one Data Structure - Kotlin
fun solve(): Int { return 0 }
```

```swift
// All O`one Data Structure - Swift
func solve() -> Int { return 0 }
```

```dart
// All O`one Data Structure - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
