# 👗 Style3D AI - Nền Tảng Phối Đồ 3D & Gợi Ý Thời Trang

> Ứng dụng web phối đồ 3D thời gian thực, tích hợp AI phân tích tủ đồ và hệ thống tiếp thị liên kết (Affiliate Marketing Shopee / TikTok Shop).

---

## ✨ Tính Năng Nổi Bật

- **Phòng Thử Đồ 3D (Virtual 3D Fitting)**:
  - Tùy chọn vóc dáng Nam / Nữ với tỷ lệ cơ thể và kiểu tóc riêng biệt.
  - Tùy chỉnh màu da (5 tông màu thực tế).
  - Tự do xoay 360°, điều khiển 4 góc camera chuyên dụng (Toàn thân, Thân trên, Quần & Giày, Cận mặt).
  - Thử đồ theo 6 slot xương: Mũ/Tóc, Kính, Áo, Quần, Giày, Phụ kiện.
  - Phối đồ thông minh ngẫu nhiên (Random Outfit) phù hợp theo giới tính.
  - Chụp ảnh canvas xuất file PNG lưu trữ outfit.

- **Bố Cục 3 Cột Hiện Đại**:
  - Cột 1 (Trái): Quản lý các món đồ đang mặc, tổng giá trị outfit, nút lưu bộ và mua trọn bộ.
  - Cột 2 (Giữa): Phòng thử đồ 3D trực quan, không bị che khuất.
  - Cột 3 (Phải): Kho sản phẩm phân loại theo danh mục và tự động lọc theo giới tính đang chọn.

- **AI Wardrobe Scan (Gemini 1.5 Flash Vision)**:
  - Tải ảnh hoặc chụp trực tiếp từ webcam trang phục người dùng có sẵn.
  - AI nhận diện loại đồ, màu sắc, phong cách và tìm kiếm sản phẩm tương đồng để thử lên người mẫu 3D ngay lập tức.
  - Hỗ trợ chế độ Smart Simulation khi chưa nhập API key.

- **Style Gallery & Affiliate Monetization**:
  - Khám phá các phong cách phối đồ thịnh hành (Streetwear, Minimalist, Y2K, Smart Casual, Old Money...).
  - Tích hợp link mua hàng Shopee Mall / TikTok Shop của các local brand Việt Nam.
  - Dashboard theo dõi số lượt click, GMV tạm tính và hoa hồng ước tính.

---

## 🛠️ Công Nghệ Sử Dụng

- **Frontend**: React 19, TypeScript, Vite
- **3D Engine**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **State Management**: Zustand
- **Styling**: Tailwind CSS, Lucide React
- **Routing**: React Router DOM v7
- **AI & API**: Google Gemini 1.5 Flash API (Multimodal), Axios

---

## 🚀 Cài Đặt & Chạy Dự Án

### 1. Clone repository
```bash
git clone https://github.com/tdat207/<repo-name>.git
cd <repo-name>
```

### 2. Cài đặt dependencies
```bash
npm install
```

### 3. Cấu hình biến môi trường (Tùy chọn)
Tạo file `.env` từ `.env.example`:
```bash
cp .env.example .env
```
Nhập Google Gemini API Key vào file `.env`:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Khởi chạy môi trường phát triển
```bash
npm run dev
```
Truy cập ứng dụng tại: `http://localhost:5173/`

### 5. Build production
```bash
npm run build
```
