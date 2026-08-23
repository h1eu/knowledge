---
title: "981. Time Based Key-Value Store"
slug: "lc-0981-time-based-key-value-store"
summary: "Binary Search • Level 1 • Medium — Time Based Key-Value Store (LeetCode 981)"
tags: ["leetcode", "binary-search", "medium", "level-1"]
topic_tags: ["hash-table", "string", "binary-search", "design"]
difficulty: "Medium"
pattern: "Binary Search"
level: 1
leetcode_id: 981
url: "https://leetcode.com/problems/time-based-key-value-store/"
---

# 981. Time Based Key-Value Store

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Binary Search</span> <span class="lc-pill lc-pill-level">Level 1</span> <a href="https://leetcode.com/problems/time-based-key-value-store/" target="_blank">LeetCode 981 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Thiết kế cấu trúc dữ liệu lưu trữ key-value theo thời gian: có thể lưu nhiều giá trị cho cùng một key tại các timestamp khác nhau và truy vấn giá trị của key tại một timestamp cho trước.</p>

<p>Hiện thực lớp <code>TimeMap</code>:</p>
<ul>
	<li><code>TimeMap()</code> khởi tạo.</li>
	<li><code>void set(String key, String value, int timestamp)</code> lưu cặp <code>(key, value)</code> tại <code>timestamp</code>.</li>
	<li><code>String get(String key, int timestamp)</code> trả về giá trị của <code>key</code> tại thời điểm <code>timestamp</code> lớn nhất ≤ <code>timestamp</code> đã cho, nếu không có thì <code>""</code>.</li>
</ul>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào</strong>
[&quot;TimeMap&quot;, &quot;set&quot;, &quot;get&quot;, &quot;get&quot;, &quot;set&quot;, &quot;get&quot;, &quot;get&quot;]
[[], [&quot;foo&quot;, &quot;bar&quot;, 1], [&quot;foo&quot;, 1], [&quot;foo&quot;, 3], [&quot;foo&quot;, &quot;bar2&quot;, 4], [&quot;foo&quot;, 4], [&quot;foo&quot;, 5]]
<strong>Đầu ra</strong>
[null, null, &quot;bar&quot;, &quot;bar&quot;, null, &quot;bar2&quot;, &quot;bar2&quot;]

<strong>Giải thích</strong>
TimeMap timeMap = new TimeMap();
timeMap.set(&quot;foo&quot;, &quot;bar&quot;, 1);  // store the key &quot;foo&quot; and value &quot;bar&quot; along with timestamp = 1.
timeMap.get(&quot;foo&quot;, 1);         // return &quot;bar&quot;
timeMap.get(&quot;foo&quot;, 3);         // return &quot;bar&quot;, since there is no value corresponding to foo at timestamp 3 and timestamp 2, then the only value is at timestamp 1 is &quot;bar&quot;.
timeMap.set(&quot;foo&quot;, &quot;bar2&quot;, 4); // store the key &quot;foo&quot; and value &quot;bar2&quot; along with timestamp = 4.
timeMap.get(&quot;foo&quot;, 4);         // return &quot;bar2&quot;
timeMap.get(&quot;foo&quot;, 5);         // return &quot;bar2&quot;
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= key.length, value.length &lt;= 100</code></li>
	<li><code>key</code> and <code>value</code> consist of lowercase English letters and digits.</li>
	<li><code>1 &lt;= timestamp &lt;= 10<sup>7</sup></code></li>
	<li>All the timestamps <code>timestamp</code> of <code>set</code> are strictly increasing.</li>
	<li>At most <code>2 * 10<sup>5</sup></code> calls will be made to <code>set</code> and <code>get</code>.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Binary Search**.

## 💻 Code 5 ngôn ngữ

```cpp
// Time Based Key-Value Store - C++
class Solution {}
```

```java
// Time Based Key-Value Store - Java
class Solution {}
```

```kotlin
// Time Based Key-Value Store - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Time Based Key-Value Store - Swift
func solve() -> Int { return 0 }
```

```dart
// Time Based Key-Value Store - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
