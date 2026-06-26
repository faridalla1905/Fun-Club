
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

const menu = $(".menu");
const links = $(".links");
if(menu){ menu.addEventListener("click", () => links.classList.toggle("active")); }
$$(".links a").forEach(a => a.addEventListener("click", () => links.classList.remove("active")));

const obs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.style.opacity=1;
      e.target.style.transform="translateY(0)";
      e.target.style.transition="opacity .7s ease, transform .7s ease";
      obs.unobserve(e.target);
    }
  })
},{threshold:.12});
$$(".reveal").forEach(el=>obs.observe(el));

async function loadContent(){
  try{
    const res = await fetch("data/content.json");
    const data = await res.json();

    const statRoot = $("#stats");
    if(statRoot){
      statRoot.innerHTML = data.stats.map(s => `<div class="stat reveal"><b>${s.number}</b><span>${s.label}</span></div>`).join("");
    }

    const newsRoot = $("#newsCards");
    if(newsRoot){
      newsRoot.innerHTML = data.news.map(n => `<article class="card reveal"><p class="kicker">${n.date}</p><h3>${n.title}</h3><p>${n.text}</p></article>`).join("");
    }

    const eventRoot = $("#eventCards");
    if(eventRoot){
      eventRoot.innerHTML = data.events.map(e => `<article class="card reveal"><p class="kicker">${e.date}</p><h3>${e.title}</h3><p>${e.text}</p></article>`).join("");
    }

    const galleryRoot = $("#galleryCards");
    if(galleryRoot){
      galleryRoot.innerHTML = data.gallery.map(g => `<article class="gallery-card reveal"><img src="${g.image}" alt="${g.title}"><div><b>${g.title}</b><p class="muted">${g.category}</p></div></article>`).join("");
    }

    $$(".reveal").forEach(el=>obs.observe(el));
  } catch(e){
    console.log("Content file not loaded", e);
  }
}
loadContent();
