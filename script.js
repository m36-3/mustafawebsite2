/* =======================================================
   script.js — منصة LMS متقدمة (Frontend only - LocalStorage)
   - بحث مع debounce و highlight
   - 9 دورات مضمّنة في الكود (thumbnails محددة في الكود)
   - صفحة منفصلة لكل دورة: course.html?course=<id>
   - لوحة المبرمج (محلية) لإضافة دورات ودروس (يستخدم كلمات مرور محلية)
   - التسجيل/الدخول المحلي للمستخدم (localStorage)
   ======================================================= */

/* ============================
   تهيئة: صور مصغّرة افتراضية (موجودة في الكود)
   إذا أردت تغيير صور الدورات، عدّل هذه المصفوفة أو استخدم روابطك الخاصة هنا.
   ============================ */
const DEFAULT_THUMBS = [
  "شعار بيت الحكمة .png",
  'https://images.unsplash.com/photo-1582719478250-7a55c0a8a1b3?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=6d2b0f4f7e3c6f2a8d7b1a1b2c3d4e5f',
  'https://images.unsplash.com/photo-1587502537745-8f47b6cfbf30?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=0f1a2b3c4d5e6f708091827364554433',
  'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=41a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6',
  'https://images.unsplash.com/photo-1582719478250-7a55c0a8a1b3?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=6d2b0f4f7e3c6f2a8d7b1a1b2c3d4e5f',
  'https://images.unsplash.com/photo-1580281657527-1a2b3c4d5e6f?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=abcdef1234567890abcdef1234567890',
  'https://images.unsplash.com/photo-1581092334492-6e5b2a551bda?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=5a9b1c6e3e9f2e71a0b6c4a2f9f4d1ad',
  'https://images.unsplash.com/photo-1542736667-069246bdbc6d?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=11223344556677889900aabbccddeeff',
  'https://images.unsplash.com/photo-1529238064297-8f1f3b6a0f3e?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=99887766554433221100ffeeddccbbaa'
];

/* ============================
   الدورات المضمّنة في الكود
   - إذا أردت إضافة دورة جديدة يدويًا في الكود: 
     * افتح هذا الملف script.js، مرّر إلى مصفوفة "COURSES_DEF" وأضف عنصرًا جديدًا بنفس البنية.
   - كل دورة: id فريد، title، description، language، level، thumbnail (اختياري)، lessons (مصفوفة).
   - كل درس: id فريد داخل الدروة، title، youtube (يمكن أن يكون رابط كامل أو معرّف 11 حرف).
   ============================ */
