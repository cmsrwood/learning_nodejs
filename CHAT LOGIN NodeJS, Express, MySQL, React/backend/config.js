const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173"
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8800"

const DB_HOST = process.env.DB_HOST || "localhost"
const DB_USER = process.env.DB_USER || "root"
const DB_PASS = process.env.DB_PASS || ""
const DB_DATABASE = process.env.DB_DATABASE || "chat"
const BACKEND_PORT = process.env.PORT || 8800

module.exports = {
  FRONTEND_URL,
  BACKEND_URL,
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_DATABASE,
  BACKEND_PORT
};