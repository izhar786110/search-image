let page = 1;

let API = `https://api.unsplash.com/search/photos?page=${page}&query=`;
let example_API = `https://api.unsplash.com/search/photos?page=${page}&query=india`;
const ACESS_KEY = "pPf0b6TnHCt3ROnc3nzNo1RpP42QQl_Cqbt68X7Hq9c";
const API_KEY = "P1ZKa3tQkyVd9AP5m0xWwA==UrAtl9WiFSr8cYrK";

const form = document.querySelector("form");
const input = document.querySelector("input");
const resultsContainer = document.querySelector(".results-containainer");
const loader = document.querySelector(".loader");

let images = [];

showDefault();

async function showDefault() {
  let data = await getData(example_API);
  data = data.results;
  images = data;
  displayData(images);
  const loadMore = document.createElement("button");
  loadMore.innerText = "Load More...";
  loadMore.classList.add("load-more");
  loadMore.addEventListener("click", async (e) => {
    page += 1;
    example_API = `https://api.unsplash.com/search/photos?page=${page}&query=avengers`;
    let data = await getData(example_API);
    images = images.concat(data.results);
    console.log(images);
    displayData(images);
  });
  loader.innerHTML = "";
  loader.append(loadMore);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = input.value;
  const data = await getData(API + query);
  images = data.results;
  displayData(images);
  const loadMore = document.createElement("button");
  loadMore.innerText = "Load More...";
  loadMore.classList.add("load-more");
  loadMore.addEventListener("click", async (e) => {
    page += 1;
    API = `https://api.unsplash.com/search/photos?page=${page}&query=`;
    const query = input.value;
    const data = await getData(API + query);
    images = images.concat(images, data.results);
    images.splice(0, 10);
    console.log(images);
    displayData(images);
  });
  loader.innerHTML = "";
  loader.append(loadMore);
});

async function getData(url) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Client-ID ${ACESS_KEY}`,
    },
  });
  const result = await response.json();
  return result;
}

function displayData(arr) {
  resultsContainer.innerHTML = "";
  const fragment = document.createDocumentFragment();
  arr.forEach((obj) => {
    const parent = document.createElement("div");
    parent.classList.add("parent");
    const image = document.createElement("img");
    image.src = obj.urls.small;
    image.alt = obj.alt_description;
    const description = document.createElement("a");
    description.href = obj.links.html;
    description.innerText = obj.alt_description;
    description.target = "blank";
    parent.append(image, description);
    fragment.append(parent);
  });
  resultsContainer.append(fragment);
}