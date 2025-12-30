import React from "react";

const RestaurantCard = ({ restaurant }) => {
    const { name, cuisine, costForTwo, rating } = restaurant;
    
    return (
        <div className="restaurant-card">
            <div className="card-header">
                <h3>{name}</h3>
            </div>
            <div className="card-body">
                <p className="cuisine">{cuisine}</p>
                <p className="cost">₹{costForTwo} for two</p>
                <div className="rating">
                    <span className="star">⭐</span>
                    <span>{rating}</span>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;

