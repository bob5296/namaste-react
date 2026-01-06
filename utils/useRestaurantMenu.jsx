import React from "react";

const useRestaurantMenu = (Id) => {
    const [restaurantMenu, setRestaurantMenu] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        // Create an AbortController for this effect run to cancel in-flight requests
        const controller = new AbortController();
        const signal = controller.signal;

        const getRestaurantMenu = async () => {
            setLoading(true);
            setError(null);

            try {
                const base = (process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001').replace(/\/+$/, '');
                const url = new URL(`/restaurants/${encodeURIComponent(Id)}`, base).toString();
                const response = await fetch(url, { headers: { 'Accept': 'application/json' }, signal });

                if (!response.ok) {
                    throw new Error(`API responded with status ${response.status}: ${response.statusText}`);
                }
                const data = await response.json();

                // Only update state if the request wasn't aborted
                if (!signal.aborted) {
                    setRestaurantMenu(data?.categories ?? []);
                }
            } catch (err) {
                // Ignore abort errors - they are expected when a request is cancelled
                if (err.name === 'AbortError') {
                    // do not update state on abort
                    return;
                }
                console.error("API error:", err);
                if (!signal.aborted) {
                    setError(err.message ?? 'An unknown error occurred');
                    setRestaurantMenu([]);
                }
            } finally {
                // Only clear loading if the request was not aborted
                if (!signal.aborted) {
                    setLoading(false);
                }
            }
        };

        if (Id) {
            getRestaurantMenu();
        }

        return () => {
            // Abort any in-flight fetch when the effect is cleaned up (Id changed or unmount)
            controller.abort();
        };
    }, [Id]);
    
    return { restaurantMenu, loading, error };
}

export default useRestaurantMenu;