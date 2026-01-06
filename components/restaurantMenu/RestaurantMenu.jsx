import { useParams, useLocation } from "react-router-dom";
import "./RestaurantMenu.css";
import useRestaurantMenu from "../../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
    const { Id } = useParams();
    const location = useLocation();
    const restaurantName = location.state?.restaurantName;
    const { restaurantMenu, loading, error } = useRestaurantMenu(Id);

    return (
        <div className="restaurant-menu">
            <div className="menu-header">
                <h1>{restaurantName || "Restaurant Menu"}</h1>
            </div>

            {loading ? (
                <div className="loading">Loading...</div>
            ) : error ? (
                <div className="error">Error: {error}</div>
            ) : (!Array.isArray(restaurantMenu) || restaurantMenu.length === 0) ? (
                <div className="empty">No menu items found.</div>
            ) : (
                <div className="menu-categories">
                    {restaurantMenu.map((item, index) => (
                        <RestaurantCategory key={index} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default RestaurantMenu;
