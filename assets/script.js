const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');

if (menu && nav) {
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', open);
    menu.textContent = open ? 'Close' : 'Menu';
  });
}

document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

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
      <div><p>Selected engineering work</p><h2>Enterprise modules<br><span>and delivery.</span></h2></div>
      <p>Resume-based project stories focused on backend delivery, healthcare workflows, invoice management, integrations, debugging, and production support.</p>
    </div>
    <div class="showcase-list">
      <a class="showcase-project" href="project-emr.html" data-tone="clinical">
        <div class="showcase-copy"><div class="project-label"><span>Healthcare platform</span><span>Practice Manager - Patient Portal - Claims</span></div><h3>Enterprise Healthcare EMR Platform</h3><p class="project-summary">Commercial EMR platform used by multiple healthcare organizations and medical practices across Practice Manager, Patient Portal, and Collaborator Portal modules.</p><ol class="module-list"><li><b>Application modules</b><span>Developed screens, backend services, APIs, business logic, and PostgreSQL functionality for healthcare workflows.</span></li><li><b>Insurance claims</b><span>Implemented EDI-based claim processing with ClaimMD for medical claims and Vyne for dental claims.</span></li><li><b>Payments and support</b><span>Integrated PayROC APIs, optimized SQL queries, resolved production defects, and improved reliability.</span></li></ol><div class="project-footer"><small>ColdFusion - Lucee - ColdBox - JavaScript - PostgreSQL - REST APIs - AWS S3</small><strong>Full case study -></strong></div></div>
        <div class="showcase-visual"><img src="assets/project-healthcare-santhiya.png" alt="Enterprise healthcare EMR product dashboard showing Practice Manager, Patient Portal, Collaborator Portal, REST APIs, PostgreSQL, EDI claims, ClaimMD, Vyne, PayROC, AWS S3, and production support"><span class="project-index">01</span></div>
      </a>
      <a class="showcase-project image-left" href="project-invoice.html" data-tone="publishing">
        <div class="showcase-visual"><img src="assets/project-invoice-showcase.png" alt="Invoice management product dashboard showing invoice queue, billing workflow, users, payments, reports, gateways, REST APIs, PostgreSQL, and production support"><span class="project-index">02</span></div>
        <div class="showcase-copy"><div class="project-label"><span>Invoice management</span><span>Billing - Reporting - Transactions</span></div><h3>Invoice Management System</h3><p class="project-summary">Enterprise billing product supporting invoice workflows, payment transactions, reporting, user administration, backend APIs, and production issue resolution.</p><ol class="module-list"><li><b>Billing modules</b><span>Developed invoice management, reporting, user administration, and transaction processing modules.</span></li><li><b>Payment workflows</b><span>Implemented sale, refund, and void operations through payment gateway integrations.</span></li><li><b>Backend delivery</b><span>Built REST APIs, PostgreSQL queries, business logic, UI enhancements, and stability fixes.</span></li></ol><div class="project-footer"><small>ColdFusion - Lucee - JavaScript - jQuery - AJAX - PostgreSQL</small><strong>Full case study -></strong></div></div>
      </a>
    </div>`;
}

const caseVisuals = {
  'project-emr.html': ['assets/project-healthcare-santhiya.png', 'Enterprise healthcare EMR product dashboard showing Practice Manager, Patient Portal, Collaborator Portal, REST APIs, PostgreSQL, EDI claims, ClaimMD, Vyne, PayROC, AWS S3, and production support'],
  'project-invoice.html': ['assets/project-invoice-showcase.png', 'Invoice management product dashboard showing invoice queue, billing workflow, users, payments, reports, gateways, REST APIs, PostgreSQL, and production support']
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
