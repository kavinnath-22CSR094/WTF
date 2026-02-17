import React from 'react';

const Footer = () => {
    const contacts = [
        { name: "Anirudh", number: "9363719394" },
        { name: "Mathav", number: "7871937373" },
        { name: "Kishore", number: "8072278850" },
        { name: "Kavinnath", number: "6385315501" },
        { name: "Arunesh", number: "8438957190" },
        { name: "Boomesh", number: "9566567377" },
    ];

    return (
        <footer className="footer glass-panel">
            <div className="footer-content">
                <div className="social-section">
                    <h3>Follow Us</h3>
                    <a href="https://www.instagram.com/_what_the_food.__?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="social-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                        Instagram
                    </a>
                </div>

                <div className="contact-section">
                    <h3>Contact Us</h3>
                    <div className="contact-grid">
                        {contacts.map((contact, index) => (
                            <div
                                key={index}
                                className="contact-item"
                                onClick={() => {
                                    navigator.clipboard.writeText(contact.number);
                                    alert(`Copied ${contact.number} to clipboard!`);
                                }}
                                title="Click to copy number"
                            >
                                <span className="contact-icon">📞</span>
                                <div className="contact-info">
                                    <span className="contact-name">{contact.name}</span>
                                    <span className="contact-number">{contact.number}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} WTF. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
