---
title: "165. Compare Version Numbers"
slug: "lc-0165-compare-version-numbers"
summary: "Array & Hashing • Level 1 • Medium — Compare Version Numbers (LeetCode 165)"
tags: ["leetcode", "array-hashing", "medium", "level-1"]
topic_tags: ["two-pointers", "string"]
difficulty: "Medium"
pattern: "Array & Hashing"
level: 1
leetcode_id: 165
url: "https://leetcode.com/problems/compare-version-numbers/"
---

# 165. Compare Version Numbers

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Array & Hashing</span> <span class="lc-pill lc-pill-level">Level 1</span> <a href="https://leetcode.com/problems/compare-version-numbers/" target="_blank">LeetCode 165 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho hai chuỗi số phiên bản <code>version1</code> và <code>version2</code>, mỗi chuỗi gồm các số cách nhau bởi <code>'.'</code>. Hãy so sánh và trả về <code>-1</code> nếu <code>version1 &lt; version2</code>, <code>1</code> nếu <code>version1 &gt; version2</code>, ngược lại <code>0</code>.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<div class="example-block">
<p><strong>Đầu vào:</strong> <span class="example-io">version1 = &quot;1.2&quot;, version2 = &quot;1.10&quot;</span></p>

<p><strong>Đầu ra:</strong> <span class="example-io">-1</span></p>

<p><strong>Giải thích:</strong></p>

<p>version1&#39;s second revision is &quot;2&quot; and version2&#39;s second revision is &quot;10&quot;: 2 &lt; 10, so version1 &lt; version2.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">version1 = &quot;1.01&quot;, version2 = &quot;1.001&quot;</span></p>

<p><strong>Output:</strong> <span class="example-io">0</span></p>

<p><strong>Explanation:</strong></p>

<p>Ignoring leading zeroes, both &quot;01&quot; and &quot;001&quot; represent the same integer &quot;1&quot;.</p>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">version1 = &quot;1.0&quot;, version2 = &quot;1.0.0.0&quot;</span></p>

<p><strong>Output:</strong> <span class="example-io">0</span></p>

<p><strong>Explanation:</strong></p>

<p>version1 has less revisions, which means every missing revision are treated as &quot;0&quot;.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= version1.length, version2.length &lt;= 500</code></li>
	<li><code>version1</code> and <code>version2</code>&nbsp;only contain digits and <code>&#39;.&#39;</code>.</li>
	<li><code>version1</code> and <code>version2</code>&nbsp;<strong>are valid version numbers</strong>.</li>
	<li>All the given revisions in&nbsp;<code>version1</code> and <code>version2</code>&nbsp;can be stored in&nbsp;a&nbsp;<strong>32-bit integer</strong>.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Array & Hashing**.

## 💻 Code 5 ngôn ngữ

```cpp
// Compare Version Numbers - C++
class Solution {}
```

```java
// Compare Version Numbers - Java
class Solution {}
```

```kotlin
// Compare Version Numbers - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Compare Version Numbers - Swift
func solve() -> Int { return 0 }
```

```dart
// Compare Version Numbers - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
