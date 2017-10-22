import {gql} from "react-apollo";

export const GET_SHOPS_QUERY = gql`
    query getShopQuery
    {
        shops 
        {
            id
            name
            description
            url
        }
    }
`;