import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {decrement, increment, insertPermanentAddress} from "../../actions";
import { BsFillCaretRightFill, BsFillCaretLeftFill } from "react-icons/bs";
import axios from "axios";

const PermanentAddress = () => {

    const [selectedCountry, setSelectedCountry] = useState('')
    const [selectedState, setSelectedState] = useState('')
    const [selectedCity, setSelectedCity] = useState('')
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [warningMsg, setWarningMsg] = useState("");

    useEffect(async () => {
        await axios.get('http://localhost:5000/api/getCountries')
            .then(response=>{
                let gotCountries = [...response.data]
                setCountries(gotCountries)
            })
    },[]);

    useEffect(async () => {
        let country_id;
        countries.map(item=>{if(item.name==selectedCountry) country_id=item.id})
        console.log(country_id)
        await axios.get( "http://localhost:5000/api/getStates?selectedCountryId="+country_id)
            .then(response=>{
                let gotStates = [...response.data];
                console.log(gotStates)
                setStates(gotStates);
            })
    },[selectedCountry])


    useEffect(async () => {
        let state_id;
        states.map(item=>{ if(item.name==selectedState) state_id=item.id })
        await axios.get("http://localhost:5000/api/getCities?selectedStateId="+state_id)
            .then(response=>{
                let gotCities = [...response.data];
                console.log(response.data)
                setCities(gotCities);
            })
    },[selectedState])

    const dispatch = useDispatch()

    const submitHandler=(event)=>{

        if(selectedCountry.length == 0 || selectedState.length==0 || selectedCity==0){
            setWarningMsg("PLEASE PROVIDE ALL INFORMATION");
            event.preventDefault();
        }
        else{
            event.preventDefault();
            let country_id;
            let state_id;
            let city_id;
            countries.map(item=>{if(item.name==selectedCountry) country_id=item.id})
            states.map(item=>{ if(item.name==selectedState) state_id=item.id;})
            cities.map(item=>{if(item.name==selectedCity) city_id=item.id})
            let permanentaddressinfo = [
                country_id,
                state_id,
                city_id,
                event.target.permanent_postal_code.value,
            ]
            dispatch(insertPermanentAddress(permanentaddressinfo))
            dispatch(increment())
        }
    }
    return (
        <form className="container p-3 mt-4" id = "form_items" onSubmit={submitHandler}>
            <div className="h3">Permanent Address</div>
            <hr/>

            <select className="form-control form-control-lg mb-3" name = 'permanent_country' onChange={(e)=>{setSelectedCountry(e.target.value)}} required>
                <option id="None">Select Country</option>
                {countries.map(country=>{
                    return <option>{country.name}</option>
                })}
            </select>

            <select className="form-control form-control-lg mb-3" name = 'permanent_state' onChange={(e)=>{setSelectedState(e.target.value)}} id='cn' required>
                <option key="None">Select State</option>
                {states.map(stateItem=>{
                    return <option>{stateItem.name}</option>
                })}
            </select>

            <select className="form-control form-control-lg mb-3" name = 'permanent_city' onChange={(e)=>{setSelectedCity(e.target.value)}} id='cn' required>
                <option key="None">Select City</option>
                {cities.map(cityItem=>{
                    return <option>{cityItem.name}</option>
                })}
            </select>
            <input className="form-control d-block mt-3" type="text" name = 'permanent_postal_code' placeholder="Postal code" required></input>

            <div className={'mt-5'} style={
                {fontSize: 25, color: "red", fontFamily:'fantasy'}
            }>{warningMsg}</div>

            <div className={'row'}>
                <div className={'col-sm-6'}>
                    <button type={"button"} className={'btn-dark btn-lg w-100 btn rounded mt-5'} onClick={()=>{dispatch(decrement())}}><BsFillCaretLeftFill /></button>
                </div>
                <div className={'col-sm-6'}>
                    <button className='btn-dark btn-lg w-100 btn rounded mt-5'><BsFillCaretRightFill /></button>
                </div>
            </div>
        </form>
    );
};

export default PermanentAddress;