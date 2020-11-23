import { Component } from 'react';
import styles from './App.module.css';

class App extends Component {
  state={
      cityToSearch: '',
      isinvalidCity: false,
      apiKey:'2eb6313546b6f9e62faba00b80630966',
      imgUrl: (s) => `http://openweathermap.org/img/wn/${s}@2x.png`,
      searched: false,
      searchField:{
        temp: 'rrrrrr',
        description: 'dddddd',
        icon: ''
      }
  }

  cityNameHandler(e){
    e.persist();
    const cVal = e.target.value;

    console.log(cVal);
    this.setState({cityToSearch: cVal});
  }

  getCurrWeather = () => {
    if(this.state.cityToSearch){
     const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.cityToSearch}&units=metric&appid=${this.state.apiKey}
      `;

      fetch(endpoint).then( Res => {

        return Res.json();

      }).then( res=> {
        
        console.log(res);
        if(res.cod == '404'){
          this.setState({isinvalidCity: true,});
        }
        console.log(res.weather);

        const currentWeatherResult = res.weather[0];
        this.setState( prevState => {

          return{
            searchField:{
              ...prevState.searchField,
              description: currentWeatherResult.description,
              icon: prevState.imgUrl(currentWeatherResult.icon),
              temp: res.main.temp
            },
            searched: true,
            isinvalidCity: false,
          }
        });

      }).catch( err => {
        
        this.setState({isinvalidCity: true});
      });

    }else{
      this.setState({isinvalidCity: true});
    }
  }

  render(){
    // const fc = `${U+2639}`;
    // const invalid = <h4>fill in a valid city ( : </h4>; 

    return (
      <div className={styles.App}>
        <h1 className={styles.header}>TINY<br></br>WEATHER APP</h1>

        <div className={styles.input}>
          <input placeholder='Search for a city' onChange={ (e)=> this.cityNameHandler(e)}/>
          <button onClick={this.getCurrWeather}>SEARCH</button>
          <span>{ this.state.isinvalidCity === true ? <h4>fill in a valid city ( : </h4> : null}</span>


        </div>

      
        <div style={this.state.searched ? {display: 'inline-block'} : {display: 'none'}} className={styles.weatherCard}>
          <div className={styles.weatherCard}> 
          <img src={this.state.searchField.icon} alt='current weather ' />
          <h3>{this.state.searchField.description}</h3>
          <h3>{this.state.searchField.temp}<sup>O</sup></h3>
         
          </div>
          
        </div>
        <div style={this.state.searched ? {display: 'none'} : {display: 'inline-block'}} className={styles.back}><h3>made with ❤ by <a href='https://github.com/v-kananu'>kananu</a></h3></div>
      </div>
    );
  }
  
}

export default App;
