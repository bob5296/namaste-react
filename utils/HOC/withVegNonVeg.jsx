const withVegNonVeg = (RestaurantMenuCard) => {
        const item = props?.item;
        return (
        <div>
            {item ? (
                item?.isVegetarian ? <label aria-label="vegetarian">🥗</label> : <label aria-label="non-vegetarian">🔴</label>
            ) : (
                // neutral placeholder when item is missing
                <span className="veg-unknown" aria-hidden="true">—</span>
            )}
            <WrappedComponent {...props}/>
        </div>
        )
    }
}

export default withVegNonVeg;