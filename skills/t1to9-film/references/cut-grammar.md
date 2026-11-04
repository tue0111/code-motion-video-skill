# Lối cắt T1 to 9 (G2 cut map, G4 review)

Gốc của file này là gu của Tuệ, chốt sau v5→v7 *mùa hè cuối cấp*, và lối cắt của 古一 (soi trên `<PREV_FILM>/review/guyi/*_cuts.jpg` và ghi chép `<GUYI_NOTES>` §7, §9). Sách dùng để giải thích *vì sao*. Sách không đẻ ra con số "3–4 chỗ".

## Luật

1. **Nền là hard cut đúng phách.** Ý và ánh mắt đã nối được thì không cần gì thêm. Khi phải đánh đổi, cảm xúc và câu chuyện đứng trước nhịp; khớp phách không đủ lý do để làm mất một read (Murch, *In the Blink of an Eye*, page_label 16).
2. **Chỉ nhấn 3–4 chỗ cả phim, mỗi chỗ một chức năng:**

   | Dấu nhấn | Chức năng | Cách làm bằng code |
   |---|---|---|
   | Flash cháy sáng ra màu kem (không trắng tinh) | Đổi đoạn, vào drop | Đẩy pixel về màu kem kiểu (250, 244, 230) trong 2–4 khung, nhả ra mềm |
   | Flash CCD đóng băng, rồi thẻ ảnh rơi đúng phách | Motif chụp ảnh, ký ức | Đóng băng khung thật. Thẻ có viền/bóng **chỉ khi G2 đã duyệt** |
   | Hiện ra từ khung cháy trắng | Vào payoff | Mở dần từ kem về hình trong khoảng 0,3–0,6 s |
   | Outro tối dần rồi mờ dần | Kết, chữ ký | Giảm sáng, tăng blur, chữ ký T1 to 9 hiện trên nền đó |

3. **Whip chỉ dùng khi chuyển động trong shot dẫn tới nó** (người quay đầu, máy đang lia). Dựng theo kiểu dải A|B nối nhau rồi blur ngang và trượt. Đừng dùng `shift` với BORDER_REFLECT, vì sẽ ra bóng ma soi gương.
4. **Không dùng một kiểu chuyển cảnh cho mọi cú cắt.** v5 dùng lật trang ở mọi cut và đã hỏng. Đổi sang 6 kiểu khác nhau cũng hỏng (v4).
5. **Match cut và cắt giữa hành động** chỉ được khi hai shot có hành động khớp nhau. Phải tính từ lúc viết prompt i2v (pha mở và đóng), không phải chọn tên hiệu ứng lúc dựng (Katz, *Film Directing Shot by Shot*, page_label 197–198, 405; Bordwell & Thompson, *Film Art*, page_label 514).
6. **Nhịp không chia đều.** Cảnh rộng đang sống xen với chi tiết hoặc reaction, mỗi cái đủ lâu để nhận ra. Trước drop có thể rút dần 3 phách, 2 phách, 1 phách. Chỗ nào câu chuyện cần thở thì giữ (Reisz & Millar, page_label 85).
7. **Không có watermark trong phim.** Chữ ký chỉ ở outro.

## cuts.md: mẫu một dòng

```text
t=12.28  S7_3 → card(S7_3)   flash CCD + đóng băng   lý do: drop của nhạc + motif chụp ảnh   phách #27
t=4.90   S1_1 → S6_2         hard cut                 lý do: tiếng gọi, A ngoái lại
```

Đếm số dòng không phải hard cut. Quá 4 dòng thì bỏ bớt cái yếu nhất.

## Tra thêm khi cần

- film-library: `search("cut on action")`, `search("match cut")`, `search("rhythm editing pace")` trong topic EDITING, rồi `read_page` trước khi trích.
- VSC `motion` với `technique=transition` cho câu mô tả chuyển động máy giúp tạo tay cắt (CAM-117, CAM-115, CAM-120).
