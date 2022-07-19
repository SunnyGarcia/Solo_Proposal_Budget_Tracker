const BudgetController = require ('../controllers/budget.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.get("/api/budgets", BudgetController.findAllBudgets);
    app.post("/api/budgets", authenticate, BudgetController.createNewBudget);
    app.get("/api/budgetsbyuser/:username", authenticate, BudgetController.findAllBudgetsByUser);
    app.get("/api/budgets/:id", BudgetController.findOneBudget);
    app.delete("/api/budgets/:id", BudgetController.deleteBudget);
    app.put("/api/budgets/:id", BudgetController.updateBudget);
}