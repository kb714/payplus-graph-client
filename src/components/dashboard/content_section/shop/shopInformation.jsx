import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {message} from "antd";
import './shopInformation.css';
import {UPDATE_SHOP_MUTATION} from "../../../../lib/graphql/mutations";
import {graphql} from "react-apollo";

class ShopInformationComponent extends React.Component
{
    state = {};

    render()
    {
        const imageUrl = this.state.imageUrl;
        return (
            <div>
                <h1>TIENDA</h1>
                <input
                    type="file"
                    accept={'image/jpeg,image/png'}
                    required
                    onChange={this.handleChange}
                />
            </div>
        );
    }

    beforeUpload = (file) =>
    {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }

        console.log(file);

        return false;
    };

    getBase64 = (img, callback) =>
    {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    handleChange = async (event) =>
    {
        console.log("CHANGE", event.target);
        console.log(event.target.files[0]);
        this.getBase64(event.target.files[0], image => this.setState({image}));
        console.log(this.state.image);
        const m_mutationResponse = await this.props.mutate({
            variables: {
                id: this.props.shop.id,
                name: this.props.shop.name,
                description: this.props.shop.description,
                url: this.props.shop.url,
                image: this.state.image
            }
        });

        console.log(m_mutationResponse);
    };
}

function mapStateToProps(state)
{
    return {
        dashboard: state.dashboard
    }
}

export default withRouter(compose(
    graphql(UPDATE_SHOP_MUTATION),
    connect(mapStateToProps, {})
)(ShopInformationComponent));