import {gql} from "react-apollo";

export const GET_SHOPS_QUERY = gql`
    query getShopQuery
    {
        shops 
        {
            id
            name
            description
            url,
            image
        }
    }
`;

export const SHOW_SHOP_QUERY = gql`
    query showShopQuery($id: ID!)
    {
        shop(
            id: $id
        ){
            id
            name
            description
            url
            image
        }
    }
`;