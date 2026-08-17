const searchInput = document.querySelector("[data-blog-search]");
const posts = [...document.querySelectorAll("[data-post]")];
const noResults = document.querySelector("[data-no-results]");

function normalize(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function filterPosts(query) {
  const term = normalize(query.trim());
  let visible = 0;
  posts.forEach((post) => {
    const matches = !term || normalize(`${post.dataset.post} ${post.textContent}`).includes(term);
    post.hidden = !matches;
    if (matches) visible += 1;
  });
  if (noResults) noResults.hidden = visible !== 0;
}

if (searchInput) {
  searchInput.addEventListener("input", (event) => filterPosts(event.target.value));
}

document.querySelectorAll("[data-category]").forEach((link) => {
  link.addEventListener("click", () => {
    if (!searchInput) return;
    searchInput.value = link.dataset.category || "";
    filterPosts(searchInput.value);
    searchInput.focus();
  });
});
