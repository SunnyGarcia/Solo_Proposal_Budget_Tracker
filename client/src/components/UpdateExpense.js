import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Stack, Form, Container } from "react-bootstrap"

const UpdateExpense = (props) => {
    const { id } = useParams();
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");
    const [cost, setCost] = useState("");
    const [note, setNote] = useState("");
    const [date, setDate] = useState("");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    console.log(id);
    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/expenses/${id}`)
            .then((res) => {
                console.log(res.data);
                setCategory(res.data.category);
                setLocation(res.data.location);
                setCost(res.data.cost);
                setNote(res.data.note);
                setDate(res.data.date);
            })
            .catch((err) => {
                console.log(err.res);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:8000/api/expenses/${id}`, {
                category,
                location,
                cost,
                note,
                date
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
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formExpenseCategory">
                <Form.Label>Expense Category</Form.Label>
                <Form.Control type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                {errors.category ? <p>{errors.category.message}</p> : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                {errors.location ? <p>{errors.location.message}</p> : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCost">
                <Form.Label>Cost</Form.Label>
                <Form.Control type="text" value={cost} onChange={(e) => setCost(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formExpenseNote">
                <Form.Label>Notes</Form.Label>
                <Form.Control as="textarea" rows={3} value={note} onChange={(e) => setNote(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDate">
                <Form.Label>Date</Form.Label>
                <Form.Control type="Date" value={date} onChange={(e) => setDate(e.target.value)} />
            </Form.Group>
            <Button variant="info" type="submit">
                Add Expense
            </Button>
        </Form>
    </Container>
}

export default UpdateExpense;