import React from 'react';
import '../styles/Form.css';

class Form extends React.Component{
    constructor(props){
        super(props)
        this.state={
            city: '',
            degreeType: 'imperial',
            invalidInput: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleError = this.handleError.bind(this);
    }


    handleChange(event){
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }

    handleError(){
        this.setState({invalidInput: true});

        setTimeout(()=>{
            this.setState({invalidInput: false});
        }, 2500)
    }



    updateCityDataForSearch(city){
        return city.replace('','+');;
    }

    validateData(city){
        const reg = /[a-zA-Z]+/g;
        if(reg.test(city)){
            return true;
        }
        return false;
    }

    handleSubmit(event) {
        // Pass form data back to parent 
        if(this.validateData(this.state.city)){
        const updatedCity = this.updateCityDataForSearch(this.state.city);
        this.props.retrieveWeatherData(updatedCity, this.state.degreeType);
        }else{
            this.handleError();
        }
        this.resetForm();
        event.preventDefault();

    }

    resetForm = () =>{
        this.setState({
            city: ''
        })
    }

    // render error message, removed after 2.5seconds
    renderErrorMessage = ()=>{
        if(this.state.invalidInput){
            return(
                <div className='error-msg'>
                    <p>Please Enter a Valid City</p>
                </div>
            )
        }
    }

    render(){
        return(
            <div className='form-container'>
                {this.renderErrorMessage()}
                <form id='form' onSubmit={this.handleSubmit}>
                    <div className={`${this.state.invalidInput ? 'error':''} form-inputs`}>
                        <input type='text' id='city' name='city' placeholder='Enter a City' value={this.state.city} onChange={this.handleChange}/>
                        <select name='degreeType' onChange={this.handleChange}>
                            <option val='imperial'>°F</option>
                            <option val='metric'>°C</option>
                        </select>
                    </div>

                    <div className='form-submit'>
                        <input type='submit' value='submit'/>
                    </div>
                </form>
    
            </div>
        );
    }

}



export default Form;