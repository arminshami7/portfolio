document.addEventListener("DOMContentLoaded", () => {
  

  const form = document.getElementById("postForm");
  const postsList = document.getElementById("postsList");
  form.parentNode.appendChild(postsList);

  function loadPosts() {
    let posts = JSON.parse(localStorage.getItem("posts") || "[]");
    postsList.innerHTML = "<h3 class='mt-4'>پست‌های ذخیره شده</h3>";

    if(posts.length === 0){
      postsList.innerHTML += "<p>پستی وجود ندارد.</p>";
      return;
    }

    posts.forEach(post => {
      const postDiv = document.createElement("div");
      postDiv.className = "border p-3 mb-2 rounded bg-white";

      postDiv.innerHTML = `
        <h5>${post.title}</h5>
        <p>${post.content.slice(0, 80)}...</p>
        <small>دسته: ${post.category} | تاریخ: ${new Date(post.date).toLocaleString()}</small>
      <br/>
  <button class="btn btn-sm btn-warning mt-2 me-2">ویرایش</button>
  <button class="btn btn-sm btn-danger mt-2">حذف</button>
      `;

      const btnDelete = postDiv.querySelector(".btn-danger");
      const btnEdit = postDiv.querySelector(".btn-warning");

      btnDelete.addEventListener("click", () => {
        if(confirm("آیا مطمئن هستید که می‌خواهید این پست را حذف کنید؟")){
          deletePost(post.id);
        }
      });

      btnEdit.addEventListener("click", () => {
  titleInput.value = post.title;
  contentInput.value = post.content;
  categoryInput.value = post.category;
  imageInput.value = post.image;
  postIdInput.value = post.id;
  submitBtn.textContent = "ویرایش پست";
  cancelEditBtn.classList.remove("d-none");
});


      
      postsList.appendChild(postDiv);
    });
  }

  function deletePost(id) {
    let posts = JSON.parse(localStorage.getItem("posts") || "[]");
    posts = posts.filter(post => post.id !== id);
    localStorage.setItem("posts", JSON.stringify(posts));
    loadPosts();
  }

  
  const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const categoryInput = document.getElementById("category");
const imageInput = document.getElementById("image");
const postIdInput = document.getElementById("postId");
const submitBtn = document.getElementById("submitBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");


form.addEventListener("submit", event => {
  event.preventDefault();

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  const category = categoryInput.value;
  const image = imageInput.value.trim() || "https://placehold.co/300x200?text=بدون+تصویر";
  const id = postIdInput.value || Date.now().toString(); // اگر ویرایش، همون id، در غیر اینصورت جدید

  if (!title || !content || !category) {
    alert("لطفاً همه فیلدهای اجباری را پر کنید.");
    return;
  }

  let posts = JSON.parse(localStorage.getItem("posts") || "[]");
  const date = new Date().toISOString();

  if (postIdInput.value) {
    // حالت ویرایش: جایگزین کردن پست
    posts = posts.map(p => p.id === id ? { id, title, content, category, image, date: p.date } : p);
    alert("پست ویرایش شد!");
  } else {
    // حالت اضافه کردن پست جدید
    posts.push({ id, title, content, category, image, date });
    alert("پست با موفقیت ذخیره شد!");
  }

  localStorage.setItem("posts", JSON.stringify(posts));
  form.reset();
  categoryInput.value = "";
  postIdInput.value = "";
  submitBtn.textContent = "ذخیره پست";
  cancelEditBtn.classList.add("d-none");
  });

  loadPosts();
});

cancelEditBtn.addEventListener("click", () => {
  form.reset();
  postIdInput.value = "";
  submitBtn.textContent = "ذخیره پست";
  cancelEditBtn.classList.add("d-none");
});