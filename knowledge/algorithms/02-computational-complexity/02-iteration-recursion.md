---
title: "Iteration and Recursion (Vòng lặp và Đệ quy)"
slug: "dsa-iteration-recursion"
summary: "So sánh hai cấu trúc điều khiển cơ bản để thực hiện các công việc lặp đi lặp lại trong chương trình."
tags: ['dsa', 'complexity']
prerequisites: ['dsa-performance']
related: ['dsa-time-complexity', 'dsa-space-complexity']
next: "dsa-time-complexity"
previous: "dsa-performance"
---


## Khái niệm cơ bản

Trong giải thuật, việc thực hiện lặp đi lặp lại một tác vụ là rất phổ biến. Có hai cấu trúc điều khiển cơ bản để lập trình hành vi lặp lại này: **Iteration (Vòng lặp)** và **Recursion (Đệ quy)**.

## Vòng lặp (Iteration)

**Iteration (Vòng lặp)** là cấu trúc lặp đi lặp lại một đoạn mã nguồn dưới một điều kiện nhất định cho đến khi điều kiện đó không còn thỏa mãn.

### Vòng lặp For (For Loop)

Vòng lặp `for` phù hợp nhất khi chúng ta đã biết trước số lần lặp.

Hàm sau tính tổng $1 + 2 + \dots + n$ bằng vòng lặp `for`:

=== "Python"

    ```python
    def for_loop(n: int) -> int:
        """for loop"""
        res = 0
        # Sum 1, 2, ..., n-1, n
        for i in range(1, n + 1):
            res += i
        return res
    ```

=== "C++"

    ```cpp
    int forLoop(int n) {
        int res = 0;
        // Sum 1, 2, ..., n-1, n
        for (int i = 1; i <= n; ++i) {
            res += i;
        }
        return res;
    }
    ```

=== "Java"

    ```java
    static int forLoop(int n) {
            int res = 0;
            // Sum 1, 2, ..., n-1, n
            for (int i = 1; i <= n; i++) {
                res += i;
            }
            return res;
        }
    ```

=== "C#"

    ```csharp
    int ForLoop(int n) {
            int res = 0;
            // Sum 1, 2, ..., n-1, n
            for (int i = 1; i <= n; i++) {
                res += i;
            }
            return res;
        }
    ```

=== "Go"

    ```go
    func forLoop(n int) int {
    	res := 0
    	// Sum 1, 2, ..., n-1, n
    	for i := 1; i <= n; i++ {
    		res += i
    	}
    	return res
    }
    ```

=== "Swift"

    ```swift
    func forLoop(n: Int) -> Int {
        var res = 0
        // Sum 1, 2, ..., n-1, n
        for i in 1 ... n {
            res += i
        }
        return res
    }
    ```

=== "JavaScript"

    ```javascript
    function forLoop(n) {
        let res = 0;
        // Sum 1, 2, ..., n-1, n
        for (let i = 1; i <= n; i++) {
            res += i;
        }
        return res;
    }
    ```

=== "TypeScript"

    ```typescript
    function forLoop(n: number): number {
        let res = 0;
        // Sum 1, 2, ..., n-1, n
        for (let i = 1; i <= n; i++) {
            res += i;
        }
        return res;
    }
    ```

=== "Dart"

    ```dart
    int forLoop(int n) {
      int res = 0;
      // Sum 1, 2, ..., n-1, n
      for (int i = 1; i <= n; i++) {
        res += i;
      }
      return res;
    }
    ```

=== "Rust"

    ```rust
    fn for_loop(n: i32) -> i32 {
        let mut res = 0;
        // Sum 1, 2, ..., n-1, n
        for i in 1..=n {
            res += i;
        }
        res
    }
    ```

=== "C"

    ```c
    int forLoop(int n) {
        int res = 0;
        // Sum 1, 2, ..., n-1, n
        for (int i = 1; i <= n; i++) {
            res += i;
        }
        return res;
    }
    ```

=== "Kotlin"

    ```kotlin
    fun forLoop(n: Int): Int {
        var res = 0
        // Sum 1, 2, ..., n-1, n
        for (i in 1..n) {
            res += i
        }
        return res
    }
    ```

