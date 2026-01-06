import React from "react";

const RestaurantCategoryItem = (props) => {
    const { item } = props;

    // If item is completely missing, render a lightweight placeholder (or return null)
    if (!item) {
        return (
            <div className="menu-item placeholder">
                <div className="item-details">
                    <h3 className="item-name">Untitled</h3>
                    <p className="item-description"></p>
                    <div className="item-price"></div>
                </div>
            </div>
        );
    }

    // Safe lookups with fallbacks
    const imageUrl = item?.imageUrl;
    const name = item?.name ?? 'Untitled';
    const description = item?.description ?? '';
    const price = (item?.price !== undefined && item?.price !== null && item.price !== '') ? `$${item.price}` : '';

    return(
        <div className="menu-item">
            {imageUrl ? (
                <div className="item-image">
                    <img src={imageUrl} alt={name} />
                </div>
            ) : null}
            <div className="item-details">
                <h3 className="item-name">{name}</h3>
                {description ? <p className="item-description">{description}</p> : null}
                {price ? <div className="item-price">{price}</div> : null}
            </div>
        </div>
    )
}

export default RestaurantCategoryItem;