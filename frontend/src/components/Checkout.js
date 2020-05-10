import React, {Component} from "react";
import {connect} from 'react-redux';
import PlaceOrder from "./PlaceOrder";
import {getCart, orderConfirmed, removeProductFromCart, setShipping, updateQuantity} from "../actions/eCommerceActions";




class Checkout extends Component {

    componentDidMount() {
        this.props.getCart();
    }

    onSelectChange = (event, item) => {
        this.props.updateQuantity(item, event.target.value);
    };

    onSubmit = (items, formValues, path) => {
        const itemFormatted = items.map(item => {
            const container = {};
            container.item_id = item.item.id;
            container.item = item;
            container.quantity = item.quantity;
            container.first_name = formValues.firstname;
            container.last_name = formValues.lastname;
            container.email = formValues.emailcheckout;
            container.phone = formValues.phonecheckout;
            container.street = formValues.roadname;
            container.h_no = formValues.housename;
            container.city = formValues.city;
            container.state = formValues.state;
            container.pincode = formValues.pincode;
            container.landmark = `${formValues.landmark}` || "Null";
            return container;
        });
        this.props.orderConfirmed(itemFormatted, path);
        this.props.setShipping(formValues);
    };

    render() {
        return (
            <PlaceOrder {...this.props} onSubmit={this.onSubmit} onSelect={this.onSelectChange}/>
        );
    }
}

const mapStateToProps = state => {
    return {
        items: state.cart.cart,
        total: state.cart.subTotal,
    }
};

export default connect(mapStateToProps,
    {
        getCart,
        removeProductFromCart,
        updateQuantity,
        orderConfirmed,
        setShipping,
    })(Checkout);
