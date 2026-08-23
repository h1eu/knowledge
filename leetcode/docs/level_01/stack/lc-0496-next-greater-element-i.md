---
title: "496. Next Greater Element I"
slug: "lc-0496-next-greater-element-i"
summary: "Stack • Level 1 • Easy — Next Greater Element I (LeetCode 496)"
tags: ["leetcode", "stack", "easy", "level-1"]
topic_tags: ["array", "hash-table", "stack", "monotonic-stack"]
difficulty: "Easy"
pattern: "Stack"
level: 1
leetcode_id: 496
url: "https://leetcode.com/problems/next-greater-element-i/"
---

# 496. Next Greater Element I

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-easy">Easy</span> <span class="lc-pill lc-pill-pattern">Stack</span> <span class="lc-pill lc-pill-level">Level 1</span> <a href="https://leetcode.com/problems/next-greater-element-i/" target="_blank">LeetCode 496 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Phần tử kế lớn hơn (next greater) của một phần tử <code>x</code> trong mảng là phần tử lớn hơn đầu tiên ở bên phải <code>x</code> trong cùng mảng.</p>

<p>Cho hai mảng <code>nums1</code> (tập con của <code>nums2</code>), với mỗi phần tử trong <code>nums1</code> hãy tìm next greater của nó trong <code>nums2</code>. Nếu không có, trả về <code>-1</code>.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> nums1 = [4,1,2], nums2 = [1,3,4,2]
<strong>Đầu ra:</strong> [-1,3,-1]
<strong>Giải thích:</strong> The next greater element for each value of nums1 is as follows:
- 4 is underlined in nums2 = [1,3,<u>4</u>,2]. There is no next greater element, so the answer is -1.
- 1 is underlined in nums2 = [<u>1</u>,3,4,2]. The next greater element is 3.
- 2 is underlined in nums2 = [1,3,4,<u>2</u>]. There is no next greater element, so the answer is -1.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> nums1 = [2,4], nums2 = [1,2,3,4]
<strong>Đầu ra:</strong> [3,-1]
<strong>Giải thích:</strong> The next greater element for each value of nums1 is as follows:
- 2 is underlined in nums2 = [1,<u>2</u>,3,4]. The next greater element is 3.
- 4 is underlined in nums2 = [1,2,3,<u>4</u>]. There is no next greater element, so the answer is -1.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= nums1.length &lt;= nums2.length &lt;= 1000</code></li>
	<li><code>0 &lt;= nums1[i], nums2[i] &lt;= 10<sup>4</sup></code></li>
	<li>All integers in <code>nums1</code> and <code>nums2</code> are <strong>unique</strong>.</li>
	<li>All the integers of <code>nums1</code> also appear in <code>nums2</code>.</li>
</ul>

<p>&nbsp;</p>
<strong>Yêu cầu mở rộng:</strong> Could you find an <code>O(nums1.length + nums2.length)</code> solution?
</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Stack**.

## 💻 Code 5 ngôn ngữ

```cpp
// Next Greater Element I - C++
class Solution {}
```

```java
// Next Greater Element I - Java
class Solution {}
```

```kotlin
// Next Greater Element I - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Next Greater Element I - Swift
func solve() -> Int { return 0 }
```

```dart
// Next Greater Element I - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
