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
| VS-0 | done | Nhánh `feature/vertical-slice` từ lobby-frame, merge main, chạy được `npm run dev`; sửa `pages.yml` (build ra `dist`, bỏ `_sheet`, base path), chưa triển khai.  Xong trên nhánh feature/vertical-slice: build xanh, dist không có `_sheet*`, base chỉ áp khi build, pages.yml build rồi đẩy `dist` (chưa triển khai, chỉ sửa trong nhánh). |
| VS-1 | done | Lõi: model nhân vật chung, RNG theo hạt giống, lưu game có version, HUD số thật; test tất định.  Xong: `src/core` (rng, character, save, store), `src/content` (tien_no.json sinh bằng `scripts/gen_content.mjs`, balance.json alpha-temporary), HUD đọc store, 7 test vitest. Chưa có UI đổi tên nhân vật; nhãn cảnh giới tạm = `Luyện Khí <cấp>`. |
| VS-2 | done | Thí Luyện: lõi trận tick tất định, 3 khuôn chiêu, đội cố định, 3 tầng, bộ phát lại DOM. Xong (nhánh feature/vertical-slice): `src/battle/` (engine tick tất định, skills 3 khuôn, monsters theo công thức, team, replay), `src/content/skills.json` (nhãn 10 Tiên Nô + nhân vật chính), `trial.json`, `balance.json` mục `battle` (khắc hệ 1.0), màn `src/app/Trial.tsx`. Tỉ lệ thắng đội mẫu cấp 1, 200 hạt giống: tầng 1 100%, tầng 2 100%, tầng 3 49,5% (alpha-temporary). Mặc định đảo ngược được: chết là nằm đến hết trận, không hồi sinh; không đổi người giữa trận; đội 4 (chính + 3) cố định. |
| VS-3 | done | Gacha có pity + màn Tiên Nô gộp + tổ đội 6. Số tỉ lệ và pity ghi "tạm alpha". Xong (feature/vertical-slice): `src/core/gacha.ts` (quay thuần, RNG trong save), `roster.ts` (tổ đội 6), `src/content/gacha.json` (alpha-temporary: N40/R30/SR20/SSR8/UR2, chi phí 1 thẻ, 10 thẻ khởi điểm, pity SR+ lần thứ 10 và UR lần thứ 60), save v2 + migrate từ v1, màn `Roster.tsx` (Tiên Nô + Triệu hồi, nút Gacha cùng màn), `Party.tsx` (nút Tổ Đội), Thí Luyện dùng `playerTeam` (chưa có Tiên Nô thì đội mẫu; đã có thì dùng tổ đội, kể cả chỉ nhân vật chính; đảo ngược được). Bản sao chỉ tăng `copies`. 10000 lần quay: N 39,53 / R 29,39 / SR 20,02 / SSR 8,20 / UR 2,86 phần trăm. Số chính thức chờ VS-L3. |
| VS-4 | done | Thưởng, Tu Luyện, 20 tầng sinh theo công thức, vitest tìm tầng kẹt. Xong (feature/vertical-slice): `core/rewards.ts`, `core/progress.ts`, `content/rewards.json`, mục `progression` trong balance.json (alpha-temporary), save v3 lưu tầng, 20 tầng thủ lĩnh mỗi 5 tầng, `src/sim/climb` mô phỏng: 38/40 hạt giống qua 20 tầng, 2 kẹt ở thủ lĩnh tầng 10 (chỉ 4 Tiên Nô); đội toàn UR qua cả 20 tầng ngay lần đầu (ghi lại, chờ VS-L3). |
| VS-5 | done | Đổi tên nhân vật, roleVi/combatVi 10 Tiên Nô, màn Hướng dẫn, màn Cài Đặt, smoke test headless. Xong (feature/vertical-slice): `core/name.ts` (validateName, có test), ô Đổi tên ở màn Tu Luyện; `roleVi`/`combatVi` sinh từ bảng docs/ALPHA_TIEN_NO_ROSTER.md qua gen_content.mjs, hiện trong hồ sơ Tiên Nô; `Guide.tsx` (tự mở một lần, cờ localStorage `vgtt.seenGuide`, mở lại từ Cài Đặt); `Settings.tsx` (version save, Xuất save, Xóa save hai bước); `scripts/smoke.mjs` chạy bằng chromium headless trong cache Playwright qua CDP, không cần gói mới: `npm run dev` rồi `node scripts/smoke.mjs http://localhost:<cổng>/`, ảnh ra /tmp (không dùng được với `vite preview` vì base path). |
| VS-L3 | ask | Chủ tịch duyệt: số gacha và bậc hiếm chính thức; lên Pages công khai; merge vào `main` (việc 15). |

## Độ hiếm và tiềm năng Tiên Nô (Chủ tịch bảo triển khai 2026-11-14)
Đã ghi `rarity` và `title` cho 10 Tiên Nô trong `data/tien_no_appearance.json` và cột Độ hiếm trong `docs/ALPHA_TIEN_NO_ROSTER.md`: Cổ U Lan UR; Mộ Dung Tuyết, Diễm Vô Tâm SSR; Hàn Nguyệt Sương, Vân Mộng Dao, Lạc Thanh Y SR; Sở Hồng Liên, Bạch Linh Nhi, Liễu Như Yên R; Tần Nguyệt Dao N. Hệ số tiềm năng N 1.0, R 1.15, SR 1.3, SSR 1.5, UR 1.75, tạm alpha. VS-3, VS-4 dùng các giá trị này; số chính thức cần Chủ tịch duyệt (VS-L3).