=== "Ruby"

    ```ruby
    def for_loop(n)
      res = 0
    
      # Sum 1, 2, ..., n-1, n
      for i in 1..n
        res += i
      end
    
      res
    end
    ```

![Sơ đồ khối hàm tính tổng bằng vòng lặp](../../dsa-assets/iteration.png)

### Vòng lặp While (While Loop)

Vòng lặp `while` có tính linh hoạt cao hơn vòng lặp `for` vì điều kiện lặp có thể được tùy biến phức tạp hơn ở mỗi bước lặp.

Hàm tính tổng $1 + 2 + \dots + n$ bằng vòng lặp `while`:

=== "Python"

    ```python
    def while_loop(n: int) -> int:
        """while loop"""
        res = 0
        i = 1  # Initialize condition variable
        # Sum 1, 2, ..., n-1, n
        while i <= n:
            res += i
            i += 1  # Update condition variable
        return res
    ```

=== "C++"

    ```cpp
    int whileLoop(int n) {
        int res = 0;
        int i = 1; // Initialize condition variable
        // Sum 1, 2, ..., n-1, n
        while (i <= n) {
            res += i;
            i++; // Update condition variable
        }
        return res;
    }
    ```

=== "Java"

    ```java
    static int whileLoop(int n) {
            int res = 0;
            int i = 1; // Initialize condition variable
            // Sum 1, 2, ..., n-1, n
            while (i <= n) {
                res += i;
                i++; // Update condition variable
            }
            return res;
        }
    ```

=== "C#"

    ```csharp
    int WhileLoop(int n) {
            int res = 0;
            int i = 1; // Initialize condition variable
            // Sum 1, 2, ..., n-1, n
            while (i <= n) {
                res += i;
                i += 1; // Update condition variable
            }
            return res;
        }
    ```

=== "Go"

    ```go
    func whileLoop(n int) int {
    	res := 0
    	// Initialize condition variable
    	i := 1
    	// Sum 1, 2, ..., n-1, n
    	for i <= n {
    		res += i
    		// Update condition variable
    		i++
    	}
    	return res
    }
    ```

=== "Swift"

    ```swift
    func whileLoop(n: Int) -> Int {
        var res = 0
        var i = 1 // Initialize condition variable
        // Sum 1, 2, ..., n-1, n
        while i <= n {
            res += i
            i += 1 // Update condition variable
        }
        return res
    }
    ```

=== "JavaScript"

    ```javascript
    function whileLoop(n) {
        let res = 0;
        let i = 1; // Initialize condition variable
        // Sum 1, 2, ..., n-1, n
        while (i <= n) {
            res += i;
            i++; // Update condition variable
        }
        return res;
    }
    ```

=== "TypeScript"

    ```typescript
    function whileLoop(n: number): number {
        let res = 0;
        let i = 1; // Initialize condition variable
        // Sum 1, 2, ..., n-1, n
        while (i <= n) {
            res += i;
            i++; // Update condition variable
        }
        return res;
    }
    ```

=== "Dart"

    ```dart
    int whileLoop(int n) {
      int res = 0;
      int i = 1; // Initialize condition variable
      // Sum 1, 2, ..., n-1, n
      while (i <= n) {
        res += i;
        i++; // Update condition variable
      }
      return res;
    }
    ```

=== "Rust"

    ```rust
    fn while_loop(n: i32) -> i32 {
        let mut res = 0;
        let mut i = 1; // Initialize condition variable
    
        // Sum 1, 2, ..., n-1, n
        while i <= n {
            res += i;
            i += 1; // Update condition variable
        }
        res
    }
    ```

=== "C"

    ```c
    int whileLoop(int n) {
        int res = 0;
        int i = 1; // Initialize condition variable
        // Sum 1, 2, ..., n-1, n
        while (i <= n) {
            res += i;
            i++; // Update condition variable
        }
        return res;
    }
    ```

=== "Kotlin"

    ```kotlin
    fun whileLoop(n: Int): Int {
        var res = 0
        var i = 1 // Initialize condition variable
        // Sum 1, 2, ..., n-1, n
        while (i <= n) {
            res += i
            i++ // Update condition variable
        }
        return res
    }
    ```

