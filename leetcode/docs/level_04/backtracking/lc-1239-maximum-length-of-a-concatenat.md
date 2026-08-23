---
title: "1239. Maximum Length of a Concatenated String with Unique Characters"
slug: "lc-1239-maximum-length-of-a-concatenat"
summary: "Backtracking • Level 4 • Medium — Maximum Length of a Concatenated String with Unique Characters (LeetCode 1239)"
tags: ["leetcode", "backtracking", "medium", "level-4"]
topic_tags: ["array", "string", "backtracking", "bit-manipulation"]
difficulty: "Medium"
pattern: "Backtracking"
level: 4
leetcode_id: 1239
url: "https://leetcode.com/problems/maximum-length-of-a-concatenated-string-with-unique-characters/"
---

# 1239. Maximum Length of a Concatenated String with Unique Characters

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Backtracking</span> <span class="lc-pill lc-pill-level">Level 4</span> <a href="https://leetcode.com/problems/maximum-length-of-a-concatenated-string-with-unique-characters/" target="_blank">LeetCode 1239 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho mảng chuỗi <code>arr</code>, hãy tìm độ dài lớn nhất của chuỗi được tạo bằng cách nối một số chuỗi con của <code>arr</code> sao cho các ký tự trong chuỗi kết quả đều khác nhau.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> arr = [&quot;un&quot;,&quot;iq&quot;,&quot;ue&quot;]
<strong>Đầu ra:</strong> 4
<strong>Giải thích:</strong> All the valid concatenations are:
- &quot;&quot;
- &quot;un&quot;
- &quot;iq&quot;
- &quot;ue&quot;
- &quot;uniq&quot; (&quot;un&quot; + &quot;iq&quot;)
- &quot;ique&quot; (&quot;iq&quot; + &quot;ue&quot;)
Maximum length is 4.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> arr = [&quot;cha&quot;,&quot;r&quot;,&quot;act&quot;,&quot;ers&quot;]
<strong>Đầu ra:</strong> 6
<strong>Giải thích:</strong> Possible longest valid concatenations are &quot;chaers&quot; (&quot;cha&quot; + &quot;ers&quot;) and &quot;acters&quot; (&quot;act&quot; + &quot;ers&quot;).
</pre>

<p><strong class="example">Ví dụ 3:</strong></p>

<pre>
<strong>Đầu vào:</strong> arr = [&quot;abcdefghijklmnopqrstuvwxyz&quot;]
<strong>Đầu ra:</strong> 26
<strong>Giải thích:</strong> The only string in arr has all 26 characters.
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= arr.length &lt;= 16</code></li>
	<li><code>1 &lt;= arr[i].length &lt;= 26</code></li>
	<li><code>arr[i]</code> contains only lowercase English letters.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Backtracking**.

## 💻 Code 5 ngôn ngữ

```cpp
// Maximum Length of Concatenated String - C++
class Solution {}
```

```java
// Maximum Length of Concatenated String - Java
class Solution {}
```

```kotlin
// Maximum Length of Concatenated String - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Maximum Length of Concatenated String - Swift
func solve() -> Int { return 0 }
```

```dart
// Maximum Length of Concatenated String - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
