---
title: "Time Complexity (Độ phức tạp Thời gian)"
slug: "dsa-time-complexity"
summary: "Đánh giá tốc độ thực thi của giải thuật bằng Big-O notation, tìm hiểu các cấp độ phức tạp phổ biến từ O(1) đến O(n!)."
tags: ['dsa', 'complexity']
prerequisites: ['dsa-iteration-recursion']
related: ['dsa-space-complexity']
next: "dsa-space-complexity"
previous: "dsa-iteration-recursion"
---


## Giới thiệu về Time Complexity

**Time Complexity (Độ phức tạp thời gian)** không đo thời gian chạy thực tế bằng giây mà đo **tốc độ tăng trưởng của số lượng phép toán** khi kích thước dữ liệu đầu vào $n$ tăng lên.

Chúng ta ký hiệu độ phức tạp bằng **Big-O Notation (Ký hiệu O lớn)**, đại diện cho tiệm cận giới hạn trên của tốc độ tăng trưởng.

![Các đường cong độ phức tạp thời gian phổ biến](../../dsa-assets/time_complexity_curves.png)

## Các cấp độ phức tạp thời gian phổ biến

### 1. Độ phức tạp hằng số $O(1)$

Số lượng phép toán không phụ thuộc vào kích thước dữ liệu đầu vào $n$:

=== "Python"

    ```python
    def constant(n: int) -> int:
        """Constant order"""
        count = 0
        size = 100000
        for _ in range(size):
            count += 1
        return count
    ```

=== "C++"

    ```cpp
    int constant(int n) {
        int count = 0;
        int size = 100000;
        for (int i = 0; i < size; i++)
            count++;
        return count;
    }
    ```

=== "Java"

    ```java
    static int constant(int n) {
            int count = 0;
            int size = 100000;
            for (int i = 0; i < size; i++)
                count++;
            return count;
        }
    ```

=== "C#"

    ```csharp
    int Constant(int n) {
            int count = 0;
            int size = 100000;
            for (int i = 0; i < size; i++)
                count++;
            return count;
        }
    ```

=== "Go"

    ```go
    func constant(n int) int {
    	count := 0
    	size := 100000
    	for i := 0; i < size; i++ {
    		count++
    	}
    	return count
    }
    ```

=== "Swift"

    ```swift
    func constant(n: Int) -> Int {
        var count = 0
        let size = 100_000
        for _ in 0 ..< size {
            count += 1
        }
        return count
    }
    ```

=== "JavaScript"

    ```javascript
    function constant(n) {
        let count = 0;
        const size = 100000;
        for (let i = 0; i < size; i++) count++;
        return count;
    }
    ```

=== "TypeScript"

    ```typescript
    function constant(n: number): number {
        let count = 0;
        const size = 100000;
        for (let i = 0; i < size; i++) count++;
        return count;
    }
    ```

=== "Dart"

    ```dart
    int constant(int n) {
      int count = 0;
      int size = 100000;
      for (var i = 0; i < size; i++) {
        count++;
      }
      return count;
    }
    ```

=== "Rust"

    ```rust
    fn constant(n: i32) -> i32 {
        _ = n;
        let mut count = 0;
        let size = 100_000;
        for _ in 0..size {
            count += 1;
        }
        count
    }
    ```

=== "C"

    ```c
    int constant(int n) {
        int count = 0;
        int size = 100000;
        int i = 0;
        for (int i = 0; i < size; i++) {
            count++;
        }
        return count;
    }
    ```

=== "Kotlin"

    ```kotlin
    fun constant(n: Int): Int {
        var count = 0
        val size = 100000
        for (i in 0..<size)
            count++
        return count
    }
    ```

=== "Ruby"

    ```ruby
    def constant(n)
      count = 0
      size = 100000
    
      (0...size).each { count += 1 }
    
      count
    end
    ```

### 2. Độ phức tạp tuyến tính $O(n)$

