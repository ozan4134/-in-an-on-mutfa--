// Menü Verileri (Dizi içinde objeler)
const menu = [
  {
    id: 1,
    title: "Tteokbokki",
    category: "Korea",
    price: 11.99,
    img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    desc: "Spicy rice cakes, serving with fish cake.",
  },
  {
    id: 2,
    title: "Chicken Ramen",
    category: "Japan",
    price: 13.99,
    img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    desc: "Chicken noodle soup, serving with vegetables and egg.",
  },
  {
    id: 3,
    title: "Bibimbap",
    category: "Korea",
    price: 8.99,
    img: "https://images.unsplash.com/photo-1553163147-622ab57be1c2?auto=format&fit=crop&w=800&q=80",
    desc: "Boiled vegetables, serving with special sauce.",
  },
  {
    id: 4,
    title: "Dan Dan Mian",
    category: "China",
    price: 5.99,
    img: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80",
    desc: "Dan dan noodle, serving with green onion.",
  },
  {
    id: 5,
    title: "Yangzhou Fried Rice",
    category: "China",
    price: 12.99,
    img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
    desc: "Yangzhou style fried rice, serving with vegetables.",
  },
  {
    id: 6,
    title: "Onigiri",
    category: "Japan",
    price: 9.99,
    img: "https://images.unsplash.com/photo-1607301459265-f9353932822a?auto=format&fit=crop&w=800&q=80",
    desc: "Rice ball, serving with seaweed.",
  }
];

// DOM Elemanlarını Seçme
const sectionCenter = document.querySelector(".section-center");
const btnContainer = document.querySelector(".btn-container");

// Sayfa Yüklendiğinde Tüm Menüyü ve Butonları Göster
window.addEventListener("DOMContentLoaded", function () {
  displayMenuItems(menu);
  displayMenuButtons();
});

// Menü Elemanlarını Ekrana Bastırma (Map Metodu Kullanımı)
function displayMenuItems(menuItems) {
  let displayMenu = menuItems.map(function (item) {
    return `<div class="menu-items col-lg-6 col-sm-12">
          <img src=${item.img} alt=${item.title} class="photo">
          <div class="menu-info">
            <div class="menu-title">
              <h4>${item.title}</h4>
              <h4 class="price">${item.price}</h4>
            </div>
            <div class="menu-text">
              ${item.desc}
            </div>
          </div>
        </div>`;
  });
  displayMenu = displayMenu.join("");
  sectionCenter.innerHTML = displayMenu;
}

// Kategori Butonlarını Dinamik Oluşturma (Reduce ve Map Kullanımı)
function displayMenuButtons() {
  // reduce ile benzersiz kategorileri ve "All" seçeneğini topluyoruz
  const categories = menu.reduce(
    function (values, item) {
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    ["All"]
  );

  const categoryBtns = categories
    .map(function (category) {
      return `<button type="button" class="btn btn-outline-dark btn-item" data-id=${category}>${category}</button>`;
    })
    .join("");

  btnContainer.innerHTML = categoryBtns;
  
  // Butonlara Tıklama Olayı Ekleme (Filter Metodu)
  const filterBtns = btnContainer.querySelectorAll(".btn-item");
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      const category = e.currentTarget.dataset.id;
      
      // Filter metodu ile kategoriye göre süzme
      const menuCategory = menu.filter(function (menuItem) {
        if (menuItem.category === category) {
          return menuItem;
        }
      });

      if (category === "All") {
        displayMenuItems(menu);
      } else {
        displayMenuItems(menuCategory);
      }
    });
  });
}