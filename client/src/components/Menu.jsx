import React from 'react';
import ReactDOM from 'react-dom';

const MENU_CATEGORIES = [
    {
        title: 'BIRIYANI',
        items: [
            { id: 'biriyani_plain', name: 'Plain Biriyani', price: '₹80', image: '/images/biriyani_plain.jpg' },
            { id: 'biriyani_chicken', name: 'Chicken Biriyani', price: '₹110', image: '/images/biriyani_chicken.jpg' },
            { id: 'biriyani_bread_halwa', name: 'Chicken Biriyani + Bread Halwa', price: '₹140', image: '/images/biriyani_bread_halwa.png' },
            { id: 'biriyani_chilli', name: 'Chilli Biriyani', price: '₹120', image: '/images/biriyani_chilli.jpg' },
        ]
    },
    {
        title: 'MOJITOS',
        items: [
            { id: 'mojito_blue', name: 'Blue Caracco Mojito', price: '₹60', image: '/images/mojito_blue1.png' },
            { id: 'mojito_virgin', name: 'Virgin Mojito', price: '₹60', image: '/images/mojito_virgin.png' },
            { id: 'mojito_strawberry', name: 'Strawberry Mojito', price: '₹60', image: '/images/mojito_strawberry.png' },
            { id: 'mojito_watermelon', name: 'Watermelon Mojito', price: '₹60', image: '/images/mojito_watermelon.png' },
            { id: 'mojito_lemon_mint', name: 'Lemon & Mint Mojito', price: '₹60', image: '/images/mojito_lemon_mint.png' },
            { id: 'mojito_vanilla', name: 'Vanilla Mojito', price: '₹60', image: '/images/mojito_vanilla.png' },
        ]
    },
    {
        title: 'MOMOS',
        items: [
            { id: 'momos_chicken', name: 'Chicken Momos\n(5 pieces)', price: '₹80', image: '/images/chicken momos.png' },
            { id: 'momos_veg', name: 'Veg Momos\n(5 pieces)', price: '₹70', image: '/images/momos_veg.png' },
            { id: 'momos_mushroom', name: 'Mushroom Momos\n(5 pieces)', price: '₹70', image: '/images/mushroom momos.png' },
            { id: 'momos_peri_peri_chicken', name: 'Peri Peri Chicken Momos\n(5 pieces)', price: '₹90', image: '/images/momos_peri_peri_chicken.png' },
        ]
    },

    {
        title: 'COMBOS',
        image: '/images/combo4.png',
        items: [
            { id: 'combo_chicken_biriyani_mojito', name: 'Chicken Biriyani + Mojito', price: '₹170', image: '/images/biriyani_chilli.jpg' },
            { id: 'combo_chicken_momos_mojito', name: 'Chicken Momos + Mojito', price: '₹130', image: '/images/biriyani_chilli.jpg' },
            { id: 'combo_veg_momos_mojito', name: 'Veg Momos + Mojito', price: '₹120', image: '/images/biriyani_chilli.jpg' },
        ]
    }
];

const Menu = ({ selectedItems, addToCart, removeFromCart, onCheckout }) => {
    const [selectedCategory, setSelectedCategory] = React.useState(null);

    React.useEffect(() => {
        if (selectedCategory) {
            document.body.style.overflow = 'auto';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [selectedCategory]);

    const openCategory = (category) => {
        setSelectedCategory(category);
    };

    const closeCategory = () => {
        setSelectedCategory(null);
    };

    return (
        <div className="glass-panel">
            <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>MENU</h2>

            <div className="category-grid">
                {MENU_CATEGORIES.map((category) => (
                    <div
                        key={category.title}
                        className="category-card"
                        onClick={() => openCategory(category)}
                    >
                        {/* Use the first item's image as the category thumbnail */}
                        <img
                            src={category.image || category.items[0].image}
                            alt={category.title}
                            className={`category-image ${category.title === 'COMBOS' ? 'combo-img' : ''}`}
                        />
                        <div className="category-title">
                            <h3>{category.title}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {selectedCategory && ReactDOM.createPortal(
                <div className="modal-overlay" onClick={closeCategory}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <button className="close-modal" onClick={closeCategory}>&times;</button>
                            <h2>{selectedCategory.title}</h2>
                        </div>
                        <div className="modal-body">
                            {selectedCategory.title === 'COMBOS' ? (
                                <div className="combo-list">
                                    {selectedCategory.items.map((item) => {
                                        const selectedItem = selectedItems.find((i) => i.id === item.id);
                                        const quantity = selectedItem ? selectedItem.quantity : 0;

                                        return (
                                            <div key={item.id} className={`combo-item ${quantity > 0 ? 'selected' : ''}`}>
                                                <div className="combo-info">
                                                    <h3>{item.name}</h3>
                                                </div>
                                                <div className="combo-price">
                                                    {item.price}
                                                </div>
                                                <div className="combo-actions">
                                                    {quantity > 0 ? (
                                                        <div className="qty-controls">
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); removeFromCart(item); }}
                                                                className="qty-btn minus"
                                                            >
                                                                -
                                                            </button>
                                                            <span>{quantity}</span>
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                                                                className="qty-btn plus"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                                                            className="add-btn"
                                                        >
                                                            Add
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="menu-grid">
                                    {selectedCategory.items.map((item) => {
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
                                                        className="menu-image"
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
                            )}
                        </div>
                    </div>
                </div>,
                document.body
            )}

            {/* Render Checkout Button specifically for the modal view if needed, 
                but actually the main issue is likely z-index. 
                However, to be safe and user-friendly, let's add a button INSIDE the modal too 
                OR just ensure the main one is visible. 
                
                The plan was to add it inside. Let's stick to that for better UX context. 
            */}
            {selectedCategory && selectedItems.length > 0 && ReactDOM.createPortal(
                <button
                    className="floating-checkout-btn"
                    onClick={() => {
                        closeCategory();
                        onCheckout();
                    }}
                    style={{ zIndex: 1100 }} // Ensure it's above the modal
                >
                    Checkout ({selectedItems.reduce((acc, item) => acc + item.quantity, 0)})
                </button>,
                document.body
            )}
        </div>
    );
};

export default Menu;
