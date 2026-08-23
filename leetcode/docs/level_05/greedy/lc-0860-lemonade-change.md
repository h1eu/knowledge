---
title: "860. Lemonade Change"
slug: "lc-0860-lemonade-change"
summary: "Greedy • Level 5 • Easy — Lemonade Change (LeetCode 860)"
tags: ["leetcode", "greedy", "easy", "level-5"]
topic_tags: ["array", "greedy"]
difficulty: "Easy"
pattern: "Greedy"
level: 5
leetcode_id: 860
url: "https://leetcode.com/problems/lemonade-change/"
---

# 860. Lemonade Change

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-easy">Easy</span> <span class="lc-pill lc-pill-pattern">Greedy</span> <span class="lc-pill lc-pill-level">Level 5</span> <a href="https://leetcode.com/problems/lemonade-change/" target="_blank">LeetCode 860 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Khách mua nước chanh 5 đô, trả bằng <code>5,10,20</code>, bạn cần thối đúng. Cho dãy <code>bills</code>, hãy xác định có thể thối cho tất cả khách không.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> bills = [5,5,5,10,20]
<strong>Đầu ra:</strong> true
<strong>Giải thích:</strong> 
From the first 3 customers, we collect three $5 bills in order.
From the fourth customer, we collect a $10 bill and give back a $5.
From the fifth customer, we give a $10 bill and a $5 bill.
Since all customers got correct change, we output true.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> bills = [5,5,10,10,20]
<strong>Đầu ra:</strong> false
<strong>Giải thích:</strong> 
From the first two customers in order, we collect two $5 bills.
For the next two customers in order, we collect a $10 bill and give back a $5 bill.
For the last customer, we can not give the change of $15 back because we only have two $10 bills.
Since not every customer received the correct change, the answer is false.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= bills.length &lt;= 10<sup>5</sup></code></li>
	<li><code>bills[i]</code> is either <code>5</code>, <code>10</code>, or <code>20</code>.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Greedy**.

## 💻 Code 5 ngôn ngữ

```cpp
// Lemonade Change - C++
class Solution {}
```

```java
// Lemonade Change - Java
class Solution {}
```

```kotlin
// Lemonade Change - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Lemonade Change - Swift
func solve() -> Int { return 0 }
```

```dart
// Lemonade Change - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
