import React, { Component } from 'react';
import {Router, Route} from 'react-router-dom';
import Homepage from "./Homepage";
import Login from "./Login";
import { NavBar, Footer } from "../layouts";
import Signup from "./Signup";
import ItemsList from "./ItemsList";
import { connect } from 'react-redux';
import {authCheckLogin} from "../actions";
import ViewProduct from "./ViewProduct";
import Checkout from "./Checkout";
import {getCart} from "../actions/eCommerceActions";
import PrivateRoute from "../PrivateRoute";
import history from "../history";
import BuyNow from "./BuyNow";
import OrderSummary from "./OrderSummary";
import About from "./About";


class App extends Component {
    componentDidMount() {
        this.props.authCheckLogin();
        this.props.getCart();
    };

    state = {
        index:0
    };

    handleSelect = index => {
        this.setState({index});
    };

    render() {
        return (
            <Router history={history}>
                <NavBar/>
                <Route path='/' exact component={Homepage}/>
                <Route path='/hospital-list' exact component={ItemsList}/>
                <Route path='/login' exact component={Login}/>
                <Route path='/about' exact component={About}/>
                <Route path='/signup' exact component={Signup}/>
                <Route path='/products' exact component={ViewProduct}/>
                <Route path='/product/:prodId' exact component={ViewProduct}/>
                <PrivateRoute path='/checkout' component={Checkout}/>
                <PrivateRoute path='/ordersummary' component={OrderSummary}/>
                <Route path='/buynow' component={BuyNow}/>
                <Footer />
            </Router>
        )
    }
}

export default connect(null, {authCheckLogin, getCart})(App);