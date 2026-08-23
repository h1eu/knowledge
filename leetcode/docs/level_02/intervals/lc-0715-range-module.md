---
title: "715. Range Module"
slug: "lc-0715-range-module"
summary: "Intervals • Level 2 • Hard — Range Module (LeetCode 715)"
tags: ["leetcode", "intervals", "hard", "level-2"]
topic_tags: ["design", "segment-tree", "ordered-set"]
difficulty: "Hard"
pattern: "Intervals"
level: 2
leetcode_id: 715
url: "https://leetcode.com/problems/range-module/"
---

# 715. Range Module

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-hard">Hard</span> <span class="lc-pill lc-pill-pattern">Intervals</span> <span class="lc-pill lc-pill-level">Level 2</span> <a href="https://leetcode.com/problems/range-module/" target="_blank">LeetCode 715 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Thiết kế <code>RangeModule</code> quản lý các khoảng nửa mở <code>[left, right)</code>:</p>
<ul>
	<li><code>addRange(left, right)</code> thêm khoảng.</li>
	<li><code>queryRange(left, right)</code> kiểm tra khoảng có được phủ hoàn toàn không.</li>
	<li><code>removeRange(left, right)</code> xóa khoảng.</li>
</ul>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào</strong>
[&quot;RangeModule&quot;, &quot;addRange&quot;, &quot;removeRange&quot;, &quot;queryRange&quot;, &quot;queryRange&quot;, &quot;queryRange&quot;]
[[], [10, 20], [14, 16], [10, 14], [13, 15], [16, 17]]
<strong>Đầu ra</strong>
[null, null, null, true, false, true]

<strong>Giải thích</strong>
RangeModule rangeModule = new RangeModule();
rangeModule.addRange(10, 20);
rangeModule.removeRange(14, 16);
rangeModule.queryRange(10, 14); // return True,(Every number in [10, 14) is being tracked)
rangeModule.queryRange(13, 15); // return False,(Numbers like 14, 14.03, 14.17 in [13, 15) are not being tracked)
rangeModule.queryRange(16, 17); // return True, (The number 16 in [16, 17) is still being tracked, despite the remove operation)
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= left &lt; right &lt;= 10<sup>9</sup></code></li>
	<li>At most <code>10<sup>4</sup></code> calls will be made to <code>addRange</code>, <code>queryRange</code>, and <code>removeRange</code>.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Intervals**.

## 💻 Code 5 ngôn ngữ

```cpp
// Range Module - C++
class Solution {}
```

```java
// Range Module - Java
class Solution {}
```

```kotlin
// Range Module - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Range Module - Swift
func solve() -> Int { return 0 }
```

```dart
// Range Module - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
