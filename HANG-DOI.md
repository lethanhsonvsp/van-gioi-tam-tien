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

## Việc
| # | Trạng thái | Việc |
|---|---|---|
| 1 | done | SHEET.BUTTONS_2: lần trước ra nút mobile phổ thông có chữ tiếng Anh. Tạo lại đúng khung vàng chạm, kính chàm, đá teal, không chữ. |
| 2 | done | SHEET.RARITY_PLATE: lần trước khung lấn mép ô, cánh UR chạm mép. Vẽ nhỏ hơn, mọi thứ trong 389×(vùng an toàn) mỗi ô. |
| 3 | done | UI.PANEL.PROFILE (SHEET.HUD_WIDE, ô 1): ám xanh lá ở đoạn mờ, cuối bị cắt. Tạo lại; `UI.NAV.BOTTOM_BAR` đã nhận, giữ nguyên. |
| 4 | done | SHEET.ICON_FUNCTION_2: hình đẹp nhưng lấn ~1070 px mỗi biểu tượng (sát hai bên). Tạo lại với biểu tượng nhỏ hơn, cách mép ô ít nhất 62 px. Hỏng thì giữ bản hiện có ở `_codex_out/` và báo chủ. |
| 5 | ask | SHEET.ICON_FUNCTION (bộ cũ, `REJECTED_NOT_PRODUCTION_READY`): thay bằng ICON_FUNCTION_2 hay tạo lại. Chủ quyết. |
| 6 | ask | Màu thanh linh lực: giữ xanh lá hay đổi chàm/xanh lam. Chủ quyết. |
| 7 | ask | Ảnh Tiên Nô (ID, FULL, CARD) cho 10 nhân vật: mỗi mặt phải được chủ duyệt, tạo qua ChatGPT Project TT-gacha hoặc Codex. Diễm Vô Tâm: ảnh ID chờ chủ duyệt sau khi sửa tóc bị cắt. |
| 8 | ask | Mã game: chưa có `package.json`, chưa chọn engine HD-2D. Chủ quyết (xem "Unresolved design decisions" trong `CLAUDE.md`). |

## Câu lệnh loop
```text
/loop Đọc HANG-DOI.md và làm đúng một vòng theo mục "Quy trình một vòng". Dừng khi hết việc ready hoặc gặp việc ask/blocked.
```
