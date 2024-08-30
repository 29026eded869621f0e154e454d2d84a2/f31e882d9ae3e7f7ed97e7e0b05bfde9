<template>
  <div>
    <h1>Inventory Management</h1>
    <AddProduct @product-added="refreshProducts" />
    <AddInventory @inventory-added="refreshInventories" />
    <ProductList />
    <InventoryList />
  </div>
</template>

<script>
import AddProduct from '../components/AddProduct.vue';
import AddInventory from '../components/AddInventory.vue';
import ProductList from '../components/ProductList.vue';
import InventoryList from '../components/InventoryList.vue';

export default {
  components: {
    AddProduct,
    AddInventory,
    ProductList,
    InventoryList
  },
  methods: {
    refreshProducts() {
      this.$refs.productList.loadProducts();
    },
    refreshInventories() {
      this.$refs.inventoryList.loadInventories();
    }
  }
};
</script>
