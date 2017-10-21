import React from "react";
import {connect} from "react-redux";
// Dashboard actions
import {dashboardActions} from "../../../../actions/dashboard";
// UI
import {Modal} from "antd";

class NewShopComponent extends React.Component
{
    state = {
        loading: false
    };

    render()
    {
        return(
            <Modal title="Nuevo comercio"
                   visible={this.props.dashboard.shops.newForm}
                   onOk={this.handleForm}
                   confirmLoading={this.state.loading}
                   onCancel={this.closeForm}
            >
                <p>Formulario</p>
            </Modal>
        );
    }

    handleForm = () =>
    {
        console.log("CLICK");
        this.setState(
            {
                loading: true
            }
        );
    }

    closeForm = () =>
    {
        this.props.closeNewShopForm();
    }
}

function mapStateToProps(state)
{
    return {
        dashboard: state.dashboard
    };
}

export default connect(mapStateToProps, { ...dashboardActions })(NewShopComponent);