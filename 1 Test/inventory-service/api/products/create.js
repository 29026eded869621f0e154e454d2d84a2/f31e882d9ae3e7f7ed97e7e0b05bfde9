const db = new (require('../../DataBase'))();
const publisher = require('../../redis');

module.exports = {
  method: 'post',
  path: '/products',
  execute: async (req, res, next) => {
      const models = await db.getModels();
      const { Product } = models;

      const { plu, name } = req.body;

      const product = await Product.create({ plu, name });

      await publisher.publish('inventory_actions', JSON.stringify({
        product_id: product.id,
        shop_id: null,
        action: 'product_created',
      }));

      res.json(product);
  }
};
