import { useParams } from "react-router-dom"
import { useGet } from "../../hooks/fetchData"
import { useEffect } from "react"
const url = process.env.REACT_APP_API_BASE_URL

const OpenBlog = () => {
  const { id } = useParams()
  const { data, refetch } = useGet("fetchblog", `${url}/fetchBlog/${id}`)

  useEffect(() => {
    refetch()
  }, [])
  const body = data
  return (
    <div style={{ padding: "20px" }}>
      <div dangerouslySetInnerHTML={{ __html: body }}></div>
    </div>
  )
}

export default OpenBlog
