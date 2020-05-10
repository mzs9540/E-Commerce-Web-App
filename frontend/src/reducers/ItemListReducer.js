import * as types from '../actions/types';

const initialState = {
    products: {},
    product: [],
    loading: false,
    error: null,
};

const fetchProducts = (state, action) => {
    let newItem = [];
    newItem = newItem.concat(action.payload);
    newItem = newItem.map(p => {
        return {item: p}
    });
    return {...state, ...{products: newItem}};
};

const fetchProduct = (state, action) => {
    return {...state, ...{product: [{item: action.payload}]}};
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "CLEAR_PRODUCT":
            return {...state, ...{product: []}};
        case types.FETCH_PRODUCTS_FAIL:
            return {...state, ...{error: action.payload, loading: false, products: {}}};
        case types.FETCH_PRODUCTS_SUCCESS:
            return fetchProducts(state, action);
        case types.FETCH_PRODUCT_SUCCESS:
            return fetchProduct(state, action);
        case types.FETCH_PRODUCTS_START:
            return {...state, ...{loading: true}};
        default:
            return state;
    }
}
