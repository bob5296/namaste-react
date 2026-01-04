# React Routing Interview Q&A

## Basic Routing Concepts

**Q: What is React Router and why do we use it?**
A: React Router is a library for handling client-side routing in React applications. It allows navigation between different components without full page reloads, making the app behave like a Single Page Application (SPA).

**Q: What's the difference between client-side and server-side routing?**
A: 
- **Client-side routing**: Navigation handled by JavaScript, no server requests for new pages, faster transitions
- **Server-side routing**: Each route change sends a request to server for a new HTML page, causes full page reload

**Q: What is BrowserRouter and what does it provide?**
A: BrowserRouter is the main router component that:
- Wraps your app in Router Context
- Listens to browser's History API (window.history)
- Tracks current URL path
- Provides routing functionality to all child components
- Knows current URL, base URL, and current path

## Core Components

**Q: How does the Link component work differently from anchor tags?**
A: Link component:
- Prevents default browser navigation (no full page reload)
- Uses History API to update URL: `window.history.pushState(null, '', '/new-path')`
- Maintains SPA behavior by only changing components
- Anchor tags cause full page reload and lose React state

**Q: How exactly does pushState() work?**
A: `window.history.pushState(state, title, url)` takes 3 parameters:
- **state**: Data to store with history entry (usually null)
- **title**: Page title (ignored by most browsers, use empty string)
- **url**: New URL to display in address bar

Example: `window.history.pushState(null, '', '/profile')` changes URL to `/profile` without page reload

**Q: What is the Outlet component and how does it work?**
A: Outlet is a placeholder that renders the matched child route component. It:
- Gets current route match from React Router context
- Finds which child route matches current path
- Renders the matched component in place of `<Outlet />`
- Only replaces the outlet content, not the entire app

**Q: Explain the Routes and Route components.**
A: 
- **Routes**: Container that holds all route definitions and handles path matching
- **Route**: Defines a single route with path and element to render
- Routes uses hierarchical matching (parent → child)
- We can have multiple Route inside Routes. But only one BrowserRouter and only one base url.

## Route Matching Process

**Q: How does React Router match routes when URL changes?**
A: 
1. BrowserRouter detects URL change via History API
2. Routes component gets current path from `window.location.pathname`
3. Matches current path against route configuration
4. Finds parent route first, then child routes
5. Outlet renders the matched child component

**Q: What happens when you click a Link component?**
A: 
1. Link prevents default browser navigation
2. Calls `window.history.pushState()` to update URL
3. BrowserRouter detects URL change
4. Routes re-renders and matches new path
5. Outlet renders new component
6. Only the outlet content changes, not entire app

## Dynamic Routing

**Q: How do you implement dynamic routing with parameters?**
A: 
```jsx
// Route definition
<Route path="restaurant/:id" element={<RestaurantMenu />} />

// Link to dynamic route
<Link to={`/restaurant/${restaurantId}`}>Restaurant Name</Link>
```

**Q: How do you access route parameters in a component?**
A: Use the `useParams` hook:
```jsx
import { useParams } from 'react-router-dom';

const RestaurantMenu = () => {
    const { id } = useParams(); // Gets the :id from URL
    
    useEffect(() => {
        // Use id to fetch restaurant-specific data
        fetchRestaurantData(id);
    }, [id]);
};
```

**Q: How would you implement restaurant-specific pages?**
A: 
1. **Route Setup**: `<Route path="restaurant/:id" element={<RestaurantMenu />} />`
2. **Navigation**: `<Link to={`/restaurant/${restaurant.id}`}>View Menu</Link>`
3. **Component**: Use `useParams()` to get ID and `useEffect()` to fetch data
4. **Data Fetching**: Make API call with the restaurant ID

## Nested Routing

**Q: How do nested routes work in React Router?**
A: 
```jsx
<Route path="/" element={<AppLayout />}>
    <Route index element={<Body />} />           // matches "/"
    <Route path="profile" element={<Profile />} /> // matches "/profile"
</Route>
```
- Parent route renders `<AppLayout />`
- Child routes render inside `<Outlet />` within AppLayout
- `index` route is the default child route

**Q: What's the purpose of the index route?**
A: Index route is the default child route that renders when you're at the parent path exactly. It's equivalent to having a route with the same path as parent.

## Browser APIs

**Q: What browser APIs does React Router use?**
A: 
- **History API**: `window.history.pushState()` for URL updates
- **Location API**: `window.location.pathname` for current path
- **PopState Event**: Listens for back/forward button clicks

**Q: Why does React Router need to listen to window.history API?**
A: React Router listens to History API to handle these scenarios:
1. **Back/Forward buttons**: When user clicks browser back/forward, `popstate` event fires
2. **Direct URL changes**: When user types URL directly in address bar
3. **Bookmark navigation**: When user navigates via bookmarks
4. **External links**: When user comes from external sites

Without listening to History API, React Router wouldn't know about these navigation events and components wouldn't update to match the new URL.

**Q: What happens if React Router doesn't listen to History API?**
A: 
- Back/forward buttons wouldn't work (URL changes but components don't update)
- Direct URL entry wouldn't render correct component
- App would be out of sync with browser URL
- User would see wrong content for the current URL

**Q: How does React Router prevent full page reloads?**
A: 
1. Link component calls `e.preventDefault()` on click
2. Uses `window.history.pushState()` to update URL
3. Notifies React Router of URL change via internal event system
4. Only re-renders affected components, not entire page

**Q: What's the difference between pushState() and regular navigation?**
A: 
- **pushState()**: Updates URL without page reload, adds entry to browser history
- **Regular navigation**: Sends HTTP request to server, causes full page reload
- **replaceState()**: Updates URL without page reload, replaces current history entry

## Hooks and Advanced Features

**Q: What are the main React Router hooks?**
A: 
- **useParams**: Access route parameters
- **useLocation**: Get current location object
- **useSearchParams**: Handle query parameters
- **useNavigate**: Programmatic navigation

**Q: How do you handle programmatic navigation?**
A: Use `useNavigate` hook:
```jsx
const navigate = useNavigate();
navigate('/profile'); // Navigate to profile page
navigate(-1); // Go back
```

## Performance Benefits

**Q: Why is client-side routing faster than server-side routing?**
A: 
- No server round trips for navigation
- Only components change, not entire page
- Maintains JavaScript state and context
- Faster transitions and better user experience
- Reduces server load