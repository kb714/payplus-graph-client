import React from 'react';
import { connect } from 'react-redux';
// UI
import WrappedSignUpForm from "./form";

class SignUpComponent extends React.Component
{
    render()
    {
        return(
            <div>
                <WrappedSignUpForm />
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

export default connect(mapStateToProps, {  })(SignUpComponent);