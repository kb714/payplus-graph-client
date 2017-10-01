import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
// style
import './index.css';
// UI

class ContentSectionComponent extends React.Component
{
    render()
    {
        return(
            <div id="content-section-component">
                contenido
            </div>
        );
    }
}

function mapStateToProps(state)
{
    return {

    };
}

export default withRouter(connect(mapStateToProps, {})(ContentSectionComponent));