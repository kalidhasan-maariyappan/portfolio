const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');

if (menu) {
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', open);
    menu.textContent = open ? 'Close' : 'Menu';
  });
}

document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

const track = document.querySelector('.showcase-track');
const slideNum = document.querySelector('#slideNum');
let slide = 0;

document.querySelectorAll('[data-slide]').forEach((btn) => {
  btn.addEventListener('click', () => {
    if (!track || !slideNum) return;
    slide = (slide + (btn.dataset.slide === 'next' ? 1 : 2)) % 3;
    track.style.transform = `translateX(-${slide * 33.333}%)`;
    slideNum.textContent = String(slide + 1).padStart(2, '0');
  });
});

const filters = document.querySelectorAll('[data-filter]');
filters.forEach((btn) => {
  btn.addEventListener('click', () => {
    filters.forEach((filter) => filter.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.work-card').forEach((card) => {
      const shouldHide = btn.dataset.filter !== 'all' && !card.dataset.category.includes(btn.dataset.filter);
      card.classList.toggle('hidden', shouldHide);
    });
  });
});

const form = document.querySelector('#inquiryForm');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(`Project inquiry from ${data.get('name')}`);
    const body = encodeURIComponent(`Name: ${data.get('name')}\nCompany: ${data.get('company')}\nBudget: ${data.get('budget')}\nTimeline: ${data.get('timeline')}\nProject type: ${data.get('type')}\n\n${data.get('description')}`);
    window.location.href = `mailto:kalidhasan.mariyappan@gmail.com?subject=${subject}&body=${body}`;
  });
}

const header = document.querySelector('.v2-nav');
if (header) {
  const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 24);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const sectionLinks = [...header.querySelectorAll('nav a[href^="#"]')];
  const sections = sectionLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if (sections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          sectionLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
          });
        }
      });
    }, { rootMargin: '-30% 0px -60%' });
    sections.forEach((section) => sectionObserver.observe(section));
  }
}

const projectSection = document.querySelector('#projects');
if (projectSection) {
  projectSection.classList.add('projects-showcase');
  projectSection.innerHTML = `
    <div class="projects-heading">
      <div><p>Selected engineering work</p><h2>Products, modules<br><span>and responsibility.</span></h2></div>
      <p>Production systems explained through the workflows I built, not decorative concepts. Open a project for the full technical case study.</p>
    </div>
    <div class="showcase-list">
      <a class="showcase-project" href="project-emr.html" data-tone="clinical">
        <div class="showcase-copy"><div class="project-label"><span>Multi-tenant healthcare</span><span>3.5+ years - Team lead</span></div><h3>PracticeManager Platform</h3><p class="project-summary">A U.S. healthcare practice-management ecosystem connecting patient intake, referrals, scheduling, check-in, clinical care, insurance, billing, payments, reporting, and secure tenant-scoped operations.</p><ol class="module-list"><li><b>Practice operations</b><span>Patient Portal, Collaborator Portal, referrals, registration, forms, scheduling, reminders, check-in, communications, and provider workflows.</span></li><li><b>Clinical care</b><span>EMR records, medical history, treatment plans, procedure/anesthesia documentation, documents, imaging, clinical notes, and PHI protection.</span></li><li><b>Financial workflow</b><span>Eligibility, X12 EDI, ClaimMD/Vyne claims, invoices, PayROC payments, transactions, A/R aging, reporting, and tenant-aware access control.</span></li></ol><div class="project-footer"><small>ColdFusion - Lucee - ColdBox - PostgreSQL - jQuery - AWS</small><strong>Full case study -></strong></div></div>
        <div class="showcase-visual"><img src="assets/project-practicemanager-showcase.png" alt="PracticeManager multi-tenant healthcare platform showing patient lifecycle, portals, clinical EMR, claims, billing, PayROC, PHI encryption, and AWS infrastructure"><span class="project-index">01</span></div>
      </a>
      <a class="showcase-project image-left" href="project-dog-care.html" data-tone="care">
        <div class="showcase-visual"><img src="assets/project-dog-care-showcase-v2.png" alt="Dog care management product canvas showing health intake, dog profile, wellness timeline, veterinary records, documents, and admin review"><span class="project-index">02</span></div>
        <div class="showcase-copy"><div class="project-label"><span>Animal health</span><span>6 months - Full stack</span></div><h3>Dog Care Management</h3><p class="project-summary">A secure record system that turns a complex 80+ field questionnaire into a manageable owner journey and an actionable administration workflow.</p><ol class="module-list"><li><b>Guided health profile</b><span>Owners enter identity, lifecycle, veterinary, diet, and health details with validation at every step.</span></li><li><b>Longitudinal record</b><span>Vaccinations, wellness events, documents, and profile changes remain visible over time.</span></li><li><b>Admin operations</b><span>Staff search submissions, review incomplete data, correct records, and support owners.</span></li></ol><div class="project-footer"><small>ColdFusion - jQuery - AJAX - REST - SQL</small><strong>Full case study -></strong></div></div>
      </a>
      <a class="showcase-project" href="project-author.html" data-tone="community">
        <div class="showcase-copy"><div class="project-label"><span>Community platform</span><span>6 months - Backend & integration</span></div><h3>Author Community</h3><p class="project-summary">A moderated network where authors establish their identity, readers discover conversations, and administrators manage community activity.</p><ol class="module-list"><li><b>Author identity</b><span>Profiles connect biography, published content, activity, and reader relationships.</span></li><li><b>Discussion system</b><span>Authenticated users create topics, contribute comments, and follow active conversations.</span></li><li><b>Moderation console</b><span>Administrators review users, discussions, comments, reports, and content through protected CRUD tools.</span></li></ol><div class="project-footer"><small>Ruby on Rails - React - JWT - PostgreSQL</small><strong>Full case study -></strong></div></div>
        <div class="showcase-visual"><img src="assets/project-author-showcase-v2.png" alt="Author community product canvas showing author profile, discussions, comments, moderation queue, admin CRUD, JWT security, and PostgreSQL"><span class="project-index">03</span></div>
      </a>
      <a class="showcase-project image-left" href="project-blog.html" data-tone="publishing">
        <div class="showcase-visual"><img src="assets/project-blog-showcase-v2.png" alt="Blog management product canvas showing writing studio, publishing workflow, comments, users, admin API, token auth, Mastodon customization, and PostgreSQL"><span class="project-index">04</span></div>
        <div class="showcase-copy"><div class="project-label"><span>Publishing platform</span><span>6 months - Backend & integration</span></div><h3>Blog Management Platform</h3><p class="project-summary">A customized Mastodon-based product that narrows a social platform into a controlled editorial workflow for writers and administrators.</p><ol class="module-list"><li><b>Writing and publishing</b><span>Authors create drafts, prepare content, and move posts into the published experience.</span></li><li><b>Reader discussion</b><span>Token-protected APIs connect articles, users, and moderated comment threads.</span></li><li><b>Content administration</b><span>Teams search, update, review, and manage posts, comments, and user records.</span></li></ol><div class="project-footer"><small>Ruby on Rails - Mastodon - React - PostgreSQL</small><strong>Full case study -></strong></div></div>
      </a>
    </div>`;
}

