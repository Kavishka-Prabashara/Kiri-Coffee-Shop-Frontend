import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/navBar';
import Home from './pages/home';
import Order from './pages/order';
import Customer from './pages/customer';
import Cart from './pages/cart';
import Product from './pages/product';
import Footer from './components/footer';

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/customer" element={<Customer />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/product" element={<Product />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
