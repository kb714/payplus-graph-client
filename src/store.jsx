import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import {ApolloClient} from "react-apollo";
import {Reducers} from "./reducers/index";
import {routerMiddleware, routerReducer} from "react-router-redux";
import {createBrowserHistory} from "history";
import thunk from 'redux-thunk';

export const history = createBrowserHistory();
export const client = new ApolloClient();

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