---
title: "1.2 Cấu trúc dữ liệu & Giải thuật là gì"
slug: "dsa-what-is"
summary: "Định nghĩa cơ bản về Giải thuật (Algorithm) và Cấu trúc dữ liệu (Data Structure), mối quan hệ mật thiết giữa chúng và bài học về sự đánh đổi (Trade-off) trong thiết kế."
tags: ['dsa', 'intro']
prerequisites: ['dsa-everywhere']
related: ['dsa-intro-summary']
next: "dsa-intro-summary"
previous: "dsa-everywhere"
---

# 1.2 Cấu trúc dữ liệu & Giải thuật là gì

## 1.2.1 Định nghĩa Giải thuật

Một **Giải thuật (Algorithm)** là một tập hợp các chỉ thị hoặc các bước thao tác nhằm giải quyết một bài toán cụ thể trong một lượng thời gian hữu hạn. Một giải thuật tiêu chuẩn cần đáp ứng các đặc điểm sau:

- **Bài toán được xác định rõ ràng**: Có định nghĩa rõ ràng về đầu vào (Input) và đầu ra (Output).
- **Tính khả thi**: Có thể hoàn thành trong số bước, thời gian và dung lượng bộ nhớ hữu hạn.
- **Tính xác định**: Mỗi bước có ý nghĩa rõ ràng. Dưới cùng một điều kiện đầu vào và vận hành, giải thuật luôn cho ra một kết quả duy nhất (đầu ra giống nhau).

---

## 1.2.2 Định nghĩa Cấu trúc dữ liệu

Một **Cấu trúc dữ liệu (Data Structure)** là một cách thức tổ chức và lưu trữ dữ liệu trong máy tính, bao gồm bản thân dữ liệu, mối quan hệ giữa các phần tử dữ liệu và các phương thức hoạt động trên các phần tử đó. Một cấu trúc dữ liệu tốt thường hướng tới các mục tiêu thiết kế sau:

- **Tiết kiệm không gian**: Chiếm ít bộ nhớ (RAM/Disk) nhất có thể.
- **Tối ưu thời gian thao tác**: Các thao tác cơ bản như truy cập (Access), thêm (Insert), xóa (Delete), cập nhật (Update) phải diễn ra nhanh nhất có thể.
- **Biểu diễn logic rõ ràng**: Cung cấp cấu trúc thông tin ngắn gọn để giải thuật có thể vận hành hiệu quả.

> [!IMPORTANT]
> **Thiết kế cấu trúc dữ liệu là một quá trình đánh đổi (Trade-off).**
> Không có cấu trúc dữ liệu nào hoàn hảo cho mọi tình huống. Khi tối ưu hóa một khía cạnh, chúng ta thường phải chấp nhận đánh đổi ở khía cạnh khác.
>
> - **Mảng (Array) vs. Danh sách liên kết (Linked List)**: Danh sách liên kết giúp thêm và xóa phần tử linh hoạt hơn nhưng lại đánh đổi bằng tốc độ truy cập ngẫu nhiên chậm hơn mảng.
> - **Danh sách liên kết (Linked List) vs. Đồ thị (Graph)**: Đồ thị cung cấp các mối liên kết logic phức tạp và phong phú hơn nhưng đòi hỏi không gian bộ nhớ lớn hơn rất nhiều.

---

## 1.2.3 Mối quan hệ giữa Cấu trúc dữ liệu và Giải thuật

Cấu trúc dữ liệu và giải thuật không tồn tại độc lập mà có mối quan hệ hữu cơ, gắn kết chặt chẽ với nhau:

1. **Cấu trúc dữ liệu là nền tảng**: Cấu trúc dữ liệu cung cấp cách lưu trữ có tổ chức và các thao tác cơ sở để giải thuật làm việc.
2. **Giải thuật thổi hồn vào dữ liệu**: Bản thân cấu trúc dữ liệu chỉ là nơi chứa thông tin tĩnh; giải thuật chính là phần logic xử lý, chuyển hóa dữ liệu tĩnh thành giải pháp giải quyết bài toán.
3. **Mối quan hệ hiệu năng**: Một giải thuật có thể triển khai trên nhiều cấu trúc dữ liệu khác nhau, nhưng hiệu quả thực thi sẽ rất khác biệt. Lựa chọn cấu trúc dữ liệu phù hợp là chìa khóa để tối ưu hiệu năng.

![Mối quan hệ giữa cấu trúc dữ liệu và giải thuật](../../../website/dsa-assets/relationship_between_data_structure_and_algorithm.png)

### 1.2.3.1 Phép ẩn dụ: Trò chơi lắp ráp Lego

Chúng ta có thể ví Cấu trúc dữ liệu và Giải thuật giống như việc chơi lắp ráp khối hình Lego:

![Lắp ráp Lego](../../../website/dsa-assets/assembling_blocks.png)

Một bộ đồ chơi Lego bao gồm các mảnh ghép (thành phần dữ liệu) và sách hướng dẫn lắp ráp (giải thuật). Bằng cách đi theo từng bước trong sách hướng dẫn, bạn sẽ lắp ghép các mảnh thành một mô hình hoàn chỉnh.

| Thành phần Cấu trúc dữ liệu & Giải thuật | Tương ứng trong Trò chơi Lego |
| :--- | :--- |
| **Dữ liệu đầu vào (Input data)** | Các mảnh ghép Lego nằm rời rạc trong hộp |
| **Cấu trúc dữ liệu (Data structure)** | Hình dạng, kích thước và cách thức các mảnh ghép liên kết với nhau |
| **Giải thuật (Algorithm)** | Từng bước hướng dẫn lắp ráp để ghép các mảnh thành hình dạng mong muốn |
| **Dữ liệu đầu ra (Output data)** | Mô hình Lego hoàn chỉnh |

> [!NOTE]
> Cấu trúc dữ liệu và giải thuật hoàn toàn độc lập với ngôn ngữ lập trình. Đó là lý do tại sao các kiến thức này có thể được áp dụng thống nhất dù bạn viết code bằng Java, C++, Python, Kotlin hay JavaScript.

> [!TIP]
> **Cách gọi rút gọn thông dụng:** Trong các cuộc thảo luận thực tế, chúng ta thường rút gọn cụm từ "Cấu trúc dữ liệu và Giải thuật" thành "Giải thuật". Ví dụ, các bài toán giải thuật nổi tiếng trên LeetCode thực chất đang kiểm tra kiến thức của cả hai mảng: cấu trúc dữ liệu lẫn giải thuật.
