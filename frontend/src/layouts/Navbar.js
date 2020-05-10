import React from 'react';
import {AppBar, Toolbar, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import {authLogout} from "../actions";
import FadeMenu from "./FadeMenu";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import {emptyCart} from "../actions/eCommerceActions";


class NavBar extends React.Component {

    render() {
        return (
            <AppBar position='static' color="secondary">
                <Toolbar>
                    <Typography variant="h2" color='inherit'>
                        <Link to='/' className="text-white">MZS</Link>
                    </Typography>
                    <hr/>
                    <Link to='/checkout'><ShoppingCartOutlinedIcon htmlColor="white"/></Link>
                    <FadeMenu {...this.props}/>
                </Toolbar>
            </AppBar>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null,
        username: state.auth.username,
    }
};

export default connect(mapStateToProps, {authLogout, emptyCart})(NavBar);