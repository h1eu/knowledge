/* ============================================================
   Knowledge OS — DSA Module: Phu luc (Appendix)
   ============================================================ */

Object.assign(DSA_CONTENT, {

  'dsa-appendix-index': {
    title: 'Phụ lục',
    summary: 'Giới thiệu chương Phụ lục: hướng dẫn cài đặt môi trường, quy trình đóng góp mã nguồn mở, và bảng thuật ngữ Anh-Việt.',
    tags: ['dsa', 'appendix'],
    domain: 'Algorithms',
    module: 'Phụ lục',
    prerequisites: ['dsa-greedy-summary'],
    related: ['dsa-installation'],
    updatedAt: '2026-07-19',
    readTime: '1 phút',
    content: `
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/chapter_appendix.jpg" alt="Phụ lục" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
<p>Chương này tổng hợp các nội dung hỗ trợ đi kèm với cuốn sách: hướng dẫn cài đặt môi trường lập trình, cách thức tham gia đóng góp cho dự án mã nguồn mở, và bảng thuật ngữ Anh-Việt được sử dụng xuyên suốt tài liệu.</p>
`,
    originalContent: `
# Appendix

![Appendix](../assets/covers/chapter_appendix.jpg)

`
  },


  'dsa-installation': {
    title: '16.1 Cài đặt môi trường (Installation)',
    summary: 'Hướng dẫn cài đặt VS Code và thiết lập môi trường lập trình cho 10 ngôn ngữ: Python, C/C++, Java, C#, Go, Swift, JavaScript, TypeScript, Dart, Rust.',
    tags: ['dsa', 'appendix', 'environment-setup', 'vscode'],
    domain: 'Algorithms',
    module: 'Phụ lục',
    prerequisites: ['dsa-appendix-index'],
    related: ['dsa-contribution'],
    updatedAt: '2026-07-19',
    readTime: '6 phút',
    content: `
<h2>16.1.1 Cài đặt IDE (Integrated Development Environment)</h2>
<p>Chúng tôi khuyến nghị sử dụng <strong>VS Code</strong> — một IDE mã nguồn mở, nhẹ — làm môi trường phát triển tích hợp cục bộ. Hãy truy cập <a href="https://code.visualstudio.com/" target="_blank">trang chủ VS Code</a>, sau đó tải và cài đặt phiên bản phù hợp với hệ điều hành của bạn.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/vscode_installation.png" alt="Tải VS Code từ trang chủ chính thức" style="max-width: 90%; height: auto; border-radius: var(--radius-md);" />
</div>

<p>VS Code sở hữu một hệ sinh thái Extension mạnh mẽ, hỗ trợ chạy và debug hầu hết các ngôn ngữ lập trình. Ví dụ, sau khi cài đặt extension "Python Extension Pack", bạn có thể debug code Python. Các bước cài đặt được minh họa trong hình dưới đây.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/vscode_extension_installation.png" alt="Cài đặt Extension cho VS Code" style="max-width: 90%; height: auto; border-radius: var(--radius-md);" />
</div>

<h2>16.1.2 Cài đặt môi trường theo ngôn ngữ</h2>

<h3>16.1.2.1 Môi trường Python</h3>
<ol>
  <li>Tải và cài đặt <a href="https://docs.conda.io/en/latest/miniconda.html" target="_blank">Miniconda3</a> với Python 3.10 trở lên.</li>
  <li>Tìm <code>python</code> trong chợ Extension của VS Code và cài đặt Python Extension Pack.</li>
  <li>(Tùy chọn) Nhập <code>pip install black</code> trên dòng lệnh để cài đặt công cụ định dạng code (formatter).</li>
</ol>

<h3>16.1.2.2 Môi trường C/C++</h3>
<ol>
  <li>Hệ điều hành Windows cần cài đặt <a href="https://sourceforge.net/projects/mingw-w64/files/" target="_blank">MinGW</a> (<a href="https://blog.csdn.net/qq_33698226/article/details/129031241" target="_blank">hướng dẫn cấu hình</a>); macOS đã có sẵn Clang tích hợp nên không cần cài đặt thêm.</li>
  <li>Tìm <code>c++</code> trong chợ Extension của VS Code và cài đặt C/C++ Extension Pack.</li>
  <li>(Tùy chọn) Mở trang Settings, tìm tùy chọn định dạng code <code>Clang_format_fallback Style</code>, và đặt giá trị thành <code>{ BasedOnStyle: Microsoft, BreakBeforeBraces: Attach }</code>.</li>
</ol>

<h3>16.1.2.3 Môi trường Java</h3>
<ol>
  <li>Tải và cài đặt <a href="https://jdk.java.net/18/" target="_blank">OpenJDK</a> (phiên bản 10 trở lên).</li>
  <li>Tìm <code>java</code> trong chợ Extension của VS Code và cài đặt Extension Pack for Java.</li>
</ol>

<h3>16.1.2.4 Môi trường C#</h3>
<ol>
  <li>Tải và cài đặt <a href="https://dotnet.microsoft.com/en-us/download" target="_blank">.NET 8.0</a>.</li>
  <li>Tìm <code>C# Dev Kit</code> trong chợ Extension của VS Code và cài đặt C# Dev Kit (<a href="https://code.visualstudio.com/docs/csharp/get-started" target="_blank">hướng dẫn cấu hình</a>).</li>
  <li>Bạn cũng có thể sử dụng Visual Studio (<a href="https://learn.microsoft.com/zh-cn/visualstudio/install/install-visual-studio?view=vs-2022" target="_blank">hướng dẫn cài đặt</a>).</li>
</ol>

<h3>16.1.2.5 Môi trường Go</h3>
<ol>
  <li>Tải và cài đặt <a href="https://go.dev/dl/" target="_blank">Go</a>.</li>
  <li>Tìm <code>go</code> trong chợ Extension của VS Code và cài đặt Go.</li>
  <li>Nhấn <code>Ctrl + Shift + P</code> để mở command palette, gõ <code>go</code>, chọn <code>Go: Install/Update Tools</code>, tick chọn tất cả các tùy chọn rồi cài đặt.</li>
</ol>

<h3>16.1.2.6 Môi trường Swift</h3>
<ol>
  <li>Tải và cài đặt <a href="https://www.swift.org/download/" target="_blank">Swift</a>.</li>
  <li>Tìm <code>swift</code> trong chợ Extension của VS Code và cài đặt <a href="https://marketplace.visualstudio.com/items?itemName=sswg.swift-lang" target="_blank">Swift for Visual Studio Code</a>.</li>
</ol>

<h3>16.1.2.7 Môi trường JavaScript</h3>
<ol>
  <li>Tải và cài đặt <a href="https://nodejs.org/en/" target="_blank">Node.js</a>.</li>
  <li>(Tùy chọn) Tìm <code>Prettier</code> trong chợ Extension của VS Code và cài đặt công cụ định dạng code.</li>
</ol>

<h3>16.1.2.8 Môi trường TypeScript</h3>
<ol>
  <li>Thực hiện các bước cài đặt giống như môi trường JavaScript.</li>
  <li>Cài đặt <a href="https://github.com/privatenumber/tsx?tab=readme-ov-file#global-installation" target="_blank">TypeScript Execute (tsx)</a>.</li>
  <li>Tìm <code>typescript</code> trong chợ Extension của VS Code và cài đặt <a href="https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors" target="_blank">Pretty TypeScript Errors</a>.</li>
</ol>

<h3>16.1.2.9 Môi trường Dart</h3>
<ol>
  <li>Tải và cài đặt <a href="https://dart.dev/get-dart" target="_blank">Dart</a>.</li>
  <li>Tìm <code>dart</code> trong chợ Extension của VS Code và cài đặt <a href="https://marketplace.visualstudio.com/items?itemName=Dart-Code.dart-code" target="_blank">Dart</a>.</li>
</ol>

<h3>16.1.2.10 Môi trường Rust</h3>
<ol>
  <li>Tải và cài đặt <a href="https://www.rust-lang.org/tools/install" target="_blank">Rust</a>.</li>
  <li>Tìm <code>rust</code> trong chợ Extension của VS Code và cài đặt <a href="https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer" target="_blank">rust-analyzer</a>.</li>
</ol>
`,
    originalContent: `
# Programming Environment Installation

## Installing IDE

We recommend using the open-source and lightweight VS Code as the local integrated development environment (IDE). Visit the [VS Code official website](https://code.visualstudio.com/), and download and install the appropriate version of VS Code according to your operating system.

![Download VS Code from the Official Website](installation.assets/vscode_installation.png)

VS Code has a powerful ecosystem of extensions that supports running and debugging most programming languages. For example, after installing the "Python Extension Pack" extension, you can debug Python code. The installation steps are shown in the following figure.

![Install VS Code Extensions](installation.assets/vscode_extension_installation.png)

## Installing Language Environments

### Python Environment

1. Download and install [Miniconda3](https://docs.conda.io/en/latest/miniconda.html) with Python 3.10 or later.
2. Search for \`python\` in the VS Code extension marketplace and install the Python Extension Pack.
3. (Optional) Enter \`pip install black\` on the command line to install the code formatter.

### C/C++ Environment

1. Windows systems need to install [MinGW](https://sourceforge.net/projects/mingw-w64/files/) ([configuration tutorial](https://blog.csdn.net/qq_33698226/article/details/129031241)); macOS comes with Clang built-in and does not require installation.
2. Search for \`c++\` in the VS Code extension marketplace and install the C/C++ Extension Pack.
3. (Optional) Open the Settings page, search for the \`Clang_format_fallback Style\` code formatting option, and set it to \`{ BasedOnStyle: Microsoft, BreakBeforeBraces: Attach }\`.

### Java Environment

1. Download and install [OpenJDK](https://jdk.java.net/18/) (version 10 or later).
2. Search for \`java\` in the VS Code extension marketplace and install the Extension Pack for Java.

### C# Environment

1. Download and install [.NET 8.0](https://dotnet.microsoft.com/en-us/download).
2. Search for \`C# Dev Kit\` in the VS Code extension marketplace and install C# Dev Kit ([configuration tutorial](https://code.visualstudio.com/docs/csharp/get-started)).
3. You can also use Visual Studio ([installation tutorial](https://learn.microsoft.com/zh-cn/visualstudio/install/install-visual-studio?view=vs-2022)).

### Go Environment

1. Download and install [Go](https://go.dev/dl/).
2. Search for \`go\` in the VS Code extension marketplace and install Go.
3. Press \`Ctrl + Shift + P\` to open the command palette, type \`go\`, select \`Go: Install/Update Tools\`, check all options and install.

### Swift Environment

1. Download and install [Swift](https://www.swift.org/download/).
2. Search for \`swift\` in the VS Code extension marketplace and install [Swift for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=sswg.swift-lang).

### JavaScript Environment

1. Download and install [Node.js](https://nodejs.org/en/).
2. (Optional) Search for \`Prettier\` in the VS Code extension marketplace and install the code formatter.

### TypeScript Environment

1. Follow the same installation steps as the JavaScript environment.
2. Install [TypeScript Execute (tsx)](https://github.com/privatenumber/tsx?tab=readme-ov-file#global-installation).
3. Search for \`typescript\` in the VS Code extension marketplace and install [Pretty TypeScript Errors](https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors).

### Dart Environment

1. Download and install [Dart](https://dart.dev/get-dart).
2. Search for \`dart\` in the VS Code extension marketplace and install [Dart](https://marketplace.visualstudio.com/items?itemName=Dart-Code.dart-code).

### Rust Environment

1. Download and install [Rust](https://www.rust-lang.org/tools/install).
2. Search for \`rust\` in the VS Code extension marketplace and install [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer).

`
  },

  'dsa-contribution': {
    title: '16.2 Đóng góp (Contribution)',
    summary: 'Hướng dẫn tham gia đóng góp cho dự án mã nguồn mở Hello Algo: chỉnh sửa nội dung nhỏ, tạo nội dung mới qua Pull Request, và triển khai bằng Docker.',
    tags: ['dsa', 'appendix', 'open-source', 'contribution'],
    domain: 'Algorithms',
    module: 'Phụ lục',
    prerequisites: ['dsa-installation'],
    related: ['dsa-terminology'],
    updatedAt: '2026-07-19',
    readTime: '4 phút',
    content: `
<p>Do năng lực còn hạn chế, cuốn sách này khó tránh khỏi những thiếu sót và lỗi sai. Chúng tôi rất mong nhận được sự thông cảm và biết ơn sự giúp đỡ của bạn trong việc sửa chữa chúng. Nếu bạn phát hiện lỗi chính tả, liên kết hỏng, nội dung bị thiếu, diễn đạt mơ hồ, giải thích chưa rõ ràng, hoặc vấn đề về cấu trúc, xin vui lòng giúp chúng tôi chỉnh sửa để mang lại nguồn tài liệu học tập chất lượng cao hơn cho độc giả.</p>

<p>ID GitHub của tất cả <a href="https://github.com/krahets/hello-algo/graphs/contributors" target="_blank">người đóng góp</a> sẽ được hiển thị trên trang chủ của kho lưu trữ sách, phiên bản web và phiên bản PDF nhằm ghi nhận những đóng góp vô tư của họ cho cộng đồng mã nguồn mở.</p>

<div class="callout callout-success">
  <span class="callout-icon">✅</span>
  <div class="callout-body">
    <p><strong>Sức mạnh của Mã nguồn mở</strong></p>
    <p>Khoảng thời gian giữa hai lần tái bản của một cuốn sách in thường khá dài, khiến việc cập nhật nội dung rất bất tiện.</p>
    <p>Trong cuốn sách mã nguồn mở này, thời gian cập nhật nội dung đã được rút ngắn xuống chỉ còn vài ngày, thậm chí vài giờ.</p>
  </div>
</div>

<h2>16.2.1 Điều chỉnh nội dung nhỏ</h2>
<p>Như minh họa trong hình dưới đây, có một "biểu tượng chỉnh sửa" (edit icon) ở góc trên bên phải của mỗi trang. Bạn có thể chỉnh sửa văn bản hoặc code theo các bước sau.</p>
<ol>
  <li>Nhấp vào "biểu tượng chỉnh sửa". Nếu gặp thông báo yêu cầu "Fork kho lưu trữ này", vui lòng đồng ý thao tác đó.</li>
  <li>Chỉnh sửa nội dung của file Markdown nguồn, xác minh tính đúng đắn của nội dung, và cố gắng giữ định dạng nhất quán.</li>
  <li>Điền mô tả về thay đổi của bạn ở cuối trang, sau đó nhấp nút "Propose file change". Sau khi trang mới tải xong, nhấp nút "Create pull request" để gửi pull request của bạn.</li>
</ol>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/edit_markdown.png" alt="Nút chỉnh sửa trang" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<p>Hình ảnh không thể chỉnh sửa trực tiếp. Vui lòng mô tả vấn đề bằng cách tạo một <a href="https://github.com/krahets/hello-algo/issues" target="_blank">Issue</a> mới hoặc để lại bình luận. Chúng tôi sẽ nhanh chóng vẽ lại và thay thế hình ảnh.</p>

<h2>16.2.2 Tạo nội dung mới</h2>
<p>Nếu bạn quan tâm đến việc đóng góp cho dự án mã nguồn mở này, bao gồm việc dịch code sang ngôn ngữ lập trình khác hoặc mở rộng nội dung bài viết, bạn cần làm theo quy trình Pull Request dưới đây.</p>
<ol>
  <li>Đăng nhập GitHub và Fork <a href="https://github.com/krahets/hello-algo" target="_blank">kho lưu trữ code</a> của cuốn sách về tài khoản cá nhân của bạn.</li>
  <li>Truy cập trang kho lưu trữ đã fork và dùng lệnh <code>git clone</code> để clone kho lưu trữ về máy local.</li>
  <li>Tạo nội dung ở local và tiến hành kiểm thử toàn diện để xác minh tính đúng đắn của code.</li>
  <li>Commit các thay đổi ở local và push chúng lên kho lưu trữ từ xa.</li>
  <li>Làm mới trang web kho lưu trữ và nhấp nút "Create pull request" để gửi pull request của bạn.</li>
</ol>

<h2>16.2.3 Triển khai bằng Docker</h2>
<p>Từ thư mục gốc của <code>hello-algo</code>, chạy lệnh Docker sau để truy cập dự án tại <code>http://localhost:8000</code>:</p>

<div class="code-tabs">
  <div class="code-tab-buttons">
    <button class="code-tab-btn active" onclick="switchCodeTab(event, this, 'shell')">shell</button>
  </div>
  <div class="code-tab-content active" data-lang="shell">
<pre data-lang="shell"><code>docker-compose up -d</code></pre>
  </div>
</div>

<p>Dùng lệnh sau để gỡ bỏ triển khai:</p>

<div class="code-tabs">
  <div class="code-tab-buttons">
    <button class="code-tab-btn active" onclick="switchCodeTab(event, this, 'shell')">shell</button>
  </div>
  <div class="code-tab-content active" data-lang="shell">
<pre data-lang="shell"><code>docker-compose down</code></pre>
  </div>
</div>
`,
    originalContent: `
# Contributing Together

Due to limited capacity, there may be inevitable omissions and errors in this book. We appreciate your understanding and are grateful for your help in correcting them. If you discover typos, broken links, missing content, ambiguous wording, unclear explanations, or structural issues, please help us make corrections to provide readers with higher-quality learning resources.

The GitHub IDs of all [contributors](https://github.com/krahets/hello-algo/graphs/contributors) will be displayed on the homepage of the book repository, the web version, and the PDF version to acknowledge their selfless contributions to the open source community.

!!! success "The Charm of Open Source"

    The interval between two printings of a physical book is often quite long, making content updates very inconvenient.

    In this open source book, the time for content updates has been shortened to just days or even hours.

### Minor Content Adjustments

As shown in the figure below, there is an "edit icon" in the top-right corner of each page. You can modify text or code by following these steps.

1. Click the "edit icon". If you encounter a prompt asking you to "Fork this repository", please approve the operation.
2. Modify the content of the Markdown source file, verify the correctness of the content, and maintain consistent formatting as much as possible.
3. Fill in a description of your changes at the bottom of the page, then click the "Propose file change" button. After the new page loads, click the "Create pull request" button to submit your pull request.

![Page edit button](contribution.assets/edit_markdown.png)

Images cannot be directly modified. Please describe the issue by creating a new [Issue](https://github.com/krahets/hello-algo/issues) or leaving a comment. We will promptly redraw and replace the images.

### Content Creation

If you are interested in contributing to this open source project, including translating code into other programming languages or expanding article content, you will need to follow the Pull Request workflow below.

1. Log in to GitHub and Fork the book's [code repository](https://github.com/krahets/hello-algo) to your personal account.
2. Go to your forked repository page and use the \`git clone\` command to clone the repository to your local machine.
3. Create content locally and conduct comprehensive tests to verify code correctness.
4. Commit your local changes and push them to the remote repository.
5. Refresh the repository webpage and click the "Create pull request" button to submit your pull request.

### Docker Deployment

From the root directory of \`hello-algo\`, run the following Docker command to access the project at \`http://localhost:8000\`:

\`\`\`shell
docker-compose up -d
\`\`\`

Use the following command to remove the deployment:

\`\`\`shell
docker-compose down
\`\`\`

`
  },

  'dsa-terminology': {
    title: '16.3 Bảng thuật ngữ (Glossary)',
    summary: 'Bảng đầy đủ 126 thuật ngữ tiếng Anh chuyên ngành Cấu trúc dữ liệu & Thuật toán xuất hiện xuyên suốt cuốn sách, kèm nghĩa tiếng Việt.',
    tags: ['dsa', 'appendix', 'terminology', 'glossary'],
    domain: 'Algorithms',
    module: 'Phụ lục',
    prerequisites: ['dsa-contribution'],
    related: [],
    updatedAt: '2026-07-19',
    readTime: '5 phút',
    content: `
<p>Bảng dưới đây liệt kê các thuật ngữ quan trọng xuất hiện xuyên suốt cuốn sách này.</p>

<p style="text-align: center; font-style: italic; color: var(--text-secondary);">Bảng &nbsp; Các thuật ngữ quan trọng trong Cấu trúc dữ liệu và Thuật toán</p>

<div style="overflow-x: auto;">
  <table style="width: 100%; border-collapse: collapse;">
    <thead>
      <tr style="background-color: var(--bg-color-tertiary);">
        <th style="padding: 8px; text-align: left; border: 1px solid var(--border-color);">Tiếng Anh (English)</th>
        <th style="padding: 8px; text-align: left; border: 1px solid var(--border-color);">Tiếng Việt</th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">algorithm</td><td style="padding: 8px; border: 1px solid var(--border-color);">Thuật toán</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">data structure</td><td style="padding: 8px; border: 1px solid var(--border-color);">Cấu trúc dữ liệu</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">code</td><td style="padding: 8px; border: 1px solid var(--border-color);">Mã nguồn</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">file</td><td style="padding: 8px; border: 1px solid var(--border-color);">Tệp / Tập tin</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">function</td><td style="padding: 8px; border: 1px solid var(--border-color);">Hàm</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">method</td><td style="padding: 8px; border: 1px solid var(--border-color);">Phương thức</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">variable</td><td style="padding: 8px; border: 1px solid var(--border-color);">Biến</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">asymptotic complexity analysis</td><td style="padding: 8px; border: 1px solid var(--border-color);">Phân tích độ phức tạp tiệm cận</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">time complexity</td><td style="padding: 8px; border: 1px solid var(--border-color);">Độ phức tạp thời gian</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">space complexity</td><td style="padding: 8px; border: 1px solid var(--border-color);">Độ phức tạp không gian</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">loop</td><td style="padding: 8px; border: 1px solid var(--border-color);">Vòng lặp</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">iteration</td><td style="padding: 8px; border: 1px solid var(--border-color);">Lặp (iteration)</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">recursion</td><td style="padding: 8px; border: 1px solid var(--border-color);">Đệ quy</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">tail recursion</td><td style="padding: 8px; border: 1px solid var(--border-color);">Đệ quy đuôi</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">recursion tree</td><td style="padding: 8px; border: 1px solid var(--border-color);">Cây đệ quy</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">big-O notation</td><td style="padding: 8px; border: 1px solid var(--border-color);">Ký hiệu Big-O</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">asymptotic upper bound</td><td style="padding: 8px; border: 1px solid var(--border-color);">Cận trên tiệm cận</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">sign-magnitude</td><td style="padding: 8px; border: 1px solid var(--border-color);">Biểu diễn dấu-độ lớn</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">1's complement</td><td style="padding: 8px; border: 1px solid var(--border-color);">Bù 1</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">2's complement</td><td style="padding: 8px; border: 1px solid var(--border-color);">Bù 2</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">array</td><td style="padding: 8px; border: 1px solid var(--border-color);">Mảng</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">index</td><td style="padding: 8px; border: 1px solid var(--border-color);">Chỉ số</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">linked list</td><td style="padding: 8px; border: 1px solid var(--border-color);">Danh sách liên kết</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">linked list node, list node</td><td style="padding: 8px; border: 1px solid var(--border-color);">Nút danh sách liên kết</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">head node</td><td style="padding: 8px; border: 1px solid var(--border-color);">Nút đầu</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">tail node</td><td style="padding: 8px; border: 1px solid var(--border-color);">Nút cuối</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">list</td><td style="padding: 8px; border: 1px solid var(--border-color);">Danh sách (động)</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">dynamic array</td><td style="padding: 8px; border: 1px solid var(--border-color);">Mảng động</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">hard disk</td><td style="padding: 8px; border: 1px solid var(--border-color);">Ổ đĩa cứng</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">random-access memory (RAM)</td><td style="padding: 8px; border: 1px solid var(--border-color);">Bộ nhớ truy cập ngẫu nhiên (RAM)</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">cache memory</td><td style="padding: 8px; border: 1px solid var(--border-color);">Bộ nhớ đệm (cache)</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">cache miss</td><td style="padding: 8px; border: 1px solid var(--border-color);">Trượt cache (cache miss)</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">cache hit rate</td><td style="padding: 8px; border: 1px solid var(--border-color);">Tỷ lệ trúng cache</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">stack</td><td style="padding: 8px; border: 1px solid var(--border-color);">Ngăn xếp</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">top of the stack</td><td style="padding: 8px; border: 1px solid var(--border-color);">Đỉnh ngăn xếp</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">bottom of the stack</td><td style="padding: 8px; border: 1px solid var(--border-color);">Đáy ngăn xếp</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">queue</td><td style="padding: 8px; border: 1px solid var(--border-color);">Hàng đợi</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">double-ended queue</td><td style="padding: 8px; border: 1px solid var(--border-color);">Hàng đợi hai đầu (deque)</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">front of the queue</td><td style="padding: 8px; border: 1px solid var(--border-color);">Đầu hàng đợi</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">rear of the queue</td><td style="padding: 8px; border: 1px solid var(--border-color);">Cuối hàng đợi</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">hash table</td><td style="padding: 8px; border: 1px solid var(--border-color);">Bảng băm</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">hash set</td><td style="padding: 8px; border: 1px solid var(--border-color);">Tập hợp băm</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">bucket</td><td style="padding: 8px; border: 1px solid var(--border-color);">Bucket (ngăn chứa)</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">hash function</td><td style="padding: 8px; border: 1px solid var(--border-color);">Hàm băm</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">hash collision</td><td style="padding: 8px; border: 1px solid var(--border-color);">Va chạm băm</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">load factor</td><td style="padding: 8px; border: 1px solid var(--border-color);">Hệ số tải</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">separate chaining</td><td style="padding: 8px; border: 1px solid var(--border-color);">Nối dây chuyền (separate chaining)</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">open addressing</td><td style="padding: 8px; border: 1px solid var(--border-color);">Địa chỉ mở (open addressing)</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">linear probing</td><td style="padding: 8px; border: 1px solid var(--border-color);">Dò tuyến tính</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">lazy deletion</td><td style="padding: 8px; border: 1px solid var(--border-color);">Xóa trì hoãn (lazy deletion)</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">binary tree</td><td style="padding: 8px; border: 1px solid var(--border-color);">Cây nhị phân</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">tree node</td><td style="padding: 8px; border: 1px solid var(--border-color);">Nút cây</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">left-child node</td><td style="padding: 8px; border: 1px solid var(--border-color);">Nút con trái</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">right-child node</td><td style="padding: 8px; border: 1px solid var(--border-color);">Nút con phải</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">parent node</td><td style="padding: 8px; border: 1px solid var(--border-color);">Nút cha</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">left subtree</td><td style="padding: 8px; border: 1px solid var(--border-color);">Cây con trái</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">right subtree</td><td style="padding: 8px; border: 1px solid var(--border-color);">Cây con phải</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">root node</td><td style="padding: 8px; border: 1px solid var(--border-color);">Nút gốc</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">leaf node</td><td style="padding: 8px; border: 1px solid var(--border-color);">Nút lá</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">edge</td><td style="padding: 8px; border: 1px solid var(--border-color);">Cạnh</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">level</td><td style="padding: 8px; border: 1px solid var(--border-color);">Cấp độ (tầng)</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">degree</td><td style="padding: 8px; border: 1px solid var(--border-color);">Bậc</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">height</td><td style="padding: 8px; border: 1px solid var(--border-color);">Chiều cao</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">depth</td><td style="padding: 8px; border: 1px solid var(--border-color);">Độ sâu</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">perfect binary tree</td><td style="padding: 8px; border: 1px solid var(--border-color);">Cây nhị phân hoàn hảo</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">complete binary tree</td><td style="padding: 8px; border: 1px solid var(--border-color);">Cây nhị phân đầy đủ</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">full binary tree</td><td style="padding: 8px; border: 1px solid var(--border-color);">Cây nhị phân đầy (full)</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">balanced binary tree</td><td style="padding: 8px; border: 1px solid var(--border-color);">Cây nhị phân cân bằng</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">binary search tree</td><td style="padding: 8px; border: 1px solid var(--border-color);">Cây nhị phân tìm kiếm</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">AVL tree</td><td style="padding: 8px; border: 1px solid var(--border-color);">Cây AVL</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">red-black tree</td><td style="padding: 8px; border: 1px solid var(--border-color);">Cây đỏ đen</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">level-order traversal</td><td style="padding: 8px; border: 1px solid var(--border-color);">Duyệt theo tầng</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">breadth-first traversal</td><td style="padding: 8px; border: 1px solid var(--border-color);">Duyệt theo chiều rộng</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">depth-first traversal</td><td style="padding: 8px; border: 1px solid var(--border-color);">Duyệt theo chiều sâu</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">binary search tree</td><td style="padding: 8px; border: 1px solid var(--border-color);">Cây nhị phân tìm kiếm</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">balanced binary search tree</td><td style="padding: 8px; border: 1px solid var(--border-color);">Cây nhị phân tìm kiếm cân bằng</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">balance factor</td><td style="padding: 8px; border: 1px solid var(--border-color);">Hệ số cân bằng</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">heap</td><td style="padding: 8px; border: 1px solid var(--border-color);">Đống (heap)</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">max heap</td><td style="padding: 8px; border: 1px solid var(--border-color);">Đống lớn nhất (max heap)</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">min heap</td><td style="padding: 8px; border: 1px solid var(--border-color);">Đống nhỏ nhất (min heap)</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">priority queue</td><td style="padding: 8px; border: 1px solid var(--border-color);">Hàng đợi ưu tiên</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">heapify</td><td style="padding: 8px; border: 1px solid var(--border-color);">Heap hóa (heapify)</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">top-k problem</td><td style="padding: 8px; border: 1px solid var(--border-color);">Bài toán Top-k</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">graph</td><td style="padding: 8px; border: 1px solid var(--border-color);">Đồ thị</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">vertex</td><td style="padding: 8px; border: 1px solid var(--border-color);">Đỉnh</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">undirected graph</td><td style="padding: 8px; border: 1px solid var(--border-color);">Đồ thị vô hướng</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">directed graph</td><td style="padding: 8px; border: 1px solid var(--border-color);">Đồ thị có hướng</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">connected graph</td><td style="padding: 8px; border: 1px solid var(--border-color);">Đồ thị liên thông</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">disconnected graph</td><td style="padding: 8px; border: 1px solid var(--border-color);">Đồ thị không liên thông</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">weighted graph</td><td style="padding: 8px; border: 1px solid var(--border-color);">Đồ thị có trọng số</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">adjacency</td><td style="padding: 8px; border: 1px solid var(--border-color);">Kề nhau (adjacency)</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">path</td><td style="padding: 8px; border: 1px solid var(--border-color);">Đường đi</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">in-degree</td><td style="padding: 8px; border: 1px solid var(--border-color);">Bậc vào</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">out-degree</td><td style="padding: 8px; border: 1px solid var(--border-color);">Bậc ra</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">adjacency matrix</td><td style="padding: 8px; border: 1px solid var(--border-color);">Ma trận kề</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">adjacency list</td><td style="padding: 8px; border: 1px solid var(--border-color);">Danh sách kề</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">breadth-first search</td><td style="padding: 8px; border: 1px solid var(--border-color);">Tìm kiếm theo chiều rộng (BFS)</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">depth-first search</td><td style="padding: 8px; border: 1px solid var(--border-color);">Tìm kiếm theo chiều sâu (DFS)</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">binary search</td><td style="padding: 8px; border: 1px solid var(--border-color);">Tìm kiếm nhị phân</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">searching algorithm</td><td style="padding: 8px; border: 1px solid var(--border-color);">Thuật toán tìm kiếm</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">sorting algorithm</td><td style="padding: 8px; border: 1px solid var(--border-color);">Thuật toán sắp xếp</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">selection sort</td><td style="padding: 8px; border: 1px solid var(--border-color);">Sắp xếp chọn</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">bubble sort</td><td style="padding: 8px; border: 1px solid var(--border-color);">Sắp xếp nổi bọt</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">insertion sort</td><td style="padding: 8px; border: 1px solid var(--border-color);">Sắp xếp chèn</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">quick sort</td><td style="padding: 8px; border: 1px solid var(--border-color);">Sắp xếp nhanh</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">merge sort</td><td style="padding: 8px; border: 1px solid var(--border-color);">Sắp xếp trộn</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">heap sort</td><td style="padding: 8px; border: 1px solid var(--border-color);">Sắp xếp vun đống</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">bucket sort</td><td style="padding: 8px; border: 1px solid var(--border-color);">Sắp xếp theo nhóm (bucket sort)</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">counting sort</td><td style="padding: 8px; border: 1px solid var(--border-color);">Sắp xếp đếm</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">radix sort</td><td style="padding: 8px; border: 1px solid var(--border-color);">Sắp xếp cơ số (radix sort)</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">divide and conquer</td><td style="padding: 8px; border: 1px solid var(--border-color);">Chia để trị</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">hanota problem</td><td style="padding: 8px; border: 1px solid var(--border-color);">Bài toán Tháp Hà Nội (Hanota)</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">backtracking algorithm</td><td style="padding: 8px; border: 1px solid var(--border-color);">Thuật toán quay lui</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">constraint</td><td style="padding: 8px; border: 1px solid var(--border-color);">Ràng buộc</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">solution</td><td style="padding: 8px; border: 1px solid var(--border-color);">Lời giải</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">state</td><td style="padding: 8px; border: 1px solid var(--border-color);">Trạng thái</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">pruning</td><td style="padding: 8px; border: 1px solid var(--border-color);">Cắt tỉa</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">permutations problem</td><td style="padding: 8px; border: 1px solid var(--border-color);">Bài toán hoán vị</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">subset-sum problem</td><td style="padding: 8px; border: 1px solid var(--border-color);">Bài toán tổng tập con</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">n-queens problem</td><td style="padding: 8px; border: 1px solid var(--border-color);">Bài toán n quân hậu</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">dynamic programming</td><td style="padding: 8px; border: 1px solid var(--border-color);">Quy hoạch động</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">initial state</td><td style="padding: 8px; border: 1px solid var(--border-color);">Trạng thái ban đầu</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">state-transition equation</td><td style="padding: 8px; border: 1px solid var(--border-color);">Phương trình chuyển trạng thái</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">knapsack problem</td><td style="padding: 8px; border: 1px solid var(--border-color);">Bài toán cái túi (knapsack)</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">edit distance problem</td><td style="padding: 8px; border: 1px solid var(--border-color);">Bài toán khoảng cách chỉnh sửa</td></tr>
      <tr><td style="padding: 8px; border: 1px solid var(--border-color);">greedy algorithm</td><td style="padding: 8px; border: 1px solid var(--border-color);">Thuật toán tham lam</td></tr>
    </tbody>
  </table>
</div>
`,
    originalContent: `
# Glossary

The following table lists important terms that appear in this book.

<p align="center"> Table <id> &nbsp; Important Terms in Data Structures and Algorithms </p>

| English                        |
| ------------------------------ |
| algorithm                      |
| data structure                 |
| code                           |
| file                           |
| function                       |
| method                         |
| variable                       |
| asymptotic complexity analysis |
| time complexity                |
| space complexity               |
| loop                           |
| iteration                      |
| recursion                      |
| tail recursion                 |
| recursion tree                 |
| big-$O$ notation               |
| asymptotic upper bound         |
| sign-magnitude                 |
| 1’s complement                 |
| 2’s complement                 |
| array                          |
| index                          |
| linked list                    |
| linked list node, list node    |
| head node                      |
| tail node                      |
| list                           |
| dynamic array                  |
| hard disk                      |
| random-access memory (RAM)     |
| cache memory                   |
| cache miss                     |
| cache hit rate                 |
| stack                          |
| top of the stack               |
| bottom of the stack            |
| queue                          |
| double-ended queue             |
| front of the queue             |
| rear of the queue              |
| hash table                     |
| hash set                       |
| bucket                         |
| hash function                  |
| hash collision                 |
| load factor                    |
| separate chaining              |
| open addressing                |
| linear probing                 |
| lazy deletion                  |
| binary tree                    |
| tree node                      |
| left-child node                |
| right-child node               |
| parent node                    |
| left subtree                   |
| right subtree                  |
| root node                      |
| leaf node                      |
| edge                           |
| level                          |
| degree                         |
| height                         |
| depth                          |
| perfect binary tree            |
| complete binary tree           |
| full binary tree               |
| balanced binary tree           |
| binary search tree             |
| AVL tree                       |
| red-black tree                 |
| level-order traversal          |
| breadth-first traversal        |
| depth-first traversal          |
| binary search tree             |
| balanced binary search tree    |
| balance factor                 |
| heap                           |
| max heap                       |
| min heap                       |
| priority queue                 |
| heapify                        |
| top-$k$ problem                |
| graph                          |
| vertex                         |
| undirected graph               |
| directed graph                 |
| connected graph                |
| disconnected graph             |
| weighted graph                 |
| adjacency                      |
| path                           |
| in-degree                      |
| out-degree                     |
| adjacency matrix               |
| adjacency list                 |
| breadth-first search           |
| depth-first search             |
| binary search                  |
| searching algorithm            |
| sorting algorithm              |
| selection sort                 |
| bubble sort                    |
| insertion sort                 |
| quick sort                     |
| merge sort                     |
| heap sort                      |
| bucket sort                    |
| counting sort                  |
| radix sort                     |
| divide and conquer             |
| hanota problem                 |
| backtracking algorithm         |
| constraint                     |
| solution                       |
| state                          |
| pruning                        |
| permutations problem           |
| subset-sum problem             |
| $n$-queens problem             |
| dynamic programming            |
| initial state                  |
| state-transition equation      |
| knapsack problem               |
| edit distance problem          |
| greedy algorithm               |

`
  },

});
