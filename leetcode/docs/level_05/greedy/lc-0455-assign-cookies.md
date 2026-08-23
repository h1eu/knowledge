---
title: "455. Assign Cookies"
slug: "lc-0455-assign-cookies"
summary: "Greedy • Level 5 • Easy — Assign Cookies (LeetCode 455)"
tags: ["leetcode", "greedy", "easy", "level-5"]
topic_tags: ["array", "two-pointers", "greedy", "sorting", "quicksort"]
difficulty: "Easy"
pattern: "Greedy"
level: 5
leetcode_id: 455
url: "https://leetcode.com/problems/assign-cookies/"
---

# 455. Assign Cookies

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-easy">Easy</span> <span class="lc-pill lc-pill-pattern">Greedy</span> <span class="lc-pill lc-pill-level">Level 5</span> <a href="https://leetcode.com/problems/assign-cookies/" target="_blank">LeetCode 455 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho mảng trẻ <code>g</code> (độ tham) và bánh <code>s</code> (kích thước), mỗi trẻ nhận tối đa một bánh và chỉ hài lòng nếu <code>s[j] ≥ g[i]</code>. Hãy tối đa số trẻ hài lòng.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> g = [1,2,3], s = [1,1]
<strong>Đầu ra:</strong> 1
<strong>Giải thích:</strong> You have 3 children and 2 cookies. The greed factors of 3 children are 1, 2, 3. 
And even though you have 2 cookies, since their size is both 1, you could only make the child whose greed factor is 1 content.
You need to output 1.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> g = [1,2], s = [1,2,3]
<strong>Đầu ra:</strong> 2
<strong>Giải thích:</strong> You have 2 children and 3 cookies. The greed factors of 2 children are 1, 2. 
You have 3 cookies and their sizes are big enough to gratify all of the children, 
You need to output 2.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= g.length &lt;= 3 * 10<sup>4</sup></code></li>
	<li><code>0 &lt;= s.length &lt;= 3 * 10<sup>4</sup></code></li>
	<li><code>1 &lt;= g[i], s[j] &lt;= 2<sup>31</sup> - 1</code></li>
</ul>

<p>&nbsp;</p>
<p><strong>Lưu ý:</strong> This question is the same as <a href="https://leetcode.com/problems/maximum-matching-of-players-with-trainers/description/" target="_blank"> 2410: Maximum Matching of Players With Trainers.</a></p>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Greedy**.

## 💻 Code 5 ngôn ngữ

```cpp
// Assign Cookies - C++
class Solution {}
```

```java
// Assign Cookies - Java
class Solution {}
```

```kotlin
// Assign Cookies - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Assign Cookies - Swift
func solve() -> Int { return 0 }
```

```dart
// Assign Cookies - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
