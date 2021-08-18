const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { Product, Inventory } = require('../../models');
const auth = require('../../utils/auth');
require('dotenv').config();

router.get('/', auth, async (req, res) => {
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
