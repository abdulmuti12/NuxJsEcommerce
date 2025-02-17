<template>
    <div class="login-container">
      <div class="login-box">
\        <h2>Registrasi Admin</h2>
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
        <p>Register your Account to get LaTian Experience</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone_number: ''
      };
    },
    methods: {
      register() {
        const userData = {
          name: this.name,
          username: this.username,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
          phone_number: this.phone_number
        };
  
        // Handle registration logic here
        console.log('Registering with:', userData);
        // You can add an API call here to register the user
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
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
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
  </style>