// Shared animation variants for consistent motion design

export const slideVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  },
  itemFast: {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  },
  fadeScale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  },
  slideFromLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  },
  slideFromRight: {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  }
};

// Page transition variants with direction awareness
export const pageTransition = {
  initial: (direction: 'next' | 'prev') => ({
    opacity: 0,
    x: direction === 'next' ? 60 : -60,
  }),
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
  },
  exit: (direction: 'next' | 'prev') => ({
    opacity: 0,
    x: direction === 'next' ? -60 : 60,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
  })
};

// Overlay/Modal variants
export const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.2 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.15 }
  }
};

export const drawerVariants = {
  hidden: { x: '100%' },
  visible: { 
    x: 0,
    transition: { type: 'spring', damping: 25, stiffness: 200 }
  },
  exit: { 
    x: '100%',
    transition: { duration: 0.2 }
  }
};

export const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.25, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: { duration: 0.15 }
  }
};

// Counter animation for numbers
export const counterSpring = {
  type: 'spring',
  damping: 30,
  stiffness: 200
};

