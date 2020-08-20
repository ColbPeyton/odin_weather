import React, {useState, useEffect} from 'react';
import DisplayImage from './DisplayImage';
import DisplayWeather from './DisplayWeather';
import getImage from '../helpers/getImage';
import getWeather from '../helpers/getWeather';
import Form from './Form';
import { weatherKey } from '../keys/key_weather';

function Weather(){
    const [currentLocation, setLocation] = useState({city: 'london', stateCode: 'uk' , unit:'imperial'});
    const [currentImage, setImage] = useState('weather');
    const [currentWeather, setWeather] = useState('');


    useEffect(()=>{
        makeInitialAPICalls(callImage(currentImage),callWeather());
        
    }, [])

    async function makeInitialAPICalls(image, weather){
        const response = await Promise.all([image, weather]);
        setImage(response[0]);
        setWeather(response[1]);
    }

    async function callAPILoop(){
        const responseWeather = await callWeather().then(data=>{ return data})
        setWeather(responseWeather);
        const responseImage = await callImage(currentWeather.weather[0].description).then(data=>{return data});
        setImage(responseImage);

    }

    async function callWeather(){
        console.log(currentLocation)
        return await getWeather(currentLocation.city, currentLocation.stateCode, currentLocation.unit);
    }

    async function callImage(img){
        return await getImage(img);
    }


    async function retrieveWeatherData(city, stateCode, unit){
        const location = {city, stateCode, unit}
        setLocation(prevState => {
                prevState.city = location.city;
                prevState.stateCode = location.stateCode;
                prevState.unit = location.unit;
        });
        callAPILoop();
    }

    function showWeather(){
        if(currentWeather){
            return <DisplayWeather data={currentWeather} />
        }
        return '';
    }

    return(
        <div>
            <DisplayImage imageUrl={currentImage}/>
            {/* {showWeather()} */}
            <Form retrieveWeatherData={retrieveWeatherData}/>
        </div>
    );
}

export default Weather;