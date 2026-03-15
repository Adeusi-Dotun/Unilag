import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem('campusmarket_cart');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('campusmarket_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (listing) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === listing.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === listing.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...listing, quantity: 1 }];
        });
    };

    const removeFromCart = (listingId) => {
        setCartItems((prev) => prev.filter((item) => item.id !== listingId));
    };

    const updateQuantity = (listingId, quantity) => {
        if (quantity < 1) {
            removeFromCart(listingId);
            return;
        }
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === listingId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => setCartItems([]);

    const isInCart = (listingId) => cartItems.some((item) => item.id === listingId);

    const cartTotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
        cartTotal,
        cartCount,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}

export default CartContext;
