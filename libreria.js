const divRiga = document.getElementById("riga");

const createBookCard = function (book) {
  const divCol = document.createElement("div");
  divCol.classList.add("col");
  const divCard = document.createElement("div");
  divCard.classList.add("card", "h-100");

  const img = document.createElement("img");
  img.classList.add("card-img-top");
  img.setAttribute("src", book.img);
  img.setAttribute("alt", book.title);
  img.style.height = "400px";
  const divBody = document.createElement("div");
  divBody.classList.add(
    "card-body",
    "d-flex",
    "flex-column",
    "justify-content-between"
  );
  const h5 = document.createElement("h5");
  h5.innerText = book.title;
  const p = document.createElement("p");
  p.innerText = "Price: " + book.price + "$";
  const dFlex = document.createElement("div");
  dFlex.classList.add("d-flex", "justify-content-evenly");
  const buttonR = document.createElement("button");
  buttonR.setAttribute("type", "button");
  buttonR.classList.add("btn", "btn-danger", "removeCard");
  buttonR.innerText = "REMOVE";
  const buttonC = document.createElement("button");
  buttonC.setAttribute("type", "button");
  buttonC.classList.add("btn", "btn-success", "addToCart");
  buttonC.innerText = "BUY";
  const iconC = document.createElement("i");
  iconC.className = "bi bi-cart-plus-fill ms-3";

  buttonC.addEventListener("click", function () {
    const newTitle = book.title;
    localStorage.setItem("saveTitle", newTitle);
    const newPrice = book.price;
    localStorage.setItem("savePrice", newPrice);
    addToCart(book);
  });

  buttonC.appendChild(iconC);
  dFlex.appendChild(buttonC);
  dFlex.appendChild(buttonR);
  divBody.appendChild(h5);
  divBody.appendChild(p);
  divBody.appendChild(dFlex);
  divCard.appendChild(img);
  divCard.appendChild(divBody);
  divCol.appendChild(divCard);
  divRiga.appendChild(divCol);
  return divCol;
};
let cont = 0;
function removeCartItem() {
  // Ottieni il padre del pulsante (div con classe "d-flex")
  const parentDiv = this.parentElement;
  console.log(parentDiv);
  const price = parentDiv.querySelector(".price");
  console.log(parseFloat(price.innerText));
  cont = cont - parseFloat(price.innerText);
  totali(totLi);
  // Trova l'elemento successivo (l'hr)
  const nextElement = parentDiv.nextElementSibling;
  console.log(nextElement);
  // Rimuovi il padre (div con classe "d-flex") e l'elemento successivo (l'hr)
  parentDiv.remove();
  nextElement.remove();

  // Aggiorna il totale
}
const cartDiv = document.getElementById("cart");
const priceDiv = document.getElementById("price");

const addToCart = function (book) {
  const divFlex = document.createElement("div");
  divFlex.classList.add(
    "d-flex",
    "align-items-center",
    "text-center",
    "text-white"
  );
  const listArt = document.createElement("li");
  listArt.classList.add("col");
  listArt.innerText = book.title;
  const listPrice = document.createElement("li");
  listPrice.classList.add("col", "price");
  listPrice.innerText = book.price + "$";
  cont += parseFloat(book.price);
  console.log(cont);
  const buttonR = document.createElement("button");
  buttonR.setAttribute("type", "button");
  buttonR.classList.add("btn", "border-0");
  buttonR.addEventListener("click", removeCartItem);
  const iconR = document.createElement("i");
  iconR.className = "bi bi-cart-x-fill text-white";
  const liDivider = document.createElement("li");
  liDivider.classList.add("mb-2");
  const hrLi = document.createElement("hr");
  hrLi.classList.add("dropdown-divider");
  const totLi = document.getElementById("totLi");

  liDivider.appendChild(hrLi);
  buttonR.appendChild(iconR);

  divFlex.appendChild(listArt);
  divFlex.appendChild(listPrice);
  divFlex.appendChild(buttonR);
  cartDiv.appendChild(divFlex);
  cartDiv.appendChild(liDivider);
  totali(totLi);
};
const totali = function (totLi) {
  totLi.innerText = "";
  totLi.innerText = "Total Cart " + cont.toFixed(2) + "$";
};

fetch("https://striveschool-api.herokuapp.com/books")
  .then((res) => {
    if (res.ok) {
      console.log("ok");
      return res.json();
    } else {
      if (res.status === 404) {
        throw new Error("404 - Not Found");
      } else if (res.status === 500) {
        throw new Error("500 - Internal Server Error");
      } else {
        throw new Error("Errore generico");
      }
    }
  })
  .then((data) => {
    console.log("libri", data);
    //Primo Libro
    for (let i = 0; i < data.length; i++) {
      const bookCard = createBookCard(data[i]);
      divRiga.appendChild(bookCard);
    }
    const buttons = document.querySelectorAll(".removeCard");
    buttons.forEach((button) => {
      button.addEventListener("click", function () {
        const card = this.closest(".col");
        console.log(card);
        card.remove();
      });
    });
  })

  .catch((err) => {
    console.log(err);
  });
