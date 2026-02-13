import { useCallback } from 'react';

const useSmoothScroll = () => {
  const scrollTo = useCallback((targetId) => {
    const element = document.querySelector(targetId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  }, []);

  const handleAnchorClick = useCallback(
    (e, href) => {
      e.preventDefault();
      scrollTo(href);
    },
    [scrollTo]
  );

  return { scrollTo, handleAnchorClick };
};

export default useSmoothScroll;