# Năm mẫu prompt đã thành công và khi nào dùng

Nguồn: Movez (27/09/2026) tổng hợp 9 bài viral, cùng dataset athemeroy/awesome-opus-5-5-videos. Đây là mẫu cấu trúc diễn giải lại, không chép nguyên prompt của tác giả.

"One-shot" thường gồm prompt dài 9.500–19.000 ký tự, kèm skill, ví dụ, API key và một lượt chạy tự động khoảng 12 giờ. Prompt công khai dài từ 172 đến 17.664 ký tự. Độ dài không quan trọng; quan trọng là **chuỗi quyết định, file đầu ra và điều kiện dừng**.

## 1. One-liner showreel: để test engine, không để làm phim

Cấu trúc: thể loại có luật sẵn ("showreel xin việc") + model là chủ thể ("cho thấy bạn giỏi motion thế nào") + thời lượng ngắn (15 s, 6–8 shot) + hệ số công sức ("go all out"), chạy ở xhigh hoặc max.

Câu này **không chứa ý tưởng**, nên chỉ kiểm tra được setup. Hàng trăm người dùng cùng một câu ra các reel na ná nhau (athemeroy gọi là "brief contagion"; hai prompt MV trùng 87% cụm 5 từ). Dùng để thử setup xong thì chuyển sang mẫu khác. Các biến thể từng hiệu quả:
- thêm yêu cầu âm thanh ("tự soạn piano, cắt khớp nhạc");
- thêm chặn dấu hiệu AI ("không khung viền, không chữ ở góc");
- đổi kỹ thuật thành câu chuyện ("lịch sử của X từ Y tới nay, tự lên storyboard, 45 s dọc");
- giao persona ("studio branding ngách, một màu nhấn, mỗi shot một kỹ thuật").

## Đoạn gate chung (dán vào mọi mẫu production 2–5)

> Chọn mode trước khởi tạo (solo hoặc Center–Worker, xem `setup-and-studio.md`). Route A HTML + `seek(t)` + Playwright là mặc định v0.4.0; dùng framework khác khi brief hoặc dự án yêu cầu, ghi lý do trong brief.
> G0 chốt mục tiêu, loại phim và giả thuyết hook; chưa đồng nghĩa duyệt timing. Câu hỏi test giây 5 chốt theo type (sản phẩm hỏi loại/lợi ích; MV hỏi motif/hướng cảm xúc/identity phù hợp) và ghi trước test. G2 chốt type/story/hook trên storyboard và animatic tốc độ thật của đúng revision. Được làm animatic đơn giản trong phạm vi preproduction đã giao; chỉ build production sau approval có người duyệt, timestamp và artifact/revision. Gate chỉ chặn phần cần đầu vào còn thiếu.

## 2. Thương hiệu: trỏ vào sản phẩm thật

Thêm ba dòng: URL sản phẩm, "dùng screenshot, logo, asset thật", "phải có nhạc". Khung prompt:
- **Asset:** vào site, chụp màn hình thật bằng Playwright, lấy logo, màu, font. Lưu vào `./assets` và **liệt kê trước khi animate**. Không vẽ lại UI theo trí tưởng tượng, chỉ crop và animate đồ thật.
- **Câu chuyện**, mặc định mỗi beat khoảng 2–4 s (theo type và read): hook (vấn đề trong khoảng 5 chữ kinetic thật to) → sản phẩm xuất hiện, UI tự lắp từng mảnh → 3 tính năng, mỗi cái là một khoảnh khắc UI có con trỏ làm thao tác thật → một con số chứng minh → logo + CTA.
- **Âm:** nhạc gốc 120 BPM tổng hợp bằng code; click và whoosh khớp phách.
- **Định dạng:** 9:16 trước, rồi 1:1 và 16:9 từ cùng timeline, mỗi định dạng có layout riêng.
- Cho xem contact sheet mỗi beat một khung trước khi render full.
- API key để trong `.env` và chỉ nhắc tên biến ("ELEVENLABS_API_KEY trong .env"). Không dán key thật vào prompt.

## 3. Tham chiếu: đặt tên một look, đưa một khung

