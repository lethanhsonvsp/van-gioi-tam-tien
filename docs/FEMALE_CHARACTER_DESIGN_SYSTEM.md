# 📜 THƯ VIỆN THIẾT KẾ NHÂN VẬT NỮ
## Vạn Giới Tầm Tiên | Female Character Design System v1.0

> Nguồn chuẩn cho ngoại hình Tiên Nô nữ (chủ dự án lưu 2026-11-13). Hồ sơ từng nhân vật: `data/tien_no_appearance.json`; prompt sinh ra: `docs/CHAR_PROMPTS.md` (`node scripts/gen_char_prompts.mjs`). Luật kiểm duyệt: `docs/ART_QUALITY_RULES.md` (RULE-CHAR-002).

Mình đề xuất xây dựng một **hệ thống tạo ngoại hình Tiên Nô nữ từ 18–35 tuổi**, có thể sử dụng lâu dài cho hàng trăm nhân vật.

Mục tiêu quan trọng nhất: **Mỗi Tiên Nô phải có khuôn mặt, vóc dáng, thần thái và khí chất riêng. Không được tạo ra những nhân vật trông như chị em sinh đôi chỉ khác tóc và trang phục.**

Hệ thống chia thành 5 nhóm:

1. Cấu trúc khuôn mặt và giải phẫu.
2. Đặc điểm tuổi tác từ 18–35.
3. Dáng người và tỷ lệ cơ thể.
4. Khí chất, biểu cảm và phong thái.
5. Quy tắc phối hợp ngẫu nhiên để tạo nhân vật độc nhất.

---

# I. CẤU TRÚC KHUÔN MẶT

## 1. Dáng mặt (Face Shape)

| Mã | Kiểu mặt | Đặc điểm |
|---|---|---|
| FS01 | Trái xoan | Trán và hàm cân đối, đường nét mềm |
| FS02 | Tròn | Chiều dài gần chiều rộng, má đầy |
| FS03 | Vuông | Hàm rộng, góc hàm rõ |
| FS04 | Chữ nhật | Mặt dài, hàm tương đối rộng |
| FS05 | Trái tim | Trán rộng, cằm nhỏ |
| FS06 | Kim cương | Gò má rộng, trán và hàm hẹp |
| FS07 | Tam giác | Hàm rộng hơn trán |
| FS08 | Tam giác ngược | Trán rộng, hàm thuôn |
| FS09 | Mặt dài | Chiều dài nổi bật, đường nét thanh |
| FS10 | Quả lê | Má dưới và hàm đầy |
| FS11 | Trái xoan góc cạnh | Mặt oval nhưng xương hàm rõ |
| FS12 | Tròn góc cạnh | Má đầy nhưng cằm và hàm sắc nét |
| FS13 | Mặt nhỏ ngắn | Chiều dài mặt ngắn, ngũ quan tập trung |
| FS14 | Mặt rộng | Khoảng cách hai gò má lớn |
| FS15 | Mặt hẹp | Hai bên má thuôn, hàm nhỏ |
| FS16 | Mặt xương | Xương gò má và hàm nổi rõ |

**Quy tắc:** Không mặc định tất cả Tiên Nô đều có mặt trái xoan và cằm V-line.

---

## 2. Trán (Forehead)

| Mã | Kiểu trán |
|---|---|
| FH01 | Trán cao |
| FH02 | Trán thấp |
| FH03 | Trán rộng |
| FH04 | Trán hẹp |
| FH05 | Trán tròn |
| FH06 | Trán phẳng |
| FH07 | Trán hơi dô |
| FH08 | Trán dốc nhẹ |
| FH09 | Trán có đường chân tóc chữ M |
| FH10 | Trán có đường chân tóc hình cung |

Ngoài hình dạng, cần thay đổi **tỷ lệ trán so với phần giữa và phần dưới khuôn mặt**.

---

## 3. Đôi mắt (Eye Structure)

### Hình dạng mắt

