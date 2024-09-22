let coinsTable = document.querySelector(".currency-list");

function renderCoin(data) {
  let newRow = document.createElement("a");
  newRow.classList.add("currency-list-info");

  let leftContainer = document.createElement("div");
  leftContainer.classList.add("left-list");

  let rightContainer = document.createElement("div");
  rightContainer.classList.add("right-list");

  let rank = document.createElement("h4");
  rank.textContent = data.rank;

  let nameContainer = document.createElement("div");
  nameContainer.classList.add("currency-name");

  let nameImage = document.createElement("img");
  let symbolLowerCase = data.symbol.toLowerCase();
  let imageUrl =
    "https://assets.coincap.io/assets/icons/" + symbolLowerCase + "@2x.png";
  nameImage.src = imageUrl;
  let nameGroup = document.createElement("div");

  let currencyName = document.createElement("h4");
  currencyName.textContent = data.symbol;

  let currencyAbr = document.createElement("h5");
  currencyAbr.textContent = data.name;

  let price = document.createElement("h4");
  price.textContent = numeral(data.priceUsd).format("($ 0,0.00)");

  let market = document.createElement("h4");

  market.textContent = numeral(data.marketCapUsd).format("($ 0.00 a)");

  let vwap = document.createElement("h4");
  vwap.textContent = numeral(data.vwap24Hr).format("($ 0,0.00)");

  let supply = document.createElement("h4");
  supply.textContent = numeral(data.supply).format("($ 0.00 a)");

  let volume = document.createElement("h4");
  volume.textContent = numeral(data.volumeUsd24Hr).format("($ 0.00 a)");

  let change = document.createElement("h4");
  change.textContent = Number(data.changePercent24Hr).toFixed(2);

  leftContainer.appendChild(rank);
  leftContainer.appendChild(nameContainer);
  nameContainer.appendChild(nameImage);
  nameContainer.appendChild(nameGroup);
  nameGroup.appendChild(currencyName);
  nameGroup.appendChild(currencyAbr);
  rightContainer.appendChild(price);
  rightContainer.appendChild(market);
  rightContainer.appendChild(vwap);
  rightContainer.appendChild(supply);
  rightContainer.appendChild(volume);
  rightContainer.appendChild(change);

  newRow.appendChild(leftContainer);
  newRow.appendChild(rightContainer);

  coinsTable.appendChild(newRow);
}

function renderError() {
  let errorContainer = document.createElement("div");
  errorContainer.textContent = "An Error occurred...";
  errorContainer.classList.add("error");

  coinsTable.appendChild(errorContainer);
}

function renderLoading() {
  let loadingContainer = document.createElement("div");
  loadingContainer.textContent = "Loading...";
  loadingContainer.classList.add("loading");

  coinsTable.appendChild(loadingContainer);
}

function removeLoading() {
  let loadingEl = document.querySelector(".loading");
  coinsTable.removeChild(loadingEl);
}

let baseUrl = "https://api.coincap.io/v2";

let currentOffset = 0;

async function getAssetsList() {
  let assetsUrl =
    "https://api.coincap.io/v2/assets?offset=" + currentOffset + "&limit=20";
  let response = await fetch(assetsUrl);
  let totalData = await response.json();

  return totalData.data;
}

async function renderCoinList() {
  let list = await getAssetsList();

  list.forEach(function (item) {
    renderCoin(item);
  });
}

let moreButton = document.querySelector("#more");

moreButton.addEventListener("click", function () {
  currentOffset += 20;
  renderCoinList();
});

renderLoading();
renderCoinList()
  .catch(function (error) {
    renderError();
  })
  .finally(function () {
    removeLoading();
  });
