import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {gql, graphql, withApollo, compose} from "react-apollo";
// UI
import {Button, Col, Row} from "antd";
// Text
import {PLAIN_TEXT} from "../../../../lib/plainText";
// style
import "./index.css";

class HomeSectionComponent extends React.Component
{
    render()
    {
        console.log(this.props);
        return(
            <Row type="flex" justify="space-around" align="middle" style={{height: "100%"}}>
                <Col span={24}>
                    <div className="text-center initial-dashboard">
                        <h1>{PLAIN_TEXT.BASE.WELCOME.TITLE}</h1>
                        {PLAIN_TEXT.BASE.WELCOME.SUBTITLE}
                        <br/>
                        <Button icon="plus-circle-o" shape="circle" type="danger" onClick={this.click.bind(this)}/>
                    </div>
                </Col>
            </Row>
        );
    }

    click()
    {
        this.props.history.push("super-avance");
    }
}

const query = gql`
          {
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

export default withRouter(compose(graphql(query), connect(mapStateToProps, {}))(HomeSectionComponent));