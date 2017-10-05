import React from 'react';
import {Spin} from "antd";
import {connect} from "react-redux";
// Session action
import {sessionActions} from "../actions/session";

export default function(ComposedComponent)
{
    // TODO: refactor this class
    class RequireAuth extends React.Component
    {
        componentWillMount()
        {
            if(this.props.session.isAuthenticated || this.props.session.isAuthenticating)
            {
                this.props.fetchValidateToken();
            }
            else
            {
                this.props.history.push("/signin");
            }
        }

        componentWillReceiveProps(nextProps)
        {
            // redirect if is authenticated
            if(!nextProps.session.isAuthenticated && !nextProps.session.isAuthenticating)
            {
                this.props.history.push("/signin");
            }
        }

        render()
        {
            if(this.props.session.isAuthenticating)
            {
                return(<Spin />);
            }
            else
            {
                return(<ComposedComponent {...this.props}/>);
            }

        }

    }

    function mapStateToProps(state)
    {
        return {
            session: state.session
        };
    }

    return connect(mapStateToProps, sessionActions)(RequireAuth);

}