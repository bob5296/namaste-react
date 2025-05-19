import { styleCard } from "./const";
const RestrauntCard = (props) => {
    const { resName, cuisine, imgSrc } = props.resData;
    return(
    <div className="res-card" style={styleCard}>
        <img className="res-logo" src={"https://media-assets.swiggy.com/swiggy/image/upload/" + imgSrc} alt="logo" />
            <h1>4 Star</h1>
        <h3>{resName}</h3>
        <h2>{cuisine}</h2>
    </div>
);
};

export default RestrauntCard;