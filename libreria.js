const divRiga = document.getElementById("riga");

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
      const divCol = document.createElement("div");
      divCol.classList.add("col");
      const divCard = document.createElement("div");
      divCard.classList.add("card", "h-100");
      const img = document.createElement("img");
      img.classList.add("card-img-top", "h-75");
      img.setAttribute("src", data[i].img);
      img.setAttribute("alt", data[i].title);
      const divBody = document.createElement("div");
      divBody.classList.add("card-body");
      const h5 = document.createElement("h5");
      h5.innerText = data[i].title;
      const p = document.createElement("p");
      p.innerText = "Price: " + data[i].price + "$";
      const dFlex = document.createElement("div");
      dFlex.classList.add("d-flex", "justify-content-evenly");
      const buttonR = document.createElement("button");
      buttonR.setAttribute("type", "button");
      buttonR.classList.add("btn", "btn-danger", "removeCard");
      buttonR.innerText = "REMOVE";
      const buttonC = document.createElement("button");
      buttonC.setAttribute("type", "button");
      buttonC.classList.add("btn", "btn-success");
      buttonC.innerText = "BUY";

      dFlex.appendChild(buttonC);
      dFlex.appendChild(buttonR);
      divBody.appendChild(h5);
      divBody.appendChild(p);
      divBody.appendChild(dFlex);
      divCard.appendChild(img);
      divCard.appendChild(divBody);
      divCol.appendChild(divCard);
      divRiga.appendChild(divCol);
    }
    const buttons = document.querySelectorAll(".removeCard");
    buttons.forEach((button) => {
      button.addEventListener("click", function () {
        const card =
          this.parentElement.parentElement.parentElement.parentElement;
        console.log(card);
        card.remove();
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });
