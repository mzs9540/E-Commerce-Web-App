import * as actionsTypes from './types';

// Action Creator
import * as axios from "axios";
import {emptyBuynow, emptyCartProcess, getCart} from "./eCommerceActions";
import history from "../history";



export const authStart = () => {
    return {
        type: actionsTypes.AUTH_START
    }
};

export const authSuccess = (token, username) => {
    return {
        type: actionsTypes.AUTH_SUCCESS,
        token: token,
        username: username
    }
};

export const authFail = error => {
    return {
        type: actionsTypes.AUTH_FAIL,
        error: error
    }
};

export const logout = () => {
    return {
        type: actionsTypes.AUTH_LOGOUT
    }
};

export const authLogout = () => {
    return dispatch => {
        axios.post('https://mzsdjango.herokuapp.com/auth/logout/',{
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        }).then(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            dispatch(emptyCartProcess());
            dispatch(emptyBuynow());
            dispatch(logout());
        })
    }
};

export const authLogin = (username, password, pathState) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('https://mzsdjango.herokuapp.com/auth/login/', {
            username: username,
            password: password
        }).then(res => {
            const token = res.data.key;
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            dispatch(authSuccess(token, username));
            dispatch(getCart());
            if (pathState !== undefined){
                history.push(pathState.from.pathname);
            } else {
                history.push('/')
            }
        }).catch(err => {
            dispatch(authFail(err));
            alert("Invalid Credentials")
        })
    }
};

export const authSignup = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('https://mzsdjango.herokuapp.com/auth/registration/', {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        }).then(res => {
            const token = res.data.key;
            localStorage.setItem('token', token);
            dispatch(authSuccess(token));
            history.push('/');
        }).catch(err => {
            dispatch(authFail(err));
            alert(err)
        })
    }
};

export const authCheckLogin = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const name = localStorage.getItem('username');
        if (token === undefined) {
            dispatch(authLogout());
            dispatch(emptyCartProcess());
            dispatch(emptyBuynow());
        } else {
            dispatch(authSuccess(token, name));
        }
    }
};

