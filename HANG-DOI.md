# Hàng đợi việc (vòng tự động)

Một phiên Claude Code mở tại thư mục này, chạy `/loop` với câu lệnh ở mục "Câu lệnh loop". Mỗi vòng làm đúng một việc `ready`, rồi dừng chờ vòng sau. Không có tiến trình ngầm: tắt phiên hoặc tắt máy là loop dừng, việc dở bị mất, chạy lại từ đầu việc đó.

## Quy trình một vòng
1. Đọc `CLAUDE.md`, `MEMORY.md`, mục dưới đây. `git status` phải sạch, nếu không thì dừng và báo.
2. Lấy việc `ready` đầu tiên. Không có thì báo "hết việc" và dừng loop.
3. Chạy Codex cho đúng một sheet: `_codex_out/run_sheets.sh <SHEET.ID>` (đọc `_codex_out/sheet_task.md`; prompt đi qua stdin vì `-i` nuốt prompt dạng tham số). Nếu `_codex_out/` chưa có thì tạo lại theo mô tả ở `docs/HUD_FIX_PROMPT.md` và `docs/UI_PROMPTS.md`; thư mục này không nằm trong git.
4. Tự xem `_preview.png` và kiểm: vùng an toàn 12%, viền màu nền còn sót, không chữ, không người, đúng chất liệu chung (vàng chạm, kính chàm, đá teal, render 3D bán hiện thực, không thủy mặc).
5. Quyết định:
   - Đạt hoặc lấn ít (vài chục điểm ảnh, không chạm mép, hình đúng): chép vào `assets/ui/<SHEET.ID>/`, ghi `owner_override` trong `manifest.json`, commit, đẩy `main`, đánh dấu `done` ở đây.
   - Sai phong cách, sai món, lấn nhiều, chạm mép: không chép. Thử lại tối đa 1 lần với câu lệnh chỉnh. Vẫn hỏng thì đánh `blocked` kèm lý do.
6. Việc `ask` hoặc `blocked` thì dừng loop và báo chủ. Không tự quyết.

## Quyết định của Phó chủ tịch (Chủ tịch ủy quyền 2026-11-14, Cố vấn soát chéo)
- Bộ ICON_FUNCTION cũ: tạo lại theo kiểu ICON_FUNCTION_2, giữ 12 ID `ICON.FN.*`. Không bỏ.
- Thanh linh lực: giữ xanh lá (khác thanh HP đỏ, EXP vàng, năng lượng cyan). Chỉ được dịu độ neon bằng tint khi ráp HUD, không tạo ảnh lại.
- Ảnh Tiên Nô: Codex image_gen (kèm `docs/reference/tien_no_style_target.png`); hai lần mặt hỏng thì chuyển ChatGPT TT-gacha. Làm ảnh ID của cả 10 người trước, rồi FULL, rồi CARD. Duyệt từng ảnh theo checklist `docs/ART_QUALITY_RULES.md` (che tóc vẫn khác mọi mặt đã duyệt; môi khép; đẹp hài hòa; mắt tay viền sắc; tối thiểu 1024; không cắt từ ảnh ghép). Chủ tịch chỉ xem một lần bảng ghép 10 mặt che tóc trước khi vào game.
- Mã game: React + Vite + TypeScript cho màn quản lý; PixiJS cho Thí Luyện khi tới lúc; bước đầu chỉ ráp khung sảnh Nguyệt Dạ Thanh Vân từ sheet UI đã đạt, không nhân vật, không gameplay. Làm trên nhánh `feature/lobby-frame`, merge `main` cần Chủ tịch duyệt. Engine HD-2D cho Bí Cảnh: làm prototype Phaser so Three.js, Chủ tịch chốt.
- Không quyết (chờ Chủ tịch, khi tới Bí Cảnh/Thí Luyện): cooldown đổi người, chết và hồi sinh, cỡ đội, chia thưởng, offline auto, multiplayer, engine HD-2D cuối, bậc hiếm N/R/SR/SSR/UR.

## Việc loại khác sheet UI
Việc 10, 11: một ảnh một lần chạy Codex (task brief tương tự `_codex_out/sheet_task.md`, lấy khối "### ID" của nhân vật trong `docs/CHAR_PROMPTS.md`), tự xem ảnh theo checklist; đạt thì lưu `assets/characters/<ID>/<ID>.ID.png`, commit. Việc 14, 16: làm trên nhánh `feature/...`, có build và smoke test, không đẩy `main`. Gặp việc `ask` thì dừng loop.

## Việc
| # | Trạng thái | Việc |
|---|---|---|
| 1-4 | done | BUTTONS_2, RARITY_PLATE, UI.PANEL.PROFILE, ICON_FUNCTION_2 |
| 5-8 | done | Đã quyết, xem mục trên |
| 9 | done | Tạo lại SHEET.ICON_FUNCTION theo kiểu ICON_FUNCTION_2, giữ 12 ID, lưới 4×3, cách mép ô ít nhất 62 px. Hỏng một lần thì tách thành 6+6 (`SHEET.ICON_FUNCTION_3`), ID icon giữ nguyên. Xem ghép cả 20 icon cạnh nhau trước khi nhận. |
| 10 | done | Tạo lại ảnh ID Diễm Vô Tâm (câu lệnh đã sửa tóc). |
| 11 | done | Tạo ảnh ID 9 Tiên Nô còn lại theo thứ tự `CHAR_PROMPTS.md`, từng ảnh, so với mọi mặt đã duyệt. |
| 12 | ask | Bảng ghép 10 mặt (che tóc) đã dựng ở `_codex_out/CHAR/contact_faces.png` (không nằm trong git). Nhận xét của Claude: ảnh đẹp nhưng 10 mặt cùng một khuôn (mặt trái xoan cằm nhọn, mũi, môi giống nhau), chỉ khác màu mắt, lông mày, tóc: KHÔNG đạt RULE-CHAR-002. Bạch Linh Nhi mọc tai cáo không có trong hồ sơ. Cần Chủ tịch xem và quyết hướng sửa. |
| 13 | ask | FULL rồi CARD cho 10 Tiên Nô, ảnh ID làm tham chiếu (chờ việc 12). |
| 14 | ready | Nhánh `feature/lobby-frame`: React + Vite + TS, ráp sảnh từ sheet UI đã đạt, không nhân vật, build và smoke test. |
| 15 | ask | Merge `feature/lobby-frame` vào `main` (Chủ tịch duyệt). |
| 16 | ready | Prototype Bí Cảnh HD-2D Phaser so Three.js, nhánh riêng, báo FPS và cỡ bundle. Chốt engine: ask Chủ tịch. |

## Câu lệnh loop
```text
/loop Đọc HANG-DOI.md và làm đúng một vòng theo mục "Quy trình một vòng". Dừng khi hết việc ready hoặc gặp việc ask/blocked.
```
