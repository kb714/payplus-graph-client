import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
//UI
// Form
import WrapperSignInForm from "./form";

class SignInComponent extends React.Component
{
    render()
    {
        return(
            <div className="sign-in">
                <WrapperSignInForm />
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