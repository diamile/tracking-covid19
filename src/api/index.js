import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async(country)=>{

    let changeUrl = url;
    if(country){
        changeUrl=`${url}/countries/${country}`;
    }

    try{
        const {data:{ confirmed,recovered,deaths,lastUpdate }} = await axios.get(changeUrl);

        console.log(axios.get(url));
        
       return {
           confirmed,recovered,deaths,lastUpdate
       }

       
    }
    catch(err){
     if(err){
         console.log(err);
     }
    }
   
}


export const fetchDailyDate = async()=>{

    try{
        const {data} = await axios.get(`${url}/daily`);
        
        
        const modifieData = data.map((item)=>({
            confirmed:item.confirmed.total,
            deaths:item.deaths.total,
            date:item.reportDate,
            recovered:item.recovered
        }))

      

        return modifieData;
         

    }catch(err){
        console.log(err);
    }
  
}


export const fetchCountry= async()=>{
    try{
       const {data:{countries}} = await axios.get(`${url}/countries`);
       return countries.map((country)=>country.name);
       
       
       
    }
    catch(err){
        console.log(err);
    }
}



