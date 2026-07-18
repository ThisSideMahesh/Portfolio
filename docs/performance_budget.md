# Performance Budget

This document establishes the performance parameters that must be measured and validated before every release.

---

## 1. Web Vitals Targets
*   **LCP (Largest Contentful Paint):** < 2.0 seconds.
*   **CLS (Cumulative Layout Shift):** < 0.05.
*   **INP (Interaction to Next Paint):** < 200 ms.
*   **TTFB (Time to First Byte):** < 0.8 seconds.

## 2. Asset Constraints
*   **First Load JS Shared Budget:** < 150 KB.
*   **Image assets:** Always specify `sizes` or wrap with next/image optimization tags.
*   **Fonts:** Max 2 network requests. Preload primary font headings in the layout.
