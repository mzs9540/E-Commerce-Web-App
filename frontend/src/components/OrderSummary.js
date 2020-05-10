import React, {Component} from "react";
import {Typography, Grid, Box} from "@material-ui/core";
import {connect} from "react-redux";
import {emptyBuynow, emptyCart} from "../actions/eCommerceActions";


class OrderSummary extends Component {

    componentDidMount() {
        if (this.props.location.state.from !== '/buynow') {
            this.props.emptyCart()
        } else {
            this.props.emptyBuynow()
        }
    }

    render() {
        return(
            <React.Fragment>
                <br/>
                <Typography variant='h3' align='center'>Order Summary</Typography>
            <Grid container>
                <Grid container item sm={6}>
                    <Box boxShadow={3} style={{margin: '20px', padding: '10px'}}>
                        {this.props.orders.items.map((item, i) => {
                            return (
                                <Grid container spacing={1} item key={item.item.id}>
                                    <Grid item sm={3} style={{height: '20vh', position:"relative"}}>
                                        <img src={item.item.img_url}
                                             alt={item.item.name}
                                             height="80%"
                                             width="80%"
                                             style={{'borderRadius': '10%'}}
                                        />
                                    </Grid>
                                    <Grid item sm={4}>
                                        <Typography variant="subtitle2">Item: {item.item.name}</Typography>
                                        <Typography variant="subtitle2">Cost: Rs. {item.item.cost}</Typography>
                                        <Typography variant="subtitle2">Quantity : {item.quantity}
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={4}>
                                        <Typography variant="subtitle2">Type: {item.item.type}</Typography>
                                        <Typography variant="subtitle2">Model No.: {item.item.model_no}</Typography>
                                    </Grid>
                                </Grid>
                            )
                        })}
                        <Typography variant="subtitle1">Sub Total: {this.props.orders.subTotal}</Typography>
                    </Box>
                </Grid>
                <Grid item sm={6}>
                    <Box boxShadow={3} style={{margin: '20px', padding: '10px'}}>
                        <h3> Shipping Details:</h3>
                        <Typography variant="subtitle2">{this.props.add.firstname} {this.props.add.lastname}</Typography>
                        <Typography variant="subtitle2">{this.props.add.phonecheckout}</Typography>
                        <Typography variant="subtitle2">{this.props.add.housename}, {this.props.add.roadname},</Typography>
                        <Typography variant="subtitle2">{this.props.add.city}, {this.props.add.state}, {this.props.add.pincode}
                        </Typography>
                        <Typography variant="subtitle2">Landmark: {this.props.add.landmark || 'Not Provided'}</Typography>
                    </Box>
                </Grid>
            </Grid>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.cart.orders,
        add: state.cart.shippingAddress,
    }
};

export default connect(mapStateToProps, {emptyBuynow, emptyCart})(OrderSummary);
