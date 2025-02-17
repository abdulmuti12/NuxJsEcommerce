<template>
  <div class="login-container">
    <div class="login-box">
      <h1>Hello!</h1>
      <h2>Good Morning</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <a href="#" class="forgot-password">Forgot password?</a>
        <button type="submit">Login</button>
      </form>
      <p>Login your Account to get LaTian Experience</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      // Handle login logic here
      console.log('Logging in with:', this.username, this.password);
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
</style>