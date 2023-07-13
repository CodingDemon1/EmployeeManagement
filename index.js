//Dependencies
const express = require("express");
const { connection } = require("./config/db");
const { UserRouter } = require("./Routes/User.Routes");
const { EmployeeRouter } = require("./Routes/Employee.Routes");
const cors = require("cors");

require("dotenv").config();
//Variables
const port = process.env.PORT || 8000;

//Extra middlewares
const app = express();

app.use(express.json());
app.use(cors());
//Routes
app.use("/users", UserRouter);
app.use("/employees", EmployeeRouter);

//Setting the port and DB connection
app.listen(port, async () => {
	try {
		await connection();
		console.log("Connected to DB");
	} catch (error) {
		console.log(error);
	}
	console.log(`Listening @ ${port}`);
});
