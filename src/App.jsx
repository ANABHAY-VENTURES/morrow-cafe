import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Menu from './components/Menu';
import EditorialMarquee from './components/EditorialMarquee';
import TheSpace from './components/TheSpace';
import Experience from './components/Experience';
import Journal from './components/Journal';
import VisitUs from './components/VisitUs';
import Footer from './components/Footer';
import ReservationModal from './components/ReservationModal';
import ItemModal from './components/ItemModal';
import JournalModal from './components/JournalModal';
import CartDrawer from './components/CartDrawer';
import AmbientPlayer from './components/AmbientPlayer';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';

export default function App() {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [selectedJournalPost, setSelectedJournalPost] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Cart state persisted via localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('morrow_cafe_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync cart to localStorage whenever it updates
  useEffect(() => {
    try {
      localStorage.setItem('morrow_cafe_cart', JSON.stringify(cart));
    } catch {
      // Ignore localStorage write error
    }
  }, [cart]);

  const handleAddToCart = (item, quantity = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((i) => i.id === item.id);
      if (existingIndex > -1) {
        const nextCart = [...prevCart];
        nextCart[existingIndex] = {
          ...nextCart[existingIndex],
          quantity: nextCart[existingIndex].quantity + quantity,
        };
        return nextCart;
      } else {
        return [
          ...prevCart,
          {
            id: item.id,
            name: item.name,
            japanese: item.japanese,
            price: item.price,
            image: item.image,
            category: item.category,
            quantity,
          },
        ];
      }
    });
  };

  const handleUpdateQuantity = (itemId, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === itemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const handleRemoveItem = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleOpenReserve = () => {
    setIsReserveModalOpen(true);
  };

  const handleCloseReserve = () => {
    setIsReserveModalOpen(false);
  };

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleExploreMenu = () => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Cinematic Page Loading Sequence */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* Desktop Custom Cursor */}
      <CustomCursor />

      <div className="site-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Sticky Top Navbar */}
        <Navbar
          onOpenReserve={handleOpenReserve}
          onOpenCart={handleOpenCart}
          cartItemCount={totalCartCount}
        />

        {/* Main Content Sections */}
        <main style={{ flexGrow: 1 }}>
          {/* 1. Hero Section */}
          <Hero
            onOpenReserve={handleOpenReserve}
            onExploreMenu={handleExploreMenu}
          />

          {/* 2. Our Philosophy */}
          <Philosophy />

          {/* 3. Oversized Typography Marquee */}
          <EditorialMarquee />

          {/* 4. Signature Menu with Search & Direct Ordering */}
          <Menu
            onSelectItem={(item) => setSelectedMenuItem(item)}
            onAddToCart={handleAddToCart}
          />

          {/* 5. The Space */}
          <TheSpace />

          {/* 6. Experience Section */}
          <Experience />

          {/* 7. Journal & Dispatches */}
          <Journal onReadPost={(post) => setSelectedJournalPost(post)} />

          {/* 8. Visit Us & Table Reservation / Contact Form */}
          <VisitUs onOpenReserve={handleOpenReserve} />
        </main>

        {/* 9. Footer with Newsletter Subscription */}
        <Footer />

        {/* Interactive Modals */}
        <ReservationModal
          isOpen={isReserveModalOpen}
          onClose={handleCloseReserve}
        />

        <ItemModal
          item={selectedMenuItem}
          onClose={() => setSelectedMenuItem(null)}
          onReserveTable={handleOpenReserve}
          onAddToCart={handleAddToCart}
        />

        <JournalModal
          post={selectedJournalPost}
          onClose={() => setSelectedJournalPost(null)}
        />

        {/* Mini Order Cart Drawer */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={handleCloseCart}
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
          onExploreMenu={handleExploreMenu}
        />

        {/* Floating Ambient Atmosphere Player */}
        <AmbientPlayer />
      </div>
    </>
  );
}
