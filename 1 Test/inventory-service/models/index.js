const ProductModel = require('./Product');
const ShopModel = require('./Shop');
const InventoryModel = require('./Inventory');

module.exports = (sequelize, DataTypes) => {
  const Product = ProductModel(sequelize, DataTypes);
  const Shop = ShopModel(sequelize, DataTypes);
  const Inventory = InventoryModel(sequelize, DataTypes);

  Inventory.belongsTo(Product, { foreignKey: 'product_id' });
  Inventory.belongsTo(Shop, { foreignKey: 'shop_id' });

  return {
    Product,
    Shop,
    Inventory,
  };
};