## Vòng lặp bản chơi sớm (Chủ tịch bảo 2026-11-14)
Mục tiêu: Chủ tịch chơi được sớm nhất bằng `cd ~/wt/vgtt-vs && npm run dev`. Nguồn việc: bảng VS-2 đến VS-6 dưới đây trong tệp này (nhánh `feature/vertical-slice`). Một phiên Claude Code mở sẵn chạy `/loop` đọc mục này; mỗi vòng giao đúng một việc cho một agent làm trong worktree `~/wt/vgtt-vs`, rồi kiểm và đóng. Máy tắt thì loop dừng, chạy lại `/loop`.

### Quy trình một vòng
1. `git status` trong worktree phải sạch; nếu không thì dừng và báo. `git pull` nhánh.
2. Lấy việc `ready` đầu tiên trong bảng. Không có thì báo "hết việc" và dừng loop.
3. Giao cho MỘT agent (`general-purpose`, model sonnet; nâng opus khi hỏng một lần hoặc việc đụng thiết kế trận/cân bằng) với brief: đọc `CLAUDE.md`, `MEMORY.md`, mục kế hoạch và việc đó; chỉ làm trong worktree trên nhánh `feature/vertical-slice`; commit nhỏ; được push nhánh này; KHÔNG push `main`, KHÔNG merge `main`, KHÔNG bật Pages; không tạo ảnh; không đưa ảnh nhân vật chưa duyệt vào game; chỉ một tiến trình build/test lúc một; mỗi tệp mã tối đa khoảng 300 dòng; lõi thuần TS tách khỏi render; mọi số cân bằng ghi `alpha-temporary` trong `src/content/*.json`.
4. Kiểm tự lập: chạy `npm test` và `npm run build` (phải xanh), xem `git log`, đọc diff chính. Việc có giao diện thì chạy `npm run dev` và dùng trình duyệt headless (nếu có) hoặc curl để chắc trang lên.
5. Xanh: cập nhật bảng (`done` + ghi chú), commit, push nhánh. Hỏng: thử lại một lần với model cao hơn và ghi lý do; vẫn hỏng thì đánh `blocked` kèm lý do và dừng loop.
6. Việc có giao diện KHÔNG được đóng (`done`) khi chưa đủ ba điều: (a) `npm run qa` báo 0 vi phạm ở cả 3 khổ 1920x1080, 1280x720, 844x390 (quét DOM mọi màn: mã hệ viết hoa, "alpha", "undefined", "NaN", "[object", "tick", "Hạt giống" ngoài mục chi tiết kỹ thuật, chữ bị cắt, chữ chồng hoặc bị che, chữ dưới 13 px ở khổ thấp hơn 480 px và dưới 12 px ở khổ khác, nút dưới 44 px ở khổ thấp); (b) ảnh chụp đủ 8 màn (sảnh, quay 10, hồ sơ, Tiên Nô, tổ đội, Thí Luyện trước trận, giữa trận, Tu Luyện) x 3 khổ do `npm run qa` lưu ở `/tmp/vgtt-qa-after/<khổ>/`; (c) Kiểm định độc lập (agent `kiem-dinh` và `gd-chat-luong`, chỉ đọc, không phải agent đã làm) xem ảnh và kết luận đạt. Người làm tự chấm không thay được (c).

### Khi bí về thiết kế hoặc nội dung
Tham khảo game TuTien tại `/home/sonlt/code/RoomCost/TuTien` (tài liệu `TuTien_doc/`, lõi `TuTien_game/src/core/`, `TuTien_game/content/`): cảnh giới, công pháp, chiến đấu, kinh tế, nhật ký thiết kế. Giao agent Nghiên cứu (opus, chỉ đọc) tóm tắt cách TuTien làm và đề xuất bản đơn giản cho bản chơi sớm. Quy tắc: chỉ học ý tưởng và cơ chế, viết lại bằng lời và số của mình; không chép tệp, ảnh, đoạn văn, tên thế lực của TuTien vào repo này (repo này công khai, TuTien riêng tư); số lấy làm tham khảo ghi `alpha-temporary`. Kinh tế theo nguyên tắc bảo toàn tài nguyên của TuTien (không nguồn tiền vô hạn). Quyết định thiết kế lõi mới (đổi luật đã chốt, hồi sinh, cooldown đổi người, cỡ đội, số Gacha chính thức, merge main, lên Pages) vẫn dừng hỏi Chủ tịch.

