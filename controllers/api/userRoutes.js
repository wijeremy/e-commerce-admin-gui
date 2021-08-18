const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const auth = require('../../utils/auth');
require('dotenv').config();

// Register
router.post('/', async (req, res) => {
	// Our register logic starts here
	try {
		// Get user input
		const { first_name, last_name, email, password } = req.body;

		// Validate user input
		if (!(email && password && first_name && last_name)) {
			res.status(400).send('All input is required');
		}

		// check if user already exist
		// Validate if user exist in our database
		const oldUser = await User.findOne({ where: { email } });

		if (oldUser) {
			return res
				.status(409)
				.send('Could not create an account with that information');
		}

		//Encrypt user password
		encryptedPassword = await bcrypt.hash(password, 10);

		// Create user in our database
		const user = await User.create({
			first_name,
			last_name,
			email: email.toLowerCase(), // sanitize: convert email to lowercase
			password: encryptedPassword,
		});

		// Create token
		const token = jwt.sign(
			{ user_id: user._id, email },
			process.env.TOKEN_KEY,
			{
				expiresIn: '2h',
			}
		);
		// save user token
		user.token = token;

		// return new user
		res.status(201).json(user);
	} catch (err) {
		res.json(err.message);
	}
	// Our register logic ends here
});

// Login
router.post('/login', async (req, res) => {
	// Our login logic starts here
	try {
		// Get user input
		const { email, password } = req.body;

		// Validate user input
		if (!(email && password)) {
			res.status(400).send('All input is required');
		}
		// Validate if user exist in our database
		const user = await User.findOne({ where: { email } });
		//const userdata = user.map((username) => username.get({ plain: true }));

		if (user && (await bcrypt.compare(password, user.password))) {
			// Create token
			const token = jwt.sign(
				{
					id: user.id,
					email,
				},
				process.env.TOKEN_KEY,
				{ expiresIn: '2h' }
			);

			// save user token
			user.token = token;
			res.json(user.token);
			// user
			//res.status(200).json(user);
		} else {
			res.status(400).send('Invalid Credentials');
		}
	} catch (err) {
		console.log(err);
	}
	// Our register logic ends here
});

module.exports = router;
