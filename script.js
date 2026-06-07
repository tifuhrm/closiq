const screens=document.querySelectorAll(".screen");
function showScreen(id){screens.forEach(s=>s.classList.toggle("active",s.id===id));closeWardrobe();closeChat();closeOutfitDetails();closeItemDetails();}
document.querySelectorAll("[data-target]").forEach(btn=>btn.addEventListener("click",()=>showScreen(btn.dataset.target)));
const wardrobeModal=document.getElementById("wardrobeModal"), wardrobeDim=document.getElementById("wardrobeDim");
function showOnlyHome(){screens.forEach(s=>s.classList.toggle("active",s.id==="home-screen"));}
function openWardrobe(){showOnlyHome();wardrobeModal.classList.remove("hidden");wardrobeDim.classList.remove("hidden");}
function closeWardrobe(){wardrobeModal.classList.add("hidden");}
["wardrobeOpen","wardrobeOpen2","wardrobeOpen3"].forEach(id=>{const el=document.getElementById(id);if(el)el.addEventListener("click",openWardrobe);});
document.getElementById("wardrobeClose").addEventListener("click",()=>{closeWardrobe();wardrobeDim.classList.add("hidden");});
wardrobeDim.addEventListener("click",()=>{closeWardrobe();closeChat();closeOutfitDetails();closeItemDetails();wardrobeDim.classList.add("hidden");});

const items=[
  {name:"Black T-shirt",img:"black-tshirt.jpg",cat:"top",color:"Black",freq:"High",score:"92%",tags:["Frequently worn","Highly versatile","Good base item"],insight:"This is one of your most useful wardrobe items. It matches casual denim, outerwear, and sneakers very well.",pairs:["Blue Jeans","White Sneakers","Blue Shirt"]},
  {name:"Coral Knit",img:"coral-knit.jpg",cat:"top",color:"Coral",freq:"Medium",score:"71%",tags:["Soft color","Seasonal item","Style accent"],insight:"This item adds color variety but works with fewer combinations than your neutral pieces.",pairs:["Light Denim","White Sneakers","White Blouse"]},
  {name:"White Blouse",img:"white-blouse.jpg",cat:"top",color:"White",freq:"Medium",score:"86%",tags:["Good for layering","Smart casual","Date outfit"],insight:"This is a strong smart-casual piece and works well for dates, presentations, and warmer weather.",pairs:["Blue Jeans","Coral Knit","White Sneakers"]},
  {name:"White Hoodie",img:"white-hoodie.jpg",cat:"top",color:"White",freq:"Low",score:"68%",tags:["Casual","Comfort item","Underused"],insight:"This item is comfortable but currently underused. It works best with denim and simple sneakers.",pairs:["Blue Jeans","Cargo Pants","White Sneakers"]},
  {name:"Blue Jeans",img:"blue-jeans.jpg",cat:"bottom",color:"Light blue",freq:"High",score:"89%",tags:["Most worn","Versatile","Daily essential"],insight:"These jeans are one of your strongest base items and create many outfit combinations.",pairs:["Black T-shirt","White Blouse","Blue Shirt"]},
  {name:"Blue Shirt",img:"blue-shirt.jpg",cat:"outer",color:"Blue",freq:"Medium",score:"84%",tags:["Light outerwear","Layering piece","Wardrobe gap fit"],insight:"This item fills the summer outerwear gap and increases your outfit variety.",pairs:["Black T-shirt","White Shirt","Cargo Pants"]},
  {name:"Denim Shorts",img:"denim-shorts.jpg",cat:"shoes",color:"Light blue",freq:"Low",score:"64%",tags:["Summer item","Seasonal","Low usage"],insight:"This item is useful in summer but less relevant for regular university days.",pairs:["White Shirt","White Sneakers","Blue Shirt"]},
  {name:"Cargo Pants",img:"cargo-pants.jpg",cat:"bottom",color:"Beige",freq:"Medium",score:"79%",tags:["Streetwear","Trend match","Casual"],insight:"This item expands your casual style and pairs well with simple tops.",pairs:["Black T-shirt","White Hoodie","Blue Shirt"]}
];

const grid=document.getElementById("wardrobeGrid");

function render(filter="all"){
  grid.innerHTML="";
  items.filter(i=>filter==="all"||i.cat===filter).slice(0,4).forEach((i,index)=>{
    const div=document.createElement("div");
    div.className="item clickable-item";
    div.innerHTML=`<img src="assets/${i.img}" alt="${i.name}"><p>${i.name}</p>`;
    div.addEventListener("click",()=>openItemDetails(i));
    grid.appendChild(div);
  });
}
render("all");

