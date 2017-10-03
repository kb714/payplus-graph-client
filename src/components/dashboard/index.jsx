import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
// Components
import TopNavigationComponent from './top_navigation';
import LateralNavigationComponent from './lateral_navigation';
import ContentSectionComponent from './content_section';
// dashboard actions
import {dashboardActions} from '../../actions/dashboard';
// style constant
import {STYLE_CONSTANT} from "../../lib/style_const/index";

class DashboardComponent extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            m_currentLateralCollapse: window.innerWidth <= STYLE_CONSTANT.LATERAL_MENU.SIZE.COLLAPSE_LIMIT
        };
    }

    componentWillMount()
    {
        this.calculateLateralCollapsedState();
        window.addEventListener("resize", this.calculateLateralCollapsedState.bind(this));
    }

    componentWillUnmount()
    {
        window.removeEventListener("resize", this.calculateLateralCollapsedState.bind(this));
    }

    calculateLateralCollapsedState()
    {
        if(window.innerWidth <= STYLE_CONSTANT.LATERAL_MENU.SIZE.COLLAPSE_LIMIT)
        {
            if(this.state.m_currentLateralCollapse === this.props.dashboard.lateralCollapsed)
            {
                this.props.closeLateralNavigation();
            }
            //this.props.closeLateralNavigation();
            this.setState({m_currentLateralCollapse: true});
        }
        else
        {
            if(this.state.m_currentLateralCollapse === this.props.dashboard.lateralCollapsed)
            {
                this.props.openLateralNavigation();
            }
            //this.props.openLateralNavigation();
            this.setState({m_currentLateralCollapse: false});
        }
    }

    render()
    {
        return[
            <TopNavigationComponent key={1}/>,
            <LateralNavigationComponent key={2} />,
            <ContentSectionComponent key={4} />
        ];
    }
}

function mapStateToProps(state)
{
    return {
        session: state.session,
        dashboard: state.dashboard
    };
}

export default withRouter(connect(mapStateToProps, dashboardActions)(DashboardComponent));