import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import ActionHistory from '../../models/ActionHistory';

export const listActionHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { shop_id, plu, date_from, date_to, action, page = 1, limit = 10 } = req.query;

    const filters: any = {};

    if (shop_id) filters.shop_id = shop_id;
    if (plu) filters.product_id = plu;
    if (action) filters.action = action;
    if (date_from) filters.createdAt = { [Op.gte]: new Date(date_from as string) };
    if (date_to) filters.createdAt = { ...filters.createdAt, [Op.lte]: new Date(date_to as string) };

    const offset = (Number(page) - 1) * Number(limit);

    const histories = await ActionHistory.findAndCountAll({
      where: filters,
      limit: Number(limit),
      offset: offset,
      order: [['createdAt', 'DESC']],
    });

    res.json({
      total: histories.count,
      pages: Math.ceil(histories.count / Number(limit)),
      data: histories.rows,
    });
  } catch (error: any) {
    next(error);
  }
};
