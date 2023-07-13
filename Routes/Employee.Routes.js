const { EmployeeModel } = require("../Model/Employee.Model");

const EmployeeRouter = require("express").Router();

//Add an Employee
EmployeeRouter.post("/", async (req, res) => {
	try {
		const { Email, FirstName, LastName, Department, Salary } = req.body;

		const newEmployee = new EmployeeModel({
			FirstName,
			LastName,
			Email,
			Department,
			Salary,
		});

		await newEmployee.save();
		res.status(200).json({ msg: "Employee Added Successfully!!!" });
	} catch (error) {
		res.status(400).json({ msg: error.message });
	}
});

//Get all Employee
EmployeeRouter.get("/", async (req, res) => {
	try {
		const { pageNo, Salary, Department, FirstName } = req.query;

		let query = [];
		// if (FirstName) {
		// 	let searching = {
		// 		$regexMatch: { input: "$FirstName", regex: FirstName },
		// 	};
		// 	query.push(searching);
		// }
		if (Department) {
			let filtering = { $match: { Department } };
			query.push(filtering);
		}

		if (Salary) {
			let sorting = { $sort: { Salary: Salary == 1 ? 1 : -1 } };
			query.push(sorting);
		}
		if (pageNo) {
			let limit = { $limit: 10 };
			let skip = { $skip: (pageNo - 1) * 10 };
			query.push(limit, skip);
		}

		// query = `[${query.join(",")}]`;
		console.log(query);

		const allEmployee = await EmployeeModel.aggregate(query);
		console.log(allEmployee);
		res.status(200).json(allEmployee);
	} catch (error) {
		res.status(400).json({ msg: error.message });
	}
});

//Edit

EmployeeRouter.patch("/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const { Email, FirstName, LastName, Department, Salary } = req.body;

		const updateEmp = await EmployeeModel.findByIdAndUpdate(id, {
			FirstName,
			LastName,
			Email,
			Department,
			Salary,
		});
		if (updateEmp) {
			return res.status(200).json({ msg: "Employee Edited Successfully!!!" });
		}
		return res.status(400).json({ msg: "Something Went Wrong" });
	} catch (error) {
		res.status(400).json({ msg: error.message });
	}
});

//Delete
EmployeeRouter.delete("/:id", async (req, res) => {
	try {
		const id = req.params.id;

		const isDeleted = await EmployeeModel.findByIdAndDelete(id);
		if (!isDeleted)
			return res.status(400).json({ msg: "Something Went Wrong" });
		return res.status(200).json({ msg: "Employee Deleted SuccessFully" });
	} catch (error) {
		res.status(400).json({ msg: error.message });
	}
});

module.exports = { EmployeeRouter };
