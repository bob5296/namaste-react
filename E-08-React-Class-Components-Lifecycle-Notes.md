# React Class-Based Components Lifecycle Notes

## Component Lifecycle Phases

### 1. Mounting Phase
**Order of execution:**
```
Parent Constructor → Parent Render → Child Constructor → Child Render → Child componentDidMount → Parent componentDidMount
```

**Render Phase (Virtual DOM creation):**
- Constructor
- Render method

**Commit Phase (Real DOM updates):**
- Create DOM nodes
- componentDidMount (API calls happen here)

### 2. Update Phase (setState called)
**Render Phase:**
- Render method

**Commit Phase:**
- Update DOM nodes
- componentDidUpdate

### 3. Unmounting Phase
**Commit Phase:**
- componentWillUnmount (cleanup)
- Remove DOM nodes

## Multiple Children Execution Order

When parent has multiple children:
```
Parent Constructor → Parent Render → 
Child1 Constructor → Child1 Render → 
Child2 Constructor → Child2 Render → 
Child1 componentDidMount → Child2 componentDidMount → 
Parent componentDidMount
```

**Why this order?**
- React batches the render phase for performance
- All constructors and renders happen first
- Then all componentDidMount methods execute
- Parent's componentDidMount runs last

## Key Lifecycle Methods

### Constructor
```jsx
constructor(props) {
    super(props);
    this.state = { data: null };
    // Initialize state, bind methods
}
```

### componentDidMount
```jsx
componentDidMount() {
    // API calls
    // Set up timers/intervals
    // DOM manipulation
    this.timer = setInterval(() => {}, 1000);
}
```

### componentDidUpdate
```jsx
componentDidUpdate(prevProps, prevState) {
    // Compare previous props/state with current
    if (prevState.data !== this.state.data) {
        // Do something when data changes
    }
}
```

### componentWillUnmount
```jsx
componentWillUnmount() {
    // Cleanup: clear timers, cancel API calls
    clearInterval(this.timer);
}
```

## React's Reconciliation Process

### Render Phase (Virtual DOM)
- React creates virtual DOM objects
- Runs reconciliation algorithm
- Determines what needs to change
- **Pure phase** - no side effects

### Commit Phase (Real DOM)
- Updates actual DOM
- Runs lifecycle methods like componentDidMount
- **Side effects allowed** - API calls, timers

## Class vs Functional Components

### Class Component Pattern
```jsx
class MyComponent extends React.Component {
    componentDidMount() {
        // API call
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevState.count !== this.state.count) {
            // Do something when count changes
        }
    }
    
    componentWillUnmount() {
        // Cleanup
    }
}
```

### Functional Component Equivalent
```jsx
const MyComponent = () => {
    useEffect(() => {
        // API call (componentDidMount)
        
        return () => {
            // Cleanup (componentWillUnmount)
        };
    }, []); // Empty dependency = componentDidMount
    
    useEffect(() => {
        // Runs when first render and count changes (componentDidUpdate)
    }, [count]);
};
```

## Common Patterns

### API Calls
```jsx
// Class component
componentDidMount() {
    fetch('/api/data')
        .then(res => res.json())
        .then(data => this.setState({ data }));
}

// Functional equivalent
useEffect(() => {
    fetch('/api/data')
        .then(res => res.json())
        .then(data => setData(data));
}, []);
```

### Cleanup
```jsx
// Class component
componentDidMount() {
    this.timer = setInterval(() => {}, 1000);
}

componentWillUnmount() {
    clearInterval(this.timer);
}

// Functional equivalent
useEffect(() => {
    const timer = setInterval(() => {}, 1000);
    return () => clearInterval(timer);
}, []);
```

### Conditional Updates
```jsx
// Class component
componentDidUpdate(prevProps, prevState) {
    if (prevProps.userId !== this.props.userId) {
        this.fetchUserData(this.props.userId);
    }
}

// Functional equivalent
useEffect(() => {
    fetchUserData(userId);
}, [userId]);
```

## Key Differences

### useEffect vs Class Lifecycle
- **useEffect with []**: Replaces componentDidMount (effect runs once after mount)
- **useEffect cleanup function**: Replaces componentWillUnmount (cleanup runs before unmount)
- **useEffect with [] + cleanup**: Combines componentDidMount + componentWillUnmount
- **useEffect with [deps]**: Runs on first render + when dependencies change (componentDidMount + componentDidUpdate combined)
- **useEffect without deps**: Runs after every render (componentDidMount + componentDidUpdate)

### Advantages of useEffect
- Simpler syntax
- Automatic dependency tracking
- No need for manual prevProps/prevState comparison
- Better code organization (related logic stays together)

## Performance Considerations

### React Batching
- React batches render phase for multiple components
- All renders happen first, then all commits
- Improves performance by reducing DOM updates

### Why componentDidMount is Last
- Ensures all child components are fully mounted
- Parent can safely interact with child DOM elements
- Maintains consistent component tree state

## Best Practices

### Why Cleanup is Critical
**Without proper cleanup:**
- Each navigation to component creates new intervals/timers
- Previous intervals keep running in background
- Multiple intervals accumulate (2, 3, 4... intervals running simultaneously)
- Causes memory leaks and performance degradation
- Console logs or API calls multiply with each navigation

**Example Problem:**
```jsx
// BAD - No cleanup
useEffect(() => {
    setInterval(() => console.log('Running'), 1000);
}, []); // Creates new interval each mount, old ones never stop

// Navigation: Home → About → Home → About
// Result: 2 intervals running, then 3, then 4...
```

### Class Components
```jsx
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: null };
    }
    
    async componentDidMount() {
        try {
            const data = await fetchData();
            this.setState({ data });
        } catch (error) {
            this.setState({ error });
        }
    }
    
    componentWillUnmount() {
        // Always cleanup to prevent memory leaks
        if (this.timer) clearInterval(this.timer);
        if (this.subscription) this.subscription.unsubscribe();
    }
}
```

### Modern Functional Approach
```jsx
const MyComponent = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null); // added error state so setError is defined

    useEffect(() => {
        let cancelled = false;
        
        const fetchData = async () => {
            try {
                const result = await api.getData();
                if (!cancelled) setData(result);
            } catch (error) {
                if (!cancelled) setError(error);
            }
        };
        
        fetchData();
        
        return () => {
            cancelled = true; // Prevent state updates if unmounted
        };
    }, []);
};
```