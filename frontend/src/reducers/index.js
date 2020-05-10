import { combineReducers } from "redux";
import ItemListReducer from "./ItemListReducer";
import AuthReducer from "./AuthReducer";
import { reducer as formReducer } from "redux-form";
import CartReducer from "./CartReducer";

export default combineReducers({
    items: ItemListReducer,
    auth: AuthReducer,
    form: formReducer,
    cart: CartReducer
});