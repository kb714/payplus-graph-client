import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
// UI
import {Col, Row} from "antd";
// style
import "./index.css";

class ConfigurationSectionComponent extends React.Component
{
    render()
    {
        return(
            <Row type="flex">
                <Col span={24}>
                    <div className="configuration">
                        <h1>Configuración</h1>
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

export default withRouter(connect(mapStateToProps, {})(ConfigurationSectionComponent));