const router = require('express').Router();
const sequelize = require('../config/connection');
const jwt = require('jsonwebtoken');
const {
	Product,
	Inventory,
	User,
	OrderDetails,
	OrderItems,
	Category,
} = require('../models');
const auth = require('../utils/auth');
require('dotenv').config();

router.get('/', async (req, res) => {
	try {
		const userData = await User.findAll({});
		const productData = await Product.findAll({});
		// Serialize data so the template can read it
		const users = userData.map((user) => user.get({ plain: true }));
		const products = productData.map((product) => product.get({ plain: true }));
		// Pass serialized data and session flag into template
		res.render('homepage', {
			users,
			products,
			layout: 'main',
		});
	} catch (err) {
		res.status(500).json(err);
	}
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
		console.log(inventory);
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
		const itemData = await OrderItems.findAll({
			include: [
				{
					model: Product,
				},
			],
		});
		// Serialize data so the template can read it
		const orders = orderData.map((order) => order.get({ plain: true }));
		const items = itemData.map((item) => item.get({ plain: true }));
		console.log(items);
		// Pass serialized data and session flag into template
		res.render('orders', {
			orders,
			items,
			layout: 'main',
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/create-item', async (req, res) => {
	try {
		const categoryData = await Category.findAll();
		const categorys = categoryData.map((category) =>
			category.get({ plain: true })
		);

		res.render('createItem', {
			categorys,
			layout: 'main',
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
