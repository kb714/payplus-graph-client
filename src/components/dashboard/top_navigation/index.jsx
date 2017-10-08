import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
// actions
import {dashboardActions} from '../../../actions/dashboard';
import {sessionActions} from "../../../actions/session";
// UI
import {Row, Col, Avatar, Button, Tooltip, Badge, Popover} from 'antd';
// style
import './index.css';

class TopNavigationComponent extends React.Component
{
    constructor()
    {
        super();
        this.handleLateralNavigation = this.handleLateralNavigation.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    render()
    {
        const m_topSizeStyle = {height: "60px", padding: "0 10px", margin: 0};
        const m_notificationContent = (
            <div style={{padding: "15px"}}>
                <ul>
                    <li>Notificación 1</li>
                    <li>Notificación 2</li>
                    <li>Notificación 3</li>
                    <li>Notificación 4</li>
                    <li>Notificación 5</li>
                </ul>
            </div>
        );
        const m_avatarStyle = {verticalAlign: "middle", marginRight: "15px"};

        return(
            <Row id="top-navigation-component" gutter={16} type="flex" justify="space-between" align="middle" style={m_topSizeStyle}>
                <Col xs={{span: 3}} sm={{span: 7}} md={{span: 6}} lg={{span: 7}} xl={{span: 6}}>
                    <Tooltip title="Menu">
                        <Button type="danger" shape="circle" icon="ellipsis" size="large" onClick={this.handleLateralNavigation}/>
                    </Tooltip>
                </Col>
                <Col xs={{span: 6}} sm={{span: 2}} md={{span: 4}} lg={{span: 2}} xl={{span: 4}} className="logo-pp-container">
                    <div className="logo">
                        <span>Pay</span>Plus
                    </div>
                </Col>
                <Col xs={{span: 11}} sm={{span: 7}} md={{span: 6}} lg={{span: 7}} xl={{span: 6}} className="text-right">
                    <Tooltip title="">
                        <Popover content={m_notificationContent}>
                            <Badge count={5}>
                                <Button type="danger" shape="circle" icon="bell" size="large" />
                            </Badge>
                        </Popover>
                    </Tooltip>
                    <div className="user-name">
                        <Avatar style={m_avatarStyle}>JP</Avatar>
                        <span className="text-name">{this.props.session.uid}</span>
                    </div>
                    <Tooltip title="Desconectar">
                        <Button className="logout-btn" type="danger" shape="circle" icon="logout" size="large" onClick={this.handleSignOut}/>
                    </Tooltip>
                </Col>
            </Row>
        );
    }

    handleLateralNavigation()
    {
        if(this.props.dashboard.lateralCollapsed)
        {
            this.props.openLateralNavigation();
        }
        else
        {
            this.props.closeLateralNavigation();
        }
    }

    handleSignOut()
    {
        this.props.fetchSignOut();
    }
}

function mapStateToProps(state)
{
    return {
        session: state.session,
        dashboard: state.dashboard
    };
}

export default withRouter(connect(mapStateToProps, {...dashboardActions, ...sessionActions})(TopNavigationComponent));