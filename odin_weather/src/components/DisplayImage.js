import React from 'react';

function DisplayImage(props){
    return(
        <div>
            <img src={props.imageUrl}/>
        </div>
    );
}



export default DisplayImage;