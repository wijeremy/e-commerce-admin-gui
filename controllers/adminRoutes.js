const router = require('express').Router();
const sequelize = require('../config/connection');
const jwt = require('jsonwebtoken');
const {
	Product,
	Inventory,
	User,
	OrderDetails,
	OrderItems,
} = require('../models');
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

router.get('/orders', async (req, res) => {
	try {
		const orderData = await OrderDetails.findAll({
			include: [
				{
					model: OrderItems,
				},
			],
		});

		// Serialize data so the template can read it
		const orders = orderData.map((order) => order.get({ plain: true }));
		// Pass serialized data and session flag into template
		res.render('orders', {
			...orders,
			layout: 'main',
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/create-item', async (req, res) => {
	try {
		const orderData = await OrderDetails.findAll({
			include: [
				{
					model: OrderItems,
				},
			],
		});

		// Serialize data so the template can read it
		const orders = orderData.map((order) => order.get({ plain: true }));
		// Pass serialized data and session flag into template
		res.render('orders', {
			...orders,
			layout: 'main',
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
