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
| 10 | redo | Tạo lại ảnh ID Diễm Vô Tâm (câu lệnh đã sửa tóc). |
| 11 | redo | Tạo ảnh ID 9 Tiên Nô còn lại theo thứ tự `CHAR_PROMPTS.md`, từng ảnh, so với mọi mặt đã duyệt. |
| 12 | ask | Bảng ghép 10 mặt (che tóc) đã dựng ở `_codex_out/CHAR/contact_faces.png` (không nằm trong git). Nhận xét của Claude: ảnh đẹp nhưng 10 mặt cùng một khuôn (mặt trái xoan cằm nhọn, mũi, môi giống nhau), chỉ khác màu mắt, lông mày, tóc: KHÔNG đạt RULE-CHAR-002. Bạch Linh Nhi mọc tai cáo không có trong hồ sơ. Cần Chủ tịch xem và quyết hướng sửa. |
| 13 | ask | FULL rồi CARD cho 10 Tiên Nô, ảnh ID làm tham chiếu (chờ việc 12). |
| 14 | ready | Nhánh `feature/lobby-frame`: React + Vite + TS, ráp sảnh từ sheet UI đã đạt, không nhân vật, build và smoke test. |
| 15 | ask | Merge `feature/lobby-frame` vào `main` (Chủ tịch duyệt). |
| 16 | ready | Prototype Bí Cảnh HD-2D Phaser so Three.js, nhánh riêng, báo FPS và cỡ bundle. Chốt engine: ask Chủ tịch. |

## Câu lệnh loop
```text
/loop Đọc HANG-DOI.md và làm đúng một vòng theo mục "Quy trình một vòng". Dừng khi hết việc ready hoặc gặp việc ask/blocked.
```

## Ghi chú 2026-11-14
Ảnh nhân vật do Codex tạo (ảnh ID Diễm Vô Tâm trong `assets/characters/` và 10 ảnh ID thử trong `_codex_out/`) đã bị xóa theo lệnh Chủ tịch: mặt cùng khuôn, tóc, môi, áo cổ cao không đạt. Việc 10, 11 làm lại bằng ChatGPT theo `docs/CHAR_ID_CHATGPT.md`.

## Nhập ảnh công pháp, chiêu, quái từ RoomCost/TuTien (ý tưởng Chủ tịch 2026-11-14, Phó chủ tịch và Cố vấn bàn)
Kết luận: HOÃN, chưa chép tệp nào. Lý do: VGTT chưa có dữ liệu chiêu, công pháp, quái, chưa có `package.json`; VGTT là repo công khai (Pages) còn RoomCost riêng tư, ảnh đã đẩy lên thì không thu hồi được; ảnh quái Meshy chưa ghi gói và ngày trong `ASSETS_LICENSES.md`.
Khi cần: icon công pháp (285, 128 px) và icon chiêu (488, 256 px) hợp phong cách, ghép khung vàng-chàm-teal bằng script nhập kèm manifest; chân dung quái (166) hợp màn không pixel; VFX (374 MB) chỉ lấy 20-40 dải cho Bí Cảnh sau khi chốt engine; Thí Luyện cần hiệu ứng và quái pixel mới. Chỉ lấy hình, không lấy tên công pháp gắn thế lực TuTien. Đề xuất miền ID: `ICON.ART`, `ICON.ART_SUB`, `ICON.SKILL`, `MON.PORTRAIT`, `FX.SKILL`.
| # | Trạng thái | Việc |
|---|---|---|
| 17 | ask | Chủ tịch quyết: (a) giữ ảnh TuTien riêng, VGTT tạo bộ ảnh riêng theo cùng quy trình (đề xuất); (b) chuyển VGTT sang repo riêng tư; (c) dùng chung ảnh, có văn bản của Chủ tịch. |
| 18 | ask | VFX trong Bí Cảnh là pixel hay độ phân giải cao (chốt cùng engine, việc 16). |
| 19 | ready | Phác tài liệu miền ID cho chiêu, công pháp, quái (không kèm ảnh). |

