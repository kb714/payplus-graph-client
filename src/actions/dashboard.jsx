import * as dashboardTypes from '../lib/action_types/dashboard';

function openLateralNavigation()
{
    return {type: dashboardTypes.OPEN_LATERAL_NAVIGATION, payload: true};
}

function closeLateralNavigation()
{
    return {type: dashboardTypes.CLOSE_LATERAL_NAVIGATION, payload: false};
}

export const dashboardActions = {
    openLateralNavigation,
    closeLateralNavigation
};