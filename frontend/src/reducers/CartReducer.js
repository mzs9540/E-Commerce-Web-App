import * as actionTypes from '../actions/types';

const initialState = {
    cart: [], // items in cart
    buynow: [],
    subTotal: 0,
    subTotalBuynow: 0,
    tax: 0.2, // 20% tax
    shipping: "standard", // standard shipping is £5
    orders: { items: [], total: 0},
    shippingAddress: {},
    isDifferentBillingAddress: false,

    paymentStatus: "",
    isCheckoutComplete: false,
    didPaymentGoThrough: false
};

const addProductToCart = (state, action) => {
    const newItem = Object.assign({}, action.item);
    newItem.quantity = action.quantity;
    return {...state, ...{cart: state.cart.concat(newItem)}}
};


const calculateCart = state => {
    const cartCopy = JSON.parse(JSON.stringify(state.cart));
    let subtotal = 0;
    cartCopy.forEach(item => (subtotal += item.item.cost * item.quantity/5));
    return {...state, ...{subTotal: subtotal}}
};

const calculateBuynow = state => {
    const buynowCopy = JSON.parse(JSON.stringify(state.buynow));
    let subtotal = 0;
    buynowCopy.forEach(item => (subtotal += item.item.cost * item.quantity/5));
    return {...state, ...{subTotalBuynow: subtotal}}
};

const updateProductQuantity = (state, action) => {
    const cartCopy = JSON.parse(JSON.stringify(state.cart));
    const item = cartCopy.find(e => e.item.id === action.payload.item.id);
    item.quantity = action.payload.quantity;
    return {...state, ...{cart: cartCopy}}
};

const updateProductQuantityBuynow = (state, action) => {
    const buyNowCopy = JSON.parse(JSON.stringify(state.buynow));
    buyNowCopy[0].quantity = action.payload.quantity;
    return {...state, ...{buynow: buyNowCopy}}
};

const removeItemCart = (state, action) => {
    let cartCopy = JSON.parse(JSON.stringify(state.cart));
    cartCopy = cartCopy.filter(e => e.item.id !== action.payload.item.id);
    return {...state, ...{cart: cartCopy}}
};

const orderConfirmed = (state, action) => {
    let subtotal = 0;
    action.payload.orders.forEach(item => subtotal += item.item.cost*item.quantity/5);
    return {...state, ...{orders: {items: action.payload.orders, subTotal: subtotal}}}
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.EMPTY_BUYNOW:
            return {...state, ...{buynow: []}};
        case "CALCULATE_BUYNOW":
            return calculateBuynow(state);
        case actionTypes.CALCULATE_CART:
            return calculateCart(state);
        case actionTypes.SET_SHIPPING:
            return {...state, ...{shippingAddress: action.payload}};
        case actionTypes.TOGGLE_CHECKOUT_COMPLETE:
            return orderConfirmed(state, action);
        case actionTypes.UPDATE_PRODUCT_QUANTITY:
            return updateProductQuantity(state, action);
        case actionTypes.UPDATE_PRODUCT_QUANTITY_BUYNOW:
            return updateProductQuantityBuynow(state, action);
        case actionTypes.BUY_NOW:
            return {...state, ...{buynow: [{item: action.payload.item, quantity: action.payload.quantity}]}};
        case actionTypes.REMOVE_PRODUCT_FROM_CART:
            return removeItemCart(state, action);
        case actionTypes.EMPTY_CART:
            return {...state, ...{cart: [], subTotal: 0, buynow: []}};
        case actionTypes.GET_CART:
            return {...state, ...{cart: action.payload}};
        case actionTypes.ADD_PRODUCT_TO_CART:
            return addProductToCart(state, action);
        default:
            return state
    }
};

export default cartReducer;
