
import { useState } from 'react'
import './App.css'
import AppRoutes from './app/router/AppRoutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>User Dashboard Branch</h1>
      <AppRoutes />
    </>
  )
}

export default App