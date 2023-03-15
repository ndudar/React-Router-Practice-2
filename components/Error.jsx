import React from "react"
import { useRouteError } from "react-router-dom"

export default function Error() {
  const error = useRouteError()

  return (
    <>
    <h1>There was an error! Oh no! Error: {error.message}</h1>
    <pre>{error.status} - {error.statusText}</pre>
    </>
  )
}
