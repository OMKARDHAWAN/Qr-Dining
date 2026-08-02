import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import { AuthProvider } from './app/providers/AuthContextApi/AuthProvider.jsx'
import { MenuProvider } from './app/providers/MenuContextApi/MenuProvider.jsx'
import { TableProvider } from './app/providers/TableContextApi/TableProvider.jsx'
import StaffProvider from './app/providers/StaffContextApi/StaffProvider.jsx'

createRoot(document.getElementById('root')).render(
    <TableProvider>
    <AuthProvider>
      <MenuProvider>
        <StaffProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </StaffProvider>
      </MenuProvider>
    </AuthProvider>
  </TableProvider>
);