Số lượng phép toán tăng tuyến tính theo kích thước dữ liệu $n$, thường xuất hiện trong các vòng lặp đơn để duyệt qua mảng:

=== "Python"

    ```python
    def linear(n: int) -> int:
        """Linear order"""
        count = 0
        for _ in range(n):
            count += 1
        return count
    ```

=== "C++"

    ```cpp
    int linear(int n) {
        int count = 0;
        for (int i = 0; i < n; i++)
            count++;
        return count;
    }
    ```

=== "Java"

    ```java
    static int linear(int n) {
            int count = 0;
            for (int i = 0; i < n; i++)
                count++;
            return count;
        }
    ```

=== "C#"

    ```csharp
    int Linear(int n) {
            int count = 0;
            for (int i = 0; i < n; i++)
                count++;
            return count;
        }
    ```

=== "Go"

    ```go
    func linear(n int) int {
    	count := 0
    	for i := 0; i < n; i++ {
    		count++
    	}
    	return count
    }
    ```

=== "Swift"

    ```swift
    func linear(n: Int) -> Int {
        var count = 0
        for _ in 0 ..< n {
            count += 1
        }
        return count
    }
    ```

=== "JavaScript"

    ```javascript
    function linear(n) {
        let count = 0;
        for (let i = 0; i < n; i++) count++;
        return count;
    }
    ```

=== "TypeScript"

    ```typescript
    function linear(n: number): number {
        let count = 0;
        for (let i = 0; i < n; i++) count++;
        return count;
    }
    ```

=== "Dart"

    ```dart
    int linear(int n) {
      int count = 0;
      for (var i = 0; i < n; i++) {
        count++;
      }
      return count;
    }
    ```

=== "Rust"

    ```rust
    fn linear(n: i32) -> i32 {
        let mut count = 0;
        for _ in 0..n {
            count += 1;
        }
        count
    }
    ```

=== "C"

    ```c
    int linear(int n) {
        int count = 0;
        for (int i = 0; i < n; i++) {
            count++;
        }
        return count;
    }
    ```

=== "Kotlin"

    ```kotlin
    fun linear(n: Int): Int {
        var count = 0
        for (i in 0..<n)
            count++
        return count
    }
    ```

=== "Ruby"

    ```ruby
    def linear(n)
      count = 0
      (0...n).each { count += 1 }
      count
    end
    ```

### 3. Độ phức tạp bình phương $O(n^2)$

Thường xuất hiện trong các thuật toán có hai vòng lặp lồng nhau duyệt qua dữ liệu, ví dụ thuật toán sắp xếp nổi bọt (Bubble Sort):

=== "Python"

    ```python
    def quadratic(n: int) -> int:
        """Quadratic order"""
        count = 0
        # Number of iterations is quadratically related to the data size n
        for i in range(n):
            for j in range(n):
                count += 1
        return count
    ```

=== "C++"

    ```cpp
    int quadratic(int n) {
        int count = 0;
        // Number of iterations is quadratically related to the data size n
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                count++;
            }
        }
        return count;
    }
    ```

=== "Java"

    ```java
    static int quadratic(int n) {
            int count = 0;
            // Number of iterations is quadratically related to the data size n
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    count++;
                }
            }
            return count;
        }
    ```

=== "C#"

    ```csharp
    int Quadratic(int n) {
            int count = 0;
            // Number of iterations is quadratically related to the data size n
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    count++;
                }
            }
            return count;
        }
    ```

=== "Go"

    ```go
    func quadratic(n int) int {
    	count := 0
    	// Number of iterations is quadratically related to the data size n
    	for i := 0; i < n; i++ {
    		for j := 0; j < n; j++ {
    			count++
    		}
    	}
    	return count
    }
    ```

=== "Swift"

    ```swift
    func quadratic(n: Int) -> Int {
        var count = 0
        // Number of iterations is quadratically related to the data size n
        for _ in 0 ..< n {
            for _ in 0 ..< n {
                count += 1
            }
        }
        return count
    }
    ```