=== "Ruby"

    ```ruby
    def while_loop(n)
      res = 0
      i = 1 # Initialize condition variable
    
      # Sum 1, 2, ..., n-1, n
      while i <= n
        res += i
        i += 1 # Update condition variable
      end
    
      res
    end
    ```

Ví dụ sau đây cập nhật biến điều kiện $i$ hai lần mỗi vòng lặp, việc này khó thực hiện thuận tiện bằng vòng lặp `for`:

=== "Python"

    ```python
    def while_loop_ii(n: int) -> int:
        """while loop (two updates)"""
        res = 0
        i = 1  # Initialize condition variable
        # Sum 1, 4, 10, ...
        while i <= n:
            res += i
            # Update condition variable
            i += 1
            i *= 2
        return res
    ```

=== "C++"

    ```cpp
    int whileLoopII(int n) {
        int res = 0;
        int i = 1; // Initialize condition variable
        // Sum 1, 4, 10, ...
        while (i <= n) {
            res += i;
            // Update condition variable
            i++;
            i *= 2;
        }
        return res;
    }
    ```

=== "Java"

    ```java
    static int whileLoopII(int n) {
            int res = 0;
            int i = 1; // Initialize condition variable
            // Sum 1, 4, 10, ...
            while (i <= n) {
                res += i;
                // Update condition variable
                i++;
                i *= 2;
            }
            return res;
        }
    ```

=== "C#"

    ```csharp
    int WhileLoopII(int n) {
            int res = 0;
            int i = 1; // Initialize condition variable
            // Sum 1, 4, 10, ...
            while (i <= n) {
                res += i;
                // Update condition variable
                i += 1; 
                i *= 2;
            }
            return res;
        }
    ```

=== "Go"

    ```go
    func whileLoopII(n int) int {
    	res := 0
    	// Initialize condition variable
    	i := 1
    	// Sum 1, 4, 10, ...
    	for i <= n {
    		res += i
    		// Update condition variable
    		i++
    		i *= 2
    	}
    	return res
    }
    ```

=== "Swift"

    ```swift
    func whileLoopII(n: Int) -> Int {
        var res = 0
        var i = 1 // Initialize condition variable
        // Sum 1, 4, 10, ...
        while i <= n {
            res += i
            // Update condition variable
            i += 1
            i *= 2
        }
        return res
    }
    ```

=== "JavaScript"

    ```javascript
    function whileLoopII(n) {
        let res = 0;
        let i = 1; // Initialize condition variable
        // Sum 1, 4, 10, ...
        while (i <= n) {
            res += i;
            // Update condition variable
            i++;
            i *= 2;
        }
        return res;
    }
    ```

=== "TypeScript"

    ```typescript
    function whileLoopII(n: number): number {
        let res = 0;
        let i = 1; // Initialize condition variable
        // Sum 1, 4, 10, ...
        while (i <= n) {
            res += i;
            // Update condition variable
            i++;
            i *= 2;
        }
        return res;
    }
    ```

=== "Dart"

    ```dart
    int whileLoopII(int n) {
      int res = 0;
      int i = 1; // Initialize condition variable
      // Sum 1, 4, 10, ...
      while (i <= n) {
        res += i;
        // Update condition variable
        i++;
        i *= 2;
      }
      return res;
    }
    ```

=== "Rust"

    ```rust
    fn while_loop_ii(n: i32) -> i32 {
        let mut res = 0;
        let mut i = 1; // Initialize condition variable
    
        // Sum 1, 4, 10, ...
        while i <= n {
            res += i;
            // Update condition variable
            i += 1;
            i *= 2;
        }
        res
    }
    ```

=== "C"

    ```c
    int whileLoopII(int n) {
        int res = 0;
        int i = 1; // Initialize condition variable
        // Sum 1, 4, 10, ...
        while (i <= n) {
            res += i;
            // Update condition variable
            i++;
            i *= 2;
        }
        return res;
    }
    ```

