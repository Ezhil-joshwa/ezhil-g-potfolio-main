import React, { useState, useEffect } from 'react';
import { Drawer, ConfigProvider } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import LeftSidebar from './components/LeftSidebar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Services from './components/Services';
import Education from './components/Education';
import Experience from './components/Experience';
import Designs from './components/Designs';
import Contact from './components/Contact';
import NavRail from './components/NavRail';
import MenuDrawer from './components/MenuDrawer';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import Breadcrumbs from './components/Breadcrumbs';
import MobileHeader from './components/MobileHeader';
import './index.css';

function App() {
  const [view, setView] = useState(() => {
    return localStorage.getItem('portfolioView') || 'home';
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('portfolioView', view);
  }, [view]);

  useEffect(() => {
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Dynamic Circular Favicon Logic
    const img = new Image();
    img.src = `${import.meta.env.BASE_URL}favicon.jpeg`;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const size = Math.min(img.width, img.height);
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');

      // Draw circle path
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      // Draw image
      ctx.drawImage(img, (size - img.width) / 2, (size - img.height) / 2);

      // Update favicon link
      const link = document.querySelector("link[rel*='icon']");
      if (link) {
        link.href = canvas.toDataURL('image/png');
        link.type = 'image/png';
      }
    };
  }, []);

  const toggleView = (newView) => {
    setView(newView);
    setIsMenuOpen(false);
  };

  // View-specific 3D Dice Variants
  const variants = {
    home: {
      initial: { rotateX: -90, y: '50%', opacity: 0 },
      animate: { rotateX: 0, y: 0, opacity: 1 }
    },
    designs: {
      initial: { rotateY: 90, x: '-50%', opacity: 0 },
      animate: { rotateY: 0, x: 0, opacity: 1 }
    },
    education: {
      initial: { rotateY: -90, x: '50%', opacity: 0 },
      animate: { rotateY: 0, x: 0, opacity: 1 }
    },
    experience: {
      initial: { rotateY: 180, scale: 0.5, opacity: 0 },
      animate: { rotateY: 0, scale: 1, opacity: 1 }
    },
    contact: {
      initial: { rotateX: 90, y: '-50%', opacity: 0 },
      animate: { rotateX: 0, y: 0, opacity: 1 }
    },
    profile: {
      initial: { scale: 0.8, opacity: 0, rotateZ: -10 },
      animate: { scale: 1, opacity: 1, rotateZ: 0 }
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ffc107',
          colorBgContainer: '#20202a',
          colorText: '#fafafa',
          fontFamily: 'Montserrat, sans-serif',
        },
      }}
    >
      <div className="app-container">
        <MobileHeader
          onProfileClick={() => toggleView('profile')}
          onMenuClick={() => setIsMenuOpen(true)}
        />

        <div className="desktop-only">
          <LeftSidebar />
        </div>

        <Drawer
          placement="right"
          onClose={() => setIsMenuOpen(false)}
          open={isMenuOpen}
          width={250}
          styles={{
            body: { padding: 0, background: '#20202a' },
            header: { display: 'none' }
          }}
          className="mobile-nav-drawer"
        >
          <MenuDrawer
            isOpen={true}
            onClose={() => setIsMenuOpen(false)}
            onNavigate={toggleView}
            isEmbedded={true}
          />
        </Drawer>

        <main className="main-content">
          <div className="content-inner perspective-container">
            <Breadcrumbs currentView={view} onNavigate={toggleView} />

            <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
              <motion.div
                key={view}
                variants={variants[view] || variants.home}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                  duration: 0.8,
                  ease: [0.4, 0, 0.2, 1]
                }}
                className="dice-wrapper"
              >
                {view === 'profile' && (
                  <div className="profile-page-wrapper page-side">
                    <LeftSidebar />
                  </div>
                )}

                {view === 'home' && (
                  <div className="page-side">
                    <Hero onExplore={() => toggleView('designs')} />
                    <Stats />
                    <Services onOrder={() => toggleView('contact')} />
                    <Footer />
                  </div>
                )}

                {view === 'education' && <div className="page-side"><Education /></div>}
                {view === 'experience' && <div className="page-side"><Experience /></div>}
                {view === 'designs' && <div className="page-side"><Designs /></div>}
                {view === 'contact' && <div className="page-side"><Contact /></div>}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        <div className="desktop-only">
          <NavRail
            currentLabel={view === 'home' ? 'HOME' : view.toUpperCase()}
            onMenuClick={() => setIsMenuOpen(true)}
          />
        </div>

        <ScrollToTop />
      </div>
    </ConfigProvider>
  );
}

export default App;
