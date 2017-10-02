import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
//UI
import {Card} from 'antd';

class SignInComponent extends React.Component
{
    render()
    {
        return(
            <div>
                <Card>
                    Login component <Link to="/signup">Registro</Link>
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