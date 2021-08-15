import React, { Component } from 'react';
import axios from 'axios';

 class Autocomplete extends Component {
    constructor(props) {
        super(props);
        this.state = { 
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: '',
      suggestions: [],
      colour:'white',
      
         }
    }
    componentDidMount = () =>{
        axios.get('http://localhost:5000/suggestion')
        .then(res => {
            this.setState({suggestions: res.data})
        })
        .catch(err => console.warn(err))
    }
    onChange = (e) => {
        const  suggestions  = this.state.suggestions;
        const userInput = e.currentTarget.value;   
        var filteredSuggestions = [];
        for (var i=0; i<suggestions.length; i++){
          if(suggestions[i].name.toLowerCase().indexOf(userInput.toLowerCase()) > -1){
            const mainname = suggestions[i].name;
            const mainprice = suggestions[i].price;
            const mainimage = suggestions[i].description;

            filteredSuggestions.push({mainname,mainprice,mainimage})
          }

        }
 console.log(filteredSuggestions)

        this.setState({
          filteredSuggestions,
          showSuggestions: true,
          userInput: e.currentTarget.value
        });
      };
    render() { 
      let suggestionsListComponent;  
    if (this.state.showSuggestions && this.state.userInput) {
      if (this.state.filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul  className="suggestions">
            {this.state.filteredSuggestions.map((suggestion, index) => {
              
              return (
                 <li style={{listStyleType:'none'}}  key={suggestion.mainprice} onClick={this.onClick}>
                 <b><img style={{width:'5%'}} src={require(`../${suggestion.mainimage}.jpg`)}></img>{suggestion.mainname}</b> <br></br>
                 <center><small>{suggestion.mainprice}</small></center>
                 </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No suggestions!</em>
          </div>
        );
      }
    }
   
        return ( 
            <React.Fragment>
               <input
          type="text"
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          value={this.state.userInput}
        />
        <div style={{position:"absolute",backgroundColor:'white',color:`black`,zIndex:'2'}}>
        {suggestionsListComponent}
        </div>
        
            </React.Fragment>
         );
    }
}
 
export default Autocomplete;