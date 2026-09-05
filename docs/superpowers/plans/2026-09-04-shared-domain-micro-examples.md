# Shared Domain + Micro-Examples Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Chuẩn hóa Module `session_05/data_store` theo hướng 1+2: chung 1 domain Shop, mỗi Topic 1 micro-example độc lập.

**Architecture:** Giữ nguyên 4 file Lesson + `index.md`. Không tạo app chung, không tạo file mới. Mỗi Lesson refactor ví dụ về cùng bộ tên Shop (Product/Order/Customer/Settings) nhưng code vẫn độc lập, <30 dòng/ví dụ, đặt sau phần giải thích. `index.md` là nơi duy nhất khai báo domain contract.

**Tech Stack:** Markdown + Kotlin code fences + Mermaid (giữ nguyên). Verify bằng `rg` (headings, fences, tên Entity).

**Spec:** Quyết định duyệt 2026-09-04 (hướng 1+2) + audit thực tế:
- `room_architecture.md` dùng `ArticleEntity` (articles)
- `room_transactions.md` dùng `Wallet/Order/OrderDetail` (checkout)
- `room_advanced.md` dùng `NoteEntity` (notes) + `UserEntity` (users)
- `key_value.md` dùng `SettingsRepository` (auth_token, dark_mode)
=> 4 domain rời rạc trong cùng 1 Module, cần gom về 1.

## Global Constraints

- Một file một H1; heading tăng tuần tự, không nhảy cấp.
- Mọi code fence phải khai báo ngôn ngữ (`kotlin`, `groovy`, `mermaid`).
- Không nhúng project hoàn chỉnh vào Lesson; mỗi ví dụ 1 khái niệm, độc lập, chạy được về mặt ý tưởng.
- Frontmatter giữ nguyên các field hiện có (`title`, `summary`, `authors`, `date`); không tự ý thêm field mới.
- Ngôn ngữ: tiếng Việt, thuật ngữ giữ tiếng Anh, giải thích bản chất trước code.
- Không sửa `map/*.yml`, không sửa `website/`, không sửa `tools/`.
- Mỗi Task kết thúc bằng verify `rg` + `git diff` review trước khi commit.

---

## File Structure

- Modify: `knowledge/android/docs/session_05/index.md` — thêm section Domain chung (contract duy nhất).
- Modify: `knowledge/android/docs/session_05/data_store/room_architecture.md` — Article -> Product.
- Modify: `knowledge/android/docs/session_05/data_store/room_advanced.md` — Note/User -> Product/Customer.
- Modify: `knowledge/android/docs/session_05/data_store/room_transactions.md` — chuẩn hóa tên Shop, tách micro-example.
- Modify: `knowledge/android/docs/session_05/data_store/key_value.md` — gắn Settings vào ngữ cảnh Shop, không đổi logic.

Mỗi file có một trách nhiệm: giải thích 1 Topic. `index.md` chịu trách nhiệm khai báo domain dùng chung.

---

### Task 1: Khai báo Domain chung Shop trong index.md

**Files:**
- Modify: `knowledge/android/docs/session_05/index.md:27-35`
- Test: `rg -n "Domain chung" knowledge/android/docs/session_05/index.md`

**Interfaces:**
- Consumes: không có (task đầu tiên).
- Produces: tên chuẩn Shop cho Task 2-5 dùng: `ProductEntity`, `OrderEntity`, `OrderDetailEntity`, `CustomerEntity`, `WalletEntity`, `SettingsRepository`, `ShopDatabase`.

- [ ] **Step 1: Đọc section hiện tại để giữ links**

Run: `rg -n "5.1|data_store" knowledge/android/docs/session_05/index.md`
Expected: thấy 4 dòng link 5.1.1–5.1.4, giữ nguyên.

- [ ] **Step 2: Thêm section Domain chung sau Nội dung Session**

Chèn sau block list 5.1.x, trước `## Học tiếp`:

```markdown
## Domain chung của Module (Shop)

Cả 4 Topic trong Module này dùng chung ngữ cảnh cửa hàng Shop để nhất quán tên,
nhưng mỗi ví dụ code vẫn độc lập, không phụ thuộc nhau:

- `ProductEntity(tableName = "products")`: id, name, price, timestamp
- `OrderEntity(tableName = "orders")`: id, total
- `OrderDetailEntity(tableName = "order_details")`: orderId (FK -> orders.id)
- `CustomerEntity(tableName = "customers")`: id, full_name, email
- `WalletEntity`: balance
- `SettingsRepository`: auth_token (login Shop), dark_mode
- `ShopDatabase`: RoomDatabase chứa các Entity trên

Quy ước: ví dụ trong mỗi Lesson chỉ dùng đúng Entity cần cho khái niệm đó,
không import code từ Lesson khác.
```

