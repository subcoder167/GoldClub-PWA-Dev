import { actionConstants } from "../../constants/actionConstants"


export const setNumber = (payload) => async (dispatch) => {
    dispatch(
        {
            type: actionConstants.SET_WHATSAPP_NUMBER,
            payload: payload

        }
    )

}