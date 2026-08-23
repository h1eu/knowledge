---
title: "677. Map Sum Pairs"
slug: "lc-0677-map-sum-pairs"
summary: "Trie • Level 3 • Medium — Map Sum Pairs (LeetCode 677)"
tags: ["leetcode", "trie", "medium", "level-3"]
topic_tags: ["hash-table", "string", "design", "trie"]
difficulty: "Medium"
pattern: "Trie"
level: 3
leetcode_id: 677
url: "https://leetcode.com/problems/map-sum-pairs/"
---

# 677. Map Sum Pairs

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Trie</span> <span class="lc-pill lc-pill-level">Level 3</span> <a href="https://leetcode.com/problems/map-sum-pairs/" target="_blank">LeetCode 677 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Thiết kế <code>MapSum</code> hỗ trợ <code>insert(key, val)</code> (ghi đè nếu tồn tại) và <code>sum(prefix)</code> trả về tổng giá trị của mọi key có tiền tố <code>prefix</code>.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào</strong>
[&quot;MapSum&quot;, &quot;insert&quot;, &quot;sum&quot;, &quot;insert&quot;, &quot;sum&quot;]
[[], [&quot;apple&quot;, 3], [&quot;ap&quot;], [&quot;app&quot;, 2], [&quot;ap&quot;]]
<strong>Đầu ra</strong>
[null, null, 3, null, 5]

<strong>Giải thích</strong>
MapSum mapSum = new MapSum();
mapSum.insert(&quot;apple&quot;, 3);  
mapSum.sum(&quot;ap&quot;);           // return 3 (<u>ap</u>ple = 3)
mapSum.insert(&quot;app&quot;, 2);    
mapSum.sum(&quot;ap&quot;);           // return 5 (<u>ap</u>ple + <u>ap</u>p = 3 + 2 = 5)
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= key.length, prefix.length &lt;= 50</code></li>
	<li><code>key</code> and <code>prefix</code> consist of only lowercase English letters.</li>
	<li><code>1 &lt;= val &lt;= 1000</code></li>
	<li>At most <code>50</code> calls will be made to <code>insert</code> and <code>sum</code>.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Trie**.

## 💻 Code 5 ngôn ngữ

```cpp
// Map Sum Pairs - C++
class Solution {}
```

```java
// Map Sum Pairs - Java
class Solution {}
```

```kotlin
// Map Sum Pairs - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Map Sum Pairs - Swift
func solve() -> Int { return 0 }
```

```dart
// Map Sum Pairs - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