const caseVisuals = {
  'project-emr.html': ['assets/project-practicemanager-showcase.png', 'PracticeManager multi-tenant healthcare platform with patient lifecycle, portals, clinical EMR, claims, billing, PayROC, PHI encryption, and AWS infrastructure'],
  'project-dog-care.html': ['assets/project-dog-care-showcase-v2.png', 'Dog care management product canvas with health intake, wellness timeline, veterinary records, documents, and admin review'],
  'project-author.html': ['assets/project-author-showcase-v2.png', 'Author community product canvas with profiles, discussions, comments, moderation, admin CRUD, JWT security, and PostgreSQL'],
  'project-blog.html': ['assets/project-blog-showcase-v2.png', 'Blog management product canvas with writing studio, publishing workflow, comments, users, admin API, token auth, Mastodon, and PostgreSQL']
};

const caseKey = location.pathname.split('/').pop();
const caseHero = document.querySelector('.case-v2 .case-hero');
if (caseHero && caseVisuals[caseKey]) {
  const [src, alt] = caseVisuals[caseKey];
  const image = document.createElement('img');
  image.src = src;
  image.alt = alt;
  image.className = 'case-cover';
  caseHero.insertBefore(image, caseHero.firstChild);

  const workflowBlock = [...document.querySelectorAll('.case-v2 .story-block')].find((block) => {
    const title = block.querySelector('h2');
    return title && /Product modules|Sample workflows/i.test(title.textContent);
  });

  if (workflowBlock) {
    const visual = document.createElement('figure');
    visual.className = 'case-module-visual';
    visual.innerHTML = `<img src="${src}" alt="${alt}"><figcaption>Project-specific product visual generated from the documented modules on this case study.</figcaption>`;
    const body = workflowBlock.querySelector('div');
    const target = body && body.querySelector('.mockup-stack,.concept-showcase');
    if (body && target) body.insertBefore(visual, target);
  }
}

const revealItems = document.querySelectorAll('.v2-title,.projects-heading,.showcase-project,.experience-card,.tool-group,.cert-row,.contact-direct');
if (revealItems.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('reveal-ready');
  revealItems.forEach((item) => {
    item.dataset.reveal = '';
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -50px' });

  revealItems.forEach((item) => revealObserver.observe(item));
}
