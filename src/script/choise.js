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
function clearHead(event) {
  let el = event.target
    .closest(".good")
    .getElementsByClassName("name")[0].innerHTML;
  if (head == basket) {
    basket.splice(head.indexOf(el), 1);
    renew(basket);
  } else if (head == chosen) {
    chosen.splice(head.indexOf(el), 1);
    renew(chosen);
  } else if (head == compare) {
    compare.splice(head.indexOf(el), 1);
    renew(compare);
  }
}
function renew(mass) {
  if (mass === basket) {
    reLocal(basket, "basket");
  } else if (mass == chosen) {
    reLocal(chosen, "chosen");
  } else if (mass == compare) {
    reLocal(compare, "compare");
  }
  head = mass;
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
          '<img class="long-line" src="src/images/long-line.png" /><div class="good"><img onclick="goodClick(event)" class="good-img" src="' +
          xmlDoc.getElementsByTagName("good")[k].getElementsByTagName("src")[0]
            .innerHTML +
          '" /><div class="text"><p class="name">' +
          xmlDoc.getElementsByTagName("good")[k].getElementsByTagName("name")[0]
            .innerHTML +
          '</p><div class="price"><div class="literal"><p class="literal-rub">' +
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
renew(basket);
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
function inBasket(event) {
  if (event.target.closest(".choose__goods-good")) {
    basket.push(
      event.target
        .closest(".choose__goods-good")
        .getElementsByClassName("name")[0].innerHTML
    );
  } else {
    basket.push(
      event.target.closest(".good").getElementsByClassName("name")[0].innerHTML
    );
  }
  renew(basket);
}
function inChosen(event) {
  if (event.target.closest(".choose__goods-good")) {
    chosen.push(
      event.target
        .closest(".choose__goods-good")
        .getElementsByClassName("name")[0].innerHTML
    );
  } else {
    chosen.push(
      event.target.closest(".good").getElementsByClassName("name")[0].innerHTML
    );
  }
  renew(chosen);
}
function inComparison(event) {
  if (event.target.closest(".choose__goods-good")) {
    compare.push(
      event.target
        .closest(".choose__goods-good")
        .getElementsByClassName("name")[0].innerHTML
    );
  } else {
    compare.push(
      event.target.closest(".good").getElementsByClassName("name")[0].innerHTML
    );
  }
  renew(compare);
}
function load() {
  document.getElementsByClassName("choose__goods")[0].innerHTML = "";
  for (let i = 0; i < 12; i++) {
    let search = localStorage.getItem("search").toLowerCase();
    document.getElementsByTagName("h1")[0].innerHTML = search;
    document.getElementById("bold").innerHTML = search;
    let el = xmlDoc.getElementsByTagName("good")[i];
    let name = el.getElementsByTagName("name")[0].innerHTML.toLowerCase();
    let kategory = el
      .getElementsByTagName("kategory")[0]
      .innerHTML.toLowerCase();
    let price = +el.getElementsByTagName("price")[0].innerHTML;
    if (
      (name.includes(search) ||
        kategory.includes(search) ||
        search.includes(name) ||
        search.includes(kategory)) &&
      document.getElementById("from").value < price &&
      (document.getElementById("to").value > price ||
        document.getElementById("to").value == "")
    ) {
      let beforePrice = Math.round((price / 8) * 10);
      let mark = el.getElementsByTagName("mark")[0].innerHTML;
      let date = new Date();
      let day = 1 + date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let date1 = day + "." + month + "." + year;
      let date2 = 1 + day + "." + month + "." + year;
      let safe = "";
      safe +=
        '<div class="choose__goods-good"><img src="' +
        el.getElementsByTagName("src")[0].innerHTML +
        '" alt="" class="choose__goods-good-image"/><div class="char"><div class="sale">-20%</div><div><h5 class="name">' +
        el.getElementsByTagName("name")[0].innerHTML +
        '</h5><p class="aval">В наличии</p><div class="row"><img src="src/images/star.png" alt="" class="star" /><p class="mark">' +
        mark +
        "</p></div></div><div>";
      for (let i = 0; el.getElementsByTagName("char")[i]; i++) {
        safe +=
          '<div class="row" > ' +
          el.getElementsByTagName("char")[i].innerHTML +
          "</div>";
      }
      safe +=
        '</div><div><div class="row">Доставка:⠀<span>' +
        date2 +
        '</span></div><div class="row">Самовывоз:⠀<span>' +
        date1 +
        '</span></div></div></div><div class="buy"><div class="text"><p class="code">' +
        el.getElementsByTagName("code")[0].innerHTML +
        '</p><div class="price"><div><p class="before-price">' +
        beforePrice +
        '.00</p><p class="minus-price">' +
        -(beforePrice - price) +
        '</p></div><div><p class="literal-rub">' +
        price +
        '</p><p class="literal-kop">.00</p></div></div><img src="src/images/line.svg" alt="" class="line" /><img src="src/images/shortLine.svg" class="short-line" /><p class="info">Оплата частями от 45 руб/мес</p></div><div class="buttons"><div class="like"><img src="src/images/chosen.png" onclick="inChosen(event)" alt="" class="chosen" /> <img src="src/images/comparison.png" onclick="inComparison(event)" alt="" class="comparison"/></div><div class="get"><button onclick="inBasket(event)" class="in-basket">В корзину</button><img class="clickBuy" title="Нажмите для мнгновенного заказа товара" src="src/images/OneClickBuy.svg" alt="Клик" /></div></div></div></div>';
      document.getElementsByClassName("choose__goods")[0].innerHTML += safe;
    }
  }
  function goodClick(event) {
    if (
      event.target.closest(".buttons") ||
      event.target.closest(".clickBuy") ||
      event.target.closest(".chosen") ||
      event.target.closest(".comparison")
    ) {
      return;
    }
    if (event.target.closest(".choose__goods-good")) {
      localStorage.setItem(
        "good",
        event.target
          .closest(".choose__goods-good")
          .getElementsByClassName("name")[0].innerHTML
      );
      document.location.href = "../../good.html";
    } else if (event.target.closest(".good")) {
      localStorage.setItem(
        "good",
        event.target.closest(".good").getElementsByClassName("name")[0]
          .innerHTML
      );
      document.location.href = "../../good.html";
    }
  }
  for (
    let i = 0;
    i < document.getElementsByClassName("choose__goods-good").length;
    i++
  ) {
    let el = document.getElementsByClassName("choose__goods-good")[i];
    addEventListener("click", goodClick);
  }
}
load();
function search() {
  localStorage.setItem("search", document.getElementById("input-search").value);
  load();
}
document.getElementById("search").addEventListener("click", search);
document.getElementById("from").addEventListener("input", load);
document.getElementById("to").addEventListener("input", load);
document.getElementById("catalog").addEventListener("click", function () {
  let element = document.getElementById("katalog-drop");
  element.classList.toggle("katalog-drop-right");
});
document.getElementById("tel").addEventListener("click", function () {
  let element = document.getElementById("num-drop");
  element.classList.toggle("num-drop-down");
});
let kat = document.getElementById("katalog-drop").getElementsByTagName("div");
for (let i = 0; i < kat.length; i++) {
  el = kat[i];
  el.addEventListener("click", function (event) {
    localStorage.setItem(
      "search",
      event.target.closest("div").getElementsByTagName("p")[0].innerHTML
    );
    load();
  });
}
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
let oneClick = document.getElementsByClassName("clickBuy");
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
document.getElementById("input-search").addEventListener("keyup", (event) => {
  if (event.code === "Enter") {
    search();
    load();
  }
});