- [ ] **Step 3: Verify không vỡ heading/links**

Run: `rg -n '^#{1,3} ' knowledge/android/docs/session_05/index.md`
Expected: 1 dòng `# `, các `## ` tuần tự (Giới thiệu, Nội dung Session, Domain chung, Học tiếp).

Run: `rg -c "data_store/key_value.md|data_store/room_" knowledge/android/docs/session_05/index.md`
Expected: `4` (đủ 4 links cũ).

- [ ] **Step 4: Commit**

```bash
git add knowledge/android/docs/session_05/index.md
git commit -m "docs(android): declare Shop shared domain for session_05 data_store"
```

---

### Task 2: Refactor room_architecture.md — Article -> Product

**Files:**
- Modify: `knowledge/android/docs/session_05/data_store/room_architecture.md:68-139`
- Test: `rg -n "Article|Product" knowledge/android/docs/session_05/data_store/room_architecture.md`

**Interfaces:**
- Consumes: tên chuẩn từ Task 1 (`ProductEntity`, `ShopDatabase`).
- Produces: Lesson kiến trúc chuẩn Shop cho Task 3-4 tham chiếu bằng tên (không bằng code).

- [ ] **Step 1: Viết lại Entity từ Article sang Product (giữ nguyên số dòng)**

Thay block cũ:

```kotlin
@Entity(tableName = "articles")
data class ArticleEntity(
    @PrimaryKey val id: String,
    val title: String,
    val content: String,
    val timestamp: Long
)
```

bằng:

```kotlin
@Entity(tableName = "products")
data class ProductEntity(
    @PrimaryKey val id: String,
    val name: String,
    val price: Long,
    val timestamp: Long
)
```

- [ ] **Step 2: Viết lại DAO + Database theo Product**

```kotlin
@Dao
interface ProductDao {
    @Query("SELECT * FROM products ORDER BY timestamp DESC")
    fun getAllProducts(): Flow<List<ProductEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertProducts(products: List<ProductEntity>)

    @Query("DELETE FROM products")
    suspend fun clearAll()
}
```

```kotlin
@Database(entities = [ProductEntity::class], version = 1, exportSchema = false)
abstract class ShopDatabase : RoomDatabase() {
    abstract fun productDao(): ProductDao
}
```

- [ ] **Step 3: Viết lại Repository SSOT theo Product (giữ Flow pattern)**

```kotlin
class ProductRepository(
    private val api: ProductApi,
    private val dao: ProductDao
) {
    val products: Flow<List<ProductEntity>> = dao.getAllProducts()

    suspend fun syncDataFromApi() {
        try {
            val networkProducts = api.fetchProducts()
            dao.insertProducts(networkProducts.map { /* DTO -> Entity */ })
        } catch (e: Exception) {
            // Mất mạng: UI vẫn hiển thị cache từ Room
        }
    }
}
```

- [ ] **Step 4: Verify không còn Article, fences có lang**

Run: `rg -n "Article|articles" knowledge/android/docs/session_05/data_store/room_architecture.md`
Expected: không có kết quả.

Run: `rg -n '^```(kotlin|mermaid)' knowledge/android/docs/session_05/data_store/room_architecture.md`
Expected: >=4 (3 kotlin + 1 mermaid cũ).

- [ ] **Step 5: Commit**

```bash
git add knowledge/android/docs/session_05/data_store/room_architecture.md
git commit -m "docs(android): unify room_architecture example to Shop Product domain"
```

---

### Task 3: Refactor room_advanced.md — Note/User -> Product/Customer

**Files:**
- Modify: `knowledge/android/docs/session_05/data_store/room_advanced.md:28-102`
- Test: `rg -n "notes|users|products|customers" knowledge/android/docs/session_05/data_store/room_advanced.md`

**Interfaces:**
- Consumes: `ProductEntity`, `CustomerEntity`, `ShopDatabase` từ Task 1-2 (chỉ tên, không import code).
- Produces: Lesson migration/indexing chuẩn Shop.

- [ ] **Step 1: Viết lại Migration — thêm cột discount cho products**

Thay `NoteEntity`/`notes`/`is_pinned` bằng:

```kotlin
@Entity(tableName = "products")
data class ProductEntity(
    @PrimaryKey val id: String,
    val name: String,
    val price: Long,
    @ColumnInfo(defaultValue = "0")
    val discount: Int
)

@Database(entities = [ProductEntity::class], version = 2)
abstract class ShopDatabase : RoomDatabase() { /* ... */ }
```

```kotlin
val MIGRATION_1_2 = object : Migration(1, 2) {
    override fun migrate(db: SupportSQLiteDatabase) {
        db.execSQL("ALTER TABLE products ADD COLUMN discount INTEGER NOT NULL DEFAULT 0")
    }
}
```

