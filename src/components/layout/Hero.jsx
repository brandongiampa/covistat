import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import TextDropdown from '../reusable/TextDropdown'
import SelectedCountryContext from '../../context/SelectedCountryContext'

function Hero() {

    const {selectedCountry} = useContext(SelectedCountryContext)
    const [buttonEnabled, setButtonEnabled] = useState(false)
    

    return (
        <div className="hero bg-base-200 py-6">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl lg:text-6xl font-bold mt-5">Welcome to COVISTAT</h1>
                    <p className="py-6 mb-4 lg:tex-2xl">Your source for up-to-date information on the Covid19 pandemic.</p>
                    <TextDropdown setButtonEnabled={setButtonEnabled} />
                    <Link disabled={!buttonEnabled} to={`/countries/${selectedCountry}`} className="btn btn-primary mt-4 float-left">Get Stats</Link>
                </div>
            </div>
        </div>
    )
}

export default Hero
