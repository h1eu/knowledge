---
title: "Space Complexity (Độ phức tạp Không gian)"
slug: "dsa-space-complexity"
summary: "Tìm hiểu lượng bộ nhớ mà giải thuật tiêu thụ trong quá trình thực thi, bao gồm bộ nhớ dữ liệu tạm thời và không gian ngăn xếp."
tags: ['dsa', 'complexity']
prerequisites: ['dsa-iteration-recursion']
related: ['dsa-time-complexity']
next: "dsa-complexity-summary"
previous: "dsa-time-complexity"
---


## Giới thiệu về Space Complexity

**Space Complexity (Độ phức tạp không gian)** đo lường xu hướng tăng trưởng của lượng bộ nhớ mà thuật toán sử dụng khi kích thước dữ liệu $n$ tăng lên.

Không gian bộ nhớ của thuật toán sử dụng gồm:

  - **Input Space (Không gian đầu vào)**: Bộ nhớ để lưu trữ dữ liệu đầu vào.
  - **Temporary Space (Không gian tạm thời)**: Bộ nhớ cấp phát thêm trong lúc thực thi, gồm dữ liệu biến tạm thời (Temporary Data) và không gian lưu ngăn xếp hàm (Stack Frame Space).

![Các loại không gian bộ nhớ trong giải thuật](../../dsa-assets/space_types.png)

## Các cấp độ phức tạp không gian phổ biến

### 1. Không gian hằng số $O(1)$

Thuật toán chỉ sử dụng một số lượng biến cố định độc lập với kích thước dữ liệu đầu vào $n$:

=== "Python"

    ```python
    def constant(n: int):
        """Constant order"""
        # Constants, variables, objects occupy O(1) space
        a = 0
        nums = [0] * 10000
        node = ListNode(0)
        # Variables in the loop occupy O(1) space
        for _ in range(n):
            c = 0
        # Functions in the loop occupy O(1) space
        for _ in range(n):
            function()
    ```

=== "C++"

    ```cpp
    void constant(int n) {
        // Constants, variables, objects occupy O(1) space
        const int a = 0;
        int b = 0;
        vector<int> nums(10000);
        ListNode node(0);
        // Variables in the loop occupy O(1) space
        for (int i = 0; i < n; i++) {
            int c = 0;
        }
        // Functions in the loop occupy O(1) space
        for (int i = 0; i < n; i++) {
            func();
        }
    }
    ```

=== "Java"

    ```java
    static void constant(int n) {
            // Constants, variables, objects occupy O(1) space
            final int a = 0;
            int b = 0;
            int[] nums = new int[10000];
            ListNode node = new ListNode(0);
            // Variables in the loop occupy O(1) space
            for (int i = 0; i < n; i++) {
                int c = 0;
            }
            // Functions in the loop occupy O(1) space
            for (int i = 0; i < n; i++) {
                function();
            }
        }
    ```

=== "C#"

    ```csharp
    void Constant(int n) {
            // Constants, variables, objects occupy O(1) space
            int a = 0;
            int b = 0;
            int[] nums = new int[10000];
            ListNode node = new(0);
            // Variables in the loop occupy O(1) space
            for (int i = 0; i < n; i++) {
                int c = 0;
            }
            // Functions in the loop occupy O(1) space
            for (int i = 0; i < n; i++) {
                Function();
            }
        }
    ```

=== "Go"

    ```go
    // Function constant not found in space_complexity.go
    ```

=== "Swift"

    ```swift
    func constant(n: Int) {
        // Constants, variables, objects occupy O(1) space
        let a = 0
        var b = 0
        let nums = Array(repeating: 0, count: 10000)
        let node = ListNode(x: 0)
        // Variables in the loop occupy O(1) space
        for _ in 0 ..< n {
            let c = 0
        }
        // Functions in the loop occupy O(1) space
        for _ in 0 ..< n {
            function()
        }
    }
    ```

=== "JavaScript"

    ```javascript
    function constant(n) {
        // Constants, variables, objects occupy O(1) space
        const a = 0;
        const b = 0;
        const nums = new Array(10000);
        const node = new ListNode(0);
        // Variables in the loop occupy O(1) space
        for (let i = 0; i < n; i++) {
            const c = 0;
        }
        // Functions in the loop occupy O(1) space
        for (let i = 0; i < n; i++) {
            constFunc();
        }
    }
    ```

=== "TypeScript"

    ```typescript
    function constant(n: number): void {
        // Constants, variables, objects occupy O(1) space
        const a = 0;
        const b = 0;
        const nums = new Array(10000);
        const node = new ListNode(0);
        // Variables in the loop occupy O(1) space
        for (let i = 0; i < n; i++) {
            const c = 0;
        }
        // Functions in the loop occupy O(1) space
        for (let i = 0; i < n; i++) {
            constFunc();
        }
    }
    ```