| Mã | Kiểu mắt | Đặc điểm |
|---|---|---|
| EY01 | Mắt hạnh | Hai đầu thuôn, giữa mở vừa |
| EY02 | Mắt phượng | Dài, đuôi hơi nâng |
| EY03 | Mắt tròn | Độ mở lớn, tròng mắt lộ rõ |
| EY04 | Mắt hồ ly | Dài, hẹp, đuôi sắc |
| EY05 | Mắt nai | To, mềm, ánh nhìn hiền |
| EY06 | Mắt sâu | Hốc mắt rõ, ánh nhìn có chiều sâu |
| EY07 | Mắt một mí | Không có nếp mí trên rõ |
| EY08 | Mắt mí lót | Nếp mí nhỏ hoặc bị che |
| EY09 | Mắt hai mí | Nếp mí rõ |
| EY10 | Mắt mí sụp | Da mí trên che một phần mí |
| EY11 | Mắt xếch | Đuôi mắt cao hơn đầu mắt |
| EY12 | Mắt cụp | Đuôi mắt thấp hơn đầu mắt |
| EY13 | Mắt dài hẹp | Chiều ngang lớn, độ mở nhỏ |
| EY14 | Mắt to sâu | Hốc mắt sâu nhưng độ mở lớn |
| EY15 | Mắt tam giác mềm | Góc mắt rõ, mí trên tạo đường xiên |
| EY16 | Mắt bất đối xứng nhẹ | Hai mắt khác nhau rất nhỏ, tự nhiên |

### Các thông số mắt bổ sung

**Khoảng cách mắt:**
- Gần.
- Trung bình.
- Xa.

**Độ sâu hốc mắt:**
- Nông.
- Vừa.
- Sâu.

**Độ mở mắt:**
- Hẹp.
- Vừa.
- Rộng.

**Mí mắt:**
- Một mí.
- Mí lót.
- Hai mí mảnh.
- Hai mí sâu.
- Mí trên nặng.

**Mống mắt:**
- Nhỏ.
- Trung bình.
- Lớn.

**Màu mắt tiên hiệp:** Đen, nâu, hổ phách, xanh ngọc, xanh băng, tím, đỏ thẫm, vàng kim, bạc, dị sắc hai mắt.

Màu mắt chỉ là yếu tố phụ, không được dùng để thay thế sự khác biệt về hình dạng.

---

## 4. Lông mày (Eyebrows)

| Mã | Kiểu lông mày |
|---|---|
| BR01 | Lá liễu |
| BR02 | Ngang |
| BR03 | Cong nhẹ |
| BR04 | Cong cao |
| BR05 | Mày kiếm |
| BR06 | Mày xếch |
| BR07 | Mày cụp |
| BR08 | Mày rậm |
| BR09 | Mày mảnh |
| BR10 | Mày ngắn |
| BR11 | Mày dài |
| BR12 | Mày đuôi nhọn |
| BR13 | Mày góc cạnh |
| BR14 | Mày cong mềm |
| BR15 | Mày thẳng đậm |
| BR16 | Mày thưa tự nhiên |

Thông số bổ sung: độ dày, độ dài, khoảng cách với mắt, độ cong, vị trí đỉnh mày và khoảng cách giữa hai đầu mày.

---

## 5. Mũi (Nose)

### Hình dáng tổng thể

| Mã | Kiểu mũi |
|---|---|
| NS01 | Mũi thẳng |
| NS02 | Mũi cao thanh |
| NS03 | Mũi thấp mềm |
| NS04 | Mũi ngắn |
| NS05 | Mũi dài |
| NS06 | Mũi nhỏ |
| NS07 | Mũi rộng |
| NS08 | Mũi đầu tròn |
| NS09 | Mũi đầu nhọn |
| NS10 | Mũi hơi hếch |
| NS11 | Mũi đầu hơi rủ |
| NS12 | Mũi sống cong nhẹ |
| NS13 | Mũi sống gồ nhẹ |
| NS14 | Mũi cánh rộng |
| NS15 | Mũi cánh hẹp |
| NS16 | Mũi có đầu mũi đầy |

### Các bộ phận cần random độc lập

- Gốc mũi: thấp, trung bình, cao.
- Sống mũi: thẳng, lõm nhẹ, lồi nhẹ.
- Độ rộng sống mũi: hẹp, vừa, rộng.
- Đầu mũi: tròn, nhọn, đầy, nhỏ.
- Cánh mũi: hẹp, vừa, rộng.
- Lỗ mũi: tròn, bầu dục, hẹp.
- Góc mũi với môi: nhỏ, trung bình, lớn.

