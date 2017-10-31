import {gql} from "react-apollo";

export const CREATE_SHOP_MUTATION = gql`
    mutation createShopMutation($input: ShopInputType!) 
    {
        createShop(
            input: $input
        ){
            id
            name
            description
            url
            image
        }
    }
`;

export const UPDATE_SHOP_MUTATION = gql`
    mutation updateShopMutation($shopId: ID!, $name: String!, $description: String!, $url: String!, $file: File!)
    {
        updateShop(
            shopId: $shopId
            name: $name
            description: $description,
            url: $url,
            file: $file
        ){
            id
            name
            description
            url
            image
            error
        }
    }
`;

export const DELETE_SHOP_MUTATION = gql`
    mutation deleteShopMutation($id: ID!)
    {
        deleteShop(
            id: $id
        ){
            id,
            name,
            description,
            url,
            image
        }
    }
`;