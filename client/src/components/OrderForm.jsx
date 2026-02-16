
import React, { useState } from 'react';

const DELIVERY_LOCATIONS = [
    "S&H Entrance",
    "MBA Entrance",
    "Trust Office (IT,CSE,E&I,EEE,CSD)",
    "Chemical Entrance (Chemical and FT)",
    "Near Gate 9 \n(CT -UG, Outside students)", // Added newline here
    "ECE Entrance",
    "Naturopathy Entrance \n(Mech, Mts, Civil, Naturopathy)",
    "AI Block Entrance (Auto, ML ,DS)",
    "Architecture Entrance \n(Min 3 orders)",
    "Gate 3 \n(KPC Students, Naturopathy girls Hostel)",
    "Alumini Guest House \n(Amaravathi, kaveri, bhavani)",
    "Ponnar Entrance \n(sankar, ponnar, ilango, kamban)",
    "Dheeran Entrance",
    "Valluvar Entrance \n(Valluvar, Bharathi)"
];



const OrderForm = ({ selectedItems }) => {
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        location: '',
        rollNo: '',
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'contact') {
            // Only allow numeric input
            if (value === '' || /^\d+$/.test(value)) {
                setFormData({ ...formData, [name]: value });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, contact, location, rollNo } = formData;

        if (!name || !contact || !location || !rollNo) {
            alert('Please fill in all fields');
            return;
        }

        if (selectedItems.length === 0) {
            alert('Please select at least one item from the menu.');
            return;
        }

        if (contact.length !== 10) {
            alert('Contact number must be exactly 10 digits');
            return;
        }

        const totalAmount = selectedItems.reduce((total, item) => total + (parseInt(item.price.replace('₹', '')) * item.quantity), 0);

        const orderData = {
            name,
            contact,
            location,
            rollNo,
            items: JSON.stringify(selectedItems.map(item => ({
                name: item.name,
                quantity: item.quantity
            }))),
            totalAmount
        };

        try {
            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            const data = await response.json();

            if (response.status === 201) {
                setStatus('Order placed successfully! ✅');
                setFormData({ name: '', contact: '', location: '', rollNo: '' });
            } else {
                setStatus(`Error: ${data.message} ❌`);
            }
        } catch (error) {
            console.error('Error:', error);
            setStatus('Server error. Please try again. ❌');
        }
    };

    return (
        <div className="glass-panel" style={{ marginTop: '2rem' }}>
            <h2>Place Your Order</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Roll No</label>
                    <input type="text" name="rollNo" value={formData.rollNo} onChange={handleChange} required placeholder="Ex: 22CHR001" />
                </div>

                <div className="form-group">
                    <label>Contact Number</label>
                    <input type="text" name="contact" value={formData.contact} onChange={handleChange} required maxLength="10" placeholder="10-digit mobile number" />
                </div>

                <div className="form-group">
                    <label>Delivery Location</label>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                        gap: '1rem',
                        marginTop: '0.5rem'
                    }}>
                        {DELIVERY_LOCATIONS.map((loc) => (
                            <label
                                key={loc}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    padding: '1rem',
                                    borderRadius: '0.5rem',
                                    border: formData.location === loc ? '2px solid #00cc66' : '1px solid rgba(255, 255, 255, 0.2)',
                                    background: formData.location === loc ? 'rgba(0, 204, 102, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                                    transition: 'all 0.3s ease',
                                    fontSize: '0.9rem',
                                    height: '100%',
                                    whiteSpace: 'pre-line' // Allow newlines to render
                                }}
                            >
                                <input
                                    type="radio"
                                    name="location"
                                    value={loc}
                                    checked={formData.location === loc}
                                    onChange={handleChange}
                                    style={{ display: 'none' }}
                                    required
                                />
                                {loc}
                            </label>
                        ))}
                    </div>
                </div>

                {status && <p style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    background: status.includes('Success') ? 'rgba(0, 255, 136, 0.2)' : 'rgba(255, 0, 85, 0.2)',
                    color: 'white',
                    textAlign: 'center'
                }}>{status}</p>}

                <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>
                    Total Amount: ₹{selectedItems.reduce((total, item) => total + (parseInt(item.price.replace('₹', '')) * item.quantity), 0)}
                </div>

                <button type="submit" style={{ marginTop: '1rem' }}>Place Order</button>
            </form>
        </div>
    );
};

export default OrderForm;
