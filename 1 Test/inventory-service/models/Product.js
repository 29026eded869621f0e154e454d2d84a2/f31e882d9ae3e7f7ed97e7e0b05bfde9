module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
      plu: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    return Product;
  };
  