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
            url
        }
    }
`;