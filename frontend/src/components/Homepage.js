import React, {Component, Fragment} from "react";
import {Grid} from "@material-ui/core";
import CardLayout from "../layouts/Cards";
import {connect} from 'react-redux';
import {fetchProducts, getCart} from "../actions/eCommerceActions";

// const style = {
// //     Paper: {
// //         padding:20,
// //         marginTop: 10,
// //         marginBottom: 10
// //     }
// // };

class Homepage extends Component{

    componentDidMount() {
        this.props.fetchProducts();
    };

    render() {
        return (
            <Fragment>
                <Grid container style={{padding: '30px'}}>
                    <Grid item sm>
                        <CardLayout
                            item="Small Cup"
                            img="https://res.cloudinary.com/mzs/image/upload/v1574402745/Practise/Crockery%20Project/WhatsApp_Image_2019-11-13_at_20.44.38.jpg"
                            ht="300"
                            alt="Small Cup"
                            title="Cups"
                            link="/product/1"
                        />
                    </Grid>

                    <Grid item sm>
                        <CardLayout
                            item="Medium Cup"
                            img="https://res.cloudinary.com/mzs/image/upload/v1574402974/Practise/Crockery%20Project/WhatsApp_Image_2019-11-13_at_20.44.28.jpg"
                            ht="300"
                            alt="MediumCup"
                            title="Cups"
                            link="/product/2"
                        />
                    </Grid>
                    <Grid item sm>
                        <CardLayout
                            item="Big Cup"
                            img="https://res.cloudinary.com/mzs/image/upload/v1574403030/Practise/Crockery%20Project/WhatsApp_Image_2019-11-13_at_20.44.30.jpg"
                            ht="300"
                            alt="BigCup"
                            title="Cups"
                            link="/product/3"
                        />
                    </Grid>
                </Grid>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        products: Object.values(state.items.products)
    }
};

export default connect(mapStateToProps, {fetchProducts, getCart})(Homepage);