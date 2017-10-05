import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
// UI
import {Col, Row} from "antd";
// style
import "./index.css";

class SecuritySectionComponent extends React.Component
{
    render()
    {
        return(
            <Row type="flex">
                <Col span={24}>
                    <div className="security">
                        <h1>Seguridad</h1>
                    </div>
                </Col>
            </Row>
        );
    }
}

function mapStateToProps(state)
{
    return {
        dashboard: state.dashboard
    }
}

export default withRouter(connect(mapStateToProps, {})(SecuritySectionComponent));