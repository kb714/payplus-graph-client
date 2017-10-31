import React from "react";
import {connect} from "react-redux";
// Dashboard actions
import {dashboardActions} from "../../../../actions/dashboard";
// Graphql
import {CREATE_SHOP_MUTATION} from "../../../../lib/graphql/mutations";
// UI
import {Form, Input, Modal} from "antd";
import {compose} from "redux";
import {graphql} from "react-apollo";
import {GET_SHOPS_QUERY} from "../../../../lib/graphql/queries";
const FormItem = Form.Item;

class NewShopComponent extends React.Component
{
    state = {
        loading: false
    };

    render()
    {
        const { getFieldDecorator } = this.props.form;
        return(
            <Modal title="Nuevo comercio"
                   visible={this.props.dashboard.shops.newForm}
                   onOk={this.handleForm}
                   confirmLoading={this.state.loading}
                   onCancel={this.closeForm}
            >
                <Form layout="vertical">
                    <FormItem label="Nombre">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Por favor, ingrese el nombre de su comercio' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="Descripción">
                        {getFieldDecorator('description', {
                            rules: [{required: true, message: 'Por favor, ingresa una descripción'}]
                        })(<Input type="textarea" />)}
                    </FormItem>
                    <FormItem label="URL (dirección web)">
                        {getFieldDecorator('url', {
                            rules: [{ required: true, message: 'Ingresa una URL válida' }]
                        })(<Input />)}
                    </FormItem>
                </Form>
            </Modal>
        );
    }

    handleForm = (e) =>
    {
        e.preventDefault();
        const form = this.props.form;
        form.validateFields( async (err, values) =>
            {
                if (err) {
                    return;
                }

                this.setState({ loading: true });

                const {name, description, url} = values;

                try
                {
                    const m_mutationResponse = await this.props.mutate({
                        variables: {
                            input: {
                                name,
                                description,
                                url
                            }
                        }
                    });

                    console.log(m_mutationResponse);
                    this.setState({ loading: false });
                    // close form
                    this.closeForm();

                }
                catch(e)
                {
                    if(e)
                    {
                        console.log(e.graphQLErrors);
                        const m_errorsServer = JSON.parse(e.graphQLErrors[0].message);
                        let m_errors = {};

                        for (let i in m_errorsServer) m_errors = {
                            ...m_errors,
                            [i]: {value: this.props.form.getFieldValue(i), errors: [m_errorsServer[i][0]]}
                        }

                        this.props.form.setFields({...m_errors});

                        this.setState({ loading: false });
                    }
                }
            }
        );
    };

    closeForm = () =>
    {
        //reset fields and call action to close form
        this.props.form.resetFields();
        this.props.closeNewShopForm();
    };
}

const WrapperNewShopComponent =  Form.create()(NewShopComponent);

function mapStateToProps(state)
{
    return {
        dashboard: state.dashboard
    };
}

export default compose(
    graphql(CREATE_SHOP_MUTATION, {options: {refetchQueries: ['getShopQuery']}}),
    connect(mapStateToProps, { ...dashboardActions })
)(WrapperNewShopComponent);