import { actionConstants } from "../../constants/actionConstants"

export const openSideNav = () => async (dispatch) => {
    dispatch(
        {
            type: actionConstants.OPEN_SIDENAV,
        }
    )
}
export const closeSideNav = () => async (dispatch) => {
    dispatch(
        {
            type: actionConstants.CLOSE_SIDENAV,
        }
    )
}
export const openHomeSearch = () => async (dispatch) => {
    dispatch(
        {
            type: actionConstants.OPEN_HOME_SEARCH,
        }
    )
}
export const closeHomeSearch = () => async (dispatch) => {
    dispatch(
        {
            type: actionConstants.CLOSE_HOME_SEARCH,
        }
    )
}

export const openFilter = () => async (dispatch) => {
    dispatch(
        {
            type: actionConstants.OPEN_FILTER,
        }
    )
}
export const closeFilter = () => async (dispatch) => {
    dispatch(
        {
            type: actionConstants.CLOSE_FILTER,
        }
    )
}

export const openCustomization = () => async (dispatch) => {
    dispatch(
        {
            type: actionConstants.OPEN_CUSTOMIZATION,
        }
    )
}
export const closeCustomization = () => async (dispatch) => {
    dispatch(
        {
            type: actionConstants.CLOSE_CUSTOMIZATION,
        }
    )
}
export const openMessage = () => async (dispatch) => {
    dispatch(
        {
            type: actionConstants.OPEN_MESSAGE,
        }
    )
}
export const closeMessage = () => async (dispatch) => {
    dispatch(
        {
            type: actionConstants.CLOSE_MESSAGE,
        }
    )
}