const COURSES_DEF = [
  {
    id: 'care',
    title: 'العناية',
    description: 'دورة شاملة في أساسيات العناية الطبية والتمريض.',
    language: 'ar',
    level: 'beginner',
    thumbnail: DEFAULT_THUMBS[0],
    lessons: [
      { id: 'care1', title: 'أساسيات العناية', youtube: 'https://www.youtube.com/watch?v=tbal-HMuACo' },
      { id: 'care2', title: 'مراقبة المريض', youtube: 'ysz5S6PUM-U' }
    ]
  },
  {
    id: 'anesthesia',
    title: 'التخدير',
    description: 'أساسيات وتقنيات التخدير في غرف العمليات.',
    language: 'ar',
    level: 'beginner',
    thumbnail: DEFAULT_THUMBS[1],
    lessons: [
      { id: 'an1', title: 'مقدمة في التخدير', youtube: 'M7lc1UVf-VE' }
    ]
  },
  {
    id: 'devices',
    title: 'الأجهزة',
    description: 'التعامل مع الأجهزة الطبية الحديثة وقراءة الشاشات.',
    language: 'ar',
    level: 'beginner',
    thumbnail: DEFAULT_THUMBS[2],
    lessons: [
      { id: 'dev1', title: 'أجهزة المراقبة', youtube: 'ysz5S6PUM-U' }
    ]
  },
  {
    id: 'surgery',
    title: 'الجراحة',
    description: 'مبادئ وتعليمات عامة للجراحة السريرية.',
    language: 'ar',
    level: 'intermediate',
    thumbnail: DEFAULT_THUMBS[3],
    lessons: [
      { id: 's1', title: 'التعقيم قبل الجراحة', youtube: 'dQw4w9WgXcQ' }
    ]
  },
  {
    id: 'nursing',
    title: 'التمريض',
    description: 'مهارات التمريض الأساسية والمتقدمة.',
    language: 'ar',
    level: 'beginner',
    thumbnail: DEFAULT_THUMBS[4],
    lessons: [
      { id: 'n1', title: 'مبادئ التمريض', youtube: 'M7lc1UVf-VE' }
    ]
  },
  {
    id: 'emergency',
    title: 'الطوارئ',
    description: 'إجراءات الاستجابة السريعة للحالات الحرجة.',
    language: 'ar',
    level: 'advanced',
    thumbnail: DEFAULT_THUMBS[5],
    lessons: [
      { id: 'e1', title: 'الإسعافات الأولية', youtube: 'ysz5S6PUM-U' }
    ]
  },
  {
    id: 'lab',
    title: 'المختبرات',
    description: 'أساسيات العمل في المختبرات وتحليل العينات.',
    language: 'ar',
    level: 'intermediate',
    thumbnail: DEFAULT_THUMBS[6],
    lessons: [
      { id: 'l1', title: 'سحب العينات', youtube: 'dQw4w9WgXcQ' }
    ]
  },
  {
    id: 'pharma',
    title: 'الصيدلة',
    description: 'مبادئ علم الأدوية وإدارة الجرعات.',
    language: 'ar',
    level: 'beginner',
    thumbnail: DEFAULT_THUMBS[7],
    lessons: [
      { id: 'p1', title: 'التعريف بعلم الأدوية', youtube: 'M7lc1UVf-VE' }
    ]
  },
  {
    id: 'nutrition',
    title: 'التغذية',
    description: 'التغذية العلاجية والأساسيات الغذائية للمريض.',
    language: 'ar',
    level: 'beginner',
    thumbnail: DEFAULT_THUMBS[8],
    lessons: [
      { id: 'ntr1', title: 'العناصر الغذائية', youtube: 'ysz5S6PUM-U' }
    ]
  }
];

/* ============================
   مفاتيح التخزين في localStorage
   ============================ */
const STORAGE = {
  COURSES: 'lms_courses_v1',
  USERS: 'lms_users_v1',
  CURRENT_USER: 'lms_current_user_v1',
  ENROLL: 'lms_enrollments_v1'
};

/* ============================
   تحميل البيانات من localStorage أو استخدام الافتراضي
   ============================ */
let allCourses = JSON.parse(localStorage.getItem(STORAGE.COURSES) || 'null') || JSON.parse(JSON.stringify(COURSES_DEF));
localStorage.setItem(STORAGE.COURSES, JSON.stringify(allCourses));

let users = JSON.parse(localStorage.getItem(STORAGE.USERS) || '[]');
let currentUser = JSON.parse(localStorage.getItem(STORAGE.CURRENT_USER) || 'null');
let enrollments = JSON.parse(localStorage.getItem(STORAGE.ENROLL) || '{}'); // structure: { email: [courseId,...], progress: { email: { courseId: { lessonId: percent }}} }

/* ============================
   مساعدة: استخراج معرف يوتيوب من رابط أو معرّف
   ============================ */
function parseYouTubeId(input){
  if(!input) return null;
  input = input.trim();
  // لو هو 11 حرف فقط
  const id11 = input.match(/^[\w-]{11}$/);
  if(id11) return id11[0];
  // رابط كامل
  try{
    const u = new URL(input);
    if(u.hostname.includes('youtu.be')) return u.pathname.slice(1);
    if(u.hostname.includes('youtube.com')) return u.searchParams.get('v');
  }catch(e){}
  // محاولات احتياطية
  const m = input.match(/v=([\w-]{11})/);
  if(m) return m[1];
  const m2 = input.match(/([\w-]{11})/);
  if(m2) return m2[1];
  return null;
}

/* ============================
   مساعدة: تفريغ HTML آمن + تمييز كلمات البحث
   ============================ */
