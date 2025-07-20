// گرفتن container اصلی
const container = document.getElementById("post-detail");

// گرفتن id از URL
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

// پیدا کردن پست مربوطه
const posts = JSON.parse(localStorage.getItem("posts") || "[]");
const post = posts.find(p => p.id == id); // توجه: از == به‌جای === استفاده کن چون id در لوکال‌استوریج رشته است


if (post) {
  // تولید محتوای HTML برای پست
  container.innerHTML = `
    <div class="card shadow p-4">
      <img src="${post.image}" class="card-img-top mb-3" alt="${post.title}">
      <h1 class="mb-3">${post.title}</h1>
      <p class="text-muted mb-2">${post.date} | ${post.category}</p>
      <p>${post.content}</p>
      <a href="blog.html" class="btn btn-outline-secondary mt-3">بازگشت به وبلاگ</a>
    </div>

    <hr class="my-4">
    <h4 class="mb-3">ارسال نظر</h4>
    <form id="comment-form" class="mb-4">
      <div class="mb-3">
        <input type="text" class="form-control" id="name" placeholder="نام شما" required />
      </div>
      <div class="mb-3">
        <textarea class="form-control" id="comment" rows="3" placeholder="متن نظر" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">ارسال</button>
    </form>

    <h5 class="mt-4">نظرات</h5>
    <ul id="comment-list" class="list-group"></ul>
  `;

  // حالا که عناصر در DOM هستن، مجدد می‌گیریمشون
  const commentForm = document.getElementById("comment-form");
  const commentList = document.getElementById("comment-list");

  const commentsKey = `comments_post_${id}`;
  let comments = JSON.parse(localStorage.getItem(commentsKey)) || [];

  // نمایش نظرات
  function renderComments() {
    commentList.innerHTML = "";
    comments.forEach(c => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.innerHTML = `<strong>${c.name}:</strong> ${c.text}`;
      commentList.appendChild(li);
    });
  }
  renderComments();

  // هندل کردن ارسال نظر جدید
  commentForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const text = document.getElementById("comment").value.trim();

    if (name && text) {
      comments.push({ name, text });
      localStorage.setItem(commentsKey, JSON.stringify(comments));
      renderComments();
      commentForm.reset();
    }
     
  });
    

} else {
  container.innerHTML = `
    <div class="alert alert-danger">پست مورد نظر پیدا نشد!</div>
    <a href="blog.html" class="btn btn-secondary mt-3">بازگشت به لیست مطالب</a>
  `;
}




