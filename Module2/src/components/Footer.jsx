import React from "react";
import { Link } from "react-router-dom";
import Grid from "./Grid";
import logo from "../assets/images/icon/logo.svg";

const footerAboutLinks = [
    {
        display: "Introduce",
        path: "/about",
    },
    {
        display: "Contact",
        path: "/contact",
    },
    {
        display: "Recruitment",
        path: "/recruitment",
    },
    {
        display: "News",
        path: "/news",
    },
    {
        display: "Stores",
        path: "/stores",
    },
];

const footerCustomerLinks = [
    {
        display: "Return",
        path: "/return",
    },
    {
        display: "Warranty",
        path: "/warranty",
    },
    {
        display: "Refund",
        path: "/refund",
    },
];

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <Grid col={4} mdCol={2} smCol={1} gap={10}>
                    {/* item 1 */}
                    <div>
                        <div className="footer__title">Support</div>
                        <div className="footer__content">
                            <p>
                                Contact to order <strong>0123456789</strong>
                            </p>
                            <p>
                                Order problems <strong>0123456789</strong>
                            </p>
                            <p>
                                Complaints <strong>0123456789</strong>
                            </p>
                        </div>
                    </div>

                    {/* item 2 */}
                    <div>
                        <div className="footer__title">Boooted Cat</div>
                        <div className="footer__content">
                            {footerAboutLinks.map((item, index) => (
                                <p key={index}>
                                    <Link to={item.path}>{item.display}</Link>
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* item 3 */}

                    <div>
                        <div className="footer__title">Customer Care</div>
                        <div className="footer__content">
                            {footerCustomerLinks.map((item, index) => (
                                <p key={index}>
                                    <Link to={item.path}>{item.display}</Link>
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* item 4 */}

                    <div className="footer__about">
                        <p>
                            <Link to="/">
                                <img
                                    src={logo}
                                    className="footer__logo"
                                    alt=""
                                />
                            </Link>
                        </p>
                        <p>Death is like the wind; always by my side.</p>
                    </div>
                </Grid>
            </div>
        </footer>
    );
};

export default Footer;
