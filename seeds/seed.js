const sequelize = require('../config/connection');
const { User, Product, Inventory, Category } = require('../models');

const userData = require('./userData.json');
const productData = require('./productData.json');
const inventoryData = require('./inventory.json');
const categoryDate = require('./category.json');

const seedDatabase = async () => {
	await sequelize.sync({ force: true });

	await User.bulkCreate(userData, {
		individualHooks: true,
		returning: true,
	});

	await Product.bulkCreate(productData, {
		individualHooks: true,
		returning: true,
	});

	await Inventory.bulkCreate(inventoryData, {
		individualHooks: true,
		returning: true,
	});

	await Category.bulkCreate(categoryDate, {
		individualHooks: true,
		returning: true,
	});

	process.exit(0);
};

seedDatabase();
