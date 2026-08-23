---
title: "1707. Maximum XOR With an Element From Array"
slug: "lc-1707-maximum-xor-with-an-element-fr"
summary: "Trie • Level 3 • Hard — Maximum XOR With an Element From Array (LeetCode 1707)"
tags: ["leetcode", "trie", "hard", "level-3"]
topic_tags: ["array", "bit-manipulation", "trie"]
difficulty: "Hard"
pattern: "Trie"
level: 3
leetcode_id: 1707
url: "https://leetcode.com/problems/maximum-xor-with-an-element-from-array/"
---

# 1707. Maximum XOR With an Element From Array

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-hard">Hard</span> <span class="lc-pill lc-pill-pattern">Trie</span> <span class="lc-pill lc-pill-level">Level 3</span> <a href="https://leetcode.com/problems/maximum-xor-with-an-element-from-array/" target="_blank">LeetCode 1707 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho mảng <code>nums</code> và các truy vấn <code>queries[i] = [xi, mi]</code>, với mỗi truy vấn hãy tìm giá trị <code>xi XOR yi</code> lớn nhất với <code>yi</code> trong <code>nums</code> và <code>yi ≤ mi</code>, nếu không có thì <code>-1</code>.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> nums = [0,1,2,3,4], queries = [[3,1],[1,3],[5,6]]
<strong>Đầu ra:</strong> [3,3,7]
<strong>Giải thích:</strong>
1) 0 and 1 are the only two integers not greater than 1. 0 XOR 3 = 3 and 1 XOR 3 = 2. The larger of the two is 3.
2) 1 XOR 2 = 3.
3) 5 XOR 2 = 7.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> nums = [5,2,4,6,6,3], queries = [[12,4],[8,1],[6,3]]
<strong>Đầu ra:</strong> [15,-1,5]
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length, queries.length &lt;= 10<sup>5</sup></code></li>
	<li><code>queries[i].length == 2</code></li>
	<li><code>0 &lt;= nums[j], x<sub>i</sub>, m<sub>i</sub> &lt;= 10<sup>9</sup></code></li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Trie**.

## 💻 Code 5 ngôn ngữ

```cpp
// Maximum XOR With Element From Array - C++
class Solution {}
```

```java
// Maximum XOR With Element From Array - Java
class Solution {}
```

```kotlin
// Maximum XOR With Element From Array - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Maximum XOR With Element From Array - Swift
func solve() -> Int { return 0 }
```

```dart
// Maximum XOR With Element From Array - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
