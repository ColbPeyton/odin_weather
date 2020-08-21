import React, {useState, useEffect, useRef} from 'react';
import DisplayImage from './DisplayImage';
import DisplayWeather from './DisplayWeather';
import getImage from '../helpers/getImage';
import getWeather from '../helpers/getWeather';
import Loading from './Loading';
import {generateBarColor, generateColorBasedOnBackground} from '../helpers/generateBarColor';
import Form from './Form';

import '../styles/Weather.css';

function Weather(){
    const [currentLocation, setLocation] = useState({city: 'hattiesburg', unit:'imperial'});
    const [currentImage, setImage] = useState('https://media.giphy.com/media/2vqaiPr1TrevmxCPUV/giphy.gif');
    const [isLoading, setLoading] = useState(false);
    const [currentWeather, setWeather] = useState('');

    // used to enable weather api call/loading component (removes error with initial render)
    const currRef = useRef(false);

    useEffect(()=>{
        updateWeather(currentLocation);
    },[currentLocation])

    useEffect(() => {
        setLoading(!isLoading)
        updateImage(currentWeather)
    },[currentWeather]);

    // Used to show loading, API returns too quickly. 
    useEffect(() => {
        if(currRef.current){
            setTimeout(()=>{
                setLoading(!isLoading)
            },1000)
        }
        currRef.current = true;

    },[currentImage]);

    // weather
    async function callWeather(currLocation){
        return await getWeather(currLocation.city, currLocation.unit);
    }
    async function updateWeather(currLocation){
        if(currRef.current){
            const responseWeather = await callWeather(currLocation).then(data=>{ return data});
            console.log(responseWeather)
            if(checkIfCityIsFound(responseWeather)){
                setWeather(responseWeather);
            }
        }
    }

    // image
    async function callImage(img){
        return await getImage(img);
    }
    async function updateImage(currWeather){
        if(currRef.current){
            const responseImage = await callImage(currWeather.weather[0].main).then(data=>{return data});
            setImage(responseImage);
        }
    }


    // passed to form to get location data
    async function retrieveWeatherData(city, unit){
            setLocation({city,unit});
    }

    function checkIfCityIsFound(currWeather){
        return !currWeather.hasOwnProperty('message');
    }


    function renderLoadingOrWeatherComponents(){
        if(!isLoading){
            return(
                <div className='weather-info'>
                    <Loading />
                </div>
            )
        }
        return( <div className='weather-info'>
                    <DisplayImage imageUrl={currentImage}/>
                        {renderWeather()}
                </div>
        )
    }


    function renderWeather(){
        if(currentWeather !== '' && currentWeather.name !== 'City Not Found'){
            return <DisplayWeather data={currentWeather} color={generateColorBasedOnBackground(currentWeather.weather[0].id)}/>
        }
        return renderInstructions();
    }

    function renderInstructions(){
        return(
            <div className='weather-instructions'>
                <h3>Enter a city to begin</h3>
            </div>
        );
    }


    function updateColorBasedOnWeather(){
        if(isLoading){
            if(currentWeather.hasOwnProperty('weather')){
                return generateBarColor(currentWeather.weather[0].id);
            }else{
                return generateBarColor('');
            }
        }
        return '';

    }

    return(
        <div id='weather'>
            {renderLoadingOrWeatherComponents()}
            <div className='weather-diag-bar' style={{backgroundColor: updateColorBasedOnWeather()}}></div>
            <Form retrieveWeatherData={retrieveWeatherData}/>
        </div>
    );
}

export default Weather;