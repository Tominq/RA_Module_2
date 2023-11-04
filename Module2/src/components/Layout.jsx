import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import AppRoutes from "../routes/AppRoutes";
import { Router, Routes, Route } from "react-router-dom";
import ProductViewModal from "./ProductViewModal";

const Layout = () => {
    return (
        <div>
            <Header />
            <div className="container">
                <div className="main">
                    <AppRoutes />
                </div>
            </div>
            <Footer />
            <ProductViewModal />
        </div>
    );
};

export default Layout;
