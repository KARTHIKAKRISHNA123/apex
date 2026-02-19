import axios from 'axios'
import toast from 'react-hot-toast'

// This is just a configuration. It tells the frontend WHERE the backend will be.
const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
})

// We add this now so we don't have to touch this file again later
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If we get a 401 (Unauthorized), just log out the user locally
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
    }
    return Promise.reject(error)
  }
)

export default api