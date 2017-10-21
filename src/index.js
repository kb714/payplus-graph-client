import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import AppComponent from './app';
// Reducers and Apollo
import {ApolloProvider} from 'react-apollo';
import {store, client} from './store';
import './index.css';
import {LocaleProvider} from "antd";
import esES from 'antd/lib/locale-provider/es_ES';


class InitConfigComponent extends React.Component
{
    render()
    {
        return (
            <LocaleProvider locale={esES}>
                <ApolloProvider store={store} client={client}>
                    <AppComponent />
                </ApolloProvider>
            </LocaleProvider>
        );
    }
}

ReactDOM.render(<InitConfigComponent />, document.getElementById('payplus-root'));

registerServiceWorker();