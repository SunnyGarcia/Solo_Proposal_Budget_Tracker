import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button, Stack, Form, Container } from "react-bootstrap";

const UpdateBudget = (props) => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");

    const [errors, setErrors] = useState({});

    const [userBudgetList, setUserBudgetList] = useState([]);
    const [user, setUser] = useState({});

    const navigate = useNavigate();
    
    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/budgets/${id}`)
            .then((res) => {
                console.log(res.data);
                setName(res.data.name);
                setAmount(res.data.amount);
            })
            .catch((err) => {
                console.log(err.res);
            });
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8000/api/budgets")
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setUserBudgetList(res.data);
            })
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        axios.get("http://localhost:8000/api/users",
            { withCredentials: true }
        )
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:8000/api/budgets/${id}`, {
                name,
                amount, 
            })
            .then((res) => {
                console.log(res);
                navigate("/new/budgets");
            })
            .catch((err) => {
                console.log(err.response.data.errors);
                setErrors(err.response.data.errors);
            });
    };

    return <Container className="my-4">
        <Stack direction="horizontal" gap="4" className="mb-3">
        <h1 className="me-auto">Add a Budget</h1>
        <h2>{user.username}</h2>
        {
            userBudgetList.map((budget, index) => (
                <div
                    key={budget._id}
                >
                    <Link to={`/user/profile/${budget.createdBy?.username}`}>
                        <Button variant="info">{budget.createdBy?.username} Budget</Button>
                    </Link>
                </div>
            ))
        }
        </Stack>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBudgetName">
                <Form.Label>Budget Name</Form.Label>
                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                {errors.name ? <p>{errors.name.message}</p> : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBudgetAmount">
                <Form.Label>Budget Amount: $</Form.Label>
                <Form.Control type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
                {errors.amount ? <p>{errors.amount.message}</p> : null}
            </Form.Group>
            <Button variant="success" type="submit">
                Update Budget
            </Button>
        </Form>
    </Container>
};

export default UpdateBudget;
