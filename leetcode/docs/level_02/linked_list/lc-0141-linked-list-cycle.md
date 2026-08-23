---
title: "141. Linked List Cycle"
slug: "lc-0141-linked-list-cycle"
summary: "Linked List • Level 2 • Easy — Linked List Cycle (LeetCode 141)"
tags: ["leetcode", "linked-list", "easy", "level-2"]
topic_tags: ["hash-table", "linked-list", "two-pointers", "floyds-cycle-finding-algorithm"]
difficulty: "Easy"
pattern: "Linked List"
level: 2
leetcode_id: 141
url: "https://leetcode.com/problems/linked-list-cycle/"
---

# 141. Linked List Cycle

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-easy">Easy</span> <span class="lc-pill lc-pill-pattern">Linked List</span> <span class="lc-pill lc-pill-level">Level 2</span> <a href="https://leetcode.com/problems/linked-list-cycle/" target="_blank">LeetCode 141 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho đầu danh sách liên kết <code>head</code>, hãy xác định danh sách có <strong>chu trình (cycle)</strong> hay không. Có chu trình nếu có node mà <code>next</code> trỏ lại node trước đó.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist.png" style="width: 300px; height: 97px; margin-top: 8px; margin-bottom: 8px;" />
<pre>
<strong>Đầu vào:</strong> head = [3,2,0,-4], pos = 1
<strong>Đầu ra:</strong> true
<strong>Giải thích:</strong> There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist_test2.png" style="width: 141px; height: 74px;" />
<pre>
<strong>Đầu vào:</strong> head = [1,2], pos = 0
<strong>Đầu ra:</strong> true
<strong>Giải thích:</strong> There is a cycle in the linked list, where the tail connects to the 0th node.
</pre>

<p><strong class="example">Ví dụ 3:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist_test3.png" style="width: 45px; height: 45px;" />
<pre>
<strong>Đầu vào:</strong> head = [1], pos = -1
<strong>Đầu ra:</strong> false
<strong>Giải thích:</strong> There is no cycle in the linked list.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li>The number of the nodes in the list is in the range <code>[0, 10<sup>4</sup>]</code>.</li>
	<li><code>-10<sup>5</sup> &lt;= Node.val &lt;= 10<sup>5</sup></code></li>
	<li><code>pos</code> is <code>-1</code> or a <strong>valid index</strong> in the linked-list.</li>
</ul>

<p>&nbsp;</p>
<p><strong>Yêu cầu mở rộng:</strong> Can you solve it using <code>O(1)</code> (i.e. constant) memory?</p>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Linked List**.

## 💻 Code 5 ngôn ngữ

```cpp
// Linked List Cycle - C++
class Solution {}
```

```java
// Linked List Cycle - Java
class Solution {}
```

```kotlin
// Linked List Cycle - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Linked List Cycle - Swift
func solve() -> Int { return 0 }
```

```dart
// Linked List Cycle - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
