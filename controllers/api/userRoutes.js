const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { User, UserShoppingSession } = require('../../models');
const bcrypt = require('bcrypt');
const auth = require('../../utils/auth');
require('dotenv').config();
const { addToCart } = require('../../public/js/addToCart');

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
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

    // return new user
    res.status(201).json(user);
  } catch (err) {
    res.json(err.message);
  }
  // Our register logic ends here
});

// Login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post('/cart', async (req, res) => {
  const product_id = parseInt(req.body.productId);
  const { user_id } = req.session;

  console.log(product_id, user_id);

  const session = await UserShoppingSession.findAll({ where: { user_id } });
  if (session.length === 0) {
    const response = await UserShoppingSession.create({ user_id });
    console.log(response);
  } else {
    addToCart(product_id, user_id);
  }
});

module.exports = router;