Không có tham chiếu thì Opus quay về mặc định: chữ giữa màn hình, gradient, fade-in. **Gọi tên một phong cách hiệu quả hơn mô tả nó.**
- **Một khung:** chụp một khung từ video mình thích, nói rõ lấy gì (palette, font, grain) và không lấy gì (chủ thể).
- **Một video:** cho Opus tách khung bằng ffmpeg (mỗi 0,5 s), mô tả nhịp từng shot trước khi code.
- **Một thư viện:** thư mục ảnh hoặc tác phẩm cũ của chính mình. Không ai chép lại được thứ này.

Quy trình: G0 mục tiêu/type/claim/hook → đối chiếu tham chiếu (tách khung) để viết `docs/style_guide.md` (palette hex, font, độ dài shot, kiểu chuyển cảnh, chuyển động camera, texture, cách chữ vào/ra) → `docs/shotlist.md` có read/proof theo đúng style đó → storyboard + animatic → ghi approval G2 → production. **Cho tôi xem, chờ OK rồi mới code.** Lấy ngữ pháp của tham chiếu, không bao giờ lấy nội dung, logo hay nhân vật. Nguồn tham chiếu: whatships.com, Dribbble motion, phim ra mắt của đối thủ, gallery awesome-ai-motion.

## 4. Spec dạng XML: danh sách trạng thái, không phải vibe

Prompt được lưu nhiều nhất tuần đó là một spec, không phải câu one-liner. Khái niệm chính: **một hình không bao giờ cắt.** Một phần tử đổi kích thước, bo góc, màu qua các trạng thái (nút, loader, player, slider, chart, command palette), con trỏ lái mọi thay đổi bằng click thật, trạng thái tại T tương thích t=0 nên loop được. Xem `examples/minimal/`.

```
<inputs>    hỏi tôi: sản phẩm + URL, 8–12 trạng thái UI kể câu chuyện, dữ liệu thật mỗi trạng thái,
            màu + font + 1 màu nhấn, nhạc ~120 BPM có license, các định dạng </inputs>
<direction> một container không cắt; nội dung đổi sau một nhoè ngắn; con trỏ lái mọi thay đổi;
            nền trung tính ấm, 1 màu nhấn; lò xo overshoot rất nhỏ.
            Cấm: easing nảy, glow, gradient trên UI, hạt bung, thời gian chết </direction>
<structure> 120 BPM, 8 ô nhịp; beat grid là lưới tham chiếu, chọn sự kiện theo action/read, không bắt buộc mỗi beat đổi trạng thái; danh sách trạng thái theo thứ tự </structure>
<build>     một HTML, một canvas, window.seek(t); không transition/timer/trạng thái mang theo;
            lò xo dạng đóng, giá trị nhiều đích = tổng lò xo (track); chữ trong hộp vào sau khi morph
            bắt đầu, ra trước morph kế; tab indicator mép trước/sau khác lò xo; beat ước lượng từ nhạc, xác nhận bằng nghe;
            60 fps, 4 sub-frame blur </build>
<gotchas>   không will-change trên thứ camera scale (chữ nhoè); loop: kiểm trạng thái tại T tương thích t=0
            (vị trí, và vận tốc con trỏ khi có ý nghĩa), bước khung cuối→đầu so với bước lân cận, kể cả seam
            audio; chỉ đòi ảnh cuối trùng ảnh đầu khi có hold tĩnh ở seam; số/chữ dùng frameT khi có blur </gotchas>
<start>     hỏi inputs, rồi cho xem danh sách trạng thái trên beat grid trước khi viết code </start>
```

UI giả cũng là một phim trường: mỗi phần tử có trạng thái đã biết. Có thể kể chuyện bằng chính một phần mềm do model tự vẽ (Opus vẽ trình dựng phim rồi "dựng" bên trong nó).

> Chỉ dùng fictional UI cho demo kỹ thuật/fiction đã ghi rõ. Với sản phẩm thật, UI/state/function phải có nguồn, được phép dựng lại và đối chiếu revision; không dùng UI tự tưởng tượng làm proof tính năng.

## 5. Brief đạo diễn qua đêm: thuê cả ê-kíp

