const api = {
    endpoint: "https://api.openweathermap.org/data/2.5/",
    key: "c04d083d05627ce997a86e2e6130b0a7"
}
const apiLocation ={
    endpoint: "https://ipgeolocation.abstractapi.com/v1/",
    key: "3de954f68fd4457e91814b462f762b87"
}

gsap.from(".wrapper", {opacity:0, duration: 3, delay: 0.5})

getLocation()

let input = document.querySelector('#input');
input.addEventListener('keydown', enter);
function enter(e) {
    if(e.keyCode === 13){
        getInfo(input.value);
    }
}

async function getLocation(location){
    let res = await fetch(`${apiLocation.endpoint}?api_key=${apiLocation.key}`);
    let result = await res.json();
    getInfo(result.city)
}

async function getInfo(data) {
    let res = await fetch(`${api.endpoint}weather?q=${data}&units=imperial&appid=${api.key}`);
    let result = await res.json();
    displayResult(result);
}

function displayResult(result) {
    getMyDate();
    let city = document.querySelector('#city')
    city.textContent =`${result.name}, ${result.sys.country}`;

    let temperature = document.querySelector('#temperature')
    temperature.textContent = `${Math.floor(result.main.temp)}°`;

    let feelsLike = document.querySelector('#feelsLike')
    feelsLike.textContent = `Feels like: ${Math.floor(result.main.feels_like)}°`;

    let condition = document.querySelector('#condition');
    condition.textContent = `${result.weather[0].main}`

    let variation = document.querySelector('#variation');
    variation.textContent = `Min: ${Math.floor(result.main.temp_min)}° Max: ${Math.floor(result.main.temp_max)}°`;

    let icon = document.querySelector('#icon');
    icon.innerHTML= `<img src="http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png" alt="icon" width="120px">`
}

function getMyDate(){
    let myDate = new Date()
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let day = weekdays[myDate.getDay()];
    let date = myDate.getDate();
    let month = months[myDate.getMonth()];
    let year = myDate.getFullYear();

    let showDate = document.querySelector('#date');
    showDate.textContent = `${day}, ${month} ${date}, ${year}`;
}