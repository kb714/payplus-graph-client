import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
// Components
import TopNavigationComponent from './topNavigation';
import LateralNavigationComponent from './lateralNavigation';
import ContentSectionComponent from './contentSection';
// dashboard actions
import {dashboardActions} from '../../actions/dashboard';

class DashboardComponent extends React.Component
{
    componentWillMount()
    {
        console.log(window.innerWidth);// TODO: delete this line
        if(window.innerWidth > 1200)
        {
            this.props.openLateralNavigation();
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