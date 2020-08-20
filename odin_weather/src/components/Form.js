import React,{useState}from 'react';

function Form(){

    // const [city, setCity] = useState('');
    // const [state, setState] = useState('');

    return(
        <div>
            <form>
                <input type='text' id='city' placeholder='City'/>
                <input type='text' id='state' placeholder='State'/>
            </form>

        </div>
    );
}



export default Form;