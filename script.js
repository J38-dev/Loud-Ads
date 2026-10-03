/* =========================================================
LOUD ADS — LANDING PAGE JAVASCRIPT
========================================================= */

/* =========================================================

1. HELPERS
   ========================================================= */

const $ = (selector, parent = document) =>
parent.querySelector(selector);

const $$ = (selector, parent = document) =>
[...parent.querySelectorAll(selector)];

/* =========================================================
02. SCROLL PROGRESS
========================================================= */

const progress = $("#progress");

function updateProgress(){

if(!progress) return;

const pageHeight =
document.documentElement.scrollHeight - window.innerHeight;

const amount =
pageHeight > 0
? (window.scrollY / pageHeight) * 100
: 0;

progress.style.width = "${amount}%";

}

window.addEventListener("scroll", updateProgress, {passive:true});

updateProgress();

/* =========================================================
03. SMOOTH ANCHOR LINKS
========================================================= */

$$('a[href^="#"]').forEach(link => {

link.addEventListener("click", event => {

const targetId = link.getAttribute("href");

if(!targetId || targetId === "#") return;

const target = $(targetId);

if(!target) return;

event.preventDefault();

target.scrollIntoView({
  behavior:"smooth",
  block:"start"
});

});

});

/* =========================================================
04. NAVIGATION STATE
========================================================= */

const nav = $(".nav");

function updateNav(){

if(!nav) return;

nav.classList.toggle(
"scrolled",
window.scrollY > 40
);

}

window.addEventListener("scroll", updateNav, {passive:true});

updateNav();

/* =========================================================
05. CUSTOM CURSOR
========================================================= */

const cursor = $(".cursor");
const cursorText = $(".cursor-text");

const canUseCursor =
window.matchMedia("(pointer:fine)").matches &&
cursor &&
cursorText;

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let cursorX = mouseX;
let cursorY = mouseY;

if(canUseCursor){

document.addEventListener("mousemove", event => {

mouseX = event.clientX;
mouseY = event.clientY;

});

function animateCursor(){

cursorX += (mouseX - cursorX) * .18;
cursorY += (mouseY - cursorY) * .18;

cursor.style.left = `${cursorX}px`;
cursor.style.top = `${cursorY}px`;

cursorText.style.left = `${cursorX}px`;
cursorText.style.top = `${cursorY}px`;

requestAnimationFrame(animateCursor);

}

animateCursor();

}

/* =========================================================
06. CURSOR STATES
========================================================= */

function setCursor(text = "", active = false){

if(!canUseCursor) return;

cursorText.textContent = text;

cursor.style.width = active ? "68px" : "18px";
cursor.style.height = active ? "68px" : "18px";

cursor.style.background =
active ? "var(--red)" : "transparent";

cursor.style.borderColor =
active ? "var(--red)" : "var(--red)";

}

if(canUseCursor){

$$("a, button").forEach(element => {

let label = "OPEN";

if(
  element.classList.contains("magnetic") ||
  element.classList.contains("portfolio-cta")
){
  label = "START";
}

if(
  element.classList.contains("project-card")
){
  label = "VIEW";
}

if(
  element.classList.contains("need-card")
){
  label = "EXPLORE";
}

if(
  element.classList.contains("creative-tab") ||
  element.classList.contains("service-row")
){
  label = "SELECT";
}

element.addEventListener("mouseenter", () => {
  setCursor(label, true);
});

element.addEventListener("mouseleave", () => {
  setCursor();
});

});

}

/* =========================================================
07. MAGNETIC BUTTONS
========================================================= */

if(canUseCursor){

$$(".magnetic").forEach(button => {

button.addEventListener("mousemove", event => {

  const rect =
    button.getBoundingClientRect();

  const x =
    event.clientX -
    rect.left -
    rect.width / 2;

  const y =
    event.clientY -
    rect.top -
    rect.height / 2;

  button.style.transform =
    `translate(${x * .18}px,${y * .18}px)`;

});

button.addEventListener("mouseleave", () => {

  button.style.transform =
    "translate(0,0)";

});

});

}

/* =========================================================
08. HERO MOVEMENT
========================================================= */

const hero = $(".hero");
const heroLogo = $(".hero-logo");

if(
hero &&
heroLogo &&
window.matchMedia("(pointer:fine)").matches
){

hero.addEventListener("mousemove", event => {

const rect =
  hero.getBoundingClientRect();

const x =
  (event.clientX - rect.left) /
  rect.width -
  .5;

const y =
  (event.clientY - rect.top) /
  rect.height -
  .5;

heroLogo.style.transform =
  `translate(${x * 14}px,${y * 10}px)`;

});

hero.addEventListener("mouseleave", () => {

heroLogo.style.transform =
  "translate(0,0)";

});

}

/* =========================================================
09. WHAT DO YOU NEED?
========================================================= */

const needCards = $$(".need-card");
const needResult = $("#needResult");
const resultTitle = $("#resultTitle");
const resultText = $("#resultText");
const resultChoices = $("#resultChoices");
const resultClose = $("#resultClose");