=== "JavaScript"

    ```javascript
    function quadratic(n) {
        let count = 0;
        // Number of iterations is quadratically related to the data size n
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                count++;
            }
        }
        return count;
    }
    ```

=== "TypeScript"

    ```typescript
    function quadratic(n: number): number {
        let count = 0;
        // Number of iterations is quadratically related to the data size n
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                count++;
            }
        }
        return count;
    }
    ```

=== "Dart"

    ```dart
    int quadratic(int n) {
      int count = 0;
      // Number of iterations is quadratically related to the data size n
      for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
          count++;
        }
      }
      return count;
    }
    ```

=== "Rust"

    ```rust
    fn quadratic(n: i32) -> i32 {
        let mut count = 0;
        // Number of iterations is quadratically related to the data size n
        for _ in 0..n {
            for _ in 0..n {
                count += 1;
            }
        }
        count
    }
    ```

=== "C"

    ```c
    int quadratic(int n) {
        int count = 0;
        // Number of iterations is quadratically related to the data size n
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                count++;
            }
        }
        return count;
    }
    ```

=== "Kotlin"

    ```kotlin
    fun quadratic(n: Int): Int {
        var count = 0
        // Number of iterations is quadratically related to the data size n
        for (i in 0..<n) {
            for (j in 0..<n) {
                count++
            }
        }
        return count
    }
    ```

=== "Ruby"

    ```ruby
    def quadratic(n)
      count = 0
    
      # Number of iterations is quadratically related to the data size n
      for i in 0...n
        for j in 0...n
          count += 1
        end
      end
    
      count
    end
    ```

### 4. Độ phức tạp lũy thừa $O(2^n)$

Thường xuất hiện trong các hàm đệ quy phân nhánh đôi mà không được tối ưu hóa bộ nhớ đệm (caching), ví dụ tính số Fibonacci theo cách đệ quy thông thường:

=== "Python"

    ```python
    def exponential(n: int) -> int:
        """Exponential order (loop implementation)"""
        count = 0
        base = 1
        # Cells divide into two every round, forming sequence 1, 2, 4, 8, ..., 2^(n-1)
        for _ in range(n):
            for _ in range(base):
                count += 1
            base *= 2
        # count = 1 + 2 + 4 + 8 + .. + 2^(n-1) = 2^n - 1
        return count
    ```

=== "C++"

    ```cpp
    int exponential(int n) {
        int count = 0, base = 1;
        // Cells divide into two every round, forming sequence 1, 2, 4, 8, ..., 2^(n-1)
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < base; j++) {
                count++;
            }
            base *= 2;
        }
        // count = 1 + 2 + 4 + 8 + .. + 2^(n-1) = 2^n - 1
        return count;
    }
    ```

=== "Java"

    ```java
    static int exponential(int n) {
            int count = 0, base = 1;
            // Cells divide into two every round, forming sequence 1, 2, 4, 8, ..., 2^(n-1)
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < base; j++) {
                    count++;
                }
                base *= 2;
            }
            // count = 1 + 2 + 4 + 8 + .. + 2^(n-1) = 2^n - 1
            return count;
        }
    ```

=== "C#"

    ```csharp
    int Exponential(int n) {
            int count = 0, bas = 1;
            // Cells divide into two every round, forming sequence 1, 2, 4, 8, ..., 2^(n-1)
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < bas; j++) {
                    count++;
                }
                bas *= 2;
            }
            // count = 1 + 2 + 4 + 8 + .. + 2^(n-1) = 2^n - 1
            return count;
        }
    ```

=== "Go"

    ```go
    func exponential(n int) int {
    	count, base := 0, 1
    	// Cells divide into two every round, forming sequence 1, 2, 4, 8, ..., 2^(n-1)
    	for i := 0; i < n; i++ {
    		for j := 0; j < base; j++ {
    			count++
    		}
    		base *= 2
    	}
    	// count = 1 + 2 + 4 + 8 + .. + 2^(n-1) = 2^n - 1
    	return count
    }
    ```

