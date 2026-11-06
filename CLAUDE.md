# Knowledge OS — hướng dẫn cho Claude Code

Kho tri thức IT cá nhân, viết bằng **tiếng Việt** (giữ nguyên thuật ngữ, API, tên công nghệ bằng tiếng Anh). Không phải blog, không phải docs: mục tiêu là giúp người học hiểu **bản chất** và **mối liên hệ** giữa các Topic.

Bộ quy tắc đầy đủ nằm trong `.agents/` (dùng chung với OpenCode qua `opencode.json`). File này là bản tóm tắt để làm việc; khi task đụng tới khu vực nào thì **đọc file chi tiết tương ứng** trong bảng "Đọc thêm khi cần" ở dưới.

## Kiến trúc 4 tầng

| Tầng | Vị trí | Vai trò |
|---|---|---|
| Knowledge | `knowledge/`, `ios/docs`, `flutter/docs`, `leetcode/docs` | Markdown + frontmatter — nguồn gốc tri thức |
| Map | `map/*_mkdocs.yml` | Mục lục (`nav`) từng domain, đánh số chapter (vd `4.1.1.1`) |
| Presentation | `website/` | Site tĩnh HTML/JS thuần, deploy GitHub Pages khi push `main` |
| Authoring | `.agents/`, `tools/` | Rules/workflows cho agent, script generate & verify |

Phân cấp tri thức: **Domain → Module → Topic → Resource** (Lesson, Diagram, Quiz, Flashcard, Reference). Một Topic = một khái niệm chính; quá lớn thì tách.

## Mỗi domain: nguồn, website, cách đồng bộ

| Domain | Markdown nguồn | Website content | Đồng bộ MD → web | Verify |
|---|---|---|---|---|
| Android | `knowledge/android/docs/` | `website/android-content.js` | **Script theo session**: `node tools/sync_android_session.js <NN>` (`--check` để xem lệch; tự chặn nếu entry sẽ mất sơ đồ chưa đánh dấu trong Markdown). Session chưa chuẩn hoá vẫn sửa tay | `node tools/verify-android-topics.js` |
| iOS | `ios/docs/` | `website/ios-content.js` | Thủ công | `node tools/verify-ios-topics.js` |
| Flutter | `flutter/docs/` | `website/flutter-content.js` | Thủ công | — |
| Git | `knowledge/git-beginner/` | `website/git-content.js` | **Generator**: `node tools/gen_git_content.js` | — |
| Design Principles (OODP) | `knowledge/design-principles/` | `website/oodp-content.js` | **Generator**: `node tools/gen_oodp_content.js` | — |
| DSA | dịch từ hello-algo (`/Users/hazu/Desktop/dsa/hello-algo/en`) | `website/dsa-content*.js` (chia theo chương) | Thủ công theo workflow `dsa-hello` | `node tools/verify-chapters.js [chapter]` |
| LeetCode | `leetcode/docs/level_*/` + `leetcode/data/*.json` | `website/leetcode-content.js`, `leetcode-problems.js` | `python3 tools/sync_leetcode.py` (metadata) | `python3 tools/verify_leetcode_sync.py` |

Điều hướng/sidebar của website nằm trong `KNOWLEDGE_DATA` ở `website/app.js`.

## Quy tắc bắt buộc (tóm tắt từ `.agents/rules/`)

1. **Markdown là Single Source of Truth.** Một kiến thức chỉ tồn tại ở một nơi; tham chiếu thay vì sao chép. Với domain có generator, **không sửa tay** `git-content.js` / `oodp-content.js` — sửa Markdown rồi chạy generator. Với domain thủ công, sửa Markdown **và** entry JS tương ứng trong cùng một thay đổi để không lệch nhau.
2. **Không sửa `nav` trong `map/*_mkdocs.yml`** nếu người dùng chưa đồng ý — có nghi vấn thì hỏi.
3. **Frontmatter là contract.** Không tự thêm field mới; dùng snake_case trong Markdown (`learning_outcomes`, `knowledge_gap`, `estimated_reading_time`), camelCase trong JS (`learningOutcomes`, `knowledgeGap`, `estimatedReadingTime`). Liên kết giữa Topic bằng `id`/`slug`, không bằng đường dẫn. Chi tiết: `.agents/rules/06-frontmatter-standard.md`.
4. **Cách viết**: bắt đầu từ vấn đề → bản chất → cách hoạt động → ví dụ → khi nào dùng/không dùng → sai lầm thường gặp. Thuật ngữ lần đầu: `StateFlow (Luồng trạng thái)`, sau đó dùng tiếng Anh. Không dịch thuật ngữ đã phổ biến (key-value **không** thành "khoá - giá trị"). Ví dụ code dùng ngữ cảnh dự án thật, không `foo`/`bar`/`Animal`.
   - **Người đọc** là developer học để củng cố, hiểu bản chất và **dùng được**: mỗi Topic trả lời "bản chất là gì" và "áp dụng vào app thế nào".
   - **Một định nghĩa chuẩn mỗi Topic** (mục "X là gì?", 1–2 câu + tối đa một mental model); summary, outcomes, giải thích, diagram, tổng kết phải khớp nó.
   - **Kiến thức tổng quát, ví dụ theo từng kiến thức**: vấn đề, định nghĩa, outcomes viết tổng quát, không gắn vào app cụ thể. Không dùng app mẫu chung: mỗi ví dụ code chọn bài toán thực tế hợp nhất với kiến thức nó minh hoạ (`#### Ví dụ: <bài toán>`), mục đích là giải thích luồng chạy. Chi tiết: rule 07, `.agents/playbooks/write-example.md`.
   - **Ưu tiên giải thích, có sơ đồ luồng chạy**: code mô tả logic đi theo thứ tự giải thích các bước đánh số → sơ đồ luồng chạy (sequence / flowchart / state) cùng số → code với comment `// (n)` khớp bước. Code không có luồng (cấu hình, khai báo) thì không cần sơ đồ.
