<template>
  <div class="add-product-form">
    <h2>Add New Product</h2>
    <form @submit.prevent="submitProduct" enctype="multipart/form-data">
      <div>
        <label for="name">Name:</label>
        <input id="name" v-model="form.name" required />
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea id="description" v-model="form.description" required></textarea>
      </div>
      <div>
        <label for="price">Price:</label>
        <input id="price" type="number" v-model="form.price" required />
      </div>
      <div>
        <label for="stock">Stock:</label>
        <input id="stock" type="number" v-model="form.stock" required />
      </div>
      <div>
        <label for="category">Category:</label>
        <input id="category" v-model="form.category" required />
      </div>
      <div>
        <label for="image">Image:</label>
        <input id="image" type="file" @change="handleFileUpload" required />
      </div>
      <button type="submit" class="submit-btn">Add Product</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const form = ref({
  name: '',
  description: '',
  price: '',
  stock: '',
  category: '',
  image: null
});

const handleFileUpload = (event) => {
  form.value.image = event.target.files[0];
};

const submitProduct = async () => {
  const token = localStorage.getItem('token');
  const formData = new FormData();
  formData.append('name', form.value.name);
  formData.append('description', form.value.description);
  formData.append('price', form.value.price);
  formData.append('stock', form.value.stock);
  formData.append('category', form.value.category);
  formData.append('image', form.value.image);

  try {
    const response = await fetch('http://127.0.0.1:8000/api/admin/products', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });
    const result = await response.json();
    if (result.success) {
      alert('Product added successfully!');
      router.push('/admin/product');
    } else {
      alert(`Failed to add product: ${result.message}`);
    }
  } catch (error) {
    console.error('Error adding product:', error);
    alert('An error occurred while adding the product.');
  }
};
</script>

<style scoped>
.add-product-form {
  max-width: 400px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
label {
  font-weight: bold;
}
input, textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.submit-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.submit-btn:hover {
  background-color: #0056b3;
}
</style>