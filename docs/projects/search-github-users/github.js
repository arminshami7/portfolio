const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const resultBox = document.getElementById("user-result");
const loader = document.getElementById("loader");

form.addEventListener("submit", async e => {
    e.preventDefault();

    const username = input.value.trim();
    const url = `https://api.github.com/users/${username}`;
    
    loader.classList.remove("hidden");
    resultBox.innerHTML = "";

    try{
        const res = await fetch(url);
        if(!res.ok){

            loader.classList.add("hidden");
            resultBox.innerHTML = "<p> کاربر پیدا نشد </p>";
            return;
        }
        const data = await res.json();
        loader.classList.add("hidden");

         resultBox.innerHTML = `
    <img src="${data.avatar_url}" width="100" />
    <p>نام کاربری: ${data.login}</p>
    <p><a href="${data.html_url}" target="_blank">مشاهده پروفایل</a></p> `;

    }
    catch(error){
        resultBox.innerHTML = "<p> خطا در ارتباط با سرور</p>";
    }
   
})