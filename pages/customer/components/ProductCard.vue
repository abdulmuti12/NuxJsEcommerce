<script setup>
import { ref } from 'vue';
import axios from 'axios';

const props = defineProps({
  product: Object,
});

const isLoading = ref(false);
const message = ref('');
const isLoggedIn = ref(false); // Tambahkan status login

// Cek status login (contoh sederhana)
function checkLoginStatus() {
  const token = localStorage.getItem('auth_token');
  isLoggedIn.value = !!token;
}

checkLoginStatus();

async function checkoutProduct() {
  if (!isLoggedIn.value) {
    message.value = 'Silakan login terlebih dahulu!';
    return;
  }

  if (props.product.stock <= 0) {
    message.value = 'Stok habis!';
    return;
  }

  isLoading.value = true;
  message.value = '';

  try {
    const response = await axios.post('http://127.0.0.1:8000/api/checkout', {
      product_id: props.product.id,
      quantity: 1,
    });

    if (response.data.success) {
      props.product.stock -= 1;
      message.value = 'Checkout berhasil! Stok diperbarui.';
    } else {
      message.value = 'Checkout gagal!';
    }
  } catch (error) {
    message.value = 'Terjadi kesalahan saat checkout.';
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="product-card">
    <h3>{{ product.name }}</h3>
    <p>{{ product.description }}</p>
    <p>Harga: Rp {{ product.price.toLocaleString() }}</p>
    <p>Stok: {{ product.stock }}</p>
    <img v-if="product.image" :src="`http://127.0.0.1:8000/storage/${product.image}`" alt="Product Image" class="product-image">
    <button @click="checkoutProduct" :disabled="isLoading || product.stock <= 0" class="checkout-button">
      {{ isLoading ? 'Memproses...' : 'Checkout' }}
    </button>
    <p class="message" v-if="message">{{ message }}</p>
  </div>
</template>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.product-image {
  max-width: 100%;
  height: auto;
  margin-top: 10px;
  transition: transform 0.3s ease;
}

.product-image:hover {
  transform: scale(1.05);
}

.checkout-button {
  margin-top: 15px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #28a745;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.checkout-button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.checkout-button:hover:not(:disabled) {
  background-color: #218838;
}

.message {
  margin-top: 10px;
  font-weight: bold;
}
</style>
