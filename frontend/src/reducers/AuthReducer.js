import * as actionTypes from '../actions/types';

const initialState = {
    username: null,
    token: null,
    error: null,
    loading: false,
};

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return {...state, ...{error: null, loading:true}};
        case actionTypes.AUTH_SUCCESS: return {...state, ...{token: action.token, error: null, loading: false, username: action.username}};
        case actionTypes.AUTH_FAIL: return {...state, ...{token: null, error: action.error, loading: false}};
        case actionTypes.AUTH_LOGOUT: return {...state, ...{token:null, username: null}};
        default: return state;
    }
};

export default reducer;