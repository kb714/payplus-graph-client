import * as dashboardTypes from '../lib/action_types/dashboard';
import * as SHOPS_ACTIONS from './shop';

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
    closeLateralNavigation,
    openNewShopForm: SHOPS_ACTIONS.openNewShopForm,
    closeNewShopForm: SHOPS_ACTIONS.closeNewShopForm,
    openEditShopForm: SHOPS_ACTIONS.openEditShopForm,
    closeEditShopForm: SHOPS_ACTIONS.closeEditShopForm
};