const db = new (require('../../DataBase'))();

module.exports = {
  method: 'get',
  path: '/shops',
  execute: async (req, res, next) => {
      const models = await db.getModels();
      const { Shop } = models;

      const shops = await Shop.findAll();
      res.json(shops);
  }
};
