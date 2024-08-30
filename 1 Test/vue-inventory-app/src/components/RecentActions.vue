<template>
  <div>
    <h3>Recent Actions</h3>
    <ul v-if="actions.length">
      <li v-for="action in actions" :key="action.id">
        {{ action.createdAt }} - {{ action.action }} (Product ID: {{ action.product_id }}, Shop ID: {{ action.shop_id || 'N/A' }})
      </li>
    </ul>
    <p v-else>No recent actions available.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      actions: [],
    };
  },
  methods: {
    async fetchRecentActions() {
      try {
        const response = await axios.get('http://localhost:3001/history', {
          params: {
            limit: 5,
          },
        });
        this.actions = response.data.data;
      } catch (error) {
        console.error('Failed to fetch recent actions:', error);
      }
    },
  },
  mounted() {
    this.fetchRecentActions();
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
}
</style>
