const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "First name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        },
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    }
}, {timestamps: true});

// Virtual never stored but can be returned to user and utilized as part of document
    UserSchema.virtual("confirmPassword")
        .get(() => this._confirmPassword)
        .set((value) => this._confirmPassword = value);

UserSchema.pre("validate", function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Passwords must match");
        console.log("Passwords mus match")
    }
    next();
})

UserSchema.pre("save", function(next) {
    bcrypt.hash(this.password, 10)
        .then((hashedPassword) => {
            console.log("password: " + this.password);
            console.log("hashed: " + hashedPassword);
            this.password = hashedPassword;
            next();
        })
        .catch(err => {
            console.log('error saving hash');
            console.log(err);
    });
})

const User = mongoose.model("User", UserSchema);

module.exports = User;