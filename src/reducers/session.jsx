import * as sessionTypes from "../lib/action_types/session";

const INITIAL_STATE = {
    "isAuthenticating" : false,
    "isAuthenticated": !!localStorage.getItem('access-token'),
    "isError": false,
    "isTokenError": false,
    "isNetworkError": false,
    "isLogout": false
};

export default function(state = INITIAL_STATE, action)
{
    switch(action.type)
    {
        case sessionTypes.FETCH_SIGN_IN:
            return {...state, ...action.payload};
        case sessionTypes.SUCCESS_SIGN_IN:
            return {...state, ...action.payload};
        case sessionTypes.ERROR_SIGN_IN:
            return {...state, ...action.payload};
        case sessionTypes.RESET_SIGN_IN_ERRORS:
            return {...state, ...action.payload};
        case sessionTypes.VALIDATE_SIGN_IN_TOKEN:
            return {...state, ...action.payload};
        case sessionTypes.ERROR_SIGN_IN_TOKEN:
            return {...state, ...action.payload};
        case sessionTypes.FETCH_SIGN_OUT:
            return {...state, ...action.payload};
        case sessionTypes.SUCCESS_SIGN_OUT:
            return {...state, ...action.payload};
        default:
            return state;
    }
}