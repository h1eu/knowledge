/* ============================================================
   Knowledge OS — iOS Module: Content & Knowledge Base
   ============================================================ */

const IOS_CONTENT = {};

Object.assign(IOS_CONTENT, {

  'ios-session-01-overview': {
    title: 'Session 01: Ngôn ngữ, Quản lý Bộ nhớ & Runtime trong iOS',
    summary: 'Tổng quan nền tảng cốt lõi của iOS Developer: Objective-C vs Swift, Kiến trúc bộ nhớ Stack - Heap - Queue, Automatic Reference Counting (ARC) và cơ chế Objective-C Runtime.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '30 phút',
    depth: 'deep-dive',
    tags: ['ios', 'swift', 'objc', 'memory', 'runtime', 'arc'],
    domain: 'iOS Development',
    module: 'Session 01: Languages, Memory & Runtime',
    prerequisites: [],
    related: ['ios-swift-closures', 'ios-mrc-arc-retain', 'ios-runtime-messaging'],
    learningOutcomes: [
      'Nắm vững sự tiến hóa từ Objective-C/C++ sang Swift và cơ chế Toll-Free Bridging.',
      'Hiểu rõ sự khác biệt giữa Stack, Heap, Value Type và Reference Type trong Swift/iOS.',
      'Nắm vững cơ chế ARC (Strong, Weak, Unowned) và cách phòng chống Retain Cycles.',
      'Giải thích được cách thức Objective-C Runtime xử lý Message Dispatch và Method Swizzling.'
    ],
    knowledgeGap: 'Nhiều lập trình viên chỉ dùng cú pháp Swift mà không hiểu bản chất quản lý bộ nhớ bên dưới hoặc cơ chế Dynamic Messaging của Cocoa Runtime, dẫn đến rò rỉ bộ nhớ (memory leaks) và khó debug các lỗi crash sâu.',
    updatedAt: '2026-08-19',
    readTime: '30 phút',
    content: `
<h2>Bản chất nền tảng của hệ sinh thái iOS</h2>
<p>Phát triển iOS không chỉ đơn thuần là viết code giao diện, mà đòi hỏi sự thấu hiểu sâu sắc về kiến trúc runtime bên dưới của Apple — nơi mà <strong>Objective-C Runtime</strong> và <strong>Swift ABI</strong> cùng chung sống và vận hành trên nền <strong>Darwin / XNU Kernel</strong>.</p>

<div class="dd-diagram" data-dd="ios-stack">
<div class="dd-svg dd-svg-dark">
<svg viewBox="0 0 800 628" role="img" aria-labelledby="ios-stack-dark-title ios-stack-dark-desc" font-family="'Geist', sans-serif">
<title id="ios-stack-dark-title">Ngăn xếp iOS: ngôn ngữ, thực thi, framework</title>
<desc id="ios-stack-dark-desc">Sơ đồ tầng kiến trúc iOS: Swift và Objective-C hội tụ vào Obj-C Runtime, qua ARC tới Stack và Heap, rồi lên Foundation và UIKit.</desc>
<defs>
<marker id="ios-stack-dark-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0, 8 3, 0 6" fill="#94A3B8"/>
</marker>
</defs>
<rect width="800" height="628" fill="#060913"/>
<!-- zones -->
<rect x="32" y="24" width="736" height="140" rx="8" fill="rgba(248,250,252,0.02)" stroke="rgba(248,250,252,0.10)" stroke-width="0.8"/>
<rect x="48" y="28" width="112" height="12" rx="2" fill="#060913"/>
<text x="104" y="37" fill="#64748B" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.14em">LANGUAGE · SYNTAX</text>
<rect x="32" y="192" width="736" height="228" rx="8" fill="rgba(248,250,252,0.02)" stroke="rgba(248,250,252,0.10)" stroke-width="0.8"/>
<rect x="48" y="196" width="120" height="12" rx="2" fill="#060913"/>
<text x="108" y="205" fill="#64748B" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.14em">EXECUTION · MEMORY</text>
<rect x="32" y="448" width="736" height="140" rx="8" fill="rgba(248,250,252,0.02)" stroke="rgba(248,250,252,0.10)" stroke-width="0.8"/>
<rect x="48" y="452" width="72" height="12" rx="2" fill="#060913"/>
<text x="84" y="461" fill="#64748B" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.14em">FRAMEWORK</text>
<!-- arrows -->
<path d="M 216,128 V 172 H 332 Q 340,172 340,180 V 228" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-stack-dark-arrow)"/>
<path d="M 584,128 V 172 H 488 Q 480,172 480,180 V 228" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-stack-dark-arrow)"/>
<path d="M 400,296 V 312 H 224 Q 216,312 216,320 V 332" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-stack-dark-arrow)"/>
<path d="M 368,364 H 432" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-stack-dark-arrow)"/>
<path d="M 584,396 V 432 H 308 Q 300,432 300,440 V 488" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-stack-dark-arrow)"/>
<path d="M 368,520 H 432" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-stack-dark-arrow)"/>
<!-- nodes -->
<rect x="64" y="64" width="304" height="64" rx="6" fill="#060913"/>
<rect x="64" y="64" width="304" height="64" rx="6" fill="rgba(148,163,184,0.10)" stroke="#64748B" stroke-width="1"/>
<rect x="72" y="70" width="52" height="12" rx="2" fill="transparent" stroke="rgba(100,116,139,0.40)" stroke-width="0.8"/>
<text x="98" y="79" fill="rgba(100,116,139,0.8)" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.08em">LANG</text>
<text x="216" y="102" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Swift 5.x / 6.0</text>
<text x="216" y="118" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">type safety · value semantics</text>
<rect x="432" y="64" width="304" height="64" rx="6" fill="#060913"/>
<rect x="432" y="64" width="304" height="64" rx="6" fill="rgba(148,163,184,0.10)" stroke="#64748B" stroke-width="1"/>
<rect x="440" y="70" width="52" height="12" rx="2" fill="transparent" stroke="rgba(100,116,139,0.40)" stroke-width="0.8"/>
<text x="466" y="79" fill="rgba(100,116,139,0.8)" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.08em">LANG</text>
<text x="584" y="102" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Objective-C / C++</text>
<text x="584" y="118" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">dynamic messaging</text>
<rect x="220" y="228" width="360" height="68" rx="6" fill="#060913"/>
<rect x="220" y="228" width="360" height="68" rx="6" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="1.2"/>
<rect x="228" y="234" width="52" height="12" rx="2" fill="transparent" stroke="rgba(56,189,248,0.40)" stroke-width="0.8"/>
<text x="254" y="243" fill="rgba(56,189,248,0.8)" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.08em">CORE</text>
<text x="400" y="268" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Obj-C Runtime / Swift Metadata</text>
<text x="400" y="286" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">dynamic dispatch · swizzling</text>
<rect x="64" y="332" width="304" height="64" rx="6" fill="#060913"/>
<rect x="64" y="332" width="304" height="64" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<rect x="72" y="338" width="52" height="12" rx="2" fill="transparent" stroke="rgba(248,250,252,0.40)" stroke-width="0.8"/>
<text x="98" y="347" fill="rgba(248,250,252,0.8)" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.08em">ARC</text>
<text x="216" y="370" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">ARC Engine</text>
<text x="216" y="386" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">reference counting</text>
<rect x="432" y="332" width="304" height="64" rx="6" fill="#060913"/>
<rect x="432" y="332" width="304" height="64" rx="6" fill="rgba(248,250,252,0.05)" stroke="#94A3B8" stroke-width="1"/>
<rect x="440" y="338" width="52" height="12" rx="2" fill="transparent" stroke="rgba(148,163,184,0.40)" stroke-width="0.8"/>
<text x="466" y="347" fill="rgba(148,163,184,0.8)" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.08em">MEM</text>
<text x="584" y="370" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Stack / Heap</text>
<text x="584" y="386" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">values · objects</text>
<rect x="64" y="488" width="304" height="64" rx="6" fill="#060913"/>
<rect x="64" y="488" width="304" height="64" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<rect x="72" y="494" width="52" height="12" rx="2" fill="transparent" stroke="rgba(248,250,252,0.40)" stroke-width="0.8"/>
<text x="98" y="503" fill="rgba(248,250,252,0.8)" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.08em">FW</text>
<text x="216" y="526" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Foundation</text>
<text x="216" y="542" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">toll-free bridging</text>
<rect x="432" y="488" width="304" height="64" rx="6" fill="#060913"/>
<rect x="432" y="488" width="304" height="64" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<rect x="440" y="494" width="52" height="12" rx="2" fill="transparent" stroke="rgba(248,250,252,0.40)" stroke-width="0.8"/>
<text x="466" y="503" fill="rgba(248,250,252,0.8)" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.08em">UI</text>
<text x="584" y="526" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">UIKit · CoreGraphics</text>
<text x="584" y="542" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">ui framework</text>
<!-- legend -->
<line x1="32" y1="604" x2="768" y2="604" stroke="rgba(248,250,252,0.12)" stroke-width="0.8"/>
<text x="32" y="620" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" letter-spacing="0.14em">CHÚ GIẢI</text>
<circle cx="150" cy="616" r="4" fill="#38BDF8"/>
<text x="162" y="620" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace">TRỌNG TÂM · RUNTIME</text>
<line x1="330" y1="616" x2="362" y2="616" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-stack-dark-arrow)"/>
<text x="370" y="620" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace">LUỒNG ĐIỀU KHIỂN</text>
<rect x="540" y="608" width="40" height="16" rx="4" fill="rgba(248,250,252,0.02)" stroke="rgba(248,250,252,0.10)" stroke-width="0.8"/>
<text x="588" y="620" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace">TẦNG KIẾN TRÚC</text>
</svg>
</div>
<div class="dd-svg dd-svg-light">
<svg viewBox="0 0 800 628" role="img" aria-labelledby="ios-stack-title ios-stack-desc" font-family="'Geist', sans-serif">
<title id="ios-stack-title">Ngăn xếp iOS: ngôn ngữ, thực thi, framework</title>
<desc id="ios-stack-desc">Sơ đồ tầng kiến trúc iOS: Swift và Objective-C hội tụ vào Obj-C Runtime, qua ARC tới Stack và Heap, rồi lên Foundation và UIKit.</desc>
<defs>
<marker id="ios-stack-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0, 8 3, 0 6" fill="#64748B"/>
</marker>
</defs>
<rect width="800" height="628" fill="#F8FAFC"/>
<!-- zones -->
<rect x="32" y="24" width="736" height="140" rx="8" fill="rgba(15,23,42,0.02)" stroke="rgba(15,23,42,0.10)" stroke-width="0.8"/>
<rect x="48" y="28" width="112" height="12" rx="2" fill="#F8FAFC"/>
<text x="104" y="37" fill="#94A3B8" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.14em">LANGUAGE · SYNTAX</text>
<rect x="32" y="192" width="736" height="228" rx="8" fill="rgba(15,23,42,0.02)" stroke="rgba(15,23,42,0.10)" stroke-width="0.8"/>
<rect x="48" y="196" width="120" height="12" rx="2" fill="#F8FAFC"/>
<text x="108" y="205" fill="#94A3B8" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.14em">EXECUTION · MEMORY</text>
<rect x="32" y="448" width="736" height="140" rx="8" fill="rgba(15,23,42,0.02)" stroke="rgba(15,23,42,0.10)" stroke-width="0.8"/>
<rect x="48" y="452" width="72" height="12" rx="2" fill="#F8FAFC"/>
<text x="84" y="461" fill="#94A3B8" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.14em">FRAMEWORK</text>
<!-- arrows -->
<path d="M 216,128 V 172 H 332 Q 340,172 340,180 V 228" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-stack-arrow)"/>
<path d="M 584,128 V 172 H 488 Q 480,172 480,180 V 228" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-stack-arrow)"/>
<path d="M 400,296 V 312 H 224 Q 216,312 216,320 V 332" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-stack-arrow)"/>
<path d="M 368,364 H 432" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-stack-arrow)"/>
<path d="M 584,396 V 432 H 308 Q 300,432 300,440 V 488" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-stack-arrow)"/>
<path d="M 368,520 H 432" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-stack-arrow)"/>
<!-- nodes -->
<rect x="64" y="64" width="304" height="64" rx="6" fill="#F8FAFC"/>
<rect x="64" y="64" width="304" height="64" rx="6" fill="rgba(100,116,139,0.10)" stroke="#94A3B8" stroke-width="1"/>
<rect x="72" y="70" width="52" height="12" rx="2" fill="transparent" stroke="rgba(100,116,139,0.40)" stroke-width="0.8"/>
<text x="98" y="79" fill="rgba(100,116,139,0.8)" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.08em">LANG</text>
<text x="216" y="102" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Swift 5.x / 6.0</text>
<text x="216" y="118" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">type safety · value semantics</text>
<rect x="432" y="64" width="304" height="64" rx="6" fill="#F8FAFC"/>
<rect x="432" y="64" width="304" height="64" rx="6" fill="rgba(100,116,139,0.10)" stroke="#94A3B8" stroke-width="1"/>
<rect x="440" y="70" width="52" height="12" rx="2" fill="transparent" stroke="rgba(100,116,139,0.40)" stroke-width="0.8"/>
<text x="466" y="79" fill="rgba(100,116,139,0.8)" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.08em">LANG</text>
<text x="584" y="102" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Objective-C / C++</text>
<text x="584" y="118" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">dynamic messaging</text>
<rect x="220" y="228" width="360" height="68" rx="6" fill="#F8FAFC"/>
<rect x="220" y="228" width="360" height="68" rx="6" fill="rgba(2,132,199,0.08)" stroke="#0284C7" stroke-width="1.2"/>
<rect x="228" y="234" width="52" height="12" rx="2" fill="transparent" stroke="rgba(2,132,199,0.40)" stroke-width="0.8"/>
<text x="254" y="243" fill="rgba(2,132,199,0.8)" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.08em">CORE</text>
<text x="400" y="268" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Obj-C Runtime / Swift Metadata</text>
<text x="400" y="286" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">dynamic dispatch · swizzling</text>
<rect x="64" y="332" width="304" height="64" rx="6" fill="#F8FAFC"/>
<rect x="64" y="332" width="304" height="64" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<rect x="72" y="338" width="52" height="12" rx="2" fill="transparent" stroke="rgba(15,23,42,0.40)" stroke-width="0.8"/>
<text x="98" y="347" fill="rgba(15,23,42,0.8)" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.08em">ARC</text>
<text x="216" y="370" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">ARC Engine</text>
<text x="216" y="386" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">reference counting</text>
<rect x="432" y="332" width="304" height="64" rx="6" fill="#F8FAFC"/>
<rect x="432" y="332" width="304" height="64" rx="6" fill="rgba(15,23,42,0.05)" stroke="#64748B" stroke-width="1"/>
<rect x="440" y="338" width="52" height="12" rx="2" fill="transparent" stroke="rgba(100,116,139,0.40)" stroke-width="0.8"/>
<text x="466" y="347" fill="rgba(100,116,139,0.8)" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.08em">MEM</text>
<text x="584" y="370" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Stack / Heap</text>
<text x="584" y="386" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">values · objects</text>
<rect x="64" y="488" width="304" height="64" rx="6" fill="#F8FAFC"/>
<rect x="64" y="488" width="304" height="64" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<rect x="72" y="494" width="52" height="12" rx="2" fill="transparent" stroke="rgba(15,23,42,0.40)" stroke-width="0.8"/>
<text x="98" y="503" fill="rgba(15,23,42,0.8)" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.08em">FW</text>
<text x="216" y="526" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Foundation</text>
<text x="216" y="542" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">toll-free bridging</text>
<rect x="432" y="488" width="304" height="64" rx="6" fill="#F8FAFC"/>
<rect x="432" y="488" width="304" height="64" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<rect x="440" y="494" width="52" height="12" rx="2" fill="transparent" stroke="rgba(15,23,42,0.40)" stroke-width="0.8"/>
<text x="466" y="503" fill="rgba(15,23,42,0.8)" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.08em">UI</text>
<text x="584" y="526" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">UIKit · CoreGraphics</text>
<text x="584" y="542" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">ui framework</text>
<!-- legend -->
<line x1="32" y1="604" x2="768" y2="604" stroke="rgba(15,23,42,0.12)" stroke-width="0.8"/>
<text x="32" y="620" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" letter-spacing="0.14em">CHÚ GIẢI</text>
<circle cx="150" cy="616" r="4" fill="#0284C7"/>
<text x="162" y="620" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace">TRỌNG TÂM · RUNTIME</text>
<line x1="330" y1="616" x2="362" y2="616" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-stack-arrow)"/>
<text x="370" y="620" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace">LUỒNG ĐIỀU KHIỂN</text>
<rect x="540" y="608" width="40" height="16" rx="4" fill="rgba(15,23,42,0.02)" stroke="rgba(15,23,42,0.10)" stroke-width="0.8"/>
<text x="588" y="620" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace">TẦNG KIẾN TRÚC</text>
</svg>
</div>
</div>


<h2>Nội dung trọng tâm của Session 01</h2>
<ul>
  <li><strong>1.1 Languages:</strong> So sánh Objective-C (Blocks, KVC/KVO, Toll-Free Bridging) với Swift hiện đại (Closures, Generics, Protocol-Oriented Programming).</li>
  <li><strong>1.2 Memory Management:</strong> Phân tích Stack vs Heap, Value vs Reference Type, MRC vs ARC, Retain Cycles và cơ chế AutoReleasePool.</li>
  <li><strong>1.3 Runtime:</strong> Cơ chế gửi tin nhắn (<code>objc_msgSend</code>), Dynamic Method Resolution, Forwarding Invocation và Method Swizzling.</li>
</ul>

<h2>Roadmap học tập đề xuất</h2>
<p>Bắt đầu từ việc nắm vững mô hình bộ nhớ Stack/Heap và sự khác biệt giữa <code>struct</code> và <code>class</code>, sau đó đi sâu vào ARC để viết code không bị leak, cuối cùng tìm hiểu Runtime để làm chủ các kỹ thuật nâng cao và xử lý bug hóc búa.</p>
`
  },

  'ios-swift-for-kotlin-devs': {
    title: 'Swift for Kotlin Developers: Cú pháp & Thực chiến iOS',
    summary: 'Cẩm nang thực chiến chuyển đổi từ Kotlin sang Swift dành cho Android Developer — Nắm vững toàn bộ cú pháp nền tảng (biến, hàm, tuples, properties, initializers, optionals, struct/class, ARC, closures, generics, error handling, concurrency) theo chuẩn Apple để code SwiftUI ngay.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '45 phút',
    depth: 'deep-dive',
    tags: ['ios', 'swift', 'kotlin', 'migration', 'syntax', 'android-to-ios', 'uikit', 'swiftui', 'arc', 'optionals'],
    domain: 'iOS Development',
    module: 'Session 01: Languages, Memory & Runtime',
    prerequisites: [],
    related: ['ios-swift-closures', 'ios-swift-initializers', 'ios-swift-generics', 'ios-swift-protocol-struct-enum-extension', 'ios-mrc-arc-retain'],
    learningOutcomes: [
      'Phân biệt được let deep immutability với val và vận dụng mutating đúng cho struct.',
      'Sử dụng guard let, if let và nil-coalescing để unwrap Optional an toàn thay vì !.',
      'Phân biệt Value Type (struct copy) vs Reference Type (class share) và chọn đúng cho Model.',
      'Xử lý retain cycle với [weak self] và kiểm chứng deinit trong closure bất đồng bộ.',
      'Vận dụng Argument Labels, async/await và throws theo chuẩn Apple API Design Guidelines.'
    ],
    knowledgeGap: 'Kotlin dev thường mắc bẫy đem nguyên tư duy Reference Type (class + GC) sang Swift, dẫn đến Retain Cycles trong closures, crash khi dùng Force Unwrap (!) và quên Argument Label khi gọi hàm.',
    updatedAt: '2026-08-20',
    readTime: '45 phút',
    content: `
<h2>Mental Model: Bản đồ chuyển đổi tư duy</h2>
<p>Cả Kotlin và Swift đều là ngôn ngữ hiện đại, type-safe và null-safe. Tuy nhiên, <strong>kiến trúc thực thi bên dưới có sự khác biệt cốt tử</strong> mà nếu không nắm vững sẽ gây ra lỗi crash và rò rỉ bộ nhớ nghiêm trọng:</p>

<div class="dd-diagram" data-dd="ios-kotlinmap">
<div class="dd-svg dd-svg-dark">
<svg viewBox="0 0 800 596" role="img" aria-labelledby="ios-kotlinmap-dark-title ios-kotlinmap-dark-desc" font-family="'Geist', sans-serif">
<title id="ios-kotlinmap-dark-title">Kotlin sang Swift: sáu cặp song sinh</title>
<desc id="ios-kotlinmap-dark-desc">Sáu khái niệm Kotlin ánh xạ sang Swift: biến, null, model, bộ nhớ, OOP và bất đồng bộ.</desc>
<defs>
<marker id="ios-kotlinmap-dark-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0, 8 3, 0 6" fill="#94A3B8"/>
</marker>
</defs>
<rect width="800" height="596" fill="#060913"/>
<!-- zones -->
<rect x="32" y="24" width="360" height="516" rx="8" fill="rgba(248,250,252,0.02)" stroke="rgba(248,250,252,0.10)" stroke-width="0.8"/>
<rect x="48" y="28" width="160" height="12" rx="2" fill="#060913"/>
<text x="128" y="37" fill="#64748B" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.14em">KOTLIN · ANDROID</text>
<rect x="408" y="24" width="360" height="516" rx="8" fill="rgba(56,189,248,0.05)" stroke="rgba(56,189,248,0.28)" stroke-width="1.2"/>
<rect x="424" y="28" width="144" height="12" rx="2" fill="#060913"/>
<text x="496" y="37" fill="#38BDF8" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.14em">SWIFT · ĐÍCH ĐẾN</text>
<!-- rungs -->
<path d="M 360,92 H 440" fill="none" stroke="#94A3B8" stroke-width="1.2" stroke-dasharray="4,3"/>
<path d="M 360,172 H 440" fill="none" stroke="#94A3B8" stroke-width="1.2" stroke-dasharray="4,3"/>
<path d="M 360,252 H 440" fill="none" stroke="#94A3B8" stroke-width="1.2" stroke-dasharray="4,3"/>
<path d="M 360,332 H 440" fill="none" stroke="#94A3B8" stroke-width="1.2" stroke-dasharray="4,3"/>
<path d="M 360,412 H 440" fill="none" stroke="#94A3B8" stroke-width="1.2" stroke-dasharray="4,3"/>
<path d="M 360,492 H 440" fill="none" stroke="#94A3B8" stroke-width="1.2" stroke-dasharray="4,3"/>
<!-- kotlin -->
<rect x="80" y="64" width="280" height="56" rx="6" fill="#060913"/>
<rect x="80" y="64" width="280" height="56" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="220" y="98" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">val / var</text>
<rect x="80" y="144" width="280" height="56" rx="6" fill="#060913"/>
<rect x="80" y="144" width="280" height="56" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="220" y="172" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Null: T?</text>
<text x="220" y="190" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">smart cast</text>
<rect x="80" y="224" width="280" height="56" rx="6" fill="#060913"/>
<rect x="80" y="224" width="280" height="56" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="220" y="252" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">data class</text>
<text x="220" y="270" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">reference</text>
<rect x="80" y="304" width="280" height="56" rx="6" fill="#060913"/>
<rect x="80" y="304" width="280" height="56" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="220" y="332" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">GC</text>
<text x="220" y="350" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">jvm dọn rác</text>
<rect x="80" y="384" width="280" height="56" rx="6" fill="#060913"/>
<rect x="80" y="384" width="280" height="56" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="220" y="412" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Class + Interface</text>
<rect x="80" y="464" width="280" height="56" rx="6" fill="#060913"/>
<rect x="80" y="464" width="280" height="56" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="220" y="492" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Coroutines</text>
<text x="220" y="510" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">suspend · flow</text>
<!-- swift -->
<rect x="440" y="64" width="280" height="56" rx="6" fill="#060913"/>
<rect x="440" y="64" width="280" height="56" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="580" y="98" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">let / var</text>
<rect x="440" y="144" width="280" height="56" rx="6" fill="#060913"/>
<rect x="440" y="144" width="280" height="56" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="580" y="172" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Optional</text>
<text x="580" y="190" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">guard · if-let</text>
<rect x="440" y="224" width="280" height="56" rx="6" fill="#060913"/>
<rect x="440" y="224" width="280" height="56" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="580" y="252" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">struct</text>
<text x="580" y="270" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">value · cow</text>
<rect x="440" y="304" width="280" height="56" rx="6" fill="#060913"/>
<rect x="440" y="304" width="280" height="56" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="580" y="332" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">ARC</text>
<text x="580" y="350" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">weak self</text>
<rect x="440" y="384" width="280" height="56" rx="6" fill="#060913"/>
<rect x="440" y="384" width="280" height="56" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="580" y="412" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Protocol + Struct</text>
<rect x="440" y="464" width="280" height="56" rx="6" fill="#060913"/>
<rect x="440" y="464" width="280" height="56" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="580" y="492" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">async/await</text>
<text x="580" y="510" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">task · mainactor</text>
<!-- legend -->
<line x1="32" y1="564" x2="768" y2="564" stroke="rgba(248,250,252,0.12)" stroke-width="0.8"/>
<text x="32" y="580" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" letter-spacing="0.14em">CHÚ GIẢI</text>
<rect x="150" y="572" width="40" height="16" rx="4" fill="rgba(56,189,248,0.05)" stroke="rgba(56,189,248,0.28)" stroke-width="1.2"/>
<text x="198" y="580" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace">VÙNG ĐÍCH · SWIFT</text>
<line x1="420" y1="580" x2="452" y2="580" stroke="#94A3B8" stroke-width="1.2" stroke-dasharray="4,3"/>
<text x="460" y="584" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace">NÉT ĐỨT · CẶP TƯƠNG ĐƯƠNG</text>
</svg>
</div>
<div class="dd-svg dd-svg-light">
<svg viewBox="0 0 800 596" role="img" aria-labelledby="ios-kotlinmap-title ios-kotlinmap-desc" font-family="'Geist', sans-serif">
<title id="ios-kotlinmap-title">Kotlin sang Swift: sáu cặp song sinh</title>
<desc id="ios-kotlinmap-desc">Sáu khái niệm Kotlin ánh xạ sang Swift: biến, null, model, bộ nhớ, OOP và bất đồng bộ.</desc>
<defs>
<marker id="ios-kotlinmap-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0, 8 3, 0 6" fill="#64748B"/>
</marker>
</defs>
<rect width="800" height="596" fill="#F8FAFC"/>
<!-- zones -->
<rect x="32" y="24" width="360" height="516" rx="8" fill="rgba(15,23,42,0.02)" stroke="rgba(15,23,42,0.10)" stroke-width="0.8"/>
<rect x="48" y="28" width="160" height="12" rx="2" fill="#F8FAFC"/>
<text x="128" y="37" fill="#94A3B8" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.14em">KOTLIN · ANDROID</text>
<rect x="408" y="24" width="360" height="516" rx="8" fill="rgba(56,189,248,0.05)" stroke="rgba(56,189,248,0.28)" stroke-width="1.2"/>
<rect x="424" y="28" width="144" height="12" rx="2" fill="#F8FAFC"/>
<text x="496" y="37" fill="#0284C7" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.14em">SWIFT · ĐÍCH ĐẾN</text>
<!-- rungs -->
<path d="M 360,92 H 440" fill="none" stroke="#64748B" stroke-width="1.2" stroke-dasharray="4,3"/>
<path d="M 360,172 H 440" fill="none" stroke="#64748B" stroke-width="1.2" stroke-dasharray="4,3"/>
<path d="M 360,252 H 440" fill="none" stroke="#64748B" stroke-width="1.2" stroke-dasharray="4,3"/>
<path d="M 360,332 H 440" fill="none" stroke="#64748B" stroke-width="1.2" stroke-dasharray="4,3"/>
<path d="M 360,412 H 440" fill="none" stroke="#64748B" stroke-width="1.2" stroke-dasharray="4,3"/>
<path d="M 360,492 H 440" fill="none" stroke="#64748B" stroke-width="1.2" stroke-dasharray="4,3"/>
<!-- kotlin -->
<rect x="80" y="64" width="280" height="56" rx="6" fill="#F8FAFC"/>
<rect x="80" y="64" width="280" height="56" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="220" y="98" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">val / var</text>
<rect x="80" y="144" width="280" height="56" rx="6" fill="#F8FAFC"/>
<rect x="80" y="144" width="280" height="56" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="220" y="172" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Null: T?</text>
<text x="220" y="190" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">smart cast</text>
<rect x="80" y="224" width="280" height="56" rx="6" fill="#F8FAFC"/>
<rect x="80" y="224" width="280" height="56" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="220" y="252" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">data class</text>
<text x="220" y="270" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">reference</text>
<rect x="80" y="304" width="280" height="56" rx="6" fill="#F8FAFC"/>
<rect x="80" y="304" width="280" height="56" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="220" y="332" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">GC</text>
<text x="220" y="350" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">jvm dọn rác</text>
<rect x="80" y="384" width="280" height="56" rx="6" fill="#F8FAFC"/>
<rect x="80" y="384" width="280" height="56" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="220" y="412" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Class + Interface</text>
<rect x="80" y="464" width="280" height="56" rx="6" fill="#F8FAFC"/>
<rect x="80" y="464" width="280" height="56" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="220" y="492" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Coroutines</text>
<text x="220" y="510" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">suspend · flow</text>
<!-- swift -->
<rect x="440" y="64" width="280" height="56" rx="6" fill="#F8FAFC"/>
<rect x="440" y="64" width="280" height="56" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="580" y="98" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">let / var</text>
<rect x="440" y="144" width="280" height="56" rx="6" fill="#F8FAFC"/>
<rect x="440" y="144" width="280" height="56" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="580" y="172" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Optional</text>
<text x="580" y="190" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">guard · if-let</text>
<rect x="440" y="224" width="280" height="56" rx="6" fill="#F8FAFC"/>
<rect x="440" y="224" width="280" height="56" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="580" y="252" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">struct</text>
<text x="580" y="270" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">value · cow</text>
<rect x="440" y="304" width="280" height="56" rx="6" fill="#F8FAFC"/>
<rect x="440" y="304" width="280" height="56" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="580" y="332" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">ARC</text>
<text x="580" y="350" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">weak self</text>
<rect x="440" y="384" width="280" height="56" rx="6" fill="#F8FAFC"/>
<rect x="440" y="384" width="280" height="56" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="580" y="412" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Protocol + Struct</text>
<rect x="440" y="464" width="280" height="56" rx="6" fill="#F8FAFC"/>
<rect x="440" y="464" width="280" height="56" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="580" y="492" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">async/await</text>
<text x="580" y="510" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">task · mainactor</text>
<!-- legend -->
<line x1="32" y1="564" x2="768" y2="564" stroke="rgba(15,23,42,0.12)" stroke-width="0.8"/>
<text x="32" y="580" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" letter-spacing="0.14em">CHÚ GIẢI</text>
<rect x="150" y="572" width="40" height="16" rx="4" fill="rgba(56,189,248,0.05)" stroke="rgba(56,189,248,0.28)" stroke-width="1.2"/>
<text x="198" y="580" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace">VÙNG ĐÍCH · SWIFT</text>
<line x1="420" y1="580" x2="452" y2="580" stroke="#64748B" stroke-width="1.2" stroke-dasharray="4,3"/>
<text x="460" y="584" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace">NÉT ĐỨT · CẶP TƯƠNG ĐƯƠNG</text>
</svg>
</div>
</div>


<h2>1. Khai báo Biến, Hằng & String Interpolation</h2>

<table style="width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;">
  <thead>
    <tr style="border-bottom:2px solid var(--border);">
      <th style="text-align:left;padding:10px;">Kotlin</th>
      <th style="text-align:left;padding:10px;">Swift</th>
      <th style="text-align:left;padding:10px;">Ghi chú</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;"><code>val x = 10</code></td>
      <td style="padding:10px;"><code>let x = 10</code></td>
      <td style="padding:10px;">Hằng số. Swift: bất biến hoàn toàn với struct (Deep Immutability)</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;"><code>var x = 10</code></td>
      <td style="padding:10px;"><code>var x = 10</code></td>
      <td style="padding:10px;">Biến số, có thể gán lại</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;"><code>"Xin chào $name"</code></td>
      <td style="padding:10px;"><code>"Xin chào \(name)"</code></td>
      <td style="padding:10px;">String Interpolation, Swift dùng cú pháp <code>\(expression)</code></td>
    </tr>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;"><code>Boolean</code> / <code>Unit</code></td>
      <td style="padding:10px;"><code>Bool</code> / <code>Void</code></td>
      <td style="padding:10px;">Tên kiểu rút gọn hơn trong Swift</td>
    </tr>
  </tbody>
</table>

<pre><code class="language-swift">let appName: String = "Knowledge OS"  // Hằng số — Type annotation tường minh
let version = 2.0                       // Type Inference: Double

var counter: Int = 0
counter += 1

// String Interpolation
let name = "Hazu"
let age = 25
let greeting = "Xin chào \(name), năm sau bạn \(age + 1) tuổi"

// Multiline String
let multiline = """
    Dòng 1
    Dòng 2
    """
</code></pre>

<h2>2. Optionals: Bỏ tư duy Smart Cast, Làm chủ guard let & if let</h2>
<p>Trong Swift, <code>Optional</code> là một enum thực sự: <code>case none</code> (nil) và <code>case some(Wrapped)</code>. Swift <strong>không có Smart Cast</strong> sau <code>if (x != nil)</code> như Kotlin — bạn phải unwrap tường minh.</p>

<table style="width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;">
  <thead>
    <tr style="border-bottom:2px solid var(--border);">
      <th style="text-align:left;padding:10px;">Kotlin</th>
      <th style="text-align:left;padding:10px;">Swift tương đương</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;"><code>email?.length</code></td>
      <td style="padding:10px;"><code>email?.count</code> (Optional Chaining)</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;"><code>email ?: "default"</code></td>
      <td style="padding:10px;"><code>email ?? "default"</code> (Nil-Coalescing)</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;"><code>if (x != null) { ... }</code></td>
      <td style="padding:10px;"><code>if let x = x { ... }</code> (Optional Binding)</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;"><code>val id = id ?: return</code></td>
      <td style="padding:10px;"><code>guard let id = id else { return }</code> (Early Exit)</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;"><code>email!!</code> (NPE)</td>
      <td style="padding:10px;"><code>email!</code> (Fatal Error / Crash — hạn chế tối đa)</td>
    </tr>
  </tbody>
</table>

<div class="dd-diagram" data-dd="ios-guard">
<div class="dd-svg dd-svg-dark">
<svg viewBox="0 0 800 460" role="img" aria-labelledby="ios-guard-dark-title ios-guard-dark-desc" font-family="'Geist', sans-serif">
<title id="ios-guard-dark-title">guard let: hỏi một lần, yên tâm cả hàm</title>
<desc id="ios-guard-dark-desc">Kiểm tra token nil thì báo lỗi thoát, có token thì unwrap dùng cho toàn hàm.</desc>
<defs>
<marker id="ios-guard-dark-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0, 8 3, 0 6" fill="#94A3B8"/>
</marker>
</defs>
<rect width="800" height="460" fill="#060913"/>
<!-- arrows -->
<path d="M 400,92 V 120" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-guard-dark-arrow)"/>
<path d="M 325,164 V 210 H 188 Q 180,210 180,218 V 248" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-guard-dark-arrow)"/>
<rect x="232" y="190" width="56" height="12" rx="2" fill="#060913"/>
<text x="260" y="199" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">NIL</text>
<path d="M 475,164 V 210 H 612 Q 620,210 620,218 V 248" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-guard-dark-arrow)"/>
<rect x="502" y="190" width="64" height="12" rx="2" fill="#060913"/>
<text x="534" y="199" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">CÓ TOKEN</text>
<path d="M 620,308 V 352" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-guard-dark-arrow)"/>
<!-- nodes -->
<rect x="280" y="32" width="240" height="60" rx="20" fill="#060913"/>
<rect x="280" y="32" width="240" height="60" rx="20" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="400" y="66" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Bắt đầu hàm</text>
<polygon points="400,120 475,164 400,208 325,164" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="1.2"/>
<text x="400" y="168" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">GUARD LET?</text>
<rect x="80" y="248" width="200" height="60" rx="20" fill="#060913"/>
<rect x="80" y="248" width="200" height="60" rx="20" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="180" y="282" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Log lỗi · return</text>
<rect x="520" y="248" width="200" height="60" rx="6" fill="#060913"/>
<rect x="520" y="248" width="200" height="60" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="620" y="282" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Unwrap xong</text>
<text x="620" y="300" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">non-optional</text>
<rect x="520" y="352" width="200" height="60" rx="6" fill="#060913"/>
<rect x="520" y="352" width="200" height="60" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="620" y="386" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Xử lý API</text>
<text x="620" y="404" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">business logic</text>
<!-- legend -->
<line x1="32" y1="436" x2="768" y2="436" stroke="rgba(248,250,252,0.12)" stroke-width="0.8"/>
<text x="32" y="452" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" letter-spacing="0.14em">CHÚ GIẢI</text>
<circle cx="150" cy="448" r="4" fill="#38BDF8"/>
<text x="162" y="452" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace">CÂU HỎI GÁC CỔNG</text>
<line x1="400" y1="448" x2="432" y2="448" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-guard-dark-arrow)"/>
<text x="440" y="452" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace">NIL THOÁT · CÓ ĐI TIẾP</text>
</svg>
</div>
<div class="dd-svg dd-svg-light">
<svg viewBox="0 0 800 460" role="img" aria-labelledby="ios-guard-title ios-guard-desc" font-family="'Geist', sans-serif">
<title id="ios-guard-title">guard let: hỏi một lần, yên tâm cả hàm</title>
<desc id="ios-guard-desc">Kiểm tra token nil thì báo lỗi thoát, có token thì unwrap dùng cho toàn hàm.</desc>
<defs>
<marker id="ios-guard-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0, 8 3, 0 6" fill="#64748B"/>
</marker>
</defs>
<rect width="800" height="460" fill="#F8FAFC"/>
<!-- arrows -->
<path d="M 400,92 V 120" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-guard-arrow)"/>
<path d="M 325,164 V 210 H 188 Q 180,210 180,218 V 248" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-guard-arrow)"/>
<rect x="232" y="190" width="56" height="12" rx="2" fill="#F8FAFC"/>
<text x="260" y="199" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">NIL</text>
<path d="M 475,164 V 210 H 612 Q 620,210 620,218 V 248" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-guard-arrow)"/>
<rect x="502" y="190" width="64" height="12" rx="2" fill="#F8FAFC"/>
<text x="534" y="199" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">CÓ TOKEN</text>
<path d="M 620,308 V 352" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-guard-arrow)"/>
<!-- nodes -->
<rect x="280" y="32" width="240" height="60" rx="20" fill="#F8FAFC"/>
<rect x="280" y="32" width="240" height="60" rx="20" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="400" y="66" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Bắt đầu hàm</text>
<polygon points="400,120 475,164 400,208 325,164" fill="rgba(2,132,199,0.08)" stroke="#0284C7" stroke-width="1.2"/>
<text x="400" y="168" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">GUARD LET?</text>
<rect x="80" y="248" width="200" height="60" rx="20" fill="#F8FAFC"/>
<rect x="80" y="248" width="200" height="60" rx="20" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="180" y="282" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Log lỗi · return</text>
<rect x="520" y="248" width="200" height="60" rx="6" fill="#F8FAFC"/>
<rect x="520" y="248" width="200" height="60" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="620" y="282" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Unwrap xong</text>
<text x="620" y="300" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">non-optional</text>
<rect x="520" y="352" width="200" height="60" rx="6" fill="#F8FAFC"/>
<rect x="520" y="352" width="200" height="60" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="620" y="386" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Xử lý API</text>
<text x="620" y="404" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">business logic</text>
<!-- legend -->
<line x1="32" y1="436" x2="768" y2="436" stroke="rgba(15,23,42,0.12)" stroke-width="0.8"/>
<text x="32" y="452" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" letter-spacing="0.14em">CHÚ GIẢI</text>
<circle cx="150" cy="448" r="4" fill="#0284C7"/>
<text x="162" y="452" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace">CÂU HỎI GÁC CỔNG</text>
<line x1="400" y1="448" x2="432" y2="448" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-guard-arrow)"/>
<text x="440" y="452" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace">NIL THOÁT · CÓ ĐI TIẾP</text>
</svg>
</div>
</div>


<pre><code class="language-swift">func submitOrder(productId: String?, quantity: Int?) {
    // Kiểm tra đồng thời nhiều optionals + điều kiện logic
    guard let productId = productId,
          let quantity = quantity, quantity > 0 else {
        print("Dữ liệu đầu vào không hợp lệ!")
        return // BẮT BUỘC return, throw hoặc break
    }
    // Từ đây: productId và quantity là non-optional
    print("Đặt hàng \(productId) x\(quantity)")
}
</code></pre>

<h2>3. Hàm & Argument Labels (Cú pháp đặc trưng của Swift)</h2>
<p>Mỗi tham số Swift có thể có <strong>Argument Label</strong> (nhãn khi gọi — đọc như câu tiếng Anh) và <strong>Parameter Name</strong> (tên biến dùng trong thân hàm). Đây là điểm cú pháp khác biệt lớn nhất so với Kotlin.</p>

<pre><code class="language-swift">// 1. Nhãn ngoài (to) vs tên trong (recipient)
func sendNotification(to recipient: String, message: String, isUrgent: Bool = false) {
    print("Gửi tới \(recipient): \(message)")
}
// Khi gọi — đọc như câu tiếng Anh:
sendNotification(to: "user_123", message: "Họp lúc 9h")
sendNotification(to: "user_123", message: "Báo động!", isUrgent: true)

// 2. Bỏ nhãn bằng '_' — giống phong cách Kotlin/C
func sum(_ a: Int, _ b: Int) -> Int { return a + b }
let total = sum(10, 20)

// 3. inout — sửa trực tiếp biến gốc (truyền bằng &)
func swapValues(_ a: inout Int, _ b: inout Int) {
    let temp = a; a = b; b = temp
}
var x = 10, y = 20
swapValues(&x, &y) // x: 20, y: 10
</code></pre>

<h2>4. data class (Kotlin) vs struct (Swift): Value Type Semantics</h2>
<p>Trong Kotlin, <code>data class</code> là <strong>Reference Type</strong> (phân bổ trên Heap, truyền theo con trỏ tham chiếu). Trong Swift, <code>struct</code> là <strong>Value Type</strong> — khi gán hoặc truyền vào hàm, nó <strong>sao chép giá trị độc lập</strong>.</p>

<div class="dd-diagram" data-dd="ios-valuesem">
<div class="dd-svg dd-svg-dark">
<svg viewBox="0 0 800 312" role="img" aria-labelledby="ios-valuesem-dark-title ios-valuesem-dark-desc" font-family="'Geist', sans-serif">
<title id="ios-valuesem-dark-title">Reference chung heap, value mỗi người một bản</title>
<desc id="ios-valuesem-dark-desc">Kotlin reference cùng trỏ một object trên heap, Swift struct thì mỗi biến một bản copy độc lập.</desc>
<defs>
<marker id="ios-valuesem-dark-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0, 8 3, 0 6" fill="#94A3B8"/>
</marker>
</defs>
<rect width="800" height="312" fill="#060913"/>
<!-- zones -->
<rect x="32" y="24" width="360" height="240" rx="8" fill="rgba(248,250,252,0.02)" stroke="rgba(248,250,252,0.10)" stroke-width="0.8"/>
<rect x="48" y="28" width="168" height="12" rx="2" fill="#060913"/>
<text x="132" y="37" fill="#64748B" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.14em">KOTLIN · REFERENCE</text>
<rect x="408" y="24" width="360" height="240" rx="8" fill="rgba(56,189,248,0.05)" stroke="rgba(56,189,248,0.28)" stroke-width="1.2"/>
<rect x="424" y="28" width="152" height="12" rx="2" fill="#060913"/>
<text x="500" y="37" fill="#38BDF8" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.14em">SWIFT · VALUE</text>
<!-- arrows -->
<path d="M 136,116 V 140" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-valuesem-dark-arrow)"/>
<path d="M 280,116 V 140" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-valuesem-dark-arrow)"/>
<path d="M 208,192 V 216" fill="none" stroke="#94A3B8" stroke-width="1.2" stroke-dasharray="4,3"/>
<path d="M 512,116 V 140" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-valuesem-dark-arrow)"/>
<path d="M 660,116 V 140" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-valuesem-dark-arrow)"/>
<path d="M 508,192 V 216" fill="none" stroke="#94A3B8" stroke-width="1.2" stroke-dasharray="4,3"/>
<path d="M 668,192 V 216" fill="none" stroke="#94A3B8" stroke-width="1.2" stroke-dasharray="4,3"/>
<!-- nodes -->
<rect x="64" y="64" width="144" height="52" rx="6" fill="#060913"/>
<rect x="64" y="64" width="144" height="52" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="136" y="96" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">u1 = User</text>
<text x="136" y="110" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">'Alice'</text>
<rect x="208" y="64" width="144" height="52" rx="6" fill="#060913"/>
<rect x="208" y="64" width="144" height="52" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="280" y="96" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">u2 = u1</text>
<text x="280" y="110" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">chung ref</text>
<rect x="64" y="140" width="288" height="52" rx="6" fill="#060913"/>
<rect x="64" y="140" width="288" height="52" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="208" y="172" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Heap: Alice</text>
<text x="208" y="186" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">1 object · 2 refs</text>
<rect x="64" y="216" width="288" height="20" rx="6" fill="#060913"/>
<rect x="64" y="216" width="288" height="20" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="208" y="230" fill="#F8FAFC" font-size="11" font-weight="600" text-anchor="middle">u2 đổi tên → u1 đổi theo!</text>
<rect x="440" y="64" width="144" height="52" rx="6" fill="#060913"/>
<rect x="440" y="64" width="144" height="52" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="512" y="96" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">u1 = User</text>
<text x="512" y="110" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">'Alice'</text>
<rect x="588" y="64" width="144" height="52" rx="6" fill="#060913"/>
<rect x="588" y="64" width="144" height="52" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="660" y="96" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">u2 = u1</text>
<text x="660" y="110" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">copy mới</text>
<rect x="444" y="140" width="136" height="52" rx="6" fill="#060913"/>
<rect x="444" y="140" width="136" height="52" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="512" y="172" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Copy 1: Alice</text>
<rect x="592" y="140" width="136" height="52" rx="6" fill="#060913"/>
<rect x="592" y="140" width="136" height="52" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="660" y="172" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Copy 2: Alice</text>
<rect x="440" y="216" width="296" height="20" rx="6" fill="#060913"/>
<rect x="440" y="216" width="296" height="20" rx="6" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="1.2"/>
<text x="588" y="230" fill="#F8FAFC" font-size="11" font-weight="600" text-anchor="middle">u1 vẫn là Alice ✓</text>
<!-- legend -->
<line x1="32" y1="288" x2="768" y2="288" stroke="rgba(248,250,252,0.12)" stroke-width="0.8"/>
<text x="32" y="304" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" letter-spacing="0.14em">CHÚ GIẢI</text>
<circle cx="150" cy="300" r="4" fill="#38BDF8"/>
<text x="162" y="304" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace">MỖI NGƯỜI MỘT BẢN · VALUE</text>
<line x1="450" y1="300" x2="482" y2="300" stroke="#94A3B8" stroke-width="1.2" stroke-dasharray="4,3"/>
<text x="490" y="304" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace">NÉT ĐỨT · HỆ QUẢ</text>
</svg>
</div>
<div class="dd-svg dd-svg-light">
<svg viewBox="0 0 800 312" role="img" aria-labelledby="ios-valuesem-title ios-valuesem-desc" font-family="'Geist', sans-serif">
<title id="ios-valuesem-title">Reference chung heap, value mỗi người một bản</title>
<desc id="ios-valuesem-desc">Kotlin reference cùng trỏ một object trên heap, Swift struct thì mỗi biến một bản copy độc lập.</desc>
<defs>
<marker id="ios-valuesem-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0, 8 3, 0 6" fill="#64748B"/>
</marker>
</defs>
<rect width="800" height="312" fill="#F8FAFC"/>
<!-- zones -->
<rect x="32" y="24" width="360" height="240" rx="8" fill="rgba(15,23,42,0.02)" stroke="rgba(15,23,42,0.10)" stroke-width="0.8"/>
<rect x="48" y="28" width="168" height="12" rx="2" fill="#F8FAFC"/>
<text x="132" y="37" fill="#94A3B8" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.14em">KOTLIN · REFERENCE</text>
<rect x="408" y="24" width="360" height="240" rx="8" fill="rgba(56,189,248,0.05)" stroke="rgba(56,189,248,0.28)" stroke-width="1.2"/>
<rect x="424" y="28" width="152" height="12" rx="2" fill="#F8FAFC"/>
<text x="500" y="37" fill="#0284C7" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.14em">SWIFT · VALUE</text>
<!-- arrows -->
<path d="M 136,116 V 140" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-valuesem-arrow)"/>
<path d="M 280,116 V 140" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-valuesem-arrow)"/>
<path d="M 208,192 V 216" fill="none" stroke="#64748B" stroke-width="1.2" stroke-dasharray="4,3"/>
<path d="M 512,116 V 140" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-valuesem-arrow)"/>
<path d="M 660,116 V 140" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-valuesem-arrow)"/>
<path d="M 508,192 V 216" fill="none" stroke="#64748B" stroke-width="1.2" stroke-dasharray="4,3"/>
<path d="M 668,192 V 216" fill="none" stroke="#64748B" stroke-width="1.2" stroke-dasharray="4,3"/>
<!-- nodes -->
<rect x="64" y="64" width="144" height="52" rx="6" fill="#F8FAFC"/>
<rect x="64" y="64" width="144" height="52" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="136" y="96" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">u1 = User</text>
<text x="136" y="110" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">'Alice'</text>
<rect x="208" y="64" width="144" height="52" rx="6" fill="#F8FAFC"/>
<rect x="208" y="64" width="144" height="52" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="280" y="96" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">u2 = u1</text>
<text x="280" y="110" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">chung ref</text>
<rect x="64" y="140" width="288" height="52" rx="6" fill="#F8FAFC"/>
<rect x="64" y="140" width="288" height="52" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="208" y="172" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Heap: Alice</text>
<text x="208" y="186" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">1 object · 2 refs</text>
<rect x="64" y="216" width="288" height="20" rx="6" fill="#F8FAFC"/>
<rect x="64" y="216" width="288" height="20" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="208" y="230" fill="#0F172A" font-size="11" font-weight="600" text-anchor="middle">u2 đổi tên → u1 đổi theo!</text>
<rect x="440" y="64" width="144" height="52" rx="6" fill="#F8FAFC"/>
<rect x="440" y="64" width="144" height="52" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="512" y="96" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">u1 = User</text>
<text x="512" y="110" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">'Alice'</text>
<rect x="588" y="64" width="144" height="52" rx="6" fill="#F8FAFC"/>
<rect x="588" y="64" width="144" height="52" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="660" y="96" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">u2 = u1</text>
<text x="660" y="110" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">copy mới</text>
<rect x="444" y="140" width="136" height="52" rx="6" fill="#F8FAFC"/>
<rect x="444" y="140" width="136" height="52" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="512" y="172" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Copy 1: Alice</text>
<rect x="592" y="140" width="136" height="52" rx="6" fill="#F8FAFC"/>
<rect x="592" y="140" width="136" height="52" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="660" y="172" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Copy 2: Alice</text>
<rect x="440" y="216" width="296" height="20" rx="6" fill="#F8FAFC"/>
<rect x="440" y="216" width="296" height="20" rx="6" fill="rgba(2,132,199,0.08)" stroke="#0284C7" stroke-width="1.2"/>
<text x="588" y="230" fill="#0F172A" font-size="11" font-weight="600" text-anchor="middle">u1 vẫn là Alice ✓</text>
<!-- legend -->
<line x1="32" y1="288" x2="768" y2="288" stroke="rgba(15,23,42,0.12)" stroke-width="0.8"/>
<text x="32" y="304" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" letter-spacing="0.14em">CHÚ GIẢI</text>
<circle cx="150" cy="300" r="4" fill="#0284C7"/>
<text x="162" y="304" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace">MỖI NGƯỜI MỘT BẢN · VALUE</text>
<line x1="450" y1="300" x2="482" y2="300" stroke="#64748B" stroke-width="1.2" stroke-dasharray="4,3"/>
<text x="490" y="304" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace">NÉT ĐỨT · HỆ QUẢ</text>
</svg>
</div>
</div>


<pre><code class="language-swift">struct Product: Equatable, Identifiable {
    let id: String
    var name: String
    var price: Double

    // Phương thức sửa đổi thuộc tính bên trong struct PHẢI có từ khoá 'mutating'
    mutating func applyDiscount(percentage: Double) {
        price = price * (1.0 - percentage / 100.0)
    }
}

var p1 = Product(id: "1", name: "iPhone 15", price: 999.0)
var p2 = p1           // SAO CHÉP ĐỘC LẬP ngay lập tức
p2.applyDiscount(percentage: 10.0)

print(p1.price)       // 999.0 — Không bị ảnh hưởng
print(p2.price)       // 899.1
</code></pre>

<blockquote style="border-left:4px solid var(--accent);padding:12px 16px;margin:1.5rem 0;background:var(--surface-raised);">
  <strong>Quy tắc vàng:</strong> Mặc định luôn dùng <code>struct</code> cho Models, ViewState, DTO, Entity. Chỉ dùng <code>class</code> khi cần chia sẻ trạng thái dùng chung (ViewModel, Service, Manager) hoặc kế thừa UIKit class (<code>UIViewController</code>, <code>UIView</code>).
</blockquote>

<h2>5. Collections thực chiến (Array, Dictionary, Set)</h2>
<p>Swift không phân chia <code>List</code> / <code>MutableList</code>. Tính mutable được kiểm soát bằng <code>let</code> (Immutable) hoặc <code>var</code> (Mutable).</p>

<pre><code class="language-swift">// Array
let immutable: [String] = ["Swift", "Kotlin"] // Không thể append/remove
var mutableArr = ["Swift", "Kotlin"]
mutableArr.append("Dart")

// Higher-order functions — dùng $0 thay cho 'it'
let numbers = [1, 2, 3, 4, 5]
let doubled  = numbers.map    { $0 * 2 }
let evens    = numbers.filter { $0 % 2 == 0 }
let total    = numbers.reduce(0) { $0 + $1 }

// compactMap: lọc bỏ nil (cực kỳ hay dùng)
let strings  = ["1", "2", "abc", "4"]
let ints     = strings.compactMap { Int($0) }  // [1, 2, 4]

// Dictionary — truy cập key luôn trả về Optional (Int?)
let scores: [String: Int] = ["Alice": 95, "Bob": 80]
if let aliceScore = scores["Alice"] {
    print("Điểm Alice: \(aliceScore)")
}
let bobScore = scores["Bob"] ?? 0    // Nil-Coalescing
</code></pre>

<h2>6. Rẽ nhánh & Pattern Matching: when vs switch</h2>
<p><code>switch</code> trong Swift là <strong>Exhaustive</strong> (phải vét cạn hoặc có <code>default</code>), <strong>không bị fall-through</strong> (không cần <code>break</code>), và hỗ trợ Pattern Matching cực mạnh với Enum có Associated Values.</p>

<pre><code class="language-swift">enum ViewState {
    case loading
    case success(items: [String])
    case error(code: Int, message: String)
}

func render(state: ViewState) {
    switch state {
    case .loading:
        showLoading(true)

    case .success(let items):
        displayList(items)

    // Pattern Matching kết hợp điều kiện where
    case .error(code: 401, _):
        redirectToLogin()

    case .error(let code, let message) where code >= 500:
        showServerError(message)

    case .error(_, let message):
        showError(message)
    }
}
</code></pre>

<h2>7. Closures & Bẫy bộ nhớ ARC [weak self]</h2>
<p>Kotlin dùng JVM Garbage Collector — chu trình tham chiếu vòng vẫn được dọn dẹp tự động. Swift dùng <strong>ARC</strong> — nếu <code>self</code> giữ closure và closure capture <code>self</code> mạnh (strong), tạo ra <strong>Retain Cycle</strong>: đối tượng không bao giờ được giải phóng khỏi RAM.</p>

<div class="dd-diagram" data-dd="ios-weakself">
<div class="dd-svg dd-svg-dark">
<svg viewBox="0 0 800 328" role="img" aria-labelledby="ios-weakself-dark-title ios-weakself-dark-desc" font-family="'Geist', sans-serif">
<title id="ios-weakself-dark-title">Quên weak self là rò rỉ cả màn hình</title>
<desc id="ios-weakself-dark-desc">Closure giữ self mạnh tạo vòng retain, thêm weak self thì vòng đứt và bộ nhớ được giải phóng.</desc>
<defs>
<marker id="ios-weakself-dark-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0, 8 3, 0 6" fill="#94A3B8"/>
</marker>
<marker id="ios-weakself-dark-accent" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0, 8 3, 0 6" fill="#38BDF8"/>
</marker>
</defs>
<rect width="800" height="328" fill="#060913"/>
<!-- zones -->
<rect x="32" y="24" width="360" height="256" rx="8" fill="rgba(248,250,252,0.02)" stroke="rgba(248,250,252,0.10)" stroke-width="0.8"/>
<rect x="48" y="28" width="128" height="12" rx="2" fill="#060913"/>
<text x="112" y="37" fill="#64748B" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.14em">RÒ RỈ · LEAK</text>
<rect x="408" y="24" width="360" height="256" rx="8" fill="rgba(56,189,248,0.05)" stroke="rgba(56,189,248,0.28)" stroke-width="1.2"/>
<rect x="424" y="28" width="128" height="12" rx="2" fill="#060913"/>
<text x="488" y="37" fill="#38BDF8" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.14em">FIX · WEAK SELF</text>
<!-- left cycle -->
<path d="M 164,160 V 220" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-weakself-dark-arrow)"/>
<rect x="176" y="178" width="80" height="12" rx="2" fill="#060913"/>
<text x="216" y="187" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">STRONG REF</text>
<path d="M 264,250 H 292 Q 300,250 300,242 V 130 H 272 Q 264,130 264,138 V 160" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-weakself-dark-arrow)"/>
<rect x="312" y="182" width="96" height="12" rx="2" fill="#060913"/>
<text x="360" y="191" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">CAPTURE SELF</text>
<!-- right fixed -->
<path d="M 540,160 V 220" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-weakself-dark-arrow)"/>
<rect x="552" y="178" width="80" height="12" rx="2" fill="#060913"/>
<text x="592" y="187" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">STRONG REF</text>
<path d="M 640,250 H 668 Q 676,250 676,242 V 138 Q 676,130 668,130 H 640" fill="none" stroke="#38BDF8" stroke-width="1.2" stroke-dasharray="4,3" marker-end="url(#ios-weakself-dark-accent)"/>
<rect x="616" y="182" width="128" height="12" rx="2" fill="#060913"/>
<text x="680" y="191" fill="#38BDF8" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">WEAK · KHÔNG RC</text>
<!-- nodes left -->
<rect x="64" y="100" width="200" height="60" rx="6" fill="#060913"/>
<rect x="64" y="100" width="200" height="60" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="164" y="134" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">ViewModel</text>
<rect x="64" y="220" width="200" height="60" rx="6" fill="#060913"/>
<rect x="64" y="220" width="200" height="60" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="164" y="254" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Closure Callback</text>
<!-- nodes right -->
<rect x="440" y="100" width="200" height="60" rx="6" fill="#060913"/>
<rect x="440" y="100" width="200" height="60" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="540" y="134" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">ViewModel</text>
<rect x="440" y="220" width="200" height="60" rx="6" fill="#060913"/>
<rect x="440" y="220" width="200" height="60" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="540" y="254" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Closure Callback</text>
<!-- legend -->
<line x1="32" y1="304" x2="768" y2="304" stroke="rgba(248,250,252,0.12)" stroke-width="0.8"/>
<text x="32" y="320" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" letter-spacing="0.14em">CHÚ GIẢI</text>
<circle cx="150" cy="316" r="4" fill="#38BDF8"/>
<text x="162" y="320" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace">ĐỨT VÒNG · WEAK SELF</text>
<line x1="430" y1="316" x2="462" y2="316" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-weakself-dark-arrow)"/>
<text x="470" y="320" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace">GIỮ CHẶT · STRONG</text>
</svg>
</div>
<div class="dd-svg dd-svg-light">
<svg viewBox="0 0 800 328" role="img" aria-labelledby="ios-weakself-title ios-weakself-desc" font-family="'Geist', sans-serif">
<title id="ios-weakself-title">Quên weak self là rò rỉ cả màn hình</title>
<desc id="ios-weakself-desc">Closure giữ self mạnh tạo vòng retain, thêm weak self thì vòng đứt và bộ nhớ được giải phóng.</desc>
<defs>
<marker id="ios-weakself-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0, 8 3, 0 6" fill="#64748B"/>
</marker>
<marker id="ios-weakself-accent" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0, 8 3, 0 6" fill="#0284C7"/>
</marker>
</defs>
<rect width="800" height="328" fill="#F8FAFC"/>
<!-- zones -->
<rect x="32" y="24" width="360" height="256" rx="8" fill="rgba(15,23,42,0.02)" stroke="rgba(15,23,42,0.10)" stroke-width="0.8"/>
<rect x="48" y="28" width="128" height="12" rx="2" fill="#F8FAFC"/>
<text x="112" y="37" fill="#94A3B8" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.14em">RÒ RỈ · LEAK</text>
<rect x="408" y="24" width="360" height="256" rx="8" fill="rgba(56,189,248,0.05)" stroke="rgba(56,189,248,0.28)" stroke-width="1.2"/>
<rect x="424" y="28" width="128" height="12" rx="2" fill="#F8FAFC"/>
<text x="488" y="37" fill="#0284C7" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.14em">FIX · WEAK SELF</text>
<!-- left cycle -->
<path d="M 164,160 V 220" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-weakself-arrow)"/>
<rect x="176" y="178" width="80" height="12" rx="2" fill="#F8FAFC"/>
<text x="216" y="187" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">STRONG REF</text>
<path d="M 264,250 H 292 Q 300,250 300,242 V 130 H 272 Q 264,130 264,138 V 160" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-weakself-arrow)"/>
<rect x="312" y="182" width="96" height="12" rx="2" fill="#F8FAFC"/>
<text x="360" y="191" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">CAPTURE SELF</text>
<!-- right fixed -->
<path d="M 540,160 V 220" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-weakself-arrow)"/>
<rect x="552" y="178" width="80" height="12" rx="2" fill="#F8FAFC"/>
<text x="592" y="187" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">STRONG REF</text>
<path d="M 640,250 H 668 Q 676,250 676,242 V 138 Q 676,130 668,130 H 640" fill="none" stroke="#0284C7" stroke-width="1.2" stroke-dasharray="4,3" marker-end="url(#ios-weakself-accent)"/>
<rect x="616" y="182" width="128" height="12" rx="2" fill="#F8FAFC"/>
<text x="680" y="191" fill="#0284C7" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">WEAK · KHÔNG RC</text>
<!-- nodes left -->
<rect x="64" y="100" width="200" height="60" rx="6" fill="#F8FAFC"/>
<rect x="64" y="100" width="200" height="60" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="164" y="134" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">ViewModel</text>
<rect x="64" y="220" width="200" height="60" rx="6" fill="#F8FAFC"/>
<rect x="64" y="220" width="200" height="60" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="164" y="254" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Closure Callback</text>
<!-- nodes right -->
<rect x="440" y="100" width="200" height="60" rx="6" fill="#F8FAFC"/>
<rect x="440" y="100" width="200" height="60" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="540" y="134" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">ViewModel</text>
<rect x="440" y="220" width="200" height="60" rx="6" fill="#F8FAFC"/>
<rect x="440" y="220" width="200" height="60" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="540" y="254" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Closure Callback</text>
<!-- legend -->
<line x1="32" y1="304" x2="768" y2="304" stroke="rgba(15,23,42,0.12)" stroke-width="0.8"/>
<text x="32" y="320" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" letter-spacing="0.14em">CHÚ GIẢI</text>
<circle cx="150" cy="316" r="4" fill="#0284C7"/>
<text x="162" y="320" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace">ĐỨT VÒNG · WEAK SELF</text>
<line x1="430" y1="316" x2="462" y2="316" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-weakself-arrow)"/>
<text x="470" y="320" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace">GIỮ CHẶT · STRONG</text>
</svg>
</div>
</div>


<pre><code class="language-swift">class UserViewModel {
    var onStateChanged: ((String) -> Void)?
    var userName = ""

    func fetchProfile() {
        ApiService.shared.getUser { [weak self] result in
            // self là Optional lúc này (UserViewModel?)
            guard let self = self else { return }
            switch result {
            case .success(let user):
                self.userName = user.name
                self.onStateChanged?(self.userName)
            case .failure(let error):
                print("Lỗi: \(error)")
            }
        }
    }

    deinit {
        print("UserViewModel đã được giải phóng an toàn!")
    }
}
</code></pre>

<h2>8. Protocol-Oriented Programming (POP) & Extensions</h2>
<p>Trong Swift, <code>protocol</code> tương đương <code>interface</code> Kotlin. Kết hợp với <code>extension</code>, bạn có thể thêm Default Implementation và mở rộng bất kỳ kiểu dữ liệu nào — kể cả kiểu của Apple (<code>String</code>, <code>Int</code>, <code>UIView</code>).</p>

<pre><code class="language-swift">// 1. Định nghĩa Protocol
protocol BaseViewProtocol: AnyObject {
    func showLoading()
    func hideLoading()
    func showError(message: String)
}

// 2. Default Implementation qua Protocol Extension
extension BaseViewProtocol {
    func showError(message: String) {
        print("Alert mặc định: \(message)")
    }
}

// 3. Mở rộng kiểu sẵn có — không cần chạm vào source gốc
extension String {
    var isValidEmail: Bool {
        return self.contains("@") && self.contains(".")
    }
}
print("hazu@ios.dev".isValidEmail) // true
</code></pre>

<h2>9. Property Observers: willSet & didSet (Đặc sản UIKit)</h2>
<p>Tương đương <code>Delegates.observable</code> hay custom setter trong Kotlin. Trong UIKit, <code>didSet</code> là pattern chuẩn để cập nhật UI tự động khi data thay đổi:</p>

<pre><code class="language-swift">class ProductCell: UITableViewCell {
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var priceLabel: UILabel!

    // Khi gán cell.product = newProduct, didSet tự động update UI
    var product: Product? {
        didSet {
            guard let product = product else { return }
            titleLabel.text = product.name
            priceLabel.text = String(format: "$%.2f", product.price)
        }
    }
}
</code></pre>

<h2>10. Swift Concurrency vs Kotlin Coroutines</h2>
<table style="width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;">
  <thead>
    <tr style="border-bottom:2px solid var(--border);">
      <th style="text-align:left;padding:10px;">Khái niệm</th>
      <th style="text-align:left;padding:10px;">Kotlin Coroutines</th>
      <th style="text-align:left;padding:10px;">Swift Concurrency</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;">Hàm bất đồng bộ</td>
      <td style="padding:10px;"><code>suspend fun fetch(): User</code></td>
      <td style="padding:10px;"><code>func fetch() async throws -> User</code></td>
    </tr>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;">Điểm gọi chờ</td>
      <td style="padding:10px;"><code>val user = fetchUser()</code></td>
      <td style="padding:10px;"><code>let user = try await fetchUser()</code></td>
    </tr>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;">Tạo Scope</td>
      <td style="padding:10px;"><code>lifecycleScope.launch { ... }</code></td>
      <td style="padding:10px;"><code>Task { ... }</code></td>
    </tr>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;">Main Thread</td>
      <td style="padding:10px;"><code>withContext(Dispatchers.Main)</code></td>
      <td style="padding:10px;"><code>@MainActor</code> (annotation trên class/func)</td>
    </tr>
  </tbody>
</table>

<pre><code class="language-swift">func loadUserData(userId: String) async throws -> User {
    let (data, _) = try await URLSession.shared.data(from: URL(string: "https://api.example.com/users/\(userId)")!)
    return try JSONDecoder().decode(User.self, from: data)
}

// Gọi trong UIViewController:
Task { @MainActor in
    do {
        let user = try await loadUserData(userId: "123")
        self.updateUI(with: user)
    } catch {
        self.showError(error.localizedDescription)
    }
}
</code></pre>

<h2>11. Quick Cheat Sheet: Kotlin → Swift</h2>
<table style="width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:13px;">
  <thead>
    <tr style="border-bottom:2px solid var(--border);">
      <th style="text-align:left;padding:8px;">Nhu cầu</th>
      <th style="text-align:left;padding:8px;">Kotlin</th>
      <th style="text-align:left;padding:8px;">Swift</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;">Hằng số</td><td style="padding:8px;"><code>val x = 10</code></td><td style="padding:8px;"><code>let x = 10</code></td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;">Ép kiểu an toàn</td><td style="padding:8px;"><code>obj as? String</code></td><td style="padding:8px;"><code>obj as? String</code></td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;">Ép kiểu bắt buộc</td><td style="padding:8px;"><code>obj as String</code></td><td style="padding:8px;"><code>obj as! String</code></td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;">Kiểm tra kiểu</td><td style="padding:8px;"><code>if (x is String)</code></td><td style="padding:8px;"><code>if x is String</code></td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;">Giá trị mặc định khi null</td><td style="padding:8px;"><code>str ?: "default"</code></td><td style="padding:8px;"><code>str ?? "default"</code></td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;">Early return khi null</td><td style="padding:8px;"><code>val id = id ?: return</code></td><td style="padding:8px;"><code>guard let id = id else { return }</code></td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;">Kiểm tra rỗng</td><td style="padding:8px;"><code>list.isEmpty()</code></td><td style="padding:8px;"><code>list.isEmpty</code> (Property)</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;">Vòng lặp Range</td><td style="padding:8px;"><code>for i in 0 until 5</code></td><td style="padding:8px;"><code>for i in 0..&lt;5</code></td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;">Lambda shorthand</td><td style="padding:8px;"><code>it</code></td><td style="padding:8px;"><code>$0</code></td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;">In ra console</td><td style="padding:8px;"><code>println("...")</code></td><td style="padding:8px;"><code>print("...")</code></td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;">Singleton</td><td style="padding:8px;"><code>object AppManager</code></td><td style="padding:8px;"><code>class AppManager { static let shared = AppManager(); private init() {} }</code></td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;">Lazy init</td><td style="padding:8px;"><code>val x by lazy { ... }</code></td><td style="padding:8px;"><code>lazy var x = ...</code></td></tr>
  </tbody>
</table>

<h2>12. 5 Bẫy cú pháp Kotlin Dev dễ mắc nhất</h2>
<ol style="line-height:2.2;">
  <li><strong>Quên Argument Label khi gọi hàm:</strong> <code>login("hazu", "123")</code> sẽ compile error. Phải viết <code>login(username: "hazu", password: "123")</code>.</li>
  <li><strong>Khai báo <code>class</code> cho mọi Model:</strong> Mặc định dùng <code>struct</code>. Chỉ dùng <code>class</code> khi cần chia sẻ trạng thái chung hoặc kế thừa UIKit.</li>
  <li><strong>Quên <code>[weak self]</code> trong Closure bất đồng bộ:</strong> Luôn dùng <code>[weak self]</code> khi closure có thể sống lâu hơn <code>self</code>.</li>
  <li><strong>Lạm dụng Force Unwrap <code>!</code>:</strong> Dùng <code>guard let</code>, <code>if let</code>, hoặc <code>??</code>. Hạn chế <code>!</code> tối đa để tránh crash runtime.</li>
  <li><strong>So sánh Struct bằng <code>==</code> mà quên <code>Equatable</code>:</strong> Thêm <code>: Equatable</code> vào khai báo struct để compiler tự tổng hợp hàm so sánh.</li>
</ol>

<h2>13. Bài tập thực hành</h2>
<p style="background:var(--surface-raised);border-left:4px solid var(--accent);padding:12px 16px;margin:1rem 0;">Mục tiêu: Tự code kiểm chứng 4 bẫy lớn nhất của Kotlin Dev khi sang Swift. Mỗi bài có <strong>Yêu cầu → Gợi ý → Tiêu chí pass</strong>. Chạy trên Xcode Playground hoặc SwiftUI project mới.</p>

<h3>Bài 1 — <code>let</code> Deep Immutability &amp; <code>mutating</code> (§1, §5)</h3>
<p><strong>Yêu cầu:</strong></p>
<ol>
  <li>Tạo <code>struct User { var name: String }</code> và <code>let user = User(name: "Hazu")</code>, thử <code>user.name = "Bob"</code> — ghi lại lỗi compiler.</li>
  <li>Sửa thành <code>var user2</code> và đổi tên thành công.</li>
  <li>Viết <code>mutating func rename(to:)</code> trong <code>struct</code>, gọi từ <code>var</code> và <code>let</code> để thấy khác biệt.</li>
  <li>So sánh với <code>class UserClass</code> dùng <code>let instance</code> vẫn đổi được <code>instance.name</code>.</li>
</ol>
<p><strong>Gợi ý:</strong> <code>let</code> với <code>struct</code> khóa toàn bộ value (copy), với <code>class</code> chỉ khóa reference.</p>
<p><strong>Tiêu chí pass:</strong> Giải thích được vì sao <code>let struct</code> báo <code>Cannot assign to property</code> còn <code>let class</code> thì không. <code>mutating</code> chỉ compile với <code>var</code>.</p>
<pre><code class="language-swift">struct User { var name: String; mutating func rename(to newName: String) { name = newName } }
let a = User(name: "Hazu")
// a.rename(to: "Bob") // ❌ Cannot use mutating member on immutable value
var b = User(name: "Hazu")
b.rename(to: "Bob") // ✅</code></pre>

<h3>Bài 2 — <code>guard let</code> &amp; Optional Chaining (§6)</h3>
<p><strong>Yêu cầu:</strong> Viết <code>func login(token: String?, userId: String?, age: Int?)</code> chỉ in <code>"Đăng nhập: \\(userId)"</code> khi cả 3 non-nil, <code>token</code> non-empty và <code>age &gt;= 18</code>. Nếu fail thì <code>return</code> sớm. Không dùng <code>!</code>, không dùng pyramid <code>if let</code>.</p>
<p><strong>Gợi ý:</strong> Dùng 1 <code>guard let</code> duy nhất:</p>
<pre><code class="language-swift">func login(token: String?, userId: String?, age: Int?) {
    guard let token = token, !token.isEmpty,
          let userId = userId,
          let age = age, age >= 18 else { return }
    print("Đăng nhập: \\(userId) với token \\(token)")
}</code></pre>
<p><strong>Tiêu chí pass:</strong> <code>login(token: nil, ...)</code> và <code>login(token: "", ...)</code> đều return sớm không crash. Dùng <code>??</code> khi cần default.</p>

<h3>Bài 3 — Retain Cycle &amp; <code>[weak self]</code> (§10)</h3>
<p><strong>Yêu cầu:</strong></p>
<ol>
  <li>Tạo <code>class ProfileViewModel { var onUpdate: ((String)-&gt;Void)?; func fetch() }</code> mô phỏng <code>ApiService.shared.getUser</code> bằng <code>DispatchQueue.global().asyncAfter</code>.</li>
  <li>Trong <code>fetch</code>, capture <code>self</code> mạnh để tạo retain cycle: <code>self</code> → <code>onUpdate</code> → <code>self</code>.</li>
  <li>Chứng minh leak: <code>deinit { print("deinit") }</code> không được gọi khi <code>viewModel = nil</code>.</li>
  <li>Fix bằng <code>[weak self]</code> + <code>guard let self else { return }</code> và xác nhận <code>deinit</code> in ra.</li>
</ol>
<pre><code class="language-swift">func fetch() {
    ApiService.shared.getUser { [weak self] result in
        guard let self = self else { return }
        self.onUpdate?("done")
    }
}
deinit { print("ProfileViewModel deinit - không leak!") }</code></pre>
<p><strong>Tiêu chí pass:</strong> Bản lỗi <code>deinit</code> không in, bản fix in ngay sau <code>viewModel = nil</code>. Giải thích ARC vs GC.</p>

<h3>Bài 4 — Value vs Reference &amp; <code>Equatable</code> (§7, §12)</h3>
<p><strong>Yêu cầu:</strong></p>
<ol>
  <li>Tạo <code>struct Product: Equatable { let id: String; var price: Double }</code>, <code>var p1 = Product(id:"1", price:999)</code>, <code>var p2 = p1</code>, đổi <code>p2.price = 100</code> → <code>p1.price</code> vẫn <code>999</code>.</li>
  <li>Lặp lại với <code>class ProductClass</code> → <code>p1.price</code> cũng đổi thành <code>100</code>.</li>
  <li>Thêm <code>mutating func applyDiscount</code> và thử <code>let p3</code> gọi nó — ghi lỗi.</li>
  <li>Xóa <code>: Equatable</code> để thấy lỗi <code>p1 == p2</code>.</li>
</ol>
<p><strong>Tiêu chí pass:</strong> Giải thích bằng diagram copy vs reference. Nêu quy tắc: Model bắt đầu bằng <code>struct</code>, chỉ đổi <code>class</code> khi cần identity chia sẻ.</p>
<p style="color:var(--text-muted);font-size:13px;margin-top:1rem;"><em>Cách tự chấm:</em> Chạy từng bài trong Xcode Playground, bật Debug Memory Graph để quan sát retain cycle Bài 3. Đáp án tham khảo nằm trong chính ví dụ §1, §6, §7, §10 của bài học.</p>
`,
  },

  'ios-mrc-arc-retain': {
    title: 'MRC, ARC & Phòng chống Retain Cycle',
    summary: 'Phân tích chuyên sâu về cơ chế quản lý bộ nhớ trong iOS: Từ Manual Reference Counting (MRC) đến Automatic Reference Counting (ARC). Hiểu rõ Strong, Weak, Unowned và giải quyết Retain Cycle.',
    status: 'published',
    difficulty: 'advanced',
    estimatedReadingTime: '35 phút',
    depth: 'deep-dive',
    tags: ['ios', 'memory', 'arc', 'retain-cycle', 'weak', 'unowned'],
    domain: 'iOS Development',
    module: 'Session 01: Languages, Memory & Runtime',
    prerequisites: ['ios-session-01-overview', 'ios-stack-queue-heap'],
    related: ['ios-autoreleasepool', 'ios-swift-closures'],
    learningOutcomes: [
      'Hiểu rõ nguyên lý hoạt động của Reference Counter trong heap object.',
      'Phân biệt chính xác Strong, Weak và Unowned Reference trong Swift.',
      'Nhận diện và phá vỡ Retain Cycle trong Closures, Delegate Pattern và Timer/Notification.',
      'Sử dụng Memory Graph Debugger và Instruments Leaks để phát hiện rò rỉ bộ nhớ.'
    ],
    knowledgeGap: 'Lạm dụng unowned gây crash do dangling pointer, hoặc quên capture list [weak self] trong closure bất đồng bộ gây giữ chặt ViewController trong bộ nhớ.',
    updatedAt: '2026-08-19',
    readTime: '35 phút',
    content: `
<h2>Vấn đề cần giải quyết</h2>
<p>Trong môi trường di động với tài nguyên bộ nhớ hạn chế (RAM từ 3GB - 8GB), nếu các object tham chiếu vòng chéo lẫn nhau (Retain Cycle), bộ đếm tham chiếu (Reference Count) không bao giờ về 0, dẫn đến <strong>Memory Leak</strong>. Hậu quả là thiết bị bị tụt pin, giật lag và hệ thống (Jetsam) sẽ chủ động kill ứng dụng (OOM Crash).</p>

<h2>Cơ chế hoạt động của ARC</h2>
<p>ARC là một tính năng của <strong>Clang Compiler</strong> kết hợp với <strong>Swift Runtime</strong>. Trình biên dịch sẽ tự động chèn các lời gọi <code>retain</code> (tăng count) và <code>release</code> (giảm count) vào đúng thời điểm mã thực thi.</p>

<div class="dd-diagram" data-dd="ios-arc">
<div class="dd-svg dd-svg-dark">
<svg viewBox="0 0 800 560" role="img" aria-labelledby="ios-arc-dark-title ios-arc-dark-desc" font-family="'Geist', sans-serif">
<title id="ios-arc-dark-title">Đếm tham chiếu: về không là chết</title>
<desc id="ios-arc-dark-desc">Cấp phát đếm một, thêm bớt tham chiếu, về không thì deinit và giải phóng bộ nhớ.</desc>
<defs>
<marker id="ios-arc-dark-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0, 8 3, 0 6" fill="#94A3B8"/>
</marker>
</defs>
<rect width="800" height="560" fill="#060913"/>
<!-- arrows -->
<path d="M 400,88 V 112" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-arc-dark-arrow)"/>
<path d="M 400,168 V 192" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-arc-dark-arrow)"/>
<rect x="412" y="170" width="64" height="12" rx="2" fill="#060913"/>
<text x="444" y="179" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">+STRONG</text>
<path d="M 400,248 V 272" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-arc-dark-arrow)"/>
<rect x="412" y="250" width="64" height="12" rx="2" fill="#060913"/>
<text x="444" y="259" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">-STRONG</text>
<path d="M 400,328 V 352" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-arc-dark-arrow)"/>
<path d="M 400,408 V 432" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-arc-dark-arrow)"/>
<path d="M 400,488 V 512" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-arc-dark-arrow)"/>
<!-- nodes -->
<rect x="280" y="32" width="240" height="56" rx="20" fill="#060913"/>
<rect x="280" y="32" width="240" height="56" rx="20" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="400" y="66" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Allocation · RC = 1</text>
<rect x="280" y="112" width="240" height="56" rx="6" fill="#060913"/>
<rect x="280" y="112" width="240" height="56" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="400" y="146" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Strong Added · RC = 2</text>
<rect x="280" y="192" width="240" height="56" rx="6" fill="#060913"/>
<rect x="280" y="192" width="240" height="56" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="400" y="226" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Strong Removed · RC = 1</text>
<rect x="280" y="272" width="240" height="56" rx="6" fill="#060913"/>
<rect x="280" y="272" width="240" height="56" rx="6" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="1.2"/>
<rect x="288" y="278" width="52" height="12" rx="2" fill="transparent" stroke="rgba(56,189,248,0.40)" stroke-width="0.8"/>
<text x="314" y="287" fill="rgba(56,189,248,0.8)" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.08em">CHẾT</text>
<text x="400" y="306" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Last Removed · RC = 0</text>
<rect x="280" y="352" width="240" height="56" rx="6" fill="#060913"/>
<rect x="280" y="352" width="240" height="56" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="400" y="386" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">deinit called</text>
<rect x="280" y="432" width="240" height="56" rx="20" fill="#060913"/>
<rect x="280" y="432" width="240" height="56" rx="20" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="400" y="466" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Deallocated</text>
<!-- legend -->
<line x1="32" y1="512" x2="768" y2="512" stroke="rgba(248,250,252,0.12)" stroke-width="0.8"/>
<text x="32" y="528" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" letter-spacing="0.14em">CHÚ GIẢI</text>
<circle cx="150" cy="524" r="4" fill="#38BDF8"/>
<text x="162" y="528" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace">VỀ KHÔNG · CHẾT</text>
<line x1="380" y1="524" x2="412" y2="524" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-arc-dark-arrow)"/>
<text x="420" y="528" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace">CỘNG TRỪ THEO REF</text>
</svg>
</div>
<div class="dd-svg dd-svg-light">
<svg viewBox="0 0 800 560" role="img" aria-labelledby="ios-arc-title ios-arc-desc" font-family="'Geist', sans-serif">
<title id="ios-arc-title">Đếm tham chiếu: về không là chết</title>
<desc id="ios-arc-desc">Cấp phát đếm một, thêm bớt tham chiếu, về không thì deinit và giải phóng bộ nhớ.</desc>
<defs>
<marker id="ios-arc-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0, 8 3, 0 6" fill="#64748B"/>
</marker>
</defs>
<rect width="800" height="560" fill="#F8FAFC"/>
<!-- arrows -->
<path d="M 400,88 V 112" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-arc-arrow)"/>
<path d="M 400,168 V 192" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-arc-arrow)"/>
<rect x="412" y="170" width="64" height="12" rx="2" fill="#F8FAFC"/>
<text x="444" y="179" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">+STRONG</text>
<path d="M 400,248 V 272" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-arc-arrow)"/>
<rect x="412" y="250" width="64" height="12" rx="2" fill="#F8FAFC"/>
<text x="444" y="259" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">-STRONG</text>
<path d="M 400,328 V 352" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-arc-arrow)"/>
<path d="M 400,408 V 432" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-arc-arrow)"/>
<path d="M 400,488 V 512" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-arc-arrow)"/>
<!-- nodes -->
<rect x="280" y="32" width="240" height="56" rx="20" fill="#F8FAFC"/>
<rect x="280" y="32" width="240" height="56" rx="20" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="400" y="66" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Allocation · RC = 1</text>
<rect x="280" y="112" width="240" height="56" rx="6" fill="#F8FAFC"/>
<rect x="280" y="112" width="240" height="56" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="400" y="146" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Strong Added · RC = 2</text>
<rect x="280" y="192" width="240" height="56" rx="6" fill="#F8FAFC"/>
<rect x="280" y="192" width="240" height="56" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="400" y="226" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Strong Removed · RC = 1</text>
<rect x="280" y="272" width="240" height="56" rx="6" fill="#F8FAFC"/>
<rect x="280" y="272" width="240" height="56" rx="6" fill="rgba(2,132,199,0.08)" stroke="#0284C7" stroke-width="1.2"/>
<rect x="288" y="278" width="52" height="12" rx="2" fill="transparent" stroke="rgba(2,132,199,0.40)" stroke-width="0.8"/>
<text x="314" y="287" fill="rgba(2,132,199,0.8)" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.08em">CHẾT</text>
<text x="400" y="306" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Last Removed · RC = 0</text>
<rect x="280" y="352" width="240" height="56" rx="6" fill="#F8FAFC"/>
<rect x="280" y="352" width="240" height="56" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="400" y="386" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">deinit called</text>
<rect x="280" y="432" width="240" height="56" rx="20" fill="#F8FAFC"/>
<rect x="280" y="432" width="240" height="56" rx="20" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="400" y="466" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Deallocated</text>
<!-- legend -->
<line x1="32" y1="512" x2="768" y2="512" stroke="rgba(15,23,42,0.12)" stroke-width="0.8"/>
<text x="32" y="528" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" letter-spacing="0.14em">CHÚ GIẢI</text>
<circle cx="150" cy="524" r="4" fill="#0284C7"/>
<text x="162" y="528" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace">VỀ KHÔNG · CHẾT</text>
<line x1="380" y1="524" x2="412" y2="524" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-arc-arrow)"/>
<text x="420" y="528" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace">CỘNG TRỪ THEO REF</text>
</svg>
</div>
</div>


<h2>Strong vs Weak vs Unowned Reference</h2>
<table style="width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;">
  <thead>
    <tr style="border-bottom:2px solid var(--border);">
      <th style="text-align:left;padding:10px;">Kiểu tham chiếu</th>
      <th style="text-align:left;padding:10px;">Ảnh hưởng RC</th>
      <th style="text-align:left;padding:10px;">Tính chất Optional</th>
      <th style="text-align:left;padding:10px;">Khi đối tượng bị giải phóng</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;"><strong>Strong</strong></td>
      <td style="padding:10px;">Tăng RC lên +1</td>
      <td style="padding:10px;">Không bắt buộc</td>
      <td style="padding:10px;">Giữ object luôn tồn tại</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;"><strong>Weak</strong></td>
      <td style="padding:10px;">Không tăng RC (0)</td>
      <td style="padding:10px;">Bắt buộc là Optional (<code>var</code>)</td>
      <td style="padding:10px;">Tự động set về <code>nil</code> (Zeroing weak reference)</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;"><strong>Unowned</strong></td>
      <td style="padding:10px;">Không tăng RC (0)</td>
      <td style="padding:10px;">Non-optional (hoặc unowned optional)</td>
      <td style="padding:10px;">Không set về nil. Truy cập sau khi free sẽ gây <strong>Crash (Trap)</strong></td>
    </tr>
  </tbody>
</table>

<h2>Code minh họa: Retain Cycle trong Closure & Cách xử lý</h2>
<pre><code class="language-swift">// ❌ SAI: Retain Cycle giữa ViewController và NetworkService closure
class ProfileViewController: UIViewController {
    var networkService = NetworkService()
    var username: String = "John"

    override func viewDidLoad() {
        super.viewDidLoad()
        networkService.fetchData { [self] data in
            // self giữ networkService, networkService giữ closure, closure giữ strong self
            self.updateUI(data)
        }
    }
}

//  ĐÚNG: Sử dụng Capture List [weak self]
class ProfileViewController: UIViewController {
    var networkService = NetworkService()
    var username: String = "John"

    override func viewDidLoad() {
        super.viewDidLoad()
        networkService.fetchData { [weak self] data in
            guard let self = self else { return }
            self.updateUI(data)
        }
    }
}
</code></pre>
`
  },

  'ios-runtime-messaging': {
    title: 'Objective-C Runtime & Message Dispatch',
    summary: 'Cơ chế cốt lõi phía sau Objective-C và khả năng dynamic của iOS: objc_msgSend, Method Resolution, Fast Forwarding và Normal Forwarding.',
    status: 'published',
    difficulty: 'advanced',
    estimatedReadingTime: '25 phút',
    depth: 'deep-dive',
    tags: ['ios', 'runtime', 'objc', 'msgsend', 'swizzling'],
    domain: 'iOS Development',
    module: 'Session 01: Languages, Memory & Runtime',
    prerequisites: ['ios-session-01-overview'],
    related: ['ios-mrc-arc-retain'],
    learningOutcomes: [
      'Hiểu bản chất lời gọi hàm trong Objective-C: gửi tin nhắn thay vì gọi trực tiếp con trỏ hàm.',
      'Nắm vững 3 giai đoạn xử lý của Message Forwarding khi không tìm thấy selector.',
      'Biết cách ứng dụng Method Swizzling để hook phương thức phục vụ logging/analytics an toàn.'
    ],
    knowledgeGap: 'Nhiều kỹ sư không hiểu lý do vì sao một method gọi bị crash "unrecognized selector sent to instance" và cách can thiệp runtime an toàn.',
    updatedAt: '2026-08-19',
    readTime: '25 phút',
    content: `
<h2>Bản chất của Message Sending trong iOS</h2>
<p>Trong C++ hoặc Swift (Static Dispatch), khi gọi hàm <code>object.method()</code>, compiler xác định địa chỉ hàm tại thời điểm build (vtable hoặc direct pointer). Trong Objective-C, mọi lời gọi hàm đều được chuyển thành:</p>
<pre><code class="language-objc">objc_msgSend(receiver, selector, arg1, arg2, ...);
</code></pre>

<div class="dd-diagram" data-dd="ios-msgdispatch">
<div class="dd-svg dd-svg-dark">
<svg viewBox="0 0 800 664" role="img" aria-labelledby="ios-msgdispatch-dark-title ios-msgdispatch-dark-desc" font-family="'Geist', sans-serif">
<title id="ios-msgdispatch-dark-title">Ba cơ hội cứu trước khi crash</title>
<desc id="ios-msgdispatch-dark-desc">objc_msgSend tra cache trước, rồi qua ba nấc dynamic resolution, fast forwarding, normal forwarding, hết đường thì crash.</desc>
<defs>
<marker id="ios-msgdispatch-dark-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0, 8 3, 0 6" fill="#94A3B8"/>
</marker>
</defs>
<rect width="800" height="664" fill="#060913"/>
<!-- arrows -->
<path d="M 400,88 V 128" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-msgdispatch-dark-arrow)"/>
<path d="M 530,168 H 580" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-msgdispatch-dark-arrow)"/>
<rect x="534" y="162" width="32" height="12" rx="2" fill="#060913"/>
<text x="550" y="171" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">CÓ</text>
<path d="M 400,208 V 248" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-msgdispatch-dark-arrow)"/>
<rect x="412" y="222" width="48" height="12" rx="2" fill="#060913"/>
<text x="436" y="231" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">KHÔNG</text>
<path d="M 520,280 H 632 Q 640,280 640,272 V 192" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-msgdispatch-dark-arrow)"/>
<rect x="528" y="274" width="72" height="12" rx="2" fill="#060913"/>
<text x="564" y="283" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">ĐÃ XỬ LÝ</text>
<path d="M 400,312 V 352" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-msgdispatch-dark-arrow)"/>
<rect x="412" y="326" width="48" height="12" rx="2" fill="#060913"/>
<text x="436" y="335" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">KHÔNG</text>
<path d="M 520,384 H 580" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-msgdispatch-dark-arrow)"/>
<rect x="522" y="378" width="56" height="12" rx="2" fill="#060913"/>
<text x="550" y="387" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">CÓ TARGET</text>
<path d="M 400,416 V 456" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-msgdispatch-dark-arrow)"/>
<rect x="412" y="430" width="48" height="12" rx="2" fill="#060913"/>
<text x="436" y="439" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">KHÔNG</text>
<path d="M 520,488 H 580" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-msgdispatch-dark-arrow)"/>
<rect x="522" y="482" width="56" height="12" rx="2" fill="#060913"/>
<text x="550" y="491" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">XỬ LÝ XONG</text>
<path d="M 400,520 V 560" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-msgdispatch-dark-arrow)"/>
<rect x="412" y="534" width="48" height="12" rx="2" fill="#060913"/>
<text x="436" y="543" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">KHÔNG</text>
<!-- nodes -->
<rect x="280" y="32" width="240" height="56" rx="20" fill="#060913"/>
<rect x="280" y="32" width="240" height="56" rx="20" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="400" y="64" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">objc_msgSend</text>
<text x="400" y="78" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">receiver · @selector(doWork)</text>
<polygon points="400,128 530,168 400,208 270,168" fill="#060913"/>
<polygon points="400,128 530,168 400,208 270,168" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="400" y="164" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Có trong Cache?</text>
<text x="400" y="178" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">dispatch table</text>
<rect x="580" y="128" width="220" height="64" rx="6" fill="#060913"/>
<rect x="580" y="128" width="220" height="64" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="690" y="162" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Thực thi IMP</text>
<text x="690" y="176" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">con trỏ hàm · IMP</text>
<rect x="280" y="248" width="240" height="64" rx="6" fill="#060913"/>
<rect x="280" y="248" width="240" height="64" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="400" y="282" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">1. Dynamic Method Resolution</text>
<text x="400" y="296" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">resolveInstanceMethod:</text>
<rect x="280" y="352" width="240" height="64" rx="6" fill="#060913"/>
<rect x="280" y="352" width="240" height="64" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="400" y="386" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">2. Fast Forwarding</text>
<text x="400" y="400" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">forwardingTargetForSelector:</text>
<rect x="580" y="352" width="220" height="64" rx="6" fill="#060913"/>
<rect x="580" y="352" width="220" height="64" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="690" y="386" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Gửi sang Target mới</text>
<text x="690" y="400" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">tiếp tục dispatch</text>
<rect x="280" y="456" width="240" height="64" rx="6" fill="#060913"/>
<rect x="280" y="456" width="240" height="64" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="400" y="490" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">3. Normal Forwarding</text>
<text x="400" y="504" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">forwardInvocation:</text>
<rect x="580" y="456" width="220" height="52" rx="20" fill="#060913"/>
<rect x="580" y="456" width="220" height="52" rx="20" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="690" y="487" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Hoàn tất</text>
<rect x="280" y="560" width="240" height="56" rx="6" fill="#060913"/>
<rect x="280" y="560" width="240" height="56" rx="6" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="1.2"/>
<text x="400" y="592" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Crash: unrecognized selector</text>
<text x="400" y="606" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">sent to instance</text>
<!-- legend -->
<line x1="32" y1="640" x2="768" y2="640" stroke="rgba(248,250,252,0.12)" stroke-width="0.8"/>
<text x="32" y="656" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" letter-spacing="0.14em">CHÚ GIẢI</text>
<circle cx="150" cy="652" r="4" fill="#38BDF8"/>
<text x="162" y="656" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace">RƠI CUỐI · CRASH</text>
<line x1="370" y1="652" x2="402" y2="652" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-msgdispatch-dark-arrow)"/>
<text x="410" y="656" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace">RẼ NHÁNH THEO KẾT QUẢ</text>
</svg>
</div>
<div class="dd-svg dd-svg-light">
<svg viewBox="0 0 800 664" role="img" aria-labelledby="ios-msgdispatch-title ios-msgdispatch-desc" font-family="'Geist', sans-serif">
<title id="ios-msgdispatch-title">Ba cơ hội cứu trước khi crash</title>
<desc id="ios-msgdispatch-desc">objc_msgSend tra cache trước, rồi qua ba nấc dynamic resolution, fast forwarding, normal forwarding, hết đường thì crash.</desc>
<defs>
<marker id="ios-msgdispatch-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0, 8 3, 0 6" fill="#64748B"/>
</marker>
</defs>
<rect width="800" height="664" fill="#F8FAFC"/>
<!-- arrows -->
<path d="M 400,88 V 128" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-msgdispatch-arrow)"/>
<path d="M 530,168 H 580" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-msgdispatch-arrow)"/>
<rect x="534" y="162" width="32" height="12" rx="2" fill="#F8FAFC"/>
<text x="550" y="171" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">CÓ</text>
<path d="M 400,208 V 248" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-msgdispatch-arrow)"/>
<rect x="412" y="222" width="48" height="12" rx="2" fill="#F8FAFC"/>
<text x="436" y="231" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">KHÔNG</text>
<path d="M 520,280 H 632 Q 640,280 640,272 V 192" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-msgdispatch-arrow)"/>
<rect x="528" y="274" width="72" height="12" rx="2" fill="#F8FAFC"/>
<text x="564" y="283" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">ĐÃ XỬ LÝ</text>
<path d="M 400,312 V 352" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-msgdispatch-arrow)"/>
<rect x="412" y="326" width="48" height="12" rx="2" fill="#F8FAFC"/>
<text x="436" y="335" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">KHÔNG</text>
<path d="M 520,384 H 580" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-msgdispatch-arrow)"/>
<rect x="522" y="378" width="56" height="12" rx="2" fill="#F8FAFC"/>
<text x="550" y="387" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">CÓ TARGET</text>
<path d="M 400,416 V 456" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-msgdispatch-arrow)"/>
<rect x="412" y="430" width="48" height="12" rx="2" fill="#F8FAFC"/>
<text x="436" y="439" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">KHÔNG</text>
<path d="M 520,488 H 580" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-msgdispatch-arrow)"/>
<rect x="522" y="482" width="56" height="12" rx="2" fill="#F8FAFC"/>
<text x="550" y="491" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">XỬ LÝ XONG</text>
<path d="M 400,520 V 560" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-msgdispatch-arrow)"/>
<rect x="412" y="534" width="48" height="12" rx="2" fill="#F8FAFC"/>
<text x="436" y="543" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">KHÔNG</text>
<!-- nodes -->
<rect x="280" y="32" width="240" height="56" rx="20" fill="#F8FAFC"/>
<rect x="280" y="32" width="240" height="56" rx="20" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="400" y="64" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">objc_msgSend</text>
<text x="400" y="78" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">receiver · @selector(doWork)</text>
<polygon points="400,128 530,168 400,208 270,168" fill="#F8FAFC"/>
<polygon points="400,128 530,168 400,208 270,168" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="400" y="164" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Có trong Cache?</text>
<text x="400" y="178" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">dispatch table</text>
<rect x="580" y="128" width="220" height="64" rx="6" fill="#F8FAFC"/>
<rect x="580" y="128" width="220" height="64" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="690" y="162" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Thực thi IMP</text>
<text x="690" y="176" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">con trỏ hàm · IMP</text>
<rect x="280" y="248" width="240" height="64" rx="6" fill="#F8FAFC"/>
<rect x="280" y="248" width="240" height="64" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="400" y="282" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">1. Dynamic Method Resolution</text>
<text x="400" y="296" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">resolveInstanceMethod:</text>
<rect x="280" y="352" width="240" height="64" rx="6" fill="#F8FAFC"/>
<rect x="280" y="352" width="240" height="64" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="400" y="386" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">2. Fast Forwarding</text>
<text x="400" y="400" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">forwardingTargetForSelector:</text>
<rect x="580" y="352" width="220" height="64" rx="6" fill="#F8FAFC"/>
<rect x="580" y="352" width="220" height="64" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="690" y="386" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Gửi sang Target mới</text>
<text x="690" y="400" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">tiếp tục dispatch</text>
<rect x="280" y="456" width="240" height="64" rx="6" fill="#F8FAFC"/>
<rect x="280" y="456" width="240" height="64" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="400" y="490" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">3. Normal Forwarding</text>
<text x="400" y="504" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">forwardInvocation:</text>
<rect x="580" y="456" width="220" height="52" rx="20" fill="#F8FAFC"/>
<rect x="580" y="456" width="220" height="52" rx="20" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="690" y="487" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Hoàn tất</text>
<rect x="280" y="560" width="240" height="56" rx="6" fill="#F8FAFC"/>
<rect x="280" y="560" width="240" height="56" rx="6" fill="rgba(2,132,199,0.08)" stroke="#0284C7" stroke-width="1.2"/>
<text x="400" y="592" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Crash: unrecognized selector</text>
<text x="400" y="606" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">sent to instance</text>
<!-- legend -->
<line x1="32" y1="640" x2="768" y2="640" stroke="rgba(15,23,42,0.12)" stroke-width="0.8"/>
<text x="32" y="656" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" letter-spacing="0.14em">CHÚ GIẢI</text>
<circle cx="150" cy="652" r="4" fill="#0284C7"/>
<text x="162" y="656" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace">RƠI CUỐI · CRASH</text>
<line x1="370" y1="652" x2="402" y2="652" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-msgdispatch-arrow)"/>
<text x="410" y="656" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace">RẼ NHÁNH THEO KẾT QUẢ</text>
</svg>
</div>
</div>


<h2>Method Swizzling (Đổi ruột phương thức tại Runtime)</h2>
<p>Method Swizzling cho phép hoán đổi con trỏ <code>IMP</code> của hai selector trong quá trình runtime:</p>
<pre><code class="language-swift">extension UIViewController {
    static let swizzleViewWillAppear: Void = {
        let originalSelector = #selector(viewWillAppear(_:))
        let swizzledSelector = #selector(custom_viewWillAppear(_:))

        guard let originalMethod = class_getInstanceMethod(UIViewController.self, originalSelector),
              let swizzledMethod = class_getInstanceMethod(UIViewController.self, swizzledSelector) else { return }

        method_exchangeImplementations(originalMethod, swizzledMethod)
    }()

    @objc func custom_viewWillAppear(_ animated: Bool) {
        // Gọi lại custom_viewWillAppear nhưng thực chất là gọi original do đã swizzle!
        self.custom_viewWillAppear(animated)
        print("📊 [Analytics Tracker] Screen presented: \\(type(of: self))")
    }
}
</code></pre>
`
  },

  'ios-uikit-autolayout': {
    title: 'UIKit Foundation & AutoLayout Mastery',
    summary: 'Xây dựng giao diện iOS thích ứng linh hoạt: Cơ chế Cassowary Algorithm, Constraint Priorities, Content Compression Resistance, Intrinsic Content Size và tối ưu Layout Performance.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '30 phút',
    depth: 'deep-dive',
    tags: ['ios', 'uikit', 'autolayout', 'constraints', 'cassowary'],
    domain: 'iOS Development',
    module: 'Session 02: Lifecycle, UIKit & Controls',
    prerequisites: ['ios-session-02-overview'],
    related: ['ios-uiviewcontroller', 'ios-app-lifecycle'],
    learningOutcomes: [
      'Thấu hiểu công thức tuyến tính của AutoLayout: view1.attribute = multiplier * view2.attribute + constant.',
      'Giải thích cơ chế Content Hugging Priority (CHP) và Content Compression Resistance Priority (CCRP).',
      'Xử lý triệt để xung đột constraint (Unsatisfiable Constraints) và Ambiguous Layout.',
      'Hiểu chu kỳ Layout: updateConstraints -> layoutSubviews -> drawRect.'
    ],
    knowledgeGap: 'Xung đột constraint hoặc layout giật lag do gọi layoutSubviews/setNeedsLayout không đúng chu kỳ hiển thị của RunLoop.',
    updatedAt: '2026-08-19',
    readTime: '30 phút',
    content: `
<h2>Bản chất toán học của AutoLayout</h2>
<p>AutoLayout không đặt vị trí tĩnh theo tọa độ pixel (Frame), mà giải hệ phương trình tuyến tính dựa trên <strong>Thuật toán Cassowary</strong>:</p>
<pre><code class="language-swift">view1.attribute1 = view2.attribute2 * multiplier + constant
</code></pre>

<h2>Content Hugging vs Content Compression Resistance</h2>
<ul>
  <li><strong>Content Hugging Priority (CHP):</strong> "Đừng kéo giãn tôi ra!" — Quyết định độ ưu tiên ngăn không cho View phình to hơn kích thước nội tại (<code>intrinsicContentSize</code>).</li>
  <li><strong>Content Compression Resistance Priority (CCRP):</strong> "Đừng bóp nghẹt tôi!" — Quyết định độ ưu tiên ngăn không cho View bị co nhỏ hơn nội dung bên trong (tránh bị cắt chữ <code>...</code>).</li>
</ul>

<div class="dd-diagram" data-dd="ios-autolayout">
<div class="dd-svg dd-svg-dark">
<svg viewBox="0 0 800 176" role="img" aria-labelledby="ios-autolayout-dark-title ios-autolayout-dark-desc" font-family="'Geist', sans-serif">
<title id="ios-autolayout-dark-title">Chữ muốn phình, layout muốn ép</title>
<desc id="ios-autolayout-dark-desc">Content Hugging chống kéo dãn và Compression Resistance chống co nhỏ cùng giữ intrinsic content size của label.</desc>
<defs>
<marker id="ios-autolayout-dark-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0, 8 3, 0 6" fill="#94A3B8"/>
</marker>
</defs>
<rect width="800" height="176" fill="#060913"/>
<!-- arrows -->
<path d="M 240,96 H 300" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-autolayout-dark-arrow)"/>
<rect x="242" y="90" width="56" height="12" rx="2" fill="#060913"/>
<text x="270" y="99" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">CHỐNG DÃN</text>
<path d="M 560,96 H 500" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-autolayout-dark-arrow)"/>
<rect x="502" y="90" width="56" height="12" rx="2" fill="#060913"/>
<text x="530" y="99" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">CHỐNG NÉN</text>
<!-- nodes -->
<rect x="40" y="64" width="200" height="64" rx="6" fill="#060913"/>
<rect x="40" y="64" width="200" height="64" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="140" y="98" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Content Hugging</text>
<text x="140" y="112" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">chống kéo dãn</text>
<rect x="300" y="64" width="200" height="64" rx="6" fill="#060913"/>
<rect x="300" y="64" width="200" height="64" rx="6" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="1.2"/>
<text x="400" y="98" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Label Text</text>
<text x="400" y="112" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">intrinsic content size</text>
<rect x="560" y="64" width="200" height="64" rx="6" fill="#060913"/>
<rect x="560" y="64" width="200" height="64" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="660" y="98" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Compression Resistance</text>
<text x="660" y="112" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">chống co nhỏ</text>
<!-- legend -->
<line x1="32" y1="152" x2="768" y2="152" stroke="rgba(248,250,252,0.12)" stroke-width="0.8"/>
<text x="32" y="168" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" letter-spacing="0.14em">CHÚ GIẢI</text>
<circle cx="150" cy="164" r="4" fill="#38BDF8"/>
<text x="162" y="168" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace">SIZE THẬT · INTRINSIC</text>
<line x1="400" y1="164" x2="432" y2="164" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-autolayout-dark-arrow)"/>
<text x="440" y="168" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace">LỰC GIỮ · PRIORITY</text>
</svg>
</div>
<div class="dd-svg dd-svg-light">
<svg viewBox="0 0 800 176" role="img" aria-labelledby="ios-autolayout-title ios-autolayout-desc" font-family="'Geist', sans-serif">
<title id="ios-autolayout-title">Chữ muốn phình, layout muốn ép</title>
<desc id="ios-autolayout-desc">Content Hugging chống kéo dãn và Compression Resistance chống co nhỏ cùng giữ intrinsic content size của label.</desc>
<defs>
<marker id="ios-autolayout-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0, 8 3, 0 6" fill="#64748B"/>
</marker>
</defs>
<rect width="800" height="176" fill="#F8FAFC"/>
<!-- arrows -->
<path d="M 240,96 H 300" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-autolayout-arrow)"/>
<rect x="242" y="90" width="56" height="12" rx="2" fill="#F8FAFC"/>
<text x="270" y="99" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">CHỐNG DÃN</text>
<path d="M 560,96 H 500" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-autolayout-arrow)"/>
<rect x="502" y="90" width="56" height="12" rx="2" fill="#F8FAFC"/>
<text x="530" y="99" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">CHỐNG NÉN</text>
<!-- nodes -->
<rect x="40" y="64" width="200" height="64" rx="6" fill="#F8FAFC"/>
<rect x="40" y="64" width="200" height="64" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="140" y="98" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Content Hugging</text>
<text x="140" y="112" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">chống kéo dãn</text>
<rect x="300" y="64" width="200" height="64" rx="6" fill="#F8FAFC"/>
<rect x="300" y="64" width="200" height="64" rx="6" fill="rgba(2,132,199,0.08)" stroke="#0284C7" stroke-width="1.2"/>
<text x="400" y="98" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Label Text</text>
<text x="400" y="112" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">intrinsic content size</text>
<rect x="560" y="64" width="200" height="64" rx="6" fill="#F8FAFC"/>
<rect x="560" y="64" width="200" height="64" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="660" y="98" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Compression Resistance</text>
<text x="660" y="112" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">chống co nhỏ</text>
<!-- legend -->
<line x1="32" y1="152" x2="768" y2="152" stroke="rgba(15,23,42,0.12)" stroke-width="0.8"/>
<text x="32" y="168" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" letter-spacing="0.14em">CHÚ GIẢI</text>
<circle cx="150" cy="164" r="4" fill="#0284C7"/>
<text x="162" y="168" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace">SIZE THẬT · INTRINSIC</text>
<line x1="400" y1="164" x2="432" y2="164" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-autolayout-arrow)"/>
<text x="440" y="168" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace">LỰC GIỮ · PRIORITY</text>
</svg>
</div>
</div>

`
  },

  'ios-gcd-dispatch-queue': {
    title: 'Grand Central Dispatch (GCD) & Lập trình Concurrency',
    summary: 'Lập trình đa luồng hiện đại trong iOS: Serial vs Concurrent Queue, Sync vs Async, DispatchGroup, DispatchWorkItem, Semaphore và phòng chống Deadlock.',
    status: 'published',
    difficulty: 'advanced',
    estimatedReadingTime: '35 phút',
    depth: 'deep-dive',
    tags: ['ios', 'gcd', 'concurrency', 'multithreading', 'deadlock', 'semaphore'],
    domain: 'iOS Development',
    module: 'Session 04: GCD, Concurrency & OOP/POP',
    prerequisites: ['ios-session-01-overview'],
    related: ['ios-threads-synchronization'],
    learningOutcomes: [
      'Phân biệt rõ ràng giữa Sync vs Async (cơ chế block thread) và Serial vs Concurrent (cơ chế phân phối task).',
      'Tránh 100% lỗi Deadlock kinh điển khi gọi DispatchQueue.main.sync trên main thread.',
      'Áp dụng DispatchGroup và Semaphore để đồng bộ hóa nhiều luồng API bất đồng bộ.',
      'Sử dụng DispatchBarrier để giải quyết bài toán Reader-Writer Lock an toàn cho đa luồng.'
    ],
    knowledgeGap: 'Nhầm lẫn giữa Concurrency và Parallelism, gây race conditions hoặc nghẽn main thread dẫn đến giật frame (dropped frames).',
    updatedAt: '2026-08-19',
    readTime: '35 phút',
    content: `
<h2>Nguyên lý cốt lõi của GCD</h2>
<p>GCD trừu tượng hóa khái niệm quản lý Thread trực tiếp bằng <strong>Dispatch Queues</strong>. Bạn chỉ cần đưa Block công việc vào Queue, hệ thống sẽ tự động cấp phát và tái sử dụng Thread Pool tối ưu nhất cho CPU.</p>

<div class="dd-diagram" data-dd="ios-gcd">
<div class="dd-svg dd-svg-dark">
<svg viewBox="0 0 800 392" role="img" aria-labelledby="ios-gcd-dark-title ios-gcd-dark-desc" font-family="'Geist', sans-serif">
<title id="ios-gcd-dark-title">Việc nặng ra nền, xong về main</title>
<desc id="ios-gcd-dark-desc">Hàng đợi global concurrent thực thi async dưới nền, sau đó quay về hàng đợi main serial để cập nhật giao diện.</desc>
<defs>
<marker id="ios-gcd-dark-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0, 8 3, 0 6" fill="#94A3B8"/>
</marker>
</defs>
<rect width="800" height="392" fill="#060913"/>
<!-- zones -->
<rect x="32" y="24" width="340" height="320" rx="8" fill="rgba(248,250,252,0.02)" stroke="rgba(248,250,252,0.10)" stroke-width="0.8"/>
<rect x="48" y="28" width="120" height="12" rx="2" fill="#060913"/>
<text x="108" y="37" fill="#64748B" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.14em">QUEUE TYPES</text>
<rect x="428" y="24" width="340" height="320" rx="8" fill="rgba(248,250,252,0.02)" stroke="rgba(248,250,252,0.10)" stroke-width="0.8"/>
<rect x="444" y="28" width="136" height="12" rx="2" fill="#060913"/>
<text x="512" y="37" fill="#64748B" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.14em">EXECUTION MODES</text>
<!-- arrows -->
<path d="M 340,112 H 396 Q 404,112 404,120 V 236 H 452 Q 460,236 460,244" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-gcd-dark-arrow)"/>
<rect x="340" y="106" width="60" height="12" rx="2" fill="#060913"/>
<text x="370" y="115" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">CHẠY NỀN</text>
<path d="M 460,244 H 308 Q 300,244 300,252 V 256" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-gcd-dark-arrow)"/>
<rect x="372" y="238" width="64" height="12" rx="2" fill="#060913"/>
<text x="404" y="247" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">VỀ UI</text>
<!-- nodes -->
<rect x="64" y="80" width="276" height="64" rx="6" fill="#060913"/>
<rect x="64" y="80" width="276" height="64" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="202" y="114" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">DispatchQueue.global(qos:)</text>
<text x="202" y="128" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">concurrent · background</text>
<rect x="64" y="168" width="276" height="64" rx="6" fill="#060913"/>
<rect x="64" y="168" width="276" height="64" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="202" y="202" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Custom DispatchQueue</text>
<text x="202" y="216" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">serial hoặc concurrent</text>
<rect x="64" y="256" width="276" height="64" rx="6" fill="#060913"/>
<rect x="64" y="256" width="276" height="64" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="202" y="290" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">DispatchQueue.main</text>
<text x="202" y="304" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">serial · UI thread</text>
<rect x="460" y="80" width="276" height="64" rx="6" fill="#060913"/>
<rect x="460" y="80" width="276" height="64" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="598" y="114" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">sync</text>
<text x="598" y="128" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">chặn luồng tới khi xong</text>
<rect x="460" y="212" width="276" height="64" rx="6" fill="#060913"/>
<rect x="460" y="212" width="276" height="64" rx="6" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="1.2"/>
<text x="598" y="246" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">async</text>
<text x="598" y="260" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">trả quyền ngay · song song</text>
<!-- legend -->
<line x1="32" y1="368" x2="768" y2="368" stroke="rgba(248,250,252,0.12)" stroke-width="0.8"/>
<text x="32" y="384" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" letter-spacing="0.14em">CHÚ GIẢI</text>
<circle cx="150" cy="380" r="4" fill="#38BDF8"/>
<text x="162" y="384" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace">ĐƯỜNG VỀ UI · ASYNC</text>
<line x1="400" y1="380" x2="432" y2="380" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-gcd-dark-arrow)"/>
<text x="440" y="384" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace">CHUYỂN QUEUE / MODE</text>
</svg>
</div>
<div class="dd-svg dd-svg-light">
<svg viewBox="0 0 800 392" role="img" aria-labelledby="ios-gcd-title ios-gcd-desc" font-family="'Geist', sans-serif">
<title id="ios-gcd-title">Việc nặng ra nền, xong về main</title>
<desc id="ios-gcd-desc">Hàng đợi global concurrent thực thi async dưới nền, sau đó quay về hàng đợi main serial để cập nhật giao diện.</desc>
<defs>
<marker id="ios-gcd-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0, 8 3, 0 6" fill="#64748B"/>
</marker>
</defs>
<rect width="800" height="392" fill="#F8FAFC"/>
<!-- zones -->
<rect x="32" y="24" width="340" height="320" rx="8" fill="rgba(15,23,42,0.02)" stroke="rgba(15,23,42,0.10)" stroke-width="0.8"/>
<rect x="48" y="28" width="120" height="12" rx="2" fill="#F8FAFC"/>
<text x="108" y="37" fill="#94A3B8" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.14em">QUEUE TYPES</text>
<rect x="428" y="24" width="340" height="320" rx="8" fill="rgba(15,23,42,0.02)" stroke="rgba(15,23,42,0.10)" stroke-width="0.8"/>
<rect x="444" y="28" width="136" height="12" rx="2" fill="#F8FAFC"/>
<text x="512" y="37" fill="#94A3B8" font-size="7" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.14em">EXECUTION MODES</text>
<!-- arrows -->
<path d="M 340,112 H 396 Q 404,112 404,120 V 236 H 452 Q 460,236 460,244" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-gcd-arrow)"/>
<rect x="340" y="106" width="60" height="12" rx="2" fill="#F8FAFC"/>
<text x="370" y="115" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">CHẠY NỀN</text>
<path d="M 460,244 H 308 Q 300,244 300,252 V 256" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-gcd-arrow)"/>
<rect x="372" y="238" width="64" height="12" rx="2" fill="#F8FAFC"/>
<text x="404" y="247" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">VỀ UI</text>
<!-- nodes -->
<rect x="64" y="80" width="276" height="64" rx="6" fill="#F8FAFC"/>
<rect x="64" y="80" width="276" height="64" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="202" y="114" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">DispatchQueue.global(qos:)</text>
<text x="202" y="128" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">concurrent · background</text>
<rect x="64" y="168" width="276" height="64" rx="6" fill="#F8FAFC"/>
<rect x="64" y="168" width="276" height="64" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="202" y="202" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Custom DispatchQueue</text>
<text x="202" y="216" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">serial hoặc concurrent</text>
<rect x="64" y="256" width="276" height="64" rx="6" fill="#F8FAFC"/>
<rect x="64" y="256" width="276" height="64" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="202" y="290" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">DispatchQueue.main</text>
<text x="202" y="304" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">serial · UI thread</text>
<rect x="460" y="80" width="276" height="64" rx="6" fill="#F8FAFC"/>
<rect x="460" y="80" width="276" height="64" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="598" y="114" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">sync</text>
<text x="598" y="128" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">chặn luồng tới khi xong</text>
<rect x="460" y="212" width="276" height="64" rx="6" fill="#F8FAFC"/>
<rect x="460" y="212" width="276" height="64" rx="6" fill="rgba(2,132,199,0.08)" stroke="#0284C7" stroke-width="1.2"/>
<text x="598" y="246" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">async</text>
<text x="598" y="260" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">trả quyền ngay · song song</text>
<!-- legend -->
<line x1="32" y1="368" x2="768" y2="368" stroke="rgba(15,23,42,0.12)" stroke-width="0.8"/>
<text x="32" y="384" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" letter-spacing="0.14em">CHÚ GIẢI</text>
<circle cx="150" cy="380" r="4" fill="#0284C7"/>
<text x="162" y="384" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace">ĐƯỜNG VỀ UI · ASYNC</text>
<line x1="400" y1="380" x2="432" y2="380" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-gcd-arrow)"/>
<text x="440" y="384" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace">CHUYỂN QUEUE / MODE</text>
</svg>
</div>
</div>


<h2>QoS (Quality of Service) Levels</h2>
<ol>
  <li><strong>.userInteractive:</strong> Tác vụ tương tác trực tiếp UI, vẽ animation (Ưu tiên cao nhất).</li>
  <li><strong>.userInitiated:</strong> Tác vụ người dùng yêu cầu tức thì (vd: click mở file).</li>
  <li><strong>.default:</strong> Mức tiêu chuẩn khi không cấu hình QoS.</li>
  <li><strong>.utility:</strong> Tác vụ tốn thời gian kèm tiến độ (vd: download file lớn, import dữ liệu).</li>
  <li><strong>.background:</strong> Tác vụ chạy ngầm vô hình (vd: indexing, sync dữ liệu).</li>
</ol>
`
  },

  'ios-arch-mvvm-clean': {
    title: 'Kiến trúc iOS: MVC, MVVM, Clean Architecture & Coordinator',
    summary: 'Xây dựng mã nguồn iOS chuẩn mực: Tách biệt trách nhiệm, dễ kiểm thử (Testability), khả năng mở rộng với MVVM, Clean Swift (VIPER) và điều hướng luồng với Coordinator Pattern.',
    status: 'published',
    difficulty: 'advanced',
    estimatedReadingTime: '40 phút',
    depth: 'deep-dive',
    tags: ['ios', 'architecture', 'mvvm', 'clean-architecture', 'coordinator', 'viper'],
    domain: 'iOS Development',
    module: 'Session 07: Targets, Architecture & Access Control',
    prerequisites: ['ios-cocoa-mvc'],
    related: ['ios-swiftui-state-dataflow'],
    learningOutcomes: [
      'Khắc phục Massive View Controller (MVC) bằng MVVM và Coordinator.',
      'Thiết lập luồng Data Binding hai chiều với Combine, Closure hoặc RxSwift.',
      'Tổ chức dự án theo Clean Architecture 3 tầng: Presentation, Domain và Data layer.',
      'Viết Unit Test độc lập cho ViewModel và UseCase mà không cần khởi tạo UIKit.'
    ],
    knowledgeGap: 'Nhét toàn bộ logic gọi API, parse JSON, format chuỗi và chuyển màn hình vào trong UIViewController.',
    updatedAt: '2026-08-19',
    readTime: '40 phút',
    content: `
<h2>Vấn đề của Apple MVC: "Massive View Controller"</h2>
<p>Trong kiến trúc MVC nguyên bản của Apple, <code>UIViewController</code> vừa nắm giữ View hierarchy, vừa xử lý User Interaction, vừa gọi Network, vừa quản lý Navigation. Hậu quả là class phình to hàng nghìn dòng, không thể test được logic.</p>

<div class="dd-diagram" data-dd="ios-mvvmcoord">
<div class="dd-svg dd-svg-dark">
<svg viewBox="0 0 800 368" role="img" aria-labelledby="ios-mvvmcoord-dark-title ios-mvvmcoord-dark-desc" font-family="'Geist', sans-serif">
<title id="ios-mvvmcoord-dark-title">Màn hình không tự dẫn đường</title>
<desc id="ios-mvvmcoord-dark-desc">ViewController gửi user action sang ViewModel và nhận data binding về, nhờ Coordinator chuyển màn và UseCase Repository lo nghiệp vụ.</desc>
<defs>
<marker id="ios-mvvmcoord-dark-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0, 8 3, 0 6" fill="#94A3B8"/>
</marker>
</defs>
<rect width="800" height="368" fill="#060913"/>
<!-- arrows -->
<path d="M 344,88 H 456" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-mvvmcoord-dark-arrow)"/>
<rect x="366" y="82" width="72" height="12" rx="2" fill="#060913"/>
<text x="402" y="91" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">USER ACTION</text>
<path d="M 456,108 H 344" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-mvvmcoord-dark-arrow)"/>
<rect x="366" y="112" width="72" height="12" rx="2" fill="#060913"/>
<text x="402" y="121" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">DATA BINDING</text>
<path d="M 204,128 V 256" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-mvvmcoord-dark-arrow)"/>
<rect x="216" y="182" width="72" height="12" rx="2" fill="#060913"/>
<text x="252" y="191" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">CHUYỂN MÀN</text>
<path d="M 596,128 V 256" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-mvvmcoord-dark-arrow)"/>
<rect x="608" y="182" width="64" height="12" rx="2" fill="#060913"/>
<text x="640" y="191" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">DỮ LIỆU</text>
<!-- nodes -->
<rect x="64" y="64" width="280" height="64" rx="6" fill="#060913"/>
<rect x="64" y="64" width="280" height="64" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="204" y="98" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">ViewController</text>
<text x="204" y="112" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">render UI · nhận input</text>
<rect x="456" y="64" width="280" height="64" rx="6" fill="#060913"/>
<rect x="456" y="64" width="280" height="64" rx="6" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="1.2"/>
<text x="596" y="98" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">ViewModel</text>
<text x="596" y="112" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">biến đổi dữ liệu · state</text>
<rect x="64" y="256" width="280" height="64" rx="6" fill="#060913"/>
<rect x="64" y="256" width="280" height="64" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="204" y="290" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Coordinator</text>
<text x="204" y="304" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">quản lý chuyển màn hình</text>
<rect x="456" y="256" width="280" height="64" rx="6" fill="#060913"/>
<rect x="456" y="256" width="280" height="64" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="596" y="290" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">UseCase / Repository</text>
<text x="596" y="304" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">nghiệp vụ cốt lõi</text>
<!-- legend -->
<line x1="32" y1="344" x2="768" y2="344" stroke="rgba(248,250,252,0.12)" stroke-width="0.8"/>
<text x="32" y="360" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" letter-spacing="0.14em">CHÚ GIẢI</text>
<circle cx="150" cy="356" r="4" fill="#38BDF8"/>
<text x="162" y="360" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace">TRUNG TÂM · VIEWMODEL</text>
<line x1="400" y1="356" x2="432" y2="356" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-mvvmcoord-dark-arrow)"/>
<text x="440" y="360" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace">YÊU CẦU / DỮ LIỆU</text>
</svg>
</div>
<div class="dd-svg dd-svg-light">
<svg viewBox="0 0 800 368" role="img" aria-labelledby="ios-mvvmcoord-title ios-mvvmcoord-desc" font-family="'Geist', sans-serif">
<title id="ios-mvvmcoord-title">Màn hình không tự dẫn đường</title>
<desc id="ios-mvvmcoord-desc">ViewController gửi user action sang ViewModel và nhận data binding về, nhờ Coordinator chuyển màn và UseCase Repository lo nghiệp vụ.</desc>
<defs>
<marker id="ios-mvvmcoord-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0, 8 3, 0 6" fill="#64748B"/>
</marker>
</defs>
<rect width="800" height="368" fill="#F8FAFC"/>
<!-- arrows -->
<path d="M 344,88 H 456" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-mvvmcoord-arrow)"/>
<rect x="366" y="82" width="72" height="12" rx="2" fill="#F8FAFC"/>
<text x="402" y="91" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">USER ACTION</text>
<path d="M 456,108 H 344" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-mvvmcoord-arrow)"/>
<rect x="366" y="112" width="72" height="12" rx="2" fill="#F8FAFC"/>
<text x="402" y="121" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">DATA BINDING</text>
<path d="M 204,128 V 256" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-mvvmcoord-arrow)"/>
<rect x="216" y="182" width="72" height="12" rx="2" fill="#F8FAFC"/>
<text x="252" y="191" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">CHUYỂN MÀN</text>
<path d="M 596,128 V 256" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-mvvmcoord-arrow)"/>
<rect x="608" y="182" width="64" height="12" rx="2" fill="#F8FAFC"/>
<text x="640" y="191" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">DỮ LIỆU</text>
<!-- nodes -->
<rect x="64" y="64" width="280" height="64" rx="6" fill="#F8FAFC"/>
<rect x="64" y="64" width="280" height="64" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="204" y="98" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">ViewController</text>
<text x="204" y="112" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">render UI · nhận input</text>
<rect x="456" y="64" width="280" height="64" rx="6" fill="#F8FAFC"/>
<rect x="456" y="64" width="280" height="64" rx="6" fill="rgba(2,132,199,0.08)" stroke="#0284C7" stroke-width="1.2"/>
<text x="596" y="98" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">ViewModel</text>
<text x="596" y="112" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">biến đổi dữ liệu · state</text>
<rect x="64" y="256" width="280" height="64" rx="6" fill="#F8FAFC"/>
<rect x="64" y="256" width="280" height="64" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="204" y="290" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Coordinator</text>
<text x="204" y="304" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">quản lý chuyển màn hình</text>
<rect x="456" y="256" width="280" height="64" rx="6" fill="#F8FAFC"/>
<rect x="456" y="256" width="280" height="64" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="596" y="290" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">UseCase / Repository</text>
<text x="596" y="304" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">nghiệp vụ cốt lõi</text>
<!-- legend -->
<line x1="32" y1="344" x2="768" y2="344" stroke="rgba(15,23,42,0.12)" stroke-width="0.8"/>
<text x="32" y="360" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" letter-spacing="0.14em">CHÚ GIẢI</text>
<circle cx="150" cy="356" r="4" fill="#0284C7"/>
<text x="162" y="360" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace">TRUNG TÂM · VIEWMODEL</text>
<line x1="400" y1="356" x2="432" y2="356" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-mvvmcoord-arrow)"/>
<text x="440" y="360" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace">YÊU CẦU / DỮ LIỆU</text>
</svg>
</div>
</div>

`
  },

  'ios-swiftui-state-dataflow': {
    title: 'SwiftUI Data Flow: @State, @Binding, @StateObject, @ObservedObject & @Environment',
    summary: 'Làm chủ mô hình quản lý trạng thái khai báo trong SwiftUI: Phân biệt nguồn chân lý duy nhất (Single Source of Truth), vòng đời StateObject vs ObservedObject và truyền dữ liệu qua View Hierarchy.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '35 phút',
    depth: 'deep-dive',
    tags: ['ios', 'swiftui', 'state', 'binding', 'stateobject', 'environmentobject'],
    domain: 'iOS Development',
    module: 'SwiftUI: Declarative UI & Data Flow',
    prerequisites: ['ios-swiftui-essentials'],
    related: ['ios-arch-mvvm-clean'],
    learningOutcomes: [
      'Hiểu rõ nguyên lý: UI là hàm của State (UI = f(State)).',
      'Phân biệt khi nào dùng @StateObject (sở hữu vòng đời) và @ObservedObject (chỉ nhận reference từ ngoài).',
      'Sử dụng @Binding để truyền quyền sửa đổi dữ liệu cho subview mà không nhân bản state.',
      'Ứng dụng @Environment và @EnvironmentObject cho Global State toàn bộ ứng dụng.'
    ],
    knowledgeGap: 'Dùng @ObservedObject để khởi tạo đối tượng khiến ViewModel bị tạo lại liên tục mỗi khi cha Re-render, gây mất state và rò rỉ network calls.',
    updatedAt: '2026-08-19',
    readTime: '35 phút',
    content: `
<h2>Triết lý: Single Source of Truth trong SwiftUI</h2>
<p>Khác với UIKit (Imperative — bạn tự tìm view và thay đổi text), SwiftUI là <strong>Declarative</strong>. Bạn mô tả giao diện dựa trên State. Khi State thay đổi, SwiftUI tự động so sánh (diffing) và render lại phần giao diện cần thiết.</p>

<div class="dd-diagram" data-dd="ios-swiftui">
<div class="dd-svg dd-svg-dark">
<svg viewBox="0 0 800 368" role="img" aria-labelledby="ios-swiftui-dark-title ios-swiftui-dark-desc" font-family="'Geist', sans-serif">
<title id="ios-swiftui-dark-title">Một sự thật, mọi view cùng nghe</title>
<desc id="ios-swiftui-dark-desc">User interaction cập nhật State là source of truth, State chia data binding cho child views và render ra SwiftUI Body.</desc>
<defs>
<marker id="ios-swiftui-dark-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0, 8 3, 0 6" fill="#94A3B8"/>
</marker>
</defs>
<rect width="800" height="368" fill="#060913"/>
<!-- arrows -->
<path d="M 304,96 H 400" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-swiftui-dark-arrow)"/>
<rect x="312" y="90" width="64" height="12" rx="2" fill="#060913"/>
<text x="344" y="99" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">CẬP NHẬT</text>
<path d="M 520,128 V 184 H 192 Q 184,184 184,192 V 256" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-swiftui-dark-arrow)"/>
<rect x="300" y="178" width="96" height="12" rx="2" fill="#060913"/>
<text x="348" y="187" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">DATA BINDING $VAL</text>
<path d="M 560,128 V 256" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-swiftui-dark-arrow)"/>
<rect x="572" y="182" width="56" height="12" rx="2" fill="#060913"/>
<text x="600" y="191" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">RENDER</text>
<!-- nodes -->
<rect x="64" y="64" width="240" height="64" rx="6" fill="#060913"/>
<rect x="64" y="64" width="240" height="64" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="184" y="98" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">User Interaction</text>
<text x="184" y="112" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">tap · scroll · type</text>
<rect x="400" y="64" width="240" height="64" rx="6" fill="#060913"/>
<rect x="400" y="64" width="240" height="64" rx="6" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="1.2"/>
<text x="520" y="98" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">@State / @StateObject</text>
<text x="520" y="112" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">source of truth</text>
<rect x="64" y="256" width="240" height="64" rx="6" fill="#060913"/>
<rect x="64" y="256" width="240" height="64" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="184" y="290" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">@Binding</text>
<text x="184" y="304" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">child views · $val</text>
<rect x="400" y="256" width="240" height="64" rx="6" fill="#060913"/>
<rect x="400" y="256" width="240" height="64" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="520" y="290" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">SwiftUI Body</text>
<text x="520" y="304" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">view · render</text>
<!-- legend -->
<line x1="32" y1="344" x2="768" y2="344" stroke="rgba(248,250,252,0.12)" stroke-width="0.8"/>
<text x="32" y="360" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" letter-spacing="0.14em">CHÚ GIẢI</text>
<circle cx="150" cy="356" r="4" fill="#38BDF8"/>
<text x="162" y="360" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace">GỐC SỰ THẬT · STATE</text>
<line x1="400" y1="356" x2="432" y2="356" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-swiftui-dark-arrow)"/>
<text x="440" y="360" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace">LUỒNG DỮ LIỆU</text>
</svg>
</div>
<div class="dd-svg dd-svg-light">
<svg viewBox="0 0 800 368" role="img" aria-labelledby="ios-swiftui-title ios-swiftui-desc" font-family="'Geist', sans-serif">
<title id="ios-swiftui-title">Một sự thật, mọi view cùng nghe</title>
<desc id="ios-swiftui-desc">User interaction cập nhật State là source of truth, State chia data binding cho child views và render ra SwiftUI Body.</desc>
<defs>
<marker id="ios-swiftui-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0, 8 3, 0 6" fill="#64748B"/>
</marker>
</defs>
<rect width="800" height="368" fill="#F8FAFC"/>
<!-- arrows -->
<path d="M 304,96 H 400" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-swiftui-arrow)"/>
<rect x="312" y="90" width="64" height="12" rx="2" fill="#F8FAFC"/>
<text x="344" y="99" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">CẬP NHẬT</text>
<path d="M 520,128 V 184 H 192 Q 184,184 184,192 V 256" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-swiftui-arrow)"/>
<rect x="300" y="178" width="96" height="12" rx="2" fill="#F8FAFC"/>
<text x="348" y="187" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">DATA BINDING $VAL</text>
<path d="M 560,128 V 256" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-swiftui-arrow)"/>
<rect x="572" y="182" width="56" height="12" rx="2" fill="#F8FAFC"/>
<text x="600" y="191" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">RENDER</text>
<!-- nodes -->
<rect x="64" y="64" width="240" height="64" rx="6" fill="#F8FAFC"/>
<rect x="64" y="64" width="240" height="64" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="184" y="98" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">User Interaction</text>
<text x="184" y="112" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">tap · scroll · type</text>
<rect x="400" y="64" width="240" height="64" rx="6" fill="#F8FAFC"/>
<rect x="400" y="64" width="240" height="64" rx="6" fill="rgba(2,132,199,0.08)" stroke="#0284C7" stroke-width="1.2"/>
<text x="520" y="98" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">@State / @StateObject</text>
<text x="520" y="112" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">source of truth</text>
<rect x="64" y="256" width="240" height="64" rx="6" fill="#F8FAFC"/>
<rect x="64" y="256" width="240" height="64" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="184" y="290" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">@Binding</text>
<text x="184" y="304" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">child views · $val</text>
<rect x="400" y="256" width="240" height="64" rx="6" fill="#F8FAFC"/>
<rect x="400" y="256" width="240" height="64" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="520" y="290" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">SwiftUI Body</text>
<text x="520" y="304" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">view · render</text>
<!-- legend -->
<line x1="32" y1="344" x2="768" y2="344" stroke="rgba(15,23,42,0.12)" stroke-width="0.8"/>
<text x="32" y="360" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" letter-spacing="0.14em">CHÚ GIẢI</text>
<circle cx="150" cy="356" r="4" fill="#0284C7"/>
<text x="162" y="360" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace">GỐC SỰ THẬT · STATE</text>
<line x1="400" y1="356" x2="432" y2="356" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-swiftui-arrow)"/>
<text x="440" y="360" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace">LUỒNG DỮ LIỆU</text>
</svg>
</div>
</div>


<h2>Bảng phân loại Property Wrappers</h2>
<table style="width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;">
  <thead>
    <tr style="border-bottom:2px solid var(--border);">
      <th style="text-align:left;padding:10px;">Wrapper</th>
      <th style="text-align:left;padding:10px;">Kiểu dữ liệu</th>
      <th style="text-align:left;padding:10px;">Vòng đời (Lifecycle)</th>
      <th style="text-align:left;padding:10px;">Mục đích sử dụng</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;"><code>@State</code></td>
      <td style="padding:10px;">Value types (Struct, Int, String)</td>
      <td style="padding:10px;">Gắn liền với View hiện tại</td>
      <td style="padding:10px;">Trạng thái nội bộ của riêng View</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;"><code>@Binding</code></td>
      <td style="padding:10px;">Mọi kiểu dữ liệu</td>
      <td style="padding:10px;">Không sở hữu (Reference to State)</td>
      <td style="padding:10px;">Đọc/Ghi ngược lại State của cha</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;"><code>@StateObject</code></td>
      <td style="padding:10px;">ObservableObject (Class)</td>
      <td style="padding:10px;">Tạo 1 lần duy nhất, giữ qua Re-render</td>
      <td style="padding:10px;">Khởi tạo ViewModel tại View sở hữu</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;"><code>@ObservedObject</code></td>
      <td style="padding:10px;">ObservableObject (Class)</td>
      <td style="padding:10px;">Phụ thuộc đối tượng truyền vào</td>
      <td style="padding:10px;">Nhận ViewModel từ bên ngoài truyền vào</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;"><code>@EnvironmentObject</code></td>
      <td style="padding:10px;">ObservableObject (Class)</td>
      <td style="padding:10px;">Toàn bộ cây View phân nhánh</td>
      <td style="padding:10px;">Dữ liệu dùng chung (Theme, User Session)</td>
    </tr>
  </tbody>
</table>
`
  },

  'ios-publish-release-management': {
    title: 'Quy trình Release App Store & Phased Release',
    summary: 'Từ mã nguồn đến App Store: Chuẩn bị chứng chỉ (Certificates), Provisioning Profiles, Archive & Upload, vượt qua App Review và triển khai Phased Release an toàn.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '25 phút',
    depth: 'deep-dive',
    tags: ['ios', 'appstore', 'release', 'certificates', 'testflight'],
    domain: 'iOS Development',
    module: 'Publish Store: Review, Release & Maintenance',
    prerequisites: ['ios-cicd-fastlane'],
    related: ['ios-analytics-crashlytics'],
    learningOutcomes: [
      'Phân biệt rõ Developer Certificate, Distribution Certificate và Provisioning Profiles.',
      'Sử dụng Fastlane để tự động hóa quy trình Archive, Signing và Upload lên App Store Connect.',
      'Áp dụng chiến lược Phased Release (7 ngày) để kiểm soát rủi ro crash trên diện rộng.',
      'Xử lý hiệu quả các trường hợp bị Apple Reject phổ biến (Guideline 2.1, 4.3, 5.1.1).'
    ],
    knowledgeGap: 'Thiếu kiến thức quản lý Code Signing và Release strategy khiến quá trình phát hành bị trì hoãn hoặc gặp sự cố nghiêm trọng ảnh hưởng toàn bộ người dùng.',
    updatedAt: '2026-08-19',
    readTime: '25 phút',
    content: `
<h2>Quy trình phát hành chuẩn trên iOS</h2>
<div class="dd-diagram" data-dd="ios-publish">
<div class="dd-svg dd-svg-dark">
<svg viewBox="0 0 800 624" role="img" aria-labelledby="ios-publish-dark-title ios-publish-dark-desc" font-family="'Geist', sans-serif">
<title id="ios-publish-dark-title">Apple gật đầu thì mới lên kệ</title>
<desc id="ios-publish-dark-desc">Chuỗi phát hành iOS từ code freeze qua TestFlight và App Store Connect tới review, duyệt thì phased release, bị từ chối thì sửa và nộp lại.</desc>
<defs>
<marker id="ios-publish-dark-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0, 8 3, 0 6" fill="#94A3B8"/>
</marker>
</defs>
<rect width="800" height="624" fill="#060913"/>
<!-- arrows -->
<path d="M 360,88 V 112" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-publish-dark-arrow)"/>
<path d="M 360,176 V 200" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-publish-dark-arrow)"/>
<path d="M 360,264 V 288" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-publish-dark-arrow)"/>
<path d="M 360,344 V 368" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-publish-dark-arrow)"/>
<path d="M 490,408 H 560" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-publish-dark-arrow)"/>
<rect x="494" y="402" width="62" height="12" rx="2" fill="#060913"/>
<text x="525" y="411" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">APPROVED</text>
<path d="M 360,448 V 512" fill="none" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-publish-dark-arrow)"/>
<rect x="372" y="474" width="64" height="12" rx="2" fill="#060913"/>
<text x="404" y="483" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">REJECTED</text>
<!-- nodes -->
<rect x="240" y="32" width="240" height="56" rx="20" fill="#060913"/>
<rect x="240" y="32" width="240" height="56" rx="20" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="360" y="66" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Code Freeze &amp; Testing</text>
<rect x="240" y="112" width="240" height="64" rx="6" fill="#060913"/>
<rect x="240" y="112" width="240" height="64" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="360" y="146" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">TestFlight</text>
<text x="360" y="160" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">internal · external</text>
<rect x="240" y="200" width="240" height="64" rx="6" fill="#060913"/>
<rect x="240" y="200" width="240" height="64" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="360" y="234" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">App Store Connect</text>
<text x="360" y="248" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">metadata</text>
<rect x="240" y="288" width="240" height="56" rx="6" fill="#060913"/>
<rect x="240" y="288" width="240" height="56" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="360" y="321" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Submit for Review</text>
<polygon points="360,368 490,408 360,448 230,408" fill="#060913"/>
<polygon points="360,368 490,408 360,448 230,408" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="360" y="404" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Apple duyệt?</text>
<text x="360" y="418" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">review status</text>
<rect x="560" y="368" width="208" height="64" rx="6" fill="#060913"/>
<rect x="560" y="368" width="208" height="64" rx="6" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="1.2"/>
<text x="664" y="402" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Phased Release</text>
<text x="664" y="416" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">1% → 100% · 7 days</text>
<rect x="240" y="512" width="240" height="64" rx="6" fill="#060913"/>
<rect x="240" y="512" width="240" height="64" rx="6" fill="#0B132B" stroke="#F8FAFC" stroke-width="1"/>
<text x="360" y="546" fill="#F8FAFC" font-size="12" font-weight="600" text-anchor="middle">Fix &amp; Submit Resolution</text>
<text x="360" y="560" fill="#94A3B8" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">sửa rồi nộp lại</text>
<!-- legend -->
<line x1="32" y1="600" x2="768" y2="600" stroke="rgba(248,250,252,0.12)" stroke-width="0.8"/>
<text x="32" y="616" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace" letter-spacing="0.14em">CHÚ GIẢI</text>
<circle cx="150" cy="612" r="4" fill="#38BDF8"/>
<text x="162" y="616" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace">ĐÍCH ĐẾN · PHASED RELEASE</text>
<line x1="420" y1="612" x2="452" y2="612" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#ios-publish-dark-arrow)"/>
<text x="460" y="616" fill="#94A3B8" font-size="8" font-family="'JetBrains Mono', monospace">QUYẾT ĐỊNH REVIEW</text>
</svg>
</div>
<div class="dd-svg dd-svg-light">
<svg viewBox="0 0 800 624" role="img" aria-labelledby="ios-publish-title ios-publish-desc" font-family="'Geist', sans-serif">
<title id="ios-publish-title">Apple gật đầu thì mới lên kệ</title>
<desc id="ios-publish-desc">Chuỗi phát hành iOS từ code freeze qua TestFlight và App Store Connect tới review, duyệt thì phased release, bị từ chối thì sửa và nộp lại.</desc>
<defs>
<marker id="ios-publish-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0, 8 3, 0 6" fill="#64748B"/>
</marker>
</defs>
<rect width="800" height="624" fill="#F8FAFC"/>
<!-- arrows -->
<path d="M 360,88 V 112" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-publish-arrow)"/>
<path d="M 360,176 V 200" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-publish-arrow)"/>
<path d="M 360,264 V 288" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-publish-arrow)"/>
<path d="M 360,344 V 368" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-publish-arrow)"/>
<path d="M 490,408 H 560" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-publish-arrow)"/>
<rect x="494" y="402" width="62" height="12" rx="2" fill="#F8FAFC"/>
<text x="525" y="411" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">APPROVED</text>
<path d="M 360,448 V 512" fill="none" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-publish-arrow)"/>
<rect x="372" y="474" width="64" height="12" rx="2" fill="#F8FAFC"/>
<text x="404" y="483" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.06em">REJECTED</text>
<!-- nodes -->
<rect x="240" y="32" width="240" height="56" rx="20" fill="#F8FAFC"/>
<rect x="240" y="32" width="240" height="56" rx="20" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="360" y="66" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Code Freeze &amp; Testing</text>
<rect x="240" y="112" width="240" height="64" rx="6" fill="#F8FAFC"/>
<rect x="240" y="112" width="240" height="64" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="360" y="146" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">TestFlight</text>
<text x="360" y="160" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">internal · external</text>
<rect x="240" y="200" width="240" height="64" rx="6" fill="#F8FAFC"/>
<rect x="240" y="200" width="240" height="64" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="360" y="234" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">App Store Connect</text>
<text x="360" y="248" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">metadata</text>
<rect x="240" y="288" width="240" height="56" rx="6" fill="#F8FAFC"/>
<rect x="240" y="288" width="240" height="56" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="360" y="321" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Submit for Review</text>
<polygon points="360,368 490,408 360,448 230,408" fill="#F8FAFC"/>
<polygon points="360,368 490,408 360,448 230,408" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="360" y="404" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Apple duyệt?</text>
<text x="360" y="418" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">review status</text>
<rect x="560" y="368" width="208" height="64" rx="6" fill="#F8FAFC"/>
<rect x="560" y="368" width="208" height="64" rx="6" fill="rgba(2,132,199,0.08)" stroke="#0284C7" stroke-width="1.2"/>
<text x="664" y="402" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Phased Release</text>
<text x="664" y="416" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">1% → 100% · 7 days</text>
<rect x="240" y="512" width="240" height="64" rx="6" fill="#F8FAFC"/>
<rect x="240" y="512" width="240" height="64" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
<text x="360" y="546" fill="#0F172A" font-size="12" font-weight="600" text-anchor="middle">Fix &amp; Submit Resolution</text>
<text x="360" y="560" fill="#64748B" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">sửa rồi nộp lại</text>
<!-- legend -->
<line x1="32" y1="600" x2="768" y2="600" stroke="rgba(15,23,42,0.12)" stroke-width="0.8"/>
<text x="32" y="616" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace" letter-spacing="0.14em">CHÚ GIẢI</text>
<circle cx="150" cy="612" r="4" fill="#0284C7"/>
<text x="162" y="616" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace">ĐÍCH ĐẾN · PHASED RELEASE</text>
<line x1="420" y1="612" x2="452" y2="612" stroke="#64748B" stroke-width="1.2" marker-end="url(#ios-publish-arrow)"/>
<text x="460" y="616" fill="#64748B" font-size="8" font-family="'JetBrains Mono', monospace">QUYẾT ĐỊNH REVIEW</text>
</svg>
</div>
</div>


<h2>Chiến lược Phased Release (7 Ngày)</h2>
<p>Tính năng Phased Release của App Store cho phép phát hành bản cập nhật dần dần theo tỷ lệ phần trăm người dùng tự động update:</p>
<ul>
  <li><strong>Ngày 1:</strong> 1% người dùng</li>
  <li><strong>Ngày 2:</strong> 2% người dùng</li>
  <li><strong>Ngày 3:</strong> 5% người dùng</li>
  <li><strong>Ngày 4:</strong> 10% người dùng</li>
  <li><strong>Ngày 5:</strong> 20% người dùng</li>
  <li><strong>Ngày 6:</strong> 50% người dùng</li>
  <li><strong>Ngày 7:</strong> 100% người dùng</li>
</ul>
<p>Nếu Crashlytics phát hiện tỷ lệ crash tăng đột biến ở ngày 1 hoặc 2, lập tức bấm <strong>Pause Phased Release</strong> để sửa lỗi mà không làm ảnh hưởng 99% người dùng còn lại.</p>
`
  }

});
