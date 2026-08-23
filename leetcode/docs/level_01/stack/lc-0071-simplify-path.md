---
title: "71. Simplify Path"
slug: "lc-0071-simplify-path"
summary: "Stack • Level 1 • Medium — Simplify Path (LeetCode 71)"
tags: ["leetcode", "stack", "medium", "level-1"]
topic_tags: ["string", "stack"]
difficulty: "Medium"
pattern: "Stack"
level: 1
leetcode_id: 71
url: "https://leetcode.com/problems/simplify-path/"
---

# 71. Simplify Path

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Stack</span> <span class="lc-pill lc-pill-level">Level 1</span> <a href="https://leetcode.com/problems/simplify-path/" target="_blank">LeetCode 71 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho chuỗi <code>path</code> là đường dẫn tuyệt đối Unix (bắt đầu bằng <code>'/'</code>), hãy rút gọn về dạng chuẩn (canonical): thay <code>'//'</code> bằng <code>'/'</code>, xử lý <code>'.'</code> (thư mục hiện tại) và <code>'..'</code> (thư mục cha).</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<div class="example-block">
<p><strong>Đầu vào:</strong> <span class="example-io">path = &quot;/home/&quot;</span></p>

<p><strong>Đầu ra:</strong> <span class="example-io">&quot;/home&quot;</span></p>

<p><strong>Giải thích:</strong></p>

<p>The trailing slash should be removed.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">path = &quot;/home//foo/&quot;</span></p>

<p><strong>Output:</strong> <span class="example-io">&quot;/home/foo&quot;</span></p>

<p><strong>Explanation:</strong></p>

<p>Multiple consecutive slashes are replaced by a single one.</p>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">path = &quot;/home/user/Documents/../Pictures&quot;</span></p>

<p><strong>Output:</strong> <span class="example-io">&quot;/home/user/Pictures&quot;</span></p>

<p><strong>Explanation:</strong></p>

<p>A double period <code>&quot;..&quot;</code> refers to the directory up a level (the parent directory).</p>
</div>

<p><strong class="example">Example 4:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">path = &quot;/../&quot;</span></p>

<p><strong>Output:</strong> <span class="example-io">&quot;/&quot;</span></p>

<p><strong>Explanation:</strong></p>

<p>Going one level up from the root directory is not possible.</p>
</div>

<p><strong class="example">Example 5:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">path = &quot;/.../a/../b/c/../d/./&quot;</span></p>

<p><strong>Output:</strong> <span class="example-io">&quot;/.../b/d&quot;</span></p>

<p><strong>Explanation:</strong></p>

<p><code>&quot;...&quot;</code> is a valid name for a directory in this problem.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= path.length &lt;= 3000</code></li>
	<li><code>path</code> consists of English letters, digits, period <code>&#39;.&#39;</code>, slash <code>&#39;/&#39;</code> or <code>&#39;_&#39;</code>.</li>
	<li><code>path</code> is a valid absolute Unix path.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Stack**.

## 💻 Code 5 ngôn ngữ

```cpp
// Simplify Path - C++
class Solution {}
```

```java
// Simplify Path - Java
class Solution {}
```

```kotlin
// Simplify Path - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Simplify Path - Swift
func solve() -> Int { return 0 }
```

```dart
// Simplify Path - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
