import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
// UI
import {Button, Col, Row} from "antd";
// style
import "./index.css";

class HomeSectionComponent extends React.Component
{
    render()
    {
        return(
            <Row type="flex" justify="space-around" align="middle" style={{height: "100%"}}>
                <Col span={24}>
                    <div className="text-center initial-dashboard">
                        <h1>Bienvenido a PayPlus</h1>
                        Para comenzar cree su primer comercio
                        <br/>
                        <Button icon="plus-circle-o" shape="circle" type="danger" onClick={this.click.bind(this)}/>
                    </div>
                </Col>
            </Row>
        );
    }

    click()
    {
        this.props.history.push("super-avance");
    }
}

function mapStateToProps(state)
{
    return {
        dashboard: state.dashboard
    }
}

export default withRouter(connect(mapStateToProps, {})(HomeSectionComponent));