---
title: "382. Linked List Random Node"
slug: "lc-0382-linked-list-random-node"
summary: "Math & Geometry • Level 5 • Medium — Linked List Random Node (LeetCode 382)"
tags: ["leetcode", "math-geometry", "medium", "level-5"]
topic_tags: ["linked-list", "math", "reservoir-sampling", "randomized"]
difficulty: "Medium"
pattern: "Math & Geometry"
level: 5
leetcode_id: 382
url: "https://leetcode.com/problems/linked-list-random-node/"
---

# 382. Linked List Random Node

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Math & Geometry</span> <span class="lc-pill lc-pill-level">Level 5</span> <a href="https://leetcode.com/problems/linked-list-random-node/" target="_blank">LeetCode 382 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho đầu danh sách liên kết, hãy thiết kế lớp với <code>getRandom()</code> trả về giá trị node ngẫu nhiên với xác suất đều.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/16/getrand-linked-list.jpg" style="width: 302px; height: 62px;" />
<pre>
<strong>Đầu vào</strong>
[&quot;Solution&quot;, &quot;getRandom&quot;, &quot;getRandom&quot;, &quot;getRandom&quot;, &quot;getRandom&quot;, &quot;getRandom&quot;]
[[[1, 2, 3]], [], [], [], [], []]
<strong>Đầu ra</strong>
[null, 1, 3, 2, 2, 3]

<strong>Giải thích</strong>
Solution solution = new Solution([1, 2, 3]);
solution.getRandom(); // return 1
solution.getRandom(); // return 3
solution.getRandom(); // return 2
solution.getRandom(); // return 2
solution.getRandom(); // return 3
// getRandom() should return either 1, 2, or 3 randomly. Each element should have equal probability of returning.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li>The number of nodes in the linked list will be in the range <code>[1, 10<sup>4</sup>]</code>.</li>
	<li><code>-10<sup>4</sup> &lt;= Node.val &lt;= 10<sup>4</sup></code></li>
	<li>At most <code>10<sup>4</sup></code> calls will be made to <code>getRandom</code>.</li>
</ul>

<p>&nbsp;</p>
<p><strong>Yêu cầu mở rộng:</strong></p>

<ul>
	<li>What if the linked list is extremely large and its length is unknown to you?</li>
	<li>Could you solve this efficiently without using extra space?</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Math & Geometry**.

## 💻 Code 5 ngôn ngữ

```cpp
// Linked List Random Node - C++
class Solution {}
```

```java
// Linked List Random Node - Java
class Solution {}
```

```kotlin
// Linked List Random Node - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Linked List Random Node - Swift
func solve() -> Int { return 0 }
```

```dart
// Linked List Random Node - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
