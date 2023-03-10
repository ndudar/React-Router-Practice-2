import React from "react";
import { Link, useSearchParams, useLoaderData } from "react-router-dom";
//import the api
import { getVans } from "../../api";

export function loader() {
  return getVans()
}

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();
  //error state
  const [error, setError] = React.useState(null);
  //getting loader data (no longer need to set state for vans)
  const vans = useLoaderData()

  const typeFilter = searchParams.get("type");


  //filtering the vans array if we have a typeFilter
  const displayedVans = typeFilter
    ? vans.filter((van) => van.type === typeFilter)
    : vans;

  const vanElements = displayedVans.map((van) => (
    <div key={van.id} className="van-tile">
      <Link
        to={van.id}
        state={{ search: `?${searchParams.toString()}`, type: typeFilter }}
      >
        <img src={van.imageUrl} />
        <div className="van-info">
          <h3>{van.name}</h3>
          <p>
            ${van.price}
            <span>/day</span>
          </p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
  ));

  if (error) {
    return <h1>There was an error: {error.message}</h1>
  }

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list-filter-buttons">
        <button
          className={`van-type simple ${
            typeFilter === "simple" ? "selected" : ""
          }`}
          onClick={() => setSearchParams({ type: "simple" })}
        >
          Simple
        </button>
        <button
          className={`van-type luxury ${
            typeFilter === "luxury" ? "selected" : ""
          }`}
          onClick={() => setSearchParams({ type: "luxury" })}
        >
          Luxury
        </button>
        <button
          className={`van-type rugged ${
            typeFilter === "rugged" ? "selected" : ""
          }`}
          onClick={() => setSearchParams({ type: "rugged" })}
        >
          Rugged
        </button>
        {typeFilter ? (
          <button
            className="van-type clear-filters"
            onClick={() => setSearchParams({})}
          >
            Clear Filter
          </button>
        ) : null}
      </div>
      <div className="van-list">{vanElements}</div>
    </div>
  );
}
