import './App.css';

// Assuming you have these components defined elsewhere
import Navbar from './components/navBar';
import Home from './pages/home';
import Order from './pages/order';
import Customer from './pages/customer';
import Cart from './pages/cart';
import Product from './pages/product';
import Footer from './components/footer';

function App() {
    return (
        <div>
            <Navbar />
            <Home />
            <Order />
            <Customer />
            <Cart />
            <Product />
            <Footer />
        </div>
    );
}

export default App;