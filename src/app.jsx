import React from "react";
import {connect } from "react-redux";
import {Route, Switch} from "react-router-dom";
import {ConnectedRouter} from "react-router-redux";
import {history} from "./store";
import DashboardComponent from "./components/dashboard";
import SessionComponent from "./components/session";
import SignInComponent from "./components/session/SignInComponent";
import SignUpComponent from "./components/session/SignUpComponent";
import NotFoundComponent from "./components/notFound";

class AppComponent extends React.Component
{
	render()
	{
		return (
			<ConnectedRouter history={history}>
				<Switch>
					<Route exact path="/signin" component={SessionComponent(SignInComponent)} />
					<Route exact path="/signup" component={SessionComponent(SignUpComponent)} />
                    <Route path="/404" component={NotFoundComponent}/>
                    <Route path="/" component={DashboardComponent} />
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