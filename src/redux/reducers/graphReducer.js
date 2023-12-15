import { actionConstants } from "../../constants/actionConstants";

let initialState = {
    essentials: [],
    store: [],
    user: [],
    countries: [],
    attributes: [],

}


const graphReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case actionConstants.SET_ESSENTIALS:
            return { ...state, essentials: payload }
        case actionConstants.FETCH_STORE_DETAILS:
            return { ...state, store: payload }
        case actionConstants.FETCH_USER_DETAILS:
            return { ...state, user: payload }
        case actionConstants.FETCH_COUNTRIES:
            return { ...state, countries: payload }
        case actionConstants.HANDLE_FILTERS:
            console.log(payload)
            let tempOptions = structuredClone(payload)
            tempOptions.forEach(option => {
                if (option.values == null || option.values.length == 0) {
                    tempOptions = tempOptions.filter(op => op.slug !== option.slug)
                }
            });
            return { ...state, attributes: tempOptions }
        default:
            return state
    }

}


export default graphReducer