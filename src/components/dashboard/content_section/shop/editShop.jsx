import React from "react";
import {connect} from "react-redux";
// Dashboard actions
import {dashboardActions} from "../../../../actions/dashboard";
// Graphql
import {UPDATE_SHOP_MUTATION} from "../../../../lib/graphql/mutations";
// UI
import {Form, Input, Modal, Upload, message, Icon, Select} from "antd";
import {compose} from "redux";
import {graphql} from "react-apollo";
const FormItem = Form.Item;

function toDataUrl(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

class EditShopComponent extends React.Component
{
    state = {
        loading: false,
        sitePrefix: 'http://'
    };

    componentDidMount(){
        const {setFieldsValue} = this.props.form;
        // can not load this date
        setFieldsValue(
                {
                    name: this.props.shop.name,
                    description: this.props.shop.description,
                    url: this.props.shop.url.replace(/^https?\:\/\//i, "")
                }
            );
        this.setState({sitePrefix: this.props.shop.url.match(/^https?\:\/\//i)});
        //getBase64(this.props.shop.image, imageUrl => this.setState({ imageUrl }));
        toDataUrl(this.props.shop.image, imageUrl => {this.setState({ imageUrl })});
    }

    render()
    {
        const {getFieldDecorator} = this.props.form;
        const imageUrl = this.state.imageUrl;
        const sitePrefix = (
            <Select onChange={this.selectSitePrefix} defaultValue={this.state.sitePrefix} style={{ width: 80 }}>
                <Select.Option value="http://">http://</Select.Option>
                <Select.Option value="https://">https://</Select.Option>
            </Select>
        );

        return(
            <Modal title="Editar comercio"
                   visible={this.props.dashboard.shops.editForm}
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
                        })(<Input addonBefore={sitePrefix} />)}
                    </FormItem>
                    <FormItem label="Imagen de comercio">
                        {getFieldDecorator('image', {})(
                            <Upload
                                className="avatar-uploader"
                                name="image"
                                showUploadList={false}
                                beforeUpload={this.beforeUpload}>
                                {
                                    imageUrl ?
                                        <img src={imageUrl} alt="" className="avatar" /> :
                                        <Icon type="plus" className="avatar-uploader-trigger" />
                                }
                            </Upload>
                        )}
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
        if((isJPG || isPNG) && isLt2M)
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
                            id: this.props.shop.id,
                            name,
                            description,
                            url: this.state.sitePrefix + url,
                            image: this.state.imageUrl || null
                        }
                    });

                    message.success("Su comercio ha sido editado correctamente");
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
        // this.setState({imageUrl: null});
        // this.props.form.resetFields();
        this.props.closeEditShopForm();
    };

    selectSitePrefix = (value) =>
    {
        this.setState({sitePrefix: value});
    };
}

const WrapperEditShopComponent =  Form.create()(EditShopComponent);

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
    graphql(UPDATE_SHOP_MUTATION, {options: {refetchQueries: ['getShopQuery']}}),
    connect(mapStateToProps, { ...dashboardActions })
)(WrapperEditShopComponent);