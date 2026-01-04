import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./RestaurantMenu.css";

const RestaurantMenu = () => {
    const { Id } = useParams();
    const [restaurantMenu, setRestaurantMenu] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getRestaurantMenu = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`http://localhost:5001/restaurants/${Id}`);

                if (!response.ok) {
                    throw new Error(`API responded with status ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                setRestaurantMenu(data?.menuItems ?? []);
            } catch (err) {
                console.error("API error:", err);
                setError(err.message ?? 'An unknown error occurred');
                setRestaurantMenu([]);
            } finally {
                setLoading(false);
            }
        };
        
        if (Id) {
            getRestaurantMenu();
        }
    }, [Id]);
    return (
        <div className="restaurant-menu">
            <div className="menu-header">
                <h1>Restaurant Menu</h1>
            </div>

            {loading ? (
                <div className="loading">Loading...</div>
            ) : error ? (
                <div className="error">Error: {error}</div>
            ) : restaurantMenu.length === 0 ? (
                <div className="empty">No menu items found.</div>
            ) : (
                <div className="menu-items">
                    {restaurantMenu.map(item => (
                        <div key={item.id} className="menu-item">
                            <div className="item-image">
                                <img src={item.image} alt={item.name} />
                            </div>
                            <div className="item-details">
                                <h3 className="item-name">{item.name}</h3>
                                <p className="item-description">{item.description}</p>
                                <div className="item-price">${item.price}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RestaurantMenu;