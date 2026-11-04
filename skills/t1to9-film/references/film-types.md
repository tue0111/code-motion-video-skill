# Workflow tư duy theo loại phim T1 to 9

Dùng ở **G0, trước style và trước khi chọn chuyển động máy**: chọn một loại chính và tối đa một loại phụ (bảng chọn ở cuối file), rồi chạy chuỗi câu hỏi của loại đó. Id chuyển động máy (`shot-xx`) tra ở `camera-moves.md`. Codex soạn ngày 2026-11-04 từ aicameramovements.com, các reference của skill và các phim đã làm. Claude đã soát, và các xương thời gian đều cộng đúng tổng. Phần dưới là khung ra quyết định cho phim ảnh sinh → i2v 9:16, 20–60 s, không thoại; không phải công thức thể loại bất biến.

## Vì sao chọn 8 loại

Tám loại được giữ riêng vì mỗi loại đặt **một bài toán G0 khác nhau**: mood tổ chức cảm giác; truyện tổ chức nhân quả; lễ hội tổ chức nghi thức và quan hệ; du lịch tổ chức không gian; editorial tổ chức silhouette/attitude; sản phẩm tổ chức bằng chứng lợi ích; kỳ ảo tổ chức leo thang luật thế giới; beat-sync tổ chức năng lượng theo lưới nhạc. Không gộp lễ hội vào truyện vì phim lễ hội vẫn có thể không có xung đột; không gộp fantasy vào beat-sync vì cao trào hình ảnh và nhịp dựng là hai trục độc lập.

Quy ước chung: mọi mốc là thời lượng **timeline cuối**, cộng đúng 20/30/60 s; clip sinh 4–6 s vẫn cần handle và `usable`. Hard cut là nền, tối đa 3–4 dấu nhấn, không chữ trong footage, chữ ký chỉ ở cuối.

## 1. MV mood / ký ức

**1. Người xem cần gì sau phim**

Cảm một biến thiên rõ (ví dụ xa lạ → thân thuộc, nặng → nhẹ), nhận ra một motif đã đổi nghĩa; hành vi mong muốn là xem lại hoặc gửi cho người cùng ký ức. Không ép thành twist nếu sức hút nằm ở liên tưởng.

**2. Chuỗi câu hỏi tư duy G0 → cut map**

1. Cảm giác đầu và cuối khác nhau ở **giá trị** nào, nhờ ký ức/vật/ánh sáng nào?
2. Khung 0 có chuyển động cảm giác gì; đến giây 5 người xem chờ một người, một nơi hay một motif quay lại?
3. Chọn tối đa hai motif nào có setup → biến thể → payoff, và lần cuối đổi nghĩa ra sao?
4. BGM có build, khoảng thở, drop, tail ở đâu; hình phải dẫn nhạc hay nhạc dẫn hình tại mỗi đoạn?
5. Mỗi beat có động từ cảm giác nhìn thấy được nào (giữ, buông, ngoái, chạm), thay vì chỉ “buồn/đẹp”?
6. Shot nào là neo gương mặt, shot nào là chi tiết, shot nào cho không gian thở; nhịp có đang chia đều máy móc không?
7. Ở G2, nếu tắt nhạc thì trật tự hình còn tạo được biến thiên A→B không?
8. Cut map: ba dấu nhấn nào đúng lúc motif đổi nghĩa; cut còn lại có thể hard cut hết không?

**3. Xương thời gian**

- 20 s: mồi cảm giác 0–3; motif setup 3–7; biến thể 7–12; dồn 12–16; payoff 16–18; tail/chữ ký 18–20.
- 30 s: mồi 0–4; thế giới 4–10; motif lần hai 10–17; dồn 17–22; payoff 22–27; tail 27–30.
- 60 s: mồi 0–6; album I 6–18; motif biến đổi 18–30; khoảng thở 30–36; album II/dồn 36–48; payoff 48–56; tail 56–60.

**4. Ngữ pháp máy**

Chủ đạo `shot-01` static, `shot-05/05b` zoom chậm, `shot-12/12b` slider: máy kín đáo để liên tưởng dẫn phim. Cao trào dùng `shot-08` dolly in hoặc một `shot-03/03b` whip đã được chuyển động chuẩn bị. Tránh crash zoom/orbit liên tục vì biến mood thành demo máy và tăng drift mặt.

