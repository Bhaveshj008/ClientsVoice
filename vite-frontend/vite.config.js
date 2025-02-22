import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
  server: {
    host: '0.0.0.0',
    port: 5173, // Optional: ensure the port matches your Docker `-p` mapping
  },
})

=======
})
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225
