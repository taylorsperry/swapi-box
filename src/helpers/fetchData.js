export const fetchData = async (url) => {
  const response = await fetch(url)
    if(!response.ok) {
      throw Error ('Something went wrong')
    }
  const data = await response.json()
  return data
}