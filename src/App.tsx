import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HabitsProvider } from './context/HabitsContext';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import HabitsPage from './pages/HabitsPage/HabitsPage';
import StatsPage from './pages/StatsPage/StatsPage';
import './styles/global.scss';

const AnimatedRoutes = () => {
  const location = useLocation();

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <HomePage />
          </motion.div>
        } />
        <Route path="/habits" element={
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <HabitsPage />
          </motion.div>
        } />
        <Route path="/stats" element={
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <StatsPage />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <HabitsProvider>
      <BrowserRouter>
        <div className="app">
          <Header />
          <main className="main-content">
            <AnimatedRoutes />
          </main>
        </div>
      </BrowserRouter>
    </HabitsProvider>
  );
};

export default App;