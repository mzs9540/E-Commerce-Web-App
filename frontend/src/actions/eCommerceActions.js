import * as types from './types';
import itemsList from "../apis/itemsList";
import history from "../history";

export const fetchProductsStart = () => {
    return {
        type: types.FETCH_PRODUCTS_START
    }
};

export const fetchProductsSuccess = products => {
    return {
        type: types.FETCH_PRODUCTS_SUCCESS,
        payload: products
    }
};

export const fetchProductSuccess = product => {
    return {
        type: types.FETCH_PRODUCT_SUCCESS,
        payload: product
    }
};

export const fetchProductsFail = error => {
    return {
        type: types.FETCH_PRODUCTS_FAIL,
        payload: error
    }
};

export const fetchProducts = (query = "") => {
    return dispatch => {
        dispatch(fetchProductsStart());
        if (query === "") {
            return itemsList.get('/items')
                .then(res => dispatch(fetchProductsSuccess(res.data)))
                .catch(err => dispatch(fetchProductsFail(err)))
        } else {
            return itemsList.get(`/items/${query}`)
                .then(res => dispatch(fetchProductSuccess(res.data)))
                .catch(err => dispatch(fetchProductsFail(err)))
        }
    }
};
export const emptyProduct = () => {
    return {
        type: "CLEAR_PRODUCT"
    }
};

export const buyNow = (item,  quantity) => (dispatch, getState) => {
    if (getState().auth.token === null) {
        history.push({ pathname: '/login', state: {from: {pathname: "/buynow"}}});
    } else {
        history.push("/buynow")
    }
    dispatch({type: types.BUY_NOW, payload: {item, quantity}});
    dispatch(calculateBuynow());
};

export const addToCartProcess = (item, quantity) => {
    return {
        type: types.ADD_PRODUCT_TO_CART,
        quantity,
        item
    }
};

export const addToCart = (item, quantity, loc) => (dispatch, getState) =>{
    if (getState().auth.token === null) {
        history.push({ pathname: '/login', state: {from: loc}})
    } else {
        const item1 = getState().cart.cart.find(e => e.item.id === item.item.id);
        if (!item1) {
            return itemsList.post('/cart/',
                {
                    'item_id': item.item.id,
                    'item': item.item,
                    'quantity': quantity
                },
                {
                    headers: {
                        Authorization: `Token ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                }).then(() => {
                    dispatch(addToCartProcess(item, 5));
                    dispatch(calculateCart());
                })
        }
    }
};

export const calculateCart = () => {
    return {
        type: types.CALCULATE_CART
    }
};

export const calculateBuynow = () => {
    return {
        type: "CALCULATE_BUYNOW"
    }
};

export const getCart = () => async dispatch => {
    const res = await itemsList.get('/cart/',
        {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });

    dispatch({type: types.GET_CART, payload: res.data});
    dispatch(calculateCart());
};

export const removeProductFromCartProcess = item => {
    return {
        type: types.REMOVE_PRODUCT_FROM_CART,
        payload: item
    }
};

export const removeProductFromCart = item => async dispatch => {
    await itemsList.delete(`/cart/${item.item.id}`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        data: {
            'item_id': item.item.id,
            'item': item.item,
            'delete_all': false
        },
    });
    dispatch(removeProductFromCartProcess(item));
    dispatch(calculateCart());
};

export const updateQuantityProcess = res => {
    return {
        type: types.UPDATE_PRODUCT_QUANTITY,
        payload: res
    }
};

export const updateQuantity = (item, quantity) => async dispatch => {
    const res = await itemsList.post('/cart/',
        {
            'item_id': item.item.id,
            'item': item.item,
            'quantity': quantity
        },
        {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
    dispatch(updateQuantityProcess(res.data));
    dispatch(calculateCart());
};

export const updateQuantityBuynow = (item, quantity) => async dispatch => {
    dispatch({
        type: types.UPDATE_PRODUCT_QUANTITY_BUYNOW,
        payload: {item, quantity}
    });
    dispatch(calculateBuynow());
};

export const emptyCartProcess = () => {
    return {
        type: types.EMPTY_CART
    }
};

export const emptyCart = () => async dispatch => {
    await itemsList.delete(`/cart/1`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        data: {
            'delete_all': true
        },
    });
    dispatch(emptyCartProcess());
};

export const emptyBuynow = () => {
    return {
        type: types.EMPTY_CART
    }
};

export const setShipping = address => {
    return {
        type: types.SET_SHIPPING,
        payload: address
    }
};

export const orderConfirmedProcess = (orders, path) => {
    return {
        type: types.TOGGLE_CHECKOUT_COMPLETE,
        payload: {orders, path}
    };
};

export const orderConfirmed = (items, path) => async dispatch => {
    const res = await itemsList.post('/order/',
        {
            items
        },
        {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
    dispatch(orderConfirmedProcess(res.data));
    history.push({ pathname: '/ordersummary', state: {from: path}});
};