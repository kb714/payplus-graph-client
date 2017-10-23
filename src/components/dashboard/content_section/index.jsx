import React from "react";
import {connect} from "react-redux";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
// style constant
import {STYLE_CONSTANT} from "../../../lib/style_const";
// style
import './index.css';
// UI
import {Spin} from "antd";
import {ROUTES} from "../../../lib/routes";

class ContentSectionComponent extends React.Component
{
    render()
    {
        const m_contentStyle = {
            left: (this.props.dashboard.lateralCollapsed ?
                    STYLE_CONSTANT.LATERAL_MENU.SIZE.CLOSE :
                    (
                        // no close if width is less collapse limit
                        window.innerWidth <= STYLE_CONSTANT.LATERAL_MENU.SIZE.COLLAPSE_LIMIT ?
                            STYLE_CONSTANT.LATERAL_MENU.SIZE.CLOSE :
                            STYLE_CONSTANT.LATERAL_MENU.SIZE.OPEN
                    )
            )};

        return(
            <div id="content-section-component" style={m_contentStyle}>
                {
                    this.props.dashboard.contentLoading ?
                        <Spin /> :

                        <Switch>
                            {ROUTES.LATERAL.NAVIGATION.map((item) => {
                                return <Route
                                    key={item.url}
                                    exact={item.exact}
                                    path={item.url}
                                    component={item.component} />
                            })};

                            <Redirect to="/404" />
                        </Switch>
                }
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