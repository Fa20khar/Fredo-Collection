# Product Requirements Document (PRD) — Fredo's Collection

## 1. Executive Summary
**Fredo's Collection** is an elegant, modern, responsive, and professional Pakistani clothing storefront. The brand curates traditional and contemporary attire for both ladies and gents, focusing on unstitched suits, festive embroidered wear, classic Kurta Shalwar, waistcoats, and luxury winter shawls.

## 2. Core Business Details
- **Brand Name**: Fredo's Collection
- **Contact / WhatsApp**: `03051367640` (International: `+92 305 1367640` / URL format: `923051367640`)
- **Email**: `umeryjutt345@gmail.com`
- **Primary Market**: Pakistan (Nationwide)
- **Currency**: Pakistani Rupee (`PKR` / `Rs.`)
- **Shipping Policy**: Flat rate `Rs. 250`, Free Shipping over `Rs. 6,000`
- **Delivery Timeline**: 3–5 Business Days via domestic couriers (TCS, Leopards, Trax)
- **Primary Language**: English (with Urdu toggle support)

## 3. Product Scope & Catalogue
### Ladies Collection:
1. **Unstitched Suits**: 3-piece combed Lawn and Dhanak fabrics with matching dupattas and trouser lengths.
2. **Embroidered Suits**: Resham threadwork and gold tilla work on dyed Dhanak and luxury chiffon.
3. **Ready-to-Wear**: Modern straight-cut kurtis and stitched suits.
4. **Casual Wear**: Daily printed kurtis and breathable summer-winter cottons.
5. **Formal Wear**: Celebratory occasion wear with organza embellishments.
6. **Shawls & Dupattas**: Micro-velvet Palachi shawls (9000 grade) with zardozi borders and Pashmina wraps.

### Gents Collection:
1. **Kurta Shalwar**: Traditional band collar cotton and blended suits in classic cuts.
2. **Men's Unstitched Fabric**: Premium Wash & Wear, Latha, Boski, and Egyptian cotton 4.5m cuts.
3. **Casual Wear**: Minimalist daily short-to-medium length kurtas.
4. **Formal Wear**: Prince coats, structured celebratory ensembles.
5. **Waistcoats**: Tailored raw silk and jacquard waistcoats with contrast buttons.
6. **Winter Collection**: Heavy handloom Kamalia Khaddar and Kashmiri wool chadar wraps.

## 4. Architectural Boundaries (Strictly Frontend-Only)
- **No Backend / Database**: No Node/Express server, MongoDB, PostgreSQL, Firebase, or Supabase.
- **Local Data Files**: All products, categories, collections, and pricing reside in local TypeScript/JavaScript files.
- **Client-Side State**: Cart and Wishlist stored in `localStorage`.
- **Ordering via WhatsApp**: Orders do not charge credit cards online. The frontend checkout form collects customer name, phone, city, address, and compiles a prefilled message sent to WhatsApp (`https://wa.me/923051367640?text=...`) for human confirmation and Cash on Delivery booking.
