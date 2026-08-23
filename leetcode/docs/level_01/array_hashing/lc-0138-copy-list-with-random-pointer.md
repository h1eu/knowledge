---
title: "138. Copy List with Random Pointer"
slug: "lc-0138-copy-list-with-random-pointer"
summary: "Array & Hashing • Level 1 • Medium — Copy List with Random Pointer (LeetCode 138)"
tags: ["leetcode", "array-hashing", "medium", "level-1"]
topic_tags: ["hash-table", "linked-list"]
difficulty: "Medium"
pattern: "Array & Hashing"
level: 1
leetcode_id: 138
url: "https://leetcode.com/problems/copy-list-with-random-pointer/"
---

# 138. Copy List with Random Pointer

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Array & Hashing</span> <span class="lc-pill lc-pill-level">Level 1</span> <a href="https://leetcode.com/problems/copy-list-with-random-pointer/" target="_blank">LeetCode 138 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho danh sách liên kết độ dài <code>n</code>, mỗi node có thêm con trỏ <code>random</code> có thể trỏ tới bất kỳ node nào trong danh sách hoặc <code>null</code>.</p>

<p>Hãy tạo <strong>bản sao sâu (deep copy)</strong> của danh sách: bản sao gồm đúng <code>n</code> node mới, mỗi node mới có giá trị bằng node gốc tương ứng, và cả <code>next</code> lẫn <code>random</code> đều trỏ tới các node mới sao cho trạng thái danh sách được giữ nguyên. Không có con trỏ nào trong danh sách mới được trỏ tới node của danh sách gốc.</p>

<p>Danh sách được biểu diễn ở đầu vào/đầu ra như danh sách <code>n</code> node, mỗi node là cặp <code>[val, random_index]</code>.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2019/12/18/e1.png" style="width: 700px; height: 142px;" />
<pre>
<strong>Đầu vào:</strong> head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
<strong>Đầu ra:</strong> [[7,null],[13,0],[11,4],[10,2],[1,0]]
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2019/12/18/e2.png" style="width: 700px; height: 114px;" />
<pre>
<strong>Đầu vào:</strong> head = [[1,1],[2,1]]
<strong>Đầu ra:</strong> [[1,1],[2,1]]
</pre>

<p><strong class="example">Ví dụ 3:</strong></p>

<p><strong><img alt="" src="https://assets.leetcode.com/uploads/2019/12/18/e3.png" style="width: 700px; height: 122px;" /></strong></p>

<pre>
<strong>Đầu vào:</strong> head = [[3,null],[3,0],[3,null]]
<strong>Đầu ra:</strong> [[3,null],[3,0],[3,null]]
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>0 &lt;= n &lt;= 1000</code></li>
	<li><code>-10<sup>4</sup> &lt;= Node.val &lt;= 10<sup>4</sup></code></li>
	<li><code>Node.random</code> is <code>null</code> or is pointing to some node in the linked list.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Array & Hashing**.

## 💻 Code 5 ngôn ngữ

```cpp
// Copy List with Random Pointer - C++
class Solution {}
```

```java
// Copy List with Random Pointer - Java
class Solution {}
```

```kotlin
// Copy List with Random Pointer - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Copy List with Random Pointer - Swift
func solve() -> Int { return 0 }
```

```dart
// Copy List with Random Pointer - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
