import {gql} from "react-apollo";

export const CREATE_SHOP_MUTATION = gql`
    mutation createShopMutation($name: String!, $description: String!, $url: String!) 
    {
        createShop(
            name: $name,
            description: $description,
            url: $url
        ){
            id,
            name,
            description,
            url,
            image
        }
    }
`;

export const UPDATE_SHOP_MUTATION = gql`
    mutation updateShopMutation($id: ID!, $name: String!, $description: String!, $url: String!, $image: String!)
    {
        updateShop(
            id: $id,
            name: $name,
            description: $description,
            url: $url,
            image: $image
        ){
            id,
            name,
            description,
            url,
            image
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