import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
// actions
import {dashboardActions} from "../../../actions/dashboard";
// style constant
import {STYLE_CONSTANT} from "../../../lib/style_const";
// UI
import {Button, Tooltip} from 'antd';
// style
import './index.css';

class LateralNavigationComponent extends React.Component
{
    render()
    {
        const m_lateralMenuState = this.props.dashboard.lateralState;
        const m_lateralNavigationStyle = {
            width: m_lateralMenuState
                ? STYLE_CONSTANT.LATERAL_MENU.SIZE.OPEN : STYLE_CONSTANT.LATERAL_MENU.SIZE.CLOSE};
        let m_buttonStyle = {};

        if(m_lateralMenuState)
        {
            m_buttonStyle = {
                width: "100%",
                textAlign: "left"
            };
        }
        else
        {
            m_buttonStyle = {
                marginTop: "15px"
            };
        }

        return(
            <div id="lateral-navigation-component" className="text-center" style={m_lateralNavigationStyle}>
                <div>
                    <Tooltip title="Nuevo comercio" placement="right">
                        <Button style={m_buttonStyle}
                                type={(m_lateralMenuState ? "primary" : "default")}
                                shape={(m_lateralMenuState ? null : "circle")}
                                icon="plus-circle-o"
                                size="large">{(m_lateralMenuState ? "Nuevo comercio" : null)}</Button>
                    </Tooltip>
                </div>

                <div>
                    <Tooltip title="Configuraciones" placement="right">
                        <Button style={m_buttonStyle}
                                type={(m_lateralMenuState ? "primary" : "default")}
                                shape={(m_lateralMenuState ? null : "circle")}
                                icon="setting"
                                size="large">{(m_lateralMenuState ? "Configuraciones" : null)}</Button>
                    </Tooltip>
                </div>
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