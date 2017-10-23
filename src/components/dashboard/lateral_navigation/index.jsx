import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
// actions
import {dashboardActions} from "../../../actions/dashboard";
// style constant
import {STYLE_CONSTANT} from "../../../lib/style_const";
// Routes
import {ROUTES} from "../../../lib/routes";
// UI
import {Menu, Icon} from "antd";
// style
import "./index.css";

class LateralNavigationComponent extends React.Component
{
    render()
    {
        const m_lateralCollapsed = this.props.dashboard.lateralCollapsed;

        const m_lateralNavigationStyle = {
            width: m_lateralCollapsed ? STYLE_CONSTANT.LATERAL_MENU.SIZE.CLOSE : STYLE_CONSTANT.LATERAL_MENU.SIZE.OPEN};

        const m_blackHelperStyle = {
            width: m_lateralCollapsed ?
                0 : ( window.innerWidth <= STYLE_CONSTANT.LATERAL_MENU.SIZE.COLLAPSE_LIMIT ? "100%" : 0),
            background: m_lateralCollapsed ?
                "transparent" : ( window.innerWidth <= STYLE_CONSTANT.LATERAL_MENU.SIZE.COLLAPSE_LIMIT ?
                    "rgba(0, 0, 0, 0.6)" : "transparent")
        };

        return [
            <div id="black-helper" style={m_blackHelperStyle} key={0}/>,
            <div id="lateral-navigation-component" style={m_lateralNavigationStyle} key={1}>
                <Menu mode="inline"
                      inlineCollapsed={m_lateralCollapsed}
                      defaultSelectedKeys={[this.props.location.pathname]}
                      selectedKeys={[this.props.location.pathname]}
                      onClick={this.handleNavigation}>
                    {ROUTES.LATERAL.NAVIGATION.map((item) => {
                        if(!item.onlyRoute)
                        {
                            return (
                                <Menu.Item key={item.url}>
                                    <Icon type={item.icon}/>
                                    <span>{item.text}</span>
                                </Menu.Item>);
                        }
                        else
                        {
                            return (null);
                        }
                    })}
                </Menu>
            </div>,
            <div id="lateral-bottom-version" style={m_lateralNavigationStyle} key={2}>
                Alpha-0.0.1
            </div>
        ];
    }

    handleNavigation = (item) =>
    {
        this.props.history.push(item.key);
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