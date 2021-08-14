const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const adminRoutes = require('./adminRoutes');

router.use('/', homeRoutes); // user website
router.use('/api', apiRoutes); // api
router.use('/admin', auth, adminRoutes); //admin site

module.exports = router;
