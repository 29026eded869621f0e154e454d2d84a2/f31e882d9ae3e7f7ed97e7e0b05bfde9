<template>
  <div>
    <h3>Inventory List</h3>
    <ul v-if="inventory.length">
      <li v-for="(item, index) in inventory" :key="index">
        Product ID: {{ item.product_id }} - Shop ID: {{ item.shop_id }} - On Shelf: {{ item.quantity_on_shelf }} - In Order: {{ item.quantity_in_order }}
      </li>
    </ul>
    <p v-else>No inventory available.</p>
  </div>
</template>

<script>
export default {
  props: {
    inventory: {
      type: Array,
      required: true,
    },
  },
};
</script>
