/* 從零到 CVPR · 互動課程播放器 */
(function () {
  if (!state.lessons) state.lessons = {};
  const lstate = id => {
    if (!state.lessons[id]) state.lessons[id] = { step: 0, ch: {}, done: false };
    return state.lessons[id];
  };
  const phaseName = id => {
    const p = ROADMAP.phases.find(p => p.id === id);
    return p ? `${p.num} ${p.short}` : "";
  };
  const lessonProgress = () => LESSONS.filter(l => lstate(l.id).done).length;

  /* ---------- 課程卡格 ---------- */
  function renderGrid() {
    const grid = $("#lesson-grid");
    grid.innerHTML = LESSONS.map(l => {
      const st = lstate(l.id);
      const btn = st.done
        ? `<button class="w-btn lc-btn" data-lesson="${l.id}">✅ 已完成 · 複習</button>`
        : st.step > 0
          ? `<button class="w-btn primary lc-btn" data-lesson="${l.id}">▶ 繼續 · 第 ${st.step + 1} 步</button>`
          : `<button class="w-btn primary lc-btn" data-lesson="${l.id}">▶ 開始課程</button>`;
      return `<div class="lesson-card${st.done ? " done" : ""}">
        <span class="lc-icon">${l.icon}</span>
        <b class="lc-title">${l.title}</b>
        <span class="lc-meta">${phaseName(l.phase)} · 約 ${l.minutes} 分鐘 · ${l.level}</span>
        <span class="lc-desc">${l.desc}</span>
        ${btn}
      </div>`;
    }).join("") + `
      <div class="lesson-card coming">
        <span class="lc-icon">🚧</span>
        <b class="lc-title">P4–P7 的互動課程製作中</b>
        <span class="lc-meta">讀論文 · 找題目 · 寫作 · 投稿</span>
        <span class="lc-desc">後半段的路線更需要「真人教練」——回到對話裡，跟著路線一步步走。</span>
      </div>`;
    grid.querySelectorAll("[data-lesson]").forEach(b =>
      b.addEventListener("click", () => openLesson(b.dataset.lesson)));
    $("#lesson-progress").textContent = `已完成 ${lessonProgress()} / ${LESSONS.length} 堂`;
  }

  /* ---------- 把課程嵌入階段卡片 ---------- */
  function renderPhaseChips() {
    LESSONS.forEach(l => {
      const body = document.querySelector(`#${l.phase} .phase-body`);
      if (!body || body.querySelector(`[data-lesson-launch="${l.id}"]`)) return;
      const st = lstate(l.id);
      const div = document.createElement("div");
      div.className = "lesson-launch";
      div.dataset.lessonLaunch = l.id;
      div.innerHTML = `<span>${l.icon} 本階段互動課：<b>${l.title}</b></span>
        <button class="ll-chip" data-lesson="${l.id}">${st.done ? "✅ 複習" : "▶ 進入課程"}</button>`;
      const why = body.querySelector(".ph-why");
      why ? why.insertAdjacentElement("afterend", div) : body.prepend(div);
      div.querySelector("[data-lesson]").addEventListener("click", () => openLesson(l.id));
    });
  }

  /* ---------- 播放器（Modal） ---------- */
  const modal = document.createElement("div");
  modal.className = "lesson-modal";
  modal.hidden = true;
  document.body.appendChild(modal);
  let current = null, cleanups = [];

  function openLesson(id) {
    current = id;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    renderStep();
  }
  function closeModal() {
    cleanups.forEach(f => f()); cleanups = [];
    modal.hidden = true;
    document.body.style.overflow = "";
    current = null;
    renderGrid(); renderPhaseChips();
  }
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden) closeModal(); });

  function renderStep() {
    cleanups.forEach(f => f()); cleanups = [];
    const L = LESSONS.find(x => x.id === current);
    const st = lstate(current);
    const i = Math.min(st.step, L.steps.length - 1);
    st.step = i;
    save();
    const step = L.steps[i];
    const isLast = i === L.steps.length - 1;
    modal.innerHTML = `
      <div class="lesson-box">
        <div class="lesson-head">
          <div class="lh-left">
            <span class="lh-icon">${L.icon}</span>
            <div>
              <div class="lh-title">${L.title}</div>
              <div class="lh-meta">${phaseName(L.phase)} · 第 ${i + 1} / ${L.steps.length} 步</div>
            </div>
          </div>
          <button class="lh-close" aria-label="關閉課程">✕</button>
        </div>
        <div class="lesson-body">
          <h4 class="step-title">${i + 1} · ${step.title}</h4>
          <div class="step-html">${step.html}</div>
          <div class="widget-holder"></div>
          ${step.challenge ? `
          <div class="challenge-box${st.ch[step.challenge.id] ? " done" : ""}">
            <span>🎯 ${step.challenge.desc}</span>
            <span class="ch-status">${st.ch[step.challenge.id] ? "✅ 完成" : "未完成"}</span>
          </div>` : ""}
        </div>
        <div class="lesson-foot">
          <button class="w-btn nav-prev" ${i === 0 ? "disabled" : ""}>← 上一步</button>
          <div class="lh-dots">${L.steps.map((_, k) => `<span class="${k === i ? "on" : k < i ? "past" : ""}"></span>`).join("")}</div>
          ${isLast
            ? `<button class="w-btn primary finish-btn"></button>`
            : `<button class="w-btn primary nav-next">下一步 →</button>`}
        </div>
      </div>`;
    if (step.widget) {
      LESSON_WIDGETS[step.widget]($(".widget-holder", modal), {
        complete: chId => completeChallenge(chId),
        cleanup: cleanups
      });
    }
    modal.querySelector(".lh-close").addEventListener("click", closeModal);
    const prev = modal.querySelector(".nav-prev");
    if (prev) prev.addEventListener("click", () => { st.step = i - 1; save(); renderStep(); });
    const next = modal.querySelector(".nav-next");
    if (next) next.addEventListener("click", () => { st.step = i + 1; save(); renderStep(); });
    const finish = modal.querySelector(".finish-btn");
    if (finish) {
      updateFinish(finish, L);
      finish.addEventListener("click", () => {
        st.done = true; save();
        updateFinish(finish, L);
        $("#lesson-progress").textContent = `已完成 ${lessonProgress()} / ${LESSONS.length} 堂`;
      });
    }
    $(".lesson-body", modal).scrollTop = 0;
  }

  function allChDone(L) {
    const st = lstate(L.id);
    return L.steps.every(s => !s.challenge || st.ch[s.challenge.id]);
  }
  function updateFinish(btn, L) {
    const st = lstate(L.id);
    btn.disabled = !st.done && !allChDone(L);
    btn.textContent = st.done ? "🎉 已完成 · 關閉" : allChDone(L) ? "完成課程 ✅" : "先完成上面的挑戰";
    if (st.done) btn.addEventListener("click", closeModal, { once: true });
  }
  function completeChallenge(chId) {
    const st = lstate(current);
    if (st.ch[chId]) return;
    st.ch[chId] = true;
    save();
    const box = modal.querySelector(".challenge-box");
    if (box) {
      box.classList.add("done");
      box.querySelector(".ch-status").textContent = "✅ 完成";
    }
    const finish = modal.querySelector(".finish-btn");
    if (finish) {
      const L = LESSONS.find(x => x.id === current);
      updateFinish(finish, L);
    }
  }

  /* ---------- 導覽列加課程入口 ---------- */
  $("#phase-nav").insertAdjacentHTML("afterbegin", `<a class="chip" href="#lessons">🎬 互動課程</a>`);

  renderGrid();
  renderPhaseChips();
})();
