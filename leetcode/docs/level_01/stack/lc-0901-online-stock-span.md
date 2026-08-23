---
title: "901. Online Stock Span"
slug: "lc-0901-online-stock-span"
summary: "Stack • Level 1 • Medium — Online Stock Span (LeetCode 901)"
tags: ["leetcode", "stack", "medium", "level-1"]
topic_tags: ["stack", "design", "monotonic-stack", "data-stream"]
difficulty: "Medium"
pattern: "Stack"
level: 1
leetcode_id: 901
url: "https://leetcode.com/problems/online-stock-span/"
---

# 901. Online Stock Span

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Stack</span> <span class="lc-pill lc-pill-level">Level 1</span> <a href="https://leetcode.com/problems/online-stock-span/" target="_blank">LeetCode 901 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Thiết kế lớp <code>StockSpanner</code> thu thập giá cổ phiếu hàng ngày và trả về span của giá đó: số ngày liên tiếp (kể cả hôm nay) mà giá ≤ giá hôm nay.</p>

<p>Hiện thực <code>int next(int price)</code>.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào</strong>
[&quot;StockSpanner&quot;, &quot;next&quot;, &quot;next&quot;, &quot;next&quot;, &quot;next&quot;, &quot;next&quot;, &quot;next&quot;, &quot;next&quot;]
[[], [100], [80], [60], [70], [60], [75], [85]]
<strong>Đầu ra</strong>
[null, 1, 1, 1, 2, 1, 4, 6]

<strong>Giải thích</strong>
StockSpanner stockSpanner = new StockSpanner();
stockSpanner.next(100); // return 1
stockSpanner.next(80);  // return 1
stockSpanner.next(60);  // return 1
stockSpanner.next(70);  // return 2
stockSpanner.next(60);  // return 1
stockSpanner.next(75);  // return 4, because the last 4 prices (including today&#39;s price of 75) were less than or equal to today&#39;s price.
stockSpanner.next(85);  // return 6
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= price &lt;= 10<sup>5</sup></code></li>
	<li>At most <code>10<sup>4</sup></code> calls will be made to <code>next</code>.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Stack**.

## 💻 Code 5 ngôn ngữ

```cpp
// Online Stock Span - C++
class Solution {}
```

```java
// Online Stock Span - Java
class Solution {}
```

```kotlin
// Online Stock Span - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Online Stock Span - Swift
func solve() -> Int { return 0 }
```

```dart
// Online Stock Span - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
