// // https://nuxt.com/docs/api/configuration/nuxt-config
// export default defineNuxtConfig({
//   compatibilityDate: '2024-11-01',
//   devtools: { enabled: true }
// })

export default defineNuxtConfig({
  // Enable automatic routing
  pages: true,

  // Define runtime configuration
  // Optional: Set compatibility date (not a standard Nuxt option, remove if unnecessary)
  // compatibilityDate: '2025-02-16' // This is not needed in Nuxt config
  runtimeConfig: {
    // Private keys (only available server-side)
    private: {
      // Add server-only environment variables here
    },
    // Public keys (available on client-side)
    public: {
      baseApiUrl: process.env.NUXT_BASE_API_URL || 'http://localhost:3000/api',
      baseUrlImage: process.env.NUXT_BASE_URL || 'http://localhost:3000/',

    },
  },

  compatibilityDate: '2025-02-16'
})


// export default {
//   mode: 'universal',

//   /*
//   ** Headers of the page
//   */
//   head: {
//     title: process.env.npm_package_name || '',
//     meta: [
//       { charset: 'utf-8' },
//       { name: 'viewport', content: 'width=device-width, initial-scale=1' },
//       { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
//     ],
//     link: [
//       { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
//     ],
    
//     //TAMBAHKAN CODE INI UNTUK MENAMBAHKAN EKSTERNAL JAVASCRIPT
//     script: [
//       { src: "/vendor/jquery/jquery.min.js" },
//       { src: "/vendor/bootstrap/js/bootstrap.bundle.min.js" },
//       { src: "/vendor/jquery-easing/jquery.easing.min.js" },
//       { src: "/js/sb-admin-2.min.js" }
//     ]
//   },

//   /*
//   ** Customize the progress-bar color
//   */
//   loading: { color: '#fff' },

//   /*
//   ** Global CSS
//   */

//   //DAN LOAD FILE CSS DI DALAM ATTRIBUTE INI
//   css: [
//     '@/assets/css/all.min.css',
//     '@/assets/css/sb-admin-2.min.css'
//   ],

//   /*
//   ** Plugins to load before mounting the App
//   */
//   plugins: [
//   ],

//   /*
//   ** Nuxt.js dev-modules
//   */
//   buildModules: [
//   ],

//   /*
//   ** Nuxt.js modules
//   */
//   modules: [
//   ],

//   /*
//   ** Build configuration
//   */
//   build: {
//     /*
//     ** You can extend webpack config here
//     */
//     extend (config, ctx) {
//     }
//   },

//   compatibilityDate: '2025-02-16'
// };