import React from "react";
import RestaurantCategoryItem from "./RestaurantCategoryItem";

const RestaurantCategory = (props) => {
    const { item } = props;
    const [isExpanded, setIsExpanded] = React.useState(false);

    return (
        <div className="category-accordion">
            <div className="category-header">
                <h2 className="category-title">{item.name}</h2>
                <button 
                    className="category-toggle hoverable" 
                    onClick={() => setIsExpanded(!isExpanded)}
                    aria-expanded={isExpanded}
                    aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${item.name}`}
                >
                    {isExpanded ? '▲' : '▼'}
                </button>
            </div>
            {isExpanded && <div className="category-items">
                {item.menuItems?.map((menuItem) => (
                    <RestaurantCategoryItem key={menuItem.id} item={menuItem} />
                ))}
            </div>}
        </div>
    );
};

export default RestaurantCategory;
