// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to, from) => {
  // Pastikan hanya dijalankan di client-side
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');

    // Redirect ke /admin/product jika sudah login dan mencoba mengakses login
    if (token && to.path === '/admin/login') {
      return navigateTo('/admin/product');
    }

    // Redirect ke login jika tidak ada token
    if (!token && to.path !== '/admin/login') {
      return navigateTo('/admin/login');
    }
  }
});
