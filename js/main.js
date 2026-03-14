// ============================================================
// AI活用ダッシュボード — メインスクリプト
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
  renderHeroStats();
  renderResults();
  renderProposals();
  renderProjects();
  renderFooter();
  initNav();
});

// ============================================================
// SVG Icons
// ============================================================
var ICONS = {
  document: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h5v7h7v9H6z"/></svg>',
  chat: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>',
  calculator: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 7h10v4H7zm0 6h4v4H7zm6 0h4v1.5h-4zm0 2.5h4V17h-4z"/></svg>',
  people: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>',
  monitor: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"/></svg>',
  folder: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>',
  gear: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',
  sparkle: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4v3z"/></svg>'
};

// ============================================================
// Hero Stats
// ============================================================
function renderHeroStats() {
  var s = DASHBOARD_DATA.summary;
  var stats = [
    { number: s.maxReduction, unit: '%', label: '最大工数削減率' },
    { number: s.totalProjects, unit: '件', label: '全プロジェクト' },
    { number: s.categories, unit: '分野', label: '対応可能カテゴリ' }
  ];
  var html = '';
  for (var i = 0; i < stats.length; i++) {
    html += '<div class="hero-stat">' +
      '<div class="hero-stat-number">' + stats[i].number + '<span class="hero-stat-unit">' + stats[i].unit + '</span></div>' +
      '<div class="hero-stat-label">' + stats[i].label + '</div>' +
      '</div>';
  }
  document.getElementById('hero-stats').innerHTML = html;
}

// ============================================================
// Results (Before/After)
// ============================================================
function renderResults() {
  var results = DASHBOARD_DATA.results;
  var html = '';
  for (var i = 0; i < results.length; i++) {
    var r = results[i];
    var badgeClass = 'project-badge-' + r.status;
    html += '<div class="result-card">' +
      '<div class="result-card-icon icon-' + r.icon + '">' + (ICONS[r.icon] || '') + '</div>' +
      '<div class="result-card-name">' + r.name + '</div>' +
      '<p class="result-card-desc">' + r.description + '</p>' +
      '<div class="result-ba">' +
        '<div class="result-ba-row">' +
          '<span class="result-ba-label before">Before</span>' +
          '<span class="result-ba-text">' + r.before + '</span>' +
        '</div>' +
        '<div class="result-ba-row">' +
          '<span class="result-ba-label after">After</span>' +
          '<span class="result-ba-text">' + r.after + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="result-card-saved">' + ICONS.sparkle + ' ' + r.savedTime + '</div>' +
      '</div>';
  }
  document.getElementById('results-grid').innerHTML = html;
}

// ============================================================
// Proposals (AI化できます)
// ============================================================
function renderProposals() {
  var proposals = DASHBOARD_DATA.proposals;
  var tabsHtml = '';
  var contentsHtml = '';

  for (var i = 0; i < proposals.length; i++) {
    var p = proposals[i];
    var activeClass = i === 0 ? ' active' : '';
    tabsHtml += '<button class="proposal-tab' + activeClass + '" onclick="switchTab(' + i + ')">' +
      (ICONS[p.icon] || '') + p.category +
      '</button>';

    var itemsHtml = '';
    for (var j = 0; j < p.items.length; j++) {
      var item = p.items[j];
      var trackBadge = item.desc.indexOf('実績あり') >= 0 || item.desc.indexOf('制作中') >= 0
        ? ' <span class="badge-track">' + (item.desc.indexOf('実績あり') >= 0 ? '実績あり' : '制作中') + '</span>'
        : '';
      var cleanDesc = item.desc.replace(/（実績あり）/g, '').replace(/（制作中）/g, '');
      itemsHtml += '<div class="proposal-item">' +
        '<div class="proposal-item-name">' + item.task + trackBadge + '</div>' +
        '<div class="proposal-item-desc">' + cleanDesc + '</div>' +
        '</div>';
    }

    contentsHtml += '<div class="proposal-content' + activeClass + '" id="proposal-' + i + '">' +
      '<div class="proposal-grid">' + itemsHtml + '</div>' +
      '</div>';
  }

  document.getElementById('proposal-tabs').innerHTML = tabsHtml;
  document.getElementById('proposal-contents').innerHTML = contentsHtml;
}

function switchTab(index) {
  var tabs = document.querySelectorAll('.proposal-tab');
  var contents = document.querySelectorAll('.proposal-content');
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove('active');
    contents[i].classList.remove('active');
  }
  tabs[index].classList.add('active');
  contents[index].classList.add('active');
}

