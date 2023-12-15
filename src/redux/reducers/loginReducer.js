import { actionConstants } from "../../constants/actionConstants";

let initialState = {
    whatsappNumber: null,
    logged: false,
    trial: false,
    access: '',
    message: '',
    user: null
}



const loginReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case actionConstants.SET_WHATSAPP_NUMBER:
            return { ...state, whatsappNumber: payload }
        // case actionConstants.LOGIN:
        //     return { ...state, trial: true, logged: false, access: '', message: '', user: null }

        // case actionConstants.LOGIN_SUCCESS:
        //     return { ...state, trial: false, logged: true, access: '', message: 'login Success', user: payload }

        // case actionConstants.LOGIN_FAIL:
        //     return { ...state, trial: false, logged: false, access: '', message: payload, user: null }

        // case actionConstants.LOGOUT:
        //     return { ...state, trial: false, logged: false, access: '', message: '', user: null }
        default:
            return state
    }
}

export default loginReducer
