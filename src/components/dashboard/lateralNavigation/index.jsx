import React from 'react';
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
// UI
import { Avatar, Button, Card } from 'antd';
// style
import './index.css';

class LateralNavigationComponent extends React.Component
{
    render()
    {
        const buttonStyle = {
            width: "100%"
        };

        const cardStyle = {
            padding: 0
        };

        const cardGridStyle = {
            width: "100%",
            textAlign: "left"
        };

        const avatarStyle = {
            verticalAlign: "middle",
            marginRight: "10px",
            backgroundColor: "#D32F2F"
        };

        return(
            <div id="lateral-navigation-component" className="text-center">
                <Button type="primary" style={buttonStyle}>Crear nuevo comercio</Button>
                <div className="shop-iteration">
                    <Card noHovering bodyStyle={cardStyle}>
                        <Link to="/">
                            <Card.Grid style={cardGridStyle}>
                                <Avatar style={avatarStyle}>P</Avatar>
                                Primer Comercio
                            </Card.Grid>
                        </Link>
                        <Link to="/">
                            <Card.Grid style={cardGridStyle}>
                                <Avatar style={avatarStyle}>S</Avatar>
                                Segundo Comercio
                            </Card.Grid>
                        </Link>
                    </Card>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state)
{
    return {
        session: state.session
    };
}

export default withRouter(connect(mapStateToProps, {})(LateralNavigationComponent));