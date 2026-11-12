# Âm thanh: phim nghe ra sao khi nhắm mắt

Dùng khi: chia lớp âm cho một phim trước khi sinh nhạc; quyết định giữ hay bỏ tiếng i2v sinh kèm; đặt SFX và chỗ im lặng lên timeline; mix bản giao cho điện thoại.
Không dùng khi: cần beat grid, tính khung theo phách, timing giọng đọc (`../../code-motion-video/references/audio-timing.md`); cần lệnh đo loudness và ngưỡng QA (`../../t1to9-film/references/qa.md`); cần cách cắt hình (`editing.md`).
Nhãn: xem `../SKILL.md`. Mọi câu prompt ở đây chưa thử.

Luật cứng của repo: âm thanh là `UNTESTED` cho đến khi Tuệ nghe đúng bản đó (đúng sha256). Số đo không thay được tai.

## 1. Các lớp và lớp nào dẫn

| Lớp | Vai | Hỏng khi |
|---|---|---|
| Nhạc | Dẫn cảm xúc và đoạn, đặt nhịp cắt | Lấp hết, không còn chỗ cho tiếng thật |
| Ambience, room tone | Cho biết đang ở đâu, nối các shot cùng nơi thành một không gian | Thiếu thì phim nghe "chân không"; đổi đột ngột ở mỗi cắt thì lộ chỗ nối |
| Foley (tiếng người và vật trong cảnh: bước chân, vải, chạm) | Làm hình có trọng lượng, có tay | Đủ mọi tiếng nhỏ cùng to, rối |
| SFX nhấn | Đánh dấu một khoảnh khắc: màn trập, cú chạm, whoosh | Dùng ở mọi cắt thì mất nghĩa |
| Giọng (hơi thở, tiếng cười, một tiếng gọi) | Gần người nhất, kéo chú ý mạnh nhất | Lời bịa của model, giọng lạ |

Lớp dẫn theo loại phim [suy luận, đối chiếu `../../t1to9-film/references/film-types.md`]:

| Loại | Lớp dẫn | Lớp đỡ |
|---|---|---|
| MV, phim theo nhạc | Nhạc | Một hai SFX nhấn đúng drop |
| Kể chuyện không thoại, đời thường | Ambience và foley, nhạc thưa | Một tiếng giọng ở bước ngoặt |
| Ký ức, hoài niệm | Nhạc mềm, một tiếng motif lặp (màn trập, chuông) | Ambience lùi xa, khô |
| Sản phẩm, vật | SFX và foley vật liệu | Nhạc nhịp rõ, ít giai điệu |

## 2. Trong cảnh, ngoài cảnh, phối cảnh âm

[sách] Corrigan, *A Short Guide to Writing about Film*, page_label 90: âm có thể có nguồn trong khung hay ngoài khung, thuộc thế giới truyện (diegetic) hay ngoài nó; tiếng có thể đến trước hay theo sau hình nó gắn với, thành cầu nối sang hình kế (sound bridge).

[sách] Bordwell & Thompson, *Film Art*, page_label 314: âm lượng nhỏ hơn và thêm vang cho biết xa hơn; nhưng phim thường không đổi phối cảnh giọng mỗi khi cắt cận hay rộng. Phối cảnh âm là công cụ chọn dùng, không phải luật tả thực.

Áp vào phim không thoại [suy luận]:

| Cỡ cảnh | Foley, ambience | Viết vào prompt i2v phần âm (zh-CN) |
|---|---|---|
| Cận, insert | Khô, gần, rõ chi tiết cao (vải sột soạt, đầu ngón chạm) | 只保留近处的细小声音：手指摩擦纸面的声音 |
| Trung | Foley chính + ambience vừa | 脚步踩在木地板上的声音，远处有鸟叫 |
| Rộng | Ambience dẫn, có vang, foley nhỏ hoặc bỏ | 空旷的风声，远处隐约的车流声 |

Tiếng ngoài khung kéo mắt và tạo câu hỏi: một tiếng gọi, cửa mở ngoài khung, rồi cắt sang nguồn tiếng. Đó là J-cut âm: tiếng của shot B vào trước hình B khoảng 6–12 khung, người xem muốn thấy nguồn nên cú cắt có lý do. L-cut ngược lại: tiếng A còn ngân sang B, giữ cảm xúc cảnh trước. [nghề]

