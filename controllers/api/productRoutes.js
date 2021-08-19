const router = require('express').Router();
const { Product } = require('../../models');
const auth = require('../../utils/auth');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_KEY,
	api_secret: process.env.CLOUD_SECRET,
});

router.get('/', auth, async (req, res) => {
	try {
		const allGuitars = await Product.findAll();
		res.status(200).json(allGuitars);
	} catch (err) {
		res.status(400).json(err);
	}
});
router.get('/:id', auth, async (req, res) => {
	try {
		const oneGuitar = await Product.findOne({
			Where: {
				id: req.params.id,
			},
		});
		if (!oneGuitar) {
			res.status(404).json({
				message:
					"We are sorry for the inconvenience, we can't find what you are looking for!",
			});
			return;
		}
		res.status(200).json(oneGuitar);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.post('/', auth, async (req, res) => {
	try {
		const newProduct = await Product.create({
			...req.body,
		});
		res.status(200).json(newProduct);
	} catch (err) {
		res.status(400).json(err);
	}
});

module.exports = router;
