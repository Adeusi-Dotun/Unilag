import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { VendorProvider } from './context/VendorContext';
import Navbar from './components/Navbar/Navbar';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <VendorProvider>
          <Navbar />
          <AppRoutes />
        </VendorProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
