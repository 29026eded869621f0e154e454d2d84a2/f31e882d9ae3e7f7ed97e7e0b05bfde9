const db = new (require('../../DataBase'))();

module.exports = {
  method: 'post',
  path: '/inventory/decrease',
  execute: async (req, res, next) => {
      const models = await db.getModels();
      const { Inventory } = models;

      const { product_id, shop_id, quantity } = req.body;

      const inventory = await Inventory.findOne({
        where: { product_id, shop_id }
      });

      if (inventory) {
        inventory.quantity_on_shelf -= quantity;
        await inventory.save();
        res.json(inventory);
      } else {
        res.status(404).json({ error: 'Inventory not found' });
      }
  }
};
