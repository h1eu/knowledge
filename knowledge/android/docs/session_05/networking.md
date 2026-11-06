---
id: android.networking.basics
title: Networking in Android — Từ Bản Chất Socket, OkHttp Đến Retrofit & Ktor Thực Chiến
summary: Cẩm nang toàn diện và chuyên sâu về Networking trong Android. Đi từ tầng vật lý Socket, TLS Handshake, mổ xẻ kiến trúc OkHttp Interceptor Chain & Connection Pool, giải quyết triệt để bài toán kinh điển Concurrent 401 Refresh Token, thiết kế Error Handling chuẩn Clean Architecture, Retry với Exponential Backoff, bảo mật SSL Pinning, Multipart Upload có Progress Tracking chống OOM, giám sát kết nối tầng OS với ConnectivityManager & Flow, so sánh & thực chiến song song Retrofit vs Ktor Client (KMP), và Unit Test với MockWebServer.
status: published
difficulty: advanced
depth: deep-dive
estimated_reading_time: 45 phút
tags:
  - android
  - networking
  - retrofit
  - okhttp
  - ktor
  - coroutines
  - flow
  - connectivity-manager
  - ssl-pinning
  - clean-architecture
prerequisites:
  - android.thread.working_with_thread
  - android.session05.overview
related:
  - android.data_store.room_transactions
  - android.thread.working_with_thread
learning_outcomes:
  - Giải thích được bản chất Socket, DNS, TCP Handshake, TLS 1.3 và lý do Android cấm gọi mạng trên Main Thread (NetworkOnMainThreadException).
  - Thiết kế được Error Handling và Result Pattern phân tầng, kèm Retry với Exponential Backoff & Jitter, không nuốt CancellationException.
  - Áp dụng được Network Security Config, Certificate Pinning có backup pin và các mặc định bảo mật của nền tảng (cleartext, CA người dùng cài).
  - Triển khai được NetworkMonitor theo dõi mạng mặc định bằng ConnectivityManager, NetworkCapabilities và Kotlin Flow.
  - Phân biệt được vai trò của OkHttp, Retrofit và Ktor Client trong tầng mạng của app.
knowledge_gap: Nhiều lập trình viên chỉ biết gọi API đơn giản qua Retrofit mà không nắm cơ chế bên dưới của OkHttp, lúng túng khi xử lý token refresh đồng thời, gặp lỗi crash OOM khi upload file lớn, hoặc chỉ check mạng sơ sài bằng INTERNET capability thay vì VALIDATED.
---

# Networking in Android: Từ Bản Chất Socket, OkHttp Đến Retrofit & Ktor Thực Chiến

Trong bất kỳ ứng dụng di động hiện đại nào, mạng (Networking) là huyết mạch kết nối người dùng với hệ thống backend đám mây. Dù là tải bảng tin mạng xã hội, thực hiện giao dịch chuyển khoản ngân hàng hay đồng bộ giỏ hàng thương mại điện tử, mọi trải nghiệm mượt mà đều bắt nguồn từ một tầng mạng ổn định, an toàn và tối ưu.

Tuy nhiên, môi trường mạng di động vốn dĩ không ổn định: thiết bị di chuyển liên tục qua các trạm BTS sóng yếu, chuyển đổi đột ngột giữa Wi-Fi và 4G/5G, đi vào thang máy hoặc kết nối vào các điểm Wi-Fi công cộng (Captive Portal) không có Internet thực sự. Một ứng dụng xử lý mạng cẩu thả sẽ nhanh chóng bộc lộ các lỗi nghiêm trọng:

- **Treo ứng dụng (ANR) hoặc văng app (Crash):** gọi mạng trên Main Thread (`NetworkOnMainThreadException`), hoặc để ngoại lệ mạng cấp thấp rò lên tầng UI mà không được bắt.
- **Tràn bộ nhớ (`OutOfMemoryError`):** đọc toàn bộ file dung lượng lớn vào mảng byte trong RAM khi upload multipart.
- **Văng đăng nhập hàng loạt:** khi Access Token hết hạn, nhiều request đồng thời cùng nhận lỗi `401` và cùng gọi refresh token, các lần refresh xung đột nhau làm vô hiệu hoá session.
- **Lộ lọt thông tin người dùng (MITM Attack):** kẻ tấn công đứng giữa qua proxy độc hại để đọc trộm, sửa dữ liệu tài chính và thông tin cá nhân.
- **Lãng phí băng thông và cạn pin:** không tái sử dụng kết nối (Connection Pooling) và không có HTTP Cache hợp lý, nên mỗi lần gọi đều phải bắt tay lại và tải lại dữ liệu.

Tài liệu này cung cấp một cái nhìn toàn diện từ tầng bản chất hệ điều hành (Socket, TLS) đến tầng triển khai thực chiến cấp cao (OkHttp, Retrofit, Ktor Client), giúp bạn xây dựng một hạ tầng mạng chuẩn công nghiệp, sẵn sàng cho môi trường production quy mô lớn.

---

## 1. Bản chất tầng mạng: Từ Click nút UI đến Kernel Socket & TLS Handshake

Để làm chủ việc gọi API, trước hết một kỹ sư cần hiểu điều gì thực sự diễn ra bên dưới hệ điều hành khi ứng dụng gửi đi một HTTP Request.

Khi người dùng bấm một nút để gửi dữ liệu, hệ điều hành và phần cứng mạng phối hợp qua 5 giai đoạn:

1. **Main-Safety:** lời gọi API được điều phối sang background thread (`Dispatchers.IO`). Nếu chạy trên Main Thread, Android ném ngay `NetworkOnMainThreadException` để bảo vệ chu kỳ vẽ màn hình (mỗi khung hình chỉ có khoảng 16.6 ms ở 60 Hz, 8.3 ms ở 120 Hz).
2. **DNS Lookup:** phân giải domain (ví dụ `api.example.com`) thành địa chỉ IP (IPv4 hoặc IPv6).
3. **TCP 3-Way Handshake:** gửi `SYN`, nhận `SYN-ACK`, gửi `ACK` để thiết lập kênh truyền tin cậy. Tốn 1 RTT (Round Trip Time).
4. **TLS 1.3 Handshake:** gửi `ClientHello`, nhận `ServerHello` kèm chứng chỉ số và key share; hai bên từ đó tự tính ra khoá phiên đối xứng (ví dụ AES-GCM) mà không truyền khoá đó qua mạng. Tốn thêm 1 RTT.
5. **HTTP Request & Response:** gửi header, body và nhận stream dữ liệu phản hồi từ máy chủ.

Sơ đồ dưới đây chi tiết hoá 5 giai đoạn trên cho một lần bấm nút "Mua hàng":

```mermaid
sequenceDiagram
    autonumber
    actor User as Người dùng
    participant App as Android App (Main Thread)
    participant Worker as Worker Thread (Dispatchers.IO)
    participant OS as Linux Kernel / Socket
    participant DNS as DNS Server
    participant Server as Backend API Server

    User->>App: Bấm nút "Mua hàng"
    App->>Worker: Điều phối qua Coroutine (Dispatchers.IO)
    Note over App,Worker: Main-Safety: Tuyệt đối không gọi mạng trên Main Thread!
    Worker->>DNS: DNS Lookup: api.shop.com -> 104.21.45.10
    DNS-->>Worker: Trả về IP Address
    Worker->>OS: Mở TCP Socket (IP:Port)
    OS->>Server: [TCP 3-Way Handshake] SYN
    Server-->>OS: SYN-ACK
    OS->>Server: ACK (TCP Connection Established)
    Note over OS,Server: [TLS 1.3 Handshake] Bảo mật kênh truyền
    OS->>Server: ClientHello (Supported Ciphers, TLS Version)
    Server-->>OS: ServerHello + Certificate + Key Share
    OS->>OS: Kiểm tra Certificate Authority (CA) & Hạn dùng
    OS->>Server: Finished (Kênh mã hóa đối xứng AES-GCM sẵn sàng)
    Worker->>Server: [HTTP/2 POST] Headers + Body JSON
    Server-->>Worker: [HTTP/2 200 OK] Response Body Stream
    Worker->>App: Parse JSON DTO -> Cập nhật UI State
    App-->>User: Hiển thị "Đặt hàng thành công!"
```

