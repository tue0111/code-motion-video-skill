# Failure modes — đạo diễn và vận hành

**30 lỗi**, tổng hợp từ film-01 (soạn: Sol/Astra K-01, Center duyệt). Dùng khi review (G3–G6) và khi Astra dò lỗi kế hoạch. “Máy phát hiện” dưới đây là lệnh hoặc phép đo khả thi; các phép đo chưa có tool trong studio được ghi **cần bổ sung**. Lệnh là ví dụ; chỉ chạy trong lệnh việc production. `final.mp4` là placeholder, thay bằng đúng file/revision; `t/a/b` thay bằng timestamp. Không có ngưỡng semantic phổ quát: Center chốt trước test.

Với lỗi ý nghĩa, máy chỉ kiểm cấu trúc hoặc phân tích đáp án test đã thu; không tự chứng minh hiểu/thích/muốn. OCR/saliency/freeze/black đều có false positive; giữ whitelist và kiểm ảnh/playback.

## Đạo diễn, nội dung, cảm nhận

| ID / lỗi | Dấu hiệu nhận biết | Phát hiện bằng máy / phép đo | Cách sửa đúng tầng |
|---|---|---|---|
| F01 Sai film type | Brief cần hiểu workflow, phim chỉ có tác phẩm+logo | Lint brief: thiếu type chính, know/feel/do hoặc shot proof/action; **cần schema**. Thu test5 s, đếm câu đúng loại/lợi ích trên tổng người test, không gọi là tỷ lệ thị trường. | Chốt mục tiêu/audience awareness; quay về type/story trước style. L2. |
| F02 Hook giữ mắt nhưng chưa định vị | Người nhớ mắt nhưng không biết giúp gì | Trích `ffmpeg -ss 5 -i final.mp4 -frames:v 1 check-5s.png`; so script 0–5 với định vị; test mở ở5 s. Timestamp logo là proxy, không thay test. | Gắn hook với lợi ích/đối tượng; nếu cố ý trì hoãn, ghi ngoại lệ trước test. |
| F03 Slogan không có cơ chế | CREATE TOGETHER nhưng không thấy ai cùng làm gì | Tỷ lệ claim trọng tâm có proof ID trong shotlist; **cần claim→asset map**, mỗi claim không có proof bị flag. | Thêm hoạt động thật đã có quyền hoặc đổi claim; không bịa cộng đồng. |
| F04 Mỗi beat không có động từ/kết quả | Câu chuyện là danh sách zoom/morph/card | Lint cột user_action/input/output; trace state trước/sau action; **cần schema/state export**. | Viết động từ cụ thể, cho thấy kết quả; giữ motif chỉ làm dẫn mắt. |
| F05 Read quá ngắn hoặc đồng thời | Đọc khi pause được, xem thật hụt | `read_end−read_start` và interval overlap từ cues; đếm khung chữ **đã hiện đầy đủ, không còn morph/che**, **cần read manifest**. 0,8–1 s là heuristic studio, không bảo đảm cho câu dài/CJK. | Rút copy/giảm reads hoặc tăng hold; chữ vào sau morph và ra trước lần đổi tiếp. |
| F06 Hierarchy chữ mất ở phone | EN/中文/CTA nhỏ; số rõ nhưng nhãn không rõ | Sheet `--w 360`; OCR bbox/glyph height, crop ratio và contrast là proxy; **OCR cần tool bổ sung**. | Tăng cấp chữ/độ tương phản, giảm nhiễu; test người đọc ở tốc độ thật. TASK-02. |
| F07 Chữ che nhau hoặc bị card che | “02” mất, WORKSHOP ghép mảnh | Quét bbox giao nhau/visible area ở mọi frame có read; DOM dùng bounding boxes, canvas **cần export bbox+clip**. Strip transition kiểm lại. | Sửa z-order/vị trí; swapAlpha cho đổi nhãn; chừa overshoot. TASK-04/07. |
| F08 Chữ bị motion blur/ghost | Hai giá trị số hoặc hai nhãn trong một khung | So capture sub1/sub4 tại cùng frame, đếm edge/glyph bbox; **cần phép so ảnh**, OCR confidence chỉ flag. | `frameT` cho chữ/số, không dissolve/glitch hai bộ chữ; blur chỉ lớp motion. |
| F09 Mọi đoạn cùng bố cục | Lặp chữ trái/ảnh phải dù thay asset | Layout signature mỗi shot: bbox anchor, scale, density, camera; đo số shot liên tiếp cùng signature; **cần layout manifest**. | Thay staging theo nhiệm vụ, không đổi ngẫu nhiên. Giữ identity/copy thành công. |
| F10 Motion không thêm thông tin | Thêm wow, người vẫn không hiểu | Đếm shot chỉ đổi effect không đổi knowledge/state; so A1 đáp án trước/sau cùng đoạn, **cần test logs**. | Bỏ effect vô chức năng; ưu tiên proof/hành trình. L3. |
| F11 Camera giả dolly/orbit | Mọi lớp scale đều; collage song song màn hình | Đo scale_ratio foreground/background ở hai mốc hoặc project XYZ; strip 12–24 frame. Ratio đều chỉ gợi zoom; **cần landmarks/projection log**. | Chọn tên camera đúng, thêm depth/occlusion khi ý đồ đòi hỏi; không đổi renderer chỉ vì thuật ngữ. TASK-09→13. |
| F12 Freeze ngoài ý đồ / hoạt động giả | Wordmark/số đứng quá lâu hoặc hạt chạy che đoạn chết | `ffmpeg -i final.mp4 -vf freezedetect=n=0.003:d=1 -an -f null -`; giao khoảng với whitelist hold/read/poster; optical flow ROI nếu cần, **tool ROI cần bổ sung**. | Nếu hold cần đọc, whitelist từ trước; nếu đoạn chết, thêm **thông tin/hành động có lý do**. Không nới ngưỡng sau FAIL TASK-17. |
| F13 Peak/rest tự mâu thuẫn | Ghi REST nhưng camera xoắn tăng tốc, màu/âm không như brief | So interval PEAK/REST với motion velocity, RMS và saturation; lấy cửa sổ theo cue, **cần cue/motion export**; không lấy correlation toàn tuyến làm pass duy nhất. | Chốt rest là thấp chú ý theo trục nào; đổi motion/audio đúng scope hoặc sửa rule qua Center. TASK-16/17. |
| F14 Hit lệch nhạc/cắt | SFX tới trước/sau hành động | Từ cues: `error_frames=abs(t_sound−t_contact)·fps`; onset sample từ audio; strip đúng frame. Dung sai ±1 frame chỉ khi brief yêu cầu. | Lấy mốc hình thực, không giữ ước lượng cũ; TASK-17 xuyên chữ ~7 s thay ~6,3 s. |
| F15 Hai tempo chồng trống | Chỗ đổi beat có cảm giác vấp | Kiểm interval drum-active của stem trước/sau và downbeat grid; waveform/onset giữa mối nối, **cần stem/onset analysis**; chủ phim nghe xác nhận. | Cắt đúng beat, break/DJ cut, vào bar build rồi downbeat; v3 8,14→10 s. |
| F16 Số liệu/UI/claim bịa | Số có vẻ hợp lý nhưng không trong nguồn duyệt | Xem lệnh F16 bên dưới; exact copy/claim allowlist với revision, **cần matcher**. Quét số chỉ tìm ứng viên. | Dùng nguồn đúng/ghi giới hạn; thiếu proof thì BLOCKED, không tự làm mock feature. |
| F17 Lộ prompt/avatar/IP bị cấm | Screenshot có chữ/username hoặc a07/ui07 lọt | Xem lệnh F17 bên dưới; so asset manifest và crop; OCR từ khóa/CJK, **cần OCR**, xem crop full-res. Mã tham chiếu không bằng pixel đã xuất. | Loại/crop/redact theo brief hiện hành, prompt_kind ảnh/video riêng; kiểm lại MP4. |
| F18 Quyền asset chưa xác nhận | Có URL/credit nhưng không có quyền dùng quảng cáo | Manifest lint: license/permission/evidence/usage_scope/credit thiếu trường, **cần schema**; checksum nối đúng asset. | Center xác nhận quyền hoặc thay asset; ghi BLOCKED phần cần quyền. Không kết luận license từ việc file tải được. |
| F19 CTA rõ chữ nhưng sai hành trình | JOIN nhưng lợi ích không dẫn tới join; nhiều CTA | Count action targets và URLs trong script; thu “làm gì tiếp/vì sao?” và hành vi test; **cần answer log**. | Một CTA hợp mục tiêu, trả lời lợi ích trước; kiểm bước landing nếu được giao. |
| F20 Brand chỉ xuất hiện cuối | Nhớ eye/mosaic nhưng quên VSC | OCR/logo timestamps, số giây identity đọc được; **tool nhận diện cần bổ sung**; test recall không gợi ý sau khoảng chờ đã chốt. | Gắn identity/motif với lời hứa trong tuyến; không chỉ tăng logo size. |

