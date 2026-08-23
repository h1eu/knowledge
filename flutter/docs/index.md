---
title: Flutter Learning Roadmap
summary: Lộ trình và kiến thức nền tảng để làm chủ Flutter dành cho lập trình viên, bắt đầu từ Dart cho Kotlin Developer đến kiến trúc ứng dụng, testing và triển khai lên Store.
tags: [flutter, dart, mobile, roadmap]
---

# Flutter Learning Roadmap

Module Flutter của Knowledge OS, tổ chức theo lộ trình học từ nền tảng ngôn ngữ đến triển khai sản phẩm.

## Cấu trúc lộ trình

Lộ trình được tham chiếu từ [roadmap.sh/flutter](https://roadmap.sh/flutter) và điều chỉnh lại theo chuẩn học tập của Knowledge OS:

- **Async trước Networking**: Futures/Streams/Isolates được đưa lên Session 01 thay vì sau Networking - vì gọi API đòi hỏi hiểu bất đồng bộ trước.
- **Bridge Kotlin -> Dart**: Session 01 mở đầu bằng `Dart for Kotlin Developers` dành cho Android Developer chuyển sang.
- **Bổ sung các chủ đề còn thiếu**: Navigation (GoRouter), i18n/l10n, Flavors & Signing, Crashlytics, Codegen (Freezed/json_serializable).
- **GetX/Redux hạ xuống vai trò Alternative**: ưu tiên Riverpod/BLoC như giải pháp chủ lưu.

```mermaid
graph TD
    S1["Session 01: Dart Foundations<br/>(Kotlin bridge + Async)"] --> S2["Session 02: Environment & Tooling"]
    S2 --> S3["Session 03: Widgets & UI"]
    S3 --> S4["Session 04: State Management"]
    S4 --> S5["Session 05: Networking"]
    S5 --> S6["Session 06: Local Storage"]
    S6 --> S7["Session 07: Firebase"]
    S7 --> S8["Session 08: Navigation & Architecture"]
    S8 --> S9["Session 09: Animations"]
    S9 --> S10["Session 10: Internals & Performance"]
    S10 --> S11["Session 11: Testing & Quality"]
    S11 --> S12["Session 12: CI/CD & Deployment"]
```

## Bắt đầu từ đâu?

- Android Developer muốn chuyển sang Flutter: đọc ngay [Dart for Kotlin Developers](session_01/dart/dart_for_kotlin_devs.md).
- Người mới hoàn toàn: đi tuần tự từ Session 01 theo thứ tự trong mục lục.