**Đặc biệt:** Ảnh chính diện và ảnh nghiêng phải thể hiện cùng một cấu trúc mũi.

---

# II. MIỆNG VÀ MÔI

Đây là phần cần thay đổi mạnh nhất so với các ảnh Tiên Nô trước đó.

## 6. Cấu trúc miệng (Mouth)

| Mã | Kiểu miệng | Đặc điểm |
|---|---|---|
| MT01 | Miệng nhỏ | Chiều ngang ngắn |
| MT02 | Miệng rộng | Hai khóe miệng cách xa |
| MT03 | Miệng ngang | Khóe miệng gần như thẳng |
| MT04 | Miệng cong nhẹ | Khóe miệng nâng rất nhẹ |
| MT05 | Miệng khóe trễ | Hai khóe hơi hướng xuống |
| MT06 | Miệng bất đối xứng | Một khóe cao hơn một chút |
| MT07 | Miệng thanh mảnh | Đường khép môi mỏng |
| MT08 | Miệng đầy đặn | Viền môi rõ, độ dày lớn |
| MT09 | Miệng có rãnh khóe rõ | Khóe miệng tạo nếp tự nhiên |
| MT10 | Miệng có nhân trung dài | Khoảng cách mũi–môi lớn |
| MT11 | Miệng có nhân trung ngắn | Khoảng cách mũi–môi nhỏ |
| MT12 | Miệng có đường cong chữ M | Đường môi trên có hai đỉnh rõ |

## 7. Hình dáng môi (Lip Shape)

| Mã | Kiểu môi |
|---|---|
| LP01 | Môi trên mỏng, môi dưới đầy |
| LP02 | Môi trên đầy, môi dưới mỏng |
| LP03 | Hai môi đều mỏng |
| LP04 | Hai môi đều đầy |
| LP05 | Môi trái tim |
| LP06 | Môi cung Cupid rõ |
| LP07 | Môi cung Cupid phẳng |
| LP08 | Môi trên hình chữ M |
| LP09 | Môi dưới tròn |
| LP10 | Môi dưới rộng |
| LP11 | Môi nhỏ chúm |
| LP12 | Môi ngang dài |
| LP13 | Môi có khóe sắc |
| LP14 | Môi có viền mềm |
| LP15 | Môi không đối xứng nhẹ |
| LP16 | Môi trên có rãnh giữa rõ |

### Quy chuẩn biểu cảm miệng

Tất cả Tiên Nô phải:

- Không cười hở răng.
- Không để lộ răng khi tạo dáng.
- Không mặc định mọi nhân vật đều có môi căng mọng.
- Không dùng cùng một đường cong môi cho toàn bộ nhân vật.

Có thể sử dụng môi khép với các biểu cảm: lạnh lùng, mỉm cười nhẹ, kiêu ngạo, trầm tư, nghiêm nghị, buồn bã hoặc bí ẩn.

---

# III. CẤU TRÚC XƯƠNG MẶT

## 8. Má và gò má

| Mã | Kiểu má |
|---|---|
| CK01 | Má tròn đầy |
| CK02 | Má thon |
| CK03 | Má hóp nhẹ |
| CK04 | Gò má cao |
| CK05 | Gò má thấp |
| CK06 | Gò má rộng |
| CK07 | Gò má hẹp |
| CK08 | Má bầu |
| CK09 | Má góc cạnh |
| CK10 | Má mềm tự nhiên |
| CK11 | Má dưới đầy |
| CK12 | Gò má nổi rõ |

## 9. Cằm và hàm

| Mã | Kiểu cằm |
|---|---|
| CH01 | Cằm tròn |
| CH02 | Cằm vuông |
| CH03 | Cằm nhọn vừa |
| CH04 | Cằm ngắn |
| CH05 | Cằm dài |
| CH06 | Cằm rộng |
| CH07 | Cằm hẹp |
| CH08 | Cằm chẻ nhẹ |
| CH09 | Cằm đầy |
| CH10 | Cằm hơi nhô |
| CH11 | Cằm hơi lùi |
| CH12 | Cằm góc cạnh |

