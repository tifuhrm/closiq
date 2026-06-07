const screens=document.querySelectorAll(".screen");
function showScreen(id){screens.forEach(s=>s.classList.toggle("active",s.id===id));closeWardrobe();closeChat();}
document.querySelectorAll("[data-target]").forEach(btn=>btn.addEventListener("click",()=>showScreen(btn.dataset.target)));
const wardrobeModal=document.getElementById("wardrobeModal"), wardrobeDim=document.getElementById("wardrobeDim");
function openWardrobe(){showOnlyHome();wardrobeModal.classList.remove("hidden");wardrobeDim.classList.remove("hidden");}
function showOnlyHome(){screens.forEach(s=>s.classList.toggle("active",s.id==="home-screen"));}
function closeWardrobe(){wardrobeModal.classList.add("hidden");wardrobeDim.classList.add("hidden");}
["wardrobeOpen","wardrobeOpen2","wardrobeOpen3"].forEach(id=>{const el=document.getElementById(id);if(el)el.addEventListener("click",openWardrobe);});
document.getElementById("wardrobeClose").addEventListener("click",closeWardrobe);
wardrobeDim.addEventListener("click",()=>{closeWardrobe();closeChat();});
const items=[["Black T-shirt","black-tshirt.jpg","top"],["Coral Knit","coral-knit.jpg","top"],["White Blouse","white-blouse.jpg","top"],["White Hoodie","white-hoodie.jpg","top"],["Blue Jeans","blue-jeans.jpg","bottom"],["Blue Shirt","blue-shirt.jpg","outer"],["Denim Shorts","denim-shorts.jpg","shoes"],["Cargo Pants","cargo-pants.jpg","bottom"]];
const grid=document.getElementById("wardrobeGrid");
function render(filter="all"){grid.innerHTML="";items.filter(i=>filter==="all"||i[2]===filter).slice(0,4).forEach(i=>{const div=document.createElement("div");div.className="item";div.innerHTML=`<img src="assets/${i[1]}" alt="${i[0]}"><p>${i[0]}</p>`;grid.appendChild(div);});}
render("all");
document.querySelectorAll(".chip").forEach(chip=>chip.addEventListener("click",()=>{document.querySelectorAll(".chip").forEach(c=>c.classList.remove("active"));chip.classList.add("active");render(chip.dataset.filter);}));
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
document.getElementById("detailsBtn").addEventListener("click",openWardrobe);