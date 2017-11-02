import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {graphql} from "react-apollo";
// Graphql
import {DELETE_SHOP_MUTATION} from "../../../../lib/graphql/mutations";
// UI
import {Row, Col, Card, Table, Button, Popconfirm, message} from "antd";
// Shop form
import WrapperEditShopComponent from "./editShop";
// Style
import './shopInformation.css';
import {dashboardActions} from "../../../../actions/dashboard";
import {GET_SHOPS_QUERY} from "../../../../lib/graphql/queries";

class ShopInformationComponent extends React.Component
{
    state = {

    };

    render()
    {
        const {data} = this.props;
        const {shop} = data;
        const m_options = (!data.loading && <div>
            <Button type="danger"
                    shape="circle"
                    icon="edit"
                    onClick={this.handleEditShopForm} />
            <WrapperEditShopComponent shop={shop}/>
            &nbsp;
            <Popconfirm
                title="¿Seguro desea eliminar el comercio?"
                onConfirm={() => this.handleDeleteShop(shop)}
                shop={shop}>
                <Button type="danger" shape="circle" icon="delete" />
            </Popconfirm>
        </div>);

        return (
            <Row gutter={16} type="flex" className="shop-information-wrapper">
                <Col xs={24} sm={12}>
                    <Card loading={data.loading}
                          title={!data.loading && shop.name}
                          extra={m_options}
                          noHovering>
                        {!data.loading && this.renderShopInformation(shop)}
                    </Card>
                </Col>
            </Row>
        );
    }

    renderShopInformation = (shop) =>
    {
        const dataSource = [
            {
                key: '1',
                name: 'Nombre',
                value: shop.name
            },
            {
                key: '2',
                name: 'Descripción',
                value: shop.description
            },
            {
                key: '3',
                name: 'URL',
                value: shop.url
            }
        ];

        const columns = [{
            title: 'name',
            dataIndex: 'name',
            key: 'name',
            width: '100px',
            render: value => <b>{value}:</b>
        }, {
            title: 'value',
            dataIndex: 'value',
            key: 'value',
        }];

        return (
            <div>
                <div className="shop-image text-center">
                    <img src={shop.image}/>
                </div>
                <Table dataSource={dataSource} columns={columns} showHeader={false} pagination={false} size={"small"} bordered/>
            </div>
        );
    };

    handleEditShopForm = () =>
    {
        if(!this.props.dashboard.shops.editForm)
        {
            this.props.openEditShopForm();
        }
        else
        {
            this.props.closeEditShopForm();
        }
    };

    handleDeleteShop = async(shop) =>
    {
        try
        {
            const {id} = shop;
            await this.props.mutate({
                variables: {
                    id
                }
            });
            message.success("Su comercio fue eliminado correctamente");
            this.props.history.push('/');
        }
        catch(e)
        {
            if(e.graphQLErrors)
            {
                console.log(e.graphQLErrors[0].message);
            }
        }
    };
}

function mapStateToProps(state)
{
    return {
        dashboard: state.dashboard
    }
}

export default withRouter(compose(
    graphql(DELETE_SHOP_MUTATION, {options: {refetchQueries: [{query: GET_SHOPS_QUERY}]}}),
    connect(mapStateToProps, {...dashboardActions})
)(ShopInformationComponent));