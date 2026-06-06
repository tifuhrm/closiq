const tabs = document.querySelectorAll(".tab");
const screens = document.querySelectorAll(".screen");

const closetItems = [
  { name: "Black bomber jacket", category: "outerwear", tag: "Duplicate risk", style: "dark" },
  { name: "Navy knit", category: "tops", tag: "Highly versatile", style: "sky" },
  { name: "Straight black pants", category: "pants", tag: "Most worn", style: "dark" },
  { name: "White sneakers", category: "shoes", tag: "Good match", style: "cream" },
  { name: "Blue shirt", category: "tops", tag: "Good for layering", style: "sky" },
  { name: "Linen overshirt", category: "outerwear", tag: "Wardrobe gap", style: "mint" },
  { name: "Wide denim", category: "pants", tag: "Casual", style: "gray" },
  { name: "Leather shoes", category: "shoes", tag: "Formal", style: "cream" }
];

const wishlist = [];

function switchTab(id) {
  tabs.forEach(tab => tab.classList.toggle("active", tab.dataset.tab === id));
  screens.forEach(screen => screen.classList.toggle("active", screen.id === id));
  document.querySelector("#app").scrollIntoView({ behavior: "smooth", block: "start" });
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => switchTab(tab.dataset.tab));
});

document.getElementById("quickUpload").addEventListener("click", () => switchTab("upload"));

function renderCloset(filter = "all") {
  const grid = document.getElementById("closetGrid");
  grid.innerHTML = "";

  const items = filter === "all" ? closetItems : closetItems.filter(item => item.category === filter);

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = `closet-item ${item.style}`;
    card.innerHTML = `<strong>${item.name}</strong><span>${item.category} · ${item.tag}</span>`;
    grid.appendChild(card);
  });

  document.getElementById("itemCount").textContent = closetItems.length;
}

renderCloset();

document.getElementById("closetFilter").addEventListener("change", e => renderCloset(e.target.value));

const dropZone = document.getElementById("dropZone");
const fileInput = document.getElementById("fileInput");
const uploadResult = document.getElementById("uploadResult");
const previewImage = document.getElementById("previewImage");
const progressBar = document.getElementById("progressBar");
const analysisTitle = document.getElementById("analysisTitle");
const analysisList = document.getElementById("analysisList");
const addToCloset = document.getElementById("addToCloset");

dropZone.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    previewImage.src = reader.result;
    uploadResult.classList.remove("hidden");
    analysisTitle.textContent = "Analyzing image...";
    analysisList.innerHTML = "";
    addToCloset.disabled = true;
    progressBar.style.width = "0%";

    setTimeout(() => progressBar.style.width = "38%", 150);
    setTimeout(() => progressBar.style.width = "72%", 650);
    setTimeout(() => {
      progressBar.style.width = "100%";
      analysisTitle.textContent = "Detected item: Cream oversized shirt";
      analysisList.innerHTML = `
        <li>Category: Tops</li>
        <li>Color: Cream</li>
        <li>Style: Minimal casual</li>
        <li>Season: Spring / Summer</li>
        <li>AI tag: Good for layering</li>
      `;
      addToCloset.disabled = false;
    }, 1200);
  };
  reader.readAsDataURL(file);
});

addToCloset.addEventListener("click", () => {
  closetItems.push({ name: "Cream oversized shirt", category: "tops", tag: "Good for layering", style: "cream" });
  renderCloset();
  switchTab("closet");
});

const analyzeBtn = document.getElementById("analyzeBtn");
const productInput = document.getElementById("productInput");
const verdictText = document.getElementById("verdictText");
const matchScore = document.getElementById("matchScore");
const dupScore = document.getElementById("dupScore");
const compScore = document.getElementById("compScore");
const gapScore = document.getElementById("gapScore");
const wearScore = document.getElementById("wearScore");
const verdictReason = document.getElementById("verdictReason");
const saveWishlist = document.getElementById("saveWishlist");

let currentVerdict = null;

function setScoreCircle(score) {
  matchScore.style.background = `radial-gradient(circle at center, white 53%, transparent 54%), conic-gradient(${score >= 70 ? "var(--mint)" : score >= 50 ? "var(--blue)" : "var(--danger)"} ${score}%, #e8eef4 0)`;
}

