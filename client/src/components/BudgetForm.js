import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Stack, Form, Container } from "react-bootstrap"

const BudgetForm = () => {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [errs, setErrs] = useState({});


    const [userBudgetList, setUserBudgetList] = useState([]);
    const [user, setUser] = useState({});

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8000/api/budgets', {
                name,
                amount,
            },
            {
                withCredentials: true
            })
            .then((res) => {
                console.log(res);
                navigate("/new/budgets");
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
        <Button variant="outline-danger" onClick={logout}>Logout</Button>
        </Stack>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBudgetName">
                <Form.Label>Budget Name</Form.Label>
                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                {errs.name ? <p>{errs.name.message}</p> : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBudgetAmount">
                <Form.Label>Budget Amount: $</Form.Label>
                <Form.Control type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
                {errs.amount ? <p>{errs.amount.message}</p> : null}
            </Form.Group>
            <Button variant="info" type="submit">
                Add Budget
            </Button>
        </Form>
    </Container>
};

export default BudgetForm;