import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {graphql, compose} from "react-apollo";
// UI
import {Button, Card, Col, Popconfirm, Row} from "antd";
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
                    textAlign: "center"
                };

                return(
                    <div>
                        <Row type="flex" justify="space-around">
                            <Col span={24}>
                                <div className="initial-shops">
                                    <Button type="primary"
                                            style={{ marginBottom: "30px" }}
                                            onClick={this.handleNewShopForm}>
                                        Crear nuevo comercio
                                    </Button>
                                    <WrapperNewShopComponent />
                                </div>
                            </Col>
                        </Row>
                        <div style={{ background: '#ECECEC', padding: '30px' }}>
                            <Row gutter={16}>
                                {this.props.data.shops.map((item, key) => {
                                    const m_deletePop = (
                                        <Popconfirm title="¿Seguro desea eliminar el comercio?">
                                            <Button shape="circle" icon="delete" />
                                        </Popconfirm>);
                                    return (
                                        <Col xs={24} sm={12} md={8} lg={6} key={key}>
                                            <Card title={item.name}
                                                  style={m_cardStyle}
                                                  bordered={false}
                                                  extra={m_deletePop}>
                                                {item.description}
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
    }
}


function mapStateToProps(state)
{
    return {
        dashboard: state.dashboard
    }
}

export default withRouter(compose(graphql(GET_SHOPS_QUERY), connect(mapStateToProps, {...dashboardActions}))(HomeSectionComponent));