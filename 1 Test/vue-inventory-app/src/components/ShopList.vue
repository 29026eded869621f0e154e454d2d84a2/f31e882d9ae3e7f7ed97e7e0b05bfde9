<template>
  <div>
    <h3>Shop List</h3>
    <ul v-if="shops.length">
      <li v-for="shop in shops" :key="shop.id">
        {{ shop.name }}
      </li>
    </ul>
    <p v-else>No shops available.</p>
  </div>
</template>

<script>
export default {
  props: {
    shops: {
      type: Array,
      required: true,
    },
  },
};
</script>
