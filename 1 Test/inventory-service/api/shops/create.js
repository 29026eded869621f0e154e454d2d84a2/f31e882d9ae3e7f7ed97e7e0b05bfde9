const db = new (require('../../DataBase'))();

module.exports = {
  method: 'post',
  path: '/shops',
  execute: async (req, res, next) => {
      const models = await db.getModels();
      const { Shop } = models;

      const { name } = req.body;

      const shop = await Shop.create({ name });
      res.json(shop);
  }
};
