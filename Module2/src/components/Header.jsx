import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import productData from "../assets/fake-data/products";
import LoginRegister from "../pages/Login-Register/Login-Register";
import logo from "../assets/images/icon/logo.svg";
import Search from "./Search";

const mainNav = [
    {
        display: "Home",
        path: "/",
    },
    {
        display: "Products",
        path: "/catalog",
    },
    {
        display: "Accessories",
        path: "/accessories",
    },
    {
        display: "Contact",
        path: "/contact",
    },
];

const Header = () => {
    const { pathname } = useLocation();
    const activeNav = mainNav.findIndex((e) => e.path === pathname);
    const headerRef = useRef(null);
    const [cartProducts, setCartProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const cartItems = useSelector((state) => state.cartItems.value);
    const [searchModalShow, setSearchModalShow] = useState(false);

    useEffect(() => {
        setCartProducts(productData.getCartItemsInfo(cartItems));
        setTotalProducts(
            cartItems.reduce((total, item) => total + Number(item.quantity), 0)
        );
    }, [cartItems]);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (
                document.body.scrollTop > 80 ||
                document.documentElement.scrollTop > 80
            ) {
                headerRef.current.classList.add("shrink");
            } else {
                headerRef.current.classList.remove("shrink");
            }
        });
        return () => {
            window.removeEventListener("scroll");
        };
    }, []);
    const menuLeft = useRef(null);

    const menuToggle = () => menuLeft.current.classList.toggle("active");

    const [modalShow, setModalShow] = useState(false);

    const token = localStorage.getItem("token") || "";
    const handleLogout = () => {
        const confirmed = window.confirm("Are you sure you want to log out?");
        if (confirmed) {
            localStorage.removeItem("token");
            localStorage.removeItem("cartItems");
            localStorage.removeItem("checkLogin");
            setCartItemCount(0);
            window.location.href = "/";
        }
    };

    return (
        // header
        <div className="header" ref={headerRef}>
            <div className="container">
                <div className="header__logo">
                    <Link to="/">
                        <img src={logo} alt="logo nè" />
                    </Link>
                </div>

                <div className="header__menu">
                    <div
                        className="header__menu__mobile-toggle"
                        onClick={menuToggle}
                    >
                        <i className="bx bx-menu-alt-left"></i>
                    </div>
                    <div className="header__menu__left" ref={menuLeft}>
                        <div
                            className="header__menu__left__close"
                            onClick={menuToggle}
                        >
                            <i className="bx bx-chevron-left"></i>
                        </div>
                        {mainNav.map((item, index) => (
                            <div
                                key={index}
                                className={`header__menu__item
                header__menu__left__item ${
                    index === activeNav ? "active" : ""
                }`}
                                onClick={menuToggle}
                            >
                                <Link to={item.path}>
                                    <span>{item.display}</span>
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="header__menu__right">
                        <div className="header__menu__item header__menu__right__item">
                            <i
                                className="bx bx-search"
                                onClick={() => setSearchModalShow(true)}
                            ></i>
                            <Search
                                show={searchModalShow}
                                onHide={() => setSearchModalShow(false)}
                            />
                        </div>
                        <div className="header__menu__item header__menu__right__item">
                            <Link to="/cart">
                                <i className="bx bx-shopping-bag"></i>
                                {totalProducts > 0 && (
                                    <div className="cart-item-count">
                                        {totalProducts}
                                    </div>
                                )}
                            </Link>
                        </div>
                        <div className="header__menu__item header__menu__right__item">
                            {token ? (
                                <Link onClick={handleLogout}>
                                    <i className="bx bx-log-out"></i>
                                </Link>
                            ) : (
                                <Link onClick={() => setModalShow(true)}>
                                    <i className="bx bx-user"></i>
                                </Link>
                            )}
                            <LoginRegister
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