=== "Swift"

    ```swift
    func exponential(n: Int) -> Int {
        var count = 0
        var base = 1
        // Cells divide into two every round, forming sequence 1, 2, 4, 8, ..., 2^(n-1)
        for _ in 0 ..< n {
            for _ in 0 ..< base {
                count += 1
            }
            base *= 2
        }
        // count = 1 + 2 + 4 + 8 + .. + 2^(n-1) = 2^n - 1
        return count
    }
    ```

=== "JavaScript"

    ```javascript
    function exponential(n) {
        let count = 0,
            base = 1;
        // Cells divide into two every round, forming sequence 1, 2, 4, 8, ..., 2^(n-1)
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < base; j++) {
                count++;
            }
            base *= 2;
        }
        // count = 1 + 2 + 4 + 8 + .. + 2^(n-1) = 2^n - 1
        return count;
    }
    ```

=== "TypeScript"

    ```typescript
    function exponential(n: number): number {
        let count = 0,
            base = 1;
        // Cells divide into two every round, forming sequence 1, 2, 4, 8, ..., 2^(n-1)
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < base; j++) {
                count++;
            }
            base *= 2;
        }
        // count = 1 + 2 + 4 + 8 + .. + 2^(n-1) = 2^n - 1
        return count;
    }
    ```

=== "Dart"

    ```dart
    int exponential(int n) {
      int count = 0, base = 1;
      // Cells divide into two every round, forming sequence 1, 2, 4, 8, ..., 2^(n-1)
      for (var i = 0; i < n; i++) {
        for (var j = 0; j < base; j++) {
          count++;
        }
        base *= 2;
      }
      // count = 1 + 2 + 4 + 8 + .. + 2^(n-1) = 2^n - 1
      return count;
    }
    ```

=== "Rust"

    ```rust
    fn exponential(n: i32) -> i32 {
        let mut count = 0;
        let mut base = 1;
        // Cells divide into two every round, forming sequence 1, 2, 4, 8, ..., 2^(n-1)
        for _ in 0..n {
            for _ in 0..base {
                count += 1
            }
            base *= 2;
        }
        // count = 1 + 2 + 4 + 8 + .. + 2^(n-1) = 2^n - 1
        count
    }
    ```

=== "C"

    ```c
    int exponential(int n) {
        int count = 0;
        int bas = 1;
        // Cells divide into two every round, forming sequence 1, 2, 4, 8, ..., 2^(n-1)
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < bas; j++) {
                count++;
            }
            bas *= 2;
        }
        // count = 1 + 2 + 4 + 8 + .. + 2^(n-1) = 2^n - 1
        return count;
    }
    ```

=== "Kotlin"

    ```kotlin
    fun exponential(n: Int): Int {
        var count = 0
        var base = 1
        // Cells divide into two every round, forming sequence 1, 2, 4, 8, ..., 2^(n-1)
        for (i in 0..<n) {
            for (j in 0..<base) {
                count++
            }
            base *= 2
        }
        // count = 1 + 2 + 4 + 8 + .. + 2^(n-1) = 2^n - 1
        return count
    }
    ```

=== "Ruby"

    ```ruby
    def exponential(n)
      count, base = 0, 1
    
      # Cells divide into two every round, forming sequence 1, 2, 4, 8, ..., 2^(n-1)
      (0...n).each do
        (0...base).each { count += 1 }
        base *= 2
      end
    
      # count = 1 + 2 + 4 + 8 + .. + 2^(n-1) = 2^n - 1
      count
    end
    ```

### 5. Độ phức tạp logarit $O(\log n)$

Thường xuất hiện trong các giải thuật chia đôi không gian tìm kiếm sau mỗi bước, ví dụ giải thuật tìm kiếm nhị phân (Binary Search):

=== "Python"

    ```python
    def logarithmic(n: int) -> int:
        """Logarithmic order (loop implementation)"""
        count = 0
        while n > 1:
            n = n / 2
            count += 1
        return count
    ```

