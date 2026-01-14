import React from 'react';
import { House, QrCode, Store, UserRound } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion, LayoutGroup } from 'framer-motion';

const BottomNav = () => {
    const { activeTab, setActiveTab, t } = useAppContext();

    const tabs = [
        { id: 'home', icon: House, label: 'home' },
        { id: 'card', icon: QrCode, label: 'myCard' },
        { id: 'stores', icon: Store, label: 'stores' },
        { id: 'profile', icon: UserRound, label: 'profile' }
    ];

    return (
        <nav style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'calc(100% - 40px)',
            maxWidth: '400px',
            height: '72px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 8px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            border: '1px solid rgba(255, 255, 255, 0.5)'
        }}>
            <LayoutGroup>
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    const Icon = tab.icon;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                flex: 1,
                                height: '100%',
                                color: isActive ? 'var(--secondary-lime)' : '#94a3b8',
                                transition: 'color 0.2s ease'
                            }}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTabPill"
                                    style={{
                                        position: 'absolute',
                                        width: '64px',
                                        height: '52px',
                                        background: 'var(--primary-green)',
                                        borderRadius: '20px',
                                        zIndex: -1,
                                        boxShadow: '0 4px 12px rgba(0, 75, 52, 0.2)'
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}

                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <Icon size={26} strokeWidth={isActive ? 2.5 : 2} />
                            </div>
                        </button>
                    );
                })}
            </LayoutGroup>
        </nav>
    );
};

export default BottomNav;
