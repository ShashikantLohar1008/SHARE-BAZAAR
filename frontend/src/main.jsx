import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './landing_page/home/HomePage.jsx'
import Signup from './pages/Signup.jsx'
import AboutPage from './landing_page/about/AboutPage.jsx'
import ProductPage from './landing_page/products/ProductPage.jsx'
import Pricing from './landing_page/home/Pricing.jsx'
import SupportPage from './landing_page/support/SupportPage.jsx'
import Navbar from './landing_page/Navbar.jsx'
import Footer from './landing_page/Footer.jsx'
import NotFound from './landing_page/NotFound.jsx'
import Login from './pages/Login.jsx'


createRoot(document.getElementById('root')).render(
 <BrowserRouter>
 <Navbar/>
 <Routes>
  <Route path="/" element={<HomePage/>}></Route>
  <Route path="/login" element={<Login/>}></Route>
  <Route path="/Signup" element={<Signup/>}></Route>
  <Route path="/about" element={<AboutPage/>}></Route>
  <Route path="/product" element={<ProductPage/>}></Route>
  <Route path="/pricing" element={<Pricing/>}></Route>
  <Route path="/support" element={<SupportPage/>}></Route>
  <Route path="*" element={<NotFound/>}></Route>
 </Routes>
 <Footer/>
 </BrowserRouter>
)
