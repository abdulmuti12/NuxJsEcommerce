<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Registrasi Admin</h2>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="name" required />
        </div>
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <div class="form-group">
          <label for="password_confirmation">Confirm Password:</label>
          <input type="password" id="password_confirmation" v-model="password_confirmation" required />
        </div>
        <div class="form-group">
          <label for="phone_number">Phone Number:</label>
          <input type="text" id="phone_number" v-model="phone_number" required />
        </div>
        <button type="submit">Register</button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p>Register your Account to get Access Acount</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { definePageMeta } from '#imports';

// Menonaktifkan layout default
definePageMeta({
  layout: false
});


// Data form
const name = ref('');
const username = ref('');
const email = ref('');
const password = ref('');
const password_confirmation = ref('');
const phone_number = ref('');

// Pesan error
const errorMessage = ref('');

// Router untuk redirect
const router = useRouter();

// Fungsi untuk registrasi
const register = async () => {
  const userData = {
    name: name.value,
    username: username.value,
    email: email.value,
    password: password.value,
    password_confirmation: password_confirmation.value,
    phone_number: phone_number.value,
  };

  try {
    // Kirim data ke API
    const response = await $fetch('http://127.0.0.1:8000/api/admin/register', {
      method: 'POST',
      body: userData,
    });

    // Jika registrasi berhasil
    if (response.success) {
      alert('Registrasi berhasil!');
      router.push('/admin/login'); // Redirect ke halaman login
    } else {
      errorMessage.value = response.message || 'Registrasi gagal. Silakan coba lagi.';
    }
  } catch (error) {
    // Tangani error
    if (error.response) {
      errorMessage.value = error.response.data.message || 'Registrasi gagal. Silakan coba lagi.';
    } else {
      errorMessage.value = 'Terjadi kesalahan. Silakan coba lagi.';
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.login-box {
  background: white;
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 400px;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  margin-top: 1rem;
}
</style>