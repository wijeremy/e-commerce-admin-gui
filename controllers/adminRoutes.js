const router = require('express').Router();
const sequelize = require('../config/connection');
const jwt = require('jsonwebtoken');
const { Product, Inventory, User } = require('../models');
const auth = require('../utils/auth');
require('dotenv').config();

router.get('/', async (req, res) => {
  const userData = await User.findAll().catch((err) => {
    res.json(err);
  });
  const users = userData.map((user) => user.get({ plain: true }));
  res.render('homepage', { layout: 'main' });
});

router.get('/inventory', async (req, res) => {
  try {
    const invData = await Product.findAll({
      include: [
        {
          model: Inventory,
        },
      ],
    });

    // Serialize data so the template can read it
    const inventory = invData.map((inv) => inv.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render('inventory', {
      inventory,
      layout: 'main',
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
