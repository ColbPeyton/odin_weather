import {weatherKey} from '../keys/key_weather';



async function getWeather(city, state='', unit='imperial'){
    try{
        let completeSearch = '';

        if(state){
            completeSearch = `${city},${state}`;
        }else{
            completeSearch = `${city}`;

        }
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${completeSearch}&appid=${weatherKey}&units=${unit}`);
        const weatherData = await response.json();
        return weatherData;
    }
    catch(error){
        console.log(error)
    }
}


export default getWeather;