const needData = {

design:{
title:"What do you need designed?",
text:"Choose the type of design you're looking for.",
choices:[
"Logo Design",
"Social Media Graphics",
"Flyer / Poster",
"Full Brand Identity"
]
},

website:{
title:"What kind of website do you need?",
text:"Choose the type of website that best describes your idea.",
choices:[
"Business Website",
"Portfolio Website",
"Online Store",
"Something Custom"
]
},

advertise:{
title:"What do you want to advertise?",
text:"Choose what you want Loud Ads to promote.",
choices:[
"My Business",
"A Product",
"A Special / Sale",
"My Website"
]
},

event:{
title:"What are you promoting?",
text:"Choose what you're promoting and we'll take it from there.",
choices:[
"Party / Entertainment",
"Business Event",
"Launch",
"Something Else"
]
}

};

function createWhatsAppLink(choice){

const message =
"Hi Loud Ads, I'm interested in ${choice}. I'd like to find out more.";

return(
"https://wa.me/27711507774?text=" +
encodeURIComponent(message)
);

}

function showNeedResult(type){

const data = needData[type];

if(
!data ||
!needResult ||
!resultTitle ||
!resultText ||
!resultChoices
) return;

needCards.forEach(card => {

card.classList.toggle(
  "active",
  card.dataset.choice === type
);

});

resultTitle.textContent =
data.title;

resultText.textContent =
data.text;

resultChoices.innerHTML = "";

data.choices.forEach((choice,index) => {

const link =
  document.createElement("a");

link.className =
  "result-choice";

link.href =
  createWhatsAppLink(choice);

link.target =
  "_blank";

link.innerHTML = `
  <span>0${index + 1}</span>
  <strong>${choice}</strong>
  <b>→</b>
`;

resultChoices.appendChild(link);

});

needResult.classList.add("open");

setTimeout(() => {

needResult.scrollIntoView({
  behavior:"smooth",
  block:"center"
});

},120);

}

needCards.forEach(card => {

card.addEventListener("click", () => {

showNeedResult(
  card.dataset.choice
);

});

});

if(resultClose){

resultClose.addEventListener("click", () => {

needResult.classList.remove("open");

needCards.forEach(card => {
  card.classList.remove("active");
});

});

}

/* =========================================================
10. CREATIVE SWITCHER
========================================================= */

const creativeTabs =
$$(".creative-tab");

const creativePanels =
$$(".creative-panel");

creativeTabs.forEach(tab => {

tab.addEventListener("click", () => {

const view =
  tab.dataset.view;

creativeTabs.forEach(item => {

  item.classList.toggle(
    "active",
    item === tab
  );

});

creativePanels.forEach(panel => {

  panel.classList.toggle(
    "active",
    panel.dataset.panel === view
  );

});

});

});

/* =========================================================
11. SERVICES ACCORDION
========================================================= */

const serviceRows =
$$(".service-row");

serviceRows.forEach(row => {

row.addEventListener("click", () => {

const wasActive =
  row.classList.contains("active");

serviceRows.forEach(item => {
  item.classList.remove("active");
});

if(!wasActive){
  row.classList.add("active");
}

});

});

/* =========================================================
12. PROJECT IMAGE VIEWER
========================================================= */

const viewer =
$("#viewer");

const viewerImg =
$("#viewer-img");

$$(".project-image img").forEach(image => {

image.addEventListener("click", event => {

event.preventDefault();
event.stopPropagation();

if(!viewer || !viewerImg) return;

viewerImg.src =
  image.src;

viewerImg.alt =
  image.alt || "";

viewer.style.display =
  "flex";

});

});

if(viewer){

viewer.addEventListener("click", () => {

viewer.style.display =
  "none";

if(viewerImg){
  viewerImg.src = "";
}

});

}

if(viewerImg){

viewerImg.addEventListener("click", event => {
event.stopPropagation();
});

}

/* =========================================================
13. PROJECT HOVER
========================================================= */

if(
window.matchMedia("(pointer:fine)").matches
){

$$(".project-card").forEach(project => {

project.addEventListener("mousemove", event => {

  const image =
    $(".project-image img", project);

  if(!image) return;

  const rect =
    project.getBoundingClientRect();

  const x =
    (event.clientX - rect.left) /
    rect.width -
    .5;

  const y =
    (event.clientY - rect.top) /
    rect.height -
    .5;

  image.style.transform =
    `scale(1.045) translate(${x * 5}px,${y * 5}px)`;

});

project.addEventListener("mouseleave", () => {

  const image =
    $(".project-image img", project);

  if(image){

    image.style.transform =
      "";

  }

});

});

}

/* =========================================================
14. REVEAL ON SCROLL
========================================================= */

const revealElements =
$$(".project-card, .creative-panel, .service-row, .step-card, .brand");

const revealObserver =
new IntersectionObserver(
entries => {

  entries.forEach(entry => {

    if(!entry.isIntersecting) return;

    entry.target.classList.add("visible");

    revealObserver.unobserve(
      entry.target
    );

  });

},
{
  threshold:.12
}

);

revealElements.forEach(element => {

revealObserver.observe(element);

});

/* =========================================================
15. MOBILE TAP FEEDBACK
========================================================= */

if(
window.matchMedia("(pointer:coarse)").matches
){

$$(".project-card, .brand, .need-card").forEach(element => {

element.addEventListener(
  "touchstart",
  () => {
    element.classList.add("touching");
  },
  {passive:true}
);

element.addEventListener(
  "touchend",
  () => {
    element.classList.remove("touching");
  },
  {passive:true}
);

});

}

/* =========================================================
16. REDUCED MOTION
========================================================= */

if(
window.matchMedia("(prefers-reduced-motion:reduce)").matches
){

document.documentElement.style.scrollBehavior =
"auto";

}
