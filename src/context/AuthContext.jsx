import { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers, vendors } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('campusmarket_user');
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('campusmarket_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('campusmarket_user');
        }
    }, [user]);

    const login = (email, password) => {
        const found = mockUsers.find(
            (u) => u.email === email && u.password === password
        );
        if (found) {
            const { password: _, ...safeUser } = found;
            setUser(safeUser);
            return { success: true, user: safeUser };
        }
        return { success: false, error: 'Invalid email or password' };
    };

    const register = (userData) => {
        const exists = mockUsers.find((u) => u.email === userData.email);
        if (exists) {
            return { success: false, error: 'Email already registered' };
        }

        const newUser = {
            id: `u${Date.now()}`,
            name: userData.name,
            email: userData.email,
            role: userData.role || 'buyer',
            savedVendors: [],
            savedListings: [],
        };

        if (userData.role === 'vendor') {
            const newVendor = {
                id: `v${Date.now()}`,
                name: userData.vendorName || userData.name,
                photo: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userData.name)}&backgroundColor=0D7C3E`,
                hostel: userData.hostel || '',
                phone: userData.phone || '',
                whatsapp: userData.phone ? `234${userData.phone.slice(1)}` : '',
                bio: '',
                hours: '',
                category: '',
                rating: 0,
                status: 'pending',
                joinedDate: new Date().toISOString().split('T')[0],
            };
            vendors.push(newVendor);
            newUser.vendorId = newVendor.id;
        }

        mockUsers.push({ ...newUser, password: userData.password });
        setUser(newUser);
        return { success: true, user: newUser };
    };

    const logout = () => {
        setUser(null);
    };

    const toggleSaveVendor = (vendorId) => {
        if (!user) return;
        setUser((prev) => {
            const saved = prev.savedVendors || [];
            const updated = saved.includes(vendorId)
                ? saved.filter((id) => id !== vendorId)
                : [...saved, vendorId];
            return { ...prev, savedVendors: updated };
        });
    };

    const toggleSaveListing = (listingId) => {
        if (!user) return;
        setUser((prev) => {
            const saved = prev.savedListings || [];
            const updated = saved.includes(listingId)
                ? saved.filter((id) => id !== listingId)
                : [...saved, listingId];
            return { ...prev, savedListings: updated };
        });
    };

    const value = {
        user,
        login,
        register,
        logout,
        toggleSaveVendor,
        toggleSaveListing,
        isAuthenticated: !!user,
        isVendor: user?.role === 'vendor',
        isAdmin: user?.role === 'admin',
        isBuyer: user?.role === 'buyer',
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default AuthContext;
