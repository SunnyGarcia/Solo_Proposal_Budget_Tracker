const mongoose = require('mongoose');
const ExpenseSchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, "Expense category is required"],
        minLength: [3, "Expense Category must be at least 3 characters long"],
    },
    location: {
        type: String,
        required: [true, "Expense location is required"],
        minLength: [3, "Expense location must be at least 3 characters long"],
    },
    cost: {
        type: Number,
        required: [true, "Budget amount required"],
        min: [1, "Budget amount must be more than 1"]
    },
    note: {
        type: String,
    },
    date: {
        type: Date,
        required: [ true, "Expense Date is required"],
        min: [ '2022-01-01', "Minimum date for transaction is 2021-01-01"],
        max: [ new Date() , "You cannot enter a release data that happens in the future" ]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps:true });

const Expense = mongoose.model("Expense", ExpenseSchema)

module.exports = Expense

// module.exports = mongoose.model("Expense", ExpenseSchema);