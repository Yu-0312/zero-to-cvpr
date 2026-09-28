/* 從零到 CVPR · 互動式學習路線 — 內容資料檔 */

const ROADMAP = {
  title: "從零到 CVPR",
  subtitle: "互動式學習路線 · 零基礎 → 頂會投稿",
  phases: [
    {
      id: "p0",
      num: "P0",
      short: "認識戰場",
      title: "認識戰場：CVPR 到底在做什麼",
      months: 0.25,
      monthsLabel: "第 0–1 週",
      goal: "先搞清楚 CVPR 是什麼、論文長什麼樣",
      color: "#64748b",
      why: "「投稿 CVPR」本質上是：在競爭激烈的國際會議上，讓 3 位審稿人相信你做了一件「新的、有效的、講清楚了」的視覺研究。這個階段不寫程式，先建立全局認知——搞懂規則的人，才不會盲目努力兩年。",
      topics: [
        { t: "CVPR 是什麼", d: "IEEE/CVF 主辦的電腦視覺頂級會議，與 ICCV、ECCV 並稱 CV 三大會；鄰近還有 NeurIPS、ICLR 等機器學習強會。" },
        { t: "論文的樣子", d: "去 CVF Open Access 隨手翻 5 篇論文——只看標題、摘要、Figure 1 和實驗表格。看不懂完全沒關係，先感受「論文感」。" },
        { t: "投稿流程", d: "每年約 11 月中截稿 → 審稿 → rebuttal（回應審稿意見）→ 次年 6 月開會；接受率約 22–26%。" },
        { t: "方向地圖", d: "分類、偵測、分割、生成、3D、多模態——對照本頁的任務地圖，各看一個代表作品。" },
        { t: "盤點你的資源", d: "算力（Colab / Kaggle / 實驗室）、指導教授或學習社群、每天能投入的時間。誠實盤點，路線才有意義。" }
      ],
      milestones: [
        "翻完 5 篇 CVPR 論文的「殼」（標題 + 圖 + 表）",
        "寫下 2 個你最有感覺的研究方向",
        "在 GitHub 建立自己的學習筆記倉庫"
      ],
      resources: [
        { name: "CVPR 官網", url: "https://cvpr.thecvf.com", note: "看當年會議的主題、日程與重要日期公告" },
        { name: "CVF Open Access", url: "https://openaccess.thecvf.com", note: "歷年 CVPR / ICCV / ECCV 論文全文免費下載" },
        { name: "Hugging Face Daily Papers", url: "https://huggingface.co/papers", note: "社群熱度排序的每日新論文，追前沿的好地方" }
      ],
      quiz: [
        {
          q: "CVPR、ICCV、ECCV 常被合稱為什麼？",
          options: ["CV 三大會", "三大期刊", "三大實驗室", "三大獎項"],
          a: 0,
          explain: "CVPR（每年 6 月開會）、ICCV（奇數年）、ECCV（偶數年）是電腦視覺領域公認的三大頂級會議。"
        },
        {
          q: "CVPR 每年的論文截止時間大約在幾月？",
          options: ["3 月", "7 月", "11 月", "不固定，隨機"],
          a: 2,
          explain: "多年來 CVPR 都在 11 月中截稿、次年 6 月開會（確切日期以官網當年公告為準）。"
        }
      ]
    },
    {
      id: "p1",
      num: "P1",
      short: "數學與程式",
      title: "數學與程式基礎",
      months: 2,
      monthsLabel: "約 2 個月",
      goal: "不用變成數學家，但要看得懂梯度",
      color: "#f59e0b",
      why: "深度學習的每一行程式碼背後都是矩陣運算和梯度下降。這個階段的目標是「夠用且敢動手」，不是把教科書刷完——邊寫程式邊補數學，比先學完數學再寫程式快得多。已有程式基礎的人，這一階段可以壓到 3–4 週。",
      topics: [
        { t: "線性代數", d: "向量與矩陣運算、矩陣乘法的幾何直覺、SVD 與特徵分解。用 3Blue1Brown 建立直覺就夠用。" },
        { t: "微積分", d: "偏導數、鏈式法則、梯度——這三樣就是反向傳播的全部數學基礎。" },
        { t: "機率統計", d: "條件機率、貝氏定理、期望值、高斯分佈、最大概似估計。" },
        { t: "Python", d: "語法熟練、NumPy 向量化思維（少寫 for 迴圈）、Matplotlib 畫圖、Git 基本操作（clone / commit / push / branch）。" }
      ],
      milestones: [
        "用純 NumPy 實作線性迴歸＋梯度下降，畫出 loss 曲線",
        "用 NumPy 實作 k-means，並視覺化聚類過程",
        "在 GitHub 的學習倉庫開始每週 commit"
      ],
      resources: [
        { name: "3Blue1Brown《線性代數的本質》", url: "https://www.3blue1brown.com/topics/linear-algebra", note: "建立幾何直覺的傳奇系列，建議全部看完" },
        { name: "Mathematics for Machine Learning", url: "https://mml-book.github.io", note: "免費電子書，之後需要時當字典查" },
        { name: "《動手學深度學習》預備章節", url: "https://zh.d2l.ai", note: "NumPy、線性代數、機率的中文速成" },
        { name: "NumPy 100 練習", url: "https://github.com/rougier/numpy-100", note: "向量化思維的肌肉訓練" }
      ],
      quiz: [
        {
          q: "深度學習中，「鏈式法則」直接對應哪個核心演算法？",
          options: ["隨機梯度下降", "反向傳播", "主成分分析", "最大概似估計"],
          a: 1,
          explain: "反向傳播（backpropagation）就是把鏈式法則沿著計算圖系統化地反覆套用，把誤差訊號傳回每一層。"
        },
        {
          q: "矩陣乘法 (2×3 矩陣)·(3×4 矩陣) 的結果形狀是？",
          options: ["3×3", "2×4", "2×3", "4×2"],
          a: 1,
          explain: "(m×n)·(n×p) = (m×p)。矩陣形狀對不上是新手最常見的報錯，這題要變成反射動作。"
        }
      ]
    },
    {
      id: "p2",
      num: "P2",
      short: "深度學習",
      title: "深度學習基礎",
      months: 2.5,
      monthsLabel: "約 2.5 個月",
      goal: "用 PyTorch 獨立訓練出你的第一個模型",
      color: "#10b981",
      why: "這是最關鍵的轉折點：從「看懂」到「訓得出」。之後 CVPR 論文 90% 的實驗部分，本質上都是這一章技能的組合與放大。通關標準只有一個：獨立完成「資料 → 訓練 → 評估 → debug」的完整迴圈。",
      topics: [
        { t: "PyTorch 核心", d: "Tensor、autograd、nn.Module、DataLoader、GPU 裝置管理。" },
        { t: "訓練全流程", d: "loss 函數、優化器（SGD / Adam）、learning rate 與 scheduler、early stopping。" },
        { t: "過擬合對策", d: "train / val 切分、資料增強（augmentation）、dropout、weight decay。" },
        { t: "CNN 家族", d: "卷積、池化、BatchNorm、感受野；重點搞懂 ResNet 的殘差連接為什麼有效。" },
        { t: "訓練心法", d: "先 overfit 一個小 batch 驗證程式沒 bug，再談調參；學會看 train / val 曲線診斷問題。" },
        { t: "實驗管理", d: "checkpoint 存檔、固定隨機種子、用 TensorBoard 或 Weights & Biases 記錄。" }
      ],
      milestones: [
        "從零在 CIFAR-10 上訓練 CNN，正確率達 90% 以上",
        "照著架構圖手寫 ResNet-18 並訓練",
        "用預訓練模型微調（finetune）完成一個自己的小專案",
        "能看曲線診斷：lr 太大 / 太小、過擬合、欠擬合"
      ],
      resources: [
        { name: "Stanford CS231n", url: "https://cs231n.stanford.edu", note: "CV 深度學習的黃金標準課程，作業品質極高" },
        { name: "《動手學深度學習》", url: "https://zh.d2l.ai", note: "中文友好，理論與程式碼逐行對應" },
        { name: "PyTorch 官方教程", url: "https://pytorch.org/tutorials/", note: "60 分鐘入門 + 遷移學習實戰教程" },
        { name: "李宏毅機器學習課程", url: "https://speech.ee.ntu.edu.tw/~hylee/index.php", note: "台大課程，中文講解直觀又有趣" }
      ],
      quiz: [
        {
          q: "訓練 loss 一直下降、驗證 loss 先降後升，這是什麼現象？",
          options: ["欠擬合", "過擬合", "learning rate 太小", "資料太少"],
          a: 1,
          explain: "模型開始背誦訓練集而不是學習規律。對策：資料增強、dropout、weight decay、early stopping。"
        },
        {
          q: "ResNet 的殘差連接（skip connection）最主要解決什麼問題？",
          options: ["減少參數量", "深層網路的退化與梯度消失", "加快推理速度", "省顯示卡記憶體"],
          a: 1,
          explain: "有了恆等捷徑，深層網路至少能學成淺層的等價版本，讓上百層的網路訓得起來。"
        },
        {
          q: "「先 overfit 一個小 batch」的目的是什麼？",
          options: ["節省訓練時間", "驗證模型與訓練迴圈沒有 bug", "測試顯卡極限", "讓 loss 歸零好看"],
          a: 1,
          explain: "如果連一個 batch 都無法 overfit（loss 壓不下去），說明程式有 bug——先修好再談正經訓練。"
        }
      ]
    },
    {
      id: "p3",
      num: "P3",
      short: "CV 核心",
      title: "電腦視覺核心",
      months: 2.5,
      monthsLabel: "約 2.5 個月",
      goal: "從分類到生成，建立整個領域的地圖",
      color: "#06b6d4",
      why: "CVPR 的論文幾乎都落在幾個任務家族裡。這個階段不求每個都深挖，而是把地圖建起來：知道每個任務在解什麼問題、代表模型是誰、輸入輸出長什麼樣——之後讀論文才能快速歸位。",
      topics: [
        { t: "偵測與分割", d: "YOLO 系列、DETR（偵測）；Mask R-CNN、SAM（分割）。理解 anchor、IoU、mAP 這些基本語言。" },
        { t: "Transformer 進入視覺", d: "ViT 把影像切成 patch 餵給 Transformer；了解它與 CNN 的取捨。" },
        { t: "視覺-語言", d: "CLIP 用對比學習對齊圖像與文字，讓 zero-shot 分類成為可能——多模態的基石。" },
        { t: "生成模型", d: "從 GAN 的對抗思想到 Diffusion 的去噪思想；跑 Stable Diffusion，理解 latent space 與 CFG。" },
        { t: "3D 視覺", d: "相機模型與投影、多視角幾何入門；NeRF 與 3D Gaussian Splatting 各自在做什麼。" },
        { t: "多模態大模型", d: "VLM（如 LLaVA）如何把視覺 encoder 接上語言模型，實現看圖對話。" }
      ],
      milestones: [
        "跑通偵測或分割 pipeline，把結果畫在圖上肉眼檢查",
        "用 diffusers 跑 Stable Diffusion，改 prompt 觀察變化，搞懂 CFG 是什麼",
        "跑通一個 NeRF 或 3DGS 場景，渲染一段繞環影片",
        "精讀 3 篇奠基論文：ResNet / Attention Is All You Need / DDPM（任選與方向相關的）"
      ],
      resources: [
        { name: "Hugging Face Learn", url: "https://huggingface.co/learn", note: "diffusers / transformers 官方課程" },
        { name: "Lilian Weng 部落格", url: "https://lilianweng.github.io", note: "深度長文，GAN / Diffusion / 自監督一次講透" },
        { name: "DETR 官方倉庫", url: "https://github.com/facebookresearch/detr", note: "邊讀代碼邊學物件偵測" },
        { name: "Segment Anything", url: "https://github.com/facebookresearch/segment-anything", note: "分割基礎模型，體驗零樣本分割" },
        { name: "3D Gaussian Splatting", url: "https://github.com/graphdeco-inria/gaussian-splatting", note: "3D 重建新范式，親手跑一次就懂" }
      ],
      quiz: [
        {
          q: "CLIP 靠什麼機制對齊圖像與文字？",
          options: ["迴歸預測座標", "大規模圖文對上的對比學習", "強化學習", "文法剖析"],
          a: 1,
          explain: "CLIP 用 4 億對圖文，把配對的圖文拉近、不配對的推遠，學出共同的嵌入空間——這才有了 zero-shot 分類。"
        },
        {
          q: "Stable Diffusion 的去噪主要發生在哪個空間？",
          options: ["像素空間", "頻域空間", "潛空間（latent space）", "頻譜圖"],
          a: 2,
          explain: "先用 VAE 把影像壓縮到潛空間，在低維空間做擴散去噪，最後再解碼回影像——這是它能跑在消費級顯卡的關鍵。"
        },
        {
          q: "物件偵測指標 mAP 中的 AP 衡量的是？",
          options: ["精確率-召回率曲線下面積", "平均像素誤差", "推理速度", "模型參數量"],
          a: 0,
          explain: "AP 是單一類別的 PR 曲線下面積，mAP 是對所有類別取平均——兼顧「找得準」與「找得全」。"
        }
      ]
    },
    {
      id: "p4",
      num: "P4",
      short: "讀論文與復現",
      title: "讀論文與復現",
      months: 1.5,
      monthsLabel: "約 1.5 個月（並從此終身保持）",
      goal: "從「會訓練」到「會科研」的橋樑",
      color: "#6366f1",
      why: "讀論文是研究者的呼吸。這個階段要把讀論文從「痛苦」變成「日常」，並用一次完整復現打通「論文 → 程式碼 → 數字」的任督二脈——這正是大多數自學者與科班生拉開差距的地方。",
      topics: [
        { t: "三遍讀論文法", d: "第一遍 10 分鐘（標題、摘要、圖表，決定值不值得讀）→ 第二遍 1 小時通讀 → 第三遍以「假設自己重做」的標準摳細節。" },
        { t: "論文筆記系統", d: "Zotero 管理文獻；每篇記下四件事：問題、方法、關鍵實驗、局限。" },
        { t: "追蹤前沿", d: "arXiv cs.CV 每天掃標題、Hugging Face Daily Papers、X/Twitter 學術圈、方向內的 workshop。" },
        { t: "復現的方法論", d: "先跑官方程式碼出主表 → 換資料集與超參數 → 數字對不上時依序排查：config、資料預處理、隨機種子、框架版本。" },
        { t: "找到自己的 niche", d: "讀夠 30 篇後，畫出方向的方法分類樹——樹上的空格，就是你的機會。" }
      ],
      milestones: [
        "精讀累計 30 篇以上，全部有四欄式筆記",
        "完整復現一篇近兩年論文的主表，寫一份復現報告（含踩坑過程）",
        "為自己的方向寫一份 mini-survey（分類樹＋每類優缺點）"
      ],
      resources: [
        { name: "How to Read a Paper（Keshav）", url: "http://ccr.sigcomm.org/online/files/p83-keshavA.pdf", note: "三遍讀法原始出處，10 分鐘讀完受用終身" },
        { name: "Zotero", url: "https://www.zotero.org", note: "免費文獻管理，瀏覽器外掛一鍵收藏" },
        { name: "arXiv cs.CV", url: "https://arxiv.org/list/cs.CV/recent", note: "每天掃一眼標題，保持對領域的嗅覺" },
        { name: "Hugging Face Daily Papers", url: "https://huggingface.co/papers", note: "熱度排序，適合每天挑 1 篇精讀" }
      ],
      quiz: [
        {
          q: "三遍讀論文法的第一遍，重點看什麼、花多久？",
          options: ["逐行讀公式，約 1 小時", "標題／摘要／圖表，約 10 分鐘", "只跑程式碼", "只讀參考文獻"],
          a: 1,
          explain: "第一遍的目的是「分類與篩選」：判斷這篇論文值不值得進入第二、三遍，而不是讀懂它。"
        },
        {
          q: "復現時數字對不上，合理的排查順序是？",
          options: [
            "直接放棄，換一篇論文",
            "先核對官方 config 與資料預處理，再查隨機種子與框架版本",
            "立刻在社群發文求救",
            "把隨機種子改成 42 就好"
          ],
          a: 1,
          explain: "絕大多數復現問題出在 config 與資料預處理不一致，其次才是隨機性與版本差異——排查順序本身就是一門學問。"
        }
      ]
    },
    {
      id: "p5",
      num: "P5",
      short: "研究問題",
      title: "找到研究問題，做第一次實驗",
      months: 1.5,
      monthsLabel: "約 1.5 個月",
      goal: "好問題比好方法更稀缺",
      color: "#ec4899",
      why: "CVPR 論文的核心是一個「值得解決的問題」。問題從哪裡來？從局限性來、從失敗案例來、從任務的交叉組合來。這個階段要完成的不是「想出絕世好點子」，而是建立一套產生並篩選想法的流程。",
      topics: [
        { t: "挖局限", d: "每讀一篇就寫下 limitation；把失敗案例視覺化——「模型在什麼情況下壞掉」就是你的題目。" },
        { t: "想法模式", d: "加模組／改結構、換場景（低光、影片、3D）、提效率（更快更省）、任務組合（偵測＋生成）。第一篇工作適合小切口。" },
        { t: "實驗設計素養", d: "公平的 baseline、消融實驗（ablation）證明每個組件有用、多 seed 報均值、用社群公認的指標。" },
        { t: "找人", d: "指導教授、實驗室、線上社群（Discord、知乎、Reddit 的 ML 社群）。研究不是孤膽英雄遊戲。" },
        { t: "一頁 proposal", d: "動機 → 現有方法的洞 → 我的方法 → 驗證計畫 → 風險備案。一頁寫不清楚，說明還沒想清楚。" }
      ],
      milestones: [
        "列出 10 個候選題，按「新穎性 × 可行性」打分，選定 1 個",
        "搭好可複用的實驗框架（資料／訓練／評估／logging 一鍵運行）",
        "拿到第一個 baseline 數字（負結果也算里程碑）"
      ],
      resources: [
        { name: "OpenReview", url: "https://openreview.net", note: "看真實審稿意見，學審稿人怎麼挑剔——反過來指導你選題" },
        { name: "CVF Open Access（Supplementary）", url: "https://openaccess.thecvf.com", note: "看別人的補充材料，學習如何完整包裝一個工作" },
        { name: "arXiv 各方向 survey", url: "https://arxiv.org", note: "搜「你的方向 + survey」，快速找到方法分類樹" }
      ],
      quiz: [
        {
          q: "消融實驗（ablation study）的目的是什麼？",
          options: ["讓表格看起來更滿", "逐個移除組件，驗證每個設計的貢獻", "刪掉不重要的程式碼", "測試硬體穩定性"],
          a: 1,
          explain: "審稿人最愛問「你的提升到底是哪個組件帶來的？」消融實驗就是逐項拆開證明，缺一項都會掉點。"
        },
        {
          q: "什麼樣的題目適合第一篇工作？",
          options: [
            "顛覆整個領域的宏大敘事",
            "切口小、資料與算力可負擔、有清晰 baseline 的增量創新",
            "純理論推導，不需要實驗",
            "別人做什麼就跟著做什麼"
          ],
          a: 1,
          explain: "第一篇的目標是「完整走通科研流程」並建立信心。小而完整 > 大而空洞，這也是大多數人真實的第一篇長什麼樣。"
        }
      ]
    },
    {
      id: "p6",
      num: "P6",
      short: "成果與寫作",
      title: "做出成果，寫成論文",
      months: 2.5,
      monthsLabel: "約 2.5 個月",
      goal: "把研究變成審稿人看得懂的故事",
      color: "#8b5cf6",
      why: "同樣的實驗，寫作好壞可以差出兩個檔次的命運。寫作不是最後一步而是並行步驟：Figure 1 先行、主表先行——它們會反過來告訴你還缺什麼實驗。邊做邊寫的人，投稿季從不熬夜趕工。",
      topics: [
        { t: "論文解剖", d: "Abstract 一句話賣點；Intro 用 1.5 頁講清「為什麼」；Method 配 Figure 1；Experiments 主表＋消融＋視覺化。" },
        { t: "Figure 1 定生死", d: "審稿人第一眼看的就是方法總覽圖——它必須能不讀正文就看懂你的做法。" },
        { t: "圖表規範", d: "matplotlib / seaborn 出乾淨的曲線與柱狀圖；表格只放關鍵數字、最優加粗；座標軸與圖例永遠標清楚。" },
        { t: "CVPR 規範", d: "8 頁正文＋參考文獻不限、雙盲匿名要求、使用官方 LaTeX 模板並跑官方格式檢查。" },
        { t: "寫作迭代", d: "先寫爛初稿再改；英文不是障礙，結構清晰比辭藻華麗重要一百倍；找同伴或用工具潤色。" }
      ],
      milestones: [
        "畫出 Figure 1，並讓同學只看圖複述你的方法",
        "主實驗表＋消融表齊全，每個 claim 都有對應實驗支撐",
        "完成全文初稿 v1（哪怕文法很差）",
        "給指導教授／同伴審閱 2 輪以上，整理意見清單逐條解決"
      ],
      resources: [
        { name: "CVPR 官方作者指南", url: "https://cvpr.thecvf.com", note: "當年的模板、政策與格式檢查入口（每年更新）" },
        { name: "Overleaf", url: "https://www.overleaf.com", note: "線上 LaTeX 協作，零配置開始寫" },
        { name: "CVF Open Access", url: "https://openaccess.thecvf.com", note: "挑 3 篇你最喜歡的論文，當寫作範本逐段模仿" }
      ],
      quiz: [
        {
          q: "CVPR 正文的頁數上限（不含參考文獻）是？",
          options: ["6 頁", "8 頁", "10 頁", "12 頁"],
          a: 1,
          explain: "8 頁正文＋參考文獻不限頁數。頁數寸土寸金，每一頁都要為「說服審稿人」服務。"
        },
        {
          q: "Figure 1（方法總覽圖）最重要的作用是？",
          options: ["讓論文看起來精美", "讓審稿人 1 分鐘內看懂方法全貌", "塞滿 8 頁的頁數", "展示實驗數據"],
          a: 1,
          explain: "審稿人時間極少，Figure 1 是你的 60 秒電梯簡報——看不懂 Figure 1 的方法，方法再好也吃虧。"
        }
      ]
    },
    {
      id: "p7",
      num: "P7",
      short: "投稿與之後",
      title: "打磨、投稿與 Rebuttal",
      months: 1.5,
      monthsLabel: "約 1.5 個月",
      goal: "臨門一腳，以及被拒之後",
      color: "#ef4444",
      why: "投稿不是終點而是流程：打磨 → 提交 → 等審稿 → rebuttal → 接收或被拒。心理建設先行：頂會論文大多有被拒歷史。被拒不等於工作沒價值——審稿意見本身，就是免費的頂級指導。",
      topics: [
        { t: "投稿前檢查", d: "官方格式檢查跑一遍、補充材料（demo 影片、更多實驗）、程式碼整理、貢獻聲明與倫理聲明。" },
        { t: "提交策略", d: "OpenReview 帳號提前註冊；提前 2–3 天提交——deadline 前系統必定擁堵，網路和帳號問題沒有容錯。" },
        { t: "Rebuttal", d: "逐條回應、感謝＋澄清＋補實驗、禮貌而堅定；時間窗只有幾天，提前演練常見質疑。" },
        { t: "被拒之後", d: "先消化情緒 48 小時，再根據意見升級工作 → 轉投 ECCV / ICCV / NeurIPS 等；六個月後又是一條好漢。" },
        { t: "接收之後", d: "camera-ready 修改、準備海報與口頭報告、程式碼正式開源——然後，開始下一個題目。" }
      ],
      milestones: [
        "完成補充材料與 demo 影片",
        "程式碼清理並寫好 README（審稿期匿名倉庫，接收後轉正式）",
        "提前 48 小時完成提交",
        "（若被拒）完成 rebuttal 復盤，鎖定下一個目標會議"
      ],
      resources: [
        { name: "OpenReview", url: "https://openreview.net", note: "提交與 rebuttal 平台（以當年公告為準）" },
        { name: "CVPR 官網", url: "https://cvpr.thecvf.com", note: "重要日期、政策與 camera-ready 指南" },
        { name: "CVF Open Access", url: "https://openaccess.thecvf.com", note: "被拒後對標同年接收論文，找差距" }
      ],
      quiz: [
        {
          q: "為什麼要提前幾天提交論文？",
          options: ["顯得有效率", "deadline 前系統擁堵，帳號／網路問題沒有容錯", "早交錄取率更高", "沒有特別原因"],
          a: 1,
          explain: "每年 deadline 前幾小時系統必塞車。因為提交失敗錯過一年，是投稿季最痛的悲劇——提前 48 小時是底線。"
        },
        {
          q: "Rebuttal 的正確姿勢是？",
          options: [
            "逐條爭辯，語氣強硬",
            "只挑好回應的意見回",
            "逐條回應，優先用補充實驗解決可以「用數據說話」的質疑",
            "直接放棄，等下一個會議"
          ],
          a: 2,
          explain: "rebuttal 的黃金法則：能補實驗就補實驗，能澄清就澄清，永遠禮貌。審稿人也在看你如何回應批評。"
        }
      ]
    }
  ]
};

