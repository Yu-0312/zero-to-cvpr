/* 從零到 CVPR · 互動邏輯（無依賴，原生 JS） */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const KEY = "zero2cvpr-v1";

/* ---------- 本地狀態 ---------- */
function loadState() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; }
}
const state = Object.assign({ checks: {}, open: {}, theme: null }, loadState());
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {} };

/* ---------- 深色模式 ---------- */
function applyTheme(t) {
  document.documentElement.dataset.theme = t;
  $("#theme-toggle").textContent = t === "dark" ? "☀️" : "🌙";
}
applyTheme(state.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
$("#theme-toggle").addEventListener("click", () => {
  state.theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(state.theme);
  save();
});

/* ---------- 任務地圖 ---------- */
$("#map-grid").innerHTML = TASK_MAP.map(x => `
  <div class="tile">
    <div class="tile-head"><span class="tile-icon">${x.icon}</span><b>${x.name}</b></div>
    <p>${x.desc}</p>
    <p class="tile-note">代表：${x.example}</p>
  </div>`).join("");

/* ---------- 時間線 ---------- */
$("#tl-track").innerHTML = ROADMAP.phases.map(p => `
  <div class="tl-seg" style="flex:${p.months};background:${p.color}" title="${p.title}（${p.monthsLabel}）">${p.months >= 0.5 ? p.num : ""}</div>`).join("");
$("#tl-legend").innerHTML = ROADMAP.phases.map(p => `
  <span class="tl-chip"><i style="background:${p.color}"></i>${p.num} ${p.short} · ${p.monthsLabel}</span>`).join("");

/* ---------- 階段導覽 ---------- */
$("#phase-nav").innerHTML =
  ROADMAP.phases.map(p => `<a class="chip" href="#${p.id}">${p.num} ${p.short}</a>`).join("") +
  `<button class="chip chip-btn" id="expand-all">＋ 展開全部</button>` +
  `<button class="chip chip-btn" id="collapse-all">－ 收合全部</button>`;

/* ---------- 渲染階段 ---------- */
function tasksHTML(ph, kind, items) {
  return items.map((it, i) => {
    const id = `${ph.id}-${kind}${i}`;
    const checked = state.checks[id] ? "checked" : "";
    if (kind === "t") {
      return `<label class="task">
        <input type="checkbox" data-id="${id}" ${checked}>
        <span class="box"></span>
        <span class="task-text"><b>${it.t}</b><span class="topic-desc">${it.d}</span></span>
      </label>`;
    }
    return `<label class="task milestone">
      <input type="checkbox" data-id="${id}" ${checked}>
      <span class="box"></span>
      <span class="task-text">${it}</span>
    </label>`;
  }).join("");
}

function resourcesHTML(ph) {
  return ph.resources.map(r => `
    <a class="res" href="${r.url}" target="_blank" rel="noopener">
      <span class="res-name">${r.name} ↗</span>
      <span class="res-note">${r.note}</span>
    </a>`).join("");
}

function quizHTML(ph) {
  return ph.quiz.map((q, qi) => `
    <div class="quiz">
      <p class="quiz-q">Q${qi + 1}. ${q.q}</p>
      <div class="opts">${q.options.map((o, oi) =>
        `<button class="opt" data-ok="${oi === q.a ? 1 : 0}">${"ABCD"[oi]}. ${o}</button>`).join("")}</div>
      <p class="quiz-explain">💡 ${q.explain}</p>
    </div>`).join("");
}

ROADMAP.phases.forEach((ph, idx) => {
  const open = state.open[ph.id] !== undefined ? state.open[ph.id] : idx === 0;
  const art = document.createElement("article");
  art.className = "phase card" + (open ? " open" : "");
  art.id = ph.id;
  art.style.setProperty("--ph", ph.color);
  art.innerHTML = `
    <button class="phase-header" aria-expanded="${open}">
      <span class="ph-badge">${ph.num}</span>
      <span class="ph-head-text">
        <span class="ph-title">${ph.title}</span>
        <span class="ph-meta">${ph.monthsLabel} · ${ph.goal}</span>
      </span>
      <span class="ph-pill" id="pill-${ph.id}">–</span>
      <span class="chevron">▾</span>
    </button>
    <div class="phase-body-wrap"><div class="phase-body">
      <p class="ph-why">${ph.why}</p>
      <p class="sec-label">學習內容</p>
      <div class="tasks">${tasksHTML(ph, "t", ph.topics)}</div>
      <p class="sec-label">🎯 里程碑（做到才算過關）</p>
      <div class="tasks">${tasksHTML(ph, "m", ph.milestones)}</div>
      <p class="sec-label">推薦資源</p>
      <div class="res-list">${resourcesHTML(ph)}</div>
      <p class="sec-label">隨堂小測</p>
      <div class="quiz-list">${quizHTML(ph)}</div>
    </div></div>`;
  $("#phases").appendChild(art);
});

/* ---------- 互動：展開／收合 ---------- */
$("#phases").addEventListener("click", e => {
  const header = e.target.closest(".phase-header");
  if (!header) return;
  const ph = header.closest(".phase");
  const open = ph.classList.toggle("open");
  header.setAttribute("aria-expanded", open);
  state.open[ph.id] = open;
  save();
});

$("#phase-nav").addEventListener("click", e => {
  const id = e.target.id;
  if (id !== "expand-all" && id !== "collapse-all") return;
  const open = id === "expand-all";
  $$(".phase").forEach(p => {
    p.classList.toggle("open", open);
    state.open[p.id] = open;
    $(".phase-header", p).setAttribute("aria-expanded", open);
  });
  save();
});

/* ---------- 互動：勾選進度 ---------- */
$("#phases").addEventListener("change", e => {
  const cb = e.target.closest("input[data-id]");
  if (!cb) return;
  if (cb.checked) state.checks[cb.dataset.id] = true;
  else delete state.checks[cb.dataset.id];
  save();
  updateProgress();
});

/* ---------- 互動：隨堂小測 ---------- */
$("#phases").addEventListener("click", e => {
  const btn = e.target.closest(".opt");
  if (!btn || btn.disabled) return;
  const quiz = btn.closest(".quiz");
  if (btn.dataset.ok === "1") {
    btn.classList.add("correct");
    $$(".opt", quiz).forEach(o => { o.disabled = true; });
    $(".quiz-explain", quiz).classList.add("show");
  } else {
    btn.classList.add("wrong");
    btn.disabled = true;
  }
});

/* ---------- 進度統計 ---------- */
function updateProgress() {
  const inputs = $$("input[data-id]");
  const total = inputs.length;
  const done = inputs.filter(i => i.checked).length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  $("#progress-fill").style.width = pct + "%";
  $("#progress-label").textContent = `${done} / ${total}`;
  $("#progress-pct").textContent = pct + "%";
  ROADMAP.phases.forEach(p => {
    const pill = $(`#pill-${p.id}`);
    if (!pill) return;
    const items = $$(`input[data-id^="${p.id}-"]`);
    const d = items.filter(i => i.checked).length;
    pill.textContent = `${d} / ${items.length}`;
    pill.classList.toggle("done", items.length > 0 && d === items.length);
  });
}
updateProgress();

/* ---------- 重置 ---------- */
$("#reset-progress").addEventListener("click", () => {
  if (!confirm("確定要清空所有勾選進度嗎？此操作無法復原。")) return;
  state.checks = {};
  save();
  $$("input[data-id]").forEach(i => { i.checked = false; });
  updateProgress();
});

/* ---------- 常見問題 ---------- */
$("#faq-list").innerHTML = FAQ.map(f => `
  <details class="faq-item">
    <summary>${f.q}</summary>
    <p>${f.a}</p>
  </details>`).join("");

/* ---------- 算力與陷阱 ---------- */
const tileHTML = x => `
  <div class="tile">
    <div class="tile-head"><span class="tile-icon">${x.icon}</span><b>${x.name}</b></div>
    <p>${x.desc}</p>
  </div>`;
$("#compute-grid").innerHTML = COMPUTE.map(tileHTML).join("");
$("#pitfall-grid").innerHTML = PITFALLS.map(tileHTML).join("");
