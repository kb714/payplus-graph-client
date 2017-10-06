import React from 'react';
import {Col, Row} from "antd";
import './index.css';
import {connect} from "react-redux";
// logo
import logo from "./logo_payplus.png";
export default function(ComposedComponent)
{
    class SessionComponent extends React.Component
    {
        // Push to login route if not authenticated on mount
        componentWillMount()
        {
            if(this.props.session.isAuthenticated && !this.props.isAuthenticating)
            {
                this.props.history.push("/");
            }
        }

        // Push to login route if not authenticated on update
        componentWillUpdate(nextProps)
        {

        }

        // Otherwise render the original component
        render()
        {
            return(
                <div id="session-wrapper">
                    <Row type="flex" justify="center">
                        <Col xs={{span: 24}} md={{span: 12}} lg={{span: 8}} xl={{span: 8}}>
                            <div className="text-center logo">
                                <img src={logo} alt="Logo"/>
                            </div>
                            <ComposedComponent {...this.props}/>
                        </Col>
                    </Row>
                </div>
            );
        }

    }

    function mapStateToProps(state)
    {
        return {
            session: state.session
        };
    }

    return connect(mapStateToProps, {})(SessionComponent)

}