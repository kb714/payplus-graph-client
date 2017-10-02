import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
// UI
import {Button, Tooltip} from 'antd';
// style
import './index.css';

class LateralNavigationComponent extends React.Component
{
    render()
    {
        return(
            <div id="lateral-navigation-component" className="text-center">
                <Tooltip title="Nuevo comercio">
                    <Button type="default" shape="circle" icon="plus-circle-o" size="large">{null}</Button>
                </Tooltip>
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

export default withRouter(connect(mapStateToProps, {})(LateralNavigationComponent));