=== "Kotlin"

    ```kotlin
    fun whileLoopII(n: Int): Int {
        var res = 0
        var i = 1 // Initialize condition variable
        // Sum 1, 4, 10, ...
        while (i <= n) {
            res += i
            // Update condition variable
            i++
            i *= 2
        }
        return res
    }
    ```

=== "Ruby"

    ```ruby
    def while_loop_ii(n)
      res = 0
      i = 1 # Initialize condition variable
    
      # Sum 1, 4, 10, ...
      while i <= n
        res += i
        # Update condition variable
        i += 1
        i *= 2
      end
    
      res
    end
    ```

### Vòng lặp lồng nhau (Nested Loop)

Chúng ta có thể lồng một vòng lặp này bên trong một vòng lặp khác. Khi lồng hai vòng lặp `for`, số lần thực thi các phép toán sẽ tỷ lệ thuận với $n^2$ (quan hệ bình phương):

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="csharp" onclick="switchCodeTab(event, 'csharp')">C#</button><button class="code-tab-btn" data-lang="go" onclick="switchCodeTab(event, 'go')">Go</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="typescript" onclick="switchCodeTab(event, 'typescript')">TypeScript</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="rust" onclick="switchCodeTab(event, 'rust')">Rust</button><button class="code-tab-btn" data-lang="c" onclick="switchCodeTab(event, 'c')">C</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="ruby" onclick="switchCodeTab(event, 'ruby')">Ruby</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def nested_for_loop(n: int) -&gt; str:
    """Nested for loop"""
    res = ""
    # Loop i = 1, 2, ..., n-1, n
    for i in range(1, n + 1):
        # Loop j = 1, 2, ..., n-1, n
        for j in range(1, n + 1):
            res += f"({i}, {j}), "
    return res</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>string nestedForLoop(int n) {
    ostringstream res;
    // Loop i = 1, 2, ..., n-1, n
    for (int i = 1; i &lt;= n; ++i) {
        // Loop j = 1, 2, ..., n-1, n
        for (int j = 1; j &lt;= n; ++j) {
            res &lt;&lt; "(" &lt;&lt; i &lt;&lt; ", " &lt;&lt; j &lt;&lt; "), ";
        }
    }
    return res.str();
}</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>    static String nestedForLoop(int n) {
        StringBuilder res = new StringBuilder();
        // Loop i = 1, 2, ..., n-1, n
        for (int i = 1; i &lt;= n; i++) {
            // Loop j = 1, 2, ..., n-1, n
            for (int j = 1; j &lt;= n; j++) {
                res.append("(" + i + ", " + j + "), ");
            }
        }
        return res.toString();
    }</code></pre></div><div class="code-tab-content" data-lang="csharp"><pre data-lang="csharp"><code>    string NestedForLoop(int n) {
        StringBuilder res = new();
        // Loop i = 1, 2, ..., n-1, n
        for (int i = 1; i &lt;= n; i++) {
            // Loop j = 1, 2, ..., n-1, n
            for (int j = 1; j &lt;= n; j++) {
                res.Append($"({i}, {j}), ");
            }
        }
        return res.ToString();
    }</code></pre></div><div class="code-tab-content" data-lang="go"><pre data-lang="go"><code>func nestedForLoop(n int) string {
	res := ""
	// Loop i = 1, 2, ..., n-1, n
	for i := 1; i &lt;= n; i++ {
		for j := 1; j &lt;= n; j++ {
			// Loop j = 1, 2, ..., n-1, n
			res += fmt.Sprintf("(%d, %d), ", i, j)
		}
	}
	return res
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func nestedForLoop(n: Int) -&gt; String {
    var res = ""
    // Loop i = 1, 2, ..., n-1, n
    for i in 1 ... n {
        // Loop j = 1, 2, ..., n-1, n
        for j in 1 ... n {
            res.append("(\(i), \(j)), ")
        }
    }
    return res
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>function nestedForLoop(n) {
    let res = '';
    // Loop i = 1, 2, ..., n-1, n
    for (let i = 1; i &lt;= n; i++) {
        // Loop j = 1, 2, ..., n-1, n
        for (let j = 1; j &lt;= n; j++) {
            res += \
