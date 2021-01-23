const baseUrl = "https://platzi-avo.vercel.app";
const appNode = document.querySelector("#app");
appNode.style.display = "flex";
appNode.style.flexWrap = "wrap";
appNode.style.margin = "0 auto";
appNode.style.justifyContent = "center";

const formatPrice = (price) => {
  const newPrice = new window.Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(price);

  return newPrice;
};

//Web API
window.fetch(`${baseUrl}/api/avo`).then((response) =>
  response.json().then((responseJson) => {
    const allItems = [];
    responseJson.data.forEach((item) => {
      // Create title
      const title = document.createElement("h2");
      title.textContent = item.name;
      title.className = "text-lg";

      // Create img
      const image = document.createElement("img");
      image.className =
        "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6";
      image.src = `${baseUrl}${item.image}`;

      // Create price
      const price = document.createElement("span");
      price.className = "text-gray-600";
      price.textContent = formatPrice(item.price);

      const taste = document.createElement("p");
      taste.textContent = item.attributes.taste;
      taste.className = "italic";

      const priceAndTitle = document.createElement("div");
      priceAndTitle.className = "text-center md:text-left";
      priceAndTitle.appendChild(title);
      priceAndTitle.appendChild(price);
      priceAndTitle.appendChild(taste);

      // Wrap Img and priceAndTitle
      // <div class="md:flex bg-white rounded-lg p-6">
      const card = document.createElement("div");
      card.className = "md:flex bg-white rounded-lg p-6 hover:bg-gray-300";
      card.appendChild(image);
      card.appendChild(priceAndTitle);
      card.style.width = "40%";

      // Add nodes to array
      allItems.push(card);
      console.log(item);
    });

    appNode.append(...allItems);
  })
);
