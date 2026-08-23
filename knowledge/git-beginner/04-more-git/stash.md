---
title: "git stash — Cất tạm thay đổi"
slug: "git-stash"
summary: "Đang sửa dở filter bị gọi fix gấp: cất việc vào ngăn xếp, xử lý nóng, quay lại đúng chỗ — kèm quy tắc phân biệt stash với commit."
tags: ['git', 'stash', 'workflow']
prerequisites: ['git-commit', 'git-branches-merge']
related: ['git-revert-hard-reset', 'git-pull-fetch']
next: "git-cherry-pick"
previous: "git-rebase-merge-squash"
difficulty: beginner
read_time: "9 phút"
learning_outcomes:
  - Cất và lấy lại việc dở bằng stash push -m / stash pop.
  - Phân biệt stash (tạm, ngoài lịch sử, local) với commit (vĩnh viễn).
  - Biết -u để cất cả file mới chưa track.
knowledge_gap: "Dùng stash làm kho dài hạn — không được push, đổi máy mất trắng."
---

# git stash — Cất tạm thay đổi

> **Bối cảnh:** Bạn đang sửa dở `filter.js` (chưa đủ đẹp để commit), thì Bình nhắn khẩn: *"Bug hiển thị trên Safari gấp lắm, fix giúp tao 15 phút."* Switch nhánh? Git chặn ngay:

```text
error: Your local changes to the following files would be overwritten by checkout:
        js/filter.js
Please commit your changes or stash them before you switch branches.
```

Commit rác `"wip"`? Không. Mất công đã làm? Càng không. Cần **ngăn xếp tạm thời**.

## Bước 1: Cất việc dở

```bash
git stash push -m "filter dropdown - còn thiếu validate"
```

Output:

```text
Saved working directory and index state On feature/filter: filter dropdown - còn thiếu validate
```

Working directory sạch bong ngay lập tức — xác nhận:

```bash
git status        # nothing to commit, working tree clean
```

Giờ switch nhánh thoải mái, fix bug cho Bình, commit, push.

## Bước 2: Quay lại và lấy việc ra

```bash
git switch feature/filter
git stash pop
```

Output:

```text
On branch feature/filter
Changes not staged for commit:
        modified:   js/filter.js
Dropped refs/stash@{0} (a1b2c3d...)
```

`filter.js` trở về đúng trạng thái dở dang như trước khi đi. `pop` = lấy ra **và** xóa khỏi ngăn xếp.

## Bộ lệnh đầy đủ

```bash
git stash list                  # xem chồng các bản đã cất
git stash apply                 # lấy bản mới nhất nhưng GIỮ trong chồng
git stash pop stash@{1}         # lấy bản số 1 (đánh từ 0)
git stash drop stash@{0}        # vứt một bản cụ thể
git stash -u                    # cất cả file mới chưa track (mặc định bỏ qua!)
```

`list` hiển thị:

```text
stash@{0}: On feature/filter: filter dropdown - còn thiếu validate
stash@{1}: WIP on main: b7c8d9e Add empty state
```

> [!TIP]
> Luôn đặt tên bằng `-m`. Một tuần sau nhìn `stash@{0}` trống trơn không ai nhớ mình cất gì; message là tấm vé đòi đồ.

## Stash khác commit ở chỗ nào?

| | Commit | Stash |
|---|---|---|
| Vị trí | Trong lịch sử branch, vĩnh viễn | Ngoài lịch sử, tạm thời |
| Chia sẻ qua push | Có | Không — chỉ nằm máy bạn |
| Dành cho | Việc hoàn chỉnh có ý nghĩa | Việc dở dang giữa chừng |

Nguyên tắc chọn: thứ gì đáng kể lại câu chuyện dự án → commit. Thứ gì chỉ cần **sống sót qua một lần chuyển ngữ cảnh** → stash.

## Mẫu workflow hoàn chỉnh

```bash
# 14h00 — đang làm feature A
git stash push -m "feature A dở dang"

# 14h05 — fix nóng trên main
git switch main && git pull
# ... sửa bug.js, test ...
git commit -am "Fix Safari rendering glitch" && git push

# 15h00 — về tiếp việc cũ
git switch feature-a
git stash pop
```

## Sai lầm thường gặp

- Stash xong quên bét → một tháng sau `stash list` thấy hai bản không ai nhận ra; dùng `-m` và dọn định kỳ.
- `pop` gặp conflict rồi panic — xử lý như merge conflict thường; nếu dùng `apply` thì bản gốc vẫn còn trong chồng.
- Quên `-u` nên tưởng stash nuốt mất file mới tạo — file untracked chưa bao giờ được cất.

## References

- [Pro Git 7.3: Stashing](https://git-scm.com/book/en/v2/Git-Tools-Stashing-and-Cleaning)
- [git-stash docs](https://git-scm.com/docs/git-stash)

## Học tiếp

[git cherry-pick](cherry-pick.md) — fix timezone của Chi cần vá nóng lên release mà không merge cả nhánh.
