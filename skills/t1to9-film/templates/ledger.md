# Sổ chi · <tên phim>

Trần B = <số> <đơn vị> (Tuệ chốt ở G0, <ngày>). Mỗi sự kiện ghi một dòng, chỉ thêm, không sửa dòng cũ. Tổng tính từ cột `charged`.

| # | Thời điểm | Shot | Nhà cung cấp · model · res · s | Sự kiện | quoteId / taskId | idempotencyKey | Giá quote | charged | Lũy kế | Duyệt (approvals #) |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | | | | estimate | – | – | | 0 | 0 | – |

Sự kiện dùng một trong: `estimate`, `quote`, `submit`, `done`, `failed`, `refund`, `cancel`.
Trước mỗi lần `submit`, kiểm: lũy kế đã charged + đang chờ + quote mới ≤ phần B của gói đã duyệt.
Quota ảnh (Codex) và token ghi ở bảng riêng theo đơn vị thật, không cộng chung với điểm Sumi.