## Renderer, quy trình và bàn giao

| ID / lỗi | Dấu hiệu nhận biết | Phát hiện bằng máy / phép đo | Cách sửa đúng tầng |
|---|---|---|---|
| F21 Frame phụ thuộc lịch seek | A→B→A khác pixel | `node render.mjs --verify 0,2,8,22,46,59.9` trong task cho phép, hash seek khác thứ tự; xem lệnh F21 bên dưới (chỉ là static scan). | Hàm thuần t, seeded noise, await asset/font; bỏ trạng thái tích lũy, kiểm lại mốc lỗi. |
| F22 Font decode muộn | First render dùng fallback, verify lần sau khác | Verify và `document.fonts.check/load` đúng font/chuỗi CJK; ghi font hash; **browser instrumentation nếu chưa có**. | Warm-up canvas, load glyph thật trước seek; local font. Không kéo dài animation để che lỗi font. |
| F23 RAM vượt budget | Crash preload/sub4/concurrency | `RAM_decoded≈W·H·4·N` byte; 1920×1080×4×179=1.484.697.600 byte≈1,38 GiB; cache24≈189,84 MiB, chưa tính overhead. Đo working set Node/Chrome/ffmpeg bằng Get-Process trong benchmark. | Lazy load/LRU bounded, chunk10 s hoặc phù hợp timeline, giới hạn concurrency dựa peak thực. TASK-07-r4. |
| F24 Tranh thư mục tạm | ENOENT `_tiles/0027.png`, sheet thiếu ô | xem lệnh F24 bên dưới; kiểm hai job dùng cùng temp/output; **job manifest cần bổ sung**. | Chạy sheet/strip tuần tự hoặc temp riêng khi được phép sửa renderer; giữ lỗi trung gian và xuất lại đủ ảnh. TASK-14/15. |
| F25 Job mất do quota/crash | NO_REPORT/exit0 nhưng không artifact | So task IDs→execution log→report→artifact+checksum; `Get-Content reports/TASK-12.md`; **watcher audit cần bổ sung**. | Task nhỏ ưu tiên, resume manifest, báo PARTIAL/BLOCKED đúng tình trạng; watcher sở hữu done.json. Không nhận exit0 là đã xong. |
| F26 File ghi đè vẫn là bản cũ | Tên/size nhìn đúng nhưng nội dung stale | `Get-FileHash -Algorithm SHA256 <file>` nguồn và file nhận; revision/source hash vào manifest; cùng size chưa đủ. | Tên mới có revision, xác nhận bytes+checksum ở nơi nhận, không ghi đè bằng chứng lượt trước. |
| F27 MP4 sai khung/duration/PTS hoặc chunk seam | Encode exit0 nhưng thiếu chunk, giật ở nối | `ffprobe -v error -count_frames -show_entries stream=codec_type,width,height,r_frame_rate,nb_read_frames,start_time,duration -of json final.mp4`; trích strip biên chunk; so `N=round(duration·fps)`. | Manifest chunk khung không trùng/thiếu, đủ cùng codec/timebase, ghép rồi QA file cuối. |
| F28 Meter pass bị coi là nghe đạt / QA exit0 bị coi là final pass | Report có spec đẹp nhưng còn freeze/không ai nghe | `ffmpeg -i final.mp4 -af loudnorm=print_format=json -f null -`; đọc từng flag trong `qa.json`, người playback và feedback phải có record. `volumedetect` đo peak/mean, không đo LUFS thay loudness meter. | Tách measured pass và acceptance cảm nhận; ghi UNTESTED/chờ nghe/PARTIAL, không tự chấm đạt ngưỡng. TASK-06/17. |
| F29 Đổi revision làm sai luật / vượt scope | Dùng quyền v3 cho bản v1, sửa docs ngoài lệnh | So source/brief revision hashes và allowlist changed files; diff manifests; `Get-FileHash` file bảo vệ trước/sau; **scope manifest cần bổ sung**. | Khóa scope/revision trước sửa, chỉ patch file cho phép; vấn đề ngoài scope ghi đề xuất. |
| F30 Dọc là crop ngang / khung0 trống | CTA bị mất, UI quá nhỏ, opening đen vô ý | Sheet riêng360 px mỗi ratio; so bbox safe area; `ffmpeg -i final.mp4 -vf "scale=64:36,signalstats,metadata=print:key=lavfi.signalstats.YAVG:file=-" -an -f null -`; khung tối chỉ flag, không tự là trống. | Re-layout dọc và khung0 đủ; whitelist black có động cơ theo cue, tự xem ảnh/strip. |

