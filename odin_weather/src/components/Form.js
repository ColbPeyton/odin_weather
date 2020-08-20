import React from 'react';

class Form extends React.Component{
    constructor(props){
        super(props)
        this.state={
            city: '',
            stateCode: '',
            degreeType: 'imperial'
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event){
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }


    handleSubmit(event) {
        // Pass form data back to parent 
        this.props.retrieveWeatherData(this.state.city, this.state.stateCode, this.state.degreeType);
        this.resetForm();
        event.preventDefault();
    }

    resetForm = () =>{
        this.setState({
            city: '',
            stateCode: '',
        })
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type='text' id='city' name='city' placeholder='City' value={this.state.city} onChange={this.handleChange}/>
                    <input type='text' id='stateCode' name='stateCode' placeholder='State' value={this.state.stateCode} onChange={this.handleChange}/>
                    <select name='degreeType' onChange={this.handleChange}>
                        <option val='imperial'>Fahrenheit</option>
                        <option val='metric'>Celsius</option>
                    </select>
                    <input type='submit' value='submit'/>
                </form>
    
            </div>
        );
    }

}



export default Form;