=== "C++"

    ```cpp
    int logarithmic(int n) {
        int count = 0;
        while (n > 1) {
            n = n / 2;
            count++;
        }
        return count;
    }
    ```

=== "Java"

    ```java
    static int logarithmic(int n) {
            int count = 0;
            while (n > 1) {
                n = n / 2;
                count++;
            }
            return count;
        }
    ```

=== "C#"

    ```csharp
    int Logarithmic(int n) {
            int count = 0;
            while (n > 1) {
                n /= 2;
                count++;
            }
            return count;
        }
    ```

=== "Go"

    ```go
    func logarithmic(n int) int {
    	count := 0
    	for n > 1 {
    		n = n / 2
    		count++
    	}
    	return count
    }
    ```

=== "Swift"

    ```swift
    func logarithmic(n: Int) -> Int {
        var count = 0
        var n = n
        while n > 1 {
            n = n / 2
            count += 1
        }
        return count
    }
    ```

=== "JavaScript"

    ```javascript
    function logarithmic(n) {
        let count = 0;
        while (n > 1) {
            n = n / 2;
            count++;
        }
        return count;
    }
    ```

=== "TypeScript"

    ```typescript
    function logarithmic(n: number): number {
        let count = 0;
        while (n > 1) {
            n = n / 2;
            count++;
        }
        return count;
    }
    ```

=== "Dart"

    ```dart
    int logarithmic(int n) {
      int count = 0;
      while (n > 1) {
        n = n ~/ 2;
        count++;
      }
      return count;
    }
    ```

=== "Rust"

    ```rust
    fn logarithmic(mut n: i32) -> i32 {
        let mut count = 0;
        while n > 1 {
            n = n / 2;
            count += 1;
        }
        count
    }
    ```

=== "C"

    ```c
    int logarithmic(int n) {
        int count = 0;
        while (n > 1) {
            n = n / 2;
            count++;
        }
        return count;
    }
    ```

=== "Kotlin"

    ```kotlin
    fun logarithmic(n: Int): Int {
        var n1 = n
        var count = 0
        while (n1 > 1) {
            n1 /= 2
            count++
        }
        return count
    }
    ```

=== "Ruby"

    ```ruby
    def logarithmic(n)
      count = 0
    
      while n > 1
        n /= 2
        count += 1
      end
    
      count
    end
    ```

### 6. Độ phức tạp tuyến tính - logarit $O(n \log n)$

Cấp độ này xuất hiện nhiều trong các giải thuật sắp xếp tối ưu như sắp xếp nhanh (Quick Sort) hoặc sắp xếp trộn (Merge Sort):

=== "Python"

    ```python
    def linear_log_recur(n: int) -> int:
        """Linearithmic order"""
        if n <= 1:
            return 1
        # Divide into two, the scale of subproblems is reduced by half
        count = linear_log_recur(n // 2) + linear_log_recur(n // 2)
        # Current subproblem contains n operations
        for _ in range(n):
            count += 1
        return count
    ```

=== "C++"

    ```cpp
    int linearLogRecur(int n) {
        if (n <= 1)
            return 1;
        int count = linearLogRecur(n / 2) + linearLogRecur(n / 2);
        for (int i = 0; i < n; i++) {
            count++;
        }
        return count;
    }
    ```

=== "Java"

    ```java
    static int linearLogRecur(int n) {
            if (n <= 1)
                return 1;
            int count = linearLogRecur(n / 2) + linearLogRecur(n / 2);
            for (int i = 0; i < n; i++) {
                count++;
            }
            return count;
        }
    ```

=== "C#"

    ```csharp
    int LinearLogRecur(int n) {
            if (n <= 1) return 1;
            int count = LinearLogRecur(n / 2) + LinearLogRecur(n / 2);
            for (int i = 0; i < n; i++) {
                count++;
            }
            return count;
        }
    ```

