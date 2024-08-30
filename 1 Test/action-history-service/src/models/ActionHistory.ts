import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

class ActionHistory extends Model {
  public id!: number;
  public product_id!: number;
  public shop_id!: number | null;
  public action!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

ActionHistory.init({
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  shop_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'action_histories',
  timestamps: true,
});

export default ActionHistory;
