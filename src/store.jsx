import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import {ApolloClient, createNetworkInterface} from "react-apollo";
import {Reducers} from "./reducers/index";
import {routerMiddleware, routerReducer} from "react-router-redux";
import {createBrowserHistory} from "history";
import thunk from 'redux-thunk';
import {CONFIG} from "./lib/config";

export const history = createBrowserHistory();
const networkInterface = createNetworkInterface({
    uri: CONFIG.ENDPOINT.GRAPHQL
});
networkInterface.use([{
    applyMiddleware(req, next) {
        if (!req.options.headers)
        {
            req.options.headers = {};
        }
        const api_key = localStorage.getItem('api_key');
        req.options.headers.authorization = api_key ? `${api_key}` : null;
        next();
    }
}]);
export const client = new ApolloClient({
    networkInterface: networkInterface
});

const middleware = [routerMiddleware(history), client.middleware(), thunk];

export const store = createStore(
    combineReducers(
        {
            session: Reducers.session,
            dashboard: Reducers.dashboard,
            apollo: client.reducer(),
            router: routerReducer
        }
    ),
    {
        // initial state
    },
    compose(
        applyMiddleware(...middleware),
        // If you are using the devToolsExtension, you can add it here also
        (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    )
);