### 1.1 Vấn đề NetworkOnMainThreadException
Từ phiên bản Android 3.0 (Honeycomb), hệ điều hành áp dụng cơ chế giám sát nghiêm ngặt: **Mọi thao tác liên quan đến Socket I/O đều bị cấm trên Main Thread**.
Nếu bạn cố tình thực hiện một lời gọi mạng đồng bộ trên Main Thread:
```kotlin
// SAI LẦM: Làm đơ giao diện người dùng
val url = URL("https://api.example.com/data")
val connection = url.openConnection() as HttpURLConnection
val data = connection.inputStream.bufferedReader().readText() // CRASH!
```
Hệ điều hành sẽ lập tức ném ra ngoại lệ:
```text
android.os.NetworkOnMainThreadException
    at android.os.StrictMode$AndroidBlockGuardPolicy.onNetwork(StrictMode.java:1605)
```
**Bản chất:** Network I/O có độ trễ không thể dự đoán (Latency từ vài trăm millisecond đến vài giây). Nếu Main Thread bị chặn (block), hệ thống không thể xử lý các thông điệp vẽ màn hình (Choreographer VSYNC), dẫn đến việc người dùng thấy ứng dụng bị đóng băng và hộp thoại **ANR (Application Not Responding)** xuất hiện sau 5 giây.

### 1.2 Chi phí thiết lập kết nối (Connection Overhead)
Mỗi lần mở một kết nối HTTPS mới, thiết bị phải trả giá rất đắt:
1. **DNS Resolution (Hỏi IP):** Tốn từ 50ms - 250ms trên sóng di động 3G/4G.
2. **TCP 3-Way Handshake:** Tốn 1 RTT (Round Trip Time) để gửi gói tin SYN, nhận SYN-ACK và gửi ACK.
3. **TLS Handshake (HTTPS):** 
   - TLS 1.2: Tốn thêm 2 RTT để trao đổi chứng chỉ và thống nhất khóa mã hóa.
   - TLS 1.3: Cải tiến còn 1 RTT (hoặc 0-RTT nếu hỗ trợ phục hồi phiên - Session Resumption).
4. **Tổng độ trễ:** Có thể lên tới **300ms - 800ms** trước khi byte dữ liệu đầu tiên của API được truyền đi!

> [!IMPORTANT]
> **Nhận thức cốt lõi:** Nếu ứng dụng của bạn tạo mới một kết nối Socket cho mỗi request HTTP, trải nghiệm người dùng sẽ cực kỳ chậm chạp và hao pin. Đây chính là lý do bạn bắt buộc phải sử dụng các thư viện có cơ chế **Connection Pooling** và **HTTP/2 Multiplexing** như OkHttp.

---

## 2. Kiến trúc nội bộ OkHttp: Trái tim của Networking Android

OkHttp (được phát triển bởi Square) là thư viện mạng tiêu chuẩn nền tảng trong Android. Kể cả Google cũng sử dụng mã nguồn OkHttp bên dưới lớp hiện thực `HttpURLConnection` của Android OS.

### 2.1 Mẫu thiết kế Chain of Responsibility (Interceptor Chain)
Sức mạnh lớn nhất của OkHttp nằm ở chuỗi **Interceptor Chain**. Mọi request gửi đi và response trả về đều phải đi qua một chuỗi các Interceptor nối tiếp nhau theo mẫu thiết kế **Chain of Responsibility**:

```mermaid
graph TD
    subgraph Client ["Ứng dụng của bạn"]
        Req["Request"]
        Resp["Response"]
    end

    subgraph InterceptorChain ["OkHttp Interceptor Chain"]
        direction TB
        AppInt["1. Application Interceptors (Custom Headers, Logging, Auth)"]
        RetryInt["2. RetryAndFollowUpInterceptor (Redirect, Retry khi crash kết nối)"]
        BridgeInt["3. BridgeInterceptor (Thêm Content-Type, User-Agent, Keep-Alive, Gzip)"]
        CacheInt["4. CacheInterceptor (Đọc cache từ đĩa, kiểm tra ETag, 304 Not Modified)"]
        ConnectInt["5. ConnectInterceptor (Mở TCP Socket, TLS Handshake từ ConnectionPool)"]
        NetInt["6. Network Interceptors (Giám sát dữ liệu thực tế trên Socket)"]
        CallInt["7. CallServerInterceptor (Ghi HTTP request ra Socket, đọc HTTP response)"]
        
        AppInt --> RetryInt --> BridgeInt --> CacheInt --> ConnectInt --> NetInt --> CallInt
    end

    subgraph Network ["Tầng Mạng & Server"]
        RemoteServer["Backend API Server"]
    end

    Req --> AppInt
    CallInt --> RemoteServer
    RemoteServer --> CallInt
    CallInt -.-> NetInt -.-> ConnectInt -.-> CacheInt -.-> BridgeInt -.-> RetryInt -.-> AppInt -.-> Resp

    style AppInt fill:#2563EB,stroke:#1D4ED8,color:#fff
    style CacheInt fill:#059669,stroke:#047857,color:#fff
    style ConnectInt fill:#D97706,stroke:#B45309,color:#fff
    style CallInt fill:#DC2626,stroke:#B91C1C,color:#fff
```

### 2.2 Trách nhiệm từng Interceptor cốt lõi
1. **Application Interceptors:** Nơi lập trình viên gắn các logic riêng: gắn Bearer Token, chèn Request ID, mã hóa body, v.v.
2. **RetryAndFollowUpInterceptor:** Tự động phục hồi kết nối khi đường truyền bị đứt gãy hoặc xử lý các mã chuyển hướng (301 Moved Permanently, 307 Temporary Redirect).
3. **BridgeInterceptor:** Cầu nối giữa mã nguồn ứng dụng và giao thức HTTP chuẩn. Nó tự động gắn các header bắt buộc như `Host`, `Keep-Alive`, `Accept-Encoding: gzip` và tự động giải nén dữ liệu gzip trả về.
4. **CacheInterceptor:** Kiểm tra xem request có thể phục vụ từ bộ nhớ đệm (Disk Cache) không. Nếu bản cache đã cũ nhưng có `ETag` hoặc `Last-Modified`, nó gửi request có điều kiện kèm header `If-None-Match` / `If-Modified-Since`. Nếu server trả về `304 Not Modified`, nó sẽ lấy dữ liệu từ cache mà không cần tải lại toàn bộ body.
5. **ConnectInterceptor:** Tìm kiếm một kết nối Socket sẵn có trong `ConnectionPool`. Nếu chưa có, nó khởi tạo TCP Socket và TLS Handshake.
6. **CallServerInterceptor:** Bước cuối cùng của chuỗi. Nó trực tiếp ghi các dòng text HTTP/1.1 hoặc các frame HTTP/2 vào `BufferedSink` của Socket, sau đó đọc kết quả từ `BufferedSource`.

### 2.3 Cơ chế Connection Pool (Tái sử dụng kết nối)
Thay vì đóng Socket ngay khi nhận xong response (khiến lần gọi sau phải handshake lại từ đầu), OkHttp duy trì một **ConnectionPool**:
- Mặc định giữ tối đa **5 kết nối nhàn rỗi (idle connections)** trong vòng **5 phút**.
- Với HTTP/2, nhiều request độc lập có thể chạy song song trên **cùng một kết nối TCP duy nhất** (Multiplexing), loại bỏ hoàn toàn hiện tượng nghẽn đầu hàng (Head-of-Line Blocking) ở tầng ứng dụng.

---

## 3. Custom Interceptors chuẩn Production

Trong một dự án thực tế, bạn sẽ cần tạo các Interceptor riêng để giải quyết các bài toán hạ tầng: gắn header thiết bị, truy vết request và logging an toàn.

### 3.1 Dynamic Header & Tracing Interceptor
Interceptor này tự động bổ sung các header quan trọng phục vụ tracing hệ thống và xác thực định danh:

