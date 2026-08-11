---
description: Thông tin nền về cấu trúc thư mục và tổ chức Repository.
---

# Context: Repository

## Giới thiệu

Tài liệu này mô tả cách Repository của Knowledge OS được tổ chức ở cấp độ thư mục.

## Khu vực chính

### Nội dung tri thức

Chứa toàn bộ Domain, Module, Topic và Resource theo mô hình phân cấp được định nghĩa trong Content Architecture.

### .agents/

Chứa toàn bộ tài nguyên phục vụ AI Agent:

- rules: nguyên tắc bắt buộc tuân thủ.
- workflows: quy trình thực hiện công việc.
- playbooks: cách tư duy và thực hiện tốt một loại công việc.
- templates: cấu trúc chuẩn của từng loại tài liệu.
- prompts: hướng dẫn nhiệm vụ cụ thể cho AI.
- context: thông tin nền giúp AI hiểu dự án.

### Website

Chứa mã nguồn phục vụ hiển thị, điều hướng và tìm kiếm nội dung.

## Nguyên tắc tổ chức

Cấu trúc thư mục phản ánh mô hình tri thức, không phản ánh giao diện hoặc URL.

## Ghi chú

Chi tiết về mô hình phân cấp tri thức (Domain, Module, Topic, Resource) được định nghĩa trong Rule Content Architecture.