analyzeBtn.addEventListener("click", () => {
  const input = productInput.value.trim().toLowerCase();
  if (!input) {
    verdictText.textContent = "Enter a product first";
    verdictReason.textContent = "Paste a product link or describe an item to analyze it.";
    return;
  }

  let score = 74;
  let verdict = "Buy";
  let reason = "This item adds useful outfit combinations and fills a clear wardrobe gap.";
  let dup = "Low";
  let comp = "Good";
  let gap = "High";
  let wear = "Strong";

  if (input.includes("black") || input.includes("jacket") || input.includes("coat")) {
    score = 42;
    verdict = "Don’t buy";
    reason = "You already own similar outerwear. Compatibility is limited and duplication risk is high.";
    dup = "High";
    comp = "Low";
    gap = "Low";
    wear = "Weak";
  } else if (input.includes("sneaker") || input.includes("white")) {
    score = 87;
    verdict = "Buy";
    reason = "This item works with many existing outfits and has strong cost-per-wear potential.";
    dup = "Medium";
    comp = "High";
    gap = "Medium";
    wear = "Strong";
  } else if (input.includes("linen") || input.includes("summer")) {
    score = 91;
    verdict = "Buy";
    reason = "This fills the summer outerwear gap and increases wardrobe versatility.";
    dup = "Low";
    comp = "High";
    gap = "High";
    wear = "Strong";
  }

  verdictText.textContent = verdict;
  matchScore.textContent = `${score}%`;
  setScoreCircle(score);
  dupScore.textContent = dup;
  compScore.textContent = comp;
  gapScore.textContent = gap;
  wearScore.textContent = wear;
  verdictReason.textContent = reason;
  saveWishlist.classList.remove("hidden");

  currentVerdict = { product: productInput.value.trim(), verdict, score, reason };
});

saveWishlist.addEventListener("click", () => {
  if (!currentVerdict) return;
  wishlist.push(currentVerdict);
  renderWishlist();
  switchTab("wishlist");
});

function renderWishlist() {
  const container = document.getElementById("wishlistItems");
  if (wishlist.length === 0) {
    container.innerHTML = '<p class="muted">No saved items yet. Analyze a product and save it to wishlist.</p>';
    return;
  }

  container.innerHTML = "";
  wishlist.forEach(item => {
    const card = document.createElement("div");
    card.className = "wishlist-card";
    card.innerHTML = `
      <div>
        <strong>${item.product}</strong>
        <p>${item.reason}</p>
      </div>
      <span>${item.verdict} · ${item.score}%</span>
    `;
    container.appendChild(card);
  });
}

const chatWindow = document.getElementById("chatWindow");
const chatInput = document.getElementById("chatInput");
const sendChat = document.getElementById("sendChat");

function addMessage(text, type) {
  const msg = document.createElement("div");
  msg.className = `chat-message ${type}`;
  msg.textContent = text;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function generateReply(text) {
  const q = text.toLowerCase();

  if (q.includes("date")) {
    return "For a first date, I recommend your navy knit, straight black pants, and white sneakers. It feels clean, relaxed, and intentional without looking too formal.";
  }

  if (q.includes("black") || q.includes("similar")) {
    return "You already own a black bomber jacket and another dark outerwear piece, so I would avoid buying another black jacket unless the fit is very different.";
  }

  if (q.includes("gap")) {
    return "Your biggest wardrobe gap is light summer outerwear. A linen overshirt would create more combinations than another dark jacket.";
  }

  if (q.includes("trend") || q.includes("korea")) {
    return "For Korea, minimal casual styling, clean sneakers, relaxed denim, and light layering pieces are strong choices. I would focus on versatile basics instead of statement pieces.";
  }

  return "Based on your wardrobe, I would prioritize versatile items that fill gaps rather than items similar to what you already own.";
}

function handleChat() {
  const text = chatInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  chatInput.value = "";

  setTimeout(() => addMessage(generateReply(text), "ai"), 450);
}

sendChat.addEventListener("click", handleChat);
chatInput.addEventListener("keydown", e => {
  if (e.key === "Enter") handleChat();
});

document.querySelectorAll(".quick-prompts button").forEach(btn => {
  btn.addEventListener("click", () => {
    chatInput.value = btn.dataset.prompt;
    handleChat();
  });
});
