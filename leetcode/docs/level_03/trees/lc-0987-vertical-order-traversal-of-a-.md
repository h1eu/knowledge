---
title: "987. Vertical Order Traversal of a Binary Tree"
slug: "lc-0987-vertical-order-traversal-of-a-"
summary: "Trees • Level 3 • Hard — Vertical Order Traversal of a Binary Tree (LeetCode 987)"
tags: ["leetcode", "trees", "hard", "level-3"]
topic_tags: ["hash-table", "tree", "depth-first-search", "breadth-first-search", "sorting", "binary-tree"]
difficulty: "Hard"
pattern: "Trees"
level: 3
leetcode_id: 987
url: "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/"
---

# 987. Vertical Order Traversal of a Binary Tree

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-hard">Hard</span> <span class="lc-pill lc-pill-pattern">Trees</span> <span class="lc-pill lc-pill-level">Level 3</span> <a href="https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/" target="_blank">LeetCode 987 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho gốc cây nhị phân, hãy trả về duyệt theo cột dọc (vertical order): sắp xếp theo cột, rồi theo hàng, nếu cùng vị trí thì theo giá trị.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/01/29/vtree1.jpg" style="width: 431px; height: 304px;" />
<pre>
<strong>Đầu vào:</strong> root = [3,9,20,null,null,15,7]
<strong>Đầu ra:</strong> [[9],[3,15],[20],[7]]
<strong>Giải thích:</strong>
Column -1: Only node 9 is in this column.
Column 0: Nodes 3 and 15 are in this column in that order from top to bottom.
Column 1: Only node 20 is in this column.
Column 2: Only node 7 is in this column.</pre>

<p><strong class="example">Ví dụ 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/01/29/vtree2.jpg" style="width: 512px; height: 304px;" />
<pre>
<strong>Đầu vào:</strong> root = [1,2,3,4,5,6,7]
<strong>Đầu ra:</strong> [[4],[2],[1,5,6],[3],[7]]
<strong>Giải thích:</strong>
Column -2: Only node 4 is in this column.
Column -1: Only node 2 is in this column.
Column 0: Nodes 1, 5, and 6 are in this column.
          1 is at the top, so it comes first.
          5 and 6 are at the same position (2, 0), so we order them by their value, 5 before 6.
Column 1: Only node 3 is in this column.
Column 2: Only node 7 is in this column.
</pre>

<p><strong class="example">Ví dụ 3:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/01/29/vtree3.jpg" style="width: 512px; height: 304px;" />
<pre>
<strong>Đầu vào:</strong> root = [1,2,3,4,6,5,7]
<strong>Đầu ra:</strong> [[4],[2],[1,5,6],[3],[7]]
<strong>Giải thích:</strong>
This case is the exact same as example 2, but with nodes 5 and 6 swapped.
Note that the solution remains the same since 5 and 6 are in the same location and should be ordered by their values.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li>The number of nodes in the tree is in the range <code>[1, 1000]</code>.</li>
	<li><code>0 &lt;= Node.val &lt;= 1000</code></li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Trees**.

## 💻 Code 5 ngôn ngữ

```cpp
// Vertical Order Traversal - C++
class Solution {}
```

```java
// Vertical Order Traversal - Java
class Solution {}
```

```kotlin
// Vertical Order Traversal - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Vertical Order Traversal - Swift
func solve() -> Int { return 0 }
```

```dart
// Vertical Order Traversal - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
