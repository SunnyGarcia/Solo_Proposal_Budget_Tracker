const ExpenseController = require('../controllers/expense.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.post('/api/expenses', authenticate, ExpenseController.createNewExpense); 
    app.get('/api/expenses', ExpenseController.getAll); //display all expenses
    app.delete('/api/expenses/:id', ExpenseController.deleteExpense);
    app.get('/api/expenses/:id', ExpenseController.getOneExpense); //get one expense
    app.put('/api/expenses/:id', ExpenseController.updateExpense); //update expense
    app.delete('/api/expenses/:id', ExpenseController.deleteExpense); // delete expense
};