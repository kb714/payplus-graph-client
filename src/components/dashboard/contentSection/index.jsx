import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
// style constant
import {STYLE_CONSTANT} from "../../../lib/style_const";
// style
import './index.css';
// UI

class ContentSectionComponent extends React.Component
{
    render()
    {
        const m_lateralNavigationState = this.props.dashboard.lateral_navigation;
        const m_contentStyle = {
            left: (m_lateralNavigationState ? STYLE_CONSTANT.LATERAL_MENU.SIZE.OPEN : STYLE_CONSTANT.LATERAL_MENU.SIZE.CLOSE)};
        return(
            <div id="content-section-component" style={m_contentStyle}>
                contenido
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