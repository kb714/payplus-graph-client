import React from "react";
import {connect} from "react-redux";
// UI
import {Button, Form, Input, Spin} from "antd";
// Style
import "./form.css";
import {Link} from "react-router-dom";

const FormItem = Form.Item;

class SignUpForm extends React.Component
{
    constructor()
    {
        super();
        this.handleSubmit = this.handleSubmit.bind(this)
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
                                type: 'email', message: 'The input is not valid E-mail!',
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
                        label="E-mail"
                        hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [{
                                type: 'password', message: 'The input is not valid E-mail!',
                            }, {
                                required: true, message: 'Ingrese su contraseña',
                            }],
                        })(
                            <Input type="password"/>
                        )}
                    </FormItem>
                    <FormItem {...m_tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" className="sign-up-button">
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

    handleSubmit(e)
    {
        console.log("submit"); //TODO: delete line
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Valores:", values); // TODO: delete line
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

export default connect(mapStateToProps, {})(WrappedSignUpForm);