```kotlin
import okhttp3.Interceptor
import okhttp3.Response
import java.util.UUID

class HeaderInterceptor(
    private val tokenProvider: () -> String?,
    private val appVersion: String
) : Interceptor {

    override fun intercept(chain: Interceptor.Chain): Response {
        val originalRequest = chain.request()
        
        val requestBuilder = originalRequest.newBuilder()
            .header("X-App-Version", appVersion)
            .header("X-Platform", "Android")
            .header("X-Request-ID", UUID.randomUUID().toString()) // Phục vụ truy vết log phân tán
            .header("Accept", "application/json")

        // Tự động gắn Token nếu có và request chưa có header Authorization
        val token = tokenProvider()
        if (!token.isNullOrBlank() && originalRequest.header("Authorization") == null) {
            requestBuilder.header("Authorization", "Bearer $token")
        }

        return chain.proceed(requestBuilder.build())
    }
}
```

### 3.2 Sanitized Logging Interceptor (Bảo mật PII & Credentials)
Thư viện `HttpLoggingInterceptor` mặc định sẽ in toàn bộ dữ liệu ra Logcat. Trong môi trường ngân hàng hoặc thương mại điện tử, việc in thẻ tín dụng (CVV), mật khẩu hoặc mã OTP ra Logcat là hành vi vi phạm chuẩn bảo mật nghiêm trọng (OWASP Mobile Top 10, GDPR).

```kotlin
import okhttp3.logging.HttpLoggingInterceptor
import android.util.Log

object SafeLoggingInterceptorFactory {
    fun create(isDebug: Boolean): HttpLoggingInterceptor {
        val logging = HttpLoggingInterceptor { message ->
            // Che giấu dữ liệu nhạy cảm trước khi in ra Logcat
            val sanitized = message
                .replace(Regex("\"password\"\\s*:\\s*\"[^\"]+\""), "\"password\":\"***\"")
                .replace(Regex("\"cardNumber\"\\s*:\\s*\"[^\"]+\""), "\"cardNumber\":\"***\"")
                .replace(Regex("\"cvv\"\\s*:\\s*\"[^\"]+\""), "\"cvv\":\"***\"")
            
            Log.d("OkHttp", sanitized)
        }
        
        // Môi trường Release tuyệt đối KHÔNG in Body ra Logcat
        logging.level = if (isDebug) {
            HttpLoggingInterceptor.Level.BODY
        } else {
            HttpLoggingInterceptor.Level.NONE
        }
        
        // Che giấu header Authorization
        logging.redactHeader("Authorization")
        logging.redactHeader("Cookie")
        
        return logging
    }
}
```

---

## 4. Giải quyết bài toán kinh điển: Concurrent 401 & Auto Refresh Token

Một trong những bài toán hóc búa nhất khi xây dựng ứng dụng di động là: **Xử lý Refresh Token khi nhiều API đồng thời nhận mã lỗi 401 Unauthorized**.

### 4.1 Thảm họa Token Desynchronization (Khi không đồng bộ)
Giả sử người dùng mở màn hình Dashboard, app đồng thời bắn 3 request:
1. `GET /api/user/profile`
2. `GET /api/notifications`
3. `GET /api/cart`

Access Token vừa hết hạn, cả 3 request đồng thời nhận về mã lỗi `401`. Nếu xử lý ngây thơ:
- Cả 3 request cùng lúc gọi `POST /api/auth/refresh-token`.
- Server nhận được request refresh đầu tiên -> Cấp Access Token mới A và Refresh Token mới B, đồng thời **thu hồi (revoke) Refresh Token cũ**.
- Hai request refresh tiếp theo gửi Refresh Token cũ lên server -> Server báo lỗi `Invalid Refresh Token`!
- **Hệ quả:** App xóa session và người dùng bị đá văng ra màn hình đăng nhập một cách oan uổng.

### 4.2 Giải pháp chuẩn Senior: okhttp3.Authenticator
OkHttp cung cấp sẵn interface `okhttp3.Authenticator` được thiết kế đặc thù cho việc xử lý mã `401`. Khi kết hợp với khối khóa đồng bộ (`synchronized`), chúng ta đạt được giải pháp tối ưu:

```mermaid
sequenceDiagram
    autonumber
    participant R1 as Request 1 (/profile)
    participant R2 as Request 2 (/cart)
    participant Auth as TokenAuthenticator (Lock)
    participant Server as Auth Server

    R1->>Server: Gửi Request (Token Cũ: T1)
    R2->>Server: Gửi Request (Token Cũ: T1)
    Server-->>R1: 401 Unauthorized
    Server-->>R2: 401 Unauthorized

    Note over R1,Auth: R1 kích hoạt Authenticator & Chiếm Lock
    R1->>Auth: authenticate(response) [Nhận Lock]
    Auth->>Auth: Kiểm tra: Token trong request có khớp Token hiện tại không? (Khớp: T1 == T1)
    Auth->>Server: POST /auth/refresh (Gọi đồng bộ)
    Server-->>Auth: 200 OK (Cấp Token Mới: T2)
    Auth->>Auth: Lưu T2 vào bộ nhớ / DataStore
    Auth-->>R1: Trả về Request 1 kèm Header: Bearer T2
    R1->>Server: Thử lại Request 1 với T2 -> Thành công!
    Note over R1,Auth: R1 giải phóng Lock

    Note over R2,Auth: R2 kích hoạt Authenticator & Nhận Lock
    R2->>Auth: authenticate(response) [Nhận Lock]
    Auth->>Auth: Kiểm tra: Token của R2 (T1) có khớp Token hiện tại (T2) không?
    Note over Auth: KHÔNG KHỚP! (T1 != T2) -> Nghĩa là request khác đã vừa refresh xong!
    Auth-->>R2: Không cần gọi server nữa! Trả về Request 2 kèm Header: Bearer T2 ngay lập tức
    R2->>Server: Thử lại Request 2 với T2 -> Thành công!
```

### 4.3 Mã nguồn triển khai chi tiết

```kotlin
import okhttp3.Authenticator
import okhttp3.Request
import okhttp3.Response
import okhttp3.Route

class TokenManager(
    private var accessToken: String?,
    private var refreshToken: String?,
    private val refreshApiCall: (String) -> Pair<String, String>? // Trả về Pair(newAccess, newRefresh)
) {
    @Synchronized
    fun getAccessToken(): String? = accessToken

    @Synchronized
    fun refreshTokens(failedToken: String): String? {
        // Double-check: Nếu token hiện tại đã khác failedToken, 
        // nghĩa là một luồng khác đã vừa refresh thành công!
        if (accessToken != null && accessToken != failedToken) {
            return accessToken
        }

        val currentRefresh = refreshToken ?: return null
        val newTokens = refreshApiCall(currentRefresh) ?: return null

        accessToken = newTokens.first
        refreshToken = newTokens.second
        return accessToken
    }

    @Synchronized
    fun clearTokens() {
        accessToken = null
        refreshToken = null
    }
}

class TokenAuthenticator(
    private val tokenManager: TokenManager
) : Authenticator {

    override fun authenticate(route: Route?, response: Response): Request? {
        // Đề phòng vòng lặp vô tận: Nếu đã thử lại 3 lần mà vẫn bị 401 thì từ bỏ
        if (responseCount(response) >= 3) {
            tokenManager.clearTokens()
            return null // Đăng xuất người dùng
        }

        // Lấy token đã dùng trong request bị lỗi 401
        val failedToken = response.request.header("Authorization")
            ?.removePrefix("Bearer ")
            ?.trim() ?: ""

        // Thực hiện refresh đồng bộ an toàn qua TokenManager
        val newAccessToken = tokenManager.refreshTokens(failedToken) ?: run {
            tokenManager.clearTokens()
            return null // Refresh thất bại (Refresh Token hết hạn) -> Buộc đăng nhập lại
        }

        // Tạo request mới với token mới để OkHttp tự động thử lại
        return response.request.newBuilder()
            .header("Authorization", "Bearer $newAccessToken")
            .build()
    }

    private fun responseCount(response: Response): Int {
        var count = 1
        var prior = response.priorResponse
        while (prior != null) {
            count++
            prior = prior.priorResponse
        }
        return count
    }
}
```

