import dotenv from 'dotenv'

dotenv.config()

// Map necessary SIA's env vars as Vite only expose VITE_*
process.env.VITE_SIA_NODE_ENV = process.env.SIA_NODE_ENV
process.env.VITE_SIA_HOST = process.env.SIA_HOST
process.env.VITE_SIA_PORT = process.env.SIA_PORT

export default {
  root: 'app/src',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  }
}
