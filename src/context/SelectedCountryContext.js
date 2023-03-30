import { createContext, useReducer, useContext } from 'react'
import apiReducer from './ApiReducer.js'

const SelectedCountryContext = createContext()

const API_KEY = process.env.REACT_APP_COVISTAT_API_KEY
const API_HOST = process.env.REACT_APP_COVISTAT_API_HOST
const API_URL = process.env.REACT_APP_COVISTAT_API_URL

export const SelectedCountryProvider = ({children}) => {

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': API_HOST
        }
    }

    const initialState = {
        selectedCountry: "",
        selectedCountryStats: [],
        selectedCountryStatsLoading: false,
        selectedCountryisValid: false
    }

    const [state, dispatch] = useReducer(apiReducer, initialState)

    const setLoading = () => {
        dispatch('SET_SELECTED_COUNTRY_STATS_LOADING')
    }

    const getSelectedCountryStats = (country) => {
        setLoading()
        
        fetch(`${API_URL}/statistics?country=${country}`, options)
            .then(response => response.json())
            .then((response) => {
                console.log(response.response)
                dispatch({
                    type: "GET_SELECTED_COUNTRY_STATS",
                    payload: response.response
                })
            })
            .catch(err => console.error(err))
    }

    const selectCountry = (country) => {
        dispatch({
            type: "SELECT_COUNTRY",
            payload: country
        })
    }

    return (
        <SelectedCountryContext.Provider value={{
            selectedCountry: state.selectedCountry,
            selectedCountryIsValid: state.selectedCountryIsValid,
            selectedCountryStats: state.selectedCountryStats,
            getSelectedCountryStats,
            selectCountry
        }}>
            {children}
        </SelectedCountryContext.Provider>
    )
}

export default SelectedCountryContext