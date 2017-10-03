import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
// actions
import {dashboardActions} from "../../../actions/dashboard";
// style constant
import {STYLE_CONSTANT} from "../../../lib/style_const";
// text constant
import {TEXT_CONSTANT} from '../../../lib/text_const/lateral';
// UI
import {Menu, Icon} from 'antd';
// style
import './index.css';

class LateralNavigationComponent extends React.Component
{
    render()
    {
        const m_lateralCollapsed = this.props.dashboard.lateralCollapsed;
        const m_lateralNavigationStyle = {
            width: m_lateralCollapsed
                ? STYLE_CONSTANT.LATERAL_MENU.SIZE.CLOSE : STYLE_CONSTANT.LATERAL_MENU.SIZE.OPEN};

        return(
            <div id="lateral-navigation-component" style={m_lateralNavigationStyle}>
                <Menu mode="inline" inlineCollapsed={m_lateralCollapsed}>
                    {TEXT_CONSTANT.LATERAL.NAVIGATION.map((item, key) => {
                        return (
                            <Menu.Item key={key}>
                                <Icon type={item.ICON}/>
                                <span>{item.TEXT}</span>
                            </Menu.Item>);
                    })}
                </Menu>
            </div>
        );
    }
}

function mapStateToProps(state)
{
    return {
        session: state.session,
        dashboard: state.dashboard
    };
}

export default withRouter(connect(mapStateToProps, dashboardActions)(LateralNavigationComponent));