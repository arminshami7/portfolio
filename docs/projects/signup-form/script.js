const form = document.getElementById("signup-form");

form.addEventListener("submit", function(e){
  e.preventDefault(); 
  
  let haserror = false;

const username = document.getElementById("username").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
console.log( username,email,password);


document.getElementById("username-error").textContent = "";
document.getElementById("email-error").textContent = "";
document.getElementById("password-error").textContent = "";


if(username === ""){
    document.getElementById("username-error").textContent = " نام کاربری نمی تواند خالی باشد";
    haserror = true;
}
const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailregex.test(email)){
    document.getElementById("email-error").textContent = "ایمیل معتبر نیست";
    haserror = true;
}
if(password.length < 6){
    document.getElementById("password-error").textContent = "رمز باید حد اقل 6 کاراکتر باشد";
    haserror = true;
}
if (!haserror){

    document.getElementById("message").textContent = "ثبت نام موفقیت امیز بود";
    
    form.reset();

    document.getElementById("username-error").textContent = "";
    document.getElementById("email-error").textContent = "";
    document.getElementById("password-error").textContent = "";
}
});