**5. Lối cắt + dấu nhấn**

Hard cut theo cụm nhạc, không buộc mọi cut trúng kick. Điển hình: (1) flash kem đổi đoạn; (2) đóng băng CCD/thẻ ảnh chỉ khi animatic đã duyệt; (3) payoff hiện từ cháy sáng; (4) outro tối/blur. Match motif theo màu/hình; whip chỉ khi shot có lia thật.

**6. Model / độ phân giải / pilot**

480p cho cảnh rộng, tay, ánh sáng, slider; 720p cho cận mặt neo và hero payoff. Fast cho chuyển động đơn giản, Seedance 2.0 cho diễn người, 2.5 chỉ khi payoff có biến đổi nặng. Pilot shot có mặt + ánh sáng đổi hoặc motif phải giữ đúng trạng thái.

**7. Lỗi sớm**

G0: “album bưu thiếp” — đổi thứ tự shot vẫn không đổi ý; sửa bằng giá trị đầu/cuối và motif đổi nghĩa. G2: mọi ảnh cùng cỡ/cùng zoom — xem animatic im tiếng sẽ phẳng; sửa tỷ lệ wide/detail/reaction và nhịp không đều.

**8. Ví dụ**

*Mùa hè cuối cấp* cho thấy chọn shot từ ca bẫy giải phẫu tạo album đẹp nhưng truyện yếu; bản ổn hơn dùng hard cut nền, flash kem, CCD và payoff có chức năng. Clip karin là ví dụ nhịp 3→2→1 phách trước drop, nhưng chỉ nên mượn cấu trúc năng lượng, không sao chép mọi hiệu ứng.

## 2. Truyện ngắn nhân vật + twist/payoff

**1. Người xem cần gì sau phim**

Hiểu một câu hỏi nhân quả, đồng cảm với lựa chọn của nhân vật, rồi nhận payoff/twist vừa bất ngờ vừa được cài. Hành vi: xem lại để thấy dấu cài, không chỉ ngạc nhiên một lần.

**2. Chuỗi câu hỏi tư duy G0 → cut map**

1. Nhân vật muốn gì trong 20–60 s, vật cản nhìn thấy được là gì, họ làm động từ nào để vượt qua?
2. Ý chính có dạng “giá trị đổi từ A sang B **nhờ** hành động/nguyên nhân C” chưa?
3. Giây 5 đặt đúng câu hỏi nào; bằng chứng hình ảnh nào khiến người lạ tự hỏi nó?
4. Twist thay đổi nghĩa của dữ kiện cũ hay chỉ thêm dữ kiện mới từ ngoài vào?
5. Cần cài motif/đạo cụ ở shot nào để payoff công bằng; trạng thái đầu/cuối của đạo cụ có ghi rõ không?
6. Beat nào là setup, thử, thất bại/khựng, lựa chọn, payoff, aftermath; có beat nào chỉ “không khí” không?
7. Shot khó nhất về hai người/tay/đạo cụ là gì; fallback có giữ nguyên ý chính không?
8. G2: animatic im tiếng có đọc đúng nhân quả và twist? Cut có che mất khoảnh khắc lựa chọn không?

**3. Xương thời gian**

- 20 s: hook/câu hỏi 0–3; mục tiêu 3–6; thử 6–10; vấp 10–13; lựa chọn 13–16; payoff 16–19; chữ ký 19–20.
- 30 s: hook 0–4; mục tiêu 4–8; tiến triển 8–14; vấp 14–18; lựa chọn 18–22; payoff 22–27; aftermath/chữ ký 27–30.
- 60 s: hook 0–6; mục tiêu 6–13; thử I 13–22; thử II 22–32; thất bại 32–39; lựa chọn 39–46; payoff 46–55; aftermath/chữ ký 55–60.

**4. Ngữ pháp máy**

Chủ đạo `shot-01`, `shot-08/09`, `shot-17/18`: giữ quan hệ nhân vật–mục tiêu rõ. Cao trào dùng `shot-04b` mặt→vật, `shot-06` fast zoom vào dấu cài, hoặc `shot-25b` tìm nhân vật. Tránh orbit/infinite zoom nếu chúng không thay đổi thông tin; biến dạng mặt/đạo cụ sẽ phá logic.

