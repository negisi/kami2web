/**
 * Kamitakada 2-chome Town Association Website
 * Logic & Interactive Features
 */

// ==========================================================================
// 1. Annual Events Data Registry
// ==========================================================================
const EVENTS_DATA = [
  {
    id: "event-meeting-may",
    dateText: "5月",
    month: 5,
    day: 11,
    title: "定期総会・防犯講話",
    location: "上高田高齢者会館",
    category: "meeting",
    categoryLabel: "総会・防犯",
    season: "spring-summer",
    desc: "新年度のスタートとなる総会と、地域の安全のための防犯講話を合わせて行います。"
  },
  {
    id: "event-radio-july",
    dateText: "7月",
    month: 7,
    day: 21,
    title: "なつやすみラジオ体操",
    location: "上高田二丁目公園",
    category: "sports",
    categoryLabel: "健康・子供",
    season: "spring-summer",
    desc: "子どもたちの夏の定番。元気に朝をスタートするコミュニティ行事です。保護者の皆様やシニア世代も大歓迎です。"
  },
  {
    id: "event-festival-sept",
    dateText: "9月",
    month: 9,
    day: 12,
    title: "二丁目祭り",
    location: "上高田 氷川神社周辺",
    category: "festival",
    categoryLabel: "お祭り・伝統",
    season: "spring-summer",
    desc: "30m以上の行列になる「子ども神輿・山車」が町内を巡行します。クライマックスは上高田五町会の神輿が合流する華やかな「宵宮巡行」です。伝統と活気が溢れる二丁目最大のイベントです。"
  },
  {
    id: "event-elderly-sept",
    dateText: "9月",
    month: 9,
    day: 14,
    title: "敬老事業",
    location: "町内対象者宅",
    category: "meeting",
    categoryLabel: "福祉・敬老",
    season: "spring-summer",
    desc: "健康長寿を祝い、9月の敬老の日までに町内の高齢者の皆様へ心を込めて“お祝い品”をお届けします。"
  },
  {
    id: "event-festival-oct",
    dateText: "10月",
    month: 10,
    day: 24,
    title: "上高田地区まつり",
    location: "上高田地区全体",
    category: "festival",
    categoryLabel: "お祭り・地域",
    season: "autumn-winter",
    desc: "地域が一体となって盛り上がる、秋の大きなお祭りです。模擬店や催し物が目白押しです。"
  },
  {
    id: "event-mochi-nov",
    dateText: "11月",
    month: 11,
    day: 30,
    title: "もちつき大会",
    location: "上高田高齢者会館横",
    category: "festival",
    categoryLabel: "お祭り・伝統",
    season: "autumn-winter",
    desc: "4つの臼で100kgのもち米をつき、餡子ときな粉のからみ餅（約700パック）を町会員の皆様に配布する大好評の伝統行事です。"
  },
  {
    id: "event-patrol-dec",
    dateText: "12月",
    month: 12,
    day: 25,
    title: "歳末特別警戒パトロール",
    location: "町内全域",
    category: "safety",
    categoryLabel: "防犯・夜警",
    season: "autumn-winter",
    desc: "年末の地域の安全を守るため、夜警（夜回り活動）を実施し、「火の用心」の声とともに新しい年を迎える準備をします。"
  },
  {
    id: "event-safety-march",
    dateText: "3月",
    month: 3,
    day: 1,
    title: "防災フェスタ",
    location: "上高田二丁目公園",
    category: "safety",
    categoryLabel: "防災・安全",
    season: "autumn-winter",
    desc: "身近な公園で、いざという時の備えや行動を体験しながら楽しく学べる防災イベントです。初期消火訓練や煙体験ハウスなどがあります。"
  },
  {
    id: "event-delivery-march",
    dateText: "3月",
    month: 3,
    day: 14,
    title: "年度末配付物配達事業",
    location: "町会員宅",
    category: "meeting",
    categoryLabel: "会員サービス",
    season: "autumn-winter",
    desc: "日頃の集団回収・資源リサイクル活動等へのご協力に感謝を込めて、町会員の皆様の玄関先へ感謝品をお届けします。"
  }
];

// Successive Presidents list is statically defined in HTML

