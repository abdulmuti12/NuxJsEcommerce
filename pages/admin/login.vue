<template>
  <div class="login-container">
    <div class="login-box">
      <h1>Admin Login</h1>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="text" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <a href="#" class="forgot-password">Forgot password?</a>
        <button type="submit">Login</button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p>Login your Account Or       <NuxtLink to="/admin/register">Register</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script>

  import axios from 'axios';
  import { definePageMeta } from '#imports';

  // Menonaktifkan layout default
  definePageMeta({
    layout: false
  });

    export default {
      data() {
        return {
          email: '',
          password: '',
          errorMessage: '' // Untuk menampilkan pesan error
        };
      },
      methods: {
        async login() {
          // Data yang akan dikirim ke endpoint
          const loginData = {
            email: this.email,
            password: this.password
          };

          // Ambil base URL dari environment variable
          const config = useRuntimeConfig();
        const baseApiUrl = config.public.baseApiUrl;
        const loginEndpoint = `${baseApiUrl}/admin/login`;

          try {
            // Kirim request ke endpoint login
            const response = await axios.post(loginEndpoint, loginData);

            // Jika login sukses
            if (response.data.success) {
              // Simpan token ke localStorage
              localStorage.setItem('token', response.data.data.token);
              localStorage.setItem('username', response.data.data.username);


              // Redirect ke halaman admin/product
              this.$router.push('/admin/product');
            } else {
              // Tampilkan pesan error jika login gagal
              this.errorMessage = response.data.message;
            }
          } catch (error) {
            // Tangani error jika request gagal
            if (error.response) {
              this.errorMessage = error.response.data.message || 'Login failed. Please try again.';
            } else {
              this.errorMessage = 'An error occurred. Please check your connection.';
            }
          }
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
      padding: 3rem; /* Increased padding */
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      text-align: center;
      width: 400px; /* Increased width */
    }

    .form-group {
      margin-bottom: 1.5rem; /* Increased margin */
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
    }

    input {
      width: 100%;
      padding: 0.75rem; /* Increased padding */
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1rem; /* Increased font size */
    }

    .forgot-password {
      display: block;
      margin-bottom: 1.5rem; /* Increased margin */
      color: #007bff;
      text-decoration: none;
    }

    button {
      width: 100%;
      padding: 1rem; /* Increased padding */
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem; /* Increased font size */
    }

    button:hover {
      background-color: #0056b3;
    }

    .error-message {
      color: red;
      margin-bottom: 1rem;
    }
</style>