import { createContext, useReducer } from 'react'
import apiReducer from './ApiReducer.js'

const CountriesContext = createContext()

const API_KEY = process.env.REACT_APP_COVISTAT_API_KEY
const API_HOST = process.env.REACT_APP_COVISTAT_API_HOST
const API_URL = process.env.REACT_APP_COVISTAT_API_URL

export const CountriesProvider = ({children}) => {

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': API_HOST
        }
    }

    const initialState = {
        countries: [],
        countriesLoading: false
    }

    const [state, dispatch] = useReducer(apiReducer, initialState)

    const setLoading = () => {
        dispatch('SET_COUNTRIES_LOADING')
    }

    const getCountries = () => {
        setLoading()
        
        fetch(`${API_URL}/countries`, options)
            .then(response => response.json())
            .then((response) => {
                dispatch({
                    type: "GET_COUNTRIES",
                    payload: response.response
                })
            })
            .catch(err => console.error(err))
    }

    return (
        <CountriesContext.Provider value={{
            countries: state.countries,
            getCountries
        }}>
            {children}
        </CountriesContext.Provider>
    )
}

export default CountriesContext