// ==========================================================================
// 2. Initialization & Dom Load
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initHeaderScroll();
  initMobileMenu();
  initAccessibilityMode();
  initNextEventAnnounce();
  initEventCalendar();
  initContactForm();
  initScrollAnimations();
});

// ==========================================================================
// 3. Header Scroll Effect & Intersection Observer for Active Nav Links
// ==========================================================================
function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Smooth scroll links highlighting
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section, header");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 120)) {
        current = section.getAttribute("id") || "";
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Scroll to top when clicking links that target the fixed header
  const headerLinks = document.querySelectorAll('a[href="#header"]');
  headerLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth"
      });
    });
  });
}

// Mobile Menu Toggle
function initMobileMenu() {
  const toggleBtn = document.querySelector(".mobile-nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  toggleBtn.addEventListener("click", () => {
    const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
    toggleBtn.setAttribute("aria-expanded", !isExpanded);
    navMenu.classList.toggle("active");
    
    // Toggle hamburger icon between ☰ and ✕
    toggleBtn.innerHTML = isExpanded ? "&#9776;" : "&times;";
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      toggleBtn.setAttribute("aria-expanded", "false");
      toggleBtn.innerHTML = "&#9776;";
    });
  });
}

// ==========================================================================
// 4. Accessibility: Large Text Toggle
// ==========================================================================
function initAccessibilityMode() {
  const toggleBtn = document.querySelector(".btn-size-toggle");
  const sizeLabel = toggleBtn.querySelector(".size-label");
  
  // Check localStorage for preferred state
  const isLarge = localStorage.getItem("text-large") === "true";
  if (isLarge) {
    document.documentElement.classList.add("text-large");
    sizeLabel.textContent = "文字サイズ: 大";
  }

  toggleBtn.addEventListener("click", () => {
    const willBeLarge = !document.documentElement.classList.contains("text-large");
    document.documentElement.classList.toggle("text-large", willBeLarge);
    localStorage.setItem("text-large", willBeLarge);
    
    sizeLabel.textContent = willBeLarge ? "文字サイズ: 大" : "文字サイズ: 標準";
  });
}

// ==========================================================================
// 5. Signature Feature: Next Event Auto-Calculator
// ==========================================================================
function initNextEventAnnounce() {
  const nextEventWrap = document.getElementById("next-event-banner");
  if (!nextEventWrap) return;

  // Get current date
  const now = new Date();
  const currentMonth = now.getMonth() + 1; // 1-12
  const currentDay = now.getDate();        // 1-31

  let nextEvent = null;

  // Find the first event scheduled on or after today (ignoring year)
  // Sort events chronologically starting from January
  const sortedEvents = [...EVENTS_DATA].sort((a, b) => {
    if (a.month !== b.month) return a.month - b.month;
    return a.day - b.day;
  });

  // Loop through events to find the next one
  for (const event of sortedEvents) {
    if (event.month > currentMonth || (event.month === currentMonth && event.day >= currentDay)) {
      nextEvent = event;
      break;
    }
  }

  // If no event found (we are past Dec 22 in current year), take the first event of next year (May 11)
  if (!nextEvent) {
    nextEvent = sortedEvents[0];
  }

  // Render the Billboard
  const categoryIconMap = {
    meeting: "🔰",
    sports: "👟",
    festival: "🏮",
    safety: "🚨"
  };

  const nextEventHtml = `
    <div class="notice-board">
      <div class="notice-info">
        <div class="notice-icon-wrap" aria-hidden="true">
          ${categoryIconMap[nextEvent.category] || "📅"}
        </div>
        <div class="notice-text-content">
          <div class="notice-label">次のまちかど行事案内</div>
          <div class="notice-title">${nextEvent.title}</div>
          <div class="notice-date-loc">
            <span>📅 日程: <strong>${nextEvent.dateText}</strong></span>
            <span>📍 場所: <strong>${nextEvent.location}</strong></span>
          </div>
        </div>
      </div>
      <button class="notice-btn" onclick="openEventModal('${nextEvent.id}')">
        詳細を見る <span class="arrow">&rarr;</span>
      </button>
    </div>
  `;

  nextEventWrap.innerHTML = nextEventHtml;
}



