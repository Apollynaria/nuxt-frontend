// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  modules: ['nuxt-icon', '@nuxtjs/apollo', '@vueuse/nuxt', '@pinia/nuxt'],
  apollo: {    
    clients: {      
      default: {        
        httpEndpoint: 'https://spacex-production.up.railway.app/'      
      }    
    },  
  },
})
