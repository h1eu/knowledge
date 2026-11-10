/* ============================================================
   Knowledge OS — Flutter Module: Content & Knowledge Base
   ============================================================ */

const FLUTTER_CONTENT = {};

Object.assign(FLUTTER_CONTENT, {

  'flutter-session-01-overview': {
    title: 'Session 01 Overview: Dart Foundations',
    summary: 'Tổng quan Session 01 — nền tảng ngôn ngữ Dart (hệ thống kiểu, hàm, pattern matching, collections, class) và mô hình bất đồng bộ (event loop, Future, Stream, isolate), mở đầu bằng bản đồ chuyển đổi cho Kotlin developer.',
    status: 'published',
    difficulty: 'beginner',
    estimatedReadingTime: '5 phút',
    depth: 'overview',
    tags: ['flutter', 'dart', 'overview', 'session-01', 'async'],
    domain: 'Flutter Development',
    module: 'Session 01: Dart Foundations',
    prerequisites: [],
    related: ['flutter.dart.dart_for_kotlin_devs', 'flutter.dart.variables_types', 'flutter.dart.functions_operators', 'flutter.dart.control_flow_patterns', 'flutter.dart.collections_functional', 'flutter.dart.classes_mixins_sealed', 'flutter.async.futures_async_await', 'flutter.async.streams', 'flutter.async.isolates'],
    learningOutcomes: [
      'Giải thích được vì sao Session 01 học Dart và bất đồng bộ trước khi học Widget và Networking.',
      'Nhận diện được ba trụ cột của Session 01 là hệ thống kiểu với null safety, mô hình dữ liệu với sealed type và pattern matching, mô hình bất đồng bộ event loop và isolate.',
      'Biết khi nào nên bắt đầu từ 1.1.1 Dart for Kotlin Developers và khi nào đi tuần tự từ 1.2.1.',
      'Áp dụng được tiêu chí hoàn thành để tự đánh giá mức sẵn sàng sang Session 02.'
    ],
    knowledgeGap: 'Nhảy thẳng vào Widget mà bỏ qua nền tảng ngôn ngữ khiến lập trình viên không giải thích được các bug về state (list `final` vẫn bị sửa, model so sánh `==` sai), về bất đồng bộ (lỗi trong Future bị nuốt, Stream bị listen hai lần) và về hiệu năng (UI giật vì tính toán nặng chạy trên main isolate).',
    updatedAt: '2026-11-10',
    readTime: '5 phút',
    content: `
<h2>Giới thiệu</h2>

<p>Session 01 trả lời hai câu hỏi nền tảng trước khi viết Widget đầu tiên: <strong>Dart biểu diễn dữ liệu và logic thế nào</strong>, và <strong>Dart chạy việc bất đồng bộ thế nào khi mỗi isolate chỉ có một thread</strong>.</p>

<p>Flutter được viết gần như hoàn toàn bằng Dart: mỗi Widget là một class Dart, mỗi lời gọi API chạy trên event loop của Dart. Thiếu nền tảng ngôn ngữ thì bug ở các Session sau trông như "ma thuật": list <code>final</code> vẫn bị thêm phần tử, hai model giống hệt nhau so <code>==</code> ra <code>false</code>, màn hình giật khi parse một file JSON lớn.</p>

<p>Lộ trình này có hai điểm cần biết:</p>

<ul>
  <li><strong>Bất đồng bộ nằm ngay Session 01</strong>, trước Networking (Session 05). Gọi API, đọc file, lắng nghe dữ liệu đều đòi hỏi hiểu <code>Future</code>, <code>Stream</code> và event loop trước.</li>
  <li><strong>Session mở đầu bằng một bản đồ chuyển đổi cho Kotlin developer</strong>: người đã biết Kotlin không cần học lại "biến", "hàm", "class" từ đầu, mà cần biết chỗ nào giống, chỗ nào giống tên nhưng khác nghĩa, chỗ nào phải đổi tư duy.</li>
</ul>

<div class="dd-diagram" data-dd="flutter-learning-path">
<div class="dd-svg dd-svg-dark">
<svg viewBox="0 0 800 400" role="img" aria-labelledby="flutter-learning-path-dark-title flutter-learning-path-dark-desc" font-family="'Geist', sans-serif">
<title id="flutter-learning-path-dark-title">Đi từ Dart tới giao diện</title>
<desc id="flutter-learning-path-dark-desc">Lộ trình từ Dart cho Kotlin dev qua fundamentals và asynchronous tới widgets và UI.</desc>
<defs>
<marker id="flutter-learning-path-dark-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0, 8 3, 0 6" fill="#94A3B8"/>
</marker>
</defs>
<rect width="800" height="400" fill="#060913"/>
<!-- arrows -->
<path d="M 400,96 V 120" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#flutter-learning-path-dark-arrow)"/>
<path d="M 400,184 V 208" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#flutter-learning-path-dark-arrow)"/>
<path d="M 400,272 V 296" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#flutter-learning-path-dark-arrow)"/>
<!-- nodes -->
<rect x="240" y="32" width="320" height="64" rx="6" fill="#060913"/>
<rect x="240" y="32" width="320" height="64" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="400" y="66" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">1.1 Dart for Kotlin Devs</text>
<text x="400" y="80" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">cửa ngõ cho Android Dev</text>
<rect x="240" y="120" width="320" height="64" rx="6" fill="#060913"/>
<rect x="240" y="120" width="320" height="64" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="400" y="154" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">1.2 Fundamentals</text>
<text x="400" y="168" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">biến · hàm · flow · collections · OOP</text>
<rect x="240" y="208" width="320" height="64" rx="6" fill="#060913"/>
<rect x="240" y="208" width="320" height="64" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="400" y="242" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">1.3 Asynchronous</text>
<text x="400" y="256" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">futures · streams · isolates</text>
<rect x="240" y="296" width="320" height="56" rx="6" fill="#060913"/>
<rect x="240" y="296" width="320" height="56" rx="6" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="1.2"/>
<text x="400" y="330" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Session 03+: Widgets &amp; UI</text>
<!-- legend -->
<line x1="32" y1="376" x2="768" y2="376" stroke="rgba(248,250,252,0.12)" stroke-width="0.8"/>
<text x="32" y="392" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" letter-spacing="0.14em">CHÚ GIẢI</text>
<circle cx="150" cy="388" r="4" fill="#38BDF8"/>
<text x="162" y="392" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace">ĐÍCH ĐẾN · WIDGETS &amp; UI</text>
<line x1="400" y1="388" x2="432" y2="388" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#flutter-learning-path-dark-arrow)"/>
<text x="440" y="392" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace">ĐI THEO THỨ TỰ</text>
</svg>
</div>
<div class="dd-svg dd-svg-light">
<svg viewBox="0 0 800 400" role="img" aria-labelledby="flutter-learning-path-title flutter-learning-path-desc" font-family="'Geist', sans-serif">
<title id="flutter-learning-path-title">Đi từ Dart tới giao diện</title>
<desc id="flutter-learning-path-desc">Lộ trình từ Dart cho Kotlin dev qua fundamentals và asynchronous tới widgets và UI.</desc>
<defs>
<marker id="flutter-learning-path-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0, 8 3, 0 6" fill="#64748B"/>
</marker>
</defs>
<rect width="800" height="400" fill="#F8FAFC"/>
<!-- arrows -->
<path d="M 400,96 V 120" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#flutter-learning-path-arrow)"/>
<path d="M 400,184 V 208" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#flutter-learning-path-arrow)"/>
<path d="M 400,272 V 296" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#flutter-learning-path-arrow)"/>
<!-- nodes -->
<rect x="240" y="32" width="320" height="64" rx="6" fill="#F8FAFC"/>
<rect x="240" y="32" width="320" height="64" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="400" y="66" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">1.1 Dart for Kotlin Devs</text>
<text x="400" y="80" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">cửa ngõ cho Android Dev</text>
<rect x="240" y="120" width="320" height="64" rx="6" fill="#F8FAFC"/>
<rect x="240" y="120" width="320" height="64" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="400" y="154" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">1.2 Fundamentals</text>
<text x="400" y="168" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">biến · hàm · flow · collections · OOP</text>
<rect x="240" y="208" width="320" height="64" rx="6" fill="#F8FAFC"/>
<rect x="240" y="208" width="320" height="64" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="400" y="242" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">1.3 Asynchronous</text>
<text x="400" y="256" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">futures · streams · isolates</text>
<rect x="240" y="296" width="320" height="56" rx="6" fill="#F8FAFC"/>
<rect x="240" y="296" width="320" height="56" rx="6" fill="rgba(2,132,199,0.08)" stroke="#0284C7" stroke-width="1.2"/>
<text x="400" y="330" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Session 03+: Widgets &amp; UI</text>
<!-- legend -->
<line x1="32" y1="376" x2="768" y2="376" stroke="rgba(15,23,42,0.12)" stroke-width="0.8"/>
<text x="32" y="392" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" letter-spacing="0.14em">CHÚ GIẢI</text>
<circle cx="150" cy="388" r="4" fill="#0284C7"/>
<text x="162" y="392" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace">ĐÍCH ĐẾN · WIDGETS &amp; UI</text>
<line x1="400" y1="388" x2="432" y2="388" stroke="#64748B" stroke-width="1.2" marker-end="url(#flutter-learning-path-arrow)"/>
<text x="440" y="392" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace">ĐI THEO THỨ TỰ</text>
</svg>
</div>
</div>

<h2>Nội dung Session</h2>

<ul>
  <li><strong>1.1 Dart cho Kotlin Developer</strong>:
<ul>
  <li><a href="dart/dart_for_kotlin_devs.md" target="_blank" rel="noopener">1.1.1 Dart for Kotlin Developers</a>: bản đồ chuyển đổi Kotlin → Dart, runtime và biên dịch (JIT với hot reload khi dev, AOT native khi release), đổi tư duy concurrency, hệ sinh thái <code>pubspec</code>/pub/<code>dart</code> CLI, các bẫy Kotlin developer hay mắc.</li>
</ul></li>
  <li><strong>1.2 Dart Fundamentals</strong>:
<ul>
  <li><a href="dart/variables_and_types.md" target="_blank" rel="noopener">1.2.1 Variables and Types</a>: <code>var</code>/<code>final</code>/<code>const</code>/<code>late</code>, sound type system, kiểu built-in, records, generics, null safety và type promotion.</li>
  <li><a href="dart/functions_operators.md" target="_blank" rel="noopener">1.2.2 Functions and Operators</a>: các loại tham số (positional, optional, named, <code>required</code>), closure, tear-off, <code>typedef</code>, toán tử, cascade <code>..</code>, operator overloading.</li>
  <li><a href="dart/control_flow_patterns.md" target="_blank" rel="noopener">1.2.3 Control Flow and Patterns</a>: <code>switch</code> expression, pattern matching và destructuring, exhaustiveness checking, exception đồng bộ.</li>
  <li><a href="dart/collections_functional.md" target="_blank" rel="noopener">1.2.4 Collections and Functional APIs</a>: <code>List</code>/<code>Set</code>/<code>Map</code>, collection <code>if</code>/<code>for</code>, spread, <code>Iterable</code> lazy, <code>sync*</code>, mutability và equality của collection.</li>
  <li><a href="dart/classes_mixins_sealed.md" target="_blank" rel="noopener">1.2.5 Classes, Mixins and Sealed Types</a>: constructor, implicit interface, mixin, class modifiers, enhanced enum, extension, extension types, <code>==</code>/<code>hashCode</code>, immutability.</li>
</ul></li>
  <li><strong>1.3 Asynchronous Dart</strong>:
<ul>
  <li><a href="async/futures_async_await.md" target="_blank" rel="noopener">1.3.1 Futures and Async/Await</a>: event loop (microtask queue và event queue), <code>Future</code>, <code>async</code>/<code>await</code>, xử lý lỗi bất đồng bộ, <code>Completer</code>, <code>unawaited</code>.</li>
  <li><a href="async/streams.md" target="_blank" rel="noopener">1.3.2 Streams</a>: single-subscription và broadcast, <code>async*</code>, <code>StreamController</code>, biến đổi stream, <code>StreamSubscription</code> và leak.</li>
  <li><a href="async/isolates.md" target="_blank" rel="noopener">1.3.3 Isolates</a>: heap riêng và message passing, <code>Isolate.run</code>, <code>compute</code>, worker sống lâu với <code>SendPort</code>/<code>ReceivePort</code>, chi phí copy dữ liệu.</li>
</ul></li>
</ul>

<h2>Ba trụ cột cần nắm</h2>

<h3>Hệ thống kiểu và null safety</h3>

<p>Dart là ngôn ngữ kiểu tĩnh với <strong>sound type system</strong> và <strong>sound null safety</strong>: nếu chương trình biên dịch được thì một biến kiểu <code>String</code> không bao giờ chứa <code>null</code> lúc chạy. Cùng với đó là ba cách "khoá" giá trị khác nhau (<code>final</code>, <code>const</code>, <code>late</code>) mà Kotlin developer dễ hiểu nhầm. Học ở <a href="dart/variables_and_types.md" target="_blank" rel="noopener">1.2.1 Variables and Types</a>; <code>const</code> còn là nền tảng tối ưu rebuild Widget ở 10.2.2 Build Cost Optimization and Const (chưa có bài).</p>

<h3>Mô hình dữ liệu: sealed type và pattern matching</h3>

<p>Từ Dart 3.0, trạng thái của một màn hình (đang tải, thành công, lỗi) được mô hình hoá bằng <code>sealed class</code> và xử lý bằng <code>switch</code> expression. Compiler kiểm tra đã xử lý đủ mọi trường hợp: thêm trạng thái mới mà quên xử lý thì lỗi lúc biên dịch, không phải lúc người dùng gặp. Học ở <a href="dart/classes_mixins_sealed.md" target="_blank" rel="noopener">1.2.5 Classes, Mixins and Sealed Types</a> (khai báo type) và <a href="dart/control_flow_patterns.md" target="_blank" rel="noopener">1.2.3 Control Flow and Patterns</a> (cơ chế pattern và exhaustiveness).</p>

<h3>Bất đồng bộ: event loop, Future, Stream, isolate</h3>

<p>Mỗi isolate có bộ nhớ riêng và một thread chạy event loop. IO (mạng, file) không chặn event loop nên chỉ cần <code>await</code>; tính toán nặng CPU thì chặn, nên phải chuyển sang isolate khác. Đây là phần khác Kotlin nhiều nhất và là nguồn của phần lớn bug giật UI. Học theo thứ tự <a href="async/futures_async_await.md" target="_blank" rel="noopener">1.3.1 Futures and Async/Await</a> → <a href="async/streams.md" target="_blank" rel="noopener">1.3.2 Streams</a> → <a href="async/isolates.md" target="_blank" rel="noopener">1.3.3 Isolates</a>.</p>

<h2>Thứ tự học đề xuất</h2>

<ul>
  <li><strong>Đã biết Kotlin (Android developer)</strong>: đọc <a href="dart/dart_for_kotlin_devs.md" target="_blank" rel="noopener">1.1.1 Dart for Kotlin Developers</a> trước để có bản đồ, rồi đọc 1.2.1 → 1.2.5 tập trung vào các mục bản đồ đánh dấu "khác nghĩa" hoặc "không có tương đương", sau cùng đọc kỹ 1.3.1 → 1.3.3.</li>
  <li><strong>Chưa biết Kotlin</strong>: trong 1.1.1 chỉ đọc hai mục "Runtime và biên dịch" và "Hệ sinh thái" (không bài nào khác dạy chúng), rồi đi tuần tự 1.2.1 → 1.3.3 theo mục lục.</li>
  <li><strong>Đã biết Dart, cần tra cứu</strong>: dùng bảng ánh xạ trong 1.1.1 như cheatsheet và nhảy tới Topic được link.</li>
</ul>

<p>1.2.1 → 1.2.5 đi từ giá trị đơn lẻ tới hàm, luồng điều khiển, collection rồi class, nên bài sau dùng lại bài trước. Isolate (1.3.3) chỉ có ý nghĩa khi đã hiểu vì sao event loop (1.3.1) bị chặn.</p>

<h2>Tiêu chí hoàn thành</h2>

<p>Bạn sẵn sàng sang Session 02 khi làm được các việc sau mà không cần tra cứu:</p>

<ul>
  <li>Giải thích vì sao <code>final cart = &lt;String&gt;[]; cart.add('KB-01');</code> hợp lệ, và cách tạo một list thật sự không sửa được (1.2.1, 1.2.4).</li>
  <li>Khai báo một hàm với named parameter <code>required</code> và giải thích tham số named không <code>required</code> thì người gọi được phép bỏ qua (1.2.2).</li>
  <li>Viết một <code>sealed class</code> cho trạng thái màn hình và một <code>switch</code> expression mà compiler xác nhận đủ nhánh (1.2.3, 1.2.5).</li>
  <li>Viết model có <code>==</code> và <code>hashCode</code> đúng, hoặc chọn record khi chỉ cần nhóm giá trị (1.2.1, 1.2.5).</li>
  <li>Đoán đúng thứ tự <code>print</code> của một đoạn code trộn code đồng bộ, microtask và <code>Future</code> (1.3.1).</li>
  <li>Giải thích vì sao <code>await</code> một request mạng không làm đơ UI nhưng parse một file JSON lớn thì có, và chuyển việc parse đó sang <code>Isolate.run</code> (1.3.1, 1.3.3).</li>
  <li>Hủy đúng <code>StreamSubscription</code> khi không cần nghe nữa (1.3.2).</li>
</ul>

<h2>Học tiếp</h2>

<p>Session 02 dựng môi trường làm việc: 2.1.1 Flutter CLI and FVM (chưa có bài), 2.1.2 IDEs and Editor Setup (chưa có bài), 2.2.1 pub.dev and Package Management (chưa có bài) và 2.2.2 DevTools and Debugging (chưa có bài). Sau đó Session 03 bắt đầu với 3.1.1 Stateless and Stateful Widgets (chưa có bài), nơi mọi kiến thức Dart của Session 01 được dùng hằng ngày.</p>
    `
  },

  'flutter-dart-for-kotlin-devs': {
    title: 'Dart for Kotlin Developers',
    summary: 'Bản đồ chuyển đổi từ Kotlin sang Dart, xếp mỗi khái niệm Kotlin vào một trong ba nhóm (tương đương, false friend giống tên nhưng khác nghĩa, không có tương đương) và chỉ tới Topic dạy chi tiết. Bài giải thích đầy đủ runtime và biên dịch (JIT trên Dart VM khi dev, AOT ra mã máy khi release) cùng hệ sinh thái pub và dart CLI, và nêu tư duy concurrency phải đổi (mỗi isolate một event loop, không chia sẻ memory).',
    status: 'published',
    difficulty: 'beginner',
    estimatedReadingTime: '24 phút',
    depth: 'standard',
    tags: ['flutter', 'dart', 'session-01', 'kotlin', 'migration', 'runtime', 'jit-aot', 'pub'],
    domain: 'Flutter Development',
    module: 'Session 01: Dart Foundations',
    prerequisites: [],
    related: ['flutter.dart.variables_types', 'flutter.dart.functions_operators', 'flutter.dart.classes_mixins_sealed', 'flutter.async.futures_async_await', 'flutter.async.isolates'],
    learningOutcomes: [
      'Giải thích được code Dart chạy thế nào trong app Flutter (JIT trên Dart VM kèm hot reload khi dev, AOT ra mã máy native khi release) và khác chuỗi Kotlin → bytecode → dex → ART ở đâu.',
      'Phân biệt được cặp khái niệm Kotlin–Dart tương đương thật với cặp false friend giống tên nhưng khác nghĩa, như `val` và `final`, named argument và named parameter, smart cast và type promotion.',
      'Giải thích được vì sao phải đổi tư duy concurrency khi sang Dart, gồm event loop của mỗi isolate, không chia sẻ memory, IO chỉ cần `await` còn việc nặng CPU phải chuyển sang isolate khác.',
      'Nhận diện được các bẫy Kotlin developer hay mắc khi viết Dart và Topic nào trong Session 01 giải thích từng bẫy.',
      'Áp dụng được bảng ánh xạ và bộ công cụ `dart`/pub để dịch một đoạn code Kotlin quen thuộc sang Dart và chạy được nó.'
    ],
    knowledgeGap: 'Kotlin developer dịch Dart từng dòng theo thói quen sẽ tin `final` khoá luôn nội dung list, quên `required` nên tham số bị bỏ qua mà không lỗi, so sánh model bằng `==` khi không có data class, chạy tính toán nặng trên main isolate làm UI giật, đo hiệu năng trên bản debug rồi kết luận sai, và đi tìm reflection vốn không có trong Flutter.',
    updatedAt: '2026-11-10',
    readTime: '24 phút',
    content: `
<h2>Vấn đề cần giải quyết</h2>

<p>Kotlin developer mở file <code>.dart</code> đầu tiên thường thấy quen: có <code>T?</code>, có <code>?.</code>, có lambda, có <code>sealed class</code>, có string template <code>$name</code>. Phần lớn cú pháp dịch được gần như từng dòng, nhưng có ba loại khác biệt gây bug mà compiler không báo:</p>

<ul>
  <li><strong>Giống tên nhưng khác nghĩa.</strong> <code>final</code> giống <code>val</code> ở chỗ chỉ gán một lần, nhưng list literal của Dart luôn sửa được:
<pre data-lang="dart"><code>final tags = ['flutter'];
tags.add('kotlin'); // hợp lệ: final chỉ khoá biến, không khoá list</code></pre>
<p>Trong Kotlin, <code>val tags = listOf("flutter")</code> không có <code>add</code>. Người quen Kotlin đọc <code>final</code> thành "không đổi" và để lọt bug state.</p></li>
  <li><strong>Không có tương đương.</strong> Dart không có <code>data class</code>, không có <code>it</code>, không có <code>Dispatchers</code>; Flutter không có reflection. Đi tìm "bản Dart của X" thì mất thời gian, hoặc dùng nhầm một thứ trông giống nhưng sai.</li>
  <li><strong>Phải đổi tư duy.</strong> Code Dart không chạy trên ART, và concurrency của Dart không dựa trên thread chia sẻ memory. Hai khác biệt này giải thích vì sao Flutter có hot reload, vì sao bản debug chạy chậm, và vì sao một vòng lặp tính toán làm cả UI đứng hình.</li>
</ul>

<p>Học lại Dart từ đầu thì phí phần Kotlin đã biết, dịch từng dòng thì dính bẫy. Cần một bản đồ cho biết chỗ nào dịch thẳng, chỗ nào phải dừng lại học kỹ.</p>

<h2>Sau khi học xong</h2>

<ul>
  <li>Giải thích được code Dart chạy thế nào trong app Flutter (JIT trên Dart VM kèm hot reload khi dev, AOT ra mã máy native khi release) và khác chuỗi Kotlin → bytecode → dex → ART ở đâu.</li>
  <li>Phân biệt được cặp khái niệm Kotlin–Dart tương đương thật với cặp false friend giống tên nhưng khác nghĩa, như <code>val</code> và <code>final</code>, named argument và named parameter, smart cast và type promotion.</li>
  <li>Giải thích được vì sao phải đổi tư duy concurrency khi sang Dart, gồm event loop của mỗi isolate, không chia sẻ memory, IO chỉ cần <code>await</code> còn việc nặng CPU phải chuyển sang isolate khác.</li>
  <li>Nhận diện được các bẫy Kotlin developer hay mắc khi viết Dart và Topic nào trong Session 01 giải thích từng bẫy.</li>
  <li>Áp dụng được bảng ánh xạ và bộ công cụ <code>dart</code>/pub để dịch một đoạn code Kotlin quen thuộc sang Dart và chạy được nó.</li>
</ul>

<h2>Dart for Kotlin Developers là gì?</h2>

<p><strong>Dart for Kotlin Developers</strong> là bản đồ chuyển đổi từ Kotlin sang Dart: mỗi khái niệm Kotlin được đặt cạnh khái niệm Dart tương ứng và xếp vào một trong ba nhóm (<strong>tương đương</strong>, <strong>false friend</strong> tức giống tên nhưng khác nghĩa, <strong>không có tương đương</strong>), kèm Topic dạy chi tiết.</p>

<p>Mental model: một <strong>từ điển song ngữ có đánh dấu false friend</strong>. Từ điển không dạy lại ngữ pháp; nó cho biết từ nào dịch thẳng, từ nào trông giống nhưng nghĩa khác, và mở trang nào để học kỹ.</p>

<p>Vì vậy mỗi mục của bảng chỉ nói đủ để nhận ra khác biệt rồi link sang Topic sở hữu. Riêng <strong>runtime và biên dịch</strong> và <strong>hệ sinh thái công cụ</strong> được giải thích đầy đủ ở đây, vì không Topic nào khác trong Session 01 sở hữu chúng.</p>

<h2>Cách hoạt động</h2>

<h3>Bảy cặp khái niệm cốt lõi</h3>

<p>Bảy cặp dưới đây bao phủ phần lớn code Kotlin hằng ngày, đọc từ khái niệm Kotlin sang thứ gần nhất trong Dart.</p>

<div class="dd-diagram" data-dd="flutter-kotlin-dart-map">
<div class="dd-svg dd-svg-dark">
<svg viewBox="0 0 800 540" role="img" aria-labelledby="flutter-kotlin-dart-map-dark-title flutter-kotlin-dart-map-dark-desc" font-family="'Geist', sans-serif">
<title id="flutter-kotlin-dart-map-dark-title">Bảy cặp song sinh Kotlin–Dart</title>
<desc id="flutter-kotlin-dart-map-dark-desc">Bảy cặp khái niệm tương đương giữa Kotlin và Dart từ khai báo biến tới hệ sinh thái build.</desc>
<defs>
<marker id="flutter-kotlin-dart-map-dark-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0, 8 3, 0 6" fill="#94A3B8"/>
</marker>
</defs>
<rect width="800" height="540" fill="#060913"/>
<!-- nodes -->
<rect x="120" y="32" width="560" height="52" rx="6" fill="#060913"/>
<rect x="120" y="32" width="560" height="52" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="400" y="63" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">val / var / const val → final / var / const</text>
<rect x="120" y="100" width="560" height="52" rx="6" fill="#060913"/>
<rect x="120" y="100" width="560" height="52" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="400" y="131" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">T? + Smart Cast → T? + Promotion (local, private final)</text>
<rect x="120" y="168" width="560" height="52" rx="6" fill="#060913"/>
<rect x="120" y="168" width="560" height="52" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="400" y="199" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">data class → Record / Freezed codegen</text>
<rect x="120" y="236" width="560" height="52" rx="6" fill="#060913"/>
<rect x="120" y="236" width="560" height="52" rx="6" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="1.2"/>
<text x="400" y="267" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">suspend + Flow + Dispatchers → Future + Stream + Isolate</text>
<rect x="120" y="304" width="560" height="52" rx="6" fill="#060913"/>
<rect x="120" y="304" width="560" height="52" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="400" y="335" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">class final mặc định → class mở + modifiers</text>
<rect x="120" y="372" width="560" height="52" rx="6" fill="#060913"/>
<rect x="120" y="372" width="560" height="52" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="400" y="403" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">when + sealed class → switch expression + Patterns</text>
<rect x="120" y="440" width="560" height="52" rx="6" fill="#060913"/>
<rect x="120" y="440" width="560" height="52" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="400" y="471" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Gradle · Maven · KSP → pub · pub.dev · build_runner</text>
<!-- legend -->
<line x1="32" y1="516" x2="768" y2="516" stroke="rgba(248,250,252,0.12)" stroke-width="0.8"/>
<text x="32" y="532" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" letter-spacing="0.14em">CHÚ GIẢI</text>
<circle cx="150" cy="528" r="4" fill="#38BDF8"/>
<text x="162" y="532" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace">BƯỚC NHẢY LỚN · ASYNC MODEL</text>
<line x1="430" y1="528" x2="462" y2="528" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#flutter-kotlin-dart-map-dark-arrow)"/>
<text x="470" y="532" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace">ĐỌC TRÁI → PHẢI · KOTLIN → DART</text>
</svg>
</div>
<div class="dd-svg dd-svg-light">
<svg viewBox="0 0 800 540" role="img" aria-labelledby="flutter-kotlin-dart-map-title flutter-kotlin-dart-map-desc" font-family="'Geist', sans-serif">
<title id="flutter-kotlin-dart-map-title">Bảy cặp song sinh Kotlin–Dart</title>
<desc id="flutter-kotlin-dart-map-desc">Bảy cặp khái niệm tương đương giữa Kotlin và Dart từ khai báo biến tới hệ sinh thái build.</desc>
<defs>
<marker id="flutter-kotlin-dart-map-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0, 8 3, 0 6" fill="#64748B"/>
</marker>
</defs>
<rect width="800" height="540" fill="#F8FAFC"/>
<!-- nodes -->
<rect x="120" y="32" width="560" height="52" rx="6" fill="#F8FAFC"/>
<rect x="120" y="32" width="560" height="52" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="400" y="63" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">val / var / const val → final / var / const</text>
<rect x="120" y="100" width="560" height="52" rx="6" fill="#F8FAFC"/>
<rect x="120" y="100" width="560" height="52" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="400" y="131" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">T? + Smart Cast → T? + Promotion (local, private final)</text>
<rect x="120" y="168" width="560" height="52" rx="6" fill="#F8FAFC"/>
<rect x="120" y="168" width="560" height="52" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="400" y="199" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">data class → Record / Freezed codegen</text>
<rect x="120" y="236" width="560" height="52" rx="6" fill="#F8FAFC"/>
<rect x="120" y="236" width="560" height="52" rx="6" fill="rgba(2,132,199,0.08)" stroke="#0284C7" stroke-width="1.2"/>
<text x="400" y="267" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">suspend + Flow + Dispatchers → Future + Stream + Isolate</text>
<rect x="120" y="304" width="560" height="52" rx="6" fill="#F8FAFC"/>
<rect x="120" y="304" width="560" height="52" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="400" y="335" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">class final mặc định → class mở + modifiers</text>
<rect x="120" y="372" width="560" height="52" rx="6" fill="#F8FAFC"/>
<rect x="120" y="372" width="560" height="52" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="400" y="403" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">when + sealed class → switch expression + Patterns</text>
<rect x="120" y="440" width="560" height="52" rx="6" fill="#F8FAFC"/>
<rect x="120" y="440" width="560" height="52" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="400" y="471" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Gradle · Maven · KSP → pub · pub.dev · build_runner</text>
<!-- legend -->
<line x1="32" y1="516" x2="768" y2="516" stroke="rgba(15,23,42,0.12)" stroke-width="0.8"/>
<text x="32" y="532" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" letter-spacing="0.14em">CHÚ GIẢI</text>
<circle cx="150" cy="528" r="4" fill="#0284C7"/>
<text x="162" y="532" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace">BƯỚC NHẢY LỚN · ASYNC MODEL</text>
<line x1="430" y1="528" x2="462" y2="528" stroke="#64748B" stroke-width="1.2" marker-end="url(#flutter-kotlin-dart-map-arrow)"/>
<text x="470" y="532" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace">ĐỌC TRÁI → PHẢI · KOTLIN → DART</text>
</svg>
</div>
</div>

<p>Cặp thứ tư (async) là bước nhảy lớn nhất vì nó đổi mô hình chạy, nên có mục riêng bên dưới. Các bảng sau mở rộng bảy cặp theo từng Topic; cột "Nhóm": <strong>=</strong> tương đương, <strong>≈</strong> false friend, <strong>✗</strong> không có tương đương.</p>

<h4>Biến, kiểu, null safety → 1.2.1</h4>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Kotlin</th>
      <th style="padding:8px 12px;text-align:left;">Dart</th>
      <th style="padding:8px 12px;text-align:left;">Nhóm</th>
      <th style="padding:8px 12px;text-align:left;">Ghi chú</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>val x = 1</code></td>
      <td style="padding:8px 12px;"><code>final x = 1;</code></td>
      <td style="padding:8px 12px;">≈</td>
      <td style="padding:8px 12px;">Chỉ khoá biến; object bên trong vẫn sửa được nếu nó mutable</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>const val MAX = 3</code></td>
      <td style="padding:8px 12px;"><code>const max = 3;</code></td>
      <td style="padding:8px 12px;">≈</td>
      <td style="padding:8px 12px;"><code>const</code> của Dart rộng hơn: dùng được cho constructor và collection literal, giá trị giống nhau dùng chung một instance</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>lateinit var x: T</code></td>
      <td style="padding:8px 12px;"><code>late T x;</code></td>
      <td style="padding:8px 12px;">=</td>
      <td style="padding:8px 12px;">Đọc trước khi gán thì lỗi runtime</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>val x by lazy { … }</code></td>
      <td style="padding:8px 12px;"><code>late final x = compute();</code></td>
      <td style="padding:8px 12px;">≈</td>
      <td style="padding:8px 12px;">Không có property delegation; <code>late</code> có initializer thì chạy ở lần đọc đầu tiên</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>Int</code>, <code>Long</code>, <code>Double</code></td>
      <td style="padding:8px 12px;"><code>int</code>, <code>double</code>, <code>num</code></td>
      <td style="padding:8px 12px;">≈</td>
      <td style="padding:8px 12px;">Không có <code>Long</code>/<code>Short</code>/<code>Float</code>; <code>int</code> 64-bit trên native nhưng trên web là số JavaScript</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>Any</code> / <code>Any?</code> / <code>Nothing</code> / <code>Unit</code></td>
      <td style="padding:8px 12px;"><code>Object</code> / <code>Object?</code> / <code>Never</code> / <code>void</code></td>
      <td style="padding:8px 12px;">=</td>
      <td style="padding:8px 12px;">Dart có thêm <code>dynamic</code>: tắt kiểm tra kiểu tĩnh, Kotlin không có</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Smart cast sau <code>!= null</code></td>
      <td style="padding:8px 12px;">Type promotion</td>
      <td style="padding:8px 12px;">≈</td>
      <td style="padding:8px 12px;">Áp dụng cho biến local và (từ Dart 3.2) private final field; field public không được promote</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>as?</code></td>
      <td style="padding:8px 12px;"><code>x is T ? x : null</code>, hoặc pattern</td>
      <td style="padding:8px 12px;">✗</td>
      <td style="padding:8px 12px;">Không có toán tử safe cast</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>Pair</code>, <code>Triple</code></td>
      <td style="padding:8px 12px;">Record <code>(a, b)</code></td>
      <td style="padding:8px 12px;">=</td>
      <td style="padding:8px 12px;">Record so sánh <code>==</code> theo giá trị, có field đặt tên <code>(id: 1, name: 'A')</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Generic bị erase, <code>reified</code></td>
      <td style="padding:8px 12px;">Generic reified</td>
      <td style="padding:8px 12px;">≈</td>
      <td style="padding:8px 12px;"><code>List&lt;int&gt;</code> biết kiểu phần tử lúc runtime, không cần <code>inline reified</code></td>
    </tr>
  </tbody>
</table>

<p>Chi tiết ở <a href="variables_and_types.md" target="_blank" rel="noopener">1.2.1 Variables and Types</a>.</p>

<h4>Hàm và toán tử → 1.2.2</h4>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Kotlin</th>
      <th style="padding:8px 12px;text-align:left;">Dart</th>
      <th style="padding:8px 12px;text-align:left;">Nhóm</th>
      <th style="padding:8px 12px;text-align:left;">Ghi chú</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>fun f(a: Int = 0)</code></td>
      <td style="padding:8px 12px;"><code>void f([int a = 0])</code> hoặc <code>void f({int a = 0})</code></td>
      <td style="padding:8px 12px;">≈</td>
      <td style="padding:8px 12px;">Dart chia hai kiểu tham số tuỳ chọn: positional <code>[]</code> và named <code>{}</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Gọi <code>f(a = 1)</code> tuỳ ý</td>
      <td style="padding:8px 12px;"><code>{}</code> thì <strong>bắt buộc</strong> gọi kèm tên</td>
      <td style="padding:8px 12px;">≈</td>
      <td style="padding:8px 12px;">Ngược chiều Kotlin: tên là thuộc tính của khai báo, không phải của lời gọi</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Tham số không default là bắt buộc</td>
      <td style="padding:8px 12px;">Named không <code>required</code>, không default thì được bỏ qua và nhận <code>null</code></td>
      <td style="padding:8px 12px;">≈</td>
      <td style="padding:8px 12px;">Quên <code>required</code> là bỏ sót tham số mà không lỗi</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>(Int) -&gt; Unit</code></td>
      <td style="padding:8px 12px;"><code>void Function(int)</code></td>
      <td style="padding:8px 12px;">=</td>
      <td style="padding:8px 12px;"><code>typedef</code> thay cho <code>typealias</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>{ x -&gt; … }</code>, <code>it</code></td>
      <td style="padding:8px 12px;"><code>(x) =&gt; …</code>, <code>(x) { … }</code></td>
      <td style="padding:8px 12px;">✗</td>
      <td style="padding:8px 12px;">Không có <code>it</code>, không có trailing lambda</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>::format</code></td>
      <td style="padding:8px 12px;">Tear-off <code>format</code>, <code>Text.new</code></td>
      <td style="padding:8px 12px;">=</td>
      <td style="padding:8px 12px;"></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>.apply { … }</code></td>
      <td style="padding:8px 12px;">Cascade <code>..</code></td>
      <td style="padding:8px 12px;">≈</td>
      <td style="padding:8px 12px;">Cascade trả lại receiver, không có scope <code>this</code> mới</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>?.let { … }</code></td>
      <td style="padding:8px 12px;">Biến local + <code>if</code>, hoặc <code>if (x case final v?)</code></td>
      <td style="padding:8px 12px;">✗</td>
      <td style="padding:8px 12px;"></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>===</code></td>
      <td style="padding:8px 12px;"><code>identical(a, b)</code></td>
      <td style="padding:8px 12px;">=</td>
      <td style="padding:8px 12px;"></td>
    </tr>
  </tbody>
</table>

<p>Chi tiết ở <a href="functions_operators.md" target="_blank" rel="noopener">1.2.2 Functions and Operators</a>.</p>

<h4>Điều khiển luồng, pattern, exception → 1.2.3</h4>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Kotlin</th>
      <th style="padding:8px 12px;text-align:left;">Dart</th>
      <th style="padding:8px 12px;text-align:left;">Nhóm</th>
      <th style="padding:8px 12px;text-align:left;">Ghi chú</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>when (x) { is A -&gt; … }</code></td>
      <td style="padding:8px 12px;"><code>switch (x) { A() =&gt; … }</code></td>
      <td style="padding:8px 12px;">=</td>
      <td style="padding:8px 12px;"><code>switch</code> expression có từ Dart 3.0</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>when</code> không subject</td>
      <td style="padding:8px 12px;">Chuỗi <code>if</code>/<code>else if</code></td>
      <td style="padding:8px 12px;">✗</td>
      <td style="padding:8px 12px;"></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>val (a, b) = pair</code></td>
      <td style="padding:8px 12px;"><code>final (a, b) = record;</code></td>
      <td style="padding:8px 12px;">=</td>
      <td style="padding:8px 12px;">Dart destructure được cả list, map và object bằng pattern</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>for (i in 0 until n)</code></td>
      <td style="padding:8px 12px;"><code>for (var i = 0; i &lt; n; i++)</code></td>
      <td style="padding:8px 12px;">✗</td>
      <td style="padding:8px 12px;">Không có range</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>try</code>/<code>catch (e: T)</code></td>
      <td style="padding:8px 12px;"><code>try</code>/<code>on T catch (e, st)</code></td>
      <td style="padding:8px 12px;">≈</td>
      <td style="padding:8px 12px;">Dart throw được mọi object khác null; phân biệt <code>Exception</code> (lỗi dự kiến) và <code>Error</code> (bug)</td>
    </tr>
  </tbody>
</table>

<p>Chi tiết ở <a href="control_flow_patterns.md" target="_blank" rel="noopener">1.2.3 Control Flow and Patterns</a>.</p>

<h4>Collections → 1.2.4</h4>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Kotlin</th>
      <th style="padding:8px 12px;text-align:left;">Dart</th>
      <th style="padding:8px 12px;text-align:left;">Nhóm</th>
      <th style="padding:8px 12px;text-align:left;">Ghi chú</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>listOf(…)</code> (read-only)</td>
      <td style="padding:8px 12px;"><code>[…]</code></td>
      <td style="padding:8px 12px;">≈</td>
      <td style="padding:8px 12px;">List literal luôn mutable; bản không sửa được là <code>const […]</code> hoặc <code>List.unmodifiable</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>mapOf("a" to 1)</code>, <code>setOf(…)</code></td>
      <td style="padding:8px 12px;"><code>{'a': 1}</code>, <code>{…}</code></td>
      <td style="padding:8px 12px;">≈</td>
      <td style="padding:8px 12px;"><code>{}</code> rỗng là <code>Map</code>, không phải <code>Set</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>filter</code>, <code>flatMap</code>, <code>sumOf</code></td>
      <td style="padding:8px 12px;"><code>where</code>, <code>expand</code>, <code>fold</code></td>
      <td style="padding:8px 12px;">=</td>
      <td style="padding:8px 12px;"><code>map</code>/<code>where</code> trả <code>Iterable</code> lazy, cần <code>.toList()</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>asSequence()</code>, <code>sequence { }</code></td>
      <td style="padding:8px 12px;"><code>Iterable</code> sẵn lazy, <code>sync*</code></td>
      <td style="padding:8px 12px;">≈</td>
      <td style="padding:8px 12px;"></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>sortedBy { }</code> (list mới)</td>
      <td style="padding:8px 12px;"><code>list.sort(…)</code> (sửa tại chỗ)</td>
      <td style="padding:8px 12px;">≈</td>
      <td style="padding:8px 12px;"></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>groupBy</code></td>
      <td style="padding:8px 12px;"><code>groupBy</code> của <code>package:collection</code></td>
      <td style="padding:8px 12px;">✗</td>
      <td style="padding:8px 12px;">Không có trong <code>dart:core</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Không có</td>
      <td style="padding:8px 12px;">Collection <code>if</code>/<code>for</code>, spread <code>...</code></td>
      <td style="padding:8px 12px;">✗</td>
      <td style="padding:8px 12px;">Dart có, Kotlin không</td>
    </tr>
  </tbody>
</table>

<p>Chi tiết ở <a href="collections_functional.md" target="_blank" rel="noopener">1.2.4 Collections and Functional APIs</a>.</p>

<h4>Class → 1.2.5</h4>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Kotlin</th>
      <th style="padding:8px 12px;text-align:left;">Dart</th>
      <th style="padding:8px 12px;text-align:left;">Nhóm</th>
      <th style="padding:8px 12px;text-align:left;">Ghi chú</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>class User(val name: String)</code></td>
      <td style="padding:8px 12px;">Constructor <code>this.name</code>, hoặc primary constructor (Dart 3.13)</td>
      <td style="padding:8px 12px;">≈</td>
      <td style="padding:8px 12px;">Primary constructor chỉ bớt boilerplate, không sinh <code>==</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>data class</code></td>
      <td style="padding:8px 12px;">Record, <code>==</code>/<code>hashCode</code> tự viết, hoặc Freezed</td>
      <td style="padding:8px 12px;">✗</td>
      <td style="padding:8px 12px;">Class thường so <code>==</code> theo identity</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Class <code>final</code> mặc định, <code>open</code></td>
      <td style="padding:8px 12px;">Class mở mặc định, <code>final class</code> để khoá</td>
      <td style="padding:8px 12px;">≈</td>
      <td style="padding:8px 12px;">Mặc định ngược nhau</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>interface</code></td>
      <td style="padding:8px 12px;">Implicit interface, <code>abstract interface class</code></td>
      <td style="padding:8px 12px;">≈</td>
      <td style="padding:8px 12px;">Mọi class đều <code>implements</code> được</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>sealed class</code> / <code>sealed interface</code></td>
      <td style="padding:8px 12px;"><code>sealed class</code></td>
      <td style="padding:8px 12px;">=</td>
      <td style="padding:8px 12px;">Subclass phải cùng library</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Default method trong interface, <code>by</code></td>
      <td style="padding:8px 12px;"><code>mixin</code> + <code>with</code></td>
      <td style="padding:8px 12px;">≈</td>
      <td style="padding:8px 12px;"></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>enum class</code> có property</td>
      <td style="padding:8px 12px;">Enhanced enum</td>
      <td style="padding:8px 12px;">=</td>
      <td style="padding:8px 12px;"></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>companion object</code>, <code>object</code></td>
      <td style="padding:8px 12px;"><code>static</code>, private constructor <code>._()</code></td>
      <td style="padding:8px 12px;">≈</td>
      <td style="padding:8px 12px;"></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Extension function/property</td>
      <td style="padding:8px 12px;"><code>extension … on T</code></td>
      <td style="padding:8px 12px;">=</td>
      <td style="padding:8px 12px;"></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>value class</code></td>
      <td style="padding:8px 12px;">Extension type (Dart 3.3)</td>
      <td style="padding:8px 12px;">≈</td>
      <td style="padding:8px 12px;">Chỉ tồn tại lúc compile; runtime chỉ thấy kiểu bên dưới</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Hilt/Moshi dùng reflection, KSP</td>
      <td style="padding:8px 12px;">Codegen bằng <code>build_runner</code></td>
      <td style="padding:8px 12px;">≈</td>
      <td style="padding:8px 12px;">Flutter không có <code>dart:mirrors</code></td>
    </tr>
  </tbody>
</table>

<p>Chi tiết ở <a href="classes_mixins_sealed.md" target="_blank" rel="noopener">1.2.5 Classes, Mixins and Sealed Types</a>.</p>

<h4>Bất đồng bộ → 1.3.x</h4>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Kotlin</th>
      <th style="padding:8px 12px;text-align:left;">Dart</th>
      <th style="padding:8px 12px;text-align:left;">Nhóm</th>
      <th style="padding:8px 12px;text-align:left;">Ghi chú</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>suspend fun load(): User</code></td>
      <td style="padding:8px 12px;"><code>Future&lt;User&gt; load() async</code></td>
      <td style="padding:8px 12px;">≈</td>
      <td style="padding:8px 12px;">Không có từ khoá <code>suspend</code>; hàm async trả <code>Future</code> (<a href="../async/futures_async_await.md" target="_blank" rel="noopener">1.3.1</a>)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>scope.launch { }</code></td>
      <td style="padding:8px 12px;">Gọi không <code>await</code>, đánh dấu <code>unawaited(…)</code></td>
      <td style="padding:8px 12px;">≈</td>
      <td style="padding:8px 12px;">Lỗi của <code>Future</code> không ai <code>await</code> dễ bị bỏ sót (<a href="../async/futures_async_await.md" target="_blank" rel="noopener">1.3.1</a>)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>withContext(Dispatchers.IO)</code></td>
      <td style="padding:8px 12px;">Không cần</td>
      <td style="padding:8px 12px;">✗</td>
      <td style="padding:8px 12px;">IO của Dart vốn không chặn event loop</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>withContext(Dispatchers.Default)</code></td>
      <td style="padding:8px 12px;"><code>Isolate.run(…)</code>, <code>compute(…)</code></td>
      <td style="padding:8px 12px;">≈</td>
      <td style="padding:8px 12px;">Dữ liệu được copy sang isolate khác (<a href="../async/isolates.md" target="_blank" rel="noopener">1.3.3</a>)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>delay</code>, <code>withTimeout</code></td>
      <td style="padding:8px 12px;"><code>Future.delayed</code>, <code>.timeout(…)</code></td>
      <td style="padding:8px 12px;">=</td>
      <td style="padding:8px 12px;">(<a href="../async/futures_async_await.md" target="_blank" rel="noopener">1.3.1</a>)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>job.cancel()</code></td>
      <td style="padding:8px 12px;"><code>StreamSubscription.cancel()</code></td>
      <td style="padding:8px 12px;">≈</td>
      <td style="padding:8px 12px;"><code>Future</code> không hủy được (<a href="../async/streams.md" target="_blank" rel="noopener">1.3.2</a>)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>Flow</code>, <code>flow { emit(x) }</code></td>
      <td style="padding:8px 12px;"><code>Stream</code>, <code>async* { yield x; }</code></td>
      <td style="padding:8px 12px;">≈</td>
      <td style="padding:8px 12px;">Stream mặc định chỉ listen được một lần (<a href="../async/streams.md" target="_blank" rel="noopener">1.3.2</a>)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>StateFlow</code></td>
      <td style="padding:8px 12px;"><code>ValueNotifier</code></td>
      <td style="padding:8px 12px;">≈</td>
      <td style="padding:8px 12px;">Học ở 4.1.1 ChangeNotifier and ValueNotifier (chưa có bài)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>Mutex</code>, <code>synchronized</code></td>
      <td style="padding:8px 12px;">Hiếm khi cần</td>
      <td style="padding:8px 12px;">✗</td>
      <td style="padding:8px 12px;">Isolate không chia sẻ memory</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>runBlocking</code></td>
      <td style="padding:8px 12px;">Không có</td>
      <td style="padding:8px 12px;">✗</td>
      <td style="padding:8px 12px;">Không có cách chặn thread để chờ <code>Future</code></td>
    </tr>
  </tbody>
</table>

<h3>Runtime và biên dịch: code Dart không chạy trên ART</h3>

<p><strong>Kotlin trên Android</strong> đi qua một chuỗi biến đổi: <code>kotlinc</code> biên dịch <code>.kt</code> thành Java bytecode <code>.class</code>, D8/R8 chuyển thành <code>.dex</code>, và ART trên thiết bị chạy <code>.dex</code> (bản thân ART còn JIT và AOT <code>.dex</code> sang mã máy theo profile sử dụng). Kotlin không có runtime riêng; ART không biết class ban đầu viết bằng Java hay Kotlin. Chuỗi này được giải thích ở <a href="../../../../knowledge/android/docs/session_01/languages/java_android.md" target="_blank" rel="noopener">Android 1.1.1 Java Android</a> và <a href="../../../../knowledge/android/docs/session_01/languages/kotlin.md" target="_blank" rel="noopener">Android 1.1.2 Kotlin</a>.</p>

<p><strong>Dart trong Flutter</strong> không đi qua JVM bytecode, D8 hay ART. Dart có runtime riêng (garbage collector, kiểm tra kiểu lúc chạy, quản lý isolate), và cách biên dịch phụ thuộc build mode:</p>

<ol>
  <li><strong>Debug (khi dev): JIT trên Dart VM.</strong> Compiler trên máy dev dịch source thành kernel file (dạng trung gian của Dart). Dart VM trên thiết bị nạp kernel và biên dịch JIT. Khi bạn sửa code và hot reload, chỉ các library bị ảnh hưởng được dịch lại thành kernel và gửi sang VM đang chạy; VM nạp lại library, Flutter build lại cây widget, <strong>state hiện tại được giữ</strong>.</li>
  <li><strong>Profile và release: AOT ra mã máy native.</strong> Compiler AOT dịch toàn bộ code Dart thành mã máy ARM hoặc x64 trước khi đóng gói. Trên Android, mã này nằm trong <code>libapp.so</code>, chạy cùng Flutter engine (<code>libflutter.so</code>). Không JIT lúc chạy nên app khởi động nhanh và hiệu năng ổn định.</li>
  <li><strong>Web</strong>: Dart được dịch sang JavaScript hoặc WebAssembly (<code>dartdevc</code> khi dev, <code>dart2js</code>/<code>dart2wasm</code> khi release).</li>
</ol>

<div class="dd-diagram" data-dd="flutter-build-pipeline">
<div class="dd-svg dd-svg-dark">
<svg viewBox="0 0 800 460" role="img" aria-labelledby="flutter-build-pipeline-dark-title flutter-build-pipeline-dark-desc" font-family="'Geist', sans-serif">
<title id="flutter-build-pipeline-dark-title">Dart bỏ qua cả JVM</title>
<desc id="flutter-build-pipeline-dark-desc">Kotlin biên dịch qua bytecode và dex tới ART, Dart chạy JIT với hot reload khi dev và AOT ra native ARM khi release.</desc>
<defs>
<marker id="flutter-build-pipeline-dark-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0, 8 3, 0 6" fill="#94A3B8"/>
</marker>
</defs>
<rect width="800" height="460" fill="#060913"/>
<!-- zones -->
<rect x="32" y="24" width="340" height="388" rx="8" fill="rgba(248,250,252,0.02)" stroke="rgba(248,250,252,0.10)" stroke-width="0.8"/>
<rect x="48" y="28" width="168" height="12" rx="2" fill="#060913"/>
<text x="132" y="37" fill="#64748B" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.14em">KOTLIN TRÊN ANDROID</text>
<rect x="428" y="24" width="340" height="388" rx="8" fill="rgba(248,250,252,0.02)" stroke="rgba(248,250,252,0.10)" stroke-width="0.8"/>
<rect x="444" y="28" width="152" height="12" rx="2" fill="#060913"/>
<text x="520" y="37" fill="#64748B" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.14em">DART TRÊN FLUTTER</text>
<!-- arrows -->
<path d="M 202,132 V 160" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#flutter-build-pipeline-dark-arrow)"/>
<rect x="214" y="138" width="64" height="12" rx="2" fill="#060913"/>
<text x="246" y="147" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">KOTLINC</text>
<path d="M 202,216 V 248" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#flutter-build-pipeline-dark-arrow)"/>
<rect x="214" y="226" width="64" height="12" rx="2" fill="#060913"/>
<text x="246" y="235" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">D8 / R8</text>
<path d="M 202,300 V 336" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#flutter-build-pipeline-dark-arrow)"/>
<path d="M 598,136 V 200" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#flutter-build-pipeline-dark-arrow)"/>
<rect x="548" y="158" width="64" height="12" rx="2" fill="#060913"/>
<text x="580" y="167" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">JIT DEV</text>
<path d="M 736,108 H 744 Q 752,108 752,116 V 320 Q 752,328 744,328 H 736" fill="none" stroke="#94A3B8" stroke-width="1.2" stroke-dasharray="4,3" marker-end="url(#flutter-build-pipeline-dark-arrow)"/>
<rect x="684" y="272" width="72" height="12" rx="2" fill="#060913"/>
<text x="720" y="281" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">AOT RELEASE</text>
<!-- nodes -->
<rect x="64" y="80" width="276" height="52" rx="6" fill="#060913"/>
<rect x="64" y="80" width="276" height="52" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="202" y="111" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">.kt source</text>
<rect x="64" y="160" width="276" height="56" rx="6" fill="#060913"/>
<rect x="64" y="160" width="276" height="56" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="202" y="194" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">JVM Bytecode</text>
<rect x="64" y="248" width="276" height="52" rx="6" fill="#060913"/>
<rect x="64" y="248" width="276" height="52" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="202" y="279" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">.dex</text>
<rect x="64" y="336" width="276" height="52" rx="6" fill="#060913"/>
<rect x="64" y="336" width="276" height="52" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="202" y="367" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">ART Runtime</text>
<rect x="460" y="80" width="276" height="56" rx="6" fill="#060913"/>
<rect x="460" y="80" width="276" height="56" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="598" y="114" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">.dart source</text>
<rect x="460" y="200" width="276" height="64" rx="6" fill="#060913"/>
<rect x="460" y="200" width="276" height="64" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="598" y="234" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Dart VM + Hot Reload</text>
<rect x="460" y="296" width="276" height="64" rx="6" fill="#060913"/>
<rect x="460" y="296" width="276" height="64" rx="6" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="1.2"/>
<text x="598" y="330" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Native ARM Code</text>
<text x="598" y="344" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">AOT release</text>
<!-- legend -->
<line x1="32" y1="436" x2="768" y2="436" stroke="rgba(248,250,252,0.12)" stroke-width="0.8"/>
<text x="32" y="452" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" letter-spacing="0.14em">CHÚ GIẢI</text>
<circle cx="150" cy="448" r="4" fill="#38BDF8"/>
<text x="162" y="452" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace">ĐÍCH RELEASE · NATIVE ARM</text>
<line x1="430" y1="448" x2="462" y2="448" stroke="#94A3B8" stroke-width="1.2" stroke-dasharray="4,3" marker-end="url(#flutter-build-pipeline-dark-arrow)"/>
<text x="470" y="452" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace">NÉT ĐỨT · AOT RELEASE BUILD</text>
</svg>
</div>
<div class="dd-svg dd-svg-light">
<svg viewBox="0 0 800 460" role="img" aria-labelledby="flutter-build-pipeline-title flutter-build-pipeline-desc" font-family="'Geist', sans-serif">
<title id="flutter-build-pipeline-title">Dart bỏ qua cả JVM</title>
<desc id="flutter-build-pipeline-desc">Kotlin biên dịch qua bytecode và dex tới ART, Dart chạy JIT với hot reload khi dev và AOT ra native ARM khi release.</desc>
<defs>
<marker id="flutter-build-pipeline-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0, 8 3, 0 6" fill="#64748B"/>
</marker>
</defs>
<rect width="800" height="460" fill="#F8FAFC"/>
<!-- zones -->
<rect x="32" y="24" width="340" height="388" rx="8" fill="rgba(15,23,42,0.02)" stroke="rgba(15,23,42,0.10)" stroke-width="0.8"/>
<rect x="48" y="28" width="168" height="12" rx="2" fill="#F8FAFC"/>
<text x="132" y="37" fill="#94A3B8" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.14em">KOTLIN TRÊN ANDROID</text>
<rect x="428" y="24" width="340" height="388" rx="8" fill="rgba(15,23,42,0.02)" stroke="rgba(15,23,42,0.10)" stroke-width="0.8"/>
<rect x="444" y="28" width="152" height="12" rx="2" fill="#F8FAFC"/>
<text x="520" y="37" fill="#94A3B8" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.14em">DART TRÊN FLUTTER</text>
<!-- arrows -->
<path d="M 202,132 V 160" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#flutter-build-pipeline-arrow)"/>
<rect x="214" y="138" width="64" height="12" rx="2" fill="#F8FAFC"/>
<text x="246" y="147" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">KOTLINC</text>
<path d="M 202,216 V 248" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#flutter-build-pipeline-arrow)"/>
<rect x="214" y="226" width="64" height="12" rx="2" fill="#F8FAFC"/>
<text x="246" y="235" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">D8 / R8</text>
<path d="M 202,300 V 336" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#flutter-build-pipeline-arrow)"/>
<path d="M 598,136 V 200" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#flutter-build-pipeline-arrow)"/>
<rect x="548" y="158" width="64" height="12" rx="2" fill="#F8FAFC"/>
<text x="580" y="167" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">JIT DEV</text>
<path d="M 736,108 H 744 Q 752,108 752,116 V 320 Q 752,328 744,328 H 736" fill="none" stroke="#64748B" stroke-width="1.2" stroke-dasharray="4,3" marker-end="url(#flutter-build-pipeline-arrow)"/>
<rect x="684" y="272" width="72" height="12" rx="2" fill="#F8FAFC"/>
<text x="720" y="281" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">AOT RELEASE</text>
<!-- nodes -->
<rect x="64" y="80" width="276" height="52" rx="6" fill="#F8FAFC"/>
<rect x="64" y="80" width="276" height="52" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="202" y="111" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">.kt source</text>
<rect x="64" y="160" width="276" height="56" rx="6" fill="#F8FAFC"/>
<rect x="64" y="160" width="276" height="56" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="202" y="194" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">JVM Bytecode</text>
<rect x="64" y="248" width="276" height="52" rx="6" fill="#F8FAFC"/>
<rect x="64" y="248" width="276" height="52" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="202" y="279" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">.dex</text>
<rect x="64" y="336" width="276" height="52" rx="6" fill="#F8FAFC"/>
<rect x="64" y="336" width="276" height="52" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="202" y="367" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">ART Runtime</text>
<rect x="460" y="80" width="276" height="56" rx="6" fill="#F8FAFC"/>
<rect x="460" y="80" width="276" height="56" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="598" y="114" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">.dart source</text>
<rect x="460" y="200" width="276" height="64" rx="6" fill="#F8FAFC"/>
<rect x="460" y="200" width="276" height="64" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="598" y="234" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Dart VM + Hot Reload</text>
<rect x="460" y="296" width="276" height="64" rx="6" fill="#F8FAFC"/>
<rect x="460" y="296" width="276" height="64" rx="6" fill="rgba(2,132,199,0.08)" stroke="#0284C7" stroke-width="1.2"/>
<text x="598" y="330" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Native ARM Code</text>
<text x="598" y="344" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">AOT release</text>
<!-- legend -->
<line x1="32" y1="436" x2="768" y2="436" stroke="rgba(15,23,42,0.12)" stroke-width="0.8"/>
<text x="32" y="452" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" letter-spacing="0.14em">CHÚ GIẢI</text>
<circle cx="150" cy="448" r="4" fill="#0284C7"/>
<text x="162" y="452" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace">ĐÍCH RELEASE · NATIVE ARM</text>
<line x1="430" y1="448" x2="462" y2="448" stroke="#64748B" stroke-width="1.2" stroke-dasharray="4,3" marker-end="url(#flutter-build-pipeline-arrow)"/>
<text x="470" y="452" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace">NÉT ĐỨT · AOT RELEASE BUILD</text>
</svg>
</div>
</div>

<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body">App Flutter trên Android vẫn có một <code>Activity</code> (thường là <code>FlutterActivity</code>) chạy trên ART, vì đó là cửa vào bắt buộc của mọi app Android. Phần chạy trên ART chỉ là lớp embedder và plugin viết bằng Kotlin/Java; code Dart của bạn chạy trong Dart runtime của Flutter engine.</div></div>

<p>Hệ quả thực tế của mô hình này:</p>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Hệ quả</th>
      <th style="padding:8px 12px;text-align:left;">Vì sao</th>
      <th style="padding:8px 12px;text-align:left;">Việc cần làm</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Hot reload chỉ có ở debug</td>
      <td style="padding:8px 12px;">Cần Dart VM JIT để nạp lại kernel lúc chạy</td>
      <td style="padding:8px 12px;">Không mong hot reload trên bản profile/release</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Bản debug chậm, có thể giật</td>
      <td style="padding:8px 12px;">JIT, bật <code>assert</code>, bật service extension để debug</td>
      <td style="padding:8px 12px;">Đo hiệu năng bằng <code>flutter run --profile</code> trên máy thật</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Hot reload không chạy lại <code>main()</code>, <code>initState()</code>, initializer của biến global/static</td>
      <td style="padding:8px 12px;">Hot reload giữ state; các đoạn đó coi như đã chạy xong</td>
      <td style="padding:8px 12px;">Dùng hot restart khi sửa chúng</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Sửa code Kotlin/Swift cần full restart</td>
      <td style="padding:8px 12px;">Hot reload chỉ thay code Dart</td>
      <td style="padding:8px 12px;">Build lại app</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Không có reflection</td>
      <td style="padding:8px 12px;"><code>dart:mirrors</code> chỉ có trên native JIT, Flutter không hỗ trợ</td>
      <td style="padding:8px 12px;">Parse JSON, DI bằng codegen (<code>build_runner</code>) hoặc viết tay</td>
    </tr>
  </tbody>
</table>

<h4>Ví dụ: cùng một file chạy bằng JIT và AOT</h4>

<p><strong>Bài toán:</strong> kiểm chứng rằng cùng một source Dart có thể chạy bằng JIT hoặc biên dịch AOT, và AOT từ chối code dùng reflection. Dart SDK cho làm việc này ngay trên máy dev, không cần Flutter: <code>dart run</code> chạy JIT trên Dart VM, <code>dart compile exe</code> biên dịch AOT ra file thực thi native.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li><code>dart run</code> chạy file trên Dart VM bằng JIT, <code>assert</code> tắt mặc định.</li>
  <li><code>dart run --enable-asserts</code> vẫn JIT nhưng bật <code>assert</code>, giống cách Flutter debug mode bật assert.</li>
  <li><code>dart compile exe</code> biên dịch AOT ra file native; chạy file đó thì hằng <code>dart.vm.product</code> là <code>true</code> (hằng <code>kReleaseMode</code> của Flutter được định nghĩa từ chính hằng này).</li>
  <li>Biên dịch AOT một file import <code>dart:mirrors</code> thì thất bại ngay lúc biên dịch.</li>
</ol>

<div class="mermaid">
flowchart LR
    SRC["runtime_mode.dart"] --&gt;|"(1) dart run"| JIT["Dart VM JIT, assert tắt"]
    SRC --&gt;|"(2) dart run --enable-asserts"| JITA["Dart VM JIT, assert bật"]
    SRC --&gt;|"(3) dart compile exe"| AOT["File native: AOT"]
    MIR["mirrors_check.dart"] --&gt;|"(4) dart compile exe"| ERR["Lỗi: dart:mirrors không có"]
</div>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// runtime_mode.dart
void main() {
  // (3) true chỉ khi chạy bản AOT product (dart compile exe)
  const isProduct = bool.fromEnvironment('dart.vm.product');
  print(isProduct ? 'Chạy AOT: mã máy native' : 'Chạy JIT trên Dart VM');

  // (1)(2) Phép gán trong assert chỉ chạy khi assert được bật
  var assertsOn = false;
  assert(assertsOn = true);
  print('assert: \${assertsOn ? 'bật' : 'tắt'}');
}</code></pre>

<pre data-lang="dart"><code>// mirrors_check.dart — (4) dùng reflection để đọc tên class lúc runtime
import 'dart:mirrors';

class Product {
  Product(this.name);
  final String name;
}

void main() {
  final mirror = reflect(Product('Bàn phím'));
  print(mirror.type.simpleName);
}</code></pre>

<pre data-lang="bash"><code>dart run runtime_mode.dart                     # (1)
dart run --enable-asserts runtime_mode.dart    # (2)
dart compile exe runtime_mode.dart -o runtime_mode &amp;&amp; ./runtime_mode   # (3)
dart run mirrors_check.dart                    # chạy được vì đây là JIT
dart compile exe mirrors_check.dart -o mirrors_check                   # (4)</code></pre>

<p><strong>Kết quả</strong> (Dart 3.12, macOS; lược dòng "Generated: …" của <code>dart compile</code> và hai dòng trích source trong thông báo lỗi):</p>

<pre data-lang="text"><code>Chạy JIT trên Dart VM
assert: tắt
Chạy JIT trên Dart VM
assert: bật
Chạy AOT: mã máy native
assert: tắt
Symbol("Product")
mirrors_check.dart:2:8: Error: Dart library 'dart:mirrors' is not available on this platform.
Error: AOT compilation failed
Bad state: Generating AOT kernel dill failed!</code></pre>

<p>Sáu dòng đầu cho thấy cùng một source, khác cách chạy. Các dòng lỗi cuối là lý do mọi thư viện Flutter phải dùng codegen thay cho reflection: bản release luôn là AOT.</p>

<h3>Concurrency: từ thread chia sẻ memory sang event loop và isolate</h3>

<p>Trong Kotlin, coroutine chạy trên dispatcher (<code>Dispatchers.Main</code> là main thread, <code>IO</code> và <code>Default</code> là thread pool), mọi thread dùng chung một heap nên cần <code>Mutex</code> hoặc <code>synchronized</code> khi hai coroutine cùng sửa một object.</p>

<p>Dart không cho code của bạn chạy song song trên cùng một vùng nhớ. Mọi code Dart chạy trong một <strong>isolate</strong>: heap riêng và <strong>một thread chạy event loop</strong> (vòng lặp lấy từng việc trong hàng đợi ra chạy cho tới hết). Code Flutter của bạn chạy trong main isolate; từ Flutter 3.29, trên Android và iOS main isolate chạy ngay trên main thread của app. Ba tư duy phải đổi:</p>

<ol>
  <li><strong>IO chỉ cần <code>await</code>.</strong> Request mạng, đọc file được thực hiện bên ngoài event loop; <code>await</code> nhường event loop cho việc khác. Không cần tương đương <code>withContext(Dispatchers.IO)</code>. Cơ chế ở <a href="../async/futures_async_await.md" target="_blank" rel="noopener">1.3.1 Futures and Async/Await</a>.</li>
  <li><strong>Việc nặng CPU phải ra isolate khác.</strong> Một vòng lặp đồng bộ chiếm event loop tới khi xong, trong lúc đó không frame nào được vẽ; đánh dấu hàm là <code>async</code> không thay đổi điều này. <code>Isolate.run</code> (hoặc <code>compute</code> của Flutter) chạy việc đó ở isolate khác (<a href="../async/isolates.md" target="_blank" rel="noopener">1.3.3 Isolates</a>).</li>
  <li><strong>Không chia sẻ memory.</strong> Dữ liệu gửi giữa các isolate được copy (một số trường hợp được chuyển giao không copy), kết quả gửi về bằng message. Không có biến chung nên hầu như không cần lock, đổi lại phải trả chi phí copy.</li>
</ol>

<div class="dd-diagram" data-dd="flutter-threads-isolates">
<div class="dd-svg dd-svg-dark">
<svg viewBox="0 0 800 440" role="img" aria-labelledby="flutter-threads-isolates-dark-title flutter-threads-isolates-dark-desc" font-family="'Geist', sans-serif">
<title id="flutter-threads-isolates-dark-title">Một vòng lặp, nhiều isolate</title>
<desc id="flutter-threads-isolates-dark-desc">Kotlin coroutine nhiều thread chia sẻ memory, Dart async một event loop và việc nặng tách sang isolate riêng.</desc>
<defs>
<marker id="flutter-threads-isolates-dark-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0, 8 3, 0 6" fill="#94A3B8"/>
</marker>
</defs>
<rect width="800" height="440" fill="#060913"/>
<!-- zones -->
<rect x="32" y="24" width="340" height="368" rx="8" fill="rgba(248,250,252,0.02)" stroke="rgba(248,250,252,0.10)" stroke-width="0.8"/>
<rect x="48" y="28" width="136" height="12" rx="2" fill="#060913"/>
<text x="116" y="37" fill="#64748B" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.14em">KOTLIN · MULTI-THREADED</text>
<rect x="428" y="24" width="340" height="368" rx="8" fill="rgba(248,250,252,0.02)" stroke="rgba(248,250,252,0.10)" stroke-width="0.8"/>
<rect x="444" y="28" width="152" height="12" rx="2" fill="#060913"/>
<text x="520" y="37" fill="#64748B" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.14em">DART · EVENT LOOP + ISOLATES</text>
<!-- arrows -->
<path d="M 202,132 V 156" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#flutter-threads-isolates-dark-arrow)"/>
<path d="M 202,208 V 232" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#flutter-threads-isolates-dark-arrow)"/>
<path d="M 202,288 V 312" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#flutter-threads-isolates-dark-arrow)"/>
<path d="M 598,132 V 156" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#flutter-threads-isolates-dark-arrow)"/>
<path d="M 598,208 V 236" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#flutter-threads-isolates-dark-arrow)"/>
<path d="M 598,292 V 316" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#flutter-threads-isolates-dark-arrow)"/>
<!-- nodes -->
<rect x="64" y="80" width="276" height="52" rx="6" fill="#060913"/>
<rect x="64" y="80" width="276" height="52" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="202" y="111" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">suspend fun</text>
<rect x="64" y="156" width="276" height="52" rx="6" fill="#060913"/>
<rect x="64" y="156" width="276" height="52" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="202" y="187" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">CoroutineScope</text>
<rect x="64" y="232" width="276" height="56" rx="6" fill="#060913"/>
<rect x="64" y="232" width="276" height="56" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="202" y="266" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Dispatchers.Main / IO / Default</text>
<rect x="64" y="312" width="276" height="56" rx="6" fill="#060913"/>
<rect x="64" y="312" width="276" height="56" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="202" y="346" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Nhiều thread chia sẻ memory</text>
<rect x="460" y="80" width="276" height="52" rx="6" fill="#060913"/>
<rect x="460" y="80" width="276" height="52" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="598" y="111" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">async fun</text>
<rect x="460" y="156" width="276" height="52" rx="6" fill="#060913"/>
<rect x="460" y="156" width="276" height="52" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="598" y="187" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Event Loop main isolate</text>
<rect x="460" y="236" width="276" height="56" rx="6" fill="#060913"/>
<rect x="460" y="236" width="276" height="56" rx="6" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="1.2"/>
<text x="598" y="270" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">CPU-heavy → Isolate.run()</text>
<rect x="460" y="316" width="276" height="56" rx="6" fill="#060913"/>
<rect x="460" y="316" width="276" height="56" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="598" y="350" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Isolate riêng · message passing</text>
<!-- legend -->
<line x1="32" y1="416" x2="768" y2="416" stroke="rgba(248,250,252,0.12)" stroke-width="0.8"/>
<text x="32" y="432" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" letter-spacing="0.14em">CHÚ GIẢI</text>
<circle cx="150" cy="428" r="4" fill="#38BDF8"/>
<text x="162" y="432" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace">THOÁT NẶNG · ISOLATE.RUN()</text>
<line x1="430" y1="428" x2="462" y2="428" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#flutter-threads-isolates-dark-arrow)"/>
<text x="470" y="432" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace">CHUYỂN TẦNG THỰC THI</text>
</svg>
</div>
<div class="dd-svg dd-svg-light">
<svg viewBox="0 0 800 440" role="img" aria-labelledby="flutter-threads-isolates-title flutter-threads-isolates-desc" font-family="'Geist', sans-serif">
<title id="flutter-threads-isolates-title">Một vòng lặp, nhiều isolate</title>
<desc id="flutter-threads-isolates-desc">Kotlin coroutine nhiều thread chia sẻ memory, Dart async một event loop và việc nặng tách sang isolate riêng.</desc>
<defs>
<marker id="flutter-threads-isolates-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0, 8 3, 0 6" fill="#64748B"/>
</marker>
</defs>
<rect width="800" height="440" fill="#F8FAFC"/>
<!-- zones -->
<rect x="32" y="24" width="340" height="368" rx="8" fill="rgba(15,23,42,0.02)" stroke="rgba(15,23,42,0.10)" stroke-width="0.8"/>
<rect x="48" y="28" width="136" height="12" rx="2" fill="#F8FAFC"/>
<text x="116" y="37" fill="#94A3B8" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.14em">KOTLIN · MULTI-THREADED</text>
<rect x="428" y="24" width="340" height="368" rx="8" fill="rgba(15,23,42,0.02)" stroke="rgba(15,23,42,0.10)" stroke-width="0.8"/>
<rect x="444" y="28" width="152" height="12" rx="2" fill="#F8FAFC"/>
<text x="520" y="37" fill="#94A3B8" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.14em">DART · EVENT LOOP + ISOLATES</text>
<!-- arrows -->
<path d="M 202,132 V 156" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#flutter-threads-isolates-arrow)"/>
<path d="M 202,208 V 232" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#flutter-threads-isolates-arrow)"/>
<path d="M 202,288 V 312" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#flutter-threads-isolates-arrow)"/>
<path d="M 598,132 V 156" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#flutter-threads-isolates-arrow)"/>
<path d="M 598,208 V 236" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#flutter-threads-isolates-arrow)"/>
<path d="M 598,292 V 316" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#flutter-threads-isolates-arrow)"/>
<!-- nodes -->
<rect x="64" y="80" width="276" height="52" rx="6" fill="#F8FAFC"/>
<rect x="64" y="80" width="276" height="52" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="202" y="111" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">suspend fun</text>
<rect x="64" y="156" width="276" height="52" rx="6" fill="#F8FAFC"/>
<rect x="64" y="156" width="276" height="52" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="202" y="187" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">CoroutineScope</text>
<rect x="64" y="232" width="276" height="56" rx="6" fill="#F8FAFC"/>
<rect x="64" y="232" width="276" height="56" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="202" y="266" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Dispatchers.Main / IO / Default</text>
<rect x="64" y="312" width="276" height="56" rx="6" fill="#F8FAFC"/>
<rect x="64" y="312" width="276" height="56" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="202" y="346" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Nhiều thread chia sẻ memory</text>
<rect x="460" y="80" width="276" height="52" rx="6" fill="#F8FAFC"/>
<rect x="460" y="80" width="276" height="52" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="598" y="111" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">async fun</text>
<rect x="460" y="156" width="276" height="52" rx="6" fill="#F8FAFC"/>
<rect x="460" y="156" width="276" height="52" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="598" y="187" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Event Loop main isolate</text>
<rect x="460" y="236" width="276" height="56" rx="6" fill="#F8FAFC"/>
<rect x="460" y="236" width="276" height="56" rx="6" fill="rgba(2,132,199,0.08)" stroke="#0284C7" stroke-width="1.2"/>
<text x="598" y="270" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">CPU-heavy → Isolate.run()</text>
<rect x="460" y="316" width="276" height="56" rx="6" fill="#F8FAFC"/>
<rect x="460" y="316" width="276" height="56" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="598" y="350" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Isolate riêng · message passing</text>
<!-- legend -->
<line x1="32" y1="416" x2="768" y2="416" stroke="rgba(15,23,42,0.12)" stroke-width="0.8"/>
<text x="32" y="432" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" letter-spacing="0.14em">CHÚ GIẢI</text>
<circle cx="150" cy="428" r="4" fill="#0284C7"/>
<text x="162" y="432" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace">THOÁT NẶNG · ISOLATE.RUN()</text>
<line x1="430" y1="428" x2="462" y2="428" stroke="#64748B" stroke-width="1.2" marker-end="url(#flutter-threads-isolates-arrow)"/>
<text x="470" y="432" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace">CHUYỂN TẦNG THỰC THI</text>
</svg>
</div>
</div>

<p>Thêm một khác biệt ít được nhắc: Dart không có structured concurrency. Không có scope nào tự hủy các <code>Future</code> con khi màn hình đóng; <code>Future</code> không hủy được, còn <code>Stream</code> thì dừng nghe bằng <code>StreamSubscription.cancel()</code> (<a href="../async/streams.md" target="_blank" rel="noopener">1.3.2 Streams</a>).</p>

<h3>Hệ sinh thái: pubspec, pub và dart CLI</h3>

<p>Phần này ở mức nhận biết, đủ để đọc một project Dart/Flutter; chi tiết ở 2.1.1 Flutter CLI and FVM (chưa có bài) và 2.2.1 pub.dev and Package Management (chưa có bài).</p>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Vai trò</th>
      <th style="padding:8px 12px;text-align:left;">Kotlin/Android</th>
      <th style="padding:8px 12px;text-align:left;">Dart/Flutter</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">File khai báo project và dependency</td>
      <td style="padding:8px 12px;"><code>build.gradle.kts</code>, <code>libs.versions.toml</code></td>
      <td style="padding:8px 12px;"><code>pubspec.yaml</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Kho package</td>
      <td style="padding:8px 12px;">Maven Central, Google Maven</td>
      <td style="padding:8px 12px;">pub.dev</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Khoá version đã resolve</td>
      <td style="padding:8px 12px;">Gradle lockfile (tuỳ chọn)</td>
      <td style="padding:8px 12px;"><code>pubspec.lock</code> (sinh tự động)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Cấu hình lint</td>
      <td style="padding:8px 12px;">detekt, Android Lint config</td>
      <td style="padding:8px 12px;"><code>analysis_options.yaml</code></td>
    </tr>
  </tbody>
</table>

<p>Khác Gradle, pub không phải hệ thống build có task và plugin; nó chỉ resolve và tải package. <code>dart pub get</code> ghi version chính xác vào <code>pubspec.lock</code>, lưu package vào pub cache dùng chung trên máy, và tạo <code>.dart_tool/package_config.json</code> chỉ cho compiler biết mỗi package nằm ở đâu. Project là ứng dụng thì nên commit <code>pubspec.lock</code>.</p>

<p><code>pubspec.yaml</code> do <code>dart create -t console price_tool</code> sinh ra, sau khi chạy <code>dart pub add collection</code> (đã bỏ comment mẫu, thêm chú thích):</p>

<pre data-lang="yaml"><code># pubspec.yaml
name: price_tool
description: A sample command-line application.
version: 1.0.0

environment:
  sdk: ^3.12.0 # Dart tối thiểu 3.12, dưới 4.0; cũng quyết định tính năng ngôn ngữ được bật

dependencies:
  collection: ^1.19.1 # ^ cho phép bản minor/patch mới hơn, giữ nguyên major
  path: ^1.9.0

dev_dependencies:
  lints: ^6.0.0
  test: ^1.25.6</code></pre>

<p>Lệnh tương đương cần nhớ:</p>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Việc</th>
      <th style="padding:8px 12px;text-align:left;">Kotlin/Android</th>
      <th style="padding:8px 12px;text-align:left;">Dart</th>
      <th style="padding:8px 12px;text-align:left;">Flutter</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Tạo project</td>
      <td style="padding:8px 12px;">Android Studio wizard</td>
      <td style="padding:8px 12px;"><code>dart create</code></td>
      <td style="padding:8px 12px;"><code>flutter create</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Thêm dependency</td>
      <td style="padding:8px 12px;">sửa <code>build.gradle.kts</code></td>
      <td style="padding:8px 12px;"><code>dart pub add &lt;package&gt;</code></td>
      <td style="padding:8px 12px;"><code>flutter pub add &lt;package&gt;</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Tải dependency</td>
      <td style="padding:8px 12px;">Gradle sync</td>
      <td style="padding:8px 12px;"><code>dart pub get</code></td>
      <td style="padding:8px 12px;"><code>flutter pub get</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Chạy</td>
      <td style="padding:8px 12px;"><code>./gradlew installDebug</code></td>
      <td style="padding:8px 12px;"><code>dart run</code></td>
      <td style="padding:8px 12px;"><code>flutter run</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Test</td>
      <td style="padding:8px 12px;"><code>./gradlew test</code></td>
      <td style="padding:8px 12px;"><code>dart test</code></td>
      <td style="padding:8px 12px;"><code>flutter test</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Phân tích tĩnh, format</td>
      <td style="padding:8px 12px;"><code>./gradlew lint</code>, ktlint</td>
      <td style="padding:8px 12px;"><code>dart analyze</code>, <code>dart format</code></td>
      <td style="padding:8px 12px;"><code>flutter analyze</code>, <code>dart format</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Sinh code</td>
      <td style="padding:8px 12px;">KSP chạy cùng build</td>
      <td style="padding:8px 12px;"><code>dart run build_runner build</code></td>
      <td style="padding:8px 12px;">như Dart</td>
    </tr>
  </tbody>
</table>

<p>Trong project Flutter, dùng lệnh <code>flutter</code> để chắc chắn dùng đúng Dart SDK đi kèm Flutter SDK.</p>

<h2>Ví dụ thực tế</h2>

<h3>Dịch một đoạn checkout từ Kotlin sang Dart</h3>

<p><strong>Bài toán:</strong> một đoạn Kotlin quen thuộc (giỏ hàng, tổng tiền có giảm giá, kết quả đặt hàng dạng sealed) cần chuyển sang Dart. Đây là việc Kotlin developer làm nhiều nhất trong tuần đầu, và nó chạm vào gần đủ bảy cặp khái niệm.</p>

<p>Bản Kotlin:</p>

<pre data-lang="kotlin"><code>// Checkout.kt
data class CartItem(val sku: String, val price: Long, val quantity: Int = 1)

sealed interface CheckoutResult {
    data class Success(val orderId: String) : CheckoutResult
    data class Failed(val reason: String) : CheckoutResult
}

fun totalOf(items: List&lt;CartItem&gt;, discount: Long = 0): Long =
    items.sumOf { it.price * it.quantity } - discount

fun checkout(items: List&lt;CartItem&gt;): CheckoutResult =
    if (items.isEmpty()) CheckoutResult.Failed("Giỏ hàng trống")
    else CheckoutResult.Success("ORD-\${items.size}-\${totalOf(items)}")

fun messageOf(result: CheckoutResult): String = when (result) {
    is CheckoutResult.Success -&gt; "Đặt hàng thành công: \${result.orderId}"
    is CheckoutResult.Failed -&gt; "Không đặt được: \${result.reason}"
}</code></pre>

<p><strong>Luồng dịch:</strong> mỗi construct Kotlin được tra trong bảng ánh xạ, rồi xử lý theo nhóm của nó.</p>

<ol>
  <li><code>data class CartItem</code> thuộc nhóm ✗: viết class với field <code>final</code>, named parameter, tự viết <code>==</code> và <code>hashCode</code>.</li>
  <li><code>sealed interface</code> + <code>data class</code> con: dùng <code>sealed class</code> và subclass trong cùng file (cùng library).</li>
  <li>Tham số mặc định <code>discount</code> thành named parameter có default; <code>sumOf { it… }</code> thành <code>fold</code> với tham số lambda đặt tên.</li>
  <li><code>when</code> với <code>is</code> thành <code>switch</code> expression với object pattern; compiler vẫn kiểm tra đủ nhánh.</li>
  <li>Kiểm tra false friend: list literal của Dart sửa được dù biến là <code>final</code>.</li>
  <li>Kiểm tra <code>==</code>: so theo giá trị nhờ bước (1); <code>identical</code> thay cho <code>===</code>.</li>
</ol>

<div class="mermaid">
flowchart LR
    A["data class CartItem"] --&gt;|"(1)"| A2["class + == / hashCode"]
    B["sealed interface"] --&gt;|"(2)"| B2["sealed class, cùng library"]
    C["discount: Long = 0, sumOf"] --&gt;|"(3)"| C2["named param, fold"]
    D["when + is"] --&gt;|"(4)"| D2["switch expression + pattern"]
    E["listOf (read-only)"] --&gt;|"(5)"| E2["list literal mutable"]
    F["== và ==="] --&gt;|"(6)"| F2["== và identical"]
</div>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// checkout.dart — bản Dart của đoạn Kotlin CartItem / CheckoutResult
// (1) data class CartItem -&gt; class có ==/hashCode tự viết (Dart không có data class)
class CartItem {
  const CartItem({required this.sku, required this.price, this.quantity = 1});

  final String sku;
  final int price; // Kotlin Long -&gt; Dart int (64-bit trên native)
  final int quantity;

  @override
  bool operator ==(Object other) =&gt;
      other is CartItem &amp;&amp;
      other.sku == sku &amp;&amp;
      other.price == price &amp;&amp;
      other.quantity == quantity;

  @override
  int get hashCode =&gt; Object.hash(sku, price, quantity);
}

// (2) sealed interface + data class con -&gt; sealed class + subclass cùng library
sealed class CheckoutResult {}

class CheckoutSuccess extends CheckoutResult {
  CheckoutSuccess(this.orderId);
  final String orderId;
}

class CheckoutFailed extends CheckoutResult {
  CheckoutFailed(this.reason);
  final String reason;
}

// (3) Tham số mặc định Kotlin -&gt; named parameter có default; sumOf -&gt; fold
int totalOf(List&lt;CartItem&gt; items, {int discount = 0}) =&gt;
    items.fold(0, (sum, item) =&gt; sum + item.price * item.quantity) - discount;

CheckoutResult checkout(List&lt;CartItem&gt; items) =&gt; items.isEmpty
    ? CheckoutFailed('Giỏ hàng trống')
    : CheckoutSuccess('ORD-\${items.length}-\${totalOf(items)}');

// (4) when (r) { is ... } -&gt; switch expression, compiler kiểm tra đủ nhánh
String messageOf(CheckoutResult result) =&gt; switch (result) {
      CheckoutSuccess(:final orderId) =&gt; 'Đặt hàng thành công: $orderId',
      CheckoutFailed(:final reason) =&gt; 'Không đặt được: $reason',
    };

void main() {
  final cart = [
    const CartItem(sku: 'KB-01', price: 890_000),
    const CartItem(sku: 'MS-02', price: 350_000, quantity: 2),
  ];

  // (5) Bẫy false friend: final chỉ khoá biến, list vẫn thêm được phần tử
  cart.add(const CartItem(sku: 'PAD-03', price: 120_000));

  print(totalOf(cart, discount: 100_000));
  print(messageOf(checkout(cart)));
  print(messageOf(checkout([])));

  // (6) == so theo giá trị nhờ operator == ở bước (1); identical so reference như ===
  final sameItem = CartItem(sku: 'KB-01', price: 890_000);
  print('\${sameItem == cart.first} \${identical(sameItem, cart.first)}');
}</code></pre>

<p><strong>Kết quả</strong> (<code>dart run checkout.dart</code>, Dart 3.12, <code>dart analyze</code> không báo lỗi):</p>

<pre data-lang="text"><code>1610000
Đặt hàng thành công: ORD-3-1710000
Không đặt được: Giỏ hàng trống
true false</code></pre>

<p>Dòng 4 xác nhận <code>==</code> tự viết hoạt động; bỏ <code>operator ==</code> và <code>hashCode</code> ở bước (1) thì dòng này thành <code>false false</code>. Thêm một subclass thứ ba cho <code>CheckoutResult</code> mà không sửa <code>messageOf</code> thì <code>dart analyze</code> báo <code>non_exhaustive_switch_expression</code>, giống <code>when</code> của Kotlin báo thiếu nhánh. Dấu <code>_</code> trong <code>890_000</code> là digit separator (Dart 3.6), giống Kotlin. Trong project thật, model nhiều field thường dùng Freezed để sinh <code>==</code>, <code>hashCode</code>, <code>copyWith</code> (<a href="classes_mixins_sealed.md" target="_blank" rel="noopener">1.2.5</a>).</p>

<h3>Dịch ViewModel và parse JSON</h3>

<p>Hai việc dịch hay gặp tiếp theo không dịch từng dòng được, chỉ cần biết hướng:</p>

<ul>
  <li><strong>ViewModel dùng <code>MutableStateFlow</code> + <code>viewModelScope.launch</code></strong> thường thành class kế thừa <code>ChangeNotifier</code> (hoặc giữ <code>ValueNotifier</code>) với <code>Future&lt;void&gt; load() async</code> gọi <code>notifyListeners()</code>. Không có <code>viewModelScope</code> tự hủy việc đang chạy, nên phải kiểm tra object còn được dùng trước khi cập nhật state. Học ở 4.1.1 ChangeNotifier and ValueNotifier (chưa có bài).</li>
  <li><strong>Parse JSON bằng Gson/Moshi reflection</strong> thành <code>factory Product.fromJson(Map&lt;String, dynamic&gt; json)</code> viết tay hoặc <code>json_serializable</code> sinh bằng <code>build_runner</code>; JSON lớn thì parse trong <code>Isolate.run</code> (<a href="../async/isolates.md" target="_blank" rel="noopener">1.3.3</a>). Học ở 5.1.2 JSON Serialization and Codegen (chưa có bài).</li>
</ul>

<h2>Khi nào nên và không nên dùng</h2>

<p>Nên dùng bản đồ này khi:</p>

<ul>
  <li><strong>Đọc hoặc review code Dart lần đầu</strong>: gặp construct lạ thì tra nhóm của nó trước khi đoán nghĩa theo Kotlin.</li>
  <li><strong>Port logic thuần</strong> (model, tính toán, validate): phần lớn construct thuộc nhóm "=" và dịch thẳng.</li>
  <li><strong>Lên kế hoạch học</strong>: các dòng "≈" và "✗" là danh sách mục phải đọc kỹ trong 1.2.x và 1.3.x.</li>
</ul>

<p>Không nên dùng khi:</p>

<ul>
  <li><strong>Port kiến trúc</strong>: ViewModel, Hilt, Room, <code>Dispatchers</code> không dịch từng dòng được; kiến trúc Flutter đi theo cây widget và state management riêng (Session 04, Session 08).</li>
  <li><strong>Thay cho việc học Topic</strong>: bảng chỉ cho biết có khác biệt, không giải thích cơ chế.</li>
  <li><strong>Tìm bản Dart cho mọi idiom Kotlin</strong>: scope function (<code>let</code>, <code>also</code>, <code>run</code>), property delegation hay <code>it</code> không có tương đương. Viết theo cách Dart (biến local, cascade, tham số lambda đặt tên) thay vì dựng lại idiom Kotlin bằng extension.</li>
</ul>

<h2>Sai lầm thường gặp</h2>

<p>Mỗi mục là một false friend hoặc một chỗ không có tương đương; cơ chế nằm ở Topic được link.</p>

<h3>1. Tin <code>final</code> là bất biến</h3>

<p><code>final cart = [...]</code> vẫn <code>add</code>, <code>remove</code>, <code>sort</code> được. Muốn không sửa được thì dùng <code>const [...]</code> hoặc <code>List.unmodifiable(...)</code>. Xem <a href="collections_functional.md" target="_blank" rel="noopener">1.2.4</a>.</p>

<h3>2. Quên <code>required</code> ở named parameter</h3>

<pre data-lang="dart"><code>void sendInvoice({String? email, bool includePdf = false}) {}

void main() =&gt; sendInvoice(includePdf: true); // biên dịch được: email bị bỏ qua, nhận null</code></pre>

<p>Kotlin buộc truyền tham số không có default; Dart coi named parameter là tuỳ chọn trừ khi có <code>required</code>. Xem <a href="functions_operators.md" target="_blank" rel="noopener">1.2.2</a>.</p>

<h3>3. So sánh model bằng <code>==</code> khi không có data class</h3>

<p>Class Dart không tự sinh <code>==</code>, nên <code>Set</code> chứa phần tử trùng và phép so state để tránh cập nhật thừa không hoạt động. Dùng record, tự viết <code>==</code>/<code>hashCode</code>, hoặc Freezed. Xem <a href="classes_mixins_sealed.md" target="_blank" rel="noopener">1.2.5</a>.</p>

<h3>4. Mong smart cast trên field</h3>

<p><code>if (order.note != null) print(order.note.length);</code> không biên dịch được khi <code>note</code> là field public, vì getter có thể trả giá trị khác ở lần đọc thứ hai. Gán ra biến local trước. Xem <a href="variables_and_types.md" target="_blank" rel="noopener">1.2.1</a>.</p>

<h3>5. Chạy tính toán nặng trên main isolate</h3>

<p>Hàm <code>async</code> vẫn chạy trên event loop; vòng lặp đồng bộ trong đó vẫn chặn mọi frame. Dùng <code>Isolate.run</code>/<code>compute</code>. Xem <a href="../async/futures_async_await.md" target="_blank" rel="noopener">1.3.1</a>, <a href="../async/isolates.md" target="_blank" rel="noopener">1.3.3</a>.</p>

<h3>6. Listen một <code>Stream</code> hai lần</h3>

<p><code>Stream</code> từ <code>StreamController()</code> hoặc <code>async*</code> là single-subscription: lần <code>listen</code> thứ hai ném <code>StateError</code>, khác <code>Flow</code> collect bao nhiêu lần cũng được. Xem <a href="../async/streams.md" target="_blank" rel="noopener">1.3.2</a>.</p>

<h3>7. Gọi <code>Future</code> mà không <code>await</code> rồi mất lỗi</h3>

<p>Giống <code>launch</code> không có <code>CoroutineExceptionHandler</code>: lỗi của <code>Future</code> không ai <code>await</code> không về khối <code>try</code> của bạn. Xem <a href="../async/futures_async_await.md" target="_blank" rel="noopener">1.3.1</a>.</p>

<h3>8. Đo hiệu năng trên bản debug</h3>

<p>Bản debug chạy JIT, bật assert và công cụ debug nên giật hơn release nhiều. Đo bằng <code>flutter run --profile</code> trên thiết bị thật (emulator và simulator không chạy profile mode).</p>

<h3>9. Sửa initializer của biến global rồi hot reload</h3>

<pre data-lang="dart"><code>// Sửa chuỗi này rồi hot reload: app vẫn dùng giá trị cũ
final apiBaseUrl = 'https://staging.example.com';</code></pre>

<p>Biến global và static được coi là state nên hot reload không khởi tạo lại; <code>main()</code> và <code>initState()</code> cũng không chạy lại. Dùng hot restart, hoặc đổi thành <code>const</code>/getter.</p>

<h3>10. Dùng <code>it</code> và trailing lambda theo thói quen</h3>

<p><code>items.map { it.price }</code> không phải cú pháp Dart; viết <code>items.map((item) =&gt; item.price)</code> hoặc tear-off. Xem <a href="functions_operators.md" target="_blank" rel="noopener">1.2.2</a>.</p>

<h2>Lịch sử phát triển</h2>

<p>Dart tiến dần về phía Kotlin qua từng bản lớn, nên các bài "Dart cho Kotlin developer" cũ có thể đã lỗi thời:</p>

<ul>
  <li><strong>2011–2013, Dart 1.x</strong>: Google giới thiệu Dart năm 2011 cho web; Dart 1.0 ra tháng 11/2013. Kiểu dữ liệu khi đó là tuỳ chọn và không sound.</li>
  <li><strong>2018, Dart 2.0</strong>: bắt buộc <strong>sound type system</strong>. Kiểu được đảm bảo đúng nên compiler AOT tối ưu được; đây là nền cho Flutter 1.0 (12/2018) biên dịch AOT ra mã máy.</li>
  <li><strong>2019, Dart 2.3 và 2.7</strong>: collection <code>if</code>/<code>for</code> và spread (2.3) để viết cây widget gọn hơn, nên Dart có mà Kotlin không; extension methods (2.7).</li>
  <li><strong>2021, Dart 2.12</strong>: <strong>sound null safety</strong>, kiểu non-null mặc định như Kotlin.</li>
  <li><strong>2022, Dart 2.17</strong>: enhanced enum, super parameters, named argument đặt xen kẽ positional.</li>
  <li><strong>2023, Dart 2.19 và 3.0</strong>: <code>Isolate.run</code> (2.19). Dart 3.0 thêm records, patterns, <code>switch</code> expression, class modifiers và bắt buộc 100% null safety, đưa <code>when</code> + <code>sealed class</code> + destructuring kiểu Kotlin sang Dart.</li>
  <li><strong>2023–2024, Dart 3.2 và 3.3</strong>: promotion cho private final field (3.2); extension types (3.3), gần với <code>value class</code>.</li>
  <li><strong>2025</strong>: ngày 29/1, nhóm Dart dừng dự án macros, nên codegen bằng <code>build_runner</code> vẫn là cách chính thay cho reflection. Flutter 3.29 chạy code Dart trên main thread của app trên Android và iOS. Dart 3.8 thêm null-aware element, Dart 3.10 thêm dot shorthands.</li>
  <li><strong>2026, Dart 3.12 và 3.13</strong>: private named parameter (3.12); <strong>primary constructor</strong> stable ở Dart 3.13 (8/2026), ví dụ <code>class Point(final int x, final int y);</code>. Nó gần primary constructor của Kotlin nhưng không sinh <code>==</code>. Ví dụ trong bài chạy trên Dart 3.12 nên dùng constructor truyền thống.</li>
</ul>

<h2>Kết nối hệ thống</h2>

<ul>
  <li><strong>Kiến thức nền</strong>: Kotlin trên Android. Chuỗi <code>kotlinc</code> → <code>.class</code> → D8/R8 → <code>.dex</code> → ART được giải thích ở <a href="../../../../knowledge/android/docs/session_01/languages/kotlin.md" target="_blank" rel="noopener">Android 1.1.2 Kotlin</a>.</li>
  <li><strong>Vị trí trong Session</strong>: bài mở đầu của <a href="../index.md" target="_blank" rel="noopener">Session 01: Dart Foundations</a>. Bảng ánh xạ là mục lục ngược cho các Topic:
<ul>
  <li><a href="variables_and_types.md" target="_blank" rel="noopener">1.2.1 Variables and Types</a>, <a href="functions_operators.md" target="_blank" rel="noopener">1.2.2 Functions and Operators</a>, <a href="control_flow_patterns.md" target="_blank" rel="noopener">1.2.3 Control Flow and Patterns</a>, <a href="collections_functional.md" target="_blank" rel="noopener">1.2.4 Collections and Functional APIs</a>, <a href="classes_mixins_sealed.md" target="_blank" rel="noopener">1.2.5 Classes, Mixins and Sealed Types</a>.</li>
  <li><a href="../async/futures_async_await.md" target="_blank" rel="noopener">1.3.1 Futures and Async/Await</a>, <a href="../async/streams.md" target="_blank" rel="noopener">1.3.2 Streams</a>, <a href="../async/isolates.md" target="_blank" rel="noopener">1.3.3 Isolates</a>.</li>
</ul></li>
  <li><strong>Học tiếp</strong>: 1.2.1 theo thứ tự mục lục. Hệ sinh thái mở rộng ở 2.1.1 Flutter CLI and FVM (chưa có bài) và 2.2.1 pub.dev and Package Management (chưa có bài); đo hiệu năng đúng ở 2.2.2 DevTools and Debugging (chưa có bài) và 10.2.1 Memory Management and Profiling (chưa có bài).</li>
</ul>

<h2>Developer Curiosity Checklist</h2>

<p>Bài 1 chạy được bằng <code>dart run</code> (hoặc DartPad); bài 2–3 là câu hỏi dịch và giải thích. Đáp án ngắn ngay dưới; cơ chế đầy đủ ở Topic được link.</p>

<ol>
  <li><strong><code>final</code> và <code>const</code>.</strong> Tạo <code>final tags = ['a'];</code> rồi <code>tags.add('b')</code>; tạo <code>const fixed = ['a'];</code> rồi <code>fixed.add('b')</code>. Lệnh nào lỗi, lúc compile hay lúc chạy?
<ul>
  <li><em>Đáp án:</em> <code>tags.add</code> chạy bình thường. <code>fixed.add</code> biên dịch được nhưng ném <code>UnsupportedError</code> lúc chạy, vì kiểu tĩnh vẫn là <code>List&lt;String&gt;</code>. Xem <a href="variables_and_types.md" target="_blank" rel="noopener">1.2.1</a>, <a href="collections_functional.md" target="_blank" rel="noopener">1.2.4</a>.</li>
</ul></li>
  <li><strong>Coroutine → Dart.</strong> Dịch <code>viewModelScope.launch { items = repo.load() }</code> và <code>withContext(Dispatchers.Default) { parse(raw) }</code> sang Dart.
<ul>
  <li><em>Đáp án:</em> <code>Future&lt;void&gt; refresh() async { items = await repo.load(); }</code>, không cần dispatcher vì IO không chặn event loop; <code>await Isolate.run(() =&gt; parse(raw))</code> vì parse là việc CPU. Xem <a href="../async/futures_async_await.md" target="_blank" rel="noopener">1.3.1</a>, <a href="../async/isolates.md" target="_blank" rel="noopener">1.3.3</a>.</li>
</ul></li>
  <li><strong>Build mode.</strong> Vì sao bản release không có hot reload và không dùng được thư viện dựa trên <code>dart:mirrors</code>?
<ul>
  <li><em>Đáp án:</em> release là AOT, không có JIT để nạp lại code lúc chạy, và <code>dart:mirrors</code> chỉ có trên Dart VM JIT (xem <code>mirrors_check.dart</code> ở mục "Runtime và biên dịch").</li>
</ul></li>
</ol>

<h2>Tham khảo</h2>

<ul>
  <li><a href="https://dart.dev/overview" target="_blank" rel="noopener">Dart overview: platform, JIT và AOT, runtime</a></li>
  <li><a href="https://dart.dev/libraries" target="_blank" rel="noopener">Dart libraries: nền tảng hỗ trợ <code>dart:mirrors</code></a></li>
  <li><a href="https://dart.dev/language/concurrency" target="_blank" rel="noopener">Concurrency in Dart</a></li>
  <li><a href="https://api.dart.dev/stable/dart-isolate/Isolate/run.html" target="_blank" rel="noopener"><code>Isolate.run</code> API</a></li>
  <li><a href="https://dart.dev/resources/language/evolution" target="_blank" rel="noopener">Language evolution: tính năng theo từng version Dart</a></li>
  <li><a href="https://dart.dev/language/primary-constructors" target="_blank" rel="noopener">Primary constructors</a> và <a href="https://dart.dev/blog/announcing-dart-3-13" target="_blank" rel="noopener">Announcing Dart 3.13</a></li>
  <li><a href="https://dart.dev/blog/an-update-on-dart-macros-data-serialization" target="_blank" rel="noopener">An update on Dart macros &amp; data serialization (29/1/2025)</a></li>
  <li><a href="https://dart.dev/tools/pub/packages" target="_blank" rel="noopener">How to use packages: pubspec, <code>pubspec.lock</code>, pub cache</a></li>
  <li><a href="https://docs.flutter.dev/testing/build-modes" target="_blank" rel="noopener">Flutter build modes</a></li>
  <li><a href="https://docs.flutter.dev/tools/hot-reload" target="_blank" rel="noopener">Flutter hot reload</a></li>
  <li><a href="https://flutter.dev/blog/whats-new-in-flutter-3-29" target="_blank" rel="noopener">What's new in Flutter 3.29: Dart threading changes on Android/iOS</a></li>
</ul>
    `
  },

  'flutter-dart-variables-types': {
    title: 'Variables and Types',
    summary: 'Trong Dart, biến là một cái tên giữ tham chiếu tới một object, còn kiểu là hợp đồng mà compiler kiểm tra về những object cái tên đó được phép trỏ tới, kể cả có được là null hay không. Type system của Dart là sound, nên hợp đồng đã được compiler chấp nhận thì vẫn đúng khi chương trình chạy.',
    status: 'published',
    difficulty: 'beginner',
    estimatedReadingTime: '22 phút',
    depth: 'deep-dive',
    tags: ['flutter', 'dart', 'session-01', 'variables', 'type-system', 'null-safety', 'generics', 'records'],
    domain: 'Flutter Development',
    module: 'Session 01: Dart Foundations',
    prerequisites: ['flutter.dart.dart_for_kotlin_devs'],
    related: ['flutter.dart.functions_operators', 'flutter.dart.control_flow_patterns', 'flutter.dart.collections_functional', 'flutter.dart.classes_mixins_sealed'],
    learningOutcomes: [
      'Phân biệt được var, final, const và late theo thời điểm giá trị được xác định và mức độ bất biến của từng cách khai báo.',
      'Giải thích được type inference, sound type system và vai trò của Object?, Object, dynamic, Never trong cây kiểu của Dart.',
      'Xử lý được giá trị có thể null bằng kiểu nullable, các toán tử null-aware và type promotion của flow analysis, không lạm dụng toán tử !.',
      'Áp dụng được generics có bound và records để khai báo kiểu dữ liệu dùng chung, và nhận diện được chỗ generics được kiểm tra lúc runtime.',
      'Nhận diện được các bẫy của kiểu built-in như int trên native và web, độ chính xác của double, String.length theo UTF-16 và việc bool không có truthy/falsy.'
    ],
    knowledgeGap: 'Không nắm hệ thống kiểu của Dart, Kotlin developer thường dùng dynamic để "cho nhanh" khi đọc JSON, rải toán tử ! để tắt lỗi nullable, nhầm final với bất biến, và tin rằng generics bị xoá như trên JVM. Hệ quả là lỗi kiểu bị đẩy từ compile-time sang runtime: NoSuchMethodError, "Null check operator used on a null value" hay TypeError xuất hiện trên máy người dùng thay vì bị analyzer chặn từ lúc viết code.',
    updatedAt: '2026-11-10',
    readTime: '22 phút',
    content: `
<h2>Vấn đề cần giải quyết</h2>

<p>Mọi chương trình đều phải trả lời hai câu hỏi về dữ liệu: <strong>cái tên này trỏ tới giá trị nào, có được đổi không</strong>, và <strong>giá trị đó thuộc loại gì, có thể vắng mặt (null) không</strong>. Ngôn ngữ trả lời hai câu đó càng muộn thì lỗi càng lộ ra muộn:</p>

<ul>
  <li>Khai báo không nói rõ "được gán lại hay không", người đọc code phải dò cả hàm mới biết giá trị có đổi giữa chừng.</li>
  <li>Kiểu chỉ được kiểm tra khi chạy (như JavaScript, hay chính Dart 1), lỗi gõ sai tên method chỉ lộ ra khi đúng dòng đó được chạy.</li>
  <li>Mọi tham chiếu đều có thể null (như Java), <code>NullPointerException</code> trở thành lỗi crash phổ biến nhất.</li>
</ul>

<p>Dart, ngôn ngữ của Flutter, giải quyết bằng <strong>khai báo thể hiện vòng đời của giá trị</strong> (<code>var</code>, <code>final</code>, <code>const</code>, <code>late</code>), <strong>type system tĩnh và sound</strong> kèm type inference, và <strong>sound null safety</strong>. Nếu chỉ học cú pháp mà không hiểu cơ chế, lỗi vẫn lọt qua đúng những chỗ ngôn ngữ cho phép "thoát": <code>dynamic</code>, toán tử <code>!</code>, phép ép kiểu <code>as</code>, và <code>late</code>.</p>

<pre data-lang="dart"><code>dynamic body = {'price': '450000'};  // API trả price dạng String
int price = body['price'];           // compile được, nhưng TypeError khi chạy</code></pre>

<h2>Sau khi học xong</h2>

<ul>
  <li>Phân biệt được var, final, const và late theo thời điểm giá trị được xác định và mức độ bất biến của từng cách khai báo.</li>
  <li>Giải thích được type inference, sound type system và vai trò của Object?, Object, dynamic, Never trong cây kiểu của Dart.</li>
  <li>Xử lý được giá trị có thể null bằng kiểu nullable, các toán tử null-aware và type promotion của flow analysis, không lạm dụng toán tử !.</li>
  <li>Áp dụng được generics có bound và records để khai báo kiểu dữ liệu dùng chung, và nhận diện được chỗ generics được kiểm tra lúc runtime.</li>
  <li>Nhận diện được các bẫy của kiểu built-in như int trên native và web, độ chính xác của double, String.length theo UTF-16 và việc bool không có truthy/falsy.</li>
</ul>

<h2>Variables and Types là gì?</h2>

<p>Trong Dart, <strong>biến</strong> là một cái tên giữ <strong>tham chiếu tới một object</strong> (mọi giá trị, kể cả số và <code>null</code>, đều là object), còn <strong>kiểu</strong> (static type) là hợp đồng mà compiler kiểm tra về những object cái tên đó được phép trỏ tới, kể cả có được là <code>null</code> hay không. Type system của Dart là <strong>sound</strong>: chương trình đã qua được compiler thì lúc chạy, một biểu thức kiểu <code>String</code> không bao giờ cho ra object không phải <code>String</code>.</p>

<p>Mental model dùng xuyên suốt bài: <strong>biến là cái nhãn dán lên một object, kiểu là giấy phép in trên nhãn</strong>. Khai báo (<code>var</code>/<code>final</code>/<code>const</code>/<code>late</code>) quyết định nhãn có được bóc ra dán sang object khác không; kiểu quyết định nhãn được dán lên loại object nào, và dấu <code>?</code> cho biết nhãn có được phép dán vào "không có gì" (<code>null</code>) hay không.</p>

<h2>Cách hoạt động</h2>

<h3>Mọi giá trị là object, biến giữ tham chiếu</h3>

<p>Dart không có kiểu primitive: <code>42</code>, <code>3.14</code>, <code>true</code>, <code>null</code> đều là object, có method (<code>42.isEven</code>). Việc tối ưu số thành giá trị máy là chuyện nội bộ của VM, không lộ ra ngôn ngữ. Hệ quả:</p>

<ul>
  <li>Gán <code>b = a</code> là sao chép <strong>tham chiếu</strong>: hai nhãn dán lên cùng một object. Với object sửa được (như <code>List</code>), sửa qua <code>b</code> thì <code>a</code> cũng thấy.</li>
  <li>Biến chưa khởi tạo có kiểu nullable mặc định là <code>null</code>, kể cả <code>int?</code>; không có "mặc định 0" như field <code>int</code> của Java.</li>
</ul>

<h3>Khai báo: var, final, const</h3>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Khai báo</th>
      <th style="padding:8px 12px;text-align:left;">Gán lại nhãn</th>
      <th style="padding:8px 12px;text-align:left;">Giá trị được xác định lúc</th>
      <th style="padding:8px 12px;text-align:left;">Object có bất biến không</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>var x = ...</code> hoặc <code>String x = ...</code></td>
      <td style="padding:8px 12px;">Được</td>
      <td style="padding:8px 12px;">Runtime</td>
      <td style="padding:8px 12px;">Tuỳ object</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>final x = ...</code></td>
      <td style="padding:8px 12px;">Không, gán đúng một lần</td>
      <td style="padding:8px 12px;">Runtime</td>
      <td style="padding:8px 12px;">Tuỳ object: <code>final</code> chỉ khoá <strong>nhãn</strong></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>const x = ...</code></td>
      <td style="padding:8px 12px;">Không</td>
      <td style="padding:8px 12px;"><strong>Compile-time</strong></td>
      <td style="padding:8px 12px;">Có, bất biến <strong>sâu</strong> (cả object và mọi thứ bên trong)</td>
    </tr>
  </tbody>
</table>

<ul>
  <li><code>final</code> tương đương <code>val</code> của Kotlin; viết kiểu tường minh (<code>String name = ...</code>) thay cho <code>var</code> vẫn là biến gán lại được.</li>
  <li><code>const</code> mạnh hơn <code>const val</code> của Kotlin: cả <code>List</code>, <code>Map</code>, <code>Set</code> literal và object của class có <strong>const constructor</strong> (<a href="classes_mixins_sealed.md" target="_blank" rel="noopener">1.2.5 Classes, Mixins and Sealed Types</a>) cũng là hằng. Hai biểu thức <code>const</code> cùng giá trị được <strong>canonicalize</strong> thành một object duy nhất trong bộ nhớ, lý do Flutter khuyên dùng <code>const</code> cho widget không đổi (3.1.1 Stateless and Stateful Widgets, chưa có bài).</li>
  <li>Instance field có thể là <code>final</code> nhưng không thể là <code>const</code>; hằng ở mức class phải viết <code>static const</code>.</li>
</ul>

<h4>Ví dụ: cấu hình hàng đợi upload ảnh</h4>

<p><strong>Bài toán:</strong> một màn hình upload ảnh có giới hạn số luồng và danh sách đuôi file cho phép (không bao giờ đổi), thời điểm tạo batch (chỉ biết khi chạy), danh sách file chờ (thêm dần) và bộ đếm (tăng dần). Mỗi giá trị cần đúng cách khai báo của nó.</p>

<pre data-lang="dart"><code>// upload_queue.dart
const maxConcurrentUploads = 3;            // hằng compile-time
const allowedExtensions = ['jpg', 'png'];  // const list: không sửa được

void main() {
  final batchCreatedAt = DateTime.now();   // chỉ biết lúc runtime, gán một lần
  final pending = &lt;String&gt;[];              // final: không gán lại, nhưng list vẫn sửa được
  var uploadedCount = 0;                   // var: giá trị thay đổi

  pending.add('avatar.jpg');
  pending.add('banner.png');
  uploadedCount += pending.length;

  print('Đã tải $uploadedCount/\${pending.length} file, tối đa $maxConcurrentUploads luồng');
  print('Batch tạo lúc: \${batchCreatedAt.runtimeType}');
  print(allowedExtensions.contains('png'));

  // allowedExtensions.add('gif');         // compile được, nhưng ném UnsupportedError khi chạy
  // pending = [];                         // lỗi compile: 'pending' chỉ gán được một lần
  // const now = DateTime.now();           // lỗi compile: không phải giá trị hằng
}</code></pre>

<p><strong>Kết quả</strong> (<code>dart run upload_queue.dart</code>):</p>

<pre data-lang="text"><code>Đã tải 2/2 file, tối đa 3 luồng
Batch tạo lúc: DateTime
true</code></pre>

<p>Bỏ comment dòng <code>allowedExtensions.add('gif')</code> thì chương trình ném <code>Unsupported operation: Cannot add to an unmodifiable list</code> lúc chạy: kiểu của nó vẫn là <code>List&lt;String&gt;</code>, nên compiler không chặn. Mutability của collection (<code>List.unmodifiable</code>, <code>final</code> list) được học kỹ ở <a href="collections_functional.md" target="_blank" rel="noopener">1.2.4 Collections and Functional APIs</a>.</p>

<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body">Biến top-level và <code>static</code> trong Dart được <strong>khởi tạo lười</strong>: biểu thức khởi tạo chỉ chạy ở lần đầu biến được đọc, không chạy khi chương trình khởi động.</div></div>

<h3>Type inference</h3>

<p>Dart là ngôn ngữ kiểu tĩnh, nhưng phần lớn chỗ không cần viết kiểu: compiler <strong>suy kiểu</strong> (type inference) theo hai hướng.</p>

<ul>
  <li><strong>Từ giá trị lên biến</strong>: <code>var count = 0;</code> thì <code>count</code> có kiểu <code>int</code>; <code>final names = &lt;String&gt;[];</code> thì <code>names</code> là <code>List&lt;String&gt;</code>. Kiểu đã suy ra là cố định: gán <code>count = 'a'</code> là lỗi compile.</li>
  <li><strong>Từ kiểu mong đợi xuống giá trị</strong> (context type): <code>List&lt;int&gt; ids = [];</code> thì literal <code>[]</code> được hiểu là <code>List&lt;int&gt;</code>; <code>double weight = 2;</code> thì literal <code>2</code> được hiểu là <code>2.0</code>.</li>
</ul>

<p>Hai trường hợp suy ra <code>dynamic</code> mà người mới hay vấp:</p>

<pre data-lang="dart"><code>var cache;          // không có giá trị khởi tạo: cache có kiểu dynamic, gán gì cũng được
var items = [];     // không có context: List&lt;dynamic&gt;, không phải List&lt;String&gt;</code></pre>

<p>Quy ước của Effective Dart: dùng <code>var</code>/<code>final</code> cho biến local khi kiểu đã rõ từ giá trị; viết kiểu tường minh ở <strong>biên của API</strong> (tham số, kiểu trả về, field public) và khi biến chưa có giá trị khởi tạo.</p>

<h3>Sound type system: static type, runtime type, is và as</h3>

<p>Mỗi biểu thức có hai loại kiểu:</p>

<ul>
  <li><strong>Static type</strong>: kiểu compiler biết lúc compile, dựa vào khai báo và inference.</li>
  <li><strong>Runtime type</strong>: kiểu thật của object lúc chạy (<code>object.runtimeType</code>).</li>
</ul>

<p><strong>Sound</strong> nghĩa là runtime type luôn là kiểu con của static type. Compiler đảm bảo điều đó bằng kiểm tra tĩnh; chỗ nào không chứng minh được lúc compile thì nó chèn <strong>kiểm tra lúc runtime</strong> và ném <code>TypeError</code> thay vì để giá trị sai kiểu lọt vào. Nhờ đó compiler AOT dùng được thông tin kiểu để tối ưu, và bạn tin được rằng biến <code>String</code> luôn là <code>String</code>.</p>

<p>Hai toán tử làm việc với runtime type:</p>

<ul>
  <li><code>x is T</code> (và <code>x is! T</code>): hỏi "object này có phải <code>T</code> không", trả về <code>bool</code>. Với biến local, sau phép kiểm tra thành công compiler <strong>promote</strong> biến lên kiểu <code>T</code> (xem phần flow analysis bên dưới).</li>
  <li><code>x as T</code>: <strong>khẳng định</strong> object là <code>T</code>. Đúng thì biểu thức có static type <code>T</code>; sai thì ném <code>TypeError</code> ngay tại đó.</li>
</ul>

<p>Chỗ runtime check hay gặp nhất ngoài <code>as</code> là <strong>generics covariant</strong>. Dart cho phép dùng <code>List&lt;String&gt;</code> ở chỗ cần <code>List&lt;Object&gt;</code> (Kotlin chỉ cho với <code>List</code> read-only), đổi lại phép ghi được kiểm tra lúc chạy:</p>

<pre data-lang="dart"><code>void addPlaceholder(List&lt;Object&gt; items) {
  items.add(0);                                     // hợp lệ với List&lt;Object&gt;
}

void main() {
  final tags = &lt;String&gt;['sale', 'new'];
  addPlaceholder(tags);   // compile được, nhưng TypeError:
                          // type 'int' is not a subtype of type 'String' of 'value'
}</code></pre>

<p>Soundness vẫn giữ (số <code>0</code> không lọt vào list <code>String</code>), nhưng lỗi lộ ra lúc runtime. Cách phòng: khai báo tham số đúng kiểu cần ghi, hoặc nhận <code>Iterable&lt;Object&gt;</code> khi hàm chỉ đọc.</p>

<h3>Cây kiểu: Object?, Object, Null, dynamic, Never</h3>

<div class="mermaid">
flowchart TD
    TOP["Object? : mọi giá trị, kể cả null"] --&gt; OBJ["Object : mọi giá trị khác null"]
    TOP --&gt; NUL["Null : chỉ có giá trị null"]
    OBJ --&gt; NUM["num"]
    OBJ --&gt; STR["String"]
    OBJ --&gt; BOOL["bool"]
    OBJ --&gt; REC["Record, List, class của bạn..."]
    NUM --&gt; INT["int"]
    NUM --&gt; DBL["double"]
    INT --&gt; NEV["Never : không có giá trị nào"]
    DBL --&gt; NEV
    STR --&gt; NEV
    BOOL --&gt; NEV
    REC --&gt; NEV
    NUL --&gt; NEV
</div>

<ul>
  <li><strong><code>Object?</code></strong> là kiểu trên cùng (top type): mọi giá trị đều thuộc nó. <code>T?</code> thực chất là hợp của <code>T</code> và <code>Null</code>.</li>
  <li><strong><code>Object</code></strong> là mọi giá trị khác null. Biến kiểu <code>Object</code> vẫn được compiler kiểm tra: chỉ gọi được member của <code>Object</code> (<code>toString</code>, <code>hashCode</code>, <code>==</code>); muốn dùng <code>length</code> phải kiểm tra <code>is String</code> trước.</li>
  <li><strong><code>dynamic</code></strong> cũng nằm ở đỉnh như <code>Object?</code>, nhưng <strong>tắt kiểm tra tĩnh</strong>: gọi gì cũng compile được, sai thì <code>NoSuchMethodError</code> lúc chạy. <code>dynamic</code> được gán ngầm vào bất kỳ kiểu nào mà không cần <code>as</code>.</li>
  <li><strong><code>Never</code></strong> là kiểu dưới cùng (bottom type): không có giá trị nào. Biểu thức <code>throw</code> có kiểu <code>Never</code>; hàm khai báo trả về <code>Never</code> là hàm không bao giờ trả về bình thường (luôn ném lỗi hoặc thoát). Compiler dùng nó để biết code phía sau không chạy tới. Tương đương <code>Nothing</code> của Kotlin.</li>
</ul>

<pre data-lang="dart"><code>void main() {
  dynamic fromPlatform = 42;       // giá trị chưa rõ kiểu, kiểm tra bị tắt
  Object? fromCache = 42;          // giá trị chưa rõ kiểu, compiler vẫn kiểm tra

  print(fromPlatform.isEven);      // compile được, kiểm tra lúc runtime: true
  // print(fromCache.isEven);      // lỗi compile: Object? không có isEven
  if (fromCache is int) {
    print(fromCache.isEven);       // sau is: fromCache được promote thành int
  }
  final count = fromCache as int;  // as: khẳng định kiểu, sai thì TypeError
  print(count + 1);                // 43
  // fromPlatform.length;          // compile được, chạy thì NoSuchMethodError
}</code></pre>

<p>Quy tắc chọn: giá trị chưa biết kiểu thì dùng <code>Object?</code> và kiểm tra bằng <code>is</code> (hoặc pattern ở <a href="control_flow_patterns.md" target="_blank" rel="noopener">1.2.3 Control Flow and Patterns</a>); <code>dynamic</code> chỉ để ở ranh giới thật sự động và đóng nó lại ngay.</p>

<h3>Kiểu built-in: int, double, num, bool</h3>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Kiểu</th>
      <th style="padding:8px 12px;text-align:left;">Bản chất</th>
      <th style="padding:8px 12px;text-align:left;">Bẫy cần nhớ</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>int</code></td>
      <td style="padding:8px 12px;">Số nguyên. Trên native (Android, iOS, desktop): 64-bit bù hai, tràn số thì quay vòng. Trên web: là số của JavaScript, chỉ chính xác tới 2^53, và <code>1 is double</code> cho <code>true</code></td>
      <td style="padding:8px 12px;">Không có <code>Long</code>, <code>Short</code>, <code>Byte</code> riêng; app chạy cả web không được dựa vào tràn số 64-bit</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>double</code></td>
      <td style="padding:8px 12px;">Số thực 64-bit IEEE 754</td>
      <td style="padding:8px 12px;"><code>0.1 + 0.2</code> là <code>0.30000000000000004</code>; không có <code>Float</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>num</code></td>
      <td style="padding:8px 12px;">Supertype của <code>int</code> và <code>double</code></td>
      <td style="padding:8px 12px;">Gán <code>num</code> vào <code>int</code> phải kiểm tra hoặc ép kiểu</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>bool</code></td>
      <td style="padding:8px 12px;">Chỉ có <code>true</code> và <code>false</code></td>
      <td style="padding:8px 12px;">Không có truthy/falsy: <code>if (items.length)</code> là lỗi compile</td>
    </tr>
  </tbody>
</table>

<pre data-lang="dart"><code>void main() {
  int quantity = 3;
  double weightKg = 2;                    // literal int được đổi thành 2.0 (từ Dart 2.1)
  num anyNumber = quantity;               // num là supertype của int và double
  anyNumber = 1.5;
  const maxFileSize = 10_000_000;         // digit separator (Dart 3.6)

  print(weightKg);                        // 2.0
  print(int.parse('42') + 1);             // 43
  print(int.tryParse('4x2'));             // null thay vì ném FormatException
  print(0.1 + 0.2);                       // 0.30000000000000004
  print(9223372036854775807 + 1);         // tràn số trên native: quay về số âm
  print(quantity.toDouble() * weightKg);  // đổi kiểu phải gọi tường minh
  print('$anyNumber $maxFileSize');
}</code></pre>

<p><strong>Kết quả</strong> (chạy trên Dart VM):</p>

<pre data-lang="text"><code>2.0
43
null
0.30000000000000004
-9223372036854775808
6.0
1.5 10000000</code></pre>

<p>Literal <code>2</code> đổi được thành <code>double</code> vì compiler biết context type; nhưng <strong>biến</strong> <code>int</code> thì không tự đổi: <code>double d = quantity;</code> là lỗi compile, phải viết <code>quantity.toDouble()</code>. Dart không có chuyển kiểu số ngầm giữa các biến, giống Kotlin.</p>

<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body">Đừng lưu tiền bằng <code>double</code>. Lưu số nguyên theo đơn vị nhỏ nhất (đồng, cent) bằng <code>int</code>, chỉ đổi sang chuỗi hiển thị ở UI.</div></div>

<h3>String và interpolation</h3>

<p><code>String</code> là chuỗi <strong>bất biến</strong> các UTF-16 code unit. Literal dùng nháy đơn hoặc nháy kép như nhau.</p>

<pre data-lang="dart"><code>// order_message.dart
void main() {
  final customer = 'Lan';
  final total = 450000;
  print('Xin chào $customer, tổng kèm ship: \${total + 30000}đ');
  final sql = 'SELECT * FROM orders '
      'WHERE status = "paid"';             // hai literal đứng cạnh nhau được nối lại
  print(sql);
  print(r'C:\\Users\\lan\\$cache');           // raw string: không xử lý \\ và $
  final receipt = '''
Cảm ơn $customer
Tổng: $total đ''';
  print(receipt);
  print('Lan' == 'L' + 'an');              // so sánh nội dung
  print('👍'.length);                      // 2: length đếm UTF-16 code unit
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>Xin chào Lan, tổng kèm ship: 480000đ
SELECT * FROM orders WHERE status = "paid"
C:\\Users\\lan\\$cache
Cảm ơn Lan
Tổng: 450000 đ
true
2</code></pre>

<ul>
  <li><code>$customer</code> chèn một identifier; biểu thức phức tạp hơn phải bọc trong cặp ngoặc nhọn ngay sau <code>$</code>. Giá trị chèn vào được đổi sang chuỗi bằng <code>toString()</code>.</li>
  <li><code>==</code> trên <code>String</code> so <strong>nội dung</strong>, không cần <code>equals</code> như Java.</li>
  <li><code>length</code> đếm code unit chứ không đếm ký tự người dùng thấy. Emoji, chữ có dấu tổ hợp chiếm nhiều code unit; đếm và cắt chuỗi theo ký tự hiển thị thì dùng package <code>characters</code> (Flutter export sẵn, dùng qua <code>text.characters</code>).</li>
  <li>Nối nhiều đoạn trong vòng lặp thì dùng <code>StringBuffer</code> thay vì <code>+</code> liên tục.</li>
</ul>

<h3>Null safety: kiểu nullable và non-nullable</h3>

<p>Từ Dart 2.12, mọi kiểu <strong>mặc định là non-nullable</strong>: <code>String</code> không bao giờ chứa <code>null</code>. Muốn cho phép null phải viết <code>String?</code>. Từ Dart 3, sound null safety là bắt buộc, không còn chế độ trộn code chưa migrate.</p>

<p>Theo mental model: nhãn <code>String</code> không bao giờ được dán vào "không có gì"; nhãn <code>String?</code> thì được, và compiler bắt bạn kiểm tra trước khi dùng object qua nhãn đó:</p>

<pre data-lang="dart"><code>String name = null;      // lỗi compile: Null không gán được cho String
String? nickname;        // mặc định là null
nickname.length;         // lỗi compile: receiver có thể null</code></pre>

<p>Null safety của Dart là <strong>sound</strong> giống phần còn lại của type system: không có "platform type" như khi Kotlin gọi Java. Một biểu thức non-nullable chỉ có thể dẫn tới lỗi null nếu bạn đi qua lối thoát tường minh: <code>!</code>, <code>as</code>, <code>dynamic</code> hoặc <code>late</code>.</p>

<h3>Toán tử null-aware</h3>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Toán tử</th>
      <th style="padding:8px 12px;text-align:left;">Ý nghĩa</th>
      <th style="padding:8px 12px;text-align:left;">Kotlin tương đương</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>a?.b</code></td>
      <td style="padding:8px 12px;"><code>a</code> null thì cả biểu thức là null, không truy cập <code>b</code></td>
      <td style="padding:8px 12px;"><code>a?.b</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>a?[i]</code></td>
      <td style="padding:8px 12px;">Index an toàn: <code>a</code> null thì trả null</td>
      <td style="padding:8px 12px;"><code>a?.get(i)</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>a ?? b</code></td>
      <td style="padding:8px 12px;"><code>a</code> khác null thì lấy <code>a</code>, ngược lại mới tính <code>b</code></td>
      <td style="padding:8px 12px;"><code>a ?: b</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>a ??= b</code></td>
      <td style="padding:8px 12px;">Chỉ gán <code>b</code> (và chỉ tính <code>b</code>) khi <code>a</code> đang null</td>
      <td style="padding:8px 12px;">không có toán tử riêng</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>a!</code></td>
      <td style="padding:8px 12px;">Khẳng định <code>a</code> khác null; sai thì ném <code>TypeError</code></td>
      <td style="padding:8px 12px;"><code>a!!</code></td>
    </tr>
  </tbody>
</table>

<p>Cascade null-aware <code>?..</code> thuộc cú pháp cascade, được học ở <a href="functions_operators.md" target="_blank" rel="noopener">1.2.2 Functions and Operators</a>; null-aware spread <code>...?</code> và null-aware element thuộc collection literal ở <a href="collections_functional.md" target="_blank" rel="noopener">1.2.4 Collections and Functional APIs</a>.</p>

<p><strong>Null-shorting</strong>: khi <code>?.</code> gặp null, <strong>cả chuỗi phía sau</strong> dừng lại, nên <code>customer?.address.city.length</code> chỉ cần một <code>?.</code> nếu <code>address</code> và <code>city</code> là non-nullable.</p>

<pre data-lang="dart"><code>class Address {
  Address(this.city);
  final String city;
}

class Customer {
  Customer({this.address, this.tags});
  final Address? address;
  final List&lt;String&gt;? tags;
}

class AuthSession {
  String? _token;
  String get token =&gt; _token ??= readToken(); // ??= : chỉ gán (và chỉ gọi vế phải) khi đang null
}

String readToken() {
  print('đọc token từ storage');
  return 'token-123';
}

Customer? findCustomer(String id) =&gt; id == 'c1' ? Customer(address: Address('Huế')) : null;

void main() {
  final found = findCustomer('c1');
  final missing = findCustomer('c9');

  print(found?.address?.city);         // ?. : receiver null thì trả null, không gọi tiếp
  print(missing?.address?.city.length); // null-shorting: missing null thì cả chuỗi dừng, .length không chạy
  print(found?.tags?[0]);              // ?[] : list null thì trả null
  print(missing?.address?.city ?? 'Chưa có địa chỉ'); // ?? : vế trái null thì lấy vế phải

  final session = AuthSession();
  print(session.token);                // lần đầu: _token null nên gọi readToken()
  print(session.token);                // lần sau: đã có giá trị, không gọi lại

  final city = found!.address!.city;   // ! : khẳng định không null, sai thì TypeError
  print(city);
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>Huế
null
null
Chưa có địa chỉ
đọc token từ storage
token-123
token-123
Huế</code></pre>

<p>Class trong ví dụ chỉ ở mức tối thiểu (học đầy đủ ở <a href="classes_mixins_sealed.md" target="_blank" rel="noopener">1.2.5</a>); toán tử điều kiện <code>cond ? a : b</code> trong <code>findCustomer</code> thuộc <a href="functions_operators.md" target="_blank" rel="noopener">1.2.2</a>.</p>

<h3>Flow analysis và type promotion</h3>

<p>Compiler không chỉ đọc khai báo; nó <strong>phân tích luồng điều khiển</strong> (flow analysis) để biết tại mỗi dòng biến có thể mang kiểu gì. Sau <code>if (x != null)</code>, <code>if (x is String)</code>, hoặc sau một nhánh <code>return</code>/<code>throw</code> loại bỏ trường hợp null, compiler <strong>promote</strong> biến lên kiểu hẹp hơn: <code>String?</code> thành <code>String</code>, <code>Object?</code> thành <code>int</code>. Không cần <code>!</code> hay <code>as</code>.</p>

<p>Promotion chỉ áp dụng khi compiler <strong>chứng minh được</strong> giá trị không đổi giữa lúc kiểm tra và lúc dùng:</p>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Trường hợp</th>
      <th style="padding:8px 12px;text-align:left;">Promote được?</th>
      <th style="padding:8px 12px;text-align:left;">Lý do</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Biến local, tham số</td>
      <td style="padding:8px 12px;">Có</td>
      <td style="padding:8px 12px;">Chỉ code trong hàm mới đổi được nó</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Field <code>final</code> <strong>private</strong> (<code>_name</code>), dùng trong cùng library (từ Dart 3.2)</td>
      <td style="padding:8px 12px;">Có</td>
      <td style="padding:8px 12px;">Code ngoài library không override hay đổi được nó</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Field public (<code>user.nickname</code>)</td>
      <td style="padding:8px 12px;">Không</td>
      <td style="padding:8px 12px;">Lớp con có thể override bằng getter trả giá trị khác mỗi lần đọc</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Biến local bị một closure ghi</td>
      <td style="padding:8px 12px;">Không</td>
      <td style="padding:8px 12px;">Closure có thể đổi nó bất kỳ lúc nào</td>
    </tr>
  </tbody>
</table>

<p>Khi không promote được, analyzer báo lỗi kèm lý do, ví dụ: <code>'nickname' refers to a public property so it couldn't be promoted</code>. Cách sửa chuẩn: <strong>chép giá trị vào biến local</strong> rồi kiểm tra biến đó.</p>

<h4>Ví dụ: chọn tên hiển thị của người dùng</h4>

<p><strong>Bài toán:</strong> màn hình hồ sơ hiển thị nickname nếu có và không rỗng; không thì họ tên (bỏ khoảng trắng thừa); không có nữa thì lấy phần trước <code>@</code> của email. Hai trong ba field là nullable và là field public, nên không promote trực tiếp được.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li>Chép <code>user.nickname</code> (field public, kiểu <code>String?</code>) vào biến local <code>nickname</code>.</li>
  <li>Kiểm tra <code>nickname != null &amp;&amp; nickname.isNotEmpty</code>: ngay sau <code>&amp;&amp;</code>, <code>nickname</code> đã được promote thành <code>String</code>; nhánh đúng trả về nickname.</li>
  <li><code>user.fullName?.trim()</code>: nếu <code>fullName</code> null thì cả biểu thức là null, <code>trim()</code> không chạy.</li>
  <li><code>??</code> chọn họ tên đã trim, hoặc fallback về phần trước <code>@</code> của email.</li>
</ol>

<div class="mermaid">
flowchart TD
    A["(1) nickname = user.nickname"] --&gt; B{"(2) nickname khác null và không rỗng?"}
    B --&gt;|"có, nickname là String"| R1["trả nickname"]
    B --&gt;|"không"| C["(3) fullName = user.fullName?.trim()"]
    C --&gt; D{"(4) fullName khác null?"}
    D --&gt;|"có"| R2["trả fullName"]
    D --&gt;|"không"| R3["trả phần trước @ của email"]
</div>

<pre data-lang="dart"><code>// user_profile.dart
class UserProfile {
  UserProfile(this.email, {this.nickname, this.fullName});
  final String email;
  final String? nickname;
  final String? fullName;
}

String displayName(UserProfile user) {
  final nickname = user.nickname;               // (1) chép field public vào biến local
  if (nickname != null &amp;&amp; nickname.isNotEmpty) { // (2) từ đây nickname có kiểu String
    return nickname;
  }
  final fullName = user.fullName?.trim();       // (3) ?. : fullName null thì cả biểu thức null
  return fullName ?? user.email.split('@').first; // (4) ?? : fallback về phần trước @ của email
}

void main() {
  print(displayName(UserProfile('lan@example.com', nickname: 'Lan béo')));
  print(displayName(UserProfile('lan@example.com', nickname: '', fullName: '  Nguyễn Lan ')));
  print(displayName(UserProfile('lan@example.com')));
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>Lan béo
Nguyễn Lan
lan</code></pre>

<h3>late: hứa khởi tạo sau, hoặc khởi tạo lười</h3>

<p><code>late</code> dùng cho biến <strong>non-nullable</strong> mà compiler không chứng minh được là đã có giá trị trước khi đọc. Nó có hai công dụng:</p>

<ol>
  <li><strong>Khởi tạo sau</strong> (<code>late String token;</code>): bạn hứa sẽ gán trước khi đọc. Compiler bỏ kiểm tra lúc compile và chèn kiểm tra lúc runtime: đọc trước khi gán thì ném <code>LateInitializationError</code>. Tương đương <code>lateinit var</code> của Kotlin, nhưng dùng được cho mọi kiểu, kể cả <code>int</code>.</li>
  <li><strong>Khởi tạo lười</strong> (<code>late final x = compute();</code>): biểu thức khởi tạo chỉ chạy ở lần đọc đầu tiên, rồi giá trị được giữ lại. Tương đương <code>by lazy</code> của Kotlin, nhưng <strong>không cần đồng bộ hoá</strong> vì mỗi isolate chỉ có một luồng chạy code Dart (isolate được học ở <a href="../async/isolates.md" target="_blank" rel="noopener">1.3.3 Isolates</a>).</li>
</ol>

<p><code>late final</code> không có initializer cho phép gán đúng một lần; gán lần hai là lỗi runtime (<code>Field 'region' has already been initialized</code>), hoặc lỗi compile nếu compiler thấy được.</p>

<h4>Ví dụ: bảng tỉnh/thành chỉ dựng khi form địa chỉ cần</h4>

<p><strong>Bài toán:</strong> form địa chỉ cần bảng mã tỉnh/thành; dựng bảng tốn công và nhiều người dùng mở form rồi thoát không chọn gì. Mã tỉnh đã chọn chỉ có sau khi người dùng chọn.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li>Tạo <code>AddressForm</code>: field <code>late final provinces</code> chưa chạy initializer.</li>
  <li>Lần đầu đọc <code>provinces</code>: Dart chạy <code>loadProvinces()</code>, lưu kết quả vào field.</li>
  <li>Các lần đọc sau trả về giá trị đã lưu, không gọi lại <code>loadProvinces()</code>.</li>
  <li>Đọc <code>selectedCode</code> trước khi gán: runtime ném <code>LateInitializationError</code>.</li>
</ol>

<div class="mermaid">
sequenceDiagram
    participant M as main
    participant F as AddressForm
    participant L as loadProvinces
    M-&gt;&gt;F: (1) AddressForm()
    Note over F: provinces chưa khởi tạo
    M-&gt;&gt;F: (2) đọc provinces lần đầu
    F-&gt;&gt;L: gọi initializer
    L--&gt;&gt;F: Map 3 tỉnh, lưu vào field
    M-&gt;&gt;F: (3) đọc provinces lần sau
    F--&gt;&gt;M: trả giá trị đã lưu
    M-&gt;&gt;F: (4) đọc selectedCode khi chưa gán
    F--&gt;&gt;M: LateInitializationError
</div>

<pre data-lang="dart"><code>// address_form.dart
Map&lt;String, String&gt; loadProvinces() {
  print('  -&gt; đang dựng bảng tỉnh/thành...');   // (2) chỉ chạy ở lần truy cập đầu
  return {'79': 'TP. Hồ Chí Minh', '01': 'Hà Nội', '48': 'Đà Nẵng'};
}

class AddressForm {
  late final Map&lt;String, String&gt; provinces = loadProvinces(); // initializer chưa chạy
  late String selectedCode;                                   // không initializer: hứa sẽ gán trước khi đọc
}

void main() {
  final form = AddressForm();                      // (1) tạo form, bảng tỉnh chưa được dựng
  print('Form đã tạo');
  print(form.provinces['79']);                     // (2) lần đọc đầu: chạy loadProvinces()
  print(form.provinces['01']);                     // (3) lần sau: dùng giá trị đã lưu
  try {
    print(form.selectedCode);                      // (4) đọc trước khi gán: lỗi runtime
  } on Error catch (e) {
    print(e);
  }
  form.selectedCode = '48';
  print(form.provinces[form.selectedCode]);
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>Form đã tạo
  -&gt; đang dựng bảng tỉnh/thành...
TP. Hồ Chí Minh
Hà Nội
LateInitializationError: Field 'selectedCode' has not been initialized.
Đà Nẵng</code></pre>

<p>Dòng "đang dựng bảng" in đúng một lần và in <strong>sau</strong> "Form đã tạo". <code>try</code>/<code>on</code> chỉ để in lỗi; exception học ở <a href="control_flow_patterns.md" target="_blank" rel="noopener">1.2.3</a>.</p>

<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><code>late</code> chuyển lỗi "chưa khởi tạo" từ compile-time sang runtime. Nếu giá trị thật sự có thể vắng mặt, dùng kiểu nullable; chỉ dùng <code>late</code> khi vòng đời đảm bảo nó được gán trước khi đọc (ví dụ gán trong <code>initState</code> của <code>State</code>, học ở 3.1.1 Stateless and Stateful Widgets, chưa có bài).</div></div>

<h3>Generics: type parameter, bound, reified</h3>

<p>Generics cho phép một class hoặc hàm làm việc với nhiều kiểu mà vẫn giữ kiểm tra tĩnh: <code>List&lt;String&gt;</code> chỉ nhận <code>String</code>, đọc ra là <code>String</code>, không cần ép kiểu.</p>

<ul>
  <li><strong>Type parameter</strong>: khai báo <code>class Page&lt;T&gt;</code>, hàm <code>T first&lt;T&gt;(List&lt;T&gt; items)</code>. Khi gọi, Dart thường suy ra <code>T</code> từ đối số.</li>
  <li><strong>Bound</strong>: <code>T extends num</code> giới hạn <code>T</code> phải là kiểu con của <code>num</code>, nhờ đó trong thân hàm dùng được <code>+</code>, <code>toDouble()</code>. Không ghi bound thì bound là <code>Object?</code>, nghĩa là <code>T</code> có thể là kiểu nullable.</li>
  <li><strong>Reified</strong>: khác JVM (Java và Kotlin xoá type argument lúc chạy, Kotlin phải dùng <code>inline</code> + <code>reified</code> mới hỏi được), Dart <strong>giữ type argument ở runtime</strong>. <code>items is List&lt;Product&gt;</code> hoạt động thật, và <code>runtimeType</code> của một <code>Page&lt;Product&gt;</code> in ra đúng <code>Page&lt;Product&gt;</code>.</li>
  <li><strong>Raw type</strong>: viết <code>List</code> không có type argument thì Dart điền bound đã khai báo của type parameter, hoặc <code>dynamic</code> nếu không khai báo bound, nên <code>List</code> thành <code>List&lt;dynamic&gt;</code>. Luôn ghi type argument hoặc để inference làm.</li>
</ul>

<h4>Ví dụ: response phân trang dùng chung cho mọi loại item</h4>

<p><strong>Bài toán:</strong> nhiều API trả về danh sách có phân trang (sản phẩm, từ khoá gợi ý, đơn hàng). Thay vì viết một class cho mỗi loại, dùng một <code>Page&lt;T&gt;</code>; thêm một hàm tính trung bình dùng được cho cả list <code>int</code> và <code>double</code>.</p>

<pre data-lang="dart"><code>// page.dart
class Page&lt;T&gt; {
  Page(this.items, {this.nextCursor});
  final List&lt;T&gt; items;
  final String? nextCursor;
  bool get hasMore =&gt; nextCursor != null;
}

class Product {
  Product(this.name);
  final String name;
}

double average&lt;T extends num&gt;(List&lt;T&gt; values) {
  if (values.isEmpty) return 0;
  num total = 0;
  for (final value in values) {
    total += value;              // dùng được + vì T chắc chắn là num
  }
  return total / values.length;
}

void main() {
  final products = Page([Product('Tai nghe'), Product('Sạc nhanh')], nextCursor: 'c2');
  final keywords = Page(['tai nghe', 'ốp lưng']);  // suy ra Page&lt;String&gt;

  print(products.runtimeType);                     // Page&lt;Product&gt;
  print('\${products.hasMore} \${keywords.hasMore}');

  final Object data = products.items;              // chỉ còn biết là Object
  print(data is List&lt;Product&gt;);                    // type argument còn ở runtime
  print(data is List&lt;String&gt;);

  print(average(&lt;int&gt;[5, 4, 4]));                  // T = int
  print(average(&lt;double&gt;[4.5, 3.5]));              // T = double
  // average(&lt;String&gt;['5']);                       // lỗi compile: String không thoả bound num
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>Page&lt;Product&gt;
true false
true
false
4.333333333333333
4.0</code></pre>

<p>Dòng <code>data is List&lt;String&gt;</code> cho <code>false</code> chính là reified generics: trên JVM, phép kiểm tra tương tự không làm được vì type argument đã bị xoá.</p>

<h3>Records: nhóm giá trị không cần khai báo class</h3>

<p><strong>Record</strong> (từ Dart 3.0) là một giá trị gộp nhiều field, <strong>bất biến</strong>, <strong>ẩn danh</strong> (không cần khai báo class) và có kiểu theo <strong>hình dạng</strong> (shape) của nó.</p>

<ul>
  <li>Field positional: kiểu <code>(String, int)</code>, giá trị <code>('Bán chạy', 120)</code>, đọc bằng <code>$1</code>, <code>$2</code>.</li>
  <li>Field named: kiểu <code>({double lat, double lng})</code>, giá trị <code>(lat: 10.7, lng: 106.7)</code>, đọc bằng <code>.lat</code>, <code>.lng</code>.</li>
  <li>Hai kiểu record giống nhau khi cùng số field positional với cùng kiểu theo thứ tự, và cùng tập field named. <code>(int, String)</code> khác <code>(String, int)</code>; <code>({int a})</code> khác <code>({int b})</code>.</li>
  <li><strong>Equality theo cấu trúc</strong>: hai record bằng nhau (<code>==</code>) khi cùng shape và từng field bằng nhau; <code>hashCode</code> nhất quán theo đó, nên record dùng được làm key của <code>Map</code> hay phần tử <code>Set</code>.</li>
  <li>Record một field positional phải có dấu phẩy: <code>(42,)</code>, vì <code>(42)</code> chỉ là biểu thức trong ngoặc.</li>
  <li>Record không có method; muốn đặt tên cho một kiểu record thì dùng <code>typedef</code> (học ở <a href="functions_operators.md" target="_blank" rel="noopener">1.2.2 Functions and Operators</a>).</li>
</ul>

<p>Record thay cho <code>Pair</code>/<code>Triple</code> của Kotlin, có thêm field named. Khi cần method, validation hay một tên kiểu trong domain thì dùng class (<a href="classes_mixins_sealed.md" target="_blank" rel="noopener">1.2.5</a>). Tách record ra từng biến (<code>final (lat, lng) = ...</code>) là <strong>destructuring</strong>, học ở <a href="control_flow_patterns.md" target="_blank" rel="noopener">1.2.3 Control Flow and Patterns</a>.</p>

<h4>Ví dụ: đọc toạ độ cửa hàng từ link chia sẻ</h4>

<p><strong>Bài toán:</strong> link chia sẻ vị trí chứa chuỗi <code>"10.7769, 106.7009"</code>. Hàm cần trả về hai số cùng lúc, hoặc null nếu chuỗi sai định dạng; tạo class <code>LatLng</code> riêng chỉ cho một hàm parse là thừa.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li>Tách chuỗi theo dấu phẩy.</li>
  <li>Không đúng hai phần thì trả về null.</li>
  <li><code>double.tryParse</code> từng phần, kết quả có kiểu <code>double?</code>.</li>
  <li>Một trong hai là null thì trả null; sau dòng này cả hai được promote thành <code>double</code>.</li>
  <li>Trả về record <code>(lat: ..., lng: ...)</code>.</li>
</ol>

<div class="mermaid">
flowchart TD
    A["(1) split theo dấu phẩy"] --&gt; B{"(2) đúng 2 phần?"}
    B --&gt;|"không"| N["trả null"]
    B --&gt;|"có"| C["(3) tryParse lat, lng : double?"]
    C --&gt; D{"(4) lat hoặc lng null?"}
    D --&gt;|"có"| N
    D --&gt;|"không, cả hai là double"| E["(5) trả record lat, lng"]
</div>

<pre data-lang="dart"><code>// location_link.dart
({double lat, double lng})? parseLatLng(String raw) {
  final parts = raw.split(',');                       // (1) tách "10.77,106.70"
  if (parts.length != 2) return null;                 // (2) sai định dạng
  final lat = double.tryParse(parts[0].trim());       // (3) double? : null nếu không phải số
  final lng = double.tryParse(parts[1].trim());
  if (lat == null || lng == null) return null;        // (4) sau dòng này lat, lng là double
  return (lat: lat, lng: lng);                        // (5) trả về record có field tên
}

void main() {
  final shop = parseLatLng('10.7769, 106.7009');
  final shared = parseLatLng('10.7769,106.7009');

  print(shop);                       // in cả record
  print(shop?.lat);                  // đọc field tên qua ?. vì kiểu là record?
  print(shop == shared);             // so theo giá trị từng field
  print(parseLatLng('Quận 1'));      // null
  print(parseLatLng('10.7,abc'));    // null

  final (String, int) badge = ('Bán chạy', 120);      // record positional
  print('\${badge.$1}: \${badge.$2} đơn');
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>(lat: 10.7769, lng: 106.7009)
10.7769
true
null
null
Bán chạy: 120 đơn</code></pre>

<p><code>shop == shared</code> là <code>true</code> dù hai record được tạo từ hai chuỗi khác nhau: record so theo giá trị từng field.</p>

<h2>Ví dụ thực tế</h2>

<h3>Đọc JSON từ API mà không để dynamic lan ra</h3>

<p><strong>Bài toán:</strong> <code>jsonDecode</code> (thư viện <code>dart:convert</code>) trả về <code>dynamic</code>. Nếu gán thẳng <code>json['price']</code> vào <code>int</code>, API đổi kiểu một field là app crash. Cần đọc response thành object có kiểu: field bắt buộc sai kiểu thì trả null có kiểm soát, field tuỳ chọn thì nullable.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li>Nhận kết quả <code>jsonDecode</code> vào biến <code>Object?</code>: từ đây compiler bắt kiểm tra trước khi dùng.</li>
  <li><code>is! Map&lt;String, Object?&gt;</code> thì trả null; qua được dòng này <code>json</code> được promote thành Map.</li>
  <li>Đọc từng field ra biến local, mỗi biến có kiểu <code>Object?</code>.</li>
  <li>Kiểm tra kiểu các field bắt buộc bằng <code>is!</code>; sai một field thì trả null.</li>
  <li>Sau bước 4, <code>id</code>, <code>name</code>, <code>price</code> đã được promote; field tuỳ chọn <code>discount</code> chỉ nhận khi đúng <code>int</code>.</li>
</ol>

<div class="mermaid">
flowchart TD
    A["(1) Object? json = jsonDecode(body)"] --&gt; B{"(2) json is Map?"}
    B --&gt;|"không"| N["trả null"]
    B --&gt;|"có"| C["(3) đọc id, name, price : Object?"]
    C --&gt; D{"(4) đủ field bắt buộc đúng kiểu?"}
    D --&gt;|"không"| N
    D --&gt;|"có"| E["(5) tạo Product, discount nullable"]
</div>

<pre data-lang="dart"><code>// product_parser.dart
import 'dart:convert';

class Product {
  Product(this.id, this.name, this.priceVnd, {this.discountVnd});
  final int id;
  final String name;
  final int priceVnd;          // tiền tính bằng int (đồng), không dùng double
  final int? discountVnd;      // API có thể không gửi field này

  int get finalPriceVnd =&gt; priceVnd - (discountVnd ?? 0);
}

Product? parseProduct(String body) {
  final Object? json = jsonDecode(body);              // (1) nhận kết quả về Object?, không để dynamic lan ra
  if (json is! Map&lt;String, Object?&gt;) return null;     // (2) không phải object JSON: dừng
  final id = json['id'];                              // (3) mỗi giá trị đều là Object?
  final name = json['name'];
  final price = json['price'];
  if (id is! int || name is! String || price is! int) {
    return null;                                      // (4) thiếu hoặc sai kiểu field bắt buộc
  }
  final discount = json['discount'];
  return Product(id, name, price,                     // (5) từ đây id, name, price đã có kiểu cụ thể
      discountVnd: discount is int ? discount : null);
}

void main() {
  final ok = parseProduct('{"id": 7, "name": "Tai nghe", "price": 450000, "discount": 50000}');
  print('\${ok?.name}: \${ok?.finalPriceVnd}');

  final noDiscount = parseProduct('{"id": 8, "name": "Ốp lưng", "price": 90000}');
  print('\${noDiscount?.name}: \${noDiscount?.finalPriceVnd}');

  final wrongType = parseProduct('{"id": "9", "name": "Cáp sạc", "price": 120000}');
  print(wrongType);                                    // id là String: trả null thay vì crash

  print(parseProduct('[1, 2, 3]'));                    // không phải Map
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>Tai nghe: 400000
Ốp lưng: 90000
null
null</code></pre>

<p><code>jsonDecode</code> thực tế tạo <code>Map&lt;String, dynamic&gt;</code>, kiểu này thoả <code>is Map&lt;String, Object?&gt;</code> vì <code>dynamic</code> và <code>Object?</code> là kiểu con của nhau. Cách viết gọn hơn bằng map pattern ở <a href="control_flow_patterns.md" target="_blank" rel="noopener">1.2.3</a>; dự án lớn thường sinh code parse bằng <code>json_serializable</code> (<a href="classes_mixins_sealed.md" target="_blank" rel="noopener">1.2.5</a>).</p>

<h3>Cấu hình theo môi trường bằng hằng compile-time</h3>

<p><code>String.fromEnvironment</code>, <code>bool.fromEnvironment</code>, <code>int.fromEnvironment</code> là <strong>const constructor</strong>: giá trị được chốt lúc compile từ cờ <code>--dart-define</code>, nên dùng được với <code>const</code> và compiler loại bỏ được nhánh code không dùng tới.</p>

<pre data-lang="dart"><code>// env.dart
const apiBaseUrl = String.fromEnvironment('API_BASE_URL', defaultValue: 'https://staging.example.com');
const isProduction = bool.fromEnvironment('PRODUCTION');</code></pre>

<p>Không truyền cờ thì dùng <code>defaultValue</code>; <code>dart run -DAPI_BASE_URL=https://api.example.com env.dart</code> (Flutter: <code>flutter run --dart-define=API_BASE_URL=...</code>) chốt giá trị khác. API docs chỉ đảm bảo các constructor này hoạt động khi gọi dưới dạng <code>const</code>.</p>

<h2>Khi nào nên và không nên dùng</h2>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Lựa chọn</th>
      <th style="padding:8px 12px;text-align:left;">Nên dùng khi</th>
      <th style="padding:8px 12px;text-align:left;">Không nên dùng khi</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>final</code></td>
      <td style="padding:8px 12px;">Mặc định cho biến local và field: giá trị không cần gán lại</td>
      <td style="padding:8px 12px;">Biến thật sự đổi giá trị (bộ đếm, accumulator): dùng <code>var</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>const</code></td>
      <td style="padding:8px 12px;">Giá trị biết lúc compile: hằng số, list/map cấu hình, widget không đổi</td>
      <td style="padding:8px 12px;">Giá trị chỉ có lúc runtime (<code>DateTime.now()</code>, dữ liệu từ API)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>late</code></td>
      <td style="padding:8px 12px;">Vòng đời đảm bảo gán trước khi đọc; hoặc cần khởi tạo lười một giá trị tốn công</td>
      <td style="padding:8px 12px;">Giá trị có thể vắng mặt thật sự: dùng <code>T?</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>T?</code></td>
      <td style="padding:8px 12px;">Dữ liệu có thể không tồn tại (field tuỳ chọn của API, kết quả tìm kiếm)</td>
      <td style="padding:8px 12px;">Để né lỗi compile khi giá trị luôn có: khai báo non-null</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>!</code></td>
      <td style="padding:8px 12px;">Ngay sau một bất biến mà compiler không thấy được, có comment giải thích</td>
      <td style="padding:8px 12px;">Thay cho kiểm tra null; trên dữ liệu từ ngoài (API, input)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>Object?</code></td>
      <td style="padding:8px 12px;">Giá trị chưa biết kiểu, sẽ kiểm tra bằng <code>is</code> hoặc pattern</td>
      <td style="padding:8px 12px;">Đã biết kiểu: khai báo kiểu cụ thể</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>dynamic</code></td>
      <td style="padding:8px 12px;">Ranh giới thật sự động, đóng lại ngay sau đó</td>
      <td style="padding:8px 12px;">Logic nghiệp vụ, tham số và kiểu trả về của API</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Record</td>
      <td style="padding:8px 12px;">Trả nhiều giá trị từ một hàm, key ghép tạm thời, dữ liệu ngắn sống trong vài dòng</td>
      <td style="padding:8px 12px;">Khái niệm của domain cần tên, method, validation, hoặc đi qua nhiều tầng: dùng class</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Generics có bound</td>
      <td style="padding:8px 12px;">Logic giống nhau cho nhiều kiểu cùng có một năng lực (<code>num</code>, <code>Comparable</code>)</td>
      <td style="padding:8px 12px;">Chỉ có một kiểu dùng thật: đừng tổng quát hoá sớm</td>
    </tr>
  </tbody>
</table>

<h2>Sai lầm thường gặp</h2>

<ol>
  <li><strong>Nhầm <code>final</code> với bất biến.</strong> <code>final cart = &lt;String&gt;[]; cart.add('Ốp lưng');</code> hợp lệ: <code>final</code> chỉ khoá nhãn. Cần bất biến thì dùng <code>const</code> hoặc <code>List.unmodifiable</code> (<a href="collections_functional.md" target="_blank" rel="noopener">1.2.4</a>).</li>
  <li><strong>Để inference ra <code>dynamic</code>.</strong> <code>var items = [];</code> là <code>List&lt;dynamic&gt;</code>, <code>var cache;</code> là <code>dynamic</code>. Sửa: <code>final items = &lt;String&gt;[];</code>, hoặc khai báo kiểu khi chưa có giá trị. Bật <code>strict-inference</code> và <code>strict-raw-types</code> trong <code>analysis_options.yaml</code> để analyzer báo các chỗ này.</li>
  <li><strong>Dùng <code>!</code> để "tắt" lỗi nullable.</strong> <code>user.avatarUrl!</code> compile được, nhưng khi API không trả field đó thì runtime ném <code>Null check operator used on a null value</code>. Sửa: xử lý null bằng <code>??</code>/<code>if</code>, hoặc sửa model thành non-null nếu field luôn có.</li>
  <li><strong>Kiểm tra null trên field public rồi dùng luôn.</strong> <code>if (user.nickname != null) print(user.nickname.length);</code> là lỗi compile vì field public không promote được. Đừng sửa bằng <code>!</code>; chép vào biến local như ví dụ <code>displayName</code>.</li>
  <li><strong>Gán <code>dynamic</code> thẳng vào kiểu cụ thể.</strong> <code>int price = json['price'];</code> compile được nhưng <code>TypeError</code> khi API trả <code>"450000"</code>. Sửa: nhận về <code>Object?</code>, kiểm tra bằng <code>is</code> như ví dụ đọc JSON.</li>
  <li><strong>Dùng <code>late</code> thay cho nullable.</strong> <code>late User currentUser;</code> cho người dùng chưa đăng nhập sẽ ném <code>LateInitializationError</code> ở màn hình nào đó đọc nó trước khi đăng nhập. "Chưa có" là trạng thái hợp lệ, nên mô hình hoá bằng <code>User?</code>.</li>
  <li><strong>Tin rằng generics bị xoá như JVM.</strong> Thói quen Kotlin viết <code>as List&lt;Product&gt;</code> "cho qua" không dùng được: Dart kiểm tra thật và ném <code>TypeError</code> nếu list thật là <code>List&lt;dynamic&gt;</code>. Muốn đổi kiểu phần tử thì tạo list mới (<code>List&lt;Product&gt;.from(...)</code>, <code>cast</code> ở <a href="collections_functional.md" target="_blank" rel="noopener">1.2.4</a>).</li>
  <li><strong>Đếm ký tự bằng <code>String.length</code>.</strong> Giới hạn "tối đa 20 ký tự" sẽ đếm sai với emoji; dùng <code>characters.length</code>.</li>
</ol>

<h2>Lịch sử phát triển</h2>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Phiên bản</th>
      <th style="padding:8px 12px;text-align:left;">Thay đổi</th>
      <th style="padding:8px 12px;text-align:left;">Vì sao</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Dart 1.0 (11/2013)</td>
      <td style="padding:8px 12px;">Kiểu là <strong>optional</strong>: chỉ được kiểm tra ở checked mode khi phát triển, production mode bỏ qua</td>
      <td style="padding:8px 12px;">Dart ra đời để thay JavaScript trên web, ưu tiên sự linh hoạt của ngôn ngữ động</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Dart 2.0 (08/2018)</td>
      <td style="padding:8px 12px;"><strong>Sound type system</strong> bắt buộc, type inference, kiểm tra runtime cho generics covariant</td>
      <td style="padding:8px 12px;">Flutter cần compile AOT ra mã máy nhanh và tin được thông tin kiểu; kiểu optional không đảm bảo được điều đó</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Dart 2.1</td>
      <td style="padding:8px 12px;">Literal <code>int</code> dùng được ở chỗ cần <code>double</code></td>
      <td style="padding:8px 12px;">Bớt phải viết <code>2.0</code> khi context đã rõ</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Dart 2.12 (03/2021)</td>
      <td style="padding:8px 12px;"><strong>Sound null safety</strong>: <code>T?</code>, <code>late</code>, <code>!</code>, <code>?[]</code>, <code>required</code></td>
      <td style="padding:8px 12px;">Lỗi null là lỗi runtime phổ biến nhất; đưa nó thành lỗi compile, cho phép migrate dần từng package</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Dart 3.0 (05/2023)</td>
      <td style="padding:8px 12px;">Chỉ còn sound null safety; thêm <strong>records</strong> và patterns</td>
      <td style="padding:8px 12px;">Bỏ được chế độ trộn code chưa migrate; records lấp chỗ trống "trả nhiều giá trị" mà trước đó phải tạo class hoặc dùng <code>List&lt;dynamic&gt;</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Dart 3.2</td>
      <td style="padding:8px 12px;">Type promotion cho field <code>final</code> private</td>
      <td style="padding:8px 12px;">Bớt phải chép field ra biến local trong code nội bộ library</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Dart 3.6</td>
      <td style="padding:8px 12px;">Digit separator <code>1_000_000</code></td>
      <td style="padding:8px 12px;">Dễ đọc số lớn</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Dart 3.9</td>
      <td style="padding:8px 12px;">Flow analysis luôn giả định null safety khi tính promotion và reachability</td>
      <td style="padding:8px 12px;">Code trước null safety không còn chạy được trên Dart 3, logic cũ là thừa</td>
    </tr>
  </tbody>
</table>

<h2>Kết nối hệ thống</h2>

<ul>
  <li><strong>Tiên quyết:</strong> <a href="dart_for_kotlin_devs.md" target="_blank" rel="noopener">1.1.1 Dart for Kotlin Developers</a>, bản đồ chuyển đổi từ Kotlin.</li>
  <li><strong>Học tiếp:</strong> <a href="functions_operators.md" target="_blank" rel="noopener">1.2.2 Functions and Operators</a> dùng kiểu để khai báo tham số, function type và <code>typedef</code> (đặt tên cho function type, kiểu record).</li>
  <li><strong>Liên quan:</strong>
<ul>
  <li><a href="control_flow_patterns.md" target="_blank" rel="noopener">1.2.3 Control Flow and Patterns</a>: destructuring record, pattern kiểm tra kiểu thay cho chuỗi <code>is</code>, exhaustiveness dựa trên type system.</li>
  <li><a href="collections_functional.md" target="_blank" rel="noopener">1.2.4 Collections and Functional APIs</a>: <code>List&lt;T&gt;</code>, <code>Map&lt;K, V&gt;</code> là ứng dụng trực tiếp của generics; mutability của collection.</li>
  <li><a href="classes_mixins_sealed.md" target="_blank" rel="noopener">1.2.5 Classes, Mixins and Sealed Types</a>: const constructor, <code>==</code>/<code>hashCode</code>, class thay record khi cần tên và hành vi.</li>
  <li><a href="../async/futures_async_await.md" target="_blank" rel="noopener">1.3.1 Futures and Async/Await</a>: <code>Future&lt;T&gt;</code> là một kiểu generic; null safety và promotion áp dụng y nguyên trong code async.</li>
</ul></li>
  <li><strong>Trong Flutter:</strong> <code>const</code> widget và <code>late</code> trong <code>State</code> ở 3.1.1 Stateless and Stateful Widgets (chưa có bài).</li>
</ul>

<h2>Developer Curiosity Checklist</h2>

<ul>
  <li><code>dynamic</code> và <code>Object?</code> cùng chứa được mọi giá trị; khác nhau ở đâu khi gọi method?</li>
  <li>Khi nào một hàm nên trả về record, khi nào nên trả về class?</li>
</ul>

<h2>Tham khảo</h2>

<ul>
  <li><a href="https://dart.dev/language/variables" target="_blank" rel="noopener">Variables</a>, dart.dev</li>
  <li><a href="https://dart.dev/language/built-in-types" target="_blank" rel="noopener">Built-in types</a>, dart.dev</li>
  <li><a href="https://dart.dev/resources/language/number-representation" target="_blank" rel="noopener">Numbers in Dart</a>, dart.dev</li>
  <li><a href="https://dart.dev/language/type-system" target="_blank" rel="noopener">The Dart type system</a>, dart.dev</li>
  <li><a href="https://dart.dev/null-safety" target="_blank" rel="noopener">Sound null safety</a> và <a href="https://dart.dev/null-safety/understanding-null-safety" target="_blank" rel="noopener">Understanding null safety</a>, dart.dev</li>
  <li><a href="https://dart.dev/tools/non-promotion-reasons" target="_blank" rel="noopener">Fixing type promotion failures</a>, dart.dev</li>
  <li><a href="https://dart.dev/language/generics" target="_blank" rel="noopener">Generics</a>, dart.dev</li>
  <li><a href="https://dart.dev/language/records" target="_blank" rel="noopener">Records</a>, dart.dev</li>
  <li><a href="https://dart.dev/resources/language/evolution" target="_blank" rel="noopener">Language evolution</a>, dart.dev</li>
  <li><a href="https://api.dart.dev/dart-core/int-class.html" target="_blank" rel="noopener">int class</a>, api.dart.dev</li>
</ul>
    `
  },

  'flutter-dart-functions-operators': {
    title: 'Functions and Operators',
    summary: 'Trong Dart, function là một object có kiểu (function type), gói một đoạn code nhận tham số theo chữ ký positional hoặc named và trả về một giá trị; operator là cú pháp viết tắt cho lời gọi một method đặc biệt trên operand bên trái, trừ vài toán tử do ngôn ngữ tự xử lý như &&, ||, ?:, ?? và cascade.',
    status: 'published',
    difficulty: 'beginner',
    estimatedReadingTime: '21 phút',
    depth: 'deep-dive',
    tags: ['flutter', 'dart', 'session-01', 'functions', 'closures', 'tear-off', 'operators', 'cascade'],
    domain: 'Flutter Development',
    module: 'Session 01: Dart Foundations',
    prerequisites: ['flutter.dart.variables_types'],
    related: ['flutter.dart.dart_for_kotlin_devs', 'flutter.dart.control_flow_patterns', 'flutter.dart.collections_functional', 'flutter.dart.classes_mixins_sealed'],
    learningOutcomes: [
      'Phân biệt được tham số positional, optional positional và named, cùng vai trò của required và giá trị default khi thiết kế chữ ký hàm.',
      'Giải thích được vì sao function là object có kiểu, closure capture biến chứ không capture giá trị, và tear-off khác lambda ở điểm nào.',
      'Áp dụng được function type, typedef và closure để thiết kế API nhận callback, như validator hay listener.',
      'Nhận diện được các toán tử có hành vi khác Kotlin như /, ~/, %, == so với identical, độ ưu tiên của bitwise, và cascade .. trả về chính receiver.',
      'Triển khai được operator overloading cho kiểu giá trị của domain, giữ == và hashCode nhất quán.'
    ],
    knowledgeGap: 'Flutter dựng UI hoàn toàn bằng lời gọi hàm có tham số named và callback, nên hiểu sai chữ ký hàm thì đọc không nổi widget tree. Thiếu kiến thức này, developer viết onPressed: submit() khiến hàm chạy ngay khi build, để named parameter quan trọng bị bỏ qua vì quên required, huỷ listener bằng một lambda mới nên listener không bao giờ được gỡ, hoặc tin % và / chạy giống Kotlin rồi tính sai phân trang và chỉ số vòng lặp.',
    updatedAt: '2026-11-10',
    readTime: '21 phút',
    content: `
<h2>Vấn đề cần giải quyết</h2>

<p>Trong một ngôn ngữ, hàm là đơn vị nhỏ nhất để đặt tên cho một hành vi và tái sử dụng nó. Hai câu hỏi thiết kế quyết định code gọi hàm có dễ đọc và an toàn không:</p>

<ul>
  <li><strong>Caller truyền đối số thế nào?</strong> Hàm có năm tham số <code>bool</code>, <code>int</code> truyền theo vị trí thì <code>createOrder(true, false, 3, 0, true)</code> không ai đọc hiểu, và đổi thứ tự là bug im lặng. Tham số tuỳ chọn mà không có default rõ ràng thì mỗi caller tự đoán.</li>
  <li><strong>Hành vi có được truyền đi như dữ liệu không?</strong> Callback khi bấm nút, hàm kiểm tra form, listener khi dữ liệu đổi: tất cả đều là "một đoạn code đưa cho người khác gọi sau". Ngôn ngữ phải cho biết đoạn code đó nhìn thấy biến nào và hai callback khi nào được coi là một.</li>
</ul>

<p>Toán tử có vấn đề riêng: chúng trông giống nhau giữa các ngôn ngữ nhưng ngữ nghĩa thì không. <code>-7 % 3</code> trong Kotlin là <code>-1</code>, trong Dart là <code>2</code>; <code>a &amp; b != 0</code> trong Java là lỗi compile, trong Dart lại đúng ý. Không biết toán tử thực chất là gì thì không biết khi nào nó được override, khi nào nó so identity, khi nào nó trả về chính object bên trái.</p>

<p>Flutter làm vấn đề này rõ hơn: UI là cây lời gọi constructor với tham số named, và mọi tương tác là callback.</p>

<pre data-lang="dart"><code>// Code Flutter: chỉ cần thấy hình dạng lời gọi
ElevatedButton(
  onPressed: submitOrder,          // truyền hàm, không gọi hàm
  child: const Text('Đặt hàng'),
)</code></pre>

<h2>Sau khi học xong</h2>

<ul>
  <li>Phân biệt được tham số positional, optional positional và named, cùng vai trò của required và giá trị default khi thiết kế chữ ký hàm.</li>
  <li>Giải thích được vì sao function là object có kiểu, closure capture biến chứ không capture giá trị, và tear-off khác lambda ở điểm nào.</li>
  <li>Áp dụng được function type, typedef và closure để thiết kế API nhận callback, như validator hay listener.</li>
  <li>Nhận diện được các toán tử có hành vi khác Kotlin như /, ~/, %, == so với identical, độ ưu tiên của bitwise, và cascade .. trả về chính receiver.</li>
  <li>Triển khai được operator overloading cho kiểu giá trị của domain, giữ == và hashCode nhất quán.</li>
</ul>

<h2>Functions and Operators là gì?</h2>

<p>Trong Dart, <strong>function</strong> là một <strong>object có kiểu</strong> (function type), gói một đoạn code nhận tham số theo chữ ký đã khai báo (positional hoặc named) và trả về một giá trị. <strong>Operator</strong> là cú pháp viết tắt cho lời gọi một method đặc biệt trên operand bên trái (<code>a + b</code> là <code>a.+(b)</code>), trừ vài toán tử do ngôn ngữ tự xử lý: <code>&amp;&amp;</code>, <code>||</code>, <code>!</code>, <code>?:</code>, <code>??</code>, <code>is</code>, <code>as</code> và cascade <code>..</code>.</p>

<p>Mental model dùng xuyên suốt bài: <strong>mọi thứ là lời gọi</strong>. Hàm là một giá trị có thể gọi được, nên cất vào biến, truyền đi, trả về như mọi giá trị khác; toán tử là lời gọi method được viết gọn, nên class của bạn tự định nghĩa được ý nghĩa của <code>+</code> hay <code>==</code>.</p>

<h2>Cách hoạt động</h2>

<h3>Khai báo hàm và arrow syntax</h3>

<p>Kiểu trả về đứng <strong>trước</strong> tên hàm, không có từ khoá <code>fun</code>. Thân hàm chỉ có một biểu thức thì viết bằng arrow <code>=&gt;</code>, tương đương <code>= expr</code> của Kotlin.</p>

<pre data-lang="dart"><code>// cart_utils.dart
int subtotal(int unitPrice, int quantity) {   // kiểu trả về đứng trước tên hàm
  return unitPrice * quantity;
}

int shippingFee(int subtotal) =&gt; subtotal &gt;= 300000 ? 0 : 30000; // arrow: thân là một biểu thức

void logCheckout(String orderId) {
  print('checkout $orderId');                  // không có return: hàm trả về null
}

void main() {
  final total = subtotal(150000, 2);
  print('$total + ship \${shippingFee(total)}');
  logCheckout('HCM-0001');
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>300000 + ship 0
checkout HCM-0001</code></pre>

<ul>
  <li>Mọi hàm đều trả về một giá trị; không có <code>return</code> thì Dart ngầm thêm <code>return null;</code>. Kiểu <code>void</code> nói rằng giá trị đó không được dùng.</li>
  <li>Sau <code>=&gt;</code> chỉ là <strong>biểu thức</strong>, không phải câu lệnh: không viết được <code>=&gt; if (...)</code>, nhưng viết được <code>=&gt; a ? b : c</code>.</li>
  <li>Hàm khai báo được ở top-level, trong class (method) và <strong>bên trong hàm khác</strong> (local function).</li>
  <li>Điểm vào chương trình là hàm top-level <code>main()</code>, có thể nhận <code>List&lt;String&gt; args</code>.</li>
  <li>Hàm có type parameter (<code>T first&lt;T&gt;(List&lt;T&gt; items)</code>) là generics, được học ở <a href="variables_and_types.md" target="_blank" rel="noopener">1.2.1 Variables and Types</a>. Hàm <code>async</code> thuộc <a href="../async/futures_async_await.md" target="_blank" rel="noopener">1.3.1 Futures and Async/Await</a>, hàm generator <code>sync*</code> thuộc <a href="collections_functional.md" target="_blank" rel="noopener">1.2.4 Collections and Functional APIs</a>.</li>
</ul>

<h3>Tham số: positional, optional positional, named</h3>

<p>Dart có ba kiểu tham số, mỗi kiểu một cách gọi:</p>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Kiểu</th>
      <th style="padding:8px 12px;text-align:left;">Khai báo</th>
      <th style="padding:8px 12px;text-align:left;">Khi gọi</th>
      <th style="padding:8px 12px;text-align:left;">Bỏ qua được không</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Positional bắt buộc</td>
      <td style="padding:8px 12px;"><code>(String baseUrl)</code></td>
      <td style="padding:8px 12px;">Theo vị trí, không kèm tên</td>
      <td style="padding:8px 12px;">Không</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Optional positional</td>
      <td style="padding:8px 12px;"><code>([String unit = 'đ'])</code></td>
      <td style="padding:8px 12px;">Theo vị trí, không kèm tên</td>
      <td style="padding:8px 12px;">Được, nhận default hoặc null</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Named</td>
      <td style="padding:8px 12px;"><code>({int pageSize = 20, String? query})</code></td>
      <td style="padding:8px 12px;"><strong>Bắt buộc kèm tên</strong>, thứ tự tuỳ ý</td>
      <td style="padding:8px 12px;">Được, trừ khi có <code>required</code></td>
    </tr>
  </tbody>
</table>

<p>Quy tắc của chữ ký:</p>

<ul>
  <li>Một hàm có thể có positional bắt buộc, theo sau là <strong>hoặc</strong> nhóm <code>[...]</code> <strong>hoặc</strong> nhóm <code>{...}</code>, không có cả hai.</li>
  <li>Tham số tuỳ chọn có kiểu non-nullable thì <strong>phải</strong> có default (<code>int pageSize = 20</code>); nếu không, compiler báo lỗi vì default ngầm là <code>null</code>. Kiểu nullable (<code>String? query</code>) thì default là <code>null</code>.</li>
  <li>Giá trị default phải là <strong>hằng compile-time</strong>. Không viết được <code>{DateTime at = DateTime.now()}</code>; cách thường dùng là <code>DateTime? at</code> rồi <code>at ?? DateTime.now()</code> trong thân hàm.</li>
  <li><code>required</code> biến tham số named thành bắt buộc. Khác Kotlin, nơi mọi tham số không có default đều bắt buộc, named của Dart <strong>mặc định là tuỳ chọn</strong>.</li>
  <li>Từ Dart 2.17, đối số named có thể đặt ở bất kỳ vị trí nào trong lời gọi, kể cả trước đối số positional.</li>
</ul>

<h4>Ví dụ: dựng URL lấy danh sách sản phẩm</h4>

<p><strong>Bài toán:</strong> hàm dựng URL cho API sản phẩm: địa chỉ server luôn có (positional), số trang bắt buộc nhưng phải đọc được ở chỗ gọi (named + <code>required</code>), cỡ trang có giá trị chuẩn (default), từ khoá tìm kiếm có thể không có (nullable).</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li>Đối số positional được gán theo vị trí cho <code>baseUrl</code>.</li>
  <li>Đối số named được gán theo tên; thiếu <code>page</code> là lỗi compile vì có <code>required</code>.</li>
  <li>Tham số named không được truyền nhận default (<code>pageSize = 20</code>) hoặc <code>null</code> (<code>query</code>).</li>
  <li>Thân hàm rẽ nhánh theo <code>query</code> có null hay không.</li>
</ol>

<div class="mermaid">
flowchart TD
    A["Lời gọi productsUrl(api, page: 2, query: 'tai nghe')"] --&gt; B["(1) gán theo vị trí: baseUrl"]
    B --&gt; C["(2) gán theo tên: page, query"]
    C --&gt; D["(3) thiếu pageSize: nhận default 20"]
    D --&gt; E{"(4) query == null?"}
    E --&gt;|"có"| F["trả URL không lọc"]
    E --&gt;|"không"| G["trả URL kèm q=..."]
</div>

<pre data-lang="dart"><code>// product_api.dart
String productsUrl(
  String baseUrl, {      // (1) positional bắt buộc: truyền theo vị trí, không kèm tên
  required int page,     // (2) named + required: phải truyền, kèm tên
  int pageSize = 20,     // (3) named có default: bỏ qua thì nhận 20
  String? query,         // (3) named nullable: bỏ qua thì nhận null
}) {
  final url = '$baseUrl/products?page=$page&amp;size=$pageSize';
  if (query == null) return url;                              // (4) không lọc
  return '$url&amp;q=\${Uri.encodeQueryComponent(query)}';         // (4) có từ khoá
}

String formatVnd(int amount, [String unit = 'đ']) =&gt; '$amount$unit'; // optional positional

void main() {
  const api = 'https://api.example.com';
  print(productsUrl(api, page: 1));
  print(productsUrl(api, query: 'tai nghe', page: 2));   // named: thứ tự tuỳ ý
  print(productsUrl(page: 3, api, pageSize: 50));        // named đặt trước positional (Dart 2.17+)
  print(formatVnd(450000));
  print(formatVnd(450, 'k'));
  // productsUrl(api);                 // lỗi compile: thiếu 'page'
  // productsUrl(api, 1);              // lỗi compile: page là named, phải ghi page: 1
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>https://api.example.com/products?page=1&amp;size=20
https://api.example.com/products?page=2&amp;size=20&amp;q=tai+nghe
https://api.example.com/products?page=3&amp;size=50
450000đ
450k</code></pre>

<p>Quy ước thực tế (cũng là cách API của Flutter được thiết kế): positional cho một hai đối số hiển nhiên từ tên hàm, named cho mọi thứ còn lại, đặc biệt là cờ <code>bool</code>. Optional positional <code>[...]</code> ít dùng.</p>

<h3>Function là object và function type</h3>

<p>Hàm là object, thuộc một <strong>function type</strong> viết theo dạng <code>ReturnType Function(ParamTypes)</code>: <code>int Function(int)</code>, <code>void Function()</code>, <code>String? Function(String value)</code>. Function type khai báo được cả tham số named: <code>void Function({required int page})</code>. Mọi function type đều là kiểu con của <code>Function</code>.</p>

<p>Vì là object, hàm:</p>

<ul>
  <li>gán được vào biến và field;</li>
  <li>truyền được làm đối số (callback), trả về được từ hàm khác (higher-order function);</li>
  <li>được tạo tại chỗ dưới dạng <strong>anonymous function</strong> (lambda): <code>(price) =&gt; price - 50000</code> hoặc <code>(int price) { ... }</code>.</li>
</ul>

<pre data-lang="dart"><code>// discount.dart
int applyDiscount(int priceVnd, int Function(int) rule) =&gt; rule(priceVnd);

int memberDiscount(int priceVnd) =&gt; priceVnd - 20000;       // hàm top-level

void main() {
  int Function(int) rule = memberDiscount;                  // gán hàm vào biến
  print(applyDiscount(500000, rule));                       // truyền hàm như tham số
  print(applyDiscount(500000, (price) =&gt; price - 50000));   // anonymous function dạng arrow
  final flashSale = (int price) {                           // anonymous function có thân block
    final discounted = price - 100000;
    if (discounted &lt; 50000) return 50000;                   // giá sàn
    return discounted;
  };
  print(applyDiscount(120000, flashSale));
  print(flashSale.runtimeType);
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>480000
450000
50000
(int) =&gt; int</code></pre>

<p>Khác Kotlin: Dart không có cú pháp trailing lambda (đặt lambda ngoài ngoặc), không có <code>it</code> ngầm định, và lambda viết bằng <code>(x) =&gt; ...</code> hoặc <code>(x) { ... }</code> chứ không phải <code>{ x -&gt; ... }</code>. Tham số của callback không dùng tới thì đặt tên <code>_</code>; từ Dart 3.7, <code>_</code> là wildcard nên viết được <code>(_, _) =&gt; ...</code> cho hai tham số đều bỏ qua.</p>

<p>Một class có method <code>call</code> cũng gọi được như hàm (callable object): <code>validator(value)</code> gọi <code>validator.call(value)</code>. Đây là cùng ý "mọi thứ là lời gọi".</p>

<h3>typedef: đặt tên cho kiểu</h3>

<p><code>typedef</code> đặt một cái tên cho một kiểu có sẵn, thường là function type dài hoặc lặp lại:</p>

<pre data-lang="dart"><code>typedef PriceListener = void Function(int priceVnd);
typedef Validator = String? Function(String value);
typedef LatLng = ({double lat, double lng});      // từ Dart 2.13 typedef dùng được cho mọi kiểu, kể cả record</code></pre>

<p><code>typedef</code> <strong>không tạo kiểu mới</strong>: <code>PriceListener</code> và <code>void Function(int)</code> là cùng một kiểu, gán qua lại tự do. Tên tham số trong typedef (<code>priceVnd</code>) chỉ để làm tài liệu. Flutter dùng typedef khắp nơi: <code>VoidCallback</code> là <code>void Function()</code>, <code>ValueChanged&lt;T&gt;</code> là <code>void Function(T value)</code>, <code>FormFieldValidator&lt;T&gt;</code> là <code>String? Function(T? value)</code>. Cần một kiểu thật sự mới (không gán lẫn được) thì dùng class hoặc extension type ở <a href="classes_mixins_sealed.md" target="_blank" rel="noopener">1.2.5 Classes, Mixins and Sealed Types</a>.</p>

<h3>Closure: hàm mang theo phạm vi nơi nó được tạo</h3>

<p>Dart dùng <strong>lexical scope</strong>: một hàm nhìn thấy biến dựa vào <strong>nơi hàm được viết</strong> trong code, không phải nơi nó được gọi. Hàm lồng bên trong nhìn thấy biến của hàm bao ngoài.</p>

<p><strong>Closure</strong> là một function object cùng với các biến của phạm vi bao ngoài mà nó dùng tới. Điểm mấu chốt: closure <strong>capture chính biến</strong>, không chụp lại giá trị tại lúc tạo. Biến đó sống tiếp sau khi hàm bao ngoài đã return, và mọi thay đổi qua closure đều thấy được ở lần gọi sau.</p>

<h4>Ví dụ: bộ sinh mã đơn hàng theo từng cửa hàng</h4>

<p><strong>Bài toán:</strong> mỗi cửa hàng cần mã đơn tăng dần riêng (<code>HCM-0001</code>, <code>HCM-0002</code>, <code>HN-0001</code>). Bộ đếm không được lộ ra ngoài để code khác sửa nhầm.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li>Gọi <code>orderCodeGenerator('HCM')</code>: tạo biến local <code>sequence = 0</code> của riêng lần gọi này.</li>
  <li>Hàm trả về một closure capture <code>storeCode</code> và <code>sequence</code>; hàm bao ngoài kết thúc nhưng hai biến vẫn sống vì closure còn giữ.</li>
  <li>Mỗi lần gọi closure, nó tăng <strong>đúng biến <code>sequence</code> đã capture</strong> và trả về mã mới.</li>
  <li>Closure của HN tăng biến <code>sequence</code> riêng, tạo ra ở lần gọi <code>orderCodeGenerator('HN')</code>, nên hai cửa hàng đếm độc lập.</li>
</ol>

<div class="mermaid">
sequenceDiagram
    participant M as main
    participant G as orderCodeGenerator
    participant C1 as closure HCM
    participant C2 as closure HN
    M-&gt;&gt;G: (1) orderCodeGenerator('HCM')
    G--&gt;&gt;M: (2) closure C1 giữ sequence = 0
    M-&gt;&gt;G: (1) orderCodeGenerator('HN')
    G--&gt;&gt;M: (2) closure C2 giữ một sequence khác
    M-&gt;&gt;C1: (3) gọi lần 1
    C1--&gt;&gt;M: HCM-0001
    M-&gt;&gt;C1: (3) gọi lần 2
    C1--&gt;&gt;M: HCM-0002
    M-&gt;&gt;C2: (4) gọi lần 1
    C2--&gt;&gt;M: HN-0001
</div>

<pre data-lang="dart"><code>// order_code.dart
String Function() orderCodeGenerator(String storeCode) {
  var sequence = 0;                                   // (1) biến local của riêng lần gọi này
  return () {                                         // (2) closure capture storeCode và sequence
    sequence++;                                       // (3) sửa đúng biến đã capture, không phải bản sao
    return '$storeCode-\${sequence.toString().padLeft(4, '0')}';
  };
}

void main() {
  final nextHcm = orderCodeGenerator('HCM');          // (1)(2) một biến sequence cho HCM
  final nextHn = orderCodeGenerator('HN');            // (1)(2) một biến sequence khác cho HN
  print(nextHcm());                                   // (3)
  print(nextHcm());
  print(nextHn());                                    // (4) HN đếm độc lập với HCM
  print(nextHcm());
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>HCM-0001
HCM-0002
HN-0001
HCM-0003</code></pre>

<h4>Closure trong vòng lặp</h4>

<p>Vì closure capture biến, câu hỏi là: mỗi vòng lặp có biến riêng không? Với <code>for (var i = 0; ...)</code> của Dart, <strong>có</strong>: mỗi vòng lặp có một bản riêng của biến lặp (khác <code>var</code> của JavaScript). Bẫy thật nằm ở biến khai báo <strong>bên ngoài</strong> vòng lặp:</p>

<pre data-lang="dart"><code>void main() {
  final retryActions = &lt;void Function()&gt;[];
  for (var attempt = 1; attempt &lt;= 3; attempt++) {
    retryActions.add(() =&gt; print('thử lại lần $attempt'));   // mỗi vòng có biến attempt riêng
  }
  for (final retry in retryActions) {
    retry();
  }

  var current = 1;                                            // một biến chung, khai báo ngoài vòng lặp
  final logActions = &lt;void Function()&gt;[];
  while (current &lt;= 3) {
    logActions.add(() =&gt; print('log lần $current'));
    current++;
  }
  for (final log in logActions) {
    log();                                                    // cả ba đọc cùng biến current, đã là 4
  }
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>thử lại lần 1
thử lại lần 2
thử lại lần 3
log lần 4
log lần 4
log lần 4</code></pre>

<p>Muốn closure giữ giá trị tại thời điểm tạo thì chép vào một biến <code>final</code> khai báo bên trong vòng lặp (<code>final snapshot = current;</code>) rồi capture biến đó. Vòng lặp được học ở <a href="control_flow_patterns.md" target="_blank" rel="noopener">1.2.3 Control Flow and Patterns</a>.</p>

<h3>Tear-off: dùng chính hàm có sẵn làm giá trị</h3>

<p><strong>Tear-off</strong> là việc nhắc tên một hàm, method hoặc constructor <strong>mà không có ngoặc gọi</strong>, để lấy function object của nó:</p>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Loại</th>
      <th style="padding:8px 12px;text-align:left;">Ví dụ</th>
      <th style="padding:8px 12px;text-align:left;">Ý nghĩa</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Hàm top-level hoặc static</td>
      <td style="padding:8px 12px;"><code>print</code>, <code>int.parse</code></td>
      <td style="padding:8px 12px;">Function object trỏ tới hàm đó</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Instance method</td>
      <td style="padding:8px 12px;"><code>buffer.write</code>, <code>_onPrice</code></td>
      <td style="padding:8px 12px;">Function object <strong>gắn với receiver</strong> cụ thể (<code>buffer</code>, <code>this</code>)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Constructor (từ Dart 2.15)</td>
      <td style="padding:8px 12px;"><code>Product.new</code>, <code>DateTime.fromMillisecondsSinceEpoch</code></td>
      <td style="padding:8px 12px;">Function object tạo object mới</td>
    </tr>
  </tbody>
</table>

<p>So với lambda bọc lại (<code>(x) =&gt; print(x)</code>), tear-off ngắn hơn, và quan trọng hơn: <strong>tear-off của cùng một method trên cùng một object thì bằng nhau</strong> (<code>==</code>), còn mỗi lần viết lambda là một function object mới, không bằng lambda nào khác. Các API "đăng ký rồi huỷ" (<code>addListener</code>/<code>removeListener</code> của <code>ChangeNotifier</code> trong Flutter) tìm callback cần huỷ bằng <code>==</code>, nên khác biệt này quyết định listener có được gỡ hay không.</p>

<h4>Ví dụ: đăng ký và huỷ listener khi giá thay đổi</h4>

<p><strong>Bài toán:</strong> badge hiển thị giá đăng ký nhận giá mới từ một nguồn; khi badge bị huỷ (màn hình đóng) phải gỡ listener, nếu không nguồn giá vẫn giữ badge (rò bộ nhớ) và tiếp tục gọi vào nó.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li><code>attach()</code> đăng ký tear-off <code>_onPrice</code>, function object gắn với chính badge này.</li>
  <li><code>publish()</code> duyệt danh sách listener và gọi từng cái.</li>
  <li><code>detach()</code> tạo tear-off <code>_onPrice</code> lần nữa; nó <code>==</code> tear-off ở bước 1 nên <code>remove</code> tìm thấy và gỡ được.</li>
  <li>Lần <code>publish()</code> sau không còn listener nào. Bản dùng lambda thì bước 3 tạo một lambda mới, <code>remove</code> không tìm thấy, listener còn lại.</li>
</ol>

<div class="mermaid">
sequenceDiagram
    participant B as PriceBadge
    participant T as PriceTicker
    B-&gt;&gt;T: (1) addListener(_onPrice)
    T-&gt;&gt;B: (2) publish gọi _onPrice(450000)
    B-&gt;&gt;T: (3) removeListener(_onPrice), tear-off mới nhưng bằng cái cũ
    Note over T: remove tìm thấy, danh sách rỗng
    T-&gt;&gt;T: (4) publish(420000), không gọi ai
</div>

<pre data-lang="dart"><code>// price_ticker.dart
typedef PriceListener = void Function(int priceVnd);

class PriceTicker {
  final _listeners = &lt;PriceListener&gt;[];
  void addListener(PriceListener listener) =&gt; _listeners.add(listener);
  void removeListener(PriceListener listener) =&gt; _listeners.remove(listener); // remove so bằng ==
  void publish(int priceVnd) {
    for (final listener in _listeners) {
      listener(priceVnd);
    }
  }
  int get listenerCount =&gt; _listeners.length;
}

class PriceBadge {
  PriceBadge(this.ticker);
  final PriceTicker ticker;

  void attach() =&gt; ticker.addListener(_onPrice);      // (1) tear-off: giá trị hàm gắn với this
  void detach() =&gt; ticker.removeListener(_onPrice);   // (3) tear-off mới, nhưng == tear-off ở (1)
  void _onPrice(int priceVnd) =&gt; print('Badge hiển thị $priceVnd đ');
}

class BuggyBadge {
  BuggyBadge(this.ticker);
  final PriceTicker ticker;

  void attach() =&gt; ticker.addListener((price) =&gt; _onPrice(price));    // closure A
  void detach() =&gt; ticker.removeListener((price) =&gt; _onPrice(price)); // closure B, khác A
  void _onPrice(int priceVnd) =&gt; print('BuggyBadge hiển thị $priceVnd đ');
}

void main() {
  final ticker = PriceTicker();
  final badge = PriceBadge(ticker);
  badge.attach();                                     // (1)
  ticker.publish(450000);                             // (2) ticker gọi listener
  badge.detach();                                     // (3)
  ticker.publish(420000);                             // (4) không còn ai nhận
  print('Sau detach PriceBadge: \${ticker.listenerCount} listener');

  final buggy = BuggyBadge(ticker);
  buggy.attach();
  buggy.detach();
  print('Sau detach BuggyBadge: \${ticker.listenerCount} listener'); // vẫn còn 1: rò listener
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>Badge hiển thị 450000 đ
Sau detach PriceBadge: 0 listener
Sau detach BuggyBadge: 1 listener</code></pre>

<p>Giá <code>420000</code> không được in: listener đã bị gỡ ở bước 3. Nếu thật sự cần lambda (ví dụ phải truyền thêm tham số), lưu lambda vào một field rồi dùng <strong>cùng field đó</strong> cho cả <code>add</code> và <code>remove</code>.</p>

<h3>Toán tử: bức tranh chung và độ ưu tiên</h3>

<p>Phần lớn toán tử của Dart là method trên operand bên trái: <code>a + b</code> gọi <code>a.+(b)</code>, <code>a[i]</code> gọi method <code>operator []</code> của <code>a</code>, <code>-a</code> gọi <code>a.-()</code> (unary minus). Vì vậy <code>int</code>, <code>String</code>, <code>List</code> mỗi kiểu tự định nghĩa <code>+</code> riêng, và class của bạn cũng làm được (phần operator overloading bên dưới). Một số toán tử thì do ngôn ngữ xử lý trực tiếp và không override được: <code>&amp;&amp;</code>, <code>||</code>, <code>!</code>, <code>?:</code>, <code>??</code>, <code>is</code>, <code>as</code>, <code>..</code>, và <code>!=</code> (luôn là phủ định của <code>==</code>).</p>

<p>Độ ưu tiên từ cao xuống thấp, rút gọn từ bảng của dart.dev:</p>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Mức</th>
      <th style="padding:8px 12px;text-align:left;">Toán tử</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Postfix</td>
      <td style="padding:8px 12px;"><code>expr++</code>, <code>expr--</code>, <code>()</code>, <code>[]</code>, <code>?[]</code>, <code>.</code>, <code>?.</code>, <code>!</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Prefix</td>
      <td style="padding:8px 12px;"><code>-expr</code>, <code>!expr</code>, <code>~expr</code>, <code>++expr</code>, <code>--expr</code>, <code>await expr</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Nhân</td>
      <td style="padding:8px 12px;"><code>*</code>, <code>/</code>, <code>%</code>, <code>~/</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Cộng</td>
      <td style="padding:8px 12px;"><code>+</code>, <code>-</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Shift</td>
      <td style="padding:8px 12px;"><code>&lt;&lt;</code>, <code>&gt;&gt;</code>, <code>&gt;&gt;&gt;</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Bitwise</td>
      <td style="padding:8px 12px;"><code>&amp;</code>, rồi <code>^</code>, rồi \`</td>
      <td style="padding:8px 12px;">\`</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">So sánh và kiểm tra kiểu</td>
      <td style="padding:8px 12px;"><code>&gt;=</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&lt;</code>, <code>as</code>, <code>is</code>, <code>is!</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Bằng nhau</td>
      <td style="padding:8px 12px;"><code>==</code>, <code>!=</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Logic</td>
      <td style="padding:8px 12px;"><code>&amp;&amp;</code>, rồi \`</td>
      <td style="padding:8px 12px;"></td>
      <td style="padding:8px 12px;">\`</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">If-null</td>
      <td style="padding:8px 12px;"><code>??</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Điều kiện</td>
      <td style="padding:8px 12px;"><code>?:</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Cascade</td>
      <td style="padding:8px 12px;"><code>..</code>, <code>?..</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Gán</td>
      <td style="padding:8px 12px;"><code>=</code>, <code>+=</code>, <code>??=</code> và các dạng gán kép khác</td>
    </tr>
  </tbody>
</table>

<p>Hai hệ quả hay gặp:</p>

<ul>
  <li>Bitwise đứng <strong>trên</strong> so sánh bằng, nên <code>flags &amp; mask != 0</code> của Dart được hiểu là <code>(flags &amp; mask) != 0</code>. Trong Java/C thì ngược lại.</li>
  <li><code>??</code> đứng <strong>dưới</strong> <code>+</code>, nên <code>count ?? 0 + 1</code> là <code>count ?? (0 + 1)</code> (sai lầm 8 bên dưới). Bản thân toán tử null-aware được học ở <a href="variables_and_types.md" target="_blank" rel="noopener">1.2.1 Variables and Types</a>.</li>
</ul>

<h3>Toán tử số học</h3>

<pre data-lang="dart"><code>void main() {
  print(7 / 2);            // 3.5: / luôn trả về double
  print(6 / 2);            // 3.0: kể cả khi chia hết
  print(7 ~/ 2);           // 3: chia lấy phần nguyên (cắt về phía 0)
  print(-7 ~/ 2);          // -3
  print(-7 % 3);           // 2: % của Dart luôn không âm
  print((-7).remainder(3)); // -1: giống % của Kotlin/Java
  var stock = 10;
  stock -= 3;              // compound assignment
  stock++;
  print(stock);            // 8
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>3.5
3.0
3
-3
2
-1
8</code></pre>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Toán tử</th>
      <th style="padding:8px 12px;text-align:left;">Dart</th>
      <th style="padding:8px 12px;text-align:left;">Kotlin</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>7 / 2</code></td>
      <td style="padding:8px 12px;"><code>3.5</code> (<code>double</code>)</td>
      <td style="padding:8px 12px;"><code>3</code> (<code>Int / Int</code> là chia nguyên)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Chia nguyên</td>
      <td style="padding:8px 12px;"><code>7 ~/ 2</code></td>
      <td style="padding:8px 12px;"><code>7 / 2</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>-7 % 3</code></td>
      <td style="padding:8px 12px;"><code>2</code> (modulo Euclid, không âm)</td>
      <td style="padding:8px 12px;"><code>-1</code> (dấu theo số bị chia)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Phần dư theo dấu số bị chia</td>
      <td style="padding:8px 12px;"><code>(-7).remainder(3)</code></td>
      <td style="padding:8px 12px;"><code>-7 % 3</code> hoặc <code>(-7).rem(3)</code></td>
    </tr>
  </tbody>
</table>

<p><code>++</code>, <code>--</code>, <code>+=</code> và các dạng gán kép hoạt động như Kotlin. Viết <code>x += y</code> là gọi <code>x = x + y</code>, nên class chỉ cần định nghĩa <code>+</code>.</p>

<h3>So sánh và equality: == và identical</h3>

<ul>
  <li><code>==</code> hỏi "hai object có <strong>tương đương</strong> không", theo định nghĩa của class. Mặc định (kế thừa từ <code>Object</code>) là so identity; <code>String</code>, <code>int</code> override để so theo giá trị.</li>
  <li><code>identical(a, b)</code> hỏi "có phải <strong>cùng một object</strong> không", không override được. Tương đương <code>===</code> của Kotlin.</li>
  <li>Trước khi gọi method <code>==</code>, ngôn ngữ xử lý null: hai vế cùng null là <code>true</code>, một vế null là <code>false</code>; chỉ khi cả hai khác null mới gọi <code>a.==(b)</code>. Vì vậy method <code>==</code> không bao giờ nhận <code>null</code>.</li>
</ul>

<pre data-lang="dart"><code>class CartItem {
  const CartItem(this.productId);
  final int productId;
}
void main() {
  final a = CartItem(7);
  final b = CartItem(7);
  print(a == b);                          // false: == mặc định của Object so identity
  print(identical(a, a));                 // true
  print('tai nghe' == 'tai ' 'nghe');     // true: String override == theo nội dung
  print(identical(const CartItem(7), const CartItem(7))); // true: hằng const được canonicalize
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>false
true
true
true</code></pre>

<p>Class thường không có <code>equals</code> tự sinh như <code>data class</code> của Kotlin: muốn so theo giá trị thì override <code>operator ==</code> (phần operator overloading bên dưới; <code>hashCode</code> và codegen ở <a href="classes_mixins_sealed.md" target="_blank" rel="noopener">1.2.5 Classes, Mixins and Sealed Types</a>). Equality của record ở <a href="variables_and_types.md" target="_blank" rel="noopener">1.2.1</a>; <code>List</code> <strong>không</strong> so theo phần tử như Kotlin, xem <a href="collections_functional.md" target="_blank" rel="noopener">1.2.4 Collections and Functional APIs</a>.</p>

<h3>Toán tử logic, bitwise và điều kiện</h3>

<ul>
  <li><strong>Logic</strong>: <code>&amp;&amp;</code>, <code>||</code>, <code>!</code> chỉ nhận <code>bool</code> và đánh giá tắt (short-circuit): <code>user != null &amp;&amp; user.isActive</code> không đọc <code>isActive</code> khi <code>user</code> null.</li>
  <li><strong>Bitwise và shift</strong> trên <code>int</code>: <code>&amp;</code>, <code>|</code>, <code>^</code>, <code>~</code>, <code>&lt;&lt;</code>, <code>&gt;&gt;</code> (shift có dấu), <code>&gt;&gt;&gt;</code> (shift không dấu, từ Dart 2.14). Kotlin dùng infix function <code>and</code>, <code>or</code>, <code>xor</code>, <code>shl</code>; Dart dùng ký hiệu như Java.</li>
  <li><strong>Điều kiện</strong>: <code>condition ? a : b</code> là biểu thức, dùng được trong interpolation, trong đối số, sau <code>=&gt;</code>. Kotlin không cần toán tử này vì <code>if</code> của Kotlin là biểu thức; <code>if</code> của Dart là câu lệnh (<a href="control_flow_patterns.md" target="_blank" rel="noopener">1.2.3</a>).</li>
</ul>

<p>Bitwise ít gặp trong code app, chủ yếu khi đọc cờ từ API hoặc platform:</p>

<pre data-lang="dart"><code>// notification_settings.dart
const orderUpdates = 1 &lt;&lt; 0;   // 0b001
const promotions = 1 &lt;&lt; 1;     // 0b010
const chatMessages = 1 &lt;&lt; 2;   // 0b100

void main() {
  var enabled = orderUpdates | chatMessages;       // bật hai loại
  print(enabled);                                  // 5
  print(enabled &amp; promotions != 0);                // false: &amp; đứng trên !=, đọc là (enabled &amp; promotions) != 0
  enabled ^= promotions;                           // đảo trạng thái khuyến mãi
  print((enabled &amp; promotions) != 0);              // true
  print(enabled.toRadixString(2));                 // 111
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>5
false
true
111</code></pre>

<p>Trong code mới, ưu tiên <code>Set</code> của enum thay cho bitmask; bitmask chỉ đáng dùng khi định dạng dữ liệu đã quy định sẵn. Dù độ ưu tiên đúng ý, vẫn nên viết ngoặc như dòng <code>(enabled &amp; promotions) != 0</code>.</p>

<h3>Cascade: .. và ?..</h3>

<p>Cascade <code>..</code> thực hiện <strong>một chuỗi thao tác trên cùng một object</strong> (gán field, gọi method) và cả biểu thức <strong>trả về chính object đó</strong>, bỏ qua giá trị trả về của từng thao tác. Gần với <code>apply { }</code> của Kotlin, nhưng là cú pháp chứ không phải hàm. <code>?..</code> là dạng null-aware: đặt ở thao tác đầu tiên, receiver null thì cả chuỗi bị bỏ qua.</p>

<pre data-lang="dart"><code>// receipt.dart
class Receipt {
  String? customerName;
  final lines = &lt;String&gt;[];
  void addLine(String line) =&gt; lines.add(line);
}

Receipt? findDraft(String customerName) =&gt; null;  // giả lập: không có hoá đơn nháp

void main() {
  final receipt = Receipt()
    ..customerName = 'Lan'          // gán field trên cùng object
    ..addLine('Tai nghe x2')        // gọi method, bỏ qua giá trị trả về
    ..addLine('Phí ship');
  print('\${receipt.customerName}: \${receipt.lines}');

  final text = StringBuffer()
    ..write('Tổng: ')
    ..write(930000)
    ..toString();                   // kết quả toString() bị bỏ, cả biểu thức vẫn là StringBuffer
  print(text.runtimeType);

  final draft = findDraft('Lan');   // kiểu Receipt?
  draft?..addLine('Không chạy')     // ?.. : draft null thì bỏ qua cả chuỗi cascade
    ..addLine('Cũng không chạy');
  print(draft);
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>Lan: [Tai nghe x2, Phí ship]
StringBuffer
null</code></pre>

<p><code>..toString()</code> ở cuối <strong>không</strong> biến <code>text</code> thành <code>String</code> (sai lầm 6). Muốn lấy chuỗi thì gọi <code>.toString()</code> (một dấu chấm) trên kết quả: <code>(StringBuffer()..write('a')).toString()</code>.</p>

<h3>Operator overloading</h3>

<p>Class định nghĩa toán tử bằng method có tên <code>operator</code> + ký hiệu. Các toán tử định nghĩa được: <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>, <code>==</code>, <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>~/</code>, <code>%</code>, <code>|</code>, <code>^</code>, <code>&amp;</code>, <code>&lt;&lt;</code>, <code>&gt;&gt;</code>, <code>&gt;&gt;&gt;</code>, <code>~</code>, <code>[]</code>, <code>[]=</code> và unary minus (<code>operator -()</code>). Không định nghĩa được <code>!=</code>, <code>&amp;&amp;</code>, <code>||</code>, <code>??</code>, <code>+=</code>: chúng được suy ra hoặc do ngôn ngữ xử lý.</p>

<p>Toán tử nhị phân được tra trên <strong>operand bên trái</strong>: <code>money * 2</code> gọi <code>Money.*</code>, còn <code>2 * money</code> gọi <code>int.*</code> và là lỗi compile vì <code>int.*</code> không nhận <code>Money</code>. Kotlin dùng <code>operator fun plus</code> với tên chữ; Dart dùng chính ký hiệu.</p>

<h4>Ví dụ: kiểu Money cho giỏ hàng</h4>

<p><strong>Bài toán:</strong> giỏ hàng cộng tiền, nhân theo số lượng, so sánh với hạn mức thanh toán. Dùng <code>int</code> trần thì dễ cộng nhầm tiền với số lượng; một kiểu <code>Money</code> có toán tử riêng giữ code đọc như công thức mà vẫn đúng kiểu.</p>

<pre data-lang="dart"><code>// money.dart
class Money {
  const Money(this.vnd);
  final int vnd;

  Money operator +(Money other) =&gt; Money(vnd + other.vnd);   // a + b gọi a.+(b)
  Money operator *(int quantity) =&gt; Money(vnd * quantity);   // vế phải là int, không phải Money
  Money operator -() =&gt; Money(-vnd);                         // unary minus: -a
  bool operator &lt;(Money other) =&gt; vnd &lt; other.vnd;

  @override
  bool operator ==(Object other) =&gt; other is Money &amp;&amp; other.vnd == vnd;
  @override
  int get hashCode =&gt; vnd.hashCode;                          // override == thì phải override hashCode
  @override
  String toString() =&gt; '$vnd đ';
}

void main() {
  const headphone = Money(450000);
  const shipping = Money(30000);
  var total = headphone * 2 + shipping;    // * trước +, như số học thường
  print(total);
  total += -Money(50000);                  // += tự có từ +, unary - từ operator -()
  print(total);
  print(total &lt; const Money(1000000));
  print(Money(30000) == shipping);         // true: so theo giá trị
  print(Money(30000) != shipping);         // false: != là !(a == b), không override riêng
  // print(2 * headphone);                 // lỗi compile: int.* không nhận Money
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>930000 đ
880000 đ
true
true
false</code></pre>

<ul>
  <li>Toán tử giữ nguyên độ ưu tiên của ngôn ngữ: định nghĩa lại <code>*</code> không làm nó đứng sau <code>+</code>.</li>
  <li><code>operator ==</code> nhận <code>Object</code> (không phải <code>Object?</code>, vì null đã được xử lý trước) và phải đi kèm <code>hashCode</code> nhất quán (sai lầm 7; quy tắc đầy đủ ở <a href="classes_mixins_sealed.md" target="_blank" rel="noopener">1.2.5</a>).</li>
  <li>Chỉ overload khi ý nghĩa toán tử là hiển nhiên với kiểu đó (tiền, vector, toạ độ, thời lượng). <code>user + group</code> là method đội lốt toán tử, nên đặt tên rõ ràng.</li>
</ul>

<h2>Ví dụ thực tế</h2>

<h3>Ghép validator cho form từ các hàm nhỏ</h3>

<p><strong>Bài toán:</strong> form đăng ký có nhiều ô, mỗi ô một bộ luật (bắt buộc, độ dài tối thiểu, phải có chữ số...). Viết một hàm kiểm tra riêng cho mỗi ô thì lặp code; cần các luật nhỏ có tham số, ghép lại được. Đây chính là hình dạng mà Flutter dùng: <code>TextFormField(validator: ...)</code> nhận một hàm trả về thông báo lỗi hoặc <code>null</code>.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li>Các factory <code>requiredField</code>, <code>minLength</code>, <code>pattern</code> trả về closure; mỗi closure capture cấu hình của nó (tên ô, độ dài, regex).</li>
  <li><code>all</code> nhận danh sách validator và trả về <strong>một</strong> validator mới, capture danh sách đó.</li>
  <li>Khi kiểm tra, validator ghép chạy lần lượt từng luật theo thứ tự khai báo.</li>
  <li>Gặp luật đầu tiên trả về lỗi thì dừng, trả lỗi đó.</li>
  <li>Qua hết các luật thì trả <code>null</code>, nghĩa là hợp lệ.</li>
</ol>

<div class="mermaid">
flowchart TD
    A["(1) requiredField, minLength, pattern trả về closure"] --&gt; B["(2) all ghép thành passwordValidator"]
    B --&gt; C["(3) passwordValidator(input): lấy luật tiếp theo"]
    C --&gt; D{"luật trả về lỗi?"}
    D --&gt;|"có"| E["(4) dừng, trả thông báo lỗi"]
    D --&gt;|"không"| F{"còn luật?"}
    F --&gt;|"còn"| C
    F --&gt;|"hết"| G["(5) trả null: hợp lệ"]
</div>

<pre data-lang="dart"><code>// validators.dart
typedef Validator = String? Function(String value); // null = hợp lệ, String = thông báo lỗi

Validator requiredField(String fieldName) =&gt;        // (1) factory trả về closure, capture fieldName
    (value) =&gt; value.trim().isEmpty ? '$fieldName không được để trống' : null;

Validator minLength(int length) =&gt;                  // (1) capture length
    (value) =&gt; value.length &lt; length ? 'Cần ít nhất $length ký tự' : null;

Validator pattern(RegExp regex, String message) =&gt;  // (1) capture regex và message
    (value) =&gt; regex.hasMatch(value) ? null : message;

Validator all(List&lt;Validator&gt; validators) {         // (2) ghép nhiều validator thành một
  return (value) {
    for (final validate in validators) {            // (3) chạy lần lượt theo thứ tự khai báo
      final error = validate(value);
      if (error != null) return error;              // (4) gặp lỗi đầu tiên thì dừng
    }
    return null;                                    // (5) qua hết: hợp lệ
  };
}

final passwordValidator = all([
  requiredField('Mật khẩu'),
  minLength(8),
  pattern(RegExp(r'\\d'), 'Cần ít nhất một chữ số'),
]);

void main() {
  for (final input in ['', 'abc', 'matkhaumoi', 'matkhau2026']) {
    print('"$input" -&gt; \${passwordValidator(input) ?? 'hợp lệ'}');
  }
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>"" -&gt; Mật khẩu không được để trống
"abc" -&gt; Cần ít nhất 8 ký tự
"matkhaumoi" -&gt; Cần ít nhất một chữ số
"matkhau2026" -&gt; hợp lệ</code></pre>

<p>Gắn vào Flutter (code Flutter, không chạy bằng <code>dart run</code>): <code>FormFieldValidator&lt;String&gt;</code> có kiểu <code>String? Function(String? value)</code>, nên bọc một lớp để xử lý <code>null</code>:</p>

<pre data-lang="dart"><code>// sign_up_form.dart (Flutter)
TextFormField(
  obscureText: true,
  validator: (value) =&gt; passwordValidator(value ?? ''),
)</code></pre>

<h3>Truyền callback, không gọi callback</h3>

<p><code>onPressed</code> của button có kiểu <code>VoidCallback?</code> (<code>void Function()?</code>). Truyền <strong>tear-off</strong> hoặc lambda; đừng gọi hàm.</p>

<pre data-lang="dart"><code>// checkout_button.dart (Flutter)
ElevatedButton(
  onPressed: isSubmitting ? null : submitOrder,   // null: button bị vô hiệu hoá
  child: const Text('Đặt hàng'),
)

// Sai: submitOrder() chạy ngay mỗi lần build, onPressed nhận kết quả void của nó
// onPressed: submitOrder(),</code></pre>

<p>Hàm cần đối số thì bọc lambda: <code>onPressed: () =&gt; addToCart(product.id)</code>.</p>

<h3>Cấu hình object nhiều thuộc tính bằng cascade</h3>

<p>API của Flutter có nhiều object cấu hình bằng setter, cascade giữ chúng trong một biểu thức:</p>

<pre data-lang="dart"><code>// progress_ring_painter.dart (Flutter)
final ringPaint = Paint()
  ..color = Colors.teal
  ..strokeWidth = 6
  ..style = PaintingStyle.stroke
  ..strokeCap = StrokeCap.round;</code></pre>

<h2>Khi nào nên và không nên dùng</h2>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Lựa chọn</th>
      <th style="padding:8px 12px;text-align:left;">Nên dùng khi</th>
      <th style="padding:8px 12px;text-align:left;">Không nên dùng khi</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Positional</td>
      <td style="padding:8px 12px;">Một hai đối số, ý nghĩa hiển nhiên từ tên hàm (<code>subtotal(price, quantity)</code>)</td>
      <td style="padding:8px 12px;">Cờ <code>bool</code>, nhiều đối số cùng kiểu, đối số tuỳ chọn</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Named + <code>required</code></td>
      <td style="padding:8px 12px;">Đối số bắt buộc nhưng cần đọc được ở chỗ gọi (<code>page: 2</code>)</td>
      <td style="padding:8px 12px;">Hàm một tham số rõ nghĩa</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Named có default</td>
      <td style="padding:8px 12px;">Đối số có giá trị chuẩn mà đa số caller dùng</td>
      <td style="padding:8px 12px;">Default phải tính lúc runtime: dùng nullable rồi <code>??</code> trong thân hàm</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Optional positional <code>[...]</code></td>
      <td style="padding:8px 12px;">Đối số phụ rất ngắn, rõ nghĩa</td>
      <td style="padding:8px 12px;">Từ hai đối số tuỳ chọn trở lên: dùng named</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Arrow <code>=&gt;</code></td>
      <td style="padding:8px 12px;">Thân hàm là một biểu thức</td>
      <td style="padding:8px 12px;">Cần nhiều câu lệnh, hoặc biểu thức dài khó đọc</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Closure</td>
      <td style="padding:8px 12px;">Callback cần nhớ cấu hình hoặc trạng thái riêng</td>
      <td style="padding:8px 12px;">Trạng thái phức tạp, nhiều thao tác: dùng class có tên</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Tear-off</td>
      <td style="padding:8px 12px;">Truyền hàm có sẵn, đặc biệt khi cần huỷ đăng ký sau</td>
      <td style="padding:8px 12px;">Cần cố định thêm đối số: dùng lambda và lưu lại nếu phải huỷ</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>typedef</code></td>
      <td style="padding:8px 12px;">Function type dài hoặc dùng ở nhiều chỗ</td>
      <td style="padding:8px 12px;">Cần một kiểu riêng không gán lẫn được: dùng class hoặc extension type</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Cascade</td>
      <td style="padding:8px 12px;">Nhiều thao tác lên cùng một object vừa tạo</td>
      <td style="padding:8px 12px;">Cần giá trị trả về của thao tác cuối; chuỗi dài làm mờ luồng dữ liệu</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Operator overloading</td>
      <td style="padding:8px 12px;">Kiểu giá trị mà toán tử có nghĩa toán học hiển nhiên</td>
      <td style="padding:8px 12px;">Hành vi có tác dụng phụ hoặc ý nghĩa không hiển nhiên</td>
    </tr>
  </tbody>
</table>

<h2>Sai lầm thường gặp</h2>

<p><strong>1. Quên <code>required</code> cho named parameter quan trọng.</strong></p>

<pre data-lang="dart"><code>void sendOtp({String? phoneNumber}) { /* ... */ }
sendOtp();   // compile được, phoneNumber là null, lỗi chỉ lộ khi chạy</code></pre>

<p>Named của Dart mặc định là tuỳ chọn. Đối số mà hàm không thể chạy thiếu thì khai báo <code>required String phoneNumber</code>.</p>

<p><strong>2. Gọi hàm thay vì truyền hàm.</strong> <code>onPressed: submitOrder()</code> chạy hàm ngay lúc build. Hàm trả về <code>void</code> thì analyzer báo <code>use_of_void_result</code>, nhưng hàm trả về một function hoặc tham số kiểu <code>dynamic</code> thì lỗi lọt qua. Viết <code>onPressed: submitOrder</code>.</p>

<p><strong>3. Huỷ listener bằng một lambda mới.</strong> Hai lambda không bằng nhau nên <code>remove</code> không tìm thấy (xem <code>BuggyBadge</code> ở trên). Dùng tear-off cho cả hai lần, hoặc lưu lambda vào field.</p>

<p><strong>4. Tear-off instance method từ tên class.</strong> <code>names.map(String.toUpperCase)</code> là lỗi compile (<code>Instance member 'toUpperCase' can't be accessed using static access</code>). Instance method chỉ tear-off được từ một object (<code>buffer.write</code>); với từng phần tử thì viết <code>names.map((name) =&gt; name.toUpperCase())</code>.</p>

<p><strong>5. Mang thói quen số học của Kotlin sang.</strong></p>

<pre data-lang="dart"><code>final lastPage = totalItems / pageSize;   // double, không phải int: 2.5 trang
final index = (current - 1) % length;     // current = 0: Kotlin ra -1, Dart ra length - 1</code></pre>

<p>Chia lấy số trang dùng <code>~/</code> (hoặc <code>(totalItems / pageSize).ceil()</code>); khi chỉ số âm có ý nghĩa thì cân nhắc rõ <code>%</code> hay <code>remainder</code>.</p>

<p><strong>6. Tưởng cascade trả về kết quả của thao tác cuối.</strong> <code>final s = StringBuffer()..write('a')..toString();</code> cho <code>s</code> là <code>StringBuffer</code>: cascade luôn trả về receiver.</p>

<p><strong>7. Override <code>==</code> mà không override <code>hashCode</code>.</strong> Hai <code>Money(30000)</code> bằng nhau theo <code>==</code> nhưng khác <code>hashCode</code>, nên <code>Set&lt;Money&gt;</code> giữ cả hai và <code>Map</code> không tìm thấy key. Luôn override cả hai.</p>

<p><strong>8. Đọc sai độ ưu tiên của <code>??</code>.</strong> <code>subtotal ?? 0 + shippingFee</code> là <code>subtotal ?? (0 + shippingFee)</code>: khi <code>subtotal</code> khác null thì phí ship bị bỏ mất. Viết <code>(subtotal ?? 0) + shippingFee</code>.</p>

<h2>Lịch sử phát triển</h2>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Phiên bản</th>
      <th style="padding:8px 12px;text-align:left;">Thay đổi</th>
      <th style="padding:8px 12px;text-align:left;">Vì sao</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Dart 1.0 (11/2013)</td>
      <td style="padding:8px 12px;">Hàm là first-class object, closure, cascade <code>..</code>, operator overloading, tham số positional/optional/named</td>
      <td style="padding:8px 12px;">Dart ra đời cho lập trình web, nơi callback và closure là cách làm việc chính</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Dart 2.12 (03/2021)</td>
      <td style="padding:8px 12px;">Từ khoá <code>required</code> thay annotation <code>@required</code>; cascade null-aware <code>?..</code></td>
      <td style="padding:8px 12px;">Null safety cần phân biệt "named bắt buộc" với "named nullable"; <code>@required</code> chỉ là cảnh báo của analyzer</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Dart 2.13</td>
      <td style="padding:8px 12px;"><code>typedef</code> dùng được cho mọi kiểu, không chỉ function type</td>
      <td style="padding:8px 12px;">Đặt tên cho kiểu generic và (sau này) record</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Dart 2.14</td>
      <td style="padding:8px 12px;">Toán tử <code>&gt;&gt;&gt;</code></td>
      <td style="padding:8px 12px;">Shift không dấu vốn có trong Java và JavaScript; trước đó Dart phải tự mô phỏng bằng mask</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Dart 2.15 (12/2021)</td>
      <td style="padding:8px 12px;">Constructor tear-off (<code>Product.new</code>)</td>
      <td style="padding:8px 12px;">Truyền constructor như hàm mà không bọc lambda</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Dart 2.17 (05/2022)</td>
      <td style="padding:8px 12px;">Đối số named đặt được ở bất kỳ vị trí nào</td>
      <td style="padding:8px 12px;">Đặt được đối số named lên trước để đối số positional dài (thường là callback) nằm cuối lời gọi</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Dart 3.0 (05/2023)</td>
      <td style="padding:8px 12px;">Bỏ cú pháp <code>:</code> cho default của named parameter, chỉ còn <code>=</code></td>
      <td style="padding:8px 12px;">Thống nhất một cách viết</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Dart 3.7</td>
      <td style="padding:8px 12px;">Wildcard <code>_</code>: nhiều tham số tên <code>_</code> trong cùng hàm</td>
      <td style="padding:8px 12px;">Callback có nhiều tham số không dùng tới không phải đặt <code>_</code>, <code>__</code></td>
    </tr>
  </tbody>
</table>

<h2>Kết nối hệ thống</h2>

<ul>
  <li><strong>Tiên quyết:</strong> <a href="variables_and_types.md" target="_blank" rel="noopener">1.2.1 Variables and Types</a>: kiểu, null safety và toán tử null-aware (<code>?.</code>, <code>??</code>, <code>??=</code>, <code>!</code>), generics dùng cho hàm generic.</li>
  <li><strong>Liên quan:</strong>
<ul>
  <li><a href="dart_for_kotlin_devs.md" target="_blank" rel="noopener">1.1.1 Dart for Kotlin Developers</a>: bảng ánh xạ cú pháp hàm và tham số từ Kotlin.</li>
  <li><a href="control_flow_patterns.md" target="_blank" rel="noopener">1.2.3 Control Flow and Patterns</a>: vòng lặp, switch expression thay cho <code>when</code>, exception.</li>
  <li><a href="collections_functional.md" target="_blank" rel="noopener">1.2.4 Collections and Functional APIs</a>: <code>map</code>, <code>where</code>, <code>fold</code> nhận chính các function và closure học ở bài này; spread <code>...</code>.</li>
  <li><a href="classes_mixins_sealed.md" target="_blank" rel="noopener">1.2.5 Classes, Mixins and Sealed Types</a>: method, getter/setter, <code>==</code>/<code>hashCode</code> đầy đủ, constructor dùng tham số named và <code>this.</code>.</li>
  <li><a href="../async/futures_async_await.md" target="_blank" rel="noopener">1.3.1 Futures and Async/Await</a>: hàm <code>async</code> và callback bất đồng bộ.</li>
</ul></li>
  <li><strong>Trong Flutter:</strong> <code>VoidCallback</code>, <code>ValueChanged</code>, <code>onPressed</code>, <code>builder</code> ở 3.1 Widget System (chưa có bài); <code>addListener</code>/<code>removeListener</code> của <code>ChangeNotifier</code> ở 4.1.1 ChangeNotifier and ValueNotifier (chưa có bài).</li>
</ul>

<h2>Developer Curiosity Checklist</h2>

<ul>
  <li>Vì sao named parameter của Dart mặc định là tuỳ chọn, và điều đó ảnh hưởng thế nào tới thiết kế API?</li>
  <li>Một closure tạo trong hàm đã return vẫn đọc và sửa được biến local của hàm đó; biến ấy sống ở đâu?</li>
  <li>Vì sao <code>removeListener(_onChanged)</code> gỡ được listener còn <code>removeListener(() =&gt; _onChanged())</code> thì không?</li>
  <li>Vì sao <code>2 * money</code> lỗi còn <code>money * 2</code> thì không?</li>
  <li>Cascade khác gì một chuỗi method trả về <code>this</code> (builder pattern), và khi nào sự khác biệt đó gây bug?</li>
</ul>

<h2>Tham khảo</h2>

<ul>
  <li><a href="https://dart.dev/language/functions" target="_blank" rel="noopener">Functions</a>, dart.dev</li>
  <li><a href="https://dart.dev/language/operators" target="_blank" rel="noopener">Operators</a>, dart.dev</li>
  <li><a href="https://dart.dev/language/methods" target="_blank" rel="noopener">Methods: operators</a>, dart.dev</li>
  <li><a href="https://dart.dev/language/typedefs" target="_blank" rel="noopener">Typedefs</a>, dart.dev</li>
  <li><a href="https://dart.dev/language/loops" target="_blank" rel="noopener">Loops: closures trong vòng lặp for</a>, dart.dev</li>
  <li><a href="https://dart.dev/effective-dart/design" target="_blank" rel="noopener">Effective Dart: Design</a>, dart.dev</li>
  <li><a href="https://dart.dev/resources/language/evolution" target="_blank" rel="noopener">Language evolution</a>, dart.dev</li>
  <li><a href="https://api.dart.dev/dart-core/num/operator_modulo.html" target="_blank" rel="noopener">num operator %</a>, api.dart.dev</li>
  <li><a href="https://api.flutter.dev/flutter/widgets/FormFieldValidator.html" target="_blank" rel="noopener">FormFieldValidator</a>, api.flutter.dev</li>
  <li><a href="https://api.flutter.dev/flutter/foundation/ChangeNotifier/removeListener.html" target="_blank" rel="noopener">ChangeNotifier.removeListener</a>, api.flutter.dev</li>
</ul>
    `
  },

  'flutter-dart-control-flow-patterns': {
    title: 'Control Flow and Patterns',
    summary: 'Control flow là các cấu trúc quyết định câu lệnh nào chạy tiếp theo (rẽ nhánh, lặp, ném và bắt exception). Từ Dart 3, các cấu trúc này dùng chung pattern, một mô tả hình dạng của giá trị vừa kiểm tra giá trị có khớp không vừa tách các phần bên trong ra biến, và compiler dựa vào pattern để kiểm tra switch đã phủ hết mọi trường hợp chưa.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '25 phút',
    depth: 'standard',
    tags: ['flutter', 'dart', 'session-01', 'control-flow', 'switch', 'patterns', 'exhaustiveness', 'exceptions'],
    domain: 'Flutter Development',
    module: 'Session 01: Dart Foundations',
    prerequisites: ['flutter.dart.variables_types', 'flutter.dart.functions_operators'],
    related: ['flutter.dart.classes_mixins_sealed', 'flutter.dart.collections_functional', 'flutter.dart.dart_for_kotlin_devs', 'flutter.async.futures_async_await'],
    learningOutcomes: [
      'Phân biệt được switch statement và switch expression, cùng quy tắc case của Dart 3 (không cần break, chỉ case rỗng mới rơi xuống case sau, continue tới label).',
      'Áp dụng được các loại pattern để kiểm tra và destructure record, list, map, object trong switch, if-case, khai báo biến và for-in.',
      'Giải thích được cách exhaustiveness checking quyết định một switch đã phủ hết giá trị hay chưa, và vì sao chỉ bool, enum, sealed type (và nullable, record của chúng) hoặc một case khớp mọi giá trị như `_` mới giúp compiler chứng minh được điều đó.',
      'Xử lý được exception đồng bộ bằng throw, on/catch, finally và rethrow, và phân biệt được Exception với Error.',
      'Biết khi nào dùng if, if-case, switch statement hay switch expression cho một nhánh rẽ.'
    ],
    knowledgeGap: 'Không nắm pattern và exhaustiveness thì code đọc JSON hay xử lý state thành chuỗi if lồng nhau kèm cast thủ công, và thêm một trạng thái mới là quên xử lý ở vài màn hình mà compiler không báo. Không phân biệt Exception với Error thì catch (e) nuốt luôn bug lập trình, app chạy tiếp với dữ liệu sai thay vì dừng đúng chỗ hỏng.',
    updatedAt: '2026-11-10',
    readTime: '25 phút',
    content: `
<h2>Vấn đề cần giải quyết</h2>

<p>Phần lớn logic của một app là <strong>rẽ nhánh theo hình dạng dữ liệu</strong>: phản hồi API thành công hay lỗi; deep link trỏ tới màn hình nào; state đang loading, có dữ liệu hay thất bại. Mỗi nhánh thường cần ba việc:</p>

<ol>
  <li><strong>Kiểm tra kiểu và cấu trúc</strong>: có phải <code>Map</code> không, có key <code>user</code> không, <code>user.id</code> có phải <code>int</code> không.</li>
  <li><strong>Lấy các phần bên trong</strong> ra biến.</li>
  <li><strong>Chắc chắn đã xử lý hết các trường hợp</strong>, kể cả trường hợp thêm sau này.</li>
</ol>

<p>Không có công cụ phù hợp, ba việc đó thành chuỗi <code>if</code> lồng nhau với <code>is</code> và truy cập key thủ công:</p>

<pre data-lang="dart"><code>// Đọc phản hồi đăng nhập theo kiểu "trước Dart 3"
String greet(Object? json) {
  if (json is Map&lt;String, dynamic&gt; &amp;&amp; json['status'] == 'ok') {
    final user = json['user'];
    if (user is Map&lt;String, dynamic&gt;) {
      final id = user['id'];
      final name = user['name'];
      if (id is int &amp;&amp; name is String) {
        return 'Xin chào $name (#$id)';
      }
    }
  }
  return 'Phản hồi không đúng định dạng';
}</code></pre>

<p>Code dài, dễ sót một bước kiểm tra, và compiler không biết bạn đã xử lý hết các trường hợp hay chưa. Ngoài ra, khi luồng chạy bình thường <strong>không thể tiếp tục</strong> (dữ liệu sai định dạng, hết hàng), cần một cách thoát ra và đưa lỗi lên chỗ biết cách xử lý: exception.</p>

<h2>Sau khi học xong</h2>

<ul>
  <li>Phân biệt được switch statement và switch expression, cùng quy tắc case của Dart 3 (không cần break, chỉ case rỗng mới rơi xuống case sau, continue tới label).</li>
  <li>Áp dụng được các loại pattern để kiểm tra và destructure record, list, map, object trong switch, if-case, khai báo biến và for-in.</li>
  <li>Giải thích được cách exhaustiveness checking quyết định một switch đã phủ hết giá trị hay chưa, và vì sao chỉ bool, enum, sealed type (và nullable, record của chúng) hoặc một case khớp mọi giá trị như <code>_</code> mới giúp compiler chứng minh được điều đó.</li>
  <li>Xử lý được exception đồng bộ bằng throw, on/catch, finally và rethrow, và phân biệt được Exception với Error.</li>
  <li>Biết khi nào dùng if, if-case, switch statement hay switch expression cho một nhánh rẽ.</li>
</ul>

<h2>Control Flow and Patterns là gì?</h2>

<p><strong>Control flow (luồng điều khiển)</strong> là các cấu trúc quyết định câu lệnh nào chạy tiếp theo: rẽ nhánh (<code>if</code>, <code>switch</code>), lặp (<code>for</code>, <code>while</code>) và thoát bất thường (<code>throw</code>/<code>try</code>). Từ Dart 3, các cấu trúc này dùng chung <strong>pattern (mẫu)</strong>: một mô tả hình dạng của giá trị, vừa <strong>kiểm tra</strong> giá trị có khớp không, vừa <strong>tách</strong> (destructure) các phần bên trong ra biến.</p>

<p>Mental model: pattern là <strong>một cái khuôn có lỗ</strong>. Đặt khuôn lên giá trị: hình dạng không vừa khuôn thì không khớp; vừa khuôn thì phần giá trị nằm dưới mỗi lỗ được gán vào biến mang tên lỗ đó. Một switch là một chồng khuôn được thử lần lượt từ trên xuống; exhaustiveness checking là compiler kiểm tra chồng khuôn đó đã che kín mọi hình dạng mà kiểu dữ liệu cho phép hay chưa.</p>

<h2>Cách hoạt động</h2>

<h3>Rẽ nhánh và vòng lặp cơ bản</h3>

<p>Phần này giống Kotlin và Java, chỉ khác vài điểm:</p>

<ul>
  <li><strong>Điều kiện phải là <code>bool</code> thật.</strong> Dart không có truthy/falsy: <code>if (items.length)</code> hay <code>if (name)</code> là lỗi compile.</li>
  <li><strong><code>if</code> là statement</strong>, không trả về giá trị như Kotlin. Muốn chọn giá trị thì dùng toán tử ba ngôi <code>cond ? a : b</code> (xem <a href="functions_operators.md" target="_blank" rel="noopener">1.2.2 Functions and Operators</a>) hoặc switch expression.</li>
  <li><strong>Vòng lặp</strong>: <code>for (var i = 0; i &lt; n; i++)</code> khi cần chỉ số; <code>for (final item in items)</code> duyệt mọi <code>Iterable</code>; <code>while</code> kiểm tra điều kiện trước, <code>do-while</code> chạy ít nhất một lần.</li>
  <li><strong><code>break</code></strong> thoát vòng lặp gần nhất, <strong><code>continue</code></strong> bỏ qua phần còn lại của lượt hiện tại. Gắn <strong>label</strong> (<code>rows:</code>) trước vòng lặp để <code>break rows;</code> / <code>continue rows;</code> tác động thẳng vào vòng ngoài, thay vì dùng biến cờ.</li>
</ul>

<h4>Ví dụ: tìm ghế trống đầu tiên trong sơ đồ rạp</h4>

<p><strong>Bài toán:</strong> sơ đồ ghế là danh sách các hàng; mỗi ô là ghế đã bán, ghế trống hoặc lối đi. Cần tìm ghế trống đầu tiên rồi dừng ngay. <code>break</code> thường chỉ thoát vòng trong, nên cần label.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li>Vòng ngoài (gắn label <code>rows</code>) duyệt từng hàng.</li>
  <li>Vòng trong duyệt từng ô của hàng.</li>
  <li>Ô là lối đi thì <code>continue</code> sang ô kế tiếp.</li>
  <li>Ô là ghế trống thì ghi lại vị trí và <code>break rows</code>: thoát <strong>cả hai</strong> vòng.</li>
  <li>In kết quả (hoặc "Hết ghế").</li>
</ol>

<div class="mermaid">
flowchart TD
    A["(1) Hàng tiếp theo"] --&gt; B["(2) Ô tiếp theo trong hàng"]
    B --&gt; C{"(3) Lối đi?"}
    C --&gt;|"có: continue"| B
    C --&gt;|không| D{"(4) Ghế trống?"}
    D --&gt;|"có: break rows"| E["(5) In kết quả"]
    D --&gt;|không| F{"Hết ô trong hàng?"}
    F --&gt;|chưa| B
    F --&gt;|rồi| G{"Hết hàng?"}
    G --&gt;|chưa| A
    G --&gt;|rồi| E
</div>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// seat_finder.dart
void main() {
  // 'X' = đã bán, 'O' = còn trống, '_' = lối đi
  const seatMap = [
    ['X', 'X', '_', 'X', 'X'],
    ['X', 'X', '_', 'O', 'X'],
    ['O', 'O', '_', 'O', 'O'],
  ];

  String? firstFree;
  var checked = 0;

  rows:
  for (var row = 0; row &lt; seatMap.length; row++) {     // (1) duyệt từng hàng
    for (var col = 0; col &lt; seatMap[row].length; col++) { // (2) duyệt từng ô
      final cell = seatMap[row][col];
      if (cell == '_') continue;                        // (3) lối đi: bỏ qua ô này
      checked++;
      if (cell == 'O') {
        firstFree = 'Hàng \${row + 1}, ghế \${col + 1}';  // (4) tìm thấy
        break rows;                                     //     thoát cả hai vòng lặp
      }
    }
  }

  print(firstFree ?? 'Hết ghế');                        // (5) sau vòng lặp
  print('Đã kiểm tra $checked ghế');
}</code></pre>

<p><strong>Kết quả:</strong> <code>dart run seat_finder.dart</code> in:</p>

<pre data-lang="text"><code>Hàng 2, ghế 4
Đã kiểm tra 7 ghế</code></pre>

<p>Hàng 3 không được duyệt vì <code>break rows</code> dừng cả vòng ngoài. Chỉ viết <code>break</code> thì vòng ngoài chạy tiếp sang hàng 3 và <code>firstFree</code> bị ghi đè.</p>

<h3>Switch statement</h3>

<p><code>switch</code> so một giá trị (<strong>matched value</strong>, giá trị được so khớp) với lần lượt từng <code>case</code>, rồi chạy thân của case <strong>đầu tiên</strong> khớp. Quy tắc từ Dart 3:</p>

<ul>
  <li><strong>Mỗi <code>case</code> là một pattern</strong>, không chỉ là hằng số. <code>case 0:</code> là constant pattern; <code>case int n when n &lt; 0:</code> là variable pattern kèm guard (mục sau).</li>
  <li><strong>Case có thân không rơi xuống case sau.</strong> Chạy xong thân, switch kết thúc; không cần <code>break</code>. Đây là thay đổi của Dart 3.0: trước đó thân case không rỗng bắt buộc kết thúc bằng <code>break</code>, <code>continue</code>, <code>return</code>, <code>throw</code> hoặc <code>rethrow</code>.</li>
  <li><strong>Case rỗng rơi xuống case kế tiếp</strong>, để nhiều case dùng chung một thân (hoặc viết gọn bằng logical-or pattern <code>case 'png' || 'jpg':</code>).</li>
  <li><strong>Nhảy sang một case không liền kề</strong>: gắn label cho case đích và dùng <code>continue label;</code>.</li>
  <li><strong><code>default:</code></strong> hoặc <strong><code>case _:</code></strong> bắt mọi giá trị còn lại.</li>
</ul>

<pre data-lang="dart"><code>// Lệnh điều khiển đèn thông minh: switch statement thực thi hành động, không trả giá trị
void handleCommand(String command) {
  switch (command) {
    case 'on':
      print('Bật đèn');           // xong là thoát switch, không cần break
    case 'off':
    case 'shutdown':              // case rỗng 'off' rơi xuống đây
      print('Tắt đèn');
    case 'reset':
      print('Xoá cấu hình');
      continue restart;           // nhảy tới case có label restart
    restart:
    case 'restart':
      print('Khởi động lại');
    default:
      print('Lệnh không hỗ trợ: $command');
  }
}</code></pre>

<p><code>handleCommand('reset')</code> in <code>Xoá cấu hình</code> rồi <code>Khởi động lại</code>; <code>handleCommand('off')</code> in <code>Tắt đèn</code>; <code>handleCommand('x')</code> in <code>Lệnh không hỗ trợ: x</code>.</p>

<h3>Switch expression</h3>

<p><strong>Switch expression</strong> (Dart 3.0) là dạng switch <strong>trả về một giá trị</strong>, dùng được ở mọi chỗ cần biểu thức: vế phải phép gán, <code>return</code>, đối số hàm, thân <code>=&gt;</code>.</p>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;"></th>
      <th style="padding:8px 12px;text-align:left;">Switch statement</th>
      <th style="padding:8px 12px;text-align:left;">Switch expression</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Mục đích</td>
      <td style="padding:8px 12px;">Thực thi hành động</td>
      <td style="padding:8px 12px;">Tính ra một giá trị</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Một case</td>
      <td style="padding:8px 12px;"><code>case pattern:</code> + các câu lệnh</td>
      <td style="padding:8px 12px;"><code>pattern =&gt; biểu thức</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Phân cách case</td>
      <td style="padding:8px 12px;">xuống dòng</td>
      <td style="padding:8px 12px;">dấu phẩy</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Case rỗng rơi xuống</td>
      <td style="padding:8px 12px;">có</td>
      <td style="padding:8px 12px;">không, mọi case phải có thân</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Case mặc định</td>
      <td style="padding:8px 12px;"><code>default:</code> hoặc <code>case _:</code></td>
      <td style="padding:8px 12px;">chỉ <code>_</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Phải phủ hết mọi giá trị</td>
      <td style="padding:8px 12px;">chỉ khi kiểu là bool, enum, sealed...</td>
      <td style="padding:8px 12px;">luôn luôn</td>
    </tr>
  </tbody>
</table>

<p>Một switch expression không được đứng đầu một câu lệnh (dễ nhầm với switch statement); muốn chạy hành động thì dùng statement.</p>

<h4>Ví dụ: chọn thông báo theo mã HTTP status</h4>

<p><strong>Bài toán:</strong> từ mã HTTP status chọn ra câu thông báo cho người dùng: "từ một giá trị chọn ra một giá trị", đúng việc của switch expression.</p>

<p><strong>Luồng chạy:</strong> các case được thử <strong>từ trên xuống</strong>, case đầu tiên khớp quyết định kết quả.</p>

<ol>
  <li>Khoảng <code>[200, 300)</code>: relational pattern kết hợp logical-and.</li>
  <li>Đúng <code>304</code>: constant pattern.</li>
  <li><code>401</code> hoặc <code>403</code>: logical-or pattern.</li>
  <li>Từ 500 trở lên: bind vào <code>c</code> rồi kiểm tra bằng guard <code>when</code>.</li>
  <li>Còn lại: wildcard <code>_</code>.</li>
</ol>

<div class="mermaid">
flowchart TD
    S["code"] --&gt; A{"(1) Từ 200 đến 299?"}
    A --&gt;|có| RA["Thành công"]
    A --&gt;|không| B{"(2) Bằng 304?"}
    B --&gt;|có| RB["Dùng bản cache"]
    B --&gt;|không| C{"(3) 401 hoặc 403?"}
    C --&gt;|có| RC["Cần đăng nhập lại"]
    C --&gt;|không| D{"(4) c &gt;= 500?"}
    D --&gt;|có| RD["Máy chủ lỗi"]
    D --&gt;|không| E["(5) Lỗi không xác định"]
</div>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// http_status.dart
String describeStatus(int code) =&gt; switch (code) {
      &gt;= 200 &amp;&amp; &lt; 300 =&gt; 'Thành công',                 // (1) relational + logical-and
      304 =&gt; 'Dùng bản cache',                         // (2) constant pattern
      401 || 403 =&gt; 'Cần đăng nhập lại',               // (3) logical-or
      final c when c &gt;= 500 =&gt; 'Máy chủ lỗi ($c), thử lại sau', // (4) guard
      _ =&gt; 'Lỗi không xác định ($code)',               // (5) wildcard
    };

void main() {
  for (final code in [201, 304, 403, 503, 418]) {
    print('$code → \${describeStatus(code)}');
  }
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>201 → Thành công
304 → Dùng bản cache
403 → Cần đăng nhập lại
503 → Máy chủ lỗi (503), thử lại sau
418 → Lỗi không xác định (418)</code></pre>

<p>Bỏ dòng <code>_ =&gt; ...</code> thì <code>dart analyze</code> báo lỗi <code>non_exhaustive_switch_expression</code>: switch expression trên <code>int</code> phải có nhánh cho mọi số nguyên (mục Exhaustiveness checking giải thích vì sao).</p>

<h3>Pattern: khuôn kiểm tra và tách giá trị</h3>

<p>Một pattern làm hai việc, tuỳ loại:</p>

<ul>
  <li><strong>Match (khớp)</strong>: giá trị có đúng hình dạng không (đúng kiểu, bằng hằng số, list đủ số phần tử, map có key).</li>
  <li><strong>Destructure (tách)</strong>: khi khớp, gán các phần bên trong vào biến mới.</li>
</ul>

<p>Pattern xuất hiện ở hai loại ngữ cảnh:</p>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Ngữ cảnh</th>
      <th style="padding:8px 12px;text-align:left;">Ở đâu</th>
      <th style="padding:8px 12px;text-align:left;">Pattern không khớp thì sao</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><strong>Matching context</strong> (refutable: được phép không khớp)</td>
      <td style="padding:8px 12px;"><code>case</code> của switch, <code>if (x case ...)</code></td>
      <td style="padding:8px 12px;">Chỉ là "không khớp": thử case kế tiếp hoặc chạy nhánh <code>else</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><strong>Irrefutable context</strong> (không được phép không khớp)</td>
      <td style="padding:8px 12px;">Khai báo biến <code>final (a, b) = ...</code>, gán <code>(a, b) = ...</code>, <code>for (final (a, b) in ...)</code></td>
      <td style="padding:8px 12px;">Compiler từ chối nếu kiểu không chắc khớp; nếu chỉ lộ ra lúc chạy (list sai độ dài, map thiếu key) thì ném <code>StateError</code></td>
    </tr>
  </tbody>
</table>

<p>Các loại pattern chính, xếp theo độ ưu tiên từ thấp tới cao (dùng ngoặc <code>( )</code> để đổi thứ tự):</p>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Pattern</th>
      <th style="padding:8px 12px;text-align:left;">Cú pháp</th>
      <th style="padding:8px 12px;text-align:left;">Khớp khi</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Logical-or</td>
      <td style="padding:8px 12px;">\`p1 \\</td>
      <td style="padding:8px 12px;">\\</td>
      <td style="padding:8px 12px;">p2\`</td>
      <td style="padding:8px 12px;">Một trong hai khớp; hai nhánh phải bind cùng tập biến</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Logical-and</td>
      <td style="padding:8px 12px;"><code>p1 &amp;&amp; p2</code></td>
      <td style="padding:8px 12px;">Cả hai khớp; hai nhánh không được bind trùng tên biến</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Relational</td>
      <td style="padding:8px 12px;"><code>&gt;= 200</code>, <code>&lt; 300</code>, <code>== x</code>, <code>!= x</code></td>
      <td style="padding:8px 12px;">Phép so sánh với một <strong>hằng số</strong> cho kết quả <code>true</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Cast</td>
      <td style="padding:8px 12px;"><code>p as int</code></td>
      <td style="padding:8px 12px;">Ép kiểu rồi khớp tiếp; <strong>ném lỗi</strong> nếu giá trị không đúng kiểu</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Null-check</td>
      <td style="padding:8px 12px;"><code>p?</code></td>
      <td style="padding:8px 12px;">Giá trị khác <code>null</code> (null chỉ là không khớp)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Null-assert</td>
      <td style="padding:8px 12px;"><code>p!</code></td>
      <td style="padding:8px 12px;">Giá trị khác <code>null</code>; <strong>ném lỗi</strong> nếu là <code>null</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Constant</td>
      <td style="padding:8px 12px;"><code>304</code>, <code>'ok'</code>, <code>null</code>, <code>Zone.inner</code>, <code>const (1 + 2)</code></td>
      <td style="padding:8px 12px;">Giá trị <code>==</code> hằng số</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Variable</td>
      <td style="padding:8px 12px;"><code>var x</code>, <code>final String s</code>, <code>int n</code></td>
      <td style="padding:8px 12px;">Luôn khớp (có kiểu thì phải đúng kiểu), bind giá trị vào biến</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Wildcard</td>
      <td style="padding:8px 12px;"><code>_</code>, <code>int _</code></td>
      <td style="padding:8px 12px;">Luôn khớp (có kiểu thì phải đúng kiểu), không bind gì</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">List</td>
      <td style="padding:8px 12px;"><code>[a, b]</code>, <code>[first, ...rest]</code></td>
      <td style="padding:8px 12px;">Là <code>List</code> và <strong>đúng số phần tử</strong> (trừ khi có một rest element <code>...</code>)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Map</td>
      <td style="padding:8px 12px;"><code>{'id': int id}</code></td>
      <td style="padding:8px 12px;">Là <code>Map</code> và có các key được nêu; <strong>key thừa bị bỏ qua</strong></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Record</td>
      <td style="padding:8px 12px;"><code>(a, b)</code>, <code>(:name, :age)</code></td>
      <td style="padding:8px 12px;">Là record có <strong>đúng</strong> các field đó (khớp toàn bộ record)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Object</td>
      <td style="padding:8px 12px;"><code>ProfileLoaded(:final name)</code></td>
      <td style="padding:8px 12px;">Đúng kiểu, rồi khớp từng getter được nêu; getter không nêu thì bỏ qua</td>
    </tr>
  </tbody>
</table>

<p><code>:name</code> là viết tắt của <code>name: name</code> (getter hay field tên <code>name</code>, bind vào biến cùng tên); <code>:final name</code> thêm <code>final</code> cho biến đó.</p>

<p>Ba điểm hay nhầm:</p>

<ul>
  <li><strong>Một tên đứng trần trong <code>case</code> là constant pattern, không phải biến mới.</strong> <code>case maxRetry:</code> so với hằng <code>maxRetry</code>. Muốn bind thì viết <code>case final n:</code> (xem Sai lầm 4).</li>
  <li><strong>Relational và constant pattern chỉ nhận hằng số.</strong> Điều kiện phụ thuộc giá trị lúc chạy phải nằm trong guard.</li>
  <li><strong><code>_</code> không bind gì.</strong> Từ Dart 3.7, <code>_</code> làm tên biến cục bộ hay tham số (<code>(_, _) =&gt; ...</code>) cũng là wildcard, không tạo biến.</li>
</ul>

<h3>Destructuring: record, list, map, object</h3>

<p>Destructuring là dùng pattern ở irrefutable context để <strong>khai báo nhiều biến từ một giá trị</strong>. Bản thân kiểu record (field, equality) nằm ở <a href="variables_and_types.md" target="_blank" rel="noopener">1.2.1 Variables and Types</a>.</p>

<pre data-lang="dart"><code>// Record: hàm trả nhiều giá trị, nơi gọi tách ra ngay
(String, int) topSeller() =&gt; ('Áo thun', 120);
final (name, sold) = topSeller();               // name = 'Áo thun', sold = 120

// Record có field tên
final ({String city, int zip}) address = (city: 'Huế', zip: 49000);
final (:city, :zip) = address;

// Gán bằng pattern: hoán đổi hai biến không cần biến tạm
var low = 9, high = 2;
(low, high) = (high, low);                      // low = 2, high = 9

// List: phần tử đầu và phần còn lại
final [best, ...others] = [9, 7, 8, 6];         // best = 9, others = [7, 8, 6]

// Object: gọi getter x, y của Point
final Point(:x, :y) = Point(3, 4);

// for-in: mỗi phần tử của map.entries là MapEntry, dùng object pattern
for (final MapEntry(:key, :value) in headers.entries) {
  print('$key: $value');
}</code></pre>

<p>Hai giới hạn của irrefutable context:</p>

<ul>
  <li><strong>Kiểu phải chắc chắn khớp ở compile-time.</strong> <code>MapEntry</code> là class, không phải record, nên tách nó phải dùng object pattern <code>MapEntry(:key, :value)</code>; record pattern bị từ chối (Sai lầm 1).</li>
  <li><strong>Cấu trúc chỉ biết lúc chạy thì ném <code>StateError</code>.</strong> <code>final [a, b] = list;</code> compile được với mọi <code>List</code>, nhưng <code>list</code> có một phần tử thì chạy ra <code>Bad state: Pattern matching error</code>; map pattern thiếu key cũng vậy. Dữ liệu không chắc chắn (JSON, input người dùng) phải đi qua matching context: <code>switch</code> hoặc <code>if-case</code>.</li>
</ul>

<h3>Guard <code>when</code> và if-case</h3>

<p><strong>Guard</strong> là điều kiện <code>bool</code> viết sau pattern bằng <code>when</code>. Pattern khớp và bind biến trước, rồi mới tính guard (nên guard dùng được biến vừa bind). <strong>Guard sai thì switch thử case kế tiếp</strong>, không thoát khỏi switch. Guard dùng được trong cả hai dạng switch và if-case.</p>

<p><strong>If-case</strong> (<code>if (value case pattern)</code>) thử <strong>một</strong> pattern: khớp thì chạy nhánh <code>then</code> với các biến của pattern trong scope; không khớp thì chạy <code>else</code> nếu có.</p>

<pre data-lang="dart"><code>// Chỉ quan tâm một loại message từ WebSocket
if (message case {'type': 'typing', 'userId': int userId} when userId != myId) {
  showTypingIndicator(userId);                  // userId chỉ tồn tại trong nhánh này
}</code></pre>

<p>If-case còn dùng được ngay trong collection literal (<code>[..., if (x case ...) item]</code>); collection <code>if</code>/<code>for</code> nói chung nằm ở <a href="collections_functional.md" target="_blank" rel="noopener">1.2.4 Collections and Functional APIs</a>.</p>

<h4>Ví dụ: đọc phản hồi đăng nhập từ JSON</h4>

<p><strong>Bài toán:</strong> API đăng nhập trả JSON có vài hình dạng: thành công (kèm user, danh sách role, thời điểm token hết hạn), tài khoản bị khoá, lỗi có message. <code>jsonDecode</code> không đảm bảo kiểu gì: bài toán điển hình của map pattern lồng nhau trong matching context.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li><code>jsonDecode</code> trả về giá trị chưa biết hình dạng.</li>
  <li>Case thành công: map có <code>status: 'ok'</code>, <code>user</code> là map có <code>id</code> kiểu <code>int</code> và <code>name</code> kiểu <code>String</code>, <code>roles</code> là list có ít nhất một <code>String</code>, <code>expiresAt</code> là <code>int</code>; guard so <code>expiresAt</code> với <code>now</code> (giá trị lúc chạy nên phải dùng guard).</li>
  <li>Guard sai (token hết hạn) thì thử case kế tiếp: chỉ cần <code>status: 'ok'</code>.</li>
  <li>Hai hình dạng lỗi: <code>code: 423</code>, hoặc có <code>message</code>.</li>
  <li>Còn lại: wildcard.</li>
</ol>

<div class="mermaid">
flowchart TD
    A["(1) jsonDecode(body)"] --&gt; B{"(2) Khớp hình dạng thành công?"}
    B --&gt;|có| G{"guard: expiresAt &gt; now?"}
    G --&gt;|đúng| R1["Xin chào ..."]
    G --&gt;|"sai: thử case kế"| C
    B --&gt;|không| C{"(3) status là ok?"}
    C --&gt;|có| R2["Phiên đã hết hạn"]
    C --&gt;|không| D{"(4) code 423 hoặc có message?"}
    D --&gt;|có| R3["Thông báo lỗi tương ứng"]
    D --&gt;|không| R4["(5) Sai định dạng"]
</div>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// login_response.dart
import 'dart:convert';

String handleLogin(String body, {required int now}) {
  final Object? json = jsonDecode(body); // (1) chưa biết hình dạng

  return switch (json) {
    // (2) đúng hình dạng thành công VÀ token còn hạn
    {
      'status': 'ok',
      'user': {'id': int id, 'name': String name},
      'roles': [String mainRole, ...],
      'expiresAt': int expiresAt,
    }
        when expiresAt &gt; now =&gt;
      'Xin chào $name (#$id), vai trò chính: $mainRole',
    // (3) guard ở trên sai thì rơi xuống đây
    {'status': 'ok'} =&gt; 'Phiên đã hết hạn, đăng nhập lại',
    // (4) hai hình dạng lỗi
    {'status': 'error', 'code': 423} =&gt; 'Tài khoản bị khoá',
    {'status': 'error', 'message': String message} =&gt; 'Lỗi: $message',
    // (5) mọi hình dạng còn lại
    _ =&gt; 'Phản hồi không đúng định dạng',
  };
}

void main() {
  const now = 1000;
  const ok = '{"status":"ok","user":{"id":7,"name":"Lan"},'
      '"roles":["admin","editor"],"expiresAt":2000,"token":"abc"}';
  const expired = '{"status":"ok","user":{"id":7,"name":"Lan"},'
      '"roles":["admin"],"expiresAt":900}';
  print(handleLogin(ok, now: now));
  print(handleLogin(expired, now: now));
  print(handleLogin('{"status":"error","code":423}', now: now));
  print(handleLogin('{"status":"error","code":500,"message":"DB down"}', now: now));
  print(handleLogin('{"user":{"id":"7"}}', now: now));
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>Xin chào Lan (#7), vai trò chính: admin
Phiên đã hết hạn, đăng nhập lại
Tài khoản bị khoá
Lỗi: DB down
Phản hồi không đúng định dạng</code></pre>

<p>Key thừa <code>token</code> không cản việc khớp (map pattern bỏ qua key thừa), còn bỏ <code>...</code> thì <code>["admin","editor"]</code> <strong>không</strong> khớp <code>[String mainRole]</code>. Trong thân case, <code>id</code> và <code>name</code> đã có kiểu <code>int</code>, <code>String</code> mà không cần cast: đoạn này thay hẳn chuỗi <code>if</code> lồng nhau ở đầu bài.</p>

<h3>Exhaustiveness checking</h3>

<p><strong>Exhaustiveness checking</strong> (kiểm tra tính đầy đủ) là bước compiler chứng minh <strong>mọi giá trị có thể có của kiểu matched value đều khớp ít nhất một case</strong>; còn giá trị lọt qua thì báo lỗi và chỉ ra hình dạng còn thiếu.</p>

<p>Theo mental model cái khuôn: kiểu của matched value là một "không gian" các hình dạng, mỗi case không có guard che bớt một phần. Hết case mà còn phần chưa bị che thì switch chưa đầy đủ. Case có guard <strong>không được tính là che</strong> gì, vì compiler không biết trước guard đúng hay sai.</p>

<p>Compiler chỉ chia được không gian thành các phần <strong>hữu hạn</strong> khi kiểu có tập con biết trước (spec gọi là <em>always-exhaustive type</em>):</p>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Kiểu matched value</th>
      <th style="padding:8px 12px;text-align:left;">Compiler liệt kê được</th>
      <th style="padding:8px 12px;text-align:left;">Cách phủ hết</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>bool</code></td>
      <td style="padding:8px 12px;"><code>true</code>, <code>false</code></td>
      <td style="padding:8px 12px;">Hai case, hoặc <code>_</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>enum</code></td>
      <td style="padding:8px 12px;">mọi giá trị của enum</td>
      <td style="padding:8px 12px;">Mỗi giá trị một case, hoặc <code>_</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Sealed class</td>
      <td style="padding:8px 12px;">mọi subtype trực tiếp (khai báo cùng library)</td>
      <td style="padding:8px 12px;">Mỗi subtype một case, hoặc <code>_</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>T?</code></td>
      <td style="padding:8px 12px;">các giá trị của <code>T</code> cộng thêm <code>null</code></td>
      <td style="padding:8px 12px;">Phủ <code>T</code> và thêm case <code>null</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Record</td>
      <td style="padding:8px 12px;">tổ hợp các field (mỗi field theo các quy tắc trên)</td>
      <td style="padding:8px 12px;">Phủ mọi tổ hợp</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>int</code>, <code>String</code>, <code>double</code>, class thường</td>
      <td style="padding:8px 12px;">vô hạn</td>
      <td style="padding:8px 12px;">Chỉ một case khớp mọi giá trị của kiểu: <code>_</code>, <code>default</code>, <code>final n</code>, <code>int()</code> (không kèm guard)</td>
    </tr>
  </tbody>
</table>

<p>Với <code>int</code>, compiler không suy luận khoảng số: ba case <code>&lt; 0</code>, <code>0</code>, <code>&gt; 0</code> phủ hết số nguyên về mặt toán học, nhưng compiler vẫn báo thiếu <code>int()</code>. Exhaustiveness checking làm việc trên kiểu, không phải trên toán học.</p>

<p>Áp dụng cho hai dạng switch:</p>

<ul>
  <li><strong>Switch expression luôn phải đầy đủ</strong>, với mọi kiểu, vì nó phải trả về một giá trị cho mọi đầu vào.</li>
  <li><strong>Switch statement chỉ phải đầy đủ khi matched value có always-exhaustive type</strong>: <code>bool</code>, <code>Null</code>, enum, sealed type, <code>T?</code> hay record mà các thành phần đều là các kiểu đó. Thiếu case là lỗi compile <code>non_exhaustive_switch_statement</code>. Với <code>int</code>, <code>String</code>, <code>String?</code>, class thường, statement không có case nào khớp thì đơn giản là không làm gì.</li>
</ul>

<p>Sealed class là cách tự tạo một kiểu có tập subtype đóng. Bài này chỉ dùng <code>sealed</code> để minh hoạ exhaustiveness; khai báo và các class modifier khác nằm ở <a href="classes_mixins_sealed.md" target="_blank" rel="noopener">1.2.5 Classes, Mixins and Sealed Types</a>.</p>

<h4>Ví dụ: hiển thị state của màn hình hồ sơ</h4>

<p><strong>Bài toán:</strong> màn hình hồ sơ có ba state: đang tải, đã có dữ liệu, thất bại; sau này sẽ có thêm state (đang làm mới). Mỗi khi thêm state, <strong>mọi chỗ render chưa xử lý nó phải thành lỗi compile</strong>, thay vì lặng lẽ rơi vào nhánh mặc định.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li><code>sealed class ProfileState</code> có ba subtype trong cùng file: tập subtype đóng.</li>
  <li><code>render</code> dùng switch expression <strong>không có <code>_</code></strong>, mỗi subtype một case (<code>ProfileLoaded</code> tách hai case theo <code>followers</code>): compiler chứng minh được switch đầy đủ.</li>
  <li>Thêm subtype <code>ProfileRefreshing</code>: không gian có thêm một phần chưa bị che.</li>
  <li><code>dart analyze</code> báo lỗi tại <code>render</code>, chỉ ra pattern còn thiếu; sửa bằng một case mới.</li>
</ol>

<div class="mermaid">
flowchart LR
    A["(1) sealed ProfileState: Loading, Loaded, Failed"] --&gt; B["(2) switch không có _"]
    B --&gt; C{"Mọi subtype đã được che?"}
    C --&gt;|có| OK["Compile được"]
    C --&gt;|"(3) thêm Refreshing, chưa che"| ERR["(4) Lỗi non_exhaustive: thiếu ProfileRefreshing()"]
    ERR --&gt;|thêm case| B
</div>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// profile_state.dart
sealed class ProfileState {}                       // (1) tập subtype đóng

class ProfileLoading extends ProfileState {}

class ProfileLoaded extends ProfileState {
  ProfileLoaded(this.name, this.followers);
  final String name;
  final int followers;
}

class ProfileFailed extends ProfileState {
  ProfileFailed(this.message);
  final String message;
}

String render(ProfileState state) =&gt; switch (state) { // (2) không có \`_\`
      ProfileLoading() =&gt; 'Đang tải...',
      ProfileLoaded(:final name, followers: 0) =&gt; '$name chưa có người theo dõi',
      ProfileLoaded(:final name, :final followers) =&gt; '$name · $followers người theo dõi',
      ProfileFailed(:final message) =&gt; 'Lỗi: $message',
    };

void main() {
  for (final state in [
    ProfileLoading(),
    ProfileLoaded('Lan', 0),
    ProfileLoaded('Minh', 1200),
    ProfileFailed('Mất kết nối'),
  ]) {
    print(render(state));
  }
}</code></pre>

<p><strong>Kết quả:</strong> chạy in:</p>

<pre data-lang="text"><code>Đang tải...
Lan chưa có người theo dõi
Minh · 1200 người theo dõi
Lỗi: Mất kết nối</code></pre>

<p>Thêm <code>class ProfileRefreshing extends ProfileState {}</code> (bước 3) rồi chạy <code>dart analyze</code> (bước 4):</p>

<pre data-lang="text"><code>error - The type 'ProfileState' isn't exhaustively matched by the switch cases since it doesn't match the pattern 'ProfileRefreshing()'. Try adding a wildcard pattern or cases that match 'ProfileRefreshing()'. - non_exhaustive_switch_expression</code></pre>

<p>Exhaustiveness đi sâu cả vào field: nếu bỏ case <code>followers: 0</code> và đổi case còn lại thành <code>ProfileLoaded(:final name, followers: &gt; 0)</code>, compiler báo thiếu <code>ProfileLoaded(followers: int())</code>, vì <code>&gt; 0</code> không phủ hết <code>int</code>.</p>

<h3>Exception đồng bộ</h3>

<p>Khi một hàm không thể tiếp tục luồng bình thường, nó <strong>ném</strong> (throw) một object. Luồng chạy dừng tại đó và đi ngược lên chuỗi lời gọi tới khối <code>try</code> gần nhất có mệnh đề bắt phù hợp. Không ai bắt thì chương trình Dart dòng lệnh in lỗi kèm stack trace rồi dừng; trong Flutter, framework nhận lỗi qua cơ chế báo lỗi của nó.</p>

<p><strong>Ném:</strong></p>

<ul>
  <li><code>throw</code> ném được <strong>mọi object khác null</strong>, nhưng chỉ nên ném object implement <code>Exception</code> hoặc extend <code>Error</code>.</li>
  <li><code>throw</code> là <strong>biểu thức</strong> (kiểu <code>Never</code>), nên đặt được trong thân <code>=&gt;</code> và sau <code>??</code>: <code>final id = json['id'] ?? (throw FormatException('thiếu id'));</code>.</li>
  <li>Dart <strong>không có checked exception</strong> (giống Kotlin): hàm có thể ném gì phải được ghi trong doc comment.</li>
</ul>

<p><strong>Exception và Error mang hai ý nghĩa khác nhau:</strong></p>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;"></th>
      <th style="padding:8px 12px;text-align:left;"><code>Exception</code></th>
      <th style="padding:8px 12px;text-align:left;"><code>Error</code></th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Ý nghĩa</td>
      <td style="padding:8px 12px;">Tình huống bất thường <strong>dự đoán được</strong>, người gọi có thể xử lý</td>
      <td style="padding:8px 12px;"><strong>Lỗi lập trình</strong>, đáng lẽ code phải tránh</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Ví dụ</td>
      <td style="padding:8px 12px;"><code>FormatException</code> (<code>int.parse('ba')</code>), <code>IOException</code>, <code>TimeoutException</code></td>
      <td style="padding:8px 12px;"><code>RangeError</code> (index ngoài list), <code>TypeError</code> (cast sai), <code>StateError</code> (<code>reduce</code> trên list rỗng), <code>ArgumentError</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Có nên catch</td>
      <td style="padding:8px 12px;">Có, ở nơi biết cách xử lý</td>
      <td style="padding:8px 12px;">Không; sửa code. Chỉ bắt ở tầng ngoài cùng để ghi log, báo crash</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Tự định nghĩa</td>
      <td style="padding:8px 12px;"><code>class X implements Exception</code></td>
      <td style="padding:8px 12px;">Hiếm khi cần</td>
    </tr>
  </tbody>
</table>

<p>Chỉ class <strong>extend</strong> <code>Error</code> mới tự ghi stack trace vào getter <code>stackTrace</code> khi bị ném lần đầu; implement <code>Error</code> thì không.</p>

<p><strong>Bắt:</strong></p>

<pre data-lang="dart"><code>// Đặt giữ hàng từ ô nhập số lượng
try {
  final quantity = int.parse(input);
  reserve(quantity);
} on FormatException catch (e) {     // on: lọc theo kiểu; catch: lấy object
  showError('Số lượng không hợp lệ: \${e.source}');
} on OutOfStockException {           // chỉ cần kiểu, không cần object
  showError('Hết hàng');
} catch (e, stackTrace) {            // không có on: bắt mọi thứ còn lại
  logger.severe('Lỗi không mong đợi', e, stackTrace);
  rethrow;                           // ném tiếp đúng object và stack trace gốc
} finally {
  hideLoading();                     // luôn chạy: thành công, đã bắt, hay lỗi lọt ra ngoài
}</code></pre>

<ul>
  <li>Các mệnh đề <code>on</code>/<code>catch</code> được thử <strong>theo thứ tự</strong>, mệnh đề khớp đầu tiên xử lý: kiểu cụ thể đặt trước.</li>
  <li><code>catch (e, s)</code>: tham số thứ hai là <code>StackTrace</code> tại chỗ ném.</li>
  <li><code>rethrow</code> (chỉ dùng trong <code>catch</code>) ném tiếp exception đang xử lý, <strong>giữ nguyên stack trace gốc</strong> (khác <code>throw e;</code>, xem Sai lầm 7). Muốn đổi sang lỗi khác mà giữ stack trace cũ thì dùng <code>Error.throwWithStackTrace(newError, s)</code> (Dart 2.16).</li>
  <li><code>finally</code> chạy sau mệnh đề <code>catch</code> khớp. Nếu không mệnh đề nào khớp, exception được ném tiếp <strong>sau khi</strong> <code>finally</code> chạy xong. <code>finally</code> chạy cả khi <code>try</code> kết thúc bằng <code>return</code>.</li>
</ul>

<p><strong><code>assert(condition, message)</code></strong> ném <code>AssertionError</code> khi điều kiện sai, nhưng <strong>chỉ khi assert được bật</strong> (Flutter debug mode, <code>dart run --enable-asserts</code>, <code>dart test</code>). Ở bản release, assert bị bỏ qua và biểu thức bên trong không được tính: chỉ dùng cho giả định nội bộ, không dùng kiểm tra input.</p>

<div class="callout callout-important"><span class="callout-icon">🔴</span><div class="callout-body">Bài này chỉ nói về exception <strong>đồng bộ</strong>: lỗi ném ra trong lúc khối <code>try</code> đang chạy. Lỗi bên trong một <code>Future</code> hay <code>Stream</code> chỉ bắt được bằng <code>try</code>/<code>catch</code> khi bạn <code>await</code> nó; chi tiết ở <a href="../async/futures_async_await.md" target="_blank" rel="noopener">1.3.1 Futures and Async/Await</a>.</div></div>

<h4>Ví dụ: nhập đơn hàng từ file CSV</h4>

<p><strong>Bài toán:</strong> nhập đơn từ CSV, mỗi dòng <code>mã,tên,số lượng</code>. Dòng sai định dạng thì bỏ qua, ghi lỗi, đi tiếp; bản tổng kết luôn được in, kể cả khi một bug (một <code>Error</code>) làm vỡ vòng lặp.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li>Duyệt từng dòng.</li>
  <li><code>parseQuantity</code> kiểm tra số cột; sai thì ném <code>InvalidOrderLine</code> (implement <code>Exception</code>).</li>
  <li><code>int.parse</code> ném <code>FormatException</code> nếu số lượng không phải số.</li>
  <li>Hai mệnh đề <code>on ... catch</code> bắt đúng hai loại lỗi dữ liệu, ghi lại rồi đi tiếp. Một <code>Error</code> (bug) không khớp mệnh đề nào nên lọt ra ngoài.</li>
  <li><code>finally</code> của khối <code>try</code> ngoài luôn in tổng kết.</li>
</ol>

<div class="mermaid">
flowchart TD
    A["(1) Dòng tiếp theo"] --&gt; B{"(2) Đủ 3 cột?"}
    B --&gt;|"không: throw InvalidOrderLine"| E["(4) on InvalidOrderLine: ghi lỗi"]
    B --&gt;|có| C{"(3) int.parse thành công?"}
    C --&gt;|"không: FormatException"| F["(4) on FormatException: ghi lỗi"]
    C --&gt;|có| D["Cộng vào tổng"]
    D --&gt; H{"Hết dòng?"}
    E --&gt; H
    F --&gt; H
    H --&gt;|chưa| A
    H --&gt;|rồi| Z["(5) finally: in tổng kết"]
</div>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// order_import.dart
class InvalidOrderLine implements Exception {
  InvalidOrderLine(this.lineNumber, this.reason);
  final int lineNumber;
  final String reason;

  @override
  String toString() =&gt; 'Dòng $lineNumber: $reason';
}

int parseQuantity(String line, int lineNumber) {
  final columns = line.split(',');
  if (columns.length != 3) {
    throw InvalidOrderLine(lineNumber, 'cần 3 cột, có \${columns.length}'); // (2)
  }
  return int.parse(columns[2]); // (3) có thể ném FormatException
}

void importOrders(List&lt;String&gt; lines) {
  var total = 0;
  final errors = &lt;String&gt;[];
  try {
    for (var i = 0; i &lt; lines.length; i++) {           // (1) từng dòng
      try {
        total += parseQuantity(lines[i], i + 1);
      } on InvalidOrderLine catch (e) {                // (4) lỗi dữ liệu: ghi lại, đi tiếp
        errors.add(e.toString());
      } on FormatException catch (e) {
        errors.add('Dòng \${i + 1}: số lượng "\${e.source}" không phải số');
      }
    }
  } finally {
    print('Tổng số lượng: $total, lỗi: \${errors.length}'); // (5) luôn chạy
  }
  for (final error in errors) {
    print(error);
  }
}

void main() {
  importOrders([
    'SKU-01,Áo thun,2',
    'SKU-02,Quần jean',
    'SKU-03,Mũ,ba',
    'SKU-04,Tất,5',
  ]);
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>Tổng số lượng: 7, lỗi: 2
Dòng 2: cần 3 cột, có 2
Dòng 3: số lượng "ba" không phải số</code></pre>

<p>Dòng 1 và 4 được cộng (2 + 5). Nếu thay hai mệnh đề <code>on</code> bằng một <code>catch (e)</code>, hai dòng lỗi vẫn bị bỏ qua, nhưng một bug như đọc nhầm <code>columns[3]</code> (<code>RangeError</code>) cũng bị ghi thành "lỗi dữ liệu" và vòng lặp chạy tiếp như không có gì. Đó là lý do lọc bằng <code>on</code>.</p>

<h2>Ví dụ thực tế</h2>

<h3>Định tuyến deep link sang màn hình</h3>

<p><strong>Bài toán chính:</strong> app nhận deep link như <code>https://shop.example/product/42</code> hoặc <code>https://shop.example/search?q=giày&amp;page=3</code> và phải chọn đúng màn hình. Đường dẫn là list các segment, query là map: đúng địa bàn của list pattern và map pattern. Kết quả định tuyến là sealed class, nên nơi hiển thị bị compiler bắt xử lý đủ mọi route.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li>Switch expression trên <code>uri.pathSegments</code> (<code>List&lt;String&gt;</code>).</li>
  <li>List rỗng (<code>/</code>) là trang chủ.</li>
  <li><code>['product' || 'p', final idText]</code>: đúng hai segment, segment đầu là <code>product</code> hoặc alias cũ <code>p</code>. Switch lồng trên <code>int.tryParse(idText)</code>: null-check pattern <code>final id?</code> cộng guard <code>id &gt; 0</code>.</li>
  <li><code>['search']</code>: switch lồng trên <code>uri.queryParameters</code>. Case có <code>page</code> đặt <strong>trước</strong> case chỉ có <code>q</code>, vì map pattern bỏ qua key thừa (Sai lầm 2).</li>
  <li>Mọi đường dẫn khác: <code>NotFoundRoute</code>.</li>
  <li><code>screenTitle</code> switch trên sealed <code>AppRoute</code> không có <code>_</code>: quên xử lý route mới là lỗi compile.</li>
</ol>

<div class="mermaid">
flowchart TD
    U["Uri.parse(link)"] --&gt; S{"(1) pathSegments"}
    S --&gt;|"(2) rỗng"| H["HomeRoute"]
    S --&gt;|"(3) product hoặc p, idText"| P{"id là số &gt; 0?"}
    P --&gt;|có| PR["ProductRoute(id)"]
    P --&gt;|không| NF["NotFoundRoute"]
    S --&gt;|"(4) search"| Q{"query có q?"}
    Q --&gt;|có| SR["SearchRoute(query, page)"]
    Q --&gt;|không| NF
    S --&gt;|"(5) còn lại"| NF
    H --&gt; T["(6) screenTitle: switch đầy đủ trên AppRoute"]
    PR --&gt; T
    SR --&gt; T
    NF --&gt; T
</div>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// deep_link.dart
sealed class AppRoute {}

class HomeRoute extends AppRoute {}

class ProductRoute extends AppRoute {
  ProductRoute(this.id);
  final int id;
}

class SearchRoute extends AppRoute {
  SearchRoute(this.query, this.page);
  final String query;
  final int page;
}

class NotFoundRoute extends AppRoute {
  NotFoundRoute(this.uri);
  final Uri uri;
}

AppRoute parseDeepLink(Uri uri) =&gt; switch (uri.pathSegments) { // (1)
      [] =&gt; HomeRoute(),                                        // (2)
      ['product' || 'p', final idText] =&gt;                       // (3)
        switch (int.tryParse(idText)) {
          final id? when id &gt; 0 =&gt; ProductRoute(id),
          _ =&gt; NotFoundRoute(uri),
        },
      ['search'] =&gt; switch (uri.queryParameters) {              // (4)
          {'q': final query, 'page': final pageText} =&gt;
            SearchRoute(query, int.tryParse(pageText) ?? 1),
          {'q': final query} =&gt; SearchRoute(query, 1),
          _ =&gt; NotFoundRoute(uri),
        },
      _ =&gt; NotFoundRoute(uri),                                  // (5)
    };

String screenTitle(AppRoute route) =&gt; switch (route) {          // (6)
      HomeRoute() =&gt; 'Trang chủ',
      ProductRoute(:final id) =&gt; 'Sản phẩm #$id',
      SearchRoute(:final query, page: 1) =&gt; 'Tìm "$query"',
      SearchRoute(:final query, :final page) =&gt; 'Tìm "$query" · trang $page',
      NotFoundRoute(:final uri) =&gt; 'Không tìm thấy \${uri.path}',
    };

void main() {
  const links = [
    'https://shop.example/',
    'https://shop.example/product/42',
    'https://shop.example/p/42',
    'https://shop.example/product/abc',
    'https://shop.example/search?q=giày&amp;page=3',
    'https://shop.example/search?q=áo',
    'https://shop.example/cart/checkout',
  ];
  for (final link in links) {
    print(screenTitle(parseDeepLink(Uri.parse(link))));
  }
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>Trang chủ
Sản phẩm #42
Sản phẩm #42
Không tìm thấy /product/abc
Tìm "giày" · trang 3
Tìm "áo"
Không tìm thấy /cart/checkout</code></pre>

<p>Trong app Flutter, <code>screenTitle</code> sẽ trả về widget màn hình tương ứng; thư viện router làm việc này ở quy mô lớn hơn với cùng ý tưởng khớp đường dẫn.</p>

<h3>Tính phí vận chuyển theo hai tiêu chí</h3>

<p>Kết quả phụ thuộc <strong>tổ hợp</strong> nhiều giá trị thì gom thành record rồi switch trên record. <code>Zone</code> là enum nên compiler kiểm tra được mọi vùng đã có giá; khối lượng là <code>double</code> nên phủ bằng <code>_</code>.</p>

<pre data-lang="dart"><code>enum Zone { inner, suburb, province }

int shippingFee(Zone zone, double kg) =&gt; switch ((zone, kg)) {
      (Zone.inner, &lt;= 3) =&gt; 15000,
      (Zone.inner, _) =&gt; 25000,
      (Zone.suburb, &lt;= 3) =&gt; 25000,
      (Zone.suburb || Zone.province, _) =&gt; 40000,
    };
// shippingFee(Zone.inner, 2) == 15000, shippingFee(Zone.suburb, 5) == 40000</code></pre>

<p>Thêm <code>Zone.island</code> vào enum mà quên thêm giá là lỗi compile ngay tại hàm này.</p>

<h2>So sánh với các cách tiếp cận khác</h2>

<p>Switch expression gần với <code>when</code> của Kotlin. Điểm khác cần nhớ (bảng ánh xạ đầy đủ ở <a href="dart_for_kotlin_devs.md" target="_blank" rel="noopener">1.1.1 Dart for Kotlin Developers</a>):</p>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Việc cần làm</th>
      <th style="padding:8px 12px;text-align:left;">Kotlin</th>
      <th style="padding:8px 12px;text-align:left;">Dart 3</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Khoảng giá trị</td>
      <td style="padding:8px 12px;"><code>in 200..299 -&gt;</code></td>
      <td style="padding:8px 12px;"><code>&gt;= 200 &amp;&amp; &lt; 300 =&gt;</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Kiểm tra kiểu và lấy field</td>
      <td style="padding:8px 12px;"><code>is Loaded -&gt; state.name</code> (smart cast)</td>
      <td style="padding:8px 12px;"><code>Loaded(:final name) =&gt;</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Destructuring</td>
      <td style="padding:8px 12px;"><code>val (a, b) = pair</code> qua <code>componentN()</code></td>
      <td style="padding:8px 12px;">record, list, map, object pattern, lồng nhau</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Điều kiện phụ</td>
      <td style="padding:8px 12px;">guard <code>is Loaded if cond -&gt;</code> (Kotlin 2.2), hoặc <code>when</code> không subject</td>
      <td style="padding:8px 12px;">guard <code>when</code> sau pattern</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Kiểm tra đầy đủ</td>
      <td style="padding:8px 12px;"><code>when</code> biểu thức luôn; <code>when</code> statement trên sealed/enum/<code>Boolean</code> (từ Kotlin 1.7)</td>
      <td style="padding:8px 12px;">switch expression luôn; statement khi kiểu là always-exhaustive (bool/enum/sealed...)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Exception</td>
      <td style="padding:8px 12px;"><code>try</code> là biểu thức</td>
      <td style="padding:8px 12px;"><code>try</code> là statement, có <code>on</code> lọc kiểu và <code>rethrow</code></td>
    </tr>
  </tbody>
</table>

<h2>Khi nào nên và không nên dùng</h2>

<p><strong>Chọn cấu trúc rẽ nhánh:</strong></p>

<ul>
  <li><strong><code>if</code>/<code>else</code></strong>: điều kiện <code>bool</code> đơn giản, một hai nhánh. Đừng đổi <code>if (count &gt; 0)</code> thành switch chỉ vì có pattern.</li>
  <li><strong>if-case</strong>: chỉ quan tâm <strong>một</strong> hình dạng và cần lấy dữ liệu ra (một key trong JSON, một loại message).</li>
  <li><strong>Switch expression</strong>: từ một giá trị <strong>tính ra</strong> một giá trị (chuỗi hiển thị, widget, route, phí); lựa chọn mặc định khi mọi nhánh trả về cùng một kiểu.</li>
  <li><strong>Switch statement</strong>: mỗi nhánh <strong>thực thi</strong> câu lệnh có side effect (ghi log, gọi API, cập nhật state).</li>
</ul>

<p><strong>Có dùng <code>_</code> hay không:</strong></p>

<ul>
  <li>Sealed/enum do chính bạn sở hữu: <strong>không</strong> dùng <code>_</code>, để compiler báo khi có subtype hoặc giá trị mới (Sai lầm 5).</li>
  <li><code>int</code>, <code>String</code>, JSON: bắt buộc có <code>_</code>, và nhánh đó nên xử lý thật (thông báo lỗi, ghi log).</li>
</ul>

<p><strong>Exception:</strong></p>

<ul>
  <li>Ném khi hàm <strong>không thể hoàn thành</strong> đúng hợp đồng của nó (input sai định dạng, tài nguyên không có).</li>
  <li>Không dùng exception cho kết quả bình thường dự đoán được: "không tìm thấy" thường nên là <code>null</code> (như <code>int.tryParse</code>) hoặc một subtype của sealed result, để compiler buộc người gọi xử lý.</li>
</ul>

<h2>Sai lầm thường gặp</h2>

<h3>1. Dùng record pattern để tách MapEntry</h3>

<pre data-lang="dart"><code>for (final (:key, :value) in prices.entries) {
  print('$key: $value');
}
// error - The matched value of type 'MapEntry&lt;String, int&gt;' isn't assignable to the
// required type '({Object? key, Object? value})'.</code></pre>

<p><code>MapEntry</code> là class có getter <code>key</code>, <code>value</code>, không phải record. Sửa: <code>for (final MapEntry(:key, :value) in prices.entries)</code>.</p>

<h3>2. Tưởng list pattern cũng bỏ qua phần thừa như map pattern</h3>

<p><code>case ['search', final keyword]:</code> không khớp <code>['search', 'giày', 'nam']</code> vì list pattern đòi đúng số phần tử; cần chấp nhận phần đuôi thì thêm rest: <code>['search', final keyword, ...]</code>. Ngược lại, map pattern bỏ qua key thừa, nên case ít key đặt trước sẽ nuốt case nhiều key đặt sau: đặt case cụ thể hơn lên trên.</p>

<h3>3. Destructure dữ liệu chưa kiểm chứng ở irrefutable context</h3>

<pre data-lang="dart"><code>final {'id': id} = response;   // response thiếu key 'id'
// Bad state: Pattern matching error</code></pre>

<p>Compile được, nhưng crash lúc chạy với thông báo không nói thiếu gì. Dữ liệu từ bên ngoài phải qua <code>if (response case {'id': int id})</code> hoặc switch có nhánh <code>_</code>.</p>

<h3>4. So sánh với biến thường bằng tên trần trong case</h3>

<pre data-lang="dart"><code>String checkAttempt(int attempt, int limit) =&gt; switch (attempt) {
      limit =&gt; 'Hết lượt', // error - The expression of a constant pattern must be a valid constant.
      _ =&gt; 'Thử lại',
    };</code></pre>

<p>Trong case, tên trần là constant pattern. Sửa bằng guard: <code>final n when n &gt;= limit =&gt; 'Hết lượt'</code>.</p>

<h3>5. Thêm <code>_</code> vào switch trên sealed class "cho chắc"</h3>

<p><code>_ =&gt; 'Không rõ'</code> làm switch luôn đầy đủ, nên khi thêm subtype mới compiler <strong>không</strong> báo gì và màn hình lặng lẽ hiện nội dung mặc định. Bỏ <code>_</code> để exhaustiveness checking làm việc.</p>

<h3>6. <code>catch (e)</code> không lọc kiểu</h3>

<p>Bắt cả <code>Error</code> (<code>RangeError</code>, <code>TypeError</code>) rồi hiện "Có lỗi, thử lại" làm bug bị che đi. Lọc bằng <code>on FormatException</code>, <code>on OutOfStockException</code>...; chỉ bắt tất cả ở tầng ngoài cùng để ghi log, báo crash, rồi <code>rethrow</code>.</p>

<h3>7. <code>throw e</code> thay vì <code>rethrow</code></h3>

<p>Stack trace bắt đầu lại từ dòng <code>throw e</code>, báo cáo crash chỉ tới hàm xử lý lỗi thay vì chỗ hỏng thật. Dùng <code>rethrow</code>.</p>

<h3>8. Ném String, hoặc dùng assert để kiểm tra input</h3>

<p><code>throw 'Sai mật khẩu'</code> chạy được, nhưng <code>on Exception</code> không bắt được nó và nó không mang ý nghĩa Exception hay Error. <code>assert(amount &gt; 0)</code> để chặn số tiền âm từ người dùng thì ở bản release kiểm tra biến mất. Định nghĩa <code>class InvalidAmount implements Exception</code> và <code>throw</code> thật.</p>

<h2>Lịch sử phát triển</h2>

<ul>
  <li><strong>Dart 1.0 (2013)</strong>: <code>switch</code> kiểu C/Java (<code>case</code> là hằng số so bằng <code>==</code>), nhưng không cho rơi ngầm xuống case sau, nguồn bug kinh điển của C: thân case không rỗng phải kết thúc bằng <code>break</code>/<code>continue</code>/<code>return</code>/<code>throw</code>. Dart 1 chỉ cảnh báo lúc phân tích và ném <code>FallThroughError</code> nếu lúc chạy vẫn rơi xuống. Exception theo mô hình <code>try</code>/<code>on</code>/<code>catch</code>/<code>finally</code>, không có checked exception.</li>
  <li><strong>Dart 2.0 (2018)</strong>: rơi ngầm giữa các case thành lỗi compile, <code>FallThroughError</code> không còn được ném (class này bị gỡ ở Dart 3.0).</li>
  <li><strong>Dart 2.16 (2022)</strong>: thêm <code>Error.throwWithStackTrace</code>, ném lỗi mới mà giữ stack trace cũ khi đổi kiểu lỗi ở ranh giới thư viện.</li>
  <li><strong>Dart 3.0 (5/2023)</strong>: thay đổi lớn nhất của control flow. Thêm patterns, records, switch expression, if-case, sealed class và exhaustiveness checking; <code>case</code> là pattern thay vì biểu thức hằng; thân case không cần <code>break</code>; <code>continue</code> tới label không phải vòng lặp hay case thành lỗi compile. Switch statement thiếu case trên enum trước đó chỉ là warning, trên <code>bool</code> không bị kiểm tra; từ 3.0 cả hai là lỗi compile. Lý do: UI và state của Flutter viết hoàn toàn bằng code, cần rẽ nhánh an toàn theo hình dạng dữ liệu kiểu algebraic data type (như sealed class cộng <code>when</code> của Kotlin); exhaustiveness biến "quên xử lý trường hợp mới" thành lỗi compile.</li>
  <li><strong>Dart 3.7 (2/2025)</strong>: wildcard variables: <code>_</code> làm tên biến cục bộ hay tham số không còn tạo biến, thống nhất với <code>_</code> trong pattern.</li>
  <li><strong>Dart 3.10 (11/2025)</strong>: dot shorthands, viết <code>.red</code> thay cho <code>Light.red</code> khi kiểu suy ra được, kể cả trong case: <code>switch (light) { .red =&gt; 'dừng', ... }</code>.</li>
</ul>

<h2>Kết nối hệ thống</h2>

<ul>
  <li><strong>Tiên quyết</strong>:
<ul>
  <li><a href="variables_and_types.md" target="_blank" rel="noopener">1.2.1 Variables and Types</a>: kiểu record, null safety, type promotion sau <code>is</code>.</li>
  <li><a href="functions_operators.md" target="_blank" rel="noopener">1.2.2 Functions and Operators</a>: toán tử so sánh, logic, ba ngôi, hàm <code>=&gt;</code>.</li>
</ul></li>
  <li><strong>Liên quan</strong>:
<ul>
  <li><a href="collections_functional.md" target="_blank" rel="noopener">1.2.4 Collections and Functional APIs</a>: collection <code>if</code>/<code>for</code>, <code>Iterable</code> mà <code>for-in</code> duyệt qua.</li>
  <li><a href="classes_mixins_sealed.md" target="_blank" rel="noopener">1.2.5 Classes, Mixins and Sealed Types</a>: khai báo sealed class, enhanced enum, class modifiers.</li>
  <li><a href="../async/futures_async_await.md" target="_blank" rel="noopener">1.3.1 Futures and Async/Await</a>: bắt lỗi của <code>Future</code> bằng <code>try</code>/<code>catch</code> cùng <code>await</code>.</li>
  <li><a href="dart_for_kotlin_devs.md" target="_blank" rel="noopener">1.1.1 Dart for Kotlin Developers</a>: ánh xạ <code>when</code>, smart cast, destructuring của Kotlin sang Dart.</li>
</ul></li>
  <li><strong>Học tiếp</strong>: <a href="collections_functional.md" target="_blank" rel="noopener">1.2.4 Collections and Functional APIs</a> theo thứ tự mục lục, rồi <a href="classes_mixins_sealed.md" target="_blank" rel="noopener">1.2.5 Classes, Mixins and Sealed Types</a> để tự thiết kế state bằng sealed class. Switch expression trên state là cách chọn widget theo state ở 3.1.1 Stateless and Stateful Widgets (chưa có bài).</li>
</ul>

<h2>Tham khảo</h2>

<ul>
  <li><a href="https://dart.dev/language/branches" target="_blank" rel="noopener">Branches: if, if-case, switch, exhaustiveness, guard</a> (dart.dev)</li>
  <li><a href="https://dart.dev/language/loops" target="_blank" rel="noopener">Loops: for, while, break, continue</a> (dart.dev)</li>
  <li><a href="https://dart.dev/language/patterns" target="_blank" rel="noopener">Patterns</a> và <a href="https://dart.dev/language/pattern-types" target="_blank" rel="noopener">Pattern types</a> (dart.dev)</li>
  <li><a href="https://dart.dev/language/error-handling" target="_blank" rel="noopener">Error handling: throw, catch, finally, assert</a> (dart.dev)</li>
  <li><a href="https://api.dart.dev/dart-core/Error-class.html" target="_blank" rel="noopener">Error class</a> và <a href="https://api.dart.dev/dart-core/Exception-class.html" target="_blank" rel="noopener">Exception class</a> (api.dart.dev)</li>
  <li><a href="https://github.com/dart-lang/sdk/blob/main/CHANGELOG.md" target="_blank" rel="noopener">Dart SDK CHANGELOG</a>: các mục 3.10.0, 3.7.0, 3.0.0, 2.16.0</li>
</ul>
    `
  },

  'flutter-dart-collections-functional': {
    title: 'Collections and Functional APIs',
    summary: 'Collection là object chứa một nhóm phần tử, gồm List (dãy có thứ tự), Set (không trùng lặp) và Map (tra value theo key). Functional API là các method trên Iterable nhận một hàm để mô tả cách biến đổi phần tử; phần lớn trả về một Iterable lazy, chỉ tính khi được duyệt và tính lại mỗi lần duyệt.',
    status: 'published',
    difficulty: 'beginner',
    estimatedReadingTime: '26 phút',
    depth: 'standard',
    tags: ['flutter', 'dart', 'session-01', 'collections', 'iterable', 'lazy-evaluation', 'functional-programming', 'generators'],
    domain: 'Flutter Development',
    module: 'Session 01: Dart Foundations',
    prerequisites: ['flutter.dart.variables_types', 'flutter.dart.functions_operators', 'flutter.dart.control_flow_patterns'],
    related: ['flutter.dart.classes_mixins_sealed', 'flutter.dart.dart_for_kotlin_devs', 'flutter.async.streams'],
    learningOutcomes: [
      'Phân biệt được List, Set, Map và chọn đúng loại theo cách truy cập dữ liệu (theo thứ tự, không trùng lặp, tra theo key).',
      'Áp dụng được collection literal với collection if, collection for, spread và null-aware element để dựng collection có điều kiện.',
      'Giải thích được lazy evaluation của Iterable, method nào chỉ thêm bước vào chuỗi xử lý và method nào thực sự duyệt, và vì sao duyệt lại thì callback chạy lại.',
      'Triển khai được chuỗi xử lý dữ liệu bằng where, map, expand, fold, any, every, firstWhere và generator sync*.',
      'Nhận diện được các bẫy mutability và equality của collection, gồm final list vẫn sửa được, const và List.unmodifiable chỉ chặn sửa lúc chạy, sort sửa tại chỗ và không ổn định, == so sánh identity.'
    ],
    knowledgeGap: 'Không hiểu Iterable lazy thì callback có side effect chạy hai lần, kết quả lọc đổi theo biến đã bị sửa sau đó, và một chuỗi map lặp lại trong build làm UI chậm. Không nắm mutability và equality thì sort làm hỏng dữ liệu gốc mà màn hình khác đang dùng, sửa list const crash lúc chạy dù compile vẫn qua, và so sánh state bằng == luôn ra false khiến UI rebuild thừa hoặc không rebuild khi cần.',
    updatedAt: '2026-11-10',
    readTime: '26 phút',
    content: `
<h2>Vấn đề cần giải quyết</h2>

<p>Phần lớn code của một app là <strong>biến đổi một nhóm dữ liệu thành một nhóm dữ liệu khác</strong>: danh sách đơn hàng thành tổng doanh thu, danh sách sản phẩm thành danh sách widget, tham số lọc thành query string. Mỗi lần như vậy phải trả lời bốn câu hỏi:</p>

<ol>
  <li><strong>Chứa dữ liệu bằng gì?</strong> Cần giữ thứ tự, cần loại trùng, hay cần tra nhanh theo key?</li>
  <li><strong>Dựng collection có điều kiện thế nào?</strong> Phần tử này chỉ có khi người dùng đã đăng nhập, entry kia chỉ có khi giá trị khác null.</li>
  <li><strong>Biến đổi xảy ra lúc nào?</strong> Ngay khi gọi <code>map</code>, hay chỉ khi có người đọc kết quả? Đọc hai lần thì tính mấy lần?</li>
  <li><strong>Ai được sửa collection?</strong> Truyền một list cho hàm khác, hàm đó <code>sort()</code> thì bản của mình có đổi không?</li>
</ol>

<p>Vòng lặp thủ công trả lời được câu 1 và 2 nhưng dài, nhiều biến tạm. Dùng <code>map</code>/<code>where</code> mà không hiểu câu 3 và 4 thì gặp lỗi rất khó thấy:</p>

<pre data-lang="dart"><code>var minPrice = 100;
final expensive = [80, 150, 600].where((price) =&gt; price &gt; minPrice);
minPrice = 500;
print(expensive.toList()); // [600], không phải [150, 600]</code></pre>

<p><code>where</code> không lọc ngay lúc gọi; nó chỉ lọc khi <code>toList()</code> duyệt, và lúc đó <code>minPrice</code> đã là 500.</p>

<h2>Sau khi học xong</h2>

<ul>
  <li>Phân biệt được List, Set, Map và chọn đúng loại theo cách truy cập dữ liệu (theo thứ tự, không trùng lặp, tra theo key).</li>
  <li>Áp dụng được collection literal với collection if, collection for, spread và null-aware element để dựng collection có điều kiện.</li>
  <li>Giải thích được lazy evaluation của Iterable, method nào chỉ thêm bước vào chuỗi xử lý và method nào thực sự duyệt, và vì sao duyệt lại thì callback chạy lại.</li>
  <li>Triển khai được chuỗi xử lý dữ liệu bằng where, map, expand, fold, any, every, firstWhere và generator sync*.</li>
  <li>Nhận diện được các bẫy mutability và equality của collection, gồm final list vẫn sửa được, const và List.unmodifiable chỉ chặn sửa lúc chạy, sort sửa tại chỗ và không ổn định, == so sánh identity.</li>
</ul>

<h2>Collections and Functional APIs là gì?</h2>

<p><strong>Collection</strong> là object chứa một nhóm phần tử: <code>List</code> (dãy có thứ tự, truy cập theo chỉ số), <code>Set</code> (không có phần tử trùng) và <code>Map</code> (tra value theo key). <code>List</code> và <code>Set</code> là <strong><code>Iterable</code></strong>: một nguồn phần tử duyệt được lần lượt từ đầu tới cuối. <strong>Functional API</strong> là các method trên <code>Iterable</code> nhận một hàm (<code>map</code>, <code>where</code>, <code>fold</code>...) để mô tả cách biến đổi phần tử; phần lớn trả về một <code>Iterable</code> <strong>lazy</strong>, chỉ tính khi được duyệt và tính lại mỗi lần duyệt.</p>

<p>Mental model: một <code>Iterable</code> lazy là <strong>một công thức nấu ăn, chưa phải món ăn</strong>. <code>map</code>, <code>where</code> chỉ ghi thêm bước vào công thức. Chỉ khi có người "ăn" (duyệt bằng <code>for</code>, gọi <code>toList</code>, <code>fold</code>, <code>first</code>...) thì công thức mới được nấu, mỗi lần ăn là nấu lại từ đầu với nguyên liệu tại thời điểm đó. <code>toList()</code> là nấu một lần rồi cất vào hộp: <code>List</code> là món đã nấu xong.</p>

<h2>Cách hoạt động</h2>

<h3>List, Set, Map: ba cách tổ chức phần tử</h3>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;"></th>
      <th style="padding:8px 12px;text-align:left;"><code>List&lt;E&gt;</code></th>
      <th style="padding:8px 12px;text-align:left;"><code>Set&lt;E&gt;</code></th>
      <th style="padding:8px 12px;text-align:left;"><code>Map&lt;K, V&gt;</code></th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Literal</td>
      <td style="padding:8px 12px;"><code>['a', 'b']</code></td>
      <td style="padding:8px 12px;"><code>{'a', 'b'}</code></td>
      <td style="padding:8px 12px;"><code>{'a': 1}</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Thứ tự</td>
      <td style="padding:8px 12px;">Theo chỉ số</td>
      <td style="padding:8px 12px;">Mặc định giữ thứ tự chèn</td>
      <td style="padding:8px 12px;">Mặc định giữ thứ tự chèn của key</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Trùng lặp</td>
      <td style="padding:8px 12px;">Cho phép</td>
      <td style="padding:8px 12px;">Không (dựa trên <code>==</code> và <code>hashCode</code>)</td>
      <td style="padding:8px 12px;">Key không trùng, value tuỳ ý</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Truy cập chính</td>
      <td style="padding:8px 12px;"><code>list[i]</code></td>
      <td style="padding:8px 12px;"><code>set.contains(x)</code></td>
      <td style="padding:8px 12px;"><code>map[key]</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Là <code>Iterable</code></td>
      <td style="padding:8px 12px;">Có</td>
      <td style="padding:8px 12px;">Có</td>
      <td style="padding:8px 12px;">Không; duyệt qua <code>keys</code>, <code>values</code>, <code>entries</code></td>
    </tr>
  </tbody>
</table>

<p>Những điểm khác Kotlin và dễ sai:</p>

<ul>
  <li><strong>Literal mặc định</strong>: <code>[...]</code> là list <strong>growable</strong> (thêm, bớt được); <code>{...}</code> có phần tử là <code>LinkedHashSet</code>, <code>{k: v}</code> là <code>LinkedHashMap</code>, nên duyệt Set và Map ra đúng thứ tự chèn.</li>
  <li><strong><code>{}</code> rỗng là <code>Map</code>, không phải <code>Set</code>.</strong> <code>var tags = {};</code> có kiểu <code>Map&lt;dynamic, dynamic&gt;</code>. Set rỗng phải viết <code>&lt;String&gt;{}</code>. Tương tự, list rỗng nên ghi kiểu: <code>&lt;String&gt;[]</code>, nếu không sẽ thành <code>List&lt;dynamic&gt;</code>.</li>
  <li><strong><code>map[key]</code> luôn trả <code>V?</code></strong>, kể cả khi <code>V</code> không nullable, vì key có thể không tồn tại. Dùng <code>map[key] ?? defaultValue</code>, hoặc <code>containsKey</code> khi <code>null</code> cũng là một value hợp lệ. Null-aware operator nằm ở <a href="variables_and_types.md" target="_blank" rel="noopener">1.2.1 Variables and Types</a>.</li>
  <li><strong>Constructor có bẫy</strong>: <code>List.filled(n, value)</code> tạo list <strong>fixed-length</strong> (gọi <code>add</code> ném <code>UnsupportedError</code>) và mọi ô <strong>dùng chung một object</strong> <code>value</code>. <code>List.filled(3, &lt;int&gt;[])</code> là ba tham chiếu tới cùng một list; cần ba list riêng thì dùng <code>List.generate(3, (_) =&gt; &lt;int&gt;[])</code>.</li>
  <li>Thao tác Map hay dùng: <code>putIfAbsent(key, () =&gt; v)</code>, <code>update(key, (old) =&gt; ..., ifAbsent: () =&gt; ...)</code>, <code>remove(key)</code>, <code>entries</code> (các <code>MapEntry</code> có <code>key</code>, <code>value</code>), <code>Map.fromEntries(...)</code>.</li>
</ul>

<h4>Ví dụ: thống kê hashtag trong các bài đăng</h4>

<p><strong>Bài toán:</strong> từ danh sách bài đăng, cần biết những tác giả nào đã đăng (mỗi người một lần) và mỗi hashtag xuất hiện bao nhiêu lần. "Mỗi người một lần" là việc của <code>Set</code>; "đếm theo hashtag" là việc của <code>Map</code> với key là hashtag.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li>Duyệt từng bài đăng.</li>
  <li>Thêm tác giả vào <code>Set</code>: đã có thì <code>add</code> không làm gì.</li>
  <li>Với mỗi hashtag, <code>update</code> tăng bộ đếm nếu key đã có, <code>ifAbsent</code> tạo key mới với giá trị 1.</li>
  <li>In Set và Map: thứ tự đúng như lúc chèn.</li>
  <li>Đọc một key không tồn tại trả <code>null</code>, dùng <code>??</code> để có giá trị mặc định.</li>
</ol>

<div class="mermaid">
flowchart TD
    A["(1) Bài đăng tiếp theo"] --&gt; B["(2) authors.add(author)"]
    B --&gt; C{"(3) tag đã có trong tagCounts?"}
    C --&gt;|có| D["tăng count lên 1"]
    C --&gt;|chưa| E["ifAbsent: tạo với 1"]
    D --&gt; F{"Hết bài?"}
    E --&gt; F
    F --&gt;|chưa| A
    F --&gt;|rồi| G["(4) In theo thứ tự chèn"]
    G --&gt; H["(5) tagCounts['kotlin'] ?? 0"]
</div>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// hashtag_stats.dart
void main() {
  const posts = [
    (author: 'lan', tags: ['flutter', 'dart']),
    (author: 'minh', tags: ['dart']),
    (author: 'lan', tags: ['flutter', 'firebase']),
  ];

  final authors = &lt;String&gt;{};                       // Set: mỗi tác giả một lần
  final tagCounts = &lt;String, int&gt;{};                // Map: hashtag -&gt; số lần

  for (final post in posts) {                       // (1) duyệt từng bài
    authors.add(post.author);                       // (2) trùng thì Set bỏ qua
    for (final tag in post.tags) {
      tagCounts.update(tag, (count) =&gt; count + 1,   // (3) đã có key: tăng
          ifAbsent: () =&gt; 1);                       //     chưa có: tạo với 1
    }
  }

  print('Tác giả: $authors');                       // (4) giữ thứ tự chèn
  print('Hashtag: $tagCounts');
  print('Số lần #kotlin: \${tagCounts['kotlin'] ?? 0}'); // (5) key vắng mặt -&gt; null
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>Tác giả: {lan, minh}
Hashtag: {flutter: 2, dart: 2, firebase: 1}
Số lần #kotlin: 0</code></pre>

<h3>Collection literal: if, for, spread, null-aware element</h3>

<p>Trong một literal <code>[...]</code>, <code>{...}</code>, ngoài phần tử thường còn đặt được <strong>element điều khiển</strong>. Chúng không phải câu lệnh (không có ngoặc nhọn, không có <code>;</code>), mà là cách <strong>sinh ra 0, 1 hoặc nhiều phần tử</strong> ngay tại chỗ:</p>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Element</th>
      <th style="padding:8px 12px;text-align:left;">Cú pháp</th>
      <th style="padding:8px 12px;text-align:left;">Sinh ra</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Collection if</td>
      <td style="padding:8px 12px;"><code>if (cond) x</code> hoặc <code>if (cond) x else y</code></td>
      <td style="padding:8px 12px;"><code>x</code> khi điều kiện đúng; không có gì (hoặc <code>y</code>) khi sai</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">If-case</td>
      <td style="padding:8px 12px;"><code>if (value case pattern) x</code></td>
      <td style="padding:8px 12px;"><code>x</code> khi pattern khớp (pattern ở <a href="control_flow_patterns.md" target="_blank" rel="noopener">1.2.3 Control Flow and Patterns</a>)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Collection for</td>
      <td style="padding:8px 12px;"><code>for (final item in items) f(item)</code></td>
      <td style="padding:8px 12px;">Một phần tử cho mỗi lượt lặp</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Spread</td>
      <td style="padding:8px 12px;"><code>...other</code></td>
      <td style="padding:8px 12px;">Toàn bộ phần tử của <code>other</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Null-aware spread</td>
      <td style="padding:8px 12px;"><code>...?other</code></td>
      <td style="padding:8px 12px;">Như spread, <code>other</code> là <code>null</code> thì không sinh gì</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Null-aware element</td>
      <td style="padding:8px 12px;"><code>?value</code> (list, set); <code>?key: value</code> hoặc <code>key: ?value</code> (map)</td>
      <td style="padding:8px 12px;"><code>value</code> nếu khác <code>null</code>, bỏ qua nếu là <code>null</code> (với map: bỏ cả entry)</td>
    </tr>
  </tbody>
</table>

<p>Các element lồng nhau được (<code>for</code> bên trong <code>if</code>, <code>if</code> bên trong <code>for</code>). Null-aware element cần Dart 3.8 trở lên (<code>sdk: ^3.8.0</code> trong <code>pubspec.yaml</code>). Kotlin không có cú pháp tương đương trong literal; gần nhất là <code>buildList { if (...) add(x) }</code> hoặc <code>listOfNotNull(...)</code>.</p>

<h4>Ví dụ: dựng query parameters cho API tìm kiếm</h4>

<p><strong>Bài toán:</strong> màn hình tìm kiếm có từ khoá bắt buộc và nhiều bộ lọc tuỳ chọn. Query gửi lên server chỉ được chứa bộ lọc người dùng đã chọn: không gửi <code>category=null</code>, không gửi <code>stock=false</code>. Một Map literal với element điều khiển mô tả đúng "map này gồm những gì" mà không cần <code>if</code> rời rạc sau khi tạo.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li><code>q</code> luôn có.</li>
  <li><code>category</code> là <code>String?</code>: null-aware value <code>?category</code> bỏ cả entry nếu null.</li>
  <li><code>stock</code> chỉ có khi bật lọc còn hàng: collection if.</li>
  <li>Mỗi thương hiệu một entry <code>brand[i]</code>: collection for kết hợp <code>indexed</code> (cặp chỉ số và phần tử).</li>
  <li>Bộ lọc bổ sung có thể null: null-aware spread <code>...?</code>.</li>
</ol>

<div class="mermaid">
flowchart LR
    Q["(1) q"] --&gt; M["Map kết quả"]
    C{"(2) category khác null?"} --&gt;|có| M
    S{"(3) inStockOnly?"} --&gt;|có| M
    B["(4) mỗi brand: brand[i]"] --&gt; M
    X{"(5) extraFilters khác null?"} --&gt;|có, trải ra| M
</div>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// search_query.dart
Map&lt;String, String&gt; buildSearchQuery({
  required String keyword,
  String? category,
  bool inStockOnly = false,
  List&lt;String&gt; brands = const [],
  Map&lt;String, String&gt;? extraFilters,
}) {
  return {
    'q': keyword,                                   // (1) luôn có
    'category': ?category,                          // (2) null thì bỏ cả entry
    if (inStockOnly) 'stock': 'in',                 // (3) collection if
    for (final (i, brand) in brands.indexed)        // (4) collection for
      'brand[$i]': brand,
    ...?extraFilters,                               // (5) null-aware spread
  };
}

void main() {
  print(buildSearchQuery(keyword: 'giày'));
  print(buildSearchQuery(
    keyword: 'giày',
    category: 'the-thao',
    inStockOnly: true,
    brands: ['nike', 'adidas'],
    extraFilters: {'sort': 'price_asc'},
  ));
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>{q: giày}
{q: giày, category: the-thao, stock: in, brand[0]: nike, brand[1]: adidas, sort: price_asc}</code></pre>

<p>Trong Flutter, đây chính là cách dựng danh sách widget con, vì <code>children</code> là một <code>List&lt;Widget&gt;</code>:</p>

<pre data-lang="dart"><code>// Code Flutter: product_list_screen.dart (trong build)
Column(
  children: [
    const Text('Sản phẩm'),
    if (isLoading) const LinearProgressIndicator(),
    ?promoBanner,                                   // Widget? : null thì không hiện
    for (final product in products) ProductTile(product: product),
    if (!isLoading &amp;&amp; products.isEmpty) const Text('Không có sản phẩm'),
  ],
)</code></pre>

<h3>Iterable và lazy evaluation</h3>

<p><code>Iterable&lt;E&gt;</code> là bất cứ thứ gì đưa ra được một <code>Iterator</code> để lấy lần lượt từng phần tử. <code>for-in</code> chỉ cần một <code>Iterable</code>. Method của <code>Iterable</code> chia làm hai nhóm, và đây là điều quan trọng nhất của bài:</p>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Nhóm</th>
      <th style="padding:8px 12px;text-align:left;">Method</th>
      <th style="padding:8px 12px;text-align:left;">Khi gọi</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><strong>Lazy</strong> (thêm bước vào công thức)</td>
      <td style="padding:8px 12px;"><code>map</code>, <code>where</code>, <code>whereType</code>, <code>expand</code>, <code>take</code>, <code>skip</code>, <code>takeWhile</code>, <code>skipWhile</code>, <code>followedBy</code>, <code>cast</code>, <code>nonNulls</code>, <code>indexed</code></td>
      <td style="padding:8px 12px;">Trả về <code>Iterable</code> mới ngay lập tức, <strong>chưa gọi callback nào</strong></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><strong>Duyệt thật</strong> (nấu)</td>
      <td style="padding:8px 12px;"><code>for-in</code>, <code>toList</code>, <code>toSet</code>, <code>fold</code>, <code>reduce</code>, <code>forEach</code>, <code>join</code>, <code>any</code>, <code>every</code>, <code>contains</code>, <code>first</code>, <code>firstWhere</code>, <code>last</code>, <code>length</code> (với phần lớn Iterable lazy)</td>
      <td style="padding:8px 12px;">Lấy phần tử từ nguồn, gọi callback của các bước trước</td>
    </tr>
  </tbody>
</table>

<p>Hệ quả của mental model công thức:</p>

<ul>
  <li><strong>Duyệt bao nhiêu lần, tính bấy nhiêu lần.</strong> Mỗi lần duyệt chạy lại toàn bộ chuỗi <code>map</code>/<code>where</code> từ nguồn. Callback có side effect (log, đếm, gọi API) sẽ chạy lại.</li>
  <li><strong>Đọc nguyên liệu tại thời điểm duyệt.</strong> Biến mà callback dùng, hoặc chính list nguồn, bị sửa sau khi gọi <code>where</code> thì kết quả theo giá trị mới (ví dụ ở "Vấn đề cần giải quyết").</li>
  <li><strong>Xử lý từng phần tử qua cả chuỗi.</strong> Với <code>list.where(a).map(b)</code>, phần tử 1 qua <code>a</code> rồi <code>b</code>, sau đó mới tới phần tử 2; không có list trung gian.</li>
  <li><strong>Dừng sớm được.</strong> <code>first</code>, <code>any</code>, <code>take(3)</code> chỉ kéo đủ phần tử cần dùng. Nhờ vậy chuỗi trên nguồn vô hạn (generator, mục sau) vẫn chạy được.</li>
</ul>

<div class="callout callout-important"><span class="callout-icon">🔴</span><div class="callout-body">Đây là khác biệt lớn nhất với Kotlin. <code>list.map { }</code> của Kotlin chạy <strong>ngay</strong> và trả <code>List</code>; muốn lazy phải <code>asSequence()</code>. Còn <code>list.map(...)</code> của Dart trả <strong><code>Iterable</code> lazy</strong>, tương đương <code>Sequence</code> của Kotlin. Muốn có <code>List</code> phải gọi <code>.toList()</code>.</div></div>

<h4>Ví dụ: quy đổi giá và đếm số lần callback chạy</h4>

<p><strong>Bài toán:</strong> giỏ hàng lưu giá bằng USD, màn hình hiển thị VND. Hàm quy đổi có log để thấy rõ nó chạy lúc nào và bao nhiêu lần.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li><code>map(toVnd)</code> chỉ trả về một Iterable lazy: chưa quy đổi gì.</li>
  <li><code>first</code> kéo phần tử đầu tiên: <code>toVnd</code> chạy một lần rồi dừng.</li>
  <li>Duyệt bằng <code>for-in</code>: <code>toVnd</code> chạy cho cả ba phần tử.</li>
  <li><code>toList()</code> là một lần duyệt nữa: <code>toVnd</code> chạy lại ba lần, kết quả được lưu vào một <code>List</code>.</li>
  <li>Dùng <code>List</code> đã lưu: không chạy lại.</li>
</ol>

<div class="mermaid">
sequenceDiagram
    participant Main as main()
    participant Lazy as pricesVnd (Iterable lazy)
    participant Src as pricesUsd (List)
    Main-&gt;&gt;Lazy: (1) map(toVnd): chỉ ghi bước, chưa chạy
    Main-&gt;&gt;Lazy: (2) first
    Lazy-&gt;&gt;Src: lấy 12
    Lazy--&gt;&gt;Main: toVnd(12) chạy 1 lần
    Main-&gt;&gt;Lazy: (3) for-in duyệt hết
    Lazy-&gt;&gt;Src: lấy 12, 40, 7
    Lazy--&gt;&gt;Main: toVnd chạy 3 lần
    Main-&gt;&gt;Lazy: (4) toList()
    Lazy-&gt;&gt;Src: lấy lại 12, 40, 7
    Lazy--&gt;&gt;Main: toVnd chạy lại 3 lần, trả List
    Note over Main: (5) dùng List cached, không chạy toVnd
</div>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// lazy_prices.dart
const usdToVnd = 25000;

int toVnd(int usd) {
  print('  quy đổi $usd USD');                      // log để thấy lúc nào hàm chạy
  return usd * usdToVnd;
}

void main() {
  final pricesUsd = [12, 40, 7];

  final pricesVnd = pricesUsd.map(toVnd);           // (1) chỉ tạo "công thức"
  print('Đã gọi map, kiểu: \${pricesVnd.runtimeType}');

  print('first = \${pricesVnd.first}');              // (2) duyệt tới phần tử đầu là dừng

  print('Lần duyệt 1:');
  for (final _ in pricesVnd) {}                     // (3) duyệt hết: chạy toVnd 3 lần
  print('Lần duyệt 2:');
  final cached = pricesVnd.toList();                // (4) duyệt lại: chạy lại 3 lần, rồi lưu kết quả

  print('Dùng cached: $cached');                    // (5) List đã tính sẵn, không chạy lại
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>Đã gọi map, kiểu: MappedListIterable&lt;int, int&gt;
  quy đổi 12 USD
first = 300000
Lần duyệt 1:
  quy đổi 12 USD
  quy đổi 40 USD
  quy đổi 7 USD
Lần duyệt 2:
  quy đổi 12 USD
  quy đổi 40 USD
  quy đổi 7 USD
Dùng cached: [300000, 1000000, 175000]</code></pre>

<p><code>runtimeType</code> cho thấy kết quả của <code>map</code> không phải <code>List</code>. <code>length</code> cũng tuỳ implementation: trên kết quả <code>map</code> của một List thì không gọi callback, trên kết quả <code>where</code> thì phải duyệt hết. Đừng dựa vào chi tiết đó: kết quả dùng nhiều lần thì <code>toList()</code> một lần.</p>

<h3>Các thao tác functional thường dùng</h3>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Việc</th>
      <th style="padding:8px 12px;text-align:left;">Method</th>
      <th style="padding:8px 12px;text-align:left;">Ghi chú</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Biến đổi từng phần tử</td>
      <td style="padding:8px 12px;"><code>map(f)</code></td>
      <td style="padding:8px 12px;">Lazy</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Lọc</td>
      <td style="padding:8px 12px;"><code>where(test)</code>, <code>whereType&lt;T&gt;()</code></td>
      <td style="padding:8px 12px;">Lazy; <code>whereType</code> lọc theo kiểu và trả đúng <code>Iterable&lt;T&gt;</code> (Kotlin: <code>filterIsInstance</code>)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Một thành nhiều, trải phẳng</td>
      <td style="padding:8px 12px;"><code>expand(f)</code></td>
      <td style="padding:8px 12px;">Lazy; tương đương <code>flatMap</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Bỏ null</td>
      <td style="padding:8px 12px;"><code>nonNulls</code></td>
      <td style="padding:8px 12px;">Lazy; <code>Iterable&lt;T?&gt;</code> thành <code>Iterable&lt;T&gt;</code> (Dart 3.0; Kotlin: <code>filterNotNull</code>)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Kèm chỉ số</td>
      <td style="padding:8px 12px;"><code>indexed</code></td>
      <td style="padding:8px 12px;">Lazy; mỗi phần tử là record <code>(index, value)</code> (Dart 3.0)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Gộp thành một giá trị</td>
      <td style="padding:8px 12px;"><code>fold(initial, f)</code></td>
      <td style="padding:8px 12px;">An toàn với collection rỗng (trả <code>initial</code>)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Gộp không có giá trị đầu</td>
      <td style="padding:8px 12px;"><code>reduce(f)</code></td>
      <td style="padding:8px 12px;">Collection rỗng ném <code>StateError: No element</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Có ít nhất một / tất cả</td>
      <td style="padding:8px 12px;"><code>any(test)</code>, <code>every(test)</code></td>
      <td style="padding:8px 12px;">Dừng sớm khi đã biết kết quả</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Tìm phần tử</td>
      <td style="padding:8px 12px;"><code>firstWhere(test, orElse: ...)</code></td>
      <td style="padding:8px 12px;">Không thấy và không có <code>orElse</code> thì ném <code>StateError</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Lấy an toàn</td>
      <td style="padding:8px 12px;"><code>firstOrNull</code>, <code>lastOrNull</code>, <code>singleOrNull</code>, <code>elementAtOrNull(i)</code></td>
      <td style="padding:8px 12px;">Trả <code>null</code> thay vì ném (Dart 3.0)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Cắt</td>
      <td style="padding:8px 12px;"><code>take(n)</code>, <code>skip(n)</code>, <code>takeWhile</code>, <code>skipWhile</code></td>
      <td style="padding:8px 12px;">Lazy</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Ghép chuỗi</td>
      <td style="padding:8px 12px;"><code>join(', ')</code></td>
      <td style="padding:8px 12px;">Gọi <code>toString()</code> từng phần tử</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Chốt kết quả</td>
      <td style="padding:8px 12px;"><code>toList()</code>, <code>toSet()</code></td>
      <td style="padding:8px 12px;"><code>toSet()</code> cũng loại trùng, giữ thứ tự gặp đầu tiên</td>
    </tr>
  </tbody>
</table>

<p>Hai điểm về null safety:</p>

<ul>
  <li>Muốn "không thấy thì null", dùng <code>where(test).firstOrNull</code> hoặc <code>firstWhereOrNull(test)</code> của <code>package:collection</code>; <code>orElse: () =&gt; null</code> không compile trên <code>List&lt;String&gt;</code> (Sai lầm 5).</li>
  <li><code>fold</code> suy kiểu kết quả từ giá trị đầu; khi ngữ cảnh không rõ, ghi kiểu tường minh <code>fold&lt;int&gt;(0, ...)</code>.</li>
</ul>

<p><code>forEach(f)</code> duyệt được, nhưng với thân nhiều dòng thì <code>for-in</code> dễ đọc hơn và dùng được <code>break</code>, <code>continue</code>, <code>await</code>; analyzer có lint <code>avoid_function_literals_in_foreach_calls</code> cho trường hợp này. Truyền tear-off như <code>forEach(print)</code> thì vẫn gọn.</p>

<h4>Ví dụ: tính tạm tính giỏ hàng</h4>

<p><strong>Bài toán:</strong> giỏ hàng có món được chọn và món bỏ chọn. Cần tạm tính các món được chọn, xác định có miễn phí vận chuyển không, có món nào mua số lượng lớn, có món nào kèm lời nhắn gói quà, và tra một món theo tên. Mỗi câu hỏi là một method functional.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li><code>where</code>: giữ món được chọn.</li>
  <li><code>map</code>: mỗi món thành thành tiền <code>price * quantity</code>.</li>
  <li><code>fold</code>: cộng dồn từ 0. Đây là lúc chuỗi lazy (1) và (2) thực sự chạy, từng món một.</li>
  <li>So tạm tính với ngưỡng miễn phí vận chuyển.</li>
  <li><code>any</code>/<code>every</code>: câu hỏi có/không trên cả giỏ.</li>
  <li><code>map</code> ra lời nhắn (có thể null), <code>nonNulls</code> bỏ null, <code>firstOrNull</code> lấy cái đầu hoặc <code>null</code>.</li>
  <li><code>firstWhere</code>: tra món theo tên (chắc chắn có trong giỏ).</li>
</ol>

<div class="mermaid">
flowchart LR
    C["cart"] --&gt; W["(1) where selected"]
    W --&gt; M["(2) map thành tiền"]
    M --&gt; F["(3) fold cộng dồn"]
    F --&gt; T{"(4) &gt;= 500000?"}
    C --&gt; A["(5) any / every"]
    C --&gt; G["(6) map giftNote, nonNulls, firstOrNull"]
    C --&gt; H["(7) firstWhere theo tên"]
</div>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// cart_summary.dart
class CartItem {
  CartItem(this.name, this.price, this.quantity, {this.selected = true, this.giftNote});
  final String name;
  final int price;
  final int quantity;
  final bool selected;
  final String? giftNote;
}

void main() {
  final cart = [
    CartItem('Tai nghe', 450000, 1),
    CartItem('Cáp USB-C', 90000, 3, giftNote: 'Gói quà giúp mình'),
    CartItem('Ốp lưng', 120000, 2, selected: false),
  ];

  final subtotal = cart
      .where((item) =&gt; item.selected)                 // (1) lọc món được chọn
      .map((item) =&gt; item.price * item.quantity)      // (2) thành tiền từng món
      .fold(0, (sum, line) =&gt; sum + line);            // (3) cộng dồn từ 0

  final freeShipping = subtotal &gt;= 500000;            // (4) điều kiện tổng
  final hasBulk = cart.any((item) =&gt; item.quantity &gt;= 3);       // (5) có ít nhất một?
  final allSelected = cart.every((item) =&gt; item.selected);      //     tất cả?
  final firstGift = cart.map((item) =&gt; item.giftNote).nonNulls.firstOrNull; // (6)
  final headphone = cart.firstWhere((item) =&gt; item.name == 'Tai nghe'); // (7)

  print('Tạm tính: $subtotal');
  print('Miễn phí vận chuyển: $freeShipping');
  print('Có món mua số lượng lớn: $hasBulk, chọn hết: $allSelected');
  print('Lời nhắn quà: \${firstGift ?? 'không có'}');
  print('Giá tai nghe: \${headphone.price}');
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>Tạm tính: 720000
Miễn phí vận chuyển: true
Có món mua số lượng lớn: true, chọn hết: false
Lời nhắn quà: Gói quà giúp mình
Giá tai nghe: 450000</code></pre>

<p>Tạm tính là 450000 + 90000 × 3; ốp lưng bị loại ở bước (1).</p>

<h3>Generator <code>sync*</code></h3>

<p>Một hàm đánh dấu <strong><code>sync*</code></strong> là <strong>generator đồng bộ</strong>: nó trả về một <code>Iterable</code>, và thân hàm chỉ chạy khi có người duyệt Iterable đó. Mỗi <code>yield value</code> đưa ra một phần tử rồi <strong>tạm dừng</strong> thân hàm tại chỗ; lần lấy phần tử kế tiếp, thân hàm chạy tiếp từ ngay sau <code>yield</code>. <code>yield* other</code> đưa ra toàn bộ phần tử của một Iterable khác (hay dùng cho đệ quy).</p>

<p>Theo mental model công thức, generator là <strong>công thức viết bằng code tuần tự</strong> thay vì ghép <code>map</code>/<code>where</code>, nên có đủ tính chất lazy: gọi hàm chưa chạy gì, mỗi lần duyệt chạy lại thân hàm từ đầu, nguồn vô hạn vẫn an toàn nếu chỉ lấy hữu hạn phần tử.</p>

<p>Phiên bản bất đồng bộ <code>async*</code> trả về <code>Stream</code> thay vì <code>Iterable</code>, nằm ở <a href="../async/streams.md" target="_blank" rel="noopener">1.3.2 Streams</a>. Kotlin dev sẽ thấy <code>sync*</code> tương ứng <code>sequence { yield(x) }</code>.</p>

<h4>Ví dụ: sinh lịch giao hàng định kỳ, bỏ qua Chủ nhật</h4>

<p><strong>Bài toán:</strong> gói đăng ký giao hàng hai ngày một lần, không giao Chủ nhật. Lịch là vô hạn; màn hình chỉ cần vài ngày tới. Generator mô tả quy tắc một lần, người dùng tự lấy bao nhiêu tuỳ ý.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li>Gọi <code>deliveryDates(...)</code>: nhận về Iterable, thân hàm <strong>chưa chạy</strong>.</li>
  <li><code>take(4).toList()</code> bắt đầu duyệt: thân hàm chạy lần đầu.</li>
  <li>Ngày rơi vào Chủ nhật thì không <code>yield</code>, cộng thêm hai ngày.</li>
  <li><code>yield</code> một ngày rồi tạm dừng, chờ được hỏi phần tử tiếp theo.</li>
  <li>Sau phần tử thứ tư, <code>take</code> không hỏi nữa: vòng lặp vô hạn dừng ở trạng thái tạm dừng, không bao giờ chạy tiếp.</li>
</ol>

<div class="mermaid">
sequenceDiagram
    participant Main as main()
    participant Take as take(4).toList()
    participant Gen as deliveryDates sync*
    Main-&gt;&gt;Gen: (1) gọi hàm: chưa chạy thân
    Main-&gt;&gt;Take: (2) toList bắt đầu duyệt
    Take-&gt;&gt;Gen: phần tử tiếp?
    Gen--&gt;&gt;Take: (4) yield 11/11, tạm dừng
    Take-&gt;&gt;Gen: phần tử tiếp?
    Gen--&gt;&gt;Take: yield 13/11
    Take-&gt;&gt;Gen: phần tử tiếp?
    Note over Gen: (3) 15/11 là Chủ nhật: bỏ qua
    Gen--&gt;&gt;Take: yield 17/11
    Take-&gt;&gt;Gen: phần tử tiếp?
    Gen--&gt;&gt;Take: yield 19/11
    Note over Take,Gen: (5) đủ 4: không hỏi nữa
    Take--&gt;&gt;Main: List 4 ngày
</div>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// delivery_dates.dart
Iterable&lt;DateTime&gt; deliveryDates(DateTime start, {int everyDays = 2}) sync* {
  print('  [bắt đầu chạy thân generator]');        // (2) chỉ chạy khi có người duyệt
  var date = start;
  while (true) {                                     // vô hạn: an toàn vì lazy
    if (date.weekday != DateTime.sunday) {           // (3) Chủ nhật không giao
      print('  yield \${date.day}/\${date.month}');
      yield date;                                    // (4) trả một phần tử rồi tạm dừng
    }
    date = date.add(Duration(days: everyDays));
  }
}

void main() {
  final schedule = deliveryDates(DateTime(2026, 11, 11)); // (1) chưa chạy gì
  print('Đã tạo schedule');

  final nextFour = schedule.take(4).toList();        // (5) take dừng sau 4 phần tử
  print(nextFour.map((d) =&gt; '\${d.day}/\${d.month}').join(', '));
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>Đã tạo schedule
  [bắt đầu chạy thân generator]
  yield 11/11
  yield 13/11
  yield 17/11
  yield 19/11
11/11, 13/11, 17/11, 19/11</code></pre>

<p>Dòng "bắt đầu chạy thân generator" in <strong>sau</strong> "Đã tạo schedule": đúng bước (1). Gọi <code>schedule.take(4).toList()</code> lần nữa thì thân hàm chạy lại từ đầu và in lại toàn bộ log.</p>

<p><code>yield*</code> hợp với cấu trúc đệ quy, ví dụ trải phẳng cây danh mục thành các đường dẫn:</p>

<pre data-lang="dart"><code>Iterable&lt;String&gt; flatten(Map&lt;String, Object&gt; tree, [String prefix = '']) sync* {
  for (final MapEntry(:key, :value) in tree.entries) {
    final path = '$prefix/$key';
    yield path;
    if (value case Map&lt;String, Object&gt; children) {
      yield* flatten(children, path);              // đưa ra mọi phần tử của nhánh con
    }
  }
}
// {'thoi-trang': {'nam': {}, 'nu': {}}, 'dien-tu': {'dien-thoai': {}}}
// -&gt; [/thoi-trang, /thoi-trang/nam, /thoi-trang/nu, /dien-tu, /dien-tu/dien-thoai]</code></pre>

<h3>Sort và các bẫy</h3>

<p><code>list.sort([compare])</code>:</p>

<ul>
  <li><strong>Sửa list tại chỗ và trả về <code>void</code>.</strong> <code>final sorted = list.sort();</code> dùng <code>sorted</code> ở đâu đó là lỗi compile <code>use_of_void_result</code>. Muốn bản đã sắp xếp mà giữ nguyên bản gốc: sao chép rồi sort, <code>[...list]..sort()</code> (cascade <code>..</code> ở <a href="functions_operators.md" target="_blank" rel="noopener">1.2.2 Functions and Operators</a>).</li>
  <li><strong>Không có <code>compare</code> thì dùng <code>Comparable.compare</code></strong>: phần tử phải là <code>Comparable</code> (<code>int</code>, <code>double</code>, <code>String</code>, <code>DateTime</code>...).</li>
  <li><strong>Không đảm bảo ổn định (stable)</strong>: hai phần tử so bằng nhau có thể đổi chỗ. Cần thứ tự xác định thì so thêm tiêu chí phụ trong <code>compare</code>, hoặc dùng <code>mergeSort</code> (ổn định) của <code>package:collection</code>.</li>
  <li><strong><code>String</code> so theo mã UTF-16</strong>, không theo ngôn ngữ: chữ hoa đứng trước chữ thường, chữ có dấu tiếng Việt đứng sau <code>z</code>. <code>['Bình', 'Ánh', 'an', 'Châu']..sort()</code> ra <code>[Bình, Châu, an, Ánh]</code>. Số lưu dạng chuỗi sắp theo từng ký tự: <code>['10', '9', '1']</code> ra <code>[1, 10, 9]</code>.</li>
</ul>

<p><code>dart:core</code> không có <code>sortedBy</code>, <code>groupBy</code>, <code>firstWhereOrNull</code> như Kotlin. Package <strong><code>collection</code></strong> (của Dart team, trên pub.dev) bổ sung các extension đó và gần như có mặt trong mọi dự án Flutter: <code>sortedBy</code>, <code>sorted</code>, <code>groupListsBy</code>, <code>firstWhereOrNull</code>, <code>mergeSort</code>, cùng các lớp equality ở mục Equality. Cách khai báo dependency nằm ở 2.2.1 pub.dev and Package Management (chưa có bài).</p>

<h4>Ví dụ: bảng xếp hạng cùng điểm thì xếp theo tên</h4>

<p><strong>Bài toán:</strong> bảng xếp hạng sắp theo điểm giảm dần; người cùng điểm phải có thứ tự cố định (theo tên), nếu không mỗi lần mở màn hình thứ hạng có thể nhảy lung tung. Danh sách gốc còn được màn hình khác dùng nên không được sửa.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li>Sao chép bằng spread rồi mới <code>sort</code> (qua cascade <code>..</code>), bản gốc giữ nguyên.</li>
  <li>So điểm giảm dần: <code>b.compareTo(a)</code>.</li>
  <li>Cùng điểm (<code>compareTo</code> trả 0) thì so tên tăng dần, nên kết quả không phụ thuộc thuật toán sort có ổn định hay không.</li>
  <li>Duyệt kèm chỉ số để in thứ hạng.</li>
</ol>

<div class="mermaid">
flowchart TD
    A["(1) [...players]"] --&gt; B{"(2) so điểm b với a"}
    B --&gt;|khác 0| R["dùng kết quả so điểm"]
    B --&gt;|bằng 0| C["(3) so tên a với b"]
    R --&gt; D["(4) in thứ hạng"]
    C --&gt; D
</div>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// leaderboard.dart (cần dependency collection trong pubspec.yaml)
import 'package:collection/collection.dart';

typedef Player = ({String name, int score});

void main() {
  final players = &lt;Player&gt;[
    (name: 'Minh', score: 80),
    (name: 'An', score: 95),
    (name: 'Châu', score: 80),
    (name: 'Bảo', score: 95),
  ];

  final ranking = [...players]                         // (1) sao chép, không đụng bản gốc
    ..sort((a, b) {
      final byScore = b.score.compareTo(a.score);      // (2) điểm giảm dần
      if (byScore != 0) return byScore;
      return a.name.compareTo(b.name);                 // (3) cùng điểm: theo tên
    });

  for (final (index, p) in ranking.indexed) {          // (4) in thứ hạng
    print('\${index + 1}. \${p.name} - \${p.score}');
  }
  print('Bản gốc giữ nguyên: \${players.map((p) =&gt; p.name).join(', ')}');

  // package:collection: trả list mới, không sửa bản gốc
  final byName = players.sortedBy((p) =&gt; p.name);
  print(byName.map((p) =&gt; p.name).join(', '));
  final groups = players.groupListsBy((p) =&gt; p.score);
  print(groups.map((score, list) =&gt; MapEntry(score, list.map((p) =&gt; p.name).toList())));
  print(players.firstWhereOrNull((p) =&gt; p.score &gt; 100));
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>1. An - 95
2. Bảo - 95
3. Châu - 80
4. Minh - 80
Bản gốc giữ nguyên: Minh, An, Châu, Bảo
An, Bảo, Châu, Minh
{80: [Minh, Châu], 95: [An, Bảo]}
null</code></pre>

<h3>Mutability: ai được sửa collection</h3>

<p><code>final</code> chỉ khoá <strong>biến</strong> (không gán biến sang object khác), không khoá <strong>object</strong> mà biến trỏ tới. Dart chỉ có <strong>một</strong> kiểu <code>List</code> cho cả list sửa được lẫn không sửa được; việc chặn sửa xảy ra <strong>lúc chạy</strong>:</p>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Cách tạo</th>
      <th style="padding:8px 12px;text-align:left;">Gán lại biến</th>
      <th style="padding:8px 12px;text-align:left;"><code>add</code>/<code>remove</code>/<code>[i] =</code></th>
      <th style="padding:8px 12px;text-align:left;">Ghi chú</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>var items = [...]</code></td>
      <td style="padding:8px 12px;">Được</td>
      <td style="padding:8px 12px;">Được</td>
      <td style="padding:8px 12px;"></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>final items = [...]</code></td>
      <td style="padding:8px 12px;">Không</td>
      <td style="padding:8px 12px;"><strong>Được</strong></td>
      <td style="padding:8px 12px;">Bẫy số một của Kotlin dev</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>List.filled(n, v)</code></td>
      <td style="padding:8px 12px;">Tuỳ biến</td>
      <td style="padding:8px 12px;">Sửa ô được; <code>add</code>/<code>remove</code> ném <code>UnsupportedError</code></td>
      <td style="padding:8px 12px;">Fixed-length</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>List.unmodifiable(src)</code></td>
      <td style="padding:8px 12px;">Tuỳ biến</td>
      <td style="padding:8px 12px;">Ném <code>UnsupportedError</code></td>
      <td style="padding:8px 12px;"><strong>Bản sao</strong>: <code>src</code> đổi sau đó không ảnh hưởng</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>UnmodifiableListView(src)</code> (<code>dart:collection</code>)</td>
      <td style="padding:8px 12px;">Tuỳ biến</td>
      <td style="padding:8px 12px;">Ném <code>UnsupportedError</code></td>
      <td style="padding:8px 12px;"><strong>View</strong>: <code>src</code> đổi thì view thấy thay đổi</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>const [...]</code></td>
      <td style="padding:8px 12px;">Không</td>
      <td style="padding:8px 12px;">Ném <code>UnsupportedError</code></td>
      <td style="padding:8px 12px;">Hằng compile-time, các literal const giống nhau dùng chung một object</td>
    </tr>
  </tbody>
</table>

<p>Điều quan trọng: <code>const items = [1, 2]; items.add(3);</code> <strong>vẫn compile được</strong>, vì kiểu tĩnh vẫn là <code>List&lt;int&gt;</code>. Lỗi chỉ hiện lúc chạy: <code>Unsupported operation: Cannot add to an unmodifiable list</code>. Kotlin chặn được ở compile-time nhờ tách <code>List</code> và <code>MutableList</code>; Dart thì không. <code>final</code>/<code>const</code> nói chung nằm ở <a href="variables_and_types.md" target="_blank" rel="noopener">1.2.1 Variables and Types</a>.</p>

<p>Hai hệ quả thực tế:</p>

<ul>
  <li><strong>Collection được chia sẻ theo tham chiếu.</strong> Truyền list vào hàm hay constructor là truyền cùng một object; bên kia <code>sort()</code>, <code>add()</code> thì bên này cũng thấy. Class muốn giữ dữ liệu không bị sửa từ ngoài thì sao chép khi nhận (<code>List.unmodifiable(items)</code>); phần immutability của class nằm ở <a href="classes_mixins_sealed.md" target="_blank" rel="noopener">1.2.5 Classes, Mixins and Sealed Types</a>.</li>
  <li><strong>Không sửa kích thước collection đang được duyệt.</strong> <code>for (final x in list) { list.remove(x); }</code> ném <code>ConcurrentModificationError</code>. Dùng <code>list.removeWhere(test)</code> / <code>retainWhere(test)</code>, hoặc duyệt một bản sao (<code>for (final x in [...list])</code>).</li>
</ul>

<h3>Equality của collection</h3>

<p><code>==</code> của <code>List</code>, <code>Set</code>, <code>Map</code> là <strong>so identity</strong>: chỉ <code>true</code> khi hai biến trỏ tới <strong>cùng một object</strong>. Hai list có cùng phần tử theo cùng thứ tự vẫn khác nhau:</p>

<pre data-lang="dart"><code>import 'package:collection/collection.dart';

final a = ['dart', 'flutter'];
final b = ['dart', 'flutter'];
print(a == b);                                                    // false
print(const ListEquality&lt;String&gt;().equals(a, b));                 // true
print(const DeepCollectionEquality().equals({'tags': a}, {'tags': b})); // true: so lồng nhau
print(const DeepCollectionEquality.unordered().equals([1, 2], [2, 1])); // true: bỏ qua thứ tự
print((tags: a) == (tags: b));                                    // false: record so field bằng ==
print(identical(const ['x'], const ['x']));                       // true: const dùng chung object</code></pre>

<p>Đây là chỗ khác Kotlin (<code>listOf(1, 2) == listOf(1, 2)</code> là <code>true</code>). Nó quan trọng vì nhiều thư viện state management so state cũ và mới bằng <code>==</code> để quyết định có rebuild UI hay không: state chứa list mới tạo mỗi lần sẽ luôn "khác", còn state bị sửa tại chỗ thì vẫn là cùng object nên luôn "giống". Code Flutter có sẵn <code>listEquals</code>, <code>setEquals</code>, <code>mapEquals</code> trong <code>package:flutter/foundation.dart</code> cho so sánh một tầng; override <code>==</code>/<code>hashCode</code> cho class nằm ở <a href="classes_mixins_sealed.md" target="_blank" rel="noopener">1.2.5 Classes, Mixins and Sealed Types</a>.</p>

<h2>Ví dụ thực tế</h2>

<h3>Báo cáo doanh thu theo danh mục</h3>

<p><strong>Bài toán chính:</strong> từ danh sách đơn hàng (mỗi đơn có trạng thái và nhiều dòng hàng thuộc các danh mục), dựng các dòng hiển thị cho màn hình báo cáo: top danh mục theo doanh thu, gộp phần còn lại thành "Khác", và thông báo riêng khi chưa có đơn nào đã thanh toán. Bài toán dùng gần như mọi phần của bài: chuỗi lazy, Map để cộng dồn, sort, và collection literal để dựng kết quả.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li><code>where</code>: chỉ giữ đơn đã thanh toán.</li>
  <li><code>expand</code>: mỗi đơn thành các dòng hàng của nó, trải phẳng thành một chuỗi dòng hàng.</li>
  <li><code>Map.update</code> cộng dồn doanh thu theo danh mục trong khi <code>for-in</code> duyệt chuỗi lazy (1)(2).</li>
  <li><code>entries.toList()</code> chốt thành List (vì <code>sort</code> chỉ có trên List), rồi sort giảm dần theo doanh thu.</li>
  <li><code>skip(top)</code> + <code>fold</code>: tổng doanh thu của các danh mục ngoài top.</li>
  <li>List literal với collection for (kèm <code>indexed</code> và pattern tách <code>MapEntry</code>) và collection if dựng các dòng hiển thị.</li>
</ol>

<div class="mermaid">
flowchart TD
    O["orders"] --&gt; W["(1) where status == paid"]
    W --&gt; E["(2) expand thành các dòng hàng"]
    E --&gt; U["(3) update cộng dồn vào Map danh mục"]
    U --&gt; S["(4) entries.toList, sort giảm dần"]
    S --&gt; K["(5) skip(top), fold: Khác"]
    S --&gt; L["(6) literal: for top, if Khác, if rỗng"]
    K --&gt; L
</div>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// revenue_report.dart
class OrderLine {
  const OrderLine(this.category, this.amount);
  final String category;
  final int amount;
}

class Order {
  const Order(this.id, this.status, this.lines);
  final String id;
  final String status;
  final List&lt;OrderLine&gt; lines;
}

List&lt;String&gt; buildReport(List&lt;Order&gt; orders, {int top = 2, bool showOthers = true}) {
  final revenueByCategory = &lt;String, int&gt;{};
  for (final line in orders
      .where((order) =&gt; order.status == 'paid')              // (1) chỉ đơn đã thanh toán
      .expand((order) =&gt; order.lines)) {                     // (2) trải phẳng thành các dòng hàng
    revenueByCategory.update(line.category, (sum) =&gt; sum + line.amount,
        ifAbsent: () =&gt; line.amount);                        // (3) cộng dồn theo danh mục
  }

  final ranked = revenueByCategory.entries.toList()          // (4) chốt thành List rồi sort
    ..sort((a, b) =&gt; b.value.compareTo(a.value));

  final others = ranked.skip(top).fold(0, (sum, e) =&gt; sum + e.value); // (5) phần ngoài top

  return [                                                   // (6) dựng các dòng hiển thị
    'Doanh thu theo danh mục',
    for (final (rank, MapEntry(:key, :value)) in ranked.take(top).indexed)
      '\${rank + 1}. $key: $value',
    if (showOthers &amp;&amp; others &gt; 0) 'Khác: $others',
    if (ranked.isEmpty) 'Chưa có đơn đã thanh toán',
  ];
}

void main() {
  const orders = [
    Order('DH01', 'paid', [OrderLine('Điện tử', 900), OrderLine('Sách', 120)]),
    Order('DH02', 'cancelled', [OrderLine('Điện tử', 5000)]),
    Order('DH03', 'paid', [OrderLine('Thời trang', 300), OrderLine('Sách', 80)]),
    Order('DH04', 'paid', [OrderLine('Gia dụng', 150)]),
  ];
  buildReport(orders).forEach(print);
  print('---');
  buildReport([]).forEach(print);
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>Doanh thu theo danh mục
1. Điện tử: 900
2. Thời trang: 300
Khác: 350
---
Doanh thu theo danh mục
Chưa có đơn đã thanh toán</code></pre>

<p>Đơn <code>DH02</code> bị huỷ nên 5000 không được tính. "Khác" là Sách (120 + 80) cộng Gia dụng (150). Hai danh mục cùng doanh thu có thể ra thứ tự bất kỳ vì <code>sort</code> không đảm bảo ổn định; báo cáo thật nên thêm tiêu chí phụ như ví dụ bảng xếp hạng.</p>

<h3>Danh sách "đã xem gần đây" không trùng lặp</h3>

<p>Mở lại một sản phẩm đã xem thì nó phải lên đầu và không xuất hiện hai lần. Set literal mặc định (<code>LinkedHashSet</code>) giữ thứ tự chèn và không trùng: <code>remove</code> rồi <code>add</code> lại để đưa phần tử xuống cuối, hiển thị bằng <code>toList().reversed.take(n)</code>. Không cần tự kiểm tra trùng bằng <code>List.contains</code> (chậm dần theo độ dài list).</p>

<h2>Khi nào nên và không nên dùng</h2>

<p><strong>Chọn loại collection:</strong></p>

<ul>
  <li><code>List</code>: thứ tự quan trọng, cần truy cập theo chỉ số, cho phép trùng (danh sách tin nhắn, dòng hàng).</li>
  <li><code>Set</code>: cần "mỗi phần tử một lần" hoặc <code>contains</code> nhanh (id đã chọn, tag, sản phẩm đã xem).</li>
  <li><code>Map</code>: tra theo key (cache theo id, đếm theo nhóm, header HTTP). Nếu key là một tập cố định biết trước (các field của một đối tượng), dùng class hoặc record thay cho <code>Map&lt;String, dynamic&gt;</code> để có kiểm tra kiểu.</li>
</ul>

<p><strong>Lazy hay chốt kết quả:</strong></p>

<ul>
  <li>Giữ <code>Iterable</code> lazy khi kết quả chỉ được duyệt <strong>một lần</strong>, khi có thể dừng sớm (<code>first</code>, <code>any</code>, <code>take</code>), hoặc khi nguồn rất lớn / vô hạn.</li>
  <li>Gọi <code>toList()</code> khi kết quả được dùng <strong>nhiều lần</strong>, được lưu vào field hay state, được trả ra từ API public, hoặc khi callback có side effect hay đọc biến có thể đổi. API public nên nhận và trả <code>List</code> thay vì <code>Iterable</code> lazy, trừ khi lazy là chủ ý.</li>
</ul>

<p><strong>Functional API hay vòng lặp:</strong></p>

<ul>
  <li>Chuỗi <code>where</code>/<code>map</code>/<code>fold</code> ngắn gọn khi mỗi bước là một biến đổi thuần.</li>
  <li>Vòng lặp <code>for-in</code> dễ đọc hơn khi cần <code>break</code>, <code>await</code>, cập nhật nhiều biến cùng lúc, hoặc chuỗi đã quá ba bốn bước khó dò.</li>
</ul>

<p><strong><code>sync*</code></strong>: khi logic sinh phần tử có trạng thái hoặc đệ quy (lịch, cây, phân trang), khó viết bằng <code>map</code>/<code>where</code>. Không cần khi chỉ biến đổi một list có sẵn.</p>

<h2>Sai lầm thường gặp</h2>

<h3>1. Viết <code>{}</code> để tạo Set rỗng</h3>

<p><code>var selectedIds = {};</code> là <code>Map&lt;dynamic, dynamic&gt;</code>; gọi <code>selectedIds.add(1)</code> là lỗi compile vì Map không có <code>add</code>. Sửa: <code>final selectedIds = &lt;int&gt;{};</code>.</p>

<h3>2. Dùng kết quả <code>map</code>/<code>where</code> nhiều lần mà không <code>toList()</code></h3>

<p>Mỗi lần duyệt chạy lại callback: việc gọi API, ghi log analytics, tạo object bị lặp, và nếu biến bên ngoài đổi giữa hai lần duyệt thì hai lần ra hai kết quả (ví dụ <code>minPrice</code> ở đầu bài). Chốt bằng <code>toList()</code> khi kết quả cần ổn định.</p>

<h3>3. Tưởng <code>sort()</code> trả về list mới</h3>

<pre data-lang="dart"><code>final sorted = prices.sort();
print(sorted); // error - This expression has a type of 'void' so its value can't be used.</code></pre>

<p>Và nếu không gán, <code>prices.sort()</code> đã âm thầm đổi thứ tự list gốc mà nơi khác đang dùng. Sửa: <code>final sorted = [...prices]..sort();</code> hoặc <code>prices.sorted()</code> của <code>package:collection</code>.</p>

<h3>4. <code>List.filled</code> với một object sửa được</h3>

<pre data-lang="dart"><code>final grid = List.filled(2, &lt;int&gt;[]);
grid[0].add(7);
print(grid); // [[7], [7]]: hai ô là cùng một list</code></pre>

<p>Sửa: <code>List.generate(2, (_) =&gt; &lt;int&gt;[])</code> tạo object mới cho từng ô.</p>

<h3>5. <code>firstWhere</code> với <code>orElse: () =&gt; null</code></h3>

<p>Trên <code>List&lt;String&gt;</code> lỗi compile <code>return_of_invalid_type_from_closure</code>, vì <code>orElse</code> phải trả <code>String</code>. Không có <code>orElse</code> thì không tìm thấy là <code>StateError: No element</code>. Sửa: <code>names.where((n) =&gt; n == id).firstOrNull</code> hoặc <code>names.firstWhereOrNull(...)</code> (<code>package:collection</code>).</p>

<h3>6. <code>reduce</code> trên collection có thể rỗng</h3>

<p><code>&lt;int&gt;[].reduce((a, b) =&gt; a + b)</code> ném <code>StateError: No element</code>. Giỏ hàng rỗng, danh sách lọc ra rỗng là chuyện bình thường; dùng <code>fold(0, ...)</code>.</p>

<h3>7. Sửa list const hoặc unmodifiable</h3>

<p>Compile qua, crash lúc chạy với <code>Unsupported operation: Cannot add to an unmodifiable list</code>. Hay gặp khi tham số mặc định là <code>const []</code> (<code>List&lt;String&gt; brands = const []</code>) rồi hàm gọi <code>brands.add(...)</code>. Muốn sửa thì sao chép trước: <code>final result = [...brands, extra];</code>.</p>

<h3>8. Xoá phần tử trong lúc duyệt chính list đó</h3>

<p><code>for (final item in cart) { if (item.expired) cart.remove(item); }</code> ném <code>ConcurrentModificationError</code>. Sửa: <code>cart.removeWhere((item) =&gt; item.expired);</code>.</p>

<h3>9. So sánh hai list bằng <code>==</code></h3>

<p><code>if (newTags == oldTags)</code> luôn <code>false</code> với hai list khác object dù cùng nội dung, nên logic "chỉ lưu khi có thay đổi" luôn lưu. Dùng <code>ListEquality().equals</code>, <code>DeepCollectionEquality</code> hoặc <code>listEquals</code> của Flutter.</p>

<h2>Lịch sử phát triển</h2>

<ul>
  <li><strong>Dart 1.0 (11/2013)</strong>: <code>dart:core</code> đã có <code>List</code>, <code>Set</code>, <code>Map</code>, <code>Iterable</code> cùng <code>map</code>, <code>where</code>, <code>expand</code>, <code>fold</code>, <code>reduce</code>, <code>any</code>, <code>every</code>, <code>firstWhere</code>; tài liệu của <code>map</code>/<code>where</code> khi đó đã ghi rõ kết quả là Iterable lazy, callback chạy lại mỗi lần duyệt. Nghĩa là lazy (khác Kotlin) là thiết kế gốc của Dart, không phải thay đổi về sau.</li>
  <li><strong>Dart 1.9 (2015)</strong>: thêm generator <code>sync*</code> (cùng <code>async</code>, <code>await</code>, <code>async*</code>, <code>yield</code>, <code>yield*</code>) để viết Iterable lazy bằng code tuần tự thay vì tự cài <code>Iterator</code>.</li>
  <li><strong>Dart 2.2 (2019)</strong>: thêm Set literal <code>{a, b}</code>. Trước đó phải viết <code>Set.from([...])</code>, và <code>{}</code> đã là Map literal, nên Set rỗng phải ghi kiểu <code>&lt;T&gt;{}</code>.</li>
  <li><strong>Dart 2.3 (2019)</strong>: spread <code>...</code>/<code>...?</code>, collection if và collection for, nhóm tính năng "UI-as-code". Lý do được nêu rõ trong changelog: Flutter viết UI bằng các biểu thức lồng nhau sâu, và <code>children: [...]</code> với <code>..add()</code> hay biến tạm làm code UI khó đọc.</li>
  <li><strong>Dart 2.12 (2021)</strong>: sound null safety. <code>map[key]</code> trả <code>V?</code>, <code>orElse</code> của <code>firstWhere</code> phải trả đúng kiểu phần tử; các API trả "có thể không có" trở nên tường minh.</li>
  <li><strong>Dart 3.0 (5/2023)</strong>: thêm vào <code>dart:core</code> các extension <code>nonNulls</code>, <code>firstOrNull</code>, <code>lastOrNull</code>, <code>singleOrNull</code>, <code>elementAtOrNull</code>, <code>indexed</code>; pattern dùng được trong <code>for-in</code> và if-case dùng được trong collection literal.</li>
  <li><strong>Dart 3.8 (5/2025)</strong>: null-aware element <code>?value</code> trong list, set, map literal, thay cho <code>if (x != null) x</code>.</li>
</ul>

<h2>Kết nối hệ thống</h2>

<ul>
  <li><strong>Tiên quyết</strong>:
<ul>
  <li><a href="variables_and_types.md" target="_blank" rel="noopener">1.2.1 Variables and Types</a>: <code>final</code>/<code>const</code>, generics (<code>List&lt;E&gt;</code>, <code>Map&lt;K, V&gt;</code>), null safety, record.</li>
  <li><a href="functions_operators.md" target="_blank" rel="noopener">1.2.2 Functions and Operators</a>: hàm là giá trị, closure, tear-off (<code>map(toVnd)</code>, <code>forEach(print)</code>), cascade <code>..</code>.</li>
  <li><a href="control_flow_patterns.md" target="_blank" rel="noopener">1.2.3 Control Flow and Patterns</a>: <code>for-in</code>, pattern trong <code>for</code> và if-case trong collection literal.</li>
</ul></li>
  <li><strong>Liên quan</strong>:
<ul>
  <li><a href="classes_mixins_sealed.md" target="_blank" rel="noopener">1.2.5 Classes, Mixins and Sealed Types</a>: override <code>==</code>/<code>hashCode</code> (quyết định phần tử có trùng trong <code>Set</code>, key có trùng trong <code>Map</code>), immutability và <code>copyWith</code>.</li>
  <li><a href="../async/streams.md" target="_blank" rel="noopener">1.3.2 Streams</a>: <code>Stream</code> là phiên bản bất đồng bộ của <code>Iterable</code>, <code>async*</code> là phiên bản bất đồng bộ của <code>sync*</code>, cùng bộ method <code>map</code>/<code>where</code>/<code>expand</code>.</li>
  <li><a href="dart_for_kotlin_devs.md" target="_blank" rel="noopener">1.1.1 Dart for Kotlin Developers</a>: khác biệt collection Kotlin và Dart ở mức tổng quan.</li>
</ul></li>
  <li><strong>Học tiếp</strong>: <a href="classes_mixins_sealed.md" target="_blank" rel="noopener">1.2.5 Classes, Mixins and Sealed Types</a> theo thứ tự mục lục. Collection if/for được dùng hằng ngày khi dựng widget tree (3.1.1 Stateless and Stateful Widgets (chưa có bài)); <code>package:collection</code> được khai báo qua 2.2.1 pub.dev and Package Management (chưa có bài).</li>
</ul>

<h2>Tham khảo</h2>

<ul>
  <li><a href="https://dart.dev/language/collections" target="_blank" rel="noopener">Collections: List, Set, Map, collection if/for, spread, null-aware element</a> (dart.dev)</li>
  <li><a href="https://dart.dev/libraries/collections/iterables" target="_blank" rel="noopener">Iterable collections</a> (dart.dev)</li>
  <li><a href="https://dart.dev/language/functions#generators" target="_blank" rel="noopener">Generators</a> (dart.dev)</li>
  <li><a href="https://api.dart.dev/dart-core/Iterable-class.html" target="_blank" rel="noopener">Iterable class</a> và <a href="https://api.dart.dev/dart-core/List/sort.html" target="_blank" rel="noopener">List.sort</a> (api.dart.dev)</li>
  <li><a href="https://pub.dev/packages/collection" target="_blank" rel="noopener">package:collection</a> (pub.dev)</li>
  <li><a href="https://api.flutter.dev/flutter/foundation/listEquals.html" target="_blank" rel="noopener">listEquals</a> (api.flutter.dev)</li>
  <li><a href="https://github.com/dart-lang/sdk/blob/main/CHANGELOG.md" target="_blank" rel="noopener">Dart SDK CHANGELOG</a>: các mục 3.8.0, 3.0.0, 2.3.0, 2.2.0, 1.9.1</li>
  <li><a href="https://github.com/dart-lang/sdk/blob/1.0.0.3/sdk/lib/core/iterable.dart" target="_blank" rel="noopener"><code>iterable.dart</code> của Dart 1.0</a> (mã nguồn SDK, tag 1.0.0.3): API và tài liệu lazy của <code>Iterable</code> lúc phát hành 1.0</li>
</ul>
    `
  },

  'flutter-dart-classes-mixins-sealed': {
    title: 'Classes, Mixins and Sealed Types',
    summary: 'Class trong Dart vừa là khuôn tạo object vừa tự định nghĩa một implicit interface; mỗi khai báo trao cho code khác các quyền construct, extend, implement và mix in, còn class modifiers và sealed thu hẹp các quyền đó với code ngoài library. Bài đi qua constructor, kế thừa, mixin, class modifiers, sealed types, enhanced enum, extension và value equality.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '30 phút',
    depth: 'deep-dive',
    tags: ['flutter', 'dart', 'session-01', 'oop', 'constructors', 'mixin', 'class-modifiers', 'sealed-class', 'enum', 'extension-types'],
    domain: 'Flutter Development',
    module: 'Session 01: Dart Foundations',
    prerequisites: ['flutter.dart.variables_types', 'flutter.dart.functions_operators'],
    related: ['flutter.dart.control_flow_patterns', 'flutter.dart.collections_functional', 'flutter.dart.dart_for_kotlin_devs'],
    learningOutcomes: [
      'Triển khai được class với các dạng constructor (generative, named, initializer list, const, factory, redirecting, super parameters) và giải thích được thứ tự khởi tạo.',
      'Phân biệt được extends, implements và with dựa trên implicit interface, và giải thích được thứ tự linearization khi một class trộn nhiều mixin.',
      'Thiết kế được hierarchy đóng bằng sealed và chọn đúng class modifier (base, interface, final, mixin class) theo những quyền được và bị cấm trong và ngoài library.',
      'Biết khi nào dùng enhanced enum, extension method hoặc extension type thay cho một class mới.',
      'Áp dụng được value equality (== và hashCode), immutability và copyWith cho model, và nhận diện được khi nào nên chuyển sang codegen.'
    ],
    knowledgeGap: 'Không nắm mô hình class của Dart, Kotlin developer sẽ để class public mở cho mọi package kế thừa mà không biết (Dart mở mặc định), dùng abstract class kèm nhánh default cho state nên thêm trạng thái mới mà compiler không báo, trộn mixin sai thứ tự làm retry bọc ngoài hoặc bọc trong logging ngoài ý muốn, và viết model thiếu hashCode khiến Set, Map và việc so sánh state trong Flutter hoạt động sai.',
    updatedAt: '2026-11-10',
    readTime: '30 phút',
    content: `
<h2>Vấn đề cần giải quyết</h2>

<p>Mọi chương trình Dart, và toàn bộ Flutter framework, được dựng từ class: widget, state, model, service. Khi thiết kế kiểu dữ liệu, ba câu hỏi luôn xuất hiện:</p>

<ol>
  <li><strong>Tạo object hợp lệ thế nào?</strong> Field <code>final</code> phải có giá trị trước khi object dùng được, dữ liệu đầu vào cần kiểm tra, có lúc cần trả object có sẵn thay vì tạo mới.</li>
  <li><strong>Chia sẻ hành vi thế nào?</strong> Kế thừa implementation, chỉ cam kết một contract, hay ghép thêm một gói hành vi (logging, retry) vào nhiều class không cùng gốc.</li>
  <li><strong>Ai được phép mở rộng kiểu của mình?</strong> Nếu bất kỳ ai cũng kế thừa được, compiler không bao giờ biết đủ các biến thể của một kiểu, và tác giả thư viện không thể sửa class mà không sợ làm hỏng code bên ngoài.</li>
</ol>

<p>Câu hỏi thứ ba lộ ra rõ nhất khi mô hình hoá kết quả của một thao tác:</p>

<pre data-lang="dart"><code>abstract class PaymentResult {}
class PaymentSuccess extends PaymentResult {}
class PaymentDeclined extends PaymentResult {}
class PaymentPending extends PaymentResult {} // thêm sau, không ai nhắc phải xử lý

String message(PaymentResult result) =&gt; switch (result) {
      PaymentSuccess() =&gt; 'Thanh toán thành công',
      PaymentDeclined() =&gt; 'Thẻ bị từ chối',
      _ =&gt; 'Lỗi không xác định', // bắt buộc có vì compiler không biết hết subtype
    };

void main() =&gt; print(message(PaymentPending())); // In: Lỗi không xác định</code></pre>

<p>Bỏ nhánh <code>_</code> thì compiler báo <code>non_exhaustive_switch_expression</code>, vì một file khác có thể thêm subtype bất kỳ lúc nào. Giữ nhánh <code>_</code> thì <code>PaymentPending</code> mới thêm rơi vào "Lỗi không xác định" mà không có cảnh báo nào. Phần 6 (sealed types) giải quyết đúng chỗ này.</p>

<p>Với Kotlin developer, Dart còn đảo ngược vài mặc định quen thuộc: class <strong>mở</strong> cho kế thừa (Kotlin <code>final</code> mặc định), <strong>không có từ khoá <code>interface</code></strong> (mọi class đều là interface), và <strong>không có <code>data class</code></strong> (equality và <code>copy</code> phải tự viết hoặc sinh code).</p>

<h2>Sau khi học xong</h2>

<ul>
  <li>Triển khai được class với các dạng constructor (generative, named, initializer list, const, factory, redirecting, super parameters) và giải thích được thứ tự khởi tạo.</li>
  <li>Phân biệt được extends, implements và with dựa trên implicit interface, và giải thích được thứ tự linearization khi một class trộn nhiều mixin.</li>
  <li>Thiết kế được hierarchy đóng bằng sealed và chọn đúng class modifier (base, interface, final, mixin class) theo những quyền được và bị cấm trong và ngoài library.</li>
  <li>Biết khi nào dùng enhanced enum, extension method hoặc extension type thay cho một class mới.</li>
  <li>Áp dụng được value equality (== và hashCode), immutability và copyWith cho model, và nhận diện được khi nào nên chuyển sang codegen.</li>
</ul>

<h2>Classes, Mixins and Sealed Types là gì?</h2>

<p><strong>Class</strong> trong Dart là khai báo vừa dùng để tạo object, vừa tự định nghĩa một <strong>implicit interface (interface ngầm)</strong> gồm mọi instance member của nó. <strong>Mixin</strong> là một gói member được chèn vào chuỗi superclass của class qua <code>with</code>; <strong>sealed type</strong> là class mà mọi subtype trực tiếp phải nằm trong cùng library, nên compiler biết đủ các biến thể.</p>

<p><strong>Mental model: bảng quyền.</strong> Mỗi khai báo kiểu trao cho code khác bốn quyền: <strong>construct</strong> (gọi constructor), <strong>extend</strong> (kế thừa implementation), <strong>implement</strong> (cam kết contract, tự viết implementation) và <strong>mix in</strong> (dùng sau <code>with</code>). <code>abstract</code> bỏ quyền construct; <code>base</code>, <code>interface</code>, <code>final</code> bỏ bớt quyền extend/implement <strong>đối với code ngoài library</strong>; <code>sealed</code> bỏ cả construct lẫn mọi quyền kế thừa từ ngoài library; <code>mixin</code> bật quyền mix in. Trong suốt bài, mỗi tính năng được giải thích bằng câu hỏi "nó bật hay tắt quyền nào, với ai".</p>

<h2>Cách hoạt động</h2>

<h3>1. Class và constructor</h3>

<p>Một class gồm field (instance variable), constructor và method. Field non-nullable hoặc <code>final</code> phải có giá trị <strong>trước khi body của constructor chạy</strong>, nên Dart có nhiều cách gán field sớm:</p>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Dạng</th>
      <th style="padding:8px 12px;text-align:left;">Cú pháp</th>
      <th style="padding:8px 12px;text-align:left;">Dùng khi</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Generative + initializing formal</td>
      <td style="padding:8px 12px;"><code>Money(this.minorUnits, this.currency);</code></td>
      <td style="padding:8px 12px;">Gán thẳng tham số vào field</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Named constructor</td>
      <td style="padding:8px 12px;"><code>Money.fromMajor(...)</code></td>
      <td style="padding:8px 12px;">Nhiều cách tạo, tên nói rõ ý nghĩa (Dart không có overload constructor)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Initializer list</td>
      <td style="padding:8px 12px;"><code>: minorUnits = (amount * 100).round()</code></td>
      <td style="padding:8px 12px;">Tính field <code>final</code> từ tham số, <code>assert</code> đầu vào</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Redirecting</td>
      <td style="padding:8px 12px;"><code>Money.zero(String c) : this(0, c);</code></td>
      <td style="padding:8px 12px;">Chuyển tiếp sang constructor khác cùng class, body rỗng</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>const</code> constructor</td>
      <td style="padding:8px 12px;"><code>const Money(...)</code></td>
      <td style="padding:8px 12px;">Mọi field <code>final</code>; tạo được hằng compile-time</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>factory</code></td>
      <td style="padding:8px 12px;"><code>factory Money.parse(String text) {...}</code></td>
      <td style="padding:8px 12px;">Cần logic trước khi quyết định trả object nào: validate, cache, trả subtype</td>
    </tr>
  </tbody>
</table>

<p>Một số quy tắc đáng nhớ:</p>

<ul>
  <li>Không khai báo constructor nào thì class có <strong>default constructor</strong> không tham số. Constructor <strong>không được kế thừa</strong>: subclass phải tự khai báo.</li>
  <li>Initializer list chạy trước body và <strong>không truy cập được <code>this</code></strong>, nhưng đọc được tham số, kể cả tham số <code>this.x</code>.</li>
  <li><code>factory</code> không tạo <code>this</code> mới, nên không có initializer list, không truy cập <code>this</code>, và không được trả <code>null</code>.</li>
  <li><code>const</code> constructor không bắt buộc tạo hằng: <code>Money(1, 'USD')</code> không có <code>const</code> vẫn tạo object thường. Chỉ khi gọi trong ngữ cảnh <code>const</code>, các lời gọi cùng đối số mới trả về <strong>cùng một instance</strong> (canonicalized).</li>
  <li>Từ Dart 3.12, initializing formal dùng được cho field private trong named parameter: <code>SessionToken({required this._value})</code>, người gọi viết <code>SessionToken(value: ...)</code>.</li>
</ul>

<h4>Ví dụ: kiểu <code>Money</code> với nhiều cách tạo</h4>

<p><strong>Bài toán:</strong> số tiền đến từ nhiều nguồn: hằng số trong code, số thập phân người dùng nhập, chuỗi <code>"12.50 USD"</code> từ API. Mỗi nguồn cần một constructor có tên rõ ràng, và chuỗi sai định dạng phải bị chặn trước khi tạo object.</p>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// money.dart
class Money {
  final int minorUnits; // số tiền theo đơn vị nhỏ nhất (cent, đồng)
  final String currency;

  // Generative constructor + initializing formal + assert trong initializer list
  const Money(this.minorUnits, this.currency)
      : assert(minorUnits &gt;= 0, 'Số tiền không được âm');

  // Named + redirecting: chỉ chuyển tiếp sang constructor chính
  const Money.zero(String currency) : this(0, currency);

  // Initializer list tính field final từ tham số
  Money.fromMajor(double amount, this.currency)
      : minorUnits = (amount * 100).round();

  // Factory: chạy logic trước khi quyết định trả object nào
  factory Money.parse(String text) {
    final parts = text.trim().split(' ');
    if (parts.length != 2) {
      throw FormatException('Sai định dạng tiền', text);
    }
    return Money.fromMajor(double.parse(parts[0]), parts[1]);
  }

  @override
  String toString() =&gt; '\${(minorUnits / 100).toStringAsFixed(2)} $currency';
}

void main() {
  const price = Money(1999, 'USD');
  const free = Money.zero('USD');
  final fee = Money.fromMajor(2.5, 'USD');
  final parsed = Money.parse('12.50 USD');

  print('$price | $free | $fee | $parsed');
  print(identical(const Money.zero('USD'), free)); // hằng cùng giá trị là cùng instance
  try {
    Money.parse('12.50');
  } on FormatException catch (e) {
    print(e.message);
  }
}</code></pre>

<p><strong>Kết quả</strong> (<code>dart run money.dart</code>):</p>

<pre data-lang="text"><code>19.99 USD | 0.00 USD | 2.50 USD | 12.50 USD
true
Sai định dạng tiền</code></pre>

<p><code>assert</code> chỉ chạy khi bật assertion (<code>dart run --enable-asserts</code>, hoặc chế độ debug của Flutter); bản release bỏ qua nó. Kiểm tra bắt buộc ở mọi môi trường thì <code>throw</code> như trong <code>factory</code>.</p>

<h3>2. Getter, setter và private theo library</h3>

<p>Dart không có từ khoá <code>private</code>/<code>public</code>. Tên bắt đầu bằng <code>_</code> là <strong>private theo library</strong>: mọi code trong cùng library (một file, cộng các file <code>part</code> của nó) thấy được; file khác thì không, kể cả subclass. Đây là khác biệt lớn với Kotlin, nơi <code>private</code> tính theo class và có thêm <code>protected</code>, <code>internal</code>.</p>

<p>Field public thực chất là một cặp getter/setter ngầm (field <code>final</code> chỉ có getter). Vì vậy có thể đổi một field thành getter/setter tự viết sau này mà <strong>không đổi code gọi</strong>. Getter không có field đứng sau gọi là computed property.</p>

<h4>Ví dụ: âm lượng trình phát nhạc</h4>

<p><strong>Bài toán:</strong> âm lượng chỉ hợp lệ trong 0–100; mọi chỗ gán phải bị kẹp vào khoảng đó, và trạng thái "tắt tiếng" suy ra từ âm lượng.</p>

<pre data-lang="dart"><code>// player_volume.dart
class PlayerVolume {
  int _level = 50; // private: file khác không đọc được _level

  int get level =&gt; _level; // getter: đọc như field

  set level(int value) =&gt; _level = value.clamp(0, 100); // setter: kiểm soát giá trị ghi vào

  bool get isMuted =&gt; _level == 0; // computed property
}

void main() {
  final volume = PlayerVolume();
  volume.level = 140; // gọi setter
  print('\${volume.level} muted=\${volume.isMuted}');
  volume.level = -5;
  print('\${volume.level} muted=\${volume.isMuted}');
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>100 muted=false
0 muted=true</code></pre>

<p>Từ một file khác, <code>volume._level</code> báo lỗi <code>undefined_getter</code>: với library bên ngoài, member private coi như không tồn tại.</p>

<h3>3. Kế thừa, implicit interface và <code>abstract</code></h3>

<p>Dart có hai cách để một class trở thành subtype của class khác, và chúng khác nhau về bản chất:</p>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;"></th>
      <th style="padding:8px 12px;text-align:left;"><code>extends</code></th>
      <th style="padding:8px 12px;text-align:left;"><code>implements</code></th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Nhận gì</td>
      <td style="padding:8px 12px;">Toàn bộ implementation của superclass</td>
      <td style="padding:8px 12px;">Chỉ contract (implicit interface)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Số lượng</td>
      <td style="padding:8px 12px;">Đúng một superclass</td>
      <td style="padding:8px 12px;">Nhiều interface</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Phải tự viết</td>
      <td style="padding:8px 12px;">Chỉ những gì muốn <code>@override</code></td>
      <td style="padding:8px 12px;"><strong>Mọi</strong> member, kể cả field (dưới dạng getter/setter)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Gọi <code>super</code></td>
      <td style="padding:8px 12px;">Có</td>
      <td style="padding:8px 12px;">Không</td>
    </tr>
  </tbody>
</table>

<p>Vì mọi class đều có implicit interface, <code>implements</code> dùng được với <strong>bất kỳ class nào</strong>, kể cả class có implementation đầy đủ. Đó là lý do Dart không cần từ khoá <code>interface</code> riêng (Dart 3 có modifier <code>interface</code>, nhưng nó mang nghĩa khác, xem phần 5).</p>

<p><code>abstract class</code> không construct được và được phép có <strong>abstract member</strong> (khai báo không có body). Subclass cụ thể phải viết đủ các member đó. Đây là cách Dart diễn đạt cái mà Kotlin gọi là <code>interface</code> hoặc <code>abstract class</code>.</p>

<p>Khi <code>extends</code>, constructor của subclass luôn gọi một constructor của superclass. <strong>Super parameter</strong> (<code>super.message</code>, từ Dart 2.17) chuyển tiếp tham số lên superclass mà không phải viết lại <code>: super(message)</code>.</p>

<h4>Ví dụ: thứ tự khởi tạo của exception có kế thừa</h4>

<p><strong>Bài toán:</strong> app có <code>AppException</code> chung và <code>NetworkException</code> riêng mang thêm <code>statusCode</code>. Cần biết chính xác phần nào chạy trước khi object được tạo, để không đọc field chưa gán.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li>Gọi <code>NetworkException('...', statusCode: 504)</code>. Tham số <code>super.message</code> sẽ được chuyển cho constructor của <code>AppException</code>; <code>this.statusCode</code> gán field ngay.</li>
  <li>Initializer list của <code>NetworkException</code> chạy (<code>retryable</code> tính từ <code>statusCode</code>).</li>
  <li>Constructor của superclass bắt đầu: initializer list của <code>AppException</code> chạy.</li>
  <li>Body của <code>AppException</code> chạy.</li>
  <li>Body của <code>NetworkException</code> chạy sau cùng, lúc này mọi field của cả hai lớp đã có giá trị.</li>
</ol>

<div class="mermaid">
sequenceDiagram
    participant Caller as main
    participant Net as NetworkException
    participant App as AppException
    Caller-&gt;&gt;Net: (1) NetworkException(message, statusCode)
    Net-&gt;&gt;Net: (2) initializer list
    Net-&gt;&gt;App: (3) super(message), initializer list
    App-&gt;&gt;App: (4) body của AppException
    App--&gt;&gt;Net: superclass xong
    Net-&gt;&gt;Net: (5) body của NetworkException
    Net--&gt;&gt;Caller: object hoàn chỉnh
</div>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// network_exception.dart
T _logged&lt;T&gt;(String step, T value) {
  print(step);
  return value;
}

class AppException implements Exception {
  final String message;
  final DateTime createdAt;

  AppException(this.message)
      : createdAt = _logged('(3) initializer list của AppException', DateTime.now()) {
    print('(4) body của AppException');
  }
}

class NetworkException extends AppException {
  final int statusCode;
  final bool retryable;

  // (1) super.message là super parameter: chuyển thẳng lên AppException(message)
  NetworkException(super.message, {required this.statusCode})
      : retryable = _logged('(2) initializer list của NetworkException', statusCode &gt;= 500) {
    print('(5) body của NetworkException');
  }
}

void main() {
  final error = NetworkException('Hết thời gian chờ', statusCode: 504);
  print('\${error.statusCode} retryable=\${error.retryable}: \${error.message}');
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>(2) initializer list của NetworkException
(3) initializer list của AppException
(4) body của AppException
(5) body của NetworkException
504 retryable=true: Hết thời gian chờ</code></pre>

<p>Khác Kotlin/Java ở một điểm quan trọng: initializer list của <strong>subclass chạy trước</strong> superclass. Vì initializer list không truy cập được <code>this</code>, thứ tự này an toàn; code trong body thì luôn thấy object đã khởi tạo đủ.</p>

<h4>Ví dụ: fake <code>Clock</code> để test logic phụ thuộc thời gian</h4>

<p><strong>Bài toán:</strong> logic kiểm tra mã giảm giá hết hạn phụ thuộc giờ hệ thống, nên test không thể chờ tới ngày hết hạn. Cần thay đồng hồ thật bằng đồng hồ giả trong test.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li>Test tạo <code>FakeClock</code> với thời điểm cố định và truyền vào <code>CouponValidator</code>.</li>
  <li><code>isValid</code> gọi <code>_clock.now()</code>; validator chỉ biết contract <code>Clock</code>, không biết đó là đồng hồ thật hay giả.</li>
  <li><code>FakeClock</code> trả thời điểm test đặt.</li>
  <li>Validator so sánh và trả kết quả.</li>
  <li>Test "tua" đồng hồ qua thời điểm hết hạn và kiểm tra lại.</li>
</ol>

<div class="mermaid">
sequenceDiagram
    participant Test as main / test
    participant Validator as CouponValidator
    participant Clock as FakeClock
    Test-&gt;&gt;Validator: (1) CouponValidator(FakeClock)
    Test-&gt;&gt;Validator: isValid(expiresAt)
    Validator-&gt;&gt;Clock: (2) now()
    Clock--&gt;&gt;Validator: (3) thời điểm cố định
    Validator--&gt;&gt;Test: (4) true
    Test-&gt;&gt;Clock: (5) đặt fixedNow sau hạn
    Test-&gt;&gt;Validator: isValid(expiresAt) trả false
</div>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// coupon_validator.dart
abstract class Clock {
  DateTime now(); // abstract member: subclass cụ thể phải viết
}

class SystemClock implements Clock {
  @override
  DateTime now() =&gt; DateTime.now();
}

class CouponValidator {
  CouponValidator(this._clock);
  final Clock _clock;

  bool isValid(DateTime expiresAt) =&gt; _clock.now().isBefore(expiresAt); // (2) (4)
}

// coupon_validator_test.dart
class FakeClock implements Clock {
  FakeClock(this.fixedNow);
  DateTime fixedNow;

  @override
  DateTime now() =&gt; fixedNow; // (3)
}

void main() {
  final clock = FakeClock(DateTime(2026, 11, 30, 23, 59)); // (1)
  final validator = CouponValidator(clock);
  final expiresAt = DateTime(2026, 12, 1);

  print(validator.isValid(expiresAt));
  clock.fixedNow = DateTime(2026, 12, 1, 0, 1); // (5)
  print(validator.isValid(expiresAt));
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>true
false</code></pre>

<p>Vì implicit interface, <code>class FakeSystemClock implements SystemClock</code> cũng hợp lệ dù <code>SystemClock</code> là class cụ thể. Viết fake thường không cần thư viện tạo proxy; các thư viện mock (<code>mocktail</code>, <code>mockito</code>) cũng dựa trên chính cơ chế <code>implements</code> này (11.1.1 Unit Testing and Mocking (chưa có bài)).</p>

<h3>4. Mixin và thứ tự linearization</h3>

<p><code>extends</code> chỉ cho một superclass. Khi nhiều class không cùng gốc cần cùng một hành vi (logging, retry, đếm thời gian), đặt hành vi đó vào <strong>mixin</strong> rồi ghép bằng <code>with</code>.</p>

<ul>
  <li><code>mixin Logging { ... }</code> khai báo được field, method, getter và abstract member, nhưng <strong>không khai báo được constructor</strong> nào (lỗi <code>mixin_declares_constructor</code>) và không có <code>extends</code>.</li>
  <li><code>mixin Logging on ApiClient</code> là <strong>superclass constraint</strong>: chỉ class là subtype của <code>ApiClient</code> mới được <code>with Logging</code>, và trong mixin được gọi <code>super.send(...)</code>.</li>
  <li><code>mixin class</code> (Dart 3.0) vừa dùng như class thường vừa dùng sau <code>with</code>; nó không được có <code>extends</code>, <code>with</code> hay <code>on</code>. Từ Dart 3.0, class thường <strong>không</strong> dùng được sau <code>with</code> (lỗi <code>class_used_as_mixin</code>).</li>
</ul>

<p><strong>Linearization.</strong> <code>class ProductApi extends HttpApiClient with Logging, Retry {}</code> không "gộp" ba nguồn vào một class. Compiler tạo một chuỗi superclass trung gian, mỗi mixin là một tầng chồng lên tầng trước:</p>

<pre data-lang="text"><code>ProductApi → Retry → Logging → HttpApiClient → ApiClient → Object</code></pre>

<p>Tra method đi từ trái sang phải: mixin viết <strong>sau cùng</strong> trong <code>with</code> nằm gần class nhất nên thắng. <code>super.send()</code> bên trong một mixin gọi tầng <strong>ngay dưới nó</strong>, không phải superclass gốc. Nhờ vậy các mixin xếp chồng thành một chuỗi bọc nhau, giống interceptor.</p>

<h4>Ví dụ: retry và logging cho API client</h4>

<p><strong>Bài toán:</strong> mọi request cần được ghi log, và request lỗi tạm thời (503) cần thử lại tối đa 3 lần. Hai hành vi này dùng chung cho nhiều client, nên không muốn viết vào từng class.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li>Code gọi <code>api.send('/products')</code>. Tra method tìm thấy <code>Retry.send</code> trước tiên (mixin sau cùng).</li>
  <li><code>Retry</code> mở vòng thử và gọi <code>super.send</code>, tức tầng <code>Logging</code>.</li>
  <li><code>Logging</code> ghi log rồi gọi <code>super.send</code>, tức <code>HttpApiClient</code>.</li>
  <li><code>HttpApiClient</code> gửi request. Lần đầu ném lỗi 503: lỗi đi ngược qua <code>Logging</code> lên <code>Retry</code>, <code>Retry</code> thử lại từ bước (2). Lần hai trả <code>200 OK</code>.</li>
  <li><code>Logging</code> ghi log kết quả.</li>
  <li><code>Retry</code> trả kết quả cho code gọi.</li>
</ol>

<div class="mermaid">
sequenceDiagram
    participant Caller as main
    participant Retry as Retry mixin
    participant Log as Logging mixin
    participant Http as HttpApiClient
    Caller-&gt;&gt;Retry: (1) send /products
    loop tối đa 3 lần
        Retry-&gt;&gt;Log: (2) super.send
        Log-&gt;&gt;Http: (3) log rồi super.send
        Http--&gt;&gt;Log: (4) lần 1 lỗi 503, lần 2 trả 200 OK
    end
    Log--&gt;&gt;Retry: (5) log kết quả
    Retry--&gt;&gt;Caller: (6) 200 OK
</div>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// api_client.dart
abstract class ApiClient {
  String send(String path);
}

class HttpApiClient extends ApiClient {
  int _calls = 0;

  @override
  String send(String path) {
    _calls++;
    print('    (4) HttpApiClient gửi $path, lần $_calls');
    if (_calls &lt; 2) throw StateError('503 Service Unavailable');
    return '200 OK';
  }
}

mixin Logging on ApiClient {
  @override
  String send(String path) {
    print('  (3) Logging: bắt đầu $path');
    final result = super.send(path); // super = tầng ngay dưới Logging
    print('  (5) Logging: xong $path -&gt; $result');
    return result;
  }
}

mixin Retry on ApiClient {
  int get maxAttempts =&gt; 3;

  @override
  String send(String path) {
    for (var attempt = 1;; attempt++) {
      try {
        print('(2) Retry: lần thử $attempt');
        return super.send(path); // super = Logging
      } on StateError {
        if (attempt == maxAttempts) rethrow;
      }
    }
  }
}

// Linearization: ProductApi → Retry → Logging → HttpApiClient → ApiClient
class ProductApi extends HttpApiClient with Logging, Retry {}

void main() {
  final api = ProductApi();
  print('(1) gọi send');
  final result = api.send('/products');
  print('(6) kết quả: $result');
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>(1) gọi send
(2) Retry: lần thử 1
  (3) Logging: bắt đầu /products
    (4) HttpApiClient gửi /products, lần 1
(2) Retry: lần thử 2
  (3) Logging: bắt đầu /products
    (4) HttpApiClient gửi /products, lần 2
  (5) Logging: xong /products -&gt; 200 OK
(6) kết quả: 200 OK</code></pre>

<p>Đổi thành <code>with Retry, Logging</code> thì <code>Logging</code> nằm ngoài cùng: "bắt đầu" chỉ in một lần, cả hai lần thử nằm bên trong một dòng log. Cùng hai mixin, thứ tự khác cho hành vi khác.</p>

<h3>5. Class modifiers: thu hẹp quyền với code ngoài library</h3>

<p>Từ Dart 3.0, tác giả một library dùng modifier để quyết định code <strong>ngoài library</strong> được làm gì với class. Trong cùng library, tác giả vẫn extend và implement tự do (trừ ràng buộc ở cột "Subtype phải là"). Theo mental model bảng quyền:</p>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Khai báo</th>
      <th style="padding:8px 12px;text-align:left;">Construct</th>
      <th style="padding:8px 12px;text-align:left;">Ngoài library: extend</th>
      <th style="padding:8px 12px;text-align:left;">Ngoài library: implement</th>
      <th style="padding:8px 12px;text-align:left;">Mix in</th>
      <th style="padding:8px 12px;text-align:left;">Subtype phải là</th>
      <th style="padding:8px 12px;text-align:left;">Exhaustive</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>class</code></td>
      <td style="padding:8px 12px;">Có</td>
      <td style="padding:8px 12px;">Có</td>
      <td style="padding:8px 12px;">Có</td>
      <td style="padding:8px 12px;">Không</td>
      <td style="padding:8px 12px;">Tự do</td>
      <td style="padding:8px 12px;">Không</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>abstract class</code></td>
      <td style="padding:8px 12px;">Không</td>
      <td style="padding:8px 12px;">Có</td>
      <td style="padding:8px 12px;">Có</td>
      <td style="padding:8px 12px;">Không</td>
      <td style="padding:8px 12px;">Tự do</td>
      <td style="padding:8px 12px;">Không</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>base class</code></td>
      <td style="padding:8px 12px;">Có</td>
      <td style="padding:8px 12px;">Có</td>
      <td style="padding:8px 12px;"><strong>Không</strong></td>
      <td style="padding:8px 12px;">Không</td>
      <td style="padding:8px 12px;"><code>base</code>/<code>final</code>/<code>sealed</code></td>
      <td style="padding:8px 12px;">Không</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>interface class</code></td>
      <td style="padding:8px 12px;">Có</td>
      <td style="padding:8px 12px;"><strong>Không</strong></td>
      <td style="padding:8px 12px;">Có</td>
      <td style="padding:8px 12px;">Không</td>
      <td style="padding:8px 12px;">Tự do</td>
      <td style="padding:8px 12px;">Không</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>abstract interface class</code></td>
      <td style="padding:8px 12px;">Không</td>
      <td style="padding:8px 12px;"><strong>Không</strong></td>
      <td style="padding:8px 12px;">Có</td>
      <td style="padding:8px 12px;">Không</td>
      <td style="padding:8px 12px;">Tự do</td>
      <td style="padding:8px 12px;">Không</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>final class</code></td>
      <td style="padding:8px 12px;">Có</td>
      <td style="padding:8px 12px;"><strong>Không</strong></td>
      <td style="padding:8px 12px;"><strong>Không</strong></td>
      <td style="padding:8px 12px;">Không</td>
      <td style="padding:8px 12px;"><code>base</code>/<code>final</code>/<code>sealed</code></td>
      <td style="padding:8px 12px;">Không</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>sealed class</code></td>
      <td style="padding:8px 12px;">Không</td>
      <td style="padding:8px 12px;"><strong>Không</strong></td>
      <td style="padding:8px 12px;"><strong>Không</strong></td>
      <td style="padding:8px 12px;">Không</td>
      <td style="padding:8px 12px;">Tự do</td>
      <td style="padding:8px 12px;"><strong>Có</strong></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>mixin class</code></td>
      <td style="padding:8px 12px;">Có</td>
      <td style="padding:8px 12px;">Có</td>
      <td style="padding:8px 12px;">Có</td>
      <td style="padding:8px 12px;">Có</td>
      <td style="padding:8px 12px;">Tự do</td>
      <td style="padding:8px 12px;">Không</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>mixin</code></td>
      <td style="padding:8px 12px;">Không</td>
      <td style="padding:8px 12px;">Không (không phải class)</td>
      <td style="padding:8px 12px;">Có</td>
      <td style="padding:8px 12px;">Có</td>
      <td style="padding:8px 12px;">Tự do</td>
      <td style="padding:8px 12px;">Không</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>base mixin</code></td>
      <td style="padding:8px 12px;">Không</td>
      <td style="padding:8px 12px;">Không</td>
      <td style="padding:8px 12px;"><strong>Không</strong></td>
      <td style="padding:8px 12px;">Có</td>
      <td style="padding:8px 12px;"><code>base</code>/<code>final</code>/<code>sealed</code></td>
      <td style="padding:8px 12px;">Không</td>
    </tr>
  </tbody>
</table>

<p>Ý nghĩa thiết kế của từng modifier:</p>

<ul>
  <li><strong><code>base</code></strong>: mọi subtype đều đi qua implementation thật (constructor được gọi, member private tồn tại). Cấm <code>implements</code> từ ngoài; ràng buộc <code>base</code>/<code>final</code>/<code>sealed</code> lan xuống <strong>mọi</strong> subtype, kể cả trong library, để không ai "mở" lại được.</li>
  <li><strong><code>interface</code></strong>: chỉ cho cam kết contract. Code ngoài không kế thừa được, nên tác giả tự do thay đổi cách các method gọi nhau bên trong mà không làm vỡ subclass của người khác.</li>
  <li><strong><code>final</code></strong>: đóng hẳn với bên ngoài; tác giả thêm member mới mà không phải lo trùng tên hay vỡ implementation bên ngoài. Gần với class mặc định của Kotlin, nhưng ranh giới là library.</li>
  <li><strong><code>sealed</code></strong>: như <code>final</code> với bên ngoài, cộng thêm implicitly abstract và exhaustiveness (phần 6).</li>
  <li><code>abstract interface class</code> gần nhất với <code>interface</code> của Kotlin.</li>
</ul>

<div class="callout callout-important"><span class="callout-icon">🔴</span><div class="callout-body"><code>interface</code> và <code>sealed</code> <strong>không lan truyền</strong>. Một <code>class</code> thường extend một <code>interface class</code> ngay trong library sẽ mở lại quyền extend cho code bên ngoài (đã kiểm chứng: không có lỗi). Muốn khoá cả cây thì đánh dấu cả subclass.</div></div>

<h4>Ví dụ: kiểm chứng bảng quyền bằng hai library</h4>

<p><strong>Bài toán:</strong> một package SDK thanh toán công bố các class với modifier khác nhau. Cần thấy chính xác compiler chặn gì khi app (một library khác) dùng chúng.</p>

<p><strong>Code</strong> (đặt trong một package có <code>environment: sdk: ^3.12.0</code>, chạy <code>dart analyze</code>):</p>

<pre data-lang="dart"><code>// lib/payment_sdk.dart — library khai báo
class PlainGateway { void charge() {} }
base class BaseGateway { void charge() {} }
interface class InterfaceGateway { void charge() {} }
final class FinalGateway { void charge() {} }
sealed class SealedResult {}

// Trong library: extend/implement final và sealed đều được
final class InFinalImpl implements FinalGateway { void charge() {} }
class InSealedExt extends SealedResult {}
class InBaseExtNoMod extends BaseGateway {} // lỗi: subtype của base phải base/final/sealed</code></pre>

<pre data-lang="dart"><code>// bin/app.dart — library khác
import 'package:classes_demo/payment_sdk.dart';

class OutPlainImpl implements PlainGateway { void charge() {} }        // được
base class OutBaseExt extends BaseGateway {}                           // được
base class OutBaseImpl implements BaseGateway { void charge() {} }     // lỗi
class OutIfaceExt extends InterfaceGateway {}                          // lỗi
class OutIfaceImpl implements InterfaceGateway { void charge() {} }    // được
class OutFinalImpl implements FinalGateway { void charge() {} }        // lỗi
class OutSealedExt extends SealedResult {}                             // lỗi
class OutMixPlain with PlainGateway {}                                 // lỗi</code></pre>

<p><strong>Kết quả</strong> (<code>dart analyze</code>, Dart 3.12):</p>

<pre data-lang="text"><code>error - bin/app.dart:6:35 - The class 'BaseGateway' can't be implemented outside of its library because it's a base class. - invalid_use_of_type_outside_library
error - bin/app.dart:7:27 - The class 'InterfaceGateway' can't be extended outside of its library because it's an interface class. - invalid_use_of_type_outside_library
error - bin/app.dart:9:31 - The class 'FinalGateway' can't be implemented outside of its library because it's a final class. - invalid_use_of_type_outside_library
error - bin/app.dart:10:28 - The class 'SealedResult' can't be extended, implemented, or mixed in outside of its library because it's a sealed class. - invalid_use_of_type_outside_library
error - bin/app.dart:11:24 - The class 'PlainGateway' can't be used as a mixin because it's neither a mixin class nor a mixin. - class_used_as_mixin
error - lib/payment_sdk.dart:11:7 - The type 'InBaseExtNoMod' must be 'base', 'final' or 'sealed' because the supertype 'BaseGateway' is 'base'. - subtype_of_base_or_final_is_not_base_final_or_sealed
6 issues found.</code></pre>

<p>Các dòng <code>// được</code> không có lỗi. Mọi lỗi "ngoài library" do modifier đều có cùng mã <code>invalid_use_of_type_outside_library</code>: modifier là luật về <strong>ranh giới library</strong>, không phải về class.</p>

<h3>6. Sealed types: tập subtype đóng</h3>

<p><code>sealed class</code> có hai đặc tính:</p>

<ol>
  <li><strong>Implicitly abstract</strong>: không construct trực tiếp được, nhưng được khai báo constructor (generative cho subclass gọi, hoặc <code>factory</code>).</li>
  <li><strong>Mọi subtype trực tiếp phải nằm trong cùng library.</strong> Từ ngoài library, không ai extend, implement hay mix in được.</li>
</ol>

<p>Đặc tính thứ hai là lý do sealed cho phép <strong>exhaustiveness checking</strong>: khi compile library đó, compiler đã thấy đủ danh sách subtype trực tiếp, nên một <code>switch</code> liệt kê đủ các subtype là bao trọn mọi giá trị có thể có, không cần nhánh <code>_</code>. Với <code>abstract class</code>, file nào cũng có thể thêm subtype, nên compiler không bao giờ kết luận được như vậy. Cơ chế kiểm tra (pattern nào "bao" pattern nào, thông báo lỗi, switch statement và switch expression) thuộc <a href="control_flow_patterns.md" target="_blank" rel="noopener">1.2.3 Control Flow and Patterns</a>; bài này chỉ dùng nó.</p>

<p>Subclass của một sealed class <strong>không</strong> tự động sealed hay final. Ví dụ dưới đánh dấu chúng <code>final class</code> để không ai bên ngoài kế thừa tiếp. Nếu để <code>class</code> thường thì bên ngoài vẫn kế thừa được subclass đó (subtype gián tiếp), và exhaustiveness vẫn đúng vì pattern <code>Completed()</code> bao luôn subclass của <code>Completed</code>.</p>

<p>So với Kotlin: <code>sealed class</code> của Kotlin yêu cầu subclass cùng package và cùng module; Dart dùng ranh giới library. <code>when</code> của Kotlin và <code>switch</code> của Dart cùng ý tưởng exhaustiveness.</p>

<h4>Ví dụ: trạng thái tải file</h4>

<p><strong>Bài toán:</strong> một tác vụ tải file đi qua các trạng thái chờ, đang tải (có tiến độ), xong (có đường dẫn), lỗi (có lý do). Mỗi trạng thái mang dữ liệu riêng, và UI phải xử lý đủ mọi trạng thái.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li>UI truyền state hiện tại vào <code>describe</code>.</li>
  <li><code>switch</code> thử từng subtype theo thứ tự.</li>
  <li>Nhánh khớp destructure field riêng của subtype đó (<code>receivedBytes</code>, <code>filePath</code>...).</li>
  <li>Không có nhánh <code>_</code>: thêm subtype thứ năm mà quên xử lý là lỗi compile.</li>
</ol>

<div class="mermaid">
flowchart TD
    S["(1) describe(state)"] --&gt; Q{"(2) subtype nào?"}
    Q --&gt;|Queued| A["Đang chờ"]
    Q --&gt;|Downloading| B["(3) đọc receivedBytes, totalBytes"]
    Q --&gt;|Completed| C["(3) đọc filePath"]
    Q --&gt;|Failed| D["(3) đọc reason"]
    Q -.-&gt;|"(4) subtype mới chưa xử lý"| E["Lỗi compile"]
</div>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// download_state.dart
sealed class DownloadState {
  const DownloadState();
}

final class Queued extends DownloadState {
  const Queued();
}

final class Downloading extends DownloadState {
  const Downloading(this.receivedBytes, this.totalBytes);
  final int receivedBytes;
  final int totalBytes;
}

final class Completed extends DownloadState {
  const Completed(this.filePath);
  final String filePath;
}

final class Failed extends DownloadState {
  const Failed(this.reason);
  final String reason;
}

String describe(DownloadState state) =&gt; switch (state) { // (1)
      Queued() =&gt; 'Đang chờ', // (2) khớp theo subtype
      Downloading(:final receivedBytes, :final totalBytes) =&gt; // (3) destructure field
        'Đã tải \${receivedBytes * 100 ~/ totalBytes}%',
      Completed(:final filePath) =&gt; 'Xong: $filePath',
      Failed(:final reason) =&gt; 'Lỗi: $reason',
    }; // (4) không cần nhánh _

void main() {
  const states = &lt;DownloadState&gt;[
    Queued(),
    Downloading(3500000, 10000000),
    Completed('/downloads/report.pdf'),
    Failed('Mất kết nối'),
  ];
  for (final state in states) {
    print(describe(state));
  }
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>Đang chờ
Đã tải 35%
Xong: /downloads/report.pdf
Lỗi: Mất kết nối</code></pre>

<p>Thêm <code>final class Paused extends DownloadState</code> vào cùng file, <code>dart analyze</code> báo ngay tại <code>switch</code>:</p>

<pre data-lang="text"><code>error - download_state.dart:26:41 - The type 'DownloadState' isn't exhaustively matched by the switch cases since it doesn't match the pattern 'Paused()'. Try adding a wildcard pattern or cases that match 'Paused()'. - non_exhaustive_switch_expression</code></pre>

<p>Còn khai báo <code>Paused</code> ở một file khác thì lỗi nằm ở chính khai báo đó (<code>invalid_use_of_type_outside_library</code>).</p>

<h3>7. Enhanced enum</h3>

<p>Từ Dart 2.17, <code>enum</code> có thể có field, constructor, method, getter, <code>implements</code> interface và <code>with</code> mixin. Mỗi giá trị enum là một instance <code>const</code>, nên:</p>

<ul>
  <li>Mọi field phải <code>final</code>, generative constructor phải <code>const</code> (được thêm <code>factory</code> trả về một giá trị có sẵn).</li>
  <li>Các giá trị khai báo đầu tiên, kết thúc bằng <code>;</code> trước member.</li>
  <li>Enum ngầm extend <code>Enum</code>, không extend class khác; có sẵn <code>values</code>, <code>index</code>, <code>name</code> và <code>values.byName(...)</code>.</li>
  <li><code>switch</code> trên enum cũng được kiểm tra exhaustiveness như sealed.</li>
</ul>

<p>Ranh giới với sealed: <strong>enum khi tập giá trị cố định và mọi giá trị có cùng cấu trúc dữ liệu biết trước lúc compile; sealed khi mỗi biến thể mang dữ liệu khác nhau tạo lúc runtime</strong> (<code>Downloading</code> mang tiến độ thay đổi liên tục, enum không làm được).</p>

<h4>Ví dụ: phương thức giao hàng</h4>

<p><strong>Bài toán:</strong> app có ba phương thức giao hàng cố định, mỗi cái có mã API, phí và số ngày. Phí miễn cho đơn từ 500.000 đ, trừ giao hoả tốc.</p>

<pre data-lang="dart"><code>// shipping_method.dart
enum ShippingMethod {
  standard('STD', baseFee: 15000, days: 4),
  express('EXP', baseFee: 35000, days: 1),
  pickup('PICK', baseFee: 0, days: 0);

  const ShippingMethod(this.code, {required this.baseFee, required this.days});

  final String code;
  final int baseFee;
  final int days;

  int feeFor(int subtotal) =&gt; subtotal &gt;= 500000 &amp;&amp; this != express ? 0 : baseFee;

  // Tra ngược từ mã API, mã lạ trả null
  static ShippingMethod? fromCode(String code) {
    for (final method in values) {
      if (method.code == code) return method;
    }
    return null;
  }
}

void main() {
  print(ShippingMethod.values.map((m) =&gt; '\${m.name}:\${m.feeFor(600000)}').join(', '));
  print(ShippingMethod.fromCode('EXP')?.days);
  print(ShippingMethod.fromCode('DRONE'));
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>standard:0, express:35000, pickup:0
1
null</code></pre>

<h3>8. Extension methods</h3>

<p><strong>Extension method</strong> (Dart 2.7) thêm method, getter, operator cho một kiểu mà mình không sở hữu (<code>int</code>, <code>String</code>, class của package khác) mà không kế thừa hay bọc nó.</p>

<p>Bản chất: extension được <strong>resolve lúc compile theo static type</strong>. <code>1250000.toVnd()</code> được compiler dịch thành lời gọi một hàm tĩnh với <code>1250000</code> làm đối số. Hệ quả:</p>

<ul>
  <li>Không polymorphic, không override được. Nếu kiểu đã có member cùng tên, <strong>member thật luôn thắng</strong>.</li>
  <li>Biến kiểu <code>dynamic</code> không thấy extension (runtime không biết extension tồn tại).</li>
  <li>Hai extension cùng áp dụng một member mà không cái nào cụ thể hơn (theo kiểu <code>on</code>) thì lời gọi bị lỗi mơ hồ; phải gọi tường minh <code>VndFormat(total).toVnd()</code> hoặc dùng <code>show</code>/<code>hide</code> khi import.</li>
  <li>Extension trên kiểu nullable (<code>on String?</code>) gọi được trên giá trị <code>null</code>.</li>
</ul>

<p>Kotlin extension function có cùng bản chất (static dispatch), nên Kotlin developer gần như không phải đổi tư duy.</p>

<h4>Ví dụ: định dạng tiền và ngày</h4>

<pre data-lang="dart"><code>// formatting_extensions.dart
extension VndFormat on int {
  String toVnd() {
    final digits = toString();
    final buffer = StringBuffer();
    for (var i = 0; i &lt; digits.length; i++) {
      if (i &gt; 0 &amp;&amp; (digits.length - i) % 3 == 0) buffer.write('.');
      buffer.write(digits[i]);
    }
    return '$buffer ₫';
  }
}

extension DateOnly on DateTime {
  bool isSameDay(DateTime other) =&gt;
      year == other.year &amp;&amp; month == other.month &amp;&amp; day == other.day;
}

extension BlankCheck on String? {
  bool get isNullOrBlank =&gt; this == null || this!.trim().isEmpty;
}

void main() {
  print(1250000.toVnd());
  print(DateTime(2026, 11, 10, 8).isSameDay(DateTime(2026, 11, 10, 23)));
  String? note;
  print(note.isNullOrBlank);

  dynamic total = 99000;
  try {
    print(total.toVnd()); // runtime không biết extension
  } on NoSuchMethodError {
    print('NoSuchMethodError: dynamic không thấy extension');
  }
  print(VndFormat(total as int).toVnd()); // gọi tường minh
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>1.250.000 ₫
true
true
NoSuchMethodError: dynamic không thấy extension
99.000 ₫</code></pre>

<h3>9. Extension types</h3>

<p><strong>Extension type</strong> (Dart 3.3) khai báo một kiểu mới <strong>chỉ tồn tại lúc compile</strong> bao quanh một kiểu có sẵn (representation type). Lúc runtime nó bị xoá hẳn: chỉ còn object gốc, không có object bọc, nên không tốn bộ nhớ hay thời gian.</p>

<pre data-lang="dart"><code>extension type const UserId(String value) {}</code></pre>

<ul>
  <li>Không có <code>implements</code>, extension type <strong>không</strong> dùng được member của <code>String</code> và không gán được cho <code>String</code>; ngược lại <code>String</code> cũng không gán được cho <code>UserId</code>. Có <code>implements String</code> (hoặc một supertype của nó) thì nó "trong suốt" và dùng được member đó.</li>
  <li><code>is</code>, <code>as</code> và pattern kiểm tra trên <strong>representation type</strong>: một <code>UserId</code> lúc runtime <code>is OrderId</code> cũng là <code>true</code> nếu cả hai bọc <code>String</code>.</li>
  <li>Không có instance field riêng; được khai báo constructor phụ, method, getter.</li>
</ul>

<p>Tài liệu Dart gọi extension type là một abstraction "unsafe": chỉ là lớp bảo vệ của type checker, không phải ranh giới runtime. Dùng nó để chặn nhầm lẫn khi viết code, không dùng để bảo mật. Gần nhất ở Kotlin là <code>value class</code>, nhưng <code>value class</code> có lúc bị boxing ở runtime, còn extension type luôn bị xoá.</p>

<h4>Ví dụ: không truyền nhầm ID</h4>

<p><strong>Bài toán:</strong> <code>userId</code> và <code>orderId</code> đều là <code>String</code>; truyền nhầm cái này vào hàm nhận cái kia vẫn compile và chỉ lộ ra khi server trả 404. Phần trăm giảm giá cần được kẹp trong 0–100 mà vẫn dùng như <code>double</code>.</p>

<pre data-lang="dart"><code>// ids.dart
extension type const UserId(String value) {}
extension type const OrderId(String value) {}

extension type Percent._(double value) implements double {
  Percent(double value) : this._(value.clamp(0, 100).toDouble());
  double of(double amount) =&gt; amount * value / 100;
}

String loadOrder(OrderId id) =&gt; 'Đơn \${id.value}';

void main() {
  const userId = UserId('u-42');
  const orderId = OrderId('o-1001');
  print(loadOrder(orderId));
  // loadOrder(userId);      // lỗi compile: UserId không phải OrderId
  // loadOrder('o-1001');    // lỗi compile: String không phải OrderId

  final discount = Percent(15);
  print('\${discount.of(200000)} \${Percent(120)}'); // 120 bị kẹp về 100

  Object? raw = userId;  // không implements gì: chỉ là subtype của Object?
  print(raw is OrderId); // true: is kiểm tra kiểu biểu diễn String
  print(userId.runtimeType);
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>Đơn o-1001
30000.0 100.0
true
String</code></pre>

<p>Bỏ comment hai dòng <code>loadOrder</code>, <code>dart analyze</code> báo <code>argument_type_not_assignable</code> cho cả hai.</p>

<h3>10. Equality, immutability và <code>copyWith</code></h3>

<p>Mặc định <code>==</code> của class so <strong>identity</strong> (hai biến cùng trỏ một object), giống <code>identical</code>. Model dữ liệu thường cần <strong>value equality</strong>: hai object bằng nhau khi mọi field bằng nhau. Dart không có <code>data class</code>, nên phải tự override:</p>

<ul>
  <li><code>operator ==(Object other)</code>: tham số luôn là <code>Object</code>, kiểm tra <code>other is CartItem</code> rồi so từng field.</li>
  <li><code>hashCode</code> <strong>phải override cùng lúc</strong> và phải khớp <code>==</code> (bằng nhau thì cùng hashCode), vì <code>Set</code>, <code>Map</code> dùng hashCode để tìm. <code>Object.hash(...)</code> gộp nhiều field.</li>
</ul>

<p><strong>Immutability</strong>: mọi field <code>final</code>, có <code>const</code> constructor nếu được. Muốn "sửa" thì tạo object mới qua <code>copyWith</code>, field không truyền thì giữ nguyên. Lợi ích: object cũ không bao giờ đổi sau lưng code đang giữ nó, và việc so sánh state cũ với state mới (Flutter làm điều này liên tục) đáng tin.</p>

<p>Các lựa chọn khác trước khi tự viết:</p>

<ul>
  <li><strong>Record</strong> (<code>(id: 'p-01', quantity: 2)</code>) có sẵn value equality, hợp cho dữ liệu nhỏ, cục bộ (xem <a href="variables_and_types.md" target="_blank" rel="noopener">1.2.1 Variables and Types</a>).</li>
  <li>Field kiểu <code>List</code>/<code>Map</code> không có deep equality: <code>[1] == [1]</code> là <code>false</code>. So sánh nội dung cần <code>package:collection</code> (xem <a href="collections_functional.md" target="_blank" rel="noopener">1.2.4 Collections and Functional APIs</a>).</li>
  <li><strong>Codegen</strong> khi model nhiều và lớn: <code>freezed</code> sinh <code>==</code>, <code>hashCode</code>, <code>copyWith</code>, <code>toString</code> và cả sealed union; <code>json_serializable</code> sinh <code>fromJson</code>/<code>toJson</code>; <code>equatable</code> giảm boilerplate <code>==</code>/<code>hashCode</code> mà không cần sinh code. Cách cấu hình nằm ở 5.1.2 JSON Serialization and Codegen (chưa có bài).</li>
</ul>

<h4>Ví dụ: dòng sản phẩm trong giỏ hàng</h4>

<p><strong>Bài toán:</strong> một dòng giỏ hàng tăng số lượng phải tạo object mới; hai dòng có cùng dữ liệu phải coi là bằng nhau, và <code>Set</code> không được chứa trùng.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li>Tạo <code>coffee</code> bằng <code>const</code> constructor.</li>
  <li><code>copyWith(quantity: 2)</code> tạo object mới; <code>coffee</code> giữ nguyên.</li>
  <li><code>==</code> so từng field: object mới bằng một object khác có cùng dữ liệu.</li>
  <li><code>hashCode</code> khớp <code>==</code>, nên <code>Set</code> loại được bản trùng tạo bởi <code>copyWith()</code>.</li>
</ol>

<div class="mermaid">
flowchart LR
    A["(1) coffee x1"] --&gt;|"(2) copyWith(quantity: 2)"| B["object mới x2"]
    B --&gt;|"(3) == so từng field"| C["bằng CartItem cùng dữ liệu"]
    A --&gt;|"copyWith() không đổi gì"| D["bản sao x1"]
    D --&gt;|"(4) hashCode và == khớp"| E["Set bỏ bản trùng"]
</div>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// cart_item.dart
class CartItem {
  const CartItem({required this.productId, required this.name, this.quantity = 1, this.note});

  final String productId;
  final String name;
  final int quantity;
  final String? note;

  // (2) copyWith: field không truyền thì giữ nguyên
  CartItem copyWith({String? name, int? quantity, String? note}) =&gt; CartItem(
        productId: productId,
        name: name ?? this.name,
        quantity: quantity ?? this.quantity,
        note: note ?? this.note,
      );

  // (3) value equality
  @override
  bool operator ==(Object other) =&gt;
      other is CartItem &amp;&amp;
      other.productId == productId &amp;&amp;
      other.name == name &amp;&amp;
      other.quantity == quantity &amp;&amp;
      other.note == note;

  // (4) hashCode phải khớp ==
  @override
  int get hashCode =&gt; Object.hash(productId, name, quantity, note);

  @override
  String toString() =&gt; 'CartItem($productId x$quantity)';
}

void main() {
  const coffee = CartItem(productId: 'p-01', name: 'Cà phê sữa'); // (1)
  final twoCoffees = coffee.copyWith(quantity: 2);
  print('$coffee -&gt; $twoCoffees');
  print(twoCoffees == const CartItem(productId: 'p-01', name: 'Cà phê sữa', quantity: 2));
  print(identical(coffee, twoCoffees));
  print({coffee, coffee.copyWith(), twoCoffees}.length);
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>CartItem(p-01 x1) -&gt; CartItem(p-01 x2)
true
false
2</code></pre>

<h2>Deep Dive: vì sao Dart 3 cần <code>base</code></h2>

<p>Implicit interface có một lỗ hổng mà chỉ <code>base</code> (và <code>final</code>, <code>sealed</code>) bịt được: interface của class gồm cả member <strong>private</strong>, nhưng code ngoài library không thể viết member private đó.</p>

<p>Ví dụ: library <code>wallet.dart</code> có <code>class Wallet</code> với field <code>_balanceCents</code> và hàm <code>static bool canAfford(Wallet wallet, int cents) =&gt; wallet._balanceCents &gt;= cents;</code>. Ở library khác, <code>class FakeWallet implements Wallet</code> viết đủ mọi member public, và <code>dart analyze</code> báo <strong>No issues found</strong>. Nhưng khi chạy:</p>

<ol>
  <li>App truyền <code>FakeWallet</code> vào <code>Wallet.canAfford</code>.</li>
  <li>Code của library đọc <code>wallet._balanceCents</code>, tin rằng mọi <code>Wallet</code> đều có field này.</li>
  <li><code>FakeWallet</code> không có (và không thể có) <code>_balanceCents</code> của library <code>wallet.dart</code>.</li>
  <li>Runtime ném <code>NoSuchMethodError</code>.</li>
</ol>

<div class="mermaid">
sequenceDiagram
    participant App as main.dart
    participant Lib as Wallet.canAfford
    participant Fake as FakeWallet
    App-&gt;&gt;Lib: (1) canAfford(FakeWallet, 10000)
    Lib-&gt;&gt;Fake: (2) đọc _balanceCents
    Note over Fake: (3) không có member private của wallet.dart
    Fake--&gt;&gt;App: (4) NoSuchMethodError
</div>

<pre data-lang="text"><code>NoSuchMethodError: Class 'FakeWallet' has no instance getter '_balanceCents'.
Receiver: Instance of 'FakeWallet'
Tried calling: _balanceCents</code></pre>

<p>Đánh dấu <code>base class Wallet</code> thì dòng <code>implements Wallet</code> ở library khác thành lỗi compile, và mọi subtype buộc phải extend (đi qua constructor thật, có đủ member private). Đây cũng là lý do ràng buộc <code>base</code> lan xuống mọi subtype: nếu một subclass được bỏ <code>base</code>, người khác lại <code>implements</code> subclass đó và lỗ hổng mở lại.</p>

<h2>Ví dụ thực tế</h2>

<h3>1. State của màn hình giỏ hàng: sealed + immutable model</h3>

<p>Đây là pattern phổ biến nhất trong app Flutter: state là một sealed hierarchy, dữ liệu bên trong là model immutable, mỗi thay đổi tạo state mới. Code dưới là Dart thuần; trong Flutter, controller này sẽ được bọc bằng <code>ChangeNotifier</code> hoặc Cubit (4.1.1 ChangeNotifier and ValueNotifier (chưa có bài), 4.2.3 BLoC and Cubit (chưa có bài)).</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li>Controller khởi đầu ở <code>CartLoading</code>.</li>
  <li>Khi dữ liệu về, state thành <code>CartLoaded(items)</code>; danh sách được bọc <code>List.unmodifiable</code> nên không ai sửa được từ ngoài.</li>
  <li><code>addItem</code> chỉ làm việc khi state là <code>CartLoaded</code>; đang tải thì bỏ qua.</li>
  <li>Sản phẩm đã có thì (4a) <code>copyWith</code> tăng số lượng, chưa có thì (4b) thêm dòng mới, đều trên một bản sao của danh sách.</li>
  <li>Gán state <strong>mới</strong>; state cũ không đổi.</li>
  <li>View <code>switch</code> trên sealed state để hiển thị, không cần nhánh <code>_</code>.</li>
</ol>

<div class="mermaid">
sequenceDiagram
    participant View as render
    participant Ctrl as CartController
    participant State as CartState
    Ctrl-&gt;&gt;State: (1) CartLoading
    Ctrl-&gt;&gt;State: (2) loaded(items) tạo CartLoaded
    View-&gt;&gt;Ctrl: addItem(productId)
    Ctrl-&gt;&gt;Ctrl: (3) state is CartLoaded?
    Ctrl-&gt;&gt;Ctrl: (4a) copyWith quantity + 1 hoặc (4b) thêm dòng
    Ctrl-&gt;&gt;State: (5) gán CartLoaded mới
    View-&gt;&gt;State: (6) switch theo subtype
</div>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// cart_state.dart
class CartItem {
  const CartItem({required this.productId, required this.unitPrice, this.quantity = 1});

  final String productId;
  final int unitPrice;
  final int quantity;

  int get lineTotal =&gt; unitPrice * quantity;

  CartItem copyWith({int? quantity}) =&gt;
      CartItem(productId: productId, unitPrice: unitPrice, quantity: quantity ?? this.quantity);

  // == và hashCode viết như phần 10 (lược bớt để tập trung vào state)
}

sealed class CartState {
  const CartState();
}

final class CartLoading extends CartState {
  const CartLoading();
}

final class CartLoaded extends CartState {
  CartLoaded(List&lt;CartItem&gt; items) : items = List.unmodifiable(items);
  final List&lt;CartItem&gt; items;

  int get total =&gt; items.fold(0, (sum, item) =&gt; sum + item.lineTotal);
}

final class CartError extends CartState {
  const CartError(this.message);
  final String message;
}

// cart_controller.dart
class CartController {
  CartState _state = const CartLoading(); // (1)
  CartState get state =&gt; _state;

  void loaded(List&lt;CartItem&gt; items) =&gt; _state = CartLoaded(items); // (2)

  void addItem(String productId, int unitPrice) {
    final current = _state;
    if (current is! CartLoaded) return; // (3)

    final items = [...current.items];
    final index = items.indexWhere((item) =&gt; item.productId == productId);
    if (index &gt;= 0) {
      items[index] = items[index].copyWith(quantity: items[index].quantity + 1); // (4a)
    } else {
      items.add(CartItem(productId: productId, unitPrice: unitPrice)); // (4b)
    }
    _state = CartLoaded(items); // (5)
  }
}

// cart_view.dart
String render(CartState state) =&gt; switch (state) { // (6)
      CartLoading() =&gt; 'Đang tải giỏ hàng...',
      CartLoaded(items: []) =&gt; 'Giỏ hàng trống',
      CartLoaded(:final items, :final total) =&gt; '\${items.length} sản phẩm, tổng $total đ',
      CartError(:final message) =&gt; 'Lỗi: $message',
    };

void main() {
  final controller = CartController();
  controller.addItem('p-01', 45000); // bị bỏ qua: đang CartLoading
  print(render(controller.state));

  controller.loaded([]);
  final before = controller.state;
  controller.addItem('p-01', 45000);
  controller.addItem('p-01', 45000);
  controller.addItem('p-02', 30000);
  print(render(controller.state));
  print(render(before)); // state cũ vẫn nguyên vẹn
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>Đang tải giỏ hàng...
2 sản phẩm, tổng 120000 đ
Giỏ hàng trống</code></pre>

<h3>2. Mixin trong Flutter framework</h3>

<p>Flutter dùng mixin cho hành vi gắn vào <code>State</code>. Code Flutter (đúng API, không chạy trong bài):</p>

<pre data-lang="dart"><code>// login_screen.dart (Flutter)
class _LoginScreenState extends State&lt;LoginScreen&gt;
    with SingleTickerProviderStateMixin {
  late final AnimationController _shake =
      AnimationController(vsync: this, duration: const Duration(milliseconds: 300));

  @override
  void dispose() {
    _shake.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) =&gt; const Placeholder();
}</code></pre>

<p><code>SingleTickerProviderStateMixin</code> có superclass constraint <code>State&lt;T&gt;</code> và implements <code>TickerProvider</code>, nên <code>this</code> truyền được vào <code>vsync</code>. <code>ChangeNotifier</code> là một <code>mixin class</code>: vừa <code>extends ChangeNotifier</code> vừa <code>with ChangeNotifier</code> được.</p>

<h3>3. Thiết kế API cho package dùng chung</h3>

<p>Khi viết package nội bộ hoặc public, chọn modifier cho từng class công khai ngay từ đầu: model và state nên <code>final class</code> (thêm field sau này không phá ai), contract cho người dùng tự cài (<code>Logger</code>, <code>Storage</code>) nên <code>abstract interface class</code>, class cần người dùng kế thừa nhưng phải đi qua constructor (base repository) nên <code>base class</code>. Gỡ <code>final</code>, <code>base</code> hay <code>interface</code> sau này không phá người dùng; <strong>thêm</strong> modifier vào class đã công bố là breaking change. Riêng gỡ <code>sealed</code> cũng là breaking change: các <code>switch</code> không có nhánh <code>_</code> của người dùng mất exhaustiveness và báo lỗi.</p>

<h2>Khi nào nên và không nên dùng</h2>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Công cụ</th>
      <th style="padding:8px 12px;text-align:left;">Nên dùng khi</th>
      <th style="padding:8px 12px;text-align:left;">Không nên dùng khi</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>extends</code></td>
      <td style="padding:8px 12px;">Quan hệ "là một" thật, cần dùng lại implementation</td>
      <td style="padding:8px 12px;">Chỉ để mượn vài hàm tiện ích: dùng mixin hoặc composition</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>implements</code></td>
      <td style="padding:8px 12px;">Cam kết contract, viết fake cho test</td>
      <td style="padding:8px 12px;">Class có member private mà library gốc đọc trên mọi instance (Deep Dive), hoặc class <code>base</code>/<code>final</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>mixin</code></td>
      <td style="padding:8px 12px;">Hành vi cắt ngang nhiều class không cùng gốc (log, retry, ticker)</td>
      <td style="padding:8px 12px;">Hành vi cần state khởi tạo qua constructor, hoặc chỉ một class dùng</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>sealed</code></td>
      <td style="padding:8px 12px;">Tập biến thể đóng, mỗi biến thể mang dữ liệu riêng (state, result, event)</td>
      <td style="padding:8px 12px;">Người dùng package cần thêm biến thể của họ</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>final</code> / <code>base</code> / <code>interface</code></td>
      <td style="padding:8px 12px;">Class công khai của package, cần tiến hoá mà không phá người dùng</td>
      <td style="padding:8px 12px;">Code app nằm gọn trong một library, nơi modifier không khoá được gì</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Enhanced enum</td>
      <td style="padding:8px 12px;">Giá trị cố định, cùng cấu trúc, biết lúc compile</td>
      <td style="padding:8px 12px;">Dữ liệu khác nhau theo từng lần tạo</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Extension method</td>
      <td style="padding:8px 12px;">Thêm tiện ích cho kiểu không sở hữu</td>
      <td style="padding:8px 12px;">Logic cần polymorphism, hoặc class mình sở hữu (viết method thật)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Extension type</td>
      <td style="padding:8px 12px;">Chặn nhầm lẫn giữa các ID, đơn vị cùng kiểu gốc mà không tốn runtime</td>
      <td style="padding:8px 12px;">Cần kiểm tra kiểu lúc runtime hoặc ranh giới bảo mật</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Value equality tự viết</td>
      <td style="padding:8px 12px;">Vài model nhỏ</td>
      <td style="padding:8px 12px;">Hàng chục model: chuyển sang <code>freezed</code>/<code>equatable</code></td>
    </tr>
  </tbody>
</table>

<h2>Sai lầm thường gặp</h2>

<ol>
  <li><strong>Override <code>==</code> mà quên <code>hashCode</code>.</strong> <code>Set</code>/<code>Map</code> tìm theo hashCode trước, nên hai object "bằng nhau" vẫn bị coi là khác. Analyzer có lint <code>hash_and_equals</code>. Luôn override cặp đôi, dùng <code>Object.hash</code>.</li>
  <li><strong>Đưa field mutable vào <code>hashCode</code>.</strong> Object đã nằm trong <code>Set</code> mà field đổi thì hashCode đổi, <code>Set</code> không tìm thấy nó nữa:
<pre data-lang="dart"><code>final tag = Tag('sale'); // Tag có \`String label\` không final, == và hashCode theo label
final tags = {tag};
tag.label = 'hot';
print(tags.contains(tag)); // false</code></pre>
<p>Sửa: field tham gia equality phải <code>final</code>.</p></li>
  <li><strong><code>copyWith</code> không đặt được field về <code>null</code>.</strong> Với <code>note: note ?? this.note</code>, gọi <code>copyWith(note: null)</code> giữ nguyên giá trị cũ. Sửa: tham số dạng hàm (<code>String? Function()? note</code>), sentinel object, hoặc dùng <code>freezed</code> (xử lý sẵn trường hợp này).</li>
  <li><strong>Quên <code>@override</code> rồi gõ sai tên.</strong> <code>void dispoze()</code> trong subclass tạo method mới, không override gì, và <code>dispose</code> thật không bao giờ chạy logic dọn dẹp của bạn. Lint <code>annotate_overrides</code> (có trong <code>package:lints/recommended.yaml</code> và <code>flutter_lints</code>) nhắc thêm annotation; khi có <code>@override</code> mà sai tên, analyzer báo <code>override_on_non_overriding_member</code>.</li>
  <li><strong>Sai thứ tự mixin.</strong> <code>with Logging, Retry</code> và <code>with Retry, Logging</code> cho hành vi khác nhau (phần 4). Mixin viết sau bọc ngoài cùng.</li>
  <li><strong>Dùng <code>abstract class</code> + nhánh <code>_</code> cho state.</strong> Trạng thái mới rơi lặng lẽ vào <code>_</code> (phần "Vấn đề cần giải quyết"). Dùng <code>sealed</code> và bỏ nhánh <code>_</code>; bẫy thêm <code>_</code> cả khi đã sealed nằm ở <a href="control_flow_patterns.md" target="_blank" rel="noopener">1.2.3 Control Flow and Patterns</a>.</li>
  <li><strong>Tưởng <code>final class</code> hay <code>sealed</code> khoá được trong cùng file.</strong> Modifier chỉ áp dụng với library khác. Trong cùng library, code vẫn implement <code>final class</code> tự do; muốn có ranh giới thì tách file.</li>
  <li><strong>Gọi extension qua <code>dynamic</code>.</strong> Compile được nhưng ném <code>NoSuchMethodError</code> lúc runtime (phần 8). Giữ static type rõ ràng ở chỗ dùng extension.</li>
  <li><strong>Truy cập <code>this</code> trong <code>factory</code> hoặc initializer list.</strong> Cả hai chạy khi object chưa tồn tại, compiler báo lỗi. Logic cần <code>this</code> đặt vào body của generative constructor hoặc method.</li>
</ol>

<h2>Trade-offs</h2>

<ul>
  <li><strong><code>sealed</code> đổi tính mở lấy an toàn.</strong> Thêm một subtype vào sealed class công khai làm hỏng mọi <code>switch</code> exhaustive của người dùng package: đó là breaking change, cần tăng major version.</li>
  <li><strong><code>final class</code> khó fake trong test.</strong> File test là library riêng nên không <code>implements</code> được class <code>final</code> hay <code>base</code>. Hoặc thiết kế contract <code>abstract interface class</code> cho test dùng, hoặc chấp nhận dùng implementation thật.</li>
  <li><strong>Mixin giúp tái sử dụng nhưng làm luồng gọi khó dò.</strong> Một <code>super.send()</code> đi qua bao nhiêu tầng phụ thuộc vào <code>with</code> ở chỗ khai báo class. Giữ mỗi mixin nhỏ và ít mixin chồng nhau.</li>
  <li><strong>Value equality viết tay tốn công bảo trì.</strong> Thêm field mà quên cập nhật <code>==</code>/<code>hashCode</code>/<code>copyWith</code> là lỗi im lặng. Codegen loại lỗi này nhưng thêm bước build và phụ thuộc.</li>
</ul>

<h2>Lịch sử phát triển</h2>

<ul>
  <li><strong>Dart 1.0 (11/2013)</strong>: class, implicit interface, <code>abstract</code>, factory constructor và mixin có từ đầu, nhưng mixin là class thường dùng sau <code>with</code> và không gọi được <code>super</code>. Thiết kế "mọi class là interface" giảm boilerplate và giúp viết fake dễ.</li>
  <li><strong>Dart 2.1 (11/2018)</strong>: cú pháp khai báo <code>mixin</code> riêng, có <code>on</code>, cho phép gọi <code>super</code> trong mixin. Tách ý định "để trộn" khỏi "để tạo object".</li>
  <li><strong>Dart 2.7 (12/2019)</strong>: extension methods, thêm API cho kiểu có sẵn (đặc biệt kiểu của SDK và Flutter) mà không phải bọc.</li>
  <li><strong>Dart 2.12 (3/2021)</strong>: sound null safety. Field non-nullable buộc phải có giá trị trước body, làm initializer list và <code>late</code> thành công cụ hằng ngày.</li>
  <li><strong>Dart 2.17 (5/2022)</strong>: enhanced enum và super parameters, giảm boilerplate khi enum cần dữ liệu và khi subclass chuyển tham số lên superclass.</li>
  <li><strong>Dart 3.0 (5/2023)</strong>: class modifiers (<code>base</code>, <code>interface</code>, <code>final</code>, <code>sealed</code>, <code>mixin class</code>) cùng patterns, records, switch expression; class thường không còn dùng được làm mixin. Lý do: tác giả package cần công cụ để tiến hoá API mà không phá người dùng, và pattern matching cần một hierarchy đóng để kiểm tra exhaustiveness.</li>
  <li><strong>Dart 3.3 (2/2024)</strong>: extension types, wrapper không tốn chi phí runtime, cũng là nền cho JS interop mới (<code>dart:js_interop</code>).</li>
  <li><strong>Dart 3.12 (5/2026)</strong>: private named parameters (<code>this._value</code> trong named parameter).</li>
  <li><strong>Dart 3.13 (8/2026)</strong>: primary constructors (<code>class Point(var int x, var int y);</code>) chính thức, khai báo field và constructor ngay trên header. Ví dụ trong bài viết theo Dart 3.12 nên chưa dùng cú pháp này.</li>
</ul>

<h2>Kết nối hệ thống</h2>

<ul>
  <li><strong>Tiên quyết</strong>: <a href="variables_and_types.md" target="_blank" rel="noopener">1.2.1 Variables and Types</a> (<code>final</code>, <code>late</code>, null safety, generics, records) và <a href="functions_operators.md" target="_blank" rel="noopener">1.2.2 Functions and Operators</a> (named parameter, tear-off, operator overloading như <code>operator ==</code>).</li>
  <li><strong>Liên quan</strong>: <a href="control_flow_patterns.md" target="_blank" rel="noopener">1.2.3 Control Flow and Patterns</a> giải thích cơ chế exhaustiveness và object pattern dùng với sealed; <a href="collections_functional.md" target="_blank" rel="noopener">1.2.4 Collections and Functional APIs</a> về equality và mutability của <code>List</code>/<code>Map</code> bên trong model; <a href="dart_for_kotlin_devs.md" target="_blank" rel="noopener">1.1.1 Dart for Kotlin Developers</a> có bảng ánh xạ Kotlin → Dart.</li>
  <li><strong>Học tiếp</strong>: <a href="../async/futures_async_await.md" target="_blank" rel="noopener">1.3.1 Futures and Async/Await</a> mở đầu phần Asynchronous Dart. Ở các Session sau, kiến thức bài này được dùng trực tiếp trong 3.1.1 Stateless and Stateful Widgets (chưa có bài), 4.1.1 ChangeNotifier and ValueNotifier (chưa có bài), 4.2.3 BLoC and Cubit (chưa có bài), 5.1.2 JSON Serialization and Codegen (chưa có bài) và 11.1.1 Unit Testing and Mocking (chưa có bài).</li>
</ul>

<h2>Developer Curiosity Checklist</h2>

<ul>
  <li>Vì sao initializer list không được truy cập <code>this</code>, và điều đó liên quan gì tới việc initializer list của subclass chạy trước superclass?</li>
  <li><code>class C extends B with M1, M2</code> thì <code>super.x()</code> trong <code>M2</code> gọi tới đâu?</li>
  <li>Một <code>class</code> thường extend <code>interface class</code> trong cùng library thì code bên ngoài có extend được class đó không? Còn với <code>base class</code>?</li>
  <li>Vì sao <code>sealed</code> cho phép switch không cần nhánh <code>_</code>, còn <code>abstract class</code> thì không?</li>
  <li>Khi nào chọn enhanced enum thay vì sealed class?</li>
  <li>Vì sao <code>dynamic</code> không gọi được extension method, và <code>UserId is OrderId</code> lại trả <code>true</code>?</li>
  <li>Override <code>==</code> mà không override <code>hashCode</code> thì <code>Set</code> hỏng thế nào?</li>
</ul>

<h2>Tham khảo</h2>

<ul>
  <li><a href="https://dart.dev/language/classes" target="_blank" rel="noopener">Classes</a>, dart.dev</li>
  <li><a href="https://dart.dev/language/constructors" target="_blank" rel="noopener">Constructors</a>, dart.dev</li>
  <li><a href="https://dart.dev/language/extend" target="_blank" rel="noopener">Extend a class</a>, dart.dev</li>
  <li><a href="https://dart.dev/language/mixins" target="_blank" rel="noopener">Mixins</a>, dart.dev</li>
  <li><a href="https://dart.dev/language/class-modifiers" target="_blank" rel="noopener">Class modifiers</a>, dart.dev</li>
  <li><a href="https://dart.dev/language/modifier-reference" target="_blank" rel="noopener">Class modifiers reference</a>, dart.dev</li>
  <li><a href="https://dart.dev/language/enums" target="_blank" rel="noopener">Enumerated types</a>, dart.dev</li>
  <li><a href="https://dart.dev/language/extension-methods" target="_blank" rel="noopener">Extension methods</a>, dart.dev</li>
  <li><a href="https://dart.dev/language/extension-types" target="_blank" rel="noopener">Extension types</a>, dart.dev</li>
  <li><a href="https://dart.dev/language/primary-constructors" target="_blank" rel="noopener">Primary constructors</a>, dart.dev</li>
  <li><a href="https://dart.dev/resources/language/evolution" target="_blank" rel="noopener">Language evolution</a>, dart.dev</li>
  <li><a href="https://github.com/dart-lang/sdk/blob/main/CHANGELOG.md" target="_blank" rel="noopener">Dart SDK CHANGELOG</a>, dart-lang/sdk</li>
  <li><a href="https://api.dart.dev/dart-core/Object/hash.html" target="_blank" rel="noopener">Object.hash</a>, api.dart.dev</li>
  <li><a href="https://api.flutter.dev/flutter/foundation/ChangeNotifier-class.html" target="_blank" rel="noopener">ChangeNotifier</a> và <a href="https://api.flutter.dev/flutter/widgets/SingleTickerProviderStateMixin-mixin.html" target="_blank" rel="noopener">SingleTickerProviderStateMixin</a>, api.flutter.dev</li>
</ul>
    `
  },

  'flutter-language-async-futures': {
    title: 'Futures and Async/Await',
    summary: 'Future<T> là đối tượng đại diện cho một giá trị kiểu T (hoặc một lỗi) sẽ có sau này; async/await là cú pháp để chờ Future mà không chặn thread. Cả hai chạy trên event loop một thread của isolate, nơi microtask queue luôn được xử lý hết trước event queue.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '26 phút',
    depth: 'deep-dive',
    tags: ['flutter', 'dart', 'session-01', 'async', 'future', 'event-loop'],
    domain: 'Flutter Development',
    module: 'Session 01: Dart Foundations',
    prerequisites: ['flutter.dart.functions_operators', 'flutter.dart.control_flow_patterns'],
    related: ['flutter.async.streams', 'flutter.async.isolates', 'flutter.dart.dart_for_kotlin_devs'],
    learningOutcomes: [
      'Giải thích được event loop của Dart với microtask queue và event queue, và dự đoán đúng thứ tự chạy của code trộn đồng bộ, microtask và event.',
      'Phân biệt được ba trạng thái của Future và hai cách tiêu thụ nó (then/catchError và async/await).',
      'Xử lý được lỗi bất đồng bộ bằng try/catch quanh await, và nhận diện được lỗi thoát khỏi luồng xử lý khi quên await.',
      'Áp dụng được Future.wait, record .wait, timeout, Future.delayed và Completer cho các bài toán chờ nhiều việc, giới hạn thời gian và bọc API callback.',
      'Biết khi nào dùng unawaited một cách có chủ đích, và vì sao async không phải đa luồng.'
    ],
    knowledgeGap: 'Không hiểu event loop khiến lập trình viên tưởng async là "chạy nền" rồi đặt phép tính nặng vào hàm async làm giật UI, quên await khiến try/catch không bắt được lỗi và màn hình báo "Đã lưu" khi việc lưu thất bại, và await tuần tự các request độc lập làm màn hình chậm gấp nhiều lần cần thiết.',
    updatedAt: '2026-11-10',
    readTime: '26 phút',
    content: `
<h2>Vấn đề cần giải quyết</h2>

<p>Phần lớn việc một ứng dụng làm là <strong>chờ</strong>: chờ server trả lời, chờ đọc file, chờ người dùng bấm, chờ hết một khoảng thời gian. Trong lúc chờ, giao diện vẫn phải vẽ frame, vẫn phải phản hồi thao tác.</p>

<p>Có hai cách trả lời câu hỏi "chờ mà không đóng băng giao diện":</p>

<ul>
  <li><strong>Nhiều thread</strong>: việc chờ chạy trên thread khác, thread UI tiếp tục. Đây là cách của Java, và cũng là nền của Kotlin coroutine với <code>Dispatchers.IO</code>. Cái giá là state dùng chung giữa các thread phải được bảo vệ (lock, <code>@Volatile</code>, <code>Mutex</code>), nếu không sẽ có race condition.</li>
  <li><strong>Một thread, không bao giờ ngồi chờ</strong>: thread duy nhất giao việc chờ cho hệ điều hành (socket, file, timer), ghi lại "khi có kết quả thì làm tiếp phần này", rồi đi làm việc khác. Đây là cách của Dart (và JavaScript).</li>
</ul>

<p>Dart chọn cách thứ hai. Code Dart trong một isolate (vùng chạy có bộ nhớ riêng, xem <a href="isolates.md" target="_blank" rel="noopener">1.3.3 Isolates</a>) chỉ có <strong>một thread</strong> chạy, nên không có race condition trên state. Đổi lại, chính thread đó vừa chạy logic vừa vẽ UI, và hiểu sai cơ chế thì gặp lỗi rất điển hình:</p>

<pre data-lang="dart"><code>Future&lt;void&gt; onSavePressed() async {
  try {
    saveDraft('Bản nháp'); // thiếu await
    print('Đã lưu!'); // in ra ngay, kể cả khi việc lưu thất bại
  } catch (e) {
    print('Báo lỗi cho người dùng: $e'); // không bao giờ chạy
  }
}</code></pre>

<p>Bài này giải thích cơ chế đứng sau <code>Future</code>, <code>async</code>, <code>await</code>: code chạy theo thứ tự nào, lỗi đi đâu, khi nào cần thứ khác (Stream, isolate).</p>

<h2>Sau khi học xong</h2>

<ul>
  <li>Giải thích được event loop của Dart với microtask queue và event queue, và dự đoán đúng thứ tự chạy của code trộn đồng bộ, microtask và event.</li>
  <li>Phân biệt được ba trạng thái của Future và hai cách tiêu thụ nó (then/catchError và async/await).</li>
  <li>Xử lý được lỗi bất đồng bộ bằng try/catch quanh await, và nhận diện được lỗi thoát khỏi luồng xử lý khi quên await.</li>
  <li>Áp dụng được Future.wait, record .wait, timeout, Future.delayed và Completer cho các bài toán chờ nhiều việc, giới hạn thời gian và bọc API callback.</li>
  <li>Biết khi nào dùng unawaited một cách có chủ đích, và vì sao async không phải đa luồng.</li>
</ul>

<h2>Future và async/await là gì?</h2>

<p><code>Future&lt;T&gt;</code> (giá trị tương lai) là một đối tượng đại diện cho <strong>một</strong> giá trị kiểu <code>T</code>, hoặc một lỗi, <strong>sẽ có sau này</strong>. <code>async</code>/<code>await</code> là cú pháp để viết code chờ Future theo kiểu tuần tự: <code>await</code> <strong>treo hàm hiện tại</strong> và trả quyền cho event loop, thay vì chặn thread.</p>

<p><strong>Mental model: một nhân viên, hai hàng việc.</strong> Mỗi isolate có đúng một "nhân viên" (thread) và hai hàng việc: hàng ưu tiên (microtask queue) và hàng thường (event queue). Nhân viên làm xong việc đang cầm, rồi làm <strong>hết</strong> hàng ưu tiên, rồi mới lấy <strong>một</strong> việc ở hàng thường. Khi gặp <code>await</code>, nhân viên không đứng chờ: họ cầm một <strong>phiếu hẹn</strong> (Future), ghi chú "khi phiếu có kết quả thì làm tiếp phần còn lại của hàm", rồi đi làm việc khác.</p>

<h2>Cách hoạt động</h2>

<h3>1. Event loop: một thread, hai hàng đợi</h3>

<p>Event loop (vòng lặp sự kiện) là vòng lặp mà runtime Dart chạy cho mỗi isolate. Nó có hai hàng đợi:</p>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Hàng đợi</th>
      <th style="padding:8px 12px;text-align:left;">Chứa gì</th>
      <th style="padding:8px 12px;text-align:left;">Ai đưa việc vào</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><strong>Microtask queue</strong></td>
      <td style="padding:8px 12px;">Việc nội bộ, ngắn, cần chạy "ngay sau code hiện tại"</td>
      <td style="padding:8px 12px;">Hoàn thành Future, phần tiếp theo sau <code>await</code>, callback <code>then</code>, <code>scheduleMicrotask</code>, <code>Future.microtask</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><strong>Event queue</strong></td>
      <td style="padding:8px 12px;">Sự kiện từ bên ngoài</td>
      <td style="padding:8px 12px;">Timer (<code>Timer</code>, <code>Future.delayed</code>, <code>Future()</code>), I/O (network, file), message từ platform, gesture; trong Flutter, việc vẽ frame cũng đi qua đây</td>
    </tr>
  </tbody>
</table>

<p>Quy tắc của vòng lặp:</p>

<ol>
  <li>Chạy hết code đồng bộ đang có trên call stack. Không gì chen ngang được nó.</li>
  <li>Khi call stack rỗng, chạy <strong>hết</strong> microtask queue, kể cả microtask vừa được xếp thêm trong lúc chạy.</li>
  <li>Lấy <strong>một</strong> event từ event queue, chạy nó (lại là code đồng bộ, quay về bước 1).</li>
  <li>Lặp lại. Hai hàng đợi đều rỗng và không còn việc nào đang chờ (timer, socket, port mở) thì isolate kết thúc.</li>
</ol>

<div class="dd-diagram" data-dd="flutter-event-loop">
<div class="dd-svg dd-svg-dark">
<svg viewBox="0 0 800 392" role="img" aria-labelledby="flutter-event-loop-dark-title flutter-event-loop-dark-desc" font-family="'Geist', sans-serif">
<title id="flutter-event-loop-dark-title">Microtask chen hàng trước</title>
<desc id="flutter-event-loop-dark-desc">UI yield qua await tới event loop, microtask ưu tiên tuyệt đối chạy trước event queue rồi quay về UI.</desc>
<defs>
<marker id="flutter-event-loop-dark-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0, 8 3, 0 6" fill="#94A3B8"/>
</marker>
</defs>
<rect width="800" height="392" fill="#060913"/>
<!-- arrows -->
<path d="M 400,88 V 112" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#flutter-event-loop-dark-arrow)"/>
<rect x="412" y="92" width="96" height="12" rx="2" fill="#060913"/>
<text x="460" y="101" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">YIELD (AWAIT)</text>
<path d="M 400,168 V 192" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#flutter-event-loop-dark-arrow)"/>
<path d="M 400,256 V 280" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#flutter-event-loop-dark-arrow)"/>
<path d="M 240,312 H 208 Q 200,312 200,304 V 68 Q 200,60 208,60 H 240" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#flutter-event-loop-dark-arrow)"/>
<rect x="144" y="258" width="72" height="12" rx="2" fill="#060913"/>
<text x="180" y="267" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">XỬ LÝ XONG</text>
<!-- nodes -->
<rect x="240" y="32" width="320" height="56" rx="6" fill="#060913"/>
<rect x="240" y="32" width="320" height="56" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="400" y="66" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">UI / code đang chạy</text>
<rect x="240" y="112" width="320" height="56" rx="6" fill="#060913"/>
<rect x="240" y="112" width="320" height="56" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="400" y="146" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Event Loop</text>
<rect x="240" y="192" width="320" height="64" rx="6" fill="#060913"/>
<rect x="240" y="192" width="320" height="64" rx="6" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="1.2"/>
<text x="400" y="226" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Microtask Queue</text>
<text x="400" y="240" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">ưu tiên tuyệt đối</text>
<rect x="240" y="280" width="320" height="64" rx="6" fill="#060913"/>
<rect x="240" y="280" width="320" height="64" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="400" y="314" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Event Queue</text>
<text x="400" y="328" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">I/O · timer · gesture · paint</text>
<!-- legend -->
<line x1="32" y1="368" x2="768" y2="368" stroke="rgba(248,250,252,0.12)" stroke-width="0.8"/>
<text x="32" y="384" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" letter-spacing="0.14em">CHÚ GIẢI</text>
<circle cx="150" cy="380" r="4" fill="#38BDF8"/>
<text x="162" y="384" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace">ƯU TIÊN TUYỆT ĐỐI · MICROTASK</text>
<line x1="440" y1="380" x2="472" y2="380" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#flutter-event-loop-dark-arrow)"/>
<text x="480" y="384" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace">VÒNG XỬ LÝ KHÉP KÍN</text>
</svg>
</div>
<div class="dd-svg dd-svg-light">
<svg viewBox="0 0 800 392" role="img" aria-labelledby="flutter-event-loop-title flutter-event-loop-desc" font-family="'Geist', sans-serif">
<title id="flutter-event-loop-title">Microtask chen hàng trước</title>
<desc id="flutter-event-loop-desc">UI yield qua await tới event loop, microtask ưu tiên tuyệt đối chạy trước event queue rồi quay về UI.</desc>
<defs>
<marker id="flutter-event-loop-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0, 8 3, 0 6" fill="#64748B"/>
</marker>
</defs>
<rect width="800" height="392" fill="#F8FAFC"/>
<!-- arrows -->
<path d="M 400,88 V 112" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#flutter-event-loop-arrow)"/>
<rect x="412" y="92" width="96" height="12" rx="2" fill="#F8FAFC"/>
<text x="460" y="101" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">YIELD (AWAIT)</text>
<path d="M 400,168 V 192" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#flutter-event-loop-arrow)"/>
<path d="M 400,256 V 280" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#flutter-event-loop-arrow)"/>
<path d="M 240,312 H 208 Q 200,312 200,304 V 68 Q 200,60 208,60 H 240" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#flutter-event-loop-arrow)"/>
<rect x="144" y="258" width="72" height="12" rx="2" fill="#F8FAFC"/>
<text x="180" y="267" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">XỬ LÝ XONG</text>
<!-- nodes -->
<rect x="240" y="32" width="320" height="56" rx="6" fill="#F8FAFC"/>
<rect x="240" y="32" width="320" height="56" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="400" y="66" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">UI / code đang chạy</text>
<rect x="240" y="112" width="320" height="56" rx="6" fill="#F8FAFC"/>
<rect x="240" y="112" width="320" height="56" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="400" y="146" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Event Loop</text>
<rect x="240" y="192" width="320" height="64" rx="6" fill="#F8FAFC"/>
<rect x="240" y="192" width="320" height="64" rx="6" fill="rgba(2,132,199,0.08)" stroke="#0284C7" stroke-width="1.2"/>
<text x="400" y="226" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Microtask Queue</text>
<text x="400" y="240" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">ưu tiên tuyệt đối</text>
<rect x="240" y="280" width="320" height="64" rx="6" fill="#F8FAFC"/>
<rect x="240" y="280" width="320" height="64" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="400" y="314" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Event Queue</text>
<text x="400" y="328" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">I/O · timer · gesture · paint</text>
<!-- legend -->
<line x1="32" y1="368" x2="768" y2="368" stroke="rgba(15,23,42,0.12)" stroke-width="0.8"/>
<text x="32" y="384" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" letter-spacing="0.14em">CHÚ GIẢI</text>
<circle cx="150" cy="380" r="4" fill="#0284C7"/>
<text x="162" y="384" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace">ƯU TIÊN TUYỆT ĐỐI · MICROTASK</text>
<line x1="440" y1="380" x2="472" y2="380" stroke="#64748B" stroke-width="1.2" marker-end="url(#flutter-event-loop-arrow)"/>
<text x="480" y="384" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace">VÒNG XỬ LÝ KHÉP KÍN</text>
</svg>
</div>
</div>

<p>Hai hệ quả quan trọng:</p>

<ul>
  <li><strong>Code đồng bộ dài chặn tất cả.</strong> Trong lúc một vòng <code>for</code> nặng đang chạy, không microtask nào, không event nào (kể cả frame mới) được xử lý. Trên Flutter, một frame ở 60 Hz có khoảng 16 ms; code đồng bộ chạy quá mức đó là UI bị giật (jank).</li>
  <li><strong>Microtask chen trước mọi event.</strong> Một microtask được xếp ra lúc nào cũng chạy trước event kế tiếp, kể cả event đã nằm chờ từ trước. Đó là lý do phần tiếp theo sau <code>await</code> một Future đã hoàn thành chạy gần như "ngay lập tức".</li>
</ul>

<h4>Ví dụ: thứ tự chạy khi mở màn hình hồ sơ</h4>

<p><strong>Bài toán:</strong> khi mở màn hình hồ sơ, code xếp vài việc: gửi analytics (timer), tải ảnh đại diện (event), cập nhật badge (microtask), và đọc tên người dùng từ cache (Future đã có sẵn giá trị). Ta cần biết chính xác dòng nào chạy trước để không giả định sai (ví dụ tưởng analytics gửi trước khi UI có tên).</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li><code>main</code> chạy, in dòng đầu tiên. Đây là code đồng bộ.</li>
  <li><code>Timer.run</code> xếp <strong>event 1</strong> (gửi analytics) vào event queue. Callback chưa chạy.</li>
  <li><code>Future(...)</code> cũng dùng timer, xếp <strong>event 2</strong> (tải ảnh đại diện) vào event queue.</li>
  <li><code>scheduleMicrotask</code> xếp microtask "cập nhật badge" vào microtask queue.</li>
  <li><code>main</code> gọi <code>openProfile()</code>. Hàm <code>async</code> chạy <strong>đồng bộ</strong> cho tới <code>await</code> đầu tiên, nên dòng in trong <code>openProfile</code> xuất hiện ngay.</li>
  <li><code>Future.value('Lan')</code> xếp một microtask để hoàn thành chính nó; <code>await</code> treo <code>openProfile</code> và trả một Future chưa hoàn thành về cho <code>main</code>.</li>
  <li><code>main</code> in dòng cuối và kết thúc. Call stack rỗng.</li>
  <li>Event loop chạy hết microtask queue theo thứ tự xếp: "cập nhật badge" trước, rồi microtask hoàn thành <code>Future.value</code>, làm <code>openProfile</code> chạy tiếp sau <code>await</code>.</li>
  <li>Microtask queue rỗng, event loop lấy <strong>event 1</strong>: in "gửi analytics", và callback này xếp thêm một microtask.</li>
  <li>Trước khi lấy event 2, event loop chạy hết microtask queue: microtask vừa sinh ra trong event 1 chạy.</li>
  <li>Event loop lấy <strong>event 2</strong>: in "tải ảnh đại diện". Hết việc, chương trình kết thúc.</li>
</ol>

<div class="archify-embed" data-src="archify/flutter/s01-flutter-event-loop-order.html" data-title="Thứ tự chạy: sync, microtask, event">
  <a class="archify-full" href="archify/flutter/s01-flutter-event-loop-order.html" target="_blank" rel="noopener">Mở toàn màn hình ↗</a>
</div>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// event_loop_order.dart
import 'dart:async';

void main() {
  print('sync      | main bắt đầu'); // (1)
  Timer.run(() {
    // (2) xếp event 1 vào event queue
    print('event     | Timer.run: gửi analytics mở màn hình'); // (9)
    scheduleMicrotask(
      () =&gt; print('microtask | sinh ra trong event 1, chạy trước event 2'), // (10)
    );
  });
  Future(() =&gt; print('event     | Future(): tải ảnh đại diện')); // (3) event 2, chạy ở (11)
  scheduleMicrotask(
    () =&gt; print('microtask | scheduleMicrotask: cập nhật badge'), // (4) chạy ở (8)
  );
  openProfile(); // (5)
  print('sync      | main kết thúc'); // (7)
}

Future&lt;void&gt; openProfile() async {
  print('sync      | openProfile chạy tới await đầu tiên'); // (5)
  final name = await Future.value('Lan'); // (6) treo hàm, trả Future về main
  print('microtask | openProfile tiếp tục sau await: $name'); // (8)
}</code></pre>

<p><strong>Kết quả</strong> (<code>dart run event_loop_order.dart</code>, Dart 3.12):</p>

<pre data-lang="text"><code>sync      | main bắt đầu
sync      | openProfile chạy tới await đầu tiên
sync      | main kết thúc
microtask | scheduleMicrotask: cập nhật badge
microtask | openProfile tiếp tục sau await: Lan
event     | Timer.run: gửi analytics mở màn hình
microtask | sinh ra trong event 1, chạy trước event 2
event     | Future(): tải ảnh đại diện</code></pre>

<p>Thứ tự <strong>xếp</strong> (code) và thứ tự <strong>chạy</strong> (output) khác nhau; bốn quy tắc ở trên giải thích được mọi khác biệt đó.</p>

<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body">Bạn hiếm khi gọi <code>scheduleMicrotask</code> hay <code>Timer.run</code> trong code ứng dụng. Ví dụ dùng chúng để thấy rõ hai hàng đợi; trong thực tế, microtask đến từ việc hoàn thành Future và <code>await</code>, event đến từ network, timer và gesture.</div></div>

<h3>2. Future và ba trạng thái</h3>

<p>Tài liệu Dart chia Future thành hai trạng thái, <strong>uncompleted</strong> và <strong>completed</strong>; trạng thái completed lại có hai dạng (có giá trị hoặc có lỗi). Gộp lại, một <code>Future&lt;T&gt;</code> luôn ở một trong ba trạng thái:</p>

<div class="mermaid">
stateDiagram-v2
    [*] --&gt; Uncompleted: tạo Future
    Uncompleted --&gt; CompletedWithValue: có giá trị T
    Uncompleted --&gt; CompletedWithError: có lỗi
    CompletedWithValue --&gt; [*]
    CompletedWithError --&gt; [*]
</div>

<ul>
  <li><strong>Uncompleted</strong>: vừa tạo, kết quả chưa có.</li>
  <li><strong>Completed with value</strong>: có giá trị kiểu <code>T</code>.</li>
  <li><strong>Completed with error</strong>: có một lỗi (và <code>StackTrace</code>).</li>
</ul>

<p>Một Future <strong>chỉ hoàn thành một lần</strong> và không quay lại trạng thái cũ. Cần nhiều giá trị theo thời gian (vị trí GPS, tin nhắn) thì đó là việc của <a href="streams.md" target="_blank" rel="noopener">1.3.2 Streams</a>.</p>

<p>Ba điểm về bản chất cần nắm:</p>

<ul>
  <li><strong>Future bắt đầu chạy ngay khi được tạo</strong> (eager). Gọi <code>fetchProfile(7)</code> là request đã được gửi, dù bạn chưa <code>await</code> hay <code>then</code>. Future không phải "công thức chờ được gọi" như một Kotlin <code>Flow</code> lạnh.</li>
  <li><strong>Future không huỷ được.</strong> Không có API <code>cancel()</code> trên Future. Bạn chỉ có thể bỏ qua kết quả của nó (xem <code>timeout</code> ở mục 6).</li>
  <li><strong>Đăng ký callback trên Future đã hoàn thành vẫn chạy bất đồng bộ.</strong> Callback <code>then</code> không bao giờ chạy đồng bộ ngay lúc đăng ký; nó được xếp vào microtask queue.</li>
</ul>

<p>Cách tiêu thụ Future cũ hơn là đăng ký callback: <code>then</code> cho giá trị, <code>catchError</code> cho lỗi, <code>whenComplete</code> cho việc dọn dẹp chạy trong cả hai trường hợp. Mỗi lời gọi trả về một Future <strong>mới</strong>, nên chúng nối thành chuỗi.</p>

<h4>Ví dụ: tải hồ sơ bằng then/catchError</h4>

<p><strong>Bài toán:</strong> gọi API lấy hồ sơ người dùng, hiện tên nếu thành công, báo lỗi nếu server trả 404, và luôn tắt loading.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li><code>fetchProfile(7)</code> trả về ngay một Future đang uncompleted; dòng "chưa có kết quả" in trước.</li>
  <li>Khoảng 300 ms sau, Future hoàn thành: (2a) có giá trị thì <code>then</code> chạy, (2b) có lỗi thì <code>then</code> bị bỏ qua, lỗi đi tiếp xuống <code>catchError</code>.</li>
  <li><code>whenComplete</code> chạy trong cả hai trường hợp.</li>
</ol>

<div class="mermaid">
sequenceDiagram
    participant M as main
    participant F as Future của fetchProfile
    M-&gt;&gt;F: (1) gọi fetchProfile, nhận Future uncompleted
    Note over M: in chưa có kết quả, đăng ký then/catchError/whenComplete
    F--&gt;&gt;M: (2a) có giá trị - then chạy
    F--&gt;&gt;M: (2b) hoặc có lỗi - bỏ qua then, catchError chạy
    Note over M: (3) whenComplete chạy trong cả hai trường hợp
</div>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// profile_then.dart
import 'dart:async';

class UserProfile {
  final int id;
  final String name;
  UserProfile(this.id, this.name);
}

// Giả lập gọi API: id &lt;= 0 thì server trả lỗi.
Future&lt;UserProfile&gt; fetchProfile(int id) {
  return Future.delayed(const Duration(milliseconds: 300), () {
    if (id &lt;= 0) throw StateError('404: không có user $id');
    return UserProfile(id, 'Lan');
  });
}

void main() {
  final future = fetchProfile(7); // (1) Future vừa tạo: uncompleted
  print('Đã gọi fetchProfile, chưa có kết quả');

  future
      .then((profile) =&gt; print('Có dữ liệu: \${profile.name}')) // (2a) completed with value
      .catchError((Object e) =&gt; print('Lỗi: $e')) // (2b) completed with error
      .whenComplete(() =&gt; print('Tắt loading')); // (3) chạy trong cả hai trường hợp

  fetchProfile(0)
      .then((profile) =&gt; print('Có dữ liệu: \${profile.name}'))
      .catchError((Object e) =&gt; print('Lỗi: $e'))
      .whenComplete(() =&gt; print('Tắt loading'));
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>Đã gọi fetchProfile, chưa có kết quả
Có dữ liệu: Lan
Tắt loading
Lỗi: Bad state: 404: không có user 0
Tắt loading</code></pre>

<p>Cách này đúng nhưng khó đọc khi có nhiều bước phụ thuộc nhau: rẽ nhánh, vòng lặp, <code>try/finally</code> đều phải viết lại bằng callback. <code>async</code>/<code>await</code> giải quyết đúng chỗ đó.</p>

<h3>3. async và await</h3>

<p>Ba quy tắc của hàm <code>async</code>:</p>

<ol>
  <li><strong>Hàm <code>async</code> luôn trả về <code>Future</code>.</strong> Với <code>Future&lt;String&gt; f() async { return 'x'; }</code>, <code>return 'x'</code> hoàn thành Future với giá trị <code>'x'</code>; <code>throw</code> trong thân hàm hoàn thành Future với lỗi, <strong>không</strong> ném đồng bộ ra cho người gọi. Hàm không trả gì khai báo <code>Future&lt;void&gt;</code>.</li>
  <li><strong>Thân hàm chạy đồng bộ cho tới <code>await</code> đầu tiên</strong> (từ Dart 2.0). Hàm <code>async</code> không có <code>await</code> nào chạy hết thân hàm ngay lúc được gọi; chỉ có Future kết quả là hoàn thành sau.</li>
  <li><strong><code>await</code> chỉ dùng được trong hàm <code>async</code></strong> (hoặc <code>async*</code>, xem <a href="streams.md" target="_blank" rel="noopener">1.3.2 Streams</a>). <code>await f</code> treo hàm hiện tại cho tới khi <code>f</code> hoàn thành: có giá trị thì biểu thức <code>await</code> trả giá trị đó; có lỗi thì lỗi được <strong>ném lại ngay tại dòng <code>await</code></strong>, nên <code>try</code>/<code>catch</code>/<code>finally</code> bình thường bắt được nó.</li>
</ol>

<p>Điểm cốt lõi là "treo hàm", không phải "chặn thread": hàm lưu lại vị trí, event loop chạy việc khác (vẽ frame, xử lý tap), và khi Future hoàn thành, phần còn lại của hàm chạy tiếp như một microtask.</p>

<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body">Kotlin dev có thể nghĩ hàm <code>async</code> gần giống <code>suspend fun</code>, và <code>await</code> gần giống chỗ gọi một hàm suspend. Khác biệt lớn: Dart không có dispatcher hay thread pool để "chuyển" sang; mọi thứ quay về cùng một thread. Bảng ánh xạ đầy đủ ở <a href="../dart/dart_for_kotlin_devs.md" target="_blank" rel="noopener">1.1.1 Dart for Kotlin Developers</a>.</div></div>

<p><code>await</code> nhận một <code>FutureOr&lt;T&gt;</code>, tức <code>Future&lt;T&gt;</code> hoặc <code>T</code>. <code>await</code> một giá trị không phải Future vẫn treo hàm một nhịp microtask.</p>

<h4>Ví dụ: tải hồ sơ bằng async/await</h4>

<p><strong>Bài toán:</strong> viết lại ví dụ trước bằng <code>async</code>/<code>await</code>, cùng hành vi: loading, thành công, 404, luôn tắt loading.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li>Gọi <code>loadProfileTitle(id)</code>: dòng "Hiện loading" chạy đồng bộ ngay.</li>
  <li><code>await fetchProfile(id)</code> treo hàm, event loop rảnh trong khoảng 300 ms.</li>
  <li>Thành công: hàm <code>return</code>, Future của hàm hoàn thành với chuỗi chào.</li>
  <li>Lỗi: <code>StateError</code> được ném lại tại dòng <code>await</code>, <code>on StateError catch</code> xử lý.</li>
  <li><code>finally</code> luôn chạy trước khi Future của hàm hoàn thành.</li>
</ol>

<div class="mermaid">
sequenceDiagram
    participant M as main
    participant L as loadProfileTitle
    participant API as fetchProfile
    M-&gt;&gt;L: (1) gọi, in Hiện loading
    L-&gt;&gt;API: (2) await fetchProfile - hàm treo
    API--&gt;&gt;L: (3) giá trị UserProfile
    API--&gt;&gt;L: (4) hoặc lỗi StateError ném lại tại await
    Note over L: (5) finally tắt loading
    L--&gt;&gt;M: Future hoàn thành với chuỗi kết quả
</div>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// profile_await.dart (UserProfile và fetchProfile như ví dụ trước)

// ProfileLoader: async/await viết lại cùng luồng .then/.catchError/.whenComplete
Future&lt;String&gt; loadProfileTitle(int id) async {
  print('Hiện loading cho user $id'); // (1) chạy đồng bộ ngay khi được gọi
  try {
    final profile = await fetchProfile(id); // (2) treo hàm, nhường event loop
    return 'Xin chào, \${profile.name}'; // (3) Future của hàm complete với giá trị
  } on StateError catch (e) {
    return 'Không tải được: \${e.message}'; // (4) lỗi của Future được ném lại tại await
  } finally {
    print('Tắt loading cho user $id'); // (5) luôn chạy
  }
}

Future&lt;void&gt; main() async {
  print(await loadProfileTitle(7));
  print(await loadProfileTitle(0));
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>Hiện loading cho user 7
Tắt loading cho user 7
Xin chào, Lan
Hiện loading cho user 0
Tắt loading cho user 0
Không tải được: 404: không có user 0</code></pre>

<p><code>finally</code> in trước kết quả vì nó chạy trước khi Future của <code>loadProfileTitle</code> hoàn thành; <code>main</code> chỉ in sau khi <code>await</code> của nó nhận được giá trị. Cú pháp <code>try</code>/<code>on</code>/<code>catch</code>/<code>finally</code> là của exception đồng bộ, đã học ở <a href="../dart/control_flow_patterns.md" target="_blank" rel="noopener">1.2.3 Control Flow and Patterns</a>; <code>await</code> cho phép dùng lại nguyên nó cho lỗi bất đồng bộ.</p>

<h3>4. Xử lý lỗi bất đồng bộ</h3>

<p>Lỗi bất đồng bộ là lỗi nằm <strong>bên trong một Future</strong>. Nó chỉ đến tay bạn qua một trong hai đường: <code>await</code> (ném lại tại chỗ, bắt bằng <code>try</code>/<code>catch</code>) hoặc callback (<code>catchError</code>, <code>onError</code>). Nếu Future có lỗi mà <strong>không ai</strong> đăng ký nhận, lỗi trở thành <strong>uncaught asynchronous error</strong> và đi lên trình xử lý lỗi toàn cục:</p>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Môi trường</th>
      <th style="padding:8px 12px;text-align:left;">Lỗi bất đồng bộ không ai bắt sẽ</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>dart run</code> (CLI)</td>
      <td style="padding:8px 12px;">In <code>Unhandled exception</code>, dừng chương trình với exit code 255</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Flutter</td>
      <td style="padding:8px 12px;">Chuyển tới <code>PlatformDispatcher.instance.onError</code>; mặc định chỉ in log, app chạy tiếp</td>
    </tr>
  </tbody>
</table>

<p>Điều nguy hiểm trong Flutter: app không crash, nhưng <strong>luồng xử lý của bạn không biết lỗi đã xảy ra</strong>. Màn hình báo "Đã lưu", người dùng tin là đã lưu.</p>

<h4>Ví dụ: quên await khi lưu bản nháp</h4>

<p><strong>Bài toán:</strong> nút "Lưu" gọi <code>saveDraft</code>, bắt lỗi để báo người dùng khi hết dung lượng. Lập trình viên quên <code>await</code>.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li><code>saveDraft(...)</code> được gọi, trả về Future và chạy tới <code>await</code> bên trong nó.</li>
  <li>Không có <code>await</code> ở phía gọi, nên <code>try</code> chạy tiếp ngay dòng <code>print('Đã lưu!')</code> rồi thoát khỏi khối <code>try</code>.</li>
  <li>100 ms sau, Future của <code>saveDraft</code> hoàn thành với lỗi. Lúc này khối <code>try</code>/<code>catch</code> đã kết thúc từ lâu, không có ai nhận lỗi.</li>
  <li>Lỗi thành uncaught asynchronous error.</li>
</ol>

<div class="mermaid">
sequenceDiagram
    participant O as onSavePressed
    participant S as saveDraft
    participant G as Trình xử lý lỗi toàn cục
    O-&gt;&gt;S: (1) gọi saveDraft, không await
    Note over O: (2) in Đã lưu, thoát khối try
    Note over S: (3) 100 ms sau, Future hoàn thành với lỗi
    S-&gt;&gt;G: (4) không ai nhận lỗi - uncaught asynchronous error
</div>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// forgot_await.dart
import 'dart:async';

Future&lt;void&gt; saveDraft(String text) async {
  await Future.delayed(const Duration(milliseconds: 100));
  throw StateError('Hết dung lượng'); // (3) Future của saveDraft hoàn thành với lỗi
}

Future&lt;void&gt; onSavePressed() async {
  try {
    saveDraft('Bản nháp'); // (1) ❌ thiếu await
    print('Đã lưu!'); // (2) in ra dù việc lưu sẽ thất bại
  } catch (e) {
    print('Báo lỗi cho người dùng: $e'); // không bao giờ chạy
  }
}

Future&lt;void&gt; main() async {
  await onSavePressed();
  await Future.delayed(const Duration(milliseconds: 300)); // (4) lỗi không ai nhận, xảy ra trong lúc này
  print('main kết thúc');
}</code></pre>

<p><strong>Kết quả</strong> (đường dẫn file rút gọn):</p>

<pre data-lang="text"><code>Đã lưu!
Unhandled exception:
Bad state: Hết dung lượng
#0      saveDraft (file:///.../forgot_await.dart:6:3)
&lt;asynchronous suspension&gt;</code></pre>

<p>Dòng <code>main kết thúc</code> không bao giờ in: chương trình CLI dừng ở (4) với exit code 255. Sửa bằng <code>await saveDraft('Bản nháp');</code>, khi đó lỗi ném lại tại dòng <code>await</code> và <code>catch</code> chạy.</p>

<div class="callout callout-important"><span class="callout-icon">🔴</span><div class="callout-body">Analyzer <strong>mặc định không cảnh báo</strong> lỗi này: <code>unawaited_futures</code> và <code>discarded_futures</code> không có trong rule set <code>core</code>, <code>recommended</code> (<code>package:lints</code>) hay <code>flutter</code> (<code>flutter_lints</code>). Nên bật thủ công:  \`\`<code>yaml linter:   rules:     - unawaited_futures   # Future không await trong hàm async     - discarded_futures   # Future bị bỏ đi trong hàm đồng bộ (Dart 2.18+) </code>\`<code>  Với file trên, </code>dart analyze<code> báo </code>Missing an 'await' for the 'Future' computed by this expression.<code> </code>discarded_futures<code> báo cả lời gọi cố ý không chờ trong hàm đồng bộ (như </code>openProfile()<code> ở ví dụ thứ tự chạy); khi đó bọc bằng </code>unawaited(...)\`.</div></div>

<h3>5. Chạy song song: Future.wait và record .wait</h3>

<p>Vì Future bắt đầu ngay khi tạo, "song song" trong Dart nghĩa là <strong>khởi động nhiều Future trước, rồi mới chờ</strong>: request mạng chạy cùng lúc (hệ điều hành lo I/O), còn code Dart xử lý kết quả vẫn chạy lần lượt trên một thread. <code>await</code> từng cái một thì Future sau chỉ được <strong>tạo</strong> khi Future trước xong, tổng thời gian là tổng các thời gian; tạo hết rồi chờ chung thì gần bằng việc lâu nhất. Có hai API để chờ chung:</p>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">API</th>
      <th style="padding:8px 12px;text-align:left;">Kiểu</th>
      <th style="padding:8px 12px;text-align:left;">Khi có lỗi</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>Future.wait&lt;T&gt;(Iterable&lt;Future&lt;T&gt;&gt;)</code></td>
      <td style="padding:8px 12px;">Mọi Future cùng kiểu <code>T</code>, trả <code>List&lt;T&gt;</code></td>
      <td style="padding:8px 12px;">Mặc định chờ <strong>tất cả</strong> xong rồi hoàn thành với <strong>lỗi đầu tiên</strong>, các lỗi khác bị bỏ. <code>eagerError: true</code> thì báo lỗi ngay khi lỗi đầu tiên xuất hiện. <code>cleanUp</code> dọn dẹp giá trị của các Future đã thành công</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Record <code>(f1, f2, ...).wait</code> (Dart 3.0)</td>
      <td style="padding:8px 12px;">Mỗi Future một kiểu, trả record cùng hình dạng</td>
      <td style="padding:8px 12px;">Ném <code>ParallelWaitError</code> chứa <strong>cả</strong> giá trị thành công (<code>values</code>) và lỗi của từng Future (<code>errors</code>)</td>
    </tr>
  </tbody>
</table>

<p>Record xem ở <a href="../dart/variables_and_types.md" target="_blank" rel="noopener">1.2.1 Variables and Types</a>, destructuring <code>final (a, b) = ...</code> ở <a href="../dart/control_flow_patterns.md" target="_blank" rel="noopener">1.2.3 Control Flow and Patterns</a>. <code>Iterable&lt;Future&lt;T&gt;&gt;</code> cũng có getter <code>.wait</code>, hành xử như record <code>.wait</code>.</p>

<h4>Ví dụ: màn hình Dashboard tải ba API độc lập</h4>

<p><strong>Bài toán:</strong> Dashboard cần tên người dùng, số tin chưa đọc và danh sách banner. Ba API không phụ thuộc nhau, mỗi API mất khoảng 1 giây.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li>Tạo cả ba Future trong một record: cả ba request bắt đầu gần như cùng lúc.</li>
  <li><code>.wait</code> chờ cả ba hoàn thành.</li>
  <li>Destructuring record ra ba biến có đúng kiểu <code>String</code>, <code>int</code>, <code>List&lt;String&gt;</code>.</li>
</ol>

<div class="mermaid">
sequenceDiagram
    participant D as Dashboard
    participant U as fetchUserName
    participant N as fetchUnreadCount
    participant B as fetchBanners
    D-&gt;&gt;U: (1) tạo Future
    D-&gt;&gt;N: (1) tạo Future
    D-&gt;&gt;B: (1) tạo Future
    Note over D: (2) .wait - một lần chờ chung khoảng 1s
    U--&gt;&gt;D: Lan
    N--&gt;&gt;D: 3
    B--&gt;&gt;D: Sale 11.11
    Note over D: (3) destructuring record ra ba biến
</div>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// dashboard.dart
import 'dart:async';

// Giả lập ba API độc lập của màn hình Dashboard, mỗi API mất ~1 giây.
Future&lt;String&gt; fetchUserName() =&gt;
    Future.delayed(const Duration(seconds: 1), () =&gt; 'Lan');
Future&lt;int&gt; fetchUnreadCount() =&gt;
    Future.delayed(const Duration(seconds: 1), () =&gt; 3);
Future&lt;List&lt;String&gt;&gt; fetchBanners() =&gt;
    Future.delayed(const Duration(seconds: 1), () =&gt; ['Sale 11.11']);

String seconds(Stopwatch sw) =&gt;
    '\${(sw.elapsedMilliseconds / 1000).toStringAsFixed(1)}s';

Future&lt;void&gt; main() async {
  // Cách 1: await tuần tự
  final sw1 = Stopwatch()..start();
  final name1 = await fetchUserName();
  final unread1 = await fetchUnreadCount();
  final banners1 = await fetchBanners();
  print('Tuần tự: $name1, $unread1, $banners1 sau \${seconds(sw1)}');

  // Cách 2: khởi động cả ba rồi chờ chung bằng record .wait (Dart 3)
  final sw2 = Stopwatch()..start();
  final (name2, unread2, banners2) = await (
    fetchUserName(), // (1) cả ba Future được tạo -&gt; cả ba bắt đầu ngay
    fetchUnreadCount(),
    fetchBanners(),
  ).wait; // (2) chờ cả ba
  print('Song song: $name2, $unread2, $banners2 sau \${seconds(sw2)}'); // (3)
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>Tuần tự: Lan, 3, [Sale 11.11] sau 3.0s
Song song: Lan, 3, [Sale 11.11] sau 1.0s</code></pre>

<h4>Ví dụ: Dashboard khi một phần bị lỗi</h4>

<p><strong>Bài toán:</strong> API số tin chưa đọc và API banner cùng lỗi 503. Màn hình vẫn nên hiện tên người dùng, ẩn phần lỗi, thay vì báo lỗi cả trang.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li><code>Future.wait</code> mặc định đợi cả ba xong (khoảng 300 ms, theo Future chậm nhất) rồi chỉ báo lỗi <strong>đầu tiên</strong>; giá trị <code>'Lan'</code> mất. Với <code>eagerError: true</code>, lỗi đến sau khoảng 100 ms.</li>
  <li>Record <code>.wait</code> ném <code>ParallelWaitError</code>.</li>
  <li><code>e.values</code> chứa giá trị của Future thành công, <code>null</code> ở vị trí bị lỗi.</li>
  <li><code>e.errors</code> chứa <code>AsyncError</code> ở vị trí bị lỗi, <code>null</code> ở vị trí thành công.</li>
</ol>

<div class="mermaid">
sequenceDiagram
    participant D as Dashboard
    participant W as Future.wait
    participant RW as record .wait
    D-&gt;&gt;W: (1) chờ ba Future
    W--&gt;&gt;D: (1) chỉ lỗi đầu tiên 503 inbox, mất giá trị Lan
    D-&gt;&gt;RW: chờ lại ba Future
    RW--&gt;&gt;D: (2) ném ParallelWaitError
    Note over D: (3) e.values - Lan, null, null
    Note over D: (4) e.errors - null, lỗi inbox, lỗi banner
</div>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// dashboard_partial.dart
import 'dart:async';

Future&lt;String&gt; fetchUserName() =&gt;
    Future.delayed(const Duration(milliseconds: 300), () =&gt; 'Lan');
Future&lt;int&gt; fetchUnreadCount() =&gt;
    Future.delayed(const Duration(milliseconds: 100), () =&gt; throw StateError('503 inbox'));
Future&lt;List&lt;String&gt;&gt; fetchBanners() =&gt;
    Future.delayed(const Duration(milliseconds: 200), () =&gt; throw StateError('503 banner'));

Future&lt;void&gt; main() async {
  final sw = Stopwatch()..start();
  // (1) Future.wait: mặc định chờ tất cả xong rồi báo lỗi ĐẦU TIÊN, các lỗi khác bị bỏ.
  try {
    await Future.wait&lt;Object&gt;([fetchUserName(), fetchUnreadCount(), fetchBanners()]);
  } catch (e) {
    print('Future.wait: $e sau \${sw.elapsedMilliseconds ~/ 100 * 100}ms');
  }

  sw.reset();
  try {
    await Future.wait&lt;Object&gt;(
      [fetchUserName(), fetchUnreadCount(), fetchBanners()],
      eagerError: true,
    );
  } catch (e) {
    print('eagerError: $e sau \${sw.elapsedMilliseconds ~/ 100 * 100}ms');
  }

  // Record .wait: lấy được phần thành công qua ParallelWaitError.
  try {
    final (name, unread, banners) =
        await (fetchUserName(), fetchUnreadCount(), fetchBanners()).wait;
    print('$name $unread $banners');
  } on ParallelWaitError&lt;(String?, int?, List&lt;String&gt;?),
      (AsyncError?, AsyncError?, AsyncError?)&gt; catch (e) { // (2)
    final (name, unread, banners) = e.values; // (3) giá trị của Future thành công, null nếu lỗi
    final (_, unreadError, bannerError) = e.errors; // (4) lỗi của từng Future, null nếu thành công
    print('Tên: $name, chưa đọc: \${unread ?? '-'}, banner: \${banners ?? 'ẩn'}');
    print('Lỗi inbox: \${unreadError?.error}');
    print('Lỗi banner: \${bannerError?.error}');
  }
  await Future.delayed(const Duration(milliseconds: 400));
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>Future.wait: Bad state: 503 inbox sau 300ms
eagerError: Bad state: 503 inbox sau 100ms
Tên: Lan, chưa đọc: -, banner: ẩn
Lỗi inbox: Bad state: 503 inbox
Lỗi banner: Bad state: 503 banner</code></pre>

<p>Kiểu trong <code>on ParallelWaitError&lt;...&gt;</code> phải khớp đúng hình dạng record: values là các kiểu gốc thêm <code>?</code>, errors là <code>AsyncError?</code>.</p>

<h3>6. Giới hạn thời gian và trì hoãn: timeout, Future.delayed</h3>

<p><code>future.timeout(duration)</code> trả về một Future <strong>mới</strong>: nếu <code>future</code> không xong trong <code>duration</code> thì Future mới hoàn thành với <code>TimeoutException</code>, hoặc với giá trị từ <code>onTimeout</code> nếu bạn truyền vào. Điều quan trọng: <strong>Future gốc không bị huỷ</strong>. Request vẫn chạy tới cùng, kết quả của nó chỉ bị bỏ qua.</p>

<p><code>Future.delayed(duration, [computation])</code> tạo một Future hoàn thành sau <code>duration</code>, dùng timer nên nằm trong event queue. <code>await Future.delayed(...)</code> là cách "ngủ" mà không chặn event loop, tương đương <code>delay()</code> của Kotlin coroutine.</p>

<h4>Ví dụ: tỷ giá chậm, dùng giá trị trong cache</h4>

<p><strong>Bài toán:</strong> API tỷ giá đôi khi mất 2 giây. Màn hình thanh toán chỉ chờ tối đa 1 giây, quá thì báo hết thời gian hoặc dùng tỷ giá cache.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li><code>timeout</code> không có <code>onTimeout</code>: sau 1 giây ném <code>TimeoutException</code>, <code>catch</code> xử lý.</li>
  <li><code>timeout</code> có <code>onTimeout</code>: sau 1 giây dùng giá trị dự phòng.</li>
  <li>Ở cả hai lần, Future gốc vẫn chạy tiếp và in dòng "server vẫn trả lời" sau 2 giây.</li>
</ol>

<div class="mermaid">
sequenceDiagram
    participant C as Màn hình thanh toán
    participant T as Future của timeout
    participant API as fetchExchangeRate
    C-&gt;&gt;T: await fetchExchangeRate().timeout 1s
    T-&gt;&gt;API: Future gốc bắt đầu chạy
    T--&gt;&gt;C: (1) sau 1s - TimeoutException, hoặc (2) giá trị từ onTimeout
    Note over API: (3) vẫn chạy tiếp, trả lời sau 2s, kết quả bị bỏ qua
</div>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// exchange_rate_timeout.dart
import 'dart:async';

// Giả lập API tỷ giá chậm: mất 2 giây mới trả lời.
Future&lt;double&gt; fetchExchangeRate() async {
  await Future.delayed(const Duration(seconds: 2));
  print('API tỷ giá: server vẫn trả lời sau 2s'); // (3) timeout không huỷ được việc này
  return 25400;
}

Future&lt;void&gt; main() async {
  // (1) timeout không có onTimeout: ném TimeoutException
  try {
    final rate = await fetchExchangeRate().timeout(const Duration(seconds: 1));
    print('Tỷ giá: $rate');
  } on TimeoutException catch (e) {
    print('Hết thời gian chờ: \${e.duration}');
  }

  // (2) timeout có onTimeout: dùng giá trị dự phòng (vd tỷ giá trong cache)
  final rate = await fetchExchangeRate().timeout(
    const Duration(seconds: 1),
    onTimeout: () =&gt; 25000,
  );
  print('Tỷ giá hiển thị: $rate (từ cache)');

  await Future.delayed(const Duration(seconds: 2));
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>Hết thời gian chờ: 0:00:01.000000
API tỷ giá: server vẫn trả lời sau 2s
Tỷ giá hiển thị: 25000.0 (từ cache)
API tỷ giá: server vẫn trả lời sau 2s</code></pre>

<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body">Với thao tác có side effect (ghi dữ liệu, thanh toán), timeout ở client <strong>không</strong> có nghĩa là thao tác không xảy ra. Server có thể vẫn xử lý xong. Đừng tự động gửi lại một thao tác không idempotent chỉ vì timeout.</div></div>

<p>Muốn dừng công việc bên dưới, API đó phải tự hỗ trợ huỷ (như <code>CancelToken</code> của Dio, 5.1.1 REST APIs with http and Dio (chưa có bài)); <code>CancelableOperation</code> của <code>package:async</code> chỉ giúp ngừng xử lý kết quả.</p>

<h3>7. Completer: biến callback thành Future</h3>

<p>Hàm <code>async</code> tạo Future cho bạn. Nhưng có nguồn kết quả không phải hàm async: SDK bên thứ ba chỉ có callback, listener của platform, một sự kiện xảy ra một lần. <code>Completer&lt;T&gt;</code> là "tay cầm" để bạn tự hoàn thành một Future:</p>

<ul>
  <li><code>completer.future</code>: Future trao cho bên ngoài <code>await</code>.</li>
  <li><code>completer.complete(value)</code> hoặc <code>completer.completeError(error)</code>: hoàn thành Future đó.</li>
  <li>Gọi <code>complete</code>/<code>completeError</code> lần thứ hai ném <code>StateError</code> (<code>Future already completed</code>). Dùng <code>completer.isCompleted</code> để chặn khi nguồn có thể gọi callback nhiều lần.</li>
</ul>

<h4>Ví dụ: bọc SDK định vị chỉ có callback</h4>

<p><strong>Bài toán:</strong> SDK định vị cũ có <code>requestLocation(onSuccess, onError)</code>, và có lỗi là đôi khi gọi <code>onSuccess</code> hai lần. Repository muốn cung cấp <code>Future&lt;(double, double)&gt;</code> cho phần còn lại của app.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li>Tạo <code>Completer</code>, Future của nó đang uncompleted.</li>
  <li>Đăng ký callback với SDK, trả <code>completer.future</code> ngay cho người gọi.</li>
  <li>Callback tới: <code>complete</code> với toạ độ, người gọi đang <code>await</code> nhận được giá trị.</li>
  <li>Callback tới lần hai: <code>isCompleted</code> đã là <code>true</code>, bỏ qua thay vì ném <code>StateError</code>.</li>
  <li>Người gọi dùng toạ độ.</li>
</ol>

<div class="mermaid">
sequenceDiagram
    participant C as Caller
    participant R as currentLocation
    participant SDK as LegacyLocationClient
    C-&gt;&gt;R: gọi
    Note over R: (1) tạo Completer
    R-&gt;&gt;SDK: (2) requestLocation với callback
    R--&gt;&gt;C: (2) trả completer.future
    SDK-&gt;&gt;R: (3) onSuccess - complete
    R--&gt;&gt;C: Future có giá trị
    SDK-&gt;&gt;R: (4) onSuccess lần hai - bỏ qua
    Note over C: (5) dùng toạ độ
</div>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// location_completer.dart
import 'dart:async';

// SDK cũ chỉ có callback (giả lập SDK định vị của bên thứ ba).
class LegacyLocationClient {
  void requestLocation({
    required void Function(double lat, double lng) onSuccess,
    required void Function(String reason) onError,
  }) {
    Timer(const Duration(milliseconds: 200), () {
      onSuccess(21.0285, 105.8542);
      onSuccess(21.0286, 105.8543); // SDK lỗi: gọi callback hai lần
    });
  }
}

// LocationRepository: bọc callback thành Future
Future&lt;(double, double)&gt; currentLocation(LegacyLocationClient client) {
  final completer = Completer&lt;(double, double)&gt;(); // (1) tạo Completer, Future đang uncompleted
  client.requestLocation( // (2) đăng ký callback rồi trả Future ngay
    onSuccess: (lat, lng) {
      if (completer.isCompleted) return; // (4) chặn lần gọi thứ hai
      completer.complete((lat, lng)); // (3) callback tới -&gt; complete Future
    },
    onError: (reason) {
      if (completer.isCompleted) return;
      completer.completeError(StateError(reason));
    },
  );
  return completer.future; // (2)
}

Future&lt;void&gt; main() async {
  final (lat, lng) = await currentLocation(LegacyLocationClient()); // (5)
  print('Vị trí: $lat, $lng');

  final c = Completer&lt;int&gt;();
  c.complete(1);
  try {
    c.complete(2);
  } on StateError catch (e) {
    print('Gọi complete lần hai: $e');
  }
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>Vị trí: 21.0285, 105.8542
Gọi complete lần hai: Bad state: Future already completed</code></pre>

<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body">Nguồn gọi callback <strong>nhiều lần có chủ đích</strong> (cập nhật vị trí liên tục, tiến độ tải) không hợp với Completer, vì Future chỉ có một giá trị. Dùng <code>StreamController</code> ở <a href="streams.md" target="_blank" rel="noopener">1.3.2 Streams</a>.</div></div>

<h3>8. unawaited: không chờ một cách có chủ đích</h3>

<p>Có việc bạn thật sự không muốn chờ: gửi analytics, ghi cache nền, prefetch ảnh. Bỏ <code>await</code> thì mất cả kết quả <strong>lẫn chỗ nhận lỗi</strong>. <code>dart:async</code> có hai công cụ để nói rõ ý định:</p>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Cách viết</th>
      <th style="padding:8px 12px;text-align:left;">Ý nghĩa</th>
      <th style="padding:8px 12px;text-align:left;">Lỗi của Future</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>unawaited(future)</code></td>
      <td style="padding:8px 12px;">"Tôi cố ý không chờ." Tắt cảnh báo <code>unawaited_futures</code></td>
      <td style="padding:8px 12px;"><strong>Vẫn được báo</strong> như uncaught asynchronous error</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>future.ignore()</code></td>
      <td style="padding:8px 12px;">"Kết quả không còn quan trọng, kể cả lỗi."</td>
      <td style="padding:8px 12px;">Bị <strong>nuốt hoàn toàn</strong>, không báo ở đâu</td>
    </tr>
  </tbody>
</table>

<p>Vì <code>unawaited</code> không bắt lỗi, mẫu an toàn là: <strong>xử lý lỗi bên trong</strong> việc chạy nền, rồi mới <code>unawaited</code> nó. <code>try</code>/<code>catch</code> bao quanh lời gọi <code>unawaited(...)</code> không bắt được gì, cùng lý do với mục 4.</p>

<h4>Ví dụ: gửi analytics khi bấm thanh toán</h4>

<p><strong>Bài toán:</strong> bấm "Thanh toán" thì mở màn hình thanh toán ngay, đồng thời gửi một event analytics. Server analytics lỗi không được làm phiền người dùng, nhưng cũng không được biến mất không dấu vết.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li><code>logEventSafely</code> bọc <code>logEvent</code> trong <code>try</code>/<code>catch</code>, nên Future của nó không bao giờ hoàn thành với lỗi.</li>
  <li><code>unawaited(...)</code> khởi động việc gửi log mà không chờ.</li>
  <li>Màn hình thanh toán mở ngay; khoảng 100 ms sau, lỗi analytics được ghi nhận ở (1).</li>
</ol>

<div class="mermaid">
sequenceDiagram
    participant C as onCheckoutPressed
    participant S as logEventSafely
    participant A as logEvent
    C-&gt;&gt;S: (2) unawaited - khởi động, không chờ
    S-&gt;&gt;A: await logEvent
    Note over C: (3) mở màn hình thanh toán ngay
    A--&gt;&gt;S: 100 ms sau - lỗi analytics 500
    Note over S: (1) catch bên trong ghi nhận lỗi
</div>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// checkout_analytics.dart
import 'dart:async';

// AnalyticsService: gửi log, server analytics đôi khi lỗi.
Future&lt;void&gt; logEvent(String name) async {
  await Future.delayed(const Duration(milliseconds: 100));
  throw StateError('analytics 500 khi gửi $name');
}

// (1) Bọc an toàn: tự bắt lỗi bên trong rồi mới bỏ qua Future
Future&lt;void&gt; logEventSafely(String name) async {
  try {
    await logEvent(name);
  } catch (e) {
    print('Ghi nhận lỗi analytics, không làm phiền người dùng: $e');
  }
}

Future&lt;void&gt; onCheckoutPressed() async {
  unawaited(logEventSafely('checkout_tap')); // (2) không chờ, nhưng lỗi đã có chỗ xử lý
  print('Mở màn hình thanh toán ngay'); // (3)
}

Future&lt;void&gt; main() async {
  await onCheckoutPressed();
  await Future.delayed(const Duration(milliseconds: 300));
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>Mở màn hình thanh toán ngay
Ghi nhận lỗi analytics, không làm phiền người dùng: Bad state: analytics 500 khi gửi checkout_tap</code></pre>

<p>Nếu viết thẳng <code>unawaited(logEvent('checkout_tap'))</code>, chương trình CLI in <code>Unhandled exception: Bad state: analytics 500 khi gửi checkout_tap</code> và dừng với exit code 255; trên Flutter, lỗi rơi vào <code>PlatformDispatcher.instance.onError</code>.</p>

<h3>9. Async không phải đa luồng</h3>

<p><code>async</code>/<code>await</code> giúp <strong>chờ</strong> mà không chặn thread. Nó không làm cho <strong>tính toán</strong> chạy ở thread khác. Thân hàm <code>async</code> vẫn chạy trên cùng một thread của isolate; giữa hai <code>await</code>, nó là code đồng bộ và chặn mọi thứ như bất kỳ code đồng bộ nào.</p>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Loại việc</th>
      <th style="padding:8px 12px;text-align:left;">Bản chất</th>
      <th style="padding:8px 12px;text-align:left;">Công cụ</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">I/O-bound: gọi API, đọc file, chờ timer</td>
      <td style="padding:8px 12px;">Thread rảnh trong lúc hệ điều hành làm việc</td>
      <td style="padding:8px 12px;"><code>Future</code>, <code>async</code>/<code>await</code> (bài này)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">CPU-bound: parse JSON vài MB, nén ảnh, mã hoá</td>
      <td style="padding:8px 12px;">Thread bận tính toán liên tục</td>
      <td style="padding:8px 12px;">Isolate, xem <a href="isolates.md" target="_blank" rel="noopener">1.3.3 Isolates</a></td>
    </tr>
  </tbody>
</table>

<h4>Ví dụ: tính checksum trong hàm async vẫn chặn timer</h4>

<p><strong>Bài toán:</strong> tính checksum cho một file lớn (giả lập bằng vòng lặp nặng) trong một hàm <code>async</code>, với hy vọng nó "chạy nền". Đồng thời có một timer 16 ms đại diện cho frame tiếp theo.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li>Đặt timer 16 ms (một event trong tương lai).</li>
  <li>Gọi <code>computeChecksum</code>: thân hàm <code>async</code> chạy đồng bộ, vòng lặp không có <code>await</code> nào.</li>
  <li>Suốt vòng lặp, event loop không được quay lại, timer không chạy được dù đã quá hạn.</li>
  <li>Vòng lặp xong, phần sau <code>await computeChecksum(...)</code> là microtask nên chạy <strong>trước</strong> timer; timer chạy cuối cùng, trễ hơn một giây.</li>
</ol>

<div class="mermaid">
sequenceDiagram
    participant M as main
    participant EL as Event loop
    M-&gt;&gt;EL: (1) đặt timer 16 ms vào event queue
    Note over M: (2) gọi computeChecksum, thân hàm chạy đồng bộ
    Note over M,EL: (3) vòng lặp hơn 1s, event loop đứng yên, timer quá hạn
    M-&gt;&gt;M: (4) phần sau await chạy trước, in checksum
    EL-&gt;&gt;M: (4) timer 16 ms chạy cuối cùng
</div>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// checksum_blocking.dart
import 'dart:async';

// Tính tổng kiểm tra cho một file lớn (giả lập bằng vòng lặp nặng).
Future&lt;int&gt; computeChecksum(int size) async {
  var sum = 0;
  for (var i = 0; i &lt; size; i++) {
    sum = (sum + i * 31) % 1000000007; // (3) CPU chạy liên tục, không có await nào
  }
  return sum;
}

Future&lt;void&gt; main() async {
  final sw = Stopwatch()..start();
  // (1) Giả lập frame/animation cần chạy sau 16ms.
  Timer(const Duration(milliseconds: 16), () {
    print('Timer 16ms thực tế chạy sau \${sw.elapsedMilliseconds ~/ 100 * 100}+ms'); // (4)
  });
  final checksum = await computeChecksum(300000000); // (2) thân hàm chạy đồng bộ ngay
  print('checksum = $checksum sau \${sw.elapsedMilliseconds ~/ 100 * 100}+ms'); // (4)
}</code></pre>

<p><strong>Kết quả</strong> (số mili giây tuỳ máy):</p>

<pre data-lang="text"><code>checksum = 585000105 sau 1100+ms
Timer 16ms thực tế chạy sau 1100+ms</code></pre>

<p>Trên Flutter, "timer trễ hơn một giây" chính là UI đứng hình hơn một giây. <code>async</code> không giúp gì; việc này phải chuyển sang isolate khác (xem <a href="isolates.md" target="_blank" rel="noopener">1.3.3 Isolates</a>).</p>

<h2>Deep Dive: mỗi cách tạo Future đi vào hàng đợi nào</h2>

<p>Biết constructor nào dùng hàng đợi nào giúp đọc được thứ tự chạy của code thư viện và test:</p>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Cách tạo</th>
      <th style="padding:8px 12px;text-align:left;">Chạy computation khi nào</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>Future.sync(f)</code></td>
      <td style="padding:8px 12px;">Ngay lập tức, đồng bộ</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Hàm <code>async</code></td>
      <td style="padding:8px 12px;">Thân hàm chạy đồng bộ tới <code>await</code> đầu tiên</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>Future.microtask(f)</code>, <code>scheduleMicrotask(f)</code></td>
      <td style="padding:8px 12px;">Microtask queue</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>Future.value(v)</code></td>
      <td style="padding:8px 12px;">Giá trị có sẵn; Future hoàn thành qua microtask</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>Future(f)</code></td>
      <td style="padding:8px 12px;">Event queue (dùng <code>Timer.run</code>)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>Future.delayed(d, f)</code></td>
      <td style="padding:8px 12px;">Event queue, sau ít nhất <code>d</code></td>
    </tr>
  </tbody>
</table>

<pre data-lang="dart"><code>// future_constructors.dart
import 'dart:async';

Future&lt;int&gt; readBadge() async {
  print('readBadge: thân hàm chạy hết, không có await');
  return 3;
}

void main() {
  Future(() =&gt; print('Future(): event queue'));
  Future.delayed(Duration.zero, () =&gt; print('Future.delayed(zero): event queue'));
  Future.microtask(() =&gt; print('Future.microtask: microtask queue'));
  Future.sync(() =&gt; print('Future.sync: chạy ngay'));
  readBadge().then((n) =&gt; print('readBadge xong: $n (callback ở microtask)'));
  print('main: hết code đồng bộ');
}</code></pre>

<pre data-lang="text"><code>Future.sync: chạy ngay
readBadge: thân hàm chạy hết, không có await
main: hết code đồng bộ
Future.microtask: microtask queue
readBadge xong: 3 (callback ở microtask)
Future(): event queue
Future.delayed(zero): event queue</code></pre>

<p><strong>Microtask có thể bỏ đói event queue.</strong> Vì event loop chạy <em>hết</em> microtask trước khi lấy event, một chuỗi microtask tự xếp microtask mới sẽ giữ event loop mãi ở bước 2. Trong đoạn dưới, timer "chạy ngay" phải đợi một triệu microtask:</p>

<pre data-lang="dart"><code>// microtask_starvation.dart
import 'dart:async';

void main() {
  Timer.run(() =&gt; print('event: timer (đáng lẽ chạy ngay)'));
  var count = 0;
  void pump() {
    count++;
    if (count &lt; 1000000) {
      scheduleMicrotask(pump); // microtask tự lên lịch microtask mới
    } else {
      print('microtask: đã chạy $count microtask liên tiếp');
    }
  }
  scheduleMicrotask(pump);
}</code></pre>

<pre data-lang="text"><code>microtask: đã chạy 1000000 microtask liên tiếp
event: timer (đáng lẽ chạy ngay)</code></pre>

<p>Trên Flutter, đó là không vẽ được frame nào. Việc có thể chờ nên đi qua event queue (<code>Future</code>, <code>Future.delayed</code>); microtask chỉ dành cho việc thật ngắn phải chạy trước event kế tiếp.</p>

<h2>Ví dụ thực tế</h2>

<p>Trên UI, Flutter có widget <code>FutureBuilder</code> vẽ lại theo ba trạng thái của Future; widget và vòng đời thuộc 3.1.1 Stateless and Stateful Widgets (chưa có bài). Điều cần mang theo từ bài này: tạo Future <strong>một lần</strong> (ví dụ trong <code>initState</code>), không tạo trong <code>build</code>, vì Future bắt đầu chạy ngay khi được tạo còn <code>build</code> chạy nhiều lần.</p>

<h3>Ví dụ: thử lại request với backoff tăng dần</h3>

<p><strong>Bài toán:</strong> tải danh sách sản phẩm trên mạng di động chập chờn. Mỗi lần thử có giới hạn 2 giây; lỗi thì chờ một khoảng tăng dần (200 ms, 400 ms, ...) rồi thử lại, tối đa 3 lần; hết lượt thì báo lỗi cho người dùng. Đây là request đọc (GET), gọi lại nhiều lần vẫn an toàn.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li>Mỗi lần thử: <code>await action().timeout(timeout)</code>.</li>
  <li>Lỗi là <code>Exception</code> (<code>TimeoutException</code>, lỗi mạng) thì xử lý; <code>Error</code> (lỗi lập trình) đi thẳng ra ngoài.</li>
  <li>Lần cuối vẫn lỗi: <code>rethrow</code> cho caller.</li>
  <li>Chưa hết lượt: <code>await Future.delayed(delay)</code>, event loop rảnh trong lúc chờ.</li>
  <li>Nhân đôi <code>delay</code> cho lần sau.</li>
  <li>Caller chỉ thấy một <code>Future&lt;List&lt;String&gt;&gt;</code>, không biết bên trong đã thử mấy lần.</li>
</ol>

<div class="mermaid">
flowchart TD
    A["(1) await action().timeout"] --&gt;|"thành công"| OK["trả kết quả"]
    A --&gt;|"(2) Exception"| B{"(3) hết lượt?"}
    B --&gt;|"có"| R["rethrow cho caller"]
    B --&gt;|"chưa"| C["(4) await Future.delayed"]
    C --&gt; D["(5) delay *= 2"]
    D --&gt; A
</div>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// retry.dart
import 'dart:async';

// retry: thử lại một thao tác async với backoff tăng dần.
Future&lt;T&gt; retry&lt;T&gt;(
  Future&lt;T&gt; Function() action, {
  int maxAttempts = 3,
  Duration timeout = const Duration(seconds: 2),
  Duration initialDelay = const Duration(milliseconds: 200),
}) async {
  var delay = initialDelay;
  for (var attempt = 1; ; attempt++) {
    try {
      return await action().timeout(timeout); // (1) mỗi lần thử có giới hạn thời gian
    } on Exception catch (e) {
      // (2) TimeoutException, lỗi mạng... đều là Exception
      if (attempt == maxAttempts) rethrow; // (3) hết lượt: ném lỗi cho caller
      print('Lần $attempt lỗi ($e), thử lại sau \${delay.inMilliseconds}ms');
      await Future.delayed(delay); // (4) chờ mà không chặn event loop
      delay *= 2; // (5) backoff: 200ms, 400ms, ...
    }
  }
}

// Giả lập API danh sách sản phẩm (GET, gọi lại nhiều lần vẫn an toàn): hai lần đầu lỗi mạng.
var _calls = 0;
Future&lt;List&lt;String&gt;&gt; fetchProducts() async {
  _calls++;
  await Future.delayed(const Duration(milliseconds: 100));
  if (_calls &lt; 3) throw const SocketLikeException('mất kết nối');
  return ['Áo thun', 'Quần jean', 'Giày chạy bộ'];
}

class SocketLikeException implements Exception {
  final String message;
  const SocketLikeException(this.message);
  @override
  String toString() =&gt; 'SocketLikeException: $message';
}

Future&lt;void&gt; main() async {
  try {
    final products = await retry(fetchProducts); // (6)
    print('Đã tải \${products.length} sản phẩm sau $_calls lần gọi');
  } on Exception catch (e) {
    print('Báo lỗi cho người dùng: $e');
  }
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>Lần 1 lỗi (SocketLikeException: mất kết nối), thử lại sau 200ms
Lần 2 lỗi (SocketLikeException: mất kết nối), thử lại sau 400ms
Đã tải 3 sản phẩm sau 3 lần gọi</code></pre>

<p>Để ý <code>return await action()...</code> bên trong <code>try</code>: thiếu <code>await</code> ở đây thì lỗi của Future không được ném lại trong <code>try</code>, và <code>catch</code> không bao giờ chạy. Đây là trường hợp <code>return await</code> khác <code>return</code>.</p>

<h2>So sánh với các cách tiếp cận khác</h2>

<p>Người đọc biết Kotlin coroutine thường ánh xạ sang Dart như sau (bảng đầy đủ ở <a href="../dart/dart_for_kotlin_devs.md" target="_blank" rel="noopener">1.1.1 Dart for Kotlin Developers</a>):</p>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Kotlin coroutine</th>
      <th style="padding:8px 12px;text-align:left;">Dart</th>
      <th style="padding:8px 12px;text-align:left;">Khác biệt cần nhớ</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>suspend fun</code></td>
      <td style="padding:8px 12px;">Hàm <code>async</code> trả <code>Future</code></td>
      <td style="padding:8px 12px;">Dart không có dispatcher; mọi thứ chạy trên thread của isolate</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>async { }</code> / <code>Deferred&lt;T&gt;</code></td>
      <td style="padding:8px 12px;"><code>Future&lt;T&gt;</code></td>
      <td style="padding:8px 12px;">Future luôn bắt đầu ngay (eager)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>awaitAll</code></td>
      <td style="padding:8px 12px;"><code>Future.wait</code>, record <code>.wait</code></td>
      <td style="padding:8px 12px;"></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>withTimeout</code></td>
      <td style="padding:8px 12px;"><code>.timeout</code></td>
      <td style="padding:8px 12px;">Kotlin huỷ coroutine; Dart <strong>không</strong> huỷ Future gốc</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>delay</code></td>
      <td style="padding:8px 12px;"><code>Future.delayed</code></td>
      <td style="padding:8px 12px;"></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>CompletableDeferred</code></td>
      <td style="padding:8px 12px;"><code>Completer</code></td>
      <td style="padding:8px 12px;"></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>scope.launch { }</code> không chờ</td>
      <td style="padding:8px 12px;"><code>unawaited(...)</code></td>
      <td style="padding:8px 12px;">Dart không có structured concurrency: không có scope tự huỷ việc con khi màn hình đóng</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>Dispatchers.Default</code> cho việc nặng</td>
      <td style="padding:8px 12px;">Isolate</td>
      <td style="padding:8px 12px;">Isolate không chia sẻ bộ nhớ, xem <a href="isolates.md" target="_blank" rel="noopener">1.3.3 Isolates</a></td>
    </tr>
  </tbody>
</table>

<p>So với <code>then</code>: <code>async</code>/<code>await</code> dùng lại được <code>if</code>, <code>for</code>, <code>try</code>/<code>finally</code>; <code>then</code> vẫn tiện khi chỉ cần biến đổi một Future mà không muốn hàm hiện tại thành <code>async</code>.</p>

<h2>Khi nào nên và không nên dùng</h2>

<p><strong>Nên dùng <code>Future</code> + <code>async</code>/<code>await</code> khi:</strong></p>

<ul>
  <li>Thao tác trả về <strong>một</strong> kết quả trong tương lai: request HTTP, đọc/ghi file, truy vấn database, hộp thoại chờ người dùng chọn.</li>
  <li>Cần chờ nhiều thao tác độc lập: khởi động hết rồi <code>wait</code>.</li>
  <li>Cần bọc một API callback chỉ gọi lại một lần: <code>Completer</code>.</li>
</ul>

<p><strong>Không nên, hoặc không đủ, khi:</strong></p>

<ul>
  <li><strong>Nhiều giá trị theo thời gian</strong> (vị trí, tin nhắn, tiến độ): dùng Stream, <a href="streams.md" target="_blank" rel="noopener">1.3.2 Streams</a>.</li>
  <li><strong>Tính toán nặng trên CPU</strong>: <code>async</code> không giúp; dùng isolate, <a href="isolates.md" target="_blank" rel="noopener">1.3.3 Isolates</a>.</li>
  <li><strong>Cần huỷ công việc giữa chừng</strong>: Future không có cơ chế huỷ; cần API hỗ trợ huỷ (<code>CancelToken</code>, <code>CancelableOperation</code>), hoặc Stream subscription (có <code>cancel()</code>).</li>
  <li><strong>Hàm không có gì để chờ</strong>: đừng gắn <code>async</code> cho "chắc ăn"; nó biến kết quả thành Future và buộc mọi caller phải <code>await</code>.</li>
</ul>

<h2>Sai lầm thường gặp</h2>

<p><strong>1. Quên <code>await</code>, lỗi thoát khỏi <code>try</code>/<code>catch</code>.</strong> Đã phân tích ở mục 4: màn hình báo thành công, lỗi đi lên trình xử lý toàn cục. Sửa: thêm <code>await</code>; bật lint <code>unawaited_futures</code> và <code>discarded_futures</code> để analyzer bắt.</p>

<p><strong>2. <code>await</code> tuần tự các việc độc lập.</strong></p>

<pre data-lang="dart"><code>// ❌ chờ nối tiếp: tổng thời gian của mọi ảnh
for (final photo in photos) {
  await uploadPhoto(photo);
}

// ✅ khởi động tất cả, chờ chung: khoảng thời gian của ảnh chậm nhất
await Future.wait(photos.map(uploadPhoto));</code></pre>

<p>Việc sau cần kết quả việc trước (lấy <code>userId</code> rồi mới lấy đơn hàng) thì bắt buộc tuần tự. Danh sách rất dài thì chia nhóm (batch), đừng khởi động hàng nghìn request cùng lúc.</p>

<p><strong>3. Tưởng <code>Future.wait</code> dừng ngay khi có lỗi, hoặc trả về đủ lỗi.</strong> Mặc định nó đợi tất cả rồi chỉ báo lỗi đầu tiên (mục 5). Dùng <code>eagerError: true</code> hoặc record <code>.wait</code> tuỳ nhu cầu.</p>

<p><strong>4. Tưởng <code>timeout</code> huỷ request.</strong> Nó chỉ ngừng <em>chờ</em>. Request vẫn chạy và có thể đã ghi dữ liệu ở server. Xem mục 6.</p>

<p><strong>5. Đặt phép tính nặng trong hàm <code>async</code> và tin là nó chạy nền.</strong> UI vẫn giật. Xem mục 9 và chuyển sang <a href="isolates.md" target="_blank" rel="noopener">1.3.3 Isolates</a>.</p>

<p><strong>6. Dùng <code>unawaited</code> hoặc <code>.ignore()</code> để "dập" cảnh báo.</strong> <code>unawaited</code> không bắt lỗi, <code>.ignore()</code> nuốt lỗi khỏi log (mục 8). Chỉ dùng khi lỗi đã được xử lý bên trong, hoặc thật sự không quan trọng.</p>

<p><strong>7. Dùng trạng thái cũ sau <code>await</code> trong Flutter.</strong> Trong lúc hàm treo, người dùng có thể đã rời màn hình; gọi <code>setState</code> hay dùng <code>BuildContext</code> của màn hình đã đóng sau <code>await</code> sẽ báo lỗi. Code Flutter (không chạy bằng <code>dart run</code>):</p>

<pre data-lang="dart"><code>// Code Flutter: _ProfileScreenState
Future&lt;void&gt; _onRefresh() async {
  final profile = await repository.fetchProfile(userId);
  if (!mounted) return; // màn hình đã bị dispose trong lúc chờ
  setState(() =&gt; _profile = profile);
}</code></pre>

<p>Lint <code>use_build_context_synchronously</code> (có trong bộ <code>flutter</code> của <code>flutter_lints</code>) cảnh báo việc dùng <code>BuildContext</code> sau <code>await</code> mà không kiểm tra.</p>

<p><strong>8. Gọi <code>complete</code> hai lần trên một <code>Completer</code>.</strong> Ném <code>StateError</code>; kiểm tra <code>isCompleted</code> (mục 7).</p>

<h2>Lịch sử phát triển</h2>

<ul>
  <li><strong>Dart 1.0 (2013)</strong>: <code>Future</code> và <code>Stream</code> đã có trong <code>dart:async</code>, nhưng chỉ tiêu thụ được bằng callback (<code>then</code>, <code>catchError</code>). Code nhiều bước nhanh chóng thành chuỗi callback khó đọc và khó xử lý lỗi.</li>
  <li><strong>Dart 1.9 (3/2015)</strong>: thêm <code>async</code>/<code>await</code> (cùng <code>async*</code>, <code>sync*</code>, <code>await for</code>). Mục tiêu: viết code bất đồng bộ bằng <code>if</code>, vòng lặp, <code>try</code>/<code>catch</code> quen thuộc, xây trên API Future có sẵn.</li>
  <li><strong>Dart 2.0 (8/2018)</strong>: hàm <code>async</code> đổi sang <strong>chạy đồng bộ tới <code>await</code> đầu tiên</strong>, thay vì quay về event loop một lần trước khi chạy thân hàm (issue 30345). Lý do: bước hoãn đó gây bất ngờ và tốn thêm một nhịp. Dart 2 cũng đưa vào sound type system, nên <code>Future&lt;T&gt;</code> và <code>FutureOr&lt;T&gt;</code> được kiểm tra kiểu đầy đủ.</li>
  <li><strong>Dart 2.12 (2021)</strong>: null safety. <code>Future&lt;String&gt;</code> và <code>Future&lt;String?&gt;</code> trở thành hai kiểu khác nhau, nên giá trị <code>await</code> được ra có nullability chính xác.</li>
  <li><strong>Dart 2.14 (9/2021)</strong>: thêm extension <code>future.ignore()</code> và hàm <code>unawaited</code> vào <code>dart:async</code> (CHANGELOG 2.14.0; riêng API docs của <code>unawaited</code> ghi <code>@Since("2.15")</code>). Trước đó <code>unawaited</code> nằm trong <code>package:pedantic</code>. Hai API này giúp nói rõ ý định "không chờ" thay vì để Future rơi im lặng.</li>
  <li><strong>Dart 2.18 (2022)</strong>: thêm lint <code>discarded_futures</code> để bắt Future bị bỏ đi trong hàm đồng bộ, bổ sung cho <code>unawaited_futures</code>.</li>
  <li><strong>Dart 3.0 (2023)</strong>: cùng với records, thêm <code>.wait</code> trên record của Future và trên <code>Iterable&lt;Future&gt;</code>, kèm <code>ParallelWaitError</code>. Lý do: <code>Future.wait</code> buộc mọi Future cùng kiểu và làm mất lỗi thứ hai trở đi.</li>
</ul>

<h2>Kết nối hệ thống</h2>

<p><strong>Tiên quyết:</strong></p>

<ul>
  <li><a href="../dart/functions_operators.md" target="_blank" rel="noopener">1.2.2 Functions and Operators</a>: hàm là giá trị, closure, kiểu hàm như <code>Future&lt;T&gt; Function()</code>.</li>
  <li><a href="../dart/control_flow_patterns.md" target="_blank" rel="noopener">1.2.3 Control Flow and Patterns</a>: <code>try</code>/<code>on</code>/<code>catch</code>/<code>finally</code>, <code>rethrow</code>, <code>Exception</code> và <code>Error</code>, destructuring record.</li>
</ul>

<p><strong>Liên quan:</strong></p>

<ul>
  <li><a href="../dart/variables_and_types.md" target="_blank" rel="noopener">1.2.1 Variables and Types</a>: records, generics, null safety dùng trong kiểu như <code>Future&lt;(double, double)&gt;</code>.</li>
  <li><a href="../dart/dart_for_kotlin_devs.md" target="_blank" rel="noopener">1.1.1 Dart for Kotlin Developers</a>: bảng ánh xạ coroutine sang Dart, mô hình một thread và isolate.</li>
</ul>

<p><strong>Học tiếp:</strong></p>

<ul>
  <li><a href="streams.md" target="_blank" rel="noopener">1.3.2 Streams</a>: khi cần nhiều giá trị theo thời gian thay vì một.</li>
  <li><a href="isolates.md" target="_blank" rel="noopener">1.3.3 Isolates</a>: khi việc cần làm là tính toán nặng, không phải chờ.</li>
  <li>3.1.1 Stateless and Stateful Widgets (chưa có bài): <code>FutureBuilder</code>, <code>setState</code> sau <code>await</code>.</li>
  <li>5.1.1 REST APIs with http and Dio (chưa có bài): Future trong request thật, <code>CancelToken</code>.</li>
</ul>

<h2>Tham khảo</h2>

<ul>
  <li><a href="https://dart.dev/language/concurrency" target="_blank" rel="noopener">Concurrency in Dart</a>: event loop, async và isolate.</li>
  <li><a href="https://dart.dev/libraries/async/async-await" target="_blank" rel="noopener">Asynchronous programming: futures, async, await</a>.</li>
  <li><a href="https://api.dart.dev/dart-async/Future/wait.html" target="_blank" rel="noopener">Future.wait</a>, <a href="https://api.dart.dev/dart-async/FutureRecord2/wait.html" target="_blank" rel="noopener">FutureRecord2.wait</a>, <a href="https://api.dart.dev/dart-async/ParallelWaitError-class.html" target="_blank" rel="noopener">ParallelWaitError</a>.</li>
  <li><a href="https://api.dart.dev/dart-async/unawaited.html" target="_blank" rel="noopener">unawaited</a>, <a href="https://api.dart.dev/dart-async/FutureExtensions/ignore.html" target="_blank" rel="noopener">FutureExtensions.ignore</a>.</li>
  <li>Linter rules: <a href="https://dart.dev/tools/linter-rules" target="_blank" rel="noopener">danh sách và rule set</a>, <a href="https://dart.dev/tools/linter-rules/unawaited_futures" target="_blank" rel="noopener">unawaited_futures</a>, <a href="https://dart.dev/tools/linter-rules/discarded_futures" target="_blank" rel="noopener">discarded_futures</a>, <a href="https://dart.dev/tools/linter-rules/use_build_context_synchronously" target="_blank" rel="noopener">use_build_context_synchronously</a>.</li>
  <li><a href="https://docs.flutter.dev/testing/errors" target="_blank" rel="noopener">Handling errors in Flutter</a>: <code>PlatformDispatcher.instance.onError</code>.</li>
  <li><a href="https://github.com/dart-lang/sdk/issues/30345" target="_blank" rel="noopener">dart-lang/sdk#30345</a>: đề xuất và thay đổi để hàm <code>async</code> chạy đồng bộ tới <code>await</code> đầu tiên (Dart 2.0).</li>
</ul>
    `
  },

  'flutter-language-async-streams': {
    title: 'Streams',
    summary: 'Stream<T> là một chuỗi sự kiện bất đồng bộ (data event mang giá trị T, error event, và một done event kết thúc) được đẩy tới listener theo thời gian. Future là một giá trị sẽ có; Stream là nhiều giá trị sẽ đến, và listener nhận chúng qua một StreamSubscription có thể pause, resume, cancel.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '23 phút',
    depth: 'deep-dive',
    tags: ['flutter', 'dart', 'session-01', 'async', 'stream', 'reactive-programming'],
    domain: 'Flutter Development',
    module: 'Session 01: Dart Foundations',
    prerequisites: ['flutter.async.futures_async_await'],
    related: ['flutter.async.isolates', 'flutter.dart.collections_functional', 'flutter.dart.dart_for_kotlin_devs'],
    learningOutcomes: [
      'Giải thích được ba loại sự kiện của Stream và vòng đời listen, pause, resume, cancel của một StreamSubscription.',
      'Phân biệt được single-subscription stream và broadcast stream, và chọn đúng loại cho từng nguồn dữ liệu.',
      'Triển khai được Stream bằng async*/yield và bằng StreamController, gồm việc close controller đúng lúc.',
      'Áp dụng được các phép biến đổi map, where, distinct, asyncMap, expand và StreamTransformer để xây pipeline xử lý sự kiện.',
      'Xử lý được lỗi trong Stream và nhận diện được subscription bị leak khi listen mà không cancel.'
    ],
    knowledgeGap: 'Không hiểu Stream khiến lập trình viên listen một stream hai lần và gặp StateError, quên cancel subscription làm màn hình đã đóng vẫn nhận sự kiện và rò rỉ bộ nhớ, quên close StreamController làm await for treo mãi, và tưởng một lỗi trong stream luôn làm hỏng cả luồng dữ liệu (hoặc ngược lại, tưởng nó không bao giờ dừng await for).',
    updatedAt: '2026-11-10',
    readTime: '23 phút',
    content: `
<h2>Vấn đề cần giải quyết</h2>

<p><code>Future</code> trả về <strong>một</strong> giá trị rồi kết thúc (xem <a href="futures_async_await.md" target="_blank" rel="noopener">1.3.1 Futures and Async/Await</a>). Nhưng rất nhiều dữ liệu trong ứng dụng là <strong>một chuỗi giá trị đến dần theo thời gian</strong>:</p>

<ul>
  <li>Vị trí GPS, tin nhắn WebSocket, tiến độ tải file.</li>
  <li>Nội dung ô tìm kiếm thay đổi theo từng phím gõ.</li>
  <li>Dữ liệu đọc từ file hoặc socket theo từng khối byte.</li>
</ul>

<p>Dùng Future cho những thứ này buộc bạn hỏi lại liên tục, hoặc tự viết hệ thống callback: ai đăng ký, khi nào huỷ, lỗi đi đâu, khi nào kết thúc. Mỗi nguồn tự làm một kiểu, và lỗi hay gặp là màn hình đã đóng nhưng callback vẫn được gọi.</p>

<p><code>Stream</code> trong <code>dart:async</code> là lời giải chuẩn của Dart. Hầu hết API bất đồng bộ nhiều giá trị của Dart và Flutter trả về Stream: <code>File.openRead</code>, socket, plugin vị trí, Firestore snapshot, và BLoC.</p>

<h2>Sau khi học xong</h2>

<ul>
  <li>Giải thích được ba loại sự kiện của Stream và vòng đời listen, pause, resume, cancel của một StreamSubscription.</li>
  <li>Phân biệt được single-subscription stream và broadcast stream, và chọn đúng loại cho từng nguồn dữ liệu.</li>
  <li>Triển khai được Stream bằng async*/yield và bằng StreamController, gồm việc close controller đúng lúc.</li>
  <li>Áp dụng được các phép biến đổi map, where, distinct, asyncMap, expand và StreamTransformer để xây pipeline xử lý sự kiện.</li>
  <li>Xử lý được lỗi trong Stream và nhận diện được subscription bị leak khi listen mà không cancel.</li>
</ul>

<h2>Stream là gì?</h2>

<p><code>Stream&lt;T&gt;</code> (luồng sự kiện) là một chuỗi <strong>sự kiện bất đồng bộ</strong> được đẩy (push) tới listener theo thời gian: các <strong>data event</strong> mang giá trị <code>T</code>, các <strong>error event</strong>, và tối đa một <strong>done event</strong> báo kết thúc. Future là <em>một</em> giá trị sẽ có; Stream là <em>nhiều</em> giá trị sẽ đến.</p>

<p><strong>Mental model: băng chuyền.</strong> Nguồn dữ liệu đặt từng món lên băng chuyền; listener đứng cuối băng nhận từng món theo thứ tự. Băng chuyền chỉ giao hàng khi có người đứng cuối (listen). Người nhận có thể bảo băng tạm dừng (pause), chạy lại (resume) hoặc rời đi (cancel). Món hỏng (error) vẫn đi trên băng như một món đặc biệt; tấm biển "hết hàng" (done) là món cuối cùng.</p>

<p>Stream là bản bất đồng bộ của <code>Iterable</code> (<a href="../dart/collections_functional.md" target="_blank" rel="noopener">1.2.4 Collections and Functional APIs</a>): với <code>Iterable</code>, consumer <strong>kéo</strong> phần tử đồng bộ (<code>for</code>, <code>sync*</code>); với Stream, nguồn <strong>đẩy</strong> sự kiện khi có (<code>await for</code>/<code>listen</code>, <code>async*</code>), và lỗi là một loại sự kiện.</p>

<h2>Cách hoạt động</h2>

<h3>1. Sự kiện, listen và StreamSubscription</h3>

<p>Stream <strong>không giao sự kiện nào</strong> cho tới khi có ai gọi <code>listen</code>. <code>listen</code> nhận tối đa ba callback cho ba loại sự kiện và trả về một <code>StreamSubscription&lt;T&gt;</code>:</p>

<pre data-lang="dart"><code>final subscription = stream.listen(
  (value) { /* data event */ },
  onError: (Object error, StackTrace stackTrace) { /* error event */ },
  onDone: () { /* done event: stream kết thúc */ },
  cancelOnError: false, // true: tự cancel ngay sau error event đầu tiên
);</code></pre>

<p>Vòng đời của <code>StreamSubscription</code>:</p>

<div class="mermaid">
stateDiagram-v2
    [*] --&gt; Active: listen()
    Active --&gt; Paused: pause()
    Paused --&gt; Active: resume()
    Active --&gt; Done: done event
    Active --&gt; Cancelled: cancel()
    Paused --&gt; Cancelled: cancel()
    Done --&gt; [*]
    Cancelled --&gt; [*]
</div>

<ul>
  <li><strong>Paused</strong>: không giao sự kiện; sự kiện đến trong lúc này được buffer, và với single-subscription stream nguồn thường được báo để ngừng tạo.</li>
  <li><strong>Cancelled</strong>: listener rời đi, nguồn được báo để dọn dẹp. <code>cancel()</code> trả về <code>Future</code> hoàn thành khi dọn dẹp xong.</li>
</ul>

<p>Sự kiện được giao <strong>bất đồng bộ</strong>: <code>add</code> hay <code>listen</code> trả về ngay, listener nhận sự kiện trong một microtask sau đó (microtask queue ở <a href="futures_async_await.md" target="_blank" rel="noopener">1.3.1 Futures and Async/Await</a>). Ngoại lệ là <code>StreamController(sync: true)</code>, xem mục 4.</p>

<h3>2. Tạo Stream bằng async* và yield</h3>

<p>Cách tự nhiên nhất để tạo Stream là <strong>generator bất đồng bộ</strong>: hàm <code>async*</code> trả về <code>Stream&lt;T&gt;</code> và <code>yield</code> từng giá trị.</p>

<ul>
  <li>Gọi hàm trả về Stream <strong>ngay</strong>, nhưng thân hàm chỉ chạy khi có listener.</li>
  <li><code>yield value</code> đẩy một data event; <code>yield* otherStream</code> đẩy mọi sự kiện của stream khác. Thân hàm dùng được <code>await</code>, vòng lặp, <code>try</code>/<code>finally</code>.</li>
  <li>Hàm kết thúc (hết thân hoặc <code>return</code>) thì stream phát done event.</li>
  <li><code>throw</code> trong thân hàm phát một error event <strong>rồi kết thúc</strong> stream.</li>
  <li>Khi subscription bị cancel, hàm dừng ở lần <code>yield</code> kế tiếp (như thể <code>yield</code> biến thành <code>return</code>), và các khối <code>finally</code> vẫn chạy. Khi subscription pause, hàm treo tại <code>yield</code>.</li>
</ul>

<p>Stream do <code>async*</code> tạo là single-subscription (mục 3). Muốn một stream mới, gọi lại hàm.</p>

<h4>Ví dụ: đếm ngược trước khi cho gửi lại mã OTP</h4>

<p><strong>Bài toán:</strong> màn hình nhập OTP hiện "Gửi lại mã sau 3s, 2s, 1s", hết giờ thì bật nút "Gửi lại mã". Mỗi giây có một giá trị mới, có kết thúc rõ ràng: đúng hình dạng của Stream.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li>Gọi <code>resendCountdown(3)</code>: có Stream, thân hàm chưa chạy.</li>
  <li><code>await for</code> bắt đầu listen: thân hàm generator chạy.</li>
  <li>Mỗi vòng, <code>yield</code> đẩy số giây còn lại; <code>await for</code> nhận và in ra.</li>
  <li>Vòng lặp trong generator hết: khối <code>finally</code> chạy.</li>
  <li>Generator kết thúc, stream phát done event; <code>await for</code> thoát vòng lặp và bật nút.</li>
</ol>

<div class="mermaid">
sequenceDiagram
    participant UI as OtpScreen
    participant G as resendCountdown
    UI-&gt;&gt;G: (1) gọi hàm, nhận Stream
    UI-&gt;&gt;G: (2) await for = listen, thân hàm bắt đầu
    loop mỗi giây
        G--&gt;&gt;UI: (3) yield số giây còn lại
    end
    Note over G: (4) finally dọn dẹp
    G--&gt;&gt;UI: (5) done event - bật nút Gửi lại mã
</div>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// otp_countdown.dart
import 'dart:async';

// OtpTimer: đếm ngược trước khi cho phép gửi lại mã OTP.
Stream&lt;int&gt; resendCountdown(int seconds) async* {
  print('Generator bắt đầu chạy'); // (2) chỉ chạy khi có listener
  try {
    for (var remaining = seconds; remaining &gt; 0; remaining--) {
      yield remaining; // (3) đẩy một giá trị cho listener
      await Future.delayed(const Duration(milliseconds: 100)); // rút ngắn 1s thành 100ms cho demo
    }
  } finally {
    print('Generator dọn dẹp (finally)'); // (4) chạy cả khi xong lẫn khi bị cancel
  }
}

Future&lt;void&gt; main() async {
  final countdown = resendCountdown(3); // (1) tạo Stream, thân hàm chưa chạy
  print('Đã tạo stream');
  await for (final remaining in countdown) {
    print('Gửi lại mã sau \${remaining}s'); // (3)
  }
  print('Bật nút "Gửi lại mã"'); // (5) done event -&gt; vòng lặp kết thúc
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>Đã tạo stream
Generator bắt đầu chạy
Gửi lại mã sau 3s
Gửi lại mã sau 2s
Gửi lại mã sau 1s
Generator dọn dẹp (finally)
Bật nút "Gửi lại mã"</code></pre>

<p>Dòng "Đã tạo stream" in trước "Generator bắt đầu chạy": tạo Stream không chạy gì cả, giống Kotlin <code>flow { }</code>. Khác ở chỗ đối tượng Stream từ <code>async*</code> chỉ listen được một lần; muốn chạy lại thì gọi lại <code>resendCountdown(3)</code>.</p>

<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body">Stream đơn giản có sẵn constructor: <code>Stream.fromIterable(list)</code>, <code>Stream.value(v)</code>, <code>Stream.error(e)</code>, <code>Stream.fromFuture(f)</code>, <code>Stream.periodic(duration, computation)</code>. Đếm ngược ở trên cũng viết được bằng <code>Stream.periodic(...).take(3)</code>; <code>async*</code> hợp hơn khi logic có nhiều bước, <code>await</code>, hoặc cần <code>finally</code>.</div></div>

<h3>3. Single-subscription và broadcast</h3>

<p>Đây là quyết định đầu tiên khi thiết kế một Stream: ai nghe được, và có mất sự kiện không.</p>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;"></th>
      <th style="padding:8px 12px;text-align:left;">Single-subscription</th>
      <th style="padding:8px 12px;text-align:left;">Broadcast</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Số listener</td>
      <td style="padding:8px 12px;">Đúng <strong>một</strong> trong suốt vòng đời. Listen lần hai ném <code>StateError</code></td>
      <td style="padding:8px 12px;">Nhiều listener cùng lúc, đến và đi lúc nào cũng được</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Sự kiện trước khi có listener</td>
      <td style="padding:8px 12px;"><code>StreamController()</code>: <strong>được buffer</strong>, listener đầu tiên nhận đủ. <code>async*</code>: chưa chạy nên chưa có sự kiện</td>
      <td style="padding:8px 12px;"><strong>Mất</strong>; listener chỉ nhận sự kiện xảy ra sau khi nó listen</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Pause</td>
      <td style="padding:8px 12px;">Báo về nguồn để nguồn ngừng tạo sự kiện</td>
      <td style="padding:8px 12px;">Chỉ subscription đó dừng (sự kiện được buffer riêng cho nó); nguồn vẫn phát cho listener khác</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Hợp với</td>
      <td style="padding:8px 12px;">Một chuỗi dữ liệu có thứ tự, ý nghĩa khi đầy đủ: đọc file, response HTTP, tiến độ một lần tải</td>
      <td style="padding:8px 12px;">Sự kiện riêng lẻ nhiều nơi quan tâm: trạng thái đăng nhập, thay đổi giỏ hàng, sự kiện hệ thống</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Tạo bằng</td>
      <td style="padding:8px 12px;"><code>async*</code>, <code>StreamController()</code>, đa số API I/O</td>
      <td style="padding:8px 12px;"><code>StreamController.broadcast()</code>, <code>stream.asBroadcastStream()</code></td>
    </tr>
  </tbody>
</table>

<p>Kiểm tra bằng <code>stream.isBroadcast</code>.</p>

<h4>Ví dụ: tiến độ upload và trạng thái đăng nhập</h4>

<p><strong>Bài toán:</strong> tiến độ upload là một chuỗi dành cho đúng một thanh tiến độ, và không được mất các mốc đầu. Trạng thái đăng nhập thì header và giỏ hàng cùng cần nghe.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li>Single-subscription: <code>add</code> trước khi có listener, sự kiện được buffer.</li>
  <li>Listener đầu tiên nhận cả hai mốc đã buffer.</li>
  <li>Listener thứ hai bị từ chối bằng <code>StateError</code>. Dòng báo lỗi in <strong>trước</strong> các mốc tiến độ vì sự kiện được giao bất đồng bộ.</li>
  <li>Broadcast: <code>add</code> khi chưa ai nghe, sự kiện mất.</li>
  <li>Header và giỏ hàng cùng listen.</li>
  <li>Sự kiện sau đó tới cả hai.</li>
</ol>

<div class="mermaid">
sequenceDiagram
    participant M as main
    participant U as uploadProgress
    participant A as authChanges
    M-&gt;&gt;U: (1) add 10, add 50 vào buffer
    M-&gt;&gt;U: listen lần một
    M-&gt;&gt;U: (3) listen lần hai
    U--&gt;&gt;M: StateError ngay lập tức
    U--&gt;&gt;M: (2) microtask sau - giao 10 và 50
    M-&gt;&gt;A: (4) add signedIn - không ai nghe, mất
    M-&gt;&gt;A: (5) header và giỏ hàng listen
    M-&gt;&gt;A: (6) add signedOut
    A--&gt;&gt;M: header và giỏ hàng cùng nhận signedOut
</div>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// stream_kinds.dart
import 'dart:async';

enum AuthState { signedOut, signedIn }

Future&lt;void&gt; main() async {
  // Single-subscription: StreamController mặc định
  final uploadProgress = StreamController&lt;int&gt;();
  uploadProgress.add(10); // (1) chưa có listener: sự kiện được buffer
  uploadProgress.add(50);
  final sub = uploadProgress.stream.listen((p) =&gt; print('Upload: $p%')); // (2) nhận cả 10 và 50
  try {
    uploadProgress.stream.listen((p) =&gt; print('Listener thứ hai: $p%')); // (3)
  } on StateError catch (e) {
    print('Listen lần hai: $e');
  }
  await Future&lt;void&gt;.delayed(Duration.zero);
  await sub.cancel();
  await uploadProgress.close();

  // Broadcast: nhiều listener, không buffer cho người đến muộn
  final authChanges = StreamController&lt;AuthState&gt;.broadcast();
  authChanges.add(AuthState.signedIn); // (4) chưa có ai nghe: sự kiện mất
  final header = authChanges.stream.listen((s) =&gt; print('Header: $s')); // (5)
  final cart = authChanges.stream.listen((s) =&gt; print('Giỏ hàng: $s'));
  authChanges.add(AuthState.signedOut); // (6) cả hai cùng nhận
  await Future&lt;void&gt;.delayed(Duration.zero);
  await header.cancel();
  await cart.cancel();
  await authChanges.close();
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>Listen lần hai: Bad state: Stream has already been listened to.
Upload: 10%
Upload: 50%
Header: AuthState.signedOut
Giỏ hàng: AuthState.signedOut</code></pre>

<p><code>AuthState.signedIn</code> không ai nhận được: broadcast stream <strong>không nhớ giá trị hiện tại</strong>, màn hình mở sau khi đăng nhập không biết trạng thái cho tới lần thay đổi kế tiếp. Dart core không có tương đương Kotlin <code>StateFlow</code>; trong Flutter, giá trị hiện tại thường do <code>ValueNotifier</code> (4.1.1 ChangeNotifier and ValueNotifier (chưa có bài)) hoặc <code>BehaviorSubject</code> của rxdart (4.2.4 RxDart and Reactive Streams (chưa có bài)) giữ.</p>

<h3>4. StreamController: đưa nguồn bên ngoài vào Stream</h3>

<p><code>async*</code> hợp khi chính bạn sinh dữ liệu. Khi dữ liệu đến từ <strong>bên ngoài</strong> (callback của SDK, sự kiện người dùng), dùng <code>StreamController&lt;T&gt;</code>:</p>

<ul>
  <li><code>controller.stream</code>: Stream trao cho listener. Thường expose qua getter, giữ controller <code>private</code>.</li>
  <li><code>controller.add(value)</code>, <code>controller.addError(error)</code>: đặt sự kiện lên băng chuyền. <code>controller.sink</code> là cùng chức năng dưới dạng <code>StreamSink</code>.</li>
  <li><code>controller.close()</code>: phát done event, trả về chính Future <code>controller.done</code>, hoàn thành khi done event đã được giao (hoặc subscription bị cancel). Controller single-subscription <strong>chưa ai listen</strong> thì done event nằm trong buffer, nên <code>await controller.close()</code> treo mãi. Sau <code>close()</code>, gọi <code>add</code> ném <code>StateError</code>.</li>
  <li><code>onListen</code>: chạy khi có listener, là chỗ <strong>khởi động nguồn</strong>. <code>onCancel</code>: chạy khi subscription kết thúc (listener cancel, hoặc lúc done event được giao), là chỗ <strong>dừng nguồn</strong>. <code>onPause</code>/<code>onResume</code> cho nguồn hỗ trợ tạm dừng. Với <code>StreamController.broadcast()</code>, <code>onListen</code> chạy khi có listener <strong>đầu tiên</strong>, <code>onCancel</code> khi listener <strong>cuối cùng</strong> rời đi, và không có <code>onPause</code>/<code>onResume</code>.</li>
  <li><code>StreamController(sync: true)</code>: <code>add</code> gọi listener <strong>ngay trong lời gọi</strong> thay vì đợi microtask. Nó phá giả định "listener chạy sau", nên tài liệu API chỉ dành nó để tối ưu khi một sự kiện bất đồng bộ lập tức kích hoạt sự kiện khác (ví dụ trong transformer tự viết); không chắc thì giữ mặc định <code>sync: false</code>.</li>
</ul>

<p>Bắt đầu nguồn trong <code>onListen</code> thay vì ngay khi tạo controller giúp Stream "lười" như <code>async*</code>: không ai nghe thì không tốn tài nguyên.</p>

<div class="callout callout-important"><span class="callout-icon">🔴</span><div class="callout-body">Ai tạo <code>StreamController</code> thì phải <code>close()</code> nó, không thì listener không bao giờ nhận done event: <code>await for</code> treo mãi, <code>onDone</code> không chạy. Lint <code>close_sinks</code> (không bật mặc định) giúp phát hiện controller không được close.</div></div>

<h4>Ví dụ: bọc thư viện tải file chỉ có callback</h4>

<p><strong>Bài toán:</strong> thư viện tải file báo tiến độ bằng callback và có hàm <code>abort()</code>. Repository muốn trả về <code>Stream&lt;int&gt;</code> tiến độ; người dùng huỷ (rời màn hình, bấm "Huỷ") thì phải dừng tải thật.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li>Có listener: <code>onListen</code> bắt đầu tải.</li>
  <li>Mỗi callback tiến độ: <code>controller.add</code>.</li>
  <li>Tải xong: <code>controller.close()</code> phát done event; <code>await for</code> thoát.</li>
  <li>Listener huỷ giữa chừng: <code>onCancel</code> gọi <code>abort()</code> dừng nguồn.</li>
  <li><code>break</code> khỏi <code>await for</code> chính là cancel subscription, nên (4) xảy ra.</li>
</ol>

<div class="mermaid">
sequenceDiagram
    participant UI as DownloadScreen
    participant C as StreamController
    participant D as FileDownloader
    UI-&gt;&gt;C: listen qua await for
    C-&gt;&gt;D: (1) onListen - start
    D--&gt;&gt;C: (2) callback tiến độ - add
    C--&gt;&gt;UI: data event
    D--&gt;&gt;C: (3) xong - close
    C--&gt;&gt;UI: done event
    Note over UI: lần tải thứ hai
    UI-&gt;&gt;C: (5) break khỏi await for = cancel
    C-&gt;&gt;D: (4) onCancel - abort
</div>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// download_progress.dart
import 'dart:async';

// Thư viện tải file chỉ có callback (giả lập).
class FileDownloader {
  Timer? _timer;
  void start(String url, void Function(int percent) onProgress, void Function() onFinished) {
    var percent = 0;
    _timer = Timer.periodic(const Duration(milliseconds: 50), (t) {
      percent += 25;
      onProgress(percent);
      if (percent == 100) {
        t.cancel();
        onFinished();
      }
    });
  }

  void abort() {
    if (_timer?.isActive ?? false) {
      _timer!.cancel();
      print('Downloader: đã huỷ tải giữa chừng');
    }
  }
}

// DownloadRepository: biến callback thành Stream&lt;int&gt;
Stream&lt;int&gt; downloadProgress(String url) {
  final downloader = FileDownloader();
  late final StreamController&lt;int&gt; controller;
  controller = StreamController&lt;int&gt;(
    onListen: () { // (1) có listener mới bắt đầu tải
      print('onListen: bắt đầu tải $url');
      downloader.start(
        url,
        controller.add, // (2) mỗi callback -&gt; một data event
        () =&gt; controller.close(), // (3) tải xong -&gt; close -&gt; done event
      );
    },
    onCancel: downloader.abort, // (4) listener huỷ -&gt; dừng nguồn
  );
  return controller.stream;
}

Future&lt;void&gt; main() async {
  await for (final percent in downloadProgress('https://cdn.example.com/report.pdf')) {
    print('Tiến độ: $percent%');
  }
  print('Tải xong, mở file');

  // Huỷ giữa chừng: break khỏi await for sẽ cancel subscription
  await for (final percent in downloadProgress('https://cdn.example.com/video.mp4')) {
    print('Tiến độ video: $percent%');
    if (percent &gt;= 50) break; // (5) người dùng bấm "Huỷ"
  }
  print('Đã thoát vòng lặp');
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>onListen: bắt đầu tải https://cdn.example.com/report.pdf
Tiến độ: 25%
Tiến độ: 50%
Tiến độ: 75%
Tiến độ: 100%
Tải xong, mở file
onListen: bắt đầu tải https://cdn.example.com/video.mp4
Tiến độ video: 25%
Tiến độ video: 50%
Downloader: đã huỷ tải giữa chừng
Đã thoát vòng lặp</code></pre>

<p><code>abort()</code> kiểm tra <code>isActive</code> vì <code>onCancel</code> cũng chạy khi lần tải đầu kết thúc bình thường.</p>

<h3>5. Biến đổi Stream: map, where, distinct, asyncMap, expand</h3>

<p>Stream có các phép biến đổi giống <code>Iterable</code>, mỗi phép trả về <strong>một Stream mới</strong> bọc stream cũ; chuỗi các phép là một pipeline.</p>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Phép</th>
      <th style="padding:8px 12px;text-align:left;">Ý nghĩa</th>
      <th style="padding:8px 12px;text-align:left;">Ghi chú</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>map(f)</code></td>
      <td style="padding:8px 12px;">Mỗi giá trị thành <code>f(value)</code></td>
      <td style="padding:8px 12px;"><code>f</code> đồng bộ</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>where(test)</code></td>
      <td style="padding:8px 12px;">Chỉ giữ giá trị thoả <code>test</code></td>
      <td style="padding:8px 12px;"></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>distinct([equals])</code></td>
      <td style="padding:8px 12px;">Bỏ giá trị <strong>bằng giá trị liền trước</strong></td>
      <td style="padding:8px 12px;">So bằng <code>==</code>; không phải "loại mọi trùng lặp"</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>asyncMap(f)</code></td>
      <td style="padding:8px 12px;">Như <code>map</code> nhưng <code>f</code> trả <code>Future</code>; chờ xong mới xử lý giá trị kế</td>
      <td style="padding:8px 12px;">Tuần tự, không chạy chồng</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>asyncExpand(f)</code></td>
      <td style="padding:8px 12px;">Mỗi giá trị thành một Stream con, phát hết stream con rồi mới tới giá trị kế</td>
      <td style="padding:8px 12px;"></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>expand(f)</code></td>
      <td style="padding:8px 12px;">Mỗi giá trị thành một <code>Iterable</code>, phát từng phần tử</td>
      <td style="padding:8px 12px;">Một sự kiện thành nhiều</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>take(n)</code>, <code>skip(n)</code>, <code>takeWhile</code>, <code>skipWhile</code></td>
      <td style="padding:8px 12px;">Cắt theo số lượng hoặc điều kiện</td>
      <td style="padding:8px 12px;"><code>take</code> cancel nguồn khi đủ</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>handleError(f)</code>, <code>timeout(d)</code></td>
      <td style="padding:8px 12px;">Xử lý lỗi, giới hạn thời gian giữa hai sự kiện</td>
      <td style="padding:8px 12px;">Xem mục 9</td>
    </tr>
  </tbody>
</table>

<p>Biến đổi một stream single-subscription cho ra stream single-subscription: cả pipeline vẫn chỉ có một listener ở cuối.</p>

<h4>Ví dụ: chuẩn hoá từ khoá tìm kiếm trước khi gọi API</h4>

<p><strong>Bài toán:</strong> mỗi lần người dùng gõ, ô tìm kiếm phát toàn bộ nội dung hiện tại. Cần bỏ khoảng trắng, bỏ từ khoá quá ngắn, không gọi API lại cho cùng từ khoá, gọi API tuần tự và hiện từng sản phẩm.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li><code>map</code>: bỏ khoảng trắng hai đầu.</li>
  <li><code>where</code>: dưới 2 ký tự thì bỏ.</li>
  <li><code>distinct</code>: <code>'iph'</code> lặp lại và <code>' iph '</code> (sau trim) trùng giá trị liền trước, bị bỏ.</li>
  <li><code>asyncMap</code>: gọi API, chờ xong mới nhận từ khoá kế tiếp.</li>
  <li><code>expand</code>: một <code>List</code> kết quả thành nhiều sự kiện, mỗi sự kiện một sản phẩm.</li>
  <li><code>await for</code> hiển thị từng sản phẩm.</li>
</ol>

<div class="mermaid">
flowchart LR
    IN["i, ip, iph, iph, ' iph ', ipho"] --&gt; M["(1) map trim"]
    M --&gt; W["(2) where length &gt;= 2"]
    W --&gt; D["(3) distinct"]
    D --&gt; A["(4) asyncMap gọi API"]
    A --&gt; E["(5) expand từng item"]
    E --&gt; UI["(6) await for hiển thị"]
</div>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// search_pipeline.dart
import 'dart:async';

// Giả lập API tìm kiếm: mất 100ms mỗi request.
Future&lt;List&lt;String&gt;&gt; searchProducts(String keyword) async {
  await Future.delayed(const Duration(milliseconds: 100));
  print('  API: tìm "$keyword"');
  return ['$keyword case', '$keyword sạc'];
}

// Người dùng gõ vào ô tìm kiếm (mỗi giá trị là toàn bộ nội dung ô).
Stream&lt;String&gt; typedQueries() =&gt;
    Stream.fromIterable(['i', 'ip', 'iph', 'iph', ' iph ', 'ipho']);

Future&lt;void&gt; main() async {
  final results = typedQueries()
      .map((q) =&gt; q.trim()) // (1) chuẩn hoá: bỏ khoảng trắng hai đầu
      .where((q) =&gt; q.length &gt;= 2) // (2) chưa đủ 2 ký tự thì không tìm
      .distinct() // (3) bỏ giá trị trùng với giá trị liền trước
      .asyncMap(searchProducts) // (4) gọi API, chờ xong mới xử lý query kế
      .expand((items) =&gt; items); // (5) một List kết quả -&gt; nhiều event, mỗi event một item

  await for (final item in results) {
    print('Hiển thị: $item'); // (6)
  }
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>  API: tìm "ip"
Hiển thị: ip case
Hiển thị: ip sạc
  API: tìm "iph"
Hiển thị: iph case
Hiển thị: iph sạc
  API: tìm "ipho"
Hiển thị: ipho case
Hiển thị: ipho sạc</code></pre>

<p>Sáu lần gõ chỉ tạo ba request, nhưng vẫn gọi API cho mọi từ khoá trung gian khi gõ nhanh; chờ ngừng gõ (debounce) cần một transformer, xem "Ví dụ thực tế".</p>

<h3>6. StreamTransformer: phép biến đổi tự định nghĩa</h3>

<p>Khi các phép có sẵn không đủ, đặc biệt khi <strong>nhiều sự kiện vào gộp thành một sự kiện ra</strong> hoặc ngược lại, dùng <code>StreamTransformer&lt;S, T&gt;</code> và <code>stream.transform(transformer)</code>. <code>transform</code> nhận cả stream đầu vào và trả về stream đầu ra.</p>

<p>Thư viện chuẩn có sẵn nhiều transformer, phổ biến nhất là trong <code>dart:convert</code>: <code>utf8.decoder</code> (byte thành <code>String</code>) và <code>LineSplitter</code> (<code>String</code> thành từng dòng). Tự viết thì có hai cách:</p>

<ul>
  <li><code>StreamTransformer.fromHandlers(handleData:, handleError:, handleDone:)</code>: xử lý từng sự kiện, ghi kết quả vào một <code>EventSink</code>. Đủ cho phần lớn trường hợp.</li>
  <li><code>StreamTransformer.fromBind((stream) =&gt; ...)</code>: toàn quyền với stream đầu vào, dùng khi cần trạng thái theo thời gian (timer, buffer). Ví dụ debounce ở phần "Ví dụ thực tế" dùng cách này.</li>
</ul>

<h4>Ví dụ: đọc số đo từ cảm biến nhiệt độ qua socket</h4>

<p><strong>Bài toán:</strong> cảm biến gửi nhiệt độ dạng text, mỗi dòng một số, qua socket. Socket trả về các khối byte bị cắt ngang giữa dòng (<code>"21.5\\n22"</code>, <code>".0\\nERR\\n23.1\\n"</code>), và thỉnh thoảng có dòng hỏng.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li><code>utf8.decoder</code>: byte thành <code>String</code>, xử lý đúng cả ký tự UTF-8 nhiều byte bị cắt giữa hai khối.</li>
  <li><code>LineSplitter</code>: gom và cắt thành từng dòng hoàn chỉnh (<code>"22"</code> + <code>".0"</code> thành <code>"22.0"</code>).</li>
  <li>Transformer tự viết: dòng hợp lệ thành <code>double</code>, dòng hỏng thành error event.</li>
  <li>Data event: hiển thị nhiệt độ.</li>
  <li>Error event: ghi nhận và bỏ qua; stream vẫn chạy tiếp.</li>
  <li>Socket đóng: done event.</li>
</ol>

<div class="mermaid">
flowchart LR
    S["Socket: List of int"] --&gt; U["(1) utf8.decoder"]
    U --&gt; L["(2) LineSplitter"]
    L --&gt; P["(3) parseReading"]
    P --&gt;|"data"| D["(4) hiển thị"]
    P --&gt;|"error"| E["(5) bỏ qua dòng hỏng"]
    P --&gt;|"done"| X["(6) ngắt kết nối"]
</div>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// sensor_transformer.dart
import 'dart:async';
import 'dart:convert';

// Cảm biến nhiệt độ gửi dữ liệu qua socket: các chunk byte cắt ngang giữa dòng.
Stream&lt;List&lt;int&gt;&gt; sensorSocket() =&gt; Stream.fromIterable([
      utf8.encode('21.5\\n22'),
      utf8.encode('.0\\nERR\\n23.1\\n'),
    ]);

// (3) Transformer tự viết: một dòng text -&gt; một số đo, dòng hỏng -&gt; error event
final parseReading = StreamTransformer&lt;String, double&gt;.fromHandlers(
  handleData: (line, sink) {
    final value = double.tryParse(line);
    if (value == null) {
      sink.addError(FormatException('Dòng không hợp lệ', line));
    } else {
      sink.add(value);
    }
  },
);

Future&lt;void&gt; main() async {
  final readings = sensorSocket()
      .transform(utf8.decoder) // (1) byte -&gt; String (xử lý cả ký tự UTF-8 bị cắt đôi)
      .transform(const LineSplitter()) // (2) gom/cắt thành từng dòng hoàn chỉnh
      .transform(parseReading); // (3)

  readings.listen(
    (celsius) =&gt; print('Nhiệt độ: $celsius°C'), // (4) data event
    onError: (Object e) =&gt; print('Bỏ qua dòng hỏng: \${(e as FormatException).source}'), // (5) error event, stream vẫn chạy tiếp
    onDone: () =&gt; print('Cảm biến ngắt kết nối'), // (6) done event
  );
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>Nhiệt độ: 21.5°C
Nhiệt độ: 22.0°C
Bỏ qua dòng hỏng: ERR
Nhiệt độ: 23.1°C
Cảm biến ngắt kết nối</code></pre>

<p>Cùng chuỗi <code>utf8.decoder</code> + <code>LineSplitter</code> dùng được cho <code>File.openRead()</code> hay bất kỳ nguồn byte nào.</p>

<h3>7. Tiêu thụ Stream: listen và await for</h3>

<p>Hai cách nhận sự kiện:</p>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;"></th>
      <th style="padding:8px 12px;text-align:left;"><code>listen(...)</code></th>
      <th style="padding:8px 12px;text-align:left;"><code>await for (x in stream)</code></th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Kiểu</td>
      <td style="padding:8px 12px;">Đăng ký callback, trả <code>StreamSubscription</code> ngay</td>
      <td style="padding:8px 12px;">Vòng lặp trong hàm <code>async</code>, hàm treo cho tới khi stream done</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Huỷ</td>
      <td style="padding:8px 12px;">Gọi <code>subscription.cancel()</code></td>
      <td style="padding:8px 12px;"><code>break</code>, <code>return</code>, hoặc exception thoát khỏi vòng lặp đều <strong>cancel subscription</strong></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Error event</td>
      <td style="padding:8px 12px;">Vào <code>onError</code>; stream tiếp tục (trừ <code>cancelOnError: true</code>)</td>
      <td style="padding:8px 12px;"><strong>Ném ra</strong> tại vòng lặp, vòng lặp kết thúc, subscription bị cancel</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Pause</td>
      <td style="padding:8px 12px;">Gọi <code>pause()</code>/<code>resume()</code></td>
      <td style="padding:8px 12px;">Tự động: trong lúc thân vòng lặp đang <code>await</code>, subscription được pause</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Hợp với</td>
      <td style="padding:8px 12px;">Listener sống theo vòng đời một đối tượng (màn hình, service)</td>
      <td style="padding:8px 12px;">Xử lý tuần tự một stream có kết thúc</td>
    </tr>
  </tbody>
</table>

<p>Ví dụ ở mục 4 cho thấy <code>break</code> <strong>có</strong> huỷ subscription (<code>onCancel</code> chạy ngay). Ngược lại, với stream không bao giờ done (broadcast trạng thái đăng nhập, <code>Stream.periodic</code>), code sau <code>await for</code> không bao giờ chạy nếu không <code>break</code>.</p>

<h3>8. StreamSubscription: pause, resume, cancel</h3>

<p><code>pause()</code> nói "tạm thời chưa nhận": generator <code>async*</code> treo tại <code>yield</code>, <code>StreamController</code> gọi <code>onPause</code>. <code>cancel()</code> nói "không quay lại nữa": generator dừng ở <code>yield</code> kế tiếp và chạy <code>finally</code>, controller gọi <code>onCancel</code>.</p>

<h4>Ví dụ: tạm dừng GPS khi app vào background</h4>

<p><strong>Bài toán:</strong> màn hình bản đồ nghe vị trí GPS. Khi app vào background thì tạm dừng để tiết kiệm pin, quay lại thì tiếp tục, rời màn hình thì tắt hẳn cảm biến.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li><code>listen</code>: generator bắt đầu, mỗi 100 ms tạo một điểm.</li>
  <li><code>pause()</code>: generator đang chờ điểm #3; tạo xong, nó treo tại <code>yield</code> vì subscription đang pause. Không có điểm #4, #5 nào được tạo trong lúc pause.</li>
  <li><code>resume()</code>: điểm #3 đang treo được giao, generator chạy tiếp.</li>
  <li><code>cancel()</code>: generator đang chờ ở <code>await Future.delayed</code>; nó chạy tới <code>yield</code> kế tiếp (tạo điểm #6), <code>yield</code> lúc này kết thúc hàm, <code>finally</code> tắt cảm biến. <code>await cancel()</code> chỉ xong sau khi <code>finally</code> chạy.</li>
</ol>

<div class="mermaid">
sequenceDiagram
    participant Map as MapScreen
    participant S as StreamSubscription
    participant G as gpsPositions
    Map-&gt;&gt;S: (1) listen
    S-&gt;&gt;G: generator bắt đầu
    G--&gt;&gt;Map: điểm 1, điểm 2
    Map-&gt;&gt;S: (2) pause
    Note over G: tạo điểm 3 rồi treo tại yield
    Map-&gt;&gt;S: (3) resume
    G--&gt;&gt;Map: điểm 3, 4, 5
    Map-&gt;&gt;S: (4) cancel
    Note over G: tạo điểm 6, yield thành return, finally tắt cảm biến
    S--&gt;&gt;Map: Future của cancel hoàn thành
</div>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// gps_subscription.dart
import 'dart:async';

// Giả lập GPS: mỗi 100ms phát một điểm, ghi log mỗi khi tạo điểm.
Stream&lt;String&gt; gpsPositions() async* {
  var tick = 0;
  try {
    while (true) {
      await Future.delayed(const Duration(milliseconds: 100));
      tick++;
      print('  GPS: tạo điểm #$tick');
      yield 'điểm #$tick';
    }
  } finally {
    print('  GPS: tắt cảm biến');
  }
}

Future&lt;void&gt; main() async {
  final subscription = gpsPositions().listen( // (1) listen -&gt; generator bắt đầu
    (p) =&gt; print('Bản đồ vẽ $p'),
  );

  await Future.delayed(const Duration(milliseconds: 250));
  subscription.pause(); // (2) app vào background: tạm dừng
  print('-- pause --');

  await Future.delayed(const Duration(milliseconds: 300));
  print('-- resume --');
  subscription.resume(); // (3) quay lại foreground

  await Future.delayed(const Duration(milliseconds: 250));
  await subscription.cancel(); // (4) rời màn hình: huỷ -&gt; generator chạy finally
  print('Đã cancel, chương trình có thể kết thúc');
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>  GPS: tạo điểm #1
Bản đồ vẽ điểm #1
  GPS: tạo điểm #2
Bản đồ vẽ điểm #2
-- pause --
  GPS: tạo điểm #3
-- resume --
Bản đồ vẽ điểm #3
  GPS: tạo điểm #4
Bản đồ vẽ điểm #4
  GPS: tạo điểm #5
Bản đồ vẽ điểm #5
  GPS: tạo điểm #6
  GPS: tắt cảm biến
Đã cancel, chương trình có thể kết thúc</code></pre>

<h4>Subscription bị leak</h4>

<p>Mỗi <code>listen</code> tạo một tham chiếu từ nguồn tới callback của bạn. Nguồn sống lâu hơn listener (service toàn app, broadcast stream) thì giữ listener sống theo: callback vẫn chạy, đối tượng không được giải phóng. Quy tắc: <strong>mỗi <code>listen</code> có một <code>cancel</code> đối xứng</strong> ở cuối vòng đời bên listen.</p>

<pre data-lang="dart"><code>// leak_demo.dart
import 'dart:async';

// CartService sống suốt vòng đời app.
class CartService {
  final _changes = StreamController&lt;int&gt;.broadcast();
  Stream&lt;int&gt; get itemCount =&gt; _changes.stream;
  bool get hasListener =&gt; _changes.hasListener;
  void add(int count) =&gt; _changes.add(count);
}

// Màn hình chi tiết sản phẩm: mở rồi đóng.
class ProductDetailScreen {
  final CartService cart;
  final String name;
  StreamSubscription&lt;int&gt;? _sub;
  bool _mounted = false;
  ProductDetailScreen(this.cart, this.name);

  void open() {
    _mounted = true;
    _sub = cart.itemCount.listen((count) {
      if (!_mounted) print('$name: cập nhật UI sau khi đã đóng màn hình!');
    });
  }

  Future&lt;void&gt; close({required bool cancel}) async {
    _mounted = false;
    if (cancel) await _sub?.cancel(); // đối xứng với listen trong open()
  }
}

Future&lt;void&gt; main() async {
  final cart = CartService();

  final leaky = ProductDetailScreen(cart, 'Màn hình A')..open();
  await leaky.close(cancel: false); // ❌ quên cancel
  cart.add(1);
  await Future&lt;void&gt;.delayed(Duration.zero);
  print('Còn listener sau khi đóng A? \${cart.hasListener}');

  await leaky._sub?.cancel(); // dọn để demo tiếp

  final fixed = ProductDetailScreen(cart, 'Màn hình B')..open();
  await fixed.close(cancel: true); // ✅
  cart.add(2);
  await Future&lt;void&gt;.delayed(Duration.zero);
  print('Còn listener sau khi đóng B? \${cart.hasListener}');
}</code></pre>

<pre data-lang="text"><code>Màn hình A: cập nhật UI sau khi đã đóng màn hình!
Còn listener sau khi đóng A? true
Còn listener sau khi đóng B? false</code></pre>

<p>Lint <code>cancel_subscriptions</code> (không bật mặc định) cảnh báo subscription được tạo mà không thấy <code>cancel</code>. Bản Flutter của lỗi này ở Sai lầm 2.</p>

<h3>9. Lỗi trong Stream</h3>

<p>Lỗi trong Stream là <strong>error event</strong>, một loại sự kiện đi trên băng chuyền giống data event. Vì vậy:</p>

<ul>
  <li><code>try</code>/<code>catch</code> quanh lời gọi <code>listen(...)</code> <strong>không</strong> bắt được nó: <code>listen</code> trả về ngay, lỗi đến sau.</li>
  <li><code>listen</code> có <code>onError</code>: stream <strong>tiếp tục</strong> giao sự kiện sau lỗi. Với <code>cancelOnError: true</code>, subscription tự cancel ngay sau lỗi đầu tiên và <code>onDone</code> <strong>không</strong> được gọi. Không có <code>onError</code>: lỗi thành uncaught asynchronous error, giống Future lỗi mà không ai bắt.</li>
  <li><code>await for</code>: lỗi được ném ra tại vòng lặp, vòng lặp kết thúc và subscription bị cancel; bắt bằng <code>try</code>/<code>catch</code> quanh vòng lặp. <code>handleError(f)</code> đặt trước đó (hoặc giữa pipeline) chặn error event, ghi log, để data event sau đi tiếp.</li>
  <li>Lỗi có làm stream kết thúc hay không là <strong>do nguồn quyết định</strong>: <code>StreamController</code> vẫn nhận <code>add</code> sau <code>addError</code>; <code>throw</code> trong <code>async*</code> phát lỗi rồi kết thúc generator, còn <code>yield*</code> một stream lỗi thì chuyển tiếp error event và generator chạy tiếp. Theo tài liệu Dart, phần lớn stream dừng sau lỗi đầu tiên.</li>
</ul>

<h4>Ví dụ: đồng bộ tin nhắn khi một trang bị lỗi</h4>

<p><strong>Bài toán:</strong> đồng bộ tin nhắn theo từng trang; trang 2 timeout. Tuỳ cách tiêu thụ, ta muốn dừng ngay, hoặc bỏ qua trang lỗi và lấy tiếp trang 3.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li><code>await for</code>: nhận trang 1, error event của trang 2 ném ra tại vòng lặp, vòng lặp dừng, không có trang 3.</li>
  <li><code>handleError</code> trước <code>await for</code>: lỗi được ghi log, trang 3 vẫn tới.</li>
  <li><code>listen</code> với <code>onError</code>: lỗi vào <code>onError</code>, trang 3 vẫn tới.</li>
  <li><code>throw</code> trong <code>async*</code>: stream phát error event rồi done ngay.</li>
</ol>

<div class="mermaid">
flowchart LR
    E["error event của trang 2"] --&gt; A["(1) await for: ném ra, vòng lặp dừng, mất trang 3"]
    E --&gt; H["(2) handleError: ghi log, trang 3 vẫn tới"]
    E --&gt; L["(3) listen + onError: trang 3 vẫn tới"]
    T["(4) throw trong async*"] --&gt; X["error event rồi done ngay"]
</div>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// sync_messages_errors.dart
import 'dart:async';

// Đồng bộ tin nhắn theo trang; trang 2 lỗi mạng.
Stream&lt;String&gt; syncMessages() async* {
  yield 'Trang 1: 20 tin';
  yield* Stream&lt;String&gt;.error(StateError('timeout trang 2')); // error event, generator vẫn chạy tiếp
  yield 'Trang 3: 5 tin';
}

Future&lt;void&gt; main() async {
  // (1) await for: error event bị ném ra tại vòng lặp, vòng lặp dừng
  try {
    await for (final page in syncMessages()) {
      print('await for nhận: $page');
    }
  } on StateError catch (e) {
    print('await for dừng vì: \${e.message}');
  }

  // (2) handleError trước await for: ghi nhận lỗi, bỏ qua và đi tiếp
  final tolerant = syncMessages().handleError(
    (Object e) =&gt; print('handleError ghi log: $e'),
  );
  await for (final page in tolerant) {
    print('tolerant nhận: $page');
  }

  // (3) listen với onError: stream vẫn giao event sau lỗi
  final done = Completer&lt;void&gt;();
  syncMessages().listen(
    (page) =&gt; print('listen nhận: $page'),
    onError: (Object e) =&gt; print('listen onError: $e'),
    onDone: done.complete,
  );
  await done.future;

  // (4) async* ném exception: stream phát error rồi đóng luôn
  Stream&lt;String&gt; failing() async* {
    yield 'Trang 1: 20 tin';
    throw StateError('token hết hạn');
  }
  failing().listen(
    (page) =&gt; print('failing nhận: $page'),
    onError: (Object e) =&gt; print('failing onError: $e'),
    onDone: () =&gt; print('failing: done'),
  );
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>await for nhận: Trang 1: 20 tin
await for dừng vì: timeout trang 2
tolerant nhận: Trang 1: 20 tin
handleError ghi log: Bad state: timeout trang 2
tolerant nhận: Trang 3: 5 tin
listen nhận: Trang 1: 20 tin
listen onError: Bad state: timeout trang 2
listen nhận: Trang 3: 5 tin
failing nhận: Trang 1: 20 tin
failing onError: Bad state: token hết hạn
failing: done</code></pre>

<p>Với stream trạng thái cho UI, mẫu hay dùng là <strong>biến lỗi thành dữ liệu</strong>: bắt lỗi bên trong và phát một state "thất bại", để stream không dừng vì lỗi ("Ví dụ thực tế" dùng mẫu này).</p>

<h2>Ví dụ thực tế</h2>

<ol>
  <li><strong>Ô tìm kiếm có debounce</strong>: chỉ gọi API khi người dùng ngừng gõ, phát trạng thái loading/kết quả/lỗi cho UI (bài toán chính dưới đây).</li>
  <li><strong>Dữ liệu realtime</strong> (WebSocket, Firestore snapshot, GPS): nguồn đã là Stream; việc của bạn là biến đổi và quản lý subscription theo vòng đời màn hình (WebSocket ở 5.1.4 WebSockets and GraphQL (chưa có bài)).</li>
  <li><strong>Hiện Stream lên UI</strong>: widget <code>StreamBuilder</code> tự listen và cancel theo vòng đời widget (3.1.1 Stateless and Stateful Widgets (chưa có bài)); tạo Stream một lần, không tạo trong <code>build</code>. Kiến trúc BLoC ở 4.2.3 BLoC and Cubit (chưa có bài).</li>
</ol>

<h3>Ví dụ: ô tìm kiếm sản phẩm có debounce</h3>

<p><strong>Bài toán:</strong> người dùng gõ "i", "ip", "iph", "ipho" liên tục. Chỉ gọi API khi họ ngừng gõ 300 ms, không gọi lại cho cùng từ khoá, hiện loading, và lỗi API không làm hỏng ô tìm kiếm.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li>Ô tìm kiếm gọi <code>onTextChanged</code>, đưa text vào <code>StreamController&lt;String&gt;</code>.</li>
  <li><code>debounce</code> chỉ cho giá trị đi qua khi 300 ms không có giá trị mới; "i", "ip", "iph" bị thay thế trước khi kịp đi qua.</li>
  <li><code>distinct</code> bỏ từ khoá trùng lần trước (<code>'ipho '</code> sau khi trim).</li>
  <li><code>asyncExpand</code> biến mỗi từ khoá thành một chuỗi trạng thái con.</li>
  <li>Chuỗi con phát <code>SearchLoading</code> trước.</li>
  <li>Có kết quả: phát <code>SearchSuccess</code>.</li>
  <li>API lỗi: phát <code>SearchFailure</code> thay vì error event, nên stream chính không dừng.</li>
  <li>Màn hình đóng: <code>dispose</code> close controller nguồn; done event đi hết pipeline, vòng <code>await for</code> của UI kết thúc.</li>
</ol>

<div class="mermaid">
sequenceDiagram
    participant UI as SearchScreen
    participant Q as StreamController
    participant P as Pipeline
    participant API as searchApi
    UI-&gt;&gt;Q: (1) onTextChanged i, ip, iph, ipho
    Q-&gt;&gt;P: (2) debounce 300ms - chỉ ipho đi qua
    Note over P: (3) distinct
    P-&gt;&gt;API: (4) asyncExpand gọi API
    P--&gt;&gt;UI: (5) SearchLoading
    API--&gt;&gt;P: danh sách sản phẩm
    P--&gt;&gt;UI: (6) SearchSuccess
    P--&gt;&gt;UI: (7) SearchFailure khi API lỗi
    UI-&gt;&gt;Q: (8) dispose - close
    P--&gt;&gt;UI: done event
</div>

<p><strong>Code:</strong></p>

<pre data-lang="dart"><code>// product_search.dart
import 'dart:async';

// debounce: chỉ cho giá trị đi qua khi nguồn "im lặng" đủ lâu.
StreamTransformer&lt;T, T&gt; debounce&lt;T&gt;(Duration quiet) {
  return StreamTransformer&lt;T, T&gt;.fromBind((source) {
    Timer? timer;
    StreamSubscription&lt;T&gt;? sub;
    late final StreamController&lt;T&gt; out;
    out = StreamController&lt;T&gt;(
      onListen: () {
        sub = source.listen(
          (value) {
            timer?.cancel(); // giá trị mới tới: huỷ hẹn giờ cũ
            timer = Timer(quiet, () =&gt; out.add(value));
          },
          onError: out.addError,
          onDone: () {
            timer?.cancel();
            out.close();
          },
        );
      },
      onCancel: () {
        timer?.cancel();
        return sub?.cancel();
      },
    );
    return out.stream;
  });
}

sealed class SearchState {}
class SearchLoading extends SearchState {
  final String keyword;
  SearchLoading(this.keyword);
}
class SearchSuccess extends SearchState {
  final String keyword;
  final List&lt;String&gt; items;
  SearchSuccess(this.keyword, this.items);
}
class SearchFailure extends SearchState {
  final String message;
  SearchFailure(this.message);
}

// Giả lập API: "lỗi" thì server trả 500.
Future&lt;List&lt;String&gt;&gt; searchApi(String keyword) async {
  await Future.delayed(const Duration(milliseconds: 100));
  if (keyword == 'lỗi') throw StateError('500');
  return ['$keyword #1', '$keyword #2'];
}

// ProductSearchController: nhận text từ ô tìm kiếm, phát SearchState cho UI.
class ProductSearchController {
  final _queries = StreamController&lt;String&gt;(); // (1) nguồn: mỗi lần người dùng gõ
  late final Stream&lt;SearchState&gt; states = _queries.stream
      .map((q) =&gt; q.trim())
      .transform(debounce(const Duration(milliseconds: 300))) // (2) chờ ngừng gõ 300ms
      .where((q) =&gt; q.length &gt;= 2)
      .distinct() // (3) cùng từ khoá với lần trước thì không gọi lại
      .asyncExpand(_search); // (4) mỗi từ khoá -&gt; một chuỗi trạng thái

  Stream&lt;SearchState&gt; _search(String keyword) async* {
    yield SearchLoading(keyword); // (5) UI hiện loading
    try {
      yield SearchSuccess(keyword, await searchApi(keyword)); // (6) có kết quả
    } catch (e) {
      yield SearchFailure('Không tìm được "$keyword": $e'); // (7) lỗi thành state, stream không chết
    }
  }

  void onTextChanged(String text) =&gt; _queries.add(text);
  Future&lt;void&gt; dispose() =&gt; _queries.close(); // (8) đóng nguồn -&gt; stream done
}

// Thay cho UI: vẽ từng state nhận được.
Future&lt;void&gt; render(Stream&lt;SearchState&gt; states) async {
  await for (final state in states) {
    switch (state) {
      case SearchLoading(:final keyword):
        print('UI: đang tìm "$keyword"...');
      case SearchSuccess(:final keyword, :final items):
        print('UI: "$keyword" -&gt; $items');
      case SearchFailure(:final message):
        print('UI: $message');
    }
  }
  print('UI: stream đã đóng');
}

Future&lt;void&gt; main() async {
  final controller = ProductSearchController();
  final rendering = render(controller.states);

  // Người dùng gõ nhanh "i", "ip", "iph", "ipho" (cách nhau 100ms) rồi dừng.
  for (final text in ['i', 'ip', 'iph', 'ipho']) {
    controller.onTextChanged(text);
    await Future.delayed(const Duration(milliseconds: 100));
  }
  await Future.delayed(const Duration(milliseconds: 600));
  controller.onTextChanged('ipho '); // trim xong trùng từ khoá cũ -&gt; distinct bỏ qua
  await Future.delayed(const Duration(milliseconds: 600));
  controller.onTextChanged('lỗi');
  await Future.delayed(const Duration(milliseconds: 600));

  await controller.dispose(); // (8)
  await rendering;
}</code></pre>

<p><strong>Kết quả:</strong></p>

<pre data-lang="text"><code>UI: đang tìm "ipho"...
UI: "ipho" -&gt; [ipho #1, ipho #2]
UI: đang tìm "lỗi"...
UI: Không tìm được "lỗi": Bad state: 500
UI: stream đã đóng</code></pre>

<p>Bốn lần gõ nhanh chỉ tạo một request. <code>sealed class</code> và <code>switch</code> với object pattern dùng để UI xử lý đủ mọi trạng thái; chúng thuộc <a href="../dart/classes_mixins_sealed.md" target="_blank" rel="noopener">1.2.5 Classes, Mixins and Sealed Types</a> và <a href="../dart/control_flow_patterns.md" target="_blank" rel="noopener">1.2.3 Control Flow and Patterns</a>.</p>

<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body"><code>asyncExpand</code> xử lý từng từ khoá <strong>tuần tự</strong>: từ khoá mới đến khi request cũ chưa xong thì phải chờ, và kết quả cũ vẫn được hiển thị. Muốn huỷ request cũ khi có từ khoá mới (Kotlin <code>flatMapLatest</code>), rxdart có <code>switchMap</code>, cùng <code>debounceTime</code> dựng sẵn thay cho transformer tự viết; xem 4.2.4 RxDart and Reactive Streams (chưa có bài).</div></div>

<h2>So sánh với các cách tiếp cận khác</h2>

<p><strong>Với Kotlin Flow</strong> (bảng ánh xạ đầy đủ ở <a href="../dart/dart_for_kotlin_devs.md" target="_blank" rel="noopener">1.1.1 Dart for Kotlin Developers</a>):</p>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Kotlin</th>
      <th style="padding:8px 12px;text-align:left;">Dart</th>
      <th style="padding:8px 12px;text-align:left;">Khác biệt cần nhớ</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>flow { emit(x) }</code> (cold)</td>
      <td style="padding:8px 12px;">Hàm <code>async*</code> + <code>yield</code></td>
      <td style="padding:8px 12px;">Một đối tượng Flow collect được nhiều lần; một đối tượng Stream <code>async*</code> chỉ listen được một lần, phải gọi lại hàm</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>collect { }</code> (suspend tới khi Flow xong)</td>
      <td style="padding:8px 12px;"><code>await for</code></td>
      <td style="padding:8px 12px;"><code>listen</code> giống <code>launchIn(scope)</code> hơn: đăng ký rồi trả về ngay</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Huỷ theo <code>CoroutineScope</code> (structured concurrency)</td>
      <td style="padding:8px 12px;"><code>subscription.cancel()</code> gọi tay</td>
      <td style="padding:8px 12px;">Dart không tự huỷ khi màn hình đóng; <code>StreamBuilder</code> làm thay bạn trong widget</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>SharedFlow</code> (replay = 0)</td>
      <td style="padding:8px 12px;">Broadcast stream</td>
      <td style="padding:8px 12px;"><code>SharedFlow</code> không bao giờ complete; broadcast stream có done khi controller close</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>StateFlow</code></td>
      <td style="padding:8px 12px;">Không có trong core</td>
      <td style="padding:8px 12px;">Dùng <code>ValueNotifier</code> hoặc <code>BehaviorSubject</code> (rxdart)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>MutableSharedFlow.emit</code>, <code>Channel.send</code></td>
      <td style="padding:8px 12px;"><code>StreamController.add</code></td>
      <td style="padding:8px 12px;"><code>emit</code>/<code>send</code> suspend khi buffer đầy (backpressure); <code>add</code> không bao giờ chờ, sự kiện dồn vào buffer không giới hạn khi chưa có listener hoặc listener đang pause</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>map</code>, <code>filter</code>, <code>distinctUntilChanged</code></td>
      <td style="padding:8px 12px;"><code>map</code>, <code>where</code>, <code>distinct</code></td>
      <td style="padding:8px 12px;"></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>flatMapConcat</code>, <code>flatMapLatest</code>, <code>debounce</code></td>
      <td style="padding:8px 12px;"><code>asyncExpand</code>; <code>switchMap</code>, <code>debounceTime</code> của rxdart</td>
      <td style="padding:8px 12px;"></td>
    </tr>
  </tbody>
</table>

<p>Dart không phân loại cold/hot, nên đừng đánh đồng single-subscription với cold. <code>async*</code> lười như <code>flow { }</code> (chỉ chạy khi listen) nhưng chỉ chạy một lần; <code>StreamController()</code> thì nhận <code>add</code> được trước khi ai listen, nguồn đã chạy như hot và sự kiện chờ trong buffer. Broadcast stream gần với hot <code>SharedFlow</code>.</p>

<p><strong>Với các lựa chọn khác trong Dart/Flutter:</strong></p>

<ul>
  <li><strong>Future</strong>: đủ khi chỉ có một kết quả.</li>
  <li><strong><code>ValueNotifier</code>/<code>ChangeNotifier</code></strong>: giữ <strong>giá trị hiện tại</strong>, báo đồng bộ khi đổi, không có error hay done; hợp với state UI hơn broadcast stream (4.1.1 ChangeNotifier and ValueNotifier (chưa có bài)).</li>
  <li><strong>Callback thuần</strong>: đơn giản nhất cho một listener cố định, nhưng tự lo đăng ký, huỷ, lỗi, kết thúc.</li>
</ul>

<h2>Khi nào nên và không nên dùng</h2>

<p><strong>Nên dùng Stream khi:</strong></p>

<ul>
  <li>Dữ liệu là <strong>chuỗi giá trị theo thời gian</strong> và cần biến đổi, lọc thành pipeline.</li>
  <li>Cần listener <strong>huỷ được</strong> và nguồn biết để dừng (Future không huỷ được).</li>
  <li>Bọc một API callback gọi nhiều lần.</li>
</ul>

<p><strong>Không nên, hoặc cân nhắc thứ khác, khi:</strong></p>

<ul>
  <li><strong>Chỉ có một kết quả</strong>: dùng Future.</li>
  <li><strong>Cần giá trị hiện tại cho UI</strong> (trạng thái đăng nhập, theme): dùng <code>ValueNotifier</code> hoặc giải pháp state management ở Session 04 (Sai lầm 5).</li>
  <li><strong>Cần toán tử thời gian phức tạp</strong> (<code>switchMap</code>, <code>combineLatest</code>, <code>throttle</code>): đừng tự viết hết; dùng rxdart.</li>
  <li><strong>Xử lý từng sự kiện tốn nhiều CPU</strong> (giải mã ảnh trong mỗi frame camera): Stream không làm việc đó nhanh hơn, vẫn chạy trong isolate hiện tại; chuyển phần nặng sang <a href="isolates.md" target="_blank" rel="noopener">1.3.3 Isolates</a>.</li>
</ul>

<h2>Sai lầm thường gặp</h2>

<p><strong>1. Listen một single-subscription stream hai lần.</strong></p>

<pre data-lang="dart"><code>final positions = gpsPositions();
positions.listen(drawOnMap);
positions.listen(updateDistance); // ❌ StateError: Stream has already been listened to.</code></pre>

<p>Sửa: thiết kế nguồn là broadcast (<code>StreamController.broadcast()</code>), hoặc listen <code>positions.asBroadcastStream()</code>. Lưu ý <code>asBroadcastStream</code> mặc định giữ subscription gốc kể cả khi không còn ai nghe, nên nguồn có thể chạy mãi.</p>

<p><strong>2. Quên cancel subscription.</strong> Trong Flutter là lỗi <code>setState() called after dispose()</code> và rò rỉ bộ nhớ (mục 8). Mỗi <code>listen</code> trong <code>initState</code> có <code>cancel</code> trong <code>dispose</code>. Code Flutter:</p>

<pre data-lang="dart"><code>// Code Flutter: _OrderTrackingScreenState
StreamSubscription&lt;OrderStatus&gt;? _statusSub;

@override
void initState() {
  super.initState();
  _statusSub = orderService.statusChanges(orderId).listen((status) {
    setState(() =&gt; _status = status);
  });
}

@override
void dispose() {
  _statusSub?.cancel(); // đối xứng với listen trong initState
  super.dispose();
}</code></pre>

<p><strong>3. Quên close StreamController, hoặc <code>await close()</code> khi chưa ai listen.</strong> Cả hai đều treo: trường hợp đầu <code>await for</code> của listener không bao giờ thoát; trường hợp sau Future của <code>close()</code> chờ một listener không bao giờ đến (mục 4). Ai tạo controller thì close nó, thường trong <code>dispose()</code> của lớp sở hữu.</p>

<p><strong>4. Đặt code sau <code>await for</code> của một stream không bao giờ done.</strong> Code đó không bao giờ chạy. Cần thoát thì <code>break</code> (nó có cancel subscription, chạy <code>onCancel</code> và <code>finally</code> của generator), hoặc dùng <code>listen</code> và cancel khi cần.</p>

<p><strong>5. Dùng broadcast stream cho "giá trị hiện tại".</strong> Listener đến sau không thấy giá trị trước đó (<code>AuthState.signedIn</code> ở mục 3). Dùng <code>ValueNotifier</code>, <code>BehaviorSubject</code>, hoặc phát giá trị hiện tại ngay khi có listener.</p>

<p><strong>6. Dùng <code>map</code> với hàm async.</strong></p>

<pre data-lang="dart"><code>// ❌ ra Stream&lt;Future&lt;List&lt;String&gt;&gt;&gt;: request chạy chồng, UI nhận Future chứ không nhận kết quả
queries.map((q) =&gt; searchProducts(q));

// ✅ ra Stream&lt;List&lt;String&gt;&gt;: chờ từng request
queries.asyncMap(searchProducts);</code></pre>

<p><strong>7. Bọc <code>listen</code> trong <code>try</code>/<code>catch</code> để bắt lỗi của stream.</strong> Không bắt được (mục 9); dùng <code>onError</code>, <code>handleError</code>, hoặc <code>try</code>/<code>catch</code> quanh <code>await for</code>.</p>

<p><strong>8. Tưởng <code>distinct</code> loại mọi giá trị trùng.</strong> Nó chỉ so với giá trị <strong>liền trước</strong>: chuỗi <code>a, b, a</code> vẫn đi qua đủ ba. Với object, class không override <code>==</code> thì hai object cùng nội dung vẫn bị coi là khác (xem <a href="../dart/classes_mixins_sealed.md" target="_blank" rel="noopener">1.2.5 Classes, Mixins and Sealed Types</a>).</p>

<h2>Lịch sử phát triển</h2>

<ul>
  <li><strong>Dart 1.0 (2013)</strong>: <code>Stream</code>, <code>StreamController</code>, <code>StreamSubscription</code> và <code>StreamTransformer</code> đã có trong <code>dart:async</code>, cùng phân biệt single-subscription và broadcast. Hai loại ứng với sự kiện DOM như click chuột (broadcast) và dữ liệu I/O có thứ tự (single-subscription). Chỉ tiêu thụ được bằng <code>listen</code> và callback.</li>
  <li><strong>Dart 1.9 (3/2015)</strong>: thêm <code>async*</code>/<code>yield</code>/<code>yield*</code> và <code>await for</code>, cùng đợt với <code>async</code>/<code>await</code>. Tạo và tiêu thụ Stream viết được như vòng lặp bình thường.</li>
  <li><strong>Dart 2.0 (2018)</strong> và <strong>2.12 (2021)</strong>: sound type system rồi null safety; kiểu sự kiện của Stream được kiểm tra chặt, <code>Stream&lt;T&gt;</code> và <code>Stream&lt;T?&gt;</code> là hai kiểu khác nhau.</li>
  <li><strong>Dart 3.0 (2023)</strong>: sealed class và pattern matching. API Stream không đổi, nhưng stream trạng thái thường phát một <code>sealed class</code> để <code>switch</code> buộc UI xử lý đủ mọi trường hợp (mẫu ở "Ví dụ thực tế").</li>
</ul>

<h2>Kết nối hệ thống</h2>

<p><strong>Tiên quyết:</strong></p>

<ul>
  <li><a href="futures_async_await.md" target="_blank" rel="noopener">1.3.1 Futures and Async/Await</a>: event loop, <code>async</code>/<code>await</code>, lỗi bất đồng bộ mà Stream dùng lại.</li>
</ul>

<p><strong>Liên quan:</strong></p>

<ul>
  <li><a href="../dart/collections_functional.md" target="_blank" rel="noopener">1.2.4 Collections and Functional APIs</a>: <code>Iterable</code> và <code>sync*</code>, bản đồng bộ của Stream.</li>
  <li><a href="isolates.md" target="_blank" rel="noopener">1.3.3 Isolates</a>: khi mỗi sự kiện tốn nhiều CPU; <code>ReceivePort</code> cũng là một Stream.</li>
  <li><a href="../dart/dart_for_kotlin_devs.md" target="_blank" rel="noopener">1.1.1 Dart for Kotlin Developers</a>: ánh xạ Flow sang Stream.</li>
</ul>

<p><strong>Học tiếp:</strong></p>

<ul>
  <li>3.1.1 Stateless and Stateful Widgets (chưa có bài): <code>StreamBuilder</code>, <code>dispose</code>.</li>
  <li>4.1.1 ChangeNotifier and ValueNotifier (chưa có bài): giữ giá trị hiện tại cho UI.</li>
  <li>4.2.3 BLoC and Cubit (chưa có bài): kiến trúc state dựa trên Stream.</li>
  <li>4.2.4 RxDart and Reactive Streams (chưa có bài): <code>BehaviorSubject</code>, <code>switchMap</code>, <code>debounceTime</code>.</li>
  <li>5.1.4 WebSockets and GraphQL (chưa có bài): Stream từ kết nối realtime.</li>
</ul>

<h2>Tham khảo</h2>

<ul>
  <li><a href="https://dart.dev/libraries/async/using-streams" target="_blank" rel="noopener">Asynchronous programming: Streams</a>: single-subscription và broadcast, <code>await for</code>, các phương thức biến đổi.</li>
  <li><a href="https://dart.dev/language/concurrency" target="_blank" rel="noopener">Concurrency in Dart</a>: event loop mà Stream chạy trên.</li>
  <li><a href="https://api.dart.dev/dart-async/StreamController/StreamController.html" target="_blank" rel="noopener">StreamController constructor</a>: <code>onListen</code>, <code>onPause</code>, <code>onResume</code>, <code>onCancel</code>, buffer trước khi listen.</li>
  <li><a href="https://api.dart.dev/dart-async/Stream/asBroadcastStream.html" target="_blank" rel="noopener">Stream.asBroadcastStream</a>: giữ subscription gốc cho tới khi stream kết thúc hoặc callback huỷ nó.</li>
  <li>Linter rules: <a href="https://dart.dev/tools/linter-rules" target="_blank" rel="noopener">danh sách và rule set</a> (<code>cancel_subscriptions</code>, <code>close_sinks</code>).</li>
</ul>
    `
  },

  'flutter-language-async-isolates': {
    title: 'Isolates',
    summary: 'Isolate là đơn vị thực thi độc lập của Dart, có bộ nhớ riêng và event loop riêng, không chia sẻ object với isolate khác và chỉ giao tiếp bằng message gửi qua port. Đây là cách để code Dart chạy việc tính toán nặng song song mà không chặn main isolate.',
    status: 'published',
    difficulty: 'advanced',
    estimatedReadingTime: '35 phút',
    depth: 'deep-dive',
    tags: ['flutter', 'dart', 'session-01', 'async', 'isolate', 'concurrency', 'performance'],
    domain: 'Flutter Development',
    module: 'Session 01: Dart Foundations',
    prerequisites: ['flutter.async.futures_async_await', 'flutter.dart.control_flow_patterns'],
    related: ['flutter.async.streams', 'flutter.dart.dart_for_kotlin_devs', 'flutter.dart.variables_types'],
    learningOutcomes: [
      'Giải thích được vì sao mỗi isolate có bộ nhớ và event loop riêng, và vì sao async/await không cứu được main isolate khỏi việc tính toán nặng.',
      'Triển khai được tác vụ một lần bằng Isolate.run hoặc compute, và worker sống lâu trao đổi hai chiều qua SendPort/ReceivePort.',
      'Phân biệt được dữ liệu gửi được và không gửi được qua port, cùng chi phí của copy, Isolate.exit và TransferableTypedData.',
      'Biết khi nào dùng isolate, khi nào async là đủ, và giới hạn của isolate trên web và khi gọi plugin.',
      'Debug được các lỗi isolate thường gặp - closure bắt object không gửi được, worker chết làm main chờ mãi, port không đóng giữ isolate sống.'
    ],
    knowledgeGap: 'Không hiểu isolate thì hoặc để việc nặng (parse JSON lớn, xử lý ảnh, mã hoá) chạy trên main isolate làm UI giật, hoặc rải isolate cho cả I/O và việc nhỏ khiến app chậm hơn và khó bảo trì. Với worker sống lâu, thiếu kiến thức này dẫn tới main chờ mãi khi worker chết, port bị rò rỉ giữ isolate sống, và crash lúc runtime vì closure vô tình bắt theo object không gửi được.',
    updatedAt: '2026-11-10',
    readTime: '35 phút',
    content: `
<h2>Vấn đề cần giải quyết</h2>

<p>Bài <a href="futures_async_await.md" target="_blank" rel="noopener">1.3.1 Futures and Async/Await</a> cho thấy <code>await</code> giúp main isolate không phải <strong>chờ</strong>: trong lúc request mạng hay đọc file chưa xong, event loop vẫn xử lý được việc khác. Nhưng <code>await</code> không giúp gì cho việc <strong>tính</strong>. Một hàm đồng bộ như <code>jsonDecode</code> trên chuỗi 15 MB chạy từ đầu tới cuối mà không nhường event loop. Trong thời gian đó, không event nào khác được xử lý, kể cả event vẽ frame.</p>

<pre data-lang="dart"><code>Future&lt;List&lt;Product&gt;&gt; loadCatalog() async {
  final body = await api.get('/products'); // chờ I/O: event loop vẫn rảnh
  return parseCatalog(body);               // tính toán đồng bộ: event loop bị chiếm
}</code></pre>

<p>Hàm có <code>async</code> không có nghĩa phần thân chạy ở "luồng khác". Đo trên MacBook Apple M5 (macOS, Dart 3.12, <code>dart run</code>), parse 14,8 MB JSON mất khoảng 180–200 ms, và trong thời gian đó một timer 16 ms giả lập frame không chạy được lần nào. Ở 60 Hz mỗi frame có khoảng 16,7 ms (120 Hz: 8,3 ms), nên UI đứng hình hơn chục frame. Hiện tượng này gọi là jank (giật khung hình). Từ Flutter 3.29, trên Android và iOS main isolate còn chạy trên main thread của platform, nên chặn main isolate là chặn luôn main thread của app.</p>

<p>Kotlin developer sẽ nghĩ tới <code>withContext(Dispatchers.Default)</code>: đẩy việc sang thread khác dùng chung heap. Code Dart không có thread chia sẻ bộ nhớ, không có <code>synchronized</code>, không có <code>Mutex</code>. Cần một cách chạy việc nặng <strong>song song thật sự</strong> trên core CPU khác mà vẫn giữ điều Dart hứa: không có race condition trên object Dart. Isolate giải quyết vấn đề này.</p>

<h2>Sau khi học xong</h2>

<ul>
  <li>Giải thích được vì sao mỗi isolate có bộ nhớ và event loop riêng, và vì sao async/await không cứu được main isolate khỏi việc tính toán nặng.</li>
  <li>Triển khai được tác vụ một lần bằng Isolate.run hoặc compute, và worker sống lâu trao đổi hai chiều qua SendPort/ReceivePort.</li>
  <li>Phân biệt được dữ liệu gửi được và không gửi được qua port, cùng chi phí của copy, Isolate.exit và TransferableTypedData.</li>
  <li>Biết khi nào dùng isolate, khi nào async là đủ, và giới hạn của isolate trên web và khi gọi plugin.</li>
  <li>Debug được các lỗi isolate thường gặp - closure bắt object không gửi được, worker chết làm main chờ mãi, port không đóng giữ isolate sống.</li>
</ul>

<h2>Isolate là gì?</h2>

<p><strong>Isolate (vùng thực thi cô lập)</strong> là đơn vị thực thi độc lập của Dart: mỗi isolate có bộ nhớ riêng chứa object của nó và một event loop riêng; các isolate không chia sẻ object nào với nhau và chỉ giao tiếp bằng message gửi qua port.</p>

<p>Mental model dùng xuyên suốt bài: <strong>mỗi isolate là một process thu nhỏ bên trong app</strong>. Giống hai process Android, hai isolate không nhìn thấy bộ nhớ của nhau; muốn trao đổi thì gửi message, và bên nhận có bản của riêng nó. Khác process, isolate nhẹ: trên máy đo, tạo một isolate mới bằng <code>Isolate.run</code> chỉ tốn khoảng 0,1 ms sau lần đầu (số đo ở mục 6).</p>

<div class="dd-diagram" data-dd="flutter-isolate-msg">
<div class="dd-svg dd-svg-dark">
<svg viewBox="0 0 800 352" role="img" aria-labelledby="flutter-isolate-msg-dark-title flutter-isolate-msg-dark-desc" font-family="'Geist', sans-serif">
<title id="flutter-isolate-msg-dark-title">Nặng thì quăng sang isolate khác</title>
<desc id="flutter-isolate-msg-dark-desc">Main isolate gửi input copy sang worker isolate parse JSON nặng rồi nhận kết quả copy gửi về.</desc>
<defs>
<marker id="flutter-isolate-msg-dark-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0, 8 3, 0 6" fill="#94A3B8"/>
</marker>
</defs>
<rect width="800" height="352" fill="#060913"/>
<!-- zones -->
<rect x="32" y="24" width="320" height="280" rx="8" fill="rgba(248,250,252,0.02)" stroke="rgba(248,250,252,0.10)" stroke-width="0.8"/>
<rect x="48" y="28" width="112" height="12" rx="2" fill="#060913"/>
<text x="104" y="37" fill="#64748B" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.14em">MAIN ISOLATE</text>
<rect x="448" y="24" width="320" height="280" rx="8" fill="rgba(248,250,252,0.02)" stroke="rgba(248,250,252,0.10)" stroke-width="0.8"/>
<rect x="464" y="28" width="120" height="12" rx="2" fill="#060913"/>
<text x="524" y="37" fill="#64748B" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.14em">WORKER ISOLATE</text>
<!-- arrows -->
<path d="M 320,128 H 400 Q 408,128 408,120 V 96 H 480" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#flutter-isolate-msg-dark-arrow)"/>
<rect x="324" y="122" width="72" height="12" rx="2" fill="#060913"/>
<text x="360" y="131" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">INPUT (COPY)</text>
<path d="M 608,128 V 200" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#flutter-isolate-msg-dark-arrow)"/>
<path d="M 480,232 H 408 Q 400,232 400,224 V 160" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#flutter-isolate-msg-dark-arrow)"/>
<rect x="400" y="226" width="76" height="12" rx="2" fill="#060913"/>
<text x="438" y="235" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">KẾT QUẢ (COPY)</text>
<!-- nodes -->
<rect x="64" y="96" width="256" height="64" rx="6" fill="#060913"/>
<rect x="64" y="96" width="256" height="64" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="192" y="130" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">UI + Event Loop</text>
<text x="192" y="144" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">main isolate</text>
<rect x="480" y="64" width="256" height="64" rx="6" fill="#060913"/>
<rect x="480" y="64" width="256" height="64" rx="6" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="1.2"/>
<text x="608" y="98" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">parseBigJson()</text>
<text x="608" y="112" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">việc nặng · worker</text>
<rect x="480" y="200" width="256" height="64" rx="6" fill="#060913"/>
<rect x="480" y="200" width="256" height="64" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="608" y="234" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Kết quả</text>
<text x="608" y="248" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">trả về bản copy</text>
<!-- legend -->
<line x1="32" y1="328" x2="768" y2="328" stroke="rgba(248,250,252,0.12)" stroke-width="0.8"/>
<text x="32" y="344" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" letter-spacing="0.14em">CHÚ GIẢI</text>
<circle cx="150" cy="340" r="4" fill="#38BDF8"/>
<text x="162" y="344" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace">VIỆC NẶNG · WORKER ISOLATE</text>
<line x1="440" y1="340" x2="472" y2="340" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#flutter-isolate-msg-dark-arrow)"/>
<text x="480" y="344" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace">GỬI BẢN COPY HAI CHIỀU</text>
</svg>
</div>
<div class="dd-svg dd-svg-light">
<svg viewBox="0 0 800 352" role="img" aria-labelledby="flutter-isolate-msg-title flutter-isolate-msg-desc" font-family="'Geist', sans-serif">
<title id="flutter-isolate-msg-title">Nặng thì quăng sang isolate khác</title>
<desc id="flutter-isolate-msg-desc">Main isolate gửi input copy sang worker isolate parse JSON nặng rồi nhận kết quả copy gửi về.</desc>
<defs>
<marker id="flutter-isolate-msg-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0, 8 3, 0 6" fill="#64748B"/>
</marker>
</defs>
<rect width="800" height="352" fill="#F8FAFC"/>
<!-- zones -->
<rect x="32" y="24" width="320" height="280" rx="8" fill="rgba(15,23,42,0.02)" stroke="rgba(15,23,42,0.10)" stroke-width="0.8"/>
<rect x="48" y="28" width="112" height="12" rx="2" fill="#F8FAFC"/>
<text x="104" y="37" fill="#94A3B8" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.14em">MAIN ISOLATE</text>
<rect x="448" y="24" width="320" height="280" rx="8" fill="rgba(15,23,42,0.02)" stroke="rgba(15,23,42,0.10)" stroke-width="0.8"/>
<rect x="464" y="28" width="120" height="12" rx="2" fill="#F8FAFC"/>
<text x="524" y="37" fill="#94A3B8" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.14em">WORKER ISOLATE</text>
<!-- arrows -->
<path d="M 320,128 H 400 Q 408,128 408,120 V 96 H 480" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#flutter-isolate-msg-arrow)"/>
<rect x="324" y="122" width="72" height="12" rx="2" fill="#F8FAFC"/>
<text x="360" y="131" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">INPUT (COPY)</text>
<path d="M 608,128 V 200" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#flutter-isolate-msg-arrow)"/>
<path d="M 480,232 H 408 Q 400,232 400,224 V 160" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#flutter-isolate-msg-arrow)"/>
<rect x="400" y="226" width="76" height="12" rx="2" fill="#F8FAFC"/>
<text x="438" y="235" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">KẾT QUẢ (COPY)</text>
<!-- nodes -->
<rect x="64" y="96" width="256" height="64" rx="6" fill="#F8FAFC"/>
<rect x="64" y="96" width="256" height="64" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="192" y="130" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">UI + Event Loop</text>
<text x="192" y="144" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">main isolate</text>
<rect x="480" y="64" width="256" height="64" rx="6" fill="#F8FAFC"/>
<rect x="480" y="64" width="256" height="64" rx="6" fill="rgba(2,132,199,0.08)" stroke="#0284C7" stroke-width="1.2"/>
<text x="608" y="98" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">parseBigJson()</text>
<text x="608" y="112" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">việc nặng · worker</text>
<rect x="480" y="200" width="256" height="64" rx="6" fill="#F8FAFC"/>
<rect x="480" y="200" width="256" height="64" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="608" y="234" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Kết quả</text>
<text x="608" y="248" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">trả về bản copy</text>
<!-- legend -->
<line x1="32" y1="328" x2="768" y2="328" stroke="rgba(15,23,42,0.12)" stroke-width="0.8"/>
<text x="32" y="344" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" letter-spacing="0.14em">CHÚ GIẢI</text>
<circle cx="150" cy="340" r="4" fill="#0284C7"/>
<text x="162" y="344" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace">VIỆC NẶNG · WORKER ISOLATE</text>
<line x1="440" y1="340" x2="472" y2="340" stroke="#64748B" stroke-width="1.2" marker-end="url(#flutter-isolate-msg-arrow)"/>
<text x="480" y="344" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace">GỬI BẢN COPY HAI CHIỀU</text>
</svg>
</div>
</div>

<p>Sơ đồ trên là mô hình mặc định: dữ liệu đi qua ranh giới isolate được <strong>copy</strong>, nên không bên nào sửa được object của bên kia. Hai tối ưu không phá vỡ mô hình này (object bất biến được chia sẻ, kết quả gửi bằng <code>Isolate.exit</code> được chuyển quyền sở hữu) nằm ở mục 6.</p>

<p>Mọi app Dart bắt đầu với một isolate, gọi là <strong>main isolate</strong>. Trong Flutter, main isolate (còn gọi là root isolate hay UI isolate) chạy toàn bộ widget, layout, xử lý input và mọi code bạn viết, trừ khi bạn chủ động tạo isolate khác.</p>

<h2>Cách hoạt động</h2>

<h3>1. Bộ nhớ riêng, event loop riêng</h3>

<p>Mỗi isolate có:</p>

<ul>
  <li><strong>Bộ nhớ riêng</strong>: mọi object tạo trong isolate chỉ isolate đó tham chiếu được. Biến top-level và biến <code>static</code> cũng thuộc về từng isolate: isolate mới có bản của riêng nó, khởi tạo lại từ đầu, không thấy giá trị main isolate đã gán.</li>
  <li><strong>Event loop riêng</strong>: microtask queue và event queue (cơ chế ở <a href="futures_async_await.md" target="_blank" rel="noopener">1.3.1</a>) của isolate nào thì chỉ isolate đó xử lý. <code>Future</code>, <code>Timer</code>, <code>Stream</code> trong worker chạy trên event loop của worker.</li>
  <li><strong>Một luồng thực thi tại một thời điểm</strong>: bên trong một isolate, code Dart vẫn chạy tuần tự như bạn đã học. Song song chỉ xảy ra <strong>giữa</strong> các isolate: Dart VM có thể chạy nhiều isolate cùng lúc trên nhiều core CPU.</li>
</ul>

<p>Vì không object nào bị hai isolate cùng giữ, Dart không cần lock cho object Dart; cái giá là mọi thứ muốn qua lại phải đóng gói thành message. So với Kotlin: coroutine trên <code>Dispatchers.Default</code> là nhiều thread <strong>chia sẻ</strong> heap, an toàn nhờ <code>Mutex</code> hay dữ liệu bất biến; isolate là nhiều vùng <strong>không chia sẻ</strong>, an toàn nhờ cấu trúc chứ không nhờ kỷ luật người viết. Bảng ánh xạ đầy đủ ở <a href="../dart/dart_for_kotlin_devs.md" target="_blank" rel="noopener">1.1.1 Dart for Kotlin Developers</a>.</p>

<h4>Ví dụ: cache tỉ giá toàn cục không được chia sẻ</h4>

<p><strong>Bài toán:</strong> app lưu tỉ giá trong một <code>Map</code> top-level để mọi màn hình dùng chung. Một developer cập nhật tỉ giá bên trong worker và mong main isolate thấy giá mới.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li>Main isolate gọi <code>Isolate.run</code> để chạy một hàm trong isolate mới.</li>
  <li>Trong worker, biến <code>exchangeRates</code> là bản của worker, khởi tạo lại từ giá trị ban đầu; worker sửa bản này.</li>
  <li>Main isolate đọc <code>exchangeRates</code> của chính nó và vẫn thấy giá cũ.</li>
</ol>

<div class="mermaid">
sequenceDiagram
    participant Main as Main isolate
    participant W as Worker isolate
    Main-&gt;&gt;W: (1) Isolate.run
    W-&gt;&gt;W: (2) sửa exchangeRates của worker
    W--&gt;&gt;Main: trả 26000
    Main-&gt;&gt;Main: (3) exchangeRates của main vẫn là 25400
</div>

<pre data-lang="dart"><code>// global_cache.dart
import 'dart:isolate';

// Cache tỉ giá dùng chung trong isolate hiện tại (biến top-level)
final Map&lt;String, double&gt; exchangeRates = {'USD': 25400};

Future&lt;void&gt; main() async {
  // (1) Worker cập nhật tỉ giá trong cache của chính nó
  final seenInWorker = await Isolate.run(() {
    exchangeRates['USD'] = 26000; // (2) sửa bản của worker
    return exchangeRates['USD'];
  });

  // (3) Main isolate vẫn thấy giá trị cũ
  print('Worker thấy USD = $seenInWorker');
  print('Main thấy USD   = \${exchangeRates['USD']}');
}</code></pre>

<p><strong>Kết quả</strong> (<code>dart run global_cache.dart</code>):</p>

<pre data-lang="text"><code>Worker thấy USD = 26000.0
Main thấy USD   = 25400.0</code></pre>

<p>Muốn main thấy giá mới thì worker phải <strong>gửi</strong> giá trị về, và main tự gán vào cache của nó. Đây là hệ quả trực tiếp của định nghĩa: không có object dùng chung, chỉ có message.</p>

<h3>2. Isolate.run: tác vụ một lần</h3>

<p><code>Isolate.run</code> (từ Dart 2.19) là cách đơn giản nhất để chạy một việc nặng trong isolate khác:</p>

<pre data-lang="dart"><code>static Future&lt;R&gt; run&lt;R&gt;(FutureOr&lt;R&gt; computation(), {String? debugName})</code></pre>

<p>Một lần gọi làm trọn vòng đời của một worker ngắn hạn:</p>

<ul>
  <li>Tạo isolate mới và gửi hàm <code>computation</code> sang. Hàm có thể là hàm top-level hoặc closure; nếu là closure, các biến nó bắt (capture) được gửi theo.</li>
  <li>Chạy <code>computation</code> trong isolate mới. Nếu nó trả về <code>Future</code>, worker chờ <code>Future</code> đó xong.</li>
  <li>Gửi kết quả về bằng <code>Isolate.exit</code>, nên kết quả <strong>không bị copy</strong>, rồi isolate kết thúc.</li>
  <li>Nếu <code>computation</code> ném lỗi, <code>run</code> ném lại đúng lỗi đó ở phía gọi, nên <code>try</code>/<code>catch</code> quanh <code>await Isolate.run(...)</code> hoạt động như với code thường. Lỗi bất đồng bộ không được bắt trong worker về dưới dạng <code>RemoteError</code>.</li>
  <li><code>debugName</code> đặt tên cho isolate, hiện trong DevTools khi profile.</li>
</ul>

<p><code>Isolate.run</code> <strong>không làm việc chạy nhanh hơn</strong>: nó chuyển việc sang core khác để main isolate rảnh, và cộng thêm chi phí tạo isolate, gửi input, kiểm tra kết quả.</p>

<h4>Ví dụ: parse response JSON 15 MB mà không làm đứng frame</h4>

<p><strong>Bài toán:</strong> API trả về danh mục 200.000 sản phẩm. Cần biến JSON thành <code>List&lt;Product&gt;</code> mà trong lúc đó UI vẫn vẽ frame đều.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li>Có chuỗi JSON lớn (ở đây giả lập bằng <code>jsonEncode</code>). Một <code>Timer.periodic</code> 16 ms đóng vai "vẽ frame" và ghi lại khoảng trễ lớn nhất giữa hai lần chạy.</li>
  <li>(2a) Parse ngay trên main isolate: hàm đồng bộ chiếm event loop, timer không chạy được. (2b) Parse bằng <code>Isolate.run</code>: worker làm việc nặng, event loop của main vẫn xử lý timer đều đặn.</li>
</ol>

<div class="mermaid">
sequenceDiagram
    participant Frame as Timer 16 ms
    participant Main as Main isolate
    participant W as Worker isolate
    Main-&gt;&gt;Main: (1) có body 14,8 MB
    Main-&gt;&gt;Main: (2a) parseCatalog(body) chiếm event loop
    Note over Frame,Main: không frame nào chạy trong khoảng 180 ms
    Main-&gt;&gt;W: (2b) Isolate.run gửi closure kèm body
    loop trong lúc worker parse
        Frame-&gt;&gt;Main: tick mỗi khoảng 16 ms
    end
    W--&gt;&gt;Main: (2b) List Product qua Isolate.exit
</div>

<pre data-lang="dart"><code>// parse_catalog.dart
import 'dart:async';
import 'dart:convert';
import 'dart:isolate';

class Product {
  final int id;
  final String name;
  final int priceVnd;
  Product(this.id, this.name, this.priceVnd);

  factory Product.fromJson(Map&lt;String, dynamic&gt; json) =&gt;
      Product(json['id'] as int, json['name'] as String, json['price'] as int);
}

// Hàm thuần: chỉ nhận String, trả List&lt;Product&gt;, không đụng state bên ngoài
List&lt;Product&gt; parseCatalog(String body) {
  final list = jsonDecode(body) as List&lt;dynamic&gt;;
  return [for (final item in list) Product.fromJson(item as Map&lt;String, dynamic&gt;)];
}

// Giả lập response 200.000 sản phẩm từ API
String fakeResponse() =&gt; jsonEncode([
      for (var i = 0; i &lt; 200000; i++)
        {'id': i, 'name': 'Sản phẩm số $i', 'price': 10000 + i, 'tags': ['sale', 'new']}
    ]);

/// Đo khoảng cách lớn nhất giữa hai "frame" giả lập (Timer 16 ms)
/// trong lúc [work] chạy.
Future&lt;void&gt; measure(String label, Future&lt;List&lt;Product&gt;&gt; Function() work) async {
  var lastTick = DateTime.now();
  var maxGapMs = 0;
  final frames = Timer.periodic(const Duration(milliseconds: 16), (_) {
    final now = DateTime.now();
    final gap = now.difference(lastTick).inMilliseconds;
    if (gap &gt; maxGapMs) maxGapMs = gap;
    lastTick = now;
  });

  final watch = Stopwatch()..start();
  final products = await work();
  watch.stop();
  frames.cancel();
  final tail = DateTime.now().difference(lastTick).inMilliseconds;
  if (tail &gt; maxGapMs) maxGapMs = tail;
  print('$label: \${products.length} sản phẩm, \${watch.elapsedMilliseconds} ms, '
      'frame bị trễ lâu nhất \${maxGapMs} ms');
}

Future&lt;void&gt; main() async {
  final body = fakeResponse(); // (1) có body JSON lớn
  print('Body: \${(body.length / 1024 / 1024).toStringAsFixed(1)} MB');
  await Isolate.run(() =&gt; parseCatalog('[]')); // khởi động trước một lần

  // (2a) Parse ngay trên main isolate: event loop bị chiếm
  await measure('Main isolate  ', () async =&gt; parseCatalog(body));

  // (2b) Parse trong isolate mới bằng Isolate.run
  await measure('Isolate.run   ', () =&gt; Isolate.run(() =&gt; parseCatalog(body)));
}</code></pre>

<p><strong>Kết quả</strong> (<code>dart run parse_catalog.dart</code>, Apple M5, Dart 3.12, số đo dao động vài chục ms giữa các lần chạy):</p>

<pre data-lang="text"><code>Body: 14.8 MB
Main isolate  : 200000 sản phẩm, 179 ms, frame bị trễ lâu nhất 180 ms
Isolate.run   : 200000 sản phẩm, 157 ms, frame bị trễ lâu nhất 21 ms</code></pre>

<p>Tổng thời gian của hai cách gần như nhau. Khác biệt nằm ở cột cuối: trên main isolate, "frame" bị trễ đúng bằng thời gian parse; với <code>Isolate.run</code>, frame chỉ trễ vài ms so với nhịp 16 ms. Đó chính là thứ isolate mua được: <strong>main isolate rảnh</strong>, không phải việc xong sớm hơn.</p>

<h3>3. compute: Isolate.run phiên bản Flutter</h3>

<p>Flutter có hàm <code>compute</code> trong <code>package:flutter/foundation.dart</code>:</p>

<pre data-lang="dart"><code>Future&lt;R&gt; compute&lt;M, R&gt;(ComputeCallback&lt;M, R&gt; callback, M message, {String? debugLabel})</code></pre>

<p>Trên mobile và desktop, <code>await compute(fn, message)</code> tương đương <code>await Isolate.run(() =&gt; fn(message))</code>: từ Flutter 3.7, bản cài đặt cho nền tảng native (<code>_isolates_io.dart</code>) gọi thẳng <code>Isolate.run</code>, nên cũng trả kết quả bằng <code>Isolate.exit</code>. Khác biệt nằm ở web: <code>compute</code> chỉ nhường một nhịp (<code>await null</code>) rồi chạy <code>callback</code> trên chính event loop hiện tại, không có isolate nào, còn <code>Isolate.run</code> ném lỗi <code>Unsupported operation</code> (mục 8).</p>

<pre data-lang="dart"><code>// catalog_repository.dart (code Flutter)
import 'package:flutter/foundation.dart';

Future&lt;List&lt;Product&gt;&gt; parseCatalogInBackground(String body) =&gt;
    compute(parseCatalog, body, debugLabel: 'parse-catalog');</code></pre>

<p>App Flutter có build web thì dùng <code>compute</code> để cùng đoạn code không crash ở mọi platform. Package Dart thuần, server, hoặc app chỉ nhắm mobile/desktop thì dùng <code>Isolate.run</code> vì nhận closure, gọn hơn. Việc chỉ tốn cỡ một mili giây thì API docs của <code>compute</code> gợi ý <code>SchedulerBinding.scheduleTask</code> thay vì tạo isolate.</p>

<h3>4. SendPort và ReceivePort: kênh message giữa hai isolate</h3>

<p><code>Isolate.run</code> giấu đi cơ chế bên dưới. Khi cần nhiều hơn một kết quả (báo tiến độ, gửi nhiều phần), bạn dùng trực tiếp ba API:</p>

<ul>
  <li><strong><code>ReceivePort</code> (cổng nhận)</strong>: đầu nhận, thuộc về isolate tạo ra nó. Nó là một <code>Stream</code> single-subscription của các message đến (Stream ở <a href="streams.md" target="_blank" rel="noopener">1.3.2 Streams</a>), nên dùng được <code>listen</code>, <code>await for</code>, <code>first</code>.</li>
  <li><strong><code>SendPort</code> (cổng gửi)</strong>: lấy từ <code>receivePort.sendPort</code>. Chính <code>SendPort</code> gửi được qua port, nên isolate này có thể đưa "địa chỉ" của mình cho isolate kia. <code>send(message)</code> không chặn, không chờ bên nhận; message được đưa vào event queue của isolate nhận và xử lý khi event loop của nó tới lượt.</li>
  <li><strong><code>Isolate.spawn(entryPoint, message)</code></strong>: tạo isolate mới chạy <code>entryPoint(message)</code>. Thường <code>message</code> chứa <code>SendPort</code> của main để worker có đường gửi về. Tham số <code>onError</code> và <code>onExit</code> nhận một <code>SendPort</code>: khi worker gặp lỗi không bắt hoặc kết thúc, VM tự gửi thông báo vào đó.</li>
</ul>

<p>Hai quy tắc vòng đời:</p>

<ol>
  <li><strong>Port đang mở giữ isolate sống.</strong> Còn <code>ReceivePort</code> chưa đóng thì event loop vẫn chờ và isolate không kết thúc; với main isolate của chương trình Dart, process không thoát. Đóng port (<code>close()</code>) khi không cần nữa.</li>
  <li><strong><code>Isolate.exit(port, message)</code></strong> gửi message cuối rồi kết thúc isolate ngay (code sau nó, kể cả <code>finally</code>, không chạy). Message gửi kiểu này được chuyển quyền sở hữu, không copy.</li>
</ol>

<h4>Ví dụ: worker tính checksum file lớn và báo tiến độ</h4>

<p><strong>Bài toán:</strong> trước khi upload một file sao lưu vài chục MB, app tính checksum để server kiểm tra toàn vẹn, đồng thời hiện thanh tiến độ. Cần nhiều message từ worker về main, nên <code>Isolate.run</code> không đủ.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li>Main tạo <code>ReceivePort</code>, spawn worker kèm <code>SendPort</code> và <strong>đường dẫn</strong> file. <code>onError</code> và <code>onExit</code> cũng trỏ vào port này để main biết khi worker chết.</li>
  <li>Worker tự mở file theo đường dẫn. Gửi đường dẫn (vài chục byte) rẻ hơn nhiều so với gửi nội dung file.</li>
  <li>Worker đọc từng MB và cứ mỗi 25% gửi một message <code>('progress', percent)</code>.</li>
  <li>Xong, worker gửi <code>('done', checksum)</code> bằng <code>Isolate.exit</code>, gửi và kết thúc trong một lệnh.</li>
  <li>Main dùng <code>await for</code> trên port, phân loại message bằng <code>switch</code> pattern (<a href="../dart/control_flow_patterns.md" target="_blank" rel="noopener">1.2.3 Control Flow and Patterns</a>).</li>
  <li>Dù thành công hay lỗi, main đóng port trong <code>finally</code>.</li>
</ol>

<div class="mermaid">
sequenceDiagram
    participant Main as Main isolate
    participant W as Worker isolate
    Main-&gt;&gt;W: (1) Isolate.spawn(checksumWorker, sendPort và path)
    W-&gt;&gt;W: (2) mở file theo path
    loop mỗi 25%
        W--&gt;&gt;Main: (3) progress
        Main-&gt;&gt;Main: (5) in tiến độ
    end
    W--&gt;&gt;Main: (4) Isolate.exit với done và checksum
    Main-&gt;&gt;Main: (5) trả checksum
    Main-&gt;&gt;Main: (6) port.close()
</div>

<pre data-lang="dart"><code>// file_checksum.dart
import 'dart:io';
import 'dart:isolate';

void checksumWorker((SendPort, String) args) {
  final (SendPort port, String path) = args;
  // (2) Worker tự mở file theo đường dẫn: không gửi bytes qua port
  final file = File(path).openSync();
  final total = file.lengthSync();
  var a = 1, b = 0, read = 0, nextReport = 25;

  while (read &lt; total) {
    final chunk = file.readSync(1 &lt;&lt; 20); // đọc từng 1 MB
    for (final byte in chunk) {
      a = (a + byte) % 65521; // Adler-32
      b = (b + a) % 65521;
    }
    read += chunk.length;
    final percent = read * 100 ~/ total;
    if (percent &gt;= nextReport) {
      port.send(('progress', percent)); // (3) báo tiến độ, không chờ main
      nextReport += 25;
    }
  }
  file.closeSync();
  // (4) Gửi kết quả cuối rồi kết thúc isolate trong cùng một lệnh
  Isolate.exit(port, ('done', (b &lt;&lt; 16) | a));
}

Future&lt;int&gt; checksumInBackground(String path) async {
  // (1) Main tạo ReceivePort, spawn worker kèm SendPort của port đó.
  //     onError/onExit cũng gửi vào port này để main biết khi worker chết.
  final port = ReceivePort();
  await Isolate.spawn(checksumWorker, (port.sendPort, path),
      onError: port.sendPort, onExit: port.sendPort);

  try {
    await for (final message in port) {
      // (5) Main xử lý từng message theo loại
      switch (message) {
        case ('progress', int percent):
          print('Đã xử lý $percent%');
        case ('done', int checksum):
          return checksum;
        case [String error, String stack]: // từ onError
          throw RemoteError(error, stack);
        case null: // từ onExit: worker dừng mà chưa gửi 'done'
          throw StateError('Worker kết thúc mà không gửi kết quả');
      }
    }
    throw StateError('Port đã đóng');
  } finally {
    port.close(); // (6) luôn đóng cổng, kể cả khi lỗi
  }
}

Future&lt;void&gt; main() async {
  final path = '\${Directory.systemTemp.path}/backup.bin';
  File(path).writeAsBytesSync(List&lt;int&gt;.generate(32 &lt;&lt; 20, (i) =&gt; i % 251));

  final checksum = await checksumInBackground(path);
  print('Adler-32: 0x\${checksum.toRadixString(16)}');

  try {
    await checksumInBackground('/khong-ton-tai/backup.bin');
  } on RemoteError catch (e) {
    print('Worker lỗi: \${e.toString().split(':').first}');
  }
}</code></pre>

<p><strong>Kết quả</strong> (<code>dart run file_checksum.dart</code>):</p>

<pre data-lang="text"><code>Đã xử lý 25%
Đã xử lý 50%
Đã xử lý 75%
Đã xử lý 100%
Adler-32: 0xdd78a656
Worker lỗi: PathNotFoundException</code></pre>

<p>Lần gọi thứ hai cho thấy vì sao cần <code>onError</code>: file không tồn tại, worker chết ngay ở bước (2). Không có <code>onError</code>, main sẽ chờ message <code>done</code> mãi mãi (xem "Sai lầm thường gặp"). Message từ <code>onError</code> là một <code>List</code> hai <code>String</code> (lỗi và stack trace), từ <code>onExit</code> là <code>null</code>.</p>

<h3>5. Worker sống lâu trao đổi hai chiều</h3>

<p><code>Isolate.run</code> tạo isolate mới mỗi lần gọi và mọi input phải gửi lại từ đầu. Điều đó ổn cho việc thỉnh thoảng mới làm. Khi cùng một loại việc lặp lại nhiều lần trên cùng một dữ liệu lớn, ví dụ tìm kiếm trên chỉ mục mỗi lần người dùng gõ phím, dữ liệu nên <strong>ở lại trong worker</strong>. Main chỉ gửi yêu cầu nhỏ và nhận kết quả nhỏ.</p>

<p>Worker sống lâu phải tự làm bốn việc mà <code>Isolate.run</code> làm hộ: <strong>bắt tay</strong> (trao <code>SendPort</code> cho nhau), <strong>ghép yêu cầu với kết quả</strong> (mỗi yêu cầu mang một <code>id</code>, main giữ <code>Map&lt;int, Completer&gt;</code>; <code>Completer</code> ở <a href="futures_async_await.md" target="_blank" rel="noopener">1.3.1</a>), <strong>báo lỗi</strong> từng yêu cầu bằng <code>RemoteError</code> thay vì để lỗi giết worker, và <strong>đóng</strong> đúng cách. Cách tổ chức dưới đây theo ví dụ "robust ports" của tài liệu Dart: bước bắt tay dùng <code>RawReceivePort</code> (nhận một <code>handler</code> gọi trực tiếp), sau đó bọc thành <code>ReceivePort</code> bằng <code>ReceivePort.fromRawReceivePort</code>.</p>

<h4>Ví dụ: worker giữ chỉ mục tìm kiếm sản phẩm</h4>

<p><strong>Bài toán:</strong> màn hình tìm kiếm cần tra từ khoá trên hơn 100.000 tên sản phẩm. Dựng chỉ mục (index) tốn thời gian và chỉ nên làm một lần; mỗi lần tìm chỉ gửi từ khoá sang và nhận danh sách kết quả về.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li>Main tạo <code>RawReceivePort</code> làm cổng khởi tạo, spawn worker và gửi kèm <code>SendPort</code> của cổng đó cùng danh sách tên sản phẩm (copy một lần duy nhất).</li>
  <li>Worker dựng index trong bộ nhớ của nó, tạo <code>ReceivePort</code> riêng (<code>inbox</code>) và gửi <code>inbox.sendPort</code> về main.</li>
  <li>Main nhận <code>SendPort</code> của worker, bọc cổng khởi tạo thành <code>ReceivePort</code> để nghe kết quả. Kênh hai chiều đã sẵn sàng.</li>
  <li>Mỗi lần <code>search</code>, main tạo <code>id</code>, lưu <code>Completer</code> vào <code>_pending</code>, gửi <code>(id, query)</code>.</li>
  <li>Worker tra index và gửi <code>(id, kết quả)</code>, hoặc <code>(id, RemoteError)</code> nếu yêu cầu lỗi.</li>
  <li>Main nhận message, lấy <code>Completer</code> theo <code>id</code> và hoàn thành <code>Future</code> của đúng lời gọi đó.</li>
  <li><code>close()</code>: main gửi <code>'shutdown'</code>.</li>
  <li>(8a) Worker đóng <code>inbox</code>; không còn port nào mở nên worker tự kết thúc. (8b) Main đóng port nhận khi <code>_pending</code> rỗng.</li>
</ol>

<div class="archify-embed" data-src="archify/flutter/s01-flutter-isolate-worker.html" data-title="Worker isolate sống lâu: trao đổi hai chiều">
  <a class="archify-full" href="archify/flutter/s01-flutter-isolate-worker.html" target="_blank" rel="noopener">Mở toàn màn hình ↗</a>
</div>

<pre data-lang="dart"><code>// search_index_worker.dart
import 'dart:async';
import 'dart:isolate';

class SearchIndexWorker {
  final SendPort _commands; // cổng gửi lệnh sang worker
  final ReceivePort _responses; // cổng nhận kết quả từ worker
  final Map&lt;int, Completer&lt;List&lt;String&gt;&gt;&gt; _pending = {};
  int _nextId = 0;
  bool _closed = false;

  SearchIndexWorker._(this._responses, this._commands) {
    _responses.listen(_handleResponse);
  }

  static Future&lt;SearchIndexWorker&gt; spawn(List&lt;String&gt; productNames) async {
    // (1) Main tạo cổng khởi tạo rồi spawn worker, gửi kèm dữ liệu cần index
    final initPort = RawReceivePort();
    final connection = Completer&lt;(ReceivePort, SendPort)&gt;.sync();
    initPort.handler = (SendPort commandPort) {
      // (3) Main nhận SendPort của worker: kênh hai chiều đã sẵn sàng
      connection.complete((ReceivePort.fromRawReceivePort(initPort), commandPort));
    };
    try {
      await Isolate.spawn(_workerMain, (initPort.sendPort, productNames),
          debugName: 'search-index');
    } on Object {
      initPort.close();
      rethrow;
    }
    final (responses, commands) = await connection.future;
    return SearchIndexWorker._(responses, commands);
  }

  Future&lt;List&lt;String&gt;&gt; search(String query) {
    if (_closed) throw StateError('Worker đã đóng');
    // (4) Main gắn id cho request, lưu Completer, gửi (id, query)
    final id = _nextId++;
    final completer = Completer&lt;List&lt;String&gt;&gt;();
    _pending[id] = completer;
    _commands.send((id, query));
    return completer.future;
  }

  void _handleResponse(dynamic message) {
    // (6) Main nhận (id, kết quả), tìm đúng Completer để hoàn thành
    final (int id, Object result) = message as (int, Object);
    final completer = _pending.remove(id)!;
    if (result is RemoteError) {
      completer.completeError(result);
    } else {
      completer.complete(result as List&lt;String&gt;);
    }
    if (_closed &amp;&amp; _pending.isEmpty) _responses.close(); // (8b)
  }

  void close() {
    if (_closed) return;
    // (7) Main gửi lệnh shutdown; chỉ đóng cổng nhận khi hết request treo
    _closed = true;
    _commands.send('shutdown');
    if (_pending.isEmpty) _responses.close(); // (8b)
  }

  // ===== Phần dưới chạy trong worker isolate =====
  static void _workerMain((SendPort, List&lt;String&gt;) args) {
    final (SendPort mainPort, List&lt;String&gt; names) = args;

    // (2) Worker dựng index một lần (việc nặng), giữ trong bộ nhớ của nó
    final index = &lt;String, Set&lt;String&gt;&gt;{};
    for (final name in names) {
      for (final word in name.toLowerCase().split(' ')) {
        index.putIfAbsent(word, () =&gt; {}).add(name);
      }
    }

    // (2) Tạo cổng nhận lệnh riêng và gửi SendPort của nó về main
    final inbox = ReceivePort();
    mainPort.send(inbox.sendPort);

    inbox.listen((dynamic message) {
      if (message == 'shutdown') {
        inbox.close(); // (8a) hết cổng mở, worker tự kết thúc
        return;
      }
      // (5) Worker tra index rồi gửi (id, kết quả) hoặc (id, RemoteError)
      final (int id, String query) = message as (int, String);
      try {
        if (query.trim().isEmpty) throw ArgumentError('Từ khoá rỗng');
        final hits = index[query.toLowerCase()] ?? const &lt;String&gt;{};
        mainPort.send((id, hits.toList()..sort()));
      } catch (e, s) {
        mainPort.send((id, RemoteError(e.toString(), s.toString())));
      }
    });
  }
}

Future&lt;void&gt; main() async {
  final names = [
    'Áo thun cotton trắng',
    'Áo khoác gió',
    'Quần jean xanh',
    'Giày chạy bộ trắng',
    for (var i = 0; i &lt; 100000; i++) 'Mã hàng $i',
  ];

  final watch = Stopwatch()..start();
  final worker = await SearchIndexWorker.spawn(names);
  print('Worker sẵn sàng sau \${watch.elapsedMilliseconds} ms');

  // Hai request gửi gần như cùng lúc, kết quả về đúng chỗ nhờ id
  final results = await Future.wait([worker.search('trắng'), worker.search('áo')]);
  print('trắng -&gt; \${results[0]}');
  print('áo    -&gt; \${results[1]}');

  try {
    await worker.search('  ');
  } on RemoteError catch (e) {
    print('Lỗi từ worker: $e');
  }

  worker.close();
  print('Đã gửi shutdown, chương trình kết thúc khi mọi port đã đóng');
}</code></pre>

<p><strong>Kết quả</strong> (<code>dart run search_index_worker.dart</code>; số ms thay đổi theo lần chạy):</p>

<pre data-lang="text"><code>Worker sẵn sàng sau 52 ms
trắng -&gt; [Giày chạy bộ trắng, Áo thun cotton trắng]
áo    -&gt; [Áo khoác gió, Áo thun cotton trắng]
Lỗi từ worker: Invalid argument(s): Từ khoá rỗng
Đã gửi shutdown, chương trình kết thúc khi mọi port đã đóng</code></pre>

<p>Process thoát ngay sau dòng cuối. Đó là cách kiểm chứng bước (8b): quên đóng <code>_responses</code> thì chương trình treo ở đó, vì port của main isolate còn mở. Quên đóng <code>inbox</code> thì process vẫn thoát, vì chương trình Dart kết thúc khi main isolate kết thúc và isolate con bị dừng theo; lỗi đó chỉ lộ ra khi main sống lâu (như app Flutter): worker không bao giờ tự kết thúc và chiếm bộ nhớ. Thứ tự sắp xếp đặt "Giày" trước "Áo" vì <code>sort()</code> so sánh theo code unit Unicode, không theo bảng chữ cái tiếng Việt.</p>

<p>Viết tay worker như trên giúp hiểu cơ chế. Trong dự án thật, tài liệu Flutter gợi ý các package như <code>worker_manager</code> hoặc <code>isolate_agents</code> khi cần quản lý nhiều worker; chúng xây trên đúng các API vừa học.</p>

<h3>6. Dữ liệu gửi được và chi phí copy</h3>

<h4>Cái gì gửi được</h4>

<p>Quy tắc phụ thuộc vào việc hai isolate có <strong>chung code</strong> hay không:</p>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Isolate tạo bằng</th>
      <th style="padding:8px 12px;text-align:left;">Gửi được</th>
      <th style="padding:8px 12px;text-align:left;">Không gửi được</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>Isolate.spawn</code>, <code>Isolate.run</code>, <code>compute</code> (chung code, cùng isolate group)</td>
      <td style="padding:8px 12px;">Gần như mọi object: số, <code>String</code>, <code>List</code>/<code>Map</code>/<code>Set</code>, record, instance class tự viết, closure, <code>SendPort</code>, <code>TransferableTypedData</code></td>
      <td style="padding:8px 12px;">Object giữ tài nguyên native (socket, file đang mở như <code>RandomAccessFile</code>), <code>ReceivePort</code>, <code>Timer</code>, <code>Future</code>, <code>Completer</code>, <code>DynamicLibrary</code>, <code>Finalizer</code>/<code>NativeFinalizer</code>, <code>UserTag</code>, class đánh dấu <code>@pragma('vm:isolate-unsendable')</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>Isolate.spawnUri</code> (code khác, chạy từ URI khác)</td>
      <td style="padding:8px 12px;">Danh sách hẹp: <code>null</code>, <code>bool</code>, số, <code>String</code>, list/map/set tạo bằng literal hoặc constructor của <code>List</code>/<code>Map</code>/<code>Set</code>, <code>TransferableTypedData</code>, <code>SendPort</code>, <code>Capability</code>, một số <code>Type</code></td>
      <td style="padding:8px 12px;">Mọi thứ còn lại, kể cả instance class tự viết và <code>Uint8List</code></td>
    </tr>
  </tbody>
</table>

<p>Trong app Flutter bạn gần như chỉ gặp dòng thứ nhất. Việc kiểm tra diễn ra <strong>lúc runtime</strong>, khi <code>send</code> hoặc <code>Isolate.run</code> duyệt qua toàn bộ object graph của message. Gửi object không hợp lệ ném <code>ArgumentError</code> kèm đường đi tới object vi phạm (ví dụ ở "Sai lầm thường gặp"). Thử trên Dart 3.12: <code>Timer</code>, <code>ReceivePort</code>, <code>RandomAccessFile</code>, <code>Future</code>, <code>Completer</code> bị từ chối (<code>Timer</code>, <code>Future</code>, <code>Completer</code> không có tên trong danh sách của API docs nhưng VM vẫn chặn); <code>File</code> (chỉ chứa đường dẫn) gửi được.</p>

<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body">Closure gửi sang isolate mang theo mọi biến nó bắt. Trong một method của class, chỉ cần đọc một field là closure bắt cả <code>this</code>, kéo theo <strong>toàn bộ</strong> object và mọi thứ object đó tham chiếu. Dart VM hiện còn có thể bắt nhiều biến hơn mức closure thực sự dùng (theo dõi ở dart-lang/sdk#36983): khi đo số liệu cho bài này, closure <code>() =&gt; jsonDecode(body)</code> bị từ chối vì dùng chung context với một <code>StreamIterator</code> khai báo trong cùng hàm, dù closure không hề đọc biến đó. Cách an toàn mà API docs của <code>Isolate.run</code> khuyên: viết một hàm helper nhận đủ dữ liệu qua tham số, rồi gọi <code>Isolate.run</code> bên trong helper đó.</div></div>

<h4>Copy, chia sẻ hay chuyển quyền sở hữu</h4>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Cách gửi</th>
      <th style="padding:8px 12px;text-align:left;">Điều gì xảy ra</th>
      <th style="padding:8px 12px;text-align:left;">Chi phí</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>SendPort.send</code> với object có thể sửa (list, map, object thường, <code>Uint8List</code>)</td>
      <td style="padding:8px 12px;">Copy sâu toàn bộ object graph</td>
      <td style="padding:8px 12px;">Tỉ lệ tuyến tính với kích thước graph, trả ở phía gửi</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>SendPort.send</code> với object bất biến (<code>String</code>, số, list byte không sửa được)</td>
      <td style="padding:8px 12px;">Chia sẻ tham chiếu, không copy</td>
      <td style="padding:8px 12px;">Gần như bằng 0</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>Isolate.exit(port, message)</code>, và kết quả của <code>Isolate.run</code>/<code>compute</code></td>
      <td style="padding:8px 12px;">Chuyển quyền sở hữu graph sang isolate nhận, không copy</td>
      <td style="padding:8px 12px;">Vẫn duyệt graph một lần để kiểm tra mọi object gửi được; bên nhận thường nhận trong thời gian hằng số</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>TransferableTypedData</code></td>
      <td style="padding:8px 12px;"><code>fromList</code> copy bytes một lần; sau đó <code>send</code> chỉ chuyển quyền sở hữu</td>
      <td style="padding:8px 12px;"><code>fromList</code> tuyến tính theo số byte; <code>send</code> và <code>materialize</code> hằng số</td>
    </tr>
  </tbody>
</table>

<p>Số đo minh hoạ cho các con số trên: MacBook Apple M5, macOS, Dart 3.12, vài lần chạy; JIT là <code>dart run</code>, AOT là bản <code>dart compile exe</code>. Kết quả dao động mạnh theo tải máy nên bảng chỉ ghi khoảng, dùng để so bậc độ lớn. Ở các dòng "gửi + nhận", worker sống lâu gửi trả lại đúng message nó nhận: <code>Uint8List</code> bị copy hai lần, còn <code>TransferableTypedData</code> chỉ copy một lần ở <code>fromList</code>, hai lượt gửi đều là chuyển quyền sở hữu.</p>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Thao tác</th>
      <th style="padding:8px 12px;text-align:left;">JIT</th>
      <th style="padding:8px 12px;text-align:left;">AOT</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>Isolate.run</code> lần đầu tiên trong process</td>
      <td style="padding:8px 12px;">4–7 ms</td>
      <td style="padding:8px 12px;">0,2–0,8 ms</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>Isolate.run(() =&gt; 0)</code> các lần sau, trung bình</td>
      <td style="padding:8px 12px;">0,07–0,14 ms</td>
      <td style="padding:8px 12px;">0,02–0,03 ms</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>Isolate.spawnUri</code> một file Dart nhỏ (group mới)</td>
      <td style="padding:8px 12px;">20–70 ms</td>
      <td style="padding:8px 12px;">không đo</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Round-trip một <code>int</code> tới worker sống lâu</td>
      <td style="padding:8px 12px;">0,005–0,01 ms</td>
      <td style="padding:8px 12px;">khoảng 0,002 ms</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Gửi + nhận <code>List&lt;int&gt;</code> 2 triệu phần tử (khoảng 16 MB)</td>
      <td style="padding:8px 12px;">8–19 ms</td>
      <td style="padding:8px 12px;">6–19 ms</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Gửi + nhận <code>Uint8List</code> 16 MB</td>
      <td style="padding:8px 12px;">3,5–11 ms</td>
      <td style="padding:8px 12px;">3–14 ms</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Riêng lệnh <code>send</code> một <code>Uint8List</code> 16 MB</td>
      <td style="padding:8px 12px;">1,6–4 ms</td>
      <td style="padding:8px 12px;">1,2–6 ms</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Riêng <code>TransferableTypedData.fromList</code> 16 MB</td>
      <td style="padding:8px 12px;">0,7–1,9 ms</td>
      <td style="padding:8px 12px;">0,6–1 ms</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>TransferableTypedData</code> 16 MB: <code>fromList</code> + gửi + nhận</td>
      <td style="padding:8px 12px;">1–3 ms</td>
      <td style="padding:8px 12px;">1–5 ms</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Riêng lệnh <code>send</code> một <code>TransferableTypedData</code> 16 MB</td>
      <td style="padding:8px 12px;">0,02–1 ms</td>
      <td style="padding:8px 12px;">0,04–0,3 ms</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Parse JSON 1 MB trực tiếp / qua <code>Isolate.run</code></td>
      <td style="padding:8px 12px;">khoảng 8 / 13–14 ms</td>
      <td style="padding:8px 12px;">khoảng 8 / 11–14 ms</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Parse JSON 106 KB trực tiếp / qua <code>Isolate.run</code></td>
      <td style="padding:8px 12px;">1,1–1,3 / 1,1–1,3 ms</td>
      <td style="padding:8px 12px;">0,7–0,9 / 0,9 ms</td>
    </tr>
  </tbody>
</table>

<p>Ba điều rút ra:</p>

<ul>
  <li>Với isolate cùng group (<code>spawn</code>, <code>run</code>, <code>compute</code>), bản thân việc tạo isolate rẻ nhờ isolate group (Deep Dive bên dưới): khoảng 0,1 ms ở JIT, vài chục micro giây ở AOT; chỉ lần đầu trong process đắt hơn. Tài liệu Flutter và Dart nói đúng là cả spawn lẫn copy đều có overhead, nhưng trên máy này phần đắt là <strong>dữ liệu</strong>: copy input, duyệt kết quả. <code>spawnUri</code> đắt hơn hàng trăm lần vì phải tạo group mới và nạp code từ URI.</li>
  <li><code>List&lt;int&gt;</code> 2 triệu phần tử và <code>Uint8List</code> 16 MB chiếm bộ nhớ ngang nhau, nhưng list thường tốn khoảng gấp đôi khi gửi: VM phải duyệt từng slot phần tử, còn <code>Uint8List</code> được copy nguyên một khối byte liền nhau. Dữ liệu nhị phân nên để ở dạng typed data.</li>
  <li>Với JSON 1 MB, đi qua <code>Isolate.run</code> lâu hơn parse trực tiếp, vì cộng thêm việc tạo isolate và kiểm tra graph <code>Map</code>/<code>List</code> kết quả trước khi chuyển.</li>
</ul>

<p>Điện thoại, nhất là máy yếu, chậm hơn máy đo nhiều lần: dùng các con số này để so sánh tương đối, còn ngưỡng thật phải đo trên thiết bị bạn hỗ trợ bằng DevTools (2.2.2 DevTools and Debugging (chưa có bài)).</p>

<h4>TransferableTypedData</h4>

<p><code>TransferableTypedData</code> (có từ Dart 2.4) là một khối byte có thể <strong>chuyển</strong> giữa các isolate:</p>

<p><code>fromList(List&lt;TypedData&gt;)</code> copy bytes vào khối mới (thời gian tỉ lệ số byte); gửi qua port tốn thời gian hằng số và bản bên gửi không dùng được nữa; <code>materialize()</code> trả về <code>ByteBuffer</code> và chỉ gọi được <strong>một lần</strong>, gọi lần hai hoặc gọi trên bản đã gửi đi ném <code>ArgumentError</code>.</p>

<p>Trong cùng isolate group, gửi một <code>Uint8List</code> thường chỉ là một lần copy nguyên khối byte, tốn ngang <code>fromList</code> (bảng trên). Với một chặng gửi, <code>TransferableTypedData</code> vì thế không nhanh hơn rõ rệt: nó chỉ dời lần copy từ lúc <code>send</code> sang lúc <code>fromList</code>. Nó có giá trị khi cần lệnh <code>send</code> gần như tức thời, khi cùng khối bytes đi qua nhiều isolate liên tiếp (copy một lần thay vì mỗi chặng một lần), khi gửi sang isolate <code>spawnUri</code> (không nhận <code>Uint8List</code>), và khi muốn chắc chỉ một bên dùng được dữ liệu.</p>

<h4>Ví dụ: kiểm tra ảnh quá tối trước khi upload</h4>

<p><strong>Bài toán:</strong> app chụp ảnh 12 MP (khoảng 46 MB dạng RGBA) và cần tính độ sáng trung bình để cảnh báo ảnh thiếu sáng. Tính trên 12 triệu pixel là việc của worker; buffer lớn nên chuyển bằng <code>TransferableTypedData</code>.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li>Main đóng gói buffer pixel bằng <code>fromList</code> (copy một lần).</li>
  <li>Closure của <code>Isolate.run</code> bắt <code>transferable</code>; gửi closure sang worker chỉ chuyển quyền sở hữu khối byte.</li>
  <li>Worker <code>materialize()</code> ra <code>Uint8List</code> mà không copy thêm, rồi tính độ sáng.</li>
  <li>Main thử <code>materialize()</code> bản của mình và nhận lỗi, vì khối byte đã thuộc về worker.</li>
</ol>

<div class="mermaid">
sequenceDiagram
    participant Main as Main isolate
    participant W as Worker isolate
    Main-&gt;&gt;Main: (1) TransferableTypedData.fromList
    Main-&gt;&gt;W: (2) Isolate.run, chuyển quyền sở hữu khối byte
    W-&gt;&gt;W: (3) materialize và tính độ sáng
    W--&gt;&gt;Main: trả 40
    Main-&gt;&gt;Main: (4) materialize lần nữa ném ArgumentError
</div>

<pre data-lang="dart"><code>// photo_brightness_check.dart
import 'dart:isolate';
import 'dart:typed_data';

// Chạy trong worker: độ sáng trung bình (0–255) của ảnh RGBA
int averageBrightness(TransferableTypedData transferable) {
  final pixels = transferable.materialize().asUint8List(); // (3) không copy thêm
  var sum = 0;
  for (var i = 0; i &lt; pixels.length; i += 4) {
    sum += (pixels[i] * 299 + pixels[i + 1] * 587 + pixels[i + 2] * 114) ~/ 1000;
  }
  return sum ~/ (pixels.length ~/ 4);
}

Future&lt;void&gt; main() async {
  final pixels = Uint8List(4000 * 3000 * 4); // ảnh RGBA 12 MP, khoảng 46 MB
  for (var i = 0; i &lt; pixels.length; i++) {
    pixels[i] = 40; // ảnh chụp thiếu sáng
  }

  // (1) Đóng gói bytes: bước này copy một lần, thời gian tỉ lệ số byte
  final transferable = TransferableTypedData.fromList([pixels]);

  // (2) Gửi sang worker: chỉ chuyển quyền sở hữu, thời gian hằng số
  final brightness = await Isolate.run(() =&gt; averageBrightness(transferable));
  print('Độ sáng trung bình: $brightness/255');

  try {
    transferable.materialize(); // (4) bản ở main đã bị chuyển đi
  } on ArgumentError catch (e) {
    print(e.message);
  }
}</code></pre>

<p><strong>Kết quả</strong> (<code>dart run photo_brightness_check.dart</code>):</p>

<pre data-lang="text"><code>Độ sáng trung bình: 40/255
Attempt to materialize object that was transferred already.</code></pre>

<p>Lưu ý <code>pixels</code> gốc vẫn còn trong main isolate, vì <code>fromList</code> đã copy. Nếu không cần nữa, bỏ tham chiếu tới nó để GC thu hồi.</p>

<h3>7. Background isolate gọi plugin qua platform channel</h3>

<p>Plugin Flutter (camera, <code>shared_preferences</code>, mã hoá native...) nói chuyện với code Kotlin/Swift qua platform channel, và mặc định chỉ main isolate có đường đi tới platform. Trước Flutter 3.7, gọi plugin trong isolate khác sẽ lỗi. Từ Flutter 3.7, isolate khác dùng được plugin nếu được "giới thiệu" bởi main isolate: main lấy <code>RootIsolateToken.instance</code> (từ <code>package:flutter/services.dart</code>; ngoài main isolate getter này trả <code>null</code>), gửi token sang worker, và worker gọi <code>BackgroundIsolateBinaryMessenger.ensureInitialized(token)</code> <strong>trước</strong> mọi lời gọi plugin. Sau đó plugin dùng platform channel như bình thường, phản hồi từ native về đúng event loop của worker.</p>

<p>Giới hạn cần biết ở mức nhận biết:</p>

<ul>
  <li>Background isolate gửi được message tới platform và nhận phản hồi, nhưng <strong>không nhận được message do platform chủ động gửi</strong>. Một truy vấn một lần chạy được; một listener sống lâu như snapshot listener của Firestore thì không.</li>
  <li>Không dùng được <code>rootBundle</code> để đọc asset, và không làm được bất kỳ việc gì liên quan tới widget hay UI trong isolate khác. Toàn bộ UI gắn với main isolate.</li>
</ul>

<h4>Ví dụ: xuất CSV đơn hàng, đọc cấu hình từ SharedPreferences trong worker</h4>

<p><strong>Bài toán:</strong> dựng file CSV hàng chục nghìn đơn hàng là việc nặng; ký tự phân cách do người dùng chọn và được lưu trong <code>shared_preferences</code> (một plugin, học ở 6.1.1 SharedPreferences and Secure Storage (chưa có bài)). Worker cần đọc cấu hình đó.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li>Main lấy <code>RootIsolateToken.instance!</code>; token gửi được qua port.</li>
  <li>Closure của <code>Isolate.run</code> bắt token và danh sách đơn; trong worker gọi <code>ensureInitialized(token)</code> trước tiên.</li>
  <li>Worker gọi plugin <code>SharedPreferences</code> để đọc ký tự phân cách.</li>
  <li>Worker dựng chuỗi CSV và trả về main.</li>
</ol>

<div class="mermaid">
sequenceDiagram
    participant Main as Main isolate
    participant W as Worker isolate
    participant Native as Platform Kotlin hoặc Swift
    Main-&gt;&gt;Main: (1) RootIsolateToken.instance
    Main-&gt;&gt;W: (2) Isolate.run với token và orders
    W-&gt;&gt;W: (2) ensureInitialized(token)
    W-&gt;&gt;Native: (3) SharedPreferences.getInstance
    Native--&gt;&gt;W: (3) giá trị csv_separator
    W--&gt;&gt;Main: (4) chuỗi CSV
</div>

<pre data-lang="dart"><code>// order_export.dart (code Flutter, cần package shared_preferences)
import 'dart:isolate';

import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';

class OrderRow {
  final String id;
  final int totalVnd;
  const OrderRow(this.id, this.totalVnd);
}

Future&lt;String&gt; exportOrdersCsv(List&lt;OrderRow&gt; orders) {
  final token = RootIsolateToken.instance!; // (1) chỉ có giá trị ở main isolate
  return _buildCsvInBackground(token, orders);
}

// Hàm top-level: closure chỉ bắt token và orders
Future&lt;String&gt; _buildCsvInBackground(RootIsolateToken token, List&lt;OrderRow&gt; orders) =&gt;
    Isolate.run(() async {
      BackgroundIsolateBinaryMessenger.ensureInitialized(token); // (2)
      final prefs = await SharedPreferences.getInstance(); // (3) gọi plugin
      final separator = prefs.getString('csv_separator') ?? ',';
      return [
        'id\${separator}total', // (4) dựng CSV
        for (final order in orders) '\${order.id}$separator\${order.totalVnd}',
      ].join('\\n');
    });</code></pre>

<p><strong>Kết quả:</strong> gọi <code>exportOrdersCsv</code> trên Android hoặc iOS trả về chuỗi CSV dùng đúng ký tự phân cách đã lưu. Bỏ dòng (2) thì lời gọi plugin ở (3) ném <code>StateError</code> báo <code>BackgroundIsolateBinaryMessenger.instance</code> chưa hợp lệ. Đây là code Flutter (không chạy bằng <code>dart run</code>), viết theo mẫu trong tài liệu "Concurrency and isolates" của Flutter.</p>

<h3>8. Isolate trên web</h3>

<p>Nền tảng web của Dart, gồm cả Flutter web, <strong>không hỗ trợ isolate</strong>. Khi biên dịch sang JavaScript, <code>dart:isolate</code> vẫn import được và code vẫn build, nhưng gọi tới sẽ lỗi lúc chạy. Thử <code>Isolate.run(() =&gt; 42)</code> biên dịch bằng <code>dart compile js</code> (Dart 3.12) rồi chạy, kết quả là:</p>

<pre data-lang="text"><code>Unsupported operation: new RawReceivePort</code></pre>

<p>Hệ quả cho app Flutter có build web:</p>

<ul>
  <li>Dùng <code>compute</code> thay vì <code>Isolate.run</code> (mục 3): code không crash nhưng <strong>vẫn chặn UI</strong> như chạy trực tiếp.</li>
  <li>Nếu việc nặng thật sự quan trọng trên web, các lựa chọn là chia nhỏ việc thành nhiều đoạn và nhường event loop giữa các đoạn (<code>await</code> một <code>Future</code>, cơ chế ở <a href="futures_async_await.md" target="_blank" rel="noopener">1.3.1</a>), đẩy việc về server, hoặc dùng Web Worker qua JS interop (ngoài phạm vi bài này).</li>
</ul>

<h2>Deep Dive: Isolate group và cái giá thật của một message</h2>

<p>Định nghĩa nói mỗi isolate có bộ nhớ riêng. Từ Dart 2.15, VM hiện thực điều đó tinh tế hơn.</p>

<p><strong>Isolate group.</strong> Isolate tạo bằng <code>Isolate.spawn</code> (và vì thế <code>Isolate.run</code>, <code>compute</code>) thuộc cùng <strong>isolate group</strong> với isolate tạo ra nó: dùng chung code đã nạp và cùng hoạt động trên một managed heap do VM quản lý. Theo changelog Dart 2.15, nhờ vậy khởi động isolate nhanh khoảng 100 lần, bộ nhớ nền mỗi isolate giảm khoảng 10–100 lần, giao tiếp nhanh khoảng 8 lần. Chung heap ở tầng VM <strong>không</strong> có nghĩa code Dart được chia sẻ object: mỗi isolate vẫn chỉ tham chiếu được object của chính nó, mô hình "process thu nhỏ" vẫn đúng với người viết code. Hệ quả phụ changelog nêu: các isolate trong group cùng tham gia garbage collection, nên trong một số trường hợp hiếm, app sinh nhiều rác có thể bị ảnh hưởng thời gian dừng GC.</p>

<p><strong>Vì sao chuyển quyền sở hữu được.</strong> Vì cùng heap, khi isolate kết thúc bằng <code>Isolate.exit</code>, VM giao luôn object graph của message cho isolate nhận mà không copy, sau khi kiểm tra mọi object trong graph đều gửi được. Bước kiểm tra tuyến tính theo kích thước graph này là một phần chi phí phụ trong số đo JSON 1 MB.</p>

<p><strong><code>spawnUri</code> tạo group mới.</strong> Isolate tạo bằng <code>Isolate.spawnUri</code> chạy code từ URI khác, không chung code, không chung heap. Vì vậy message chỉ được chứa danh sách kiểu hẹp ở mục 6, và <code>Isolate.exit</code> ném lỗi nếu port đích thuộc isolate như vậy. Trong app Flutter gần như không có lý do dùng <code>spawnUri</code>.</p>

<h2>Ví dụ thực tế</h2>

<h3>Repository chỉ chuyển sang isolate khi response đủ lớn</h3>

<p>Đây là bài toán gặp nhiều nhất: lớp data nhận JSON từ API và cần parse thành model. Phần lớn response nhỏ, parse trực tiếp rẻ hơn tạo isolate; chỉ số ít response lớn (danh mục đầy đủ, lịch sử giao dịch) mới đáng chuyển đi.</p>

<p><strong>Luồng chạy:</strong></p>

<ol>
  <li>Repository <code>await</code> lớp network. Đây là chờ I/O, async là đủ, không cần isolate.</li>
  <li>Nếu body nhỏ hơn ngưỡng, parse ngay trên main isolate.</li>
  <li>Nếu body lớn, gọi một hàm <code>static</code> nhận <code>body</code> qua tham số rồi <code>Isolate.run</code>, để closure không bắt <code>this</code>.</li>
  <li>Danh sách <code>Product</code> về main qua <code>Isolate.exit</code>, không copy lại.</li>
</ol>

<div class="mermaid">
flowchart TD
    A["(1) await _get('/products')"] --&gt; B{"body.length nhỏ hơn ngưỡng?"}
    B -- "có" --&gt; C["(2) parseProducts(body) trên main isolate"]
    B -- "không" --&gt; D["(3) _parseInBackground(body) gọi Isolate.run"]
    D --&gt; E["(4) List Product về main qua Isolate.exit"]
    C --&gt; F["Trả kết quả cho UI"]
    E --&gt; F
</div>

<pre data-lang="dart"><code>// product_repository.dart
import 'dart:convert';
import 'dart:isolate';

class Product {
  final int id;
  final String name;
  final int priceVnd;
  const Product(this.id, this.name, this.priceVnd);

  factory Product.fromJson(Map&lt;String, dynamic&gt; json) =&gt;
      Product(json['id'] as int, json['name'] as String, json['price'] as int);
}

// Hàm top-level thuần: input là String, output là List&lt;Product&gt;
List&lt;Product&gt; parseProducts(String body) =&gt; [
      for (final item in jsonDecode(body) as List&lt;dynamic&gt;)
        Product.fromJson(item as Map&lt;String, dynamic&gt;),
    ];

class ProductRepository {
  // Ngưỡng tính theo số ký tự của body, chọn bằng cách đo trên thiết bị yếu nhất app hỗ trợ
  static const offloadThreshold = 256 * 1024;

  final Future&lt;String&gt; Function(String path) _get; // lớp network (giả lập)
  ProductRepository(this._get);

  Future&lt;List&lt;Product&gt;&gt; fetchCatalog() async {
    final body = await _get('/products'); // (1) chờ I/O: async là đủ

    if (body.length &lt; offloadThreshold) {
      return parseProducts(body); // (2) body nhỏ: parse ngay trên main isolate
    }
    return _parseInBackground(body); // (3) body lớn: chuyển sang isolate khác
  }

  // (3) Hàm static: closure chỉ bắt \`body\`, không bắt \`this\`
  static Future&lt;List&lt;Product&gt;&gt; _parseInBackground(String body) =&gt;
      Isolate.run(() =&gt; parseProducts(body), debugName: 'parse-products');
  // (4) Kết quả về main qua Isolate.exit, không copy lại danh sách
}

String fakeBody(int count) =&gt; jsonEncode([
      for (var i = 0; i &lt; count; i++) {'id': i, 'name': 'Sản phẩm $i', 'price': 10000 + i}
    ]);

Future&lt;void&gt; main() async {
  for (final count in [100, 50000]) {
    final body = fakeBody(count);
    final repo = ProductRepository((_) async =&gt; body);
    final watch = Stopwatch()..start();
    final products = await repo.fetchCatalog();
    final route = body.length &lt; ProductRepository.offloadThreshold
        ? 'main isolate'
        : 'Isolate.run';
    print('\${(body.length / 1024).round()} KB -&gt; \${products.length} sản phẩm '
        'qua $route (\${watch.elapsedMilliseconds} ms)');
  }
}</code></pre>

<p><strong>Kết quả</strong> (<code>dart run product_repository.dart</code>; số ms thay đổi theo lần chạy):</p>

<pre data-lang="text"><code>4 KB -&gt; 100 sản phẩm qua main isolate (3 ms)
2469 KB -&gt; 50000 sản phẩm qua Isolate.run (28 ms)</code></pre>

<p><code>body</code> là <code>String</code>, bất biến, nên việc closure bắt <code>body</code> không copy chuỗi 2,4 MB: worker nhận tham chiếu. App Flutter có build web thì thay dòng (3) bằng <code>compute(parseProducts, body)</code>. Khi model được sinh bằng <code>json_serializable</code> (5.1.2 JSON Serialization and Codegen (chưa có bài)), cách chuyển sang isolate vẫn y hệt: hàm <code>fromJson</code> sinh ra là hàm thường, gọi được trong worker.</p>

<h3>Các bài toán khác</h3>

<ul>
  <li><strong>Xử lý ảnh trước khi upload</strong>: decode, resize, nén bằng package Dart thuần như <code>image</code> là việc CPU nặng; gói thành hàm top-level nhận và trả <code>Uint8List</code>, gọi bằng <code>Isolate.run</code>/<code>compute</code>.</li>
  <li><strong>Mã hoá hoặc nén file bằng plugin native</strong>: background isolate với <code>RootIsolateToken</code> như mục 7.</li>
  <li><strong>Database cục bộ</strong>: một số thư viện tự chạy database trên isolate riêng (drift có <code>NativeDatabase.createInBackground</code>); xem 6.1.2 SQLite, Drift and Hive (chưa có bài).</li>
</ul>

<h2>Khi nào nên và không nên dùng</h2>

<p>Tài liệu Flutter nêu đúng một quy tắc cứng: dùng isolate khi tính toán lớn đang làm UI jank. Quy trình chọn:</p>

<div class="mermaid">
flowchart TD
    A["Việc cần làm"] --&gt; B{"Phần lớn thời gian là chờ I/O?"}
    B -- "có" --&gt; C["async/await, không cần isolate"]
    B -- "không" --&gt; D{"Đo được chặn main isolate quá vài ms?"}
    D -- "không" --&gt; E["Chạy trực tiếp"]
    D -- "có" --&gt; F{"Lặp lại nhiều lần trên cùng dữ liệu?"}
    F -- "không" --&gt; G["Isolate.run hoặc compute"]
    F -- "có" --&gt; H["Worker sống lâu"]
    G --&gt; I{"Cần gọi plugin?"}
    H --&gt; I
    I -- "có" --&gt; J["Thêm RootIsolateToken và BackgroundIsolateBinaryMessenger"]
</div>

<p><strong>Nên dùng isolate khi:</strong></p>

<ul>
  <li>Parse JSON hoặc file lớn (hàng trăm KB trở lên, tuỳ thiết bị), lọc/sắp xếp danh sách rất lớn.</li>
  <li>Xử lý ảnh, âm thanh, video; nén, giải nén; mã hoá, băm.</li>
  <li>Việc nặng lặp lại nhiều lần trên cùng dữ liệu (tìm kiếm trên index, xử lý luồng dữ liệu cảm biến): dùng worker sống lâu.</li>
</ul>

<p><strong>Không nên dùng isolate khi:</strong></p>

<ul>
  <li>Việc là I/O: gọi API, đọc file, query database. Các API này vốn không chặn event loop; đưa vào isolate chỉ thêm chi phí copy.</li>
  <li>Việc nhỏ, không chặn quá một frame: số đo ở mục 6 cho thấy với JSON khoảng 100 KB, tổng thời gian qua <code>Isolate.run</code> đã ngang parse trực tiếp; nhỏ hơn nữa thì isolate chỉ thêm chi phí.</li>
  <li>Việc cần widget, <code>BuildContext</code>, <code>rootBundle</code> hay listener chủ động từ platform: những thứ này chỉ có ở main isolate.</li>
  <li>Code chạy trên web: <code>Isolate.run</code> crash với <code>Unsupported operation</code>; dùng <code>compute</code> và nhớ nó vẫn chặn UI (mục 8).</li>
</ul>

<h2>Sai lầm thường gặp</h2>

<h3>1. Closure bắt <code>this</code> kéo theo object không gửi được</h3>

<pre data-lang="dart"><code>// product_search_controller.dart
import 'dart:async';
import 'dart:isolate';

List&lt;String&gt; filterByKeyword(List&lt;String&gt; names, String keyword) =&gt;
    names.where((n) =&gt; n.toLowerCase().contains(keyword)).toList();

class ProductSearchController {
  final List&lt;String&gt; _names;
  Timer? _debounce; // Timer giữ tài nguyên của event loop: không gửi được
  ProductSearchController(this._names);

  void onQueryChanged(String query) {
    _debounce?.cancel();
    _debounce = Timer(const Duration(milliseconds: 300), () =&gt; search(query));
  }

  // SAI: closure đọc field \`_names\` nên bắt luôn \`this\` (kèm \`_debounce\`)
  Future&lt;List&lt;String&gt;&gt; search(String query) =&gt;
      Isolate.run(() =&gt; filterByKeyword(_names, query.toLowerCase()));

  // ĐÚNG: hàm static nhận đủ dữ liệu qua tham số
  Future&lt;List&lt;String&gt;&gt; searchFixed(String query) =&gt;
      _filterInBackground(_names, query.toLowerCase());

  static Future&lt;List&lt;String&gt;&gt; _filterInBackground(List&lt;String&gt; names, String keyword) =&gt;
      Isolate.run(() =&gt; filterByKeyword(names, keyword));
}</code></pre>

<p><strong>Lỗi lộ ra thế nào:</strong> <code>dart analyze</code> không báo gì; lúc chạy, sau khi <code>onQueryChanged</code> đã tạo <code>Timer</code>, lời gọi <code>search</code> ném <code>ArgumentError</code> (đường dẫn file rút gọn):</p>

<pre data-lang="text"><code>Illegal argument in isolate message: object is unsendable - Library:'dart:isolate' Class: _Timer@1026248 (see restrictions listed at \`SendPort.send()\` documentation for more information)
 &lt;- _debounce in Instance of 'ProductSearchController' (from file:///.../product_search_controller.dart)
 &lt;- field this in ProductSearchController.search.&lt;anonymous closure&gt; (from file:///.../product_search_controller.dart)</code></pre>

<p>Đọc từ dưới lên: closure bắt <code>this</code>, <code>this</code> có field <code>_debounce</code>, <code>_debounce</code> là <code>Timer</code> không gửi được. <strong>Cách sửa:</strong> <code>searchFixed</code> chuyển dữ liệu qua tham số của một hàm static, nên closure chỉ bắt <code>names</code> và <code>keyword</code>. Ngay cả khi <code>this</code> gửi được, bắt <code>this</code> vẫn có thể copy cả một object lớn mỗi lần gọi.</p>

<h3>2. Worker chết, main chờ mãi, process không thoát</h3>

<pre data-lang="dart"><code>// report_worker.dart (SAI)
import 'dart:io';
import 'dart:isolate';

void reportWorker(SendPort port) {
  final rows = File('/khong-ton-tai/orders.csv').readAsLinesSync(); // ném lỗi
  port.send(rows.length);
}

Future&lt;void&gt; main() async {
  final port = ReceivePort();
  await Isolate.spawn(reportWorker, port.sendPort); // không có onError/onExit
  final count = await port.first; // chờ một message không bao giờ tới
  print('Số dòng: $count');
}</code></pre>

<p><strong>Lỗi lộ ra thế nào:</strong> worker in <code>Unhandled exception: PathNotFoundException: Cannot open file...</code> ra stderr rồi chết. Main không nhận được gì nên <code>await port.first</code> treo mãi. Khi chạy thử với <code>port.first.timeout(const Duration(seconds: 2))</code>, main in được thông báo hết giờ nhưng process <strong>vẫn không thoát</strong>, vì <code>port</code> vẫn mở. Trong app Flutter, triệu chứng là một spinner quay mãi.</p>

<p><strong>Cách sửa:</strong> truyền <code>onError: port.sendPort, onExit: port.sendPort</code> cho <code>Isolate.spawn</code>, xử lý cả message lỗi lẫn <code>null</code>, và đóng port trong <code>finally</code>, như ví dụ checksum ở mục 4. Với tác vụ một lần, dùng <code>Isolate.run</code>: nó tự làm đúng việc này và ném lại lỗi ở phía gọi.</p>

<h3>3. Tưởng object đã gửi là object dùng chung</h3>

<p>Worker <code>add</code> vào một <code>List</code> nhận được, hay sửa biến top-level, không ảnh hưởng gì tới main isolate (ví dụ tỉ giá ở mục 1). <strong>Cách sửa:</strong> coi message là dữ liệu một chiều; worker gửi kết quả về và main tự cập nhật state của nó.</p>

<h3>4. Gửi đi gửi lại dữ liệu lớn</h3>

<p>Gọi <code>Isolate.run(() =&gt; search(allProducts, query))</code> mỗi lần người dùng gõ phím nghĩa là copy toàn bộ <code>allProducts</code> mỗi lần. <strong>Cách sửa:</strong> dữ liệu lớn và cố định thì gửi một lần vào worker sống lâu (mục 5); dữ liệu nằm trên đĩa thì gửi đường dẫn và để worker tự đọc (mục 4); dữ liệu nhị phân thì giữ ở dạng <code>Uint8List</code>.</p>

<h3>5. Đưa I/O hoặc việc nhỏ vào isolate "cho chắc"</h3>

<p>Bọc lời gọi HTTP trong <code>Isolate.run</code> không làm request nhanh hơn, vì I/O vốn không chặn event loop. Bọc một phép parse 3 KB thì chi phí isolate lớn hơn chính việc đó (trên máy đo: khoảng 0,05–0,1 ms qua <code>Isolate.run</code>, so với khoảng 0,02 ms parse trực tiếp). <strong>Cách sửa:</strong> đo trước, chỉ chuyển sang isolate phần tính toán đã đo được là chặn main.</p>

<h3>6. Gọi plugin trong isolate mà chưa khởi tạo messenger</h3>

<p>Gọi <code>SharedPreferences.getInstance()</code> hay bất kỳ plugin nào trong worker mà chưa gọi <code>BackgroundIsolateBinaryMessenger.ensureInitialized(token)</code> sẽ ném <code>StateError</code> ngay ở lời gọi plugin. Lấy <code>RootIsolateToken.instance</code> <strong>bên trong</strong> worker cũng không được: getter này trả <code>null</code> ngoài main isolate. <strong>Cách sửa:</strong> lấy token ở main, gửi sang, khởi tạo trước mọi lời gọi plugin (mục 7).</p>

<h2>Lịch sử phát triển</h2>

<ul>
  <li><strong>Dart 1.0 (11/2013)</strong>: isolate đã là mô hình concurrency của Dart từ bản ổn định đầu tiên, với <code>dart:isolate</code> trong thư viện chuẩn và giao tiếp qua port. Mô hình không chia sẻ bộ nhớ có từ đầu, nên code Dart chưa bao giờ cần lock cho object Dart.</li>
  <li><strong>Dart 2.0 (08/2018)</strong>: <code>dart:isolate</code> bị gỡ khỏi nền tảng web, chỉ còn trên VM; changelog khuyên dùng Web Worker cho việc nền trên web. Đây là gốc của giới hạn ở mục 8.</li>
  <li><strong>Dart 2.4 (06/2019)</strong>: thêm <code>TransferableTypedData</code> để lệnh gửi khối byte lớn không phải copy.</li>
  <li><strong>Dart 2.12 (03/2021)</strong>: thêm <code>Isolate.exit([port, message])</code>, nền tảng cho việc trả kết quả không copy.</li>
  <li><strong>Dart 2.15 (12/2021)</strong>: isolate tạo bằng <code>Isolate.spawn</code> được gom thành isolate group (khởi động nhanh khoảng 100 lần, giao tiếp nhanh khoảng 8 lần). Closure được phép làm message và làm entry point của <code>Isolate.spawn</code>; trước đó entry point phải là hàm top-level hoặc static. Isolate trở nên đủ rẻ để dùng thường xuyên.</li>
  <li><strong>Dart 2.19 và Flutter 3.7 (01/2023)</strong>: Dart 2.19 thêm <code>Isolate.run</code>, gói vòng đời spawn, chạy, <code>Isolate.exit</code> vào một lời gọi; từ Flutter 3.7, <code>compute</code> trên mobile/desktop gọi thẳng <code>Isolate.run</code>. Flutter 3.7 thêm background isolate channels (<code>RootIsolateToken</code>, <code>BackgroundIsolateBinaryMessenger</code>) để isolate khác gọi được plugin.</li>
  <li><strong>Flutter 3.29 (02/2025)</strong>: trên Android và iOS, UI thread và platform thread được hợp nhất; code Dart của main isolate chạy trên main thread của platform. Chặn main isolate từ đây là chặn main thread của app, nên việc nặng càng cần isolate.</li>
</ul>

<h2>Kết nối hệ thống</h2>

<p><strong>Tiên quyết:</strong></p>

<ul>
  <li><a href="futures_async_await.md" target="_blank" rel="noopener">1.3.1 Futures and Async/Await</a>: event loop, <code>Future</code>, <code>Completer</code>, vì sao async không phải đa luồng. Isolate là phần còn thiếu của bài đó: song song thật sự.</li>
  <li><a href="../dart/control_flow_patterns.md" target="_blank" rel="noopener">1.2.3 Control Flow and Patterns</a>: pattern matching và destructuring dùng để đọc message dạng record.</li>
</ul>

<p><strong>Liên quan:</strong></p>

<ul>
  <li><a href="streams.md" target="_blank" rel="noopener">1.3.2 Streams</a>: <code>ReceivePort</code> là một <code>Stream</code>; worker gửi luồng kết quả về main tương tự một stream đi qua ranh giới isolate.</li>
  <li><a href="../dart/dart_for_kotlin_devs.md" target="_blank" rel="noopener">1.1.1 Dart for Kotlin Developers</a>: ánh xạ coroutine và <code>Dispatchers</code> sang <code>Future</code> và isolate.</li>
  <li><a href="../dart/variables_and_types.md" target="_blank" rel="noopener">1.2.1 Variables and Types</a>: record, kiểu thường dùng làm message giữa isolate.</li>
</ul>

<p><strong>Học tiếp:</strong></p>

<ul>
  <li>2.2.2 DevTools and Debugging (chưa có bài): đo jank và xem các isolate trong DevTools trước khi quyết định tối ưu.</li>
  <li>5.1.2 JSON Serialization and Codegen (chưa có bài): parse model sinh bằng codegen, thường kết hợp với <code>compute</code>.</li>
  <li>10.2.1 Memory Management and Profiling (chưa có bài): đọc timeline và bộ nhớ khi có nhiều isolate.</li>
</ul>

<h2>Tham khảo</h2>

<ul>
  <li><a href="https://dart.dev/language/concurrency" target="_blank" rel="noopener">Concurrency in Dart</a> - dart.dev</li>
  <li><a href="https://dart.dev/language/isolates" target="_blank" rel="noopener">Isolates</a> - dart.dev (gồm ví dụ worker hai chiều "robust ports")</li>
  <li><a href="https://dart.dev/blog/better-isolate-management-with-isolate-run" target="_blank" rel="noopener">Better isolate management with Isolate.run()</a> - Dart blog</li>
  <li><a href="https://api.dart.dev/dart-isolate/Isolate/run.html" target="_blank" rel="noopener">Isolate.run</a>, <a href="https://api.dart.dev/dart-isolate/Isolate/exit.html" target="_blank" rel="noopener">Isolate.exit</a>, <a href="https://api.dart.dev/dart-isolate/SendPort/send.html" target="_blank" rel="noopener">SendPort.send</a>, <a href="https://api.dart.dev/dart-isolate/TransferableTypedData-class.html" target="_blank" rel="noopener">TransferableTypedData</a> - api.dart.dev</li>
  <li><a href="https://github.com/dart-lang/sdk/blob/main/CHANGELOG.md" target="_blank" rel="noopener">Dart SDK CHANGELOG</a> - các mục <code>dart:isolate</code> của 2.0, 2.4, 2.12, 2.15, 2.19</li>
  <li><a href="https://docs.flutter.dev/perf/isolates" target="_blank" rel="noopener">Concurrency and isolates</a> - docs.flutter.dev</li>
  <li><a href="https://api.flutter.dev/flutter/foundation/compute.html" target="_blank" rel="noopener">compute</a>, <a href="https://api.flutter.dev/flutter/services/BackgroundIsolateBinaryMessenger-class.html" target="_blank" rel="noopener">BackgroundIsolateBinaryMessenger</a> - api.flutter.dev</li>
  <li><a href="https://medium.com/flutter/introducing-background-isolate-channels-7a299609cad8" target="_blank" rel="noopener">Introducing background isolate channels</a> - Flutter blog</li>
  <li><a href="https://flutter.dev/blog/whats-new-in-flutter-3-29" target="_blank" rel="noopener">What's new in Flutter 3.29</a> - Flutter blog (hợp nhất UI thread và platform thread)</li>
</ul>
    `
  },
});

// Frontmatter `id` (profile Android, rule 06) → key entry website cũ. tools/sync_flutter_session.js
// ghi vào key cũ; sidebar (KNOWLEDGE_DATA trong app.js) vẫn dùng key cũ.
FLUTTER_CONTENT['flutter.session01.overview'] = FLUTTER_CONTENT['flutter-session-01-overview'];
FLUTTER_CONTENT['flutter.dart.dart_for_kotlin_devs'] = FLUTTER_CONTENT['flutter-dart-for-kotlin-devs'];
FLUTTER_CONTENT['flutter.dart.variables_types'] = FLUTTER_CONTENT['flutter-dart-variables-types'];
FLUTTER_CONTENT['flutter.dart.functions_operators'] = FLUTTER_CONTENT['flutter-dart-functions-operators'];
FLUTTER_CONTENT['flutter.dart.control_flow_patterns'] = FLUTTER_CONTENT['flutter-dart-control-flow-patterns'];
FLUTTER_CONTENT['flutter.dart.collections_functional'] = FLUTTER_CONTENT['flutter-dart-collections-functional'];
FLUTTER_CONTENT['flutter.dart.classes_mixins_sealed'] = FLUTTER_CONTENT['flutter-dart-classes-mixins-sealed'];
FLUTTER_CONTENT['flutter.async.futures_async_await'] = FLUTTER_CONTENT['flutter-language-async-futures'];
FLUTTER_CONTENT['flutter.async.streams'] = FLUTTER_CONTENT['flutter-language-async-streams'];
FLUTTER_CONTENT['flutter.async.isolates'] = FLUTTER_CONTENT['flutter-language-async-isolates'];
