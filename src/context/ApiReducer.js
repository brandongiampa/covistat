const apiReducer = (state, action) => {
    switch(action.type) {
        case 'GET_COUNTRIES': {
            return {
                ...state,
                countries: action.payload,
                loading: false
            }
        }
        case 'GET_WORLD_STATS': {
            return {
                ...state,
                worldStats: action.payload,
                loading: false
            }
        }
        case 'SET_COUNTRY': {
            return {
                ...state,
                country: action.payload
            }
        }
        case 'GET_COUNTRY_STATS': {
            return {
                ...state,
                countryStats: action.payload,
                loading: false
            }
        }
        case 'SET_LOADING': {
            return {
                ...state, 
                loading: true
            }
        }
        default: {
            return state
        }
    }
}

export default apiReducer