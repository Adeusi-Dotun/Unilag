import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

// Public pages
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Category from '../pages/Category/Category';
import ListingDetail from '../pages/ListingDetail/ListingDetail';
import VendorProfile from '../pages/VendorProfile/VendorProfile';
import Cart from '../pages/Cart/Cart'


// Authenticated pages
import Profile from '../pages/Profile/Profile';

// Vendor pages
import VendorDashboard from '../pages/vendor/Dashboard/Dashboard';
import VendorListings from '../pages/vendor/Listings/Listings';
import NewListing from '../pages/vendor/NewListing/NewListing';
import VendorSettings from '../pages/vendor/Settings/Settings';

// Admin pages
import AdminVendors from '../pages/admin/Vendors/Vendors';
import AdminListings from '../pages/admin/Listings/Listings';

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
            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />

            {/* Vendor */}
            <Route
                path="/vendor/dashboard"
                element={
                    <ProtectedRoute role="vendor">
                        <VendorDashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/vendor/listings"
                element={
                    <ProtectedRoute role="vendor">
                        <VendorListings />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/vendor/new-listing"
                element={
                    <ProtectedRoute role="vendor">
                        <NewListing />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/vendor/settings"
                element={
                    <ProtectedRoute role="vendor">
                        <VendorSettings />
                    </ProtectedRoute>
                }
            />

            {/* Admin */}
            <Route
                path="/admin/vendors"
                element={
                    <ProtectedRoute role="admin">
                        <AdminVendors />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/listings"
                element={
                    <ProtectedRoute role="admin">
                        <AdminListings />
                    </ProtectedRoute>
                }
            />
            <Route path="/cart" element={<Cart />} />

           
        </Routes>
    );
}
