"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function BmcWidget() {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  useEffect(() => {
    // If widget button or script already exists, avoid duplicate injection
    if (!document.getElementById("bmc-widget-script")) {
      const script = document.createElement("script");
      script.id = "bmc-widget-script";
      script.setAttribute("data-name", "BMC-Widget");
      script.setAttribute("data-cfasync", "false");
      script.src = "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js";
      script.setAttribute("data-id", "veplexity1");
      script.setAttribute("data-description", "Support me on Buy me a coffee!");
      script.setAttribute(
        "data-message",
        "Help keep VePlexity online & claim your exclusive VIP Discord role! ⚡"
      );
      script.setAttribute("data-color", "#FF5F5F");
      script.setAttribute("data-position", "Right");
      script.setAttribute("data-x_margin", "18");
      script.setAttribute("data-y_margin", "18");
      script.async = true;

      script.onload = () => {
        // widget.prod.min.js registers a window DOMContentLoaded listener.
        // In Next.js client-side execution, DOMContentLoaded has already fired,
        // so dispatch it manually to ensure the widget button and popover initialize.
        if (!document.getElementById("bmc-wbtn")) {
          window.dispatchEvent(new Event("DOMContentLoaded"));
        }
      };

      document.head.appendChild(script);
    }
  }, []);

  // Dynamically toggle widget display based on route:
  // On /dashboard and /dashboard/[guildId], suppress the floating launcher and giant popover
  // so it does NOT block the server configuration cards and module settings.
  useEffect(() => {
    const checkAndToggle = () => {
      const btn = document.getElementById("bmc-wbtn");
      const iframe = document.getElementById("bmc-iframe");
      const closeBtn = document.getElementById("bmc-close-btn");

      if (isDashboard) {
        if (btn) btn.style.setProperty("display", "none", "important");
        if (iframe) iframe.style.setProperty("display", "none", "important");
        if (closeBtn) closeBtn.style.setProperty("display", "none", "important");
      } else {
        if (btn) btn.style.removeProperty("display");
        if (iframe) iframe.style.removeProperty("display");
        if (closeBtn) closeBtn.style.removeProperty("display");
      }
    };

    checkAndToggle();
    const timer = setTimeout(checkAndToggle, 600);
    return () => clearTimeout(timer);
  }, [isDashboard, pathname]);

  return null;
}
