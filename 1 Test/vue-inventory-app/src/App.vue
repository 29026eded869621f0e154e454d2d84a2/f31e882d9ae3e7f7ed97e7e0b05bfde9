<template>
  <div>
    <h1>Inventory Management</h1>

    <section>
      <h2>Update Inventory</h2>
      <UpdateInventory @inventory-updated="fetchInventory" :products="products" :shops="shops" />
    </section>

    <section>
      <h2>Recent Actions</h2>
      <RecentActions />
    </section>

    <section>
      <h2>Shops</h2>
      <AddShop @shop-added="fetchShops" />
      <ShopList :shops="shops" />
    </section>

    <section>
      <h2>Products</h2>
      <AddProduct @product-added="fetchProducts" />
      <ProductList :products="products" />
    </section>
  </div>
</template>

<script>
import AddProduct from './components/AddProduct.vue';
import ProductList from './components/ProductList.vue';
import AddShop from './components/AddShop.vue';
import ShopList from './components/ShopList.vue';
import UpdateInventory from './components/UpdateInventory.vue';
import RecentActions from './components/RecentActions.vue';
import axios from 'axios';

export default {
  components: {
    AddProduct,
    ProductList,
    AddShop,
    ShopList,
    UpdateInventory,
    RecentActions,
  },
  data() {
    return {
      products: [],
      inventory: [],
      shops: [],
    };
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3000/products');
        this.products = response.data;
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    },
    async fetchShops() {
      try {
        const response = await axios.get('http://localhost:3000/shops');
        this.shops = response.data;
      } catch (error) {
        console.error('Failed to fetch shops', error);
      }
    },
    async fetchInventory() {
      try {
        const response = await axios.get('http://localhost:3000/inventory');
        this.inventory = response.data;
      } catch (error) {
        console.error('Failed to fetch inventory', error);
      }
    },
  },
  mounted() {
    this.fetchProducts();
    this.fetchShops();
    this.fetchInventory();
  },
};
</script>
