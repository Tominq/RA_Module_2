import React, { useEffect, useState } from "react";
import { Modal, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLoginAction } from "../redux/login-register/userLoginSlice";
import api from ".././services/api";
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

function Login({ handleSwitchPage }) {
    // logic
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLoginStore = useSelector((store) => store.userLogin);
    const registeredUser = useSelector(
        (store) => store.userRegister.user || ""
    );
    const handleSubmit = (eventForm) => {
        eventForm.preventDefault();
        const inputEmail = eventForm.target.userEmail.value;
        const inputPassword = eventForm.target.userPassword.value;

        if (inputEmail == "" || inputPassword == "") {
            alert("Please fill in all the fields!");
            return;
        }

        const matchingUser = users.find((user) => user.email == inputEmail);

        if (!matchingUser) {
            alert("User not found! Please register or check your email.");
            return;
        }

        if (inputPassword != matchingUser.password) {
            alert("Wrong password! Please enter the correct password.");
            return;
        }

        dispatch(
            userLoginAction.login({
                userEmail: inputEmail,
                userPassword: inputPassword,
            })
        );
        localStorage.setItem("checkLogin", "true");
        alert(
            `You're now logged in! Welcome ${userLoginStore.userInfor.firstname}!`
        );
        location.reload();
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.user.findAllUser();
            setUsers(response.data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (userLoginStore.inforLogin == null) {
            if (localStorage.getItem("token")) {
                dispatch(
                    userLoginAction.checkTokenLocal(
                        localStorage.getItem("token")
                    )
                );
            }
        } else {
            navigate("/");
        }
    }, [userLoginStore.inforLogin]);

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
                            <form onSubmit={handleSubmit}>
                                <MDBInput
                                    placeholder="Email"
                                    wrapperClass="mb-4"
                                    label="Email"
                                    id="form3"
                                    type="email"
                                    name="userEmail"
                                    value={registeredUser.email}
                                />
                                <MDBInput
                                    placeholder="Password"
                                    wrapperClass="mb-4"
                                    label="Password"
                                    id="form4"
                                    type="password"
                                    name="userPassword"
                                    value={registeredUser.password}
                                />

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
                                    sign in
                                </Button>
                                <div className="text-center m-2">
                                    <p>
                                        Don't have an account?
                                        <u onClick={handleSwitchPage}>
                                            {" "}
                                            Register
                                        </u>
                                    </p>
                                </div>
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Login;
