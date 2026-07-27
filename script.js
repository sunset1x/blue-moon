/* -------------------------------------------------------
   TEMPΞST MODZ — CLEAN REBUILT JS (2026 Edition)
   ------------------------------------------------------- */

/* ---------- TUTORIAL DATA ---------- */
const tutorials = [
  { game: "GTA 5", title: "Beginner Story Mode Menu", tag: "Starter",
    description: "A straightforward Story Mode menu to learn basic controls, safe options, and how to install mods without breaking your game.",
    youtubeId: "dQw4w9WgXcQ" },

  { game: "GTA 5", title: "Simple Trainer Setup", tag: "Installation",
    description: "Step‑by‑step trainer install, config, and the first features you should try in Story Mode.",
    youtubeId: "dQw4w9WgXcQ" },

  { game: "GTA 5", title: "Advanced Trainer Guide", tag: "Advanced",
    description: "Deeper configuration for players who already understand basic mod setup and want more control.",
    youtubeId: "dQw4w9WgXcQ" },

  { game: "Roblox", title: "Safe Modding & FPS Boost", tag: "Performance",
    description: "How to safely tweak Roblox settings, boost FPS, and avoid sketchy executors or shady downloads.",
    youtubeId: "dQw4w9WgXcQ" },

  { game: "Roblox", title: "Building Custom Keybinds", tag: "Controls",
    description: "Set up clean keybinds and macros for Roblox without breaking ToS or risking your account.",
    youtubeId: "dQw4w9WgXcQ" },

  { game: "Minecraft", title: "Mod Loader Setup (Forge/Fabric)", tag: "Setup",
    description: "Install Forge or Fabric the right way, manage mod packs, and keep your worlds safe.",
    youtubeId: "dQw4w9WgXcQ" },

  { game: "Minecraft", title: "Client Mods for PvP", tag: "PvP",
    description: "A look at popular PvP clients, what’s allowed, and how to configure them without getting banned.",
    youtubeId: "dQw4w9WgXcQ" },

  { game: "Fortnite", title: "Keyboard Input Optimization Tool", tag: "Performance",
    description: "A tool that helps improve keyboard input delay.",
    youtubeId: "EeuTJC1ijys" }
];

/* ---------- DOM ELEMENTS ---------- */
const grid = document.querySelector("#tutorial-grid");
const count = document.querySelector("#tutorial-count");
const emptyState = document.querySelector("#empty-state");
const searchInput = document.querySelector("#search-input");

const navLinks = Array.from(document.querySelectorAll(".nav__link"));
const navToggle = document.querySelector(".nav__toggle");
const navLinksContainer = document.querySelector(".nav__links");

const dropdown = document.querySelector(".dropdown");
const dropdownToggle = document.querySelector(".dropdown__toggle");
const dropdownItems = Array.from(document.querySelectorAll(".dropdown__item"));

/* ---------- STATE ---------- */
let activeGameFilter = "all";
let activeSearchQuery = "";

/* -------------------------------------------------------
   CREATE TUTORIAL CARD
   ------------------------------------------------------- */
function createTutorialCard(tutorial) {
  const card = document.createElement("div");
  card.className = "menu-card tempest-hover";

  /* --- Video wrapper --- */
  const videoWrapper = document.createElement("div");
  videoWrapper.className = "menu-card__video";

  const thumbnail = document.createElement("img");
  thumbnail.src = `https://i.ytimg.com/vi/${tutorial.youtubeId}/hqdefault.jpg`;
  thumbnail.alt = "";
  thumbnail.loading = "lazy";

  const playButton = document.createElement("span");
  playButton.className = "play-button";

  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube.com/embed/${tutorial.youtubeId}?autoplay=1`;
  iframe.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  iframe.allowFullscreen = true;

  /* --- Click to play --- */
  videoWrapper.addEventListener("click", () => {
    videoWrapper.replaceChildren(iframe);
    videoWrapper.classList.add("playing");
    card.classList.add("video-active");
  });

  videoWrapper.append(thumbnail, playButton);

  /* --- Content --- */
  const content = document.createElement("div");
  content.className = "menu-card__content";

  const meta = document.createElement("div");
  meta.className = "menu-card__meta";

  const tag = document.createElement("p");
  tag.className = "menu-card__tag";
  tag.textContent = tutorial.tag;

  const game = document.createElement("p");
  game.className = "menu-card__game";
  game.textContent = tutorial.game;

  const title = document.createElement("h3");
  title.textContent = tutorial.title;

  const description = document.createElement("p");
  description.className = "menu-card__description";
  description.textContent = tutorial.description;

  meta.append(tag, game);
  content.append(meta, title, description);

  card.append(videoWrapper, content);
  return card;
}

/* -------------------------------------------------------
   FILTER TUTORIALS
   ------------------------------------------------------- */
function getFilteredTutorials() {
  const query = activeSearchQuery.trim().toLowerCase();

  return tutorials.filter((tutorial) => {
    const matchesGame =
      activeGameFilter === "all" || tutorial.game === activeGameFilter;

    if (!matchesGame) return false;
    if (!query) return true;

    const haystack = [
      tutorial.title,
      tutorial.tag,
      tutorial.game,
      tutorial.description
    ].join(" ").toLowerCase();

    return haystack.includes(query);
  });
}

/* -------------------------------------------------------
   RENDER TUTORIALS
   ------------------------------------------------------- */
function renderTutorials() {
  const filtered = getFilteredTutorials();
  const fragment = document.createDocumentFragment();

  filtered.forEach((tutorial) => {
    fragment.append(createTutorialCard(tutorial));
  });

  grid.replaceChildren(fragment);
  count.textContent = filtered.length;

  emptyState.hidden = filtered.length !== 0;
}

/* -------------------------------------------------------
   NAVIGATION HANDLERS
   ------------------------------------------------------- */
function handleNavClick(event) {
  const button = event.currentTarget;
  activeGameFilter = button.dataset.game;

  navLinks.forEach((link) =>
    link.classList.toggle("nav__link--active", link === button)
  );

  renderTutorials();
}

function handleSearchInput(event) {
  activeSearchQuery = event.target.value;
  renderTutorials();
}

function handleNavToggle() {
  navLinksContainer.classList.toggle("nav__links--open");
}

/* -------------------------------------------------------
   INITIALIZE
   ------------------------------------------------------- */
function init() {
  /* Default active link */
  const defaultLink = navLinks.find((link) => link.dataset.game === "all");
  if (defaultLink) defaultLink.classList.add("nav__link--active");

  /* Nav link clicks */
  navLinks.forEach((link) => {
    link.addEventListener("click", handleNavClick);
  });

  /* Dropdown toggle */
  if (dropdownToggle) {
    dropdownToggle.addEventListener("click", () => {
      dropdown.classList.toggle("open");
    });
  }

  /* Dropdown item clicks */
  dropdownItems.forEach((item) => {
    item.addEventListener("click", () => {
      activeGameFilter = item.dataset.game;

      navLinks.forEach((link) =>
        link.classList.toggle(
          "nav__link--active",
          link.dataset.game === activeGameFilter
        )
      );

      dropdown.classList.remove("open");
      renderTutorials();
    });
  });

  /* Search */
  if (searchInput) {
    searchInput.addEventListener("input", handleSearchInput);
  }

  /* Mobile nav */
  if (navToggle) {
    navToggle.addEventListener("click", handleNavToggle);
  }

  /* Initial render */
  renderTutorials();
}

init();
