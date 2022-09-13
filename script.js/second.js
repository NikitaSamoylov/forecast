const todayTemperature = document.querySelector('.main_temperature>span')
const windValue = document.querySelector('.wind_value');
const weatherIcon = document.querySelector('.city_info>img');
const cloudy = document.querySelector('.cloudy_value');
const visibility = document.querySelector('.visibility_value');
const inputField = document.querySelector('.search_field');
const submitBtn = document.querySelector('.submit_button');
const cityMainName = document.querySelector('.city');
const body = document.querySelector('body');
const cities = document.querySelectorAll('.city_item');
const chooseDay = document.querySelector('.currentDate');
const menuList = document.querySelector('.menu_list');
const dayList = document.querySelectorAll('.menu_item');
const dropDownIcon = document.querySelector('.dropdown');
const main = document.querySelector('main');

const DAYS_NAMES = ['сегодня', 'завтра', 'послезавтра'];

const RAYN_DAY = 'дождь';
const STRONG_RAYN_DAY = 'ливень';
const CLEAR_DAY = 'ясно';
const SUN_DAY = 'солнечно';

const WIND_STRENGTH_VALUE = [0.2, 5.5, 10.8, 20.7, 32.6];
const WIND_STRENGTH_NAME = ['нет', 'легкий', 'умеренный', 'сильный', 'шторм', 'сильный шторм', 'неизвестно'];

let city = 'Самара';
const getServerResponse = async (cityParam) => {
    const response = await  fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${cityParam}&key=ef4eca2591374621ad68c297f2530617&hours=12&lang=ru&days=3`)
    let result = await response.json()
    cityMainName.textContent = cityParam
    getTodayData(result)
}
getServerResponse(city);

const isWind = (windParam) => {
    if (windParam <= WIND_STRENGTH_VALUE[0]) {
        windParam = WIND_STRENGTH_NAME[0]
    }
    else if  (windParam > WIND_STRENGTH_VALUE[0] && windParam <= WIND_STRENGTH_VALUE[1]) {
        windParam = WIND_STRENGTH_NAME[1]
    }
    else if (windParam > WIND_STRENGTH_VALUE[1] && windParam <= WIND_STRENGTH_VALUE[2]) {
        windParam = WIND_STRENGTH_NAME[2]
    }
    else if (windParam > WIND_STRENGTH_VALUE[2] && windParam <= WIND_STRENGTH_VALUE[3]) {
        windParam = WIND_STRENGTH_NAME[3]
    }
    else if (windParam > WIND_STRENGTH_VALUE[3] && windParam <= WIND_STRENGTH_VALUE[4]) {
        windParam = WIND_STRENGTH_NAME[4]
    }
    else if (windParam >= WIND_STRENGTH_VALUE[5]) {
        windParam = WIND_STRENGTH_NAME[5]
    }else{
        windParam = WIND_STRENGTH_NAME[6]
    }
    windValue.textContent = windParam
}

const changeBackground = (cloudyArray) => {
    cloudyArray.forEach((elem) => {
        if (elem[0] == RAYN_DAY || elem[1] == RAYN_DAY || elem[2] == RAYN_DAY || elem[0] == STRONG_RAYN_DAY || elem[1] == STRONG_RAYN_DAY || elem[2] == STRONG_RAYN_DAY)
        {
            body.style.backgroundImage = "url('../images/main-images/rain_day.jpg')"
                    let date = new Date().getHours()
                    if (date > 22) {
                        body.style.backgroundImage = "url('../images/main-images/night_rain.jpg')"
                    }  
        }
        else if (elem[0] == SUN_DAY || elem[1] == SUN_DAY || elem[2] == SUN_DAY || elem[0] == CLEAR_DAY || elem[1] == CLEAR_DAY || elem[2] == CLEAR_DAY) {
            body.style.backgroundImage = "url('../images/main-images/day_sun.jpg')"
        }
        else {
            body.style.backgroundImage = "url('../images/main-images/day_pic_2.jpg')"
        }
    })
}

const displayCurrentData = (weatherSet) => {
    let cloudyArray = [];
    cloudy.textContent = weatherSet.weather.description
    let cloudyName = cloudy.textContent
    let cloudyToLowerCase = cloudyName.toLocaleLowerCase()
    let cloudyNameSplit = cloudyToLowerCase.split(' ')
    cloudyArray.push(cloudyNameSplit)

    todayTemperature.innerHTML = Math.round(weatherSet.temp) + '&deg;'
    windValue.textContent = `${weatherSet.wind_spd} м/с`
    const windSpeed = weatherSet.wind_spd
    weatherIcon.src = `/icons/icons/icons/${weatherSet.weather.icon}.png`
    weatherIcon.getAttribute('alt').textContent = weatherSet.weather.description
    visibility.textContent = `${Math.round(weatherSet.vis)} км`
    changeBackground(cloudyArray)
    isWind(windSpeed)
}

const getTodayData = (value) => {
    let weatherSet;
    if (chooseDay.textContent === DAYS_NAMES[0]) {
        weatherSet = value.data[0]
    }
   else if (chooseDay.textContent === DAYS_NAMES[1]) {
        weatherSet = value.data[1]
    }
    else if (chooseDay.textContent === DAYS_NAMES[2]) {
        weatherSet = value.data[2]
    }
    displayCurrentData(weatherSet)
    }

submitBtn.addEventListener('click', function(evt) {
    evt.preventDefault()
    if (inputField.value !== ''){
    city = inputField.value
    getServerResponse(city)
    } else {
        alert('Введите название города')
    }
})
cities.forEach(el => {
    el.addEventListener('click', (evt => {
        inputField.value = evt.target.textContent
        submitBtn.click()
    }))
})

    dayList.forEach((q) => {
        q.addEventListener('click', (evt => {
            chooseDay.textContent = evt.target.textContent
            menuList.classList.add('hidden')
            dropDownIcon.src = '/icons/open.svg'
            getServerResponse(city)
        }))
    }) 
    const hideDay = () => {
    dayList.forEach((i) => {
        i.classList.remove('hidden')
        if (i.textContent === chooseDay.textContent) {
            i.classList.add('hidden')
        } else {
            return
        }
    })
}
chooseDay.addEventListener('click', function() {
    if (menuList.classList.contains('hidden')) {
        dropDownIcon.src = '/icons/close.svg'
        menuList.classList.remove('hidden')
        hideDay()
    }else{
        menuList.classList.add('hidden')
        dropDownIcon.src = '/icons/open.svg'
    }
})
dropDownIcon.addEventListener('click', () => {
    chooseDay.click()
})


// const mQuery = window.matchMedia('(max-width: 644px)')

// function handleMobilePhoneResize(e) {   
//    // Проверяем, верен ли медиа-запрос
//    if (e.matches) {   
//     chooseDay.addEventListener('click', function() {
//         if (menuList.classList.contains('hidden')) {
//             dropDownIcon.src = '/icons/close.svg'
//             menuList.classList.remove('hidden')
//             hideDay()
//         }else{
//             main.classList.add('blur')
//             menuList.style.zIndex = 3;
//             dropDownIcon.src = '/icons/open.svg'
//         }
//     })  
//    } 
// } 

// // Настраиваем слушателя событий
// mQuery.addListener(handleMobilePhoneResize)