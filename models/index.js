const CartItem = require('./cart_items');
const Category = require('./category');
const Inventory = require('./inventory');
const OrderDetails = require('./order_details');
const OrderItems = require('./order_items');
const Payment = require('./payment');
const Product = require('./product');
const UserCartItem = require('./user_cart_item');
const UserShoppingSession = require('./user_shopping_session');
const User = require('./User');

Category.hasMany(Product, {
	foreignKey: 'category_id',
	onDelete: 'CASCADE',
});

Product.belongsTo(Category, {
	foreignKey: 'category_id',
});

Inventory.hasOne(Product, {
	foreignKey: 'inventory_id',
	onDelete: 'CASCADE',
});

Product.belongsTo(Inventory, {
	foreignKey: 'inventory_id',
});

Product.hasMany(OrderItems, {
	foreignKey: 'product_id',
	onDelete: 'CASCADE',
});

OrderItems.belongsTo(Product, {
	foreignKey: 'product_id',
});

Product.hasMany(CartItem, {
	foreignKey: 'product_id',
	onDelete: 'CASCADE',
});

CartItem.belongsTo(Product, {
	foreignKey: 'product_id',
});

Payment.hasOne(OrderDetails, {
	foreignKey: 'payment_id',
	onDelete: 'CASCADE',
});

OrderDetails.belongsTo(Payment, {
	foreignKey: 'payment_id',
});

User.hasOne(UserShoppingSession, {
	foreignKey: 'user_id',
	onDelete: 'CASCADE',
});

UserShoppingSession.belongsTo(User, {
	foreignKey: 'user_id',
});

User.hasMany(Payment, {
	foreignKey: 'user_id',
	onDelete: 'CASCADE',
});

Payment.belongsTo(User, {
	foreignKey: 'user_id',
});

UserShoppingSession.hasMany(CartItem, {
	foreignKey: 'session_id',
	onDelete: 'CASCADE',
});

CartItem.belongsTo(UserShoppingSession, {
	foreignKey: 'session_id',
});

OrderDetails.hasMany(OrderItems, {
	foreignKey: 'order_id',
	onDelete: 'CASCADE',
});

OrderItems.belongsTo(OrderDetails, {
	foreignKey: 'order_id',
});

OrderItems.belongsTo(OrderDetails, {
  foreignKey: 'order_id',
});

OrderDetails.hasMany(OrderItems, {
  foreignKey: 'order_id',
  onDelete: 'CASCADE',
});

module.exports = {
	Category,
	Inventory,
	OrderDetails,
	Payment,
	Product,
	UserCartItem,
	UserShoppingSession,
	User,
};
