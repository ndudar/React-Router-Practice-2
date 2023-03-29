import React from "react";
import { useParams, Link, useLocation, useLoaderData } from "react-router-dom";
import { getVans } from "../../api";

export function loader({ params }) {
  return getVans(params.id)
}

export default function VanDetail() {
  //object with pathname, search query, hash, state, and key
  //this state is in the browser's own capability to hold state, this is not React state
  const location = useLocation()

  //state
  const van = useLoaderData()

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
