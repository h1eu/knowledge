---
title: "398. Random Pick Index"
slug: "lc-0398-random-pick-index"
summary: "Math & Geometry • Level 5 • Medium — Random Pick Index (LeetCode 398)"
tags: ["leetcode", "math-geometry", "medium", "level-5"]
topic_tags: ["hash-table", "math", "reservoir-sampling", "randomized"]
difficulty: "Medium"
pattern: "Math & Geometry"
level: 5
leetcode_id: 398
url: "https://leetcode.com/problems/random-pick-index/"
---

# 398. Random Pick Index

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Math & Geometry</span> <span class="lc-pill lc-pill-level">Level 5</span> <a href="https://leetcode.com/problems/random-pick-index/" target="_blank">LeetCode 398 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho mảng <code>nums</code> có thể chứa trùng, hãy thiết kế <code>pick(target)</code> trả về chỉ số ngẫu nhiên của <code>target</code> với xác suất đều.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào</strong>
[&quot;Solution&quot;, &quot;pick&quot;, &quot;pick&quot;, &quot;pick&quot;]
[[[1, 2, 3, 3, 3]], [3], [1], [3]]
<strong>Đầu ra</strong>
[null, 4, 0, 2]

<strong>Giải thích</strong>
Solution solution = new Solution([1, 2, 3, 3, 3]);
solution.pick(3); // It should return either index 2, 3, or 4 randomly. Each index should have equal probability of returning.
solution.pick(1); // It should return 0. Since in the array only nums[0] is equal to 1.
solution.pick(3); // It should return either index 2, 3, or 4 randomly. Each index should have equal probability of returning.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 2 * 10<sup>4</sup></code></li>
	<li><code>-2<sup>31</sup> &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>
	<li><code>target</code> is an integer from <code>nums</code>.</li>
	<li>At most <code>10<sup>4</sup></code> calls will be made to <code>pick</code>.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Math & Geometry**.

## 💻 Code 5 ngôn ngữ

```cpp
// Random Pick Index - C++
class Solution {}
```

```java
// Random Pick Index - Java
class Solution {}
```

```kotlin
// Random Pick Index - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Random Pick Index - Swift
func solve() -> Int { return 0 }
```

```dart
// Random Pick Index - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
