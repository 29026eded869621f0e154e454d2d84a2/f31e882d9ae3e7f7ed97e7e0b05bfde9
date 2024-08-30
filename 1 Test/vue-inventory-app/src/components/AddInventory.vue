<template>
  <div>
    <h3>Add Inventory</h3>
    <form @submit.prevent="addInventory">
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
        <label>Quantity on Shelf:</label>
        <input v-model.number="quantity_on_shelf" required type="number" min="0" />
      </div>
      <div>
        <label>Quantity in Order:</label>
        <input v-model.number="quantity_in_order" required type="number" min="0" />
      </div>
      <button type="submit" :disabled="isSubmitting">Add Inventory</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      product_id: '',
      shop_id: '',
      quantity_on_shelf: 0,
      quantity_in_order: 0,
      products: [],
      shops: [],
      isSubmitting: false,
      errorMessage: '',
    };
  },
  methods: {
    async loadProductsAndShops() {
      try {
        const [productsResponse, shopsResponse] = await Promise.all([
          axios.get('http://localhost:3000/products'),
          axios.get('http://localhost:3000/shops'),
        ]);

        this.products = productsResponse.data;
        this.shops = shopsResponse.data;
      } catch (error) {
        this.errorMessage = 'Failed to load products or shops. Please try again.';
        console.error(error);
      }
    },
    async addInventory() {
      this.isSubmitting = true;
      this.errorMessage = '';
      try {
        await axios.post('http://localhost:3000/inventory', {
          product_id: this.product_id,
          shop_id: this.shop_id,
          quantity_on_shelf: this.quantity_on_shelf,
          quantity_in_order: this.quantity_in_order,
        });

        this.product_id = '';
        this.shop_id = '';
        this.quantity_on_shelf = 0;
        this.quantity_in_order = 0;
        this.$emit('inventory-added');
      } catch (error) {
        this.errorMessage = 'Failed to add inventory. Please try again.';
        console.error(error);
      } finally {
        this.isSubmitting = false;
      }
    },
  },
  mounted() {
    this.loadProductsAndShops();
  },
};
</script>

<style scoped>
.error {
  color: red;
  margin-top: 10px;
}
</style>
