
import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { connectDB } from './db.js'

const app = express()
const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'
const NODE_ENV = process.env.NODE_ENV || 'development'

// Middlewares
app.use(helmet())
app.use(cors())
app.use(express.json())

// Estado de la aplicación
let dbConnection = null
let dbError = null

// Intentar conexión a BD al iniciar
try {
         dbConnection = connectDB()
         console.log('[DB] Conexión exitosa (simulada)')
} catch (error) {
         dbError = error.message
         console.error('[DB] Error de conexión:', error.message)
}

// Endpoints básicos basados en variables de entorno

// 1. Health check
app.get('/health', (req, res) => {
         res.json({
                  status: 'ok',
                  environment: NODE_ENV,
                  timestamp: new Date().toISOString(),
                  dbConnected: !!dbConnection
         })
})

// 2. Configuración (sin secretos)
app.get('/config', (req, res) => {
         res.json({
                  server: {
                           port: PORT,
                           host: HOST,
                           env: NODE_ENV
                  },
                  database: dbConnection ? {
                           host: dbConnection.host,
                           port: dbConnection.port,
                           database: dbConnection.database,
                           user: dbConnection.user
                  } : null,
                  features: {
                           debug: process.env.DEBUG === 'true',
                           apiEnabled: !!process.env.API_KEY
                  }
         })
})

// 3. Estado de la db
app.get('/db-status', (req, res) => {
         if (dbConnection) {
                  res.json({
                           status: 'connected',
                           host: dbConnection.host,
                           port: dbConnection.port,
                           database: dbConnection.database
                  })
         } else {
                  res.status(503).json({
                           status: 'disconnected',
                           error: dbError || 'No se pudo conectar'
                  })
         }
})

// 4. Información de la API
app.get('/api-info', (req, res) => {
         const hasApiKey = !!process.env.API_KEY
         const hasJwtSecret = !!process.env.JWT_SECRET

         res.json({
                  apiKeyConfigured: hasApiKey,
                  jwtConfigured: hasJwtSecret,
                  message: hasApiKey
                           ? 'API Key configurada correctamente'
                           : 'Falta configurar API_KEY'
         })
})

// 5. Raíz
app.get('/', (req, res) => {
         res.json({
                  message: 'API de ejemplo con variables de entorno',
                  environment: NODE_ENV,
                  endpoints: ['/health', '/config', '/db-status', '/api-info']
         })
})


app.listen(PORT, HOST, () => {
         console.log(`[Server] Iniciado en ${HOST}:${PORT}`)
         console.log(`[Server] Entorno: ${NODE_ENV}`)
         console.log(`[Server] Debug: ${process.env.DEBUG || 'false'}`)
         console.log(`[Server] Memory Usage: ${JSON.stringify(process.memoryUsage())}`)
         console.log(`[Server] Arguments: ${(process.argv) || 'false'}`)
         console.log(`[Server] Version: ${(process.version) || 'false'}`)
         console.log(`[Server] PID: ${(process.pid) || 'false'}`)
})