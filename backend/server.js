const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');


const mongoose = require('mongoose');

const passport = require("passport");

const app = express();

const PORT = 4000;
const DB_NAME = "JobsPlanet"

app.use(passport.initialize());
require("./config/passport")(passport);

// routes
var testAPIRouter = require("./routes/testAPI");
var UserRouter = require("./routes/users.routes");
var JobRouter = require("./routes/job.routes");
var ApplicationRouter = require("./routes/application.routes");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
// To localhost
mongoose.connect('mongodb://127.0.0.1:27017/' + DB_NAME, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

// setup API endpoints
app.use("/testAPI", testAPIRouter);
app.use("/user", UserRouter);
app.use("/job", JobRouter);
app.use("/application", ApplicationRouter);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
