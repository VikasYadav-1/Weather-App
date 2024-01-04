const tempStatus = 'Clouds';

const searchBtn = document.getElementById('search-btn')
const searchBar = document.getElementById('searchbar')
const currDate = document.getElementById('date')

getCurrentDay=()=>{
	let d = new Date();

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var date=d.getDate();
	let year=d.getFullYear();
    let hrs=d.getHours();
    let mins=d.getMinutes();
    let periods="AM";

    if(hrs >= 12) {
        periods="PM";
    }
    if(hrs > 12) {
        hrs-=12;
	}
    if(hrs < 10){
        hrs = "0" + hrs;
    }
    if(mins < 10) {
		mins = "0" + mins;
	}

	return `${days[d.getDay()]} | ${date} ${months[d.getMonth()]}, ${year} | ${hrs}:${mins} ${periods}`
}

setInterval(() => {
	currDate.innerHTML = getCurrentDay();
},1000)


// Weather integration

let weather = {
    apiKey: "4774fe0f030c7352f227affe44207177",
    fetchWeather: function(city) { 
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
        + city
        + "&units=metric&appid="
        + this.apiKey)
        .then(response => response.json())
        .then((data) => this.displayWeather(data))
    },
    displayWeather: function(data) {
        const {icon, description} = data.weather[0]
        const {name} = data
        const {country} = data.sys
        const {temp, temp_min, temp_max, feels_like, humidity} = data.main
        const {speed} = data.wind
        
        document.getElementById("weathercon").src = "https://openweathermap.org/img/wn/" + icon + "@4x.png"
        document.getElementById("desc").innerHTML = description
        document.getElementById("location").innerHTML = name
        document.getElementById("country").innerHTML = country
        document.getElementById("temp").innerHTML = temp
        document.getElementById("min-temp").innerHTML = temp_min
        document.getElementById("max-temp").innerHTML = temp_max
        document.getElementById("feels").innerHTML = feels_like
        document.getElementById("humidity").innerHTML = humidity
        document.getElementById("speed").innerHTML = speed
        document.querySelector(".info").classList.remove("dummy")
    },
    search: function() {
        this.fetchWeather(searchBar.value)
    }
}

searchBtn.addEventListener('click', () => {
    weather.search()
})

searchBar.addEventListener('keyup', (event) => {
    if(event.key == "Enter") {
        weather.search()
    }
})

weather.fetchWeather("Gurugram")
