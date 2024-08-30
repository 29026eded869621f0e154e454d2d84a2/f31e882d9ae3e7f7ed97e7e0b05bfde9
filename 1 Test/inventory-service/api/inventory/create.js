const db = new (require('../../DataBase'))();

module.exports = {
  method: 'post',
  path: '/inventory',
  execute: async (req, res, next) => {
      const models = await db.getModels();
      const { Inventory } = models;

      const { product_id, shop_id, quantity_on_shelf, quantity_in_order } = req.body;

      const inventory = await Inventory.create({
        product_id,
        shop_id,
        quantity_on_shelf,
        quantity_in_order,
      });

      res.json(inventory);
  }
};
