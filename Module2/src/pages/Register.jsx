import React, { useState, useEffect } from "react";
import { Modal, Button, Container } from "react-bootstrap";
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox,
    MDBIcon,
} from "mdb-react-ui-kit";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import api from "../services/api";
import { userRegisterAction } from "../redux/login-register/userRegisterSlice";

function Register({ handleSwitchPage }) {
    const [users, setUsers] = useState([]);

    // logic
    const RegistrationSchema = Yup.object().shape({
        firstName: Yup.string().required("First Name is required!"),
        lastName: Yup.string().required("Last Name is required!"),
        email: Yup.string()
            .email("Invalid email")
            .required("Email is required!"),
        password: Yup.string()
            .min(3, "Password must be at least 3 characters!")
            .required("Please do not leave this field empty!"),
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.user.findAllUser();
            setUsers(response.data);
        };
        fetchData();
    }, []);
    const dispatch = useDispatch();

    const handleFormSubmit = async (values, actions) => {
        let newUser = {
            firstname: values.firstName,
            lastname: values.lastName,
            email: values.email,
            password: values.password,
            cart: [],
        };
        const isEmailTaken = users.some((user) => user.email === newUser.email);

        if (isEmailTaken) {
            alert("Email is already taken. Please use a different email.");
        } else {
            dispatch(userRegisterAction.register(newUser));
            alert("Successfully! Let's log in");
        }
    };

    return (
        <MDBContainer
            fluid
            className="p-4 background-radial-gradient overflow-hidden"
        >
            <MDBRow>
                <MDBCol
                    md="6"
                    className="text-center text-md-start d-flex flex-column justify-content-center"
                >
                    <img
                        src="https://i.pinimg.com/originals/d7/c7/5e/d7c75e0fd8bffe09387b7d1e8c7d99e2.png"
                        alt=""
                    />
                </MDBCol>

                <MDBCol md="6" className="position-relative">
                    <div
                        id="radius-shape-1"
                        className="position-absolute rounded-circle shadow-5-strong"
                    ></div>
                    <div
                        id="radius-shape-2"
                        className="position-absolute shadow-5-strong"
                    ></div>

                    <MDBCard className="my-5 bg-glass">
                        <MDBCardBody className="p-5">
                            {/* formik */}
                            <Formik
                                initialValues={{
                                    firstname: "",
                                    lastname: "",
                                    email: "",
                                    password: "",
                                }}
                                validationSchema={RegistrationSchema}
                                onSubmit={(values) => handleFormSubmit(values)}
                            >
                                {({ handleSubmit }) => (
                                    <Form onSubmit={handleSubmit}>
                                        <MDBRow>
                                            {/* <MDBCol col="6">
                                                <MDBInput
                                                    wrapperClass="mb-4"
                                                    label="First name"
                                                    id="form1"
                                                    type="text"
                                                />
                                            </MDBCol> */}
                                            {/* first name */}
                                            <Container className="d-flex flex-column justify-content-start gap-1 m-0 p-0">
                                                <Container className="m-0 p-0">
                                                    <ErrorMessage
                                                        style={{
                                                            position:
                                                                "absolute",
                                                            bottom: "0",
                                                        }}
                                                        name="firstName"
                                                        render={(msg) => (
                                                            <i className="text-danger">
                                                                {msg}
                                                            </i>
                                                        )}
                                                    />
                                                    <Field
                                                        type="text"
                                                        name="firstName"
                                                        wrapperClass="mb-2"
                                                        // className="mw-100"
                                                        as={MDBInput}
                                                        placeholder="First Name"
                                                    />
                                                </Container>

                                                <Container className="m-0 p-0">
                                                    <ErrorMessage
                                                        name="lastName"
                                                        render={(msg) => (
                                                            <i className="text-danger">
                                                                {msg}
                                                            </i>
                                                        )}
                                                    />
                                                    <Field
                                                        type="text"
                                                        name="lastName"
                                                        as={MDBInput}
                                                        wrapperClass="mb-2"
                                                        // className="w-100"
                                                        placeholder="Last Name"
                                                    />
                                                </Container>
                                                {/* email - password */}
                                                <Container className="m-0 p-0">
                                                    <ErrorMessage
                                                        name="email"
                                                        render={(msg) => (
                                                            <i className="text-danger">
                                                                {msg}
                                                            </i>
                                                        )}
                                                    />
                                                    <Field
                                                        type="email"
                                                        name="email"
                                                        as={MDBInput}
                                                        wrapperClass="mb-2"
                                                        placeholder="Email"
                                                    />
                                                </Container>
                                                <Container className="m-0 p-0">
                                                    <ErrorMessage
                                                        name="password"
                                                        render={(msg) => (
                                                            <i className="text-danger">
                                                                {msg}
                                                            </i>
                                                        )}
                                                    />
                                                    <Field
                                                        type="password"
                                                        name="password"
                                                        as={MDBInput}
                                                        wrapperClass="mb-2"
                                                        placeholder="Password"
                                                    />
                                                </Container>
                                            </Container>
                                        </MDBRow>

                                        <div className="d-flex justify-content-center mb-4">
                                            <MDBCheckbox
                                                name="flexCheck"
                                                value=""
                                                id="flexCheckDefault"
                                                label="Subscribe to our newsletter"
                                            />
                                        </div>
                                        <Button
                                            variant="primary"
                                            className="mx-auto d-block w-75"
                                            type="submit"
                                        >
                                            sign up
                                        </Button>

                                        <div className="text-center">
                                            <p>You have an account</p>
                                        </div>
                                        <Button
                                            variant="primary"
                                            className="mx-auto d-block w-75"
                                            onClick={handleSwitchPage}
                                        >
                                            sign in
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Register;