=== "Dart"

    ```dart
    void constant(int n) {
      // Constants, variables, objects occupy O(1) space
      final int a = 0;
      int b = 0;
      List<int> nums = List.filled(10000, 0);
      ListNode node = ListNode(0);
      // Variables in the loop occupy O(1) space
      for (var i = 0; i < n; i++) {
        int c = 0;
      }
      // Functions in the loop occupy O(1) space
      for (var i = 0; i < n; i++) {
        function();
      }
    }
    ```

=== "Rust"

    ```rust
    fn constant(n: i32) {
        // Constants, variables, objects occupy O(1) space
        const A: i32 = 0;
        let b = 0;
        let nums = vec![0; 10000];
        let node = ListNode::new(0);
        // Variables in the loop occupy O(1) space
        for i in 0..n {
            let c = 0;
        }
        // Functions in the loop occupy O(1) space
        for i in 0..n {
            function();
        }
    }
    ```

=== "C"

    ```c
    void constant(int n) {
        // Constants, variables, objects occupy O(1) space
        const int a = 0;
        int b = 0;
        int nums[1000];
        ListNode *node = newListNode(0);
        free(node);
        // Variables in the loop occupy O(1) space
        for (int i = 0; i < n; i++) {
            int c = 0;
        }
        // Functions in the loop occupy O(1) space
        for (int i = 0; i < n; i++) {
            func();
        }
    }
    ```

=== "Kotlin"

    ```kotlin
    fun constant(n: Int) {
        // Constants, variables, objects occupy O(1) space
        val a = 0
        var b = 0
        val nums = Array(10000) { 0 }
        val node = ListNode(0)
        // Variables in the loop occupy O(1) space
        for (i in 0..<n) {
            val c = 0
        }
        // Functions in the loop occupy O(1) space
        for (i in 0..<n) {
            function()
        }
    }
    ```

=== "Ruby"

    ```ruby
    def constant(n)
      # Constants, variables, objects occupy O(1) space
      a = 0
      nums = [0] * 10000
      node = ListNode.new
    
      # Variables in the loop occupy O(1) space
      (0...n).each { c = 0 }
      # Functions in the loop occupy O(1) space
      (0...n).each { function }
    end
    ```

### 2. Không gian tuyến tính $O(n)$

Thuật toán khởi tạo các mảng hoặc danh sách có kích thước tỷ lệ thuận với dữ liệu đầu vào, hoặc có độ sâu đệ quy gọi hàm tỷ lệ thuận với $n$:

=== "Python"

    ```python
    def linear(n: int):
        """Linear order"""
        # A list of length n occupies O(n) space
        nums = [0] * n
        # A hash table of length n occupies O(n) space
        hmap = dict[int, str]()
        for i in range(n):
            hmap[i] = str(i)
    ```

=== "C++"

    ```cpp
    void linear(int n) {
        // Array of length n uses O(n) space
        vector<int> nums(n);
        // A list of length n occupies O(n) space
        vector<ListNode> nodes;
        for (int i = 0; i < n; i++) {
            nodes.push_back(ListNode(i));
        }
        // A hash table of length n occupies O(n) space
        unordered_map<int, string> map;
        for (int i = 0; i < n; i++) {
            map[i] = to_string(i);
        }
    }
    ```

=== "Java"

    ```java
    static void linear(int n) {
            // Array of length n uses O(n) space
            int[] nums = new int[n];
            // A list of length n occupies O(n) space
            List<ListNode> nodes = new ArrayList<>();
            for (int i = 0; i < n; i++) {
                nodes.add(new ListNode(i));
            }
            // A hash table of length n occupies O(n) space
            Map<Integer, String> map = new HashMap<>();
            for (int i = 0; i < n; i++) {
                map.put(i, String.valueOf(i));
            }
        }
    ```

=== "C#"

    ```csharp
    void Linear(int n) {
            // Array of length n uses O(n) space
            int[] nums = new int[n];
            // A list of length n occupies O(n) space
            List<ListNode> nodes = [];
            for (int i = 0; i < n; i++) {
                nodes.Add(new ListNode(i));
            }
            // A hash table of length n occupies O(n) space
            Dictionary<int, string> map = [];
            for (int i = 0; i < n; i++) {
                map.Add(i, i.ToString());
            }
        }
    ```

=== "Go"

    ```go
    // Function linear not found in space_complexity.go
    ```

=== "Swift"

    ```swift
    func linear(n: Int) {
        // Array of length n uses O(n) space
        let nums = Array(repeating: 0, count: n)
        // A list of length n occupies O(n) space
        let nodes = (0 ..< n).map { ListNode(x: $0) }
        // A hash table of length n occupies O(n) space
        let map = Dictionary(uniqueKeysWithValues: (0 ..< n).map { ($0, "\($0)") })
    }
    ```

=== "JavaScript"

    ```javascript
    function linear(n) {
        // Array of length n uses O(n) space
        const nums = new Array(n);
        // A list of length n occupies O(n) space
        const nodes = [];
        for (let i = 0; i < n; i++) {
            nodes.push(new ListNode(i));
        }
        // A hash table of length n occupies O(n) space
        const map = new Map();
        for (let i = 0; i < n; i++) {
            map.set(i, i.toString());
        }
    }
    ```