### Việc
| # | Trạng thái | Việc |
|---|---|---|
| VS-2 | done | Thí Luyện: lõi trận tick tất định (`src/battle/`), 3 khuôn chiêu có tham số (sát thương, hồi máu và khiên, khống chế) + 1 nhãn đặc trưng mỗi Tiên Nô, khắc hệ tạm 1.0, đội cố định (nhân vật chính + 3 Tiên Nô), 3 tầng, quái sinh theo công thức theo tầng, nhật ký sự kiện; bộ phát lại DOM/CSS bằng hình khối theo màu hệ + thanh máu + chữ sát thương. Màn Thí Luyện vào từ nút trên sảnh. Test tất định (cùng hạt giống cùng kết quả). Xong (nhánh feature/vertical-slice): `src/battle/` (engine tick tất định, skills 3 khuôn, monsters theo công thức, team, replay), `src/content/skills.json` (nhãn 10 Tiên Nô + nhân vật chính), `trial.json`, `balance.json` mục `battle` (khắc hệ 1.0), màn `src/app/Trial.tsx`. Tỉ lệ thắng đội mẫu cấp 1, 200 hạt giống: tầng 1 100%, tầng 2 100%, tầng 3 49,5% (alpha-temporary). Mặc định đảo ngược được: chết là nằm đến hết trận, không hồi sinh; không đổi người giữa trận; đội 4 (chính + 3) cố định. |
| VS-3 | done | Gacha có pity + màn Tiên Nô gộp danh sách + tổ đội 6 (1 chính + 5). Thẻ: khung độ hiếm + icon hệ + tên + danh xưng `title`, chân dung là khối màu "đang vẽ". Tỉ lệ và pity ghi `alpha-temporary`. Test tỉ lệ và pity. Xong (feature/vertical-slice): `src/core/gacha.ts` (quay thuần, RNG trong save), `roster.ts` (tổ đội 6), `src/content/gacha.json` (alpha-temporary: N40/R30/SR20/SSR8/UR2, chi phí 1 thẻ, 10 thẻ khởi điểm, pity SR+ lần thứ 10 và UR lần thứ 60), save v2 + migrate từ v1, màn `Roster.tsx` (Tiên Nô + Triệu hồi, nút Gacha cùng màn), `Party.tsx` (nút Tổ Đội), Thí Luyện dùng `playerTeam` (chưa có Tiên Nô thì đội mẫu; đã có thì dùng tổ đội, kể cả chỉ nhân vật chính; đảo ngược được). Bản sao chỉ tăng `copies`. 10000 lần quay: N 39,53 / R 29,39 / SR 20,02 / SSR 8,20 / UR 2,86 phần trăm. Số chính thức chờ VS-L3. |
| VS-4 | done | Thưởng sau trận (linh thạch, EXP, thẻ triệu hồi), lên cấp (cảnh giới là nhãn theo mốc 10 cấp), nút lên cấp trong hồ sơ, mở rộng 20 tầng quái sinh theo công thức, vitest chạy đội mẫu qua 20 tầng tìm tầng kẹt và đội toàn UR. Xong (feature/vertical-slice): save v3 + migrate v2 lưu `trial` (tầng cao nhất đã qua, tầng đang đứng, số lần lặp có thưởng); `src/core/rewards.ts` (thưởng thắng: linh thạch, EXP cho cả đội tham chiến kể cả người ngã, thẻ triệu hồi chỉ khi qua lần đầu: 1 thẻ mỗi 3 tầng + 2 thẻ tầng thủ lĩnh; lặp lại trả 50% giảm 0,7 mỗi lần, hết sau 5 lần mỗi tầng; thua không thưởng); `src/core/progress.ts` (`addExp` thuần, EXP cần = 40·cấp^1,3, Tu Luyện tốn 15·cấp^1,4 linh thạch, trần Tiên Nô = cấp chính + N0/R0/SR2/SSR4/UR6, trần chung 40, cảnh giới Luyện Khí/Trúc Cơ/Kim Đan/Nguyên Anh mỗi 10 cấp); nút Tu Luyện ở màn Tu Luyện (nhân vật chính, từ sảnh) và hồ sơ Tiên Nô; Thí Luyện hiện thưởng sau trận, nút Tầng trước/Tầng kế trong phạm vi đã mở; 20 tầng, cấp quái 1 + 1,3·(tầng−1), số quái 2 + 0,5·(tầng−1) tối đa 6, thủ lĩnh mỗi 5 tầng ×1,5. Mô phỏng người chơi mẫu 40 hạt giống: tầng 1-8 gần 100%, tầng 9 58%, thủ lĩnh 10 31% (2/40 kẹt, đều chỉ có 4 Tiên Nô), 15 45%, 20 37%; 38/40 qua tầng 20, trung bình 33 trận, 13,6 thẻ nhận, cấp chính cuối 13,5. Đội toàn UR qua 20 tầng ngay lần đầu (quá dễ, chờ VS-L3 chốt hệ số hiếm). Số đều alpha-temporary. |
| VS-5 | done | Chỗ đổi tên nhân vật, `role` tiếng Việt cho 10 Tiên Nô, màn hướng dẫn ngắn, nút "Lưu và xóa save" trong cài đặt; smoke test mở trang bằng trình duyệt headless nếu có. Xong (feature/vertical-slice): `core/name.ts` (validateName, có test), ô Đổi tên ở màn Tu Luyện; `roleVi`/`combatVi` sinh từ bảng docs/ALPHA_TIEN_NO_ROSTER.md qua gen_content.mjs, hiện trong hồ sơ Tiên Nô; `Guide.tsx` (tự mở một lần, cờ localStorage `vgtt.seenGuide`, mở lại từ Cài Đặt); `Settings.tsx` (version save, Xuất save, Xóa save hai bước); `scripts/smoke.mjs` chạy bằng chromium headless trong cache Playwright qua CDP, không cần gói mới: `npm run dev` rồi `node scripts/smoke.mjs http://localhost:<cổng>/`, ảnh ra /tmp (không dùng được với `vite preview` vì base path). |
| VS-6 | done | Bản chơi thử (kết quả ở mục "Kết quả chơi thử VS-6"): build, chạy `npm run dev`, chơi một vòng đầy đủ bằng script mô phỏng (tạo game mới, quay Gacha, xếp đội, đánh 5 tầng, lên cấp), báo các chỗ gãy và cảm giác nhịp chơi; lập danh sách chỉnh. |
| VS-L3 | ask | Chủ tịch duyệt: số Gacha và độ hiếm chính thức; lên Pages công khai (sửa `.github` ở main, tách prompt 18+); merge nhánh vào `main`; chốt engine HD-2D và Bí Cảnh. |

