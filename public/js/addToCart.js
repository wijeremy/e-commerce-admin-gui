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
    const cartItem = await CartItem.findOne({where: {product_id}})
    if (stock > 0 && cartItem) {
      try {
        await CartItem.update(
            {quantity: cartItem.quantity + 1}, 
            {where: {id: cartItem.id}}
        );
        await Inventory.update(
            {quantity: stock - 1},
            {where: {id: inventory.id}}
        );
      } catch (err) {
        throw err;
      }
    } else if(stock>0) {
        await CartItem.create({
            session_id,
            product_id,
            quantity: 1,
          }); 
        await Inventory.update(
            {quantity: stock - 1},
            {where: {id: inventory.id}}
        );
    } else {
        console.log('woops')
    }
  };
  
  module.exports = { addToCart };

