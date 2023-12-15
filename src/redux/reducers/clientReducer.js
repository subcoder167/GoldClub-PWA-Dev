import { actionConstants } from "../../constants/actionConstants";

let initialState = {
    sideNavOpen: false,
    homeSearchOpen: false,
    filterOpen: false,
    customizationOpen: false,
    messageOpen: false

}


const clientReducer = (state = initialState, { type }) => {

    switch (type) {
        case actionConstants.OPEN_SIDENAV:
            return { ...state, sideNavOpen: true }
        case actionConstants.CLOSE_SIDENAV:
            return { ...state, sideNavOpen: false }
        case actionConstants.OPEN_HOME_SEARCH:
            return { ...state, homeSearchOpen: true }
        case actionConstants.CLOSE_HOME_SEARCH:
            return { ...state, homeSearchOpen: false }
        case actionConstants.OPEN_FILTER:
            return { ...state, filterOpen: true }
        case actionConstants.CLOSE_FILTER:
            return { ...state, filterOpen: false }
        case actionConstants.OPEN_CUSTOMIZATION:
            return { ...state, customizationOpen: true }
        case actionConstants.CLOSE_CUSTOMIZATION:
            return { ...state, customizationOpen: false }
        case actionConstants.OPEN_MESSAGE:
            return { ...state, messageOpen: true }
        case actionConstants.CLOSE_MESSAGE:
            return { ...state, messageOpen: false }
        default:
            return state
    }

}


export default clientReducer