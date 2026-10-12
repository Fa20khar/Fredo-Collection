# Architecture Document — Fredo's Collection

## 1. High-Level Technical Architecture
The application is structured as a **Pure Frontend React Single Page Application (SPA)** built with Vite, TypeScript, and Tailwind CSS.

```
                    ┌─────────────────────────┐
                    │     Vite React SPA      │
                    └────────────┬────────────┘
                                 │
     ┌───────────────────────────┼───────────────────────────┐
     │                           │                           │
┌────▼─────────────┐    ┌────────▼─────────┐    ┌────────────▼─────────────┐
│  React Router    │    │  React Contexts  │    │  Static Data Layer       │
│  (Page Routing)  │    │  (Cart, Wishlist │    │  (products.ts,           │
│                  │    │   Language)      │    │   categories.ts,         │
└──────────────────┘    └────────┬─────────┘    │   config.ts)             │
                                 │              └──────────────────────────┘
                        ┌────────▼─────────┐
                        │   Browser        │
                        │   localStorage   │
                        └──────────────────┘
                                 │
                        ┌────────▼─────────┐
                        │  WhatsApp API    │
                        │  (wa.me URL)     │
                        └──────────────────┘
```

## 2. Directory Structure
```
src/
├── assets/images/          # High-fidelity fashion photography assets
├── components/
│   ├── AnnouncementBar.tsx # Top editable ribbon with contact and language toggle
│   ├── Navbar.tsx          # Sticky 3-zone top bar contract with search & drawers
│   ├── Hero.tsx            # High-contrast editorial hero section
│   ├── ShopByCategory.tsx  # Interactive Ladies/Gents category selector
│   ├── FeaturedCollections.tsx # Curated thematic cards
│   ├── ProductCard.tsx     # Reusable product card with hover states
│   ├── ProductGrid.tsx     # Responsive grid container
│   ├── QuickViewModal.tsx  # Fast-modal for size selection & quick ordering
│   ├── CartDrawer.tsx      # Slide-out bag with free shipping tracker
│   ├── WhatsAppOrderModal.tsx # Checkout form + prefilled WhatsApp generator
│   ├── WhatsAppFloatingButton.tsx # Fixed bottom-right customer support button
│   ├── NewsletterSection.tsx # Email subscription demonstration
│   ├── Footer.tsx          # 4-column footer with policy modals
│   └── ScrollToTop.tsx     # Route transition scroll restoration
├── context/
│   ├── CartContext.tsx     # Cart state, item math, delivery fee, localStorage
│   ├── WishlistContext.tsx # Wishlist toggle, localStorage persistence
│   └── LanguageContext.tsx # English / Urdu locale management
├── data/
│   ├── config.ts           # Store phone, WhatsApp, email, announcements
│   ├── products.ts         # Inventory catalogue (12+ Pakistani garments)
│   ├── categories.ts       # Ladies & Gents taxonomy
│   └── collections.ts      # Thematic curated collections
├── pages/
│   ├── Home.tsx            # Brand landing page
│   ├── Shop.tsx            # Filterable product catalogue
│   ├── ProductDetails.tsx  # Full product showcase, size validation, specs
│   ├── CartPage.tsx        # Full cart & delivery details checkout
│   ├── WishlistPage.tsx    # Saved items collection
│   ├── About.tsx           # Brand story & fashion philosophy
│   ├── Contact.tsx         # Contact info & message dispatcher
│   └── NotFound.tsx        # 404 error page
├── utils/
│   ├── currency.ts         # PKR currency formatter (Rs. X,XXX)
│   └── whatsapp.ts         # wa.me dynamic URL constructor
├── App.tsx                 # Root layout & route provider tree
├── main.tsx                # React DOM entrypoint
└── index.css               # Tailwind theme tokens & font bindings
```

## 3. State Management
- **CartContext**: Manages active bag items, quantities, selected sizes/colors, subtotal, shipping calculation (free over Rs. 6,000, otherwise Rs. 250), and syncs to `localStorage` key `fredos_collection_cart_v1`.
- **WishlistContext**: Stores an array of favorited product IDs in `localStorage` under `fredos_collection_wishlist_v1`.
- **LanguageContext**: Toggles between English (`en`) and Urdu (`ur`), setting `dir="rtl"` on `<html>` when Urdu is active.

## 4. WhatsApp Ordering Flow
1. User adds garments to cart selecting required size.
2. User proceeds to WhatsApp Checkout.
3. User enters Full Name, Phone Number, City, Delivery Address, and optional Notes.
4. Client validates required fields.
5. System builds a formatted text message with itemized pricing, subtotal, and estimated delivery fee.
6. System invokes `https://wa.me/923051367640?text=ENCODED_MESSAGE`.
7. WhatsApp opens in the user's browser/app with the message ready to send.
