const screens = document.querySelectorAll(".screen");

function showScreen(id) {
  screens.forEach(s => s.classList.toggle("active", s.id === id));
  closeWardrobe();
  closeChat();
}

document.querySelectorAll("[data-target]").forEach(btn => {
  btn.addEventListener("click", () => showScreen(btn.dataset.target));
});

const wardrobeModal = document.getElementById("wardrobeModal");
const wardrobeDim = document.getElementById("wardrobeDim");

function showOnlyHome() {
  screens.forEach(s => s.classList.toggle("active", s.id === "home-screen"));
}

function openWardrobe() {
  showOnlyHome();
  wardrobeModal.classList.remove("hidden");
  wardrobeDim.classList.remove("hidden");
}

function closeWardrobe() {
  wardrobeModal.classList.add("hidden");
  wardrobeDim.classList.add("hidden");
}

["wardrobeOpen", "wardrobeOpen2", "wardrobeOpen3"].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("click", openWardrobe);
});

document.getElementById("wardrobeClose").addEventListener("click", closeWardrobe);

wardrobeDim.addEventListener("click", () => {
  closeWardrobe();
  closeChat();
});

const items = [
  ["Black T-shirt", "black-tshirt.jpg", "top"],
  ["Coral Knit", "coral-knit.jpg", "top"],
  ["White Blouse", "white-blouse.jpg", "top"],
  ["White Hoodie", "white-hoodie.jpg", "top"],
  ["Blue Jeans", "blue-jeans.jpg", "bottom"],
  ["Blue Shirt", "blue-shirt.jpg", "outer"],
  ["Denim Shorts", "denim-shorts.jpg", "shoes"],
  ["Cargo Pants", "cargo-pants.jpg", "bottom"]
];

const grid = document.getElementById("wardrobeGrid");

function render(filter = "all") {
  grid.innerHTML = "";
  items
    .filter(i => filter === "all" || i[2] === filter)
    .slice(0, 4)
    .forEach(i => {
      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML = `<img src="assets/${i[1]}" alt="${i[0]}"><p>${i[0]}</p>`;
      grid.appendChild(div);
    });
}

render("all");

document.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    render(chip.dataset.filter);
  });
});

const chatModal = document.getElementById("chatModal");

function openChat() {
  showOnlyHome();
  chatModal.classList.remove("hidden");
  wardrobeDim.classList.remove("hidden");
}

function closeChat() {
  chatModal.classList.add("hidden");
}

["chatOpen", "chatOpen2", "chatOpen3"].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("click", openChat);
});

const chatWindow = document.getElementById("chatWindow");
const chatInput = document.getElementById("chatInput");

function addMsg(text, type) {
  const m = document.createElement("div");
  m.className = `message ${type}`;
  m.textContent = text;
  chatWindow.appendChild(m);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function answer(q) {
  q = q.toLowerCase();

  if (q.includes("date")) {
    return "Try your white blouse, light denim, and white sneakers. Clean but relaxed.";
  }

  if (q.includes("buy") || q.includes("jacket")) {
    return "I would not buy another black jacket. You already own similar outerwear.";
  }

  if (q.includes("pack")) {
    return "For a trip, pack neutral layers, white sneakers, and one versatile outerwear item.";
  }

  return "Based on your wardrobe, focus on versatile summer outerwear and avoid duplicate dark pieces.";
}

document.getElementById("sendChat").addEventListener("click", () => {
  const text = chatInput.value.trim();
  if (!text) return;

  addMsg(text, "user");
  chatInput.value = "";

  setTimeout(() => addMsg(answer(text), "ai"), 350);
});

chatInput.addEventListener("keydown", e => {
  if (e.key === "Enter") document.getElementById("sendChat").click();
});

document.getElementById("uploadInput").addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;

  const r = new FileReader();
  r.onload = () => {
    document.getElementById("uploadPreview").src = r.result;
    document.getElementById("uploadPreviewBox").classList.remove("hidden");
  };
  r.readAsDataURL(file);
});

document.getElementById("detailsBtn").addEventListener("click", openWardrobe);

/* Working outfit carousel */
const outfits = [
  {
    title: "Clean & Minimal",
    badge: "Best Match",
    description: "Looks great for your schedule and the weather today.",
    image: "assets/outfit-clean-minimal.jpg"
  },
  {
    title: "Casual Everyday",
    badge: "Most Worn",
    description: "Based on your wardrobe history, this is one of your most successful combinations.",
    image: "assets/outfit-casual.jpg"
  },
  {
    title: "Smart Casual",
    badge: "Try New",
    description: "A slightly more refined look that still fits your current wardrobe.",
    image: "assets/outfit-smart.jpg"
  },
  {
    title: "Wardrobe Gap",
    badge: "AI Insight",
    description: "You are missing versatile summer outerwear. Consider adding one lightweight jacket.",
    image: "assets/outfit-gap.jpg"
  }
];

let currentOutfit = 0;

function updateOutfit(index) {
  currentOutfit = index;

  const outfit = outfits[index];

  const badge = document.querySelector(".card-title button");
  const img = document.querySelector(".outfit-img img");
  const title = document.querySelector(".outfit-text h3");
  const desc = document.querySelector(".outfit-text p");
  const dots = document.querySelectorAll(".dots span");

  if (badge) badge.textContent = outfit.badge;
  if (img) img.src = outfit.image;
  if (title) title.textContent = outfit.title;
  if (desc) desc.textContent = outfit.description;

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

document.querySelectorAll(".dots span").forEach((dot, index) => {
  dot.style.cursor = "pointer";
  dot.addEventListener("click", () => updateOutfit(index));
});

let startX = 0;
const outfitCard = document.querySelector(".outfit-card");

if (outfitCard) {
  outfitCard.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  outfitCard.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        updateOutfit((currentOutfit + 1) % outfits.length);
      } else {
        updateOutfit((currentOutfit - 1 + outfits.length) % outfits.length);
      }
    }
  });
}

updateOutfit(0);