**5. Lối cắt + dấu nhấn**

Hard cut theo ánh mắt/hành động. 3 dấu nhấn điển hình: (1) khoảng lặng ở thất bại; (2) bloom/flash kem khi điều kiện đổi; (3) reveal payoff; (4) outro nếu cần. Match cut chỉ khi trạng thái/hướng hành động khớp từ lúc viết i2v.

**6. Model / độ phân giải / pilot**

480p cho establishing và hành động đơn; 720p cho lựa chọn trên mặt và hero reveal. 2.0 cho diễn/đạo cụ, Fast cho nối không gian, 2.5 cho payoff biến đổi nặng. Pilot shot có nhiều tay/người hoặc đạo cụ phải giữ trạng thái; kiểm từng frame và `usable`.

**7. Lỗi sớm**

G0: twist “từ trên trời rơi xuống” — không chỉ được shot setup cụ thể; sửa cài dấu nhìn thấy nhưng chưa hiểu. G2: nhân quả chỉ tồn tại trong mô tả — cho người lạ xem animatic không lời; nếu họ gọi sai câu hỏi giây 5, quay lại beat sheet.

**8. Ví dụ**

“Về nhà” (G0, trạng thái **CHƯA DUYỆT**) cài chìa cũ/dây đỏ, chìa không mở được ổ mới rồi mẹ trao chìa mới; payoff đổi nghĩa từ quyền vào nhà sang sợi nối hai người. Điểm mạnh là câu test giây 5 và khoảng lặng 14,5–16,5 s; rủi ro là ổ khoá thay mới khó đọc và shot hai bàn tay.

## 3. Lễ hội / gia đình

**1. Người xem cần gì sau phim**

Cảm mình thuộc về một nghi thức/cộng đồng cụ thể và muốn gọi về nhà, chia sẻ hoặc tham dự. Trọng tâm là quan hệ qua hành động, không phải danh mục biểu tượng mùa lễ.

**2. Chuỗi câu hỏi tư duy G0 → cut map**

1. Nghi thức trung tâm là gì (gói, thắp, trao, chờ, đoàn tụ), và ai làm cho ai?
2. Người ngoài văn hoá có hiểu quan hệ qua hình mà không cần chữ/thoại không?
3. Chi tiết nào là biểu tượng thật của câu chuyện, chi tiết nào chỉ trang trí dễ thành “catalog Tết/Trung thu”?
4. Cái thiếu/vắng ở đầu phim là người, ánh sáng, chỗ ngồi hay vật; nó được lấp bằng hành động nào?
5. Có tối đa hai motif nào đi qua tay các thế hệ và đổi nghĩa?
6. Mốc đông người nào cần wide, mốc thân mật nào cần tay/mặt; làm sao tránh model nhân bản người?
7. Âm hiện trường nào neo nghi thức (then cửa, giấy, nồi, trống), và khoảng im nào làm payoff ấm hơn?
8. G2: nếu bỏ đèn lồng/hoa/đỏ-vàng, câu chuyện gia đình còn đọc được không?

**3. Xương thời gian**

- 20 s: dấu lễ 0–3; người vắng 3–7; chuẩn bị 7–12; tín hiệu trở về 12–15; đoàn tụ 15–18; kết 18–20.
- 30 s: nghi thức setup 0–5; chờ 5–10; chuẩn bị 10–16; khựng 16–19; người về 19–25; payoff vật/quan hệ 25–28; chữ ký 28–30.
- 60 s: không gian lễ 0–7; gia đình/thiếu vắng 7–16; chuẩn bị I 16–26; chuẩn bị II 26–35; tín hiệu 35–41; đoàn tụ 41–50; nghi thức hoàn tất 50–56; kết 56–60.

**4. Ngữ pháp máy**

Chủ đạo `shot-01`, `shot-17`, `shot-04/04b`, `shot-25b`: đi từ nghi thức/không gian tới người. Cao trào `shot-08` vào cửa mở hoặc `shot-25` nâng khỏi bàn tiệc. Tránh `shot-22` chase, Snorricam và crash zoom vì làm mất phẩm chất quan sát/thân tình, trừ khi chủ ý hài.

