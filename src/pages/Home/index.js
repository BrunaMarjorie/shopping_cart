import React, { useEffect, useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { ProductList } from "./styles";
import api from "../../services/api";
import { formatPrice } from "../../util/format";
import { addingToCart } from "../../store/slices/cart/thunk";


function Home() {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const amount = useSelector(state => state.cart.products.reduce((amount, product) => {
        amount[product.id] = product.amount;
        return amount;
    }, {}));

    useEffect(() => {
        async function loadProducts() {
            const response = await api.get("products");

            const data = response.data.map(product => ({
                ...product,
                formattedPrice: formatPrice(product.price)
            }))

            setProducts(data);
    };

        loadProducts();
    }, [])
   

    function handleAddProduct(id) {dispatch(addingToCart(id))};

    return (<ProductList>
        {products.map(product => 
        (
            <li key={product.id}>
            <img src={product.image} alt="book"/>
            <strong>{product.title}</strong>
            <span>{product.formattedPrice}</span>
            <button type="button" onClick={() => handleAddProduct(product.id)}>
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


export default Home;