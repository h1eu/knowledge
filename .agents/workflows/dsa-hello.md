---
description: Quy trình chuyển nội dung từ Hello Algo sang project, đảm bảo dịch đầy đủ, hỗ trợ đối chiếu bản gốc và tạo mô phỏng thuật toán động.
---

# Workflow: DSA Hello

## Mục đích

Định nghĩa quy trình chuẩn để nhập và chuyển đổi nội dung từ kho `hello-algo` sang hệ thống Knowledge OS.

Quy trình đảm bảo:
- Dịch đầy đủ, không bỏ sót bất kỳ đoạn nào so với bản gốc.
- Người học có thể đối chiếu giữa bản tiếng Việt và bản gốc tiếng Anh ngay trên giao diện.
- Các khái niệm có thể mô phỏng được thì kèm theo widget JS chạy tự động (auto-run) để minh họa thuật toán.

## Khi nào sử dụng

- Khi cần nhập một chapter hoặc topic mới từ `hello-algo` vào hệ thống.
- Khi phát hiện nội dung hiện có bị thiếu so với bản gốc.
- Khi cần cập nhật bản dịch khi bản gốc thay đổi.

## Input

| Tham số | Mô tả |
|---|---|
| `folder_root` | `/Users/hazu/Desktop/dsa/hello-algo/en` — thư mục gốc chứa toàn bộ nội dung tiếng Anh |
| `mkdocs.yml` | `/Users/hazu/Desktop/dsa/hello-algo/en/mkdocs.yml` — mục lục chuẩn, luôn tham chiếu khi xác định chapter |
| `chapter_keyword` | Từ khóa chapter do người dùng nhập (ví dụ: `complexity`, `array`, `introduction`) |
| `target_domain` | Domain đích trong hệ thống (ví dụ: `algorithms`) |

## Output

- File nội dung tiếng Việt (`dsa-content.js` hoặc file topic `.md`) có cấu trúc chuẩn.
- Asset (hình ảnh, sơ đồ) được giữ nguyên theo đúng path.
- Widget JS mô phỏng thuật toán với chế độ auto-run, nếu topic có thể mô phỏng được.

## Các bước thực hiện

### Bước 1 — Xác định chapter từ keyword

1. Đọc `mkdocs.yml` để lấy danh sách chapter và ánh xạ sang đường dẫn file.
2. Tìm chapter phù hợp với `chapter_keyword` do người dùng cung cấp.
3. Liệt kê tất cả file `.md` thuộc chapter đó trong `folder_root`.

### Bước 2 — Kiểm kê nội dung trước khi dịch

Trước khi dịch, thực hiện kiểm kê để tránh bỏ sót:

1. Đọc từng file nguồn, đánh số thứ tự từng **section** (Heading cấp 2 và 3).
2. Tạo **danh sách kiểm tra (checklist)** liệt kê tất cả section cần dịch.
3. Đây là cơ sở để đối chiếu sau khi dịch xong.

Ví dụ checklist cho một file:
```
[ ] ## Phần 1: Khái niệm
[ ] ## Phần 2: Ví dụ thực tế
[ ] ### 2.1 Binary Search
[ ] ### 2.2 Insertion Sort
[ ] ## Phần 3: Tóm tắt
```

### Bước 3 — Dịch nội dung

**Nguyên tắc dịch:**

- Dịch toàn bộ, **không bỏ qua bất kỳ câu hay đoạn nào**.
- Giữ nguyên cấu trúc Markdown: heading, list, table, code block, callout.
- Không tự ý tóm tắt hay diễn giải lại nội dung theo ý mình.
- Hạn chế dịch thuật ngữ chuyên ngành. Nếu cần thì dùng dạng: `thuật_ngữ_gốc (nghĩa tiếng Việt)`. Ví dụ: `Binary Search (Tìm kiếm nhị phân)`.
- Giữ nguyên toàn bộ code trong code block — **không được dịch code**.
- Giữ nguyên đường dẫn asset (`src="dsa-assets/..."`) không được thay đổi.

### Bước 4 — Kiểm tra độ đầy đủ của bản dịch

Sau khi dịch xong, **bắt buộc đối chiếu với checklist ở Bước 2**:

1. Duyệt lại từng mục trong checklist, đánh dấu `[x]` nếu đã dịch đầy đủ.
2. Bất kỳ mục nào chưa có `[x]` đều phải dịch bổ sung trước khi chuyển sang bước tiếp theo.
3. Nếu phát hiện section trong bản gốc không có trong bản dịch → lỗi nghiêm trọng, phải xử lý ngay.

> **Tiêu chí hoàn thành bước này:** 100% mục trong checklist được đánh dấu `[x]`.

### Bước 5 — Tích hợp nút đối chiếu bản gốc

Mỗi topic phải hỗ trợ người học chuyển đổi giữa bản tiếng Việt và bản gốc tiếng Anh.

**Cách thực hiện trong nội dung:**

Thêm thuộc tính `originalContent` song song với `content` vào object topic trong `dsa-content.js`:

```js
'topic-id': {
  title: '...',
  content: `...nội dung tiếng Việt...`,
  originalContent: `...nội dung tiếng Anh gốc...`,
  // các field khác...
}
```

**Yêu cầu với `originalContent`:**
- Sao chép nguyên văn từ file `.md` gốc trong `folder_root`.
- Không chỉnh sửa hay cắt bớt.
- Giữ nguyên HTML đã render (nếu đã có sẵn), hoặc Markdown gốc.

**Nút chuyển đổi trên giao diện được xử lý sẵn bởi `app.js`** — không cần thêm code vào từng topic.

