import React, { useState } from 'react';
import { Search, MapPin, Clock, Phone, Navigation, ArrowUpRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const Stores = () => {
    const { t } = useAppContext();
    const [search, setSearch] = useState('');

    const stores = [
        {
            id: 1,
            name: 'Kometa - Chilonzor',
            addr: 'Tashkent, Chilonzor district, 19-kvartal',
            phone: '+998 71 200 00 01',
            hours: '08:00 – 23:00',
            coords: '41.2722,69.2033',
            distance: '1.2 km',
            image: '/stores/chilonzor.png',
            amenities: ['parking', 'coffee', 'bakery']
        },
        {
            id: 2,
            name: 'Kometa - Yunusobod',
            addr: 'Tashkent, Yunusobod district, 12-kvartal',
            phone: '+998 71 200 00 02',
            hours: '24/7',
            coords: '41.3645,69.2908',
            distance: '3.5 km',
            image: '/stores/yunusobod.png',
            amenities: ['parking', '24h', 'atm']
        },
        {
            id: 3,
            name: 'Kometa - Mirzo Ulugbek',
            addr: 'Tashkent, Mirzo Ulugbek district',
            phone: '+998 71 200 00 03',
            hours: '08:00 – 23:00',
            coords: '41.3259,69.3323',
            distance: '4.1 km',
            image: '/stores/mirzo_ulugbek.png',
            amenities: ['parking', 'bakery']
        },
        {
            id: 4,
            name: 'Kometa - Sergeli',
            addr: 'Tashkent, Sergeli district',
            phone: '+998 71 200 00 04',
            hours: '09:00 – 22:00',
            coords: '41.2292,69.2194',
            distance: '8.2 km',
            image: '/stores/sergeli.png',
            amenities: ['atm']
        },
    ];

    const [activeFilter, setActiveFilter] = useState('all');

    const filters = [
        { id: 'all', label: 'All' },
        { id: '24h', label: '24/7' },
        { id: 'parking', label: 'Parking' },
        { id: 'coffee', label: 'Coffee' },
    ];

    const filtered = stores.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.addr.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = activeFilter === 'all' ||
            (activeFilter === '24h' ? s.hours === '24/7' : s.amenities.includes(activeFilter));
        return matchesSearch && matchesFilter;
    });

    const openYandexMaps = (destCoords) => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            window.open(`https://yandex.com/maps/?rtext=~${destCoords}&rtt=auto`, '_blank');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const url = `https://yandex.com/maps/?rtext=${position.coords.latitude},${position.coords.longitude}~${destCoords}&rtt=auto`;
                window.open(url, '_blank');
            },
            (error) => {
                console.error("Error getting location:", error);
                window.open(`https://yandex.com/maps/?rtext=~${destCoords}&rtt=auto`, '_blank');
            }
        );
    };

    const AmenityIcon = ({ type }) => {
        const icons = {
            parking: { label: 'P', color: '#3B82F6', bg: '#EFF6FF' },
            coffee: { label: '☕', color: '#78350F', bg: '#FFFBEB' },
            bakery: { label: '🥐', color: '#D97706', bg: '#FFF7ED' },
            atm: { label: '🏧', color: '#059669', bg: '#ECFDF5' },
            '24h': { label: '24h', color: '#7C3AED', bg: '#F5F3FF' }
        };
        const style = icons[type] || { label: '•', color: '#666', bg: '#eee' };

        return (
            <div style={{
                padding: '4px 8px',
                background: style.bg,
                color: style.color,
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
            }}>
                {style.label} <span style={{ textTransform: 'capitalize' }}>{type}</span>
            </div>
        );
    };

    return (
        <div className="page-container" style={{ paddingBottom: '120px' }}>
            <h1 className="h1-hero" style={{ marginBottom: '8px' }}>{t('ourStores')}</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Find the nearest supermarket</p>

            {/* Search Bar */}
            <div style={{ position: 'relative', marginBottom: '32px' }}>
                <input
                    type="text"
                    placeholder={t('searchStores')}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '18px 20px 18px 48px',
                        borderRadius: '20px',
                        border: 'none',
                        background: 'var(--bg-white)',
                        fontSize: '1rem',
                        color: 'var(--text-main)',
                        boxShadow: '0 8px 24px rgba(0,75,52,0.06)',
                        outline: 'none'
                    }}
                />
                <Search size={20} color="var(--text-secondary)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>

            {/* Filter Chips */}
            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '24px', margin: '0 -20px', paddingLeft: '20px', paddingRight: '20px', scrollbarWidth: 'none' }}>
                {filters.map(f => (
                    <motion.button
                        key={f.id}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveFilter(f.id)}
                        style={{
                            padding: '10px 20px',
                            borderRadius: '14px',
                            border: 'none',
                            background: activeFilter === f.id ? 'var(--primary-green)' : 'var(--bg-white)',
                            color: activeFilter === f.id ? 'white' : 'var(--text-secondary)',
                            fontWeight: '700',
                            fontSize: '0.85rem',
                            whiteSpace: 'nowrap',
                            boxShadow: activeFilter === f.id ? '0 8px 16px rgba(0,75,52,0.2)' : '0 4px 12px rgba(0,0,0,0.03)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {f.label}
                    </motion.button>
                ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <AnimatePresence>
                    {filtered.map((store) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            key={store.id}
                            className="card"
                            style={{ padding: '0', overflow: 'hidden', border: 'none' }}
                        >
                            {/* Hero Image */}
                            <div style={{ height: '160px', width: '100%', position: 'relative' }}>
                                <img src={store.image} alt={store.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{
                                    position: 'absolute',
                                    top: '16px',
                                    right: '16px',
                                    background: store.hours === '24/7' ? 'var(--secondary-lime)' : 'white',
                                    padding: '6px 12px',
                                    borderRadius: '12px',
                                    fontSize: '0.75rem',
                                    fontWeight: '800',
                                    color: 'var(--primary-green)',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                }}>
                                    {store.hours === '24/7' ? '24/7 OPEN' : `OPEN ${store.hours}`}
                                </div>
                                <div style={{
                                    position: 'absolute',
                                    bottom: '16px',
                                    left: '16px',
                                    background: 'rgba(0,0,0,0.6)',
                                    backdropFilter: 'blur(4px)',
                                    padding: '6px 12px',
                                    borderRadius: '12px',
                                    fontSize: '0.8rem',
                                    fontWeight: '600',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}>
                                    <Clock size={14} /> {store.hours.split(' ')[0]}
                                </div>
                            </div>

                            <div style={{ padding: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-main)' }}>{store.name}</h3>
                                    <span style={{ fontWeight: '700', color: 'var(--primary-green)', background: '#E6F4EA', padding: '4px 8px', borderRadius: '8px', fontSize: '0.8rem' }}>{store.distance}</span>
                                </div>

                                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                                    <MapPin size={16} color="var(--text-secondary)" style={{ marginTop: '2px' }} />
                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.4', flex: 1 }}>{store.addr}</span>
                                </div>

                                {/* Amenities */}
                                <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
                                    {store.amenities.map(a => <AmenityIcon key={a} type={a} />)}
                                </div>

                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <button
                                        className="btn-primary"
                                        onClick={() => openYandexMaps(store.coords)}
                                        style={{ flex: 2, fontSize: '0.95rem' }}
                                    >
                                        <Navigation size={18} />
                                        {t('getDirections')}
                                    </button>
                                    <a
                                        href={`tel:${store.phone}`}
                                        style={{
                                            flex: 1,
                                            background: '#F4F6F4',
                                            borderRadius: '18px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'var(--primary-green)',
                                            textDecoration: 'none'
                                        }}
                                    >
                                        <Phone size={22} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Stores;
