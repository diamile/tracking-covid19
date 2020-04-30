import React from 'react';
import {Cards,Chart,CountryPicker} from './components';
import styles from "./App.module.css";
import {fetchData} from "./api";

import src from './image.png';


class App extends React.Component {

  state={
    data:{},
    country:""
  }

  async componentDidMount(){
    const fetchersData = await fetchData();
    this.setState({data:fetchersData});
  }


  handleCountryChange = async(country)=>{
   const fetchDataCountries = await fetchData(country);
   this.setState({data:fetchDataCountries,country:country})
   
  }

  render(){
    
        const {data,country}=this.state;
    return (
      <div className={styles.container}>
          <img className = {styles.img} src={src}/>
         <Cards data={data}/>
         <CountryPicker handleCountryChange={this.handleCountryChange}/>
         <Chart data={data} country={country}/>
      </div>
    )

  }
 
}

export default App;
