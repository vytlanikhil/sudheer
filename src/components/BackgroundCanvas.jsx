import React, { useEffect, useRef } from 'react';

export default function BackgroundCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Create 18 floating Teddy Bears
    const teddies = Array.from({ length: 18 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 16 + 20, // font size for emoji
      speedY: Math.random() * 0.4 + 0.2,
      speedX: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.6 + 0.3,
      rotation: (Math.random() - 0.5) * 20,
      rotSpeed: (Math.random() - 0.5) * 0.2
    }));

    // Create 30 floating Hearts & Sparkles
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      type: Math.random() > 0.4 ? '❤️' : '✨',
      size: Math.random() * 12 + 10,
      speedY: Math.random() * 0.5 + 0.3,
      speedX: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.7 + 0.2
    }));

    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Soft pastel baby pink background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#FFF5F8');
      bgGrad.addColorStop(0.5, '#FFE4EC');
      bgGrad.addColorStop(1, '#FFD8E4');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Soft floating glowing circles
      ctx.save();
      const glow1 = ctx.createRadialGradient(width * 0.3, height * 0.3, 0, width * 0.3, height * 0.3, 200);
      glow1.addColorStop(0, 'rgba(255, 182, 193, 0.4)');
      glow1.addColorStop(1, 'transparent');
      ctx.fillStyle = glow1;
      ctx.fillRect(0, 0, width, height);

      const glow2 = ctx.createRadialGradient(width * 0.7, height * 0.7, 0, width * 0.7, height * 0.7, 250);
      glow2.addColorStop(0, 'rgba(255, 105, 180, 0.25)');
      glow2.addColorStop(1, 'transparent');
      ctx.fillStyle = glow2;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // Draw floating Hearts & Sparkles
      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += Math.sin(tick * 0.02 + p.size) * p.speedX;

        if (p.y < -30) {
          p.y = height + 30;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.font = `${p.size}px sans-serif`;
        ctx.fillText(p.type, p.x, p.y);
        ctx.restore();
      });

      // Draw floating Teddy Bears
      teddies.forEach((t) => {
        t.y -= t.speedY;
        t.x += Math.sin(tick * 0.015 + t.size) * t.speedX;
        t.rotation += t.rotSpeed;

        if (t.y < -40) {
          t.y = height + 40;
          t.x = Math.random() * width;
        }

        ctx.save();
        ctx.globalAlpha = t.alpha;
        ctx.translate(t.x, t.y);
        ctx.rotate((t.rotation * Math.PI) / 180);
        ctx.font = `${t.size}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🧸', 0, 0);
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