**5. Lối cắt + dấu nhấn**

Hard cut theo động tác trao/đặt/mở. Dấu nhấn: (1) chuyển ngày→đêm hoặc đèn bật; (2) khoảng im trước cửa mở; (3) payoff đoàn tụ hiện từ kem; (4) outro trên footage thật. Không để mọi đèn lồng thành transition.

**6. Model / độ phân giải / pilot**

480p cho bếp, phố, tay đơn; 720p cho cận mẹ/con và hero đoàn tụ. Fast cho môi trường ít người, 2.0 cho cử chỉ, 2.5 chỉ khi crowd/ánh sáng biến đổi thật sự là hero. Pilot cảnh hai người trao vật hoặc đông người; kiểm chữ rác trên câu đối/lịch/bao bì.

**7. Lỗi sớm**

G0: “biểu tượng thay câu chuyện” — beat sheet toàn đèn, bánh, hoa nhưng không ai làm gì cho ai. G2: crowd/mặt đồng dạng và chữ giả; dùng ít người, khoá khác biệt, crop vào hành động, prompt không chữ.

**8. Ví dụ**

“Về nhà” hợp loại này ở motif ánh đèn nhà người → đèn nhà mình và hành động mẹ mở cửa; không cần thêm nhiều decor Tết. Cảnh bếp chỉ có giá trị sau khi chờ/khựng đã được thiết lập.

## 4. Du lịch / địa danh

**1. Người xem cần gì sau phim**

Hiểu “nơi này có trải nghiệm gì khác” và muốn lưu, đi hoặc khám phá tuyến; không chỉ thấy các postcard không liên hệ.

**2. Chuỗi câu hỏi tư duy G0 → cut map**

1. Lời hứa trải nghiệm một câu là gì: nhịp sống, quy mô, đường đi, ánh sáng hay tương phản?
2. Tuyến không gian có điểm vào → mốc định hướng → chi tiết người → điểm đến không?
3. Khung 0 đặt người xem **ở đâu**; giây 5 họ muốn biết “sau góc này là gì” hay “đích ở đâu”?
4. Địa danh được nhận ra bằng hình khối/địa hình nào mà không cần biển chữ?
5. Một nhân vật/POV có làm thước đo quy mô và liên kết các nơi không?
6. Shot wide nào chứng minh địa lý, shot detail nào chứng minh đời sống; hướng di chuyển có liên tục?
7. Drone/crane có cung cấp thông tin hay chỉ tăng vẻ đắt tiền?
8. G2: vẽ sơ đồ hướng màn ảnh và thứ tự địa điểm; có teleport vô cớ hoặc lặp establishing không?

**3. Xương thời gian**

- 20 s: entry 0–3; orient 3–7; tuyến/chi tiết 7–13; điểm đến 13–17; vista/kết 17–20.
- 30 s: promise 0–4; orient 4–9; đi tuyến I 9–15; đời sống 15–20; đi tuyến II 20–24; hero destination 24–28; chữ ký 28–30.
- 60 s: entry 0–6; bản đồ bằng hình 6–14; tuyến I 14–24; người/chi tiết 24–34; đổi thời gian 34–40; tuyến II 40–49; hero vista 49–56; kết 56–60.

**4. Ngữ pháp máy**

Chủ đạo `shot-17`, `shot-19`, `shot-26/26b`, `shot-25/25b`; tilt `shot-04` cho kiến trúc dọc. Cao trào `shot-27` hoặc `shot-s5` nếu quy mô/thời gian là payoff. Tránh earth zoom `shot-s4` trừ khi có nhiều asset/world rõ; tránh pan ngang dài trong 9:16.

**5. Lối cắt + dấu nhấn**

Hard cut giữ hướng hành trình; match hình cổng/đường/chân trời. Dấu nhấn: (1) pass-by qua cổng có thật; (2) time-lapse ngày→đêm; (3) crane/drone reveal điểm đến; (4) outro. Whip chỉ khi xe/người/lens đã lia cùng hướng.

**6. Model / độ phân giải / pilot**

480p cho đường đi/wide có texture mềm; 720p cho kiến trúc hero hoặc người cận. Fast cho static/slow track, 2.0 cho người di chuyển, 2.5 cho fly-through phức tạp khi thật cần. Pilot drone push/pass-through có nhiều lớp và shot địa danh phải đúng hình học.

