const router = require('express').Router();
const {
  Product,
  Inventory,
  User,
  OrderDetails,
  OrderItems,
  UserShoppingSession,
  CartItem,
} = require('../models');
const sequelize = require('../config/connection');
const auth = require('../utils/auth');

//need to get all of the products from database
router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const productData = await Product.findAll({});

    // Serialize data so the template can read it
    const products = productData.map((product) => product.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render('login', {
      products,
      layout: 'login',
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/home', auth, async (req, res) => {
  try {
    // Get all projects and JOIN with user data

    const productData = await Product.findAll({});

    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    // Serialize data so the template can read it
    const products = productData.map((product) => product.get({ plain: true }));
    const user = userData.get({ plain: true });
    // Pass serialized data and session flag into template
    res.render('home', {
      products,
      ...user,
      layout: 'user',
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  res.render('login', {
    layout: 'login',
  });
});

//need to wire up the product details page
router.get('/product/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id);

    const product = productData.get({ plain: true });

    res.render('product', {
      product,
      layout: 'user',
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/user', auth, async (req, res) => {
  console.log("REQUEST BODY: ", req.body);
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: UserShoppingSession }],
    });
    const user = userData.get({ plain: true });

    const session_id = user.user_shopping_session.id;
    const cartItems = await CartItem.findAll({ where: { session_id } });


    const populateCart = (items) => {
      return new Promise (async (resolve,reject) => {
        const arr = [];
        for (let i = 0; i<items.length; i++){
          let data = await (await Product.findByPk(items[i].product_id)).get({plain:true})
          data.quantity = items[i].quantity
          data.subtotal = String(parseInt(data.quantity)*parseFloat(data.price))
          arr.push(data);
          if (arr.length === items.length){
            resolve(arr);
          }
        }
            reject((err)=>console.log(err))
      })
    }
    const cart = await populateCart(cartItems)
    
    res.render('cart', {
      ...user,
      cart,
      layout: 'user',
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
