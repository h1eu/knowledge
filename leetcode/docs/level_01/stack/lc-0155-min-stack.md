---
title: "155. Min Stack"
slug: "lc-0155-min-stack"
summary: "Stack • Level 1 • Medium — Min Stack (LeetCode 155)"
tags: ["leetcode", "stack", "medium", "level-1"]
topic_tags: ["stack", "design"]
difficulty: "Medium"
pattern: "Stack"
level: 1
leetcode_id: 155
url: "https://leetcode.com/problems/min-stack/"
---

# 155. Min Stack

<div class="lc-problem-header">
  <span class="lc-pill lc-pill-medium">Medium</span> <span class="lc-pill lc-pill-pattern">Stack</span> <span class="lc-pill lc-pill-level">Level 1</span> <a href="https://leetcode.com/problems/min-stack/" target="_blank">LeetCode 155 ↗</a>
</div>

## 📋 Đề bài

<div class="lc-description"><p>Thiết kế ngăn xếp (stack) hỗ trợ <code>push</code>, <code>pop</code>, <code>top</code> và lấy phần tử nhỏ nhất trong <code>O(1)</code>.</p>

<p>Hiện thực lớp <code>MinStack</code>:</p>
<ul>
	<li><code>MinStack()</code> khởi tạo.</li>
	<li><code>void push(int val)</code> đẩy <code>val</code> vào stack.</li>
	<li><code>void pop()</code> xóa phần tử trên đỉnh.</li>
	<li><code>int top()</code> lấy phần tử trên đỉnh.</li>
	<li><code>int getMin()</code> lấy phần tử nhỏ nhất.</li>
</ul>

<p>&nbsp;</p><p><strong class="example">Ví dụ 1:</strong></p>

<pre>
<strong>Đầu vào</strong>
[&quot;MinStack&quot;,&quot;push&quot;,&quot;push&quot;,&quot;push&quot;,&quot;getMin&quot;,&quot;pop&quot;,&quot;top&quot;,&quot;getMin&quot;]
[[],[-2],[0],[-3],[],[],[],[]]

<strong>Đầu ra</strong>
[null,null,null,null,-3,null,0,-2]

<strong>Giải thích</strong>
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // return -3
minStack.pop();
minStack.top();    // return 0
minStack.getMin(); // return -2
</pre>

<p>&nbsp;</p>
<p><strong>Ràng buộc:</strong></p>

<ul>
	<li><code>-2<sup>31</sup> &lt;= val &lt;= 2<sup>31</sup> - 1</code></li>
	<li>Methods <code>pop</code>, <code>top</code> and <code>getMin</code> operations will always be called on <strong>non-empty</strong> stacks.</li>
	<li>At most <code>3 * 10<sup>4</sup></code> calls will be made to <code>push</code>, <code>pop</code>, <code>top</code>, and <code>getMin</code>.</li>
</ul>

</div>

## 🎯 Tiếp cận Pattern

Nhận diện khuôn mẫu **Stack**.

## 💻 Code 5 ngôn ngữ

```cpp
// Min Stack - C++
class Solution {}
```

```java
// Min Stack - Java
class Solution {}
```

```kotlin
// Min Stack - Kotlin
fun solve(): Int { return 0 }
```

```swift
// Min Stack - Swift
func solve() -> Int { return 0 }
```

```dart
// Min Stack - Dart
int solve() => 0;
```

## ✅ Checklist

- [ ] C++ - [ ] Java - [ ] Kotlin - [ ] Swift - [ ] Dart