=== "Go"

    ```go
    func linearLogRecur(n int) int {
    	if n <= 1 {
    		return 1
    	}
    	count := linearLogRecur(n/2) + linearLogRecur(n/2)
    	for i := 0; i < n; i++ {
    		count++
    	}
    	return count
    }
    ```

=== "Swift"

    ```swift
    func linearLogRecur(n: Int) -> Int {
        if n <= 1 {
            return 1
        }
        var count = linearLogRecur(n: n / 2) + linearLogRecur(n: n / 2)
        for _ in stride(from: 0, to: n, by: 1) {
            count += 1
        }
        return count
    }
    ```

=== "JavaScript"

    ```javascript
    function linearLogRecur(n) {
        if (n <= 1) return 1;
        let count = linearLogRecur(n / 2) + linearLogRecur(n / 2);
        for (let i = 0; i < n; i++) {
            count++;
        }
        return count;
    }
    ```

=== "TypeScript"

    ```typescript
    function linearLogRecur(n: number): number {
        if (n <= 1) return 1;
        let count = linearLogRecur(n / 2) + linearLogRecur(n / 2);
        for (let i = 0; i < n; i++) {
            count++;
        }
        return count;
    }
    ```

=== "Dart"

    ```dart
    int linearLogRecur(int n) {
      if (n <= 1) return 1;
      int count = linearLogRecur(n ~/ 2) + linearLogRecur(n ~/ 2);
      for (var i = 0; i < n; i++) {
        count++;
      }
      return count;
    }
    ```

=== "Rust"

    ```rust
    fn linear_log_recur(n: i32) -> i32 {
        if n <= 1 {
            return 1;
        }
        let mut count = linear_log_recur(n / 2) + linear_log_recur(n / 2);
        for _ in 0..n {
            count += 1;
        }
        return count;
    }
    ```

=== "C"

    ```c
    int linearLogRecur(int n) {
        if (n <= 1)
            return 1;
        int count = linearLogRecur(n / 2) + linearLogRecur(n / 2);
        for (int i = 0; i < n; i++) {
            count++;
        }
        return count;
    }
    ```

=== "Kotlin"

    ```kotlin
    fun linearLogRecur(n: Int): Int {
        if (n <= 1)
            return 1
        var count = linearLogRecur(n / 2) + linearLogRecur(n / 2)
        for (i in 0..<n) {
            count++
        }
        return count
    }
    ```

=== "Ruby"

    ```ruby
    def linear_log_recur(n)
      return 1 unless n > 1
    
      count = linear_log_recur(n / 2) + linear_log_recur(n / 2)
      (0...n).each { count += 1 }
    
      count
    end
    ```

### 7. Độ phức tạp giai thừa $O(n!)$

Đây là tốc độ tăng trưởng cực kỳ nhanh, xuất hiện khi giải bài toán tìm mọi hoán vị của một tập hợp:

=== "Python"

    ```python
    def factorial_recur(n: int) -> int:
        """Factorial order (recursive implementation)"""
        if n == 0:
            return 1
        count = 0
        # Split from 1 into n
        for _ in range(n):
            count += factorial_recur(n - 1)
        return count
    ```

=== "C++"

    ```cpp
    int factorialRecur(int n) {
        if (n == 0)
            return 1;
        int count = 0;
        // Split from 1 into n
        for (int i = 0; i < n; i++) {
            count += factorialRecur(n - 1);
        }
        return count;
    }
    ```

=== "Java"

    ```java
    static int factorialRecur(int n) {
            if (n == 0)
                return 1;
            int count = 0;
            // Split from 1 into n
            for (int i = 0; i < n; i++) {
                count += factorialRecur(n - 1);
            }
            return count;
        }
    ```

=== "C#"

    ```csharp
    int FactorialRecur(int n) {
            if (n == 0) return 1;
            int count = 0;
            // Split from 1 into n
            for (int i = 0; i < n; i++) {
                count += FactorialRecur(n - 1);
            }
            return count;
        }
    ```

