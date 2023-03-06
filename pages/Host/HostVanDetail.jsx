import React from "react";
import { useParams } from "react-router-dom";

export default function HostVanDetail() {
  //grab params from URL
  const params = useParams();

  //state
  const [van, setVan] = React.useState(null);

  //grab the van from the mirage server that matches host id
  React.useEffect(() => {
    fetch(`/api/host/vans/${params.id}`)
      .then((res) => res.json())
      .then((data) => setVan(data.vans));
  }, [params.id]);

  return (
    <div className="van-detail-container">
      {van ? (
        <div className="van-detail">
          <img src={van.imageUrl} />
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
          <h2>{van.name}</h2>
          <p className="van-price">
            <span>${van.price}</span>/day
          </p>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}
