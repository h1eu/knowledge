---
title: "740. Delete and Earn"
slug: "lc-0740-delete-and-earn"
summary: "1D DP • Level 5 • Medium — Delete and Earn (LeetCode 740)"
tags: ["leetcode", "1d-dp", "medium", "level-5"]
topic_tags: ["array", "hash-table", "dynamic-programming"]
difficulty: "Medium"
pattern: "1D DP"
level: 5
leetcode_id: 740
url: "https://leetcode.com/problems/delete-and-earn/"
---

# 740. Delete and Earn

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">1D DP</span> <span class="lc-pill lc-pill-level">Level 5</span> <a href="https://leetcode.com/problems/delete-and-earn/" target="_blank">LeetCode 740 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Cho mảng <code>nums</code>, nếu bạn lấy <code>nums[i]</code> thì phải xóa mọi phần tử bằng <code>nums[i]-1</code> và <code>nums[i]+1</code>. Hãy tìm điểm tối đa có thể kiếm được.</p>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào:</strong> nums = [3,4,2]
<strong>Đầu ra:</strong> 6
<strong>Giải thích:</strong> You can perform the following operations:
- Delete 4 to earn 4 points. Consequently, 3 is also deleted. nums = [2].
- Delete 2 to earn 2 points. nums = [].
You earn a total of 6 points.
</pre>

<p><strong class="example">Ví dụ 2:</strong></p>

<pre>
<strong>Đầu vào:</strong> nums = [2,2,3,3,3,4]
<strong>Đầu ra:</strong> 9
<strong>Giải thích:</strong> You can perform the following operations:
- Delete a 3 to earn 3 points. All 2&#39;s and 4&#39;s are also deleted. nums = [3,3].
- Delete a 3 again to earn 3 points. nums = [3].
- Delete a 3 once more to earn 3 points. nums = [].
You earn a total of 9 points.</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 2 * 10<sup>4</sup></code></li>
	<li><code>1 &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **1D DP**.

## 💻 Code 5 ngôn ngữ

```cpp
// Delete and Earn - C++
class Solution {}
```

```java
// Delete and Earn - Java
class Solution {}
```

```kotlin
// Delete and Earn - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Delete and Earn - Swift
func solve() -> Int { return 0 }
```

```dart
// Delete and Earn - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
