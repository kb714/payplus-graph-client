import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
// style constant
import {STYLE_CONSTANT} from "../../../lib/style_const";
// style
import './index.css';
// UI
import {Row, Col, Spin, Button} from "antd";

class ContentSectionComponent extends React.Component
{
    render()
    {
        const m_lateralNavigationState = this.props.dashboard.lateralCollapsed;
        const m_contentStyle = {
            left: (m_lateralNavigationState ?
                STYLE_CONSTANT.LATERAL_MENU.SIZE.CLOSE :
                STYLE_CONSTANT.LATERAL_MENU.SIZE.OPEN)};

        return(
            <div id="content-section-component" style={m_contentStyle}>
                <Row type="flex" justify="space-around" align="middle" style={{height: "100%"}}>
                    {
                        this.props.dashboard.contentLoading ?
                            <Spin /> :
                            <Col span={24}>
                                <div className="text-center initial-dashboard">
                                    <h1>Bienvenido a PayPlus</h1>
                                    <hr/>
                                    Para comenzar cree su primer comercio
                                    <br/>
                                    <Button icon="plus-circle-o" shape="circle" type="danger"/>
                                </div>
                            </Col>
                    }
                </Row>
            </div>
        );
    }
}

function mapStateToProps(state)
{
    return {
        dashboard: state.dashboard
    };
}

export default withRouter(connect(mapStateToProps, {})(ContentSectionComponent));