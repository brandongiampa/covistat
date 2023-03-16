import { createContext, useReducer, useState } from 'react'
import apiReducer from './ApiReducer.js'

const ApiContext = createContext()

const API_KEY = process.env.REACT_APP_COVISTAT_API_KEY
const API_HOST = process.env.REACT_APP_COVISTAT_API_HOST
const API_URL = process.env.REACT_APP_COVISTAT_API_URL

export const ApiProvider = ({children}) => {
    const initialState = {
        countries: []
    }

    const [state, dispatch] = useReducer(apiReducer, initialState)

    const setLoading = () => {
        dispatch('SET_LOADING')
    }

    const getCountries = () => {
        setLoading()

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': API_HOST
            }
        }
        
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
        <ApiContext.Provider value={{
            countries: state.countries,
            getCountries
        }}>
            {children}
        </ApiContext.Provider>
    )
}

export default ApiContext