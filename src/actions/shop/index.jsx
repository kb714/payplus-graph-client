import * as dashboardTypes from '../../lib/action_types/dashboard';

export function openNewShopForm()
{
    return { type: dashboardTypes.SHOP_NEW_FORM_OPEN, payload: true };
}

export function closeNewShopForm()
{
    return { type: dashboardTypes.SHOP_NEW_FORM_CLOSE, payload: false };
}