## Kết quả chơi thử VS-6 (2026-11-14)
Kiểm: `npm test` 36/36, `npm run build` xanh, `scripts/smoke.mjs` OK, `scripts/playthrough.mjs [url] [outDir] [WxH]` (mới, CDP, không thêm gói) chạy trọn vòng ở 1280x720 và 390x844: không lỗi console; reload giữ nguyên save (tên, tầng, tài nguyên, đội); xóa save về game mới. Ảnh ở /tmp/vgtt-play (không commit).

Nhịp thật (1280x720): đóng hướng dẫn + đổi tên + Quay 10 + xếp đội ~10 s; mỗi trận phát lại ~1,2-3,5 s (đội mẫu qua tầng 1-5 đều thắng, 5/5); toàn vòng 5 tầng + tu luyện + quay + reload ~30 s. Tuyến kinh tế: thẻ khởi điểm 10, tầng 3 và 5 mỗi lần thêm 1-2 thẻ, tầng 5 xong có 3 thẻ; 475 linh thạch sau 5 tầng đủ lên ~3 cấp (cấp 4 lên 7, giá 229 ở cấp 7). Tổng linh thạch kiếm được hết 20 tầng lần đầu 3750 (+ lặp ~1,39 lần) so với 42432 để lên cấp 40: bằng linh thạch chỉ tới khoảng cấp 20.

Đã sửa (commit riêng): (1) Thí Luyện thêm nút "Tua nhanh" (x4) và "Bỏ qua" cho phát lại, chỉ DOM, lõi giữ nguyên; (2) tên và danh xưng thẻ Tiên Nô tràn khung, nay nhỏ hơn và cắt bằng dấu ba chấm; (3) tầng 20 thắng lần đầu không còn ghi "Mở tầng kế" mà ghi hoàn thành 20 tầng; (4) điện thoại dọc hiện dòng "Xoay ngang điện thoại để chơi".

Lỗi/chỗ yếu còn lại (không sửa vì lớn hoặc đụng thiết kế):
1. Khổ điện thoại: sân khấu cố định 1600x900 co lại ~0,24 lần, chữ không đọc được; xoay ngang vẫn nhỏ (~0,5). Cần bố cục di động riêng (việc lớn).
2. Màn Thí Luyện trước "Bắt đầu" để trống (chỉ chữ VS), không xem được đội mình/quái trước trận.
3. Quay Gacha không tự xếp Tiên Nô mới vào đội; người mới phải sang hồ sơ bấm "Vào đội" từng người (hướng dẫn có nói nhưng dễ bỏ sót); Tiên Nô mới có thể không tự vào đội nên trận đầu dùng đội mẫu đến khi sở hữu Tiên Nô, rồi đổi sang đội thật (có thể đổi người đột ngột).
4. Tiên Nô trùng chỉ cộng "+N bản sao" hiển thị, chưa có tác dụng (chưa có luật) và chưa đổi thành tài nguyên.
5. Trần cấp Tiên Nô = cấp nhân vật chính + bonus độ hiếm (N +0): Tiên Nô N hiển thị "Cấp 1/1" và nút Tu Luyện khóa ở đầu game, thông báo có nhưng dễ tưởng lỗi.
6. Hạt giống trận theo Date.now: mỗi lần "Bắt đầu" kết quả có thể khác, chưa có chế độ cố định để Chủ tịch tái hiện.
7. Ảnh chân dung vẫn là khối màu "Chân dung đang vẽ" (chờ ảnh duyệt).

Cảm giác nhịp chơi: vòng quay -> đánh -> lên cấp ngắn và rõ, 5 tầng đầu thắng liền không có áp lực (cân bằng mềm, trận 1-3 s nên sau khi có Tua nhanh/Bỏ qua không còn nhàm). Chỗ có thể nhàm: tầng 1-5 không có lựa chọn nào (đội mẫu thắng ngay); sau khi hết thẻ khởi điểm phải đợi tầng 3/5 mới có thẻ. Kẹt đo bằng sim: 2/40 hạt giống kẹt ở thủ lĩnh tầng 10 (VS-4).

Số cân bằng cần Chủ tịch duyệt (đều alpha-temporary): tỉ lệ Gacha N40/R30/SR20/SSR8/UR2 và pity 10/60 (màn hiện "SR sau ~10, UR sau ~50"); thưởng 30+15/tầng linh thạch, 30+20/tầng EXP; lặp 0,5x giảm 0,7, tối đa 5 lần; giá tu luyện 15*cấp^1,4; EXP 40*cấp^1,3; trần cấp 40; bonus trần theo độ hiếm; có muốn bằng linh thạch tới được cấp 40 hay chỉ ~20 như hiện tại (trần kinh tế là có chủ đích: không nguồn vô hạn).

