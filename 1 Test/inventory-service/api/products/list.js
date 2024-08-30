const db = new (require('../../DataBase'))();
const { Op } = require('sequelize');

module.exports = {
  method: 'get',
  path: '/products',
  execute: async (req, res, next) => {
      const models = await db.getModels();
      const { Product } = models;

      const { name, plu } = req.query;

      const filters = {};

      if (name) filters.name = { [Op.iLike]: `%${name}%` };
      if (plu) filters.plu = plu;

      const products = await Product.findAll({
        where: filters,
      });

      res.json(products);
  }
};
