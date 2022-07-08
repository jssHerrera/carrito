// -----------------------------------
// variables
let carritoContainer = [];
const lista_cursos = document.querySelector("#lista-curos");
const lista_shop = document.getElementById("shop");
const eliminar = document.querySelector(".cart");
// ------------------------------------
// Ligth - Darck
const theme = document.querySelector("#theme-button");
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");
// ------------------------------------
// open and Closed shop
const shop = document.querySelector(".bx-shopping-bag");
const hide = document.querySelector(".cart__close");
const cart = document.getElementById("cart");
// ===================================================

const eventListener = () => {
  document.addEventListener("DOMContentLoaded", () => {


    // ------------------------------------
    // eventos
    // ------------------------------------
    carritoContainer= JSON.parse(localStorage.getItem("shop")) || [];

    render_carrito();

    if (selectedTheme) {
      document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
        "dark-theme"
      );
      theme.classList[selectedIcon === "bx bx-moon" ? "add" : "remove"](
        "bx-sun"
      );
    }

    theme.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");
      theme.classList.toggle("bx-sun");
      // ---------------------------------------
      localStorage.setItem("selected-theme", getCurrentTheme());
      localStorage.setItem("selected-icon", getCurrentIcon());
    });

    // open - Closed --> shop
    // ------------------------------------
    shop.addEventListener("click", () => {
      cart.classList.add("show-cart");
    });

    hide.addEventListener("click", () => {
      cart.classList.remove("show-cart");
    });

    // Agregar Curso
    // ------------------------------------
    lista_cursos.addEventListener("click", (e) => {
      const btn = e.target.classList.contains("products__button");
      if (btn) {
        const listaCurso = e.target.parentElement;
        agregarCarrito(listaCurso);
      }
    });

    // Eliminar Curso
    // ------------------------------------
    eliminar.addEventListener("click", (e) => {
      const cursoID = e.target.getAttribute("data-id");
      carritoContainer = carritoContainer.filter((elem) => elem.id !== cursoID);
      localStorage.setItem("shop", JSON.stringify(carritoContainer));

      render_carrito();
    });
  });

};
// ===================================================

// ------------------------------------
// Functions
// ------------------------------------

const getCurrentTheme = () => {
  let theme = document.body.classList.contains("dark-theme");
  if (theme) {
    return "dark";
  } else {
    return "light";
  }
};
const getCurrentIcon = () => {
  let ico = theme.classList.contains("bx-sun");
  if (ico) {
    return "bx bx-moon";
  } else {
    return "bx bx-sun";
  }
};
// ----------------------------------
const agregarCarrito = (listaCurso) => {
  const info__curso = {
    imagen: listaCurso.querySelector("img").src,
    titulo: listaCurso.querySelector("h3").textContent,
    precio: listaCurso.querySelector(".products__price").textContent,
    id: listaCurso.querySelector("button").getAttribute("data-id"),
    cantidad: 1,
  };

  const existe = carritoContainer.some((elem) => elem.id === info__curso.id);
  if (existe) {
    const cursos = carritoContainer.map((elem) => {
      if (elem.id === info__curso.id) {
        elem.cantidad++;
        return elem;
      } else {
        return elem;
      }
    });
    carritoContainer = [...cursos];
  } else {
    carritoContainer = [...carritoContainer, info__curso];
  }
  localStorage.setItem("shop", JSON.stringify(carritoContainer));
  render_carrito();
};

//  render Carrito
// ----------------------------------
const render_carrito = () => {
  limpiar();
  carritoContainer.forEach((elem) => {
    const row = document.createElement("article");
    row.classList.add("cart__card");
    row.innerHTML = `
    <div class="cart__box">
      <img src="${elem.imagen}" alt="" class="cart__img" />
    </div>

    <div class="cart__details">
      <div class="cart__title card__title-product">
        <p>${elem.titulo}</p>
      </div>
      <span class="cart__price">${elem.precio}</span>

      <div class="cart__amount">
        <div class="cart__amount-content">
          <span class="cart__amount-box">
            <i class="bx bx-minus"></i>
          </span>

          <span class="cart__amount-number">${elem.cantidad}</span>

          <span class="cart__amount-box  ">
            <i class="bx bx-plus"></i>
          </span>
        </div>

        <i id='delete' class="bx bxs-trash cart__amount-trash" data-id="${elem.id}"></i>
      </div>
    </div>
  `;
    lista_shop.appendChild(row);
  });
};

// Limpiar Carrito
// ----------------------------------
const limpiar = () => {
  while (lista_shop.firstChild) {
    lista_shop.removeChild(lista_shop.firstChild);
  }
};

eventListener();
