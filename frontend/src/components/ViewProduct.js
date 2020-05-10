import React, {Component} from "react";
import { connect } from 'react-redux';
import {fetchProducts, addToCart, buyNow, getCart, emptyProduct} from "../actions/eCommerceActions";
import {Grid, Typography, Fab, Box} from "@material-ui/core";
import ShopIcon from '@material-ui/icons/Shop';
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import {Link} from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";

class ViewProduct extends Component {
    state = {item: null};

    componentDidMount() {
        this.props.fetchProducts(this.props.match.params.prodId);
        this.setState({item: this.props.item})
    }
    componentWillUnmount() {
        this.props.emptyProduct();
    }

    handleAddToCart = item => {
        this.props.addToCart(item,'5', this.props.location);
    };

    handleBuy = item => {
        this.props.buyNow(item.item, 5);
    };

    render() {
        let code;
        if(this.props.item[0] === undefined){
            code = <Container style={{textAlign: 'center'}}><br/><br/><br/><br/>
                <CircularProgress color="secondary"/>
                <br/><br/><br/>
            </Container>
        } else {
            let item;
            if (this.props.products.length > 0) {
                item = this.props.products.find(e => e.item.id === this.props.item[0].item.id);
            }
            let button;
            if (!item) {
                button = <Fab variant='extended' color='secondary' aria-label='buy'
                              onClick={() => this.handleAddToCart(this.props.item[0])}>
                    <ShoppingCartOutlinedIcon/>
                    Add To Cart
                </Fab>
            } else {
                button = <Link to="/checkout"><Fab variant='extended' color='secondary' aria-label='buy'>
                    <ShoppingCartOutlinedIcon/>
                    Go To Cart
                </Fab>
                </Link>
            }
            code = <Box boxShadow={3} style={{margin: '20px', padding: '10px'}}>
                    <Grid container style={{textAlign: "center"}}>
                        <Grid item sm style={{height: '80vh', position: "relative"}}>
                            <a href={this.props.item[0].item.img_url}>
                            <img src={this.props.item[0].item.img_url}
                                 alt={this.props.item[0].item.name}
                                 height="100%"
                                 width="100%"
                                 style={{'borderRadius': '10%'}}
                            />
                            </a>
                        </Grid>
                        <Grid item sm>
                            <Typography variant='h3' align='center'>{this.props.item[0].item.name}</Typography>
                            <hr/>
                            <Typography>Model No.: {this.props.item[0].item.model_no}</Typography>
                            <Typography>Type: {this.props.item[0].item.type}</Typography>
                            <Typography variant='h4'>Cost: Rs. {this.props.item[0].item.cost}</Typography>
                            <br/>
                            {button}
                            <Fab variant='extended' color='secondary' aria-label='buy'
                                 onClick={() => this.handleBuy(this.props.item[0])} style={{margin: 5}}>
                                <ShopIcon/>
                                Buy Now
                            </Fab>
                        </Grid>
                    </Grid>
                </Box>
        }
        return (
            <React.Fragment>
            {code}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        item: state.items.product,
        products: state.cart.cart,
    }
};

export default connect(mapStateToProps, {fetchProducts, addToCart,
    buyNow, getCart, emptyProduct})(ViewProduct);