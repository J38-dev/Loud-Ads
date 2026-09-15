/* =========================
   MAGNETIC BUTTON
========================= */

const btn = document.querySelector(".magnetic");

btn.addEventListener("mousemove",(e)=>{
const rect = btn.getBoundingClientRect();
const x = e.clientX - rect.left - rect.width/2;
const y = e.clientY - rect.top - rect.height/2;

btn.style.transform = `translate(${x*0.2}px,${y*0.2}px)`;
});

btn.addEventListener("mouseleave",()=>{
btn.style.transform = "translate(0,0)";
});

const images = document.querySelectorAll(".masonry img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

images.forEach(img=>{
 img.addEventListener("click",()=>{
   lightbox.style.display="flex";
   lightboxImg.src = img.src;
 });
});

lightbox.addEventListener("click",()=>{
 lightbox.style.display="none";
});

window.addEventListener("scroll",()=>{
let scroll =
window.scrollY /
(document.body.scrollHeight - window.innerHeight);

document.getElementById("progress").style.width =
(scroll * 100) + "%";
});

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
anchor.addEventListener("click",function(e){
e.preventDefault();

document.querySelector(this.getAttribute("href"))
.scrollIntoView({
behavior:"smooth"
});
});
});

const observer = new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.style.opacity=1;
entry.target.style.transform="translateY(0)";
}
});
},{threshold:0.2});

document.querySelectorAll("section").forEach(sec=>{
observer.observe(sec);
});

window.addEventListener("scroll", () => {
const nav = document.querySelector(".nav");

if(window.scrollY > 50){
nav.classList.add("scrolled");
}else{
nav.classList.remove("scrolled");
}
});


document.querySelectorAll("a, button, .portfolio-item")
.forEach(el=>{

  el.addEventListener("mouseenter",()=>{
    cursor.style.width="70px";
    cursor.style.height="70px";
    cursor.style.background="#ff2b2b";
    cursorText.innerHTML="VIEW";
  });

  el.addEventListener("mouseleave",()=>{
    cursor.style.width="18px";
    cursor.style.height="18px";
    cursor.style.background="transparent";
    cursorText.innerHTML="";
  });

});

document.querySelectorAll(".visit-btn, nav a").forEach(btn=>{

  btn.addEventListener("mousemove",e=>{
    const rect = btn.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width/2;
    const y = e.clientY - rect.top - rect.height/2;

    btn.style.transform =
      `translate(${x*0.2}px, ${y*0.2}px)`;
  });

  btn.addEventListener("mouseleave",()=>{
    btn.style.transform="translate(0,0)";
  });

});


const viewer = document.getElementById("viewer");
const viewerImg = document.getElementById("viewer-img");

document.querySelectorAll(".masonry img")
.forEach(img=>{
  img.onclick = ()=>{
    viewer.style.display="flex";
    viewerImg.src = img.src;
  }
});

viewer.onclick=()=>{
  viewer.style.display="none";
}


