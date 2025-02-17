<template>
  <div>
    <h1>Products</h1>
    <p>Manage your products here.</p>

    <!-- Product List -->
    <div v-if="products.length > 0">
      <ul>
        <li v-for="product in products" :key="product.id" class="product-item">
          <img :src="getImageUrl(product.image)" alt="Product Image" class="product-image" />
          <div class="product-details">
            <h3>{{ product.name }}</h3>
            <p>{{ product.description }}</p>
            <p><strong>Price:</strong> {{ formatPrice(product.price) }}</p>
            <p><strong>Stock:</strong> {{ product.stock }}</p>
            <p><strong>Category:</strong> {{ product.category }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Loading products or no data available.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Terapkan middleware auth
definePageMeta({
  middleware: 'auth',
  layout: 'dashboard'
});

// State untuk menyimpan data produk
const products = ref([]);

// Fungsi untuk mendapatkan URL gambar lengkap
const getImageUrl = (path) => {
  return `http://127.0.0.1:8000/storage/${path}`;
};

// Format harga
const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
};

// Ambil token dan fetch data produk saat komponen dimuat
onMounted(async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Token not found! Redirecting to login.');
    navigateTo('/admin/login');
    return;
  }

  try {
    const response = await fetch('http://127.0.0.1:8000/api/admin/product', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();
    if (result.success) {
      products.value = result.data.data;
    } else {
      alert('Failed to fetch products: ' + result.message);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    alert('Failed to fetch products. Please try again later.');
  }
});
</script>

<style scoped>
.product-item {
  display: flex;
  gap: 1rem;
  border: 1px solid #ccc;
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
}

.product-details {
  flex: 1;
}
</style>
