const apiReducer = (state, action) => {
    switch(action.type) {
        case 'GET_COUNTRIES': {
            return {
                ...state,
                countries: action.payload,
                countriesLoading: false
            }
        }
        case 'SET_COUNTRIES_LOADING': {
            return {
                ...state, 
                countriesLoading: true
            }
        }
        case 'GET_WORLD_STATS': {
            return {
                ...state,
                worldStats: action.payload,
                worldStatsLoading: false
            }
        }
        case 'SET_WORLD_STATS_LOADING': {
            return {
                ...state, 
                worldStatsLoading: true
            }
        }
        case 'SET_ALL_COUNTRIES': {
            return {
                ...state,
                allCountriesCases: action.payload.cases['1M_pop'],
                allCountriesDeaths: action.payload.deaths['1M_pop'],
                allCountriesTests: action.payload.tests['1M_pop'],
            }
        }
        case 'SET_HIGHEST_CASES': {
            return {
                ...state,
                highestCases: action.payload
            }
        }
        case 'SET_LOWEST_CASES': {
            return {
                ...state,
                lowestCases: action.payload
            }
        }
        case 'SET_HIGHEST_DEATHS': {
            return {
                ...state,
                highestDeaths: action.payload
            }
        }
        case 'SET_LOWEST_DEATHS': {
            return {
                ...state,
                lowestDeaths: action.payload
            }
        }
        case 'SET_HIGHEST_TESTS': {
            return {
                ...state,
                highestTests: action.payload
            }
        }
        case 'SET_LOWEST_TESTS': {
            return {
                ...state,
                lowestTests: action.payload
            }
        }
        case 'SELECT_COUNTRY': {
            return {
                ...state,
                selectedCountry: action.payload
            }
        }
        case 'GET_SELECTED_COUNTRY_STATS': {
            return {
                ...state,
                selectedCountryStats: action.payload,
                selectedCountryStatsloading: false
            }
        }
        case 'SET_SELECTED_COUNTRY_STATS_LOADING': {
            return {
                ...state, 
                selectedCountryStatsLoading: true
            }
        }
        case 'SET_SELECTED_COUNTRY_IS_VALID': {
            console.log(action.payload)
            return {
                ...state, 
                selectedCountryisValid: action.payload
            }
        }
        default: {
            return state
        }
    }
}

export default apiReducer