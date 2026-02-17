import React from 'react';

const CartSummary = ({ selectedItems, addToCart, removeFromCart }) => {
    const totalCost = selectedItems.reduce((total, item) => {
        const price = parseInt(item.price.replace('₹', ''));
        return total + price * item.quantity;
    }, 0);

    if (selectedItems.length === 0) {
        return (
            <div className="glass-panel" style={{ textAlign: 'center', padding: '2rem' }}>
                <h3>Your cart is empty</h3>
            </div>
        );
    }

    return (
        <div className="glass-panel cart-summary">
            <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Order Summary</h2>
            <div className="cart-items">
                {selectedItems.map((item) => (
                    <div key={item.id} className="cart-item">
                        <div className="cart-item-info">
                            <h4>{item.name}</h4>
                            <p>{item.price}</p>
                        </div>
                        <div className="cart-controls">
                            <button
                                onClick={() => removeFromCart(item)}
                                className="qty-btn minus"
                            >
                                -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                                onClick={() => addToCart(item)}
                                className="qty-btn plus"
                            >
                                +
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart-total">
                <h3>Total: ₹{totalCost}</h3>
            </div>
        </div>
    );
};

export default CartSummary;
