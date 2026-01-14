import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, RotateCw, Sparkles } from 'lucide-react';

const MyCard = () => {
    const { user, t, isDarkMode } = useAppContext();
    const [isFlipped, setIsFlipped] = useState(false);
    const [brightness, setBrightness] = useState(false);

    useEffect(() => {
        if (brightness) {
            document.body.style.filter = 'brightness(1.2) contrast(1.1)';
        } else {
            document.body.style.filter = 'none';
        }
        return () => {
            document.body.style.filter = 'none';
        };
    }, [brightness]);

    const flipCard = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="page-container" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '20px',
            gap: '24px'
        }}>
            <div style={{ textAlign: 'center' }}>
                <h1 className="h1-hero" style={{ marginBottom: '8px', fontSize: '1.8rem' }}>{t('myCard')}</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500', opacity: 0.8 }}>
                    {t('scanAtCheckout')}
                </p>
            </div>

            {/* 3D Card Container */}
            <div style={{
                perspective: '1200px',
                width: '100%',
                maxWidth: '320px',
                height: '460px',
                position: 'relative',
                marginTop: '10px'
            }}>
                <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.7, type: "spring", stiffness: 200, damping: 25 }}
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        transformStyle: 'preserve-3d',
                        cursor: 'pointer'
                    }}
                    onClick={flipCard}
                >
                    {/* FRONT SIDE (QR) */}
                    <div style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        background: 'linear-gradient(145deg, var(--primary-green) 0%, #003625 100%)',
                        borderRadius: '32px',
                        padding: '30px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: '0 25px 50px -12px rgba(0, 75, 52, 0.4)',
                        color: 'white',
                        border: '1px solid rgba(255,255,255,0.1)',
                        overflow: 'hidden'
                    }}>
                        {/* Decorative accents */}
                        <div style={{ position: 'absolute', top: '-20%', right: '-20%', width: '150px', height: '150px', background: 'var(--secondary-lime)', opacity: 0.15, filter: 'blur(40px)', borderRadius: '50%' }} />

                        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1 }}>
                            <img src="/logo.png" alt="Kometa Logo" style={{ height: '36px', borderRadius: '8px' }} />
                            <div style={{ background: 'rgba(153, 198, 30, 0.2)', backdropFilter: 'blur(8px)', color: 'var(--secondary-lime)', padding: '6px 14px', borderRadius: '14px', fontSize: '0.8rem', fontWeight: '800', border: '1px solid rgba(153, 198, 30, 0.3)' }}>
                                {(user?.tier || 'GOLD').toUpperCase()}
                            </div>
                        </div>

                        <div style={{
                            background: 'white',
                            padding: '18px',
                            borderRadius: '28px',
                            boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
                            zIndex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <QRCodeSVG
                                value={user?.loyaltyNumber || '0000000000'}
                                size={180}
                                fgColor="#004B34"
                                level="H"
                            />
                        </div>

                        <div style={{ textAlign: 'center', width: '100%', zIndex: 1 }}>
                            <p style={{ fontSize: '0.75rem', fontWeight: '700', opacity: 0.6, marginBottom: '6px', letterSpacing: '2px', textTransform: 'uppercase' }}>{t('loyaltyNumber')}</p>
                            <div style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '3px', fontFamily: 'monospace', color: 'white' }}>
                                {(user?.loyaltyNumber || '0000000000').replace(/(\d{4})/g, '$1 ').trim()}
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--secondary-lime)', fontSize: '0.8rem', fontWeight: '700', opacity: 0.9, zIndex: 1 }}>
                            <RotateCw size={14} />
                            <span>{isDarkMode ? 'Tashqi tomonga o\'girish' : 'Tap to flip'}</span>
                        </div>
                    </div>

                    {/* BACK SIDE (Barcode) */}
                    <div style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        background: isDarkMode ? '#1a1a1a' : 'white',
                        borderRadius: '32px',
                        padding: '30px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: isDarkMode ? '0 20px 40px rgba(0,0,0,0.4)' : '0 20px 40px rgba(0,0,0,0.1)',
                        transform: 'rotateY(180deg)',
                        border: isDarkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid #f0f0f0',
                        overflow: 'hidden'
                    }}>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', zIndex: 1 }}>
                            <div style={{ background: isDarkMode ? 'rgba(0, 75, 52, 0.2)' : '#F4F6F4', padding: '6px 16px', borderRadius: '12px' }}>
                                <p style={{ fontWeight: '800', color: 'var(--primary-green)', fontSize: '0.8rem', letterSpacing: '1px' }}>BARCODE</p>
                            </div>
                        </div>

                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', zIndex: 1 }}>
                            <div style={{ position: 'relative', padding: '20px 10px', width: '100%', background: 'white', borderRadius: '16px', display: 'flex', justifyContent: 'center', border: '1px solid #eee' }}>
                                <div style={{ display: 'flex', gap: '3px', height: '80px', alignItems: 'center', overflow: 'hidden' }}>
                                    {[...Array(40)].map((_, i) => (
                                        <div key={i} style={{ width: i % 3 === 0 ? '5px' : '2px', height: '100%', background: '#000', borderRadius: '1px' }} />
                                    ))}
                                </div>
                                <motion.div
                                    animate={{ top: ['10%', '90%', '10%'] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    style={{
                                        position: 'absolute',
                                        left: '5%',
                                        right: '5%',
                                        height: '2px',
                                        background: '#FF3B30',
                                        boxShadow: '0 0 12px rgba(255, 59, 48, 0.8)',
                                        zIndex: 2
                                    }}
                                />
                            </div>

                            <div style={{ textAlign: 'center' }}>
                                <p style={{ fontSize: '1.6rem', fontWeight: '900', fontFamily: 'monospace', letterSpacing: '4px', color: isDarkMode ? 'white' : '#000' }}>
                                    {(user?.loyaltyNumber || '0000000000').replace(/(\d{4})/g, '$1 ').trim()}
                                </p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-green)', fontSize: '0.8rem', fontWeight: '700', opacity: 0.7 }}>
                            <RotateCw size={14} />
                            <span>{isDarkMode ? 'QR kodga qaytish' : 'Back to QR'}</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Action Buttons */}
            <div style={{ width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setBrightness(!brightness)}
                    style={{
                        background: brightness ? 'var(--secondary-lime)' : 'var(--bg-white)',
                        color: brightness ? 'var(--primary-green)' : 'var(--text-main)',
                        border: brightness ? 'none' : '1px solid rgba(0,0,0,0.05)',
                        padding: '18px',
                        borderRadius: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        boxShadow: brightness ? '0 10px 25px rgba(153, 198, 30, 0.3)' : '0 4px 15px rgba(0,0,0,0.03)',
                        fontWeight: '800',
                        fontSize: '0.95rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                >
                    <Sun size={20} fill={brightness ? 'var(--primary-green)' : 'none'} />
                    {t('brightenScreen')}
                </motion.button>

                <div style={{
                    padding: '16px',
                    background: 'rgba(0, 75, 52, 0.05)',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px'
                }}>
                    <Sparkles size={18} color="var(--primary-green)" style={{ marginTop: '2px' }} />
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4', fontWeight: '500' }}>
                        Bonuslarni ishlatish yoki to'plash uchun kassirga ushbu kodni ko'rsating.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MyCard;
