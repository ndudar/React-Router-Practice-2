//removed this logic from the useEffect in Vans and placed it here instead
export async function getVans() {
  const res = await fetch("/api/vans")
  if (!res.ok) {
    throw {
      message: "Failed to fetch vans",
      statusText: res.statusText,
      status: res.status
    }
  }
  const data = await res.json()
  return data.vans
}
