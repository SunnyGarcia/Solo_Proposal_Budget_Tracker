const Budget = require('../models/budget.model');
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

    module.exports = {
        
        findAllBudgets: (req, res) => {
            Budget.find()
                .populate("createdBy", "username email")
                .populate("expenses", "category location amount date")
                .then((allBudgets) => {
                    res.json(allBudgets);
                })
                .catch((err) => {
                    console.log("Find all budgets failed");
                    res.json({message: "Something went wrong with findAll", error: err})
                })
        },

        createNewBudget: (req, res) => {
            
            const newBudgetObject = new Budget(req.body);

            const decodedJWT = jwt.decode(req.cookies.usertoken, {
                complete: true
            })

            // newBudgetObject.createdBy = req.jwtpayload.id;

            newBudgetObject.createdBy = decodedJWT.payload.id

            newBudgetObject.save()
                .populate("createdBy", "username email")
                .populate("expenses", "category location cost date")
                .then((newBudget) => {
                    console.log(newBudget);
                    res.json(newBudget);
                })
                .catch((err) => {
                    console.log("Something went wrong in the CreateBudget")
                    res.status(400).json(err);
                })
        },

        findOneBudget: (req, res) => {
            Budget.findOne({_id: req.params.id})
                .then((oneBudget) => {
                    console.log(oneBudget);
                    res.json(oneBudget)
                })
                .catch((err) => {
                    console.log("Find One Budget failed");
                    res.json({message: "Something went wrong in findOneBudget", error: err})
                })
        },

        deleteBudget: (req, res) => {
            Budget.deleteOne({_id: req.params.id})
                .then((deleteBudget) => {
                    console.log(deleteBudget);
                    res.json(deleteBudget)
                })
                .catch((err) => {
                    console.log("Delete One Budget failed");
                    res.json({message: "Something went wrong in deleteOne", error: err})
                })
        },

        updateBudget: (req, res) => {
            Budget.findOneAndUpdate({_id: req.params.id},
                req.body,
                {new: true, runValidators: true}
                )
                .then((updatedBudget) => {
                    console.log(updatedBudget);
                    res.json(updatedBudget)
                })
                .catch((err) => {
                    console.log("Something went wrong in updateBudget");
                    res.status(400).json(err);
                })
        },

        findAllBudgetsByUser: (req, res) => {

            console.log("req.jwtplayload.username :", req.jwtpayload.username )
            console.log("req.params.username", req.params.username)

            if(req.jwtpayload.username !== req.params.username){
                console.log("not user");
                User.findOne({username: req.params.username})
                    .then((userNotLoggedIn) => {
                        Budget.find({createdBy: userNotLoggedIn._id})
                            .populate("createdBy", "username")
                            .then((allBudgetsFromUser)=>{
                                console.log(allBudgetsFromUser);
                                res.json(allBudgetsFromUser);
                            })
                            .catch((err) => {
                                console.log(err);
                                res.status(400).json(err);
                            })
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(400).json(err);
                    })
            }
            else{
                console.log("current user")
                console.log("req.jwtpayload.id:", req.jwtpayload.id);
                Budget.find({ createdBy: req.jwtpayload.id})
                    .populate("createdBy", "username")
                    .then((allBudgetsFromLoggedInUser)=>{
                        console.log(allBudgetsFromLoggedInUser);
                        res.json(allBudgetsFromLoggedInUser);
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(400).json(err);
                    })
            }
        }
    }
