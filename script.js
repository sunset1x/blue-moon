// Core tutorial data — you can swap YouTube IDs with your real ones later.
const tutorials = [
  // GTA 5
  {
    game: "GTA 5 Online",
    title: "Cherax",
    tag: "Paid | Recommend | Full Guide",
    description:
      "The most powerful and reliable paid GTA V mod menu for thoes willing to spend a bit of change.",
    youtubeId: "dQw4w9WgXcQ"
  },
  {
    game: "GTA 5 Online",
    title: "YimMenu V2",
    tag: "Free | Recommend",
    description:
      "A full guide to the best Free GTA5 Online menu from installation to showcase for GTA5 Enhanched Edition.",
    youtubeId: "ddmhUIjrmoU"
  },
  {
    game: "GTA 5 Online",
    title: "YimMenu",
    tag: "Free | Guide",
    description:
      "A full guide to the best Free GTA5 Online menu from installation to showcase for GTA5 Legacy Edition.",
    youtubeId: "EhqrD2KMqWs"
  },

  // Roblox
  {
    game: "Roblox",
    title: "Vega X",
    tag: "Exploit",
    description:
      "The best roblox script / cheat client on the market with a full bypass for moblie and PC Emulators",
    youtubeId: "i1fl0Kg6RkE"
  },

  // Minecraft
  {
    game: "Minecraft",
    title: "Buy and Sell Shop",
    tag: "Guide",
    description:
      "Create a functional Buy and Sell Shop inside of Minecraft Bedrock edition using command blocks.",
    youtubeId: "y4phtjEMM3E"
  },

  // Fortnite
  {
    game: "Fortnite",
    title: "Keyboard Input Optimization Tool",
    tag: "Performance",
    description:
      "A tool that helps improve keyboard input delay",
    youtubeId: "EeuTJC1ijys"
  }
];

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

let activeGameFilter = "all";
let activeSearchQuery = "";

// Create a single tutorial card
function createTutorialCard(tutorial) {
  const card = document.createElement("div");
  card.className = "menu-card";

  // Video wrapper
  const videoWrapper = document.createElement("div");
  videoWrapper.className = "menu-card__video";

  // Thumbnail
  const thumbnail = document.createElement("img");
  thumbnail.src = `https://i.ytimg.com/vi/${encodeURIComponent(
    tutorial.youtubeId
  )}/hqdefault.jpg`;
  thumbnail.alt = "";
  thumbnail.loading = "lazy";

  // Play button overlay
  const playButton = document.createElement("span");
  playButton.className = "play-button";
  playButton.setAttribute("aria-hidden", "true");

  // Actual YouTube embed
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube.com/embed/${encodeURIComponent(
    tutorial.youtubeId
  )}?autoplay=1`;
  iframe.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  iframe.allowFullscreen = true;

  // On click → swap thumbnail + play button for iframe
  videoWrapper.addEventListener("click", () => {
  // Replace thumbnail with iframe
  videoWrapper.replaceChildren(iframe);

  // Allow interaction with the video
  videoWrapper.classList.add("playing");
  card.classList.add("video-active");
});

  videoWrapper.append(thumbnail, playButton);

  // Content section
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


// Filter tutorials based on active game + search
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
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });
}

// Render tutorials into the grid
function renderTutorials() {
  const filtered = getFilteredTutorials();
  const fragment = document.createDocumentFragment();

  filtered.forEach((tutorial) => {
    fragment.append(createTutorialCard(tutorial));
  });

  grid.replaceChildren(fragment);
  count.textContent = String(filtered.length);

  if (filtered.length === 0) {
    emptyState.hidden = false;
  } else {
    emptyState.hidden = true;
  }
}

// Handle nav filter clicks
function handleNavClick(event) {
  const button = event.currentTarget;
  const game = button.dataset.game;

  activeGameFilter = game;

  navLinks.forEach((link) =>
    link.classList.toggle("nav__link--active", link === button)
  );

  renderTutorials();
}

// Handle search input
function handleSearchInput(event) {
  activeSearchQuery = event.target.value;
  renderTutorials();
}

// Handle mobile nav toggle
function handleNavToggle() {
  navLinksContainer.classList.toggle("nav__links--open");
}

// Initial setup
function init() {
  // Set default active nav link
  const defaultLink = navLinks.find((link) => link.dataset.game === "all");
  if (defaultLink) {
    defaultLink.classList.add("nav__link--active");
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", handleNavClick);
  });

// Dropdown toggle
  if (dropdownToggle && dropdown) {
    dropdownToggle.addEventListener("click", () => {
      dropdown.classList.toggle("open");
    });
  }

  // Dropdown items filter
  dropdownItems.forEach((item) => {
    item.addEventListener("click", () => {
      activeGameFilter = item.dataset.game;

      // Update active state on main nav links
      navLinks.forEach((link) =>
        link.classList.toggle(
          "nav__link--active",
          link.dataset.game === activeGameFilter
        )
      );

      // Close dropdown
      dropdown.classList.remove("open");

      renderTutorials();
    });
  });
  
  if (searchInput) {
    searchInput.addEventListener("input", handleSearchInput);
  }

  if (navToggle) {
    navToggle.addEventListener("click", handleNavToggle);
  }

  renderTutorials();
}

init();
