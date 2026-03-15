import { createContext, useContext, useState, useEffect } from 'react';
import { orders as mockOrders, riders } from '../data/mockData';

const OrderContext = createContext(null);

export function OrderProvider({ children }) {
    const [orders, setOrders] = useState(() => {
        const saved = localStorage.getItem('campusmarket_orders');
        return saved ? JSON.parse(saved) : mockOrders;
    });

    useEffect(() => {
        localStorage.setItem('campusmarket_orders', JSON.stringify(orders));
    }, [orders]);

    const generateDeliveryCode = () => {
        return String(Math.floor(1000 + Math.random() * 9000));
    };

    const placeOrder = (cartItems, total, buyerId, buyerName, buyerLocation) => {
        // Group items by vendor
        const vendorGroups = {};
        cartItems.forEach((item) => {
            if (!vendorGroups[item.vendorId]) {
                vendorGroups[item.vendorId] = [];
            }
            vendorGroups[item.vendorId].push({
                listingId: item.id,
                title: item.title,
                price: item.price,
                quantity: item.quantity,
            });
        });

        const newOrders = Object.entries(vendorGroups).map(([vendorId, items]) => {
            const orderTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
            return {
                id: `ord${Date.now()}_${vendorId}`,
                buyerId,
                buyerName,
                vendorId,
                riderId: null,
                items,
                total: orderTotal,
                status: 'pending',
                deliveryCode: generateDeliveryCode(),
                pickupLocation: items[0]?.pickup || '',
                buyerLocation: buyerLocation || '',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
        });

        setOrders((prev) => [...newOrders, ...prev]);
        return newOrders;
    };

    const acceptOrder = (orderId) => {
        setOrders((prev) =>
            prev.map((o) => {
                if (o.id === orderId && o.status === 'pending') {
                    // Auto-assign a rider
                    const availableRider = riders.find((r) => r.status === 'active');
                    return {
                        ...o,
                        status: 'accepted',
                        riderId: availableRider?.id || null,
                        updatedAt: new Date().toISOString(),
                    };
                }
                return o;
            })
        );
    };

    const declineOrder = (orderId) => {
        setOrders((prev) =>
            prev.map((o) =>
                o.id === orderId && o.status === 'pending'
                    ? { ...o, status: 'declined', updatedAt: new Date().toISOString() }
                    : o
            )
        );
    };

    const updateOrderStatus = (orderId, status) => {
        setOrders((prev) =>
            prev.map((o) =>
                o.id === orderId
                    ? { ...o, status, updatedAt: new Date().toISOString() }
                    : o
            )
        );
    };

    const confirmDelivery = (orderId, code) => {
        const order = orders.find((o) => o.id === orderId);
        if (!order) return { success: false, error: 'Order not found' };
        if (order.deliveryCode !== code) return { success: false, error: 'Invalid delivery code' };
        if (order.status !== 'delivered') return { success: false, error: 'Order not yet delivered' };

        setOrders((prev) =>
            prev.map((o) =>
                o.id === orderId
                    ? { ...o, status: 'confirmed', updatedAt: new Date().toISOString() }
                    : o
            )
        );
        return { success: true };
    };

    const reportOrder = (orderId, reason) => {
        setOrders((prev) =>
            prev.map((o) =>
                o.id === orderId
                    ? {
                        ...o,
                        status: 'disputed',
                        disputeReason: reason,
                        updatedAt: new Date().toISOString(),
                    }
                    : o
            )
        );
    };

    const getOrdersByUser = (userId) => orders.filter((o) => o.buyerId === userId);
    const getOrdersByVendor = (vendorId) => orders.filter((o) => o.vendorId === vendorId);
    const getOrdersByRider = (riderId) => orders.filter((o) => o.riderId === riderId);

    const value = {
        orders,
        placeOrder,
        acceptOrder,
        declineOrder,
        updateOrderStatus,
        confirmDelivery,
        reportOrder,
        getOrdersByUser,
        getOrdersByVendor,
        getOrdersByRider,
    };

    return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrders() {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrders must be used within an OrderProvider');
    }
    return context;
}

export default OrderContext;
