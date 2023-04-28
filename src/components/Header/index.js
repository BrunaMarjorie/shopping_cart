import React from "react";
import { Link } from "react-router-dom";
import { MdShoppingBasket } from "react-icons/md";
import { useSelector } from "react-redux";
import { Container, Cart, Logo } from "./styles";
import logo from "../../assets/images/logo2.png";


export default function Header() {
    const cartSize = useSelector((state) => state.cart.products.length);

    return (
    <Container>
        <Link to="/">
            <Logo src={logo} alt="Book Shop"/>
        </Link>

        <Cart to="/cart">
            <div>
                <strong>My Cart</strong>
                <span>{cartSize} item(s)</span>

            </div>
            <MdShoppingBasket size={36} color="#FFF"/>
        </Cart>
    </Container>)
}