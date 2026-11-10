/*
  COMO ATUALIZAR A HISTÓRIA:
  1. Coloque suas imagens nas pastas dentro de assets/images/.
  2. Edite os textos e os caminhos das imagens nos arrays abaixo.
  3. Salve e publique o site novamente.
  DICA: use caminhos relativos, por exemplo: "assets/images/capa.jpg".
*/
const story = {
  description: "Entre tweets, mensagens inesperadas e encontros que pareciam impossíveis, duas vidas se cruzam em meio ao caos da internet. Uma história sobre acaso, afeto e tudo aquilo que começa com um simples seguir.",
  cover: "assets/images/capa.jpg"
};

// Cada capítulo aceita texto e uma ou mais imagens.
// Para adicionar parágrafos, use \\n\\n dentro do texto.
// Para adicionar imagens, coloque o arquivo na pasta capitulos e informe o caminho em images.
const chapters = [
  { title: "Capítulo 1", paragraphs: ["Este é o começo da sua história. Substitua este texto pelo conteúdo do primeiro capítulo.\\n\\nVocê pode separar os parágrafos usando duas quebras de linha."], images: [] },
  { title: "Capítulo 2", paragraphs: ["Adicione aqui o texto do segundo capítulo."], images: [] },
  { title: "Capítulo 3", paragraphs: ["Adicione aqui o texto do terceiro capítulo."], images: [] },
  { title: "Capítulo 4", paragraphs: ["Adicione aqui o texto do quarto capítulo."], images: [] },
  { title: "Capítulo 5", paragraphs: ["Adicione aqui o texto do quinto capítulo."], images: [] }
];

// Fotos e descrições dos personagens.
// Coloque as fotos em assets/images/personagens/.
const characters = [
  // Exemplo:
  // { name: "Nome da personagem", bio: "Uma breve descrição.", image: "assets/images/personagens/nome.jpg" }
];

// Prints das contas dos personagens.
// Coloque os prints em assets/images/contas/.
const accounts = [
  // Exemplo:
  // { label: "@usuario", image: "assets/images/contas/perfil-usuario.jpg" }
];

const $ = (selector) => document.querySelector(selector);
let selectedChapter = 0;

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  }[char]));
}

$("#storyDescription").textContent = story.description;
$("#coverImage").src = story.cover;

function renderChapters() {
  $("#chapterList").innerHTML = chapters.map((chapter, index) => `
    <button class="chapter-button ${index === selectedChapter ? "active" : ""}" data-chapter="${index}">
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
  $("#chapterNumber").textContent = `${selectedChapter + 1} / ${chapters.length}`;
  $("#chapterContent").innerHTML = `
    <h3>${escapeHTML(chapter.title)}</h3>
    ${(chapter.images || []).map(src => `<img src="${escapeHTML(src)}" alt="Imagem de ${escapeHTML(chapter.title)}" loading="lazy">`).join("")}
    ${(chapter.paragraphs || []).map(paragraph => `<p>${escapeHTML(paragraph)}</p>`).join("")}
  `;
  $("#previousChapter").disabled = selectedChapter === 0;
  $("#nextChapter").disabled = selectedChapter === chapters.length - 1;
  $("#chapterReader").scrollIntoView({ behavior: "smooth", block: "nearest" });
}

$("#previousChapter").addEventListener("click", () => {
  if (selectedChapter > 0) { selectedChapter--; renderChapters(); }
});
$("#nextChapter").addEventListener("click", () => {
  if (selectedChapter < chapters.length - 1) { selectedChapter++; renderChapters(); }
});

function renderCharacters() {
  $("#characterGrid").innerHTML = characters.length ? characters.map(character => `
    <article class="character-card">
      <img src="${escapeHTML(character.image)}" alt="${escapeHTML(character.name)}" loading="lazy">
      <div class="character-info"><h3>${escapeHTML(character.name)}</h3><p>${escapeHTML(character.bio)}</p></div>
    </article>
  `).join("") : `<div class="empty-state"><strong>Em breve...</strong>Os personagens dessa história aparecerão aqui.</div>`;
}

function renderAccounts() {
  $("#accountGrid").innerHTML = accounts.length ? accounts.map(account => `
    <article class="account-card">
      <img src="${escapeHTML(account.image)}" alt="Print do perfil ${escapeHTML(account.label)}" loading="lazy">
      <div class="account-info"><strong>${escapeHTML(account.label)}</strong></div>
    </article>
  `).join("") : `<div class="empty-state"><strong>Em breve...</strong>Os perfis que fazem parte da história aparecerão aqui.</div>`;
}

function navigateToHash() {
  const id = location.hash.replace("#", "") || "home";
  const target = document.getElementById(id) ? id : "home";
  document.querySelectorAll(".page").forEach(page => page.classList.toggle("active", page.id === target));
  document.querySelectorAll(".nav-link").forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${target}`));
  $("#mainNav").classList.remove("open");
  $("#menuToggle").setAttribute("aria-expanded", "false");
}
window.addEventListener("hashchange", navigateToHash);
$("#menuToggle").addEventListener("click", () => {
  const isOpen = $("#mainNav").classList.toggle("open");
  $("#menuToggle").setAttribute("aria-expanded", String(isOpen));
});

renderChapters();
renderCharacters();
renderAccounts();
navigateToHash();
