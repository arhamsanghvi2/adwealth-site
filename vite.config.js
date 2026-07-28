import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: [
      'adwealth.co.in',
      '.adwealth.co.in',
      'adweath.co.in',
      '.adweath.co.in'
    ]
  }
})
