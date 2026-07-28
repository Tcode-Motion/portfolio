export const registerPwaServiceWorker = () => {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then(() => {
          // Service worker registered cleanly
        })
        .catch(() => {
          // Graceful fallback if offline worker fails
        });
    });
  }
};
