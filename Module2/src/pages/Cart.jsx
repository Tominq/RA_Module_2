import React, { useEffect, useState } from "react";
import Helmet from "../components/Helmet";
import { useSelector, useDispatch } from "react-redux";
import productData from "../assets/fake-data/products";
import numberWithCommas from "../utlis/numberWithCommas";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import CartItems from "../components/CartItems";
import { clearCart } from "../redux/shopping-cart/cartItemSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const cartItems = useSelector((state) => state.cartItems.value);
    const [orderPending, setOrderPending] = useState(false);
    const [cartProducts, setCartProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setCartProducts(productData.getCartItemsInfo(cartItems));
        setTotalPrice(
            cartItems.reduce(
                (total, item) =>
                    total + Number(item.quantity) * Number(item.price),
                0
            )
        );
        setTotalProducts(
            cartItems.reduce((total, item) => total + Number(item.quantity), 0)
        );
    }, [cartItems]);

    const handleCheckout = () => {
        setOrderPending(true);
        dispatch(clearCart());
        navigate("/");
    };
    return (
        <Helmet title="Giỏ hàng">
            <div className="cart">
                <div className="cart__info">
                    <div className="cart__info__txt">
                        <p>You have {totalProducts} products in cart</p>
                        <div className="cart__info__txt__price">
                            <span>Total:</span>{" "}
                            <span>${numberWithCommas(Number(totalPrice))}</span>
                        </div>
                    </div>
                    <div className="cart__info__btn">
                        <Button
                            size="block"
                            onClick={handleCheckout}
                            disabled={orderPending}
                        >
                            {orderPending ? "Pending..." : "Order"}
                        </Button>
                        <Link to="/catalog">
                            <Button size="block">Continue</Button>
                        </Link>
                    </div>
                </div>
                <div className="cart__list">
                    {cartProducts.map((item, index) => (
                        <CartItems item={item} key={index} />
                    ))}
                </div>
            </div>
        </Helmet>
    );
};
export default Cart;
