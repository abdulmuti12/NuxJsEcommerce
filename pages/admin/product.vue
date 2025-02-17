<template>
  <div>
    <h1>Products</h1>
    <p>Manage your products here.</p>
    
    <!-- Tombol "Add Product" dengan navigasi programatik -->
    <button @click="goToAddProduct">Add Product</button>
    
    <!-- Input pencarian dan tombol "Cari" -->
    <div>
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search by product name"
      />
      <button @click="onSearch">Cari</button>
    </div>

    <div v-if="loading">Loading...</div>
    <div v-else>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Image</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th> <!-- Kolom untuk tombol aksi -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.stock }}</td>
            <td>
              <img :src="`${daya}/storage/${product.image}`" :alt="product.name" width="50" height="50" />
            </td>
            <td>{{ product.created_at }}</td>
            <td>{{ product.updated_at }}</td>
            <td>
              <!-- Tombol Detail -->
              <button @click="viewProductDetail(product.id)" class="action-btn detail">Detail</button>
              <!-- Tombol Edit -->
              <button @click="editProduct(product.id)" class="action-btn edit">Edit</button>
              <!-- Tombol Delete -->
              <button @click="confirmDelete(product.id)" class="action-btn delete">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="pagination">
        <button 
          @click="goToPage(pagination.current_page - 1)" 
          :disabled="pagination.current_page === 1"
        >
          Previous
        </button>
        <span>Page {{ pagination.current_page }} of {{ pagination.last_page }}</span>
        <button 
          @click="goToPage(pagination.current_page + 1)" 
          :disabled="pagination.current_page === pagination.last_page"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Data produk, status loading, dan query pencarian
const products = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const pagination = ref({
  current_page: 1,
  last_page: 1,
  next_page_url: null,
  prev_page_url: null,
  total: 0,
});

// Ambil route dan router dari Vue Router
const route = useRoute();
const router = useRouter();

const { public: { baseApiUrl, baseUrlImage } } = useRuntimeConfig();
const daya = baseApiUrl.replace('/api', '');
const token = process.client ? localStorage.getItem('token') : null;

// Fungsi untuk navigasi ke halaman "Add Product"
const goToAddProduct = () => {
  router.push('/admin/AddProduct');
};

// Fungsi untuk melihat detail produk
const viewProductDetail = (productId) => {
  router.push(`/admin/detailProduct?productId=${productId}`);
};

// Fungsi untuk mengedit produk
const editProduct = (productId) => {
  router.push(`/admin/EditProduct?productId=${productId}`);
};

// Fungsi untuk menghapus produk
const confirmDelete = (productId) => {
  if (confirm('Are you sure you want to delete this product?')) {
    deleteProduct(productId); // Panggil fungsi deleteProduct jika pengguna menekan OK
  }
};

// Fungsi untuk menghapus produk
const deleteProduct = async (productId) => {
  try {
    const response = await $fetch(`${baseApiUrl}/admin/products/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`, // Tambahkan token ke header
      },
    });

    if (response.success) {
      alert('Product deleted successfully');
      fetchProducts(searchQuery.value, pagination.value.current_page); // Refresh data produk setelah menghapus
    } else {
      alert('Failed to delete product: ' + response.message);
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    alert('An error occurred while deleting the product');
  }
};

// Fungsi untuk mengambil data produk dari API dengan parameter pencarian
const fetchProducts = async (query = '', page = 1) => {
  try {
    const response = await $fetch(`${baseApiUrl}/admin/products`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`, // Tambahkan token ke header
      },
      params: {
        name: query, // Gunakan parameter query "name"
        page: page, // Gunakan parameter pagination
      },
    });

    // Jika response sukses, simpan data produk dan pagination
    if (response.success) {
      products.value = response.data.data;
      pagination.value = {
        current_page: response.data.current_page,
        last_page: response.data.last_page,
        next_page_url: response.data.next_page_url,
        prev_page_url: response.data.prev_page_url,
        total: response.data.total,
      };
    } else {
      console.error('Failed to fetch products:', response.message);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    loading.value = false; // Set loading ke false setelah selesai
  }
};

// Fungsi untuk berpindah halaman
const goToPage = (page) => {
  if (page >= 1 && page <= pagination.value.last_page) {
    router.push({ query: { ...route.query, page } }); // Perbarui URL dengan halaman baru
    fetchProducts(searchQuery.value, page);
  }
};

// Fungsi untuk pencarian
const onSearch = () => {
  router.push({ query: { ...route.query, name: searchQuery.value, page: 1 } });
};

// Watch perubahan query di URL
watch(
  () => route.query.name,
  (newQuery) => {
    if (newQuery) {
      searchQuery.value = newQuery; // Perbarui input pencarian
      fetchProducts(newQuery, route.query.page || 1); // Ambil data berdasarkan query
    } else {
      fetchProducts('', route.query.page || 1); // Ambil semua data jika tidak ada query
    }
  },
  { immediate: true }
);

// Jalankan fetchProducts saat komponen dimount
onMounted(() => {
  if (process.client) {
    const page = route.query.page || 1; // Ambil halaman dari query URL
    if (route.query.name) {
      searchQuery.value = route.query.name;
      fetchProducts(route.query.name, page);
    } else {
      fetchProducts('', page);
    }
  }
});
</script>

<style scoped>
/* Tambahkan styling sesuai kebutuhan */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

img {
  max-width: 100px;
  height: auto;
}

input {
  padding: 8px;
  margin-right: 8px;
}

button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  margin-right: 8px; /* Tambahkan margin untuk jarak antar tombol */
}

button:hover {
  background-color: #0056b3;
}

.action-btn {
  padding: 5px 10px;
  margin: 2px;
  font-size: 14px;
}

.detail {
  background-color: #28a745; /* Warna hijau untuk tombol detail */
}

.edit {
  background-color: #ffc107; /* Warna kuning untuk tombol edit */
}

.delete {
  background-color: #dc3545; /* Warna merah untuk tombol delete */
}
.pagination {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.pagination button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>