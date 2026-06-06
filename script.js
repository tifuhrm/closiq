const featureTabs=document.querySelectorAll(".feature-tab");
const screenCards=document.querySelectorAll(".screen-card");
featureTabs.forEach(tab=>tab.addEventListener("click",()=>{
  featureTabs.forEach(t=>t.classList.remove("active"));
  screenCards.forEach(c=>c.classList.remove("active"));
  tab.classList.add("active");
  document.querySelector(`.screen-card[data-screen="${tab.dataset.target}"]`).classList.add("active");
}));

const demoTabs=document.querySelectorAll(".demo-tab");
const panels=document.querySelectorAll(".demo-panel");
function openPanel(id){
  demoTabs.forEach(t=>t.classList.toggle("active",t.dataset.panel===id));
  panels.forEach(p=>p.classList.toggle("active",p.id===id));
}
demoTabs.forEach(t=>t.addEventListener("click",()=>openPanel(t.dataset.panel)));

let closet=[
  ["Black T-shirt","top","Frequently worn","navy"],
  ["Coral knit","top","Highly versatile","cream"],
  ["White blouse","top","Good for layering","cream"],
  ["White hoodie","top","Casual","blue"],
  ["Light denim","bottom","Most worn","blue"],
  ["Beige cargo pants","bottom","Trend match","cream"],
  ["Blue overshirt","outer","Wardrobe gap","blue"],
  ["White sneakers","shoes","High compatibility","cream"]
];
const grid=document.getElementById("closetGrid");
function renderCloset(filter="all"){
  grid.innerHTML="";
  closet.filter(i=>filter==="all"||i[1]===filter).forEach(i=>{
    const d=document.createElement("div");
    d.className=`closet-item ${i[3]}`;
    d.innerHTML=`<strong>${i[0]}</strong><span>${i[1]} · ${i[2]}</span>`;
    grid.appendChild(d);
  });
  document.getElementById("closetCount").textContent=closet.length;
}
renderCloset();
document.querySelectorAll(".chip").forEach(c=>c.addEventListener("click",()=>{
  document.querySelectorAll(".chip").forEach(x=>x.classList.remove("active"));
  c.classList.add("active");renderCloset(c.dataset.filter);
}));

const fileInput=document.getElementById("fileInput"),uploadResult=document.getElementById("uploadResult"),preview=document.getElementById("uploadPreview");
fileInput.addEventListener("change",e=>{
  const file=e.target.files[0]; if(!file)return;
  const r=new FileReader();
  r.onload=()=>{preview.src=r.result;uploadResult.classList.remove("hidden")};
  r.readAsDataURL(file);
});
document.getElementById("addItem").addEventListener("click",()=>{
  closet.push(["White blouse","top","Good for layering","cream"]);
  renderCloset();openPanel("closet");
});

const analyzeBtn=document.getElementById("analyzeBtn");
analyzeBtn.addEventListener("click",()=>{
  const input=document.getElementById("productInput").value.toLowerCase();
  const label=document.getElementById("verdictLabel"),score=document.getElementById("verdictScore"),reason=document.getElementById("verdictReason");
  if(!input){label.textContent="Waiting";score.textContent="--%";reason.textContent="Enter a product to receive a wardrobe-based verdict.";return;}
  if(input.includes("black")||input.includes("jacket")||input.includes("coat")){
    label.textContent="DON'T BUY";score.textContent="42%";reason.textContent="You already own similar dark outerwear. Duplication risk is high and wardrobe improvement is low.";
  }else if(input.includes("linen")||input.includes("summer")||input.includes("outer")){
    label.textContent="BUY";score.textContent="91%";reason.textContent="This fills your summer outerwear gap and creates many new outfit combinations.";
  }else if(input.includes("sneaker")||input.includes("white")){
    label.textContent="BUY";score.textContent="87%";reason.textContent="Strong compatibility with your existing wardrobe and high cost-per-wear potential.";
  }else{
    label.textContent="MAYBE";score.textContent="68%";reason.textContent="The item fits some outfits, but Closiq recommends checking whether it fills a real wardrobe gap.";
  }
});

const chatWindow=document.getElementById("chatWindow"),chatInput=document.getElementById("chatInput");
function addMsg(text,type){const m=document.createElement("div");m.className=`message ${type}`;m.textContent=text;chatWindow.appendChild(m);chatWindow.scrollTop=chatWindow.scrollHeight}
function reply(q){
  q=q.toLowerCase();
  if(q.includes("date"))return "For a first date, I recommend the white blouse, light denim, and white sneakers. It is clean, soft, and fits your style history.";
  if(q.includes("similar"))return "Yes. You already own several dark outerwear pieces, so another black jacket would have high duplication risk.";
  if(q.includes("buy"))return "Your biggest wardrobe gap is versatile summer outerwear. A linen overshirt would add more value than another hoodie or black jacket.";
  return "Based on your wardrobe, I recommend prioritizing versatile basics that fill gaps instead of items similar to what you already own.";
}
function sendChat(){
  const text=chatInput.value.trim(); if(!text)return;
  addMsg(text,"user"); chatInput.value="";
  setTimeout(()=>addMsg(reply(text),"ai"),400);
}
document.getElementById("sendChat").addEventListener("click",sendChat);
chatInput.addEventListener("keydown",e=>{if(e.key==="Enter")sendChat()});
document.querySelectorAll(".prompt-row button").forEach(b=>b.addEventListener("click",()=>{chatInput.value=b.dataset.prompt;sendChat()}));
