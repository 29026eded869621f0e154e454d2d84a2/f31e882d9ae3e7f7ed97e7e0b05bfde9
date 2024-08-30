<template>
  <div>
    <h3>Add Shop</h3>
    <form @submit.prevent="addShop">
      <div>
        <label>Shop Name:</label>
        <input v-model="name" required />
      </div>
      <button type="submit" :disabled="isSubmitting">Add Shop</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      isSubmitting: false,
      errorMessage: '',
    };
  },
  methods: {
    async addShop() {
      this.isSubmitting = true;
      this.errorMessage = '';
      try {
        const response = await axios.post('http://localhost:3000/shops', {
          name: this.name,
        });

        this.name = '';
        this.$emit('shop-added', response.data);
      } catch (error) {
        this.errorMessage = 'Failed to add shop. Please try again.';
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
