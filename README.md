# Vạn Giới Tầm Tiên

Idle Gacha RPG + Bí Cảnh HD-2D. Repository dành cho bản demo web.

Để chơi qua GitHub Pages, cần đưa `index.html` và `bi-canh.html` từ gói demo vào thư mục gốc và bật Pages tại Settings → Pages → Deploy from a branch → main → /(root).

## Chạy bản dựng giao diện (Vite + React + TypeScript)

```bash
npm install
npm run dev      # mở http://localhost:5173
npm run build    # kiểm kiểu + dựng vào dist/
```

Ảnh UI lấy từ `assets/ui/<SHEET.ID>/<ID>.png`, tên tệp là ID trong `data/ui_registry.json`. Ảnh chưa có thì giao diện vẽ khối CSS thay thế; thả ảnh mới vào đúng thư mục là tự dùng, không sửa code.
