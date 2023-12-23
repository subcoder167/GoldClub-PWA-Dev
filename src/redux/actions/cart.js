// import { type } from "@testing-library/user-event/dist/type";
import { actionConstants } from "../../constants/actionConstants";


export const addToCart = (product) => {
    return {
        type: actionConstants.ADD_TO_CART,
        payload:
        {
            product: product,
            quantity: 1
        }
    }
}
export const deleteFromCart = (product) => {
    return {
        type: actionConstants.DELETE_FROM_CART,
        payload: product
    }
}
export const emptyCart = () => {
    return {
        type: actionConstants.EMPTY_CART,

    };

};

export const decrementQuantity = (product) => {

    return {
        type: actionConstants.DECREMENT_QUANTITY,
        payload: product
    }
}

export const updateTotalPrice = (price) => {

}

export const createCheckoutAction = (payload) => {
    return {
        type: actionConstants.CREATE_CHECKOUT,
        payload: payload
    }
}
export const updateCheckoutBillingAddress = (payload) => {
    return {
        type: actionConstants.UPDATE_CHECKOUT_BILLING_ADDRESS,
        payload: payload
    }
}
export const updateCheckoutShippingAddress = (payload) => {
    return {
        type: actionConstants.UPDATE_CHECKOUT_SHIPPING_ADDRESS,
        payload: payload
    }
}
export const DeleteCheckout = () => {
    return {
        type: actionConstants.DELETE_CHECKOUT,

    }
}