import React from 'react';
import '../styles/DisplayWeather.css';

function DisplayWeather(props){
    return(
        <div id='display-weather'>
            <div className='display-title'>
                <h3>{props.data.name}</h3>
            </div>
            <div className='display-info'>
                <div className='display-info-tagline'>
                    <p>{props.data.weather[0].description}</p>
                </div>
                <div>
                    <p>Humidity:</p> <p>{props.data.main.humidity}</p>
                </div>
                <div>
                    <p>Temp:</p> <p>{props.data.main.temp}</p>
                </div>
                <div>
                    <p>Max:</p> <p>{props.data.main.temp_max}</p>
                </div>
                <div>
                    <p>Min:</p> <p>{props.data.main.temp_min}</p>
                </div>
            </div>

        </div>
    );
}



export default DisplayWeather;