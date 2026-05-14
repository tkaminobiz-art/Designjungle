"use client";

import { useEffect, useRef } from "react";

type Ripple = {
  x: number;
  y: number;
  radius: number;
  life: number;
  phase: number;
};

export default function LiquidCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!finePointer || reduceMotion) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const ripples: Ripple[] = [];
    const cursor = { x: window.innerWidth / 2, y: window.innerHeight / 2, active: false };
    let animationId = 0;
    let lastRippleAt = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const addRipple = (x: number, y: number) => {
      ripples.push({
        x,
        y,
        radius: 8,
        life: 1,
        phase: Math.random() * Math.PI * 2,
      });

      if (ripples.length > 26) {
        ripples.shift();
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      cursor.x += (event.clientX - cursor.x) * 0.42;
      cursor.y += (event.clientY - cursor.y) * 0.42;
      cursor.active = true;

      const now = performance.now();
      if (now - lastRippleAt > 36) {
        addRipple(event.clientX, event.clientY);
        lastRippleAt = now;
      }
    };

    const handlePointerLeave = () => {
      cursor.active = false;
    };

    const render = () => {
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";

      if (cursor.active) {
        const gradient = context.createRadialGradient(cursor.x, cursor.y, 0, cursor.x, cursor.y, 95);
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.12)");
        gradient.addColorStop(0.34, "rgba(214, 225, 45, 0.09)");
        gradient.addColorStop(1, "rgba(214, 225, 45, 0)");
        context.fillStyle = gradient;
        context.beginPath();
        context.ellipse(cursor.x, cursor.y, 95, 58, -0.35, 0, Math.PI * 2);
        context.fill();
      }

      for (let index = ripples.length - 1; index >= 0; index -= 1) {
        const ripple = ripples[index];
        const alpha = Math.max(ripple.life, 0);
        const wobble = Math.sin(ripple.phase + ripple.radius * 0.05) * 0.12;

        context.lineWidth = 1.3;
        context.strokeStyle = `rgba(214, 225, 45, ${alpha * 0.18})`;
        context.beginPath();
        context.ellipse(ripple.x, ripple.y, ripple.radius * (1 + wobble), ripple.radius * (0.58 - wobble), ripple.phase, 0, Math.PI * 2);
        context.stroke();

        context.lineWidth = 0.85;
        context.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.16})`;
        context.beginPath();
        context.ellipse(ripple.x, ripple.y, ripple.radius * 0.62, ripple.radius * 0.38, ripple.phase + 0.7, 0, Math.PI * 2);
        context.stroke();

        ripple.radius += 3.15;
        ripple.life -= 0.024;

        if (ripple.life <= 0) {
          ripples.splice(index, 1);
        }
      }

      context.globalCompositeOperation = "source-over";
      animationId = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    animationId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return <canvas className="liquid-cursor" ref={canvasRef} aria-hidden="true" />;
}
