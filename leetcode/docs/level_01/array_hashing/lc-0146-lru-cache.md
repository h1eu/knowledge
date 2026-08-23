---
title: "146. LRU Cache"
slug: "lc-0146-lru-cache"
summary: "Array & Hashing • Level 1 • Medium — LRU Cache (LeetCode 146)"
tags: ["leetcode", "array-hashing", "medium", "level-1"]
topic_tags: ["hash-table", "linked-list", "design", "doubly-linked-list"]
difficulty: "Medium"
pattern: "Array & Hashing"
level: 1
leetcode_id: 146
url: "https://leetcode.com/problems/lru-cache/"
---

# 146. LRU Cache

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Array & Hashing</span> <span class="lc-pill lc-pill-level">Level 1</span> <a href="https://leetcode.com/problems/lru-cache/" target="_blank">LeetCode 146 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Thiết kế cấu trúc dữ liệu thỏa mãn các ràng buộc của <strong>LRU Cache (Least Recently Used)</strong>.</p>

<p>Hiện thực lớp <code>LRUCache</code>:</p>
<ul>
	<li><code>LRUCache(int capacity)</code> khởi tạo với dung lượng dương <code>capacity</code>.</li>
	<li><code>int get(int key)</code> trả về giá trị của <code>key</code> nếu tồn tại, ngược lại <code>-1</code>.</li>
	<li><code>void put(int key, int value)</code> cập nhật hoặc thêm cặp <code>key-value</code>; nếu vượt <code>capacity</code> thì loại bỏ khóa ít dùng nhất.</li>
</ul>

<p>Các hàm <code>get</code> và <code>put</code> phải chạy trung bình <code>O(1)</code>.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào</strong>
[&quot;LRUCache&quot;, &quot;put&quot;, &quot;put&quot;, &quot;get&quot;, &quot;put&quot;, &quot;get&quot;, &quot;put&quot;, &quot;get&quot;, &quot;get&quot;, &quot;get&quot;]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
<strong>Đầu ra</strong>
[null, null, null, 1, null, -1, null, -1, 3, 4]

<strong>Giải thích</strong>
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= capacity &lt;= 3000</code></li>
	<li><code>0 &lt;= key &lt;= 10<sup>4</sup></code></li>
	<li><code>0 &lt;= value &lt;= 10<sup>5</sup></code></li>
	<li>At most <code>2 * 10<sup>5</sup></code> calls will be made to <code>get</code> and <code>put</code>.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Array & Hashing**.

## 💻 Code 5 ngôn ngữ

```cpp
// LRU Cache - C++
class Solution {}
```

```java
// LRU Cache - Java
class Solution {}
```

```kotlin
// LRU Cache - Kotlin
fun solve(): Int { return 0 }
```

```swift
// LRU Cache - Swift
func solve() -> Int { return 0 }
```

```dart
// LRU Cache - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
