import React from 'react';
import { connect } from 'react-redux';
import {fetchProducts} from "../actions/eCommerceActions";

class ItemList extends React.Component {

    componentDidMount() {
        this.props.fetchProducts();
    }

    renderList() {
        return(
            this.props.items.map(item => {
                return (
                        <div className='container'>{item.name}</div>
                )

            })
        )
    }

    render() {
        console.log(this.props.items);
        return (
            <>
                {this.renderList()}
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        items: state.items
    }
};

export default connect(mapStateToProps, {fetchProducts})(ItemList);