import RestrauntCard from "./RestrauntCard";
import { data } from "./const"; 
import { use, useState } from "react";
import React, { useEffect } from "react";

const Body = () => {
    const [list, setList] = useState(data);
    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
            const response = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.5788913&lng=73.7706807&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
            const json = await response.json();
            console.log("Data fetched from API:", json);
            const restaurants = json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
                        .map((restaurant) => ({
                            resName: restaurant.info.name,
                            cuisine: restaurant.info.cuisines[0],
                            imgSrc: restaurant.info.cloudinaryImageId
                        }));
            console.table(restaurants);
            setList(restaurants);

        };

    return(
    <div className="body">
        <div className="search-bar">
            <button className="search-btn" onClick={() => {
                // filter data based on cuisine
                const filteredData = list.filter((d) => d.cuisine === "Indian");
                setList(filteredData);
                console.log(filteredData);
            }}>Filter</button>
        </div>
        <div className="res-container">
                    {list.map((d, index) => (
            //not using index as key
            // key={index} is not recommended as it can cause issues with component state
            <RestrauntCard key={index} resData={d} />
        ))}
            </div>
        
    </div>
);
};
export default Body;