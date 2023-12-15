import { actionConstants } from "../../constants/actionConstants"


const initialState = {
    cart: [],
    discount: 0,
    checkout: null
}

export const cartReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionConstants.ADD_TO_CART:
            let exist = state?.cart?.find(x => x?.id == payload?.product?.id)
            if (exist) {
                console.log("NEW PRICE IS :", parseFloat(exist?.totalPrice?.toFixed(2)))
                return {
                    ...state, cart: state?.cart?.map(x => x?.id === payload?.product?.id ? {
                        ...exist, quantity: exist?.quantity + 1, totalPrice: parseFloat(exist?.totalPrice?.toFixed(2))
                        // + parseInt(exist?.breakDown?.totalPrice)
                    } : x)
                }

            }
            else
                return { ...state, cart: [...state.cart, payload.product] }

        case actionConstants.DELETE_FROM_CART:
            const newstate = state?.cart?.filter(item => item.id != payload.id)
            return { ...state, cart: newstate }

        case actionConstants.EMPTY_CART:
            return {}


        case actionConstants.DECREMENT_QUANTITY:

            let existProduct = state?.cart?.find(x => x.id == payload.id)
            try {
                if (existProduct && existProduct.quantity > 1) {
                    return { ...state, cart: state?.cart?.map(x => x.id === payload.id ? { ...existProduct, quantity: existProduct.quantity - 1, totalPrice: parseFloat(existProduct.totalPrice?.toFixed(2)) } : x) }
                }
                else if (existProduct.quantity <= 1) {
                    return { ...state, cart: state?.cart?.filter(item => item.id != payload.id) }
                }
            }
            catch (err) {
                console.log(err)
            }
            break;

        case actionConstants.CREATE_CHECKOUT:
            return { ...state, checkout: payload }

        case actionConstants.UPDATE_CHECKOUT_BILLING_ADDRESS:
            let tempBillingCheckout = structuredClone(state.checkout)
            tempBillingCheckout.billingAddress = payload
            return { ...state, checkout: tempBillingCheckout }

        case actionConstants.UPDATE_CHECKOUT_SHIPPING_ADDRESS:
            let tempShippingCheckout = structuredClone(state.checkout)
            tempShippingCheckout.shippingAddress = payload
            return { ...state, checkout: tempShippingCheckout }

        case actionConstants.DELETE_CHECKOUT:
            return { ...state, checkout: null }

        default:
            return state

    }

}