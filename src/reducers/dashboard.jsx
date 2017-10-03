import * as dashboardTypes from '../lib/action_types/dashboard';
import {STYLE_CONSTANT} from "../lib/style_const/index";

const INITIAL_STATE = {
    lateralCollapsed: window.innerWidth <= STYLE_CONSTANT.LATERAL_MENU.SIZE.COLLAPSE_LIMIT,
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