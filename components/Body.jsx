import React from "react";
import RestaurantCard from "./RestaurantCard";
import restaurantData from "../data/restaurantData";

const Body = () => {
    const [restaurants, setRestaurants] = React.useState([]);
    const [searchText, setSearchText] = React.useState("");
    const [filteredRestaurants, setFilteredRestaurants] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    console.log("Body rendered");

    // Fetch restaurants from API on component mount
    React.useEffect(() => {
        console.log("useEffect called");
        getRestaurants();
    }, []);

    async function getRestaurants() {
        try {
            const response = await fetch("http://localhost:5001/Restaurants");
            const data = await response.json();
            setRestaurants(data);
            setFilteredRestaurants(data);
            setLoading(false);
            setError(null);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }
    
   return (
        <main className="body">
            <div className="filter">
                <input type = "text" className="search-input" placeholder="Search" value={searchText} onChange={(e) => {
                    setSearchText(e.target.value);
                }}/>
                <button className="filter-btn" onClick={() => {
                    const filteredList = restaurants.filter((restaurant) => {
                        return restaurant.name.toLowerCase().includes(searchText.toLowerCase());
                    });
                    setFilteredRestaurants(filteredList);
                }}>Search</button>
                <button className="filter-btn" onClick={() => {
                    setFilteredRestaurants([]); // Reset to empty array to show all restaurants
                    setSearchText(""); // Optionally clear search text
                }}>Clear</button>
            </div>
            {loading ? (
                <div className="loading">Loading restaurants...</div>
            ) : error ? (
                <div className="error">
                    Error: {error}. Showing fallback data.
                </div>
            ) : null}
            <div className="restaurant-container">
                {filteredRestaurants.length > 0 ? filteredRestaurants.map((restaurant, index) => (
                    <RestaurantCard key={index} restaurant={restaurant} />
                )) : restaurants.map((restaurant, index) => (
                    <RestaurantCard key={index} restaurant={restaurant} />
                ))}
            </div>
        </main>
    );
};

export default Body;