```kotlin
Room.databaseBuilder(context, ShopDatabase::class.java, "shop.db")
    .addMigrations(MIGRATION_1_2)
    .build()
```

Giữ nguyên đoạn TIP về AutoMigration, chỉ đổi chữ `notes` thành `products` trong văn xuôi.

- [ ] **Step 2: Viết lại Indexing — customers thay users**

```kotlin
@Entity(
    tableName = "customers",
    indices = [
        Index(value = ["full_name"]),
        Index(value = ["email"], unique = true)
    ]
)
data class CustomerEntity(
    @PrimaryKey val id: String,
    val full_name: String,
    val email: String,
    val address: String
)
```

Văn xuôi: `bảng users 1 triệu dòng` -> `bảng customers 1 triệu dòng`, query giữ nguyên ý (`WHERE full_name = ...`).

- [ ] **Step 3: Verify tên cũ biến mất**

Run: `rg -n "NoteEntity|notes|UserEntity|FROM users|TABLE notes" knowledge/android/docs/session_05/data_store/room_advanced.md`
Expected: không có kết quả.

Run: `rg -n "ProductEntity|CustomerEntity|products|customers" knowledge/android/docs/session_05/data_store/room_advanced.md`
Expected: >=6 dòng khớp.

- [ ] **Step 4: Commit**

```bash
git add knowledge/android/docs/session_05/data_store/room_advanced.md
git commit -m "docs(android): unify room_advanced examples to Shop Product/Customer"
```

---

### Task 4: Chuẩn hóa room_transactions.md — tách micro-example Shop

**Files:**
- Modify: `knowledge/android/docs/session_05/data_store/room_transactions.md:39-107`
- Test: `rg -n "Wallet|Order" knowledge/android/docs/session_05/data_store/room_transactions.md`

**Interfaces:**
- Consumes: `WalletEntity`, `OrderEntity`, `OrderDetailEntity` từ Task 1 (tên đã đúng hướng Shop, chỉ cần chuẩn hóa).
- Produces: Lesson transaction mẫu mực cho micro-example (1 concept/vi dụ).

- [ ] **Step 1: Chuẩn hóa Entity names — thêm tableName显式**

Đảm bảo DAO dùng đúng 3 Entity Shop, mỗi hàm lẻ <10 dòng:

```kotlin
@Entity(tableName = "wallets")
data class WalletEntity(@PrimaryKey val id: String, val balance: Long)

@Entity(tableName = "orders")
data class OrderEntity(@PrimaryKey(autoGenerate = true) val id: Long = 0, val total: Long)

@Entity(tableName = "order_details")
data class OrderDetailEntity(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val orderId: Long,
    val productId: String,
    val quantity: Int
)
```

- [ ] **Step 2: Giữ hàm processCheckout nguyên logic, rút gọn comment**

```kotlin
@Dao
interface OrderDao {
    @Update
    suspend fun updateWallet(wallet: WalletEntity)

    @Insert
    suspend fun insertOrder(order: OrderEntity): Long

    @Insert
    suspend fun insertOrderDetails(details: List<OrderDetailEntity>)

    @Transaction
    suspend fun processCheckout(
        wallet: WalletEntity,
        order: OrderEntity,
        details: List<OrderDetailEntity>
    ) {
        updateWallet(wallet)
        val orderId = insertOrder(order)
        insertOrderDetails(details.map { it.copy(orderId = orderId) })
    }
}
```

Xóa comment dài trong code, chuyển giải thích Rollback ra văn xuôi trước code (đúng Writing Style: bản chất trước code).

- [ ] **Step 3: Verify mỗi code block <30 dòng, có lang**

Run: `rg -n '^```kotlin' knowledge/android/docs/session_05/data_store/room_transactions.md`
Expected: >=3.

Run: `awk '/^```kotlin/{f=1;n=0;next} /^```$/{if(f) print NR": "n" lines"; f=0} f{n++}' knowledge/android/docs/session_05/data_store/room_transactions.md`
Expected: mọi block <=30 lines (nếu vượt thì tách văn xuôi ra ngoài).

- [ ] **Step 4: Commit**

```bash
git add knowledge/android/docs/session_05/data_store/room_transactions.md
git commit -m "docs(android): normalize checkout transaction to micro-example style"
```

---

### Task 5: Gắn key_value.md vào ngữ cảnh Shop (không đổi logic)

**Files:**
- Modify: `knowledge/android/docs/session_05/data_store/key_value.md:13-18,41-44`
- Test: `rg -n "Shop|auth_token|dark_mode" knowledge/android/docs/session_05/data_store/key_value.md`

