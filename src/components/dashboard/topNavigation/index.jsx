import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
// UI
import {Row, Col, Avatar, Dropdown, Menu, Button} from 'antd';
// style
import './index.css';

class TopNavigationComponent extends React.Component
{
    render()
    {
        const avatarStyle = {
            verticalAlign: "middle",
            marginRight: "10px",
            backgroundColor: "#FFFFFF",
            color: "#D32F2F"
        };

        const userLinkStyle = {
            color: "#FFFFFF",
            width: "100%"
        };

        const userMenu = (
            <Menu>
                <Menu.Item>
                    <Link to="">Perfil</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="">Seguridad</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="">Desconectar</Link>
                </Menu.Item>
            </Menu>
        );

        return(
            <div>
                <div id="top-navigation-component">

                </div>
                <div id="session-container-component">
                    <Dropdown overlay={userMenu}>
                        <a style={userLinkStyle} href="" onClick={(e) => {e.preventDefault()}}>
                            <Avatar style={avatarStyle}>Julito</Avatar> Julito Perez
                        </a>
                    </Dropdown>
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

export default withRouter(connect(mapStateToProps, {  })(TopNavigationComponent));