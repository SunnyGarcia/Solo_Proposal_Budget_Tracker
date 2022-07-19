const Expense = require('../models/expense.model');
const Budget = require('../models/budget.model');
const jwt = require('jsonwebtoken');

    module.exports = {
            
        getAll: (req, res) => {
            Expense.find({})
                .sort({ cost: "descending" })
                .populate("createdBy", "username email")
                .then((allExpenses) => {
                    res.json(allExpenses);
                })
                .catch((err) => {
                    console.log("Find all expenses failed");
                    res.json({message: "Something went wrong with getAll", error: err})
                })
        },

        createNewExpense: (req, res) => {
            
            const newExpenseObject = new Expense(req.body);

            const decodedJWT = jwt.decode(req.cookies.usertoken, {
                complete: true
            })

            newExpenseObject.createdBy = decodedJWT.payload.id

            newExpenseObject.save()
                .then((newExpense) => {
                    console.log(newExpense);
                    res.json(newExpense);
                })
                .catch((err) => {
                    console.log("Something went wrong in the CreateExpense")
                    res.status(400).json(err);
                })
        },

        getOneExpense: (req, res) => {
            Expense.findOne({_id: req.params.id})
                .then((oneExpense) => {
                    console.log(oneExpense);
                    res.json(oneExpense)
                })
                .catch((err) => {
                    console.log("Find one Expense failed")
                    res.json({message: "Something went wrong in findOneExpense", error: err})
                })
        },

        updateExpense: (req, res) => {
            Expense.findOneAndUpdate({_id: req.params.id},
                req.body,
                {new:true, runValidators: true}
                )
                .then((updatedExpense) => {
                    console.log(updatedExpense);
                    res.json(updatedExpense)
                })
                .catch((err) => {
                    console.log("Something went wrong in updateExpense");
                    res.status(400).json(err);
                })
        },

        deleteExpense: (req, res) => {
            Expense.deleteOne({_id: req.params.id})
                .then((deleteExpense) => {
                    console.log(deleteExpense);
                    res.json(deleteExpense)
                })
                .catch((err) => {
                    console.log("Delete One Budget failed");
                    res.json({message: "Something went wrong in deleteOne", error: err})
                })
        },
    }