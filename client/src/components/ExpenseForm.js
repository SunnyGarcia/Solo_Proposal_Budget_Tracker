import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Stack, Form, Container } from "react-bootstrap"

const ExpenseForm = () => {
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");
    const [cost, setCost] = useState("");
    const [note, setNote] = useState("");
    const [date, setDate] = useState("");
    const [errs, setErrs] = useState({});

    const [userBudgetList, setUserBudgetList] = useState([]);
    const [user, setUser] = useState({});

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8000/api/expenses', {
                category,
                location,
                cost,
                note,
                date
            },
            {
                withCredentials: true
            })
            .then((res) => {
                console.log(res);
                navigate("/new/expenses");
            })
            .catch((err) => {
                console.log(err.response.data.errors);
                if(err.response.status === 401) {
                    navigate("/")
                } else {
                setErrs(err.response.data.errors);
                }
            });
    };


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
        <Stack direction="horizontal" gap="4" className="mb-3">
        <h1 className="me-auto">Add Expense</h1>
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
        <Button variant="outline-danger" onClick={logout}>Logout</Button>
        </Stack>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formExpenseCategory">
                <Form.Label>Expense Category</Form.Label>
                <Form.Control type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                {errs.category ? <p>{errs.category.message}</p> : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                {errs.location ? <p>{errs.location.message}</p> : null}
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
};

export default ExpenseForm;