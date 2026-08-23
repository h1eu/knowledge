---
title: "160. Intersection of Two Linked Lists"
slug: "lc-0160-intersection-of-two-linked-lis"
summary: "Linked List • Level 2 • Easy — Intersection of Two Linked Lists (LeetCode 160)"
tags: ["leetcode", "linked-list", "easy", "level-2"]
topic_tags: ["hash-table", "linked-list", "two-pointers"]
difficulty: "Easy"
pattern: "Linked List"
level: 2
leetcode_id: 160
url: "https://leetcode.com/problems/intersection-of-two-linked-lists/"
---

# 160. Intersection of Two Linked Lists

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-easy">Easy</span> <span class="lc-pill lc-pill-pattern">Linked List</span> <span class="lc-pill lc-pill-level">Level 2</span> <a href="https://leetcode.com/problems/intersection-of-two-linked-lists/" target="_blank">LeetCode 160 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho đầu hai danh sách liên kết đơn <code>headA</code> và <code>headB</code>, hãy trả về node giao nhau (node mà hai danh sách cùng tham chiếu). Nếu không giao, trả về <code>null</code>.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/05/160_example_1_1.png" style="width: 500px; height: 162px;" />
<pre>
<strong>Đầu vào:</strong> intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3
<strong>Đầu ra:</strong> Intersected at &#39;8&#39;
<strong>Giải thích:</strong> The intersected node&#39;s value is 8 (note that this must not be 0 if the two lists intersect).
From the head of A, it reads as [4,1,8,4,5]. From the head of B, it reads as [5,6,1,8,4,5]. There are 2 nodes before the intersected node in A; There are 3 nodes before the intersected node in B.
- Note that the intersected node&#39;s value is not 1 because the nodes with value 1 in A and B (2<sup>nd</sup> node in A and 3<sup>rd</sup> node in B) are different node references. In other words, they point to two different locations in memory, while the nodes with value 8 in A and B (3<sup>rd</sup> node in A and 4<sup>th</sup> node in B) point to the same location in memory.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/05/160_example_2.png" style="width: 500px; height: 194px;" />
<pre>
<strong>Đầu vào:</strong> intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
<strong>Đầu ra:</strong> Intersected at &#39;2&#39;
<strong>Giải thích:</strong> The intersected node&#39;s value is 2 (note that this must not be 0 if the two lists intersect).
From the head of A, it reads as [1,9,1,2,4]. From the head of B, it reads as [3,2,4]. There are 3 nodes before the intersected node in A; There are 1 node before the intersected node in B.
</pre>

<p><strong class="example">Ví dụ 3:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/05/160_example_3.png" style="width: 300px; height: 189px;" />
<pre>
<strong>Đầu vào:</strong> intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
<strong>Đầu ra:</strong> No intersection
<strong>Giải thích:</strong> From the head of A, it reads as [2,6,4]. From the head of B, it reads as [1,5]. Since the two lists do not intersect, intersectVal must be 0, while skipA and skipB can be arbitrary values.
Explanation: The two lists do not intersect, so return null.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li>The number of nodes of <code>listA</code> is in the <code>m</code>.</li>
	<li>The number of nodes of <code>listB</code> is in the <code>n</code>.</li>
	<li><code>1 &lt;= m, n &lt;= 3 * 10<sup>4</sup></code></li>
	<li><code>1 &lt;= Node.val &lt;= 10<sup>5</sup></code></li>
	<li><code>0 &lt;= skipA &lt;= m</code></li>
	<li><code>0 &lt;= skipB &lt;= n</code></li>
	<li><code>intersectVal</code> is <code>0</code> if <code>listA</code> and <code>listB</code> do not intersect.</li>
	<li><code>intersectVal == listA[skipA] == listB[skipB]</code> if <code>listA</code> and <code>listB</code> intersect.</li>
</ul>

<p>&nbsp;</p>
<strong>Yêu cầu mở rộng:</strong> Could you write a solution that runs in <code>O(m + n)</code> time and use only <code>O(1)</code> memory?
</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Linked List**.

## 💻 Code 5 ngôn ngữ

```cpp
// Intersection of Two Linked Lists - C++
class Solution {}
```

```java
// Intersection of Two Linked Lists - Java
class Solution {}
```

```kotlin
// Intersection of Two Linked Lists - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Intersection of Two Linked Lists - Swift
func solve() -> Int { return 0 }
```

```dart
// Intersection of Two Linked Lists - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
