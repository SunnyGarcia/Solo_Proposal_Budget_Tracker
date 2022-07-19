import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Container } from "react-bootstrap";

const Register = (props) => {
    const [confirmReg, setConfirmReg] = useState("");
    const [errors, setErrors] = useState({});

    const [ user, setUser ] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    const register = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/users/register",
        user,
        {
            withCredentials: true,
        })
        .then(res => {
            console.log(res.data);
            setUser({
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
            })

            setConfirmReg("Thank you for Registering, please log in!")
            setErrors({});
        })
        .catch((err) => {
            console.log(err);
            setErrors(err.response.data.errors);
        });
    };


    return <Container className="my-4">
        <h2>Register</h2>
        {
            confirmReg ?
            <h4 style={{color : "green"}}>{confirmReg}</h4>
            : null
        }
        <Form onSubmit={register}>
            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                    type="text" 
                    name="username" 
                    value={user.username} 
                    onChange={(e) => handleChange(e)}
                />
                {
                    errors.username ?
                        <span className="error-text">{errors.username.message }</span>
                        : null
                }
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={ handleChange } 
                />
                {
                    errors.email ?
                        <span className="errors-text">{ errors.email.message }</span>
                        : null
                }
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={ handleChange }
                />
                {
                    errors.password ?
                        <span className="errors-text">{ errors.password.message }</span>
                        : null
                }
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                    type="password"
                    name="confirmPassword"
                    value={user.confirmPassword}
                    onChange={ handleChange } 
                />
                {
                    errors.confirmPassword ?
                        <span className="error-text">{ errors.confirmPassword.message }</span>
                        : null
                }
            </Form.Group>
            <Button variant="info" type="submit">
                Register
            </Button>
        </Form>
    </Container>
};

export default Register;