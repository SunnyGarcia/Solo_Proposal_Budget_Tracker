import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Stack, Card } from "react-bootstrap";
import Container from 'react-bootstrap//Container'

const OneBudget = (props) => {
    const {id} = props;
    const [budget, setBudget] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/budgets/${id}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setBudget(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const deleteBudget = () => {
        axios.delete(`http://localhost:8000/api/budgets/${id}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate("/display")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return <Container className="my-4">
        <Stack direction="horizontal" gap="4" className="mb-3">
        <h1 className="me-auto">View Budget: {budget.name}</h1>
        <Link to="/display">
            <Button variant="outline-primary">Home</Button>
        </Link>
        </Stack>
        <Card style={{ width: '30rem'}} className="my-4">
            <Card.Body>
                <Card.Title className="mb-3">{budget.name}</Card.Title>
                <Card.Text>Amount: ${budget.amount}</Card.Text>
                <Card.Text>Description: {budget.description}</Card.Text>
            </Card.Body>
        </Card>
        <Button variant='danger' onClick={deleteBudget}>Delete</Button>
    </Container>  
};

export default OneBudget;