Đề xuất việc tiếp theo: VS-7 màn Thí Luyện xem trước đội/quái và Gacha tự xếp đội mới (Chủ tịch duyệt mặc định); VS-8 bố cục di động riêng (tùy Chủ tịch muốn chơi điện thoại không); VS-9 luật Tiên Nô trùng (cần Chủ tịch quyết, L3); VS-10 gắn ảnh chân dung khi có ảnh duyệt.

## Quyết định Phó chủ tịch và Cố vấn (2026-11-14, số alpha-temporary, Chủ tịch chỉ đưa ý tưởng)
- Độ hiếm: Tần Nguyệt Dao lên R; Tiên Nô chỉ R, SR, SSR, UR; N là bậc của nhân vật chính, quái và trang bị. Hệ số tiềm năng N 1.0, R 1.15, SR 1.25, SSR 1.4, UR 1.55.
- Gacha: N 0, R 58, SR 30, SSR 10, UR 2; pity SR+ ở lượt 10, pity UR 50; 10 thẻ khởi điểm.
- Kinh tế: không đổi giá tu luyện; `maxLevel` 30 (Nguyên Anh "Sắp mở"); linh thạch base 40, perFloor 25; không thêm nguồn vô hạn.
- Độ khó: `levelPerFloor` thử 1.4 (chỉ chốt sau khi sim với bộ hệ số mới đạt tiêu chí; không đạt thì giữ 1.3, được chỉnh trong 1.3 đến 1.6), `bossMult` 1.5. Cần chạy sim từng thay đổi một.
- Tiên Nô trùng (VS-9 thu hẹp): chỉ +1 trần cấp mỗi bản trùng, tối đa 5; từ bản thứ 6 chỉ đếm, HOÃN đổi ra linh thạch (chỉ cần khi có nguồn thẻ định kỳ, lúc đó chạy phép thử bảo toàn).
- Mặc định thiết kế tạm chấp nhận; lên cấp hồi đầy máu chỉ ngoài Bí Cảnh.
- Pages công khai và merge `main`: chờ lệnh người dùng, không tự làm.
| # | Trạng thái | Việc |
|---|---|---|
| VS-11 | done | Áp số trên. Merge origin/main vào nhánh trước (độ hiếm trong `data/tien_no_appearance.json` và `docs/ALPHA_TIEN_NO_ROSTER.md` đã đổi trên main). Chạy `gen_content.mjs`. Sửa `gacha.json` (N 0, R 58, SR 30, SSR 10, UR 2, urEvery 50), `balance.json` (hệ số hiếm, maxLevel 30, capBonus R 2, khóa Nguyên Anh), `rewards.json` (linh thạch 40 + 25/tầng), `trial.json` (levelPerFloor thử 1.4). Migrate save lên v4: gán lại rarity theo id từ nội dung, hạ cấp quá 30 xuống 30. Cập nhật test Gacha và climb. Tiêu chí (40 hạt giống): tầng 1-2 thắng >=90%; không kẹt trước tầng 10; tổng kẹt <=1/40; >=85% qua tầng 20; cấp chính ở tầng 20 khoảng 18-22; đội toàn UR vẫn qua nhưng tầng 16-20 thắng ngay lần đầu <=70% và >=50% hạt giống thua ít nhất một lần. Chạy sim từng thay đổi một, báo số trước và sau.  Xong 2026-11-14, xem mục "Kết quả VS-11". |
| VS-7 | done | Thí Luyện xem trước đội và quái trước khi Bắt đầu; Gacha tự xếp Tiên Nô mới vào ô đội trống (không đẩy ai ra); màn kết quả hiện hạt giống trận. Xong 2026-11-14: `TrialPreview.tsx` (đội, quái, thủ lĩnh, thưởng từ `floorReward`, nhãn Đội mẫu / Chỉ nhân vật chính); `autoJoin` trong `roster.ts`, gọi trong `pullOne` (nhãn "Đã vào đội" ở thẻ kết quả); hạt giống và nút Sao chép ở cuối màn kết quả trận; hồ sơ Tiên Nô ghi dòng trần cấp (`capBonusOf`); test `autoparty.test.ts`; `playthrough.mjs` kiểm đội tự đầy, bản xem trước, nút hạt giống. Lưu ý: sau Quay 10 đội thường đầy ngay nên trận đầu dùng đội thật (6 người cấp 1). |
| VS-9 | done | Trần cấp +1 mỗi bản trùng (tối đa 5), hiện trong hồ sơ, có test; bản thứ 6 trở đi chỉ đếm. Xong 2026-11-14: `duplicateCapMax: 5` trong `balance.json` (kiểm trong `content/index.ts`); `dupCapBonus` và `levelCap` trong `progress.ts`; hồ sơ Tiên Nô ghi "Bản sao: N (+M trần cấp, tối đa 5)" và trần đã tính; không đổi save version. 46 test xanh, sim climb/rarity không đổi (hai sim dùng copies 0), build và smoke sạch. |
| VS-8 | done | Bố cục điện thoại ngang (`max-height: 480px` + landscape): `App.tsx` bỏ sân khấu co, thêm lớp `.compact`; `compact.css` (sảnh, bảng) và `compact-screens.css` (Thí Luyện, Tiên Nô, Tổ Đội) chỉ có hiệu lực dưới lớp đó, màn >= 1280x720 giữ nguyên (ảnh chụp trùng byte ở sảnh, Tu Luyện, Cài Đặt). `playthrough.mjs` ở khổ H <= 480 tự đo chữ >= 13 px, nút >= 44 px, tràn ngang, chồng nút: 844x390 trước 502 vi phạm (chữ 4,3 đến 9,5 px), sau 0; 667x375 sau 0. Smoke nhận thêm tham số WxH. Chưa làm: điện thoại dọc vẫn chỉ nhắc xoay ngang; tai thỏ (`viewport-fit=cover`) chưa bật. |
| VS-10 | blocked | Gắn ảnh chân dung theo ID khi ảnh đã duyệt. |
| VS-12 | done | Sửa giao diện sau nghiệm thu không đạt (10 lỗi). Xong 2026-11-14: thẻ Tiên Nô có dải chữ cố định (tên và danh xưng mỗi thứ tối đa 2 dòng), huy hiệu hệ ICON.ELEM.* trên nền gradient theo hệ (`Card.tsx`, `emblem.css`); kết quả quay là cửa sổ đặc, lưới 5x2, cuộn trong cửa sổ, Đóng ở góc; hồ sơ Tiên Nô nền đặc, huy hiệu hệ lớn thay "Chân dung đang vẽ"; Thí Luyện dùng huy chương (viền vàng-chàm, icon hệ, vòng theo độ hiếm, đỏ cho thủ lĩnh), bố cục cột, hạt giống trận chỉ hiện sau nút "i" (Chi tiết kỹ thuật); tên hệ tiếng Việt từ `src/content/elements.ts`; bỏ "tạm alpha", "(số tạm)", "tick", mã màn; Tổ Đội có thẻ nhân vật chính và nhãn "Trong đội"; nút "Về sảnh" cùng góc trên phải ở mọi màn (`Home.tsx`); sảnh: icon chức năng phủ lên 4 thẻ hàng dưới, Lv dưới khung avatar, tên game hiện ở điện thoại, thanh dưới cách mép; Tiên Nô căn giữa, khung co theo nội dung; ô nhập tên kiểu chàm-vàng; kịch bản chụp thêm sảnh sau xóa save. `npm run qa` (scripts/qa.mjs + dom-scan.mjs, quét DOM mọi ảnh chụp): 0 vi phạm ở 1920x1080, 1280x720, 844x390. Còn thiếu điều (c): Kiểm định độc lập chưa xem ảnh. |
| VS-13 | done | Sửa giao diện sau Kiểm định lần hai (8 mục). Xong 2026-11-14: (1) thẻ Tiên Nô có `.win` = cửa sổ trong của khung (đo từ PNG khung theo độ hiếm, UR hẹp hơn), dải chữ cách cửa sổ 10 px sân khấu, R/SR/SSR và icon hệ nằm trong cửa sổ, hào quang UR nằm trong hộp thẻ; danh xưng tách 2 dòng (thế lực / vai trò), tên tối đa 2 dòng; (2) quay 10 ở điện thoại: lớp phủ nằm ngoài màn cuộn nên chỉ một vùng cuộn (lưới), Đóng ở đầu cửa sổ, thẻ 150x227; (3) Thí Luyện: nút Tạm dừng/Tiếp tục và thanh tua trận, `08-tran-giua` chụp thật giữa trận (dừng, tua tới tick giữa, kiểm chưa có kết quả); chữ nổi đặt cạnh đơn vị (điện thoại: trên huy chương), biến mất 3 tick sau khi đơn vị chết và khi trận kết thúc (`replay.ts`, có test); huy chương nhấp nhô và viền sáng màu hệ khi hành động; điện thoại xem trước mỗi người một dòng, đủ 6 hàng không cần cuộn; nút vô hiệu hóa chữ xám sáng đọc được; (4) Tiên Nô 5 cột cố định, Tổ Đội 6 cột cùng bề ngang hàng đội, hàng cuối căn trái, khung co theo lưới, danh sách Tổ Đội hiện trọn một hàng và cuộn bắt theo hàng kèm gợi ý; (5) "Số bản đã có: N" (bản đầu là 1) ở hồ sơ, thẻ ghi "N bản · trần +M"; "Vô hệ" thay "Hệ Vô hệ" (`elementLabel`); khung huy hiệu hồ sơ cao theo cột chữ; (6) ô tiền có nhãn Linh Thạch / Tiên Ngọc / Xu (đọc từ ID tiền tệ) và tooltip; bảng tên viền tối đậm hơn; (7) Cài Đặt báo "Đã xóa save" sau khi xóa, `13-sau-xoa` đúng trạng thái; ba nút một hàng cách đều; (8) điện thoại: avatar với Lv bên dưới, tên game / tên · cảnh giới / Linh Lực ba dòng, thanh dưới cao 70 cách mép, icon 32 vùng chạm >= 52. `dom-scan.mjs`: cỡ chữ theo tỉ lệ thật của từng phần tử (mọi transform), thêm kiểm chữ sát viền khung thẻ, chữ sát mép thẻ/hàng/cửa sổ (< 4 px), cuộn lồng nhau (đã thử đột biến: bắt được). `playthrough.mjs` bỏ race nút Bỏ qua. `npm test` 48 xanh, build xanh, `npm run qa` 0 vi phạm ở 1920x1080, 1280x720, 844x390; ảnh ở `/tmp/vgtt-qa-after2/`. Chưa làm: điều (c) Kiểm định độc lập chưa xem bộ ảnh mới; ở điện thoại vài thế lực dài (Thanh Vân Tông) xuống 2 dòng, danh xưng thành 3 dòng; huy hiệu MỚI/Đã vào đội vẫn che một phần huy hiệu hệ (chờ chân dung thật). |

