import { createContext, useReducer, useState } from 'react'
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
            rate: 1000001
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
                dispatch({
                    type: "GET_WORLD_STATS",
                    payload: response.response
                })
                console.log("Part I complete")
                for (let item of response.response) {
                    if (item.country === 'All') continue
                    if (item.cases['1M_pop'] && item.cases['1M_pop'] > state.highestCases.rate) {
                        console.log(item.country)
                        dispatch({
                            type: "SET_HIGHEST_CASES",
                            payload: {
                                country: item.country,
                                rate: item.cases['1M_pop']
                            }
                        })
                    }
                    if (item.cases['1M_pop'] && item.cases['1M_pop'] < state.lowestCases.rate) {
                        dispatch({
                            type: "SET_LOWEST_CASES",
                            payload: {
                                country: item.country,
                                rate: item.cases['1M_pop']
                            }
                        })
                    }
                    if (item.deaths['1M_pop'] && item.deaths['1M_pop'] > state.highestDeaths.rate) {
                        dispatch({
                            type: "SET_HIGHEST_DEATHS",
                            payload: {
                                country: item.country,
                                rate: item.deaths['1M_pop']
                            }
                        })
                    }
                    if (item.deaths['1M_pop'] && item.deaths['1M_pop'] < state.lowestDeaths.rate) {
                        dispatch({
                            type: "SET_LOWEST_DEATHS",
                            payload: {
                                country: item.country,
                                rate: item.deaths['1M_pop']
                            }
                        })
                    }
                    if (item.tests['1M_pop'] && item.tests['1M_pop'] > state.highestTests.rate) {
                        dispatch({
                            type: "SET_HIGHEST_TESTS",
                            payload: {
                                country: item.country,
                                rate: item.tests['1M_pop']
                            }
                        })
                    }
                    if (item.tests['1M_pop'] && item.tests['1M_pop'] < state.lowestTests.rate) {
                        dispatch({
                            type: "SET_LOWEST_TESTS",
                            payload: {
                                country: item.country,
                                rate: item.tests['1M_pop']
                            }
                        })
                    }
                    
                    //console.log(item)
                }
                console.log("Part II complete")
            })
            .catch(err => console.error(err))
            .then(() => {return})
    }

    return (
        <WorldStatsContext.Provider value={{
            worldStats: state.worldStats,
            getWorldStats,
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