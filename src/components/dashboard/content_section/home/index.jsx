import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {graphql, compose} from "react-apollo";
// UI
import {Button, Card, Col, Row} from "antd";
// Graphql
import {GET_SHOPS_QUERY} from "../../../../lib/graphql/queries";
// Text
import {PLAIN_TEXT} from "../../../../lib/plainText";
// style
import "./index.css";
// Dashboard Actions
import {dashboardActions} from "../../../../actions/dashboard";
// shop form
import WrapperNewShopComponent from "./newShop";

class HomeSectionComponent extends React.Component
{
    render()
    {
        // check if data is loading
        if(this.props.data.loading)
        {
            return(<h1>LOADING</h1>);
        }
        else
        {
            // check qty of shops, if count is 0 show welcome message
            if(this.props.data.shops.length < 1)
            {
                return(
                    <Row type="flex" justify="space-around" align="middle" style={{ height: "100%" }}>
                        <Col span={24}>
                            <div className="text-center initial-dashboard">
                                <h1>{PLAIN_TEXT.BASE.WELCOME.TITLE}</h1>
                                {PLAIN_TEXT.BASE.WELCOME.SUBTITLE}
                                <br/>
                                <Button icon="plus-circle-o"
                                        shape="circle"
                                        type="danger"
                                        onClick={this.handleNewShopForm}/>
                                <WrapperNewShopComponent />
                            </div>
                        </Col>
                    </Row>
                );
            }
            else
            {
                const m_cardStyle = {
                    marginBottom: "15px",
                    border: "1px solid #e0e0e0"
                };

                return(
                    <div>
                        <Row type="flex" justify="space-around">
                            <Col span={24}>
                                <div className="toolbar">
                                    <Button type="primary"
                                            onClick={this.handleNewShopForm}>
                                        Crear nuevo comercio
                                    </Button>
                                    <WrapperNewShopComponent />
                                </div>
                            </Col>
                        </Row>
                        <div style={{ padding: '0 30px' }}>
                            <Row gutter={16} type="flex">
                                {this.props.data.shops.map((item, key) => {
                                    return (
                                        <Col xs={24} sm={12} md={8} lg={6} key={key}>
                                            <Card title={item.name}
                                                  style={m_cardStyle}
                                                  bordered={false}>
                                                <div className="text-center">
                                                    <div className="card-image">
                                                        <div className="inner">
                                                            <img src={item.image}/>
                                                        </div>
                                                    </div>
                                                    <div className="card-content">
                                                        {item.description}
                                                        <br />
                                                        <b>{item.url}</b>
                                                    </div>
                                                    <Button type="danger"
                                                            onClick={() => this.handleShopDetail(item)}
                                                            ghost>
                                                        Detalles
                                                    </Button>
                                                </div>
                                            </Card>
                                        </Col>
                                    );
                                })}

                            </Row>
                        </div>
                    </div>
                );
            }
        }
    }

    handleNewShopForm = () =>
    {
        if(!this.props.dashboard.shops.newForm)
        {
            this.props.openNewShopForm();
        }
        else
        {
            this.props.closeNewShopForm();
        }
    };

    handleShopDetail = (shop) =>
    {
        this.props.history.push(`${shop.id}&${this._slugify(shop.name)}`);
    };

    _slugify(text)
    {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w]+/g, '')       // Remove all non-word chars
            .replace(/-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    }
}


function mapStateToProps(state)
{
    return {
        dashboard: state.dashboard
    }
}

export default withRouter(compose(
    graphql(GET_SHOPS_QUERY),
    connect(mapStateToProps, {...dashboardActions})
)(HomeSectionComponent));