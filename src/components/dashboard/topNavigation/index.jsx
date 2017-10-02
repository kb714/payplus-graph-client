import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
// UI
import {Row, Col, Avatar, Button, Tooltip, Badge, Popover} from 'antd';
// style
import './index.css';

class TopNavigationComponent extends React.Component
{
    render()
    {
        const m_topSizeStyle = {height: "60px", padding: "0 30px", margin: 0};
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

        return(
            <Row id="top-navigation-component" gutter={16} type="flex" justify="space-between" align="middle" style={m_topSizeStyle}>
                <Col span={6}>
                    {/*<Avatar style={m_logoPayPlusStyle} size="large">PayPlus</Avatar>*/}
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
                        Juanito Pérez
                    </div>
                    <Tooltip title="Desconectar">
                        <Button type="danger" shape="circle" icon="logout" size="large" />
                    </Tooltip>
                </Col>
            </Row>
        );
    }
}

function mapStateToProps(state)
{
    return {
        session: state.session
    };
}

export default withRouter(connect(mapStateToProps, {  })(TopNavigationComponent));