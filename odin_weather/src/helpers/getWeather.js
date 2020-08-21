import {weatherKey} from '../keys/key_weather';


// takes in passed city/unit data. Returns data from openweather API.
async function getWeather(city, unit='imperial'){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}&units=${unit}`);
        const weatherData = await response.json();
        return weatherData;
    }
    catch(error){
        console.log('City Not Found')
    }
}


export default getWeather;