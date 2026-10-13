"use client";

import { useEffect } from "react";

export default function BmcWidget() {
  useEffect(() => {
    // If widget script or button already exists, prevent duplicate injections
    if (document.getElementById("bmc-widget-script")) return;

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
    script.setAttribute("data-x_margin", "20");
    script.setAttribute("data-y_margin", "20");
    script.async = true;

    script.onload = () => {
      // Because widget.prod.min.js registers a window DOMContentLoaded listener,
      // dispatch it manually if DOMContentLoaded already passed during client hydration.
      if (!document.getElementById("bmc-wbtn")) {
        window.dispatchEvent(new Event("DOMContentLoaded"));
      }
    };

    document.head.appendChild(script);
  }, []);

  return null;
}
