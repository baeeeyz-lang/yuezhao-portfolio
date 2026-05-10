const roleTabs = document.querySelectorAll(".role-tab");
const rolePanels = document.querySelectorAll(".role-panel");
const languageToggles = document.querySelectorAll(".lang-toggle");
const languageMeta = {
  "zh-CN": {
    title: "李月钊 Yuezhao Li | 服务设计与用户体验作品集",
    description:
      "李月钊 Yuezhao Li 的中英双语作品集，面向服务设计、用户体验设计、海外市场营销与 AI 产品经理岗位。",
  },
  en: {
    title: "Yuezhao Li | Service Design & UX Portfolio",
    description:
      "Bilingual portfolio by Yuezhao Li for service design, UX design, overseas marketing and AI product roles.",
  },
};

function setLanguage(language) {
  const safeLanguage = languageMeta[language] ? language : "zh-CN";
  document.documentElement.lang = safeLanguage;
  document.title = languageMeta[safeLanguage].title;

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute("content", languageMeta[safeLanguage].description);
  }

  languageToggles.forEach((toggle) => {
    const isActive = toggle.dataset.lang === safeLanguage;
    toggle.classList.toggle("active", isActive);
    toggle.setAttribute("aria-pressed", isActive ? "true" : "false");
  });

  try {
    localStorage.setItem("portfolio-language", safeLanguage);
  } catch {
    // Some local file previews can restrict storage; language switching still works for the session.
  }
}

let savedLanguage = null;
try {
  savedLanguage = localStorage.getItem("portfolio-language");
} catch {
  savedLanguage = null;
}
setLanguage(savedLanguage || "zh-CN");

languageToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => setLanguage(toggle.dataset.lang));
});

roleTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const role = tab.dataset.role;

    roleTabs.forEach((item) => {
      item.classList.toggle("active", item === tab);
      item.setAttribute("aria-selected", item === tab ? "true" : "false");
    });

    rolePanels.forEach((panel) => {
      panel.classList.toggle("active", panel.dataset.panel === role);
    });
  });
});

const revealTargets = document.querySelectorAll(
  ".case-card, .journey-block, .design-response, .role-panels, .work-tile, .contact-panel"
);

revealTargets.forEach((target) => target.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealTargets.forEach((target) => observer.observe(target));

const navLinks = document.querySelectorAll(".nav-links a");
const sections = [...navLinks]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-42% 0px -50% 0px" }
);

sections.forEach((section) => navObserver.observe(section));
