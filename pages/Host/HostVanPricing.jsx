import React from "react"
import { useOutletContext } from "react-router-dom"

export default function HostVanPricing() {
  const { van } = useOutletContext()

  return (
    <h1>Host van pricing here.</h1>
  )
}
