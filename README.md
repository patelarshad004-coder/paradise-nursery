# Paradise Nursery

Paradise Nursery is an online plant shop built with React and Redux Toolkit. Browse houseplants by category, add them to your cart, adjust quantities, and see your running total.

## Features
- Landing page with a "Get Started" button and an About Us section
- 18 houseplants across 3 categories (Air Purifying, Low Light, Pet Friendly)
- "Add to Cart" buttons that disable once a plant is in the cart
- Navbar on the Plants and Cart pages (Home, Plants, Cart) with a live cart count
- Cart page with per-plant subtotal, overall total, quantity +/- and delete
- Checkout button showing "Coming Soon"; "Continue Shopping" returns to the plant list

## Tech stack
React (Vite), Redux Toolkit, react-redux

## Run locally
```bash
npm create vite@latest paradise-nursery -- --template react
cd paradise-nursery
npm install @reduxjs/toolkit react-redux
# copy the files from this repo's src/ folder
npm run dev
```
