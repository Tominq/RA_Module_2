import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import numberWithCommas from "../utlis/numberWithCommas";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/shopping-cart/cartItemSlice";
import LoginRegister from "../pages/Login-Register/Login-Register";

const ProductView = (props) => {
    const dispatch = useDispatch();
    const [product, setProduct] = useState(
        props.product || {
            title: "",
            price: 0,
            colors: [],
            size: [],
        }
    );
    const [previewImg, setPreviewImg] = useState(product.image01);
    const [descriptionExpand, setDescriptionExpand] = useState(false);
    const [color, setColor] = useState(undefined);
    const [size, setSize] = useState(undefined);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        setProduct(
            props.product || {
                title: "",
                price: 0,
                colors: [],
                size: [],
            }
        );
        setPreviewImg(product.image01);
        setQuantity(1);
        setColor(undefined);
        setSize(undefined);
    }, [props.product]);

    const updateQuantity = (type) => {
        if (type === "plus") {
            setQuantity(quantity + 1);
        } else {
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
        }
    };

    const check = () => {
        if (color === undefined) {
            alert("Choose a color");
            return false;
        }

        if (size === undefined) {
            alert("Choose a size");
            return false;
        }

        return true;
    };

    const checkLogin = () => {
        if (!localStorage.getItem("checkLogin")) {
            setModalShow(true);
            return false;
        }
        return true;
    };

    const addToCart = () => {
        if (checkLogin() && check()) {
            dispatch(
                addItem({
                    slug: product.slug,
                    color: color,
                    size: size,
                    quantity: quantity,
                    price: product.price,
                })
            );
            alert("Success");
        }
    };

    const goToCart = () => {
        if (checkLogin() && check()) {
            dispatch(
                addItem({
                    slug: product.slug,
                    color: color,
                    size: size,
                    quantity: quantity,
                    price: product.price,
                })
            );
            navigate("/cart");
        }
    };

    return (
        <div className="product">
            <div className="product__images">
                <div className="product__images__list">
                    <div
                        className="product__images__list__item"
                        onClick={() => setPreviewImg(product.image01)}
                    >
                        <img src={product.image01} alt="" />
                    </div>
                    <div
                        className="product__images__list__item"
                        onClick={() => setPreviewImg(product.image02)}
                    >
                        <img src={product.image02} alt="" />
                    </div>
                </div>
                <div className="product__images__main">
                    <img src={previewImg} alt="" />
                </div>
                <div
                    className={`product-description ${
                        descriptionExpand ? "expand" : ""
                    }`}
                >
                    <div className="product-description__title">Info</div>
                    <div
                        className="product-description__content"
                        dangerouslySetInnerHTML={{
                            __html: product.description,
                        }}
                    ></div>
                    <div className="product-description__content__toggle">
                        <Button
                            size="sm"
                            onClick={() =>
                                setDescriptionExpand(!descriptionExpand)
                            }
                        >
                            {descriptionExpand ? "Collapse" : "See More"}
                        </Button>
                    </div>
                </div>
            </div>

            <div className="product__info">
                <div className="product__info">
                    <h1 className="product__info__title">{product.title}</h1>
                    <div className="product__info__item">
                        <span className="product__info__item__price">
                            $ {numberWithCommas(product.price)}
                        </span>
                    </div>

                    <div className="product__info__item">
                        <div className="product__info__item__title">Colors</div>
                        <div className="product__info__item__list">
                            {product.colors.map((item, index) => (
                                <div
                                    key={index}
                                    className={`product__info__item__list__item ${
                                        color === item ? "active" : ""
                                    }`}
                                    onClick={() => setColor(item)}
                                >
                                    <div className={`circle bg-${item}`}></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="product__info__item">
                        <div className="product__info__item__title">Sizes</div>
                        <div className="product__info__item__list">
                            {product.size.map((item, index) => (
                                <div
                                    key={index}
                                    className={`product__info__item__list__item ${
                                        size === item ? "active" : ""
                                    }`}
                                    onClick={() => setSize(item)}
                                >
                                    <span className="product__info__item__list__item__size">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="product__info__item">
                        <div className="product__info__item__title">
                            Quantity
                        </div>
                        <div className="product__info__item__quantity">
                            <div
                                className="product__info__item__quantity__btn"
                                onClick={() => updateQuantity("minus")}
                            >
                                <i className="bx bx-minus"></i>
                            </div>
                            <div className="product__info__item__quantity__input">
                                {quantity}
                            </div>
                            <div className="product__info__item__quantity__btn">
                                <i
                                    className="bx bx-plus"
                                    onClick={() => updateQuantity("plus")}
                                ></i>
                            </div>
                        </div>
                    </div>

                    <div className="product__info__item">
                        <Button onClick={() => addToCart()}>Add to Cart</Button>
                        <Button onClick={() => goToCart()}>Buy Now</Button>
                    </div>
                    <LoginRegister
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </div>
            </div>
        </div>
    );
};

ProductView.propTypes = {
    product: PropTypes.object,
};

export default ProductView;