---

## 5. Chuẩn hóa Error Handling & Result Pattern trong Clean Architecture

Trong Clean Architecture, tầng UI (Compose hoặc Activity) **tuyệt đối không được phép biết đến các ngoại lệ mạng cấp thấp** như `SocketTimeoutException`, `UnknownHostException` hay `HttpException`. Nếu để lộ các exception này lên UI, mã nguồn UI sẽ tràn ngập các khối `try-catch`, khó kiểm thử và dễ bị crash nếu sót exception.

### 5.1 Phân cấp lỗi mạng chuẩn
Một hệ thống xử lý lỗi mạng hoàn chỉnh cần phân loại thành 4 nhóm rõ rệt:

```mermaid
classDiagram
    class NetworkResult~T~ {
        <<sealed interface>>
    }
    class Success~T~ {
        +T data
    }
    class Error {
        <<sealed interface>>
    }
    class HttpError {
        +Int code
        +String? message
        +String? errorBody
    }
    class NetworkTimeout {
        +String message
    }
    class NoInternet {
        +String message
    }
    class SerializationError {
        +Throwable cause
    }
    class UnknownError {
        +Throwable cause
    }

    NetworkResult <|-- Success
    NetworkResult <|-- Error
    Error <|-- HttpError
    Error <|-- NetworkTimeout
    Error <|-- NoInternet
    Error <|-- SerializationError
    Error <|-- UnknownError
```

### 5.2 Mã nguồn NetworkResult Pattern

```kotlin
import java.io.IOException
import java.net.SocketTimeoutException
import java.net.UnknownHostException
import kotlinx.coroutines.CancellationException
import retrofit2.HttpException

sealed interface NetworkResult<out T> {
    data class Success<out T>(val data: T) : NetworkResult<T>
    
    sealed interface Error : NetworkResult<Nothing> {
        data class Http(val code: Int, val message: String?, val errorBody: String?) : Error
        data class NetworkTimeout(val message: String = "Kết nối quá thời gian quy định") : Error
        data class NoInternet(val message: String = "Không có kết nối Internet") : Error
        data class Serialization(val cause: Throwable) : Error
        data class Unknown(val cause: Throwable) : Error
    }
}

/**
 * Hàm bao bọc an toàn tuyệt đối cho mọi lời gọi API.
 * Đảm bảo hàm suspend không bao giờ ném Exception ra ngoài.
 */
suspend fun <T> safeApiCall(apiCall: suspend () -> T): NetworkResult<T> {
    return try {
        NetworkResult.Success(apiCall())
    } catch (e: HttpException) {
        val code = e.code()
        val errorBody = e.response()?.errorBody()?.string()
        NetworkResult.Error.Http(code = code, message = e.message(), errorBody = errorBody)
    } catch (e: SocketTimeoutException) {
        NetworkResult.Error.NetworkTimeout()
    } catch (e: UnknownHostException) {
        NetworkResult.Error.NoInternet()
    } catch (e: IOException) {
        // Các lỗi I/O khác của mạng (ví dụ đứt cáp đột ngột)
        NetworkResult.Error.NoInternet(e.localizedMessage ?: "Lỗi kết nối mạng")
    } catch (e: CancellationException) {
        // Coroutine bị huỷ (thoát màn hình...): ném lại, không biến thành lỗi mạng
        throw e
    } catch (e: Exception) {
        // Lỗi parse JSON hoặc lỗi logic bất ngờ
        NetworkResult.Error.Unknown(e)
    }
}
```

---

## 6. Retry Policy với Exponential Backoff & Jitter

Khi mạng chập chờn, việc tự động gửi lại request (Retry) giúp người dùng không phải bấm lại bằng tay. Tuy nhiên, nếu áp dụng cơ chế **Retry tức thì (Immediate Retry)** hoặc **khoảng cách cố định (Fixed Delay)**, bạn sẽ gây ra hiện tượng **Thundering Herd**:
Khi hàng triệu thiết bị cùng mất kết nối trong 10 giây rồi cùng đồng loạt bắn request retry ngay khi vừa có mạng, server backend sẽ lập tức quá tải và sập nguồn!

### 6.1 Công thức Exponential Backoff kết hợp Full Jitter
Chuẩn kỹ nghệ (được khuyến nghị bởi AWS và Google Cloud Architecture) sử dụng thuật toán:

$$\text{Delay} = \text{Random}(0, \min(\text{MaxDelay}, \text{BaseDelay} \times 2^{\text{attempt}}))$$

```mermaid
graph LR
    subgraph ExponentialBackoff ["Thời gian chờ giữa các lần thử lại"]
        L1["Lần 1: ~1s + ngẫu nhiên"] --> L2["Lần 2: ~2s + ngẫu nhiên"] --> L3["Lần 3: ~4s + ngẫu nhiên"] --> L4["Lần 4: Dừng & Báo lỗi"]
    end
```

### 6.2 Cài đặt Generic Retry Extension trên Kotlin Flow

```kotlin
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.retryWhen
import java.io.IOException
import kotlin.math.min
import kotlin.math.pow
import kotlin.random.Random

fun <T> Flow<T>.retryWithExponentialBackoff(
    maxAttempts: Int = 3,
    initialDelayMs: Long = 1000L,
    maxDelayMs: Long = 10000L,
    factor: Double = 2.0
): Flow<T> {
    return this.retryWhen { cause, attempt ->
        if (attempt < maxAttempts && cause is IOException) {
            // Chỉ retry khi gặp lỗi mạng (I/O, Timeout). Không retry lỗi 4xx Client Error!
            val exponentialDelay = (initialDelayMs * factor.pow(attempt.toDouble())).toLong()
            val cappedDelay = min(exponentialDelay, maxDelayMs)
            // Thêm Full Jitter ngẫu nhiên từ 0 đến cappedDelay để tránh các thiết bị đồng nhịp
            val jitteredDelay = Random.nextLong(0, cappedDelay + 1)
            
            delay(jitteredDelay)
            true // Tiếp tục thử lại
        } else {
            false // Ngừng thử lại, đẩy exception cho tầng tiếp theo xử lý
        }
    }
}
```

---

## 7. Bảo mật cao cấp: SSL / Certificate Pinning & Phòng thủ MITM

