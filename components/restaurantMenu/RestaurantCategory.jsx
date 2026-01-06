import React from "react";
import RestaurantCategoryItem from "./RestaurantCategoryItem";

const RestaurantCategory = (props) => {
    const { item } = props;

    return (
        <div className="category-accordion">
            <div className="category-header">
                <h2 className="category-title">{item.name}</h2>
                <span className="category-toggle">
                    ▼
                </span>
            </div>
            <div className="category-items">
                {item.menuItems?.map((menuItem) => (
                    <RestaurantCategoryItem key={menuItem.id} item={menuItem} />
                ))}
            </div>
        </div>
    );
};

export default RestaurantCategory;