## Lệnh `rg` cho F16 / F17 / F21 / F24 (ngoài bảng)

Đặt ngoài bảng Markdown để bản raw và bản render dùng cùng một chuỗi; dùng nhiều `-e` thay cho `\|`. Mã thoát `rg`: 0 = có match, 1 = không match, lỗi truy cập/cú pháp phải xử lý riêng (không coi lỗi là "sạch"). Đây là static scan tìm ứng viên, không chứng minh pixel hay semantics. Chỉ chạy trong lệnh việc production; không chạy trên output phim ở lượt review kiến thức (dùng fixture stdin).

```bash
# F16 — static candidates, đối chiếu allowlist/brief revision sau
rg -n -e '10,000' -e '620' -e '800' -e 'PROMPTS' -e 'PAID' docs/brief.md scenes
# F17 — bỏ path v3 nếu project không có; không coi rg error là sạch
rg -n -e 'a07' -e 'ui07' index.html scenes
# F21 — static candidates; dấu chấm API là literal
rg -n -e 'Math\.random' -e 'Date\.now' -e 'requestAnimationFrame' -e 'setTimeout' -e 'setInterval' -e 'fetch' index.html scenes
# F24
rg -n -e 'ENOENT' -e '_tiles' logs reports
```

## Gói kiểm tối thiểu cho nhiệm vụ production sau

- Chọn những lỗi đúng scope; verify/sheet/strip/phone theo gate trong AGENTS, không chạy mọi detector vô mục đích.
- Đạo diễn: brief/type/claim/read/approval schema + test mở với người chưa đọc brief. Các schema này là **đề xuất chưa triển khai**.
- Vận hành: hashes trước/sau, benchmark RAM, temp isolation, chunk manifest, QA trên **MP4 cuối**.
- Ghi `observed / machine_proxy / human_confirmed / unknown` cho từng finding; không sửa threshold để hợp thức hóa final đã fail.

Nguồn case: review log, TASK-07-r4, TASK-14, TASK-15, TASK-16, TASK-17, v3 brief. Các số report là evidence được đọc, không phép đo chạy lại trong K-01.
