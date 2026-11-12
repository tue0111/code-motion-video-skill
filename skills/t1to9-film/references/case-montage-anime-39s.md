# Case: phim montage anime 2D, 39 s, 36 shot (rà soát 2026-10-07, bản dựng v4)

Phim ngang 1920×1080, 30 fps, 39,3 s. Ảnh gốc sinh bằng một model ảnh, i2v bằng một model video cho clip 6 s ở 24 fps, dựng bằng ffmpeg. Cấu trúc: hook 4 shot trong một căn phòng lúc hoàng hôn, montage 29 shot, ending 3 shot quay lại căn phòng đó. Luật riêng của phim: hook và ending chỉ thấy bóng ngược sáng, không lộ mặt.

Phim này làm trước khi có skill `t1to9-film`, bằng công cụ khác và khung ngang. Bài học về quy trình và về i2v vẫn dùng được. Số liệu dưới đây lấy từ bản rà soát độc lập của chính dự án. Bản rà soát chấm: bản dựng sạch về kỹ thuật, **chưa đạt về nội dung**, hook và ending chỉ 1/7 shot đạt.

## Chuyện gì đã xảy ra

| Lỗi thấy trên khung hình | Tầng gây lỗi | Bài học (nằm ở đâu trong skill) |
|---|---|---|
| Các shot "cùng một phòng" ra mỗi ảnh một phòng: rèm, quầy, sofa đổi chỗ, nắng đổi hướng. Nhân vật nữ đổi 5 kiểu váy | Ảnh gốc. Mỗi shot một prompt riêng, không có ảnh phòng chủ hay ảnh trang phục chủ | Chốt bộ tài sản chủ trước shot đầu tiên (`../../film-craft/references/production-design.md` mục 2) |
| Lộ mặt ở cuối clip dù ảnh gốc là bóng | Model video và prompt. Prompt bảo "quay lại, bước về phía người kia" nhưng không chỉ hướng, không cấm quay mặt | Viết hướng đi theo khung (trái, phải), viết rõ điều cấm. Clip 6 s chỉ dùng 1,7–3 s đầu và giữa, tránh đoạn cuối là nơi model hay cho nhân vật quay ra máy |
| Nhân vật không đi tới được người kia, lại đi về phía máy | Bố cục ảnh gốc. Điểm đi và điểm đến nằm trước sau theo trục máy | Hai điểm của một đường đi phải cùng mặt phẳng ngang khung, có lối trống (`production-design.md` mục 3) |
| Bàn tay méo từ khung 0 của clip | Ảnh gốc đã méo. Vẫn đem render, tốn 5–7 take ở hai shot mới nhận ra | Lỗi có sẵn ở khung 0 thì sửa ảnh, không render lại. Phóng to tay ở ảnh gốc trước khi qua cổng |
| Tư thế cuối sai (ngồi cạnh thay cho ngả vào lòng) | Ảnh gốc | Tư thế đích phải là một ảnh gốc riêng. Không nhờ i2v đổi tư thế lớn trong một clip |
| "Bàn mọc ra", vật tự xuất hiện | Prompt i2v cần vật chưa có trong ảnh | Vật nào hành động cần thì phải có sẵn trong ảnh gốc (`production-design.md` mục 4) |
| Phòng trôi, tay chân đổi khi máy orbit hoặc zoom | Model video | Với model đó: máy đứng yên, mỗi clip một hành động nhỏ. Shot ending sạch nhất khi chỉ giữ tư thế, cho thở, tóc và rèm lay |
| Lặp khung đều mỗi 5 khung | Dựng. Clip 24 fps đưa lên timeline 30 fps | Chốt fps của timeline theo fps nguồn, hoặc chấp nhận và tránh pan |
| Script dựng không chạy lại được | Dựng. Đường dẫn của máy khác ghi cứng trong script | Đường dẫn đi qua file cấu hình, xem `templates/paths.example.md` |

## Lỗi quy trình gốc