## 3. Im lặng và khoảng trống

[sách] Cooper & Dancyger, *Writing the Short Film*, page_label 159: một khoảng lặng đặt cạnh cảnh đầy tiếng có sức nặng kịch tính lớn; tương phản tiếng và lặng mạnh như tương phản hình và tiếng.

| Tình huống | Làm gì | Dấu kiểm khi nghe |
|---|---|---|
| Trước điểm rơi, drop | Rút nhạc (hoặc cắt hẳn) 1–2 phách trước, để lại room tone hoặc một hơi thở | Thấy "hụt" rồi mới rơi |
| Bước ngoặt cảm xúc | Bỏ nhạc, chỉ giữ ambience và một tiếng đơn (giọt nước, kim đồng hồ) | Tiếng đơn nghe rõ, không bị lấp |
| Kết | Nhạc tắt trước hình 0,5–1 s, hoặc đuôi vang tự tắt | Không cụt giữa nốt |

Im lặng trong phim là room tone nhỏ, không phải số 0 tuyệt đối. Về 0 tuyệt đối nghe như file hỏng, nhất là trên tai nghe. [nghề]

## 4. Điểm đồng bộ: trúng khung hay lệch vài khung

| Sự kiện | Đặt ở đâu | Vì sao |
|---|---|---|
| Va chạm, chạm, bước chân thấy rõ, màn trập | Đúng khung tiếp xúc | Lệch 2 khung trở lên ở cận là thấy [nghề] |
| Whoosh | Bắt đầu 3–6 khung trước đỉnh chuyển động, đỉnh tiếng ở giữa đường đi | Tiếng cần thời gian lên [suy luận] |
| Ambience cảnh mới | Vào trước cắt 6–12 khung (J) hoặc ngân sau (L) | Làm cú cắt mềm, che chỗ nối |
| Tiếng xa (sấm, pháo, chuông xa) | Muộn hơn hình vài khung | Âm đi chậm hơn ánh sáng, nghe thật hơn [suy luận] |
| Dư chấn, đuôi vang | Muộn hơn tiếp xúc, tắt dần | `audio-timing.md` đã có mốc chuẩn bị, tiếp xúc, dư chấn |

Quy tắc chung: tiếng của một vật trong khung không bao giờ đến trước hình của nó ở cận. Tiếng báo trước chỉ dành cho nguồn ngoài khung hay shot sắp tới. [suy luận]

## 5. Thiết kế SFX

Tiếng sinh từ vật liệu và chuyển động [nghề]:

| Hình | Tiếng | Đổi theo |
|---|---|---|
| Vật lướt qua, máy lia, whip | Whoosh (nhiễu lọc có đường quét) | Nhanh hơn thì ngắn hơn, cao hơn, to hơn |
| Vật nặng chạm đất | Impact trầm + thân dày | Nặng hơn thì trầm hơn, đuôi dài hơn |
| Vật nhẹ, giấy, vải | Tiếng cao, ngắn, nhiều hạt | Ít trầm |
| Kim loại, thuỷ tinh | Transient sắc + đuôi ngân có cao độ | Vật lớn thì ngân thấp và lâu |

Một tiếng tốt thường ghép ba lớp: **transient** (vài ms đầu, cho cảm giác trúng), **thân** (khối lượng, chất liệu), **đuôi** (không gian, vang). Thiếu transient thì tiếng nhão, thiếu đuôi thì tiếng dán vào chứ không ở trong cảnh. [nghề]

Tần số [nghề, số tròn để định hướng]: giọng và tiếng người nằm chủ yếu ở dải trung, độ rõ quanh 2–4 kHz; nhạc chiếm cả dải. Foley và SFX nên cắt bớt dưới khoảng 80–100 Hz nếu không cần trầm, và tránh chồng đỉnh lên đúng dải nhạc đang mạnh. Hai lớp to cùng một dải thì một lớp phải lùi.

## 6. Nhạc: cấu trúc, cắt, điểm vào ra, prompt Suno

