<template>
  <div>
    <!-- Header -->
    <header class="header">
      <div class="header-content">
        <h2 class="logo">Toko Online</h2>
     
      </div>
    </header>

    <!-- Dashboard Content -->
    <div class="dashboard-container">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="categories">
          <h3>Menu</h3>
          <ul class="nav-menu">
            <li><NuxtLink to="/home" class="nav-link">🛍 Products</NuxtLink></li>
          </ul>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const userName = ref('Guest');
const dropdownOpen = ref(false);
const router = useRouter();

const getUserNameFromToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      userName.value = localStorage.getItem('username') || 'User';
    } catch (error) {
      console.error('Failed to decode token:', error);
      userName.value = 'Invalid Token';
    }
  }
};

const checkToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
  }
};

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

onMounted(() => {
  getUserNameFromToken();
  checkToken();
});
</script>

<style scoped>
/* Header */
.header {
  background: linear-gradient(135deg, #8ab7e2, #4b80a6);
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  transition: all 0.5s ease;
  animation: fadeSlideDown 1s ease;
}

@keyframes fadeSlideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.logo {
  font-size: 1.8rem;
  font-weight: bold;
  text-transform: uppercase;
  transition: transform 0.5s ease;
}

.logo:hover {
  transform: scale(1.1) rotate(3deg);
}

.user-dropdown:hover {
  background: rgba(255, 255, 255, 0.2);
  transition: background 0.3s ease;
}

.dropdown-menu {
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 0.5s ease, transform 0.5s ease;
  animation: fadeIn 0.5s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Sidebar */
.sidebar {
  width: 200px;
  background: linear-gradient(135deg, #6ba2d5, #4b80a6);
  color: white;
  padding: 1.5rem;
  height: 100vh;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  transition: transform 0.5s ease;
  animation: slideInLeft 1s ease;
}

@keyframes slideInLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.nav-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-link {
  display: block;
  padding: 1rem;
  margin: 0.5rem 0;
  background: linear-gradient(135deg, #4b80a6, #6ba2d5);
  border-radius: 10px;
  color: white;
  text-decoration: none;
  text-align: center;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.nav-link:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, #5c98d5, #89c2f7);
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 2rem;
  background-color: #ecf0f1;
  min-height: 100vh;
  transition: opacity 0.5s ease;
  animation: fadeInContent 1s ease;
}

@keyframes fadeInContent {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.dashboard-container {
  display: flex;
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    position: absolute;
    height: 100%;
    width: 220px;
    z-index: 10;
  }

  .sidebar.open {
    transform: translateX(0);
  }
}
</style>
