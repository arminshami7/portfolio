const defaultPosts = [
  {
    id: "1",
    title: "فرق بین Flex و Grid",
    content: "توضیح کوتاه درباره Flex و Grid...",
    category: "طراحی وب",
    image: "https://placehold.co/300x200?text=بدون+تصویر",
    date: new Date().toISOString(),
  },
  {
    id: "2",
    title: "چطور یه صفحه واکنش‌گرا بسازیم",
    content: "مبانی طراحی واکنش‌گرا...",
    category: "طراحی وب",
    image: "https://placehold.co/300x200?text=بدون+تصویر",
    date: new Date().toISOString(),
  }
];

// اگر LocalStorage خالی بود، داده اولیه را ذخیره کن
if (!localStorage.getItem("posts")) {
  localStorage.setItem("posts", JSON.stringify(defaultPosts));
}

let blogPosts = JSON.parse(localStorage.getItem("posts"));

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const categoryFilter = document.getElementById("category-filter");
  const blogContainer = document.getElementById("blog-posts");

  const allPosts = JSON.parse(localStorage.getItem("posts") || "[]");

  function renderPosts(posts) {
    blogContainer.innerHTML = "";
    if (posts.length === 0) {
      blogContainer.innerHTML = "<p class='text-center'>مطلبی پیدا نشد.</p>";
      return;
    }
    posts.forEach(post => {
      const card = document.createElement("div");
      card.className = "col-md-4 mb-4";
      card.classList.add("animate__animated", "animate__fadeInUp");

      card.innerHTML = `
        <div class="card h-100 shadow-sm border-0 hover-shadow transition">
          <img src="${post.image}" class="card-img-top" alt="${post.title}">
          <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="text-muted mb-1">${post.date} | ${post.category}</p>
            <p class="card-text">${post.content.slice(0, 70)}...</p>
            <a href="blog-post.html?id=${post.id}" class="btn btn-outline-primary">مطالعه</a>
          </div>
        </div>
      `;
      blogContainer.appendChild(card);
    });
  }

  

  function applyFilters() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;

    // فیلتر روی آرایه ترکیبی
    const filtered = allPosts.filter(post => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm);

      const matchesCategory =
        selectedCategory === "" || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    renderPosts(filtered);
  }

  // رویدادها
  searchInput.addEventListener("input", applyFilters);
  categoryFilter.addEventListener("change", applyFilters);

  // نمایش اولیه
 
  applyFilters();
});
