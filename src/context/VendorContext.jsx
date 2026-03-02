import { createContext, useContext, useState } from 'react';
import { listings as mockListings, vendors, getListingsByVendor } from '../data/mockData';
import { useAuth } from './AuthContext';

const VendorContext = createContext(null);

export function VendorProvider({ children }) {
    const { user } = useAuth();
    const [allListings, setAllListings] = useState(mockListings);

    const vendorProfile = user?.vendorId
        ? vendors.find((v) => v.id === user.vendorId)
        : null;

    const myListings = user?.vendorId
        ? allListings.filter((l) => l.vendorId === user.vendorId)
        : [];

    const addListing = (listingData) => {
        const newListing = {
            id: `l${Date.now()}`,
            vendorId: user.vendorId,
            ...listingData,
            hostel: vendorProfile?.hostel || '',
            status: 'active',
            createdAt: new Date().toISOString().split('T')[0],
        };
        setAllListings((prev) => [newListing, ...prev]);
        return newListing;
    };

    const updateListing = (id, updates) => {
        setAllListings((prev) =>
            prev.map((l) => (l.id === id ? { ...l, ...updates } : l))
        );
    };

    const deleteListing = (id) => {
        setAllListings((prev) => prev.filter((l) => l.id !== id));
    };

    const updateVendorProfile = (updates) => {
        if (!vendorProfile) return;
        Object.assign(vendorProfile, updates);
    };

    // Admin functions
    const getAllListings = () => allListings;
    const getAllVendors = () => vendors;

    const updateVendorStatus = (vendorId, status) => {
        const vendor = vendors.find((v) => v.id === vendorId);
        if (vendor) {
            vendor.status = status;
        }
    };

    const updateListingStatus = (listingId, status) => {
        setAllListings((prev) =>
            prev.map((l) => (l.id === listingId ? { ...l, status } : l))
        );
    };

    const value = {
        vendorProfile,
        myListings,
        allListings,
        addListing,
        updateListing,
        deleteListing,
        updateVendorProfile,
        getAllListings,
        getAllVendors,
        updateVendorStatus,
        updateListingStatus,
    };

    return (
        <VendorContext.Provider value={value}>{children}</VendorContext.Provider>
    );
}

export function useVendor() {
    const context = useContext(VendorContext);
    if (!context) {
        throw new Error('useVendor must be used within a VendorProvider');
    }
    return context;
}

export default VendorContext;