/* CVPR 任務地圖 */
const TASK_MAP = [
  { icon: "🏷️", name: "影像分類", desc: "這張照片裡是貓還是狗？最基礎也最經典的任務。", example: "ResNet、ViT" },
  { icon: "🎯", name: "物件偵測", desc: "不只要認出是什麼，還要框出「在哪裡」。", example: "YOLO、DETR" },
  { icon: "✂️", name: "分割", desc: "把每個像素歸類，沿著輪廓把物體「摳」出來。", example: "SAM、Mask2Former" },
  { icon: "🎨", name: "生成模型", desc: "從一段文字或草圖，憑空生成／編輯影像。", example: "Stable Diffusion、GAN" },
  { icon: "🧊", name: "3D 視覺", desc: "從多張照片重建三維世界，或反過來渲染新視角。", example: "NeRF、3D Gaussian Splatting" },
  { icon: "🎬", name: "影片理解", desc: "看懂動作、事件與時間軸上的因果。", example: "VideoMAE、時序模型" },
  { icon: "💬", name: "多模態", desc: "看圖說話、看圖答題、按描述找圖——連接視覺與語言。", example: "CLIP、LLaVA" },
  { icon: "🚗", name: "落地應用", desc: "把以上全部裝上車、裝進機器人、搬進手機。", example: "自動駕駛、具身智能" }
];

