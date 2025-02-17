<template>
    <div>
      <h1>Edit Product</h1>
  
      <div v-if="loading">Loading...</div>
  
      <form v-else @submit.prevent="saveProduct" enctype="multipart/form-data">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="form.name" required />
        </div>
  
        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" v-model="form.description" required></textarea>
        </div>
  
        <div class="form-group">
          <label for="price">Price</label>
          <input type="number" id="price" v-model="form.price" required />
        </div>
  
        <div class="form-group">
          <label for="category">Category</label>
          <input type="text" id="category" v-model="form.category" required />
        </div>
  
        <div class="form-group">
          <label for="stock">Stock</label>
          <input type="number" id="stock" v-model="form.stock" required />
        </div>
  
        <div class="form-group">
          <label for="image">Image</label>
          <input type="file" id="image" @change="handleFileUpload" />
        </div>
  
        <button type="submit">Save Product</button>
      </form>
  
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
  
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
  
      <!-- <button @click="goBack">Back to Products</button> -->
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  
  const route = useRoute();
  const router = useRouter();
  
  const { public: { baseApiUrl } } = useRuntimeConfig();
  const token = process.client ? localStorage.getItem('token') : null;
  
  const loading = ref(true);
  const error = ref(null);
  const successMessage = ref(null);
  const form = ref({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: null,
  });
  
  const fetchProductDetail = async () => {
    try {
      const productId = route.query.productId;
      const response = await $fetch(`${baseApiUrl}/admin/products/${productId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.success) {
        form.value = {
          name: response.data.name,
          description: response.data.description,
          price: response.data.price,
          category: response.data.category,
          stock: response.data.stock,
          image: null,
        };

      } else {
        error.value = response.message;
      }
    } catch (err) {
      error.value = 'Failed to load product details.';
    } finally {
      loading.value = false;
    }
  };
  
  const handleFileUpload = (event) => {
    form.value.image = event.target.files[0];
  };
  
  const saveProduct = async () => {
    const productId = route.query.productId;
    const formData = new FormData();
  
    formData.append('name', form.value.name);
    formData.append('description', form.value.description);
    formData.append('price', form.value.price);
    formData.append('category', form.value.category);
    formData.append('stock', form.value.stock);
    if (form.value.image) {
      formData.append('image', form.value.image);
    }
    formData.append('_method', 'PUT');
  
    try {
      const response = await $fetch(`${baseApiUrl}/admin/products/${productId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (response.success) {
        successMessage.value = response.message;
        router.push('/admin/product'); // Redirect

      } else {
        error.value = response.message;
      }
    } catch (err) {
      error.value = 'Failed to save product.';
    }
  };
  
  const goBack = () => {
    router.push('/admin/product');
  };
  
  onMounted(fetchProductDetail);
  </script>
  
  <style scoped>
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input, textarea {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #218838;
  }
  
  .error-message {
    color: red;
  }
  
  .success-message {
    color: green;
  }
  </style>
  