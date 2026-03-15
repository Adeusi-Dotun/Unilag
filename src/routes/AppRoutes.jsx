import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Public pages
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Category from '../pages/Category/Category';
import ListingDetail from '../pages/ListingDetail/ListingDetail';
import VendorProfile from '../pages/VendorProfile/VendorProfile';

// Authenticated buyer pages
import Cart from '../pages/Cart/Cart';
import Checkout from '../pages/Checkout/Checkout';
import Orders from '../pages/Orders/Orders';
import OrderTracking from '../pages/OrderTracking/OrderTracking';
import Profile from '../pages/Profile/Profile';

// Vendor pages
import VendorDashboard from '../pages/vendor/Dashboard/Dashboard';
import VendorListings from '../pages/vendor/Listings/Listings';
import NewListing from '../pages/vendor/NewListing/NewListing';
import VendorSettings from '../pages/vendor/Settings/Settings';
import VendorOrders from '../pages/vendor/Orders/VendorOrders';

// Rider pages
import RiderDashboard from '../pages/rider/Dashboard/RiderDashboard';

// Admin pages
import AdminVendors from '../pages/admin/Vendors/Vendors';
import AdminListings from '../pages/admin/Listings/Listings';
import AdminOrders from '../pages/admin/Orders/AdminOrders';
import AdminRiders from '../pages/admin/Riders/AdminRiders';

function ProtectedRoute({ children, allowedRoles }) {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default function AppRoutes() {
    return (
        <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/category/:categoryId" element={<Category />} />
            <Route path="/listing/:id" element={<ListingDetail />} />
            <Route path="/vendor/:id" element={<VendorProfile />} />

            {/* Authenticated */}
            <Route path="/cart" element={
                <ProtectedRoute><Cart /></ProtectedRoute>
            } />
            <Route path="/checkout" element={
                <ProtectedRoute><Checkout /></ProtectedRoute>
            } />
            <Route path="/orders" element={
                <ProtectedRoute><Orders /></ProtectedRoute>
            } />
            <Route path="/orders/:id" element={
                <ProtectedRoute><OrderTracking /></ProtectedRoute>
            } />
            <Route path="/profile" element={
                <ProtectedRoute><Profile /></ProtectedRoute>
            } />

            {/* Vendor */}
            <Route path="/vendor/dashboard" element={
                <ProtectedRoute allowedRoles={['vendor']}><VendorDashboard /></ProtectedRoute>
            } />
            <Route path="/vendor/listings" element={
                <ProtectedRoute allowedRoles={['vendor']}><VendorListings /></ProtectedRoute>
            } />
            <Route path="/vendor/new-listing" element={
                <ProtectedRoute allowedRoles={['vendor']}><NewListing /></ProtectedRoute>
            } />
            <Route path="/vendor/settings" element={
                <ProtectedRoute allowedRoles={['vendor']}><VendorSettings /></ProtectedRoute>
            } />
            <Route path="/vendor/orders" element={
                <ProtectedRoute allowedRoles={['vendor']}><VendorOrders /></ProtectedRoute>
            } />

            {/* Rider */}
            <Route path="/rider/dashboard" element={
                <ProtectedRoute allowedRoles={['rider']}><RiderDashboard /></ProtectedRoute>
            } />

            {/* Admin */}
            <Route path="/admin/vendors" element={
                <ProtectedRoute allowedRoles={['admin']}><AdminVendors /></ProtectedRoute>
            } />
            <Route path="/admin/listings" element={
                <ProtectedRoute allowedRoles={['admin']}><AdminListings /></ProtectedRoute>
            } />
            <Route path="/admin/orders" element={
                <ProtectedRoute allowedRoles={['admin']}><AdminOrders /></ProtectedRoute>
            } />
            <Route path="/admin/riders" element={
                <ProtectedRoute allowedRoles={['admin']}><AdminRiders /></ProtectedRoute>
            } />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
