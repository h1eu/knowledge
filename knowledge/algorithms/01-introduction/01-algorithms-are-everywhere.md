---
title: "1.1 Giải thuật ở khắp mọi nơi"
slug: "dsa-everywhere"
summary: "Khám phá cách chúng ta vô tình sử dụng các giải thuật kinh điển như Tìm kiếm nhị phân (Binary Search), Sắp xếp chèn (Insertion Sort) và Tham lam (Greedy) trong cuộc sống hàng ngày."
tags: ['dsa', 'intro']
prerequisites: ['dsa-encounter']
related: ['dsa-what-is']
next: "dsa-what-is"
previous: "dsa-encounter"
---

# 1.1 Giải thuật ở khắp mọi nơi

Khi nghe thuật ngữ **Algorithm (Giải thuật)**, chúng ta thường nghĩ ngay đến toán học phức tạp. Tuy nhiên, rất nhiều giải thuật thực chất chỉ dựa trên logic cơ bản và xuất hiện ở mọi ngóc ngách trong cuộc sống hàng ngày của chúng ta.

Trước khi đi sâu vào chuyên môn, có một sự thật thú vị: **Bạn đã học và áp dụng rất nhiều giải thuật mà không hề nhận ra.** Hãy cùng điểm qua ba ví dụ thực tế dưới đây để thấy giải thuật gần gũi như thế nào.

---

## 1.1.1 Ví dụ 1: Tra cứu từ điển giấy (Tìm kiếm nhị phân - Binary Search)

Trong từ điển tiếng Anh, các từ được sắp xếp theo thứ tự bảng chữ cái. Giả sử bạn cần tìm một từ bắt đầu bằng chữ cái **$r$**. Bạn sẽ làm thế nào?

Thông thường, chúng ta sẽ thực hiện theo các bước sau:
1. Mở từ điển ở khoảng giữa và xem từ đầu tiên của trang đó; giả sử từ đó bắt đầu bằng chữ cái **$m$**.
2. Vì chữ **$r$** đứng sau **$m$** trong bảng chữ cái, bạn có thể loại bỏ hoàn toàn nửa đầu cuốn từ điển và thu hẹp phạm vi tìm kiếm vào nửa sau.
3. Lặp lại bước 1 và 2 đối với nửa sau cuốn sách cho đến khi bạn tìm thấy đúng trang chứa từ bắt đầu bằng chữ **$r$**.

![Quy trình tra từ điển](../../website/dsa-assets/binary_search_dictionary_step1.png)

Hành động tra cứu từ điển quen thuộc này chính là giải thuật **Binary Search (Tìm kiếm nhị phân)** nổi tiếng.
- Ở góc độ **Cấu trúc dữ liệu**: Cuốn từ điển đóng vai trò là một **Mảng (Array)** đã được sắp xếp thứ tự.
- Ở góc độ **Giải thuật**: Các bước thu hẹp phạm vi tìm kiếm chính là giải thuật **Tìm kiếm nhị phân**.

---

## 1.1.2 Ví dụ 2: Sắp xếp quân bài trên tay (Sắp xếp chèn - Insertion Sort)

Khi chơi bài tây, để dễ nhìn, chúng ta thường sắp xếp các quân bài trên tay theo thứ tự tăng dần:

1. Chia các quân bài thành hai phần: phần **đã sắp xếp** (bên trái) và phần **chưa sắp xếp** (bên phải). Ban đầu, coi quân bài ngoài cùng bên trái đã được sắp xếp.
2. Rút một quân bài từ phần chưa sắp xếp, so sánh và chèn nó vào vị trí thích hợp trong phần đã sắp xếp.
3. Lặp lại bước 2 cho đến khi không còn quân bài nào ở phần chưa sắp xếp.

![Sắp xếp quân bài](../../website/dsa-assets/playing_cards_sorting.png)

Quy trình sắp xếp quân bài này chính là nguyên lý của giải thuật **Insertion Sort (Sắp xếp chèn)**. Đây là một giải thuật cực kỳ hiệu quả đối với các tập dữ liệu nhỏ và thường được sử dụng làm lõi tối ưu hóa trong các hàm sắp xếp tích hợp của nhiều ngôn ngữ lập trình.

---

## 1.1.3 Ví dụ 3: Thối tiền thừa siêu thị (Giải thuật tham lam - Greedy Algorithm)

Giả sử bạn mua hàng hết 69.000đ tại siêu thị. Bạn đưa cho thu ngân tờ 100.000đ, họ cần thối lại cho bạn 31.000đ. Quy trình thối tiền thường diễn ra như sau:

1. Các mệnh giá tiền nhỏ hơn 31.000đ hiện có là: 20.000đ, 10.000đ, 5.000đ, 2.000đ, 1.000đ.
2. Thu ngân rút tờ tiền có mệnh giá lớn nhất có thể và nhỏ hơn 31.000đ, đó là tờ **20.000đ** (còn thiếu $31.000 - 20.000 = 11.000đ$).
3. Tiếp tục chọn tờ tiền lớn nhất có thể cho số tiền còn thiếu, đó là tờ **10.000đ** (còn thiếu $11.000 - 10.000 = 1.000đ$).
4. Chọn tờ tiền lớn nhất có thể tiếp theo, đó là tờ **1.000đ** (còn thiếu $1.000 - 1.000 = 0đ$).
5. Hoàn tất quá trình thối tiền với kết quả gồm: 1 tờ 20.000đ, 1 tờ 10.000đ và 1 tờ 1.000đ.

![Thối tiền thừa](../../website/dsa-assets/greedy_change.png)

Bằng cách luôn chọn phương án tốt nhất ở mỗi bước nhỏ (rút mệnh giá lớn nhất có thể), chúng ta thu được kết quả tối ưu cho toàn bộ bài toán. Trong lập trình, cách tiếp cận này được gọi là **Greedy Algorithm (Giải thuật tham lam)**.

---

## 1.1.4 Từ Đời sống vào Máy tính

Từ việc nấu ăn theo công thức đến việc phóng tàu vũ trụ, hầu hết mọi quy trình giải quyết vấn đề đều liên quan đến giải thuật.

Nhờ có máy tính, chúng ta có thể lưu trữ các cấu trúc dữ liệu trong bộ nhớ (RAM) và viết mã nguồn (Code) điều khiển CPU/GPU thực thi các giải thuật. Điều này cho phép con người số hóa và giải quyết các vấn đề phức tạp trong đời sống thực tế với tốc độ cực nhanh và hiệu quả vượt trội.

> [!TIP]
> Nếu bạn thấy các thuật ngữ như cấu trúc dữ liệu, giải thuật, mảng hay tìm kiếm nhị phân nghe vẫn còn mơ hồ, đừng lo lắng. Cuốn sách này sẽ dẫn dắt bạn từng bước nhỏ để làm quen và làm chủ chúng!