Không mô tả video mà giao vai trò: "đạo diễn, animator, sound designer, kỹ sư render; đây là sản xuất nhiều phiên, đừng vội render bản cuối". Khung xương:
1. **Phim trong một câu:** logline và cảm xúc cuối, để mọi quyết định đều đối chiếu được.
2. **Tham chiếu và đầu vào:** `refs/` (video, khung, thư viện ảnh, repo cũ), nhạc dùng nguyên vẹn (ước lượng beat bằng beats.py trước, xác nhận meter/phase bằng nghe), skill có sẵn, API trong `.env`, ngân sách ("tiêu tiết kiệm").
3. **Character bible:** tỉ lệ, palette lấy từ model sheet, biểu cảm, khoá nhận diện giữ nguyên qua mọi đổi style.
4. **Beat sheet:** hook 2 giây đầu, mặc định mỗi 3–5 s một payoff hình ảnh (MV/hold/read dài theo phrase), kết vần với khung đầu (loop chỉ khi brief yêu cầu; kiểm theo quy tắc loop ở trên).
5. **Chữ trên màn hình:** lúc nào lời hoặc phụ đề phóng to, lúc nào nằm như sub; bố cục chừa chỗ.
6. **Gate:** kế hoạch → rig → stills → animatic 960×540 với âm tạm (sửa nhịp trước khi polish) → full → polish → âm → render. Cho xem shotlist và animatic. **Im lặng không phải là duyệt.** Chạy không người trông thì làm tới bản nháp đã được uỷ quyền (shotlist, animatic) rồi dừng chờ chủ phim.
7. **Subagent theo chương:** viết `docs/ANIMATION_GUIDE.md` trước để mọi subagent code cùng một style; có `STORYBOARD.md` sau lượt đầu (như repo PDoom: chín chương trong `src/ch/`).
8. **Critic:** lặp khi còn lỗi/tiêu chí chưa đạt; không ép đủ số vòng khi đã đạt bằng chứng (xem dưới).
9. **Giao:** `final.mp4`, `loop_check.mp4`, `poster.png`, `contact.png`, source sạch kèm README.

**Generate-then-trace (lai):** model video (vd Seedance) dựng shot nền có nhân vật và vật lý, rồi Opus vẽ lại toàn bộ bằng JS lên trên, người xem chỉ thấy lớp vẽ bằng code. Model video cho chuyển động khó code tay; lớp JS cho look nhất quán, sở hữu được. Cùng brief nhưng đổi thư viện ảnh sẽ ra phim khác hẳn.

## Prompt critic (dùng mọi mẫu)

```text
Đọc rubric.md và brief revision hiện hành. Kiểm đúng artifact/gate.
Tách A1–A3 khỏi T1–T5; mandatory_axes và ngưỡng đã chốt trước review.
Chưa kiểm ghi UNTESTED; điểm model ghi model-estimate, không thay người xem/nghe.
Tìm tối đa ba lỗi có evidence: timestamp → quan sát → tác hại → tầng gây lỗi → biến sửa → đoạn kiểm lại.
Type/story sai thì quay G0/G2. Chỉ sửa đúng scope được giao.
Ghi execution_status riêng acceptance_status; không dùng điểm trung bình vượt gate.
```

Ảnh để mở khi review: `contact.png`, `strip.png`, `phone.png` (nhìn kỹ, làm đạo diễn khó tính, không phải tác giả tự hào). Danh mục săn lỗi: chữ chồng nhau khi đổi, vật trượt thay vì ease, nhãn góc và khung viền, shot chữ giữa nền gradient, chữ nhoè vì scale, phách chết vô ý, giật ở mối nối loop (so với bước lân cận).

Một phim màu nước 45 s tốn 163 lượt gọi model và gần 7 giờ, không phải one-shot. Lặp chính là phương pháp, không phải thất bại.

## Đóng gói và bán

Gói pipeline thành skill để video sau chỉ cần một câu ("/motion-reel cho [URL], 20 s, dọc, tham chiếu ./refs/frame.png"). Mẫu dịch vụ đã có người bán: nhạc + mascot theo phong cách bất kỳ + tính năng sản phẩm + offer cuối + đa ngôn ngữ + tối đa 3 lần sửa. Mốc giá tham khảo: khoảng 1.000 USD cho một video như vậy một năm trước (lời Tony Dinh).
