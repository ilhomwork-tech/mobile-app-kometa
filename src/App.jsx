import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import BottomNav from './components/BottomNav';
import Dashboard from './pages/Dashboard';
import MyCard from './pages/MyCard';
import Stores from './pages/Stores';
import Profile from './pages/Profile';
import { AnimatePresence, motion } from 'framer-motion';

const AppContent = () => {
  const { activeTab } = useAppContext();

  const renderPage = () => {
    switch (activeTab) {
      case 'home': return <Dashboard />;
      case 'card': return <MyCard />;
      case 'stores': return <Stores />;
      case 'profile': return <Profile />;
      default: return <Dashboard />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          style={{ flex: 1 }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
      <BottomNav />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