**7. Lỗi sớm**

G0: itinerary thay vì trải nghiệm — tên địa điểm đổi mà cấu trúc không đổi; sửa bằng promise và tuyến. G2: “teleport montage” — hướng, giờ sáng và tỷ lệ không gian nhảy; lập map shot và dùng người/vật dẫn xuyên đoạn.

**8. Ví dụ**

Trong “Về nhà”, tàu → ga → ngõ → cổng là một tuyến nhân quả tốt hơn bốn postcard đẹp; mỗi nơi đưa nhân vật gần payoff hơn. Đây là nguyên tắc có thể chuyển sang phim địa danh thuần.

## 5. Chân dung thời trang / editorial

**1. Người xem cần gì sau phim**

Nhớ một identity/attitude, silhouette và chất liệu; muốn lưu look, theo dõi hoặc nhận diện bộ sưu tập. Nhân vật là neo, không để bối cảnh/camera nuốt mất họ.

**2. Chuỗi câu hỏi tư duy G0 → cut map**

1. Ba từ visual DNA nào có thể nhìn thấy bằng pose, line, vật liệu và ánh sáng—not adjective rỗng?
2. Identity invariant nào phải khoá qua mọi shot: mặt, tóc, phụ kiện, tỷ lệ, wardrobe?
3. Mỗi shot thay đổi cái gì có chủ đích: pose, camera height, crop, perspective, scene hay light?
4. Primary anchor là mắt, silhouette hay garment detail; secondary anchor là gì?
5. Chuỗi pose có đường năng lượng setup → kiểm soát → phá khuôn → hero không?
6. Shot nào chứng minh chất liệu bằng chuyển động; shot nào chỉ cần static để đọc form?
7. Biến thể có thực sự khác composition hay chỉ cùng người/cùng góc với nền mới?
8. G2: contact sheet che nền lại—silhouette/crop có nhịp khác nhau và mặt còn nhất quán không?

**3. Xương thời gian**

- 20 s: identity 0–3; silhouette 3–7; detail 7–11; pose shift 11–15; hero 15–18; end card 18–20.
- 30 s: identity 0–4; look I 4–10; material 10–15; spatial shift 15–20; look II 20–25; hero 25–28; chữ ký 28–30.
- 60 s: identity 0–6; look I 6–16; material/details 16–25; break 25–31; look II 31–43; build hero 43–51; hero 51–56; end 56–60.

**4. Ngữ pháp máy**

Chủ đạo `shot-01`, `shot-12/12b`, `shot-14/14b`, `shot-05`: tôn line/material. Cao trào một cung ngắn `shot-15/15b` hoặc `shot-08`. Tránh handheld/chase và full orbit: mặt, tóc, garment dễ drift; camera energy lấn attitude.

**5. Lối cắt + dấu nhấn**

Hard cut theo pose/silhouette, match cut theo line hoặc màu. Dấu nhấn: (1) flash kem đổi look; (2) freeze hero đúng beat; (3) ánh sáng/màu đổi có động cơ; (4) end signature. Không dùng transition khác nhau chỉ để “fashion”.

**6. Model / độ phân giải / pilot**

720p cho cận mặt, jewelry, textile hero; 480p cho full-body/wide nếu grain/look cho phép. 2.0 cho pose và vải, Fast cho static micro-motion, 2.5 cho garment/light transformation hero. Pilot orbit/arc trên mặt hoặc tay chạm phụ kiện.

**7. Lỗi sớm**

G0: visual DNA chỉ là chuỗi tính từ; yêu cầu mỗi từ gắn một cơ chế nhìn thấy. G2: “cùng một ảnh mười lần” — contact sheet có cùng crop/eye level; đổi shot variables, không đổi identity invariants.

**8. Ví dụ**

Clip karin chứng minh một hệ ảnh chân dung có thể thành cấu trúc bằng crop, nhịp 3→2→1 phách và tách nền ở drop. Với T1 to 9, hiệu ứng cutout chỉ dùng nếu G2 duyệt; không lấy nó thay cho biến thể pose/camera.

## 6. Sản phẩm / thương hiệu

**1. Người xem cần gì sau phim**

