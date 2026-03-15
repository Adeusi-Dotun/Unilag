import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { VendorProvider } from './context/VendorContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import AppRoutes from './routes/AppRoutes';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <VendorProvider>
                    <CartProvider>
                        <OrderProvider>
                            <Navbar />
                            <AppRoutes />
                            <Footer />
                        </OrderProvider>
                    </CartProvider>
                </VendorProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
