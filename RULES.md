# Rules & Constraints — Fredo's Collection

## 1. Non-Negotiable Constraints
1. **Frontend-Only Architecture**:
   - Absolutely **NO** Node/Express backend APIs, database connections (MongoDB, Postgres, Firebase Firestore, Supabase), or server-side authentication.
   - All catalogues, products, categories, and settings must be stored in local TypeScript data files (`src/data/`).
   - State persistence is strictly client-side via browser `localStorage`.

2. **No Mock Payments / False Checkout Confirmation**:
   - Do **NOT** integrate Stripe, PayPal, or pretend an online payment was completed.
   - All orders are confirmed via the official WhatsApp ordering flow using `https://wa.me/923051367640?text=ENCODED_MESSAGE`.
   - The user interface must never display an order as "paid" or "automatically dispatched" without real human confirmation via WhatsApp.

3. **Brand Identity Integrity**:
   - Always display **Fredo's Collection** with proper capitalization.
   - Official Phone / WhatsApp: `03051367640` (in URLs: `923051367640`).
   - Official Email: `umeryjutt345@gmail.com`.
   - Currency: Pakistani Rupees (`Rs.` / `PKR`). All price displays must be formatted using the `formatPKR` utility.

4. **Size Validation Requirement**:
   - Clothing items with multiple sizes must enforce size selection. If a customer tries to add an item without choosing a required size, display a clear validation message.

5. **Responsive & Mobile Viewport Rules**:
   - Must support viewports from 375px up to 1440px desktop.
   - Floating WhatsApp button must have safe offsets so it does not block navigation or drawer controls.
