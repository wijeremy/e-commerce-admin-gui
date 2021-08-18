const router = require('express').Router();
const { User, Product } = require('../models');
const sequelize = require('../config/connection');
const verifyToken = require('../utils/auth');

//need to get all of the products from database
router.get('/', async (req, res) => {
     try {
          // Get all projects and JOIN with user data
          const productData = await Product.findAll({});

          // Serialize data so the template can read it
          const products = productData.map((product) =>
               product.get({ plain: true })
          );
    // Pass serialized data and session flag into template
    res.render('home', {
      products,
      layout: 'user',
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
     // If the user is already logged in, redirect the request to another route
     if (verifyToken) {
          res.redirect('/');
          return;
     }
     res.render('login');
});

//need to wire up the product details page
router.get('/product/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id);

    const product = productData.get({ plain: true });

    res.render('product', {
      ...product,
      layout: 'user',
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
