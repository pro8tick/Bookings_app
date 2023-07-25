import "./featuredProperties.css";
import useFetch from "../../Hooks/use-fetch";
import Skeleton from "../featured/Skeleton";

const FeaturedProperties = () => {
  const {data,loading,err} = useFetch("/hotels/?featured=true&limit=4")

  return (
    <div className="fp">
    
    {loading ? <Skeleton times={4}  className="fpImg"/>:
     <>
      {data.map(item=>(       
        <div className="fpItem" key ={item._id}>
            <img
              src={item.photos[0]}
              alt=""
              className="fpImg"
            />
            <span className="fpName">{item.name}</span>
            <span className="fpCity">{item.city}</span>
            <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
            {item.rating && <div className="fpRating">
              <button>{item.rating}</button>
              <span>Excellent</span>
            </div>}
          </div>
        ))}
       </>}
      
    </div>
  );
};

export default FeaturedProperties;
