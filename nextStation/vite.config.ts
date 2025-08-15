import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/nextTrainMobileApp/'
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        "img/nextStationLondon/cards/station_cards/street_circle.png",
        "img/nextStationLondon/cards/station_cards/street_square.png",
        "img/nextStationLondon/cards/station_cards/street_triangle.png",
        "img/nextStationLondon/cards/station_cards/street_pentagon.png",
        "img/nextStationLondon/cards/station_cards/street_joker.png",
        "img/nextStationLondon/cards/station_cards/street_railroad_switch.png",
        "img/nextStationLondon/cards/station_cards/underground_circle.png",
        "img/nextStationLondon/cards/station_cards/underground_square.png",
        "img/nextStationLondon/cards/station_cards/underground_triangle.png",
        "img/nextStationLondon/cards/station_cards/underground_pentagon.png",
        "img/nextStationLondon/cards/station_cards/underground_joker.png",
        "docs/nextStationLondon-Rules-EN.pdf"
      ],
      manifest: {
        name: 'Next Station',
        short_name: 'NextStation',
        start_url: '/',
        display: 'standalone',
        background_color: '#0f0f12',
        theme_color: '#0f0f12'
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 50 * 1024 * 1024,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,pdf}'],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 365 }
            }
          },
          {
            urlPattern: ({ request }) => request.destination === 'document' || request.destination === 'object',
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'docs' }
          },
          {
            urlPattern: ({ sameOrigin }) => sameOrigin,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'static' }
          }
        ]
      }
    })
  ]
});
