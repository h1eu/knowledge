/* ============================================================
   AUTO-GENERATED FILE — DO NOT EDIT MANUALLY
   Nguồn chân lý: knowledge/git-beginner/*.md
   Sinh lại bằng: node tools/gen_git_content.js
   ============================================================ */

const GIT_CONTENT = {
  "git-github-account": {
    "title": "Tạo tài khoản GitHub & kết nối SSH",
    "summary": "Đăng ký GitHub, sinh SSH key, đăng public key và xác thực thành công — bước cuối của ngày onboard trước khi chạm vào repo thật.",
    "status": "published",
    "difficulty": "beginner",
    "depth": "lesson",
    "tags": [
      "github",
      "account",
      "ssh"
    ],
    "domain": "Git & GitHub Beginner",
    "module": "Module 01: Version Control Foundations",
    "prerequisites": [
      "git-what-is-git"
    ],
    "related": [
      "git-create-repository",
      "git-remote-push"
    ],
    "learningOutcomes": [
      "Tạo tài khoản GitHub với username chuyên nghiệp.",
      "Sinh và đăng SSH key, xác thực bằng ssh -T.",
      "Hiểu vì sao private key không bao giờ rời máy."
    ],
    "knowledgeGap": "Đăng key xong vẫn clone bằng HTTPS nên cứ bị hỏi mật khẩu — cần dùng đúng URL dạng SSH.",
    "updatedAt": "2026-08-23",
    "readTime": "9 phút",
    "next": "git-init",
    "previous": "git-install-git",
    "content": "<div class=\"callout callout-note\"><span class=\"callout-icon\">ℹ️</span><div class=\"callout-body\"><strong>Bối cảnh:</strong> An nhắn: <em>\"Xong Git chưa? Gửi mình username GitHub để mời vào repo <code>task-board</code>.\"</em> Bài này giúp bạn có tài khoản + SSH key hoạt động trong 10 phút.</div></div>\n\n<h2>Vì sao cần GitHub khi Git chạy local được?</h2>\n\n<p>Git quản lý phiên bản trên <strong>một máy</strong>. Ba nhu cầu buộc phải có remote (nơi chứa repo trên mạng):</p>\n\n<ol><li><strong>Backup</strong> ngoài ổ cứng cá nhân — máy hỏng không mất lịch sử.</li><li><strong>Chia sẻ</strong> repo cho đồng nghiệp (An sẽ mời bạn vào <code>task-board</code>).</li><li><strong>Cộng tác</strong>: Pull Request, review, CI — tất cả diễn ra trên nền tảng như GitHub.</li></ol>\n\n<h2>Bước 1: Đăng ký</h2>\n\n<ol><li>Vào <a href=\"https://github.com\" target=\"_blank\" rel=\"noopener\">github.com</a> → Sign up → xác nhận email.</li><li>Chọn username cẩn thận: nó nằm trong URL (<code>github.com/username/repo</code>) và là một phần portfolio nghề nghiệp. Dùng tên ngắn, dễ đọc, chuyên nghiệp.</li></ol>\n\n<h2>Bước 2: Sinh SSH key trên máy</h2>\n\n<pre><code class=\"language-bash\">ssh-keygen -t ed25519 -C \"hazu@congty.vn\"</code></pre>\n\n<p>Nhấn Enter ba lần (chấp nhận đường dẫn mặc định, bỏ passphrase khi mới học). Output mong đợi:</p>\n\n<pre><code>Generating public/private ed25519 key pair.\nYour identification has been saved in /Users/you/.ssh/id_ed25519\nYour public key has been saved in /Users/you/.ssh/id_ed25519.pub</code></pre>\n\n<p>Hai file được tạo:</p>\n\n<ul><li><code>id_ed25519</code> — <strong>private key</strong>: giữ trên máy, tuyệt đối không gửi ai, không commit.</li><li><code>id_ed25519.pub</code> — <strong>public key</strong>: đây mới là thứ đăng lên GitHub.</li></ul>\n\n<h2>Bước 3: Đăng public key lên GitHub</h2>\n\n<p>Copy nội dung public key:</p>\n\n<pre><code class=\"language-bash\">cat ~/.ssh/id_ed25519.pub</code></pre>\n\n<p>Output dạng:</p>\n\n<pre><code>ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI... hazu@congty.vn</code></pre>\n\n<p>Trên GitHub: <strong>Settings → SSH and GPG keys → New SSH key</strong> → dán toàn bộ dòng trên → Add.</p>\n\n<h2>Bước 4: Xác thực</h2>\n\n<pre><code class=\"language-bash\">ssh -T git@github.com</code></pre>\n\n<p>Lần đầu sẽ hỏi fingerprint — gõ <code>yes</code>. Output mong đợi:</p>\n\n<pre><code>Hi hazu! You've successfully authenticated, but GitHub does not provide shell access.</code></pre>\n\n<p>Thấy lời chào <code>Hi &lt;username&gt;!</code> là xong nhiệm vụ ngày onboard. Nhắn username cho An để được mời vào repo.</p>\n\n<h2>Quy ước URL: SSH vs HTTPS</h2>\n\n<table style=\"width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;\">\n  <thead><tr style=\"border-bottom:2px solid var(--border);\"><th style=\"text-align:left;padding:10px;\">URL</th><th style=\"text-align:left;padding:10px;\">Khi nào dùng</th></tr></thead>\n  <tbody>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\"><code>git@github.com:user/repo.git</code></td><td style=\"padding:10px;\">Đã setup SSH (trường hợp của bạn)</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\"><code>https://github.com/user/repo.git</code></td><td style=\"padding:10px;\">Máy chưa có key; sẽ hỏi token mỗi lần</td></tr>\n  </tbody>\n</table>\n\n<p>Sau này clone repo <code>task-board</code>, nhớ dùng <strong>dạng SSH</strong> thì push/pull mới không hỏi mật khẩu.</p>\n\n<h2>Sai lầm thường gặp</h2>\n\n<ul><li>Đăng nhầm <strong>private</strong> key (file không có <code>.pub</code>) lên GitHub — vô hiệu hóa cơ chế bảo mật; nếu lỡ tay, sinh lại cặp key mới ngay.</li><li>Đăng key xong vẫn clone bằng URL HTTPS → cứ bị hỏi mật khẩu. Kiểm tra remote bằng <code>git remote -v</code>, sửa bằng <code>git remote set-url</code>.</li><li>Bỏ qua xác thực email → commits không hiện avatar, contribution graph trống.</li></ul>\n\n<h2>References</h2>\n\n<ul><li><a href=\"https://docs.github.com/en/authentication/connecting-to-github-with-ssh\" target=\"_blank\" rel=\"noopener\">GitHub Docs: Connecting to GitHub with SSH</a></li><li><a href=\"https://git-scm.com/book/en/v2/Git-on-the-Server-Generating-Your-SSH-Public-Key\" target=\"_blank\" rel=\"noopener\">Pro Git 4.3: Generating Your SSH Public Key</a></li></ul>\n\n<h2>Học tiếp</h2>\n\n<p>Hoàn thành ngày onboard! Chuyển sang Module 02: bài đầu tiên là <a href=\"index.html?topic=git-init\">git init — Khởi tạo Repository</a>.</p>"
  },
  "git-install-git": {
    "title": "Cài đặt Git",
    "summary": "Cài Git theo hệ điều hành, cấu hình user.name/user.email đúng email GitHub, kiểm tra bằng output thật — nhiệm vụ đầu tiên ngày onboard.",
    "status": "published",
    "difficulty": "beginner",
    "depth": "lesson",
    "tags": [
      "git",
      "install",
      "setup"
    ],
    "domain": "Git & GitHub Beginner",
    "module": "Module 01: Version Control Foundations",
    "prerequisites": [
      "git-what-is-git"
    ],
    "related": [
      "git-github-account",
      "git-init"
    ],
    "learningOutcomes": [
      "Cài Git và xác nhận bằng git --version.",
      "Cấu hình user.name / user.email khớp email tài khoản GitHub.",
      "Đặt branch mặc định là main và trình soạn thảo commit."
    ],
    "knowledgeGap": "Email cấu hình lệch email GitHub — commit vẫn chạy nhưng contribution graph không tính công của bạn.",
    "updatedAt": "2026-08-23",
    "readTime": "7 phút",
    "next": "git-github-account",
    "previous": "git-what-is-git",
    "content": "<div class=\"callout callout-note\"><span class=\"callout-icon\">ℹ️</span><div class=\"callout-body\"><strong>Bối cảnh:</strong> Task đầu tiên An giao: <em>\"Cài Git, cấu hình định danh dùng email công ty, xong gửi mình output <code>git config --list</code> để check.\"</em> Làm đúng bài này là hoàn thành task.</div></div>\n\n<h2>Bước 1: Cài đặt theo hệ điều hành</h2>\n\n<h3>macOS</h3>\n\n<pre><code class=\"language-bash\">brew install git</code></pre>\n\n<h3>Windows</h3>\n\n<p>Tải tại <a href=\"https://git-scm.com/downloads/win\" target=\"_blank\" rel=\"noopener\">git-scm.com/downloads/win</a>, giữ nguyên tùy chọn mặc định. Trình cài kèm <strong>Git Bash</strong> — hãy dùng nó cho mọi bài trong khóa học để output thống nhất.</p>\n\n<h3>Linux (Ubuntu/Debian)</h3>\n\n<pre><code class=\"language-bash\">sudo apt install git</code></pre>\n\n<h3>Kiểm tra cài đặt</h3>\n\n<pre><code class=\"language-bash\">git --version</code></pre>\n\n<p>Output mong đợi:</p>\n\n<pre><code>git version 2.46.0</code></pre>\n\n<p>Thấy số phiên bản là thành công. Nếu báo <code>command not found</code>, cài chưa ăn — khởi động lại terminal rồi thử lại.</p>\n\n<h2>Bước 2: Cấu hình định danh bắt buộc</h2>\n\n<p>Mỗi commit được gắn tên + email tác giả. Chưa khai báo thì commit đầu tiên sẽ bị từ chối:</p>\n\n<pre><code class=\"language-bash\">git config --global user.name \"Hazu Nguyen\"\ngit config --global user.email \"hazu@congty.vn\"</code></pre>\n\n<p>Hai điểm hiểu đúng:</p>\n\n<ul><li><strong>Email nên trùng email tài khoản GitHub</strong> để commits được tính vào contribution graph của bạn.</li><li><code>--global</code> áp cho mọi repo trên máy. Repo riêng cần email khác (vd dự án open source dùng email cá nhân): chạy lại lệnh <strong>không có</strong> <code>--global</code> ngay trong repo đó.</li></ul>\n\n<h2>Bước 3: Hai cấu hình nên đặt ngay</h2>\n\n<pre><code class=\"language-bash\">git config --global init.defaultBranch main\ngit config --global core.editor \"code --wait\"</code></pre>\n\n<ul><li>Dòng 1: branch mặc định là <code>main</code> thay vì <code>master</code> cũ — khớp quy ước GitHub hiện nay.</li><li>Dòng 2: VS Code làm trình soạn thảo commit message.</li></ul>\n\n<h2>Bước 4: Kiểm tra toàn bộ (gửi An)</h2>\n\n<pre><code class=\"language-bash\">git config --list --global</code></pre>\n\n<p>Output mong đợi:</p>\n\n<pre><code>user.name=Hazu Nguyen\nuser.email=hazu@congty.vn\ninit.defaultbranch=main\ncore.editor=code --wait</code></pre>\n\n<h2>Sai lầm thường gặp</h2>\n\n<ul><li>Quên bước 2 → commit đầu tiên bị từ chối với lỗi <code>Please tell me who you are</code>. Đọc message, chạy lại lệnh config là xong.</li><li>Gõ thiếu <code>--global</code> rồi tưởng cấu hình không ăn — không có flag thì chỉ áp dụng repo hiện tại.</li><li>Windows dùng CMD thay Git Bash — nhiều ví dụ sau này (SSH, đường dẫn <code>~</code>) sẽ lệch.</li></ul>\n\n<h2>References</h2>\n\n<ul><li><a href=\"https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup\" target=\"_blank\" rel=\"noopener\">Pro Git 1.5: First-Time Git Setup</a></li><li><a href=\"https://git-scm.com/docs/git-config\" target=\"_blank\" rel=\"noopener\">Git config docs</a></li></ul>\n\n<h2>Học tiếp</h2>\n\n<p><a href=\"index.html?topic=git-github-account\">Tạo tài khoản GitHub</a> — đăng ký tài khoản và thiết lập SSH key để máy nói chuyện được với GitHub.</p>"
  },
  "git-what-is-vcs": {
    "title": "Version Control System là gì?",
    "summary": "Vì sao team không thể quản lý code bằng folder zip: vấn đề thật của làm việc nhóm, ba năng lực của VCS và vì sao Git chọn mô hình distributed.",
    "status": "published",
    "difficulty": "beginner",
    "depth": "lesson",
    "tags": [
      "git",
      "vcs",
      "beginner"
    ],
    "domain": "Git & GitHub Beginner",
    "module": "Module 01: Version Control Foundations",
    "prerequisites": [],
    "related": [
      "git-what-is-git"
    ],
    "learningOutcomes": [
      "Nêu được ba vấn đề của quản lý code bằng tay mà chính bạn sẽ gặp nếu không dùng VCS.",
      "Liệt kê ba năng lực cốt lõi: history, restore, branching.",
      "Phân biệt Local / Centralized / Distributed bằng một câu mỗi loại."
    ],
    "knowledgeGap": "Nhầm VCS là 'nơi lưu file' giống Google Drive thay vì hệ thống ghi lịch sử theo commit.",
    "updatedAt": "2026-08-23",
    "readTime": "8 phút",
    "next": "git-what-is-git",
    "previous": "",
    "content": "<div class=\"callout callout-note\"><span class=\"callout-icon\">ℹ️</span><div class=\"callout-body\"><strong>Bối cảnh:</strong> Trước khi mở terminal, An cho bạn xem một \"di tích\" của dự án cũ: folder chứa <code>task-board-final.zip</code>, <code>task-board-final-v2.zip</code>, <code>task-board-FIXED-chinh-sua-boi-Chi.zip</code>. Bài này giải thích vì sao team từ bỏ cách đó.</div></div>\n\n<h2>Ba vấn đề của quản lý code bằng tay</h2>\n\n<ol><li><strong>Không biết ai sửa gì, khi nào, vì sao</strong> — lịch sử nằm trong trí nhớ con người, người nghỉ việc thì lịch sử mất theo.</li><li><strong>Hai người sửa cùng file phải hợp nhất thủ công</strong> — ai copy đè sau sẽ âm thầm xóa code của người kia.</li><li><strong>Quay về bản cũ gần như bất khả thi</strong> — bug xuất hiện hôm nay, không ai nhớ bản tuần trước \"tốt\" nằm ở file nào.</li></ol>\n\n<p>Version Control System (VCS) tồn tại để xử lý đúng ba vấn đề đó.</p>\n\n<h2>Bản chất: hệ thống ghi lịch sử theo commit</h2>\n\n<p>VCS <strong>ghi lại mọi thay đổi theo thời gian</strong> dưới dạng các mốc gọi là commit — mỗi mốc có tác giả, thời gian, mô tả và nội dung thay đổi. Từ nền tảng đó có ba năng lực:</p>\n\n<table style=\"width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;\">\n  <thead><tr style=\"border-bottom:2px solid var(--border);\"><th style=\"text-align:left;padding:10px;\">Năng lực</th><th style=\"text-align:left;padding:10px;\">Giải quyết vấn đề nào</th></tr></thead>\n  <tbody>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\"><strong>History</strong></td><td style=\"padding:10px;\">Ai sửa gì, khi nào, tại sao — tra cứu được</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\"><strong>Restore</strong></td><td style=\"padding:10px;\">Quay về bất kỳ mốc nào mà không mất dữ liệu</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\"><strong>Branching</strong></td><td style=\"padding:10px;\">Nhiều người làm song song rồi hợp nhất lại an toàn</td></tr>\n  </tbody>\n</table>\n\n<div class=\"mermaid\">\ngraph LR\n    A[\"commit 1<br/>Khởi tạo\"] --> B[\"commit 2<br/>Thêm API tasks\"]\n    B --> C[\"commit 3<br/>Sửa bug drag-drop\"]\n    C --> D[\"commit 4<br/>Hiện tại\"]\n    D -.->|\"restore về bất kỳ lúc nào\"| B\n</div>\n\n<h2>Ba mô hình VCS — vì sao Git chọn distributed</h2>\n\n<ul><li><strong>Local</strong>: lịch sử chỉ nằm trên 1 máy → hỏng ổ cứng là mất tất cả, không làm nhóm được.</li><li><strong>Centralized</strong> (SVN): lịch sử ở một server trung tâm, mọi thao tác cần mạng; server chết thì cả team dừng việc.</li><li><strong>Distributed</strong> (Git): <strong>mỗi máy giữ bản sao đầy đủ của repo kèm toàn bộ lịch sử</strong>; server chỉ là điểm đồng bộ. Máy ai hỏng cũng khôi phục được từ người khác.</li></ul>\n\n<p>Điểm thực tế bạn cần nhớ ngay: nhờ distributed, <strong>commit, xem lịch sử, tạo branch đều chạy offline</strong> — chỉ push/pull mới cần mạng.</p>\n\n<h2>Sai lầm thường gặp</h2>\n\n<ul><li>Nhầm VCS với Google Drive: Drive đồng bộ <em>file mới nhất</em>, không có khái niệm commit, không hợp nhất thay đổi song song của hai người.</li><li>Tưởng dự án cá nhân không cần VCS: sự cố \"xóa nhầm đoạn code tuần trước\" không phân biệt team size.</li></ul>\n\n<h2>References</h2>\n\n<ul><li><a href=\"https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control\" target=\"_blank\" rel=\"noopener\">Pro Git 1.1: About Version Control</a></li><li><a href=\"https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F\" target=\"_blank\" rel=\"noopener\">Pro Git 1.3: What is Git?</a></li></ul>\n\n<h2>Học tiếp</h2>\n\n<p><a href=\"index.html?topic=git-what-is-git\">Git là gì &amp; vì sao nên dùng?</a> — mô hình hoạt động bên trong của Git mà mọi lệnh sau này đều quy về đó.</p>"
  },
  "git-what-is-git": {
    "title": "Git là gì & vì sao nên dùng?",
    "summary": "Git khác GitHub ở điểm nào, Git lưu snapshot thế nào, và mô hình ba vùng trạng thái Working Directory - Staging - Repository dùng xuyên suốt khóa học.",
    "status": "published",
    "difficulty": "beginner",
    "depth": "lesson",
    "tags": [
      "git",
      "dvcs",
      "beginner"
    ],
    "domain": "Git & GitHub Beginner",
    "module": "Module 01: Version Control Foundations",
    "prerequisites": [
      "git-what-is-vcs"
    ],
    "related": [
      "git-install-git",
      "git-github-account"
    ],
    "learningOutcomes": [
      "Tách bạch Git (phần mềm trên máy) và GitHub (dịch vụ cloud).",
      "Vẽ được sơ đồ ba vùng trạng thái và đặt add/commit vào đúng chỗ.",
      "Biết Git lưu snapshot chứ không phải diff."
    ],
    "knowledgeGap": "Nhầm Git với GitHub khiến người mới tưởng 'commit là đã lên mạng' — dẫn đến mất code khi máy hỏng.",
    "updatedAt": "2026-08-23",
    "readTime": "10 phút",
    "next": "git-install-git",
    "previous": "git-what-is-vcs",
    "content": "<div class=\"callout callout-note\"><span class=\"callout-icon\">ℹ️</span><div class=\"callout-body\"><strong>Bối cảnh:</strong> Chi vừa hỏi trong nhóm chat: <em>\"Tao commit rồi mà sao web không thấy code mình?\"</em> — câu hỏi kinh điển xuất phát từ việc nhầm Git với GitHub. Bài này dứt điểm nhầm lẫn đó trước khi bạn gõ lệnh thật.</div></div>\n\n<h2>Tách bạch Git và GitHub — một lần cho đủ</h2>\n\n<table style=\"width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;\">\n  <thead><tr style=\"border-bottom:2px solid var(--border);\"><th style=\"text-align:left;padding:10px;\"></th><th style=\"text-align:left;padding:10px;\">Git</th><th style=\"text-align:left;padding:10px;\">GitHub</th></tr></thead>\n  <tbody>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Bản chất</td><td style=\"padding:10px;\">Phần mềm quản lý phiên bản chạy <strong>trên máy bạn</strong></td><td style=\"padding:10px;\">Dịch vụ lưu trữ repo Git <strong>trên cloud</strong></td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Hoạt động</td><td style=\"padding:10px;\">Offline hoàn toàn</td><td style=\"padding:10px;\">Cần internet</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Nhiệm vụ</td><td style=\"padding:10px;\">Commit, branch, lịch sử</td><td style=\"padding:10px;\">Chia sẻ, review (PR), cộng tác</td></tr>\n  </tbody>\n</table>\n\n<p>GitHub chỉ là <em>một</em> lựa chọn remote — còn có GitLab, Bitbucket. Quy tắc nhớ nhanh: <strong>commit xảy ra trên máy; push mới đưa lên mạng</strong>. Chi commit xong chưa push nên web đương nhiên chưa thấy.</p>\n\n<h2>Ba vùng trạng thái — mô hình trung tâm của khóa học</h2>\n\n<p>Mọi lệnh Git cơ bản đều chỉ làm một việc: di chuyển thay đổi giữa ba vùng.</p>\n\n<div class=\"mermaid\">\ngraph LR\n    W[\"Working Directory<br/>file bạn đang sửa\"] -->|\"git add\"| S[\"Staging Area<br/>chọn nội dung cho commit\"]\n    S -->|\"git commit\"| R[\"Repository (.git)<br/>lịch sử vĩnh viễn\"]\n    R -->|\"restore / checkout\"| W\n</div>\n\n<p>Đặt vào tình huống thật: bạn sửa <code>board.js</code> (Working Directory), chạy <code>git add board.js</code> để chốt nội dung (Staging), rồi <code>git commit</code> ghi vào lịch sử (Repository). Ba lệnh quen thuộc nhất của ngày mai chính là ba mũi tên này.</p>\n\n<h2>Snapshot, không phải diff</h2>\n\n<p>Nhiều VCS lưu từng dòng thay đổi so với bản cũ. Git lưu mỗi commit như <strong>ảnh chụp toàn bộ cây thư mục</strong> tại thời điểm đó; file không đổi được tham chiếu lại thay vì lưu trùng. Hệ quả thực tế:</p>\n\n<ul><li>Xem lịch sử, so sánh phiên bản cực nhanh vì mọi thứ nằm local.</li><li>Repo phình to nếu commit file binary thay đổi liên tục (chi tiết ở bài Repository phình to, Module 04).</li></ul>\n\n<h2>Vì sao team chọn Git</h2>\n\n<ul><li><strong>Nhanh &amp; offline</strong>: toàn bộ lịch sử nằm trong <code>.git</code> trên máy.</li><li><strong>Branch gần như miễn phí</strong>: tạo nhánh tức thì để thử nghiệm (Module 02 sẽ làm thật).</li><li><strong>Toàn vẹn dữ liệu</strong>: mỗi commit có hash SHA-1; lịch sử không thể bị sửa ngầm mà không phát hiện.</li><li><strong>Chuẩn ngành</strong>: hầu hết dự án và tài liệu mặc định nói về Git.</li></ul>\n\n<h2>Khi nào Git KHÔNG phù hợp</h2>\n\n<p>File binary thay đổi liên tục (file thiết kế lớn, video, dataset cỡ GB): mỗi lần sửa là thêm một snapshot đầy đủ, repo phình to nhanh. Trường hợp này cần Git LFS hoặc công cụ khác.</p>\n\n<h2>Sai lầm thường gặp</h2>\n\n<ul><li>Nói \"commit lên GitHub\" — commit chỉ nằm trên máy; nói đúng hơn là \"commit cục bộ\" hoặc \"push lên GitHub\".</li><li>Sợ gõ sai lệnh làm hỏng tất cả — các lệnh cơ bản không phá được lịch sử đã commit; phần nguy hiểm (<code>reset --hard</code>, force push) sẽ được cảnh báo rõ ở Module 04.</li></ul>\n\n<h2>References</h2>\n\n<ul><li><a href=\"https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F\" target=\"_blank\" rel=\"noopener\">Pro Git 1.3: What is Git?</a></li><li><a href=\"https://git-scm.com/book/en/v2/Getting-Started-A-Short-History-of-Git\" target=\"_blank\" rel=\"noopener\">Pro Git 1.2: A Short History of Git</a></li></ul>\n\n<h2>Học tiếp</h2>\n\n<p><a href=\"index.html?topic=git-install-git\">Cài đặt Git</a> — biến lý thuyết thành terminal chạy được trên máy bạn.</p>"
  },
  "git-branches-merge": {
    "title": "Branch — Tạo và Merge nhánh",
    "summary": "Tính năng drag-drop đầu tiên trên nhánh riêng: branch là con trỏ gì, quy trình switch - commit - merge với output thật, và hai kiểu merge.",
    "status": "published",
    "difficulty": "beginner",
    "depth": "lesson",
    "tags": [
      "git",
      "branch",
      "merge"
    ],
    "domain": "Git & GitHub Beginner",
    "module": "Module 02: Basic Git Usage",
    "prerequisites": [
      "git-commit"
    ],
    "related": [
      "git-pull-request",
      "git-rebase-merge-squash"
    ],
    "learningOutcomes": [
      "Tạo - chuyển - merge - xóa nhánh bằng switch/branch.",
      "Giải thích branch chỉ là con trỏ ~41 byte trỏ tới commit.",
      "Phân biệt fast-forward và three-way merge qua git log."
    ],
    "knowledgeGap": "Sợ tạo nhánh nên dồn mọi việc vào main — mất khả năng hotfix và review độc lập.",
    "updatedAt": "2026-08-23",
    "readTime": "11 phút",
    "next": "git-create-repository",
    "previous": "git-gitignore",
    "content": "<div class=\"callout callout-note\"><span class=\"callout-icon\">ℹ️</span><div class=\"callout-body\"><strong>Bối cảnh:</strong> An giao task mới: <em>\"Làm tính năng kéo thả task. Làm trên nhánh riêng, đừng đụng main — main phải luôn chạy được để demo.\"</em> Đây là lý do tồn tại của branch.</div></div>\n\n<h2>Vấn đề: làm song song mà không giẫm chân</h2>\n\n<p>Bạn cần 3 ngày cho drag-drop, nhưng bug hiển thị có thể phát sinh bất kỳ lúc nào cần sửa ngay trên code ổn định. Nếu tất cả nằm trên một dòng code: tính năng dở dang lẫn vào hotfix, không tách được bản demo. Branch giải quyết bằng cách cấp cho mỗi dòng công việc <strong>một không gian độc lập</strong>.</p>\n\n<h2>Bản chất: branch chỉ là con trỏ</h2>\n\n<p>Điểm bất ngờ nhất với người mới: tạo branch trong Git <strong>không copy code</strong>. Một branch chỉ là file text ~41 byte chứa hash của commit cuối dòng đó:</p>\n\n<div class=\"mermaid\">\ngraph LR\n    C1[\"a1b2c3d<br/>main & feature<br/>cùng trỏ về đây\"] --> C2[\"e4f5g6h<br/>commit trên feature\"]\n    C2 --> C3[\"i7j8k9l<br/>commit tiếp\"]\n</div>\n\n<p>Khi bạn commit trên <code>feature/drag-drop</code>, con trỏ đó tiến tới commit mới; <code>main</code> đứng yên tại chỗ. Tạo nhánh = tạo 1 con trỏ = tức thì, không tốn dung lượng đáng kể.</p>\n\n<h2>Quy trình đầy đủ với output thật</h2>\n\n<p><strong>1. Tạo và chuyển sang nhánh mới:</strong></p>\n\n<pre><code class=\"language-bash\">git switch -c feature/drag-drop</code></pre>\n\n<p>Output:</p>\n\n<pre><code>Switched to a new branch 'feature/drag-drop'</code></pre>\n\n<p>(Cú pháp cũ: <code>git checkout -b feature/drag-drop</code> — gặp nhiều trong tài liệu cũ, làm cùng việc.)</p>\n\n<p><strong>2. Làm việc bình thường — add, commit vài lần:</strong></p>\n\n<pre><code class=\"language-bash\">git add drag-drop.js index.html\ngit commit -m \"Add draggable task cards\"\ngit add board.js\ngit commit -m \"Persist card order after drop\"</code></pre>\n\n<p><strong>3. Xem bản đồ nhánh:</strong></p>\n\n<pre><code class=\"language-bash\">git log --oneline --graph --all</code></pre>\n\n<p>Output:</p>\n\n<pre><code>* i7j8k9l (HEAD -&gt; feature/drag-drop) Persist card order after drop\n* e4f5g6h Add draggable task cards\n* a1b2c3d (main) Add task list markup and base styles</code></pre>\n\n<p>Thấy rõ: HEAD (bạn đang đứng) ở feature; main đứng yên sau 2 commit mới.</p>\n\n<p><strong>4. Merge về main khi xong:</strong></p>\n\n<pre><code class=\"language-bash\">git switch main\ngit merge feature/drag-drop</code></pre>\n\n<p>Output:</p>\n\n<pre><code>Updating a1b2c3d..i7j8k9l\nFast-forward\n drag-drop.js | 45 ++++++++++++++\n board.js     | 12 +++++-\n 2 files changed, 55 insertions(+), 2 deletions(-)</code></pre>\n\n<p><code>Fast-forward</code> nghĩa là gì? Xem mục dưới.</p>\n\n<p><strong>5. Dọn dẹp nhánh đã hợp nhất:</strong></p>\n\n<pre><code class=\"language-bash\">git branch -d feature/drag-drop</code></pre>\n\n<p>Output:</p>\n\n<pre><code>Deleted branch feature/drag-drop (was i7j8k9l).</code></pre>\n\n<h2>Hai kiểu merge</h2>\n\n<table style=\"width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;\">\n  <thead><tr style=\"border-bottom:2px solid var(--border);\"><th style=\"text-align:left;padding:10px;\">Kiểu</th><th style=\"text-align:left;padding:10px;\">Khi nào</th><th style=\"text-align:left;padding:10px;\">Kết quả</th></tr></thead>\n  <tbody>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\"><strong>Fast-forward</strong></td><td style=\"padding:10px;\">main chưa có commit nào kể từ điểm tách (trường hợp trên)</td><td style=\"padding:10px;\">Chỉ kéo con trỏ main tiến lên — lịch sử thẳng hàng</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\"><strong>Three-way merge</strong></td><td style=\"padding:10px;\">Cả hai nhánh đều có commit riêng</td><td style=\"padding:10px;\">Tạo merge commit 2 cha nối hai dòng lịch sử</td></tr>\n  </tbody>\n</table>\n\n<p>Ba-way sẽ xuất hiện khi Chi cũng commit lên <code>main</code> trong lúc bạn làm drag-drop. Và nếu hai người sửa cùng một dòng — Git dừng lại chờ bạn xử lý: đó là <strong>merge conflict</strong>, bài riêng ở Module 03.</p>\n\n<h2>Sai lầm thường gặp</h2>\n\n<ul><li>Nhét mọi thứ vào <code>main</code> vì \"cho nhanh\" → mất khả năng demo/hotfix độc lập; team thật cấm hành vi này.</li><li>Quên mình đang đứng nhánh nào, commit lạc chỗ → kiểm tra bằng <code>git status</code> (nó luôn báo branch hiện tại).</li><li>Dùng <code>-D</code> (xóa cưỡng bức) thay <code>-d</code> → Git mất cơ hội cảnh báo \"nhánh còn commit chưa merge\".</li></ul>\n\n<h2>References</h2>\n\n<ul><li><a href=\"https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell\" target=\"_blank\" rel=\"noopener\">Pro Git 3.1: What a Branch Is</a></li><li><a href=\"https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging\" target=\"_blank\" rel=\"noopener\">Pro Git 3.2: Basic Branching and Merging</a></li></ul>\n\n<h2>Học tiếp</h2>\n\n<p>Chúc mừng hoàn thành vòng đời cốt lõi! Chuyển sang Module 03: Collaboration — từ hôm nay bạn làm việc trên repo thật của team.</p>"
  },
  "git-add": {
    "title": "git add — Đưa thay đổi vào Staging",
    "summary": "Đưa file đầu tiên qua cửa staging: vì sao Git cần bước trung gian, output git status trước/sau khi add, và quy tắc 'add lại nếu sửa tiếp'.",
    "status": "published",
    "difficulty": "beginner",
    "depth": "lesson",
    "tags": [
      "git",
      "add",
      "staging"
    ],
    "domain": "Git & GitHub Beginner",
    "module": "Module 02: Basic Git Usage",
    "prerequisites": [
      "git-init",
      "git-what-is-git"
    ],
    "related": [
      "git-commit",
      "git-reset-unstage"
    ],
    "learningOutcomes": [
      "Đọc được git status phân biệt untracked / unstaged / staged.",
      "Dùng git add cho một file, nhiều file, và -p từng phần.",
      "Nhớ quy tắc: add chụp nội dung tại thời điểm đó."
    ],
    "knowledgeGap": "Sửa tiếp sau khi add mà không add lại → commit thiếu thay đổi, lỗi lặp lại hàng ngày của người mới.",
    "updatedAt": "2026-08-23",
    "readTime": "8 phút",
    "next": "git-commit",
    "previous": "git-init",
    "content": "<div class=\"callout callout-note\"><span class=\"callout-icon\">ℹ️</span><div class=\"callout-body\"><strong>Bối cảnh:</strong> Bạn vừa sửa <code>index.html</code> (thêm khối task mới) và chỉnh <code>styles.css</code> cho khối đó. Chạy thử <code>git commit</code> — Git từ chối:</div></div>\n\n<pre><code>nothing added to commit but untracked files present</code></pre>\n\n<p>Vì sao? Vì thay đổi chưa đi qua cửa trung gian: <strong>Staging Area</strong>.</p>\n\n<h2>Vì sao cần cửa trung gian?</h2>\n\n<p>Một commit tốt chứa <strong>những thay đổi liên quan với nhau</strong>. Buổi làm việc thật bạn thường sửa lung tung: fix bug A, chỉnh typo, thêm log debug. Staging là bàn chọn món — bạn quyết định <em>đúng những gì</em> đi vào commit sắp tới, phần còn lại chờ lần sau. Đây là lý do lịch sử dự án có thể sạch thay vì một đống \"update lung tung\".</p>\n\n<h2>Bước 1: Xem trạng thái trước khi add</h2>\n\n<pre><code class=\"language-bash\">git status</code></pre>\n\n<p>Output:</p>\n\n<pre><code>On branch main\n\nNo commits yet\n\nUntracked files:\n  (use \"git add &lt;file&gt;...\" to include in what will be committed)\n        index.html\n        styles.css</code></pre>\n\n<p>Màu đỏ (terminal thật) = <strong>Untracked</strong>: Git thấy file nhưng chưa quản lý nội dung.</p>\n\n<h2>Bước 2: Add từng file theo nhóm ý nghĩa</h2>\n\n<p>Bạn muốn tách hai việc thành hai commit: cấu trúc HTML trước, style sau. Add riêng từng file:</p>\n\n<pre><code class=\"language-bash\">git add index.html</code></pre>\n\n<p>Kiểm tra lại:</p>\n\n<pre><code class=\"language-bash\">git status</code></pre>\n\n<p>Output:</p>\n\n<pre><code>On branch main\n\nNo commits yet\n\nChanges to be committed:\n  (use \"git rm --cached &lt;file&gt;...\" to unstage)\n        new file:   index.html\n\nUntracked files:\n        styles.css</code></pre>\n\n<p><code>index.html</code> chuyển sang mục xanh <strong>Changes to be committed</strong> — nó đã ở Staging Area. <code>styles.css</code> vẫn đứng ngoài.</p>\n\n<h2>Bước 3: Các biến thể hay dùng</h2>\n\n<pre><code class=\"language-bash\">git add styles.css      # thêm tiếp file thứ hai\ngit add .               # mọi thay đổi từ thư mục hiện hành xuống\ngit add -p              # chọn tương tác từng đoạn (hunk) trong file</code></pre>\n\n<p><code>-p</code> đáng giá khi một file chứa cả thay đổi muốn commit và cả log debug muốn bỏ lại: Git hỏi <code>Stage this hunk [y,n,q,a,d]?</code> cho từng đoạn, bạn trả lời y/n.</p>\n\n<h2>Quy tắc vàng: add chụp ảnh tại thời điểm đó</h2>\n\n<p>Thí nghiệm 60 giây:</p>\n\n<pre><code class=\"language-bash\">echo \"&lt;!-- draft --&gt;\" &gt;&gt; index.html   # sửa tiếp SAU khi đã add\ngit status</code></pre>\n\n<p>Output sẽ hiện <code>index.html</code> ở <strong>cả hai</strong> mục: bản cũ staged (xanh) + bản sửa mới unstaged (đỏ). Commit lúc này chỉ lấy bản cũ. Phải <code>git add index.html</code> lần nữa để cập nhật.</p>\n\n<div class=\"callout callout-tip\"><span class=\"callout-icon\">💡</span><div class=\"callout-body\">Thói quen an toàn: chạy <code>git status</code> ngay trước mỗi lần commit. Nó là màn hình tổng hợp duy nhất nói cho bạn biết điều gì sẽ vào commit.</div></div>\n\n<h2>Sai lầm thường gặp</h2>\n\n<ul><li>Sửa tiếp rồi quên add lại → commit thiếu code, đồng đội pull về bị lỗi.</li><li>Gõ <code>git add .</code> từ nhầm thư mục (vd home) → kéo cả hệ thống vào staging; luôn kiểm tra <code>pwd</code> trước.</li><li>Nhầm ba cờ: <code>-A</code> toàn repo, <code>.</code> thư mục hiện hành, <code>-u</code> chỉ file đã track (bỏ qua file mới).</li></ul>\n\n<h2>References</h2>\n\n<ul><li><a href=\"https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository\" target=\"_blank\" rel=\"noopener\">Pro Git 2.2: Recording Changes</a></li><li><a href=\"https://git-scm.com/docs/git-add\" target=\"_blank\" rel=\"noopener\">git-add docs</a></li></ul>\n\n<h2>Học tiếp</h2>\n\n<p><a href=\"index.html?topic=git-commit\">git commit — Ghi snapshot vào lịch sử</a>: hai file đã sẵn sàng trên bàn chọn món.</p>"
  },
  "git-commit": {
    "title": "git commit — Ghi snapshot vào lịch sử",
    "summary": "Commit đầu tiên của dự án sandbox: cấu trúc một commit, viết message chuẩn thì mệnh lệnh, đọc git log, và giới hạn an toàn của --amend.",
    "status": "published",
    "difficulty": "beginner",
    "depth": "lesson",
    "tags": [
      "git",
      "commit",
      "history"
    ],
    "domain": "Git & GitHub Beginner",
    "module": "Module 02: Basic Git Usage",
    "prerequisites": [
      "git-add"
    ],
    "related": [
      "git-add",
      "git-reset-unstage"
    ],
    "learningOutcomes": [
      "Tạo commit và đọc được hash, tác giả trong git log.",
      "Viết message theo quy ước thì mệnh lệnh ≤ 50 ký tự.",
      "Biết --amend chỉ dùng cho commit chưa push."
    ],
    "knowledgeGap": "Message vô nghĩa ('update', 'fix') làm mất giá trị tài liệu của lịch sử — sáu tháng sau không ai biết commit đó làm gì.",
    "updatedAt": "2026-08-23",
    "readTime": "9 phút",
    "next": "git-reset-unstage",
    "previous": "git-add",
    "content": "<div class=\"callout callout-note\"><span class=\"callout-icon\">ℹ️</span><div class=\"callout-body\"><strong>Bối cảnh:</strong> <code>index.html</code> và <code>styles.css</code> đã nằm trên bàn staging. Giờ là khoảnh khắc quan trọng nhất ngày 2: <strong>commit đầu tiên</strong> của bạn.</div></div>\n\n<h2>Bước 1: Commit</h2>\n\n<pre><code class=\"language-bash\">git commit -m \"Add task list markup and base styles\"</code></pre>\n\n<p>Output:</p>\n\n<pre><code>[main (root-commit) a1b2c3d] Add task list markup and base styles\n 2 files changed, 24 insertions(+)\n create mode 100644 index.html\n create mode 100644 styles.css</code></pre>\n\n<p>Đọc output:</p>\n\n<ul><li><code>a1b2c3d</code> — hash rút gọn định danh commit này, duy nhất trên toàn hệ thống.</li><li><code>root-commit</code> — commit đầu tiên của branch (không có cha).</li><li>Hai file staged trước đó giờ nằm vĩnh viễn trong lịch sử.</li></ul>\n\n<p>Xem lại lịch sử:</p>\n\n<pre><code class=\"language-bash\">git log</code></pre>\n\n<p>Output:</p>\n\n<pre><code>commit a1b2c3d... (HEAD -&gt; main)\nAuthor: Hazu Nguyen &lt;hazu@congty.vn&gt;\nDate:   Mon Aug 24 09:32:11 2026 +0700\n\n    Add task list markup and base styles</code></pre>\n\n<p>Tên/email ở đây chính là định danh bạn cấu hình ngày đầu — hai bài trước giờ nối vào nhau.</p>\n\n<h2>Commit là gì bên trong?</h2>\n\n<p>Mỗi commit = <strong>snapshot toàn bộ dự án</strong> + metadata (tác giả, thời gian, message) + con trỏ trỏ về commit cha. Chuỗi các commit tạo thành lịch sử đi ngược được:</p>\n\n<div class=\"mermaid\">\ngraph LR\n    C1[\"a1b2c3d<br/>Add task list\"] --> C2[\"e4f5g6h<br/>Add drag-drop script\"]\n    C2 --> C3[\"i7j8k9l<br/>Fix empty state\"]\n</div>\n\n<p>Snapshot gần như bất biến — nền tảng cho mọi thao tác cứu hộ và hoàn tác về sau.</p>\n\n<h2>Nghệ thuật commit message</h2>\n\n<p>Message là <strong>tài liệu duy nhất</strong> kể lại ý đồ thay đổi khi ai đó đọc log sáu tháng sau.</p>\n\n<p>Quy ước team phổ biến:</p>\n\n<ul><li>Dòng đầu ≤ 50 ký tự, thì mệnh lệnh như một chỉ thị: <code>Add</code>, <code>Fix</code>, <code>Remove</code>.</li><li>Không chấp nhận <code>\"update\"</code>, <code>\"fix bug\"</code>, <code>\"asdf\"</code> — vô dụng khi truy vết.</li><li>Cần giải thích thêm? Cách một dòng trống rồi viết phần thân vì sao.</li></ul>\n\n<p>Ví dụ thật từ chính dự án sandbox:</p>\n\n<pre><code class=\"language-bash\">git commit -m \"Fix tasks not saving after page reload\n\nlocalStorage key was read before init; move loadTasks()\ncall inside DOMContentLoaded handler.\"</code></pre>\n\n<div class=\"callout callout-tip\"><span class=\"callout-icon\">💡</span><div class=\"callout-body\">Commit nhỏ theo chủ đề (<code>Fix X</code>, <code>Add Y</code>) thay vì một commit khổng lồ cuối tuần. Commit nhỏ giúp review nhanh hơn và revert từng phần được.</div></div>\n\n<h2>Hai biến thể cần biết ngay</h2>\n\n<p><strong>Commit luôn không qua add riêng lẻ</strong> — tự stage mọi file <em>đã track</em>:</p>\n\n<pre><code class=\"language-bash\">git commit -am \"Update empty state text\"</code></pre>\n\n<p>Lưu ý <code>-a</code> bỏ qua file mới (untracked) — vẫn phải add tay.</p>\n\n<p><strong>Sửa commit vừa chớp mắt phát hiện sai</strong> — thiếu file hoặc typo trong message:</p>\n\n<pre><code class=\"language-bash\">git add forgotten.js\ngit commit --amend</code></pre>\n\n<p><code>--amend</code> thay thế commit cũ bằng bản mới (hash đổi). <strong>Chỉ an toàn khi chưa push</strong> — sau khi push, sửa lịch sử sẽ gây rối cho người khác (lý do chi tiết ở Module 04).</p>\n\n<h2>Sai lầm thường gặp</h2>\n\n<ul><li>Nhốt cả tuần việc trong một commit <code>\"done week 1\"</code> — mất khả năng quay lui có chọn lọc.</li><li>Amend commit đã lên remote → đồng đội pull về gặp lịch sử lệch.</li><li>Message mô tả <em>cái gì</em> nhưng quên <em>vì sao</em> — phần thân message là chỗ nói vì sao.</li></ul>\n\n<h2>References</h2>\n\n<ul><li><a href=\"https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository\" target=\"_blank\" rel=\"noopener\">Pro Git 2.2: Recording Changes</a></li><li><a href=\"https://www.conventionalcommits.org/en/v1.0.0/\" target=\"_blank\" rel=\"noopener\">Conventional Commits</a> — quy ước message phổ biến</li></ul>\n\n<h2>Học tiếp</h2>\n\n<p><a href=\"index.html?topic=git-reset-unstage\">git reset — Rút thay đổi khỏi Staging</a>: lỡ add nhầm thì xử lý thế nào.</p>"
  },
  "git-init": {
    "title": "git init — Khởi tạo Repository",
    "summary": "Tạo repo luyện tập task-board-sandbox từ thư mục trắng: git init làm gì, thư mục .git chứa gì, và trạng thái untracked ban đầu.",
    "status": "published",
    "difficulty": "beginner",
    "depth": "lesson",
    "tags": [
      "git",
      "init",
      "repository"
    ],
    "domain": "Git & GitHub Beginner",
    "module": "Module 02: Basic Git Usage",
    "prerequisites": [
      "git-install-git",
      "git-what-is-git"
    ],
    "related": [
      "git-add",
      "git-create-repository"
    ],
    "learningOutcomes": [
      "Chạy git init và xác nhận bằng git status.",
      "Hiểu .git = toàn bộ lịch sử; xóa nó là mất lịch sử chứ không mất code.",
      "Phân biệt init (tạo mới) với clone (tải có sẵn)."
    ],
    "knowledgeGap": "Tưởng sau init là code an toàn — chưa commit thì chưa có gì nằm trong lịch sử.",
    "updatedAt": "2026-08-23",
    "readTime": "7 phút",
    "next": "git-add",
    "previous": "git-github-account",
    "content": "<div class=\"callout callout-note\"><span class=\"callout-icon\">ℹ️</span><div class=\"callout-body\"><strong>Bối cảnh:</strong> Ngày 2. Bạn tạo thư mục <code>task-board-sandbox</code> với ba file ban đầu do soạn sẵn, rồi... không biết làm gì tiếp. An nói: <em>\"Nó chưa phải Git repository đâu. Chạy <code>git init</code> đi.\"</em></div></div>\n\n<h2>Bước 1: Kiểm tra trạng thái hiện tại</h2>\n\n<pre><code class=\"language-bash\">mkdir task-board-sandbox &amp;&amp; cd task-board-sandbox\n# ... tạo sẵn index.html, styles.css ...\ngit status</code></pre>\n\n<p>Output:</p>\n\n<pre><code>fatal: not a git repository (or any of the parent directories): .git</code></pre>\n\n<p>Git thẳng thắn báo: thư mục này chưa được quản lý. Giờ mới đến lượt <code>init</code>.</p>\n\n<h2>Bước 2: git init</h2>\n\n<pre><code class=\"language-bash\">git init</code></pre>\n\n<p>Output:</p>\n\n<pre><code>Initialized empty Git repository in /Users/you/projects/task-board-sandbox/.git/</code></pre>\n\n<h2>git init thực sự làm gì?</h2>\n\n<p>Chỉ một việc: <strong>tạo thư mục ẩn <code>.git</code></strong> bên trong dự án. Toàn bộ \"ma thuật\" của Git nằm ở đó:</p>\n\n<table style=\"width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;\">\n  <thead><tr style=\"border-bottom:2px solid var(--border);\"><th style=\"text-align:left;padding:10px;\">Trong <code>.git</code></th><th style=\"text-align:left;padding:10px;\">Chứa gì</th></tr></thead>\n  <tbody>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">objects</td><td style=\"padding:10px;\">Snapshot (nội dung mọi commit)</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">refs</td><td style=\"padding:10px;\">Con trỏ branch, tag</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">HEAD</td><td style=\"padding:10px;\">Vị trí bạn đang đứng</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">index</td><td style=\"padding:10px;\">Staging area</td></tr>\n  </tbody>\n</table>\n\n<p>Ngược lại, các file code (<code>index.html</code>, <code>styles.css</code>...) vẫn nguyên như cũ. Hai hệ quả quan trọng:</p>\n\n<ul><li><strong>Xóa <code>.git</code></strong> = xóa toàn bộ lịch sử, nhưng file làm việc vẫn còn.</li><li><strong>Chưa commit</strong> = lịch sử chưa có gì; init chỉ dựng sân khấu, chưa lưu vở nào.</li></ul>\n\n<h2>Bước 3: Xem trạng thái sau init</h2>\n\n<pre><code class=\"language-bash\">git status</code></pre>\n\n<p>Output:</p>\n\n<pre><code>On branch main\n\nNo commits yet\n\nUntracked files:\n  (use \"git add &lt;file&gt;...\" to include in what will be committed)\n        index.html\n        styles.css\n\nnothing added to commit but untracked files present (use \"git add\" to track)</code></pre>\n\n<p>Đọc output như tin nhắn của Git: mọi file đang <strong>Untracked</strong> (Git thấy nhưng chưa theo dõi), và nó gợi ý luôn bước tiếp theo — <code>git add</code>. Output của bạn sẽ gặp lại liên tục trong cả khóa học.</p>\n\n<h2>init hay clone?</h2>\n\n<table style=\"width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;\">\n  <thead><tr style=\"border-bottom:2px solid var(--border);\"><th style=\"text-align:left;padding:10px;\">Lệnh</th><th style=\"text-align:left;padding:10px;\">Dùng khi</th></tr></thead>\n  <tbody>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\"><code>git init</code></td><td style=\"padding:10px;\">Bắt đầu từ thư mục trống/code chưa có Git (trường hợp này)</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\"><code>git clone &lt;url&gt;</code></td><td style=\"padding:10px;\">Tải repo có sẵn kèm lịch sử (sẽ dùng ở Module 03 với repo team)</td></tr>\n  </tbody>\n</table>\n\n<p>Clone tự nối remote sẵn; init thì chưa — đó là việc của <code>git remote add</code> ở Module 03.</p>\n\n<h2>Sai lầm thường gặp</h2>\n\n<ul><li>Chạy <code>git init</code> ở thư mục sai cấp (vd home directory) → Git quét cả máy. Luôn <code>cd</code> vào đúng folder dự án trước.</li><li>Tưởng init xong là an toàn → tắt máy mất code vì chưa commit. Init ≠ lưu.</li></ul>\n\n<h2>References</h2>\n\n<ul><li><a href=\"https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository\" target=\"_blank\" rel=\"noopener\">Pro Git 2.1: Getting a Git Repository</a></li><li><a href=\"https://git-scm.com/docs/git-init\" target=\"_blank\" rel=\"noopener\">git-init docs</a></li></ul>\n\n<h2>Học tiếp</h2>\n\n<p><a href=\"index.html?topic=git-add\">git add — Đưa thay đổi vào Staging</a>: đưa <code>index.html</code> qua cửa đầu tiên của ba vùng.</p>"
  },
  "git-reset-unstage": {
    "title": "git reset — Rút thay đổi khỏi Staging",
    "summary": "Lỡ add nhầm file ghi chú cá nhân: unstage an toàn bằng git restore --staged, bảng phân biệt soft/mixed/hard và vùng nguy hiểm của --hard.",
    "status": "published",
    "difficulty": "beginner",
    "depth": "lesson",
    "tags": [
      "git",
      "reset",
      "restore",
      "staging"
    ],
    "domain": "Git & GitHub Beginner",
    "module": "Module 02: Basic Git Usage",
    "prerequisites": [
      "git-commit"
    ],
    "related": [
      "git-add",
      "git-revert-hard-reset"
    ],
    "learningOutcomes": [
      "Unstage file bằng git restore --staged không mất code.",
      "Tra bảng soft/mixed/hard để chọn đúng chế độ.",
      "Gọi tên tình huống duy nhất khiến --hard nguy hiểm."
    ],
    "knowledgeGap": "Nhầm restore --staged (chỉ unstage) với restore thường (xóa luôn sửa đổi trong thư mục).",
    "updatedAt": "2026-08-23",
    "readTime": "9 phút",
    "next": "git-gitignore",
    "previous": "git-commit",
    "content": "<div class=\"callout callout-note\"><span class=\"callout-icon\">ℹ️</span><div class=\"callout-body\"><strong>Bối cảnh:</strong> Bạn vừa <code>git add .</code> cho gọn — rồi nhớ ra folder có <code>notes.txt</code> chứa ghi chú lương thưởng cá nhân. Tuyệt đối không được vào commit. Cần rút nó ra <strong>mà không mất nội dung</strong>.</div></div>\n\n<h2>Bước 1: Xác nhận tình trạng</h2>\n\n<pre><code class=\"language-bash\">git status</code></pre>\n\n<p>Output (rút gọn):</p>\n\n<pre><code>Changes to be committed:\n        new file:   index.html\n        new file:   notes.txt      &lt;- kẻ xâm nhập</code></pre>\n\n<h2>Bước 2: Unstage bằng git restore --staged</h2>\n\n<pre><code class=\"language-bash\">git restore --staged notes.txt</code></pre>\n\n<p>Output: im lặng (thành công). Kiểm tra lại:</p>\n\n<pre><code class=\"language-bash\">git status</code></pre>\n\n<pre><code>Changes to be committed:\n        new file:   index.html\n\nUntracked files:\n        notes.txt</code></pre>\n\n<p><code>notes.txt</code> rời staging, trở về untracked — <strong>nội dung file vẫn nguyên trên đĩa</strong>. Commit tiếp theo sẽ không còn dấu vết của nó.</p>\n\n<p>Cú pháp cũ tương đương vẫn gặp trong tài liệu cũ: <code>git reset HEAD notes.txt</code>. Hãy dùng <code>restore --staged</code> — tên lệnh mô tả đúng hành động.</p>\n\n<div class=\"callout callout-warn\"><span class=\"callout-icon\">⚠️</span><div class=\"callout-body\">Phân biệt hai anh em dễ nhầm nhất với người mới: | Lệnh | Tác động | |---|---| | <code>git restore --staged &lt;file&gt;</code> | Chỉ kéo ra khỏi staging, giữ sửa đổi | | <code>git restore &lt;file&gt;</code> | <strong>Xóa luôn sửa đổi</strong>, trả file về commit cuối |</div></div>\n\n<h2>Bước 3: Hiểu git reset đầy đủ — ba chế độ</h2>\n\n<p><code>git restore --staged</code> thực chất là bản chuyên biệt hóa của <code>git reset</code>. Khi cần gỡ cả <strong>commit</strong> (không chỉ file), reset hiện đủ ba mức:</p>\n\n<p>Giả sử đang ở commit C3, muốn quay về C2:</p>\n\n<table style=\"width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;\">\n  <thead><tr style=\"border-bottom:2px solid var(--border);\"><th style=\"text-align:left;padding:10px;\">Chế độ</th><th style=\"text-align:left;padding:10px;\">HEAD</th><th style=\"text-align:left;padding:10px;\">Staging</th><th style=\"text-align:left;padding:10px;\">Working Directory</th></tr></thead>\n  <tbody>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\"><code>--soft</code></td><td style=\"padding:10px;\">về C2</td><td style=\"padding:10px;\">giữ C3</td><td style=\"padding:10px;\">giữ C3</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\"><code>--mixed</code> (mặc định)</td><td style=\"padding:10px;\">về C2</td><td style=\"padding:10px;\">xóa theo C2</td><td style=\"padding:10px;\">giữ C3</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\"><code>--hard</code></td><td style=\"padding:10px;\">về C2</td><td style=\"padding:10px;\">xóa theo C2</td><td style=\"padding:10px;\"><strong>xóa theo C2</strong></td></tr>\n  </tbody>\n</table>\n\n<pre><code class=\"language-bash\">git reset --soft HEAD~1    # gỡ commit cuối; code vẫn staged, sửa message rồi commit lại\ngit reset --mixed HEAD~1   # gỡ commit + unstage; code còn nguyên trong thư mục\ngit reset --hard HEAD~1    # gỡ commit VÀ xóa sạch thay đổi — đọc cảnh báo dưới trước!</code></pre>\n\n<p><code>HEAD~1</code> nghĩa là \"commit ngay trước commit hiện tại\".</p>\n\n<div class=\"callout callout-warn\"><span class=\"callout-icon\">⚠️</span><div class=\"callout-body\"><code>--hard</code> là chế độ duy nhất phá hủy công việc chưa commit. Trước khi chạy bất kỳ lệnh nào chứa <code>--hard</code>: mọi thứ quý giá phải đã commit hoặc stash. Và nếu lỡ tay rồi — đừng hoảng, Module 04 có bài riêng cứu hộ bằng reflog.</div></div>\n\n<h2>Khi nào dùng gì — cheat sheet</h2>\n\n<table style=\"width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;\">\n  <thead><tr style=\"border-bottom:2px solid var(--border);\"><th style=\"text-align:left;padding:10px;\">Tình huống</th><th style=\"text-align:left;padding:10px;\">Lệnh</th></tr></thead>\n  <tbody>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Add nhầm file, muốn chọn lại staging</td><td style=\"padding:10px;\"><code>git restore --staged &lt;file&gt;</code></td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Commit cuối viết tách chưa đẹp, muốn làm lại</td><td style=\"padding:10px;\"><code>reset --soft HEAD~1</code></td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Muốn bỏ hẳn thử nghiệm sai cục bộ</td><td style=\"padding:10px;\"><code>reset --hard</code> sau khi cân nhắc</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Viết lại lịch sử đã push lên chung</td><td style=\"padding:10px;\">KHÔNG dùng reset — xem bài Revert ở Module 04</td></tr>\n  </tbody>\n</table>\n\n<h2>Sai lầm thường gặp</h2>\n\n<ul><li>Chạy nhầm <code>git restore &lt;file&gt;</code> (thiếu <code>--staged</code>) → mất trắng công sửa trong ngày.</li><li><code>reset --hard</code> trên branch đã push rồi force push đè → lịch sử team vỡ.</li><li>Sợ reset vì tưởng nó xóa code — mặc định <code>--mixed</code> không mất một dòng nào.</li></ul>\n\n<h2>References</h2>\n\n<ul><li><a href=\"https://git-scm.com/book/en/v2/Git-Basics-Undoing-Things\" target=\"_blank\" rel=\"noopener\">Pro Git 2.4: Undoing Things</a></li><li><a href=\"https://git-scm.com/docs/git-restore\" target=\"_blank\" rel=\"noopener\">git-restore docs</a></li></ul>\n\n<h2>Học tiếp</h2>\n\n<p><a href=\"index.html?topic=git-gitignore\">.gitignore — Loại trừ file khỏi Git</a>: cách chặn vĩnh viễn để <code>notes.txt</code>, <code>.env</code> không bao giờ lọt vào staging.</p>"
  },
  "git-gitignore": {
    "title": ".gitignore — Loại trừ file khỏi Git",
    "summary": "Viết .gitignore cho dự án sandbox: cú pháp pattern, bẫy kinh điển file đã track, và xử lý khẩn cấp khi secret lỡ vào commit.",
    "status": "published",
    "difficulty": "beginner",
    "depth": "lesson",
    "tags": [
      "git",
      "gitignore"
    ],
    "domain": "Git & GitHub Beginner",
    "module": "Module 02: Basic Git Usage",
    "prerequisites": [
      "git-add"
    ],
    "related": [
      "git-init",
      "git-commit"
    ],
    "learningOutcomes": [
      "Viết .gitignore đúng cho một dự án Node.",
      "Giải thích vì sao ignore không tác động lên file đã track, và cách gỡ bằng rm --cached.",
      "Biết quy tắc sống còn: secret đã push coi như đã lộ."
    ],
    "knowledgeGap": "Thêm .gitignore sau khi đã commit .env tưởng là an toàn — lịch sử cũ vẫn giữ secret.",
    "updatedAt": "2026-08-23",
    "readTime": "9 phút",
    "next": "git-branches-merge",
    "previous": "git-reset-unstage",
    "content": "<div class=\"callout callout-note\"><span class=\"callout-icon\">ℹ️</span><div class=\"callout-body\"><strong>Bối cảnh:</strong> Dự án sandbox bắt đầu dùng npm → folder <code>node_modules/</code> nặng 40MB xuất hiện; bạn cũng tạo <code>.env</code> chứa <code>API_KEY=...</code> của dịch vụ drag-drop. An nhắn gấp: <em>\"Đừng commit hai thứ đó. Viết .gitignore ngay.\"</em></div></div>\n\n<h2>Bước 1: Tạo .gitignore</h2>\n\n<p>Tạo file <code>.gitignore</code> ở thư mục gốc:</p>\n\n<pre><code># Dependencies — cài lại được bằng npm install\nnode_modules/\n\n# Build output\ndist/\n\n# Secrets &amp; môi trường\n.env\n.env.local\n\n# Hệ điều hành / IDE\n.DS_Store\n.idea/</code></pre>\n\n<p>Kiểm tra hiệu lực:</p>\n\n<pre><code class=\"language-bash\">git status</code></pre>\n\n<p>Output: <code>node_modules/</code>, <code>.env</code>, <code>.DS_Store</code> biến mất khỏi danh sách Untracked — Git giờ \"mù\" với chúng đúng như yêu cầu.</p>\n\n<h2>Bước 2: Đọc cú pháp pattern</h2>\n\n<table style=\"width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;\">\n  <thead><tr style=\"border-bottom:2px solid var(--border);\"><th style=\"text-align:left;padding:10px;\">Pattern</th><th style=\"text-align:left;padding:10px;\">Ý nghĩa</th></tr></thead>\n  <tbody>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\"><code>node_modules/</code></td><td style=\"padding:10px;\">Bỏ cả thư mục (dấu <code>/</code> cuối)</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\"><code>*.log</code></td><td style=\"padding:10px;\">Mọi file đuôi .log ở mọi cấp</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\"><code>debug?.txt</code></td><td style=\"padding:10px;\"><code>?</code> thay 1 ký tự bất kỳ</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\"><code>build/**/temp</code></td><td style=\"padding:10px;\">temp ở mọi cấp con của build</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\"><code>!.env.example</code></td><td style=\"padding:10px;\">Phủ định — vẫn track file này</td></tr>\n  </tbody>\n</table>\n\n<p>Git đọc từ trên xuống, dòng sau ghi đè dòng trước. Cặp <code>.env</code> + <code>!.env.example</code> là combo chuẩn: chặn secret thật nhưng vẫn chia sẻ <em>khung</em> cấu hình cho đồng đội.</p>\n\n<h2>Bước 3: Hiểu bẫy kinh điển — file đã track thì ignore vô dụng</h2>\n\n<p>Thí nghiệm quan trọng nhất bài học:</p>\n\n<pre><code class=\"language-bash\">echo \"temp\" &gt; cache.log\ngit add cache.log &amp;&amp; git commit -m \"Add cache log\"   # lỡ commit\necho \"*.log\" &gt;&gt; .gitignore                            # giờ mới ignore\ngit status</code></pre>\n\n<p>Output vẫn hiện <code>modified: cache.log</code> khi bạn sửa nó! Vì: <strong>.gitignore chỉ áp dụng cho file chưa track</strong>. File đã vào lịch sử thì ignore chỉ là lời hứa suông.</p>\n\n<p>Xử lý đúng khi phát hiện commit nhầm:</p>\n\n<pre><code class=\"language-bash\">git rm --cached cache.log     # gỡ khỏi index, GIỮ file trên đĩa\ngit add .gitignore\ngit commit -m \"Stop tracking cache.log and ignore logs\"</code></pre>\n\n<h2>Secret đã push lên GitHub thì sao?</h2>\n\n<p>Quy trình xử lý khẩn cấp đủ sâu để có bài riêng — <a href=\"index.html?topic=git-security-secrets\">Lộ secret: xử lý khẩn cấp</a>. Ghi nhớ nguyên tắc trước: <strong>xóa file ở commit mới KHÔNG xóa nó khỏi lịch sử cũ</strong>; key từng lộ phải rotate (đổi) ngay lập tức.</p>\n\n<h2>Bước 4: Không tự viết từ đầu</h2>\n\n<p>GitHub duy trì bộ mẫu theo ngôn ngữ tại <a href=\"https://github.com/github/gitignore\" target=\"_blank\" rel=\"noopener\">github.com/github/gitignore</a> (Node.gitignore, Python.gitignore...). Khi tạo repo trên web cũng có ô chọn sẵn. Copy mẫu về rồi thêm phần riêng của dự án — đừng tự chế.</p>\n\n<h2>Sai lầm thường gặp</h2>\n\n<ul><li>Thêm ignore mà quên <code>rm --cached</code> với file đang track → tưởng không ăn.</li><li>Commit <code>.env</code> \"tạm thời để đồng đội chạy được\" → dùng <code>.env.example</code> chứa tên biến, bỏ giá trị thật.</li><li>Quên <code>/</code> cuối với thư mục → pattern thành tên file trùng hợp ngẫu nhiên nào đó.</li></ul>\n\n<h2>References</h2>\n\n<ul><li><a href=\"https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository#_ignoring\" target=\"_blank\" rel=\"noopener\">Pro Git 2.2: Ignoring Files</a></li><li><a href=\"https://git-scm.com/docs/gitignore\" target=\"_blank\" rel=\"noopener\">gitignore docs + template chính thức</a></li></ul>\n\n<h2>Học tiếp</h2>\n\n<p><a href=\"index.html?topic=git-branches-merge\">Branch — Tạo và Merge nhánh</a>: nhiệm vụ mới từ An — làm tính năng drag-drop mà không được đụng code chính.</p>"
  },
  "git-create-repository": {
    "title": "Tạo Repository trên GitHub",
    "summary": "Nhìn lại việc An đã làm khi dựng repo task-board: các lựa chọn khởi tạo, public vs private, và ba cách bắt đầu một dự án.",
    "status": "published",
    "difficulty": "beginner",
    "depth": "lesson",
    "tags": [
      "github",
      "repository"
    ],
    "domain": "Git & GitHub Beginner",
    "module": "Module 03: Collaboration với GitHub",
    "prerequisites": [
      "git-github-account",
      "git-init"
    ],
    "related": [
      "git-remote-push",
      "git-fork-clone"
    ],
    "learningOutcomes": [
      "Tạo repository với README/.gitignore/license phù hợp ngay từ đầu.",
      "Chọn đúng public/private và hiểu giới hạn bảo mật của private.",
      "Nối repo local có sẵn lên GitHub không sinh lịch sử song song."
    ],
    "knowledgeGap": "Để GitHub tự sinh commit rồi init local riêng → hai lịch sử không liên quan, push đầu tiên bị từ chối.",
    "updatedAt": "2026-08-23",
    "readTime": "7 phút",
    "next": "git-remote-push",
    "previous": "git-branches-merge",
    "content": "<div class=\"callout callout-note\"><span class=\"callout-icon\">ℹ️</span><div class=\"callout-body\"><strong>Bối cảnh:</strong> Quay ngược thời gian một chút: hôm qua, trước khi mời bạn, An đã bấm \"Create repository\" cho <code>task-board</code>. Hiểu những gì An đã chọn giúp bạn tự dựng repo đúng chuẩn khi đến lượt mình dẫn dắt dự án.</div></div>\n\n<h2>Repository trên GitHub chứa gì?</h2>\n\n<p>Không chỉ code — đó là <strong>trụ sở dự án</strong>:</p>\n\n<table style=\"width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;\">\n  <thead><tr style=\"border-bottom:2px solid var(--border);\"><th style=\"text-align:left;padding:10px;\">Thành phần</th><th style=\"text-align:left;padding:10px;\">Vai trò</th></tr></thead>\n  <tbody>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Code + lịch sử Git</td><td style=\"padding:10px;\">Bản sao remote đồng bộ với máy mọi người</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">README</td><td style=\"padding:10px;\">Trang chủ hiển thị mặc định</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Issues</td><td style=\"padding:10px;\">Danh sách bug/task (An dùng để giao việc)</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Pull Requests</td><td style=\"padding:10px;\">Hàng đợi review (bạn sẽ dùng liên tục ở bài sau)</td></tr>\n  </tbody>\n</table>\n\n<p>Phân biệt vai trò: <strong>local repo</strong> trên máy bạn là nơi commit diễn ra; <strong>remote repo</strong> trên GitHub là nơi đồng bộ + cộng tác. Hai bên nối nhau qua <code>git remote</code> — bài kế tiếp.</p>\n\n<h2>Các lựa chọn khi Create repository</h2>\n\n<p>Những gì An đã tick và lý do:</p>\n\n<ul><li><strong>Name</strong>: <code>task-board</code> — ngắn, chữ thường, gạch nối. Đổi tên sau gây vỡ link nên phải nghĩ kỹ từ đầu.</li><li><strong>Visibility</strong>: <code>Private</code> trong giai đoạn đầu (code công ty), chuyển Public sau nếu mở nguồn.</li><li><strong>Add a README</strong>: có — trang giới thiệu ngay lập tức.</li><li><strong>Add .gitignore</strong>: chọn template Node — chặn sẵn <code>node_modules/</code>.</li><li><strong>Choose a license</strong>: bỏ trống lúc đầu (repo private chưa cần); sẽ thêm khi mở nguồn (bài OSS Licenses).</li><li><strong>KHÔNG</strong> thêm commit nào khác ngoài README — lý do ở phần ba kịch bản dưới đây.</li></ul>\n\n<p>Sau khi tạo xong, An vào Settings → Collaborators → mời username của bạn. Từ lúc này bạn có quyền clone và push (chi tiết quyền xem bài Fork vs Clone).</p>\n\n<h2>Public hay Private?</h2>\n\n<table style=\"width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;\">\n  <thead><tr style=\"border-bottom:2px solid var(--border);\"><th style=\"text-align:left;padding:10px;\">Tiêu chí</th><th style=\"text-align:left;padding:10px;\">Public</th><th style=\"text-align:left;padding:10px;\">Private</th></tr></thead>\n  <tbody>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Ai thấy</td><td style=\"padding:10px;\">Mọi người</td><td style=\"padding:10px;\">Bạn + collaborator</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Phù hợp</td><td style=\"padding:10px;\">Open source, portfolio</td><td style=\"padding:10px;\">Code công ty, dự án chưa chín</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Nhận đóng góp cộng đồng</td><td style=\"padding:10px;\">Có</td><td style=\"padding:10px;\">Không</td></tr>\n  </tbody>\n</table>\n\n<div class=\"callout callout-warn\"><span class=\"callout-icon\">⚠️</span><div class=\"callout-body\">Private <strong>không phải</strong> cơ chế bảo mật cho secret. <code>.env</code> lỡ push vào repo private vẫn coi như lộ với bất kỳ ai có access (và cả hệ thống CI). Quy tắc: secret không bao giờ được commit, bất kể visibility.</div></div>\n\n<h2>Ba kịch bản bắt đầu dự án</h2>\n\n<p><strong>1. Repo đã có trên GitHub (trường hợp của bạn với <code>task-board</code>):</strong></p>\n\n<pre><code class=\"language-bash\">git clone git@github.com:an-dev/task-board.git</code></pre>\n\n<p><strong>2. Có code local sẵn, nối lên GitHub:</strong></p>\n\n<pre><code class=\"language-bash\">cd my-project\ngit init\ngit remote add origin git@github.com:you/my-project.git\ngit push -u origin main</code></pre>\n\n<p><strong>3. Tạo repo trên web nhưng local cũng đã có lịch sử riêng:</strong> đừng để GitHub sinh README — hai dòng lịch sử không liên quan nhau sẽ khiến lần push đầu tiên bị từ chối (non-fast-forward). Một phía phải trống.</p>\n\n<h2>Sai lầm thường gặp</h2>\n\n<ul><li>Đặt tên kiểu <code>test123</code> rồi đổi sau → vỡ mọi link tài liệu đang trỏ tới.</li><li>Tick README khi local đã có commit → conflict ngay lần push đầu.</li><li>Coi private là chỗ an toàn cho secret → đọc lại Warning phía trên.</li></ul>\n\n<h2>References</h2>\n\n<ul><li><a href=\"https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository\" target=\"_blank\" rel=\"noopener\">GitHub Docs: Creating a repository</a></li><li><a href=\"https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility\" target=\"_blank\" rel=\"noopener\">GitHub Docs: Repository visibility</a></li></ul>\n\n<h2>Học tiếp</h2>\n\n<p><a href=\"index.html?topic=git-remote-push\">Remote &amp; Push</a> — nối sandbox của bạn lên GitHub, học cơ chế đồng bộ hai chiều trước khi chạm repo team.</p>"
  },
  "git-fork-clone": {
    "title": "Clone & Fork — Hai đường có code về máy",
    "summary": "Hôm nay chính thức vào repo team: clone task-board về máy. Đồng thời hiểu fork là gì để chuẩn bị cho việc đóng góp mã nguồn mở sau này.",
    "status": "published",
    "difficulty": "beginner",
    "depth": "lesson",
    "tags": [
      "git",
      "fork",
      "clone",
      "github"
    ],
    "domain": "Git & GitHub Beginner",
    "module": "Module 03: Collaboration với GitHub",
    "prerequisites": [
      "git-remote-push"
    ],
    "related": [
      "git-pull-request"
    ],
    "learningOutcomes": [
      "Clone repo team bằng URL SSH và xác nhận remote origin.",
      "Giải thích clone (bản sao làm việc) khác fork (bản sao quyền sở hữu).",
      "Thiết lập upstream để đồng bộ repo gốc khi đóng góp OSS."
    ],
    "knowledgeGap": "Clone repo người khác rồi cố push — không có quyền ghi vì thiếu bước fork.",
    "updatedAt": "2026-08-23",
    "readTime": "9 phút",
    "next": "git-pull-request",
    "previous": "git-remote-push",
    "content": "<div class=\"callout callout-note\"><span class=\"callout-icon\">ℹ️</span><div class=\"callout-body\"><strong>Bối cảnh:</strong> An vừa mời bạn vào repo <code>an-dev/task-board</code>. Lệnh đầu tiên của buổi sáng:</div></div>\n\n<pre><code class=\"language-bash\">git clone git@github.com:an-dev/task-board.git</code></pre>\n\n<p>Output:</p>\n\n<pre><code>Cloning into 'task-board'...\nremote: Enumerating objects: 248, done.\nReceiving objects: 100% (248/248), done.\nResolving deltas: 100% (112/112), done.</code></pre>\n\n<h2>Clone đã tự làm giúp bạn những gì?</h2>\n\n<p>Kiểm tra bên trong thư mục mới tạo:</p>\n\n<pre><code class=\"language-bash\">cd task-board\ngit remote -v        # origin trỏ sẵn về repo team\ngit branch -a        # thấy main + các nhánh remote origin/*\ngit log --oneline    # toàn bộ lịch sử từ commit đầu tiên của An</code></pre>\n\n<p>Clone = <code>init</code> + nối remote <code>origin</code> + tải <strong>toàn bộ lịch sử, mọi branch</strong> + checkout branch mặc định. Bạn đang đứng trên bản sao đầy đủ của dự án — offline vẫn xem được mọi thứ.</p>\n\n<p>Quyền hạn của bạn trong repo team: <strong>clone, pull — được; push lên <code>main</code> — bị chặn</strong> (An cấu hình protection). Push chỉ cho phép trên nhánh tính năng riêng. Đó là quy trình bài sau.</p>\n\n<h2>Fork là gì — và tại sao cần cho OSS</h2>\n\n<p>Với repo bạn <strong>không có quyền ghi</strong> (dự án mã nguồn mở của người khác), clone chỉ xem được. Muốn sửa và gửi lại, cần một bản sao thuộc sở hữu mình: <strong>Fork</strong> — thao tác bấm nút trên GitHub tạo <code>you/repo</code> độc lập với bản gốc (<code>upstream</code>).</p>\n\n<p>Quy trình chuẩn đóng góp OSS:</p>\n\n<div class=\"mermaid\">\ngraph LR\n    U[\"Upstream<br/>owner/repo\"] -->|\"1. Fork (trên web)\"| Y[\"Origin<br/>you/repo\"]\n    Y -->|\"2. Clone\"| L[\"Local\"]\n    L -->|\"3. branch + commit + push\"| Y\n    Y -->|\"4. Pull Request\"| U\n</div>\n\n<p>Bốn bước, nhớ theo câu: <strong>fork trước — clone sau</strong>.</p>\n\n<p>Đồng bộ fork với repo gốc (fork không tự cập nhật):</p>\n\n<pre><code class=\"language-bash\">git remote add upstream git@github.com:owner/repo.git\ngit fetch upstream\ngit merge upstream/main   # hoặc rebase</code></pre>\n\n<h2>So sánh quyết định dùng cái nào</h2>\n\n<table style=\"width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;\">\n  <thead><tr style=\"border-bottom:2px solid var(--border);\"><th style=\"text-align:left;padding:10px;\">Tiêu chí</th><th style=\"text-align:left;padding:10px;\">Clone</th><th style=\"text-align:left;padding:10px;\">Fork</th></tr></thead>\n  <tbody>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Nơi diễn ra</td><td style=\"padding:10px;\">Máy local</td><td style=\"padding:10px;\">GitHub</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Bản chất</td><td style=\"padding:10px;\">Bản sao làm việc</td><td style=\"padding:10px;\">Bản sao quyền sở hữu</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Dùng khi</td><td style=\"padding:10px;\">Có quyền ghi, hoặc chỉ đọc</td><td style=\"padding:10px;\">Không có quyền push vào gốc</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Ví dụ</td><td style=\"padding:10px;\"><code>task-board</code> hôm nay</td><td style=\"padding:10px;\">Gửi fix cho thư viện open source</td></tr>\n  </tbody>\n</table>\n\n<p>Hai thao tác không loại trừ nhau — kịch bản OSS luôn đi cả hai.</p>\n\n<div class=\"callout callout-note\"><span class=\"callout-icon\">ℹ️</span><div class=\"callout-body\">Quy tắc phân biệt nhanh cho người mới: repo của <strong>team mình</strong> → clone trực tiếp. Repo của <strong>người khác</strong> → fork rồi clone fork.</div></div>\n\n<h2>Sai lầm thường gặp</h2>\n\n<ul><li>Fork repo của chính mình → vô nghĩa; cần gì thì branch hoặc clone.</li><li>Clone repo OSS rồi mở PR từ nhánh local chưa push lên fork nào → PR không có nguồn so sánh.</li><li>Quên đồng bộ upstream hàng tuần → fork lệch xa gốc, conflict ngay trong PR đầu tiên.</li></ul>\n\n<h2>References</h2>\n\n<ul><li><a href=\"https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes\" target=\"_blank\" rel=\"noopener\">Pro Git 2.5: Working with Remotes</a></li><li><a href=\"https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo\" target=\"_blank\" rel=\"noopener\">GitHub Docs: Fork a repository</a></li></ul>\n\n<h2>Học tiếp</h2>\n\n<p><a href=\"index.html?topic=git-pull-request\">Pull Request</a> — task drag-drop của bạn sắp đi qua vòng review đầu đời.</p>"
  },
  "git-merge-conflicts": {
    "title": "Merge Conflicts — Xử lý xung đột",
    "summary": "Conflict thật đầu tiên với Chi trên board.js: đọc conflict markers, ba lựa chọn hợp nhất, quy trình add → commit và đường lùi --abort.",
    "status": "published",
    "difficulty": "beginner",
    "depth": "lesson",
    "tags": [
      "git",
      "merge",
      "conflict"
    ],
    "domain": "Git & GitHub Beginner",
    "module": "Module 03: Collaboration với GitHub",
    "prerequisites": [
      "git-branches-merge"
    ],
    "related": [
      "git-pull-fetch",
      "git-rebase-merge-squash"
    ],
    "learningOutcomes": [
      "Đọc hiểu markers <<<<<<< / ======= / >>>>>>>.",
      "Giải quyết conflict bằng tay rồi hoàn tất merge đúng trình tự.",
      "Biết abort an toàn và ba cách phòng conflict từ gốc."
    ],
    "knowledgeGap": "Chạy git add . mà chưa đọc kỹ conflict → đẩy code hỏng kèm marker lên remote.",
    "updatedAt": "2026-08-23",
    "readTime": "11 phút",
    "next": "git-oss-licenses",
    "previous": "git-pull-fetch",
    "content": "<div class=\"callout callout-note\"><span class=\"callout-icon\">ℹ️</span><div class=\"callout-body\"><strong>Bối cảnh:</strong> Bạn sửa hàm <code>renderBoard()</code> để thêm badge đếm task; cùng lúc Chi cũng sửa chính hàm đó cho tính năng filter. Khi bạn <code>git pull</code>, màn hình hiện:</div></div>\n\n<pre><code>CONFLICT (content): Merge conflict in js/board.js\nAutomatic merge failed; fix conflicts and then commit the result.</code></pre>\n\n<p>Bình tĩnh — đây không phải lỗi hệ thống. Git chỉ nói: <em>\"Hai người sửa cùng chỗ, tôi không có quyền chọn thay.\"</em></p>\n\n<h2>Khi nào conflict xảy ra?</h2>\n\n<p>Merge <strong>tự động thành công</strong> khi thay đổi nằm ở vùng khác nhau hoặc chỉ một phía đổi. Conflict xuất hiện khi:</p>\n\n<ul><li>Hai nhánh sửa <strong>cùng dòng, cùng file</strong>, nội dung khác nhau (trường hợp này).</li><li>Một bên xóa file, bên kia sửa file đó.</li><li>Rebase/cherry-pick áp commit đè lên vùng đã bị thay đổi.</li></ul>\n\n<h2>Bước 1: Đọc tình trạng</h2>\n\n<pre><code class=\"language-bash\">git status</code></pre>\n\n<pre><code>Unmerged paths:\n  (use \"git add &lt;file&gt;...\" to mark resolution)\n        both modified:   js/board.js</code></pre>\n\n<p>Mục <strong>Unmerged paths</strong> liệt kê các file cần xử lý tay.</p>\n\n<h2>Bước 2: Mở file, đọc markers</h2>\n\n<p>Mở <code>js/board.js</code> tại vị trí xung đột:</p>\n\n<pre><code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD\n    renderCountBadge(taskList.children.length);\n=======\n    renderFilterDropdown(tasks);\n&gt;&gt;&gt;&gt;&gt;&gt;&gt; origin/main</code></pre>\n\n<p>Đọc như bảng đối chất:</p>\n\n<table style=\"width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;\">\n  <thead><tr style=\"border-bottom:2px solid var(--border);\"><th style=\"text-align:left;padding:10px;\">Marker</th><th style=\"text-align:left;padding:10px;\">Ý nghĩa</th></tr></thead>\n  <tbody>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\"><code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</code></td><td style=\"padding:10px;\">Phiên bản phía BẠN (nhánh hiện tại)</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\"><code>=======</code></td><td style=\"padding:10px;\">Ranh giới</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\"><code>&gt;&gt;&gt;&gt;&gt;&gt;&gt; origin/main</code></td><td style=\"padding:10px;\">Phiên bản phía CHI (code vừa pull)</td></tr>\n  </tbody>\n</table>\n\n<h2>Bước 3: Quyết định nội dung cuối</h2>\n\n<p>Ba lựa chọn: giữ của mình / giữ của họ / <strong>hòa trộn cả hai</strong> — ở đây đúng ý nghĩa nghiệp vụ là giữ cả badge lẫn dropdown:</p>\n\n<pre><code class=\"language-javascript\">    renderCountBadge(taskList.children.length);\n    renderFilterDropdown(tasks);</code></pre>\n\n<p>Sau khi quyết định, <strong>xóa sạch cả ba dòng marker</strong> — quên xóa là lỗi kinh điển nhất (file vẫn chạy được đến ngày build vỡ).</p>\n\n<div class=\"callout callout-tip\"><span class=\"callout-icon\">💡</span><div class=\"callout-body\">VS Code hiển thị nút Accept Current Change / Accept Incoming / Accept Both ngay trên vùng conflict — dùng nó giảm đáng kể sai sót marker sót lại.</div></div>\n\n<h2>Bước 4: Hoàn tất merge</h2>\n\n<pre><code class=\"language-bash\">git add js/board.js\ngit status     # xác nhận Unmerged paths biến mất\ngit commit     # Git soạn sẵn message merge, chỉ cần lưu</code></pre>\n\n<p>Output:</p>\n\n<pre><code>[main 9a8b7c6] Merge branch 'main' of github.com:an-dev/task-board into main</code></pre>\n\n<p>Xong. Lịch sử giờ ghi nhận rõ hai dòng công việc đã hòa vào nhau tại commit nào.</p>\n\n<h2>Đường lùi khi hoảng loạn</h2>\n\n<p>Thấy quá rối muốn quay về trạng thái trước khi pull:</p>\n\n<pre><code class=\"language-bash\">git merge --abort</code></pre>\n\n<p>Mọi thứ trở về y nguyên trước đó — không mất gì. Xử lý xong tâm lý, thử lại sau.</p>\n\n<h2>Phòng bệnh thay chữa bệnh</h2>\n\n<ul><li><strong>Pull mỗi sáng</strong> — conflict nhỏ hàng ngày dễ gấp chục lần conflict dồn tuần.</li><li>Nhánh/PR ngắn hạn, một chủ đề — vòng đời càng ngắn, va chạm càng ít.</li><li>Team chia trách nhiệm theo file/module rõ ràng; hai người sửa cùng file cấu hình lớn là mồi lửa conflict.</li></ul>\n\n<h2>Sai lầm thường gặp</h2>\n\n<ul><li>Chạy <code>git add .</code> + commit mà chưa mở file xem conflict → đẩy marker lên remote, đồng đội build vỡ.</li><li>Chọn \"Accept Incoming\" máy móc cho nhanh → âm thầm xóa mất tính năng của mình.</li><li>Abort mãi không dám giải quyết — nhớ luôn có <code>--abort</code>, conflict không cắn người.</li></ul>\n\n<h2>References</h2>\n\n<ul><li><a href=\"https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging#_basic_merge_conflicts\" target=\"_blank\" rel=\"noopener\">Pro Git 3.2: Basic Merge Conflicts</a></li><li><a href=\"https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line\" target=\"_blank\" rel=\"noopener\">GitHub Docs: Resolving a merge conflict</a></li></ul>\n\n<h2>Học tiếp</h2>\n\n<p><a href=\"index.html?topic=git-oss-licenses\">Giấy phép nguồn mở phổ biến</a> — An vừa quyết định mở nguồn task-board.</p>"
  },
  "git-oss-licenses": {
    "title": "Giấy phép nguồn mở phổ biến",
    "summary": "Task-board sắp mở nguồn: public không bằng mã nguồn mở, so sánh MIT / Apache 2.0 / GPLv3 và cách chọn đúng cho dự án.",
    "status": "published",
    "difficulty": "beginner",
    "depth": "lesson",
    "tags": [
      "license",
      "open-source",
      "github"
    ],
    "domain": "Git & GitHub Beginner",
    "module": "Module 03: Collaboration với GitHub",
    "prerequisites": [
      "git-create-repository"
    ],
    "related": [
      "git-fork-clone",
      "git-pull-request"
    ],
    "learningOutcomes": [
      "Giải thích vì sao repo public không có license thì về pháp lý cấm dùng.",
      "So sánh MIT / Apache 2.0 / GPLv3 theo thương mại hóa và copyleft.",
      "Thêm license chuẩn vào repository qua GitHub."
    ],
    "knowledgeGap": "Tưởng public = tự do dùng mọi kiểu — thiếu license vẫn là cấm tái sử dụng.",
    "updatedAt": "2026-08-23",
    "readTime": "9 phút",
    "next": "git-security-secrets",
    "previous": "git-merge-conflicts",
    "content": "<div class=\"callout callout-note\"><span class=\"callout-icon\">ℹ️</span><div class=\"callout-body\"><strong>Bối cảnh:</strong> An công bố trong họp: <em>\"Task-board sẽ open source để làm portfolio.\"</em> Chi hỏi ngay: <em>\"Trên repo cần làm gì?\"</em> — Câu trả lời: <strong>thêm LICENSE</strong>, và chọn loại là quyết định pháp lý thật.</div></div>\n\n<h2>Vấn đề: không có license = cấm dùng</h2>\n\n<p>Theo mặc định luật bản quyền, repo public <strong>không kèm license</strong> thì mọi quyền thuộc về tác giả: người khác đọc được nhưng <strong>không được phép</strong> tái sử dụng, sửa đổi hay phân phối. License là văn bản cấp quyền sử dụng có điều kiện — bảo vệ cả hai phía.</p>\n\n<h2>Ba giấy phép phổ biến nhất</h2>\n\n<p><strong>MIT</strong> — tối giản nhất: được làm mọi thứ (dùng, sửa, bán), điều kiện duy nhất là giữ nguyên dòng bản quyền. Chọn khi muốn dự án lan rộng tối đa. Ví dụ: React, Vue.js.</p>\n\n<p><strong>Apache 2.0</strong> — MIT cộng thêm <strong>patent grant tường minh</strong> (người đóng góp cam kết không kiện người dùng về bằng sáng chế liên quan) và yêu cầu ghi chú thay đổi khi sửa file gốc. Ví dụ: Kubernetes, TensorFlow.</p>\n\n<p><strong>GPLv3</strong> — copyleft lây lan: sản phẩm chứa code GPL phải <strong>mở nguồn toàn bộ</strong> cùng license khi phân phối. Ví dụ: chính Git, WordPress.</p>\n\n<h2>Bảng quyết định nhanh</h2>\n\n<table style=\"width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;\">\n  <thead><tr style=\"border-bottom:2px solid var(--border);\"><th style=\"text-align:left;padding:10px;\">Tiêu chí</th><th style=\"text-align:left;padding:10px;\">MIT</th><th style=\"text-align:left;padding:10px;\">Apache 2.0</th><th style=\"text-align:left;padding:10px;\">GPLv3</th></tr></thead>\n  <tbody>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Dùng trong app thương mại</td><td style=\"padding:10px;\">Có</td><td style=\"padding:10px;\">Có</td><td style=\"padding:10px;\">Chỉ nếu app mở nguồn</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Giữ dòng bản quyền</td><td style=\"padding:10px;\">Bắt buộc</td><td style=\"padding:10px;\">Bắt buộc</td><td style=\"padding:10px;\">Bắt buộc</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Patent grant tường minh</td><td style=\"padding:10px;\">Không</td><td style=\"padding:10px;\"><strong>Có</strong></td><td style=\"padding:10px;\">Có</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Phái sinh phải open source</td><td style=\"padding:10px;\">Không</td><td style=\"padding:10px;\">Không</td><td style=\"padding:10px;\"><strong>Có</strong></td></tr>\n  </tbody>\n</table>\n\n<p>Với task-board — công cụ nhóm muốn nhiều người dùng: team chọn <strong>MIT</strong>, rào cản thấp nhất.</p>\n\n<h2>Thực hiện trên GitHub</h2>\n\n<ol><li>Repo → Add file → Create new file → gõ <code>LICENSE</code>.</li><li>GitHub hiện nút <strong>Choose a license template</strong> → chọn MIT → điền năm + holder.</li><li>Commit thẳng lên <code>main</code> (file pháp lý đơn lẻ, không cần PR).</li></ol>\n\n<p>Kèm khai báo license trong <code>package.json</code> để công cụ kiểm tra phụ thuộc nhận diện đúng:</p>\n\n<pre><code class=\"language-json\">{\n  \"name\": \"task-board\",\n  \"version\": \"1.0.0\",\n  \"license\": \"MIT\"\n}</code></pre>\n\n<div class=\"callout callout-warn\"><span class=\"callout-icon\">⚠️</span><div class=\"callout-body\">Copy code từ Stack Overflow hay repo có license nghĩa là chấp nhận license đó — kể cả khi bạn không đọc. Nhét thư viện GPL vào app đóng nguồn mà không mở toàn bộ là vi phạm thật.</div></div>\n\n<h2>Sai lầm thường gặp</h2>\n\n<ul><li>Tự chế \"license riêng\" cho dự án nhỏ → không tương thích công cụ, người dùng phải đoán nghĩa vụ.</li><li>Trộn GPL với MIT trong cùng sản phẩm phân phối mà không hiểu ràng buộc chéo.</li><li>Quên license đến khi có người muốn dùng → phải truy tìm ý kiến từng contributor cũ để bổ sung.</li></ul>\n\n<h2>References</h2>\n\n<ul><li><a href=\"https://choosealicense.com/\" target=\"_blank\" rel=\"noopener\">Choose a License (GitHub)</a></li><li><a href=\"https://opensource.org/licenses\" target=\"_blank\" rel=\"noopener\">Open Source Initiative — licenses</a></li></ul>\n\n<h2>Học tiếp</h2>\n\n<p><a href=\"index.html?topic=git-security-secrets\">Lộ secret — Xử lý khẩn cấp</a>: bài sự cố thật đầu tiên của team.</p>"
  },
  "git-pull-fetch": {
    "title": "Pull & Fetch — Đồng bộ hàng ngày",
    "summary": "Thói quen đầu buổi: fetch để nhìn trước, pull để hợp nhất ngay — kèm output thật và quy tắc pull --rebase giữ lịch sử tuyến tính.",
    "status": "published",
    "difficulty": "beginner",
    "depth": "lesson",
    "tags": [
      "git",
      "pull",
      "fetch",
      "remote"
    ],
    "domain": "Git & GitHub Beginner",
    "module": "Module 03: Collaboration với GitHub",
    "prerequisites": [
      "git-remote-push"
    ],
    "related": [
      "git-merge-conflicts",
      "git-rebase-merge-squash"
    ],
    "learningOutcomes": [
      "Phân biệt fetch (chỉ tải về, không đụng code) và pull (fetch + merge).",
      "Dùng git log main..origin/main xem trước commit của người khác.",
      "Đặt pull.rebase true cho lịch sử tuyến tính."
    ],
    "knowledgeGap": "Để nợ đồng bộ nhiều ngày → conflict dồn thành bài toán lớn khó xử.",
    "updatedAt": "2026-08-23",
    "readTime": "8 phút",
    "next": "git-merge-conflicts",
    "previous": "git-pull-request",
    "content": "<div class=\"callout callout-note\"><span class=\"callout-icon\">ℹ️</span><div class=\"callout-body\"><strong>Bối cảnh:</strong> Sáng hôm sau mở máy, <code>git status</code> báo:</div></div>\n\n<pre><code>On branch main\nYour branch is behind 'origin/main' by 3 commits, and can be fast-forwarded.</code></pre>\n\n<p>Chi đã đẩy 3 commit mới tối qua. Trước khi bắt đầu code, cần đồng bộ — nhưng an toàn thì làm thế nào?</p>\n\n<h2>git fetch — nhìn trước, không động vào code</h2>\n\n<pre><code class=\"language-bash\">git fetch origin</code></pre>\n\n<p>Fetch tải mọi commit/branch mới từ remote về <strong>kho nội bộ <code>.git</code></strong>, cập nhật nhánh phản chiếu <code>origin/main</code>. Working directory của bạn <strong>không đổi một byte nào</strong>. Giờ có thể thẩm định công việc của Chi:</p>\n\n<pre><code class=\"language-bash\">git log main..origin/main --oneline</code></pre>\n\n<p>Output:</p>\n\n<pre><code>f8g9h0i (origin/main) Add filter by assignee\nd4e5f6a Refactor task card component\nb2c3d4e Fix timezone bug in due date</code></pre>\n\n<p>Xem chi tiết khác biệt:</p>\n\n<pre><code class=\"language-bash\">git diff main origin/main --stat    # tóm tắt file nào đổi bao nhiêu dòng</code></pre>\n\n<p>Fetch = cửa sổ quan sát an toàn. Dùng nó khi đang giữa chừng việc dở dang.</p>\n\n<h2>git pull — fetch rồi hợp nhất luôn</h2>\n\n<pre><code class=\"language-bash\">git pull origin main</code></pre>\n\n<p>Output:</p>\n\n<pre><code>Updating b7c8d9e..f8g9h0i\nFast-forward\n board.js     | 28 ++++++++++----\n filters.js   | 64 +++++++++++++++++++++++\n 2 files changed, 86 insertions(+), 6 deletions(-)</code></pre>\n\n<p>Pull = <code>fetch</code> + merge <code>origin/main</code> vào nhánh hiện tại. Nhanh, tiện — đánh đổi mất bước \"xem trước\". Ở đây Git báo <code>Fast-forward</code>: bạn chưa có commit riêng trên main nên hợp nhất sạch sẽ.</p>\n\n<h2>Quyết định dùng gì khi nào</h2>\n\n<table style=\"width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;\">\n  <thead><tr style=\"border-bottom:2px solid var(--border);\"><th style=\"text-align:left;padding:10px;\">Tình huống</th><th style=\"text-align:left;padding:10px;\">Chọn</th></tr></thead>\n  <tbody>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Giữa chừng sửa dở, chỉ muốn biết tình hình</td><td style=\"padding:10px;\"><code>fetch</code> + đọc log/diff</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Mới mở máy, sẵn sàng nhận code mới</td><td style=\"padding:10px;\"><code>pull</code></td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Trước khi push (tránh bị rejected)</td><td style=\"padding:10px;\"><code>pull --rebase</code> rồi push</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Muốn thử branch mới của đồng nghiệp</td><td style=\"padding:10px;\"><code>fetch</code> rồi <code>git switch ten-nhanh</code></td></tr>\n  </tbody>\n</table>\n\n<div class=\"callout callout-tip\"><span class=\"callout-icon\">💡</span><div class=\"callout-body\">Nhịp chuẩn mỗi ngày: <strong>sáng pull — tối push</strong>. Khoảng cách với remote càng ngắn, conflict càng nhỏ.</div></div>\n\n<h2>Pull với rebase — lịch sử tuyến tính</h2>\n\n<p>Mặc định pull tạo merge commit mỗi lần đồng bộ → log đầy \"Merge branch 'main'...\" nhiễu. Cấu hình này thay bằng rebase (đặt commit local lên trên cùng commit mới):</p>\n\n<pre><code class=\"language-bash\">git config --global pull.rebase true</code></pre>\n\n<p>Từ giờ mọi pull giữ lịch sử thẳng hàng. Cơ chế bên trong rebase được mổ xẻ ở Module 04.</p>\n\n<div class=\"callout callout-note\"><span class=\"callout-icon\">ℹ️</span><div class=\"callout-body\">Nếu pull bị chặn vì working directory đang bẩn (<code>error: Your local changes...</code>) — đó là Git bảo vệ bạn. Commit hoặc stash (bài Stash) trước rồi pull lại.</div></div>\n\n<h2>Sai lầm thường gặp</h2>\n\n<ul><li>Thấy \"behind by X commits\" kéo dài cả tuần — nợ đồng bộ trả giá bằng conflict lớn.</li><li>Pull xong thấy merge commit lạ rồi hoảng — đó là hành vi mặc định; dùng <code>--rebase</code> nếu team muốn tránh.</li><li>Tưởng pull ghi đè code đang sửa dở — Git chặn trước; không bao giờ mất âm thầm.</li></ul>\n\n<h2>References</h2>\n\n<ul><li><a href=\"https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes#_fetching_and_pulling\" target=\"_blank\" rel=\"noopener\">Pro Git 2.5: Fetching and Pulling</a></li><li><a href=\"https://git-scm.com/docs/git-pull\" target=\"_blank\" rel=\"noopener\">git-pull docs</a></li></ul>\n\n<h2>Học tiếp</h2>\n\n<p><a href=\"index.html?topic=git-merge-conflicts\">Merge Conflicts</a> — hôm nay nó đến thật: bạn và Chi vừa cùng sửa <code>board.js</code>.</p>"
  },
  "git-pull-request": {
    "title": "Pull Request — Đề xuất hợp nhất code",
    "summary": "PR đầu tiên của bạn vào task-board: vòng đời push → mở PR → review → chỉnh sửa → merge, và cách phản hồi review bằng commit mới.",
    "status": "published",
    "difficulty": "beginner",
    "depth": "lesson",
    "tags": [
      "github",
      "pull-request",
      "code-review"
    ],
    "domain": "Git & GitHub Beginner",
    "module": "Module 03: Collaboration với GitHub",
    "prerequisites": [
      "git-branches-merge",
      "git-fork-clone"
    ],
    "related": [
      "git-pull-fetch",
      "git-merge-conflicts"
    ],
    "learningOutcomes": [
      "Đi trọn vòng đời PR từ push đến merge trên giao diện GitHub.",
      "Viết mô tả PR đủ ba phần: làm gì, vì sao, cách kiểm chứng.",
      "Phản hồi review bằng commit mới thay vì force push."
    ],
    "knowledgeGap": "PR khổng lồ nhiều tính năng khiến reviewer bỏ qua — lỗi đi thẳng vào production.",
    "updatedAt": "2026-08-23",
    "readTime": "11 phút",
    "next": "git-pull-fetch",
    "previous": "git-fork-clone",
    "content": "<div class=\"callout callout-note\"><span class=\"callout-icon\">ℹ️</span><div class=\"callout-body\"><strong>Bối cảnh:</strong> Tính năng drag-drop của bạn đã xong trên nhánh <code>feature/drag-drop</code>. An nói: <em>\"Mở PR đi, tao review rồi mới merge vào main.\"</em> Đây là nghi thức quan trọng nhất của làm việc nhóm trên GitHub.</div></div>\n\n<h2>PR giải quyết vấn đề gì?</h2>\n\n<p>Merge trực tiếp lên <code>main</code> = không ai đọc trước code, không ai chặn lỗi. Pull Request thêm lớp <strong>kiểm soát hợp nhất</strong>: thay đổi hiển thị công khai dưới dạng diff → được thảo luận theo từng dòng → được phê duyệt → rồi mới merge.</p>\n\n<p>(GitLab gọi tương đương là Merge Request — bản chất một.)</p>\n\n<h2>Bước 1: Push nhánh lên origin</h2>\n\n<pre><code class=\"language-bash\">git switch feature/drag-drop\ngit push -u origin feature/drag-drop</code></pre>\n\n<p>Output cuối:</p>\n\n<pre><code>Create a pull request for 'feature/drag-drop' on GitHub by visiting:\n    https://github.com/an-dev/task-board/pull/new/feature/drag-drop</code></pre>\n\n<p>GitHub thân thiện đưa sẵn link tạo PR ngay sau push.</p>\n\n<h2>Bước 2: Mở PR</h2>\n\n<p>Bấm link trên (hoặc tab <strong>Pull requests → New pull request</strong>), chọn:</p>\n\n<ul><li><strong>base</strong>: <code>main</code> (nơi code sẽ đổ vào)</li><li><strong>compare</strong>: <code>feature/drag-drop</code> (code của bạn)</li></ul>\n\n<p>Viết mô tả theo khung ba phần:</p>\n\n<pre><code class=\"language-markdown\">**Làm gì:** Thêm kéo thả sắp xếp thứ tự task trên board.\n\n**Vì sao:** Issue #12 — user phải bấm nút lên/xuống rất bất tiện.\n\n**Kiểm chứng:** Kéo card giữa các cột, reload trang, thứ tự được giữ.\nĐã test Chrome + Firefox.</code></pre>\n\n<h2>Bước 3: Review — hai chiều</h2>\n\n<p>An đọc diff, comment ngay tại dòng có vấn đề:</p>\n\n<blockquote><em>Comment của An:</em> \"Ở <code>drag-drop.js</code> dòng 42: dùng <code>event delegation</code> thay vì gắn listener từng card nhé — hiện tại card render động sẽ mất listener.\"</blockquote>\n\n<p>Bạn sửa code, rồi <strong>đưa bản sửa lên bằng commit mới</strong>:</p>\n\n<pre><code class=\"language-bash\">git add drag-drop.js\ngit commit -m \"Use event delegation for dynamically rendered cards\"\ngit push</code></pre>\n\n<p>PR <strong>tự cập nhật</strong> với commit mới — không cần đóng mở lại. Đây là luồng chuẩn: review → commit mới → review tiếp → Approve.</p>\n\n<div class=\"callout callout-warn\"><span class=\"callout-icon\">⚠️</span><div class=\"callout-body\">Tuyệt đối không <code>push --force</code> đè lên nhánh đang được review — toàn bộ comment cũ rơi vào trạng thái lỗi thời, reviewer phải đọc lại từ đầu.</div></div>\n\n<h2>Bước 4: Merge &amp; dọn dẹp</h2>\n\n<p>An approve → merge bằng nút <strong>Squash and merge</strong> (gộp các commit WIP thành một commit sạch trên main — kỹ thuật chi tiết ở bài Rebase vs Merge vs Squash). Sau merge:</p>\n\n<pre><code class=\"language-bash\">git switch main\ngit pull                      # lấy kết quả merge về máy\ngit branch -d feature/drag-drop   # dọn nhánh cục bộ</code></pre>\n\n<p>Nhánh trên remote cũng nên xóa (nút Delete branch trên GitHub) để danh sách branch không thành bãi rác.</p>\n\n<h2>Vòng đời đầy đủ</h2>\n\n<div class=\"mermaid\">\nsequenceDiagram\n    participant D as Bạn\n    participant G as GitHub\n    participant R as An (Reviewer)\n    D->>G: 1. Push feature/drag-drop\n    D->>G: 2. Mở PR -> main\n    R->>G: 3. Comment yêu cầu sửa\n    D->>G: 4. Commit mới + push\n    R->>G: 5. Approve\n    G->>G: 6. Squash & merge\n    Note over D,G: Pull main về, xóa nhánh\n</div>\n\n<h2>Chuẩn mực cho PR dễ sống còn</h2>\n\n<ul><li><strong>Một PR một chủ đề</strong>, ≤ ~300 dòng diff thì reviewer thực sự đọc.</li><li>Tiêu đề PR viết như commit message chuẩn.</li><li>Không coi review là chỉ trích cá nhân — comment đánh giá code, không đánh giá người.</li></ul>\n\n<h2>References</h2>\n\n<ul><li><a href=\"https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests\" target=\"_blank\" rel=\"noopener\">GitHub Docs: About PRs</a></li><li><a href=\"https://git-scm.com/book/en/v2/Distributed-Git-Distributed-Workflows\" target=\"_blank\" rel=\"noopener\">Pro Git 6.x: GitHub Flow</a></li></ul>\n\n<h2>Học tiếp</h2>\n\n<p><a href=\"index.html?topic=git-pull-fetch\">Pull &amp; Fetch</a> — trong lúc chờ review, Chi vừa đẩy code mới lên; cần đồng bộ an toàn.</p>"
  },
  "git-remote-push": {
    "title": "Remote & Push — Kết nối local với GitHub",
    "summary": "Đưa sandbox lên GitHub lần đầu: remote origin là gì, push -u ghi nhớ gì, và xử lý đúng khi bị từ chối non-fast-forward.",
    "status": "published",
    "difficulty": "beginner",
    "depth": "lesson",
    "tags": [
      "git",
      "remote",
      "push",
      "github"
    ],
    "domain": "Git & GitHub Beginner",
    "module": "Module 03: Collaboration với GitHub",
    "prerequisites": [
      "git-create-repository",
      "git-commit"
    ],
    "related": [
      "git-pull-fetch",
      "git-fork-clone"
    ],
    "learningOutcomes": [
      "Thêm remote origin bằng URL SSH và kiểm tra bằng git remote -v.",
      "Push lần đầu với -u, từ đó chỉ cần git push.",
      "Xử lý lỗi rejected (fetch first) bằng pull --rebase thay vì force."
    ],
    "knowledgeGap": "Force push khi bị từ chối — hủy luôn commit của người khác trên remote.",
    "updatedAt": "2026-08-23",
    "readTime": "9 phút",
    "next": "git-fork-clone",
    "previous": "git-create-repository",
    "content": "<div class=\"callout callout-note\"><span class=\"callout-icon\">ℹ️</span><div class=\"callout-body\"><strong>Bối cảnh:</strong> Sandbox <code>task-board-sandbox</code> trên máy bạn đã có 5 commit. An bảo: <em>\"Đẩy lên GitHub đi để mình review cách bạn commit.\"</em> Bạn tạo repo trống <code>you/task-board-sandbox</code> trên GitHub — giờ là lúc nối hai bên.</div></div>\n\n<h2>Mô hình hai repository</h2>\n\n<p>Git là distributed: local và remote là <strong>hai bản sao độc lập</strong>, không tự đồng bộ:</p>\n\n<div class=\"mermaid\">\ngraph LR\n    L[\"Local<br/>(máy bạn)\"] -->|\"git push\"| R[\"Remote origin<br/>(GitHub)\"]\n    R -->|\"git pull / fetch\"| L\n</div>\n\n<p>Hệ quả phải khắc cốt ghi tâm: <strong>commit chỉ nằm trên máy cho đến khi push</strong>. Quên push cả ngày = đồng đội không thấy gì, và máy hỏng thì mất trắng.</p>\n\n<h2>Bước 1: Thêm remote</h2>\n\n<pre><code class=\"language-bash\">git remote add origin git@github.com:you/task-board-sandbox.git\ngit remote -v</code></pre>\n\n<p>Output:</p>\n\n<pre><code>origin  git@github.com:you/task-board-sandbox.git (fetch)\norigin  git@github.com:you/task-board-sandbox.git (push)</code></pre>\n\n<p>Giải mã lệnh đầu: <code>remote add</code> = thêm kết nối; <code>origin</code> = <strong>bí danh quy ước</strong> cho remote chính; phần sau là URL SSH (đã setup key ở Module 01).</p>\n\n<h2>Bước 2: Push lần đầu</h2>\n\n<pre><code class=\"language-bash\">git push -u origin main</code></pre>\n\n<p>Output:</p>\n\n<pre><code>Enumerating objects: 12, done.\nWriting objects: 100% (12/12), done.\nBranch 'main' set up to track remote branch 'main' from 'origin'.</code></pre>\n\n<ul><li><code>-u</code> (<code>--set-upstream</code>): ghi nhớ cặp <code>main</code> ↔ <code>origin/main</code>. Từ lần sau chỉ cần gõ <code>git push</code>.</li><li>Refresh trang GitHub: lịch sử 5 commit hiện đầy đủ kèm code.</li></ul>\n\n<p>Vòng đời hàng ngày từ giờ chỉ còn:</p>\n\n<pre><code class=\"language-bash\">git add . &amp;&amp; git commit -m \"...\" &amp;&amp; git push</code></pre>\n\n<h2>Khi push bị từ chối — tình huống thật đầu tiên</h2>\n\n<p>Một tuần sau, bạn push và gặp:</p>\n\n<pre><code> ! [rejected]        main -&gt; main (fetch first)\nerror: failed to push some refs to 'github.com:you/task-board-sandbox.git'\nhint: Updates were rejected because the remote contains work that you do not have</code></pre>\n\n<p>Nguyên nhân: có commit trên remote mà máy bạn chưa có. Git <strong>từ chối ghi đè</strong> để không âm thầm xóa công việc ai đó. Xử lý chuẩn:</p>\n\n<pre><code class=\"language-bash\">git pull --rebase   # kéo commit mới về, đặt commit của bạn lên trên\ngit push            # giờ sẽ thành công</code></pre>\n\n<div class=\"callout callout-warn\"><span class=\"callout-icon\">⚠️</span><div class=\"callout-body\">Đừng bao giờ \"giải quyết\" bằng <code>git push --force</code> ở giai đoạn này — nó xóa sạch commit của người khác trên remote. Vì sao rebase an toàn hơn được giải thích kỹ trong bài Rebase vs Merge vs Squash.</div></div>\n\n<h2>Sai lầm thường gặp</h2>\n\n<ul><li>Gõ nhầm URL khi <code>remote add</code> → sửa bằng <code>git remote set-url origin &lt;url&gt;</code>, đừng remove rồi add lại mất cấu hình.</li><li>Nghĩ commit xong là xong việc → quên push, cuối ngày An vẫn không thấy gì.</li><li>Dùng HTTPS dù đã có SSH key → cứ hỏi token mỗi lần push.</li></ul>\n\n<h2>References</h2>\n\n<ul><li><a href=\"https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes\" target=\"_blank\" rel=\"noopener\">Pro Git 2.5: Working with Remotes</a></li><li><a href=\"https://docs.github.com/en/get-started/using-git/pushing-commits-to-a-remote-repository\" target=\"_blank\" rel=\"noopener\">GitHub Docs: Pushing commits</a></li></ul>\n\n<h2>Học tiếp</h2>\n\n<p><a href=\"index.html?topic=git-fork-clone\">Fork vs Clone</a> — hôm nay chính thức vào repo team <code>task-board</code>: lấy code về máy bằng clone.</p>"
  },
  "git-security-secrets": {
    "title": "Lộ secret — Xử lý khẩn cấp & phòng ngừa",
    "summary": ".env của bạn lỡ push lên GitHub: quy trình xử lý 4 bước theo đúng thứ tự (revoke trước, dọn lịch sử sau), công cụ quét secret và thói quen phòng bệnh.",
    "status": "published",
    "difficulty": "beginner",
    "depth": "lesson",
    "tags": [
      "security",
      "secrets",
      "github",
      "incident"
    ],
    "domain": "Git & GitHub Beginner",
    "module": "Module 03: Collaboration với GitHub",
    "prerequisites": [
      "git-gitignore",
      "git-remote-push"
    ],
    "related": [
      "git-gitignore",
      "git-revert-hard-reset"
    ],
    "learningOutcomes": [
      "Thực hiện đúng thứ tự xử lý khi lộ secret: revoke → rotate → dọn code → dọn lịch sử.",
      "Hiểu vì sao xóa file ở commit mới không xóa được secret khỏi lịch sử.",
      "Thiết lập phòng ngừa: .env.example, secret scanning, gitleaks pre-commit."
    ],
    "knowledgeGap": "Xóa .env ở commit mới rồi tưởng đã an toàn — key cũ vẫn nằm trong lịch sử và các bản fork/clone.",
    "updatedAt": "2026-08-23",
    "readTime": "11 phút",
    "next": "git-revert-hard-reset",
    "previous": "git-oss-licenses",
    "content": "<div class=\"callout callout-note\"><span class=\"callout-icon\">ℹ️</span><div class=\"callout-body\"><strong>Bối cảnh:</strong> Sự cố thật đầu tiên của bạn: trong lúc vội, bạn <code>git add .</code> rồi push — <code>.env</code> chứa <code>STRIPE_KEY=sk_live_...</code> bay lên repo public của task-board. Chi nhắn ngay trong 2 phút: <em>\"Thấy key của mày trên GitHub kìa.\"</em></div></div>\n\n<h2>Nguyên tắc số một: coi như đã lộ</h2>\n\n<p>Ngay khi secret xuất hiện trên GitHub public (thậm chí private có nhiều người access), hãy giả định <strong>bot thu thập key đã quét được trong vài phút</strong>. Mọi bước khác đều xếp sau hai việc:</p>\n\n<div class=\"callout callout-warn\"><span class=\"callout-icon\">⚠️</span><div class=\"callout-body\">Thứ tự xử lý sai phổ biến nhất là dọn git trước, revoke sau. Revoke/rotate phải là việc ĐẦU TIÊN — dọn repo không vô hiệu hóa key đã bị sao chép.</div></div>\n\n<h2>Quy trình 4 bước đúng thứ tự</h2>\n\n<p><strong>Bước 1 — Revoke/rotate key NGAY LẬP TỨC</strong> (trang dashboard nhà cung cấp): Stripe → Developers → API keys → Roll. Key mới sinh ra, key cũ chết. Việc này độc lập với Git.</p>\n\n<p><strong>Bước 2 — Dọn code hiện tại:</strong> xóa <code>.env</code> khỏi thư mục làm việc nếu cần, thêm vào <code>.gitignore</code> (nếu chưa), thay bằng <code>.env.example</code> chỉ chứa tên biến:</p>\n\n<pre><code># .env.example — copy thành .env và điền giá trị thật\nSTRIPE_KEY=\nDATABASE_URL=</code></pre>\n\n<pre><code class=\"language-bash\">git add .env.example .gitignore\ngit rm --cached .env        # gỡ khỏi index, giữ file cục bộ\ngit commit -m \"Remove leaked credentials from tracking\"</code></pre>\n\n<p><strong>Bước 3 — Dọn lịch sử</strong> (chỉ sau bước 1): file vẫn nằm trong commit cũ — ai clone đủ sâu vẫn đọc được. Công cụ chính thức:</p>\n\n<pre><code class=\"language-bash\">git filter-repo --path .env --invert-paths</code></pre>\n\n<p>(<code>git filter-repo</code> viết lại toàn bộ lịch sử loại bỏ file; team cần force-push đồng loạt + mọi người re-clone. Với task-board, An thực hiện và thông báo cả nhóm.)</p>\n\n<p><strong>Bước 4 — Rà soát thiệt hại:</strong> kiểm tra log sử dụng key trên dashboard xem có request lạ giữa thời điểm lộ và revoke không.</p>\n\n<h2>Phòng ngừa — để sự cố không lặp lại</h2>\n\n<p><strong>1. Secret scanning của GitHub</strong>: Settings → Code security → bật Secret scanning. GitHub tự phát hiện pattern key của AWS/Stripe... và cảnh báo.</p>\n\n<p><strong>2. Chặn từ cửa staging — gitleaks pre-commit:</strong></p>\n\n<pre><code class=\"language-bash\"># quét staged changes trước mỗi commit\ngitleaks protect --staged</code></pre>\n\n<p>Gắn vào hook (chi tiết cơ chế hook ở bài Git Hooks, Module 05) thì commit chứa key bị chặn ngay trên máy.</p>\n\n<p><strong>3. Thói quen add có chủ đích</strong>: <code>git add &lt;file-cụ-thể&gt;</code> thay vì <code>git add .</code> — chính là bài học từ Module 02. <code>add .</code> trong lúc vội là cổng vào của 90% sự cố lộ secret.</p>\n\n<p><strong>4. Ký commit với GPG / SSH signing</strong> (nâng cao, tùy chọn): xác minh tác giả thật của commit — tránh ai đó giả mạo tên bạn đẩy code. Cấu hình qua <a href=\"https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification\" target=\"_blank\" rel=\"noopener\">GitHub Docs: Commit signature verification</a>.</p>\n\n<h2>Sai lầm thường gặp</h2>\n\n<ul><li>Rotate xong nhưng quên key nằm ở <strong>fork, clone của đồng nghiệp, CI variable</strong> — rà hết các nơi lưu trữ.</li><li>Tưởng private repo là chỗ kín — secret trong private vẫn lộ khi repo chuyển public hoặc member rời đi mang theo clone.</li><li>Xử lý xong không viết postmortem ngắn cho team — cùng một bẫy sẽ tái diễn với người khác.</li></ul>\n\n<h2>References</h2>\n\n<ul><li><a href=\"https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning\" target=\"_blank\" rel=\"noopener\">GitHub Docs: Secret scanning</a></li><li><a href=\"https://github.com/gitleaks/gitleaks\" target=\"_blank\" rel=\"noopener\">gitleaks</a></li><li><a href=\"https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History\" target=\"_blank\" rel=\"noopener\">Pro Git 7.x: Rewriting History</a></li></ul>\n\n<h2>Học tiếp</h2>\n\n<p>Sự cố khép lại. Sang Module 04 với <a href=\"index.html?topic=git-revert-hard-reset\">Revert &amp; Hard Reset</a> — hộp công cụ hoàn tác mà An dùng để dọn lịch sử.</p>"
  },
  "git-cherry-pick": {
    "title": "git cherry-pick — Chọn một commit riêng",
    "summary": "Vá nóng fix timezone của Chi lên nhánh release: lấy đúng một commit từ branch khác, hiểu hash mới và giới hạn của cherry-pick.",
    "status": "published",
    "difficulty": "beginner",
    "depth": "lesson",
    "tags": [
      "git",
      "cherry-pick",
      "workflow"
    ],
    "domain": "Git & GitHub Beginner",
    "module": "Module 04: More Git",
    "prerequisites": [
      "git-branches-merge",
      "git-rebase-merge-squash"
    ],
    "related": [
      "git-revert-hard-reset",
      "git-stash"
    ],
    "learningOutcomes": [
      "Áp một commit cụ thể sang branch khác bằng cherry-pick.",
      "Hiểu commit gốc không bị xóa; bản mới có hash khác.",
      "Nhận biết ngưỡng \"hơn 2-3 commit thì nên merge/rebase\"."
    ],
    "knowledgeGap": "Cherry-pick xong quên commit cũ vẫn nằm nguyên → merge sau này sinh trùng lặp/conflict.",
    "updatedAt": "2026-08-23",
    "readTime": "9 phút",
    "next": "git-flow",
    "previous": "git-stash",
    "content": "<div class=\"callout callout-note\"><span class=\"callout-icon\">ℹ️</span><div class=\"callout-body\"><strong>Bối cảnh:</strong> Task-board có nhánh <code>release/1.0</code> chạy cho khách hàng pilot. Chi vừa fix bug timezone trên <code>main</code> (commit <code>f4e3d2c</code>), nhưng <code>release/1.0</code> không thể merge cả main — chỉ cần <strong>đúng một commit đó</strong>.</div></div>\n\n<h2>Vấn đề mà cherry-pick giải quyết</h2>\n\n<p>Merge/rebase mang theo <strong>toàn bộ</strong> branch. Khi chỉ cần 1 commit trong khi cả branch chưa thể hợp nhất (chưa xong, đang thử nghiệm), cần công cụ chọn lọc điểm rơi.</p>\n\n<h2>Bước 1: Xác định commit cần vá</h2>\n\n<pre><code class=\"language-bash\">git log --oneline main -5</code></pre>\n\n<pre><code>g7f6e5d Add CSV export (draft)\nf4e3d2c Fix due date showing wrong day near midnight   &lt;- cái cần\nd3c2b1a Refactor task card component</code></pre>\n\n<h2>Bước 2: Cherry-pick sang release</h2>\n\n<pre><code class=\"language-bash\">git switch release/1.0\ngit cherry-pick f4e3d2c</code></pre>\n\n<p>Output:</p>\n\n<pre><code>[release/1.0 8a9b0c1] Fix due date showing wrong day near midnight\n Author: Chi Tran &lt;chi@congty.vn&gt;\n Date: Tue Aug 25 16:40:02 2026 +0700\n 1 file changed, 3 insertions(+), 1 deletion(-)</code></pre>\n\n<p>Cơ chế bên trong:</p>\n\n<div class=\"mermaid\">\ngraph LR\n    subgraph main\n        M1[\"...\"] --> M2[\"f4e3d2c<br/>Fix timezone\"]\n    end\n    subgraph release\n        R1[\"...\"] --> R2[\"8a9b0c1<br/>bản sao, hash mới\"]\n    end\n    M2 -.->|\"cherry-pick sao chép\"| R2\n</div>\n\n<p>Hai điều quan trọng:</p>\n\n<ul><li>Commit gốc trên <code>main</code> <strong>giữ nguyên</strong> — cherry-pick sao chép chứ không di chuyển.</li><li>Bản mới có <strong>hash khác</strong> (<code>8a9b0c1</code> ≠ <code>f4e3d2c</code>) vì cha nó khác. Git không tự nhận hai bản là một khi sau này merge — có thể gặp conflict nhỏ hoặc commit trùng nội dung.</li></ul>\n\n<h2>Bước 3: Push và xác minh</h2>\n\n<pre><code class=\"language-bash\">git push origin release/1.0</code></pre>\n\n<p>Khách hàng pilot cập nhật, bug biến mất. An ghi chú trong issue: <em>\"Fixed in release/1.0 via cherry-pick of f4e3d2c\"</em> — truy vết rõ nguồn gốc.</p>\n\n<h2>Khi gặp conflict</h2>\n\n<p>Nếu vùng code ở hai nhánh đã lệch nhau, cherry-pick dừng lại với conflict markers quen thuộc. Quy trình y hệt bài Merge Conflicts:</p>\n\n<pre><code class=\"language-bash\"># sửa file, xóa marker...\ngit add &lt;file&gt;\ngit cherry-pick --continue    # hoặc --abort để hủy sạch sẽ</code></pre>\n\n<h2>Cherry-pick vs Merge vs Rebase</h2>\n\n<table style=\"width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;\">\n  <thead><tr style=\"border-bottom:2px solid var(--border);\"><th style=\"text-align:left;padding:10px;\">Công cụ</th><th style=\"text-align:left;padding:10px;\">Phạm vi</th><th style=\"text-align:left;padding:10px;\">Kết quả</th></tr></thead>\n  <tbody>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\"><code>merge</code> / <code>rebase</code></td><td style=\"padding:10px;\">Toàn bộ branch</td><td style=\"padding:10px;\">Mang hết lịch sử</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\"><code>cherry-pick</code></td><td style=\"padding:10px;\"><strong>Từng commit chọn lọc</strong></td><td style=\"padding:10px;\">Sao chép điểm rời rạc</td></tr>\n  </tbody>\n</table>\n\n<div class=\"callout callout-tip\"><span class=\"callout-icon\">💡</span><div class=\"callout-body\">Cần hơn 2–3 commit liên tiếp? Bạn thực ra cần rebase hoặc merge — cherry-pick hàng loạt làm lịch sử phân mảnh, không ai truy vết nổi nguồn gốc.</div></div>\n\n<h2>Sai lầm thường gặp</h2>\n\n<ul><li>Cherry-pick rồi quên bản gốc → merge sau này gây commit trùng/conflict bất ngờ.</li><li>Dùng cherry-pick thay merge để \"đồng bộ\" thường xuyên → lịch sử thành đám mây mảnh vụn.</li><li>Lưu hash cũ rồi revert/cherry-pick lần nữa bằng hash sai — luôn lấy hash của <strong>bản mới</strong> trên nhánh đích.</li></ul>\n\n<h2>References</h2>\n\n<ul><li><a href=\"https://git-scm.com/book/en/v2/Git-Tools-Advanced-Merging\" target=\"_blank\" rel=\"noopener\">Pro Git 7.x: Cherry Picking</a></li><li><a href=\"https://git-scm.com/docs/git-cherry-pick\" target=\"_blank\" rel=\"noopener\">git-cherry-pick docs</a></li></ul>\n\n<h2>Học tiếp</h2>\n\n<p><a href=\"index.html?topic=git-flow\">Git Flow — Chiến lược phân nhánh cho team</a> — release/1.0 bạn vừa thấy là một phần của mô hình lớn hơn.</p>"
  },
  "git-flow": {
    "title": "Git Flow — Chiến lược phân nhánh cho team",
    "summary": "Team task-board cần quy trình release chính thức: mô hình Git Flow (main/develop/feature/release/hotfix), so sánh với GitHub Flow và Trunk-Based để chọn đúng quy mô.",
    "status": "published",
    "difficulty": "beginner",
    "depth": "lesson",
    "tags": [
      "git",
      "workflow",
      "branching",
      "release"
    ],
    "domain": "Git & GitHub Beginner",
    "module": "Module 04: More Git",
    "prerequisites": [
      "git-branches-merge",
      "git-rebase-merge-squash"
    ],
    "related": [
      "git-pull-request",
      "git-revert-hard-reset"
    ],
    "learningOutcomes": [
      "Vẽ được Git Flow đầy đủ: vai trò từng loại branch và luồng merge.",
      "Đi qua một tính năng từ feature đến release theo từng bước.",
      "Chọn giữa Git Flow / GitHub Flow / Trunk-Based theo quy mô team và nhịp phát hành."
    ],
    "knowledgeGap": "Áp dụng máy móc Git Flow cho team 2 người — chi phí quản lý nhánh vượt lợi ích.",
    "updatedAt": "2026-08-23",
    "readTime": "12 phút",
    "next": "git-rescue-reflog",
    "previous": "git-cherry-pick",
    "content": "<div class=\"callout callout-note\"><span class=\"callout-icon\">ℹ️</span><div class=\"callout-body\"><strong>Bối cảnh:</strong> Task-board có khách hàng pilot chạy trên nhánh <code>release/1.0</code>, trong khi tính năng mới vẫn đổ vào <code>main</code>. An nhận ra: <em>\"Chúng ta đang tự chế quy trình lộn xộn. Cần một mô hình chuẩn.\"</em> Sau bàn bạc, team chọn <strong>Git Flow</strong>.</div></div>\n\n<h2>Vấn đề mà branching model giải quyết</h2>\n\n<p>Khi team chỉ có một <code>main</code>: code chưa ổn định và bản đang chạy trộn lẫn — không biết cắt bản phát hành từ đâu, hotfix dính cả nửa làm dở. Branching model trả lời ba câu hỏi bằng cấu trúc cố định:</p>\n\n<ol><li>Code nào là <strong>bản đang chạy thật</strong>?</li><li>Tính năng mới <strong>tách từ đâu, về đâu</strong>?</li><li>Bản phát hành và hotfix đi <strong>lộ trình nào</strong>?</li></ol>\n\n<h2>Mô hình Git Flow</h2>\n\n<p>Đề xuất bởi Vincent Driessen (2010), gồm hai branch vĩnh viễn và ba loại tạm thời:</p>\n\n<div class=\"mermaid\">\ngraph TD\n    subgraph \"Vĩnh viễn\"\n        MAIN[\"main<br/>bản production, mỗi commit = 1 release (tag)\"]\n        DEV[\"develop<br/>tổng hợp code mới nhất\"]\n    end\n    F[\"feature/*<br/>tách từ develop\"] -->|\"merge khi xong\"| DEV\n    DEV -->|\"cắt bản\"| R[\"release/*<br/>ổn định + test + sửa bug nhỏ\"]\n    R -->|\"merge\"| MAIN\n    R -->|\"merge ngược\"| DEV\n    H[\"hotfix/*<br/>tách từ main khi production lỗi\"] -->|\"merge\"| MAIN\n    H -->|\"merge ngược\"| DEV\n</div>\n\n<table style=\"width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;\">\n  <thead><tr style=\"border-bottom:2px solid var(--border);\"><th style=\"text-align:left;padding:10px;\">Branch</th><th style=\"text-align:left;padding:10px;\">Sinh ra từ</th><th style=\"text-align:left;padding:10px;\">Đổ về</th><th style=\"text-align:left;padding:10px;\">Nhiệm vụ</th></tr></thead>\n  <tbody>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\"><code>main</code></td><td style=\"padding:10px;\">—</td><td style=\"padding:10px;\">—</td><td style=\"padding:10px;\">Bản production; commit nào cũng được tag version (<code>v1.2.0</code>)</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\"><code>develop</code></td><td style=\"padding:10px;\">main</td><td style=\"padding:10px;\">—</td><td style=\"padding:10px;\">Trạng thái tích hợp mới nhất của các tính năng</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\"><code>feature/*</code></td><td style=\"padding:10px;\">develop</td><td style=\"padding:10px;\">develop</td><td style=\"padding:10px;\">Một tính năng riêng lẻ</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\"><code>release/*</code></td><td style=\"padding:10px;\">develop</td><td style=\"padding:10px;\">main + develop</td><td style=\"padding:10px;\">Ổn định hóa: test, bump version, sửa bug nhỏ</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\"><code>hotfix/*</code></td><td style=\"padding:10px;\">main</td><td style=\"padding:10px;\">main + develop</td><td style=\"padding:10px;\">Vá gấp production lỗi</td></tr>\n  </tbody>\n</table>\n\n<h2>Một tính năng đi qua Git Flow — từng bước</h2>\n\n<pre><code class=\"language-bash\"># 1. Tách feature từ develop\ngit switch develop &amp;&amp; git pull\ngit switch -c feature/csv-export\n\n# 2. Làm việc, commit bình thường... đến khi xong\ngit push -u origin feature/csv-export   # PR vào DEVELOP (không phải main)\n\n# 3. Sau khi PR merge, cắt release khi đủ tính năng cho đợt phát hành\ngit switch develop &amp;&amp; git pull\ngit switch -c release/1.1\necho \"1.1.0\" &gt; VERSION                  # bump version, sửa bug nhỏ tại đây\ngit commit -am \"Bump version to 1.1.0\"\n\n# 4. Phát hành: release đổ vào main + đánh tag\ngit switch main\ngit merge --no-ff release/1.1\ngit tag -a v1.1.0 -m \"Release 1.1.0\"\ngit push origin main --tags\n\n# 5. Đồng bộ ngược develop để không mất các fix của release\ngit switch develop\ngit merge --no-ff release/1.1\ngit branch -d release/1.1</code></pre>\n\n<p>Hotfix production thì tách thẳng từ <code>main</code> (<code>git switch -c hotfix/fix-login main</code>), vá xong merge về <strong>cả</strong> main lẫn develop — đúng luồng bạn đã thấy bài cherry-pick dùng để đồng bộ fix sang <code>release/1.0</code>.</p>\n\n<h2>Git Flow có phù hợp với mọi team? Không.</h2>\n\n<p>Ba mô hình phổ biến — chọn theo quy mô và nhịp phát hành:</p>\n\n<table style=\"width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;\">\n  <thead><tr style=\"border-bottom:2px solid var(--border);\"><th style=\"text-align:left;padding:10px;\">Tiêu chí</th><th style=\"text-align:left;padding:10px;\">Git Flow</th><th style=\"text-align:left;padding:10px;\">GitHub Flow</th><th style=\"text-align:left;padding:10px;\">Trunk-Based</th></tr></thead>\n  <tbody>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Số branch thường trực</td><td style=\"padding:10px;\">2</td><td style=\"padding:10px;\">1 (<code>main</code>)</td><td style=\"padding:10px;\">1 (<code>main</code>)</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Phù hợp</td><td style=\"padding:10px;\">Có version release định kỳ, hỗ trợ nhiều bản cùng lúc</td><td style=\"padding:10px;\">Web app deploy liên tục</td><td style=\"padding:10px;\">Team mạnh kỷ luật CI/CD, deploy nhiều lần/ngày</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Chi phí vận hành</td><td style=\"padding:10px;\">Cao nhất</td><td style=\"padding:10px;\">Thấp</td><td style=\"padding:10px;\">Thấp nhất nhưng đòi automation</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Ai đang dùng</td><td style=\"padding:10px;\">Phần mềm cài đặt on-premise</td><td style=\"padding:10px;\">Đa số web startup</td><td style=\"padding:10px;\">Google, Facebook quy mô lớn</td></tr>\n  </tbody>\n</table>\n\n<div class=\"callout callout-tip\"><span class=\"callout-icon\">💡</span><div class=\"callout-body\">Với team nhỏ và sản phẩm web deploy liên tục, <strong>GitHub Flow</strong> (main + feature branch + PR) thường là lựa chọn đúng — chính là những gì bạn đã làm suốt Module 03. Git Flow đáng giá khi có nhu cầu <strong>hỗ trợ nhiều phiên bản</strong> song song như task-board pilot vừa rồi. Vincent Driessen himself đã ghi chú năm 2020: mô hình này dành cho \"run-time software\" chứ không phải web app luôn-deploy.</div></div>\n\n<p>Quyết định của task-board: giữ Git Flow vì có khách pilot cần <code>release/*</code>; nếu sau này chuyển SaaS deploy liên tục → hạ cấp xuống GitHub Flow.</p>\n\n<h2>Sai lầm thường gặp</h2>\n\n<ul><li>Áp dụng Git Flow máy móc cho team 2–3 người không có nhu cầu đa phiên bản — chi phí quản lý nhánh ăn mất lợi ích.</li><li>Quên <strong>merge ngược</strong> release/hotfix về develop → các fix của production biến mất ở chu kỳ sau.</li><li>Feature sống quá lâu (vài tháng) lệch khỏi develop → conflict chồng chất; tách tính năng nhỏ hơn.</li></ul>\n\n<h2>References</h2>\n\n<ul><li><a href=\"https://nvie.com/posts/a-successful-git-branching-model/\" target=\"_blank\" rel=\"noopener\">A successful Git branching model — Vincent Driessen</a></li><li><a href=\"https://docs.github.com/en/get-started/using-github/github-flow\" target=\"_blank\" rel=\"noopener\">GitHub Flow — GitHub Guides</a></li><li><a href=\"https://trunkbaseddevelopment.com/\" target=\"_blank\" rel=\"noopener\">Trunk Based Development</a></li></ul>\n\n<h2>Học tiếp</h2>\n\n<p><a href=\"index.html?topic=git-rescue-reflog\">Cứu hộ — Tìm lại commit đã mất</a>: hôm nay bạn sẽ lỡ tay reset --hard mất nửa ngày code.</p>"
  },
  "git-rebase-merge-squash": {
    "title": "Rebase vs Merge vs Squash",
    "summary": "PR thứ hai của bạn có 6 commit WIP: phân biệt ba cách hợp nhất lịch sử, quy tắc rebase local - merge khi chia sẻ, và squash-and-merge trên GitHub.",
    "status": "published",
    "difficulty": "beginner",
    "depth": "lesson",
    "tags": [
      "git",
      "rebase",
      "merge",
      "squash"
    ],
    "domain": "Git & GitHub Beginner",
    "module": "Module 04: More Git",
    "prerequisites": [
      "git-branches-merge"
    ],
    "related": [
      "git-pull-fetch",
      "git-revert-hard-reset"
    ],
    "learningOutcomes": [
      "Vẽ được kết quả lịch sử của merge / rebase / squash.",
      "Áp quy tắc \"rebase local, merge khi chia sẻ\" vào PR thật.",
      "Dùng pull --rebase để cập nhật nhánh mà không sinh merge commit."
    ],
    "knowledgeGap": "Rebase branch public rồi force push — đồng đội thấy commit nhân bản, conflict ma khắp nơi.",
    "updatedAt": "2026-08-23",
    "readTime": "12 phút",
    "next": "git-stash",
    "previous": "git-revert-hard-reset",
    "content": "<div class=\"callout callout-note\"><span class=\"callout-icon\">ℹ️</span><div class=\"callout-body\"><strong>Bối cảnh:</strong> PR tính năng filter của bạn có lịch sử như sau — An nhìn vào và nhăn mặt:</div></div>\n\n<pre><code>* c9d0e1f (HEAD -&gt; feature/filter) done???\n* b8a7c6d fix typo again\n* a7b6c5d wip\n* f6e5d4c wip2 works maybe\n* e5d4c3b refactor filter logic\n* d4c3b2a start filter</code></pre>\n\n<p><em>\"Sáu commit này merge vào main thì ai đọc nổi gì? Dọn lại đi.\"</em> Bài này trả lời câu hỏi: <strong>lịch sử nên kể câu chuyện thế nào?</strong></p>\n\n<h2>Merge — giữ nguyên sự thật</h2>\n\n<pre><code class=\"language-bash\">git switch main\ngit merge feature/filter</code></pre>\n\n<p>Tạo <strong>merge commit hai cha</strong>, nối đúng như thực tế đã xảy ra:</p>\n\n<div class=\"mermaid\">\ngraph LR\n    A[\"A\"] --> B[\"B\"]\n    B --> M[\"Merge commit\"]\n    B --> F1[\"F1\"] --> F2[\"F2\"] --> M\n</div>\n\n<ul><li><strong>Ưu điểm:</strong> trung thực, không sửa gì, an toàn tuyệt đối trên branch chung.</li><li><strong>Nhược điểm:</strong> lưới lịch sử rối khi nhiều branch song song; mỗi pull mặc định thêm một merge commit nhiễu.</li></ul>\n\n<h2>Rebase — viết lại thành tuyến tính</h2>\n\n<p>Đứng trên nhánh tính năng, \"nhấc\" các commit của mình đặt lên đỉnh mới nhất của main:</p>\n\n<pre><code class=\"language-bash\">git switch feature/filter\ngit rebase main</code></pre>\n\n<div class=\"mermaid\">\ngraph LR\n    A[\"A\"] --> B[\"B\"] --> F1n[\"F1'\"] --> F2n[\"F2'\"]\n    B -.->|\"commit cũ bị bỏ lại\"| X[\"F1\"]\n</div>\n\n<p>Git chép lại từng commit với <strong>hash mới</strong>. Lịch sử thẳng hàng như một truyện tuần tự — nhưng đây chính là điểm nguy hiểm: hash đổi nghĩa là lịch sử bị viết lại.</p>\n\n<div class=\"callout callout-warn\"><span class=\"callout-icon\">⚠️</span><div class=\"callout-body\">Quy tắc vàng: <strong>rebase chỉ dùng cho commit chưa chia sẻ</strong> (chưa push, hoặc nhánh chỉ mình bạn). Rebase nhánh public rồi force push = mọi người khác có commit \"ma\" trùng nội dung nhưng khác hash.</div></div>\n\n<p>Ứng dụng an toàn nhất cho người mới — pull với rebase thay vì merge:</p>\n\n<pre><code class=\"language-bash\">git pull --rebase        # cập nhật feature/filter bằng code mới của main</code></pre>\n\n<p>Không sinh merge commit nhiễu, diff trong PR luôn sạch so với main hiện tại.</p>\n\n<h2>Squash — gộp n commit thành 1</h2>\n\n<p>Squash gộp chuỗi commit thành một commit duy nhất. Cách tương tác:</p>\n\n<pre><code class=\"language-bash\">git rebase -i HEAD~6</code></pre>\n\n<p>Trình soạn thảo mở ra danh sách 6 commit — đổi <code>pick</code> thành <code>squash</code> cho 5 dòng cuối:</p>\n\n<pre><code>pick d4c3b2a start filter\nsquash e5d4c3b refactor filter logic\nsquash f6e5d4c wip2 works maybe\nsquash a7b6c5d wip\nsquash b8a7c6d fix typo again\nsquash c9d0e1f done???</code></pre>\n\n<p>Lưu file → Git mở editor cho bạn <strong>viết message mới đại diện cả chuỗi</strong>:</p>\n\n<pre><code>Add task filtering by assignee and status\n\nFilter dropdown on board header; state persisted in URL query.</code></pre>\n\n<p>Kết quả trên <code>feature/filter</code>: một commit duy nhất, sạch sẽ. Trên GitHub, nút <strong>Squash and merge</strong> làm y hệt tự động lúc merge PR — cách team task-board đang dùng.</p>\n\n<h2>Chọn công cụ nào — bảng quyết định</h2>\n\n<table style=\"width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;\">\n  <thead><tr style=\"border-bottom:2px solid var(--border);\"><th style=\"text-align:left;padding:10px;\">Tình huống</th><th style=\"text-align:left;padding:10px;\">Chọn</th></tr></thead>\n  <tbody>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Hợp nhất nhánh vào main qua PR</td><td style=\"padding:10px;\">Merge hoặc <strong>Squash and merge</strong></td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Nhánh cá nhân cần code mới của main</td><td style=\"padding:10px;\"><code>git rebase main</code> / <code>pull --rebase</code></td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Branch chung nhiều người dùng</td><td style=\"padding:10px;\">Chỉ merge — không bao giờ rebase</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">PR đầy commit WIP</td><td style=\"padding:10px;\">Squash trước khi nhờ review</td></tr>\n  </tbody>\n</table>\n\n<p>Chuẩn của nhiều team (kể cả task-board): <strong>\"rebase local, squash khi merge\"</strong> — bạn thoải mái chỉnh lịch sử riêng đến giây phút mở PR; từ đó lịch sử bất động.</p>\n\n<h2>Sai lầm thường gặp</h2>\n\n<ul><li>Rebase nhánh đã được người khác dựa vào rồi force push → conflict ma, mất việc của đồng đội.</li><li>Sợ rebase vì tưởng xóa commit — commit cũ còn nằm trong reflog (bài cứu hộ), hiểu cơ chế thì hết sợ.</li><li>Squash xong giữ nguyên message <code>\"wip\"</code> — mất trắng giá trị tài liệu của cả chuỗi.</li></ul>\n\n<h2>References</h2>\n\n<ul><li><a href=\"https://git-scm.com/book/en/v2/Git-Branching-Rebasing\" target=\"_blank\" rel=\"noopener\">Pro Git 3.6: Rebasing</a></li><li><a href=\"https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/about-merging-a-pull-request\" target=\"_blank\" rel=\"noopener\">GitHub Docs: About merge methods</a></li></ul>\n\n<h2>Học tiếp</h2>\n\n<p><a href=\"index.html?topic=git-stash\">git stash — Cất tạm thay đổi</a> — giữa chừng dọn nhánh, Bình gọi bạn fix gấp bug hiển thị.</p>"
  },
  "git-repo-performance": {
    "title": "Repository phình to — Nguyên nhân & cách xử lý",
    "summary": "Repo task-board nặng 300MB dù code chỉ 5MB: vì sao binary làm Git phình to, đo bằng count-objects, chữa bằng BFG/LFS và phòng bằng quy tắc commit.",
    "status": "published",
    "difficulty": "beginner",
    "depth": "lesson",
    "tags": [
      "git",
      "performance",
      "lfs",
      "repository"
    ],
    "domain": "Git & GitHub Beginner",
    "module": "Module 04: More Git",
    "prerequisites": [
      "git-gitignore"
    ],
    "related": [
      "git-rescue-reflog",
      "git-what-is-git"
    ],
    "learningOutcomes": [
      "Đo kích thước repo và tìm thủ phạm bằng git count-objects / rev-list.",
      "Giải thích vì sao snapshot khiến binary lặp là kẻ thù số một.",
      "Chữa bằng BFG repo-cleaner; phòng bằng Git LFS cho asset thật sự cần."
    ],
    "knowledgeGap": "Commit ảnh thiết kế/video 'cho tiện' — mỗi lần sửa là thêm snapshot đầy đủ, repo phình theo số lần sửa chứ không phải số file.",
    "updatedAt": "2026-08-23",
    "readTime": "10 phút",
    "next": "git-actions",
    "previous": "git-rescue-reflog",
    "content": "<div class=\"callout callout-note\"><span class=\"callout-icon\">ℹ️</span><div class=\"callout-body\"><strong>Bối cảnh:</strong> An báo cáo trong họp: <em>\"Repo task-board clone mất 4 phút — 300MB. Code chỉ có 5MB. Ai đã nhét gì vào?\"</em> <code>git-sizer</code> chỉ tay vào folder <code>design/</code> chứa file PSD mockup bị commit và <strong>sửa lại nhiều lần</strong>.</div></div>\n\n<h2>Vì sao Git phình to với binary?</h2>\n\n<p>Nhớ mô hình snapshot (Module 01): mỗi commit chụp toàn bộ cây thư mục; file text không đổi được tham chiếu lại, còn <strong>file binary thay đổi thì lưu trùng nguyên vẹn từng phiên bản</strong>:</p>\n\n<div class=\"mermaid\">\ngraph LR\n    C1[\"commit 1<br/>logo.psd 20MB\"] --> C2[\"commit 2<br/>logo.psd 22MB (lưu thêm 22MB)\"]\n    C2 --> C3[\"commit 3<br/>logo.psd 21MB (+21MB nữa)\"]\n</div>\n\n<p>Mười lần chỉnh logo = ~210MB lịch sử chết, dù thư mục hiện tại chỉ cần 1 file. Text source thì ngược lại — diff nhỏ, lưu rẻ. Đó là lý do Git sinh ra cho code.</p>\n\n<h2>Bước 1: Chẩn đoán</h2>\n\n<pre><code class=\"language-bash\">git count-objects -vH</code></pre>\n\n<p>Output quan trọng nhất:</p>\n\n<pre><code>size-pack: 298.44 MiB</code></pre>\n\n<p>Tìm thủ phạm cụ thể — top object to nhất:</p>\n\n<pre><code class=\"language-bash\">git rev-list --objects --all |\n  git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' |\n  awk '/^blob/ {print $3, $4}' | sort -rn | head -10</code></pre>\n\n<pre><code>24576214 design/board-v3.psd\n21345871 design/board-v2.psd\n19876543 design/logo-dark.png\n...</code></pre>\n\n<p>Thủ phạm hiện nguyên hình: các phiên bản PSD/PNG cũ vẫn nằm trong lịch sử.</p>\n\n<h2>Bước 2: Chữa — viết lại lịch sử loại bỏ binary</h2>\n\n<p>Xóa file ở commit mới (như bài .gitignore dạy) <strong>không giảm được dung lượng</strong> — blob cũ vẫn nằm trong lịch sử. Phải viết lại lịch sử bằng công cụ chuẩn:</p>\n\n<p><strong>BFG Repo-Cleaner</strong> — một dòng lệnh thay hàng nghìn bước tay:</p>\n\n<pre><code class=\"language-bash\">bfg --strip-blobs-bigger-than 5M</code></pre>\n\n<p>Sau đó team phải force-push đồng loạt + mọi người re-clone (giống quy trình dọn secret ở bài Security — cùng cơ chế viết lại lịch sử).</p>\n\n<div class=\"callout callout-warn\"><span class=\"callout-icon\">⚠️</span><div class=\"callout-body\">Viết lại lịch sử đổi mọi hash từ điểm can thiệp trở đi. Đây là việc của tech lead (An), thực hiện khi cả team biết rõ, KHÔNG phải thao tác cá nhân tự tiện.</div></div>\n\n<h2>Bước 3: Phòng — quy tắc sống còn</h2>\n\n<p><strong>1. Binary build artifact không bao giờ commit:</strong> <code>dist/</code>, <code>*.apk</code>, <code>node_modules/</code>, file compile — tất cả nằm trong <code>.gitignore</code> ngay ngày đầu.</p>\n\n<p><strong>2. Asset thật sự cần version control → Git LFS</strong> (Large File Storage): Git thay nội dung file bằng con trỏ, dữ liệu nặng nằm riêng:</p>\n\n<pre><code class=\"language-bash\">git lfs install\ngit lfs track \"*.psd\" \"*.mp4\"     # ghi pattern vào .gitattributes\ngit add .gitattributes design/*.psd</code></pre>\n\n<p>LFS phù hợp với asset <em>thiết kế</em> cần lịch sử; nhưng cân nhắc: nhiều dịch vụ tính phí băng thông LFS. Mockup tham khảo có thể dùng Drive/Figma link trong README thay vì commit.</p>\n\n<p><strong>3. Clone nhanh cho CI/máy yếu — shallow clone:</strong></p>\n\n<pre><code class=\"language-bash\">git clone --depth 1 &lt;url&gt;     # chỉ lấy commit mới nhất, bỏ lịch sử</code></pre>\n\n<p>Hữu ích cho pipeline build; không dùng cho máy dev thường xuyên xem log.</p>\n\n<h2>Sai lầm thường gặp</h2>\n\n<ul><li>Xóa file binary ở HEAD rồi tưởng repo gọn — dung lượng nằm ở lịch sử, không phải thư mục hiện tại.</li><li>Commit video demo \"đỡ phải gửi file\" — 50MB × mỗi lần cắt lại = repo chết chậm.</li><li>Dùng <code>--depth 1</code> rồi ngạc nhiên vì <code>git log</code> trống, pull bị lỗi lịch sử nông.</li></ul>\n\n<h2>References</h2>\n\n<ul><li><a href=\"https://git-scm.com/book/en/v2/Git-Internals-Packfiles\" target=\"_blank\" rel=\"noopener\">Pro Git 10.x: Packfiles &amp; maintenance</a></li><li><a href=\"https://git-lfs.github.com/\" target=\"_blank\" rel=\"noopener\">Git LFS docs</a></li><li><a href=\"https://rtyley.github.io/bfg-repo-cleaner/\" target=\"_blank\" rel=\"noopener\">BFG Repo-Cleaner</a></li></ul>\n\n<h2>Học tiếp</h2>\n\n<p>Sang Module 05: <a href=\"index.html?topic=git-actions\">GitHub Actions</a> — để máy tự kiểm tra thay vì loay hoay fix hậu quả.</p>"
  },
  "git-rescue-reflog": {
    "title": "Cứu hộ — Tìm lại commit đã mất",
    "summary": "Lỡ tay reset --hard mất nửa ngày code: git reflog ghi lại mọi di chuyển của HEAD, tìm hash và khôi phục — kèm cứu branch bị xóa.",
    "status": "published",
    "difficulty": "beginner",
    "depth": "lesson",
    "tags": [
      "git",
      "reflog",
      "recovery",
      "debug"
    ],
    "domain": "Git & GitHub Beginner",
    "module": "Module 04: More Git",
    "prerequisites": [
      "git-revert-hard-reset"
    ],
    "related": [
      "git-stash",
      "git-repo-performance"
    ],
    "learningOutcomes": [
      "Dùng reflog tìm commit \"biến mất\" và khôi phục bằng reset/branch.",
      "Cứu nhánh bị xóa nhầm trước khi GC dọn.",
      "Hiểu cửa sổ an toàn mặc định (~90 ngày) và giới hạn của reflog."
    ],
    "knowledgeGap": "Tưởng reset --hard = mất trắng vĩnh viễn nên panic re-clone, tự tay hủy cơ hội cứu.",
    "updatedAt": "2026-08-23",
    "readTime": "11 phút",
    "next": "git-repo-performance",
    "previous": "git-flow",
    "content": "<div class=\"callout callout-note\"><span class=\"callout-icon\">ℹ️</span><div class=\"callout-body\"><strong>Bối cảnh:</strong> Sự cố cá nhân đầu tiên: bạn muốn gỡ commit rác trên nhánh <code>feature/export</code> nhưng gõ nhầm:</div></div>\n\n<pre><code class=\"language-bash\">git reset --hard HEAD~3     # định gỡ 1... lại gỡ 3</code></pre>\n\n<p>Ba commit — <strong>nửa ngày làm việc</strong> — biến mất khỏi <code>git log</code>. Tim đập nhanh. Đừng re-clone, đừng panic. Git có nhật ký đen: <strong>reflog</strong>.</p>\n\n<h2>Nguyên lý: Git không xóa ngay</h2>\n\n<p><code>reset</code> chỉ di chuyển con trỏ branch; các commit cũ vẫn nằm nguyên trong kho object <code>.git</code>. Chúng thành \"mồ côi\" (dangling) và chỉ bị dọn vĩnh viễn bởi garbage collection — mặc định sau khoảng <strong>90 ngày</strong>. Cửa sổ đó là mạng sống của bạn.</p>\n\n<h2>Bước 1: Mở nhật ký HEAD</h2>\n\n<pre><code class=\"language-bash\">git reflog</code></pre>\n\n<p>Output:</p>\n\n<pre><code>1a2b3c4 (HEAD -&gt; feature/export) feature/export@{0}: reset: moving to HEAD~3\nf9e8d7c feature/export@{1}: commit: Add export to CSV button\nc5d6e7f feature/export@{2}: commit: Handle empty selection\na3b4c5d feature/export@{3}: commit: Start export feature</code></pre>\n\n<p>Đọc dòng từ dưới lên: ba commit quý giá (<code>a3b4c5d</code>, <code>c5d6e7f</code>, <code>f9e8d7c</code>) vẫn nằm đây. Hash của đỉnh trước khi lỡ tay là <code>f9e8d7c</code>.</p>\n\n<h2>Bước 2: Khôi phục</h2>\n\n<pre><code class=\"language-bash\">git reset --hard f9e8d7c</code></pre>\n\n<p>Output:</p>\n\n<pre><code>HEAD is now at f9e8d7c Add export to CSV button</code></pre>\n\n<p>Xong. Kiểm tra <code>git log --oneline -4</code> — cả ba commit trở về như chưa có chuyện gì.</p>\n\n<div class=\"callout callout-note\"><span class=\"callout-icon\">ℹ️</span><div class=\"callout-body\"><code>reset --hard</code> để khôi phục an toàn vì working directory hiện không có thay đổi quý giá nào cần giữ. Nếu đang có sửa đổi dở dang khác, dùng <code>git branch rescue f9e8d7c</code> — tạo nhánh neo lấy commit trước đã, xử lý phần còn lại sau.</div></div>\n\n<h2>Tình huống 2: Branch bị xóa nhầm</h2>\n\n<p>Bạn chạy <code>git branch -D feature/filter</code> (chưa merge!). Nhánh biến mất nhưng commit vẫn trong reflog:</p>\n\n<pre><code class=\"language-bash\">git reflog | grep filter      # tìm hash cuối cùng của nhánh đó\ngit switch -c feature/filter &lt;hash&gt;   # dựng lại nhánh tại đúng chỗ</code></pre>\n\n<h2>Tình huống 3: Commit từng nằm ở stash rồi bị drop</h2>\n\n<p>Reflog cũng theo dõi stash:</p>\n\n<pre><code class=\"language-bash\">git fsck --unreachable | grep commit    # liệt kê commit mồ côi mọi nguồn\ngit show &lt;hash&gt;                          # soi nội dung từng cái\ngit stash apply &lt;hash&gt;                   # hồi sinh nếu đúng món cần</code></pre>\n\n<h2>Giới hạn phải biết thẳng thắn</h2>\n\n<ul><li>Reflog là <strong>nhật ký cục bộ</strong> — không được push đi đâu. Máy mới clone không có nó.</li><li>Cửa sổ ~90 ngày với commit thường, ~30 ngày với unreachable — đừng để sự cố ngủ đông quá lâu.</li><li>Nếu commit <strong>chưa từng được commit</strong> (chỉ là file sửa dở) thì reset --hard xóa thật — thứ duy nhất không cứu được qua reflog; stash trước khi làm việc nguy hiểm.</li></ul>\n\n<h2>Sai lầm thường gặp</h2>\n\n<ul><li>Panic rồi <code>rm -rf</code> thư mục + re-clone → tự tay phá kho dữ liệu chứa mọi chứng cứ cứu hộ.</li><li>Chạy <code>git gc --prune=now</code> khi đang hoảng loạn dọn ổ đĩa → đốt cửa sổ 90 ngày ngay lập tức.</li><li>Coi reflog là backup — nó là nhật ký sự cố, không thay thế push đều đặn lên remote.</li></ul>\n\n<h2>References</h2>\n\n<ul><li><a href=\"https://git-scm.com/book/en/v2/Git-Tools-Reset-Demystified#_data_recovery\" target=\"_blank\" rel=\"noopener\">Pro Git 7.x: Data Recovery</a></li><li><a href=\"https://git-scm.com/docs/git-reflog\" target=\"_blank\" rel=\"noopener\">git-reflog docs</a></li></ul>\n\n<h2>Học tiếp</h2>\n\n<p><a href=\"index.html?topic=git-repo-performance\">Repository phình to</a> — sự cố tiếp theo: An báo repo task-board nặng bất thường.</p>"
  },
  "git-revert-hard-reset": {
    "title": "Revert & Hard Reset — Sửa sai an toàn",
    "summary": "Commit của bạn làm vỡ trang board trên main: hai triết lý hoàn tác, vì sao revert là chuẩn trên branch chung, và vùng an toàn duy nhất của reset --hard.",
    "status": "published",
    "difficulty": "beginner",
    "depth": "lesson",
    "tags": [
      "git",
      "revert",
      "reset",
      "undo"
    ],
    "domain": "Git & GitHub Beginner",
    "module": "Module 04: More Git",
    "prerequisites": [
      "git-reset-unstage"
    ],
    "related": [
      "git-cherry-pick",
      "git-stash"
    ],
    "learningOutcomes": [
      "Hoàn tác commit đã push bằng git revert mà không phá lịch sử.",
      "Chọn đúng công cụ theo bảng tình huống.",
      "Thuộc quy tắc vàng: lịch sử chia sẻ chỉ được thêm vào."
    ],
    "knowledgeGap": "reset --hard + force push lên branch chung — hủy lịch sử cả team, mọi người pull về đều vỡ.",
    "updatedAt": "2026-08-23",
    "readTime": "10 phút",
    "next": "git-rebase-merge-squash",
    "previous": "git-security-secrets",
    "content": "<div class=\"callout callout-note\"><span class=\"callout-icon\">ℹ️</span><div class=\"callout-body\"><strong>Bối cảnh:</strong> Sau khi drag-drop được merge, bạn phát hiện commit cuối của mình làm <strong>trắng trang board</strong> trên <code>main</code> — lỗi nghiêm trọng, người dùng không thấy gì. An hỏi lại trong nhóm: <em>\"Ai biết undo commit đã push không?\"</em> Bài này chính là câu trả lời.</div></div>\n\n<h2>Hai triết lý hoàn tác</h2>\n\n<p>Cùng mục tiêu \"hủy commit X\", hai con đường đối lập:</p>\n\n<table style=\"width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;\">\n  <thead><tr style=\"border-bottom:2px solid var(--border);\"><th style=\"text-align:left;padding:10px;\"></th><th style=\"text-align:left;padding:10px;\">git revert</th><th style=\"text-align:left;padding:10px;\">git reset --hard</th></tr></thead>\n  <tbody>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Cơ chế</td><td style=\"padding:10px;\">Thêm commit mới <strong>ngược lại</strong> thay đổi</td><td style=\"padding:10px;\">Di chuyển branch ngược như chưa tồn tại</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Lịch sử</td><td style=\"padding:10px;\">Giữ nguyên + thêm mới</td><td style=\"padding:10px;\">Mất dấu commit cũ</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">An toàn trên branch chung</td><td style=\"padding:10px;\">Có</td><td style=\"padding:10px;\">Không</td></tr>\n  </tbody>\n</table>\n\n<h2>Cách chuẩn trên main: git revert</h2>\n\n<pre><code class=\"language-bash\">git switch main\ngit pull                      # luôn bắt đầu từ code mới nhất\ngit log --oneline -3</code></pre>\n\n<p>Xác định commit gây lỗi:</p>\n\n<pre><code>9a8b7c6 Fix card shadow on hover          &lt;- commit của bạn gây vỡ trang\n7d6e5f4 Merge feature/drag-drop into main\n...</code></pre>\n\n<pre><code class=\"language-bash\">git revert 9a8b7c6</code></pre>\n\n<p>Output:</p>\n\n<pre><code>[main 1f2e3d4] Revert \"Fix card shadow on hover\"\n 1 file changed, 2 deletions(-)</code></pre>\n\n<p>Git tự tính toán <strong>patch ngược</strong> và tạo commit mới. Kiểm tra trang chạy bình thường trở lại rồi push:</p>\n\n<pre><code class=\"language-bash\">git push</code></pre>\n\n<p>Vì sao đây là cách chuẩn? Nhìn log sau đó:</p>\n\n<pre><code>1f2e3d4 Revert \"Fix card shadow on hover\"   &lt;- có, và tại sao\n9a8b7c6 Fix card shadow on hover            &lt;- vẫn còn nguyên</code></pre>\n\n<p>Lịch sử kể trọn chuyện \"đã sai → đã sửa\". Đồng đội pull về <strong>không cần làm gì thêm</strong>. Với task-board, An yêu cầu revert đi kèm issue: <code>\"Revert ... (#34)\"</code> để truy vết được nguyên nhân gốc.</p>\n\n<h2>reset --hard — chỉ cho lịch sử riêng tư</h2>\n\n<p>Tình huống hợp lệ duy nhất ở giai đoạn này: commit thử nghiệm <strong>chưa push</strong>, nằm một mình trên nhánh cá nhân:</p>\n\n<pre><code class=\"language-bash\">git log --oneline -2        # xác nhận commit rác chưa push\ngit reset --hard HEAD~1     # vứt bỏ nó cùng thay đổi</code></pre>\n\n<p>Ba chế độ đầy đủ đã học ở <a href=\"index.html?topic=git-reset-unstage\">Module 02</a>: <code>--soft</code> giữ staged, <code>--mixed</code> (mặc định) giữ working directory, <code>--hard</code> xóa sạch.</p>\n\n<div class=\"callout callout-warn\"><span class=\"callout-icon\">⚠️</span><div class=\"callout-body\"><code>reset --hard</code> xóa thật sự công việc chưa commit. Nếu lỡ tay chạy trên nhánh có code quý giá — đừng panic: commit vẫn nằm trong kho dữ liệu nội bộ và bài <a href=\"index.html?topic=git-rescue-reflog\">Cứu hộ bằng reflog</a> sẽ lấy lại được trong phần lớn trường hợp.</div></div>\n\n<h2>Bảng quyết định nhanh</h2>\n\n<table style=\"width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;\">\n  <thead><tr style=\"border-bottom:2px solid var(--border);\"><th style=\"text-align:left;padding:10px;\">Tình huống</th><th style=\"text-align:left;padding:10px;\">Công cụ</th></tr></thead>\n  <tbody>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Commit sai <strong>đã push</strong> lên branch chung</td><td style=\"padding:10px;\"><code>git revert</code></td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Commit thử nghiệm local chưa push</td><td style=\"padding:10px;\"><code>git reset --hard</code></td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Gỡ commit cuối để viết lại cục bộ</td><td style=\"padding:10px;\"><code>reset --soft/mixed HEAD~1</code></td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Hủy một merge đã push</td><td style=\"padding:10px;\"><code>git revert -m 1 &lt;merge-hash&gt;</code> (đọc kỹ output)</td></tr>\n  </tbody>\n</table>\n\n<p>Quy tắc vàng ghi nhớ cả module: <strong>lịch sử đã chia sẻ thì chỉ được thêm; lịch sử riêng tư thì được viết lại.</strong></p>\n\n<h2>Sai lầm thường gặp</h2>\n\n<ul><li>Revert xong tưởng commit sai \"biến mất\" — nó vẫn trong log kèm commit revert; muốn tìm hiểu nguyên nhân vẫn tra được.</li><li>Dùng force push để \"dọn\" main cho đẹp → đồng đội pull về conflict hàng loạt, CI chết.</li><li>Quên <code>pull</code> trước khi revert → revert một trạng thái cũ, đè mất fix mới của người khác.</li></ul>\n\n<h2>References</h2>\n\n<ul><li><a href=\"https://git-scm.com/book/en/v2/Git-Basics-Undoing-Things\" target=\"_blank\" rel=\"noopener\">Pro Git 2.4: Undoing Things</a></li><li><a href=\"https://git-scm.com/book/en/v2/Git-Tools-Reset-Demystified\" target=\"_blank\" rel=\"noopener\">Pro Git 7.6: Reset Demystified</a></li><li><a href=\"https://docs.github.com/en/pull-requests/committing-changes-to-your-project/viewing-and-comparing-commits/reverting-a-commit\" target=\"_blank\" rel=\"noopener\">GitHub Docs: Reverting a commit</a></li></ul>\n\n<h2>Học tiếp</h2>\n\n<p><a href=\"index.html?topic=git-rebase-merge-squash\">Rebase vs Merge vs Squash</a> — trước khi dọn lịch sử cho người khác đọc, cần phân biệt ba kiểu hợp nhất.</p>"
  },
  "git-stash": {
    "title": "git stash — Cất tạm thay đổi",
    "summary": "Đang sửa dở filter bị gọi fix gấp: cất việc vào ngăn xếp, xử lý nóng, quay lại đúng chỗ — kèm quy tắc phân biệt stash với commit.",
    "status": "published",
    "difficulty": "beginner",
    "depth": "lesson",
    "tags": [
      "git",
      "stash",
      "workflow"
    ],
    "domain": "Git & GitHub Beginner",
    "module": "Module 04: More Git",
    "prerequisites": [
      "git-commit",
      "git-branches-merge"
    ],
    "related": [
      "git-revert-hard-reset",
      "git-pull-fetch"
    ],
    "learningOutcomes": [
      "Cất và lấy lại việc dở bằng stash push -m / stash pop.",
      "Phân biệt stash (tạm, ngoài lịch sử, local) với commit (vĩnh viễn).",
      "Biết -u để cất cả file mới chưa track."
    ],
    "knowledgeGap": "Dùng stash làm kho dài hạn — không được push, đổi máy mất trắng.",
    "updatedAt": "2026-08-23",
    "readTime": "9 phút",
    "next": "git-cherry-pick",
    "previous": "git-rebase-merge-squash",
    "content": "<div class=\"callout callout-note\"><span class=\"callout-icon\">ℹ️</span><div class=\"callout-body\"><strong>Bối cảnh:</strong> Bạn đang sửa dở <code>filter.js</code> (chưa đủ đẹp để commit), thì Bình nhắn khẩn: <em>\"Bug hiển thị trên Safari gấp lắm, fix giúp tao 15 phút.\"</em> Switch nhánh? Git chặn ngay:</div></div>\n\n<pre><code>error: Your local changes to the following files would be overwritten by checkout:\n        js/filter.js\nPlease commit your changes or stash them before you switch branches.</code></pre>\n\n<p>Commit rác <code>\"wip\"</code>? Không. Mất công đã làm? Càng không. Cần <strong>ngăn xếp tạm thời</strong>.</p>\n\n<h2>Bước 1: Cất việc dở</h2>\n\n<pre><code class=\"language-bash\">git stash push -m \"filter dropdown - còn thiếu validate\"</code></pre>\n\n<p>Output:</p>\n\n<pre><code>Saved working directory and index state On feature/filter: filter dropdown - còn thiếu validate</code></pre>\n\n<p>Working directory sạch bong ngay lập tức — xác nhận:</p>\n\n<pre><code class=\"language-bash\">git status        # nothing to commit, working tree clean</code></pre>\n\n<p>Giờ switch nhánh thoải mái, fix bug cho Bình, commit, push.</p>\n\n<h2>Bước 2: Quay lại và lấy việc ra</h2>\n\n<pre><code class=\"language-bash\">git switch feature/filter\ngit stash pop</code></pre>\n\n<p>Output:</p>\n\n<pre><code>On branch feature/filter\nChanges not staged for commit:\n        modified:   js/filter.js\nDropped refs/stash@{0} (a1b2c3d...)</code></pre>\n\n<p><code>filter.js</code> trở về đúng trạng thái dở dang như trước khi đi. <code>pop</code> = lấy ra <strong>và</strong> xóa khỏi ngăn xếp.</p>\n\n<h2>Bộ lệnh đầy đủ</h2>\n\n<pre><code class=\"language-bash\">git stash list                  # xem chồng các bản đã cất\ngit stash apply                 # lấy bản mới nhất nhưng GIỮ trong chồng\ngit stash pop stash@{1}         # lấy bản số 1 (đánh từ 0)\ngit stash drop stash@{0}        # vứt một bản cụ thể\ngit stash -u                    # cất cả file mới chưa track (mặc định bỏ qua!)</code></pre>\n\n<p><code>list</code> hiển thị:</p>\n\n<pre><code>stash@{0}: On feature/filter: filter dropdown - còn thiếu validate\nstash@{1}: WIP on main: b7c8d9e Add empty state</code></pre>\n\n<div class=\"callout callout-tip\"><span class=\"callout-icon\">💡</span><div class=\"callout-body\">Luôn đặt tên bằng <code>-m</code>. Một tuần sau nhìn <code>stash@{0}</code> trống trơn không ai nhớ mình cất gì; message là tấm vé đòi đồ.</div></div>\n\n<h2>Stash khác commit ở chỗ nào?</h2>\n\n<table style=\"width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;\">\n  <thead><tr style=\"border-bottom:2px solid var(--border);\"><th style=\"text-align:left;padding:10px;\"></th><th style=\"text-align:left;padding:10px;\">Commit</th><th style=\"text-align:left;padding:10px;\">Stash</th></tr></thead>\n  <tbody>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Vị trí</td><td style=\"padding:10px;\">Trong lịch sử branch, vĩnh viễn</td><td style=\"padding:10px;\">Ngoài lịch sử, tạm thời</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Chia sẻ qua push</td><td style=\"padding:10px;\">Có</td><td style=\"padding:10px;\">Không — chỉ nằm máy bạn</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Dành cho</td><td style=\"padding:10px;\">Việc hoàn chỉnh có ý nghĩa</td><td style=\"padding:10px;\">Việc dở dang giữa chừng</td></tr>\n  </tbody>\n</table>\n\n<p>Nguyên tắc chọn: thứ gì đáng kể lại câu chuyện dự án → commit. Thứ gì chỉ cần <strong>sống sót qua một lần chuyển ngữ cảnh</strong> → stash.</p>\n\n<h2>Mẫu workflow hoàn chỉnh</h2>\n\n<pre><code class=\"language-bash\"># 14h00 — đang làm feature A\ngit stash push -m \"feature A dở dang\"\n\n# 14h05 — fix nóng trên main\ngit switch main &amp;&amp; git pull\n# ... sửa bug.js, test ...\ngit commit -am \"Fix Safari rendering glitch\" &amp;&amp; git push\n\n# 15h00 — về tiếp việc cũ\ngit switch feature-a\ngit stash pop</code></pre>\n\n<h2>Sai lầm thường gặp</h2>\n\n<ul><li>Stash xong quên bét → một tháng sau <code>stash list</code> thấy hai bản không ai nhận ra; dùng <code>-m</code> và dọn định kỳ.</li><li><code>pop</code> gặp conflict rồi panic — xử lý như merge conflict thường; nếu dùng <code>apply</code> thì bản gốc vẫn còn trong chồng.</li><li>Quên <code>-u</code> nên tưởng stash nuốt mất file mới tạo — file untracked chưa bao giờ được cất.</li></ul>\n\n<h2>References</h2>\n\n<ul><li><a href=\"https://git-scm.com/book/en/v2/Git-Tools-Stashing-and-Cleaning\" target=\"_blank\" rel=\"noopener\">Pro Git 7.3: Stashing</a></li><li><a href=\"https://git-scm.com/docs/git-stash\" target=\"_blank\" rel=\"noopener\">git-stash docs</a></li></ul>\n\n<h2>Học tiếp</h2>\n\n<p><a href=\"index.html?topic=git-cherry-pick\">git cherry-pick</a> — fix timezone của Chi cần vá nóng lên release mà không merge cả nhánh.</p>"
  },
  "git-git-hooks": {
    "title": "Git Hooks — Tự động kiểm tra trước khi push",
    "summary": "CI đỏ mỗi tuần vì ai đó quên lint: gắn script vào pre-commit/pre-push để chặn lỗi ngay trên máy — kèm giới hạn hooks không đi qua Git và cách bù bằng husky.",
    "status": "published",
    "difficulty": "beginner",
    "depth": "lesson",
    "tags": [
      "git",
      "hooks",
      "automation",
      "quality"
    ],
    "domain": "Git & GitHub Beginner",
    "module": "Module 05: More GitHub",
    "prerequisites": [
      "git-commit",
      "git-actions"
    ],
    "related": [
      "git-actions",
      "git-rebase-merge-squash"
    ],
    "learningOutcomes": [
      "Hiểu vòng đời hook: pre-commit, commit-msg, pre-push chạy lúc nào.",
      "Viết một pre-commit hook chặn file .env và chạy lint staged.",
      "Biết hooks không được push qua Git → giải pháp repo-level (husky/core.hooksPath)."
    ],
    "knowledgeGap": "T tưởng hook cài cho cả team — hook nằm trong .git cục bộ, không chia sẻ qua push.",
    "updatedAt": "2026-08-23",
    "readTime": "10 phút",
    "next": "",
    "previous": "git-markdown",
    "content": "<div class=\"callout callout-note\"><span class=\"callout-icon\">ℹ️</span><div class=\"callout-body\"><strong>Bối cảnh:</strong> Tuần thứ ba. Lần thứ hai trong tuần, CI đỏ vì ai đó push code chưa lint. An than: <em>\"Lỗi này đáng bị chặn ngay trên máy chứ không phải chờ CI 3 phút sau mới biết.\"</em> Câu trả lời: <strong>Git Hooks</strong>.</div></div>\n\n<h2>Hooks là gì?</h2>\n\n<p>Hooks là các <strong>script Git tự gọi tại thời điểm xác định</strong> của vòng đời: trước khi tạo commit, sau khi viết message, trước khi push... Chúng nằm trong <code>.git/hooks/</code> của từng repo local. Git giao sẵn các mẫu tên <code>.sample</code> ở đó — xóa đuôi <code>.sample</code> là kích hoạt.</p>\n\n<p>Ba hook dùng nhiều nhất:</p>\n\n<table style=\"width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;\">\n  <thead><tr style=\"border-bottom:2px solid var(--border);\"><th style=\"text-align:left;padding:10px;\">Hook</th><th style=\"text-align:left;padding:10px;\">Chạy khi nào</th><th style=\"text-align:left;padding:10px;\">Dùng để</th></tr></thead>\n  <tbody>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\"><code>pre-commit</code></td><td style=\"padding:10px;\">Trước khi commit được ghi</td><td style=\"padding:10px;\">Lint/format code staged, chặn file cấm</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\"><code>commit-msg</code></td><td style=\"padding:10px;\">Sau khi bạn gõ message</td><td style=\"padding:10px;\">Kiểm tra format message (vd Conventional Commits)</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\"><code>pre-push</code></td><td style=\"padding:10px;\">Trước khi push lên remote</td><td style=\"padding:10px;\">Chạy test nhanh cuối cùng</td></tr>\n  </tbody>\n</table>\n\n<p>Nếu hook thoát với mã lỗi (non-zero), <strong>toàn bộ thao tác bị hủy</strong> — đây chính là cơ chế \"chặn cửa\".</p>\n\n<h2>Bước từng bước: pre-commit cho task-board</h2>\n\n<p><strong>Bước 1</strong> — tạo file <code>.git/hooks/pre-commit</code>:</p>\n\n<pre><code class=\"language-bash\">#!/bin/sh\n# Chặn secret và chạy lint trên file staged\n\nif git diff --cached --name-only | grep -q '^\\.env$'; then\n  echo \"✖ .env không được phép commit!\"\n  exit 1\nfi\n\nnpx eslint $(git diff --cached --name-only --diff-filter=ACM | grep '\\.js$')</code></pre>\n\n<p><strong>Bước 2</strong> — cấp quyền thực thi:</p>\n\n<pre><code class=\"language-bash\">chmod +x .git/hooks/pre-commit</code></pre>\n\n<p><strong>Bước 3</strong> — trải nghiệm bị chặn:</p>\n\n<pre><code class=\"language-bash\">git add .env\ngit commit -m \"oops\"</code></pre>\n\n<p>Output:</p>\n\n<pre><code>✖ .env không được phép commit!</code></pre>\n\n<p>Commit không xảy ra. Hook vừa cứu bạn khỏi sự cố như lần <code>.env</code> bay lên GitHub ở Module 03.</p>\n\n<h2>Giới hạn số một: hooks KHÔNG đi qua Git</h2>\n\n<p>Thư mục <code>.git/</code> không được version control — nghĩa là hook của bạn <strong>không tự xuất hiện trên máy đồng nghiệp</strong> khi họ pull. Đây là điểm bối rối nhất với người mới.</p>\n\n<p>Giải pháp chuẩn trong dự án Node — dùng <strong>husky</strong> quản lý hooks theo repo:</p>\n\n<pre><code class=\"language-bash\">npm install --save-dev husky\nnpx husky init\necho \"npx eslint \\$(git diff --cached --name-only)\" &gt; .husky/pre-commit</code></pre>\n\n<p>Husky đặt <code>core.hooksPath</code> trỏ về folder <code>.husky/</code> <strong>trong repo</strong> → hook đi cùng code, mọi người <code>npm install</code> là có đủ. Các hệ sinh thái khác có tương đương (pre-commit framework cho Python...).</p>\n\n<div class=\"callout callout-tip\"><span class=\"callout-icon\">💡</span><div class=\"callout-body\">Phân vai rõ hai tầng phòng thủ: <strong>hooks = chặn nhanh trên máy cá nhân</strong> (phản hồi tức thì); <strong>GitHub Actions = cổng bắt buộc tập trung</strong> (không ai tắt được). Hooks có thể bị bỏ qua (<code>--no-verify</code>) nên CI vẫn phải tồn tại.</div></div>\n\n<h2>Quy tắc thiết kế hook tốt</h2>\n\n<ul><li><strong>Nhanh</strong>: pre-commit chạy hàng chục lần/ngày — chỉ lint file staged, đừng nhồi cả bộ test nặng (đưa xuống pre-push).</li><li><strong>Sửa giúp thay vì chỉ chặn</strong>: formatter (prettier) tự sửa rồi stage lại dễ chịu hơn \"đỏ lòe bắt tự sửa tay\".</li><li><strong>Bỏ qua được khi cần khẩn cấp</strong>: <code>git commit --no-verify</code> tồn tại cho tình huống thật sự gấp — nhưng đừng thành thói quen.</li></ul>\n\n<h2>Sai lầm thường gặp</h2>\n\n<ul><li>Đặt logic hook phức tạp trong <code>.git/hooks</code> rồi mất sạch khi re-clone — chuyển sang husky/core.hooksPath ngay từ đầu.</li><li>Nhét toàn bộ test suite vào pre-commit → mỗi commit chờ 5 phút, cả team tìm cách vô hiệu hóa hook.</li><li>Tưởng hook của mình chạy cho mọi người — nó chỉ sống trên máy bạn.</li></ul>\n\n<h2>References</h2>\n\n<ul><li><a href=\"https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks\" target=\"_blank\" rel=\"noopener\">Pro Git 8.3: Git Hooks</a></li><li><a href=\"https://git-scm.com/docs/githooks\" target=\"_blank\" rel=\"noopener\">githooks docs</a></li><li><a href=\"https://typicode.github.io/husky/\" target=\"_blank\" rel=\"noopener\">Husky</a></li></ul>\n\n<h2>Học tiếp</h2>\n\n<p>Chúc mừng — bạn đã đi hết lộ trình Git &amp; GitHub Beginner! Quay lại bản đồ domain xem lộ trình chi tiết tiếp theo (roadmap.sh/git-github) hoặc ôn lại module còn lơ mơ.</p>"
  },
  "git-actions": {
    "title": "GitHub Actions — Tự động hóa CI/CD",
    "summary": "Lần đầu PR của bạn bị chặn vì CI đỏ: mô hình Event → Workflow → Job → Step, viết workflow test tối thiểu cho task-board và đọc log khi fail.",
    "status": "published",
    "difficulty": "beginner",
    "depth": "lesson",
    "tags": [
      "github",
      "actions",
      "ci",
      "cd"
    ],
    "domain": "Git & GitHub Beginner",
    "module": "Module 05: More GitHub",
    "prerequisites": [
      "git-pull-request"
    ],
    "related": [
      "git-git-hooks",
      "git-cli"
    ],
    "learningOutcomes": [
      "Mô tả mô hình Event → Workflow → Job → Step.",
      "Viết workflow chạy test tự động mỗi PR và đọc được log khi fail.",
      "Đặt secret đúng chỗ (Repository Secrets), không nằm trong yml."
    ],
    "knowledgeGap": "Đặt sai đường dẫn .github/workflows/ khiến workflow không bao giờ kích hoạt.",
    "updatedAt": "2026-08-23",
    "readTime": "12 phút",
    "next": "git-cli",
    "previous": "git-repo-performance",
    "content": "<div class=\"callout callout-note\"><span class=\"callout-icon\">ℹ️</span><div class=\"callout-body\"><strong>Bối cảnh:</strong> Bạn mở PR tính năng export. Vài giây sau, dưới PR hiện dòng đỏ: <strong>\"All checks have failed — 1 failing check\"</strong>. An chưa đọc code mà đã biết nó vỡ test. Đó là sức mạnh của CI.</div></div>\n\n<h2>Vấn đề mà CI giải quyết</h2>\n\n<p>Không có máy tự kiểm tra: ai cũng phải <em>tự giác</em> chạy test trước khi push — và sẽ có người quên. Bug vào main, cả team dừng việc. CI (Continuous Integration) đảo ngược bài toán: <strong>mọi thay đổi đều bị máy kiểm tra bắt buộc</strong> trước khi được merge; CD (Continuous Deployment) kéo dài thêm: test xong tự deploy.</p>\n\n<h2>Mô hình bốn tầng</h2>\n\n<div class=\"mermaid\">\ngraph LR\n    E[\"Event<br/>push, pull_request...\"] --> W[\"Workflow<br/>.yml trong repo\"]\n    W --> J[\"Job<br/>chạy trên runner VM\"]\n    J --> S1[\"Step\"] --> S2[\"Step\"] --> S3[\"Step\"]\n</div>\n\n<ul><li><strong>Event</strong>: sự kiện khởi phát — push, mở/cập nhật PR, lịch cron...</li><li><strong>Workflow</strong>: file YAML tại <code>.github/workflows/</code> — đường dẫn này cứng, đặt sai là không bao giờ chạy.</li><li><strong>Job</strong>: nhóm bước trên một máy ảo runner (GitHub cấp miễn phí cho repo public).</li><li><strong>Step</strong>: một lệnh shell hoặc một action đóng gói sẵn từ marketplace.</li></ul>\n\n<h2>Bước từng bước: thêm CI cho task-board</h2>\n\n<p>An tạo file <code>.github/workflows/ci.yml</code>:</p>\n\n<pre><code class=\"language-yaml\">name: CI\n\non:\n  pull_request:\n    branches: [main]\n  push:\n    branches: [main]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4        # tải code về runner\n      - uses: actions/setup-node@v4      # cài Node 20\n        with:\n          node-version: 20\n      - run: npm ci                      # cài dependency theo lockfile\n      - run: npm test                    # chạy bộ test</code></pre>\n\n<p>Đọc hiểu từng khối:</p>\n\n<ul><li><code>on</code>: kích hoạt khi có PR vào <code>main</code> hoặc push thẳng lên <code>main</code>.</li><li><code>uses</code>: tái sử dụng action viết sẵn (checkout, setup môi trường) — đừng tự chế những gì cộng đồng đã chuẩn hóa.</li><li><code>run</code>: lệnh shell trực tiếp, chạy tuần tự từ trên xuống; step nào fail là job dừng ngay.</li></ul>\n\n<h2>Bước: trải nghiệm CI đỏ → xanh</h2>\n\n<p>Quay lại PR của bạn — bấm vào check failed:</p>\n\n<pre><code>FAIL  tests/export.test.js\n  ● exports tasks to CSV\n    expect(received).toBe(expected)\n    Expected: \"title,assignee\"\n    Received: undefined</code></pre>\n\n<p>Log chỉ rõ file, tên test, expected vs received. Sửa code, <code>git push</code> — CI tự chạy lại, vòng tròn xanh:</p>\n\n<pre><code>✓ test (12s) — All checks have passed</code></pre>\n\n<p>An approve, merge. Từ giờ <strong>CI xanh là điều kiện merge</strong> (branch protection) — chất lượng không phụ thuộc ý thức cá nhân ai nữa.</p>\n\n<h2>Giá trị mở rộng khi quen dùng</h2>\n\n<ul><li><strong>Deploy tự động</strong>: merge vào main → workflow build + publish lên hosting.</li><li><strong>Cửa kiểm bổ sung</strong>: lint, audit dependency, kiểm tra secret (gitleaks) — mỗi thứ một job.</li><li><strong>Việc nhàm chán thành mã hóa</strong>: gắn label, tạo release note, chào contributor mới.</li></ul>\n\n<div class=\"callout callout-warn\"><span class=\"callout-icon\">⚠️</span><div class=\"callout-body\">Secret (API key, token deploy) KHÔNG BAO GIỜ viết trong file yml — repo public thì lộ ngay. Đặt ở Settings → Secrets and variables → Actions, tham chiếu qua <code>${{ secrets.TEN_BIEN }}</code>.</div></div>\n\n<h2>Sai lầm thường gặp</h2>\n\n<ul><li>Đặt file ngoài <code>.github/workflows/</code> rồi thắc mắc workflow im lặng.</li><li>Viết workflow 200 dòng trước khi bản 4 bước chạy xanh — luôn bắt đầu tối thiểu rồi mở rộng.</li><li>Cache bỏ qua: mỗi lần chạy <code>npm ci</code> từ trắng tốn vài phút — học dùng <code>actions/cache</code> khi đã quen.</li></ul>\n\n<h2>References</h2>\n\n<ul><li><a href=\"https://docs.github.com/en/actions/understanding-github-actions\" target=\"_blank\" rel=\"noopener\">GitHub Docs: Understanding GitHub Actions</a></li><li><a href=\"https://github.com/marketplace?type=actions\" target=\"_blank\" rel=\"noopener\">Actions marketplace</a></li></ul>\n\n<h2>Học tiếp</h2>\n\n<p><a href=\"index.html?topic=git-cli\">GitHub CLI</a> — thao tác với PR và checks mà không cần rời terminal.</p>"
  },
  "git-cli": {
    "title": "GitHub CLI — Thao tác GitHub từ terminal",
    "summary": "Một ngày làm việc của bạn chỉ với gh: tạo PR, theo dõi checks, checkout PR đồng nghiệp để test, merge — phân biệt rõ việc của git và gh.",
    "status": "published",
    "difficulty": "beginner",
    "depth": "lesson",
    "tags": [
      "github",
      "cli",
      "gh",
      "tooling"
    ],
    "domain": "Git & GitHub Beginner",
    "module": "Module 05: More GitHub",
    "prerequisites": [
      "git-github-account",
      "git-pull-request"
    ],
    "related": [
      "git-actions",
      "git-remote-push"
    ],
    "learningOutcomes": [
      "Cài gh, đăng nhập một lần bằng gh auth login.",
      "Tạo - theo dõi - merge PR ngay trong terminal.",
      "Dùng gh pr checkout để test code PR của người khác."
    ],
    "knowledgeGap": "Nhầm gh với git — gh commit không tồn tại; quản lý repo vẫn là việc của git.",
    "updatedAt": "2026-08-23",
    "readTime": "9 phút",
    "next": "git-markdown",
    "previous": "git-actions",
    "content": "<div class=\"callout callout-note\"><span class=\"callout-icon\">ℹ️</span><div class=\"callout-body\"><strong>Bối cảnh:</strong> An quan sát bạn suốt buổi sáng: push → mở tab web → tạo PR → quay lại terminal → lại mở web xem CI... <em>\"Cài <code>gh</code> đi. Đỡ phải nhảy múa giữa hai cửa sổ.\"</em></div></div>\n\n<h2>Phân biệt git và gh — một lần cho đủ</h2>\n\n<table style=\"width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;\">\n  <thead><tr style=\"border-bottom:2px solid var(--border);\"><th style=\"text-align:left;padding:10px;\"></th><th style=\"text-align:left;padding:10px;\">git</th><th style=\"text-align:left;padding:10px;\">gh</th></tr></thead>\n  <tbody>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Quản lý</td><td style=\"padding:10px;\">Repository (commit, branch)</td><td style=\"padding:10px;\">Nền tảng GitHub (PR, issue, release)</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Offline</td><td style=\"padding:10px;\">Có</td><td style=\"padding:10px;\">Không</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Ví dụ</td><td style=\"padding:10px;\"><code>git commit</code>, <code>git branch</code></td><td style=\"padding:10px;\"><code>gh pr create</code>, <code>gh issue list</code></td></tr>\n  </tbody>\n</table>\n\n<p>Hai công cụ bổ sung, không thay thế nhau.</p>\n\n<h2>Bước 1: Cài và đăng nhập</h2>\n\n<pre><code class=\"language-bash\">brew install gh        # macOS (Windows: winget install GitHub.cli)\ngh auth login</code></pre>\n\n<p>Trả lời vài câu hướng dẫn (GitHub.com → SSH → Login with browser). Xác nhận:</p>\n\n<pre><code class=\"language-bash\">gh auth status</code></pre>\n\n<pre><code>github.com\n  ✓ Logged in to github.com account hazu (keyring)</code></pre>\n\n<p><code>gh</code> nhận biết repo hiện tại qua remote <code>origin</code> — luôn đứng đúng thư mục dự án.</p>\n\n<h2>Bước 2: Một ngày làm việc chỉ với gh</h2>\n\n<p><strong>Sáng — tạo PR cho tính năng export:</strong></p>\n\n<pre><code class=\"language-bash\">gh pr create --title \"Add CSV export for task list\" --fill</code></pre>\n\n<p>Output:</p>\n\n<pre><code>Creating pull request for feature/export into main in an-dev/task-board\n\nhttps://github.com/an-dev/task-board/pull/42</code></pre>\n\n<p><code>--fill</code> tự điền tiêu đề/nội dung từ commit message.</p>\n\n<p><strong>Theo dõi CI không cần mở web:</strong></p>\n\n<pre><code class=\"language-bash\">gh pr checks 42</code></pre>\n\n<pre><code>✓ test   12s   https://github.com/an-dev/task-board/actions/runs/123</code></pre>\n\n<p><strong>Chiều — review PR của Chi:</strong></p>\n\n<pre><code class=\"language-bash\">gh pr list                       # PR đang mở trong repo\ngh pr checkout 41                # kéo code PR #41 về máy chạy thử\nnpm test                         # test trên máy mình trước khi comment\ngh pr diff 41                    # xem nhanh diff trong terminal\ngh pr review 41 --approve -b \"LGTM, filter hoạt động tốt\"</code></pre>\n\n<p><code>checkout</code> là lệnh đáng giá nhất quy trình review — test code người khác mà họ không cần làm gì thêm.</p>\n\n<p><strong>Cuối ngày — merge khi được approve:</strong></p>\n\n<pre><code class=\"language-bash\">gh pr merge 42 --squash --delete-branch</code></pre>\n\n<p>Squash-merge + xóa nhánh remote + local một phát ăn ngay.</p>\n\n<h2>Bộ lệnh phụ hay dùng</h2>\n\n<pre><code class=\"language-bash\">gh repo clone an-dev/task-board    # ngắn hơn git clone full-url\ngh issue create -t \"Bug: ...\" -b \"Mô tả\"\ngh browse                          # mở trang repo hiện tại trên web\ngh release create v1.1.0           # tạo release kèm tag</code></pre>\n\n<h2>Khi nào vẫn nên dùng web?</h2>\n\n<p>Review thảo luận dài, chỉnh sửa mô tả phức tạp, cấu hình repo — giao diện web vẫn tiện hơn. <code>gh</code> mạnh nhất ở các thao tác <strong>lặp lại hàng giờ</strong>: create/check/merge PR.</p>\n\n<div class=\"callout callout-tip\"><span class=\"callout-icon\">💡</span><div class=\"callout-body\">Quy trình review chuẩn của team task-board giờ là: <code>gh pr list</code> → <code>gh pr checkout &lt;số&gt;</code> → chạy thử → <code>gh pr review</code>. Mọi thứ nằm trong một terminal.</div></div>\n\n<h2>Sai lầm thường gặp</h2>\n\n<ul><li>Gõ <code>gh commit</code> — không tồn tại; commit là việc của <code>git</code>.</li><li>Chưa <code>auth login</code> đã gõ lệnh → mọi thứ báo lỗi xác thực.</li><li><code>gh pr merge</code> mà chưa nhìn <code>gh pr checks</code> — tiện quá hóa bỏ qua cửa kiểm tra.</li></ul>\n\n<h2>References</h2>\n\n<ul><li><a href=\"https://cli.github.com/manual/\" target=\"_blank\" rel=\"noopener\">GitHub CLI manual</a></li><li><a href=\"https://docs.github.com/en/github-cli/github-cli/about-github-cli\" target=\"_blank\" rel=\"noopener\">GitHub Docs: Using GitHub CLI</a></li></ul>\n\n<h2>Học tiếp</h2>\n\n<p><a href=\"index.html?topic=git-markdown\">Markdown</a> — viết README tử tế cho task-board trước khi mở nguồn.</p>"
  },
  "git-markdown": {
    "title": "Markdown — Ngôn ngữ viết của GitHub",
    "summary": "Viết README thật cho task-board: cú pháp lõi 15 phút, GitHub Flavored Markdown (task list, table, collapse) và quy tắc xuống dòng hay gãy.",
    "status": "published",
    "difficulty": "beginner",
    "depth": "lesson",
    "tags": [
      "markdown",
      "github",
      "documentation"
    ],
    "domain": "Git & GitHub Beginner",
    "module": "Module 05: More GitHub",
    "prerequisites": [
      "git-create-repository"
    ],
    "related": [
      "git-cli",
      "git-git-hooks"
    ],
    "learningOutcomes": [
      "Dùng thành thạo heading, list, link, bảng, code block có ngôn ngữ.",
      "Áp dụng GFM: task list, @mention, auto-link issue, details.",
      "Viết README chuẩn bốn phần cho một dự án thật."
    ],
    "knowledgeGap": "Xuống dòng đơn tưởng là đoạn mới — render dính thành một dòng dài bất tận.",
    "updatedAt": "2026-08-23",
    "readTime": "10 phút",
    "next": "git-git-hooks",
    "previous": "git-cli",
    "content": "<div class=\"callout callout-note\"><span class=\"callout-icon\">ℹ️</span><div class=\"callout-body\"><strong>Bối cảnh:</strong> Task-board sắp public (đã thêm license ở Module 03). An giao việc cuối cùng trước khi công bố: <em>\"README giờ còn mỗi dòng 'task board app'. Viết lại đi — nó là trang chủ của dự án.\"</em></div></div>\n\n<h2>Vấn đề mà Markdown giải quyết</h2>\n\n<p>Mọi dự án cần văn bản sống cùng code: README, mô tả PR/Issue, tài liệu. Word/PDF không render trên web, không diff được. Markdown là định dạng <strong>viết bằng text thuần nhưng hiển thị đẹp</strong>: mọi file <code>.md</code> trên GitHub tự chuyển thành HTML.</p>\n\n<h2>Cú pháp lõi qua chính README task-board</h2>\n\n<p>Đây là khung README bạn sẽ viết:</p>\n\n<pre><code class=\"language-markdown\"># Task Board\n\nỨng dụng quản lý công việc nhóm: Kanban đơn giản với\nkéo thả, lọc theo người thực hiện và xuất CSV.\n\n**Cài đặt**\n</code></pre>\n\n<p>npm install npm run dev</p>\n\n<pre><code>\n**Tính năng**\n\n- Kéo thả sắp xếp thứ tự task\n- Lọc theo assignee / trạng thái\n- Xuất danh sách ra CSV\n\n**Vấn đề?** Mở [issue mới](../../issues) kèm bước tái hiện.</code></pre>\n\n<p>Ba quy tắc hay gãy nhất:</p>\n\n<ol><li><strong>Xuống dòng đơn trong cùng đoạn dính liền</strong> khi render — cần <em>dòng trống</em> để tách đoạn.</li><li><strong>Code block phải khai báo ngôn ngữ</strong> (``<code>bash, </code>``javascript...) để có tô màu; thiếu là thành khối chữ đen xì.</li><li><strong>Heading không nhảy cấp</strong> (<code>#</code> → <code>###</code>) — vỡ mục lục tự động GitHub sinh ở góc phải.</li></ol>\n\n<h2>GitHub Flavored Markdown (GFM)</h2>\n\n<p>GitHub mở rộng chuẩn gốc bằng các tính năng dùng hằng ngày trong Issue/PR:</p>\n\n<p><strong>Task list</strong> — checklist tick được ngay trong PR (An dùng để duyệt checklist review):</p>\n\n<pre><code class=\"language-markdown\">- [x] Thêm filter dropdown\n- [x] Persist trạng thái vào URL\n- [ ] Viết test cho edge case</code></pre>\n\n<p><strong>Auto-link &amp; mention</strong>: gõ <code>#12</code> thành link issue 12; <code>@an-dev</code> tag người nhận thông báo. Trong commit message cũng hoạt động — commit fix bug nên nhắc <code>Fixes #7</code> để GitHub tự đóng issue khi merge.</p>\n\n<p><strong>Bảng so sánh</strong> (như các bảng bạn thấy suốt khóa học):</p>\n\n<pre><code class=\"language-markdown\">| Trạng thái | Ai chịu trách nhiệm |\n|---|---|\n| To do | — |\n| In progress | Tên người đang làm |</code></pre>\n\n<p><strong>Collapse section</strong> — giấu log dài trong bug report:</p>\n\n<pre><code class=\"language-markdown\">&lt;details&gt;\n&lt;summary&gt;Full stack trace&lt;/summary&gt;\n\nTypeError: cannot read properties of undefined...\n&lt;/details&gt;</code></pre>\n\n<h2>Cấu trúc README chuẩn bốn phần</h2>\n\n<p>Kết quả cuối cùng bạn commit lên repo (qua PR luôn — văn bản cũng phải review):</p>\n\n<table style=\"width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;\">\n  <thead><tr style=\"border-bottom:2px solid var(--border);\"><th style=\"text-align:left;padding:10px;\">Phần</th><th style=\"text-align:left;padding:10px;\">Nội dung</th></tr></thead>\n  <tbody>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Tiêu đề + một câu</td><td style=\"padding:10px;\">Dự án làm gì, cho ai</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Cài đặt</td><td style=\"padding:10px;\">Lệnh chạy từ zero đến chạy được</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Sử dụng</td><td style=\"padding:10px;\">Ví dụ ngắn kèm screenshot/GIF nếu có UI</td></tr>\n    <tr style=\"border-bottom:1px solid var(--border);\"><td style=\"padding:10px;\">Đóng góp + License</td><td style=\"padding:10px;\">Link CONTRIBUTING, loại license</td></tr>\n  </tbody>\n</table>\n\n<div class=\"callout callout-tip\"><span class=\"callout-icon\">💡</span><div class=\"callout-body\">README là <strong>cửa vào</strong>, không phải toàn bộ tài liệu. Chi tiết kiến trúc, API... tách sang thư mục <code>docs/</code> rồi link từ README.</div></div>\n\n<h2>Sai lầm thường gặp</h2>\n\n<ul><li>Nhúng ảnh bằng đường dẫn máy cá nhân (<code>C:\\Users\\...\\img.png</code>) — commit ảnh vào repo, tham chiếu đường dẫn tương đối <code>docs/screenshot.png</code>.</li><li>README nghìn dòng — người đọc bỏ giữa chừng; tách bớt sang docs/.</li><li>Quên cập nhật README khi lệnh cài đặt đổi — sai lệch docs còn nguy hiểm hơn thiếu docs.</li></ul>\n\n<h2>References</h2>\n\n<ul><li><a href=\"https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax\" target=\"_blank\" rel=\"noopener\">Basic writing and formatting syntax — GitHub Docs</a></li><li><a href=\"https://commonmark.org/\" target=\"_blank\" rel=\"noopener\">CommonMark spec</a></li></ul>\n\n<h2>Học tiếp</h2>\n\n<p><a href=\"index.html?topic=git-git-hooks\">Git Hooks</a> — bài cuối: chặn lỗi ngay trên máy trước cả CI.</p>"
  }
};