Mặc định, Android tin tưởng các Chứng chỉ số (Certificate Authority - CA) được cài đặt sẵn trong hệ thống (như DigiCert, Let's Encrypt). 
Tuy nhiên, tin tặc có thể thực hiện tấn công **Man-in-the-Middle (MITM)** bằng cách:
1. Đưa một Root CA độc hại vào kho CA **hệ thống** của thiết bị (cần máy đã Root), hoặc nhắm vào app vẫn tin CA do người dùng cài.
2. Thiết lập proxy (như Charles Proxy, Burp Suite) đứng giữa ứng dụng và máy chủ.
3. Proxy này giải mã toàn bộ dữ liệu HTTPS mà ứng dụng không hề hay biết!

Lưu ý mặc định của nền tảng: từ Android 7.0 (API 24), app **không** tin CA do người dùng tự cài trừ khi khai báo `<certificates src="user" />` trong Network Security Config (app target API 23 trở xuống vẫn tin). Từ Android 9 (API 28), **cleartext HTTP bị tắt mặc định**: gọi `http://` sẽ lỗi (OkHttp báo `UnknownServiceException: CLEARTEXT communication ... not permitted by network security policy`) trừ khi bật `cleartextTrafficPermitted="true"` cho domain cụ thể.

### 7.1 Certificate Pinning là gì?
**Certificate Pinning (Ghim chứng chỉ)** là kỹ thuật **thêm một điều kiện** vào việc kiểm tra chứng chỉ: chuỗi chứng chỉ vẫn phải hợp lệ với các Root CA được tin như bình thường, **và** phải chứa ít nhất một khóa công khai (Public Key - SPKI) có mã băm nằm trong danh sách ghim của app (khóa của máy chủ, của intermediate CA hoặc của CA). Nếu không có khóa nào khớp, kết nối sẽ bị hủy ngay lập tức.

### 7.2 Triển khai với OkHttp CertificatePinner

```kotlin
import okhttp3.CertificatePinner
import okhttp3.OkHttpClient

fun createSecureOkHttpClient(): OkHttpClient {
    val certificatePinner = CertificatePinner.Builder()
        // Ghim Public Key SHA-256 của domain chính
        .add("api.example.com", "sha256/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=")
        // BẮT BUỘC: Luôn luôn phải có ít nhất 1 mã Pin dự phòng (Backup Pin)!
        // Dùng khi chứng chỉ chính hết hạn hoặc bị lộ khóa bí mật.
        .add("api.example.com", "sha256/BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB=")
        .build()

    return OkHttpClient.Builder()
        .certificatePinner(certificatePinner)
        .build()
}
```

### 7.3 Triển khai qua Network Security Config (Chuẩn Declarative của Android)
Từ Android 7.0, Google khuyến nghị cấu hình bảo mật thông qua file XML:

Tạo file `res/xml/network_security_config.xml`:
```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config>
        <domain includeSubdomains="true">api.example.com</domain>
        <pin-set expiration="2027-12-31">
            <!-- Khóa công khai chính -->
            <pin digest="SHA-256">AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=</pin>
            <!-- Khóa công khai dự phòng (Backup) -->
            <pin digest="SHA-256">BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB=</pin>
        </pin-set>
    </domain-config>
</network-security-config>
```
Đăng ký trong `AndroidManifest.xml`:
```xml
<application
    android:networkSecurityConfig="@xml/network_security_config"
    ... >
</application>
```

> [!CAUTION]
> **Hiểm họa "Gạch App" (App Bricking Risk):**
> Nếu bạn chỉ ghim 1 mã Pin duy nhất và chứng chỉ trên server bị hết hạn hoặc bị tấn công phải đổi mới khẩn cấp, người dùng toàn cầu sẽ **không thể mở được app** cho đến khi bạn release một bản cập nhật mới lên Google Play Store.
> **Quy tắc bất di bất dịch:** Luôn luôn ghim khóa công khai của **Backup Intermediate CA** hoặc **Backup Key**, kèm theo cơ chế Remote Config để cập nhật mã pin động nếu cần.

---

## 8. Multipart Upload & Tracking Tiến Độ (%) Realtime chống OOM

Khi tải lên tệp tin lớn (ảnh độ phân giải cao, tài liệu KYC PDF, video), một sai lầm phổ biến là đọc toàn bộ nội dung file vào một mảng byte trong RAM:
```kotlin
// SAI LẦM TỰ SÁT BỘ NHỚ: Gây OutOfMemoryError ngay lập tức với file lớn!
val bytes = file.readBytes() // Đọc 100MB vào RAM của Android!
val body = bytes.toRequestBody("image/jpeg".toMediaTypeOrNull())
```

### 8.1 Nguyên lý Streaming và Tracking Byte qua ForwardingSink
Để an toàn tuyệt đối, chúng ta phải đọc file theo từng khối đệm (Chunk Buffer) từ ổ cứng và truyền trực tiếp ra Socket. Đồng thời, bọc `BufferedSink` của OkHttp bằng một `ForwardingSink` để đếm số byte thực tế đã ghi.

```mermaid
graph LR
    subgraph Disk ["Bộ nhớ lưu trữ"]
        File["Tệp tin lớn (100MB)"]
    end

    subgraph Pipeline ["Pipeline Stream"]
        Source["Okio FileSource (Đọc từng khối 8KB)"]
        CountSink["CountingSink (Đếm byte đã ghi & Tính %)"]
    end

    subgraph Output ["Tầng Mạng"]
        Socket["OkHttp Socket Sink"]
        Flow["StateFlow: Báo % lên UI"]
    end

    File --> Source --> CountSink --> Socket
    CountSink -.->|"emit(percent)"| Flow
```

### 8.2 Mã nguồn CountingRequestBody hoàn chỉnh

```kotlin
import okhttp3.MediaType
import okhttp3.RequestBody
import okio.Buffer
import okio.BufferedSink
import okio.ForwardingSink
import okio.Sink
import okio.buffer
import okio.source
import java.io.File

class CountingRequestBody(
    private val file: File,
    private val contentType: MediaType?,
    private val onProgressUpdate: (bytesWritten: Long, totalBytes: Long, percent: Int) -> Unit
) : RequestBody() {

    override fun contentType(): MediaType? = contentType

    override fun contentLength(): Long = file.length()

    override fun writeTo(sink: BufferedSink) {
        val totalBytes = contentLength()
        var bytesWritten = 0L

        // Bao bọc sink bằng ForwardingSink để đếm byte
        val countingSink = object : ForwardingSink(sink) {
            override fun write(source: Buffer, byteCount: Long) {
                super.write(source, byteCount)
                bytesWritten += byteCount
                val percent = ((bytesWritten * 100) / totalBytes).toInt()
                onProgressUpdate(bytesWritten, totalBytes, percent)
            }
        }

        // Dùng Okio buffer để stream dữ liệu từng chunk an toàn, không tốn RAM
        // Okio 2/3 dùng extension function: File.source(), Sink.buffer()
        file.source().use { source ->
            val bufferedSink = countingSink.buffer()
            bufferedSink.writeAll(source)
            bufferedSink.flush()
        }
    }
}
```

Dùng `CountingRequestBody` làm một part của request multipart:

```kotlin
val body = MultipartBody.Builder()
    .setType(MultipartBody.FORM)
    .addFormDataPart(
        "file", file.name,
        CountingRequestBody(file, "image/jpeg".toMediaType()) { _, _, percent ->
            progressFlow.value = percent // cập nhật StateFlow cho UI
        }
    )
    .build()
```

---

## 9. Quản lý trạng thái kết nối ở tầng OS: ConnectivityManager & NetworkCallback

Trước Android 7.0 (Nougat), lập trình viên thường dùng `BroadcastReceiver` lắng nghe `android.net.conn.CONNECTIVITY_ACTION`. Tuy nhiên, cơ chế này làm thức giấc hàng chục tiến trình app cùng lúc khi mạng thay đổi, gây giật lag hệ thống và cạn pin. Từ Android 7.0, app target API 24+ không còn nhận `CONNECTIVITY_ACTION` qua receiver khai báo trong manifest (receiver đăng ký bằng code vẫn nhận), và action này bị deprecate từ API 28. Google khuyến nghị chuyển sang **`ConnectivityManager.NetworkCallback`**.

> [!IMPORTANT]
> **Quyền và cleartext cần khai báo trước khi gọi mạng:**
> - `android.permission.INTERNET`: thiếu quyền này thì mọi kết nối socket của app đều thất bại.
> - `android.permission.ACCESS_NETWORK_STATE`: bắt buộc để dùng `ConnectivityManager` (`activeNetwork`, `getNetworkCapabilities`, `register...NetworkCallback`); thiếu thì ném `SecurityException`.
> - Cả hai đều là normal permission: khai báo trong `AndroidManifest.xml` là đủ, không cần xin lúc chạy.
>
> ```xml
> <uses-permission android:name="android.permission.INTERNET" />
> <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
> ```

### 9.1 Phân biệt NET_CAPABILITY_INTERNET vs NET_CAPABILITY_VALIDATED
Đây là điểm khác biệt cốt tử mà nhiều developer không phân biệt được:
- **`NET_CAPABILITY_INTERNET`:** Thiết bị đã kết nối vào một mạng hỗ trợ truyền thông IP (ví dụ kết nối vào router Wi-Fi hoặc trạm 4G). Nhưng mạng này hoàn toàn có thể **chưa có Internet** (dây cáp quang bị đứt, gói cước hết tiền, hoặc mạng Wi-Fi bắt nhập mã voucher tại quán cafe/khách sạn).
- **`NET_CAPABILITY_VALIDATED`:** Hệ điều hành Android đã âm thầm gửi một HTTP probe (thường là `https://clients3.google.com/generate_204`) và nhận về đúng mã trạng thái `204 No Content`. Điều này chứng minh **thiết bị thực sự đi được ra thế giới Internet bên ngoài**!

> [!IMPORTANT]
> **Quy tắc bắt buộc:** Luôn luôn kiểm tra cờ `NET_CAPABILITY_VALIDATED` thay vì chỉ kiểm tra `NET_CAPABILITY_INTERNET`.

### 9.2 Thiết kế NetworkMonitor Reactive với callbackFlow

```kotlin
import android.content.Context
import android.net.ConnectivityManager
import android.net.Network
import android.net.NetworkCapabilities
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import kotlinx.coroutines.flow.distinctUntilChanged

sealed interface NetworkStatus {
    object Available : NetworkStatus
    object Lost : NetworkStatus
    object Unavailable : NetworkStatus
}

interface NetworkMonitor {
    val networkStatus: Flow<NetworkStatus>
}

class ConnectivityManagerNetworkMonitor(
    context: Context
) : NetworkMonitor {

    private val connectivityManager = 
        context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager

    override val networkStatus: Flow<NetworkStatus> = callbackFlow {
        val callback = object : ConnectivityManager.NetworkCallback() {
            override fun onAvailable(network: Network) {
                // Mạng vật lý vừa kết nối, nhưng chưa chắc có Internet thực sự
            }

            override fun onCapabilitiesChanged(
                network: Network,
                networkCapabilities: NetworkCapabilities
            ) {
                // Kiểm tra xem mạng đã được VALIDATED chưa
                val hasInternet = networkCapabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
                val isValidated = networkCapabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_VALIDATED)

                if (hasInternet && isValidated) {
                    trySend(NetworkStatus.Available)
                } else {
                    trySend(NetworkStatus.Lost)
                }
            }

            override fun onLost(network: Network) {
                // Với default callback, onLost nghĩa là mạng mặc định mất và chưa có mạng thay thế
                trySend(NetworkStatus.Lost)
            }
            // Không override onUnavailable(): callback này chỉ được gọi cho requestNetwork(..., timeout),
            // không bao giờ được gọi khi dùng registerDefaultNetworkCallback / registerNetworkCallback
        }

        // Theo dõi MẠNG MẶC ĐỊNH (mạng app thực sự dùng). registerNetworkCallback với nhiều transport
        // sẽ báo onLost cho từng mạng: tắt Wi-Fi trong khi 4G vẫn còn cũng phát Lost — sai trạng thái.
        // Cần quyền ACCESS_NETWORK_STATE, nếu thiếu sẽ ném SecurityException.
        connectivityManager.registerDefaultNetworkCallback(callback)

        // Phát trạng thái ban đầu ngay khi bắt đầu lắng nghe
        val currentCapabilities = connectivityManager.getNetworkCapabilities(connectivityManager.activeNetwork)
        val isInitiallyValid = currentCapabilities?.hasCapability(NetworkCapabilities.NET_CAPABILITY_VALIDATED) == true
        trySend(if (isInitiallyValid) NetworkStatus.Available else NetworkStatus.Lost)

        // Hủy đăng ký callback khi Flow ngừng collect để chống rò rỉ bộ nhớ (Memory Leak)
        awaitClose {
            connectivityManager.unregisterNetworkCallback(callback)
        }
    }.distinctUntilChanged()
}
```

---

## 10. Chiến lược Caching: HTTP Cache (OkHttp) vs Local Database (Room)

Khi thiết kế ứng dụng hỗ trợ Offline, nhiều người phân vân giữa việc dùng OkHttp Cache hay lưu trữ vào SQLite qua Room Database.

| Tiêu chí | OkHttp HTTP Cache | Local Database (Room / SQLite) |
| :--- | :--- | :--- |
| **Bản chất** | Cache mức byte nguyên thủy trên ổ cứng theo chuẩn HTTP Headers. | Lưu trữ có cấu trúc (Relational), hỗ trợ bảng biểu, quan hệ khóa ngoại. |
| **Cơ chế điều khiển** | Hoàn toàn dựa vào Header server (`Cache-Control`, `max-age`, `ETag`). | Hoàn toàn do lập trình viên Android chủ động truy vấn, thêm, xóa, sửa. |
| **Khả năng tìm kiếm** | **Không thể**: Chỉ tìm kiếm chính xác bằng URL endpoint (`Key = URL`). | **Rất mạnh**: Hỗ trợ SQL `WHERE`, `LIKE`, `JOIN`, sắp xếp `ORDER BY`. |
| **Phản ứng thay đổi** | Thụ động. Không thể lắng nghe khi có dữ liệu mới. | **Reactive**: Hỗ trợ trả về `Flow<List<Item>>`, tự động cập nhật UI khi DB đổi. |
| **Trường hợp sử dụng** | Ảnh tĩnh (Glide/Coil), tệp tĩnh cấu hình, API tin tức đơn giản. | Dữ liệu nghiệp vụ lõi: Giỏ hàng, Danh sách bài viết, Profile offline, Chat. |

### 10.1 Cấu hình OkHttp HTTP Cache & OfflineCacheInterceptor
Nếu backend hỗ trợ các header `Cache-Control`, OkHttp có thể tự động trả về dữ liệu mà không cần gọi mạng:

```kotlin
import okhttp3.Cache
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import java.io.File
import java.util.concurrent.TimeUnit

fun createCachedOkHttpClient(cacheDir: File, isNetworkConnected: () -> Boolean): OkHttpClient {
    // Cấp phát 10MB dung lượng cache trên bộ nhớ trong
    val cache = Cache(File(cacheDir, "http_cache"), 10L * 1024 * 1024)

    val offlineCacheInterceptor = Interceptor { chain ->
        var request = chain.request()
        if (!isNetworkConnected()) {
            // Khi không có mạng, buộc OkHttp đọc từ cache dù cache đã hết hạn (tối đa 7 ngày)
            request = request.newBuilder()
                .header("Cache-Control", "public, only-if-cached, max-stale=" + 60 * 60 * 24 * 7)
                .build()
        }
        chain.proceed(request)
    }

    return OkHttpClient.Builder()
        .cache(cache)
        .addInterceptor(offlineCacheInterceptor)
        .build()
}
```

---

## 11. Ktor Client vs Retrofit: Lựa chọn công nghệ cho tương lai KMP

Retrofit đã thống trị hệ sinh thái Android trong hơn 10 năm qua. Tuy nhiên, với làn sóng **Kotlin Multiplatform (KMP)**, **Ktor Client** (được chính JetBrains phát triển) đang nổi lên như một đối thủ mạnh mẽ.

```mermaid
graph TD
    subgraph RetrofitArchitecture ["Retrofit + OkHttp (Chỉ dành cho JVM & Android)"]
        R_API["Java/Kotlin Interface"] --> R_Core["Retrofit Core (Reflection / Dynamic Proxy)"]
        R_Core --> R_OkHttp["OkHttp Engine (Dựa trên Java Sockets)"]
        R_OkHttp --> R_Net["OS Network"]
    end

    subgraph KtorArchitecture ["Ktor Client (Kotlin Multiplatform Native)"]
        K_Code["Kotlin Shared Code"] --> K_Core["Ktor Client Core (Pure Coroutines, No Reflection)"]
        K_Core --> K_Engines{"Lựa chọn Engine theo OS"}
        K_Engines -->|Android| K_OkHttp["OkHttp Engine / Android Engine"]
        K_Engines -->|iOS| K_Darwin["Darwin (URLSession Native)"]
        K_Engines -->|Desktop/Server| K_CIO["CIO / Java Engine"]
    end
```

### 11.1 Bảng so sánh chi tiết Retrofit vs Ktor Client

| Tiêu chí | Retrofit 2 + OkHttp | Ktor Client |
| :--- | :--- | :--- |
| **Khả năng đa nền tảng** | **Chỉ JVM/Android**: Không thể chia sẻ code mạng sang iOS hoặc Desktop. | **Full KMP**: Chạy tốt trên Android, iOS, Desktop (JVM), Web (Wasm/JS). |
| **Cơ chế khởi tạo API** | Dùng Java Dynamic Proxy & Runtime Reflection (`retrofit.create()`). | Hoàn toàn là hàm Kotlin thuần, không Reflection, compile cực nhanh. |
| **Hỗ trợ Coroutines** | Tích hợp qua adapter ngoài hoặc `suspend fun`. | **Native Coroutines 100%**: Mọi pipeline xử lý đều là Coroutine Channel/Job. |
| **Hỗ trợ Streaming & Socket** | Khá phức tạp khi làm việc với WebSockets hay Server-Sent Events (SSE). | Hỗ trợ WebSockets và HTTP Streaming cực kỳ thanh thoát và tự nhiên. |
| **Cấu hình Middleware** | Dựa trên danh sách các Interceptors của OkHttp. | Dựa trên hệ thống **Plugins** linh hoạt (Auth, Logging, ContentNegotiation). |

### 11.2 Triển khai Ktor Client hoàn chỉnh (Auth, Logging, Serialization)

```kotlin
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.engine.okhttp.OkHttp
import io.ktor.client.plugins.auth.Auth
import io.ktor.client.plugins.auth.providers.BearerTokens
import io.ktor.client.plugins.auth.providers.bearer
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.client.plugins.logging.LogLevel
import io.ktor.client.plugins.logging.Logging
import io.ktor.client.request.get
import io.ktor.client.request.post
import io.ktor.client.request.setBody
import io.ktor.http.ContentType
import io.ktor.http.contentType
import io.ktor.serialization.kotlinx.json.json
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

@Serializable
data class UserDto(val id: Long, val name: String, val email: String)

@Serializable
data class CreateUserRequest(val name: String, val email: String)

class KtorApiClient(
    private val tokenStorage: TokenStorage
) {
    val client = HttpClient(OkHttp) {
        // Plugin 1: Tự động chuyển đổi JSON qua kotlinx.serialization
        install(ContentNegotiation) {
            json(Json {
                ignoreUnknownKeys = true
                isLenient = true
                prettyPrint = false
            })
        }

        // Plugin 2: Ghi log
        install(Logging) {
            level = LogLevel.INFO
        }

        // Plugin 3: Xử lý Bearer Token và Auto-Refresh tích hợp sẵn của Ktor
        install(Auth) {
            bearer {
                loadTokens {
                    BearerTokens(
                        accessToken = tokenStorage.getAccessToken() ?: "",
                        refreshToken = tokenStorage.getRefreshToken() ?: ""
                    )
                }
                refreshTokens {
                    // Ktor tự động lock và quản lý concurrent refresh khi gặp mã 401!
                    val newTokens = callRefreshTokenApi(oldTokens?.refreshToken)
                    tokenStorage.saveTokens(newTokens.accessToken, newTokens.refreshToken)
                    BearerTokens(newTokens.accessToken, newTokens.refreshToken)
                }
            }
        }
    }

    suspend fun getUserProfile(userId: Long): UserDto {
        return client.get("https://api.example.com/users/$userId").body()
    }

    suspend fun createUser(request: CreateUserRequest): UserDto {
        return client.post("https://api.example.com/users") {
            contentType(ContentType.Application.Json)
            setBody(request)
        }.body()
    }

    private suspend fun callRefreshTokenApi(refreshToken: String?): BearerTokens {
        // Giả lập gọi API refresh token
        return BearerTokens("new_access_token", "new_refresh_token")
    }
}

interface TokenStorage {
    fun getAccessToken(): String?
    fun getRefreshToken(): String?
    fun saveTokens(access: String, refresh: String)
}
```

---

## 12. Tích hợp Clean Architecture: End-to-End E-Commerce Example

Hãy xâu chuỗi tất cả các thành phần đã học vào một kiến trúc hoàn chỉnh theo chuẩn **Clean Architecture**:
`UI (Compose) -> ViewModel -> UseCase -> Repository (SSOT) -> RemoteDataSource (Retrofit) & LocalDataSource (Room)`.

Mô hình ở đây là **Single Source of Truth (SSOT)**: UI chỉ quan sát Room Database qua `Flow`, không bao giờ đọc thẳng kết quả API. Repository đồng bộ API khi có mạng và ghi kết quả vào Room; Flow của DAO tự phát dữ liệu mới lên UI.

```mermaid
graph LR
    subgraph PresentationLayer ["Tầng Giao Diện"]
        UI["Compose Screen"]
        VM["ProductViewModel"]
    end

    subgraph DomainLayer ["Tầng Nghiệp Vụ"]
        UC["GetProductsUseCase"]
    end

    subgraph DataLayer ["Tầng Dữ Liệu"]
        Repo["ProductRepositoryImpl (Single Source of Truth)"]
        Local["LocalDataSource (Room Database)"]
        Remote["RemoteDataSource (Retrofit API Service)"]
        NetMon["NetworkMonitor (ConnectivityManager)"]
    end

    UI --> VM
    VM --> UC
    UC --> Repo
    Repo --> Local
    Repo --> Remote
    Repo --> NetMon
```

### 12.1 Data Layer: Remote DataSource & Repository

```kotlin
import androidx.room.Dao
import androidx.room.Entity
import androidx.room.PrimaryKey
import androidx.room.Query
import androidx.room.Upsert
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.map
import retrofit2.http.GET

// 1. Retrofit API Definition
interface ProductApiService {
    @GET("/api/v1/products")
    suspend fun fetchProducts(): List<ProductDto>
}

// 2. Data Transfer Object
data class ProductDto(val id: Long, val name: String, val price: Double)

// 3. Domain Model
data class Product(val id: Long, val name: String, val price: Double)

// 4. Repository Interface
interface ProductRepository {
    fun getProducts(): Flow<List<Product>>
    suspend fun syncProducts(): NetworkResult<Unit>
}

// 5. Local DataSource: Room DAO — Flow tự phát lại mỗi khi bảng products thay đổi
@Entity(tableName = "products")
data class ProductEntity(@PrimaryKey val id: Long, val name: String, val price: Double)

@Dao
interface ProductDao {
    @Query("SELECT * FROM products")
    fun observeAll(): Flow<List<ProductEntity>>

    @Upsert
    suspend fun upsertAll(items: List<ProductEntity>)
}

// 6. Repository Implementation (Offline-First Single Source of Truth)
class ProductRepositoryImpl(
    private val apiService: ProductApiService,
    private val productDao: ProductDao,
    private val networkMonitor: NetworkMonitor
) : ProductRepository {

    // Luôn đọc từ Room: sau mỗi lần sync ghi vào bảng, Flow của DAO tự emit danh sách mới
    override fun getProducts(): Flow<List<Product>> =
        productDao.observeAll().map { rows -> rows.map { Product(it.id, it.name, it.price) } }

    override suspend fun syncProducts(): NetworkResult<Unit> {
        val status = networkMonitor.networkStatus.first()
        if (status !is NetworkStatus.Available) {
            return NetworkResult.Error.NoInternet()
        }

        return safeApiCall {
            val remoteProducts = apiService.fetchProducts()
            // Cập nhật lại vào cơ sở dữ liệu nội bộ -> getProducts() tự nhận dữ liệu mới
            productDao.upsertAll(remoteProducts.map { ProductEntity(it.id, it.name, it.price) })
        }
    }
}
```

### 12.2 Presentation Layer: ViewModel điều phối UI State

```kotlin
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

sealed interface ProductUiState {
    object Loading : ProductUiState
    data class Success(val products: List<Product>, val isOffline: Boolean) : ProductUiState
    data class Error(val message: String) : ProductUiState
}

class ProductViewModel(
    private val repository: ProductRepository,
    private val networkMonitor: NetworkMonitor
) : ViewModel() {

    private val _uiState = MutableStateFlow<ProductUiState>(ProductUiState.Loading)
    val uiState: StateFlow<ProductUiState> = _uiState.asStateFlow()

    init {
        observeNetworkAndLoadData()
    }

    private fun observeNetworkAndLoadData() {
        // Tải dữ liệu offline hiển thị ngay cho người dùng
        viewModelScope.launch {
            repository.getProducts().collect { localProducts ->
                _uiState.update { 
                    ProductUiState.Success(products = localProducts, isOffline = false) 
                }
            }
        }

        // Tự động đồng bộ dữ liệu mới khi có kết nối Internet
        viewModelScope.launch {
            networkMonitor.networkStatus.collect { status ->
                when (status) {
                    is NetworkStatus.Available -> {
                        val result = repository.syncProducts()
                        if (result is NetworkResult.Error) {
                            // Xử lý lỗi nhưng không làm mất dữ liệu offline đang hiển thị
                        }
                    }
                    is NetworkStatus.Lost, is NetworkStatus.Unavailable -> {
                        _uiState.update { current ->
                            if (current is ProductUiState.Success) {
                                current.copy(isOffline = true)
                            } else current
                        }
                    }
                }
            }
        }
    }
}
```

---

## 13. Testing Tầng Network với MockWebServer

Một sai lầm phổ biến khi viết Unit Test cho tầng Data là **dùng Mockito để mock trực tiếp Retrofit Interface**:
```kotlin
// KIỂU TEST VÔ NGHĨA:
val mockApi = mock(ProductApiService::class.java)
`when`(mockApi.fetchProducts()).thenReturn(listOf(...))
```
Cách test trên hoàn toàn vô nghĩa vì nó **bỏ qua 100% logic của tầng mạng**: không test được Interceptor, không test được logic parse JSON của Moshi/Serialization, không test được mã lỗi HTTP (401, 500) và không test được lỗi Timeout!

### 13.1 Giải pháp chuẩn: MockWebServer của Square
`MockWebServer` khởi tạo một HTTP Server thật sự chạy trên cổng cục bộ (localhost) trong JVM test. Nó nhận HTTP request thật từ OkHttp và trả về response thật.

```kotlin
import kotlinx.coroutines.runBlocking
import okhttp3.OkHttpClient
import okhttp3.mockwebserver.MockResponse
import okhttp3.mockwebserver.MockWebServer
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.concurrent.TimeUnit

class NetworkIntegrationTest {

    private lateinit var mockWebServer: MockWebServer
    private lateinit var apiService: ProductApiService

    @Before
    fun setup() {
        mockWebServer = MockWebServer()
        mockWebServer.start()

        val okHttpClient = OkHttpClient.Builder()
            .connectTimeout(1, TimeUnit.SECONDS)
            .readTimeout(1, TimeUnit.SECONDS)
            .build()

        val retrofit = Retrofit.Builder()
            .baseUrl(mockWebServer.url("/")) // Trỏ tới localhost của mock server
            .client(okHttpClient)
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        apiService = retrofit.create(ProductApiService::class.java)
    }

    @After
    fun tearDown() {
        mockWebServer.shutdown()
    }

    @Test
    fun fetchProducts_success_returns_parsed_list() = runBlocking {
        // 1. Giả lập Server trả về JSON hợp lệ với mã 200 OK
        val mockJson = """
            [
                {"id": 101, "name": "Bàn phím cơ", "price": 150.0},
                {"id": 102, "name": "Chuột Gaming", "price": 75.0}
            ]
        """.trimIndent()
        
        mockWebServer.enqueue(
            MockResponse()
                .setResponseCode(200)
                .setBody(mockJson)
        )

        // 2. Thực thi hàm gọi API
        val result = safeApiCall { apiService.fetchProducts() }

        // 3. Kiểm chứng
        assertTrue(result is NetworkResult.Success)
        val data = (result as NetworkResult.Success).data
        assertEquals(2, data.size)
        assertEquals("Bàn phím cơ", data[0].name)
    }

    @Test
    fun fetchProducts_serverError_returns_httpError() = runBlocking {
        // Giả lập Server trả về lỗi 500 Internal Server Error
        mockWebServer.enqueue(
            MockResponse()
                .setResponseCode(500)
                .setBody("""{"error": "Database down"}""")
        )

        val result = safeApiCall { apiService.fetchProducts() }

        assertTrue(result is NetworkResult.Error.Http)
        val httpError = result as NetworkResult.Error.Http
        assertEquals(500, httpError.code)
    }
}
```

---

## 14. Checklist Best Practices & Anti-patterns

### 14.1 Những điều BẮT BUỘC NÊN LÀM (Best Practices)
1. **Singleton OkHttpClient:** Chỉ khởi tạo **DUY NHẤT MỘT** `OkHttpClient` instance trong suốt vòng đời ứng dụng để tối ưu `ConnectionPool` và `DiskCache`. Nếu cần cấu hình riêng cho một số endpoint, hãy sử dụng `okHttpClient.newBuilder()`.
2. **Main-Safety:** Mọi hàm API trong tầng Data phải là `suspend` và tự động chuyển sang `Dispatchers.IO` hoặc để Retrofit/Ktor tự xử lý luồng nền.
3. **Phân biệt Capability:** Luôn kiểm tra `NET_CAPABILITY_VALIDATED` thay vì chỉ kiểm tra `NET_CAPABILITY_INTERNET`.
4. **Timeouts hợp lý:** Luôn thiết lập timeout rõ ràng (`connectTimeout`, `readTimeout`, `writeTimeout`), không để mặc định quá lâu làm người dùng phải chờ đợi màn hình trắng.
5. **Che giấu PII trong Log:** Tuyệt đối không log thông tin nhạy cảm (mật khẩu, mã OTP, số thẻ, Authorization Header) ra ngoài Logcat.

### 14.2 Những sai lầm NGHIÊM TRỌNG (Anti-patterns)
- ❌ **Khởi tạo OkHttpClient mới trong mỗi Repository:** Làm vô hiệu hóa hoàn toàn Connection Pool và HTTP Cache, gây cạn kiệt File Descriptor (FD Leak).
- ❌ **Nuốt Exception (Catch & Empty):** Bắt exception nhưng không thông báo cho người dùng, làm UI ở trạng thái Loading mãi mãi.
- ❌ **Đọc toàn bộ File vào byte array để Upload:** Gây crash `OutOfMemoryError` khi người dùng upload file nặng trên các thiết bị RAM thấp.
- ❌ **Chỉ ghim 1 mã SSL Pin duy nhất:** Nguy cơ biến toàn bộ ứng dụng thành "cục gạch" khi server renew chứng chỉ SSL mới.
- ❌ **Lạm dụng BroadcastReceiver cho mạng:** Gây lãng phí tài nguyên CPU và pin của thiết bị.

---

## 15. Nguồn tham khảo chính thống (References & RFCs)

1. [Android Developers — Connect to the network](https://developer.android.com/training/basics/network-ops/connecting)
2. [Android Developers — Monitor connectivity status and connection metering](https://developer.android.com/training/monitoring-device-state/connectivity-status-type)
3. [Square Open Source — OkHttp Official Documentation & Recipes](https://square.github.io/okhttp/)
4. [Square Open Source — Retrofit Architecture Guide](https://square.github.io/retrofit/)
5. [JetBrains — Ktor Client Official Documentation](https://ktor.io/docs/client-create-new-application.html)
6. [IETF RFC 9110 — HTTP Semantics & Status Codes](https://www.rfc-editor.org/rfc/rfc9110.html)
7. [IETF RFC 8446 — The Transport Layer Security (TLS) Protocol Version 1.3](https://www.rfc-editor.org/rfc/rfc8446.html)
8. [AWS Architecture Blog — Exponential Backoff And Jitter](https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/)
9. [Android Developers — Network security configuration (user CA từ API 24, cleartext từ API 28, pin-set)](https://developer.android.com/privacy-and-security/security-config)
10. [Android Developers — ConnectivityManager.registerDefaultNetworkCallback](https://developer.android.com/reference/android/net/ConnectivityManager#registerDefaultNetworkCallback(android.net.ConnectivityManager.NetworkCallback))
11. [Android Developers — Background optimizations (CONNECTIVITY_ACTION)](https://developer.android.com/topic/performance/background-optimization)
12. [Kotlin — Cancellation and timeouts](https://kotlinlang.org/docs/cancellation-and-timeouts.html)
