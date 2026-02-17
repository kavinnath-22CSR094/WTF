import React, { useState } from 'react';
import Menu from './components/Menu';
import OrderForm from './components/OrderForm';
import CartSummary from './components/CartSummary';
import Footer from './components/Footer';

function App() {
    const [selectedItems, setSelectedItems] = useState([]);
    const [view, setView] = useState('menu'); // 'menu' or 'checkout'

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
        setView('menu'); // Go back to menu after order
    };

    const totalItems = selectedItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <>
            <img src="/images/WTF.jpg" alt="WTF" style={{ width: '100%', height: '250px' }} />
            <div className="container">
                {view === 'menu' ? (
                    <>
                        <Menu selectedItems={selectedItems} addToCart={addToCart} removeFromCart={removeFromCart} />
                        {selectedItems.length > 0 && (
                            <button className="floating-checkout-btn" onClick={() => setView('checkout')}>
                                Checkout ({totalItems})
                            </button>
                        )}
                    </>
                ) : (
                    <>
                        <button className="back-btn" onClick={() => setView('menu')}>
                            &larr; Back to Menu
                        </button>
                        <CartSummary selectedItems={selectedItems} addToCart={addToCart} removeFromCart={removeFromCart} />
                        <OrderForm selectedItems={selectedItems} clearCart={clearCart} />
                    </>
                )}
            </div>
            <Footer />
        </>
    );
}

export default App;
