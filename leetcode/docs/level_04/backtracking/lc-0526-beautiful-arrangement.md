---
title: "526. Beautiful Arrangement"
slug: "lc-0526-beautiful-arrangement"
summary: "Backtracking • Level 4 • Medium — Beautiful Arrangement (LeetCode 526)"
tags: ["leetcode", "backtracking", "medium", "level-4"]
topic_tags: ["array", "dynamic-programming", "backtracking", "bit-manipulation", "bitmask"]
difficulty: "Medium"
pattern: "Backtracking"
level: 4
leetcode_id: 526
url: "https://leetcode.com/problems/beautiful-arrangement/"
---

# 526. Beautiful Arrangement

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Backtracking</span> <span class="lc-pill lc-pill-level">Level 4</span> <a href="https://leetcode.com/problems/beautiful-arrangement/" target="_blank">LeetCode 526 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho số nguyên <code>n</code>, hãy đếm số hoán vị đẹp của <code>[1..n]</code> sao cho với mỗi <code>i</code>, <code>perm[i]</code> chia hết cho <code>i</code> hoặc <code>i</code> chia hết cho <code>perm[i]</code>.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> n = 2
<strong>Đầu ra:</strong> 2
<b>Explanation:</b> 
The first beautiful arrangement is [1,2]:
    - perm[1] = 1 is divisible by i = 1
    - perm[2] = 2 is divisible by i = 2
The second beautiful arrangement is [2,1]:
    - perm[1] = 2 is divisible by i = 1
    - i = 2 is divisible by perm[2] = 1
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> n = 1
<strong>Đầu ra:</strong> 1
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 15</code></li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Backtracking**.

## 💻 Code 5 ngôn ngữ

```cpp
// Beautiful Arrangement - C++
class Solution {}
```

```java
// Beautiful Arrangement - Java
class Solution {}
```

```kotlin
// Beautiful Arrangement - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Beautiful Arrangement - Swift
func solve() -> Int { return 0 }
```

```dart
// Beautiful Arrangement - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
