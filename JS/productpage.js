const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const url = `http://michalinaoniszczuk.com/examwp/wp-json/wp/v2/product/${id}?_embed`;

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    handleData(data);
  });
//populating the product page

function handleData(product) {
  console.log(product);
  document.querySelector(".product_name").textContent = product.product_name;
  document.querySelector(".product_description").textContent =
    product.description;
  document.querySelector(".capacity").textContent = `${product.capacity}ml`;
  document.querySelector(".height").textContent = `Height: ${product.height}mm`;
  document.querySelector(".width").textContent = `Width: ${product.width}mm`;
  document.querySelector(".radius").textContent = `Radius: ${product.radius}mm`;
  document.querySelector(".price").textContent = `${product.price} DKK`;
  document.querySelector("img.firstproduct").src =
    product._embedded["wp:featuredmedia"][0].source_url;
  document.querySelector("img#otherview1").src = product.images[0].guid;
  document.querySelector("img#otherview2").src = product.images[1].guid;
  document.querySelector("img#otherview3").src = product.images[2].guid;
}