**Hàm** được random riêng: hàm rộng, hàm hẹp, góc hàm sắc, góc hàm tròn, hàm thon, hàm vuông mềm.

Không nên để tất cả nhân vật có cằm nhọn và hàm V-line.

## 10. Tai

| Mã | Kiểu tai |
|---|---|
| ER01 | Tai nhỏ |
| ER02 | Tai lớn |
| ER03 | Tai tròn |
| ER04 | Tai dài |
| ER05 | Tai áp sát |
| ER06 | Tai vểnh |
| ER07 | Dái tai liền |
| ER08 | Dái tai rời |
| ER09 | Vành tai dày |
| ER10 | Vành tai mỏng |
| ER11 | Tai nhọn yêu tộc |
| ER12 | Tai dài linh tộc |

Tai yêu tộc, linh tộc là đặc điểm giả tưởng, không áp dụng mặc định cho người thường.

---

# IV. TÓC VÀ ĐƯỜNG CHÂN TÓC

## 11. Cấu trúc tóc

| Nhóm | Biến thể |
|---|---|
| Độ dài | Rất ngắn, ngang cằm, ngang vai, ngang lưng, ngang eo, qua hông |
| Kết cấu | Thẳng, gợn nhẹ, sóng lớn, xoăn lọn, xoăn nhỏ |
| Độ dày | Mỏng, vừa, dày, rất dày |
| Độ phồng | Ép sát, tự nhiên, phồng chân tóc, phồng toàn bộ |
| Chân tóc | Tròn, chữ M, góc cạnh, đường chân tóc thấp |
| Tóc mái | Không mái, mái bằng, mái thưa, mái lệch, mái rèm |
| Ngôi tóc | Giữa, lệch trái, lệch phải |
| Kiểu búi | Búi cao, búi thấp, búi đôi, búi nửa đầu |
| Kiểu buộc | Đuôi ngựa cao, thấp, buộc nửa, tóc tết |
| Trang trí | Trâm ngọc, kim quan, hoa, dây lụa, chuỗi ngọc, linh vũ |

Màu tóc có thể gồm đen, nâu, bạc, trắng, xanh đen, tím đen, đỏ rượu, vàng nhạt hoặc màu giả tưởng theo huyết mạch.

**Quan trọng:** Tóc là lớp nhận diện thứ hai. Cấu trúc mặt mới là lớp nhận diện thứ nhất.

---

# V. ĐỘ TUỔI NGOẠI HÌNH: 18–35

Tuổi ở đây là **tuổi ngoại hình**, không nhất thiết bằng tuổi thật của tu sĩ trong thế giới tiên hiệp.

| Nhóm | Tuổi | Đặc điểm thiết kế |
|---|---|---|
| AGE01 | 18–20 | Nét mặt trẻ trưởng thành, má có thể đầy, đường nét mềm |
| AGE02 | 21–23 | Ngũ quan rõ hơn, nhiều lựa chọn phong thái |
| AGE03 | 24–26 | Gương mặt trưởng thành, tỷ lệ ổn định |
| AGE04 | 27–29 | Khí chất chín chắn, có thể nhấn mạnh đường nét xương |
| AGE05 | 30–32 | Phong thái từng trải, biểu cảm điềm tĩnh |
| AGE06 | 33–35 | Trưởng thành rõ nét, có thể có nếp biểu cảm nhẹ |

Đây là các **định hướng mỹ thuật**, không phải quy luật sinh học cố định. Một người 20 tuổi vẫn có thể có gò má sắc, và người 35 tuổi vẫn có thể có má đầy.

### Những gì không nên làm

Không biến toàn bộ Tiên Nô thành những cô gái có ngoại hình 18–20 tuổi.

Ví dụ, một nữ trưởng lão có ngoại hình 34 tuổi, gương mặt dài, gò má cao, môi mỏng và thần thái uy nghiêm sẽ tạo sự khác biệt rõ với một thánh nữ 22 tuổi có mặt tròn, mắt hạnh và má đầy.

---

# VI. DÁNG NGƯỜI

## 12. Chiều cao

Đề xuất phạm vi thiết kế cho Tiên Nô nữ trưởng thành:

