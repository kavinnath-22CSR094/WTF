import React, { useState } from 'react';
import Menu from './components/Menu';
import OrderForm from './components/OrderForm';
import Footer from './components/Footer';

function App() {
    const [selectedItems, setSelectedItems] = useState([]);

    const addToCart = (item) => {
        setSelectedItems((prev) => {
            const existingItem = prev.find((i) => i.id === item.id);
            if (existingItem) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (item) => {
        setSelectedItems((prev) => {
            const existingItem = prev.find((i) => i.id === item.id);
            if (existingItem.quantity === 1) {
                return prev.filter((i) => i.id !== item.id);
            }
            return prev.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
            );
        });
    };

    const clearCart = () => {
        setSelectedItems([]);
    };

    return (
        <>
            <img src="/images/WTF.jpg" alt="WTF" style={{ width: '100%', height: '250px' }} />
            <div className="container">
                <Menu selectedItems={selectedItems} addToCart={addToCart} removeFromCart={removeFromCart} />
                <OrderForm selectedItems={selectedItems} clearCart={clearCart} />
            </div>
            <Footer />
        </>
    );
}

export default App;
