import React from 'react';

const MENU_CATEGORIES = [
    {
        title: 'BIRIYANI',
        items: [
            { id: 'biriyani_plain', name: 'Plain Biriyani', price: '₹150', image: '/images/biriyani_plain.jpg' },
            { id: 'biriyani_egg', name: 'Biriyani + Egg', price: '₹180', image: '/images/biriyani_egg.jpg' },
            { id: 'biriyani_chicken', name: 'Chicken Biriyani', price: '₹250', image: '/images/biriyani_chicken.jpg' },
            { id: 'biriyani_chicken_egg', name: 'Chicken Biriyani + Egg', price: '₹250', image: '/images/biriyani_chicken_egg.png' },
            { id: 'biriyani_chilli', name: 'Chilli Biriyani', price: '₹220', image: '/images/biriyani_chilli.jpg' },
        ]
    },
    {
        title: 'MOJITOS',
        items: [
            { id: 'mojito_blue', name: 'Blue Caracco Mojito', price: '₹120', image: '/images/blue mojito.webp' },
            { id: 'mojito_virgin', name: 'Virgin Mojito', price: '₹120', image: '/images/vrgin mojito.jpg' },
            { id: 'mojito_strawberry', name: 'Strawberry Mojito', price: '₹120', image: '/images/strawberry mojito.jpg' },
            { id: 'mojito_watermelon', name: 'Watermelon Mojito', price: '₹120', image: '/images/Watermelon Mojito.jpg' },
            { id: 'mojito_bubblegum', name: 'Bubblegum Mojito', price: '₹120', image: '/images/bubblegum mojito.jpg' },
            { id: 'mojito_mint', name: 'Mint Mojito', price: '₹100', image: '/images/lime and mint mojito.webp' },
        ]
    },
    {
        title: 'MOMOS',
        items: [
            { id: 'momos_chicken', name: 'Chicken Momos', price: '₹120', image: '/images/chicken momos.png' },
            { id: 'momos_paneer', name: 'Paneer Momos', price: '₹120', image: '/images/panner momos.png' },
            { id: 'momos_mushroom', name: 'Mushroom Momos', price: '₹130', image: '/images/mushroom momos.png' },
        ]
    },
    {
        title: 'FRUITS',
        items: [
            { id: 'fruit_mango', name: 'Mango', price: '₹80', image: '/images/mongo.webp' },
            { id: 'fruit_pineapple', name: 'Pineapple', price: '₹80', image: '/images/Pineapple.webp' },
            { id: 'fruit_watermelon', name: 'Watermelon', price: '₹60', image: '/images/watermelon.jpg' },
        ]
    }
];

const Menu = ({ selectedItems, addToCart, removeFromCart }) => {
    const totalCost = selectedItems.reduce((total, item) => {
        const price = parseInt(item.price.replace('₹', ''));
        return total + price * item.quantity;
    }, 0);

    return (
        <div className="glass-panel">
            <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>MENU</h2>
            {MENU_CATEGORIES.map((category) => (
                <div key={category.title} style={{ marginBottom: '3rem', fontSize: '1.5rem' }}>
                    <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '1rem', textAlign: 'center' }}>
                        {category.title}
                    </h3>
                    <div className="menu-grid">
                        {category.items.map((item) => {
                            const selectedItem = selectedItems.find((i) => i.id === item.id);
                            const quantity = selectedItem ? selectedItem.quantity : 0;

                            return (
                                <div
                                    key={item.id}
                                    className={`menu-item ${quantity > 0 ? 'selected' : ''}`}
                                >
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            style={{ width: '100%', height: '150px', objectFit: 'contain', borderRadius: '0.5rem', marginBottom: '1rem' }}
                                        />
                                    ) : (
                                        <div style={{ fontSize: '3rem' }}>{item.icon}</div>
                                    )}
                                    <h3>{item.name}</h3>
                                    <p className="price">{item.price}</p>

                                    {quantity > 0 ? (
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); removeFromCart(item); }}
                                                style={{ padding: '0.2rem 0.8rem', background: '#ff4d4d', border: 'none', borderRadius: '5px', color: 'white', cursor: 'pointer', fontSize: '1.2rem' }}
                                            >
                                                -
                                            </button>
                                            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{quantity}</span>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                                                style={{ padding: '0.2rem 0.8rem', background: '#00cc66', border: 'none', borderRadius: '5px', color: 'white', cursor: 'pointer', fontSize: '1.2rem' }}
                                            >
                                                +
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                                            style={{ marginTop: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(15, 50, 246, 0.46)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '5px', color: 'white', cursor: 'pointer' }}
                                        >
                                            Add to Cart
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
            <div style={{ marginTop: '2rem', padding: '1rem', borderTop: '1px solid white', textAlign: 'right' }}>
                <h3>Total Cost: ₹{totalCost}</h3>
            </div>
        </div>
    );
};

export default Menu;
