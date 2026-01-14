import React, { useState } from 'react';
import { User, Globe, Moon, MoonStar, Bell, HelpCircle, Shield, LogOut, ChevronDown, ChevronUp } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {
    const { user, t, language, toggleLanguage, isDarkMode, setIsDarkMode } = useAppContext();
    const [expandedFaq, setExpandedFaq] = useState(null);

    // Fallback to empty array if translation missing to prevent crash
    const faqs = t('faqs') || [];

    const SectionTitle = ({ children }) => (
        <h3 style={{
            fontSize: '0.9rem',
            fontWeight: '700',
            color: 'var(--text-secondary)',
            marginBottom: '16px',
            paddingLeft: '4px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
        }}>
            {children}
        </h3>
    );

    return (
        <div className="page-container" style={{ paddingBottom: '120px' }}>
            <h1 className="h1-hero" style={{ marginBottom: '32px' }}>{t('profile')}</h1>

            {/* User Card */}
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px', background: 'var(--bg-white)', border: '1px solid rgba(0,0,0,0.04)' }}>
                <div style={{ position: 'relative' }}>
                    <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Azizbek"
                        alt="User"
                        style={{ width: '72px', height: '72px', borderRadius: '50%', backgroundColor: '#F0F0F0' }}
                    />
                    <div style={{ position: 'absolute', bottom: 0, right: 0, width: '24px', height: '24px', background: 'var(--primary-green)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', border: '2px solid white' }}>
                        <User size={14} />
                    </div>
                </div>
                <div>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '4px' }}>{user.name}</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '500' }}>{user.phone}</span>
                        <span style={{ height: '4px', width: '4px', background: '#D1D5DB', borderRadius: '50%' }} />
                        <span style={{ fontSize: '0.9rem', color: 'var(--primary-green)', fontWeight: '700' }}>{user.loyaltyNumber}</span>
                    </div>
                </div>
            </div>

            {/* Language Section */}
            <div style={{ marginBottom: '32px' }}>
                <SectionTitle>{t('language')}</SectionTitle>
                <div style={{ display: 'flex', background: 'var(--bg-white)', padding: '6px', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.04)' }}>
                    <button
                        onClick={() => language !== 'uz' && toggleLanguage()}
                        style={{
                            flex: 1,
                            padding: '12px',
                            borderRadius: '16px',
                            border: 'none',
                            background: language === 'uz' ? 'var(--primary-green)' : 'transparent',
                            color: language === 'uz' ? 'white' : 'var(--text-secondary)',
                            fontWeight: '700',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                        }}
                    >
                        <Globe size={18} />
                        O'zbekcha
                    </button>
                    <button
                        onClick={() => language !== 'ru' && toggleLanguage()}
                        style={{
                            flex: 1,
                            padding: '12px',
                            borderRadius: '16px',
                            border: 'none',
                            background: language === 'ru' ? 'var(--primary-green)' : 'transparent',
                            color: language === 'ru' ? 'white' : 'var(--text-secondary)',
                            fontWeight: '700',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                        }}
                    >
                        <Globe size={18} />
                        Русский
                    </button>
                </div>
            </div>

            {/* Global Settings */}
            <div style={{ marginBottom: '40px' }}>
                <SectionTitle>{t('preferences')}</SectionTitle>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {/* Dark Mode Toggle */}
                    <div style={{
                        background: 'var(--bg-white)',
                        padding: '16px 20px',
                        borderRadius: '20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        border: '1px solid rgba(0,0,0,0.04)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ padding: '10px', background: isDarkMode ? '#333' : '#F4F6F4', borderRadius: '12px', color: isDarkMode ? '#FFD700' : 'var(--primary-green)' }}>
                                {isDarkMode ? <MoonStar size={20} /> : <Moon size={20} />}
                            </div>
                            <span style={{ fontWeight: '600', fontSize: '1rem' }}>{t('darkMode')}</span>
                        </div>
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            style={{
                                width: '52px',
                                height: '30px',
                                background: isDarkMode ? 'var(--secondary-lime)' : '#E5E7EB',
                                borderRadius: '20px',
                                border: 'none',
                                position: 'relative',
                                cursor: 'pointer',
                                transition: 'background 0.3s ease'
                            }}
                        >
                            <motion.div
                                layout
                                style={{
                                    width: '24px',
                                    height: '24px',
                                    background: 'white',
                                    borderRadius: '50%',
                                    position: 'absolute',
                                    top: '3px',
                                    left: isDarkMode ? '25px' : '3px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                }}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* FAQ Accordion */}
            <div style={{ marginBottom: '40px' }}>
                <SectionTitle>{t('helpFaq')}</SectionTitle>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {faqs.map((faq) => (
                        <div key={faq.id} style={{ background: 'var(--bg-white)', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.04)' }}>
                            <button
                                onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                                style={{
                                    width: '100%',
                                    padding: '20px',
                                    border: 'none',
                                    background: 'none',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    textAlign: 'left'
                                }}
                            >
                                <span style={{ fontWeight: '600', fontSize: '0.95rem', color: 'var(--text-main)' }}>{faq.question}</span>
                                {expandedFaq === faq.id ? <ChevronUp size={20} color="var(--primary-green)" /> : <ChevronDown size={20} color="#9CA3AF" />}
                            </button>
                            <AnimatePresence>
                                {expandedFaq === faq.id && (
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: 'auto' }}
                                        exit={{ height: 0 }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <div style={{ padding: '0 20px 20px 20px', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>

            {/* Logout Button */}
            <button style={{
                width: '100%',
                padding: '18px',
                borderRadius: '20px',
                background: '#FEF2F2',
                color: '#EF4444',
                border: 'none',
                fontWeight: '700',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                cursor: 'pointer'
            }}>
                <LogOut size={20} />
                {t('logOut')}
            </button>
        </div>
    );
};

export default Profile;
