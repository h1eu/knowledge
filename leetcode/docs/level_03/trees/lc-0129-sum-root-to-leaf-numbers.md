---
title: "129. Sum Root to Leaf Numbers"
slug: "lc-0129-sum-root-to-leaf-numbers"
summary: "Trees • Level 3 • Medium — Sum Root to Leaf Numbers (LeetCode 129)"
tags: ["leetcode", "trees", "medium", "level-3"]
topic_tags: ["tree", "depth-first-search", "binary-tree"]
difficulty: "Medium"
pattern: "Trees"
level: 3
leetcode_id: 129
url: "https://leetcode.com/problems/sum-root-to-leaf-numbers/"
---

# 129. Sum Root to Leaf Numbers

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Trees</span> <span class="lc-pill lc-pill-level">Level 3</span> <a href="https://leetcode.com/problems/sum-root-to-leaf-numbers/" target="_blank">LeetCode 129 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho gốc cây nhị phân với mỗi node chứa chữ số <code>0-9</code>, mỗi đường gốc→lá tạo thành một số. Hãy trả về tổng của tất cả các số đó.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/02/19/num1tree.jpg" style="width: 212px; height: 182px;" />
<pre>
<strong>Đầu vào:</strong> root = [1,2,3]
<strong>Đầu ra:</strong> 25
<strong>Giải thích:</strong>
The root-to-leaf path <code>1-&gt;2</code> represents the number <code>12</code>.
The root-to-leaf path <code>1-&gt;3</code> represents the number <code>13</code>.
Therefore, sum = 12 + 13 = <code>25</code>.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/02/19/num2tree.jpg" style="width: 292px; height: 302px;" />
<pre>
<strong>Đầu vào:</strong> root = [4,9,0,5,1]
<strong>Đầu ra:</strong> 1026
<strong>Giải thích:</strong>
The root-to-leaf path <code>4-&gt;9-&gt;5</code> represents the number 495.
The root-to-leaf path <code>4-&gt;9-&gt;1</code> represents the number 491.
The root-to-leaf path <code>4-&gt;0</code> represents the number 40.
Therefore, sum = 495 + 491 + 40 = <code>1026</code>.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li>The number of nodes in the tree is in the range <code>[1, 1000]</code>.</li>
	<li><code>0 &lt;= Node.val &lt;= 9</code></li>
	<li>The depth of the tree will not exceed <code>10</code>.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Trees**.

## 💻 Code 5 ngôn ngữ

```cpp
// Sum Root to Leaf Numbers - C++
class Solution {}
```

```java
// Sum Root to Leaf Numbers - Java
class Solution {}
```

```kotlin
// Sum Root to Leaf Numbers - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Sum Root to Leaf Numbers - Swift
func solve() -> Int { return 0 }
```

```dart
// Sum Root to Leaf Numbers - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
