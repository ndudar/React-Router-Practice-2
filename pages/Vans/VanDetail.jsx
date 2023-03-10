import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";

export default function VanDetail() {
  //grab params from url
  const params = useParams();

  //object with pathname, search query, hash, state, and key
  //this state is in the browser's own capability to hold state, this is not React state
  const location = useLocation()

  //state
  const [van, setVan] = React.useState(null);

  //grab the van from the mirage "server"
  React.useEffect(() => {
    fetch(`/api/vans/${params.id}`)
      .then((res) => res.json())
      .then((data) => setVan(data.vans));
  }, [params.id]);

  //grabbing information from state
  const search = location.state?.search || ""
  const type = location.state?.type || "all"

  return (
    <div className="van-detail-container">
      <Link to={`..${search}`} relative="path" className="back-button">
        &larr; <span>Back to {type} vans</span>
      </Link>
      {van ? (
        <div className="van-detail">
          <img src={van.imageUrl} />
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
          <h2>{van.name}</h2>
          <p className="van-price">
            <span>${van.price}</span>/day
          </p>
          <p>{van.description}</p>
          <button className="link-button">Rent this van</button>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}
