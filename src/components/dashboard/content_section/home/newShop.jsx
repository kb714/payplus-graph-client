import React from "react";
import {connect} from "react-redux";

class NewShopComponent extends React.Component
{
    render()
    {
        return(<h1>MODAL</h1>);
    }
}

function mapStateToProps(state)
{
    return {
        dashboard: state.dashboard
    };
}

export default connect(mapStateToProps, {})(NewShopComponent);