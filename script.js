const API_ID = "097c6fba56a0403f890de340101c5612";
const url = "https://newsapi.org/v2/everything?q=";
window.addEventListener("load", () => {
  fetchNews("India");
});
function reload() {
  window.location.reload();
}
async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_ID}`);
  const data = await res.json();
  binding(data.articles);
  console.log(data.articles);
}
function binding(articles) {
  const cont = document.querySelector(".card-container");
  const template = document.querySelector("#card-template");
  cont.innerHTML = "";
  articles.forEach((article) => {
    if (!article.urlToImage) {
      return;
    }
    const newCard_template = template.content.cloneNode(true);
    fillData(newCard_template, article);
    cont.appendChild(newCard_template);
  });
}
function fillData(newCard_template, article) {
  const img = newCard_template.querySelector("#news-img");
  const tit = newCard_template.querySelector("#news-title");
  const source = newCard_template.querySelector("#news-src");
  const dsc = newCard_template.querySelector("#news-dsc");
  img.src = article.urlToImage;
  tit.innerHTML = article.title;
  dsc.innerHTML = article.description;
  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  source.innerHTML = `${article.source.name}.${date}`;
  newCard_template.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}
let curnav_item = null;
function nav_trans(id) {
  fetchNews(id);
  const navitm = document.getElementById(id);
  curnav_item?.classList.remove("active");
  curnav_item = navitm;
  curnav_item.classList.add("active");
}
const search_btn = document.getElementById("searchbtn");
const search_txt = document.getElementById("searchtxt");
search_btn.addEventListener("click", () => {
  const query = search_txt.value;
  if (!query) return;
  fetchNews(query);
  curnav_item?.classList.remove("active");
  curnav_item = null;
});
