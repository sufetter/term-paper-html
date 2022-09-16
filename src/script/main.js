function loadXMLDoc(dname) {
  if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
  } else {
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xhttp.open("GET", dname, false);
  xhttp.send();
  return xhttp.responseXML;
}
xmlDoc = loadXMLDoc("src/xml/pop-goods.xml");
function local(item, name) {
  if (localStorage.getItem(name)) {
    if (item == basket) {
      basket = localStorage.getItem(name);
      basket = basket.split(",");
    } else if (item == chosen) {
      chosen = localStorage.getItem(name);
      chosen = chosen.split(",");
    } else if (item == compare) {
      compare = localStorage.getItem(name);
      compare = compare.split(",");
    }
  } else {
    localStorage.setItem(name, item);
  }
}
function reLocal(item, name) {
  localStorage.setItem(name, item);
}
let basket = [];
let chosen = [];
let compare = [];
local(basket, "basket");
local(chosen, "chosen");
local(compare, "compare");
let head;
let b = document.getElementsByClassName("in-busket");
function clearHead(event) {
  let el = event.target
    .closest(".good")
    .getElementsByClassName("name")[0].innerHTML;
  head.splice(head.indexOf(el), 1);
  renew(head);
}
function renew(mass) {
  if (mass === basket) {
    reLocal(basket, "basket");
  } else if (mass == chosen) {
    reLocal(chosen, "basket");
  } else if (mass == compare) {
    reLocal(compare, "basket");
  }
  document.getElementById("basket-goods").innerHTML = "";
  document.getElementById("kol").innerHTML = 0;
  let price = 00;
  if (mass.length === 0 && mass === basket) {
    document.getElementById("rub").innerHTML = price;
    document.getElementById("amount").innerHTML = 0;
  }
  for (let i = 0; i < mass.length; i++) {
    for (let k = 0; k < 12; k++) {
      if (
        mass[i] ==
        xmlDoc.getElementsByTagName("good")[k].getElementsByTagName("name")[0]
          .innerHTML
      ) {
        document.getElementById("amount").innerHTML = basket.length;
        document.getElementById("kol").innerHTML = mass.length;
        document.getElementById("basket-goods").innerHTML +=
          '<img class="long-line" src="src/images/long-line.png" /><div class="good"><img onClick="goodClick(event)" class="good-img" src="' +
          xmlDoc.getElementsByTagName("good")[k].getElementsByTagName("src")[0]
            .innerHTML +
          '" /><div onClick="goodClick(event)" class="text"><p class="name">' +
          xmlDoc.getElementsByTagName("good")[k].getElementsByTagName("name")[0]
            .innerHTML +
          '</p><div onClick="goodClick(event)" class="price"><div class="literal"><p class="literal-rub">' +
          xmlDoc
            .getElementsByTagName("good")
            [k].getElementsByTagName("price")[0].innerHTML +
          '</p><p class="literal-kop">.00</p></div><p class="before-price">' +
          Math.round(
            (xmlDoc
              .getElementsByTagName("good")
              [k].getElementsByTagName("price")[0].innerHTML /
              8) *
              10
          ) +
          '.00</p></div></div><div class="buttons"><button onClick="inBasket(event)">В корзину</button><img  onClick="clearHead(event)" src="src/images/litter.png" /></div></div>';
        if (mass === basket) {
          price += +xmlDoc
            .getElementsByTagName("good")
            [k].getElementsByTagName("price")[0].innerHTML;
          document.getElementById("rub").innerHTML = price;
        }
        break;
      }
    }
  }
}
function inBasket(event) {
  if (event.target.closest(".main-good")) {
    basket.push(
      event.target.closest(".main-good").getElementsByClassName("name")[0]
        .innerHTML
    );
  } else
    basket.push(
      event.target.closest(".good").getElementsByClassName("name")[0].innerHTML
    );
  renew(basket);
}
for (let i = 0; i < b.length; i++) {
  let el = b[i];
  el.addEventListener("click", inBasket);
}
let mainGoods = document.getElementsByClassName("main-good");
renew(basket);
for (let i = 0; i < 12; i++) {
  el = xmlDoc.getElementsByTagName("good")[i];
  mainGoods[i].getElementsByClassName("main-good-img")[0].src =
    el.getElementsByTagName("src")[0].innerHTML;
  mainGoods[i].getElementsByClassName("good-mark")[0].innerHTML =
    el.getElementsByTagName("mark")[0].innerHTML;
  mainGoods[i].getElementsByClassName("name")[0].innerHTML =
    el.getElementsByTagName("name")[0].innerHTML;
  let price = el.getElementsByTagName("price")[0].innerHTML;
  mainGoods[i].getElementsByClassName("literal-rub")[0].innerHTML = price;
  let beforePrice = Math.round((price * 10) / 8);
  let minusPrice = beforePrice - price;
  mainGoods[i].getElementsByClassName("before-price")[0].innerHTML =
    beforePrice + ".00";
  mainGoods[i].getElementsByClassName("minus-price")[0].innerHTML = -minusPrice;
  mainGoods[i].getElementsByClassName("good-code")[0].innerHTML =
    el.getElementsByTagName("code")[0].innerHTML;
}

