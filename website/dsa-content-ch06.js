/* ============================================================
   Knowledge OS — DSA Module: Chương 6 - Bảng băm
   ============================================================ */

Object.assign(DSA_CONTENT, {

  'dsa-hash-table-index': {
    title: 'Bảng băm',
    summary: 'Giới thiệu về Bảng băm (Hash Table) — cấu trúc dữ liệu cho phép tra cứu phần tử cực kỳ nhanh chóng dựa trên khóa.',
    tags: ['dsa', 'hashing', 'hashtable'],
    domain: 'Algorithms',
    module: 'Chương 6: Bảng băm',
    prerequisites: ['dsa-stack-queue-summary'],
    related: ['dsa-hash-map'],
    updatedAt: '2026-07-19',
    readTime: '1 phút',
    content: `

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/chapter_hashing.jpg" alt="Bảng băm (Hashing)" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
<div class="callout callout-note">
  <span class="callout-icon">✨</span>
  <div class="callout-body">
    <p>Trong thế giới máy tính, bảng băm giống như một thủ thư thông minh.</p>
    <p>Nó biết cách tính toán số hiệu gọi sách, cho phép nó định vị nhanh chóng cuốn sách mong muốn.</p>
  </div>
</div>

`,
    originalContent: `
# Hashing

![Hashing](../assets/covers/chapter_hashing.jpg)

!!! abstract

    In the world of computing, a hash table is like a clever librarian.

    It knows how to compute call numbers, allowing it to quickly locate the desired book.

`
  },

  'dsa-hash-map': {
    title: '6.1 Hash Table (Bảng băm)',
    summary: 'Tìm hiểu Bảng băm (Hash Table), cách hoạt động của hàm băm, triển khai bảng băm đơn giản bằng mảng, và nguyên nhân/hệ quả của xung đột băm.',
    tags: ['dsa', 'hashmap', 'hashtable'],
    domain: 'Algorithms',
    module: 'Chương 6: Bảng băm',
    prerequisites: ['dsa-hash-table-index'],
    related: ['dsa-hash-collision', 'dsa-hash-algorithm'],
    updatedAt: '2026-07-19',
    readTime: '15 phút',
    content: `

<p><strong>Bảng băm (Hash table)</strong>, hay còn gọi là <strong>Hash map</strong>, lưu trữ các ánh xạ từ khóa (<code>key</code>) đến giá trị (<code>value</code>), cho phép tra cứu hiệu quả. Cụ thể, khi có một khóa <code>key</code>, chúng ta có thể truy xuất giá trị <code>value</code> tương ứng từ bảng băm trong thời gian $O(1)$.</p>
<p>Như hình dưới đây, giả sử chúng ta có $n$ học sinh, mỗi người có hai thông tin: tên và mã số học sinh (ID). Nếu chúng ta muốn hỗ trợ truy vấn "nhập mã số học sinh, trả về tên tương ứng", chúng ta có thể sử dụng bảng băm như bên dưới.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/hash_table_lookup.png" alt="Biểu diễn trừu tượng của bảng băm" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
<p>Ngoài bảng băm, mảng và danh sách liên kết cũng có thể triển khai chức năng truy vấn. So sánh hiệu quả của chúng được thể hiện trong bảng sau:</p>
<ul>
  <li><strong>Thêm phần tử</strong>: Chỉ cần thêm phần tử vào cuối mảng (danh sách liên kết), mất thời gian $O(1)$.</li>
  <li><strong>Truy vấn phần tử</strong>: Vì mảng (danh sách liên kết) không có thứ tự, tất cả phần tử cần được duyệt qua, mất thời gian $O(n)$.</li>
  <li><strong>Xóa phần tử</strong>: Phải tìm vị trí phần tử trước, sau đó mới xóa khỏi mảng (danh sách liên kết), mất thời gian $O(n)$.</li>
</ul>
<p align="center">Bảng &nbsp; So sánh hiệu quả truy vấn phần tử</p>
<table style="width:100%; border-collapse:collapse; font-size:14px; margin:1.5em 0; border: 1px solid var(--border-color);">
  <thead>
    <tr style="border-bottom:2px solid var(--border-color); text-align:left; background-color: rgba(255,255,255,0.05);">
      <th style="padding:10px 15px; color:var(--text-primary); font-weight:600;"></th>
      <th style="padding:10px 15px; color:var(--text-primary); font-weight:600;">Mảng</th>
      <th style="padding:10px 15px; color:var(--text-primary); font-weight:600;">Danh sách liên kết</th>
      <th style="padding:10px 15px; color:var(--text-primary); font-weight:600;">Bảng băm</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px 15px;">Tìm phần tử</td><td style="padding:10px 15px;">$O(n)$</td><td style="padding:10px 15px;">$O(n)$</td><td style="padding:10px 15px;">$O(1)$</td></tr>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px 15px;">Thêm phần tử</td><td style="padding:10px 15px;">$O(1)$</td><td style="padding:10px 15px;">$O(1)$</td><td style="padding:10px 15px;">$O(1)$</td></tr>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px 15px;">Xóa phần tử</td><td style="padding:10px 15px;">$O(n)$</td><td style="padding:10px 15px;">$O(n)$</td><td style="padding:10px 15px;">$O(1)$</td></tr>
  </tbody>
</table>
<p>Như chúng ta có thể thấy, <strong>các thao tác chèn, xóa, tra cứu và cập nhật trong bảng băm đều có độ phức tạp thời gian $O(1)$</strong>, khiến bảng băm trở nên cực kỳ hiệu quả.</p>

<h2>6.1.1 Các thao tác thường dùng trên Bảng băm</h2>
<p>Các thao tác thường dùng trên bảng băm bao gồm: khởi tạo, thao tác truy vấn, thêm cặp khóa-giá trị và xóa cặp khóa-giá trị. Đoạn mã ví dụ như sau:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Khởi tạo bảng băm */
Map&lt;Integer, String&gt; map = new HashMap&lt;&gt;();

/* Thao tác thêm */
// Thêm cặp khóa-giá trị (key, value) vào bảng băm
map.put(12836, "XiaoHa");
map.put(15937, "XiaoLuo");
map.put(16750, "XiaoSuan");
map.put(13276, "XiaoFa");
map.put(10583, "XiaoYa");

/* Thao tác truy vấn */
// Đưa key vào bảng băm để lấy value
String name = map.get(15937);

/* Thao tác xóa */
// Xóa cặp khóa-giá trị (key, value) khỏi bảng băm
map.remove(10583);</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code># Khởi tạo bảng băm
hmap: dict = {}

# Thao tác thêm
# Thêm cặp khóa-giá trị (key, value) vào bảng băm
hmap[12836] = "XiaoHa"
hmap[15937] = "XiaoLuo"
hmap[16750] = "XiaoSuan"
hmap[13276] = "XiaoFa"
hmap[10583] = "XiaoYa"

# Thao tác truy vấn
# Đưa key vào bảng băm để lấy value
name: str = hmap[15937]

# Thao tác xóa
# Xóa cặp khóa-giá trị (key, value) khỏi bảng băm
hmap.pop(10583)</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Khởi tạo bảng băm */
unordered_map&lt;int, string&gt; map;

/* Thao tác thêm */
// Thêm cặp khóa-giá trị (key, value) vào bảng băm
map[12836] = "XiaoHa";
map[15937] = "XiaoLuo";
map[16750] = "XiaoSuan";
map[13276] = "XiaoFa";
map[10583] = "XiaoYa";

/* Thao tác truy vấn */
// Đưa key vào bảng băm để lấy value
string name = map[15937];

/* Thao tác xóa */
// Xóa cặp khóa-giá trị (key, value) khỏi bảng băm
map.erase(10583);</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Khởi tạo bảng băm */
const map = new Map();
/* Thao tác thêm */
// Thêm cặp khóa-giá trị (key, value) vào bảng băm
map.set(12836, 'XiaoHa');
map.set(15937, 'XiaoLuo');
map.set(16750, 'XiaoSuan');
map.set(13276, 'XiaoFa');
map.set(10583, 'XiaoYa');

/* Thao tác truy vấn */
// Đưa key vào bảng băm để lấy value
let name = map.get(15937);

/* Thao tác xóa */
// Xóa cặp khóa-giá trị (key, value) khỏi bảng băm
map.delete(10583);</code></pre></div></div></div>
<p>Có ba cách phổ biến để duyệt qua một bảng băm: duyệt cặp khóa-giá trị, chỉ duyệt khóa, và chỉ duyệt giá trị. Đoạn mã ví dụ như sau:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Duyệt bảng băm */
// Duyệt cặp key-&gt;value
for (Map.Entry&lt;Integer, String&gt; kv: map.entrySet()) {
    System.out.println(kv.getKey() + " -&gt; " + kv.getValue());
}
// Chỉ duyệt key
for (int key: map.keySet()) {
    System.out.println(key);
}
// Chỉ duyệt value
for (String val: map.values()) {
    System.out.println(val);
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code># Duyệt bảng băm
# Duyệt cặp key-&gt;value
for key, value in hmap.items():
    print(key, "-&gt;", value)
# Chỉ duyệt key
for key in hmap.keys():
    print(key)
# Chỉ duyệt value
for value in hmap.values():
    print(value)</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Duyệt bảng băm */
// Duyệt cặp key-&gt;value
for (auto kv: map) {
    cout &lt;&lt; kv.first &lt;&lt; " -&gt; " &lt;&lt; kv.second &lt;&lt; endl;
}
// Duyệt bằng iterator key-&gt;value
for (auto iter = map.begin(); iter != map.end(); iter++) {
    cout &lt;&lt; iter-&gt;first &lt;&lt; "-&gt;" &lt;&lt; iter-&gt;second &lt;&lt; endl;
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Duyệt bảng băm */
console.info('\\nDuyệt cặp key-&gt;value');
for (const [k, v] of map.entries()) {
    console.info(k + ' -&gt; ' + v);
}
console.info('\\nChỉ duyệt key');
for (const k of map.keys()) {
    console.info(k);
}
console.info('\\nChỉ duyệt value');
for (const v of map.values()) {
    console.info(v);
}</code></pre></div></div></div>

<h2>6.1.2 Triển khai Bảng băm đơn giản</h2>
<p>Hãy bắt đầu với trường hợp đơn giản nhất: <strong>triển khai bảng băm chỉ bằng một mảng</strong>. Trong bảng băm, mỗi ô trống trong mảng được gọi là một <u>bucket</u> (thùng), và mỗi bucket có thể lưu trữ một cặp khóa-giá trị. Vì vậy, việc tra cứu bao gồm việc tìm bucket cho <code>key</code> rồi đọc <code>value</code> được lưu ở đó.</p>
<p>Vậy làm thế nào để tìm đúng bucket cho một <code>key</code> đã cho? Chúng ta thực hiện việc này bằng một <u>hàm băm (hash function)</u>. Hàm băm ánh xạ một không gian đầu vào lớn hơn sang một không gian đầu ra nhỏ hơn. Trong bảng băm, không gian đầu vào là tập hợp tất cả các <code>key</code>, còn không gian đầu ra là tập hợp tất cả các bucket (chỉ mục mảng). Nói cách khác, cho một <code>key</code>, <strong>hàm băm cho chúng ta biết cặp khóa-giá trị tương ứng nên được lưu ở đâu trong mảng</strong>.</p>
<p>Cho một <code>key</code>, việc tính toán chỉ mục bucket gồm hai bước:</p>
<ol>
  <li>Sử dụng thuật toán băm <code>hash()</code> để tính giá trị băm.</li>
  <li>Lấy giá trị băm đó chia lấy dư cho số lượng bucket (chiều dài mảng) <code>capacity</code>, để có được chỉ mục bucket (chỉ mục mảng) <code>index</code> tương ứng với <code>key</code>.</li>
</ol>
<pre><code>index = hash(key) % capacity</code></pre>
<p>Sau đó chúng ta có thể dùng <code>index</code> để truy cập bucket tương ứng trong bảng băm và lấy ra <code>value</code>.</p>
<p>Giả sử chiều dài mảng là <code>capacity = 100</code> và thuật toán băm là <code>hash(key) = key</code>. Khi đó hàm băm là <code>key % 100</code>. Hình dưới đây minh họa cách hàm băm này hoạt động, sử dụng mã số sinh viên làm <code>key</code> và tên làm <code>value</code>.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/hash_function.png" alt="Nguyên lý hoạt động của hàm băm" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
<p>Đoạn mã sau đây triển khai một bảng băm đơn giản. Ở đây, chúng ta đóng gói <code>key</code> và <code>value</code> vào một lớp <code>Pair</code> để biểu diễn một cặp khóa-giá trị.</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Cặp khóa-giá trị */
class Pair {
    public int key;
    public String val;

    public Pair(int key, String val) {
        this.key = key;
        this.val = val;
    }
}

/* Bảng băm triển khai dựa trên mảng */
class ArrayHashMap {
    private List&lt;Pair&gt; buckets;

    public ArrayHashMap() {
        // Khởi tạo mảng với 100 bucket
        buckets = new ArrayList&lt;&gt;();
        for (int i = 0; i &lt; 100; i++) {
            buckets.add(null);
        }
    }

    /* Hàm băm */
    private int hashFunc(int key) {
        int index = key % 100;
        return index;
    }

    /* Thao tác truy vấn */
    public String get(int key) {
        int index = hashFunc(key);
        Pair pair = buckets.get(index);
        if (pair == null)
            return null;
        return pair.val;
    }

    /* Thao tác thêm */
    public void put(int key, String val) {
        Pair pair = new Pair(key, val);
        int index = hashFunc(key);
        buckets.set(index, pair);
    }

    /* Thao tác xóa */
    public void remove(int key) {
        int index = hashFunc(key);
        // Đặt về null để biểu thị việc đã xóa
        buckets.set(index, null);
    }

    /* Lấy tất cả cặp khóa-giá trị */
    public List&lt;Pair&gt; pairSet() {
        List&lt;Pair&gt; pairSet = new ArrayList&lt;&gt;();
        for (Pair pair : buckets) {
            if (pair != null)
                pairSet.add(pair);
        }
        return pairSet;
    }

    /* Lấy tất cả khóa */
    public List&lt;Integer&gt; keySet() {
        List&lt;Integer&gt; keySet = new ArrayList&lt;&gt;();
        for (Pair pair : buckets) {
            if (pair != null)
                keySet.add(pair.key);
        }
        return keySet;
    }

    /* Lấy tất cả giá trị */
    public List&lt;String&gt; valueSet() {
        List&lt;String&gt; valueSet = new ArrayList&lt;&gt;();
        for (Pair pair : buckets) {
            if (pair != null)
                valueSet.add(pair.val);
        }
        return valueSet;
    }

    /* In bảng băm */
    public void print() {
        for (Pair kv : pairSet()) {
            System.out.println(kv.key + " -&gt; " + kv.val);
        }
    }
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>class Pair:
    """Cặp khóa-giá trị"""

    def __init__(self, key: int, val: str):
        self.key = key
        self.val = val


class ArrayHashMap:
    """Bảng băm triển khai dựa trên mảng"""

    def __init__(self):
        """Hàm khởi tạo"""
        # Khởi tạo mảng với 100 bucket
        self.buckets: list[Pair | None] = [None] * 100

    def hash_func(self, key: int) -&gt; int:
        """Hàm băm"""
        index = key % 100
        return index

    def get(self, key: int) -&gt; str | None:
        """Thao tác truy vấn"""
        index: int = self.hash_func(key)
        pair: Pair = self.buckets[index]
        if pair is None:
            return None
        return pair.val

    def put(self, key: int, val: str):
        """Thao tác thêm và cập nhật"""
        pair = Pair(key, val)
        index: int = self.hash_func(key)
        self.buckets[index] = pair

    def remove(self, key: int):
        """Thao tác xóa"""
        index: int = self.hash_func(key)
        # Đặt về None để biểu thị việc đã xóa
        self.buckets[index] = None

    def entry_set(self) -&gt; list[Pair]:
        """Lấy tất cả cặp khóa-giá trị"""
        result: list[Pair] = []
        for pair in self.buckets:
            if pair is not None:
                result.append(pair)
        return result

    def key_set(self) -&gt; list[int]:
        """Lấy tất cả khóa"""
        result = []
        for pair in self.buckets:
            if pair is not None:
                result.append(pair.key)
        return result

    def value_set(self) -&gt; list[str]:
        """Lấy tất cả giá trị"""
        result = []
        for pair in self.buckets:
            if pair is not None:
                result.append(pair.val)
        return result

    def print(self):
        """In bảng băm"""
        for pair in self.buckets:
            if pair is not None:
                print(pair.key, "-&gt;", pair.val)</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Cặp khóa-giá trị */
struct Pair {
  public:
    int key;
    string val;
    Pair(int key, string val) {
        this-&gt;key = key;
        this-&gt;val = val;
    }
};

/* Bảng băm triển khai dựa trên mảng */
class ArrayHashMap {
  private:
    vector&lt;Pair *&gt; buckets;

  public:
    ArrayHashMap() {
        // Khởi tạo mảng với 100 bucket
        buckets = vector&lt;Pair *&gt;(100);
    }

    ~ArrayHashMap() {
        // Giải phóng bộ nhớ
        for (const auto &amp;bucket : buckets) {
            delete bucket;
        }
        buckets.clear();
    }

    /* Hàm băm */
    int hashFunc(int key) {
        int index = key % 100;
        return index;
    }

    /* Thao tác truy vấn */
    string get(int key) {
        int index = hashFunc(key);
        Pair *pair = buckets[index];
        if (pair == nullptr)
            return "";
        return pair-&gt;val;
    }

    /* Thao tác thêm */
    void put(int key, string val) {
        Pair *pair = new Pair(key, val);
        int index = hashFunc(key);
        buckets[index] = pair;
    }

    /* Thao tác xóa */
    void remove(int key) {
        int index = hashFunc(key);
        // Giải phóng bộ nhớ và đặt về nullptr
        delete buckets[index];
        buckets[index] = nullptr;
    }

    /* Lấy tất cả cặp khóa-giá trị */
    vector&lt;Pair *&gt; pairSet() {
        vector&lt;Pair *&gt; pairSet;
        for (Pair *pair : buckets) {
            if (pair != nullptr) {
                pairSet.push_back(pair);
            }
        }
        return pairSet;
    }

    /* Lấy tất cả khóa */
    vector&lt;int&gt; keySet() {
        vector&lt;int&gt; keySet;
        for (Pair *pair : buckets) {
            if (pair != nullptr) {
                keySet.push_back(pair-&gt;key);
            }
        }
        return keySet;
    }

    /* Lấy tất cả giá trị */
    vector&lt;string&gt; valueSet() {
        vector&lt;string&gt; valueSet;
        for (Pair *pair : buckets) {
            if (pair != nullptr) {
                valueSet.push_back(pair-&gt;val);
            }
        }
        return valueSet;
    }

    /* In bảng băm */
    void print() {
        for (Pair *kv : pairSet()) {
            cout &lt;&lt; kv-&gt;key &lt;&lt; " -&gt; " &lt;&lt; kv-&gt;val &lt;&lt; endl;
        }
    }
};</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Cặp khóa-giá trị Number -&gt; String */
class Pair {
    constructor(key, val) {
        this.key = key;
        this.val = val;
    }
}

/* Bảng băm triển khai dựa trên mảng */
class ArrayHashMap {
    #buckets;
    constructor() {
        // Khởi tạo mảng với 100 bucket
        this.#buckets = new Array(100).fill(null);
    }

    /* Hàm băm */
    #hashFunc(key) {
        return key % 100;
    }

    /* Thao tác truy vấn */
    get(key) {
        let index = this.#hashFunc(key);
        let pair = this.#buckets[index];
        if (pair === null) return null;
        return pair.val;
    }

    /* Thao tác thêm */
    set(key, val) {
        let index = this.#hashFunc(key);
        this.#buckets[index] = new Pair(key, val);
    }

    /* Thao tác xóa */
    delete(key) {
        let index = this.#hashFunc(key);
        // Đặt về null để biểu thị việc đã xóa
        this.#buckets[index] = null;
    }

    /* Lấy tất cả cặp khóa-giá trị */
    entries() {
        let arr = [];
        for (let i = 0; i &lt; this.#buckets.length; i++) {
            if (this.#buckets[i]) {
                arr.push(this.#buckets[i]);
            }
        }
        return arr;
    }

    /* Lấy tất cả khóa */
    keys() {
        let arr = [];
        for (let i = 0; i &lt; this.#buckets.length; i++) {
            if (this.#buckets[i]) {
                arr.push(this.#buckets[i].key);
            }
        }
        return arr;
    }

    /* Lấy tất cả giá trị */
    values() {
        let arr = [];
        for (let i = 0; i &lt; this.#buckets.length; i++) {
            if (this.#buckets[i]) {
                arr.push(this.#buckets[i].val);
            }
        }
        return arr;
    }

    /* In bảng băm */
    print() {
        let pairSet = this.entries();
        for (const pair of pairSet) {
            console.info(\`\${pair.key} -&gt; \${pair.val}\`);
        }
    }
}</code></pre></div></div></div>

<h2>6.1.3 Xung đột băm và Mở rộng kích thước</h2>
<p>Về bản chất, hàm băm ánh xạ không gian đầu vào bao gồm tất cả các <code>key</code> sang không gian đầu ra bao gồm tất cả các chỉ mục mảng, và không gian đầu vào thường lớn hơn nhiều so với không gian đầu ra. Do đó, <strong>về mặt lý thuyết, các đầu vào khác nhau đôi khi chắc chắn sẽ ánh xạ đến cùng một đầu ra</strong>.</p>
<p>Với hàm băm ở ví dụ trên, khi các <code>key</code> đầu vào có cùng hai chữ số cuối, hàm băm sẽ tạo ra cùng một đầu ra. Ví dụ, khi truy vấn hai sinh viên có ID 12836 và 20336, ta được:</p>
<pre><code>12836 % 100 = 36
20336 % 100 = 36</code></pre>
<p>Như hình dưới đây, hai mã số sinh viên hiện đang trỏ đến cùng một tên, điều này rõ ràng là không đúng. Chúng ta gọi tình huống này, khi nhiều đầu vào ánh xạ đến cùng một đầu ra, là <u>xung đột băm (hash collision)</u>.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/hash_collision.png" alt="Ví dụ về xung đột băm" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
<p>Dễ thấy rằng, dung lượng bảng băm $n$ càng lớn thì xác suất nhiều <code>key</code> được gán vào cùng một bucket càng thấp, và xung đột càng ít. Do đó, <strong>chúng ta có thể giảm xung đột băm bằng cách mở rộng bảng băm</strong>.</p>
<p>Như hình dưới đây, trước khi mở rộng, các cặp khóa-giá trị <code>(136, A)</code> và <code>(236, D)</code> bị xung đột, nhưng sau khi mở rộng, xung đột biến mất.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/hash_table_reshash.png" alt="Mở rộng bảng băm" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
<p>Tương tự như mở rộng mảng, việc mở rộng bảng băm đòi hỏi phải di chuyển tất cả các cặp khóa-giá trị từ bảng gốc sang bảng mới, điều này rất tốn kém. Ngoài ra, vì dung lượng bảng băm <code>capacity</code> thay đổi, chúng ta phải tính toán lại vị trí lưu trữ của mọi cặp khóa-giá trị bằng hàm băm, điều này càng làm tăng chi phí mở rộng. Vì lý do này, các ngôn ngữ lập trình thường cấp phát sẵn một dung lượng bảng băm đủ lớn để tránh việc mở rộng diễn ra quá thường xuyên.</p>
<p><u>Hệ số tải (load factor)</u> là một khái niệm quan trọng của bảng băm. Nó được định nghĩa là số phần tử trong bảng băm chia cho số lượng bucket, dùng để đo mức độ nghiêm trọng của xung đột băm. <strong>Nó cũng thường được dùng làm ngưỡng để kích hoạt việc mở rộng bảng băm</strong>. Ví dụ, trong Java, khi hệ số tải vượt quá $0.75$, hệ thống sẽ mở rộng bảng băm lên gấp đôi kích thước ban đầu.</p>

<div class="interactive-widget-wrapper" id="hash-map-basic-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'hash-map-basic-wrapper', 'tab-static')">📸 Minh họa tĩnh</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'hash-map-basic-wrapper', 'tab-interactive'); initHashMapBasicDemo()">⚡ Mô phỏng tương tác</button>
  </div>
  <div class="widget-tab-content active" data-tab="tab-static">
    <p style="font-size:14px; color:var(--text-secondary); margin: 0 0 10px;">Bảng băm dựa trên mảng (dung lượng nhỏ minh họa) và cách xung đột băm gây ra kết quả SAI khi ghi đè trực tiếp.</p>
    <div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/hash_collision.png" alt="Ví dụ về xung đột băm" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
  </div>
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div id="hash-map-basic-canvas" style="display:flex; flex-wrap:wrap; gap:8px; justify-content:center; margin: 1em 0;"></div>
    <div style="display:flex; gap:8px; flex-wrap:wrap; justify-content:center; margin: 1em 0;">
      <button id="hash-map-basic-btn-autorun" class="control-btn" onclick="autoRunHashMapBasic()">▶ Auto Run</button>
      <button id="hash-map-basic-btn-step" class="control-btn" onclick="stepHashMapBasic()">Bước tiếp theo ▶</button>
      <button id="hash-map-basic-btn-pause" class="control-btn btn-secondary" onclick="pauseRunHashMapBasic()" disabled>⏸ Dừng</button>
      <button id="hash-map-basic-btn-reset" class="control-btn btn-secondary" onclick="initHashMapBasicDemo()">↺ Reset</button>
    </div>
    <div style="text-align:center; margin: 0.5em 0;">
      Tốc độ: <input type="range" min="200" max="2000" value="800" step="200" oninput="setHashMapBasicSpeed(this.value)" /> <span id="hash-map-basic-speed-label">800ms</span>
    </div>
    <p id="hash-map-basic-status" style="text-align:center; font-size:14px; color:var(--text-secondary);">Nhấp "Auto Run" để bắt đầu mô phỏng tự động.</p>
  </div>
</div>

`,
    originalContent: `
# Hash Table

A <u>hash table</u>, also known as a <u>hash map</u>, stores mappings from keys \`key\` to values \`value\`, enabling efficient lookups. Specifically, given a key \`key\`, we can retrieve the corresponding value \`value\` from a hash table in $O(1)$ time.

As shown below, suppose we have $n$ students, each with two pieces of information: a name and a student ID. If we want to support the query "given a student ID, return the corresponding name," we can use the hash table shown below.

![Abstract representation of a hash table](hash_map.assets/hash_table_lookup.png)

In addition to hash tables, arrays and linked lists can also implement query functionality. Their efficiency comparison is shown in the following table.

- **Adding elements**: Simply add elements to the end of the array (linked list), using $O(1)$ time.
- **Querying elements**: Since the array (linked list) is unordered, all elements need to be traversed, using $O(n)$ time.
- **Deleting elements**: The element must first be located, then deleted from the array (linked list), using $O(n)$ time.

<p align="center"> Table <id> &nbsp; Comparison of element query efficiency </p>

|                 | Array  | Linked List | Hash Table |
| --------------- | ------ | ----------- | ---------- |
| Find element    | $O(n)$ | $O(n)$      | $O(1)$     |
| Add element     | $O(1)$ | $O(1)$      | $O(1)$     |
| Delete element  | $O(n)$ | $O(n)$      | $O(1)$     |

As we can see, **insertion, deletion, lookup, and update operations in a hash table all have time complexity $O(1)$**, making hash tables highly efficient.

## Common Hash Table Operations

Common operations on hash tables include: initialization, query operations, adding key-value pairs, and deleting key-value pairs. Example code is as follows:

=== "Python"

    \`\`\`python title="hash_map.py"
    # Initialize hash table
    hmap: dict = {}

    # Add operation
    # Add key-value pair (key, value) to hash table
    hmap[12836] = "XiaoHa"
    hmap[15937] = "XiaoLuo"
    hmap[16750] = "XiaoSuan"
    hmap[13276] = "XiaoFa"
    hmap[10583] = "XiaoYa"

    # Query operation
    # Input key into hash table to get value
    name: str = hmap[15937]

    # Delete operation
    # Delete key-value pair (key, value) from hash table
    hmap.pop(10583)
    \`\`\`

=== "C++"

    \`\`\`cpp title="hash_map.cpp"
    /* Initialize hash table */
    unordered_map<int, string> map;

    /* Add operation */
    // Add key-value pair (key, value) to hash table
    map[12836] = "XiaoHa";
    map[15937] = "XiaoLuo";
    map[16750] = "XiaoSuan";
    map[13276] = "XiaoFa";
    map[10583] = "XiaoYa";

    /* Query operation */
    // Input key into hash table to get value
    string name = map[15937];

    /* Delete operation */
    // Delete key-value pair (key, value) from hash table
    map.erase(10583);
    \`\`\`

=== "Java"

    \`\`\`java title="hash_map.java"
    /* Initialize hash table */
    Map<Integer, String> map = new HashMap<>();

    /* Add operation */
    // Add key-value pair (key, value) to hash table
    map.put(12836, "XiaoHa");
    map.put(15937, "XiaoLuo");
    map.put(16750, "XiaoSuan");
    map.put(13276, "XiaoFa");
    map.put(10583, "XiaoYa");

    /* Query operation */
    // Input key into hash table to get value
    String name = map.get(15937);

    /* Delete operation */
    // Delete key-value pair (key, value) from hash table
    map.remove(10583);
    \`\`\`

=== "C#"

    \`\`\`csharp title="hash_map.cs"
    /* Initialize hash table */
    Dictionary<int, string> map = new() {
        /* Add operation */
        // Add key-value pair (key, value) to hash table
        { 12836, "XiaoHa" },
        { 15937, "XiaoLuo" },
        { 16750, "XiaoSuan" },
        { 13276, "XiaoFa" },
        { 10583, "XiaoYa" }
    };

    /* Query operation */
    // Input key into hash table to get value
    string name = map[15937];

    /* Delete operation */
    // Delete key-value pair (key, value) from hash table
    map.Remove(10583);
    \`\`\`

=== "Go"

    \`\`\`go title="hash_map_test.go"
    /* Initialize hash table */
    hmap := make(map[int]string)

    /* Add operation */
    // Add key-value pair (key, value) to hash table
    hmap[12836] = "XiaoHa"
    hmap[15937] = "XiaoLuo"
    hmap[16750] = "XiaoSuan"
    hmap[13276] = "XiaoFa"
    hmap[10583] = "XiaoYa"

    /* Query operation */
    // Input key into hash table to get value
    name := hmap[15937]

    /* Delete operation */
    // Delete key-value pair (key, value) from hash table
    delete(hmap, 10583)
    \`\`\`

=== "Swift"

    \`\`\`swift title="hash_map.swift"
    /* Initialize hash table */
    var map: [Int: String] = [:]

    /* Add operation */
    // Add key-value pair (key, value) to hash table
    map[12836] = "XiaoHa"
    map[15937] = "XiaoLuo"
    map[16750] = "XiaoSuan"
    map[13276] = "XiaoFa"
    map[10583] = "XiaoYa"

    /* Query operation */
    // Input key into hash table to get value
    let name = map[15937]!

    /* Delete operation */
    // Delete key-value pair (key, value) from hash table
    map.removeValue(forKey: 10583)
    \`\`\`

=== "JS"

    \`\`\`javascript title="hash_map.js"
    /* Initialize hash table */
    const map = new Map();
    /* Add operation */
    // Add key-value pair (key, value) to hash table
    map.set(12836, 'XiaoHa');
    map.set(15937, 'XiaoLuo');
    map.set(16750, 'XiaoSuan');
    map.set(13276, 'XiaoFa');
    map.set(10583, 'XiaoYa');

    /* Query operation */
    // Input key into hash table to get value
    let name = map.get(15937);

    /* Delete operation */
    // Delete key-value pair (key, value) from hash table
    map.delete(10583);
    \`\`\`

=== "TS"

    \`\`\`typescript title="hash_map.ts"
    /* Initialize hash table */
    const map = new Map<number, string>();
    /* Add operation */
    // Add key-value pair (key, value) to hash table
    map.set(12836, 'XiaoHa');
    map.set(15937, 'XiaoLuo');
    map.set(16750, 'XiaoSuan');
    map.set(13276, 'XiaoFa');
    map.set(10583, 'XiaoYa');
    console.info('\\nAfter adding, hash table is\\nKey -> Value');
    console.info(map);

    /* Query operation */
    // Input key into hash table to get value
    let name = map.get(15937);
    console.info('\\nInput student ID 15937, queried name ' + name);

    /* Delete operation */
    // Delete key-value pair (key, value) from hash table
    map.delete(10583);
    console.info('\\nAfter deleting 10583, hash table is\\nKey -> Value');
    console.info(map);
    \`\`\`

=== "Dart"

    \`\`\`dart title="hash_map.dart"
    /* Initialize hash table */
    Map<int, String> map = {};

    /* Add operation */
    // Add key-value pair (key, value) to hash table
    map[12836] = "XiaoHa";
    map[15937] = "XiaoLuo";
    map[16750] = "XiaoSuan";
    map[13276] = "XiaoFa";
    map[10583] = "XiaoYa";

    /* Query operation */
    // Input key into hash table to get value
    String name = map[15937];

    /* Delete operation */
    // Delete key-value pair (key, value) from hash table
    map.remove(10583);
    \`\`\`

=== "Rust"

    \`\`\`rust title="hash_map.rs"
    use std::collections::HashMap;

    /* Initialize hash table */
    let mut map: HashMap<i32, String> = HashMap::new();

    /* Add operation */
    // Add key-value pair (key, value) to hash table
    map.insert(12836, "XiaoHa".to_string());
    map.insert(15937, "XiaoLuo".to_string());
    map.insert(16750, "XiaoSuan".to_string());
    map.insert(13276, "XiaoFa".to_string());
    map.insert(10583, "XiaoYa".to_string());

    /* Query operation */
    // Input key into hash table to get value
    let _name: Option<&String> = map.get(&15937);

    /* Delete operation */
    // Delete key-value pair (key, value) from hash table
    let _removed_value: Option<String> = map.remove(&10583);
    \`\`\`

=== "C"

    \`\`\`c title="hash_map.c"
    // C does not provide a built-in hash table
    \`\`\`

=== "Kotlin"

    \`\`\`kotlin title="hash_map.kt"
    /* Initialize hash table */
    val map = HashMap<Int,String>()

    /* Add operation */
    // Add key-value pair (key, value) to hash table
    map[12836] = "XiaoHa"
    map[15937] = "XiaoLuo"
    map[16750] = "XiaoSuan"
    map[13276] = "XiaoFa"
    map[10583] = "XiaoYa"

    /* Query operation */
    // Input key into hash table to get value
    val name = map[15937]

    /* Delete operation */
    // Delete key-value pair (key, value) from hash table
    map.remove(10583)
    \`\`\`

=== "Ruby"

    \`\`\`ruby title="hash_map.rb"
    # Initialize hash table
    hmap = {}

    # Add operation
    # Add key-value pair (key, value) to hash table
    hmap[12836] = "XiaoHa"
    hmap[15937] = "XiaoLuo"
    hmap[16750] = "XiaoSuan"
    hmap[13276] = "XiaoFa"
    hmap[10583] = "XiaoYa"

    # Query operation
    # Input key into hash table to get value
    name = hmap[15937]

    # Delete operation
    # Delete key-value pair (key, value) from hash table
    hmap.delete(10583)
    \`\`\`

??? pythontutor "Visualized Execution"

    https://pythontutor.com/render.html#code=%22%22%22Driver%20Code%22%22%22%0Aif%20__name__%20%3D%3D%20%22__main__%22%3A%0A%20%20%20%20%23%20%E5%88%9D%E5%A7%8B%E5%8C%96%E5%93%88%E5%B8%8C%E8%A1%A8%0A%20%20%20%20hmap%20%3D%20%7B%7D%0A%20%20%20%20%0A%20%20%20%20%23%20%E6%B7%BB%E5%8A%A0%E6%93%8D%E4%BD%9C%0A%20%20%20%20%23%20%E5%9C%A8%E5%93%88%E5%B8%8C%E8%A1%A8%E4%B8%AD%E6%B7%BB%E5%8A%A0%E9%94%AE%E5%80%BC%E5%AF%B9%20%28key,%20value%29%0A%20%20%20%20hmap%5B12836%5D%20%3D%20%22%E5%B0%8F%E5%93%88%22%0A%20%20%20%20hmap%5B15937%5D%20%3D%20%22%E5%B0%8F%E5%95%B0%22%0A%20%20%20%20hmap%5B16750%5D%20%3D%20%22%E5%B0%8F%E7%AE%97%22%0A%20%20%20%20hmap%5B13276%5D%20%3D%20%22%E5%B0%8F%E6%B3%95%22%0A%20%20%20%20hmap%5B10583%5D%20%3D%20%22%E5%B0%8F%E9%B8%AD%22%0A%20%20%20%20%0A%20%20%20%20%23%20%E6%9F%A5%E8%AF%A2%E6%93%8D%E4%BD%9C%0A%20%20%20%20%23%20%E5%90%91%E5%93%88%E5%B8%8C%E8%A1%A8%E4%B8%AD%E8%BE%93%E5%85%A5%E9%94%AE%20key%20%EF%BC%8C%E5%BE%97%E5%88%B0%E5%80%BC%20value%0A%20%20%20%20name%20%3D%20hmap%5B15937%5D%0A%20%20%20%20%0A%20%20%20%20%23%20%E5%88%A0%E9%99%A4%E6%93%8D%E4%BD%9C%0A%20%20%20%20%23%20%E5%9C%A8%E5%93%88%E5%B8%8C%E8%A1%A8%E4%B8%AD%E5%88%A0%E9%99%A4%E9%94%AE%E5%80%BC%E5%AF%B9%20%28key,%20value%29%0A%20%20%20%20hmap.pop%2810583%29&cumulative=false&curInstr=2&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false

There are three common ways to traverse a hash table: traversing key-value pairs, traversing keys, and traversing values. Example code is as follows:

=== "Python"

    \`\`\`python title="hash_map.py"
    # Traverse hash table
    # Traverse key-value pairs key->value
    for key, value in hmap.items():
        print(key, "->", value)
    # Traverse keys only
    for key in hmap.keys():
        print(key)
    # Traverse values only
    for value in hmap.values():
        print(value)
    \`\`\`

=== "C++"

    \`\`\`cpp title="hash_map.cpp"
    /* Traverse hash table */
    // Traverse key-value pairs key->value
    for (auto kv: map) {
        cout << kv.first << " -> " << kv.second << endl;
    }
    // Traverse using iterator key->value
    for (auto iter = map.begin(); iter != map.end(); iter++) {
        cout << iter->first << "->" << iter->second << endl;
    }
    \`\`\`

=== "Java"

    \`\`\`java title="hash_map.java"
    /* Traverse hash table */
    // Traverse key-value pairs key->value
    for (Map.Entry<Integer, String> kv: map.entrySet()) {
        System.out.println(kv.getKey() + " -> " + kv.getValue());
    }
    // Traverse keys only
    for (int key: map.keySet()) {
        System.out.println(key);
    }
    // Traverse values only
    for (String val: map.values()) {
        System.out.println(val);
    }
    \`\`\`

=== "C#"

    \`\`\`csharp title="hash_map.cs"
    /* Traverse hash table */
    // Traverse key-value pairs Key->Value
    foreach (var kv in map) {
        Console.WriteLine(kv.Key + " -> " + kv.Value);
    }
    // Traverse keys only
    foreach (int key in map.Keys) {
        Console.WriteLine(key);
    }
    // Traverse values only
    foreach (string val in map.Values) {
        Console.WriteLine(val);
    }
    \`\`\`

=== "Go"

    \`\`\`go title="hash_map_test.go"
    /* Traverse hash table */
    // Traverse key-value pairs key->value
    for key, value := range hmap {
        fmt.Println(key, "->", value)
    }
    // Traverse keys only
    for key := range hmap {
        fmt.Println(key)
    }
    // Traverse values only
    for _, value := range hmap {
        fmt.Println(value)
    }
    \`\`\`

=== "Swift"

    \`\`\`swift title="hash_map.swift"
    /* Traverse hash table */
    // Traverse key-value pairs Key->Value
    for (key, value) in map {
        print("\\(key) -> \\(value)")
    }
    // Traverse keys only
    for key in map.keys {
        print(key)
    }
    // Traverse values only
    for value in map.values {
        print(value)
    }
    \`\`\`

=== "JS"

    \`\`\`javascript title="hash_map.js"
    /* Traverse hash table */
    console.info('\\nTraverse key-value pairs Key->Value');
    for (const [k, v] of map.entries()) {
        console.info(k + ' -> ' + v);
    }
    console.info('\\nTraverse keys only Key');
    for (const k of map.keys()) {
        console.info(k);
    }
    console.info('\\nTraverse values only Value');
    for (const v of map.values()) {
        console.info(v);
    }
    \`\`\`

=== "TS"

    \`\`\`typescript title="hash_map.ts"
    /* Traverse hash table */
    console.info('\\nTraverse key-value pairs Key->Value');
    for (const [k, v] of map.entries()) {
        console.info(k + ' -> ' + v);
    }
    console.info('\\nTraverse keys only Key');
    for (const k of map.keys()) {
        console.info(k);
    }
    console.info('\\nTraverse values only Value');
    for (const v of map.values()) {
        console.info(v);
    }
    \`\`\`

=== "Dart"

    \`\`\`dart title="hash_map.dart"
    /* Traverse hash table */
    // Traverse key-value pairs Key->Value
    map.forEach((key, value) {
      print('$key -> $value');
    });

    // Traverse keys only
    map.keys.forEach((key) {
      print(key);
    });

    // Traverse values only
    map.values.forEach((value) {
      print(value);
    });
    \`\`\`

=== "Rust"

    \`\`\`rust title="hash_map.rs"
    /* Traverse hash table */
    // Traverse key-value pairs Key->Value
    for (key, value) in &map {
        println!("{key} -> {value}");
    }

    // Traverse keys only
    for key in map.keys() {
        println!("{key}");
    }

    // Traverse values only
    for value in map.values() {
        println!("{value}");
    }
    \`\`\`

=== "C"

    \`\`\`c title="hash_map.c"
    // C does not provide a built-in hash table
    \`\`\`

=== "Kotlin"

    \`\`\`kotlin title="hash_map.kt"
    /* Traverse hash table */
    // Traverse key-value pairs key->value
    for ((key, value) in map) {
        println("$key -> $value")
    }
    // Traverse keys only
    for (key in map.keys) {
        println(key)
    }
    // Traverse values only
    for (_val in map.values) {
        println(_val)
    }
    \`\`\`

=== "Ruby"

    \`\`\`ruby title="hash_map.rb"
    # Traverse hash table
    # Traverse key-value pairs key->value
    hmap.entries.each { |key, value| puts "#{key} -> #{value}" }

    # Traverse keys only
    hmap.keys.each { |key| puts key }

    # Traverse values only
    hmap.values.each { |val| puts val }
    \`\`\`

??? pythontutor "Visualized Execution"

    https://pythontutor.com/render.html#code=%22%22%22Driver%20Code%22%22%22%0Aif%20__name__%20%3D%3D%20%22__main__%22%3A%0A%20%20%20%20%23%20%E5%88%9D%E5%A7%8B%E5%8C%96%E5%93%88%E5%B8%8C%E8%A1%A8%0A%20%20%20%20hmap%20%3D%20%7B%7D%0A%20%20%20%20%0A%20%20%20%20%23%20%E6%B7%BB%E5%8A%A0%E6%93%8D%E4%BD%9C%0A%20%20%20%20%23%20%E5%9C%A8%E5%93%88%E5%B8%8C%E8%A1%A8%E4%B8%AD%E6%B7%BB%E5%8A%A0%E9%94%AE%E5%80%BC%E5%AF%B9%20%28key,%20value%29%0A%20%20%20%20hmap%5B12836%5D%20%3D%20%22%E5%B0%8F%E5%93%88%22%0A%20%20%20%20hmap%5B15937%5D%20%3D%20%22%E5%B0%8F%E5%95%B0%22%0A%20%20%20%20hmap%5B16750%5D%20%3D%20%22%E5%B0%8F%E7%AE%97%22%0A%20%20%20%20hmap%5B13276%5D%20%3D%20%22%E5%B0%8F%E6%B3%95%22%0A%20%20%20%20hmap%5B10583%5D%20%3D%20%22%E5%B0%8F%E9%B8%AD%22%0A%20%20%20%20%0A%20%20%20%20%23%20%E9%81%8D%E5%8E%86%E5%93%88%E5%B8%8C%E8%A1%A8%0A%20%20%20%20%23%20%E9%81%8D%E5%8E%86%E9%94%AE%E5%80%BC%E5%AF%B9%20key-%3Evalue%0A%20%20%20%20for%20key,%20value%20in%20hmap.items%28%29%3A%0A%20%20%20%20%20%20%20%20print%28key,%20%22-%3E%22,%20value%29%0A%20%20%20%20%23%20%E5%8D%95%E7%8B%AC%E9%81%8D%E5%8E%86%E9%94%AE%20key%0A%20%20%20%20for%20key%20in%20hmap.keys%28%29%3A%0A%20%20%20%20%20%20%20%20print%28key%29%0A%20%20%20%20%23%20%E5%8D%95%E7%8B%AC%E9%81%8D%E5%8E%86%E5%80%BC%20value%0A%20%20%20%20for%20value%20in%20hmap.values%28%29%3A%0A%20%20%20%20%20%20%20%20print%28value%29&cumulative=false&curInstr=8&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false

## Simple Hash Table Implementation

Let's start with the simplest case: **implementing a hash table with just an array**. In a hash table, each empty slot in the array is called a <u>bucket</u>, and each bucket can store one key-value pair. A lookup therefore consists of finding the bucket for \`key\` and reading the \`value\` stored there.

So how do we find the right bucket for a given \`key\`? We do this with a <u>hash function</u>. A hash function maps a larger input space to a smaller output space. In a hash table, the input space is the set of all \`key\`s, and the output space is the set of all buckets (array indices). In other words, given a \`key\`, **the hash function tells us where the corresponding key-value pair should be stored in the array**.

Given a \`key\`, computing the bucket index involves the following two steps:

1. Use a hash algorithm \`hash()\` to compute a hash value.
2. Take that hash value modulo the number of buckets (array length), \`capacity\`, to obtain the bucket (array index) \`index\` corresponding to the \`key\`.

\`\`\`shell
index = hash(key) % capacity
\`\`\`

We can then use \`index\` to access the corresponding bucket in the hash table and retrieve the \`value\`.

Suppose the array length is \`capacity = 100\` and the hash algorithm is \`hash(key) = key\`. Then the hash function is \`key % 100\`. The figure below illustrates how this hash function works, using student ID as \`key\` and name as \`value\`.

![Working principle of hash function](hash_map.assets/hash_function.png)

The following code implements a simple hash table. Here, we encapsulate \`key\` and \`value\` into a class \`Pair\` to represent a key-value pair.

\`\`\`src
[file]{array_hash_map}-[class]{array_hash_map}-[func]{}
\`\`\`

## Hash Collision and Resizing

Fundamentally, a hash function maps the input space consisting of all \`key\`s to the output space consisting of all array indices, and the input space is often much larger than the output space. Therefore, **in theory, different inputs must sometimes map to the same output**.

For the hash function in the above example, when the input \`key\`s have the same last two digits, the hash function produces the same output. For example, when querying two students with IDs 12836 and 20336, we get:

\`\`\`shell
12836 % 100 = 36
20336 % 100 = 36
\`\`\`

As shown below, two student IDs now point to the same name, which is clearly incorrect. We call this situation, where multiple inputs map to the same output, a <u>hash collision</u>.

![Hash collision example](hash_map.assets/hash_collision.png)

It's easy to see that the larger the hash table capacity $n$, the lower the probability that multiple \`key\`s will be assigned to the same bucket, and the fewer collisions. Therefore, **we can reduce hash collisions by expanding the hash table**.

As shown in the figure below, before expansion, the key-value pairs \`(136, A)\` and \`(236, D)\` collided, but after expansion, the collision disappears.

![Hash table resizing](hash_map.assets/hash_table_reshash.png)

Like resizing an array, resizing a hash table requires migrating all key-value pairs from the original table to the new table, which is expensive. In addition, because the hash table capacity \`capacity\` changes, we must recompute the storage location of every key-value pair using the hash function, which further increases the cost of resizing. For this reason, programming languages typically reserve a sufficiently large hash table capacity to avoid frequent resizing.

The <u>load factor</u> is an important concept in hash tables. It is defined as the number of elements in the hash table divided by the number of buckets and is used to measure the severity of hash collisions. **It is also commonly used as a threshold for triggering hash table resizing**. For example, in Java, when the load factor exceeds $0.75$, the system expands the hash table to twice its original size.

`
  },

  'dsa-hash-collision': {
    title: '6.2 Xung đột băm (Hash Collision)',
    summary: 'Phân tích các phương pháp xử lý xung đột băm: Separate Chaining (móc xích) và Open Addressing (định vị mở) với thăm dò tuyến tính, thăm dò bậc hai và băm nhiều lần.',
    tags: ['dsa', 'hashcollision', 'chaining', 'openaddressing'],
    domain: 'Algorithms',
    module: 'Chương 6: Bảng băm',
    prerequisites: ['dsa-hash-map'],
    related: ['dsa-hash-algorithm'],
    updatedAt: '2026-07-19',
    readTime: '15 phút',
    content: `

<p>Phần trước đã đề cập rằng, <strong>trong hầu hết các trường hợp, không gian đầu vào của hàm băm lớn hơn nhiều so với không gian đầu ra</strong>, vì vậy về mặt lý thuyết, xung đột băm là không thể tránh khỏi. Ví dụ, nếu không gian đầu vào là tất cả các số nguyên và không gian đầu ra là kích thước dung lượng mảng, thì chắc chắn nhiều số nguyên sẽ bị ánh xạ vào cùng một chỉ mục bucket.</p>
<p>Xung đột băm có thể dẫn đến kết quả truy vấn sai, ảnh hưởng nghiêm trọng đến khả năng sử dụng của bảng băm. Để giải quyết vấn đề này, mỗi khi xảy ra xung đột băm, chúng ta có thể thực hiện mở rộng bảng băm cho đến khi xung đột biến mất. Cách tiếp cận này đơn giản, trực tiếp và hiệu quả, nhưng lại rất kém hiệu suất vì việc mở rộng bảng băm liên quan đến việc di chuyển một lượng lớn dữ liệu và tính toán lại giá trị băm. Để cải thiện hiệu suất, chúng ta có thể áp dụng các chiến lược sau:</p>
<ol>
  <li>Cải thiện cấu trúc dữ liệu của bảng băm sao cho <strong>bảng băm vẫn có thể hoạt động bình thường khi xảy ra xung đột băm</strong>.</li>
  <li>Chỉ mở rộng khi cần thiết, tức là chỉ khi xung đột băm trở nên nghiêm trọng.</li>
</ol>
<p>Hai cách tiếp cận chính để cải thiện cấu trúc bảng băm là <strong>Separate Chaining (móc xích riêng biệt)</strong> và <strong>Open Addressing (định vị mở)</strong>.</p>

<h2>6.2.1 Separate Chaining</h2>
<p>Trong bảng băm ban đầu, mỗi bucket chỉ có thể lưu trữ một cặp khóa-giá trị. <u>Separate chaining</u> thay thế phần tử đơn lẻ trong mỗi bucket bằng một danh sách liên kết, coi mỗi cặp khóa-giá trị là một node và lưu trữ tất cả các cặp khóa-giá trị bị xung đột trong cùng một danh sách. Hình dưới đây minh họa một ví dụ về bảng băm sử dụng separate chaining.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/hash_table_chaining.png" alt="Bảng băm sử dụng Separate Chaining" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
<p>Trong bảng băm triển khai bằng separate chaining, các thao tác cơ bản hoạt động như sau:</p>
<ul>
  <li><strong>Truy vấn phần tử</strong>: Nhập <code>key</code>, tính chỉ mục bucket bằng hàm băm, truy cập vào đầu danh sách liên kết tương ứng, và duyệt danh sách trong khi so sánh khóa cho đến khi tìm thấy cặp khóa-giá trị mục tiêu.</li>
  <li><strong>Thêm phần tử</strong>: Trước tiên dùng hàm băm để xác định danh sách liên kết tương ứng, sau đó chèn node (cặp khóa-giá trị) vào danh sách.</li>
  <li><strong>Xóa phần tử</strong>: Dùng hàm băm để xác định danh sách liên kết tương ứng, sau đó duyệt để tìm và xóa node mục tiêu.</li>
</ul>
<p>Separate chaining có những hạn chế sau:</p>
<ul>
  <li><strong>Tăng chi phí sử dụng không gian</strong>: Danh sách liên kết chứa con trỏ node, tiêu tốn nhiều không gian bộ nhớ hơn so với mảng.</li>
  <li><strong>Giảm hiệu quả truy vấn</strong>: Vì cần phải duyệt tuyến tính qua danh sách liên kết để tìm phần tử tương ứng.</li>
</ul>
<p>Đoạn mã dưới đây cung cấp một triển khai đơn giản của bảng băm dùng separate chaining, với hai điều cần lưu ý:</p>
<ul>
  <li>Danh sách (mảng động) được sử dụng thay cho danh sách liên kết để đơn giản hóa mã nguồn. Trong thiết lập này, bảng băm (mảng) chứa nhiều bucket, mỗi bucket là một danh sách.</li>
  <li>Triển khai này bao gồm phương thức mở rộng bảng băm. Khi hệ số tải vượt quá $\\frac{2}{3}$, chúng ta mở rộng bảng băm lên $2$ lần kích thước ban đầu.</li>
</ul>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Bảng băm giải quyết xung đột bằng Separate Chaining (móc xích riêng biệt) */
class HashMapChaining {
    int size; // Số lượng cặp khóa-giá trị
    int capacity; // Dung lượng bảng băm
    double loadThres; // Ngưỡng hệ số tải để kích hoạt mở rộng
    int extendRatio; // Hệ số nhân khi mở rộng
    List&lt;List&lt;Pair&gt;&gt; buckets; // Mảng các bucket

    /* Hàm khởi tạo */
    public HashMapChaining() {
        size = 0;
        capacity = 4;
        loadThres = 2.0 / 3.0;
        extendRatio = 2;
        buckets = new ArrayList&lt;&gt;(capacity);
        for (int i = 0; i &lt; capacity; i++) {
            buckets.add(new ArrayList&lt;&gt;());
        }
    }

    /* Hàm băm */
    int hashFunc(int key) {
        return key % capacity;
    }

    /* Hệ số tải */
    double loadFactor() {
        return (double) size / capacity;
    }

    /* Thao tác truy vấn */
    String get(int key) {
        int index = hashFunc(key);
        List&lt;Pair&gt; bucket = buckets.get(index);
        // Duyệt bucket, nếu tìm thấy key thì trả về val tương ứng
        for (Pair pair : bucket) {
            if (pair.key == key) {
                return pair.val;
            }
        }
        // Nếu không tìm thấy key, trả về null
        return null;
    }

    /* Thao tác thêm */
    void put(int key, String val) {
        // Khi hệ số tải vượt ngưỡng, thực hiện mở rộng
        if (loadFactor() &gt; loadThres) {
            extend();
        }
        int index = hashFunc(key);
        List&lt;Pair&gt; bucket = buckets.get(index);
        // Duyệt bucket, nếu gặp key đã chỉ định thì cập nhật val tương ứng rồi return
        for (Pair pair : bucket) {
            if (pair.key == key) {
                pair.val = val;
                return;
            }
        }
        // Nếu key chưa tồn tại, thêm cặp khóa-giá trị vào cuối
        Pair pair = new Pair(key, val);
        bucket.add(pair);
        size++;
    }

    /* Thao tác xóa */
    void remove(int key) {
        int index = hashFunc(key);
        List&lt;Pair&gt; bucket = buckets.get(index);
        // Duyệt bucket và xóa cặp khóa-giá trị khỏi đó
        for (Pair pair : bucket) {
            if (pair.key == key) {
                bucket.remove(pair);
                size--;
                break;
            }
        }
    }

    /* Mở rộng bảng băm */
    void extend() {
        // Lưu tạm bảng băm gốc
        List&lt;List&lt;Pair&gt;&gt; bucketsTmp = buckets;
        // Khởi tạo bảng băm mới đã được mở rộng
        capacity *= extendRatio;
        buckets = new ArrayList&lt;&gt;(capacity);
        for (int i = 0; i &lt; capacity; i++) {
            buckets.add(new ArrayList&lt;&gt;());
        }
        size = 0;
        // Di chuyển các cặp khóa-giá trị từ bảng gốc sang bảng mới
        for (List&lt;Pair&gt; bucket : bucketsTmp) {
            for (Pair pair : bucket) {
                put(pair.key, pair.val);
            }
        }
    }

    /* In bảng băm */
    void print() {
        for (List&lt;Pair&gt; bucket : buckets) {
            List&lt;String&gt; res = new ArrayList&lt;&gt;();
            for (Pair pair : bucket) {
                res.add(pair.key + " -&gt; " + pair.val);
            }
            System.out.println(res);
        }
    }
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>HashMapChaining() {
    size = 0;
    capacity = 4;
    loadThres = 2.0 / 3.0;
    extendRatio = 2;
    buckets = List.generate(capacity, (_) =&gt; []);
  }</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>class HashMapChaining:
    """Bảng băm giải quyết xung đột bằng Separate Chaining (móc xích riêng biệt)"""

    def __init__(self):
        """Hàm khởi tạo"""
        self.size = 0  # Số lượng cặp khóa-giá trị
        self.capacity = 4  # Dung lượng bảng băm
        self.load_thres = 2.0 / 3.0  # Ngưỡng hệ số tải để kích hoạt mở rộng
        self.extend_ratio = 2  # Hệ số nhân khi mở rộng
        self.buckets = [[] for _ in range(self.capacity)]  # Mảng các bucket

    def hash_func(self, key: int) -&gt; int:
        """Hàm băm"""
        return key % self.capacity

    def load_factor(self) -&gt; float:
        """Hệ số tải"""
        return self.size / self.capacity

    def get(self, key: int) -&gt; str | None:
        """Thao tác truy vấn"""
        index = self.hash_func(key)
        bucket = self.buckets[index]
        # Duyệt bucket, nếu tìm thấy key thì trả về val tương ứng
        for pair in bucket:
            if pair.key == key:
                return pair.val
        # Nếu không tìm thấy key, trả về None
        return None

    def put(self, key: int, val: str):
        """Thao tác thêm"""
        # Khi hệ số tải vượt ngưỡng, thực hiện mở rộng
        if self.load_factor() &gt; self.load_thres:
            self.extend()
        index = self.hash_func(key)
        bucket = self.buckets[index]
        # Duyệt bucket, nếu gặp key đã chỉ định thì cập nhật val tương ứng rồi return
        for pair in bucket:
            if pair.key == key:
                pair.val = val
                return
        # Nếu key chưa tồn tại, thêm cặp khóa-giá trị vào cuối
        pair = Pair(key, val)
        bucket.append(pair)
        self.size += 1

    def remove(self, key: int):
        """Thao tác xóa"""
        index = self.hash_func(key)
        bucket = self.buckets[index]
        # Duyệt bucket và xóa cặp khóa-giá trị khỏi đó
        for pair in bucket:
            if pair.key == key:
                bucket.remove(pair)
                self.size -= 1
                break

    def extend(self):
        """Mở rộng bảng băm"""
        # Lưu tạm bảng băm gốc
        buckets = self.buckets
        # Khởi tạo bảng băm mới đã được mở rộng
        self.capacity *= self.extend_ratio
        self.buckets = [[] for _ in range(self.capacity)]
        self.size = 0
        # Di chuyển các cặp khóa-giá trị từ bảng gốc sang bảng mới
        for bucket in buckets:
            for pair in bucket:
                self.put(pair.key, pair.val)

    def print(self):
        """In bảng băm"""
        for bucket in self.buckets:
            res = []
            for pair in bucket:
                res.append(str(pair.key) + " -&gt; " + pair.val)
            print(res)</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Bảng băm giải quyết xung đột bằng Separate Chaining (móc xích riêng biệt) */
class HashMapChaining {
  private:
    int size;                       // Số lượng cặp khóa-giá trị
    int capacity;                   // Dung lượng bảng băm
    double loadThres;               // Ngưỡng hệ số tải để kích hoạt mở rộng
    int extendRatio;                // Hệ số nhân khi mở rộng
    vector&lt;vector&lt;Pair *&gt;&gt; buckets; // Mảng các bucket

  public:
    /* Hàm khởi tạo */
    HashMapChaining() : size(0), capacity(4), loadThres(2.0 / 3.0), extendRatio(2) {
        buckets.resize(capacity);
    }

    /* Hàm hủy */
    ~HashMapChaining() {
        for (auto &amp;bucket : buckets) {
            for (Pair *pair : bucket) {
                // Giải phóng bộ nhớ
                delete pair;
            }
        }
    }

    /* Hàm băm */
    int hashFunc(int key) {
        return key % capacity;
    }

    /* Hệ số tải */
    double loadFactor() {
        return (double)size / (double)capacity;
    }

    /* Thao tác truy vấn */
    string get(int key) {
        int index = hashFunc(key);
        // Duyệt bucket, nếu tìm thấy key thì trả về val tương ứng
        for (Pair *pair : buckets[index]) {
            if (pair-&gt;key == key) {
                return pair-&gt;val;
            }
        }
        // Trả về chuỗi rỗng nếu không tìm thấy key
        return "";
    }

    /* Thao tác thêm */
    void put(int key, string val) {
        // Khi hệ số tải vượt ngưỡng, thực hiện mở rộng
        if (loadFactor() &gt; loadThres) {
            extend();
        }
        int index = hashFunc(key);
        // Duyệt bucket, nếu gặp key đã chỉ định thì cập nhật val tương ứng rồi return
        for (Pair *pair : buckets[index]) {
            if (pair-&gt;key == key) {
                pair-&gt;val = val;
                return;
            }
        }
        // Nếu key chưa tồn tại, thêm cặp khóa-giá trị vào cuối
        buckets[index].push_back(new Pair(key, val));
        size++;
    }

    /* Thao tác xóa */
    void remove(int key) {
        int index = hashFunc(key);
        auto &amp;bucket = buckets[index];
        // Duyệt bucket và xóa cặp khóa-giá trị khỏi đó
        for (int i = 0; i &lt; bucket.size(); i++) {
            if (bucket[i]-&gt;key == key) {
                Pair *tmp = bucket[i];
                bucket.erase(bucket.begin() + i); // Xóa cặp khóa-giá trị khỏi đó
                delete tmp;                       // Giải phóng bộ nhớ
                size--;
                return;
            }
        }
    }

    /* Mở rộng bảng băm */
    void extend() {
        // Lưu tạm bảng băm gốc
        vector&lt;vector&lt;Pair *&gt;&gt; bucketsTmp = buckets;
        // Khởi tạo bảng băm mới đã được mở rộng
        capacity *= extendRatio;
        buckets.clear();
        buckets.resize(capacity);
        size = 0;
        // Di chuyển các cặp khóa-giá trị từ bảng gốc sang bảng mới
        for (auto &amp;bucket : bucketsTmp) {
            for (Pair *pair : bucket) {
                put(pair-&gt;key, pair-&gt;val);
                // Giải phóng bộ nhớ
                delete pair;
            }
        }
    }

    /* In bảng băm */
    void print() {
        for (auto &amp;bucket : buckets) {
            cout &lt;&lt; "[";
            for (Pair *pair : bucket) {
                cout &lt;&lt; pair-&gt;key &lt;&lt; " -&gt; " &lt;&lt; pair-&gt;val &lt;&lt; ", ";
            }
            cout &lt;&lt; "]\\n";
        }
    }
};</code></pre></div></div></div>
<p>Đáng chú ý là khi danh sách liên kết trở nên rất dài, thời gian truy vấn $O(n)$ là kém. <strong>Trong trường hợp này, danh sách liên kết có thể được chuyển thành cây AVL hoặc cây Đỏ-Đen (red-black tree)</strong>, giúp giảm độ phức tạp thời gian tra cứu xuống còn $O(\\log n)$.</p>

<div class="interactive-widget-wrapper" id="hash-chaining-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'hash-chaining-wrapper', 'tab-static')">📸 Minh họa tĩnh</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'hash-chaining-wrapper', 'tab-interactive'); initHashChainingDemo()">⚡ Mô phỏng tương tác</button>
  </div>
  <div class="widget-tab-content active" data-tab="tab-static">
    <div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/hash_table_chaining.png" alt="Bảng băm sử dụng Separate Chaining" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
  </div>
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div id="hash-chaining-canvas" style="display:flex; flex-wrap:wrap; gap:10px; justify-content:center; margin: 1em 0;"></div>
    <div style="display:flex; gap:8px; flex-wrap:wrap; justify-content:center; margin: 1em 0;">
      <button id="hash-chaining-btn-autorun" class="control-btn" onclick="autoRunHashChaining()">▶ Auto Run</button>
      <button id="hash-chaining-btn-step" class="control-btn" onclick="stepHashChaining()">Bước tiếp theo ▶</button>
      <button id="hash-chaining-btn-pause" class="control-btn btn-secondary" onclick="pauseRunHashChaining()" disabled>⏸ Dừng</button>
      <button id="hash-chaining-btn-reset" class="control-btn btn-secondary" onclick="initHashChainingDemo()">↺ Reset</button>
    </div>
    <div style="text-align:center; margin: 0.5em 0;">
      Tốc độ: <input type="range" min="200" max="2000" value="800" step="200" oninput="setHashChainingSpeed(this.value)" /> <span id="hash-chaining-speed-label">800ms</span>
    </div>
    <p id="hash-chaining-status" style="text-align:center; font-size:14px; color:var(--text-secondary);">Nhấp "Auto Run" để xem quá trình chèn/xung đột/mở rộng dung lượng.</p>
  </div>
</div>

<h2>6.2.2 Open Addressing</h2>
<p><u>Open addressing</u> không đưa thêm cấu trúc dữ liệu phụ nào. Thay vào đó, nó xử lý xung đột băm bằng cách <em>thăm dò (probing)</em> lặp đi lặp lại. Các chiến lược thăm dò phổ biến bao gồm thăm dò tuyến tính, thăm dò bậc hai, và băm nhiều lần.</p>
<p>Hãy dùng thăm dò tuyến tính làm ví dụ để giới thiệu cơ chế của bảng băm định vị mở.</p>

<h3>6.2.2.1 Linear Probing (Thăm dò tuyến tính)</h3>
<p>Thăm dò tuyến tính sử dụng một bước nhảy cố định để thăm dò tuần tự, do đó các thao tác của nó có phần khác với bảng băm thông thường.</p>
<ul>
  <li><strong>Chèn phần tử</strong>: Tính chỉ mục bucket bằng hàm băm. Nếu bucket đã bị chiếm, tiếp tục thăm dò về phía trước từ vị trí xung đột với bước nhảy cố định (thường là $1$) cho đến khi tìm thấy một bucket trống, rồi chèn phần tử vào đó.</li>
  <li><strong>Tìm phần tử</strong>: Nếu xảy ra xung đột, tiếp tục thăm dò về phía trước với cùng bước nhảy cho đến khi tìm thấy phần tử tương ứng và trả về <code>value</code> của nó; nếu gặp một bucket trống, phần tử mục tiêu không có trong bảng băm, vì vậy trả về <code>None</code>.</li>
</ul>
<p>Hình dưới đây thể hiện sự phân bố các cặp khóa-giá trị trong một bảng băm định vị mở sử dụng thăm dò tuyến tính. Với hàm băm này, các khóa có cùng hai chữ số cuối được ánh xạ vào cùng một bucket. Thăm dò tuyến tính sau đó đặt chúng vào bucket đó và các bucket kế tiếp.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/hash_table_linear_probing.png" alt="Phân bố cặp khóa-giá trị trong bảng băm định vị mở (thăm dò tuyến tính)" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
<p>Tuy nhiên, <strong>thăm dò tuyến tính rất dễ dẫn đến hiện tượng cụm dữ liệu (clustering)</strong>. Cụ thể, vùng bị chiếm liên tục trong mảng càng dài thì càng có nhiều khả năng xảy ra xung đột mới trong vùng đó. Điều này lại khiến cụm càng phình to hơn, tạo ra một vòng luẩn quẩn làm suy giảm dần hiệu suất của các thao tác chèn, xóa, tra cứu và cập nhật.</p>
<p>Cần lưu ý rằng <strong>chúng ta không thể trực tiếp xóa phần tử khỏi bảng băm định vị mở</strong>. Việc xóa một phần tử sẽ tạo ra một bucket trống <code>None</code> trong mảng. Trong quá trình tìm kiếm, khi thăm dò tuyến tính đến bucket trống đó, nó sẽ dừng lại — điều này có nghĩa là bất kỳ phần tử nào được lưu xa hơn trên chuỗi thăm dò sẽ trở nên không thể truy cập được. Kết quả là, chương trình có thể kết luận sai rằng những phần tử đó không tồn tại, như minh họa trong hình dưới đây.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/hash_table_open_addressing_deletion.png" alt="Vấn đề truy vấn gây ra bởi việc xóa phần tử trong định vị mở" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
<p>Để giải quyết vấn đề này, chúng ta có thể áp dụng <u>lazy deletion (xóa lười)</u>: thay vì trực tiếp xóa một phần tử khỏi bảng băm, ta <strong>dùng một hằng số <code>TOMBSTONE</code> để đánh dấu bucket đó</strong>. Theo cơ chế này, cả <code>None</code> và <code>TOMBSTONE</code> đều biểu thị các bucket có thể tiếp nhận cặp khóa-giá trị mới. Điểm khác biệt là khi thăm dò tuyến tính gặp <code>TOMBSTONE</code>, nó phải tiếp tục thăm dò, vì các cặp khóa-giá trị vẫn có thể tồn tại xa hơn trên chuỗi.</p>
<p>Tuy nhiên, <strong>xóa lười có thể làm tăng tốc độ suy giảm hiệu năng của bảng băm</strong>. Mỗi lần xóa để lại một dấu vết, và khi số lượng <code>TOMBSTONE</code> tăng lên, thời gian tìm kiếm cũng tăng theo, vì thăm dò tuyến tính có thể phải bỏ qua nhiều bia mộ trước khi tìm được phần tử mục tiêu.</p>
<p>Để khắc phục điều này, chúng ta có thể ghi lại chỉ mục của <code>TOMBSTONE</code> đầu tiên gặp được trong quá trình thăm dò tuyến tính, và hoán đổi phần tử mục tiêu tìm được vào vị trí đó. Lợi ích là mỗi lần truy vấn hoặc chèn có thể đưa các phần tử về gần vị trí lý tưởng hơn, tức là gần điểm bắt đầu thăm dò hơn, giúp cải thiện hiệu quả tra cứu.</p>
<p>Đoạn mã dưới đây triển khai một bảng băm định vị mở (thăm dò tuyến tính) với xóa lười. Để tận dụng tốt hơn không gian của bảng băm, chúng ta coi bảng băm như một "mảng vòng tròn". Khi vượt quá cuối mảng, ta quay lại đầu và tiếp tục duyệt.</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Bảng băm giải quyết xung đột bằng Open Addressing (định vị mở) */
class HashMapOpenAddressing {
    private int size; // Số lượng cặp khóa-giá trị
    private int capacity = 4; // Dung lượng bảng băm
    private final double loadThres = 2.0 / 3.0; // Ngưỡng hệ số tải để kích hoạt mở rộng
    private final int extendRatio = 2; // Hệ số nhân khi mở rộng
    private Pair[] buckets; // Mảng các bucket
    private final Pair TOMBSTONE = new Pair(-1, "-1"); // Ký hiệu đánh dấu đã xóa

    /* Hàm khởi tạo */
    public HashMapOpenAddressing() {
        size = 0;
        buckets = new Pair[capacity];
    }

    /* Hàm băm */
    private int hashFunc(int key) {
        return key % capacity;
    }

    /* Hệ số tải */
    private double loadFactor() {
        return (double) size / capacity;
    }

    /* Tìm chỉ mục bucket tương ứng với key */
    private int findBucket(int key) {
        int index = hashFunc(key);
        int firstTombstone = -1;
        // Thăm dò tuyến tính, dừng khi gặp bucket trống
        while (buckets[index] != null) {
            // Nếu gặp key, trả về chỉ mục bucket tương ứng
            if (buckets[index].key == key) {
                // Nếu trước đó đã gặp TOMBSTONE, di chuyển cặp khóa-giá trị về đó
                if (firstTombstone != -1) {
                    buckets[firstTombstone] = buckets[index];
                    buckets[index] = TOMBSTONE;
                    return firstTombstone; // Trả về chỉ mục bucket đã di chuyển
                }
                return index; // Trả về chỉ mục bucket
            }
            // Ghi nhớ TOMBSTONE đầu tiên gặp được
            if (firstTombstone == -1 &amp;&amp; buckets[index] == TOMBSTONE) {
                firstTombstone = index;
            }
            // Tính chỉ mục bucket tiếp theo, quay về đầu nếu vượt quá cuối mảng
            index = (index + 1) % capacity;
        }
        // Nếu key không tồn tại, trả về chỉ mục để chèn
        return firstTombstone == -1 ? index : firstTombstone;
    }

    /* Thao tác truy vấn */
    public String get(int key) {
        // Tìm chỉ mục bucket tương ứng với key
        int index = findBucket(key);
        // Nếu tìm thấy cặp khóa-giá trị, trả về val tương ứng
        if (buckets[index] != null &amp;&amp; buckets[index] != TOMBSTONE) {
            return buckets[index].val;
        }
        // Nếu cặp khóa-giá trị không tồn tại, trả về null
        return null;
    }

    /* Thao tác thêm */
    public void put(int key, String val) {
        // Khi hệ số tải vượt ngưỡng, thực hiện mở rộng
        if (loadFactor() &gt; loadThres) {
            extend();
        }
        // Tìm chỉ mục bucket tương ứng với key
        int index = findBucket(key);
        // Nếu tìm thấy cặp khóa-giá trị, ghi đè val rồi return
        if (buckets[index] != null &amp;&amp; buckets[index] != TOMBSTONE) {
            buckets[index].val = val;
            return;
        }
        // Nếu cặp khóa-giá trị không tồn tại, thêm cặp khóa-giá trị
        buckets[index] = new Pair(key, val);
        size++;
    }

    /* Thao tác xóa */
    public void remove(int key) {
        // Tìm chỉ mục bucket tương ứng với key
        int index = findBucket(key);
        // Nếu tìm thấy cặp khóa-giá trị, ghi đè bằng ký hiệu TOMBSTONE
        if (buckets[index] != null &amp;&amp; buckets[index] != TOMBSTONE) {
            buckets[index] = TOMBSTONE;
            size--;
        }
    }

    /* Mở rộng bảng băm */
    private void extend() {
        // Lưu tạm bảng băm gốc
        Pair[] bucketsTmp = buckets;
        // Khởi tạo bảng băm mới đã được mở rộng
        capacity *= extendRatio;
        buckets = new Pair[capacity];
        size = 0;
        // Di chuyển các cặp khóa-giá trị từ bảng gốc sang bảng mới
        for (Pair pair : bucketsTmp) {
            if (pair != null &amp;&amp; pair != TOMBSTONE) {
                put(pair.key, pair.val);
            }
        }
    }

    /* In bảng băm */
    public void print() {
        for (Pair pair : buckets) {
            if (pair == null) {
                System.out.println("null");
            } else if (pair == TOMBSTONE) {
                System.out.println("TOMBSTONE");
            } else {
                System.out.println(pair.key + " -&gt; " + pair.val);
            }
        }
    }
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>HashMapOpenAddressing() {
    _size = 0;
    _buckets = List.generate(_capacity, (index) =&gt; null);
  }</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>class HashMapOpenAddressing:
    """Bảng băm giải quyết xung đột bằng Open Addressing (định vị mở)"""

    def __init__(self):
        """Hàm khởi tạo"""
        self.size = 0  # Số lượng cặp khóa-giá trị
        self.capacity = 4  # Dung lượng bảng băm
        self.load_thres = 2.0 / 3.0  # Ngưỡng hệ số tải để kích hoạt mở rộng
        self.extend_ratio = 2  # Hệ số nhân khi mở rộng
        self.buckets: list[Pair | None] = [None] * self.capacity  # Mảng các bucket
        self.TOMBSTONE = Pair(-1, "-1")  # Ký hiệu đánh dấu đã xóa

    def hash_func(self, key: int) -&gt; int:
        """Hàm băm"""
        return key % self.capacity

    def load_factor(self) -&gt; float:
        """Hệ số tải"""
        return self.size / self.capacity

    def find_bucket(self, key: int) -&gt; int:
        """Tìm chỉ mục bucket tương ứng với key"""
        index = self.hash_func(key)
        first_tombstone = -1
        # Thăm dò tuyến tính, dừng khi gặp bucket trống
        while self.buckets[index] is not None:
            # Nếu gặp key, trả về chỉ mục bucket tương ứng
            if self.buckets[index].key == key:
                # Nếu trước đó đã gặp TOMBSTONE, di chuyển cặp khóa-giá trị về đó
                if first_tombstone != -1:
                    self.buckets[first_tombstone] = self.buckets[index]
                    self.buckets[index] = self.TOMBSTONE
                    return first_tombstone  # Trả về chỉ mục bucket đã di chuyển
                return index  # Trả về chỉ mục bucket
            # Ghi nhớ TOMBSTONE đầu tiên gặp được
            if first_tombstone == -1 and self.buckets[index] is self.TOMBSTONE:
                first_tombstone = index
            # Tính chỉ mục bucket tiếp theo, quay về đầu nếu vượt quá cuối mảng
            index = (index + 1) % self.capacity
        # Nếu key không tồn tại, trả về chỉ mục để chèn
        return index if first_tombstone == -1 else first_tombstone

    def get(self, key: int) -&gt; str:
        """Thao tác truy vấn"""
        # Tìm chỉ mục bucket tương ứng với key
        index = self.find_bucket(key)
        # Nếu tìm thấy cặp khóa-giá trị, trả về val tương ứng
        if self.buckets[index] not in [None, self.TOMBSTONE]:
            return self.buckets[index].val
        # Nếu cặp khóa-giá trị không tồn tại, trả về None
        return None

    def put(self, key: int, val: str):
        """Thao tác thêm"""
        # Khi hệ số tải vượt ngưỡng, thực hiện mở rộng
        if self.load_factor() &gt; self.load_thres:
            self.extend()
        # Tìm chỉ mục bucket tương ứng với key
        index = self.find_bucket(key)
        # Nếu tìm thấy cặp khóa-giá trị, ghi đè val rồi return
        if self.buckets[index] not in [None, self.TOMBSTONE]:
            self.buckets[index].val = val
            return
        # Nếu cặp khóa-giá trị không tồn tại, thêm cặp khóa-giá trị
        self.buckets[index] = Pair(key, val)
        self.size += 1

    def remove(self, key: int):
        """Thao tác xóa"""
        # Tìm chỉ mục bucket tương ứng với key
        index = self.find_bucket(key)
        # Nếu tìm thấy cặp khóa-giá trị, ghi đè bằng ký hiệu TOMBSTONE
        if self.buckets[index] not in [None, self.TOMBSTONE]:
            self.buckets[index] = self.TOMBSTONE
            self.size -= 1

    def extend(self):
        """Mở rộng bảng băm"""
        # Lưu tạm bảng băm gốc
        buckets_tmp = self.buckets
        # Khởi tạo bảng băm mới đã được mở rộng
        self.capacity *= self.extend_ratio
        self.buckets = [None] * self.capacity
        self.size = 0
        # Di chuyển các cặp khóa-giá trị từ bảng gốc sang bảng mới
        for pair in buckets_tmp:
            if pair not in [None, self.TOMBSTONE]:
                self.put(pair.key, pair.val)

    def print(self):
        """In bảng băm"""
        for pair in self.buckets:
            if pair is None:
                print("None")
            elif pair is self.TOMBSTONE:
                print("TOMBSTONE")
            else:
                print(pair.key, "-&gt;", pair.val)</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Bảng băm giải quyết xung đột bằng Open Addressing (định vị mở) */
class HashMapOpenAddressing {
  private:
    int size;                             // Số lượng cặp khóa-giá trị
    int capacity = 4;                     // Dung lượng bảng băm
    const double loadThres = 2.0 / 3.0;   // Ngưỡng hệ số tải để kích hoạt mở rộng
    const int extendRatio = 2;            // Hệ số nhân khi mở rộng
    vector&lt;Pair *&gt; buckets;               // Mảng các bucket
    Pair *TOMBSTONE = new Pair(-1, "-1"); // Ký hiệu đánh dấu đã xóa

  public:
    /* Hàm khởi tạo */
    HashMapOpenAddressing() : size(0), buckets(capacity, nullptr) {
    }

    /* Hàm hủy */
    ~HashMapOpenAddressing() {
        for (Pair *pair : buckets) {
            if (pair != nullptr &amp;&amp; pair != TOMBSTONE) {
                delete pair;
            }
        }
        delete TOMBSTONE;
    }

    /* Hàm băm */
    int hashFunc(int key) {
        return key % capacity;
    }

    /* Hệ số tải */
    double loadFactor() {
        return (double)size / capacity;
    }

    /* Tìm chỉ mục bucket tương ứng với key */
    int findBucket(int key) {
        int index = hashFunc(key);
        int firstTombstone = -1;
        // Thăm dò tuyến tính, dừng khi gặp bucket trống
        while (buckets[index] != nullptr) {
            // Nếu gặp key, trả về chỉ mục bucket tương ứng
            if (buckets[index]-&gt;key == key) {
                // Nếu trước đó đã gặp TOMBSTONE, di chuyển cặp khóa-giá trị về đó
                if (firstTombstone != -1) {
                    buckets[firstTombstone] = buckets[index];
                    buckets[index] = TOMBSTONE;
                    return firstTombstone; // Trả về chỉ mục bucket đã di chuyển
                }
                return index; // Trả về chỉ mục bucket
            }
            // Ghi nhớ TOMBSTONE đầu tiên gặp được
            if (firstTombstone == -1 &amp;&amp; buckets[index] == TOMBSTONE) {
                firstTombstone = index;
            }
            // Tính chỉ mục bucket tiếp theo, quay về đầu nếu vượt quá cuối mảng
            index = (index + 1) % capacity;
        }
        // Nếu key không tồn tại, trả về chỉ mục để chèn
        return firstTombstone == -1 ? index : firstTombstone;
    }

    /* Thao tác truy vấn */
    string get(int key) {
        // Tìm chỉ mục bucket tương ứng với key
        int index = findBucket(key);
        // Nếu tìm thấy cặp khóa-giá trị, trả về val tương ứng
        if (buckets[index] != nullptr &amp;&amp; buckets[index] != TOMBSTONE) {
            return buckets[index]-&gt;val;
        }
        // Trả về chuỗi rỗng nếu cặp khóa-giá trị không tồn tại
        return "";
    }

    /* Thao tác thêm */
    void put(int key, string val) {
        // Khi hệ số tải vượt ngưỡng, thực hiện mở rộng
        if (loadFactor() &gt; loadThres) {
            extend();
        }
        // Tìm chỉ mục bucket tương ứng với key
        int index = findBucket(key);
        // Nếu tìm thấy cặp khóa-giá trị, ghi đè val rồi return
        if (buckets[index] != nullptr &amp;&amp; buckets[index] != TOMBSTONE) {
            buckets[index]-&gt;val = val;
            return;
        }
        // Nếu cặp khóa-giá trị không tồn tại, thêm cặp khóa-giá trị
        buckets[index] = new Pair(key, val);
        size++;
    }

    /* Thao tác xóa */
    void remove(int key) {
        // Tìm chỉ mục bucket tương ứng với key
        int index = findBucket(key);
        // Nếu tìm thấy cặp khóa-giá trị, ghi đè bằng ký hiệu TOMBSTONE
        if (buckets[index] != nullptr &amp;&amp; buckets[index] != TOMBSTONE) {
            delete buckets[index];
            buckets[index] = TOMBSTONE;
            size--;
        }
    }

    /* Mở rộng bảng băm */
    void extend() {
        // Lưu tạm bảng băm gốc
        vector&lt;Pair *&gt; bucketsTmp = buckets;
        // Khởi tạo bảng băm mới đã được mở rộng
        capacity *= extendRatio;
        buckets = vector&lt;Pair *&gt;(capacity, nullptr);
        size = 0;
        // Di chuyển các cặp khóa-giá trị từ bảng gốc sang bảng mới
        for (Pair *pair : bucketsTmp) {
            if (pair != nullptr &amp;&amp; pair != TOMBSTONE) {
                put(pair-&gt;key, pair-&gt;val);
                delete pair;
            }
        }
    }

    /* In bảng băm */
    void print() {
        for (Pair *pair : buckets) {
            if (pair == nullptr) {
                cout &lt;&lt; "nullptr" &lt;&lt; endl;
            } else if (pair == TOMBSTONE) {
                cout &lt;&lt; "TOMBSTONE" &lt;&lt; endl;
            } else {
                cout &lt;&lt; pair-&gt;key &lt;&lt; " -&gt; " &lt;&lt; pair-&gt;val &lt;&lt; endl;
            }
        }
    }
};</code></pre></div></div></div>

<div class="interactive-widget-wrapper" id="hash-open-addressing-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'hash-open-addressing-wrapper', 'tab-static')">📸 Minh họa tĩnh</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'hash-open-addressing-wrapper', 'tab-interactive'); initHashOpenAddrDemo()">⚡ Mô phỏng tương tác</button>
  </div>
  <div class="widget-tab-content active" data-tab="tab-static">
    <div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/hash_table_linear_probing.png" alt="Phân bố cặp khóa-giá trị trong bảng băm định vị mở (thăm dò tuyến tính)" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
  </div>
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div id="hash-open-addressing-canvas" style="display:flex; flex-wrap:wrap; gap:8px; justify-content:center; margin: 1em 0;"></div>
    <div style="display:flex; gap:8px; flex-wrap:wrap; justify-content:center; margin: 1em 0;">
      <button id="hash-open-addressing-btn-autorun" class="control-btn" onclick="autoRunHashOpenAddr()">▶ Auto Run</button>
      <button id="hash-open-addressing-btn-step" class="control-btn" onclick="stepHashOpenAddr()">Bước tiếp theo ▶</button>
      <button id="hash-open-addressing-btn-pause" class="control-btn btn-secondary" onclick="pauseRunHashOpenAddr()" disabled>⏸ Dừng</button>
      <button id="hash-open-addressing-btn-reset" class="control-btn btn-secondary" onclick="initHashOpenAddrDemo()">↺ Reset</button>
    </div>
    <div style="text-align:center; margin: 0.5em 0;">
      Tốc độ: <input type="range" min="200" max="2000" value="800" step="200" oninput="setHashOpenAddrSpeed(this.value)" /> <span id="hash-open-addressing-speed-label">800ms</span>
    </div>
    <p id="hash-open-addressing-status" style="text-align:center; font-size:14px; color:var(--text-secondary);">Nhấp "Auto Run" để xem thăm dò tuyến tính, TOMBSTONE và tái sử dụng bucket đã xóa.</p>
  </div>
</div>

<h3>6.2.2.2 Quadratic Probing (Thăm dò bậc hai)</h3>
<p>Thăm dò bậc hai tương tự thăm dò tuyến tính và là một trong những chiến lược phổ biến của định vị mở. Khi xảy ra xung đột, thăm dò bậc hai không đơn giản bỏ qua một số bước cố định mà bỏ qua số bước bằng "bình phương số lần thăm dò", tức $1, 4, 9, \\dots$ bước.</p>
<p>Thăm dò bậc hai có những ưu điểm sau:</p>
<ul>
  <li>Thăm dò bậc hai cố gắng giảm bớt hiệu ứng cụm dữ liệu của thăm dò tuyến tính bằng cách nhảy các khoảng cách bằng bình phương số lần thăm dò.</li>
  <li>Thăm dò bậc hai nhảy các khoảng cách lớn hơn để tìm vị trí trống, giúp phân bố dữ liệu đồng đều hơn.</li>
</ul>
<p>Tuy nhiên, thăm dò bậc hai không hoàn hảo:</p>
<ul>
  <li>Hiện tượng cụm vẫn tồn tại, tức là một số vị trí vẫn có khả năng bị chiếm cao hơn các vị trí khác.</li>
  <li>Do sự tăng trưởng theo bình phương, thăm dò bậc hai có thể không thăm dò được toàn bộ bảng băm, nghĩa là ngay cả khi bảng băm còn bucket trống, thăm dò bậc hai vẫn có thể không truy cập được đến chúng.</li>
</ul>

<h3>6.2.2.3 Multiple Hashing (Băm nhiều lần)</h3>
<p>Đúng như tên gọi, băm nhiều lần sử dụng nhiều hàm băm $f_1(x)$, $f_2(x)$, $f_3(x)$, $\\dots$ để thăm dò.</p>
<ul>
  <li><strong>Chèn phần tử</strong>: Nếu hàm băm $f_1(x)$ gặp xung đột, thử $f_2(x)$, và cứ tiếp tục như vậy, cho đến khi tìm được vị trí trống và chèn phần tử vào.</li>
  <li><strong>Tìm phần tử</strong>: Tìm kiếm theo cùng thứ tự các hàm băm cho đến khi tìm thấy phần tử mục tiêu và trả về; nếu gặp vị trí trống hoặc đã thử hết tất cả các hàm băm, điều đó cho thấy phần tử không có trong bảng băm, khi đó trả về <code>None</code>.</li>
</ul>
<p>So với thăm dò tuyến tính, băm nhiều lần ít gặp hiện tượng cụm dữ liệu hơn, nhưng việc dùng nhiều hàm băm sẽ phát sinh thêm chi phí tính toán.</p>
<div class="callout callout-tip">
  <span class="callout-icon">💡</span>
  <div class="callout-body">
    <p>Lưu ý rằng các bảng băm dựa trên định vị mở, bao gồm thăm dò tuyến tính, thăm dò bậc hai và băm nhiều lần, đều có vấn đề là không thể xóa phần tử trực tiếp.</p>
  </div>
</div>

<h2>6.2.3 Lựa chọn của các ngôn ngữ lập trình</h2>
<p>Các ngôn ngữ lập trình khác nhau áp dụng các chiến lược triển khai bảng băm khác nhau. Dưới đây là một vài ví dụ:</p>
<ul>
  <li><strong>Python</strong> sử dụng định vị mở. Kiểu <code>dict</code> sử dụng số giả ngẫu nhiên để thăm dò.</li>
  <li><strong>Java</strong> sử dụng separate chaining. Kể từ JDK 1.8, khi độ dài mảng trong <code>HashMap</code> đạt $64$ và độ dài danh sách liên kết đạt $8$, danh sách liên kết được chuyển thành cây Đỏ-Đen để cải thiện hiệu suất tìm kiếm.</li>
  <li><strong>Go</strong> sử dụng separate chaining. Go quy định mỗi bucket có thể lưu trữ tối đa $8$ cặp khóa-giá trị, và nếu vượt quá dung lượng, một bucket tràn (overflow bucket) sẽ được liên kết vào; khi có quá nhiều bucket tràn, một thao tác mở rộng đặc biệt với dung lượng bằng nhau sẽ được thực hiện để đảm bảo hiệu năng.</li>
</ul>

`,
    originalContent: `
# Hash Collision

The previous section mentioned that, **in most cases, the input space of a hash function is much larger than the output space**, so theoretically, hash collisions are inevitable. For example, if the input space is all integers and the output space is the array capacity size, then multiple integers will inevitably be mapped to the same bucket index.

Hash collisions can lead to incorrect query results, severely impacting the usability of the hash table. To address this issue, whenever a hash collision occurs, we can perform hash table expansion until the collision disappears. This approach is simple, straightforward, and effective, but it is very inefficient because hash table expansion involves a large amount of data migration and hash value recalculation. To improve efficiency, we can adopt the following strategies:

1. Improve the hash table data structure so that **the hash table can function normally when hash collisions occur**.
2. Only expand when necessary, that is, only when hash collisions are severe.

The main approaches to improving a hash table's structure are separate chaining and open addressing.

## Separate Chaining

In the original hash table, each bucket can store only one key-value pair. <u>Separate chaining</u> replaces the single element in each bucket with a linked list, treating each key-value pair as a node and storing all colliding key-value pairs in the same list. The figure below shows an example of a separate chaining hash table.

![Separate chaining hash table](hash_collision.assets/hash_table_chaining.png)

In a hash table implemented with separate chaining, the basic operations work as follows:

- **Querying elements**: Input \`key\`, compute the bucket index using the hash function, access the head of the corresponding linked list, and traverse the list while comparing keys until the target key-value pair is found.
- **Adding elements**: First use the hash function to locate the corresponding linked list, then insert the node (key-value pair) into the list.
- **Deleting elements**: Use the hash function to locate the corresponding linked list, then traverse it to find and delete the target node.

Separate chaining has the following limitations:

- **Increased Space Usage**: The linked list contains node pointers, which consume more memory space than arrays.
- **Reduced Query Efficiency**: This is because linear traversal of the linked list is required to find the corresponding element.

The code below provides a simple implementation of a separate chaining hash table, with two things to note:

- Lists (dynamic arrays) are used instead of linked lists to simplify the code. In this setup, the hash table (array) contains multiple buckets, each of which is a list.
- This implementation includes a hash table expansion method. When the load factor exceeds $\\frac{2}{3}$, we expand the hash table to $2$ times its original size.

\`\`\`src
[file]{hash_map_chaining}-[class]{hash_map_chaining}-[func]{}
\`\`\`

It's worth noting that when the linked list becomes very long, the query time $O(n)$ is poor. **In this case, the linked list can be converted into an AVL tree or a red-black tree**, reducing the time complexity of lookups to $O(\\log n)$.

## Open Addressing

<u>Open addressing</u> does not introduce additional data structures. Instead, it handles hash collisions through repeated probing. Common probing strategies include linear probing, quadratic probing, and multiple hashing.

Let's use linear probing as an example to introduce the mechanism of open addressing hash tables.

### Linear Probing

Linear probing uses a fixed step size to probe sequentially, so its operations differ somewhat from those of an ordinary hash table.

- **Inserting elements**: Compute the bucket index using the hash function. If the bucket is already occupied, continue probing forward from the collision position with a fixed step size (usually $1$) until an empty bucket is found, then insert the element there.
- **Searching for elements**: If a collision occurs, continue probing forward with the same step size until the corresponding element is found and return its \`value\`; if an empty bucket is encountered, the target element is not in the hash table, so return \`None\`.

The figure below shows the distribution of key-value pairs in an open-addressing hash table that uses linear probing. Under this hash function, keys with the same last two digits are mapped to the same bucket. Linear probing then places them in that bucket and the subsequent buckets.

![Distribution of key-value pairs in open addressing (linear probing) hash table](hash_collision.assets/hash_table_linear_probing.png)

However, **linear probing is prone to clustering**. Specifically, the longer a contiguous occupied region in the array becomes, the more likely new collisions are to occur within that region. This in turn makes the cluster grow even further, creating a vicious cycle that gradually degrades the efficiency of insertion, deletion, lookup, and update operations.

It's important to note that **we cannot directly delete elements from an open-addressing hash table**. Deleting an element creates an empty bucket \`None\` in the array. During lookup, once linear probing reaches that empty bucket, it stops, which means any elements stored farther along the probe sequence become unreachable. As a result, the program may incorrectly conclude that those elements do not exist, as shown in the figure below.

![Query issues caused by deletion in open addressing](hash_collision.assets/hash_table_open_addressing_deletion.png)

To solve this problem, we can adopt <u>lazy deletion</u>: instead of directly removing an element from the hash table, **use a constant \`TOMBSTONE\` to mark the bucket**. Under this mechanism, both \`None\` and \`TOMBSTONE\` denote buckets that can accept key-value pairs. The difference is that when linear probing encounters \`TOMBSTONE\`, it must continue probing, because key-value pairs may still exist farther along the sequence.

However, **lazy deletion may accelerate hash-table performance degradation**. Each deletion leaves behind a marker, and as the number of \`TOMBSTONE\` entries grows, search time increases as well, because linear probing may need to skip over multiple tombstones before finding the target element.

To address this, we can record the index of the first \`TOMBSTONE\` encountered during linear probing and swap the found target element into that position. The benefit is that each query or insertion can move elements closer to their ideal positions, that is, closer to where probing begins, which improves lookup efficiency.

The code below implements an open addressing (linear probing) hash table with lazy deletion. To make better use of the hash table space, we treat the hash table as a "circular array". When going beyond the end of the array, we return to the beginning and continue traversing.

\`\`\`src
[file]{hash_map_open_addressing}-[class]{hash_map_open_addressing}-[func]{}
\`\`\`

### Quadratic Probing

Quadratic probing is similar to linear probing and is one of the common strategies for open addressing. When a collision occurs, quadratic probing does not simply skip a fixed number of steps but skips a number of steps equal to the "square of the number of probes", i.e., $1, 4, 9, \\dots$ steps.

Quadratic probing has the following advantages:

- Quadratic probing attempts to alleviate the clustering effect of linear probing by skipping distances equal to the square of the probe count.
- Quadratic probing skips larger distances to find empty positions, which helps to distribute data more evenly.

However, quadratic probing is not perfect:

- Clustering still exists, i.e., some positions are more likely to be occupied than others.
- Due to the growth of squares, quadratic probing may not probe the entire hash table, meaning that even if there are empty buckets in the hash table, quadratic probing may not be able to access them.

### Multiple Hashing

As the name suggests, multiple hashing uses multiple hash functions $f_1(x)$, $f_2(x)$, $f_3(x)$, $\\dots$ for probing.

- **Inserting elements**: If hash function $f_1(x)$ encounters a conflict, try $f_2(x)$, and so on, until an empty position is found and the element is inserted.
- **Searching for elements**: Search in the same order of hash functions until the target element is found and return it; if an empty position is encountered or all hash functions have been tried, it indicates the element is not in the hash table, then return \`None\`.

Compared with linear probing, multiple hashing is less prone to clustering, but using multiple hash functions introduces additional computational overhead.

!!! tip

    Please note that hash tables based on open addressing, including linear probing, quadratic probing, and multiple hashing, all have the problem that elements cannot be deleted directly.

## Choice of Programming Languages

Different programming languages adopt different hash table implementation strategies. Here are a few examples:

- Python uses open addressing. The \`dict\` dictionary uses pseudo-random numbers for probing.
- Java uses separate chaining. Since JDK 1.8, when the array length in \`HashMap\` reaches 64 and the length of a linked list reaches 8, the linked list is converted to a red-black tree to improve search performance.
- Go uses separate chaining. Go stipulates that each bucket can store up to 8 key-value pairs, and if the capacity is exceeded, an overflow bucket is linked; when there are too many overflow buckets, a special equal-capacity expansion operation is performed to ensure performance.

`
  },

  'dsa-hash-algorithm': {
    title: '6.3 Thuật toán băm (Hash Algorithm)',
    summary: 'Tìm hiểu mục tiêu thiết kế thuật toán băm, lý do sử dụng số nguyên tố làm modulo, các thuật toán băm phổ biến (MD5, SHA) và cách các ngôn ngữ tính giá trị băm.',
    tags: ['dsa', 'hash', 'algorithm', 'cryptography'],
    domain: 'Algorithms',
    module: 'Chương 6: Bảng băm',
    prerequisites: ['dsa-hash-collision'],
    related: ['dsa-hash-table-summary'],
    updatedAt: '2026-07-19',
    readTime: '12 phút',
    content: `

<p>Hai phần trước đã giới thiệu nguyên lý hoạt động của bảng băm và các phương pháp xử lý xung đột băm. Tuy nhiên, cả định vị mở lẫn separate chaining <strong>chỉ có thể đảm bảo bảng băm hoạt động bình thường khi xảy ra xung đột băm, nhưng không thể làm giảm tần suất xảy ra xung đột băm</strong>.</p>
<p>Nếu xung đột băm xảy ra quá thường xuyên, hiệu năng của bảng băm sẽ suy giảm nghiêm trọng. Như hình dưới đây, đối với một bảng băm dùng separate chaining, trong trường hợp lý tưởng, các cặp khóa-giá trị được phân bố đều trên các bucket, đạt hiệu quả truy vấn tối ưu; trong trường hợp xấu nhất, tất cả các cặp khóa-giá trị đều được lưu trong cùng một bucket, khiến độ phức tạp thời gian suy giảm xuống $O(n)$.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/hash_collision_best_worst_condition.png" alt="Trường hợp lý tưởng và xấu nhất của xung đột băm" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
<p><strong>Sự phân bố của các cặp khóa-giá trị được quyết định bởi hàm băm</strong>. Nhắc lại các bước của hàm băm: đầu tiên tính giá trị băm, sau đó lấy giá trị đó chia lấy dư cho chiều dài mảng:</p>
<pre><code>index = hash(key) % capacity</code></pre>
<p>Quan sát công thức trên, khi dung lượng bảng băm <code>capacity</code> cố định, <strong>thuật toán băm <code>hash()</code> quyết định giá trị đầu ra</strong>, từ đó quyết định sự phân bố của các cặp khóa-giá trị trong bảng băm.</p>
<p>Điều này có nghĩa là, để giảm xác suất xảy ra xung đột băm, chúng ta nên tập trung vào việc thiết kế thuật toán băm <code>hash()</code>.</p>

<h2>6.3.1 Mục tiêu của thuật toán băm</h2>
<p>Để xây dựng một bảng băm vừa nhanh vừa mạnh mẽ, một thuật toán băm nên có các tính chất sau:</p>
<ul>
  <li><strong>Tính xác định (Determinism)</strong>: Với cùng một đầu vào, thuật toán băm phải luôn tạo ra cùng một đầu ra. Chỉ khi đó bảng băm mới đáng tin cậy.</li>
  <li><strong>Hiệu suất cao (High efficiency)</strong>: Quá trình tính toán giá trị băm phải đủ nhanh. Chi phí tính toán càng nhỏ, bảng băm càng thực tế.</li>
  <li><strong>Phân bố đồng đều (Uniform distribution)</strong>: Thuật toán băm phải đảm bảo các cặp khóa-giá trị được phân bố đều trong bảng băm. Sự phân bố càng đồng đều, xác suất xung đột băm càng thấp.</li>
</ul>
<p>Trong thực tế, thuật toán băm không chỉ được dùng để triển khai bảng băm mà còn được ứng dụng rộng rãi trong các lĩnh vực khác.</p>
<ul>
  <li><strong>Lưu trữ mật khẩu</strong>: Để bảo vệ an toàn mật khẩu người dùng, hệ thống thường không lưu mật khẩu dạng văn bản thuần mà lưu giá trị băm của mật khẩu. Khi người dùng nhập mật khẩu, hệ thống tính giá trị băm của đầu vào và so sánh với giá trị băm đã lưu. Nếu khớp, mật khẩu được coi là đúng.</li>
  <li><strong>Kiểm tra tính toàn vẹn dữ liệu</strong>: Bên gửi dữ liệu có thể tính giá trị băm của dữ liệu và gửi kèm theo; bên nhận có thể tính lại giá trị băm của dữ liệu nhận được rồi so sánh với giá trị băm đã nhận. Nếu khớp, dữ liệu được coi là nguyên vẹn.</li>
</ul>
<p>Đối với các ứng dụng mật mã học, thuật toán băm cần có các tính chất bảo mật mạnh hơn để ngăn chặn kỹ thuật đảo ngược, chẳng hạn như suy luận mật khẩu gốc từ giá trị băm.</p>
<ul>
  <li><strong>Tính một chiều (Unidirectionality)</strong>: Không thể suy ra bất kỳ thông tin nào về dữ liệu đầu vào từ giá trị băm.</li>
  <li><strong>Kháng xung đột (Collision resistance)</strong>: Cực kỳ khó để tìm được hai đầu vào khác nhau tạo ra cùng một giá trị băm.</li>
  <li><strong>Hiệu ứng tuyết lở (Avalanche effect)</strong>: Những thay đổi nhỏ ở đầu vào cần dẫn đến những thay đổi lớn và không thể đoán trước ở đầu ra.</li>
</ul>
<p>Lưu ý rằng <strong>"phân bố đồng đều" và "kháng xung đột" là hai khái niệm độc lập</strong>. Thỏa mãn phân bố đồng đều không nhất thiết đồng nghĩa với kháng xung đột. Ví dụ, với đầu vào <code>key</code> ngẫu nhiên, hàm băm <code>key % 100</code> có thể tạo ra đầu ra phân bố đồng đều. Tuy nhiên, thuật toán băm này quá đơn giản, và mọi <code>key</code> có cùng hai chữ số cuối sẽ có cùng đầu ra, khiến việc suy ra một <code>key</code> hợp lệ từ giá trị băm trở nên dễ dàng, từ đó có thể bẻ khóa mật khẩu.</p>

<h2>6.3.2 Thiết kế thuật toán băm</h2>
<p>Thiết kế thuật toán băm là một vấn đề phức tạp cần xem xét nhiều yếu tố. Tuy nhiên, đối với một số tình huống ít khắt khe hơn, chúng ta cũng có thể thiết kế một vài thuật toán băm đơn giản.</p>
<ul>
  <li><strong>Băm cộng (Additive hash)</strong>: Cộng tổng mã ASCII của từng ký tự trong đầu vào và dùng tổng đó làm giá trị băm.</li>
  <li><strong>Băm nhân (Multiplicative hash)</strong>: Tận dụng độ tương quan thấp mà phép nhân tạo ra: nhân với một hằng số ở mỗi bước và cộng dồn mã ASCII của các ký tự vào giá trị băm.</li>
  <li><strong>Băm XOR (XOR hash)</strong>: Cộng dồn giá trị băm bằng cách thực hiện XOR trên từng phần tử của dữ liệu đầu vào.</li>
  <li><strong>Băm xoay bit (Rotating hash)</strong>: Cộng dồn mã ASCII của từng ký tự vào một giá trị băm, thực hiện phép xoay bit trên giá trị băm trước mỗi lần cộng dồn.</li>
</ul>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Băm xoay bit (Rotational hash) */
static int rotHash(String key) {
    long hash = 0;
    final int MODULUS = 1000000007;
    for (char c : key.toCharArray()) {
        hash = ((hash &lt;&lt; 4) ^ (hash &gt;&gt; 28) ^ (int) c) % MODULUS;
    }
    return (int) hash;
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func rotHash(key: String) -&gt; Int {
    var hash = 0
    let MODULUS = 1_000_000_007
    for c in key {
        for scalar in c.unicodeScalars {
            hash = ((hash &lt;&lt; 4) ^ (hash &gt;&gt; 28) ^ Int(scalar.value)) % MODULUS
        }
    }
    return hash
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>int rotHash(String key) {
  int hash = 0;
  final int MODULUS = 1000000007;
  for (int i = 0; i &lt; key.length; i++) {
    hash = ((hash &lt;&lt; 4) ^ (hash &gt;&gt; 28) ^ key.codeUnitAt(i)) % MODULUS;
  }
  return hash;
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def rot_hash(key: str) -&gt; int:
    """Băm xoay bit (Rotational hash)"""
    hash = 0
    modulus = 1000000007
    for c in key:
        hash = (hash &lt;&lt; 4) ^ (hash &gt;&gt; 28) ^ ord(c)
    return hash % modulus</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Băm xoay bit (Rotational hash) */
int rotHash(string key) {
    long long hash = 0;
    const int MODULUS = 1000000007;
    for (unsigned char c : key) {
        hash = ((hash &lt;&lt; 4) ^ (hash &gt;&gt; 28) ^ (int)c) % MODULUS;
    }
    return (int)hash;
}</code></pre></div></div></div>
<p>Chúng ta có thể quan sát thấy bước cuối cùng của mỗi thuật toán băm là lấy kết quả chia lấy dư cho số nguyên tố lớn $1000000007$, đảm bảo giá trị băm nằm trong một phạm vi phù hợp. Điều này tự nhiên đặt ra một câu hỏi: tại sao lại nhấn mạnh việc dùng modulo là số nguyên tố, và những nhược điểm của việc dùng modulo là hợp số là gì?</p>
<p>Nói ngắn gọn: <strong>dùng một số nguyên tố lớn làm modulo giúp tối đa hóa sự đồng đều của các giá trị băm</strong>. Vì một số nguyên tố không có ước số chung với các số khác, nó có thể giảm bớt các quy luật chu kỳ do phép chia lấy dư gây ra, từ đó giảm thiểu xung đột băm.</p>
<p>Ví dụ, giả sử chúng ta chọn hợp số $9$ làm modulo, số này chia hết cho $3$, thì mọi <code>key</code> chia hết cho $3$ sẽ được ánh xạ vào các giá trị băm $0$, $3$, $6$.</p>
<div style="overflow-x:auto;">
$$
\\begin{aligned}
\\text{modulus} & = 9 \\newline
\\text{key} & = \\{ 0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, \\dots \\} \\newline
\\text{hash} & = \\{ 0, 3, 6, 0, 3, 6, 0, 3, 6, 0, 3, 6,\\dots \\}
\\end{aligned}
$$
</div>
<p>Nếu các giá trị <code>key</code> đầu vào tình cờ tuân theo một cấp số cộng như thế này, các giá trị băm sẽ bị dồn cụm, làm trầm trọng thêm xung đột băm. Bây giờ giả sử chúng ta thay <code>modulus</code> bằng số nguyên tố $13$. Vì <code>key</code> và <code>modulus</code> không có ước số chung, các giá trị băm đầu ra trở nên phân bố đồng đều hơn nhiều.</p>
<div style="overflow-x:auto;">
$$
\\begin{aligned}
\\text{modulus} & = 13 \\newline
\\text{key} & = \\{ 0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, \\dots \\} \\newline
\\text{hash} & = \\{ 0, 3, 6, 9, 12, 2, 5, 8, 11, 1, 4, 7, \\dots \\}
\\end{aligned}
$$
</div>
<p>Đáng chú ý là, nếu <code>key</code> được đảm bảo phân bố ngẫu nhiên và đồng đều, thì việc chọn số nguyên tố hay hợp số làm modulo đều có thể tạo ra các giá trị băm phân bố đồng đều. Tuy nhiên, khi sự phân bố của <code>key</code> có tính chu kỳ nào đó, chia lấy dư cho hợp số dễ dẫn đến dồn cụm hơn.</p>
<p>Tóm lại, chúng ta thường chọn một số nguyên tố làm modulo, và số nguyên tố này nên đủ lớn để loại bỏ các quy luật chu kỳ càng nhiều càng tốt, tăng cường độ bền vững của thuật toán băm.</p>

<h2>6.3.3 Các thuật toán băm phổ biến</h2>
<p>Dễ thấy rằng các thuật toán băm đơn giản giới thiệu ở trên khá "mong manh", còn kém xa so với các mục tiêu thiết kế của thuật toán băm. Ví dụ, vì phép cộng và XOR có tính giao hoán, băm cộng và băm XOR không thể phân biệt các chuỗi có cùng ký tự nhưng khác thứ tự, điều này có thể làm trầm trọng thêm xung đột băm và tạo ra rủi ro bảo mật.</p>
<p>Trong thực tế, chúng ta thường dùng một số thuật toán băm chuẩn, chẳng hạn như MD5, SHA-1, SHA-2 và SHA-3. Chúng có thể ánh xạ dữ liệu đầu vào có độ dài bất kỳ thành một giá trị băm có độ dài cố định.</p>
<p>Trong hơn một thế kỷ qua, các thuật toán băm đã liên tục được nâng cấp và tối ưu hóa. Một số nhà nghiên cứu nỗ lực cải thiện hiệu năng của thuật toán băm, trong khi những người khác, bao gồm cả hacker, chuyên tìm kiếm các lỗ hổng bảo mật trong thuật toán băm. Bảng dưới đây thể hiện các thuật toán băm thường được dùng trong các ứng dụng thực tế.</p>
<ul>
  <li>MD5 và SHA-1 đã bị tấn công thành công nhiều lần, vì vậy chúng bị loại bỏ trong nhiều ứng dụng bảo mật.</li>
  <li>Chuỗi SHA-2, đặc biệt là SHA-256, là một trong những thuật toán băm an toàn nhất hiện nay, chưa ghi nhận cuộc tấn công thành công nào, do đó thường được dùng trong nhiều ứng dụng và giao thức bảo mật.</li>
  <li>SHA-3 có chi phí triển khai thấp hơn và hiệu suất tính toán cao hơn so với SHA-2, nhưng phạm vi sử dụng hiện tại chưa rộng rãi bằng chuỗi SHA-2.</li>
</ul>
<p align="center">Bảng &nbsp; Các thuật toán băm phổ biến</p>
<table style="width:100%; border-collapse:collapse; font-size:14px; margin:1.5em 0; border: 1px solid var(--border-color);">
  <thead>
    <tr style="border-bottom:2px solid var(--border-color); text-align:left; background-color: rgba(255,255,255,0.05);">
      <th style="padding:10px 15px; color:var(--text-primary); font-weight:600;"></th>
      <th style="padding:10px 15px; color:var(--text-primary); font-weight:600;">MD5</th>
      <th style="padding:10px 15px; color:var(--text-primary); font-weight:600;">SHA-1</th>
      <th style="padding:10px 15px; color:var(--text-primary); font-weight:600;">SHA-2</th>
      <th style="padding:10px 15px; color:var(--text-primary); font-weight:600;">SHA-3</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px 15px;">Năm phát hành</td><td style="padding:10px 15px;">1992</td><td style="padding:10px 15px;">1995</td><td style="padding:10px 15px;">2002</td><td style="padding:10px 15px;">2008</td></tr>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px 15px;">Độ dài đầu ra</td><td style="padding:10px 15px;">128 bit</td><td style="padding:10px 15px;">160 bit</td><td style="padding:10px 15px;">256/512 bit</td><td style="padding:10px 15px;">224/256/384/512 bit</td></tr>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px 15px;">Xung đột băm</td><td style="padding:10px 15px;">Thường xuyên</td><td style="padding:10px 15px;">Thường xuyên</td><td style="padding:10px 15px;">Hiếm</td><td style="padding:10px 15px;">Hiếm</td></tr>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px 15px;">Mức độ an toàn</td><td style="padding:10px 15px;">Thấp, đã bị tấn công thành công</td><td style="padding:10px 15px;">Thấp, đã bị tấn công thành công</td><td style="padding:10px 15px;">Cao</td><td style="padding:10px 15px;">Cao</td></tr>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px 15px;">Ứng dụng</td><td style="padding:10px 15px;">Bị loại bỏ, vẫn dùng để kiểm tra toàn vẹn dữ liệu</td><td style="padding:10px 15px;">Bị loại bỏ</td><td style="padding:10px 15px;">Xác thực giao dịch tiền mã hóa, chữ ký số, v.v.</td><td style="padding:10px 15px;">Có thể dùng để thay thế SHA-2</td></tr>
  </tbody>
</table>

<h2>6.3.4 Giá trị Băm trong Cấu trúc Dữ liệu</h2>
<p>Chúng ta biết rằng khóa của bảng băm có thể là số nguyên, số thực, chuỗi, và các kiểu dữ liệu khác. Các ngôn ngữ lập trình thường cung cấp sẵn thuật toán băm cho các kiểu này để tính chỉ mục bucket trong bảng băm. Lấy Python làm ví dụ, chúng ta có thể gọi hàm <code>hash()</code> để tính giá trị băm cho nhiều kiểu dữ liệu khác nhau.</p>
<ul>
  <li>Giá trị băm của số nguyên và boolean chính là giá trị của chúng.</li>
  <li>Việc tính giá trị băm cho số thực và chuỗi phức tạp hơn, độc giả quan tâm được khuyến khích tự tìm hiểu thêm.</li>
  <li>Giá trị băm của một tuple được tính bằng cách băm từng phần tử của nó rồi kết hợp các kết quả đó thành một giá trị băm duy nhất.</li>
  <li>Giá trị băm của một đối tượng thường được tạo từ địa chỉ bộ nhớ của nó. Bằng cách ghi đè phương thức băm của đối tượng, giá trị băm có thể được tạo từ nội dung của đối tượng thay vì địa chỉ bộ nhớ.</li>
</ul>
<div class="callout callout-tip">
  <span class="callout-icon">💡</span>
  <div class="callout-body">
    <p>Cần lưu ý rằng định nghĩa và cách triển khai hàm tính giá trị băm dựng sẵn ở các ngôn ngữ lập trình khác nhau có thể khác nhau.</p>
  </div>
</div>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>int num = 3;
int hashNum = Integer.hashCode(num);
// Giá trị băm của số nguyên 3 là 3

boolean bol = true;
int hashBol = Boolean.hashCode(bol);
// Giá trị băm của boolean true là 1231

double dec = 3.14159;
int hashDec = Double.hashCode(dec);
// Giá trị băm của số thực 3.14159 là -1340954729

String str = "Hello 算法";
int hashStr = str.hashCode();
// Giá trị băm của chuỗi "Hello 算法" là -727081396

Object[] arr = { 12836, "小哈" };
int hashTup = Arrays.hashCode(arr);
// Giá trị băm của mảng [12836, 小哈] là 1151158

ListNode obj = new ListNode(0);
int hashObj = obj.hashCode();
// Giá trị băm của đối tượng ListNode utils.ListNode@7dc5e7b4 là 2110121908</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>num = 3
hash_num = hash(num)
# Giá trị băm của số nguyên 3 là 3

bol = True
hash_bol = hash(bol)
# Giá trị băm của boolean True là 1

dec = 3.14159
hash_dec = hash(dec)
# Giá trị băm của số thực 3.14159 là 326484311674566659

str = "Hello 算法"
hash_str = hash(str)
# Giá trị băm của chuỗi "Hello 算法" là 4617003410720528961

tup = (12836, "小哈")
hash_tup = hash(tup)
# Giá trị băm của tuple (12836, '小哈') là 1029005403108185979

obj = ListNode(0)
hash_obj = hash(obj)
# Giá trị băm của đối tượng ListNode tại 0x1058fd810 là 274267521</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>int num = 3;
size_t hashNum = hash&lt;int&gt;()(num);
// Giá trị băm của số nguyên 3 là 3

bool bol = true;
size_t hashBol = hash&lt;bool&gt;()(bol);
// Giá trị băm của boolean 1 là 1

double dec = 3.14159;
size_t hashDec = hash&lt;double&gt;()(dec);
// Giá trị băm của số thực 3.14159 là 4614256650576692846

string str = "Hello 算法";
size_t hashStr = hash&lt;string&gt;()(str);
// Giá trị băm của chuỗi "Hello 算法" là 15466937326284535026

// Trong C++, std::hash() có sẵn chỉ cung cấp giá trị băm cho các kiểu dữ liệu cơ bản
// Giá trị băm cho mảng và đối tượng cần được triển khai riêng</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>// JavaScript không cung cấp sẵn hàm tính mã băm (hash code)</code></pre></div></div></div>
<p>Trong nhiều ngôn ngữ lập trình, <strong>chỉ những đối tượng bất biến (immutable objects) mới có thể được dùng làm khóa trong bảng băm</strong>. Nếu nội dung của một đối tượng có thể thay đổi (như danh sách trong Python), giá trị băm của nó cũng sẽ thay đổi, khiến việc tra cứu lại phần tử đó trong bảng băm trở nên không đáng tin cậy.</p>

`,
    originalContent: `
# Hash Algorithm

The previous two sections introduced the working principle of hash tables and the methods to handle hash collisions. However, both open addressing and separate chaining **can only ensure that the hash table functions normally when hash collisions occur, but cannot reduce the frequency of hash collisions**.

If hash collisions occur too frequently, the performance of the hash table will deteriorate drastically. As shown in the figure below, for a separate chaining hash table, in the ideal case, the key-value pairs are evenly distributed across the buckets, achieving optimal query efficiency; in the worst case, all key-value pairs are stored in the same bucket, degrading the time complexity to $O(n)$.

![Ideal and worst cases of hash collisions](hash_algorithm.assets/hash_collision_best_worst_condition.png)

**The distribution of key-value pairs is determined by the hash function**. Recall the steps of the hash function: first compute the hash value, then take it modulo the array length:

\`\`\`shell
index = hash(key) % capacity
\`\`\`

Observing the above formula, when the hash table capacity \`capacity\` is fixed, **the hash algorithm \`hash()\` determines the output value**, thereby determining the distribution of key-value pairs in the hash table.

This means that, to reduce the probability of hash collisions, we should focus on the design of the hash algorithm \`hash()\`.

## Goals of Hash Algorithms

To build a hash table that is both fast and robust, a hash algorithm should have the following properties:

- **Determinism**: For the same input, the hash algorithm should always produce the same output. Only then can the hash table be reliable.
- **High efficiency**: The process of computing the hash value should be fast enough. The smaller the computational overhead, the more practical the hash table.
- **Uniform distribution**: The hash algorithm should ensure that key-value pairs are evenly distributed in the hash table. The more uniform the distribution, the lower the probability of hash collisions.

In fact, hash algorithms are not only used to implement hash tables but are also widely applied in other fields.

- **Password storage**: To protect the security of user passwords, systems usually do not store the plaintext passwords but rather the hash values of the passwords. When a user enters a password, the system calculates the hash value of the input and compares it with the stored hash value. If they match, the password is considered correct.
- **Data integrity check**: The data sender can calculate the hash value of the data and send it along; the receiver can recalculate the hash value of the received data and compare it with the received hash value. If they match, the data is considered intact.

For cryptographic applications, hash algorithms need stronger security properties to prevent reverse engineering, such as inferring the original password from a hash value.

- **Unidirectionality**: It should be impossible to deduce any information about the input data from the hash value.
- **Collision resistance**: It should be extremely difficult to find two different inputs that produce the same hash value.
- **Avalanche effect**: Minor changes in the input should lead to significant and unpredictable changes in the output.

Note that **"uniform distribution" and "collision resistance" are two independent concepts**. Satisfying uniform distribution does not necessarily mean collision resistance. For example, under random input \`key\`, the hash function \`key % 100\` can produce a uniformly distributed output. However, this hash algorithm is too simple, and all \`key\` with the same last two digits will have the same output, making it easy to deduce a usable \`key\` from the hash value, thereby cracking the password.

## Design of Hash Algorithms

The design of hash algorithms is a complex issue that requires consideration of many factors. However, for some less demanding scenarios, we can also design some simple hash algorithms.

- **Additive hash**: Add up the ASCII codes of each character in the input and use the total sum as the hash value.
- **Multiplicative hash**: Leverage the low correlation introduced by multiplication: multiply by a constant at each step and accumulate the ASCII codes of the characters into the hash value.
- **XOR hash**: Accumulate the hash value by XORing each element of the input data.
- **Rotating hash**: Accumulate the ASCII code of each character into a hash value, performing a rotation operation on the hash value before each accumulation.

\`\`\`src
[file]{simple_hash}-[class]{}-[func]{rot_hash}
\`\`\`

We can observe that the final step of each hash algorithm is to take the result modulo the large prime $1000000007$, ensuring that the hash value stays within a suitable range. This naturally raises a question: why emphasize using a prime modulus, and what are the drawbacks of using a composite modulus?

In short: **using a large prime as the modulus helps maximize the uniformity of hash values**. Because a prime shares no common factors with other numbers, it can reduce periodic patterns introduced by the modulo operation and thus mitigate hash collisions.

For example, suppose we choose the composite number $9$ as the modulus, which can be divided by $3$, then all \`key\` divisible by $3$ will be mapped to hash values $0$, $3$, $6$.

$$
\\begin{aligned}
\\text{modulus} & = 9 \\newline
\\text{key} & = \\{ 0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, \\dots \\} \\newline
\\text{hash} & = \\{ 0, 3, 6, 0, 3, 6, 0, 3, 6, 0, 3, 6,\\dots \\}
\\end{aligned}
$$

If the input \`key\` values happen to follow this kind of arithmetic progression, the hash values will cluster, worsening hash collisions. Now suppose we replace \`modulus\` with the prime number $13$. Because \`key\` and \`modulus\` share no common factors, the output hash values become much more evenly distributed.

$$
\\begin{aligned}
\\text{modulus} & = 13 \\newline
\\text{key} & = \\{ 0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, \\dots \\} \\newline
\\text{hash} & = \\{ 0, 3, 6, 9, 12, 2, 5, 8, 11, 1, 4, 7, \\dots \\}
\\end{aligned}
$$

It is worth noting that if the \`key\` is guaranteed to be randomly and uniformly distributed, then choosing a prime number or a composite number as the modulus can both produce uniformly distributed hash values. However, when the distribution of \`key\` has some periodicity, modulo a composite number is more likely to result in clustering.

In summary, we usually choose a prime number as the modulus, and this prime number should be large enough to eliminate periodic patterns as much as possible, enhancing the robustness of the hash algorithm.

## Common Hash Algorithms

It is easy to see that the simple hash algorithms introduced above are fairly "fragile" and fall far short of the design goals of hash algorithms. For example, because addition and XOR are commutative, additive hash and XOR hash cannot distinguish strings with the same characters in a different order, which may worsen hash collisions and introduce security risks.

In practice, we usually use some standard hash algorithms, such as MD5, SHA-1, SHA-2, and SHA-3. They can map input data of any length to a fixed-length hash value.

Over the past century, hash algorithms have been in a continuous process of upgrading and optimization. Some researchers strive to improve the performance of hash algorithms, while others, including hackers, are dedicated to finding security issues in hash algorithms. The table below shows hash algorithms commonly used in practical applications.

- MD5 and SHA-1 have been successfully attacked multiple times and are thus abandoned in various security applications.
- SHA-2 series, especially SHA-256, is one of the most secure hash algorithms to date, with no successful attacks reported, hence commonly used in various security applications and protocols.
- SHA-3 has lower implementation costs and higher computational efficiency compared to SHA-2, but its current usage coverage is not as extensive as the SHA-2 series.

<p align="center"> Table <id> &nbsp; Common hash algorithms </p>

|                 | MD5                                             | SHA-1                               | SHA-2                                                             | SHA-3                        |
| --------------- | ----------------------------------------------- | ----------------------------------- | ----------------------------------------------------------------- | ---------------------------- |
| Release Year    | 1992                                            | 1995                                | 2002                                                              | 2008                         |
| Output Length   | 128 bit                                         | 160 bit                             | 256/512 bit                                                       | 224/256/384/512 bit          |
| Hash Collisions | Frequent                                        | Frequent                            | Rare                                                              | Rare                         |
| Security Level  | Low, has been successfully attacked             | Low, has been successfully attacked | High                                                              | High                         |
| Applications    | Abandoned, still used for data integrity checks | Abandoned                           | Cryptocurrency transaction verification, digital signatures, etc. | Can be used to replace SHA-2 |

## Hash Values in Data Structures

We know that hash table keys can be integers, floating-point numbers, strings, and other data types. Programming languages usually provide built-in hash algorithms for these types to compute bucket indices in a hash table. Taking Python as an example, we can call the \`hash()\` function to compute hash values for various data types.

- The hash values of integers and booleans are their own values.
- The calculation of hash values for floating-point numbers and strings is more complex, and interested readers are encouraged to study this on their own.
- The hash value of a tuple is obtained by hashing each of its elements and combining those results into a single hash value.
- An object's hash value is typically generated from its memory address. By overriding the object's hash method, it can instead be generated from the object's contents.

!!! tip

    Be aware that the definition and methods of the built-in hash value calculation functions in different programming languages vary.

=== "Python"

    \`\`\`python title="built_in_hash.py"
    num = 3
    hash_num = hash(num)
    # Hash value of integer 3 is 3

    bol = True
    hash_bol = hash(bol)
    # Hash value of boolean True is 1

    dec = 3.14159
    hash_dec = hash(dec)
    # Hash value of decimal 3.14159 is 326484311674566659

    str = "Hello 算法"
    hash_str = hash(str)
    # Hash value of string "Hello 算法" is 4617003410720528961

    tup = (12836, "小哈")
    hash_tup = hash(tup)
    # Hash value of tuple (12836, '小哈') is 1029005403108185979

    obj = ListNode(0)
    hash_obj = hash(obj)
    # Hash value of ListNode object at 0x1058fd810 is 274267521
    \`\`\`

=== "C++"

    \`\`\`cpp title="built_in_hash.cpp"
    int num = 3;
    size_t hashNum = hash<int>()(num);
    // Hash value of integer 3 is 3

    bool bol = true;
    size_t hashBol = hash<bool>()(bol);
    // Hash value of boolean 1 is 1

    double dec = 3.14159;
    size_t hashDec = hash<double>()(dec);
    // Hash value of decimal 3.14159 is 4614256650576692846

    string str = "Hello 算法";
    size_t hashStr = hash<string>()(str);
    // Hash value of string "Hello 算法" is 15466937326284535026

    // In C++, built-in std::hash() only provides hash values for basic data types
    // Hash values for arrays and objects need to be implemented separately
    \`\`\`

=== "Java"

    \`\`\`java title="built_in_hash.java"
    int num = 3;
    int hashNum = Integer.hashCode(num);
    // Hash value of integer 3 is 3

    boolean bol = true;
    int hashBol = Boolean.hashCode(bol);
    // Hash value of boolean true is 1231

    double dec = 3.14159;
    int hashDec = Double.hashCode(dec);
    // Hash value of decimal 3.14159 is -1340954729

    String str = "Hello 算法";
    int hashStr = str.hashCode();
    // Hash value of string "Hello 算法" is -727081396

    Object[] arr = { 12836, "小哈" };
    int hashTup = Arrays.hashCode(arr);
    // Hash value of array [12836, 小哈] is 1151158

    ListNode obj = new ListNode(0);
    int hashObj = obj.hashCode();
    // Hash value of ListNode object utils.ListNode@7dc5e7b4 is 2110121908
    \`\`\`

=== "C#"

    \`\`\`csharp title="built_in_hash.cs"
    int num = 3;
    int hashNum = num.GetHashCode();
    // Hash value of integer 3 is 3;

    bool bol = true;
    int hashBol = bol.GetHashCode();
    // Hash value of boolean true is 1;

    double dec = 3.14159;
    int hashDec = dec.GetHashCode();
    // Hash value of decimal 3.14159 is -1340954729;

    string str = "Hello 算法";
    int hashStr = str.GetHashCode();
    // Hash value of string "Hello 算法" is -586107568;

    object[] arr = [12836, "小哈"];
    int hashTup = arr.GetHashCode();
    // Hash value of array [12836, 小哈] is 42931033;

    ListNode obj = new(0);
    int hashObj = obj.GetHashCode();
    // Hash value of ListNode object 0 is 39053774;
    \`\`\`

=== "Go"

    \`\`\`go title="built_in_hash.go"
    // Go does not provide built-in hash code functions
    \`\`\`

=== "Swift"

    \`\`\`swift title="built_in_hash.swift"
    let num = 3
    let hashNum = num.hashValue
    // Hash value of integer 3 is 9047044699613009734

    let bol = true
    let hashBol = bol.hashValue
    // Hash value of boolean true is -4431640247352757451

    let dec = 3.14159
    let hashDec = dec.hashValue
    // Hash value of decimal 3.14159 is -2465384235396674631

    let str = "Hello 算法"
    let hashStr = str.hashValue
    // Hash value of string "Hello 算法" is -7850626797806988787

    let arr = [AnyHashable(12836), AnyHashable("小哈")]
    let hashTup = arr.hashValue
    // Hash value of array [AnyHashable(12836), AnyHashable("小哈")] is -2308633508154532996

    let obj = ListNode(x: 0)
    let hashObj = obj.hashValue
    // Hash value of ListNode object utils.ListNode is -2434780518035996159
    \`\`\`

=== "JS"

    \`\`\`javascript title="built_in_hash.js"
    // JavaScript does not provide built-in hash code functions
    \`\`\`

=== "TS"

    \`\`\`typescript title="built_in_hash.ts"
    // TypeScript does not provide built-in hash code functions
    \`\`\`

=== "Dart"

    \`\`\`dart title="built_in_hash.dart"
    int num = 3;
    int hashNum = num.hashCode;
    // Hash value of integer 3 is 34803

    bool bol = true;
    int hashBol = bol.hashCode;
    // Hash value of boolean true is 1231

    double dec = 3.14159;
    int hashDec = dec.hashCode;
    // Hash value of decimal 3.14159 is 2570631074981783

    String str = "Hello 算法";
    int hashStr = str.hashCode;
    // Hash value of string "Hello 算法" is 468167534

    List arr = [12836, "小哈"];
    int hashArr = arr.hashCode;
    // Hash value of array [12836, 小哈] is 976512528

    ListNode obj = new ListNode(0);
    int hashObj = obj.hashCode;
    // Hash value of ListNode object Instance of 'ListNode' is 1033450432
    \`\`\`

=== "Rust"

    \`\`\`rust title="built_in_hash.rs"
    use std::collections::hash_map::DefaultHasher;
    use std::hash::{Hash, Hasher};

    let num = 3;
    let mut num_hasher = DefaultHasher::new();
    num.hash(&mut num_hasher);
    let hash_num = num_hasher.finish();
    // Hash value of integer 3 is 568126464209439262

    let bol = true;
    let mut bol_hasher = DefaultHasher::new();
    bol.hash(&mut bol_hasher);
    let hash_bol = bol_hasher.finish();
    // Hash value of boolean true is 4952851536318644461

    let dec: f32 = 3.14159;
    let mut dec_hasher = DefaultHasher::new();
    dec.to_bits().hash(&mut dec_hasher);
    let hash_dec = dec_hasher.finish();
    // Hash value of decimal 3.14159 is 2566941990314602357

    let str = "Hello 算法";
    let mut str_hasher = DefaultHasher::new();
    str.hash(&mut str_hasher);
    let hash_str = str_hasher.finish();
    // Hash value of string "Hello 算法" is 16092673739211250988

    let arr = (&12836, &"小哈");
    let mut tup_hasher = DefaultHasher::new();
    arr.hash(&mut tup_hasher);
    let hash_tup = tup_hasher.finish();
    // Hash value of tuple (12836, "小哈") is 1885128010422702749

    let node = ListNode::new(42);
    let mut hasher = DefaultHasher::new();
    node.borrow().val.hash(&mut hasher);
    let hash = hasher.finish();
    // Hash value of ListNode object RefCell { value: ListNode { val: 42, next: None } } is 15387811073369036852
    \`\`\`

=== "C"

    \`\`\`c title="built_in_hash.c"
    // C does not provide built-in hash code functions
    \`\`\`

=== "Kotlin"

    \`\`\`kotlin title="built_in_hash.kt"
    val num = 3
    val hashNum = num.hashCode()
    // Hash value of integer 3 is 3

    val bol = true
    val hashBol = bol.hashCode()
    // Hash value of boolean true is 1231

    val dec = 3.14159
    val hashDec = dec.hashCode()
    // Hash value of decimal 3.14159 is -1340954729

    val str = "Hello 算法"
    val hashStr = str.hashCode()
    // Hash value of string "Hello 算法" is -727081396

    val arr = arrayOf<Any>(12836, "小哈")
    val hashTup = arr.hashCode()
    // Hash value of array [12836, 小哈] is 189568618

    val obj = ListNode(0)
    val hashObj = obj.hashCode()
    // Hash value of ListNode object utils.ListNode@1d81eb93 is 495053715
    \`\`\`

=== "Ruby"

    \`\`\`ruby title="built_in_hash.rb"
    num = 3
    hash_num = num.hash
    # Hash value of integer 3 is -4385856518450339636

    bol = true
    hash_bol = bol.hash
    # Hash value of boolean true is -1617938112149317027

    dec = 3.14159
    hash_dec = dec.hash
    # Hash value of decimal 3.14159 is -1479186995943067893

    str = "Hello 算法"
    hash_str = str.hash
    # Hash value of string "Hello 算法" is -4075943250025831763

    tup = [12836, '小哈']
    hash_tup = tup.hash
    # Hash value of tuple (12836, '小哈') is 1999544809202288822

    obj = ListNode.new(0)
    hash_obj = obj.hash
    # Hash value of ListNode object #<ListNode:0x000078133140ab70> is 4302940560806366381
    \`\`\`

??? pythontutor "Visualized Execution"

    https://pythontutor.com/render.html#code=class%20ListNode%3A%0A%20%20%20%20%22%22%22%E9%93%BE%E8%A1%A8%E8%8A%82%E7%82%B9%E7%B1%BB%22%22%22%0A%20%20%20%20def%20__init__%28self,%20val%3A%20int%29%3A%0A%20%20%20%20%20%20%20%20self.val%3A%20int%20%3D%20val%20%20%23%20%E8%8A%82%E7%82%B9%E5%80%BC%0A%20%20%20%20%20%20%20%20self.next%3A%20ListNode%20%7C%20None%20%3D%20None%20%20%23%20%E5%90%8E%E7%BB%A7%E8%8A%82%E7%82%B9%E5%BC%95%E7%94%A8%0A%0A%22%22%22Driver%20Code%22%22%22%0Aif%20__name__%20%3D%3D%20%22__main__%22%3A%0A%20%20%20%20num%20%3D%203%0A%20%20%20%20hash_num%20%3D%20hash%28num%29%0A%20%20%20%20%23%20%E6%95%B4%E6%95%B0%203%20%E7%9A%84%E5%93%88%E5%B8%8C%E5%80%BC%E4%B8%BA%203%0A%0A%20%20%20%20bol%20%3D%20True%0A%20%20%20%20hash_bol%20%3D%20hash%28bol%29%0A%20%20%20%20%23%20%E5%B8%83%E5%B0%94%E9%87%8F%20True%20%E7%9A%84%E5%93%88%E5%B8%8C%E5%80%BC%E4%B8%BA%201%0A%0A%20%20%20%20dec%20%3D%203.14159%0A%20%20%20%20hash_dec%20%3D%20hash%28dec%29%0A%20%20%20%20%23%20%E5%B0%8F%E6%95%B0%203.14159%20%E7%9A%84%E5%93%88%E5%B8%8C%E5%80%BC%E4%B8%BA%20326484311674566659%0A%0A%20%20%20%20str%20%3D%20%22Hello%20%E7%AE%97%E6%B3%95%22%0A%20%20%20%20hash_str%20%3D%20hash%28str%29%0A%20%20%20%20%23%20%E5%AD%97%E7%AC%A6%E4%B8%B2%E2%80%9CHello%20%E7%AE%97%E6%B3%95%E2%80%9D%E7%9A%84%E5%93%88%E5%B8%8C%E5%80%BC%E4%B8%BA%204617003410720528961%0A%0A%20%20%20%20tup%20%3D%20%2812836,%20%22%E5%B0%8F%E5%93%88%22%29%0A%20%20%20%20hash_tup%20%3D%20hash%28tup%29%0A%20%20%20%20%23%20%E5%85%83%E7%BB%84%20%2812836,%20'%E5%B0%8F%E5%93%88'%29%20%E7%9A%84%E5%93%88%E5%B8%8C%E5%80%BC%E4%B8%BA%201029005403108185979%0A%0A%20%20%20%20obj%20%3D%20ListNode%280%29%0A%20%20%20%20hash_obj%20%3D%20hash%28obj%29%0A%20%20%20%20%23%20%E8%8A%82%E7%82%B9%E5%AF%B9%E8%B1%A1%20%3CListNode%20object%20at%200x1058fd810%3E%20%E7%9A%84%E5%93%88%E5%B8%8C%E5%80%BC%E4%B8%BA%20274267521&cumulative=false&curInstr=19&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false

In many programming languages, **only immutable objects can serve as the \`key\` in a hash table**. If we use a list (dynamic array) as a \`key\`, when the contents of the list change, its hash value also changes, and we would no longer be able to find the original \`value\` in the hash table.

Although the member variables of a custom object (such as a linked list node) are mutable, it is hashable. **This is because the hash value of an object is usually generated based on its memory address**, and even if the contents of the object change, the memory address remains the same, so the hash value remains unchanged.

You might have noticed that the hash values output in different consoles are different. **This is because the Python interpreter adds a random salt to the string hash function each time it starts up**. This approach effectively prevents HashDoS attacks and enhances the security of the hash algorithm.

`
  },

  'dsa-hash-table-summary': {
    title: '6.4 Tóm tắt',
    summary: 'Tổng kết kiến thức chương Bảng băm và giải đáp các câu hỏi thường gặp về độ phức tạp thời gian, thiết kế hàm băm và lý do mở rộng bảng băm.',
    tags: ['dsa', 'hashtable', 'summary'],
    domain: 'Algorithms',
    module: 'Chương 6: Bảng băm',
    prerequisites: ['dsa-hash-algorithm'],
    related: [],
    updatedAt: '2026-07-19',
    readTime: '6 phút',
    content: `

<h2>Điểm lại kiến thức chính</h2>
<ul>
  <li>Với một <code>key</code> đầu vào, bảng băm có thể lấy ra <code>value</code> tương ứng trong thời gian $O(1)$, điều này cực kỳ hiệu quả.</li>
  <li>Các thao tác thường dùng trên bảng băm bao gồm truy vấn, thêm cặp khóa-giá trị, xóa cặp khóa-giá trị, và duyệt bảng băm.</li>
  <li>Hàm băm ánh xạ một <code>key</code> thành một chỉ mục mảng, cho phép truy cập bucket tương ứng và lấy ra <code>value</code>.</li>
  <li>Hai <code>key</code> khác nhau có thể có cùng chỉ mục mảng sau khi băm, dẫn đến kết quả truy vấn sai. Hiện tượng này được gọi là xung đột băm.</li>
  <li>Dung lượng bảng băm càng lớn, xác suất xảy ra xung đột băm càng thấp. Do đó, mở rộng bảng băm có thể giảm bớt xung đột băm. Tương tự như mở rộng mảng, mở rộng bảng băm rất tốn kém.</li>
  <li>Hệ số tải, được định nghĩa là số phần tử chia cho số lượng bucket, phản ánh mức độ nghiêm trọng của xung đột băm và thường được dùng làm điều kiện kích hoạt mở rộng bảng băm.</li>
  <li>Separate chaining giải quyết xung đột băm bằng cách lưu tất cả các phần tử xung đột vào cùng một danh sách liên kết. Tuy nhiên, danh sách liên kết quá dài có thể làm giảm hiệu quả truy vấn, điều này có thể được cải thiện bằng cách chuyển tiếp danh sách liên kết thành cây Đỏ-Đen.</li>
  <li>Định vị mở xử lý xung đột băm thông qua nhiều lần thăm dò. Thăm dò tuyến tính sử dụng bước nhảy cố định nhưng không thể xóa phần tử và dễ dẫn đến dồn cụm. Băm nhiều lần sử dụng nhiều hàm băm để thăm dò, giúp giảm dồn cụm so với thăm dò tuyến tính nhưng làm tăng chi phí tính toán.</li>
  <li>Các ngôn ngữ lập trình khác nhau áp dụng các cách triển khai bảng băm khác nhau. Ví dụ, <code>HashMap</code> của Java dùng separate chaining, còn <code>dict</code> của Python dùng định vị mở.</li>
  <li>Trong bảng băm, chúng ta mong muốn thuật toán băm có tính xác định, hiệu suất cao và phân bố đồng đều. Trong mật mã học, thuật toán băm còn cần có tính kháng xung đột và hiệu ứng tuyết lở.</li>
  <li>Thuật toán băm thường dùng số nguyên tố lớn làm modulo để tối đa hóa sự phân bố đồng đều của các giá trị băm và giảm xung đột băm.</li>
  <li>Các thuật toán băm phổ biến bao gồm MD5, SHA-1, SHA-2 và SHA-3. MD5 thường được dùng để kiểm tra tính toàn vẹn của file, trong khi SHA-2 thường được dùng trong các ứng dụng và giao thức bảo mật.</li>
  <li>Các ngôn ngữ lập trình thường cung cấp sẵn thuật toán băm cho các kiểu dữ liệu để tính chỉ mục bucket trong bảng băm. Nhìn chung, chỉ những đối tượng bất biến mới có thể băm được.</li>
</ul>

<h2>Hỏi & Đáp</h2>

<p><strong>Hỏi: Khi nào độ phức tạp thời gian của bảng băm suy giảm xuống $O(n)$?</strong></p>
<p>Độ phức tạp thời gian của bảng băm có thể suy giảm xuống $O(n)$ khi xung đột băm trở nên nghiêm trọng. Khi hàm băm được thiết kế tốt, dung lượng được thiết lập hợp lý, và xung đột được phân bố đều, độ phức tạp thời gian là $O(1)$. Chúng ta thường coi độ phức tạp thời gian là $O(1)$ khi dùng bảng băm dựng sẵn trong các ngôn ngữ lập trình.</p>

<p><strong>Hỏi: Tại sao không dùng hàm băm $f(x) = x$? Điều này sẽ loại bỏ xung đột.</strong></p>
<p>Với hàm băm $f(x) = x$, mỗi phần tử tương ứng với một chỉ mục bucket duy nhất, tương đương với một mảng. Tuy nhiên, không gian đầu vào thường lớn hơn nhiều so với không gian đầu ra (chiều dài mảng), vì vậy bước cuối cùng của hàm băm thường là lấy modulo theo chiều dài mảng. Nói cách khác, mục tiêu của bảng băm là ánh xạ một không gian trạng thái lớn hơn xuống một không gian nhỏ hơn trong khi vẫn cung cấp hiệu quả truy vấn $O(1)$.</p>

<p><strong>Hỏi: Tại sao bảng băm có thể hiệu quả hơn mảng, danh sách liên kết, hoặc cây nhị phân, mặc dù bảng băm được triển khai bằng chính các cấu trúc này?</strong></p>
<p>Trước hết, bảng băm có hiệu suất thời gian cao hơn nhưng hiệu suất không gian thấp hơn. Một phần đáng kể bộ nhớ trong bảng băm vẫn không được sử dụng.</p>
<p>Thứ hai, bảng băm chỉ hiệu quả hơn về thời gian trong các trường hợp sử dụng cụ thể. Nếu một chức năng có thể được triển khai với cùng độ phức tạp thời gian bằng mảng hoặc danh sách liên kết, nó thường nhanh hơn so với dùng bảng băm. Điều này là do việc tính toán hàm băm phát sinh chi phí, khiến hằng số trong độ phức tạp thời gian lớn hơn.</p>
<p>Cuối cùng, độ phức tạp thời gian của bảng băm có thể suy giảm. Ví dụ, trong separate chaining, chúng ta thực hiện tìm kiếm trong danh sách liên kết hoặc cây Đỏ-Đen, vẫn có nguy cơ suy giảm xuống thời gian $O(n)$.</p>

<p><strong>Hỏi: Băm nhiều lần có gặp phải nhược điểm không thể xóa phần tử trực tiếp không? Không gian được đánh dấu đã xóa có thể tái sử dụng không?</strong></p>
<p>Băm nhiều lần là một dạng của định vị mở, và mọi phương pháp định vị mở đều có nhược điểm không thể xóa phần tử trực tiếp; chúng yêu cầu đánh dấu phần tử là đã xóa. Không gian đã đánh dấu có thể được tái sử dụng. Khi chèn phần tử mới vào bảng băm, và hàm băm trỏ đến một vị trí đã đánh dấu là xóa, vị trí đó có thể được dùng cho phần tử mới. Điều này duy trì chuỗi thăm dò của bảng băm trong khi vẫn đảm bảo sử dụng không gian hiệu quả.</p>

<p><strong>Hỏi: Tại sao xảy ra xung đột băm trong quá trình tìm kiếm với thăm dò tuyến tính?</strong></p>
<p>Trong quá trình tìm kiếm, hàm băm trỏ đến bucket và cặp khóa-giá trị tương ứng. Nếu <code>key</code> không khớp, điều đó cho thấy có xung đột băm. Do đó, thăm dò tuyến tính sẽ tìm kiếm xuống dưới theo một bước nhảy định trước cho đến khi tìm thấy cặp khóa-giá trị đúng hoặc tìm kiếm thất bại.</p>

<p><strong>Hỏi: Tại sao việc mở rộng bảng băm có thể giảm bớt xung đột băm?</strong></p>
<p>Bước cuối cùng của hàm băm thường liên quan đến việc lấy modulo theo chiều dài mảng $n$, để giữ đầu ra trong phạm vi chỉ mục mảng. Khi mở rộng, chiều dài mảng $n$ thay đổi, và các chỉ mục tương ứng với các khóa cũng có thể thay đổi. Các khóa trước đây được ánh xạ vào cùng một bucket có thể được phân bố trên nhiều bucket sau khi mở rộng, từ đó giảm bớt xung đột băm.</p>

<p><strong>Hỏi: Nếu mục tiêu là truy cập hiệu quả, tại sao không dùng trực tiếp một mảng?</strong></p>
<p>Khi các giá trị <code>key</code> là các số nguyên liên tục trong một phạm vi nhỏ, mảng thực sự là một lựa chọn đơn giản và hiệu quả. Nhưng khi <code>key</code> thuộc kiểu khác, chẳng hạn như chuỗi, chúng ta cần một hàm băm để ánh xạ <code>key</code> thành một chỉ mục mảng rồi lưu phần tử vào mảng bucket. Cấu trúc đó chính xác là những gì bảng băm thực hiện.</p>

`,
    originalContent: `
# Summary

### Key Review

- Given an input \`key\`, a hash table can retrieve the corresponding \`value\` in $O(1)$ time, which is highly efficient.
- Common hash table operations include querying, adding key-value pairs, deleting key-value pairs, and traversing the hash table.
- The hash function maps a \`key\` to an array index, allowing access to the corresponding bucket and retrieval of the \`value\`.
- Two different keys may end up with the same array index after hashing, leading to erroneous query results. This phenomenon is known as hash collision.
- The larger the capacity of the hash table, the lower the probability of hash collisions. Therefore, hash table expansion can mitigate hash collisions. Similar to array expansion, hash table expansion is costly.
- The load factor, defined as the number of elements divided by the number of buckets, reflects the severity of hash collisions and is often used as a condition to trigger hash table expansion.
- Separate chaining addresses hash collisions by storing all colliding elements in the same linked list. However, excessively long linked lists can reduce query efficiency, which can be improved by further converting the linked lists into red-black trees.
- Open addressing handles hash collisions through multiple probing. Linear probing uses a fixed step size but cannot delete elements and is prone to clustering. Double hashing uses multiple hash functions for probing, which reduces clustering compared to linear probing but increases computational overhead.
- Different programming languages adopt various hash table implementations. For example, Java's \`HashMap\` uses separate chaining, while Python's \`dict\` employs open addressing.
- In hash tables, we desire hash algorithms with determinism, high efficiency, and uniform distribution. In cryptography, hash algorithms should also possess collision resistance and the avalanche effect.
- Hash algorithms typically use large prime numbers as moduli to maximize the uniform distribution of hash values and reduce hash collisions.
- Common hash algorithms include MD5, SHA-1, SHA-2, and SHA-3. MD5 is often used for file integrity checks, while SHA-2 is commonly used in secure applications and protocols.
- Programming languages usually provide built-in hash algorithms for data types to calculate bucket indices in hash tables. Generally, only immutable objects are hashable.

### Q & A

**Q**: When does the time complexity of a hash table degrade to $O(n)$?

The time complexity of a hash table can degrade to $O(n)$ when hash collisions are severe. When the hash function is well-designed, the capacity is set appropriately, and collisions are evenly distributed, the time complexity is $O(1)$. We usually consider the time complexity to be $O(1)$ when using built-in hash tables in programming languages.

**Q**: Why not use the hash function $f(x) = x$? This would eliminate collisions.

Under the hash function $f(x) = x$, each element corresponds to a unique bucket index, which is equivalent to an array. However, the input space is usually much larger than the output space (array length), so the last step of a hash function is often to take the modulo of the array length. In other words, the goal of a hash table is to map a larger state space to a smaller one while providing $O(1)$ query efficiency.

**Q**: Why can hash tables be more efficient than arrays, linked lists, or binary trees, even though hash tables are implemented using these structures?

Firstly, hash tables have higher time efficiency but lower space efficiency. A significant portion of memory in hash tables remains unused.

Secondly, hash tables are only more time-efficient in specific use cases. If a feature can be implemented with the same time complexity using an array or a linked list, it's usually faster than using a hash table. This is because the computation of the hash function incurs overhead, making the constant factor in the time complexity larger.

Lastly, the time complexity of hash tables can degrade. For example, in separate chaining, we perform search operations in a linked list or red-black tree, which still risks degrading to $O(n)$ time.

**Q**: Does double hashing also have the flaw of not being able to delete elements directly? Can space marked as deleted be reused?

Double hashing is a form of open addressing, and all open addressing methods have the drawback of not being able to delete elements directly; they require marking elements as deleted. Marked spaces can be reused. When inserting new elements into the hash table, and the hash function points to a position marked as deleted, that position can be used by the new element. This maintains the probing sequence of the hash table while ensuring efficient use of space.

**Q**: Why do hash collisions occur during the search process in linear probing?

During the search process, the hash function points to the corresponding bucket and key-value pair. If the \`key\` doesn't match, it indicates a hash collision. Therefore, linear probing will search downward at a predetermined step size until the correct key-value pair is found or the search fails.

**Q**: Why can expanding a hash table alleviate hash collisions?

The last step of a hash function often involves taking the modulo of the array length $n$, to keep the output within the array index range. When expanding, the array length $n$ changes, and the indices corresponding to the keys may also change. Keys that were previously mapped to the same bucket might be distributed across multiple buckets after expansion, thereby mitigating hash collisions.

**Q**: If the goal is efficient access, why not just use an array directly?

When the \`key\` values are continuous integers within a small range, an array is indeed a simple and efficient choice. But when the \`key\` is of another type, such as a string, we need a hash function to map the \`key\` to an array index and then store the element in a bucket array. That structure is precisely what a hash table is.

`
  }

});
