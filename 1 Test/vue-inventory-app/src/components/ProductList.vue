<template>
  <div>
    <h3>Product List</h3>
    <ul v-if="products.length">
      <li v-for="(product, index) in products" :key="index">
        {{ product.plu }} - {{ product.name }}
      </li>
    </ul>
    <p v-else>No products available.</p>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
};
</script>
