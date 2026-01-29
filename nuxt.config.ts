// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-29',

  modules: [
    '@nuxt/content',
  ],

  // Static site generation for Cloudflare Pages
  ssr: true,
  nitro: {
    preset: 'static',
    prerender: {
      // Don't fail on prerender errors, just log them
      failOnError: false,
    },
  },

  // App metadata
  app: {
    head: {
      title: 'Free API Catalog',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Curated catalog of free APIs for developers. Search, filter, and discover APIs for your next project.' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  // Content module config
  content: {
    // Content directory for API descriptions, guides, etc.
  },

  // Global CSS
  css: ['~/assets/css/main.css'],

  // Development
  devtools: { enabled: true },
})