document.getElementById("catalog").addEventListener("click", function () {
  let element = document.getElementById("katalog-drop");
  element.classList.toggle("katalog-drop-right");
});
document.getElementById("tel").addEventListener("click", function () {
  let element = document.getElementById("num-drop");
  element.classList.toggle("num-drop-down");
});
let headerClick = function (event) {
  if (
    event.target.closest("div").classList[0] == "menu-buttons" ||
    event.target.classList[0] == "bottom-button"
  ) {
    if (
      event.target.closest("div").id == "chosen" ||
      event.target.id == "chosen-bottom"
    ) {
      renew(chosen);
      head = chosen;
    } else {
      renew(compare);
      head = compare;
    }
    document.getElementById("end").style.display = "none";
  } else {
    document.getElementById("end").style.display = "flex";
    head = basket;
    renew(basket);
  }
  document.getElementById("header-drop").classList.toggle("header-drop-down");
};
document.getElementById("chosen").addEventListener("click", headerClick);
document.getElementById("compare").addEventListener("click", headerClick);
document.getElementById("buy").addEventListener("click", headerClick);
document.getElementById("header-cross").addEventListener("click", headerClick);
document.getElementById("chosen-bottom").addEventListener("click", headerClick);
document
  .getElementById("compare-bottom")
  .addEventListener("click", headerClick);
document.getElementById("buy-bottom").addEventListener("click", headerClick);
let popEl;
function helpClick(event) {
  document.body.style.overflow = "hidden";
  document.getElementsByClassName("pop-up")[0].style.display = "flex";
  popEl = document
    .getElementsByClassName("pop-up")[0]
    .getElementsByClassName(event.target.id)[0];
  if (!popEl) {
    popEl = document
      .getElementsByClassName("pop-up")[0]
      .getElementsByClassName(event.target.id.split("-")[0])[0];
  }
  popEl.style.display = "block";
}
function endClick() {
  document.body.style.overflow = "hidden";
  document.getElementsByClassName("pop-up")[0].style.display = "flex";
  popEl = document.getElementById("end-show");
  popEl.style.display = "block";
}
document.getElementById("payment").addEventListener("click", helpClick);
document.getElementById("delivery").addEventListener("click", helpClick);
document.getElementById("selfCaring").addEventListener("click", helpClick);
document.getElementById("help").addEventListener("click", helpClick);
document.getElementById("pay-bottom").addEventListener("click", helpClick);
document.getElementById("delivery-bottom").addEventListener("click", helpClick);
document
  .getElementById("selfCaring-bottom")
  .addEventListener("click", helpClick);
document.getElementById("help-bottom").addEventListener("click", helpClick);
document.getElementById("end").addEventListener("click", endClick);
let oneClick = document.getElementsByClassName("one-click");
for (let i = 0; i < oneClick.length; i++) {
  let el = oneClick[i];
  el.addEventListener("click", endClick);
}
function popNone(event) {
  if (event.target.closest("div") == popEl && !event.target.closest("button")) {
    return;
  }
  popEl.style.display = "none";
  document.getElementsByClassName("pop-up")[0].style.display = "none";
  document.body.style.overflowY = "scroll";
}
document.getElementsByClassName("pop-up")[0].addEventListener("click", popNone);
document.getElementById("bottom-info").addEventListener("click", () => {
  document.getElementById("low-info").classList.toggle("low-info-up");
});
function search() {
  localStorage.setItem("search", document.getElementById("input-search").value);
}
document.getElementById("search").addEventListener("click", search);
let katS = document.getElementsByClassName("katalog-search");
function katSearch(event) {
  localStorage.setItem(
    "search",
    event.target.closest("div").getElementsByTagName("p")[0].innerHTML
  );
}
for (let i = 0; i < katS.length; i++) {
  katS[i].addEventListener("click", katSearch);
}
document.getElementById("input-search").addEventListener("keyup", (event) => {
  if (event.code === "Enter") {
    search();
    document.location.href = "../../choise.html";
  }
});
function goodClick(event) {
  if (event.target.closest("button") || event.target.closest(".one-click")) {
    return;
  }
  if (event.target.closest(".main-good")) {
    localStorage.setItem(
      "good",
      event.target.closest(".main-good").getElementsByClassName("name")[0]
        .innerHTML
    );
    document.location.href = "../../good.html";
  } else if (event.target.closest(".good")) {
    localStorage.setItem(
      "good",
      event.target.closest(".good").getElementsByClassName("name")[0].innerHTML
    );
    document.location.href = "../../good.html";
  }
}
for (let i = 0; i < document.getElementsByClassName("main-good").length; i++) {
  let el = document.getElementsByClassName("main-good")[i];
  el.addEventListener("click", goodClick);
}