// ==========================================================================
// 7. Event Calendar Filters & Cards Rendering
// ==========================================================================
function initEventCalendar() {
  const grid = document.getElementById("events-grid");
  const filterWrap = document.getElementById("calendar-filters");
  if (!grid || !filterWrap) return;

  // Render filters
  const filters = [
    { label: "全行事", filter: "all" },
    { label: "🌸 春・夏行事 (5月〜9月)", filter: "spring-summer" },
    { label: "🍁 秋・冬行事 (10月〜3月)", filter: "autumn-winter" },
    { label: "🚨 防災・防犯・安全", filter: "safety" }
  ];

  let filterHtml = "";
  filters.forEach((f, idx) => {
    const active = idx === 0 ? "active" : "";
    filterHtml += `
      <button class="filter-btn ${active}" data-filter="${f.filter}">
        ${f.label}
      </button>
    `;
  });
  filterWrap.innerHTML = filterHtml;

  // Render event cards (all initially)
  renderEventCards("all");

  // Add filter event listeners
  const filterBtns = filterWrap.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const filter = btn.getAttribute("data-filter");
      renderEventCards(filter);
    });
  });

  function renderEventCards(filterValue) {
    grid.innerHTML = "";
    
    // Filter data
    const filtered = EVENTS_DATA.filter(event => {
      if (filterValue === "all") return true;
      if (filterValue === "spring-summer" || filterValue === "autumn-winter") {
        return event.season === filterValue;
      }
      if (filterValue === "safety") {
        return event.category === "safety";
      }
      return true;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--color-text-muted);">
          該当するイベントがありません。
        </div>
      `;
      return;
    }

    filtered.forEach(event => {
      const card = document.createElement("div");
      card.className = `event-card cat-${event.category}`;
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `${event.title} - ${event.dateText}`);
      
      card.innerHTML = `
        <div class="event-card-body">
          <div class="event-date-badge">
            <span class="event-date-icon">📅</span>
            <span>${event.dateText}</span>
            <span class="badge ${getCategoryBadgeClass(event.category)}" style="margin-left: 8px;">
              ${event.categoryLabel}
            </span>
          </div>
          <h3 class="event-title">${event.title}</h3>
          <p class="event-excerpt">${event.desc}</p>
          <div class="event-footer">
            <div class="event-loc">
              <span class="loc-icon">📍</span>
              <span>${event.location}</span>
            </div>
            <div class="event-more-link">
              <span>詳しく見る</span>
              <span>&rarr;</span>
            </div>
          </div>
        </div>
      `;

      const selectEvent = () => openEventModal(event.id);
      card.addEventListener("click", selectEvent);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          selectEvent();
        }
      });

      grid.appendChild(card);
    });
  }

  function getCategoryBadgeClass(cat) {
    switch(cat) {
      case "meeting": return "badge-primary";
      case "sports": return "badge-accent";
      case "festival": return "badge-secondary";
      case "safety": return "badge-primary";
      default: return "badge-primary";
    }
  }
}

// ==========================================================================
// 8. Event Detail Modal & Overlay Control
// ==========================================================================
let previouslyFocusedElement = null;

window.openEventModal = function(eventId) {
  const event = EVENTS_DATA.find(e => e.id === eventId);
  if (!event) return;

  previouslyFocusedElement = document.activeElement;

  // Create modal markup
  let modalOverlay = document.getElementById("event-modal-overlay");
  if (!modalOverlay) {
    modalOverlay = document.createElement("div");
    modalOverlay.id = "event-modal-overlay";
    modalOverlay.className = "modal-overlay";
    document.body.appendChild(modalOverlay);
  }

  const categoryIconMap = {
    meeting: "🔰",
    sports: "👟",
    festival: "🏮",
    safety: "🚨"
  };

  modalOverlay.innerHTML = `
    <div class="modal-container" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="modal-header-visual"></div>
      <button class="modal-close-btn" id="modal-close-btn" aria-label="閉じる">&times;</button>
      <div class="modal-body">
        <div class="modal-category-badge">
          <span class="badge badge-accent">${event.categoryLabel}</span>
        </div>
        <h2 class="modal-title" id="modal-title">${event.title}</h2>
        
        <div class="modal-info-list">
          <div class="modal-info-item">
            <span class="modal-info-icon" aria-hidden="true">📅</span>
            <span class="modal-info-label">日程</span>
            <span class="modal-info-value"><strong>${event.dateText}</strong></span>
          </div>
          <div class="modal-info-item">
            <span class="modal-info-icon" aria-hidden="true">📍</span>
            <span class="modal-info-label">場所</span>
            <span class="modal-info-value"><strong>${event.location}</strong></span>
          </div>
          <div class="modal-info-item">
            <span class="modal-info-icon" aria-hidden="true">${categoryIconMap[event.category] || "📝"}</span>
            <span class="modal-info-label">カテゴリ</span>
            <span class="modal-info-value">${event.categoryLabel}</span>
          </div>
        </div>

        <div class="modal-description">
          <p>${event.desc}</p>
          <p style="font-size: 0.9rem; color: var(--color-text-muted); padding-top: 12px; border-top: 1px dashed var(--color-border); margin-top: 20px;">
            ※詳しい実施計画や集合時間は、近くなりましたら回覧板および当サイト新着情報にてお知らせいたします。
          </p>
        </div>
        
        <div class="modal-footer">
          <button class="btn btn-primary" id="modal-ok-btn" style="padding: 10px 24px;">閉じる</button>
        </div>
      </div>
    </div>
  `;

  // Prevent scroll background
  document.body.style.overflow = "hidden";
  modalOverlay.classList.add("active");

  const closeBtn = modalOverlay.querySelector("#modal-close-btn");
  const okBtn = modalOverlay.querySelector("#modal-ok-btn");
  const modalContainer = modalOverlay.querySelector(".modal-container");

  const closeModal = () => {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
    
    // Restore focus
    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus();
    }
  };

  closeBtn.addEventListener("click", closeModal);
  okBtn.addEventListener("click", closeModal);
  
  // Close when clicking overlay backdrop
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Focus trap for accessibility
  const focusableElements = modalContainer.querySelectorAll('button, [tabindex="0"]');
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  firstFocusable.focus();

  modalContainer.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      if (e.shiftKey) { // Shift + Tab
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus();
          e.preventDefault();
        }
      } else { // Tab
        if (document.activeElement === lastFocusable) {
          firstFocusable.focus();
          e.preventDefault();
        }
      }
    } else if (e.key === "Escape") {
      closeModal();
    }
  });
};

// ==========================================================================
// 9. Contact Form Simulation & Toast Notification & Email Client Trigger
// ==========================================================================
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("form-name").value.trim();
    const type = document.getElementById("form-type").value;
    const email = document.getElementById("form-email").value.trim();
    const message = document.getElementById("form-message").value.trim();

    if (!name || !email || !message) {
      alert("必須項目が入力されていません。");
      return;
    }

    // Show loading spinner
    const submitBtn = form.querySelector(".form-submit-btn");
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>⏳ 送信中...</span>`;

    // Simulate server request
    setTimeout(() => {
      // Clear form
      form.reset();
      
      // Reset button
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      // Show success toast
      showToast("お問い合わせを受け付けました。折り返しご連絡いたします！");

      // Optional trigger for user's mail client (opens Gmail compose helper with preset content)
      const mailtoUrl = `mailto:kmtkd2@gmail.com?subject=${encodeURIComponent(`【町会Web問合せ】${type}について - ${name}様`)}&body=${encodeURIComponent(`お名前: ${name}様\n返信用メール: ${email}\n\nお問い合わせ内容:\n${message}`)}`;
      
      // Open the mail client after a small delay so they see the simulator result
      setTimeout(() => {
        if (confirm("お使いのメールアプリ（Gmail等）を起動して、確定原稿宛てに実際にメールを送信しますか？")) {
          window.location.href = mailtoUrl;
        }
      }, 1000);

    }, 1200);
  });
}

function showToast(message) {
  let toast = document.getElementById("toast-notification");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast-notification";
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <span class="toast-icon">✨</span>
    <span class="toast-text">${message}</span>
  `;

  toast.classList.add("active");

  setTimeout(() => {
    toast.classList.remove("active");
  }, 4000);
}

// ==========================================================================
// 10. Simple Scroll Reveal Animation
// ==========================================================================
function initScrollAnimations() {
  const elements = document.querySelectorAll("section > .container, .hero-card, .notice-board, .event-card, .safety-measure-card, .join-price-card");
  
  // Apply initial hidden styles
  elements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  elements.forEach(el => observer.observe(el));
}