/* 算力指南 */
const COMPUTE = [
  { icon: "🆓", name: "免費起步", desc: "Google Colab、Kaggle Notebooks 提供免費 GPU，學習階段（P0–P3）完全夠用。" },
  { icon: "💰", name: "輕量租用", desc: "AutoDL、RunPod、Lambda 等按小時租卡，幾塊錢跑一次實驗——復現與小實驗階段的最佳選擇。" },
  { icon: "🏛️", name: "實驗室資源", desc: "CVPR 級別的實驗常需要多卡長時間訓練——這是認真考慮加入實驗室／找指導教授的現實理由之一。" },
  { icon: "⚡", name: "省算力心法", desc: "先在小資料集、小解析度上驗證想法，最後才放大跑；開 mixed precision；不用時及時釋放。" }
];

/* 常見陷阱 */
const PITFALLS = [
  { icon: "📺", name: "只刷課，不做專案", desc: "課程完成度 ≠ 能力。每個階段用里程碑專案檢驗自己，做到才算過關。" },
  { icon: "🙅", name: "完美主義啟動失敗", desc: "等「數學學完」再開始的人永遠開始不了。夠用就上，回頭再補。" },
  { icon: "🔖", name: "收藏等於學會", desc: "收藏 100 篇論文不如精讀 10 篇。筆記要產出觀點，不是建倉庫。" },
  { icon: "🧭", name: "追熱點流浪", desc: "今天 diffusion、明天 VLM、後天 3D。先在一個方向扎根 6 個月，再談橫向擴張。" },
  { icon: "🏝️", name: "閉門造車", desc: "沒有導師／同伴的反饋，你會用錯誤的方式努力兩年。研究是社交活動。" },
  { icon: "✍️", name: "忽視寫作", desc: "實驗做完才第一次打開 LaTeX 模板，是每個投稿季最常見的悲劇。邊做邊寫。" },
  { icon: "🏔️", name: "第一步就要登頂", desc: "第一篇的目標是「完整走通科研」，workshop 和小會都是合法的階梯。" }
];

