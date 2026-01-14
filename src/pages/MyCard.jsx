import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import { Sun, RotateCw } from 'lucide-react';

const MyCard = () => {
    const { user, t } = useAppContext();
    const [isFlipped, setIsFlipped] = useState(false);
    const [brightness, setBrightness] = useState(false);

    useEffect(() => {
        if (brightness) {
            document.body.style.filter = 'brightness(1.2) contrast(1.1)';
        } else {
            document.body.style.filter = 'none';
        }
    }, [brightness]);

    const flipCard = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="page-container" style={{
            background: 'var(--bg-white)',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '40px'
        }}>
            <h1 className="h1-hero" style={{ marginBottom: '16px', textAlign: 'center' }}>{t('myCard')}</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', textAlign: 'center', maxWidth: '80%' }}>
                {t('scanAtCheckout')}
            </p>

            {/* 3D Card Container */}
            <div style={{ perspective: '1000px', width: '100%', maxWidth: '340px', height: '520px', position: 'relative' }}>
                <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
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
                        background: 'var(--primary-green)',
                        borderRadius: '32px',
                        padding: '32px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: '0 20px 50px rgba(0, 75, 52, 0.25)',
                        color: 'white',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ fontWeight: '800', fontSize: '1.2rem', letterSpacing: '1px' }}>KOMETA</div>
                            <div style={{ background: 'var(--secondary-lime)', color: 'var(--primary-green)', padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '800' }}>
                                {user.tier.toUpperCase()}
                            </div>
                        </div>

                        <div style={{ background: 'white', padding: '16px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}>
                            <QRCodeSVG
                                value={user.loyaltyNumber}
                                size={200}
                                fgColor="#000"
                                level="H"
                            />
                        </div>

                        <div style={{ textAlign: 'center', width: '100%' }}>
                            <p style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '8px', letterSpacing: '2px' }}>{t('loyaltyNumber').toUpperCase()}</p>
                            <div style={{ fontSize: '1.8rem', fontWeight: '800', letterSpacing: '2px', fontFamily: 'monospace' }}>
                                {user.loyaltyNumber.replace(/(\d{4})/g, '$1 ').trim()}
                            </div>
                        </div>

                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', opacity: 0.6 }}>
                            <RotateCw size={16} />
                            <span style={{ fontSize: '0.8rem' }}>Tap to view barcode</span>
                        </div>
                    </div>

                    {/* BACK SIDE (Barcode) */}
                    <div style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        background: 'white',
                        borderRadius: '32px',
                        padding: '32px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
                        transform: 'rotateY(180deg)',
                        border: '1px solid #eee',
                        overflow: 'hidden'
                    }}>
                        {/* Decorative background logo */}
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.03, fontSize: '8rem', fontWeight: '900', color: 'var(--primary-green)', pointerEvents: 'none' }}>
                            K
                        </div>

                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', paddingTop: '10px' }}>
                            <div style={{ background: '#F4F6F4', padding: '6px 16px', borderRadius: '20px' }}>
                                <p style={{ fontWeight: '700', color: 'var(--text-secondary)', fontSize: '0.75rem', letterSpacing: '1px' }}>BARCODE</p>
                            </div>
                        </div>

                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                            {/* Barcode Container with Scan Animation */}
                            <div style={{ position: 'relative', padding: '20px 0', width: '100%', display: 'flex', justifyContent: 'center' }}>
                                <div style={{ display: 'flex', gap: '4px', height: '100px', alignItems: 'center' }}>
                                    {[...Array(45)].map((_, i) => (
                                        <div key={i} style={{ width: i % 2 === 0 ? '4px' : '2px', height: '100%', background: '#000' }} />
                                    ))}
                                </div>
                                <motion.div
                                    animate={{ top: ['0%', '100%', '0%'] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    style={{
                                        position: 'absolute',
                                        left: '10%',
                                        right: '10%',
                                        height: '2px',
                                        background: 'red',
                                        boxShadow: '0 0 10px red',
                                        opacity: 0.6
                                    }}
                                />
                            </div>

                            <p style={{ fontSize: '1.8rem', fontWeight: '800', fontFamily: 'monospace', letterSpacing: '4px', color: '#000' }}>
                                {user.loyaltyNumber.replace(/(\d{4})/g, '$1 ').trim()}
                            </p>
                        </div>

                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                            <RotateCw size={16} />
                            <span style={{ fontSize: '0.8rem' }}>Tap to view QR code</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setBrightness(!brightness)}
                style={{
                    marginTop: '40px',
                    background: brightness ? 'var(--secondary-lime)' : 'white',
                    color: brightness ? 'var(--primary-green)' : 'var(--text-main)',
                    border: 'none',
                    padding: '16px 24px',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                }}
            >
                <Sun size={20} />
                {t('brightenScreen')} {brightness ? '(On)' : '(Off)'}
            </motion.button>
        </div>
    );
};

export default MyCard;
