import { useContext, useEffect, useState } from 'react' 
import CountriesContext from '../../context/CountriesContext'
import SelectedCountryContext from '../../context/SelectedCountryContext'
import WorldStatsContext from '../../context/WorldStatsContext'

function TextDropdown({setButtonEnabled}) {

    const { countries, getCountries } = useContext(CountriesContext)
    const { selectCountry } = useContext(SelectedCountryContext)
    const { worldStats } = useContext(WorldStatsContext)

    const [ showError, setShowError ] = useState(false)

    useEffect(() => {
        getCountries()
    },[])

    const handleChange = (e) => {
        selectCountry(e.target.value)
        setButtonEnabled(countries.includes(e.target.value))
    }

    const handleKeyPress = (e) => {
        if (e.charCode === 13 || e.keyCode === 13) {
            for (let stat of worldStats) {
                if (e.target.value === stat.country) {
                    document.location.href = `/countries/${e.target.value}`
                    return
                }
            }
            setShowError(true)
        }
        else {
            setShowError(false)
        }
    } 

    return (
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text">Select Country</span>
                {
                    showError && (
                        <span className="text-danger">*Country name invalid.</span>
                    )
                }
            </label>
            <input 
                type="text" 
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                list="input-countries"
                name="select-country"
                id="select-country"
                className="input input-bordered w-full w-100" />
                <datalist id="input-countries">
                    {
                        countries.map((country) => (
                            <option key={country} value={country}>{country.split("-").join(" ")}</option>
                        ))
                    }
                </datalist>
        </div>
    )
}

export default TextDropdown
