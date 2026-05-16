"use client";

import { useEffect } from "react";

const activeTargets = [
  ".message",
  ".service-row",
  ".origin",
  ".group",
  ".group-card",
  ".company-hero",
  ".company-profile",
  ".footer",
].join(", ");

export default function MobileScrollEffects() {
  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 900px)");
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!mobileQuery.matches || reduceMotionQuery.matches) {
      return;
    }

    const root = document.documentElement;
    document.body.classList.add("mobile-motion-ready");

    let frameId = 0;
    const updateProgress = () => {
      const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(window.scrollY / scrollable, 0), 1);
      root.style.setProperty("--mobile-scroll", progress.toFixed(4));
      root.style.setProperty("--mobile-drift", `${Math.sin(progress * Math.PI * 2) * 18}px`);
    };

    const requestProgressUpdate = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateProgress);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-mobile-active", entry.isIntersecting);
        });
      },
      {
        rootMargin: "-18% 0px -18% 0px",
        threshold: 0.12,
      },
    );

    const targets = Array.from(document.querySelectorAll(activeTargets));
    targets.forEach((target) => observer.observe(target));
    updateProgress();
    window.addEventListener("scroll", requestProgressUpdate, { passive: true });
    window.addEventListener("resize", requestProgressUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestProgressUpdate);
      window.removeEventListener("resize", requestProgressUpdate);
      observer.disconnect();
      document.body.classList.remove("mobile-motion-ready");
      root.style.removeProperty("--mobile-scroll");
      root.style.removeProperty("--mobile-drift");
    };
  }, []);

  return (
    <div className="mobile-scroll-fx" aria-hidden="true">
      <span className="mobile-scroll-fx__rail">
        <span className="mobile-scroll-fx__bar" />
        <span className="mobile-scroll-fx__orb" />
      </span>
    </div>
  );
}
