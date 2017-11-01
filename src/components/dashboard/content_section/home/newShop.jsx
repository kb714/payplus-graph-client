import React from "react";
import {connect} from "react-redux";
// Dashboard actions
import {dashboardActions} from "../../../../actions/dashboard";
// Graphql
import {CREATE_SHOP_MUTATION} from "../../../../lib/graphql/mutations";
// UI
import {Form, Input, Modal, Upload, message, Icon} from "antd";
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
        const imageUrl = this.state.imageUrl;
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
                    <FormItem label="Imagen de comercio">
                        <Upload
                            className="avatar-uploader"
                            name="image"
                            showUploadList={false}
                            beforeUpload={this.beforeUpload}
                        >
                            {
                                imageUrl ?
                                    <img src={imageUrl} alt="" className="avatar" /> :
                                    <Icon type="plus" className="avatar-uploader-trigger" />
                            }
                        </Upload>
                    </FormItem>
                </Form>
            </Modal>
        );
    }

    beforeUpload = (file) =>
    {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        console.log(file.type);
        if (!isJPG && !isPNG) {
            message.error('Solo puedes asignar una imagen en formato JPG o PNG');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Su imagen debe pesar menos de 2MB');
        }
        if(isJPG || isPNG && isLt2M)
        {
            getBase64(file, imageUrl => this.setState({ imageUrl }));
        }
        return false;
    };

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
                            name,
                            description,
                            url,
                            image: this.state.imageUrl || null
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

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

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