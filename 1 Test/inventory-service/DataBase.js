const { Sequelize, DataTypes, Op } = require('sequelize');


const models = require('./models');


class DataBase {
    constructor() {
      if (!DataBase.instance) {
        this.db = this.connect();
        this.models = models(this.db, DataTypes);
        this.authenticate();
        DataBase.instance = this;
      }
    
      return DataBase.instance;
    }


   async getModels() {
      return this.models;
    }

    connect() {
        const db = new Sequelize({
            dialect: 'postgres',
            host: '127.0.0.1',
            port: '5432',
            database: 'service',
            username: 'user',
            password: '123456',
            sync: true,
            logging: true
          });
          
        return db;
      }

    async authenticate() {
        try {
          await this.db.authenticate();
          await this.db.sync({ force: false, alter: false });
          console.log('Connected database.');
        } catch (error) {
          console.error('Error database:', error);
        }
      }
}

module.exports = DataBase;