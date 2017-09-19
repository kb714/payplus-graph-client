import React from 'react';
import { connect } from 'react-redux';
// UI
import { Card } from 'antd';
import { Link } from "react-router-dom";

class SignUpComponent extends React.Component
{
    render()
    {
        return(
            <div>
                <Card>
                    Registro <Link to="/signin">Login</Link>
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

export default connect(mapStateToProps, {  })(SignUpComponent);