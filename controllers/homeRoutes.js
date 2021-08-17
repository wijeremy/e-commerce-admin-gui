const router = require('express').Router();
const User = require('../models/user');
const sequelize = require('../config/connection');

//need to get all of the products from database
router.get('/', async (req, res) => {
     res.render('home', { layout: 'user' });
});

//need to wire up the product details page
router.get('/product/:id', async (req, res) => {
     const guitar = [
          {
               name: 'A Classic, Reborn',
               description:
                    "The new Les Paul Standard returns to the classic design that made it relevant, played and loved -- shaping sound across generations and genres of music. It pays tribute to Gibson's Golden Era of innovation and brings authenticity back to life. The Les Paul Standard 50's has a solid mahogany body with a maple top, a rounded 50's-style mahogany neck with a rosewood fingerboard and trapezoid inlays. It's equipped with an ABR-1, the classic-style Tune-O-Matic bridge, aluminum stop bar tailpiece, vintage deluxe tuners with keystone buttons, and aged gold tophat knobs. The calibrated Burstbucker 1 (neck) and Burstbucker 2 (bridge) pickups are loaded with AlNiCo II magnets, audio taper potentiometers and orange drop capacitors.",
               price: '$3,500',
               imgage: 'https://cdn.pixabay.com/photo/2017/03/12/16/55/electric-guitar-2137492_1280.jpg',
          },
     ];

     //const chosenGuitar = guitar.get({ plain: true });
     //res.json(guitar);
     res.render('product', { layout: 'user' });
});

router.get('/login', (req, res) => {
     // If a session exists, redirect the request to the homepage
     if (req.session.logged_in) {
          res.redirect('/');
          return;
     }

     res.render('login');
});
module.exports = router;