Hiểu một lợi ích được **chứng minh bằng hình**, nhớ hình dáng/chất liệu và biết hành động tiếp theo; không dựa vào chữ để giải thích trong footage.

**2. Chuỗi câu hỏi tư duy G0 → cut map**

1. Một hành vi trước→sau nào chứng minh promise, thay vì chỉ tuyên bố “cao cấp/nhanh/tốt”?
2. Sản phẩm giải quyết ma sát nào; người dùng làm gì trước và sau?
3. Ba bằng chứng hình bắt buộc là form, material, function hay context—xếp thứ tự nào?
4. Khung 0 đặt vấn đề hay đặt hero; giây 5 người xem đang chờ demo gì?
5. Đạo cụ/sản phẩm cần khóa hình học, logo/chữ nào phải tránh vì model dễ viết sai?
6. Macro/detail nối với human use bằng hướng tay/eyeline ra sao?
7. Hero shot cuối xác nhận kết quả gì ngoài “sản phẩm xoay đẹp”?
8. G2: người chưa biết brief có nói đúng lợi ích chỉ bằng animatic không?

**3. Xương thời gian**

- 20 s: friction 0–3; reveal 3–6; demo I 6–10; demo II 10–14; result 14–17; hero/chữ ký 17–20.
- 30 s: friction 0–4; product 4–8; form/material 8–13; demo 13–20; proof/result 20–25; hero 25–28; chữ ký 28–30.
- 60 s: problem 0–7; product 7–13; proof I 13–23; proof II 23–34; use context 34–44; result 44–51; hero 51–56; end 56–60.

**4. Ngữ pháp máy**

Chủ đạo `shot-01`, `shot-12/12b`, `shot-11a/11b`, `shot-08`: đọc form và thao tác. Cao trào `shot-s6` pass-through hoặc `shot-07a` crash zoom chỉ khi chức năng/macro biện minh. Tránh handheld/orbit dài vì méo cạnh, nhãn, phản xạ và hình học sản phẩm.

**5. Lối cắt + dấu nhấn**

Hard cut theo thao tác; match shape/match action giữa macro và use. Dấu nhấn: (1) reveal sản phẩm; (2) function activation; (3) before→after; (4) hero/outro. Chữ/CTA chỉ ở lớp hậu kỳ cuối, không sinh trong ảnh/video.

**6. Model / độ phân giải / pilot**

720p cho macro, cạnh, reflection và hero; 480p cho context người dùng nếu sản phẩm không nhỏ. Fast cho locked/simple motion, 2.0 cho tay dùng sản phẩm, 2.5 cho transformation/macro phức tạp. Pilot shot tay–sản phẩm và shot giữ geometry/logo; nếu logo quan trọng, dùng asset/hậu kỳ được phép thay vì tin model viết.

**7. Lỗi sớm**

G0: benefit không nhìn thấy — phải cần caption mới hiểu; thay bằng hành vi đo được bằng hình. G2: sản phẩm đổi hình giữa shot; lập product lock, kiểm silhouette/chi tiết, loại shot không giữ được continuity.

**8. Ví dụ**

Bài học *mùa hè cuối cấp* về “code không vẽ vật thể” áp dụng trực tiếp: sản phẩm/bao bì/đạo cụ phải có trong asset/footage; code chỉ camera, ánh sáng, màu, nhịp và chữ ký/CTA hậu kỳ phù hợp.

## 7. Kỳ ảo / hiệu ứng cao trào

**1. Người xem cần gì sau phim**

Cảm kinh ngạc vì một luật hình ảnh leo thang có nguyên nhân, không phải vì các hiệu ứng rời rạc; muốn xem lại để hiểu cách setup biến thành payoff.

**2. Chuỗi câu hỏi tư duy G0 → cut map**

1. Luật thế giới một câu là gì; điều gì được phép biến đổi và điều gì bất biến?
2. Khung đầu chứng minh trạng thái bình thường nào để biến đổi sau đó có nghĩa?
3. Motif năng lượng/vật/chuyển động xuất hiện ba lần với mức tăng nào?
4. Nhân vật gây ra, chịu đựng hay lựa chọn biến đổi; động từ của họ là gì?
5. Mỗi lần leo thang bổ sung thông tin hay chỉ tăng kích thước/ánh sáng?
6. Hero transformation cần bao nhiêu world/state; có thể chia thành các shot với match point thay vì bắt một clip làm tất cả không?
7. Sau cao trào có aftermath 1–2 read để xác nhận giá trị đổi không?
8. G2: xem animatic placeholder—nếu bỏ VFX, setup/nhân quả còn rõ? Cut point nào che được morph xấu mà không mất hành động?

