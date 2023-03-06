import React from "react";
import { useParams, Link } from "react-router-dom";

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
  }, []);

  if (!van) {
    return <h1>Loading...</h1>
}

return (
    <section>
        <Link
            to=".."
            relative="path"
            className="back-button"
        >&larr; <span>Back to all vans</span></Link>

        <div className="host-van-detail-layout-container">
            <div className="host-van-detail">
                <img src={van.imageUrl} />
                <div className="host-van-detail-info-text">
                    <i
                        className={`van-type van-type-${van.type}`}
                    >
                        {van.type}
                    </i>
                    <h3>{van.name}</h3>
                    <h4>${van.price}/day</h4>
                </div>
            </div>
        </div>
    </section>
)
}