=== "Go"

    ```go
    func factorialRecur(n int) int {
    	if n == 0 {
    		return 1
    	}
    	count := 0
    	// Split from 1 into n
    	for i := 0; i < n; i++ {
    		count += factorialRecur(n - 1)
    	}
    	return count
    }
    ```

=== "Swift"

    ```swift
    func factorialRecur(n: Int) -> Int {
        if n == 0 {
            return 1
        }
        var count = 0
        // Split from 1 into n
        for _ in 0 ..< n {
            count += factorialRecur(n: n - 1)
        }
        return count
    }
    ```

=== "JavaScript"

    ```javascript
    function factorialRecur(n) {
        if (n === 0) return 1;
        let count = 0;
        // Split from 1 into n
        for (let i = 0; i < n; i++) {
            count += factorialRecur(n - 1);
        }
        return count;
    }
    ```

=== "TypeScript"

    ```typescript
    function factorialRecur(n: number): number {
        if (n === 0) return 1;
        let count = 0;
        // Split from 1 into n
        for (let i = 0; i < n; i++) {
            count += factorialRecur(n - 1);
        }
        return count;
    }
    ```

=== "Dart"

    ```dart
    int factorialRecur(int n) {
      if (n == 0) return 1;
      int count = 0;
      // Split from 1 into n
      for (var i = 0; i < n; i++) {
        count += factorialRecur(n - 1);
      }
      return count;
    }
    ```

=== "Rust"

    ```rust
    fn factorial_recur(n: i32) -> i32 {
        if n == 0 {
            return 1;
        }
        let mut count = 0;
        // Split from 1 into n
        for _ in 0..n {
            count += factorial_recur(n - 1);
        }
        count
    }
    ```

=== "C"

    ```c
    int factorialRecur(int n) {
        if (n == 0)
            return 1;
        int count = 0;
        for (int i = 0; i < n; i++) {
            count += factorialRecur(n - 1);
        }
        return count;
    }
    ```

=== "Kotlin"

    ```kotlin
    fun factorialRecur(n: Int): Int {
        if (n == 0)
            return 1
        var count = 0
        // Split from 1 into n
        for (i in 0..<n) {
            count += factorialRecur(n - 1)
        }
        return count
    }
    ```

=== "Ruby"

    ```ruby
    def factorial_recur(n)
      return 1 if n == 0
    
      count = 0
      # Split from 1 into n
      (0...n).each { count += factorial_recur(n - 1) }
    
      count
    end
    ```

## Trường hợp tốt nhất, xấu nhất và trung bình

Hiệu năng giải thuật có thể thay đổi tùy thuộc vào sự phân bố cụ thể của dữ liệu đầu vào. Ví dụ, trong bài toán tìm kiếm tuyến tính:

  - **Best-case Time Complexity (Trường hợp tốt nhất)**: Phần tử cần tìm nằm ở ngay đầu mảng ($O(1)$).
  - **Worst-case Time Complexity (Trường hợp xấu nhất)**: Phần tử nằm ở cuối mảng hoặc không tồn tại ($O(n)$). Đây là độ phức tạp thực tế quan trọng nhất vì nó đảm bảo an toàn cho hệ thống.
  - **Average-case Time Complexity (Trường hợp trung bình)**: Kỳ vọng số bước thực thi trên mọi phân bố dữ liệu đầu vào.

=== "Python"

    ```python
    def find_one(nums: list[int]) -> int:
        """Find the index of number 1 in array nums"""
        for i in range(len(nums)):
            # When element 1 is at the head of the array, best time complexity O(1) is achieved
            # When element 1 is at the tail of the array, worst time complexity O(n) is achieved
            if nums[i] == 1:
                return i
        return -1
    ```

=== "C++"

    ```cpp
    int findOne(vector<int> &nums) {
        for (int i = 0; i < nums.size(); i++) {
            // When element 1 is at the head of the array, best time complexity O(1) is achieved
            // When element 1 is at the tail of the array, worst time complexity O(n) is achieved
            if (nums[i] == 1)
                return i;
        }
        return -1;
    }
    ```

