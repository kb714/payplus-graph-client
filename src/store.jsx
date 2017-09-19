import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { ApolloClient } from 'react-apollo';
import { sessionReducer } from './reducers';

export const client = new ApolloClient();
export const store = createStore(
    combineReducers(
        {
            session: sessionReducer,
            apollo: client.reducer(),
        }
    ),
    {
        // initial state
    },
    compose(
        applyMiddleware(client.middleware()),
        // If you are using the devToolsExtension, you can add it here also
        (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    )
);