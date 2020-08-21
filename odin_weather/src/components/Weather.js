import React, {useState, useEffect, useRef} from 'react';
import DisplayImage from './DisplayImage';
import DisplayWeather from './DisplayWeather';
import getImage from '../helpers/getImage';
import getWeather from '../helpers/getWeather';
import Loading from './Loading';
import Form from './Form';

import '../styles/Weather.css';

function Weather(){
    const [currentLocation, setLocation] = useState({city: 'hattiesburg', unit:'imperial'});
    const [currentImage, setImage] = useState('weather');
    const [isLoading, setLoading] = useState(false);
    const [currentWeather, setWeather] = useState('');

    const currRef = useRef(false);

    useEffect(()=>{
        makeInitialAPICalls(callImage(currentImage));
    }, [])

    useEffect(()=>{
        updateWeather(currentLocation);
    },[currentLocation])

    useEffect(() => {
        setLoading(!isLoading)
        updateImage(currentWeather)
    },[currentWeather]);

    // Used to show loading, API returns too quickly. 
    useEffect(() => {
        setTimeout(()=>{
            setLoading(!isLoading)

        },1000)
    },[currentImage]);


    async function makeInitialAPICalls(image){
        const response = await Promise.all([image]);
        setImage(response[0]);
        currRef.current = true;
    }

    async function callWeather(currLocation){
        return await getWeather(currLocation.city, currLocation.unit);
    }

    async function updateWeather(currLocation){
        if(currRef.current){
            const responseWeather = await callWeather(currLocation).then(data=>{ return data});
            if(checkIfCityIsFound(responseWeather)){
                setWeather(responseWeather);
            }
        }
    }

    async function callImage(img){
        return await getImage(img);
    }
    async function updateImage(currWeather){
        if(currRef.current){
            const responseImage = await callImage(currWeather.weather[0].main).then(data=>{return data});
            setImage(responseImage);
        }
    }


    async function retrieveWeatherData(city, unit){
            setLocation({city,unit});
    }

    function checkIfCityIsFound(currWeather){
        return !currWeather.hasOwnProperty('message');
    }



    function showWeather(){
        if(currentWeather != '' && currentWeather.name != 'City Not Found'){
            return <DisplayWeather data={currentWeather} />
        }
        return '';
    }

    function renderLoadingOrImage(){
        if(isLoading){
            return(
                <Loading />
            )
        }
        return <DisplayImage imageUrl={currentImage}/>
    }

    return(
        <div id='weather'>
            {renderLoadingOrImage()}
            {showWeather()}
            <Form retrieveWeatherData={retrieveWeatherData}/>
        </div>
    );
}

export default Weather;