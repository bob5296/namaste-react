# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Commands

```bash
# Start dev server (Parcel)
npm start

# Production build
npm build

# Run tests
npm test
```

## Backend Dependency

The app fetches data from a local API server at `http://localhost:5001`. Endpoints used:
- `GET /Restaurants` - List all restaurants
- `GET /restaurants/:id` - Get restaurant menu by ID

Start the backend server before running the app, or the Body component will show an error state.

## Architecture

**Stack**: React 19 + Parcel bundler + Redux Toolkit + React Router v6

### Entry Point
- `index.html` → `App.js` (renders `<App />` into `#root`)

### Routing Structure
```
/               → Body (restaurant list)
/profile        → Profile (lazy loaded)
/about          → AboutClass (class component)
/restaurant/:Id → RestaurantMenu
```

All routes are wrapped in `AppLayout` which provides `Header` and `Footer`. Child routes render via `<Outlet />`.

### State Management
- **Redux store** (`appStore.jsx`): Single `app` slice with `loggedInUser` and `cartItems`
- **Actions** (`appSlice.jsx`): `setLoggedInUser`, `clearUser`, `setCartItem`, `clearCart`
- **Local state**: Components use `useState` for UI state (search, loading, expanded categories)

### Custom Hooks
- `useRestaurantMenu(Id)` - Fetches restaurant menu with loading/error states and AbortController cleanup

### Higher-Order Components
- `withPromotedLabel` (`utils/HOC/`) - Wraps `RestaurantCard` to add a "Promoted" label for promoted restaurants

### Class Components
`components/classComponents/` contains class-based examples (`AboutClass`, `UserClass`) demonstrating lifecycle methods. These fetch from GitHub API.