## Kết quả VS-11 (2026-11-14, nhánh feature/vertical-slice, số alpha-temporary)

Đã làm: merge origin/main, sinh lại `tien_no.json` (Tần Nguyệt Dao R); `gacha.json` N 0, R 58, SR 30, SSR 10, UR 2, pity SR+ 10, UR 50, 10 thẻ; `balance.json` hệ số 1.0/1.15/1.25/1.4/1.55, maxLevel 30, capBonus R 2 SR 2 SSR 4 UR 6, realms bỏ Nguyên Anh (ghi `realmsComingSoon`), validate maxLevel phải có nhãn cảnh giới; save v4 (rarity Tiên Nô theo id, cấp quá 30 hạ về 30, nhân vật chính giữ N). Sim sửa: người chơi mẫu thua khi cày tầng cũ thì xuống tầng thấp hơn (trước đây cày mãi một tầng thua tới hết 600 trận), hết số trận tính là kẹt; đo thêm linh thạch dư, thắng ngay lần đầu, số hạt giống thua.

Đo 40 hạt giống (`src/sim/climb.test.ts`). Từng thay đổi đặt riêng lên nền sau merge, rồi cả gói:

| Cấu hình | Kẹt | Qua 20 | Cấp chính | Thẻ | Tiên Nô | LT dư | UR: t16-20 thắng lần đầu | UR: thua >=1 |
|---|---|---|---|---|---|---|---|---|
| Gốc trước merge (Tần N) | 2 (t10) | 38/40 | 13.5 | 13.6 | 7.4 | 16% | 100% | 0% |
| Nền sau merge (Tần R) | 0 | 40/40 | 13.2 | 14.0 | 8.8 | 18% | 100% | 0% |
| + chỉ Gacha mới | 0 | 40/40 | 13.5 | 14.0 | 8.1 | 17% | 100% | 0% |
| + chỉ hệ số hiếm | 0 | 40/40 | 13.6 | 14.0 | 8.8 | 16% | 94% | 30% |
| + chỉ trần 30, capBonus | 0 | 40/40 | 13.2 | 14.0 | 8.8 | 18% | 100% | 0% |
| + chỉ thưởng 40+25 | 0 | 40/40 | 13.6 | 14.0 | 8.8 | 13% | 100% | 0% |
| + chỉ levelPerFloor 1.4 | 0 | 40/40 | 13.5 | 14.0 | 8.8 | 17% | 100% | 3% |
| Cả gói, levelPerFloor 1.4 | 0 | 40/40 | 14.3 | 14.0 | 8.1 | 12% | 95% | 38% |
| Cả gói, levelPerFloor 1.3 | 0 | 40/40 | 13.9 | 14.0 | 8.1 | 13% | 100% | 3% |
| Cả gói, 1.6 | 5 (t15-20) | 35/40 | 15.1 | 13.6 | 8.1 | 10% | 60% | 100% |
| Cả gói, 1.6, EXP +30% | 0 | 40/40 | 16.1 | 14.0 | 8.1 | 11% | 85% | 73% |
| Cả gói, 1.6, linh thạch +30% | 1 (t18) | 39/40 | 15.2 | 13.9 | 8.1 | 10% | 67% | 88% |
| **Chốt: cả gói, 1.6, bossMult 1.4, linh thạch +10% (44 + 28/tầng)** | **0** | **40/40** | **15.3 (13-20)** | **14.0** | **8.1** | **10%** | **66%** | **98%** |