| Mã | Chiều cao |
|---|---|
| HT01 | 150–154 cm |
| HT02 | 155–159 cm |
| HT03 | 160–164 cm |
| HT04 | 165–169 cm |
| HT05 | 170–174 cm |
| HT06 | 175–179 cm |
| HT07 | 180–185 cm |

Đây là phạm vi phục vụ thiết kế, không phải giới hạn bắt buộc.

## 13. Kiểu vóc dáng

| Mã | Dáng người | Đặc điểm |
|---|---|---|
| BD01 | Nhỏ nhắn | Khung xương nhỏ, vóc dáng gọn |
| BD02 | Mảnh mai | Vai hẹp, tay chân thanh |
| BD03 | Thanh thoát | Tỷ lệ cân đối, đường nét mềm |
| BD04 | Đồng hồ cát | Eo rõ, vai và hông tương đối cân bằng |
| BD05 | Quả lê | Hông rộng hơn vai |
| BD06 | Tam giác ngược | Vai rộng hơn hông |
| BD07 | Chữ nhật | Vai, eo và hông ít chênh lệch |
| BD08 | Đầy đặn | Đường nét cơ thể tròn và mềm |
| BD09 | Săn chắc | Cơ bắp rõ vừa phải |
| BD10 | Võ giả | Vai, lưng, tay và chân phát triển |
| BD11 | Cao gầy | Tay chân dài, khung người hẹp |
| BD12 | Cao cân đối | Tỷ lệ dài, vóc dáng vững |
| BD13 | Thấp săn chắc | Trọng tâm thấp, cơ bắp phát triển |
| BD14 | Uy nghiêm | Dáng đứng thẳng, vai mở, chuyển động chắc chắn |
| BD15 | Mềm mại | Đường nét cơ thể và chuyển động uyển chuyển |
| BD16 | Thể thao | Cơ thể linh hoạt, sức bền và tốc độ được thể hiện qua tư thế |

### Các thông số cơ thể cần tách riêng

- Chiều rộng vai.
- Độ dốc vai.
- Chiều dài cổ.
- Chiều dài thân trên.
- Chiều dài chân.
- Chiều dài cánh tay.
- Kích thước bàn tay.
- Độ rộng khung chậu.
- Đường eo.
- Độ phát triển cơ bắp.
- Tỷ lệ mỡ cơ thể.
- Tư thế đứng.
- Phân bố trọng tâm.

Những thông số này giúp nhân vật khác nhau ngay cả khi mặc cùng một loại trang phục.

---

# VII. KHÍ CHẤT VÀ THẦN THÁI

## 14. Thư viện 24 kiểu khí chất

| Mã | Khí chất | Thể hiện |
|---|---|---|
| AU01 | Dịu dàng | Ánh mắt mềm, cử chỉ nhẹ |
| AU02 | Thanh cao | Tư thế ngay ngắn, biểu cảm kín đáo |
| AU03 | Lạnh lùng | Ít biểu cảm, ánh nhìn sắc |
| AU04 | Kiêu ngạo | Cằm hơi nâng, ánh nhìn tự tin |
| AU05 | Quyến rũ | Ánh mắt sâu, cử chỉ có chủ đích |
| AU06 | Bí ẩn | Biểu cảm khó đoán |
| AU07 | Uy nghiêm | Dáng đứng vững, ánh nhìn trực diện |
| AU08 | Trầm tĩnh | Cử động tiết chế |
| AU09 | Tinh nghịch | Ánh mắt linh hoạt, khóe môi hơi cong |
| AU10 | Ngây thơ | Biểu cảm cởi mở, tự nhiên |
| AU11 | Từng trải | Ánh nhìn điềm đạm, ít phản ứng thừa |
| AU12 | Sát khí | Tư thế sẵn sàng chiến đấu |
| AU13 | Thánh khiết | Phong thái trang nghiêm, nhẹ nhàng |
| AU14 | Ma mị | Biểu cảm khó lường, chuyển động mềm |
| AU15 | Hoang dã | Tư thế tự do, phản xạ nhanh |
| AU16 | Cao quý | Cử chỉ chuẩn mực, tự chủ |
| AU17 | U buồn | Ánh mắt trầm, biểu cảm tiết chế |
| AU18 | Kiên nghị | Hàm và ánh nhìn vững vàng |
| AU19 | Thông tuệ | Ánh nhìn quan sát, phong thái tập trung |
| AU20 | Lười biếng | Tư thế thư giãn, chuyển động chậm |
| AU21 | Nóng nảy | Cử động nhanh, ánh nhìn mạnh |
| AU22 | Nhân từ | Biểu cảm ấm áp, dễ gần |
| AU23 | Tàn nhẫn | Biểu cảm lạnh, hành động quyết đoán |
| AU24 | Cô độc | Tư thế khép kín, ít giao tiếp |

