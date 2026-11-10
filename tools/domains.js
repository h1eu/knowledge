/* ============================================================
   Knowledge OS — cấu hình domain cho các script đồng bộ / kiểm tra Markdown → website
   Domain dùng profile frontmatter Android (rule 06): `id` dạng <prefix>.<module>.<topic>.

   Chọn domain: biến môi trường KOS_DOMAIN (wrapper sync_flutter_session.js,
   verify-flutter-topics.js đặt sẵn) hoặc `--domain=<tên>`. Mặc định: android.
   ============================================================ */
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const DOMAINS = {
  android: {
    name: 'android',
    label: 'Android',
    docs: path.join(ROOT, 'knowledge', 'android', 'docs'),
    js: path.join(ROOT, 'website', 'android-content.js'),
    varName: 'ANDROID_CONTENT',
    idPrefix: 'android',
    archifyDir: 'android',
    defaultDomain: 'Android',
    overviewKey: (s) => `session-${s}-overview`,
    // Session có thư mục docs không theo mẫu session_NN (đúng đường dẫn trong map/android_mkdocs.yml)
    sessionDirs: { '09': 'jetpack_compose_ui', '10': 'coding_analyst_and_testing', '11': 'cicd_and_publish_store' },
    syncCmd: 'sync_android_session.js',
  },
  flutter: {
    name: 'flutter',
    label: 'Flutter',
    docs: path.join(ROOT, 'flutter', 'docs'),
    js: path.join(ROOT, 'website', 'flutter-content.js'),
    varName: 'FLUTTER_CONTENT',
    idPrefix: 'flutter',
    archifyDir: 'flutter',
    defaultDomain: 'Flutter Development',
    overviewKey: (s) => `flutter-session-${s}-overview`,
    sessionDirs: {},
    syncCmd: 'sync_flutter_session.js',
  },
};

function currentDomain(argv = process.argv.slice(2)) {
  const flag = argv.find((a) => a.startsWith('--domain='));
  const name = (flag ? flag.slice('--domain='.length) : process.env.KOS_DOMAIN) || 'android';
  const d = DOMAINS[name];
  if (!d) {
    console.error(`Domain không hợp lệ: ${name} (có: ${Object.keys(DOMAINS).join(', ')})`);
    process.exit(2);
  }
  return d;
}

module.exports = { ROOT, DOMAINS, currentDomain };
