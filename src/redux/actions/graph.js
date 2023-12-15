import { actionConstants } from "../../constants/actionConstants"

export const setEssentials = (data) => async (dispatch) => {
    dispatch(
        {
            type: actionConstants.SET_ESSENTIALS,
            payload: data
        }
    )
}

export const fetchStoreDetails = (data) => async (dispatch) => {
    dispatch(
        {
            type: actionConstants.FETCH_STORE_DETAILS,
            payload: data
        }
    )
    document.title = data?.name || " Jewellery Application"
}

export const fetchUserDetails = (data) => async (dispatch) => {
    dispatch(
        {
            type: actionConstants.FETCH_USER_DETAILS,
            payload: data
        }
    )
}

export const fetchCountries = (data) => async (dispatch) => {
    dispatch(
        {
            type: actionConstants.FETCH_COUNTRIES,
            payload: data
        }
    )
}
export const handleFilters = (data) => async (dispatch) => {
    dispatch(
        {
            type: actionConstants.HANDLE_FILTERS,
            payload: data
        }
    )
}