---
title: Advanced Room (Migration & Indexing)
summary: Kỹ thuật nâng cao trong Room Database. Hiểu cách viết Migration để bảo toàn dữ liệu người dùng khi cập nhật cấu trúc bảng, và kỹ thuật đánh Index tối ưu tốc độ truy vấn SQLite.
authors:
  - AI Assistant
date: 2026-07-30
---

# Room Nâng Cao: Migration & Indexing

## 1. Bài toán Migration (Bảo toàn dữ liệu)

### Vấn đề cần giải quyết
Bạn phát hành App version 1. Người dùng đang sử dụng bình thường và đã lưu rất nhiều ghi chú (Notes) vào Room Database.
Tháng sau, bạn ra mắt App version 2. Bạn quyết định thêm một tính năng mới, yêu cầu phải thêm cột `is_pinned` vào bảng `notes`. 

Nếu bạn chỉ sửa Code Entity rồi chạy app: **App sẽ Crash ngay lập tức!** 

Lý do: Cấu trúc Table khai báo trong Code (Version 2) không khớp với cấu trúc Table đang lưu thực tế trên đĩa của người dùng (Version 1). SQLite không cho phép điều này.

### Giải pháp: Migration

Để giải quyết, bạn phải viết một kịch bản **Migration** (Di chuyển/Nâng cấp cấu trúc).
Migration là việc bạn ra lệnh cho SQLite: *"Này, hãy sửa cái bảng cũ, cắm thêm cột này vào cho tôi, và **giữ nguyên dữ liệu cũ** nhé."*

### Hướng dẫn triển khai (Manual Migration)

Giả sử nâng cấp từ Version 1 lên Version 2, thêm cột `is_pinned`.

**Bước 1: Sửa Entity và đổi Version**
```kotlin
@Entity(tableName = "notes")
data class NoteEntity(
    @PrimaryKey val id: Int,
    val content: String,
    // CỘT MỚI THÊM VÀO
    @ColumnInfo(defaultValue = "0") // Phải có defaultValue để SQLite biết điền gì cho các dòng cũ
    val is_pinned: Boolean 
)

// Tăng version lên 2
@Database(entities = [NoteEntity::class], version = 2) 
abstract class AppDatabase : RoomDatabase() { ... }
```

**Bước 2: Viết kịch bản Migration (SQL thuần)**
```kotlin
val MIGRATION_1_2 = object : Migration(1, 2) {
    override fun migrate(db: SupportSQLiteDatabase) {
        // Dùng câu lệnh ALTER TABLE của SQL để cắm thêm cột
        db.execSQL("ALTER TABLE notes ADD COLUMN is_pinned INTEGER NOT NULL DEFAULT 0")
    }
}
```

**Bước 3: Nhúng vào Builder**
```kotlin
Room.databaseBuilder(context, AppDatabase::class.java, "my_db.db")
    .addMigrations(MIGRATION_1_2) // Thêm kịch bản vào đây
    .build()
```

> [!TIP]
> **AutoMigration (Từ Room 2.4.0):** Nếu bạn chỉ thêm cột đơn giản, Room hỗ trợ `@AutoMigration`. Bạn không cần tự viết câu SQL `ALTER TABLE` nữa, Room sẽ tự Gen cho bạn. Nhưng với những thay đổi phức tạp (đổi tên cột, tách bảng), bạn vẫn bắt buộc phải viết Manual Migration.

---

## 2. Bài toán Indexing (Tối ưu tốc độ)

### Vấn đề cần giải quyết
Bạn có bảng `users` chứa **1 triệu dòng**.
Bạn muốn tìm tất cả những người có họ tên là "Nguyen Van A":
`SELECT * FROM users WHERE full_name = 'Nguyen Van A'`

Theo mặc định, SQLite sẽ làm hành động **Full Table Scan**: Nó phải lật từng dòng từ dòng 1 đến dòng 1.000.000 để tìm chữ "Nguyen Van A". Việc này vô cùng chậm và tốn CPU.

### Giải pháp: Index (Chỉ mục)

Index giống như **Mục lục của một cuốn sách**. 
Thay vì phải lật từng trang sách để tìm một từ, bạn lật ra mục lục ở cuối sách (đã được sắp xếp theo bảng chữ cái ABC), tìm từ đó, và mục lục sẽ chỉ cho bạn chính xác từ đó nằm ở trang số mấy.

Khi bạn đánh Index cho cột `full_name`, SQLite sẽ ngầm tạo ra một "Bảng mục lục" dạng Tree (B-Tree). Khi tìm kiếm, nó dò trên B-Tree chỉ tốn vài tích tắc (O(log n)), thay vì phải duyệt 1 triệu dòng (O(n)).

### Hướng dẫn triển khai

Chỉ cần thêm khai báo `indices` trong Entity:

```kotlin
@Entity(
    tableName = "users",
    indices = [
        Index(value = ["full_name"]), // Đánh index cho 1 cột tìm kiếm nhiều
        Index(value = ["email"], unique = true) // Đánh index và bắt buộc Email không được trùng nhau
    ]
)
data class UserEntity(
    @PrimaryKey val id: Int,
    val full_name: String,
    val email: String,
    val address: String
)
```

### Đánh đổi (Trade-off) - Khi nào KHÔNG NÊN đánh Index?

Đừng bao giờ đánh Index cho TẤT CẢ các cột. 

> [!WARNING]
> **Nhược điểm của Index:**
> Mặc dù Index làm tốc độ **Đọc (SELECT)** cực kỳ nhanh, nhưng nó lại làm tốc độ **Ghi (INSERT/UPDATE/DELETE)** chậm đi. 
> Lý do: Cứ mỗi lần bạn chèn thêm 1 User mới vào bảng, SQLite phải tốn thời gian "cập nhật lại cái bảng Mục lục (Index)". 
> Ngoài ra, Index cũng làm file `.db` nặng hơn (tốn dung lượng lưu trữ).

**Best Practice:**
- **NÊN:** Đánh index cho những cột thường xuyên xuất hiện sau chữ `WHERE` (tìm kiếm/lọc), `ORDER BY` (sắp xếp).
- **KHÔNG NÊN:** Đánh index cho những bảng quá nhỏ (dưới vài trăm dòng - lật từng trang sách mỏng còn nhanh hơn đi tìm mục lục), hoặc những bảng tần suất ghi/xóa dữ liệu quá nhiều nhưng lại ít khi đọc (Log table).
