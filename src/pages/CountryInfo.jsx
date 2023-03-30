import {useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import SelectedCountryContext from '../context/SelectedCountryContext'
import {useParams} from 'react-router-dom'
import Spinner from '../components/reusable/Spinner'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function CountryInfo() { 
    const urlCountry = useParams().country
    const {selectedCountryStats, getSelectedCountryStats, selectedCountryStatsLoading} = useContext(SelectedCountryContext)

    useEffect(() => {
        getSelectedCountryStats(urlCountry)
    }, [])

    const h1Classes = "text-5xl lg:text-8xl mt-5 mb-2 lg:mb-4"
    const h2Classes = "text-lg lg:text-5xl underline mt-4 lg:mt-6 mb-1 lg:mb-5"
    const pClasses = "lg:text-3xl lg:mb-1"

    if (!selectedCountryStatsLoading && selectedCountryStats.length) {
        return (
            <div className="hero bg-base-200 py-6">
                <div>
                        <h1 className={ h1Classes }>{ urlCountry }</h1>
                        <p className={ pClasses }>{ selectedCountryStats[0].continent }, <i>pop. {selectedCountryStats[0].population}</i></p>
                        <hr />
                        <h2 className={ h2Classes }>Cases</h2>
                        <p className={ pClasses }>
                            Active Cases: {" " + selectedCountryStats[0].cases.active + " "} 
                            <i>
                                ({+ selectedCountryStats[0].cases.new} new, 
                                {" " + selectedCountryStats[0].cases.critical} critical)
                            </i>
                        </p>
                        <p className={ pClasses }>
                            Total Cases: {selectedCountryStats[0].cases.total + " "} 
                            <i>
                                ({selectedCountryStats[0].cases.recovered} recovered)
                            </i>
                        </p>
                        <h2 className={ h2Classes }>Deaths</h2>
                        <p className={ pClasses }>
                            Total: { selectedCountryStats[0].deaths.total + " " } 
                            <i>New: { selectedCountryStats[0].deaths.new ? ' ' + selectedCountryStats[0].deaths.new : ' none' }</i>
                        </p>
                        <h2 className={ h2Classes }>Tests</h2>
                        <p className={ pClasses }>
                            Total: { selectedCountryStats[0].tests.total + " " } 
                            <i>{ selectedCountryStats[0].tests['1M_pop'] + '/million' }</i>
                        </p>
                        <p className={ pClasses }>Updated { selectedCountryStats[0].day }</p>
                        <br />
                        <Link className="link text-gray italic mb-5 lg:text-lg lg:mt-5" to="/">Back</Link>
                    </div>
                    {/* <Doughnut data={...} /> */}
            </div>
            )
    }
    else {
        return (
            <Spinner />
        )
    }
}

export default CountryInfo
