# Camera moves cho phim T1 to 9

Nguồn khung chuyển động: **aicameramovements.com** (thư viện miễn phí cho cộng đồng làm phim AI), tải một lần ngày 2026-11-04. Codex chưng cất, Claude soát lại. Tên, hướng, tốc độ, framing và end của 46 mục là diễn đạt lại từ trang, gắn nhãn `[site]`. Chức năng kể chuyện, cách dùng trong khung 9:16, rủi ro i2v và tay cắt là phân tích, gắn nhãn `[suy luận]`: chưa test trên Seedance, nên khi pilot thấy khác thì sửa bảng này.

## Căn cứ sách (Claude đọc đủ trang qua film-library ngày 2026-11-04)

- **Máy chuyển động để làm gì:** máy chuyển động làm lộ thêm không gian, đưa thông tin mới vào hình, và khiến vật thể trông khối hơn. Người xem cảm nhận chuyển động của máy như chính mình đang di chuyển: tiến thì thấy lại gần, cẩu lên thì thấy hơi bay bổng. Máy cầm tay gợi góc nhìn chủ quan hoặc cảm giác bất an (Bordwell & Thompson, *Film Art*, page_label 218). Vì vậy cột "máy đang nói" trong bảng mô tả **cảm giác của người xem**, không mô tả thiết bị.
- **Zoom khác dolly:** zoom giữ nguyên phối cảnh và kéo một phần bố cục lại gần hoặc ra xa người xem. Dolly đổi phối cảnh, nên người xem cảm thấy chính mình đang tiến hoặc lùi. Chức năng chính của zoom là đổi bố cục để thêm vào hoặc loại bỏ chi tiết (Mercado, *The Filmmaker's Eye*, page_label 142). Hệ quả cho prompt: muốn có parallax thì viết dolly (`摄影机前移`), đừng viết zoom (`变焦`).
- **Cắt cần động cơ:** mỗi lần đổi góc nhìn nên có một hành động hoặc chuyển động máy dẫn mắt sang shot sau, ví dụ một cái ngước nhìn, hay một cú lia dừng đúng ở vật sắp được cắt cận (Reisz & Millar, page_label 165). Cột "tay cắt" và mục `落幅` có mặt vì lý do này.
- **Chuyển động máy theo chủ thể:** chuyển động bám theo người thường lấy động cơ từ chính chuyển động của người đó. Máy tự trôi mà không có động cơ dễ bị đọc thành góc nhìn của một người vô hình (Mercado page_label 182, mới đọc snippet).

## Nguyên lý

- **Tách camera khỏi cảnh:** phần cảnh trả lời *ai/ở đâu/làm gì/cảm giác gì*; phần camera là một mô-đun có thể tái dùng khi thay khung đầu. `[site]`
- **Một chuyển động chính mỗi shot:** ưu tiên một động từ máy rõ; nhiều lệnh đồng thời khiến i2v tự hoà giải, dễ trôi bố cục và biến dạng. `[suy luận]`
- **Luôn viết `落幅` (End):** yêu cầu một đích đến đọc được và ổn định; đó là tay cắt để hard cut, match cut hoặc whip không phải cứu ở hậu kỳ. `[site] [suy luận]`
- **9:16 không phải 16:9 bị cắt hai bên:** chiều ngang ngắn nên pan/truck chỉ nên đi quãng ngắn, từ một neo thị giác sang một neo; tránh quét cảnh rộng hoặc để chủ thể chạy khỏi safe zone giữa. Chiều dọc dài giúp tilt/pedestal/crane đọc tốt người, kiến trúc và chuyển tầng; vẫn phải chốt đích trên/dưới. `[suy luận]`
- **Hard cut là nền:** chuyển động trong shot phục vụ ý và tạo pha đóng; whip chỉ dùng khi chính chuyển động đã chuẩn bị cho whip. 3–4 dấu nhấn cho cả phim, chữ ký chỉ ở cuối. `[suy luận]`

## Khuôn prompt i2v zh-CN

Giữ hai khối tách biệt; thay **场景** mà không cần viết lại **镜头**:

```text
【场景】主体：___。地点：___。动作：___（起始状态___，结束状态___）。氛围：___。
【镜头】运镜：___（chỉ một chuyển động chính）。速度：___。构图：9:16竖幅，___始终清晰可读。落幅：镜头最终稳定落在___，保持约0.5秒，便于剪辑。
保持人物面部、手指和道具与首帧一致，不新增人物或物体，画面中不出现任何文字；只保留现场声，不要背景音乐。
```

`起始状态/结束状态` thuộc hành động cảnh; `运镜/速度/构图/落幅` thuộc camera. Khoảng giữ 0,5 s là quy ước workflow T1 to 9, không phải dữ liệu của site. `[suy luận]`

## Dolly / Track (9)

| id · tên VI | Máy đang “nói” / dùng trong T1 to 9 9:16 | Rủi ro i2v | Câu zh-CN dùng ngay | Tay cắt |
|---|---|---|---|---|
| `shot-08` · Dolly tiến | “Hãy lại gần điều này”; nhấn nhận ra, thân mật hoặc đe doạ. Dùng quãng ngắn, giữ mặt/vật ở trục giữa. `[site] [suy luận]` | Mặt phồng, nền co sai, thành zoom số. `[suy luận]` | `运镜：摄影机直线缓慢前移。速度：平稳克制。构图：主体位置稳定。落幅：停在清晰近景并保持。` | Đầu rộng → cuối cận; hard cut vào chi tiết hoặc match scale. `[suy luận]` |
| `shot-09` · Dolly lùi | “Thế giới lớn hơn/người đang xa đi”; reveal cô độc, hậu quả, kết đoạn. `[site] [suy luận]` | Model thu nhỏ người thay vì mở không gian; tự sinh vật ở rìa. `[suy luận]` | `运镜：摄影机沿直线缓慢后退。速度：均匀。构图：主体持续可读，环境逐步展开。落幅：稳定停在大全景。` | Cận → rộng rõ; hard cut sang không gian khác hoặc outro. `[suy luận]` |
| `shot-16` · Bám theo | “Đi cùng nhân vật”; dùng cho hành trình có một hướng, thân người đủ lớn trong dọc. `[site] [suy luận]` | Chân trượt, tốc độ máy và người lệch, nền chảy. `[suy luận]` | `运镜：摄影机随主体同行。速度：严格匹配步速。构图：主体在竖幅中央持续清晰。落幅：保持移动构图后稳定收住。` | Cắt giữa hành động khi bước/động tác khớp. `[suy luận]` |
| `shot-17` · Theo sau / qua vai | “Ta theo họ vào điều chưa biết”; hợp mở cửa, đi ngõ, tiến tới payoff. `[site] [suy luận]` | Lưng/đầu đổi hình, đường đi tự uốn, vai che hết khung dọc. `[suy luận]` | `运镜：肩高跟随主体背后前进。速度：匹配步速。构图：肩背作前景，前路清晰。落幅：停在目的地前。` | Vai/khung cửa làm wipe tự nhiên; hard cut khi đến đích. `[suy luận]` |
| `shot-18` · Bám lùi chính diện | “Đọc cảm xúc trong khi họ tiến tới”; dùng diễn xuất vừa phải, không thoại. `[site] [suy luận]` | Mặt drift, chân trượt, camera va/giật; nền lặp. `[suy luận]` | `运镜：摄影机在主体前方同步后退。速度：匹配前行。构图：正面中近景稳定。落幅：主体停步，镜头稳定。` | Cuối khi nhân vật dừng/nhìn; hard cut sang thứ họ thấy. `[suy luận]` |
| `shot-19` · Bám ngang | “Hành trình đang diễn ra”; cho đi bộ, xe đạp, chạy vừa, profile rõ. `[site] [suy luận]` | 9:16 ít đường ngang, chủ thể thoát khung; chân/tay méo. `[suy luận]` | `运镜：摄影机与主体平行侧向跟拍。速度：匹配主体。构图：侧面轮廓居中。落幅：动作完整后稳定收住。` | Match direction qua shot kế; cắt giữa bước chân. `[suy luận]` |
| `shot-20` · Bám thấp | “Hành động/đạo cụ này có trọng lượng”; dùng chân, bánh xe, hành lý, không lạm dụng. `[site] [suy luận]` | Chân, giày, bánh xe hợp nhất; mặt đất chảy. `[suy luận]` | `运镜：低机位沿运动路径跟拍。速度：匹配脚步。构图：脚部与地面关系清楚。落幅：停在一个完整落脚动作。` | Cắt trên cú đặt chân/bánh dừng; match action tốt. `[suy luận]` |
| `shot-21` · Bám phương tiện | “Chuyến đi có động lượng”; địa danh/du lịch, xe nằm ổn trong dọc thay vì toàn cảnh ngang. `[site] [suy luận]` | Xe đổi mẫu, bánh quay sai, đường/nền tan. `[suy luận]` | `运镜：摄影机与车辆同速跟拍。速度：稳定。构图：车辆在竖幅中央，路线可读。落幅：车辆与环境均清晰。` | Cắt theo hướng xe; match direction hoặc hard cut tới điểm đến. `[suy luận]` |
| `shot-22` · Đuổi bắt | “Nguy cơ sát phía sau”; chỉ cho cao trào ngắn, chủ thể luôn nhìn thấy. `[site] [suy luận]` | Rung quá mức, giải phẫu vỡ, mất chủ thể, usable rất ngắn. `[suy luận]` | `运镜：摄影机贴近主体快速追随。速度：迅速、有反应。构图：允许小幅重构但主体不离开画面。落幅：追至明确障碍前收住。` | Pha cuối có hướng mạnh để hard cut/whip; pilot bắt buộc. `[suy luận]` |

## Zoom / Lens (6)

| id · tên VI | Máy đang “nói” / dùng trong T1 to 9 9:16 | Rủi ro i2v | Câu zh-CN dùng ngay | Tay cắt |
|---|---|---|---|---|
| `shot-05` · Zoom chậm vào | “Hãy chú ý dần”; mood, ký ức, sản phẩm nhỏ; ít parallax hơn dolly. `[site] [suy luận]` | Phóng số làm mềm mặt/chi tiết; tự biến thành dolly. `[suy luận]` | `运镜：镜头缓慢变焦推近。速度：渐进均匀。构图：视觉目标始终清楚。落幅：稳定停在更紧构图。` | Match scale hoặc hard cut sau 0,5 s giữ. `[suy luận]` |
| `shot-05b` · Zoom chậm ra | “Lùi lại để hiểu bối cảnh”; reveal quan hệ người–nơi, kết buồn/nhẹ. `[site] [suy luận]` | Rìa khung sinh thêm chi tiết, chủ thể co/méo. `[suy luận]` | `运镜：镜头缓慢变焦拉远。速度：渐进均匀。构图：主体可读，环境逐步出现。落幅：停在稳定广景。` | Cuối rộng nối địa danh/đoạn mới bằng hard cut. `[suy luận]` |
| `shot-06` · Zoom nhanh vào | “Đây!”; phát hiện vật/mặt ở dấu nhấn, dùng một lần. `[site] [suy luận]` | Vỡ chi tiết 480p, mục tiêu nhảy tâm, motion smear. `[suy luận]` | `运镜：快速变焦推向核心目标。速度：果断。构图：目标保持居中可读。落幅：锐利停在近景。` | Điểm rơi đúng beat; hard cut ngay sau khung ổn. `[suy luận]` |
| `shot-06b` · Zoom nhanh ra | “Sự thật lớn hơn ta tưởng”; reveal nhanh bối cảnh/tình thế. `[site] [suy luận]` | Ngoại cảnh bị bịa, viền dọc méo, scale giật. `[suy luận]` | `运镜：快速变焦拉远。速度：果断。构图：主体不丢失，周围空间迅速显现。落幅：稳定停在广景。` | Cut on beat sang reaction hoặc giữ reveal. `[suy luận]` |
| `shot-07a` · Crash zoom vào | “Cú sốc nằm ở đây”; hợp beat-sync/kỳ ảo, không hợp cảm xúc tinh tế. `[site] [suy luận]` | 480p vỡ mặt/chữ liệu, méo mạnh và overshoot. `[suy luận]` | `运镜：猛然变焦冲向目标。速度：极快有冲击。构图：目标全程可辨。落幅：落在强烈近景并立即稳定。` | Dấu nhấn đúng kick; hard cut hoặc flash kem có lý do. `[suy luận]` |
| `shot-07b` · Crash zoom ra | “Bật tung quy mô”; reveal gag, thất bại hoặc cao trào hình học. `[site] [suy luận]` | Model phải dựng thêm nhiều cảnh; viền và nền vỡ. `[suy luận]` | `运镜：猛然变焦拉远。速度：极快有冲击。构图：中心目标可辨。落幅：落在大胆广景并稳定。` | Rơi đúng beat; nối wide→wide hoặc hard cut phản ứng. `[suy luận]` |

## Drone / Crane (5)

| id · tên VI | Máy đang “nói” / dùng trong T1 to 9 9:16 | Rủi ro i2v | Câu zh-CN dùng ngay | Tay cắt |
|---|---|---|---|---|
| `shot-25` · Cẩu lên | “Thoát khỏi mức người để thấy quy mô”; lễ hội/địa danh/kết mở. `[site] [suy luận]` | Kiến trúc kéo dài, người nhân bản; nhầm với tilt. `[suy luận]` | `运镜：摄影机在开放空间平稳升高。速度：缓慢受控。构图：主体与地点持续可读。落幅：稳定停在高位全景。` | Thấp→cao; hard cut sang establishing hoặc outro. `[suy luận]` |
| `shot-25b` · Cẩu xuống | “Từ thế giới lớn tìm đúng con người”; mở phim/địa danh vào nhân vật. `[site] [suy luận]` | Đích nhỏ dễ đổi danh tính, mặt chỉ rõ muộn. `[suy luận]` | `运镜：摄影机平稳下降。速度：缓慢受控。构图：始终指向下方目标。落幅：停在清晰人物或目的地。` | Cuối thấp rõ để hard cut vào trung/cận. `[suy luận]` |
| `shot-26` · Drone tiến | “Bay vào nơi cần khám phá”; du lịch, lễ hội, fantasy world entry. `[site] [suy luận]` | Cảnh sâu bị bịa liên tục, collision, texture chảy. `[suy luận]` | `运镜：航拍镜头沿开放路线平稳向前。速度：受控滑行。构图：路线与目的地清楚。落幅：抵达较近航拍构图。` | Khung đích làm establishing kế; pass-by nếu có cổng thật. `[suy luận]` |
| `shot-26b` · Drone lùi | “Nơi này lớn hơn khoảnh khắc”; kết địa danh/sản phẩm gắn cảnh quan. `[site] [suy luận]` | Mở quá nhiều thế giới, chủ thể biến mất, đường chân trời cong. `[suy luận]` | `运镜：航拍镜头平稳后退。速度：受控。构图：主体持续可读，景观逐步展开。落幅：停在宽阔航拍全景。` | Wide ổn cho outro hoặc hard cut theo hình khối. `[suy luận]` |
| `shot-27` · Trực thăng tầm cao | “Quan sát toàn cục”; chỉ khi cảnh quan là nội dung, không dùng để chữa thiếu truyện. `[site] [suy luận]` | Cần world consistency lớn; chi tiết địa danh giả, quy mô phẳng. `[suy luận]` | `运镜：高空沿宽缓航线移动。速度：稳定。构图：地貌或远处目标可读。落幅：稳定停在高空全景。` | Wide→wide hard cut; khó match với cận, cần establishing rõ. `[suy luận]` |

## Pan / Tilt (7)

| id · tên VI | Máy đang “nói” / dùng trong T1 to 9 9:16 | Rủi ro i2v | Câu zh-CN dùng ngay | Tay cắt |
|---|---|---|---|---|
| `shot-01` · Máy cố định | “Hãy nhìn hành động, không nhìn máy”; đạo cụ, diễn xuất, time-lapse, payoff yên. `[site] [suy luận]` | Model vẫn creep/zoom; người/nền thở. `[suy luận]` | `运镜：固定机位，全程不移动。速度：静止稳定。构图：角度、高度、焦距不变。落幅：保持同一构图。` | Khung đầu/cuối gần nhau, hard cut hoặc match action sạch. `[suy luận]` |
| `shot-02` · Lia phải | “Khám phá thứ ở bên phải”; 9:16 chỉ reveal một neo, không quét panorama. `[site] [suy luận]` | Horizon lệch, vật kéo dài, chủ thể rời khung nhanh. `[suy luận]` | `运镜：机位不动，摄影机从左向右平稳摇摄。速度：恒定。构图：地平线水平。落幅：落在右侧明确目标。` | A→B đọc được; hard cut ở B hoặc nối whip phải. `[suy luận]` |
| `shot-02b` · Lia trái | “Quay lại/khám phá phía trái”; reveal reaction hoặc motif. `[site] [suy luận]` | Như pan phải; hướng nhìn dễ sai continuity. `[suy luận]` | `运镜：机位不动，摄影机从右向左平稳摇摄。速度：恒定。构图：地平线水平。落幅：落在左侧明确目标。` | A→B; bảo toàn hướng màn ảnh khi hard cut. `[suy luận]` |
| `shot-03` · Whip phải | “Bị kéo gấp sang sự kiện mới”; chỉ khi shot có động lực phải. `[site] [suy luận]` | Blur che biến dạng nhưng điểm rơi thường không sắc; target đổi mặt. `[suy luận]` | `运镜：向右快速甩镜。速度：瞬间加速，途中短暂运动模糊。构图：起幅与落幅都清晰。落幅：锐利落在右侧目标。` | Blur ngang là tay nối whip phải; không dùng nếu B không cùng hướng. `[suy luận]` |
| `shot-03b` · Whip trái | “Bị kéo gấp sang sự kiện bên trái”; dấu nhấn hiếm. `[site] [suy luận]` | Như whip phải; dễ thành rung vô hướng. `[suy luận]` | `运镜：向左快速甩镜。速度：瞬间加速，途中短暂运动模糊。构图：起幅与落幅都清晰。落幅：锐利落在左侧目标。` | Nối whip trái, hoặc hard cut sau điểm rơi sắc. `[suy luận]` |
| `shot-04` · Ngẩng máy | “Đi lên để tôn cao/reveal”; 9:16 hợp người toàn thân, cây, cổng, kiến trúc. `[site] [suy luận]` | Thân/công trình kéo dài, bầu trời tự sinh, mất đích trên. `[suy luận]` | `运镜：固定机位向上平稳俯仰。速度：恒定。构图：竖向主体保持居中。落幅：落在上方明确目标。` | Dưới→trên; match vertical line hoặc hard cut ở đích. `[suy luận]` |
| `shot-04b` · Cúi máy | “Đi xuống để phát hiện/đặt chân xuống thực tại”; mặt→tay/vật, mái→người. `[site] [suy luận]` | Tay/đạo cụ biến dạng khi vào khung; mặt mất consistency. `[suy luận]` | `运镜：固定机位向下平稳俯仰。速度：恒定。构图：竖向关系清楚。落幅：落在下方明确目标。` | Trên→dưới; cắt vào detail cùng hình/động tác. `[suy luận]` |

## Physical Moves (11)

| id · tên VI | Máy đang “nói” / dùng trong T1 to 9 9:16 | Rủi ro i2v | Câu zh-CN dùng ngay | Tay cắt |
|---|---|---|---|---|
| `shot-10` · Truck phải | “Đổi quan hệ lớp cảnh”; dùng ngắn với tiền cảnh rõ, không thay pan. `[site] [suy luận]` | 9:16 thiếu hành lang ngang; parallax sai, vật cắt xuyên. `[suy luận]` | `运镜：摄影机水平直线向右平移。速度：平稳恒定。构图：镜头方向不变，层次滑过。落幅：停在右侧新角度。` | Tiền cảnh che lens tạo wipe; hoặc hard cut ở bố cục mới. `[suy luận]` |
| `shot-10b` · Truck trái | “Dịch góc nhìn sang trái”; reveal quan hệ không gian ngắn. `[site] [suy luận]` | Như truck phải; dễ bị hiểu thành pan. `[suy luận]` | `运镜：摄影机水平直线向左平移。速度：平稳恒定。构图：镜头方向不变。落幅：停在左侧新角度。` | Foreground wipe/hard cut; giữ hướng continuity. `[suy luận]` |
| `shot-11a` · Pedestal lên | “Nâng toàn bộ điểm nhìn”; reveal từ vật lên người mà không đổi góc lens. `[site] [suy luận]` | Nhầm thành tilt/zoom, chiều cao người thay đổi. `[suy luận]` | `运镜：整台摄影机垂直上升。速度：平稳恒定。构图：镜头保持水平、方向不变。落幅：停在较高构图。` | Match trục dọc; hard cut khi tầng trên rõ. `[suy luận]` |
| `shot-11b` · Pedestal xuống | “Hạ điểm nhìn về chi tiết/nền”; sản phẩm, tay, dấu vết. `[site] [suy luận]` | Nhầm tilt; sàn/vật dưới tự biến. `[suy luận]` | `运镜：整台摄影机垂直下降。速度：平稳恒定。构图：镜头保持水平。落幅：停在较低构图。` | Cắt vào detail ở điểm thấp hoặc match shape. `[suy luận]` |
| `shot-12` · Slider phải | “Tạo parallax tinh tế”; editorial/sản phẩm/mood, biên độ nhỏ. `[site] [suy luận]` | Tóc, cạnh sản phẩm, foreground xé; quá tay thành orbit. `[suy luận]` | `运镜：摄影机小幅向右滑动。速度：缓慢受控。构图：前中后景层次清楚。落幅：停在精致右侧角度。` | Khung cuối sạch cho hard cut/match silhouette. `[suy luận]` |
| `shot-12b` · Slider trái | “Lướt để thấy chất liệu/lớp cảnh”; đổi góc nhỏ, sang trọng. `[site] [suy luận]` | Như slider phải; phản xạ/vật liệu trôi. `[suy luận]` | `运镜：摄影机小幅向左滑动。速度：缓慢受控。构图：层次与视差清楚。落幅：停在精致左侧角度。` | Match texture/silhouette hoặc hard cut. `[suy luận]` |
| `shot-13` · Tiến xuyên qua tiền cảnh | “Bước qua ngưỡng”; vào nhà, qua rèm/cửa/cành có sẵn. `[site] [suy luận]` | Foreground dính vào lens, tự sinh cửa, va chạm hình học. `[suy luận]` | `运镜：摄影机向前掠过可见前景边缘。速度：平滑。构图：前景贴近镜头，后方空间逐渐清楚。落幅：停在前景之后。` | Occlusion thật làm tay hard cut/wipe; pilot nếu mặt xuất hiện sau ngưỡng. `[suy luận]` |
| `shot-14` · Arc phải | “Đổi sắc thái quan hệ mà vẫn giữ chủ thể”; portrait/hero ngắn. `[site] [suy luận]` | Mặt và tai biến dạng, nền quay sai, bán kính trôi. `[suy luận]` | `运镜：沿浅弧向主体右侧移动。速度：平稳。构图：距离、高度与主体清晰度不变。落幅：停在右侧新角度。` | Đầu/cuối đều portrait; match eyeline hoặc hard cut reaction. `[suy luận]` |
| `shot-14b` · Arc trái | “Nhìn nhân vật theo góc mới”; thay đổi quyền lực/thân mật nhẹ. `[site] [suy luận]` | Như arc phải; hướng sáng và mặt drift. `[suy luận]` | `运镜：沿浅弧向主体左侧移动。速度：平稳。构图：距离、高度稳定。落幅：停在左侧新角度。` | Match eyeline/silhouette; giữ điểm rơi ổn. `[suy luận]` |
| `shot-15` · Orbit thuận chiều kim đồng hồ | “Thế giới xoay quanh chủ thể”; kỳ ảo/hero cao trào, dùng cung ngắn hơn vòng tròn. `[site] [suy luận]` | Rất dễ biến dạng mặt, tay, tóc; nền quay và ánh sáng bất nhất. `[suy luận]` | `运镜：以固定半径顺时针环绕主体一小段。速度：平稳受控。构图：主体始终居中。落幅：停在明确新角度。` | Cung kết rõ để hard cut; có thể match rotation, phải pilot. `[suy luận]` |
| `shot-15b` · Orbit ngược chiều kim đồng hồ | “Đảo chiều/giải phóng năng lượng”; fantasy/editorial cao trào. `[site] [suy luận]` | Như orbit thuận; full circle đòi consistency quá lớn. `[suy luận]` | `运镜：以固定半径逆时针环绕主体一小段。速度：平稳受控。构图：主体居中。落幅：停在明确新角度。` | Match rotation ngược hoặc hard cut ở pose ổn; pilot. `[suy luận]` |

## Human Camera (2)

| id · tên VI | Máy đang “nói” / dùng trong T1 to 9 9:16 | Rủi ro i2v | Câu zh-CN dùng ngay | Tay cắt |
|---|---|---|---|---|
| `shot-23` · Cầm tay | “Ta đang ở đó”; thân mật, gấp, tài liệu; chỉ sway nhỏ để vẫn đọc mặt. `[site] [suy luận]` | Model biến “tự nhiên” thành rung mạnh, wobble hình, khó cắt. `[suy luận]` | `运镜：自然手持，只有轻微身体起伏和微调。速度：有机但克制。构图：主体始终清晰。落幅：自然稳定收住。` | Hard cut ở nhịp sway thấp; không ghép whip giả. `[suy luận]` |
| `shot-24` · Gắn thân / Snorricam | “Mắc kẹt trong cảm giác của nhân vật”; hoảng loạn, say, biến đổi nội tâm. `[site] [suy luận]` | Mặt bị khoá cứng nhưng cơ thể biến dạng, nền xoáy; gây mệt trong dọc. `[suy luận]` | `运镜：摄影机相对主体躯干固定。速度：随身体动作。构图：近距离居中锁定面部，背景移动。落幅：主体仍锁定并稳定。` | Cắt khi cơ thể dừng; match gaze hoặc smash cut sang POV. `[suy luận]` |

## Specials (6)

| id · tên VI | Máy đang “nói” / dùng trong T1 to 9 9:16 | Rủi ro i2v | Câu zh-CN dùng ngay | Tay cắt |
|---|---|---|---|---|
| `shot-s1` · Góc nhìn thứ nhất | “Bạn là nhân vật”; hành động tay/đi tới vật, chỉ khi tay đã có trong ảnh gốc. `[site] [suy luận]` | Tay/ngón lỗi, body edge tự sinh, motion sickness. `[suy luận]` | `运镜：第一人称视角在人眼高度前进。速度：自然步行。构图：可见的手臂作为身体参照。落幅：从同一视角到达动作点。` | Bàn tay chạm/đến đích để match action; pilot giải phẫu. `[suy luận]` |
| `shot-s2` · Tilt-shift mô hình | “Thế giới như mô hình/nhịp sống nhỏ bé”; địa danh/time-lapse có chủ ý. `[site] [suy luận]` | Dải nét sai, mặt/người nhòe, hiệu ứng giả như blur hậu kỳ. `[suy luận]` | `运镜：高位斜俯视小幅滑动。速度：精确缓慢。构图：主体区域保持窄带清晰，上下柔焦。落幅：微缩尺度保持完整。` | Wide graphic hard cut; match hình học/màu. `[suy luận]` |
| `shot-s3` · Zoom vô hạn | “Đi xuyên tầng ý nghĩa/thế giới”; kỳ ảo, motif tròn/tâm rõ. `[site] [suy luận]` | Cần nhiều thế giới liền mạch, target lệch tâm, texture morph; rất rủi ro. `[suy luận]` | `运镜：持续向画面正中心无限推近。速度：平滑并逐渐加速。构图：圆形目标始终居中。落幅：下一视觉世界完全充满画面。` | Thế giới B lấp đầy khung để hard/match cut; pilot hero. `[suy luận]` |
| `shot-s4` · Earth zoom out | “Khoảnh khắc nhỏ trong quy mô hành tinh”; chỉ khi ý nghĩa cần cú lùi cực lớn. `[site] [suy luận]` | Cần street→city→landscape→planet; i2v 4–6 s khó giữ địa điểm, nhiều world generation. `[suy luận]` | `运镜：从起点快速向上拉远，依次展开街道、城市、地貌与行星。速度：快速扩张。构图：原地点始终在中心。落幅：停在行星尺度。` | Chỉ cắt khi planet ổn; thường cần chia shot/asset, không mặc định dùng. `[suy luận]` |
| `shot-s5` · Time-lapse | “Thời gian đã đi qua”; lễ hội chuẩn bị, địa danh ngày→đêm, sản phẩm theo chu kỳ. `[site] [suy luận]` | Vật/người nhấp nháy, ánh sáng không vật lý, camera creep. `[suy luận]` | `运镜：固定机位延时摄影。速度：时间快速流逝，摄影机稳定。构图：地平线与画面不变。落幅：同一机位呈现时间结果。` | Same framing giúp match cut trước/sau; hard cut theo đổi sáng. `[suy luận]` |
| `shot-s6` · Xuyên qua vật thể | “Phá ranh giới để sang thế giới khác”; fantasy/product macro, bề mặt phải nhìn thấy. `[site] [suy luận]` | Hình học tan, tự bịa nội thất, cảm giác xuyên vật vô cớ. `[suy luận]` | `运镜：摄影机朝可见表面居中前进并穿入后方空间。速度：平滑。构图：过渡面始终居中。落幅：稳定抵达被揭示的空间。` | Bề mặt full-frame làm transition point; match cut sang không gian B, pilot. `[suy luận]` |

## Quy tắc chọn nhanh

- Muốn **đọc cảm xúc**: ưu tiên `shot-01`, `shot-08`, `shot-05`, `shot-18`; máy càng phô càng dễ lấn diễn. `[suy luận]`
- Muốn **đọc không gian dọc**: `shot-04/04b`, `shot-11a/11b`, `shot-25/25b`; có đích rơi rõ. `[suy luận]`
- Muốn **động lượng ngang** trong 9:16: `shot-19`, `shot-10/10b`, `shot-12/12b` nhưng giảm quãng đi, neo chủ thể ở vùng giữa và dùng tiền cảnh/parallax để chứng minh camera thật sự dịch chuyển. `[suy luận]`
- Shot cần pilot trước batch: chase, POV có tay, orbit, infinite/earth zoom, pass-through, hai người chạm đạo cụ, hoặc bất kỳ cận mặt hero nào không có usable handle dự phòng. `[suy luận]`