1. **Bỏ cổng duyệt ảnh.** Chủ phim mệt, nói "chọn giúp rồi render". 6 clip được render trên ảnh chưa ai duyệt, ngay 4 phút sau khi có ảnh. Uỷ quyền chọn ảnh không có nghĩa là bỏ bước soi ảnh: người được uỷ quyền vẫn phải chấm đủ checklist và ghi lại.
2. **Đổi hướng nhiều lần mà không chốt.** Một shot hook có 6 bản ảnh gốc theo 4 hướng khác nhau. Mỗi lần đổi là làm lại từ ảnh.
3. **Sửa ở tầng sau thứ hỏng ở tầng trước.** Lỗi nằm trong ảnh nhưng lại viết lại prompt video.
4. **Đổi hai thứ một lúc.** Đang sửa lỗi vật lý thì đổi luôn màu và bố cục, nên không biết cái gì chữa được cái gì.
5. **Sổ trạng thái lệch thực tế.** File tiến độ dừng trước đợt sửa cuối. Hậu tố `_OK` còn dính trên những bản đã bị thay. Hai file nguồn trong script dựng không còn trên đĩa.

## Luật rút ra, đã kiểm trong phim này

- **Không chạy bước đắt khi bước rẻ trước nó chưa duyệt.** Lỗi ở ảnh gốc nhân lên ở mọi tầng sau.
- **Phân tích lỗi nằm ở tầng nào trước khi sửa:** kịch bản, ảnh gốc, prompt video, hay dựng. Sửa đúng tầng đó.
- **Ngân sách thử: hai lần cùng một cách.** Vẫn hỏng thì đổi cách (sửa ảnh, chia nhỏ hành động, đổi model). Ba lần hỏng thì dừng và hỏi, kèm phân tích.
- **Thứ tự sửa:** logic và vật lý, rồi bố cục, rồi màu và style.
- **Ảnh tham chiếu người dùng đưa** là để lấy một phần (thường là bố cục). Hỏi hoặc suy ra phần nào. Màu và style vẫn theo style đã duyệt.
- **Làm một shot mẫu trọn vòng** (ảnh, duyệt, clip, QA) rồi mới nhân ra cả nhóm.
- **Các shot cùng cảnh dùng chung ảnh tham chiếu là ảnh đầu tiên đã duyệt của cảnh đó.**
- **Báo cáo ghi rõ cái chưa kiểm** ("chưa phóng to tay", "chưa xem lại shot D02").

## Checklist QA clip đã dùng

Tay (số ngón, tay thừa, tay dính vật). Chân (chân đổi người, váy thành quần). Vật (xuất hiện, biến mất). Phòng (kiến trúc trôi). Mặt (lộ khi phim cấm lộ). Tóc và trang phục (khớp bản khoá). Viền đen (đo bằng cropdetect, crop riêng từng clip). Thời lượng và fps.

Cách soi đã dùng được: contact sheet 3×3 trải đều thời gian clip, xem ở độ phân giải thấp trước, chỉ phóng to chỗ nghi. Đo fade và flash bằng độ sáng trung bình từng khung thu nhỏ.

## Giữ lại được gì

- Bảng chấm từng shot theo cột (style, mặt, tay, vật, phòng, hành động, cùng phòng) với giây cụ thể của lỗi. Bảng này cho thấy ngay shot nào sửa nhẹ, shot nào làm lại ảnh.
- Tách "làm ngay, không cần quyết" khỏi "cần chủ phim quyết", mỗi quyết định có 2–3 phương án kèm ưu nhược và ước lượng số ảnh, số clip.
- Cứu shot bằng dựng trước khi render lại: cắt clip trước giây lộ mặt.
- Chuyển cảnh bằng burst trắng che được cú nhảy màu lớn giữa montage và ending.
- Montage xen 14 ảnh tĩnh với 22 clip. Bản rà soát không chấm nội dung đoạn này, nên chưa biết ảnh tĩnh có lộ hay không.

## Khác gì với phim T1 to 9 hiện nay

Phim này ngang 16:9, clip 6 s, model video khác. Các nhận định về model (máy phải đứng yên, cuối clip lộ mặt) là của model đó ở thời điểm đó. Với Seedance hay Kling thì coi là giả thuyết cần thử lại, không phải luật.
