import { useContext, useEffect, useState } from 'react' 
import CountriesContext from '../../context/CountriesContext'
import SelectedCountryContext from '../../context/SelectedCountryContext'

function TextDropdown({setButtonEnabled}) {

    const { countries, getCountries } = useContext(CountriesContext)
    const { selectCountry } = useContext(SelectedCountryContext)

    useEffect(() => {
        getCountries()
    },[])

    const handleChange = (e) => {
        selectCountry(e.target.value)
        setButtonEnabled(countries.includes(e.target.value))
    }

    return (
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text">Select Country</span>
            </label>
            <input 
                type="text" 
                onChange={handleChange}
                list="input-countries"
                name="select-country"
                id="select-country"
                className="input input-bordered w-full w-100" />
                <datalist id="input-countries">
                    {
                        countries.map((country) => (
                            <option key={country} value={country}>{country}</option>
                        ))
                    }
                </datalist>
        </div>
    )
}

export default TextDropdown
