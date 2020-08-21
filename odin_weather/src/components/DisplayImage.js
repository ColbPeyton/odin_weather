import React from 'react';
import '../styles/DisplayImage.css';

function DisplayImage(props){
    return(
        <div className='display-image'>
            <img src={props.imageUrl} alt='curent weather'/>
        </div>
    );
}



export default DisplayImage;