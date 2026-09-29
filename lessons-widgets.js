/* 從零到 CVPR · 互動課程組件（零依賴） */

/* 畫布工具：處理 devicePixelRatio，回傳邏輯尺寸的 ctx */
function lessonCanvas(w, h, cls) {
  const c = document.createElement("canvas");
  const d = window.devicePixelRatio || 1;
  c.width = w * d; c.height = h * d;
  c.style.width = "100%"; c.style.maxWidth = w + "px";
  c.style.display = "block";
  if (cls) c.className = cls;
  const ctx = c.getContext("2d");
  ctx.scale(d, d);
  return { c, ctx };
}

/* ---------- L4 的真實模擬器（純函式，可單獨測試） ---------- */
function lessonLinReg(gradKey, updKey, lrStr) {
  const data = [[1, 2.1], [2, 4.0], [3, 5.9], [4, 8.2]];
  const lr = parseFloat(lrStr);
  let w = 0, b = 0;
  const logs = [];
  const mse = () => {
    let s = 0;
    for (const [x, y] of data) s += (w * x + b - y) ** 2;
    return s / data.length;
  };
  let loss = mse();
  let exploded = false;
  for (let ep = 1; ep <= 200; ep++) {
    let dw = 0, db = 0;
    for (const [x, y] of data) {
      const pred = w * x + b;
      let err;
      if (gradKey === "a") err = pred - y;
      else if (gradKey === "b") err = y - pred;
      else { err = pred - y; }
      if (gradKey === "a" || gradKey === "b") { dw += err * x; db += err; }
      else { dw += err; db += err * x; }
    }
    dw /= data.length; db /= data.length;
    if (updKey === "a") { w -= lr * dw; b -= lr * db; }
    else if (updKey === "b") { w += lr * dw; b += lr * db; }
    else { w = lr * dw; b = lr * db; }
    loss = mse();
    if (!isFinite(loss)) { exploded = true; break; }
    if (ep % 50 === 0) logs.push(`epoch ${ep}: loss = ${loss.toFixed(4)}, w = ${w.toFixed(3)}, b = ${b.toFixed(3)}`);
  }
  return { logs, loss, w, b, exploded };
}

