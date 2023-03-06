import React from "react"
import { useOutletContext } from "react-router-dom"

export default function HostVanPhotos() {
  const { van } = useOutletContext()
  
  return (
    <h1>Host van photos here.</h1>
  )
}
