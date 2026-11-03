---
id: android.session01.overview
title: Session 01 Overview
summary: Tổng quan Session 01 — ngôn ngữ lập trình Android (Java, Kotlin, JNI/C++) và định dạng đóng gói ứng dụng (APK, AAB).
status: published
difficulty: beginner
depth: overview
estimated_reading_time: 10 phút
tags: [android, overview, session-01, languages, output-packages]
prerequisites: []
related: []
learning_outcomes:
  - Giải thích được vai trò của Java, Kotlin và C/C++ (qua JNI) trong một ứng dụng Android.
  - Giải thích được chuỗi biến đổi từ mã nguồn tới file .dex, .so và gói cài đặt trên thiết bị.
  - Phân biệt được APK (định dạng cài đặt) và AAB (định dạng xuất bản lên Google Play).
knowledge_gap: >
  Bắt đầu học Android mà không nắm rõ vai trò của từng ngôn ngữ và định dạng đóng gói dễ dẫn đến nhầm lẫn khi lựa chọn công nghệ, khi đọc lỗi build và khi phát hành ứng dụng.
---

# Session 01: Ngôn ngữ & Gói ứng dụng

## Giới thiệu

Session 01 trả lời hai câu hỏi nền tảng: **ứng dụng Android được viết bằng gì** và **mã nguồn biến thành thứ gì để chạy được trên điện thoại**.

```mermaid
flowchart LR
    J["Java .java"] -->|javac| C[".class"]
    K["Kotlin .kt"] -->|kotlinc| C
    C -->|"D8 / R8"| D["classes.dex"]
    N["C/C++"] -->|"NDK + CMake"| S["lib*.so"]
    D --> P["APK / AAB"]
    S --> P
    P -->|"Google Play / adb"| Dev["Thiết bị: ART chạy .dex, nạp .so qua JNI"]
```

<!-- dd: s01-build-map -->

## Nội dung Session

- **1.1 Languages** — Ngôn ngữ lập trình:
  - [1.1.1 Java Android](languages/java_android.md): Java trên Android khác Java SE ở đâu, chuỗi `javac` → D8/R8 → `.dex`, Dalvik và ART, desugaring, memory leak do inner class.
  - [1.1.2 Kotlin](languages/kotlin.md): Kotlin chạy trên ART thế nào, Null Safety, Java và Kotlin gọi nhau, KAPT và KSP.
  - [1.1.3 JNI: C/C++](languages/jni.md): khi nào cần C/C++, chi phí gọi JNI, NDK và CMake, quản lý reference và bộ nhớ native.
- **1.2 Output Packages** — Định dạng đóng gói:
  - [1.2.1 APK](output_packages/apk_files.md): cấu trúc APK, chữ ký v1–v4, `zipalign`, các yêu cầu căn chỉnh.
  - [1.2.2 AAB](output_packages/aab_files.md): AAB và Split APK, Dynamic Feature Module, Play App Signing, test bằng `bundletool`.

## Thứ tự học đề xuất

Java Android → Kotlin → APK → AAB → JNI. JNI khó nhất và cần hiểu cả ngôn ngữ lẫn cấu trúc APK, nên có thể học sau cùng.

## Học tiếp

Sau Session 01, Session 02 đi vào cách hệ điều hành Android cài đặt, cấp quyền và cô lập ứng dụng (File Permissions, Process Management).
