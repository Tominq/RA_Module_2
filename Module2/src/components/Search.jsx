import React, { useState } from "react";
import { Modal, Form, Container, Image } from "react-bootstrap";
import productData from "../assets/fake-data/products";
import { Link, useNavigate } from "react-router-dom";
// import "../sass/components/search.scss";

const Search = ({ show, onHide }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        console.log(searchQuery);
        const results = getProductsByTitle(searchQuery);
        console.log(results);
        setSearchResults(results);
    };

    const handleModalClose = () => {
        setSearchQuery("");
        setSearchResults([]);
        onHide();
    };

    const getProductsByTitle = (query) => {
        return productData
            .getAllProducts()
            .filter((product) =>
                product.title.toLowerCase().includes(query.toLowerCase())
            );
    };

    return (
        <Modal size="lg" show={show} onHide={handleModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Search</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSearchSubmit}>
                    <Form.Control
                        type="text"
                        placeholder="Search By Name"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />
                    <button type="submit" style={{ display: "none" }}></button>
                </Form>
                {searchResults.length > 0 ? (
                    <Container className="search-results p-0">
                        {searchResults.map((product) => (
                            <Link to={`/catalog/${product.slug}`}>
                                <Container
                                    onClick={() => handleModalClose()}
                                    key={product.id}
                                    className="px-2 py-5 gap-5 d-flex flex-row align-items-center justify-content-between"
                                >
                                    <Image
                                        className="w-50"
                                        src={product.image01}
                                        alt={product.title}
                                    />
                                    <Container className=" d-flex flex-column justify-content-between">
                                        <h3>{product.title}</h3>
                                        <h3>{product.price} $</h3>
                                    </Container>
                                </Container>
                            </Link>
                        ))}
                    </Container>
                ) : (
                    <Container className="py-5 text-center">
                        <h3>No item matches your search.</h3>
                        <Image
                            src="https://cdni.iconscout.com/illustration/premium/thumb/search-not-found-6275834-5210416.pngF"
                            alt="Cajc"
                        />
                    </Container>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default Search;
