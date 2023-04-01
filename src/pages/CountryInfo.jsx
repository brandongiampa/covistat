import {useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import SelectedCountryContext from '../context/SelectedCountryContext'
import WorldStatsContext from '../context/WorldStatsContext'
import {useParams} from 'react-router-dom'
import Spinner from '../components/reusable/Spinner'
import BarGraph from '../components/reusable/BarGraph'

function CountryInfo() { 
    const urlCountry = useParams().country
    const { 
        selectedCountryStats, 
        getSelectedCountryStats, 
        selectedCountryStatsLoading } = useContext(SelectedCountryContext)
    const { 
        worldStats, 
        worldStatsLoading, 
        getWorldStats,
        allCountriesCases,
        allCountriesDeaths,
        allCountriesTests } = useContext(WorldStatsContext)

    useEffect(() => {
        getSelectedCountryStats(urlCountry)
        getWorldStats()
    }, [])

    const h1Classes = "text-5xl lg:text-7xl mt-5 mb-2 lg:mb-4"
    const h2Classes = "text-lg lg:text-5xl underline mt-4 lg:mt-6 mb-1 lg:mb-5"
    const pClasses = "lg:text-2xl lg:mb-1"

    if (!selectedCountryStatsLoading && selectedCountryStats.length && !worldStatsLoading && worldStats.length) {
        return (
            <>
                <div className="hero bg-base-200 py-6 my-5">
                <div>
                        <h1 className={ h1Classes }>{ urlCountry.split("-").join(" ") }</h1>
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
                    </div>
                </div>
                <div className="container mx-auto p-5 w-100 lg:w-75 xl:w-50">
                    <BarGraph 
                        title="Deaths"
                        countryStat={selectedCountryStats[0].deaths['1M_pop']}
                        worldStat={allCountriesDeaths}
                    />
                    <BarGraph 
                        title="Cases"
                        countryStat={selectedCountryStats[0].cases['1M_pop']}
                        worldStat={allCountriesCases}
                    />
                    <BarGraph 
                        title="Tests"
                        countryStat={selectedCountryStats[0].tests['1M_pop']}
                        worldStat={allCountriesTests}
                    />
                    <div className="flex align-items-center justify-content-center p-6">
                        <Link className="link text-gray mx-auto my-5" to="/">{ '<< Back to Home' }</Link>
                    </div>
                </div> 
            </>
            )
    }
    else {
        return (
            <Spinner />
        )
    }
}

export default CountryInfo
