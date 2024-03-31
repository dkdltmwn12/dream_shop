import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import ProductsDetail from './pages/ProductsDetail';
import Cart from './pages/Cart';
import Home from './pages/Home';
import ProtectedRoute from './pages/ProtectedRoute';

const router = createBrowserRouter([{
  path: '/',
  element: <App/>,
  errorElement: <p>Not Found</p>,
  children: [
    {index: true, path: '/', element: <Home/>},
    {path: '/products', element: <Products/>},
    {
      path: '/products/add',
      element: (
      <ProtectedRoute requireAdmin> 
        <AddProduct/>
      </ProtectedRoute>
      )
    },
    {path: '/products/:id', element: <ProductsDetail/>},
    {
      path: '/cart',
      element: (
      <ProtectedRoute>
        <Cart/>
      </ProtectedRoute>
      )
    }
  ]}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
