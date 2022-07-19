const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

    module.exports = {

        register: (req, res) => {
            const user = new User(req.body);

            user.save()
                .then((newUser) => {
                    console.log(newUser);
                    console.log("Successfully Registered")
                    res.json({
                        successMessage: "Thank you for registering",
                        user: newUser
                    });
                })
                .catch((err) => {
                    console.log("register not successful")
                    res.status(400).json(err);
                })
        },

        login: (req, res) => {
            User.findOne({email: req.body.email})
                .then((userRecord) => {
                    if(userRecord === null) {
                        res.status(400).json({message: "Invalid Login Attempt"})
                    }
                    else {
                        bcrypt.compare(req.body.password, userRecord.password)
                            .then((isPasswordValid) => {
                                if(isPasswordValid) {
                                    console.log("password is valid");
                                    res.cookie(
                                        "usertoken",
                                        jwt.sign(
                                            {
                                                id: userRecord._id,
                                                email: userRecord.email,
                                                username: userRecord.username
                                            },
                                            process.env.JWT_SECRET
                                        ),
                                            {
                                                httpOnly: true,
                                                expires: new Date(Date.now() + 900000000)
                                            }
                                    ).json({
                                        message: "Successfully",
                                        userLoggedIn: userRecord.username,
                                        userId: userRecord._id
                                    });
                                }
                                else{
                                    res.status(400).json({
                                        message: "Login and/or Email Invalid"
                                    });
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                                res.status(400).json({ message: "Invalid Attempt"});
                            })
                    }
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).json({ message: "Invalid Attempt" });
                })
        },


        logout: (req, res) => {
            console.log("logging out");
            res.clearCookie("usertoken");
            res.json({
                message: "You have successfully logged out",
            });
        },

        getLoggedInUser: (req, res) => {

            // const decodedJWT = jwt.decode(req.cookies.usertoken, {
            //     complete: true
            // })

            User.findOne({_id: req.jwtpayload.id})
                .then((user) => {
                    console.log(user);
                    res.json(user)
                })
                .catch((err) => {
                    console.log(err);
                })
        },


        findAllUsers: (req, res) => {
            User.find()
                .then((allUsers) => {
                    res.json(allUsers);
                })
                .catch((err) => {
                    console.log("Find ALl Users failed");
                    res.json({ message: "Something went wrong in findAll", error: err })
                })
        }
    }