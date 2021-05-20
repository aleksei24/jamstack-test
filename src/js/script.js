// weather

function success(pos) {
    const notification = document.querySelector('.notification');
    const appTemp = document.querySelector('.app-temperature p');
    const appTempFeel = document.querySelector('.app-temp-feel p');
    const appWindDir = document.querySelector('.app-wind-direction');
    const appWind = document.querySelector('.app-wind-power');
    const appDescript = document.querySelector('.app-description p');
    const appLocation = document.querySelector('.location p');

    const weather = {};
    const today = new Date();

    const url = `/.netlify/functions/weatherapi?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=metric&lang=ru`;

    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log('Data: ', data);
            notification.innerHTML = today.toLocaleDateString('ru-RU');
            appTemp.innerHTML = `${data.main.temp.toFixed()}° <span>C</span>`;
            appTempFeel.innerHTML = `${data.main.feels_like.toFixed()}° <span>C</span>`;
            appWind.textContent = `${data.wind.speed.toFixed()} m/s`;
            appDescript.innerHTML = `${data.weather[0].description}`;
            appLocation.innerHTML = `${data.name}, ${data.sys.country}`;
            appWindDir.textContent = `${data.wind.deg}°`;
            if (data.wind.deg >= 0 && data.wind.deg <= 22) {
                appWindDir.textContent = 'северный';
            } else if (data.wind.deg >= 23 && data.wind.deg <= 67) {
                appWindDir.textContent = 'северо-восточный';
            } else if (data.wind.deg >= 68 && data.wind.deg <= 112) {
                appWindDir.textContent = 'восточный';
            } else if (data.wind.deg >= 113 && data.wind.deg <= 147) {
                appWindDir.textContent = 'юго-восточный';
            } else if (data.wind.deg >= 148 && data.wind.deg <= 202) {
                appWindDir.textContent = 'южный';
            } else if (data.wind.deg >= 203 && data.wind.deg <= 247) {
                appWindDir.textContent = 'юго-западный';
            } else if (data.wind.deg >= 248 && data.wind.deg <= 292) {
                appWindDir.textContent = 'западный';
            } else if (data.wind.deg >= 293 && data.wind.deg <= 336) {
                appWindDir.textContent = 'северо-западный';
            } else if (data.wind.deg >= 293 && data.wind.deg <= 360) {
                appWindDir.textContent = 'north';
            }
        });
}

if (!Date.now) {
    Date.now = function now() {
        return new Date().getTime();
    };
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
}
function windDirection(data) {
    let direction = '';
    if (data.wind.deg >= 0 && data.wind.deg <= 22) {
        direction.textContent = 'north';
    } else if (data.wind.deg >= 23 && data.wind.deg <= 67) {
        direction.textContent = 'north-east';
    } else if (data.wind.deg >= 68 && data.wind.deg <= 112) {
        direction.textContent = 'east';
    } else if (data.wind.deg >= 113 && data.wind.deg <= 147) {
        direction.textContent = 'south-east';
    } else if (data.wind.deg >= 148 && data.wind.deg <= 202) {
        direction.textContent = 'south';
    } else if (data.wind.deg >= 203 && data.wind.deg <= 247) {
        direction.textContent = 'south-west';
    } else if (data.wind.deg >= 248 && data.wind.deg <= 292) {
        direction.textContent = 'west';
    } else if (data.wind.deg >= 293 && data.wind.deg <= 336) {
        direction.textContent = 'north-west';
    } else if (data.wind.deg >= 293 && data.wind.deg <= 360) {
        direction.textContent = 'north';
    }
}
