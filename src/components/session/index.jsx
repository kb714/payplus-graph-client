import React from 'react';
import {Col, Row} from "antd";
import './index.css';

export default function(ComposedComponent)
{
    class SessionComponent extends React.Component
    {

        state = {
            isAuthenticated: false
        };

        // Push to login route if not authenticated on mount
        componentWillMount()
        {

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
                        <Col span={5}>
                            <ComposedComponent {...this.props}/>
                        </Col>
                    </Row>
                </div>
            );
        }

    }

    return SessionComponent

}