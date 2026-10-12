# Project Memory & Knowledge Bank — Fredo's Collection

## 1. Brand Identity & Contact Baseline
- **Brand Title**: Fredo's Collection
- **Contact Phone / WhatsApp**: `03051367640`
- **WhatsApp Web / API Link**: `https://wa.me/923051367640`
- **Official Email**: `umeryjutt345@gmail.com`
- **Region**: Lahore, Punjab, Pakistan
- **Currency**: `PKR` (formatted as `Rs. X,XXX`)
- **Default Delivery Fee**: `Rs. 250` (Free on orders above `Rs. 6,000`)
- **Delivery Window**: 3–5 Business Days nationwide

## 2. Technical Stack Decisions
- **Framework**: React 19 + Vite 8 + TypeScript.
- **Styling**: Tailwind CSS v4 with custom theme tokens (`--color-emerald-deep: #173D32`, `--color-gold-champagne: #C6A36A`).
- **Icons**: `lucide-react`.
- **Routing**: `react-router-dom` (SPA routing with URL query param support for filters).
- **Architecture**: **Strictly Frontend-Only**. No backend server, no database, no external payment processors. Local state managed via React Context (`CartContext`, `WishlistContext`, `LanguageContext`) and persisted in `localStorage`.

## 3. Key Design Decisions
- **Typography Pairing**: `Playfair Display` for brand titles and hero headlines + `Plus Jakarta Sans` for body copy.
- **Anti-Slop Compliance**: Unboxed metadata without rounded pill tags, 3-zone Top Bar Contract in Navbar, measured dark-gradient scrims on photo banners.
- **WhatsApp Order Flow**: Collects customer details (Name, Phone, City, Address) and constructs a prefilled encoded message before opening `wa.me/923051367640`. Clearly informs customers that sending the WhatsApp message is required to confirm the order with the merchant.
