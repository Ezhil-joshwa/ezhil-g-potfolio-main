import React, { useState, useEffect, useRef } from 'react';
import { User, AtSign, Mail, Send, CheckCircle, XCircle, Loader, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Footer from './Footer';

// ─────────────────────────────────────────────
// Google Apps Script deployment URL
// This serverless endpoint writes each submission
// directly into a connected Google Sheet.
// ─────────────────────────────────────────────
const GOOGLE_SCRIPT_URL =
    'https://script.google.com/macros/s/AKfycbyDGP5obelVwsX0Llf8GoCeiXMSxj_O1ijy4g9fsGmAjUHLe6NV_9MV75SXsjG1ToA5/exec';


// ─────────────────────────────────────────────
// Validation helpers
// ─────────────────────────────────────────────

/** Very permissive RFC-5322-like email check */
const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

/**
 * Returns a string error message when validation fails,
 * or null when everything looks good.
 */
const validateForm = ({ name, email, number, message }) => {
    if (!name.trim()) return 'Name is required.';
    if (name.trim().length < 3) return 'Name must be at least 3 characters.';

    if (!number.trim()) return 'Phone number is required.';
    if (number.trim().length < 10) return 'Phone number must be at least 10 digits.';

    if (!email.trim()) return 'Email is required.';
    if (!isValidEmail(email)) return 'Please enter a valid email address.';

    if (!message.trim()) return 'Message is required.';
    if (message.trim().length < 3) return 'Message must be at least 3 characters.';

    return null; // ✅ all good
};

// ─────────────────────────────────────────────
// Toast component
// ─────────────────────────────────────────────
const Toast = ({ toast }) => {
    if (!toast) return null;

    const isSuccess = toast.type === 'success';

    return (
        <AnimatePresence>
            <motion.div
                className={`toast ${isSuccess ? 'toast-success' : 'toast-error'}`}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
                <span className="toast-icon">
                    {isSuccess
                        ? <CheckCircle size={18} />
                        : <XCircle size={18} />
                    }
                </span>
                <span className="toast-message">{toast.message}</span>
            </motion.div>
        </AnimatePresence>
    );
};

// ─────────────────────────────────────────────
// Info card (unchanged)
// ─────────────────────────────────────────────
const InfoCard = ({ items, index }) => (
    <motion.div
        className="contact-info-card"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
    >
        {items.map((item, i) => (
            <div className="info-item" key={i}>
                <span className="info-label">{item.label}:</span>
                <span className="info-value">{item.value}</span>
            </div>
        ))}
    </motion.div>
);

// ─────────────────────────────────────────────
// Main Contact component
// ─────────────────────────────────────────────
const Contact = () => {
    // ── form field state ──────────────────────
    const [formData, setFormData] = useState({ name: '', email: '', number: '', message: '' });

    // ── submission state ──────────────────────
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ── toast state: { type: 'success'|'error', message: string } | null ──
    const [toast, setToast] = useState(null);
    const toastTimerRef = useRef(null);

    // Auto-dismiss toast after 5 seconds
    useEffect(() => {
        if (toast) {
            clearTimeout(toastTimerRef.current);
            toastTimerRef.current = setTimeout(() => setToast(null), 5000);
        }
        return () => clearTimeout(toastTimerRef.current);
    }, [toast]);

    const contactInfo = [
        {
            items: [
                { label: 'Country', value: 'India' },
                { label: 'State', value: 'Tamil Nadu' },
                { label: 'City', value: 'Coimbatore' },
            ],
        },
        {
            items: [
                { label: 'Email', value: 'ezhilgunasekaren05@gmail.com' },
                { label: 'Instagram', value: '__josh._._7' },
                { label: 'Linked-In', value: 'Ezhil G' },
            ],
        },
        {
            items: [{ label: 'Personal', value: '+91 63791 99043' }],
        },
    ];

    // ── generic input change handler ──────────
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // ─────────────────────────────────────────
    // Form submission → Google Sheets
    // ─────────────────────────────────────────
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('[Contact Form] Submit triggered', formData);

        // 1. Client-side validation
        const validationError = validateForm(formData);
        if (validationError) {
            console.warn('[Contact Form] Validation failed:', validationError);
            setToast({ type: 'error', message: validationError });
            return;
        }

        // 2. Lock the form while the request is in flight (spam protection)
        setIsSubmitting(true);
        console.log('[Contact Form] Sending data to Google Sheets…');

        try {
            // 3. Encode POST body.
            // The Apps Script should accept POST via doPost.
            const trimmedData = {
                name: formData.name.trim(),
                number: formData.number.trim(),
                email: formData.email.trim(),
                message: formData.message.trim(),
            };
            
            console.log('[Contact Form] Trimmed Data:', trimmedData);
            
            const params = new URLSearchParams(trimmedData);
            const fullUrl = GOOGLE_SCRIPT_URL;
            
            console.log('[Contact Form] Full URL being sent:', fullUrl);
            console.log('[Contact Form] Body being sent:', params.toString());

            // 4. POST → Google Apps Script
            const response = await fetch(fullUrl, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
                body: params.toString(),
            });

            const responseBody = await response.text();
            console.log('[Contact Form] Response status:', response.status);
            console.log('[Contact Form] Response ok:', response.ok);
            console.log('[Contact Form] Response body:', responseBody);
            console.log('[Contact Form] Data sent with parameters:', Object.keys(trimmedData));

            if (!response.ok) {
                throw new Error(`Submission failed with status ${response.status}. Response: ${responseBody}`);
            }

            // 5. Success — clear form and notify user
            setFormData({ name: '', email: '', number: '', message: '' });
            setToast({
                type: 'success',
                message: "Message sent! I'll get back to you soon. 🎉",
            });
            console.log('[Contact Form] ✅ Submission successful');

        } catch (error) {
            // 6. Network or other hard failure
            console.error('[Contact Form] ❌ Submission failed:', error);
            setToast({
                type: 'error',
                message: `Failed: ${error.message}. (Adblocker maybe?)`,
            });
            // Note: formData is NOT cleared on error so the user keeps their input.
        } finally {
            // 7. Always re-enable the submit button
            setIsSubmitting(false);
        }
    };

    // ─────────────────────────────────────────
    // Render
    // ─────────────────────────────────────────
    return (
        <div className="contact-section">
            <motion.h2
                className="page-title"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                CONTACT
            </motion.h2>

            <motion.div
                className="contact-top-header"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <h3 className="sub-section-title">Contact Information</h3>
            </motion.div>

            <div className="contact-info-grid">
                {contactInfo.map((info, index) => (
                    <InfoCard key={index} index={index} items={info.items} />
                ))}
            </div>

            <motion.div
                className="contact-form-container"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h3 className="sub-section-title">Get in Touch</h3>

                {/* ── Toast notification ── */}
                <div className="toast-wrapper">
                    <Toast toast={toast} />
                </div>

                <div className="form-card">
                    <form onSubmit={handleSubmit} noValidate>

                        {/* Name field */}
                        <div className="input-group">
                            <div className="input-icon">
                                <User size={18} />
                            </div>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                autoComplete="name"
                            />
                        </div>

                        {/* Number field */}
                        <div className="input-group">
                            <div className="input-icon">
                                <Phone size={18} />
                            </div>
                            <input
                                type="tel"
                                name="number"
                                placeholder="Phone Number"
                                value={formData.number}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                autoComplete="tel"
                            />
                        </div>

                        {/* Email field */}
                        <div className="input-group">
                            <div className="input-icon">
                                <AtSign size={18} />
                            </div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                autoComplete="email"
                            />
                        </div>

                        {/* Message field */}
                        <div className="input-group">
                            <div className="input-icon textarea-icon">
                                <Mail size={18} />
                            </div>
                            <textarea
                                name="message"
                                placeholder="Message"
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            />
                        </div>

                        {/* Submit button — shows spinner while submitting */}
                        <button
                            type="submit"
                            className={`send-btn ${isSubmitting ? 'send-btn--loading' : ''}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <span className="btn-loading-inner">
                                    <Loader size={14} className="spin-icon" />
                                    SENDING…
                                </span>
                            ) : (
                                <span className="btn-idle-inner">
                                    <Send size={14} />
                                    SEND MESSAGE
                                </span>
                            )}
                        </button>

                    </form>
                </div>
            </motion.div>

            <Footer />
        </div>
    );
};

export default Contact;
