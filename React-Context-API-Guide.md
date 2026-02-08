# React Context API - Complete Guide

## What is Context API?

Context API allows you to **share data across components** without prop drilling (passing props through multiple levels).

## 1. Creating Context

### Basic Context Creation
```javascript
// contexts/UserContext.js
import { createContext } from 'react';

// Create context with default value
const UserContext = createContext({
    user: null,
    setUser: () => {}
});

export default UserContext;
```

### Context with Provider Component
```javascript
// contexts/UserContext.js
import { createContext, useState } from 'react';

const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = (userData) => {
        setUser(userData);
        setIsLoggedIn(true);
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
    };

    return (
        <UserContext.Provider value={{
            user,
            isLoggedIn,
            login,
            logout,
            setUser
        }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
```

## 2. Providing Context

### Single Provider
```javascript
// App.js
import { UserProvider } from './contexts/UserContext';
import Header from './components/Header';
import Body from './components/Body';

const App = () => {
    return (
        <UserProvider>
            <div>
                <Header />
                <Body />
            </div>
        </UserProvider>
    );
};
```

### Multiple Providers (Nested)
```javascript
// App.js
import { UserProvider } from './contexts/UserContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';

const App = () => {
    return (
        <UserProvider>
            <ThemeProvider>
                <CartProvider>
                    <div>
                        <Header />
                        <Body />
                    </div>
                </CartProvider>
            </ThemeProvider>
        </UserProvider>
    );
};
```

## 3. Consuming Context

### Using useContext Hook
```javascript
// components/Header.js
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';

const Header = () => {
    const { user, isLoggedIn, logout } = useContext(UserContext);

    return (
        <header>
            {isLoggedIn ? (
                <div>
                    <span>Welcome, {user.name}!</span>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <span>Please login</span>
            )}
        </header>
    );
};
```

### Custom Hook for Context
```javascript
// hooks/useUser.js
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';

export const useUser = () => {
    const context = useContext(UserContext);
    
    if (!context) {
        throw new Error('useUser must be used within UserProvider');
    }
    
    return context;
};

// Usage in component
import { useUser } from '../hooks/useUser';

const Profile = () => {
    const { user, setUser } = useUser();
    
    return <div>{user?.name}</div>;
};
```

## 4. Updating Context Values

### State Updates
```javascript
// components/LoginForm.js
import { useContext, useState } from 'react';
import UserContext from '../contexts/UserContext';

const LoginForm = () => {
    const { login } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const userData = await loginAPI(email, password);
            login(userData); // Updates context
        } catch (error) {
            console.error('Login failed');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email" 
            />
            <input 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password" 
                type="password" 
            />
            <button type="submit">Login</button>
        </form>
    );
};
```

## 5. Multiple Context Providers

### Theme Context
```javascript
// contexts/ThemeContext.js
import { createContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');
    
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
```

### Cart Context
```javascript
// contexts/CartContext.js
import { createContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    
    const addToCart = (item) => {
        setCartItems([...cartItems, item]);
    };
    
    const removeFromCart = (itemId) => {
        setCartItems(cartItems.filter(item => item.id !== itemId));
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            cartCount: cartItems.length
        }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
```

## 6. Component Access Hierarchy

### Who Can Access Context?
```javascript
<UserProvider>                    {/* ✅ Can provide UserContext */}
    <Header>                      {/* ✅ Can access UserContext */}
        <Navigation>              {/* ✅ Can access UserContext */}
            <UserMenu />          {/* ✅ Can access UserContext */}
        </Navigation>
    </Header>
    <ThemeProvider>               {/* ✅ Can access UserContext + provide ThemeContext */}
        <Body>                    {/* ✅ Can access UserContext + ThemeContext */}
            <RestaurantCard />    {/* ✅ Can access UserContext + ThemeContext */}
        </Body>
    </ThemeProvider>
</UserProvider>

{/* ❌ Cannot access UserContext - outside provider */}
<Footer />
```

## 7. Real-World Example: Restaurant App

### App Structure
```javascript
// App.js
import { UserProvider } from './contexts/UserContext';
import { CartProvider } from './contexts/CartContext';
import { RestaurantProvider } from './contexts/RestaurantContext';

const App = () => {
    return (
        <UserProvider>
            <CartProvider>
                <RestaurantProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<AppLayout />}>
                                <Route index element={<Body />} />
                                <Route path="restaurant/:id" element={<RestaurantMenu />} />
                                <Route path="cart" element={<Cart />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </RestaurantProvider>
            </CartProvider>
        </UserProvider>
    );
};
```

### Using Multiple Contexts
```javascript
// components/RestaurantCard.js
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import CartContext from '../contexts/CartContext';

const RestaurantCard = ({ restaurant }) => {
    const { user, isLoggedIn } = useContext(UserContext);
    const { addToCart } = useContext(CartContext);

    const handleAddToCart = () => {
        if (!isLoggedIn) {
            alert('Please login first');
            return;
        }
        addToCart(restaurant);
    };

    return (
        <div>
            <h3>{restaurant.name}</h3>
            <button onClick={handleAddToCart}>
                Add to Cart
            </button>
        </div>
    );
};
```

## 8. Context Best Practices

### Separate Contexts by Domain
```javascript
// ✅ Good - Separate contexts
<UserProvider>
<ThemeProvider>
<CartProvider>

// ❌ Bad - One giant context
<AppProvider> // Contains user, theme, cart, etc.
```

### Optimize Re-renders
```javascript
// contexts/OptimizedContext.js
import { createContext, useMemo } from 'react';

export const OptimizedProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);

    // Memoize context value to prevent unnecessary re-renders
    const contextValue = useMemo(() => ({
        user,
        setUser,
        cart,
        setCart
    }), [user, cart]);

    return (
        <OptimizedContext.Provider value={contextValue}>
            {children}
        </OptimizedContext.Provider>
    );
};
```

## 9. Context vs Props vs State Management

### When to Use Context:
- ✅ Theme settings
- ✅ User authentication
- ✅ Language/locale
- ✅ Shopping cart
- ✅ Global UI state

### When NOT to Use Context:
- ❌ Frequently changing data
- ❌ Complex state logic (use Redux/Zustand)
- ❌ Data that only 2-3 components need (use props)

## 10. Common Patterns

### Input Field with Context
```javascript
// components/SearchInput.js
import { useContext } from 'react';
import SearchContext from '../contexts/SearchContext';

const SearchInput = () => {
    const { searchText, setSearchText } = useContext(SearchContext);

    return (
        <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search restaurants..."
        />
    );
};
```

### Context with Local Storage
```javascript
// contexts/UserContext.js
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    });

    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};
```

## Key Takeaways

1. **Context flows down** - Only child components can access it
2. **Multiple providers** can be nested for different data domains
3. **Any component** within a provider can access and update context
4. **Use custom hooks** for better error handling and reusability
5. **Memoize context values** to optimize performance
6. **Separate contexts** by concern (user, theme, cart, etc.)