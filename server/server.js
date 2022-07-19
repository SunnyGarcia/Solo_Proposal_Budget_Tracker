require('dotenv').config();

const dbName = 'budgetsdb';

const cookieParser = require("cookie-parser");
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


require('./config/mongoose.config');
require('./routes/budget.routes')(app);
require('./routes/expense.routes')(app);  
require('./routes/user.routes')(app);

const jwt = require("jsonwebtoken");
var token = jwt.sign({ id: "bar" }, process.env.JWT_SECRET);
console.log("token: ", token);
const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
console.log(decodedToken);

app.listen(process.env.PORT, () => {
    console.log("Listening at Port", process.env.PORT)
});