---
trigger: always_on
---

# Rule: Project Overview

## Mục đích

Tài liệu này định nghĩa tầm nhìn, mục tiêu, triết lý và các nguyên tắc nền tảng của dự án.

Đây là tài liệu có mức ưu tiên cao nhất trong toàn bộ hệ thống Rule.

Mọi AI Agent, Rule, Context, Template và thành phần của dự án đều phải tuân thủ các nguyên tắc trong tài liệu này.

Nếu có xung đột giữa các Rule, tài liệu này luôn được ưu tiên.

---

# Tầm nhìn

Knowledge OS là một nền tảng giúp tổ chức, xây dựng và phát triển tri thức chuyên sâu trong lĩnh vực Công nghệ Thông tin.

Đây không phải là:

- Chatbot AI
- Blog
- Website tài liệu
- Nền tảng khóa học trực tuyến

Knowledge OS hướng tới việc trở thành một **Hệ điều hành tri thức (Knowledge Operating System)**, nơi tri thức được tổ chức thành một hệ thống có cấu trúc, có liên kết và có khả năng phát triển lâu dài.

---

# Sứ mệnh

Giúp người học:

- Hiểu bản chất thay vì học thuộc.
- Kết nối kiến thức thành một hệ thống.
- Học theo lộ trình rõ ràng.
- Tra cứu nhanh chóng.
- Tự học và mở rộng tri thức lâu dài.

Mọi tính năng trong dự án đều phải phục vụ mục tiêu này.

---

# Triết lý cốt lõi

## Knowledge First

Tri thức là tài sản quan trọng nhất của dự án.

Mọi thành phần khác đều tồn tại để phục vụ việc xây dựng, tổ chức và truyền tải tri thức.

Nếu một tính năng không làm tăng giá trị của tri thức thì cần xem xét lại sự cần thiết của nó.

---

## Content First

Nội dung là trung tâm của hệ thống.

Website được xây dựng để phục vụ nội dung.

Không thiết kế nội dung để phục vụ giao diện.

Giao diện có thể thay đổi.

Nội dung phải luôn được bảo toàn.

---

## Markdown First

Toàn bộ tri thức được lưu dưới dạng Markdown hoặc MDX.

Markdown là nguồn dữ liệu gốc của hệ thống.

Website chỉ đọc và hiển thị nội dung.

Mọi công cụ khác đều hoạt động dựa trên Markdown.

---

## Single Source of Truth

Một nội dung chỉ được tồn tại tại một nơi.

Không tạo nhiều bản sao của cùng một kiến thức.

Nếu nhiều thành phần cùng sử dụng một nội dung thì phải tham chiếu thay vì sao chép.

Mọi dữ liệu phát sinh đều được tạo từ nguồn dữ liệu gốc.

---

## Git First

Git không chỉ là công cụ quản lý mã nguồn.

Git là hệ thống quản lý tri thức.

Toàn bộ nội dung phải được quản lý bằng Git.

Mọi thay đổi cần có lịch sử, khả năng so sánh và khả năng khôi phục.

---

## Static First

Dự án ưu tiên kiến trúc Static-first.

Mọi nội dung nên có thể được sinh sẵn trong quá trình build.

Chỉ sử dụng xử lý động khi thật sự cần thiết.

Ưu tiên:

- Đơn giản
- Nhanh
- Dễ triển khai
- Dễ bảo trì

---

## Local First

Hệ thống phải có khả năng hoạt động hoàn toàn trên máy cá nhân.

Không phụ thuộc vào:

- Backend
- Database
- CMS
- Dịch vụ trực tuyến

Repository là nơi lưu trữ toàn bộ tài sản của dự án.

---

## Human Verified

AI hỗ trợ tạo và cải thiện nội dung.

Con người là người chịu trách nhiệm xác nhận cuối cùng.

Nếu AI không chắc chắn về thông tin thì cần nêu rõ.

Độ chính xác luôn được ưu tiên hơn số lượng.

---

# Kiến trúc tổng thể

Knowledge OS gồm ba tầng chính.

## Knowledge Layer

Chứa toàn bộ tri thức của hệ thống.

Đây là tầng quan trọng nhất.

Mọi nội dung đều được lưu dưới dạng Markdown hoặc MDX.

---

## Presentation Layer

Website chịu trách nhiệm:

- Hiển thị nội dung
- Điều hướng
- Tìm kiếm
- Trực quan hóa
- Tương tác với người dùng

Website không phải nơi lưu trữ tri thức.

---

## Authoring Layer

Bao gồm các công cụ hỗ trợ xây dựng nội dung.

Ví dụ:

- AI Agent
- Script
- Generator
- Linter
- Formatter

Các công cụ này chỉ hỗ trợ tạo và quản lý nội dung.

Không phải là nguồn dữ liệu chính của hệ thống.

---

# Tổ chức tri thức

Tri thức phải được tổ chức theo cấu trúc rõ ràng.

Không tạo các bài viết độc lập không có mối liên hệ.

Mọi nội dung cần có khả năng:

- Liên kết.
- Mở rộng.
- Tái sử dụng.
- Tham chiếu.

Mục tiêu là xây dựng một mạng lưới tri thức thay vì tập hợp các bài viết rời rạc.

---

# Khả năng mở rộng

Kiến trúc phải hỗ trợ việc bổ sung:

- Domain mới
- Chủ đề mới
- Loại nội dung mới
- Công cụ mới

mà không cần thay đổi cấu trúc cốt lõi.

---

# Khả năng tái sử dụng

Một nội dung nên được tạo một lần.

Nếu nhiều nơi cần sử dụng thì ưu tiên tham chiếu.

Không sao chép nội dung giữa các bài viết.

Không tạo nhiều nguồn dữ liệu cho cùng một thông tin.

---

# Triết lý phát triển

Mọi quyết định trong dự án cần ưu tiên:

- Đơn giản.
- Nhất quán.
- Có cấu trúc.
- Dễ đọc.
- Dễ bảo trì.
- Dễ mở rộng.

Không bổ sung công nghệ chỉ vì hiện đại.

Không thêm tầng kiến trúc nếu chưa thật sự cần.

Không tăng độ phức tạp nếu không tạo ra giá trị tương xứng.

---

# Khả năng phục hồi

Nếu toàn bộ kết quả build bị xóa.

Nếu toàn bộ cache bị xóa.

Nếu toàn bộ thư mục sinh tự động bị xóa.

Chỉ cần thư mục nội dung vẫn còn thì toàn bộ Website phải có khả năng được sinh lại đầy đủ.

Markdown là tài sản quan trọng nhất của hệ thống.

---

# Mục tiêu dài hạn

Knowledge OS hướng tới việc xây dựng một hệ sinh thái tri thức có khả năng phát triển trong nhiều năm.

Công nghệ có thể thay đổi.

Framework có thể thay đổi.

AI Model có thể thay đổi.

Website có thể thay đổi.

Nhưng tri thức và cách tổ chức tri thức phải luôn được bảo toàn.

Mọi quyết định trong dự án đều phải hướng tới mục tiêu đó.