function escapeHtml(s=''){ return s.toString().replace(/[&<>"']/g, m=> ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[m])); }
function highlight(text, query){
  if(!query) return escapeHtml(text);
  const q = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(q, 'ig');
  return escapeHtml(text).replace(re, match => `<span class="hl">${match}</span>`);
}

/* ============================
   Render catalog (مع تسليط الكلمات)
   ============================ */
function renderCatalog(list, query=''){
  const grid = document.getElementById('courses-grid');
  const count = document.getElementById('catalog-count');
  const noResults = document.getElementById('no-results');
  if(!grid) return;
  grid.innerHTML = '';
  if(!list.length){
    noResults.classList.remove('hidden');
  } else {
    noResults.classList.add('hidden');
  }
  list.forEach(c=>{
    const card = document.createElement('article');
    card.className = 'course card';
    const thumb = c.thumbnail || DEFAULT_THUMBS[0];
    // title and desc with highlight
    const titleHTML = highlight(c.title, query);
    const descHTML = highlight(c.description || '', query);
    card.innerHTML = `
      <div class="thumb">
        <img src="${thumb}" alt="${escapeHtml(c.title)}">
        <div class="video-badge">دورة</div>
      </div>
      <div class="course-body">
        <h3>${titleHTML}</h3>
        <p>${descHTML}</p>
        <div class="course-actions">
          <button class="btn-outline" onclick="openCourse('${c.id}')">عرض الدورة</button>
          <button class="btn-primary" onclick="enroll('${c.id}')">التحق</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
  if(count) count.textContent = `${list.length} دورة`;
}

/* ============================
   فتح صفـحة الدورة (ننتقل ل course.html?course=ID)
   ============================ */
function openCourse(courseId){
  const url = new URL(window.location.href);
  const base = window.location.origin + window.location.pathname.replace(/[^/]*$/, '') + 'course.html';
  window.location.href = `${base}?course=${encodeURIComponent(courseId)}`;
}

/* ============================
   تسجيل / دخول مبسّط
   ============================ */
function showLoginModal(){
  document.getElementById('modal-login')?.classList.remove('hidden');
}
function hideLoginModal(){
  document.getElementById('modal-login')?.classList.add('hidden');
}
function registerUser(){
  const name = document.getElementById('user-name').value.trim();
  const email = document.getElementById('user-email').value.trim().toLowerCase();
  if(!name || !email){ showToast('أكمل الاسم والبريد'); return; }
  let u = users.find(x=>x.email===email);
  if(!u){
    u = { name, email, created: new Date().toISOString() };
    users.push(u);
    localStorage.setItem(STORAGE.USERS, JSON.stringify(users));
  }
  currentUser = u;
  localStorage.setItem(STORAGE.CURRENT_USER, JSON.stringify(currentUser));
  hideLoginModal();
  showToast(`مرحبًا ${currentUser.name}`);
  renderCatalogFiltered(); // to update UI if needed
}

/* ============================
   التحقاق بالدورة (يتطلب تسجيل)
   ============================ */
function enroll(courseId){
  if(!currentUser){ showToast('سجّل الدخول أولاً'); showLoginModal(); return; }
  enrollments[currentUser.email] = enrollments[currentUser.email] || [];
  if(!enrollments[currentUser.email].includes(courseId)){
    enrollments[currentUser.email].push(courseId);
    localStorage.setItem(STORAGE.ENROLL, JSON.stringify(enrollments));
    showToast('تم الالتحاق بالدورة ✅');
  } else showToast('أنت ملتحق بالفعل');
}

/* ============================
   البحث: debounce + تصنيف بسيط حسب الصلة (عنوان > وصف)
   ============================ */
let searchTimer = null;
function onSearchInput(){
  clearTimeout(searchTimer);
  searchTimer = setTimeout(()=>{
    renderCatalogFiltered();
  }, 250);
}
function renderCatalogFiltered(){
  const q = (document.getElementById('search-input')?.value||'').trim().toLowerCase();
  const lang = document.getElementById('filter-lang')?.value || '';
  const level = document.getElementById('filter-level')?.value || '';
  // filter
  let filtered = allCourses.filter(c=>{
    if(lang && c.language !== lang) return false;
    if(level && c.level !== level) return false;
    if(!q) return true;
    // relevance calculation
    const inTitle = c.title.toLowerCase().includes(q);
    const inDesc = (c.description||'').toLowerCase().includes(q);
    return inTitle || inDesc;
  });
  // simple sort: titles containing q first
  filtered.sort((a,b)=>{
    const aScore = ((a.title.toLowerCase().includes(q))?2:0) + ((a.description||'').toLowerCase().includes(q)?1:0);
    const bScore = ((b.title.toLowerCase().includes(q))?2:0) + ((b.description||'').toLowerCase().includes(q)?1:0);
    return bScore - aScore;
  });
  renderCatalog(filtered, q);
}

/* ============================
   Toast
   ============================ */
function showToast(msg, t=2200){
  const el = document.getElementById('toast'); if(!el) return;
  el.textContent = msg; el.classList.remove('hidden');
  clearTimeout(el._t); el._t = setTimeout(()=>el.classList.add('hidden'), t);
}

/* ============================
   Instructor (لوحة المبرمج) — حماية بسيطة
   - كلمة المرور الافتراضية: admin123
   - يمكنك تعديلها في هذا الملف (متغير instructorPassword)
   ============================ */
const instructorPassword = 'admin123';
function openInstructorPanel(){
  const pass = prompt('أدخل كلمة مرور المبرمج:');
  if(pass === instructorPassword){
    // fill thumbnails select & courses select
    const selThumb = document.getElementById('ci-thumb-select');
    selThumb.innerHTML = '';
    DEFAULT_THUMBS.forEach((u,i)=> selThumb.insertAdjacentHTML('beforeend', `<option value="${escapeHtml(u)}">خيار ${i+1}</option>`));
    const selectCourse = document.getElementById('select-course-for-lesson');
    selectCourse.innerHTML = '';
    allCourses.forEach(c => selectCourse.insertAdjacentHTML('beforeend', `<option value="${escapeHtml(c.id)}">${escapeHtml(c.title)}</option>`));
    document.getElementById('modal-instructor').classList.remove('hidden');
  } else {
    showToast('كلمة المرور خاطئة');
  }
}
function closeInstructorPanel(){ document.getElementById('modal-instructor').classList.add('hidden'); }

/* ============================
   Add course / add lesson via instructor UI
   ============================ */
function showForm(idToShow){
  document.querySelectorAll('.instructor-form').forEach(f=> f.classList.add('hidden'));
  document.getElementById(idToShow).classList.remove('hidden');
}

function saveCourseFromUI(){
  const title = document.getElementById('ci-title').value.trim();
  if(!title){ showToast('ضع عنوانًا للدورة'); return; }
  const desc = document.getElementById('ci-desc').value.trim();
  const lang = document.getElementById('ci-lang').value;
  const level = document.getElementById('ci-level').value;
  const thumb = document.getElementById('ci-thumb-select').value || DEFAULT_THUMBS[0];
  const id = `c_${title.replace(/\s+/g,'_').toLowerCase()}_${Date.now()}`;
  const newCourse = { id, title, description: desc, language: lang, level, thumbnail: thumb, lessons: [] };
  allCourses.push(newCourse);
  localStorage.setItem(STORAGE.COURSES, JSON.stringify(allCourses));
  showToast('تم إضافة الدورة');
  // refresh UI
  renderCatalogFiltered();
}

function saveLessonFromUI(){
  const courseId = document.getElementById('select-course-for-lesson').value;
  const title = document.getElementById('li-title').value.trim();
  const yt = document.getElementById('li-youtube').value.trim();
  if(!courseId || !title || !yt){ showToast('املأ الحقول'); return; }
  const course = allCourses.find(c=>c.id===courseId);
  if(!course) { showToast('الدورة غير موجودة'); return; }
  const yid = parseYouTubeId(yt) || yt;
  const lid = `${courseId}_l_${Date.now()}`;
  course.lessons.push({ id: lid, title, youtube: yid, thumbnail: '' });
  localStorage.setItem(STORAGE.COURSES, JSON.stringify(allCourses));
  showToast('تم إضافة الدرس');
}

/* ============================
   Course page rendering (course.html)
   - يتم استدعاء renderCoursePage() عند تحميل الصفحة course.html
   ============================ */
function renderCoursePage(){
  const params = new URLSearchParams(window.location.search);
  const courseId = params.get('course');
  if(!courseId) return;
  const course = allCourses.find(c=>c.id===courseId);
  if(!course) { showToast('الدورة غير موجودة'); return; }

  // header info
  const titleEl = document.getElementById('course-title');
  const descEl = document.getElementById('course-desc');
  const thumbEl = document.getElementById('course-thumb');
  titleEl.textContent = course.title;
  descEl.textContent = course.description;
  thumbEl.src = course.thumbnail || DEFAULT_THUMBS[0];

  // lessons
  const lessonsList = document.getElementById('lessons-list');
  lessonsList.innerHTML = '';
  course.lessons.forEach(l => {
    const div = document.createElement('div');
    div.className = 'lesson-item';
    div.innerHTML = `
      <div>
        <div class="title">${escapeHtml(l.title)}</div>
        <div class="small muted">${escapeHtml(l.id)}</div>
      </div>
      <div style="display:flex;gap:8px;align-items:center">
        <button class="btn-outline" onclick="playLessonFromCourse('${courseId}','${l.id}')">تشغيل</button>
      </div>
    `;
    lessonsList.appendChild(div);
  });
}

/* ============================
   تشغيل الدرس من course page
   - يتم كتابة رابط iframe لليوتيوب
   - يتم تعليم الدرس كمشاهَد عند التشغيل (نخزن تقدم بسيط)
   ============================ */
function playLessonFromCourse(courseId, lessonId){
  const course = allCourses.find(c=>c.id===courseId);
  if(!course) return;
  const lesson = course.lessons.find(l=>l.id===lessonId);
  if(!lesson) return;
  const yid = parseYouTubeId(lesson.youtube) || lesson.youtube;
  const iframe = document.getElementById('video-iframe');
  iframe.src = `https://www.youtube.com/embed/${yid}?autoplay=1&rel=0`;
  // set lesson title
  document.getElementById('lesson-title').textContent = lesson.title || 'درس';
  // mark as watched (100%) when user clicks play
  if(currentUser){
    enrollments[currentUser.email] = enrollments[currentUser.email] || [];
    enrollments[currentUser.email].progress = enrollments[currentUser.email].progress || {};
    enrollments[currentUser.email].progress[courseId] = enrollments[currentUser.email].progress[courseId] || {};
    enrollments[currentUser.email].progress[courseId][lessonId] = 100;
    localStorage.setItem(STORAGE.ENROLL, JSON.stringify(enrollments));
  }
}
/* ==========================
   رفع صورة دورة أو درس من الجهاز
========================== */
function handleCourseImageUpload(inputEl){
  if(inputEl.files && inputEl.files[0]){
    const reader = new FileReader();
    reader.onload = e => {
      document.getElementById('ci-thumb-preview').src = e.target.result;
      document.getElementById('ci-thumb-select').value = e.target.result; // نستخدمه لاحقًا
    };
    reader.readAsDataURL(inputEl.files[0]);
  }
}

function handleLessonImageUpload(inputEl){
  if(inputEl.files && inputEl.files[0]){
    const reader = new FileReader();
    reader.onload = e => {
      document.getElementById('li-thumb-preview').src = e.target.result;
      document.getElementById('li-thumb-input').value = e.target.result; // نستخدمه لاحقًا
    };
    reader.readAsDataURL(inputEl.files[0]);
  }
}

/* ==========================
   تعديل saveCourseFromUI ليستخدم الصورة من الجهاز
========================== */
function saveCourseFromUI(){
  const title = document.getElementById('ci-title').value.trim();
  if(!title){ showToast('ضع عنوانًا للدورة'); return; }
  const desc = document.getElementById('ci-desc').value.trim();
  const lang = document.getElementById('ci-lang').value;
  const level = document.getElementById('ci-level').value;
  const thumb = document.getElementById('ci-thumb-select').value || DEFAULT_THUMBS[0]; // قد يكون dataURL
  const id = `c_${title.replace(/\s+/g,'_').toLowerCase()}_${Date.now()}`;
  const newCourse = { id, title, description: desc, language: lang, level, thumbnail: thumb, lessons: [] };
  allCourses.push(newCourse);
  localStorage.setItem(STORAGE.COURSES, JSON.stringify(allCourses));
  showToast('تم إضافة الدورة');
  renderCatalogFiltered();
}

/* ==========================
   تعديل saveLessonFromUI ليستخدم صورة من الجهاز
========================== */
function saveLessonFromUI(){
  const courseId = document.getElementById('select-course-for-lesson').value;
  const title = document.getElementById('li-title').value.trim();
  const yt = document.getElementById('li-youtube').value.trim();
  const thumb = document.getElementById('li-thumb-input').value || ''; // الصورة من الجهاز
  if(!courseId || !title || !yt){ showToast('املأ الحقول'); return; }
  const course = allCourses.find(c=>c.id===courseId);
  if(!course) { showToast('الدورة غير موجودة'); return; }
  const yid = parseYouTubeId(yt) || yt;
  const lid = `${courseId}_l_${Date.now()}`;
  course.lessons.push({ id: lid, title, youtube: yid, thumbnail: thumb });
  localStorage.setItem(STORAGE.COURSES, JSON.stringify(allCourses));
  showToast('تم إضافة الدرس');
}
// زر خروج من لوحة المبرمج
document.getElementById('instructor-logout')?.addEventListener('click', ()=>{
  closeInstructorPanel(); // يغلق اللوحة
  showToast('تم الخروج من لوحة المبرمج');
});

/* ==========================
   زر خروج من لوحة المبرمج
========================== */
document.getElementById('instructor-logout')?.addEventListener('click', ()=>{
  closeInstructorPanel();
  showToast('تم الخروج من لوحة المبرمج');
});

/* ============================
   Course page: add lesson (from course.html instructor modal)
   ============================ */
function saveLessonFromCoursePage(){
  const params = new URLSearchParams(window.location.search);
  const courseId = params.get('course');
  if(!courseId) return;
  const title = document.getElementById('li-title-course').value.trim();
  const yt = document.getElementById('li-youtube-course').value.trim();
  if(!title || !yt){ showToast('املأ الحقول'); return; }
  const course = allCourses.find(c=>c.id===courseId);
  if(!course) return;
  const lid = `${courseId}_l_${Date.now()}`;
  const yid = parseYouTubeId(yt) || yt;
  course.lessons.push({ id: lid, title, youtube: yid, thumbnail: '' });
  localStorage.setItem(STORAGE.COURSES, JSON.stringify(allCourses));
  showToast('تم إضافة الدرس إلى الدورة');
  renderCoursePage();
}

/* ============================
   Notes system (simple)
   ============================ */
function addNoteForCurrentLesson(){
  const noteText = document.getElementById('note-text').value.trim();
  if(!noteText) { showToast('اكتب ملاحظة'); return; }
  const params = new URLSearchParams(window.location.search);
  const courseId = params.get('course');
  const lessonTitle = document.getElementById('lesson-title').textContent || '';
  const note = { text: noteText, at: new Date().toLocaleString(), lessonTitle };
  const key = `notes_${courseId}`;
  const arr = JSON.parse(localStorage.getItem(key) || '[]');
  arr.unshift(note);
  localStorage.setItem(key, JSON.stringify(arr));
  renderNotesForCourse(courseId);
  document.getElementById('note-text').value = '';
  showToast('تم حفظ الملاحظة');
}
function renderNotesForCourse(courseId){
  const key = `notes_${courseId}`;
  const arr = JSON.parse(localStorage.getItem(key) || '[]');
  const box = document.getElementById('notes-list');
  if(!box) return;
  box.innerHTML = '';
  arr.slice(0,10).forEach(n => {
    const d = document.createElement('div');
    d.className = 'note';
    d.textContent = `[${n.at}] ${n.lessonTitle} — ${n.text}`;
    box.appendChild(d);
  });
}

/* ============================
   Initialization on pages
   ============================ */
document.addEventListener('DOMContentLoaded', ()=>{
document.addEventListener('DOMContentLoaded', ()=>{

  // ... باقي الأزرار مثل btn-instructor و close-instructor

  // زر خروج من لوحة المبرمج
  document.getElementById('instructor-logout')?.addEventListener('click', ()=>{
    closeInstructorPanel();
    showToast('تم الخروج من لوحة المبرمج');
  });

  // ... باقي الكود
});

  // header buttons
  const btnInstructor = document.getElementById('btn-instructor');
  btnInstructor?.addEventListener('click', openInstructorPanel);
  document.getElementById('close-instructor')?.addEventListener('click', closeInstructorPanel);
  document.getElementById('show-add-course')?.addEventListener('click', ()=> showForm('form-add-course'));
  document.getElementById('show-add-lesson')?.addEventListener('click', ()=> showForm('form-add-lesson'));
  document.getElementById('save-course-btn')?.addEventListener('click', saveCourseFromUI);
  document.getElementById('save-lesson-btn')?.addEventListener('click', saveLessonFromUI);

  // login modal
  document.getElementById('btn-login')?.addEventListener('click', ()=> document.getElementById('modal-login').classList.remove('hidden'));
  document.getElementById('close-login')?.addEventListener('click', ()=> document.getElementById('modal-login').classList.add('hidden'));
  document.getElementById('btn-register')?.addEventListener('click', registerUser);

  // search
  document.getElementById('search-input')?.addEventListener('input', onSearchInput);
  document.getElementById('search-btn')?.addEventListener('click', renderCatalogFiltered);
  document.getElementById('filter-lang')?.addEventListener('change', renderCatalogFiltered);
  document.getElementById('filter-level')?.addEventListener('change', renderCatalogFiltered);

  // dashboard button
  document.getElementById('btn-dashboard')?.addEventListener('click', ()=> {
    if(!currentUser) { showToast('سجّل الدخول أولاً'); document.getElementById('modal-login').classList.remove('hidden'); return; }
    // بسيط: يعرض ملخص في Toast
    const enrolled = enrollments[currentUser.email] || [];
    showToast(`أنت ملتحق بـ ${enrolled.length} دورات`);
  });

  // course page specific
  if(window.location.pathname.endsWith('course.html')){
    // instructor control on course page
    document.getElementById('btn-instructor-course')?.addEventListener('click', ()=>{
      const pass = prompt('أدخل كلمة مرور المبرمج:');
      if(pass === instructorPassword) document.getElementById('modal-instructor').classList.remove('hidden');
      else showToast('كلمة المرور خاطئة');
    });
    document.getElementById('close-instructor')?.addEventListener('click', ()=> document.getElementById('modal-instructor').classList.add('hidden'));
    document.getElementById('save-lesson-btn-course')?.addEventListener('click', saveLessonFromCoursePage);
    document.getElementById('btn-enroll-course')?.add
        document.getElementById('btn-enroll-course')?.addEventListener('click', ()=>{
      const params = new URLSearchParams(window.location.search);
      const courseId = params.get('course');
      if(courseId) enroll(courseId);
    });

    // ملاحظات
    document.getElementById('btn-add-note')?.addEventListener('click', addNoteForCurrentLesson);

    // عرض الدورة
    renderCoursePage();
    const params = new URLSearchParams(window.location.search);
    renderNotesForCourse(params.get('course'));
  }

  // index page specific
  if(window.location.pathname.endsWith('index.html')){
    renderCatalogFiltered();
  }

});
document.addEventListener('DOMContentLoaded', ()=>{

  // ... باقي الأزرار مثل btn-instructor و close-instructor

  // زر خروج من لوحة المبرمج
  document.getElementById('instructor-logout')?.addEventListener('click', ()=>{
    closeInstructorPanel();
    showToast('تم الخروج من لوحة المبرمج');
  });

  // ... باقي الكود
});

