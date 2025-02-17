<template>
  <div class="container">
    <h2>Daftar Produk</h2>

    <!-- Filter Form -->
    <div class="filter-container">
      <input v-model="filters.name" placeholder="Cari produk..." class="search-box" @input="fetchProducts" />

      <select v-model="filters.category" @change="fetchProducts" class="filter-select">
        <option value="">Semua Kategori</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>

      <select v-model="filters.range" @change="fetchProducts" class="filter-select">
        <option value="">Urutkan Harga</option>
        <option value="low">Terendah</option>
        <option value="high">Tertinggi</option>
      </select>
    </div>

    <!-- Produk List -->
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="content-container">
      <div class="product-grid">
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
      </div>

      <!-- Pagination -->
      <div class="pagination">
        <button @click="goToPage(pagination.current_page - 1)" :disabled="pagination.current_page === 1">
          Previous
        </button>
        <span>Page {{ pagination.current_page }} of {{ pagination.last_page }}</span>
        <button @click="goToPage(pagination.current_page + 1)" :disabled="pagination.current_page === pagination.last_page">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import ProductCard from '@/pages/customer/components/ProductCard.vue';

definePageMeta({
  layout: 'dashboard' // Menggunakan layouts/admin.vue
});

const products = ref([]);
const categories = ref(["Electronics", "Fashion", "Home", "Toys", "Books"]);
const filters = ref({ name: "", category: "", range: "" });
const loading = ref(true);
const error = ref(null);
const baseUrl = "http://127.0.0.1:8000/api/products";

// Data pagination
const pagination = ref({
  current_page: 1,
  last_page: 1,
  next_page_url: null,
  prev_page_url: null,
});

const fetchProducts = async () => {
  loading.value = true;
  error.value = null;

  try {
    // Bangun query parameter berdasarkan filter dan halaman saat ini
    let queryParams = new URLSearchParams({
      name: filters.value.name,
      category: filters.value.category,
      range: filters.value.range,
      page: pagination.value.current_page, // Tambahkan parameter halaman
    });

    const response = await fetch(`${baseUrl}?${queryParams.toString()}`);
    const result = await response.json();

    console.log("API Response:", result.data.data);

    if (result.success) {
      products.value = result.data.data;
      // Perbarui data pagination
      pagination.value = {
        current_page: result.data.current_page,
        last_page: result.data.last_page,
        next_page_url: result.data.next_page_url,
        prev_page_url: result.data.prev_page_url,
      };
    } else {
      error.value = "Gagal mengambil data produk.";
    }
  } catch (err) {
    error.value = "Terjadi kesalahan saat mengambil data.";
    console.error("Fetch error:", err);
  } finally {
    loading.value = false;
  }
};

// Fungsi untuk berpindah halaman
const goToPage = (page) => {
  if (page >= 1 && page <= pagination.value.last_page) {
    pagination.value.current_page = page;
    fetchProducts();
  }
};

onMounted(fetchProducts);

// Pantau perubahan filter agar memanggil fetchProducts secara otomatis
watch(filters, fetchProducts, { deep: true });
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100vh; /* Gunakan tinggi viewport */
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

/* Filter Container */
.filter-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 10px;
}

.search-box, .filter-select {
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  max-width: 200px;
}

/* Grid Produk */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  gap: 20px;
  overflow-y: auto; /* Tambahkan scroll jika konten melebihi tinggi */
  flex-grow: 1; /* Biarkan grid tumbuh mengisi ruang yang tersedia */
}

.loading {
  text-align: center;
  font-size: 1.2rem;
}

.error {
  color: red;
  text-align: center;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.pagination button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination span {
  font-size: 1rem;
}

.content-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto; /* Tambahkan scroll jika konten melebihi tinggi */
}
</style>