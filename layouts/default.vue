<template>
    <div>
      <!-- Header -->
      <header class="header">
        <div class="header-content">
          <h2>Dashboard Admin</h2>
          <nav>
            <ul>
              <li class="username">{{ userName }}</li>
              <button @click="logout" class="logout-btn">Logout</button>
            </ul>
          </nav>
        </div>
      </header>
  
      <!-- Dashboard Content -->
      <div class="dashboard-container">
        <!-- Sidebar -->
        <div class="sidebar">
          <div class="categories">
            <h3>Menu</h3>
            <ul>
              <li><NuxtLink to="/admin/product">Products</NuxtLink></li>
              <li><NuxtLink to="/transactions">Transactions</NuxtLink></li>
              <li><NuxtLink to="/finance">Finance</NuxtLink></li>
            </ul>
          </div>
        </div>
  
        <!-- Main Content -->
        <div class="main-content">
          <slot />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  const userName = ref('Guest');
  
  const router = useRouter();
  
  // Fungsi untuk mendapatkan nama dari token
  const getUserNameFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        // console.log(payload);
        userName.value = localStorage.getItem('username');
      } catch (error) {
        console.error('Failed to decode token:', error);
        userName.value = 'Invalid Token';
      }
    }
  };
  
  onMounted(() => {
    getUserNameFromToken();
    checkToken();
  });
  
  const checkToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
    }
  };
  
  // Fungsi logout
  const logout = () => {
    localStorage.removeItem('token');
    router.push('/admin/login');
  };
  </script>
  
  <style scoped>
.header {
  background: linear-gradient(135deg, #2c3e50, #34495e);
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-bottom: 3px solid rgba(255, 255, 255, 0.2);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h2 {
  font-size: 1.8rem;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
}

nav ul {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
}

nav ul li {
  margin-right: 1rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

.username {
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
}

.username::before {
  content: "👤"; 
  font-size: 1.3rem;
}

.logout-btn {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
}

.logout-btn:hover {
  background: #c0392b;
  transform: scale(1.05);
}
  .sidebar {
  width: 200px;
  background: linear-gradient(135deg, #2c3e50, #34495e);
  color: white;
  padding: 1.5rem;
  height: 100vh;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: start;
}

.categories {
  text-align: center;
}

.categories h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  padding-bottom: 0.5rem;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar ul li {
  margin: 1rem 0;
}

.sidebar ul li a {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: white;
  font-size: 1.1rem;
  padding: 10px;
  border-radius: 8px;
  transition: background 0.3s ease, transform 0.2s ease;
}

.sidebar ul li a:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(5px);
}

/* Tambahkan ikon */
.sidebar ul li a::before {
  content: "🔹"; /* Bisa diganti dengan ikon font-awesome */
  font-size: 1.2rem;
}

  
  .main-content {
    flex: 1;
    padding: 2rem;
    background-color: #ecf0f1;
  }
  
  .dashboard-container {
    display: flex;
  }
  </style>
  