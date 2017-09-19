import React from 'react';
import { connect } from 'react-redux';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import DashboardComponent from "./components/dashboard";
import SessionComponent from "./components/session";
import SignInComponent from "./components/session/SignInComponent";
import SignUpComponent from "./components/session/SignUpComponent";

class AppComponent extends React.Component
{
	render()
	{
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={DashboardComponent} />
					<Route exact path="/signin" component={SessionComponent(SignInComponent)} />
					<Route exact path="/signup" component={SessionComponent(SignUpComponent)} />
				</Switch>
			</BrowserRouter>
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