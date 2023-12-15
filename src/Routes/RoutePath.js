
import React, { useState } from 'react'
import { Routes, Route, Router, Link, Navigate } from 'react-router-dom'
import Layout from '../pages/Layout'
import RequireAuth from '../components/RequireAuth.jsx'
import Main from '../pages/Main'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import Otp from '../pages/Auth/Otp'
import Home from '../pages/Home'
import ProductList from '../pages/Products/ProductList'
import Profile from '../pages/Profile'
import ProductDetails from '../pages/Products/ProductDetails'
import Cart from '../pages/Checkout/Cart'
import ProductCollections from '../components/Products/ProductCollections'
import CollectionProductList from '../pages/Products/CollectionProductList'
import Orders from '../pages/Orders'
import Favourites from '../pages/Favourites'
import Missing from '../pages/Missing'
import AddressInput from '../components/Address/AddressInput'
import Checkout from '../pages/Checkout/Checkout'
import Payment from '../pages/Checkout/Payment'
const RoutePath = () => {
    const [role, setRole] = useState("admin");

    return (

        <Routes>
            <Route path="/" element={<Layout />} exact>
                <Route path="unauthorized" element={<>unauthorized</>} />
                <Route path="login" element={<Login />} />
                <Route path="otp" element={<Otp />} />
                <Route path="register" element={<Register />} />

                <Route path="app" element={<Main role={role} />} >
                    <Route path='' element={<Navigate to="home" />} />
                    <Route path="home" element={<Home />} />
                    <Route path="products" element={<ProductList />} />
                    <Route path="collections/:id" element={<CollectionProductList />} />
                    <Route path="products/:id" element={<ProductDetails />} />

                </Route>
                <Route
                    element={
                        <RequireAuth
                            allowedRoles="customer"
                        />
                    }
                >
                    <Route path="app" element={<Main role={role} />} >
                        <Route path="cart" element={<Cart />} />
                        <Route path="settings" element={<>settings</>} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="my-favourites" element={<Favourites />} />
                        <Route path="my-orders" element={<Orders />} />
                        <Route path="checkout" element={<Checkout />} />
                        <Route path="checkout/:id" element={<Payment />} />

                    </Route>
                </Route>
            </Route>
            <Route path='*' element={<Missing />} />
        </Routes>
    )
}

export default RoutePath