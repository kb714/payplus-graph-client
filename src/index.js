import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import AppComponent from './app';
import { store } from './store';

class InitConfigComponent extends React.Component
{
    render()
    {
        return(
            <div>
                <AppComponent />
            </div>
        );
    }
}

ReactDOM.render(<InitConfigComponent />, document.getElementById('payplus-root'));

registerServiceWorker();