const {
  UserShoppingSession,
  CartItem,
  Inventory,
  Product,
} = require('../../models');

const addToCart = async (product_id, user_id) => {
  const session = await UserShoppingSession.findOne({ where: { user_id } });
  const session_id = session.id;

  const product = await Product.findByPk(product_id);

  const inventory_id = product.inventory_id;
  console.log('inventory id ' + inventory_id);
  const inventory = await Inventory.findByPk(inventory_id);
  const stock = inventory.quantity;
  console.log(stock);
  if (stock > 0) {
    try {
      await CartItem.create({
        session_id,
        product_id,
        quantity: 1,
      });
      await inventory.update({
        quantity: stock - 1,
      });
    } catch (err) {
      throw err;
    }
  } else {
    console.log('woops');
  }
};

module.exports = { addToCart };