// ============================================================
// Projects
// ============================================================
function renderProjects() {
  var projects = DASHBOARD_DATA.projects;
  var html = '';
  for (var i = 0; i < projects.length; i++) {
    var p = projects[i];
    var badgeClass = 'project-badge-' + p.status;
    var fillClass = 'pf-' + p.status;
    html += '<div class="project-card" onclick="openModal(' + i + ')">' +
      '<div class="project-card-header">' +
        '<div class="project-card-name">' + p.name + '</div>' +
      '</div>' +
      '<p class="project-card-desc">' + p.description + '</p>' +
      '<button class="detail-btn" onclick="event.stopPropagation();openModal(' + i + ')">' +
        '<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>' +
        ' 詳細を見る</button>' +
      '</div>';
  }
  document.getElementById('projects-grid').innerHTML = html;
}

// ============================================================
// Footer
// ============================================================
function renderFooter() {
  var d = DASHBOARD_DATA;
  document.getElementById('footer-text').textContent =
    d.manager + ' / ' + d.title + ' / Last updated: ' + d.lastUpdated;
}

// ============================================================
// Navigation
// ============================================================
function initNav() {
  var nav = document.getElementById('nav');
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('nav-mobile');

  // Scroll shadow
  window.addEventListener('scroll', function () {
    if (window.scrollY > 10) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Hamburger toggle
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });
}

function closeMenu() {
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('nav-mobile');
  hamburger.classList.remove('active');
  mobileNav.classList.remove('open');
  document.body.style.overflow = '';
}

// ============================================================
// Project Detail Modal
// ============================================================
function openModal(index) {
  var p = DASHBOARD_DATA.projects[index];
  if (!p) return;
  var d = p.detail || {};

  // Title
  document.getElementById('modal-title').textContent = p.name;
  document.getElementById('modal-badge').className = '';
  document.getElementById('modal-badge').textContent = '';

  // Progress (非表示)
  document.getElementById('modal-progress').innerHTML = '';

  // Body
  var body = '';

  // 概要
  if (d.overview) {
    body += '<div class="modal-section">' +
      '<div class="modal-section-title">' + ICONS.document + ' 概要</div>' +
      '<div class="modal-section-text">' + d.overview + '</div>' +
      '</div>';
  }

  // 背景・課題
  if (d.background) {
    body += '<div class="modal-section">' +
      '<div class="modal-section-title">' + ICONS.chat + ' 背景・課題</div>' +
      '<div class="modal-section-text">' + d.background + '</div>' +
      '</div>';
  }

  // メタ情報（対象者のみ、期間は非表示）
  var metaHtml = '';
  if (d.targetUsers) {
    metaHtml += '<div class="modal-meta-item">' + ICONS.people + ' ' + d.targetUsers + '</div>';
  }
  if (metaHtml) {
    body += '<div class="modal-section"><div class="modal-meta">' + metaHtml + '</div></div>';
  }

  // 使用ツール
  if (d.tools && d.tools.length > 0) {
    var toolsHtml = '';
    for (var t = 0; t < d.tools.length; t++) {
      toolsHtml += '<span class="modal-tool-tag">' + d.tools[t] + '</span>';
    }
    body += '<div class="modal-section">' +
      '<div class="modal-section-title">' + ICONS.gear + ' 使用ツール</div>' +
      '<div class="modal-tools">' + toolsHtml + '</div>' +
      '</div>';
  }

  // 削減効果（Before/After）
  if (d.impact) {
    var impactHtml = '<div class="modal-impact">';
    impactHtml += '<div class="modal-impact-row">' +
      '<span class="modal-impact-label before">Before</span>' +
      '<span class="modal-impact-text">' + d.impact.before + '</span></div>';
    impactHtml += '<div class="modal-impact-row">' +
      '<span class="modal-impact-label after">After</span>' +
      '<span class="modal-impact-text">' + d.impact.after + '</span></div>';
    if (d.impact.savedTime) {
      impactHtml += '<div class="modal-impact-saved">' + ICONS.sparkle + ' ' + d.impact.savedTime + '</div>';
    }
    impactHtml += '</div>';
    body += '<div class="modal-section">' +
      '<div class="modal-section-title">' + ICONS.sparkle + ' 削減効果</div>' +
      impactHtml + '</div>';
  }

  // 作業歴・次のアクションは社外版では非表示

  document.getElementById('modal-body').innerHTML = body;

  // Show
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

// Close on overlay click
document.addEventListener('click', function(e) {
  if (e.target.id === 'modal-overlay') closeModal();
});

// Close on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});
