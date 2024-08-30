import { subscriber } from './config/redis';
import ActionHistory from './models/ActionHistory';

const handleMessage = async (message: string) => {
  const { product_id, shop_id, action } = JSON.parse(message);

  try {
    await ActionHistory.create({ product_id, shop_id, action });
    console.log(`Action logged: ${action} for Product ID ${product_id}`);
  } catch (error) {
    console.error('Failed to log action to database:', error);
  }
};

subscriber.subscribe('inventory_actions', (message) => handleMessage(message));

console.log('Subscribed to Redis channel: inventory_actions');
