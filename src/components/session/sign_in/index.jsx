import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
//UI
import {Card} from 'antd';
// Form
import WrapperSignInForm from "./form";

class SignInComponent extends React.Component
{
    render()
    {
        return(
            <div>
                <Card>
                    <WrapperSignInForm />
                </Card>
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

export default withRouter(connect(mapStateToProps, {  })(SignInComponent));