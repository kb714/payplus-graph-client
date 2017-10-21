import * as dashboardTypes from '../lib/action_types/dashboard';
import {STYLE_CONSTANT} from "../lib/style_const/index";

const INITIAL_STATE = {
    lateralCollapsed: window.innerWidth <= STYLE_CONSTANT.LATERAL_MENU.SIZE.COLLAPSE_LIMIT,
    contentLoading: false,
    shops: {
        newForm: false,
        test: true
    }
};

export default function(state = INITIAL_STATE, action)
{
    switch(action.type)
    {
        // ------------------------------------------------------------ //
        case dashboardTypes.CLOSE_LATERAL_NAV:
            return { ...state, lateralCollapsed: action.payload };
        // ------------------------------------------------------------ //
        case dashboardTypes.OPEN_LATERAL_NAV:
            return { ...state, lateralCollapsed: action.payload };
        // ------------------------------------------------------------ //
        case dashboardTypes.SHOP_NEW_FORM_OPEN:
            return { ...state, shops: { ...state.shops, newForm: action.payload } };
        // ------------------------------------------------------------ //
        case dashboardTypes.SHOP_NEW_FORM_CLOSE:
            return { ...state, shops: { ...state.shops, newForm: action.payload } };
        // ------------------------------------------------------------ //
        default:
            return state;
    }
}