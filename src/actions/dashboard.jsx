import * as dashboardTypes from '../lib/action_types/dashboard';

function openLateralNavigation()
{
    return {type: dashboardTypes.OPEN_LATERAL_NAV, payload: false};
}

function closeLateralNavigation()
{
    return {type: dashboardTypes.CLOSE_LATERAL_NAV, payload: true};
}

export const dashboardActions = {
    openLateralNavigation,
    closeLateralNavigation
};