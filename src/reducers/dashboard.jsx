import * as dashboardTypes from '../lib/action_types/dashboard';

const INITIAL_STATE = {
    lateral_navigation: false
};

export default function(state = INITIAL_STATE, action)
{
    switch(action.type)
    {
        case dashboardTypes.CLOSE_LATERAL_NAVIGATION:
            return {...state, lateral_navigation: action.payload};
        case dashboardTypes.OPEN_LATERAL_NAVIGATION:
            return {...state, lateral_navigation: action.payload};
        default:
            return state;
    }
}