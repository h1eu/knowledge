---
title: "Giấy phép nguồn mở phổ biến"
slug: "git-oss-licenses"
summary: "Task-board sắp mở nguồn: public không bằng mã nguồn mở, so sánh MIT / Apache 2.0 / GPLv3 và cách chọn đúng cho dự án."
tags: ['license', 'open-source', 'github']
prerequisites: ['git-create-repository']
related: ['git-fork-clone', 'git-pull-request']
next: "git-security-secrets"
previous: "git-merge-conflicts"
difficulty: beginner
read_time: "9 phút"
learning_outcomes:
  - Giải thích vì sao repo public không có license thì về pháp lý cấm dùng.
  - So sánh MIT / Apache 2.0 / GPLv3 theo thương mại hóa và copyleft.
  - Thêm license chuẩn vào repository qua GitHub.
knowledge_gap: "Tưởng public = tự do dùng mọi kiểu — thiếu license vẫn là cấm tái sử dụng."
---

# Giấy phép nguồn mở phổ biến

> **Bối cảnh:** An công bố trong họp: *"Task-board sẽ open source để làm portfolio."* Chi hỏi ngay: *"Trên repo cần làm gì?"* — Câu trả lời: **thêm LICENSE**, và chọn loại là quyết định pháp lý thật.

## Vấn đề: không có license = cấm dùng

Theo mặc định luật bản quyền, repo public **không kèm license** thì mọi quyền thuộc về tác giả: người khác đọc được nhưng **không được phép** tái sử dụng, sửa đổi hay phân phối. License là văn bản cấp quyền sử dụng có điều kiện — bảo vệ cả hai phía.

## Ba giấy phép phổ biến nhất

**MIT** — tối giản nhất: được làm mọi thứ (dùng, sửa, bán), điều kiện duy nhất là giữ nguyên dòng bản quyền. Chọn khi muốn dự án lan rộng tối đa. Ví dụ: React, Vue.js.

**Apache 2.0** — MIT cộng thêm **patent grant tường minh** (người đóng góp cam kết không kiện người dùng về bằng sáng chế liên quan) và yêu cầu ghi chú thay đổi khi sửa file gốc. Ví dụ: Kubernetes, TensorFlow.

**GPLv3** — copyleft lây lan: sản phẩm chứa code GPL phải **mở nguồn toàn bộ** cùng license khi phân phối. Ví dụ: chính Git, WordPress.

## Bảng quyết định nhanh

| Tiêu chí | MIT | Apache 2.0 | GPLv3 |
|---|---|---|---|
| Dùng trong app thương mại | Có | Có | Chỉ nếu app mở nguồn |
| Giữ dòng bản quyền | Bắt buộc | Bắt buộc | Bắt buộc |
| Patent grant tường minh | Không | **Có** | Có |
| Phái sinh phải open source | Không | Không | **Có** |

Với task-board — công cụ nhóm muốn nhiều người dùng: team chọn **MIT**, rào cản thấp nhất.

## Thực hiện trên GitHub

1. Repo → Add file → Create new file → gõ `LICENSE`.
2. GitHub hiện nút **Choose a license template** → chọn MIT → điền năm + holder.
3. Commit thẳng lên `main` (file pháp lý đơn lẻ, không cần PR).

Kèm khai báo license trong `package.json` để công cụ kiểm tra phụ thuộc nhận diện đúng:

```json
{
  "name": "task-board",
  "version": "1.0.0",
  "license": "MIT"
}
```

> [!WARNING]
> Copy code từ Stack Overflow hay repo có license nghĩa là chấp nhận license đó — kể cả khi bạn không đọc. Nhét thư viện GPL vào app đóng nguồn mà không mở toàn bộ là vi phạm thật.

## Sai lầm thường gặp

- Tự chế "license riêng" cho dự án nhỏ → không tương thích công cụ, người dùng phải đoán nghĩa vụ.
- Trộn GPL với MIT trong cùng sản phẩm phân phối mà không hiểu ràng buộc chéo.
- Quên license đến khi có người muốn dùng → phải truy tìm ý kiến từng contributor cũ để bổ sung.

## References

- [Choose a License (GitHub)](https://choosealicense.com/)
- [Open Source Initiative — licenses](https://opensource.org/licenses)

## Học tiếp

[Lộ secret — Xử lý khẩn cấp](security-secrets.md): bài sự cố thật đầu tiên của team.