const LESSON_WIDGETS = {

  /* ---------- 論文解剖 ---------- */
  paper(container, api) {
    container.innerHTML = `
      <div class="mock-paper">
        <p class="mp-title"><span class="hp" data-k="title">SuperSeg: 邁向更強的萬能影像分割（示意論文）</span></p>
        <p class="mp-authors">A. Researcher¹, B. Author¹,² &nbsp;·&nbsp; ¹CV University &nbsp;²Institute of Vision</p>
        <p class="mp-abstract"><b>摘要：</b><span class="hp" data-k="abstract">影像分割是電腦視覺的基礎任務，但現有方法在低光場景表現大幅下降。我們提出 SuperSeg，透過光照感知模組重新校準特徵，在 COCO 上提升 3.2 mIoU，同時推理速度不變。</span></p>
        <div class="hp mp-fig" data-k="fig1">
          <b>Figure 1：</b>方法總覽
          <div class="mp-pipeline">輸入影像 → [編碼器] → [✨ 光照感知模組] → [解碼器] → 分割結果</div>
        </div>
        <p class="mp-method"><b>3. 方法</b><br><span class="hp" data-k="method">SuperSeg 由三個組件組成：共享編碼器、光照感知模組（見式 1）、輕量解碼器。式 (1)：S = f(x; θ) ⊙ g(x)。</span></p>
        <div class="hp mp-tablewrap" data-k="table">
          <b>Table 1：</b>主實驗結果
          <table class="mock-table">
            <tr><th>方法</th><th>mIoU</th><th>FPS</th></tr>
            <tr><td>DeepLabV3+</td><td>79.1</td><td>28</td></tr>
            <tr><td>Mask2Former</td><td>82.4</td><td>15</td></tr>
            <tr><td><b>SuperSeg (Ours)</b></td><td><b>85.6</b></td><td><b>22</b></td></tr>
          </table>
        </div>
        <p class="mp-limits"><b>5. 結論與局限</b><br><span class="hp" data-k="limits">我們提出 SuperSeg 並驗證其有效性。局限：在極端低光下仍不穩定；未來將引入影片時序資訊。</span></p>
      </div>
      <p class="paper-counter">已探索 0 / 6</p>
      <div class="paper-explain">👆 點擊論文中的高亮部位，這裡會告訴你它的作用。</div>`;
    const found = new Set();
    const counter = container.querySelector(".paper-counter");
    const explain = container.querySelector(".paper-explain");
    container.querySelectorAll(".hp").forEach(hp => {
      hp.addEventListener("click", () => {
        const k = hp.dataset.k;
        hp.classList.add("done");
        if (!found.has(k)) {
          found.add(k);
          counter.textContent = `已探索 ${found.size} / 6`;
          const part = PAPER_PARTS[k];
          explain.innerHTML = `<b>${part.label}</b> — ${part.text}`;
          if (found.size === 6) {
            explain.innerHTML += "<br><b>✅ 六個部位都看過了！</b>這套位置感會陪你讀完幾百篇論文。";
            api.complete("paper-hotspots");
          }
        }
      });
    });
  },

  /* ---------- 矩陣乘法 ---------- */
  matrix(container, api) {
    const A = [[1, 2, 3], [4, 5, 6]];
    const B = [[7, 8], [9, 10], [11, 12]];
    const ORDER = [[0, 0], [0, 1], [1, 0], [1, 1]];
    container.innerHTML = `
      <div class="mx-wrap">
        <div><div class="mx-grid" id="mx-a"></div><p class="conv-labels">A（2×3）</p></div>
        <div class="mx-op">×</div>
        <div><div class="mx-grid" id="mx-b"></div><p class="conv-labels">B（3×2）</p></div>
        <div class="mx-op">=</div>
        <div><div class="mx-grid" id="mx-c"></div><p class="conv-labels">C（2×2）</p></div>
      </div>
      <div class="w-controls"><button class="w-btn primary" id="mx-next">算下一格</button><span class="w-status" id="mx-log">先猜猜：C 是什麼形狀？</span></div>
      <div id="mx-quiz" hidden>
        <p class="quiz-q">檢驗題：C 的第 2 列、第 1 行（C[1][0]，左下角）是多少？</p>
        <div class="w-controls">
          <input type="number" id="mx-ans" class="mx-input" placeholder="輸入數字">
          <button class="w-btn" id="mx-check">檢查</button>
        </div>
      </div>`;
    const mk = (el, rows, editable) => {
      rows.forEach((row, i) => row.forEach((v, j) => {
        const d = document.createElement("div");
        d.className = "mx-cell"; d.textContent = v;
        d.dataset.i = i; d.dataset.j = j;
        el.appendChild(d);
      }));
    };
    const gA = container.querySelector("#mx-a"), gB = container.querySelector("#mx-b"), gC = container.querySelector("#mx-c");
    mk(gA, A); mk(gB, B);
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
      const d = document.createElement("div");
      d.className = "mx-cell q"; d.textContent = "?";
      d.dataset.i = i; d.dataset.j = j;
      gC.appendChild(d);
    }
    const log = container.querySelector("#mx-log");
    let idx = 0;
    container.querySelector("#mx-next").addEventListener("click", () => {
      if (idx >= ORDER.length) return;
      const [i, j] = ORDER[idx];
      gA.querySelectorAll(".mx-cell").forEach(c => c.classList.toggle("hl", +c.dataset.i === i));
      gB.querySelectorAll(".mx-cell").forEach(c => c.classList.toggle("hl", +c.dataset.j === j));
      const terms = A[i].map((a, k) => `${a}×${B[k][j]}`).join(" + ");
      const val = A[i].reduce((s, a, k) => s + a * B[k][j], 0);
      const cc = gC.querySelector(`[data-i="${i}"][data-j="${j}"]`);
      cc.textContent = val; cc.classList.remove("q"); cc.classList.add("filled");
      log.textContent = `C[${i}][${j}] = A 第 ${i + 1} 列 · B 第 ${j + 1} 行 = ${terms} = ${val}`;
      idx++;
      if (idx === ORDER.length) {
        container.querySelector("#mx-quiz").hidden = false;
        log.textContent = "4 格都算完了！注意到 A 的「3 列」和 B 的「2 行」被「吃掉」了嗎？";
      }
    });
    container.querySelector("#mx-check").addEventListener("click", () => {
      const v = container.querySelector("#mx-ans").value;
      if (+v === 139) {
        log.textContent = "✅ 正確！28 + 45 + 66 = 139。矩陣乘法正式裝進腦子。";
        container.querySelector("#mx-check").disabled = true;
        api.complete("mx-quiz");
      } else {
        log.textContent = "再算一次：A 的第 2 列是 [4,5,6]，B 的第 1 行是 [7,9,11]，對應相乘再相加。";
      }
    });
  },

  /* ---------- 梯度下降 ---------- */
  gd(container, api) {
    const W = 460, H = 300;
    const { c, ctx } = lessonCanvas(W, H, "w-canvas");
    container.innerHTML = `
      <div class="gd-wrap">
        <div class="c-holder"></div>
        <div class="w-controls">
          <label class="w-label">learning rate η
            <input type="range" class="w-slider" id="gd-lr" min="0.05" max="2.4" step="0.05" value="0.3">
            <b id="gd-lrv">0.3</b>
          </label>
          <button class="w-btn" id="gd-step">走一步</button>
          <button class="w-btn primary" id="gd-auto">自動跑</button>
          <button class="w-btn" id="gd-reset">重置</button>
        </div>
        <p class="w-status" id="gd-status">目前位置 w=0.5，loss=3.125。試著走到谷底（w=3）。</p>
      </div>`;
    container.querySelector(".c-holder").appendChild(c);
    const WMIN = -0.5, WMAX = 6.5, LMAX = 6.5, PAD = 24;
    const L = w => (w - 3) ** 2 / 2;
    const xpx = w => PAD + (w - WMIN) / (WMAX - WMIN) * (W - 2 * PAD);
    const ypx = l => H - PAD - l / LMAX * (H - 2 * PAD);
    const st = { w: 0.5, trail: [], steps: 0, goals: { c: false, e: false }, auto: null, dead: false };
    const status = container.querySelector("#gd-status");
    function checkGoals() {
      if (!st.goals.c && Math.abs(st.w - 3) < 0.01) {
        st.goals.c = true;
        status.textContent = `✅ 收斂達成（第 ${st.steps} 步，loss = ${L(st.w).toFixed(4)}）！接下來：把 η 調大到 2 以上，讓它爆炸。`;
        stopAuto();
      }
      if (!st.goals.e && Math.abs(st.w - 3) > 4) {
        st.goals.e = true;
        st.dead = true; stopAuto();
        status.textContent = st.goals.c
          ? "💥 爆炸了！這就是 learning rate 太大的世界。兩個挑戰都完成了。"
          : "💥 爆炸了！挑戰 ② 達成——但挑戰 ① 還沒收斂過：把 η 調回 1 以下，重置再跑一次。";
      }
      if (st.goals.c && st.goals.e) api.complete("gd-goals");
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = "#9aa3b8"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(PAD, H - PAD); ctx.lineTo(W - PAD, H - PAD); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(PAD, PAD); ctx.lineTo(PAD, H - PAD); ctx.stroke();
      ctx.fillStyle = "#9aa3b8"; ctx.font = "12px system-ui";
      ctx.fillText("參數 w →", W - 90, H - 8);
      ctx.save(); ctx.translate(12, 70); ctx.rotate(-Math.PI / 2); ctx.fillText("loss ↑", 0, 0); ctx.restore();
      ctx.strokeStyle = "#7c6cf0"; ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let i = 0; i <= 200; i++) {
        const w = WMIN + (WMAX - WMIN) * i / 200;
        const x = xpx(w), y = ypx(L(w));
        i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.stroke();
      st.trail.forEach((tw, i) => {
        ctx.fillStyle = `rgba(124,108,240,${0.15 + 0.5 * i / st.trail.length})`;
        ctx.beginPath(); ctx.arc(xpx(tw), ypx(L(tw)), 4, 0, 7); ctx.fill();
      });
      if (!st.dead) {
        ctx.fillStyle = "#ef4444";
        ctx.beginPath(); ctx.arc(xpx(st.w), ypx(L(st.w)), 8, 0, 7); ctx.fill();
        ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.stroke();
      } else {
        ctx.font = "34px system-ui"; ctx.textAlign = "center";
        ctx.fillText("💥", xpx(3), H / 2);
        ctx.textAlign = "left";
      }
      ctx.fillStyle = "#5c6478"; ctx.font = "12px system-ui";
      ctx.fillText(`step ${st.steps}　w = ${st.w.toFixed(3)}　loss = ${L(st.w).toFixed(4)}`, PAD + 6, PAD + 2);
    }
    function step() {
      if (st.dead || Math.abs(st.w - 3) < 0.01) { stopAuto(); return; }
      const lr = +container.querySelector("#gd-lr").value;
      st.trail.push(st.w);
      if (st.trail.length > 40) st.trail.shift();
      st.w = st.w - lr * (st.w - 3);
      st.steps++;
      if (!st.goals.c && Math.abs(st.w - 3) >= 0.01 && st.steps > 3) {
        status.textContent = `step ${st.steps}：loss = ${L(st.w).toFixed(4)}`;
      }
      draw(); checkGoals();
    }
    function stopAuto() {
      if (st.auto) { clearInterval(st.auto); st.auto = null; container.querySelector("#gd-auto").textContent = "自動跑"; }
    }
    container.querySelector("#gd-lr").addEventListener("input", e => {
      container.querySelector("#gd-lrv").textContent = (+e.target.value).toFixed(2);
    });
    container.querySelector("#gd-step").addEventListener("click", step);
    container.querySelector("#gd-auto").addEventListener("click", e => {
      if (st.auto) { stopAuto(); return; }
      e.target.textContent = "暫停";
      st.auto = setInterval(step, 260);
      api.cleanup.push(stopAuto);
    });
    container.querySelector("#gd-reset").addEventListener("click", () => {
      stopAuto();
      Object.assign(st, { w: 0.5, trail: [], steps: 0, dead: false });
      status.textContent = "重置了。w=0.5。換個 η 再試一次。";
      draw();
    });
    draw();
  },

  /* ---------- 程式碼填空執行器 ---------- */
  code(container, api) {
    const BLANKS = {
      grad: [
        { v: "a", t: "err = pred - y; dw += err * x; db += err;" },
        { v: "b", t: "err = y - pred; dw += err * x; db += err;" },
        { v: "c", t: "err = pred - y; dw += err; db += err * x;" }
      ],
      upd: [
        { v: "a", t: "w = w - lr * dw; b = b - lr * db;" },
        { v: "b", t: "w = w + lr * dw; b = b + lr * db;" },
        { v: "c", t: "w = lr * dw;   b = lr * db;" }
      ],
      lr: [
        { v: "0.05", t: "0.05" }, { v: "5.0", t: "5.0" }, { v: "0.000001", t: "0.000001" }
      ]
    };
    const sel = k => `<select class="code-blank" data-k="${k}">${BLANKS[k].map(o => `<option value="${o.v}">${o.t}</option>`).join("")}</select>`;
    container.innerHTML = `
      <pre class="code-edit">const lr = ${sel("lr")};   // 學習率 η
let w = 0, b = 0;          // 要學的參數

for (let epoch = 1; epoch <= 200; epoch++) {
  let dw = 0, db = 0;
  for (const [x, y] of data) {
    const pred = w * x + b;
    const err = pred - y;
    ${sel("grad")}          // ③ 累加梯度
  }
  dw /= data.length; db /= data.length;
  ${sel("upd")}   // ④ 更新參數
}</pre>
      <div class="w-controls"><button class="w-btn primary" id="code-run">▶ 執行訓練</button><span class="w-status">試錯也是學習——選錯的組合也跑跑看，觀察 loss 會怎麼樣。</span></div>
      <pre class="code-out" id="code-out">// 輸出會出現在這裡</pre>
      <details class="hint-box"><summary>卡住了？點開答案</summary>
        <p>① 梯度：err = pred − y，則 dw += err·x、db += err（誤差越大、x 越大，責任越大）。</p>
        <p>② 更新：梯度指向上坡，所以用「減號」——w = w − lr·dw。</p>
        <p>③ η = 0.05。5.0 會爆炸（L3 見過），0.000001 慢到 200 步都不動。</p>
      </details>`;
    const out = container.querySelector("#code-out");
    container.querySelector("#code-run").addEventListener("click", () => {
      const g = container.querySelector('select[data-k="grad"]').value;
      const u = container.querySelector('select[data-k="upd"]').value;
      const lr = container.querySelector('select[data-k="lr"]').value;
      const r = lessonLinReg(g, u, lr);
      const lines = [...r.logs];
      if (r.exploded) lines.push("💥 loss = Infinity —— 訓練爆炸了！（數值溢出）");
      else lines.push(`學到的模型：y = ${r.w.toFixed(2)}·x + ${r.b.toFixed(2)}`);
      if (isFinite(r.loss) && r.loss < 0.5) {
        lines.push(`最終 loss = ${r.loss.toFixed(4)} < 0.5`);
        if (g === "b" && u === "b") lines.push("🤔 加分題：你選了兩個「錯」卻得到對的結果——因為符號翻了兩次等於沒翻。想通了嗎？");
        lines.push("✅ CHALLENGE_PASS");
        api.complete("code-pass");
      } else if (isFinite(r.loss) && r.loss > 1e6) {
        lines.push(`最終 loss = ${r.loss.toExponential(2)} —— 💥 爆炸了！數值飛出天際。`);
      } else if (isFinite(r.loss)) {
        lines.push(`最終 loss = ${r.loss.toFixed(4)} —— 還太高，換個組合再試。`);
      }
      out.textContent = lines.join("\n");
    });
  },

  /* ---------- 神經網路 ---------- */
  nn(container, api) {
    const W = 340, H = 340, HID = 8;
    const { c, ctx } = lessonCanvas(W, H, "w-canvas");
    const { c: lc, ctx: lctx } = lessonCanvas(W, 84, "w-canvas");
    container.innerHTML = `
      <div class="nn-wrap">
        <div class="c-holder"></div>
        <div class="w-controls">
          <button class="w-btn primary" id="nn-toggle">▶ 開始訓練</button>
          <button class="w-btn" id="nn-reset">重置參數</button>
          <label class="w-label">資料
            <select class="w-select" id="nn-data"><option value="xor">XOR（四叢集）</option><option value="circle">同心圓</option></select>
          </label>
          <label class="w-label">lr
            <input type="range" class="w-slider" id="nn-lr" min="0.05" max="2" step="0.05" value="0.6">
            <b id="nn-lrv">0.60</b>
          </label>
        </div>
        <div class="c-holder2"></div>
        <p class="w-status" id="nn-status">loss = ?</p>
      </div>`;
    container.querySelector(".c-holder").appendChild(c);
    container.querySelector(".c-holder2").appendChild(lc);

    const rand = (r, o) => o.map(() => (Math.random() * 2 - 1) * r);
    let P, data, training = false, timer = null, lossHist = [], passed = false;
    const tanh = Math.tanh, sig = z => 1 / (1 + Math.exp(-z));

    function makeData(kind) {
      const pts = [];
      const gauss = s => (Math.random() + Math.random() + Math.random() - 1.5) * s;
      if (kind === "xor") {
        [[1, 1, 1], [-1, -1, 1], [1, -1, 0], [-1, 1, 0]].forEach(([cx, cy, lb]) => {
          for (let i = 0; i < 35; i++) pts.push([cx + gauss(0.5), cy + gauss(0.5), lb]);
        });
      } else {
        for (let i = 0; i < 45; i++) { const a = Math.random() * 7, r = Math.random() * 0.7; pts.push([Math.cos(a) * r, Math.sin(a) * r, 1]); }
        for (let i = 0; i < 75; i++) { const a = Math.random() * 7, r = 1.4 + Math.random() * 0.5; pts.push([Math.cos(a) * r, Math.sin(a) * r, 0]); }
      }
      return pts;
    }
    function initParams() {
      P = {
        W1: Array.from({ length: HID }, () => rand(0.9, [0, 0])), b1: new Array(HID).fill(0),
        W2: rand(0.9, new Array(HID).fill(0)), b2: 0
      };
      lossHist = [];
    }
    function forward(x) {
      const a1 = P.W1.map((row, j) => tanh(row[0] * x[0] + row[1] * x[1] + P.b1[j]));
      const z2 = P.W2.reduce((s, wj, j) => s + wj * a1[j], P.b2);
      return { a1, p: sig(z2) };
    }
    function loss() {
      let s = 0;
      for (const [x0, x1, y] of data) {
        const p = Math.min(1 - 1e-7, Math.max(1e-7, forward([x0, x1]).p));
        s += -(y * Math.log(p) + (1 - y) * Math.log(1 - p));
      }
      return s / data.length;
    }
    function trainEpoch(lr) {
      const dW1 = Array.from({ length: HID }, () => [0, 0]);
      const db1 = new Array(HID).fill(0), dW2 = new Array(HID).fill(0);
      let db2 = 0, n = data.length;
      for (const [x0, x1, y] of data) {
        const { a1, p } = forward([x0, x1]);
        const dz2 = (p - y) / n;
        for (let j = 0; j < HID; j++) {
          dW2[j] += dz2 * a1[j];
          const da1 = dz2 * P.W2[j];
          const dz1 = da1 * (1 - a1[j] * a1[j]);
          dW1[j][0] += dz1 * x0; dW1[j][1] += dz1 * x1; db1[j] += dz1;
        }
        db2 += dz2;
      }
      for (let j = 0; j < HID; j++) {
        P.W1[j][0] -= lr * dW1[j][0]; P.W1[j][1] -= lr * dW1[j][1]; P.b1[j] -= lr * db1[j];
        P.W2[j] -= lr * dW2[j];
      }
      P.b2 -= lr * db2;
    }
    function drawMain() {
      const G = 44, cell = W / G;
      const img = ctx.createImageData(G, G);
      for (let gy = 0; gy < G; gy++) for (let gx = 0; gx < G; gx++) {
        const wx = (gx / G) * 4 - 2, wy = 2 - (gy / G) * 4;
        const p = forward([wx, wy]).p;
        const a = Math.abs(p - 0.5) * 2;
        const o = (gy * G + gx) * 4;
        if (p > 0.5) { img.data[o] = 249; img.data[o + 1] = 115; img.data[o + 2] = 22; }
        else { img.data[o] = 59; img.data[o + 1] = 130; img.data[o + 2] = 246; }
        img.data[o + 3] = 40 + a * 130;
      }
      const off = document.createElement("canvas"); off.width = G; off.height = G;
      off.getContext("2d").putImageData(img, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(off, 0, 0, W, H);
      for (const [x0, x1, y] of data) {
        const px = (x0 + 2) / 4 * W, py = (2 - x1) / 4 * H;
        ctx.beginPath(); ctx.arc(px, py, 4, 0, 7);
        ctx.fillStyle = y ? "#f97316" : "#3b82f6"; ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,.85)"; ctx.lineWidth = 1.2; ctx.stroke();
      }
    }
    function drawLoss() {
      lctx.clearRect(0, 0, W, 84);
      lctx.strokeStyle = "#9aa3b8"; lctx.lineWidth = 1;
      lctx.beginPath(); lctx.moveTo(24, 8); lctx.lineTo(24, 68); lctx.stroke();
      lctx.fillStyle = "#9aa3b8"; lctx.font = "11px system-ui";
      lctx.fillText("loss", 4, 16);
      if (lossHist.length < 2) return;
      const top = Math.max(0.8, lossHist[0]);
      lctx.strokeStyle = "#22c55e"; lctx.lineWidth = 2;
      lctx.beginPath();
      lossHist.forEach((v, i) => {
        const x = 26 + i / (lossHist.length - 1) * (W - 34);
        const y = 68 - Math.min(1, v / top) * 58;
        i ? lctx.lineTo(x, y) : lctx.moveTo(x, y);
      });
      lctx.stroke();
    }
    function frame() {
      if (!training) return;
      const lr = +container.querySelector("#nn-lr").value;
      for (let i = 0; i < 12; i++) trainEpoch(lr);
      const l = loss();
      if (!isFinite(l)) {
        stopTraining();
        container.querySelector("#nn-toggle").textContent = "▶ 開始訓練";
        container.querySelector("#nn-status").textContent = "💥 loss = NaN，爆炸了！按「重置參數」，把 lr 調小一點再來。";
        return;
      }
      lossHist.push(l); if (lossHist.length > 200) { lossHist = lossHist.filter((_, i) => i % 2 === 0); }
      container.querySelector("#nn-status").textContent = `loss = ${l.toFixed(4)}　${l < 0.15 ? "（低於 0.15 了！）" : ""}`;
      drawMain(); drawLoss();
      if (!passed && l < 0.15 && container.querySelector("#nn-data").value === "xor") {
        passed = true; api.complete("nn-xor");
      }
    }
    function stopTraining() {
      training = false;
      if (timer) { clearInterval(timer); timer = null; }
    }
    container.querySelector("#nn-toggle").addEventListener("click", e => {
      if (training) { stopTraining(); e.target.textContent = "▶ 開始訓練"; return; }
      training = true;
      e.target.textContent = "⏸ 暫停";
      timer = setInterval(frame, 33);
    });
    container.querySelector("#nn-reset").addEventListener("click", () => { initParams(); drawMain(); drawLoss(); container.querySelector("#nn-status").textContent = "參數已重新初始化。"; });
    container.querySelector("#nn-data").addEventListener("change", e => {
      data = makeData(e.target.value); initParams(); drawMain(); drawLoss();
      container.querySelector("#nn-status").textContent = "換好資料了，重新訓練看看。";
    });
    container.querySelector("#nn-lr").addEventListener("input", e => container.querySelector("#nn-lrv").textContent = (+e.target.value).toFixed(2));
    api.cleanup.push(stopTraining);
    data = makeData("xor");
    initParams(); drawMain(); drawLoss();
  },

  /* ---------- 卷積實驗台 ---------- */
  conv(container, api) {
    const K = {
      sx: { name: "豎直邊緣", k: [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]] },
      sy: { name: "水平邊緣", k: [[-1, -2, -1], [0, 0, 0], [1, 2, 1]] },
      sh: { name: "銳化", k: [[0, -1, 0], [-1, 5, -1], [0, -1, 0]] }
    };
    let grid = Array.from({ length: 8 }, () => new Array(8).fill(0));
    container.innerHTML = `
      <div class="w-controls">
        <label class="w-label">卷積核
          <select class="w-select" id="cv-k"><option value="sx">豎直邊緣（Sobel-x）</option><option value="sy">水平邊緣（Sobel-y）</option><option value="sh">銳化</option></select>
        </label>
        <button class="w-btn" id="cv-vline">示例：豎線</button>
        <button class="w-btn" id="cv-box">示例：方塊</button>
        <button class="w-btn" id="cv-clear">清空</button>
      </div>
      <div class="conv-wrap">
        <div><div class="conv-grid" id="cv-in"></div><p class="conv-labels">輸入 8×8（點擊上色）</p></div>
        <div class="mx-op">→</div>
        <div><div class="conv-grid out" id="cv-out"></div><p class="conv-labels">輸出 6×6</p></div>
      </div>
      <p class="w-status" id="cv-status">畫點東西，或按「示例：豎線」。</p>
      <details class="hint-box"><summary>這一格是怎麼算出來的？</summary>
        <p>輸出(r,c) = 輸入以 (r+1,c+1) 為中心的 3×3 區域，與卷積核對應相乘再相加。</p>
        <p>例：畫一條豎線（第 5 行全亮），用豎直邊緣核 —— 輸出的第 3 行會出現 +4（核右側碰到亮線），第 5 行出現 −4（核左側碰到）。一條邊緣，兩種極性。</p>
      </details>`;
    const inEl = container.querySelector("#cv-in"), outEl = container.querySelector("#cv-out");
    for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) {
      const b = document.createElement("button");
      b.className = "px"; b.dataset.i = i; b.dataset.j = j;
      b.addEventListener("click", () => {
        grid[i][j] ^= 1; b.classList.toggle("on", !!grid[i][j]); render();
      });
      inEl.appendChild(b);
    }
    for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) {
      const d = document.createElement("div");
      d.className = "out-cell"; outEl.appendChild(d);
    }
    function render() {
      const k = K[container.querySelector("#cv-k").value].k;
      const cells = outEl.children;
      let strong = 0, idx = 0;
      for (let r = 0; r < 6; r++) for (let c2 = 0; c2 < 6; c2++) {
        let v = 0;
        for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) v += grid[r + i][c2 + j] * k[i][j];
        const d = cells[idx++];
        d.textContent = v === 0 ? "" : (v > 0 ? "+" : "") + v;
        if (v > 0) { d.style.background = `rgba(59,130,246,${Math.min(0.9, v / 6)})`; d.style.color = v >= 3 ? "#fff" : "inherit"; }
        else if (v < 0) { d.style.background = `rgba(239,68,68,${Math.min(0.9, -v / 6)})`; d.style.color = -v >= 3 ? "#fff" : "inherit"; }
        else { d.style.background = ""; d.style.color = "inherit"; }
        if (Math.abs(v) >= 3) strong++;
      }
      inEl.querySelectorAll(".px").forEach(b => b.classList.toggle("on", !!grid[+b.dataset.i][+b.dataset.j]));
      if (strong >= 3) {
        container.querySelector("#cv-status").textContent = `✅ 有 ${strong} 個強響應格子——你剛剛做了一次真正的卷積！換個核、換個圖案再觀察。`;
        api.complete("conv-edge");
      } else {
        container.querySelector("#cv-status").textContent = `目前強響應格子：${strong} / 3。畫出「亮暗交界」看看。`;
      }
    }
    container.querySelector("#cv-k").addEventListener("change", render);
    container.querySelector("#cv-vline").addEventListener("click", () => {
      grid = Array.from({ length: 8 }, () => new Array(8).fill(0));
      for (let i = 0; i < 8; i++) grid[i][4] = 1; render();
    });
    container.querySelector("#cv-box").addEventListener("click", () => {
      grid = Array.from({ length: 8 }, () => new Array(8).fill(0));
      for (let i = 2; i < 6; i++) for (let j = 2; j < 6; j++) grid[i][j] = 1; render();
    });
    container.querySelector("#cv-clear").addEventListener("click", () => {
      grid = Array.from({ length: 8 }, () => new Array(8).fill(0)); render();
    });
    render();
  }
};
