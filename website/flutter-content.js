/* ============================================================
   Knowledge OS — Flutter Module: Content & Knowledge Base
   ============================================================ */

const FLUTTER_CONTENT = {};

Object.assign(FLUTTER_CONTENT, {

  'flutter-session-01-overview': {
    title: 'Session 01: Dart Foundations - Ngôn ngữ & Bất đồng bộ',
    summary: 'Nền tảng duy nhất cần nắm trước khi chạm vào Flutter: hệ thống kiểu Dart với null safety, pattern matching Dart 3, mô hình bất đồng bộ Event Loop - Future - Stream - Isolate, và cẩm nang chuyển đổi từ Kotlin.',
    status: 'published',
    difficulty: 'intermediate',
    depth: 'overview',
    tags: ['flutter', 'dart', 'overview', 'async'],
    domain: 'Flutter Development',
    module: 'Session 01: Dart Foundations',
    prerequisites: [],
    related: ['flutter-dart-for-kotlin-devs', 'flutter-language-async-futures'],
    learningOutcomes: [
      'Có bản đồ tổng thể của Session 01 và chọn được thứ tự học phù hợp với nền tảng của mình.',
      'Giải thích được vì sao lộ trình đặt Async trước Networking và Dart Foundations trước Widget.',
      'Nhận diện ba trụ cột kiến thức: hệ thống kiểu + null safety, pattern matching Dart 3, mô hình event loop + isolates.',
      'Tự đánh giá được mức độ sẵn sàng sang Session 02 qua tiêu chí hoàn thành.'
    ],
    knowledgeGap: 'Người mới thường nhảy thẳng vào Widget mà bỏ qua nền tảng ngôn ngữ, dẫn đến không giải thích nổi bug về state, async và hiệu năng.',
    updatedAt: '2026-08-22',
    readTime: '12 phút',
    content: `
<h2>Vì sao Dart Foundations là Session đầu tiên?</h2>
<p>Flutter framework được xây dựng gần như 100% bằng Dart. Mọi Widget bạn viết là một class Dart, mọi state là một biến Dart, mọi API call chạy trên event loop của Dart. Không nắm nền tảng ngôn ngữ thì mọi bug sau này đều thành "ma thuật khó hiểu".</p>
<p>Lộ trình này còn cố tình khác nhiều roadmap phổ biến ở hai điểm: <strong>Async được đưa lên trước Networking</strong> vì gọi API đòi hỏi hiểu bất đồng bộ trước, và Session mở đầu bằng <strong>Dart for Kotlin Developers</strong> làm cửa ngõ cho Android Developer chuyển sang.</p>

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


<h2>Nội dung trọng tâm</h2>
<ul>
  <li><strong>1.1 Dart cho Kotlin Developer:</strong> Cẩm nang chuyển đổi - bản chất runtime JIT/AOT, bẫy immutability, named parameters ngược chiều, data class -> records/Freezed.</li>
  <li><strong>1.2 Fundamentals:</strong> var/final/const/late, hệ thống tham số hàm, pattern matching Dart 3, functional APIs, sealed types.</li>
  <li><strong>1.3 Asynchronous:</strong> Event loop, Future/await, Stream single vs broadcast, Isolate cho CPU-bound work.</li>
</ul>

<h2>Ba trụ cột cần nắm</h2>

<h3>Hệ thống kiểu & null safety</h3>
<p>Dart là ngôn ngữ kiểu tĩnh với sound null safety: compiler bảo đảm một biến non-null không bao giờ chứa null. Phân biệt đúng <code>final</code>/<code>const</code>/<code>late</code> ảnh hưởng trực tiếp tới hiệu năng render - instance <code>const</code> giúp Flutter bỏ qua rebuild cả một nhánh widget tree.</p>

<h3>Pattern matching & sealed types (Dart 3)</h3>
<p>Mọi state trong app (loading/success/error) nên mô hình hóa bằng sealed class + switch expression: compiler ép xử lý đủ mọi nhánh - thêm state mới mà quên xử lý là không build nổi thay vì sập lúc runtime.</p>

<h3>Bất đồng bộ: Event Loop → Future → Stream → Isolate</h3>
<p>Dart chạy single-threaded theo mô hình event loop, khác triết lý multi-threading chia thread của Kotlin/Java: IO vốn non-blocking không cần dispatcher, còn CPU-heavy phải tách isolate nếu không muốn UI đơ. Đây là phần <strong>khác Kotlin nhiều nhất</strong> và là nguồn của đa số bug jank.</p>

<h2>Roadmap học tập theo đối tượng</h2>
<ul>
  <li><strong>Android Developer (biết Kotlin):</strong> đọc ngay <strong>Dart for Kotlin Developers</strong> để dựng mental model nhanh, lướt Fundamentals chỉ lấy phần khác biệt, rồi đi sâu nhất vào Async.</li>
  <li><strong>Người mới (chưa biết Kotlin):</strong> bỏ qua bài 1.1, đi tuần tự từ 1.2 đến 1.3 theo thứ tự mục lục.</li>
  <li><strong>Đã biết Dart, cần tra cứu nhanh:</strong> dùng bảng ánh xạ Kotlin → Dart cuối bài 1.1 như cheatsheet.</li>
</ul>

<h2>Tiêu chí hoàn thành Session 01</h2>
<p>Bạn sẵn sàng sang Session 02 khi có thể:</p>
<ul>
  <li>Phân biệt <code>final</code>, <code>const</code>, <code>late</code> và giải thích vì sao <code>final list = [1]</code> vẫn <code>.add()</code> được.</li>
  <li>Viết sealed class + switch expression mà compiler xác nhận đủ case.</li>
  <li>Giải thích vì sao <code>await</code> gọi API không block UI nhưng parse JSON lớn thì có.</li>
  <li>Biết khi nào phải dùng <code>Isolate.run</code>/<code>compute</code>.</li>
</ul>

<h2>Bước tiếp theo</h2>
<p>Nền ngôn ngữ vững rồi, môi trường và công cụ sẽ dễ: sang <strong>Session 02: Environment & Tooling</strong> để setup project chuẩn ngay từ đầu.</p>
`
  },

  'flutter-dart-for-kotlin-devs': {
    title: 'Dart for Kotlin Developers: Cú pháp & Thực chiến Flutter',
    summary: 'Cẩm nang chuyển đổi từ Kotlin sang Dart dành cho Android Developer - bản chất runtime Dart VM (JIT/AOT), final/const, named parameters, null safety promotion, records thay data class, sealed types, và mô hình Concurrency Event Loop + Isolates thay Coroutines.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '40 phút',
    depth: 'deep-dive',
    tags: ['flutter', 'dart', 'kotlin', 'migration', 'android-to-flutter'],
    domain: 'Flutter Development',
    module: 'Session 01: Dart Foundations',
    prerequisites: [],
    related: ['flutter-dart-variables-types', 'flutter-language-async-futures', 'flutter-language-async-isolates'],
    learningOutcomes: [
      'Giải thích được bản chất runtime Dart VM (JIT khi dev, AOT khi release) khác JVM/ART.',
      'Dịch chính xác val/var, const val, lateinit, by lazy, data class sang final/var, const, late, record/Freezed.',
      'Chuyển đổi Coroutines (suspend, Flow, StateFlow, Dispatchers) sang Future, Stream, ValueNotifier, Isolate.',
      'Nhận diện 7 bẫy phổ biến của Kotlin Dev khi viết Dart.'
    ],
    knowledgeGap: 'Kotlin Developer dịch 1-1 theo thói quen cũ: tin final là immutable, quên required ở named param, chạy CPU-heavy trên main isolate - app chạy sai hoặc jank mà không biết nguyên nhân.',
    updatedAt: '2026-08-22',
    readTime: '40 phút',
    content: `
<h2>Vấn đề cần giải quyết</h2>
<p>Bạn đã thành thạo Kotlin: <code>val</code>/<code>var</code>, Null Safety <code>T?</code>, <code>data class</code>, <code>when</code>, <code>suspend fun</code>. Khi mở Flutter và viết file <code>.dart</code> đầu tiên, nếu <strong>dịch 1-1 theo thói quen Kotlin, app sẽ chạy sai hoặc jank ngay</strong>:</p>
<ol>
  <li><strong>Bẫy <code>final</code> nông:</strong> <code>val list = listOf(1)</code> trong Kotlin là read-only. <code>final list = [1]</code> trong Dart <strong>vẫn .add() được</strong>.</li>
  <li><strong>Bẫy Named Parameters ngược chiều:</strong> Dart khai báo trong <code>{}</code> thì gọi bắt buộc kèm tên, và tham số thiếu <code>required</code> có thể bị bỏ qua hoàn toàn.</li>
  <li><strong>Bẫy Concurrency:</strong> Dart là single-threaded event loop + Isolates - chạy code CPU-heavy trên main isolate là app đơ.</li>
  <li><strong>Bẫy data class:</strong> Dart không có - hai object cùng giá trị nhưng <code>==</code> trả false nếu quên override.</li>
  <li><strong>Bẫy Reflection:</strong> Không có <code>dart:mirrors</code> trong Flutter - JSON/DI phải chuyển sang codegen.</li>
  <li><strong>Bẫy Type Promotion:</strong> <code>if (user.name != null)</code> không promote field của class như smart cast Kotlin.</li>
  <li><strong>Bẫy Stream:</strong> mặc định single-subscription - listen lần hai crash <code>StateError</code>.</li>
</ol>

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
<text x="400" y="131" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">T? + Smart Cast → T? + Promotion locals only</text>
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
<text x="400" y="131" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">T? + Smart Cast → T? + Promotion locals only</text>
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


<h2>1. Bản chất Runtime: ART/JVM vs Dart VM</h2>
<ul>
  <li><strong>Khi dev:</strong> Dart chạy JIT trên Dart VM - lý do Flutter có <strong>Hot Reload</strong> (UI cập nhật dưới một giây).</li>
  <li><strong>Khi release:</strong> AOT compile ra machine code native - hiệu năng cao, không phụ thuộc ART/JVM.</li>
  <li><strong>Hệ quả:</strong> AOT loại bỏ reflection (<code>dart:mirrors</code>). Mọi việc Kotlin làm bằng reflection - JSON parsing, DI runtime như Hilt/Koin - ở Flutter chuyển sang <strong>code generation</strong> bằng build_runner.</li>
</ul>

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


<h2>2. Biến, Hằng, Kiểu</h2>
<table style="width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;">
  <thead>
    <tr style="border-bottom:2px solid var(--border);">
      <th style="text-align:left;padding:10px;">Nhu cầu</th><th style="text-align:left;padding:10px;">Kotlin</th><th style="text-align:left;padding:10px;">Dart</th><th style="text-align:left;padding:10px;">Lưu ý</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;">Single assignment</td><td style="padding:10px;"><code>val</code></td><td style="padding:10px;"><code>final</code></td><td style="padding:10px;">Khóa reference, không khóa nội dung</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;">Compile-time constant</td><td style="padding:10px;"><code>const val</code></td><td style="padding:10px;"><code>const</code></td><td style="padding:10px;">Dart dùng được cả với constructor - canonicalization</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;">Kiểu số</td><td style="padding:10px;">Int, Long, Float...</td><td style="padding:10px;">chỉ <code>int</code>, <code>double</code>, <code>num</code></td><td style="padding:10px;">Không có Long/Byte/Short</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;">Deferred init</td><td style="padding:10px;"><code>lateinit var x</code></td><td style="padding:10px;"><code>late String x;</code></td><td style="padding:10px;"></td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;">Lazy init</td><td style="padding:10px;"><code>by lazy {}</code></td><td style="padding:10px;"><code>late final x = compute();</code></td><td style="padding:10px;">Không có property delegation</td></tr>
  </tbody>
</table>

<pre><code class="language-dart">class Point {
  const Point(this.x, this.y);
  final int x, y;
}

const a = Point(1, 2);
const b = Point(1, 2);
print(identical(a, b)); // true - canonicalized: một instance duy nhất!</code></pre>

<h2>3. Named Parameters - Ngược chiều Kotlin</h2>
<pre><code class="language-dart">void sendNotification({
  required String userId,
  required String message,
  bool isUrgent = false,
}) {}

// Tham số {} BẮT BUỘC gọi kèm tên
sendNotification(userId: 'u1', message: 'Họp 9h');

// Optional positional [ ] - cách duy nhất gọi không cần tên
void sum(int a, [int b = 0]) {}
sum(10); sum(10, 20);</code></pre>
<p><strong>Quy tắc vàng:</strong> named param bắt buộc phải truyền thì đánh dấu <code>required</code>. Thiếu nó, caller bỏ qua được mà compiler không cảnh báo - nguồn bug im lặng kinh điển.</p>

<h2>4. Null Safety - Promotion chỉ với local variable</h2>
<pre><code class="language-dart">void greet(User? user) {
  // ❌ user.name là field - KHÔNG được promote
  // ✅ Copy ra local trước
  final name = user?.name;
  if (name != null) {
    print(name.length); // name là String non-null từ đây
  }
}</code></pre>
<table style="width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;">
  <tbody>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;">Force unwrap</td><td style="padding:8px;"><code>!!</code></td><td style="padding:8px;"><code>!</code></td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;">Nil-coalescing</td><td style="padding:8px;"><code>?:</code></td><td style="padding:8px;"><code>??</code> (và <code>??=</code> - Kotlin không có)</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;">Reference equal</td><td style="padding:8px;"><code>===</code></td><td style="padding:8px;"><code>identical(a, b)</code></td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;">Safe cast</td><td style="padding:8px;"><code>as? Type</code></td><td style="padding:8px;">dùng <code>is</code> rồi cast</td></tr>
  </tbody>
</table>

<h2>5. Constructors - Không còn Primary Constructor</h2>
<pre><code class="language-dart">class User {
  final String name;
  final int age;

  User({required this.name, this.age = 18}) : assert(age >= 0);

  User.guest() : name = 'guest', age = 18;              // named constructor

  factory User.fromJson(Map<String, dynamic> json) =>   // factory constructor
      User(name: json['name'], age: json['age'] ?? 0);
}

// Cascade operator .. - thay apply của Kotlin
final config = Config()
  ..width = 100
  ..height = 50;</code></pre>

<h2>6. data class -> Records & Codegen</h2>
<pre><code class="language-dart">// Records (Dart 3) - equals structural sẵn
(String, double) product = ('1', 999.0);
print(product == ('1', 899.0)); // so từng field

// Class thật sự: override tay...
class ManualProduct {
  const ManualProduct(this.id, this.price);
  final String id; final double price;
  @override
  bool operator ==(Object o) => o is ManualProduct && o.id == id && o.price == price;
  @override
  int get hashCode => Object.hash(id, price);
}
// ...hoặc codegen Freezed/json_serializable + build_runner</code></pre>

<h2>7. OOP: extends, implements, with & Class Modifiers</h2>
<table style="width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;">
  <thead>
    <tr style="border-bottom:2px solid var(--border);">
      <th style="text-align:left;padding:10px;">Ý định</th><th style="text-align:left;padding:10px;">Kotlin</th><th style="text-align:left;padding:10px;">Dart</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;">Class mặc định</td><td style="padding:10px;"><code>final</code> (khóa)</td><td style="padding:10px;"><strong>Mở</strong> - ai cũng extend/implement được</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;">Khóa kế thừa</td><td style="padding:10px;">bỏ <code>open</code></td><td style="padding:10px;"><code>final class</code> (Dart 3)</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;">Sealed</td><td style="padding:10px;"><code>sealed class</code></td><td style="padding:10px;"><code>sealed class</code> (giống hệt, cùng library)</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;">Interface</td><td style="padding:10px;"><code>interface</code></td><td style="padding:10px;">mọi class là implicit interface</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;">Đa kế thừa hành vi</td><td style="padding:10px;">interface default methods, <code>by</code></td><td style="padding:10px;"><code>mixin</code> + <code>with</code></td></tr>
  </tbody>
</table>

<h2>8. Collections: Literal mạnh hơn, Mutability yếu hơn</h2>
<pre><code class="language-dart">// Collection-if / collection-for / spread - Dart có, Kotlin KHÔNG
final menu = [
  'Home',
  if (isLoggedIn) 'Profile',
  for (final c in categories) c.label,
  ...extraItems,
];

final mutable = [1, 2];
mutable.add(3);          // ✅ VẪN ĐƯỢC - bẫy số 1!
const frozen = [1, 2];   // immutable thật sự
final snapshot = List.unmodifiable(fetchedData); // immutable runtime</code></pre>
<p>Lưu ý: <code>list.sort()</code> mutate tại chỗ trả void (Kotlin <code>sortedBy</code> trả list mới); <code>map/where</code> trả Iterable lazy - nhớ <code>.toList()</code>; <code>groupBy</code> cần package:collection.</p>

<h2>9. when -> switch Expression & Patterns (Dart 3)</h2>
<pre><code class="language-dart">sealed class ViewState {}
class Loading extends ViewState {}
class Success extends ViewState {
  Success(this.items); final List<String> items;
}
class Error extends ViewState {
  Error(this.code); final int code;
}

final screen = switch (state) {
  Loading() => const LoadingView(),
  Success(:final items) => ListView(children: items.map(Text.new).toList()),
  Error(code: 401) => const LoginView(),
  Error(:final code) => TextView('Lỗi $code'),
}; // exhaustive - thiếu case là lỗi compile!</code></pre>

<h2>10. Concurrency: Coroutines -> Event Loop + Isolates</h2>
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

<table style="width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;">
  <thead>
    <tr style="border-bottom:2px solid var(--border);">
      <th style="text-align:left;padding:10px;">Khái niệm</th><th style="text-align:left;padding:10px;">Kotlin</th><th style="text-align:left;padding:10px;">Dart</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;">Hàm bất đồng bộ</td><td style="padding:10px;"><code>suspend fun fetch(): User</code></td><td style="padding:10px;"><code>Future&lt;User&gt; fetch() async</code></td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;">Fire-and-forget</td><td style="padding:10px;"><code>scope.launch { }</code></td><td style="padding:10px;"><code>unawaited(doWork());</code></td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;">CPU-bound nền</td><td style="padding:10px;"><code>withContext(Default)</code></td><td style="padding:10px;"><code>Isolate.run(...)</code> / compute</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;">Luồng dữ liệu</td><td style="padding:10px;"><code>Flow&lt;T&gt;</code> / <code>flow { emit }</code></td><td style="padding:10px;"><code>Stream&lt;T&gt;</code> / <code>async* { yield }</code></td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;">State stream</td><td style="padding:10px;"><code>StateFlow&lt;T&gt;</code></td><td style="padding:10px;"><code>ValueNotifier&lt;T&gt;</code> / BehaviorSubject</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;">Delay / Timeout</td><td style="padding:10px;"><code>delay(ms)</code> / <code>withTimeout</code></td><td style="padding:10px;"><code>Future.delayed()</code> / <code>.timeout()</code></td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;">RunBlocking</td><td style="padding:10px;">chặn thread chờ</td><td style="padding:10px;"><strong>không tồn tại</strong> - treo UI vĩnh viễn</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;">Mutex/synchronized</td><td style="padding:10px;">cần thiết</td><td style="padding:10px;">hiếm khi cần - isolates không chia sẻ memory</td></tr>
  </tbody>
</table>

<h3>Ba tư duy phải đổi</h3>
<ol>
  <li><strong>IO không cần dispatcher:</strong> mọi IO vốn non-blocking qua event loop. Chỉ CPU-bound mới nhảy isolate.</li>
  <li><strong>Không có structured concurrency:</strong> cancellation tự quản qua CancelToken/subscription.cancel().</li>
  <li><strong>Isolate không chia sẻ memory:</strong> truyền dữ liệu bằng message copy.</li>
</ol>

<h2>11. Công cụ & Hệ sinh thái</h2>
<table style="width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;">
  <thead>
    <tr style="border-bottom:2px solid var(--border);">
      <th style="text-align:left;padding:10px;">Vai trò</th><th style="text-align:left;padding:10px;">Kotlin/Android</th><th style="text-align:left;padding:10px;">Flutter/Dart</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;">Dependency</td><td style="padding:10px;">build.gradle.kts + Maven Central</td><td style="padding:10px;">pubspec.yaml + pub.dev</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;">Codegen</td><td style="padding:10px;">kapt / KSP</td><td style="padding:10px;">build_runner</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;">Lint/Format</td><td style="padding:10px;">ktlint, detekt</td><td style="padding:10px;">flutter analyze + dart format</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;">Test/Mock</td><td style="padding:10px;">JUnit, MockK</td><td style="padding:10px;">package:test, mocktail</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;">DI</td><td style="padding:10px;">Hilt, Koin</td><td style="padding:10px;">get_it + injectable, Riverpod</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;">Local DB</td><td style="padding:10px;">Room, SQLDelight</td><td style="padding:10px;">drift/sqflite, hive</td></tr>
  </tbody>
</table>

<h2>12. 7 Bẫy Kotlin Dev hay mắc phải</h2>
<ol>
  <li>Tin <code>final</code> là immutable - chỉ có <code>const [...]</code> hoặc <code>List.unmodifiable</code>.</li>
  <li>Quên <code>required</code> ở named param - caller bỏ qua được mà không lỗi.</li>
  <li>Chạy CPU-heavy trên main isolate - app đứng hình, phải <code>Isolate.run</code>.</li>
  <li>Tin <code>==</code> so giá trị - class thường so identity.</li>
  <li>Listen Stream hai lần - StateError, cần broadcast.</li>
  <li>Mong type promotion trên field - copy ra local variable.</li>
  <li>Nhập <code>it</code> - Dart không có implicit lambda parameter.</li>
</ol>

<h2>Nguồn tham khảo</h2>
<ul>
  <li><a href="https://dart.dev/language" target="_blank">Dart Language Documentation</a></li>
  <li><a href="https://dart.dev/effective-dart" target="_blank">Effective Dart</a></li>
  <li><a href="https://dart.dev/language/isolates" target="_blank">Isolates - concurrency model</a></li>
  <li><a href="https://nilhcem.github.io/kotlin-is-like-dart/" target="_blank">Kotlin is like Dart - cheatsheet trực quan</a></li>
</ul>
`
  },

  'flutter-dart-variables-types': {
    title: 'Biến và Kiểu dữ liệu trong Dart',
    summary: 'Nền tảng hệ thống kiểu của Dart - var, final, const, late, các kiểu dựng sẵn, type inference, sự khác biệt giữa dynamic và Object, và nền tảng sound null safety.',
    status: 'published',
    difficulty: 'beginner',
    estimatedReadingTime: '20 phút',
    depth: 'lesson',
    tags: ['dart', 'variables', 'types', 'null-safety'],
    domain: 'Flutter Development',
    module: 'Session 01: Dart Foundations',
    prerequisites: [],
    related: ['flutter-dart-functions-operators'],
    learningOutcomes: ['Chọn đúng var/final/const/late.', 'Phân biệt dynamic vs Object.'],
    knowledgeGap: 'Nhầm final với immutable và lạm dụng dynamic là hai lỗi nền tảng phổ biến nhất.',
    updatedAt: '2026-08-22',
    readTime: '20 phút',
    content: `
<h2>Vấn đề cần giải quyết</h2>
<p>Chọn sai cách khai báo trong Dart không chỉ gây lỗi compile - nó ảnh hưởng trực tiếp tới hiệu năng render và tính đúng đắn của state trong Flutter.</p>

<h2>Bốn cách khai báo</h2>
<table style="width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;">
  <thead><tr style="border-bottom:2px solid var(--border);"><th style="text-align:left;padding:10px;">Khai báo</th><th style="text-align:left;padding:10px;">Gán lại</th><th style="text-align:left;padding:10px;">Xác định giá trị lúc</th></tr></thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;"><code>var x = ...</code></td><td style="padding:10px;">✅</td><td style="padding:10px;">runtime</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;"><code>final x = ...</code></td><td style="padding:10px;">❌</td><td style="padding:10px;">runtime</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;"><code>const x = ...</code></td><td style="padding:10px;">❌</td><td style="padding:10px;"><strong>compile time</strong>, immutable sâu</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;"><code>late</code> (+final/var)</td><td style="padding:10px;">tùy</td><td style="padding:10px;">khi truy cập đầu tiên</td></tr>
  </tbody>
</table>

<pre><code class="language-dart">final createdAt = DateTime.now(); // runtime, gán một lần
const secondsPerDay = 86400;      // compiler nhét thẳng vào bytecode
late final config = loadConfig(); // trì hoãn tới lần truy cập đầu</code></pre>

<h2>Sức mạnh của const trong Flutter</h2>
<p>Const constructor cho phép <strong>canonicalization</strong> - instance const cùng giá trị chỉ tồn tại một bản trong bộ nhớ. Widget tree dùng <code>const</code> để đánh dấu "cây con này không đổi" giúp framework bỏ qua rebuild:</p>

<pre><code class="language-dart">class Point {
  const Point(this.x, this.y);
  final int x, y;
}
print(identical(const Point(1, 2), const Point(1, 2))); // true!</code></pre>

<h2>Kiểu dựng sẵn & Null Safety</h2>
<ul>
  <li>Mọi thứ đều là object. Số chỉ có <code>int</code> (64-bit), <code>double</code>, <code>num</code> (= int|double). Không có Long/Float.</li>
  <li><code>bool</code> chỉ có true/false - <strong>không có truthy/falsy</strong>: điều kiện phải là bool thật.</li>
  <li>String interpolation giống Kotlin: <code>'Hi $name, \${a + b}'</code>.</li>
  <li>Null safety sound: kiểu mặc định non-null, muốn nullable thêm <code>T?</code>; toán tử <code>?.</code>, <code>??</code>, <code>??=</code>, <code>!</code>, <code>late</code>.</li>
</ul>

<pre><code class="language-dart">String? nickname;
final length = nickname?.length;   // safe call -> int?
final display = nickname ?? 'No';  // fallback
if (nickname != null) print(nickname.length); // promotion với local var</code></pre>

<h2>dynamic vs Object vs Object?</h2>
<table style="width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;">
  <tbody>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;"><code>Object</code></td><td style="padding:8px;">An toàn - gọi method phải cast tường minh</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;"><code>Object?</code></td><td style="padding:8px;">Root nullable - vẫn có static check</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;"><code>dynamic</code></td><td style="padding:8px;"><strong>TẮT kiểm tra kiểu</strong> - lỗi chuyển sang runtime. Chỉ dùng ở biên giới hệ thống (decode JSON thô)</td></tr>
  </tbody>
</table>

<h2>Sai lầm thường gặp</h2>
<ol>
  <li>Lạm dụng dynamic thay vì thiết kế kiểu đúng.</li>
  <li>Dùng <code>!</code> để tắt cảnh báo nullable thay vì xử lý gốc - crash chờ sẵn.</li>
  <li>Nhầm final với immutable - <code>final list = [1]; list.add(2);</code> vẫn hợp lệ.</li>
  <li><code>double d = 10;</code> lỗi compile - phải viết <code>10.0</code>.</li>
</ol>
`
  },

  'flutter-dart-functions-operators': {
    title: 'Functions and Operators trong Dart',
    summary: 'Hệ thống tham số hàm ba dạng (positional, named với required, optional positional), hàm first-class với function types, closures, tear-offs, và các toán tử đặc trưng: null-aware, cascade, ~/.',
    status: 'published',
    difficulty: 'beginner',
    estimatedReadingTime: '25 phút',
    depth: 'lesson',
    tags: ['dart', 'functions', 'closures', 'operators'],
    domain: 'Flutter Development',
    module: 'Session 01: Dart Foundations',
    prerequisites: ['flutter-dart-variables-types'],
    related: ['flutter-dart-control-flow-patterns'],
    learningOutcomes: ['Khai báo đủ ba dạng tham số.', 'Dùng thành thạo null-aware operators và cascade.'],
    knowledgeGap: 'Flutter gần như không có cú pháp markup riêng - toàn bộ UI là lời gọi hàm lồng nhau; hiểu sai hệ thống tham số là không đọc nổi widget tree.',
    updatedAt: '2026-08-22',
    readTime: '25 phút',
    content: `
<h2>Hệ thống tham số - phần quan trọng nhất</h2>
<table style="width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;">
  <thead><tr style="border-bottom:2px solid var(--border);"><th style="text-align:left;padding:10px;">Dạng</th><th style="text-align:left;padding:10px;">Khai báo</th><th style="text-align:left;padding:10px;">Khi gọi</th></tr></thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;">Positional bắt buộc</td><td style="padding:10px;"><code>(int a)</code></td><td style="padding:10px;">đủ thứ tự, không kèm tên</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;">Optional positional</td><td style="padding:10px;"><code>([int a = 0])</code></td><td style="padding:10px;">có thể bỏ, không kèm tên</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;">Named</td><td style="padding:10px;"><code>({required int a})</code></td><td style="padding:10px;"><strong>bắt buộc kèm tên</strong>, có thể bỏ nếu không required</td></tr>
  </tbody>
</table>

<pre><code class="language-dart">void createUser(String tenantId, {
  required String username,
  int age = 18,
  String? bio,
}) {}

createUser('acme', username: 'hazu'); // bio bị bỏ qua - KHÔNG lỗi!</code></pre>
<p><strong>Quy tắc vàng:</strong> named param bắt buộc phải truyền thì đánh dấu <code>required</code>. Thiếu nó là nguồn bug im lặng kinh điển.</p>

<h2>Hàm First-Class: types, closures, tear-offs</h2>
<pre><code class="language-dart">typedef IntPredicate = bool Function(int value);

int apply(int Function(int, int) op, int a, int b) => op(a, b);
apply((a, b) => a * b, 2, 3); // lambda inline

// Closure nhớ biến tại nơi định nghĩa
Function makeCounter() {
  var count = 0;
  return () => ++count; // count sống sau khi makeCounter return
}

// Tear-off - trỏ thẳng method làm giá trị
names.map((s) => s.toUpperCase()); // viết tay
names.map(String.toUpperCase);     // tear-off
children: data.map(Text.new).toList(), // rất phổ biến với widgets</code></pre>

<h2>Toán tử cốt lõi</h2>
<ul>
  <li><code>~/</code> chia nguyên: <code>7 ~/ 2 == 3</code>; <code>/</code> luôn trả double.</li>
  <li><code>==</code> so giá trị nếu override được, còn class thường so identity; <code>identical()</code> so reference.</li>
  <li>Null-aware: <code>?.</code>, <code>??</code>, <code>??=</code> (gán nếu null), <code>?..</code>, spread <code>...?</code>.</li>
  <li>Cascade <code>..</code> - nối chuỗi thao tác trên cùng object, thay apply của Kotlin:
  <pre><code class="language-dart">final config = Config()
  ..width = 100
  ..height = 50;</code></pre></li>
  <li>Type check <code>is / is! / as</code> với type promotion sau <code>is</code>.</li>
</ul>

<h2>Sai lầm thường gặp</h2>
<ol>
  <li>Gọi named parameter không kèm tên - lỗi compile.</li>
  <li>Nhờ <code>==</code> so giá trị trên class thường - so identity thật.</li>
  <li>Nhầm <code>/</code> với <code>~/</code>.</li>
  <li>Quên <code>.toList()</code> sau map - nhận lazy Iterable.</li>
</ol>
`
  },

  'flutter-dart-control-flow-patterns': {
    title: 'Control Flow và Pattern Matching trong Dart',
    summary: 'Điều khiển luồng Dart - if/else, vòng lặp, switch statement vs switch expression, và hệ thống pattern matching của Dart 3 với destructuring record/list/map/object và kiểm tra exhaustiveness qua sealed types.',
    status: 'published',
    difficulty: 'beginner',
    estimatedReadingTime: '25 phút',
    depth: 'lesson',
    tags: ['dart', 'control-flow', 'patterns', 'dart-3'],
    domain: 'Flutter Development',
    module: 'Session 01: Dart Foundations',
    prerequisites: ['flutter-dart-variables-types'],
    related: ['flutter-dart-classes-mixins-sealed'],
    learningOutcomes: ['Phân biệt switch statement và switch expression.', 'Áp dụng patterns để destructuring dữ liệu.'],
    knowledgeGap: 'Trước Dart 3, xử lý nhánh phức tạp (kiểm tra kiểu + trích field + so giá trị) phải viết chuỗi if lồng dài dòng - patterns giải quyết đúng vấn đề đó.',
    updatedAt: '2026-08-22',
    readTime: '25 phút',
    content: `
<h2>Nhánh điều kiện & Vòng lặp</h2>
<ul>
  <li>Điều kiện phải là <code>bool</code> thật - không có truthy/falsy.</li>
  <li><code>for-in</code> chuẩn cho mọi Iterable; label (<code>outer:</code>) thoát nhiều tầng loop.</li>
  <li><strong>if-case</strong> (Dart 3): match pattern ngay trong if, kèm guard <code>when</code>:</li>
</ul>
<pre><code class="language-dart">if (response case int code when code >= 400) {
  throw HttpException('Lỗi \$code');
}</code></pre>

<h2>Switch Statement vs Switch Expression</h2>
<table style="width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;">
  <thead><tr style="border-bottom:2px solid var(--border);"><th style="text-align:left;padding:10px;"></th><th style="text-align:left;padding:10px;">Statement</th><th style="text-align:left;padding:10px;">Expression (Dart 3)</th></tr></thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;">Vai trò</td><td style="padding:10px;">Thực thi hành động</td><td style="padding:10px;">Tính giá trị trả về</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;">Cú pháp case</td><td style="padding:10px;"><code>case v:</code> + break</td><td style="padding:10px;"><code>pattern => value</code></td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;">Exhaustiveness</td><td style="padding:10px;">lint cảnh báo</td><td style="padding:10px;">bắt buộc với sealed/enum</td></tr>
  </tbody>
</table>
<p>Dart switch <strong>không tự fall-through</strong> giữa các case có nội dung - khác C/Java.</p>

<h2>Patterns - sức mạnh của Dart 3</h2>
<pre><code class="language-dart">sealed class Result {}
class Success extends Result {
  Success(this.data); final String data;
}
class Failure extends Result {
  Failure(this.code); final int code;
}

String render(Result result) => switch (result) {
  Success(:final data) => 'Nội dung: \$data',     // object pattern destructuring
  Failure(code: 401)   => 'Hết phiên đăng nhập',  // match giá trị cụ thể
  Failure(:final code) => 'Lỗi \$code',
}; // sealed => thiếu case là LỖI COMPILE</code></pre>

<pre><code class="language-dart">// Record destructuring
final (name, age) = ('Hazu', 25);

// List pattern khớp cấu trúc
switch (points) {
  case [var first]:         print(first);
  case [...rest, var last]: print(last);
}

// Logical-or + guard
switch (value) {
  case int n when n > 100 || n < 0:
    print('ngoài phạm vi');
}</code></pre>

<h2>Sai lầm thường gặp</h2>
<ol>
  <li>Switch expression thiếu case trên type không sealed - runtime error khi rơi vào nhánh trống. Thiết kế state bằng sealed class.</li>
  <li>Lạm dụng ternary lồng nhau - ba tầng trở lên nên chuyển switch expression.</li>
  <li>Nhầm <code>if (x case int n)</code> là phép gán - nó là match.</li>
</ol>
`
  },

  'flutter-dart-collections-functional': {
    title: 'Collections và Functional APIs trong Dart',
    summary: 'List/Set/Map với mutability spectrum từ mutable đến const immutable, spread và collection-if/for - kỹ thuật lõi dựng widget tree, lazy evaluation của Iterable và functional operations.',
    status: 'published',
    difficulty: 'beginner',
    estimatedReadingTime: '30 phút',
    depth: 'lesson',
    tags: ['dart', 'collections', 'functional-programming', 'iterable'],
    domain: 'Flutter Development',
    module: 'Session 01: Dart Foundations',
    prerequisites: ['flutter-dart-functions-operators'],
    related: ['flutter-language-async-futures'],
    learningOutcomes: ['Kiểm soát mutability theo ý muốn.', 'Dùng collection-if/for dựng widget list động.'],
    knowledgeGap: 'Ứng dụng Flutter về bản chất là biến đổi dữ liệu thành giao diện; hiểu sai lazy evaluation của Iterable là nguồn bug kinh điển của người mới.',
    updatedAt: '2026-08-22',
    readTime: '30 phút',
    content: `
<h2>Mutability Spectrum</h2>
<table style="width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;">
  <thead><tr style="border-bottom:2px solid var(--border);"><th style="text-align:left;padding:10px;">Cách tạo</th><th style="text-align:left;padding:10px;">Sửa nội dung</th><th style="text-align:left;padding:10px;">Ghi chú</th></tr></thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;"><code>var list = [...]</code></td><td style="padding:10px;">✅</td><td style="padding:10px;">hoàn toàn động</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;"><code>final list = [...]</code></td><td style="padding:10px;"><strong>✅ (add OK!)</strong></td><td style="padding:10px;">chỉ khóa reference - bẫy số 1</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;"><code>List.unmodifiable(src)</code></td><td style="padding:10px;">❌ runtime</td><td style="padding:10px;">immutable bản sao</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;"><code>const list = [...]</code></td><td style="padding:10px;">❌</td><td style="padding:10px;">compile-time, canonicalized</td></tr>
  </tbody>
</table>

<h2>Collection-if / collection-for / spread</h2>
<p>Kỹ thuật đặc trưng Dart (Kotlin không có) - chính là cách dựng động danh sách widget:</p>
<pre><code class="language-dart">Column(
  children: [
    const Header(),
    if (isLoading) const CircularProgressIndicator(),
    for (final product in products) ProductCard(product),
    ...?extraWidgets,
  ],
)</code></pre>

<h2>Lazy Evaluation - biến đổi diễn ra khi nào?</h2>
<pre><code class="language-dart">final doubled = [1, 2, 3].map((x) {
  print('transform \$x'); // CHƯA in gì cả!
  return x * 2;
});
print(doubled.first);   // giờ mới tính
final cached = doubled.toList(); // "chốt" kết quả</code></pre>

<h2>Functional operations & bẫy sort</h2>
<ul>
  <li>Chuỗi biến đổi: <code>where</code> (filter), <code>map</code>, <code>expand</code> (flatMap), <code>fold</code>, <code>any/every</code>.</li>
  <li>Tra cứu: <code>firstWhere(test, orElse: () => null)</code>; Map lookup luôn trả nullable.</li>
  <li><code>list.sort()</code> <strong>mutate tại chỗ, trả void</strong> - bản sao sorted: <code>[...list]..sort()</code>.</li>
  <li><code>groupBy</code>, <code>sortedBy</code> cần <strong>package:collection</strong> - dependency gần như mặc định của mọi project nghiêm túc.</li>
  <li>Generator <code>Iterable&lt;T&gt; f() sync* { yield ... }</code> cho chuỗi lười biếng vô hạn.</li>
</ul>

<h2>Sai lầm thường gặp</h2>
<ol>
  <li>Mutate collection đang được duyệt - ConcurrentModificationError.</li>
  <li>Quên toList() rồi tái sử dụng Iterable nhiều lần - tính lại bất ngờ.</li>
  <li>Dùng List cho dữ liệu unique thay vì Set.</li>
  <li>Truyền collection mutable xuống widget con - UI lệch state.</li>
</ol>
`
  },

  'flutter-dart-classes-mixins-sealed': {
    title: 'Classes, Mixins và Sealed Types trong Dart',
    summary: 'Hệ thống OOP của Dart - extends vs implements trên implicit interface, mixin linearization order, class modifiers của Dart 3, sealed types với exhaustiveness checking và enhanced enums.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '30 phút',
    depth: 'lesson',
    tags: ['dart', 'oop', 'mixins', 'sealed-class'],
    domain: 'Flutter Development',
    module: 'Session 01: Dart Foundations',
    prerequisites: ['flutter-dart-functions-operators'],
    related: ['flutter-dart-control-flow-patterns'],
    learningOutcomes: ['Phân biệt extends/implements/with.', 'Mô hình hóa state bằng sealed class + switch.'],
    knowledgeGap: 'Flutter framework xây gần như 100% bằng class Dart; khác biệt cốt lõi với Kotlin: không có interface keyword (implicit interface), class mở mặc định.',
    updatedAt: '2026-08-22',
    readTime: '30 phút',
    content: `
<h2>Ba từ khóa ba ý nghĩa</h2>
<table style="width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;">
  <thead><tr style="border-bottom:2px solid var(--border);"><th style="text-align:left;padding:10px;">Từ khóa</th><th style="text-align:left;padding:10px;">Nhận code thừa kế</th><th style="text-align:left;padding:10px;">Dùng khi</th></tr></thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;"><code>extends</code></td><td style="padding:10px;">✅ toàn bộ implementation (1 cái)</td><td style="padding:10px;">"IS-A" thật sự</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;"><code>implements</code></td><td style="padding:10px;">❌ chỉ contract, tự viết hết (∞)</td><td style="padding:10px;">tuân thủ interface</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;"><code>with</code></td><td style="padding:10px;">✅ body của mixin (∞ theo thứ tự)</td><td style="padding:10px;">tái sử dụng hành vi</td></tr>
  </tbody>
</table>

<h2>Implicit Interface</h2>
<p>Mọi class Dart đều tự động là interface - kể cả class thường:</p>
<pre><code class="language-dart">class Greeter {
  String hello(String name) => 'Hi \$name';
}
class TestGreeter implements Greeter {          // hợp lệ!
  @override
  String hello(String name) => 'Mock: \$name'; // PHẢI tự viết lại toàn bộ
}</code></pre>

<h2>Mixin Linearization</h2>
<p>Khi trùng method: <strong>mixin đứng sau đè mixin đứng trước, mixin đè superclass</strong>:</p>
<pre><code class="language-dart">mixin A { void who() => print('A'); }
mixin B { void who() => print('B'); }
class Base { void who() => print('Base'); }
class C extends Base with A, B {}

C().who(); // "B" - mixin sau cùng thắng</code></pre>

<h2>Class Modifiers (Dart 3)</h2>
<table style="width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;">
  <tbody>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;">(không)</td><td style="padding:8px;">ai cũng extend/implement được ≈ Kotlin <code>open</code></td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;"><code>final class</code></td><td style="padding:8px;">khóa extend + implement ngoài library ≈ Kotlin default</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;"><code>base class</code></td><td style="padding:8px;">chỉ được extend</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;"><code>sealed class</code></td><td style="padding:8px;">hierarchy đóng, exhaustive switch, subclass cùng library</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;"><code>abstract</code></td><td style="padding:8px;">không khởi tạo trực tiếp, có abstract methods</td></tr>
  </tbody>
</table>

<h2>Sealed Types - pattern quan trọng nhất của module</h2>
<pre><code class="language-dart">sealed class AuthState {
  const AuthState();
}
class AuthLoading extends AuthState {}
class AuthSuccess extends AuthState {
  const AuthSuccess(this.token);
  final String token;
}

Widget build(AuthState state) => switch (state) {
  AuthLoading() => const CircularProgressIndicator(),
  AuthSuccess(:final token) => Dashboard(token),
}; // thêm state mới mà quên xử lý -> KHÔNG BUILD NỔI</code></pre>

<h2>Sai lầm thường gặp</h2>
<ol>
  <li>Nhầm implements với extends - implements không nhận code thừa kế.</li>
  <li>Đặt subclass ngoài file sealed class - lỗi compile.</li>
  <li>Tin thứ tự mixin ngẫu nhiên - M2 đè M1.</li>
  <li>Factory constructor gọi this - factory không được truy cập this.</li>
</ol>
`
  },

  'flutter-language-async-futures': {
    title: 'Futures và Async/Await trong Dart',
    summary: 'Mô hình bất đồng bộ nền tảng của Dart - event loop với microtask queue và event queue, Future, async/await, chạy song song với Future.wait và bẫy kinh điển khi quên await.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '25 phút',
    depth: 'lesson',
    tags: ['dart', 'async', 'future', 'event-loop'],
    domain: 'Flutter Development',
    module: 'Session 01: Dart Foundations',
    prerequisites: ['flutter-dart-functions-operators'],
    related: ['flutter-language-async-streams', 'flutter-language-async-isolates'],
    learningOutcomes: ['Vẽ được mô hình event loop.', 'Chạy song song bằng Future.wait thay vì await tuần tự.'],
    knowledgeGap: 'Nhiều ngôn ngữ trả lời bài toán chờ kết quả bằng đa luồng; Dart chọn một thread + hàng đợi sự kiện - đơn giản hơn nhưng đòi hiểu cơ chế để không treo UI.',
    updatedAt: '2026-08-22',
    readTime: '25 phút',
    content: `
<h2>Event Loop - trái tim của Dart</h2>
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

<p>Code đồng bộ dài chặn cả hai hàng đợi - frame mới không vẽ được thành jank. <code>await</code> là điểm nhường quyền: hàm dừng, event loop xử việc khác, quay lại khi có kết quả.</p>

<h2>Future & async/await</h2>
<pre><code class="language-dart">Future&lt;void&gt; loadProfile() async {
  try {
    final name = await fetchUserName(7);
    print(name);
  } catch (e) {
    print('Lỗi: \$e');
  } finally {
    hideLoading();
  }
}</code></pre>

<h2>Tuần tự vs Song song - bẫy số một</h2>
<pre><code class="language-dart">// ❌ TUẦN TỰ - mất 3 giây
final user = await fetchUser();
final posts = await fetchPosts(user.id);

// ✅ SONG SONG - mất 1 giây
final results = await Future.wait([
  fetchUser(),
  fetchPosts(user.id),
]);</code></pre>
<p>Quy tắc: tác vụ độc lập gom vào Future.wait; phụ thuộc nhau mới await tuần tự.</p>

<h2>Fire-and-forget & Timeout</h2>
<pre><code class="language-dart">unawaited(analytics.log('tap'));            // cam kết không quan tâm kết quả
final data = await api.fetch()
    .timeout(const Duration(seconds: 10));  // giới hạn thời gian
await Future.delayed(const Duration(milliseconds: 300));</code></pre>

<h2>Sai lầm thường gặp</h2>
<ol>
  <li><strong>Quên await:</strong> Future rơi ra ngoài - lỗi bị nuốt sạch, state cập nhật "trễ".</li>
  <li>Await trong vòng lặp cho item độc lập - dùng Future.wait.</li>
  <li>Tưởng async function chạy "nền": phép tính nặng vẫn block UI - đó là việc của Isolate.</li>
</ol>
`
  },

  'flutter-language-async-streams': {
    title: 'Streams trong Dart',
    summary: 'Stream - phiên bản Flow của thế giới Flutter. Single-subscription vs broadcast, tạo stream bằng async* generators và StreamController, pipeline transformations, quản lý subscription để tránh leak.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '30 phút',
    depth: 'lesson',
    tags: ['dart', 'stream', 'reactive-programming'],
    domain: 'Flutter Development',
    module: 'Session 01: Dart Foundations',
    prerequisites: ['flutter-language-async-futures'],
    related: ['flutter-language-async-isolates'],
    learningOutcomes: ['Phân biệt single-subscription và broadcast stream.', 'Quản lý subscription đúng cách.'],
    knowledgeGap: 'Rất nhiều thứ trong app là luồng giá trị liên tục: GPS, socket, input, auth state - xử lý bằng cách gọi API lặp lại thì vụng về và trễ.',
    updatedAt: '2026-08-22',
    readTime: '30 phút',
    content: `
<h2>Bản chất: Iterable của tương lai</h2>
<table style="width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;">
  <tbody>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;">Số phần tử</td><td style="padding:8px;">hữu hạn, có sẵn</td><td style="padding:8px;">có thể vô hạn, đến dần</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;">Push/Pull</td><td style="padding:8px;">pull</td><td style="padding:8px;">push (dữ liệu tới)</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;">Generator</td><td style="padding:8px;"><code>sync* + yield</code></td><td style="padding:8px;"><code>async* + yield</code></td></tr>
  </tbody>
</table>

<h2>Single-subscription vs Broadcast</h2>
<pre><code class="language-dart">Stream&lt;int&gt; ticker() async* {
  var i = 0;
  while (true) {
    yield i++;
    await Future.delayed(const Duration(seconds: 1));
  }
}

final source = ticker();
source.listen(print);
// source.listen(print); ❌ StateError - single-subscription!

final shared = source.asBroadcastStream(); // nhiều listener OK</code></pre>

<h2>StreamController & Pipeline</h2>
<pre><code class="language-dart">class SearchService {
  final _controller = StreamController&lt;String&gt;.broadcast();
  Stream&lt;String&gt; get results =&gt; _controller.stream;
  void submit(String q) => _controller.add(q);
  void dispose() => _controller.close(); // BẮT BUỘC close!
}

searchInput
    .where((q) => q.length >= 3)
    .distinct()
    .debounceTime(const Duration(milliseconds: 300)) // rxdart
    .asyncMap((q) => api.search(q))
    .listen(renderResults);</code></pre>

<h2>Subscription - vòng đời phải khép kín</h2>
<pre><code class="language-dart">@override
void initState() {
  super.initState();
  _sub = prices.listen(_onPrice);
}
@override
void dispose() {
  _sub?.cancel();     // nếu không: callback bắn vào widget đã chết
  super.dispose();
}</code></pre>
<p>Mọi nơi listen phải có chỗ cancel đối xứng - quy tắc sống còn, tương đương [weak self] của iOS.</p>

<h2>Sai lầm thường gặp</h2>
<ol>
  <li>Listen single-subscription hai lần - crash StateError.</li>
  <li>Quên cancel subscription trong dispose - leak + exception.</li>
  <li>Quên close StreamController.</li>
  <li>Dùng stream cho giá trị "hiện tại" - listener mới chỉ thấy event sau nó đăng ký (khác StateFlow). Giải pháp: BehaviorSubject hoặc ValueNotifier.</li>
  <li>Nhầm map sync với asyncMap.</li>
</ol>
`
  },

  'flutter-language-async-isolates': {
    title: 'Isolates trong Dart',
    summary: 'Mô hình song song của Dart - isolate là worker có bộ nhớ riêng giao tiếp bằng message passing, Isolate.run/compute cho tác vụ nhanh, worker dài hạn với SendPort/ReceivePort.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '20 phút',
    depth: 'lesson',
    tags: ['dart', 'isolate', 'concurrency', 'performance'],
    domain: 'Flutter Development',
    module: 'Session 01: Dart Foundations',
    prerequisites: ['flutter-language-async-futures'],
    related: ['flutter-language-async-streams'],
    learningOutcomes: ['Giải thích vì sao Dart cần isolates thay vì threads.', 'Tách CPU-bound work khỏi main isolate.'],
    knowledgeGap: 'async/await giải quyết việc CHỜ (I/O), không giải quyết việc TÍNH - phép tính CPU-heavy chạy bao lâu thì UI đơ bấy lâu.',
    updatedAt: '2026-08-22',
    readTime: '20 phút',
    content: `
<h2>Mô hình Isolate</h2>
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

<p>Không biến dùng chung -> không lock, không race condition. Cái giá: dữ liệu qua lại đều copy.</p>

<h2>Isolate.run - một dòng tách tính toán</h2>
<pre><code class="language-dart">import 'dart:isolate';

Future&lt;Report&gt; analyze(String raw) =>
    Isolate.run(() => parseReport(raw));

// Trong Flutter: compute(heavyFunction, argument)</code></pre>

<h2>Khi nào KHÔNG cần isolate</h2>
<table style="width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;">
  <tbody>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;">Gọi API, đọc file, query DB</td><td style="padding:8px;">❌ - I/O vốn non-blocking</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;">Parse JSON vài KB</td><td style="padding:8px;">❌ - spawn overhead còn lớn hơn công việc</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;">Parse JSON nhiều MB, resize ảnh, mã hóa</td><td style="padding:8px;">✅</td></tr>
  </tbody>
</table>
<p>Đo bằng DevTools trước khi tối ưu - spawn có chi phí vài ms.</p>

<h2>Ranh giới Message</h2>
<table style="width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;">
  <thead><tr style="border-bottom:2px solid var(--border);"><th style="text-align:left;padding:10px;">Truyền được</th><th style="text-align:left;padding:10px;">Không truyền được</th></tr></thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:10px;">primitives, List/Map/Set chứa phần tử gửi được, instance class thường*</td><td style="padding:10px;">Closure/function thường, object chứa native resource, ReceivePort khác</td></tr>
  </tbody>
</table>
<pre><code class="language-dart">// ❌ closure bắt 'this' - lỗi runtime
Isolate.run(() => _parseInternal(raw));
// ✅ static/top-level, tham số tự chứa
Isolate.run(() => parseStatic(raw));</code></pre>
<p>Lưu ý Flutter Web: isolate bị hạn chế đáng kể trên nền tảng web.</p>

<h2>Sai lầm thường gặp</h2>
<ol>
  <li>Đưa I/O vào isolate - lãng phí.</li>
  <li>Gửi task quá nhỏ - overhead ăn mất lợi ích.</li>
  <li>Closure bắt this - crash lúc runtime.</li>
  <li>Tưởng kết quả isolate là shared state - mỗi lần là bản copy độc lập.</li>
</ol>
`
  }
});
