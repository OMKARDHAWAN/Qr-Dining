import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import '@fontsource/poppins';
import { CartProvider } from './app/providers/cartProvider.jsx'
import { AuthProvider } from './app/providers/AuthContextApi/AuthProvider.jsx'
import { MenuProvider } from './app/providers/MenuContextApi/MenuProvider.jsx'
import { TableProvider } from './app/providers/TableContextApi/TableProvider.jsx'
createRoot(document.getElementById('root')).render(
   <TableProvider>
   <AuthProvider>
    <MenuProvider>
     <BrowserRouter>
       <App/>
     </BrowserRouter>
    </MenuProvider>
   </AuthProvider>
   </TableProvider>
)
