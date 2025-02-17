<template>
    <div class="detail-container">
      <h1>Detail Product</h1>
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else>
        <!-- Tampilkan pesan error jika produk tidak ditemukan -->
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
        <!-- Tampilkan data produk jika berhasil -->
        <div v-else class="product-detail">
          <div class="product-image">
            <img :src="`${daya}/storage/${product.image}`" :alt="product.name" class="product-img" />
          </div>
          <div class="product-info">
            <h2>{{ product.name }}</h2>
            <p><strong>Description:</strong> {{ product.description }}</p>
            <p><strong>Price:</strong> {{ formatPrice(product.price) }}</p>
            <p><strong>Category:</strong> {{ product.category }}</p>
            <p><strong>Stock:</strong> {{ product.stock }}</p>
            <p><strong>Created At:</strong> {{ formatDate(product.created_at) }}</p>
            <p><strong>Updated At:</strong> {{ formatDate(product.updated_at) }}</p>
          </div>
        </div>
      </div>
      <button @click="goBack" class="back-button">Back to Products</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  
  const product = ref(null);
  const loading = ref(true);
  const error = ref(null);
  
  const route = useRoute();
  const router = useRouter();
  
  // Ambil baseApiUrl dari runtimeConfig
  const { public: { baseApiUrl } } = useRuntimeConfig();
  
  // Ambil token dari localStorage (hanya di client side)
  const token = process.client ? localStorage.getItem('token') : null;
  
  const daya = baseApiUrl.replace('/api', '');
  
  // Fungsi untuk mengambil data produk berdasarkan ID
  const fetchProductDetail = async () => {
    try {
      const productId = route.query.productId; // Ambil ID produk dari URL
      const response = await $fetch(`${baseApiUrl}/admin/products/${productId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Tambahkan token ke header
        },
      });
  
      // Jika response sukses, simpan data produk
      if (response.success) {
        product.value = response.data;
      } else {
        error.value = response.message || 'Product not found';
      }
    } catch (err) {
      console.error('Error fetching product detail:', err);
      error.value = 'Failed to load product details. Please try again later.';
    } finally {
      loading.value = false;
    }
  };
  
  // Fungsi untuk memformat harga ke format mata uang
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(price);
  };
  
  // Fungsi untuk memformat tanggal
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  // Fungsi untuk kembali ke halaman sebelumnya
  const goBack = () => {
    router.push('/admin/product');
  };
  
  // Jalankan fetchProductDetail saat komponen dimount
  onMounted(() => {
    if (process.client) {
      fetchProductDetail();
    }
  });
  </script>
  
  <style scoped>
  .detail-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
  }
  
  .loading {
    text-align: center;
    font-size: 1.2rem;
    color: #666;
  }
  
  .error-message {
    text-align: center;
    color: #ff4d4d;
    font-weight: bold;
    padding: 10px;
    background: #ffe6e6;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  .product-detail {
    display: flex;
    gap: 30px;
    margin-top: 20px;
    background: #fff;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .product-image {
    flex: 1;
  }
  
  .product-img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .product-img:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  .product-info {
    flex: 2;
  }
  
  .product-info h2 {
    margin-top: 0;
    color: #007bff;
  }
  
  .product-info p {
    margin: 10px 0;
    color: #555;
  }
  
  .product-info strong {
    color: #333;
  }
  
  .back-button {
    margin-top: 20px;
    padding: 10px 20px;
    background: linear-gradient(135deg, #007bff, #0056b3);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.3s ease, transform 0.2s ease;
  }
  
  .back-button:hover {
    background: linear-gradient(135deg, #0056b3, #003d80);
    transform: translateY(-2px);
  }
  
  .back-button:active {
    transform: translateY(0);
  }
  </style>