Tầng 1-2 thắng 100% ở mọi cấu hình. Số chốt: levelPerFloor 1.6 (1.4 và 1.3 để đội toàn UR thắng ngay 95-100%, không đạt), bossMult 1.4, linh thạch base 44 perFloor 28 (+10%, trong ±30%), EXP giữ 30 + 20. Không đổi giá tu luyện, không đổi công thức trận; nguồn tiền vẫn hữu hạn (thưởng lặp giảm dần, hết sau 5 lần; thẻ chỉ lần đầu).

Độ hiếm khác nhau (`src/sim/rarity.test.ts`, cấp 15, 5 Tiên Nô cùng bậc, 200 trận mỗi ô): sức mạnh hiệu dụng (máu × công × tốc) R→SR 1.18, SR→SSR 1.25, SSR→UR 1.22 (đều >=1.15). Tỉ lệ thắng: tầng 13 R 69%, SR trở lên 100%; tầng 14 R 3%, SR 97%; tầng 15 SR 11%, SSR 95%; tầng 17 SSR 86%, UR 100%; tầng 18 SSR 1%, UR 100%; tầng 19 UR 60%; tầng 20 UR 16%. Tăng đơn điệu, chênh ở tầng có thắng bại đều >=8 điểm. Giữ bộ hệ số nén, không cần nới.

Chưa đạt: cấp chính ở tầng 20 trung bình 15.3 (13-20), tiêu chí 18-22. Trong khoảng cho phép không với tới (EXP +30% cho 16.1 nhưng đội toàn UR thắng ngay 85%). Muốn 18-22 cần đổi giá tu luyện hoặc EXP vượt ±30%: việc VS-L3. Test climb đang giữ dải 14-22 (ghi `shortcut`). Rủi ro: vùng số nhạy, linh thạch +5% hay +15% đã làm 4 hạt giống kẹt hoặc đội UR thắng ngay 72%; 40 hạt giống chưa đủ coi là ổn định.

