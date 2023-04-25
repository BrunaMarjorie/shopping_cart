import React, { Component } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { connect } from "react-redux";
import { ProductList } from "./styles";
import api from "../../services/api";
import { formatPrice } from "../../util/format";
import { addToCart } from "../../store/slices/cart/thunk";


class Home extends Component {
    state = {
        products: []
    }

    async componentDidMount() {
        const response = await api.get("products");

        const data = response.data.map(product => ({
            ...product,
            formattedPrice: formatPrice(product.price)
        }))

        this.setState({products: data});
    }

    handleAddProduct = id => {
        const { dispatch } = this.props;

        dispatch(addToCart(id));
    }

    render() {
        const { products } = this.state;
        const { amount } = this.props;

        return (<ProductList>
            {products.map(product => 
            (
                <li key={product.id}>
                <img src={product.image} alt="book"/>
                <strong>{product.title}</strong>
                <span>{product.formattedPrice}</span>
                <button type="button" onClick={() => this.handleAddProduct(product.id)}>
                    <div>
                        <MdAddShoppingCart size={16} color="#FFF"/> {amount[product.id] || 0}
                    </div>
                    <span>Add to Cart</span>
                </button>
            </li>
            )    
        )}
        </ProductList>);
    }
}

const mapStateToProps = state => ({
    amount: state.cart.products.reduce((amount, product) => {
        amount[product.id] = product.amount;

        return amount;
    }, {})
})

export default connect(mapStateToProps)(Home);