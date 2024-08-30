<template>
  <div>
    <h3>Add Product</h3>
    <form @submit.prevent="addProduct">
      <div>
        <label>PLU:</label>
        <input v-model="plu" required />
      </div>
      <div>
        <label>Name:</label>
        <input v-model="name" required />
      </div>
      <button type="submit" :disabled="isSubmitting">Add Product</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      plu: '',
      name: '',
      isSubmitting: false,
      errorMessage: '',
    };
  },
  methods: {
    async addProduct() {
      this.isSubmitting = true;
      this.errorMessage = '';
      try {
        await axios.post('http://localhost:3000/products', {
          plu: this.plu,
          name: this.name,
        });

        this.plu = '';
        this.name = '';
        this.$emit('product-added');
      } catch (error) {
        this.errorMessage = 'Failed to add product. Please try again.';
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
