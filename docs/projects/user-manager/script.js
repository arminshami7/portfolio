const form = document.getElementById("user-form");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const messageBox = document.getElementById("form-message");
const userList = document.getElementById("user-list");
 document.getElementById("clear-all").addEventListener("click", function(){
        localStorage.removeItem("users");
        renderUsers();
      });
let isEditMode = false;
let editUserId = null;


function renderUsers(searchTerm = "") {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  userList.innerHTML = "";

  const filteredUsers = 
  users.filter( user => 

    user.username.toLowerCase().includes(searchTerm) || 
    user.email.toLowerCase().includes(searchTerm)
  );
  if(filteredUsers.length !==0){
    document.getElementById("user-count").textContent = `تعداد کاربران: ${filteredUsers.length}`;
     
    }

      if (filteredUsers.length === 0){
        userList.innerHTML = "<p> هیج کاربری ثبت نشده است</p>";
        return;
      }

  filteredUsers.forEach(user => {
    const userCard = document.createElement("div");
    userCard.className = "user-card";
    userCard.innerHTML = `
      <p><strong>نام:</strong> ${user.username}</p>
      <p><strong>ایمیل:</strong> ${user.email}</p>
    `;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "حذف";
    deleteBtn.addEventListener("click", function(){ 
        deleteUser(user.id);
      });

      
     
    const editBtn = document.createElement("button");
    editBtn.textContent = "ویرایش";
    editBtn.addEventListener("click", function() {
      usernameInput.value = user.username;
      emailInput.value = user.email;
      passwordInput.value = user.password;
      isEditMode = true;
      editUserId = user.id;
    })
    userCard.appendChild(deleteBtn);
    userCard.appendChild(editBtn)
    userList.appendChild(userCard);
  });
}




function deleteUser(id){
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users = users.filter(user => user.id !== id);
    localStorage.setItem("users", JSON.stringify(users));
    renderUsers();
};


form.addEventListener("submit" , function(e){ e.preventDefault();

const username = usernameInput.value.trim();
const email = emailInput.value.trim();
const password = passwordInput.value.trim();

document.getElementById("username-error").textContent = "";
document.getElementById("email-error").textContent = "";
document.getElementById("password-error").textContent = "";

let haserror = false;
if(username === ""){
    document.getElementById("username-error").textContent = "نام کاربری نمیتواند خالی باشد";
    haserror = true;
}
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 if (!emailRegex.test(email)){
  document.getElementById("email-error").textContent = "ایمیل معتبر نیست";  
  haserror = true;
 }
 if (password.length < 6){
    document.getElementById("password-error").textContent = " رمز باید حداقل 6 کاراکتر باشد";
    haserror = true;
 }

if(!haserror){
   if (isEditMode){
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users = users.map(u => { 
     if( u.id === editUserId){
      return{
        ...u,
        username,
        email,
        password
      };
     }
     return u;
    });

    localStorage.setItem("users", JSON.stringify(users));
    messageBox.textContent = "ویرایش با موفقیت انجام شد";
    isEditMode = false;
    editUserId = null;
   } 
  
  else { let newuser = {
        id: Date.now(),
        username: username,
        email: email,
        password: password,
    };
    
    let users = 
    JSON.parse(localStorage.getItem("users")) || [];
     users.push(newuser);
     localStorage.setItem("users" , JSON.stringify(users));
     
 document.getElementById("form-message").textContent = "کاربر با موفقیت اضافه شد";

  }

  form.reset();
  renderUsers();
}
});

renderUsers();
 
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", function(){
  renderUsers(this.value.trim().toLowerCase());
});