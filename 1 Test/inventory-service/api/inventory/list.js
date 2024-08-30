const db = new (require('../../DataBase'))();
const { Op } = require('sequelize');

module.exports = {
  method: 'get',
  path: '/inventory',
  execute: async (req, res, next) => {
      const models = await db.getModels();
      const { Inventory } = models;

      const { plu, shop_id, quantity_on_shelf_from, quantity_on_shelf_to, quantity_in_order_from, quantity_in_order_to } = req.query;

      const filters = {};

      if (plu) filters['$Product.plu$'] = plu;
      if (shop_id) filters.shop_id = shop_id;
      if (quantity_on_shelf_from) filters.quantity_on_shelf = { [Op.gte]: quantity_on_shelf_from };
      if (quantity_on_shelf_to) filters.quantity_on_shelf = { [Op.lte]: quantity_on_shelf_to };
      if (quantity_in_order_from) filters.quantity_in_order = { [Op.gte]: quantity_in_order_from };
      if (quantity_in_order_to) filters.quantity_in_order = { [Op.lte]: quantity_in_order_to };

      const inventory = await Inventory.findAll({
        where: filters,
        include: [{ model: models.Product }],
      });

      res.json(inventory);
  }
};