=== "Java"

    ```java
    static int findOne(int[] nums) {
            for (int i = 0; i < nums.length; i++) {
                // When element 1 is at the head of the array, best time complexity O(1) is achieved
                // When element 1 is at the tail of the array, worst time complexity O(n) is achieved
                if (nums[i] == 1)
                    return i;
            }
            return -1;
        }
    ```

=== "C#"

    ```csharp
    int FindOne(int[] nums) {
            for (int i = 0; i < nums.Length; i++) {
                // When element 1 is at the head of the array, best time complexity O(1) is achieved
                // When element 1 is at the tail of the array, worst time complexity O(n) is achieved
                if (nums[i] == 1)
                    return i;
            }
            return -1;
        }
    ```

=== "Go"

    ```go
    func findOne(nums []int) int {
    	for i := 0; i < len(nums); i++ {
    		// When element 1 is at the head of the array, best time complexity O(1) is achieved
    		// When element 1 is at the tail of the array, worst time complexity O(n) is achieved
    		if nums[i] == 1 {
    			return i
    		}
    	}
    	return -1
    }
    ```

=== "Swift"

    ```swift
    func findOne(nums: [Int]) -> Int {
        for i in nums.indices {
            // When element 1 is at the head of the array, best time complexity O(1) is achieved
            // When element 1 is at the tail of the array, worst time complexity O(n) is achieved
            if nums[i] == 1 {
                return i
            }
        }
        return -1
    }
    ```

=== "JavaScript"

    ```javascript
    function findOne(nums) {
        for (let i = 0; i < nums.length; i++) {
            // When element 1 is at the head of the array, best time complexity O(1) is achieved
            // When element 1 is at the tail of the array, worst time complexity O(n) is achieved
            if (nums[i] === 1) {
                return i;
            }
        }
        return -1;
    }
    ```

=== "TypeScript"

    ```typescript
    function findOne(nums: number[]): number {
        for (let i = 0; i < nums.length; i++) {
            // When element 1 is at the head of the array, best time complexity O(1) is achieved
            // When element 1 is at the tail of the array, worst time complexity O(n) is achieved
            if (nums[i] === 1) {
                return i;
            }
        }
        return -1;
    }
    ```

=== "Dart"

    ```dart
    int findOne(List<int> nums) {
      for (var i = 0; i < nums.length; i++) {
        // When element 1 is at the head of the array, best time complexity O(1) is achieved
        // When element 1 is at the tail of the array, worst time complexity O(n) is achieved
        if (nums[i] == 1) return i;
      }
    
      return -1;
    }
    ```

=== "Rust"

    ```rust
    fn find_one(nums: &[i32]) -> Option<usize> {
        for i in 0..nums.len() {
            // When element 1 is at the head of the array, best time complexity O(1) is achieved
            // When element 1 is at the tail of the array, worst time complexity O(n) is achieved
            if nums[i] == 1 {
                return Some(i);
            }
        }
        None
    }
    ```

=== "C"

    ```c
    int findOne(int *nums, int n) {
        for (int i = 0; i < n; i++) {
            // When element 1 is at the head of the array, best time complexity O(1) is achieved
            // When element 1 is at the tail of the array, worst time complexity O(n) is achieved
            if (nums[i] == 1)
                return i;
        }
        return -1;
    }
    ```

=== "Kotlin"

    ```kotlin
    fun findOne(nums: Array<Int?>): Int {
        for (i in nums.indices) {
            // When element 1 is at the head of the array, best time complexity O(1) is achieved
            // When element 1 is at the tail of the array, worst time complexity O(n) is achieved
            if (nums[i] == 1)
                return i
        }
        return -1
    }
    ```

=== "Ruby"

    ```ruby
    def find_one(nums)
      for i in 0...nums.length
        # When element 1 is at the head of the array, best time complexity O(1) is achieved
        # When element 1 is at the tail of the array, worst time complexity O(n) is achieved
        return i if nums[i] == 1
      end
    
      -1
    end
    ```
