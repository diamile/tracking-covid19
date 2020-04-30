import React from 'react';
import styles from "./Chart.module.css";
import {fetchDailyDate} from "../../api";
import {useState,useEffect} from "react";
import {Line,Bar} from "react-chartjs-2";

const Chart = ({data:{confirmed,recovered,deaths},country})=>{

    const [dailyDate,setDailyDate]=useState([]);

    useEffect(()=>{
      const fetchAPI = async()=>{
       setDailyDate(await fetchDailyDate());
      }

      fetchAPI();
    },[])

   

     const lineChart=(
       dailyDate.length !==0?(
           <Line
           data={
               {
                 labels:dailyDate.map(({date})=>date),
                 datasets:[
                     {
                         data:dailyDate.map(({confirmed})=>confirmed),
                         label:'infected',
                         borderColor:"#3333ff",
                         fill:true
                     },

                     {
                        data:dailyDate.map(({deaths})=>deaths),
                        label:'Deaths',
                        borderColor:"red",
                        backgroundColor:"rgba(255,0,0,0.5)",
                        fill:true,
                     },
                     {
                      data:dailyDate.map(({recovered})=>recovered),
                      label:'Recovered',
                      borderColor:"green",
                      backgroundColor:"rgba(0,255,0,0.5)",
                      fill:true,
                   }
                 ]
               }
            }
           
           />
       ):null
     );

     const barChart = (
       confirmed?(
         <Bar
           data={{
             labels:['infected','recovered','deaths'],
             datasets:[{
               label:'people',
               backgroundColor:['rgba(0,0,255,0.5)','rgba(0,255,0,0.5)','rgba(255,0,0,0.5)'],
               data:[confirmed.value,recovered.value,deaths.value]
             }]
           }}

           options={{
             legend:{display:false},
             title:{display:true,text:`current state is ${country}`}
           }}
         
         />
       ):null
     );

    return(
    <div className={styles.container}> 
      {country?barChart:lineChart}
    </div>
    );
}
 

export default Chart;
