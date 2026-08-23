---
title: "450. Delete Node in a BST"
slug: "lc-0450-delete-node-in-a-bst"
summary: "Trees • Level 3 • Medium — Delete Node in a BST (LeetCode 450)"
tags: ["leetcode", "trees", "medium", "level-3"]
topic_tags: ["tree", "binary-search-tree", "binary-tree"]
difficulty: "Medium"
pattern: "Trees"
level: 3
leetcode_id: 450
url: "https://leetcode.com/problems/delete-node-in-a-bst/"
---

# 450. Delete Node in a BST

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Trees</span> <span class="lc-pill lc-pill-level">Level 3</span> <a href="https://leetcode.com/problems/delete-node-in-a-bst/" target="_blank">LeetCode 450 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho gốc BST <code>root</code> và khóa <code>key</code>, hãy xóa node có giá trị <code>key</code> (nếu tồn tại) và đảm bảo BST vẫn hợp lệ, trả về gốc mới.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/09/04/del_node_1.jpg" style="width: 800px; height: 214px;" />
<pre>
<strong>Đầu vào:</strong> root = [5,3,6,2,4,null,7], key = 3
<strong>Đầu ra:</strong> [5,4,6,2,null,null,7]
<strong>Giải thích:</strong> Given key to delete is 3. So we find the node with value 3 and delete it.
One valid answer is [5,4,6,2,null,null,7], shown in the above BST.
Please notice that another valid answer is [5,2,6,null,4,null,7] and it&#39;s also accepted.
<img alt="" src="https://assets.leetcode.com/uploads/2020/09/04/del_node_supp.jpg" style="width: 350px; height: 255px;" />
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> root = [5,3,6,2,4,null,7], key = 0
<strong>Đầu ra:</strong> [5,3,6,2,4,null,7]
<strong>Giải thích:</strong> The tree does not contain a node with value = 0.
</pre>

<p><strong class="example">Ví dụ 3:</strong></p>

<pre>
<strong>Đầu vào:</strong> root = [], key = 0
<strong>Đầu ra:</strong> []
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li>The number of nodes in the tree is in the range <code>[0, 10<sup>4</sup>]</code>.</li>
	<li><code>-10<sup>5</sup> &lt;= Node.val &lt;= 10<sup>5</sup></code></li>
	<li>Each node has a <strong>unique</strong> value.</li>
	<li><code>root</code> is a valid binary search tree.</li>
	<li><code>-10<sup>5</sup> &lt;= key &lt;= 10<sup>5</sup></code></li>
</ul>

<p>&nbsp;</p>
<p><strong>Yêu cầu mở rộng:</strong> Could you solve it with time complexity <code>O(height of tree)</code>?</p>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Trees**.

## 💻 Code 5 ngôn ngữ

```cpp
// Delete Node in a BST - C++
class Solution {}
```

```java
// Delete Node in a BST - Java
class Solution {}
```

```kotlin
// Delete Node in a BST - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Delete Node in a BST - Swift
func solve() -> Int { return 0 }
```

```dart
// Delete Node in a BST - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
