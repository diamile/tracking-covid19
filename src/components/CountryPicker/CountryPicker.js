import React,{useEffect,useState} from 'react';
import {NativeSelect,FormControl} from "@material-ui/core";
import styles from "./CountryPicker.module.css";

import {fetchCountry} from "../../api";

const CountryPicker=({handleCountryChange})=>{

    const [country,setCountry]=useState([]);
    
    useEffect(()=>{
        const fetchCountries = async()=>{
            setCountry(await fetchCountry())
        }

        fetchCountries();
    },[setCountry])

    console.log(country);



        return(
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange = {(e)=>{handleCountryChange(e.target.value)}}>
                <option value="">global</option>
        {country.map((country,i)=><option  value={country} key={i}>{country}</option>)}
            </NativeSelect>
        </FormControl>
        );
    
}

export default CountryPicker;