=== "TypeScript"

    ```typescript
    function linear(n: number): void {
        // Array of length n uses O(n) space
        const nums = new Array(n);
        // A list of length n occupies O(n) space
        const nodes: ListNode[] = [];
        for (let i = 0; i < n; i++) {
            nodes.push(new ListNode(i));
        }
        // A hash table of length n occupies O(n) space
        const map = new Map();
        for (let i = 0; i < n; i++) {
            map.set(i, i.toString());
        }
    }
    ```

=== "Dart"

    ```dart
    void linear(int n) {
      // Array of length n uses O(n) space
      List<int> nums = List.filled(n, 0);
      // A list of length n occupies O(n) space
      List<ListNode> nodes = [];
      for (var i = 0; i < n; i++) {
        nodes.add(ListNode(i));
      }
      // A hash table of length n occupies O(n) space
      Map<int, String> map = HashMap();
      for (var i = 0; i < n; i++) {
        map.putIfAbsent(i, () => i.toString());
      }
    }
    ```

=== "Rust"

    ```rust
    fn linear(n: i32) {
        // Array of length n uses O(n) space
        let mut nums = vec![0; n as usize];
        // A list of length n occupies O(n) space
        let mut nodes = Vec::new();
        for i in 0..n {
            nodes.push(ListNode::new(i))
        }
        // A hash table of length n occupies O(n) space
        let mut map = HashMap::new();
        for i in 0..n {
            map.insert(i, i.to_string());
        }
    }
    ```

=== "C"

    ```c
    void linear(int n) {
        // Array of length n uses O(n) space
        int *nums = malloc(sizeof(int) * n);
        free(nums);
    
        // A list of length n occupies O(n) space
        ListNode **nodes = malloc(sizeof(ListNode *) * n);
        for (int i = 0; i < n; i++) {
            nodes[i] = newListNode(i);
        }
        // Memory release
        for (int i = 0; i < n; i++) {
            free(nodes[i]);
        }
        free(nodes);
    
        // A hash table of length n occupies O(n) space
        HashTable *h = NULL;
        for (int i = 0; i < n; i++) {
            HashTable *tmp = malloc(sizeof(HashTable));
            tmp->key = i;
            tmp->val = i;
            HASH_ADD_INT(h, key, tmp);
        }
    
        // Memory release
        HashTable *curr, *tmp;
        HASH_ITER(hh, h, curr, tmp) {
            HASH_DEL(h, curr);
            free(curr);
        }
    }
    ```

=== "Kotlin"

    ```kotlin
    fun linear(n: Int) {
        // Array of length n uses O(n) space
        val nums = Array(n) { 0 }
        // A list of length n occupies O(n) space
        val nodes = mutableListOf<ListNode>()
        for (i in 0..<n) {
            nodes.add(ListNode(i))
        }
        // A hash table of length n occupies O(n) space
        val map = mutableMapOf<Int, String>()
        for (i in 0..<n) {
            map[i] = i.toString()
        }
    }
    ```

=== "Ruby"

    ```ruby
    def linear(n)
      # A list of length n occupies O(n) space
      nums = Array.new(n, 0)
    
      # A hash table of length n occupies O(n) space
      hmap = {}
      for i in 0...n
        hmap[i] = i.to_s
      end
    end
    ```

Ví dụ đệ quy tuyến tính sử dụng không gian ngăn xếp $O(n)$:

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="csharp" onclick="switchCodeTab(event, 'csharp')">C#</button><button class="code-tab-btn" data-lang="go" onclick="switchCodeTab(event, 'go')">Go</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="typescript" onclick="switchCodeTab(event, 'typescript')">TypeScript</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="rust" onclick="switchCodeTab(event, 'rust')">Rust</button><button class="code-tab-btn" data-lang="c" onclick="switchCodeTab(event, 'c')">C</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="ruby" onclick="switchCodeTab(event, 'ruby')">Ruby</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def linear_recur(n: int):
    """Linear order (recursive implementation)"""
    print("Recursion n =", n)
    if n == 1:
        return
    linear_recur(n - 1)</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>void linearRecur(int n) {
    cout &lt;&lt; "Recursion n = " &lt;&lt; n &lt;&lt; endl;
    if (n == 1)
        return;
    linearRecur(n - 1);
}</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>    static void linearRecur(int n) {
        System.out.println("Recursion n = " + n);
        if (n == 1)
            return;
        linearRecur(n - 1);
    }</code></pre></div><div class="code-tab-content" data-lang="csharp"><pre data-lang="csharp"><code>    void LinearRecur(int n) {
        Console.WriteLine("Recursion n = " + n);
        if (n == 1) return;
        LinearRecur(n - 1);
    }</code></pre></div><div class="code-tab-content" data-lang="go"><pre data-lang="go">`// Function linear_recur not found in space_complexity.go`</pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func linearRecur(n: Int) {
    print("Recursion n = \(n)")
    if n == 1 {
        return
    }
    linearRecur(n: n - 1)
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>function linearRecur(n) {
    console.log(\
