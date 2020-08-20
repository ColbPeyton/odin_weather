import React from 'react';
import getWeather from '../helpers/getWeather';

function DisplayWeather(props){
    return(
        <div>
            <h3>{props.data.name}</h3>
            <p>{props.data.main.humidity}</p>
            <p>{props.data.main.temp}</p>
            <p>{props.data.main.temp_max}</p>
            <p>{props.data.main.temp_min}</p>
            <p>{props.data.weather[0].description}</p>

        </div>
    );
}



export default DisplayWeather;