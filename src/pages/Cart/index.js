import React from "react";
import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete } from "react-icons/md"
import { Container, ProductTable, Total, EmptyCart } from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { formatPrice } from "../../util/format";
import { updatingCart, removingFromCart } from "../../store/slices/cart/thunk";

export default function Cart() {
    const products = useSelector((state) => state.cart.products.map(product => ({
        ...product,
        subTotal: formatPrice(product.price * product.amount),
    })));
   
    const total = useSelector(state => formatPrice(
        state.cart.products.reduce((total, product) => {
            return total + product.price * product.amount
        }, 0)
    ));

    const dispatch = useDispatch();

    return (
    <>
    <Container hidden={products.length === 0}>
        <ProductTable>
            <thead>
                <tr>
                    <th />
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th />
                </tr>
            </thead>
            <tbody>
            {products.map(product => (
                <tr key={product.id}>
                <td>
                    <img src={product.image} alt={product.title}/>
                </td>
                <td>
                    <strong>{product.title}</strong>
                    <p>by {product.author}</p>
                    <span>{product.formattedPrice}</span>
                </td>
                <td>
                    <div>
                        <button type="button" onClick={() => dispatch(updatingCart({productId: product.id, amount: -1}))}>
                            <MdRemoveCircleOutline size={20} color="#7159c1"/>
                        </button>
                        <input type="number" readOnly value={product.amount}/>
                        <button type="button" onClick={() => dispatch(updatingCart({productId: product.id, amount: 1}))}>
                            <MdAddCircleOutline size={20} color="#7159c1"/>
                    </button>
                    </div>
                </td>
                <td>
                    <span>{product.subTotal}</span>
                </td>
                <td>
                    <button type="button" onClick={() => dispatch(removingFromCart({productId: product.id, amount: product.amount}))}>
                        <MdDelete size={20} color="7159c1"/>
                    </button>
                </td>
            </tr>
            ))}
            </tbody>
        </ProductTable>

        <footer>
            <button type="button">Go to checkout</button>

            <Total>
                <span>Total</span>
                <strong>{total}</strong>
            </Total>
        </footer>
    </Container>
    
    <EmptyCart hidden={products.length > 0}>
        <h3>
            Your Shopping Cart is empty.
        </h3>
    </EmptyCart>
    </>
    );
}