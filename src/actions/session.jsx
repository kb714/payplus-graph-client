import * as sessionTypes from '../lib/action_types/session';
import {CONFIG} from "../lib/config";
import axios from "axios";

const instance = axios.create();

function setHeaders()
{
    instance.defaults.headers.common['uid'] = localStorage.getItem('uid');
    instance.defaults.headers.common['client'] = localStorage.getItem('client');
    instance.defaults.headers.common['access-token'] = localStorage.getItem('access-token');
}

function fetchSignIn(data)
{
    return dispatch => {
        dispatch(requestSignIn());
        axios.post(CONFIG.ENDPOINT.SIGN_IN, data)
            .then((res) =>
            {
                // save header on localstorage
                localStorage.setItem('access-token', res.headers['access-token']);
                localStorage.setItem('client', res.headers['client']);
                localStorage.setItem('expiry', res.headers['expiry']);
                localStorage.setItem('uid', res.headers['uid']);
                dispatch(successSignIn());
            })
            .catch((err) =>
            {
                if(err.response.status === 401)
                {
                    dispatch(errorSignIn());
                }
                else
                {
                    dispatch(errorNetwork());
                }
            });
    }
}

function fetchValidateToken()
{
    return dispatch => {
        dispatch(requestSignIn());
        setHeaders();
        instance.get(CONFIG.ENDPOINT.VALIDATE_TOKEN)
            .then((res) =>
            {
                localStorage.setItem('access-token', res.headers['access-token'] ? res.headers['access-token'] : localStorage.getItem('access-token'));
                localStorage.setItem('client', res.headers['client'] ? res.headers['client'] : localStorage.getItem('client'));
                localStorage.setItem('expiry', res.headers['expiry'] ? res.headers['expiry'] : localStorage.getItem('expiry'));
                localStorage.setItem('uid', res.headers['uid'] ? res.headers['uid'] : localStorage.getItem('uid'));
                dispatch(successSignIn());
            })
            .catch((err) =>
            {
                if(err.response.status === 401)
                {
                    localStorage.removeItem('access-token');
                    localStorage.removeItem('client');
                    localStorage.removeItem('expiry');
                    localStorage.removeItem('uid');
                    dispatch(errorSignInToken());
                }
                else
                {
                    dispatch(errorNetwork());
                }
            });
    }
}

function fetchSignOut()
{
    return dispatch => {
        dispatch(requestSignOut());
        setHeaders();
        instance.delete(CONFIG.ENDPOINT.SIGN_OUT)
            .then((res) =>
            {
                // save header on localstorage
                localStorage.removeItem('access-token');
                localStorage.removeItem('client');
                localStorage.removeItem('expiry');
                localStorage.removeItem('uid');
                dispatch(successSignOut());
            })
            .catch((err) =>
            {
                localStorage.removeItem('access-token');
                localStorage.removeItem('client');
                localStorage.removeItem('expiry');
                localStorage.removeItem('uid');
                dispatch(successSignOut());
            });
    }
}

function resetAlerts()
{
    return {type: sessionTypes.RESET_SIGN_IN_ERRORS, payload: {isError: false, isNetworkError: false, isTokenError: false, isLogout: false}};
}

// local

function requestSignIn()
{
    return {type: sessionTypes.FETCH_SIGN_IN, payload: {isAuthenticating: true, isAuthenticated: false}};
}

function requestSignOut()
{
    return {type: sessionTypes.FETCH_SIGN_OUT, payload: {isAuthenticating: true, isAuthenticated: true, isLogout: true}};
}

function successSignIn(res)
{
    return {type: sessionTypes.SUCCESS_SIGN_IN, payload: {isAuthenticating: false, isAuthenticated: true}};
}

function successSignOut(res)
{
    return {type: sessionTypes.SUCCESS_SIGN_OUT, payload: {isAuthenticating: false, isAuthenticated: false}};
}

function errorSignIn(err)
{
    return {type: sessionTypes.ERROR_SIGN_IN, payload: {isAuthenticating: false, isAuthenticated: false, isError: true}};
}

function errorSignInToken(err)
{
    return {type: sessionTypes.ERROR_SIGN_IN, payload: {isAuthenticating: false, isAuthenticated: false, isTokenError: true}};
}

function errorNetwork(err)
{
    return {type: sessionTypes.ERROR_SIGN_IN, payload: {isAuthenticating: false, isAuthenticated: false, isNetworkError: true}};
}

export const sessionActions = {
    fetchSignIn,
    fetchSignOut,
    fetchValidateToken,
    resetAlerts
};