### Bước 6 — Tạo widget mô phỏng thuật toán

Nếu topic có phần giải thích thuật toán có thể minh họa được (ví dụ: sắp xếp, tìm kiếm, duyệt cây, đệ quy...), bắt buộc tạo một widget JS tương tác.

**Yêu cầu của widget:**

| Tính năng | Mô tả |
|---|---|
| **Chạy thủ công** | Nút "Step" để người dùng điều khiển từng bước |
| **Auto Run** | Nút "▶ Auto Run" tự động chạy từng bước với tốc độ có thể điều chỉnh |
| **Pause / Reset** | Nút dừng và reset về trạng thái ban đầu |
| **Visualize** | Hiển thị trực quan từng bước (mảng, con trỏ, cây, stack...) |
| **Trạng thái** | Hiển thị mô tả ngắn gọn về bước đang thực hiện |

**Cấu trúc widget chuẩn:**

```html
<div class="interactive-widget-wrapper" id="[algo]-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, '[algo]-wrapper', 'tab-static')">
      📸 Minh họa tĩnh
    </button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, '[algo]-wrapper', 'tab-interactive'); init[Algo]Demo()">
      ⚡ Mô phỏng tương tác
    </button>
  </div>

  <!-- Tab ảnh tĩnh từ bản gốc -->
  <div class="widget-tab-content active" data-tab="tab-static">
    <img src="dsa-assets/[image].png" alt="..." style="max-width:100%;" />
  </div>

  <!-- Tab mô phỏng JS -->
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div id="[algo]-canvas">
      <!-- Vùng visualize (canvas/div) -->
    </div>
    <div class="simulator-controls">
      <button id="[algo]-btn-autorun" onclick="autoRun[Algo]()">▶ Auto Run</button>
      <button id="[algo]-btn-step"    onclick="step[Algo]()">Bước tiếp theo ▶</button>
      <button id="[algo]-btn-pause"   onclick="pauseRun[Algo]()" disabled>⏸ Dừng</button>
      <button id="[algo]-btn-reset"   onclick="init[Algo]Demo()">↺ Reset</button>
    </div>
    <div id="[algo]-speed-control">
      Tốc độ: <input type="range" min="200" max="2000" value="800" step="200"
                      oninput="setAlgoSpeed(this.value)" /> <span id="[algo]-speed-label">800ms</span>
    </div>
    <div id="[algo]-status" class="simulator-status">
      Nhấp "Auto Run" để bắt đầu mô phỏng tự động.
    </div>
  </div>
</div>
```

**Logic JS cần triển khai:**

```js
// Biến trạng thái
let [algo]State = null;
let [algo]Timer = null;
let [algo]Speed = 800; // ms mỗi bước

function init[Algo]Demo() {
  clearInterval([algo]Timer);
  [algo]Timer = null;
  [algo]State = buildInitialState();
  render[Algo]();
  document.getElementById('[algo]-btn-pause').disabled = true;
  document.getElementById('[algo]-btn-autorun').disabled = false;
  document.getElementById('[algo]-status').textContent = 'Sẵn sàng. Nhấp "Auto Run" hoặc "Bước tiếp theo".';
}

function step[Algo]() {
  if (!hasNextStep([algo]State)) return;
  advanceStep([algo]State);
  render[Algo]();
}

function autoRun[Algo]() {
  document.getElementById('[algo]-btn-autorun').disabled = true;
  document.getElementById('[algo]-btn-pause').disabled = false;
  [algo]Timer = setInterval(() => {
    if (!hasNextStep([algo]State)) {
      pauseRun[Algo]();
      return;
    }
    step[Algo]();
  }, [algo]Speed);
}

function pauseRun[Algo]() {
  clearInterval([algo]Timer);
  [algo]Timer = null;
  document.getElementById('[algo]-btn-autorun').disabled = false;
  document.getElementById('[algo]-btn-pause').disabled = true;
}

function setAlgoSpeed(val) {
  [algo]Speed = parseInt(val);
  document.getElementById('[algo]-speed-label').textContent = val + 'ms';
  if ([algo]Timer) {
    pauseRun[Algo]();
    autoRun[Algo]();
  }
}
```

### Bước 7 — Tích hợp vào hệ thống

1. Thêm topic mới vào `dsa-content.js` theo đúng cấu trúc hiện có.
2. Thêm entry tương ứng vào `KNOWLEDGE_DATA` trong `app.js` (nếu chưa có chapter).
3. Kiểm tra topic hiển thị đúng trên web bằng cách mở trực tiếp qua sidebar.
4. Kiểm tra nút "Xem bản gốc" hoạt động đúng.
5. Kiểm tra widget mô phỏng: Step hoạt động đúng, Auto Run chạy tự động, Pause dừng được, Reset trả về trạng thái ban đầu.

## Điều kiện hoàn thành

- [ ] 100% section trong checklist được dịch đầy đủ — không thiếu đoạn nào.
- [ ] `originalContent` được điền đúng nội dung gốc tiếng Anh nguyên văn.
- [ ] Nút chuyển đổi bản gốc/bản dịch hoạt động trên giao diện.
- [ ] Asset (hình ảnh, sơ đồ) hiển thị đúng, không bị lỗi đường dẫn.
- [ ] Widget mô phỏng (nếu có) hoạt động đầy đủ: Step, Auto Run, Pause, Reset.
- [ ] Topic xuất hiện đúng trong sidebar và có thể truy cập bình thường.

## Các Rule cần tuân thủ

- `05-markdown-standard.md`
- `07-writing-style.md`
- `08-code-standard.md`
- `10-quality-standard.md`