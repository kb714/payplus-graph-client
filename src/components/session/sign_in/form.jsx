import React from "react";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import {sessionActions} from "../../../actions/session";
// UI
import {Alert, Button, Checkbox, Form, Icon, Input, Spin} from "antd";
// Style
import "./form.css";
// Session actions
const FormItem = Form.Item;

class SignInForm extends React.Component
{
    constructor()
    {
        super();
        // local usage
        this.state = {errorResetflag: true};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeAlerts = this.removeAlerts.bind(this);
    }

    componentWillMount()
    {
        this.removeAlerts(this.props);
    }

    componentWillReceiveProps(nextProps)
    {
        // check if error alert is active
        this.removeAlerts(nextProps);
        // redirect if is authenticated
        if(nextProps.session.isAuthenticated && !nextProps.session.isAuthenticating)
        {
            this.props.history.push("/");
        }
    }

    removeAlerts(nextProps)
    {
        // check if error alert is active
        if((nextProps.session.isError || nextProps.session.isNetworkError
                || nextProps.session.isTokenError || nextProps.session.isLogout) && this.state.errorResetflag)
        {
            this.setState({errorResetflag: false});
            setTimeout(() => {
                this.props.resetAlerts();
                this.setState({errorResetflag: true});
            }, 4000)
        }
    }

    render()
    {
        const { getFieldDecorator } = this.props.form;
        const m_logoutAlert = <Alert message="Sesión cerrada" type="info" showIcon />;
        const m_errorAlert = <Alert message="Usuario o contraseña incorrecto" type="warning" showIcon />;
        const m_errorTokenAlert = <Alert message="Su sesión a expirado, vuelva a iniciar" type="warning" showIcon />;
        const m_errorNetworkAlert = <Alert message="Existen problemas de red, inténtelo más tarde" type="error" showIcon />;

        return (
            <Spin spinning={this.props.session.isAuthenticating} tip="Validando, espere un momento">
                <Form onSubmit={this.handleSubmit} className="sign-in-form">
                    {this.props.session.isLogout ? m_logoutAlert : null}
                    {this.props.session.isError ? m_errorAlert : null}
                    {this.props.session.isTokenError ? m_errorTokenAlert : null}
                    {this.props.session.isNetworkError ? m_errorNetworkAlert : null}
                    <br/>
                    <FormItem>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Ingrese su correo' }],
                        })(
                            <Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="Email" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Ingrese su contraseña.' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Contraseña" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>Recordar</Checkbox>
                        )}

                        <a className="login-form-forgot" style={{float: "right"}} href="">Olvidé mi contraseña</a>
                        <Button type="primary" htmlType="submit" className="sign-in-button">
                            Ingresar
                        </Button>
                        <div className="text-center">
                            <Link to="/signup">Crear nueva cuenta</Link>
                        </div>
                    </FormItem>
                </Form>
            </Spin>
        );
    }

    handleSubmit(e)
    {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.fetchSignIn(values);
            }
        });
    }
}

const WrappedSignInForm = Form.create()(SignInForm);

function mapStateToProps(state)
{
    return {
        session: state.session
    };
}

export default withRouter(connect(mapStateToProps, sessionActions)(WrappedSignInForm));