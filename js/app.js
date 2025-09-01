// =========================
// بيانات دورات وهمية + دروس
// =========================
const courses = [
  {
    id: 1,
    title: "أساسيات التمريض",
    category: "طب",
    stage: "مبتدئ",
    desc: "تعلم مبادئ التمريض.",
    image: "https://via.placeholder.com/250x150?text=تمريض",
    lessons: [
      { title: "مقدمة في التمريض", video: "https://www.youtube.com/embed/ysz5S6PUM-U" },
      { title: "أدوات التمريض", video: "https://www.youtube.com/embed/ScMzIvxBSi4" }
    ]
  },
  {
    id: 2,
    title: "الهندسة الميكانيكية",
    category: "هندسة",
    stage: "متوسط",
    desc: "مقدمة في الميكانيكا.",
    image: "https://via.placeholder.com/250x150?text=ميكانيكا",
    lessons: [
      { title: "مقدمة عن القوى", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { title: "الطاقة الحركية", video: "https://www.youtube.com/embed/kJQP7kiw5Fk" }
    ]
  },
  {
    id: 3,
    title: "الكيمياء العامة",
    category: "علوم",
    stage: "متقدم",
    desc: "مفاهيم متقدمة في الكيمياء.",
    image: "https://via.placeholder.com/250x150?text=كيمياء",
    lessons: [
      { title: "مقدمة عن الذرات", video: "https://www.youtube.com/embed/1w7OgIMMRc4" },
      { title: "التفاعلات الكيميائية", video: "https://www.youtube.com/embed/9bZkp7q19f0" }
    ]
  }
];

// =========================
// بيانات ملازم وهمية (معدلة)
// =========================
const booklets = [
  {
    id: 1,
    title: "ملزمة التمريض",
    teacher: "د. هدى محمد",
    stage: "المرحلة الأولى",
    number: "B001",
    subject: "تمريض",
    file: "files/nursing.pdf"
  },
  {
    id: 2,
    title: "ملزمة الميكانيكا",
    teacher: "د. علي حسين",
    stage: "المرحلة الثانية",
    number: "B002",
    subject: "ميكانيكا",
    file: "files/mechanics.pdf"
  }
];

// =========================
// بيانات تقويم وهمية
// =========================
const exams = [
  {
    date: "2025-09-01",
    day: "الإثنين",
    name: "امتحان برمجة 1",
    doctor: "د. أحمد محمد",
    subject: "برمجة",
    booklet: "files/programming1_exam.pdf",
    course: "course.html?id=1"
  },
  {
    date: "2025-09-05",
    day: "الخميس",
    name: "امتحان قواعد البيانات",
    doctor: "د. علي حسن",
    subject: "قواعد البيانات",
    booklet: "files/db_exam.pdf",
    course: "course.html?id=2"
  },
  {
    date: "2025-09-08",
    day: "الأحد",
    name: "امتحان رياضيات 2",
    doctor: "د. هبة عبد الله",
    subject: "رياضيات",
    booklet: "files/math2_exam.pdf",
    course: "course.html?id=3"
  },
  {
    date: "2025-09-12",
    day: "الخميس",
    name: "امتحان شبكات الحاسوب",
    doctor: "د. سامر العزاوي",
    subject: "شبكات",
    booklet: null,
    course: "course.html?id=4"
  },
  {
    date: "2025-09-15",
    day: "الإثنين",
    name: "امتحان خوارزميات",
    doctor: "د. منى كامل",
    subject: "خوارزميات",
    booklet: "files/algorithms_exam.pdf",
    course: null
  },
  {
    date: "2025-09-20",
    day: "السبت",
    name: "امتحان هندسة برمجيات",
    doctor: "د. فاضل نوري",
    subject: "هندسة برمجيات",
    booklet: "files/se_exam.pdf",
    course: "course.html?id=5"
  },
  {
    date: "2025-09-25",
    day: "الخميس",
    name: "امتحان أنظمة تشغيل",
    doctor: "د. ليلى جاسم",
    subject: "أنظمة تشغيل",
    booklet: null,
    course: "course.html?id=6"
  },
  {
    date: "2025-09-30",
    day: "الثلاثاء",
    name: "امتحان الذكاء الاصطناعي",
    doctor: "د. محمود كريم",
    subject: "ذكاء اصطناعي",
    booklet: "files/ai_exam.pdf",
    course: "course.html?id=7"
  }
];

// =========================
// عرض التقويم
// =========================
function renderCalendar() {
  const container = document.getElementById("examsContainer");
  if (!container) return;

  container.innerHTML = exams.map(exam => `
    <tr>
      <td>${exam.date}</td>
      <td>${exam.day}</td>
      <td>${exam.name}</td>
      <td>${exam.doctor}</td>
      <td>${exam.subject}</td>
      <td>${exam.booklet ? `<a href="${exam.booklet}" target="_blank">📘 تحميل</a>` : "-"}</td>
      <td>${exam.course ? `<a href="${exam.course}" target="_blank">🎥 مشاهدة</a>` : "-"}</td>
    </tr>
  `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderCalendar();
});

// =========================
// فلترة
// =========================
function setupFilters() {
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const stageFilter = document.getElementById("stageFilter");
  const searchBtn = document.getElementById("searchBtn");

  if (!searchBtn) return;

  searchBtn.addEventListener("click", () => {
    const keyword = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const stage = stageFilter.value;

    document.querySelectorAll(".card").forEach(card => {
      const title = card.querySelector("h3").innerText.toLowerCase();
      const desc = card.querySelector("p") ? card.querySelector("p").innerText.toLowerCase() : "";

      const matchesKeyword = keyword === "" || title.includes(keyword) || desc.includes(keyword);
      const matchesCategory = category === "all" || card.getAttribute("data-category") === category;
      const matchesStage = stage === "all" || card.getAttribute("data-stage") === stage;

      if (matchesKeyword && matchesCategory && matchesStage) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
}

// =========================
// عند تحميل الصفحات
// =========================
window.onload = () => {
  renderCourses("coursesContainer");
  renderCourseDetails();
  renderBooklets();
  renderCalendar();
  setupFilters();
};

// =========================
// توليد الكورسات
// =========================
function renderCourses(containerId){
  const container = document.getElementById(containerId);
  if(!container) return;
  container.innerHTML = "";
  courses.forEach(c=>{
    const card = document.createElement("div");
    card.className="card";
    card.setAttribute("data-stage", c.stage);
    card.setAttribute("data-category", c.category);
    card.innerHTML = `
      <img src="${c.image}" alt="${c.title}">
      <h3>${c.title}</h3>
      <p>${c.desc}</p>
      <button onclick="viewCourse(${c.id})">عرض الدورة</button>
    `;
    container.appendChild(card);
  });
  animateCards();
}

// =========================
// تفاصيل كورس + دروس
// =========================
function renderCourseDetails(){
  const container = document.getElementById("courseDetails");
  if(!container) return;
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const course = courses.find(c=>c.id==id);
  if(!course) return container.innerHTML="لم يتم العثور على الكورس.";

  container.innerHTML = `
    <h2>${course.title}</h2>
    <p>${course.desc}</p>
    <h3>الدروس:</h3>
    <ul>
      ${course.lessons.map(l => `
        <li>
          <h4>${l.title}</h4>
          <iframe width="560" height="315" src="${l.video}" frameborder="0" allowfullscreen></iframe>
        </li>
      `).join("")}
    </ul>
  `;
}

// =========================
// عرض الملازم
// =========================
function renderBooklets(){
  const container = document.getElementById("bookletsContainer");
  if(!container) return;
  container.innerHTML="";
  booklets.forEach(b=>{
    const div=document.createElement("div");
    div.className="card";
    div.innerHTML=`
      <h3>${b.title}</h3>
      <p><b>المدرس:</b> ${b.teacher}</p>
      <p><b>المرحلة:</b> ${b.stage}</p>
      <p><b>رقم الملزمة:</b> ${b.number}</p>
      <p><b>المادة:</b> ${b.subject}</p>
      <a href="${b.file}" target="_blank"><button>تحميل</button></a>
    `;
    container.appendChild(div);
  });
  animateCards();
}

// =========================
// أنيميشن عند توليد العناصر
// =========================
function animateCards() {
  document.querySelectorAll(".card, #calendarContainer li").forEach((el, i) => {
    el.style.animationDelay = (i * 0.15) + "s";
  });
}

// =========================
// روابط
// =========================
// روابط
function viewCourse(id){ window.location="course.html?id="+id; }

// عند تحميل الصفحات
window.onload=()=>{
  renderCourses("coursesContainer");
  renderCourseDetails();
  renderBooklets();
  renderCalendar();
};
function renderCalendar() {
  const container = document.getElementById("examsContainer");
  if (!container) return;

  container.innerHTML = exams.map(exam => `
    <tr>
      <td>${exam.date}</td>
      <td>${exam.day}</td>
      <td>${exam.name}</td>
      <td>${exam.doctor}</td>
      <td>${exam.subject}</td>
      <td>${exam.booklet ? `<a href="${exam.booklet}" target="_blank">📘 تحميل</a>` : "-"}</td>
      <td>${exam.course ? `<a href="${exam.course}" target="_blank">🎥 مشاهدة</a>` : "-"}</td>
    </tr>
  `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderCalendar();
});
