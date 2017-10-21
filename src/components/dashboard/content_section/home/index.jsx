import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {gql, graphql, compose} from "react-apollo";
// UI
import {Button, Col, Row} from "antd";
// Text
import {PLAIN_TEXT} from "../../../../lib/plainText";
// style
import "./index.css";
// Dashboard Actions
import {dashboardActions} from "../../../../actions/dashboard";
// shop form
import NewShopComponent from "./newShop";

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
                                <NewShopComponent />
                            </div>
                        </Col>
                    </Row>
                );
            }
            else
            {
                return(<h1>SHOW SHOPS</h1>);
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

const query = gql`
          query getShops {
            shops {
                name
            }
          }
        `;

function mapStateToProps(state)
{
    return {
        dashboard: state.dashboard
    }
}

export default withRouter(compose(graphql(query), connect(mapStateToProps, {...dashboardActions}))(HomeSectionComponent));