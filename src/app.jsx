import React from "react";
import {connect } from "react-redux";
import {Route, Switch} from "react-router-dom";
import {ConnectedRouter} from "react-router-redux";
import {history} from "./store";
// routes
import {ROUTES} from "./lib/routes";

class AppComponent extends React.Component
{
    render()
    {
        return (
			<ConnectedRouter history={history}>
				<Switch>
                    {ROUTES.MAIN.map((item) => {
                        return <Route key={item.url} exact={item.exact} path={item.url} component={item.component} />
                    })}
				</Switch>
			</ConnectedRouter>
        );
    }
}

function mapStateToProps(state)
{
    return {
        session: state.session
    };
}

export default connect(mapStateToProps, {})(AppComponent);