const cursor = document.querySelector(".cursor");

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener("mousemove",(e)=>{
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor(){

  currentX += (mouseX - currentX) * 0.18;
  currentY += (mouseY - currentY) * 0.18;

  cursor.style.transform =
    `translate3d(${currentX}px, ${currentY}px,0)`;

  requestAnimationFrame(animateCursor);
}

animateCursor();

document.querySelectorAll(".magnetic").forEach(btn=>{

  btn.addEventListener("mousemove", e=>{

    const rect = btn.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width/2;
    const y = e.clientY - rect.top - rect.height/2;

    btn.style.transform =
      `translate(${x*0.25}px, ${y*0.25}px) scale(1.05)`;

    cursor.style.width="60px";
    cursor.style.height="60px";
    cursor.style.background="#dc143c22";

  });

  btn.addEventListener("mouseleave",()=>{

    btn.style.transform="translate(0,0) scale(1)";

    cursor.style.width="18px";
    cursor.style.height="18px";
    cursor.style.background="transparent";
  });

});

// SELECT CANVASES
const intro = document.getElementById("intro");
const introCanvas = document.getElementById("introGrid");
const paintCanvas = document.getElementById("paintCanvas");
const introCtx = introCanvas.getContext("2d");
const paintCtx = paintCanvas.getContext("2d");

const colors = [
 "#dc143c",
 "#ff7a00",
 "#ffd000",
 "#00c2ff",
 "#7b2cff"
];

// PAINT DROPS
let drops = [];
function createDrop(){
  drops.push({
    x: Math.random()*paintCanvas.width,
    y: -50,
    radius: Math.random()*40+20,
    color: colors[Math.floor(Math.random()*colors.length)],
    speed: Math.random()*4+2
  });
}
const dropInterval = setInterval(createDrop,180);

// ANIMATION LOOPS
let introGridRunning = true;
function drawIntroGrid(){
  if(!introGridRunning) return;
  introCtx.clearRect(0,0,introCanvas.width,introCanvas.height);
  // ...grid drawing...
  requestAnimationFrame(drawIntroGrid);
}
drawIntroGrid();

let paintRunning = true;
function animatePaint(){
  if(!paintRunning) return;
  paintCtx.clearRect(0,0,paintCanvas.width,paintCanvas.height);
  drops.forEach(d=>{
    d.y += d.speed;
    paintCtx.beginPath();
    paintCtx.arc(d.x,d.y,d.radius,0,Math.PI*2);
    paintCtx.fillStyle = d.color;
    paintCtx.fill();
    d.radius *= 0.995;
  });
  requestAnimationFrame(animatePaint);
}
animatePaint();

// FADE OUT INTRO
setTimeout(()=>{
  intro.style.transition = "opacity 1s ease";
  intro.style.opacity = 0;

  // STOP ANIMATION LOOPS
  introGridRunning = false;
  paintRunning = false;
  clearInterval(dropInterval);

  setTimeout(()=>{
    intro.remove();
  },800);
},1500);




/* =========================================================
   LOUD ADS — WHAT DO YOU NEED?
========================================================= */

const needCards = document.querySelectorAll(".need-card");
const needResult = document.getElementById("needResult");
const resultTitle = document.getElementById("resultTitle");
const resultText = document.getElementById("resultText");
const resultButton = document.getElementById("resultButton");
const resultClose = document.getElementById("resultClose");

const needData = {

  design:{
    title:"What Do You Need Designed?",
    text:"Choose the type of design you're looking for.",
    choices:[
      "Logo Design",
      "Social Media Graphics",
      "Flyer / Poster",
      "Full Brand Identity"
    ]
  },

  website:{
    title:"What Kind Of Website Do You Need?",
    text:"Choose the type of website that best describes what you're looking for.",
    choices:[
      "Business Website",
      "Portfolio Website",
      "Online Store",
      "Something Custom"
    ]
  },

  advertise:{
    title:"What Do You Want To Advertise?",
    text:"Choose what you want Loud Ads to promote.",
    choices:[
      "My Business",
      "A Product",
      "A Special / Sale",
      "My Website"
    ]
  },

  event:{
    title:"What Are You Promoting?",
    text:"Choose the type of event you want to promote.",
    choices:[
      "Party / Entertainment",
      "Business Event",
      "Launch",
      "Something Else"
    ]
  }

};


needCards.forEach(card=>{

  card.addEventListener("click",()=>{

    const choice = card.dataset.choice;
    const data = needData[choice];

    needCards.forEach(item=>{
      item.classList.remove("active");
    });

    card.classList.add("active");

    resultTitle.textContent = data.title;
    resultText.textContent = data.text;

    resultButton.style.display = "none";

    let oldChoices = document.querySelector(".result-choices");

    if(oldChoices){
      oldChoices.remove();
    }

    const choicesContainer = document.createElement("div");

    choicesContainer.className = "result-choices";

    data.choices.forEach((choiceName,index)=>{

      const choiceButton = document.createElement("button");

      choiceButton.className = "result-choice";

      choiceButton.innerHTML = `
        <span>0${index + 1}</span>
        <strong>${choiceName}</strong>
        <b>→</b>
      `;

      choiceButton.addEventListener("click",()=>{

        const message =
        `Hi Loud Ads, I'm interested in ${choiceName}. I'd like to find out more.`;

        window.open(
          "https://wa.me/27711507774?text=" +
          encodeURIComponent(message),
          "_blank"
        );

      });

      choicesContainer.appendChild(choiceButton);

    });

    resultText.after(choicesContainer);

    needResult.classList.add("open");

    setTimeout(()=>{

      needResult.scrollIntoView({
        behavior:"smooth",
        block:"center"
      });

    },100);

  });

});


/* CLOSE RESULT */

resultClose.addEventListener("click",()=>{

  needResult.classList.remove("open");

  needCards.forEach(card=>{
    card.classList.remove("active");
  });

});


/* =========================================================
   FEATURED AD INTERACTION
========================================================= */

document.querySelectorAll(".business-ad").forEach(ad=>{

  ad.addEventListener("mouseenter",()=>{

    if(window.innerWidth > 900){

      const image = ad.querySelector(".ad-image-wrap img");

      if(image){
        image.style.transform = "scale(1.05)";
      }

    }

  });

  ad.addEventListener("mouseleave",()=>{

    const image = ad.querySelector(".ad-image-wrap img");

    if(image){
      image.style.transform = "scale(1)";
    }

  });

});
