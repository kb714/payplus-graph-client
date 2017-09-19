import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
// Components
import TopNavigationComponent from "./topNavigationComponent";
import LateralNavigationComponent from "./lateralNavigationComponent";

class DashboardComponent extends React.Component
{
    render()
    {
        return(
            <div>
                <TopNavigationComponent />
                <LateralNavigationComponent />
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