---
title: Async Transactions & Flow
summary: Giải quyết bài toán ghi dữ liệu phức tạp. Cách gom nhóm nhiều tác vụ bất đồng bộ (Coroutines) vào một Transaction để đảm bảo tính toàn vẹn dữ liệu (ACID) - Thành công tất cả hoặc Hủy toàn bộ.
authors:
  - AI Assistant
date: 2026-07-30
---

# Room Database: Giao dịch bất đồng bộ (Async Transactions)

## Vấn đề cần giải quyết

Trong thực tế dự án, hiếm khi bạn chỉ lưu dữ liệu vào 1 bảng duy nhất. Hãy xét bài toán **Lưu đơn hàng (Checkout)**:
1. Bạn phải trừ tiền trong bảng `Wallet`.
2. Bạn thêm 1 dòng vào bảng `Orders`.
3. Bạn thêm 5 dòng vào bảng `OrderDetails` (chi tiết sản phẩm mua).

Nếu làm theo cách thông thường, bạn chạy 3 hàm `insert/update` liên tiếp. 
Nhưng nếu: Trừ tiền thành công, Lưu Order thành công, nhưng đến lúc lưu OrderDetails thì... **Lỗi (điện thoại hết dung lượng hoặc sập nguồn)!**

Kết quả: Tiền của User đã bị trừ, Đơn hàng có tạo ra, nhưng không có thông tin sản phẩm. Dữ liệu bị rác, mâu thuẫn.

### Giải pháp: Transaction (Giao dịch)

Database cung cấp cơ chế Transaction để đảm bảo tính nguyên vẹn (Nguyên lý ACID - All or Nothing). 
Khi bạn bọc 3 bước trên vào 1 Transaction, hệ thống cam kết: **Hoặc là cả 3 cùng thành công, hoặc nếu lỗi ở bất kỳ bước nào, toàn bộ quá trình sẽ bị Rollback (Quay ngược thời gian), tiền sẽ được cộng lại như chưa có gì xảy ra.**

## Vấn đề với Coroutines (Bất đồng bộ)

Trước đây, khi code bằng Java, code chạy tuần tự nên Transaction rất dễ viết.
Nhưng với Kotlin Coroutines, các hàm suspend chạy bất đồng bộ (Thread bị tạm ngưng và nhường chỗ, thậm chí nhảy sang Thread khác). Việc đảm bảo Transaction trên môi trường Multi-threading là cực kỳ phức tạp (vì SQLite lock database theo từng Thread).

May mắn thay, Room Database đã giải quyết triệt để bài toán này cho bạn!

## Hướng dẫn triển khai

Trong Room DAO, bạn chỉ cần dùng Annotation `@Transaction` đặt trước một hàm `suspend`. Room sẽ tự động bọc toàn bộ code bên trong hàm đó vào một Transaction an toàn của SQLite.

```kotlin
@Dao
interface OrderDao {

    // Các hàm lẻ
    @Update
    suspend fun updateWallet(wallet: WalletEntity)

    @Insert
    suspend fun insertOrder(order: OrderEntity): Long // Trả về ID vừa tạo

    @Insert
    suspend fun insertOrderDetails(details: List<OrderDetailEntity>)

    // ==========================================
    // HÀM TRANSACTION GOM NHÓM
    // ==========================================
    @Transaction
    suspend fun processCheckout(
        wallet: WalletEntity, 
        order: OrderEntity, 
        details: List<OrderDetailEntity>
    ) {
        // Bước 1: Trừ tiền
        updateWallet(wallet)

        // Bước 2: Tạo order
        val orderId = insertOrder(order)

        // Bước 3: Gắn OrderId vào từng detail rồi lưu
        val detailsWithId = details.map { it.copy(orderId = orderId) }
        insertOrderDetails(detailsWithId)
        
        // NẾU CÓ BẤT KỲ EXCEPTION NÀO XẢY RA TRONG KHỐI NÀY, 
        // ROOM SẼ TỰ ĐỘNG ROLLBACK TẤT CẢ!
    }
}
```

### Cách sử dụng trong Repository / ViewModel

Dưới góc độ ViewModel, bạn chỉ gọi đúng 1 hàm `processCheckout`. Việc xử lý Transaction nặng nhọc đã được Room ẩn giấu (Encapsulation).

```kotlin
class CheckoutViewModel(private val dao: OrderDao) : ViewModel() {

    fun checkout(cartItems: List<CartItem>) {
        viewModelScope.launch {
            try {
                // Tạo data models...
                val wallet = WalletEntity(balance = 500)
                val order = OrderEntity(total = 100)
                val details = cartItems.map { OrderDetailEntity(...) }

                // Gọi hàm Transaction
                dao.processCheckout(wallet, order, details)

                // Nếu xuống được dòng này nghĩa là TẤT CẢ đã thành công!
                _uiState.value = CheckoutState.Success

            } catch (e: Exception) {
                // Nếu lỗi, Room đã tự động Rollback Database. 
                // Ta chỉ việc báo lỗi lên UI.
                _uiState.value = CheckoutState.Error(e.message)
            }
        }
    }
}
```

## Bonus: Kết hợp Flow lắng nghe nhiều bảng (Relational Fetching)

Khi bạn muốn hiển thị một Đơn hàng KÈM theo Chi tiết đơn hàng, thay vì viết 2 câu Query rồi tự ghép lại bằng tay, bạn có thể định nghĩa một lớp Data Class bọc (Wrapper) chứa `@Relation`.

```kotlin
// Data class này KHÔNG phải là @Entity, nó chỉ dùng để query
data class OrderWithDetails(
    @Embedded val order: OrderEntity, // Lấy toàn bộ info của Order
    
    @Relation(
        parentColumn = "id", // Khóa chính bảng Order
        entityColumn = "orderId" // Khóa ngoại bảng OrderDetail
    )
    val details: List<OrderDetailEntity> // Lấy danh sách Detail tương ứng
)
```

**Trong DAO:**
```kotlin
@Dao
interface OrderDao {
    // Phải có @Transaction vì Room chạy ngầm 2 câu query riêng biệt 
    // (1 cho Order, 1 cho Details). Cần Transaction để tránh dữ liệu bị 
    // chênh lệch trong lúc đang query.
    @Transaction
    @Query("SELECT * FROM orders WHERE id = :orderId")
    fun getOrderWithDetailsFlow(orderId: Long): Flow<OrderWithDetails>
}
```
Lợi ích: Chỉ với 1 Flow, UI của bạn sẽ tự động cập nhật ngay lập tức nếu dữ liệu của bảng `Order` HOẶC bảng `OrderDetail` bị thay đổi!

## Tổng kết

Đừng bao giờ chạy nhiều câu lệnh Insert/Update rời rạc nếu chúng thuộc về cùng một nghiệp vụ (Business Logic). Bọc chúng trong `@Transaction` để tránh rác dữ liệu. Kết hợp `@Transaction` cùng `suspend` và `Flow` biến Room trở thành công cụ xử lý bất đồng bộ Database mạnh mẽ nhất trên Android hiện nay.
