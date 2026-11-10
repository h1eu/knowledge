#!/usr/bin/env node
/* Knowledge OS — Đồng bộ flutter/docs/session_NN → website/flutter-content.js.
   Cùng quy ước với tools/sync_android_session.js (xem header file đó), domain = flutter:
   key website = frontmatter `id` hoặc alias `FLUTTER_CONTENT['<id>'] = FLUTTER_CONTENT['<key cũ>']`,
   index.md gốc session → `flutter-session-NN-overview`, archify → website/archify/flutter/.
     node tools/sync_flutter_session.js 01 [--check] [--only=<id>] [--force] */
process.env.KOS_DOMAIN = 'flutter';
require('./sync_android_session.js').main();
