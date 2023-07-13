const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema({
	FirstName: {
		type: String,
		required: true,
	},
	LastName: {
		type: String,
		required: true,
	},
	Email: {
		type: String,
		required: true,
	},
	Department: {
		type: String,
		required: true,
		enum: ["Tech", "Marketing", "Operations"],
	},
	Salary: {
		type: Number,
		required: true,
	},
});
const EmployeeModel = mongoose.model("Employee", EmployeeSchema);

module.exports = { EmployeeModel };

// - Last Name
// - Email
// - Department (Select Tag with Tech, Marketing, and Operations as options)
// - Salary
