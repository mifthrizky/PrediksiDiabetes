import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // TAMBAHKAN BLOK INI
  server: {
    host: true,  // <-- Ini adalah kuncinya
    port: 5173   // <-- Ini port default Vite
  }
})