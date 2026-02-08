import { useParams, useLocation } from "react-router-dom";
import "./RestaurantMenu.css";
import useRestaurantMenu from "../../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {
    const { Id } = useParams();
    const location = useLocation();
    const restaurantName = location.state?.restaurantName;
    const { restaurantMenu, loading, error } = useRestaurantMenu(Id);
    const [expandedCategory, setExpandedCategory] = useState(null);
    return (
        <div className="restaurant-menu">
            <div className="menu-header">
                <h1>{restaurantName || "Restaurant Menu"}</h1>
            </div>

            {loading ? (
                <div className="loading">Loading...</div>
            ) : error ? (
                <div className="error">Error: {error}</div>
            ) : restaurantMenu.length === 0 ? (
                <div className="empty">No menu items found.</div>
            ) : (
                <div className="menu-categories">
                    {
                    restaurantMenu.map((item, index) => (
                        <RestaurantCategory 
                            key={index} 
                            item={item} 
                            isExpanded={expandedCategory === index}
                            onToggle={() => {
                                setExpandedCategory(expandedCategory === index ? null : index)
                                console.log("clicked", index, expandedCategory, expandedCategory === index);
                            }
                            }
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default RestaurantMenu;
