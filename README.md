# ShopEase — Simple MERN E-Commerce Store

A complete, production-ready e-commerce app built with **MongoDB, Express, React (Vite), and Node.js**. Includes JWT authentication, product catalog with search & filters, persistent cart, checkout with order history, and a modern responsive UI.

## Tech Stack

- **Frontend:** React 18 + Vite, React Router, Axios, React Hot Toast
- **Backend:** Node.js, Express, Mongoose, JWT, bcryptjs, express-validator
- **Database:** MongoDB (local or Atlas)

## Project Structure

```
mern-shop/
├── backend/
│   ├── config/db.js
│   ├── controllers/        # auth, product, cart, order
│   ├── middleware/         # JWT auth, error handler
│   ├── models/             # User, Product, Order (Mongoose)
│   ├── routes/             # /api/auth, /api/products, /api/cart, /api/orders
│   ├── seed/seed.js        # sample data
│   ├── utils/generateToken.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── .env.example
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── components/     # Navbar, Footer, ProductCard, ProtectedRoute
        ├── context/        # AuthContext, CartContext
        ├── pages/          # Home, Products, ProductDetails, Cart, Checkout,
        │                   # Login, Register, Profile, Orders, NotFound
        ├── services/api.js
        └── styles/index.css
```

## Prerequisites

- **Node.js 18+** and **npm**
- **MongoDB** running locally (`mongodb://127.0.0.1:27017`) OR a free **MongoDB Atlas** connection string

## 1. Installation

Open **two terminals** — one for backend, one for frontend.

### Backend
```bash
cd backend
npm install
cp .env.example .env       # then edit .env (set MONGO_URI and JWT_SECRET)
npm run seed               # populates sample products + demo users
npm run dev                # starts API on http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env       # default points to http://localhost:5000/api
npm run dev                # starts UI on http://localhost:5173
```

Open **http://localhost:5173** in your browser.

## 2. Environment Variables

### `backend/.env`
| Var | Example | Notes |
|---|---|---|
| `PORT` | `5000` | API port |
| `MONGO_URI` | `mongodb://127.0.0.1:27017/ecommerce` | Or your Atlas URI |
| `JWT_SECRET` | `any_long_random_string` | Required, keep secret |
| `JWT_EXPIRES_IN` | `7d` | Token lifetime |
| `CLIENT_URL` | `http://localhost:5173` | For CORS |

### `frontend/.env`
| Var | Example |
|---|---|
| `VITE_API_URL` | `http://localhost:5000/api` |

## 3. Demo Credentials (after `npm run seed`)

| Role | Email | Password |
|---|---|---|
| Admin | `admin@shop.com` | `admin123` |
| User | `user@shop.com` | `user123` |

## 4. API Documentation

Base URL: `http://localhost:5000/api`

### Auth
| Method | Endpoint | Auth | Body |
|---|---|---|---|
| POST | `/auth/register` | — | `{ name, email, password }` |
| POST | `/auth/login` | — | `{ email, password }` |
| GET | `/auth/me` | Bearer | — |

### Products
| Method | Endpoint | Auth | Notes |
|---|---|---|---|
| GET | `/products?q=&category=&min=&max=` | — | List + filter/search |
| GET | `/products/:id` | — | Details |
| POST | `/products` | Admin | Create |
| PUT | `/products/:id` | Admin | Update |
| DELETE | `/products/:id` | Admin | Delete |

### Cart (all require Bearer token)
| Method | Endpoint | Body |
|---|---|---|
| GET | `/cart` | — |
| POST | `/cart/add` | `{ productId, quantity }` |
| PUT | `/cart/update` | `{ productId, quantity }` |
| DELETE | `/cart/remove` | `{ productId }` |

### Orders (Bearer)
| Method | Endpoint | Body |
|---|---|---|
| POST | `/orders` | `{ shippingAddress }` |
| GET | `/orders/user` | — |
| GET | `/orders/:id` | — |

Send the JWT as `Authorization: Bearer <token>`.

## 5. Testing the App (manual)

1. Visit `/register` → create an account (or login with demo).
2. Browse `/products`, use search & category filter.
3. Click a product → **Add to cart**.
4. Open `/cart` → adjust quantities, see live total.
5. Click **Checkout** → fill shipping form → **Place Order**.
6. Visit `/orders` to see order history with status.
7. Logout and back in — auth persists via JWT in localStorage.

## 6. Deployment

### Backend → Render / Railway
1. Push repo to GitHub.
2. Create a Web Service from `backend/`.
3. Build command: `npm install`. Start: `npm start`.
4. Set env vars: `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL` (frontend URL).
5. Use MongoDB Atlas for production DB.

### Frontend → Vercel / Netlify
1. Build command: `npm run build` from `frontend/`.
2. Output dir: `dist`.
3. Env var: `VITE_API_URL=https://<your-backend>.onrender.com/api`.

## 7. Security Notes

- Passwords hashed with **bcryptjs** (10 rounds).
- JWT signed with `JWT_SECRET`; verified on every protected route.
- `express-validator` enforces input shape on auth.
- CORS restricted to `CLIENT_URL`.
- Admin role required for product mutations.

## License

MIT
