const db = new (require('../../DataBase'))();
const publisher = require('../../redis');

module.exports = {
  method: 'post',
  path: '/inventory/update',
  execute: async (req, res, next) => {
    try {
      const models = await db.getModels();
      const { Inventory } = models;

      const { product_id, shop_id, quantity_change } = req.body;
      const inventory = await Inventory.findOne({ where: { product_id, shop_id } });

      if (inventory) {
        inventory.quantity_on_shelf += quantity_change;
        await inventory.save();

        await publisher.publish('inventory_actions', JSON.stringify({
          product_id,
          shop_id,
          action: quantity_change > 0 ? 'inventory_increased' : 'inventory_decreased',
        }));

        res.json(inventory);
      } else {
        res.status(404).json({ error: 'Inventory not found' });
      }
    } catch (error) {
      next(error);
    }
  }
};
