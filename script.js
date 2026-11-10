
/* =====================================
   AMOR DE TWITTER
   Configuração geral da história
===================================== */

const story = {
  description: `Lorena Ferette é uma daquelas pessoas que sempre encontram espaço para uma nova paixão.
Basta conhecer alguém interessante para imaginar possibilidades, criar expectativas e, eventualmente, ter uma nova história para contar.

Entre encontros inesperados, romances que começam dentro e fora das redes sociais e algumas decepções pelo caminho, Lorena vive suas aventuras amorosas enquanto divide os acontecimentos e os surtos com seus irmãos, Samantha e Leonardo, e sua melhor amiga, Maggye.

Uma vida que parece render uma história diferente a cada semana, Lorena vai descobrir que o amor pode aparecer nos lugares mais improváveis, nas pessoas mais inesperadas e, às vezes, quando ela nem está procurando.`,

  cover: "assets/images/Capa"
};


/* =====================================
   CAPÍTULOS
   30 imagens por capítulo
   Sequência: 1.jpeg até 30.jpeg
===================================== */


const chapterImageCounts = [40, 36, 92, 45, 76];

const chapters = chapterImageCounts.map((imageCount, index) => {
    const chapterNumber = index + 1;

    return {
        title: `Capítulo ${chapterNumber}`,
        images: Array.from(
            { length: imageCount },
            (_, imageIndex) =>
                `assets/images/capitulos/capitulo-${chapterNumber}/${imageIndex + 1}.jpeg`
        )
    };
});



/* =====================================
   PERSONAGENS
===================================== */

const characters = [

  // PRINCIPAIS

  {
    name: "Lorena Ferette",
    bio: "20 anos • Estudante de Publicidade e Propaganda",
    image: "assets/images/personagens/lorena.jpeg"
  },

  {
    name: "Leonardo Ferette",
    bio: "23 anos • Irmão de Lorena • Cientista de Dados",
    image: "assets/images/personagens/léo.jpeg"
  },

  {
    name: "Samantha Ferette",
    bio: "25 anos • Irmã de Lorena • Publicitária",
    image: "assets/images/personagens/sam.jpeg"
  },

  {
    name: "Maggye Damatta",
    bio: "20 anos • Melhor amiga de Lorena • Estudante de Fisioterapia",
    image: "assets/images/personagens/mag.jpeg"
  },


  // OUTROS

  {
    name: "Eduarda Fragoso",
    bio: "25 anos • Jornalista",
    image: "assets/images/personagens/eduarda.jpeg"
  },

  {
    name: "Alicia Berti",
    bio: "28 anos • Contadora",
    image: "assets/images/personagens/lica.jpeg"
  },

  {
    name: "Adriana",
    bio: "30 anos • Publicitária",
    image: "assets/images/personagens/adri.jpeg"
  },

  {
    name: "Joventino Leoncio",
    bio: "20 anos • Estudante de Publicidade",
    image: "assets/images/personagens/jove.jpeg"
  },

  {
    name: "Junior",
    bio: "21 anos • Estudante de Educação Física",
    image: "assets/images/personagens/junior.jpeg"
  }

];


/* =====================================
   CONTAS DO TWITTER / X
   Nome + @ + print
===================================== */

const accounts = [

  {
    label: "Lorena Principal — @daroitlore",
    image: "assets/images/contas/daroitlore.jpeg"
  },

  {
    label: "Lorena Rant — @loreferette",
    image: "assets/images/contas/loreferette.jpeg"
  },

  {
    label: "Leonardo — @leoferette",
    image: "assets/images/contas/leoferette.jpeg"
  },

  {
    label: "Samantha — @samferette",
    image: "assets/images/contas/samferette.jpeg"
  },

  {
    label: "Maggye — @maggyecrf",
    image: "assets/images/contas/maggyecrf.jpeg"
  },

  {
    label: "Eduarda Principal — @dudasfv",
    image: "assets/images/contas/dudasfv.jpeg"
  },

  {
    label: "Eduarda Rant — @fragosoduda",
    image: "assets/images/contas/fragosoduda.jpeg"
  },

  {
    label: "Alicia Berti — @liliquinha",
    image: "assets/images/contas/liliquinha.jpeg"
  },

  {
    label: "Junior — @xuninho",
    image: "assets/images/contas/xuninho.jpeg"
  },

  {
    label: "Adriana Principal — @darolanadri",
    image: "assets/images/contas/darolanadri.jpeg"
  },

  {
    label: "Adriana Rant — @adriananegri",
    image: "assets/images/contas/adriananegri.jpeg"
  },

  {
    label: "Jove — @joveleoncio",
    image: "assets/images/contas/joveleoncio.jpeg"
  }

];


/* =====================================
   WALLPAPERS WHATSAPP
===================================== */