Khí chất không nhất thiết quyết định cấu trúc khuôn mặt. Một Tiên Nô có mặt tròn vẫn có thể uy nghiêm hoặc tàn nhẫn.

---

# VIII. GÓC MẶT VÀ GÓC MÁY

Để tránh tình trạng mọi nhân vật đều nhìn nghiêng 3/4 giống nhau, mình đề xuất phân biệt **góc quay đầu** và **góc máy**.

### Góc quay đầu

| Mã | Góc |
|---|---|
| ANG00 | Chính diện 0° |
| ANG15 | Nghiêng 15° |
| ANG30 | Nghiêng 30° |
| ANG45 | Nghiêng 45° |
| ANG60 | Nghiêng 60° |
| ANG75 | Nghiêng 75° |
| ANG90 | Nghiêng hoàn toàn 90° |

Mỗi góc có biến thể quay trái và quay phải.

### Góc máy

- Ngang tầm mắt.
- Hơi từ trên xuống.
- Hơi từ dưới lên.
- Góc thấp thể hiện uy quyền.
- Góc cao thể hiện sự thanh thoát.
- Góc ngang gần chính diện để kiểm tra cấu trúc mặt.

**Lưu ý:** Không thể đánh giá hai nhân vật có trùng khuôn mặt hay không chỉ bằng ảnh ở các góc khác nhau.

Vì vậy, mỗi Tiên Nô cần có một **ảnh nhận diện chính diện, góc máy ngang mắt**, trước khi tạo ảnh thẻ nghệ thuật.

---

# IX. RANDOM 10 TIÊN NÔ ĐẦU TIÊN

Mình đề xuất bộ tổ hợp mới, cố ý tạo khác biệt rõ về tuổi ngoại hình, cấu trúc mặt, miệng, vóc dáng và khí chất.

| Tiên Nô | Tuổi ngoại hình | Dáng mặt | Mắt | Mũi | Miệng/môi | Dáng người | Khí chất |
|---|---:|---|---|---|---|---|---|
| **Lạc Thanh Y** | 23 | Tròn mềm | Mắt hạnh | Mũi nhỏ, đầu tròn | Miệng nhỏ, môi trên mỏng | Thanh thoát | Dịu dàng |
| **Mộ Dung Tuyết** | 29 | Kim cương | Mắt dài hẹp | Mũi cao thẳng | Miệng ngang, hai môi mỏng | Cao gầy | Lạnh lùng |
| **Diễm Vô Tâm** | 32 | Vuông mềm | Mắt sâu | Sống mũi hơi cong | Miệng rộng, môi dưới đầy | Đồng hồ cát | Ma mị |
| **Bạch Linh Nhi** | 20 | Trái tim | Mắt tròn | Mũi ngắn hơi hếch | Miệng nhỏ, môi trái tim | Nhỏ nhắn | Tinh nghịch |
| **Tần Nguyệt Dao** | 27 | Chữ nhật hẹp | Mắt mí lót | Mũi dài, đầu nhọn | Miệng rộng, khóe trễ | Săn chắc | Bí ẩn |
| **Liễu Như Yên** | 35 | Quả lê | Mắt cụp | Mũi thấp mềm | Môi đầy, cung Cupid phẳng | Đầy đặn | Từng trải |
| **Hàn Nguyệt Sương** | 30 | Mặt góc cạnh | Mắt phượng | Mũi cao, cánh hẹp | Miệng ngang dài, môi mỏng | Võ giả | Uy nghiêm |
| **Sở Hồng Liên** | 25 | Tam giác ngược | Mắt xếch | Mũi thẳng, đầu đầy | Môi trên đầy, khóe sắc | Cao cân đối | Kiêu ngạo |
| **Vân Mộng Dao** | 26 | Mặt dài | Mắt một mí | Mũi nhỏ, sống thấp | Miệng nhỏ, môi ngang | Mảnh mai | Thông tuệ |
| **Cổ U Lan** | 34 | Mặt rộng, gò má cao | Mắt sâu, mí nặng | Mũi dài, đầu tròn | Miệng rộng, môi mỏng | Cao săn chắc | Trầm tĩnh |

