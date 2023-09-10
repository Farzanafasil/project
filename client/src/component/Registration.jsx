import React, { useState } from 'react'
import axios from 'axios'

const Registration = () => {
    const data={


        "countries": [

        {
            "name": "Country 1",
            "states": [
              {
                "name": "State 1",
                "districts": ["District 1", "District 2"]
              },
              {
                "name": "State 2",
                "districts": ["District 3", "District 4"]
              }
            ]
          },
          {
            "name": "Country 2",
            "states": [
              {
                "name": "State 3",
                "districts": ["District 5", "District 6"]
              },
              {
                "name": "State 4",
                "districts": ["District 7", "District 8"]
              }
            ]
          }
        ]
      

    }

    const [selectedcountry,setSelectedCountry]=useState('');
    const [selectedstate,setSelectedState]=useState('');
    const [selecteddistrict,setSelectedDistrict]=useState('');

    const countries=data.countries;
    const states= selectedcountry && countries.find((country)=>country.name===selectedcountry)?.states;
    const districts=selectedstate && states.find((states)=>states.name===selectedstate)?.districts;

  return (
    <div>
        <h1>Register Here!</h1>
        <input type='text' placeholder='email'/><br/>
        <input type="text" placeholder='UserName'/><br/>
        <input type='text' placeholder='Password'/><br/>
        <input type='text' placeholder='confirmPassword'/><br/>
        <label htmlFor="Country">Country:</label>
        <select id='country' name='Country' value={selectedcountry} onChange={(e)=>setSelectedCountry(e.target.value)}>
        <option value="" disabled selected>Select Country</option>
        {countries.map((country)=>(<option key={country.name} value={country.name}>
            {country.name}
        </option>))}
        </select><br/>
        <label htmlFor="State">State:</label>

        <select id='state'name='State' value={selectedstate} onChange={(e)=>setSelectedState(e.target.value)}>

        <option value="" disabled selected>Select State</option>

        {states && states.map((state)=>(<option key={state.name} value={state.name}>

         {state.name}

        </option>))}

        </select><br/>

        <label htmlFor="District">District:</label>

        <select id='district' name='District' value={selecteddistrict} onChange={(e)=>setSelectedDistrict(e.target.value)}>
        <option value="" disabled selected>Select District</option>
        {districts&& districts.map((district)=>(
            <option key={district} value={district}>
                {district}
            </option>
        ))}
        </select><br/>


  <button>Register</button>

    </div>
  )
}

export default Registration