Cấu trúc phim khớp với cấu trúc bài [suy luận]:

| Phim | Bài | Ghi chú |
|---|---|---|
| Câu hỏi mở (0–5 s) | Intro có hook ngay, không fade in từ lặng | Khung 0 đã có tiếng |
| Phát triển | Build, tăng lớp nhạc cụ | Mật độ cắt tăng theo |
| Điểm rơi | Drop hoặc điệp khúc, trước đó một khoảng rút | Dấu nhấn của cut-grammar rơi ở đây |
| Kết | Outro, nhạc cụ rút dần | Chữ ký T1 to 9 trên outro |

Cắt nhạc cho vừa độ dài: cắt ở ranh giới ô nhịp, nối hai đoạn trên phách mạnh, crossfade ngắn khoảng 10–50 ms để không click; nối chỗ có đuôi vang thì để đuôi vang phủ qua. Bỏ cả ô hay cả câu nhạc, không bỏ nửa ô. Bài ngắn hơn phim thì retime đoạn kết, không kéo giãn nhạc (`audio-timing.md`). [nghề]

Prompt cho AI nhạc: viết bằng cấu trúc, tempo, nhạc cụ, độ dài, không viết cảm xúc suông. Suno nhận chữ tự do nên có thể viết tiếng Anh hoặc zh-CN; các thẻ đoạn như `[Intro]` là quy ước của nhạc AI. [suy luận, chưa thử]

```text
Style: instrumental, felt piano, soft brushed drums, warm bass, 84 BPM, 4/4, no vocals
Lyrics/structure:
[Intro] solo felt piano, 4 bars
[Build] add brushed drums and bass, 8 bars
[Break] drums stop, piano only, 2 bars
[Drop] full band, piano melody up an octave, 8 bars
[Outro] piano only, ritardando, ends on long chord
```

Ghi BPM vào yêu cầu để beat grid dễ khớp, nhưng vẫn phải đo lại bằng `beats.py` vì bài sinh ra có thể trôi. Tránh "sad, cinematic, epic": không cho model biết làm gì với từng đoạn.

## 7. Mix cho điện thoại, khung 9:16, phim ngắn

**Loudness.** Repo dùng I = −14 ±1 LUFS, TP ≤ −1 dBTP, đo trên MP4 sau AAC (`qa.md`). Kiểm web ngày 2026-11-12: YouTube −14 LUFS được nhiều nguồn nhắc như mốc chuẩn hoá; TikTok và Instagram không thấy công bố chính thức, các hướng dẫn bên thứ ba lệch nhau từ khoảng −14 đến −9 LUFS. Giữ −14 làm chuẩn repo; đừng đẩy to hơn chỉ vì blog nói vậy.

**Loa điện thoại** [nghề, con số ước]: loa nhỏ yếu hẳn ở dải dưới khoảng 200–300 Hz. Tiếng quan trọng (impact, nhịp trống, tiếng motif) phải có phần nằm ở dải trung. Tiếng chỉ có trầm sẽ biến mất; thêm hài bậc cao (saturation nhẹ) để tai vẫn nghe ra nó.

**Duck nhạc.** Khi có một tiếng giọng hay SFX motif, hạ nhạc 3–6 dB quanh nó, lên lại trong vài trăm ms. [nghề]

**Mono.** Nhiều điện thoại phát gần như mono. Gộp mono để kiểm: lớp nào bị mất hay mỏng đi là do lệch pha stereo, sửa bằng cách thu hẹp độ rộng lớp đó.

**Phim ngắn** [suy luận]: tiếng phải có từ khung 0, không fade in. Phát lặp thì đuôi cuối nên nối được đầu bài, hoặc dứt hẳn. Nhiều người xem tắt tiếng nên phim phải hiểu được bằng hình; tiếng làm phim sâu hơn, không gánh chuyện một mình.

## 8. Tiếng i2v sinh kèm: giữ hay bỏ

Prompt mặc định (`prompts.md` mục B): chỉ tiếng hiện trường, 不要背景音乐. Có thể thêm 不要人声说话.

