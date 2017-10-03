import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
// actions
import {dashboardActions} from '../../../actions/dashboard';
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
    }

    render()
    {
        const m_topSizeStyle = {height: "60px", padding: "0 16px", margin: 0};
        const m_logoPayPlusStyle = {backgroundColor: "#f04134"};
        const m_notificationContent = (
            <div>
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
                <Col span={6}>
                    <Tooltip title="Menu">
                        <Button type="danger" shape="circle" icon="ellipsis" size="large" onClick={this.handleLateralNavigation}/>
                    </Tooltip>
                </Col>
                <Col span={4} className="text-center">
                    <Avatar style={m_logoPayPlusStyle} size="large">PayPlus</Avatar>
                </Col>
                <Col span={6} className="text-right">
                    <Tooltip title="">
                        <Popover content={m_notificationContent}>
                            <Badge count={5}>
                                <Button type="danger" shape="circle" icon="bell" size="large" />
                            </Badge>
                        </Popover>
                    </Tooltip>
                    <div className="user-name">
                        <Avatar style={m_avatarStyle}>JP</Avatar>
                        Juanito Pérez
                    </div>
                    <Tooltip title="Desconectar">
                        <Button type="danger" shape="circle" icon="logout" size="large" />
                    </Tooltip>
                </Col>
            </Row>
        );
    }

    handleLateralNavigation()
    {
        if(this.props.dashboard.lateralState)
        {
            this.props.closeLateralNavigation();
        }
        else
        {
            this.props.openLateralNavigation();
        }
    }
}

function mapStateToProps(state)
{
    return {
        session: state.session,
        dashboard: state.dashboard
    };
}

export default withRouter(connect(mapStateToProps, dashboardActions)(TopNavigationComponent));