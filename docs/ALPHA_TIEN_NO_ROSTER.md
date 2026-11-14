# 10 Tiên Nô đầu tiên — Alpha roster

> Định hướng nội dung ban đầu, 2026-11-13. Cả 10 đều là nữ. Tiên Nô nam: Coming Soon. Nhân vật chính là người chơi, không thuộc danh sách triệu hồi.

| Tiên Nô | Thân phận | Hệ | Cơ chế chiến đấu | Vai trò ngoài chiến đấu | Độ hiếm (đề xuất alpha) |
|---|---|---|---|---|---|
| Lạc Thanh Y | Thánh nữ Thanh Vân Tông | Mộc | Hồi máu, thanh tẩy, bảo vệ | Hỗ trợ trị thương, sự kiện tông môn | SR |
| Mộ Dung Tuyết | Kiếm tiên Bắc Vực | Băng | Kiếm khí liên hoàn, đóng băng, kết liễu | Phát hiện kiếm ý, thử thách kiếm đạo | SSR |
| Diễm Vô Tâm | Ma nữ U Minh Cung | Hỏa | Hiến tế HP, hút sinh lực | Mở tuyến sự kiện ma đạo | SSR |
| Bạch Linh Nhi | Hồ yêu Cửu Vĩ | Huyễn | Phân thân, mê hoặc, đánh lạc hướng | Nhận biết ảo cảnh | R |
| Tần Nguyệt Dao | Sát thủ Vô Ảnh Lâu | Ám | Ẩn thân, đánh dấu, ám sát tuyến sau | Trinh sát, phát hiện phục kích | N |
| Liễu Như Yên | Đan sư Dược Vương Cốc | Mộc | Đan dược tức thời, độc, tăng ích | Luyện đan, nhận biết dược liệu | R |
| Hàn Nguyệt Sương | Nữ tướng Bắc Minh | Lôi | Tích điện, phản kích, sát thương lan | Chỉ huy, xử lý sự kiện quân trận | SR |
| Sở Hồng Liên | Công chúa Hỏa Quốc | Hỏa | Đấu sĩ cận chiến, tăng sức mạnh theo thời gian | Sự kiện vương triều | R |
| Vân Mộng Dao | Trận pháp sư Thiên Cơ Các | Thủy | Dựng trận, dịch chuyển vị trí, khống chế vùng | Giải trận, phát hiện cơ quan | SR |
| Cổ U Lan | Người giữ mộ Tiên Cổ | Thổ | Triệu hồi hộ vệ đá, kết giới, chống chịu | Khám phá di tích, giải bí ẩn cổ mộ | UR |

## Luật thiết kế
1. Mỗi Tiên Nô phải có cơ chế chiến đấu khác biệt, không chỉ là bộ chỉ số khác.
2. Thân phận và chuyên môn ảnh hưởng đến khám phá Bí Cảnh, tương tác và cốt truyện.
3. Mỗi Tiên Nô có gương mặt nhận diện độc lập; khác tóc/trang phục không đủ. Không cười hở răng, môi khép.
4. Mỗi nhân vật cần chân dung và full-body bán hiện thực cho giao diện chung, sprite Pixel cho Thí Luyện/Bí Cảnh.
5. Tên, thân phận, hệ và bộ kỹ năng ở đây là đề xuất ban đầu, có thể chỉnh theo quyết định của chủ dự án trước khi sản xuất asset hàng loạt.
6. Đội Bí Cảnh mỗi người: nhân vật chính + tối đa 5 Tiên Nô = 6 mạng, chỉ một nhân vật hoạt động trên bản đồ.

## Độ hiếm, cấp bậc và tiềm năng (Chủ tịch chốt hướng 2026-11-14, số là tạm alpha)
Tách ba khái niệm:
- **Độ hiếm** (N, R, SR, SSR, UR): khó quay đến đâu, quyết định viền thẻ, hệ số tiềm năng và bộ chiêu.
- **Cấp bậc thân phận**: danh xưng riêng của từng người trong thế lực (`title` trong `data/tien_no_appearance.json`), chỉ để hiển thị và cốt truyện. UR kiểu lão tổ là TIỀM NĂNG: cùng cấp thì mạnh hơn đệ tử cùng cấp, không phải cấp cao hơn.
- **Cấp (cảnh giới)**: sức mạnh hiện tại, tăng được. Khi quay ra, Tiên Nô có cùng cấp với người chơi. Về lâu dài Tiên Nô có thể vượt cấp người chơi (trần cao hơn theo độ hiếm). Bản chơi đầu chỉ có số cấp, cảnh giới là nhãn đổi theo mốc.
Hệ số chỉ số mỗi cấp (tạm alpha, cần cân bằng bằng mô phỏng): N 1.0, R 1.15, SR 1.3, SSR 1.5, UR 1.75. UR cũng có bộ chiêu mạnh hơn và trần tiềm năng cao hơn. Cốt truyện UR: tu vi tụt nhưng đạo cơ và kinh nghiệm còn nguyên.
