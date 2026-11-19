import React, { useEffect, useRef } from 'react';

export const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes representing a neural field
    const nodeCount = Math.min(Math.floor((width * height) / 22000), 65);
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.5 + 1,
      phase: Math.random() * Math.PI * 2,
    }));

    let mouse = { x: -2000, y: -2000, targetX: -2000, targetY: -2000 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;
    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse follow with inertia
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Soft mouse aura
      if (mouse.x > 0 && mouse.y > 0) {
        const aura = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 280);
        aura.addColorStop(0, 'rgba(0, 229, 255, 0.045)');
        aura.addColorStop(0.5, 'rgba(0, 229, 255, 0.01)');
        aura.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = aura;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw subtle neural connection filaments
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.14;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(161, 161, 166, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        // Mouse interaction: filaments and soft repulsive flow
        const mdx = a.x - mouse.x;
        const mdy = a.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 180) {
          const factor = (1 - mdist / 180);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(0, 229, 255, ${factor * 0.22})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();

          // Gentle displacement
          a.x += (mdx / mdist) * factor * 0.6;
          a.y += (mdy / mdist) * factor * 0.6;
        }

        // Update physics
        a.x += a.vx + Math.sin(time + a.phase) * 0.15;
        a.y += a.vy + Math.cos(time + a.phase) * 0.15;

        // Wrap around viewport edges smoothly
        if (a.x < -10) a.x = width + 10;
        if (a.x > width + 10) a.x = -10;
        if (a.y < -10) a.y = height + 10;
        if (a.y > height + 10) a.y = -10;

        // Render node dot
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(237, 237, 237, 0.4)';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
    />
  );
};