### Màu nền theo hệ

Giữ quy tắc đã chốt:

- Mộc: Xanh lục.
- Băng: Xanh băng.
- Hỏa: Đỏ cam.
- Huyễn: Tím hồng.
- Ám: Tím đen.
- Lôi: Xanh điện.
- Thủy: Xanh lam.
- Thổ: Vàng đất.

Màu nền, tóc và trang phục không được tính là bằng chứng cho sự khác biệt khuôn mặt.

---

# X. HỆ THỐNG MÃ HÓA NHÂN VẬT

Để ChatGPT và Claude Code cùng sử dụng, mình đề xuất một cấu trúc TypeScript:

```typescript
interface FemaleCharacterAppearance {
  characterId: string;
  name: string;

  apparentAge: number; // 18–35

  face: {
    shape: string;
    forehead: string;
    cheekbones: string;
    cheeks: string;
    jaw: string;
    chin: string;
  };

  eyes: {
    shape: string;
    spacing: string;
    depth: string;
    eyelid: string;
    irisColor: string;
  };

  eyebrows: {
    shape: string;
    thickness: string;
    angle: string;
  };

  nose: {
    bridge: string;
    length: string;
    tip: string;
    nostrils: string;
  };

  mouth: {
    width: string;
    cornerShape: string;
    philtrumLength: string;
    upperLip: string;
    lowerLip: string;
    cupidBow: string;
    teethVisible: false;
  };

  ears: {
    shape: string;
    size: string;
    lobe: string;
  };

  hair: {
    length: string;
    texture: string;
    style: string;
    color: string;
  };

  body: {
    heightCm: number;
    bodyType: string;
    shoulderWidth: string;
    waistShape: string;
    hipWidth: string;
    muscleDefinition: string;
  };

  personality: {
    aura: string;
    expression: string;
    posture: string;
  };

  portrait: {
    headAngle: number;
    cameraAngle: string;
    elementBackground: string;
  };
}
```

Khi tạo một Tiên Nô mới, hệ thống sẽ chọn các đặc điểm từ thư viện, kiểm tra tổ hợp với những nhân vật đã tồn tại, rồi tạo hồ sơ ngoại hình riêng.

**Random không nên hoàn toàn ngẫu nhiên.** Cần ràng buộc về giải phẫu, thân phận và tính nhất quán. Ví dụ, nữ tướng có thể có vóc dáng võ giả và phong thái uy nghiêm, nhưng không bắt buộc phải có mặt vuông hoặc môi mỏng.

---

## ⭐ Quy chuẩn cuối cùng cho Vạn Giới Tầm Tiên

Mình đề xuất áp dụng **3 lớp nhận diện độc lập**:

**Lớp 1: Nhận diện giải phẫu.** Khuôn mặt, mắt, mũi, miệng, môi, hàm và gò má phải khác nhau ngay cả khi che tóc.

**Lớp 2: Nhận diện hình thể.** Chiều cao, tỷ lệ vai–eo–hông, độ dài chân tay, cơ bắp và tư thế phải khác biệt.

**Lớp 3: Nhận diện nhân vật.** Khí chất, trang phục, thân phận, màu hệ và phong cách chiến đấu tạo nên cá tính.

**Tiêu chuẩn duyệt:** Mỗi Tiên Nô phải có ảnh chính diện để kiểm tra khuôn mặt, ảnh toàn thân để kiểm tra vóc dáng và ảnh thẻ nghệ thuật để thể hiện khí chất. Chỉ sau khi ba ảnh nhất quán mới tạo phiên bản Pixel cho Thí Luyện và Bí Cảnh.

Với hệ thống này, chúng ta có thể xây dựng hàng trăm Tiên Nô có bản sắc riêng, thay vì một khuôn mặt được nhân bản hàng trăm lần.