const wallpapers = [

  {
    label: "WhatsApp Lorena",
    image: "assets/images/wallpapers/lorena.jpeg"
  },

  {
    label: "WhatsApp Léo",
    image: "assets/images/wallpapers/leo.jpeg"
  },

  {
    label: "WhatsApp Sam",
    image: "assets/images/wallpapers/sam.jpeg"
  },

  {
    label: "WhatsApp Maggye",
    image: "assets/images/wallpapers/maggye.jpeg"
  }

];


/* =====================================
   FUNÇÕES GERAIS
===================================== */

const $ = (selector) => document.querySelector(selector);

let selectedChapter = 0;

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}


/* =====================================
   HOME
===================================== */

$("#storyDescription").textContent = story.description;
$("#coverImage").src = story.cover;


/* =====================================
   RENDERIZAR CAPÍTULOS
===================================== */

function renderChapters() {

  $("#chapterList").innerHTML = chapters.map((chapter, index) => `
    <button
      class="chapter-button ${index === selectedChapter ? "active" : ""}"
      data-chapter="${index}"
    >
      ${escapeHTML(chapter.title)}
    </button>
  `).join("");


  document.querySelectorAll("[data-chapter]").forEach(button => {

    button.addEventListener("click", () => {

      selectedChapter = Number(button.dataset.chapter);

      renderChapters();

    });

  });


  const chapter = chapters[selectedChapter];

  $("#chapterNumber").textContent =
    `${selectedChapter + 1} / ${chapters.length}`;


  // Capítulos compostos exclusivamente por imagens

  $("#chapterContent").innerHTML = chapter.images.map((src, index) => `
    <img
      class="chapter-image"
      src="${escapeHTML(src)}"
      alt="${escapeHTML(chapter.title)} - Imagem ${index + 1}"
      loading="lazy"
      onerror="this.remove()"
    >
  `).join("");


  $("#previousChapter").disabled = selectedChapter === 0;

  $("#nextChapter").disabled =
    selectedChapter === chapters.length - 1;

}



function scrollToChapterStart() {
  $("#chapterReader").scrollIntoView({
      behavior: "smooth",
      block: "start"
  });
}

$("#previousChapter").addEventListener("click", () => {
  if (selectedChapter > 0) {
      selectedChapter--;
      renderChapters();
      scrollToChapterStart();
  }
});

$("#nextChapter").addEventListener("click", () => {
  if (selectedChapter < chapters.length - 1) {
      selectedChapter++;
      renderChapters();
      scrollToChapterStart();
  }
});



/* =====================================
   RENDERIZAR PERSONAGENS
===================================== */

function renderCharacters() {

  $("#characterGrid").innerHTML = characters.map(character => `

    <article class="character-card">

      <img
        src="${escapeHTML(character.image)}"
        alt="${escapeHTML(character.name)}"
        loading="lazy"
        onerror="this.hidden = true"
      >

      <div class="character-info">

        <h3>${escapeHTML(character.name)}</h3>

        <p>${escapeHTML(character.bio)}</p>

      </div>

    </article>

  `).join("");

}


/* =====================================
   RENDERIZAR CONTAS
===================================== */

function renderAccounts() {

  $("#accountGrid").innerHTML = accounts.map(account => `

    <article class="account-card">

      <img
        src="${escapeHTML(account.image)}"
        alt="Print do perfil ${escapeHTML(account.label)}"
        loading="lazy"
        onerror="this.hidden = true"
      >

      <div class="account-info">

        <strong>${escapeHTML(account.label)}</strong>

      </div>

    </article>

  `).join("");

}


/* =====================================
   RENDERIZAR WALLPAPERS
===================================== */

function renderWallpapers() {

  $("#wallpaperGrid").innerHTML = wallpapers.map(wallpaper => `

    <article class="account-card wallpaper-card">

      <img
        src="${escapeHTML(wallpaper.image)}"
        alt="${escapeHTML(wallpaper.label)}"
        loading="lazy"
        onerror="this.hidden = true"
      >

      <div class="account-info">

        <strong>${escapeHTML(wallpaper.label)}</strong>

      </div>

    </article>

  `).join("");

}


/* =====================================
   NAVEGAÇÃO ENTRE PÁGINAS
===================================== */

function navigateToHash() {

  const id = location.hash.replace("#", "") || "home";

  const target = document.getElementById(id) ? id : "home";


  document.querySelectorAll(".page").forEach(page => {

    page.classList.toggle("active", page.id === target);

  });


  document.querySelectorAll(".nav-link").forEach(link => {

    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${target}`
    );

  });


  $("#mainNav").classList.remove("open");

  $("#menuToggle").setAttribute("aria-expanded", "false");

}


window.addEventListener("hashchange", navigateToHash);


/* =====================================
   MENU MOBILE
===================================== */

$("#menuToggle").addEventListener("click", () => {

  const isOpen = $("#mainNav").classList.toggle("open");

  $("#menuToggle").setAttribute(
    "aria-expanded",
    String(isOpen)
  );

});


/* =====================================
   INICIALIZAÇÃO
===================================== */

renderChapters();

renderCharacters();

renderAccounts();

renderWallpapers();

navigateToHash();
