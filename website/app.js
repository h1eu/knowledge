/* ============================================================
   Knowledge OS — Application Logic
   ============================================================ */

// ── Data ────────────────────────────────────────────────────────
// ── Data ────────────────────────────────────────────────────────
// SVG icons for domains with precision vector craftsmanship & vivid calibrated gradients
const DOMAIN_ICONS = {
  backend: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <defs>
        <linearGradient id="grad-sky" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#38BDF8" />
          <stop offset="100%" stop-color="#0284C7" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="18" height="6" rx="2" stroke="url(#grad-sky)" />
      <rect x="3" y="15" width="18" height="6" rx="2" stroke="url(#grad-sky)" />
      <path d="M7 6h.01M10 6h.01M7 18h.01M10 18h.01" stroke="url(#grad-sky)" stroke-width="2.5" />
      <path d="M12 9v6M9 12h6" stroke="url(#grad-sky)" stroke-width="1.5" stroke-dasharray="2 2" />
    </svg>
  `,
  android: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <defs>
        <linearGradient id="grad-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#34D399" />
          <stop offset="100%" stop-color="#059669" />
        </linearGradient>
      </defs>
      <!-- Android Head Dome -->
      <path d="M4 14a8 8 0 0 1 16 0H4z" stroke="url(#grad-emerald)" />
      <!-- Antennas -->
      <line x1="7" y1="7" x2="5" y2="4" stroke="url(#grad-emerald)" stroke-width="2" />
      <line x1="17" y1="7" x2="19" y2="4" stroke="url(#grad-emerald)" stroke-width="2" />
      <!-- Eyes -->
      <circle cx="9" cy="11" r="1" fill="#34D399" />
      <circle cx="15" cy="11" r="1" fill="#34D399" />
      <!-- Body outline -->
      <rect x="4" y="16" width="16" height="5" rx="1.5" stroke="url(#grad-emerald)" />
    </svg>
  `,
  devops: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <defs>
        <linearGradient id="grad-amber" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FBBF24" />
          <stop offset="100%" stop-color="#D97706" />
        </linearGradient>
      </defs>
      <!-- Infinity Continuous Loop -->
      <path d="M12 12c-2.5-3.5-5-5-8-5a5 5 0 0 0 0 10c3 0 5.5-1.5 8-5zm0 0c2.5 3.5 5 5 8 5a5 5 0 0 0 0-10c-3 0-5.5 1.5-8 5z" stroke="url(#grad-amber)" />
      <circle cx="7" cy="12" r="1.5" fill="#FBBF24" />
      <circle cx="17" cy="12" r="1.5" fill="#FBBF24" />
    </svg>
  `,
  database: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <defs>
        <linearGradient id="grad-violet" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#C084FC" />
          <stop offset="100%" stop-color="#7C3AED" />
        </linearGradient>
      </defs>
      <ellipse cx="12" cy="5" rx="8" ry="3" stroke="url(#grad-violet)" />
      <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" stroke="url(#grad-violet)" />
      <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" stroke="url(#grad-violet)" />
      <line x1="8" y1="11" x2="8" y2="13" stroke="url(#grad-violet)" stroke-width="2" />
      <line x1="8" y1="17" x2="8" y2="19" stroke="url(#grad-violet)" stroke-width="2" />
    </svg>
  `,
  'system-design': `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <defs>
        <linearGradient id="grad-rose" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FB7185" />
          <stop offset="100%" stop-color="#E11D48" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="5" r="3" stroke="url(#grad-rose)" />
      <circle cx="5" cy="18" r="3" stroke="url(#grad-rose)" />
      <circle cx="19" cy="18" r="3" stroke="url(#grad-rose)" />
      <path d="M12 8v4M12 12l-5 3M12 12l5 3" stroke="url(#grad-rose)" stroke-width="1.5" />
      <circle cx="12" cy="12" r="1.5" fill="#FB7185" />
    </svg>
  `,
  algorithms: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <defs>
        <linearGradient id="grad-fuchsia" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#E879F9" />
          <stop offset="100%" stop-color="#A21CAF" />
        </linearGradient>
      </defs>
      <!-- Binary Tree / Branching Graph -->
      <circle cx="12" cy="4" r="2.5" stroke="url(#grad-fuchsia)" />
      <circle cx="6" cy="12" r="2.5" stroke="url(#grad-fuchsia)" />
      <circle cx="18" cy="12" r="2.5" stroke="url(#grad-fuchsia)" />
      <circle cx="4" cy="20" r="2" stroke="url(#grad-fuchsia)" />
      <circle cx="9" cy="20" r="2" stroke="url(#grad-fuchsia)" />
      <circle cx="15" cy="20" r="2" stroke="url(#grad-fuchsia)" />
      <circle cx="20" cy="20" r="2" stroke="url(#grad-fuchsia)" />
      <path d="M10.5 6l-3 4M13.5 6l3 4M5 14.5l-.5 3.5M7 14.5l1.5 3.5M17 14.5l-1.5 3.5M19 14.5l.5 3.5" stroke="url(#grad-fuchsia)" stroke-width="1.3" />
    </svg>
  `,
  ios: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <defs>
        <linearGradient id="grad-ios" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FF6B6B" />
          <stop offset="100%" stop-color="#FF8E53" />
        </linearGradient>
      </defs>
      <rect x="5" y="2" width="14" height="20" rx="3.5" stroke="url(#grad-ios)" />
      <!-- Dynamic Island Pill -->
      <rect x="9.5" y="4.5" width="5" height="1.8" rx="0.9" fill="#FF6B6B" />
      <!-- Home Indicator -->
      <line x1="9" y1="19" x2="15" y2="19" stroke="url(#grad-ios)" stroke-width="2" />
    </svg>
  `,
  flutter: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <defs>
        <linearGradient id="grad-flutter" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#54C5F8" />
          <stop offset="100%" stop-color="#02569B" />
        </linearGradient>
      </defs>
      <path d="M13.9 2.6L5 11.5l2.8 2.8L19.5 2.6h-5.6z" stroke="url(#grad-flutter)" />
      <path d="M13.9 11.2l-4.4 4.4 2.8 2.8 4.4-4.4-2.8-2.8z" stroke="url(#grad-flutter)" />
      <path d="M12.3 18.4l2.8 2.8h4.4l-5.8-5.8-2.8 2.8z" stroke="url(#grad-flutter)" />
    </svg>
  `,
  leetcode: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <defs>
        <linearGradient id="grad-lc" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFA116" />
          <stop offset="100%" stop-color="#FF6B00" />
        </linearGradient>
      </defs>
      <rect x="3" y="4" width="18" height="16" rx="2.5" stroke="url(#grad-lc)" />
      <path d="M7 8h10M7 12h10M7 16h6" stroke="url(#grad-lc)" stroke-width="1.6" />
      <circle cx="18.5" cy="16" r="1.8" fill="#FFA116" />
    </svg>
  `,
  git: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <defs>
        <linearGradient id="grad-git" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F97316" />
          <stop offset="100%" stop-color="#E11D48" />
        </linearGradient>
      </defs>
      <!-- Git branch graph -->
      <circle cx="6" cy="5" r="2.5" stroke="url(#grad-git)" />
      <circle cx="6" cy="19" r="2.5" stroke="url(#grad-git)" />
      <circle cx="18" cy="9" r="2.5" stroke="url(#grad-git)" />
      <path d="M6 7.5v9" stroke="url(#grad-git)" />
      <path d="M15.7 10.3c-1.6 1.8-4.2 2.7-7.2 3.1" stroke="url(#grad-git)" />
    </svg>
  `,
};

const KNOWLEDGE_DATA = {
  domains: [
    {
      id: 'backend',
      name: 'Backend',
      icon: 'backend',
      color: 'blue',
      description: 'Lập trình phía máy chủ, API, kiến trúc hệ thống',
      modules: [
        {
          id: 'spring',
          name: 'Spring Framework',
          topics: [
            { id: 'spring-ioc', title: 'IoC & Dependency Injection', status: 'published', tags: ['java', 'backend'] },
            { id: 'spring-mvc', title: 'Spring MVC Architecture', status: 'published', tags: ['java', 'backend'] },
            { id: 'spring-security', title: 'Spring Security Fundamentals', status: 'published', tags: ['java', 'backend'] },
            { id: 'spring-data-jpa', title: 'Spring Data JPA', status: 'published', tags: ['java', 'backend'] },
          ]
        },
        {
          id: 'java',
          name: 'Java Core',
          topics: [
            { id: 'java-concurrency', title: 'Java Concurrency & Threading', status: 'published', tags: ['java'] },
            { id: 'java-streams', title: 'Stream API & Functional', status: 'published', tags: ['java'] },
            { id: 'java-generics', title: 'Generics & Type Erasure', status: 'draft', tags: ['java'] },
          ]
        },
        {
          id: 'jwt',
          name: 'Authentication',
          topics: [
            { id: 'jwt-auth', title: 'JWT Authentication', status: 'published', tags: ['backend', 'security'] },
            { id: 'oauth2', title: 'OAuth 2.0 Flow', status: 'published', tags: ['backend', 'security'] },
          ]
        }
      ]
    },
    {
      id: 'android',
      name: 'Android',
      icon: 'android',
      color: 'green',
      description: 'Phát triển ứng dụng Android từ cơ bản đến nâng cao theo lộ trình 11 Session',
      modules: [
        {
          id: 'session-01',
          name: 'Session 01: Ngôn ngữ & Gói ứng dụng',
          topics: [
            { id: 'session-01-overview', title: 'Session 01 Overview', status: 'published', tags: ['android', 'overview'] },
            { id: 'java-android', title: '1.1.1 Java Android', status: 'published', tags: ['android', 'java'] },
            { id: 'kotlin-core', title: '1.1.2 Kotlin', status: 'published', tags: ['android', 'kotlin'] },
            { id: 'jni-cpp', title: '1.1.3 JNI: C/C++', status: 'published', tags: ['android', 'cpp', 'jni'] },
            { id: 'apk-files', title: '1.2.1 APK', status: 'published', tags: ['android', 'build'] },
            { id: 'aab-files', title: '1.2.2 AAB', status: 'published', tags: ['android', 'build'] }
          ],
          sections: [
            { id: 's01-languages', name: '1.1 Languages', topics: ['java-android', 'kotlin-core', 'jni-cpp'] },
            { id: 's01-output', name: '1.2 Output Packages', topics: ['apk-files', 'aab-files'] }
          ]
        },
        {
          id: 'session-02',
          name: 'Session 02: Hệ điều hành & Quyền',
          topics: [
            { id: 'session-02-overview', title: 'Session 02 Overview', status: 'draft', tags: ['android', 'overview'] },
            { id: 'file-permissions', title: '2.1 File Permissions', status: 'draft', tags: ['android', 'security'] },
            { id: 'process-management', title: '2.2 Process Management', status: 'draft', tags: ['android', 'os'] },
            { id: 'resource-solutions', title: '2.3 Resource Solutions', status: 'draft', tags: ['android', 'resources'] },
            { id: 'multi-user-os', title: '2.4 Multi User OS', status: 'draft', tags: ['android', 'os'] }
          ]
        },
        {
          id: 'session-03',
          name: 'Session 03: Phần cứng & Kernel',
          topics: [
            { id: 'session-03-overview', title: 'Session 03 Overview', status: 'draft', tags: ['android', 'overview'] },
            { id: 'hardware-architecture', title: '3.1 Hardware Architecture', status: 'draft', tags: ['android', 'hardware'] },
            { id: 'system-apps-kernel', title: '3.2 Systems Apps and Kernel', status: 'draft', tags: ['android', 'kernel'] }
          ]
        },
        {
          id: 'session-04',
          name: 'Session 04: Android Manifest & Application Components',
          topics: [
            { id: 'session-04-overview', title: 'Session 04 Overview', status: 'published', tags: ['android', 'overview'] },
            { id: 'build-types', title: '4.1.1.1 Build Types', status: 'published', tags: ['android', 'gradle', 'build-types'] },
            { id: 'flavor', title: '4.1.1.2 Flavor', status: 'published', tags: ['android', 'gradle', 'flavor'] },
            { id: 'plugin', title: '4.1.1.3 Plugin', status: 'published', tags: ['android', 'gradle', 'agp'] },
            { id: 'manifest-tags', title: '4.1.2 Manifest Tags (Application, Activity, Services...)', status: 'published', tags: ['android', 'manifest'] },
            { id: 'activity-overview', title: '4.2.1 Activity Overview', status: 'published', tags: ['android', 'activity'] },
            { id: 'activity-lifecycle', title: '4.2.1.1 Lifecycle', status: 'published', tags: ['android', 'activity', 'lifecycle'] },
            { id: 'activity-state-changes', title: '4.2.1.2 State Changes', status: 'published', tags: ['android', 'activity', 'state'] },
            { id: 'activity-task-backstack', title: '4.2.1.3 Task & Back Stack', status: 'published', tags: ['android', 'activity', 'task'] },
            { id: 'activity-parcelables-bundle', title: '4.2.1.4 Parcelables & Bundle', status: 'published', tags: ['android', 'activity', 'parcelable'] },
            { id: 'fragment-overview', title: '4.2.2 Fragment Overview', status: 'published', tags: ['android', 'fragment'] },
            { id: 'fragment-lifecycle', title: '4.2.2.1 Fragment Lifecycle', status: 'published', tags: ['android', 'fragment', 'lifecycle'] },
            { id: 'fragment-state-changes', title: '4.2.2.2 Fragment State Changes', status: 'published', tags: ['android', 'fragment', 'state'] },
            { id: 'fragment-manager', title: '4.2.2.3 FragmentManager', status: 'published', tags: ['android', 'fragment', 'fragmentmanager'] },
            { id: 'fragment-dialog', title: '4.2.2.4 Dialog and DialogFragment', status: 'published', tags: ['android', 'fragment', 'dialog'] },
            { id: 'android-service', title: '4.2.3.1 Android Service', status: 'published', tags: ['android', 'service', 'background', 'workmanager'] },
            { id: 'google-service', title: '4.2.3.2 Google Service', status: 'published', tags: ['android', 'google-service', 'firebase', 'fcm'] },
            { id: 'advertisements', title: '4.2.3.3 Advertisements', status: 'published', tags: ['android', 'ads', 'admob', 'monetization'] },
            { id: 'android-broadcast-receiver', title: '4.2.4.1 Broadcast Receiver', status: 'published', tags: ['android', 'broadcast'] },
            { id: 'content-provider', title: '4.2.5 Content Provider', status: 'published', tags: ['android', 'content-provider'] },
            { id: 'intent-explicit', title: '4.2.6.1 Explicit Intents', status: 'published', tags: ['android', 'intent'] },
            { id: 'intent-implicit', title: '4.2.6.2 Implicit Intents', status: 'published', tags: ['android', 'intent'] },
            { id: 'intent-filters', title: '4.2.6.3 Intent Filters Value', status: 'published', tags: ['android', 'intent'] },
            { id: 'intent-handle', title: '4.2.6.4 Handle Intent', status: 'published', tags: ['android', 'intent'] },
            { id: 'intent-push-data', title: '4.2.6.5 Push data and send event via Intent', status: 'published', tags: ['android', 'intent'] },
            { id: 'intent-pending', title: '4.2.6.6 Pending Intent', status: 'published', tags: ['android', 'intent'] }
          ],
          sections: [
            {
              id: 's04-manifest',
              name: '4.1 Android Manifest',
              sections: [
                { id: 's04-build', name: '4.1.1 Package, build, gradle', topics: ['build-types', 'flavor', 'plugin'] },
                { id: 's04-tags', name: '4.1.2 Manifest Tags', topics: ['manifest-tags'] }
              ]
            },
            {
              id: 's04-components',
              name: '4.2 Application Components',
              sections: [
                { id: 's04-activity', name: '4.2.1 Activity', topics: ['activity-overview', 'activity-lifecycle', 'activity-state-changes', 'activity-task-backstack', 'activity-parcelables-bundle'] },
                { id: 's04-fragment', name: '4.2.2 Fragment', topics: ['fragment-overview', 'fragment-lifecycle', 'fragment-state-changes', 'fragment-manager', 'fragment-dialog'] },
                { id: 's04-services', name: '4.2.3 Android Services', topics: ['android-service', 'google-service', 'advertisements'] },
                { id: 's04-broadcast', name: '4.2.4 Broadcast Receiver', topics: ['android-broadcast-receiver'] },
                { id: 's04-provider', name: '4.2.5 Content Provider', topics: ['content-provider'] },
                { id: 's04-intent', name: '4.2.6 Intent', topics: ['intent-explicit', 'intent-implicit', 'intent-filters', 'intent-handle', 'intent-push-data', 'intent-pending'] }
              ]
            }
          ]
        },
        {
          id: 'session-05',
          name: 'Session 05: Data Store & Networking',
          topics: [
            { id: 'session-05-overview', title: 'Session 05 Overview', status: 'published', tags: ['android', 'overview'] },
            { id: 'data-store-key-value', title: '5.1.1 Key-Value Storage (SharedPreferences & DataStore)', status: 'published', tags: ['android', 'datastore', 'room', 'sqlite'] },
            { id: 'data-store-room-arch', title: '5.1.2 Relational Database (Room Architecture)', status: 'published', tags: ['android', 'datastore', 'room', 'sqlite'] },
            { id: 'data-store-room-adv', title: '5.1.3 Advanced Room (Migration & Indexing)', status: 'published', tags: ['android', 'datastore', 'room', 'sqlite'] },
            { id: 'data-store-room-trans', title: '5.1.4 Async Transactions & Flow', status: 'published', tags: ['android', 'datastore', 'room', 'sqlite'] },
            { id: 'working-with-thread', title: '5.2 Working with Thread', status: 'draft', tags: ['android', 'threading'] },
            { id: 'networking-basics', title: '5.3 Networking (Request API, Handle event network, Handle connection state)', status: 'draft', tags: ['android', 'network'] }
          ],
          sections: [
            { id: 's05-data', name: '5.1 Data Store', topics: ['data-store-key-value', 'data-store-room-arch', 'data-store-room-adv', 'data-store-room-trans'] }
          ]
        },
        {
          id: 'session-06',
          name: 'Session 06: Architecture Components',
          topics: [
            { id: 'session-06-overview', title: 'Session 06 Overview', status: 'draft', tags: ['android', 'overview'] },
            { id: 'view-binding', title: '6.1 View Binding', status: 'draft', tags: ['android', 'ui'] },
            { id: 'data-binding', title: '6.2 Data Binding', status: 'draft', tags: ['android', 'ui'] },
            { id: 'livedata', title: '6.3 LiveData', status: 'draft', tags: ['android', 'architecture'] },
            { id: 'viewmodel', title: '6.4 ViewModel', status: 'draft', tags: ['android', 'architecture'] },
            { id: 'paging-library', title: '6.5 Paging', status: 'draft', tags: ['android', 'paging'] }
          ]
        },
        {
          id: 'session-07',
          name: 'Session 07: Design Patterns & Architecture',
          topics: [
            { id: 'session-07-overview', title: 'Session 07 Overview', status: 'draft', tags: ['android', 'overview'] },
            { id: 'builder-pattern', title: '7.1.1 Builder Pattern', status: 'draft', tags: ['android', 'patterns'] },
            { id: 'viewholder-pattern', title: '7.1.2 ViewHolder Pattern', status: 'draft', tags: ['android', 'patterns'] },
            { id: 'singleton-pattern', title: '7.1.3 Singleton Pattern', status: 'draft', tags: ['android', 'patterns'] },
            { id: 'observer-rxjava', title: '7.1.4.1 RxJava / RxAndroid', status: 'draft', tags: ['android', 'patterns', 'reactive'] },
            { id: 'observer-flow', title: '7.1.4.2 Flow', status: 'draft', tags: ['android', 'patterns', 'reactive'] },
            { id: 'observer-livedata', title: '7.1.4.3 LiveData', status: 'draft', tags: ['android', 'patterns', 'reactive'] },
            { id: 'di-dagger2', title: '7.1.5.1 Dagger2', status: 'draft', tags: ['android', 'di'] },
            { id: 'di-koin', title: '7.1.5.2 Koin', status: 'draft', tags: ['android', 'di'] },
            { id: 'di-hilt', title: '7.1.5.3 Hilt', status: 'draft', tags: ['android', 'di'] },
            { id: 'di-kodein', title: '7.1.5.4 Kodein', status: 'draft', tags: ['android', 'di'] },
            { id: 'arch-mvc', title: '7.2.1 MVC', status: 'draft', tags: ['android', 'architecture'] },
            { id: 'arch-mvp', title: '7.2.2 MVP', status: 'draft', tags: ['android', 'architecture'] },
            { id: 'arch-mvvm', title: '7.2.3 MVVM', status: 'draft', tags: ['android', 'architecture'] },
            { id: 'arch-mvi', title: '7.2.4 MVI', status: 'draft', tags: ['android', 'architecture'] },
            { id: 'arch-clean', title: '7.2.5 Clean Architecture', status: 'draft', tags: ['android', 'architecture'] }
          ],
          sections: [
            {
              id: 's07-design',
              name: '7.1 Design Pattern',
              sections: [
                { id: 's07-holder', name: '7.1.1-7.1.3', topics: ['builder-pattern', 'viewholder-pattern', 'singleton-pattern'] },
                { id: 's07-observer', name: '7.1.4 Observer Pattern', topics: ['observer-rxjava', 'observer-flow', 'observer-livedata'] },
                { id: 's07-di', name: '7.1.5 Dependency Injection', topics: ['di-dagger2', 'di-koin', 'di-hilt', 'di-kodein'] }
              ]
            },
            { id: 's07-arch', name: '7.2 Architecture', topics: ['arch-mvc', 'arch-mvp', 'arch-mvvm', 'arch-mvi', 'arch-clean'] }
          ]
        },
        {
          id: 'session-08',
          name: 'Session 08: Libraries, Async & View Layout',
          topics: [
            { id: 'session-08-overview', title: 'Session 08 Overview', status: 'draft', tags: ['android', 'overview'] },
            { id: 'retrofit', title: '8.1.1 Retrofit', status: 'draft', tags: ['android', 'network'] },
            { id: 'gson', title: '8.1.2 Gson', status: 'draft', tags: ['android', 'network'] },
            { id: 'okhttp', title: '8.1.3 OkHttp', status: 'draft', tags: ['android', 'network'] },
            { id: 'okio', title: '8.1.4 Okio', status: 'draft', tags: ['android', 'network'] },
            { id: 'ktor-apollo', title: '8.1.5 Ktor and Apollo Android', status: 'draft', tags: ['android', 'network'] },
            { id: 'glide', title: '8.2.1 Glide', status: 'draft', tags: ['android', 'media'] },
            { id: 'picasso', title: '8.2.2 Picasso', status: 'draft', tags: ['android', 'media'] },
            { id: 'fresco', title: '8.2.3 Fresco', status: 'draft', tags: ['android', 'media'] },
            { id: 'coil', title: '8.2.4 Coil', status: 'draft', tags: ['android', 'media'] },
            { id: 'local-storage', title: '8.3 Local Storage', status: 'draft', tags: ['android', 'storage'] },
            { id: 'sync-async', title: '8.4.1 What Sync / Async', status: 'draft', tags: ['kotlin', 'async'] },
            { id: 'thread-multithread', title: '8.4.2 Thread and Multi-Thread', status: 'draft', tags: ['kotlin', 'async'] },
            { id: 'kotlin-coroutines', title: '8.4.3 Coroutines', status: 'draft', tags: ['kotlin', 'async'] },
            { id: 'rxjava-async', title: '8.4.4 RxJava, RxAndroid, RxKotlin', status: 'draft', tags: ['kotlin', 'async'] },
            { id: 'kotlin-stateflow', title: 'StateFlow & SharedFlow', status: 'published', tags: ['kotlin', 'android'] },
            { id: 'view-layouts', title: '8.5.1 Layouts (ConstraintLayout, MotionLayout, Linear, Frame, Relative, RecyclerView)', status: 'draft', tags: ['android', 'views'] },
            { id: 'view-custom', title: '8.5.2 View Custom (View lifecycle, Canvas)', status: 'draft', tags: ['android', 'views'] },
            { id: 'view-styles', title: '8.5.3 Styles (style view, style input, style themes)', status: 'draft', tags: ['android', 'views'] },
            { id: 'design-guide', title: '8.5.4 Design Guide (Materials, Flat)', status: 'draft', tags: ['android', 'views'] },
            { id: 'view-message', title: '8.5.5 Message (Toast, Snackbar, Notification)', status: 'draft', tags: ['android', 'views'] },
            { id: 'view-animation', title: '8.5.6 Animation (Animator, Lotties, Material Motions, AnimationSet)', status: 'draft', tags: ['android', 'views'] }
          ],
          sections: [
            { id: 's08-networks', name: '8.1 Networks', topics: ['retrofit', 'gson', 'okhttp', 'okio', 'ktor-apollo'] },
            { id: 's08-images', name: '8.2 Loading Image', topics: ['glide', 'picasso', 'fresco', 'coil'] },
            { id: 's08-threads', name: '8.4 Synchronous / Asynchronous Threads', topics: ['sync-async', 'thread-multithread', 'kotlin-coroutines', 'rxjava-async'] },
            { id: 's08-layout', name: '8.5 View Layout', topics: ['view-layouts', 'view-custom', 'view-styles', 'design-guide', 'view-message', 'view-animation'] }
          ]
        },
        {
          id: 'jetpack-compose-ui',
          name: 'Session 09: Jetpack Compose UI',
          topics: [
            { id: 'compose-overview', title: 'Jetpack Compose Overview', status: 'draft', tags: ['android', 'compose'] },
            { id: 'compose-recomposition', title: '9.1 Remember and Recomposition', status: 'draft', tags: ['android', 'compose'] },
            { id: 'compose-state', title: '9.2 State and State Hoisting', status: 'published', tags: ['android', 'kotlin', 'compose'] },
            { id: 'compose-mutablestate', title: '9.2.1 MutableState', status: 'draft', tags: ['android', 'compose'] },
            { id: 'compose-remember-saveable', title: '9.2.2 Remember and rememberSaveable', status: 'draft', tags: ['android', 'compose'] },
            { id: 'compose-launchedeffect', title: '9.3.1 LaunchedEffect', status: 'draft', tags: ['android', 'compose'] },
            { id: 'compose-disposableeffect', title: '9.3.2 DisposableEffect', status: 'draft', tags: ['android', 'compose'] },
            { id: 'compose-producestate', title: '9.3.3 ProduceState', status: 'draft', tags: ['android', 'compose'] },
            { id: 'compose-derivedstateof', title: '9.3.4 DerivedStateOf', status: 'draft', tags: ['android', 'compose'] },
            { id: 'compose-snapshotflow', title: '9.3.5 SnapShotFlow and flowWithSnapshot', status: 'draft', tags: ['android', 'compose'] },
            { id: 'compose-material-theme', title: '9.4.1 Material Design Theme (Color, Typography, Shapes)', status: 'draft', tags: ['android', 'compose'] },
            { id: 'compose-custom-theme', title: '9.4.2 Custom Theme (Dimens, Factories, Data)', status: 'draft', tags: ['android', 'compose'] },
            { id: 'compose-modifier-order', title: '9.5.1 Modifier Order', status: 'draft', tags: ['android', 'compose'] },
            { id: 'compose-modifier-chaining', title: '9.5.2 Chaining', status: 'draft', tags: ['android', 'compose'] },
            { id: 'compose-modifier-composed', title: '9.5.3 Composed Modifier', status: 'draft', tags: ['android', 'compose'] },
            { id: 'compose-lazy-column', title: '9.5.4 Lazy Column', status: 'draft', tags: ['android', 'compose'] },
            { id: 'compose-lazy-row', title: '9.5.5 Lazy Row', status: 'draft', tags: ['android', 'compose'] },
            { id: 'compose-lazy-grid', title: '9.5.6 Lazy Vertical Grid', status: 'draft', tags: ['android', 'compose'] },
            { id: 'compose-lazy-paging', title: '9.5.7 Lazy Paging Items', status: 'draft', tags: ['android', 'compose'] },
            { id: 'compose-layout-view', title: '9.6 Layout and View (Text, Image, Layout)', status: 'draft', tags: ['android', 'compose'] },
            { id: 'compose-surface-canvas', title: '9.7.1 Surface and Canvas', status: 'draft', tags: ['android', 'compose'] },
            { id: 'compose-animated-visibility', title: '9.7.2 AnimatedVisibility', status: 'draft', tags: ['android', 'compose'] },
            { id: 'compose-transition-state', title: '9.7.3 MutableTransitionState', status: 'draft', tags: ['android', 'compose'] },
            { id: 'compose-animated-content', title: '9.7.4 AnimatedContent', status: 'draft', tags: ['android', 'compose'] },
            { id: 'compose-crossfade', title: '9.7.5 Crossfade', status: 'draft', tags: ['android', 'compose'] },
            { id: 'compose-scrolling', title: '9.8.1 Scrolling', status: 'draft', tags: ['android', 'compose'] },
            { id: 'compose-dragging', title: '9.8.2 Dragging', status: 'draft', tags: ['android', 'compose'] },
            { id: 'compose-swipping', title: '9.8.3 Swipping', status: 'draft', tags: ['android', 'compose'] },
            { id: 'compose-zooming', title: '9.8.4 Zooming', status: 'draft', tags: ['android', 'compose'] }
          ],
          sections: [
            { id: 's09-state', name: '9.2 State and State Hoisting', topics: ['compose-state', 'compose-mutablestate', 'compose-remember-saveable'] },
            { id: 's09-effects', name: '9.3 Side-Effects', topics: ['compose-launchedeffect', 'compose-disposableeffect', 'compose-producestate', 'compose-derivedstateof', 'compose-snapshotflow'] },
            { id: 's09-theming', name: '9.4 Theming', topics: ['compose-material-theme', 'compose-custom-theme'] },
            { id: 's09-modifier', name: '9.5 Modifier', topics: ['compose-modifier-order', 'compose-modifier-chaining', 'compose-modifier-composed', 'compose-lazy-column', 'compose-lazy-row', 'compose-lazy-grid', 'compose-lazy-paging'] },
            { id: 's09-graphics', name: '9.7 Graphics and Animations', topics: ['compose-surface-canvas', 'compose-animated-visibility', 'compose-transition-state', 'compose-animated-content', 'compose-crossfade'] },
            { id: 's09-gesture', name: '9.8 Gesture and Composition Local', topics: ['compose-scrolling', 'compose-dragging', 'compose-swipping', 'compose-zooming'] }
          ]
        },
        {
          id: 'coding-analyst-testing',
          name: 'Session 10: Coding Analyst and Testing',
          topics: [
            { id: 'testing-overview', title: 'Session 10 Overview', status: 'draft', tags: ['android', 'testing'] },
            { id: 'android-debugging', title: '10.1 Debugging', status: 'draft', tags: ['android', 'debug'] },
            { id: 'unit-testing', title: '10.2 Unit Testing', status: 'draft', tags: ['android', 'testing'] },
            { id: 'android-lint', title: '10.3 Lint', status: 'draft', tags: ['android', 'quality'] },
            { id: 'fit-bug-optimization', title: '10.4 Fit / Bug Optimization', status: 'draft', tags: ['android', 'quality'] }
          ]
        },
        {
          id: 'cicd-publish-store',
          name: 'Session 11: CI/CD and Publish Store',
          topics: [
            { id: 'cicd-overview', title: 'Session 11 Overview', status: 'draft', tags: ['android', 'cicd'] },
            { id: 'jenkins', title: '11.1 Jenkins', status: 'draft', tags: ['android', 'cicd'] },
            { id: 'bitrise', title: '11.2 Bitrise', status: 'draft', tags: ['android', 'cicd'] },
            { id: 'travis-ci', title: '11.3 Travis CI', status: 'draft', tags: ['android', 'cicd'] },
            { id: 'github-ci', title: '11.4 Github CI', status: 'draft', tags: ['android', 'cicd'] }
          ]
        }
      ]
    },
    {
      id: 'ios',
      name: 'iOS Development',
      icon: 'ios',
      color: 'rose',
      description: 'Lộ trình và kiến thức chuyên sâu iOS: Swift, Objective-C, UIKit, AutoLayout, Concurrency GCD, CoreData, Architecture MVVM/Clean, SwiftUI & App Store.',
      modules: [
        {
          id: 'ios-session-01',
          name: 'Session 01: Languages, Memory & Runtime',
          topics: [
            { id: 'ios-session-01-overview', title: 'Session 01 Overview', status: 'published', tags: ['ios', 'overview'] },
            { id: 'ios-objc-blocks', title: '1.1.1.1 Objective-C Blocks', status: 'published', tags: ['ios', 'objc', 'blocks'] },
            { id: 'ios-objc-kvc', title: '1.1.1.2 KVC (Key Value Coding)', status: 'published', tags: ['ios', 'objc', 'kvc'] },
            { id: 'ios-objc-kvo', title: '1.1.1.3 KVO (Key Value Observing)', status: 'published', tags: ['ios', 'objc', 'kvo'] },
            { id: 'ios-toll-free-bridging', title: '1.1.1.4 Toll-Free Bridging', status: 'published', tags: ['ios', 'objc', 'bridge'] },
            { id: 'ios-c-cpp', title: '1.1.2 C / C++', status: 'published', tags: ['ios', 'cpp'] },
            { id: 'ios-swift-for-kotlin-devs', title: '1.1.3.1 Swift for Kotlin Developers', status: 'published', tags: ['ios', 'swift', 'kotlin', 'migration'] },
            { id: 'ios-swift-closures', title: '1.1.3.2 Swift Closures', status: 'published', tags: ['ios', 'swift'] },
            { id: 'ios-swift-initializers', title: '1.1.3.3 Initializers', status: 'published', tags: ['ios', 'swift'] },
            { id: 'ios-swift-generics', title: '1.1.3.4 Generics', status: 'published', tags: ['ios', 'swift'] },
            { id: 'ios-swift-protocols-structs', title: '1.1.3.5 Protocol, Struct, Enum, Extension', status: 'published', tags: ['ios', 'swift'] },
            { id: 'ios-stack-queue-heap', title: '1.2.1 Stack, Queue, Heap', status: 'published', tags: ['ios', 'memory'] },
            { id: 'ios-value-reference-types', title: '1.2.2 Value and Reference Type', status: 'published', tags: ['ios', 'memory'] },
            { id: 'ios-mrc-arc-retain', title: '1.2.3 MRC, ARC, Retain Cycle', status: 'published', tags: ['ios', 'arc', 'memory'] },
            { id: 'ios-memory-leaks-copying', title: '1.2.4 Memory Leaks, Shallow & Deep Copy', status: 'published', tags: ['ios', 'memory'] },
            { id: 'ios-autoreleasepool', title: '1.2.5 AutoReleasePool', status: 'published', tags: ['ios', 'memory'] },
            { id: 'ios-runtime-messaging', title: '1.3.1 Method Messaging & Dynamic Dispatch', status: 'published', tags: ['ios', 'runtime'] },
            { id: 'ios-runtime-nszombie-kvo', title: '1.3.2 NSZombie and KVO Implementation', status: 'published', tags: ['ios', 'runtime'] },
            { id: 'ios-runtime-swizzling', title: '1.3.3 Method Swizzling', status: 'published', tags: ['ios', 'runtime'] }
          ],
          sections: [
            { id: 's01-languages', name: '1.1 Languages', topics: ['ios-objc-blocks', 'ios-objc-kvc', 'ios-objc-kvo', 'ios-toll-free-bridging', 'ios-c-cpp', 'ios-swift-for-kotlin-devs', 'ios-swift-closures', 'ios-swift-initializers', 'ios-swift-generics', 'ios-swift-protocols-structs'] },
            { id: 's01-memory', name: '1.2 Memory Management', topics: ['ios-stack-queue-heap', 'ios-value-reference-types', 'ios-mrc-arc-retain', 'ios-memory-leaks-copying', 'ios-autoreleasepool'] },
            { id: 's01-runtime', name: '1.3 Runtime', topics: ['ios-runtime-messaging', 'ios-runtime-nszombie-kvo', 'ios-runtime-swizzling'] }
          ]
        },
        {
          id: 'ios-session-02',
          name: 'Session 02: Lifecycle, UIKit & Controls',
          topics: [
            { id: 'ios-session-02-overview', title: 'Session 02 Overview', status: 'published', tags: ['ios', 'overview'] },
            { id: 'ios-app-architect', title: '2.1 Application Architect', status: 'published', tags: ['ios', 'architecture'] },
            { id: 'ios-app-lifecycle', title: '2.2 Application Lifecycle', status: 'published', tags: ['ios', 'lifecycle'] },
            { id: 'ios-uikit-autolayout', title: '2.3 UIKit Foundation & AutoLayout', status: 'published', tags: ['ios', 'uikit', 'autolayout'] },
            { id: 'ios-uiviewcontroller', title: '2.4.1 UIViewController & Containers', status: 'published', tags: ['ios', 'uikit'] },
            { id: 'ios-gestures', title: '2.4.2 Gestures (Tap, LongPress)', status: 'published', tags: ['ios', 'uikit', 'gesture'] },
            { id: 'ios-ui-presentation', title: '2.4.3 UI Presentation & Navigation', status: 'published', tags: ['ios', 'uikit'] },
            { id: 'ios-userdefaults', title: '2.5 UserDefaults', status: 'published', tags: ['ios', 'storage'] },
            { id: 'ios-variables-constants', title: '2.6 Variables, Optionals & Collections', status: 'published', tags: ['ios', 'swift'] },
            { id: 'ios-control-flow', title: '2.7 Control Flow (Guard, Switch, Loops)', status: 'published', tags: ['ios', 'swift'] }
          ]
        },
        {
          id: 'ios-session-03',
          name: 'Session 03: Cocoa Patterns & Networking',
          topics: [
            { id: 'ios-session-03-overview', title: 'Session 03 Overview', status: 'published', tags: ['ios', 'overview'] },
            { id: 'ios-cocoa-mvc', title: '3.1.1 MVC Pattern', status: 'published', tags: ['ios', 'patterns'] },
            { id: 'ios-cocoa-singleton', title: '3.1.2 Singleton Pattern', status: 'published', tags: ['ios', 'patterns'] },
            { id: 'ios-cocoa-delegate', title: '3.1.3 Delegate Pattern', status: 'published', tags: ['ios', 'patterns'] },
            { id: 'ios-cocoa-responder-chain', title: '3.1.4 Responder Chain', status: 'published', tags: ['ios', 'uikit', 'patterns'] },
            { id: 'ios-cocoa-observer', title: '3.1.5 Observer Pattern', status: 'published', tags: ['ios', 'patterns'] },
            { id: 'ios-functions-opaque', title: '3.2 Functions & Opaque Types', status: 'published', tags: ['ios', 'swift'] },
            { id: 'ios-network-restful', title: '3.3.1 RESTful API & URLSession', status: 'published', tags: ['ios', 'networking'] },
            { id: 'ios-network-socket', title: '3.3.2 Socket: TCP/IP & WebSocket', status: 'published', tags: ['ios', 'networking'] }
          ]
        },
        {
          id: 'ios-session-04',
          name: 'Session 04: GCD, Concurrency & OOP/POP',
          topics: [
            { id: 'ios-session-04-overview', title: 'Session 04 Overview', status: 'published', tags: ['ios', 'overview'] },
            { id: 'ios-arc-mrc-runtime', title: '4.1 Memory Management & Runtime', status: 'published', tags: ['ios', 'memory'] },
            { id: 'ios-concurrency-programming', title: '4.2 Concurrency Programming', status: 'published', tags: ['ios', 'concurrency'] },
            { id: 'ios-generic-type', title: '4.3 Generic Type & Constraints', status: 'published', tags: ['ios', 'swift'] },
            { id: 'ios-gcd-dispatch-queue', title: '4.4 GCD & Dispatch Queue', status: 'published', tags: ['ios', 'gcd'] },
            { id: 'ios-oop-pop-models', title: '4.5 Class, Struct, Protocol, Extension & Enum', status: 'published', tags: ['ios', 'swift'] },
            { id: 'ios-handle-error', title: '4.6 Error Handling (Do-Catch & Custom Enum)', status: 'published', tags: ['ios', 'swift'] }
          ]
        },
        {
          id: 'ios-session-05',
          name: 'Session 05: Multi-Threading, Data & Instruments',
          topics: [
            { id: 'ios-session-05-overview', title: 'Session 05 Overview', status: 'published', tags: ['ios', 'overview'] },
            { id: 'ios-threads-synchronization', title: '5.1 Threads, DispatchGroup & Semaphore', status: 'published', tags: ['ios', 'concurrency'] },
            { id: 'ios-data-coredata', title: '5.2.1 CoreData Architecture', status: 'published', tags: ['ios', 'data'] },
            { id: 'ios-data-realm', title: '5.2.2 Realm Database', status: 'published', tags: ['ios', 'data'] },
            { id: 'ios-data-keychain-serialization', title: '5.2.3 Keychain, JSON & Serialization', status: 'published', tags: ['ios', 'data', 'security'] },
            { id: 'ios-data-cloud', title: '5.2.4 Cloud & Third-Party Storage', status: 'published', tags: ['ios', 'data'] },
            { id: 'ios-instruments-profiling', title: '5.3 Instruments (Allocations, Leaks, Energy)', status: 'published', tags: ['ios', 'profiling'] }
          ]
        },
        {
          id: 'ios-session-06',
          name: 'Session 06: Third-Party, BuildSettings & Debugging',
          topics: [
            { id: 'ios-session-06-overview', title: 'Session 06 Overview', status: 'published', tags: ['ios', 'overview'] },
            { id: 'ios-workspace-deps', title: '6.1 CocoaPods, Carthage & SPM', status: 'published', tags: ['ios', 'tools'] },
            { id: 'ios-build-settings', title: '6.2 Build Configurations, Schemes & Targets', status: 'published', tags: ['ios', 'xcode'] },
            { id: 'ios-debugging-lldb', title: '6.3 LLDB Debugging, Breakpoints & Visual Debug', status: 'published', tags: ['ios', 'debugging'] }
          ]
        },
        {
          id: 'ios-session-07',
          name: 'Session 07: Targets, Architecture & Access Control',
          topics: [
            { id: 'ios-session-07-overview', title: 'Session 07 Overview', status: 'published', tags: ['ios', 'overview'] },
            { id: 'ios-targets-frameworks', title: '7.1 Static vs Dynamic Frameworks', status: 'published', tags: ['ios', 'modularization'] },
            { id: 'ios-arch-mvvm-clean', title: '7.2 Architecture (MVC, MVP, MVVM, Clean, Coordinator)', status: 'published', tags: ['ios', 'architecture'] },
            { id: 'ios-access-control', title: '7.3 Access Control (Private, Internal, Public, Open)', status: 'published', tags: ['ios', 'swift'] }
          ]
        },
        {
          id: 'ios-session-08',
          name: 'Session 08: CI/CD, Analytics & AppStore',
          topics: [
            { id: 'ios-session-08-overview', title: 'Session 08 Overview', status: 'published', tags: ['ios', 'overview'] },
            { id: 'ios-cicd-fastlane', title: '8.1 CI/CD Pipelines & Fastlane', status: 'published', tags: ['ios', 'cicd'] },
            { id: 'ios-analytics-crashlytics', title: '8.2 Analytics, Crashlytics & TestFlight', status: 'published', tags: ['ios', 'analytics'] },
            { id: 'ios-appstore-connect', title: '8.3 App Store Connect & Guidelines', status: 'published', tags: ['ios', 'appstore'] }
          ]
        },
        {
          id: 'ios-session-09-swiftui',
          name: 'SwiftUI: Declarative UI & Data Flow',
          topics: [
            { id: 'ios-swiftui-overview', title: 'SwiftUI Overview', status: 'published', tags: ['ios', 'swiftui', 'overview'] },
            { id: 'ios-swiftui-essentials', title: '9.1 SwiftUI Essentials & Layout', status: 'published', tags: ['ios', 'swiftui'] },
            { id: 'ios-swiftui-views-controls', title: '9.2 Views, Controls & Navigation', status: 'published', tags: ['ios', 'swiftui'] },
            { id: 'ios-swiftui-state-dataflow', title: '9.3 State & Data Flow (@State, @Binding, @StateObject)', status: 'published', tags: ['ios', 'swiftui', 'state'] },
            { id: 'ios-swiftui-animations-gestures', title: '9.4 Animations & Gestures', status: 'published', tags: ['ios', 'swiftui'] },
            { id: 'ios-swiftui-uikit-integration', title: '9.5 UIKit & SwiftUI Integration (UIViewRepresentable)', status: 'published', tags: ['ios', 'swiftui', 'uikit'] },
            { id: 'ios-swiftui-previews-deploy', title: '9.6 Previews in Xcode & Deployment', status: 'published', tags: ['ios', 'swiftui'] }
          ]
        },
        {
          id: 'ios-session-10-publish',
          name: 'Publish Store: Review, Release & Maintenance',
          topics: [
            { id: 'ios-publish-store-overview', title: 'Publish Store Overview', status: 'published', tags: ['ios', 'publish', 'overview'] },
            { id: 'ios-publish-preparation', title: '10.1 Guidelines, Assets & Provisioning Profiles', status: 'published', tags: ['ios', 'publish'] },
            { id: 'ios-publish-release-management', title: '10.2 Archive, Review Process & Phased Release', status: 'published', tags: ['ios', 'publish'] }
          ]
        }
      ]
    },
    {
      id: 'flutter',
      name: 'Flutter Development',
      icon: 'flutter',
      color: 'sky',
      description: 'Lộ trình và kiến thức chuyên sâu Flutter: Dart, Widgets, State Management Riverpod/BLoC, Networking, Firebase, Navigation & Architecture, Testing & CI/CD Deployment.',
      modules: [
        {
          id: 'flutter-session-01',
          name: 'Session 01: Dart Foundations',
          topics: [
            { id: 'flutter-session-01-overview', title: 'Session 01 Overview', status: 'published', tags: ['flutter', 'overview'] },
            { id: 'flutter-dart-for-kotlin-devs', title: '1.1.1 Dart for Kotlin Developers', status: 'published', tags: ['flutter', 'dart', 'kotlin', 'migration'] },
            { id: 'flutter-dart-variables-types', title: '1.2.1 Variables and Types', status: 'published', tags: ['dart', 'types'] },
            { id: 'flutter-dart-functions-operators', title: '1.2.2 Functions and Operators', status: 'published', tags: ['dart', 'functions'] },
            { id: 'flutter-dart-control-flow-patterns', title: '1.2.3 Control Flow and Patterns', status: 'published', tags: ['dart', 'patterns'] },
            { id: 'flutter-dart-collections-functional', title: '1.2.4 Collections and Functional APIs', status: 'published', tags: ['dart', 'collections'] },
            { id: 'flutter-dart-classes-mixins-sealed', title: '1.2.5 Classes, Mixins and Sealed Types', status: 'published', tags: ['dart', 'oop', 'sealed'] },
            { id: 'flutter-language-async-futures', title: '1.3.1 Futures and Async/Await', status: 'published', tags: ['dart', 'async'] },
            { id: 'flutter-language-async-streams', title: '1.3.2 Streams', status: 'published', tags: ['dart', 'stream'] },
            { id: 'flutter-language-async-isolates', title: '1.3.3 Isolates', status: 'published', tags: ['dart', 'isolate'] }
          ],
          sections: [
            { id: 'fs01-kotlin', name: '1.1 Dart cho Kotlin Developer', topics: ['flutter-dart-for-kotlin-devs'] },
            { id: 'fs01-fundamentals', name: '1.2 Dart Fundamentals', topics: ['flutter-dart-variables-types', 'flutter-dart-functions-operators', 'flutter-dart-control-flow-patterns', 'flutter-dart-collections-functional', 'flutter-dart-classes-mixins-sealed'] },
            { id: 'fs01-async', name: '1.3 Asynchronous Dart', topics: ['flutter-language-async-futures', 'flutter-language-async-streams', 'flutter-language-async-isolates'] }
          ]
        },
        {
          id: 'flutter-session-02',
          name: 'Session 02: Environment & Tooling',
          topics: [
            { id: 'flutter-session-02-overview', title: 'Session 02 Overview', status: 'draft', tags: ['flutter', 'overview'] },
            { id: 'flutter-cli-fvm', title: '2.1.1 Flutter CLI and FVM', status: 'draft', tags: ['flutter', 'tooling'] },
            { id: 'flutter-ides-setup', title: '2.1.2 IDEs and Editor Setup', status: 'draft', tags: ['flutter', 'tooling'] },
            { id: 'flutter-pub-package-management', title: '2.2.1 pub.dev and Package Management', status: 'draft', tags: ['flutter', 'pub'] },
            { id: 'flutter-devtools-debugging', title: '2.2.2 DevTools and Debugging', status: 'draft', tags: ['flutter', 'devtools'] }
          ]
        },
        {
          id: 'flutter-session-03',
          name: 'Session 03: Widgets & UI Foundations',
          topics: [
            { id: 'flutter-session-03-overview', title: 'Session 03 Overview', status: 'draft', tags: ['flutter', 'overview'] },
            { id: 'flutter-widgets-stateless-stateful', title: '3.1.1 Stateless and Stateful Widgets', status: 'draft', tags: ['flutter', 'widgets'] },
            { id: 'flutter-inherited-widget', title: '3.1.2 InheritedWidget', status: 'draft', tags: ['flutter', 'widgets'] },
            { id: 'flutter-responsive-adaptive-layout', title: '3.1.3 Responsive and Adaptive Layout', status: 'draft', tags: ['flutter', 'layout'] },
            { id: 'flutter-material-cupertino-styling', title: '3.2.1 Material 3 and Cupertino Styling', status: 'draft', tags: ['flutter', 'styling'] },
            { id: 'flutter-assets-fonts-images', title: '3.2.2 Assets, Fonts and Images', status: 'draft', tags: ['flutter', 'assets'] },
            { id: 'flutter-localization-i18n', title: '3.2.3 Localization and Internationalization', status: 'draft', tags: ['flutter', 'i18n'] }
          ]
        },
        {
          id: 'flutter-session-04',
          name: 'Session 04: State Management & Reactive Programming',
          topics: [
            { id: 'flutter-session-04-overview', title: 'Session 04 Overview', status: 'draft', tags: ['flutter', 'overview'] },
            { id: 'flutter-changenotifier-valuenotifier', title: '4.1.1 ChangeNotifier and ValueNotifier', status: 'draft', tags: ['flutter', 'state'] },
            { id: 'flutter-provider', title: '4.2.1 Provider', status: 'draft', tags: ['flutter', 'state', 'provider'] },
            { id: 'flutter-riverpod', title: '4.2.2 Riverpod', status: 'draft', tags: ['flutter', 'state', 'riverpod'] },
            { id: 'flutter-bloc-cubit', title: '4.2.3 BLoC and Cubit', status: 'draft', tags: ['flutter', 'state', 'bloc'] },
            { id: 'flutter-state-alternatives', title: '4.2.4 Alternatives: GetX, Redux, MobX', status: 'draft', tags: ['flutter', 'state'] }
          ]
        },
        {
          id: 'flutter-session-05',
          name: 'Session 05: Networking & APIs',
          topics: [
            { id: 'flutter-session-05-overview', title: 'Session 05 Overview', status: 'draft', tags: ['flutter', 'overview'] },
            { id: 'flutter-http-rest-dio', title: '5.1.1 REST APIs with http and Dio', status: 'draft', tags: ['flutter', 'networking'] },
            { id: 'flutter-json-serialization-codegen', title: '5.1.2 JSON Serialization and Codegen', status: 'draft', tags: ['flutter', 'json', 'codegen'] },
            { id: 'flutter-authentication-tokens', title: '5.1.3 Authentication and Token Handling', status: 'draft', tags: ['flutter', 'auth'] },
            { id: 'flutter-websockets-graphql', title: '5.1.4 WebSockets and GraphQL', status: 'draft', tags: ['flutter', 'networking'] }
          ]
        },
        {
          id: 'flutter-session-06',
          name: 'Session 06: Storage & Persistence',
          topics: [
            { id: 'flutter-session-06-overview', title: 'Session 06 Overview', status: 'draft', tags: ['flutter', 'overview'] },
            { id: 'flutter-preferences-secure-storage', title: '6.1.1 SharedPreferences and Secure Storage', status: 'draft', tags: ['flutter', 'storage'] },
            { id: 'flutter-sqlite-drift-hive', title: '6.1.2 SQLite, Drift and Hive', status: 'draft', tags: ['flutter', 'storage', 'database'] },
            { id: 'flutter-files-path-provider', title: '6.1.3 File System and Path Provider', status: 'draft', tags: ['flutter', 'storage'] }
          ]
        },
        {
          id: 'flutter-session-07',
          name: 'Session 07: Firebase & Cloud Services',
          topics: [
            { id: 'flutter-session-07-overview', title: 'Session 07 Overview', status: 'draft', tags: ['flutter', 'overview'] },
            { id: 'flutter-firebase-auth-setup', title: '7.1.1 Firebase Setup and Authentication', status: 'draft', tags: ['flutter', 'firebase'] },
            { id: 'flutter-firestore', title: '7.1.2 Firestore', status: 'draft', tags: ['flutter', 'firebase'] },
            { id: 'flutter-functions-remote-config', title: '7.1.3 Cloud Functions and Remote Config', status: 'draft', tags: ['flutter', 'firebase'] },
            { id: 'flutter-push-notifications-fcm', title: '7.1.4 Push Notifications (FCM)', status: 'draft', tags: ['flutter', 'firebase', 'fcm'] },
            { id: 'flutter-crashlytics-analytics', title: '7.1.5 Crashlytics and Analytics', status: 'draft', tags: ['flutter', 'firebase'] }
          ]
        },
        {
          id: 'flutter-session-08',
          name: 'Session 08: Navigation & Architecture',
          topics: [
            { id: 'flutter-session-08-overview', title: 'Session 08 Overview', status: 'draft', tags: ['flutter', 'overview'] },
            { id: 'flutter-go-router-navigator2', title: '8.1.1 GoRouter and Navigator 2.0', status: 'draft', tags: ['flutter', 'navigation'] },
            { id: 'flutter-app-architecture-layers', title: '8.2.1 App Architecture and Layers', status: 'draft', tags: ['flutter', 'architecture'] },
            { id: 'flutter-dependency-injection', title: '8.2.2 Dependency Injection', status: 'draft', tags: ['flutter', 'architecture'] },
            { id: 'flutter-design-patterns-flutter', title: '8.2.3 Design Patterns in Flutter', status: 'draft', tags: ['flutter', 'patterns'] }
          ]
        },
        {
          id: 'flutter-session-09',
          name: 'Session 09: Animations',
          topics: [
            { id: 'flutter-session-09-overview', title: 'Session 09 Overview', status: 'draft', tags: ['flutter', 'overview'] },
            { id: 'flutter-controller-curves-ticker', title: '9.1.1 Animation Controller, Curves and Ticker', status: 'draft', tags: ['flutter', 'animation'] },
            { id: 'flutter-animated-widgets', title: '9.1.2 Implicit and Explicit Animated Widgets', status: 'draft', tags: ['flutter', 'animation'] },
            { id: 'flutter-hero-custom-transitions', title: '9.1.3 Hero and Custom Transitions', status: 'draft', tags: ['flutter', 'animation'] }
          ]
        },
        {
          id: 'flutter-session-10',
          name: 'Session 10: Flutter Internals & Performance',
          topics: [
            { id: 'flutter-session-10-overview', title: 'Session 10 Overview', status: 'draft', tags: ['flutter', 'overview'] },
            { id: 'flutter-three-trees-rendering', title: '10.1.1 Three Trees: Widget, Element, RenderObject', status: 'draft', tags: ['flutter', 'internals'] },
            { id: 'flutter-render-pipeline', title: '10.1.2 Build, Layout and Paint Pipeline', status: 'draft', tags: ['flutter', 'internals'] },
            { id: 'flutter-memory-profiling', title: '10.2.1 Memory Management and Profiling', status: 'draft', tags: ['flutter', 'performance'] },
            { id: 'flutter-build-optimization-const', title: '10.2.2 Build Cost Optimization and Const', status: 'draft', tags: ['flutter', 'performance'] }
          ]
        },
        {
          id: 'flutter-session-11',
          name: 'Session 11: Testing & Quality',
          topics: [
            { id: 'flutter-session-11-overview', title: 'Session 11 Overview', status: 'draft', tags: ['flutter', 'overview'] },
            { id: 'flutter-unit-testing-mocking', title: '11.1.1 Unit Testing and Mocking', status: 'draft', tags: ['flutter', 'testing'] },
            { id: 'flutter-widget-golden-testing', title: '11.1.2 Widget Testing and Golden Tests', status: 'draft', tags: ['flutter', 'testing'] },
            { id: 'flutter-integration-tdd', title: '11.1.3 Integration Testing and TDD Workflow', status: 'draft', tags: ['flutter', 'testing'] },
            { id: 'flutter-lints-analysis-style', title: '11.2.1 Lints, Analysis and Code Style', status: 'draft', tags: ['flutter', 'quality'] }
          ]
        },
        {
          id: 'flutter-session-12',
          name: 'Session 12: CI/CD & Deployment',
          topics: [
            { id: 'flutter-session-12-overview', title: 'Session 12 Overview', status: 'draft', tags: ['flutter', 'overview'] },
            { id: 'flutter-flavors-environments', title: '12.1.1 Flavors and Environments', status: 'draft', tags: ['flutter', 'release'] },
            { id: 'flutter-signing-versioning', title: '12.1.2 Signing and Versioning', status: 'draft', tags: ['flutter', 'release'] },
            { id: 'flutter-cicd-codemagic-fastlane', title: '12.1.3 CI/CD: Codemagic, GitHub Actions, Fastlane', status: 'draft', tags: ['flutter', 'cicd'] },
            { id: 'flutter-playstore-deployment', title: '12.2.1 Play Store Deployment', status: 'draft', tags: ['flutter', 'deployment'] },
            { id: 'flutter-appstore-deployment', title: '12.2.2 App Store Deployment', status: 'draft', tags: ['flutter', 'deployment'] }
          ]
        }
      ]
    },
    {
      id: 'git-beginner',
      name: 'Git & GitHub Beginner',
      icon: 'git',
      color: 'orange',
      description: 'Lộ trình Git & GitHub dành cho người mới theo roadmap.sh: Version Control Foundations, Basic Git Commands, Collaboration với GitHub, More Git và More GitHub.',
      modules: [
        {
          id: 'git-mod-basics',
          name: 'Module 01: Version Control Foundations',
          topics: [
            { id: 'git-what-is-vcs', title: '1.1 Version Control System là gì?', status: 'published', tags: ['git', 'vcs'] },
            { id: 'git-what-is-git', title: '1.2 Git là gì & vì sao nên dùng?', status: 'published', tags: ['git', 'dvcs'] },
            { id: 'git-install-git', title: '1.3 Cài đặt Git', status: 'published', tags: ['git', 'install'] },
            { id: 'git-github-account', title: '1.4 Tạo tài khoản GitHub', status: 'published', tags: ['github', 'ssh'] }
          ]
        },
        {
          id: 'git-mod-basic-usage',
          name: 'Module 02: Basic Git Usage',
          topics: [
            { id: 'git-init', title: '2.1 git init — Khởi tạo Repository', status: 'published', tags: ['git', 'init'] },
            { id: 'git-add', title: '2.2 git add — Đưa thay đổi vào Staging', status: 'published', tags: ['git', 'add', 'staging'] },
            { id: 'git-commit', title: '2.3 git commit — Ghi snapshot vào lịch sử', status: 'published', tags: ['git', 'commit'] },
            { id: 'git-reset-unstage', title: '2.4 git reset — Rút thay đổi khỏi Staging', status: 'published', tags: ['git', 'reset'] },
            { id: 'git-gitignore', title: '2.5 .gitignore — Loại trừ file khỏi Git', status: 'published', tags: ['git', 'gitignore'] },
            { id: 'git-branches-merge', title: '2.6 Branch — Tạo và Merge nhánh', status: 'published', tags: ['git', 'branch', 'merge'] }
          ]
        },
        {
          id: 'git-mod-collaboration',
          name: 'Module 03: Collaboration với GitHub',
          topics: [
            { id: 'git-create-repository', title: '3.1 Tạo Repository trên GitHub', status: 'published', tags: ['github', 'repository'] },
            { id: 'git-remote-push', title: '3.2 Remote & Push — Kết nối local với GitHub', status: 'published', tags: ['git', 'remote', 'push'] },
            { id: 'git-fork-clone', title: '3.3 Fork vs Clone', status: 'published', tags: ['git', 'fork', 'clone'] },
            { id: 'git-pull-request', title: '3.4 Pull Request — Đề xuất hợp nhất code', status: 'published', tags: ['github', 'pull-request'] },
            { id: 'git-pull-fetch', title: '3.5 Pull & Fetch — Lấy code mới về máy', status: 'published', tags: ['git', 'pull', 'fetch'] },
            { id: 'git-merge-conflicts', title: '3.6 Merge Conflicts — Xử lý xung đột', status: 'published', tags: ['git', 'merge', 'conflict'] },
            { id: 'git-oss-licenses', title: '3.7 Giấy phép nguồn mở phổ biến', status: 'published', tags: ['license', 'open-source'] },
            { id: 'git-security-secrets', title: '3.8 Lộ secret — Xử lý khẩn cấp & phòng ngừa', status: 'published', tags: ['security', 'secrets'] }
          ]
        },
        {
          id: 'git-mod-more-git',
          name: 'Module 04: More Git',
          topics: [
            { id: 'git-revert-hard-reset', title: '4.1 Revert & Hard Reset — Sửa sai an toàn', status: 'published', tags: ['git', 'revert', 'reset'] },
            { id: 'git-rebase-merge-squash', title: '4.2 Rebase vs Merge vs Squash', status: 'published', tags: ['git', 'rebase', 'squash'] },
            { id: 'git-stash', title: '4.3 git stash — Cất tạm thay đổi', status: 'published', tags: ['git', 'stash'] },
            { id: 'git-cherry-pick', title: '4.4 git cherry-pick — Chọn một commit riêng', status: 'published', tags: ['git', 'cherry-pick'] },
            { id: 'git-flow', title: '4.5 Git Flow — Chiến lược phân nhánh cho team', status: 'published', tags: ['git', 'workflow', 'branching'] },
            { id: 'git-rescue-reflog', title: '4.6 Cứu hộ — Tìm lại commit đã mất (reflog)', status: 'published', tags: ['git', 'reflog', 'recovery'] },
            { id: 'git-repo-performance', title: '4.7 Repository phình to — Nguyên nhân & xử lý', status: 'published', tags: ['git', 'performance', 'lfs'] }
          ]
        },
        {
          id: 'git-mod-more-github',
          name: 'Module 05: More GitHub',
          topics: [
            { id: 'git-actions', title: '5.1 GitHub Actions — Tự động hóa CI/CD', status: 'published', tags: ['github', 'actions', 'ci'] },
            { id: 'git-cli', title: '5.2 GitHub CLI — Thao tác GitHub từ terminal', status: 'published', tags: ['github', 'cli'] },
            { id: 'git-markdown', title: '5.3 Markdown — Ngôn ngữ viết của GitHub', status: 'published', tags: ['markdown', 'documentation'] },
            { id: 'git-git-hooks', title: '5.4 Git Hooks — Tự động kiểm tra trước khi push', status: 'published', tags: ['git', 'hooks', 'automation'] }
          ]
        }
      ]
    },
    {
      id: 'devops',
      name: 'DevOps',
      icon: 'devops',
      color: 'orange',
      description: 'CI/CD, containerization, cloud infrastructure',
      modules: [
        {
          id: 'docker',
          name: 'Docker',
          topics: [
            { id: 'docker-basics', title: 'Docker Fundamentals', status: 'published', tags: ['devops'] },
            { id: 'docker-compose', title: 'Docker Compose', status: 'published', tags: ['devops'] },
            { id: 'dockerfile', title: 'Writing Efficient Dockerfiles', status: 'draft', tags: ['devops'] },
          ]
        },
        {
          id: 'k8s',
          name: 'Kubernetes',
          topics: [
            { id: 'k8s-pods', title: 'Pods & Deployments', status: 'published', tags: ['devops'] },
            { id: 'k8s-services', title: 'Services & Networking', status: 'draft', tags: ['devops'] },
          ]
        }
      ]
    },
    {
      id: 'database',
      name: 'Database',
      icon: 'database',
      color: 'purple',
      description: 'Cơ sở dữ liệu quan hệ, NoSQL, caching',
      modules: [
        {
          id: 'postgresql',
          name: 'PostgreSQL',
          topics: [
            { id: 'pg-indexing', title: 'Indexing & Query Optimization', status: 'published', tags: ['backend'] },
            { id: 'pg-transactions', title: 'Transactions & ACID', status: 'published', tags: ['backend'] },
          ]
        },
        {
          id: 'redis',
          name: 'Redis',
          topics: [
            { id: 'redis-cache', title: 'Caching Strategies with Redis', status: 'published', tags: ['backend'] },
            { id: 'redis-pub-sub', title: 'Pub/Sub Pattern', status: 'draft', tags: ['backend'] },
          ]
        }
      ]
    },
    {
      id: 'system-design',
      name: 'System Design',
      icon: 'system-design',
      color: 'pink',
      description: 'Thiết kế hệ thống phân tán, scalability',
      modules: [
        {
          id: 'fundamentals',
          name: 'Fundamentals',
          topics: [
            { id: 'cap-theorem', title: 'CAP Theorem', status: 'published', tags: ['backend'] },
            { id: 'load-balancing', title: 'Load Balancing', status: 'published', tags: ['backend'] },
            { id: 'caching-patterns', title: 'Caching Patterns', status: 'published', tags: ['backend'] },
          ]
        }
      ]
    },
    {
      id: 'algorithms',
      name: 'Algorithms',
      icon: 'algorithms',
      color: 'fuchsia',
      description: 'Cấu trúc dữ liệu, giải thuật, phân tích độ phức tạp',
      modules: [
        {
          id: 'dsa-ch0',
          name: 'Lời nói đầu',
          topics: [
            { id: 'dsa-about-book', title: 'Về cuốn sách (About This Book)', status: 'published', tags: ['dsa', 'hello-algo', 'introduction'] },
            { id: 'dsa-suggestions', title: 'Hướng dẫn sử dụng hiệu quả (Suggestions)', status: 'published', tags: ['dsa', 'hello-algo', 'study-guide'] },
            { id: 'dsa-preface-summary', title: 'Tóm tắt (Preface Summary)', status: 'published', tags: ['dsa', 'summary'] },
          ]
        },
        {
          id: 'dsa-intro',
          name: 'Chương 1: Làm quen với Giải thuật',
          topics: [
            { id: 'dsa-encounter', title: 'Gặp gỡ Giải thuật', status: 'published', tags: ['dsa', 'intro'] },
            { id: 'dsa-everywhere', title: '1.1 Giải thuật ở khắp mọi nơi', status: 'published', tags: ['dsa', 'intro'] },
            { id: 'dsa-what-is', title: '1.2 Cấu trúc dữ liệu & Giải thuật là gì', status: 'published', tags: ['dsa', 'intro'] },
            { id: 'dsa-intro-summary', title: '1.3 Tóm tắt & Hỏi đáp', status: 'published', tags: ['dsa', 'intro'] },
          ]
        },
        {
          id: 'dsa-complexity',
          name: 'Chương 2: Phân tích Độ phức tạp',
          topics: [
            { id: 'dsa-complexity-index', title: 'Phân tích Độ phức tạp (Complexity Analysis)', status: 'published', tags: ['dsa', 'complexity'] },
            { id: 'dsa-performance', title: '2.1 Algorithm Efficiency Evaluation (Đánh giá Hiệu năng)', status: 'published', tags: ['dsa', 'complexity'] },
            { id: 'dsa-iteration-recursion', title: '2.2 Iteration and Recursion (Vòng lặp & Đệ quy)', status: 'published', tags: ['dsa', 'complexity'] },
            { id: 'dsa-time-complexity', title: '2.3 Time Complexity (Độ phức tạp Thời gian)', status: 'published', tags: ['dsa', 'complexity'] },
            { id: 'dsa-space-complexity', title: '2.4 Space Complexity (Độ phức tạp Không gian)', status: 'published', tags: ['dsa', 'complexity'] },
            { id: 'dsa-complexity-summary', title: '2.5 Tóm tắt & Hỏi đáp', status: 'published', tags: ['dsa', 'complexity'] },
          ]
        },
        {
          id: 'dsa-structures',
          name: 'Chương 3: Cấu trúc dữ liệu cơ bản',
          topics: [
            { id: 'dsa-structures-index', title: 'Cấu trúc dữ liệu', status: 'published', tags: ['dsa', 'structures'] },
            { id: 'dsa-classification', title: '3.1 Classification of Data Structures (Phân loại Cấu trúc dữ liệu)', status: 'published', tags: ['dsa', 'structures'] },
            { id: 'dsa-basic-types', title: '3.2 Basic Data Types (Kiểu dữ liệu cơ bản)', status: 'published', tags: ['dsa', 'structures'] },
            { id: 'dsa-number-encoding', title: '3.3 Number Encoding * (Mã hóa Số)', status: 'published', tags: ['dsa', 'structures'] },
            { id: 'dsa-character-encoding', title: '3.4 Character Encoding * (Mã hóa Ký tự)', status: 'published', tags: ['dsa', 'structures'] },
            { id: 'dsa-structures-summary', title: '3.5 Tóm tắt & Hỏi đáp', status: 'published', tags: ['dsa', 'structures', 'summary'] },
          ]
        },
        {
          id: 'dsa-array-linkedlist',
          name: 'Chương 4: Mảng & Danh sách liên kết',
          topics: [
            { id: 'dsa-array-linkedlist-index', title: 'Mảng & Danh sách liên kết', status: 'published', tags: ['dsa', 'array', 'linkedlist'] },
            { id: 'dsa-array', title: '4.1 Array (Mảng)', status: 'published', tags: ['dsa', 'array'] },
            { id: 'dsa-linked-list', title: '4.2 Linked List (Danh sách liên kết)', status: 'published', tags: ['dsa', 'linkedlist'] },
            { id: 'dsa-list', title: '4.3 List (Danh sách)', status: 'published', tags: ['dsa', 'list'] },
            { id: 'dsa-ram-cache', title: '4.4 Bộ nhớ RAM và Cache *', status: 'published', tags: ['dsa', 'memory', 'cache'] },
            { id: 'dsa-array-linkedlist-summary', title: '4.5 Tóm tắt', status: 'published', tags: ['dsa', 'array', 'linkedlist'] },
          ]
        },
        {
          id: 'dsa-ch05',
          name: 'Chương 5: Ngăn xếp & Hàng đợi',
          topics: [
            { id: 'dsa-stack-queue-index', title: 'Ngăn xếp & Hàng đợi', status: 'published', tags: ['dsa', 'stack', 'queue'] },
            { id: 'dsa-stack', title: '5.1 Stack (Ngăn xếp)', status: 'published', tags: ['dsa', 'stack'] },
            { id: 'dsa-queue', title: '5.2 Queue (Hàng đợi)', status: 'published', tags: ['dsa', 'queue'] },
            { id: 'dsa-deque', title: '5.3 Deque (Hàng đợi hai đầu)', status: 'published', tags: ['dsa', 'deque', 'queue'] },
            { id: 'dsa-stack-queue-summary', title: '5.4 Tóm tắt', status: 'published', tags: ['dsa', 'stack', 'queue', 'deque'] },
          ]
        },
        {
          id: 'dsa-ch06',
          name: 'Chương 6: Bảng băm',
          topics: [
            { id: 'dsa-hash-table-index', title: 'Bảng băm', status: 'published', tags: ['dsa', 'hashing'] },
            { id: 'dsa-hash-map', title: '6.1 Hash Table (Bảng băm)', status: 'published', tags: ['dsa', 'hashmap'] },
            { id: 'dsa-hash-collision', title: '6.2 Xung đột băm (Hash Collision)', status: 'published', tags: ['dsa', 'hashcollision'] },
            { id: 'dsa-hash-algorithm', title: '6.3 Thuật toán băm (Hash Algorithm)', status: 'published', tags: ['dsa', 'hashalgorithm'] },
            { id: 'dsa-hash-table-summary', title: '6.4 Tóm tắt', status: 'published', tags: ['dsa', 'hashing', 'summary'] },
          ]
        },
        {
          id: 'dsa-ch07',
          name: 'Chương 7: Cây',
          topics: [
            { id: 'dsa-tree-index', title: 'Cây', status: 'published', tags: ['dsa', 'tree', 'binary-tree'] },
            { id: 'dsa-binary-tree', title: '7.1 Binary Tree (Cây nhị phân)', status: 'published', tags: ['dsa', 'tree', 'binary-tree'] },
            { id: 'dsa-binary-tree-traversal', title: '7.2 Duyệt cây nhị phân', status: 'published', tags: ['dsa', 'tree', 'traversal', 'bfs', 'dfs'] },
            { id: 'dsa-array-representation-of-tree', title: '7.3 Biểu diễn cây bằng mảng', status: 'published', tags: ['dsa', 'tree', 'array'] },
            { id: 'dsa-binary-search-tree', title: '7.4 Cây tìm kiếm nhị phân', status: 'published', tags: ['dsa', 'tree', 'binary-search-tree', 'bst'] },
            { id: 'dsa-avl-tree', title: '7.5 Cây AVL (Cân bằng)', status: 'published', tags: ['dsa', 'tree', 'avl-tree', 'balanced-tree'] },
            { id: 'dsa-tree-summary', title: '7.6 Tóm tắt & Hỏi đáp', status: 'published', tags: ['dsa', 'tree', 'summary'] },
          ]
        },
        {
          id: 'dsa-ch08',
          name: 'Chương 8: Heap',
          topics: [
            { id: 'dsa-heap-index', title: 'Heap', status: 'published', tags: ['dsa', 'heap', 'priority-queue'] },
            { id: 'dsa-heap', title: '8.1 Cấu trúc dữ liệu Heap', status: 'published', tags: ['dsa', 'heap', 'min-heap', 'max-heap'] },
            { id: 'dsa-build-heap', title: '8.2 Xây dựng Heap (Build Heap)', status: 'published', tags: ['dsa', 'heap', 'heapify'] },
            { id: 'dsa-top-k', title: '8.3 Bài toán Top-k', status: 'published', tags: ['dsa', 'heap', 'top-k', 'algorithm'] },
            { id: 'dsa-heap-summary', title: '8.4 Tóm tắt & Hỏi đáp', status: 'published', tags: ['dsa', 'heap', 'summary'] },
          ]
        },
        {
          id: 'dsa-ch09',
          name: 'Chương 9: Đồ thị',
          topics: [
            { id: 'dsa-graph-index', title: 'Đồ thị (Graph)', status: 'published', tags: ['dsa', 'graph', 'network'] },
            { id: 'dsa-graph', title: '9.1 Cấu trúc dữ liệu Đồ thị', status: 'published', tags: ['dsa', 'graph', 'adjacency-matrix', 'adjacency-list'] },
            { id: 'dsa-graph-operations', title: '9.2 Các thao tác cơ bản trên Đồ thị', status: 'published', tags: ['dsa', 'graph', 'operations'] },
            { id: 'dsa-graph-traversal', title: '9.3 Duyệt Đồ thị (BFS & DFS)', status: 'published', tags: ['dsa', 'graph', 'traversal', 'bfs', 'dfs'] },
            { id: 'dsa-graph-summary', title: '9.4 Tóm tắt & Hỏi đáp', status: 'published', tags: ['dsa', 'graph', 'summary'] },
          ]
        },
        {
          id: 'dsa-ch10',
          name: 'Chương 10: Tìm kiếm',
          topics: [
            { id: 'dsa-searching-index', title: 'Tìm kiếm (Searching)', status: 'published', tags: ['dsa', 'searching', 'binary-search', 'algorithm'] },
            { id: 'dsa-binary-search', title: '10.1 Tìm kiếm Nhị phân (Binary Search)', status: 'published', tags: ['dsa', 'searching', 'binary-search', 'divide-and-conquer'] },
            { id: 'dsa-binary-search-insertion', title: '10.2 Vị trí chèn trong Tìm kiếm Nhị phân', status: 'published', tags: ['dsa', 'searching', 'binary-search', 'insertion'] },
            { id: 'dsa-binary-search-edge', title: '10.3 Tìm kiếm Biên (Boundary Search)', status: 'published', tags: ['dsa', 'searching', 'binary-search', 'boundary'] },
            { id: 'dsa-hash-optimization', title: '10.4 Tối ưu hóa bằng Hashing', status: 'published', tags: ['dsa', 'searching', 'hash-table', 'two-sum'] },
            { id: 'dsa-searching-revisited', title: '10.5 Duyệt lại các Thuật toán Tìm kiếm', status: 'published', tags: ['dsa', 'searching', 'comparison'] },
            { id: 'dsa-searching-summary', title: '10.6 Tóm tắt & Hỏi đáp', status: 'published', tags: ['dsa', 'searching', 'summary'] },
          ]
        },
        {
          id: 'dsa-ch11',
          name: 'Chương 11: Sắp xếp',
          topics: [
            { id: 'dsa-sorting-index', title: 'Sắp xếp (Sorting)', status: 'published', tags: ['dsa', 'sorting', 'algorithm'] },
            { id: 'dsa-sorting-algorithms', title: '11.1 Tổng quan Thuật toán Sắp xếp', status: 'published', tags: ['dsa', 'sorting', 'theory'] },
            { id: 'dsa-selection-sort', title: '11.2 Sắp xếp Chọn (Selection Sort)', status: 'published', tags: ['dsa', 'sorting', 'selection-sort'] },
            { id: 'dsa-bubble-sort', title: '11.3 Sắp xếp Nổi bọt (Bubble Sort)', status: 'published', tags: ['dsa', 'sorting', 'bubble-sort'] },
            { id: 'dsa-insertion-sort', title: '11.4 Sắp xếp Chèn (Insertion Sort)', status: 'published', tags: ['dsa', 'sorting', 'insertion-sort'] },
            { id: 'dsa-quick-sort', title: '11.5 Sắp xếp Nhanh (Quick Sort)', status: 'published', tags: ['dsa', 'sorting', 'quick-sort', 'divide-and-conquer'] },
            { id: 'dsa-merge-sort', title: '11.6 Sắp xếp Trộn (Merge Sort)', status: 'published', tags: ['dsa', 'sorting', 'merge-sort', 'divide-and-conquer'] },
            { id: 'dsa-heap-sort', title: '11.7 Sắp xếp Vun đống (Heap Sort)', status: 'published', tags: ['dsa', 'sorting', 'heap-sort'] },
            { id: 'dsa-bucket-sort', title: '11.8 Sắp xếp Xô (Bucket Sort)', status: 'published', tags: ['dsa', 'sorting', 'bucket-sort'] },
            { id: 'dsa-counting-sort', title: '11.9 Sắp xếp Đếm (Counting Sort)', status: 'published', tags: ['dsa', 'sorting', 'counting-sort'] },
            { id: 'dsa-radix-sort', title: '11.10 Sắp xếp Cơ số (Radix Sort)', status: 'published', tags: ['dsa', 'sorting', 'radix-sort'] },
            { id: 'dsa-sorting-summary', title: '11.11 Tóm tắt & Hỏi đáp', status: 'published', tags: ['dsa', 'sorting', 'summary'] },
          ]
        },
        {
          id: 'dsa-ch12',
          name: 'Chương 12: Chia để trị',
          topics: [
            { id: 'dsa-divide-conquer-index', title: 'Chia để trị (Divide and Conquer)', status: 'published', tags: ['dsa', 'divide-and-conquer', 'algorithm-design'] },
            { id: 'dsa-divide-conquer', title: '12.1 Thuật toán Chia để trị', status: 'published', tags: ['dsa', 'divide-and-conquer', 'algorithm-design', 'merge-sort'] },
            { id: 'dsa-binary-search-recur', title: '12.2 Tìm kiếm nhị phân bằng Đệ quy', status: 'published', tags: ['dsa', 'divide-and-conquer', 'binary-search', 'recursion'] },
            { id: 'dsa-build-binary-tree', title: '12.3 Xây dựng Cây nhị phân', status: 'published', tags: ['dsa', 'divide-and-conquer', 'binary-tree', 'algorithm'] },
            { id: 'dsa-hanota', title: '12.4 Bài toán Tháp Hà Nội (Hanota)', status: 'published', tags: ['dsa', 'divide-and-conquer', 'hanota', 'recursion'] },
            { id: 'dsa-divide-conquer-summary', title: 'Tóm tắt & Hỏi đáp', status: 'published', tags: ['dsa', 'divide-and-conquer', 'summary'] },
          ]
        },
        {
          id: 'dsa-ch13',
          name: 'Chương 13: Quay lui',
          topics: [
            { id: 'dsa-backtracking-index', title: 'Quay lui (Backtracking)', status: 'published', tags: ['dsa', 'backtracking', 'algorithm-design', 'dfs', 'pruning'] },
            { id: 'dsa-backtracking-algorithm', title: '13.1 Thuật toán Quay lui', status: 'published', tags: ['dsa', 'backtracking', 'algorithm-design', 'dfs', 'pruning'] },
            { id: 'dsa-permutations', title: '13.2 Bài toán Hoán vị (Permutations)', status: 'published', tags: ['dsa', 'backtracking', 'permutations', 'combinatorics'] },
            { id: 'dsa-subset-sum', title: '13.3 Bài toán Tổng tập con (Subset Sum)', status: 'published', tags: ['dsa', 'backtracking', 'subset-sum', 'combinations'] },
            { id: 'dsa-n-queens', title: '13.4 Bài toán N-Hậu (N-Queens)', status: 'published', tags: ['dsa', 'backtracking', 'n-queens', 'constraint-satisfaction'] },
            { id: 'dsa-backtracking-summary', title: 'Tóm tắt & Hỏi đáp', status: 'published', tags: ['dsa', 'backtracking', 'summary'] },
          ]
        },
        {
          id: 'dsa-ch14',
          name: 'Chương 14: Quy hoạch động',
          topics: [
            { id: 'dsa-dp-index', title: 'Quy hoạch động (Dynamic Programming)', status: 'published', tags: ['dsa', 'dynamic-programming', 'algorithm-design'] },
            { id: 'dsa-dp-intro', title: '14.1 Giới thiệu Quy hoạch động', status: 'published', tags: ['dsa', 'dynamic-programming', 'memoization', 'tabulation'] },
            { id: 'dsa-dp-features', title: '14.2 Đặc trưng của Quy hoạch động', status: 'published', tags: ['dsa', 'dynamic-programming', 'optimal-substructure', 'no-aftereffects'] },
            { id: 'dsa-dp-pipeline', title: '14.3 Quy trình giải bài toán DP', status: 'published', tags: ['dsa', 'dynamic-programming', 'framework', 'minimum-path-sum'] },
            { id: 'dsa-knapsack', title: '14.4 Bài toán Cái túi 0-1 (0-1 Knapsack)', status: 'published', tags: ['dsa', 'dynamic-programming', 'knapsack', 'optimization'] },
            { id: 'dsa-unbounded-knapsack', title: '14.5 Cái túi không giới hạn & Đổi tiền', status: 'published', tags: ['dsa', 'dynamic-programming', 'unbounded-knapsack', 'coin-change'] },
            { id: 'dsa-edit-distance', title: '14.6 Khoảng cách chỉnh sửa (Edit Distance)', status: 'published', tags: ['dsa', 'dynamic-programming', 'edit-distance', 'string-algorithms'] },
            { id: 'dsa-dp-summary', title: 'Tóm tắt & Hỏi đáp', status: 'published', tags: ['dsa', 'dynamic-programming', 'summary'] },
          ]
        },
        {
          id: 'dsa-ch15',
          name: 'Chương 15: Tham lam',
          topics: [
            { id: 'dsa-greedy-index', title: 'Tham lam (Greedy)', status: 'published', tags: ['dsa', 'greedy', 'algorithm-design'] },
            { id: 'dsa-greedy-intro', title: '15.1 Thuật toán Tham lam', status: 'published', tags: ['dsa', 'greedy', 'algorithm-design', 'optimization'] },
            { id: 'dsa-fractional-knapsack', title: '15.2 Bài toán Cái túi phân số', status: 'published', tags: ['dsa', 'greedy', 'fractional-knapsack', 'sorting'] },
            { id: 'dsa-max-capacity', title: '15.3 Bài toán Chứa nước nhiều nhất', status: 'published', tags: ['dsa', 'greedy', 'two-pointers', 'max-capacity'] },
            { id: 'dsa-max-product-cutting', title: '15.4 Bài toán Cắt tích lớn nhất', status: 'published', tags: ['dsa', 'greedy', 'math', 'number-theory'] },
            { id: 'dsa-greedy-summary', title: 'Tóm tắt & Hỏi đáp', status: 'published', tags: ['dsa', 'greedy', 'summary'] },
          ]
        },
        {
          id: 'dsa-ch16',
          name: 'Phụ lục',
          topics: [
            { id: 'dsa-appendix-index', title: 'Phụ lục', status: 'published', tags: ['dsa', 'appendix'] },
            { id: 'dsa-installation', title: '16.1 Cài đặt môi trường (Installation)', status: 'published', tags: ['dsa', 'appendix', 'environment-setup', 'vscode'] },
            { id: 'dsa-contribution', title: '16.2 Đóng góp (Contribution)', status: 'published', tags: ['dsa', 'appendix', 'open-source', 'contribution'] },
            { id: 'dsa-terminology', title: '16.3 Bảng thuật ngữ (Glossary)', status: 'published', tags: ['dsa', 'appendix', 'terminology', 'glossary'] },
          ]
        }
      ]
    }
  ]
};

// ── LeetCode 500 — dynamic domain injection (5 Level / 17 Module) ──
(function injectLeetCodeDomain() {
  if (typeof LEETCODE_CONTENT === 'undefined') return;
  if (KNOWLEDGE_DATA.domains.some(d => d.id === 'leetcode')) return;
  const LEVEL_META = {
    1: { name: 'Level 1 — Foundation', desc: 'Array & Hashing, Two Pointers, Sliding Window, Stack, Binary Search', count: 0 },
    2: { name: 'Level 2 — Linear Structures', desc: 'Linked List, Intervals, Matrix & Sorting', count: 0 },
    3: { name: 'Level 3 — Hierarchical', desc: 'Trees, Heap, Trie, Segment Tree', count: 0 },
    4: { name: 'Level 4 — Graph & Search', desc: 'Graph, Backtracking, Advanced Graph', count: 0 },
    5: { name: 'Level 5 — DP & Math', desc: '1D/2D DP, Greedy, Bit, Math & Hard Mix', count: 0 }
  };
  // Build level -> pattern -> topics
  const levelMap = {};
  Object.keys(LEETCODE_CONTENT).forEach(tid => {
    const c = LEETCODE_CONTENT[tid];
    const lv = c.level;
    if (!levelMap[lv]) levelMap[lv] = {};
    if (!levelMap[lv][c.pattern]) levelMap[lv][c.pattern] = [];
    levelMap[lv][c.pattern].push({
      id: tid,
      title: c.title,
      status: 'published',
      tags: c.tags,
      difficulty: c.difficulty,
      leetcodeId: c.leetcodeId,
      pattern: c.pattern,
      level: c.level
    });
  });
  const orderedModules = [];
  Object.keys(LEVEL_META).sort((a,b)=>a-b).forEach(lvStr => {
    const lv = parseInt(lvStr,10);
    const patterns = levelMap[lv] || {};
    const allTopics = [];
    const sections = [];
    Object.keys(patterns).sort().forEach(pattern => {
      const tlist = patterns[pattern].sort((a,b)=> a.leetcodeId - b.leetcodeId);
      allTopics.push(...tlist);
      sections.push({
        id: 'lc-lv'+lv+'-'+pattern.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''),
        name: pattern + ' (' + tlist.length + ')',
        topics: tlist.map(t=>t.id)
      });
    });
    LEVEL_META[lv].count = allTopics.length;
    orderedModules.push({
      id: 'lc-level-'+lv,
      name: LEVEL_META[lv].name + ' • ' + allTopics.length + ' bài',
      description: LEVEL_META[lv].desc,
      level: lv,
      topics: allTopics,
      sections: sections
    });
  });
  const lcTotal = orderedModules.reduce((s,m)=>s+m.topics.length,0);
  const catTotal = (typeof LEETCODE_PROBLEMS_META !== 'undefined' && LEETCODE_PROBLEMS_META && LEETCODE_PROBLEMS_META.totalFree) || lcTotal;
  KNOWLEDGE_DATA.domains.push({
    id: 'leetcode',
    name: `LeetCode Grind • ${catTotal} Free`,
    icon: 'leetcode',
    color: 'amber',
    description: `${lcTotal} bài học đầy đủ (5 ngôn ngữ C++/Java/Kotlin/Swift/Dart) trong 5 Level / 17 Pattern • Catalog ${catTotal} bài free LeetCode với tag chính thức — duyệt theo Pattern, Tag, Độ khó hoặc kết hợp.`,
    modules: orderedModules
  });
})();

// ── LeetCode Catalog — toàn bộ bài free (metadata từ problems.json) ──
const LC_CATALOG = {
  enabled: false,
  problems: [],
  tagsMeta: [],
  byDifficulty: { Easy: 0, Medium: 0, Hard: 0 },
  totalFree: 0,
  lessonByProblemId: {}
};
(function initLcCatalog() {
  if (typeof LEETCODE_PROBLEMS_META === 'undefined' || !LEETCODE_PROBLEMS_META || !Array.isArray(LEETCODE_PROBLEMS_META.problems)) return;
  LC_CATALOG.enabled = true;
  LC_CATALOG.problems = LEETCODE_PROBLEMS_META.problems;
  LC_CATALOG.tagsMeta = (typeof LEETCODE_TAGS_META !== 'undefined') ? LEETCODE_TAGS_META : [];
  LC_CATALOG.byDifficulty = LEETCODE_PROBLEMS_META.byDifficulty || LC_CATALOG.byDifficulty;
  LC_CATALOG.totalFree = LEETCODE_PROBLEMS_META.totalFree || LC_CATALOG.problems.length;
  Object.keys(LEETCODE_CONTENT).forEach(tid => {
    const c = LEETCODE_CONTENT[tid];
    if (c.leetcodeId && !LC_CATALOG.lessonByProblemId[c.leetcodeId]) LC_CATALOG.lessonByProblemId[c.leetcodeId] = tid;
  });
})();

// Trạng thái duyệt catalog
let lcBrowseMode = 'pattern';   // 'pattern' | 'tag' | 'difficulty' | 'combo'
let lcCatalogTag = null;        // slug tag đang chọn
let lcCatalogDiff = null;       // 'Easy' | 'Medium' | 'Hard' | null
let lcCatalogLimit = 100;       // số dòng bảng hiển thị mỗi lần
let lcSidebarGroup = 'pattern'; // 'pattern' | 'difficulty' | 'tag'

function ensureLcCatalogProgress() {
  if (!progressState.lcCatalog) progressState.lcCatalog = {};
}
function isLcCatalogDone(problemId) {
  ensureLcCatalogProgress();
  return !!progressState.lcCatalog[problemId];
}
function toggleLcCatalogDone(problemId) {
  ensureLcCatalogProgress();
  if (progressState.lcCatalog[problemId]) delete progressState.lcCatalog[problemId];
  else progressState.lcCatalog[problemId] = new Date().toISOString();
  saveProgress();
  refreshLcCatalogView();
}
window.toggleLcCatalogDone = toggleLcCatalogDone;

function setLcBrowseMode(mode) {
  lcBrowseMode = mode;
  lcCatalogLimit = 100;
  if (currentDomainId === 'leetcode') showDomain('leetcode');
}
window.setLcBrowseMode = setLcBrowseMode;

function setLcCatalogTag(slug) {
  lcCatalogTag = (lcCatalogTag === slug) ? null : slug;
  lcCatalogLimit = 100;
  if (currentDomainId === 'leetcode') { showDomain('leetcode'); scrollLcCatalogIntoView(); }
}
window.setLcCatalogTag = setLcCatalogTag;

function setLcCatalogDiff(diff) {
  lcCatalogDiff = (lcCatalogDiff === diff) ? null : diff;
  lcCatalogLimit = 100;
  if (currentDomainId === 'leetcode') { showDomain('leetcode'); scrollLcCatalogIntoView(); }
}
window.setLcCatalogDiff = setLcCatalogDiff;

function applyLcCombo() {
  const tagSel = document.getElementById('lc-combo-tag');
  const diffSel = document.getElementById('lc-combo-diff');
  lcCatalogTag = tagSel && tagSel.value ? tagSel.value : null;
  lcCatalogDiff = diffSel && diffSel.value ? diffSel.value : null;
  lcCatalogLimit = 100;
  refreshLcCatalogView();
  scrollLcCatalogIntoView();
}
window.applyLcCombo = applyLcCombo;

function moreLcCatalog() {
  lcCatalogLimit += 200;
  refreshLcCatalogView();
}
window.moreLcCatalog = moreLcCatalog;

function refreshLcCatalogView() {
  const container = document.getElementById('lc-catalog-view');
  if (container) container.innerHTML = renderLcCatalogView();
}

function scrollLcCatalogIntoView() {
  setTimeout(() => {
    document.getElementById('lc-catalog-view')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 80);
}

function openLcExternal(problem) {
  window.open('https://leetcode.com/problems/' + problem.slug + '/', '_blank');
}
window.openLcExternal = openLcExternal;

function openLcExternalById(problemId) {
  const problem = LC_CATALOG.problems.find(x => x.id === problemId);
  if (problem) openLcExternal(problem);
}
window.openLcExternalById = openLcExternalById;

function filterLcProblems() {
  let list = LC_CATALOG.problems;
  if (lcCatalogTag) list = list.filter(p => p.topicTags.includes(lcCatalogTag));
  if (lcCatalogDiff) list = list.filter(p => p.difficulty === lcCatalogDiff);
  return list;
}

function renderLcProblemRow(p, idx) {
  const lessonTid = LC_CATALOG.lessonByProblemId[p.id] || null;
  const done = lessonTid ? getLcDoneCount(lessonTid) : (isLcCatalogDone(p.id) ? 5 : 0);
  const full = lessonTid ? isLcFullyDone(lessonTid) : isLcCatalogDone(p.id);
  const titleClean = escapeHtml(p.title.replace(/^\d+\.\s*/, ''));
  const tagChips = p.topicTags.slice(0, 3).map(t =>
    `<span class="lc-cat-tag" onclick="event.stopPropagation(); setLcCatalogTag('${t}')" title="${t}">${t}</span>`
  ).join('');
  const action = lessonTid
    ? `<span class="lc-cat-action lc-cat-action-lesson">Học ›</span>`
    : `<span class="lc-cat-action" onclick="event.stopPropagation(); openLcExternal(LC_CATALOG.problems.find(x=>x.id===${p.id}))" title="Mở bài gốc trên LeetCode">LeetCode ↗</span>`;
  return `<div class="lc-cat-row ${full ? 'is-done' : ''}" onclick="${lessonTid ? `openTopic('${lessonTid}')` : `openLcExternal(LC_CATALOG.problems.find(x=>x.id===${p.id}))`}">
    <button class="lc-premium-check ${full ? 'checked' : ''}" onclick="event.stopPropagation(); ${lessonTid ? `toggleLcAll('${lessonTid}')` : `toggleLcCatalogDone(${p.id})`}" aria-label="toggle done"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></button>
    <span class="lc-cat-id">#${p.id}</span>
    <span class="lc-cat-title" title="${titleClean}">${titleClean}</span>
    <span class="lc-cat-tags">${tagChips}${p.topicTags.length > 3 ? `<span class="lc-cat-tag-more">+${p.topicTags.length - 3}</span>` : ''}</span>
    <span class="lc-premium-pill lc-premium-${p.difficulty.toLowerCase()}">${p.difficulty}</span>
    ${action}
  </div>`;
}

function renderLcProblemTable(list) {
  if (!list.length) {
    return `<div style="padding:28px;text-align:center;color:var(--text-muted);font-size:13px;">Không có bài nào khớp bộ lọc.</div>`;
  }
  const shown = list.slice(0, lcCatalogLimit);
  return `<div class="lc-cat-table">
    <div class="lc-cat-head"><span></span><span>#</span><span>Tiêu đề</span><span>Tags</span><span>Độ khó</span><span></span></div>
    ${shown.map((p, i) => renderLcProblemRow(p, i)).join('')}
    ${list.length > shown.length ? `<button class="lc-cat-more" onclick="moreLcCatalog()">Hiển thị thêm (${list.length - shown.length} còn lại)</button>` : ''}
  </div>`;
}

function renderLcBrowseTabs() {
  const tabs = [
    ['pattern', 'Theo Pattern'],
    ['tag', 'Theo Tag'],
    ['difficulty', 'Theo Độ khó'],
    ['combo', 'Kết hợp']
  ];
  return `<div style="display:flex;gap:8px;flex-wrap:wrap;margin:16px 0 4px 0;">
    ${tabs.map(([id, label]) => `<button onclick="setLcBrowseMode('${id}')" style="padding:7px 14px;font-size:12.5px;font-weight:700;border-radius:10px;border:1px solid ${lcBrowseMode === id ? '#FFA116' : 'var(--border-hairline)'};background:${lcBrowseMode === id ? '#FFA116' : 'rgba(255,255,255,0.03)'};color:${lcBrowseMode === id ? '#000' : 'var(--text-secondary)'};cursor:pointer;">${label}</button>`).join('')}
  </div>`;
}

function renderLcCatalogView() {
  if (!LC_CATALOG.enabled) return '';
  let controls = '';
  let tableList = [];

  if (lcBrowseMode === 'tag') {
    const chips = LC_CATALOG.tagsMeta.map(t =>
      `<button onclick="setLcCatalogTag('${t.slug}')" style="padding:5px 11px;font-size:11.5px;font-weight:600;border-radius:999px;border:1px solid ${lcCatalogTag === t.slug ? '#FFA116' : 'var(--border-hairline)'};background:${lcCatalogTag === t.slug ? '#FFA116' : 'rgba(255,255,255,0.04)'};color:${lcCatalogTag === t.slug ? '#000' : 'var(--text-secondary)'};cursor:pointer;">${escapeHtml(t.name)} <span style="opacity:0.65;">${t.count}</span></button>`
    ).join('');
    controls = `<div style="margin:12px 0;padding:14px;background:rgba(255,255,255,0.03);border:1px solid var(--border-hairline);border-radius:12px;">
      <div style="font-size:12px;font-weight:700;color:var(--text-muted);margin-bottom:10px;">🔖 ${LC_CATALOG.tagsMeta.length} tags chính thức của LeetCode — click để lọc:</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;">${chips}</div>
    </div>`;
    tableList = filterLcProblems();
  } else if (lcBrowseMode === 'difficulty') {
    const cards = ['Easy', 'Medium', 'Hard'].map(d => {
      const colors = { Easy: '#34D399', Medium: '#FBBF24', Hard: '#FB7185' };
      const c = colors[d];
      const active = lcCatalogDiff === d;
      return `<div onclick="setLcCatalogDiff('${d}')" style="flex:1;min-width:150px;padding:16px;border-radius:14px;border:1px solid ${active ? c : 'var(--border-hairline)'};background:${active ? c + '14' : 'rgba(255,255,255,0.03)'};cursor:pointer;text-align:center;">
        <div style="font-size:15px;font-weight:800;color:${c};">${d}</div>
        <div style="font-size:22px;font-weight:800;margin-top:4px;">${LC_CATALOG.byDifficulty[d] || 0}</div>
        <div style="font-size:11px;color:var(--text-muted);">bài free</div>
      </div>`;
    }).join('');
    controls = `<div style="display:flex;gap:10px;flex-wrap:wrap;margin:12px 0;">${cards}</div>`;
    tableList = filterLcProblems();
  } else if (lcBrowseMode === 'combo') {
    const tagOptions = LC_CATALOG.tagsMeta.map(t =>
      `<option value="${t.slug}" ${lcCatalogTag === t.slug ? 'selected' : ''}>${escapeHtml(t.name)} (${t.count})</option>`
    ).join('');
    const diffOptions = ['Easy', 'Medium', 'Hard'].map(d =>
      `<option value="${d}" ${lcCatalogDiff === d ? 'selected' : ''}>${d} (${LC_CATALOG.byDifficulty[d] || 0})</option>`
    ).join('');
    controls = `<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin:12px 0;padding:14px;background:rgba(255,255,255,0.03);border:1px solid var(--border-hairline);border-radius:12px;">
      <select id="lc-combo-tag" style="padding:8px 12px;border-radius:10px;border:1px solid var(--border);background:rgba(255,255,255,0.05);color:var(--text-primary);font-size:13px;max-width:260px;"><option value="">— Tất cả tags —</option>${tagOptions}</select>
      <select id="lc-combo-diff" style="padding:8px 12px;border-radius:10px;border:1px solid var(--border);background:rgba(255,255,255,0.05);color:var(--text-primary);font-size:13px;"><option value="">— Mọi độ khó —</option>${diffOptions}</select>
      <button onclick="applyLcCombo()" style="padding:8px 18px;border-radius:10px;border:none;background:#FFA116;color:#000;font-weight:700;font-size:13px;cursor:pointer;">Áp dụng</button>
    </div>`;
    tableList = filterLcProblems();
  }

  const modeLabel = { tag: 'tag', difficulty: 'độ khó', combo: 'tag × độ khó' }[lcBrowseMode] || '';
  const filterInfo = (lcCatalogTag || lcCatalogDiff)
    ? `<div style="margin:0 0 10px 0;font-size:12.5px;color:var(--text-muted);">Đang lọc theo ${modeLabel}: <strong style="color:#FFA116;">${escapeHtml(lcCatalogTag || '')} ${lcCatalogTag && lcCatalogDiff ? '×' : ''} ${escapeHtml(lcCatalogDiff || '')}</strong> — ${tableList.length} bài</div>`
    : `<div style="margin:0 0 10px 0;font-size:12.5px;color:var(--text-muted);">${tableList.length} bài free</div>`;

  return `<div id="lc-catalog-view-inner">
    ${controls}
    ${filterInfo}
    ${renderLcProblemTable(tableList)}
  </div>`;
}

// Inject LeetCode Catalog styles once
(function injectLcCatalogStyles(){
  if (document.getElementById('lc-catalog-styles')) return;
  const s = document.createElement('style');
  s.id = 'lc-catalog-styles';
  s.textContent = `
  .lc-cat-table{border:1px solid var(--border-hairline);border-radius:14px;overflow:hidden;background:rgba(255,255,255,0.02);}
  .lc-cat-head{display:grid;grid-template-columns:34px 64px 1fr 220px 90px 110px;gap:10px;padding:10px 14px;font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.4px;border-bottom:1px solid var(--border-hairline);background:rgba(255,255,255,0.03);}
  .lc-cat-row{display:grid;grid-template-columns:34px 64px 1fr 220px 90px 110px;gap:10px;align-items:center;padding:9px 14px;border-bottom:1px solid rgba(255,255,255,0.04);cursor:pointer;transition:background 0.15s;}
  .lc-cat-row:hover{background:rgba(255,161,22,0.07);}
  .lc-cat-row:last-child{border-bottom:none;}
  .lc-cat-row.is-done{opacity:0.75;}
  .lc-cat-row.is-done .lc-cat-title{text-decoration:line-through;color:var(--text-muted);}
  .lc-cat-id{font-size:12px;color:var(--text-muted);font-family:'JetBrains Mono',monospace;}
  .lc-cat-title{font-size:13px;font-weight:600;color:var(--text-primary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .lc-cat-tags{display:flex;gap:4px;flex-wrap:wrap;overflow:hidden;}
  .lc-cat-tag{font-size:10px;padding:2px 8px;border-radius:999px;border:1px solid var(--border-hairline);background:rgba(255,255,255,0.04);color:var(--text-secondary);white-space:nowrap;cursor:pointer;}
  .lc-cat-tag:hover{border-color:#FFA116;color:#FFA116;}
  .lc-cat-tag-more{font-size:10px;color:var(--text-muted);}
  .lc-cat-action{font-size:11.5px;font-weight:700;color:var(--text-muted);justify-self:end;white-space:nowrap;}
  .lc-cat-action-lesson{color:#FFA116;}
  .lc-cat-more{display:block;width:100%;padding:12px;border:none;border-top:1px solid var(--border-hairline);background:rgba(255,255,255,0.03);color:#FFA116;font-size:12.5px;font-weight:700;cursor:pointer;}
  .lc-cat-more:hover{background:rgba(255,161,22,0.08);}
  @media (max-width: 900px){
    .lc-cat-head{display:none;}
    .lc-cat-row{grid-template-columns:30px 1fr auto;grid-auto-rows:auto;row-gap:6px;}
    .lc-cat-id,.lc-cat-tags{display:none;}
    .lc-cat-action{grid-column:3;}
  }
  `;
  document.head.appendChild(s);
})();

// Sample topic content
const TOPIC_CONTENT = {
  'kotlin-stateflow': {
    title: 'StateFlow & SharedFlow',
    summary: 'StateFlow và SharedFlow là hai hot flow quan trọng trong Kotlin Coroutines, dùng để quản lý và chia sẻ trạng thái trong ứng dụng Android.',
    tags: ['kotlin', 'android'],
    domain: 'Android', module: 'Kotlin',
    prerequisites: ['kotlin-coroutines', 'kotlin-flow'],
    related: ['compose-state'],
    updatedAt: '2026-07-10',
    readTime: '12 phút',
    content: `
<h2>Vấn đề cần giải quyết</h2>
<p>Trong lập trình reactive, chúng ta thường cần chia sẻ một luồng dữ liệu giữa nhiều subscriber. <code>Flow</code> thông thường là <strong>cold flow</strong> — mỗi collector nhận luồng dữ liệu riêng và flow chỉ bắt đầu phát khi có collector lắng nghe.</p>
<p>Điều này gây ra vấn đề khi bạn muốn:</p>
<ul>
  <li>Chia sẻ một trạng thái duy nhất với nhiều UI component</li>
  <li>Không tạo lại luồng xử lý cho mỗi subscriber</li>
  <li>Cung cấp giá trị mới nhất ngay lập tức khi có collector mới</li>
</ul>
<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body"><strong>Hot vs Cold Flow</strong> — Cold flow chỉ active khi có subscriber. Hot flow active và phát dữ liệu độc lập với subscriber.</div></div>

<h2>StateFlow là gì?</h2>
<p><strong>StateFlow</strong> là hot flow giữ một giá trị trạng thái duy nhất (<em>state holder</em>) và phát giá trị đó cho tất cả collector hiện tại và tương lai. Nó tương tự <code>LiveData</code> nhưng là pure Kotlin và hoạt động trong Coroutines.</p>
<p>Đặc điểm cốt lõi:</p>
<ul>
  <li>Luôn có một giá trị hiện tại (<code>value</code>)</li>
  <li>Chỉ phát khi giá trị <em>thực sự thay đổi</em> (equality check)</li>
  <li>Collector mới nhận ngay giá trị mới nhất</li>
</ul>

<h2>Cách sử dụng</h2>
<pre data-lang="kotlin"><code>class CounterViewModel : ViewModel() {

    private val _count = MutableStateFlow(0)
    val count: StateFlow&lt;Int&gt; = _count.asStateFlow()

    fun increment() {
        _count.update { it + 1 }
    }
}</code></pre>

<p>Trong Composable, collect bằng <code>collectAsState()</code>:</p>
<pre data-lang="kotlin"><code>@Composable
fun CounterScreen(viewModel: CounterViewModel = viewModel()) {
    val count by viewModel.count.collectAsState()

    Text(text = "Count: $count")
}</code></pre>

<h2>SharedFlow là gì?</h2>
<p><strong>SharedFlow</strong> là hot flow linh hoạt hơn, không yêu cầu giá trị khởi tạo và có thể phát nhiều lần kể cả giá trị giống nhau. Phù hợp với các <em>one-time events</em> như navigation, error notification.</p>

<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body">Dùng <strong>StateFlow</strong> cho state (màn hình UI). Dùng <strong>SharedFlow</strong> cho event (navigate, show snackbar).</div></div>

<h2>So sánh</h2>
<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:1px solid #30363d;">
      <th style="text-align:left;padding:8px 12px;color:#8b949e;font-weight:600;">Tiêu chí</th>
      <th style="text-align:left;padding:8px 12px;color:#8b949e;font-weight:600;">StateFlow</th>
      <th style="text-align:left;padding:8px 12px;color:#8b949e;font-weight:600;">SharedFlow</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;color:#8b949e;">Giá trị ban đầu</td>
      <td style="padding:8px 12px;color:#e6edf3;">Bắt buộc</td>
      <td style="padding:8px 12px;color:#e6edf3;">Không cần</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;color:#8b949e;">Phát lại giá trị giống</td>
      <td style="padding:8px 12px;color:#e6edf3;">Không</td>
      <td style="padding:8px 12px;color:#e6edf3;">Có</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;color:#8b949e;">Replay cho collector mới</td>
      <td style="padding:8px 12px;color:#e6edf3;">1 (giá trị mới nhất)</td>
      <td style="padding:8px 12px;color:#e6edf3;">Tuỳ chỉnh</td>
    </tr>
    <tr>
      <td style="padding:8px 12px;color:#8b949e;">Dùng cho</td>
      <td style="padding:8px 12px;color:#e6edf3;">UI State</td>
      <td style="padding:8px 12px;color:#e6edf3;">Events, signals</td>
    </tr>
  </tbody>
</table>

<h2>Sai lầm thường gặp</h2>
<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body">Không dùng <code>lifecycleScope.launch</code> để collect trong Fragment — sẽ không tự dừng khi View bị destroy. Dùng <code>repeatOnLifecycle(Lifecycle.State.STARTED)</code>.</div></div>
<pre data-lang="kotlin"><code>// ❌ Sai — leak khi Fragment detach
lifecycleScope.launch {
    viewModel.state.collect { ... }
}

// ✅ Đúng
lifecycleScope.launch {
    repeatOnLifecycle(Lifecycle.State.STARTED) {
        viewModel.state.collect { ... }
    }
}</code></pre>
    `
  },
  'jwt-auth': {
    title: 'JWT Authentication',
    summary: 'JSON Web Token (JWT) là cơ chế xác thực stateless phổ biến trong REST API. Tìm hiểu cấu trúc, luồng hoạt động và cách triển khai an toàn.',
    tags: ['backend', 'security'],
    domain: 'Backend', module: 'Authentication',
    prerequisites: [],
    related: ['oauth2', 'spring-security'],
    updatedAt: '2026-07-08',
    readTime: '10 phút',
    content: `
<h2>Vấn đề cần giải quyết</h2>
<p>HTTP là giao thức <strong>stateless</strong> — mỗi request là độc lập, server không biết ai đang gửi request. Để xác thực người dùng qua nhiều request, truyền thống là dùng <em>session</em> lưu trên server. JWT giải quyết vấn đề này theo hướng stateless.</p>

<h2>JWT là gì?</h2>
<p><strong>JSON Web Token</strong> là chuỗi mã hóa gồm ba phần, ngăn cách bởi dấu chấm:</p>
<pre data-lang="text"><code>xxxxx.yyyyy.zzzzz
  ↑       ↑       ↑
Header  Payload  Signature</code></pre>
<ul>
  <li><strong>Header</strong>: thuật toán ký (<code>HS256</code>, <code>RS256</code>)</li>
  <li><strong>Payload</strong>: claims — thông tin người dùng (<code>sub</code>, <code>exp</code>, roles…)</li>
  <li><strong>Signature</strong>: chữ ký xác minh token chưa bị giả mạo</li>
</ul>

<h2>Luồng hoạt động</h2>
<pre data-lang="text"><code>Client          Server
  |                |
  |── POST /login ─→|
  |   {email, pwd}  |
  |                 |── verify credentials
  |                 |── tạo JWT
  |←─ 200 {token} ──|
  |                 |
  |── GET /profile ─→| (Authorization: Bearer &lt;token&gt;)
  |                 |── verify JWT signature
  |                 |── đọc claims
  |←── 200 {data} ──|</code></pre>

<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body">JWT không mã hóa payload — chỉ ký. Bất kỳ ai decode được base64 cũng đọc được payload. Không lưu thông tin nhạy cảm trong JWT.</div></div>

<h2>Triển khai với Spring Security</h2>
<pre data-lang="kotlin"><code>@Component
class JwtFilter(private val jwtService: JwtService) : OncePerRequestFilter() {

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        chain: FilterChain
    ) {
        val header = request.getHeader("Authorization") ?: return chain.doFilter(request, response)
        if (!header.startsWith("Bearer ")) return chain.doFilter(request, response)

        val token = header.removePrefix("Bearer ")
        val username = jwtService.extractUsername(token)

        if (username != null && SecurityContextHolder.getContext().authentication == null) {
            val userDetails = userDetailsService.loadUserByUsername(username)
            if (jwtService.isTokenValid(token, userDetails)) {
                val authToken = UsernamePasswordAuthenticationToken(userDetails, null, userDetails.authorities)
                SecurityContextHolder.getContext().authentication = authToken
            }
        }
        chain.doFilter(request, response)
    }
}</code></pre>

<h2>Access Token vs Refresh Token</h2>
<p>Dùng hai token để cân bằng giữa bảo mật và trải nghiệm người dùng:</p>
<ul>
  <li><strong>Access Token</strong>: thời hạn ngắn (15 phút), dùng cho mọi request API</li>
  <li><strong>Refresh Token</strong>: thời hạn dài (7 ngày), chỉ dùng để lấy Access Token mới</li>
</ul>

<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body">JWT không thể thu hồi trước khi hết hạn. Nếu cần revoke, phải dùng blacklist hoặc chuyển sang Refresh Token flow với rotation.</div></div>
    `
  },
  'compose-state': {
    title: 'Compose State Management',
    summary: 'Hiểu cách Jetpack Compose quản lý và react với state, sự khác biệt giữa remember, rememberSaveable và ViewModel state.',
    tags: ['android', 'kotlin'],
    domain: 'Android', module: 'Jetpack Compose',
    prerequisites: ['kotlin-coroutines'],
    related: ['kotlin-stateflow', 'compose-side-effects'],
    updatedAt: '2026-07-12',
    readTime: '15 phút',
    content: `
<h2>State trong Compose</h2>
<p>Compose là declarative UI framework — UI là <em>hàm của state</em>. Khi state thay đổi, Compose tự động <strong>recompose</strong> các Composable bị ảnh hưởng.</p>
<pre data-lang="kotlin"><code>@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }

    Button(onClick = { count++ }) {
        Text("Count: $count")
    }
}</code></pre>

<h2>remember</h2>
<p><code>remember</code> lưu giá trị qua các lần recomposition nhưng <strong>mất khi configuration change</strong> (xoay màn hình, đổi ngôn ngữ).</p>

<h2>rememberSaveable</h2>
<p><code>rememberSaveable</code> lưu state qua cả configuration change bằng cách lưu vào <code>Bundle</code>. Chỉ hoạt động với các kiểu có thể lưu vào Bundle.</p>

<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body">State lifting — đưa state lên component cha khi nhiều component cùng cần truy cập, tránh duplicated state.</div></div>

<h2>ViewModel State</h2>
<p>Với state phức tạp hơn hoặc cần survive process death, dùng ViewModel + StateFlow:</p>
<pre data-lang="kotlin"><code>data class UiState(
    val isLoading: Boolean = false,
    val users: List&lt;User&gt; = emptyList(),
    val error: String? = null
)

class UserViewModel : ViewModel() {
    private val _state = MutableStateFlow(UiState())
    val state: StateFlow&lt;UiState&gt; = _state.asStateFlow()
}</code></pre>
    `
  }
};

// Merge DSA content if loaded
if (typeof DSA_CONTENT !== 'undefined') {
  Object.assign(TOPIC_CONTENT, DSA_CONTENT);
}

// Merge Android content if loaded
if (typeof ANDROID_CONTENT !== 'undefined') {
  Object.assign(TOPIC_CONTENT, ANDROID_CONTENT);
}

// Merge iOS content if loaded
if (typeof IOS_CONTENT !== 'undefined') {
  Object.assign(TOPIC_CONTENT, IOS_CONTENT);
}

// Merge Flutter content if loaded
if (typeof FLUTTER_CONTENT !== 'undefined') {
  Object.assign(TOPIC_CONTENT, FLUTTER_CONTENT);
}

// Merge Git Beginner content if loaded
if (typeof GIT_CONTENT !== 'undefined') {
  Object.assign(TOPIC_CONTENT, GIT_CONTENT);
}

// Merge LeetCode content if loaded (must be after other merges)
if (typeof LEETCODE_CONTENT !== 'undefined') {
  Object.assign(TOPIC_CONTENT, LEETCODE_CONTENT);
}

// ── State ────────────────────────────────────────────────────────
// Reading Enhancers state — khai báo sớm để tránh TDZ (openTopic có thể chạy khi load)
var rdRevealObserver = null;
var rdTocObserver = null;
var RD_REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const rdState = { title: '', pct: 0 };
let rdPillEl = null;
let rdLightboxEl = null;

let currentDomainId = null;
let currentTopicId = null;
let expandedDomains = new Set(['android']);
let expandedModules = new Set(['kotlin', 'compose']);
let expandedSections = new Set();
let currentView = 'home'; // 'home' | 'domain' | 'topic' | 'graph'
let roadmapFilter = 'all'; // 'all' | 'in-progress'
let activeTagFilter = null; // current tag filter for domain view

// ── Learning Progress (persisted locally per browser) ─────────────
const PROGRESS_STORAGE_KEY = 'kos_progress_v1';

function loadProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* localStorage unavailable */ }
  return { visited: {}, sessions: {} };
}

function saveProgress() {
  try { localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progressState)); } catch (e) { /* localStorage unavailable */ }
}

let progressState = loadProgress();

function isTopicVisited(topicId) {
  return !!progressState.visited[topicId];
}

function markTopicVisited(topicId) {
  progressState.visited[topicId] = new Date().toISOString();
  saveProgress();
}

// ── LeetCode 5-lang progress ───────────────────────────────────────
const LC_LANGS = ['cpp','java','kotlin','swift','dart'];
function ensureLcProgress() {
  if (!progressState.leetcode) progressState.leetcode = {};
}
function isLcLangDone(topicId, lang) {
  ensureLcProgress();
  return !!(progressState.leetcode[topicId] && progressState.leetcode[topicId][lang]);
}
function isLcFullyDone(topicId) {
  ensureLcProgress();
  const e = progressState.leetcode[topicId];
  if (!e) return false;
  return LC_LANGS.every(l => !!e[l]);
}
function getLcDoneCount(topicId) {
  ensureLcProgress();
  const e = progressState.leetcode[topicId];
  if (!e) return 0;
  return LC_LANGS.filter(l => !!e[l]).length;
}
function toggleLcLangDone(topicId, lang) {
  ensureLcProgress();
  if (!progressState.leetcode[topicId]) progressState.leetcode[topicId] = {};
  if (progressState.leetcode[topicId][lang]) {
    delete progressState.leetcode[topicId][lang];
    if (Object.keys(progressState.leetcode[topicId]).length === 0) delete progressState.leetcode[topicId];
  } else {
    progressState.leetcode[topicId][lang] = new Date().toISOString();
    // also mark visited
    progressState.visited[topicId] = new Date().toISOString();
  }
  saveProgress();
  // re-render current views to reflect progress
  renderSidebar();
  if (currentTopicId === topicId) {
    // update checkboxes in open topic
    document.querySelectorAll('.lc-done-btn').forEach(btn => {
      const l = btn.getAttribute('data-lang') || btn.textContent.split(' ')[1]?.toLowerCase();
    });
    updateLcCheckboxes(topicId);
  }
  // refresh domain progress if on domain view
  if (currentDomainId === 'leetcode' && currentView === 'domain') showDomain('leetcode');
  showToast(isLcLangDone(topicId, lang) ? '✓ Đã tick ' + lang.toUpperCase() + ' cho ' + topicId : 'Đã bỏ tick ' + lang.toUpperCase());
}
function updateLcCheckboxes(topicId) {
  LC_LANGS.forEach(lang => {
    const done = isLcLangDone(topicId, lang);
    document.querySelectorAll(`[data-lc-topic="${topicId}"][data-lc-lang="${lang}"]`).forEach(el => {
      el.classList.toggle('done', done);
      el.textContent = (done ? '☑ ' : '☐ ') + lang.toUpperCase() + (done ? ' ✓' : '');
    });
    document.querySelectorAll(`.lc-done-btn[data-lang="${lang}"]`).forEach(btn => {
      if (btn.closest('[data-lc-topic]') && btn.closest('[data-lc-topic]').getAttribute('data-lc-topic') !== topicId) return;
      // fallback for topic content buttons
    });
  });
  // update in-content panes buttons
  LC_LANGS.forEach(lang => {
    const done = isLcLangDone(topicId, lang);
    const btn = document.querySelector(`.lc-progress-row button[onclick*="'${topicId}','${lang}'"]`);
    if (btn) {
      btn.classList.toggle('is-done', done);
      btn.textContent = (done ? '☑ ' : '☐ ') + lang.toUpperCase() + (done ? ' ✓' : ' xong');
    }
  });
  // sync premium hero progress if visible
  const heroDots = document.querySelectorAll('.lc-hero-dot');
  if (heroDots.length) {
    LC_LANGS.forEach((lang, idx) => {
      const done = isLcLangDone(topicId, lang);
      if (heroDots[idx]) heroDots[idx].classList.toggle('on', done);
    });
    const pct = Math.round((getLcDoneCount(topicId)/5)*100);
    const fill = document.querySelector('.lc-hero-fill');
    if (fill) fill.style.width = pct + '%';
    const pctLabel = document.querySelector('.lc-hero-pct');
    if (pctLabel) {
      const c = getLcDoneCount(topicId);
      pctLabel.textContent = `${pct}% • ${c===5?'Hoàn thành ✓':c>0?'Đang làm':'Chưa bắt đầu'}`;
    }
    const asideCount = document.querySelector('.lc-aside-row strong');
    // update aside first row if exists
    const asideRows = document.querySelectorAll('.lc-aside-row strong');
    if (asideRows[0]) asideRows[0].textContent = getLcDoneCount(topicId) + '/5';
  }
}
function switchLcLang(btn, topicId, lang) {
  const root = document.getElementById('prose-content') || document;
  root.querySelectorAll('.lc-lang-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  root.querySelectorAll('.lc-code-pane').forEach(p => {
    p.classList.toggle('active', p.getAttribute('data-pane') === lang);
  });
}
function toggleLcAll(topicId) {
  ensureLcProgress();
  const fully = isLcFullyDone(topicId);
  if (fully) {
    // uncheck all
    LC_LANGS.forEach(l => { if (progressState.leetcode[topicId] && progressState.leetcode[topicId][l]) delete progressState.leetcode[topicId][l]; });
    if (progressState.leetcode[topicId] && Object.keys(progressState.leetcode[topicId]).length===0) delete progressState.leetcode[topicId];
  } else {
    if (!progressState.leetcode[topicId]) progressState.leetcode[topicId] = {};
    LC_LANGS.forEach(l => progressState.leetcode[topicId][l] = new Date().toISOString());
    progressState.visited[topicId] = new Date().toISOString();
  }
  saveProgress();
  renderSidebar();
  if (currentTopicId===topicId) updateLcCheckboxes(topicId);
  if (currentDomainId==='leetcode' && currentView==='domain') showDomain('leetcode');
  showToast(fully ? 'Đã bỏ tick all 5 ngôn ngữ' : '☑ Đã tick đủ 5 ngôn ngữ!');
}
window.toggleLcLangDone = toggleLcLangDone;
window.toggleLcAll = toggleLcAll;
window.switchLcLang = switchLcLang;
window.isLcLangDone = isLcLangDone;
window.isLcFullyDone = isLcFullyDone;
window.getLcDoneCount = getLcDoneCount;
window.LC_LANGS = LC_LANGS;
// Inject LeetCode styles once
(function injectLcStyles(){
  if (document.getElementById('lc-styles')) return;
  const s = document.createElement('style');
  s.id='lc-styles';
  s.textContent = `
  .lc-dot{width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,0.15);display:inline-block;}
  .lc-dot.on{background:#34D399;box-shadow:0 0 6px rgba(52,211,153,0.6);}
  .lc-mini-dots{display:flex;gap:3px;align-items:center;}
  .lc-count{font-size:10px;color:var(--text-muted);margin-left:4px;}
  .lc-topic.lc-done{opacity:0.85;}
  .lc-topic.lc-done .lc-title{text-decoration:line-through;color:var(--text-muted);}
  .lc-check{cursor:pointer;font-size:13px;line-height:1;padding:2px 6px;border-radius:4px;user-select:none;}
  .lc-check:hover{background:rgba(255,255,255,0.08);}
  .sidebar-topic.lc-topic{display:flex;align-items:center;gap:6px;font-size:12.5px;padding:5px 8px;}
  .sidebar-topic.lc-topic:hover{transform:none;background:rgba(255,161,22,0.08);}
  .sidebar-topic.lc-topic.active{transform:none;}
  .topic-item-row.lc-row:hover{transform:none;background:rgba(255,161,22,0.06);border-color:rgba(255,161,22,0.2);}
  .lc-pill{font-size:11px;padding:3px 8px;border-radius:999px;font-weight:600;border:1px solid var(--border);}
  .lc-pill-easy{background:rgba(52,211,153,0.12);color:#34D399;border-color:rgba(52,211,153,0.25);}
  .lc-pill-medium{background:rgba(251,191,36,0.12);color:#FBBF24;border-color:rgba(251,191,36,0.25);}
  .lc-pill-hard{background:rgba(251,113,133,0.12);color:#FB7185;border-color:rgba(251,113,133,0.25);}
  .lc-pill-pattern{background:rgba(167,139,250,0.12);color:#A78BFA;border-color:rgba(167,139,250,0.25);}
  .lc-pill-level{background:rgba(56,189,248,0.12);color:#38BDF8;border-color:rgba(56,189,248,0.25);}
  .lc-pill.tag-clickable{cursor:pointer;transition:transform 0.12s, box-shadow 0.12s, filter 0.12s;}
  .lc-pill.tag-clickable:hover{transform:translateY(-1px);box-shadow:0 2px 8px rgba(0,0,0,0.12);filter:brightness(1.15);}
  .lc-link{font-size:11px;color:#FFA116;text-decoration:none;font-weight:600;margin-left:8px;}
  .lc-link:hover{text-decoration:underline;}
  .lc-lang-btn{padding:6px 12px;font-size:12px;font-weight:600;border-radius:999px;border:1px solid var(--border);background:rgba(255,255,255,0.04);color:var(--text-secondary);cursor:pointer;}
  .lc-lang-btn.active{background:#FFA116;color:#000;border-color:#FFA116;}
  .lc-code-pane{display:none;}
  .lc-code-pane.active{display:block;}
  .lc-done-btn{padding:6px 10px;font-size:11px;border-radius:999px;border:1px solid var(--border);background:rgba(255,255,255,0.04);color:var(--text-secondary);cursor:pointer;}
  .lc-done-btn.is-done{background:rgba(52,211,153,0.15);color:#34D399;border-color:rgba(52,211,153,0.3);}
  .topic-item-row.is-done{border-color:rgba(52,211,153,0.25)!important;}
  .lc-level-card{border-left:3px solid #FFA116;}
  `;
  document.head.appendChild(s);
})();

// ── Tag Filter helpers ─────────────────────────────────────────
function filterByTag(tag) {
  // LeetCode dùng chuẩn lọc mới: tag chính thức LC / độ khó
  if (currentDomainId === 'leetcode') { routeLcFilter(tag); return; }
  activeTagFilter = tag;
  // Determine target domain: keep current if possible, else find domain containing tag
  let targetDomain = currentDomainId;
  if (!targetDomain || !KNOWLEDGE_DATA.domains.find(d=>d.id===targetDomain && d.modules.some(m=>m.topics.some(t=> (t.tags||[]).includes(tag) || (TOPIC_CONTENT[t.id]?.tags||[]).includes(tag) )))) {
    // search for domain containing this tag
    for (const d of KNOWLEDGE_DATA.domains) {
      const has = d.modules.some(m=> m.topics.some(t=> (t.tags||[]).includes(tag) || (TOPIC_CONTENT[t.id]?.tags||[]).includes(tag) ));
      if (has) { targetDomain = d.id; break; }
    }
  }
  if (!targetDomain) targetDomain = currentDomainId || 'leetcode';
  expandedDomains.add(targetDomain);
  showDomain(targetDomain);
  showToast('🔖 Lọc theo tag: ' + tag);
}
function clearTagFilter() {
  activeTagFilter = null;
  if (currentDomainId) showDomain(currentDomainId);
  else showHome();
  showToast('Đã xóa bộ lọc tag');
}
function isTagActive(tag) { return activeTagFilter === tag; }
window.filterByTag = filterByTag;
window.clearTagFilter = clearTagFilter;

// Chuyển hướng nút lọc cũ trong bài học LeetCode sang chuẩn mới
function routeLcFilter(tag) {
  const t = (tag || '').toLowerCase();
  if (['easy', 'medium', 'hard'].includes(t)) {
    lcBrowseMode = 'difficulty';
    lcCatalogDiff = t.charAt(0).toUpperCase() + t.slice(1);
    lcCatalogLimit = 100;
    showDomain('leetcode');
    scrollLcCatalogIntoView();
    showToast('🔖 Lọc theo độ khó: ' + lcCatalogDiff);
    return;
  }
  const official = LC_CATALOG.enabled && LC_CATALOG.tagsMeta.some(x => x.slug === t);
  lcBrowseMode = 'tag';
  lcCatalogTag = official ? t : null;
  lcCatalogLimit = 100;
  showDomain('leetcode');
  scrollLcCatalogIntoView();
  showToast(official ? '🔖 Lọc theo tag: ' + t : 'Đã mở bảng tag chính thức — hãy chọn một tag');
}

function dayKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function addActiveMs(ms) {
  const key = dayKey(new Date());
  progressState.sessions[key] = (progressState.sessions[key] || 0) + ms;
  saveProgress();
}

function getLastNDaysMs(n, offset = 0) {
  const days = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i - offset);
    days.push({ key: dayKey(d), ms: progressState.sessions[dayKey(d)] || 0 });
  }
  return days;
}

function formatStudyDuration(ms) {
  if (ms < 60000) return '0 phút';
  const hours = ms / 3600000;
  if (hours < 1) return `${Math.round(ms / 60000)} phút`;
  return `${hours.toFixed(1)} giờ`;
}

// Accumulate real active time while the tab is visible (throttled tick)
let __lastActivityTick = Date.now();
setInterval(() => {
  const now = Date.now();
  const elapsed = now - __lastActivityTick;
  __lastActivityTick = now;
  if (document.visibilityState === 'visible' && elapsed > 0 && elapsed < 15000) {
    addActiveMs(elapsed);
  }
}, 10000);
document.addEventListener('visibilitychange', () => { __lastActivityTick = Date.now(); });

// ── Layout mode helpers ──────────────────────────────────────────
function setLayoutMode(mode) {
  // mode: 'home' | 'content' | 'dashboard'
  const layout = document.getElementById('layout');
  layout.classList.toggle('layout--home', mode === 'home');
  layout.classList.toggle('layout--no-toc', mode === 'dashboard');
}

// Chevron SVG
const CHEVRON_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;

// ── Render Sidebar ───────────────────────────────────────────────
function modContainsCurrentTopic(mod) {
  return !!currentTopicId && mod.topics.some(t => t.id === currentTopicId);
}

function setLcSidebarGroup(group) {
  lcSidebarGroup = group;
  renderSidebar();
}
window.setLcSidebarGroup = setLcSidebarGroup;

function getLcSidebarGroupSelector(domain) {
  if (!domain || domain.id !== 'leetcode' || !LC_CATALOG.enabled || currentDomainId !== 'leetcode') return '';
  const opts = [['pattern', 'Pattern'], ['difficulty', 'Độ khó'], ['tag', 'Tag']];
  return `<div style="display:flex;gap:4px;padding:8px 10px 4px 10px;align-items:center;">
    <span style="font-size:10px;color:var(--text-muted);margin-right:2px;">Nhóm:</span>
    ${opts.map(([id, label]) => `<button onclick="setLcSidebarGroup('${id}')" style="flex:1;padding:4px 0;font-size:10.5px;font-weight:700;border-radius:7px;border:1px solid ${lcSidebarGroup === id ? '#FFA116' : 'var(--border-hairline)'};background:${lcSidebarGroup === id ? 'rgba(255,161,22,0.15)' : 'transparent'};color:${lcSidebarGroup === id ? '#FFA116' : 'var(--text-muted)'};cursor:pointer;">${label}</button>`).join('')}
  </div>`;
}

// Nhóm sidebar cho LeetCode: pattern (mặc định) / độ khó / tag — phủ toàn bộ catalog
function getSidebarModules(domain) {
  if (!domain || domain.id !== 'leetcode' || lcSidebarGroup === 'pattern' || !LC_CATALOG.enabled || currentDomainId !== 'leetcode') return domain.modules;
  const toTopic = (p) => {
    const lessonTid = LC_CATALOG.lessonByProblemId[p.id];
    return { id: lessonTid || ('lccat-' + p.id), title: p.id + '. ' + p.title, difficulty: p.difficulty, leetcodeId: p.id, isCatalogOnly: !lessonTid };
  };
  if (lcSidebarGroup === 'difficulty') {
    return ['Easy', 'Medium', 'Hard'].map(d => ({
      id: 'lc-sb-diff-' + d.toLowerCase(),
      name: d + ' (' + (LC_CATALOG.byDifficulty[d] || 0) + ')',
      description: d,
      topics: LC_CATALOG.problems.filter(p => p.difficulty === d).map(toTopic),
      sections: []
    }));
  }
  // lcSidebarGroup === 'tag'
  const byTag = new Map(LC_CATALOG.tagsMeta.map(t => [t.slug, []]));
  const untagged = [];
  const allTopics = [];
  LC_CATALOG.problems.forEach(p => {
    const t = toTopic(p);
    allTopics.push(t);
    if (!p.topicTags.length) { untagged.push(t.id); return; }
    p.topicTags.forEach(ts => { if (byTag.has(ts)) byTag.get(ts).push(t.id); });
  });
  const sections = [...byTag.entries()].filter(([, list]) => list.length)
    .map(([slug, list]) => ({ id: 'lc-sb-tag-' + slug, name: slug + ' (' + list.length + ')', topics: list }));
  if (untagged.length) sections.push({ id: 'lc-sb-tag-none', name: 'Không có tag (' + untagged.length + ')', topics: untagged });
  return [{ id: 'lc-sb-tags', name: 'Tags (' + sections.length + ')', description: 'Nhóm theo tag LeetCode', topics: allTopics, sections }];
}

function renderSidebar() {
  const sidebar = document.getElementById('sidebar');
  let domainsToRender = KNOWLEDGE_DATA.domains;

  if (currentDomainId) {
    domainsToRender = KNOWLEDGE_DATA.domains.filter(d => d.id === currentDomainId);
  } else {
    domainsToRender = [...KNOWLEDGE_DATA.domains].sort((a, b) => {
      const getDomainLastVisited = (d) => {
        const ids = d.modules.flatMap(m => m.topics.map(t => t.id));
        return Math.max(0, ...ids.map(id => progressState.visited[id] ? new Date(progressState.visited[id]).getTime() : 0));
      };
      return getDomainLastVisited(b) - getDomainLastVisited(a);
    });
  }

  const backButtonHtml = currentDomainId ? `
    <div class="sidebar-back" onclick="showHome()">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;margin-right:8px;"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
      Trang chủ
    </div>
  ` : '';

  sidebar.innerHTML = backButtonHtml + domainsToRender.map(domain => `
    <div class="sidebar-section">
      <div class="sidebar-domain ${expandedDomains.has(domain.id) ? 'expanded' : ''}"
           onclick="toggleDomain('${domain.id}')">
        <div class="domain-icon">${DOMAIN_ICONS[domain.icon] || DOMAIN_ICONS.backend}</div>
        <span>${domain.name}</span>
        <span class="domain-chevron">${CHEVRON_SVG}</span>
      </div>
      <div class="sidebar-modules ${expandedDomains.has(domain.id) ? '' : 'collapsed'}">
        ${getLcSidebarGroupSelector(domain)}
        ${getSidebarModules(domain).map(mod => `
          <div class="sidebar-module ${expandedModules.has(mod.id) ? 'expanded' : ''}"
               onclick="toggleModule('${mod.id}')">
            <span>${mod.name}</span>
            <span class="module-chevron">${CHEVRON_SVG}</span>
          </div>
          <div class="sidebar-tree sidebar-tree--module ${expandedModules.has(mod.id) ? '' : 'collapsed'}">
            ${(expandedModules.has(mod.id) || modContainsCurrentTopic(mod)) ? renderModuleContent(mod) : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function renderTopicRow(topic) {
  if (topic.id && topic.id.startsWith('lccat-')) {
    const pid = parseInt(topic.id.slice(6), 10);
    const done = isLcCatalogDone(pid);
    const diffCls = topic.difficulty ? ' diff-' + topic.difficulty.toLowerCase() : '';
    return `
    <div class="sidebar-topic lc-topic ${currentTopicId === topic.id ? 'active' : ''} ${done ? 'lc-done' : ''}${diffCls}" onclick="openLcExternalById(${pid})" title="Chưa có bài học — mở trên LeetCode">
      <span class="lc-check" onclick="event.stopPropagation(); toggleLcCatalogDone(${pid});" title="Đánh dấu đã xong"> ${done ? '☑' : '☐'} </span>
      <span class="lc-title" style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${topic.title}</span>
      <span class="lc-count" style="color:#FFA116;opacity:0.7;">↗</span>
    </div>
  `;
  }
  const isLc = topic.id && topic.id.startsWith('lc-');
  if (isLc) {
    const doneCount = getLcDoneCount(topic.id);
    const fullyDone = isLcFullyDone(topic.id);
    const diffCls = topic.difficulty ? ' diff-' + topic.difficulty.toLowerCase() : '';
    const dots = LC_LANGS.map(l => `<span class="lc-dot ${isLcLangDone(topic.id,l)?'on':''}" title="${l.toUpperCase()} ${isLcLangDone(topic.id,l)?'✓':'○'}"></span>`).join('');
    return `
    <div class="sidebar-topic lc-topic ${currentTopicId === topic.id ? 'active' : ''} ${fullyDone?'lc-done':''}${diffCls}" onclick="openTopic('${topic.id}')">
      <span class="lc-check" onclick="event.stopPropagation(); toggleLcAll('${topic.id}');" title="Tick đủ 5 ngôn ngữ (toggle all)"> ${fullyDone ? '☑' : '☐'} </span>
      <span class="lc-title" style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${topic.title}</span>
      <span class="lc-mini-dots">${dots}<span class="lc-count">${doneCount}/5</span></span>
    </div>
  `;
  }
  const visited = isTopicVisited(topic.id);
  return `
    <div class="sidebar-topic ${currentTopicId === topic.id ? 'active' : ''} ${visited?'visited':''}"
         onclick="openTopic('${topic.id}')">
      ${topic.title}
    </div>
  `;
}

function sectionContainsTopic(sec, topicId) {
  if ((sec.topics || []).includes(topicId)) return true;
  return (sec.sections || []).some(s => sectionContainsTopic(s, topicId));
}

function renderModuleContent(mod) {
  if (!mod.sections || mod.sections.length === 0) {
    return mod.topics.map(renderTopicRow).join('');
  }

  const topicToSection = new Map();
  function indexSection(sec) {
    (sec.topics || []).forEach(tid => topicToSection.set(tid, sec));
    (sec.sections || []).forEach(indexSection);
  }
  mod.sections.forEach(indexSection);

  const topicIndex = (tid) => {
    const i = mod.topics.findIndex(t => t.id === tid);
    return i === -1 ? Infinity : i;
  };
  const minTopicIndex = (sec) => {
    let m = Infinity;
    (sec.topics || []).forEach(tid => m = Math.min(m, topicIndex(tid)));
    (sec.sections || []).forEach(s => m = Math.min(m, minTopicIndex(s)));
    return m;
  };

  const renderSectionBlock = (sec) => {
    const secKey = mod.id + '::' + sec.id;
    const open = expandedSections.has(secKey) || sectionContainsTopic(sec, currentTopicId);
    const childSections = (sec.sections || []).map(renderSectionBlock).join('');
    const childTopics = (sec.topics || []).map(tid => {
      const t = mod.topics.find(x => x.id === tid);
      return t ? renderTopicRow(t) : '';
    }).join('');
    return `
      <div class="sidebar-folder ${open ? 'expanded' : ''}"
           onclick="toggleSection('${secKey}')">
        <span>${sec.name}</span>
        <span class="section-chevron">${CHEVRON_SVG}</span>
      </div>
      <div class="sidebar-tree sidebar-tree--nested ${open ? '' : 'collapsed'}">
        ${open ? (childSections + childTopics) : ''}
      </div>
    `;
  };

  const items = [];
  mod.topics.forEach((t, idx) => {
    if (topicToSection.has(t.id)) return;
    items.push({ pos: idx, html: renderTopicRow(t) });
  });
  mod.sections.forEach(sec => {
    items.push({ pos: minTopicIndex(sec), html: renderSectionBlock(sec) });
  });
  items.sort((a, b) => a.pos - b.pos);
  return items.map(i => i.html).join('');
}

function toggleSection(key) {
  if (expandedSections.has(key)) expandedSections.delete(key);
  else expandedSections.add(key);
  renderSidebar();
}

function expandSectionsForTopic(mod, topicId) {
  if (!mod.sections) return;
  const walk = (sec) => {
    if (sectionContainsTopic(sec, topicId)) {
      expandedSections.add(mod.id + '::' + sec.id);
      (sec.sections || []).forEach(walk);
    }
  };
  mod.sections.forEach(walk);
}

function toggleDomain(id) {
  if (expandedDomains.has(id)) expandedDomains.delete(id);
  else expandedDomains.add(id);
  renderSidebar();
}

function toggleModule(id) {
  if (expandedModules.has(id)) expandedModules.delete(id);
  else expandedModules.add(id);
  renderSidebar();
}

function showDomain(domainId) {
  const DOMAIN_PAGES = {
    'android': 'android.html',
    'ios': 'ios.html',
    'flutter': 'flutter.html',
    'backend': 'backend.html',
    'devops': 'devops.html',
    'database': 'database.html',
    'system-design': 'system-design.html',
    'algorithms': 'dsa.html',
    'leetcode': 'leetcode.html'
  };

  const targetPage = DOMAIN_PAGES[domainId];
  if (targetPage && !window.location.pathname.endsWith('/' + targetPage) && !window.location.pathname.endsWith(targetPage)) {
    window.location.href = targetPage;
    return;
  }
  const domain = KNOWLEDGE_DATA.domains.find(d => d.id === domainId);
  if (!domain) return;

  currentDomainId = domainId;
  currentTopicId = null;
  currentView = 'domain';
  if (domainId === 'leetcode') activeTagFilter = null;
  setActiveNav(null);
  setLayoutMode('content');
  hideOriginalToggle();

  // Add expanded module state for the domain
  expandedDomains.add(domainId);
  renderSidebar();

  const totalTopics = domain.modules.reduce((s, m) => s + m.topics.length, 0);

  document.getElementById('main').innerHTML = `
    <div class="domain-view fade-in">
      <div class="breadcrumb">
        <a href="#" onclick="showHome(); return false;">Home</a>
        <span class="breadcrumb-sep">›</span>
        <span>${domain.name}</span>
      </div>

      <div class="domain-header-card" data-color="${domain.color}">
        <div class="domain-header-icon">${DOMAIN_ICONS[domain.icon] || DOMAIN_ICONS.backend}</div>
        <div class="domain-header-info">
          <h1 class="domain-header-title">${domain.name}</h1>
          <p class="domain-header-desc">${domain.description}</p>
          <div class="domain-header-stats">
            <span class="pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px;"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>
              ${domain.modules.length} Modules
            </span>
            <span class="pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px;"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              ${totalTopics} ${domain.id === 'leetcode' ? 'Bài học' : 'Topics'}
            </span>
            ${domain.id === 'leetcode' && LC_CATALOG.enabled ? `<span class="pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              ${LC_CATALOG.totalFree} bài free trong catalog
            </span>` : ''}
          </div>
        </div>
      </div>

      ${domain.id === 'leetcode' ? renderLcBrowseTabs() : ''}
      ${domain.id === 'leetcode' && lcBrowseMode !== 'pattern' ? `<div id="lc-catalog-view">${renderLcCatalogView()}</div>` : ''}

      ${(() => {
        // Tag filter bar cho các domain khác (LeetCode dùng tab lọc chuẩn mới)
        if (domain.id === 'leetcode') return '';
        const allTags = {};
        domain.modules.forEach(m => m.topics.forEach(t => {
          const tags = t.tags || (TOPIC_CONTENT[t.id]?.tags || []);
          tags.forEach(tag => { allTags[tag] = (allTags[tag]||0)+1; });
        }));
        const sortedTags = Object.entries(allTags).sort((a,b)=> b[1]-a[1]).slice(0, 24);
        if (!sortedTags.length) return '';
        return `<div style="margin:16px 0 20px 0;padding:12px 14px;background:rgba(255,255,255,0.03);border:1px solid var(--border-hairline);border-radius:12px;">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            <span style="font-size:12px;font-weight:700;color:var(--text-muted);">🔖 Lọc theo tag:</span>
            ${sortedTags.map(([tag,cnt]) => `<button onclick="filterByTag('${tag}')" class="tag-filter-btn ${activeTagFilter===tag?'active':''}" style="padding:4px 10px;font-size:11px;border-radius:999px;border:1px solid ${activeTagFilter===tag?'#FFA116':'var(--border)'};background:${activeTagFilter===tag?'#FFA116':'rgba(255,255,255,0.04)'};color:${activeTagFilter===tag?'#000':'var(--text-secondary)'};cursor:pointer;">${tag} <span style="opacity:0.7;">${cnt}</span></button>`).join('')}
            ${activeTagFilter ? `<button onclick="clearTagFilter()" style="margin-left:6px;padding:4px 10px;font-size:11px;border-radius:999px;border:1px solid var(--border);background:rgba(251,113,133,0.12);color:#FB7185;cursor:pointer;">✕ Xóa lọc (${activeTagFilter})</button>` : ''}
          </div>
          ${activeTagFilter ? `<div style="margin-top:8px;font-size:12px;color:var(--text-muted);">Đang lọc: <strong style="color:#FFA116;">${activeTagFilter}</strong> — chỉ hiện bài chứa tag này</div>` : ''}
        </div>`;
      })()}

      <div class="section-header" style="margin-bottom: 20px;">
        <h2 class="section-title">${domain.id === 'leetcode' && lcBrowseMode !== 'pattern' ? '' : `Danh sách chủ đề ${activeTagFilter ? `<span style="font-size:13px;color:#FFA116;">— lọc: ${activeTagFilter}</span>` : ''}`}</h2>
        <span class="section-subtitle">${domain.id === 'leetcode' && lcBrowseMode !== 'pattern' ? '' : (activeTagFilter ? 'Đang lọc theo tag — click tag khác hoặc xóa lọc để xem tất cả' : 'Chọn một bài học dưới đây để bắt đầu học tập')}</span>
      </div>

      <div class="modules-grid">
        ${(() => {
          // LeetCode domain: show progress bar per module
          const isLcDomain = domain.id === 'leetcode';
          if (isLcDomain && lcBrowseMode !== 'pattern') return '';
          return [...domain.modules].sort((a, b) => {
            const getModuleLastVisited = (mod) => {
              const times = mod.topics.map(t => progressState.visited[t.id] ? new Date(progressState.visited[t.id]).getTime() : 0);
              return Math.max(0, ...times);
            };
            return getModuleLastVisited(b) - getModuleLastVisited(a);
          }).map(mod => {
            // apply tag filter to topics
            const topicsForFilter = activeTagFilter ? mod.topics.filter(t => {
              const tags = t.tags || (TOPIC_CONTENT[t.id]?.tags || []);
              return tags.includes(activeTagFilter);
            }) : mod.topics;
            // if filtered and empty, skip module
            if (activeTagFilter && topicsForFilter.length===0) return '';
            // for display, use filtered list for counts but keep original for progress
            const displayTopics = topicsForFilter;
            let lcExtra = '';
            if (isLcDomain) {
              const total = mod.topics.length;
              const doneFull = mod.topics.filter(t => isLcFullyDone(t.id)).length;
              const doneAny = mod.topics.filter(t => getLcDoneCount(t.id) > 0).length;
              const pct = total ? Math.round((doneFull/total)*100) : 0;
              lcExtra = `<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
                <div style="flex:1;height:6px;background:rgba(255,255,255,0.08);border-radius:999px;overflow:hidden;"><div style="width:${pct}%;height:100%;background:linear-gradient(90deg,#FFA116,#FF6B00);"></div></div>
                <span style="font-size:11px;color:var(--text-muted);">${doneFull}/${total} done • ${doneAny} started • ${pct}%</span>
              </div>`;
            }
            const isLcMod = isLcDomain && mod.id && mod.id.startsWith('lc-level-');
            if (isLcMod && mod.sections && mod.sections.length) {
              let sectionsHtml = '';
              let hasVisibleSection = false;
              for (const sec of mod.sections) {
                let secTopics = sec.topics.map(tid => mod.topics.find(t=>t.id===tid)).filter(Boolean);
                if (activeTagFilter) {
                  secTopics = secTopics.filter(t => {
                    const tags = t.tags || (TOPIC_CONTENT[t.id]?.tags || []);
                    return tags.includes(activeTagFilter);
                  });
                  if (secTopics.length===0) continue;
                }
                hasVisibleSection = true;
                const secDone = secTopics.filter(t=>isLcFullyDone(t.id)).length;
                const secPct = secTopics.length ? Math.round((secDone/secTopics.length)*100) : 0;
                let secRows = '';
                for (let i=0; i<secTopics.length; i++) {
                  const topic = secTopics[i];
                  const diff = topic.difficulty || 'Medium';
                  const diffCls = diff.toLowerCase();
                  const done = getLcDoneCount(topic.id);
                  const full = isLcFullyDone(topic.id);
                  const titleClean = topic.title.replace(/^\d+\.\s*/, '');
                  secRows += '<div class="group lc-premium-row '+(full?'is-done':'')+'" onclick="openTopic(\''+topic.id+'\')" style="animation-delay:'+(i*28)+'ms"><div class="lc-premium-left"><button class="lc-premium-check '+(full?'checked':'')+'" onclick="event.stopPropagation(); toggleLcAll(\''+topic.id+'\')" aria-label="toggle"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></button><div class="lc-premium-title-wrap"><span class="lc-premium-id">#'+(topic.leetcodeId||'')+'</span><span class="lc-premium-title" title="'+topic.title+'">'+titleClean+'</span></div></div><div class="lc-premium-right"><span class="lc-premium-pill lc-premium-'+diffCls+'">'+diff+'</span><div class="lc-premium-dots">'+LC_LANGS.map(l=>'<span class="lc-premium-dot '+(isLcLangDone(topic.id,l)?'on':'')+'"></span>').join('')+'</div><span class="lc-premium-count">'+done+'/5</span><span class="lc-premium-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg></span></div></div>';
                }
                sectionsHtml += '<div class="lc-pattern-outer"><div class="lc-pattern-inner"><div class="lc-pattern-head"><div class="lc-pattern-name"><span class="lc-pattern-icon"></span>'+sec.name+'</div><div class="lc-pattern-meta"><span class="lc-pattern-progress">'+secDone+'/'+secTopics.length+'</span><div class="lc-mini-bar"><div class="lc-mini-fill" style="width:'+secPct+'%"></div></div></div></div><div class="lc-premium-list">'+secRows+'</div></div></div>';
              }
              if (activeTagFilter && !hasVisibleSection) return '';
              const total = mod.topics.length;
              const doneFull = mod.topics.filter(t=>isLcFullyDone(t.id)).length;
              const pct = total ? Math.round((doneFull/total)*100) : 0;
              const levelNum = mod.level || 1;
              const levelColors = {1:'#FFA116',2:'#38BDF8',3:'#A78BFA',4:'#34D399',5:'#FB7185'};
              const accent = levelColors[levelNum]||'#FFA116';
              const bentoClass = levelNum===1 ? 'lc-bento-hero' : levelNum===5 ? 'lc-bento-wide' : '';
              return '<div class="lc-bezel-outer lev-'+levelNum+' '+bentoClass+'" style="--lc-accent:'+accent+'"><div class="lc-bezel-inner"><div class="lc-level-head"><div class="lc-level-eyebrow"><span class="lc-eyebrow-dot" style="background:'+accent+'"></span> Level '+levelNum+' • '+total+' bài • '+pct+'%</div><h3 class="lc-level-title">'+mod.name.replace(/ • \d+ bài/,'')+'</h3><p class="lc-level-desc">'+(mod.description||'')+'</p><div class="lc-level-progress"><div class="lc-level-bar"><div class="lc-level-fill" style="width:'+pct+'%;background:'+accent+'"></div></div><span class="lc-level-pct">'+pct+'% • '+doneFull+'/'+total+' done</span></div></div>'+sectionsHtml+'</div></div>';
            }
            return `
          <div class="module-card">
            <h3 class="module-card-title">${mod.name}</h3>
            ${lcExtra}
            <div class="topics-list">
              ${displayTopics.map(topic => {
                const isLc = topic.id && topic.id.startsWith('lc-');
                if (isLc) {
                  const diff = topic.difficulty || 'Medium';
                  const diffColor = diff==='Easy' ? '#34D399' : diff==='Hard' ? '#FB7185' : '#FBBF24';
                  const done = getLcDoneCount(topic.id);
                  const full = isLcFullyDone(topic.id);
                  return `
                <div class="topic-item-row lc-row ${full?'is-done':''}" onclick="openTopic('${topic.id}')" style="${full?'background:rgba(52,211,153,0.06);border-color:rgba(52,211,153,0.2);':''}">
                  <div class="topic-item-left" style="gap:8px;">
                    <span class="lc-card-check" onclick="event.stopPropagation(); toggleLcAll('${topic.id}');" title="Tick đủ 5 ngôn ngữ">${full?'☑':'☐'}</span>
                    <span class="topic-item-row-title" style="font-size:13px;">${topic.title}</span>
                    <span style="font-size:10px;padding:2px 6px;border-radius:999px;background:${diffColor}18;color:${diffColor};border:1px solid ${diffColor}30;">${diff}</span>
                  </div>
                  <div class="topic-item-meta" style="gap:6px;">
                    <span style="font-size:11px;color:var(--text-muted);">${done}/5</span>
                    <span style="display:flex;gap:3px;">${LC_LANGS.map(l=>`<span style="width:7px;height:7px;border-radius:50%;background:${isLcLangDone(topic.id,l)?'#34D399':'rgba(255,255,255,0.15)'}"></span>`).join('')}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;color:var(--text-muted);"><polyline points="9 18 15 12 9 6"/></svg>
                  </div>
                </div>
              `;
                }
                return `
                <div class="topic-item-row ${topic.status === 'draft' ? 'is-draft' : ''}" onclick="openTopic('${topic.id}')">
                  <div class="topic-item-left">
                    <span class="indicator-dot"></span>
                    <span class="topic-item-row-title">${topic.title}</span>
                  </div>
                  <div class="topic-item-meta">
                    ${topic.status === 'draft' ? '<span class="pill-draft">Draft</span>' : ''}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;color:var(--text-muted);"><polyline points="9 18 15 12 9 6"/></svg>
                  </div>
                </div>
              `;
              }).join('')}
            </div>
          </div>
        `;
          }).join('');
        })()}
      </div>

      <div style="margin-top: 48px; border-top: 1px solid var(--border); padding-top: 24px;">
        <button class="btn-secondary" onclick="showHome()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Quay lại trang chủ
        </button>
      </div>
    </div>
  `;

  hideToc();
}

function expandDomainAndShow(domainId) {
  showDomain(domainId);
  setTimeout(() => {
    document.querySelector(`.sidebar-domain.expanded`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 100);
}

// ── Topic View ────────────────────────────────────────────────────
function findTopic(topicId) {
  for (const domain of KNOWLEDGE_DATA.domains) {
    for (const mod of domain.modules) {
      const topic = mod.topics.find(t => t.id === topicId);
      if (topic) return topic;
    }
  }
  return null;
}

function findContext(topicId) {
  for (const domain of KNOWLEDGE_DATA.domains) {
    for (const mod of domain.modules) {
      const topic = mod.topics.find(t => t.id === topicId);
      if (topic) return { domain, mod, topic };
    }
  }
  return null;
}

function triggerMathJax() {
  if (window.MathJax) {
    if (typeof window.MathJax.typesetPromise === 'function') {
      window.MathJax.typesetPromise().catch(e => console.error("MathJax promise error:", e));
    } else if (typeof window.MathJax.typeset === 'function') {
      try {
        window.MathJax.typeset();
      } catch (e) {
        console.error("MathJax error:", e);
      }
    }
  }
}

function openTopic(topicId, updateHash = true) {
  currentTopicId = topicId;
  currentView = 'topic';
  isShowingOriginal = false;
  setActiveNav(null);
  setLayoutMode('content');
  markTopicVisited(topicId);

  if (updateHash && window.location.hash !== `#${topicId}`) {
    history.pushState(null, '', `#${topicId}`);
  }

  const ctx = findContext(topicId);
  if (!ctx) return;
  const { domain, mod, topic } = ctx;

  const content = TOPIC_CONTENT[topicId];
  const hasContent = !!content;

  // Set current domain and expand sidebar
  currentDomainId = domain.id;
  expandedDomains.add(domain.id);
  expandedModules.add(mod.id);
  expandSectionsForTopic(mod, topicId);
  renderSidebar();

  const prerequisiteTopics = (content?.prerequisites || []).map(pid => {
    const t = findTopic(pid);
    return t ? `<a href="#" onclick="openTopic('${pid}'); return false;" style="color:var(--accent-blue);">${t.title}</a>` : pid;
  });

  const relatedTopics = (content?.related || []).map(rid => {
    const t = findTopic(rid);
    return t ? `<a href="#" onclick="openTopic('${rid}'); return false;" style="color:var(--accent-blue);">${t.title}</a>` : rid;
  });

  const isLcTopic = topic.id && topic.id.startsWith('lc-');
  if (isLcTopic && hasContent) {
    const diff = (content.difficulty || topic.difficulty || 'Medium');
    const diffCls = diff.toLowerCase();
    const accentMap = { easy: '#34D399', medium: '#FBBF24', hard: '#FB7185' };
    const heroAccent = accentMap[diffCls] || '#FFA116';
    const levelNum = content.level || topic.level || 1;
    const doneCount = getLcDoneCount(topic.id);
    const pct = Math.round((doneCount/5)*100);
    const dotsHtml = LC_LANGS.map(l => `<span class="lc-hero-dot ${isLcLangDone(topic.id,l)?'on':''}" title="${l.toUpperCase()}"></span>`).join('');
    const titleClean = (content.title || topic.title).replace(/^\d+\.\s*/, '');
    const idNum = content.leetcodeId || topic.leetcodeId || '';
    // Extract pattern for eyebrow
    const pattern = content.pattern || topic.pattern || mod.name;
    document.getElementById('main').innerHTML = `
    <div class="lc-premium-page fade-in" style="--lc-accent:${heroAccent}">
      <div class="breadcrumb">
        <a href="#" onclick="showHome(); return false;">Home</a>
        <span class="breadcrumb-sep">›</span>
        <a href="#" onclick="expandDomainAndShow('${domain.id}'); return false;">${domain.name}</a>
        <span class="breadcrumb-sep">›</span>
        <a href="#" onclick="toggleModule('${mod.id}'); return false;">${mod.name}</a>
        <span class="breadcrumb-sep">›</span>
        <span>${topic.title}</span>
      </div>

      <div class="lc-hero-outer">
        <div class="lc-hero-inner">
          <div class="lc-hero-eyebrow">
            <span class="lc-hero-eyebrow-badge"><span class="lc-hero-eyebrow-dot"></span> Level ${levelNum} • ${pattern}</span>
            <span class="lc-hero-diff lc-hero-diff-${diffCls}">${diff}</span>
            <span class="tag tag-${(content.tags||topic.tags||[])[0]||'leetcode'}" style="font-size:10px;cursor:default;">${pattern}</span>
          </div>
          <h1 class="lc-hero-title">${titleClean} <span class="lc-hero-title-id">#${idNum} • LC ${idNum}</span></h1>
          <p class="lc-hero-sub">${content.summary || ''} • Pattern <strong>${pattern}</strong> • Level ${levelNum} • ${diff} • 5 ngôn ngữ C++ / Java / Kotlin / Swift / Dart</p>
          <div class="lc-hero-actions">
            <a href="${content.url || '#'}" target="_blank" class="rd-btn-primary" style="background: linear-gradient(135deg, ${heroAccent} 0%, color-mix(in srgb, ${heroAccent} 78%, #000) 100%); border-color: rgba(255,255,255,0.18);">
              <span>Mở trên LeetCode</span>
              <span class="btn-icon-bubble">↗</span>
            </a>
            <button class="rd-btn-ghost" onclick="copyCurrentTopicLink()" title="Sao chép liên kết">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
              <span>Chia sẻ</span>
            </button>
            <button class="rd-btn-ghost" onclick="toggleZenMode()" title="Zen Mode">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;"><circle cx="12" cy="12" r="3"/><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/></svg>
              <span>Zen</span>
            </button>
            <button class="rd-btn-ghost" onclick="toggleOriginalContent()" title="Đổi ngôn ngữ">
              <span>EN / VI</span>
            </button>
          </div>
          <div class="lc-hero-progress">
            <div class="lc-hero-dots">${dotsHtml}</div>
            <span class="lc-hero-progress-label">${doneCount}/5 ngôn ngữ</span>
            <div class="lc-hero-bar"><div class="lc-hero-fill" style="width:${pct}%"></div></div>
            <span class="lc-hero-pct">${pct}% • ${doneCount===5?'Hoàn thành ✓':doneCount>0?'Đang làm':'Chưa bắt đầu'}</span>
          </div>
        </div>
      </div>

      <div class="lc-detail-grid">
        <div class="lc-detail-main">
          <div class="prose" id="prose-content">
            ${content.content}
          </div>
        </div>
        <aside class="lc-detail-aside">
          <div class="lc-aside-card-outer">
            <div class="lc-aside-card-inner">
              <div class="lc-aside-title">Tiến độ & Độ phức tạp</div>
              <div class="lc-aside-complexity">
                <div class="lc-complexity-pill"><div class="k">Mục tiêu Time</div><div class="v">O(n) / O(n log n)</div></div>
                <div class="lc-complexity-pill"><div class="k">Space</div><div class="v">O(n)</div></div>
              </div>
              <div style="margin-top:12px;" class="lc-aside-list">
                <div class="lc-aside-row"><span>Đã hoàn thành</span><strong>${doneCount}/5</strong></div>
                <div class="lc-aside-row"><span>Level</span><strong>Level ${levelNum}</strong></div>
                <div class="lc-aside-row"><span>Pattern</span><strong>${pattern}</strong></div>
                <div class="lc-aside-row"><span>Độ khó</span><strong style="color:${heroAccent}">${diff}</strong></div>
              </div>
              <div style="margin-top:12px; display:flex; gap:8px; flex-wrap:wrap;">
                <button class="rd-btn-primary" style="flex:1;justify-content:center;padding:8px 12px;font-size:12px;background: ${heroAccent}; color:#000; border-color:${heroAccent};" onclick="toggleLcAll('${topic.id}')">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:14px;height:14px;"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>${doneCount===5?'Bỏ tick All':'Tick đủ 5 ngôn ngữ'}</span>
                </button>
              </div>
              <div style="margin-top:10px; font-size:11px; color:var(--text-muted); line-height:1.5;">
                Tick đủ 5 ngôn ngữ mới tính là <strong style="color:var(--text-primary)">Done</strong>. Dữ liệu lưu local trên trình duyệt.
              </div>
            </div>
          </div>

          <div class="lc-aside-card-outer">
            <div class="lc-aside-card-inner">
              <div class="lc-aside-title">Điều hướng</div>
              <div class="lc-aside-list">
                ${(content?.tags || topic.tags || []).slice(0,4).map(t => `<button onclick="filterByTag('${t}')" style="display:flex;align-items:center;justify-content:space-between;width:100%;padding:8px 12px;border-radius:10px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);color:var(--text-secondary);font-size:12px;font-weight:600;cursor:pointer;text-align:left;"># ${t} <span style="color:var(--text-muted)">›</span></button>`).join('')}
              </div>
              <div style="margin-top:12px; display:flex; gap:8px;">
                <button class="rd-btn-ghost" style="flex:1;justify-content:center;" onclick="showDomain('${domain.id}')">← ${domain.name}</button>
                ${getNextTopic(domain, mod, topic) ? `<button class="rd-btn-ghost" style="flex:1;justify-content:center;" onclick="openTopic('${getNextTopic(domain, mod, topic).id}')">Tiếp →</button>` : ''}
              </div>
            </div>
          </div>

          ${(content?.prerequisites?.length || content?.related?.length) ? `
          <div class="lc-aside-card-outer">
            <div class="lc-aside-card-inner">
              <div class="lc-aside-title">Liên kết tri thức</div>
              <div style="display:flex;flex-direction:column;gap:8px;">
                ${(content.prerequisites||[]).slice(0,3).map(pid => {
                  const pt = findTopic(pid);
                  return pt ? `<button onclick="openTopic('${pid}')" style="text-align:left;padding:8px 12px;border-radius:10px;background:rgba(167,139,250,0.08);border:1px solid rgba(167,139,250,0.18);color:var(--text-primary);font-size:12px;font-weight:600;cursor:pointer;">↳ ${pt.title}</button>` : '';
                }).join('')}
                ${(content.related||[]).slice(0,3).map(rid => {
                  const rt = findTopic(rid);
                  return rt ? `<button onclick="openTopic('${rid}')" style="text-align:left;padding:8px 12px;border-radius:10px;background:rgba(56,189,248,0.08);border:1px solid rgba(56,189,248,0.18);color:var(--text-primary);font-size:12px;font-weight:600;cursor:pointer;">✦ ${rt.title}</button>` : '';
                }).join('')}
                ${(!content.prerequisites?.length && !content.related?.length) ? '<span style="font-size:12px;color:var(--text-muted);font-style:italic;">Chưa có liên kết</span>' : ''}
              </div>
            </div>
          </div>` : ''}
        </aside>
      </div>
    </div>
    `;
  } else {
    document.getElementById('main').innerHTML = `
    <div class="content-view fade-in">
      <div class="breadcrumb">
        <a href="#" onclick="showHome(); return false;">Home</a>
        <span class="breadcrumb-sep">›</span>
        <a href="#" onclick="expandDomainAndShow('${domain.id}'); return false;">${domain.name}</a>
        <span class="breadcrumb-sep">›</span>
        <a href="#" onclick="toggleModule('${mod.id}'); return false;">${mod.name}</a>
        <span class="breadcrumb-sep">›</span>
        <span>${topic.title}</span>
      </div>

      <div class="content-header">
        <div class="content-tags">
          ${(content?.tags || topic.tags).map(t => `<span class="tag tag-${t} ${isTagActive(t)?'tag-active':''}" onclick="filterByTag('${t}')" title="Lọc theo tag: ${t}" style="cursor:pointer;">${t}</span>`).join('')}
          ${topic.status === 'draft' ? '<span class="tag" style="background:var(--accent-amber-lt);color:var(--accent-amber);border-color:rgba(245,158,11,.2);">draft</span>' : ''}
        </div>
        ${activeTagFilter ? `<div style="margin-top:8px;font-size:12px;color:var(--text-muted);">Đang lọc: <span style="color:#FFA116;font-weight:700;">${activeTagFilter}</span> <button onclick="clearTagFilter()" style="margin-left:8px;padding:2px 8px;font-size:11px;border-radius:999px;border:1px solid var(--border);background:rgba(255,255,255,0.06);color:var(--text-secondary);cursor:pointer;">✕ Xóa lọc</button></div>` : ''}
        <h1 class="content-title">${content?.title || topic.title}</h1>
        ${hasContent ? `<p class="content-summary">${content.summary}</p>` : ''}
        <div class="content-meta">
          ${hasContent ? `<span class="meta-item">${content.readTime} đọc</span>` : ''}
          ${hasContent ? `<span class="meta-item">Cập nhật ${content.updatedAt}</span>` : ''}
          ${prerequisiteTopics.length ? `<span class="meta-item">Yêu cầu: ${prerequisiteTopics.join(', ')}</span>` : ''}
          ${relatedTopics.length ? `<span class="meta-item">Liên quan: ${relatedTopics.join(', ')}</span>` : ''}
        </div>
      </div>

      <div class="prose" id="prose-content">
        ${hasContent ? content.content : `
          <div class="callout callout-note">
            <span class="callout-icon">📝</span>
            <div class="callout-body">
              <strong>${topic.title}</strong> đang được biên soạn.
              Nội dung sẽ sớm được cập nhật vào Knowledge OS.
            </div>
          </div>
          <p>Topic này nằm trong module <strong>${mod.name}</strong> của domain <strong>${domain.name}</strong>.</p>
        `}
      </div>

      <div class="topic-local-graph-box">
        <div class="tlg-header">
          <div class="tlg-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
            <span>Mạng lưới tri thức liên quan (Local Knowledge Map)</span>
          </div>
          <button class="kg-hud-btn" style="height:30px;padding:0 12px;font-size:11.5px;" onclick="showGraph('${topic.id}')" title="Xem vị trí của bài học này trên Knowledge Graph Atlas">
            <span>Mở toàn cảnh Atlas ➔</span>
          </button>
        </div>
        <div class="tlg-grid">
          <div class="tlg-column">
            <div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;margin-bottom:4px;">Kiến thức tiền đề</div>
            ${(content?.prerequisites || []).length > 0 ? (content.prerequisites).map(pid => {
              const pt = findTopic(pid);
              if (!pt) return '';
              return `
                <div class="tlg-node-card" onclick="openTopic('${pid}')">
                  <div style="font-size:12.5px;font-weight:600;color:var(--text-primary);">${pt.title}</div>
                  <span style="font-size:10px;padding:2px 6px;border-radius:var(--radius-full);background:rgba(167,139,250,0.15);color:var(--accent-violet);">Tiền đề</span>
                </div>
              `;
            }).filter(Boolean).join('') : `<div style="font-size:12px;color:var(--text-muted);padding:8px 0;font-style:italic;">Không có bài tiền đề bắt buộc</div>`}
          </div>

          <div class="tlg-column">
            <div class="tlg-node-current">
              <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;color:var(--accent-sky);letter-spacing:0.05em;margin-bottom:4px;">Chủ đề hiện tại</div>
              <div class="title">${content?.title || topic.title}</div>
              <div style="font-size:11.5px;color:var(--text-secondary);margin-top:6px;">${domain.name} › ${mod.name}</div>
            </div>
          </div>

          <div class="tlg-column">
            <div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;margin-bottom:4px;">Tiếp theo & Liên quan</div>
            ${(() => {
              const nextT = getNextTopic(domain, mod, topic);
              const relatedList = (content?.related || []).map(rid => findTopic(rid)).filter(Boolean);
              const items = [];
              if (nextT) {
                items.push(`
                  <div class="tlg-node-card" onclick="openTopic('${nextT.id}')" style="border-color:rgba(56,189,248,0.3);">
                    <div style="font-size:12.5px;font-weight:600;color:var(--text-primary);">${nextT.title}</div>
                    <span style="font-size:10px;padding:2px 6px;border-radius:var(--radius-full);background:rgba(56,189,248,0.15);color:var(--accent-sky);">Bài kế tiếp</span>
                  </div>
                `);
              }
              relatedList.slice(0, 2).forEach(rt => {
                if (rt.id !== nextT?.id) {
                  items.push(`
                    <div class="tlg-node-card" onclick="openTopic('${rt.id}')">
                      <div style="font-size:12.5px;font-weight:600;color:var(--text-primary);">${rt.title}</div>
                      <span style="font-size:10px;padding:2px 6px;border-radius:var(--radius-full);background:rgba(255,255,255,0.06);color:var(--text-secondary);">Liên quan</span>
                    </div>
                  `);
                }
              });
              return items.length > 0 ? items.join('') : '<div style="font-size:12px;color:var(--text-muted);padding:8px 0;font-style:italic;">Chưa có chủ đề tiếp theo</div>';
            })()}
          </div>
        </div>
      </div>

      <div class="content-nav">
        <button class="content-nav-btn" onclick="showHome()">
          <div class="nav-direction">← Quay lại</div>
          <div class="nav-title">Trang chủ</div>
        </button>
        ${getNextTopic(domain, mod, topic) ? `
          <button class="content-nav-btn next" onclick="openTopic('${getNextTopic(domain, mod, topic).id}')">
            <div class="nav-direction">Tiếp theo →</div>
            <div class="nav-title">${getNextTopic(domain, mod, topic).title}</div>
          </button>
        ` : '<div></div>'}
      </div>
    </div>
  `;
  }

  // Show Header Reading Tools (Zen Mode, Font Scaling, Share Link)
  const headerReadingTools = document.getElementById('header-reading-tools');
  if (headerReadingTools) headerReadingTools.style.display = 'flex';

  // Render TOC
  if (hasContent) {
    renderToc(content.content);
  } else {
    hideToc();
  }

  // Reset scroll progress rail
  const rail = document.getElementById('scroll-progress-fill');
  if (rail) rail.style.width = '0%';

  // Trigger MathJax Typesetting
  triggerMathJax();

  // Enhance code blocks: language header, copy button, syntax highlighting
  enhanceProseCodeBlocks();
  applyPreferredDsaLang();
  initReadingEnhancers();
  initReadingExtras();

  // Trigger Mermaid Diagram Rendering
  if (window.mermaid) {
    try {
      if (typeof getMermaidConfig === 'function') mermaid.initialize(getMermaidConfig());
      document.querySelectorAll('#prose-content .mermaid, #prose-content pre.mermaid').forEach(el => {
        el.setAttribute('data-mermaid-source', el.innerHTML);
      });
      const mermaidPromise = mermaid.run({
        querySelector: '#prose-content .mermaid, #prose-content pre.mermaid'
      });
      if (mermaidPromise && typeof mermaidPromise.then === 'function') {
        mermaidPromise.then(() => setTimeout(enhanceMermaidDiagrams, 80)).catch(e => console.error("Mermaid error:", e));
      } else {
        setTimeout(enhanceMermaidDiagrams, 600);
      }
    } catch (e) {
      console.error("Mermaid error:", e);
    }
  }

  // Show/hide the header-level "Xem bản gốc" toggle for this topic
  const headerToggleBtn = document.getElementById('btn-toggle-original');
  if (headerToggleBtn) {
    if (hasContent && content.originalContent) {
      headerToggleBtn.style.display = '';
      headerToggleBtn.classList.remove('active');
      headerToggleBtn.innerHTML = '🌐 Xem bản gốc (English)';
    } else {
      headerToggleBtn.style.display = 'none';
    }
  }

  // — Premium LeetCode post-enhancements —
  if (isLcTopic && hasContent) {
    // Wrap each H2 section into double-bezel shell
    const proseEl = document.getElementById('prose-content');
    if (proseEl) {
      const sectionTitles = {
        '📋': 'Đề bài',
        '🎯': 'Tiếp cận Pattern',
        '💻': 'Code 5 ngôn ngữ',
        '✅': 'Checklist & Độ phức tạp'
      };
      // Group nodes by H2
      const children = Array.from(proseEl.children);
      const sections = [];
      let cur = null;
      children.forEach(node => {
        if (node.tagName === 'H2') {
          if (cur) sections.push(cur);
          cur = { h2: node, nodes: [] };
        } else if (cur) {
          cur.nodes.push(node);
        } else {
          // content before first H2 (e.g., stray header) -> create intro section
          if (!cur) cur = { h2: null, nodes: [] };
          cur.nodes.push(node);
        }
      });
      if (cur) sections.push(cur);
      // Clear prose and rebuild with shells
      proseEl.innerHTML = '';
      sections.forEach(sec => {
        const titleText = sec.h2 ? sec.h2.textContent.trim() : '';
        const iconMatch = Object.keys(sectionTitles).find(k => titleText.includes(k));
        const icon = iconMatch || '◆';
        const titleClean = titleText.replace(/^[^\w]*\s*/, '').replace(/^Đề bài|Problem Statement/, 'Đề bài').trim() || 'Nội dung';
        const subLabel = sec.h2 ? (titleText.includes('Code') ? '5 ngôn ngữ • Chọn tab để xem' : titleText.includes('Checklist') ? 'Mục tiêu O(n)' : titleText.includes('Pattern') ? 'Nhận diện trước khi code' : 'Mô tả chi tiết') : 'Tổng quan';
        const outer = document.createElement('div');
        outer.className = 'lc-section-outer';
        const inner = document.createElement('div');
        inner.className = 'lc-section-inner';
        if (sec.h2) {
          const head = document.createElement('div');
          head.className = 'lc-section-head';
          head.innerHTML = `<span class="lc-section-icon">${icon}</span><span class="lc-section-title">${titleClean}</span><span class="lc-section-sub">${subLabel}</span>`;
          inner.appendChild(head);
          // keep original h2 hidden but for TOC anchor, re-insert a hidden h2
          const hiddenH2 = sec.h2.cloneNode(true);
          hiddenH2.style.display = 'none';
          hiddenH2.setAttribute('data-lc-hidden', 'true');
          inner.appendChild(hiddenH2);
        }
        sec.nodes.forEach(n => inner.appendChild(n));
        outer.appendChild(inner);
        proseEl.appendChild(outer);
      });
      // Re-inject visible H2 anchors for TOC scroll (keep hidden ones for TOC generation already done)
      // Enhance code panes: add copy button & ensure active pane
      proseEl.querySelectorAll('.lc-code-pane pre').forEach(pre => {
        if (pre.querySelector('.lc-code-copy')) return;
        pre.style.position = 'relative';
        const btn = document.createElement('button');
        btn.className = 'lc-code-copy';
        btn.title = 'Sao chép code';
        btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>`;
        btn.onclick = () => {
          const code = pre.querySelector('code')?.innerText || pre.innerText;
          navigator.clipboard.writeText(code).then(()=> showToast('📋 Đã sao chép code!')).catch(()=> showToast('Không thể sao chép'));
        };
        pre.appendChild(btn);
      });
      // Animate sections entry
      proseEl.querySelectorAll('.lc-section-outer').forEach((el, i) => {
        el.style.animation = `lcFadeUp 560ms cubic-bezier(0.32,0.72,0,1) both`;
        el.style.animationDelay = `${80 + i*90}ms`;
      });
      // Ensure hero progress reflects current done state
      updateLcCheckboxes(topic.id);
      // Wrap hero progress dots update
      const heroDots = document.querySelectorAll('.lc-hero-dot');
      heroDots.forEach((dot, idx) => {
        const lang = LC_LANGS[idx];
        if (lang) dot.classList.toggle('on', isLcLangDone(topic.id, lang));
      });
      const heroFill = document.querySelector('.lc-hero-fill');
      if (heroFill) {
        const pct2 = Math.round((getLcDoneCount(topic.id)/5)*100);
        heroFill.style.width = pct2 + '%';
      }
      const heroPctLabel = document.querySelector('.lc-hero-pct');
      if (heroPctLabel) {
        const c = getLcDoneCount(topic.id);
        heroPctLabel.textContent = `${Math.round((c/5)*100)}% • ${c===5?'Hoàn thành ✓':c>0?'Đang làm':'Chưa bắt đầu'}`;
      }
    }
  }
}

// ── Zen Reader & Interactive Helper Actions ───────────────────────
window.toggleZenMode = function() {
  const layout = document.getElementById('layout');
  const isZen = layout.classList.toggle('zen-mode');
  document.body.classList.toggle('zen-mode', isZen);
  const btn = document.getElementById('btn-zen-mode');
  if (btn) btn.classList.toggle('active', isZen);
  showToast(isZen ? '👁️ Đã kích hoạt Zen Focus Mode' : 'Đã thoát Zen Mode');
};

let currentFontScaleIndex = 0;
const FONT_SCALES = [
  { size: '16px', label: '1x' },
  { size: '18px', label: '1.2x' },
  { size: '20.5px', label: '1.4x' }
];

window.cycleFontSize = function() {
  currentFontScaleIndex = (currentFontScaleIndex + 1) % FONT_SCALES.length;
  const current = FONT_SCALES[currentFontScaleIndex];
  const prose = document.getElementById('prose-content');
  if (prose) prose.style.fontSize = current.size;
  const lbl = document.getElementById('zen-font-label');
  if (lbl) lbl.textContent = `A (${current.label})`;
  showToast(`Cỡ chữ bài đọc: ${current.label}`);
};

window.copyCurrentTopicLink = function() {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    showToast('🔗 Đã sao chép liên kết bài học!');
  }).catch(() => {
    showToast('Không thể sao chép liên kết');
  });
};

window.scrollToTopicTop = function() {
  const main = document.getElementById('main');
  if (main) main.scrollTo({ top: 0, behavior: 'smooth' });
};

// ── Prose Code Block Enhancement (shell header + copy + highlight) ──
const CODE_COPY_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:12px;height:12px;"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>`;
const CODE_LANG_ALIASES = { kotlin: 'Kotlin', java: 'Java', swift: 'Swift', python: 'Python', javascript: 'JavaScript', typescript: 'TypeScript', cpp: 'C++', c: 'C', csharp: 'C#', go: 'Go', rust: 'Rust', ruby: 'Ruby', dart: 'Dart', bash: 'Shell', shell: 'Shell', xml: 'XML', html: 'XML', yaml: 'YAML', json: 'JSON', toml: 'TOML', groovy: 'Groovy', gradle: 'Gradle', bytecode: 'Bytecode' };

function enhanceProseCodeBlocks() {
  const proseEl = document.getElementById('prose-content');
  if (!proseEl) return;

  proseEl.querySelectorAll('pre').forEach(pre => {
    if (pre.closest('.rd-code') || pre.closest('.lc-code-pane') || pre.closest('.code-tabs')) return;
    if (pre.closest('.lc-premium-page') || pre.classList.contains('mermaid')) return;

    const codeEl = pre.querySelector('code') || pre;
    const rawLang = (
      pre.getAttribute('data-lang') ||
      codeEl.getAttribute('data-lang') ||
      ((codeEl.className || '').match(/language-([\w+#-]+)/) || [])[1] ||
      ''
    ).toLowerCase();

    // Syntax highlighting (skip plain text)
    if (window.hljs && rawLang && !['text', 'plaintext', 'none'].includes(rawLang) && !codeEl.dataset.hlDone) {
      try {
        delete codeEl.dataset.result;
        hljs.highlightElement(codeEl);
        codeEl.dataset.hlDone = '1';
      } catch (e) { /* non-fatal */ }
    }

    // Shell wrapper with language header + copy button
    const shell = document.createElement('div');
    shell.className = 'rd-code';
    const head = document.createElement('div');
    head.className = 'rd-code-head';
    const langLabel = CODE_LANG_ALIASES[rawLang] || (rawLang ? rawLang.toUpperCase() : 'Code');

    head.innerHTML = `
      <span class="rd-code-lang">${langLabel}</span>
      <button class="rd-code-copy" type="button" title="Sao chép code">${CODE_COPY_ICON}<span>Copy</span></button>
    `;
    head.querySelector('.rd-code-copy').addEventListener('click', function () {
      const text = codeEl.innerText;
      navigator.clipboard.writeText(text).then(() => {
        this.classList.add('copied');
        this.querySelector('span').textContent = 'Đã copy';
        setTimeout(() => {
          this.classList.remove('copied');
          this.querySelector('span').textContent = 'Copy';
        }, 1600);
        showToast('📋 Đã sao chép code!');
      }).catch(() => showToast('Không thể sao chép code'));
    });

    pre.parentNode.insertBefore(shell, pre);
    shell.appendChild(head);
    shell.appendChild(pre);
  });
}

window.showToast = function(msg) {
  let toast = document.getElementById('kos-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'kos-toast';
    toast.className = 'kos-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
};


// ── Original content toggle ("Xem bản gốc") ───────────────────────
let isShowingOriginal = false;

function hideOriginalToggle() {
  const btn = document.getElementById('btn-toggle-original');
  if (btn) btn.style.display = 'none';
  const tools = document.getElementById('header-reading-tools');
  if (tools) tools.style.display = 'none';
}

function toggleOriginalContent() {
  const content = TOPIC_CONTENT[currentTopicId];
  if (!content || !content.originalContent) return;

  isShowingOriginal = !isShowingOriginal;

  const proseEl = document.getElementById('prose-content');
  const btn = document.getElementById('btn-toggle-original');
  const html = isShowingOriginal ? content.originalContent : content.content;

  if (proseEl) {
    proseEl.innerHTML = html;
    proseEl.classList.toggle('raw-markdown', isShowingOriginal);
    // Re-apply premium wrapping for LC topics
    if (currentTopicId && currentTopicId.startsWith('lc-')) {
      // Need to re-wrap after innerHTML set — reuse same logic as openTopic premium enhancement
      // Simple approach: re-trigger openTopic without hash change to rebuild full page? Instead just re-wrap inline.
      // Inline re-wrap (duplicate logic minimal — re-run section wrapping)
      const isLc = true;
      if (isLc) {
        const children = Array.from(proseEl.children);
        const sections = [];
        let cur = null;
        children.forEach(node => {
          if (node.tagName === 'H2') {
            if (cur) sections.push(cur);
            cur = { h2: node, nodes: [] };
          } else if (cur) {
            cur.nodes.push(node);
          } else {
            if (!cur) cur = { h2: null, nodes: [] };
            cur.nodes.push(node);
          }
        });
        if (cur) sections.push(cur);
        proseEl.innerHTML = '';
        sections.forEach(sec => {
          const titleText = sec.h2 ? sec.h2.textContent.trim() : '';
          const iconMatch = ['📋','🎯','💻','✅'].find(k => titleText.includes(k));
          const icon = iconMatch || '◆';
          const titleClean = sec.h2 ? sec.h2.textContent.replace(/^[^\w]*\s*/, '').trim() : 'Nội dung';
          const subLabel = titleText.includes('Code') ? '5 ngôn ngữ • Chọn tab để xem' : titleText.includes('Checklist') ? 'Mục tiêu O(n)' : titleText.includes('Pattern') ? 'Nhận diện trước khi code' : 'Mô tả chi tiết';
          const outer = document.createElement('div');
          outer.className = 'lc-section-outer';
          const inner = document.createElement('div');
          inner.className = 'lc-section-inner';
          if (sec.h2) {
            const head = document.createElement('div');
            head.className = 'lc-section-head';
            head.innerHTML = `<span class="lc-section-icon">${icon}</span><span class="lc-section-title">${titleClean}</span><span class="lc-section-sub">${subLabel}</span>`;
            inner.appendChild(head);
            const hiddenH2 = sec.h2.cloneNode(true);
            hiddenH2.style.display = 'none';
            inner.appendChild(hiddenH2);
          }
          sec.nodes.forEach(n => inner.appendChild(n));
          outer.appendChild(inner);
          proseEl.appendChild(outer);
        });
        proseEl.querySelectorAll('.lc-code-pane pre').forEach(pre => {
          if (pre.querySelector('.lc-code-copy')) return;
          pre.style.position = 'relative';
          const b = document.createElement('button');
          b.className = 'lc-code-copy';
          b.title = 'Sao chép code';
          b.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>`;
          b.onclick = () => {
            const code = pre.querySelector('code')?.innerText || pre.innerText;
            navigator.clipboard.writeText(code).then(()=> showToast('📋 Đã sao chép code!')).catch(()=> showToast('Không thể sao chép'));
          };
          pre.appendChild(b);
        });
      }
    }
  }
  if (btn) {
    btn.innerHTML = isShowingOriginal ? '🇻🇳 Xem bản dịch (Tiếng Việt)' : '🌐 Xem bản gốc (English)';
    btn.classList.toggle('active', isShowingOriginal);
  }

  renderToc(html);
  triggerMathJax();
  enhanceProseCodeBlocks();
  applyPreferredDsaLang();
  initReadingEnhancers();
  initReadingExtras();
  if (window.mermaid) {
    try {
      if (typeof getMermaidConfig === 'function') mermaid.initialize(getMermaidConfig());
      document.querySelectorAll('#prose-content .mermaid, #prose-content pre.mermaid').forEach(el => {
        if (!el.getAttribute('data-mermaid-source')) el.setAttribute('data-mermaid-source', el.innerHTML);
      });
      const p = mermaid.run({ querySelector: '#prose-content .mermaid, #prose-content pre.mermaid' });
      if (p && typeof p.then === 'function') p.then(() => setTimeout(enhanceMermaidDiagrams, 80));
      else setTimeout(enhanceMermaidDiagrams, 600);
    } catch (e) { console.error('Mermaid error:', e); }
  }
}

function getNextTopic(domain, mod, topic) {
  const topics = mod.topics;
  const idx = topics.findIndex(t => t.id === topic.id);
  if (idx < topics.length - 1) return topics[idx + 1];

  // Next module
  const mods = domain.modules;
  const midx = mods.findIndex(m => m.id === mod.id);
  if (midx < mods.length - 1 && mods[midx + 1].topics.length > 0) {
    return mods[midx + 1].topics[0];
  }
  return null;
}

// ── TOC ───────────────────────────────────────────────────────────
// Headings eligible for TOC: h2/h3 not nested inside code samples
function getTocHeadings(root) {
  return Array.from(root.querySelectorAll('h2, h3')).filter(h => !h.closest('pre, code'));
}

function renderToc(html) {
  const toc = document.getElementById('toc');
  const parser = new DOMParser();
  const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html');
  const headings = getTocHeadings(doc.body);

  if (headings.length === 0) { hideToc(); return; }

  toc.style.display = 'block';
  toc.innerHTML = `
    <div class="toc-title">Nội dung</div>
    ${headings.map((h, i) => `
      <div class="toc-item ${h.tagName === 'H3' ? 'h3' : ''}"
           onclick="scrollToHeading(${i})">
        ${h.textContent}
      </div>
    `).join('')}
  `;
}

function hideToc() {
  const toc = document.getElementById('toc');
  toc.style.display = 'none';
}

function scrollToHeading(index) {
  const proseEl = document.getElementById('prose-content');
  if (!proseEl) return;
  const headings = getTocHeadings(proseEl);
  if (headings[index]) {
    headings[index].scrollIntoView({ behavior: 'smooth' });
  }
}

// ── Home Dashboard ────────────────────────────────────────────────
function toggleRoadmapFilter() {
  roadmapFilter = roadmapFilter === 'all' ? 'in-progress' : 'all';
  showHome();
}

const ROADMAP_ICONS = {
  filter: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`,
  compass: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
  trending: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
  award: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`,
  layers: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  play: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  arrowRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  flame: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"/></svg>`,
};

function showHome(updateHash = true) {
  const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/website/') || window.location.pathname.endsWith('/website');
  if (!isHomePage) {
    window.location.href = 'index.html';
    return;
  }
  currentDomainId = null;
  currentTopicId = null;
  currentView = 'home';
  setActiveNav('navHome');
  setLayoutMode('home');
  hideToc();
  hideOriginalToggle();
  renderSidebar();

  if (updateHash && window.location.hash) {
    history.pushState(null, '', window.location.pathname + window.location.search);
  }

  // Real learner progress: derived from topics actually visited (localStorage),
  // measured against topics that currently have published content.
  const withStats = KNOWLEDGE_DATA.domains.map(domain => {
    const topics = domain.modules.flatMap(m => m.topics);
    const available = topics.filter(t => t.status === 'published');
    const visited = available.filter(t => isTopicVisited(t.id));
    const pct = available.length ? Math.round((visited.length / available.length) * 100) : 0;

    // Sort visited published topics by time of visit (most recent first)
    const sortedVisited = [...visited].sort((a, b) => {
      const timeA = new Date(progressState.visited[a.id] || 0).getTime();
      const timeB = new Date(progressState.visited[b.id] || 0).getTime();
      return timeB - timeA;
    });

    let targetNextTopic = null;
    let computedLabel = 'Tiếp tục học';

    if (visited.length === 0) {
      // Not started yet, suggest the first available topic
      targetNextTopic = available[0] || null;
      computedLabel = 'Bắt đầu học';
    } else {
      // Return the absolute latest opened/visited topic so they can resume exactly where they left off
      targetNextTopic = sortedVisited[0] || null;
      computedLabel = 'Tiếp tục học';
    }

    const nextDraft = topics.find(t => t.status !== 'published');
    const continueId = targetNextTopic ? targetNextTopic.id : (nextDraft ? nextDraft.id : null);
    const continueLabel = targetNextTopic ? computedLabel : (nextDraft ? 'Xem nội dung sắp ra mắt' : null);
    const nextModule = targetNextTopic ? domain.modules.find(m => m.topics.some(t => t.id === targetNextTopic.id)) : null;
    const stageLabel = nextModule ? nextModule.name : (nextDraft ? 'Nội dung mới sắp ra mắt' : 'Đã hoàn thành nội dung hiện có');

    const lastVisitedTime = Math.max(0, ...visited.map(t => new Date(progressState.visited[t.id] || 0).getTime()));

    return {
      ...domain,
      total: topics.length,
      availableCount: available.length,
      visitedCount: visited.length,
      pct,
      lastVisitedTime,
      continueId,
      continueLabel,
      stageLabel,
    };
  });

  const totalTopics = withStats.reduce((s, d) => s + d.total, 0);
  const totalAvailable = withStats.reduce((s, d) => s + d.availableCount, 0);
  const totalVisited = withStats.reduce((s, d) => s + d.visitedCount, 0);
  const totalModules = withStats.reduce((s, d) => s + d.modules.length, 0);
  const overallPct = totalAvailable ? Math.round((totalVisited / totalAvailable) * 100) : 0;

  // Real weekly study time, tracked while the tab is visible
  const last7Days = getLastNDaysMs(7);
  const weekMs = last7Days.reduce((s, d) => s + d.ms, 0);
  const prevWeekMs = getLastNDaysMs(7, 7).reduce((s, d) => s + d.ms, 0);
  const maxDayMs = Math.max(...last7Days.map(d => d.ms), 1);
  let trendHtml = '';
  if (prevWeekMs > 0) {
    const change = Math.round(((weekMs - prevWeekMs) / prevWeekMs) * 100);
    trendHtml = `<span class="rd-trend ${change >= 0 ? 'is-up' : 'is-down'}">${change >= 0 ? '+' : ''}${change}%</span>`;
  }

  const maxVisitedTime = Math.max(0, ...withStats.map(d => d.lastVisitedTime));

  const domainsToDisplay = withStats
    .filter(d => roadmapFilter === 'all' || d.pct < 100)
    .sort((a, b) => b.lastVisitedTime - a.lastVisitedTime);

  const phaseDefs = [
    { title: 'Nền tảng & Cấu trúc', hint: 'Tư duy giải thuật & cấu trúc dữ liệu cốt lõi', ids: ['algorithms'] },
    { title: 'Phát triển Chuyên môn', hint: 'Backend, Mobile & lưu trữ dữ liệu', ids: ['backend', 'android', 'database'] },
    { title: 'Kiến trúc & Triển khai', hint: 'System Design & vận hành hạ tầng', ids: ['system-design', 'devops'] },
  ];
  const phases = phaseDefs.map((phase, idx) => {
    const items = phase.ids.map(id => withStats.find(d => d.id === id)).filter(Boolean);
    const avgPct = items.length ? Math.round(items.reduce((s, d) => s + d.pct, 0) / items.length) : 0;
    return { ...phase, index: idx, items, avgPct };
  });
  const activePhaseIdx = phases.findIndex(p => p.avgPct < 100);

  const featured = domainsToDisplay[0];
  const otherDomains = domainsToDisplay.slice(1);

  const featuredHtml = featured ? `
    <div class="bento-card-featured laser-beam-card rd-path-card" data-color="${featured.color}">
      <div class="laser-beam-inner">
        <div class="rd-path-top">
          <span class="rd-badge is-popular pulse-glow">⚡ TIÊU ĐIỂM HỌC TẬP</span>
          <span class="rd-path-meta"><span class="rd-icon">${ROADMAP_ICONS.clock}</span>${featured.modules.length} module · ${featured.visitedCount}/${featured.availableCount} chủ đề</span>
        </div>
        <div style="display:flex;align-items:center;gap:14px;margin-bottom:8px;">
          <div style="width:40px;height:40px;color:var(--accent-sky);flex-shrink:0;">${DOMAIN_ICONS[featured.icon] || DOMAIN_ICONS.backend}</div>
          <div>
            <h3 class="rd-path-title" style="margin:0;font-size:22px;">${featured.name}</h3>
            <p class="rd-path-desc" style="margin:0;font-size:13px;">${featured.description}</p>
          </div>
        </div>

        <div class="featured-topics-preview">
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px;">Chủ đề trọng tâm:</div>
          ${featured.modules.flatMap(m => m.topics).slice(0, 3).map(t => `
            <div class="preview-topic-row" onclick="openTopic('${t.id}')">
              <span class="preview-topic-title">› ${t.title}</span>
              <span style="font-size:11px;color:var(--accent-sky);font-weight:600;">Học ngay ↗</span>
            </div>
          `).join('')}
        </div>

        <div class="rd-path-progress">
          <div class="rd-path-progress-head">
            <span>${featured.stageLabel}</span>
            <span class="rd-path-progress-pct">${featured.pct}%</span>
          </div>
          <div class="rd-progress-track"><div class="rd-progress-fill" style="width:${featured.pct}%"></div></div>
        </div>

        <div class="rd-path-actions" style="margin-top:10px;">
          ${featured.continueId ? `<button class="rd-btn-primary" onclick="openTopic('${featured.continueId}')">${ROADMAP_ICONS.play}<span>${featured.continueLabel}</span><span class="btn-icon-bubble" style="width:20px;height:20px;border-radius:50%;background:rgba(0,0,0,0.15);display:inline-flex;align-items:center;justify-content:center;margin-left:4px;">↗</span></button>` : ''}
          <button class="rd-btn-ghost" onclick="showDomain('${featured.id}')">Khám phá toàn bộ ${ROADMAP_ICONS.arrowRight}</button>
        </div>
      </div>
    </div>
  ` : '';

  const otherCardsHtml = otherDomains.map((d, idx) => {
    const isCompact = idx === 0;
    const badge = d.pct >= 100 ? { text: 'HOÀN THÀNH', cls: 'is-done' } : (d.availableCount === 0 ? { text: 'SẮP RA MẮT', cls: '' } : null);
    return `
    <div class="${isCompact ? 'bento-card-compact' : 'bento-card-standard'} bezel-shell rd-path-card" data-color="${d.color}">
      <div class="rd-path-pattern">${DOMAIN_ICONS[d.icon] || DOMAIN_ICONS.backend}</div>
      <div class="rd-path-top">
        ${badge ? `<span class="rd-badge ${badge.cls}">${badge.text}</span>` : '<span></span>'}
        <span class="rd-path-meta"><span class="rd-icon">${ROADMAP_ICONS.clock}</span>${d.modules.length} mod · ${d.visitedCount}/${d.availableCount} bài</span>
      </div>
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
        <div style="width:28px;height:28px;color:var(--accent-sky);flex-shrink:0;">${DOMAIN_ICONS[d.icon] || DOMAIN_ICONS.backend}</div>
        <h3 class="rd-path-title" style="font-size:18px;margin:0;">${d.name}</h3>
      </div>
      <p class="rd-path-desc" style="font-size:12.5px;margin-bottom:12px;">${d.description}</p>
      <div class="rd-path-tags">
        ${d.modules.slice(0, 2).map(m => `<span class="rd-tag-chip">${m.name}</span>`).join('')}
      </div>
      <div class="rd-path-progress">
        <div class="rd-path-progress-head">
          <span>${d.stageLabel}</span>
          <span class="rd-path-progress-pct">${d.pct}%</span>
        </div>
        <div class="rd-progress-track"><div class="rd-progress-fill" style="width:${d.pct}%"></div></div>
      </div>
      <div class="rd-path-actions">
        ${d.continueId ? `<button class="rd-btn-primary" onclick="openTopic('${d.continueId}')" style="padding:6px 10px;font-size:11.5px;">${ROADMAP_ICONS.play}<span>Tiếp tục</span></button>` : ''}
        <button class="rd-btn-ghost" onclick="showDomain('${d.id}')" style="padding:6px 10px;font-size:11.5px;">Xem ${ROADMAP_ICONS.arrowRight}</button>
      </div>
    </div>
  `;
  }).join('');

  document.getElementById('main').innerHTML = `
    <div class="rd-page fade-in">
      <div class="rd-topbar">
        <div>
          <div class="rd-eyebrow">${ROADMAP_ICONS.compass}HỆ ĐIỀU HÀNH TRI THỨC IT</div>
          <h1 class="rd-title">Lộ trình học tập</h1>
          <p class="rd-subtitle">Chinh phục các kỹ năng công nghệ thông tin qua lộ trình được tổ chức theo Domain → Module → Topic. Tiến độ dưới đây phản ánh đúng những gì bạn đã thực sự học trên trình duyệt này.</p>
        </div>
        <div class="rd-actions">
          <button class="rd-btn-ghost ${roadmapFilter === 'in-progress' ? 'is-active' : ''}" onclick="toggleRoadmapFilter()">
            ${ROADMAP_ICONS.filter} ${roadmapFilter === 'in-progress' ? 'Đang học' : 'Bộ lọc'}
          </button>
          <button class="rd-btn-primary" onclick="document.getElementById('rd-paths').scrollIntoView({behavior:'smooth'})">
            ${ROADMAP_ICONS.compass} <span>Khám phá lộ trình</span>
          </button>
        </div>
      </div>

      <div class="rd-stats">
        <div class="rd-stat-card">
          <div class="rd-stat-head"><span>Tổng tiến độ học tập</span><span class="rd-stat-icon">${ROADMAP_ICONS.trending}</span></div>
          <div class="rd-stat-value">${overallPct}<span class="rd-stat-unit">%</span></div>
          <div class="rd-stat-caption">${totalVisited}/${totalAvailable} chủ đề đã học</div>
          <div class="rd-progress-track"><div class="rd-progress-fill" style="width:${overallPct}%"></div></div>
        </div>
        <div class="rd-stat-card">
          <div class="rd-stat-head"><span>Chủ đề đã hoàn thành</span><span class="rd-stat-icon">${ROADMAP_ICONS.award}</span></div>
          <div class="rd-stat-value">${totalVisited}<span class="rd-stat-unit">/${totalAvailable}</span></div>
          <div class="rd-stat-caption">${totalTopics - totalAvailable} chủ đề khác đang được biên soạn · ${totalModules} module</div>
        </div>
        <div class="rd-stat-card">
          <div class="rd-stat-head"><span>Thời gian học trong tuần</span><span class="rd-stat-icon">${ROADMAP_ICONS.clock}</span></div>
          <div class="rd-stat-value">${formatStudyDuration(weekMs)}${trendHtml}</div>
          <div class="rd-mini-bars">
            ${last7Days.map(d => `<span class="rd-mini-bar" style="height:${Math.max(8, Math.round((d.ms / maxDayMs) * 100))}%" title="${d.key}: ${formatStudyDuration(d.ms)}"></span>`).join('')}
          </div>
        </div>
      </div>

      <div class="rd-section-head" id="rd-paths">
        <h2>${ROADMAP_ICONS.compass}Asymmetric Bento Learning Atlas</h2>
      </div>
      <div class="bento-grid">
        ${featuredHtml}
        ${otherCardsHtml}
      </div>

      <div class="rd-section-head">
        <h2>${ROADMAP_ICONS.layers}Chi tiết lộ trình học chuẩn</h2>
      </div>
      <div class="rd-timeline">
        ${phases.map((phase, i) => {
          const state = i < activePhaseIdx || phase.avgPct >= 100 ? 'done' : (i === activePhaseIdx ? 'active' : 'upcoming');
          return `
          <div class="rd-phase rd-phase--${state}">
            <div class="rd-phase-marker">
              <span class="rd-phase-dot ${state === 'active' ? 'pulse-glow' : ''}">${state === 'done' ? ROADMAP_ICONS.check : String(i + 1).padStart(2, '0')}</span>
              ${i < phases.length - 1 ? '<span class="rd-phase-line"></span>' : ''}
            </div>
            <div class="rd-phase-body">
              <div class="rd-phase-eyebrow">GIAI ĐOẠN ${String(i + 1).padStart(2, '0')} · ${phase.avgPct}%</div>
              <h3 class="rd-phase-title">${phase.title}</h3>
              <p class="rd-phase-hint">${phase.hint}</p>
              <div class="rd-phase-items">
                ${phase.items.map(d => `
                  <button class="rd-phase-item" onclick="showDomain('${d.id}')">
                    <span class="rd-phase-item-icon">${d.pct >= 100 ? ROADMAP_ICONS.check : ''}</span>
                    ${d.name}
                    <span class="rd-phase-item-pct">${d.pct}%</span>
                  </button>
                `).join('')}
              </div>
            </div>
          </div>
        `;
        }).join('')}
      </div>
    </div>
  `;
}

// ── Graph View 2.0 (Interactive Canvas Force-Directed Engine) ────
let kgState = null;

const KG_COLOR_MAP = {
  blue: '#38BDF8',
  purple: '#A78BFA',
  green: '#34D399',
  orange: '#FB923C',
  pink: '#F472B6',
  teal: '#2DD4BF',
  violet: '#A78BFA',
  sky: '#38BDF8',
  emerald: '#34D399',
  amber: '#FBBF24',
  rose: '#FB7185',
  fuchsia: '#E879F9'
};

function getDomainColor(domainId) {
  const domain = KNOWLEDGE_DATA.domains.find(d => d.id === domainId);
  if (!domain) return '#38BDF8';
  return KG_COLOR_MAP[domain.color] || '#38BDF8';
}

function buildGraphData() {
  const rawNodes = [];
  const rawLinks = [];
  const degreeMap = {};

  // 1. Domains
  KNOWLEDGE_DATA.domains.forEach(domain => {
    const col = KG_COLOR_MAP[domain.color] || '#38BDF8';
    rawNodes.push({
      id: `domain-${domain.id}`,
      originalId: domain.id,
      label: domain.name,
      type: 'domain',
      domainId: domain.id,
      color: col,
      icon: domain.icon,
      summary: domain.description,
      status: 'ready',
      radius: 26
    });

    // 2. Modules
    domain.modules.forEach(mod => {
      rawNodes.push({
        id: `mod-${mod.id}`,
        originalId: mod.id,
        label: mod.name,
        type: 'module',
        domainId: domain.id,
        color: col,
        summary: `Module thuộc ${domain.name} (${mod.topics.length} bài học)`,
        status: 'ready',
        radius: 15
      });

      rawLinks.push({
        source: `domain-${domain.id}`,
        target: `mod-${mod.id}`,
        type: 'hierarchy-domain',
        distance: 85,
        strength: 0.8
      });

      // 3. Topics
      mod.topics.forEach(topic => {
        const content = TOPIC_CONTENT[topic.id];
        const isPublished = topic.status === 'published' || !!content;
        rawNodes.push({
          id: topic.id,
          originalId: topic.id,
          label: topic.title,
          type: 'topic',
          domainId: domain.id,
          moduleId: mod.id,
          moduleName: mod.name,
          domainName: domain.name,
          color: col,
          tags: topic.tags || [],
          status: topic.status || (isPublished ? 'published' : 'draft'),
          summary: content?.summary || `Chủ đề trong module ${mod.name}`,
          readTime: content?.readTime || '5 min',
          prerequisites: content?.prerequisites || [],
          related: content?.related || [],
          hasContent: !!content,
          radius: 9
        });

        rawLinks.push({
          source: `mod-${mod.id}`,
          target: topic.id,
          type: 'hierarchy-module',
          distance: 45,
          strength: 0.6
        });
      });
    });
  });

  // Calculate degrees & connect semantic links (prerequisites & related)
  const nodeMap = new Map(rawNodes.map(n => [n.id, n]));

  Object.entries(TOPIC_CONTENT).forEach(([id, tc]) => {
    if (!nodeMap.has(id)) return;

    // Prerequisites
    (tc.prerequisites || []).forEach(pid => {
      if (nodeMap.has(pid)) {
        rawLinks.push({
          source: pid,
          target: id,
          type: 'prerequisite',
          distance: 70,
          strength: 0.4
        });
        degreeMap[id] = (degreeMap[id] || 0) + 2;
        degreeMap[pid] = (degreeMap[pid] || 0) + 2;
      }
    });

    // Related
    (tc.related || []).forEach(rid => {
      if (nodeMap.has(rid)) {
        // Prevent duplicate reversed related links
        const exists = rawLinks.some(l => (l.source === id && l.target === rid) || (l.source === rid && l.target === id));
        if (!exists) {
          rawLinks.push({
            source: id,
            target: rid,
            type: 'related',
            distance: 95,
            strength: 0.25
          });
          degreeMap[id] = (degreeMap[id] || 0) + 1;
          degreeMap[rid] = (degreeMap[rid] || 0) + 1;
        }
      }
    });
  });

  // Adjust radius based on connectivity degree
  rawNodes.forEach(node => {
    if (node.type === 'topic') {
      const deg = degreeMap[node.id] || 0;
      node.radius = 8 + Math.min(8, deg * 1.2);
    }
  });

  return { nodes: rawNodes, links: rawLinks };
}

function showGraph(focusTopicId = null) {
  currentView = 'graph';
  setActiveNav('navGraph');
  setLayoutMode('content');
  hideToc();
  hideOriginalToggle();

  const container = document.getElementById('main');
  const domainsList = KNOWLEDGE_DATA.domains;

  container.innerHTML = `
    <div class="kg-container fade-in" id="kg-container">
      <!-- Top HUD Control Bar -->
      <div class="kg-hud">
        <div class="kg-hud-left">
          <div class="kg-hud-pills" id="kg-domain-pills">
            <button class="kg-pill active" onclick="kgFilterDomain('all')">Toàn bộ Atlas</button>
            ${domainsList.map(d => `
              <button class="kg-pill" data-domain="${d.id}" onclick="kgFilterDomain('${d.id}')">
                <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${KG_COLOR_MAP[d.color] || '#38BDF8'};"></span>
                ${d.name}
              </button>
            `).join('')}
          </div>

          <div class="kg-hud-search-box">
            <svg class="kg-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input type="text" id="kg-search-input" placeholder="Tìm kiếm node / tag..." oninput="kgSearch(this.value)" autocomplete="off" />
            <button class="kg-search-clear" id="kg-search-clear" onclick="kgClearSearch()">✕</button>
          </div>
        </div>

        <div class="kg-hud-options">
          <button class="kg-hud-btn" id="kg-btn-prereq-only" onclick="kgTogglePrereqs()" title="Chỉ hiện chuỗi kiến thức tiền đề (Prerequisites)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;"><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></svg>
            <span>Tiền đề</span>
          </button>
          <button class="kg-hud-btn" id="kg-btn-modules" onclick="kgToggleModules()" title="Ẩn/Hiện các node Module trung gian">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            <span>Modules</span>
          </button>
        </div>
      </div>

      <!-- Canvas Wrapper -->
      <div class="kg-canvas-wrapper" id="kg-canvas-wrapper">
        <canvas class="kg-canvas" id="kg-canvas"></canvas>
      </div>

      <!-- Floating Controls Dock -->
      <div class="kg-controls-dock">
        <button class="kg-control-btn" onclick="kgZoomIn()" title="Phóng to (+)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
        <button class="kg-control-btn" onclick="kgZoomOut()" title="Thu nhỏ (-)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
        <button class="kg-control-btn" onclick="kgResetZoom()" title="Căn giữa toàn cảnh">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
        <button class="kg-control-btn" id="kg-btn-physics" onclick="kgTogglePhysics()" title="Bật/Dừng mô phỏng vật lý">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
        </button>
        <button class="kg-control-btn" id="kg-btn-fullscreen" onclick="kgToggleFullscreen()" title="Toàn màn hình">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></svg>
        </button>
      </div>

      <!-- Footer Meta & Legend -->
      <div class="kg-footer-meta">
        <div class="kg-stat-badge">
          <span class="kg-stat-dot"></span>
          <span id="kg-stat-counts">Đang tải tri thức...</span>
        </div>
        <div class="kg-legend">
          <div class="kg-legend-item"><span class="kg-legend-dot" style="background:#38BDF8;box-shadow:0 0 6px #38BDF8;"></span> Domain</div>
          <div class="kg-legend-item"><span class="kg-legend-dot" style="background:#A78BFA;"></span> Module</div>
          <div class="kg-legend-item"><span class="kg-legend-dot" style="background:#34D399;"></span> Topic</div>
          <div class="kg-legend-item"><span class="kg-legend-line" style="background:var(--accent-violet);"></span> Tiền đề</div>
          <div class="kg-legend-item"><span class="kg-legend-line" style="background:var(--accent-sky);"></span> Liên quan</div>
        </div>
      </div>

      <!-- Hover Tooltip -->
      <div class="kg-tooltip" id="kg-tooltip"></div>

      <!-- Topic Inspector Drawer -->
      <aside class="kg-drawer" id="kg-drawer">
        <div class="kg-drawer-header">
          <div style="display:flex;align-items:center;gap:8px;">
            <span id="kg-drawer-domain-badge" class="tag" style="font-size:11px;">Domain</span>
            <span id="kg-drawer-status-badge" class="tag" style="font-size:11px;">Ready</span>
          </div>
          <button class="kg-drawer-close" onclick="kgCloseDrawer()" title="Đóng">✕</button>
        </div>
        <div class="kg-drawer-body">
          <h2 class="kg-drawer-title" id="kg-drawer-title">Tên Topic</h2>
          <p style="font-size:13.5px;color:var(--text-secondary);line-height:1.5;" id="kg-drawer-summary">Tóm tắt nội dung...</p>

          <div id="kg-drawer-tags-wrap">
            <div class="kg-drawer-section-title">Tags</div>
            <div class="kg-drawer-chips" id="kg-drawer-tags"></div>
          </div>

          <div id="kg-drawer-prereqs-wrap">
            <div class="kg-drawer-section-title">Kiến thức tiền đề (Prerequisites)</div>
            <div class="kg-drawer-chips" id="kg-drawer-prereqs"></div>
          </div>

          <div id="kg-drawer-related-wrap">
            <div class="kg-drawer-section-title">Chủ đề liên quan (Related)</div>
            <div class="kg-drawer-chips" id="kg-drawer-related"></div>
          </div>
        </div>
        <div class="kg-drawer-footer">
          <button class="kg-btn-open-topic" id="kg-drawer-btn-open" onclick="kgOpenSelectedTopic()">
            <span>Đọc bài học ngay</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:16px;height:16px;"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </div>
      </aside>
    </div>
  `;

  initKnowledgeGraphEngine(focusTopicId);
}

function initKnowledgeGraphEngine(focusTopicId = null) {
  if (typeof d3 === 'undefined') {
    console.error('D3.js is not loaded.');
    return;
  }

  const canvasWrapper = document.getElementById('kg-canvas-wrapper');
  const canvas = document.getElementById('kg-canvas');
  if (!canvas || !canvasWrapper) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;

  let width = canvasWrapper.clientWidth || 900;
  let height = canvasWrapper.clientHeight || 600;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  const rawGraphData = buildGraphData();

  kgState = {
    canvas,
    ctx,
    width,
    height,
    dpr,
    rawNodes: rawGraphData.nodes,
    rawLinks: rawGraphData.links,
    activeNodes: [],
    activeLinks: [],
    nodeMap: new Map(),
    neighborMap: new Map(),
    transform: d3.zoomIdentity,
    zoomBehavior: null,
    simulation: null,
    hoveredNode: null,
    selectedNode: null,
    activeDomain: 'all',
    filterPrereqsOnly: false,
    filterHideModules: false,
    searchQuery: '',
    isPaused: false,
    isFullscreen: false,
    particlePhase: 0,
    animFrameId: null
  };

  // Setup D3 Zoom
  kgState.zoomBehavior = d3.zoom()
    .scaleExtent([0.15, 6])
    .on('zoom', (event) => {
      kgState.transform = event.transform;
      renderKgFrame();
    });

  d3.select(canvas)
    .call(kgState.zoomBehavior)
    .on('dblclick.zoom', null);

  // Setup D3 Drag
  d3.select(canvas).call(
    d3.drag()
      .container(canvas)
      .subject(dragSubject)
      .on('start', dragStarted)
      .on('drag', dragged)
      .on('end', dragEnded)
  );

  // Canvas Mouse Move & Click
  canvas.addEventListener('mousemove', onKgMouseMove);
  canvas.addEventListener('mouseleave', () => {
    if (kgState && kgState.hoveredNode) {
      kgState.hoveredNode = null;
      hideKgTooltip();
      renderKgFrame();
    }
  });

  canvas.addEventListener('click', onKgCanvasClick);
  canvas.addEventListener('dblclick', onKgCanvasDblClick);

  window.addEventListener('resize', onKgResize);

  applyKgFilters();

  if (focusTopicId) {
    setTimeout(() => {
      kgFocusNode(focusTopicId);
    }, 400);
  }
}

function applyKgFilters() {
  if (!kgState) return;

  let nodes = kgState.rawNodes;
  let links = kgState.rawLinks;

  // Domain Filter
  if (kgState.activeDomain !== 'all') {
    nodes = nodes.filter(n => n.domainId === kgState.activeDomain || n.id === `domain-${kgState.activeDomain}`);
  }

  // Hide Modules Filter
  if (kgState.filterHideModules) {
    nodes = nodes.filter(n => n.type !== 'module');
  }

  // Prereqs Only Filter
  if (kgState.filterPrereqsOnly) {
    const prereqNodeIds = new Set();
    links.forEach(l => {
      if (l.type === 'prerequisite') {
        prereqNodeIds.add(typeof l.source === 'object' ? l.source.id : l.source);
        prereqNodeIds.add(typeof l.target === 'object' ? l.target.id : l.target);
      }
    });
    nodes = nodes.filter(n => n.type === 'domain' || prereqNodeIds.has(n.id));
  }

  const validNodeIds = new Set(nodes.map(n => n.id));
  links = links.filter(l => {
    const s = typeof l.source === 'object' ? l.source.id : l.source;
    const t = typeof l.target === 'object' ? l.target.id : l.target;
    return validNodeIds.has(s) && validNodeIds.has(t);
  });

  // Distribute initial positions in wide angular sectors to prevent initial overlap
  const { width, height } = kgState;
  const domainList = KNOWLEDGE_DATA.domains;
  const domainAngleMap = {};
  domainList.forEach((d, idx) => {
    domainAngleMap[d.id] = (idx / domainList.length) * 2 * Math.PI;
  });

  const isAll = kgState.activeDomain === 'all';
  nodes.forEach(n => {
    const baseAngle = domainAngleMap[n.domainId] || (Math.random() * 2 * Math.PI);
    const angleOffset = (Math.random() - 0.5) * 0.7;
    const angle = baseAngle + angleOffset;

    let dist = 100;
    if (n.type === 'domain') dist = isAll ? 320 : 60;
    else if (n.type === 'module') dist = isAll ? 520 : 220;
    else dist = isAll ? 720 + (Math.random() * 120 - 60) : 380 + (Math.random() * 80 - 40);

    n.x = (width / 2) + Math.cos(angle) * dist;
    n.y = (height / 2) + Math.sin(angle) * dist;
  });

  // Rebuild Neighbor Map for fast lookup
  const neighborMap = new Map();
  nodes.forEach(n => neighborMap.set(n.id, new Set()));
  links.forEach(l => {
    const s = typeof l.source === 'object' ? l.source.id : l.source;
    const t = typeof l.target === 'object' ? l.target.id : l.target;
    if (neighborMap.has(s)) neighborMap.get(s).add(t);
    if (neighborMap.has(t)) neighborMap.get(t).add(s);
  });

  kgState.activeNodes = nodes;
  kgState.activeLinks = links;
  kgState.nodeMap = new Map(nodes.map(n => [n.id, n]));
  kgState.neighborMap = neighborMap;

  // Update counts badge
  const countsEl = document.getElementById('kg-stat-counts');
  if (countsEl) {
    const topicCount = nodes.filter(n => n.type === 'topic').length;
    countsEl.textContent = `${topicCount} Topics · ${links.length} Liên kết`;
  }

  initKgSimulation();

  // Auto-fit view after physics starts to stabilize
  setTimeout(() => {
    kgResetZoom();
  }, 350);
}

function initKgSimulation() {
  if (!kgState) return;

  if (kgState.simulation) {
    kgState.simulation.stop();
  }

  const { width, height, activeNodes, activeLinks } = kgState;
  const isAll = kgState.activeDomain === 'all';

  kgState.simulation = d3.forceSimulation(activeNodes)
    .force('charge', d3.forceManyBody()
      .strength(d => {
        if (d.type === 'domain') return isAll ? -4500 : -2600;
        if (d.type === 'module') return isAll ? -1100 : -650;
        return isAll ? -320 : -200;
      })
      .distanceMax(1400)
    )
    .force('link', d3.forceLink(activeLinks).id(d => d.id).distance(l => {
      if (l.type === 'hierarchy-domain') return isAll ? 220 : 160;
      if (l.type === 'hierarchy-module') return isAll ? 110 : 85;
      if (l.type === 'prerequisite') return isAll ? 130 : 95;
      return isAll ? 160 : 120;
    }).strength(l => {
      if (l.type === 'hierarchy-domain') return 0.55;
      if (l.type === 'hierarchy-module') return 0.38;
      return 0.28;
    }))
    .force('collide', d3.forceCollide()
      .radius(d => d.radius + (d.type === 'domain' ? 55 : (d.type === 'module' ? 36 : 24)))
      .iterations(3)
    )
    .force('center', d3.forceCenter(width / 2, height / 2).strength(0.04))
    .force('radial', d3.forceRadial(d => {
      if (d.type === 'domain') return isAll ? 380 : 120;
      if (d.type === 'module') return isAll ? 620 : 260;
      return isAll ? 820 : 400;
    }, width / 2, height / 2).strength(isAll ? 0.035 : 0.025))
    .alphaDecay(0.02)
    .on('tick', renderKgFrame);

  startKgAnimationLoop();
}

function startKgAnimationLoop() {
  if (kgState.animFrameId) cancelAnimationFrame(kgState.animFrameId);

  function loop() {
    kgState.particlePhase = (kgState.particlePhase + 0.015) % 1;
    renderKgFrame();
    kgState.animFrameId = requestAnimationFrame(loop);
  }

  kgState.animFrameId = requestAnimationFrame(loop);
}

function renderKgFrame() {
  if (!kgState || !kgState.ctx) return;

  const { ctx, canvas, width, height, transform, activeNodes, activeLinks, hoveredNode, selectedNode, searchQuery, particlePhase } = kgState;
  const isLight = document.documentElement.classList.contains('theme-light') || document.documentElement.classList.contains('theme-editorial') || document.documentElement.classList.contains('theme-matcha');

  ctx.save();
  ctx.clearRect(0, 0, width, height);

  // Background Grid Matrix
  ctx.save();
  ctx.translate(transform.x % (40 * transform.k), transform.y % (40 * transform.k));
  ctx.strokeStyle = isLight ? 'rgba(0, 0, 0, 0.035)' : 'rgba(255, 255, 255, 0.025)';
  ctx.lineWidth = 1;
  const gridSize = 40 * transform.k;
  if (gridSize > 12) {
    ctx.beginPath();
    for (let x = -gridSize; x <= width + gridSize; x += gridSize) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = -gridSize; y <= height + gridSize; y += gridSize) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();
  }
  ctx.restore();

  // World transform for nodes and links
  ctx.save();
  ctx.translate(transform.x, transform.y);
  ctx.scale(transform.k, transform.k);

  const focusNode = hoveredNode || selectedNode;
  const neighbors = focusNode ? kgState.neighborMap.get(focusNode.id) : null;
  const hasSearch = searchQuery && searchQuery.trim().length > 0;
  const searchLower = hasSearch ? searchQuery.trim().toLowerCase() : '';

  // 1. Draw Links
  activeLinks.forEach(link => {
    const s = link.source;
    const t = link.target;
    if (!s || !t || s.x === undefined || t.x === undefined) return;

    let isHighlighted = false;
    let isDimmed = false;

    if (focusNode) {
      if ((s.id === focusNode.id && neighbors?.has(t.id)) || (t.id === focusNode.id && neighbors?.has(s.id))) {
        isHighlighted = true;
      } else {
        isDimmed = true;
      }
    }

    ctx.save();
    if (isDimmed) {
      ctx.globalAlpha = 0.06;
    } else if (isHighlighted) {
      ctx.globalAlpha = 0.95;
    } else {
      ctx.globalAlpha = isLight ? 0.35 : 0.22;
    }

    // Link styling by type
    if (link.type === 'prerequisite') {
      ctx.strokeStyle = isHighlighted ? '#C084FC' : '#A78BFA';
      ctx.lineWidth = isHighlighted ? 2.5 : 1.5;
      ctx.setLineDash([4, 4]);

      // Draw dashed line
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(t.x, t.y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Flowing Energy Particle along prerequisite path
      if (!isDimmed) {
        const px = s.x + (t.x - s.x) * particlePhase;
        const py = s.y + (t.y - s.y) * particlePhase;
        ctx.fillStyle = '#C084FC';
        ctx.shadowColor = '#C084FC';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(px, py, isHighlighted ? 3 : 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    } else if (link.type === 'related') {
      ctx.strokeStyle = isHighlighted ? '#38BDF8' : (isLight ? '#0284C7' : '#38BDF8');
      ctx.lineWidth = isHighlighted ? 2.2 : 1.2;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(t.x, t.y);
      ctx.stroke();
    } else {
      // Hierarchy links
      ctx.strokeStyle = isLight ? '#94A3B8' : '#334155';
      ctx.lineWidth = link.type === 'hierarchy-domain' ? 1.5 : 0.8;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(t.x, t.y);
      ctx.stroke();
    }
    ctx.restore();
  });

  // 2. Draw Nodes
  activeNodes.forEach(node => {
    if (node.x === undefined || node.y === undefined) return;

    let isHighlighted = false;
    let isDimmed = false;

    if (focusNode) {
      if (node.id === focusNode.id || neighbors?.has(node.id)) {
        isHighlighted = true;
      } else {
        isDimmed = true;
      }
    }

    if (hasSearch) {
      const match = node.label.toLowerCase().includes(searchLower) ||
                    (node.tags && node.tags.some(tg => tg.toLowerCase().includes(searchLower)));
      if (match) {
        isHighlighted = true;
        isDimmed = false;
      } else if (!focusNode) {
        isDimmed = true;
      }
    }

    ctx.save();
    if (isDimmed) {
      ctx.globalAlpha = 0.15;
    } else {
      ctx.globalAlpha = 1.0;
    }

    const r = node.radius;

    // Node Outer Glow / Rings
    if (node.type === 'domain') {
      ctx.strokeStyle = node.color;
      ctx.lineWidth = isHighlighted ? 3 : 1.5;
      ctx.fillStyle = node.color + (isLight ? '25' : '18');

      // Outer pulsating orbital halo
      ctx.beginPath();
      ctx.arc(node.x, node.y, r + (isHighlighted ? 8 : 5), 0, Math.PI * 2);
      ctx.stroke();
      ctx.fill();

      // Inner Core Circle
      ctx.fillStyle = node.color;
      ctx.beginPath();
      ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
      ctx.fill();
    } else if (node.type === 'module') {
      ctx.fillStyle = isLight ? '#FFFFFF' : '#1E293B';
      ctx.strokeStyle = node.color;
      ctx.lineWidth = isHighlighted ? 2.5 : 1.5;

      ctx.beginPath();
      ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Center dot
      ctx.fillStyle = node.color;
      ctx.beginPath();
      ctx.arc(node.x, node.y, r * 0.45, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Topic Node
      const isDraft = node.status === 'draft';
      ctx.fillStyle = isDraft ? (isLight ? '#E2E8F0' : '#1E293B') : (isLight ? '#FFFFFF' : '#0F172A');
      ctx.strokeStyle = node.color;
      ctx.lineWidth = isHighlighted ? 2.5 : 1.2;

      if (isHighlighted) {
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 14;
      }

      ctx.beginPath();
      ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Center core indicator
      ctx.fillStyle = node.color;
      ctx.beginPath();
      ctx.arc(node.x, node.y, isDraft ? r * 0.25 : r * 0.45, 0, Math.PI * 2);
      ctx.fill();
    }

    // Node Labels
    const showLabel = node.type === 'domain' ||
                      (node.type === 'module' && transform.k > 0.55) ||
                      (node.type === 'topic' && (transform.k > 0.95 || isHighlighted));

    if (showLabel) {
      ctx.font = node.type === 'domain'
        ? 'bold 13px Geist, "Plus Jakarta Sans", sans-serif'
        : (node.type === 'module' ? '600 11px Geist, sans-serif' : '500 10.5px Geist, sans-serif');

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const labelY = node.y + r + (node.type === 'domain' ? 14 : 11);
      const labelText = node.label.length > 28 ? node.label.substring(0, 26) + '…' : node.label;

      // Label background pill for ultra readability
      const textWidth = ctx.measureText(labelText).width;
      ctx.fillStyle = isLight ? 'rgba(255, 255, 255, 0.88)' : 'rgba(10, 15, 29, 0.85)';
      ctx.fillRect(node.x - textWidth / 2 - 4, labelY - 7, textWidth + 8, 14);

      ctx.fillStyle = isLight ? '#0F172A' : (isHighlighted ? '#FFFFFF' : '#E2E8F0');
      ctx.fillText(labelText, node.x, labelY);
    }

    ctx.restore();
  });

  ctx.restore(); // Restore world transform
  ctx.restore(); // Restore base transform
}

// ── Interaction Handlers ──────────────────────────────────────────
function dragSubject(event) {
  if (!kgState) return null;
  const [x, y] = kgState.transform.invert([event.x, event.y]);
  const node = findNodeAt(x, y);
  return node || null;
}

function dragStarted(event) {
  if (!event.active && kgState.simulation && !kgState.isPaused) kgState.simulation.alphaTarget(0.3).restart();
  event.subject.fx = event.subject.x;
  event.subject.fy = event.subject.y;
}

function dragged(event) {
  event.subject.fx = event.x;
  event.subject.fy = event.y;
  renderKgFrame();
}

function dragEnded(event) {
  if (!event.active && kgState.simulation && !kgState.isPaused) kgState.simulation.alphaTarget(0);
  event.subject.fx = null;
  event.subject.fy = null;
}

function findNodeAt(worldX, worldY) {
  if (!kgState) return null;
  for (let i = kgState.activeNodes.length - 1; i >= 0; i--) {
    const node = kgState.activeNodes[i];
    const dx = worldX - node.x;
    const dy = worldY - node.y;
    const hitRadius = Math.max(node.radius + 4, 12);
    if (dx * dx + dy * dy <= hitRadius * hitRadius) {
      return node;
    }
  }
  return null;
}

function onKgMouseMove(event) {
  if (!kgState) return;
  const rect = kgState.canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  const [worldX, worldY] = kgState.transform.invert([mouseX, mouseY]);

  const hitNode = findNodeAt(worldX, worldY);

  if (hitNode !== kgState.hoveredNode) {
    kgState.hoveredNode = hitNode;
    renderKgFrame();

    if (hitNode) {
      showKgTooltip(hitNode, event.clientX, event.clientY);
      kgState.canvas.style.cursor = 'pointer';
    } else {
      hideKgTooltip();
      kgState.canvas.style.cursor = 'grab';
    }
  } else if (hitNode) {
    showKgTooltip(hitNode, event.clientX, event.clientY);
  }
}

function onKgCanvasClick(event) {
  if (!kgState) return;
  const rect = kgState.canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  const [worldX, worldY] = kgState.transform.invert([mouseX, mouseY]);

  const hitNode = findNodeAt(worldX, worldY);
  if (hitNode) {
    kgSelectNode(hitNode);
  } else {
    // Click outside deselects
    kgState.selectedNode = null;
    kgCloseDrawer();
    renderKgFrame();
  }
}

function onKgCanvasDblClick(event) {
  if (!kgState) return;
  const rect = kgState.canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  const [worldX, worldY] = kgState.transform.invert([mouseX, mouseY]);

  const hitNode = findNodeAt(worldX, worldY);
  if (hitNode && hitNode.type === 'topic') {
    openTopic(hitNode.id);
  }
}

function onKgResize() {
  if (!kgState || currentView !== 'graph') return;
  const wrapper = document.getElementById('kg-canvas-wrapper');
  if (!wrapper) return;

  kgState.width = wrapper.clientWidth;
  kgState.height = wrapper.clientHeight;
  kgState.canvas.width = kgState.width * kgState.dpr;
  kgState.canvas.height = kgState.height * kgState.dpr;
  kgState.ctx.scale(kgState.dpr, kgState.dpr);

  if (kgState.simulation) {
    kgState.simulation.force('center', d3.forceCenter(kgState.width / 2, kgState.height / 2));
    kgState.simulation.alpha(0.2).restart();
  }
  renderKgFrame();
}

// ── Tooltip & Drawer ──────────────────────────────────────────────
function showKgTooltip(node, clientX, clientY) {
  const tooltip = document.getElementById('kg-tooltip');
  if (!tooltip) return;

  const containerRect = document.getElementById('kg-container').getBoundingClientRect();
  const x = clientX - containerRect.left;
  const y = clientY - containerRect.top;

  tooltip.style.left = `${x}px`;
  tooltip.style.top = `${y}px`;

  let typeBadge = 'Topic';
  if (node.type === 'domain') typeBadge = 'Domain Hub';
  if (node.type === 'module') typeBadge = 'Module Cluster';

  tooltip.innerHTML = `
    <div class="kg-tooltip-title">${escapeHtml(node.label)}</div>
    <div class="kg-tooltip-meta">
      <span style="color:${node.color};font-weight:700;">● ${typeBadge}</span>
      ${node.status ? `<span>· ${node.status}</span>` : ''}
    </div>
    <div class="kg-tooltip-summary">${escapeHtml(node.summary || '')}</div>
  `;
  tooltip.classList.add('visible');
}

function hideKgTooltip() {
  const tooltip = document.getElementById('kg-tooltip');
  if (tooltip) tooltip.classList.remove('visible');
}

function kgSelectNode(node) {
  if (!kgState) return;
  kgState.selectedNode = node;
  renderKgFrame();

  const drawer = document.getElementById('kg-drawer');
  if (!drawer) return;

  document.getElementById('kg-drawer-title').textContent = node.label;
  document.getElementById('kg-drawer-summary').textContent = node.summary || 'Chưa có mô tả chi tiết cho chủ đề này.';

  const domainBadge = document.getElementById('kg-drawer-domain-badge');
  domainBadge.textContent = node.domainName || node.label;
  domainBadge.style.color = node.color;
  domainBadge.style.borderColor = node.color;

  const statusBadge = document.getElementById('kg-drawer-status-badge');
  statusBadge.textContent = node.status || 'ready';

  // Tags
  const tagsWrap = document.getElementById('kg-drawer-tags-wrap');
  const tagsContainer = document.getElementById('kg-drawer-tags');
  if (node.tags && node.tags.length > 0) {
    tagsWrap.style.display = 'block';
    tagsContainer.innerHTML = node.tags.map(t => `<span class="kg-drawer-chip tag">${t}</span>`).join('');
  } else {
    tagsWrap.style.display = 'none';
  }

  // Prerequisites
  const prereqsWrap = document.getElementById('kg-drawer-prereqs-wrap');
  const prereqsContainer = document.getElementById('kg-drawer-prereqs');
  if (node.prerequisites && node.prerequisites.length > 0) {
    prereqsWrap.style.display = 'block';
    prereqsContainer.innerHTML = node.prerequisites.map(pid => {
      const pNode = kgState.rawNodes.find(n => n.id === pid);
      const title = pNode ? pNode.label : pid;
      return `<button class="kg-drawer-chip prereq" onclick="kgFocusNode('${pid}')">➔ ${title}</button>`;
    }).join('');
  } else {
    prereqsWrap.style.display = 'none';
  }

  // Related
  const relatedWrap = document.getElementById('kg-drawer-related-wrap');
  const relatedContainer = document.getElementById('kg-drawer-related');
  if (node.related && node.related.length > 0) {
    relatedWrap.style.display = 'block';
    relatedContainer.innerHTML = node.related.map(rid => {
      const rNode = kgState.rawNodes.find(n => n.id === rid);
      const title = rNode ? rNode.label : rid;
      return `<button class="kg-drawer-chip related" onclick="kgFocusNode('${rid}')">✦ ${title}</button>`;
    }).join('');
  } else {
    relatedWrap.style.display = 'none';
  }

  // Open button state
  const btnOpen = document.getElementById('kg-drawer-btn-open');
  if (node.type === 'topic') {
    btnOpen.style.display = 'flex';
    btnOpen.onclick = () => openTopic(node.id);
  } else {
    btnOpen.style.display = 'none';
  }

  drawer.classList.add('open');
}

window.kgCloseDrawer = function() {
  const drawer = document.getElementById('kg-drawer');
  if (drawer) drawer.classList.remove('open');
  if (kgState) {
    kgState.selectedNode = null;
    renderKgFrame();
  }
};

window.kgOpenSelectedTopic = function() {
  if (kgState && kgState.selectedNode && kgState.selectedNode.type === 'topic') {
    openTopic(kgState.selectedNode.id);
  }
};

window.kgFocusNode = function(nodeId) {
  if (!kgState) return;
  const node = kgState.rawNodes.find(n => n.id === nodeId);
  if (!node) return;

  // Make sure domain filter matches or reset to all
  if (kgState.activeDomain !== 'all' && node.domainId !== kgState.activeDomain) {
    kgFilterDomain('all');
  }

  kgSelectNode(node);

  // Smooth Zoom Pan to node
  const canvasWrapper = document.getElementById('kg-canvas-wrapper');
  if (!canvasWrapper) return;

  const w = canvasWrapper.clientWidth;
  const h = canvasWrapper.clientHeight;
  const targetK = 1.6;
  const targetX = w / 2 - node.x * targetK;
  const targetY = h / 2 - node.y * targetK;

  d3.select(kgState.canvas)
    .transition()
    .duration(750)
    .call(
      kgState.zoomBehavior.transform,
      d3.zoomIdentity.translate(targetX, targetY).scale(targetK)
    );
};

// ── HUD & Dock Actions ────────────────────────────────────────────
window.kgFilterDomain = function(domainId) {
  if (!kgState) return;
  kgState.activeDomain = domainId;

  document.querySelectorAll('#kg-domain-pills .kg-pill').forEach(pill => {
    if (domainId === 'all' && !pill.dataset.domain) {
      pill.classList.add('active');
    } else if (pill.dataset.domain === domainId) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });

  applyKgFilters();
  kgResetZoom();
};

window.kgTogglePrereqs = function() {
  if (!kgState) return;
  kgState.filterPrereqsOnly = !kgState.filterPrereqsOnly;
  document.getElementById('kg-btn-prereq-only')?.classList.toggle('active', kgState.filterPrereqsOnly);
  applyKgFilters();
};

window.kgToggleModules = function() {
  if (!kgState) return;
  kgState.filterHideModules = !kgState.filterHideModules;
  document.getElementById('kg-btn-modules')?.classList.toggle('active', !kgState.filterHideModules);
  applyKgFilters();
};

window.kgSearch = function(query) {
  if (!kgState) return;
  kgState.searchQuery = query;
  const clearBtn = document.getElementById('kg-search-clear');
  if (clearBtn) clearBtn.classList.toggle('visible', !!query);

  if (query && query.trim().length > 1) {
    const q = query.trim().toLowerCase();
    const match = kgState.activeNodes.find(n => n.label.toLowerCase().includes(q));
    if (match) {
      kgState.hoveredNode = match;
    }
  } else {
    kgState.hoveredNode = null;
  }
  renderKgFrame();
};

window.kgClearSearch = function() {
  const input = document.getElementById('kg-search-input');
  if (input) input.value = '';
  kgSearch('');
};

window.kgZoomIn = function() {
  if (!kgState) return;
  d3.select(kgState.canvas).transition().duration(300).call(kgState.zoomBehavior.scaleBy, 1.35);
};

window.kgZoomOut = function() {
  if (!kgState) return;
  d3.select(kgState.canvas).transition().duration(300).call(kgState.zoomBehavior.scaleBy, 0.75);
};

window.kgResetZoom = function() {
  if (!kgState || !kgState.canvas) return;
  const canvasWrapper = document.getElementById('kg-canvas-wrapper');
  if (!canvasWrapper) return;
  const w = canvasWrapper.clientWidth;
  const h = canvasWrapper.clientHeight;

  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  let count = 0;
  kgState.activeNodes.forEach(n => {
    if (n.x !== undefined && n.y !== undefined) {
      if (n.x < minX) minX = n.x;
      if (n.x > maxX) maxX = n.x;
      if (n.y < minY) minY = n.y;
      if (n.y > maxY) maxY = n.y;
      count++;
    }
  });

  if (count > 0 && isFinite(minX)) {
    const padding = 100;
    const graphWidth = (maxX - minX) + padding * 2;
    const graphHeight = (maxY - minY) + padding * 2;
    const graphCenterX = (minX + maxX) / 2;
    const graphCenterY = (minY + maxY) / 2;

    const scale = Math.min(1.0, Math.max(0.18, Math.min(w / graphWidth, h / graphHeight)));
    const targetX = w / 2 - graphCenterX * scale;
    const targetY = h / 2 - graphCenterY * scale;

    d3.select(kgState.canvas)
      .transition()
      .duration(700)
      .call(
        kgState.zoomBehavior.transform,
        d3.zoomIdentity.translate(targetX, targetY).scale(scale)
      );
  } else {
    d3.select(kgState.canvas)
      .transition()
      .duration(600)
      .call(
        kgState.zoomBehavior.transform,
        d3.zoomIdentity.translate(w / 2, h / 2).scale(0.7).translate(-w / 2, -h / 2)
      );
  }
};

window.kgTogglePhysics = function() {
  if (!kgState) return;
  kgState.isPaused = !kgState.isPaused;
  const btn = document.getElementById('kg-btn-physics');
  if (btn) btn.classList.toggle('active', kgState.isPaused);

  if (kgState.isPaused) {
    kgState.simulation.stop();
  } else {
    kgState.simulation.alpha(0.3).restart();
  }
};

window.kgToggleFullscreen = function() {
  const container = document.getElementById('kg-container');
  if (!container) return;
  const isFull = container.classList.toggle('fullscreen');
  document.getElementById('kg-btn-fullscreen')?.classList.toggle('active', isFull);
  setTimeout(onKgResize, 100);
};




// ── Nav helpers ───────────────────────────────────────────────────
function setActiveNav(id) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  if (id) document.getElementById(id)?.classList.add('active');
}

// ── Search ────────────────────────────────────────────────────────
const searchInput = document.getElementById('searchInput');
const searchOverlay = document.getElementById('searchOverlay');

const allTopics = [];
KNOWLEDGE_DATA.domains.forEach(domain => {
  domain.modules.forEach(mod => {
    mod.topics.forEach(topic => {
      allTopics.push({ ...topic, domainName: domain.name, domainIcon: domain.icon, modName: mod.name });
    });
  });
});

searchInput.addEventListener('input', e => {
  const q = e.target.value.trim().toLowerCase();
  if (!q) { searchOverlay.classList.remove('visible'); return; }

  const results = allTopics.filter(t =>
    t.title.toLowerCase().includes(q) ||
    t.tags.some(tag => tag.includes(q)) ||
    t.domainName.toLowerCase().includes(q) ||
    t.modName.toLowerCase().includes(q)
  ).slice(0, 8);

  // Catalog LeetCode: bài free chưa có bài học trong repo
  const catalogResults = LC_CATALOG.enabled ? LC_CATALOG.problems
    .filter(p => !LC_CATALOG.lessonByProblemId[p.id])
    .filter(p =>
      p.title.toLowerCase().includes(q) ||
      String(p.id) === q ||
      p.topicTags.some(tag => tag.includes(q))
    ).slice(0, 6) : [];

  if (!results.length && !catalogResults.length) {
    searchOverlay.innerHTML = `<div style="padding:20px;text-align:center;color:var(--text-muted);font-size:14px;">Không tìm thấy kết quả cho "<strong>${escapeHtml(q)}</strong>"</div>`;
  } else {
    const lessonHtml = results.map(r => `
      <div class="search-result" onclick="openTopicFromSearch('${r.id}')">
        <div class="search-result-icon">${DOMAIN_ICONS[r.domainIcon] || `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`}</div>
        <div class="search-result-info">
          <div class="search-result-topic">${highlight(r.title, q)}</div>
          <div class="search-result-path">${r.domainName} › ${r.modName}</div>
        </div>
        <span class="tag" style="font-size:10px;">${r.status}</span>
      </div>
    `).join('');
    const catalogHtml = catalogResults.length ? `
      <div style="padding:8px 16px 4px 16px;font-size:10.5px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;">Catalog LeetCode — chưa có bài học</div>
      ${catalogResults.map(p => `
        <div class="search-result" onclick="openLcExternalById(${p.id})">
          <div class="search-result-icon" style="color:#FFA116;">↗</div>
          <div class="search-result-info">
            <div class="search-result-topic">${p.id}. ${highlight(p.title, q)}</div>
            <div class="search-result-path">${p.topicTags.slice(0, 3).join(' • ')}</div>
          </div>
          <span class="lc-premium-pill lc-premium-${p.difficulty.toLowerCase()}" style="font-size:10px;">${p.difficulty}</span>
        </div>
      `).join('')}` : '';
    searchOverlay.innerHTML = lessonHtml + catalogHtml;
  }

  searchOverlay.classList.add('visible');
});

function openTopicFromSearch(id) {
  searchInput.value = '';
  searchOverlay.classList.remove('visible');
  openTopic(id);
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function highlight(text, query) {
  if (!query) return escapeHtml(text);
  const escapedQuery = escapeRegExp(query);
  const re = new RegExp(`(${escapedQuery})`, 'gi');
  return escapeHtml(text).replace(re, '<mark style="background:rgba(124,58,237,.15);color:var(--accent-violet);border-radius:2px;padding:0 2px;">$1</mark>');
}

document.addEventListener('click', e => {
  if (!e.target.closest('.header-search') && !e.target.closest('.search-overlay')) {
    searchOverlay.classList.remove('visible');
  }
});

searchInput.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    searchOverlay.classList.remove('visible');
    searchInput.blur();
  }
});

// Keyboard shortcut
document.addEventListener('keydown', e => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    searchInput.focus();
    searchInput.select();
  }
});

// Code Tab Switcher — ưu tiên java > kotlin > swift > dart cho DSA
// Tạm thời ẩn các ngôn ngữ không dùng — chỉ giữ Java, Kotlin, Swift, Dart, C++
const DSA_VISIBLE_LANGS = ['java', 'kotlin', 'swift', 'dart', 'cpp'];
const DSA_PREFERRED_LANGS = ['java', 'kotlin', 'swift', 'dart'];
const DSA_LANG_STORAGE_KEY = 'kos-dsa-lang';
function switchCodeTab(event, lang) {
  event.preventDefault();
  event.stopPropagation();
  const tabContainer = event.target.closest('.code-tabs');
  if (!tabContainer) return;
  try { localStorage.setItem(DSA_LANG_STORAGE_KEY, lang); } catch (e) {}
  // Update buttons
  tabContainer.querySelectorAll('.code-tab-btn').forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  // Update contents
  tabContainer.querySelectorAll('.code-tab-content').forEach(content => {
    if (content.getAttribute('data-lang') === lang) {
      content.classList.add('active');
    } else {
      content.classList.remove('active');
    }
  });
}
function getPreferredDsaLang() {
  try {
    const saved = localStorage.getItem(DSA_LANG_STORAGE_KEY);
    if (saved) return saved;
  } catch (e) {}
  return DSA_PREFERRED_LANGS[0];
}
function applyPreferredDsaLang() {
  const preferred = getPreferredDsaLang();
  document.querySelectorAll('.code-tabs').forEach(container => {
    const allBtns = Array.from(container.querySelectorAll('.code-tab-btn'));
    const allContents = Array.from(container.querySelectorAll('.code-tab-content'));
    const visibleLangs = allBtns
      .map(b => b.getAttribute('data-lang'))
      .filter(lang => DSA_VISIBLE_LANGS.includes(lang));
    // Nếu nhóm không có ngôn ngữ nào trong danh sách hiển thị thì giữ nguyên nhóm
    if (visibleLangs.length > 0) {
      allBtns.forEach(btn => {
        btn.style.display = DSA_VISIBLE_LANGS.includes(btn.getAttribute('data-lang')) ? '' : 'none';
      });
      allContents.forEach(content => {
        content.style.display = DSA_VISIBLE_LANGS.includes(content.getAttribute('data-lang')) ? '' : 'none';
      });
    }
    const available = Array.from(container.querySelectorAll('.code-tab-btn'))
      .filter(b => b.style.display !== 'none')
      .map(b => b.getAttribute('data-lang'));
    let target = null;
    if (available.includes(preferred)) {
      target = preferred;
    } else {
      for (const lang of DSA_PREFERRED_LANGS) {
        if (available.includes(lang)) { target = lang; break; }
      }
    }
    if (!target && available.length > 0) target = available[0];
    if (!target) return;
    container.querySelectorAll('.code-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === target);
    });
    container.querySelectorAll('.code-tab-content').forEach(content => {
      content.classList.toggle('active', content.getAttribute('data-lang') === target);
    });
  });
}

// Mouse Glow Hover Effect for Domain Cards
document.addEventListener('mousemove', e => {
  const card = e.target.closest('.domain-card');
  if (card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  }
});

// ==================================================================
// ── Interactive Widgets Logic for Chapter 1 ────────────────────────
// ==================================================================

// Tab switcher for interactive widgets
function switchIntroTab(event, wrapperId, tabId) {
  event.preventDefault();
  event.stopPropagation();
  const wrapper = document.getElementById(wrapperId);
  if (!wrapper) return;
  
  // Update tab buttons
  wrapper.querySelectorAll('.widget-tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.currentTarget.classList.add('active');
  
  // Update tab contents
  wrapper.querySelectorAll('.widget-tab-content').forEach(content => {
    if (content.getAttribute('data-tab') === tabId) {
      content.classList.add('active');
    } else {
      content.classList.remove('active');
    }
  });
}
window.switchIntroTab = switchIntroTab;

// Simple Slider for images
function prevSlide(wrapperId) {
  const wrapper = document.getElementById(wrapperId);
  if (!wrapper) return;
  const slides = wrapper.querySelectorAll('.slide');
  let activeIndex = Array.from(slides).findIndex(s => s.classList.contains('active'));
  if (activeIndex === -1) return;
  
  slides[activeIndex].classList.remove('active');
  let prevIndex = (activeIndex - 1 + slides.length) % slides.length;
  slides[prevIndex].classList.add('active');
  
  wrapper.querySelector('.slider-indicator').textContent = `Bước ${prevIndex + 1} / ${slides.length}`;
}
window.prevSlide = prevSlide;

function nextSlide(wrapperId) {
  const wrapper = document.getElementById(wrapperId);
  if (!wrapper) return;
  const slides = wrapper.querySelectorAll('.slide');
  let activeIndex = Array.from(slides).findIndex(s => s.classList.contains('active'));
  if (activeIndex === -1) return;
  
  slides[activeIndex].classList.remove('active');
  let nextIndex = (activeIndex + 1) % slides.length;
  slides[nextIndex].classList.add('active');
  
  wrapper.querySelector('.slider-indicator').textContent = `Bước ${nextIndex + 1} / ${slides.length}`;
}
window.nextSlide = nextSlide;

// --- Binary Search Simulator ---
let bsState = {
  letters: ['A', 'C', 'E', 'G', 'I', 'K', 'M', 'O', 'Q', 'S', 'U', 'W', 'Y'],
  target: 'R',
  low: 0,
  high: 12,
  mid: -1,
  stepCount: 0,
  history: [],
  done: false
};

function initBinarySearchDemo() {
  const targetEl = document.getElementById('bs-target-char');
  if (targetEl) bsState.target = targetEl.textContent.trim();
  
  bsState.low = 0;
  bsState.high = bsState.letters.length - 1;
  bsState.mid = -1;
  bsState.stepCount = 0;
  bsState.history = [];
  bsState.done = false;
  
  // Enable/disable buttons
  const btnNext = document.getElementById('bs-btn-next');
  const btnPrev = document.getElementById('bs-btn-prev');
  if (btnNext) { btnNext.disabled = false; btnNext.textContent = 'Chia đôi tiếp theo ▶'; }
  if (btnPrev) btnPrev.disabled = true;
  
  renderBsLetters();
  
  const statusEl = document.getElementById('bs-status-text');
  if (statusEl) statusEl.textContent = 'Nhấp "Chia đôi tiếp theo" để bắt đầu tìm kiếm nhị phân.';
}
window.initBinarySearchDemo = initBinarySearchDemo;

function renderBsLetters() {
  const container = document.getElementById('bs-letters-container');
  if (!container) return;
  
  container.innerHTML = bsState.letters.map((char, index) => {
    let classes = ['letter-block'];
    if (index < bsState.low || index > bsState.high) {
      classes.push('muted');
    }
    if (index === bsState.mid) {
      classes.push('active-mid');
    }
    if (bsState.done && char === bsState.target && index === bsState.mid) {
      classes.push('found');
    }
    
    let labels = '';
    if (index === bsState.low && !bsState.done) labels += '<span class="pointer low-ptr">Low</span>';
    if (index === bsState.high && !bsState.done) labels += '<span class="pointer high-ptr">High</span>';
    if (index === bsState.mid && !bsState.done) labels += '<span class="pointer mid-ptr">Mid</span>';
    
    return `<div class="${classes.join(' ')}">
      <span class="letter-char">${char}</span>
      ${labels}
    </div>`;
  }).join('');
}

function stepBinarySearchDemo(action) {
  if (action === 'prev') {
    if (bsState.history.length === 0) return;
    const prevState = bsState.history.pop();
    bsState.low = prevState.low;
    bsState.high = prevState.high;
    bsState.mid = prevState.mid;
    bsState.done = prevState.done;
    bsState.stepCount--;
    
    const btnNext = document.getElementById('bs-btn-next');
    if (btnNext) { btnNext.disabled = false; btnNext.textContent = 'Chia đôi tiếp theo ▶'; }
    if (bsState.history.length === 0) {
      const btnPrev = document.getElementById('bs-btn-prev');
      if (btnPrev) btnPrev.disabled = true;
    }
    
    renderBsLetters();
    updateBsStatusText();
    return;
  }
  
  // Save history
  bsState.history.push({
    low: bsState.low,
    high: bsState.high,
    mid: bsState.mid,
    done: bsState.done
  });
  
  const btnPrev = document.getElementById('bs-btn-prev');
  if (btnPrev) btnPrev.disabled = false;
  
  if (bsState.low > bsState.high) {
    bsState.done = true;
    updateBsStatusText();
    return;
  }
  
  bsState.stepCount++;
  bsState.mid = Math.floor((bsState.low + bsState.high) / 2);
  let midChar = bsState.letters[bsState.mid];
  
  renderBsLetters();
  
  if (midChar === bsState.target) {
    bsState.done = true;
    renderBsLetters();
    updateBsStatusText();
    const btnNext = document.getElementById('bs-btn-next');
    if (btnNext) btnNext.disabled = true;
    return;
  }
  
  if (midChar < bsState.target) {
    bsState.low = bsState.mid + 1;
  } else {
    bsState.high = bsState.mid - 1;
  }
  
  updateBsStatusText();
}
window.stepBinarySearchDemo = stepBinarySearchDemo;

function updateBsStatusText() {
  const statusEl = document.getElementById('bs-status-text');
  if (!statusEl) return;
  
  if (bsState.done) {
    statusEl.innerHTML = `<span style="color: var(--accent-emerald); font-weight: 600;">🎉 Đã tìm thấy chữ ${bsState.target} tại vị trí Mid = ${bsState.mid} sau ${bsState.stepCount} bước!</span>`;
    return;
  }
  
  let midChar = bsState.letters[bsState.mid];
  statusEl.innerHTML = `Bước ${bsState.stepCount}: So sánh chữ ở giữa <strong>${midChar}</strong> với mục tiêu <strong>${bsState.target}</strong>.<br>` + 
    (midChar < bsState.target 
      ? `Vì <strong>${bsState.target} đứng sau ${midChar}</strong>, thu hẹp phạm vi sang nửa sau (Low = ${bsState.mid + 1}).`
      : `Vì <strong>${bsState.target} đứng trước ${midChar}</strong>, thu hẹp phạm vi sang nửa trước (High = ${bsState.mid - 1}).`);
}

// --- Insertion Sort Simulator ---
let isState = {
  original: [5, 2, 9, 1, 6],
  array: [5, 2, 9, 1, 6],
  i: 1,
  j: 0,
  key: -1,
  phase: 'select_key',
  stepCount: 0
};

function initInsertionSortDemo() {
  isState.array = [...isState.original];
  isState.i = 1;
  isState.j = 0;
  isState.key = -1;
  isState.phase = 'select_key';
  isState.stepCount = 0;
  
  const btnStep = document.getElementById('is-btn-step');
  if (btnStep) { btnStep.disabled = false; btnStep.textContent = 'Rút và chèn quân tiếp theo ▶'; }
  
  renderIsCards();
  const statusEl = document.getElementById('is-status-text');
  if (statusEl) statusEl.textContent = 'Bộ bài ban đầu chưa sắp xếp. Nhấp "Rút và chèn quân tiếp theo" để bắt đầu.';
}
window.initInsertionSortDemo = initInsertionSortDemo;

function renderIsCards() {
  const container = document.getElementById('is-cards-container');
  if (!container) return;
  
  container.innerHTML = isState.array.map((val, idx) => {
    let classes = ['playing-card'];
    if (isState.phase === 'sorted') {
      classes.push('sorted');
    } else {
      if (idx < isState.i) {
        classes.push('ordered');
      } else {
        classes.push('unordered');
      }
      
      if (idx === isState.i && isState.phase === 'select_key') {
        classes.push('active-key');
      }
      if (idx === isState.j && isState.phase === 'compare_shift') {
        classes.push('comparing');
      }
    }
    
    return `<div class="${classes.join(' ')}">
      <div class="card-suit">♠</div>
      <div class="card-value">${val}</div>
    </div>`;
  }).join('');
}

function stepInsertionSortDemo() {
  if (isState.phase === 'sorted') return;
  
  isState.stepCount++;
  
  if (isState.phase === 'select_key') {
    isState.key = isState.array[isState.i];
    isState.j = isState.i - 1;
    isState.phase = 'compare_shift';
    renderIsCards();
    
    const statusEl = document.getElementById('is-status-text');
    if (statusEl) statusEl.innerHTML = `<strong>Rút quân ${isState.key}</strong> (đỏ). Ta so sánh nó với các quân bài đã sắp xếp bên trái: <code>${isState.array.slice(0, isState.i).join(', ')}</code>.`;
    return;
  }
  
  if (isState.phase === 'compare_shift') {
    if (isState.j >= 0 && isState.array[isState.j] > isState.key) {
      isState.array[isState.j + 1] = isState.array[isState.j];
      renderIsCards();
      const statusEl = document.getElementById('is-status-text');
      if (statusEl) statusEl.innerHTML = `Quân <strong>${isState.array[isState.j]}</strong> lớn hơn <strong>${isState.key}</strong>, dịch quân <strong>${isState.array[isState.j]}</strong> sang phải.`;
      isState.j--;
    } else {
      isState.array[isState.j + 1] = isState.key;
      isState.phase = 'inserted';
      renderIsCards();
      const statusEl = document.getElementById('is-status-text');
      if (statusEl) statusEl.innerHTML = `Chèn quân <strong>${isState.key}</strong> vào vị trí thích hợp (sau quân bài nhỏ hơn hoặc ở đầu).`;
    }
    return;
  }
  
  if (isState.phase === 'inserted') {
    isState.i++;
    if (isState.i < isState.array.length) {
      isState.phase = 'select_key';
      renderIsCards();
      const statusEl = document.getElementById('is-status-text');
      if (statusEl) statusEl.innerHTML = `Chuẩn bị rút quân tiếp theo.`;
    } else {
      isState.phase = 'sorted';
      renderIsCards();
      const statusEl = document.getElementById('is-status-text');
      if (statusEl) statusEl.innerHTML = `<span style="color: var(--accent-emerald); font-weight:600;">🎉 Đã sắp xếp xong toàn bộ bộ bài: [${isState.array.join(', ')}]!</span>`;
      const btnStep = document.getElementById('is-btn-step');
      if (btnStep) btnStep.disabled = true;
    }
  }
}
window.stepInsertionSortDemo = stepInsertionSortDemo;

// --- Greedy Change Simulator ---
function runGreedyDemo() {
  const inputEl = document.getElementById('greedy-amount-input');
  const receiptEl = document.getElementById('greedy-result-receipt');
  if (!inputEl || !receiptEl) return;
  
  let amount = parseInt(inputEl.value, 10);
  if (isNaN(amount) || amount < 1 || amount > 99) {
    alert('Vui lòng nhập số tiền từ 1 đến 99 nghìn đồng.');
    return;
  }
  
  const denominations = [
    { value: 50, name: 'Tờ 50.000đ', color: '#10B981' },
    { value: 20, name: 'Tờ 20.000đ', color: '#3B82F6' },
    { value: 10, name: 'Tờ 10.000đ', color: '#F59E0B' },
    { value: 5, name: 'Tờ 5.000đ', color: '#EC4899' },
    { value: 2, name: 'Tờ 2.000đ', color: '#8B5CF6' },
    { value: 1, name: 'Tờ 1.000đ', color: '#6B7280' }
  ];
  
  let tempAmount = amount;
  let results = [];
  
  denominations.forEach(denom => {
    if (tempAmount >= denom.value) {
      let count = Math.floor(tempAmount / denom.value);
      results.push({
        denom: denom,
        count: count,
        subtotal: count * denom.value
      });
      tempAmount -= count * denom.value;
    }
  });
  
  receiptEl.style.display = 'block';
  receiptEl.innerHTML = `
    <div style="font-weight: bold; border-bottom: 1px dashed var(--border); padding-bottom: 8px; margin-bottom: 10px; text-align: center; letter-spacing: 1px; color: var(--text-primary);">
      HÓA ĐƠN THỐI TIỀN LẺ (${amount}.000đ)
    </div>
    <div style="font-size: 13px; color: var(--text-secondary); line-height: 1.8;">
      ${results.map((r, i) => `
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
          <span>Bước ${i+1}: Chọn ${r.count}x <strong style="color: ${r.denom.color};">${r.denom.name}</strong></span>
          <span style="font-family: monospace; font-weight: 600;">-${r.subtotal}.000đ</span>
        </div>
      `).join('')}
    </div>
    <div style="border-top: 1px dashed var(--border); padding-top: 8px; margin-top: 10px; display: flex; justify-content: space-between; font-weight: bold; color: var(--accent-emerald);">
      <span>Tổng số tờ thối:</span>
      <span>${results.reduce((sum, r) => sum + r.count, 0)} tờ</span>
    </div>
    <p style="font-size: 12px; color: var(--text-muted); margin-top: 10px; font-style: italic; text-align: center;">
      (Giải thuật Tham lam luôn chọn tờ tiền lớn nhất có thể để giảm thiểu số tờ phải thối lại)
    </p>
  `;
}
window.runGreedyDemo = runGreedyDemo;

// --- Iteration & Recursion Simulator ---
let riState = {
  mode: '', // 'iteration' | 'recursion'
  n: 4,
  stepIndex: 0,
  history: [],
  done: false
};

function initRecurIterDemo() {
  const nInput = document.getElementById('ri-n-input');
  if (nInput) {
    let nVal = parseInt(nInput.value) || 4;
    if (nVal < 1) nVal = 1;
    if (nVal > 5) nVal = 5;
    nInput.value = nVal;
    riState.n = nVal;
  }
  riState.mode = '';
  riState.stepIndex = 0;
  riState.history = [];
  riState.done = false;

  const btnPrev = document.getElementById('ri-btn-prev');
  const btnNext = document.getElementById('ri-btn-next');
  if (btnPrev) btnPrev.disabled = true;
  if (btnNext) btnNext.disabled = true;

  const visualTitle = document.getElementById('ri-visual-title');
  if (visualTitle) visualTitle.textContent = 'Trực quan mô phỏng';

  const visualContainer = document.getElementById('ri-visualization-container');
  if (visualContainer) visualContainer.innerHTML = '<div style="color: var(--text-muted); font-size: 14px; text-align: center; width: 100%;">Chọn n (1-5) và chế độ chạy để bắt đầu.</div>';

  const codeContainer = document.getElementById('ri-code-container');
  if (codeContainer) codeContainer.innerHTML = 'Hàm tính tổng 1 + 2 + ... + n';

  const statusText = document.getElementById('ri-status-text');
  if (statusText) statusText.textContent = 'Chọn n và nhấn nút bắt đầu để xem cơ chế hoạt động.';
}
window.initRecurIterDemo = initRecurIterDemo;

function startRiDemo(mode) {
  const nInput = document.getElementById('ri-n-input');
  let nVal = 4;
  if (nInput) {
    nVal = parseInt(nInput.value) || 4;
    if (nVal < 1) nVal = 1;
    if (nVal > 5) nVal = 5;
    nInput.value = nVal;
  }

  riState.mode = mode;
  riState.n = nVal;
  riState.stepIndex = 0;
  riState.history = [];
  riState.done = false;

  const visualTitle = document.getElementById('ri-visual-title');
  if (visualTitle) {
    visualTitle.textContent = mode === 'iteration' ? 'Mô phỏng Vòng lặp (Iteration)' : 'Mô phỏng Đệ quy (Recursion)';
  }

  const btnPrev = document.getElementById('ri-btn-prev');
  const btnNext = document.getElementById('ri-btn-next');
  if (btnPrev) btnPrev.disabled = true;
  if (btnNext) btnNext.disabled = false;

  // Generate steps based on mode
  if (mode === 'iteration') {
    generateIterationSteps();
  } else {
    generateRecursionSteps();
  }

  renderRiStep();
}
window.startRiDemo = startRiDemo;

function generateIterationSteps() {
  const n = riState.n;
  const steps = [];

  // Step 0: initialization
  steps.push({
    res: 0,
    i: 1,
    desc: 'Khởi tạo res = 0, i = 1 để chuẩn bị chạy vòng lặp.',
    codeHighlight: 0, // line indices
    visuals: [{ label: 'res (biến tích lũy)', value: 0 }, { label: 'i (biến điều khiển)', value: 1, active: true }]
  });

  let res = 0;
  for (let i = 1; i <= n; i++) {
    // Step: Accumulate
    res += i;
    steps.push({
      res: res,
      i: i,
      desc: `Bước ${i}: Cộng i = ${i} vào res. res = res + i => res = ${res}.`,
      codeHighlight: 1,
      visuals: [{ label: 'res (biến tích lũy)', value: res, active: true }, { label: 'i (biến điều khiển)', value: i }]
    });

    // Step: Increment (only if not last step)
    if (i < n) {
      steps.push({
        res: res,
        i: i + 1,
        desc: `Tăng i từ ${i} lên ${i+1}. Điều kiện i <= ${n} vẫn thỏa mãn, tiếp tục lặp.`,
        codeHighlight: 2,
        visuals: [{ label: 'res (biến tích lũy)', value: res }, { label: 'i (biến điều khiển)', value: i + 1, active: true }]
      });
    }
  }

  // Final step
  steps.push({
    res: res,
    i: n + 1,
    desc: `Tăng i lên ${n+1}. Điều kiện i <= ${n} không còn thỏa mãn, thoát vòng lặp. Trả về kết quả res = ${res}.`,
    codeHighlight: 3,
    visuals: [{ label: 'res (biến tích lũy) [Chung cuộc]', value: res, success: true }, { label: 'i (biến điều khiển) [Quá giới hạn]', value: n + 1, muted: true }]
  });

  riState.steps = steps;
}

function generateRecursionSteps() {
  const n = riState.n;
  const steps = [];
  
  // Highlighting:
  // Code line 0: check n == 1
  // Code line 1: recur(n - 1)
  // Code line 2: compute n + res
  // Code line 3: return res

  // We will simulate descend, base case, ascend
  // Stack represents active frames. Let's record stack states:
  // A frame structure: { n: number, status: 'descend'|'base'|'ascend'|'done', returnValue?: number }
  
  // Phase 1: Descend
  let stack = [];
  for (let current = n; current > 1; current--) {
    stack = stack.map(f => ({ ...f, status: 'waiting' }));
    stack.push({ n: current, status: 'descend' });
    steps.push({
      stack: JSON.parse(JSON.stringify(stack)),
      desc: `Gọi hàm recur(${current}). Vì ${current} > 1 (không đạt điều kiện dừng), tiếp tục lún sâu gọi recur(${current - 1}).`,
      codeHighlight: 1,
    });
  }

  // Base Case recur(1)
  stack = stack.map(f => ({ ...f, status: 'waiting' }));
  stack.push({ n: 1, status: 'base' });
  steps.push({
    stack: JSON.parse(JSON.stringify(stack)),
    desc: `Gọi hàm recur(1). n == 1 đúng điều kiện dừng => trả về trực tiếp giá trị 1. Bắt đầu pha quay lui thu kết quả.`,
    codeHighlight: 0,
  });

  // Base return value is 1
  let currentReturn = 1;
  
  // Phase 2: Ascend back up
  for (let current = 2; current <= n; current++) {
    // Pop recur(current-1) which returned currentReturn
    stack.pop(); // remove the child
    // Mark top of stack as ascend
    stack[stack.length - 1].status = 'ascend';
    stack[stack.length - 1].returnValue = currentReturn;
    
    let nextReturn = current + currentReturn;
    steps.push({
      stack: JSON.parse(JSON.stringify(stack)),
      desc: `Đã nhận kết quả recur(${current - 1}) = ${currentReturn} từ tầng dưới. Tính toán recur(${current}) = ${current} + ${currentReturn} = ${nextReturn}.`,
      codeHighlight: 2,
    });
    currentReturn = nextReturn;
  }

  // Final Step: return the stack absolute result
  stack[0].status = 'done';
  stack[0].returnValue = currentReturn;
  steps.push({
    stack: JSON.parse(JSON.stringify(stack)),
    desc: `Mọi khung ngăn xếp (stack frame) đã hoàn thành và thu trọn. Hàm kết thúc và trả về kết quả cuối cùng là ${currentReturn}.`,
    codeHighlight: 3,
  });

  riState.steps = steps;
}

function renderRiStep() {
  const step = riState.steps[riState.stepIndex];
  if (!step) return;

  // Enable/disable buttons
  const btnPrev = document.getElementById('ri-btn-prev');
  const btnNext = document.getElementById('ri-btn-next');
  if (btnPrev) btnPrev.disabled = riState.stepIndex === 0;
  if (btnNext) {
    if (riState.stepIndex === riState.steps.length - 1) {
      btnNext.disabled = true;
      btnNext.textContent = 'Hoàn thành 🎉';
    } else {
      btnNext.disabled = false;
      btnNext.textContent = 'Bước tiếp theo ▶';
    }
  }

  const statusText = document.getElementById('ri-status-text');
  if (statusText) statusText.innerHTML = step.desc;

  // Render Visual Section
  const visualContainer = document.getElementById('ri-visualization-container');
  if (visualContainer) {
    if (riState.mode === 'iteration') {
      visualContainer.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 0.8rem; width: 100%; max-width: 320px;">
          ${step.visuals.map(v => {
            let bgClass = 'background: rgba(255,255,255,0.04); border: 1px solid var(--border);';
            if (v.active) bgClass = 'background: rgba(99, 102, 241, 0.15); border: 1px solid var(--accent-indigo); box-shadow: 0 0 8px rgba(99,102,241,0.2);';
            if (v.success) bgClass = 'background: rgba(16, 185, 129, 0.15); border: 1px solid var(--accent-emerald); box-shadow: 0 0 8px rgba(16,185,129,0.2);';
            if (v.muted) bgClass = 'background: rgba(255,255,255,0.01); border: 1px dashed var(--border); opacity: 0.5;';
            
            return `
              <div style="padding: 10px 15px; border-radius: var(--radius-sm); ${bgClass} display: flex; justify-content: space-between; align-items: center; transition: all 0.2s ease;">
                <span style="font-weight: 500; font-size: 13px;">${v.label}</span>
                <span style="font-family: monospace; font-weight: bold; font-size: 16px; color: var(--text-primary);">${v.value}</span>
              </div>
            `;
          }).join('')}
        </div>
      `;
    } else {
      // Recursion Call Stack visual representation
      visualContainer.innerHTML = `
        <div style="display: flex; flex-direction: column-reverse; gap: 0.6rem; width: 100%; max-width: 320px; border-bottom: 3px solid var(--border); padding-bottom: 4px;">
          ${step.stack.map((frame, index) => {
            let bgStyle = 'background: rgba(255,255,255,0.03); border: 1px solid var(--border); color: var(--text-secondary);';
            let label = `recur(n = ${frame.n})`;
            
            if (frame.status === 'descend') {
              bgStyle = 'background: rgba(168, 85, 247, 0.15); border: 1px solid var(--accent-media); box-shadow: 0 0 10px rgba(168,85,247,0.3); color: var(--text-primary);';
              // Check if accent magenta variable doesn't exist, we can use our style config
              bgStyle = 'background: rgba(168, 85, 247, 0.15); border: 1px solid var(--accent-fuchsia); box-shadow: 0 0 10px rgba(168,85,247,0.3); color: var(--text-primary);';
              label = `👉 <strong>gọi recur(${frame.n})</strong>...`;
            } else if (frame.status === 'base') {
              bgStyle = 'background: rgba(16, 185, 129, 0.2); border: 1px solid var(--accent-emerald); box-shadow: 0 0 10px rgba(16,185,129,0.4); color: var(--text-primary); font-weight: bold;';
              label = `⚡ <strong>recur(1) => 1</strong> (Dừng)`;
            } else if (frame.status === 'ascend') {
              bgStyle = 'background: rgba(59, 130, 246, 0.2); border: 1px solid var(--accent-indigo); box-shadow: 0 0 10px rgba(59,130,246,0.3); color: var(--text-primary);';
              label = `↩️ Trả về từ recur(${frame.n-1}) = ${frame.returnValue}`;
            } else if (frame.status === 'done') {
              bgStyle = 'background: rgba(16, 185, 129, 0.2); border: 1px solid var(--accent-emerald); box-shadow: 0 0 10px rgba(16,185,129,0.4); color: var(--text-primary);';
              label = `🎉 <strong>Hoàn thành = ${frame.returnValue}</strong>`;
            } else if (frame.status === 'waiting') {
              bgStyle = 'background: rgba(255,255,255,0.01); border: 1px dashed var(--border); opacity: 0.6;';
            }
            
            return `
              <div style="padding: 10px 15px; border-radius: var(--radius-sm); ${bgStyle} display: flex; justify-content: space-between; align-items: center; transition: all 0.3s ease;">
                <span style="font-size: 13px;">${label}</span>
                <span style="font-family: monospace; font-size: 11px; opacity: 0.5;">Khung ${index+1}</span>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }
  }

  // Render Code Representation
  const codeContainer = document.getElementById('ri-code-container');
  if (codeContainer) {
    if (riState.mode === 'iteration') {
      const pyCode = [
        `def for_loop(n: int) -> int:`,
        `    res = 0`,
        `    for i in range(1, n + 1):`,
        `        res += i`,
        `    return res`
      ];
      let actLine = -1;
      if (step.codeHighlight === 0) actLine = 1;
      if (step.codeHighlight === 1) actLine = 3;
      if (step.codeHighlight === 2) actLine = 2;
      if (step.codeHighlight === 3) actLine = 4;

      codeContainer.innerHTML = pyCode.map((line, idx) => {
        let isAct = idx === actLine;
        let lineBg = isAct ? 'background: rgba(99, 102, 241, 0.2); color: var(--text-primary); font-weight: bold; border-left: 2px solid var(--accent-indigo); padding-left: 4px;' : 'padding-left: 6px;';
        return `<div style="${lineBg}">${line}</div>`;
      }).join('');
    } else {
      const pyCode = [
        `def recur(n: int) -> int:`,
        `    if n == 1:`,
        `        return 1`,
        `    res = recur(n - 1)`,
        `    return n + res`
      ];
      let actLines = [];
      if (step.codeHighlight === 0) actLines = [1, 2];
      if (step.codeHighlight === 1) actLines = [3];
      if (step.codeHighlight === 2) actLines = [4];
      if (step.codeHighlight === 3) actLines = [4];

      codeContainer.innerHTML = pyCode.map((line, idx) => {
        let isAct = actLines.includes(idx);
        let lineBg = isAct ? 'background: rgba(168, 85, 247, 0.18); color: var(--text-primary); font-weight: bold; border-left: 2px solid var(--accent-fuchsia); padding-left: 4px;' : 'padding-left: 6px;';
        return `<div style="${lineBg}">${line}</div>`;
      }).join('');
    }
  }
}

function stepRiDemo(direction) {
  if (direction === 'prev') {
    if (riState.stepIndex > 0) {
      riState.stepIndex--;
      renderRiStep();
    }
  } else {
    if (riState.stepIndex < riState.steps.length - 1) {
      riState.stepIndex++;
      renderRiStep();
    }
  }
}
window.stepRiDemo = stepRiDemo;

// ==================================================================
// ── Interactive Widgets Logic for Chapter 4 (Array / Linked List / List) ──
// ==================================================================

// Shared cell renderer for array-like boxes
function renderOpsCell(value, index, opts) {
  opts = opts || {};
  const highlighted = !!opts.highlighted;
  const empty = !!opts.empty;
  const border = highlighted ? 'var(--accent-sky)' : (empty ? 'var(--border-subtle)' : 'var(--border)');
  const bg = highlighted ? 'rgba(56, 189, 248, 0.12)' : (empty ? 'transparent' : 'var(--bg-overlay)');
  const color = empty ? 'var(--text-muted)' : 'var(--text-primary)';
  const styleBorder = empty ? 'dashed' : 'solid';
  return '<div style="display:flex;flex-direction:column;align-items:center;">' +
    '<div style="width:42px;height:42px;display:flex;align-items:center;justify-content:center;' +
    'border:2px ' + styleBorder + ' ' + border + ';border-radius:6px;background:' + bg + ';color:' + color + ';' +
    'font-family:var(--font-mono);font-weight:600;font-size:14px;transition:all 0.2s ease;">' +
    (empty ? '' : value) + '</div>' +
    '<div style="font-size:11px;color:var(--text-muted);margin-top:4px;font-family:var(--font-mono);">' + index + '</div>' +
    '</div>';
}

// ------------------------------------------------------------------
// 4.1 Array: insert / remove / find simulator
// ------------------------------------------------------------------
const arrayOpsFrames = [
  { arr: [1, 3, 2, 5, 4], highlight: [], desc: 'Mảng ban đầu: nums = [1, 3, 2, 5, 4].' },
  { arr: [1, 3, 2, 5, 4, 0, 0, 0], highlight: [5, 6, 7], desc: 'Mở rộng mảng (extend): tạo mảng mới độ dài 8, sao chép phần tử cũ sang, phần dư khởi tạo bằng 0.' },
  { arr: [1, 3, 2, 5, 5, 4, 0, 0], highlight: [4, 5], desc: 'Chèn 6 vào chỉ mục 3 — bước 1: dịch các phần tử từ chỉ mục 3 trở đi sang phải một vị trí.' },
  { arr: [1, 3, 2, 6, 5, 4, 0, 0], highlight: [3], desc: 'Chèn 6 vào chỉ mục 3 — bước 2: gán giá trị 6 vào chỉ mục 3. Kết quả: nums = [1, 3, 2, 6, 5, 4, 0, 0].' },
  { arr: [1, 3, 6, 6, 5, 4, 0, 0], highlight: [2], desc: 'Xóa phần tử tại chỉ mục 2 — bước 1: chuẩn bị dịch các phần tử phía sau sang trái một vị trí.' },
  { arr: [1, 3, 6, 5, 4, 0, 0, 0], highlight: [2, 3, 4, 5], desc: 'Xóa phần tử tại chỉ mục 2 — hoàn tất: nums = [1, 3, 6, 5, 4, 0, 0, 0]. Phần tử cuối không còn ý nghĩa.' },
  { arr: [1, 3, 6, 5, 4, 0, 0, 0], highlight: [1], desc: 'Tìm kiếm tuyến tính giá trị 3 trong mảng → tìm thấy tại chỉ mục 1.' },
];
let arrayOpsIndex = 0;
let arrayOpsTimer = null;
let arrayOpsSpeed = 900;

function renderArrayOps() {
  const frame = arrayOpsFrames[arrayOpsIndex];
  const container = document.getElementById('array-ops-canvas');
  if (!container) return;
  container.innerHTML = frame.arr.map((v, i) => renderOpsCell(v, i, { highlighted: frame.highlight.includes(i) })).join('');
  const statusEl = document.getElementById('array-ops-status');
  if (statusEl) statusEl.innerHTML = '<strong>Bước ' + (arrayOpsIndex + 1) + '/' + arrayOpsFrames.length + ':</strong> ' + frame.desc;
  const btnStep = document.getElementById('array-ops-btn-step');
  if (btnStep) btnStep.disabled = arrayOpsIndex >= arrayOpsFrames.length - 1;
}

function initArrayOpsDemo() {
  clearInterval(arrayOpsTimer);
  arrayOpsTimer = null;
  arrayOpsIndex = 0;
  renderArrayOps();
  const btnPause = document.getElementById('array-ops-btn-pause');
  if (btnPause) btnPause.disabled = true;
  const btnAuto = document.getElementById('array-ops-btn-autorun');
  if (btnAuto) btnAuto.disabled = false;
}
window.initArrayOpsDemo = initArrayOpsDemo;

function stepArrayOps() {
  if (arrayOpsIndex >= arrayOpsFrames.length - 1) return;
  arrayOpsIndex++;
  renderArrayOps();
}
window.stepArrayOps = stepArrayOps;

function autoRunArrayOps() {
  const btnAuto = document.getElementById('array-ops-btn-autorun');
  const btnPause = document.getElementById('array-ops-btn-pause');
  if (btnAuto) btnAuto.disabled = true;
  if (btnPause) btnPause.disabled = false;
  arrayOpsTimer = setInterval(() => {
    if (arrayOpsIndex >= arrayOpsFrames.length - 1) {
      pauseRunArrayOps();
      return;
    }
    stepArrayOps();
  }, arrayOpsSpeed);
}
window.autoRunArrayOps = autoRunArrayOps;

function pauseRunArrayOps() {
  clearInterval(arrayOpsTimer);
  arrayOpsTimer = null;
  const btnAuto = document.getElementById('array-ops-btn-autorun');
  const btnPause = document.getElementById('array-ops-btn-pause');
  if (btnAuto) btnAuto.disabled = false;
  if (btnPause) btnPause.disabled = true;
}
window.pauseRunArrayOps = pauseRunArrayOps;

function setArrayOpsSpeed(val) {
  arrayOpsSpeed = parseInt(val, 10);
  const label = document.getElementById('array-ops-speed-label');
  if (label) label.textContent = val + 'ms';
  if (arrayOpsTimer) {
    pauseRunArrayOps();
    autoRunArrayOps();
  }
}
window.setArrayOpsSpeed = setArrayOpsSpeed;

// ------------------------------------------------------------------
// 4.2 Linked List: insert / remove / access / find simulator
// ------------------------------------------------------------------
const linkedListOpsFrames = [
  { nodes: [1, 3, 2, 5, 4], highlight: [], desc: 'Danh sách liên kết ban đầu: n0(1) → n1(3) → n2(2) → n3(5) → n4(4) → null.' },
  { nodes: [1, 0, 3, 2, 5, 4], highlight: [1], desc: 'Chèn node P (giá trị 0) vào ngay sau n0: chỉ cần đổi 2 tham chiếu — P.next = n0.next; n0.next = P. Độ phức tạp O(1).' },
  { nodes: [1, 3, 2, 5, 4], highlight: [], desc: 'Xóa node đứng ngay sau n0 (node P): chỉ cần đổi n0.next = n1. Độ phức tạp O(1).' },
  { nodes: [1, 3, 2, 5, 4], highlight: [3], desc: 'Truy cập node tại chỉ mục 3: duyệt tuần tự từ head qua 3 bước → giá trị 5. Độ phức tạp O(n).' },
  { nodes: [1, 3, 2, 5, 4], highlight: [2], desc: 'Tìm node có giá trị 2: duyệt tuần tự từ head → tìm thấy tại chỉ mục 2.' },
];
let linkedListOpsIndex = 0;
let linkedListOpsTimer = null;
let linkedListOpsSpeed = 900;

function renderLinkedListOps() {
  const frame = linkedListOpsFrames[linkedListOpsIndex];
  const container = document.getElementById('linked-list-ops-canvas');
  if (!container) return;
  let html = frame.nodes.map((v, i) => {
    const cell = renderOpsCell(v, 'n' + i, { highlighted: frame.highlight.includes(i) });
    return cell;
  }).join('<div style="align-self:center;color:var(--text-muted);font-size:18px;margin:0 2px;">→</div>');
  html += '<div style="align-self:center;color:var(--text-muted);font-size:18px;margin:0 2px;">→</div>' +
    '<div style="display:flex;flex-direction:column;align-items:center;"><div style="width:42px;height:42px;display:flex;align-items:center;justify-content:center;border:2px dashed var(--border-subtle);border-radius:6px;color:var(--text-muted);font-family:var(--font-mono);font-size:12px;">null</div></div>';
  container.innerHTML = html;
  const statusEl = document.getElementById('linked-list-ops-status');
  if (statusEl) statusEl.innerHTML = '<strong>Bước ' + (linkedListOpsIndex + 1) + '/' + linkedListOpsFrames.length + ':</strong> ' + frame.desc;
  const btnStep = document.getElementById('linked-list-ops-btn-step');
  if (btnStep) btnStep.disabled = linkedListOpsIndex >= linkedListOpsFrames.length - 1;
}

function initLinkedListOpsDemo() {
  clearInterval(linkedListOpsTimer);
  linkedListOpsTimer = null;
  linkedListOpsIndex = 0;
  renderLinkedListOps();
  const btnPause = document.getElementById('linked-list-ops-btn-pause');
  if (btnPause) btnPause.disabled = true;
  const btnAuto = document.getElementById('linked-list-ops-btn-autorun');
  if (btnAuto) btnAuto.disabled = false;
}
window.initLinkedListOpsDemo = initLinkedListOpsDemo;

function stepLinkedListOps() {
  if (linkedListOpsIndex >= linkedListOpsFrames.length - 1) return;
  linkedListOpsIndex++;
  renderLinkedListOps();
}
window.stepLinkedListOps = stepLinkedListOps;

function autoRunLinkedListOps() {
  const btnAuto = document.getElementById('linked-list-ops-btn-autorun');
  const btnPause = document.getElementById('linked-list-ops-btn-pause');
  if (btnAuto) btnAuto.disabled = true;
  if (btnPause) btnPause.disabled = false;
  linkedListOpsTimer = setInterval(() => {
    if (linkedListOpsIndex >= linkedListOpsFrames.length - 1) {
      pauseRunLinkedListOps();
      return;
    }
    stepLinkedListOps();
  }, linkedListOpsSpeed);
}
window.autoRunLinkedListOps = autoRunLinkedListOps;

function pauseRunLinkedListOps() {
  clearInterval(linkedListOpsTimer);
  linkedListOpsTimer = null;
  const btnAuto = document.getElementById('linked-list-ops-btn-autorun');
  const btnPause = document.getElementById('linked-list-ops-btn-pause');
  if (btnAuto) btnAuto.disabled = false;
  if (btnPause) btnPause.disabled = true;
}
window.pauseRunLinkedListOps = pauseRunLinkedListOps;

function setLinkedListOpsSpeed(val) {
  linkedListOpsSpeed = parseInt(val, 10);
  const label = document.getElementById('linked-list-ops-speed-label');
  if (label) label.textContent = val + 'ms';
  if (linkedListOpsTimer) {
    pauseRunLinkedListOps();
    autoRunLinkedListOps();
  }
}
window.setLinkedListOpsSpeed = setLinkedListOpsSpeed;

// ------------------------------------------------------------------
// 4.3 List (dynamic array): add / insert / remove / capacity expansion simulator
// ------------------------------------------------------------------
const EMPTY = null;
const listOpsFrames = [
  { arr: new Array(10).fill(EMPTY), size: 0, capacity: 10, highlight: [], desc: 'Khởi tạo List rỗng với capacity = 10.' },
  { arr: [1, 3, 2, 5, 4, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY], size: 5, capacity: 10, highlight: [0, 1, 2, 3, 4], desc: 'Thêm 5 phần tử vào cuối bằng add(): nums = [1, 3, 2, 5, 4], length = 5, capacity = 10.' },
  { arr: [1, 3, 2, 6, 5, 4, EMPTY, EMPTY, EMPTY, EMPTY], size: 6, capacity: 10, highlight: [3, 4, 5], desc: 'Chèn 6 vào chỉ mục 3 bằng insert(): dịch phải các phần tử phía sau → length = 6.' },
  { arr: [1, 3, 2, 5, 4, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY], size: 5, capacity: 10, highlight: [3, 4], desc: 'Xóa phần tử tại chỉ mục 3 bằng remove(): dịch trái các phần tử phía sau → length = 5.' },
  { arr: [1, 0, 2, 5, 4, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY], size: 5, capacity: 10, highlight: [1], desc: 'Truy cập get(1) = 3, sau đó cập nhật set(1, 0) → phần tử tại chỉ mục 1 trở thành 0.' },
  { arr: [1, 0, 2, 5, 4, 0, 1, 2, 3, 4], size: 10, capacity: 10, highlight: [5, 6, 7, 8, 9], desc: 'Kiểm tra cơ chế mở rộng: gọi add() liên tiếp với i = 0, 1, 2, 3, 4 → length chạm capacity = 10 (chưa cần mở rộng).' },
  { arr: [1, 0, 2, 5, 4, 0, 1, 2, 3, 4, 5, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY], size: 11, capacity: 20, highlight: [10], desc: 'Thêm i = 5: length (10) đã bằng capacity (10) → List tự động MỞ RỘNG dung lượng gấp đôi thành 20, rồi mới thêm phần tử.' },
  { arr: [1, 0, 2, 5, 4, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY], size: 15, capacity: 20, highlight: [11, 12, 13, 14], desc: 'Thêm nốt i = 6, 7, 8, 9 → length = 15, capacity = 20.' },
];
let listOpsIndex = 0;
let listOpsTimer = null;
let listOpsSpeed = 700;

function renderListOps() {
  const frame = listOpsFrames[listOpsIndex];
  const container = document.getElementById('list-ops-canvas');
  if (!container) return;
  container.innerHTML = frame.arr.map((v, i) => {
    const empty = v === EMPTY || i >= frame.size;
    return renderOpsCell(empty ? '' : v, i, { highlighted: frame.highlight.includes(i), empty: empty });
  }).join('');
  const statusEl = document.getElementById('list-ops-status');
  if (statusEl) {
    statusEl.innerHTML = '<strong>Bước ' + (listOpsIndex + 1) + '/' + listOpsFrames.length + ' (length=' + frame.size + ', capacity=' + frame.capacity + '):</strong> ' + frame.desc;
  }
  const btnStep = document.getElementById('list-ops-btn-step');
  if (btnStep) btnStep.disabled = listOpsIndex >= listOpsFrames.length - 1;
}

function initListOpsDemo() {
  clearInterval(listOpsTimer);
  listOpsTimer = null;
  listOpsIndex = 0;
  renderListOps();
  const btnPause = document.getElementById('list-ops-btn-pause');
  if (btnPause) btnPause.disabled = true;
  const btnAuto = document.getElementById('list-ops-btn-autorun');
  if (btnAuto) btnAuto.disabled = false;
}
window.initListOpsDemo = initListOpsDemo;

function stepListOps() {
  if (listOpsIndex >= listOpsFrames.length - 1) return;
  listOpsIndex++;
  renderListOps();
}
window.stepListOps = stepListOps;

function autoRunListOps() {
  const btnAuto = document.getElementById('list-ops-btn-autorun');
  const btnPause = document.getElementById('list-ops-btn-pause');
  if (btnAuto) btnAuto.disabled = true;
  if (btnPause) btnPause.disabled = false;
  listOpsTimer = setInterval(() => {
    if (listOpsIndex >= listOpsFrames.length - 1) {
      pauseRunListOps();
      return;
    }
    stepListOps();
  }, listOpsSpeed);
}
window.autoRunListOps = autoRunListOps;

function pauseRunListOps() {
  clearInterval(listOpsTimer);
  listOpsTimer = null;
  const btnAuto = document.getElementById('list-ops-btn-autorun');
  const btnPause = document.getElementById('list-ops-btn-pause');
  if (btnAuto) btnAuto.disabled = false;
  if (btnPause) btnPause.disabled = true;
}
window.pauseRunListOps = pauseRunListOps;

function setListOpsSpeed(val) {
  listOpsSpeed = parseInt(val, 10);
  const label = document.getElementById('list-ops-speed-label');
  if (label) label.textContent = val + 'ms';
  if (listOpsTimer) {
    pauseRunListOps();
    autoRunListOps();
  }
}
window.setListOpsSpeed = setListOpsSpeed;

// ── Interactive Widgets Logic for Chapter 5 (Stack / Queue / Deque) ──
// ==================================================================

// ------------------------------------------------------------------
// 5.1 Stack: push / peek / pop simulator
// ------------------------------------------------------------------
const stackOpsFrames = [
  { arr: [], highlight: [], desc: 'Ngăn xếp rỗng ban đầu.' },
  { arr: [1], highlight: [0], desc: 'push(1): đẩy 1 vào ngăn xếp.' },
  { arr: [1, 3], highlight: [1], desc: 'push(3): đẩy 3 vào ngăn xếp.' },
  { arr: [1, 3, 2], highlight: [2], desc: 'push(2): đẩy 2 vào ngăn xếp.' },
  { arr: [1, 3, 2, 5], highlight: [3], desc: 'push(5): đẩy 5 vào ngăn xếp.' },
  { arr: [1, 3, 2, 5, 4], highlight: [4], desc: 'push(4): đẩy 4 vào ngăn xếp. Đỉnh ngăn xếp hiện tại là 4.' },
  { arr: [1, 3, 2, 5, 4], highlight: [4], desc: 'peek(): truy cập phần tử đỉnh → trả về 4 (không xóa phần tử).' },
  { arr: [1, 3, 2, 5], highlight: [3], desc: 'pop(): lấy phần tử đỉnh ra khỏi ngăn xếp → trả về 4. Đỉnh ngăn xếp bây giờ là 5.' },
];
let stackOpsIndex = 0;
let stackOpsTimer = null;
let stackOpsSpeed = 900;

function renderStackOps() {
  const frame = stackOpsFrames[stackOpsIndex];
  const container = document.getElementById('stack-ops-canvas');
  if (!container) return;
  if (frame.arr.length === 0) {
    container.innerHTML = '<div style="color:var(--text-muted); font-size:13px; padding: 20px 0;">(ngăn xếp rỗng)</div>';
  } else {
    container.innerHTML = frame.arr.map((v, i) => renderOpsCell(v, i, { highlighted: frame.highlight.includes(i) })).join('');
  }
  const statusEl = document.getElementById('stack-ops-status');
  if (statusEl) statusEl.innerHTML = '<strong>Bước ' + (stackOpsIndex + 1) + '/' + stackOpsFrames.length + ':</strong> ' + frame.desc;
  const btnStep = document.getElementById('stack-ops-btn-step');
  if (btnStep) btnStep.disabled = stackOpsIndex >= stackOpsFrames.length - 1;
}

function initStackOpsDemo() {
  clearInterval(stackOpsTimer);
  stackOpsTimer = null;
  stackOpsIndex = 0;
  renderStackOps();
  const btnPause = document.getElementById('stack-ops-btn-pause');
  if (btnPause) btnPause.disabled = true;
  const btnAuto = document.getElementById('stack-ops-btn-autorun');
  if (btnAuto) btnAuto.disabled = false;
}
window.initStackOpsDemo = initStackOpsDemo;

function stepStackOps() {
  if (stackOpsIndex >= stackOpsFrames.length - 1) return;
  stackOpsIndex++;
  renderStackOps();
}
window.stepStackOps = stepStackOps;

function autoRunStackOps() {
  const btnAuto = document.getElementById('stack-ops-btn-autorun');
  const btnPause = document.getElementById('stack-ops-btn-pause');
  if (btnAuto) btnAuto.disabled = true;
  if (btnPause) btnPause.disabled = false;
  stackOpsTimer = setInterval(() => {
    if (stackOpsIndex >= stackOpsFrames.length - 1) {
      pauseRunStackOps();
      return;
    }
    stepStackOps();
  }, stackOpsSpeed);
}
window.autoRunStackOps = autoRunStackOps;

function pauseRunStackOps() {
  clearInterval(stackOpsTimer);
  stackOpsTimer = null;
  const btnAuto = document.getElementById('stack-ops-btn-autorun');
  const btnPause = document.getElementById('stack-ops-btn-pause');
  if (btnAuto) btnAuto.disabled = false;
  if (btnPause) btnPause.disabled = true;
}
window.pauseRunStackOps = pauseRunStackOps;

function setStackOpsSpeed(val) {
  stackOpsSpeed = parseInt(val, 10);
  const label = document.getElementById('stack-ops-speed-label');
  if (label) label.textContent = val + 'ms';
  if (stackOpsTimer) {
    pauseRunStackOps();
    autoRunStackOps();
  }
}
window.setStackOpsSpeed = setStackOpsSpeed;

// ------------------------------------------------------------------
// 5.2 Queue: push / pop simulator (logical FIFO order, front = leftmost)
// ------------------------------------------------------------------
const queueOpsFrames = [
  { arr: [], highlight: [], desc: 'Hàng đợi rỗng ban đầu.' },
  { arr: [1], highlight: [0], desc: 'push(1): thêm 1 vào cuối hàng đợi.' },
  { arr: [1, 3], highlight: [1], desc: 'push(3): thêm 3 vào cuối hàng đợi.' },
  { arr: [1, 3, 2], highlight: [2], desc: 'push(2): thêm 2 vào cuối hàng đợi.' },
  { arr: [1, 3, 2, 5], highlight: [3], desc: 'push(5): thêm 5 vào cuối hàng đợi.' },
  { arr: [1, 3, 2, 5, 4], highlight: [4], desc: 'push(4): thêm 4 vào cuối hàng đợi. Đầu hàng đợi vẫn là 1.' },
  { arr: [1, 3, 2, 5, 4], highlight: [0], desc: 'peek(): truy cập phần tử đầu → trả về 1 (không xóa phần tử).' },
  { arr: [3, 2, 5, 4], highlight: [0], desc: 'pop(): lấy phần tử đầu ra khỏi hàng đợi → trả về 1. Đầu hàng đợi bây giờ là 3.' },
  { arr: [2, 5, 4], highlight: [0], desc: 'pop(): lấy phần tử đầu ra khỏi hàng đợi → trả về 3. Đầu hàng đợi bây giờ là 2.' },
];
let queueOpsIndex = 0;
let queueOpsTimer = null;
let queueOpsSpeed = 900;

function renderQueueOps() {
  const frame = queueOpsFrames[queueOpsIndex];
  const container = document.getElementById('queue-ops-canvas');
  if (!container) return;
  if (frame.arr.length === 0) {
    container.innerHTML = '<div style="color:var(--text-muted); font-size:13px; padding: 20px 0;">(hàng đợi rỗng)</div>';
  } else {
    container.innerHTML = frame.arr.map((v, i) => renderOpsCell(v, i, { highlighted: frame.highlight.includes(i) })).join('');
  }
  const statusEl = document.getElementById('queue-ops-status');
  if (statusEl) statusEl.innerHTML = '<strong>Bước ' + (queueOpsIndex + 1) + '/' + queueOpsFrames.length + ':</strong> ' + frame.desc;
  const btnStep = document.getElementById('queue-ops-btn-step');
  if (btnStep) btnStep.disabled = queueOpsIndex >= queueOpsFrames.length - 1;
}

function initQueueOpsDemo() {
  clearInterval(queueOpsTimer);
  queueOpsTimer = null;
  queueOpsIndex = 0;
  renderQueueOps();
  const btnPause = document.getElementById('queue-ops-btn-pause');
  if (btnPause) btnPause.disabled = true;
  const btnAuto = document.getElementById('queue-ops-btn-autorun');
  if (btnAuto) btnAuto.disabled = false;
}
window.initQueueOpsDemo = initQueueOpsDemo;

function stepQueueOps() {
  if (queueOpsIndex >= queueOpsFrames.length - 1) return;
  queueOpsIndex++;
  renderQueueOps();
}
window.stepQueueOps = stepQueueOps;

function autoRunQueueOps() {
  const btnAuto = document.getElementById('queue-ops-btn-autorun');
  const btnPause = document.getElementById('queue-ops-btn-pause');
  if (btnAuto) btnAuto.disabled = true;
  if (btnPause) btnPause.disabled = false;
  queueOpsTimer = setInterval(() => {
    if (queueOpsIndex >= queueOpsFrames.length - 1) {
      pauseRunQueueOps();
      return;
    }
    stepQueueOps();
  }, queueOpsSpeed);
}
window.autoRunQueueOps = autoRunQueueOps;

function pauseRunQueueOps() {
  clearInterval(queueOpsTimer);
  queueOpsTimer = null;
  const btnAuto = document.getElementById('queue-ops-btn-autorun');
  const btnPause = document.getElementById('queue-ops-btn-pause');
  if (btnAuto) btnAuto.disabled = false;
  if (btnPause) btnPause.disabled = true;
}
window.pauseRunQueueOps = pauseRunQueueOps;

function setQueueOpsSpeed(val) {
  queueOpsSpeed = parseInt(val, 10);
  const label = document.getElementById('queue-ops-speed-label');
  if (label) label.textContent = val + 'ms';
  if (queueOpsTimer) {
    pauseRunQueueOps();
    autoRunQueueOps();
  }
}
window.setQueueOpsSpeed = setQueueOpsSpeed;

// ------------------------------------------------------------------
// 5.3 Deque: push_first / push_last / pop_first / pop_last simulator
// ------------------------------------------------------------------
const dequeOpsFrames = [
  { arr: [], highlight: [], desc: 'Hàng đợi hai đầu rỗng ban đầu.' },
  { arr: [3], highlight: [0], desc: 'push_last(3): thêm 3 vào cuối.' },
  { arr: [3, 2], highlight: [1], desc: 'push_last(2): thêm 2 vào cuối.' },
  { arr: [3, 2, 5], highlight: [2], desc: 'push_last(5): thêm 5 vào cuối.' },
  { arr: [1, 3, 2, 5], highlight: [0], desc: 'push_first(1): thêm 1 vào đầu.' },
  { arr: [1, 3, 2, 5, 4], highlight: [4], desc: 'push_last(4): thêm 4 vào cuối.' },
  { arr: [1, 3, 2, 5], highlight: [3], desc: 'pop_last(): lấy phần tử cuối ra → trả về 4.' },
  { arr: [3, 2, 5], highlight: [0], desc: 'pop_first(): lấy phần tử đầu ra → trả về 1.' },
];
let dequeOpsIndex = 0;
let dequeOpsTimer = null;
let dequeOpsSpeed = 900;

function renderDequeOps() {
  const frame = dequeOpsFrames[dequeOpsIndex];
  const container = document.getElementById('deque-ops-canvas');
  if (!container) return;
  if (frame.arr.length === 0) {
    container.innerHTML = '<div style="color:var(--text-muted); font-size:13px; padding: 20px 0;">(hàng đợi hai đầu rỗng)</div>';
  } else {
    container.innerHTML = frame.arr.map((v, i) => renderOpsCell(v, i, { highlighted: frame.highlight.includes(i) })).join('');
  }
  const statusEl = document.getElementById('deque-ops-status');
  if (statusEl) statusEl.innerHTML = '<strong>Bước ' + (dequeOpsIndex + 1) + '/' + dequeOpsFrames.length + ':</strong> ' + frame.desc;
  const btnStep = document.getElementById('deque-ops-btn-step');
  if (btnStep) btnStep.disabled = dequeOpsIndex >= dequeOpsFrames.length - 1;
}

function initDequeOpsDemo() {
  clearInterval(dequeOpsTimer);
  dequeOpsTimer = null;
  dequeOpsIndex = 0;
  renderDequeOps();
  const btnPause = document.getElementById('deque-ops-btn-pause');
  if (btnPause) btnPause.disabled = true;
  const btnAuto = document.getElementById('deque-ops-btn-autorun');
  if (btnAuto) btnAuto.disabled = false;
}
window.initDequeOpsDemo = initDequeOpsDemo;

function stepDequeOps() {
  if (dequeOpsIndex >= dequeOpsFrames.length - 1) return;
  dequeOpsIndex++;
  renderDequeOps();
}
window.stepDequeOps = stepDequeOps;

function autoRunDequeOps() {
  const btnAuto = document.getElementById('deque-ops-btn-autorun');
  const btnPause = document.getElementById('deque-ops-btn-pause');
  if (btnAuto) btnAuto.disabled = true;
  if (btnPause) btnPause.disabled = false;
  dequeOpsTimer = setInterval(() => {
    if (dequeOpsIndex >= dequeOpsFrames.length - 1) {
      pauseRunDequeOps();
      return;
    }
    stepDequeOps();
  }, dequeOpsSpeed);
}
window.autoRunDequeOps = autoRunDequeOps;

function pauseRunDequeOps() {
  clearInterval(dequeOpsTimer);
  dequeOpsTimer = null;
  const btnAuto = document.getElementById('deque-ops-btn-autorun');
  const btnPause = document.getElementById('deque-ops-btn-pause');
  if (btnAuto) btnAuto.disabled = false;
  if (btnPause) btnPause.disabled = true;
}
window.pauseRunDequeOps = pauseRunDequeOps;

function setDequeOpsSpeed(val) {
  dequeOpsSpeed = parseInt(val, 10);
  const label = document.getElementById('deque-ops-speed-label');
  if (label) label.textContent = val + 'ms';
  if (dequeOpsTimer) {
    pauseRunDequeOps();
    autoRunDequeOps();
  }
}
window.setDequeOpsSpeed = setDequeOpsSpeed;

// ── Interactive Widgets Logic for Chapter 6 (Hashing) ──────────────
// ==================================================================

// Shared cell renderer for hash-table bucket boxes (key/value pair, empty, or tombstone)
function renderHashBucketCell(index, pair, opts) {
  opts = opts || {};
  const highlighted = !!opts.highlighted;
  const isTombstone = pair === 'TOMBSTONE';
  const isEmpty = pair === null || pair === undefined;
  const border = highlighted ? 'var(--accent-sky)' : (isEmpty ? 'var(--border-subtle)' : (isTombstone ? 'var(--accent-rose, #f43f5e)' : 'var(--border)'));
  const bg = highlighted ? 'rgba(56, 189, 248, 0.12)' : (isEmpty ? 'transparent' : (isTombstone ? 'rgba(244, 63, 94, 0.08)' : 'var(--bg-overlay)'));
  const color = isEmpty ? 'var(--text-muted)' : 'var(--text-primary)';
  const styleBorder = isEmpty ? 'dashed' : 'solid';
  let label = '';
  if (isTombstone) label = 'TOMBSTONE';
  else if (!isEmpty) label = pair.key + '<br>→ ' + pair.val;
  return '<div style="display:flex;flex-direction:column;align-items:center;">' +
    '<div style="width:76px;min-height:48px;display:flex;align-items:center;justify-content:center;text-align:center;' +
    'border:2px ' + styleBorder + ' ' + border + ';border-radius:6px;background:' + bg + ';color:' + color + ';' +
    'font-family:var(--font-mono);font-weight:600;font-size:12px;line-height:1.4;padding:4px;transition:all 0.2s ease;">' +
    label + '</div>' +
    '<div style="font-size:11px;color:var(--text-muted);margin-top:4px;font-family:var(--font-mono);">' + index + '</div>' +
    '</div>';
}

// ------------------------------------------------------------------
// 6.1 Array-based hash table: put / get / remove — demonstrates the
// erroneous overwrite caused by an unresolved hash collision.
// ------------------------------------------------------------------
const hashMapBasicFrames = [
  { buckets: new Array(10).fill(null), highlight: [], desc: 'Khởi tạo bảng băm dạng mảng với 10 bucket rỗng (dùng dung lượng nhỏ để minh họa, bản triển khai thật dùng capacity = 100). hash(key) = key % 10.' },
  { buckets: [null, null, { key: 12, val: 'An' }, null, null, null, null, null, null, null], highlight: [2], desc: 'put(12, "An"): hash(12) = 12 % 10 = 2 → lưu vào bucket 2.' },
  { buckets: [null, null, { key: 12, val: 'An' }, { key: 23, val: 'Binh' }, null, null, null, null, null, null], highlight: [3], desc: 'put(23, "Binh"): hash(23) = 23 % 10 = 3 → lưu vào bucket 3.' },
  { buckets: [null, null, { key: 12, val: 'An' }, { key: 23, val: 'Binh' }, null, { key: 35, val: 'Chi' }, null, null, null, null], highlight: [5], desc: 'put(35, "Chi"): hash(35) = 35 % 10 = 5 → lưu vào bucket 5.' },
  { buckets: [null, null, { key: 12, val: 'An' }, { key: 23, val: 'Binh' }, null, { key: 35, val: 'Chi' }, null, { key: 7, val: 'Dung' }, null, null], highlight: [7], desc: 'put(7, "Dung"): hash(7) = 7 % 10 = 7 → lưu vào bucket 7.' },
  { buckets: [null, null, { key: 42, val: 'Em' }, { key: 23, val: 'Binh' }, null, { key: 35, val: 'Chi' }, null, { key: 7, val: 'Dung' }, null, null], highlight: [2], desc: '⚠️ put(42, "Em"): hash(42) = 42 % 10 = 2 → XUNG ĐỘT với key 12 tại bucket 2! Bảng dựa trên mảng đơn giản này GHI ĐÈ trực tiếp, làm mất vĩnh viễn cặp (12, "An").' },
  { buckets: [null, null, { key: 42, val: 'Em' }, { key: 23, val: 'Binh' }, null, { key: 35, val: 'Chi' }, null, { key: 7, val: 'Dung' }, null, null], highlight: [2], desc: '❌ get(12): hash(12) = 2 → bucket 2 hiện chứa (42, "Em") → trả về SAI kết quả "Em" thay vì "An". Đây chính là hậu quả của xung đột băm khi không được xử lý.' },
  { buckets: [null, null, { key: 42, val: 'Em' }, { key: 23, val: 'Binh' }, null, null, null, { key: 7, val: 'Dung' }, null, null], highlight: [5], desc: 'remove(35): hash(35) = 5 → xóa bucket 5, đặt về rỗng (None).' },
  { buckets: [null, null, { key: 42, val: 'Em' }, { key: 23, val: 'Binh' }, null, null, null, { key: 7, val: 'Dung' }, null, null], highlight: [7], desc: '✅ get(7): hash(7) = 7 → bucket 7 chứa (7, "Dung") → tìm thấy, trả về "Dung".' },
];
let hashMapBasicIndex = 0;
let hashMapBasicTimer = null;
let hashMapBasicSpeed = 900;

function renderHashMapBasic() {
  const frame = hashMapBasicFrames[hashMapBasicIndex];
  const container = document.getElementById('hash-map-basic-canvas');
  if (container) {
    container.innerHTML = frame.buckets.map((p, i) => renderHashBucketCell(i, p, { highlighted: frame.highlight.includes(i) })).join('');
  }
  const statusEl = document.getElementById('hash-map-basic-status');
  if (statusEl) statusEl.innerHTML = '<strong>Bước ' + (hashMapBasicIndex + 1) + '/' + hashMapBasicFrames.length + ':</strong> ' + frame.desc;
  const btnStep = document.getElementById('hash-map-basic-btn-step');
  if (btnStep) btnStep.disabled = hashMapBasicIndex >= hashMapBasicFrames.length - 1;
}

function initHashMapBasicDemo() {
  clearInterval(hashMapBasicTimer);
  hashMapBasicTimer = null;
  hashMapBasicIndex = 0;
  renderHashMapBasic();
  const btnPause = document.getElementById('hash-map-basic-btn-pause');
  if (btnPause) btnPause.disabled = true;
  const btnAuto = document.getElementById('hash-map-basic-btn-autorun');
  if (btnAuto) btnAuto.disabled = false;
}
window.initHashMapBasicDemo = initHashMapBasicDemo;

function stepHashMapBasic() {
  if (hashMapBasicIndex >= hashMapBasicFrames.length - 1) return;
  hashMapBasicIndex++;
  renderHashMapBasic();
}
window.stepHashMapBasic = stepHashMapBasic;

function autoRunHashMapBasic() {
  const btnAuto = document.getElementById('hash-map-basic-btn-autorun');
  const btnPause = document.getElementById('hash-map-basic-btn-pause');
  if (btnAuto) btnAuto.disabled = true;
  if (btnPause) btnPause.disabled = false;
  hashMapBasicTimer = setInterval(() => {
    if (hashMapBasicIndex >= hashMapBasicFrames.length - 1) {
      pauseRunHashMapBasic();
      return;
    }
    stepHashMapBasic();
  }, hashMapBasicSpeed);
}
window.autoRunHashMapBasic = autoRunHashMapBasic;

function pauseRunHashMapBasic() {
  clearInterval(hashMapBasicTimer);
  hashMapBasicTimer = null;
  const btnAuto = document.getElementById('hash-map-basic-btn-autorun');
  const btnPause = document.getElementById('hash-map-basic-btn-pause');
  if (btnAuto) btnAuto.disabled = false;
  if (btnPause) btnPause.disabled = true;
}
window.pauseRunHashMapBasic = pauseRunHashMapBasic;

function setHashMapBasicSpeed(val) {
  hashMapBasicSpeed = parseInt(val, 10);
  const label = document.getElementById('hash-map-basic-speed-label');
  if (label) label.textContent = val + 'ms';
  if (hashMapBasicTimer) {
    pauseRunHashMapBasic();
    autoRunHashMapBasic();
  }
}
window.setHashMapBasicSpeed = setHashMapBasicSpeed;

// ------------------------------------------------------------------
// 6.2.1 Separate chaining: insert / expand / query / remove simulator
// ------------------------------------------------------------------
const hashChainingFrames = [
  { capacity: 4, size: 0, buckets: [[], [], [], []], highlight: [], desc: 'Khởi tạo bảng băm với capacity = 4, mỗi bucket là một danh sách (mảng động) rỗng. Ngưỡng hệ số tải = 2/3.' },
  { capacity: 4, size: 1, buckets: [[{ key: 12836, val: 'XiaoHa' }], [], [], []], highlight: [0], desc: 'put(12836, "XiaoHa"): hash = 12836 % 4 = 0 → thêm vào bucket 0. Hệ số tải = 1/4 = 0.25.' },
  { capacity: 4, size: 2, buckets: [[{ key: 12836, val: 'XiaoHa' }], [{ key: 15937, val: 'XiaoLuo' }], [], []], highlight: [1], desc: 'put(15937, "XiaoLuo"): hash = 15937 % 4 = 1 → thêm vào bucket 1. Hệ số tải = 2/4 = 0.5.' },
  { capacity: 4, size: 3, buckets: [[{ key: 12836, val: 'XiaoHa' }], [{ key: 15937, val: 'XiaoLuo' }], [{ key: 16750, val: 'XiaoSuan' }], []], highlight: [2], desc: 'put(16750, "XiaoSuan"): hash = 16750 % 4 = 2 → thêm vào bucket 2. Hệ số tải = 3/4 = 0.75 (đã vượt ngưỡng, nhưng chỉ kiểm tra TRƯỚC lần put tiếp theo).' },
  { capacity: 8, size: 4, buckets: [[], [{ key: 15937, val: 'XiaoLuo' }], [], [], [{ key: 12836, val: 'XiaoHa' }, { key: 13276, val: 'XiaoFa' }], [], [{ key: 16750, val: 'XiaoSuan' }], []], highlight: [4], desc: '⚙️ put(13276, "XiaoFa"): hệ số tải hiện tại (3/4 = 0.75) > 2/3 → MỞ RỘNG: capacity 4 → 8, băm lại toàn bộ 3 cặp cũ. Sau đó chèn 13276 (hash = 13276 % 8 = 4) → xung đột với 12836 tại bucket 4 → nối thêm vào chuỗi.' },
  { capacity: 8, size: 5, buckets: [[], [{ key: 15937, val: 'XiaoLuo' }], [], [], [{ key: 12836, val: 'XiaoHa' }, { key: 13276, val: 'XiaoFa' }], [], [{ key: 16750, val: 'XiaoSuan' }], [{ key: 10583, val: 'XiaoYa' }]], highlight: [7], desc: 'put(10583, "XiaoYa"): hash = 10583 % 8 = 7 → thêm vào bucket 7. Hệ số tải = 5/8 = 0.625 (chưa vượt ngưỡng).' },
  { capacity: 8, size: 5, buckets: [[], [{ key: 15937, val: 'XiaoLuo' }], [], [], [{ key: 12836, val: 'XiaoHa' }, { key: 13276, val: 'XiaoFa' }], [], [{ key: 16750, val: 'XiaoSuan' }], [{ key: 10583, val: 'XiaoYa' }]], highlight: [4], desc: '✅ get(13276): hash = 4 → duyệt chuỗi tại bucket 4: so sánh 12836 (không khớp) → so sánh 13276 (khớp) → trả về "XiaoFa".' },
  { capacity: 8, size: 4, buckets: [[], [{ key: 15937, val: 'XiaoLuo' }], [], [], [{ key: 13276, val: 'XiaoFa' }], [], [{ key: 16750, val: 'XiaoSuan' }], [{ key: 10583, val: 'XiaoYa' }]], highlight: [4], desc: 'remove(12836): hash = 4 → duyệt chuỗi tại bucket 4, tìm thấy 12836, xóa khỏi danh sách. Bucket 4 giờ chỉ còn (13276, "XiaoFa").' },
];
let hashChainingIndex = 0;
let hashChainingTimer = null;
let hashChainingSpeed = 900;

function renderHashChainBucket(index, list, highlighted) {
  const border = highlighted ? 'var(--accent-sky)' : 'var(--border)';
  const bg = highlighted ? 'rgba(56, 189, 248, 0.12)' : 'var(--bg-overlay)';
  const items = list.length
    ? list.map((p) => '<div style="font-family:var(--font-mono); font-size:11px; padding:2px 4px;">' + p.key + ' → ' + p.val + '</div>').join('<div style="height:1px;background:var(--border-subtle);"></div>')
    : '<div style="font-size:11px; color:var(--text-muted); padding:2px 4px;">(rỗng)</div>';
  return '<div style="display:flex;flex-direction:column;align-items:center;">' +
    '<div style="min-width:100px;min-height:40px;border:2px solid ' + border + ';border-radius:6px;background:' + bg + ';color:var(--text-primary);overflow:hidden;">' +
    items + '</div>' +
    '<div style="font-size:11px;color:var(--text-muted);margin-top:4px;font-family:var(--font-mono);">bucket ' + index + '</div>' +
    '</div>';
}

function renderHashChaining() {
  const frame = hashChainingFrames[hashChainingIndex];
  const container = document.getElementById('hash-chaining-canvas');
  if (container) {
    container.innerHTML = frame.buckets.map((list, i) => renderHashChainBucket(i, list, frame.highlight.includes(i))).join('');
  }
  const statusEl = document.getElementById('hash-chaining-status');
  if (statusEl) {
    statusEl.innerHTML = '<strong>Bước ' + (hashChainingIndex + 1) + '/' + hashChainingFrames.length + ' (capacity=' + frame.capacity + ', size=' + frame.size + '):</strong> ' + frame.desc;
  }
  const btnStep = document.getElementById('hash-chaining-btn-step');
  if (btnStep) btnStep.disabled = hashChainingIndex >= hashChainingFrames.length - 1;
}

function initHashChainingDemo() {
  clearInterval(hashChainingTimer);
  hashChainingTimer = null;
  hashChainingIndex = 0;
  renderHashChaining();
  const btnPause = document.getElementById('hash-chaining-btn-pause');
  if (btnPause) btnPause.disabled = true;
  const btnAuto = document.getElementById('hash-chaining-btn-autorun');
  if (btnAuto) btnAuto.disabled = false;
}
window.initHashChainingDemo = initHashChainingDemo;

function stepHashChaining() {
  if (hashChainingIndex >= hashChainingFrames.length - 1) return;
  hashChainingIndex++;
  renderHashChaining();
}
window.stepHashChaining = stepHashChaining;

function autoRunHashChaining() {
  const btnAuto = document.getElementById('hash-chaining-btn-autorun');
  const btnPause = document.getElementById('hash-chaining-btn-pause');
  if (btnAuto) btnAuto.disabled = true;
  if (btnPause) btnPause.disabled = false;
  hashChainingTimer = setInterval(() => {
    if (hashChainingIndex >= hashChainingFrames.length - 1) {
      pauseRunHashChaining();
      return;
    }
    stepHashChaining();
  }, hashChainingSpeed);
}
window.autoRunHashChaining = autoRunHashChaining;

function pauseRunHashChaining() {
  clearInterval(hashChainingTimer);
  hashChainingTimer = null;
  const btnAuto = document.getElementById('hash-chaining-btn-autorun');
  const btnPause = document.getElementById('hash-chaining-btn-pause');
  if (btnAuto) btnAuto.disabled = false;
  if (btnPause) btnPause.disabled = true;
}
window.pauseRunHashChaining = pauseRunHashChaining;

function setHashChainingSpeed(val) {
  hashChainingSpeed = parseInt(val, 10);
  const label = document.getElementById('hash-chaining-speed-label');
  if (label) label.textContent = val + 'ms';
  if (hashChainingTimer) {
    pauseRunHashChaining();
    autoRunHashChaining();
  }
}
window.setHashChainingSpeed = setHashChainingSpeed;

// ------------------------------------------------------------------
// 6.2.2.1 Open addressing (linear probing) with lazy deletion (TOMBSTONE)
// ------------------------------------------------------------------
const hashOpenAddrFrames = [
  { buckets: new Array(8).fill(null), highlight: [], desc: 'Khởi tạo bảng băm định vị mở với capacity = 8, hash(key) = key % 8.' },
  { buckets: [null, null, null, null, { key: 12836, val: 'XiaoHa' }, null, null, null], highlight: [4], desc: 'put(12836, "XiaoHa"): hash = 12836 % 8 = 4 → bucket 4 trống → chèn trực tiếp.' },
  { buckets: [null, { key: 15937, val: 'XiaoLuo' }, null, null, { key: 12836, val: 'XiaoHa' }, null, null, null], highlight: [1], desc: 'put(15937, "XiaoLuo"): hash = 15937 % 8 = 1 → bucket 1 trống → chèn trực tiếp.' },
  { buckets: [null, { key: 15937, val: 'XiaoLuo' }, null, null, { key: 12836, val: 'XiaoHa' }, null, { key: 16750, val: 'XiaoSuan' }, null], highlight: [6], desc: 'put(16750, "XiaoSuan"): hash = 16750 % 8 = 6 → bucket 6 trống → chèn trực tiếp.' },
  { buckets: [null, { key: 15937, val: 'XiaoLuo' }, null, null, { key: 12836, val: 'XiaoHa' }, { key: 13276, val: 'XiaoFa' }, { key: 16750, val: 'XiaoSuan' }, null], highlight: [4, 5], desc: '⚠️ put(13276, "XiaoFa"): hash = 13276 % 8 = 4 → bucket 4 đã bị chiếm (xung đột)! Thăm dò tuyến tính sang bucket 5 (trống) → chèn vào đó.' },
  { buckets: [null, { key: 15937, val: 'XiaoLuo' }, null, null, { key: 12836, val: 'XiaoHa' }, { key: 13276, val: 'XiaoFa' }, { key: 16750, val: 'XiaoSuan' }, { key: 10583, val: 'XiaoYa' }], highlight: [7], desc: 'put(10583, "XiaoYa"): hash = 10583 % 8 = 7 → bucket 7 trống → chèn trực tiếp.' },
  { buckets: [null, { key: 15937, val: 'XiaoLuo' }, null, null, 'TOMBSTONE', { key: 13276, val: 'XiaoFa' }, { key: 16750, val: 'XiaoSuan' }, { key: 10583, val: 'XiaoYa' }], highlight: [4], desc: 'remove(12836): tìm thấy tại bucket 4 → KHÔNG xóa hẳn, mà đánh dấu TOMBSTONE (xóa lười) để không phá vỡ chuỗi thăm dò của các phần tử phía sau (như 13276).' },
  { buckets: [null, { key: 15937, val: 'XiaoLuo' }, null, null, 'TOMBSTONE', { key: 13276, val: 'XiaoFa' }, { key: 16750, val: 'XiaoSuan' }, { key: 10583, val: 'XiaoYa' }], highlight: [4, 5], desc: '✅ get(13276): hash = 4 → bucket 4 là TOMBSTONE (không phải trống!) → tiếp tục thăm dò sang bucket 5 → khớp key 13276 → trả về "XiaoFa". (Nếu bucket 4 là None thay vì TOMBSTONE, thuật toán sẽ dừng ngay và báo SAI là "không tìm thấy".)' },
  { buckets: [null, { key: 15937, val: 'XiaoLuo' }, null, null, { key: 20340, val: 'XiaoMoi' }, { key: 13276, val: 'XiaoFa' }, { key: 16750, val: 'XiaoSuan' }, { key: 10583, val: 'XiaoYa' }], highlight: [4], desc: '♻️ put(20340, "XiaoMoi"): hash = 20340 % 8 = 4 → gặp TOMBSTONE tại bucket 4, tiếp tục thăm dò (5,6,7 đều có key khác, 0 trống) → không tìm thấy key trùng → tái sử dụng vị trí TOMBSTONE đầu tiên (bucket 4) để chèn phần tử mới.' },
];
let hashOpenAddrIndex = 0;
let hashOpenAddrTimer = null;
let hashOpenAddrSpeed = 900;

function renderHashOpenAddr() {
  const frame = hashOpenAddrFrames[hashOpenAddrIndex];
  const container = document.getElementById('hash-open-addressing-canvas');
  if (container) {
    container.innerHTML = frame.buckets.map((p, i) => renderHashBucketCell(i, p, { highlighted: frame.highlight.includes(i) })).join('');
  }
  const statusEl = document.getElementById('hash-open-addressing-status');
  if (statusEl) statusEl.innerHTML = '<strong>Bước ' + (hashOpenAddrIndex + 1) + '/' + hashOpenAddrFrames.length + ':</strong> ' + frame.desc;
  const btnStep = document.getElementById('hash-open-addressing-btn-step');
  if (btnStep) btnStep.disabled = hashOpenAddrIndex >= hashOpenAddrFrames.length - 1;
}

function initHashOpenAddrDemo() {
  clearInterval(hashOpenAddrTimer);
  hashOpenAddrTimer = null;
  hashOpenAddrIndex = 0;
  renderHashOpenAddr();
  const btnPause = document.getElementById('hash-open-addressing-btn-pause');
  if (btnPause) btnPause.disabled = true;
  const btnAuto = document.getElementById('hash-open-addressing-btn-autorun');
  if (btnAuto) btnAuto.disabled = false;
}
window.initHashOpenAddrDemo = initHashOpenAddrDemo;

function stepHashOpenAddr() {
  if (hashOpenAddrIndex >= hashOpenAddrFrames.length - 1) return;
  hashOpenAddrIndex++;
  renderHashOpenAddr();
}
window.stepHashOpenAddr = stepHashOpenAddr;

function autoRunHashOpenAddr() {
  const btnAuto = document.getElementById('hash-open-addressing-btn-autorun');
  const btnPause = document.getElementById('hash-open-addressing-btn-pause');
  if (btnAuto) btnAuto.disabled = true;
  if (btnPause) btnPause.disabled = false;
  hashOpenAddrTimer = setInterval(() => {
    if (hashOpenAddrIndex >= hashOpenAddrFrames.length - 1) {
      pauseRunHashOpenAddr();
      return;
    }
    stepHashOpenAddr();
  }, hashOpenAddrSpeed);
}
window.autoRunHashOpenAddr = autoRunHashOpenAddr;

function pauseRunHashOpenAddr() {
  clearInterval(hashOpenAddrTimer);
  hashOpenAddrTimer = null;
  const btnAuto = document.getElementById('hash-open-addressing-btn-autorun');
  const btnPause = document.getElementById('hash-open-addressing-btn-pause');
  if (btnAuto) btnAuto.disabled = false;
  if (btnPause) btnPause.disabled = true;
}
window.pauseRunHashOpenAddr = pauseRunHashOpenAddr;

function setHashOpenAddrSpeed(val) {
  hashOpenAddrSpeed = parseInt(val, 10);
  const label = document.getElementById('hash-open-addressing-speed-label');
  if (label) label.textContent = val + 'ms';
  if (hashOpenAddrTimer) {
    pauseRunHashOpenAddr();
    autoRunHashOpenAddr();
  }
}
window.setHashOpenAddrSpeed = setHashOpenAddrSpeed;

// ==================================================================
// ── Interactive Widgets Logic for Chapter 7 (Tree) ──────────────────
// ==================================================================

// Shared indented-outline renderer for binary tree nodes (no new CSS
// classes needed — inline styles only, per established convention).
function renderTreeNodeLine(node, depth, highlightSet, label) {
  if (!node) return '';
  let valHtml = String(node.val);
  if (highlightSet.has(node.val)) {
    valHtml = '<span style="background:var(--accent-sky, #38bdf8); color:#000; padding:1px 8px; border-radius:4px; font-weight:700;">' + valHtml + '</span>';
  }
  const prefixLabel = label ? '<span style="color:var(--text-muted); font-size:11px; margin-right:8px;">' + label + '</span>' : '';
  let html = '<div style="margin-left:' + (depth * 26) + 'px; padding:3px 0; font-family:var(--font-mono); font-size:14px;">' + prefixLabel + valHtml + '</div>';
  html += renderTreeNodeLine(node.left, depth + 1, highlightSet, 'L');
  html += renderTreeNodeLine(node.right, depth + 1, highlightSet, 'R');
  return html;
}

function renderTreeWidget(containerId, root, highlightArr) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const hs = new Set(highlightArr || []);
  container.innerHTML = '<div style="padding:10px; display:inline-block; min-width:220px;">' +
    (root ? renderTreeNodeLine(root, 0, hs, null) : '<span style="color:var(--text-muted);">(cây rỗng)</span>') +
    '</div>';
}

// ------------------------------------------------------------------
// 7.2 Binary tree traversal: level-order (BFS), preorder, inorder,
// postorder on the same sample complete binary tree [1,2,3,4,5,6,7].
// ------------------------------------------------------------------
const TREE_TRAVERSAL_ROOT = { val: 1, left: { val: 2, left: { val: 4 }, right: { val: 5 } }, right: { val: 3, left: { val: 6 }, right: { val: 7 } } };
const TREE_TRAVERSAL_ORDERS = {
  level: [1, 2, 3, 4, 5, 6, 7],
  pre: [1, 2, 4, 5, 3, 6, 7],
  in: [4, 2, 5, 1, 6, 3, 7],
  post: [4, 5, 2, 6, 7, 3, 1],
};
const TREE_TRAVERSAL_LABELS = { level: 'Duyệt theo tầng (BFS)', pre: 'Tiền thứ tự', in: 'Trung thứ tự', post: 'Hậu thứ tự' };
let treeTraversalMode = 'level';
let treeTraversalIndex = -1;
let treeTraversalTimer = null;
let treeTraversalSpeed = 800;

function renderTreeTraversal() {
  const order = TREE_TRAVERSAL_ORDERS[treeTraversalMode];
  const idx = treeTraversalIndex;
  renderTreeWidget('tree-traversal-canvas', TREE_TRAVERSAL_ROOT, idx >= 0 ? [order[idx]] : []);
  const modeLabel = TREE_TRAVERSAL_LABELS[treeTraversalMode];
  const statusEl = document.getElementById('tree-traversal-status');
  if (statusEl) {
    if (idx < 0) {
      statusEl.innerHTML = '<strong>' + modeLabel + ':</strong> Nhấp "Auto Run" hoặc "Bước tiếp theo" để bắt đầu.';
    } else {
      const visited = order.slice(0, idx + 1);
      statusEl.innerHTML = '<strong>' + modeLabel + ' — Bước ' + (idx + 1) + '/' + order.length + ':</strong> Ghé thăm nút <strong>' + order[idx] + '</strong>. Thứ tự đã duyệt: [' + visited.join(', ') + ']';
    }
  }
  const btnStep = document.getElementById('tree-traversal-btn-step');
  if (btnStep) btnStep.disabled = idx >= order.length - 1;
}

function setTreeTraversalMode(mode) {
  pauseRunTreeTraversal();
  treeTraversalMode = mode;
  treeTraversalIndex = -1;
  renderTreeTraversal();
}
window.setTreeTraversalMode = setTreeTraversalMode;

function initTreeTraversalDemo() {
  clearInterval(treeTraversalTimer);
  treeTraversalTimer = null;
  treeTraversalIndex = -1;
  renderTreeTraversal();
  const btnPause = document.getElementById('tree-traversal-btn-pause');
  if (btnPause) btnPause.disabled = true;
  const btnAuto = document.getElementById('tree-traversal-btn-autorun');
  if (btnAuto) btnAuto.disabled = false;
}
window.initTreeTraversalDemo = initTreeTraversalDemo;

function stepTreeTraversal() {
  const order = TREE_TRAVERSAL_ORDERS[treeTraversalMode];
  if (treeTraversalIndex >= order.length - 1) return;
  treeTraversalIndex++;
  renderTreeTraversal();
}
window.stepTreeTraversal = stepTreeTraversal;

function autoRunTreeTraversal() {
  const btnAuto = document.getElementById('tree-traversal-btn-autorun');
  const btnPause = document.getElementById('tree-traversal-btn-pause');
  if (btnAuto) btnAuto.disabled = true;
  if (btnPause) btnPause.disabled = false;
  treeTraversalTimer = setInterval(() => {
    const order = TREE_TRAVERSAL_ORDERS[treeTraversalMode];
    if (treeTraversalIndex >= order.length - 1) {
      pauseRunTreeTraversal();
      return;
    }
    stepTreeTraversal();
  }, treeTraversalSpeed);
}
window.autoRunTreeTraversal = autoRunTreeTraversal;

function pauseRunTreeTraversal() {
  clearInterval(treeTraversalTimer);
  treeTraversalTimer = null;
  const btnAuto = document.getElementById('tree-traversal-btn-autorun');
  const btnPause = document.getElementById('tree-traversal-btn-pause');
  if (btnAuto) btnAuto.disabled = false;
  if (btnPause) btnPause.disabled = true;
}
window.pauseRunTreeTraversal = pauseRunTreeTraversal;

function setTreeTraversalSpeed(val) {
  treeTraversalSpeed = parseInt(val, 10);
  const label = document.getElementById('tree-traversal-speed-label');
  if (label) label.textContent = val + 'ms';
  if (treeTraversalTimer) {
    pauseRunTreeTraversal();
    autoRunTreeTraversal();
  }
}
window.setTreeTraversalSpeed = setTreeTraversalSpeed;

// ------------------------------------------------------------------
// 7.4 Binary search tree: search / insert / remove (degree 0, 1, 2)
// on the perfect BST built from [8,4,12,2,6,10,14,1,3,5,7,9,11,13,15]
// — mirrors the exact demo sequence from hello-algo's own driver code.
// ------------------------------------------------------------------
const BST_OPS_TREE_SEARCH = { val: 8, left: { val: 4, left: { val: 2, left: { val: 1 }, right: { val: 3 } }, right: { val: 6, left: { val: 5 }, right: { val: 7 } } }, right: { val: 12, left: { val: 10, left: { val: 9 }, right: { val: 11 } }, right: { val: 14, left: { val: 13 }, right: { val: 15 } } } };
const BST_OPS_TREE_INSERTED = { val: 8, left: { val: 4, left: { val: 2, left: { val: 1 }, right: { val: 3 } }, right: { val: 6, left: { val: 5 }, right: { val: 7 } } }, right: { val: 12, left: { val: 10, left: { val: 9 }, right: { val: 11 } }, right: { val: 14, left: { val: 13 }, right: { val: 15, right: { val: 16 } } } } };
const BST_OPS_TREE_REMOVED_1 = { val: 8, left: { val: 4, left: { val: 2, right: { val: 3 } }, right: { val: 6, left: { val: 5 }, right: { val: 7 } } }, right: { val: 12, left: { val: 10, left: { val: 9 }, right: { val: 11 } }, right: { val: 14, left: { val: 13 }, right: { val: 15, right: { val: 16 } } } } };
const BST_OPS_TREE_REMOVED_2 = { val: 8, left: { val: 4, left: { val: 3 }, right: { val: 6, left: { val: 5 }, right: { val: 7 } } }, right: { val: 12, left: { val: 10, left: { val: 9 }, right: { val: 11 } }, right: { val: 14, left: { val: 13 }, right: { val: 15, right: { val: 16 } } } } };
const BST_OPS_TREE_REMOVED_4 = { val: 8, left: { val: 5, left: { val: 3 }, right: { val: 6, right: { val: 7 } } }, right: { val: 12, left: { val: 10, left: { val: 9 }, right: { val: 11 } }, right: { val: 14, left: { val: 13 }, right: { val: 15, right: { val: 16 } } } } };

const bstOpsFrames = [
  { tree: BST_OPS_TREE_SEARCH, highlight: [], desc: 'Cây tìm kiếm nhị phân ban đầu, được xây dựng từ dãy chèn [8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7, 9, 11, 13, 15] (một cây hoàn hảo).' },
  { tree: BST_OPS_TREE_SEARCH, highlight: [8], desc: 'search(7): tại nút 8, vì 8 &gt; 7 nên đi sang cây con trái.' },
  { tree: BST_OPS_TREE_SEARCH, highlight: [4], desc: 'search(7): tại nút 4, vì 4 &lt; 7 nên đi sang cây con phải.' },
  { tree: BST_OPS_TREE_SEARCH, highlight: [6], desc: 'search(7): tại nút 6, vì 6 &lt; 7 nên đi sang cây con phải.' },
  { tree: BST_OPS_TREE_SEARCH, highlight: [7], desc: 'search(7): tại nút 7, vì 7 = 7 nên đã tìm thấy nút mục tiêu!' },
  { tree: BST_OPS_TREE_INSERTED, highlight: [16], desc: 'insert(16): tìm vị trí chèn theo đường đi 8 → 12 → 14 → 15, rồi chèn 16 làm con phải của 15.' },
  { tree: BST_OPS_TREE_REMOVED_1, highlight: [2], desc: 'remove(1): nút 1 là nút lá (bậc 0) → xóa trực tiếp, con trái của nút 2 trở thành rỗng.' },
  { tree: BST_OPS_TREE_REMOVED_2, highlight: [3], desc: 'remove(2): nút 2 chỉ có 1 con (bậc 1) → thay thế trực tiếp nút 2 bằng con của nó là 3.' },
  { tree: BST_OPS_TREE_REMOVED_4, highlight: [5], desc: 'remove(4): nút 4 có 2 con (bậc 2) → tìm nút kế tiếp theo thứ tự trung thứ tự (nút nhỏ nhất trong cây con phải) là 5, thay giá trị của 4 bằng 5, rồi đệ quy xóa nút 5 gốc.' },
];
let bstOpsIndex = 0;
let bstOpsTimer = null;
let bstOpsSpeed = 800;

function renderBstOps() {
  const frame = bstOpsFrames[bstOpsIndex];
  renderTreeWidget('bst-ops-canvas', frame.tree, frame.highlight);
  const statusEl = document.getElementById('bst-ops-status');
  if (statusEl) statusEl.innerHTML = '<strong>Bước ' + (bstOpsIndex + 1) + '/' + bstOpsFrames.length + ':</strong> ' + frame.desc;
  const btnStep = document.getElementById('bst-ops-btn-step');
  if (btnStep) btnStep.disabled = bstOpsIndex >= bstOpsFrames.length - 1;
}

function initBstOpsDemo() {
  clearInterval(bstOpsTimer);
  bstOpsTimer = null;
  bstOpsIndex = 0;
  renderBstOps();
  const btnPause = document.getElementById('bst-ops-btn-pause');
  if (btnPause) btnPause.disabled = true;
  const btnAuto = document.getElementById('bst-ops-btn-autorun');
  if (btnAuto) btnAuto.disabled = false;
}
window.initBstOpsDemo = initBstOpsDemo;

function stepBstOps() {
  if (bstOpsIndex >= bstOpsFrames.length - 1) return;
  bstOpsIndex++;
  renderBstOps();
}
window.stepBstOps = stepBstOps;

function autoRunBstOps() {
  const btnAuto = document.getElementById('bst-ops-btn-autorun');
  const btnPause = document.getElementById('bst-ops-btn-pause');
  if (btnAuto) btnAuto.disabled = true;
  if (btnPause) btnPause.disabled = false;
  bstOpsTimer = setInterval(() => {
    if (bstOpsIndex >= bstOpsFrames.length - 1) {
      pauseRunBstOps();
      return;
    }
    stepBstOps();
  }, bstOpsSpeed);
}
window.autoRunBstOps = autoRunBstOps;

function pauseRunBstOps() {
  clearInterval(bstOpsTimer);
  bstOpsTimer = null;
  const btnAuto = document.getElementById('bst-ops-btn-autorun');
  const btnPause = document.getElementById('bst-ops-btn-pause');
  if (btnAuto) btnAuto.disabled = false;
  if (btnPause) btnPause.disabled = true;
}
window.pauseRunBstOps = pauseRunBstOps;

function setBstOpsSpeed(val) {
  bstOpsSpeed = parseInt(val, 10);
  const label = document.getElementById('bst-ops-speed-label');
  if (label) label.textContent = val + 'ms';
  if (bstOpsTimer) {
    pauseRunBstOps();
    autoRunBstOps();
  }
}
window.setBstOpsSpeed = setBstOpsSpeed;

// ------------------------------------------------------------------
// 7.5 AVL tree: inserting 3, 2, 1 (descending) triggers a right
// rotation — the exact case illustrated in section 7.5.2.1.
// ------------------------------------------------------------------
const avlRotateFrames = [
  { tree: null, highlight: [], desc: 'Cây AVL rỗng ban đầu.' },
  { tree: { val: 3 }, highlight: [3], desc: 'insert(3): cây rỗng → 3 trở thành nút gốc.' },
  { tree: { val: 3, left: { val: 2 } }, highlight: [2], desc: 'insert(2): 2 &lt; 3 → chèn làm con trái của 3. Hệ số cân bằng của nút 3 là 1 (vẫn cân bằng).' },
  { tree: { val: 3, left: { val: 2, left: { val: 1 } } }, highlight: [1], desc: 'insert(1): 1 &lt; 3 → trái; 1 &lt; 2 → trái → chèn làm con trái của 2. Nút 3 có hệ số cân bằng = 2 (mất cân bằng, nghiêng trái).' },
  { tree: { val: 2, left: { val: 1 }, right: { val: 3 } }, highlight: [2], desc: 'Hệ số cân bằng của con (nút 2) là ≥ 0 → thực hiện XOAY PHẢI tại nút 3. Nút 2 trở thành gốc mới, 1 là con trái, 3 là con phải → cây khôi phục cân bằng hoàn toàn.' },
];
let avlRotateIndex = 0;
let avlRotateTimer = null;
let avlRotateSpeed = 1000;

function renderAvlRotate() {
  const frame = avlRotateFrames[avlRotateIndex];
  renderTreeWidget('avl-rotate-canvas', frame.tree, frame.highlight);
  const statusEl = document.getElementById('avl-rotate-status');
  if (statusEl) statusEl.innerHTML = '<strong>Bước ' + (avlRotateIndex + 1) + '/' + avlRotateFrames.length + ':</strong> ' + frame.desc;
  const btnStep = document.getElementById('avl-rotate-btn-step');
  if (btnStep) btnStep.disabled = avlRotateIndex >= avlRotateFrames.length - 1;
}

function initAvlRotateDemo() {
  clearInterval(avlRotateTimer);
  avlRotateTimer = null;
  avlRotateIndex = 0;
  renderAvlRotate();
  const btnPause = document.getElementById('avl-rotate-btn-pause');
  if (btnPause) btnPause.disabled = true;
  const btnAuto = document.getElementById('avl-rotate-btn-autorun');
  if (btnAuto) btnAuto.disabled = false;
}
window.initAvlRotateDemo = initAvlRotateDemo;

function stepAvlRotate() {
  if (avlRotateIndex >= avlRotateFrames.length - 1) return;
  avlRotateIndex++;
  renderAvlRotate();
}
window.stepAvlRotate = stepAvlRotate;

function autoRunAvlRotate() {
  const btnAuto = document.getElementById('avl-rotate-btn-autorun');
  const btnPause = document.getElementById('avl-rotate-btn-pause');
  if (btnAuto) btnAuto.disabled = true;
  if (btnPause) btnPause.disabled = false;
  avlRotateTimer = setInterval(() => {
    if (avlRotateIndex >= avlRotateFrames.length - 1) {
      pauseRunAvlRotate();
      return;
    }
    stepAvlRotate();
  }, avlRotateSpeed);
}
window.autoRunAvlRotate = autoRunAvlRotate;

function pauseRunAvlRotate() {
  clearInterval(avlRotateTimer);
  avlRotateTimer = null;
  const btnAuto = document.getElementById('avl-rotate-btn-autorun');
  const btnPause = document.getElementById('avl-rotate-btn-pause');
  if (btnAuto) btnAuto.disabled = false;
  if (btnPause) btnPause.disabled = true;
}
window.pauseRunAvlRotate = pauseRunAvlRotate;

function setAvlRotateSpeed(val) {
  avlRotateSpeed = parseInt(val, 10);
  const label = document.getElementById('avl-rotate-speed-label');
  if (label) label.textContent = val + 'ms';
  if (avlRotateTimer) {
    pauseRunAvlRotate();
    autoRunAvlRotate();
  }
}
window.setAvlRotateSpeed = setAvlRotateSpeed;

// ── Interactive Widgets Logic for Chapter 8 (Heap) ──────────────────
// ==================================================================

// Build a {val,left,right} tree object from a complete-binary-tree array
// representation (index i -> left 2i+1, right 2i+2), reusing renderTreeWidget.
function buildTreeFromArray(arr) {
  function build(i) {
    if (i >= arr.length) return null;
    return { val: arr[i], left: build(2 * i + 1), right: build(2 * i + 2) };
  }
  return arr.length ? build(0) : null;
}

// Render an array as a row of boxes (reuses renderOpsCell), highlighting
// the given indices.
function renderHeapArrayRow(containerId, arr, highlightArr) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const hs = new Set(highlightArr || []);
  if (!arr.length) {
    container.innerHTML = '<span style="color:var(--text-muted);">(mảng rỗng)</span>';
    return;
  }
  container.innerHTML = arr.map((v, i) => renderOpsCell(v, i, { highlighted: hs.has(i) })).join('');
}

// ------------------------------------------------------------------
// 8.1 Heap: push(1,3,2,5,4) then pop() on a Max Heap, shown as both a
// tree and an array simultaneously.
// ------------------------------------------------------------------
const HEAP_OPS_FRAMES = [
  { arr: [], highlight: [], desc: "Heap rỗng ban đầu." },
  { arr: [1], highlight: [0], desc: "push(1): thêm 1 vào cuối mảng (đáy heap)." },
  { arr: [1], highlight: [], desc: "push(1) hoàn tất. Heap hợp lệ." },
  { arr: [1, 3], highlight: [1], desc: "push(3): thêm 3 vào cuối mảng (đáy heap)." },
  { arr: [3, 1], highlight: [1, 0], desc: "So sánh với nút cha (giá trị 3), lớn hơn nên hoán đổi." },
  { arr: [3, 1], highlight: [], desc: "push(3) hoàn tất. Heap hợp lệ." },
  { arr: [3, 1, 2], highlight: [2], desc: "push(2): thêm 2 vào cuối mảng (đáy heap)." },
  { arr: [3, 1, 2], highlight: [], desc: "push(2) hoàn tất. Heap hợp lệ." },
  { arr: [3, 1, 2, 5], highlight: [3], desc: "push(5): thêm 5 vào cuối mảng (đáy heap)." },
  { arr: [3, 5, 2, 1], highlight: [3, 1], desc: "So sánh với nút cha (giá trị 5), lớn hơn nên hoán đổi." },
  { arr: [5, 3, 2, 1], highlight: [1, 0], desc: "So sánh với nút cha (giá trị 5), lớn hơn nên hoán đổi." },
  { arr: [5, 3, 2, 1], highlight: [], desc: "push(5) hoàn tất. Heap hợp lệ." },
  { arr: [5, 3, 2, 1, 4], highlight: [4], desc: "push(4): thêm 4 vào cuối mảng (đáy heap)." },
  { arr: [5, 4, 2, 1, 3], highlight: [4, 1], desc: "So sánh với nút cha (giá trị 4), lớn hơn nên hoán đổi." },
  { arr: [5, 4, 2, 1, 3], highlight: [], desc: "push(4) hoàn tất. Heap hợp lệ." },
  { arr: [3, 4, 2, 1, 5], highlight: [0, 4], desc: "pop(): hoán đổi đỉnh (5) với phần tử cuối (3)." },
  { arr: [3, 4, 2, 1], highlight: [], desc: "Xóa phần tử cuối mảng (đỉnh cũ = 5) khỏi heap." },
  { arr: [4, 3, 2, 1], highlight: [0, 1], desc: "So sánh nút với 2 con, hoán đổi với con lớn hơn (giá trị 4)." },
  { arr: [4, 3, 2, 1], highlight: [], desc: "pop() hoàn tất, giá trị 5 đã được lấy ra." },
];
let heapOpsIndex = 0;
let heapOpsTimer = null;
let heapOpsSpeed = 800;

function renderHeapOps() {
  const frame = HEAP_OPS_FRAMES[heapOpsIndex];
  renderTreeWidget('heap-ops-tree', buildTreeFromArray(frame.arr), frame.highlight);
  renderHeapArrayRow('heap-ops-array', frame.arr, frame.highlight);
  const statusEl = document.getElementById('heap-ops-status');
  if (statusEl) statusEl.innerHTML = '<strong>Bước ' + (heapOpsIndex + 1) + '/' + HEAP_OPS_FRAMES.length + ':</strong> ' + frame.desc;
  const btnStep = document.getElementById('heap-ops-btn-step');
  if (btnStep) btnStep.disabled = heapOpsIndex >= HEAP_OPS_FRAMES.length - 1;
}

function initHeapOpsDemo() {
  clearInterval(heapOpsTimer);
  heapOpsTimer = null;
  heapOpsIndex = 0;
  renderHeapOps();
  const btnPause = document.getElementById('heap-ops-btn-pause');
  if (btnPause) btnPause.disabled = true;
  const btnAuto = document.getElementById('heap-ops-btn-autorun');
  if (btnAuto) btnAuto.disabled = false;
}
window.initHeapOpsDemo = initHeapOpsDemo;

function stepHeapOps() {
  if (heapOpsIndex >= HEAP_OPS_FRAMES.length - 1) return;
  heapOpsIndex++;
  renderHeapOps();
}
window.stepHeapOps = stepHeapOps;

function autoRunHeapOps() {
  const btnAuto = document.getElementById('heap-ops-btn-autorun');
  const btnPause = document.getElementById('heap-ops-btn-pause');
  if (btnAuto) btnAuto.disabled = true;
  if (btnPause) btnPause.disabled = false;
  heapOpsTimer = setInterval(() => {
    if (heapOpsIndex >= HEAP_OPS_FRAMES.length - 1) {
      pauseRunHeapOps();
      return;
    }
    stepHeapOps();
  }, heapOpsSpeed);
}
window.autoRunHeapOps = autoRunHeapOps;

function pauseRunHeapOps() {
  clearInterval(heapOpsTimer);
  heapOpsTimer = null;
  const btnAuto = document.getElementById('heap-ops-btn-autorun');
  const btnPause = document.getElementById('heap-ops-btn-pause');
  if (btnAuto) btnAuto.disabled = false;
  if (btnPause) btnPause.disabled = true;
}
window.pauseRunHeapOps = pauseRunHeapOps;

function setHeapOpsSpeed(val) {
  heapOpsSpeed = parseInt(val, 10);
  const label = document.getElementById('heap-ops-speed-label');
  if (label) label.textContent = val + 'ms';
  if (heapOpsTimer) {
    pauseRunHeapOps();
    autoRunHeapOps();
  }
}
window.setHeapOpsSpeed = setHeapOpsSpeed;

// ------------------------------------------------------------------
// 8.2 Build Heap: bottom-up heapify (reverse level-order sift-down,
// skipping leaves) turning [4,2,8,1,9,5,3] into a valid Max Heap.
// ------------------------------------------------------------------
const BUILD_HEAP_FRAMES = [
  { arr: [4, 2, 8, 1, 9, 5, 3], highlight: [], desc: "Mảng đầu vào [4, 2, 8, 1, 9, 5, 3] — chưa phải Heap hợp lệ." },
  { arr: [4, 2, 8, 1, 9, 5, 3], highlight: [], desc: "Nút lá không cần Heapify. Bắt đầu từ nút cha cuối cùng (chỉ số 2), duyệt ngược về gốc." },
  { arr: [4, 2, 8, 1, 9, 5, 3], highlight: [2], desc: "Bắt đầu Sift Down cho nút tại chỉ số 2 (giá trị 8)." },
  { arr: [4, 2, 8, 1, 9, 5, 3], highlight: [2], desc: "Nút tại chỉ số 2 (giá trị 8) đã lớn hơn cả hai con → dừng Sift Down cho nút này." },
  { arr: [4, 2, 8, 1, 9, 5, 3], highlight: [1], desc: "Bắt đầu Sift Down cho nút tại chỉ số 1 (giá trị 2)." },
  { arr: [4, 9, 8, 1, 2, 5, 3], highlight: [1, 4], desc: "Nút tại chỉ số 1 nhỏ hơn con lớn nhất → hoán đổi (giá trị 9 và 2)." },
  { arr: [4, 9, 8, 1, 2, 5, 3], highlight: [4], desc: "Nút tại chỉ số 4 (giá trị 2) đã lớn hơn cả hai con → dừng Sift Down cho nút này." },
  { arr: [4, 9, 8, 1, 2, 5, 3], highlight: [0], desc: "Bắt đầu Sift Down cho nút tại chỉ số 0 (giá trị 4)." },
  { arr: [9, 4, 8, 1, 2, 5, 3], highlight: [0, 1], desc: "Nút tại chỉ số 0 nhỏ hơn con lớn nhất → hoán đổi (giá trị 9 và 4)." },
  { arr: [9, 4, 8, 1, 2, 5, 3], highlight: [1], desc: "Nút tại chỉ số 1 (giá trị 4) đã lớn hơn cả hai con → dừng Sift Down cho nút này." },
  { arr: [9, 4, 8, 1, 2, 5, 3], highlight: [], desc: "Hoàn tất! Mảng [9, 4, 8, 1, 2, 5, 3] giờ đã là một Max Heap hợp lệ." },
];
let buildHeapIndex = 0;
let buildHeapTimer = null;
let buildHeapSpeed = 900;

function renderBuildHeap() {
  const frame = BUILD_HEAP_FRAMES[buildHeapIndex];
  renderTreeWidget('build-heap-tree', buildTreeFromArray(frame.arr), frame.highlight);
  renderHeapArrayRow('build-heap-array', frame.arr, frame.highlight);
  const statusEl = document.getElementById('build-heap-status');
  if (statusEl) statusEl.innerHTML = '<strong>Bước ' + (buildHeapIndex + 1) + '/' + BUILD_HEAP_FRAMES.length + ':</strong> ' + frame.desc;
  const btnStep = document.getElementById('build-heap-btn-step');
  if (btnStep) btnStep.disabled = buildHeapIndex >= BUILD_HEAP_FRAMES.length - 1;
}

function initBuildHeapDemo() {
  clearInterval(buildHeapTimer);
  buildHeapTimer = null;
  buildHeapIndex = 0;
  renderBuildHeap();
  const btnPause = document.getElementById('build-heap-btn-pause');
  if (btnPause) btnPause.disabled = true;
  const btnAuto = document.getElementById('build-heap-btn-autorun');
  if (btnAuto) btnAuto.disabled = false;
}
window.initBuildHeapDemo = initBuildHeapDemo;

function stepBuildHeap() {
  if (buildHeapIndex >= BUILD_HEAP_FRAMES.length - 1) return;
  buildHeapIndex++;
  renderBuildHeap();
}
window.stepBuildHeap = stepBuildHeap;

function autoRunBuildHeap() {
  const btnAuto = document.getElementById('build-heap-btn-autorun');
  const btnPause = document.getElementById('build-heap-btn-pause');
  if (btnAuto) btnAuto.disabled = true;
  if (btnPause) btnPause.disabled = false;
  buildHeapTimer = setInterval(() => {
    if (buildHeapIndex >= BUILD_HEAP_FRAMES.length - 1) {
      pauseRunBuildHeap();
      return;
    }
    stepBuildHeap();
  }, buildHeapSpeed);
}
window.autoRunBuildHeap = autoRunBuildHeap;

function pauseRunBuildHeap() {
  clearInterval(buildHeapTimer);
  buildHeapTimer = null;
  const btnAuto = document.getElementById('build-heap-btn-autorun');
  const btnPause = document.getElementById('build-heap-btn-pause');
  if (btnAuto) btnAuto.disabled = false;
  if (btnPause) btnPause.disabled = true;
}
window.pauseRunBuildHeap = pauseRunBuildHeap;

function setBuildHeapSpeed(val) {
  buildHeapSpeed = parseInt(val, 10);
  const label = document.getElementById('build-heap-speed-label');
  if (label) label.textContent = val + 'ms';
  if (buildHeapTimer) {
    pauseRunBuildHeap();
    autoRunBuildHeap();
  }
}
window.setBuildHeapSpeed = setBuildHeapSpeed;

// ------------------------------------------------------------------
// 8.3 Top-k problem: find the largest k=3 elements of [1,7,6,3,2]
// using a size-limited Min Heap — mirrors hello-algo's own driver code.
// ------------------------------------------------------------------
const TOP_K_NUMS = [1, 7, 6, 3, 2];
const TOP_K_FRAMES = [
  { arr: [], highlight: [], nums_idx: -1, desc: "Mảng nguồn: [1, 7, 6, 3, 2], k = 3. Khởi tạo Min Heap rỗng." },
  { arr: [1], highlight: [0], nums_idx: 0, desc: "Đưa 3 phần tử đầu tiên vào heap: thêm nums[0] = 1." },
  { arr: [1, 7], highlight: [1], nums_idx: 1, desc: "Đưa 3 phần tử đầu tiên vào heap: thêm nums[1] = 7." },
  { arr: [1, 7, 6], highlight: [2], nums_idx: 2, desc: "Đưa 3 phần tử đầu tiên vào heap: thêm nums[2] = 6." },
  { arr: [1, 7, 6], highlight: [0], nums_idx: 2, desc: "Heap đã có đủ 3 phần tử. Đỉnh heap hiện tại = 1 (nhỏ nhất trong 3 phần tử)." },
  { arr: [3, 7, 6], highlight: [0], nums_idx: 3, desc: "nums[3] = 3 &gt; đỉnh heap (1) → loại 1, thêm 3 vào heap." },
  { arr: [3, 7, 6], highlight: [0], nums_idx: 4, desc: "nums[4] = 2 &le; đỉnh heap (3) → bỏ qua, không đưa vào heap." },
  { arr: [3, 7, 6], highlight: [0, 1, 2], nums_idx: 4, desc: "Duyệt xong mảng. 3 phần tử còn lại trong heap [3, 6, 7] chính là Top-3 lớn nhất." },
];
let topKIndex = 0;
let topKTimer = null;
let topKSpeed = 1000;

function renderTopK() {
  const frame = TOP_K_FRAMES[topKIndex];
  const numsHighlight = frame.nums_idx >= 0 ? [frame.nums_idx] : [];
  renderHeapArrayRow('top-k-nums', TOP_K_NUMS, numsHighlight);
  renderHeapArrayRow('top-k-heap', frame.arr, frame.highlight);
  const statusEl = document.getElementById('top-k-status');
  if (statusEl) statusEl.innerHTML = '<strong>Bước ' + (topKIndex + 1) + '/' + TOP_K_FRAMES.length + ':</strong> ' + frame.desc;
  const btnStep = document.getElementById('top-k-btn-step');
  if (btnStep) btnStep.disabled = topKIndex >= TOP_K_FRAMES.length - 1;
}

function initTopKDemo() {
  clearInterval(topKTimer);
  topKTimer = null;
  topKIndex = 0;
  renderTopK();
  const btnPause = document.getElementById('top-k-btn-pause');
  if (btnPause) btnPause.disabled = true;
  const btnAuto = document.getElementById('top-k-btn-autorun');
  if (btnAuto) btnAuto.disabled = false;
}
window.initTopKDemo = initTopKDemo;

function stepTopK() {
  if (topKIndex >= TOP_K_FRAMES.length - 1) return;
  topKIndex++;
  renderTopK();
}
window.stepTopK = stepTopK;

function autoRunTopK() {
  const btnAuto = document.getElementById('top-k-btn-autorun');
  const btnPause = document.getElementById('top-k-btn-pause');
  if (btnAuto) btnAuto.disabled = true;
  if (btnPause) btnPause.disabled = false;
  topKTimer = setInterval(() => {
    if (topKIndex >= TOP_K_FRAMES.length - 1) {
      pauseRunTopK();
      return;
    }
    stepTopK();
  }, topKSpeed);
}
window.autoRunTopK = autoRunTopK;

function pauseRunTopK() {
  clearInterval(topKTimer);
  topKTimer = null;
  const btnAuto = document.getElementById('top-k-btn-autorun');
  const btnPause = document.getElementById('top-k-btn-pause');
  if (btnAuto) btnAuto.disabled = false;
  if (btnPause) btnPause.disabled = true;
}
window.pauseRunTopK = pauseRunTopK;

function setTopKSpeed(val) {
  topKSpeed = parseInt(val, 10);
  const label = document.getElementById('top-k-speed-label');
  if (label) label.textContent = val + 'ms';
  if (topKTimer) {
    pauseRunTopK();
    autoRunTopK();
  }
}
window.setTopKSpeed = setTopKSpeed;

// ── Interactive Widgets Logic for Chapter 9 (Graph) ─────────────────
// Đồ thị lưới 3x3 mẫu (9 đỉnh, đánh số 0-8), khớp với đồ thị dùng trong
// mã nguồn driver của hello-algo (graph_bfs.py / graph_dfs.py), giữ nguyên
// thứ tự kề được xây dựng từ danh sách cạnh gốc.
const GRAPH_TRAVERSAL_POS = {
  0: [0, 0], 1: [0, 1], 2: [0, 2],
  3: [1, 0], 4: [1, 1], 5: [1, 2],
  6: [2, 0], 7: [2, 1], 8: [2, 2],
};

const GRAPH_BFS_FRAMES = [
  { res: [], current: null, visited: [0], desc: 'Bắt đầu: đưa đỉnh 0 vào hàng đợi và đánh dấu đã thăm.' },
  { res: [0], current: 0, visited: [0, 1, 3], desc: 'Lấy đỉnh 0 ra khỏi hàng đợi, ghi nhận vào kết quả. Thêm các đỉnh kề chưa thăm 1, 3 vào hàng đợi.' },
  { res: [0, 1], current: 1, visited: [0, 1, 3, 2, 4], desc: 'Lấy đỉnh 1 ra khỏi hàng đợi. Thêm các đỉnh kề chưa thăm 2, 4 vào hàng đợi.' },
  { res: [0, 1, 3], current: 3, visited: [0, 1, 3, 2, 4, 6], desc: 'Lấy đỉnh 3 ra khỏi hàng đợi. Thêm đỉnh kề chưa thăm 6 vào hàng đợi.' },
  { res: [0, 1, 3, 2], current: 2, visited: [0, 1, 3, 2, 4, 6, 5], desc: 'Lấy đỉnh 2 ra khỏi hàng đợi. Thêm đỉnh kề chưa thăm 5 vào hàng đợi.' },
  { res: [0, 1, 3, 2, 4], current: 4, visited: [0, 1, 3, 2, 4, 6, 5, 7], desc: 'Lấy đỉnh 4 ra khỏi hàng đợi. Thêm đỉnh kề chưa thăm 7 vào hàng đợi.' },
  { res: [0, 1, 3, 2, 4, 6], current: 6, visited: [0, 1, 3, 2, 4, 6, 5, 7], desc: 'Lấy đỉnh 6 ra khỏi hàng đợi. Tất cả đỉnh kề (3, 7) đều đã thăm.' },
  { res: [0, 1, 3, 2, 4, 6, 5], current: 5, visited: [0, 1, 3, 2, 4, 6, 5, 7, 8], desc: 'Lấy đỉnh 5 ra khỏi hàng đợi. Thêm đỉnh kề chưa thăm 8 vào hàng đợi.' },
  { res: [0, 1, 3, 2, 4, 6, 5, 7], current: 7, visited: [0, 1, 3, 2, 4, 6, 5, 7, 8], desc: 'Lấy đỉnh 7 ra khỏi hàng đợi. Tất cả đỉnh kề đều đã thăm.' },
  { res: [0, 1, 3, 2, 4, 6, 5, 7, 8], current: 8, visited: [0, 1, 3, 2, 4, 6, 5, 7, 8], desc: 'Lấy đỉnh 8 ra khỏi hàng đợi. Hàng đợi rỗng, hoàn tất BFS!' },
];

const GRAPH_DFS_FRAMES = [
  { res: [0], current: 0, visited: [0], desc: 'Thăm đỉnh xuất phát 0.' },
  { res: [0, 1], current: 1, visited: [0, 1], desc: 'Đệ quy đi xuống đỉnh kề chưa thăm đầu tiên của 0: đỉnh 1.' },
  { res: [0, 1, 2], current: 2, visited: [0, 1, 2], desc: 'Đệ quy đi xuống đỉnh kề chưa thăm đầu tiên của 1: đỉnh 2.' },
  { res: [0, 1, 2, 5], current: 5, visited: [0, 1, 2, 5], desc: 'Đệ quy đi xuống đỉnh kề chưa thăm đầu tiên của 2: đỉnh 5.' },
  { res: [0, 1, 2, 5, 4], current: 4, visited: [0, 1, 2, 5, 4], desc: 'Đệ quy đi xuống đỉnh kề chưa thăm đầu tiên của 5: đỉnh 4.' },
  { res: [0, 1, 2, 5, 4, 3], current: 3, visited: [0, 1, 2, 5, 4, 3], desc: 'Đệ quy đi xuống đỉnh kề chưa thăm đầu tiên của 4: đỉnh 3.' },
  { res: [0, 1, 2, 5, 4, 3, 6], current: 6, visited: [0, 1, 2, 5, 4, 3, 6], desc: 'Đệ quy đi xuống đỉnh kề chưa thăm đầu tiên của 3: đỉnh 6.' },
  { res: [0, 1, 2, 5, 4, 3, 6, 7], current: 7, visited: [0, 1, 2, 5, 4, 3, 6, 7], desc: 'Đệ quy đi xuống đỉnh kề chưa thăm đầu tiên của 6: đỉnh 7.' },
  { res: [0, 1, 2, 5, 4, 3, 6, 7, 8], current: 8, visited: [0, 1, 2, 5, 4, 3, 6, 7, 8], desc: 'Đệ quy đi xuống đỉnh kề chưa thăm đầu tiên của 7: đỉnh 8. Mọi đỉnh kề đều đã thăm nên lần lượt quay lui về đỉnh 0. Hoàn tất DFS!' },
];

let graphTraversalMode = 'bfs';
let graphTraversalIndex = 0;
let graphTraversalTimer = null;
let graphTraversalSpeed = 800;

function graphTraversalFrames() {
  return graphTraversalMode === 'bfs' ? GRAPH_BFS_FRAMES : GRAPH_DFS_FRAMES;
}

function renderGraphTraversalGrid() {
  const container = document.getElementById('graph-traversal-canvas');
  if (!container) return;
  const frame = graphTraversalFrames()[graphTraversalIndex];
  const visitedSet = new Set(frame.visited);
  let html = '<div style="display:grid; grid-template-columns: repeat(3, 56px); grid-template-rows: repeat(3, 56px); gap:10px;">';
  const cells = new Array(9);
  for (const v in GRAPH_TRAVERSAL_POS) {
    const [r, c] = GRAPH_TRAVERSAL_POS[v];
    const idx = r * 3 + c;
    const isCurrent = frame.current === parseInt(v, 10);
    const isVisited = visitedSet.has(parseInt(v, 10));
    let bg = 'transparent', border = 'var(--border-color)', color = 'var(--text-secondary)';
    if (isCurrent) { bg = 'var(--accent)'; border = 'var(--accent)'; color = '#fff'; }
    else if (isVisited) { bg = 'rgba(16, 185, 129, 0.15)'; border = 'rgb(16, 185, 129)'; color = 'var(--text-primary)'; }
    cells[idx] = `<div style="width:56px; height:56px; display:flex; align-items:center; justify-content:center; border-radius:var(--radius-md); border:2px solid ${border}; background:${bg}; color:${color}; font-weight:600;">${v}</div>`;
  }
  html += cells.join('') + '</div>';
  container.innerHTML = html;

  const resultEl = document.getElementById('graph-traversal-result');
  if (resultEl) resultEl.textContent = frame.res.join(' → ') || '(chưa có)';
  const statusEl = document.getElementById('graph-traversal-status');
  if (statusEl) statusEl.textContent = `Bước ${graphTraversalIndex + 1}/${graphTraversalFrames().length}: ${frame.desc}`;
}

function setGraphTraversalMode(mode) {
  graphTraversalMode = mode;
  const btnBfs = document.getElementById('graph-traversal-btn-bfs');
  const btnDfs = document.getElementById('graph-traversal-btn-dfs');
  if (btnBfs) btnBfs.classList.toggle('btn-secondary', mode !== 'bfs');
  if (btnDfs) btnDfs.classList.toggle('btn-secondary', mode !== 'dfs');
  initGraphTraversalDemo();
}
window.setGraphTraversalMode = setGraphTraversalMode;

function initGraphTraversalDemo() {
  clearInterval(graphTraversalTimer);
  graphTraversalTimer = null;
  graphTraversalIndex = 0;
  renderGraphTraversalGrid();
  const btnPause = document.getElementById('graph-traversal-btn-pause');
  const btnAuto = document.getElementById('graph-traversal-btn-autorun');
  if (btnPause) btnPause.disabled = true;
  if (btnAuto) btnAuto.disabled = false;
}
window.initGraphTraversalDemo = initGraphTraversalDemo;

function stepGraphTraversal() {
  const frames = graphTraversalFrames();
  if (graphTraversalIndex >= frames.length - 1) return;
  graphTraversalIndex++;
  renderGraphTraversalGrid();
}
window.stepGraphTraversal = stepGraphTraversal;

function autoRunGraphTraversal() {
  const btnAuto = document.getElementById('graph-traversal-btn-autorun');
  const btnPause = document.getElementById('graph-traversal-btn-pause');
  if (btnAuto) btnAuto.disabled = true;
  if (btnPause) btnPause.disabled = false;
  graphTraversalTimer = setInterval(() => {
    const frames = graphTraversalFrames();
    if (graphTraversalIndex >= frames.length - 1) {
      pauseRunGraphTraversal();
      return;
    }
    stepGraphTraversal();
  }, graphTraversalSpeed);
}
window.autoRunGraphTraversal = autoRunGraphTraversal;

function pauseRunGraphTraversal() {
  clearInterval(graphTraversalTimer);
  graphTraversalTimer = null;
  const btnAuto = document.getElementById('graph-traversal-btn-autorun');
  const btnPause = document.getElementById('graph-traversal-btn-pause');
  if (btnAuto) btnAuto.disabled = false;
  if (btnPause) btnPause.disabled = true;
}
window.pauseRunGraphTraversal = pauseRunGraphTraversal;

function setGraphTraversalSpeed(val) {
  graphTraversalSpeed = parseInt(val, 10);
  const label = document.getElementById('graph-traversal-speed-label');
  if (label) label.textContent = val + 'ms';
  if (graphTraversalTimer) {
    pauseRunGraphTraversal();
    autoRunGraphTraversal();
  }
}
window.setGraphTraversalSpeed = setGraphTraversalSpeed;

// ── Interactive Widgets Logic for Chapter 10 (Searching) ────────────

// Shared helper: render an array with i/j/m pointer labels underneath each cell.
function renderPointerArray(containerId, arr, pointers, opts) {
  pointers = pointers || {};
  opts = opts || {};
  const foundIdx = opts.foundIdx;
  const container = document.getElementById(containerId);
  if (!container) return;
  const cells = arr.map((value, index) => {
    const isFound = foundIdx === index;
    const inRange = opts.range ? (index >= opts.range[0] && index <= opts.range[1]) : true;
    const border = isFound ? 'var(--accent-emerald, #10b981)' : (!inRange ? 'var(--border-subtle)' : 'var(--border)');
    const bg = isFound ? 'rgba(16, 185, 129, 0.15)' : (!inRange ? 'transparent' : 'var(--bg-overlay)');
    const color = !inRange ? 'var(--text-muted)' : 'var(--text-primary)';
    let labels = [];
    if (pointers.i === index) labels.push('<span style="color:#38bdf8;font-weight:700;">i</span>');
    if (pointers.j === index) labels.push('<span style="color:#38bdf8;font-weight:700;">j</span>');
    if (pointers.m === index) labels.push('<span style="color:#f97316;font-weight:700;">m</span>');
    return '<div style="display:flex;flex-direction:column;align-items:center;">' +
      '<div style="width:42px;height:42px;display:flex;align-items:center;justify-content:center;' +
      'border:2px solid ' + border + ';border-radius:6px;background:' + bg + ';color:' + color + ';' +
      'font-family:var(--font-mono);font-weight:600;font-size:14px;transition:all 0.2s ease;">' +
      value + '</div>' +
      '<div style="font-size:11px;color:var(--text-muted);margin-top:4px;font-family:var(--font-mono);">' + index + '</div>' +
      '<div style="height:16px;font-size:11px;font-family:var(--font-mono);">' + labels.join(' ') + '</div>' +
      '</div>';
  }).join('');
  container.innerHTML = '<div style="display:flex;gap:6px;flex-wrap:wrap;">' + cells + '</div>';
}

// ------------------------------------------------------------------
// 10.1 Binary Search: search on [1,3,6,8,12,15,23,26,31,35], target=6
// ------------------------------------------------------------------
const binarySearchOpsArr = [1, 3, 6, 8, 12, 15, 23, 26, 31, 35];
const binarySearchOpsFrames = [
  { i: 0, j: 9, m: null, foundIdx: null, desc: 'Khởi tạo i=0, j=9. Khoảng tìm kiếm là khoảng đóng [0, 9].' },
  { i: 0, j: 9, m: 4, foundIdx: null, desc: 'm = 0 + (9-0)/2 = 4. nums[4] = 12 > target = 6 → thu hẹp về bên trái.' },
  { i: 0, j: 3, m: null, foundIdx: null, desc: 'Cập nhật j = m - 1 = 3. Khoảng tìm kiếm mới là [0, 3].' },
  { i: 0, j: 3, m: 1, foundIdx: null, desc: 'm = 0 + (3-0)/2 = 1. nums[1] = 3 < target = 6 → thu hẹp về bên phải.' },
  { i: 2, j: 3, m: null, foundIdx: null, desc: 'Cập nhật i = m + 1 = 2. Khoảng tìm kiếm mới là [2, 3].' },
  { i: 2, j: 3, m: 2, foundIdx: null, desc: 'm = 2 + (3-2)/2 = 2. nums[2] = 6 == target = 6 → Tìm thấy!' },
  { i: 2, j: 3, m: 2, foundIdx: 2, desc: 'Hoàn tất! Trả về chỉ mục 2.' },
];
let binarySearchOpsIndex = 0;
let binarySearchOpsTimer = null;
let binarySearchOpsSpeed = 900;

function renderBinarySearchOps() {
  const frame = binarySearchOpsFrames[binarySearchOpsIndex];
  renderPointerArray('binary-search-ops-canvas', binarySearchOpsArr, { i: frame.i, j: frame.j, m: frame.m }, { foundIdx: frame.foundIdx, range: [frame.i, frame.j] });
  const statusEl = document.getElementById('binary-search-ops-status');
  if (statusEl) statusEl.textContent = 'Bước ' + (binarySearchOpsIndex + 1) + '/' + binarySearchOpsFrames.length + ': ' + frame.desc;
}

function initBinarySearchOpsDemo() {
  clearInterval(binarySearchOpsTimer);
  binarySearchOpsTimer = null;
  binarySearchOpsIndex = 0;
  renderBinarySearchOps();
  const btnPause = document.getElementById('binary-search-ops-btn-pause');
  const btnAuto = document.getElementById('binary-search-ops-btn-autorun');
  if (btnPause) btnPause.disabled = true;
  if (btnAuto) btnAuto.disabled = false;
}
window.initBinarySearchOpsDemo = initBinarySearchOpsDemo;

function stepBinarySearchOps() {
  if (binarySearchOpsIndex >= binarySearchOpsFrames.length - 1) return;
  binarySearchOpsIndex++;
  renderBinarySearchOps();
}
window.stepBinarySearchOps = stepBinarySearchOps;

function autoRunBinarySearchOps() {
  const btnAuto = document.getElementById('binary-search-ops-btn-autorun');
  const btnPause = document.getElementById('binary-search-ops-btn-pause');
  if (btnAuto) btnAuto.disabled = true;
  if (btnPause) btnPause.disabled = false;
  binarySearchOpsTimer = setInterval(() => {
    if (binarySearchOpsIndex >= binarySearchOpsFrames.length - 1) {
      pauseRunBinarySearchOps();
      return;
    }
    stepBinarySearchOps();
  }, binarySearchOpsSpeed);
}
window.autoRunBinarySearchOps = autoRunBinarySearchOps;

function pauseRunBinarySearchOps() {
  clearInterval(binarySearchOpsTimer);
  binarySearchOpsTimer = null;
  const btnAuto = document.getElementById('binary-search-ops-btn-autorun');
  const btnPause = document.getElementById('binary-search-ops-btn-pause');
  if (btnAuto) btnAuto.disabled = false;
  if (btnPause) btnPause.disabled = true;
}
window.pauseRunBinarySearchOps = pauseRunBinarySearchOps;

function setBinarySearchOpsSpeed(val) {
  binarySearchOpsSpeed = parseInt(val, 10);
  const label = document.getElementById('binary-search-ops-speed-label');
  if (label) label.textContent = val + 'ms';
  if (binarySearchOpsTimer) {
    pauseRunBinarySearchOps();
    autoRunBinarySearchOps();
  }
}
window.setBinarySearchOpsSpeed = setBinarySearchOpsSpeed;

// ------------------------------------------------------------------
// 10.3 Binary Search Edge: Left/Right boundary of target=6 on
// [1,3,6,6,6,6,6,10,12,15] (mode-switchable)
// ------------------------------------------------------------------
const binarySearchEdgeArr = [1, 3, 6, 6, 6, 6, 6, 10, 12, 15];
const binarySearchEdgeFramesLeft = [
  { i: null, j: null, m: null, foundIdx: null, desc: 'Ranh giới Trái = gọi binary_search_insertion(nums, 6).' },
  { i: 2, j: null, m: null, foundIdx: null, desc: 'Hàm insertion trả về i = 2 (giống mô phỏng ở mục 10.2).' },
  { i: 2, j: null, m: null, foundIdx: 2, desc: 'Kiểm tra nums[2] = 6 == target = 6 → Ranh giới Trái = 2.' },
];
const binarySearchEdgeFramesRight = [
  { i: null, j: null, m: null, foundIdx: null, desc: 'Ranh giới Phải = chuyển thành tìm Ranh giới Trái của target + 1 = 7.' },
  { i: 7, j: null, m: null, foundIdx: null, desc: 'Gọi binary_search_insertion(nums, 7) → trả về i = 7.' },
  { i: 7, j: 6, m: null, foundIdx: null, desc: 'Tính j = i - 1 = 6.' },
  { i: 7, j: 6, m: null, foundIdx: 6, desc: 'Kiểm tra nums[6] = 6 == target = 6 → Ranh giới Phải = 6.' },
];
let binarySearchEdgeMode = 'left';
let binarySearchEdgeIndex = 0;
let binarySearchEdgeTimer = null;
let binarySearchEdgeSpeed = 900;

function currentBinarySearchEdgeFrames() {
  return binarySearchEdgeMode === 'left' ? binarySearchEdgeFramesLeft : binarySearchEdgeFramesRight;
}

function renderBinarySearchEdge() {
  const frames = currentBinarySearchEdgeFrames();
  const frame = frames[binarySearchEdgeIndex];
  renderPointerArray('binary-search-edge-canvas', binarySearchEdgeArr, { i: frame.i, j: frame.j, m: frame.m }, { foundIdx: frame.foundIdx });
  const statusEl = document.getElementById('binary-search-edge-status');
  if (statusEl) statusEl.textContent = 'Bước ' + (binarySearchEdgeIndex + 1) + '/' + frames.length + ': ' + frame.desc;
  const btnLeft = document.getElementById('binary-search-edge-mode-left');
  const btnRight = document.getElementById('binary-search-edge-mode-right');
  if (btnLeft) btnLeft.classList.toggle('btn-secondary', binarySearchEdgeMode !== 'left');
  if (btnRight) btnRight.classList.toggle('btn-secondary', binarySearchEdgeMode !== 'right');
}

function setBinarySearchEdgeMode(mode) {
  binarySearchEdgeMode = mode;
  binarySearchEdgeIndex = 0;
  pauseRunBinarySearchEdge();
  renderBinarySearchEdge();
}
window.setBinarySearchEdgeMode = setBinarySearchEdgeMode;

function initBinarySearchEdgeDemo() {
  clearInterval(binarySearchEdgeTimer);
  binarySearchEdgeTimer = null;
  binarySearchEdgeIndex = 0;
  renderBinarySearchEdge();
  const btnPause = document.getElementById('binary-search-edge-btn-pause');
  const btnAuto = document.getElementById('binary-search-edge-btn-autorun');
  if (btnPause) btnPause.disabled = true;
  if (btnAuto) btnAuto.disabled = false;
}
window.initBinarySearchEdgeDemo = initBinarySearchEdgeDemo;

function stepBinarySearchEdge() {
  const frames = currentBinarySearchEdgeFrames();
  if (binarySearchEdgeIndex >= frames.length - 1) return;
  binarySearchEdgeIndex++;
  renderBinarySearchEdge();
}
window.stepBinarySearchEdge = stepBinarySearchEdge;

function autoRunBinarySearchEdge() {
  const btnAuto = document.getElementById('binary-search-edge-btn-autorun');
  const btnPause = document.getElementById('binary-search-edge-btn-pause');
  if (btnAuto) btnAuto.disabled = true;
  if (btnPause) btnPause.disabled = false;
  binarySearchEdgeTimer = setInterval(() => {
    const frames = currentBinarySearchEdgeFrames();
    if (binarySearchEdgeIndex >= frames.length - 1) {
      pauseRunBinarySearchEdge();
      return;
    }
    stepBinarySearchEdge();
  }, binarySearchEdgeSpeed);
}
window.autoRunBinarySearchEdge = autoRunBinarySearchEdge;

function pauseRunBinarySearchEdge() {
  clearInterval(binarySearchEdgeTimer);
  binarySearchEdgeTimer = null;
  const btnAuto = document.getElementById('binary-search-edge-btn-autorun');
  const btnPause = document.getElementById('binary-search-edge-btn-pause');
  if (btnAuto) btnAuto.disabled = false;
  if (btnPause) btnPause.disabled = true;
}
window.pauseRunBinarySearchEdge = pauseRunBinarySearchEdge;

function setBinarySearchEdgeSpeed(val) {
  binarySearchEdgeSpeed = parseInt(val, 10);
  const label = document.getElementById('binary-search-edge-speed-label');
  if (label) label.textContent = val + 'ms';
  if (binarySearchEdgeTimer) {
    pauseRunBinarySearchEdge();
    autoRunBinarySearchEdge();
  }
}
window.setBinarySearchEdgeSpeed = setBinarySearchEdgeSpeed;

// ------------------------------------------------------------------
// 10.4 Two Sum via Hash Table: nums=[2,7,11,15], target=13
// ------------------------------------------------------------------
const twoSumHashNums = [2, 7, 11, 15];
const twoSumHashTarget = 13;
const twoSumHashFrames = [
  { i: null, map: {}, resultIdx: null, desc: 'Khởi tạo Hash Table (map) rỗng. Bắt đầu duyệt mảng nums.' },
  { i: 0, map: {}, resultIdx: null, desc: 'i=0, num=2. Tính diff = 13 - 2 = 11. 11 không có trong map.' },
  { i: 0, map: { 2: 0 }, resultIdx: null, desc: 'Thêm cặp (2 → 0) vào map.' },
  { i: 1, map: { 2: 0 }, resultIdx: null, desc: 'i=1, num=7. Tính diff = 13 - 7 = 6. 6 không có trong map.' },
  { i: 1, map: { 2: 0, 7: 1 }, resultIdx: null, desc: 'Thêm cặp (7 → 1) vào map.' },
  { i: 2, map: { 2: 0, 7: 1 }, resultIdx: null, desc: 'i=2, num=11. Tính diff = 13 - 11 = 2. 2 có trong map tại chỉ mục 0!' },
  { i: 2, map: { 2: 0, 7: 1 }, resultIdx: [0, 2], desc: 'Tìm thấy! Trả về tổ hợp chỉ mục [0, 2] (nums[0]=2, nums[2]=11, tổng = 13).' },
];
let twoSumHashIndex = 0;
let twoSumHashTimer = null;
let twoSumHashSpeed = 900;

function renderTwoSumHash() {
  const frame = twoSumHashFrames[twoSumHashIndex];
  const container = document.getElementById('two-sum-hash-canvas');
  if (container) {
    const resultSet = frame.resultIdx || [];
    const numsHtml = twoSumHashNums.map((v, idx) => {
      const isCurrent = frame.i === idx;
      const isResult = resultSet.indexOf(idx) !== -1;
      const border = isResult ? 'var(--accent-emerald, #10b981)' : (isCurrent ? '#f97316' : 'var(--border)');
      const bg = isResult ? 'rgba(16, 185, 129, 0.15)' : (isCurrent ? 'rgba(249, 115, 22, 0.12)' : 'var(--bg-overlay)');
      return '<div style="display:flex;flex-direction:column;align-items:center;">' +
        '<div style="width:42px;height:42px;display:flex;align-items:center;justify-content:center;' +
        'border:2px solid ' + border + ';border-radius:6px;background:' + bg + ';color:var(--text-primary);' +
        'font-family:var(--font-mono);font-weight:600;font-size:14px;">' + v + '</div>' +
        '<div style="font-size:11px;color:var(--text-muted);margin-top:4px;font-family:var(--font-mono);">' + idx + '</div>' +
        (isCurrent ? '<div style="font-size:11px;color:#f97316;font-family:var(--font-mono);">i</div>' : '<div style="height:16px;"></div>') +
        '</div>';
    }).join('');
    const mapEntries = Object.keys(frame.map);
    const mapHtml = mapEntries.length === 0
      ? '<span style="color:var(--text-muted);font-size:13px;">(rỗng)</span>'
      : mapEntries.map(k => '<div style="display:flex;flex-direction:column;align-items:center;">' +
          '<div style="padding:6px 10px;border:2px solid var(--border);border-radius:6px;background:var(--bg-overlay);font-family:var(--font-mono);font-size:13px;">' +
          'key=' + k + ' → value=' + frame.map[k] + '</div></div>').join('');
    container.innerHTML =
      '<p style="font-size:13px;color:var(--text-muted);margin-bottom:4px;">nums (target = ' + twoSumHashTarget + ')</p>' +
      '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:1em;">' + numsHtml + '</div>' +
      '<p style="font-size:13px;color:var(--text-muted);margin-bottom:4px;">Hash Table (map)</p>' +
      '<div style="display:flex;gap:6px;flex-wrap:wrap;">' + mapHtml + '</div>';
  }
  const statusEl = document.getElementById('two-sum-hash-status');
  if (statusEl) statusEl.textContent = 'Bước ' + (twoSumHashIndex + 1) + '/' + twoSumHashFrames.length + ': ' + frame.desc;
}

function initTwoSumHashDemo() {
  clearInterval(twoSumHashTimer);
  twoSumHashTimer = null;
  twoSumHashIndex = 0;
  renderTwoSumHash();
  const btnPause = document.getElementById('two-sum-hash-btn-pause');
  const btnAuto = document.getElementById('two-sum-hash-btn-autorun');
  if (btnPause) btnPause.disabled = true;
  if (btnAuto) btnAuto.disabled = false;
}
window.initTwoSumHashDemo = initTwoSumHashDemo;

function stepTwoSumHash() {
  if (twoSumHashIndex >= twoSumHashFrames.length - 1) return;
  twoSumHashIndex++;
  renderTwoSumHash();
}
window.stepTwoSumHash = stepTwoSumHash;

function autoRunTwoSumHash() {
  const btnAuto = document.getElementById('two-sum-hash-btn-autorun');
  const btnPause = document.getElementById('two-sum-hash-btn-pause');
  if (btnAuto) btnAuto.disabled = true;
  if (btnPause) btnPause.disabled = false;
  twoSumHashTimer = setInterval(() => {
    if (twoSumHashIndex >= twoSumHashFrames.length - 1) {
      pauseRunTwoSumHash();
      return;
    }
    stepTwoSumHash();
  }, twoSumHashSpeed);
}
window.autoRunTwoSumHash = autoRunTwoSumHash;

function pauseRunTwoSumHash() {
  clearInterval(twoSumHashTimer);
  twoSumHashTimer = null;
  const btnAuto = document.getElementById('two-sum-hash-btn-autorun');
  const btnPause = document.getElementById('two-sum-hash-btn-pause');
  if (btnAuto) btnAuto.disabled = false;
  if (btnPause) btnPause.disabled = true;
}
window.pauseRunTwoSumHash = pauseRunTwoSumHash;

function setTwoSumHashSpeed(val) {
  twoSumHashSpeed = parseInt(val, 10);
  const label = document.getElementById('two-sum-hash-speed-label');
  if (label) label.textContent = val + 'ms';
  if (twoSumHashTimer) {
    pauseRunTwoSumHash();
    autoRunTwoSumHash();
  }
}
window.setTwoSumHashSpeed = setTwoSumHashSpeed;

// ── Interactive Widgets Logic for Chapter 11 (Sorting) ──────────────
// Generic engine reused across all 9 sorting-algorithm widgets. Each topic
// only needs to call initSortDemo(widgetId, SORT_FRAMES_XXX) — frame data is
// pre-simulated (see dsa-sort-frames-ch11.js) so every step is algorithmically
// exact, not hand-waved.
const SORT_DEMOS = {};

function initSortDemo(widgetId, frames) {
  if (!SORT_DEMOS[widgetId]) SORT_DEMOS[widgetId] = { speed: 700 };
  const state = SORT_DEMOS[widgetId];
  clearInterval(state.timer);
  state.timer = null;
  state.frames = frames;
  state.index = 0;
  renderSortDemoFrame(widgetId);
  const btnPause = document.getElementById(widgetId + '-btn-pause');
  const btnAuto = document.getElementById(widgetId + '-btn-autorun');
  if (btnPause) btnPause.disabled = true;
  if (btnAuto) btnAuto.disabled = false;
}
window.initSortDemo = initSortDemo;

function stepSortDemo(widgetId) {
  const state = SORT_DEMOS[widgetId];
  if (!state || state.index >= state.frames.length - 1) return;
  state.index++;
  renderSortDemoFrame(widgetId);
}
window.stepSortDemo = stepSortDemo;

function autoRunSortDemo(widgetId) {
  const state = SORT_DEMOS[widgetId];
  if (!state) return;
  const btnAuto = document.getElementById(widgetId + '-btn-autorun');
  const btnPause = document.getElementById(widgetId + '-btn-pause');
  if (btnAuto) btnAuto.disabled = true;
  if (btnPause) btnPause.disabled = false;
  state.timer = setInterval(() => {
    if (state.index >= state.frames.length - 1) {
      pauseRunSortDemo(widgetId);
      return;
    }
    stepSortDemo(widgetId);
  }, state.speed);
}
window.autoRunSortDemo = autoRunSortDemo;

function pauseRunSortDemo(widgetId) {
  const state = SORT_DEMOS[widgetId];
  if (!state) return;
  clearInterval(state.timer);
  state.timer = null;
  const btnAuto = document.getElementById(widgetId + '-btn-autorun');
  const btnPause = document.getElementById(widgetId + '-btn-pause');
  if (btnAuto) btnAuto.disabled = false;
  if (btnPause) btnPause.disabled = true;
}
window.pauseRunSortDemo = pauseRunSortDemo;

function setSortDemoSpeed(widgetId, val) {
  const state = SORT_DEMOS[widgetId];
  if (!state) return;
  state.speed = parseInt(val, 10);
  const label = document.getElementById(widgetId + '-speed-label');
  if (label) label.textContent = val + 'ms';
  if (state.timer) {
    pauseRunSortDemo(widgetId);
    autoRunSortDemo(widgetId);
  }
}
window.setSortDemoSpeed = setSortDemoSpeed;

function renderSortDemoFrame(widgetId) {
  const state = SORT_DEMOS[widgetId];
  if (!state) return;
  const frame = state.frames[state.index];
  const canvas = document.getElementById(widgetId + '-canvas');
  const status = document.getElementById(widgetId + '-status');
  if (canvas) {
    if (frame.buckets) {
      canvas.innerHTML = renderBucketsFrame(frame);
    } else if (frame.counter !== undefined) {
      canvas.innerHTML = renderCountingFrame(frame);
    } else {
      canvas.innerHTML = renderArraySortFrame(frame);
    }
  }
  if (status) status.textContent = 'Bước ' + (state.index + 1) + '/' + state.frames.length + ': ' + frame.desc;
}

function renderArraySortFrame(frame) {
  const sorted = frame.sorted || [];
  const highlight = frame.highlight || [];
  const pivots = frame.pivots || [];
  const range = frame.range || null;
  return '<div style="display:flex;gap:6px;flex-wrap:wrap;">' + frame.arr.map((v, idx) => {
    const isSorted = sorted.indexOf(idx) !== -1;
    const isPivot = pivots.indexOf(idx) !== -1;
    const isHighlight = highlight.indexOf(idx) !== -1;
    const inRange = range ? (idx >= range[0] && idx <= range[1]) : true;
    let border = 'var(--border)';
    let bg = 'var(--bg-overlay)';
    if (!inRange) { border = 'var(--border-subtle)'; bg = 'transparent'; }
    if (isSorted) { border = 'var(--accent-emerald, #10b981)'; bg = 'rgba(16,185,129,0.15)'; }
    if (isPivot) { border = '#f97316'; bg = 'rgba(249,115,22,0.15)'; }
    if (isHighlight) { border = '#38bdf8'; bg = 'rgba(56,189,248,0.15)'; }
    return '<div style="display:flex;flex-direction:column;align-items:center;">' +
      '<div style="width:38px;height:38px;display:flex;align-items:center;justify-content:center;border:2px solid ' + border + ';border-radius:6px;background:' + bg + ';font-family:var(--font-mono);font-weight:600;font-size:13px;">' + v + '</div>' +
      '<div style="font-size:10px;color:var(--text-muted);margin-top:3px;font-family:var(--font-mono);">' + idx + '</div>' +
      '</div>';
  }).join('') + '</div>';
}

function renderBucketsFrame(frame) {
  const html = frame.buckets.map((bucket, idx) => {
    const chips = bucket.map(v => '<div style="padding:4px 8px;border:1px solid var(--border);border-radius:4px;background:var(--bg-overlay);font-family:var(--font-mono);font-size:12px;">' + v + '</div>').join('');
    return '<div style="display:flex;flex-direction:column;gap:4px;min-width:70px;">' +
      '<div style="font-size:11px;color:var(--text-muted);text-align:center;">Bucket ' + idx + '</div>' +
      '<div style="display:flex;flex-direction:column;gap:4px;min-height:30px;border:1px dashed var(--border-subtle);border-radius:6px;padding:4px;">' + chips + '</div>' +
      '</div>';
  }).join('');
  let mergedHtml = '';
  if (frame.merged) {
    mergedHtml = '<p style="font-size:12px;color:var(--text-muted);margin-top:0.75em;">Kết quả sau khi nối: ' + frame.merged.join(', ') + '</p>';
  }
  return '<div style="display:flex;gap:8px;flex-wrap:wrap;">' + html + '</div>' + mergedHtml;
}

function renderCountingFrame(frame) {
  const rowNums = frame.nums.map((v, idx) => {
    const isCurrent = frame.highlightNumsIdx === idx;
    const border = isCurrent ? '#f97316' : 'var(--border)';
    const bg = isCurrent ? 'rgba(249,115,22,0.15)' : 'var(--bg-overlay)';
    return '<div style="display:flex;flex-direction:column;align-items:center;"><div style="width:34px;height:34px;display:flex;align-items:center;justify-content:center;border:2px solid ' + border + ';border-radius:6px;background:' + bg + ';font-family:var(--font-mono);font-size:12px;">' + v + '</div><div style="font-size:10px;color:var(--text-muted);">' + idx + '</div></div>';
  }).join('');
  let counterHtml = '';
  if (frame.counter) {
    counterHtml = '<p style="font-size:12px;color:var(--text-muted);margin:0.5em 0 4px;">counter (chỉ mục = giá trị)</p><div style="display:flex;gap:6px;flex-wrap:wrap;">' + frame.counter.map((v, idx) => '<div style="display:flex;flex-direction:column;align-items:center;"><div style="width:34px;height:34px;display:flex;align-items:center;justify-content:center;border:2px solid var(--border);border-radius:6px;background:var(--bg-overlay);font-family:var(--font-mono);font-size:12px;">' + v + '</div><div style="font-size:10px;color:var(--text-muted);">' + idx + '</div></div>').join('') + '</div>';
  }
  let resHtml = '';
  if (frame.res) {
    resHtml = '<p style="font-size:12px;color:var(--text-muted);margin:0.5em 0 4px;">res (kết quả)</p><div style="display:flex;gap:6px;flex-wrap:wrap;">' + frame.res.map((v) => '<div style="width:34px;height:34px;display:flex;align-items:center;justify-content:center;border:2px ' + (v === '' ? 'dashed var(--border-subtle)' : 'solid var(--accent-emerald,#10b981)') + ';border-radius:6px;background:' + (v === '' ? 'transparent' : 'rgba(16,185,129,0.15)') + ';font-family:var(--font-mono);font-size:12px;">' + v + '</div>').join('') + '</div>';
  }
  return '<p style="font-size:12px;color:var(--text-muted);margin-bottom:4px;">nums</p><div style="display:flex;gap:6px;flex-wrap:wrap;">' + rowNums + '</div>' + counterHtml + resHtml;
}

// ==================================================================
// ── Interactive Widgets Logic for Chapter 12 (Divide and Conquer) ──
// ==================================================================

// ------------------------------------------------------------------
// 12.2 Binary search via recursion: array [1,3,6,8,12,15,23,26,31,35],
// target=6. Shows i/j/m pointers PLUS a growing/shrinking recursion
// call-stack list (f(i,j) push on call, pop on return) — distinguishes
// this from the plain iterative widget already built for chapter 10.
// ------------------------------------------------------------------
const binarySearchRecurArr = [1, 3, 6, 8, 12, 15, 23, 26, 31, 35];
const binarySearchRecurFrames = [
  { i: 0, j: 9, m: null, foundIdx: null, stack: ['f(0, 9)'], desc: 'Bắt đầu: gọi dfs(0, 9) — khoảng tìm kiếm ban đầu là [0, 9].' },
  { i: 0, j: 9, m: 4, foundIdx: null, stack: ['f(0, 9)'], desc: 'Trong dfs(0, 9): m = 4. nums[4] = 12 > target = 6 → cần đệ quy sang dfs(0, 3).' },
  { i: 0, j: 3, m: null, foundIdx: null, stack: ['f(0, 9)', 'f(0, 3)'], desc: 'Ngăn xếp đệ quy PHÌNH TO: đẩy thêm lời gọi dfs(0, 3).' },
  { i: 0, j: 3, m: 1, foundIdx: null, stack: ['f(0, 9)', 'f(0, 3)'], desc: 'Trong dfs(0, 3): m = 1. nums[1] = 3 < target = 6 → cần đệ quy sang dfs(2, 3).' },
  { i: 2, j: 3, m: null, foundIdx: null, stack: ['f(0, 9)', 'f(0, 3)', 'f(2, 3)'], desc: 'Ngăn xếp đệ quy tiếp tục phình to: đẩy thêm lời gọi dfs(2, 3).' },
  { i: 2, j: 3, m: 2, foundIdx: 2, stack: ['f(0, 9)', 'f(0, 3)', 'f(2, 3)'], desc: 'Trong dfs(2, 3): m = 2. nums[2] = 6 == target → Tìm thấy tại chỉ mục 2! Bắt đầu unwind ngăn xếp.' },
  { i: 2, j: 3, m: 2, foundIdx: 2, stack: ['f(0, 9)', 'f(0, 3)'], desc: 'dfs(2, 3) trả về 2. Ngăn xếp THU GỌN còn dfs(0,3).' },
  { i: 0, j: 3, m: 1, foundIdx: 2, stack: ['f(0, 9)'], desc: 'dfs(0, 3) trả về 2. Ngăn xếp thu gọn còn dfs(0,9).' },
  { i: 0, j: 9, m: 4, foundIdx: 2, stack: [], desc: 'dfs(0, 9) trả về 2. Ngăn xếp RỖNG — hoàn tất đệ quy, kết quả cuối cùng: chỉ mục 2.' },
];
let binarySearchRecurIndex = 0;
let binarySearchRecurTimer = null;
let binarySearchRecurSpeed = 1000;

function renderBinarySearchRecur() {
  const frame = binarySearchRecurFrames[binarySearchRecurIndex];
  renderPointerArray('binary-search-recur-canvas', binarySearchRecurArr, { i: frame.i, j: frame.j, m: frame.m }, { foundIdx: frame.foundIdx, range: [frame.i, frame.j] });
  const stackEl = document.getElementById('binary-search-recur-stack');
  if (stackEl) {
    stackEl.innerHTML = frame.stack.length
      ? frame.stack.map((s, idx) => '<div style="padding:4px 10px;border:1px solid var(--border);border-radius:6px;background:var(--bg-overlay);font-family:var(--font-mono);font-size:13px;margin-left:' + (idx * 14) + 'px;">' + s + '</div>').join('')
      : '<div style="color:var(--text-muted);font-size:13px;">(ngăn xếp rỗng)</div>';
  }
  const statusEl = document.getElementById('binary-search-recur-status');
  if (statusEl) statusEl.textContent = 'Bước ' + (binarySearchRecurIndex + 1) + '/' + binarySearchRecurFrames.length + ': ' + frame.desc;
  const btnStep = document.getElementById('binary-search-recur-btn-step');
  if (btnStep) btnStep.disabled = binarySearchRecurIndex >= binarySearchRecurFrames.length - 1;
}

function initBinarySearchRecurDemo() {
  clearInterval(binarySearchRecurTimer);
  binarySearchRecurTimer = null;
  binarySearchRecurIndex = 0;
  renderBinarySearchRecur();
  const btnAuto = document.getElementById('binary-search-recur-btn-autorun');
  const btnPause = document.getElementById('binary-search-recur-btn-pause');
  if (btnAuto) btnAuto.disabled = false;
  if (btnPause) btnPause.disabled = true;
}
window.initBinarySearchRecurDemo = initBinarySearchRecurDemo;

function stepBinarySearchRecur() {
  if (binarySearchRecurIndex >= binarySearchRecurFrames.length - 1) return;
  binarySearchRecurIndex++;
  renderBinarySearchRecur();
}
window.stepBinarySearchRecur = stepBinarySearchRecur;

function autoRunBinarySearchRecur() {
  const btnAuto = document.getElementById('binary-search-recur-btn-autorun');
  const btnPause = document.getElementById('binary-search-recur-btn-pause');
  if (btnAuto) btnAuto.disabled = true;
  if (btnPause) btnPause.disabled = false;
  binarySearchRecurTimer = setInterval(() => {
    if (binarySearchRecurIndex >= binarySearchRecurFrames.length - 1) {
      pauseRunBinarySearchRecur();
      return;
    }
    stepBinarySearchRecur();
  }, binarySearchRecurSpeed);
}
window.autoRunBinarySearchRecur = autoRunBinarySearchRecur;

function pauseRunBinarySearchRecur() {
  clearInterval(binarySearchRecurTimer);
  binarySearchRecurTimer = null;
  const btnAuto = document.getElementById('binary-search-recur-btn-autorun');
  const btnPause = document.getElementById('binary-search-recur-btn-pause');
  if (btnAuto) btnAuto.disabled = false;
  if (btnPause) btnPause.disabled = true;
}
window.pauseRunBinarySearchRecur = pauseRunBinarySearchRecur;

function setBinarySearchRecurSpeed(val) {
  binarySearchRecurSpeed = parseInt(val, 10);
  const label = document.getElementById('binary-search-recur-speed-label');
  if (label) label.textContent = val + 'ms';
  if (binarySearchRecurTimer) {
    pauseRunBinarySearchRecur();
    autoRunBinarySearchRecur();
  }
}
window.setBinarySearchRecurSpeed = setBinarySearchRecurSpeed;

// ------------------------------------------------------------------
// 12.3 Build binary tree from preorder=[3,9,2,1,7], inorder=[9,3,1,2,7]
// — reveals nodes progressively in the real recursive construction
// order, reusing ch07's renderTreeWidget().
// ------------------------------------------------------------------
const BUILD_TREE_FRAMES = [
  { tree: { val: 3 }, highlight: [3], desc: 'Nút gốc = preorder[0] = 3. Tìm 3 trong inorder ở vị trí m=1 → chia inorder thành trái [9] (khoảng [0,0]) và phải [1,2,7] (khoảng [2,4]).' },
  { tree: { val: 3, left: { val: 9 } }, highlight: [9], desc: 'Xây cây con trái từ khoảng inorder [0,0]: chỉ có 1 phần tử 9 → là lá. Gán vào 3.left.' },
  { tree: { val: 3, left: { val: 9 }, right: { val: 2 } }, highlight: [2], desc: 'Xây cây con phải từ khoảng inorder [2,4], preorder bắt đầu từ i=2 → root = 2. Tra inorder_map[2]=m=3 → chia trái [1] (khoảng [2,2]) và phải [7] (khoảng [4,4]).' },
  { tree: { val: 3, left: { val: 9 }, right: { val: 2, left: { val: 1 } } }, highlight: [1], desc: 'Xây cây con trái của node 2 từ khoảng inorder [2,2]: chỉ có 1 phần tử → là lá. Gán vào 2.left.' },
  { tree: { val: 3, left: { val: 9 }, right: { val: 2, left: { val: 1 }, right: { val: 7 } } }, highlight: [7], desc: 'Xây cây con phải của node 2 từ khoảng inorder [4,4]: là lá 7. Gán vào 2.right. Toàn bộ cây đã xây xong!' },
];
let buildTreeIndex = 0;
let buildTreeTimer = null;
let buildTreeSpeed = 1000;

function renderBuildTreeFrame() {
  const frame = BUILD_TREE_FRAMES[buildTreeIndex];
  renderTreeWidget('build-tree-canvas', frame.tree, frame.highlight);
  const statusEl = document.getElementById('build-tree-status');
  if (statusEl) statusEl.textContent = 'Bước ' + (buildTreeIndex + 1) + '/' + BUILD_TREE_FRAMES.length + ': ' + frame.desc;
  const btnStep = document.getElementById('build-tree-btn-step');
  if (btnStep) btnStep.disabled = buildTreeIndex >= BUILD_TREE_FRAMES.length - 1;
}

function initBuildTreeDemo() {
  clearInterval(buildTreeTimer);
  buildTreeTimer = null;
  buildTreeIndex = 0;
  renderBuildTreeFrame();
  const btnAuto = document.getElementById('build-tree-btn-autorun');
  const btnPause = document.getElementById('build-tree-btn-pause');
  if (btnAuto) btnAuto.disabled = false;
  if (btnPause) btnPause.disabled = true;
}
window.initBuildTreeDemo = initBuildTreeDemo;

function stepBuildTree() {
  if (buildTreeIndex >= BUILD_TREE_FRAMES.length - 1) return;
  buildTreeIndex++;
  renderBuildTreeFrame();
}
window.stepBuildTree = stepBuildTree;

function autoRunBuildTree() {
  const btnAuto = document.getElementById('build-tree-btn-autorun');
  const btnPause = document.getElementById('build-tree-btn-pause');
  if (btnAuto) btnAuto.disabled = true;
  if (btnPause) btnPause.disabled = false;
  buildTreeTimer = setInterval(() => {
    if (buildTreeIndex >= BUILD_TREE_FRAMES.length - 1) {
      pauseRunBuildTree();
      return;
    }
    stepBuildTree();
  }, buildTreeSpeed);
}
window.autoRunBuildTree = autoRunBuildTree;

function pauseRunBuildTree() {
  clearInterval(buildTreeTimer);
  buildTreeTimer = null;
  const btnAuto = document.getElementById('build-tree-btn-autorun');
  const btnPause = document.getElementById('build-tree-btn-pause');
  if (btnAuto) btnAuto.disabled = false;
  if (btnPause) btnPause.disabled = true;
}
window.pauseRunBuildTree = pauseRunBuildTree;

function setBuildTreeSpeed(val) {
  buildTreeSpeed = parseInt(val, 10);
  const label = document.getElementById('build-tree-speed-label');
  if (label) label.textContent = val + 'ms';
  if (buildTreeTimer) {
    pauseRunBuildTree();
    autoRunBuildTree();
  }
}
window.setBuildTreeSpeed = setBuildTreeSpeed;

// ------------------------------------------------------------------
// 12.4 Hanota (Tower of Hanoi), n=3 disks, A=[3,2,1] (tail = top of
// rod, matching hello-algo's own convention) — real dfs(3,A,B,C)
// trace, 7 real moves (2^3 - 1), 8 frames incl. initial state.
// ------------------------------------------------------------------
function renderHanotaTowers(containerId, state) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const diskWidth = { 1: 40, 2: 64, 3: 88 };
  const diskColor = { 1: '#38bdf8', 2: '#818cf8', 3: '#f472b6' };
  function renderTower(label, disks) {
    const ordered = [...disks].reverse(); // đĩa trên cùng đứng đầu DOM
    const rows = ordered.map((d) =>
      '<div style="width:' + diskWidth[d] + 'px;height:22px;line-height:22px;text-align:center;background:' + diskColor[d] + ';color:#000;border-radius:4px;margin:2px auto;font-weight:700;font-family:var(--font-mono);font-size:12px;">' + d + '</div>'
    ).join('');
    return '<div style="display:flex;flex-direction:column;align-items:center;">' +
      '<div style="display:flex;flex-direction:column;justify-content:flex-end;min-height:110px;width:110px;border-bottom:3px solid var(--border);">' + rows + '</div>' +
      '<div style="margin-top:6px;font-weight:700;font-family:var(--font-mono);">' + label + '</div></div>';
  }
  container.innerHTML = '<div style="display:flex;justify-content:center;gap:32px;padding:16px;flex-wrap:wrap;">' +
    renderTower('A', state.A) + renderTower('B', state.B) + renderTower('C', state.C) +
    '</div>';
}

const HANOTA_FRAMES = [
  { A: [3, 2, 1], B: [], C: [], desc: 'Trạng thái ban đầu: 3 đĩa xếp trên cột A (to nhất ở dưới). Mục tiêu: chuyển tất cả sang cột C, dùng B làm trung gian.' },
  { A: [3, 2], B: [], C: [1], desc: 'Bước 1: Chuyển đĩa 1 (nhỏ nhất) từ A → C.' },
  { A: [3], B: [2], C: [1], desc: 'Bước 2: Chuyển đĩa 2 từ A → B.' },
  { A: [3], B: [2, 1], C: [], desc: 'Bước 3: Chuyển đĩa 1 từ C → B. (Đã di chuyển xong khối 2 đĩa từ A sang B, dùng C làm trung gian).' },
  { A: [], B: [2, 1], C: [3], desc: 'Bước 4: Chuyển đĩa 3 (to nhất, còn lại duy nhất trên A) từ A → C trực tiếp.' },
  { A: [1], B: [2], C: [3], desc: 'Bước 5: Chuyển đĩa 1 từ B → A.' },
  { A: [1], B: [], C: [3, 2], desc: 'Bước 6: Chuyển đĩa 2 từ B → C.' },
  { A: [], B: [], C: [3, 2, 1], desc: 'Bước 7: Chuyển đĩa 1 từ A → C. Hoàn tất! Toàn bộ 3 đĩa đã ở cột C (tổng cộng 2³−1 = 7 bước di chuyển).' },
];
let hanotaIndex = 0;
let hanotaTimer = null;
let hanotaSpeed = 900;

function renderHanotaFrame() {
  const frame = HANOTA_FRAMES[hanotaIndex];
  renderHanotaTowers('hanota-canvas', frame);
  const statusEl = document.getElementById('hanota-status');
  if (statusEl) statusEl.textContent = 'Bước ' + (hanotaIndex + 1) + '/' + HANOTA_FRAMES.length + ': ' + frame.desc;
  const btnStep = document.getElementById('hanota-btn-step');
  if (btnStep) btnStep.disabled = hanotaIndex >= HANOTA_FRAMES.length - 1;
}

function initHanotaDemo() {
  clearInterval(hanotaTimer);
  hanotaTimer = null;
  hanotaIndex = 0;
  renderHanotaFrame();
  const btnAuto = document.getElementById('hanota-btn-autorun');
  const btnPause = document.getElementById('hanota-btn-pause');
  if (btnAuto) btnAuto.disabled = false;
  if (btnPause) btnPause.disabled = true;
}
window.initHanotaDemo = initHanotaDemo;

function stepHanota() {
  if (hanotaIndex >= HANOTA_FRAMES.length - 1) return;
  hanotaIndex++;
  renderHanotaFrame();
}
window.stepHanota = stepHanota;

function autoRunHanota() {
  const btnAuto = document.getElementById('hanota-btn-autorun');
  const btnPause = document.getElementById('hanota-btn-pause');
  if (btnAuto) btnAuto.disabled = true;
  if (btnPause) btnPause.disabled = false;
  hanotaTimer = setInterval(() => {
    if (hanotaIndex >= HANOTA_FRAMES.length - 1) {
      pauseRunHanota();
      return;
    }
    stepHanota();
  }, hanotaSpeed);
}
window.autoRunHanota = autoRunHanota;

function pauseRunHanota() {
  clearInterval(hanotaTimer);
  hanotaTimer = null;
  const btnAuto = document.getElementById('hanota-btn-autorun');
  const btnPause = document.getElementById('hanota-btn-pause');
  if (btnAuto) btnAuto.disabled = false;
  if (btnPause) btnPause.disabled = true;
}
window.pauseRunHanota = pauseRunHanota;

function setHanotaSpeed(val) {
  hanotaSpeed = parseInt(val, 10);
  const label = document.getElementById('hanota-speed-label');
  if (label) label.textContent = val + 'ms';
  if (hanotaTimer) {
    pauseRunHanota();
    autoRunHanota();
  }
}
window.setHanotaSpeed = setHanotaSpeed;

// ==================================================================
// ── Interactive Widgets Logic for Chapter 13 (Backtracking) ────────
// ==================================================================

// ------------------------------------------------------------------
// 13.1 Backtracking DFS demo: search for value-7 nodes on the fixed
// tree from backtracking_algorithm.md's Example 2/3, toggle between
// "no pruning" (Example 2) and "pruning" (Example 3, skip val==3).
// Frames hand-traced by executing the real pre_order()/backtrack()
// logic on paper (see repo memory notes for the full trace).
// ------------------------------------------------------------------
const BACKTRACK_DFS_TREE = { val: 1, left: { val: 7, left: { val: 4 }, right: { val: 5 } }, right: { val: 3, left: { val: 6 }, right: { val: 7 } } };

const BACKTRACK_DFS_FRAMES = {
  noprune: [
    { path: [], res: [], desc: 'Bắt đầu duyệt từ gốc (không cắt tỉa).' },
    { path: [1], res: [], desc: 'Thử: thêm nút 1 vào đường đi.' },
    { path: [1, 7], res: [], desc: 'Thử: thêm nút 7 (con trái) vào đường đi.' },
    { path: [1, 7], res: [[1, 7]], desc: 'Ghi nhận nghiệm: nút giá trị 7! Lưu đường đi [1,7] vào kết quả.' },
    { path: [1, 7, 4], res: [[1, 7]], desc: 'Thử: thêm nút 4 vào đường đi.' },
    { path: [1, 7], res: [[1, 7]], desc: 'Quay lui: nút 4 là lá, gỡ khỏi đường đi.' },
    { path: [1, 7, 5], res: [[1, 7]], desc: 'Thử: thêm nút 5 vào đường đi.' },
    { path: [1, 7], res: [[1, 7]], desc: 'Quay lui: nút 5 là lá, gỡ khỏi đường đi.' },
    { path: [1], res: [[1, 7]], desc: 'Quay lui: đã duyệt xong 2 con của nút 7, gỡ khỏi đường đi.' },
    { path: [1, 3], res: [[1, 7]], desc: 'Thử: thêm nút 3 (con phải) vào đường đi.' },
    { path: [1, 3, 6], res: [[1, 7]], desc: 'Thử: thêm nút 6 vào đường đi.' },
    { path: [1, 3], res: [[1, 7]], desc: 'Quay lui: nút 6 là lá, gỡ khỏi đường đi.' },
    { path: [1, 3, 7], res: [[1, 7]], desc: 'Thử: thêm nút 7 (con phải của 3) vào đường đi.' },
    { path: [1, 3, 7], res: [[1, 7], [1, 3, 7]], desc: 'Ghi nhận nghiệm: nút giá trị 7! Lưu đường đi [1,3,7] vào kết quả.' },
    { path: [1, 3], res: [[1, 7], [1, 3, 7]], desc: 'Quay lui: nút lá, gỡ khỏi đường đi.' },
    { path: [1], res: [[1, 7], [1, 3, 7]], desc: 'Quay lui: đã duyệt xong 2 con của nút 3, gỡ khỏi đường đi.' },
    { path: [], res: [[1, 7], [1, 3, 7]], desc: 'Quay lui: đã duyệt xong toàn bộ cây. Hoàn tất! Kết quả: [[1,7],[1,3,7]].' },
  ],
  prune: [
    { path: [], res: [], desc: 'Bắt đầu duyệt từ gốc (có cắt tỉa: bỏ qua nút giá trị 3).' },
    { path: [1], res: [], desc: 'Thử: thêm nút 1 vào đường đi.' },
    { path: [1, 7], res: [], desc: 'Thử: thêm nút 7 vào đường đi.' },
    { path: [1, 7], res: [[1, 7]], desc: 'Ghi nhận nghiệm: nút giá trị 7! Lưu đường đi [1,7].' },
    { path: [1, 7, 4], res: [[1, 7]], desc: 'Thử: thêm nút 4 vào đường đi.' },
    { path: [1, 7], res: [[1, 7]], desc: 'Quay lui: nút 4 là lá, gỡ khỏi đường đi.' },
    { path: [1, 7, 5], res: [[1, 7]], desc: 'Thử: thêm nút 5 vào đường đi.' },
    { path: [1, 7], res: [[1, 7]], desc: 'Quay lui: nút 5 là lá, gỡ khỏi đường đi.' },
    { path: [1], res: [[1, 7]], desc: 'Quay lui: đã duyệt xong 2 con của nút 7, gỡ khỏi đường đi.' },
    { path: [1], res: [[1, 7]], desc: 'Cắt tỉa: gặp nút giá trị 3, dừng ngay không đi tiếp (không thêm vào đường đi).' },
    { path: [], res: [[1, 7]], desc: 'Quay lui: đã duyệt xong toàn bộ cây (nhánh nút 3 bị cắt tỉa hoàn toàn). Hoàn tất! Kết quả: [[1,7]].' },
  ],
};
let backtrackDfsMode = 'noprune';
let backtrackDfsIndex = 0;
let backtrackDfsTimer = null;
let backtrackDfsSpeed = 900;

function renderBacktrackDfsFrame() {
  const frames = BACKTRACK_DFS_FRAMES[backtrackDfsMode];
  const frame = frames[backtrackDfsIndex];
  renderTreeWidget('backtracking-dfs-canvas', BACKTRACK_DFS_TREE, frame.path);
  const stateEl = document.getElementById('backtracking-dfs-state');
  if (stateEl) {
    stateEl.innerHTML = '<strong>path (state):</strong> [' + frame.path.join(', ') + ']  &nbsp;&nbsp; <strong>res:</strong> ' + JSON.stringify(frame.res);
  }
  const statusEl = document.getElementById('backtracking-dfs-status');
  if (statusEl) statusEl.textContent = 'Bước ' + (backtrackDfsIndex + 1) + '/' + frames.length + ': ' + frame.desc;
  const btnStep = document.getElementById('backtracking-dfs-btn-step');
  if (btnStep) btnStep.disabled = backtrackDfsIndex >= frames.length - 1;
}

function setBacktrackDfsMode(mode) {
  pauseRunBacktrackDfs();
  backtrackDfsMode = mode;
  backtrackDfsIndex = 0;
  const btnNo = document.getElementById('backtracking-dfs-btn-noprune');
  const btnPr = document.getElementById('backtracking-dfs-btn-prune');
  if (btnNo) btnNo.classList.toggle('btn-secondary', mode !== 'noprune');
  if (btnPr) btnPr.classList.toggle('btn-secondary', mode !== 'prune');
  renderBacktrackDfsFrame();
}
window.setBacktrackDfsMode = setBacktrackDfsMode;

function initBacktrackDfsDemo() {
  clearInterval(backtrackDfsTimer);
  backtrackDfsTimer = null;
  backtrackDfsIndex = 0;
  renderBacktrackDfsFrame();
  const btnPause = document.getElementById('backtracking-dfs-btn-pause');
  const btnAuto = document.getElementById('backtracking-dfs-btn-autorun');
  if (btnPause) btnPause.disabled = true;
  if (btnAuto) btnAuto.disabled = false;
}
window.initBacktrackDfsDemo = initBacktrackDfsDemo;

function stepBacktrackDfs() {
  const frames = BACKTRACK_DFS_FRAMES[backtrackDfsMode];
  if (backtrackDfsIndex >= frames.length - 1) return;
  backtrackDfsIndex++;
  renderBacktrackDfsFrame();
}
window.stepBacktrackDfs = stepBacktrackDfs;

function autoRunBacktrackDfs() {
  const btnAuto = document.getElementById('backtracking-dfs-btn-autorun');
  const btnPause = document.getElementById('backtracking-dfs-btn-pause');
  if (btnAuto) btnAuto.disabled = true;
  if (btnPause) btnPause.disabled = false;
  backtrackDfsTimer = setInterval(() => {
    const frames = BACKTRACK_DFS_FRAMES[backtrackDfsMode];
    if (backtrackDfsIndex >= frames.length - 1) {
      pauseRunBacktrackDfs();
      return;
    }
    stepBacktrackDfs();
  }, backtrackDfsSpeed);
}
window.autoRunBacktrackDfs = autoRunBacktrackDfs;

function pauseRunBacktrackDfs() {
  clearInterval(backtrackDfsTimer);
  backtrackDfsTimer = null;
  const btnAuto = document.getElementById('backtracking-dfs-btn-autorun');
  const btnPause = document.getElementById('backtracking-dfs-btn-pause');
  if (btnAuto) btnAuto.disabled = false;
  if (btnPause) btnPause.disabled = true;
}
window.pauseRunBacktrackDfs = pauseRunBacktrackDfs;

function setBacktrackDfsSpeed(val) {
  backtrackDfsSpeed = parseInt(val, 10);
  const label = document.getElementById('backtracking-dfs-speed-label');
  if (label) label.textContent = val + 'ms';
  if (backtrackDfsTimer) {
    pauseRunBacktrackDfs();
    autoRunBacktrackDfs();
  }
}
window.setBacktrackDfsSpeed = setBacktrackDfsSpeed;

// ------------------------------------------------------------------
// 13.2 Permutations demo: mode toggle between no-duplicates [1,2,3]
// and with-duplicates [1,1,2]. Frames come from
// BACKTRACK_FRAMES_PERMUTATIONS_I / _II (dsa-backtrack-frames-ch13.js),
// generated by actually running the real backtrack() algorithm in
// Python — guaranteed correct, not hand-traced.
// ------------------------------------------------------------------
const PERMUTATIONS_CHOICES = { nodup: [1, 2, 3], dup: [1, 1, 2] };
let permutationsMode = 'nodup';
let permutationsIndex = 0;
let permutationsTimer = null;
let permutationsSpeed = 400;

function permutationsFrames() {
  return permutationsMode === 'nodup' ? BACKTRACK_FRAMES_PERMUTATIONS_I : BACKTRACK_FRAMES_PERMUTATIONS_II;
}

function renderPermutationsFrame() {
  const frames = permutationsFrames();
  const frame = frames[permutationsIndex];
  const choices = PERMUTATIONS_CHOICES[permutationsMode];
  const container = document.getElementById('permutations-canvas');
  if (container) {
    container.innerHTML = choices.map((val, idx) => renderOpsCell(val, idx, { highlighted: !!frame.selected[idx] })).join('');
  }
  const stateEl = document.getElementById('permutations-state');
  if (stateEl) {
    stateEl.innerHTML = '<strong>state:</strong> [' + frame.state.join(', ') + ']  &nbsp;&nbsp; <strong>Số hoán vị đã tìm:</strong> ' + frame.res_count;
  }
  const statusEl = document.getElementById('permutations-status');
  if (statusEl) statusEl.textContent = 'Bước ' + (permutationsIndex + 1) + '/' + frames.length + ': ' + frame.desc;
  const btnStep = document.getElementById('permutations-btn-step');
  if (btnStep) btnStep.disabled = permutationsIndex >= frames.length - 1;
}

function setPermutationsMode(mode) {
  pauseRunPermutations();
  permutationsMode = mode;
  permutationsIndex = 0;
  const btnNo = document.getElementById('permutations-btn-nodup');
  const btnDup = document.getElementById('permutations-btn-dup');
  if (btnNo) btnNo.classList.toggle('btn-secondary', mode !== 'nodup');
  if (btnDup) btnDup.classList.toggle('btn-secondary', mode !== 'dup');
  renderPermutationsFrame();
}
window.setPermutationsMode = setPermutationsMode;

function initPermutationsDemo() {
  clearInterval(permutationsTimer);
  permutationsTimer = null;
  permutationsIndex = 0;
  renderPermutationsFrame();
  const btnPause = document.getElementById('permutations-btn-pause');
  const btnAuto = document.getElementById('permutations-btn-autorun');
  if (btnPause) btnPause.disabled = true;
  if (btnAuto) btnAuto.disabled = false;
}
window.initPermutationsDemo = initPermutationsDemo;

function stepPermutations() {
  const frames = permutationsFrames();
  if (permutationsIndex >= frames.length - 1) return;
  permutationsIndex++;
  renderPermutationsFrame();
}
window.stepPermutations = stepPermutations;

function autoRunPermutations() {
  const btnAuto = document.getElementById('permutations-btn-autorun');
  const btnPause = document.getElementById('permutations-btn-pause');
  if (btnAuto) btnAuto.disabled = true;
  if (btnPause) btnPause.disabled = false;
  permutationsTimer = setInterval(() => {
    const frames = permutationsFrames();
    if (permutationsIndex >= frames.length - 1) {
      pauseRunPermutations();
      return;
    }
    stepPermutations();
  }, permutationsSpeed);
}
window.autoRunPermutations = autoRunPermutations;

function pauseRunPermutations() {
  clearInterval(permutationsTimer);
  permutationsTimer = null;
  const btnAuto = document.getElementById('permutations-btn-autorun');
  const btnPause = document.getElementById('permutations-btn-pause');
  if (btnAuto) btnAuto.disabled = false;
  if (btnPause) btnPause.disabled = true;
}
window.pauseRunPermutations = pauseRunPermutations;

function setPermutationsSpeed(val) {
  permutationsSpeed = parseInt(val, 10);
  const label = document.getElementById('permutations-speed-label');
  if (label) label.textContent = val + 'ms';
  if (permutationsTimer) {
    pauseRunPermutations();
    autoRunPermutations();
  }
}
window.setPermutationsSpeed = setPermutationsSpeed;

// ------------------------------------------------------------------
// 13.3 Subset-sum demo: mode toggle between no-duplicates
// nums=[3,4,5], target=9 (subsetSumI) and with-duplicates
// nums=[4,4,5], target=9 (subsetSumII). Frames come from
// BACKTRACK_FRAMES_SUBSET_SUM_I / _II — Python-verified.
// ------------------------------------------------------------------
const SUBSET_SUM_NUMS = { i: [3, 4, 5], ii: [4, 4, 5] };
let subsetSumMode = 'i';
let subsetSumIndex = 0;
let subsetSumTimer = null;
let subsetSumSpeed = 600;

function subsetSumFrames() {
  return subsetSumMode === 'i' ? BACKTRACK_FRAMES_SUBSET_SUM_I : BACKTRACK_FRAMES_SUBSET_SUM_II;
}

function renderSubsetSumFrame() {
  const frames = subsetSumFrames();
  const frame = frames[subsetSumIndex];
  const nums = SUBSET_SUM_NUMS[subsetSumMode];
  const container = document.getElementById('subset-sum-canvas');
  if (container) {
    container.innerHTML = nums.map((val, idx) => renderOpsCell(val, idx, { highlighted: idx === frame.i })).join('');
  }
  const stateEl = document.getElementById('subset-sum-state');
  if (stateEl) {
    stateEl.innerHTML = '<strong>state:</strong> [' + frame.state.join(', ') + ']  &nbsp;&nbsp; <strong>target còn lại:</strong> ' + frame.target_left + '  &nbsp;&nbsp; <strong>Số tập con đã tìm:</strong> ' + frame.res_count;
  }
  const statusEl = document.getElementById('subset-sum-status');
  if (statusEl) statusEl.textContent = 'Bước ' + (subsetSumIndex + 1) + '/' + frames.length + ': ' + frame.desc;
  const btnStep = document.getElementById('subset-sum-btn-step');
  if (btnStep) btnStep.disabled = subsetSumIndex >= frames.length - 1;
}

function setSubsetSumMode(mode) {
  pauseRunSubsetSum();
  subsetSumMode = mode;
  subsetSumIndex = 0;
  const btnI = document.getElementById('subset-sum-btn-i');
  const btnII = document.getElementById('subset-sum-btn-ii');
  if (btnI) btnI.classList.toggle('btn-secondary', mode !== 'i');
  if (btnII) btnII.classList.toggle('btn-secondary', mode !== 'ii');
  renderSubsetSumFrame();
}
window.setSubsetSumMode = setSubsetSumMode;

function initSubsetSumDemo() {
  clearInterval(subsetSumTimer);
  subsetSumTimer = null;
  subsetSumIndex = 0;
  renderSubsetSumFrame();
  const btnPause = document.getElementById('subset-sum-btn-pause');
  const btnAuto = document.getElementById('subset-sum-btn-autorun');
  if (btnPause) btnPause.disabled = true;
  if (btnAuto) btnAuto.disabled = false;
}
window.initSubsetSumDemo = initSubsetSumDemo;

function stepSubsetSum() {
  const frames = subsetSumFrames();
  if (subsetSumIndex >= frames.length - 1) return;
  subsetSumIndex++;
  renderSubsetSumFrame();
}
window.stepSubsetSum = stepSubsetSum;

function autoRunSubsetSum() {
  const btnAuto = document.getElementById('subset-sum-btn-autorun');
  const btnPause = document.getElementById('subset-sum-btn-pause');
  if (btnAuto) btnAuto.disabled = true;
  if (btnPause) btnPause.disabled = false;
  subsetSumTimer = setInterval(() => {
    const frames = subsetSumFrames();
    if (subsetSumIndex >= frames.length - 1) {
      pauseRunSubsetSum();
      return;
    }
    stepSubsetSum();
  }, subsetSumSpeed);
}
window.autoRunSubsetSum = autoRunSubsetSum;

function pauseRunSubsetSum() {
  clearInterval(subsetSumTimer);
  subsetSumTimer = null;
  const btnAuto = document.getElementById('subset-sum-btn-autorun');
  const btnPause = document.getElementById('subset-sum-btn-pause');
  if (btnAuto) btnAuto.disabled = false;
  if (btnPause) btnPause.disabled = true;
}
window.pauseRunSubsetSum = pauseRunSubsetSum;

function setSubsetSumSpeed(val) {
  subsetSumSpeed = parseInt(val, 10);
  const label = document.getElementById('subset-sum-speed-label');
  if (label) label.textContent = val + 'ms';
  if (subsetSumTimer) {
    pauseRunSubsetSum();
    autoRunSubsetSum();
  }
}
window.setSubsetSumSpeed = setSubsetSumSpeed;

// ------------------------------------------------------------------
// 13.4 N-Queens demo: n=4 board, frames from BACKTRACK_FRAMES_N_QUEENS_4
// (Python-verified — 2 real solutions found, matching the book).
// ------------------------------------------------------------------
let nQueensIndex = 0;
let nQueensTimer = null;
let nQueensSpeed = 300;

function renderQueensBoard(containerId, board, highlight) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const n = board.length;
  let html = '<div style="display:inline-block; border:2px solid var(--border);">';
  for (let r = 0; r < n; r++) {
    html += '<div style="display:flex;">';
    for (let c = 0; c < n; c++) {
      const isQueen = board[r][c] === 'Q';
      const isHighlight = !!highlight && highlight.row === r && highlight.col === c;
      const bg = isHighlight ? 'rgba(56, 189, 248, 0.3)' : ((r + c) % 2 === 0 ? 'var(--bg-overlay)' : 'transparent');
      html += '<div style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;border:1px solid var(--border-subtle);background:' + bg + ';font-size:22px;color:var(--text-primary);">' + (isQueen ? '♛' : '') + '</div>';
    }
    html += '</div>';
  }
  html += '</div>';
  container.innerHTML = html;
}

function renderNQueensFrame() {
  const frames = BACKTRACK_FRAMES_N_QUEENS_4;
  const frame = frames[nQueensIndex];
  renderQueensBoard('n-queens-canvas', frame.state, frame.row >= 0 && frame.col >= 0 ? { row: frame.row, col: frame.col } : null);
  const stateEl = document.getElementById('n-queens-state');
  if (stateEl) stateEl.innerHTML = '<strong>Số nghiệm đã tìm:</strong> ' + frame.res_count;
  const statusEl = document.getElementById('n-queens-status');
  if (statusEl) statusEl.textContent = 'Bước ' + (nQueensIndex + 1) + '/' + frames.length + ': ' + frame.desc;
  const btnStep = document.getElementById('n-queens-btn-step');
  if (btnStep) btnStep.disabled = nQueensIndex >= frames.length - 1;
}

function initNQueensDemo() {
  clearInterval(nQueensTimer);
  nQueensTimer = null;
  nQueensIndex = 0;
  renderNQueensFrame();
  const btnPause = document.getElementById('n-queens-btn-pause');
  const btnAuto = document.getElementById('n-queens-btn-autorun');
  if (btnPause) btnPause.disabled = true;
  if (btnAuto) btnAuto.disabled = false;
}
window.initNQueensDemo = initNQueensDemo;

function stepNQueens() {
  const frames = BACKTRACK_FRAMES_N_QUEENS_4;
  if (nQueensIndex >= frames.length - 1) return;
  nQueensIndex++;
  renderNQueensFrame();
}
window.stepNQueens = stepNQueens;

function autoRunNQueens() {
  const btnAuto = document.getElementById('n-queens-btn-autorun');
  const btnPause = document.getElementById('n-queens-btn-pause');
  if (btnAuto) btnAuto.disabled = true;
  if (btnPause) btnPause.disabled = false;
  nQueensTimer = setInterval(() => {
    const frames = BACKTRACK_FRAMES_N_QUEENS_4;
    if (nQueensIndex >= frames.length - 1) {
      pauseRunNQueens();
      return;
    }
    stepNQueens();
  }, nQueensSpeed);
}
window.autoRunNQueens = autoRunNQueens;

function pauseRunNQueens() {
  clearInterval(nQueensTimer);
  nQueensTimer = null;
  const btnAuto = document.getElementById('n-queens-btn-autorun');
  const btnPause = document.getElementById('n-queens-btn-pause');
  if (btnAuto) btnAuto.disabled = false;
  if (btnPause) btnPause.disabled = true;
}
window.pauseRunNQueens = pauseRunNQueens;

function setNQueensSpeed(val) {
  nQueensSpeed = parseInt(val, 10);
  const label = document.getElementById('n-queens-speed-label');
  if (label) label.textContent = val + 'ms';
  if (nQueensTimer) {
    pauseRunNQueens();
    autoRunNQueens();
  }
}
window.setNQueensSpeed = setNQueensSpeed;

// ── Interactive Widgets Logic for Chapter 14 (Dynamic Programming) ──
// Generic engine reused across all 4 DP widgets. Frame data is pre-simulated
// by actually running the real algorithms in Python (see dsa-dp-frames-ch14.js)
// so every step is algorithmically exact. Dispatches render by frame shape:
// frame.dp is a flat array -> 1D array view; frame.dp is an array of arrays -> 2D grid view.
const DP_DEMOS = {};

function initDpDemo(widgetId, frames) {
  if (!DP_DEMOS[widgetId]) DP_DEMOS[widgetId] = { speed: 700 };
  const state = DP_DEMOS[widgetId];
  clearInterval(state.timer);
  state.timer = null;
  state.frames = frames;
  state.index = 0;
  renderDpDemoFrame(widgetId);
  const btnPause = document.getElementById(widgetId + '-btn-pause');
  const btnAuto = document.getElementById(widgetId + '-btn-autorun');
  if (btnPause) btnPause.disabled = true;
  if (btnAuto) btnAuto.disabled = false;
}
window.initDpDemo = initDpDemo;

function stepDpDemo(widgetId) {
  const state = DP_DEMOS[widgetId];
  if (!state || state.index >= state.frames.length - 1) return;
  state.index++;
  renderDpDemoFrame(widgetId);
}
window.stepDpDemo = stepDpDemo;

function autoRunDpDemo(widgetId) {
  const state = DP_DEMOS[widgetId];
  if (!state) return;
  const btnAuto = document.getElementById(widgetId + '-btn-autorun');
  const btnPause = document.getElementById(widgetId + '-btn-pause');
  if (btnAuto) btnAuto.disabled = true;
  if (btnPause) btnPause.disabled = false;
  state.timer = setInterval(() => {
    if (state.index >= state.frames.length - 1) {
      pauseRunDpDemo(widgetId);
      return;
    }
    stepDpDemo(widgetId);
  }, state.speed);
}
window.autoRunDpDemo = autoRunDpDemo;

function pauseRunDpDemo(widgetId) {
  const state = DP_DEMOS[widgetId];
  if (!state) return;
  clearInterval(state.timer);
  state.timer = null;
  const btnAuto = document.getElementById(widgetId + '-btn-autorun');
  const btnPause = document.getElementById(widgetId + '-btn-pause');
  if (btnAuto) btnAuto.disabled = false;
  if (btnPause) btnPause.disabled = true;
}
window.pauseRunDpDemo = pauseRunDpDemo;

function setDpDemoSpeed(widgetId, val) {
  const state = DP_DEMOS[widgetId];
  if (!state) return;
  state.speed = parseInt(val, 10);
  const label = document.getElementById(widgetId + '-speed-label');
  if (label) label.textContent = val + 'ms';
  if (state.timer) {
    pauseRunDpDemo(widgetId);
    autoRunDpDemo(widgetId);
  }
}
window.setDpDemoSpeed = setDpDemoSpeed;

function renderDpDemoFrame(widgetId) {
  const state = DP_DEMOS[widgetId];
  if (!state) return;
  const frame = state.frames[state.index];
  const canvas = document.getElementById(widgetId + '-canvas');
  const status = document.getElementById(widgetId + '-status');
  if (canvas) {
    const is2D = Array.isArray(frame.dp) && frame.dp.length > 0 && Array.isArray(frame.dp[0]);
    canvas.innerHTML = is2D ? renderDpGridFrame(frame) : renderDpArrayFrame(frame);
  }
  if (status) status.textContent = 'Bước ' + (state.index + 1) + '/' + state.frames.length + ': ' + frame.desc;
}

function dpCellStyle(isCur) {
  const border = isCur ? '#38bdf8' : 'var(--border)';
  const bg = isCur ? 'rgba(56,189,248,0.15)' : 'var(--bg-overlay)';
  return 'width:40px;height:40px;display:flex;align-items:center;justify-content:center;border:2px solid ' + border + ';border-radius:6px;background:' + bg + ';font-family:var(--font-mono);font-weight:600;font-size:13px;';
}

function renderDpArrayFrame(frame) {
  const curIdx = (typeof frame.i === 'number') ? frame.i : null;
  return '<div style="display:flex;gap:6px;flex-wrap:wrap;">' + frame.dp.map((v, idx) => {
    const isCur = curIdx !== null && idx === curIdx;
    const label = v === null || v === undefined ? '·' : v;
    return '<div style="display:flex;flex-direction:column;align-items:center;">' +
      '<div style="' + dpCellStyle(isCur) + '">' + label + '</div>' +
      '<div style="font-size:10px;color:var(--text-muted);margin-top:3px;font-family:var(--font-mono);">' + idx + '</div>' +
      '</div>';
  }).join('') + '</div>';
}

function renderDpGridFrame(frame) {
  const cur = frame.cur || null;
  const rows = frame.dp.map((row, i) => {
    const cells = row.map((v, j) => {
      const isCur = cur && cur[0] === i && cur[1] === j;
      const label = v === null || v === undefined ? '·' : v;
      return '<div style="' + dpCellStyle(isCur) + '">' + label + '</div>';
    }).join('');
    return '<div style="display:flex;gap:6px;">' + cells + '</div>';
  }).join('');
  return '<div style="display:flex;flex-direction:column;gap:6px;">' + rows + '</div>';
}

// ── Interactive Widgets Logic for Chapter 15 (Greedy) ───────────────

// ------------------------------------------------------------------
// 15.1 Coin Change Greedy: real algorithm run at init time to build frames
// (guarantees correctness instead of hand-authoring the trace).
// ------------------------------------------------------------------
const COIN_CHANGE_GREEDY_MODES = {
  ok: { coins: [1, 5, 10, 20, 50, 100], amt: 140 },
  fail: { coins: [1, 20, 50], amt: 60 },
};
let coinChangeGreedyMode = 'ok';
let coinChangeGreedyFrames = [];
let coinChangeGreedyIndex = 0;
let coinChangeGreedyTimer = null;
let coinChangeGreedySpeed = 700;

function buildCoinChangeGreedyFrames(coins, amt) {
  const frames = [];
  let i = coins.length - 1;
  let count = 0;
  let remaining = amt;
  const picks = [];
  frames.push({ coins, remaining, picks: picks.slice(), count, i, desc: 'Bắt đầu: amt = ' + amt + ', coins = [' + coins.join(', ') + '].' });
  while (remaining > 0) {
    while (i > 0 && coins[i] > remaining) i--;
    if (coins[i] > remaining) break; // no coin fits (shouldn't happen with coin 1 present)
    remaining -= coins[i];
    count++;
    picks.push(coins[i]);
    frames.push({ coins, remaining, picks: picks.slice(), count, i, desc: 'Chọn đồng ' + coins[i] + ', còn lại ' + remaining + '.' });
  }
  if (remaining === 0) {
    frames.push({ coins, remaining, picks: picks.slice(), count, i, desc: 'Hoàn tất! Tổng cộng ' + count + ' đồng xu: [' + picks.join(', ') + '].' });
  } else {
    frames.push({ coins, remaining, picks: picks.slice(), count, i, desc: 'Không thể tạo đủ số tiền. Trả về -1.' });
  }
  return frames;
}

function renderCoinChangeGreedy() {
  const frame = coinChangeGreedyFrames[coinChangeGreedyIndex];
  const canvas = document.getElementById('coin-change-greedy-canvas');
  if (canvas) {
    const picksHtml = frame.picks.length
      ? frame.picks.map(c => '<span style="display:inline-block;padding:6px 10px;margin:2px;border:2px solid #f97316;border-radius:999px;background:rgba(249,115,22,0.12);font-family:var(--font-mono);font-weight:700;">' + c + '</span>').join('')
      : '<span style="color:var(--text-muted);">(chưa chọn đồng nào)</span>';
    canvas.innerHTML =
      '<div style="margin-bottom:0.5em;">Số tiền còn lại: <strong style="font-family:var(--font-mono);font-size:18px;">' + frame.remaining + '</strong> / ' + coinChangeGreedyFrames[0].remaining + '</div>' +
      '<div>Đã chọn (' + frame.count + ' đồng): ' + picksHtml + '</div>';
  }
  const statusEl = document.getElementById('coin-change-greedy-status');
  if (statusEl) statusEl.textContent = 'Bước ' + (coinChangeGreedyIndex + 1) + '/' + coinChangeGreedyFrames.length + ': ' + frame.desc;
}

function setCoinChangeGreedyMode(mode) {
  coinChangeGreedyMode = mode;
  document.getElementById('coin-change-greedy-btn-mode1').classList.toggle('btn-secondary', mode !== 'ok');
  document.getElementById('coin-change-greedy-btn-mode2').classList.toggle('btn-secondary', mode !== 'fail');
  initCoinChangeGreedyDemo();
}
window.setCoinChangeGreedyMode = setCoinChangeGreedyMode;

function initCoinChangeGreedyDemo() {
  clearInterval(coinChangeGreedyTimer);
  coinChangeGreedyTimer = null;
  const cfg = COIN_CHANGE_GREEDY_MODES[coinChangeGreedyMode];
  coinChangeGreedyFrames = buildCoinChangeGreedyFrames(cfg.coins, cfg.amt);
  coinChangeGreedyIndex = 0;
  renderCoinChangeGreedy();
  const btnPause = document.getElementById('coin-change-greedy-btn-pause');
  const btnAuto = document.getElementById('coin-change-greedy-btn-autorun');
  if (btnPause) btnPause.disabled = true;
  if (btnAuto) btnAuto.disabled = false;
}
window.initCoinChangeGreedyDemo = initCoinChangeGreedyDemo;

function stepCoinChangeGreedy() {
  if (coinChangeGreedyIndex >= coinChangeGreedyFrames.length - 1) return;
  coinChangeGreedyIndex++;
  renderCoinChangeGreedy();
}
window.stepCoinChangeGreedy = stepCoinChangeGreedy;

function autoRunCoinChangeGreedy() {
  document.getElementById('coin-change-greedy-btn-autorun').disabled = true;
  document.getElementById('coin-change-greedy-btn-pause').disabled = false;
  coinChangeGreedyTimer = setInterval(() => {
    if (coinChangeGreedyIndex >= coinChangeGreedyFrames.length - 1) {
      pauseRunCoinChangeGreedy();
      return;
    }
    stepCoinChangeGreedy();
  }, coinChangeGreedySpeed);
}
window.autoRunCoinChangeGreedy = autoRunCoinChangeGreedy;

function pauseRunCoinChangeGreedy() {
  clearInterval(coinChangeGreedyTimer);
  coinChangeGreedyTimer = null;
  document.getElementById('coin-change-greedy-btn-autorun').disabled = false;
  document.getElementById('coin-change-greedy-btn-pause').disabled = true;
}
window.pauseRunCoinChangeGreedy = pauseRunCoinChangeGreedy;

function setCoinChangeGreedySpeed(val) {
  coinChangeGreedySpeed = parseInt(val, 10);
  document.getElementById('coin-change-greedy-speed-label').textContent = val + 'ms';
  if (coinChangeGreedyTimer) {
    pauseRunCoinChangeGreedy();
    autoRunCoinChangeGreedy();
  }
}
window.setCoinChangeGreedySpeed = setCoinChangeGreedySpeed;

// ------------------------------------------------------------------
// 15.2 Fractional Knapsack: wgt=[10,20,30,40,50], val=[50,120,150,210,240], cap=50
// (exact hello-algo driver-code example). Frames built by actually running
// the real greedy algorithm.
// ------------------------------------------------------------------
let fractionalKnapsackFrames = [];
let fractionalKnapsackIndex = 0;
let fractionalKnapsackTimer = null;
let fractionalKnapsackSpeed = 900;

function buildFractionalKnapsackFrames() {
  const wgt = [10, 20, 30, 40, 50];
  const val = [50, 120, 150, 210, 240];
  const cap0 = 50;
  const items = wgt.map((w, idx) => ({ w, v: val[idx] }));
  const sorted = items.slice().sort((a, b) => (b.v / b.w) - (a.v / a.w));
  const frames = [];
  let cap = cap0;
  let res = 0;
  frames.push({
    sorted: sorted.slice(), cap, res, curIdx: -1, taken: [],
    desc: 'Sắp xếp vật phẩm theo giá trị đơn vị giảm dần: ' + sorted.map(it => '(w=' + it.w + ',v=' + it.v + ',đơn vị=' + (it.v / it.w).toFixed(2) + ')').join(', ') + '. Sức chứa cap = ' + cap0 + '.'
  });
  const taken = [];
  for (let idx = 0; idx < sorted.length; idx++) {
    const item = sorted[idx];
    if (item.w <= cap) {
      res += item.v;
      cap -= item.w;
      taken.push({ w: item.w, v: item.v, frac: 1 });
      frames.push({
        sorted: sorted.slice(), cap, res, curIdx: idx, taken: taken.slice(),
        desc: 'Vật (w=' + item.w + ',v=' + item.v + ') vừa đủ chỗ → lấy TOÀN BỘ. res = ' + res.toFixed(1) + ', cap còn lại = ' + cap + '.'
      });
    } else {
      const partVal = (item.v / item.w) * cap;
      res += partVal;
      taken.push({ w: cap, v: partVal, frac: cap / item.w });
      cap = 0;
      frames.push({
        sorted: sorted.slice(), cap, res, curIdx: idx, taken: taken.slice(),
        desc: 'Vật (w=' + item.w + ',v=' + item.v + ') không vừa hết → lấy một PHẦN (' + (taken[taken.length - 1].frac * 100).toFixed(0) + '%). res = ' + res.toFixed(1) + '. Túi đã đầy, dừng lại.'
      });
      break;
    }
  }
  frames.push({ sorted: sorted.slice(), cap, res, curIdx: -1, taken: taken.slice(), desc: 'Hoàn tất! Tổng giá trị lớn nhất res = ' + res.toFixed(1) + '.' });
  return frames;
}

function renderFractionalKnapsack() {
  const frame = fractionalKnapsackFrames[fractionalKnapsackIndex];
  const canvas = document.getElementById('fractional-knapsack-canvas');
  if (canvas) {
    const itemsHtml = frame.sorted.map((it, idx) => {
      const isCur = idx === frame.curIdx;
      const border = isCur ? '#38bdf8' : 'var(--border)';
      const bg = isCur ? 'rgba(56,189,248,0.15)' : 'var(--bg-overlay)';
      return '<div style="display:inline-block;padding:8px 12px;margin:3px;border:2px solid ' + border + ';border-radius:8px;background:' + bg + ';font-family:var(--font-mono);font-size:13px;">' +
        'w=' + it.w + ', v=' + it.v + '<br/>đơn vị=' + (it.v / it.w).toFixed(2) + '</div>';
    }).join('');
    canvas.innerHTML =
      '<div style="margin-bottom:0.5em;">Danh sách vật phẩm (đã sắp xếp theo giá trị đơn vị):</div>' +
      '<div>' + itemsHtml + '</div>' +
      '<div style="margin-top:0.75em;">Sức chứa còn lại: <strong style="font-family:var(--font-mono);">' + frame.cap + '</strong> &nbsp;|&nbsp; Tổng giá trị hiện tại: <strong style="font-family:var(--font-mono);">' + frame.res.toFixed(1) + '</strong></div>';
  }
  const statusEl = document.getElementById('fractional-knapsack-status');
  if (statusEl) statusEl.textContent = 'Bước ' + (fractionalKnapsackIndex + 1) + '/' + fractionalKnapsackFrames.length + ': ' + frame.desc;
}

function initFractionalKnapsackDemo() {
  clearInterval(fractionalKnapsackTimer);
  fractionalKnapsackTimer = null;
  fractionalKnapsackFrames = buildFractionalKnapsackFrames();
  fractionalKnapsackIndex = 0;
  renderFractionalKnapsack();
  document.getElementById('fractional-knapsack-btn-pause').disabled = true;
  document.getElementById('fractional-knapsack-btn-autorun').disabled = false;
}
window.initFractionalKnapsackDemo = initFractionalKnapsackDemo;

function stepFractionalKnapsack() {
  if (fractionalKnapsackIndex >= fractionalKnapsackFrames.length - 1) return;
  fractionalKnapsackIndex++;
  renderFractionalKnapsack();
}
window.stepFractionalKnapsack = stepFractionalKnapsack;

function autoRunFractionalKnapsack() {
  document.getElementById('fractional-knapsack-btn-autorun').disabled = true;
  document.getElementById('fractional-knapsack-btn-pause').disabled = false;
  fractionalKnapsackTimer = setInterval(() => {
    if (fractionalKnapsackIndex >= fractionalKnapsackFrames.length - 1) {
      pauseRunFractionalKnapsack();
      return;
    }
    stepFractionalKnapsack();
  }, fractionalKnapsackSpeed);
}
window.autoRunFractionalKnapsack = autoRunFractionalKnapsack;

function pauseRunFractionalKnapsack() {
  clearInterval(fractionalKnapsackTimer);
  fractionalKnapsackTimer = null;
  document.getElementById('fractional-knapsack-btn-autorun').disabled = false;
  document.getElementById('fractional-knapsack-btn-pause').disabled = true;
}
window.pauseRunFractionalKnapsack = pauseRunFractionalKnapsack;

function setFractionalKnapsackSpeed(val) {
  fractionalKnapsackSpeed = parseInt(val, 10);
  document.getElementById('fractional-knapsack-speed-label').textContent = val + 'ms';
  if (fractionalKnapsackTimer) {
    pauseRunFractionalKnapsack();
    autoRunFractionalKnapsack();
  }
}
window.setFractionalKnapsackSpeed = setFractionalKnapsackSpeed;

// ------------------------------------------------------------------
// 15.3 Max Capacity: ht=[3,8,5,2,7,7,3,4] (exact hello-algo driver example,
// matches the 9 static step images shown above). Reuses renderPointerArray
// from Chapter 10.
// ------------------------------------------------------------------
const maxCapacityArr = [3, 8, 5, 2, 7, 7, 3, 4];
let maxCapacityFrames = [];
let maxCapacityIndex = 0;
let maxCapacityTimer = null;
let maxCapacitySpeed = 900;

function buildMaxCapacityFrames() {
  const ht = maxCapacityArr;
  const frames = [];
  let i = 0, j = ht.length - 1, res = 0;
  frames.push({ i, j, res, desc: 'Khởi tạo i=0, j=' + j + ' ở hai đầu mảng, res=0.' });
  while (i < j) {
    const cap = Math.min(ht[i], ht[j]) * (j - i);
    res = Math.max(res, cap);
    frames.push({ i, j, res, desc: 'cap[' + i + ',' + j + '] = min(' + ht[i] + ',' + ht[j] + ') × ' + (j - i) + ' = ' + cap + '. res = ' + res + '.' });
    if (ht[i] < ht[j]) { i++; } else { j--; }
    frames.push({ i, j, res, desc: 'Di chuyển con trỏ tương ứng vách ngắn hơn vào trong → i=' + i + ', j=' + j + '.' });
  }
  frames.push({ i, j, res, desc: 'i và j gặp nhau. Dừng lại. Dung tích lớn nhất res = ' + res + '.' });
  return frames;
}

function renderMaxCapacity() {
  const frame = maxCapacityFrames[maxCapacityIndex];
  renderPointerArray('max-capacity-canvas', maxCapacityArr, { i: frame.i, j: frame.j }, { range: [frame.i, frame.j] });
  const canvas = document.getElementById('max-capacity-canvas');
  if (canvas) {
    canvas.innerHTML += '<div style="margin-top:0.5em;">Dung tích lớn nhất hiện tại: <strong style="font-family:var(--font-mono);">' + frame.res + '</strong></div>';
  }
  const statusEl = document.getElementById('max-capacity-status');
  if (statusEl) statusEl.textContent = 'Bước ' + (maxCapacityIndex + 1) + '/' + maxCapacityFrames.length + ': ' + frame.desc;
}

function initMaxCapacityDemo() {
  clearInterval(maxCapacityTimer);
  maxCapacityTimer = null;
  maxCapacityFrames = buildMaxCapacityFrames();
  maxCapacityIndex = 0;
  renderMaxCapacity();
  document.getElementById('max-capacity-btn-pause').disabled = true;
  document.getElementById('max-capacity-btn-autorun').disabled = false;
}
window.initMaxCapacityDemo = initMaxCapacityDemo;

function stepMaxCapacity() {
  if (maxCapacityIndex >= maxCapacityFrames.length - 1) return;
  maxCapacityIndex++;
  renderMaxCapacity();
}
window.stepMaxCapacity = stepMaxCapacity;

function autoRunMaxCapacity() {
  document.getElementById('max-capacity-btn-autorun').disabled = true;
  document.getElementById('max-capacity-btn-pause').disabled = false;
  maxCapacityTimer = setInterval(() => {
    if (maxCapacityIndex >= maxCapacityFrames.length - 1) {
      pauseRunMaxCapacity();
      return;
    }
    stepMaxCapacity();
  }, maxCapacitySpeed);
}
window.autoRunMaxCapacity = autoRunMaxCapacity;

function pauseRunMaxCapacity() {
  clearInterval(maxCapacityTimer);
  maxCapacityTimer = null;
  document.getElementById('max-capacity-btn-autorun').disabled = false;
  document.getElementById('max-capacity-btn-pause').disabled = true;
}
window.pauseRunMaxCapacity = pauseRunMaxCapacity;

function setMaxCapacitySpeed(val) {
  maxCapacitySpeed = parseInt(val, 10);
  document.getElementById('max-capacity-speed-label').textContent = val + 'ms';
  if (maxCapacityTimer) {
    pauseRunMaxCapacity();
    autoRunMaxCapacity();
  }
}
window.setMaxCapacitySpeed = setMaxCapacitySpeed;

// ------------------------------------------------------------------
// 15.4 Max Product Cutting: shows the a=n//3, b=n%3 breakdown for a
// user-selectable n (58 = hello-algo's own driver example; 10 = simple
// b==1 case; 2 = the n<=3 edge case).
// ------------------------------------------------------------------
let maxProductCuttingN = 58;
let maxProductCuttingFrames = [];
let maxProductCuttingIndex = 0;
let maxProductCuttingTimer = null;
let maxProductCuttingSpeed = 900;

function buildMaxProductCuttingFrames(n) {
  const frames = [];
  frames.push({ text: 'n = ' + n, desc: 'Bắt đầu với n = ' + n + '.' });
  if (n <= 3) {
    const result = 1 * (n - 1);
    frames.push({ text: 'n = ' + n + ' ≤ 3', desc: 'n ≤ 3 → trường hợp biên: bắt buộc phải tách ra một đoạn 1.' });
    frames.push({ text: 'Kết quả = 1 × (n - 1) = 1 × ' + (n - 1) + ' = ' + result, desc: 'Kết quả = 1 × (' + n + ' - 1) = ' + result + '.' });
    return frames;
  }
  const a = Math.floor(n / 3);
  const b = n % 3;
  frames.push({ text: 'a = n // 3 = ' + a + ',  b = n % 3 = ' + b, desc: 'Tính a = ' + n + ' // 3 = ' + a + ', b = ' + n + ' % 3 = ' + b + '. (n = 3a + b)' });
  let result, formula;
  if (b === 1) {
    result = Math.pow(3, a - 1) * 2 * 2;
    formula = '3^(a-1) × 2 × 2 = 3^' + (a - 1) + ' × 4 = ' + result;
    frames.push({ text: 'b = 1 → chuyển 1×3 thành 2×2', desc: 'Phần dư b=1: thay một thừa số 3 và phần dư 1 bằng hai số 2 (vì 2×2 > 1×3).' });
  } else if (b === 2) {
    result = Math.pow(3, a) * 2;
    formula = '3^a × 2 = 3^' + a + ' × 2 = ' + result;
    frames.push({ text: 'b = 2 → giữ nguyên', desc: 'Phần dư b=2: không cần tách thêm, giữ nguyên đoạn 2.' });
  } else {
    result = Math.pow(3, a);
    formula = '3^a = 3^' + a + ' = ' + result;
    frames.push({ text: 'b = 0 → không cần thao tác gì', desc: 'Phần dư b=0: n là bội số của 3, không cần thao tác gì thêm.' });
  }
  frames.push({ text: 'Kết quả = ' + formula, desc: 'Tích lớn nhất = ' + formula + '.' });
  return frames;
}

function renderMaxProductCutting() {
  const frame = maxProductCuttingFrames[maxProductCuttingIndex];
  const canvas = document.getElementById('max-product-cutting-canvas');
  if (canvas) canvas.innerHTML = '<div>' + frame.text + '</div>';
  const statusEl = document.getElementById('max-product-cutting-status');
  if (statusEl) statusEl.textContent = 'Bước ' + (maxProductCuttingIndex + 1) + '/' + maxProductCuttingFrames.length + ': ' + frame.desc;
}

function setMaxProductCuttingMode(n) {
  maxProductCuttingN = n;
  document.getElementById('max-product-cutting-btn-mode1').classList.toggle('btn-secondary', n !== 58);
  document.getElementById('max-product-cutting-btn-mode2').classList.toggle('btn-secondary', n !== 10);
  document.getElementById('max-product-cutting-btn-mode3').classList.toggle('btn-secondary', n !== 2);
  initMaxProductCuttingDemo();
}
window.setMaxProductCuttingMode = setMaxProductCuttingMode;

function initMaxProductCuttingDemo() {
  clearInterval(maxProductCuttingTimer);
  maxProductCuttingTimer = null;
  maxProductCuttingFrames = buildMaxProductCuttingFrames(maxProductCuttingN);
  maxProductCuttingIndex = 0;
  renderMaxProductCutting();
  document.getElementById('max-product-cutting-btn-pause').disabled = true;
  document.getElementById('max-product-cutting-btn-autorun').disabled = false;
}
window.initMaxProductCuttingDemo = initMaxProductCuttingDemo;

function stepMaxProductCutting() {
  if (maxProductCuttingIndex >= maxProductCuttingFrames.length - 1) return;
  maxProductCuttingIndex++;
  renderMaxProductCutting();
}
window.stepMaxProductCutting = stepMaxProductCutting;

function autoRunMaxProductCutting() {
  document.getElementById('max-product-cutting-btn-autorun').disabled = true;
  document.getElementById('max-product-cutting-btn-pause').disabled = false;
  maxProductCuttingTimer = setInterval(() => {
    if (maxProductCuttingIndex >= maxProductCuttingFrames.length - 1) {
      pauseRunMaxProductCutting();
      return;
    }
    stepMaxProductCutting();
  }, maxProductCuttingSpeed);
}
window.autoRunMaxProductCutting = autoRunMaxProductCutting;

function pauseRunMaxProductCutting() {
  clearInterval(maxProductCuttingTimer);
  maxProductCuttingTimer = null;
  document.getElementById('max-product-cutting-btn-autorun').disabled = false;
  document.getElementById('max-product-cutting-btn-pause').disabled = true;
}
window.pauseRunMaxProductCutting = pauseRunMaxProductCutting;

function setMaxProductCuttingSpeed(val) {
  maxProductCuttingSpeed = parseInt(val, 10);
  document.getElementById('max-product-cutting-speed-label').textContent = val + 'ms';
  if (maxProductCuttingTimer) {
    pauseRunMaxProductCutting();
    autoRunMaxProductCutting();
  }
}
window.setMaxProductCuttingSpeed = setMaxProductCuttingSpeed;

// ── Multi-Theme Engine & Palette Architecture ───────────────────────
const THEME_STORAGE_KEY = 'kos-theme';

const THEMES = [
  {
    id: 'dark',
    name: 'Linear Titanium',
    desc: 'Tối • $150k Tech SaaS',
    dotBg: 'linear-gradient(135deg, #0E1017, #8B5CF6)',
    isLight: false,
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
  },
  {
    id: 'light',
    name: 'Crisp Porcelain',
    desc: 'Sáng • Minimalist sắc nét',
    dotBg: 'linear-gradient(135deg, #FFFFFF, #0284C7)',
    isLight: true,
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.07" y2="4.93"/></svg>'
  },
  {
    id: 'editorial',
    name: 'Editorial Luxury',
    desc: 'Sáng • Kem ngà & Than đen',
    dotBg: 'linear-gradient(135deg, #FAF8F5, #C2410C)',
    isLight: true,
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>'
  },
  {
    id: 'catppuccin',
    name: 'Catppuccin Macchiato',
    desc: 'Tối • Tím nhung & Lavender',
    dotBg: 'linear-gradient(135deg, #181926, #B7BDF8)',
    isLight: false,
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><path d="M12 6v6l4 2"/></svg>'
  },
  {
    id: 'matcha',
    name: 'Matcha Zen',
    desc: 'Sáng • Xanh rừng & Muji',
    dotBg: 'linear-gradient(135deg, #F5F7F4, #2D6A4F)',
    isLight: true,
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>'
  },
  {
    id: 'glacier',
    name: 'Arctic Glacier',
    desc: 'Tối • Băng tuyết Bắc Âu',
    dotBg: 'linear-gradient(135deg, #11161D, #38BDF8)',
    isLight: false,
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/><line x1="19.07" y1="4.93" x2="4.93" y2="19.07"/></svg>'
  }
];

function getSavedTheme() {
  try { return localStorage.getItem(THEME_STORAGE_KEY) || 'dark'; } catch (e) { return 'dark'; }
}

function getMermaidConfig() {
  const currentThemeId = getSavedTheme();
  const themeObj = (typeof THEMES !== 'undefined' && THEMES.find(t => t.id === currentThemeId)) || { isLight: currentThemeId === 'light' || currentThemeId === 'editorial' || currentThemeId === 'matcha' };
  const isLight = themeObj.isLight;
  return {
    startOnLoad: false,
    securityLevel: 'loose',
    theme: 'base',
    fontFamily: 'Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 13,
    themeVariables: {
      darkMode: !isLight,
      fontFamily: 'Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontSize: '13px',
      primaryColor: isLight ? '#f8fafc' : '#0f172a',
      primaryTextColor: isLight ? '#0f172a' : '#f8fafc',
      primaryBorderColor: isLight ? 'rgba(15, 23, 42, 0.16)' : 'rgba(255, 255, 255, 0.16)',
      lineColor: isLight ? '#64748b' : '#94a3b8',
      secondaryColor: isLight ? '#f1f5f9' : '#1e293b',
      tertiaryColor: isLight ? '#ffffff' : '#090d16',
      mainBkg: isLight ? '#ffffff' : '#0f172a',
      nodeBorder: isLight ? 'rgba(15, 23, 42, 0.16)' : 'rgba(255, 255, 255, 0.16)',
      nodeTextColor: isLight ? '#0f172a' : '#f8fafc',
      edgeLabelBackground: isLight ? '#ffffff' : '#0f172a',
      clusterBkg: isLight ? 'rgba(15, 23, 42, 0.02)' : 'rgba(255, 255, 255, 0.02)',
      clusterBorder: isLight ? 'rgba(15, 23, 42, 0.08)' : 'rgba(255, 255, 255, 0.08)',
      titleColor: isLight ? '#0f172a' : '#f8fafc'
    },
    flowchart: {
      htmlLabels: true,
      curve: 'bumpX',
      nodeSpacing: 45,
      rankSpacing: 55,
      padding: 16
    }
  };
}

function reRenderMermaid() {
  if (!window.mermaid) return;
  mermaid.initialize(getMermaidConfig());
  let hasDiagrams = false;
  document.querySelectorAll('#prose-content .mermaid, #prose-content pre.mermaid').forEach(el => {
    const src = el.getAttribute('data-mermaid-source');
    if (src) { el.innerHTML = src; el.removeAttribute('data-processed'); hasDiagrams = true; }
  });
  if (hasDiagrams) {
    mermaid.run({ querySelector: '#prose-content .mermaid, #prose-content pre.mermaid' })
      .then(() => setTimeout(enhanceMermaidDiagrams, 80))
      .catch(e => console.error('Mermaid error:', e));
  }
}

// ── Mermaid UX Enhancement: scroll hint, zoom, pan, fullscreen ────────
function enhanceMermaidDiagrams() {
  const diagrams = document.querySelectorAll('#prose-content .mermaid');
  if (!diagrams.length) return;
  diagrams.forEach(el => {
    // Avoid double-wrapping
    if (el.parentElement && el.parentElement.classList.contains('mermaid-wrapper')) {
      updateMermaidWrapperState(el.parentElement, el);
      return;
    }
    const wrapper = document.createElement('div');
    wrapper.className = 'mermaid-wrapper';
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);

    // Toolbar
    const toolbar = document.createElement('div');
    toolbar.className = 'mermaid-toolbar';
    toolbar.innerHTML = `
      <button type="button" class="mermaid-zoom-out" title="Thu nhỏ (Zoom out)" aria-label="Thu nhỏ">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/><circle cx="12" cy="12" r="9"/></svg>
      </button>
      <span class="mermaid-zoom-label">100%</span>
      <button type="button" class="mermaid-zoom-in" title="Phóng to (Zoom in)" aria-label="Phóng to">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/><circle cx="12" cy="12" r="9"/></svg>
      </button>
      <button type="button" class="mermaid-zoom-reset" title="Đặt lại (Reset)" aria-label="Đặt lại">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7"/><polyline points="3 3 3 9 9 9"/></svg>
      </button>
      <span class="mermaid-divider"></span>
      <button type="button" class="mermaid-fullscreen-btn" title="Toàn màn hình (Fullscreen)" aria-label="Toàn màn hình">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
      </button>
    `;
    wrapper.appendChild(toolbar);

    // Scroll hint
    const hint = document.createElement('div');
    hint.className = 'mermaid-hint';
    hint.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      Kéo để xem &bull; Lăn chuột để cuộn
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    `;
    wrapper.appendChild(hint);

    // Zoom state per diagram
    let zoom = 1;
    const label = toolbar.querySelector('.mermaid-zoom-label');
    const svgEl = () => el.querySelector('svg');
    const applyZoom = (next) => {
      zoom = Math.min(2.4, Math.max(0.5, next));
      const svg = svgEl();
      if (svg) svg.style.transform = zoom === 1 ? '' : `scale(${zoom})`;
      if (label) label.textContent = Math.round(zoom * 100) + '%';
    };
    toolbar.querySelector('.mermaid-zoom-in').addEventListener('click', (e) => { e.stopPropagation(); applyZoom(zoom + 0.2); });
    toolbar.querySelector('.mermaid-zoom-out').addEventListener('click', (e) => { e.stopPropagation(); applyZoom(zoom - 0.2); });
    toolbar.querySelector('.mermaid-zoom-reset').addEventListener('click', (e) => { e.stopPropagation(); applyZoom(1); el.scrollTo({ left: 0, behavior: 'smooth' }); });

    // Fullscreen
    const fsBtn = toolbar.querySelector('.mermaid-fullscreen-btn');
    const toggleFullscreen = (e) => {
      if (e) e.stopPropagation();
      if (document.fullscreenElement === wrapper) {
        document.exitFullscreen().catch(() => wrapper.classList.remove('is-fullscreen'));
      } else if (wrapper.requestFullscreen) {
        wrapper.requestFullscreen().catch(() => {
          wrapper.classList.toggle('is-fullscreen');
          document.body.style.overflow = wrapper.classList.contains('is-fullscreen') ? 'hidden' : '';
        });
      } else {
        const isFs = wrapper.classList.toggle('is-fullscreen');
        document.body.style.overflow = isFs ? 'hidden' : '';
      }
    };
    fsBtn.addEventListener('click', toggleFullscreen);
    // ESC to exit fallback fullscreen
    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
        document.querySelectorAll('.mermaid-wrapper.is-fullscreen').forEach(w => w.classList.remove('is-fullscreen'));
        document.body.style.overflow = '';
      }
      wrapper.classList.toggle('is-fullscreen', document.fullscreenElement === wrapper);
    });
    // Double-click to fullscreen
    el.addEventListener('dblclick', toggleFullscreen);

    // Drag to scroll (mouse)
    let isDown = false, startX, scrollLeft, startY, scrollTop;
    el.addEventListener('mousedown', (e) => {
      // ignore if clicking toolbar
      if (e.target.closest('.mermaid-toolbar')) return;
      isDown = true;
      el.style.cursor = 'grabbing';
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      startY = e.pageY - el.offsetTop;
      scrollTop = el.scrollTop;
    });
    el.addEventListener('mouseleave', () => { isDown = false; el.style.cursor = 'grab'; });
    el.addEventListener('mouseup', () => { isDown = false; el.style.cursor = 'grab'; });
    el.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const y = e.pageY - el.offsetTop;
      el.scrollLeft = scrollLeft - (x - startX);
      el.scrollTop = scrollTop - (y - startY);
    });
    // Wheel: shift+wheel already horizontal, but hint vertical scroll for tall
    el.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      // allow Ctrl+wheel to zoom
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        applyZoom(zoom + (e.deltaY < 0 ? 0.08 : -0.08));
      }
    }, { passive: false });

    // Scroll shadows + hide hint after interaction
    const onScroll = () => {
      const canLeft = el.scrollLeft > 4;
      const canRight = el.scrollLeft + el.clientWidth < el.scrollWidth - 4;
      wrapper.classList.toggle('can-scroll-left', canLeft);
      wrapper.classList.toggle('can-scroll-right', canRight);
      if (canLeft || el.scrollTop > 4) wrapper.classList.add('hint-hidden');
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    // Touch: hide hint after first touch
    el.addEventListener('touchstart', () => wrapper.classList.add('hint-hidden'), { passive: true });

    updateMermaidWrapperState(wrapper, el);
    // Re-check after svg layout
    setTimeout(() => updateMermaidWrapperState(wrapper, el), 400);
    // Observe resize
    const ro = new ResizeObserver(() => updateMermaidWrapperState(wrapper, el));
    ro.observe(el);
    if (svgEl()) ro.observe(svgEl());
    el._mermaidRO = ro;
  });
}

function updateMermaidWrapperState(wrapper, el) {
  const hasHScroll = el.scrollWidth > el.clientWidth + 8;
  const hasVScroll = el.scrollHeight > el.clientHeight + 8;
  const isTall = el.scrollHeight > 540 || (el.querySelector('svg') && el.querySelector('svg').getBoundingClientRect().height > 520);
  wrapper.classList.toggle('has-scroll', hasHScroll || hasVScroll);
  wrapper.classList.toggle('is-tall', isTall);
  const canLeft = el.scrollLeft > 4;
  const canRight = el.scrollLeft + el.clientWidth < el.scrollWidth - 4;
  wrapper.classList.toggle('can-scroll-left', canLeft);
  wrapper.classList.toggle('can-scroll-right', hasHScroll && !canLeft);
  // Auto-hide hint after 4s if not interacted
  clearTimeout(wrapper._hintTimer);
  if (hasHScroll) {
    wrapper.classList.remove('hint-hidden');
    wrapper._hintTimer = setTimeout(() => wrapper.classList.add('hint-hidden'), 4200);
  } else {
    wrapper.classList.add('hint-hidden');
  }
}

function ensureThemePickerElement() {
  let popover = document.getElementById('themePickerPopover');
  if (popover) return popover;

  const btn = document.getElementById('btn-theme');
  if (!btn) return null;

  // Create wrapper if not already wrapped
  let parent = btn.parentElement;
  if (!parent.classList.contains('theme-picker-wrapper')) {
    const wrapper = document.createElement('div');
    wrapper.className = 'theme-picker-wrapper';
    parent.insertBefore(wrapper, btn);
    wrapper.appendChild(btn);
  }

  popover = document.createElement('div');
  popover.id = 'themePickerPopover';
  popover.className = 'theme-picker-popover';
  popover.setAttribute('role', 'menu');
  popover.innerHTML = `
    <div class="theme-picker-header">Chọn Giao Diện</div>
    ${THEMES.map(t => `
      <button class="theme-option-btn" data-theme-id="${t.id}" onclick="selectTheme('${t.id}')">
        <span class="theme-preview-dot" style="background: ${t.dotBg};"></span>
        <span style="display:flex;flex-direction:column;gap:1px;">
          <span>${t.name}</span>
          <span style="font-size:10px;font-weight:400;color:var(--text-muted);">${t.desc}</span>
        </span>
        <svg class="theme-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </button>
    `).join('')}
  `;

  btn.parentElement.appendChild(popover);

  // Outside click listener
  document.addEventListener('click', (e) => {
    if (!popover.contains(e.target) && !btn.contains(e.target)) {
      popover.classList.remove('open');
    }
  });

  return popover;
}

function updateThemePickerActive(activeId) {
  const popover = document.getElementById('themePickerPopover');
  if (!popover) return;
  popover.querySelectorAll('.theme-option-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-theme-id') === activeId);
  });
}

function applyTheme(themeId) {
  const themeObj = THEMES.find(t => t.id === themeId) || THEMES[0];
  const root = document.documentElement;

  // Clear all theme classes
  THEMES.forEach(t => {
    if (t.id !== 'dark') {
      root.classList.remove(`theme-${t.id}`);
    }
  });

  // Apply new theme class
  if (themeObj.id !== 'dark') {
    root.classList.add(`theme-${themeObj.id}`);
  }

  const btn = document.getElementById('btn-theme');
  if (btn) {
    btn.innerHTML = themeObj.icon;
    const label = `Giao diện: ${themeObj.name} (Nhấn để đổi)`;
    btn.setAttribute('aria-label', label);
    btn.title = label;
  }

  try { localStorage.setItem(THEME_STORAGE_KEY, themeObj.id); } catch (e) {}
  updateThemePickerActive(themeObj.id);
  reRenderMermaid();

  // If Knowledge Graph is active, re-render frame
  if (typeof renderKgFrame === 'function') {
    renderKgFrame();
  }
}

function toggleThemePicker(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  const popover = ensureThemePickerElement();
  if (popover) {
    popover.classList.toggle('open');
    updateThemePickerActive(getSavedTheme());
  }
}
window.toggleThemePicker = toggleThemePicker;

function selectTheme(themeId) {
  applyTheme(themeId);
  const popover = document.getElementById('themePickerPopover');
  if (popover) popover.classList.remove('open');
}
window.selectTheme = selectTheme;

function toggleTheme(event) {
  toggleThemePicker(event);
}
window.toggleTheme = toggleTheme;

// ── Routing & Deep Linking ─────────────────────────────────────────
function handleUrlRouting() {
  const hash = window.location.hash.replace(/^#/, '');
  const urlParams = new URLSearchParams(window.location.search);
  const topicParam = urlParams.get('topic') || hash;

  if (topicParam && (typeof TOPIC_CONTENT !== 'undefined' && TOPIC_CONTENT[topicParam] || findTopic(topicParam))) {
    openTopic(topicParam, false);
    return true;
  }
  return false;
}

window.addEventListener('popstate', () => {
  const isMain = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/website/') || window.location.pathname.endsWith('/website');
  if (!handleUrlRouting()) {
    if (isMain) showHome(false);
  }
});

// ── Init & Interactive Spotlight Dynamics ───────────────────────────
// ── Init & Interactive 3D Gyro Dynamics ───────────────────────────
document.addEventListener('mousemove', (e) => {
  const card = e.target.closest('.rd-path-card, .rd-stat-card, .bezel-shell, .module-card, .bento-card-featured');
  if (card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    // Subtle 3D perspective tilt
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / cy) * -3;
    const ry = ((x - cx) / cx) * 3;
    card.style.transform = `perspective(800px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-2px)`;
  }
});

document.addEventListener('mouseout', (e) => {
  const card = e.target.closest('.rd-path-card, .rd-stat-card, .bezel-shell, .module-card, .bento-card-featured');
  if (card && !card.contains(e.relatedTarget)) {
    card.style.transform = '';
  }
});

// ── Reading Scroll Progress Tracker ───────────────────────────────
const mainScrollContainer = document.getElementById('main');
if (mainScrollContainer) {
  mainScrollContainer.addEventListener('scroll', () => {
    const rail = document.getElementById('scroll-progress-fill');
    if (rail) {
      const maxScroll = mainScrollContainer.scrollHeight - mainScrollContainer.clientHeight;
      const pct = maxScroll > 0 ? Math.min(100, Math.max(0, (mainScrollContainer.scrollTop / maxScroll) * 100)) : 0;
      rail.style.width = `${pct}%`;
      setReaderProgress(pct);
      if (rdPillEl) rdPillEl.classList.toggle('show', !!currentTopicId && mainScrollContainer.scrollTop > 520);
    }
  }, { passive: true });
}

applyTheme(getSavedTheme());
renderSidebar();
const isMainPortalPage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/website/') || window.location.pathname.endsWith('/website');
if (isMainPortalPage) {
  if (!handleUrlRouting()) {
    showHome(false);
  }
}







// ── Reading Enhancers: section reveal + TOC active tracking ──────
function initReadingEnhancers() {
  const proseEl = document.getElementById('prose-content');
  if (!proseEl) return;

  // Section reveal on viewport entry (transform/opacity only)
  if (rdRevealObserver) rdRevealObserver.disconnect();
  if (!RD_REDUCED_MOTION && 'IntersectionObserver' in window) {
    rdRevealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('rd-revealed');
          rdRevealObserver.unobserve(entry.target);
        }
      });
    }, { root: mainScrollContainer, rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    Array.from(proseEl.children).slice(0, 40).forEach(child => {
      if (child.tagName === 'SCRIPT' || child.classList.contains('rd-revealed')) return;
      child.classList.add('rd-reveal');
      rdRevealObserver.observe(child);
    });
  }

  // TOC active-section highlight
  if (rdTocObserver) rdTocObserver.disconnect();
  const tocEl = document.getElementById('toc');
  if (!tocEl || tocEl.style.display === 'none') return;
  if (!('IntersectionObserver' in window)) return;

  const headings = getTocHeadings(proseEl);
  const tocItems = tocEl.querySelectorAll('.toc-item');
  let currentActive = -1;

  const setActiveItem = idx => {
    if (idx === currentActive) return;
    currentActive = idx;
    tocItems.forEach((item, i) => item.classList.toggle('active', i === idx));
  };

  rdTocObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActiveItem(Number(entry.target.dataset.rdIdx));
    });
  }, { root: mainScrollContainer, rootMargin: '-72px 0px -68% 0px', threshold: 0 });

  headings.forEach((h, i) => {
    h.dataset.rdIdx = i;
    rdTocObserver.observe(h);
  });
}

// ── Reading Experience v2: deep-links, lightbox, reader pill ──────
// (rdState / rdPillEl / rdLightboxEl được khai báo sớm ở cụm Reading Enhancers)

function slugifyHeading(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/gi, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'section';
}

function hideReaderPill() {
  if (rdPillEl) rdPillEl.classList.remove('show');
}

function setReaderProgress(pct) {
  rdState.pct = pct;
  if (rdPillEl) {
    rdPillEl.querySelector('.rd-pill-fill').style.transform = `scaleX(${pct / 100})`;
    rdPillEl.querySelector('.rd-pill-pct').textContent = `${Math.round(pct)}%`;
  }
  document.documentElement.style.setProperty('--rd-progress', (pct / 100).toFixed(4));
}

function ensureReaderPill() {
  if (!rdPillEl) {
    rdPillEl = document.createElement('div');
    rdPillEl.className = 'rd-reader-pill';
    rdPillEl.setAttribute('role', 'button');
    rdPillEl.title = 'Lên đầu trang';
    rdPillEl.innerHTML = `
      <div class="rd-pill-progress"><div class="rd-pill-fill"></div></div>
      <span class="rd-pill-title"></span>
      <span class="rd-pill-pct">0%</span>
    `;
    rdPillEl.addEventListener('click', () => window.scrollToTopicTop());
    document.body.appendChild(rdPillEl);
  }
  rdPillEl.querySelector('.rd-pill-title').textContent = rdState.title;
  rdPillEl.classList.remove('show');
}

function ensureLightbox() {
  if (rdLightboxEl) return;
  rdLightboxEl = document.createElement('div');
  rdLightboxEl.className = 'rd-lightbox';
  rdLightboxEl.innerHTML = '<img alt="Xem ở độ phân giải đầy đủ" />';
  rdLightboxEl.addEventListener('click', () => rdLightboxEl.classList.remove('open'));
  document.body.appendChild(rdLightboxEl);

  document.addEventListener('click', e => {
    const img = e.target.closest('#prose-content img');
    if (!img || img.naturalWidth < 400) return;
    rdLightboxEl.querySelector('img').src = img.currentSrc || img.src;
    rdLightboxEl.classList.add('open');
  });
}

function initReadingExtras() {
  const proseEl = document.getElementById('prose-content');
  if (!proseEl) { hideReaderPill(); return; }

  const titleEl = document.querySelector('.content-title');
  rdState.title = titleEl ? titleEl.textContent.trim() : '';

  // Stable ids on doc headings → shareable section links
  const seen = {};
  getTocHeadings(proseEl).forEach(h => {
    const base = slugifyHeading(h.textContent);
    seen[base] = (seen[base] || 0) + 1;
    h.id = 's-' + base + (seen[base] > 1 ? '-' + seen[base] : '');
  });

  // Jump to section hash after render
  if (location.hash.startsWith('#s-')) {
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 350);
  }

  // Heading click → update hash + copy section link
  proseEl.addEventListener('click', e => {
    const h = e.target.closest('h2, h3');
    if (!h || !h.id || h.closest('pre, code')) return;
    const url = location.href.split('#')[0] + '#' + h.id;
    history.replaceState(null, '', '#' + h.id);
    navigator.clipboard.writeText(url)
      .then(() => showToast('🔗 Đã sao chép liên kết section!'))
      .catch(() => {});
  });

  ensureLightbox();
  ensureReaderPill();
}

// Keyboard: Z = zen toggle (trang đọc), Esc = đóng lightbox / thoát zen
document.addEventListener('keydown', e => {
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  const tag = (e.target.tagName || '').toLowerCase();
  if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;

  if (e.key === 'z' || e.key === 'Z') {
    const tools = document.getElementById('header-reading-tools');
    if (tools && tools.style.display !== 'none' && window.toggleZenMode) window.toggleZenMode();
  }

  if (e.key === 'Escape') {
    if (rdLightboxEl && rdLightboxEl.classList.contains('open')) {
      rdLightboxEl.classList.remove('open');
    } else if (document.getElementById('layout')?.classList.contains('zen-mode')) {
      window.toggleZenMode();
    }
  }
});
