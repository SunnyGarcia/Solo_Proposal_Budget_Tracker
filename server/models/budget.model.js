const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, "Budget name is required"],
        minLength: [3, "Budget name must be at least 3 characters long"]
    },
    amount: {
        type: Number,
        required: [true, "Budget amount required"],
        min: [1, "Budget amount must be more than 1"]
    },
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

    expenses: [
        // each element in the array will refer to a comment model / object / document
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Expense",
        }
    ]


    // expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expense" }],

}, { timestamps:true });

const Budget = mongoose.model("Budget", BudgetSchema)

module.exports = Budget;

// module.exports = mongoose.model("Budget", BudgetSchema);
