import { useState, useEffect } from "react";

/**
 * Custom hook to detect if the user is on a mobile device
 * @returns boolean indicating if the user is on mobile
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      // Check screen width first (most reliable)
      const screenWidth = window.innerWidth;
      const isSmallScreen = screenWidth < 768; // Tailwind's md breakpoint

      // Check user agent for mobile devices
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = [
        "mobile",
        "android",
        "iphone",
        "ipad",
        "ipod",
        "blackberry",
        "windows phone",
        "webos",
      ];

      const isMobileUserAgent = mobileKeywords.some((keyword) =>
        userAgent.includes(keyword)
      );

      // Check for touch capability
      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;

      // Combine all checks - prioritize screen width
      const mobile = isSmallScreen || (isMobileUserAgent && isTouchDevice);

      setIsMobile(mobile);
    };

    // Check on mount
    checkIsMobile();

    // Listen for resize events
    window.addEventListener("resize", checkIsMobile);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  return isMobile;
}
