import { createContext, useReducer } from 'react'
import apiReducer from './ApiReducer.js'

const WorldStatsContext = createContext()

const API_KEY = process.env.REACT_APP_COVISTAT_API_KEY
const API_HOST = process.env.REACT_APP_COVISTAT_API_HOST
const API_URL = process.env.REACT_APP_COVISTAT_API_URL

export const WorldStatsProvider = ({children}) => {

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': API_HOST
        }
    }

    const initialState = {
        worldStats: [],
        worldStatsLoading: true,
        allCountriesCases: {
            country: "loading...",
            rate: -1
        },
        allCountriesDeaths: {
            country: "loading...",
            rate: -1
        },
        allCountriesTests: {
            country: "loading...",
            rate: -1
        },
        highestCases: {
            country: "loading...",
            rate: -1
        },
        lowestCases: {
            country: "loading...",
            rate: 1000001
        },
        highestDeaths: {
            country: "loading...",
            rate: -1
        },
        lowestDeaths: {
            country: "loading...",
            rate: 1000001
        },
        highestTests: {
            country: "loading...",
            rate: -1
        },
        lowestTests: {
            country: "loading...",
            rate: 1000000001
        }
    }

    const [state, dispatch] = useReducer(apiReducer, initialState)

    const setLoading = () => {
        dispatch('SET_WORLD_STATS_LOADING')
    }

    const getWorldStats = () => {
        setLoading()
        
        fetch(`${API_URL}/statistics`, options)
            .then(response => response.json())
            .then((response) => {
                const stats = response.response
                dispatch({
                    type: "GET_WORLD_STATS",
                    payload: stats
                })

                /**
                 * Order by deaths ascending. Pass null values and get lowest not null.
                 */
                stats.sort((a,b) => a.cases['1M_pop']-b.cases['1M_pop'])
                let firstNotNull = 0
                while (!stats[firstNotNull].cases['1M_pop']) firstNotNull++
                dispatch({
                    type: "SET_HIGHEST_CASES",
                    payload: {
                        country: stats[stats.length-1].country,
                        rate: stats[stats.length-1].cases['1M_pop']
                    }
                })
                dispatch({
                    type: "SET_LOWEST_CASES",
                    payload: {
                        country: stats[firstNotNull].country,
                        rate: stats[firstNotNull].cases['1M_pop']
                    }
                })

                /**
                 * Order by cases ascending. Pass null values and get lowest not null.
                 */
                stats.sort((a,b) => a.deaths['1M_pop']-b.deaths['1M_pop'])
                firstNotNull = 0
                while (!stats[firstNotNull].deaths['1M_pop']) firstNotNull++
                dispatch({
                    type: "SET_HIGHEST_DEATHS",
                    payload: {
                        country: stats[stats.length-1].country,
                        rate: stats[stats.length-1].deaths['1M_pop']
                    }
                })
                dispatch({
                    type: "SET_LOWEST_DEATHS",
                    payload: {
                        country: stats[firstNotNull].country,
                        rate: stats[firstNotNull].deaths['1M_pop']
                    }
                })

                /**
                 * Order by tests ascending. Pass null values and get lowest not null.
                 */
                stats.sort((a,b) => a.tests['1M_pop']-b.tests['1M_pop'])
                firstNotNull = 0
                while (!stats[firstNotNull].tests['1M_pop']) firstNotNull++
                dispatch({
                    type: "SET_HIGHEST_TESTS",
                    payload: {
                        country: stats[stats.length-1].country,
                        rate: stats[stats.length-1].tests['1M_pop']
                    }
                })
                dispatch({
                    type: "SET_LOWEST_TESTS",
                    payload: {
                        country: stats[firstNotNull].country,
                        rate: stats[firstNotNull].tests['1M_pop']
                    }
                })

                /**
                 * Search through array to get "All" values.
                 */
                let allCountriesFinder = 0
                while (stats[allCountriesFinder].country !== "All") allCountriesFinder++

                dispatch({
                    type: "SET_ALL_COUNTRIES",
                    payload: stats[allCountriesFinder]
                })
            })
            .catch(err => console.error(err))
            .then(() => {return})
    }

    return (
        <WorldStatsContext.Provider value={{
            worldStats: state.worldStats,
            getWorldStats,
            allCountriesCases: state.allCountriesCases,
            allCountriesDeaths: state.allCountriesDeaths,
            allCountriesTests: state.allCountriesTests,
            highestCases: state.highestCases,
            lowestCases: state.lowestCases,
            highestDeaths: state.highestDeaths,
            lowestDeaths: state.lowestDeaths,
            highestTests: state.highestTests,
            lowestTests: state.lowestTests
        }}>
            {children}
        </WorldStatsContext.Provider>
    )

}

export default WorldStatsContext