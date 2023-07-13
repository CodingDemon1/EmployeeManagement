const { UserModel } = require("../Model/User.Model");
const bcrypt = require("bcrypt");
const UserRouter = require("express").Router();
const jwt = require("jsonwebtoken");
//Signup
UserRouter.post("/signup", async (req, res) => {
	try {
		const { email, password } = req.body;

		//Check if user Exist or not
		const isUserExist = await UserModel.findOne({ email });

		if (isUserExist) {
			return res
				.status(400)
				.json({ msg: "User Already Exists. Please Login!!" });
		}

		const hashedPassword = bcrypt.hashSync(password, 6);
		const newUser = new UserModel({ email, password: hashedPassword });
		await newUser.save();

		res.status(200).json({ msg: "Signup Successful", flag: true });
	} catch (error) {
		res.status(400).json({ msg: error.message });
	}
});

//User login
UserRouter.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await UserModel.findOne({ email });

		if (!user) {
			return res
				.status(400)
				.json({ msg: "User Does not Exist, Kindly Register First!!" });
		}

		const isPasswordMatching = await bcrypt.compare(password, user.password);

		if (!isPasswordMatching) {
			res.status(401).json({ msg: "Invalid Credentials" });
		}

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});

		res.status(200).json({
			msg: "Login Successful",
			token,
		});
	} catch (error) {
		res.status(400).json({ msg: error.message });
	}
});

module.exports = { UserRouter };
