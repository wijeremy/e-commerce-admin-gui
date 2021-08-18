const router = require('express').Router();
const orderRoutes = require('./userRoutes');
const inventoryRoutes = require('./inventoryRoutes');

router.use('/orders', orderRoutes);
router.use('/inventory', inventoryRoutes);

module.exports = router;
