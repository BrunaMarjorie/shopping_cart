import React from "react";
import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete } from "react-icons/md"
import { Container, ProductTable, Total } from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateAmount } from "../../store/slices/cart/reducer";
import { formatPrice } from "../../util/format";

export default function Cart() {
    const { products } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    let total = 0;
 
    const cartProducts = products.map(product => ({
        ...product,
        subTotal: formatPrice(product.price * product.amount),
    }));

   products.forEach((product) => total += product.price * product.amount);
   
   total = formatPrice(total);

   console.log(products)

    return (
    <Container>
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
            {cartProducts.map(product => (
                <tr key={product.id}>
                <td>
                    <img src={product.image} alt={product.title}/>
                </td>
                <td>
                    <strong>{product.title}</strong>
                    <span>{product.formattedPrice}</span>
                </td>
                <td>
                    <div>
                        <button type="button" onClick={() => dispatch(updateAmount({product: product, amount: -1}))}>
                            <MdRemoveCircleOutline size={20} color="#7159c1"/>
                        </button>
                        <input type="number" readOnly value={product.amount}/>
                        <button type="button" onClick={() => dispatch(updateAmount({product: product, amount: 1}))}>
                            <MdAddCircleOutline size={20} color="#7159c1"/>
                    </button>
                    </div>
                </td>
                <td>
                    <span>{product.subTotal}</span>
                </td>
                <td>
                    <button type="button" onClick={() => dispatch(removeFromCart(product.id))}>
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
    </Container>);
}