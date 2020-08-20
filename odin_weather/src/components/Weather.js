import React, {useState, useEffect} from 'react';
import DisplayImage from './DisplayImage';
import DisplayWeather from './DisplayWeather';
import getImage from '../helpers/getImage';
import getWeather from '../helpers/getWeather';
import Form from './Form';
import { weatherKey } from '../keys/key_weather';

function Weather(){
    const [currentLocation, setLocation] = useState(['london','uk']);
    const [currentImage, setImage] = useState('weather');
    const [currentWeather, setWeather] = useState('');


    useEffect(()=>{
        // callImage();
        // makeApiCalls();
    }, [])


    async function callImage(){
        return await getImage(currentImage);
    }

    async function callWeather(){
        return await getWeather(currentLocation[0], currentWeather[1]);
    }

    async function makeApiCalls(){
        const response = await Promise.all([getImage(currentImage), getWeather(currentLocation[0], currentWeather[1])]);
        console.log(response)
    }

    return(
        <div>
            {/* <DisplayImage imageUrl={currentImage}/> */}
            <Form />
        </div>
    );
}

export default Weather;