| Giữ khi | Bỏ khi |
|---|---|
| Tiếng chạm, bước chân trúng hình | Có nhạc nền hay giọng nói bịa |
| Ambience đúng nơi, liền suốt đoạn `usable` | Tiếng lệch hình từ 2 khung trở lên ở cận |
| Clip giữ nguyên speed | Đổi speed: tiếng méo cao độ hoặc giãn |
| Không cắt giữa clip | Cắt nối nhiều đoạn cùng clip: tiếng nhảy ở chỗ nối |

Tiếng đã giữ thì vẫn hạ thành một lớp ambience trong mix, không để nó nổi lên ngang nhạc. Tiếng model đổi chất giữa hai clip của cùng một nơi: thay bằng một ambience chung chạy dưới cả đoạn. [suy luận]

## 9. Bảng kiểm nghe

| Lượt | Cách nghe | Hỏi |
|---|---|---|
| Nhắm mắt | Tai nghe, không nhìn | Đoán được đang ở đâu, chuyện gì vừa xảy ra, chỗ nào là đỉnh? Âm có hình dạng riêng không? |
| Loa điện thoại | Cầm tay, âm lượng vừa | Tiếng motif và impact còn nghe ra? Nhạc có lấp hết? |
| Tai nghe | Âm lượng thấp | Có click ở chỗ nối nhạc, nhiễu, tiếng nhảy ở cắt? Im lặng có thành số 0? |
| Mono | Gộp mono | Lớp nào mỏng đi hay mất? |
| Đo | `film_qa.py loudness out.mp4` | Trong ngưỡng `qa.md`? Đo đạt vẫn là `UNTESTED` cho tới khi Tuệ nghe |

## 10. Lỗi hay gặp và cách sửa

| Dấu hiệu | Nguyên nhân | Sửa bằng gì |
|---|---|---|
| Cắt hình nào cũng nghe thấy chỗ nối | Ambience mỗi clip một kiểu | Một ambience chung dưới cả đoạn, J/L-cut ở chỗ đổi nơi |
| Drop không "rơi" | Nhạc đầy đến tận drop | Rút nhạc 1–2 phách trước, để room tone |
| Impact mất trên loa điện thoại | Tiếng chỉ có trầm | Thêm lớp transient và hài dải trung |
| Whoosh nghe trễ | Đặt đầu whoosh ở khung chuyển động | Dời sớm 3–6 khung, đỉnh ở giữa đường đi |
| Nhạc bị click ở chỗ nối | Cắt giữa ô, không crossfade | Cắt ở ranh giới ô, crossfade 10–50 ms |
| Giọng lạ trong clip | Model sinh lời | Bỏ tiếng clip, dựng foley riêng |
| LUFS đạt mà nghe vẫn to, gắt | Nén nặng, dải 2–5 kHz dồn | Giảm nén, hạ dải gắt, đo lại TP |

## 11. Hàng chờ thử

1. **Phối cảnh âm theo cỡ cảnh.** Một cặp cận và rộng, hai bản mix: giữ nguyên foley, và cận khô rộng có vang. Tuệ nghe nhắm mắt, hỏi bản nào thấy "có chỗ đứng".
2. **J-cut 6 hay 12 khung.** Cùng một cắt, tiếng B vào trước 0, 6, 12 khung. Xem mù, ghi bản nào cú cắt có lý do nhất.
3. **Rút nhạc trước drop.** Ba bản: không rút, rút 1 phách, rút 2 phách. Nghe trên loa điện thoại, hỏi drop nào mạnh nhất.
4. **Prompt Suno có cấu trúc.** Sinh hai bài: một prompt cấu trúc như mục 6, một prompt chỉ tả cảm xúc. Đo BPM thật bằng `beats.py`, đếm số đoạn trùng với yêu cầu.
5. **Tiếng i2v giữ được bao nhiêu.** Sinh 3 clip có tiếng, đo độ lệch tiếng chạm so với khung tiếp xúc. Đúng nếu lệch dưới 2 khung; sai thì mặc định bỏ tiếng clip.
6. **Impact trên loa điện thoại.** Một impact chỉ có trầm và một bản thêm lớp trung. Tuệ nghe trên điện thoại, ghi bản nào còn nghe ra.
