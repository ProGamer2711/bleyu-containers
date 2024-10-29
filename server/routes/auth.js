const router = require("express").Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { createUser, getUsers } = require("../helpers/users");
const verifyToken = require("../middleware/auth");

const {
	formatValidationError,
	formatDuplicateError,
} = require("../helpers/validationErrorFormatter");

const User = require("../models/User");
const BannedToken = require("../models/BannedToken");

router.post("/register", async (req, res) => {
	try {
		const { username, email, password } = req.body;

		if (!(username && email && password)) {
			return res.status(400).json({ err: "Please fullfil all fields." });
		}

		let encryptedPassword = await bcrypt.hash(password, 10);

		let user = await createUser({
			username,
			email: email.toLowerCase(),
			password: encryptedPassword,
		});

		// check for validation errors
		if (user.err) {
			let { err } = user;
			let duplicateErrCodes = [11000, 11001];

			if (duplicateErrCodes.includes(err.code)) {
				return res.status(409).json(formatDuplicateError(err));
			}

			return res.status(400).json(formatValidationError(err));
		}

		user._token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY);

		await user.save();

		delete user.password;

		res.status(201).json(user.toJSON());
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
});

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!(email && password)) {
			return res.status(400).json({ err: "All input is required." });
		}

		let user = (await getUsers({ email })).users[0];

		if (user && (await bcrypt.compare(password, user.password))) {
			const token = jwt.sign(
				{ user_id: user._id, email },
				process.env.TOKEN_KEY
			);

			user = await User.findByIdAndUpdate(
				user._id,
				{ _token: token },
				{ new: true }
			)
				.populate("_posts", ["title", "rating", "_ratedBy"])
				.populate("_comments", ["content", "rating", "_ratedBy"])
				.lean();

			delete user.password;

			res.status(200).json(user);
		} else {
			res.status(400).json({ err: "Invalid Credentials." });
		}
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
});

router.get("/logout", verifyToken, async (req, res) => {
	try {
		const token = req.headers["x-access-token"];

		if (!token) {
			return res.status(400).json({ err: "No session found." });
		}

		await User.findOneAndUpdate({ _token: token }, { _token: null }).catch(
			err => {
				return res.status(500).json({ err: err.message });
			}
		);

		await BannedToken.create({ token });

		res.status(200).json({ message: "Logged out successfully." });
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
});

module.exports = {
	path: "/auth",
	router,
};
