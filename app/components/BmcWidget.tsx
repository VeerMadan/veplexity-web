"use client";

import { useEffect } from "react";

export default function BmcWidget() {
  useEffect(() => {
    // Prevent duplicate injections
    if (document.getElementById("bmc-widget-script")) return;

    const script = document.createElement("script");
    script.id = "bmc-widget-script";
    script.setAttribute("data-name", "BMC-Widget");
    script.setAttribute("data-cfasync", "false");
    script.src = "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js";
    script.setAttribute("data-id", "veplexity1");
    script.setAttribute("data-description", "Support VePlexity on Buy me a coffee!");
    script.setAttribute(
      "data-message",
      "Support 24/7 audio nodes & unlock VIP perks on Discord! ☕"
    );
    script.setAttribute("data-color", "#FF5E5B");
    script.setAttribute("data-position", "Right");
    script.setAttribute("data-x_margin", "18");
    script.setAttribute("data-y_margin", "18");
    script.async = true;

    document.body.appendChild(script);

    return () => {
      // Cleanup widget container if necessary on unmount
      const existingScript = document.getElementById("bmc-widget-script");
      if (existingScript) existingScript.remove();
      const bmcContainer = document.getElementById("bmc-wbtn");
      if (bmcContainer) bmcContainer.remove();
    };
  }, []);

  return null;
}