## Kế hoạch bản chơi sớm (Phó chủ tịch lập, Cố vấn soát, 2026-11-14)
Mục tiêu Chủ tịch: chơi được sớm nhất. Chơi trên máy bằng `npm run dev` (hoặc `vite preview`), chưa lên Pages khi Chủ tịch chưa duyệt công khai.
Vòng chơi: Sảnh, Gacha, xem Tiên Nô, tổ đội 6 (1 chính + 5 Tiên Nô), Thí Luyện tự đánh 20 tầng, thưởng, Tu Luyện (nút lên cấp trong hồ sơ), lặp; lưu `localStorage` có version. Cắt khỏi bản đầu: Bí Cảnh, mạng, offline, chợ, bang hội, xếp hạng, thư, trang bị, Đột Phá phức tạp (nút ghi "Sắp mở").
Điều chỉnh sau soát của Cố vấn:
- Làm lát dọc trước: trận đánh với đội cố định (nhân vật chính + 3 Tiên Nô) 3 tầng, rồi mới Gacha, vì Gacha không có trận thì không có lý do quay. Chủ tịch đánh được từ ngày 2, quay Gacha ngày 3, trọn vòng ngày 4-5 (ước lượng chưa đo, đo lại sau M1).
- Trận: tick tất định, 3 khuôn chiêu có tham số (sát thương, hồi máu và khiên, khống chế), mỗi người thêm 1 nhãn đặc trưng; 10 cơ chế riêng hoãn; khắc hệ tạm 1.0. Quái sinh theo công thức theo tầng, vitest chạy 20 tầng tìm tầng kẹt.
- Bộ phát lại trận bằng DOM/CSS, Pixi chờ sprite (M6). Lõi giữ HP và trạng thái riêng từng người (chuẩn bị Bí Cảnh).
- Gộp màn Gacha và danh sách Tiên Nô; thẻ có tên, thân phận, hệ, một câu tiểu sử; chân dung để khối màu "đang vẽ", ảnh thật thả đúng ID.
- Triển khai Pages (khi Chủ tịch duyệt): `base: '/van-gioi-tam-tien/'`, chỉ đẩy `dist`, không đưa `_sheet.png`, tách prompt 18+ khỏi bản phát hành. Nhánh `feature/lobby-frame` chậm main khoảng 20 commit: merge main trước.
| # | Trạng thái | Việc |
|---|---|---|
| VS-0 | ready | Nhánh `feature/vertical-slice` từ lobby-frame, merge main, chạy được `npm run dev`; sửa `pages.yml` (build ra `dist`, bỏ `_sheet`, base path), chưa triển khai. |
| VS-1 | ready | Lõi: model nhân vật chung, RNG theo hạt giống, lưu game có version, HUD số thật; test tất định. |
| VS-2 | ready | Thí Luyện: lõi trận tick tất định, 3 khuôn chiêu, đội cố định, 3 tầng, bộ phát lại DOM. |
| VS-3 | ready | Gacha có pity + màn Tiên Nô gộp + tổ đội 6. Số tỉ lệ và pity ghi "tạm alpha". |
| VS-4 | ready | Thưởng, Tu Luyện, 20 tầng sinh theo công thức, vitest tìm tầng kẹt. |
| VS-L3 | ask | Chủ tịch duyệt: số gacha và bậc hiếm chính thức; lên Pages công khai; merge vào `main` (việc 15). |

## Độ hiếm và tiềm năng Tiên Nô (Chủ tịch bảo triển khai 2026-11-14)
Đã ghi `rarity` và `title` cho 10 Tiên Nô trong `data/tien_no_appearance.json` và cột Độ hiếm trong `docs/ALPHA_TIEN_NO_ROSTER.md`: Cổ U Lan UR; Mộ Dung Tuyết, Diễm Vô Tâm SSR; Hàn Nguyệt Sương, Vân Mộng Dao, Lạc Thanh Y SR; Sở Hồng Liên, Bạch Linh Nhi, Liễu Như Yên R; Tần Nguyệt Dao N. Hệ số tiềm năng N 1.0, R 1.15, SR 1.3, SSR 1.5, UR 1.75, tạm alpha. VS-3, VS-4 dùng các giá trị này; số chính thức cần Chủ tịch duyệt (VS-L3).
