//removed this logic from the useEffect in Vans and placed it here instead
export async function getVans() {
  const res = await fetch("/api/vans")
  const data = await res.json()
  return data.vans
}