5. **Markdown**: một `#` duy nhất, heading tăng tuần tự, code block luôn có ngôn ngữ, ảnh có alt text.
6. **Chính xác hơn đơn giản.** Không chắc thì nói rõ; ưu tiên nguồn Official Docs/RFC và ghi References.
7. **Thay đổi nhỏ, kiểm chứng được, đảo ngược được.** Trước khi sửa cấu trúc/dữ liệu, nêu phạm vi ảnh hưởng và rủi ro (`.agents/rules/03-risk-analysis.md`). Không để repo ở trạng thái dở dang.
8. **Con người duyệt cuối** cho publish, diagram, quiz, roadmap.

## Bẫy kỹ thuật hay gặp

- Nội dung bài học nằm trong **template literal** JS: `${...}` sẽ bị thực thi và `\(` bị nuốt thành `(` (lỗi Swift `\(name)`). Phải viết `\\(` và escape `${`. Guard: `node tools/check_content_escapes.js` — chạy trong pre-commit hook (`git config core.hooksPath tools/githooks`) và trong CI trước khi deploy.
- Sau khi sửa file JS của website: `node -c website/<file>.js`, rồi mở trang tương ứng để kiểm tra không có lỗi runtime (Puppeteer có sẵn trong `node_modules`).
- Diagram trên website hiện là **SVG vẽ tay** trong `website/diagrams/` (có bản `-dark`), vẽ bằng skill `.agents/skills/diagram-design` (style guide đã theo màu site), bản light sinh bằng `tools/gen-dd-light.py`. Markdown giữ Mermaid làm nguồn, đánh dấu `<!-- dd: <slug> -->` sau khối Mermaid; website hiện SVG thay cho Mermaid đó.
- **Sơ đồ tương tác bằng Archify** (skill cục bộ `.claude/skills/archify`, không commit): nguồn `<docs>/<session>/diagrams/<slug>.archify.json`, HTML build ra ở `website/archify/<domain>/`, Markdown đánh dấu bằng `<!-- archify: <slug> | <tiêu đề> -->` sau khối Mermaid; trên website sơ đồ archify hiện thẳng trong bài thay cho Mermaid đó. Quy trình đầy đủ ở `.agents/workflows/create-diagram.md`. Mỗi file HTML khoảng 800 KB, chỉ dùng cho sơ đồ nhiều bước cần tương tác.
- Bỏ qua `.DS_Store`, `.mimosa/`, `.video_agent/` — không commit.

## Workflows (slash command)

Các workflow chính có lệnh tương ứng trong `.claude/commands/`. Mỗi lệnh chỉ trỏ tới file workflow gốc trong `.agents/workflows/` — muốn đổi quy trình thì sửa file workflow, không sửa command.

| Lệnh | Workflow | Dùng khi |
|---|---|---|
| `/learn-android <topic>` | `learn-android.md` | Topic Android chuyên sâu (MD + JS + metadata + verify) |
| `/practical-topic <topic hoặc chapter id>` | `practical-topic.md` | Bài thực chiến "What → When → Code"; **phải dừng hỏi người dùng** ở Bước 1 và 2.1 |
| `/dsa-hello <chapter>` | `dsa-hello.md` | Dịch chương hello-algo, có `originalContent` + widget mô phỏng |
| `/refactor-topic <topic>` | `refactor-topic.md` | Tái cấu trúc không đổi kiến thức |
| `/review-topic <topic>` | `review-topic.md` | Rà soát chất lượng, báo cáo theo Critical/Major/Minor |
| `/create-quiz`, `/create-diagram`, `/create-roadmap` | cùng tên | Tạo Resource cho Topic |
| `/publish-topic <topic>` | `publish-topic.md` | Chuyển nháp → published, chờ người dùng xác nhận |

## Đọc thêm khi cần

| Khi làm | Đọc |
|---|---|
| Quyết định kiến trúc, đổi cấu trúc thư mục/dữ liệu | `.agents/rules/01-system-thinking.md`, `02-decision-making.md`, `03-risk-analysis.md`, `04-content-architecture.md` |
| Viết/sửa bài | `.agents/rules/05-markdown-standard.md`, `07-writing-style.md`, `10-quality-standard.md`, `.agents/templates/lesson.md`, `.agents/playbooks/write-example.md` |
| Sửa frontmatter | `.agents/rules/06-frontmatter-standard.md` |
| Sửa code website/tools | `.agents/rules/08-code-standard.md` |
| Giải thích, so sánh, trade-off, ví dụ, diagram | `.agents/playbooks/*.md` |
| Thuật ngữ dự án | `.agents/context/terminology.md` |

`.agents/skills/` là các skill thiết kế UI cài từ bên ngoài (theo `skills-lock.json`), chỉ dùng khi làm giao diện website.
