const products = [
  {
    name: "A06s",
    description: "یک گوشی اقتصادی مقرون به صرفه",
    price: "8000000 تومان",
    colors: ["black", "white", "red"],
    image: "A06s.jpg",
    quantity: 1,
    selectedColor: "white"
  },
  {
    name: "A16",
    description: "یک گوشی میان رده مقرون به صرفه",
    price: "18000000 تومان",
    colors: ["black", "blue"],
    image: "A16.jpg",
     quantity: 1,
    selectedColor: "blue"
  },
  {
  name: "Redmi Note 12",
  description: "عملکرد سریع با صفحه نمایش AMOLED",
  price: "11500000 تومان",
  colors: ["blue", "white", "gray"],
  image: "note12.jpg",
  quantity: 1,
  selectedColor: "blue"
},

{
  name: "iPhone 13",
  description: "قدرت و ظرافت در کنار تجربه کاربری بی نظیر",
  price: "45000000 تومان",
  colors: ["black", "white", "pink"],
  image: "iphone13.jpg",
  quantity: 1,
  selectedColor: "white"
},

{
  name: "Galaxy S22 Ultra",
  description: "پرچم دار سامسونگ با قلم S pen و پردازنده 120Hz",
  price: "62000000 تومان",
  colors: ["black", "burgundy", "green"],
  image: "s22ultra.jpg",
  quantity: 1,
  selectedColor: "green"
},

{
  name: "Poco X5 Pro",
  description: "Snapdragon گوشی مخصوص گیمینگ با پردازنده ",
  price: "10900000 تومان",
  colors: ["yellow", "black", "blue"],
  image: "poco_x5pro.jpg",
  quantity: 1,
  selectedColor: "yellow"
},

{
  name: "Galaxy A24",
  description: "گوشی میان رده با دوربین قوی و باتری با دوام",
  price: "12500000 تومان",
  colors: ["black", "green", "silver"],
  image: "a24.jpg",
  quantity: 1,
  selectedColor: "black"
}
];

// ساخت کارت‌ها با createElement
function renderProducts(products) {
  const productsContainer = document.getElementById("products-container");

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.dataset.selectedColor = product.colors[0];

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    image.className = "product-image";

    const name = document.createElement("h2");
    name.className = "product-name";
    name.textContent = product.name;

    const description = document.createElement("p");
    description.className = "product-description";
    description.textContent = product.description;

    const details = document.createElement("div");
    details.className = "product-details";

    const price = document.createElement("span");
    price.className = "product-price";
    price.textContent = product.price;

    const colors = document.createElement("span");
    colors.className = "product-colors";
    
      // نمایش رنگ‌ها به صورت دایره رنگی
    let selectedColor = product.colors[0];
    product.colors.forEach(color => {
      const dot = document.createElement("span");
      dot.className = "color-dot";
      dot.style.backgroundColor = color;
      dot.addEventListener("click" , () => {
        selectedColor = color;
        colors.querySelectorAll(".color-dot").forEach(dot => {
            dot.classList.remove("active");
        });
        dot.classList.add("active");
        card.dataset.selectedColor = color;
      });
      colors.appendChild(dot);
    })
  

    details.appendChild(price);
    details.appendChild(colors);

    const button = document.createElement("button");
    button.className = "add-to-cart";
    button.textContent = "افزودن به سبد خرید";

    // افزودن محصول به سبد خرید
    button.addEventListener("click", () => {
     const selectedColor = card.dataset.selectedColor;
        addToCart(product , selectedColor);
    });

    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(description);
    card.appendChild(details);
    card.appendChild(button);

    productsContainer.appendChild(card);
  });
}

// افزودن به سبد خرید + ذخیره در localStorage
function addToCart(product , selectedColor) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const exictingProductIndex = cart.findIndex(item => item.name === product.name && item.selectedColor === selectedColor );
  if ( exictingProductIndex !== -1){ 
    cart[exictingProductIndex].quantity = Number(cart[exictingProductIndex].quantity)+ 1;
  }
  else {
    const productToadd = {
        ...product , 
        selectedColor : selectedColor ,
        quantity : 1
    };
    cart.push(productToadd);
  }
  localStorage.setItem("cart" , JSON.stringify(cart));
  updateCartCount();

}

// به‌روزرسانی تعداد آیتم‌های سبد خرید
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalCount = cart.reduce((sum , item) => sum + Number(item.quantity) , 0 );
  document.getElementById("cart-count").textContent = totalCount;
}

// اجرای برنامه
renderProducts(products);
updateCartCount();

const hamburger = document.querySelector(".nav-hamburger");
const navMenu = document.getElementById("nav-menu");
hamburger.addEventListener("click" , () => { navMenu.classList.toggle("active");});