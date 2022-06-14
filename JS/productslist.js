const urlParams = new URLSearchParams(window.location.search);
const categories = urlParams.get("categories");
console.log(urlParams.get("categories"));

let url =
  "http://michalinaoniszczuk.com/examwp/wp-json/wp/v2/product?categories=";

if (categories) {
  url += `${categories}&_embed`;
}

console.log(url);

fetch(url)
  .then((res) => res.json())
  .then(setupCollection);

function setupCollection(catArray) {
  catArray.forEach((prod) => {
    console.log(prod);
    document.querySelector(".shopby h2").textContent = prod.collection;
    document.querySelector(".breadcrumbs a:nth-child(2)").textContent = prod.collection;
    //grab template
    const template = document.querySelector("template#product_card").content;
    //clone template
    const copy = template.cloneNode(true);
    copy.querySelector("img").src =
      prod._embedded["wp:featuredmedia"][0].source_url;
    copy.querySelector("h2").textContent = prod.product_name;
    copy.querySelector("p.price").textContent = prod.price;
    copy
      .querySelector("a")
      .setAttribute("href", `productpage.html?id=${prod.id}`);
      //grab parent
    const parentElement = document.querySelector("main");
    //append
    parentElement.appendChild(copy);
  });
}
