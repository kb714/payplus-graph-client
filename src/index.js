import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import AppComponent from './app';
// Reducers and Apollo
import { ApolloProvider } from 'react-apollo';
import { store, client } from './store';


class InitConfigComponent extends React.Component
{
    render()
    {
        return (
            <ApolloProvider store={store} client={client}>
                <AppComponent />
            </ApolloProvider>
        );
    }
}

ReactDOM.render(<InitConfigComponent />, document.getElementById('payplus-root'));

registerServiceWorker();