**Interfaces:**
- Consumes: `SettingsRepository` tên từ Task 1.
- Produces: Lesson Key-Value khép kín Shop (login Shop + theme Shop).

- [ ] **Step 1: Sửa 2 câu mở đầu gắn vào Shop**

Thay list ví dụ chung chung bằng:

```markdown
Trong app Shop của Module này, bạn cần lưu:
- Auth token sau khi login Shop.
- Dark Mode của Shop.
- Cờ đã xem Onboarding Shop hay chưa.
```

Giữ nguyên toàn bộ code `SettingsRepository`, `SettingsViewModel`, migration — vì đã đúng chuẩn micro-example (ngắn, 1 khái niệm, có lang).

- [ ] **Step 2: Thêm 1 câu link về domain chung ở cuối Tổng kết**

```markdown
Các Lesson Room tiếp theo trong Module (5.1.2–5.1.4) dùng chung ngữ cảnh Shop này
với `Product/Order/Customer`, còn Key-Value chỉ giữ Settings nhẹ.
```

- [ ] **Step 3: Verify không vỡ code fences**

Run: `rg -n '^```(kotlin|groovy)' knowledge/android/docs/session_05/data_store/key_value.md`
Expected: >=4 (1 groovy + 3 kotlin trở lên).

- [ ] **Step 4: Commit**

```bash
git add knowledge/android/docs/session_05/data_store/key_value.md
git commit -m "docs(android): anchor key_value lesson to Shop context"
```

---

### Task 6: Verification tổng thể Module

**Files:**
- Verify: `knowledge/android/docs/session_05/index.md`, `knowledge/android/docs/session_05/data_store/*.md`

**Interfaces:**
- Consumes: kết quả Task 1-5.
- Produces: Module đạt chuẩn domain chung + micro-example.

- [ ] **Step 1: Kiểm tra thống nhất tên — không còn tên lạc domain**

Run: `rg -n "ArticleEntity|articles|NoteEntity|TABLE notes|FROM users|UserEntity" knowledge/android/docs/session_05/data_store/`
Expected: không có kết quả.

- [ ] **Step 2: Kiểm tra tên Shop phủ đều**

Run: `rg -n "ProductEntity|OrderEntity|CustomerEntity|ShopDatabase|SettingsRepository" knowledge/android/docs/session_05/data_store/ knowledge/android/docs/session_05/index.md`
Expected: mỗi file có ít nhất 1 khớp; index.md có đủ 7 tên.

- [ ] **Step 3: Kiểm tra Markdown Standard**

Run: `rg -n '^# ' knowledge/android/docs/session_05/data_store/*.md`
Expected: mỗi file đúng 1 dòng (1 H1).

Run: `rg -n '^```$' knowledge/android/docs/session_05/data_store/*.md | wc -l`
Expected: số fence đóng chẵn, khớp số fence mở có lang.

Run: `rg -n '^```[^a-z]' knowledge/android/docs/session_05/data_store/*.md`
Expected: không có kết quả (mọi fence mở đều có lang).

- [ ] **Step 4: Self-review theo playbook review-content (đọc tay)**

Đọc lướt 4 file, check: bản chất trước code, 1 ví dụ 1 khái niệm, không import chéo code, không project lớn trong Lesson, link nội bộ tương đối còn đúng.

- [ ] **Step 5: Git status review (không push nếu chưa yêu cầu)**

Run: `git status --short && git log --oneline -6`
Expected: 5 commits Task 1-5 hiện đúng thứ tự, không còn file dirty ngoài ý muốn.

---

## Self-Review của plan

1. **Spec coverage:** Hướng 1 (chung domain Shop, không chung codebase) -> Task 1 khai báo contract + Task 2/3/4/5 đổi tên về Shop nhưng giữ code độc lập. Hướng 2 (1 Topic 1 micro-example) -> Task 2/4 tách block <30 dòng, bản chất trước code, không import chéo. Đủ 4 file audit ban đầu.
2. **Placeholder scan:** không có TBD/TODO; mọi Step có code thật, lệnh `rg` thật, commit message thật, đường dẫn `knowledge/android/...` thật khớp repo hiện tại.
3. **Type consistency:** tên `ProductEntity/CustomerEntity/OrderEntity/WalletEntity/ShopDatabase/SettingsRepository` dùng nhất quán Task 1 -> Task 6; `products/customers/orders/shop.db` nhất quán SQL + Entity.

---

## Phạm vi không làm (để tránh scope creep)

- Không tạo Demo App/Capstone Shop hoàn chỉnh trong plan này (để plan sau nếu cần).
- Không đổi frontmatter, không đổi `map/*.yml`, không đụng `session_06+`.
- Không sửa logic kỹ thuật (Migration SQL, Transaction, DataStore Flow giữ nguyên ý).
