---
title: "460. LFU Cache"
slug: "lc-0460-lfu-cache"
summary: "Hard Mix • Level 5 • Hard — LFU Cache (LeetCode 460)"
tags: ["leetcode", "hard-mix", "hard", "level-5"]
topic_tags: ["hash-table", "linked-list", "design", "doubly-linked-list"]
difficulty: "Hard"
pattern: "Hard Mix"
level: 5
leetcode_id: 460
url: "https://leetcode.com/problems/lfu-cache/"
---

# 460. LFU Cache

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-hard">Hard</span> <span class="lc-pill lc-pill-pattern">Hard Mix</span> <span class="lc-pill lc-pill-level">Level 5</span> <a href="https://leetcode.com/problems/lfu-cache/" target="_blank">LeetCode 460 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Thiết kế <strong>LFU Cache</strong> với <code>get</code> và <code>put</code> trong <code>O(1)</code>, khi đầy thì loại bỏ khóa ít dùng nhất, nếu bằng nhau thì loại bỏ ít dùng gần nhất.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào</strong>
[&quot;LFUCache&quot;, &quot;put&quot;, &quot;put&quot;, &quot;get&quot;, &quot;put&quot;, &quot;get&quot;, &quot;get&quot;, &quot;put&quot;, &quot;get&quot;, &quot;get&quot;, &quot;get&quot;]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]]
<strong>Đầu ra</strong>
[null, null, null, 1, null, -1, 3, null, -1, 3, 4]

<strong>Giải thích</strong>
// cnt(x) = the use counter for key x
// cache=[] will show the last used order for tiebreakers (leftmost element is  most recent)
LFUCache lfu = new LFUCache(2);
lfu.put(1, 1);   // cache=[1,_], cnt(1)=1
lfu.put(2, 2);   // cache=[2,1], cnt(2)=1, cnt(1)=1
lfu.get(1);      // return 1
                 // cache=[1,2], cnt(2)=1, cnt(1)=2
lfu.put(3, 3);   // 2 is the LFU key because cnt(2)=1 is the smallest, invalidate 2.
&nbsp;                // cache=[3,1], cnt(3)=1, cnt(1)=2
lfu.get(2);      // return -1 (not found)
lfu.get(3);      // return 3
                 // cache=[3,1], cnt(3)=2, cnt(1)=2
lfu.put(4, 4);   // Both 1 and 3 have the same cnt, but 1 is LRU, invalidate 1.
                 // cache=[4,3], cnt(4)=1, cnt(3)=2
lfu.get(1);      // return -1 (not found)
lfu.get(3);      // return 3
                 // cache=[3,4], cnt(4)=1, cnt(3)=3
lfu.get(4);      // return 4
                 // cache=[4,3], cnt(4)=2, cnt(3)=3
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= capacity&nbsp;&lt;= 10<sup>4</sup></code></li>
	<li><code>0 &lt;= key &lt;= 10<sup>5</sup></code></li>
	<li><code>0 &lt;= value &lt;= 10<sup>9</sup></code></li>
	<li>At most <code>2 * 10<sup>5</sup></code>&nbsp;calls will be made to <code>get</code> and <code>put</code>.</li>
</ul>

<p>&nbsp;</p>
<span style="display: none;">&nbsp;</span>
</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Hard Mix**.

## 💻 Code 5 ngôn ngữ

```cpp
// LFU Cache - C++
class Solution {}
```

```java
// LFU Cache - Java
class Solution {}
```

```kotlin
// LFU Cache - Kotlin
fun solve(): Int { return 0 }
```

```swift
// LFU Cache - Swift
func solve() -> Int { return 0 }
```

```dart
// LFU Cache - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
