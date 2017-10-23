import React from "react";
import {graphql} from "react-apollo";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
// Graphql
import {SHOW_SHOP_QUERY} from "../../../../lib/graphql/queries";
// UI
import {Button, Col, Row} from "antd";
// local components
import ShopInformationComponent from "./shopInformation";
// style
import "./index.css";

class ShopComponent extends React.Component
{
    render()
    {
        console.log(this.props.match.params.id);
        return(
            <div>
                <Row type="flex" justify="space-around">
                    <Col span={24}>
                        <div className="show-shop">
                            <Button type="primary"
                                    onClick={this.handleBackNavigation}>
                                Volver
                            </Button>
                            <ShopInformationComponent shop={this.props.data.shop} />
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }

    handleBackNavigation = () =>
    {
        this.props.history.push("/");
    }
}

function mapStateToProps(state)
{
    return {
        dashboard: state.dashboard
    }
}

export default withRouter(compose(graphql(SHOW_SHOP_QUERY, {options: (props) => ({variables: {id: props.match.params.id}})}), connect(mapStateToProps, {}))(ShopComponent));