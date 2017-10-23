import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";

class ShopInformationComponent extends React.Component
{
    render()
    {
        return (
            <div>
                <h1>TIENDA</h1>
            </div>
        );
    }
}

function mapStateToProps(state)
{
    return {
        dashboard: state.dashboard
    }
}

export default withRouter(compose(connect(mapStateToProps, {}))(ShopInformationComponent));