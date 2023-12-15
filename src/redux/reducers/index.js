import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import clientReducer from "./clientReducer";
import { cartReducer } from "./cartReducer";

import graphReducer from "./graphReducer";

var reducers = combineReducers(
    {
        login: loginReducer,
        client: clientReducer,
        cart: cartReducer,
        graph: graphReducer
        // allForms: formReducer,
        // users: Users

    }
)

export default reducers