---
title: "235. Lowest Common Ancestor of a Binary Search Tree"
slug: "lc-0235-lowest-common-ancestor-of-a-bi"
summary: "Trees • Level 3 • Medium — Lowest Common Ancestor of a Binary Search Tree (LeetCode 235)"
tags: ["leetcode", "trees", "medium", "level-3"]
topic_tags: ["tree", "depth-first-search", "binary-search-tree", "binary-tree", "binary-lifting", "lowest-common-ancestor"]
difficulty: "Medium"
pattern: "Trees"
level: 3
leetcode_id: 235
url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/"
---

# 235. Lowest Common Ancestor of a Binary Search Tree

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Trees</span> <span class="lc-pill lc-pill-level">Level 3</span> <a href="https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" target="_blank">LeetCode 235 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho BST và hai node <code>p</code>, <code>q</code>, hãy tìm tổ tiên chung thấp nhất (LCA) của chúng.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2018/12/14/binarysearchtree_improved.png" style="width: 200px; height: 190px;" />
<pre>
<strong>Đầu vào:</strong> root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
<strong>Đầu ra:</strong> 6
<strong>Giải thích:</strong> The LCA of nodes 2 and 8 is 6.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2018/12/14/binarysearchtree_improved.png" style="width: 200px; height: 190px;" />
<pre>
<strong>Đầu vào:</strong> root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
<strong>Đầu ra:</strong> 2
<strong>Giải thích:</strong> The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition.
</pre>

<p><strong class="example">Ví dụ 3:</strong></p>

<pre>
<strong>Đầu vào:</strong> root = [2,1], p = 2, q = 1
<strong>Đầu ra:</strong> 2
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li>The number of nodes in the tree is in the range <code>[2, 10<sup>5</sup>]</code>.</li>
	<li><code>-10<sup>9</sup> &lt;= Node.val &lt;= 10<sup>9</sup></code></li>
	<li>All <code>Node.val</code> are <strong>unique</strong>.</li>
	<li><code>p != q</code></li>
	<li><code>p</code> and <code>q</code> will exist in the BST.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Trees**.

## 💻 Code 5 ngôn ngữ

```cpp
// Lowest Common Ancestor of BST - C++
class Solution {}
```

```java
// Lowest Common Ancestor of BST - Java
class Solution {}
```

```kotlin
// Lowest Common Ancestor of BST - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Lowest Common Ancestor of BST - Swift
func solve() -> Int { return 0 }
```

```dart
// Lowest Common Ancestor of BST - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
