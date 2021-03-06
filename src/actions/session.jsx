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

// signIn
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
                localStorage.setItem('api_key', res.data.data['api_key']);
                dispatch(successSignIn());
            })
            .catch((err) =>
            {
                if (err.response)
                {
                    dispatch(errorSignIn());
                }
                else if (err.request)
                {
                    dispatch(errorNetwork());
                }
                else
                {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', err.message);
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
                if (err.response)
                {
                    localStorage.removeItem('access-token');
                    localStorage.removeItem('client');
                    localStorage.removeItem('expiry');
                    localStorage.removeItem('uid');
                    dispatch(errorSignInToken());
                }
                else if (err.request)
                {
                    dispatch(errorNetwork());
                }
                else
                {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', err.message);
                }
            });
    }
}

// sign up
function fetchSignUp(data)
{
    return dispatch => {
        dispatch(requestSignUp());
        axios.post(CONFIG.ENDPOINT.SIGN_UP, data)
            .then((res) =>
            {
                // save header on localstorage
                //dispatch(successSignIn());
                console.log(res); // TODO: delete
                dispatch(successSignUp());
            })
            .catch((err) =>
            {
                if (err.response)
                {
                    dispatch(errorSignUp(err.response));
                    console.log(err.response.data) // Todo: delete
                }
                else if (err.request)
                {
                    dispatch(errorNetwork());
                }
                else
                {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', err.message);
                }
            });
    }
}

// sign out
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
    return {
        type: sessionTypes.RESET_SIGN_IN_ERRORS,
        payload:
            {
                isError: false,
                isNetworkError: false,
                isTokenError: false,
                isLogout: false,
                isSuccessSignUp: false,
                isSignUpError: false
            }
    };
}

// local

function requestSignIn()
{
    return {
        type: sessionTypes.FETCH_SIGN_IN,
        payload:
            {
                isAuthenticating: true,
                isAuthenticated: false
            }
    };
}

function requestSignUp()
{
    return {
        type: sessionTypes.FETCH_SIGN_UP,
        payload:
            {
                isAuthenticating: true
            }
    };
}

function requestSignOut()
{
    return {
        type: sessionTypes.FETCH_SIGN_OUT,
        payload:
            {
                isAuthenticating: true,
                isAuthenticated: true,
                isLogout: true
            }
    };
}

function successSignIn(res)
{
    return {
        type: sessionTypes.SUCCESS_SIGN_IN,
        payload:
            {
                isAuthenticating: false,
                isAuthenticated: true,
                uid: localStorage.getItem("uid")
            }
    };
}

function successSignUp()
{
    return {
        type: sessionTypes.SUCCESS_SIGN_UP,
        payload:
            {
                isAuthenticating: false,
                isAuthenticated: false,
                isSuccessSignUp: true,
                isSignUpError: false,
                signUpData: {}
            }
    };
}

function successSignOut(res)
{
    return {
        type: sessionTypes.SUCCESS_SIGN_OUT,
        payload:
            {
                isAuthenticating: false,
                isAuthenticated: false
            }
    };
}

function errorSignIn(err)
{
    return {
        type: sessionTypes.ERROR_SIGN_IN,
        payload:
            {
                isAuthenticating: false,
                isAuthenticated: false,
                isError: true
            }
    };
}

function errorSignUp(err)
{
    return {
        type: sessionTypes.ERROR_SIGN_IN,
        payload:
            {
                isAuthenticating: false,
                isSignUpError: true,
                signUpData: err
            }
    };
}

function errorSignInToken(err)
{
    return {
        type: sessionTypes.ERROR_SIGN_IN,
        payload:
            {
                isAuthenticating: false,
                isAuthenticated: false,
                isTokenError: true
            }
    };
}

function errorNetwork(err)
{
    return {
        type: sessionTypes.ERROR_SIGN_IN,
        payload:
            {
                isAuthenticating: false,
                isAuthenticated: false,
                isNetworkError: true
            }
    };
}

export const sessionActions = {
    fetchSignIn,
    fetchSignUp,
    fetchSignOut,
    fetchValidateToken,
    resetAlerts
};