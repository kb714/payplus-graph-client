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
        return(
            <div>
                <TopNavigationComponent />
                <LateralNavigationComponent />
                <ContentSectionComponent />
            </div>
        );
    }
}

function mapStateToProps(state)
{
    return {
        session: state.session
    };
}

export default withRouter(connect(mapStateToProps, {  })(DashboardComponent));