document.querySelectorAll(".chip").forEach(chip=>chip.addEventListener("click",()=>{
  document.querySelectorAll(".chip").forEach(c=>c.classList.remove("active"));
  chip.classList.add("active");
  render(chip.dataset.filter);
}));

const chatModal=document.getElementById("chatModal");
function openChat(){showOnlyHome();chatModal.classList.remove("hidden");wardrobeDim.classList.remove("hidden");}
function closeChat(){chatModal.classList.add("hidden");}
["chatOpen","chatOpen2","chatOpen3"].forEach(id=>{const el=document.getElementById(id);if(el)el.addEventListener("click",openChat);});
const chatWindow=document.getElementById("chatWindow"), chatInput=document.getElementById("chatInput");
function addMsg(text,type){const m=document.createElement("div");m.className=`message ${type}`;m.textContent=text;chatWindow.appendChild(m);chatWindow.scrollTop=chatWindow.scrollHeight;}
function answer(q){q=q.toLowerCase();if(q.includes("date"))return"Try your white blouse, light denim, and white sneakers. Clean but relaxed.";if(q.includes("buy")||q.includes("jacket"))return"I would not buy another black jacket. You already own similar outerwear.";if(q.includes("pack"))return"For a trip, pack neutral layers, white sneakers, and one versatile outerwear item.";return"Based on your wardrobe, focus on versatile summer outerwear and avoid duplicate dark pieces.";}
document.getElementById("sendChat").addEventListener("click",()=>{const text=chatInput.value.trim();if(!text)return;addMsg(text,"user");chatInput.value="";setTimeout(()=>addMsg(answer(text),"ai"),350);});
chatInput.addEventListener("keydown",e=>{if(e.key==="Enter")document.getElementById("sendChat").click();});
document.getElementById("uploadInput").addEventListener("change",e=>{const file=e.target.files[0];if(!file)return;const r=new FileReader();r.onload=()=>{document.getElementById("uploadPreview").src=r.result;document.getElementById("uploadPreviewBox").classList.remove("hidden");};r.readAsDataURL(file);});

/* Working outfit carousel with real details */
const outfits=[
  {title:"Clean & Minimal",badge:"Best Match",description:"Looks great for your schedule and the weather today.",image:"assets/outfit-clean-minimal.jpg",details:["Weather fit: light layers for 24°C","Schedule fit: comfortable for class and group meeting","Style: clean neutral basics","AI reason: high compatibility with your most worn items"]},
  {title:"Casual Everyday",badge:"Most Worn",description:"Based on your wardrobe history, this is one of your most successful combinations.",image:"assets/outfit-casual.jpg",details:["Wear history: similar looks used often","Low effort, high reliability","Works with sneakers and denim","AI reason: safe option with strong personal fit"]},
  {title:"Smart Casual",badge:"Try New",description:"A slightly more refined look that still fits your current wardrobe.",image:"assets/outfit-smart.jpg",details:["Adds a more polished impression","Still uses familiar wardrobe pieces","Good for presentations or dates","AI reason: expands your style without feeling unnatural"]},
  {title:"Wardrobe Gap",badge:"AI Insight",description:"You are missing versatile summer outerwear. Consider adding one lightweight jacket.",image:"assets/outfit-gap.jpg",details:["Detected gap: summer layering pieces","Current wardrobe is heavy on dark outerwear","Suggested item: beige or blue overshirt","AI reason: creates many new outfit combinations"]}
];

let currentOutfit=0;

function updateOutfit(index){
  currentOutfit=index;
  const outfit=outfits[index];
  const badge=document.querySelector(".card-title button");
  const img=document.querySelector(".outfit-img img");
  const title=document.querySelector(".outfit-text h3");
  const desc=document.querySelector(".outfit-text p");
  const dots=document.querySelectorAll(".dots span");
  if(badge)badge.textContent=outfit.badge;
  if(img)img.src=outfit.image;
  if(title)title.textContent=outfit.title;
  if(desc)desc.textContent=outfit.description;
  dots.forEach((dot,i)=>dot.classList.toggle("active",i===index));
}

document.querySelectorAll(".dots span").forEach((dot,index)=>{dot.style.cursor="pointer";dot.addEventListener("click",()=>updateOutfit(index));});

