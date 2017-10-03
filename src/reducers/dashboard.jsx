import * as dashboardTypes from '../lib/action_types/dashboard';

const INITIAL_STATE = {
    lateralCollapsed: window.innerWidth <= 1200,
    contentLoading: false
};

export default function(state = INITIAL_STATE, action)
{
    switch(action.type)
    {
        case dashboardTypes.CLOSE_LATERAL_NAV:
            return {...state, lateralCollapsed: action.payload};
        case dashboardTypes.OPEN_LATERAL_NAV:
            return {...state, lateralCollapsed: action.payload};
        default:
            return state;
    }
}