#!/usr/bin/env node
/* Knowledge OS — Kiểm tra Topic Flutter (flutter/docs) theo cùng chuẩn với verify-android-topics.js
   (profile frontmatter Android, id flutter.<module>.<topic>, section bắt buộc của lesson template).
     node tools/verify-flutter-topics.js [--session=01] [--id=<id>] [từ khoá] */
process.env.KOS_DOMAIN = 'flutter';
require('./verify-android-topics.js').main();