/* 常見問題 */
const FAQ = [
  { q: "我非科班出身、數學不好，有可能嗎？", a: "有。CVPR 論文作者背景極其多元。數學「夠用」就行（見 P1），真正稀缺的是研究品味與執行力——這兩樣都能練。" },
  { q: "英文不好怎麼辦？", a: "讀：每天讀 1 篇論文摘要，詞彙量很快就夠；寫：先寫清楚再求優雅，結構清晰比華麗重要。審稿人要的是 clear，不是 fancy。" },
  { q: "沒有指導教授可以嗎？", a: "更難，但可行：以「復現＋增量改進」切入（P4–P5 的路徑正是為此設計），活躍於開源社群、主動郵件聯繫學校老師。有條件的話，強烈建議想辦法進實驗室。" },
  { q: "每週要投入多少時間？", a: "兼職節奏每週 10–15 小時、走 20–24 個月到 CVPR 2029；全職節奏約 14 個月對齊 CVPR 2028。持續比強度重要——每天 2 小時勝過週末爆肝 12 小時。" },
  { q: "一篇 CVPR 論文長什麼樣？", a: "8 頁正文＋不限頁參考文獻＋補充材料。結構固定：摘要、引言、相關工作、方法（配 Figure 1）、實驗（主表＋消融＋視覺化）、結論。去 CVF Open Access 打開任意一篇對照看。" },
  { q: "要花錢嗎？", a: "前 9 個月幾乎不用：課程全免費、免費 GPU 夠用、論文全公開。真正花錢的是後期的實驗算力與（可選的）會議註冊費。" }
];
