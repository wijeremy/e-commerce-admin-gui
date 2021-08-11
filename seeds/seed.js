const sequelize = require('../config/connection');
const { User, Product } = require('../models');

const userData = require('./userData.json');
const projectData = require('./projectData.json');

const seedDatabase = async () => {
	await sequelize.sync({ force: true });

	process.exit(0);
};

seedDatabase();
