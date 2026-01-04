# React Hooks Reference

## React Router Hooks

### useParams
**Purpose:** Access route parameters from dynamic routes
```jsx
import { useParams } from 'react-router-dom';

// Route: /restaurant/:id
const RestaurantMenu = () => {
    const { id } = useParams(); // Gets the :id from URL
    // If URL is /restaurant/123, then id = "123"
};
```

### useLocation
**Purpose:** Get current location object with pathname, search, hash, state
```jsx
import { useLocation } from 'react-router-dom';

const MyComponent = () => {
    const location = useLocation();
    
    console.log(location.pathname); // "/profile"
    console.log(location.search);   // "?tab=settings"
    console.log(location.hash);     // "#section1"
    console.log(location.state);    // Data passed via navigate
};
```

### useSearchParams
**Purpose:** Handle URL query parameters (search params)
```jsx
import { useSearchParams } from 'react-router-dom';

const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    
    const query = searchParams.get('q'); // Get ?q=value
    const page = searchParams.get('page'); // Get ?page=2
    
    // Update search params
    const handleSearch = (newQuery) => {
        setSearchParams({ q: newQuery, page: 1 });
    };
};
```

### useNavigate
**Purpose:** Programmatic navigation (replace history.push)
```jsx
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    
    const handleLogin = () => {
        // Navigate to dashboard after login
        navigate('/dashboard');
        
        // Navigate with state
        navigate('/profile', { state: { from: 'login' } });
        
        // Go back
        navigate(-1);
        
        // Replace current entry (no back button)
        navigate('/home', { replace: true });
    };
};
```

### useRouteError
**Purpose:** Access error information in error boundaries
```jsx
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();
    
    return (
        <div>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p><i>{error.statusText || error.message}</i></p>
        </div>
    );
};
```

## Core React Hooks

### useState
**Purpose:** Add state to functional components
```jsx
import { useState } from 'react';

const Counter = () => {
    const [count, setCount] = useState(0); // Initial value: 0
    const [user, setUser] = useState(null); // Initial value: null
    const [items, setItems] = useState([]); // Initial value: empty array
    
    const increment = () => setCount(count + 1);
    const updateUser = (userData) => setUser(userData);
    const addItem = (item) => setItems([...items, item]);
};
```

### useEffect
**Purpose:** Handle side effects (API calls, subscriptions, timers)
```jsx
import { useEffect } from 'react';

const DataComponent = () => {
    const [data, setData] = useState(null);
    
    // componentDidMount equivalent
    useEffect(() => {
        fetchData().then(setData);
    }, []); // Empty dependency array
    
    // componentDidUpdate equivalent
    useEffect(() => {
        updateData(userId);
    }, [userId]); // Runs when userId changes
    
    // componentDidMount + componentWillUnmount
    useEffect(() => {
        const timer = setInterval(() => {}, 1000);
        
        return () => clearInterval(timer); // Cleanup
    }, []);
    
    // componentDidUpdate for multiple dependencies
    useEffect(() => {
        if (userId && isActive) {
            fetchUserData(userId);
        }
    }, [userId, isActive]);
};
```

## Hook Usage Patterns

### Combining Router Hooks
```jsx
const ProductPage = () => {
    const { productId } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    
    const category = searchParams.get('category');
    const fromCart = location.state?.fromCart;
    
    const goToCart = () => {
        navigate('/cart', { 
            state: { productId, returnTo: location.pathname } 
        });
    };
};
```

### State + Effect Pattern
```jsx
const UserProfile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const userData = await api.getUser(userId);
                setUser(userData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        if (userId) {
            fetchUser();
        }
    }, [userId]);
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!user) return <div>User not found</div>;
    
    return <div>Welcome, {user.name}!</div>;
};
```

## Hook Rules

### Rules of Hooks
1. **Only call hooks at the top level** - not inside loops, conditions, or nested functions
2. **Only call hooks from React functions** - components or custom hooks
3. **Use the same order every time** - don't conditionally call hooks

### Good Examples
```jsx
// ✅ Good - hooks at top level
const MyComponent = () => {
    const [count, setCount] = useState(0);
    const { id } = useParams();
    
    useEffect(() => {
        // Effect logic
    }, [id]);
};

// ✅ Good - custom hook
const useUserData = (userId) => {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        if (userId) {
            fetchUser(userId).then(setUser);
        }
    }, [userId]);
    
    return user;
};
```

### Bad Examples
```jsx
// ❌ Bad - conditional hook
const MyComponent = ({ showUser }) => {
    if (showUser) {
        const { id } = useParams(); // Don't do this!
    }
};

// ❌ Bad - hook in loop
const MyComponent = ({ items }) => {
    items.forEach(item => {
        const [state, setState] = useState(item); // Don't do this!
    });
};
```