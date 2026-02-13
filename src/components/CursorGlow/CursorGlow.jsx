import React, { useEffect, useRef } from 'react';
import './CursorGlow.css';

const CursorGlow = () => {
  const glowRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const glow = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const animate = () => {
      glow.current.x += (mouse.current.x - glow.current.x) * 0.08;
      glow.current.y += (mouse.current.y - glow.current.y) * 0.08;

      if (glowRef.current) {
        glowRef.current.style.left = `${glow.current.x}px`;
        glowRef.current.style.top = `${glow.current.y}px`;
      }

      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    const animationId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <div className="cursor-glow" ref={glowRef} />;
};

export default CursorGlow;