**3. Xương thời gian**

- 20 s: normal 0–3; anomaly 3–7; escalation 7–12; choice 12–14; transformation 14–18; aftermath 18–20.
- 30 s: normal 0–4; seed 4–9; escalation I 9–14; escalation II 14–20; choice 20–23; hero 23–28; aftermath 28–30.
- 60 s: normal 0–7; seed 7–14; rule test 14–23; cost 23–32; escalation 32–42; choice 42–47; hero transformation 47–55; aftermath 55–60.

**4. Ngữ pháp máy**

Chủ đạo trước cao trào `shot-01`, `shot-08`, `shot-14/14b` để giữ luật đọc được. Cao trào có thể dùng `shot-15/15b`, `shot-s3`, `shot-s6`, `shot-26`; chỉ một chuyển động chính mỗi shot. Tránh earth zoom `shot-s4` nếu không có chuỗi world asset; tránh chồng orbit + zoom + pass-through trong một prompt.

**5. Lối cắt + dấu nhấn**

Hard cut giữ logic state. Dấu nhấn: (1) anomaly đầu; (2) flash/âm ngắt ở ngưỡng; (3) match point vào hero world; (4) aftermath/outro. Chia transformation ở occlusion/full-frame surface nếu một clip không giữ nổi continuity.

**6. Model / độ phân giải / pilot**

480p cho buildup và môi trường; 720p cho mặt/hero state. Fast cho normal/static, 2.0 cho diễn phản ứng, 2.5 cho shot hiệu ứng nặng. Pilot chính shot hero khó nhất **trước batch**; kiểm từng frame, identity, tay, state đầu/cuối và usable handle.

**7. Lỗi sớm**

G0: escalation không có luật — mỗi beat là hiệu ứng khác; viết invariant và thang tăng. G2: hero chỉ tồn tại như câu prompt quá dài; tách thành state A → transition point → state B, mỗi shot một camera move.

**8. Ví dụ**

Workflow phim kiểu 《望鄉》 trong ghi chép Cổ Nhất phân bổ model mạnh cho nghiệp hoả/đốt sách/rồng lửa, model vừa cho diễn người, Fast cho shot nhìn đơn giản; bài học là dồn tài nguyên vào cao trào, không chạy model mạnh đồng loạt. Số giá cũ không được dùng để báo giá mới.

## 8. Beat-sync / 定格卡点

**1. Người xem cần gì sau phim**

Cảm cú rơi nhịp chính xác, nhận diện pattern rồi được thưởng bằng biến thể ở drop; muốn xem lại vì timing “đã”, không chỉ vì nhiều transition.

**2. Chuỗi câu hỏi tư duy G0 → cut map**

1. BGM thật có BPM, phách, build, khoảng ngắt, drop và tail ở đâu—đã đo hay chỉ đoán?
2. Pattern thời lượng nào tạo kỳ vọng (3→2→1 phách, hoặc cố định 2 phách), và đâu là lần phá pattern có chủ ý?
3. Trước drop, mỗi ảnh có một read khác nhau về crop/pose/silhouette không?
4. Drop dùng một “họ” hiệu ứng nào làm signature; nó phục vụ năng lượng hay che ảnh yếu?
5. Freeze/cutout cần subject separation nào; ảnh nào không đủ sạch để tách?
6. Cut point nằm ở onset hay giữa chuyển động; frame đầu shot mới có đọc được ngay không?
7. Chỉ 3–4 dấu nhấn toàn phim là gì nếu mỗi hard cut đều trúng beat?
8. G2: chạy animatic trên **nhạc thật** ở tốc độ thật; lệch vài frame ở kick/drop có làm mất cảm giác không?

**3. Xương thời gian**

