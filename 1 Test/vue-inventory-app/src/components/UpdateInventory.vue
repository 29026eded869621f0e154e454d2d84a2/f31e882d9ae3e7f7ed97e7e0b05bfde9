<template>
  <div>
    <h3>Update Inventory</h3>
    <form @submit.prevent="updateInventory">
      <div>
        <label>Product:</label>
        <select v-model="product_id" required>
          <option v-for="product in products" :key="product.id" :value="product.id">
            {{ product.name }}
          </option>
        </select>
      </div>
      <div>
        <label>Shop:</label>
        <select v-model="shop_id" required>
          <option v-for="shop in shops" :key="shop.id" :value="shop.id">
            {{ shop.name }}
          </option>
        </select>
      </div>
      <div>
        <label>Quantity Change:</label>
        <input v-model.number="quantity_change" required type="number" />
      </div>
      <button type="submit" :disabled="isSubmitting">Update Inventory</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    products: {
      type: Array,
      required: true,
    },
    shops: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      product_id: '',
      shop_id: '',
      quantity_change: 0,
      isSubmitting: false,
      errorMessage: '',
    };
  },
  methods: {
    async updateInventory() {
      this.isSubmitting = true;
      this.errorMessage = '';
      try {
        await axios.post('http://localhost:3000/inventory/update', {
          product_id: this.product_id,
          shop_id: this.shop_id,
          quantity_change: this.quantity_change,
        });

        this.product_id = '';
        this.shop_id = '';
        this.quantity_change = 0;
        this.$emit('inventory-updated');
      } catch (error) {
        this.errorMessage = 'Failed to update inventory. Please try again.';
        console.error(error);
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
  margin-top: 10px;
}
</style>
