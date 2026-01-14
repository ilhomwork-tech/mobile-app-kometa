import React, { useState, useRef } from 'react';
import {
    Calendar,
    ShoppingBag,
    ChevronRight,
    TrendingUp,
    TrendingDown,
    Zap,
    Bell,
    X,
    CheckCheck,
    ArrowUpRight,
    ArrowDownRight,
    CreditCard,
    History
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const Dashboard = () => {
    const { user, transactions, t, isDarkMode } = useAppContext();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showAllTransactions, setShowAllTransactions] = useState(false);
    const [notifications, setNotifications] = useState(user.notifications || []);

    const cardRef = useRef(null);
    const isCardInView = useInView(cardRef, { once: true });

    const unreadCount = (notifications || []).filter(n => !n.read).length;

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const formatUzS = (num) => {
        return new Intl.NumberFormat('uz-UZ', { style: 'currency', currency: 'UZS', maximumFractionDigits: 0 }).format(num);
    };

    if (!user) return <div className="page-container">Loading...</div>;

    return (
        <div className="page-container" style={{ paddingBottom: '100px' }}>
            {/* Header */}
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '32px',
                paddingTop: '20px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ position: 'relative' }}>
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Azizbek"
                            alt="Avatar"
                            style={{
                                width: '56px',
                                height: '56px',
                                borderRadius: '18px',
                                border: '2px solid var(--bg-white)',
                                boxShadow: '0 8px 16px rgba(0,0,0,0.08)'
                            }}
                        />
                        <div style={{
                            position: 'absolute',
                            bottom: '-4px',
                            right: '-4px',
                            width: '18px',
                            height: '18px',
                            background: 'var(--secondary-lime)',
                            borderRadius: '50%',
                            border: '3px solid var(--bg-white)',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }} />
                    </div>
                    <div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600', opacity: 0.8 }}>{t('hello')},</p>
                        <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)', letterSpacing: '-0.02em' }}>{(user?.name || 'User').split(' ')[0]} 👋</h2>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowNotifications(true)}
                        style={{
                            width: '52px',
                            height: '52px',
                            borderRadius: '16px',
                            background: isDarkMode ? 'rgba(255,255,255,0.05)' : 'var(--bg-white)',
                            border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            boxShadow: isDarkMode ? 'none' : '0 8px 24px rgba(0,0,0,0.04)',
                            cursor: 'pointer'
                        }}
                    >
                        <Bell size={24} color={isDarkMode ? 'var(--secondary-lime)' : 'var(--primary-green)'} />
                        {unreadCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '12px',
                                right: '12px',
                                width: '10px',
                                height: '10px',
                                background: '#FF4B4B',
                                borderRadius: '50%',
                                border: '2px solid white'
                            }} />
                        )}
                    </motion.button>
                </div>
            </header>

            {/* Premium Loyalty Card */}
            <motion.div
                ref={cardRef}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={isCardInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                style={{
                    background: 'linear-gradient(135deg, var(--primary-green) 0%, #003625 100%)',
                    color: 'white',
                    padding: '32px',
                    borderRadius: '40px',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 30px 60px -15px rgba(0, 75, 52, 0.45)',
                    height: '240px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}
            >
                <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '220px', height: '220px', background: 'radial-gradient(circle, var(--secondary-lime) 0%, transparent 70%)', opacity: 0.2, filter: 'blur(50px)' }} />
                <div style={{ position: 'absolute', bottom: '-5%', left: '10%', width: '120px', height: '120px', background: 'white', opacity: 0.05, borderRadius: '50%', filter: 'blur(30px)' }} />
                <div style={{ position: 'absolute', top: '24px', right: '32px', zIndex: 2 }}>
                    <img src="/logo.png" alt="Kometa Logo" style={{ height: '40px', borderRadius: '10px', boxShadow: '0 8px 20px rgba(0,0,0,0.2)' }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 1 }}>
                    <div>
                        <p style={{ fontSize: '0.8rem', fontWeight: '700', opacity: 0.7, letterSpacing: '2px', textTransform: 'uppercase' }}>{t('totalBalance')}</p>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
                            <h1 style={{ fontSize: '3.6rem', fontWeight: '900', lineHeight: 1, letterSpacing: '-0.04em' }}>
                                {(user.balance || 0).toLocaleString()}
                            </h1>
                            <span style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--secondary-lime)' }}>pts</span>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 1 }}>
                    <div>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', padding: '6px 14px', borderRadius: '12px', marginBottom: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <div style={{ width: '8px', height: '8px', background: 'var(--secondary-lime)', borderRadius: '50%', boxShadow: '0 0 10px var(--secondary-lime)' }} />
                            <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--secondary-lime)', letterSpacing: '0.5px' }}>{(user.tier || 'MEMBER').toUpperCase()}</span>
                        </div>
                        <p style={{ fontSize: '1.1rem', fontWeight: '600', color: 'white', opacity: 0.9, fontFamily: 'monospace', letterSpacing: '2px' }}>{user.loyaltyNumber}</p>
                    </div>
                    <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Zap size={24} fill="var(--secondary-lime)" color="var(--secondary-lime)" />
                    </div>
                </div>
            </motion.div>

            {/* Analytics Section */}
            <div style={{ margin: '32px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-main)' }}>Monthly Analytics</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '600' }}>
                        <Calendar size={14} /> This Month
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="card"
                        style={{
                            margin: 0,
                            padding: '24px',
                            background: 'var(--bg-white)',
                            border: '1px solid rgba(0,0,0,0.04)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px'
                        }}
                    >
                        <div style={{ width: '44px', height: '44px', background: isDarkMode ? 'rgba(16, 185, 129, 0.15)' : '#ECFDF5', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600', marginBottom: '4px' }}>Earned Points</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)' }}>+{(user.earnedThisMonth || 0).toLocaleString()}</span>
                                <ArrowUpRight size={18} color="#10B981" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="card"
                        style={{
                            margin: 0,
                            padding: '24px',
                            background: 'var(--bg-white)',
                            border: '1px solid rgba(0,0,0,0.04)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px'
                        }}
                    >
                        <div style={{ width: '44px', height: '44px', background: isDarkMode ? 'rgba(239, 68, 68, 0.15)' : '#FEF2F2', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EF4444' }}>
                            <TrendingDown size={24} />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600', marginBottom: '4px' }}>Spent Points</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)' }}>-{(user.spentThisMonth || 0).toLocaleString()}</span>
                                <ArrowDownRight size={18} color="#EF4444" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Transactions Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <History size={20} color={isDarkMode ? 'var(--secondary-lime)' : 'var(--primary-green)'} />
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-main)' }}>{t('recentActivity')}</h3>
                </div>
                <button
                    onClick={() => setShowAllTransactions(true)}
                    style={{ color: isDarkMode ? 'var(--secondary-lime)' : 'var(--primary-green)', fontWeight: '700', fontSize: '0.9rem', background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                >
                    {t('viewAll')} <ChevronRight size={16} />
                </button>
            </div>

            {/* Transaction List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {(transactions || []).slice(0, 4).map((act, i) => (
                    <motion.div
                        key={act.id}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i, type: "spring", stiffness: 100 }}
                        className="card"
                        style={{ margin: 0, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-white)', border: '1px solid rgba(0,0,0,0.03)' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{
                                width: '52px',
                                height: '52px',
                                background: isDarkMode ? 'rgba(255,255,255,0.05)' : (act.type === 'redemption' ? '#F5F5F5' : 'white'),
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #F0F0F0',
                                color: isDarkMode ? 'var(--secondary-lime)' : (act.type === 'redemption' ? 'var(--primary-green)' : 'var(--text-main)')
                            }}>
                                {act.type === 'redemption' ? <Zap size={22} fill={isDarkMode ? 'var(--secondary-lime)' : 'var(--primary-green)'} /> : <ShoppingBag size={22} />}
                            </div>
                            <div>
                                <p style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--text-main)', marginBottom: '2px' }}>{act.store}</p>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600', opacity: 0.7 }}>{act.date} • {act.addr}</p>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            {act.total > 0 && <p style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '2px' }}>{formatUzS(act.total)}</p>}
                            <p style={{
                                fontWeight: '800',
                                fontSize: '1rem',
                                color: act.points > 0 ? 'var(--primary-green)' : '#EF4444'
                            }}>
                                {act.points > 0 ? `+${act.points}` : act.points} pt
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Notification Drawer Overlay */}
            <AnimatePresence>
                {showNotifications && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowNotifications(false)}
                            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000, backdropFilter: 'blur(10px)' }}
                        />
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            style={{
                                position: 'fixed',
                                bottom: 0,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '100%',
                                maxWidth: '440px',
                                height: '80vh',
                                background: 'var(--bg-white)',
                                zIndex: 1001,
                                borderTopLeftRadius: '40px',
                                borderTopRightRadius: '40px',
                                padding: '32px',
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: '0 -15px 50px rgba(0,0,0,0.1)',
                                border: isDarkMode ? '1px solid rgba(255,255,255,0.05)' : 'none'
                            }}
                        >
                            <div style={{ width: '40px', height: '5px', background: '#D1D5DB', borderRadius: '10px', margin: '0 auto 24px auto' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-main)' }}>Notifications</h3>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button
                                        onClick={markAllRead}
                                        style={{ background: '#F0F9F4', color: 'var(--primary-green)', border: 'none', padding: '10px 16px', borderRadius: '14px', fontSize: '0.9rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
                                    >
                                        <CheckCheck size={18} /> Mark as Read
                                    </button>
                                    <button
                                        onClick={() => setShowNotifications(false)}
                                        style={{ background: '#F5F5F5', color: 'var(--text-main)', border: 'none', padding: '10px', borderRadius: '14px', cursor: 'pointer' }}
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {(notifications || []).map((notif) => (
                                    <div key={notif.id} style={{
                                        padding: '20px',
                                        borderRadius: '24px',
                                        background: notif.read ? 'transparent' : (isDarkMode ? 'rgba(153, 198, 30, 0.08)' : '#F9FCFA'),
                                        border: notif.read ? `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : '#F0F0F0'}` : '2px solid var(--secondary-lime)',
                                        position: 'relative',
                                        transition: 'all 0.3s ease'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <h4 style={{ fontWeight: '800', fontSize: '1.05rem', color: 'var(--text-main)' }}>{notif.title}</h4>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600' }}>{notif.time}</span>
                                        </div>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{notif.body}</p>
                                        {!notif.read && <div style={{ position: 'absolute', top: '10px', right: '10px', width: '8px', height: '8px', background: 'var(--secondary-lime)', borderRadius: '50%' }} />}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* View All Transactions Modal */}
            <AnimatePresence>
                {showAllTransactions && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '100%',
                            maxWidth: '440px',
                            height: '100vh',
                            background: 'var(--bg-white)',
                            zIndex: 2000,
                            padding: '32px'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--primary-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                    <History size={20} />
                                </div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-main)' }}>{t('recentActivity')}</h3>
                            </div>
                            <button
                                onClick={() => setShowAllTransactions(false)}
                                style={{ background: '#F5F5F5', color: 'var(--text-main)', border: 'none', padding: '12px', borderRadius: '16px', cursor: 'pointer' }}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', height: 'calc(100vh - 120px)' }}>
                            {(transactions || []).map((act) => (
                                <div key={act.id} style={{ padding: '20px', background: 'var(--bg-white)', border: '1px solid #F0F0F0', borderRadius: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#F8F9F8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {act.type === 'redemption' ? <Zap size={20} color="var(--primary-green)" /> : <ShoppingBag size={20} />}
                                        </div>
                                        <div>
                                            <p style={{ fontWeight: '800', fontSize: '1rem' }}>{act.store}</p>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{act.date}</p>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ fontWeight: '800', color: act.points > 0 ? 'var(--primary-green)' : '#EF4444' }}>{act.points > 0 ? `+${act.points}` : act.points} pts</p>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{formatUzS(act.total)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dashboard;