## Sửa sảnh icon (Chủ tịch bảo 2026-11-14)
| # | Trạng thái | Việc |
|---|---|---|
| FIX-LOBBY | done | Sảnh: nút tròn 64 thành 88 (sân khấu 1600x900), icon chiếm 70% nút; sáu icon thanh dưới 84 thành 76 hiển thị đúng phần vẽ (trước đây lệch do viền trong suốt), thanh dưới cắt đúng khung vẽ; bảng tên, thanh Linh Lực có hàng riêng, ô tiền cao 56. Màn Tiên Nô: thẻ 190x288, kết quả quay hiện cửa sổ lớn, nền chân dung gradient theo hệ, số bảo đảm lấy từ `gacha.json`, nút "Về sảnh", nút Quay có chi phí. Công cụ mới `src/ui/Icon.tsx` + `iconBox.ts` (bbox alpha sinh bằng Python, không sửa ảnh gốc). |

## Nghiệm thu bản chơi thử (2026-11-14, kiểm định độc lập lần ba)
Kiểm định (38 ảnh) và Giám đốc Chất lượng (26 ảnh): ĐẠT có điều kiện, không còn lỗi cao hoặc trung. `npm test` 48, `npm run build`, `npm run qa` 0 vi phạm ở 3 khổ (Tổng giám đốc chạy lại độc lập). Bản chơi thử: `cd ~/wt/vgtt-vs && npm run dev`.
| # | Trạng thái | Việc |
|---|---|---|
| VS-14 | done | Lỗi thấp tồn, xong 2026-11-14: (1) thẻ Tiên Nô: "MỚI" lên hàng trên cạnh icon hệ, "Đã vào đội"/số bản một hàng riêng trên emblem, emblem hạ xuống 37% và nhỏ lại 26% (`Card.tsx`, `roster.css`), không còn đè; (2) chữ sát thương trong trận: nằm trên viên đậm, ngang thanh máu, cách hàng 16 px, giữ rõ 70% thời gian rồi mới mờ; điện thoại: góc phải hàng, không đè huy chương (`trial.css`, `compact-screens.css`); (3) khung "Tiên Nô đã có" hạ 190 thành 206, cách nút Quay 1/Quay 10 khoảng 16 px; (4) Thí Luyện trước trận: bảng tối đa 1200 px giữa màn, HP sát phải hàng; (5) Roster: số cột cân theo số thẻ, tối đa 5 (6 = 3+3, 7 = 4+3, 8 = 4+4). Thêm: điện thoại 667x375 trước đây có vi phạm (tên dài tràn hàng trong trận, HP chồng chữ ở bảng trước trận): cột `minmax(0, 1fr)` cho tên cắt "…" (có title), dom-scan đo chữ "…" trong hộp của nó và bỏ mép trên/dưới ở hộp đang cuộn dọc. Kiểm: `npm test` 48, `npm run build`, `npm run qa` 0 vi phạm 3 khổ, playthrough 667x375 ba lượt 0 vi phạm; ảnh `/tmp/vgtt-qa-after3/`. Chưa làm: kiểm định độc lập (kiem-dinh + gd-chat-luong) chưa xem ảnh; 667x375 chưa có trong `npm run qa`. |
| LOBBY-CARDS | done | Sửa bố cục thẻ chức năng (Chủ tịch báo "bên phải bố trí không đều", 2026-11-14). Nguyên nhân: hai bộ ảnh SHEET.FEATURE_CARDS và _2 vẽ thân khung ở chỗ và cỡ khác nhau trong ảnh 768x512 mà CSS dùng một phép cắt chung, nên hàng 3-4 lệch, dính nhau. Sửa: mỗi thẻ đặt đúng thân khung của nó lên nút (`CARD_BODY`, `cardFit` trong `menu.ts`), lưới 2x4 264x120, khe 16 cả ngang lẫn dọc, lề phải thẳng mép vẽ nút tròn (19 px), hàng cuối cách thanh dưới 30 px; điện thoại 4x2 58 px, khe 8, cách thanh dưới 8. Thanh dưới: 6 cột bằng nhau nên icon cách đều (trước lệch 138-170 px). `dom-scan.mjs` thêm kiểm lưới sảnh (thẻ, nút trái, nút trên, icon thanh dưới: cùng cỡ, cùng bước, khe ngang = khe dọc, lề phải, cách thanh dưới, sai số 1 px). Hàng 3-4 bị giãn dọc khoảng 4%, hàng 1-2 nén 2% để thân khung cùng cỡ (không dùng object-fit: cover vì cắt mất viền khung). Chưa làm: kiểm định độc lập chưa xem ảnh. |
| ĐH-1 | ask-codex | Cần đồ họa: cảnh chiến đấu Thí Luyện hiện chỉ là hàng huy chương, thanh máu và chữ "VS". Cần sprite pixel nhân vật, hiệu ứng chiêu và quái pixel (Thí Luyện dùng pixel theo luật). Chờ Phó chủ tịch và Cố vấn chốt hướng công cụ pixel. |
| ĐH-2 | blocked | VS-10: ảnh chân dung theo ID khi ảnh nhân vật đã duyệt (xem `assets/characters/`). |