- 20 s: establish groove 0–4; 3-phách/cụm dài 4–8; 2-phách 8–12; 1-phách build 12–14; drop pattern 14–18; tail 18–20.
- 30 s: intro 0–5; groove 5–11; build I 11–16; build II 16–19; pre-drop hold 19–20; drop 20–27; outro 27–30.
- 60 s: intro 0–8; groove A 8–18; build A 18–25; drop A 25–34; reset 34–39; build B 39–46; drop B 46–56; outro 56–60.

**4. Ngữ pháp máy**

Chủ đạo trong clip `shot-01`, `shot-05`, `shot-12/12b`; chuyển động nhỏ để cut grid rõ. Cao trào một `shot-03/03b`, `shot-07a/07b` hoặc `shot-15` rơi đúng beat. Tránh chase/handheld dài và chuyển động không có pha đóng vì khó chốt frame.

**5. Lối cắt + dấu nhấn**

Hard cut đúng beat là nền. Dấu nhấn điển hình: (1) nhịp cắt rút 3→2→1; (2) pre-drop hold/im; (3) freeze + cutout/card ở drop nếu G2 duyệt; (4) outro. Whip phải có chuyển động dẫn; không dùng sáu transition khác nhau để chứng minh kỹ thuật.

**6. Model / độ phân giải / pilot**

480p đủ cho montage/full-body nếu grade/grain thống nhất; 720p cho face hero/freeze được giữ lâu. Fast cho micro-motion, 2.0 cho pose/human action, 2.5 hiếm khi cần trừ hero effect. Pilot chính là một cụm 3–4 shot quanh drop, không chỉ một clip: kiểm cả usable frame và độ khớp nhạc.

**7. Lỗi sớm**

G0: timeline dựng từ BPM ước lượng; phải dùng nhạc thật trước khi sinh. G2: “đúng beat nhưng không có read” — ảnh hiện quá ngắn hoặc cùng composition; kiểm từng shot đủ thời gian nhận ra và pattern có hierarchy.

**8. Ví dụ**

Phân tích karin ghi nhận intro khoảng 12,7 s rút 3→2→1 phách, pre-drop giữ lâu hơn, drop đổi ảnh mỗi 2 phách với cutout trượt; đây là tham chiếu cấu trúc. T1 to 9 vẫn giữ luật 3–4 dấu nhấn và chỉ dùng card/cutout khi animatic duyệt.

## Bảng chọn loại phim

| Câu hỏi phân loại đầu tiên | Nếu “đúng nhất” | Loại chính |
|---|---|---|
| Giá trị nằm ở biến thiên cảm giác/liên tưởng hơn là nhân quả? | Motif + nhạc gánh phim | MV mood / ký ức |
| Có nhân vật muốn điều gì, gặp vật cản và payoff đổi nghĩa dữ kiện cũ? | Nhân quả gánh phim | Truyện ngắn + twist/payoff |
| Một nghi thức/đoàn tụ và quan hệ gia đình là trung tâm? | Hành động cho nhau gánh phim | Lễ hội / gia đình |
| Người xem cần hiểu tuyến, quy mô hoặc trải nghiệm của một nơi? | Không gian gánh phim | Du lịch / địa danh |
| Identity, pose, silhouette, garment/material là thứ phải nhớ? | Nhân vật như hình tượng gánh phim | Chân dung editorial |
| Cần chứng minh lợi ích/chức năng và giữ hình học vật thể? | Bằng chứng sử dụng gánh phim | Sản phẩm / thương hiệu |
| Luật thế giới và biến đổi leo thang dẫn tới hero effect? | State change gánh phim | Kỳ ảo / cao trào |
| Khoái cảm chính đến từ pattern phách, build và drop? | Timing gánh phim | Beat-sync / 定格卡点 |

### Phối loại

Chọn **một loại chính** bằng câu hỏi: “Nếu bỏ trục này, phim còn là chính nó không?” Loại chính quyết định G0, xương thời gian và tiêu chuẩn đạt. Chỉ thêm **tối đa một loại phụ** để mượn một cơ chế rõ: truyện + gia đình; du lịch + mood; editorial + beat-sync; sản phẩm + fantasy. Loại phụ không được mang cả workflow riêng vào: ghi đúng thứ được mượn (ví dụ “mượn nhịp 3→2→1 trước drop”), và khi xung đột thì mục tiêu người xem của loại chính thắng.
