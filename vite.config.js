import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // WICHTIG: 'base' muss HIER stehen, ausserhalb von react()
  base: '/build-consult-website/', 
})