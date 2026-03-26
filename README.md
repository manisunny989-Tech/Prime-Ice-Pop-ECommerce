# Prime Ice Pop E-Commerce

Welcome to the **Prime Ice Pop E-Commerce** storefront! This project is a modern, full-stack Next.js web application designed to deliver a highly interactive, cinematic, and seamless shopping experience for premium hydration products.

## Overview

Prime Ice Pop is an e-commerce platform selling premium bottles/drinks with cinematic scroll animations and a complete shopping cart + order management system. Users can browse products, add them to cart, register/login, and place orders.

## Features

### Core Functionality
- **Product Catalog:** Display of 4 flavor variants (Strawberry Watermelon, Ice Pop, Blue Raspberry, Lemon Lime)
- **Shopping Cart:** Add to cart, quantity management, cart sidebar with real-time updates
- **User Authentication:** 
  - Email & Password registration/login (bcryptjs hashed)
  - Google OAuth integration (@react-oauth/google)
  - JWT session management (jose library)
- **Order Management:**
  - Place orders with items, quantities, and totals
  - View order history in dashboard
  - Order status tracking (pending/completed)

### UI/UX
- **Cinematic Scroll Animations:** Framer Motion for scroll-driven animations
- **Hero Canvas:** 3D-like image sequence effect
- **Traveling Bottle:** Interactive bottle animation
- **Dynamic Backgrounds:** Color transitions based on scroll position
- **Responsive Design:** Tailwind CSS for mobile-first responsive layout

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| UI Library | React 18 |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Database ORM | Prisma |
| Database | Supabase PostgreSQL |
| Authentication | jose (JWT), bcryptjs, Google OAuth |

## Project Structure

```
Prime-Ice-Pop-ECommerce/
├── app/
│   ├── actions/
│   │   └── auth.ts           # Server actions: register, login, logout
│   ├── api/
│   │   └── orders/
│   │       └── route.ts      # Order API: POST (create order), GET (order history)
│   ├── dashboard/
│   │   └── page.tsx          # User dashboard with order history
│   ├── login/
│   │   └── page.tsx          # Login/register page
│   ├── layout.tsx            # Root layout with providers
│   └── page.tsx              # Main landing page
├── components/
│   ├── CartSidebar.tsx       # Shopping cart sidebar
│   ├── HeroCanvas.tsx        # Canvas-based image sequence
│   ├── Navbar.tsx            # Navigation with cart icon
│   ├── OrdersSection.tsx     # Order history display
│   ├── ProductsSection.tsx  # Product grid
│   ├── TextOverlays.tsx      # Scroll-triggered text
│   └── TravelingBottle.tsx  # Animated bottle component
├── lib/
│   ├── auth.ts               # JWT sign/verify, getUser helper
│   ├── CartContext.tsx       # React Context for cart state
│   └── prisma.ts             # Prisma client singleton
├── prisma/
│   └── schema.prisma         # Database schema (User, Order, OrderItem)
├── data/
│   └── product.ts            # Static product data (hardcoded)
└── public/
    └── images/                # Static images and sequence frames
```

## Database Schema

The application uses three main models in Prisma:

### User
| Field | Type | Description |
|-------|------|-------------|
| id | String (cuid) | Primary key |
| email | String | Unique email |
| password | String? | Hashed password (nullable for OAuth users) |
| name | String? | Display name |
| image | String? | Profile image URL |
| googleId | String? | Google OAuth unique ID |
| createdAt | DateTime | Account creation timestamp |

### Order
| Field | Type | Description |
|-------|------|-------------|
| id | String (cuid) | Primary key |
| userId | String | Foreign key to User |
| total | Float | Order total amount |
| status | String | Order status (default: "pending") |
| createdAt | DateTime | Order creation timestamp |
| updatedAt | DateTime | Last update timestamp |

### OrderItem
| Field | Type | Description |
|-------|------|-------------|
| id | String (cuid) | Primary key |
| orderId | String | Foreign key to Order |
| productId | String | Product identifier |
| name | Product | Product name |
| price | Float | Unit price |
| quantity | Int | Quantity ordered |
| color | String | Selected color variant |

**Note:** Products are stored in `data/product.ts` as static data, not in the database.

## Environment Variables

Create a `.env` file with the following variables:

```env
# Google OAuth - Get from Google Cloud Console
NEXT_PUBLIC_GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# JWT Secret - Generate a secure random string
JWT_SECRET="your-secure-jwt-secret-min-32-chars"

# Database - Supabase PostgreSQL connection
DATABASE_URL="postgresql://user:password@host:port/database?pgbouncer=true"
DIRECT_URL="postgresql://user:password@host:port/database"
```

See `.env.example` for the template.

## Getting Started

### 1. Prerequisites
- Node.js v18+
- npm or yarn
- Supabase account (or PostgreSQL database)

### 2. Installation
```bash
npm install
```

### 3. Environment Setup
```bash
cp .env.example .env
# Edit .env with your actual credentials
```

### 4. Database Setup
```bash
npx prisma generate
npx prisma db push
```

### 5. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## API Endpoints

### POST /api/orders
Create a new order. Requires authentication.

**Request Body:**
```json
{
  "items": [
    { "id": "prime-strawberry-watermelon", "name": "Strawberry Watermelon", "price": 20, "quantity": 2, "color": "#E22668" }
  ],
  "total": 40
}
```

**Response:**
```json
{ "success": true, "orderId": "cuid...", "message": "Order placed successfully" }
```

### GET /api/orders
Fetch user's order history. Requires authentication.

**Response:**
```json
{ "orders": [{ "id": "...", "total": 40, "status": "completed", "items": [...] }] }
```

## Security Considerations

- **Password Hashing:** All passwords are hashed using bcryptjs (10 salt rounds)
- **JWT Sessions:** HTTP-only cookies with 7-day expiration
- **Auth Guards:** API routes validate user authentication before processing
- **Input Validation:** Server actions validate email/password before processing

## Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deployment Platforms
Recommended platforms:
- **Vercel** (optimized for Next.js)
- **Railway** (PostgreSQL + Node.js)
- **Supabase** (Database + Hosting)

## License

This project is for demonstration and developmental purposes.
