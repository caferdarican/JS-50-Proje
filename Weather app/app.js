const searchInput = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weather = document.querySelector(".weather");

const key = "5089d45fcfd0a43f7c3e250550595faf";

async function getWeatherData(cityName) {
  try {
    if (cityName == "") {
      throw new Error("Lütfen Bir Şehir Giriniz!");
    }
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric`
    );
    if (!response.ok) {
      throw new Error("Şehir Bulunamadı!");
    }
    const data = await response.json();
    getWeatherCard(data);
  } catch (err) {
    renderError(err);
  }
}

searchBtn.addEventListener("click", () => getWeatherData(searchInput.value));
document.addEventListener("keyup", (e) => {
  if (e.keyCode == 13) {
    getWeatherData(searchInput.value);
  }
});

const getImage = (data) => {
  if (data.weather[0].main == "Clear") {
    let image = "images/clear.png";
    return image;
  } else if (data.weather[0].main == "Clouds") {
    let image = "images/clouds.png";
    return image;
  } else if (data.weather[0].main == "Rain") {
    let image = "images/rain.png";
    return image;
  } else if (data.weather[0].main == "Snow") {
    let image = "images/snow.png";
    return image;
  } else if (data.weather[0].main == "Drizzle") {
    let image = "images/drizzle.png";
    return image;
  } else if (data.weather[0].main == "Mist") {
    let image = "images/mist.png";
    return image;
  }
};

const getName = (data) => {
  if (searchInput.value == data.name) {
    return data.name;
  } else {
    let metin = searchInput.value[0].toUpperCase() + searchInput.value.slice(1);
    return metin;
  }
};

const getWeatherCard = (data) => {
  weather.innerHTML = "";
  let html = `
    <img src="${getImage(data)}" alt="" class="weather-icon" />
          <h1>${Math.round(data.main.temp)}°C</h1>
          <h2>${getName(data)}</h2>
          <div class="details">
            <div class="col">
              <img src="images/humidity.png" alt="" />
              <div>
                <p>Nem</p>
                <p>${data.main.humidity}%</p>
              </div>
            </div>
            <div class="col">
              <img src="images/wind.png" alt="" />
              <div>
                <p>Rüzgâr</p>
                <p>${Math.round(data.wind.speed)} km/s</p>
              </div>
            </div>
          </div>
    `;

  weather.insertAdjacentHTML("afterbegin", html);
  searchInput.value = "";
};

const renderError = (err) => {
  let html = `
    <div class="alert">
    ${err.message}
    </div>
    `;
  weather.innerHTML = html;
  searchInput.value = "";
  setTimeout(() => {
    weather.innerHTML = "";
  }, 3000);
};
