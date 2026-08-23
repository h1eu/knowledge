---
title: "112. Path Sum"
slug: "lc-0112-path-sum"
summary: "Trees • Level 3 • Easy — Path Sum (LeetCode 112)"
tags: ["leetcode", "trees", "easy", "level-3"]
topic_tags: ["tree", "depth-first-search", "breadth-first-search", "binary-tree"]
difficulty: "Easy"
pattern: "Trees"
level: 3
leetcode_id: 112
url: "https://leetcode.com/problems/path-sum/"
---

# 112. Path Sum

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-easy">Easy</span> <span class="lc-pill lc-pill-pattern">Trees</span> <span class="lc-pill lc-pill-level">Level 3</span> <a href="https://leetcode.com/problems/path-sum/" target="_blank">LeetCode 112 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho gốc cây nhị phân <code>root</code> và số nguyên <code>targetSum</code>, hãy trả về <code>true</code> nếu tồn tại đường đi từ gốc tới lá có tổng bằng <code>targetSum</code>.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/01/18/pathsum1.jpg" style="width: 500px; height: 356px;" />
<pre>
<strong>Đầu vào:</strong> root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
<strong>Đầu ra:</strong> true
<strong>Giải thích:</strong> The root-to-leaf path with the target sum is shown.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/01/18/pathsum2.jpg" />
<pre>
<strong>Đầu vào:</strong> root = [1,2,3], targetSum = 5
<strong>Đầu ra:</strong> false
<strong>Giải thích:</strong> There are two root-to-leaf paths in the tree:
(1 --&gt; 2): The sum is 3.
(1 --&gt; 3): The sum is 4.
There is no root-to-leaf path with sum = 5.
</pre>

<p><strong class="example">Ví dụ 3:</strong></p>

<pre>
<strong>Đầu vào:</strong> root = [], targetSum = 0
<strong>Đầu ra:</strong> false
<strong>Giải thích:</strong> Since the tree is empty, there are no root-to-leaf paths.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li>The number of nodes in the tree is in the range <code>[0, 5000]</code>.</li>
	<li><code>-1000 &lt;= Node.val &lt;= 1000</code></li>
	<li><code>-1000 &lt;= targetSum &lt;= 1000</code></li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Trees**.

## 💻 Code 5 ngôn ngữ

```cpp
// Path Sum - C++
class Solution {}
```

```java
// Path Sum - Java
class Solution {}
```

```kotlin
// Path Sum - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Path Sum - Swift
func solve() -> Int { return 0 }
```

```dart
// Path Sum - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