let startX=0;
const outfitCard=document.querySelector(".outfit-card");
if(outfitCard){
  outfitCard.addEventListener("touchstart",e=>{startX=e.touches[0].clientX;});
  outfitCard.addEventListener("touchend",e=>{const diff=startX-e.changedTouches[0].clientX;if(Math.abs(diff)>40){if(diff>0){updateOutfit((currentOutfit+1)%outfits.length);}else{updateOutfit((currentOutfit-1+outfits.length)%outfits.length);}}});
}

function ensureOutfitDetailsModal(){
  let modal=document.getElementById("outfitDetailsModal");
  if(modal)return modal;
  modal=document.createElement("div");
  modal.id="outfitDetailsModal";
  modal.className="outfit-details-modal hidden";
  modal.innerHTML=`
    <button class="details-close" id="detailsClose">×</button>
    <h2 id="detailsTitle"></h2>
    <div class="details-badge" id="detailsBadge"></div>
    <img id="detailsImage" alt="Outfit details">
    <ul id="detailsList"></ul>
  `;
  document.getElementById("home-screen").appendChild(modal);
  document.getElementById("detailsClose").addEventListener("click",closeOutfitDetails);
  return modal;
}

function openOutfitDetails(){
  showOnlyHome();
  closeWardrobe();
  closeChat();
  closeItemDetails();
  const modal=ensureOutfitDetailsModal();
  const outfit=outfits[currentOutfit];
  document.getElementById("detailsTitle").textContent=outfit.title;
  document.getElementById("detailsBadge").textContent=outfit.badge;
  document.getElementById("detailsImage").src=outfit.image;
  document.getElementById("detailsList").innerHTML=outfit.details.map(d=>`<li>${d}</li>`).join("");
  wardrobeDim.classList.remove("hidden");
  modal.classList.remove("hidden");
}

function closeOutfitDetails(){
  const modal=document.getElementById("outfitDetailsModal");
  if(modal)modal.classList.add("hidden");
}

document.getElementById("detailsBtn").addEventListener("click",openOutfitDetails);

/* Clickable wardrobe item analysis */
function ensureItemDetailsModal(){
  let modal=document.getElementById("itemDetailsModal");
  if(modal)return modal;
  modal=document.createElement("div");
  modal.id="itemDetailsModal";
  modal.className="item-details-modal hidden";
  modal.innerHTML=`
    <button class="details-close" id="itemDetailsClose">×</button>
    <div class="item-detail-top">
      <img id="itemDetailImage" alt="Item detail">
      <div>
        <h2 id="itemDetailTitle"></h2>
        <p id="itemDetailMeta"></p>
        <div class="compatibility-score" id="itemDetailScore"></div>
      </div>
    </div>
    <div class="item-ai-tags" id="itemAiTags"></div>
    <div class="item-insight">
      <h3>AI Insight</h3>
      <p id="itemInsightText"></p>
    </div>
    <div class="pairings">
      <h3>Suggested Pairings</h3>
      <div id="pairingList"></div>
    </div>
    <button class="recommend-btn" id="itemRecommendBtn">See recommendations</button>
  `;
  document.getElementById("home-screen").appendChild(modal);
  document.getElementById("itemDetailsClose").addEventListener("click",closeItemDetails);
  document.getElementById("itemRecommendBtn").addEventListener("click",()=>{
    closeItemDetails();
    wardrobeDim.classList.add("hidden");
    showScreen("recommend-screen");
  });
  return modal;
}

function openItemDetails(item){
  closeOutfitDetails();
  closeChat();
  const modal=ensureItemDetailsModal();
  document.getElementById("itemDetailImage").src=`assets/${item.img}`;
  document.getElementById("itemDetailTitle").textContent=item.name;
  document.getElementById("itemDetailMeta").textContent=`${item.cat} · ${item.color} · Wear frequency: ${item.freq}`;
  document.getElementById("itemDetailScore").textContent=`${item.score} match`;
  document.getElementById("itemAiTags").innerHTML=item.tags.map(t=>`<span>${t}</span>`).join("");
  document.getElementById("itemInsightText").textContent=item.insight;
  document.getElementById("pairingList").innerHTML=item.pairs.map(p=>`<span>${p}</span>`).join("");
  wardrobeModal.classList.add("hidden");
  wardrobeDim.classList.remove("hidden");
  modal.classList.remove("hidden");
}

function closeItemDetails(){
  const modal=document.getElementById("itemDetailsModal");
  if(modal)modal.classList.add("hidden");
}

updateOutfit(0);
