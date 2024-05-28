//Variaveis
const apiKey =  "9c933a171d7db3b569a23e21298641f2";
const apiCountryURL = "https://flagsapi.com//flat/64.png";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempMinElement = document.querySelector("#temperature-min span");
const tempElement = document.querySelector("#temperature span");
const tempMaxElement = document.querySelector("#temperature-max span");
const feelsLikeElement = document.querySelector("#feels-like span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country img");
const umidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind");

const weatherContainer = document.querySelector("#weather-data");
const buttonsContainer = document.querySelector("#buttons-container");
const buttons = document.querySelectorAll(".button");
const backBtn = document.querySelector("#back-btn");


//Funções
const getWeatherData = async(city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`
    
    const res = await fetch(apiWeatherURL);
     const data = await res.json();

     return data;
    
}

const showWeatherData = async(city) => {
 const data = await getWeatherData(city);

    cityElement.innerText = data.name;;

    tempMinElement.innerText = parseInt(data.main.temp_min);
    tempElement.innerText = parseInt(data.main.temp);
    tempMaxElement.innerText = parseInt(data.main.temp_max);
    feelsLikeElement.innerText = parseInt(data.main.feels_like);

    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src", `https://flagsapi.com/${data.sys.country}/flat/64.png`);
   
    umidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;
    
    weatherContainer.classList.remove("hide");

}
//Eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    const city = cityInput.value;
    buttonsContainer.classList.add("hide");
    showWeatherData(city);
    cityInput.value = "";
})

cityInput.addEventListener("keyup", (e) => {
    if(e.code === "Enter") {
        const city = e.target.value;
         buttonsContainer.classList.add("hide");
        showWeatherData(city);
        cityInput.value = "";
    }
})
buttons.forEach((cityButton) => {
    cityButton.addEventListener("click",(e) => {
    city = e.target.innerText
    showWeatherData(city)
     buttonsContainer.classList.add("hide");
     cityInput.value = "";
    } )
})
backBtn.addEventListener("click", () => {
    weatherContainer.classList.add("hide");
    buttonsContainer.classList.remove("hide");
    cityInput.value = "";
})
