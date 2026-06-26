
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

const menu = $(".menu");
const links = $(".links");
if(menu){ menu.addEventListener("click", () => links.classList.toggle("active")); }
$$(".links a").forEach(a => a.addEventListener("click", () => links.classList.remove("active")));

async function loadContent(){
  const res = await fetch("data/content.json");
  const data = await res.json();

  if($("#heroKicker")) $("#heroKicker").textContent = data.hero.kicker;
  if($("#heroTitle")) $("#heroTitle").textContent = data.hero.title;
  if($("#heroDescription")) $("#heroDescription").textContent = data.hero.description;
  if($("#heroPhoto")) $("#heroPhoto").style.backgroundImage = `url('${data.hero.image}')`;

  const stats = $("#stats");
  if(stats){
    stats.innerHTML = data.stats.map(s => `
      <div class="stat reveal"><b>${s.number}</b><span>${s.label}</span></div>
    `).join("");
  }

  const news = $("#newsCards");
  if(news){
    news.innerHTML = data.news.map(n => `
      <article class="card reveal">
        <img class="news-card-img" src="${n.image}" alt="${n.title}">
        <p class="kicker">${n.date}</p>
        <h3>${n.title}</h3>
        <p>${n.description}</p>
      </article>
    `).join("");
  }

  const programs = $("#programCards");
  if(programs){
    programs.innerHTML = data.programs.map(p => `
      <article class="card reveal">
        <div class="icon">${p.icon}</div>
        <h3>${p.title}</h3>
        <p>${p.description}</p>
      </article>
    `).join("");
  }

  const gallery = $("#galleryCards");
  if(gallery){
    gallery.innerHTML = data.gallery.map(g => `
      <article class="gallery-card reveal">
        <img src="${g.image}" alt="${g.title}">
        <div><b>${g.title}</b><p class="muted">${g.category}</p></div>
      </article>
    `).join("");
  }

  startReveal();
}

function startReveal(){
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.style.opacity=1;
        e.target.style.transform="translateY(0)";
        e.target.style.transition="opacity .7s ease, transform .7s ease";
        obs.unobserve(e.target);
      }
    });
  },{threshold:.12});
  $$(".reveal").forEach(el=>obs.observe(el));
}

loadContent().catch(() => startReveal());
