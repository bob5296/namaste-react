import RestaurantCard from "../../components/RestaurantCard";
const withPromotedLabel = (RestaurantCard) => {
    return (props) => {
        return (
            <div style={{ position: 'relative' }}>
                <label style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: 'red',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    zIndex: 1
                }}>Promoted</label>
                <RestaurantCard {...props} />
            </div>
        )
    }
}

export default withPromotedLabel;