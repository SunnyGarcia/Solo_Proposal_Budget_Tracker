import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Stack, Table } from "react-bootstrap";
import Container from 'react-bootstrap//Container'


const Profile = (props) => {
    const {username} = useParams();
    
    const [userBudgetList, setUserBudgetList] = useState([]);
    

    const [allExpenses, setAllExpenses] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/budgetsbyuser/${username}`,
            {withCredentials: true}
        )
            .then((res) => {
                console.log(res.data);
                setUserBudgetList(res.data);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/expenses')
            .then((res) => {
                console.log(res.data);
                setAllExpenses(res.data);
            })
            .catch((err) => {
                console.log(err.res);
            })
    }, []);

    const deleteBudget = (idFromBelow) => {
        axios.delete(`http://localhost:8000/api/budgets/${idFromBelow}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
            })
            .catch((err) => console.log(err))
    }

    const deleteExpense = (idFromBelow) => {
        axios.delete(`http://localhost:8000/api/expenses/${idFromBelow}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
            })
            .catch((err) => console.log(err))
    }

    const logout = (e) => {
        axios
            .post(
                "http://localhost:8000/api/users/logout", 
                {}, 
                {
                    withCredentials: true
                },
            )
            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };
    

    return <Container className="my-4">
        <Stack direction="horizontal" gap="4" className="mb-2">
            <h1 className="me-auto">Welcome {username}, here are your expenses!</h1>
            <Link to="/new/budgets">
                <Button variant="info">Add Budget</Button>
            </Link>
            <Link to="/new/expenses">
                <Button variant="success">Add Expense</Button>
            </Link>
            <Button variant="outline-danger" onClick={logout}>Logout</Button>
        </Stack>
        <Stack direction="vertical" gap="4">
            <Table striped bordered hover className="my-5 m-auto">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userBudgetList.map((budget, index) => (
                            <tr key={index}>
                                <td><h6>{budget.name}</h6></td>
                                <td><h6>${budget.amount}</h6></td>
                                
                                <td>
                                    <Link to={`/edit/budgets/${budget._id}`}>
                                        <Button variant="outline-success">Update</Button>
                                    </Link>
                                    |
                                    |
                                    <Button variant="outline-danger" onClick={() => deleteBudget(budget._id)}>Delete</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </Stack>
            <Stack>
                <Table striped bordered hover className="my-5 m-auto">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Location</th>
                            <th>Cost</th>
                            <th>Note</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allExpenses.map((expense, index) => (
                                <tr key={expense._id}>
                                    <td>{ expense.category }</td>
                                    <td>{ expense.location }</td>
                                    <td>${ expense.cost }</td>
                                    <td>{ expense.note }</td>
                                    <td>Date: { (new Date(expense.date)).toLocaleDateString("en-us")}</td>
                                    <td>
                                        <Link to={`/edit/expenses/${expense._id}`}>
                                            <Button variant="outline-success">Update</Button>
                                        </Link>
                                        |
                                        |
                                        <Button variant="outline-danger" onClick={() => deleteExpense(expense._id)}>Delete</Button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Stack>
    </Container>
};

export default Profile;