import React from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams()
  //state
  const [vans, setVans] = React.useState([]);

  const typeFilter = searchParams.get("type")

  //grabbing the vans data from the mirage "server"
  //opportunity to optimize: save vans in cache so don't have to refresh every time page loads
  React.useEffect(() => {
    fetch("/api/vans")
      .then((res) => res.json())
      .then((data) => setVans(data.vans));
  }, []);

  //filtering the vans array if we have a typeFilter
  const displayedVans = typeFilter
    ? vans.filter(van => van.type === typeFilter)
    : vans

  const vanElements = displayedVans.map((van) => (
    <div key={van.id} className="van-tile">
      <Link to={`/vans/${van.id}`}>
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

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list-filter-buttons">
        <Link className="van-type simple" to="?type=simple">Simple</Link>
        <Link className="van-type luxury" to="?type=luxury">Luxury</Link>
        <Link className="van-type rugged" to="?type=rugged">Rugged</Link>
        <Link className="van-type clear-filters" to=".">Clear</Link>
      </div>
      <div className="van-list">{vanElements}</div>
    </div>
  );
}
