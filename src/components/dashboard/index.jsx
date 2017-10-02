import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
// Components
import TopNavigationComponent from './topNavigation';
import LateralNavigationComponent from './lateralNavigation';
import ContentSectionComponent from './contentSection';

class DashboardComponent extends React.Component
{
    render()
    {
        return[
            <TopNavigationComponent key={1}/>,
            <LateralNavigationComponent key={2}/>,
            <ContentSectionComponent key={3}/>
        ];
    }
}

function mapStateToProps(state)
{
    return {
        session: state.session
    };
}

export default withRouter(connect(mapStateToProps, {  })(DashboardComponent));