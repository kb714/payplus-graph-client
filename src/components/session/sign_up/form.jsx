import React from "react";
import {connect} from "react-redux";
// Session Actions
import {sessionActions} from "../../../actions/session";
// UI
import {Button, Form, Input, Spin} from "antd";
// Style
import "./form.css";
import {Link, withRouter} from "react-router-dom";

const FormItem = Form.Item;

class SignUpForm extends React.Component
{
    state = {
        confirmDirty: false
    };

    componentWillReceiveProps(nextProps)
    {
        if(nextProps.session.isSignUpError)
        {
            this.props.resetAlerts();
            const m_signUpData = nextProps.session.signUpData.data.errors;

            let m_errors = {};

            for (let i in m_signUpData) {
                m_errors = {...m_errors, [i]: {value: this.props.form.getFieldValue(i), errors: [m_signUpData[i][0]]}}
            }

            console.log(m_errors);

            this.props.form.validateFields((error, values) => {
                if (!error)
                {
                    console.log('ok', values);
                    this.props.form.setFields({...m_errors});
                }
                else
                {
                    console.log('error', error, values);
                }
            });
        }

        if(nextProps.session.isSuccessSignUp)
        {
            this.props.history.push("/signin");
        }
    }

    render()
    {
        const { getFieldDecorator } = this.props.form;
        const m_formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const m_tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };

        return(
            <Spin spinning={false}>
                <Form onSubmit={this.handleSubmit} className="sign-up-form">
                    {/*Email*/}
                    <FormItem
                        {...m_formItemLayout}
                        label="E-mail"
                        hasFeedback>
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: 'Debe ingresar un correo electrónico válido',
                            }, {
                                required: true, message: 'Ingrese su correo',
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    {/*Password*/}
                    <FormItem
                        {...m_formItemLayout}
                        label="Contraseña"
                        hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: 'Ingrese su contraseña',
                            }, {
                                validator: this.checkConfirm,
                            }],
                        })(
                            <Input type="password" />
                        )}
                    </FormItem>
                    <FormItem
                        {...m_formItemLayout}
                        label="Confirme contraseña"
                        hasFeedback>
                        {getFieldDecorator('password_confirmation', {
                            rules: [{
                                required: true, message: 'Por favor, confirme su contraseña',
                            }, {
                                validator: this.checkPassword,
                            }],
                        })(
                            <Input type="password" onBlur={this.handleConfirmBlur} />
                        )}
                    </FormItem>

                    <FormItem {...m_tailFormItemLayout}>
                        <Button loading={this.props.session.isAuthenticating}
                                type="primary"
                                htmlType="submit"
                                className="sign-up-button">
                            Registrar
                        </Button>
                        <div className="text-center">
                            <Link to="/signin">¿Ya está registrado? Inicie sesión</Link>
                        </div>
                    </FormItem>
                </Form>
            </Spin>
        );
    }

    handleConfirmBlur = (e) =>
    {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    checkPassword = (rule, value, callback) =>
    {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password'))
        {
            callback('Las contraseñas no coinciden');
        }
        else
        {
            callback();
        }
    }

    checkConfirm = (rule, value, callback) =>
    {
        const form = this.props.form;
        if (value && this.state.confirmDirty)
        {
            form.validateFields(['password_confirmation'], { force: true });
        }
        callback();
    }

    handleSubmit = (e) =>
    {
        e.preventDefault();
        this.props.form.validateFields((err, values) =>
        {
            if (!err)
            {
                this.props.fetchSignUp(values);
            }
        });
    }
}

const WrappedSignUpForm = Form.create()(SignUpForm);

function mapStateToProps(state)
{
    return {
        session: state.session
    };
}

export default withRouter(connect(mapStateToProps, sessionActions)(WrappedSignUpForm));